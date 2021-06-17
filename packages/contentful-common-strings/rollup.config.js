//@ts-check
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

/** @type import('rollup').RollupWatchOptions */
const config = {
  input: 'dist/test-manual/contentful-common-strings-manual-test.js',
  output: {
    format: 'iife',
    file: 'test-manual/contentful-common-strings-manual-test.bundle.js',
    sourcemap: 'inline',
  },
  watch: {
    clearScreen: false
  },
  plugins: [
    resolve(),
    commonjs({
      include: '../../node_modules/**'
    }),
    replace({
      values: {
        'process.env.NODE_ENV': JSON.stringify('development'),
      }
    }),
  ]
};

export default config;
