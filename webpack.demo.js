const { join, resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { smart } = require('webpack-merge')
const common = require('./webpack.config')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = smart(common, {
  mode: isDev ? 'development' : 'production',
  entry: resolve(__dirname, 'src/example/app.tsx'),
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, 'dist')
  },
  devtool: isDev ? 'source-map' : false,
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src/example/index.html')
    })
  ],
  devServer: {
    contentBase: join(__dirname, 'dist'),
    compress: true,
    port: 8888
  }
})
