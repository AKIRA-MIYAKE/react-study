import gulp from 'gulp';
import changed from 'gulp-changed';

import config from '../../config';

var htdocsConfig = config.public.htdocs;


gulp.task('public:htdocs', () => {
  return gulp.src(htdocsConfig.src)
    .pipe(changed(htdocsConfig.dest))
    .pipe(gulp.dest(htdocsConfig.dest));
});
