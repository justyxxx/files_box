const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        app: ['@babel/polyfill', './src/index.js']
    },
    module: {
        rules: [
            {
                test: /\.css?$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                ]
            },
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: ['react-hot-loader/webpack'],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: require.resolve('babel-loader'),
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'prettier-loader',
                exclude: /node_modules/,
                options: require('./prettier.config')
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }]
            },
            {
                test: /\.(eot|svg|ttf|woff2?|otf)$/,
                use: 'file-loader'
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css'],
        alias: {
            '@components': path.resolve(__dirname, './src/components'),
            '@common': path.resolve(__dirname, './src/common'),
            '@configs': path.resolve(__dirname, './src/common/configs'),
            '@containers': path.resolve(__dirname,'./src/containers'),
            '@routes': path.resolve(__dirname, './src/routes'),
            '@styleguide': path.resolve(__dirname, './styleguide'),
            '@assets': path.resolve(__dirname, './src/assets')
        }
    },
    output: {
        path: path.resolve(__dirname, 'target'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new webpack.ProvidePlugin({
            R: 'ramda'
        }),
        new HtmlWebPackPlugin({
            filename: "index.html",
            template: "public/index.html"
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, './target'),
        port: 3131,
        historyApiFallback: true
    }
}
