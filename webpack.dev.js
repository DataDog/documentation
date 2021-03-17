const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
                'public/**/*.js',
            ]
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
});
