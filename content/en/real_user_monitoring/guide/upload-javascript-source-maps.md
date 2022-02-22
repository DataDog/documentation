---
title: Upload Javascript source maps
kind: guide
further_reading:
- link: '/real_user_monitoring/error_tracking'
  tag: 'Documentation'
  text: 'Get started with Error Tracking'
- link: '/real_user_monitoring/error_tracking/explorer'
  tag: 'Documentation'
  text: 'Visualize your Error Tracking data in the Explorer'
---

## Overview

If your front-end Javascript source code is minified, upload your source maps to Datadog to de-obfuscate your different stack traces. For any given error, you can access the file path, line number, and code snippet for each frame of the related stack trace. Datadog can also link stack frames to your source code in your repository.

<div class="alert alert-info">Only errors collected by <a href="/real_user_monitoring/">Real User Monitoring (RUM)</a> can be unminified.</div>

## Instrument your code

Configure your Javascript bundler such that when minifying your source code, it generates source maps that directly include the related source code in the `sourcesContent` attribute. Also, ensure that the size of each source map augmented with the size of the related minified file does not exceed the limit of **50MB**.

See the following configurations for popular Javascript bundlers.

{{< tabs >}}
{{% tab "WebpackJS" %}}

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
{{% tab "ParcelJS" %}}

Parcel generates source maps by default when you run the build command: `parcel build <entry file>`.

{{% /tab %}}
{{< /tabs >}}

After building your application, bundlers generate a directory (typically named `dist`) with minified Javascript files co-located with their corresponding source maps.

See the following example:

```bash
./dist
    javascript.364758.min.js
    javascript.364758.js.map
    ./subdirectory
        javascript.464388.min.js
        javascript.464388.js.map
```

<div class="alert alert-warning">If the sum of the file size for <code>javascript.364758.min.js</code> and <code>javascript.364758.js.map</code> exceeds the <b>the 50MB</b> limit, reduce it by configuring your bundler to split the source code into multiple smaller chunks. For more information, see <a href="https://webpack.js.org/guides/code-splitting/">Code Splitting with WebpackJS</a>).</div>

## Upload your source maps

The best way to upload source maps is to add an extra step in your CI pipeline and run the dedicated command from the [Datadog CLI][1]. It scans the `dist` directory and subdirectories to automatically upload source maps with relevant minified files.

{{< tabs >}}
{{% tab "US" %}}

1. Add `@datadog/datadog-ci` to your `package.json` file (make sure you're using the latest version).
2. [Create a dedicated Datadog API key][1] and export it as an environment variable named `DATADOG_API_KEY`.
3. Run the following command:
   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service=my-service \
     --release-version=v35.2395005 \
     --minified-path-prefix=https://hostname.com/static/js
   ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "EU" %}}

1. Add `@datadog/datadog-ci` to your `package.json` file (make sure you're using the latest version).
2. [Create a dedicated Datadog API key][1] and export it as an environment variable named `DATADOG_API_KEY`.
3. Configure the CLI to upload files to the EU region by exporting two environment variables: `export DATADOG_SITE="datadoghq.eu"` and `export DATADOG_API_HOST="api.datadoghq.eu"`.
4. Run the following command:
   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service=my-service \
     --release-version=v35.2395005 \
     --minified-path-prefix=https://hostname.com/static/js
   ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

To minimize overhead on your CI's performance, the CLI is optimized to upload as many source maps as you need in a short amount of time (typically a few seconds).

The `--service` and `--release-version` parameters must match the `service` and `version` tags on your RUM events. For more information on how to setup these tags, refer to the [Browser SDK initialization documentation][2]. The sourcemaps that have been uploaded will then be used to de-obfuscate errors collected by the RUM SDK.

By running the command against the example `dist` directory, Datadog expects your server or CDN to deliver the Javascript files at `https://hostname.com/static/js/javascript.364758.min.js` and `https://hostname.com/static/js/subdirectory/javascript.464388.min.js`.

**Note**: Only source maps with the `.js.map` extension work to correctly unminify stack traces in Error Tracking. Source maps with other extensions such as `.mjs.map` are accepted but do not unminify stack traces.

<div class="alert alert-info">If you are serving the same JavaScript source files from different subdomains, upload the related source map once and make it work for multiple subdomains by using the absolute prefix path instead of the full URL. For example, specify <code>/static/js</code> instead of <code>https://hostname.com/static/js</code>).</div>

### Link stack frames to your source code

If you run `datadog-ci sourcemaps upload` within a Git repository, it will automatically collect metadata about the repository, including the repository URL, current commit hash and the list of file paths in the repository that relate to your source maps. For more details about git metadata collection, refer to [datadog-ci documentation][3].

Datadog will then display links to your source code on unminified stack frames.

## Troubleshoot errors with ease

Without access to the file path and the line number, a minified stack trace is not helpful in troubleshooting your code base. Also, the code snippet is minified (which means there is one long line of transformed code), making the troubleshooting process more difficult.

The following example displays a minified stack trace:

{{< img src="real_user_monitoring/error_tracking/minified_stacktrace.png" alt="Error Tracking Minified Stack Trace" >}}

On the other hand, an unminified stack trace provides you with all the context you need for quick, seamless troubleshooting. For stack frames that relate to your source code, Datadog also generates a direct link to your repository:

{{< img src="real_user_monitoring/error_tracking/unminified_stacktrace.png" alt="Error Tracking Unminified Stack Trace" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps
[2]: https://docs.datadoghq.com/real_user_monitoring/browser/#initialization-parameters
[3]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#link-errors-with-your-source-code
