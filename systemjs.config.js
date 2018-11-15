/*

map: { 'rxjs': path.join(__dirname, '..', '..', 'dist', 'package', '/') },
  packages: {
    'rxjs': {main: 'index.js', defaultExtension: 'js' },
    'rxjs/ajax': {main: 'index.js', defaultExtension: 'js' },
    'rxjs/operators': {main: 'index.js', defaultExtension: 'js' },
    'rxjs/testing': {main: 'index.js', defaultExtension: 'js' },
    'rxjs/webSocket': {main: 'index.js', defaultExtension: 'js' }
}
*/


(function (global) {
  var config = {
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      // other libraries
      'rxjs': 'npm:rxjs',
      'rxjs/operators': 'npm:rxjs/operators',
      'tslib': 'npm:tslib/tslib.js',

      //'firebase': 'npm:firebase',
      '@firebase/app': 'npm:@firebase/app/dist/',
      '@firebase/auth': 'npm:@firebase/auth/dist/auth.js',
      '@firebase/util': 'npm:@firebase/util/dist/',
      '@firebase/database': 'npm:@firebase/database/dist/',
      '@firebase/logger': 'npm:@firebase/logger/dist/',
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main',
        defaultExtension: 'js'
      },
      'rxjs/operators': {main: 'index.js', defaultExtension: 'js' },
      'rxjs': { main: 'index.js', defaultExtension: 'js' },
      '@firebase/app': {
        main: 'index.cjs',
        defaultExtension: 'js'
      },
      '@firebase/util': {
        main: 'index.cjs',
        defaultExtension: 'js'
      },
      '@firebase/database': {
        main: 'index.cjs',
        defaultExtension: 'js'
      },
      '@firebase/logger': {
        main: 'index.cjs',
        defaultExtension: 'js'
      }
    }
  };

  if (global.filterSystemConfig) { global.filterSystemConfig(config); }

  System.config(config);

})(this);