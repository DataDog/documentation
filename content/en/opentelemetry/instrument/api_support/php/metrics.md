---
title: PHP OpenTelemetry Metrics API Support
# Uncomment Metrics tab when PHP metrics support is available
# code_lang: metrics
# type: multi-code-lang
# code_lang_weight: 1
further_reading:
    - link: opentelemetry/correlate/metrics_and_traces
      tag: Documentation
      text: Correlate OpenTelemetry Traces and Metrics
---

## Overview

{{% otel-overview-exporter lang="PHP" signal="Metrics" sdk_name="dd-trace-php" %}}

**Note**: PHP OpenTelemetry Metrics API support is not yet available.

## Prerequisites

- **Datadog SDK**: dd-trace-php version 1.16.0 or later.
- **OpenTelemetry PHP SDK**: Version 1.0.0 or later (`open-telemetry/sdk`).
- **OpenTelemetry OTLP Exporter**: The OTLP exporter package (`open-telemetry/exporter-otlp`).
- **An OTLP-compatible destination**: You must have a destination (Agent or Collector) listening on ports 4317 (gRPC) or 4318 (HTTP) to receive OTel metrics.

## Setup

### 1. Install the required packages

Install the Datadog PHP tracer and OpenTelemetry SDK packages:

```sh
composer require datadog/dd-trace
composer require open-telemetry/sdk
composer require open-telemetry/exporter-otlp
```

### 2. Enable OpenTelemetry Metrics

Set the `DD_METRICS_OTEL_ENABLED` environment variable to enable OpenTelemetry Metrics support:

```sh
export DD_METRICS_OTEL_ENABLED=true
```

### 3. Configure your application:

The Datadog SDK automatically configures the OpenTelemetry MeterProvider when your application loads. No additional code configuration is required.

If your Datadog Agent is running on a non-default location, configure the endpoint:

# Option 1: Using the Agent URL
```sh
export DD_TRACE_AGENT_URL=http://your-agent-host:8126
```

# Option 2: Using the Agent host
```sh
export DD_AGENT_HOST=your-agent-host
```

The SDK automatically resolves the appropriate OTLP endpoint (port 4318 for HTTP, port 4317 for gRPC).

## Examples

### Create a counter

This example uses the OTel Metrics API to create a counter that increments every time a request is processed:

```php
use OpenTelemetry\API\Globals;

// dd-trace-php automatically configures the MeterProvider
$meter = Globals::meterProvider()->getMeter('my-service');
$counter = $meter->createCounter('requests', 'requests', 'Total number of requests');
$counter->add(1, ['method' => 'GET', 'route' => '/api/users']);
```

## Supported configuration

To enable this feature, you must set `DD_METRICS_OTEL_ENABLED=true`.

All OTLP exporter settings (such as endpoints, protocols, and timeouts), resource attributes, and temporality preferences are configured using a shared set of OpenTelemetry environment variables.

For a complete list of all shared OTLP environment variables, see [OpenTelemetry Environment Variables Interoperability][1].

## Migrate from other setups

### Existing OTel setup

If you are using the OTel SDK with your own manual OTLP exporter configuration:

1. Add the Datadog SDK (`datadog/dd-trace`) to your project.
2. Remove any code that manually configures the OTLP exporter. The Datadog SDK handles this configuration automatically.
3. Set the `DD_METRICS_OTEL_ENABLED=true` environment variable.

### Existing DogStatsD setup

If you are currently using the Datadog DogStatsD client and want to migrate to the OpenTelemetry Metrics API, update your instrumentation code to use the OTel Meter API instead of StatsD client calls.

## Troubleshooting

{{% otel-api-troubleshooting signal="metrics" %}}

- Verify OpenTelemetry SDK version. Version 1.0.0 or later is required.
- Ensure `open-telemetry/exporter-otlp` package is installed.
- Ensure `DD_METRICS_OTEL_ENABLED=true` is set before your application starts.
- Enable debug logging with `DD_TRACE_DEBUG=true` to see detailed logs.

{{% /otel-api-troubleshooting %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/config/environment_variable_support
