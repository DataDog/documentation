const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

require('@babel/polyfill');

const commonConfig = env => {
    const plugins = [
        new webpack.ProvidePlugin({
            // fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new WebpackAssetsManifest({
            output: path.join(process.cwd(), 'data/manifest.json'),
            writeToDisk: true,
            sortManifest: true,
            publicPath: 'static/'
        })
        // new CopyPlugin([
        //     {
        //         from: 'images/',
        //         to: '../images/[path][name].[contenthash:5].[ext]'
        //     }
        // ]),

        // create manifest for images with hashes
        // new StatsWriterPlugin({
        //     fields  : ['assetsByChunkName', 'assets'],
        //     filename: '../../data/image_manifest.json',
        //     transform(stats) {
        //         console.log('stats: ', stats);
        //         const manifest = {};
        //         stats.assets
        //             .map(asset => asset.name)
        //             .sort()
        //             .forEach(file => {
        //                 manifest[file.replace(/\.[a-f0-9]{5}\./, '.')] = file;
        //                 // 5 is length of hash
        //             });
        //         return JSON.stringify(manifest, null, 2) + '\n';
        //     }
        // }),
        // manifest2
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
            'main-dd-css': './styles/style.scss'
        },
        output: {
            path: path.join(__dirname, 'public', 'static'),
            publicPath: 'static'
        },

        context: path.join(__dirname, 'src'),
        module: {
            rules: [
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
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'style-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                url: false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
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
