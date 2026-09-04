---
title: Source Maps
description: "Automatically upload JavaScript source maps to Datadog at build time to deobfuscate stack traces in Error Tracking and RUM."
algolia:
  tags: ['source maps', 'build plugins', 'error tracking']
further_reading:
- link: '/real_user_monitoring/guide/upload-javascript-source-maps'
  tag: 'Documentation'
  text: 'Upload JavaScript Source Maps (manual method)'
- link: '/real_user_monitoring/error_tracking'
  tag: 'Documentation'
  text: 'Error Tracking'
- link: 'https://github.com/DataDog/build-plugins'
  tag: 'Source Code'
  text: 'Datadog Build Plugins GitHub Repository'
---

## Overview

The Source Maps build plugin automatically uploads JavaScript source maps to Datadog during your build, enabling deobfuscated stack traces in [Error Tracking][1] and [RUM][2]. This replaces the need to manually run `datadog-ci sourcemaps upload` or configure CI/CD pipelines for source map uploads.

The plugin hooks into the build process, discovers all `.js` files with corresponding `.map` source map files from the build output, and uploads them to Datadog with git metadata. Source maps can be associated with events by debug ID or by service and version.

## Prerequisites

- A Datadog API key, set with `auth.apiKey` or the `DATADOG_API_KEY` environment variable.
- Source maps enabled in your bundler configuration. The plugin uploads source maps but does not generate them. See [Upload JavaScript Source Maps][3] for bundler-specific source map generation setup.
- For debug ID uploads, enable debug ID injection in the build plugin.
- For service and version uploads, initialize the RUM SDK with `service` and `version` parameters that match the plugin configuration.
- The Datadog build plugin installed and registered with your bundler. See [Build Plugins][4] for installation instructions.

## Configuration

The following environment variables override configuration values:

- `DATADOG_SITE` or `DD_SITE`: Overrides `auth.site` for the intake URL.
- `DATADOG_SOURCEMAP_INTAKE_URL`: Overrides the full intake URL directly.

Choose either debug ID uploads or service and version uploads. Do not configure both upload methods in the same build.

{{< tabs >}}
{{% tab "Debug ID (Recommended)" %}}

Debug IDs associate each JavaScript bundle with its source map without relying on the bundle URL, service, or version. Use this method for new configurations.

Configure the following options in `errorTracking.sourcemaps`:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `debugId` | Boolean | Yes | None | Set to `true` to upload source maps using debug IDs. |
| `bailOnError` | Boolean | No | `false` | If `true`, the build fails when a source map upload error occurs. |
| `dryRun` | Boolean | No | `false` | If `true`, the plugin runs through the upload process without sending data to Datadog. Use this to verify your configuration. |
| `maxConcurrency` | Number | No | `20` | Maximum number of concurrent source map uploads. |

Also configure `rum.sourceCodeContext.debugId` to inject debug IDs during the build:

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com', // Optional: defaults to datadoghq.com
      },
      errorTracking: {
        sourcemaps: {
          debugId: true,
        },
      },
      rum: {
        sourceCodeContext: {
          debugId: true,
        },
      },
    }),
  ],
};
```

Debug ID uploads do not require a service, release version, or minified path prefix.

{{% /tab %}}
{{% tab "Service and version" %}}

Configure the `errorTracking.sourcemaps` object to upload source maps using service and version matching:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `service` | String | Yes | None | Service name. Must match the RUM SDK `service` initialization parameter. |
| `releaseVersion` | String | Yes, unless `metadata.version` is set | None | Release version. Must match the RUM SDK `version` initialization parameter. |
| `minifiedPathPrefix` | String | Yes | None | URL or root-relative path prefix where your minified JavaScript files are served. For example, `https://example.com/static/` or `/static/`. |
| `bailOnError` | Boolean | No | `false` | If `true`, the build fails when a source map upload error occurs. |
| `dryRun` | Boolean | No | `false` | If `true`, the plugin runs through the upload process without sending data to Datadog. Use this to verify your configuration. |
| `maxConcurrency` | Number | No | `20` | Maximum number of concurrent source map uploads. |

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com', // Optional: defaults to datadoghq.com
      },
      errorTracking: {
        sourcemaps: {
          service: 'my-application',
          releaseVersion: '1.0.0',
          minifiedPathPrefix: 'https://example.com/static/',
        },
      },
    }),
  ],
};
```

To also display inline source code in Error Tracking stack traces, pair service and version source map uploads with the [Source Code Context][5] plugin.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">These examples use webpack. The configuration object is identical across all supported bundlers — only the import and plugin function name differ. See <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/">Build Plugins</a> for installation instructions for your bundler.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/error_tracking
[2]: /real_user_monitoring/
[3]: /real_user_monitoring/guide/upload-javascript-source-maps#instrument-your-code
[4]: /real_user_monitoring/application_monitoring/browser/build_plugins/
[5]: /real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context
