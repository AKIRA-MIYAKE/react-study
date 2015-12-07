import gulp from 'gulp';
import del from 'del';

import config from '../../config';

var cleanConfig = config.public.clean;


gulp.task('public:clean', () => {
  return del(cleanConfig.target);
});
