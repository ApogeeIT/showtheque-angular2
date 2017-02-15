module.exports = function (config) {
    'use strict';

    config.set({
        autoWatch: true,
        basePath: './',
        frameworks: [
            'jasmine'
        ],

        // list of files / patterns to load in the browser
        files: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/toastr/build/toastr.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-route/angular-route.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/**/*.js',
            'test/**/*.js'
        ],
        exclude: [
        ],
        port: 8080,
        browsers: [
            'PhantomJS'
        ],

        reporters: ['progress', 'coverage'],
        preprocessors: {
            'src/**/*.js': ['coverage']
        },
        coverageReporter: {
            type: 'html',
            dir: 'coverage'
        },

        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-coverage' // required for coverage
        ],
        singleRun: true,
        colors: true,
        logLevel: config.LOG_INFO,
    });
};