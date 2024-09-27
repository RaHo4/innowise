const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')
const isDev = false

module.exports = {
  mode: 'development',
  entry: { path: path.resolve(__dirname, 'src', 'index.js') },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'main.[contenthash].js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html' }),
    isDev && new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/main.[contenthash:8].css',
      chunkFilename: 'css/main.[contenthash:8].css',
    }),
    new Dotenv(),
  ].filter(Boolean),
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              modules: false,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js'],
  },
  //   devtool: isDev && "inline-source-map",
  devServer: {
    static: path.resolve(__dirname, 'build'),
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
}
