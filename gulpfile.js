var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var autoprefixer = require('autoprefixer');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var postcss      = require('gulp-postcss');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var exec         = require('child_process').exec;

var onError = function(err) {
  notify.onError({
    title:    "Error",
    message:  "<%= error %>",
  })(err);
  this.emit('end');
};

var plumberOptions = {
  errorHandler: onError,
};

gulp.task('css', function() {
  var sassOptions = {
    includePaths: [
      // 'node_modules/',
    ]
  };

  var postCSSOptions = require('./config.postcss.json');
  var postCSSProcessors = [
    autoprefixer(postCSSOptions.autoprefixer),
  ];

  return gulp.src('themes/jonsuh-v8/source/assets/_sass/**/*.scss')
    .pipe(plumber(plumberOptions))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(postcss(postCSSProcessors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/css'));
});

gulp.task('watch', function() {
  var browserSyncConfig = require('./bs-config.js');

  browserSync.init(browserSyncConfig);

  exec('hexo generate --watch', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });

  gulp.watch('themes/jonsuh-v8/source/assets/_sass/**/*.scss', ['css']);
});

gulp.task('build', ['css']);

gulp.task('default', ['build', 'watch']);
