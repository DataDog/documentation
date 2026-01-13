---
title: Enable Dynamic Instrumentation for Go
description: Set up Dynamic Instrumentation for Go applications to add probes and capture data without code changes.
private: false
code_lang: go
type: multi-code-lang
code_lang_weight: 50
aliases:
    - /dynamic_instrumentation/enabling/go
further_reading:
    - link: 'agent'
      tag: 'Documentation'
      text: 'Getting Started with Datadog Agent'
---

{{< beta-callout-private url="https://www.datadoghq.com/product-preview/live-debugger/" >}}
    Dynamic Instrumentation for Go is in limited preview and is not available to all customers.
    Request access to join the waiting list.<br>
    **Note**: <a href="#unsupported-features">Some limitations</a> apply to the preview.
{{< /beta-callout-private >}}

Dynamic Instrumentation is a feature provided by the Datadog tracing library.

## Installation

To use Dynamic Instrumentation, you must enable it in both the Datadog Agent and your application.

### Datadog Agent

1. Install or upgrade your Agent to version [7.73.0][6] or higher.
2. Enable Dynamic Instrumentation in the Agent configuration using one of the following methods, depending on how you deploy the Agent:

{{< tabs >}}
{{% tab "Configuration YAML file" %}}
Update your `system-probe.yaml` file with the following. This file should be located along `datadog.yaml`, see [agent configuration][101] for location details.
```yaml
dynamic_instrumentation:
  enabled: true
```

{{% /tab %}}
{{% tab "Environment variable" %}}
Add the following to your Datadog Agent manifest:
```yaml
DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
```

{{% /tab %}}
{{% tab "Helm" %}}
Add the following to your Helm chart:
```yaml
datadog:
  dynamicInstrumentationGo:
    enabled: true
```

{{% /tab %}}
{{< /tabs >}}

### Application (tracing library)

1. Install or upgrade the Go tracing library to version >=1.74.6 or >=2.2.3, by following the [relevant instructions][2].
2. Run your service with Dynamic Instrumentation enabled by setting the following environment variable:

   ```
   DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
   ```

3. Configure Unified Service Tags so that you can filter and group your instrumentations and target active clients across these dimensions:
   - `DD_SERVICE`
   - `DD_ENV`
   - `DD_VERSION`
4. Restart your service.
5. After the service starts, you can add and manage instrumentations from the [**APM** > **Live Debugger**][3] page.

## Configuration

Configure Dynamic Instrumentation using the following environment variables:

| Environment variable                             | Type          | Description                                                                                                               |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `DD_DYNAMIC_INSTRUMENTATION_ENABLED`             | Boolean       | Set to `true` to enable Dynamic Instrumentation.                                                                          |
| `DD_SERVICE`                                     | String        | The [service][5] name. For example: `web-backend`.                                                                        |
| `DD_ENV`                                         | String        | The [environment][5] name. for example: `production`.                                                                     |
| `DD_VERSION`                                     | String        | The [version][5] of your service.                                                                                         |

## What to do next

See [Live Debugger][4] for information about adding instrumentations, capturing application state, and browsing and indexing the collected data.

## Supported features

- Adding probes for method calls, returns, and specific code lines
- Symbol search for probe location selection
- Capturing variables and return values available at the selected probe location
- [Sensitive data redaction][7]
- [Source code integration][8]

## Unsupported features

- Dynamic Instrumentation for logs, metrics, spans, and span tag probes
- Log templates and condition expressions
- PII redaction based on specific classes or types
- Propagation of additional `DD_TAGS` set on the service to probe result tags

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /tracing/trace_collection/dd_libraries/go/
[3]: https://app.datadoghq.com/debugging
[4]: /tracing/live_debugger/
[5]: /getting_started/tagging/unified_service_tagging
[6]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[7]: /dynamic_instrumentation/sensitive-data-scrubbing/#redact-based-on-variable-values-with-sensitive-data-scanner
[8]: /integrations/guide/source-code-integration/?tab=go#embed-git-information-in-your-build-artifacts
