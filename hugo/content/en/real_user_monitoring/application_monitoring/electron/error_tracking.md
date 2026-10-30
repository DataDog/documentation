---
title: Electron Crash Reporting and Error Tracking
description: Set up Error Tracking for your Electron applications to get readable stack traces for main process and renderer errors.
further_reading:
- link: '/real_user_monitoring/error_tracking/'
  tag: 'Documentation'
  text: 'Get started with Error Tracking'
- link: '/real_user_monitoring/error_tracking/explorer'
  tag: 'Documentation'
  text: 'Visualize Error Tracking data in the Explorer'
- link: '/real_user_monitoring/guide/upload-javascript-source-maps/'
  tag: 'Documentation'
  text: 'Upload JavaScript source maps'
- link: 'https://github.com/DataDog/datadog-ci'
  tag: 'Source Code'
  text: 'datadog-ci'
- link: 'https://github.com/DataDog/electron-sdk'
  tag: 'Source Code'
  text: 'Source code for electron-sdk'
---

## Overview

Enable Error Tracking for your Electron application to surface, triage, and debug errors and crashes in [Error Tracking][1]. Errors are deduplicated and grouped into issues to help you prioritize the most impactful problems.

The Electron SDK collects:

- Uncaught errors in the main process.
- Native crashes. The SDK stores a crash report locally and sends it the next time the application launches.
- Errors you report manually with `addError`.

Errors from renderer processes are collected by the Browser SDK. See the [renderer setup instructions][6].

## Setup

If you have not set up the RUM Electron SDK yet, follow the [setup instructions][2]. Error and crash collection is enabled after the SDK is initialized in the main process.

### Report handled errors

Use `addError` to report an error that your code handles:

```ts
import { addError } from '@datadog/electron-sdk';

try {
  riskyOperation();
} catch (error) {
  addError(error, { context: { component: 'sync' } });
}
```

### Native crashes

Electron symbols are resolved automatically. You do not need to upload debug symbols.

## Upload source maps

Upload source maps at build time so Error Tracking can display original source code in stack traces.

Stack traces collected in an Electron app contain the app's install path, which differs on each machine. The SDK rewrites the app path, as returned by `app.getAppPath()`, to `/` before sending events. For example, `/Users/alice/Applications/MyApp.app/Contents/Resources/app.asar/dist/main/index.js` becomes `/dist/main/index.js`. Other local paths are sent unchanged. URLs of renderers loaded from a custom protocol or `http(s)://` contain no install path and are not modified.

### Prepare your source maps

1. Configure your bundler to generate source maps that embed the original code (`sourcesContent`). See [Upload JavaScript source maps][3]. If you compile the main process with `tsc` and no bundler, set both `sourceMap: true` and `inlineSources: true`. Otherwise, stack traces resolve but show no code snippets.
2. Use a different `service` for the main process and for renderers. Datadog looks up source maps by service, version, and path, and the main process and a renderer can report the same path (for example, `/dist/index.js`). The main process reports the `service` passed to the Electron SDK `init()`. Renderers report the `service` passed to the Browser SDK `init()`.
3. Set a `version` in the `init()` of both SDKs. It is not set by default, and the `--release-version` of the upload must match it. See [Initialization parameters][4].

### Upload with `datadog-ci`

Use [`datadog-ci`][5] to upload source maps. The `--service` and `--release-version` values must match your SDK configuration. The `--minified-path-prefix` value must be the path at which the uploaded files appear in stack traces. Run `datadog-ci` from your git working tree: it sends the repository URL and the commit of the uploaded sources so Error Tracking can link stack frames to your code.

The examples assume an app packaged with its `dist/` folder.

{{< tabs >}}
{{% tab "Main process" %}}

Main process built to `dist/main/`:

```sh
datadog-ci sourcemaps upload ./dist/main \
  --service my-electron-app-main \
  --release-version "$VERSION" \
  --minified-path-prefix /dist/main/
```

{{% /tab %}}
{{% tab "Renderer (file://)" %}}

Renderer loaded from `file://` and built to `dist/renderer/`:

```sh
datadog-ci sourcemaps upload ./dist/renderer \
  --service my-electron-app-renderer \
  --release-version "$VERSION" \
  --minified-path-prefix /dist/renderer/
```

{{% /tab %}}
{{% tab "Renderer (custom protocol)" %}}

Renderer loaded from a custom protocol, for example `app://app/` serving the files of `dist/renderer/`. This requires Browser SDK 7.9.0 or later.

```sh
datadog-ci sourcemaps upload ./dist/renderer \
  --service my-electron-app-renderer \
  --release-version "$VERSION" \
  --minified-path-prefix app://app/
```

{{% /tab %}}
{{% tab "Renderer (http or https)" %}}

Renderer loaded from `http(s)://`, for example a local server serving the files of `dist/renderer/` at its root:

```sh
datadog-ci sourcemaps upload ./dist/renderer \
  --service my-electron-app-renderer \
  --release-version "$VERSION" \
  --minified-path-prefix /
```

{{% /tab %}}
{{< /tabs >}}

## Limitations

Symbols of native extensions (native Node.js modules and addons) are not supported, so frames from these modules are not symbolicated in native crash reports.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/error_tracking/
[2]: /real_user_monitoring/application_monitoring/electron/setup
[3]: /real_user_monitoring/guide/upload-javascript-source-maps/
[4]: /real_user_monitoring/application_monitoring/electron/advanced_configuration#initialization-parameters
[5]: https://github.com/DataDog/datadog-ci
[6]: /real_user_monitoring/application_monitoring/electron/setup/#set-up-renderer-processes
