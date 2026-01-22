---
title: Enable Dynamic Instrumentation for Ruby
description: Set up Dynamic Instrumentation for Ruby applications to add probes and capture data without code changes.
aliases:
    - /dynamic_instrumentation/enabling/ruby/
    - /tracing/dynamic_instrumentation/enabling/ruby
private: false
code_lang: ruby
type: multi-code-lang
code_lang_weight: 60
further_reading:
    - link: 'agent'
      tag: 'Documentation'
      text: 'Getting Started with Datadog Agent'
---

{{< partial name="dynamic_instrumentation/beta-callout.html" language="Ruby" limitations_anchor="unsupported-features" >}}

Dynamic Instrumentation is a feature provided by the Datadog tracing library. If you are already using [APM to collect traces][1] for your application, ensure your Agent and tracing library are on the required version. Then, go directly to enabling Dynamic Instrumentation in step 4.

**Note**: Dynamic Instrumentation is supported only for applications running in `production` environment (`RAILS_ENV`, `RACK_ENV`, etc.).

## Installation

1. Install or upgrade your Agent to version [7.49.0][7] or higher.
2. If you don't already have APM enabled, in your Agent configuration, set the `DD_APM_ENABLED` environment variable to `true` and listening to the port `8126/TCP`.
3. Install or upgrade the Ruby tracing library to version 2.9.0 or higher, by following the [relevant instructions][2].
4. Run your service with Dynamic Instrumentation enabled by setting the `DD_DYNAMIC_INSTRUMENTATION_ENABLED` environment variable to `true`. Specify `DD_SERVICE`, `DD_ENV`, and `DD_VERSION` Unified Service Tags so you can filter and group your instrumentations and target active clients across these dimensions.
5. After starting your service with Dynamic Instrumentation enabled, you can start using Dynamic Instrumentation on the [APM > Dynamic Instrumentation page][3].

## Configuration

Configure Dynamic Instrumentation using the following environment variables:

| Environment variable                             | Type          | Description                                                                                                               |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `DD_DYNAMIC_INSTRUMENTATION_ENABLED`             | Boolean       | Set to `true` to enable Dynamic Instrumentation.                                                                          |
| `DD_SERVICE`                                     | String        | The [service][4] name, for example, `web-backend`.                                                                        |
| `DD_ENV`                                         | String        | The [environment][4] name, for example, `production`.                                                                     |
| `DD_VERSION`                                     | String        | The [version][4] of your service.                                                                                         |
| `DD_TAGS`                                        | String        | Tags to apply to produced data. Must be a list of `<key>:<value>` separated by commas such as: `layer:api,team:intake`.   |

## What to do next

See [Dynamic Instrumentation][5] for information about adding instrumentations and browsing and indexing the data.

## Supported features

- [Dynamic Logs][8]
- Capturing of variables for Dynamic Logs attached to a specific file/line
- [PII redaction][10]
- [Source code integration][9]

## Unsupported features

- Dynamic Metrics, Spans, and Span Tags
- Dynamic Log conditions
- Local variable capture for Dynamic Logs attached to a method
- Expression evaluation in Dynamic Log templates
- Instrumenting third-party libraries

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: /tracing/trace_collection/dd_libraries/ruby/
[3]: https://app.datadoghq.com/dynamic-instrumentation
[4]: /getting_started/tagging/unified_service_tagging
[5]: /dynamic_instrumentation/
[7]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[8]: /dynamic_instrumentation/#creating-log-probes
[9]: /integrations/guide/source-code-integration/?tab=ruby
[10]: /dynamic_instrumentation/sensitive-data-scrubbing/#custom-identifier-redaction
