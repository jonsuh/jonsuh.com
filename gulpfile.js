var gulp         = require('gulp');
var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync');
var concat       = require('gulp-concat');
var eslint       = require('gulp-eslint');
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
      'node_modules/mcgriddle/_sass/mcgriddle',
      'node_modules/mq-sass/stylesheets',
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

gulp.task('eslint', function() {
  return gulp.src('themes/jonsuh-v8/source/assets/_js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('js', ['eslint'], function() {
  return gulp.src([
      'themes/jonsuh-v8/source/assets/_js/utility.js',
      'themes/jonsuh-v8/source/assets/_js/app.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/assets/js'));
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
  gulp.watch('themes/jonsuh-v8/source/assets/_js/**/*.js', ['js']);
});

gulp.task('build', ['css', 'js']);

gulp.task('default', ['build', 'watch']);
