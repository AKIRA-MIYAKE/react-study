# react + redux + react-router のサーバサイドレンダリングを試してみた

こんにちは、ジャバスクリプターの三宅です。  
react + redux + react-router を用いたアプリケーションのサーバサイドレンダリングの情報が見当たらなかったので試してみました。  

[React](https://facebook.github.io/react/) はご存知の通り、Facebookが開発を行っている、JavaScript フレームワークです。  
React は View 部分のみのフレームワークとなり、フロントエンドアプリケーション全体は別途考える必要があります。  
Facebook は [Flux](https://facebook.github.io/flux/) というアーキテクチャを提唱しており、[Redux](https://github.com/rackt/redux) はその実装となります。  
[React Router](https://github.com/rackt/react-router) は、React アプリケーションでルーティングを行うためのライブラリでです。  
react や redux、react-router の基本的な使い方は、公式ドキュメントや様々なブログで紹介されているので今回は、サーバサイドレンダリングの部分に絞って解説します。  

下の Heroku Button を使って、自身の Heroku アカウントにデプロイして動作を確認することができます。  

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)  

ローカルで動作させる場合は、リポジトリをクローンして、以下のコマンドを実行してください。  

    cd react-study
    npm install
    npm run-script build
    npm start


## 環境
以下の環境やバージョンで動作を確認しています。  
どのライブラリも開発が活発で、APIの変更を伴うバージョンアップも頻繁に行われています。  
そのため、過去のサンプルコードが動かないということがよくあります。。   

+ ランタイム
  + Node.js: v5.1.0
  + npm: 3.3.12
+ Babel関連
  + babel-core: 6.2.4
  + babel-polyfill: 6.2.4
  + babel-preset-es2015: 6.2.4
  + babel-preset-react: 6.2.4
  + babel-preset-stage-2: 6.2.4
+ React関連
  + react: 0.14.3
  + react-dom: 0.14.3
  + redux: 3.0.4
  + react-redux: 4.0.0
  + react-router: 1.0.1
  + history: 1.13.1

react-router が依存する [history](https://github.com/rackt/history) の最新バージョンは 1.15.0 ですが、react-router が deprecated の API を利用しており、Warning が発生するので上記のバージョンを利用しています。  
react-router の v1.10 で対応が予定されているようです。  
また、[redux-router](https://github.com/rackt/redux-router) という、redux と react-router を接続するライブラリもあるのですが、まだ β 版である事、複雑な設定が必要である事から、今回は利用していません。  


## なぜサーバサイドレンダリング??
アプリケーションの説明の前に、なぜサーバサイドレンダリングが話題になっているのかについて少し触れたいと思います。  
シングルページアプリケーションでは、サーバサイドでは API サーバとしてブラウザから要求されたデータを返す、クライアントサイドでは JavaScript を用いて DOM を構築する、という構成になりますが、以下の問題があります。  

+ 初期ロード時間
  + JavaScript がブラウザにダウンロードされ、評価されてからレンダリングが開始される、また評価後にサーバにデータを取得してレンダリングを行うため、初回ロードがどうしても遅くなります。特に、非力なスマートフォンなどでは顕著になります。  
+ SEO
  + Google はクローラが JavaScript を解釈してくれるため問題はありませんが、そうでないクローラに対してはコンテンツのない Web ページとしてインデックスされてしまします。  

そのような問題を解決するために、React では URL やデータの状態に基づく HTML をサーバサイドでレンダリングし、ブラウザで動作するクライアントサイドのアプリに、その状態を引き継ぐことができるようになっています。  
Ember.js も次のバージョンからサーバサイドレンダリングがサポートされ、Angular 2 にも取り入れようという話が出てきているようです。    


## サーバサイドで HTML の出力
Express のミドルウェアとして次のように定義しています。  

    import express from 'express';

    import React from 'react';
    import { renderToString } from 'react-dom/server';
    import { match, RoutingContext } from 'react-router';
    import { Provider } from 'react-redux';
    import uuid from 'node-uuid';
    import moment from 'moment';

    import routes from '../../client/routes';
    import configureStore from '../../client/store/configure-store';


    var router = express.Router();

    router.get('/', (req, res, next) => {

      match({
        routes,
        location: req.originalUrl
      }, (err, redirectLocation, renderProps) => {
        if (err) {
          next(err);
        } else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
          const initialState = {
            memos: [{
              id: uuid.v4(),
              text: 'Initial Text',
              date: parseInt(moment().format('X'))
            }]
          };

          const store = configureStore(initialState);

          const markup = renderToString(
            <Provider store={store}>
              <RoutingContext {...renderProps} />
            </Provider>
          );

          res.render('main', {
            title: 'react-study',
            markup: markup,
            initialState: JSON.stringify(initialState)
          });
        } else {
          let err = new Error('Not Found');
          err.status = 404;
          next(err);
        }
      });

    });


    export default router;

match は react-router が提供するメソッドで、リクエストの URL と ルーティング定義に基づいた renderProps を算出してくれます。  
RoutingContext に renderProps を渡すことで、URL の状態に一致したアプリケーションを取得することができます。  
Provider は redux が提供するコンポーネントで、initialState が設定された store を与えることで、その store の状態に基づくアプリケーションを所得できます。  
renderToString メソッドで HTML を取得し、jade のテンプレートに渡してレンダリングしています。  

    extends layout

    block content
      div#app!= markup
      script.
        window.__INITIAL_STATE__ = !{initialState};
      script(src="/javascripts/bundle.js")

jade のテンプレートは上記のようになっています。  
生成した HTML である markup と initialState を渡すようにしています。  
通常の変数の渡し方だとエスケープされてしまうので、!= を用いてエスケープされないようにしています。  


## ブラウザでの初期値の設定
initialState の値をもとに、サーバサイドレンダリングされた HTML と、ブラウザのアプリケーションの状態を一致させます。  

    import React from 'react';
    import { render } from 'react-dom';
    import { Router } from 'react-router';
    import { createHistory } from 'history';
    import { Provider } from 'react-redux';

    import routes from '../../client/routes';
    import configureStore from '../../client/store/configure-store';


    const initialState = window.__INITIAL_STATE__;
    const store = configureStore(initialState);

    render(
      <Provider store={store}>
        <Router history={createHistory()} routes={routes} />
      </Provider>,
      document.getElementById('app')
    );

サーバサイドで生成された HTML には react によってチェックサムが設定されており、ブラウザで render メソッド実行時にアプリケーションの状態、すなわち DOM が一致しているかどうかの確認が行われます。  
もし、不一致があれば、ブラウザが保持するアプリケーションの状態に再レンダリングされます。  


## サーバサイドとクライアントサイドのソースの共通化
今回のサンプルでは、react に関連するアプリケーションは /src/client 以下にまとめています。  
react-dom のメソッド - サーバ上では renderToString 、ブラウザ上では render - の実行部分以外では、サーバサイドとクライアントサイドは完全に同じソースコードを利用しています。  
今回は記述していませんが、UI コンポーネントのテストも容易に行うことができるようになると思います。  


## まとめ
非常に簡単なアプリケーションですが、react + redux + react-router を用いたアプリのサーバサイドレンダリングを解説してみました。  
今回クライアントサイドのアプリケーションはサーバから初期値を受け取った後は独立して動くようにしていますが、どのタイミングでクライアントサイドとサーバサイドのデータを一致させるかは、React アプリを構築する上で重要な部分になってくると思います。  
また、アプリケーションが保持するデータをすべてピュアなオブジェクトとしています。もし、immutable.js を使うのであれば、immutable オブジェクトのシリアライズ、デシリアライズを実装する必要があるでしょう。  

実際に React を用いたアプリケーション開発で考えるべきことについては、今後も検証を進めていきたいと思います。  
