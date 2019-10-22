---
title: 'Collecte de logs avec C#'
kind: documentation
aliases:
  - /fr/logs/languages/csharp
further_reading:
  - link: 'https://www.datadoghq.com/blog/c-logging-guide/'
    tag: Blog
    text: "Comment recueillir, personnaliser et analyser des logs\_C#"
  - link: logs/processing
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: logs/processing/parsing
    tag: Documentation
    text: En savoir plus sur le parsing
  - link: logs/explorer
    tag: Documentation
    text: Apprendre à explorer vos logs
  - link: logs/explorer/analytics
    tag: Documentation
    text: Effectuer des analyses de logs
  - link: logs/faq/log-collection-troubleshooting-guide
    tag: FAQ
    text: Dépannage pour la collecte de logs
---
Pour envoyer vos logs C# à Datadog, nous vous recommandons d'activer la journalisation au sein d'un fichier et de le suivre avec l'Agent Datadog. Voici des exemples de configuration pour les bibliothèques de journalisation `log4Net`, `serilog` et `Nlog`.

Nous vous encourageons fortement à configurer votre bibliothèque de journalisation afin de générer vos logs au format JSON et d'éviter de créer des [règles de parsing personnalisées][1].

## Configurer votre logger
{{< tabs >}}
{{% tab "SeriLog" %}}

Comme bien d'autres bibliothèques pour .NET, Serilog vous permet d'effectuer une journalisation de diagnostic dans des fichiers, une console ou d'autres éléments. Ce processus de journalisation est facilement configurable, dispose d'une API épurée et peut être utilisé sur les plateformes .NET récentes.

Contrairement aux autres bibliothèques de journalisation, Serilog est conçu pour fournir de précieuses données d'événement structurées.

Installez Serilog via NuGet. Exécutez la commande suivante dans la console de gestion de paquet :

```
PM> Install-Package Serilog.Sinks.File
```

Lancez ensuite le logger directement sur votre application :

```csharp
// Instancier le logger
var log = new LoggerConfiguration()
    .WriteTo.File(new JsonFormatter(), "log.json")
    .CreateLogger();

// Exemple
var position = new { Latitude = 25, Longitude = 134 };
var elapsedMs = 34;

log.Information("Traité {@Position} en {Elapsed:000} ms.", position, elapsedMs);
```

Consultez ensuite le fichier `log.json` pour voir l'événement suivant :

```json
{
    "MessageTemplate": "Traité {@Position} en {Elapsed:000} ms.",
    "Level": "Information",
    "Timestamp": "2016-09-02T15:02:29.648Z",
    "Renderings": {
        "Elapsed": [{
            "Format": "000",
            "Rendering": "034"
        }]
    },
    "Properties": {
        "Position": {
            "Latitude": 25,
            "Longitude": 134
        },
        "Elapsed": 34
    }
}
```

[Surveillez maintenant votre fichier de log avec l'Agent][1] pour envoyer vos logs à votre application Datadog.


[1]: /fr/logs/#tail-existing-files
{{% /tab %}}
{{% tab "NLog" %}}

NLog est une plateforme de journalisation pour .NET dotée d'un acheminement de log riche et de fonctionnalités de gestion. Elle vous aide à générer et à gérer des logs de haute qualité pour votre application, peu importe sa taille ou sa complexité.

Installez NLog en passant par NuGet. Exécutez la commande suivante dans la console de gestion de paquet :

```
PM> Install-Package NLog
```

Une fois la bibliothèque dans votre classpath, ajoutez la disposition suivante à n'importe quelle cible. Ajoutez un fichier `NLog.config` au chemin racine du projet ou modifiez-le. Copiez ensuite le code suivant et collez-le à cet endroit (*les logs sont rédigés dans le fichier `application-logs.json`*) :

```xml
<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <!--
  Consultez https://github.com/nlog/nlog/wiki/Configuration-file
  pour en savoir plus sur la personnalisation des règles et des sorties de la journalisation.
   -->
  <targets async="true">
    <!-- Rédiger les logs au format JSON dans un fichier -->
    <target name="json-file" xsi:type="File" fileName="application-logs.json">
      <layout xsi:type="JsonLayout">
        <attribute name="date" layout="${longdate}" />
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
            logger.Debug("Ceci est ma première étape");

            // indiquer le reste de votre code ici...

        }
    }
}
```

[Surveillez maintenant votre fichier de log avec l'Agent][1] pour envoyer vos logs à votre application Datadog.


[1]: /fr/logs/#tail-existing-files
{{% /tab %}}
{{% tab "Log4Net" %}}
Log4Net est une plateforme de journalisation pour .NET inspirée de Log4j. Elle est dotée d'un acheminement de log riche et de fonctionnalités de gestion. Elle vous aide à générer et à gérer des logs de haute qualité pour votre application, peu importe sa taille ou sa complexité.

Pour l'installer, exécutez la commande suivante dans la console de gestion de paquet :

```
PM> Install-Package log4net
PM> Install-Package log4net.Ext.Json
```

Une fois la bibliothèque dans votre classpath, ajoutez la disposition suivante à n'importe quelle cible. Modifiez le `App.config` de votre projet et ajoutez la section suivante :

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
using log4net;

namespace Datadog
{
    class Program
    {
        // Obtenir le logger de classe actuelle
        private static ILog logger = LogManager.GetLogger(typeof(Program));


        static void Main(string[] args)
        {

           // Charger la configuration d'App.config
           XmlConfigurator.Configure();

             // Enregistrer un message de debugging simple
           logger.Debug("Ceci est mon premier message de debugging");


            // Indiquer le reste votre code ici...
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

Si, malgré les avantages de la journalisation en JSON, vous souhaitez activer la journalisation au format de chaîne brute, nous vous recommandons de mettre à jour le `log4net convertion pattern` pour extraire automatiquement vos logs avec le pipeline d'intégration C# comme suit :

```
<param name="ConversionPattern" value="%date{yyyy-MM-dd HH:mm:ss.SSS} %level [%thread] %logger %method:%line - %message%n" />
```

{{% /tab %}}
{{< /tabs >}}

## Configurer votre Agent Datadog

Créez un fichier `csharp.d/conf.yaml` dans votre dossier `conf.d/` avec le contenu suivant :

```yaml
init_config:

instances:

##Section Log
logs:

    ## - type (obligatoire) : type de fichier de la source d'entrée de log (tcp/udp/file).
    ##   port / path (obligatoire) : définit le type tcp ou udp du port. Choisit le chemin si le type est défini sur file.
    ##   service (obligatoire) : nom du service propriétaire du log.
    ##   source (obligatoire) : attribut qui définit l'intégration qui envoie les logs.
    ##   sourcecategory (facultatif) : un attribut à valeur multiple. Il peut être utilisé pour préciser l'attribut source.
    ##   tags (facultatif) : ajoute des tags à chaque log recueilli.

  - type: file
    path: /chemin/vers/votre/log/csharp.log
    service: csharp
    source: csharp
    sourcecategory: sourcecode
    # Pour les logs multiligne, s'ils commencent par la date au format aaaa-mm-jj, supprimez la mise en commentaire de la règle de traitement suivante.
    #log_processing_rules:
    #  - type: multi_line
    #    name: new_log_start_with_date
    #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
```

Et voilà ! Désormais, tous vos logs seront automatiquement au format JSON compatible avec votre application Datadog.

## Journalisation sans agent

Il est possible de transmettre des logs depuis votre application vers Datadog ou directement vers l'Agent Datadog. Il ne s'agit pas de la configuration recommandée, car la gestion des problèmes de connexion ne doit pas se faire directement dans votre application, mais il peut arriver qu'il soit impossible d'enregistrer un log dans un fichier lorsque votre application est utilisée sur une machine hors d'accès.
{{< tabs >}}
{{% tab "SeriLog" %}}

Installez le [récepteur Serilog][1] de Datadog, qui envoie les événements et les logs à Datadog. Par défaut, le récepteur transfère les logs via HTTPS sur le port 443.
Exécutez la commande suivante dans la console de gestion de paquet :

```
PM> Install-Package Serilog.Sinks.Datadog.Logs
```

Initialisez ensuite directement le logger dans votre application. N'oubliez pas d'[ajouter votre `<CLÉ_API>`][2].

```
var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<CLÉ_API>")
    .CreateLogger();
```

**Remarque** : pour envoyer des logs au site européen de Datadog, définissez la propriété `url` sur `https://http-intake.logs.datadoghq.eu`.

Vous pouvez également remplacer le comportement par défaut et transférer des logs via TCP en précisant manuellement les propriétés requises suivantes : `url`, `port`, `useSSL` et `useTCP`. [Si vous le souhaitez, vous pouvez préciser les paramètres `source`, `service` et `host` et ajouter des tags personnalisés][3].

Par exemple, pour transférer des logs vers le site américain de Datadog via TCP, utilisez la configuration de récepteur suivante :

```
var config = new DatadogConfiguration(url: "intake.logs.datadoghq.com", port: 10516, useSSL: true, useTCP: true);
var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs(
        "<CLÉ_API>",
        source: "<NOM_SOURCE>",
        service: "<NOM_SERVICE>",
        host: "<NOM_HOST>",
        tags: new string[] {"<TAG_1>:<VALUE_1>", "<TAG_2>:<VALUE_2>"},
        configuration: config
    )
    .CreateLogger();
```

Désormais, les nouveaux logs sont directement envoyés à Datadog.


[1]: https://www.nuget.org/packages/Serilog.Sinks.Datadog.Logs
[2]: https://app.datadoghq.com/account/settings#api
[3]: /fr/logs/#reserved-attributes
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/processing/parsing