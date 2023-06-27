const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'index.html', to: 'build' }
      ]
    })
  ],
  mode: 'production', // или 'development' для режима разработки
  entry: './source/index.html', // входной файл вашего HTML
  output: {
    filename: 'index.html', // имя выходного файла HTML
    path: path.resolve(__dirname, 'build'), // путь к выходной директории
    clean: true, // очистка выходной директории перед каждой сборкой
  },
  module: {
    rules: [
      {
        test: /\.less$/, // загрузчик для файлов LESS
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpg|webp)$/, // загрузчик для изображений
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash][ext]', // путь и имя выходного файла изображения
        },
      },
      {
        test: /\.svg$/, // загрузчик для файлов SVG
        type: 'asset/inline',
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // минимизация CSS
      new TerserPlugin(), // минимизация JavaScript
      new HtmlWebpackPlugin({
        template: './source/index.html', // шаблон HTML-файла
        filename: 'index.html',
        minify: {
          collapseWhitespace: true, // сжатие HTML
        },
      }),
    ],
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'build'), // путь к содержимому dev-сервера
    },
    port: 8080, // порт dev-сервера
    open: true, // автоматическое открытие браузера при запуске dev-сервера
  },
};
