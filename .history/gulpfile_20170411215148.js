var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    header = require('gulp-header'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    precss = require('gulp-postcss'),
    package = require('./package.json');
lost = require('lost');

var paths = {
    cssSource: 'src/css/',
    cssDestination: 'app/assets/css'
};

gulp.task('css', function() {
    return gulp.src(paths.cssSource + '**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([require('lost'), require('precss'), require('autoprefixer')]))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.cssDestination))
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task('js', function() {
    gulp.src('src/js/scripts.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('app/assets/js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/assets/js'))
        .pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "app"
        }
    });
});
gulp.task('bs-reload', function() {
    browserSync.reload();
});

gulp.task('default', ['css', 'js', 'browser-sync'], function() {
    gulp.watch("paths.cssSource + '**/*.css'", ['css']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch("app/*.html", ['bs-reload']);
});