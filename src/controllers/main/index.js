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
