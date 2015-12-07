import gulp from 'gulp';
import runSequence from 'run-sequence';

import config from '../../config';

var htdocsConfig = config.public.htdocs;
var jsConfig = config.public.javascripts;
var cssConfig = config.public.stylesheets;
var imagesConfig = config.public.images;
var fontsConfig = config.public.fonts;
var testConfig = config.public.test;


gulp.task('public:develop', () => {
  runSequence(
    'public:clean',
    'public:test',
    [
      'public:htdocs',
      'public:javascripts:develop',
      'public:stylesheets',
      'public:images',
      'public:fonts'
    ]
  );

  gulp.watch([htdocsConfig.src], ['public:htdocs']);
  gulp.watch([jsConfig.src], ['public:test']);
  gulp.watch([cssConfig.src], ['public:stylesheets']);
  gulp.watch([imagesConfig.src], ['public:images']);
  gulp.watch([fontsConfig.src], ['public:fonts']);
  gulp.watch([testConfig.src], ['public:test']);
});
