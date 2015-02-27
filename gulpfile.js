var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync'),
    filter       = require('gulp-filter'),
    reload       = browserSync.reload,
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
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(gulp.dest('assets/css'))
    .pipe(filter('**/*.css'))
    .pipe(reload({stream: true}));
});

gulp.task('watch', function() {
  gulp.watch('assets/sass/**/*.scss', ['sass']);
});

gulp.task('browsersync', function() {
  browserSync({
    server: {
      baseDir: './_site'
    }
  });
});

gulp.task('build', ['sass']);

gulp.task('default', ['build', 'browsersync', 'watch']);