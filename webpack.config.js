process.noDeprecation = true;
const webpack = require("webpack")
        ,path = require('path');

module.exports = {
  entry: __dirname + "/src/javascripts/app.js",
  output: {
    path: __dirname + '/dist/javascript',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:{
          presets: ['es2015']
        }
      }
    ]
  },
  node: {
    __dirname: true
  }
}