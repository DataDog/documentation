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
  text: Gérer vos applications manuellement pour créer des traces.
- link: tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: Blog
  text: Corréler automatiquement des logs de requête avec des traces
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guide
  text: Bénéficiez de diagnostics simplifiés grâce à la mise en corrélation entre
    produits.
title: Mettre en corrélation vos logs .NET avec vos traces
type: multi-code-lang
---
Vous pouvez configurer votre bibliothèque de logging et vos configurations de tracing .NET de façon à injecter vos ID de trace et de span dans vos logs d'application. Vos données de surveillance des performances de votre application seront ainsi mises en corrélation avec vos données de log.

Configurez le traceur .NET avec le [tagging de service unifié][1] pour profiter d'une expérience optimale et d'informations de contexte utiles lorsque vous mettez en corrélation vos traces d'application et vos logs.

Le traceur .NET prend en charge les bibliothèques de logging suivantes :
- [Serilog][2] (v1.4+)
- [log4net][3]
- [NLog][4]
- [Microsoft.Extensions.Logging][5] (ajouté dans v1.28.6)

## Configurer la collecte des journaux {#configure-log-collection}

Assurez-vous que la collecte des journaux est configurée dans l'Agent Datadog et que la [configuration de l'Agent Logs][15] pour les fichiers spécifiés à suivre est définie sur `source: csharp` afin que les pipelines de journaux puissent analyser les fichiers journaux. Pour plus d'informations, voir [C# Log Collection][7]. Si le `source` est défini sur une valeur autre que `csharp`, vous devrez peut-être ajouter un [trace remapper][8] au pipeline de traitement des journaux approprié pour que la corrélation fonctionne correctement.

<div class="alert alert-danger">La collecte automatique des journaux ne fonctionne que pour les journaux formatés en JSON. Alternativement, utilisez des règles d'analyse personnalisées.</div>

## Configurer l'injection dans les journaux {#configure-injection-in-logs}

Pour injecter des identificateurs de corrélation dans vos messages de log, suivez les instructions ci-dessous pour votre bibliothèque de journalisation.

<div class="alert alert-info">
  Voir les <a href="https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/AutomaticTraceIdInjection">exemples dans dd-trace-dotnet</a> pour plus d'exemples.
</div>

{{< tabs >}}
{{% tab "Serilog" %}}

<div class="alert alert-danger">
  <strong>Remarque : </strong>À partir de la version 2.0.1 du Tracer .NET, l'injection automatique pour la bibliothèque de journaux Serilog nécessite que l'application soit instrumentée avec une instrumentation automatique.
</div>

Pour injecter automatiquement des identificateurs de corrélation dans vos messages de log, procédez comme suit :

1. Configurer le Tracer .NET avec les paramètres de tracer suivants :
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. Activez le traçage d'auto-instrumentation de votre application en suivant les [instructions pour installer le Tracer .NET][1].

[1]: https://docs.datadoghq.com/fr/tracing/trace_collection/dd_libraries/dotnet-core/
{{% /tab %}}
{{% tab "log4net" %}}

<div class="alert alert-danger">
  <strong>Remarque : </strong>À partir de la version 1.29.0 du Tracer .NET, l'injection automatique pour la bibliothèque de journaux log4net nécessite que l'application soit instrumentée avec une instrumentation automatique.
</div>

Pour injecter automatiquement des identificateurs de corrélation dans vos messages de log, procédez comme suit :

1. Configurer le Tracer .NET avec les paramètres de tracer suivants :
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. Activez le traçage d'auto-instrumentation de votre application en suivant les [instructions pour installer le Tracer .NET][1].

3. Ajoutez les propriétés de journaux `dd.env`, `dd.service`, `dd.version`, `dd.trace_id` et `dd.span_id` dans votre sortie de journal. Cela peut être fait en incluant ces propriétés _individuellement_ ou en incluant _toutes_ les propriétés de journaux. Les deux approches sont montrées dans le code d'exemple suivant :

```xml
  <layout type="log4net.Layout.SerializedLayout, log4net.Ext.Json">
    <decorator type="log4net.Layout.Decorators.StandardTypesDecorator, log4net.Ext.Json" />
    <default />
    <!--explicit default members-->
    <remove value="ndc" />
    <!--remove the default preformatted message member-->
    <remove value="message" />
    <!--add raw message-->
    <member value="message:messageobject" />

    <!-- Include Datadog properties -->
    <!-- EITHER Include individual properties with value='<property_name>' -->
    <member value='dd.env' />
    <member value='dd.service' />
    <member value='dd.version' />
    <member value='dd.trace_id' />
    <member value='dd.span_id' />
    <!-- OR Include all properties with value='properties' -->
    <member value='properties'/>
  </layout>
```
Pour obtenir d'autres exemples, consultez le [projet d'injection automatique des ID de trace avec log4net][2] sur GitHub.


[1]: https://docs.datadoghq.com/fr/tracing/trace_collection/dd_libraries/dotnet-core/
[2]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/Log4NetExample/log4net.config
{{% /tab %}}
{{% tab "NLog" %}}

<div class="alert alert-danger">
  <strong>Remarque : </strong>À partir de la version 2.0.1 de .NET Tracer, l'injection automatique pour la bibliothèque de journalisation NLog nécessite que l'application soit instrumentée avec une instrumentation automatique.
</div>

Pour injecter automatiquement des identificateurs de corrélation dans vos messages de log, procédez comme suit :

1. Configurer le Tracer .NET avec les paramètres de tracer suivants :
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. Activez le traçage d'auto-instrumentation de votre application en suivant les [instructions pour installer le Tracer .NET][1].

3. Activez le contexte de diagnostic mappé (MDC), comme montré dans le code d'exemple suivant pour NLog version 5.0+ :

```xml
  <!-- Add includeScopeProperties="true" to emit ScopeContext properties -->
  <layout xsi:type="JsonLayout" includeScopeProperties="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```

Pour les versions 4.6 et ultérieures de NLog :

```xml
  <!-- Add includeMdlc="true" to emit MDC properties -->
  <layout xsi:type="JsonLayout" includeMdlc="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```

Pour la version 4.5 de NLog :

```xml
  <!-- Add includeMdc="true" to emit MDC properties -->
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

1. Configurer le Tracer .NET avec les paramètres de tracer suivants :
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. Activez le traçage d'auto-instrumentation de votre application en suivant les [instructions pour installer le Tracer .NET][1].

3. Activez les [log scopes][2] pour votre fournisseur de journalisation, comme montré dans le code d'exemple. Seuls les fournisseurs qui prennent en charge les log scopes auront des identifiants de corrélation injectés.

```csharp
Host.CreateDefaultBuilder(args)
    .ConfigureLogging(logging =>
    {
        logging.AddFile(opts =>
        {
            opts.IncludeScopes = true; // must include scopes so that correlation identifiers are added
            opts.FormatterName = "json";
        });
    }
```

S'il y a une trace active lorsque le journal est écrit, les identifiants de trace et de span sont automatiquement injectés dans les journaux de l'application avec les propriétés `dd_trace_id` et `dd_span_id`. S'il n'y a pas de trace active, seules les propriétés `dd_env`, `dd_service` et `dd_version` sont injectées.

**Remarque :** Si vous utilisez une bibliothèque de journalisation qui remplace l'implémentation par défaut `LoggerFactory` comme les paquets [_Serilog.Extensions.Hosting_][3] ou [_Serilog.Extensions.Logging_][4], suivez les instructions spécifiques au framework (dans cet exemple, voir **Serilog**).

Pour obtenir d'autres exemples, consultez le [projet d'injection automatique des ID de trace avec Microsoft.Extensions.Logging][5] sur GitHub.


[1]: https://docs.datadoghq.com/fr/tracing/trace_collection/dd_libraries/dotnet-core/
[2]: https://docs.microsoft.com/aspnet/core/fundamentals/logging/#log-scopes-1
[3]: https://github.com/serilog/serilog-extensions-hosting
[4]: https://github.com/serilog/serilog-extensions-logging
[5]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/MicrosoftExtensionsExample/Program.cs
{{% /tab %}}
{{< /tabs >}}

Ensuite, finalisez la configuration pour une injection automatique ou manuelle.

## Injection automatique {#automatic-injection}

Pour activer l'injection automatique des identifiants de corrélation, assurez-vous que `DD_LOGS_INJECTION` est activé.

À partir de la version 3.24.0, `DD_LOGS_INJECTION` est activé par défaut. Pour les versions antérieures, définissez `DD_LOGS_INJECTION=true` dans les variables d'environnement de .NET Tracer.

Pour configurer le .NET Tracer avec une méthode différente, voir [Configurer le .NET Tracer][6].

Une fois l'injection configurée, consultez la section [Collecte de logs avec C#][7] pour configurer la collecte de logs.

**Remarque :** Pour corréler les traces avec les journaux, vous devrez peut-être configurer un [trace ID remapper][8] pour analyser `dd_trace_id` comme l'ID de trace du journal. Voir [Journaux corrélés non affichés dans le panneau d'ID de trace][9] pour plus d'informations.

<div class="alert alert-info">Starting in version 2.35.0, if <a href="/remote_configuration">Agent Remote Configuration</a> is enabled where this service runs, you can set <code>DD_LOGS_INJECTION</code> dans l'interface utilisateur <a href="/internal_developer_portal/catalog/">Catalog</a>.</div>

## Injection manuelle {#manual-injection}

Si vous préférez corréler manuellement vos traces avec vos logs, vous pouvez ajouter des identificateurs de corrélation à vos logs :

  | Clé requise   | Description                                  |
  | -------------- | -------------------------------------------- |
  | `dd.env`       | Configure globalement le `env` pour le SDK. Par défaut, cela vaut `""` si non défini. |
  | `dd.service`   | Configure globalement le nom du service racine. Par défaut, cela prend le nom de l'application ou le nom du site IIS si non défini.  |
  | `dd.version`   | Configure globalement `version` pour le service. Par défaut, cela vaut `""` si non défini.  |
  | `dd.trace_id`  | ID de trace actif (représenté comme un nombre décimal de 64 bits) pendant l'instruction de journalisation. Par défaut, cela vaut `0` s'il n'y a pas de trace.  |
  | `dd.span_id`   | ID de span actif (représenté comme un nombre décimal de 64 bits) pendant l'instruction de journalisation. Par défaut, cela vaut `0` s'il n'y a pas de trace. |

**Remarque:** Si vous n'utilisez pas une [Datadog Log Integration][7] pour analyser vos journaux, des règles d'analyse de journaux personnalisées doivent analyser `dd.trace_id` et `dd.span_id` comme des chaînes. Pour plus d'informations, voir [Les journaux corrélés n'apparaissent pas dans le panneau ID de trace][10].

**Remarque** : Si vous utilisez Serilog, NLog ou log4net via ILogger, consultez la section Microsoft.Extensions.Logging pour configurer ces propriétés en utilisant `BeginScope()`.

Après avoir complété les [étapes de démarrage](#getting-started), terminez votre configuration manuelle d'enrichissement des journaux :

1. Référencez le [`Datadog.Trace` paquet NuGet][11] dans votre projet.

2. Utilisez l'API `CorrelationIdentifier` pour récupérer les identifiants de corrélation et les ajouter au contexte de journalisation pendant qu'un span est actif.

Enfin, consultez la section [Collecte de logs avec C#][7] pour configurer la collecte de logs.

Exemples :

{{< tabs >}}
{{% tab "Serilog" %}}

**Remarque** : La bibliothèque Serilog nécessite que les noms des propriétés de message soient des identifiants C# valides. Les noms de propriétés requis sont : `dd_env`, `dd_service`, `dd_version`, `dd_trace_id` et `dd_span_id`.

```csharp
using Datadog.Trace;
using Serilog.Context;

// there must be spans started and active before this block.
using (LogContext.PushProperty("dd_env", CorrelationIdentifier.Env))
using (LogContext.PushProperty("dd_service", CorrelationIdentifier.Service))
using (LogContext.PushProperty("dd_version", CorrelationIdentifier.Version))
using (LogContext.PushProperty("dd_trace_id", CorrelationIdentifier.TraceId.ToString()))
using (LogContext.PushProperty("dd_span_id", CorrelationIdentifier.SpanId.ToString()))
{
    // Log something
}
```

{{% /tab %}}
{{% tab "log4net" %}}

```csharp
using Datadog.Trace;
using log4net;

// there must be spans started and active before this block.
try
{
    LogicalThreadContext.Properties["dd.env"] = CorrelationIdentifier.Env;
    LogicalThreadContext.Properties["dd.service"] = CorrelationIdentifier.Service;
    LogicalThreadContext.Properties["dd.version"] = CorrelationIdentifier.Version;
    LogicalThreadContext.Properties["dd.trace_id"] = CorrelationIdentifier.TraceId.ToString();
    LogicalThreadContext.Properties["dd.span_id"] = CorrelationIdentifier.SpanId.ToString();

    // Log something

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

// there must be spans started and active before this block.
using (MappedDiagnosticsLogicalContext.SetScoped("dd.env", CorrelationIdentifier.Env))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.service", CorrelationIdentifier.Service))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.version", CorrelationIdentifier.Version))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.trace_id", CorrelationIdentifier.TraceId.ToString()))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.span_id", CorrelationIdentifier.SpanId.ToString()))
{
    // Log something
}
```

{{% /tab %}}
{{% tab "Microsoft.Extensions.Logging" %}}

```csharp
using Datadog.Trace;
using Microsoft.Extensions.Logging;

ILogger _logger;

// there must be spans started and active before this block.
using(_logger.BeginScope(new Dictionary<string, object>
{
    {"dd.env", CorrelationIdentifier.Env},
    {"dd.service", CorrelationIdentifier.Service},
    {"dd.version", CorrelationIdentifier.Version},
    {"dd.trace_id", CorrelationIdentifier.TraceId.ToString()},
    {"dd.span_id", CorrelationIdentifier.SpanId.ToString()},
}))
{
    // Log something
}
```

{{% /tab %}}
{{< /tabs >}}

Découvrez en détail comment utiliser BeginScope pour créer des messages de log structurés pour les fournisseurs suivants :
- Serilog : [La sémantique de ILogger.BeginScope()][12]
- NLog : [Propriétés NLog avec Microsoft Extension Logging][13]
- log4net : [Utilisation de BeginScope][14]

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging
[2]: http://serilog.net
[3]: https://logging.apache.org/log4net
[4]: http://nlog-project.org
[5]: https://docs.microsoft.com/en-us/dotnet/core/extensions/logging
[6]: /fr/tracing/trace_collection/library_config/dotnet-core/#configuring-the-net-tracer
[7]: /fr/logs/log_collection/csharp/
[8]: /fr/logs/log_configuration/processors/trace_remapper/
[9]: /fr/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=withlogintegration
[10]: /fr/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom
[11]: https://www.nuget.org/packages/Datadog.Trace/
[12]: https://nblumhardt.com/2016/11/ilogger-beginscope/
[13]: https://github.com/NLog/NLog.Extensions.Logging/wiki/NLog-properties-with-Microsoft-Extension-Logging
[14]: https://github.com/huorswords/Microsoft.Extensions.Logging.Log4Net.AspNetCore#using-beginscope
[15]: /fr/logs/log_collection/csharp/#configure-your-datadog-agent