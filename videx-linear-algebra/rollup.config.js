import babel from 'rollup-plugin-babel';
// import { uglify } from 'rollup-plugin-uglify';
// import pkg from './package.json';

const plugins = [
  babel({
    exclude: ['node_modules/**'],
  }),
];

/*
const input = {
  index: 'src/index.js',
  functions: 'src/utils/functions.js',
  functions2D: 'src/2D/functions.js',
  Vector: 'src/Vector.js',
  Vector2: 'src/Vector2.js',
  Matrix: 'src/Matrix.js',
};
*/

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/bundle.cjs.js',
        format: 'cjs',
      },
      {
        file: 'dist/bundle.esm.js',
        format: 'esm',
      },
      {
        name: 'VidexLinearAlgebra',
        file: 'dist/bundle.umd.js',
        format: 'umd',
      },
    ],
    plugins,
  },
  /* {
    input: 'src/2D/index.js',
    output: [
      {
        file: 'dist/2D/bundle-2D.js',
        format: 'cjs',
      },
      {
        file: 'dist/2D/bundle-2D2.js',
        format: 'esm',
      },
    ],
    plugins,
  }, */
];

/*
export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'linearAlgebra',
      sourcemap: true,
      esModule: false,
    },
    plugins: [
      babel({
        exclude: ['node_modules/**'],
      }),
      uglify({
        mangle: false,
      }),
    ],
  },
  // CommonJS
  {
    input,
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      esModule: false,
    },
    plugins: [
      babel({
        exclude: ['node_modules/**'],
      }),
    ],
  },
  // ES module
  {
    input,
    output: {
      dir: 'dist/esm',
      format: 'esm',
    },
  },
];
*/
