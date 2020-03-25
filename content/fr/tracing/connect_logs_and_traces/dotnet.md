---
title: Associer des traces et des logs .NET
kind: documentation
description: Associez vos traces à vos logs .NET pour les mettre en corrélation dans Datadog.
further_reading:
  - link: tracing/manual_instrumentation
    tag: Documentation
    text: Instrumenter vos applications manuellement pour créer des traces
  - link: tracing/opentracing
    tag: Documentation
    text: Implémenter Opentracing dans vos applications
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
  - link: 'https://www.datadoghq.com/blog/request-log-correlation/'
    tag: Blog
    text: Corréler automatiquement des logs de requête avec des traces
---
## Injection automatique d'ID de trace

Activez l'injection dans la [configuration][1] du traceur .NET en définissant `DD_LOGS_INJECTION=true` via les variables d'environnement ou dans les fichiers de configuration.

Le traceur .NET utilise la bibliothèque [LibLog][2] pour injecter automatiquement les ID des traces dans vos logs d'application si vous utilisez [Serilog][3], [NLog][4] (version 2.0.0.2000+) ou [log4net][5]. Pour que les ID injectés automatiquement s'affichent dans les logs d'application, vous devez avoir activé l'enrichissement `LogContext` dans votre logger `Serilog`, ou `Mapped Diagnostics Context` dans votre logger `NLog` ou `log4net` (voir les exemples ci-dessous).

**Remarque** : l'injection automatique fonctionne uniquement pour les logs au format JSON.

{{< tabs >}}
{{% tab "Serilog" %}}

```csharp
var log = new LoggerConfiguration()
    // Ajouter Enrich.FromLogContext pour injecter les propriétés du MDC
    .Enrich.FromLogContext()
    .WriteTo.File(new JsonFormatter(), "log.json")
    .CreateLogger();
```

{{% /tab %}}
{{% tab "log4net" %}}

```xml
  <layout type="log4net.Layout.SerializedLayout, log4net.Ext.Json">
    <decorator type="log4net.Layout.Decorators.StandardTypesDecorator, log4net.Ext.Json" />
    <default />
    <!--Membres par défaut explicites-->
    <remove value="ndc" />
    <remove value="message" />
    <!--Supprimer le membre du message préformaté par défaut-->
    <member value="message:messageobject" />
    <!--Ajouter le message brut-->

    <!-- Ajouter value='properties' pour injecter les propriétés du MDC -->
    <member value='properties'/>
  </layout>
```

{{% /tab %}}
{{% tab "NLog" %}}

Pour les versions 4.6 et ultérieures de NLog :

```xml
  <!-- Ajouter includeMdlc="true" pour injecter les propriétés du MDC -->
  <layout xsi:type="JsonLayout" includeMdlc="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```

Pour la version 4.5 de NLog :

```xml
  <!-- Ajouter includeMdc="true" pour injecter les propriétés du MDC -->
  <layout xsi:type="JsonLayout" includeMdc="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```

{{% /tab %}}
{{< /tabs >}}


## Injection manuelle d'ID de trace

Si vous préférez corréler manuellement vos [traces][6] avec vos logs, utilisez l'API Datadog pour récupérer les identificateurs de corrélation :

- Utilisez les méthodes d'API `CorrelationIdentifier.TraceId` et `CorrelationIdentifier.SpanId` pour injecter les identifiants au début et à la fin de chaque [span][7] dans vos logs (voir les exemples ci-dessous).
- Configurez le MDC pour utiliser les clés injectées :

    - `dd.trace_id` : l'ID de la trace active lors de l'écriture du message de log (ou `0` en l'absence de trace).
    - `dd.span_id` : l'ID de la span active lors de l'écriture du message de log (ou `0` en l'absence de trace).

{{< tabs >}}
{{% tab "Serilog" %}}

```csharp
using Datadog.Trace;
using Serilog.Context;

// Des spans doivent avoir été initialisées et être actives avant ce bloc.
using (LogContext.PushProperty("dd.trace_id", CorrelationIdentifier.TraceId.ToString()))
using (LogContext.PushProperty("dd.span_id", CorrelationIdentifier.SpanId.ToString()))
{
    // Loguer quelque chose
}
```

{{% /tab %}}
{{% tab "Log4net" %}}

```csharp
using Datadog.Trace;
using log4net;

// Des spans doivent avoir été initialisées et être actives avant ce bloc.
try
{
    LogicalThreadContext.Properties["dd.trace_id"] = CorrelationIdentifier.TraceId.ToString();
    LogicalThreadContext.Properties["dd.span_id"] = CorrelationIdentifier.SpanId.ToString();

    // Loguer quelque chose

}
finally
{
    LogicalThreadContext.Properties.Remove("dd.trace_id");
    LogicalThreadContext.Properties.Remove("dd.span_id");
}
```

{{% /tab %}}
{{% tab "NLog" %}}

```csharp
using Datadog.Trace;
using NLog;

// Des spans doivent avoir été initialisées et être actives avant ce bloc.
using (MappedDiagnosticsLogicalContext.SetScoped("dd.trace_id", CorrelationIdentifier.TraceId.ToString()))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.span_id", CorrelationIdentifier.SpanId.ToString()))
{
    // Loguer quelque chose
}
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : si vous n'utilisez pas une [intégration de log de Datadog][8] pour analyser vos logs, des règles de parsing de log personnalisées doivent s'assurer que `dd.trace_id` et `dd.span_id` sont analysés en tant que chaînes de caractères. Pour en savoir plus, consultez la [FAQ à ce sujet][9].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup/dotnet/#configuration
[2]: https://github.com/damianh/LibLog
[3]: http://serilog.net
[4]: http://nlog-project.org
[5]: https://logging.apache.org/log4net
[6]: /fr/tracing/visualization/#trace
[7]: /fr/tracing/visualization/#spans
[8]: /fr/logs/log_collection/csharp/#configure-your-logger
[9]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom