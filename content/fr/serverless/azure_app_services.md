---
title: Extension Microsoft Azure App Services
kind: documentation
aliases:
  - /fr/infrastructure/serverless/azure_app_services/
further_reading:
  - link: /integrations/azure_app_services/
    tag: Documentation
    text: Azure App Service
  - link: /integrations/azure_app_service_environment/
    tag: Documentation
    text: Environnement Azure App Service
---
<div class="alert alert-warning"> Ce service est en version bêta publique. Si vous souhaitez nous faire part de vos remarques, contactez <a href="/help">l'assistance Datadog</a>. Lors de la période bêta, l'utilisation de cette extension ne fait l'objet d'aucune facturation.</div>

## Présentation

Microsoft Azure App Services est un groupe de ressources sans serveur qui vous permettent de créer et d'héberger des applications Web, des backends mobiles, des fonctions axées sur des événements, et des API RESTful sans gérer l'infrastructure. Ce groupe de ressources peut héberger des charges de travail de toutes tailles et offre des options de scaling automatique et de haute disponibilité.

Datadog propose des fonctionnalités de surveillance pour tous les types de ressources Azure App Services :

- Métriques Azure Monitor pour les [applications][1] et les [fonctions][2] via l'[intégration Azure][1]
- Possibilité d'envoyer des métriques custom via l'API
- Les [logs de ressource][3] peuvent être envoyés via [Event Hub][4].

L'extension Datadog pour Azure App Services fournit des capacités de surveillance supplémentaires pour les [applications Web Azure][5]. Cette prise en charge inclut les éléments suivants :

- Tracing APM distribué complet via l'instrumentation automatique
- Prise en charge de l'instrumentation APM manuelle pour personnaliser les spans
- Injection des `Trace_ID` dans les logs d'application

## Configuration

### Prérequis

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][6].

L'extension APM .NET Datadog prend en charge les runtimes .NET suivants (architectures x64 et x86) lorsqu'elle est exécutée dans des instances Windows (AAS ne prend pas encore en charge les extensions sous Linux). Pour en savoir plus sur les bibliothèques à instrumentation automatique, consultez la [documentation relative au traceur][7].

- .NET Framework 4.7 et versions ultérieures
- .NET Core 2.1
- .NET Core 2.2 (fin de la prise en charge Microsoft le 23/12/2019)
- .NET Core 3.0 (fin de la prise en charge Microsoft le 03/03/2020)
- .NET Core 3.1

### Installation

1. Ouvrez le [portail Azure][8] et accédez au dashboard de l'instance Azure App Services que vous souhaitez instrumenter avec Datadog.
2. Accédez à l'onglet Paramètres d'application de la page Configuration.
    {{< img src="infrastructure/serverless/azure_app_services/config.png" alt="Page Configuration" >}}
3. Ajoutez votre clé d'API Datadog en tant que paramètre d'application `DD_API_KEY`, avec pour valeur votre [clé d'API Datadog][9].
    {{< img src="infrastructure/serverless/azure_app_services/api_key.png" alt="Page de la clé d'API" >}}
4. Si vous utilisez le site européen de Datadog (domaine datadoghq.eu), ajoutez un paramètre d'application `DD_SITE` avec pour valeur datadoghq.eu.
    Par défaut, l'extension envoie les données au site américain de Datadog (domaine datadoghq.com). Si vous utilisez le site américain, il n'y a donc aucun autre paramètre d'application requis.
5. Accédez à la page des extensions et cliquez sur **Ajouter**.
6. Sélectionnez l'extension APM Datadog.
    {{< img src="infrastructure/serverless/azure_app_services/extension.png" alt="Extension Datadog" >}}
7. Acceptez les conditions, cliquez sur **OK** et attendez la fin de l'installation.
8. Redémarrez l'application principale : cliquez sur **Arrêter**, attendez l'arrêt complet, puis cliquez sur **Démarrer**.
    {{< img src="infrastructure/serverless/azure_app_services/restart.png" alt="Page pour l'arrêt et le redémarrage" >}}

### Journalisation de votre application à partir d'Azure Web Apps

Pour envoyer des logs depuis votre application dans Azure App Services vers Datadog, vous devez utiliser Serilog. Cet outil permet d'injecter l'ID des traces, afin d'associer les logs aux traces dans Datadog. Pour activer cette fonction avec l'extension, ajoutez le paramètre d'application `DD_LOGS_INJECTION:true`.

**Remarque** : puisque cette opération s'effectue dans votre application, les logs de la plateforme Azure que vous pouvez envoyer avec des paramètres de diagnostic ne contiennent pas l'ID des traces.

Installez le package NuGet du [récepteur Serilog de Datadog][10], afin d'envoyer des événements et des logs à Datadog. Par défaut, le récepteur transfère les logs via HTTPS sur le port 443. Exécutez la commande suivante dans la console de gestion de package de l'application :

```
PM> Install-Package Serilog.Sinks.Datadog.Logs
```

Initialisez ensuite le logger directement dans votre application. Remplacez `<CLÉ_API_DATADOG>` par votre [clé d'API Datadog][9].

```
using Serilog;
using Serilog.Sinks.Datadog.Logs;

          Serilog.Log.Logger = new LoggerConfiguration()
              .WriteTo.DatadogLogs("<CLÉ_API_DATADOG>")
              .Enrich.FromLogContext()
              .CreateLogger();
```

Vous pouvez également remplacer le comportement par défaut et transférer des logs via TCP en précisant manuellement les propriétés requises suivantes : url, port, useSSL et useTCP. Si vous le souhaitez, vous pouvez préciser les [tags source et service ainsi que des tags personnalisés][11].

Par exemple, pour transférer des logs vers le site américain de Datadog via TCP, utilisez la configuration de récepteur suivante :

{{< code-block lang="text" wrap="false" disable_copy="true" >}}
using Serilog; 
using Serilog.Sinks.Datadog.Logs;

          var config = new DatadogConfiguration(
              url:"https://http-intake.logs.datadoghq.com", 
              port:10516, 
              useSSL:true, 
              useTCP:false);

          Serilog.Log.Logger = new LoggerConfiguration()
              .WriteTo.DatadogLogs(
                  "eb7c615e5fca779871203b7de9209b6c",
                  source: "<NOM_SOURCE>",
                  service: "<NOM_SERVICE>",
                  tags: new string[] { "<TAG_1>:<VALEUR_1>", "<TAG_2>:<VALEUR_2>" },
                  configuration: config
              )
              .Enrich.FromLogContext()
              .CreateLogger();
{{< /code-block >}}

Désormais, les nouveaux logs sont directement envoyés à Datadog.

Par ailleurs, depuis la version 0.2.0, vous pouvez configurer le récepteur Datadog à l'aide d'un fichier `appsettings.json` et du package NuGet Serilog.Settings.Configuration.

Dans la matrice `Serilog.WriteTo()`, ajoutez une entrée pour DatadogLogs. Exemple :

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

## Dépannage

### Erreurs 5XX

Si votre application commence à renvoyer des erreurs 5XX immédiatement après l'installation, essayez de réinstaller l'extension après l'arrêt complet de l'application. Procédez comme suit :

1. Arrêtez l'application.
2. Supprimez l'extension Datadog.
3. Réinstallez l'extension Datadog.
4. Redémarrez votre application.

Le fait de réinstaller l'extension après l'arrêt complet de l'application résout généralement le problème. Toutefois, si les erreurs 5XX persistent, cela peut être dû à un paramètre de debugging activé, qui peut ralentir le démarrage de votre application et ainsi entraîner une erreur 500. Essayez les solutions suivantes :

- Ajustez vos paramètres de logging et de debugging
- Optez pour un plan App Service supérieur

### Traces manquantes

Si vous ne recevez aucune trace ou seulement une partie d'entre elles, vérifiez que vous n'avez pas modifié les paramètres de port manuellement. Dans l'extension, l'Agent du traceur communique avec votre application pour identifier le bon port à utiliser pour le trafic externe. La modification des paramètres de port peut interférer avec ce processus, empêchant alors les traces d'être envoyées.

Besoin d'aide supplémentaire ? Contactez [l'assistance Datadog][12].

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/integrations/azure_app_services/
[2]: /fr/integrations/azure_functions/
[3]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/resource-logs
[4]: /fr/integrations/azure/?tab=eventhub#log-collection
[5]: https://azure.microsoft.com/en-us/services/app-service/web/
[6]: /fr/integrations/azure
[7]: /fr/tracing/setup/dotnet/
[8]: https://portal.azure.com
[9]: https://app.datadoghq.com/account/settings#api
[10]: https://www.nuget.org/packages/Serilog.Sinks.Datadog.Logs
[11]: /fr/logs/log_collection/#reserved-attributes
[12]: /fr/help