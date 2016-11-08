var gulp = require('gulp'), del = require('del');
var $ = require('gulp-load-plugins')({ lasy: true });

gulp.task('foundation-style', ['font-awesome-fonts'], function () {

    return gulp.src('scss/app.scss')
        .pipe($.sass({
            outputStyle: 'nested',
            precision: 5,
            includePaths: [
                'node_modules/foundation-sites/scss',
                'node_modules/font-awesome/scss',
                'node_modules/toastr'
            ]
        }))
        .pipe($.rename('app.css'))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 11', 'ios_saf >= 9', 'and_chr >= 5.0']
        }))
        .pipe(gulp.dest('css'))
        .pipe($.rename('app.min.css'))
        .pipe($.csso())
        .pipe(gulp.dest('css'));
});

gulp.task('font-awesome-fonts', function () {
    return gulp.src(['node_modules/font-awesome/fonts/*.*'])
        .pipe(gulp.dest('css/fonts'));
});


gulp.task('app-clean-html', function () {
    return del(['app/**/*.html']);
});

gulp.task('app-html', ['app-clean-html'], function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('app/'));
});

gulp.task('app-clean-typescript', function () {
    return del(['app/**/*.js']);
});

gulp.task('app-typescript', ['app-clean-typescript'], function () {

    var tsProject = $.typescript.createProject('tsconfig.json');

    return gulp.src(['typings/index.d.ts', 'src/**/*.ts'])
        .pipe(tsProject())
        .pipe(gulp.dest('app/'));
});


gulp.task('default', ['foundation-style', 'app-typescript', 'app-html'], function () {

    gulp.watch('scss/**/*.scss', ['foundation-style']);
    gulp.watch('src/**/*.ts', ['app-typescript']);
    gulp.watch('src/**/*.html', ['app-html']);

});