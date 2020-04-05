const merge = require('webpack-merge')
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const cssnano = require('cssnano')
const AutoDllPlugin = require('autodll-webpack-plugin')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

const basic = require('./webpack.config')

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    inent: 'postcss',
    plugins: [autoprefixer]
  }
}

module.exports = merge(basic, {
  mode: 'production',
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            sideEffects: true,
            use: [MiniCssExtractPlugin.loader, 'css-loader', postCssLoader]
          },
          {
            test: /\.(scss|sass)$/,
            sideEffects: true,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              postCssLoader,
              'sass-loader'
            ]
          },
          {
            test: /\.less$/,
            sideEffects: true,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              postCssLoader,
              'less-loader'
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `static/css/[hash].css`,
      chunkFilename: 'static/css/chunk/[contenthash].chunk.css',
      ignoreOrder: false
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      }
    }),
    new AutoDllPlugin({
      inject: true,
      filename: '[hash].dll.js',
      debug: true,
      path: 'static/dll',
      plugins: [
        new webpack.optimize.MinChunkSizePlugin({
          minChunkSize: 512
        })
      ]
    })
  ],
  optimization: {
    splitChunks: {
      minSize: 30000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          parse: { ecma: 8 },
          compress: { ecma: 5 },
          output: { ecma: 5 }
        }
      })
    ]
  }
})
