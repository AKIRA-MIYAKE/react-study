import gulp from 'gulp';
import babel from 'gulp-babel';
import changed from 'gulp-changed';

import config from '../../config';
import handleErrors from '../../util/handle-errors';

var jsConfig = config.server.javascripts;


gulp.task('server:javascripts', () => {
  return gulp.src(jsConfig.src)
    .pipe(changed(jsConfig.dest))
    .pipe(babel())
    .on('error', handleErrors)
    .pipe(gulp.dest(jsConfig.dest));
});
