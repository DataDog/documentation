---
title: Upload WebAssembly Symbols
description: "Upload WebAssembly debug symbols to make WASM stack traces collected from browser applications readable."
further_reading:
- link: '/error_tracking/frontend/browser'
  tag: 'Documentation'
  text: 'Set up Browser Error Tracking'
- link: '/real_user_monitoring/guide/upload-javascript-source-maps'
  tag: 'Documentation'
  text: 'Upload JavaScript source maps'
- link: '/real_user_monitoring/guide/debug-symbols'
  tag: 'Documentation'
  text: 'Investigate obfuscated stack traces with RUM Debug Symbols'
- link: 'https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/wasm-symbols'
  tag: 'Source Code'
  text: 'WebAssembly symbols command reference'
---

## Overview

WebAssembly (WASM) runs as part of a browser application. It is not a separate Datadog application type. The Datadog Browser SDK collects WASM errors with the surrounding browser context, and Datadog Error Tracking can symbolicate their WASM stack frames with uploaded DWARF debug information.

A single error can contain both JavaScript and WASM frames. Upload [JavaScript source maps][1] for the JavaScript frames and WASM symbols for the WASM frames.

<div class="alert alert-warning">WebAssembly symbolication is in beta. The Browser SDK plugin and the <code>datadog-ci wasm-symbols upload</code> command are experimental and may change.</div>

## Prerequisites

You need:

- A browser application configured for [RUM][2], [Browser Logs][3], or both.
- Matching versions of `@datadog/browser-plugin-wasm` and the Browser RUM or Logs SDK package where you register it.
- A `.wasm` symbol file with embedded DWARF debug sections and a `build_id` custom section.
- `@datadog/datadog-ci` version 5.23.0 or later.

## Instrument your browser application

Install the WASM plugin alongside the Browser SDK packages that your application uses. Keep all Browser SDK packages on the same version:

```shell
npm install --save-exact \
  @datadog/browser-rum@<VERSION> \
  @datadog/browser-logs@<VERSION> \
  @datadog/browser-plugin-wasm@<VERSION>
```

Register a plugin instance when you initialize RUM, Browser Logs, or both:

```javascript
import { datadogLogs } from '@datadog/browser-logs';
import { makeWasmPlugin } from '@datadog/browser-plugin-wasm';
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  applicationId: '<APPLICATION_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  service: '<SERVICE>',
  env: '<ENV>',
  version: '<VERSION>',
  plugins: [makeWasmPlugin()],
});

datadogLogs.init({
  clientToken: '<CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  service: '<SERVICE>',
  env: '<ENV>',
  version: '<VERSION>',
  forwardErrorsToLogs: true,
  plugins: [makeWasmPlugin()],
});
```

Initialize the Browser SDK before loading any WASM modules. The plugin observes modules created with the browser's `WebAssembly` APIs and adds their URLs and build IDs to WASM error events. Modules loaded before the plugin is initialized cannot be associated with their build IDs.

The plugin enriches errors that have a WASM frame in their stack trace. When you report a handled error manually, pass the `Error` object to RUM or as the third argument to the Logs logger:

```javascript
try {
  callWasmFunction();
} catch (error) {
  datadogRum.addError(error);
  datadogLogs.logger.error('WASM operation failed', {}, error);
}
```

## Generate debug symbols

Configure your WASM toolchain to generate:

- Embedded DWARF sections such as `.debug_info` and `.debug_line`.
- A `build_id` custom section. The build ID in the uploaded symbol file must match the build ID in the module loaded by the browser.

For example, with Emscripten:

```shell
emcc -g -Wl,--build-id <SOURCES> -o <OUTPUT>.js
```

You can inspect the generated module with `wasm-objdump`:

```shell
wasm-objdump -h <OUTPUT>.wasm
wasm-objdump -j build_id -x <OUTPUT>.wasm
```

Keep the symbol file as a build artifact so you can upload it from your CI pipeline.

## Upload your symbols

Install the Datadog CLI and configure your Datadog API key and site:

```shell
npm install --save-dev @datadog/datadog-ci@latest
export DATADOG_API_KEY=<DATADOG_API_KEY>
export DATADOG_SITE={{< region-param key="dd_site" >}}
```

Enable beta commands and upload either one `.wasm` file or a directory. When given a directory, the CLI searches it recursively for `.wasm` files:

```shell
DD_BETA_COMMANDS_ENABLED=1 datadog-ci wasm-symbols upload /path/to/build
```

The command skips files that do not contain both embedded DWARF information and a `build_id` custom section. Use `--dry-run` to validate symbol files without uploading them:

```shell
DD_BETA_COMMANDS_ENABLED=1 datadog-ci wasm-symbols upload /path/to/build --dry-run
```

By default, Datadog keeps the first symbol file uploaded for a build ID. Use `--replace-existing` when you intentionally need to replace it.

<div class="alert alert-info">The uploader does not resolve an <code>external_debug_info</code> reference. A runtime module that contains only this reference is skipped. Upload a symbol file that contains embedded DWARF sections and the same <code>build_id</code> as the runtime module.</div>

## How symbols are matched

Datadog uses the module URL metadata to associate each WASM stack frame with a module, then matches the module to its uploaded symbols by `build_id`. Unlike JavaScript source maps, `service` and `version` are not part of the WASM symbol lookup.

The Browser SDK plugin records metadata for WASM modules loaded after initialization. This lets Datadog select the correct build ID when a page loads multiple modules. For a module instantiated directly from bytes, the plugin records a synthetic module URL so its build ID remains available for symbolication.

You can view uploaded files on the [RUM Debug Symbols page][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/guide/upload-javascript-source-maps/
[2]: /real_user_monitoring/application_monitoring/browser/setup/
[3]: /logs/log_collection/javascript/
[4]: https://app.datadoghq.com/source-code/setup/rum
