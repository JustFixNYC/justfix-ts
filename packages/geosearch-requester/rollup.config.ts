import resolve from 'rollup-plugin-node-resolve';
import { RollupWatchOptions } from 'rollup';

const config: RollupWatchOptions = {
  input: 'test-manual/geosearch-manual-test.js',
  output: {
    format: 'iife',
    file: 'test-manual/geosearch-manual-test.bundle.js',
    sourcemap: 'inline',
  },
  watch: {
    clearScreen: false
  },
  plugins: [
    resolve()
  ]
};

export default config;
