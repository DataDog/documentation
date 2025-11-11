---
title: .NET OpenTelemetry Metrics API Support
code_lang: metrics
type: multi-code-lang
code_lang_weight: 1
further_reading:
    - link: opentelemetry/correlate/metrics_and_traces
      tag: Documentation
      text: Correlate OpenTelemetry Traces and Metrics
---

## Overview

{{% otel-overview-native lang=".NET" signal="Metrics" sdk_name="dd-trace-dotnet" %}}

## Prerequisites

- **Datadog SDK**: dd-trace-dotnet version [3.30.0] or later.
- **OpenTelemetry API**: `OpenTelemetry.Api` version [x.y.z] or later. (The Datadog SDK provides the implementation for this API).
- **An OTLP-compatible destination**: You must have a destination ready to receive OTLP data, such as the Datadog Agent or OpenTelemetry Collector.

## Setup

Follow these steps to enable OTel Metrics API support in your .NET application.

1. Install the Datadog SDK. Follow the installation steps for your runtime:
   - [.NET Framework][2]
   - [.NET Core][3]
2. Enable OTel metrics by setting the following environment variable:
   ```sh
   export DD_METRICS_OTEL_ENABLED=true
   ```
4. Instrument your application:
   ```csharp
   [TODO: Code example]
   ```

## Examples

You can use the standard OpenTelemetry API packages to create custom metrics.

### Create a counter

This example uses the OTel Metrics API to create a counter that increments every time an item is processed:

```csharp
[TODO: Code example]
```

### Create a histogram

This example uses the OTel Metrics API to create a histogram to track request durations:

```csharp
[TODO: Code example]
```

## Supported configuration

To enable this feature, you must set `DD_METRICS_OTEL_ENABLED=true`.

All OTLP exporter settings (such as endpoints, protocols, and timeouts), resource attributes, and temporality preferences are configured using a shared set of OpenTelemetry environment variables.

For a complete list of all shared OTLP environment variables, see [OpenTelemetry Environment Variables Interoperability][1].

## Migrate from other setups

### Existing OTel setup

If you are already using the OpenTelemetry SDK with a manual OTLP exporter configuration, follow these steps to migrate:

1. Add the Datadog SDK (`dd-trace-dotnet`) to your project and enable its instrumentation.
2. Remove any code that manually configures the `OTLPMetricsExporter`. The Datadog SDK handles this configuration automatically.
3. Remove the `opentelemetry-sdk` and `opentelemetry-exporter-otlp` packages from your project's dependencies.
4. Set the `DD_METRICS_OTEL_ENABLED=true` environment variable.

### Existing DogStatsD setup

If you are currently using the Datadog DogStatsD client and want to migrate to the OpenTelemetry Metrics API, you need to update your instrumentation code. The main difference is that OTel metrics are configured using environment variables rather than code, and you create `Instrument` objects first.

## Troubleshooting

{{% otel-api-troubleshooting signal="metrics" %}}
- Verify the Datadog Profiler is attached. This feature relies on Datadog's automatic instrumentation. Ensure the .NET Profiler is correctly enabled for your application.
- Verify `OpenTelemetry.Api` is installed. The Datadog SDK requires the `OpenTelemetry.Api` package to be present.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/config/environment_variable_support
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-framework/#install-the-tracer
[3]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core#install-the-tracer