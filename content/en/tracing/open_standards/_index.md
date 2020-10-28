---
title: Open Standards
kind: documentation
description: 'Use Open standards to generate your application traces'
aliases:
further_reading:
    - link: 'https://www.datadoghq.com/blog/opentelemetry-instrumentation/'
      text: 'Learn More about Datadog and the OpenTelemetry initiative'
---

Custom instrumentation allows programmatic creation, modification, or deletion of traces to send to Datadog. This is useful for tracing in-house code not captured by automatic instrumentation, removing unwanted spans from traces, as well as for providing deeper visibility and context into spans, including adding any desired [span tags][1].

Before instrumenting your application, review Datadog’s [APM Terminology][2] and familiarize yourself with the core concepts of Datadog APM.

If you’re already using OpenTracing, choose your language below and proceed to the OpenTracing section.

{{< partial name="apm/apm-manual-instrumentation.html" >}}


<br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/guide/add_span_md_and_graph_it/
[2]: /tracing/visualization
