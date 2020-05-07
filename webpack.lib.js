const { resolve } = require('path')
const { smart } = require('webpack-merge')
const common = require('./webpack.config')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = smart(common, {
  mode: isDev ? 'development' : 'production',
  entry: resolve(__dirname, 'src/index.ts'),
  output: {
    filename: 'index.min.js',
    path: resolve('lib'),
    library: 'react-hooks-svgdrawing',
    libraryTarget: 'umd'
  },
  devtool: isDev ? 'eval-source-map' : false,
  externals: {
    react: 'react'
  },
  plugins: [],
  optimization: {
    minimize: true
  }
})
