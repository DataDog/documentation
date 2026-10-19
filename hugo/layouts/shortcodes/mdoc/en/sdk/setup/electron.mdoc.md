<!--
This partial contains setup instructions for the Electron SDK.
-->

## Overview

This page describes how to instrument your Electron applications for [Real User Monitoring (RUM)][1] with the Electron SDK.

- The Electron SDK monitors the main process. It uses dd-trace-js to collect traces and sends the data from the main process to Datadog.
- The Browser SDK monitors renderer processes. It forwards its events to the main process, which uploads them to Datadog.

## Prerequisites

Before you begin, you need:

- A Datadog account with RUM enabled
- Electron 39 or later, on Linux, macOS, or Windows

## Create the application in Datadog

1. In Datadog, navigate to [**Digital Experience** > **Add an Application**][7].
2. Select **Electron** as the application type.
3. Copy the client token and application ID. You need them to initialize the SDK.

## Install the SDK

Add `@datadog/electron-sdk` to your application:

{% tabs %}
{% tab label="npm" %}

```shell
npm install @datadog/electron-sdk
```

{% /tab %}
{% tab label="Yarn" %}

```shell
yarn add @datadog/electron-sdk
```

{% /tab %}
{% /tabs %}

## Initialize the SDK in the main process

1. Import `@datadog/electron-sdk/instrument` before importing `electron`. This import instruments the Electron APIs the SDK needs.
2. Call `init` with your configuration and wait for it to complete before you create any browser window.

The example assumes an ES module main process, which supports top-level `await`. Otherwise, wrap the code in an async function.

{% site-region region="us" %}

```typescript
// src/main.ts
import '@datadog/electron-sdk/instrument';
import { app, BrowserWindow } from 'electron';
import { init } from '@datadog/electron-sdk';

await init({
  clientToken: '<CLIENT_TOKEN>',
  applicationId: '<APPLICATION_ID>',
  site: 'datadoghq.com',
  service: '<SERVICE_NAME>',
  env: '<ENV_NAME>', // optional
  version: '1.0.0', // optional
  allowedRendererHosts: ['*'], // restrict to specific hostnames in production
});

await app.whenReady();

const mainWindow = new BrowserWindow({ width: 1200, height: 800 });
```

{% /site-region %}

{% site-region region="us3" %}

```typescript
// src/main.ts
import '@datadog/electron-sdk/instrument';
import { app, BrowserWindow } from 'electron';
import { init } from '@datadog/electron-sdk';

await init({
  clientToken: '<CLIENT_TOKEN>',
  applicationId: '<APPLICATION_ID>',
  site: 'us3.datadoghq.com',
  service: '<SERVICE_NAME>',
  env: '<ENV_NAME>', // optional
  version: '1.0.0', // optional
  allowedRendererHosts: ['*'], // restrict to specific hostnames in production
});

await app.whenReady();

const mainWindow = new BrowserWindow({ width: 1200, height: 800 });
```

{% /site-region %}

{% site-region region="us5" %}

```typescript
// src/main.ts
import '@datadog/electron-sdk/instrument';
import { app, BrowserWindow } from 'electron';
import { init } from '@datadog/electron-sdk';

await init({
  clientToken: '<CLIENT_TOKEN>',
  applicationId: '<APPLICATION_ID>',
  site: 'us5.datadoghq.com',
  service: '<SERVICE_NAME>',
  env: '<ENV_NAME>', // optional
  version: '1.0.0', // optional
  allowedRendererHosts: ['*'], // restrict to specific hostnames in production
});

await app.whenReady();

const mainWindow = new BrowserWindow({ width: 1200, height: 800 });
```

{% /site-region %}

{% site-region region="eu" %}

```typescript
// src/main.ts
import '@datadog/electron-sdk/instrument';
import { app, BrowserWindow } from 'electron';
import { init } from '@datadog/electron-sdk';

await init({
  clientToken: '<CLIENT_TOKEN>',
  applicationId: '<APPLICATION_ID>',
  site: 'datadoghq.eu',
  service: '<SERVICE_NAME>',
  env: '<ENV_NAME>', // optional
  version: '1.0.0', // optional
  allowedRendererHosts: ['*'], // restrict to specific hostnames in production
});

await app.whenReady();

const mainWindow = new BrowserWindow({ width: 1200, height: 800 });
```

{% /site-region %}

{% site-region region="ap1" %}

```typescript
// src/main.ts
import '@datadog/electron-sdk/instrument';
import { app, BrowserWindow } from 'electron';
import { init } from '@datadog/electron-sdk';

await init({
  clientToken: '<CLIENT_TOKEN>',
  applicationId: '<APPLICATION_ID>',
  site: 'ap1.datadoghq.com',
  service: '<SERVICE_NAME>',
  env: '<ENV_NAME>', // optional
  version: '1.0.0', // optional
  allowedRendererHosts: ['*'], // restrict to specific hostnames in production
});

await app.whenReady();

const mainWindow = new BrowserWindow({ width: 1200, height: 800 });
```

{% /site-region %}

{% site-region region="ap2" %}

```typescript
// src/main.ts
import '@datadog/electron-sdk/instrument';
import { app, BrowserWindow } from 'electron';
import { init } from '@datadog/electron-sdk';

await init({
  clientToken: '<CLIENT_TOKEN>',
  applicationId: '<APPLICATION_ID>',
  site: 'ap2.datadoghq.com',
  service: '<SERVICE_NAME>',
  env: '<ENV_NAME>', // optional
  version: '1.0.0', // optional
  allowedRendererHosts: ['*'], // restrict to specific hostnames in production
});

await app.whenReady();

const mainWindow = new BrowserWindow({ width: 1200, height: 800 });
```

{% /site-region %}

Replace the placeholders with the values from your application, and set `allowedRendererHosts` to the hostnames of the renderer pages that are allowed to report through the main process. For the supported values, see [Advanced Configuration][2].

{% alert level="info" %}
If you call `init` after some windows are already open, those windows use the default settings, such as the `mask` privacy level, until you reload them. The SDK applies `allowedRendererHosts` to renderer events only after `init` runs.
{% /alert %}
<!-- TODO(resync): confirm the deferred init wording against the v1.0.0 README and PR #257 -->

## Set up renderer processes

Renderer processes are monitored by the Browser SDK.

1. Follow the [Browser SDK setup][3] in the pages loaded by your renderer processes.
2. In the main process `init` call, list the renderer hosts that report through the main process in `allowedRendererHosts`. Renderers whose host is not listed do not report through the main process.

{% alert level="info" %}
Sampling, Session Replay, and profiling options are set in the main process `init` call. The values set in the renderer are ignored.
{% /alert %}

For details on `allowedRendererHosts`, see [Advanced Configuration][2].

## Configure your bundler

The SDK must load before Electron. Add the Datadog plugin for your bundler to the main-process bundler configuration so that this order is respected.

By default, the plugins do not copy the SDK or dd-trace-js into the build output. Your application packager must include `@datadog/electron-sdk` and its runtime dependencies, so keep `@datadog/electron-sdk` in your application's production `dependencies`.

<!-- TODO(resync): check against merged electron-sdk #216 -->

### Electron Forge

The Forge Vite and Webpack plugins package only the `.vite` or `.webpack` directory. Add an `ignore` function to `packagerConfig` in `forge.config.ts` that also keeps the root `node_modules` directory, so that Forge packages your production dependencies.

{% tabs %}
{% tab label="Forge with Vite" %}

```typescript
// forge.config.ts
packagerConfig: {
  ignore: (file) => {
    if (!file) return false;
    return !/^[/\\](?:\.vite|node_modules)(?:[/\\]|$)/.test(file);
  },
},
```

Then add the Datadog Vite plugin to the main-process Vite configuration:

```typescript
// vite.main.config.ts
import { defineConfig } from 'vite';
import { datadogVitePlugin } from '@datadog/electron-sdk/vite-plugin';

export default defineConfig({
  plugins: [datadogVitePlugin()],
});
```

{% /tab %}
{% tab label="Forge with Webpack" %}

```typescript
// forge.config.ts
packagerConfig: {
  ignore: (file) => {
    if (!file) return false;
    return !/^[/\\](?:\.webpack|node_modules)(?:[/\\]|$)/.test(file);
  },
},
```

Then add the Datadog Webpack plugin to the main-process Webpack configuration:

```typescript
// webpack.main.config.ts
import { DatadogWebpackPlugin } from '@datadog/electron-sdk/webpack-plugin';

export const mainConfig = {
  plugins: [new DatadogWebpackPlugin()],
};
```

{% /tab %}
{% /tabs %}

Use a package manager layout that Forge supports. For example, use pnpm with a hoisted `node_modules` directory, or Yarn 2 and later with the `node-modules` linker. See the [Electron Forge documentation][8].

### Other bundlers and packagers

electron-builder and plain Electron Forge package production dependencies by default. Add the plugin for your bundler to the main-process bundler configuration:

{% tabs %}
{% tab label="Vite" %}

Use the Vite plugin, including with electron-vite and standalone Vite:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { datadogVitePlugin } from '@datadog/electron-sdk/vite-plugin';

export default defineConfig({
  plugins: [datadogVitePlugin()],
});
```

{% /tab %}
{% tab label="Webpack" %}

```javascript
// webpack.config.js
const { DatadogWebpackPlugin } = require('@datadog/electron-sdk/webpack-plugin');

module.exports = {
  plugins: [new DatadogWebpackPlugin()],
};
```

{% /tab %}
{% tab label="esbuild" %}

```typescript
// esbuild.config.ts
import { datadogEsbuildPlugin } from '@datadog/electron-sdk/esbuild-plugin';

await esbuild.build({
  plugins: [datadogEsbuildPlugin()],
});
```

{% /tab %}
{% /tabs %}

If your packager cannot include external dependencies, pass `{ copyRuntimeDependencies: true }` to the plugin as a fallback. The plugin then copies the SDK, dd-trace-js, and their runtime dependencies into the build output on a best-effort basis.

## Next steps

After you run your app, navigate to the [RUM Explorer][4] to see sessions from your application.

- [Advanced Configuration][2]: configure sampling, event enrichment, and renderer options.
- [Error Tracking][5]: track main process errors and crashes.
- [Data Collected][6]: review the data collected by the SDK.

[1]: /real_user_monitoring/
[2]: /real_user_monitoring/application_monitoring/electron/advanced_configuration
[3]: /real_user_monitoring/application_monitoring/browser/setup/
[4]: /real_user_monitoring/explorer/
[5]: /real_user_monitoring/application_monitoring/electron/error_tracking
[6]: /real_user_monitoring/application_monitoring/electron/data_collected
[7]: https://app.datadoghq.com/rum/application/create
[8]: https://www.electronforge.io/cli#usage
