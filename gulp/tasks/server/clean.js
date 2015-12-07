import gulp from 'gulp';
import del from 'del';

import config from '../../config';

var cleanConfig = config.server.clean;


gulp.task('server:clean', () => {
  return del(cleanConfig.target);
});
