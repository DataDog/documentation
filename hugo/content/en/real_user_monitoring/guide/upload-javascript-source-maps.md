---
title: Upload JavaScript Source Maps
description: "Upload JavaScript source maps to enhance error tracking with readable stack traces and better debugging for minified code."
further_reading:
- link: '/real_user_monitoring/error_tracking'
  tag: 'Documentation'
  text: 'Get started with Error Tracking'
- link: '/real_user_monitoring/error_tracking/explorer'
  tag: 'Documentation'
  text: 'Visualize your Error Tracking data in the Explorer'
- link: "https://learn.datadoghq.com/courses/tracking-errors-rum-javascript"
  tag: "Learning Center"
  text: "Tracking errors with RUM for JavaScript Web Applications"
- link: "https://www.datadoghq.com/blog/a-practical-guide-to-react-error-monitoring/"
  tag: "Blog"
  text: "A practical guide to React error monitoring"
- link: 'https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/sourcemaps'
  tag: 'Source Code'
  text: 'Sourcemaps command reference'

---

## Overview

If your front-end JavaScript source code is minified, upload your source maps to Datadog to de-obfuscate your different stack traces. For any given error, you can access the file path, line number, and code snippet for each frame of the related stack trace. Datadog can also link stack frames to your source code in your repository.

<div class="alert alert-info"><ul><li>Only errors collected by <a href="/error_tracking/">Error Tracking</a>, <a href="/real_user_monitoring/">Real User Monitoring (RUM)</a>, and logs from <a href="/logs/log_collection/javascript/">Browser Logs Collection</a> can be unminified.</li><li>To automate source map uploads as part of your build process, see <a href="/real_user_monitoring/setup/additional_plugins/#source-maps">Additional Plugins: Source Maps</a>.</li></ul></div>

## Instrument your code

Configure your JavaScript bundler such that when minifying your source code, it generates source maps that directly include the related source code in the `sourcesContent` attribute.

<div class="alert alert-danger">
Ensure that the size of each source map augmented with the size of the related minified file does not exceed the limit of <b>500 MB</b>.
</div>

See the following configurations for popular JavaScript bundlers.

{{< tabs >}}
{{% tab "Webpack" %}}

You can generate source maps by using the built-in webpack plugin named [SourceMapDevToolPlugin][1].

See the example configuration in your `webpack.config.js` file:

```javascript
// ...
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      noSources: false,
      filename: '[file].map'
    }),
    // ...
  ],
  optimization: {
    minimize: true,
    // ...
  },
  // ...
};
```

**Note**: If you are using TypeScript, set `compilerOptions.sourceMap` to `true` in your `tsconfig.json` file.

[1]: https://webpack.js.org/plugins/source-map-dev-tool-plugin/
{{% /tab %}}
{{% tab "Vite" %}}

You can generate source maps by configuring the `build.sourcemap` option in your `vite.config.js` file.

See the example configuration:

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    sourcemap: true, // generates .js.map files
    minify: 'terser', // or 'esbuild'
  }
})
```

**Note**: If you are using TypeScript, set `compilerOptions.sourceMap` to `true` in your `tsconfig.json` file.

{{% /tab %}}
{{% tab "esbuild" %}}

You can generate source maps by setting the [`sourcemap`][1] option to `true` in your esbuild configuration. Set `sourcesContent` to `true` so that source maps include the related source code.

See the example configuration:

```javascript
// esbuild.config.js
require('esbuild').build({
  entryPoints: ['src/index.js'],
  bundle: true,
  minify: true,
  sourcemap: true, // generates .js.map files
  sourcesContent: true,
  outdir: 'dist',
});
```

**Note**: If you are using TypeScript, set `compilerOptions.sourceMap` to `true` in your `tsconfig.json` file.

[1]: https://esbuild.github.io/api/#sourcemap
{{% /tab %}}
{{% tab "Rollup" %}}

You can generate source maps by setting the [`output.sourcemap`][1] option to `true` in your `rollup.config.js` file.

See the example configuration:

```javascript
// rollup.config.js
export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true, // generates .js.map files
    sourcemapExcludeSources: false,
  },
};
```

**Note**: If you are using TypeScript, set `compilerOptions.sourceMap` to `true` in your `tsconfig.json` file.

[1]: https://rollupjs.org/configuration-options/#output-sourcemap
{{% /tab %}}
{{% tab "Rspack" %}}

You can generate source maps by setting the [`devtool`][1] option to `source-map` in your `rspack.config.js` file.

See the example configuration:

```javascript
// rspack.config.js
module.exports = {
  mode: 'production',
  devtool: 'source-map', // generates .js.map files
  optimization: {
    minimize: true,
  },
};
```

**Note**: If you are using TypeScript, set `compilerOptions.sourceMap` to `true` in your `tsconfig.json` file.

[1]: https://rspack.rs/config/devtool
{{% /tab %}}
{{% tab "Parcel" %}}

Parcel generates source maps by default when you run the build command: `parcel build <entry file>`.

{{% /tab %}}
{{< /tabs >}}

After building your application, bundlers generate a directory (typically named `dist`) with minified JavaScript files co-located with their corresponding source maps.

See the following example:

```bash
./dist
    javascript.364758.min.js
    javascript.364758.js.map
    ./subdirectory
        javascript.464388.min.js
        javascript.464388.js.map
```

<div class="alert alert-danger">
If the sum of the file size for <code>javascript.364758.min.js</code> and <code>javascript.364758.js.map</code> exceeds the <b>500 MB</b> limit, reduce it by configuring your bundler to split the source code into multiple smaller chunks. For more information, see <a href="https://webpack.js.org/guides/code-splitting/">Code Splitting with WebpackJS</a>.
</div>

## Upload your source maps

To upload your source maps, choose one of the following matching methods: Debug ID (recommended) or service and version. Debug IDs enable source map resolution across micro frontends.

### Debug ID (recommended)

Debug IDs associate a JavaScript bundle with its source map without relying on the bundle URL, service, or release version.

Inject debug IDs and upload source maps with a Datadog build plugin during your build, or with the `datadog-ci` CLI after your build. With a build plugin, you do not need to install or run `datadog-ci` separately. Choose one of the following methods:

{{< tabs >}}
{{% tab "Webpack" %}}

Requires [Datadog Build Plugins version 3.3.0](https://github.com/DataDog/build-plugins/releases/tag/v3.3.0) or later.

```javascript
// webpack.config.js
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com',
      },
      sourcemaps: {
        debugId: true,
        upload: true,
      },
    }),
  ],
};
```

{{% /tab %}}
{{% tab "Vite" %}}

Requires [Datadog Build Plugins version 3.3.0](https://github.com/DataDog/build-plugins/releases/tag/v3.3.0) or later.

```javascript
// vite.config.js
import { datadogVitePlugin } from '@datadog/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    datadogVitePlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com',
      },
      sourcemaps: {
        debugId: true,
        upload: true,
      },
    }),
  ],
});
```

{{% /tab %}}
{{% tab "esbuild" %}}

Requires [Datadog Build Plugins version 3.3.0](https://github.com/DataDog/build-plugins/releases/tag/v3.3.0) or later.

```javascript
// esbuild.config.js
const { datadogEsbuildPlugin } = require('@datadog/esbuild-plugin');

require('esbuild').build({
  plugins: [
    datadogEsbuildPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com',
      },
      sourcemaps: {
        debugId: true,
        upload: true,
      },
    }),
  ],
});
```

{{% /tab %}}
{{% tab "Rollup" %}}

Requires [Datadog Build Plugins version 3.3.0](https://github.com/DataDog/build-plugins/releases/tag/v3.3.0) or later.

```javascript
// rollup.config.js
import { datadogRollupPlugin } from '@datadog/rollup-plugin';

export default {
  plugins: [
    datadogRollupPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com',
      },
      sourcemaps: {
        debugId: true,
        upload: true,
      },
    }),
  ],
};
```

{{% /tab %}}
{{% tab "Rspack" %}}

Requires [Datadog Build Plugins version 3.3.0](https://github.com/DataDog/build-plugins/releases/tag/v3.3.0) or later.

```javascript
// rspack.config.js
const { datadogRspackPlugin } = require('@datadog/rspack-plugin');

module.exports = {
  plugins: [
    datadogRspackPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com',
      },
      sourcemaps: {
        debugId: true,
        upload: true,
      },
    }),
  ],
};
```

{{% /tab %}}
{{% tab "Datadog CLI" %}}

Use the `datadog-ci` CLI if your bundler is not supported by the Datadog build plugins, or if you inject debug IDs outside of your build. This requires [`@datadog/datadog-ci` version 5.24.0][1] or later.

1. Add `@datadog/datadog-ci` to your `package.json` file (make sure you're using the latest version).
2. [Create a dedicated Datadog API key][2] and export it as an environment variable named `DD_API_KEY`.
3. For sites other than US1, configure the CLI by exporting `DD_SITE` with your [Datadog site][3].
4. Inject debug IDs after the build:

   ```bash
   datadog-ci sourcemaps inject /path/to/dist
   ```

5. Upload the source maps and corresponding JavaScript bundles:

   ```bash
   datadog-ci sourcemaps upload /path/to/dist --debug-id
   ```

Do not pass `--service`, `--release-version`, or `--minified-path-prefix` with `--debug-id`.

The `inject` command modifies JavaScript bundles and source maps in place. Run it after the build and before generating byte-dependent artifacts such as SRI hashes, compressed assets, signatures, or checksum manifests. Deploy the same modified artifacts that you upload.

[1]: https://github.com/DataDog/datadog-ci/releases/tag/v5.24.0
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /getting_started/site/
{{% /tab %}}
{{< /tabs >}}

Each source map is uploaded with the debug ID injected into its corresponding JavaScript bundle. For the full list of build plugin options, see [Build Plugins: Source Maps][8].

### Service and version

To upload source maps using a service and version, add an extra step to your CI pipeline that runs the `datadog-ci sourcemaps upload` command. It scans the `dist` directory and subdirectories to automatically upload source maps with the relevant minified files.

{{< site-region region="us" >}}
1. Add `@datadog/datadog-ci` to your `package.json` file (make sure you're using the latest version).
2. [Create a dedicated Datadog API key][6] and export it as an environment variable named `DD_API_KEY`.
3. Run the following command once per service in your application:

   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service my-service \
     --release-version v35.2395005 \
     --minified-path-prefix https://hostname.com/static/js
   ```

{{< /site-region >}}

{{< site-region region="eu,us3,us5,gov,gov2,ap1,ap2,uk1" >}}
1. Add `@datadog/datadog-ci` to your `package.json` file (make sure you're using the latest version).
2. [Create a dedicated Datadog API key][6] and export it as an environment variable named `DD_API_KEY`.
3. Configure the CLI to upload files to the {{<region-param key="dd_site_name">}} site by exporting two environment variables: `export DATADOG_SITE=`{{<region-param key="dd_site" code="true">}} and `export DATADOG_API_HOST=api.`{{<region-param key="dd_site" code="true">}}.
4. Run the following command once per service in your application:

   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service my-service \
     --release-version v35.2395005 \
     --minified-path-prefix https://hostname.com/static/js
   ```

{{< /site-region >}}

To minimize overhead on your CI's performance, the CLI is optimized to upload as many source maps as you need in a short amount of time (typically a few seconds).

**Note**: Re-uploading a source map does not override the existing one if the version has not changed.

The `--service` and `--release-version` parameters must match the `service` and `version` tags on your Error Tracking events, RUM events, and browser logs. For more information on how to setup these tags, see the [Browser SDK initialization documentation][9] or [Browser Logs Collection documentation][10].

<div class="alert alert-info">If you have defined multiple services in your application, run the CI command as many times as there are services, even if you have one set of sourcemaps for the entire application.</div>

By running the command against the example `dist` directory, Datadog expects your server or CDN to deliver the JavaScript files at `https://hostname.com/static/js/javascript.364758.min.js` and `https://hostname.com/static/js/subdirectory/javascript.464388.min.js`.

Only source maps with the `.js.map` extension work to correctly unminify stack traces. Source maps with other extensions such as `.mjs.map` are accepted but do not unminify stack traces.

<div class="alert alert-info">If you are serving the same JavaScript source files from different subdomains, upload the related source map once and make it work for multiple subdomains by using the absolute prefix path instead of the full URL. For example, specify <code>/static/js</code> instead of <code>https://hostname.com/static/js</code>.</div>

### Verify uploaded source maps

Regardless of the matching method, see all uploaded symbols and manage your source maps on the [{{< ui >}}Explore RUM Debug Symbols{{< /ui >}}][5] page.

### Link stack frames to your source code

If you run `datadog-ci sourcemaps upload` within a Git working directory, Datadog collects repository metadata. The `datadog-ci` command collects the repository URL, the current commit hash, and the list of file paths in the repository that relate to your source maps. For more details about Git metadata collection, refer to the [datadog-ci documentation][4].

Datadog displays links to your source code on unminified stack frames.

## Troubleshooting debug ID uploads

### Inspect local source maps

To find the local source map for a specific debug ID, run:

```bash
datadog-ci sourcemaps find /path/to/dist --debug-id 12345678-1234-1234-1234-123456789abc
```

To find source maps that do not contain a debug ID, run:

```bash
datadog-ci sourcemaps find /path/to/dist --missing-debug-id
```

The `find` command only inspects local `*.js.map` files. It does not confirm whether Datadog received an artifact.

## Troubleshoot errors with ease

Without access to the file path and the line number, a minified stack trace is not helpful in troubleshooting your code base. Also, the code snippet is minified (which means there is one long line of transformed code), making the troubleshooting process more difficult.

The following example displays a minified stack trace:

{{< img src="real_user_monitoring/error_tracking/minified_stacktrace.png" alt="Error Tracking Minified Stack Trace" >}}

On the other hand, an unminified stack trace provides you with all the context you need for quick, seamless troubleshooting. For stack frames that relate to your source code, Datadog also generates a direct link to your repository:

{{< img src="real_user_monitoring/error_tracking/unminified_stacktrace.png" alt="Error Tracking Unminified Stack Trace" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/sourcemaps
[4]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/sourcemaps#link-errors-with-your-source-code
[5]: https://app.datadoghq.com/source-code/setup/rum
[6]: https://app.datadoghq.com/organization-settings/api-keys
[8]: /real_user_monitoring/setup/additional_plugins/#source-maps
[9]: /real_user_monitoring/application_monitoring/browser/setup/#initialization-parameters
[10]: /logs/log_collection/javascript/#initialization-parameters
