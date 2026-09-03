---
title: Correlate OpenTelemetry Data
description: Learn how to correlate your OpenTelemetry traces, metrics, logs, and other telemetry in Datadog to get a unified view of your application's performance.
aliases:
  - /opentelemetry/otel_logs/
further_reading:
- link: "https://www.datadoghq.com/blog/opentelemetry-instrumentation/"
  tag: "Blog"
  text: "Datadog's partnership with OpenTelemetry"
---

## Overview

Getting a unified view of your application's performance requires connecting its traces, metrics, logs, user interactions, and more. By correlating your OpenTelemetry data in Datadog, you can navigate between all related telemetry in a single view, allowing you to diagnose and resolve issues faster.


## Prerequisite: Unified service tagging

Datadog uses three standard tags to link telemetry together: `env`, `service`, and `version`.

To ensure your OpenTelemetry data is properly correlated, you must configure your application or system to use these tags by setting a standard set of OpenTelemetry resource attributes. Datadog automatically maps these attributes to the correct tags.

| OpenTelemetry Resource Attribute | Datadog Tag | Notes                                                                                                   |
|----------------------------------|-------------|---------------------------------------------------------------------------------------------------------|
| `deployment.environment.name`    | `env`       | **Recommended**. Supported in Agent v7.58.0+ and Collector Exporter v0.110.0+.                          |
| `deployment.environment`         | `env`       | Use instead of `deployment.environment.name` if you are running an Agent version older than v7.58.0 or a Collector Exporter older than v0.110.0. |
| `service.name`                   | `service`   |                                                                                                         |
| `service.version`                | `version`   |                                                                                                         |

You can set these attributes in your application's environment variables, SDK, or in the OpenTelemetry Collector.

{{< tabs >}}
{{% tab "Environment Variables" %}}

Set the `OTEL_RESOURCE_ATTRIBUTES` environment variable with your service's information:

```sh
export OTEL_SERVICE_NAME="my-service"
export OTEL_RESOURCE_ATTRIBUTES="deployment.environment.name=production,service.version=1.2.3"
```

{{% /tab %}}
{{% tab "SDK" %}}

Create a Resource with the required attributes and associate it with your TracerProvider in your application code.

Here's an example using the OpenTelemetry SDK for Python:

```python
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider

resource = Resource(attributes={
    "service.name": "<SERVICE>",
    "deployment.environment.name": "<ENV>",
    "service.version": "<VERSION>"
})
tracer_provider = TracerProvider(resource=resource)
```

{{% /tab %}}
{{% tab "Collector" %}}

Use the `resource` processor in your Collector configuration to set the resource attributes on your telemetry data:

```yaml
processors:
  resource:
    attributes:
      - key: service.name
        value: "my-service"
        action: upsert
      - key: deployment.environment.name
        value: "production"
        action: upsert
      - key: service.version
        value: "1.2.3"
        action: upsert
...
```

{{% /tab %}}
{{< /tabs >}}

## Correlate telemetry

After unified service tagging is configured, you can connect your various telemetry streams. Select a guide below for platform-specific instructions.

- [Correlate logs and traces][1]
- [Correlate metrics and traces][2]
- [Correlate RUM and traces][3]
- [Correlate DBM and traces][4]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/correlate/logs_and_traces
[2]: /opentelemetry/correlate/metrics_and_traces
[3]: /opentelemetry/correlate/rum_and_traces
[4]: /opentelemetry/correlate/dbm_and_traces
