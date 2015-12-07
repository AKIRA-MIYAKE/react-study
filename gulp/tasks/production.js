import gulp from 'gulp';


gulp.task('production', ['server:build', 'public:production']);
