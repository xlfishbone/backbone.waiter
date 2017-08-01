const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrors = require('friendly-errors-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');


module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './main.js',
  },
  output: {
    path: path.resolve(__dirname, './_dist'),
    filename: 'backbone.waiter.js',
    //publicPath: '/assets',
    library: 'Waiter',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    "jquery": "$"
    // "lodash": "_"
  },
  devServer: {
    contentBase: path.resolve(__dirname, './test/live/index.html'),
  },
  module: {
    rules: [{
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: [
          path.join(__dirname, './src'),
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, './src'),
        ],
        options: {
          plugins: [
            "lodash"
          ]
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, './test/live/index.html'),
      template: path.resolve(__dirname, './test/live/index.html'),
      inject: false,
    }),
    new FriendlyErrors(),
    new LodashModuleReplacementPlugin(),
  ]
  // devtool: '#eval-source-map',
};
