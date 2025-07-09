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

Getting a unified view of your application's performance requires connecting its traces, metrics, logs, user interactions, and more. This guide provides the steps to correlate your OpenTelemetry data in Datadog, allowing you to navigate between all related telemetry in a single view.

## Prerequisite: Unified service tagging

Datadog uses three standard tags to link telemetry together: `env`, `service`, and `version`. To apply these tags, you must configure the corresponding resource attributes in OpenTelemetry.

When using OpenTelemetry, you set these tags by defining a standard set of resource attributes. Datadog automatically maps these attributes to the correct tags.

| OpenTelemetry Resource Attribute | Datadog Tag | Notes                                                                                                   |
|----------------------------------|-------------|---------------------------------------------------------------------------------------------------------|
| `deployment.environment.name`    | `env`       | **Recommended**. Supported in Agent v7.58.0+ and Collector Exporter v0.110.0+.                          |
| `deployment.environment`         | `env`       | Use if you are running an Agent version older than v7.58.0 or a Collector Exporter older than v0.110.0. |
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

## Correlating telemetry

### Traces and metrics

Correlating traces with infrastructure metrics allows you to pivot from a slow request directly to the CPU and memory metrics of the host or container it ran on. This helps you determine if resource contention was the root cause of a performance issue.

Correlation between traces and infrastructure metrics relies on the following resource attributes:

- `host.name`: For correlating with host metrics (CPU, memory, disk).
- `container.id`: For correlating with container metrics.

#### Setup

##### Enable the host metrics receiver

To collect system-level metrics, enable the `hostmetrics` receiver in your OpenTelemetry Collector configuration. This receiver gathers metrics like CPU, memory, disk, and network usage.

```yaml
receivers:
  hostmetrics:
    collection_interval: 30s
    scrapers:
      cpu:
      memory:

processors:
  batch:

exporters:
  datadog: {}

service:
  pipelines:
    metrics:
      receivers: [hostmetrics]
      processors: [batch]
      exporters: [datadog]
```

For detailed setup instructions, see [Host Metrics][2] documentation.

##### Ensure consistent host and container tagging

For correlation to work, the `host.name` (or `container.id`) attribute on your traces must match the corresponding attribute on the metrics collected by the `hostmetrics` receiver. When running the OpenTelemetry Collector as an agent on the host, it typically discovers this information automatically.

### Traces and logs

Correlating traces with logs allows you to jump from a specific span in a trace to the exact logs that were generated during that operation, making debugging faster and more intuitive.

The only requirement for connecting traces and logs is to inject the active `trace_id` and `span_id` from your application's trace context into your logs.

#### Setup

Most OpenTelemetry logging instrumentation can automatically inject the active trace context into your logs. Ensure this feature is enabled for your logging library. For Datadog to parse the attributes correctly, your logs must be sent in JSON format.

For complete example applications, see the [Datadog OpenTelemetry Examples repository][1].

{{< tabs >}}
{{% tab "Go" %}}

For Go applications using a structured logger such as `zap`, the recommended approach is to use a bridge such as **`otelzap`**. This wraps your logger and automatically injects the active `trace_id` and `span_id` into every log message.

First, ensure you have an initialized OpenTelemetry `LoggerProvider`. Then, use it to create your `zap` logger instance:

```go
import "go.opentelemetry.io/contrib/bridges/otelzap"

// Replace your standard zap logger with the otelzap-backed one
logger := zap.New(otelzap.NewCore(
    "my-service-name",
    otelzap.WithLoggerProvider(loggerProvider),
))

// Now, logs written with this logger are automatically correlated
logger.Info("Processing user request")
```

To see how the `LoggerProvider` is configured in a complete application, see the [full Go example in the examples repository][100].

[100]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/golang/calendar/main.go

{{% /tab %}}

{{% tab "Java" %}}

To inject the trace context in Java, you can use the OpenTelemetry Logback Appender. Add the `io.opentelemetry.instrumentation:opentelemetry-logback-appender-1.0` dependency to your project and configure it in your `logback.xml`:

```xml
<configuration>
  <appender name="OpenTelemetry"
      class="io.opentelemetry.instrumentation.logback.appender.v1_0.OpenTelemetryAppender">
    <immediateFlush>true</immediateFlush>
  </appender>

  <root level="INFO">
    <appender-ref ref="OpenTelemetry"/>
  </root>
</configuration>
```

For complete, working example configuration, see the [full Java example in the examples repository][200].

[200]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/resources/logback.xml

{{% /tab %}}
{{< /tabs >}}

#### Verify the log output

After configuration, your JSON logs should contain `trace_id` and `span_id` attributes. Datadog uses these to link the log to the exact trace and span that was active when the log was generated.

Here is an example of a properly formatted JSON log entry:

```json
{
  "timestamp": 1720557413000,
  "level": "INFO",
  "message": "Processing user request",
  "service": "my-service",
  "env": "production",
  "version": "1.2.3",
  "trace_id": "8738839999436033394",
  "span_id": "1006654203791334032"
}
```

<div class="alert alert-info">For complete, working examples of trace and log correlation for various languages, see the <a href="https://github.com/DataDog/opentelemetry-examples" target="_blank">Datadog OpenTelemetry Examples repository</a>.</div>

## Correlating with Datadog products

### Real User Monitoring (RUM)

Correlating RUM and APM allows you to follow a user's journey from a slow button click on your website all the way to the specific backend database query that caused the delay.

This correlation is achieved by configuring the RUM SDK to inject trace context headers into requests made to your backend. The default injection style includes `tracecontext` and `datadog` headers.

{{< tabs >}}
{{% tab "Browser" %}}

After completing the standard Browser RUM setup, modify `allowedTracingUrls` in your RUM SDK initialization to specify which propagator to use for each backend endpoint.

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
    // ...otherConfig,
    allowedTracingUrls: [
      { match: "https://api.example.com", propagatorTypes: ["tracecontext"] }
    ]
})
```

`propagatorTypes` accepts a list of desired propagators: `datadog`, `tracecontext`, `b3`, and `b3multi`.

{{% /tab %}}
{{% tab "iOS" %}}

After completing the standard [iOS RUM setup][200], use `.traceWithHeaders(hostsWithHeaders:sampleRate:)` to specify which tracing headers to inject for requests to your backend hosts.

```swift
RUM.enable(
    with: RUM.Configuration(
        applicationID: "<rum application id>",
        urlSessionTracking: .init(
            firstPartyHostsTracing: .traceWithHeaders(
                hostsWithHeaders: [
                    "api.example.com": [.tracecontext]
                ],
                sampleRate: 100
            )
        )
    )
)
```

`TracingHeaderType` is an enum that includes `.datadog`, `.tracecontext`, `.b3`, and `.b3multi`.

[200]: /real_user_monitoring/ios/

{{% /tab %}}
{{% tab "Android" %}}

After completing the standard [Android RUM setup][300], configure your `OkHttpClient` interceptor with a map of your backend hosts and the desired `TracingHeaderType` for each.

```kotlin
val tracedHosts = mapOf(
    "example.com" to setOf(TracingHeaderType.TRACECONTEXT),
    "example.eu" to setOf(TracingHeaderType.DATADOG)
)

val okHttpClient = OkHttpClient.Builder()
    .addInterceptor(DatadogInterceptor.Builder(tracedHosts).build())
    .addNetworkInterceptor(TracingInterceptor.Builder(tracedHosts).build())
    .eventListenerFactory(DatadogEventListener.Factory())
    .build()
```

`TracingHeaderType` is an enum that includes `.DATADOG`, `.TRACECONTEXT`, `.B3`, and `.B3MULTI`.

[300]: /real_user_monitoring/android/

{{% /tab %}}
{{< /tabs >}}

For **React Native**, **Flutter**, and **Kotlin Multiplatform**, see the platform-specific RUM documentation for configuring `firstPartyHosts`, `firstPartyHostsWithTracingHeaders`, or the `datadogKtorPlugin` respectively:

- [React Native RUM Documentation][3]
- [Flutter RUM Documentation][4]
- [Kotlin Multiplatform RUM Documentation][5]

### Database Monitoring (DBM)

Correlate backend traces to detailed database performance data in Datadog, including query metrics and execution plans, to identify the exact queries that are slowing down your application.

#### Step 1: Instrument your database spans

For DBM correlation to work, your database spans must include the following attributes.

| Attribute      | Description                                                                           | Example                            |
|----------------|---------------------------------------------------------------------------------------|------------------------------------|
| `db.system`    | **Required.** The database technology, such as `postgres`, `mysql`, or `sqlserver`.   | `postgres`                         |
| `db.statement` | **Required.** The raw SQL query text. This is used for obfuscation and normalization. | `SELECT * FROM users WHERE id = ?` |
| `db.name`      | The logical database or schema name being queried.                                    | `user_accounts`                    |
| `span.type`    | **Required (Datadog-specific).** The type of span. Must be `sql`.                     | `sql`                              |

#### Step 2: Configure your ingest path

Depending on how you send traces to Datadog, you may need to enable specific feature gates to ensure database spans are processed correctly.

{{< tabs >}}
{{% tab "Datadog Agent (DDOT Collector)" %}}


If you are using the Datadog Helm chart (v3.107.0 or later), set the feature gate in your `values.yaml`:

```yaml
datadog:
  otelCollector:
    featureGates: datadog.EnableOperationAndResourceNameV2
```

{{% /tab %}}
{{% tab "OTel Collector" %}}

When starting the Collector, enable the `datadog.EnableOperationAndResourceNameV2` feature gate. This is available in Collector v0.118.0 and later.

```bash
otelcontribcol --config=config.yaml \
--feature-gates=datadog.EnableOperationAndResourceNameV2
```

{{% /tab %}}

{{% tab "Datadog Agent (OTLP Ingest)" %}}

In your Datadog Agent configuration, ensure the `DD_APM_FEATURES` environment variable includes `enable_operation_and_resource_name_logic_v2`.

{{% /tab %}}

{{< /tabs >}}

## What's next?

Now that your telemetry is correlated, you can explore the unified views in Datadog:

- **Service Catalog**: View the health of all your services in one place.
- **Trace Explorer**: Search and analyze individual requests as they travel across your services.
- **Log Explorer**: Search and filter all your logs, and pivot to related traces.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/opentelemetry-examples
[2]: /opentelemetry/integrations/host_metrics/
[3]: /real_user_monitoring/reactnative/
[4]: /real_user_monitoring/mobile_and_tv_monitoring/flutter/
[5]: /real_user_monitoring/mobile_and_tv_monitoring/kotlin_multiplatform/