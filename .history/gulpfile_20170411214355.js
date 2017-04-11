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
    cssnano = require('gulp-cssnano'),
    package = require('./package.json');
lost = require('lost');

var paths = {
    cssSource: 'src/css/',
    cssDestination: 'app/assets/css'
};

gulp.task('css', function() {
    return gulp.src(paths.cssSource + '**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([
            lost(),
            autoprefixer(),
        ]))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.cssDestination))

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


gulp.task('default', ['css', 'js'], function() {
    gulp.watch("paths.cssSource + '**/*.css'", ['css']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch("app/*.html", ['bs-reload']);
});