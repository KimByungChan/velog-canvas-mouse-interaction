const path = require('path');
const root = process.cwd();
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(root, './src/index.ts'),
  mode: 'development',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(svg|png|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:5]'
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.ts?$/,
        exclude: [/node_modules|bower_components/],
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
      inject: true,
      template: path.resolve(root, './public/index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({ configFile: path.resolve(root, './tsconfig.json') }),
    ],
    extensions: ['.ts', '.js']
  },
  devServer: {
    contentBase: path.join(root, './public'),
    historyApiFallback: true,
    hot: true,
  },
}
