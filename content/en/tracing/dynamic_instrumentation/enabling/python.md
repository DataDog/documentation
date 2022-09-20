---
title: Enable Dynamic Instrumentation for Python
kind: Documentation
is_beta: true
private: true
code_lang: python
type: multi-code-lang
code_lang_weight: 20
further_reading:
    - link: 'agent'
      tag: 'Documentation'
      text: 'Getting Started with Datadog Agent'
---

Dynamic Instrumentation is shipped within Datadog tracing libraries. If you
are already using [APM to collect traces][1] for your application, you can skip
installing the library and go directly to enabling Dynamic Instrumentation in
step 3.

## Requirements

Datadog Agent has to be running in your infrastructure and must be at least
version [7.39.0][2]+ and must have Remote Configuration enabled.

## Installation

1. If you are already using Datadog, upgrade your Agent to version
   [7.39.0][2]+. If you don't have APM enabled to set up your application to
   send data to Datadog, in your Agent, set the `DD_APM_ENABLED` environment
   variable to `true` and listening to the port `8126/TCP`.

2. Install `ddtrace`, which provides both tracing and Dynamic Instrumentation
   functionalities:

   ```shell
   pip install ddtrace
   ```

   **Note**: Dynamic Instrumentation is available in the `ddtrace` library from
   version >=1.5.

3. Enable Dynamic Instrumentation by the `DD_DYNAMIC_INSTRUMENTATION_ENABLED`
   environment variable to `true`. Specify `DD_SERVICE`, `DD_ENV`, and
   `DD_VERSION` so you can filter and group your probes and target active
   clients across these dimensions:
{{< tabs >}}
{{% tab "Environment Variables" %}}

Invoke your service:
```shell
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
ddtrace-run python -m myapp.py
```
{{% /tab %}}
{{% tab "Programmatic" %}}

```python
from ddtrace.debugging import DynamicInstrumentation

DynamicInstrumentation.enable()
```
{{% /tab %}}
{{< /tabs >}}

4. After starting your service with Dynamic Instrumentation enabled, you can
   start using it on the [Datadog APM > Dynamic Instrumentation service
   page](https://app.datadoghq.com/dynamic-instrumentation).

You can configure Dynamic Instrumentation using the following environment
variables:

| Environment variable                             | Type          | Description                                                                                                               |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `DD_DYNAMIC_INSTRUMENTATION_ENABLED`             | Boolean       | Set to `true` to enable Dynamic Instrumentation.                                                                          |
| `DD_SERVICE`                                     | String        | The [service][5] name, for example, `web-backend`.                                                                        |
| `DD_ENV`                                         | String        | The [environment][5] name, for example: `production`.                                                                     |
| `DD_VERSION`                                     | String        | The [version][5] of your service.                                                                                         |
| `DD_TAGS`                                        | String        | Tags to apply to produced data. Must be a list of `<key>:<value>` separated by commas such as: `layer:api, team:intake`.  |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: https://app.datadoghq.com/account/settings#agent/overview
