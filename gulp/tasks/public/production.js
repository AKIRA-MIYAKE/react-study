import gulp from 'gulp';
import runSequence from 'run-sequence';

import execBrowserify from './_exec-browserify';

import config from '../../config';


gulp.task('public:production', () => {
  runSequence(
    'public:clean',
    'public:test',
    [
      'public:htdocs',
      'public:javascripts:production',
      'public:stylesheets:production',
      'public:images',
      'public:fonts'
    ]
  );
})
