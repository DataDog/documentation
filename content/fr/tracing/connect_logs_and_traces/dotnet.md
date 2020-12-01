---
title: Associer vos logs .NET à vos traces
kind: documentation
description: Associez vos logs .NET à vos traces pour les mettre en corrélation dans Datadog.
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
## Injecter automatiquement les ID des traces et des spans

Activez l'injection dans la [configuration][1] du traceur .NET en définissant `DD_LOGS_INJECTION=true` via les variables d'environnement ou dans les fichiers de configuration.

Le traceur .NET peut injecter automatiquement les ID de traces, les ID de spans, `env`, `service` et `version` dans les logs de votre application. Si vous ne l'avez pas encore fait, Datadog conseille de configurer le traceur .NET avec `DD_ENV`, `DD_SERVICE` et `DD_VERSION`. Vous profiterez ainsi d'une expérience optimale lors de l'ajout des tags `env`, `service` et `version` (consultez la section [Tagging de service unifié][3] pour en savoir plus).

Nous prenons en charge [Serilog][4], [NLog][5] (version 2.0.0.2000+) ou [log4net][6]. Pour que les ID injectés automatiquement s'affichent dans les logs d'application, vous devez avoir activé l'enrichissement `LogContext` dans votre logger `Serilog`, ou `Mapped Diagnostics Context` dans votre logger `NLog` ou `log4net` (voir les exemples ci-dessous).

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


## Injecter manuellement les ID des traces et des spans

Si vous préférez corréler manuellement vos [traces][7] avec vos logs et lier les données entre elles pour votre service, utilisez l'API Datadog pour récupérer les identifiants de corrélation :

- Utilisez les méthodes d'API `CorrelationIdentifier.<CHAMP>` pour injecter les identifiants au début et à la fin de chaque [span][8] dans vos logs (voir les exemples ci-dessous).
- Configurez le MDC pour utiliser les clés injectées :

    - `dd.env` : le paramètre `env` configuré globalement pour le traceur (valeur par défaut en l'absence de configuration : `""`)
    - `dd.service` : le nom de service racine configuré globalement (valeur par défaut en l'absence de configuration : le nom de l'application ou le nom du site IIS)
    - `dd.version` : le paramètre `version` configuré globalement pour le service (valeur par défaut en l'absence de configuration : `""`)
    - `dd.trace_id` : l'ID de la trace active lors de l'écriture du message de log (valeur par défaut en l'absence de trace : `0`)
    - `dd.span_id` : l'ID de la span active lors de l'écriture du message de log (valeur par défaut en l'absence de trace : `0`).

{{< tabs >}}
{{% tab "Serilog" %}}

**Remarque** : la bibliothèque Serilog exige que les noms de propriété de message soient des identificateurs C# valides. Les noms doivent donc correspondre à ce qui suit :
- `dd_env`
- `dd_service`
- `dd_version`
- `dd_trace_id`
- `dd_span_id`

```csharp
using Datadog.Trace;
using Serilog.Context;

// Des spans doivent avoir été initialisées et être actives avant ce bloc.
using (LogContext.PushProperty("dd_env", CorrelationIdentifier.Env))
using (LogContext.PushProperty("dd_service", CorrelationIdentifier.Service))
using (LogContext.PushProperty("dd_version", CorrelationIdentifier.Version))
using (LogContext.PushProperty("dd_trace_id", CorrelationIdentifier.TraceId.ToString()))
using (LogContext.PushProperty("dd_span_id", CorrelationIdentifier.SpanId.ToString()))
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
    LogicalThreadContext.Properties["dd.env"] = CorrelationIdentifier.Env;
    LogicalThreadContext.Properties["dd.service"] = CorrelationIdentifier.Service;
    LogicalThreadContext.Properties["dd.version"] = CorrelationIdentifier.Version;
    LogicalThreadContext.Properties["dd.trace_id"] = CorrelationIdentifier.TraceId.ToString();
    LogicalThreadContext.Properties["dd.span_id"] = CorrelationIdentifier.SpanId.ToString();

    // Loguer quelque chose

}
finally
{
    LogicalThreadContext.Properties.Remove("dd.env");
    LogicalThreadContext.Properties.Remove("dd.service");
    LogicalThreadContext.Properties.Remove("dd.version");
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
using (MappedDiagnosticsLogicalContext.SetScoped("dd.env", CorrelationIdentifier.Env))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.service", CorrelationIdentifier.Service))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.version", CorrelationIdentifier.Version))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.trace_id", CorrelationIdentifier.TraceId.ToString()))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.span_id", CorrelationIdentifier.SpanId.ToString()))
{
    // Loguer quelque chose
}
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : si vous n'utilisez pas une [intégration de log de Datadog][9] pour parser vos logs, des règles de parsing de log personnalisées doivent s'assurer que `dd.trace_id` et `dd.span_id` sont parsés en tant que chaînes de caractères. Pour en savoir plus, consultez la [FAQ à ce sujet][10].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup/dotnet/#configuration
[2]: https://github.com/damianh/LibLog
[3]: /fr/getting_started/tagging/unified_service_tagging
[4]: http://serilog.net
[5]: http://nlog-project.org
[6]: https://logging.apache.org/log4net
[7]: /fr/tracing/visualization/#trace
[8]: /fr/tracing/visualization/#spans
[9]: /fr/logs/log_collection/csharp/#configure-your-logger
[10]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom