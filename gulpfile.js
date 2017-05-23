var gulp         = require('gulp');
var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync');
var concat       = require('gulp-concat');
var eslint       = require('gulp-eslint');
var mergeStream  = require('merge-stream');
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

  return gulp.src([
      'themes/jonsuh-v8/source/assets/_sass/**/*.scss',
      'themes/jonsuh-v8/source/assets/css/**/*.css'
    ])
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

gulp.task('js-vendor', function() {
  var chartjs = gulp.src([
    'node_modules/chart.js/dist/Chart.js',
  ])
    .pipe(concat('chart.js'))
    .pipe(gulp.dest('public/assets/js'));

  var flickity = gulp.src(['node_modules/flickity/dist/flickity.pkgd.js'])
    .pipe(concat('flickity.js'))
    .pipe(gulp.dest('public/assets/js'));

  return mergeStream(chartjs, flickity);
});

gulp.task('js', ['js-vendor', 'eslint'], function() {
  return gulp.src([
      'node_modules/rellax/rellax.js',
      'themes/jonsuh-v8/source/assets/_js/utility.js',
      'themes/jonsuh-v8/source/assets/_js/share.js',
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

  gulp.watch([
    'themes/jonsuh-v8/source/assets/_sass/**/*.scss',
    'themes/jonsuh-v8/source/assets/css/**/*.css'
  ], ['css']);
  gulp.watch('themes/jonsuh-v8/source/assets/_js/**/*.js', ['js']);
});

gulp.task('build', ['css', 'js']);

gulp.task('default', ['build', 'watch']);
