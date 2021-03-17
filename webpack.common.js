const webpack = require('webpack');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

require('@babel/polyfill');

const commonConfig = env => {
    const plugins = [
        new webpack.ProvidePlugin({
            // fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.DefinePlugin({
            CI_COMMIT_SHORT_SHA: JSON.stringify(process.env.CI_COMMIT_SHORT_SHA || '')
        })
    ];

    // check if the analyze script was run and add BundleAnalyzer plugin if true
    if (env) {
        if (env.BUNDLE_ANALYZE === 'true') {
            plugins.push(new BundleAnalyzerPlugin());
        }
    }

    return {
        entry: {
            '@babel/polyfill': '@babel/polyfill',
            'main-dd-js': './scripts/main-dd-js.js',
            'lang-redirects': './scripts/lang-redirects.js',
            'region-redirects': './scripts/region-redirects.js',
            'api-redirect': './scripts/api-redirect.js',
            'dd-browser-logs-rum': './scripts/components/dd-browser-logs-rum.js'
        },
        output: {
            path: path.join(__dirname, 'public', 'static'),
            publicPath: 'static'
        },

        context: path.join(__dirname, 'src'),
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader',
                    options: {
                        // eslint options (if necessary)
                    }
                },
                {
                    test: /\.(ttf|eot|svg|gif|png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader?name=[path][name].[hash].[ext]'
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                },

                {
                    loader: 'babel-loader',
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true
                    }
                },
                {
                    test: require.resolve('jquery'),
                    use: [
                        {
                            loader: 'expose-loader',
                            options: 'jQuery'
                        },
                        {
                            loader: 'expose-loader',
                            options: '$'
                        }
                    ]
                }
            ]
        },

        plugins,

        optimization: {
            splitChunks: {
                minSize: 0,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all'
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                        test: module => module.type === 'javascript/auto'
                    }
                }
            }
        },
        resolve: {
            extensions: ['.json', '.js', '.jsx']
        }
    };
};

module.exports = commonConfig;
