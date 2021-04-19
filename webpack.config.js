const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';
const BASEPATH = process.env.BASEPATH || '/';

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    // use babel for transpiling JavaScript files
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                    }
                ]
            },
            {
                test: /\.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { modules: true, sourceMap: true }
                    },
                    {
                        loader: "sass-loader",
                        options: {sourceMap: true}
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash].[ext]',
                    publicPath: BASEPATH + 'static/images',
                    outputPath: 'static/images',
                },
            },
            {
                test: /\.(ttf|eot|woff(2)?|otf)(\?[a-z0-9]+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[hash].[ext]',
                    publicPath: BASEPATH + 'static/fonts',
                    outputPath: 'static/fonts',
                },
            },
        ]
    },
    output: {
        filename: 'static/js/[name].[hash].js',
        path: path.join(__dirname, './dist'),
        publicPath: BASEPATH,
    },
    resolve: {
        // File extensions. Add others and needed (e.g. scss, json)
        extensions: ['.js', '.jsx'],
        modules: ['node_modules'],
        alias: {
            '@containers': path.join(__dirname, 'src', 'containers'),
            '@components': path.join(__dirname, 'src', 'components'),
            '@images': path.join(__dirname, 'src', 'assets/images'),
            '@styles': path.join(__dirname, 'src', 'styles'),
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./static/[name].[contenthash].css",
            chunkFilename: "[contenthash].css"
        }),
        new webpack.DefinePlugin({
            'env.BASEPATH': JSON.stringify(BASEPATH),
            'env.NODE_ENV': JSON.stringify(NODE_ENV),
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3010,
        historyApiFallback: true
    },
}