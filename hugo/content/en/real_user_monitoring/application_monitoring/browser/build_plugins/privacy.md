---
title: Privacy Plugin
description: "Generate an allowlist of safe strings at build time to keep useful RUM action names while masking sensitive data."
aliases:
  - /real_user_monitoring/application_monitoring/browser/build_plugins/action_name_deobfuscation/
algolia:
  tags: ['action names', 'build plugins', 'privacy', 'allowlist']
further_reading:
- link: '/real_user_monitoring/application_monitoring/browser/tracking_user_actions'
  tag: 'Documentation'
  text: 'Tracking User Actions'
- link: '/data_security/real_user_monitoring'
  tag: 'Documentation'
  text: 'RUM Data Security'
- link: "https://www.datadoghq.com/blog/rum-build-time-privacy-allowlist/"
  tag: "Blog"
  text: "Reduce sensitive data exposure with build-time allowlists"
- link: 'https://github.com/DataDog/build-plugins'
  tag: 'Source Code'
  text: 'Datadog Build Plugins GitHub Repository'
---

## Overview

The privacy plugin generates an allowlist of safe, static strings at build time. The RUM Browser SDK uses this allowlist to keep useful action names while masking potentially sensitive text constructed at runtime. The same allowlist also controls which text remains visible in Session Replay.

With the `mask-unless-allowlisted` privacy level, the SDK displays text only when it matches the build-time allowlist. Static application labels can remain readable, while unknown text, such as user input or a customer's name loaded from an API, remains masked.

## How the privacy plugin works

1. During the build, the plugin extracts static strings from compiled application artifacts, including bundles and source maps, to generate an allowlist. It excludes dynamic expressions and their runtime values.
2. At runtime, the RUM Browser SDK checks candidate text against the allowlist before using it in action names or Session Replay. It keeps matching text readable and replaces unknown text with a fixed masking placeholder. Stricter privacy settings on individual elements still apply.

For example, a static `Order value` label can remain readable in an action name such as `Click on Order value`. A customer-specific value calculated at runtime, such as `$142.75`, remains masked when it is absent from the allowlist.

## Prerequisites

- RUM Browser SDK v7 initialized with `trackUserInteractions: true` and `enablePrivacyForActionName: true`. See [Tracking User Actions][1].
- The Datadog build plugin installed and registered with your bundler. See [Build Plugins][2] for installation instructions.

## Configuration

### Configure the Browser SDK

Set `defaultPrivacyLevel` to `mask-unless-allowlisted` to apply build-time allowlisting across the application. Keep `enablePrivacyForActionName` enabled so action names follow the privacy setting:

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  trackUserInteractions: true,
  enablePrivacyForActionName: true,
  defaultPrivacyLevel: 'mask-unless-allowlisted',
});
```

To apply this privacy level to part of the application, set `data-dd-privacy="mask-unless-allowlisted"` on the relevant HTML element. See [Session Replay privacy options][3] for more about element-level privacy overrides.

### Configure the build plugin

Enable the privacy plugin by adding a `rum.privacy` object to your build plugin options. Use `include` and `exclude` to control which source files the plugin processes when generating the allowlist:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `rum.privacy.include` | Array of RegExp or String | No | JS/TS files (.js, .ts, .jsx, .tsx, .mjs, .cjs, and variants) | File patterns to process when generating the allowlist. |
| `rum.privacy.exclude` | Array of RegExp or String | No | `node_modules`, `.preval.` files | File patterns to skip. |

## Examples

Enable the privacy plugin with default settings (processes JS/TS files and excludes `node_modules` and `.preval.` files):

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

To customize which files the plugin processes, set include and exclude patterns:

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

<div class="alert alert-info">These examples use webpack. The configuration object is identical across all supported bundlers. See <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/">Build Plugins</a> for installation instructions.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/application_monitoring/browser/tracking_user_actions/
[2]: /real_user_monitoring/application_monitoring/browser/build_plugins/
[3]: /session_replay/privacy_options/#override-an-html-element
