var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('roll-tape', shell.task([
  'tape test | faucet',
]));

gulp.task('autoexec', ['roll-tape'], function() {
  gulp.watch(['src/**/*.js', 'test/**/*.js'], ['roll-tape']);
});

gulp.task('default', ['autoexec']);