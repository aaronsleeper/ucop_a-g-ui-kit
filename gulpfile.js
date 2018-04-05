var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var multiDest = require('gulp-multi-dest');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var concat = require('gulp-concat');

// destOption - required var for multiDest
// https://www.npmjs.com/package/gulp-multi-dest
var destOptions = {
    mode: 0755
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'pack-vendor-js', 'pack-js'], function () {

    browserSync.init({
        server: './app'
    });

    gulp.watch('app/scss/*.scss', ['sass']);
    gulp.watch('app/scripts/*.js', ['pack-js']);
    gulp.watch('app/*.html').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return (gulp
        .src("app/scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ["last 2 versions"],
            cascade: false
          }))
        .pipe(sourcemaps.write("."))
        // open to a better way to link these related code bases. hit me up -AS
        // sorry for the absolute path relative to my machine
        .pipe(multiDest([
            "app/css"
          ]))
        .pipe(browserSync.stream()) );
});

// Compile vendor js
gulp.task('pack-vendor-js', function () {
    return gulp
      .src([
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/popper.js/dist/umd/popper.min.js",
        "node_modules/bootstrap/dist/js/bootstrap.min.js",
        "node_modules/lottie-web/build/player/lottie.js"
      ])
      .pipe(concat("vendor.js"))
      .pipe(multiDest([
          "app/js"
        ]));
});

// Compile custom js into JS & auto-inject into browsers
gulp.task('pack-js', function () {
    return gulp
      .src([
        "app/scripts/tooltips.js",
        "app/scripts/loader.js",
        "app/scripts/scripts.js"
      ])
      .pipe(concat("app.js"))
      .pipe(multiDest([
          "app/js"
        ]))
      .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);