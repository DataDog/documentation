---
title: Go OpenTelemetry Metrics API Support
# Uncomment Metrics tab when Go metrics support is available
# code_lang: metrics
# type: multi-code-lang
# code_lang_weight: 1
further_reading:
    - link: opentelemetry/correlate/metrics_and_traces
      tag: Documentation
      text: Correlate OpenTelemetry Traces and Metrics
---

## Overview

{{% otel-overview-exporter lang="Go" signal="Metrics" sdk_name="dd-trace-go" %}}

## Prerequisites

- **Datadog SDK**: dd-trace-go version 2.5.0 or later.
- **An OTLP-compatible destination**: You must have a destination (Agent or Collector) listening on ports 4317 (gRPC) or 4318 (HTTP) to receive OTel metrics.

## Setup

Follow these steps to enable OTel Metrics API support in your Go application.

1. Install the Datadog SDK:
   ```sh
   go get github.com/DataDog/dd-trace-go/v2
   ```

2. Enable OTel metrics by setting the following environment variable:
   ```sh
   export DD_METRICS_OTEL_ENABLED=true
   ```

3. Configure your application:
   ```go
   import (
       "context"
       "time"
       
       "github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry/metric"
       "go.opentelemetry.io/otel"
   )

   // Create MeterProvider with Datadog-specific defaults
   mp, err := metric.NewMeterProvider()
   if err != nil {
       panic(err)
   }
   
   // Set as global MeterProvider
   otel.SetMeterProvider(mp)
   
   // Your application code here...
   
   // Shutdown to flush remaining metrics
   ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
   defer cancel()
   metric.Shutdown(ctx, mp)
   ```

## Examples

You can use the standard OpenTelemetry API packages to create custom metrics.

### Create a counter

This example uses the OTel Metrics API to create a counter that increments every time an item is processed:

```go
import (
    "context"
    
    "github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry/metric"
    "go.opentelemetry.io/otel"
    otelmetric "go.opentelemetry.io/otel/metric"
    "go.opentelemetry.io/otel/attribute"
)

// Initialize MeterProvider (typically done once at startup)
mp, _ := metric.NewMeterProvider()
otel.SetMeterProvider(mp)

// Get a meter
meter := otel.Meter("my-service")

// Create a counter
counter, _ := meter.Int64Counter(
    "http.requests_total",
    otelmetric.WithDescription("Total number of HTTP requests"),
)

// Record measurements
counter.Add(context.Background(), 1, 
    attribute.String("method", "GET"),
    attribute.String("status_code", "200"),
)
```

### Create a histogram

This example uses the OTel Metrics API to create a histogram to track request durations:

```go
import (
    "context"
    "time"
    
    "go.opentelemetry.io/otel"
    otelmetric "go.opentelemetry.io/otel/metric"
    "go.opentelemetry.io/otel/attribute"
)

// Get a meter (assuming MeterProvider is already configured)
meter := otel.Meter("my-service")

// Create a histogram
histogram, _ := meter.Float64Histogram(
    "http.request_duration",
    otelmetric.WithDescription("HTTP request duration"),
    otelmetric.WithUnit("ms"),
)

// Measure request duration
start := time.Now()
// ... perform work ...
time.Sleep(50 * time.Millisecond)
duration := float64(time.Since(start).Nanoseconds()) / 1e6

histogram.Record(context.Background(), duration,
    attribute.String("method", "POST"),
    attribute.String("route", "/api/users"),
)
```

## Supported configuration

To enable this feature, you must set `DD_METRICS_OTEL_ENABLED=true`. Metrics are **disabled by default**.

All OTLP exporter settings (such as endpoints, protocols, and timeouts), resource attributes, and temporality preferences are configured using a shared set of OpenTelemetry environment variables.

For a complete list of all shared OTLP environment variables, see [OpenTelemetry Environment Variables Interoperability][1].

## Migrate from other setups

### Existing OTel setup

If you are using the OTel SDK with your own manual OTLP exporter configuration:

1. Add the Datadog SDK (`dd-trace-go/v2`) to your project and enable its instrumentation.
2. Remove any code that manually configures the `OTLPMetricsExporter`. The Datadog SDK handles this configuration automatically.
3. Set the `DD_METRICS_OTEL_ENABLED=true` environment variable.

### Existing DogStatsD setup

If you are currently using the Datadog DogStatsD client and want to migrate to the OpenTelemetry Metrics API, you need to update your instrumentation code. The main difference is that OTel metrics are configured using environment variables rather than code, and you create `Instrument` objects first.

**Important**: Runtime and trace metrics continue to be submitted using StatsD. Only custom metrics created through the OpenTelemetry Metrics API are sent using OTLP. The `dd-trace-go` implementation supports exporting OTLP metrics exclusively to a Datadog Agent or OpenTelemetry Collector. Multiple exporters are not supported.

## Troubleshooting

{{% otel-api-troubleshooting signal="metrics" %}}
- Verify `DD_METRICS_OTEL_ENABLED=true` is set. Metrics are disabled by default in dd-trace-go.
- Ensure the Datadog SDK is imported: `import "github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry/metric"`
{{% /otel-api-troubleshooting %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/config/environment_variable_support
