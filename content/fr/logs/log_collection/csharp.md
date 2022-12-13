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
- link: /logs/explorer/#visualiser-les-donnees
  tag: Documentation
  text: Effectuer des analyses de logs
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: FAQ
  text: Guide de dépannage pour la collecte de logs
kind: documentation
title: Collecte de logs avec C#
---

Pour transmettre vos logs C# à Datadog, utilisez l'une des méthodes suivantes :

- [Enregistrer les logs dans un fichier et suivre ce fichier avec votre Agent Datadog](#logging-dans-un-fichier-suivi-avec-l-agent-datadog).
- [Activer le logging sans Agent](#logging-sans-agent-avec-apm).
- [Utiliser le récepteur Serilog](#logging-sans-agent-avec-le-recepteur-serilog).

Cette page offre des exemples de configuration avec les bibliothèques de logging `Serilog`, `NLog`, `log4net` et `Microsoft.Extensions.Logging` pour chacune des méthodes ci-dessus.

## Logging dans un fichier suivi avec l'Agent Datadog

Pour recueillir des logs C#, il est conseillé d'écrire ces logs dans un fichier et de suivre ce fichier avec votre Agent Datadog. L'Agent pourra ainsi enrichir les logs en y ajoutant des métadonnées supplémentaires.

Datadog vous recommande fortement de configurer votre bibliothèque de journalisation de façon à générer vos logs au format JSON. Vous n'aurez ainsi pas besoin de créer de [règles de parsing personnalisées][1].

### Configurer votre logger

{{< tabs >}}
{{% tab "Serilog" %}}

Comme bien d'autres bibliothèques pour .NET, Serilog vous permet d'effectuer une journalisation de diagnostic dans des fichiers, la console ou d'autres emplacements. Cette approche repose sur une API épurée et est compatible avec les plateformes .NET récentes.

Contrairement aux autres bibliothèques de journalisation, Serilog est conçu pour fournir de précieuses données d'événement structurées.

Pour installer Serilog avec NuGet, exécutez la commande suivante dans la console du gestionnaire de packages :

```text
PM> Install-Package Serilog.Sinks.File
```

Ensuite, ajoutez le code suivant pour lancer le logger directement dans votre application :

```csharp
// Instancier le logger
var log = new LoggerConfiguration()  // avec Serilog ;

    // avec Serilog.Formatting.Json ;
    .WriteTo.File(new JsonFormatter(renderMessage: true), "log.json")

    // avec Serilog.Formatting.Compact ;
    // .WriteTo.File(new RenderedCompactJsonFormatter(), "log.json")

    .CreateLogger();

// Exemple
var position = new { Latitude = 25, Longitude = 134 };
var elapsedMs = 34;

log.Information("Processed {@Position} in {Elapsed:000} ms.", position, elapsedMs);
```

Dans le fichier `log.json`, vérifiez qu'une instance du logger a bien été lancée :

- Si vous utilisez `JsonFormatter(renderMessage: true)`, la présence de l'événement suivant fera office de confirmation :

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

- Si vous utilisez `RenderedCompactJsonFormatter()`, la présence de l'événement suivant fera office de confirmation :

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

NLog est une plateforme de journalisation pour .NET dotée d'un acheminement de log riche et de fonctionnalités de gestion. Elle vous aide à générer et à gérer des logs de haute qualité pour votre application, peu importe sa taille ou sa complexité.

Pour installer NLog avec NuGet, exécutez la commande suivante dans la console du gestionnaire de packages :

```text
PM> Install-Package NLog
```

Une fois la bibliothèque dans votre classpath, ajoutez la disposition suivante à n'importe quelle cible. Ajoutez un fichier `NLog.config` au chemin racine du projet ou modifiez-le. Copiez ensuite le code suivant et collez-le à cet endroit (*les logs sont rédigés dans le fichier `application-logs.json`*) :

```xml
<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <!--
  Consultez https://github.com/nlog/nlog/wiki/Configuration-file
  pour en savoir plus sur la personnalisation des règles et des sorties.
   -->
  <targets async="true">
    <!-- Rédiger les logs au format JSON dans un fichier -->
    <target name="json-file" xsi:type="File" fileName="application-logs.json">
      <layout xsi:type="JsonLayout">
        <attribute name="date" layout="${date:format=yyyy-MM-ddTHH\:mm\:ss.fff}" />
        <attribute name="level" layout="${level:upperCase=true}"/>
        <attribute name="message" layout="${message}" />
        <attribute name="exception" layout="${exception:format=ToString}" />
      </layout>
    </target>

  </targets>
  <rules>
    <!-- Enregistrer tous les événements dans la cible json-file -->
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
        // Initialiser un logger
        private static Logger logger = LogManager.GetCurrentClassLogger();

        static void Main(string[] args)
        {
            // Enregistrer un message de debugging simple
            logger.Debug("This is my first step");

            // Indiquer le reste de votre code ici…
        }
    }
}
```

{{% /tab %}}
{{% tab "Log4Net" %}}
Log4Net est une plateforme de journalisation pour .NET inspirée de Log4j. Elle est dotée d'un acheminement de log riche et de fonctionnalités de gestion. Elle vous aide à générer et à gérer des logs de haute qualité pour votre application, peu importe sa taille ou sa complexité.

Pour installer Log4Net, exécutez la commande suivante dans la console de gestion de paquet :

```text
PM> Install-Package log4net
PM> Install-Package log4net.Ext.Json
```

Une fois la bibliothèque installée, ajoutez la disposition suivante à n'importe quelle cible. Modifiez le `App.config` de votre projet et ajoutez la section suivante :

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
        <!--membres explicites par défaut-->
        <remove value="ndc" />
        <remove value="message" />
        <!--supprimer le membre du message préformaté par défaut-->
        <member value="message:messageobject" />
        <!--ajouter un message brut-->
      </layout>
    </appender>
  </log4net>

  <!-- Insérer ici le reste de votre configuration... -->
```

Instanciez votre logger et commencez à déclencher vos événements :

```csharp
avec log4net ;

namespace Datadog
{
    class Program
    {
        // Obtenir le logger de la classe actuelle
        private static ILog logger = LogManager.GetLogger(typeof(Program));

        static void Main(string[] args)
        {

           // Charger la configuration depuis App.config
           XmlConfigurator.Configure();

           // Loguer un message de debugging simple
           logger.Debug("Mon premier message de debugging");

           // Indiquer le reste de votre code ici…
        }
    }
}
```

Si vous avez suivi ces instructions, l'événement suivant doit apparaître dans votre fichier (par exemple `C:\Projects\Datadog\Logs\log.json`) :

```json
{
  "level": "DEBUG",
  "message": "Ceci est mon message de debugging",
  "date": "2016-05-24 15:53:35.7175",
  "appname": "Datadog.vshost.exe",
  "logger": "Datadog.Program",
  "thread": "10"
}
```

Si, malgré les avantages de la journalisation en JSON, vous souhaitez activer la journalisation au format de chaîne brute, essayez de modifier le `log4net conversion pattern` pour de façon à parser automatiquement vos logs avec le pipeline d'intégration C# comme suit :

```text
<param name="ConversionPattern" value="%date{yyyy-MM-dd HH:mm:ss.SSS} %level [%thread] %logger %method:%line - %message%n" />
```

{{% /tab %}}
{{< /tabs >}}

### Configurer l'Agent Datadog

Une fois la [collecte de logs activée][2], configurez la [collecte de logs personnalisée][3] pour suivre vos fichiers de logs et les transmettre à Datadog.

1. Créez un dossier `csharp.d/` dans le dossier `conf.d/` du [répertoire de configuration de l'Agent][4].
2. Créez un fichier `conf.yaml` dans votre dossier `csharp.d/` avec le contenu suivant :

    ```yaml
    init_config:

    instances:

    ##Log section
    logs:

      - type: file
        path: "/path/to/your/csharp/log.log"
        service: csharp
        source: csharp
        sourcecategory: sourcecode
        # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
        #log_processing_rules:
        #  - type: multi_line
        #    name: new_log_start_with_date
        #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```

3. [Redémarrez l'Agent][5].
4. Lancez la [sous-commande status de l'Agent][6] et cherchez `csharp` dans la section `Checks` pour vérifier que les logs sont bien transmis à Datadog.

Si les logs sont au format JSON, Datadog [parse automatiquement les messages de log][7] pour extraire les attributs. Utilisez le [Log Explorer][8] pour visualiser et dépanner vos logs.

### Associer votre service à l'ensemble des logs et traces

Si APM est activé pour cette application, associez vos logs et vos traces en ajoutant automatiquement l'ID des traces, l'ID des spans et les paramètres `env`, `service` et `version` à vos logs. Pour ce faire, [suivez les instructions relatives à l'utilisation de .NET pour APM][9].

**Remarque** : si le traceur de l'APM injecte `service` dans vos logs, cela remplace la valeur définie dans la configuration de l'Agent.

## Logging sans Agent avec APM

Grâce à la bibliothèque d'instrumentation automatique .NET de la solution APM, vous avez la possibilité de transmettre automatiquement les logs de votre application vers Datadog sans aucune modification du code. Les logs étant envoyés directement à la plateforme, vous ne pourrez pas profiter de certaines [fonctionnalités proposées par l'Agent][10], telles que le nettoyage des données sensibles. Nous vous conseillons donc d'écrire les logs dans un fichier suivi par l'Agent, bien que le logging sans Agent soit utile dans les environnements non compatibles avec cette méthode (par exemple, lorsque vous utilisez [Azure App Service][11]). Notons toutefois que vous pourrez quand même nettoyer les données sensibles côté serveur à l'aide du [Scanner de données sensibles][12].

Le logging sans Agent (ou « transmission directe des logs ») est compatible avec les frameworks suivants :
- Serilog (v1.0+)
- NLog (v2.1+)
- log4net (v1.0+)
- Microsoft.Extensions.Logging (2.0+)

Aucune modification du code de votre application n'est requise, et vous n'aurez pas non plus à installer des dépendances supplémentaires pour votre application.

<div class="alert alert-warning">
  <strong>Remarque :</strong> si vous utilisez log4net ou NLog, un appender (log4net) ou un logger (NLog) doit être configuré pour tirer parti du logging sans Agent. Dans ce cas, vous devrez ajouter ces dépendances supplémentaires ou utiliser le <a href="/logs/log_collection/csharp/?tab=log4net#agentless-logging-with-serilog-sink">logging sans Agent avec le récepteur Serilog</a> à la place.
</div>


### Configurer la bibliothèque APM

Le logging sans Agent est uniquement disponible lorsque vous utilisez APM avec l'instrumentation automatique. Pour commencer, instrumentez votre application conformément aux instructions dans les documents suivants :

- [Applications .NET Core/.NET 5+][13]
- [Applications .NET Framework][14]

Une fois l'installation effectuée, vérifiez que vous recevez correctement les traces.

### Activer le logging sans Agent

Pour activer le logging sans Agent, définissez les variables d'environnement suivantes :

`DD_API_KEY`
: Votre [clé d'API Datadog][15] pour envoyer vos logs à Datadog.

`DD_SITE`
: Le nom de [votre site Datadog][16]. Choisissez un site parmi les exemples suivants :<br>
**Exemple** : `datadoghq.com` (US1), `datadoghq.eu` (EU), `us3.datadoghq.com` (US3), `us5.datadoghq.com` (US5), `ddog-gov.com` (US1-FED) <br>
**Valeur par défaut** : `datadoghq.com` (US1)

`DD_LOGS_INJECTION`
: Permet d'activer l'[association des logs et des traces][9].<br>
**Valeur par défaut** : `true` <br>
Cette variable est activée par défaut lorsque vous utilisez le logging sans Agent depuis la version 2.7.0 du traceur.

`DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS`
: Permet d'activer le logging sans Agent. Activez cette fonctionnalité pour votre framework de logging en définissant cette variable sur `Serilog`, `NLog`, `Log4Net` ou `ILogger` (pour `Microsoft.Extensions.Logging`). Si vous utilisez plusieurs frameworks de logging, saisissez une une liste de valeurs séparées par des points-virgules.<br>
**Exemple** : `Serilog;Log4Net;NLog`

<div class="alert alert-warning">
  <strong>Remarque :</strong> si vous utilisez un framework de logging avec <code>Microsoft.Extensions.Logging</code>, vous devrez probablement utiliser le nom du framework. Par exemple, pour <a href="https://github.com/serilog/serilog-extensions-logging">Serilog.Extensions.Logging</a>, définissez <code>DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS=Serilog</code>.
</div>

Redémarrez votre application après avoir défini ces variables d'environnement.

### Configuration supplémentaire

Vous pouvez configurer plus en détail certains aspects de la collecte de logs sans Agent à l'aide des variables d'environnement suivantes :

`DD_LOGS_DIRECT_SUBMISSION_MINIMUM_LEVEL`
: Permet de filtrer les logs par niveau _avant_ qu'ils ne soient envoyés à Datadog. Définissez la variable sur l'une des valeurs suivantes : `Verbose`, `Debug`, `Information`, `Warning`, `Error`, `Critical`. Chaque valeur correspond au niveau équivalent dans les frameworks de logging pris en charge.<br>
**Valeur par défaut** : `Information`

`DD_LOGS_DIRECT_SUBMISSION_HOST`
: Permet de définir le nom du host associé aux logs. Si aucune valeur n'est spécifiée, le système tentera de récupérer automatiquement le nom du host.<br>
**Valeur par défaut** : détection automatique

`DD_LOGS_DIRECT_SUBMISSION_TAGS`
: Utilisez cette variable pour ajouter les tags spécifiés à l'ensemble des spans générées. Si aucune valeur n'est spécifiée, la variable `DD_TAGS` sera utilisée à la place.<br>
**Exemple** : `layer:api, team:intake`
Notez que les valeurs doivent être séparées par une virgule et un espace : `, `.

Les variables de configuration suivantes ne doivent généralement pas être modifiées, mais vous pouvez les définir si vous le souhaitez.

{{< site-region region="us" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: Permet de définir l'URL vers laquelle les logs sont envoyés. Utilise le domaine spécifié dans `DD_SITE` par défaut.<br>
**Valeur par défaut** : `https://http-intake.logs.datadoghq.com:443` (d'après `DD_SITE`)

{{< /site-region >}}

{{< site-region region="us3" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: Permet de définir l'URL vers laquelle les logs sont envoyés. Utilise le domaine spécifié dans `DD_SITE` par défaut.<br>
**Valeur par défaut** : `https://http-intake.logs.us3.datadoghq.com:443` (d'après `DD_SITE`)

{{< /site-region >}}

{{< site-region region="us5" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: Permet de définir l'URL vers laquelle les logs sont envoyés. Utilise le domaine spécifié dans `DD_SITE` par défaut.<br>
**Valeur par défaut** : `https://http-intake.logs.us5.datadoghq.com:443` (d'après `DD_SITE`)

{{< /site-region >}}

{{< site-region region="eu" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: Permet de définir l'URL vers laquelle les logs sont envoyés. Utilise le domaine spécifié dans `DD_SITE` par défaut.<br>
**Valeur par défaut** : `https://http-intake.logs.datadoghq.eu:443` (d'après `DD_SITE`)

{{< /site-region >}}

{{< site-region region="us1-fed" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: Permet de définir l'URL vers laquelle les logs sont envoyés. Utilise le domaine spécifié dans `DD_SITE` par défaut.<br>
**Valeur par défaut** : `https://http-intake.logs.ddog-gov.com:443` (d'après `DD_SITE`)

{{< /site-region >}}

`DD_LOGS_DIRECT_SUBMISSION_SOURCE`
: Permet de définir la règle de parsing pour les logs envoyés. Doit toujours être définie sur `csharp`, sauf si vous utilisez un [pipeline personnalisé][17].<br>
**Valeur par défaut** : `csharp`

`DD_LOGS_DIRECT_SUBMISSION_MAX_BATCH_SIZE`
: Permet de définir le nombre maximum de logs à envoyer à la fois. Prend en compte les [limites appliquées pour l'API][18].<br>
**Valeur par défaut** : `1000`

`DD_LOGS_DIRECT_SUBMISSION_MAX_QUEUE_SIZE`
: Permet de définir le nombre maximum de logs pouvant être conservés dans la file d'attente interne avant de commencer à abandonner les messages de log.<br>
**Valeur par défaut** : `100000`

`DD_LOGS_DIRECT_SUBMISSION_BATCH_PERIOD_SECONDS`
: Permet de définir le temps d'attente (en secondes) avant de vérifier si de nouveaux logs doivent être envoyés.<br>
**Valeur par défaut** : `1`

Si vous utilisez l'intégration `Microsoft.Extensions.Logging`, vous pouvez filtrer les logs envoyés à Datadog à l'aide des fonctionnalités standard intégrées dans `ILogger`. Utilisez la clé `"Datadog"` pour identifier le fournisseur de transmission directe, et définissez le niveau minimum des logs pour chaque espace de nommage. Par exemple, si vous ajoutez le bloc suivant dans votre `appSettings.json`, les logs dont le niveau est inférieur à `Warning` ne seront pas envoyés à Datadog. Disponible à partir de la v2.20.0 de la bibliothèque de tracing .NET.

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

## Logging sans Agent avec le récepteur Serilog

Si vous n'avez pas la possibilité de suivre les logs écrits dans un fichier ni d'utiliser le logging sans Agent avec APM, vous pouvez vous servir du [récepteur Serilog][19] de Datadog pour envoyer les logs directement à Datadog.

Installez le [récepteur Serilog][19] de Datadog, qui envoie les événements et les logs à Datadog, dans votre application. Par défaut, le récepteur transfère les logs via HTTPS sur le port 443.
Exécutez la commande suivante dans la console de gestion des paquets :

```text
PM> Install-Package Serilog.Sinks.Datadog.Logs
```

Initialisez ensuite directement le logger directement dans votre application. Assurez-vous d'[ajouter votre `<CLÉ_API>`][15].

{{< site-region region="us" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<CLÉ_API>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.datadoghq.com" })
    .CreateLogger())
{
    // Insérer du code
}
```

{{< /site-region >}}

{{< site-region region="us3" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<CLÉ_API>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.us3.datadoghq.com" })
    .CreateLogger())
{
    // Insérer du code
}
```

{{< /site-region >}}

{{< site-region region="us5" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<CLÉ_API>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.us5.datadoghq.com" })
    .CreateLogger())
{
    // Insérer du code
}
```

{{< /site-region >}}

{{< site-region region="eu" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<CLÉ_API>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.datadoghq.eu" })
    .CreateLogger())
{
    // Insérer du code
}
```

{{< /site-region >}}

{{< site-region region="us1-fed" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<CLÉ_API>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.ddog-gov.com" })
    .CreateLogger())
{
    // Insérer du code
}
```

{{< /site-region >}}


Vous pouvez également remplacer le comportement par défaut et transférer les logs via TCP en spécifiant manuellement les propriétés requises suivantes : `url`, `port`, `useSSL` et `useTCP`. Si vous le souhaitez, vous pouvez [spécifier les paramètres `source`, `service` et `host` et ajouter des tags personnalisés][20].

{{< site-region region="us" >}}

Par exemple, pour transférer des logs vers la région américaine de Datadog via TCP, utilisez la configuration de récepteur suivante :

```csharp
var config = new DatadogConfiguration(url: "intake.logs.datadoghq.com", port: 10516, useSSL: true, useTCP: true);
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs(
        "<CLÉ_API>",
        source: "<NOM_SOURCE>",
        service: "<NOM_SERVICE>",
        host: "<HOSTNAME>",
        tags: new string[] {"<TAG_1>:<VALUE_1>", "<TAG_2>:<VALUE_2>"},
        configuration: config
    )
    .CreateLogger())
{
    // Insérer du code
}
```

{{< /site-region >}}
{{< site-region region="eu" >}}

Par exemple, pour transférer des logs vers la région européenne de Datadog via TCP, utilisez la configuration de récepteur suivante :

```csharp
var config = new DatadogConfiguration(url: "tcp-intake.logs.datadoghq.eu", port: 443, useSSL: true, useTCP: true);
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs(
        "<CLÉ_API>",
        source: "<NOM_SOURCE>",
        service: "<NOM_SERVICE>",
        host: "<HOSTNAME>",
        tags: new string[] {"<TAG_1>:<VALUE_1>", "<TAG_2>:<VALUE_2>"},
        configuration: config
    )
    .CreateLogger())
{
    // Insérer du code
}
```

{{< /site-region >}}

Désormais, les nouveaux logs sont directement envoyés à Datadog.

Par ailleurs, depuis la version `0.2.0`, vous pouvez configurer le récepteur Datadog à l'aide d'un fichier `appsettings.json` pour le package `Serilog.Setting.Configuration`.

Dans la matrice `Serilog.WriteTo`, ajoutez une entrée pour `DatadogLogs`. Voici un exemple :

```json
"Serilog": {
  "Using": [ "Serilog.Sinks.Console", "Serilog.Sinks.Datadog.Logs" ],
  "MinimumLevel": "Debug",
  "WriteTo": [
    { "Name": "Console" },
    {
      "Name": "DatadogLogs",
      "Args": {
        "apiKey": "<CLÉ_API>",
        "source": "<NOM_SOURCE>",
        "host": "<HOSTNAME>",
        "tags": ["<TAG_1>:<VALEUR_1>", "<TAG_2>:<VALEUR_2>"],
      }
    }
  ],
  "Enrich": [ "FromLogContext", "WithMachineName", "WithThreadId" ],
  "Properties": {
    "Application": "Sample"
  }
}
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/parsing
[2]: /fr/agent/logs/?tab=tailfiles#activate-log-collection
[3]: /fr/agent/logs/?tab=tailfiles#custom-log-collection
[4]: /fr/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[5]: /fr/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[6]: /fr/agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
[7]: /fr/logs/log_configuration/parsing/?tab=matchers
[8]: /fr/logs/explorer/#overview
[9]: /fr/tracing/other_telemetry/connect_logs_and_traces/dotnet/
[10]: /fr/agent/logs/advanced_log_collection
[11]: /fr/serverless/azure_app_services
[12]: /fr/account_management/org_settings/sensitive_data_detection/#overview
[13]: /fr/tracing/trace_collection/dd_libraries/dotnet-core
[14]: /fr/tracing/trace_collection/dd_libraries/dotnet-framework
[15]: https://app.datadoghq.com/organization-settings/api-keys
[16]: /fr/getting_started/site/
[17]: /fr/logs/log_configuration/pipelines/?tab=source
[18]: /fr/api/latest/logs/#send-logs
[19]: https://www.nuget.org/packages/Serilog.Sinks.Datadog.Logs
[20]: /fr/logs/log_configuration/attributes_naming_convention/#reserved-attributes