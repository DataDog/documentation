---
title: Custom Instrumentation with Datadog Libraries
type: multi-code-lang
description: 'Customize your instrumentation and observability within your Datadog traces.'
aliases:
    - /tracing/setup/php/manual-installation
    - /agent/apm/php/manual-installation
    - /tracing/guide/distributed_tracing/
    - /tracing/advanced/manual_instrumentation/
    - /tracing/advanced/opentracing/
    - /tracing/opentracing/
    - /tracing/manual_instrumentation/
    - /tracing/guide/adding_metadata_to_spans
    - /tracing/advanced/adding_metadata_to_spans/
    - /tracing/custom_instrumentation
    - /tracing/setup_overview/custom_instrumentation/undefined
    - /tracing/setup_overview/custom_instrumentation/
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
  tags: ['apm custom instrumentation']
---

Custom instrumentation allows programmatic creation, modification, or deletion of traces to send to Datadog. This is useful for tracing in-house code not captured by automatic instrumentation, removing unwanted spans from traces, and for providing deeper visibility and context into spans, including adding any desired span tags.

Before instrumenting your application, review Datadog's [APM Terminology][2] and familiarize yourself with the core concepts of Datadog APM.

If you use an open standard to instrument your code, see [Instrumenting with OpenTracing][3] or [Instrumenting with OpenTelemetry][4].

{{< partial name="apm/apm-manual-instrumentation.html" >}}


<br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[2]: /tracing/glossary
[3]: /tracing/trace_collection/opentracing/
[4]: /tracing/trace_collection/otel_instrumentation
