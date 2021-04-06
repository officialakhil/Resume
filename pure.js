var gulp = require('gulp');
var plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const wait = require('gulp-wait');
const babel = require('gulp-babel');;
const rename = require('gulp-rename');

gulp.task('scripts', function() {
  return gulp.src('./js/scripts.js')
    .pipe(plumber(plumber({
      errorHandler: function(err) {
        console.log(err);
        this.emit('end');
      }
    })))
    .pipe(babel({
      presets: [
        ['@babel/env', {
          modules: false
        }]
      ]
    }))
    .pipe(uglify({
      output: {
        comments: '/^!/'
      }
    }))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('./js'));
});

gulp.task('styles', function() {
  return gulp.src('./scss/styles.scss')
    .pipe(wait(250))
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
  gulp.watch('./js/scripts.js', gulp.series('scripts'));
  gulp.watch('./scss/styles.scss', gulp.series('styles'));
});

var dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
if (dnt != "1" && dnt != "yes") {
  (function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    (i[r] =
      i[r] ||
      function() {
        (i[r].q = i[r].q || []).push(arguments);
      }),
    (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(
    window,
    document,
    "script",
    "https://www.google-analytics.com/analytics.js",
    "ga"
  );
  ga("create", "", "auto");
  ga("send", "pageview");
}
