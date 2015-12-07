import gulp from 'gulp';
import browserSync from 'browser-sync';

import config from '../../config';

var server = browserSync.create();
var bsConfig = config._browserSync;


gulp.task('public:serve', ['public:develop'], () => {
  server.init(bsConfig.options);

  server.watch(`${bsConfig.options.server}/**/*`).on("change", server.reload);
});
