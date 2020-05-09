const { BABEL_ENV, NODE_ENV } = process.env

const modules = BABEL_ENV === 'cjs' || NODE_ENV === 'test' ? 'commonjs' : false
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: NODE_ENV === 'test' ? { node: 'current' } : undefined,
        loose: true,
        // TODO: Add ES Module
        // modules: BABEL_ENV === 'cjs' || NODE_ENV === 'test' ? 'commonjs' : false
        modules: 'commonjs'
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    ['babel-plugin-transform-react-remove-prop-types', { mode: 'unsafe-wrap' }],
    modules === 'commonjs' && 'add-module-exports'
  ].filter(Boolean)
}
