---
title: Datadog SDKs with OpenTelemetry
description: Use a Datadog SDK with OpenTelemetry, as a DDOT SDK that sends OTLP to your Collector, or with the Datadog Agent.
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

A Datadog SDK works with OpenTelemetry in two setups:

| Setup | Where the SDK sends data | Start here |
|---|---|---|
| **DDOT SDK** (Preview) | Your OpenTelemetry Collector, as [OTLP][1] | [Set Up DDOT SDKs][3] |
| **Datadog SDK with the Agent** | The Datadog Agent | [OpenTelemetry API Support][4] |

A Datadog OpenTelemetry (DDOT) SDK is the Datadog SDK for your language, set to send OpenTelemetry data to your Collector. In both setups, you can use the [OpenTelemetry API][2]. Support varies by language and signal. See [OpenTelemetry API Support][4].

To check which Datadog features each setup supports, see [Feature Compatibility][5].

## Configure and extend

Check each page for the setup and languages it covers.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/dd_sdks/api_support/" >}}
    <h3>Use the OpenTelemetry API</h3>
    Add custom spans, metrics, and logs with the OpenTelemetry API, for each language.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/instrument/dd_sdks/otlp_trace_export/" >}}
    <h3>Export traces in OTLP format</h3>
    Export traces from a Datadog SDK as OTLP. Minimum versions and settings for each language. In Preview.
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
[3]: /opentelemetry/instrument/dd_sdks/ddot_setup/
[4]: /opentelemetry/instrument/dd_sdks/api_support/
[5]: /opentelemetry/compatibility/#feature-compatibility
