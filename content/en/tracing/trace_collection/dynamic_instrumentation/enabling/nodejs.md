---
title: Enable Dynamic Instrumentation for Node.js
description: Set up Dynamic Instrumentation for Node.js applications to add probes and capture data without code changes.
private: false
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 40
aliases:
    - /dynamic_instrumentation/enabling/nodejs
    - /tracing/dynamic_instrumentation/enabling/nodejs
further_reading:
    - link: 'agent'
      tag: 'Documentation'
      text: 'Getting Started with Datadog Agent'
---

Dynamic Instrumentation is a feature of the Datadog tracing library. If you already have [APM][1] set up and your Agent and tracing library meet the [prerequisites](#prerequisites), go directly to enabling Dynamic Instrumentation.

## Prerequisites

Before you begin, review the [Dynamic Instrumentation prerequisites][15]. Node.js applications also require:

- Tracing library [`dd-trace-js`][16] version 5.48.0 or higher. See the [installation instructions][2] for setup details.

## Installation

1. If you don't already have APM enabled, in your Agent configuration, set the `DD_APM_ENABLED` environment variable to `true` and listening to the port `8126/TCP`.
2. If your source code is transpiled during deployment (for example, if using TypeScript), ensure that source maps are published along with the deployed Node.js application.
3. Run your service with Dynamic Instrumentation enabled by setting the `DD_DYNAMIC_INSTRUMENTATION_ENABLED` environment variable to `true`. Specify `DD_SERVICE`, `DD_ENV`, and `DD_VERSION` Unified Service Tags so you can filter and group your instrumentations and target active clients across these dimensions.
4. After starting your service with Dynamic Instrumentation enabled, you can start using Dynamic Instrumentation on the [APM > Dynamic Instrumentation page][3].

## Configuration

Configure Dynamic Instrumentation using the following environment variables:

| Environment variable                             | Type          | Description                                                                                                               |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `DD_DYNAMIC_INSTRUMENTATION_ENABLED`             | Boolean       | Set to `true` to enable Dynamic Instrumentation.                                                                          |
| `DD_SERVICE`                                     | String        | The [service][5] name, for example, `web-backend`.                                                                        |
| `DD_ENV`                                         | String        | The [environment][5] name, for example, `production`.                                                                     |
| `DD_VERSION`                                     | String        | The [version][5] of your service.                                                                                         |
| `DD_TAGS`                                        | String        | Tags to apply to produced data. Must be a list of `<key>:<value>` separated by commas such as: `layer:api,team:intake`.   |

## Source map support

If the source code of your Node.js application is transpiled or bundled,
you need to generate and publish the source maps along with the code, either inline or as separate files.

* **TypeScript**: Set either [`inlineSourceMap`][10] or [`sourceMap`][11] to `true` in the TypeScript config file.
* **Babel**: Configure the [`sourceMaps`][12] option in the Babel config file (see also the special `--source-maps` CLI option, used to generate separate source map files).
* **Webpack**: Configure the [`devtools`][13] option in the Webpack config file.
* **CoffeeScript**: Use either `--inline-map` or `--map` as arguments to the [`coffee`][14] CLI.

**Note:** For better runtime performance, it's recommended *not* to include the original source code in the source maps.

## What to do next

See [Dynamic Instrumentation][4] for information about adding instrumentations and browsing and indexing the data.

## Limitations

The following limitations apply to the Node.js implementation:

### Supported features

- [Dynamic Logs][7] attached to a specific file/line
- Capturing of variables for Dynamic Logs
- [PII redaction][8] based on variable/property names
- [Source code integration][9] (including source map support)

### Unsupported features

- Dynamic Metrics, Spans, and Span Tags
- Dynamic Logs attached to a function/method
- PII redaction based on specific classes or types

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: /tracing/trace_collection/dd_libraries/nodejs/
[3]: https://app.datadoghq.com/dynamic-instrumentation
[4]: /dynamic_instrumentation/
[5]: /getting_started/tagging/unified_service_tagging
[7]: /dynamic_instrumentation/#creating-log-probes
[8]: /dynamic_instrumentation/sensitive-data-scrubbing/#custom-identifier-redaction
[9]: /integrations/guide/source-code-integration/?tab=nodejs#embed-git-information-in-your-build-artifacts
[10]: https://www.typescriptlang.org/tsconfig/#inlineSourceMap
[11]: https://www.typescriptlang.org/tsconfig/#sourceMap
[12]: https://babeljs.io/docs/options#sourcemaps
[13]: https://webpack.js.org/configuration/devtool/
[14]: https://coffeescript.org/#usage
[15]: /dynamic_instrumentation/#prerequisites
[16]: https://github.com/DataDog/dd-trace-js
