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
// swPrecache = require('sw-precache'),
// path = require('path');

var src = './process',
dest = './app',
env = 'production';

gulp.task('css', function () {
  gulp.src(`${src}/css/app.css`)
  .pipe(gulpif(env === 'production', cleanCss()))
  .pipe(gulp.dest(`${dest}/css`));
});

// failed attempt to utilize service workers, which caches assets so the web app can be rendered offline; reluctant to throw away code
// gulp.task('generate-service-worker', function (cb) {
//   swPrecache.write(path.join(dest, 'service-worker.js'), {
//     staticFileGlobs:
//     [dest + '/**/*.{js,html,json,css,png,jpg,gif,svg,eot,ttf,woff}'],
//     stripPrefix: dest,
//     runtimeCaching: [{
//       urlPattern: /^https:\/\/drive\.google\.com\//,
//       handler: 'cacheFirst'
//     },
//     {
//       urlPattern: /^https:\/\/api\.soundcloud\.com\//,
//       handler: 'cacheFirst'
//     }]
//   }, cb);
// });
gulp.task('js', function (cb) {
  pump([
    gulp.src(`${src}/js/*.js`),
    babel({ presets: ['es2015'] }),
    concat('app.js').on('error', function(err){
      console.error('Error!', err.message)
    }),
    browserify(),
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

gulp.task('webserver', [ 'css', 'js'], function() {
  gulp.src(dest)
  .pipe(webserver({
    livereload: true,
    open: true
  }));
});

gulp.task('default', ['watch', 'webserver']);
