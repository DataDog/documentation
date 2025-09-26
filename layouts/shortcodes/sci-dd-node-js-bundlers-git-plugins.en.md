If your application is bundled in your Git repository you can leverage plugins to inject Git tags in the bundled file that is executed in your runtime environment.

### Bundling with esbuild

If you bundle your application using esbuild, you can leverage the `dd-trace/esbuild` plugin that will automatically inject `DD_GIT_REPOSITORY_URL` and `DD_GIT_COMMIT_SHA` to your process environment variables. See the plugin [documentation](https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#bundling-with-esbuild).

For automatic Git tags injection, make sure you have `dd-trace@v5.68+` installed.

```diff
const esbuild = require('esbuild');
+ const ddPlugin = require('dd-trace/esbuild');

esbuild.build({
  entryPoints: ['index.js'],
  bundle: true,
  platform: 'node',
  target: ['node20'],
  format: 'cjs',
  outfile: 'dist/bundle.js',
  packages: 'external',
  external: ['dd-trace', 'express']
+  plugins: [ddPlugin],
}).catch((e) => {
  console.error(e);
  process.exit(1);
});

```

### Bundling with Rollup

If you bundle your application using Rollup, you can leverage the [rollup-plugin-inject-process-env](https://www.npmjs.com/package/rollup-plugin-inject-process-env) to inject `DD_GIT_REPOSITORY_URL` and `DD_GIT_COMMIT_SHA` to your process environment variables.

See the required code changes below. The `getGitInfo()` function should retrieve Git information at bundle time either by executing Git commands or by parsing the relevant information from the ./git files.

```diff
+ const injectProcessEnv = require('rollup-plugin-inject-process-env');

+ const { DD_GIT_REPOSITORY_URL, DD_GIT_COMMIT_SHA } = getGitInfo();

module.exports = {
  input: 'index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  external: [
    'express',
    'dd-trace'
  ],
  plugins: [
    nodeResolve(),
    commonjs()
+    injectProcessEnv({
+       DD_GIT_REPOSITORY_URL,
+       DD_GIT_COMMIT_SHA
+    })
  ]
};

```

### Bundling with webpack


If you bundle your application using webpack, you can leverage the [BannerPlugin](https://webpack.js.org/plugins/banner-plugin/) to inject `DD_GIT_REPOSITORY_URL` and `DD_GIT_COMMIT_SHA` to your process environment variables.

See the required code changes below. The `getGitInfo()` function should retrieve Git information at bundle time either by executing Git commands or by parsing the relevant information from the ./git files.

```diff
+ const webpack = require('webpack');

+ const { DD_GIT_REPOSITORY_URL, DD_GIT_COMMIT_SHA } = getGitInfo();

module.exports = {
	target: 'node',
	entry: './index.js',
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		libraryTarget: 'commonjs2'
	},
	externals: [
		'express',
		'dd-trace'
	],
	plugins: [
+		new webpack.BannerPlugin({
+			raw: true,
+			entryOnly: true,
+			banner:
+        `process.env.DD_GIT_REPOSITORY_URL=${JSON.stringify(DD_GIT_REPOSITORY_URL)};` +
+				`process.env.DD_GIT_COMMIT_SHA=${JSON.stringify(DD_GIT_COMMIT_SHA)};`,
+		}),
	]
};

```
