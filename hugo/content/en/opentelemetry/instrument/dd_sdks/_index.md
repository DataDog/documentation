---
title: Using Datadog SDKs with OpenTelemetry
description: Export telemetry in OTLP format from Datadog SDKs, or use the OpenTelemetry API with Datadog SDKs to keep vendor-neutral instrumentation.
further_reading:
    - link: '/opentelemetry/setup/ddot_collector/'
      text: 'Datadog Distribution of the OpenTelemetry Collector (DDOT)'
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

Datadog SDKs work with OpenTelemetry in two independent ways. Exporting telemetry in [OpenTelemetry Protocol (OTLP)][1] format controls how telemetry is sent. The [OpenTelemetry API][2] controls how you instrument your services. These can be enabled separately, but using them together provides an OpenTelemetry-native experience.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/dd_sdks/otlp_trace_export/" >}}
    <h3>Export traces in OTLP format</h3>
    Export traces from a Datadog SDK in OTLP format to DDOT or any OpenTelemetry Collector, instead of sending them to the Datadog Agent. In Preview.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/instrument/dd_sdks/api_support/" >}}
    <h3>Use the OpenTelemetry API</h3>
    Instrument your services with vendor-neutral OpenTelemetry APIs while taking advantage of Datadog's native features and products.
    {{< /nextlink >}}
{{< /whatsnext >}}

<div class="alert alert-info"><strong>Comparing setups?</strong><br> See the <a href="/opentelemetry/compatibility/#feature-compatibility">feature compatibility table</a> to understand which Datadog features each setup supports.</div>

## Configure and extend

{{< whatsnext desc=" " >}}
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
