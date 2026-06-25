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

Datadog SDKs work with OpenTelemetry in two ways:

- They can export telemetry in [OpenTelemetry Protocol (OTLP)][1] format to any OTLP-compatible receiver or backend.
- They provide an implementation of the [OpenTelemetry API][2], so you can instrument your services with vendor-neutral APIs while still taking advantage of Datadog's native implementation, features, and products.

## Export data in OTLP format

Datadog SDKs can export telemetry in [OTLP][1] format to any OTLP-compatible receiver or backend, including [DDOT][3] or any OpenTelemetry Collector. During Preview, OTLP export supports traces only.

For prerequisites, language support, setup steps, and limitations, see [Export Traces from Datadog SDKs in OTLP Format][4].

## OpenTelemetry API support

Datadog SDKs provide an implementation of the [OpenTelemetry API][2] for traces, metrics, and logs. You can maintain vendor-neutral instrumentation of your services while still taking advantage of Datadog's native platform and products like [Continuous Profiler][5], [Data Streams Monitoring][6], [App and API Protection][7], and [Live Processes][8].

For setup steps and per-language guidance, see [OpenTelemetry API support][9].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/specs/otlp/
[2]: https://opentelemetry.io/docs/specs/otel/trace/api/
[3]: /opentelemetry/setup/ddot_collector/
[4]: /opentelemetry/instrument/dd_sdks/otlp_trace_export/
[5]: /profiler/
[6]: /data_streams/
[7]: /security/application_security/
[8]: /infrastructure/process
[9]: /opentelemetry/instrument/dd_sdks/api_support/
