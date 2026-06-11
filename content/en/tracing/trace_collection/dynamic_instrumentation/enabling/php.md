---
title: Enable Dynamic Instrumentation for PHP
description: Set up Dynamic Instrumentation for PHP applications to add probes and capture data without code changes.
aliases:
    - /dynamic_instrumentation/enabling/php/
    - /tracing/dynamic_instrumentation/enabling/php
private: false
code_lang: php
type: multi-code-lang
code_lang_weight: 60
further_reading:
    - link: 'agent'
      tag: 'Documentation'
      text: 'Getting Started with Datadog Agent'
---

{{< partial name="dynamic_instrumentation/beta-callout.html" language="PHP" limitations_anchor="unsupported-features" >}}

Dynamic Instrumentation is a feature of the Datadog SDK that lets you add instrumentation to your application at runtime without code changes or redeployments. Follow these instructions to set up Dynamic Instrumentation for PHP.

## Prerequisites

Before you begin, review the [Dynamic Instrumentation prerequisites][10]. PHP applications also require:

- Tracing library [`dd-trace-php`][11] version 1.5.0 or higher. See the [installation instructions][2] for setup details.

## Installation

1. If you don't already have APM enabled, in your Agent configuration, set the `DD_APM_ENABLED` environment variable to `true` and listening to the port `8126/TCP`.
2. Run your service with Dynamic Instrumentation enabled by setting the `DD_DYNAMIC_INSTRUMENTATION_ENABLED` environment variable to `true`. Specify `DD_SERVICE`, `DD_ENV`, and `DD_VERSION` Unified Service Tags so you can filter and group your instrumentations and target active clients across these dimensions.
3. After starting your service with Dynamic Instrumentation enabled, you can start using Dynamic Instrumentation on the [APM > Dynamic Instrumentation page][3].

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


## Limitations

### Supported features

- Dynamic Logs, Metrics, Spans, and Span Tags
- Local variable capture for Dynamic Logs
- Dynamic Log conditions
- Expression evaluation in Dynamic Log templates
- [PII redaction][8] based on variable/property names and classes
- [Source code integration][9]

### Unsupported features

- Instrumentation attached to a specific file/line

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /tracing/trace_collection/dd_libraries/php/
[3]: https://app.datadoghq.com/dynamic-instrumentation
[4]: /getting_started/tagging/unified_service_tagging
[5]: /dynamic_instrumentation/
[8]: /dynamic_instrumentation/sensitive-data-scrubbing/#custom-identifier-redaction
[9]: /integrations/guide/source-code-integration/?tab=php
[10]: /dynamic_instrumentation/#prerequisites
[11]: https://github.com/DataDog/dd-trace-php
