---
title: Custom Instrumentation of Java Applications with the OpenTelemetry API
kind: documentation
description: 'Instrument your Java application with OpenTelemetry API to send traces to Datadog.'
code_lang: java
type: multi-code-lang
code_lang_weight: 0
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
    - link: '/opentelemetry/guide/otel_api_tracing_interoperability'
      tag: 'Documentation'
      text: 'Interoperability of OpenTelemetry API and Datadog instrumented traces'
---

{{% otel-custom-instrumentation %}}

## Requirements and limitations

- Datadog Java tracing library `dd-trace-java` version 1.10.0 or greater.

The following OpenTelemetry features implemented in the Datadog library as noted:

| Feature                               | Support notes                       |
|---------------------------------------|-------------------------------------------|
| [OpenTelemetry Context propagation][1]         | [Datadog and W3C Trace Context header formats][9] are enabled by default. | 
| [Span processors][2]                  | Unsupported                                          | 
| [Span Exporters][3]                   | Unsupported                                            |
| Trace/span [ID generators][4]         | ID generation is performed by the tracing library, with support for [128-bit trace IDs][12].    |


## Configuring OpenTelemetry to use the Datadog tracing library

1. Add your desired manual OpenTelemetry instrumentation to your Java code following the [OpenTelemetry Java Manual Instrumentation documentation][5]. **Important!** Where those instructions indicate that your code should call the OpenTelemetry SDK, call the Datadog tracing library instead.

1. Add the [Datadog tracing library to the JVM][11]. **Beta:** You can optionally do this with [One-Step APM Instrumentation][13].

1. Set the `dd.trace.otel.enabled` system property to `true`.

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/java/manual/#context-propagation
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/java/manual/
[8]: https://opentelemetry.io/docs/instrumentation/java/automatic/
[9]: /tracing/trace_collection/trace_context_propagation/java/
[11]: /tracing/trace_collection/dd_libraries/java/?tab=springboot#add-the-java-tracer-to-the-jvm
[12]: /opentelemetry/guide/otel_api_tracing_interoperability/
[13]: /tracing/trace_collection/single-step-apm/