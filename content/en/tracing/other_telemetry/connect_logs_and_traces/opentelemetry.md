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

- **Inject Trace Context**: Your application's logger must be configured to enrich your logs with the `trace_id` and `span_id` from the active trace. The recommended approach is to use an OpenTelemetry-aware logging library or appender. These tools automatically capture the active trace context and embed the `trace_id` and `span_id` as top-level fields in your log records, which is the standard method for correlation.

- **Send Logs to Datadog**: Your logs, enriched with trace context, must be collected and sent to Datadog.

### 1. Inject trace context into your logs

The following examples use logging bridges or auto-instrumentation. These tools intercept logs from common logging libraries (such as `zap`, `Logback`, and `Winston`), convert them into the OpenTelemetry log data model, and forward them to the OpenTelemetry SDK. This process automatically enriches the logs with the active trace context.

For complete, working applications, see the [Datadog OpenTelemetry Examples repository][2].

{{< tabs >}}
{{% tab "Go" %}}

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

{{% tab "Node.js" %}}

For Node.js, use the `@opentelemetry/instrumentation-winston` package with [Winston][300] to automatically inject trace context into your logs. Install the required packages:

```shell
npm install winston @opentelemetry/instrumentation-winston
```

Then, register the Winston instrumentation as part of your OpenTelemetry SDK setup:

```javascript
const { WinstonInstrumentation } = require('@opentelemetry/instrumentation-winston');
const { NodeSDK } = require('@opentelemetry/sdk-node');

const sdk = new NodeSDK({
  instrumentations: [
    new WinstonInstrumentation(),
    // ... other instrumentations
  ],
});
sdk.start();
```

After the instrumentation is registered, any Winston logger automatically includes `trace_id`, `span_id`, and `trace_flags` fields when a log is emitted within an active trace:

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

// Logs emitted within a traced context automatically include trace_id and span_id
logger.info('Processing user request');
```

The same approach works with [Pino][301] using the `@opentelemetry/instrumentation-pino` package.

[300]: https://github.com/winstonjs/winston
[301]: https://github.com/pinojs/pino

{{% /tab %}}
{{< /tabs >}}

### 2. Choose your log pipeline

Once your logs are instrumented with trace context, you need to send them to Datadog. The simplest approach is to send them directly from your application to the OpenTelemetry Collector using OTLP. However, you can also scrape logs from files or collect logs using the Datadog Agent.

#### Send logs using OTLP

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
2. **Configure the Collector to Receive OTLP Logs**: In your Collector's `config.yaml`, enable the `otlp` receiver and add it to your `logs` pipeline:
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
   
#### Scrape logs from files

This approach is useful if you have a requirement to keep local log files for compliance or other tooling.

For Datadog to correlate your logs and traces, your log files must contain specific fields formatted correctly:
- `trace_id`: The ID of the trace. It must be a 32-character lowercase hexadecimal string.
- `span_id`: The ID of the span. It must be a 16-character lowercase hexadecimal string.

The OpenTelemetry SDK typically provides these in a raw format (such as an integer or byte array), which must be formatted into hexadecimal strings without any <code>0x</code> prefix.

##### JSON logs

1. **Configure your Application to Output JSON Logs**: Use a standard logging library to write logs as JSON to a file or `stdout`. The following Python example uses the standard `logging` library.
2. **Manually Inject Trace Context**: In your application code, retrieve the current span context and add the `trace_id` and `span_id` to your log records. The following Python example shows how to create a custom `logging.Filter` to do this automatically:

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

3. **Configure the Collector to Scrape Log Files**: In your Collector's `config.yaml`, enable the `filelog` receiver. Configure it to find your log files and parse them as JSON.
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

##### Non-JSON logs

If your application outputs logs in a plain text or key-value format instead of JSON, you can still correlate them with traces. You need to manually inject the trace context into the log string and configure the Collector to extract it using a `regex_parser`.

The following Node.js example uses Winston with a custom formatter to inject `trace_id` and `span_id` into a plain text log line:

```javascript
const { trace, context } = require('@opentelemetry/api');
const winston = require('winston');

// Custom format that injects trace context into plain text logs
const traceFormat = winston.format((info) => {
  const span = trace.getSpan(context.active());
  if (span) {
    const spanContext = span.spanContext();
    info.trace_id = spanContext.traceId;
    info.span_id = spanContext.spanId;
  }
  return info;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    traceFormat(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, trace_id, span_id }) => {
      return `${timestamp} ${level} trace_id=${trace_id || '0'} span_id=${span_id || '0'} ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: '/var/log/my-app/app.log' })
  ],
});

// Output: 2025-01-15T12:00:00.000Z info trace_id=4bf92f3577b34da6a3ce929d0e0e4736 span_id=00f067aa0ba902b7 Processing request
logger.info('Processing request');
```

Then, configure the Collector's `filelog` receiver with a `regex_parser` to extract the trace context from the plain text log lines:

```yaml
receivers:
  filelog:
    include: [ /var/log/my-app/*.log ]
    operators:
      - type: regex_parser
        regex: '^(?P<timestamp>\S+) (?P<severity>\S+) trace_id=(?P<trace_id>[a-f0-9]+) span_id=(?P<span_id>[a-f0-9]+) (?P<body>.*)$'
        timestamp:
          parse_from: attributes.timestamp
          layout: '%Y-%m-%dT%H:%M:%S.%fZ'
        severity:
          parse_from: attributes.severity
        trace:
          trace_id:
            parse_from: attributes.trace_id
          span_id:
            parse_from: attributes.span_id
# ... your logs pipeline ...
```

This approach works with any logging library or language. The key requirements are:
- Include `trace_id` and `span_id` as parseable fields in your log output.
- Configure the Collector's `regex_parser` to match your log format and extract the trace context fields.

#### Collect logs using the Datadog Agent

If you collect logs directly with the Datadog Agent (without sending them through the OpenTelemetry Collector), you must ensure the trace IDs are present in your logs.

- **Trace ID format**: Datadog automatically detects the `dd.trace_id` and `dd.span_id` convention used by Datadog's tracing libraries, as well as the OpenTelemetry standards `trace_id` and `span_id`. See [OpenTelemetry Compatibility docs][6] for details on the standard.

<div class="alert alert-info">If your logging instrumentation uses a different attribute name for your trace/span IDs, you must ensure the attribute is added to the <a href="/logs/log_configuration/pipelines/?tab=traceid#preprocessing">Preprocessing for JSON logs</a> configuration so it is recognized as a valid Trace ID.</div>

- **Attribute Mapping**: The Datadog Agent does not automatically convert OTel resource attributes (for example, `service.name`) to Datadog's standard tags. You may need to manually remap these attributes in your log processing pipeline to maintain unified service tagging.

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
[5]: /logs/log_configuration/processors
[6]: https://opentelemetry.io/docs/specs/otel/compatibility/logging_trace_context/
