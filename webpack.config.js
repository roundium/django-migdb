var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  context: __dirname,

  entry: './migdb/static/migdb/react/index',

  output: {
      path: path.resolve('./migdb/static/migdb/js/'),
      filename: "[name].js",
  },

  // plugins: [
  //   new BundleTracker({filename: './migdb/webpack-stats.json'}),
  // ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }

};