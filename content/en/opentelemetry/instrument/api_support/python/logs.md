---
title: Python OpenTelemetry Logs API Support
code_lang: logs
type: multi-code-lang
code_lang_weight: 2
further_reading:
    - link: opentelemetry/correlate/logs_and_traces
      tag: Documentation
      text: Correlate OpenTelemetry Traces and Logs
---

## Overview

{{% otel-overview-exporter lang="Python" signal="Logs" sdk_name="dd-trace-py" %}}

## Prerequisites

- **Datadog SDK**: `dd-trace-py` version 3.18.0 or later.
- **An OTLP-compatible destination**: You must have a destination ready to receive OTLP data, such as the Datadog Agent or OpenTelemetry Collector.

## Setup

Follow these steps to enable OTel Logs API support in your Python application.

1. Install the Datadog SDK:
    ```sh
    pip install ddtrace
    ```
2. Install the OTel SDK and Exporter:
    ```sh
    pip install opentelemetry-sdk opentelemetry-exporter-otlp>=1.15.0
    ```
3. Enable OTel logs export by setting the following environment variable:
    ```sh
    export DD_LOGS_OTEL_ENABLED=true
    ```
4. Run your application using `ddtrace-run`:
    ```sh
    ddtrace-run python my_app.py
    ```
    When enabled, `ddtrace` automatically detects the OTel packages and configures the `OTLPLogExporter` to send logs to your OTLP destination.

## Examples

The Datadog SDK supports the OpenTelemetry Logs API for Python's built-in `logging` module. You do not need to change your existing logging code.

### Standard logging

This example shows a standard log message. With `DD_LOGS_OTEL_ENABLED=true`, this log is automatically captured, formatted as OTLP, and exported.

```python
import logging
import time

# Get a logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Add a handler to see logs in the console (optional)
handler = logging.StreamHandler()
logger.addHandler(handler)

# This log will be exported via OTLP
logger.info("This is a standard log message.")
```

### Trace and log correlation

This example shows how logs emitted within an active Datadog span are automatically correlated.

```python
from ddtrace import tracer
import logging
import time

# Standard logging setup
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
handler.setFormatter(logging.Formatter('%(message)s'))
logger.addHandler(handler)

@tracer.wrap("do.work")
def do_work():
    # This log is automatically correlated with the 'do.work' span
    logger.info("This log is correlated to the active span.")
    time.sleep(0.1)
    logger.warning("So is this one.")

print("Starting work...")
do_work()
print("Work complete.")
```

## Supported configuration

To enable this feature, you must set `DD_LOGS_OTEL_ENABLED=true`.

All OTLP exporter settings (such as endpoints, protocols, and timeouts), resource attributes, and batch processor settings are configured using a shared set of OpenTelemetry environment variables.

For a complete list of all shared OTLP environment variables, see [OpenTelemetry Environment Variables Interoperability][1].

## Migrate from other setups

### Existing OTel setup (manual configuration)

If you are already using the OTel SDK and manually configuring an `OTLPLogExporter` in your code:

1. Remove your manual setup code (for example, `LoggerProvider`, `BatchLogRecordProcessor`, and `OTLPLogExporter` instantiation).
2. Enable `ddtrace-run` auto-instrumentation for your application.
3. Set the `DD_LOGS_OTEL_ENABLED=true` environment variable.

The Datadog SDK will programmatically configure the OTel SDK for you.

### Existing Datadog log injection

If you are using Datadog's traditional log injection (where `DD_LOGS_INJECTION=true` adds trace context to text logs) and an Agent to tail log files:

1. Set the `DD_LOGS_OTEL_ENABLED=true` environment variable.
2. The Datadog SDK automatically disables the old log injection style (`DD_LOGS_INJECTION`) to prevent duplicate trace metadata in your logs. Trace correlation is handled by the structured OTLP payload.
3. Ensure your Datadog Agent is configured to receive OTLP logs (version 7.48.0 or greater is required)
4. Disable any file-based log collection for this service to avoid duplicate logs.

## Troubleshooting

{{% otel-api-troubleshooting signal="logs" %}}
- Verify `opentelemetry-sdk` is installed. The Python SDK requires `opentelemetry-sdk` and `opentelemetry-exporter-otlp` to be installed in your Python environment.
- Ensure `ddtrace-run` is active. Verify that you are running your application with `ddtrace-run` (or have imported and initialized `ddtrace` manually).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/config/environment_variable_support
[2]: /opentelemetry/setup/otlp_ingest_in_the_agent/?tab=host#enabling-otlp-ingestion-on-the-datadog-agent