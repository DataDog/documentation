---
title: Custom Instrumentation
kind: documentation
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
---

Custom instrumentation allows programmatic creation, modification, or deletion of traces to send to Datadog. This is useful for tracing in-house code not captured by automatic instrumentation, removing unwanted spans from traces, as well as for providing deeper visibility and context into spans, including adding any desired [span tags][1].

Before instrumenting your application, review Datadog’s [APM Terminology][2] and familiarize yourself with the core concepts of Datadog APM.

If you’re already using OpenTracing or OpenTelemetry, see [OpenTracing and OpenTelemetry][3].

{{< partial name="apm/apm-manual-instrumentation.html" >}}


<br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/guide/add_span_md_and_graph_it/
[2]: /tracing/glossary
[3]: /opentelemetry/otel_tracing/
