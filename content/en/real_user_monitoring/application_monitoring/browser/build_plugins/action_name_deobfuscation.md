---
title: Action Name Deobfuscation
description: "Restore readable RUM action names in minified builds by generating a build-time privacy dictionary that maps obfuscated values to original text."
algolia:
  tags: ['action names', 'build plugins', 'privacy', 'deobfuscation']
further_reading:
- link: '/real_user_monitoring/application_monitoring/browser/tracking_user_actions'
  tag: 'Documentation'
  text: 'Tracking User Actions'
- link: '/data_security/real_user_monitoring'
  tag: 'Documentation'
  text: 'RUM Data Security'
- link: 'https://github.com/DataDog/build-plugins'
  tag: 'Source Code'
  text: 'Datadog Build Plugins GitHub Repository'
---

## Overview

When you enable the [`enablePrivacyForActionName`][1] initialization parameter, action names are masked for privacy. In minified builds, action names can also become unreadable because bundlers obfuscate DOM element text and attributes used to generate them.

The Action Name Deobfuscation build plugin solves both problems by instrumenting your source code at build time. It uses a WebAssembly-based code transformer to identify relevant strings and creates a privacy dictionary that maps obfuscated values back to their original text. A runtime helper injected into your bundle collects these mappings so the RUM SDK can resolve readable action names.

## Prerequisites

- The RUM SDK initialized with `trackUserInteractions: true` and `enablePrivacyForActionName: true`. See [Mask all action names][1].
- The Datadog build plugin installed and registered with your bundler. See [Build Plugins][2] for installation instructions.

## Configuration

Configure the `rum.privacy` object in your build plugin options:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `rum.privacy.include` | Array of RegExp or String | No | JS/TS files (`/\.(?:c\|m)?(?:j\|t)sx?$/`) | File patterns to process for action name deobfuscation. |
| `rum.privacy.exclude` | Array of RegExp or String | No | `node_modules`, `.preval.` files | File patterns to skip. |

## Example

With default settings (processes all JS/TS files, excludes `node_modules`):

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      rum: {
        privacy: {},
      },
    }),
  ],
};
```

With custom include and exclude patterns:

```javascript
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      rum: {
        privacy: {
          include: [/\.jsx?$/, /\.tsx?$/],
          exclude: [/\/node_modules\//, /\/test\//],
        },
      },
    }),
  ],
};
```

<div class="alert alert-info">These examples use webpack. The configuration object is identical across all supported bundlers. See <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/">Build Plugins</a> for installation instructions for your bundler.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/application_monitoring/browser/tracking_user_actions#mask-all-action-names
[2]: /real_user_monitoring/application_monitoring/browser/build_plugins/
