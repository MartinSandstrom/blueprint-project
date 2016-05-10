'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var uglify = require('gulp-uglifyjs');

var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

gulp.task('compress-js', function() {
  return gulp.src('./app/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./app/dist'))
		.pipe(connect.reload());
});

gulp.task('sass', function () {
  return gulp.src('./app/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('css', ['sass'], function(){
	gulp.src('./app/css/**/*.css')
	    .pipe(minifyCSS())
	    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
	    .pipe(concat('style.min.css'))
	    .pipe(gulp.dest('./app/dist/'))
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
  gulp.watch(['./app/**/*.scss'], ['css']);
	gulp.watch(['./app/js/**.*js'], ['compress-js'])
});

gulp.task('dev', ['connectDev', 'css', 'compress-js', 'watch']);
