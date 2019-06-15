const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const config = {
  mode: 'development',
  entry: path.join(__dirname, 'App.js'),
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules')
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [new webpack.NamedModulesPlugin()],
  devServer: {
    compress: false,
    host: '0.0.0.0',
    open: true,
    port: 9000,
    historyApiFallback: {
      index: path.join(__dirname, 'index.html'),
    },
  },
};

// [optional] yarn-workspaces if needed
const workpacesPath = path.resolve(__dirname, '../node_modules');
if (fs.existsSync(workpacesPath)) {
  config.resolve.modules.push(workpacesPath);
}

module.exports = config;
