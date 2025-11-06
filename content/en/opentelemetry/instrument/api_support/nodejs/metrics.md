---
title: Node.js OpenTelemetry Metrics API Support
code_lang: metrics
type: multi-code-lang
code_lang_weight: 1
further_reading:
    - link: opentelemetry/correlate/metrics_and_traces
      tag: Documentation
      text: Correlate OpenTelemetry Traces and Metrics
---

## Overview

{{% otel-overview-native lang="Node.js" signal="Metrics" sdk_name="dd-trace-js" %}}

## Prerequisites

- **Datadog SDK**: dd-trace version [x.y.z] or later.
- **OpenTelemetry API**: `@opentelemetry/api` version [x.y.z] or later. (The Datadog SDK provides the implementation for this API).
- **An OTLP-compatible destination**: You must have a destination ready to receive OTLP data, such as the Datadog Agent or OpenTelemetry Collector.

## Setup

Follow these steps to enable OTel Metrics API support in your Node.js application.

1. Install the Datadog SDK:
   ```sh
   npm install dd-trace
   ```
2. Enable OTel metrics by setting the following environment variable:
   ```sh
   export DD_METRICS_OTEL_ENABLED=true
   ```
4. Instrument your application:
   ```javascript
   // On application start
   require('dd-trace').init();
   ```
   
## Examples

You can use the standard OpenTelemetry API packages to create custom metrics.

### Create a counter

This example uses the OTel Metrics API to create a counter that increments every time an item is processed:

```javascript
const { metrics } = require('@opentelemetry/api');

const meter = metrics.getMeter('my-service', '1.0.0');

// Counter - monotonically increasing values
const requestCounter = meter.createCounter('http.requests', {
  description: 'Total HTTP requests',
  unit: 'requests'
});
requestCounter.add(1, { method: 'GET', status: 200 });
```

### Create a histogram

This example uses the OTel Metrics API to create a histogram to track request durations:

```javascript
const { metrics } = require('@opentelemetry/api');

const meter = metrics.getMeter('my-service', '1.0.0');

// Histogram - distribution of values
const durationHistogram = meter.createHistogram('http.duration', {
  description: 'HTTP request duration',
  unit: 'ms'
});
durationHistogram.record(145, { route: '/api/users' });
```

## Supported configuration

To enable this feature, you must set `DD_METRICS_OTEL_ENABLED=true`.

All OTLP exporter settings (such as endpoints, protocols, and timeouts), resource attributes, and temporality preferences are configured using a shared set of OpenTelemetry environment variables.

For a complete list of all shared OTLP environment variables, see [OpenTelemetry Environment Variables Interoperability][1].

## Migrate from other setups

### Existing OTel setup

If you are already using the OpenTelemetry SDK with a manual OTLP exporter configuration, follow these steps to migrate:

1. Add the Datadog SDK (`dd-trace`) to your project and enable its instrumentation.
2. Remove any code that manually configures the `OTLPMetricsExporter`. The Datadog SDK handles this configuration automatically.
3. Remove the `@opentelemetry/sdk-node` and `@opentelemetry/exporter-otlp` packages from your project's dependencies.
4. Set the `DD_METRICS_OTEL_ENABLED=true` environment variable.

### Existing DogStatsD setup

If you are using the Datadog DogStatsD client and want to migrate to the OpenTelemetry Metrics API, you need to update your instrumentation code. The main difference is that OTel metrics are configured using environment variables rather than code, and you create `Instrument` objects first.

For more details, see the [OpenTelemetry Node.js onboarding docs][2].

## Troubleshooting

{{% otel-api-troubleshooting signal="metrics" %}}
- Verify `dd-trace` is initialized first. The Datadog SDK must be initialized at the top of your application, *before* any other modules are imported.
- Verify `@opentelemetry/api` is installed. The Node.js SDK requires this API package.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/config/environment_variable_support
[2]: https://github.com/open-telemetry/opentelemetry-js/blob/4dded45ec67f90998d75e3ddbde9872b6b466183/doc/metrics.md#getting-started