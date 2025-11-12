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

- **.NET Runtime**: Requires .NET 6+ (or `System.Diagnostics.DiagnosticSource` v6.0.0+). See [Version and instrument support](#net-version-and-instrument-support) for a list of supported instruments by version.
- **Datadog SDK**: dd-trace-dotnet version 3.30.0 or later.
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

## Examples

You can use the standard OpenTelemetry API packages to create custom metrics.

### Create a counter

This example uses the OTel Metrics API to create a counter that increments every time an item is processed:

```csharp
using System.Diagnostics.Metrics;

// Define a meter
Meter meter = new("MyService", "1.0.0");

// Create a counter instrument, which will be used to record measurements in your code
Counter<long> requestsCounter = meter.CreateCounter<long>("http.requests_total");

// Perform work
// ...

// Record measurements
requestsCounter.Add(1, new("method", "GET"), new("status_code", "200"));
```

### Create a histogram

This example uses the OTel Metrics API to create a histogram to track request durations:

```csharp
using System.Diagnostics.Metrics;

// Define a meter
Meter meter = new("MyService", "1.0.0");

// Create a histogram instrument, which will be used to record measurements in your code
Histogram<double> responseTimeHistogram = meter.CreateHistogram<double>("http.response.time");

// Perform work
var watch = System.Diagnostics.Stopwatch.StartNew();
await Task.Delay(1_000);
watch.Stop();

// Record measurements
responseTimeHistogram.Record(watch.ElapsedMilliseconds, new("method", "GET"), new("status_code", "200"));
```

## Supported configuration

To enable this feature, you must set `DD_METRICS_OTEL_ENABLED=true`.

All OTLP exporter settings (such as endpoints, protocols, and timeouts), resource attributes, and temporality preferences are configured using a shared set of OpenTelemetry environment variables.

For a complete list of all shared OTLP environment variables, see [OpenTelemetry Environment Variables Interoperability][1].

## Migrate from other setups

### Existing OTel setup

If you are already using the OpenTelemetry SDK with a manual OTLP exporter configuration, follow these steps to migrate:

1. Add the Datadog SDK (`dd-trace-dotnet`) to your project and enable its instrumentation.
2. Remove any code that manually configures the `OtlpExporter` for metrics. The Datadog SDK handles this configuration automatically.
3. Remove the `OpenTelemetry` and `OpenTelemetry.Exporter.OpenTelemetryProtocol` packages from your project's dependencies.
4. Set the `DD_METRICS_OTEL_ENABLED=true` environment variable.

### Existing DogStatsD setup

If you are currently using the Datadog DogStatsD client and want to migrate to the OpenTelemetry Metrics API, you need to update your instrumentation code. The main difference is that OTel metrics are configured using environment variables rather than code, and you create `Instrument` objects first.

## Troubleshooting

{{% otel-api-troubleshooting signal="metrics" %}}
- Verify Datadog automatic instrumentation is active. This feature relies on Datadog's automatic instrumentation to function. Ensure you have completed all setup steps to enable the .NET instrumentation hooks, as these are required to intercept the metric data.
- Check your .NET version for instrument support. Support for specific metric instruments depends on your .NET runtime version. If your metrics are not appearing, ensure the instrument you are using is [supported by your version](#net-version-and-instrument-support).

{{% collapse-content title=".NET version and instrument support" id="net-version-and-instrument-support" expanded=false level="h4" %}}

Support for specific OpenTelemetry metric instruments is dependent on your .NET runtime version or the version of the `System.Diagnostics.DiagnosticSource` NuGet package you have installed.

If your code compiles but no metrics are emitted, verify that your instrument is supported by your application's runtime.

Here is the minimum version required for each instrument type:

- **.NET 6+** (or `System.Diagnostics.DiagnosticSource` v6.0.0):
  - `Counter`
  - `Histogram`
  - `ObservableCounter`
  - `ObservableGauge`

- **.NET 7+** (or `System.Diagnostics.DiagnosticSource` v7.0.0):
  - *Adds support for:*
  - `UpDownCounter`
  - `ObservableUpDownCounter`

- **.NET 9+** (or `System.Diagnostics.DiagnosticSource` v9.0.0):
  - *Adds support for:*
  - `Gauge`
  
{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/config/environment_variable_support
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-framework/#install-the-tracer
[3]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core#install-the-tracer