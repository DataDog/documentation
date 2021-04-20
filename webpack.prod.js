const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const common = require('./webpack.common.js');

const prodConfig = (env) => merge(common(env), {
	mode: 'production',

  output: {
      filename: ({ chunk: { name } }) => {
          return name === 'dd-browser-logs-rum' ? '[name].js' : '[name].[contenthash:5].js';
      }
  },

	optimization: {
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: true,
				sourceMap: true
			}),

			new MiniCssExtractPlugin({
				filename: '[name].[contenthash:5].css'
			}),

			new OptimizeCSSAssetsPlugin({}),
			new CleanWebpackPlugin({
				cleanOnceBeforeBuildPatterns: [
				  "public/**/*.js",
				  "public/**/*.css",
				  "data/manifest.json"
				]})
		]
	}
});

module.exports = prodConfig;
