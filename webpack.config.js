//const { resolve } = require('dns');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { type } = require('os');
const { resolve } = require('dns');

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 9000,
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        type: 'javascript/auto',
      }
    ]
  },
  experiments: {
    topLevelAwait: true
  },
  plugins: [new HtmlWebpackPlugin()]
};