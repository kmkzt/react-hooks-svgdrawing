const { BABEL_ENV, NODE_ENV } = process.env

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
    '@babel/preset-typescript'
  ]
}
