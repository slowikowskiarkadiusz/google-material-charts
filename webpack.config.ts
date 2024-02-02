const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './index.ts', // Entry point of your application
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        filename: 'bundle.js', // Name of the output bundle
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader', // Example: using Babel for JavaScript
            }, {
                test: /\.scss$/,
                use: [
                    'style-loader', // Creates `style` nodes from JS strings
                    'css-loader',   // Translates CSS into CommonJS
                    'sass-loader'   // Compiles Sass to CSS
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // The path to your HTML template file
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), // Serve files from the 'dist' directory
        },
        port: 8080, // Specify the port for the development server
        hot: true,
        open: false
    }
};
