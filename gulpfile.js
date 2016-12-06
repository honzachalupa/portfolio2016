var gulp = require("gulp"),
    sass = require("gulp-sass"),
    babel = require("gulp-babel"),
    babelify = require("babelify"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    plumber = require("gulp-plumber"),
    autoprefix = require("gulp-autoprefixer"),
    clean = require("gulp-clean-css"),
    browserSync = require("browser-sync");

gulp.task("html", function() {
    gulp.src("www/**/*.html")
    .pipe(browserSync.reload({ stream: true }));
});

// SASS tasks
gulp.task("styles", function() {
    gulp.src(["www/css/*.scss"])
        .pipe(plumber())
        .pipe(sass({ config_file: "config.rb" }))
        .pipe(autoprefix("last 2 versions"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(clean())
        .pipe(gulp.dest("www/css"))
        .pipe(browserSync.reload({ stream: true }));
});

// Scripts tasks
gulp.task("scripts", function() {
    gulp.src(["www/js/*.js", "!www/js/*.min.js"])
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        //.pipe(rename({ suffix: ".min" }))
        //.pipe(gulp.dest("www/js"))
        .pipe(browserSync.reload({ stream: true }));
});

// Watch tasks
gulp.task("watch", function() {
    gulp.watch("www/**/*.js", ["scripts"]),
    gulp.watch("www/**/*.scss", ["styles"]),
    gulp.watch("www/**/*.html", ["html"]),
    gulp.watch("www/**/*.htm", ["html"])
});

// Browser Sync task
gulp.task("browser-sync", function() {
    browserSync({
        server: {
            baseDir: "./www/"
        },
        open: false
    });
});

// Default task
gulp.task("default", ["html", "styles", "scripts", "browser-sync", "watch"]);
