---
title: Custom Instrumentation
kind: documentation
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

## Overview

Custom instrumentation allows for precise monitoring of specific components in your application. It allows you to capture observability data from in-house code or complex functions that aren't captured by automatic instrumentation. Automatic instrumentation includes [local library injection][6] or [single step instrumentation][5].

Custom instrumentation involves embedding tracing code directly into your application code. This allows for the programmatic creation, modification, or deletion of traces to send to Datadog. 

## Getting started

Follow the relevant documentation for your custom instrumentation approach to learn more:

- [Datadog libraries][2]
- [OpenTelemetry][3]
- [OpenTracing][4]

## Use cases

Some situations when you might use custom instrumentation include:

- Collecting observability data from custom code with unique or complex business logic.
- Providing deeper visibility and context into spans, including adding [span tags][1].
- Precisely monitoring specific sequences of operations or user interactions that require fine-grained control.
- Removing unwanted spans from traces.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/add_span_md_and_graph_it/
[2]: /tracing/trace_collection/custom_instrumentation/dd_libraries/
[3]: /tracing/trace_collection/custom_instrumentation/otel_instrumentation
[4]: /tracing/trace_collection/custom_instrumentation/opentracing/
[5]: /tracing/trace_collection/single-step-apm
[6]: /tracing/trace_collection/library_injection_local


