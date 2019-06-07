const path = require('path');
const webpack = require('webpack');

// const useWasmPath = path.join(__dirname, '../use-wasm');

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
      // useWasmPath,
      path.resolve(__dirname, 'node_modules'),
      // yarn-workspaces
      path.resolve(__dirname, '../node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        // include: [useWasmPath],
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

module.exports = config;
