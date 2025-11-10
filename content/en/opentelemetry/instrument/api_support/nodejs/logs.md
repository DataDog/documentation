---
title: Node.js OpenTelemetry Logs API Support
code_lang: logs
type: multi-code-lang
code_lang_weight: 2
further_reading:
    - link: opentelemetry/correlate/logs_and_traces
      tag: Documentation
      text: Correlate OpenTelemetry Traces and Logs
---

## Overview

{{% otel-overview-native lang="Node.js" signal="Logs" sdk_name="dd-trace-js" %}}

## Prerequisites

- **Datadog SDK**: `dd-trace-js` version [x.y.z] or later.
- **An OTLP-compatible destination**: You must have a destination ready to receive OTLP data, such as the Datadog Agent or OpenTelemetry Collector.

## Setup

1. Install the Datadog SDK:
    ```sh
    npm install dd-trace
    ```
2. Install the OpenTelemetry Logs API package:
    ```sh
    npm install @opentelemetry/api-logs
    ```
3. Enable OTel logs export by setting the following environment variable:
    ```sh
    export DD_LOGS_OTEL_ENABLED=true
    ```
4. Initialize the Datadog SDK (`dd-trace`) at the beginning of your application, before any other modules (like `express` or `@opentelemetry/api-logs`) are imported.
    ```javascript
    // This must be the first line of your application
    require('dd-trace').init()

    // Other imports can follow
    const { logs } = require('@opentelemetry/api-logs')
    const express = require('express')
    ```

## Examples

### Emitting a log

After the Datadog SDK is initialized, you can use the standard OpenTelemetry Logs API to get a logger and emit log records.

```javascript
// Tracer must be initialized first
require('dd-trace').init()

const { logs } = require('@opentelemetry/api-logs')
const logger = logs.getLogger('my-service', '1.0.0')

// Emit a log record
logger.emit({
  severityText: 'INFO',
  severityNumber: 9,
  body: `User clicked the checkout button.`,
  attributes: {
    'cart.id': 'c-12345',
    'user.id': 'u-54321'
  }
})
```

### Trace and log correlation

Trace and log correlation is automatic. When you emit a log using the OTel Logs API within an active Datadog trace, the `trace_id` and `span_id` are automatically added to the log record.

```javascript
// Tracer must be initialized first
require('dd-trace').init()

const { logs } = require('@opentelemetry/api-logs')
const express = require('express')

const app = express()
const logger = logs.getLogger('my-service', '1.0.0')

app.get('/api/users/:id', (req, res) => {
  // This log is automatically correlated with the 'express.request' span
  logger.emit({
    severityText: 'INFO',
    severityNumber: 9,
    body: `Processing user request for ID: ${req.params.id}`,
  })
  res.json({ id: req.params.id, name: 'John Doe' })
})

app.listen(3000)
```

## Supported configuration

To enable this feature, you must set `DD_LOGS_OTEL_ENABLED=true`.

All OTLP exporter settings (such as endpoints, protocols, and timeouts), resource attributes, and batch processor settings are configured using a shared set of OpenTelemetry environment variables.

For a complete list of all shared OTLP environment variables, see [OpenTelemetry Environment Variables Interoperability][1].

## Migrate from other setups

### Existing OTel setup (manual configuration)

If you are using the full OpenTelemetry SDK (`@opentelemetry/sdk-logs`) with a manual exporter setup:

1. Remove the OTel SDK and OTLP Exporter packages:
    ```sh
    npm uninstall @opentelemetry/sdk-logs @opentelemetry/exporter-otlp-logs
    ```
2. Remove all manual OTel SDK initialization code (for example, `new LoggerProvider()`, `addLogRecordProcessor()`, `new OTLPLogExporter()`).
3. Install the Datadog SDK: `npm install dd-trace`
4. Keep the `@opentelemetry/api-logs` package.
5. Set `DD_LOGS_OTEL_ENABLED=true` and initialize `dd-trace` at the top of your application.

Your existing code that uses `logs.getLogger()` will continue to work.

### Existing Datadog log injection

If you are using Datadog's traditional log injection (where `DD_LOGS_INJECTION=true` adds trace context to text logs) and an Agent to tail log files:

1. Set the `DD_LOGS_OTEL_ENABLED=true` environment variable.
2. The Datadog SDK automatically disables the old log injection style (`DD_LOGS_INJECTION`) to prevent duplicate trace metadata in your logs. Trace correlation is handled by the structured OTLP payload.
3. Ensure your Datadog Agent is configured to receive OTLP logs (version 7.48.0 or greater is required)
4. Disable any file-based log collection for this service to avoid duplicate logs.

## Troubleshooting

{{% otel-api-troubleshooting signal="logs" %}}
- Verify `dd-trace` is initialized first. The Datadog SDK must be initialized at the top of your application, *before* any other modules are imported.
- Verify `@opentelemetry/api-logs` is installed. The Node.js SDK requires this API package.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/config/environment_variable_support
[2]: /opentelemetry/setup/otlp_ingest_in_the_agent/?tab=host#enabling-otlp-ingestion-on-the-datadog-agent