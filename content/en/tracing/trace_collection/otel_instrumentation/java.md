---
title: Custom Instrumentation of Java Applications with the OpenTelemetry API
kind: documentation
description: 'Instrument your Java application with OTel API to send traces to Datadog.'
code_lang: java
type: multi-code-lang
code_lang_weight: 0
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

{{% otel-custom-instrumentation %}}

## Requirements and limitations

- Datadog Java tracing library `dd-trace-java` version 1.10.0 or greater.

The following OTel features implemented in the Datadog library as noted:

| Feature                               | Support notes                       |
|---------------------------------------|-------------------------------------------|
| [OTel Context propagation][1]         | [Datadog distributed header format][9] is used instead. | 
| [Span processors][2]                  | Unsupported                                          | 
| [Span Exporters][3]                   | Unsupported                                            |
| Trace/span [ID generators][4]         | ID generation is performed by `ddtrace`.           |


## Configuring OTel to use the Datadog tracing library

1. Add your desired manual OTel instrumentation to your Java code following the [OTel Java Manual Instrumentation documentation][5].
1. Add the [Datadog tracing library to the JVM][11].
1. Set the `dd.trace.otel.enabled` system property to `true`.

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application.


[1]: https://opentelemetry.io/docs/instrumentation/java/manual/#context-propagation
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/java/manual/
[8]: https://opentelemetry.io/docs/instrumentation/java/automatic/
[9]: /tracing/trace_collection/trace_context_propagation/java/
[11]: /tracing/trace_collection/dd_libraries/java/?tab=springboot#add-the-java-tracer-to-the-jvm