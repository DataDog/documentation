---
title: Python OpenTelemetry Metrics API Support
code_lang: metrics
type: multi-code-lang
code_lang_weight: 1
further_reading:
    - link: opentelemetry/correlate/metrics_and_traces
      tag: Documentation
      text: Correlate OpenTelemetry Traces and Metrics
---

## Overview

{{% otel-overview-exporter lang="Python" signal="Metrics" sdk_name="dd-trace-py" %}}

## Prerequisites

- **Datadog SDK**: dd-trace-py version 3.18.0 or later.
- **An OTLP-compatible destination**: You must have a destination ready to receive OTLP data, such as the Datadog Agent or OpenTelemetry Collector.

## Setup

Follow these steps to enable OTel Metrics API support in your Python application.

1. Install the Datadog SDK:
   ```sh
   pip install ddtrace
   ```
2. Install the OTel SDK and Exporter:
   ```sh
   pip install opentelemetry-sdk opentelemetry-exporter-otlp
   ```
3. Enable OTel metrics by setting the following environment variable:
   ```sh
   export DD_METRICS_OTEL_ENABLED=true
   ```
4. Instrument your application:
   ```py
   ddtrace-run python my_app.py
   ```

## Examples

You can use the standard OpenTelemetry API packages to create custom metrics.

### Create a counter

This example uses the OTel Metrics API to create a counter that increments every time an item is processed:

```py
import os
os.environ["DD_METRICS_OTEL_ENABLED"] = "true"
import ddtrace.auto # This must be imported before opentelemetry
from opentelemetry import metrics

# ddtrace automatically configures the MeterProvider
meter = metrics.get_meter(__name__)

# Counter - monotonically increasing values
counter = meter.create_counter("http.requests_total")
counter.add(1, {"method": "GET", "status_code": "200"})
```

### Create a histogram

This example uses the OTel Metrics API to create a histogram to track request durations:

```py
import os
os.environ["DD_METRICS_OTEL_ENABLED"] = "true"
import ddtrace.auto # This must be imported before opentelemetry
from opentelemetry import metrics
import time

# ddtrace automatically configures the MeterProvider
meter = metrics.get_meter(__name__)

# Histogram - distribution of values
histogram = meter.create_histogram(
    name="http.request_duration",
    description="HTTP request duration",
    unit="ms"
)

start_time = time.time()
# ... simulate work ...
time.sleep(0.05)
end_time = time.time()

duration = (end_time - start_time) * 1000 # convert to milliseconds
histogram.record(duration, {"method": "POST", "route": "/api/users"})
```

## Supported configuration

To enable this feature, you must set `DD_METRICS_OTEL_ENABLED=true`.

All OTLP exporter settings (such as endpoints, protocols, and timeouts), resource attributes, and temporality preferences are configured using a shared set of OpenTelemetry environment variables.

For a complete list of all shared OTLP environment variables, see [OpenTelemetry Environment Variables Interoperability][1].

## Migrate from other setups

### Existing OTel setup

If you are using the OTel SDK with your own manual OTLP exporter configuration:

1. Add the Datadog SDK (`dd-trace-py`) to your project and enable its instrumentation (for example, `ddtrace-run`).
2. Remove any code that manually configures the `OTLPMetricsExporter`. The Datadog SDK handles this configuration automatically.
3. Set the `DD_METRICS_OTEL_ENABLED=true` environment variable.

### Existing DogStatsD setup

If you are currently using the Datadog DogStatsD client and want to migrate to the OpenTelemetry Metrics API, you need to update your instrumentation code. The main difference is that OTel metrics are configured using environment variables rather than code, and you create `Instrument` objects first.

## Troubleshooting

{{% otel-api-troubleshooting signal="metrics" %}}
- Verify `opentelemetry-sdk` is installed. The Python SDK requires `opentelemetry-sdk` and `opentelemetry-exporter-otlp` to be installed in your Python environment.
- Ensure `ddtrace-run` is active. Verify that you are running your application with `ddtrace-run` (or have imported and initialized `ddtrace` manually).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/config/environment_variable_support