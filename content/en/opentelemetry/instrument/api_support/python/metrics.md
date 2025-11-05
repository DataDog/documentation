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
   [Code example]
   ```

## Examples

You can use the standard OpenTelemetry API packages to create custom metrics.

### Create a counter

This example uses the OTel Metrics API to create a counter that increments every time an item is processed:

```py
[Code example]
```

### Create a histogram

This example uses the OTel Metrics API to create a histogram to track request durations:

```py
[Code example]
```

## Supported configuration

To enable this feature, you must set `DD_METRICS_OTEL_ENABLED=true`.

All OTLP exporter settings (such as endpoints, protocols, and timeouts), resource attributes, and temporality preferences are configured using a shared set of OpenTelemetry environment variables.

For a complete list of all shared OTLP environment variables, see [OpenTelemetry Environment Variables Interoperability][1].

### Tag and resource attribute precedence

{{% otel-config-precedence %}}

## Migrate from other setups

### Existing OTel setup

If you are using the OTel SDK with your own manual OTLP exporter configuration:

1. Add the Datadog SDK (`dd-trace-py`) to your project and enable its instrumentation (for example, `ddtrace-run`).
2. Remove any code that manually configures the `OTLPMetricsExporter`. The Datadog SDK handles this configuration automatically.
3. Set the `DD_METRICS_OTEL_ENABLED=true` environment variable.

### Existing DogStatsD setup

If you are currently using the Datadog DogStatsD client and want to migrate to the OpenTelemetry Metrics API, you need to update your instrumentation code. The main difference is that OTel metrics are configured using environment variables rather than code, and you create `Instrument` objects first.

## Troubleshooting

[Likely user errors and how to resolve them]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/config/environment_variable_support