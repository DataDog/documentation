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
  tag: Package GitHub
  text: Package Serilog.Sinks.Datadog.Logs
title: Collecte de logs avec C#
---
Pour transmettre vos logs C# à Datadog, utilisez l'une des méthodes suivantes :

- [Écrivez les logs dans un fichier, puis utilisez votre Datadog Agent pour suivre ce fichier](#file-tail-logging-with-the-datadog-agent).
- [Activez la journalisation sans agent](#agentless-logging-with-apm).
- [Utilisez le sink Serilog](#agentless-logging-with-serilog-sink).

## Collecte des logs par suivi de fichier avec le Datadog Agent {#file-tail-logging-with-the-datadog-agent}

L'approche recommandée pour la collecte des logs C# consiste à écrire les logs dans un fichier, puis à [suivre][20] ce fichier avec le Datadog Agent. Cela permet au Datadog Agent d'enrichir les logs avec des métadonnées supplémentaires.

Datadog vous recommande fortement de configurer votre bibliothèque de journalisation de façon à générer vos logs au format JSON. Vous n'aurez ainsi pas besoin de créer de [règles de parsing personnalisées][1].

La collecte des logs par suivi de fichier prend en charge les frameworks suivants :
- Serilog
- NLog
- log4net

### Configurez votre logger {#configure-your-logger}

{{< tabs >}}
{{% tab "Serilog" %}}

Comme beaucoup d'autres bibliothèques pour .NET, Serilog fournit une journalisation de diagnostic dans des fichiers, la console et ailleurs. Il possède une API propre et est portable entre les plateformes .NET récentes.

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

NLog est une plateforme de logging pour .NET dotée de nombreuses fonctionnalités de routage et de gestion des logs. Elle peut vous aider à produire et à gérer des logs de haute qualité pour votre application, quelle que soit sa taille ou sa complexité.

Pour installer NLog avec NuGet, exécutez la commande suivante dans la console du gestionnaire de packages :

```text
PM> Install-Package NLog
```

Une fois la bibliothèque dans votre classpath, associez le layout suivant à n'importe quel target. Modifiez ou ajoutez un fichier `NLog.config` à la racine du projet. Ensuite, copiez-collez le code suivant dans ce fichier (*Les logs sont écrits dans le fichier `application-logs.json`*) :

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
log4net est une plateforme de logging pour .NET inspirée de Log4j, dotée de nombreuses fonctionnalités de routage et de gestion des logs. Elle peut vous aider à produire et à gérer des logs de haute qualité pour votre application, quelle que soit sa taille ou sa complexité.

Pour installer Log4Net, exécutez la commande suivante dans la console de gestion de paquet :

```text
PM> Install-Package log4net
PM> Install-Package log4net.Ext.Json
```

Une fois la bibliothèque installée, associez le layout suivant à n'importe quel target. Modifiez le `App.config` de votre projet et ajoutez la section suivante :

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

Si, malgré les avantages des logs au format JSON, vous souhaitez produire des logs sous forme de chaînes brutes, essayez de mettre à jour le `log4net conversion pattern` pour analyser automatiquement vos logs avec le C# integration Pipeline, comme suit :

```text
<param name="ConversionPattern" value="%date{yyyy-MM-dd HH:mm:ss.SSS} %level [%thread] %logger %method:%line - %message%n" />
```

{{% /tab %}}
{{< /tabs >}}

### Configurez Datadog Agent{#configure-the-datadog-agent}

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
3. Assurez-vous que l'utilisateur de l'Agent dispose des droits de lecture sur le fichier de logs.
4. [Redémarrez l'Agent][5].
5. Exécutez la [sous-commande de statut de l'Agent][6] et recherchez `csharp` dans la section {{< ui >}}Checks{{< /ui >}} pour confirmer que les logs sont bien envoyés à Datadog.

Si les logs sont au format JSON, Datadog [analyse automatiquement les messages de logs][7] pour en extraire les attributs. Utilisez le [Log Explorer][8] pour consulter vos logs et résoudre les problèmes associés.

### Reliez votre service aux logs et aux traces {#connect-your-service-across-logs-and-traces}

Si l'APM est activé pour cette application, connectez vos logs et vos traces en ajoutant automatiquement les ID de trace, les ID de span,
`env`, `service` et `version` à vos logs en [suivant les instructions APM .NET][9]

**Remarque** : si le SDK Datadog injecte `service` dans vos logs, cela remplace la valeur définie dans la configuration de l'Agent.

## Journalisation sans agent avec APM {#agentless-logging-with-apm}

Il est possible de diffuser les logs de votre application vers Datadog directement, sans effectuer de modifications de code, en utilisant la bibliothèque d'instrumentation automatique APM .NET. Cette approche envoie les logs directement à Datadog et ne bénéficie donc pas des [fonctionnalités telles que le masquage des données sensibles][10] fournies par le Datadog Agent. Pour cette raison, nous recommandons la collecte des logs par suivi de fichier lorsque cela est possible. La journalisation sans agent reste toutefois utile lorsque cette collecte n'est pas possible, par exemple avec [Azure App Service][11]. Il convient de noter que vous pourrez toujours compter sur les capacités de masquage côté serveur effectuées par le [Sensitive Data Scanner][12].

Le logging sans Agent (ou « transmission directe des logs ») est compatible avec les frameworks suivants :
- Serilog (v1.0+)
- NLog (v2.1+)
- log4net (v1.0+)
- Microsoft.Extensions.Logging (2.0+)

Aucune modification du code de votre application n'est requise, et vous n'aurez pas non plus à installer des dépendances supplémentaires pour votre application.

<div class="alert alert-danger">
  <strong>Remarque :</strong> Si vous utilisez log4net ou NLog, un appender (log4net) ou un logger (NLog) doit être configuré pour que la journalisation sans agent soit activée. Dans ces cas, vous pouvez soit ajouter ces dépendances supplémentaires, soit utiliser <a href="/logs/log_collection/csharp/?tab=log4net#agentless-logging-with-serilog-sink">la journalisation sans agent avec le sink Serilog</a> à la place.
</div>


### Configurez le SDK Datadog {#configure-the-datadog-sdk}

La journalisation sans agent n'est disponible que lorsque vous utilisez l'APM avec l'instrumentation automatique. Pour commencer, instrumentez votre application comme décrit dans les documents suivants :

- [Applications .NET Core/.NET 5+][13]
- [Applications .NET Framework][14]

Une fois l'installation effectuée, vérifiez que vous recevez correctement les traces.

### Activez la journalisation sans agent {#enable-agentless-logging}

Pour activer le logging sans Agent, définissez les variables d'environnement suivantes :

`DD_API_KEY`
: Votre [Datadog API Key][15] pour envoyer vos logs à Datadog.

`DD_SITE`
: Le nom de [votre site Datadog][16]. Choisissez l’un des exemples suivants :<br>
**Exemple**: `datadoghq.com` (US1), `datadoghq.eu` (EU), `us3.datadoghq.com` (US3), `us5.datadoghq.com` (US5), `ap1.datadoghq.com` (AP1), `ap2.datadoghq.com` (AP2), `ddog-gov.com` (US1-FED), `us2.ddog-gov.com` (US2-FED) <br>
**Par défaut**: `datadoghq.com` (US1)

`DD_LOGS_INJECTION`
: Active la [connexion des logs et des traces][9] :<br>
**Par défaut** : `true` <br>
Activé par défaut à partir de la version 3.24.0 de Tracer.

`DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS`
: Active la journalisation sans agent. Pour l’activer dans votre framework de journalisation, définissez la valeur sur `Serilog`, `NLog`, `Log4Net` ou `ILogger` (pour `Microsoft.Extensions.Logging`). Si vous utilisez plusieurs frameworks de journalisation, utilisez une liste de variables séparées par des points-virgules.<br>
**Exemple** : `Serilog;Log4Net;NLog`

<div class="alert alert-danger">
  <strong>Remarque :</strong> Si vous utilisez un framework de journalisation conjointement avec <code>Microsoft.Extensions.Logging</code>, vous devrez généralement utiliser le nom du framework. Par exemple, si vous utilisez <a href="https://github.com/serilog/serilog-extensions-logging">Serilog.Extensions.Logging</a>, vous devez définir <code>DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS=Serilog</code>.
</div>

Redémarrez votre application après avoir défini ces variables d'environnement.

### Configuration supplémentaire {#additional-configuration}

Vous pouvez configurer plus en détail certains aspects de la collecte de logs sans Agent à l'aide des variables d'environnement suivantes :

`DD_LOGS_DIRECT_SUBMISSION_MINIMUM_LEVEL`
: Permet de filtrer les logs par niveau _avant_ qu’ils ne soient envoyés à Datadog. Définissez l'une des valeurs suivantes: `Verbose`, `Debug`, `Information`, `Warning`, `Error`, `Critical`. Celles-ci correspondent aux niveaux équivalents dans les frameworks de journalisation pris en charge.<br>
**Par défaut**: `Information`

`DD_LOGS_DIRECT_SUBMISSION_HOST`
: Définissez le nom de la machine hôte associée aux logs. Si aucun nom d'hôte n'est fourni, une tentative de détection automatique sera effectuée.<br>
**Par défaut** : Déterminé automatiquement

`DD_LOGS_DIRECT_SUBMISSION_TAGS`
: Si spécifié, ajoute tous les tags indiqués à toutes les spans générées. Si aucune valeur n'est fournie, `DD_TAGS` sera utilisé à la place.<br>
**Exemple** : `layer:api, team:intake`
Notez que le délimiteur est une virgule suivie d'une espace : `, `.

Les variables de configuration suivantes ne doivent généralement pas être modifiées, mais vous pouvez les définir si vous le souhaitez.

`DD_LOGS_DIRECT_SUBMISSION_URL`
 : Définit l'URL à laquelle les logs doivent être envoyés. Utilise le domaine fourni dans `DD_SITE` par défaut.<br>
**Par défaut** : `{{< region-param key=http_endpoint_full >}}:443` (based on `DD_SITE`)

`DD_LOGS_DIRECT_SUBMISSION_SOURCE`
: Définit la règle d'analyse pour les logs envoyés. Doit toujours être défini sur `csharp`, sauf si vous disposez d'un [pipeline personnalisé][17].<br>
**Par défaut**: `csharp`

`DD_LOGS_DIRECT_SUBMISSION_MAX_BATCH_SIZE`
: Définit le nombre maximal de logs à envoyer en une seule fois. Prend en compte les [limites applicables à l'API][18].<br>
**Par défaut**: `1000`

`DD_LOGS_DIRECT_SUBMISSION_MAX_QUEUE_SIZE`
 : Définit le nombre maximal de logs que la file d'attente interne peut contenir à un moment donné avant que les messages de log ne soient abandonnés.<br>
**Par défaut** : `100000`

`DD_LOGS_DIRECT_SUBMISSION_BATCH_PERIOD_SECONDS`
 : Définit le temps d'attente (en secondes) avant de vérifier la présence de nouveaux logs à envoyer.<br>
**Par défaut** : `1`

Si vous utilisez l'intégration `Microsoft.Extensions.Logging`, vous pouvez filtrer les logs envoyés à Datadog en utilisant les fonctionnalités standard intégrées à `ILogger`. Utilisez la clé `"Datadog"` pour identifier le fournisseur de soumission directe et définissez les niveaux de log minimaux pour chaque espace de noms. Par exemple, l'ajout de ce qui suit à votre `appSettings.json` empêcherait l'envoi de logs d'un niveau inférieur à `Warning` vers Datadog. Introduit dans le SDK .NET v2.20.0.

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

## Agentless logging avec Serilog sink {#agentless-logging-with-serilog-sink}

<div class="alert alert-info">Depuis <code>0.2.0</code>, vous pouvez configurer le Datadog sink en utilisant un <code>appsettings.json</code> fichier avec le <a href="https://github.com/serilog/serilog-settings-configuration"><code>Serilog.Setting.Configuration</code>package </a>.
Pour plus d'informations, consultez le <a href="https://github.com/DataDog/serilog-sinks-datadog-logs/tree/master?tab=readme-ov-file#serilogsinksdatadoglogs"><code>Serilog.Sinks.Datadog.Logs</code>package </a>.</div>

S'il n'est pas possible d'utiliser le file-tail logging ou l'APM Agentless logging, et que vous utilisez le framework `Serilog`, vous pouvez utiliser le [Datadog Serilog sink][19] pour envoyer les logs directement à Datadog.

Installez le [Datadog Serilog sink][19] dans votre application pour envoyer les événements et les logs à Datadog. Par défaut, le sink transfère les logs via HTTPS sur le port 443.
Exécutez la commande suivante dans Package Manager Console :

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

## Pour aller plus loin {#further-reading}

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