---
title: Custom Instrumentation of .NET Applications with the OpenTelemetry API
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

- Datadog .NET tracing library `dd-trace-dotnet` version 2.21.0 or greater

The following OTel features implemented in the Datadog library as noted:

| Feature                               | Support notes                       |
|---------------------------------------|-------------|-----------------------------|
| OTel Context propagation              | [Datadog distributed header format][9] is used instead. |
| [Span processors][2]                  | Unsupported                                          |
| [Span Exporters][3]                   | Unsupported                                            |
| Trace/span [ID generators][4]         | ID generation is performed by `ddtrace`.           |


## Configuring OTel to use the Datadog trace provider

1. Add your desired manual OTel instrumentation to your .NET code following the [OTel .NET Manual Instrumentation documentation][5].
2. Install the Datadog .NET tracing library and enable the tracer for your [.NET Framework service][10] or your [.NET Core (and .NET 5+) service][11].
3. Set `DD_TRACE_OTEL_ENABLED` environment variable to `true`.
4. Run your application.

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application. It supports [OpenTelemetry instrumentation libraries][8] also.


[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/net/manual/
[8]: https://opentelemetry.io/docs/instrumentation/net/libraries/
[9]: /tracing/trace_collection/trace_context_propagation/dotnet/
[10]: /tracing/trace_collection/dd_libraries/dotnet-framework/#installation-and-getting-started
[11]: /tracing/trace_collection/dd_libraries/dotnet-core/#installation-and-getting-started
