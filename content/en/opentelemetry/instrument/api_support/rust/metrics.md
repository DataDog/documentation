---
title: Rust OpenTelemetry Metrics API Support
# Uncomment Metrics tab after dd-trace-rs v0.3.0 is released
# code_lang: metrics
# type: multi-code-lang
# code_lang_weight: 1
further_reading:
    - link: opentelemetry/correlate/metrics_and_traces
      tag: Documentation
      text: Correlate OpenTelemetry Traces and Metrics
---

## Overview

{{% otel-overview-exporter lang="Rust" signal="Metrics" sdk_name="datadog-opentelemetry" %}}

**Note**: Metrics support will be available in datadog-opentelemetry v0.3.0.

## Prerequisites

- **Datadog SDK**: `datadog-opentelemetry` crate version 0.3.0 or later.
- **Rust**: MSRV 1.84 or later.
- **An OTLP-compatible destination**: You must have a destination (Agent or Collector) listening on ports 4317 (gRPC) or 4318 (HTTP) to receive OTel metrics.

## Setup

Follow these steps to enable OTel Metrics API support in your Rust application.

1. Add the Datadog SDK to your Cargo.toml:
   ```toml
   [dependencies]
   datadog-opentelemetry = { version = "0.3.0" }
   opentelemetry = { version = "0.31", features = ["metrics"] }
   ```

2. Enable OTel metrics by setting the following environment variable:
   ```sh
   export DD_METRICS_OTEL_ENABLED=true
   ```

3. Configure your application:
   ```rust
   // Initialize metrics with default configuration
   let meter_provider = datadog_opentelemetry::metrics().init();
   
   // Your application code here...
   
   // Shutdown to flush remaining metrics
   meter_provider.shutdown().unwrap();
   ```

## Examples

You can use the standard OpenTelemetry API packages to create custom metrics.

### Create a counter

This example uses the OTel Metrics API to create a counter that increments every time an item is processed:

```rust
use opentelemetry::global;
use opentelemetry::metrics::Counter;
use opentelemetry::KeyValue;

// datadog-opentelemetry automatically configures the MeterProvider
let meter = global::meter("my-service");
let counter: Counter<u64> = meter.u64_counter("requests").build();
counter.add(1, &[KeyValue::new("method", "GET")]);
```

## Supported configuration

To enable this feature, you must set `DD_METRICS_OTEL_ENABLED=true`.

All OTLP exporter settings (such as endpoints, protocols, and timeouts), resource attributes, and temporality preferences are configured using a shared set of OpenTelemetry environment variables.

### Transport Features

The default feature includes gRPC transport. Additional transport options:

- For gRPC transport: `features = ["metrics-grpc"]` (default)
- For HTTP transport: `features = ["metrics-http"]`

**Note**: HTTP/JSON protocol is not supported. Use `grpc` or `http/protobuf` protocols only.

For a complete list of all shared OTLP environment variables, see [OpenTelemetry Environment Variables Interoperability][1].

## Migrate from other setups

### Existing OTel setup

If you are using the OTel SDK with your own manual OTLP exporter configuration:

1. Add the Datadog SDK (`datadog-opentelemetry`) to your project and enable its instrumentation.
2. Remove any code that manually configures the `OTLPMetricsExporter`. The Datadog SDK handles this configuration automatically.
3. Set the `DD_METRICS_OTEL_ENABLED=true` environment variable.

### Existing DogStatsD setup

If you are currently using the Datadog DogStatsD client and want to migrate to the OpenTelemetry Metrics API, you need to update your instrumentation code. The main difference is that OTel metrics are configured using environment variables rather than code, and you create `Instrument` objects first.

**Important**: Runtime and trace metrics continue to be submitted using StatsD. Only custom metrics created through the OpenTelemetry Metrics API are sent using OTLP. The `datadog-opentelemetry` implementation supports exporting OTLP metrics exclusively to a Datadog Agent or OpenTelemetry Collector. Multiple exporters are not supported.

## Troubleshooting

{{% otel-api-troubleshooting signal="metrics" %}}
- Verify transport features are enabled. Ensure `metrics-grpc` or `metrics-http` feature is enabled in your Cargo.toml depending on your protocol choice.
- Check protocol configuration. Only `grpc` and `http/protobuf` protocols are supported. HTTP/JSON is not supported.
- Ensure `DD_METRICS_OTEL_ENABLED=true` is set before initializing the meter provider.
{{% /otel-api-troubleshooting %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/config/environment_variable_support
