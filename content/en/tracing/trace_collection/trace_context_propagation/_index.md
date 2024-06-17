---
title: Trace Context Propagation
type: multi-code-lang
description: 'Extract and inject Datadog, B3, and W3C Trace Context headers to propagate the context of a distributed trace.'
aliases:
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Understand APM terminology'
    - link: 'https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/'
      tag: 'Blog'
      text: 'Monitor OpenTelemetry-instrumented apps with support for W3C Trace Context'
    - link: '/opentelemetry/guide/otel_api_tracing_interoperability'
      tag: 'Documentation'
      text: 'Interoperability of OpenTelemetry API and Datadog instrumented traces'
---

Trace Context propagation is the mechanism of passing tracing information like Trace ID, Span ID, and sampling decisions from one part of a distributed application to another. This enables all traces (and additional telemetry) in a request to be correlated. When automatic instrumentation is enabled, trace context propagation is handled automatically by the tracing library.

## Supported Propagators
Datadog maintains several propagators for passing trace context information in different formats:
- Datadog
- [W3C Trace Context][2]
- [B3 Single][3]
- [B3 Multi][4]
- [AWS X-Ray][5]*
  - Note: This is only supported in the Java tracing library

## Configuration
By default, the Datadog tracing libraries propagate trace context information using both the Datadog format and the W3C Trace Context format.

For more information about each language's configuration options for trace context propagation, see the following pages:

{{< partial name="apm/apm-context-propagation" >}}


<br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/otel_tracing/
[2]: https://www.w3.org/TR/trace-context/
[3]: https://github.com/openzipkin/b3-propagation#single-header
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html#xray-concepts-tracingheader