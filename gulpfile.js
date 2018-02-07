var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    cleanCss = require('gulp-clean-css'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    babel = require('gulp-babel'),
    webserver = require('gulp-webserver');

var src = './process',
    dest = './app',
    env = 'development';

gulp.task('css', function () {
  gulp.src(`${src}/css/app.css`)
    .pipe(gulpif(env === 'production', cleanCss()))
    .pipe(gulp.dest(`${dest}/css`));
});

gulp.task('js', function (cb) {
  pump([
        gulp.src(`${src}/js/*.js`),
        // gulp.src([`${src}/js/app.js`, `${src}/js/tabs.js`, `${src}/js/play-sound.js`]),
        browserify(),
        babel({ presets: ['es2015'] }),
        concat('app.js').on('error', function(err){
          console.error('Error!', err.message)
        }),
        gulpif(env === 'production', uglify()).on('error', function(err){
          console.error('Error!', err.message)
        }),
        gulp.dest(`${dest}/js`)
    ],
    cb
  );
});

gulp.task('watch', function() {
    gulp.watch([src + '/js/**/*', dest + '/data/**/*'], ['js']);
    gulp.watch(src + '/css/*.css', ['css']);
});

gulp.task('webserver', ['css', 'js'], function() {
  gulp.src(dest)
  .pipe(webserver({
      livereload: true,
      open: true
  }));
});

gulp.task('default', ['watch', 'webserver']);
