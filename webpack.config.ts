const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  optimization: {
    minimize: false,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    library: 'google-material-charts',
    libraryTarget: 'umd',
    globalObject: 'this',
    // library: {
    //   name: 'google-material-charts',
    //   type: 'umd',
    //   export: 'default'
    // },
  },
};
