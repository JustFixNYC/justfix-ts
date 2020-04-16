import resolve from 'rollup-plugin-node-resolve';

const config = {
  input: 'dist/test-manual/geosearch-manual-test.js',
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
