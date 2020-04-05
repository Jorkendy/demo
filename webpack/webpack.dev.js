const merge = require("webpack-merge");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const basic = require("./webpack.config");
const postCssLoader = {
  loader: "postcss-loader",
  options: {
    inent: "postcss",
    plugins: [autoprefixer],
  },
};

module.exports = merge(basic, {
  mode: "development",
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            sideEffects: true,
            use: ["style-loader", "css-loader", postCssLoader],
          },
          {
            test: /\.(scss|sass)$/,
            sideEffects: true,
            use: ["style-loader", "css-loader", postCssLoader, "sass-loader"],
          },
          {
            test: /\.less$/,
            sideEffects: true,
            use: ["style-loader", "css-loader", postCssLoader, "less-loader"],
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin(),
  ],
  devtool: "cheap-module-eval-source-map",
  optimization: {
    splitChunks: {
      minSize: 10000,
      maxAsyncRequests: Infinity,
      maxInitialRequests: Infinity,
    },
  },
});
