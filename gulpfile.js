var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    filter       = require('gulp-filter'),
    merge        = require('merge-stream'),
    newer        = require('gulp-newer'),
    notify       = require('gulp-notify'),
    plumber      = require('gulp-plumber'),
    reload       = browserSync.reload,
    shell        = require('gulp-shell'),
    sass         = require('gulp-sass');

var onError = function(err) {
  notify.onError({
    title:    "Error",
    message:  "<%= error.message %>",
  })(err);
  this.emit('end');
};

var plumberOptions = {
  errorHandler: onError,
};

var autoprefixerOptions = {
  browsers: ['last 2 versions'],
};

var filterOptions = '**/*.css';

var reloadOptions = {
  stream: true,
};

var sassOptions = {
  options: {
    includePaths: [
      'bower_components/bourbon/app/assets/stylesheets',
      'bower_components/mq-sass/stylesheets',
      'bower_components/neat/app/assets/stylesheets'
    ],
  },
  destBuild: 'assets/css',
  destJekyll: '_site/assets/css',
};

gulp.task('sass', function() {
  return gulp.src('assets/sass/**/*.scss')
    .pipe(plumber(plumberOptions))
    // .pipe(sourcemaps.init())
    .pipe(sass(sassOptions.options))
    .pipe(autoprefixer(autoprefixerOptions))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(sassOptions.destBuild))
    .pipe(filter(filterOptions))
    .pipe(reload(reloadOptions));
});

gulp.task('sass-jekyll', function() {
  return gulp.src('assets/sass/**/*.scss')
    .pipe(plumber(plumberOptions))
    // .pipe(sourcemaps.init())
    .pipe(sass(sassOptions.options))
    .pipe(autoprefixer(autoprefixerOptions))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(sassOptions.destJekyll))
    .pipe(filter(filterOptions))
    .pipe(reload(reloadOptions));
});

var concatOptions = {
  concat: {
    src: [
      // 'assets/js/vendor/promise.js',
      // 'bower_components/picturefill/dist/picturefill.js',
      // 'bower_components/fontfaceobserver/fontfaceobserver.js',
      'assets/js/src/utility.js',
      'assets/js/src/social.js',
      'assets/js/src/work.js',
      'assets/js/src/app.js'
    ],
    filename: 'jonsuh.js',
  },
  critical: {
    src: [
      'bower_components/loadcss/loadCSS.js',
      'assets/js/vendor/promise.js',
      'bower_components/fontfaceobserver/fontfaceobserver.js',
      'assets/js/src/critical.js'
    ],
    filename: 'jonsuh.js',
    dest: '_includes/critical/js',
  },
  chart: {
    src: [
      'bower_components/chartjs/src/Chart.Core.js',
      'bower_components/chartjs/src/Chart.Line.js',
      'assets/js/vendor/Chart.legend.js'
    ],
    filename: 'chart.js',
  },
  flickity: {
    src: [
      'bower_components/flickity/dist/flickity.pkgd.js'
    ],
    filename: 'flickity.js'
  },
  blogHttpsIncreased: {
    src: [
      'assets/js/src/blog/https-increased-organic-search-impressions-by-144-percent.js'
    ],
    filename: 'https-increased-organic-search-impressions-by-144-percent.js',
    destBuild: 'assets/js/blog',
    destJekyll: '_site/assets/js/blog',
  },
  destBuild: 'assets/js',
  destJekyll: '_site/assets/js',
};

gulp.task('concat', function() {
  var jonsuh = gulp.src(concatOptions.concat.src)
    .pipe(concat(concatOptions.concat.filename))
    .pipe(gulp.dest(concatOptions.destBuild));

  var critical = gulp.src(concatOptions.critical.src)
    .pipe(concat(concatOptions.critical.filename))
    .pipe(gulp.dest(concatOptions.critical.dest));

  var chart = gulp.src(concatOptions.chart.src)
    .pipe(concat(concatOptions.chart.filename))
    .pipe(gulp.dest(concatOptions.destBuild));

  var flickity = gulp.src(concatOptions.flickity.src)
    .pipe(concat(concatOptions.flickity.filename))
    .pipe(gulp.dest(concatOptions.destBuild));

  var blog_https_increased = gulp.src(concatOptions.blogHttpsIncreased.src)
    .pipe(concat(concatOptions.blogHttpsIncreased.filename))
    .pipe(gulp.dest(concatOptions.blogHttpsIncreased.destBuild));

  return merge(jonsuh, critical, chart, flickity, blog_https_increased);
});

gulp.task('concat-jekyll', function() {
  var jonsuh = gulp.src(concatOptions.concat.src)
    .pipe(concat(concatOptions.concat.filename))
    .pipe(gulp.dest(concatOptions.destJekyll));

  var critical = gulp.src(concatOptions.critical.src)
    .pipe(concat(concatOptions.critical.filename))
    .pipe(gulp.dest(concatOptions.critical.dest));

  var chart = gulp.src(concatOptions.chart.src)
    .pipe(concat(concatOptions.chart.filename))
    .pipe(gulp.dest(concatOptions.destJekyll));

  var flickity = gulp.src(concatOptions.flickity.src)
    .pipe(concat(concatOptions.flickity.filename))
    .pipe(gulp.dest(concatOptions.destJekyll));

  var blog_https_increased = gulp.src(concatOptions.blogHttpsIncreased.src)
    .pipe(concat(concatOptions.blogHttpsIncreased.filename))
    .pipe(gulp.dest(concatOptions.blogHttpsIncreased.destJekyll));

  return merge(jonsuh, critical, chart, flickity, blog_https_increased);
});

gulp.task('jekyll', shell.task([
  'bundle exec jekyll build',
]));

gulp.task('jekyll-watch', shell.task([
  'bundle exec jekyll build --watch',
]));

gulp.task('watch', function() {
  gulp.watch('assets/sass/**/*.scss', ['sass-jekyll']);
  gulp.watch('assets/js/src/**/*.js', ['concat-jekyll']);
  gulp.run('jekyll-watch');
});

gulp.task('browsersync', function() {
  browserSync({
    proxy: 'jonsuh.local',
    open: false,
    notify: false,
  });
});

gulp.task('build', ['sass', 'concat', 'jekyll']);

gulp.task('default', ['sass', 'concat', 'browsersync', 'watch']);