var gulp = require('gulp'),
    del = require('del'),
    Builder = require('systemjs-builder'),
    deleteEmpty = require('delete-empty'),
    series = require('stream-series');
var $ = require('gulp-load-plugins')({ lasy: true });

var nodeResolve = require('rollup-plugin-node-resolve'),
    commonjs = require('rollup-plugin-commonjs'),
    rollup = require('rollup-stream'),
    source = require('vinyl-source-stream'),
    uglify = require('rollup-plugin-uglify');

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

    return gulp.src(['src/**/*.ts', '!src/*-aot.ts'])
        .pipe(tsProject())
        .pipe(gulp.dest('app/'));
});


gulp.task('default', ['foundation-style', 'app-typescript', 'app-html'], function () {

    gulp.watch('scss/**/*.scss', ['foundation-style']);
    gulp.watch('src/**/*.ts', ['app-typescript']);
    gulp.watch('src/**/*.html', ['app-html']);

});


/////////////////////////////////////////////////////////////////////////////////////////
/////   dist
/////////////////////////////////////////////////////////////////////////////////////////

gulp.task('dist-app-typescript', ['dist-app-html'], function () {

    var tsProject = $.typescript.createProject('tsconfig.json', { outDir: 'dist' });

    return gulp.src(['src/**/*.ts'])
        //.pipe($.inlineNg2Template({ base: '/dist/',  target: 'es5', removeLineBreaks:true }))
        .pipe(tsProject())
        .pipe(gulp.dest("dist/"));
});

gulp.task('dist-app-html', ['dist-compile'], function () {
    return gulp.src(['app/**/*.html'])
        .pipe($.htmlmin({ collapseWhitespace: true, caseSensitive: true, removeComments: true }))
        .pipe(gulp.dest('dist/app'));
});

gulp.task('dist-clean-app-html', ['dist-app-bundle'], function () {
    return del.sync(['dist/app', 'dist/**/*.js', '!dist/app-*.js', '!dist/vendor-*.js', '!dist/api/*.js']) &&
        deleteEmpty.sync('dist/');
});

gulp.task('dist-include', ['dist-compile'], function () {
    var cssFilter = $.filter('**/*.css', { restore: true });
    return gulp.src(['css/*.min.css', 'css/fonts/*.*', 'api/*.js'], { base: './' })
        .pipe(cssFilter)
        .pipe($.rev())
        .pipe(cssFilter.restore)
        .pipe(gulp.dest('dist/'));
});

gulp.task('dist-vendor', ['dist-compile'], function () {
    var jsFilter = $.filter('*.js', { restore: true });
    var cssFilter = $.filter('*.css', { restore: true });

    var vendorStyles = [];
    var vendorScripts = [
        'node_modules/jquery/dist/jquery.min.js',
        //'node_modules/hammerjs/hammer.min.js',
        'node_modules/toastr/build/toastr.min.js',
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.min.js',
        //'node_modules/reflect-metadata/Reflect.js',
        //'node_modules/systemjs/dist/system.js'
    ];

    return gulp.src([].concat(vendorScripts, vendorStyles))
        //.pipe(jsFilter)
        .pipe($.concat('vendor.js'))
        .pipe($.injectString.append(';window.module=\'aot\';'))
        .pipe($.rev())
        /*.pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe($.concatCss('vendor.css'))
        .pipe($.csso())
        .pipe($.rev())
        .pipe(cssFilter.restore)*/
        .pipe(gulp.dest('dist/'));
});

/*gulp.task('in', function(){

    return gulp.src(['dist/app.js'])
        .pipe($.stripComments())
        .pipe($.inlineNg2Template({ base: '/app/',  target: 'es5', removeLineBreaks:true }))
        .pipe(gulp.dest('dist/'));
});*/


gulp.task('dist-app-bundle', function (cb) {
    /*return gulp.src('app/src/main-aot.js')
        .pipe($.rollup({
            entry:'app/src/main-aot.js',
            allowRealFiles: true,
            sourceMap: false,
            format: 'iife',
            plugins: [
                nodeResolve({ jsnext: true, module: true }),
                commonjs({
                    include: 'node_modules/rxjs/**',
                })
            ]
        }))*/
    return rollup({
        entry:'app/src/main-aot.js',
            sourceMap: false,
            format: 'iife',
            plugins: [
                nodeResolve({ jsnext: true, module: true }),
                commonjs({
                    include: 'node_modules/rxjs/**',
                }),
                uglify()
            ]
        })
        .pipe(source('app.js'))
        .pipe($.streamify($.rev()))
        .pipe(gulp.dest('dist/'));
});


/*gulp.task('dist-app-js', ['dist-app-bundle'], function () {
    return gulp.src('dist/app.js')
        //.pipe($.uglify())
        .pipe($.rev())
        .pipe(gulp.dest('dist/'));
});

gulp.task('dist-app-bundle', ['dist-app-typescript'], function(cb) {  
   
    // overide systemjs.config.js
   filterSystemConfig = function(config){
       config.map.app = 'dist';
   }
   
   var builder = new Builder('/', 'systemjs.config.js');
   
   builder.buildStatic('dist/main.js', 'dist/app.js', {minify: true}).then(function() {
        return cb();
    }).catch(function(err) {
        throw err;
    });
});*/

gulp.task('dist-clean', function () {
    return del(['dist']);
});

gulp.task('dist-compile', ['dist-clean', /*'app-typescript',*/ 'app-html', 'foundation-style', 'font-awesome-fonts'], function () {
});

gulp.task('dist', ['dist-include', 'dist-app-html', 'dist-clean-app-html', 'dist-vendor'], function () {
    return gulp.src('index.html')
        .pipe($.inject(series(gulp.src(['dist/vendor-*.js', 'dist/vendor-*.css'], { read: false }), gulp.src(['dist/app-*.js', 'dist/css/app-*.css'], { read: false })), { removeTags: true, relative: true, ignorePath: 'dist/' }))
        .pipe($.htmlmin({ collapseWhitespace: true, caseSensitive: true, removeComments: true }))
        .pipe($.replace('<base href="/"', '<base href="/dist/"'))
        .pipe(gulp.dest('dist/'));
});
