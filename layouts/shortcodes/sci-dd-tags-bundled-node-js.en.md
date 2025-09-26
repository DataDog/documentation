If your application is bundled in the Git repository, use a bundler plugin to inject Git metadata into the runtime bundle. Inject `DD_GIT_REPOSITORY_URL` and `DD_GIT_COMMIT_SHA` so dd-trace can report Git information.

###### Bundling with esbuild

Use the `dd-trace/esbuild` plugin to automatically inject `DD_GIT_REPOSITORY_URL` and `DD_GIT_COMMIT_SHA` in your runtime bundle. See the plugin [documentation](https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#bundling-with-esbuild).
Install `dd-trace` **v5.68.0 or later** for automatic Git tag injection.

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

###### Bundling with Rollup

Use [`rollup-plugin-inject-process-env`](https://www.npmjs.com/package/rollup-plugin-inject-process-env) to inject `DD_GIT_REPOSITORY_URL` and `DD_GIT_COMMIT_SHA`. Run the bundle step inside a Git working tree so the script can read `.git` information. Implement `getGitInfo()` to read these values (for example, by running `git` commands or parsing files under `.git/`).

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

###### Bundling with webpack

Use the [BannerPlugin](https://webpack.js.org/plugins/banner-plugin/) to set `DD_GIT_REPOSITORY_URL` and `DD_GIT_COMMIT_SHA` at the top of the bundle. Run the bundle step inside a Git working tree. Implement `getGitInfo()` to read these values (for example, by running `git` commands or parsing files under `.git/`).

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
+				 `process.env.DD_GIT_COMMIT_SHA=${JSON.stringify(DD_GIT_COMMIT_SHA)};`,
+		}),
	]
};

```
