Datadog build plugins integrate with your JavaScript bundler to automate common RUM tasks during your build process. They are available for webpack, Vite, esbuild, Rollup, and Rspack.

Build plugins are complementary to the RUM Browser SDK. You still need to configure the SDK as described in [RUM Browser Client-Side Setup][1].

## Installation

Install the Datadog build plugin package for your bundler:

{% tabs %}

{% tab label="Webpack" %}

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

{% /tab %}

{% tab label="Vite" %}

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

{% /tab %}

{% tab label="esbuild" %}

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

{% /tab %}

{% tab label="Rollup" %}

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

{% /tab %}

{% tab label="Rspack" %}

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

{% /tab %}

{% /tabs %}

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
  // Source map uploads by debug ID (see Source maps below)
  sourcemaps: { /* ... */ },
  // Source map uploads by service and version (see Source maps below)
  errorTracking: {
    sourcemaps: { /* ... */ },
  },
  // RUM build-time features (see individual plugin sections below)
  rum: {
    privacy: { /* ... */ },
    sourceCodeContext: { /* ... */ },
  },
})
```

`sourcemaps` and `errorTracking.sourcemaps` are mutually exclusive: set one, based on the matching method you choose. See [Source maps](#source-maps) for details.

## Available plugins

### Source maps

The Source maps build plugin automatically uploads JavaScript source maps to Datadog during your build, enabling deobfuscated stack traces in [Error Tracking][2] and [RUM][3]. This replaces the need to manually run `datadog-ci sourcemaps upload` or configure CI/CD pipelines for source map uploads.

The plugin hooks into the build process, discovers all `.js` files with corresponding `.map` source map files from the build output, and uploads them to Datadog with git metadata. It can associate source maps with events by debug ID or by service and version.

#### Prerequisites

- A Datadog API key, set with `auth.apiKey` or the `DATADOG_API_KEY` environment variable.
- Source maps enabled in your bundler configuration. The plugin uploads source maps but does not generate them. See [Upload JavaScript Source Maps][4] for bundler-specific source map generation setup.
- For debug ID uploads, enable debug ID injection in the build plugin.
- For service and version uploads, initialize the RUM SDK with `service` and `version` parameters that match the plugin configuration.
- The Datadog build plugin installed and registered with your bundler. See [Installation](#installation).

#### Configuration

The following environment variables override configuration values:

- `DATADOG_SITE` or `DD_SITE`: Overrides `auth.site` for the intake URL.
- `DATADOG_SOURCEMAP_INTAKE_URL`: Overrides the full intake URL directly.

Choose one source map upload matching method: debug ID or service and version. These upload methods are mutually exclusive.

##### Debug ID (recommended)

Debug IDs associate each JavaScript bundle with its source map without relying on the bundle URL, service, or version. Use this method for new configurations.

Debug ID support requires [Datadog Build Plugins version 3.3.0][6] or later.

Configure the following options in `sourcemaps`:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `sourcemaps.debugId` | Boolean | Yes | None | Set to `true` to inject a debug ID into each JavaScript bundle. |
| `sourcemaps.upload` | Boolean | Yes, to upload | `false` | Set to `true` to upload source maps during the build. If omitted, the plugin only injects debug IDs. |
| `sourcemaps.bailOnError` | Boolean | No | `false` | If `true`, the build fails when a source map upload error occurs. |
| `sourcemaps.dryRun` | Boolean | No | `false` | If `true`, the plugin runs through the upload process without sending data to Datadog. Use this to verify your configuration. |
| `sourcemaps.maxConcurrency` | Number | No | `20` | Maximum number of concurrent source map uploads. |

Set `debugId` and `upload` to `true` to inject debug IDs and upload source maps during the build:

{% tabs %}

{% tab label="Webpack" %}

```javascript
// webpack.config.js
const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

module.exports = {
  plugins: [
    datadogWebpackPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com', // Optional: defaults to datadoghq.com
      },
      sourcemaps: {
        debugId: true,
        upload: true,
      },
    }),
  ],
};
```

{% /tab %}

{% tab label="Vite" %}

```javascript
// vite.config.js
import { datadogVitePlugin } from '@datadog/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    datadogVitePlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com', // Optional: defaults to datadoghq.com
      },
      sourcemaps: {
        debugId: true,
        upload: true,
      },
    }),
  ],
});
```

{% /tab %}

{% tab label="esbuild" %}

```javascript
// esbuild.config.js
const { datadogEsbuildPlugin } = require('@datadog/esbuild-plugin');

require('esbuild').build({
  plugins: [
    datadogEsbuildPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com', // Optional: defaults to datadoghq.com
      },
      sourcemaps: {
        debugId: true,
        upload: true,
      },
    }),
  ],
});
```

{% /tab %}

{% tab label="Rollup" %}

```javascript
// rollup.config.js
import { datadogRollupPlugin } from '@datadog/rollup-plugin';

export default {
  plugins: [
    datadogRollupPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com', // Optional: defaults to datadoghq.com
      },
      sourcemaps: {
        debugId: true,
        upload: true,
      },
    }),
  ],
};
```

{% /tab %}

{% tab label="Rspack" %}

```javascript
// rspack.config.js
const { datadogRspackPlugin } = require('@datadog/rspack-plugin');

module.exports = {
  plugins: [
    datadogRspackPlugin({
      auth: {
        apiKey: process.env.DATADOG_API_KEY,
        site: 'datadoghq.com', // Optional: defaults to datadoghq.com
      },
      sourcemaps: {
        debugId: true,
        upload: true,
      },
    }),
  ],
};
```

{% /tab %}

{% /tabs %}

##### Service and version

Configure the `errorTracking.sourcemaps` object to upload source maps using service and version matching:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `errorTracking.sourcemaps.service` | String | Yes | None | Service name. Must match the RUM SDK `service` initialization parameter. |
| `errorTracking.sourcemaps.releaseVersion` | String | Yes, unless `metadata.version` is set | None | Release version. Must match the RUM SDK `version` initialization parameter. |
| `errorTracking.sourcemaps.minifiedPathPrefix` | String | Yes | None | URL or root-relative path prefix where your minified JavaScript files are served. For example, `https://example.com/static/` or `/static/`. |
| `errorTracking.sourcemaps.bailOnError` | Boolean | No | `false` | If `true`, the build fails when a source map upload error occurs. |
| `errorTracking.sourcemaps.dryRun` | Boolean | No | `false` | If `true`, the plugin runs through the upload process without sending data to Datadog. Use this to verify your configuration. |
| `errorTracking.sourcemaps.maxConcurrency` | Number | No | `20` | Maximum number of concurrent source map uploads. |

```javascript
// webpack.config.js
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

{% alert %}
This example uses webpack. The configuration object is identical across all supported bundlers. Only the import and plugin function name differ. See [Installation](#installation) for installation instructions for your bundler.
{% /alert %}

To also display inline source code in Error Tracking stack traces, pair service and version source map uploads with the [Source code context](#source-code-context) plugin.

### Action name deobfuscation

When you enable the [`enablePrivacyForActionName`][5] initialization parameter, action names are masked for privacy. In minified builds, action names can also become unreadable because bundlers obfuscate the DOM element text and attributes that RUM uses to generate action names.

The Action name deobfuscation build plugin addresses both issues by instrumenting your source code at build time to generate a privacy dictionary that maps obfuscated values back to their original text. The RUM SDK uses this dictionary to resolve readable action names.

#### Prerequisites

- The RUM SDK initialized with `trackUserInteractions: true` and `enablePrivacyForActionName: true`. See [Mask all action names][5].
- The Datadog build plugin installed and registered with your bundler. See [Installation](#installation).

#### Configuration

Configure the `rum.privacy` object in your build plugin options:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `rum.privacy.include` | Array of RegExp or String | No | JS/TS files (.js, .ts, .jsx, .tsx, .mjs, .cjs, and variants) | File patterns to process for action name deobfuscation. |
| `rum.privacy.exclude` | Array of RegExp or String | No | `node_modules`, `.preval.` files | File patterns to skip. |

#### Example

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

{% alert %}
These examples use webpack. The configuration object is identical across all supported bundlers. See [Installation](#installation) for installation instructions.
{% /alert %}

### Source code context

When viewing errors in [Error Tracking][2], Datadog can display the source code lines surrounding each frame in the stack trace. The Source code context build plugin enables this feature by injecting a small runtime snippet into your bundle that associates stack traces with your `service` and `version` metadata.

At build time, the plugin injects a snippet that writes metadata to `window.DD_SOURCE_CODE_CONTEXT`. At runtime, the RUM SDK reads `window.DD_SOURCE_CODE_CONTEXT` to tag errors with the correct service and version for source code resolution. This works with [uploaded source maps][4]: source maps provide the file mapping, and `window.DD_SOURCE_CODE_CONTEXT` provides the service and version association.

#### Prerequisites

- Source maps uploaded to Datadog, either through the [Source Maps](#source-maps) build plugin or [manually][4].
- The RUM SDK initialized with matching `service` and `version` parameters.
- The Datadog build plugin installed and registered with your bundler. See [Installation](#installation).

#### Configuration

Configure the `rum.sourceCodeContext` object in your build plugin options:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `rum.sourceCodeContext.service` | String | Yes | None | Service name. Must match the RUM SDK `service` initialization parameter. |
| `rum.sourceCodeContext.version` | String | No | None | Release version. If omitted, source code context is not associated with a specific version. If set, must match the RUM SDK `version` initialization parameter. |

#### Example

The following example shows source code context combined with source maps, a common pairing:

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

{% alert %}
This example uses webpack. The configuration object is identical across all supported bundlers. See [Installation](#installation) for installation instructions for your bundler.
{% /alert %}

[1]: /real_user_monitoring/application_monitoring/browser/setup/client
[2]: /real_user_monitoring/error_tracking
[3]: /real_user_monitoring/
[4]: /real_user_monitoring/guide/upload-javascript-source-maps
[5]: /real_user_monitoring/application_monitoring/browser/tracking_user_actions#mask-all-action-names
[6]: https://github.com/DataDog/build-plugins/releases/tag/v3.3.0
