---
title: Ruby OpenTelemetry Metrics API Support
code_lang: metrics
type: multi-code-lang
code_lang_weight: 1
further_reading:
    - link: opentelemetry/correlate/metrics_and_traces
      tag: Documentation
      text: Correlate OpenTelemetry Traces and Metrics
---

## Overview

{{% otel-overview-exporter lang="Ruby" signal="Metrics" sdk_name="dd-trace-rb" %}}

## Prerequisites

- **Datadog SDK**: `datadog` gem version 2.23.0 or later.
- **An OTLP-compatible destination**: You must have a destination ready to receive OTLP data, such as the Datadog Agent or OpenTelemetry Collector.

## Setup

Follow these steps to enable OTel Metrics API support in your Ruby application.

1. Add the required gems to your Gemfile:
   ```ruby
   gem 'datadog'
   gem 'opentelemetry-metrics-sdk', '~> 0.8'
   gem 'opentelemetry-exporter-otlp-metrics', '~> 0.4'
   ```

2. Enable OTel metrics by setting the following environment variable:
   ```sh
   export DD_METRICS_OTEL_ENABLED=true
   ```

3. Configure your application:
   ```ruby
   require 'opentelemetry/sdk'
   require 'datadog/opentelemetry'

   Datadog.configure do |c|
     # Configure Datadog settings here
   end

   # Call after Datadog.configure to initialize metrics
   OpenTelemetry::SDK.configure
   ```

## Examples

You can use the standard OpenTelemetry API packages to create custom metrics.

### Create a counter

This example uses the OTel Metrics API to create a counter that increments every time an item is processed:

```ruby
require 'opentelemetry/api'

# Get a meter
meter = OpenTelemetry.meter_provider.meter('my-service', '1.0.0')

# Counter - monotonically increasing values
request_counter = meter.create_counter('http.requests_total', 
  description: 'Total HTTP requests',
  unit: 'requests'
)

# Record measurements
request_counter.add(1, attributes: { 'method' => 'GET', 'status_code' => '200' })
```

### Create a histogram

This example uses the OTel Metrics API to create a histogram to track request durations:

```ruby
require 'opentelemetry/api'

# Get a meter
meter = OpenTelemetry.meter_provider.meter('my-service', '1.0.0')

# Histogram - distribution of values
duration_histogram = meter.create_histogram('http.request_duration',
  description: 'HTTP request duration',
  unit: 'ms'
)

# Simulate measuring request duration
start_time = Time.now
# ... perform work ...
sleep(0.05)
end_time = Time.now

duration_ms = (end_time - start_time) * 1000
duration_histogram.record(duration_ms, attributes: { 'method' => 'POST', 'route' => '/api/users' })
```

## Supported configuration

To enable this feature, you must set `DD_METRICS_OTEL_ENABLED=true`.

All OTLP exporter settings (such as endpoints, protocols, and timeouts), resource attributes, and temporality preferences are configured using a shared set of OpenTelemetry environment variables.

For a complete list of all shared OTLP environment variables, see [OpenTelemetry Environment Variables Interoperability][1].

## Migrate from other setups

### Existing OTel setup

If you are using the OTel SDK with your own manual OTLP exporter configuration:

1. Add the Datadog SDK (`datadog`) to your project and enable its instrumentation.
2. Remove any code that manually configures the `OTLPMetricsExporter`. The Datadog SDK handles this configuration automatically.
3. Set the `DD_METRICS_OTEL_ENABLED=true` environment variable.

### Existing DogStatsD setup

If you are currently using the Datadog DogStatsD client and want to migrate to the OpenTelemetry Metrics API, you need to update your instrumentation code.

## Troubleshooting

{{% otel-api-troubleshooting signal="metrics" %}}
- Verify required gems are installed. Ensure `opentelemetry-metrics-sdk` and `opentelemetry-exporter-otlp-metrics` are installed.
- Ensure `Datadog.configure` is called before `OpenTelemetry::SDK.configure`. The Datadog SDK must be configured first to properly set up the meter provider.
{{% /otel-api-troubleshooting %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/config/environment_variable_support
