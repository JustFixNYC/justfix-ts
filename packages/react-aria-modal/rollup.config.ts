import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

import { RollupWatchOptions } from 'rollup';

const config: RollupWatchOptions = {
  input: 'test-manual/react-aria-modal-manual-test.js',
  output: {
    format: 'iife',
    file: 'test-manual/react-aria-modal-manual-test.bundle.js',
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
