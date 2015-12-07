import gulp from 'gulp';
import changed from 'gulp-changed';

import config from '../../config';

var imgConfig = config.public.images;


gulp.task('public:images', () => {
  return gulp.src(imgConfig.src)
    .pipe(changed(imgConfig.dest))
    .pipe(gulp.dest(imgConfig.dest));
});
