const path = require('path');
const root = process.cwd();
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(root, './src/index.ts'),
  mode: 'production',
  target: 'web',
  output: {
    path: path.join(root, 'dist'),
    filename: 'static/js/[name].bundle.[chunkhash].js',
    publicPath: '/'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true
      }),
    ]
  },
  module: {
    rules: [
      {
        test: /\.(svg|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: 'static/images/[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: 'static/fonts/[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '_[hash:base64]'
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: false,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      ie: '10'
                    }
                  }
                ],
                '@babel/preset-typescript',
              ],
              plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                ['@babel/plugin-transform-runtime'],
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.ENV': '"' + process.env.ENV + '"'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(root, './public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/styles.[contenthash].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({ configFile: path.resolve(root, './tsconfig.json') }),
    ],
    extensions: ['.ts', '.js']
  }
}
