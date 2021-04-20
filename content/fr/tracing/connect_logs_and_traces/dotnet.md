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
Vous pouvez configurer votre bibliothèque de logging et le tracing .NET de façon à injecter vos ID de trace et de span dans vos logs d'application. Vos données de surveillance des performances de votre application seront ainsi mises en corrélation avec vos données de log.

<div class="alert alert-info"><strong>Remarque :</strong> l'injection automatique fonctionne uniquement avec les logs au format JSON. Pour les autres formats, utilisez l'injection manuelle.</div>

Configurez le traceur .NET avec le [tagging de service unifié][1] pour profiter d'une expérience optimale et d'informations de contexte utiles lorsque vous mettez en corrélation vos traces d'application et vos logs.

Le traceur .NET prend en charge les bibliothèques de logging suivantes :
- [Serilog][2]
- [log4net][3]
- [NLog][4] (versions 4.0+)

## Prise en main

Que vous optiez pour l'injection automatique ou manuelle des traces, effectuez les étapes de configuration suivantes :

1. Configurez le traceur .NET avec les paramètres suivants :
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. Dans la [configuration de l'Agent de logs][5] pour les fichiers à suivre spécifiés, définissez `source: csharp` pour permettre aux pipelines de logs de parser les fichiers de logs.

3. Modifiez la configuration de journalisation en fonction de la bibliothèque de journalisation :

Exemples :

{{< tabs >}}
{{% tab "Serilog" %}}
Pour injecter les ID de trace et de span dans les logs d'application, vous devez activer l'enrichissement du contexte des logs, comme illustré dans l'exemple de code suivant :

```csharp
var log = new LoggerConfiguration()
    // Ajouter Enrich.FromLogContext pour générer les propriétés Datadog
    .Enrich.FromLogContext()
    .WriteTo.File(new JsonFormatter(), "log.json")
    .CreateLogger();
```
Pour obtenir d'autres exemples, consultez le [projet d'injection automatique des ID de trace Serilog][1] sur GitHub.


[1]: https://github.com/DataDog/dd-trace-dotnet/blob/master/samples/AutomaticTraceIdInjection/SerilogExample/Program.cs
{{% /tab %}}
{{% tab "log4net" %}}
Pour injecter les ID de trace et de span dans les logs d'application, vous devez activer les MDC (contextes de diagnostics mappés), comme illustré dans l'exemple de code suivant :

```xml
  <layout type="log4net.Layout.SerializedLayout, log4net.Ext.Json">
    <decorator type="log4net.Layout.Decorators.StandardTypesDecorator, log4net.Ext.Json" />
    <default />
    <!--Membres par défaut explicites-->
    <remove value="ndc" />
    <!--Supprimer le membre du message préformaté par défaut-->
    <remove value="message" />
    <!--Ajouter le message brut-->
    <member value="message:messageobject" />
    <!-- Ajouter value='properties' pour générer les propriétés Datadog -->
    <member value='properties'/>
  </layout>
```
Pour obtenir d'autres exemples, consultez le [projet d'injection automatique des ID de trace log4net][1] sur GitHub.


[1]: https://github.com/DataDog/dd-trace-dotnet/blob/master/samples/AutomaticTraceIdInjection/Log4NetExample/log4net.config
{{% /tab %}}
{{% tab "NLog" %}}

Pour injecter les ID de trace et de span dans les logs d'application, vous devez activer les MDC (contextes de diagnostics mappés), comme illustré dans l'exemple de code suivant pour NLog versions 4.6+ :

```xml
 <!-- Ajouter includeMdlc="true" pour générer les propriétés MDC -->
  <layout xsi:type="JsonLayout" includeMdlc="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```

Pour la version 4.5 de NLog :

```xml
 <!-- Ajouter includeMdc="true" pour générer les propriétés MDC -->
  <layout xsi:type="JsonLayout" includeMdc="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```
Pour obtenir d'autres exemples, consultez les projets d'injection automatique des ID de trace avec [NLog 4.0][1], [NLog 4.5][2] ou [NLog 4.6][3] sur GitHub.


[1]: https://github.com/DataDog/dd-trace-dotnet/blob/master/samples/AutomaticTraceIdInjection/NLog40Example/NLog.config
[2]: https://github.com/DataDog/dd-trace-dotnet/blob/master/samples/AutomaticTraceIdInjection/NLog45Example/NLog.config
[3]: https://github.com/DataDog/dd-trace-dotnet/blob/master/samples/AutomaticTraceIdInjection/NLog46Example/NLog.config
{{% /tab %}}
{{< /tabs >}}

Ensuite, finalisez la configuration en suivant les étapes pour l'injection automatique ou manuelle.

## Injecter automatiquement les ID de trace et de span

Si vos logs d'application sont au format JSON, voici comment terminer la configuration de l'injection automatique des ID de trace :

4. Dans les variables d'environnement du traceur .NET, activez `DD_LOGS_INJECTION=true`. Pour découvrir d'autres façons de configurer le traceur .NET, consultez [Configurer le traceur .NET][6].

## Injecter manuellement les ID de trace et de span

Si vos logs d'application ne sont pas au format JSON, vous pouvez les enrichir manuellement avec les données de l'APM :
  | Clé obligatoire   | Description                                  |
  | -------------- | -------------------------------------------- |
  | `dd.env`       | Configure le paramètre `env` pour le traceur de façon globale. Défini sur `""` par défaut si non spécifié. |
  | `dd.service`   | Configure le nom du service root de façon globale. Défini sur le nom de l'application ou du site IIS par défaut si non spécifié.  |
  | `dd.version`   | Configure le paramètre `version` pour le service de façon globale. Défini sur `""` par défaut si non spécifié  |
  | `dd.trace_id`  | ID de la trace active durant la déclaration de log. Défini sur `0` en cas d'absence de trace.  |
  | `dd.span_id`   | ID de la span active durant la déclaration de log. Défini sur `0` par défaut en cas d'absence de span. |


**Remarque** : si vous n'utilisez pas une [intégration de log de Datadog][7] pour parser vos logs, des règles de parsing de log personnalisées doivent être définies pour parser `dd.trace_id` et `dd.span_id` en tant que chaînes de caractères. Pour en savoir plus, consultez la [FAQ à ce sujet][8].

Après avoir effectué les trois étapes [ci-dessus](#prise-en-main), terminez de configurer l'enrichissement manuel des logs comme suit :

4. Ajoutez le [package NuGet `Datadog.Trace`][9] comme référence dans votre projet.

5. Utilisez l'API `CorrelationIdentifier` pour récupérer les identifiants de corrélation et les ajouter au contexte des logs lorsqu'une span est active.

Exemples :

{{< tabs >}}
{{% tab "Serilog" %}}

**Remarque** : la bibliothèque Serilog exige que les noms de propriété de message soient des identificateurs C# valides. Les noms de propriété imposés sont : `dd_env`, `dd_service`, `dd_version`, `dd_trace_id` et `dd_span_id`.

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
{{% tab "log4net" %}}

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


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging
[2]: http://serilog.net
[3]: https://logging.apache.org/log4net
[4]: http://nlog-project.org
[5]: /fr/logs/log_collection/csharp/?tab=serilog#configure-your-datadog-agent
[6]: /fr/tracing/setup_overview/setup/dotnet-core/?tab=windows#configuring-the-net-tracer
[7]: /fr/logs/log_collection/csharp/#configure-your-logger
[8]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom
[9]: https://www.nuget.org/packages/Datadog.Trace/