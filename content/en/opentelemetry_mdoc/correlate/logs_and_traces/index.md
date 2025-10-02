---
title: Correlate OpenTelemetry Traces and Logs
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Correlate OpenTelemetry Data > Correlate
  OpenTelemetry Traces and Logs
sourceUrl: https://docs.datadoghq.com/opentelemetry/correlate/logs_and_traces/index.html
---

# Correlate OpenTelemetry Traces and Logs

## Overview{% #overview %}

Correlating traces and logs allows you to investigate issues by navigating from a specific span in a trace directly to the logs that were generated during that operation. This makes debugging faster and more intuitive by providing the exact context needed to understand an error or performance problem.

## Requirements{% #requirements %}

Before you begin, ensure you have configured [unified service tagging](https://docs.datadoghq.com/opentelemetry/correlate/#prerequisite-unified-service-tagging). This is required for all data correlation in Datadog.

## Setup{% #setup %}

To correlate OpenTelemetry traces and logs in Datadog, you must:

- **Inject Trace Context**: Your application's logger must be configured to enrich your logs with the `trace_id` and `span_id` from the active trace. The recommended approach is to use an OpenTelemetry-aware logging library or appender. These tools automatically capture the active trace context and embed the `trace_id` and `span_id` as top-level fields in your log records, which is the standard method for correlation.

- **Send Logs to Datadog**: Your logs, enriched with trace context, must be collected and sent to Datadog.

#### 1. Inject trace context into your logs

The following examples for Go and Java use logging bridges. These bridges intercept logs from common logging libraries (such as `zap` and `Logback`), convert them into the OpenTelemetry log data model, and forward them to the OpenTelemetry SDK. This process automatically enriches the logs with the active trace context.

For complete, working applications, see the [Datadog OpenTelemetry Examples repository](https://github.com/DataDog/opentelemetry-examples).

{% tab title="Go" %}
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

To see how the `LoggerProvider` is configured in a complete application, see the [full Go example in the examples repository](https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/golang/calendar/main.go).
{% /tab %}

{% tab title="Java" %}
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

For complete, working example configuration, see the [full Java example in the examples repository](https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/resources/logback.xml).
{% /tab %}

### 2. Choose your log pipeline

Once your logs are instrumented with trace context, you need to send them to Datadog. The simplest approach is to send them directly from your application to the OpenTelemetry Collector using OTLP. However, you can also scrape logs from files or collect logs using the Datadog Agent.

#### Send logs using OTLP{% #send-logs-using-otlp %}

This is the simplest and most direct method. Your application sends logs directly to an OTLP endpoint, avoiding the complexity of writing to and parsing local files.

The OpenTelemetry Collector and the Datadog Agent can both receive OTLP logs.

1. **Configure your Application to Export Logs using OTLP**: In your OpenTelemetry SDK setup, configure a `LogRecordProcessor` to use an `OTLPLogExporter`. The following example shows how to do this in Python:
   ```python
   # In your OTel SDK setup for Python
   import logging
   from opentelemetry.sdk._logs import LoggerProvider, LoggingHandler
   from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
   from opentelemetry.exporter.otlp.proto.grpc._log_exporter import OTLPLogExporter
   
   # Configure the OTLP Log Exporter to send to your Collector
   # Note: The endpoint should point to your OpenTelemetry Collector.
   # The default port is 4317 for gRPC and 4318 for HTTP.
   exporter = OTLPLogExporter(endpoint="localhost:4317", insecure=True)
   
   log_provider = LoggerProvider()
   log_provider.add_log_record_processor(BatchLogRecordProcessor(exporter))
   
   # Attach to the root logger
   handler = LoggingHandler(logger_provider=log_provider)
   logging.getLogger().addHandler(handler)
   ```
1. **Configure the Collector to Receive OTLP Logs**: In your Collector's `config.yaml`, enable the `otlp` receiver and add it to your `logs` pipeline:
   ```yaml
   receivers:
     otlp:
       protocols:
         grpc:
         http:
   
   exporters:
     datadog:
       # ... your datadog exporter config
   
   service:
     pipelines:
       logs:
         receivers: [otlp]
         processors: [batch]
         exporters: [datadog]
   ```

#### Scrape logs from files{% #scrape-logs-from-files %}

This approach is useful if you have a requirement to keep local log files for compliance or other tooling.

For Datadog to correlate your logs and traces, your JSON log files must contain specific fields formatted correctly:

- `trace_id`: The ID of the trace. It must be a 32-character lowercase hexadecimal string.
- `span_id`: The ID of the span. It must be a 16-character lowercase hexadecimal string.

The OpenTelemetry SDK typically provides these in a raw format (such as an integer or byte array), which must be formatted into hexadecimal strings without any `0x` prefix.

1. **Configure your Application to Output JSON Logs**: Use a standard logging library to write logs as JSON to a file or `stdout`. The following Python example uses the standard `logging` library.

1. **Manually Inject Trace Context**: In your application code, retrieve the current span context and add the `trace_id` and `span_id` to your log records. The following Python example shows how to create a custom logging.Filter to do this automatically:

   ```python
   import logging
   import sys
   from opentelemetry import trace
   from pythonjsonlogger import jsonlogger
   
   # 1. Create a filter to inject trace context
   class TraceContextFilter(logging.Filter):
       def filter(self, record):
           span = trace.get_current_span()
           if span.is_recording():
               span_context = span.get_span_context()
               record.trace_id = f'{span_context.trace_id:032x}'
               record.span_id = f'{span_context.span_id:016x}'
           return True
   
   # 2. Configure a JSON logger
   logger = logging.getLogger("my-json-logger")
   logger.setLevel(logging.DEBUG)
   
   # 3. Add the filter to the logger
   logger.addFilter(TraceContextFilter())
   
   handler = logging.StreamHandler(sys.stdout)
   formatter = jsonlogger.JsonFormatter(
       '%(asctime)s %(name)s %(levelname)s %(message)s %(trace_id)s %(span_id)s'
   )
   handler.setFormatter(formatter)
   logger.addHandler(handler)
   
   # Logs will now contain the trace_id and span_id
   logger.info("Processing user request with trace context.")
   ```

1. **Configure the Collector to Scrape Log Files**: In your Collector's `config.yaml`, enable the `filelog` receiver. Configure it to find your log files and parse them as JSON.

   ```yaml
   receivers:
     filelog:
       include: [ /var/log/my-app/*.log ] # Path to your log files
       operators:
         - type: json_parser
           # The timestamp and severity fields should match your JSON output
           timestamp:
             parse_from: attributes.asctime 
             layout: '%Y-%m-%d %H:%M:%S,%f'
           severity:
             parse_from: attributes.levelname
   # ... your logs pipeline ...
   ```

This manual approach gives you full control over the log format, ensuring it is clean and easily parsable by the Collector or Datadog Agent.

#### Collect logs using the Datadog Agent{% #collect-logs-using-the-datadog-agent %}

If you collect logs directly with the Datadog Agent (without sending them through the OpenTelemetry Collector), you must ensure the trace IDs in your logs use the Datadog format.

- **Trace ID format**: The Datadog Agent requires the trace ID to be in the `dd.trace_id` field.

  - If you are using **Datadog's tracing libraries** (like `dd-trace-py`), this is handled for you automatically.
  - If you are generating logs with OpenTelemetry `trace_id` and `span_id` (as shown in the file-scraping example), you must use a [Log Processing Rule](https://docs.datadoghq.com/logs/log_configuration/processors) in Datadog to remap your `trace_id` attribute to `dd.trace_id`.

- **Attribute Mapping**: The Datadog Agent does not automatically convert OTel resource attributes (for example, `service.name`) to Datadog's standard tags. You may need to manually remap these attributes in your log processing pipeline to maintain unified service tagging.

## View correlated data in Datadog{% #view-correlated-data-in-datadog %}

After your application is sending traces, you can navigate between them in Datadog.

### From a trace to logs{% #from-a-trace-to-logs %}

1. Navigate to [**APM** > **Traces**](https://app.datadoghq.com/apm/traces).
1. Find and click on a trace from your instrumented service.
1. Select any span in the flame graph to view its details.
1. Click the **Logs** tab.

Here, you can see all the logs generated during the execution of that specific span.

### From a log to a trace{% #from-a-log-to-a-trace %}

1. Navigate to [**Logs** > **Explorer**](https://app.datadoghq.com/logs).
1. Find and click a log entry from your instrumented service.
1. Click the **Trace** tab.

Here, you can see a flame graph of the associated trace, with the span that generated the log.

Click **View Trace in APM** to pivot directly to the full APM trace associated with that log event, allowing you to see the context of the entire request.

## Further reading{% #further-reading %}

- [Send OpenTelemetry Traces to Datadog](https://docs.datadoghq.com/opentelemetry/otel_tracing/)
- [Collector documentation](https://opentelemetry.io/docs/collector/)
- [Datadog's partnership with OpenTelemetry](https://www.datadoghq.com/blog/opentelemetry-instrumentation/)
- [Ease troubleshooting with cross product correlation.](https://docs.datadoghq.com/logs/guide/ease-troubleshooting-with-cross-product-correlation/)
