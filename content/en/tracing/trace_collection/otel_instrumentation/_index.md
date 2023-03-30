---
title: Custom Instrumentation with OpenTelemetry
kind: documentation
type: multi-code-lang
description: 'Set up custom OpenTelemetry instrumentation to work with Datadog tracing'
aliases:
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Understand APM terminology'
    - link: 'https://www.datadoghq.com/blog/opentelemetry-instrumentation/'
      tag: 'Blog'
      text: 'Learn More about Datadog and the OpenTelemetry initiative'
---

Custom instrumentation allows programmatic creation, modification, or deletion of traces to send to Datadog, over and above the default automatic instrumentation from the tracing libraries. This section describes how to custom instrument your code using the OpenTelemetry (OTel) API rather than the Datadog tracing API.

This custom instrumentation provides an alternate way to custom (manually) instrument your code. The OTel API maps to the Datadog Tracing Library API through the OTel Datadog Trace Provider, which is then used to send your traces to Datadog. If you're looking for a way to auto-instrument your code with OpenTelemetry and then send it to Datadog without going through the Datadog Tracing API, see [Trace Collection Through OpenTelemetry][1]


{{< partial name="apm/apm-otel-instrumentation.html" >}}


<br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/otel_tracing/
