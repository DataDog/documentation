---
title: .NET OpenTelemetry Instrumentation
kind: documentation
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 80
description: 'Instrument your .NET application with OTel API, to send traces to Datadog.'
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

{{% otel-custom-instrumentation %}}

## Requirements and limitations

tktk .NET requirements

The following OTel features implemented in the Datadog library as noted:

| Feature                               | Support notes                       |
|---------------------------------------|-------------|-----------------------------|
| [OTel Context propagation][1]         | [Datadog distributed header format][9] is used instead. | 
| [Span processors][2]                  | Unsupported                                          | 
| [Span Exporters][3]                   | Unsupported                                            |
| `OpenTelemetry.logger`                | `OpenTelemetry.logger` is set to the same object as `Datadog.logger`. Configure through [custom logging][10]. |
| Trace/span [ID generators][4]         | ID generation is performed by `ddtrace`.           |


## Configuring OTel to use the Datadog trace provider

1. Add your desired manual OTel instrumentation to your .NET code following the [OTel .NET Manual Instrumentation documentation][5].
1. tktk add library
1. tktk config otel
1. tktk config tracing

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application. It supports [OpenTelemetry Automatic instrumentation][8] also.


[1]: https://opentelemetry.io/docs/instrumentation/net/manual/#context-propagation
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/net/manual/
[8]: https://opentelemetry.io/docs/instrumentation/net/automatic/
[9]: /tracing/trace_collection/trace_context_propagation/dotnet/
