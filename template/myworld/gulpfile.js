var gulp = require('gulp');
var browserSync = require('browser-sync');
var plugins = require('gulp-load-plugins')();
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var del = require('del');
gulp.task('jade', function(){
  return gulp.src('public/templates/*.jade')
    .pipe(plugins.jade())
    .pipe(gulp.dest('../../app/views/templates'))
});
gulp.task('js', function(){
  return gulp.src('public/javascripts/*.js')
    .pipe(gulp.dest('../../app/assets/javascripts'))
})
gulp.task('browser-sync', function(){
  browserSync({
    port: 3002,
    ghostMode: false,
    server: {
      baseDir: "../../app/views/templates"
    }
  });
});
gulp.task('clean', function(){
  del.sync('../../app/views',{force: true});
});
gulp.task('watch', function(){
  gulp.watch([
    'public/templates/*.jade',
  ],function(){
    runSequence('jade','bs-reload');
  });
})
gulp.task('bs-reload', function(){
  browserSync.reload();
});
gulp.task('default', function(){
  runSequence('clean', 'jade', 'js', 'browser-sync', 'watch');
});
