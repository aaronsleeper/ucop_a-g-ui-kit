var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var multiDest = require('gulp-multi-dest'); 
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var clean = require('gulp-clean');

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
        "app/scripts/lottie-animations.js",
        "app/scripts/scripts.js"
      ])
      .pipe(concat("app.js"))
      .pipe(multiDest([
          "app/js"
        ]))
      .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

// Delete the dist directory
gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(clean());
});

// dist js.  TODO: minify
gulp.task('dist-js', ['clean', 'pack-js', 'pack-vendor-js'], function () {
    return gulp
      .src(['app/js/vendor.js', 'app/js/app.js'])
      .pipe(concat('ucop_a-g-ui-kit.js'))
      .pipe(multiDest(['dist/js']))
});

// dist css.  TODO: minify
gulp.task('dist-css', ['clean', 'sass'], function() {
    return (gulp
        .src("app/css/app.css")
        .pipe(rename('ucop_a-g-ui-kit.css'))
        .pipe(multiDest(["dist/css"]))
    );
});

// dist svg.  TODO: minify?
gulp.task('dist-svg', ['clean'], function() {
    return (gulp
        .src("app/img/*")
        .pipe(multiDest(["dist/img"]))
    );
});

gulp.task('build', ['dist-css', 'dist-js', 'dist-svg']);
