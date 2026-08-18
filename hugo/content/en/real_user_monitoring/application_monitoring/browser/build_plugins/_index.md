---
title: Build Plugins
description: "Integrate Datadog build plugins with your JavaScript bundler to automate source map uploads, action name deobfuscation, and other RUM tasks at build time."
algolia:
  tags: ['build plugins', 'webpack', 'vite', 'esbuild', 'rollup', 'rspack', 'bundler']
further_reading:
- link: 'https://github.com/DataDog/build-plugins'
  tag: 'Source Code'
  text: 'Datadog Build Plugins GitHub Repository'
- link: '/real_user_monitoring/application_monitoring/browser/setup/client'
  tag: 'Documentation'
  text: 'RUM Browser Client-Side Setup'
---

## Overview

Datadog build plugins integrate with your JavaScript bundler to automate common RUM tasks during your build process. They are available for webpack, Vite, esbuild, Rollup, and Rspack.

Build plugins are complementary to the RUM Browser SDK. You still need to configure the SDK as described in the [Browser Monitoring Setup][1].

## Installation

Install the Datadog build plugin package for your bundler:

{{< tabs >}}
{{% tab "Webpack" %}}

```bash
npm install --save-dev @datadog/webpack-plugin
```

```javascript
// webpack.config.js
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      // configuration
    }),
  ],
};
```

{{% /tab %}}
{{% tab "Vite" %}}

```bash
npm install --save-dev @datadog/vite-plugin
```

```javascript
// vite.config.js
import { datadogVitePlugin } from '@datadog/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    datadogVitePlugin({
      // configuration
    }),
  ],
});
```

{{% /tab %}}
{{% tab "esbuild" %}}

```bash
npm install --save-dev @datadog/esbuild-plugin
```

```javascript
// esbuild.config.js
const { datadogEsbuildPlugin } = require('@datadog/esbuild-plugin');

require('esbuild').build({
  plugins: [
    datadogEsbuildPlugin({
      // configuration
    }),
  ],
});
```

{{% /tab %}}
{{% tab "Rollup" %}}

```bash
npm install --save-dev @datadog/rollup-plugin
```

```javascript
// rollup.config.js
import { datadogRollupPlugin } from '@datadog/rollup-plugin';

export default {
  plugins: [
    datadogRollupPlugin({
      // configuration
    }),
  ],
};
```

{{% /tab %}}
{{% tab "Rspack" %}}

```bash
npm install --save-dev @datadog/rspack-plugin
```

```javascript
// rspack.config.js
const { datadogRspackPlugin } = require('@datadog/rspack-plugin');

module.exports = {
  plugins: [
    datadogRspackPlugin({
      // configuration
    }),
  ],
};
```

{{% /tab %}}
{{< /tabs >}}

## Configuration

The following shared configuration options apply to all plugins:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `auth.apiKey` | String | Yes (Source Maps only) | None | Your Datadog API key. Can also be set with the `DATADOG_API_KEY` environment variable. |
| `auth.site` | String | No | `datadoghq.com` | Your Datadog site. Can also be set with the `DATADOG_SITE` or `DD_SITE` environment variable. |
| `logLevel` | String | No | `warn` | Log verbosity level. One of `debug`, `info`, `warn`, `error`, or `none`. |

The following example shows the full configuration structure:

```javascript
datadogWebpackPlugin({
  auth: {
    apiKey: process.env.DATADOG_API_KEY,
    site: 'datadoghq.com',
  },
  logLevel: 'warn',
  // Source map uploads (see Source Maps plugin page)
  errorTracking: {
    sourcemaps: { /* ... */ },
  },
  // RUM build-time features (see individual plugin pages)
  rum: {
    privacy: { /* ... */ },
    sourceCodeContext: { /* ... */ },
  },
})
```

## Available plugins

{{< whatsnext desc="Configure individual build plugins:" >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_maps" >}}<u>Source Maps</u>: Automatically upload source maps to Datadog during your build, enabling deobfuscated stack traces.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins/action_name_deobfuscation" >}}<u>Action Name Deobfuscation</u>: Restore readable action names in minified builds.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context" >}}<u>Source Code Context</u>: Display source code inline in Error Tracking stack traces.{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/application_monitoring/browser/setup/
