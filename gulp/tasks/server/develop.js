import gulp from 'gulp';

import config from '../../config';

var jsConfig = config.server.javascripts;
var viewsConfig = config.server.views;
var testConfig = config.server.test;


gulp.task('server:develop', ['server:build', 'server:test'], () => {
  gulp.watch([jsConfig.src], ['server:javascripts', 'server:test']);
  gulp.watch([viewsConfig.src], ['server:views']);
  gulp.watch([testConfig.src], ['server:test']);
});
