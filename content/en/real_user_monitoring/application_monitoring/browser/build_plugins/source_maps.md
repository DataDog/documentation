---
title: Source Maps
description: "Automatically upload JavaScript source maps to Datadog at build time to de-obfuscate stack traces in Error Tracking and RUM."
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

The Source Maps build plugin automatically uploads JavaScript source maps to Datadog during your build, enabling de-obfuscated stack traces in [Error Tracking][1] and [RUM][2]. This replaces the need to manually run `datadog-ci sourcemaps upload` or configure CI/CD pipelines for source map uploads.

The plugin hooks into the build process, discovers all `.js` files with corresponding `.map` source map files from the build output, and uploads them to Datadog with git metadata.

## Prerequisites

- A Datadog API key, set with `auth.apiKey` or the `DATADOG_API_KEY` environment variable.
- Source maps enabled in your bundler configuration. The plugin uploads source maps but does not generate them. See [Upload JavaScript Source Maps][3] for bundler-specific source map generation setup.
- The RUM SDK initialized with `service` and `version` parameters that match the plugin's `service` and `releaseVersion` configuration.
- The Datadog build plugin installed and registered with your bundler. See [Build Plugins][4] for installation instructions.

## Configuration

Configure the `errorTracking.sourcemaps` object in your build plugin options:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `errorTracking.sourcemaps.service` | String | Yes | — | Service name. Must match the RUM SDK `service` initialization parameter. |
| `errorTracking.sourcemaps.releaseVersion` | String | Yes | — | Release version. Must match the RUM SDK `version` initialization parameter. |
| `errorTracking.sourcemaps.minifiedPathPrefix` | String | Yes | — | URL prefix or absolute path where your minified JavaScript files are served. For example, `https://example.com/static/` or `/static/`. |
| `errorTracking.sourcemaps.bailOnError` | Boolean | No | `false` | If `true`, the build fails when a source map upload error occurs. |
| `errorTracking.sourcemaps.dryRun` | Boolean | No | `false` | If `true`, the plugin validates and prepares uploads without sending data to Datadog. |
| `errorTracking.sourcemaps.maxConcurrency` | Number | No | `20` | Maximum number of concurrent source map uploads. |

The following environment variables override configuration values:
- `DATADOG_SITE` or `DD_SITE`: Overrides `auth.site` for the intake URL.
- `DATADOG_SOURCEMAP_INTAKE_URL`: Overrides the full intake URL directly.

## Example

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
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

<div class="alert alert-info">This example uses webpack. The configuration object is identical across all supported bundlers — only the import and plugin function name differ. See <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/">Build Plugins</a> for installation instructions for your bundler.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/error_tracking
[2]: /real_user_monitoring/
[3]: /real_user_monitoring/guide/upload-javascript-source-maps#instrument-your-code
[4]: /real_user_monitoring/application_monitoring/browser/build_plugins/
