---
title: .NET Open Standards
kind: documentation
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 70
description: 'Open Standards for .NET'
---

## OpenTracing

Datadog also supports the OpenTracing standard.  For more details and information, view the [OpenTracing API][1].

### Setup
For OpenTracing support, add the `Datadog.Trace.OpenTracing` [NuGet package][2] to your application. During application start-up, initialize the OpenTracing library:

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

### Manually instrument a method

Use OpenTracing to create a span.

```csharp
using (var scope =
       Tracer.Instance.StartActive("manual.sortorders"))
{
    SortOrders();
}
```

### Asynchronous traces

To trace code running in an asynchronous task, create a new scope within the background task, just as you would wrap synchronous code.
```csharp
 Task.Run(
     () =>
     {
         using (var scope =
                Tracer.Instance.StartActive("manual.sortorders.async"))
         {
             SortOrders();
         }
     });

```


[1]: https://github.com/opentracing/opentracing-csharp
[2]: https://www.nuget.org/packages/Datadog.Trace.OpenTracing
