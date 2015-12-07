import gulp from 'gulp';
import runSequence from 'run-sequence';


gulp.task('server:build', (callback) => {
  runSequence(
    'server:clean',
    'server:test',
    ['server:javascripts', 'server:views'],
    callback
  );
});
