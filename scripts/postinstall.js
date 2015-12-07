/*
  postinstall.js
*/

var gulp = require('gulp');

require('../gulpfile');

var env = process.env.NODE_ENV;

if (env === 'production') {
  if (gulp.tasks.production) {
    console.log('Start gulp production task');
    gulp.start('production');
  }
}
