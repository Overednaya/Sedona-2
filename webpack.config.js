const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './source/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash][ext]',
        },
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },

    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './source/index.html',
      filename: 'index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template: './source/form.html',
      filename: 'form.html',
      chunks: ['form'],
    }),
    new HtmlWebpackPlugin({
      template: './source/catalog.html',
      filename: 'catalog.html',
      chunks: ['catalog'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'source/img', to: 'img' },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'build'),
    },
    port: 8080,
    open: true,
  },
};
