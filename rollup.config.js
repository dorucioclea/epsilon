import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import replace from '@rollup/plugin-replace'
import pkg from './package.json'

export default [
  // browser-friendly UMD build
  {
    input: 'src/browser.js',
    output: {
      name: 'epsilon',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.js',
    external: ['ws'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
]
