import gulp from 'gulp';
import mocha from 'gulp-mocha';

import config from '../../config';
import handleErrors from '../../util/handle-errors';

var testConfig = config.public.test;
var mochaConfig = config._mocha;


gulp.task('public:test', () => {
  return gulp.src(testConfig.src, { read: false })
    .pipe(mocha(mochaConfig.options))
    .on('error', handleErrors);
});
