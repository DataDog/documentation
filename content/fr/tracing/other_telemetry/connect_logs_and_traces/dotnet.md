---
aliases:
- /fr/tracing/connect_logs_and_traces/dotnet
code_lang: dotnet
code_lang_weight: 60
description: Associez vos logs .NET à vos traces pour les mettre en corrélation dans
  Datadog.
further_reading:
- link: tracing/trace_collection/custom_instrumentation
  tag: Documentation
  text: Instrumenter vos applications manuellement pour créer des traces
- link: tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: GitHub
  text: Corréler automatiquement vos logs de requête avec vos traces
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guide
  text: Bénéficiez de diagnostics simplifiés grâce à la mise en corrélation entre
    produits.
kind: documentation
title: Mettre en corrélation vos logs .NET avec vos traces
type: multi-code-lang
---

Vous pouvez configurer votre bibliothèque de logging et le tracing .NET de façon à injecter vos ID de trace et de span dans vos logs d'application. Vos données de surveillance des performances de votre application seront ainsi mises en corrélation avec vos données de log.

Configurez le traceur .NET avec le [tagging de service unifié][1] pour profiter d'une expérience optimale et d'informations de contexte utiles lorsque vous mettez en corrélation vos traces d'application et vos logs.

Le traceur .NET prend en charge les bibliothèques de logging suivantes :
- [Serilog][2] (v1.4+)
- [log4net][3]
- [NLog][4]
- [Microsoft.Extensions.Logging][5] (ajouté avec la v1.28.6)

## Configurer la collecte de logs

Vérifiez que la collecte de logs est activée dans l'Agent Datadog et que la [configuration de l'Agent de log][15] pour le suivi des fichiers spécifiés est définie sur `source: csharp`, afin que les pipelines de log puissent parser les fichiers de log. Pour en savoir plus, consultez la section [Collecte de logs avec C#][7]. Si la `source` est définie sur une valeur autre que `csharp`, vous devrez peut-être ajouter un [remappeur de traces][8] vers le pipeline de traitement de logs approprié pour que la mise en corrélation fonctionne correctement.

<div class="alert alert-warning"><strong>Remarque :</strong> la collecte automatique de logs fonctionne uniquement pour les logs au format JSON. Pour les autres formats, utilisez des règles de parsing personnalisées.</div>

## Configurer l'injection dans les logs

Pour injecter des identificateurs de corrélation dans vos messages de log, suivez les instructions ci-dessous pour votre bibliothèque de journalisation.

<div class="alert alert-info">
  <div class="alert-info">Consultez les <a href="https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/AutomaticTraceIdInjection">extraits dans dd-trace-dotnet</a> pour obtenir d'autres exemples.</div>
  </div>
</div>

{{< tabs >}}
{{% tab "Serilog" %}}

<div class="alert alert-warning">
  <strong>Remarque : </strong>depuis la version 2.0.1 du traceur .NET, l'injection automatique pour la bibliothèque de journalisation Serilog requiert l'instrumentation automatique de l'application.
</div>

Pour injecter automatiquement des identificateurs de corrélation dans vos messages de log, procédez comme suit :

1. Configurez le traceur .NET avec les paramètres suivants :
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. Pour activer le tracing de l'instrumentation automatique de votre application, suivez les [instructions d'installation du traceur .NET][1].

[1]: https://docs.datadoghq.com/fr/tracing/trace_collection/dd_libraries/dotnet-core/
{{% /tab %}}
{{% tab "log4net" %}}

<div class="alert alert-warning">
  <strong>Remarque : </strong>depuis la version 1.29.0 du traceur .NET, l'injection automatique pour la bibliothèque de journalisation log4net requiert l'instrumentation automatique de l'application.
</div>

Pour injecter automatiquement des identificateurs de corrélation dans vos messages de log, procédez comme suit :

1. Configurez le traceur .NET avec les paramètres suivants :
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. Pour activer le tracing de l'instrumentation automatique de votre application, suivez les [instructions d'installation du traceur .NET][1].

3. Ajoutez les propriétés de log `dd.env`, `dd.service`, `dd.version`, `dd.trace_id` et `dd.span_id` à votre sortie de journalisation. Pour ce faire, vous pouvez inclure _chaque_ propriété ou l'_ensemble_ d'entre elles. L'exemple de code suivant illustre les deux approches :

```xml
  <layout type="log4net.Layout.SerializedLayout, log4net.Ext.Json">
    <decorator type="log4net.Layout.Decorators.StandardTypesDecorator, log4net.Ext.Json" />
    <default />
    <!--membres par défaut explicites-->
    <remove value="ndc" />
    <!--Supprimer le membre du message préformaté par défaut-->
    <remove value="message" />
    <!--Ajouter le message brut-->
    <member value="message:messageobject" />

    <!-- Inclure des propriétés Datadog-->
    <!-- 1re option : ajouter des propriétés individuelles avec value='<property_name>' -->
    <member value='dd.env' />
    <member value='dd.service' />
    <member value='dd.version' />
    <member value='dd.trace_id' />
    <member value='dd.span_id' />
    <!-- 2e options : ajouter toutes les propriétés avec value='properties' -->
    <member value='properties'/>
  </layout>
```
Pour obtenir d'autres exemples, consultez le [projet d'injection automatique des ID de trace avec log4net][2] sur GitHub.


[1]: https://docs.datadoghq.com/fr/tracing/trace_collection/dd_libraries/dotnet-core/
[2]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/Log4NetExample/log4net.config
{{% /tab %}}
{{% tab "NLog" %}}

<div class="alert alert-warning">
  <strong>Remarque : </strong>depuis la version 2.0.1 du traceur .NET, l'injection automatique pour la bibliothèque de journalisation NLog requiert l'instrumentation automatique de l'application.
</div>

Pour injecter automatiquement des identificateurs de corrélation dans vos messages de log, procédez comme suit :

1. Configurez le traceur .NET avec les paramètres suivants :
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. Pour activer le tracing de l'instrumentation automatique de votre application, suivez les [instructions d'installation du traceur .NET][1].

3. Activez le contexte de diagnostic mappé (MDC), comme dans l'exemple de code suivant pour les versions 5.0+ de NLog :

```xml
  <!-- Ajouter includeScopeProperties="true" pour injecter les propriétés de ScopeContext -->
  <layout xsi:type="JsonLayout" includeScopeProperties="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```

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
Pour obtenir d'autres exemples, consultez les projets d'injection automatique des ID de trace avec [NLog 4.0][2], [NLog 4.5][3] ou [NLog 4.6][4] sur GitHub.


[1]: https://docs.datadoghq.com/fr/tracing/trace_collection/dd_libraries/dotnet-core/
[2]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/NLog40Example/NLog.config
[3]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/NLog45Example/NLog.config
[4]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/NLog46Example/NLog.config
{{% /tab %}}
{{% tab "Microsoft.Extensions.Logging" %}}
Pour injecter automatiquement des identificateurs de corrélation dans vos messages de log, procédez comme suit :

1. Configurez le traceur .NET avec les paramètres suivants :
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. Pour activer le tracing de l'instrumentation automatique de votre application, suivez les [instructions d'installation du traceur .NET][1].

3. Activez les [contexte de log][2] pour votre fournisseur de journalisation, tel qu'indiqué dans l'exemple de code ci-dessous. Seuls les fournisseurs prenant en charge les contextes de log injectent des identificateurs de corrélation.

```csharp
Host.CreateDefaultBuilder(args)
    .ConfigureLogging(logging =>
    {
        logging.AddFile(opts =>
        {
            opts.IncludeScopes = true; // les contextes doivent être inclus pour permettre l'ajout des identificateurs de corrélation
            opts.FormatterName = "json";
        });
    }
```

Si une trace est active lors de l'écriture du log, les ID de trace et de span sont automatiquement injectés dans les logs de l'application, avec les propriétés `dd_trace_id` et `dd_span_id`. Si aucune trace n'est active, seules les propriétés `dd_env`, `dd_service` et `dd_version` sont injectées.

**Remarque :** si votre bibliothèque de journalisation remplace l'implémentation `LoggerFactory` par défaut, par exemple le package [_Serilog.Extensions.Hosting_][3] ou le package [_Serilog.Extensions.Logging_][4], suivez les instructions spécifiques au framework (dans cet exemple, consultez les instructions pour **Serilog**).

Pour obtenir d'autres exemples, consultez le [projet d'injection automatique des ID de trace avec Microsoft.Extensions.Logging][5] sur GitHub.


[1]: https://docs.datadoghq.com/fr/tracing/trace_collection/dd_libraries/dotnet-core/
[2]: https://docs.microsoft.com/aspnet/core/fundamentals/logging/#log-scopes-1
[3]: https://github.com/serilog/serilog-extensions-hosting
[4]: https://github.com/serilog/serilog-extensions-logging
[5]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/MicrosoftExtensionsExample/Program.cs
{{% /tab %}}
{{< /tabs >}}

Ensuite, finalisez la configuration en suivant les étapes pour l'injection automatique ou manuelle.

## Injection automatique

Pour activer l'injection automatique des identificateurs de corrélation, il ne vous reste plus qu'à effectuer l'étape suivante :

1. Activez `DD_LOGS_INJECTION=true` dans les variables d'environnement du traceur .NET. Pour configurer le traceur .NET avec une autre méthode, consultez la [documentation dédiée][6].

Une fois l'injection configurée, consultez la section [Collecte de logs avec C#][7] pour configurer la collecte de logs.

**Remarque** :  pour mettre en corrélation les traces avec les logs, vous devrez peut-être définir un [remapper d'ID de trace][8] afin de parser `dd_trace_id` en tant qu'ID de trace des logs. Consultez la section [Les logs corrélés ne s'affichent pas dans le volet des ID de trace][9] pour en savoir plus.

<div class="alert alert-info"><strong>Bêta</strong> : depuis la version 2.35.0, si la <a href="/agent/remote_config/">configuration à distance de l'Agent</a> est activée à l'emplacement où ce service s'exécute, vous pouvez définir <code>DD_LOGS_INJECTION</code> depuis l'interface du <a href="/tracing/service_catalog">catalogue des services</a>.</div>

## Injection manuelle

Si vous préférez corréler manuellement vos traces avec vos logs, vous pouvez ajouter des identificateurs de corrélation à vos logs :

  | Clé requise   | Rôle                                  |
  | -------------- | -------------------------------------------- |
  | `dd.env`       | Configure globalement le paramètre `env` pour le traceur. Valeur par défaut en l'absence de configuration : `""`. |
  | `dd.service`   | Configure globalement le nom du service racine. Valeur par défaut en l'absence de configuration : le nom de l'application ou le nom du site IIS.  |
  | `dd.version`   | Configure globalement le paramètre `version` pour le service. Valeur par défaut en l'absence de configuration : `""`.  |
  | `dd.trace_id`  | ID de la trace active lors de la déclaration du log. Valeur par défaut en l'absence de trace : `0`.  |
  | `dd.span_id`   | ID de la span active lors de la déclaration du log. Valeur par défaut en l'absence de span : `0`. |

**Remarque** : si vous n'utilisez pas une [intégration de log de Datadog][7] pour parser vos logs, des règles de parsing de log personnalisées doivent être définies pour parser `dd.trace_id` et `dd.span_id` en tant que chaînes. Pour en savoir plus, consultez la documentation [Les logs corrélés ne s'affichent pas dans le volet des ID de trace][10].

**Remarque** : si vous utilisez Serilog, Nlog ou log4net via ILogger, consultez la section Microsoft.Extensions.Logging pour configurer ces propriétés avec `BeginScope()`.

Après avoir effectué les [étapes de prise en main](#prise-en-main), procédez comme suit pour terminer la configuration de l'enrichissement manuel de vos logs :

1. Ajoutez le [package NuGet `Datadog.Trace`][11] comme référence dans votre projet.

2. Utilisez l'API `CorrelationIdentifier` pour récupérer les identificateurs de corrélation et les ajouter au contexte des logs lorsqu'une span est active.

Enfin, consultez la section [Collecte de logs avec C#][7] pour configurer la collecte de logs.

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
{{% tab "Microsoft.Extensions.Logging" %}}

```csharp
using Datadog.Trace;
using Microsoft.Extensions.Logging;

ILogger _logger;

// Des spans doivent avoir été lancées et doivent être actives avant ce bloc.
using(_logger.BeginScope(new Dictionary<string, object>
{
    {"dd.env", CorrelationIdentifier.Env},
    {"dd.service", CorrelationIdentifier.Service},
    {"dd.version", CorrelationIdentifier.Version},
    {"dd.trace_id", CorrelationIdentifier.TraceId.ToString()},
    {"dd.span_id", CorrelationIdentifier.SpanId.ToString()},
}))
{
    // Loguer un événement
}
```

{{% /tab %}}
{{< /tabs >}}

Découvrez en détail comment utiliser BeginScope pour créer des messages de log structurés pour les fournisseurs suivants :
- Serilog : [The semantics of ILogger.BeginScope()][12]
- NLog : [NLog properties with Microsoft Extension Logging][13]
- log4net : [Using BeginScope][14]

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging
[2]: http://serilog.net
[3]: https://logging.apache.org/log4net
[4]: http://nlog-project.org
[5]: https://docs.microsoft.com/en-us/dotnet/core/extensions/logging
[6]: /fr/tracing/trace_collection/library_config/dotnet-core/#configuring-the-net-tracer
[7]: /fr/logs/log_collection/csharp/
[8]: /fr/logs/log_configuration/processors/?tab=ui#trace-remapper
[9]: /fr/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=withlogintegration
[10]: /fr/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom
[11]: https://www.nuget.org/packages/Datadog.Trace/
[12]: https://nblumhardt.com/2016/11/ilogger-beginscope/
[13]: https://github.com/NLog/NLog.Extensions.Logging/wiki/NLog-properties-with-Microsoft-Extension-Logging
[14]: https://github.com/huorswords/Microsoft.Extensions.Logging.Log4Net.AspNetCore#using-beginscope
[15]: /fr/logs/log_collection/csharp/#configure-your-datadog-agent