import gulp from 'gulp';
import sass from 'gulp-sass'
import cssnext from 'gulp-cssnext';

import config from '../../config';
import handleErrors from '../../util/handle-errors';

var cssConfig = config.public.stylesheets;
var sassConfig = config._sass;
var cssnextConfig = config._cssnext;


gulp.task('public:stylesheets', () => {
  return gulp.src(cssConfig.src)
    .pipe(sass(sassConfig.options))
    .on('error', handleErrors)
    .pipe(cssnext(cssnextConfig.options))
    .on('error', handleErrors)
    .pipe(gulp.dest(cssConfig.dest));
});

gulp.task('public:stylesheets:production', () => {
  cssnextConfig.options.compress = true;
  cssnextConfig.options.sourcemap = false;

  return gulp.src(cssConfig.src)
    .pipe(sass(sassConfig.options))
    .on('error', handleErrors)
    .pipe(cssnext(cssnextConfig.options))
    .on('error', handleErrors)
    .pipe(gulp.dest(cssConfig.dest));
});
