import gulp from 'gulp';

import execBrowserify from './_exec-browserify';


gulp.task('public:javascripts', (callback) => {
  execBrowserify(false, false);
  callback();
});

gulp.task('public:javascripts:develop', (callback) => {
  execBrowserify(true, false);
  callback();
});

gulp.task('public:javascripts:production', (callback) => {
  execBrowserify(false, true);
  callback();
});
