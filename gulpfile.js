var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var scsslint = require('gulp-scss-lint');

var config = {
    scssPath: './scss/**/*.scss',
    cssOutput: './dist/css',
};

gulp.task('sass-dev', function () {
    return gulp.src(config.scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.cssOutput));
});
gulp.task('sass-prod', function () {
    return gulp.src(config.scssPath)
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.cssOutput));
});
gulp.task('watch', function () {
    gulp.watch(config.scssPath, ['sass-dev', 'sass-prod']);
});
gulp.task('test:sass', function () {
    return gulp.src(config.scssPath)
        .pipe(scsslint({'config': './scss/.scss-lint.yml'}));
})