const { join, resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV !== 'production'

const eslintLoader = {
  loader: 'eslint-loader',
  options: {
    failOnWarning: false
  }
}

const exclude = /node_modules|lib/

module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'eval-source-map' : false,
  entry: resolve(__dirname, 'src/example/app.tsx'),
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude,
        use: [eslintLoader]
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          },
          eslintLoader
        ]
      },
      {
        test: /\.[jt]sx?$/,
        exclude,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript']
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]'
            }
          }
        ]
      },
      { test: /\.html$/, exclude, use: 'html-loader' }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
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
}
