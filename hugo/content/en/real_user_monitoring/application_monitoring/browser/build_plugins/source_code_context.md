---
title: Source Code Context
description: "Display source code inline in Error Tracking stack traces by injecting debug ID or service and version metadata at build time."
algolia:
  tags: ['source code context', 'build plugins', 'error tracking', 'stack traces']
further_reading:
- link: '/real_user_monitoring/guide/upload-javascript-source-maps'
  tag: 'Documentation'
  text: 'Upload JavaScript Source Maps'
- link: '/real_user_monitoring/error_tracking'
  tag: 'Documentation'
  text: 'Error Tracking'
- link: '/real_user_monitoring/guide/debug-symbols'
  tag: 'Documentation'
  text: 'Debug Symbols'
- link: 'https://github.com/DataDog/build-plugins'
  tag: 'Source Code'
  text: 'Datadog Build Plugins GitHub Repository'
---

## Overview

When viewing errors in [Error Tracking][1], Datadog can display the source code lines surrounding each frame in the stack trace. The Source Code Context build plugin enables this feature by injecting a small runtime snippet into your bundle that associates stack traces with a debug ID or with `service` and `version` metadata.

At build time, the plugin injects a snippet that writes metadata to `window.DD_SOURCE_CODE_CONTEXT`. At runtime, the RUM SDK reads this metadata to associate stack frames with [uploaded source maps][2].

## Prerequisites

- Source maps uploaded to Datadog, either through the [Source Maps build plugin][3] or [manually][2].
- For service and version matching, initialize the RUM SDK with matching `service` and `version` parameters.
- The Datadog build plugin installed and registered with your bundler. See [Build Plugins][4] for installation instructions.

## Configuration

Configure `rum.sourceCodeContext` using one of the following methods. The two configurations are mutually exclusive.

{{< tabs >}}
{{% tab "Debug ID (Recommended)" %}}

Debug IDs associate each JavaScript bundle with its source map without relying on the bundle URL, service, or version. Use this method for new configurations.

Set `debugId` to `true` in `rum.sourceCodeContext` to inject a debug ID into each JavaScript bundle.

The following example also configures `errorTracking.sourcemaps.debugId` so that the build plugin uploads the source maps:

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

If you upload source maps with another tool, such as `datadog-ci`, omit `auth` and `errorTracking.sourcemaps` from this configuration.

{{% /tab %}}
{{% tab "Service and version" %}}

Service and version matching associates stack frames with source maps using metadata from the RUM SDK and the uploaded source maps.

Configure the following options in `rum.sourceCodeContext`:

- `service` (String, required): The service name. It must match the RUM SDK `service` initialization parameter.
- `version` (String, optional): The release version. If set, it must match the RUM SDK `version` initialization parameter. If omitted, source code context is not associated with a specific version.

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      rum: {
        sourceCodeContext: {
          service: 'my-application',
          version: '1.0.0',
        },
      },
    }),
  ],
};
```

The `service` and `version` values must match the metadata used when uploading the source maps.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">This example uses webpack. The configuration object is identical across all supported bundlers. See <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/">Build Plugins</a> for installation instructions for your bundler.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/error_tracking
[2]: /real_user_monitoring/guide/upload-javascript-source-maps
[3]: /real_user_monitoring/application_monitoring/browser/build_plugins/source_maps
[4]: /real_user_monitoring/application_monitoring/browser/build_plugins/
