var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync'),
    filter       = require('gulp-filter'),
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

gulp.task('jekyll', shell.task([
  'bundle exec jekyll build',
]));

gulp.task('jekyll-watch', shell.task([
  'bundle exec jekyll build --watch',
]));

gulp.task('watch', function() {
  gulp.watch('assets/sass/**/*.scss', ['sass-jekyll']);
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