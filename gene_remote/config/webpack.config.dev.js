'use strict';

const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.config.common');
const helpers = require('./helpers');

module.exports = merge(commonConfig, {
    mode: 'development',
    devServer: {
        port: 8081,
        publicPath: '/',
        historyApiFallback: true,
        stats: 'minimal'
    },
    devtool: 'source-map',

    output: {
        path: helpers.root('dist'),
        // For Module Federation, it's best to skip the public path or to set it to an absolute path
        // All your paths are prefixed with it.
        // If we used / all the paths of the remote bundles are prefixed with it leading to
        // /myBundle.js. If the shell located at localhost:8080 loads such a bundle it expects
        // it at localhost:8080/myBundle.js while it's at localhost:808*1*/myBundle.js.
        // If you skip it, module federation prefixes it with the location the remoteEntry
        // came from leading to localhost:808*1*/myBundle.js in our case.
        // publicPath: '/',
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