---
title: OpenTelemetry API Support
description: "Use the OpenTelemetry API with Datadog SDKs to send traces, metrics, and logs to Datadog while maintaining vendor-neutral instrumentation."
aliases:
  - /opentelemetry/interoperability/api_support
  - /opentelemetry/interoperability/otel_api_tracing_interoperability/
  - /opentelemetry/instrument/api_support/dotnet/
  - /opentelemetry/instrument/api_support/dotnet/logs
  - /opentelemetry/instrument/api_support/dotnet/metrics
  - /opentelemetry/instrument/api_support/dotnet/traces
  - /opentelemetry/instrument/api_support/go
  - /opentelemetry/instrument/api_support/go/metrics
  - /opentelemetry/instrument/api_support/go/traces
  - /opentelemetry/instrument/api_support/java
  - /opentelemetry/instrument/api_support/nodejs/
  - /opentelemetry/instrument/api_support/nodejs/logs
  - /opentelemetry/instrument/api_support/nodejs/metrics
  - /opentelemetry/instrument/api_support/nodejs/traces
  - /opentelemetry/instrument/api_support/php
  - /opentelemetry/instrument/api_support/php/metrics
  - /opentelemetry/instrument/api_support/php/traces
  - /opentelemetry/instrument/api_support/python/
  - /opentelemetry/instrument/api_support/python/logs
  - /opentelemetry/instrument/api_support/python/metrics
  - /opentelemetry/instrument/api_support/python/traces
  - /opentelemetry/instrument/api_support/ruby/
  - /opentelemetry/instrument/api_support/ruby/metrics
  - /opentelemetry/instrument/api_support/ruby/traces
  - /opentelemetry/instrument/api_support/rust
  - /opentelemetry/instrument/api_support/rust/metrics
  - /opentelemetry/instrument/api_support/rust/traces
content_filters:
  - trait_id: prog_lang
    option_group_id: otel_api_support_language_options
    label: "Language"
  - trait_id: platform
    option_group_id: otel_api_support_signal_options
    label: "Signal"
further_reading:
    - link: 'tracing/guide/instrument_custom_method'
      text: 'Instrument a custom method to get deep visibility into your business logic'
      tag: 'Documentation'
    - link: 'tracing/connect_logs_and_traces'
      text: 'Connect your Logs and Traces together'
      tag: 'Documentation'
    - link: 'tracing/visualization/'
      text: 'Explore your services, resources, and traces'
      tag: 'Documentation'
    - link: 'https://www.datadoghq.com/blog/opentelemetry-instrumentation/'
      text: 'Learn More about Datadog and the OpenTelemetry initiative'
      tag: 'Blog'
---

<!-- ============================================== -->
<!-- SIGNAL AVAILABILITY NOTICES -->
<!-- ============================================== -->

<!-- Languages with only traces: Java -->
{% if equals($prog_lang, "java") %}
{% if equals($platform, "metrics") %}
{% alert level="danger" %}
OpenTelemetry API support for metrics is not available for this language. Use [DogStatsD][200] to send custom metrics instead.
{% /alert %}
{% /if %}
{% if equals($platform, "logs") %}
{% alert level="danger" %}
OpenTelemetry API support for logs is not available for this language. Use [Datadog Log Collection][210] instead.
{% /alert %}
{% /if %}
{% /if %}

<!-- Go, PHP, Rust have traces and metrics only -->
{% if or(or(equals($prog_lang, "go"), equals($prog_lang, "php")), equals($prog_lang, "rust")) %}
{% if equals($platform, "logs") %}
{% alert level="danger" %}
OpenTelemetry API support for logs is not available for this language. Use [Datadog Log Collection][210] instead.
{% /alert %}
{% /if %}
{% /if %}

<!-- Ruby has traces and metrics only -->
{% if equals($prog_lang, "ruby") %}
{% if equals($platform, "logs") %}
{% alert level="danger" %}
OpenTelemetry API support for logs is not available for Ruby. Use [Datadog Log Collection][210] instead.
{% /alert %}
{% /if %}
{% /if %}

<!-- ============================================== -->
<!-- TRACES CONTENT -->
<!-- ============================================== -->

{% if equals($platform, "traces") %}

## Overview

Use OpenTelemetry tracing APIs with Datadog SDKs to create custom spans, add tags, record events, and more.

{% if equals($prog_lang, "java") %}
{% partial file="opentelemetry/traces/java.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "python") %}
{% partial file="opentelemetry/traces/python.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "node_js") %}
{% partial file="opentelemetry/traces/nodejs.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "go") %}
{% partial file="opentelemetry/traces/go.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "ruby") %}
{% partial file="opentelemetry/traces/ruby.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "dot_net") %}
{% partial file="opentelemetry/traces/dotnet.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "php") %}
{% partial file="opentelemetry/traces/php.mdoc.md" /%}
{% /if %}

{% if equals($prog_lang, "rust") %}
{% partial file="opentelemetry/traces/rust.mdoc.md" /%}
{% /if %}

{% /if %}
<!-- END TRACES CONTENT -->

<!-- ============================================== -->
<!-- METRICS CONTENT -->
<!-- ============================================== -->

{% if equals($platform, "metrics") %}

<!-- Show content only for languages that support metrics -->
{% if or(or(or(equals($prog_lang, "dot_net"), equals($prog_lang, "node_js")), or(equals($prog_lang, "python"), equals($prog_lang, "ruby"))), or(or(equals($prog_lang, "go"), equals($prog_lang, "php")), equals($prog_lang, "rust"))) %}

## Overview

Use the OpenTelemetry Metrics API with Datadog SDKs to send custom application metrics. This is an alternative to [DogStatsD][200].

<!-- Native implementation (.NET, Node.js, Go, Rust) -->
{% if or(or(equals($prog_lang, "dot_net"), equals($prog_lang, "node_js")), or(equals($prog_lang, "go"), equals($prog_lang, "rust"))) %}

The Datadog SDK provides a native implementation of the OpenTelemetry API. This means you can write code against the standard OTel interfaces without needing the official OpenTelemetry SDK.

{% alert level="info" %}
You should not install the official OpenTelemetry SDK or any OTLP Exporter packages. The Datadog SDK provides this functionality. Installing both can lead to runtime conflicts and duplicate data.
{% /alert %}
{% /if %}

<!-- Exporter-based implementation (Python, Ruby, PHP) -->
{% if or(or(equals($prog_lang, "python"), equals($prog_lang, "ruby")), equals($prog_lang, "php")) %}

This approach works with the existing OpenTelemetry SDK. When you enable this feature, the Datadog SDK detects the OTel SDK and configures its OTLP exporter to send metrics to the Datadog Agent.
{% /if %}

## Prerequisites

{% if equals($prog_lang, "dot_net") %}
- **.NET Runtime**: Requires .NET 6+ (or `System.Diagnostics.DiagnosticSource` v6.0.0+). See [Version and instrument support](#net-version-and-instrument-support) for a list of supported instruments by version.
- **Datadog SDK**: dd-trace-dotnet version 3.30.0 or later.
{% /if %}
{% if equals($prog_lang, "node_js") %}
- **Datadog SDK**: `dd-trace-js` version 5.81.0 or later.
- **OpenTelemetry API**: `@opentelemetry/api` version 1.0.0 to 1.10.0. (The Datadog SDK provides the implementation for this API).
{% /if %}
{% if equals($prog_lang, "python") %}
- **Datadog SDK**: dd-trace-py version 3.18.0 or later.
{% /if %}
{% if equals($prog_lang, "ruby") %}
{% alert level="info" %}
The OpenTelemetry Metrics SDK for Ruby is currently in [alpha implementation](https://github.com/open-telemetry/opentelemetry-ruby/tree/main/metrics_sdk). Report issues with the SDK at [opentelemetry-ruby/issues](https://github.com/open-telemetry/opentelemetry-ruby/issues).
{% /alert %}
- **Datadog SDK**: `datadog` gem version 2.23.0 or later.
{% /if %}
{% if equals($prog_lang, "go") %}
- **Datadog SDK**: dd-trace-go version 2.6.0 or later.
{% /if %}
{% if equals($prog_lang, "php") %}
- **Datadog SDK**: dd-trace-php version 1.16.0 or later.
- **OpenTelemetry PHP SDK**: Version 1.0.0 or later (`open-telemetry/sdk`).
- **OpenTelemetry OTLP Exporter**: The OTLP exporter package (`open-telemetry/exporter-otlp`).
{% /if %}
{% if equals($prog_lang, "rust") %}
- **Datadog SDK**: `datadog-opentelemetry` crate version 0.3.0 or later.
- **Rust**: MSRV 1.84 or later.
{% /if %}
- **An OTLP-compatible destination**: You must have a destination (Agent or Collector) listening on ports 4317 (gRPC) or 4318 (HTTP) to receive OTel metrics.
{% if or(or(equals($prog_lang, "dot_net"), equals($prog_lang, "node_js")), or(or(equals($prog_lang, "python"), equals($prog_lang, "ruby")), equals($prog_lang, "go"))) %}
- **DogStatsD (Runtime Metrics)**: If you also use Datadog [Runtime Metrics][201], ensure the Datadog Agent is listening for DogStatsD traffic on port 8125 (UDP). OTel configuration does not route Runtime Metrics through OTLP.
{% /if %}

## Setup

Follow these steps to enable OTel Metrics API support in your application.

{% if equals($prog_lang, "dot_net") %}
1. Install the Datadog SDK. Follow the installation steps for your runtime:
   - [.NET Framework][202]
   - [.NET Core][203]
2. Enable OTel metrics by setting the following environment variable:
   ```sh
   export DD_METRICS_OTEL_ENABLED=true
   ```
{% /if %}

{% if equals($prog_lang, "node_js") %}
1. Install the Datadog SDK:
   ```sh
   npm install dd-trace
   ```
2. Enable OTel metrics by setting the following environment variable:
   ```sh
   export DD_METRICS_OTEL_ENABLED=true
   ```
3. Instrument your application:
   ```javascript
   // On application start
   require('dd-trace').init();
   ```
{% /if %}

{% if equals($prog_lang, "python") %}
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
{% /if %}

{% if equals($prog_lang, "ruby") %}
1. Add the Datadog SDK and OTel gems:
   ```ruby
   # Add to your Gemfile
   gem 'datadog', '~> 2.23.0'
   gem 'opentelemetry-metrics-sdk', '~> 0.8'
   gem 'opentelemetry-exporter-otlp-metrics', '~> 0.4'
   ```
2. Install dependencies:
   ```sh
   bundle install
   ```
3. Enable OTel metrics by setting the following environment variable:
   ```sh
   export DD_METRICS_OTEL_ENABLED=true
   ```
4. Configure your application:
   ```ruby
   require 'opentelemetry/sdk'
   require 'datadog/opentelemetry'

   Datadog.configure do |c|
     # Configure Datadog settings here
   end

   # Call after Datadog.configure to initialize metrics
   OpenTelemetry::SDK.configure
   ```
{% /if %}

{% if equals($prog_lang, "go") %}
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
{% /if %}

{% if equals($prog_lang, "php") %}
1. Install the Datadog PHP tracer following the [official installation instructions][400].
2. Install the required OpenTelemetry packages:
   ```sh
   composer require open-telemetry/sdk
   composer require open-telemetry/exporter-otlp
   ```
3. Enable OTel metrics by setting the following environment variable:
   ```sh
   export DD_METRICS_OTEL_ENABLED=true
   ```
   Alternatively, set it in your `php.ini`:
   ```ini
   datadog.metrics_otel_enabled = true
   ```
4. Configure your application. The Datadog SDK automatically configures the OpenTelemetry MeterProvider when your application loads. No additional code configuration is required.

   If your Datadog Agent is running on a non-default location, configure the endpoint:
   ```sh
   # Option 1: Using the Agent URL
   export DD_TRACE_AGENT_URL=http://your-agent-host:8126

   # Option 2: Using the Agent host
   export DD_AGENT_HOST=your-agent-host
   ```
   The SDK automatically resolves the appropriate OTLP endpoint (port 4318 for HTTP, port 4317 for gRPC).
{% /if %}

{% if equals($prog_lang, "rust") %}
1. Add the Datadog SDK to your `Cargo.toml`:
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
{% /if %}

## Examples

You can use the standard OpenTelemetry API packages to create custom metrics.

### Create a counter

This example uses the OTel Metrics API to create a counter that increments every time an item is processed:

{% if equals($prog_lang, "dot_net") %}
```csharp
using System.Diagnostics.Metrics;

// Define a meter
Meter meter = new("MyService", "1.0.0");

// Create a counter instrument
Counter<long> requestsCounter = meter.CreateCounter<long>("http.requests_total");

// Perform work
// ...

// Record measurements
requestsCounter.Add(1, new("method", "GET"), new("status_code", "200"));
```
{% /if %}

{% if equals($prog_lang, "node_js") %}
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
{% /if %}

{% if equals($prog_lang, "python") %}
```python
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
{% /if %}

{% if equals($prog_lang, "ruby") %}
```ruby
require 'opentelemetry/api'

# dd-trace-rb automatically configures the MeterProvider
meter = OpenTelemetry.meter_provider.meter('my-service', '1.0.0')

# Counter - monotonically increasing values
counter = meter.create_counter('http.requests_total')
counter.add(1, attributes: { 'method' => 'GET', 'status_code' => '200' })
```
{% /if %}

{% if equals($prog_lang, "go") %}
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
{% /if %}

{% if equals($prog_lang, "php") %}
```php
use OpenTelemetry\API\Globals;

// dd-trace-php automatically configures the MeterProvider
$meter = Globals::meterProvider()->getMeter('my-service');
$counter = $meter->createCounter('requests', 'requests', 'Total number of requests');
$counter->add(1, ['method' => 'GET', 'route' => '/api/users']);
```
{% /if %}

{% if equals($prog_lang, "rust") %}
```rust
use opentelemetry::global;
use opentelemetry::metrics::Counter;
use opentelemetry::KeyValue;

// datadog-opentelemetry automatically configures the MeterProvider
let meter = global::meter("my-service");
let counter: Counter<u64> = meter.u64_counter("requests").build();
counter.add(1, &[KeyValue::new("method", "GET")]);
```
{% /if %}

### Create a histogram

This example uses the OTel Metrics API to create a histogram to track request durations:

{% if equals($prog_lang, "dot_net") %}
```csharp
using System.Diagnostics.Metrics;

// Define a meter
Meter meter = new("MyService", "1.0.0");

// Create a histogram instrument
Histogram<double> responseTimeHistogram = meter.CreateHistogram<double>("http.response.time");

// Perform work
var watch = System.Diagnostics.Stopwatch.StartNew();
await Task.Delay(1_000);
watch.Stop();

// Record measurements
responseTimeHistogram.Record(watch.ElapsedMilliseconds, new("method", "GET"), new("status_code", "200"));
```
{% /if %}

{% if equals($prog_lang, "node_js") %}
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
{% /if %}

{% if equals($prog_lang, "python") %}
```python
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
{% /if %}

{% if equals($prog_lang, "ruby") %}
```ruby
require 'opentelemetry/api'
require 'time'

# dd-trace-rb automatically configures the MeterProvider
meter = OpenTelemetry.meter_provider.meter('my-service', '1.0.0')

# Histogram - distribution of values
histogram = meter.create_histogram('http.request_duration',
  description: 'HTTP request duration',
  unit: 'ms'
)

start_time = Time.now
# ... simulate work ...
sleep(0.05)
end_time = Time.now

duration = (end_time - start_time) * 1000 # convert to milliseconds
histogram.record(duration, attributes: { 'method' => 'POST', 'route' => '/api/users' })
```
{% /if %}

{% if equals($prog_lang, "go") %}
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
{% /if %}

{% if equals($prog_lang, "php") %}
```php
use OpenTelemetry\API\Globals;

// dd-trace-php automatically configures the MeterProvider
$meter = Globals::meterProvider()->getMeter('my-service');
$histogram = $meter->createHistogram('http.request_duration', 'ms', 'HTTP request duration');

$start = microtime(true);
// ... perform work ...
usleep(50000);
$duration = (microtime(true) - $start) * 1000;

$histogram->record($duration, ['method' => 'POST', 'route' => '/api/users']);
```
{% /if %}

{% if equals($prog_lang, "rust") %}
```rust
use opentelemetry::global;
use opentelemetry::KeyValue;
use std::time::Instant;

// Get a meter (assuming MeterProvider is already configured)
let meter = global::meter("my-service");
let histogram = meter.f64_histogram("http.request_duration").build();

// Measure request duration
let start = Instant::now();
// ... perform work ...
std::thread::sleep(std::time::Duration::from_millis(50));
let duration = start.elapsed().as_secs_f64() * 1000.0;

histogram.record(duration, &[
    KeyValue::new("method", "POST"),
    KeyValue::new("route", "/api/users"),
]);
```
{% /if %}

## Supported configuration

To enable this feature, you must set `DD_METRICS_OTEL_ENABLED=true`.

All OTLP exporter settings (such as endpoints, protocols, and timeouts), resource attributes, and temporality preferences are configured using a shared set of OpenTelemetry environment variables.

{% if equals($prog_lang, "rust") %}
### Transport features

The default feature includes gRPC transport. Additional transport options:

- For gRPC transport: `features = ["metrics-grpc"]` (default)
- For HTTP transport: `features = ["metrics-http"]`

**Note**: HTTP/JSON protocol is not supported. Use `grpc` or `http/protobuf` protocols only.
{% /if %}

For a complete list of all shared OTLP environment variables, see [OpenTelemetry Environment Variables Interoperability][204].

## Migrate from other setups

### Existing OTel setup

If you are already using the OpenTelemetry SDK with a manual OTLP exporter configuration, follow these steps to migrate:

{% if equals($prog_lang, "dot_net") %}
1. Add the Datadog SDK (`dd-trace-dotnet`) to your project and enable its instrumentation.
2. Remove any code that manually configures the `OtlpExporter` for metrics. The Datadog SDK handles this configuration automatically.
3. Remove the `OpenTelemetry` and `OpenTelemetry.Exporter.OpenTelemetryProtocol` packages from your project's dependencies.
4. Set the `DD_METRICS_OTEL_ENABLED=true` environment variable.
{% /if %}

{% if equals($prog_lang, "node_js") %}
1. Add the Datadog SDK (`dd-trace`) to your project and enable its instrumentation.
2. Remove any code that manually configures the `OTLPMetricsExporter`. The Datadog SDK handles this configuration automatically.
3. Remove the `@opentelemetry/sdk-node` and `@opentelemetry/exporter-otlp` packages from your project's dependencies.
4. Set the `DD_METRICS_OTEL_ENABLED=true` environment variable.
{% /if %}

{% if equals($prog_lang, "python") %}
1. Add the Datadog SDK (`dd-trace-py`) to your project and enable its instrumentation (for example, `ddtrace-run`).
2. Remove any code that manually configures the `OTLPMetricsExporter`. The Datadog SDK handles this configuration automatically.
3. Set the `DD_METRICS_OTEL_ENABLED=true` environment variable.
{% /if %}

{% if equals($prog_lang, "ruby") %}
1. Add the Datadog SDK (`datadog`) to your project and enable its instrumentation.
2. Remove any code that manually configures the `OTLPMetricsExporter`. The Datadog SDK handles this configuration automatically.
3. Set the `DD_METRICS_OTEL_ENABLED=true` environment variable.

{% alert level="warning" %}
Runtime and trace metrics continue to be submitted using StatsD. Only custom metrics created through the OpenTelemetry Metrics API are sent using OTLP. The `dd-trace-rb` implementation supports exporting OTLP metrics exclusively to a Datadog Agent or OpenTelemetry Collector. Multiple exporters are not supported.
{% /alert %}
{% /if %}

{% if equals($prog_lang, "go") %}
1. Add the Datadog SDK (`dd-trace-go/v2`) to your project and enable its instrumentation.
2. Remove any code that manually configures the `OTLPMetricsExporter`. The Datadog SDK handles this configuration automatically.
3. Set the `DD_METRICS_OTEL_ENABLED=true` environment variable.

{% alert level="warning" %}
Runtime and trace metrics continue to be submitted using StatsD. Only custom metrics created through the OpenTelemetry Metrics API are sent using OTLP. The `dd-trace-go` implementation supports exporting OTLP metrics exclusively to a Datadog Agent or OpenTelemetry Collector. Multiple exporters are not supported.
{% /alert %}
{% /if %}

{% if equals($prog_lang, "php") %}
1. Install the Datadog PHP tracer following the [official installation instructions][400].
2. Remove any code that manually configures the OTLP exporter. The Datadog SDK handles this configuration automatically.
3. Set the `DD_METRICS_OTEL_ENABLED=true` environment variable.
{% /if %}

{% if equals($prog_lang, "rust") %}
1. Add the Datadog SDK (`datadog-opentelemetry`) to your project and enable its instrumentation.
2. Remove any code that manually configures the `OTLPMetricsExporter`. The Datadog SDK handles this configuration automatically.
3. Set the `DD_METRICS_OTEL_ENABLED=true` environment variable.

{% alert level="warning" %}
Runtime and trace metrics continue to be submitted using StatsD. Only custom metrics created through the OpenTelemetry Metrics API are sent using OTLP. The `datadog-opentelemetry` implementation supports exporting OTLP metrics exclusively to a Datadog Agent or OpenTelemetry Collector. Multiple exporters are not supported.
{% /alert %}
{% /if %}

### Existing DogStatsD setup

If you are currently using the Datadog DogStatsD client and want to migrate to the OpenTelemetry Metrics API, you need to update your instrumentation code. The main difference is that OTel metrics are configured using environment variables rather than code, and you create `Instrument` objects first.

## Troubleshooting

- Verify `DD_METRICS_OTEL_ENABLED` is set to `true`.
- Verify that your OTLP destination is configured correctly to receive metrics.
- If you are sending data to the Datadog Agent, verify OTLP ingestion is enabled. See [Enabling OTLP Ingestion on the Datadog Agent][205] for details.
{% if equals($prog_lang, "dot_net") %}
- Verify Datadog automatic instrumentation is active. This feature relies on Datadog's automatic instrumentation to function. Verify you have completed all setup steps to enable the .NET instrumentation hooks, as these are required to intercept the metric data.
- If, after removing the OpenTelemetry SDK packages, your application fails to compile due to missing APIs in the [System.Diagnostics.Metrics namespace][206], you must update your application by either adding a direct NuGet package reference to `System.Diagnostics.DiagnosticSource` or upgrading the version of .NET. See [.NET version and instrument support](#net-version-and-instrument-support) for more information.
{% /if %}
{% if equals($prog_lang, "node_js") %}
- Verify `dd-trace` is initialized first. The Datadog SDK must be initialized at the top of your application, *before* any other modules are imported.
- Verify `@opentelemetry/api` is installed. The Node.js SDK requires this API package.
{% /if %}
{% if equals($prog_lang, "python") %}
- Verify `opentelemetry-sdk` is installed. The Python SDK requires `opentelemetry-sdk` and `opentelemetry-exporter-otlp` to be installed in your Python environment.
- Verify `ddtrace-run` is active. Verify that you are running your application with `ddtrace-run` (or have imported and initialized `ddtrace` manually).
{% /if %}
{% if equals($prog_lang, "ruby") %}
- Verify required gems are installed. Verify `opentelemetry-metrics-sdk` and `opentelemetry-exporter-otlp-metrics` are installed in your Ruby environment.
- Verify `Datadog.configure` is called before `OpenTelemetry::SDK.configure`. The Datadog SDK must be configured first to properly set up the meter provider.
{% /if %}
{% if equals($prog_lang, "go") %}
- Verify `DD_METRICS_OTEL_ENABLED=true` is set. Metrics are disabled by default in dd-trace-go.
- Verify the Datadog SDK is imported: `import "github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry/metric"`
{% /if %}
{% if equals($prog_lang, "php") %}
- Verify OpenTelemetry SDK version. Version 1.0.0 or later is required.
- Verify `open-telemetry/exporter-otlp` package is installed.
- Verify `DD_METRICS_OTEL_ENABLED=true` is set before your application starts.
- Enable debug logging with `DD_TRACE_DEBUG=true` to see detailed logs.
{% /if %}
{% if equals($prog_lang, "rust") %}
- Verify transport features are enabled. Verify `metrics-grpc` or `metrics-http` feature is enabled in your Cargo.toml depending on your protocol choice.
- Check protocol configuration. Only `grpc` and `http/protobuf` protocols are supported. HTTP/JSON is not supported.
- Verify `DD_METRICS_OTEL_ENABLED=true` is set before initializing the meter provider.
{% /if %}

{% if equals($prog_lang, "dot_net") %}
### .NET version and instrument support

Support for specific OpenTelemetry metric instruments is dependent on your .NET runtime version or the version of the `System.Diagnostics.DiagnosticSource` NuGet package you have installed.

Here is the minimum version required for each instrument type:

- **.NET 6+** (or `System.Diagnostics.DiagnosticSource` v6.0.0) supports:
  - `Counter`
  - `Histogram`
  - `ObservableCounter`
  - `ObservableGauge`

- **.NET 7+** (or `System.Diagnostics.DiagnosticSource` v7.0.0) supports:
  - `UpDownCounter`
  - `ObservableUpDownCounter`

- **.NET 9+** (or `System.Diagnostics.DiagnosticSource` v9.0.0) supports:
  - `Gauge`
{% /if %}

{% /if %}
<!-- End metrics support check -->

{% /if %}
<!-- END METRICS CONTENT -->

<!-- ============================================== -->
<!-- LOGS CONTENT -->
<!-- ============================================== -->

{% if equals($platform, "logs") %}

<!-- Show content only for languages that support logs -->
{% if or(equals($prog_lang, "dot_net"), equals($prog_lang, "node_js"), equals($prog_lang, "python")) %}

## Overview

Use the OpenTelemetry Logs API with Datadog SDKs to send custom application logs. This is an alternative to Datadog's traditional log injection.

<!-- Native implementation (.NET, Node.js) -->
{% if or(equals($prog_lang, "dot_net"), equals($prog_lang, "node_js")) %}

The Datadog SDK provides a native implementation of the OpenTelemetry API. This means you can write code against the standard OTel interfaces without needing the official OpenTelemetry SDK.

{% alert level="info" %}
You should not install the official OpenTelemetry SDK or any OTLP Exporter packages. The Datadog SDK provides this functionality. Installing both can lead to runtime conflicts and duplicate data.
{% /alert %}
{% /if %}

<!-- Exporter-based implementation (Python) -->
{% if equals($prog_lang, "python") %}

This approach works with the existing OpenTelemetry SDK. When you enable this feature, the Datadog SDK detects the OTel SDK and configures its OTLP exporter to send logs to the Datadog Agent.
{% /if %}

## Prerequisites

{% if equals($prog_lang, "dot_net") %}
- **Datadog SDK**: `dd-trace-dotnet` version [3.31.0][301] or later.
{% /if %}
{% if equals($prog_lang, "node_js") %}
- **Datadog SDK**: `dd-trace-js` version 5.73.0 or later.
- **OpenTelemetry Logs API**: The `@opentelemetry/api-logs` package is required, in a version from `v0.200.0` up to `v1.0`.

{% alert level="warning" %}
The `@opentelemetry/api-logs` package is still experimental, and version 1.0 has not yet been released. New versions of this package may introduce breaking changes that affect compatibility.

If you encounter an issue after upgrading `@opentelemetry/api-logs`, [open an issue in the `dd-trace-js` repository](https://github.com/DataDog/dd-trace-js/issues).
{% /alert %}
{% /if %}
{% if equals($prog_lang, "python") %}
- **Datadog SDK**: `dd-trace-py` version 3.18.0 or later.
{% /if %}
- **An OTLP-compatible destination**: You must have a destination (Agent or Collector) listening on ports 4317 (gRPC) or 4318 (HTTP) to receive OTel logs.

## Setup

Follow these steps to enable OTel Logs API support in your application.

{% if equals($prog_lang, "dot_net") %}
1. Install the Datadog SDK. Follow the installation steps for your runtime:
   - [.NET Framework][202]
   - [.NET Core][203]
2. Enable OTel logs export by setting the following environment variable:
    ```sh
    export DD_LOGS_OTEL_ENABLED=true
    ```
{% /if %}

{% if equals($prog_lang, "node_js") %}
1. Install the Datadog SDK:
    ```sh
    npm install dd-trace
    ```
2. Install the OpenTelemetry Logs API package:
    ```sh
    npm install @opentelemetry/api-logs
    ```
3. Enable OTel logs export by setting the following environment variable:
    ```sh
    export DD_LOGS_OTEL_ENABLED=true
    ```
4. Initialize the Datadog SDK (`dd-trace`) at the beginning of your application, before any other modules are imported:
    ```javascript
    // This must be the first line of your application
    require('dd-trace').init()

    // Other imports can follow
    const { logs } = require('@opentelemetry/api-logs')
    const express = require('express')
    ```
{% /if %}

{% if equals($prog_lang, "python") %}
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
{% /if %}

## Examples

{% if equals($prog_lang, "dot_net") %}
### Standard logging {% #standard-logging-dotnet %}

```csharp
using Microsoft.Extensions.Logging;

// For a Console application, manually create a logger factory
using var loggerFactory = LoggerFactory.Create(builder =>
{
    builder.SetMinimumLevel(LogLevel.Debug);
});

// Get a logger instance
var logger = loggerFactory.CreateLogger<Program>();

// This log will be exported via OTLP
logger.LogInformation("This is a standard log message.");
```

### Trace and log correlation {% #trace-log-correlation-dotnet %}

This example shows how logs emitted within an active Datadog span are automatically correlated. If you are using the OTel Tracing API or built-in .NET Activity API to create spans, verify OTel Tracing API support is enabled by setting `DD_TRACE_OTEL_ENABLED=true`.

```csharp
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Threading.Tasks;

// For a Console application, manually create a logger factory
using var loggerFactory = LoggerFactory.Create(builder =>
{
    builder.SetMinimumLevel(LogLevel.Debug);
});

// Get a logger instance
var logger = loggerFactory.CreateLogger<Program>();

// Create an activity source
var activitySource = new ActivitySource("MyService", "1.0.0");

// Start an activity (span)
using (var activity = activitySource.StartActivity("do.work"))
{
    // This log is automatically correlated with the 'do.work' span
    logger.LogInformation("This log is correlated to the active span.");
    await Task.Delay(TimeSpan.FromMilliseconds(100));
    logger.LogWarning("So is this one.");
}
```
{% /if %}

{% if equals($prog_lang, "node_js") %}
### Emitting a log {% #emitting-log-nodejs %}

After the Datadog SDK is initialized, you can use the standard OpenTelemetry Logs API to get a logger and emit log records.

```javascript
// Tracer must be initialized first
require('dd-trace').init()

const { logs } = require('@opentelemetry/api-logs')
const logger = logs.getLogger('my-service', '1.0.0')

// Emit a log record
logger.emit({
  severityText: 'INFO',
  severityNumber: 9,
  body: `User clicked the checkout button.`,
  attributes: {
    'cart.id': 'c-12345',
    'user.id': 'u-54321'
  }
})
```

### Trace and log correlation {% #trace-log-correlation-nodejs %}

Trace and log correlation is automatic. When you emit a log using the OTel Logs API within an active Datadog trace, the `trace_id` and `span_id` are automatically added to the log record.

```javascript
// Tracer must be initialized first
require('dd-trace').init()

const { logs } = require('@opentelemetry/api-logs')
const express = require('express')

const app = express()
const logger = logs.getLogger('my-service', '1.0.0')

app.get('/api/users/:id', (req, res) => {
  // This log is automatically correlated with the 'express.request' span
  logger.emit({
    severityText: 'INFO',
    severityNumber: 9,
    body: `Processing user request for ID: ${req.params.id}`,
  })
  res.json({ id: req.params.id, name: 'John Doe' })
})

app.listen(3000)
```
{% /if %}

{% if equals($prog_lang, "python") %}
The Datadog SDK supports the OpenTelemetry Logs API for Python's built-in `logging` module. You do not need to change your existing logging code.

### Standard logging {% #standard-logging-python %}

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

### Trace and log correlation {% #trace-log-correlation-python %}

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
{% /if %}

## Supported configuration

To enable this feature, you must set `DD_LOGS_OTEL_ENABLED=true`.

All OTLP exporter settings (such as endpoints, protocols, and timeouts), resource attributes, and batch processor settings are configured using a shared set of OpenTelemetry environment variables.

For a complete list of all shared OTLP environment variables, see [OpenTelemetry Environment Variables Interoperability][204].

## Migrate from other setups

### Existing OTel setup

If you are already using the OpenTelemetry SDK with a manual OTLP exporter configuration, follow these steps to migrate:

{% if equals($prog_lang, "dot_net") %}
1. Add the Datadog SDK (`dd-trace-dotnet`) to your project and enable its instrumentation.
2. Remove any code that manually configures the `OtlpExporter` for logs. The Datadog SDK handles this configuration automatically.
3. Remove the `OpenTelemetry` and `OpenTelemetry.Exporter.OpenTelemetryProtocol` packages from your project's dependencies.
4. Set the `DD_LOGS_OTEL_ENABLED=true` environment variable.
{% /if %}

{% if equals($prog_lang, "node_js") %}
1. Remove the OTel SDK and OTLP Exporter packages:
    ```sh
    npm uninstall @opentelemetry/sdk-logs @opentelemetry/exporter-otlp-logs
    ```
2. Remove all manual OTel SDK initialization code (for example, `new LoggerProvider()`, `addLogRecordProcessor()`, `new OTLPLogExporter()`).
3. Install the Datadog SDK: `npm install dd-trace`
4. Keep the `@opentelemetry/api-logs` package.
5. Set `DD_LOGS_OTEL_ENABLED=true` and initialize `dd-trace` at the top of your application.

Your existing code that uses `logs.getLogger()` continues to work.
{% /if %}

{% if equals($prog_lang, "python") %}
1. Remove your manual setup code (for example, `LoggerProvider`, `BatchLogRecordProcessor`, and `OTLPLogExporter` instantiation).
2. Enable `ddtrace-run` auto-instrumentation for your application.
3. Set the `DD_LOGS_OTEL_ENABLED=true` environment variable.

The Datadog SDK programmatically configures the OTel SDK for you.
{% /if %}

### Existing Datadog log injection

If you are using Datadog's traditional log injection (where `DD_LOGS_INJECTION=true` adds trace context to text logs) and an Agent to tail log files:

1. Set the `DD_LOGS_OTEL_ENABLED=true` environment variable.
2. The Datadog SDK automatically disables the old log injection style (`DD_LOGS_INJECTION`) to prevent duplicate trace metadata in your logs. Trace correlation is handled by the structured OTLP payload.
3. Verify your Datadog Agent is configured to receive OTLP logs (version 7.48.0 or greater is required)
4. Disable any file-based log collection for this service to avoid duplicate logs.

## Troubleshooting

- Verify `DD_LOGS_OTEL_ENABLED` is set to `true`.
- Verify that your OTLP destination is configured correctly to receive logs.
- If you are sending data to the Datadog Agent, verify OTLP ingestion is enabled. See [Enabling OTLP Ingestion on the Datadog Agent][205] for details.
{% if equals($prog_lang, "dot_net") %}
- Verify Datadog automatic instrumentation is active. This feature relies on Datadog's automatic instrumentation to function. Verify you have completed all setup steps to enable the .NET instrumentation hooks, as these are required to intercept the log data.
{% /if %}
{% if equals($prog_lang, "node_js") %}
- Verify `dd-trace` is initialized first. The Datadog SDK must be initialized at the top of your application, *before* any other modules are imported.
- Verify `@opentelemetry/api-logs` is installed. The Node.js SDK requires this API package.
{% /if %}
{% if equals($prog_lang, "python") %}
- Verify `opentelemetry-sdk` is installed. The Python SDK requires `opentelemetry-sdk` and `opentelemetry-exporter-otlp` to be installed in your Python environment.
- Verify `ddtrace-run` is active. Verify that you are running your application with `ddtrace-run` (or have imported and initialized `ddtrace` manually).
{% /if %}

{% /if %}
<!-- End logs support check -->

{% /if %}
<!-- END LOGS CONTENT -->

<!-- ============================================== -->
<!-- GLOBAL LINK REFERENCES -->
<!-- ============================================== -->

<!-- Java traces -->
[100]: /tracing/setup/java/
[101]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/?tab=wget#compatibility
[102]: /tracing/glossary/#trace
[103]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[104]: https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception
[105]: /tracing/trace_collection/trace_context_propagation/
[106]: /tracing/security
[107]: /tracing/guide/ignoring_apm_resources/

<!-- Python traces -->
[110]: /tracing/setup/python/

<!-- Node.js traces -->
[120]: /tracing/trace_collection/dd_libraries/nodejs#integration-instrumentation
[121]: https://opentelemetry.io/docs/instrumentation/js/automatic/

<!-- Go traces -->
[130]: https://opentelemetry.io/docs/instrumentation/go/manual/

<!-- Ruby traces -->
[140]: https://opentelemetry.io/docs/instrumentation/ruby/manual/
[141]: /tracing/trace_collection/dd_libraries/ruby#integration-instrumentation
[142]: https://opentelemetry.io/docs/languages/ruby/libraries/

<!-- .NET traces -->
[150]: https://opentelemetry.io/docs/instrumentation/net/manual/
[151]: /tracing/trace_collection/dd_libraries/dotnet-framework/#installation-and-getting-started
[152]: /tracing/trace_collection/dd_libraries/dotnet-core/#installation-and-getting-started
[153]: /tracing/trace_collection/single-step-apm/
[154]: https://opentelemetry.io/docs/instrumentation/net/libraries/

<!-- PHP traces -->
[160]: https://opentelemetry.io/docs/languages/php/instrumentation/#instrumentation-setup
[161]: https://opentelemetry.io/docs/instrumentation/php/manual/
[162]: /tracing/trace_collection/dd_libraries/php#getting-started

<!-- Rust traces -->
[170]: https://crates.io/crates/datadog-opentelemetry
[171]: /tracing/trace_collection/library_config/rust
[172]: /tracing/trace_collection/trace_context_propagation/?tab=rust

<!-- Metrics and logs shared -->
[200]: /developers/dogstatsd/
[201]: /tracing/metrics/runtime_metrics/
[202]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-framework/#install-the-tracer
[203]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core#install-the-tracer
[204]: /opentelemetry/config/environment_variable_support
[205]: /opentelemetry/setup/otlp_ingest_in_the_agent/?tab=host#enabling-otlp-ingestion-on-the-datadog-agent
[206]: https://learn.microsoft.com/en-us/dotnet/api/system.diagnostics.metrics
[210]: /logs/log_collection/

<!-- .NET logs -->
[301]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v3.31.0

<!-- PHP metrics -->
[400]: /tracing/trace_collection/dd_libraries/php/#install-the-extension
