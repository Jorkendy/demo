const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Webpackbar = require('webpackbar')

module.exports = {
  resolve: {
    modules: [
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../node_modules')
    ],
    extensions: ['.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  cache: true,
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(process.cwd(), 'src/index.js')
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                'react-hot-loader/babel',
                [
                  'import',
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: 'css'
                  },
                  'antd'
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 512 }),
    new Webpackbar(),
    new webpack.IgnorePlugin(/^\.\/local$/, /moment$/),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/public/index.html'),
      inject: true
    })
  ],
  optimization: {
    usedExports: true,
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  performance: {
    hints: false
  }
}
