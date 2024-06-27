---
title: Enable Dynamic Instrumentation for Python
kind: Documentation
aliases:
    - /tracing/dynamic_instrumentation/enabling/python/
is_beta: false
private: false
code_lang: python
type: multi-code-lang
code_lang_weight: 20
further_reading:
    - link: '/agent/'
      tag: 'Documentation'
      text: 'Getting Started with Datadog Agent'
---

Dynamic Instrumentation is a feature of supporting Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, ensure your Agent and tracing library are on the required version, and go directly to enabling Dynamic Instrumentation in step 4.

## Prerequisites

Recommended, [autocomplete and search (open beta)][6] is enabled.

## Installation

1. Install or upgrade your Agent to version [7.45.0][2] or higher.
2. If you don't already have APM enabled, in your Agent configuration, set the `DD_APM_ENABLED` environment variable to `true` and listening to the port `8126/TCP`.

3. Install `ddtrace`, which provides both tracing and Dynamic Instrumentation:

   ```shell
   pip install ddtrace
   ```

   **Note**: Dynamic Instrumentation is available in the `ddtrace` library version 2.2.0 and higher.

4. Run your service with Dynamic Instrumentation enabled by setting the `DD_DYNAMIC_INSTRUMENTATION_ENABLED` environment variable to `true`. Specify `DD_SERVICE`, `DD_ENV`, and `DD_VERSION` Unified Service Tags so you can filter and group your probes and target active clients across these dimensions.
{{< tabs >}}
{{% tab "Environment variables" %}}

Invoke your service:
```shell
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
ddtrace-run python -m myapp.py
```
{{% /tab %}}
{{% tab "In code" %}}

```python
from ddtrace.debugging import DynamicInstrumentation

DynamicInstrumentation.enable()
```
{{% /tab %}}
{{< /tabs >}}

4. After starting your service with Dynamic Instrumentation enabled, you can start using it on the [APM > Dynamic Instrumentation page][3].

## Configuration

Configure Dynamic Instrumentation using the following environment variables:

| Environment variable                             | Type          | Description                                                                                                               |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `DD_DYNAMIC_INSTRUMENTATION_ENABLED`             | Boolean       | Set to `true` to enable Dynamic Instrumentation.                                                                          |
| `DD_SERVICE`                                     | String        | The [service][4] name, for example, `web-backend`.                                                                        |
| `DD_ENV`                                         | String        | The [environment][4] name, for example: `production`.                                                                     |
| `DD_VERSION`                                     | String        | The [version][4] of your service.                                                                                         |
| `DD_TAGS`                                        | String        | Tags to apply to produced data. Must be a list of `<key>:<value>` separated by commas such as: `layer:api, team:intake`.  |

## What to do next

See [Dynamic Instrumentation][5] for information about setting snapshot and metric probes and browsing and indexing the data.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/trace_collection/
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[3]: https://app.datadoghq.com/dynamic-instrumentation
[4]: /getting_started/tagging/unified_service_tagging
[5]: /dynamic_instrumentation/
[6]: /dynamic_instrumentation/symdb/
