'use strict';

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const helpers = require('./helpers');
const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        vendor: './src/vendor.ts',
        polyfills: './src/polyfills.ts',
        main: isDev ? './src/main.ts' : './src/main.aot.ts'
    },

    resolve: {
        extensions: ['.ts', '.js', '.scss']
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            // {
            //     test: /\.html/,
            //     type: 'asset/resource',
            //     generator: {
            //         filename: 'static/[hash][ext]'
            //     }
            // },
            {
                test: /\.(scss|sass)$/,
                use: [
                    { loader: 'style-loader', options: { sourceMap: isDev } },
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                    { loader: 'sass-loader', options: { sourceMap: isDev } }
                ],
                include: helpers.root('src', 'assets')
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    'to-string-loader',
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                    { loader: 'sass-loader', options: { sourceMap: isDev } }
                ],
                include: helpers.root('src', 'app')
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            }
        ]
    },

    plugins: [
        // new CleanWebpackPlugin(
        //     helpers.root('dist'), { root: helpers.root(), verbose: true }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ModuleFederationPlugin({

            // For hosts (please adjust)
            remotes: {
                 "gene_remote": "gene_remote@http://localhost:8081/remoteEntry.js",
            },

            shared: {
                "@angular/core": { singleton: true, strictVersion: true },
                "@angular/common": { singleton: true, strictVersion: true },
                "@angular/router": { singleton: true, strictVersion: true },

                // Uncomment for sharing lib of an Angular CLI or Nx workspace
              //  ...sharedMappings.getDescriptors()
            }

        }),
    ]
};