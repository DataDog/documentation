---
title: Custom Instrumentation of .NET Applications with the OpenTelemetry API
kind: documentation
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 80
description: 'Instrument your .NET application with OpenTelemetry API, to send traces to Datadog.'
aliases:
- /tracing/trace_collection/otel_instrumentation/dotnet/
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

- Datadog .NET tracing library `dd-trace-dotnet` version 2.21.0 or greater.

The following OpenTelemetry features implemented in the Datadog library as noted:

| Feature                               | Support notes                                           |
|---------------------------------------|---------------------------------------------------------|
| OpenTelemetry Context propagation     | [W3C Trace Context and Datadog header formats][9] are enabled by default.  |
| [Span processors][2]                  | Unsupported                                             |
| [Span Exporters][3]                   | Unsupported                                             |
| Trace/span [ID generators][4]         | ID generation is performed by the tracing library, with support for [128-bit trace IDs][12].  |


## Configuring OpenTelemetry to use the Datadog trace provider

1. Add your desired manual OpenTelemetry instrumentation to your .NET code following the [OpenTelemetry .NET Manual Instrumentation documentation][5]. **Important!** Where those instructions indicate that your code should call the OpenTelemetry SDK, call the Datadog tracing library instead.

2. Install the Datadog .NET tracing library and enable the tracer for your [.NET Framework service][10] or your [.NET Core (and .NET 5+) service][11]. **Beta:** You can optionally do this with [One-Step APM Instrumentation][13].

3. Set `DD_TRACE_OTEL_ENABLED` environment variable to `true`.

4. Run your application.

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application. It supports [OpenTelemetry instrumentation libraries][8] also.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/net/manual/
[8]: https://opentelemetry.io/docs/instrumentation/net/libraries/
[9]: /tracing/trace_collection/trace_context_propagation/dotnet/
[10]: /tracing/trace_collection/dd_libraries/dotnet-framework/#installation-and-getting-started
[11]: /tracing/trace_collection/dd_libraries/dotnet-core/#installation-and-getting-started
[12]: /opentelemetry/guide/otel_api_tracing_interoperability/
[13]: /tracing/trace_collection/single-step-apm/