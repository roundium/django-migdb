var path = require("path");
var webpack = require("webpack");
var BundleTracker = require("webpack-bundle-tracker");

module.exports = {
  context: __dirname,

  entry: "./frontend/index",

  output: {
    path: path.resolve(__dirname, "migdb/static/migdb/js/"),
    filename: "[name].js",
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },

  watch: true,
  devServer: {
    inline: true,
    contentBase: path.join(__dirname, './frontend'),
    port: 9000
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, "/node_modules"),
          path.resolve(__dirname, "/migdb"),
        ],
        include:[
          path.resolve(__dirname, 'frontend/'),
        ],
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
