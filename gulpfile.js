var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    filter       = require('gulp-filter'),
    merge        = require('merge-stream'),
    newer        = require('gulp-newer'),
    reload       = browserSync.reload,
    shell        = require('gulp-shell'),
    sass         = require('gulp-sass');

gulp.task('sass', function() {
  return gulp.src('assets/sass/**/*.scss')
    // .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [
        'bower_components/bourbon/app/assets/stylesheets',
        'bower_components/mq-sass/stylesheets',
        'bower_components/neat/app/assets/stylesheets'
      ]
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
    }))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css'))
    .pipe(filter('**/*.css'))
    .pipe(reload({stream: true}));
});

gulp.task('sass-jekyll', function() {
  return gulp.src('assets/sass/**/*.scss')
    // .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [
        'bower_components/bourbon/app/assets/stylesheets',
        'bower_components/mq-sass/stylesheets',
        'bower_components/neat/app/assets/stylesheets'
      ]
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
    }))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(filter('**/*.css'))
    .pipe(reload({stream: true}));
});

gulp.task('concat', function() {
  var jonsuh = gulp.src([
    'bower_components/picturefill/dist/picturefill.js',
    'assets/js/src/utility.js',
    'assets/js/src/social.js',
    'assets/js/src/work.js',
    'assets/js/src/app.js'
  ])
    .pipe(concat('jonsuh.js'))
    .pipe(gulp.dest('assets/js'));

  var critical = gulp.src([
    'assets/js/src/critical.js'
  ])
    .pipe(concat('jonsuh.js'))
    .pipe(gulp.dest('_includes/critical/js'));

  var chart = gulp.src([
    'bower_components/chartjs/src/Chart.Core.js',
    'bower_components/chartjs/src/Chart.Line.js',
    'assets/js/vendor/Chart.legend.js'
  ])
    .pipe(concat('chart.js'))
    .pipe(gulp.dest('assets/js'));

  var blog_https_increased = gulp.src([
    'assets/js/src/blog/https-increased-organic-search-impressions-by-144-percent.js',
  ])
    .pipe(concat('https-increased-organic-search-impressions-by-144-percent.js'))
    .pipe(gulp.dest('assets/js/blog'));

  return merge(jonsuh, critical, chart, blog_https_increased);
});

gulp.task('concat-jekyll', function() {
  var jonsuh = gulp.src([
    'bower_components/picturefill/dist/picturefill.js',
    'assets/js/src/utility.js',
    'assets/js/src/social.js',
    'assets/js/src/work.js',
    'assets/js/src/app.js'
  ])
    .pipe(newer('_site/assets/js/jonsuh.com'))
    .pipe(concat('jonsuh.js'))
    .pipe(gulp.dest('_site/assets/js'));

  var critical = gulp.src([
    'assets/js/src/critical.js'
  ])
    .pipe(newer('_includes/critical/js/jonsuh.js'))
    .pipe(concat('jonsuh.js'))
    .pipe(gulp.dest('_includes/critical/js'));

  var chart = gulp.src([
    'bower_components/chartjs/src/Chart.Core.js',
    'bower_components/chartjs/src/Chart.Line.js',
    'assets/js/vendor/Chart.legend.js'
  ])
    .pipe(newer('_site/assets/js/chart.js'))
    .pipe(concat('chart.js'))
    .pipe(gulp.dest('_site/assets/js'));

  var blog_https_increased = gulp.src([
    'assets/js/src/blog/https-increased-organic-search-impressions-by-144-percent.js',
  ])
    .pipe(newer('_site/assets/js/blog/https-increased-organic-search-impressions-by-144-percent.js'))
    .pipe(concat('https-increased-organic-search-impressions-by-144-percent.js'))
    .pipe(gulp.dest('_site/assets/js/blog'));

  return merge(jonsuh, critical, chart, blog_https_increased);
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
    server: {
      baseDir: './_site'
    }
  });
});

gulp.task('build', ['sass', 'jekyll']);

gulp.task('default', ['sass', 'browsersync', 'watch']);