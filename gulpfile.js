var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    cleanCss = require('gulp-clean-css')
    gulpif = require('gulp-if');

var src = './process',
    dest = './app',
    env = 'production';

gulp.task('css', function () {
  gulp.src(`${src}/css/app.css`)
    .pipe(gulpif(env === 'production', cleanCss()))
    .pipe(gulp.dest(`${dest}/css`));
});
