const webpack = require('@cypress/webpack-preprocessor');
const path = require('path');

module.exports = (on) => {
  const options = {
    webpackOptions: {
      resolve: {
        alias: {
          '@utils': path.resolve(__dirname, '../../utils/Helpers/pageObject/'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
        ],
      },
    },
  };

  on('file:preprocessor', webpack(options));
};