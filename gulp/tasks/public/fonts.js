import gulp from 'gulp';
import changed from 'gulp-changed';

import config from '../../config';

var fontsConfig = config.public.fonts;


gulp.task('public:fonts', () => {
  return gulp.src(fontsConfig.src)
    .pipe(changed(fontsConfig.dest))
    .pipe(gulp.dest(fontsConfig.dest));
});
