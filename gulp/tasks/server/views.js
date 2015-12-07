import gulp from 'gulp';
import changed from 'gulp-changed';

import config from '../../config';

var viewsConfig = config.server.views;


gulp.task('server:views', () => {
  return gulp.src(viewsConfig.src)
    .pipe(changed(viewsConfig.dest))
    .pipe(gulp.dest(viewsConfig.dest));
});
