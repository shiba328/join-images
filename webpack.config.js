const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.ts',
  resolve: {
    alias: {
      '@': path.join(__dirname, '/src'),
      'assets': path.resolve(__dirname, 'src/assets')
    },
    extensions: ['.ts', '.js'] //拡張子がtsだったらTypescirptでコンパイルする
  },
  plugins: [
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'src/assets/public/'),
        to: path.resolve(__dirname, 'dist/images')
      }
    ]),
    new HtmlWebPackPlugin({
      template: `./src/index.pug`,
      filename: `index.html`,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      // pre
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        loader: 'eslint-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      //js
      {
        test: /.(js|jsx)$/,
        include: [],
        loader: 'babel-loader'
      },
      // html
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      // pug
      {
        test: /\.pug$/,
        use: [
          'pug-loader'
        ]
      },
      // css
      {
        test: /.css$/,
        use: [
          // {
          // 	loader: MiniCssExtractPlugin.loader
          // },
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  require('postcss-import')({
                    plugins: [
                      require('stylelint')
                    ]
                  }),
                  require('precss'),
                  require('autoprefixer'),
                  require('postcss-nested'),
                  require('postcss-custom-media')
                ];
              }
            }
          }
        ]
      },
      // img
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  }
};
