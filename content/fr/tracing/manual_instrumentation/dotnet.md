---
title: Instrumentation manuelle .NET
kind: documentation
decription: Instrumentez manuellement votre application .NET afin d'envoyer des traces personnalisées à Datadog.
further_reading:
  - link: tracing/guide/instrument_custom_method
    tag: Guide
    text: Instrumenter une méthode personnalisée pour analyser en détail votre logique opérationnelle
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: Associer vos logs à vos traces
  - link: tracing/opentracing
    tag: Documentation
    text: Implémenter Opentracing dans vos applications
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
---
Si vous n'utilisez pas de bibliothèques compatibles avec l'instrumentation automatique (voir les [intégrations][1]), vous pouvez instrumenter manuellement votre code.

L'exemple suivant utilise le `Tracer` global et crée une [span][2] personnalisée pour [tracer][3] une requête Web :

```csharp
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("web.request"))
{
    var span = scope.Span;
    span.Type = SpanTypes.Web;
    span.ResourceName = request.Url;
    span.SetTag(Tags.HttpMethod, request.Method);

    // à vous de jouer…
}
```


### Définition des erreurs

Pour identifier et signaler les erreurs qui surviennent dans votre code, utilisez la méthode  `Span.SetException(Exception)` pour vos spans. Cette méthode signale que la span est une erreur et ajoute les [métadonnées de span associées][4] afin de fournir des informations pertinentes sur l'exception générée.

```csharp
try
{
    // ajouter une tâche qui génère une exception
}
catch(Exception e)
{
    span.SetException(e);
}
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup/dotnet/#integrations
[2]: /fr/tracing/visualization/#spans
[3]: /fr/tracing/visualization/#trace
[4]: /fr/tracing/visualization/trace/?tab=spantags#more-information