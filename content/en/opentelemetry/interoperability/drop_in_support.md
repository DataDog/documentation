---
title: Using OpenTelemetry Instrumentations with Datadog SDKs
further_reading:
    - link: 'tracing/guide/instrument_custom_method'
      text: 'Instrument a custom method to get deep visibility into your business logic'
    - link: 'tracing/connect_logs_and_traces'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/visualization/'
      text: 'Explore your services, resources, and traces'
    - link: 'https://www.datadoghq.com/blog/opentelemetry-instrumentation/'
      text: 'Learn More about Datadog and the OpenTelemetry initiative'
algolia:
  tags: ['otel drop-in instrumentation']
---

Instrumentation is the act of adding observability code to an application. Automatic instrumentation is a way to instrument applications and libraries without touching their source code. Both OpenTelemetry and Datadog provide instrumentations as part of their SDKs, with varying amounts of coverage between them.

Datadog SDKs support adding instrumentations from OpenTelemetry alongside their original instrumentations. This gives users the same experience using OpenTelemetry instrumentations with Datadog SDKs as with the OpenTelemetry SDK.

To learn more, follow the link for your language:

{{< partial name="apm/otel-drop-in-support.html" >}}

<br>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
