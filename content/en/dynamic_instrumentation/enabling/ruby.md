---
title: Enable Dynamic Instrumentation for Ruby
aliases:
    - /tracing/dynamic_instrumentation/enabling/ruby/
private: true
code_lang: ruby
type: multi-code-lang
code_lang_weight: 30
further_reading:
    - link: 'agent'
      tag: 'Documentation'
      text: 'Getting Started with Datadog Agent'
---

Dynamic Instrumentation is a feature of supporting Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, ensure your Agent and tracing library are on the required version, and go directly to enabling Dynamic Instrumentation in step 4.

## Installation

1. Install or upgrade your Agent to version [7.45.0][7] or higher.
2. If you don't already have APM enabled, in your Agent configuration, set the `DD_APM_ENABLED` environment variable to `true` and listening to the port `8126/TCP`.
3. Install or upgrade the Ruby tracing library to version 2.8.0 or higher, by following the [relevant instructions][2].

   **Note**: Dynamic Instrumentation is available in the `dd-trace-ruby` library in versions 2.8.0 and later. Only log probes are currently supported.

4. Run your service with Dynamic Instrumentation enabled by setting the `DD_DYNAMIC_INSTRUMENTATION_ENABLED` environment variable to `true`. Specify `DD_SERVICE`, `DD_ENV`, and `DD_VERSION` Unified Service Tags so you can filter and group your probes and target active clients across these dimensions.
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

See [Dynamic Instrumentation][5] for information about setting snapshot and metric probes and browsing and indexing the data.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: /tracing/trace_collection/dd_libraries/ruby/
[3]: https://app.datadoghq.com/dynamic-instrumentation
[4]: /getting_started/tagging/unified_service_tagging
[5]: /dynamic_instrumentation/
[7]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
