const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  target: 'node17',
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'all',
          name: 'vendor',
          enforce: true
        },
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new Dotenv()
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({})
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
  },
};
