---
aliases:
- /fr/logs/languages/csharp
further_reading:
- link: https://www.datadoghq.com/blog/c-logging-guide/
  tag: Blog
  text: Comment recueillir, personnaliser et analyser des logs C#
- link: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
  tag: Documentation
  text: Associer vos logs .NET à vos traces
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: En savoir plus sur le parsing
- link: /logs/explorer/
  tag: Documentation
  text: Apprendre à explorer vos logs
- link: /logs/explorer/#visualize
  tag: Documentation
  text: Effectuer des analyses de logs
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: FAQ
  text: Guide de dépannage pour la collecte de logs
- link: /glossary/#tail
  tag: Glossaire
  text: Entrée du glossaire pour le terme « tail » (suivi)
- link: https://github.com/DataDog/serilog-sinks-datadog-logs/
  tag: Paquet Github
  text: Paquet Serilog.Sinks.Datadog.Logs
title: Collecte de logs avec C#
---
Pour transmettre vos logs C# à Datadog, utilisez l'une des méthodes suivantes :

- [Enregistrez dans un fichier puis suivez ce fichier avec votre Agent Datadog](#file-tail-logging-with-the-datadog-agent)
- [Activez la journalisation sans agent](#agentless-logging-with-apm).
- [Utilisez le sink Serilog](#agentless-logging-with-serilog-sink).

## Journalisation par file-tail avec l'Agent Datadog {#file-tail-logging-with-the-datadog-agent}

L'approche recommandée pour la collecte de journaux C# consiste à consigner vos journaux dans un fichier, puis à [suivre][20] ce fichier avec votre Agent Datadog. Cela permet à l'Agent Datadog d'enrichir les journaux avec des métadonnées supplémentaires.

Datadog vous recommande fortement de configurer votre bibliothèque de journalisation de façon à générer vos logs au format JSON. Vous n'aurez ainsi pas besoin de créer de [règles de parsing personnalisées][1].

La journalisation par file-tail prend en charge les frameworks suivants :
- Serilog
- NLog
- log4net

### Configurez votre logger {#configure-your-logger}

{{< tabs >}}
{{% tab "Serilog" %}}

Comme de nombreuses autres bibliothèques pour .NET, Serilog fournit une journalisation de diagnostic dans des fichiers, la console et ailleurs. Il a une API claire et est portable entre les récentes plateformes .NET.

Contrairement aux autres bibliothèques de journalisation, Serilog est conçu pour fournir de précieuses données d'événement structurées.

Pour installer Serilog avec NuGet, exécutez la commande suivante dans la console du gestionnaire de packages :

```text
PM> Install-Package Serilog.Sinks.File
```

Ensuite, ajoutez le code suivant pour lancer le logger directement dans votre application :

```csharp
// Instantiate the logger
var log = new LoggerConfiguration()  // using Serilog;

    // using Serilog.Formatting.Json;
    .WriteTo.File(new JsonFormatter(renderMessage: true), "log.json")

    // using Serilog.Formatting.Compact;
    // .WriteTo.File(new RenderedCompactJsonFormatter(), "log.json")

    .CreateLogger();

// An example
var position = new { Latitude = 25, Longitude = 134 };
var elapsedMs = 34;

log.Information("Processed {@Position} in {Elapsed:000} ms.", position, elapsedMs);
```

Dans le fichier `log.json`, confirmez que le logger a été instancié avec succès :

- Si vous utilisez `JsonFormatter(renderMessage: true)`, recherchez l'événement suivant pour confirmation :

```json
{
  "MessageTemplate": "Processed {@Position} in {Elapsed:000} ms.",
  "Level": "Information",
  "Timestamp": "2016-09-02T15:02:29.648Z",
  "Renderings": {"Elapsed": [{"Format": "000", "Rendering": "034"}]},
  "RenderedMessage":"Processed { Latitude: 25, Longitude: 134 } in 034 ms.",
  "Properties": {"Position": {"Latitude": 25, "Longitude": 134}, "Elapsed": 34}
}
```

- Si vous utilisez `RenderedCompactJsonFormatter()`, recherchez l'événement suivant pour confirmation :

```json
{
  "@t": "2020-05-20T04:15:28.6898801Z",
  "@m": "Processed { Latitude: 25, Longitude: 134 } in 034 ms.",
  "@i": "d1eb2146",
  "Position": {"Latitude": 25, "Longitude": 134 },
  "Elapsed": 34
}
```

{{% /tab %}}
{{% tab "NLog" %}}

NLog est une plateforme de journalisation pour .NET avec des capacités riches de routage et de gestion des journaux. Elle peut vous aider à produire et gérer des journaux de haute qualité pour votre application, quelle que soit sa taille ou sa complexité.

Pour installer NLog avec NuGet, exécutez la commande suivante dans la console du gestionnaire de packages :

```text
PM> Install-Package NLog
```

Une fois la bibliothèque dans votre classpath, attachez la mise en page suivante à n'importe quelle cible. Modifiez ou ajoutez un fichier `NLog.config` au chemin racine du projet. Ensuite, copiez/collez le code suivant dans celui-ci (*Les journaux sont écrits dans le fichier `application-logs.json` *) :

```xml
<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <!--
  See https://github.com/nlog/nlog/wiki/Configuration-file
  for information on customizing logging rules and outputs.
   -->
  <targets async="true">
    <!-- Write logs as Json into a file -->
    <target name="json-file" xsi:type="File" fileName="application-logs.json">
      <layout xsi:type="JsonLayout">
        <attribute name="date" layout="${date:universalTime=true:format=o}" />
        <attribute name="level" layout="${level:upperCase=true}"/>
        <attribute name="message" layout="${message}" />
        <attribute name="exception" layout="${exception:format=ToString}" />
      </layout>
    </target>

  </targets>
  <rules>
    <!-- Log all events to the json-file target -->
    <logger name="*" writeTo="json-file" minlevel="Trace" />
  </rules>
</nlog>
```

Pour déclencher et enregistrer vos premiers événements, ajoutez ce qui suit à votre code :

```csharp
using NLog;

namespace Datadog
{
    class Program
    {
        // Initialize a logger
        private static Logger logger = LogManager.GetCurrentClassLogger();

        static void Main(string[] args)
        {
            // Log a simple debug message
            logger.Debug("This is my first step");

            // your code continues here ...
        }
    }
}
```

{{% /tab %}}
{{% tab "Log4Net" %}}
Log4Net est une plateforme de journalisation pour .NET inspirée de Log4j, avec des capacités riches de routage et de gestion des journaux. Elle peut vous aider à produire et gérer des journaux de haute qualité pour votre application, quelle que soit sa taille ou sa complexité.

Pour installer Log4Net, exécutez la commande suivante dans la console de gestion de paquet :

```text
PM> Install-Package log4net
PM> Install-Package log4net.Ext.Json
```

Une fois la bibliothèque installée, attachez la mise en page suivante à n'importe quelle cible. Modifiez le `App.config` de votre projet et ajoutez la section suivante :

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>

  <configSections>
    <section name="log4net" type="log4net.Config.Log4NetConfigurationSectionHandler, log4net" />
  </configSections>

  <log4net>
    <root>
      <level value="DEBUG" />
      <appender-ref ref="JsonFileAppender" />
    </root>
    <appender name="JsonFileAppender" type="log4net.Appender.FileAppender">
      <threshold value="DEBUG"/>
      <file value="application-logs.json" />
      <encoding type="System.Text.UTF8Encoding" />
      <appendToFile value="true" />
      <layout type="log4net.Layout.SerializedLayout, log4net.Ext.Json">
        <decorator type="log4net.Layout.Decorators.StandardTypesDecorator, log4net.Ext.Json" />
        <default />
        <!--explicit default members-->
        <remove value="ndc" />
        <remove value="message" />
        <!--remove the default preformatted message member-->
        <member value="message:messageobject" />
        <!--add raw message-->
      </layout>
    </appender>
  </log4net>

  <!-- The rest of your configuration starts here ... -->
```

Instanciez votre logger et commencez à déclencher vos événements :

```csharp
using log4net;

namespace Datadog
{
    class Program
    {
        // Get the current class logger
        private static ILog logger = LogManager.GetLogger(typeof(Program));

        static void Main(string[] args)
        {

           // Load the configure fom App.config
           XmlConfigurator.Configure();

           // Log a simple debug message
           logger.Debug("This is my first debug message");

           // your code continues here ...
        }
    }
}
```

Si vous avez suivi les instructions, vous devriez voir dans votre fichier (par exemple `C:\Projects\Datadog\Logs\log.json`) l'événement suivant :

```json
{
  "level": "DEBUG",
  "message": "This is my debug message",
  "date": "2016-05-24 15:53:35.7175",
  "appname": "Datadog.vshost.exe",
  "logger": "Datadog.Program",
  "thread": "10"
}
```

Si, malgré les avantages de la journalisation en JSON, vous souhaitez journaliser au format de chaîne brute, essayez de mettre à jour le `log4net conversion pattern` pour analyser automatiquement vos journaux avec l'intégration C# Pipeline comme suit :

```text
<param name="ConversionPattern" value="%date{yyyy-MM-dd HH:mm:ss.SSS} %level [%thread] %logger %method:%line - %message%n" />
```

{{% /tab %}}
{{< /tabs >}}

### Configurer l'Agent Datadog {#configure-the-datadog-agent}

Une fois la [collecte de logs activée][2], configurez la [collecte de logs personnalisée][3] pour suivre vos fichiers de logs et les transmettre à Datadog.

1. Créez un dossier `csharp.d/` dans le `conf.d/` [répertoire de configuration de l'Agent][4].
2. Créez un fichier `conf.yaml` dans `csharp.d/` avec le contenu suivant :

    ```yaml
    init_config:

    instances:

    ##Log section
    logs:

      - type: file
        path: "<path_to_your_csharp_log>.log"
        service: <service_name>
        source: csharp
        sourcecategory: sourcecode
        # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
        #log_processing_rules:
        #  - type: multi_line
        #    name: new_log_start_with_date
        #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```
3. Assurez-vous que l'utilisateur de l'Agent a des permissions de lecture sur le fichier journal.
4. [Redémarrez l'Agent][5].
5. Exécutez la [sous-commande d'état de l'Agent][6] et recherchez `csharp` sous la section `Checks` pour confirmer que les journaux sont soumis avec succès à Datadog.

Si les journaux sont au format JSON, Datadog [analyse automatiquement les messages de journal][7] pour extraire les attributs des journaux. Utilisez le [Log Explorer][8] pour visualiser et dépanner vos journaux.

### Connectez votre service à travers les journaux et les traces {#connect-your-service-across-logs-and-traces}

Si APM est activé pour cette application, connectez vos journaux et traces en ajoutant automatiquement des identifiants de trace, des identifiants de span,
`env`, `service` et `version` à vos journaux en [suivant les instructions APM .NET][9]

**Remarque ** : Si le SDK Datadog injecte `service` dans vos journaux, cela remplace la valeur définie dans la configuration de l'Agent.

## Journalisation sans agent avec APM {#agentless-logging-with-apm}

Il est possible de diffuser des journaux de votre application vers Datadog directement, sans apporter de modifications au code, en utilisant la bibliothèque d'instrumentation automatique APM .NET. Cette approche envoie les journaux directement à Datadog, donc elle ne bénéficie pas des [fonctionnalités telles que le nettoyage des données sensibles][10] qui sont fournies par l'agent Datadog. Pour cette raison, nous recommandons d'utiliser la journalisation par file tail lorsque cela est possible, mais elle est utile dans les environnements où cela n'est pas possible (lors de l'utilisation de [Azure App Service][11] par exemple). Il convient de noter que vous pourrez toujours compter sur les capacités de nettoyage côté serveur effectuées par [Sensitive Data Scanner][12].

Le logging sans Agent (ou « transmission directe des logs ») est compatible avec les frameworks suivants :
- Serilog (v1.0+)
- NLog (v2.1+)
- log4net (v1.0+)
- Microsoft.Extensions.Logging (2.0+)

Aucune modification du code de votre application n'est requise, et vous n'aurez pas non plus à installer des dépendances supplémentaires pour votre application.

<div class="alert alert-danger">
  <strong>Remarque </strong> : Si vous utilisez log4net ou NLog, un appender (log4net) ou un logger (NLog) doit être configuré pour que la journalisation sans agent soit activée. Dans ces cas, vous pouvez soit ajouter ces dépendances supplémentaires, soit utiliser <a href="/logs/log_collection/csharp/?tab=log4net#agentless-logging-with-serilog-sink">la journalisation sans agent avec le sink Serilog</a> à la place.
</div>


### Configurer le SDK Datadog {#configure-the-datadog-sdk}

La journalisation sans agent n'est disponible que lors de l'utilisation d'APM avec instrumentation automatique. Pour commencer, instrumentez votre application comme décrit dans les documents suivants :

- [applications .NET Core/.NET 5+][13]
- [applications .NET Framework][14]

Une fois l'installation effectuée, vérifiez que vous recevez correctement les traces.

### Activer la journalisation sans agent {#enable-agentless-logging}

Pour activer le logging sans Agent, définissez les variables d'environnement suivantes :

`DD_API_KEY`
: Votre [clé API Datadog][15] pour envoyer vos journaux à Datadog.

`DD_SITE`
: Le nom de [votre site Datadog][16]. Choisissez parmi l'un des exemples suivants :<br>
**Exemple**: `datadoghq.com` (US1), `datadoghq.eu` (UE), `us3.datadoghq.com` (US3), `us5.datadoghq.com` (US5), `ap1.datadoghq.com` (AP1), `ap2.datadoghq.com` (AP2), `ddog-gov.com` (US1-FED), `us2.ddog-gov.com` (US2-FED) <br>
**Par défaut**: `datadoghq.com` (US1)

`DD_LOGS_INJECTION`
: Active la connexion des journaux et des traces [9] :<br>
**Par défaut** : `true` <br>
Activé par défaut à partir de la version 3.24.0 de Tracer.

`DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS`
: Active la journalisation sans agent. Activez cette option pour votre cadre de journalisation en la définissant sur `Serilog`, `NLog`, `Log4Net` ou `ILogger` (pour `Microsoft.Extensions.Logging`). Si vous utilisez plusieurs cadres de journalisation, utilisez une liste de variables séparées par des points-virgules.<br>
**Exemple** : `Serilog;Log4Net;NLog`

<div class="alert alert-danger">
  <strong>Remarque :</strong> Si vous utilisez un cadre de journalisation en conjonction avec <code>Microsoft.Extensions.Logging</code>, vous devrez généralement utiliser le nom du cadre. Par exemple, si vous utilisez <a href="https://github.com/serilog/serilog-extensions-logging">Serilog.Extensions.Logging</a>, vous devez définir <code>DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS=Serilog</code>.
</div>

Redémarrez votre application après avoir défini ces variables d'environnement.

### Configuration supplémentaire {#additional-configuration}

Vous pouvez configurer plus en détail certains aspects de la collecte de logs sans Agent à l'aide des variables d'environnement suivantes :

`DD_LOGS_DIRECT_SUBMISSION_MINIMUM_LEVEL`
: Permet de filtrer les journaux par niveau _avant_ qu'ils ne soient envoyés à Datadog. Définissez sur l'une des valeurs suivantes: `Verbose`, `Debug`, `Information`, `Warning`, `Error`, `Critical`. Ceci correspond aux niveaux équivalents dans les cadres de journalisation pris en charge.<br>
**Par défaut**: `Information`

`DD_LOGS_DIRECT_SUBMISSION_HOST`
: Définissez le nom de la machine hôte associé aux journaux. Si non fourni, le nom de l'hôte sera recherché automatiquement.<br>
**Par défaut** : Déterminé automatiquement

`DD_LOGS_DIRECT_SUBMISSION_TAGS`
: Si spécifié, ajoute tous les tags spécifiés à tous les spans générés. Si non fourni, utilisera `DD_TAGS` à la place.<br>
**Exemple** : `layer:api, team:intake`
Notez que le délimiteur est une virgule et un espace : `, `.

Les variables de configuration suivantes ne doivent généralement pas être modifiées, mais vous pouvez les définir si vous le souhaitez.

`DD_LOGS_DIRECT_SUBMISSION_URL`
: Définit l'URL où les journaux doivent être soumis. Utilise le domaine fourni dans `DD_SITE` par défaut.<br>
**Par défaut** : `{{< region-param key=http_endpoint_full >}}:443` (based on `DD_SITE`)

`DD_LOGS_DIRECT_SUBMISSION_SOURCE`
: Définit la règle d'analyse pour les journaux soumis. Doit toujours être défini sur `csharp`, sauf si vous avez un [pipeline personnalisé][17].<br>
**Par défaut**: `csharp`

`DD_LOGS_DIRECT_SUBMISSION_MAX_BATCH_SIZE`
: Définit le nombre maximum de journaux à envoyer à la fois. Prend en compte les [limites en place pour l'API][18].<br>
**Par défaut**: `1000`

`DD_LOGS_DIRECT_SUBMISSION_MAX_QUEUE_SIZE`
: Définit le nombre maximum de journaux à conserver dans la file d'attente interne à tout moment avant de supprimer les messages de journal.<br>
**Par défaut** : `100000`

`DD_LOGS_DIRECT_SUBMISSION_BATCH_PERIOD_SECONDS`
: Définit le temps d'attente (en secondes) avant de vérifier les nouveaux journaux à envoyer.<br>
**Par défaut** : `1`

Si vous utilisez l'`Microsoft.Extensions.Logging` intégration, vous pouvez filtrer les journaux envoyés à Datadog en utilisant les capacités standard intégrées dans `ILogger`. Utilisez la clé `"Datadog"` pour identifier le fournisseur de soumission directe et définissez les niveaux de journal minimum pour chaque espace de noms. Par exemple, ajouter ce qui suit à votre `appSettings.json` empêcherait l'envoi de tout journal avec un niveau inférieur à `Warning` à Datadog. Introduit dans le SDK .NET v2.20.0.

```json
{
  "Logging": {
    "Datadog": {
      "LogLevel": {
        "Microsoft.AspNetCore": "Warning"
      },
    }
  }
}
```

## Journalisation sans agent avec le sink Serilog {#agentless-logging-with-serilog-sink}

<div class="alert alert-info">Depuis <code>0.2.0</code>, vous pouvez configurer le sink Datadog en utilisant un <code>appsettings.json</code> fichier avec le <a href="https://github.com/serilog/serilog-settings-configuration"><code>Serilog.Setting.Configuration</code></a> paquet.
Pour plus d'informations, consultez le <a href="https://github.com/DataDog/serilog-sinks-datadog-logs/tree/master?tab=readme-ov-file#serilogsinksdatadoglogs">`Serilog.Sinks.Datadog.Logs`</a> paquet.</div>

S'il n'est pas possible d'utiliser la journalisation par file-tail ou la journalisation sans agent APM, et que vous utilisez le `Serilog`framework, vous pouvez alors utiliser le Datadog [Serilog sink][19] pour envoyer des journaux directement à Datadog.

Installez le [Datadog Serilog sink][19] dans votre application, qui envoie des événements et des journaux à Datadog. Par défaut, le sink transfère les journaux via HTTPS sur le port 443.
Exécutez la commande suivante dans la console du gestionnaire de paquets :

```text
PM> Install-Package Serilog.Sinks.Datadog.Logs
```

Ensuite, initialisez le logger directement dans votre application. Assurez-vous d'[ajouter votre `<API_KEY>`][15].

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "{{< region-param key="http_endpoint_full" >}}" })
    .CreateLogger())
{
    // Some code
}
```

Désormais, les nouveaux logs sont directement envoyés à Datadog.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/parsing
[2]: /fr/agent/logs/?tab=tailfiles#activate-log-collection
[3]: /fr/agent/logs/?tab=tailfiles#custom-log-collection
[4]: /fr/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[5]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[6]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[7]: /fr/logs/log_configuration/parsing/?tab=matchers
[8]: /fr/logs/explorer/#overview
[9]: /fr/tracing/other_telemetry/connect_logs_and_traces/dotnet/
[10]: /fr/agent/logs/advanced_log_collection
[11]: /fr/serverless/azure_app_services
[12]: /fr/security/sensitive_data_scanner/
[13]: /fr/tracing/trace_collection/dd_libraries/dotnet-core
[14]: /fr/tracing/trace_collection/dd_libraries/dotnet-framework
[15]: https://app.datadoghq.com/organization-settings/api-keys
[16]: /fr/getting_started/site/
[17]: /fr/logs/log_configuration/pipelines/?tab=source
[18]: /fr/api/latest/logs/#send-logs
[19]: https://www.nuget.org/packages/Serilog.Sinks.Datadog.Logs
[20]: /fr/glossary/#tail