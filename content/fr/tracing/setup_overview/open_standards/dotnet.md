---
title: Standards ouverts .NET
kind: documentation
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 70
description: 'Standards ouverts pour .NET'
---

## OpenTracing

Datadog prend également en charge la norme OpenTracing. Pour en savoir plus, consultez l'[API OpenTracing][1].

### Configuration
Pour prendre en charge OpenTracing, ajoutez le [package NuGet][2] `Datadog.Trace.OpenTracing` à votre application. Lors du démarrage de l'application, initialisez la bibliothèque OpenTracing :

```csharp
using Datadog.Trace.OpenTracing;

public void ConfigureServices(IServiceCollection services)
{
    // Créer un iTracer OpenTracing avec les réglages par défaut
    OpenTracing.ITracer tracer = OpenTracingTracerFactory.CreateTracer();

    // Utiliser le traceur avec l'injection de dépendance ASP.NET Core
    services.AddSingleton<ITracer>(tracer);

    // Utiliser le traceur avec OpenTracing.GlobalTracer.Instance
    GlobalTracer.Register(tracer);
}
```

### Instrumenter manuellement une méthode

Utilisez OpenTracing pour créer une span.

```csharp
using (var scope =
       Tracer.Instance.StartActive("manual.sortorders"))
{
    SortOrders();
}
```

### Traces asynchrones

Pour tracer du code exécuté dans une tâche asynchrone, créez un nouveau contexte dans la tâche d'arrière-plan, comme vous le feriez pour wrapper du code synchrone.
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
