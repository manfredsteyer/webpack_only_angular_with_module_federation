'use strict';

const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.config.common');
const helpers = require('./helpers');

module.exports = merge(commonConfig, {
    mode: 'development',
    devServer: {
        port: 8080,
        publicPath: '/',
        historyApiFallback: true,
        stats: 'minimal',
        hot:true
    },
    devtool: 'source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },

    optimization: {
        emitOnErrors: true
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: helpers.root('tsconfig.json')
                        }
                    },
                    'angular2-template-loader',
                    'angular-router-loader'
                ],
                exclude: [/node_modules/]
            }
        ]
    }
});