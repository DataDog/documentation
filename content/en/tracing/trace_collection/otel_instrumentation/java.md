---
title: Java OTel Custom Instrumentation
kind: documentation
description: 'Custom instrument your Java application with OTel API to send traces to Datadog.'
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

tktk Java requirements

The following OTel features are not implemented by the Datadog Trace Provider:

| Feature                               | Support?    | Notes                       |
|---------------------------------------|-------------|-----------------------------|
| [OTel Context propagation][1]         | Unsupported | [Datadog distributed header format][9] is used instead. | 
| [Span processors][2]                  | Unsupported |                                                    | 
| [Span Exporters][3]                   | Unsupported |                                                    |
| `OpenTelemetry.logger`                | Special     | `OpenTelemetry.logger` is set to the same object as `Datadog.logger`. |
| Trace/span [ID generators][4]         | Special     | ID generation is performed by `ddtrace`.           |


## Configuring OTel to use the Datadog trace provider

1. Add your desired manual OTel instrumentation to your Java code following the [OTel Java Manual Instrumentation documentation][5].
1. tktk add library
1. tktk config otel
1. tktk config tracing

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application. It supports [OpenTelemetry Automatic instrumentation][8] also.


[1]: https://opentelemetry.io/docs/instrumentation/java/manual/#context-propagation
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/java/manual/
[8]: https://opentelemetry.io/docs/instrumentation/java/automatic/
[9]: /tracing/trace_collection/trace_context_propagation/java/
