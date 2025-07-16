---
title: Correlating OpenTelemetry Traces and Logs
description: 'Connect your application logs and OpenTelemetry traces to correlate them in Datadog'
code_lang: opentelemetry
type: multi-code-lang
code_lang_weight: 80
aliases:
  - /tracing/connect_logs_and_traces/opentelemetry
further_reading:
- link: "/opentelemetry/otel_tracing/"
  tag: "Documentation"
  text: "Send OpenTelemetry Traces to Datadog"
- link: "https://opentelemetry.io/docs/collector/"
  tag: "External Site"
  text: "Collector documentation"
- link: "https://www.datadoghq.com/blog/opentelemetry-instrumentation/"
  tag: "Blog"
  text: "Datadog's partnership with OpenTelemetry"
- link: '/logs/guide/ease-troubleshooting-with-cross-product-correlation/'
  tag: 'Guide'
  text: 'Ease troubleshooting with cross product correlation.'
---

## Overview

Correlating traces and logs allows you to investigate issues by navigating from a specific span in a trace directly to the logs that were generated during that operation. This makes debugging faster and more intuitive by providing the exact context needed to understand an error or performance problem.

## Requirements

Before you begin, ensure you have configured [unified service tagging][1]. This is required for all data correlation in Datadog.

## Setup

To correlate OpenTelemetry traces and logs in Datadog, you must:

- **Inject Trace Context**: Your application's logger must be configured to inject the `trace_id` and `span_id` of the active trace into your logs.

- **Use JSON Formatting**: Your logs must be sent in JSON format so Datadog can automatically parse the trace context attributes.

<div class="alert alert-info">For logs collected directly by the Datadog Agent (instead of through the OpenTelemetry Collector), automatic correlation relies on the <code>dd.trace_id</code> attribute.</div>

#### 1. Configure your logging library

The recommended approach is to configure your logging library to automatically inject the standard OpenTelemetry `trace_id` and `span_id` attributes into your logs.

The following examples show how to configure logging instrumentation to automatically inject trace context. For complete, working applications, see the [Datadog OpenTelemetry Examples repository][2].

{{< tabs >}}
{{% tab "Go" %}}

For Go applications using a structured logger such as `zap`, use a bridge such as `otelzap`. This wraps your logger and automatically injects the active `trace_id` and `span_id` into every log message.

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

### 2. Verify the log output

After configuring your logging library, your JSON logs should contain `trace_id` and `span_id` attributes. Datadog uses these to link the log to the exact trace and span that was active when the log was generated.

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

## View correlated data in Datadog

After your application is sending traces, you can navigate between them in Datadog.

### From a trace to logs

1. Navigate to [**APM** > **Traces**][3].
2. Find and click on a trace from your instrumented service.
3. Select any span in the flame graph to view its details.
4. Click the **Logs** tab.

Here, you can see all the logs generated during the execution of that specific span.

### From a log to a trace

1. Navigate to [**Logs** > **Explorer**][4].
2. Find and click a log entry from your instrumented service.
3. Click the **Trace** tab.

Here, you can see a flame graph of the associated trace, with the span that generated the log. 

Click **View Trace in APM** to pivot directly to the full APM trace associated with that log event, allowing you to see the context of the entire request.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/correlate/#prerequisite-unified-service-tagging
[2]: https://github.com/DataDog/opentelemetry-examples
[3]: https://app.datadoghq.com/apm/traces
[4]: https://app.datadoghq.com/logs
