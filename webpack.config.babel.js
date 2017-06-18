/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 5/22/17.
 */

import { resolve } from 'path';
import webpack from 'webpack';

export default {
    context: resolve(__dirname, 'src'),

    entry: [
        // Entry point of the application.
        './index.js'
    ],

    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'public/js')
    },

    devtool: 'inline-source-map',

    devServer: {
        hot: true,
        contentBase: resolve(__dirname, 'public/'),
        historyApiFallback: true
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.svg$/,
                use: ['url-loader?mimetype=image/svg+xml']
            },
            {
                test: /\.woff$/,
                use: ['url-loader?mimetype=application/font-woff']
            },
            {
                test: /\.woff2$/,
                use: ['url-loader?mimetype=application/font-woff2']
            },
            {
                test: /\.[ot]tf$/,
                use: ['url-loader?mimetype=application/octet-stream']
            },
            {
                test: /\.eot$/,
                use: ['url-loader?mimetype=application/vnd.ms-fontobject']
            },
            {
                test: /\.png$/,
                use: ['url-loader?mimetype=image/png']
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
           $: 'jquery',
           jQuery: 'jquery'
        }),
        new webpack.EnvironmentPlugin({ NODE_ENV: 'development' })
    ]
};
