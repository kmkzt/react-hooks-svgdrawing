const { join, resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  mode: 'development',
  entry: resolve(__dirname, 'src/example/index.tsx'),
  output: {
    filename: '[name].bundle.js',
    path: resolve('docs')
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('template.html')
    })
  ],
  devServer: {
    contentBase: join(__dirname, 'docs'),
    compress: true,
    port: 8888
  }
}

module.exports = config
