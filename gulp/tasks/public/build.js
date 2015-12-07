import gulp from 'gulp';
import runSequence from 'run-sequence';


gulp.task('public:build', () => {
  runSequence(
    'public:clean',
    'public:test',
    [
      'public:htdocs',
      'public:javascripts',
      'public:stylesheets',
      'public:images',
      'public:fonts'
    ]
  );
});
