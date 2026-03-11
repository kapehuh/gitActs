//const { resolve } = require('dns');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { type } = require("os");
const { resolve } = require("dns");

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "docs"),
    clean: true, // Очищает папку dist перед каждой сборкой
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // обрабатываем .ts и .tsx
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
        type: "javascript/auto",
      },
    ],
  },
  experiments: {
    topLevelAwait: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: "Weather App",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
