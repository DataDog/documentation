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

Configure the `rum.sourceCodeContext` object in your build plugin options:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `rum.sourceCodeContext.debugId` | Boolean | No | `false` | Inject a deterministic debug ID into each JavaScript bundle. |
| `rum.sourceCodeContext.upload` | Boolean | No | `false` | Upload source maps by debug ID during the build. Requires `debugId: true` and a Datadog API key. |
| `rum.sourceCodeContext.service` | String | Yes, unless `debugId` is enabled | None | Service name. Must match the RUM SDK `service` initialization parameter. |
| `rum.sourceCodeContext.version` | String | No | None | Release version. If omitted, source code context is not associated with a specific version. If set, must match the RUM SDK `version` initialization parameter. |

## Example

The following example injects debug IDs and uploads source maps directly from the build plugin:

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
      },
      rum: {
        sourceCodeContext: {
          debugId: true,
          upload: true,
        },
      },
    }),
  ],
};
```

<div class="alert alert-info">This example uses webpack. The configuration object is identical across all supported bundlers. See <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/">Build Plugins</a> for installation instructions for your bundler.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/error_tracking
[2]: /real_user_monitoring/guide/upload-javascript-source-maps
[3]: /real_user_monitoring/application_monitoring/browser/build_plugins/source_maps
[4]: /real_user_monitoring/application_monitoring/browser/build_plugins/
