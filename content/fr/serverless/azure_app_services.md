---
title: Extension Microsoft Azure App Service
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
  - link: 'https://www.datadoghq.com/blog/azure-app-service-extension/'
    tag: Blog
    text: "Surveiller des applications Web .NET avec l'extension Datadog pour Azure\_App\_Service"
  - link: 'https://www.datadoghq.com/pricing/?product=apm--continuous-profiler#apm--continuous-profiler-what-is-considered-as-a-host-for-azure-app-services'
    tag: Tarifs
    text: "Tarifs de l'APM pour Azure\_App\_Service"
---
## Présentation

Microsoft [Azure App Service][1] est un groupe de ressources sans serveur vous permettant de créer et d'héberger des applications Web, des backends mobiles, des fonctions axées sur des événements et des API RESTful sans avoir à gérer d'infrastructure. Cette solution peut héberger des charges de travail de toutes tailles et offre des options d'autoscaling et de haute disponibilité.

Datadog propose des fonctionnalités de surveillance pour tous les types de ressources Azure App Service :

- Métriques Azure Monitor pour les [applications][2] et les [fonctions][3] via l'[intégration Azure][2]
- Possibilité d'envoyer des métriques custom via l'API
- Possibilité d'envoyer des [logs de ressource][4] via un [Event Hub][5]

L'extension Datadog pour Azure App Service fournit des capacités de surveillance supplémentaires pour les [applications Web Azure][6], notamment les fonctionnalités suivantes :

- Tracing APM distribué complet via l'instrumentation automatique
- Prise en charge de l'instrumentation APM manuelle pour personnaliser les spans
- Injection des `Trace_ID` dans les logs d'application
- Prise en charge de l'envoi de métriques custom à l'aide de [DogStatsD][7]

## Configuration

### Prérequis

1. Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][8].

2. L'extension prend uniquement en charge les applications Web Azure App Service. **Les applications de fonction ne sont pas prises en charge**.

<div class="alert alert-warning">Pour recevoir une alerte lorsqu'une bêta privée sera disponible pour les applications de fonction ou d'autres runtimes, <a href="https://forms.gle/n4nQcxEyLqDBMCDA7">inscrivez-vous ici</a>.</div>

3. L'extension .NET APM Datadog prend en charge les runtimes .NET suivants (architectures x64 et x86) lorsqu'elle est exécutée dans des instances Windows (AAS ne prend pas encore en charge les extensions sous Linux). Pour en savoir plus sur les bibliothèques à instrumentation automatique, consultez la [documentation relative au traceur][9].

    - .NET Framework 4.5 et versions ultérieures
    - .NET Core 2.1
    - .NET Core 2.2 (fin de la prise en charge Microsoft le 23/12/2019)
    - .NET Core 3.0 (fin de la prise en charge Microsoft le 03/03/2020)
    - .NET Core 3.1
    - .NET 5

4. Nous vous conseillons de mettre régulièrement à jour l'extension afin de profiter de performances optimales, d'une stabilité accrue ainsi que des dernières fonctionnalités. Remarque : pour effectuer l'installation initiale ainsi que les mises à jour ultérieures, votre application Web doit être entièrement arrêtée.

**Remarque** : l'instrumentation automatique Datadog repose sur l'API CLR Profiling .NET. Celle-ci permet seulement d'ajouter un abonné (par exemple, l'APM). Pour bénéficier d'une visibilité optimisée, exécutez une seule solution APM dans l'environnement de votre application.

### Installation

1. Configurez l'intégration Azure de façon à surveiller votre application Web. Pour confirmer qu'elle est bien configurée, vérifiez que vous recevez bien la métrique `azure.app_service.count`, taguée avec le nom de votre application Web. **Remarque** : il est essentiel de respecter ces instructions pour pouvoir mettre en corrélation les métriques et les traces, utiliser les vues du volet de traces du portail Datadog et garantir l'exactitude de votre facturation.

2. Ouvrez le [portail Azure][10] et accédez au dashboard de l'instance Azure App Service que vous souhaitez instrumenter avec Datadog.

3. Accédez à l'onglet Paramètres d'application de la page Configuration.
    {{< img src="infrastructure/serverless/azure_app_services/config.png" alt="Page Configuration" >}}
4. Ajoutez votre clé d'API Datadog en tant que paramètre d'application `DD_API_KEY`, avec pour valeur votre [clé d'API Datadog][11].
    {{< img src="infrastructure/serverless/azure_app_services/api_key.png" alt="Page de la clé d'API" >}}
5. Configurez des paramètres pour votre application (facultatif) :
    - Définissez `DD_SITE` sur {{< region-param key="dd_site" code="true" >}} (valeur par défaut : `datadoghq.com`).
    - Définissez `DD_ENV` afin de regrouper vos traces et vos statistiques personnalisées.
    - Définissez `DD_SERVICE` afin d'indiquer un nom de service (valeur par défaut : le nom de votre application Web).
    - Définissez `DD_LOGS_INJECTION:true` afin de corréler vos données avec les logs d'application de votre app Web.
    - Consultez la liste complète des [variables de configuration facultatives][12].
6. Cliquez sur **Enregistrer** (votre application va alors redémarrer).
7. <div class="alert alert-warning">[REQUIS] Arrêtez votre application en cliquant sur <u>Arrêter</u>.</div>
8. Accédez à la page des extensions Azure et sélectionnez l'extension Datadog APM.
    {{< img src="infrastructure/serverless/azure_app_services/choose_extension.png" alt="Extension Datadog" >}}
9. Acceptez les conditions, cliquez sur **OK** et attendez que l'installation se termine. **Remarque** : lors de cette étape, l'application Web doit être arrêtée.
10. Lancez l'application principale en cliquant sur **Démarrer** :
    {{< img src="infrastructure/serverless/azure_app_services/start.png" alt="Démarrer" >}}

### Journalisation de votre application à partir des applications Web Azure

Pour envoyer des logs depuis votre application dans Azure App Service vers Datadog, vous devez utiliser Serilog. Cet outil permet d'injecter l'ID des traces, afin d'associer les logs aux traces dans Datadog. Pour activer cette fonction avec l'extension, ajoutez le paramètre d'application `DD_LOGS_INJECTION:true`.

**Remarque** : puisque cette opération s'effectue dans votre application, les logs de la plateforme Azure que vous envoyez avec des paramètres de diagnostic ne contiennent pas l'ID des traces.

Consultez la documentation relative à la [configuration de la journalisation sans Agent avec Serilog][13] pour en savoir plus.

## Métriques custom avec DogStatsD

L'extension App Service comprend une instance de [DogStatsD][7] (le service d'agrégation de métriques de Datadog). Grâce à l'extension, vous pouvez ainsi envoyer des métriques custom, des checks de service et des événements directement à Datadog depuis des apps Web Azure.

L'écriture de métriques custom et de checks dans une app Web suit les mêmes lignes que pour une application sur un host exécutant l'Agent Datadog. Pour envoyer des métriques custom à Datadog depuis Azure App Service à l'aide de l'extension :

1. Ajoutez le [package NuGet DogStatsD][14] à votre projet Visual Studio.
2. Initialisez DogStatsD et rédigez des métriques custom dans votre application.
3. Déployez votre code dans une app Web .NET Azure prise en charge.
4. Installez l'extension App Service Datadog.

**Remarque** : contrairement au [processus de configuration DogStatsD standard][15], il n'est pas nécessaire de définir des ports ou un nom de serveur lors de l'initialisation de la configuration DogStatsD. Azure App Service inclut des variables d'environnement ambiantes afin de déterminer la façon dont les métriques sont envoyées (client DogStatsD v6.0.0+ requis).

Pour envoyer des métriques, utilisez ce qui suit :

```csharp
try
{
// Configurer votre client DogStatsd et des tags
DogStatsd.Configure(new StatsdConfig() { ConstantTags = new[] { "app:sample.mvc.aspnetcore" } });
}
catch (Exception ex)
{
// Une exception est générée par l'appel Configure si les variables d'environnement requises ne sont pas présentes.
// Elles figurent dans Azure App Service, mais
// doivent être définies afin de pouvoir tester vos métriques custom : DD_API_KEY:{api_key}, DD_AGENT_HOST:localhost
// Vous pouvez choisir d'ignorer ou d'enregistrer l'exception.
Console.WriteLine(ex);
}
// Envoyer une métrique
DogStatsd.Increment("sample.startup");
```

En savoir plus sur les [métriques custom][16].

## Dépannage

Pour commencer à résoudre les éventuels problèmes concernant votre application, suivez les étapes suivantes :

1. Vérifiez que vous avez correctement défini `DD_SITE` et `DD_API_KEY`.
2. Arrêtez et démarrez votre application.
3. Si votre problème persiste, essayez de désinstaller l'extension, puis de la réinstaller. Cette opération vous permet également de vous assurer que vous utilisez la dernière version.
4. Besoin d'aide supplémentaire ? Contactez [l'assistance Datadog][17].

**Remarque** : pour faciliter le travail d'analyse des erreurs d'application effectué par l'équipe d'assistance, définissez `DD_TRACE_DEBUG:true` et ajoutez le contenu du répertoire de logs Datadog (`%AzureAppServiceHomeDirectory%\LogFiles\datadog`) en pièce jointe de votre e-mail.

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.microsoft.com/en-us/azure/app-service/
[2]: /fr/integrations/azure_app_services/
[3]: /fr/integrations/azure_functions/
[4]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/resource-logs
[5]: /fr/integrations/azure/?tab=eventhub#log-collection
[6]: https://azure.microsoft.com/en-us/services/app-service/web/
[7]: /fr/developers/dogstatsd
[8]: /fr/integrations/azure
[9]: /fr/tracing/setup/dotnet/
[10]: https://portal.azure.com
[11]: https://app.datadoghq.com/account/settings#api
[12]: /fr/tracing/setup_overview/setup/dotnet-framework/#additional-optional-configuration
[13]: /fr/logs/log_collection/csharp/?tab=serilog#agentless-logging
[14]: https://www.nuget.org/packages/DogStatsD-CSharp-Client
[15]: /fr/developers/dogstatsd/?tab=net#code
[16]: /fr/developers/metrics/
[17]: /fr/help