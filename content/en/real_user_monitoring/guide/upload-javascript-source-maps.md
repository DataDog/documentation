---
title: Upload JavaScript Source Maps
kind: guide
further_reading:
- link: '/real_user_monitoring/error_tracking'
  tag: 'Documentation'
  text: 'Get started with Error Tracking'
- link: '/real_user_monitoring/error_tracking/explorer'
  tag: 'Documentation'
  text: 'Visualize your Error Tracking data in the Explorer'
- link: 'https://github.com/DataDog/datadog-ci/tree/457d25821e838db9067dbe376d0f34fb1a197869/src/commands/sourcemaps'
  tag: 'Source Code'
  text: 'Complete Sourcemaps reference'
---

## Overview

If your front-end JavaScript source code is minified, upload your source maps to Datadog to de-obfuscate your different stack traces. For any given error, you can access the file path, line number, and code snippet for each frame of the related stack trace. Datadog can also link stack frames to your source code in your repository.

<div class="alert alert-info">Only errors collected by <a href="/real_user_monitoring/">Real User Monitoring (RUM)</a>, and logs from <a href="/logs/log_collection/javascript/">Browser Logs Collection</a> can be unminified.</div>

## Instrument your code

Configure your JavaScript bundler such that when minifying your source code, it generates source maps that directly include the related source code in the `sourcesContent` attribute. 

<div class="alert alert-warning">
{{< site-region region="us,us3,us5,eu" >}}
Ensure that the size of each source map augmented with the size of the related minified file does not exceed the limit of **300** MB.
{{< /site-region >}}
{{< site-region region="ap1,gov" >}}
Ensure that the size of each source map augmented with the size of the related minified file does not exceed the limit of **50** MB.
{{< /site-region >}}
</div>

See the following configurations for popular JavaScript bundlers.

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

<div class="alert alert-warning">
{{< site-region region="us,us3,us5,eu" >}}
If the sum of the file size for <code>javascript.364758.min.js</code> and <code>javascript.364758.js.map</code> exceeds the <b>the **300** MB</b> limit, reduce it by configuring your bundler to split the source code into multiple smaller chunks. For more information, see <a href="https://webpack.js.org/guides/code-splitting/">Code Splitting with WebpackJS</a>.
{{< /site-region >}}
{{< site-region region="ap1,gov" >}}
If the sum of the file size for <code>javascript.364758.min.js</code> and <code>javascript.364758.js.map</code> exceeds the <b>the **50** MB</b> limit, reduce it by configuring your bundler to split the source code into multiple smaller chunks. For more information, see <a href="https://webpack.js.org/guides/code-splitting/">Code Splitting with WebpackJS</a>.
{{< /site-region >}}
</div>

## Upload your source maps

The best way to upload source maps is to add an extra step in your CI pipeline and run the dedicated command from the [Datadog CLI][1]. It scans the `dist` directory and subdirectories to automatically upload source maps with relevant minified files.

{{< site-region region="us" >}}
1. Add `@datadog/datadog-ci` to your `package.json` file (make sure you're using the latest version).
2. [Create a dedicated Datadog API key][1] and export it as an environment variable named `DATADOG_API_KEY`.
3. Run the following command once per service in your RUM application:

   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service=my-service \
     --release-version=v35.2395005 \
     --minified-path-prefix=https://hostname.com/static/js
   ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

{{< site-region region="eu,us3,us5,gov,ap1" >}}
1. Add `@datadog/datadog-ci` to your `package.json` file (make sure you're using the latest version).
2. [Create a dedicated Datadog API key][1] and export it as an environment variable named `DATADOG_API_KEY`.
3. Configure the CLI to upload files to the {{<region-param key="dd_site_name">}} site by exporting two environment variables: `export DATADOG_SITE=`{{<region-param key="dd_site" code="true">}} and `export DATADOG_API_HOST=api.`{{<region-param key="dd_site" code="true">}}.
4. Run the following command once per service in your RUM application:
   ```bash
   datadog-ci sourcemaps upload /path/to/dist \
     --service=my-service \
     --release-version=v35.2395005 \
     --minified-path-prefix=https://hostname.com/static/js
   ```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

To minimize overhead on your CI's performance, the CLI is optimized to upload as many source maps as you need in a short amount of time (typically a few seconds).

**Note**: Re-uploading a source map does not override the existing one if the version has not changed.

The `--service` and `--release-version` parameters must match the `service` and `version` tags on your RUM events and browser logs. For more information on how to setup these tags, refer to the [Browser RUM SDK initialization documentation][2] or [Browser Logs Collection documentation][3].

<div class="alert alert-info">If you have defined multiple services in your RUM application, run the CI command as many times as there are services, even if you have one set of sourcemaps for the entire RUM application.</div>

By running the command against the example `dist` directory, Datadog expects your server or CDN to deliver the JavaScript files at `https://hostname.com/static/js/javascript.364758.min.js` and `https://hostname.com/static/js/subdirectory/javascript.464388.min.js`.

Only source maps with the `.js.map` extension work to correctly unminify stack traces. Source maps with other extensions such as `.mjs.map` are accepted but do not unminify stack traces.

<div class="alert alert-info">If you are serving the same JavaScript source files from different subdomains, upload the related source map once and make it work for multiple subdomains by using the absolute prefix path instead of the full URL. For example, specify <code>/static/js</code> instead of <code>https://hostname.com/static/js</code>.</div>

### Link stack frames to your source code

If you run `datadog-ci sourcemaps upload` within a Git working directory, Datadog collects repository metadata. The `datadog-ci` command collects the repository URL, the current commit hash, and the list of file paths in the repository that relate to your source maps. For more details about Git metadata collection, refer to the [datadog-ci documentation][4].

Datadog displays links to your source code on unminified stack frames.

## Troubleshoot errors with ease

Without access to the file path and the line number, a minified stack trace is not helpful in troubleshooting your code base. Also, the code snippet is minified (which means there is one long line of transformed code), making the troubleshooting process more difficult.

The following example displays a minified stack trace:

{{< img src="real_user_monitoring/error_tracking/minified_stacktrace.png" alt="Error Tracking Minified Stack Trace" >}}

On the other hand, an unminified stack trace provides you with all the context you need for quick, seamless troubleshooting. For stack frames that relate to your source code, Datadog also generates a direct link to your repository:

{{< img src="real_user_monitoring/error_tracking/unminified_stacktrace.png" alt="Error Tracking Unminified Stack Trace" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps
[2]: https://docs.datadoghq.com/real_user_monitoring/browser/setup/#initialization-parameters
[3]: https://docs.datadoghq.com/logs/log_collection/javascript/#initialization-parameters
[4]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#link-errors-with-your-source-code
