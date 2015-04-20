var gulp = require('gulp'),
  connect = require('gulp-connect'),
  watch = require('gulp-watch'),
  coffee = require('gulp-coffee'),
  uglify  = require('gulp-uglify');
 
gulp.task('webserver', function() {
  connect.server({
    livereload: true,
  });
});
 
gulp.task('livereload', function() {
  watch('./*')
    .pipe(connect.reload());
});
 
gulp.task('coffee', function() {
  gulp.src('./*.coffee')
    .pipe(coffee())
    .pipe(gulp.dest('.'))
    .pipe(connect.reload());
});

// can add more here
gulp.task('watch', function() {
  gulp.watch('./*.coffee', ['coffee'])
})

// TODO: all
gulp.task('minScripts', function() {
	gulp.src('public/scripts/*.js')
		.pipe(uglify())
		.pipe(concat('all.js'))
		.pipe(gulp.dest('public/scripts'));
});

gulp.task('default', ['coffee', 'webserver', 'livereload', 'watch']);