---
title: .NET OpenTracing Instrumentation
aliases:
- /tracing/setup_overview/open_standards/dotnet
- /tracing/trace_collection/open_standards/dotnet
- /tracing/trace_collection/opentracing/dotnet/
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 70
description: 'OpenTracing instrumentation for .NET'
further_reading:
    - link: 'tracing/trace_collection/trace_context_propagation/dotnet/'
      text: 'Propagating trace context'
---

<div class="alert alert-info">OpenTracing support is based on a deprecated specification. If you want to instrument your code with an open spec, use OpenTelemetry instead. Try the beta support for <a href="/tracing/trace_collection/otel_instrumentation/dotnet/">processing data from OpenTelemetry instrumentation in Datadog Tracing Libraries</a>.</div>

For more details and information, view the [OpenTracing API][1].

## Setup
For OpenTracing support, add the `Datadog.Trace.OpenTracing` [NuGet package][2] to your application. During application start-up, initialize the OpenTracing SDK:

```csharp
using Datadog.Trace.OpenTracing;

public void ConfigureServices(IServiceCollection services)
{
    // Create an OpenTracing ITracer with the default setting
    OpenTracing.ITracer tracer = OpenTracingTracerFactory.CreateTracer();

    // Use the tracer with ASP.NET Core dependency injection
    services.AddSingleton<ITracer>(tracer);

    // Use the tracer with OpenTracing.GlobalTracer.Instance
    GlobalTracer.Register(tracer);
}
```

## Manually instrument a method

Use OpenTracing to create a span.

```csharp
using (IScope scope = GlobalTracer.Instance.BuildSpan("manual.sortorders").StartActive(finishSpanOnDispose: true))
{
    scope.Span.SetTag("resource.name", "<RESOURCE NAME>");
    SortOrders();
}
```

## Asynchronous traces

To trace code running in an asynchronous task, create a new scope within the background task, just as you would wrap synchronous code.
```csharp
 Task.Run(
     () =>
     {
         using (IScope scope = GlobalTracer.Instance.BuildSpan("manual.sortorders").StartActive(finishSpanOnDispose: true))
         {
             scope.Span.SetTag("resource.name", "<RESOURCE NAME>");
             SortOrders();
         }
     });

```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/opentracing/opentracing-csharp
[2]: https://www.nuget.org/packages/Datadog.Trace.OpenTracing
