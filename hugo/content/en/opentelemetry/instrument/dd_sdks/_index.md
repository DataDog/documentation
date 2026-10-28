---
title: Using Datadog SDKs with OpenTelemetry
description: Use a Datadog SDK with OpenTelemetry in DDOT setup, which exports OTLP to your Collector, or with the OpenTelemetry API in a setup that sends data to the Datadog Agent.
further_reading:
    - link: '/opentelemetry/setup/ddot_collector/'
      text: 'DDOT Collector'
      tag: 'Documentation'
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
algolia:
  tags: ['otel custom instrumentation']
---

Datadog SDKs work with OpenTelemetry in two setups:

- **DDOT setup** (Preview): The Datadog SDK runs as a Datadog OpenTelemetry (DDOT) SDK. It exports your telemetry as [OTLP][1] to your OpenTelemetry Collector, such as the DDOT Collector, instead of sending it to the Datadog Agent.
- **With the Datadog Agent**: The Datadog SDK keeps sending data to the Datadog Agent, and you instrument your services with the [OpenTelemetry API][2].

You can use the OpenTelemetry API in both setups.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/dd_sdks/ddot_setup/" >}}
    <h3>Set up DDOT SDKs</h3>
    Turn on DDOT SDKs on Kubernetes with the OpenTelemetry Operator, and send OTLP to your Collector.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/instrument/dd_sdks/api_support/" >}}
    <h3>Use the OpenTelemetry API</h3>
    Instrument your services with the OpenTelemetry API while you use Datadog features and products.
    {{< /nextlink >}}
{{< /whatsnext >}}

<div class="alert alert-info"><strong>Comparing setups?</strong><br> See the <a href="/opentelemetry/compatibility/#feature-compatibility">feature compatibility table</a> to understand which Datadog features each setup supports.</div>

## Configure and extend

These pages apply to both setups unless they say otherwise. Each one states where its steps assume the Datadog Agent.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/dd_sdks/otlp_trace_export/" >}}
    <h3>Export traces in OTLP format</h3>
    Minimum versions and settings for exporting traces from a Datadog SDK as OTLP, on any platform. In Preview.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/instrument/dd_sdks/instrumentation_libraries/" >}}
    <h3>Instrumentation Libraries</h3>
    Add OpenTelemetry instrumentation libraries to capture telemetry from third-party components alongside Datadog SDK instrumentation.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/environment_variable_support/" >}}
    <h3>Configuration</h3>
    Configure Datadog SDKs with OpenTelemetry SDK environment variables.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/specs/otlp/
[2]: https://opentelemetry.io/docs/specs/otel/trace/api/
