var gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  minifyCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync').create();



gulp.task('sass', function () {
  // sass directory
  return gulp.src('./src/sass/*scss')
    .pipe(sass())
    //outputstyle (nested, compact, expanded, compressed)
    .pipe(sass({ outputStyle: 'compact' }).on('error', sass.logError))
    // sourcemaps
    .pipe(sourcemaps.init())
    // sourcemaps output directory
    .pipe(sourcemaps.write(('./maps')))
    // css output directory
    .pipe(gulp.dest('./docs/css')),
    // watch file
    gulp.watch('./sass/*.scss', ['sass']);
});


// minify css (merge + autoprefix + rename)
gulp.task('minify-css', function () {
  return gulp.src('./docs/css/styles.css')
    .pipe(minifyCss())
    // autoprefixer
    .pipe(autoprefixer({
      browsers: ['last 15 versions'],
      cascade: false
    }))
    // minify output directory
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('./docs/css'))
    // browser sync
    .pipe(browserSync.reload({ stream: true })),
    // watch file
    gulp.watch('./docs/css/styles.css', ['minify-css']);
});


// sass/css browser tracking
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './docs/'
    }
  });
  // watch html
  gulp.watch([
    './docs/css/*',
    './docs/dummy/*',
    './docs/favicons/*',
    './docs/fonts/*',
    './docs/images/*',
    './docs/js/*',
    './docs/*',
  ]).on('change', browserSync.reload);
});

// gulp default (sass, minify-css, browser-sync) method
gulp.task('default', ['sass', 'minify-css', 'browser-sync']);