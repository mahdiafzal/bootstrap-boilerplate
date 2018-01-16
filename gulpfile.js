var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync')
var sourcemaps = require('gulp-sourcemaps')
 
gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./docs/css'))
})
 
gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass'])
})

var server = browserSync.create()
gulp.task('server', () => 
  server.init({
    ui: false,
    server: {
      baseDir: ['./docs/'],
      index: 'index.html'
    }
  })
)

gulp.task('serverBrowserSync', () =>
  server.reload()
)

gulp.task('server:watch', () => 
  gulp
    .watch([
      './docs/css/*',
      './docs/dummy/*',
      './docs/favicons/*',
      './docs/fonts/*',
      './docs/images/*',
      './docs/js/*',
      './docs/*',
    ], ['serverBrowserSync'])
)

gulp.task('default', ['sass', 'sass:watch', 'server', 'server:watch'])