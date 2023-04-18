---
title: Custom Instrumentation of Go Applications with the OpenTelemetry API
kind: documentation
description: 'Instrument your Go application with OTel API to send traces to Datadog'
code_lang: go
type: multi-code-lang
code_lang_weight: 30
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

{{% otel-custom-instrumentation %}}

## Requirements and limitations

tktk Go Requirements

The following OTel features implemented in the Datadog library as noted:

| Feature                               | Support notes                       |
|---------------------------------------|------------------------------------|
| [OTel Context propagation][1]         | [Datadog distributed header format][9] is used instead. | 
| [Span processors][2]                  | Unsupported                                          | 
| [Span Exporters][3]                   | Unsupported                                            |
| Trace/span [ID generators][4]         | ID generation is performed by `ddtrace`.           |


## Configuring OTel to use the Datadog trace provider

1. Add your desired manual OTel instrumentation to your Go code following the [OTel Go Manual Instrumentation documentation][5].
1. tktk add library
1. tktk config otel
1. tktk config tracing


Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application. 


[1]: https://opentelemetry.io/docs/instrumentation/go/manual/#propagators-and-context
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/go/manual/
[9]: /tracing/trace_collection/trace_context_propagation/go/
