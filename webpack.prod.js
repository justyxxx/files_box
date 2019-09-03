const merge = require('webpack-merge');
const dev = require('./webpack.config.js');
const webpack = require('webpack');

module.exports = merge(dev, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
            }
        })
    ]
});
