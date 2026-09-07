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

- A browser application configured to collect WASM module metadata with [RUM][2], [Browser Logs][3], or both.
- A `.wasm` symbol file with embedded DWARF debug sections and a `build_id` custom section.
- `@datadog/datadog-ci` version 5.23.0 or later.

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

You can view uploaded files on the [RUM Debug Symbols page][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/guide/upload-javascript-source-maps/
[2]: /real_user_monitoring/application_monitoring/browser/collecting_browser_errors/#enable-webassembly-symbolication
[3]: /logs/log_collection/javascript/#webassembly-errors
[4]: https://app.datadoghq.com/source-code/setup/rum
