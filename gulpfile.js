'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var uglify = require('gulp-uglifyjs');

gulp.task('compress-js', function() {
  return gulp.src('./app/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./app/dist'))
		.pipe(connect.reload());
});

gulp.task('sass', function () {
  return gulp.src('./app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/dist'))
		.pipe(connect.reload());
});

gulp.task('connectDev', function () {
  connect.server({
    root: ['app', 'tmp'],
    port: 9000,
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']);
  gulp.watch(['./app/**/*.scss'], ['sass']);
	gulp.watch(['./app/js/**.*js'], ['compress-js'])
});

gulp.task('dev', ['connectDev', 'watch']);
