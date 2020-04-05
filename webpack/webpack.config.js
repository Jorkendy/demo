const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpackbar = require("webpackbar");


module.exports = {
  mode: "development",
  cache: true,
  entry: [
    "webpack-hot-middleware/client?reload=true",
    path.join(process.cwd(), "src/index.js"),
  ],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 512 }),
    new webpackbar(),
    new webpack.IgnorePlugin(/^\.\/local$/, /moment$/),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src/public/index.html"),
      inject: true,
    })
  ],
  optimization: {
    usedExports: true,
    moduleIds: "hashed",
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  performance: {
    hints: false,
  },
};
