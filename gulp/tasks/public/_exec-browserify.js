import polyfill from 'babel-polyfill';

import path from 'path';

import gulp from 'gulp';
import gulpif from 'gulp-if';
import uglify from 'gulp-uglify';
import browserify from 'browserify';
import watchify from 'watchify';
import stream from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

import config from '../../config';
import handleErrors from '../../util/handle-errors';

var jsConfig = config.public.javascripts;
var browserifyConcifg = config._browserify;
var watchifyConfig = config._watchify;


var createBulde = (src, isWatch, isUglify) => {
  var filename = path.basename(src);

  var bundler = null;

  if (isWatch) {
    var options = Object.assign(
      { entries: src} ,
      browserifyConcifg.options,
      watchifyConfig.options);
    bundler = watchify(browserify(options));
  } else {
    var options = Object.assign(
      { entries: src} ,
      browserifyConcifg.options);
    bundler = browserify(options);
  }

  var rebundle = (params) => {
    console.log('[Start] browserify');
    bundler.bundle()
      .on('error', handleErrors)
      .pipe(stream(filename))
      .pipe(buffer())
      .pipe(gulpif(isUglify, uglify()))
      .pipe(gulp.dest(jsConfig.dest));
    console.log('[Finish] browserify');
  };

  if (isWatch) {
    bundler.on('update', rebundle);
  }

  rebundle();
}


export default function execBrowserify(isWatch = false, isUglify = false) {
  jsConfig.src.forEach((src) => {
    createBulde(src, isWatch, isUglify);
  });
}
