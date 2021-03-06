import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from "rollup-plugin-uglify";

export default {
    input: 'src/main-aot.js',
    output: {
        format: 'iife',
        file: 'dist/app.js'
    },
    onwarn: function (warning) {
        if (warning.code === 'THIS_IS_UNDEFINED') { return; }
        console.warn(warning.message);
    },
    /*globals: {
        firebase: 'firebase'
    },
    external: ['firebase'],*/
    plugins: [
        nodeResolve({
            mainFields:['module', 'jsnext:main'],
            /*jsnext: true,
            module: true,*/
            browser: true
        }),
        commonjs({
            include: ['node_modules/rxjs/**', 'node_modules/@firebase/**']
        }),
        uglify({ sourcemap: false })
    ]
}