'use strict';

let gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    autoprefix = require('gulp-autoprefixer'),
    clean = require('gulp-clean-css'),
    browserSync = require('browser-sync'),
    nunjucks = require('gulp-nunjucks');

// HTML templates task
gulp.task('html-templates', function() {
    gulp.src('src/tpl/*.njk')
        .pipe(nunjucks.compile())
        .pipe(rename({ extname: '.html' }))
        .pipe(gulp.dest('www'))
        .pipe(browserSync.reload({ stream: true }));
});

// HTML task
gulp.task('html', function() {
    gulp.src('src/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('www'))
        .pipe(browserSync.reload({ stream: true }));
});

// SASS task
gulp.task('styles', function() {
    gulp.src(['src/css/*.scss'])
        .pipe(plumber())
        .pipe(sass({ config_file: 'config.rb' }))
        .pipe(autoprefix('last 2 versions'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(clean())
        .pipe(gulp.dest('www/css'))
        .pipe(browserSync.reload({ stream: true }));
});

// Scripts task
gulp.task('scripts', function() {
    gulp.src('src/js/**/*.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('www/js'))
        .pipe(browserSync.reload({ stream: true }));
});

// Watch task
gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['scripts']);
    gulp.watch('src/**/*.scss', ['styles']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/**/*.njk', ['html-templates']);
});

// Browser Sync task
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './www/'
        },
        open: false
    });
});

// Default task
gulp.task(
    'default', [
        'html-templates',
        'html',
        'styles',
        'scripts',
        'browser-sync',
        'watch'
    ]
);
