---
title: OpenTracing .NET
kind: documentation
description: 'Appliquez la norme OpenTracing au traceur de l''APM .NET de Datadog.'
further_reading:
    - link: tracing/connect_logs_and_traces
      tag: Documentation
      text: Associer vos logs à vos traces
    - link: tracing/manual_instrumentation
      tag: Documentation
      text: Instrumenter vos applications manuellement pour créer des traces
    - link: tracing/visualization/
      tag: Documentation
      text: Explorer vos services, ressources et traces
---

Pour prendre en charge OpenTracing, ajoutez le paquet NuGet [`Datadog.Trace.OpenTracing`][1] à votre application. Lors du démarrage de l'application, initialisez la bibliothèque OpenTracing :

```csharp
using Datadog.Trace.OpenTracing;

public void ConfigureServices(IServiceCollection services)
{
    // créer un iTracer OpenTracing avec les réglages par défaut
    OpenTracing.ITracer tracer = OpenTracingTracerFactory.CreateTracer();

    // pour utiliser le traceur avec l'injection de dépendance ASP.NET Core 
    services.AddSingleton<ITracer>(tracer);

    // pour utiliser le traceur avec OpenTracing.GlobalTracer.Instance Core
    GlobalTracer.Register(tracer);
}
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.nuget.org/packages/Datadog.Trace.OpenTracing
