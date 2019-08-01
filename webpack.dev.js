const merge = require('webpack-merge');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');

module.exports = merge(common(), {
    mode: 'development',

    output: {
        filename: '[name].js'
    },

    watch: true,
    stats: {
        // copied from `'minimal'`
        all: false,
        modules: true,
        maxModules: 15,
        errors: true,
        warnings: true,
        // our additional options
        moduleTrace: true,
        errorDetails: true
    },

    devtool: 'cheap-module-eval-source-map',

    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                'dist/**/*.js',
                'dist/**/*.css',
                'data/manifest.json'
            ]
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
});
