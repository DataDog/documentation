const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const {
    isString
} = require('lodash');
const config = require('./config-corp');
require("@babel/polyfill");



const {
    getEntry,
    getAllEntryNames
} = require('./src/build/entries.js');

function getConfig() {
    console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'production') {
        return config['production'];
    } else if (process.env.NODE_ENV === 'preview') {
        return config['preview'];
    } else {
        return config['local'];
    }
}

const entries = getAllEntryNames();
const entryNames = isString(entries) ? entries.split(',') : entries;

const commonConfig = (env) => {

    const plugins = [
        new WebpackAssetsManifest({
            output: path.join(process.cwd(), 'data/manifest.json'),
            writeToDisk: true,
            sortManifest: true,
            publicPath: 'static/'
        }),
        new webpack.ProvidePlugin({
            // fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
            $: 'jquery',
            jQuery: 'jquery'
        })
    ];

    // check if the analyze script was run and add BundleAnalyzer plugin if true
    if (env) {
        if (env.BUNDLE_ANALYZE === 'true') {
            plugins.push(new BundleAnalyzerPlugin());
        }
    }

    return {
        entry: entryNames.reduce((definition, name) => {
            const entry = getEntry(name);
            return Object.assign({
                [entry.name]: entry.path
            }, definition);
        }, {}),
        output: {
            path: path.join(__dirname, 'dist', 'static'),
            publicPath: 'static'
        },

        context: path.join(__dirname, 'src'),
        module: {
            rules: [{
                test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?name=/[hash].[ext]'
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
                    use: [{
                        loader: 'expose-loader',
                        options: 'jQuery'
                    },
                        {
                            loader: 'expose-loader',
                            options: '$'
                        }
                    ]
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: MiniCssExtractPlugin.loader
                    }, {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            url: false
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
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
        },
        externals: [/^vendor\/.+\.js$/,
            {
                'Config': JSON.stringify(getConfig())
            }
        ]

    };
};

module.exports = commonConfig;
