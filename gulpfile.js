var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('runtests', function () {
    return gulp.src('tests/**/*.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});