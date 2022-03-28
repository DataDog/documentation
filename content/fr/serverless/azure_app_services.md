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
  - link: https://www.datadoghq.com/blog/azure-app-service-extension/
    tag: Blog
    text: "Surveiller des applications Web .NET avec l'extension Datadog pour Azure\_App\_Service"
  - link: https://www.datadoghq.com/pricing/?product=apm--continuous-profiler#apm--continuous-profiler-what-is-considered-as-a-host-for-azure-app-services
    tag: Tarifs
    text: "Tarifs de l'APM pour Azure\_App\_Service"
  - link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
    tag: Blog
    text: "Déployer des applications ASP.NET Core sur Azure\_App\_Service"
---
## Présentation

Microsoft [Azure App Service][1] est un groupe de ressources sans serveur vous permettant de créer et d'héberger des applications Web, des backends mobiles, des fonctions axées sur des événements et des API RESTful sans avoir à gérer d'infrastructure. Cette solution peut héberger des charges de travail de toutes tailles et offre des options d'autoscaling et de haute disponibilité.

Datadog propose des fonctionnalités de surveillance pour tous les types de ressources Azure App Service :

- Métriques Azure Monitor pour les [applications][2] et les [fonctions][3] via l'[intégration Azure][2]
- [Vue Azure App Service][4] (bêta) permettant d'identifier rapidement les problèmes, de mapper les relations entre les ressources Azure App Service et d'obtenir des informations pertinentes sur leurs coûts et performances
- Possibilité d'envoyer des métriques custom via l'API
- Possibilité d'envoyer des [logs de ressource][5] à l'aide d'un [Event Hub][6]

L'extension Datadog pour Azure App Service fournit des capacités de surveillance supplémentaires pour les [applications Web Azure][7], notamment les fonctionnalités suivantes :

- Tracing APM distribué complet via l'instrumentation automatique
- Prise en charge de l'instrumentation APM manuelle pour personnaliser les spans
- Injection des `Trace_ID` dans les logs d'application
- Prise en charge de l'envoi de métriques custom à l'aide de [DogStatsD][8]

## Configuration

### Prérequis

1. Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][9].

2. L'extension prend uniquement en charge les applications Web Azure App Service. **Les applications de fonction ne sont pas prises en charge**.

<div class="alert alert-warning">Pour recevoir une alerte lorsqu'une bêta privée sera disponible pour les applications de fonction ou d'autres runtimes, <a href="https://forms.gle/n4nQcxEyLqDBMCDA7">inscrivez-vous ici</a>.</div>

3. L'extension .NET APM Datadog prend en charge les runtimes .NET suivants (architectures x64 et x86) lorsqu'elle est exécutée dans des instances Windows (AAS ne prend pas encore en charge les extensions sous Linux). Pour en savoir plus sur les bibliothèques à instrumentation automatique, consultez la [documentation relative au traceur][10].

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

2. Ouvrez le [portail Azure][11] et accédez au dashboard de l'instance Azure App Service que vous souhaitez instrumenter avec Datadog.

3. Accédez à l'onglet Application settings de la page Configuration.
    {{< img src="infrastructure/serverless/azure_app_services/config.png" alt="Page Configuration" >}}
4. Ajoutez votre clé d'API Datadog en tant que paramètre d'application `DD_API_KEY`, avec pour valeur votre [clé d'API Datadog][12].
    {{< img src="infrastructure/serverless/azure_app_services/api_key.png" alt="Page de la clé d'API" >}}
5. Configurez des paramètres pour votre application (facultatif) :
    - Définissez `DD_SITE` sur {{< region-param key="dd_site" code="true" >}} (valeur par défaut : `datadoghq.com`).
    - Définissez `DD_ENV` afin de regrouper vos traces et vos statistiques personnalisées.
    - Définissez `DD_SERVICE` afin d'indiquer un nom de service (valeur par défaut : le nom de votre application Web).
    - Définissez `DD_LOGS_INJECTION:true` afin de corréler vos données avec les logs d'application de votre app Web.
    - Consultez la liste complète des [variables de configuration facultatives][13].
6. Cliquez sur **Save** (votre application va alors redémarrer).
7. <div class="alert alert-warning">[REQUIS] Arrêtez votre application en cliquant sur <u>Stop</u>.</div>
8. Accédez à la page des extensions Azure et sélectionnez l'extension Datadog APM.
    {{< img src="infrastructure/serverless/azure_app_services/choose_extension.png" alt="Extension Datadog" >}}
9. Acceptez les conditions, cliquez sur **OK** et attendez que l'installation se termine. **Remarque** : lors de cette étape, l'application Web doit être arrêtée.
10. Lancez l'application principale en cliquant sur **Start** :
    {{< img src="infrastructure/serverless/azure_app_services/start.png" alt="Start" >}}

### Journalisation de votre application à partir des applications Web Azure

Pour envoyer des logs depuis votre application dans Azure App Service vers Datadog, vous devez utiliser Serilog. Cet outil permet d'injecter l'ID des traces, afin d'associer les logs aux traces dans Datadog. Pour activer cette fonction avec l'extension, ajoutez le paramètre d'application `DD_LOGS_INJECTION:true`.

**Remarque** : puisque cette opération s'effectue dans votre application, les logs de la plateforme Azure que vous envoyez avec des paramètres de diagnostic ne contiennent pas l'ID des traces.

Consultez la documentation relative à la [configuration de la journalisation sans Agent avec Serilog][14] pour en savoir plus.

## Métriques custom avec DogStatsD

L'extension Azure App Service comprend une instance de [DogStatsD][8] (le service d'agrégation de métriques de Datadog). Grâce à l'extension, vous pouvez ainsi envoyer des métriques custom, des checks de service et des événements directement à Datadog depuis des apps Web Azure.

L'écriture de métriques custom et de checks dans une application Web suit les mêmes lignes que pour une application sur un host exécutant l'Agent Datadog. Pour envoyer des métriques custom à Datadog depuis Azure App Service à l'aide de l'extension, procédez comme suit :

1. Ajoutez le [package NuGet DogStatsD][15] à votre projet Visual Studio.
2. Initialisez DogStatsD et rédigez des métriques custom dans votre application.
3. Déployez votre code dans une app Web .NET Azure prise en charge.
4. Installez l'extension App Service Datadog.

**Remarque** : contrairement au [processus de configuration DogStatsD standard][16], il n'est pas nécessaire de définir des ports ou un nom de serveur lors de l'initialisation de la configuration DogStatsD. Azure App Service inclut des variables d'environnement ambiantes déterminant la façon dont les métriques sont envoyées (client DogStatsD v6.0.0+ requis).

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

En savoir plus sur les [métriques custom][17].

## Gestion de l'extension avec Powershell

Datadog fournit des scripts vous permettant d'installer ou de mettre à jour l'extension Azure App Service à l'aide de Powershell. Grâce à cette approche basée sur des scripts, vous pouvez [mettre à jour plusieurs extensions à la fois en fonction de leur groupe de ressources](groupe-de-ressources-avec-powershell) et [installer certaines versions de l'extension du site](version-specifique-avec-powershell). Il est également possible d'utiliser des scripts pour automatiser l'ajout de l'extension à des pipelines CI/CD et pour découvrir et mettre à jour les extensions déjà installées.

### Prérequis

- [Azure CLI][18] ou [Azure Cloud Shell][19].
- Des [informations d'identification pour la portée de l'utilisateur][20] Azure App Service. Si vous ne possédez pas d'identifiants, rendez-vous sur votre [portail Azure][21], puis accédez à l'instance App Service (application Web ou de fonction). Pour créer ou récupérer vos informations d'identification pour la portée de l'utilisateur, accédez à **Deployment** > **Deployment Center**.

### Première installation de l'extension {#premiere-installation-avec-powershell}

Le script d'installation ajoute la dernière version de l'extension à une application Web ou de fonction Azure. Cette étape s'effectue pour chaque instance, et non pour un groupe de ressources.

1. Ouvrez Azure CLI ou Azure Cloud Shell.
2. Téléchargez le script d'installation à l'aide de la commande suivante :

    ```
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/DataDog/datadog-aas-extension/master/management-scripts/extension/install-latest-extension.ps1" -OutFile "install-latest-extension.ps1"
    ```

3. Exécutez la commande suivante, en prenant soin de transmettre les arguments requis ainsi que les arguments facultatifs de votre choix.

    ```
    .\install-latest-extension.ps1 -Username <USERNAME> -Password <PASSWORD> -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -SiteName <SITE_NAME> -DDApiKey <DATADOG_API_KEY> -DDSite <DATADOG_SITE> -DDEnv <DATADOG_ENV> -DDService <DATADOG_SERVICE> -DDVersion <DATADOG_VERSION>
    ```

**Remarque** : vous devez préciser les arguments suivants pour la commande ci-dessus.

- `<USERNAME>` : votre nom d'utilisateur pour la portée de l'utilisateur Azure.
- `<PASSWORD>` : votre mot de passe pour la portée de l'utilisateur Azure.
- `<SUBSCRIPTION_ID>` : votre [ID d'abonnement][22] Azure.
- `<RESOURCE_GROUP_NAME>` : le nom de votre groupe de ressources Azure.
- `<SITE_NAME>` : le nom de votre application.
- `<DATADOG_API_KEY>` : votre [clé d'API Datadog][12].

Définissez également `DATADOG_SITE` sur votre [site Datadog][23]. Par défaut, `DATADOG_SITE` est défini sur `datadoghq.com`. Votre site est {{< region-param key="dd_site" code="true" >}}.

### Mise à jour de l'extension pour un groupe de ressources {groupe-de-ressources-avec-Powershell}

Le script de mise à jour s'applique à l'ensemble d'un groupe de ressources. Il met à jour chaque instance (application Web ou de fonction) sur laquelle l'extension Datadog est installée. Les instances App Service sans l'extension ne sont donc pas concernées.

1. Ouvrez Azure CLI ou Azure Cloud Shell.
2. Téléchargez le script de mise à jour à l'aide de la commande suivante :

    ```
    $baseUri="https://raw.githubusercontent.com/DataDog/datadog-aas-extension/master/management-scripts/extension"; Invoke-WebRequest -Uri "$baseUri/update-all-site-extensions.ps1" -OutFile "update-all-site-extensions.ps1"; Invoke-WebRequest -Uri "$baseUri/install-latest-extension.ps1" -OutFile "install-latest-extension.ps1"
    ```

3. Exécutez la commande suivante. Tous les arguments sont requis.

    ```
    .\update-all-site-extensions.ps1 -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -Username <USERNAME> -Password <PASSWORD>
    ```

### Installation d'une version spécifique de l'extension {#version-specifique-avec-powershell}

Il n'est pas possible d'installer une version spécifique d'une extension depuis l'interface Azure App Service. Vous devez utiliser les scripts d'installation ou de mise à jour pour y parvenir.

#### Installer une version spécifique sur une seule ressource

Pour installer une version spécifique sur une seule ressource, suivez les [instructions de première installation de l'extension](#premiere-installation-avec-powershell) et ajoutez le paramètre `-ExtensionVersion` à la commande d'installation.

```
.\install-latest-extension.ps1 -Username <USERNAME> -Password <PASSWORD> -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -SiteName <SITE_NAME> -DDApiKey <DATADOG_API_KEY> -ExtensionVersion <EXTENSION_VERSION>
```

Remplacez `<EXTENSION_VERSION>` par la version de l'extension à installer, par exemple `1.4.0`.

#### Installer une version spécifique sur tout un groupe de ressources

Pour installer une version spécifique sur un groupe de ressources, suivez les [instructions de mise à jour de l'extension pour un groupe de ressources](#groupe-de-ressources-avec-powershell) et ajoutez le paramètre `-ExtensionVersion` à la commande de mise à jour.

```
.\update-all-site-extensions.ps1 -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -Username <USERNAME> -Password <PASSWORD> -ExtensionVersion <EXTENSION_VERSION>
```

Remplacez `<EXTENSION_VERSION>` par la version de l'extension à installer, par exemple `1.4.0`.

### Modèle ARM

De nombreuses organisations ont recours à des [modèles Azure Resource Manager (ARM)][24] pour implémenter une infrastructure en tant que code (IaC). Pour générer l'extension App Service dans ces modèles, intégrez le [modèle ARM de l'extension App Service Datadog][25] à vos déploiements, afin d'ajouter et de configurer l'extension aux côtés de vos ressources App Service.

## Dépannage

### Problème de configuration dans la vue Serverless et/ou métriques manquantes pour vos traces

Si vous rencontrez ce type de problème, il est probable que l'intégration Azure n'ait pas été configurée dans l'optique de surveiller votre application. Une configuration adaptée simplifie la mise en corrélation des métriques, traces et logs de la plateforme Datadog. Si vous ne configurez pas l'intégration Azure, vos traces ne comporteront pas certains éléments de contexte importants. Pour corriger ce problème, procédez comme suit :

1. Accédez au carré d'intégration Azure.

2. Vérifiez que vous avez installé l'[intégration Azure][9] pour l'abonnement Azure à partir duquel votre application est exécutée.

3. Assurez-vous que les éventuelles règles de filtrage que vous avez appliquées aux plans App Service incluent le plan sur lequel l'application est exécutée. Dans le cas contraire, toutes les applications et fonctions hébergées sur le plan sont exclues. Le filtrage appliqué par Datadog ne repose pas sur les tags de l'application.


### Traces APM manquantes dans Datadog

1. Vérifiez que vous avez correctement défini `DD_SITE` et `DD_API_KEY`.

2. Arrêtez et démarrez votre application.

3. Si votre problème persiste, essayez de désinstaller l'extension, puis de la réinstaller. Cette opération vous permet également de vous assurer que vous utilisez la dernière version.

**Remarque** : pour faciliter le travail d'analyse des erreurs d'application effectué par l'équipe d'assistance, définissez `DD_TRACE_DEBUG:true` et ajoutez le contenu du répertoire de logs Datadog (`%AzureAppServiceHomeDirectory%\LogFiles\datadog`) en pièce jointe de votre e-mail.

Besoin d'aide supplémentaire ? Contactez [l'assistance Datadog][26].

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.microsoft.com/en-us/azure/app-service/
[2]: /fr/integrations/azure_app_services/
[3]: /fr/integrations/azure_functions/
[4]: https://app.datadoghq.com/functions?cloud=azure&config_serverless-azure-app=true&group=service
[5]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/resource-logs
[6]: /fr/integrations/azure/?tab=eventhub#log-collection
[7]: https://azure.microsoft.com/en-us/services/app-service/web/
[8]: /fr/developers/dogstatsd
[9]: /fr/integrations/azure
[10]: /fr/tracing/setup/dotnet/
[11]: https://portal.azure.com
[12]: https://app.datadoghq.com/organization-settings/api-keys
[13]: /fr/tracing/setup_overview/setup/dotnet-framework/#additional-optional-configuration
[14]: /fr/logs/log_collection/csharp/?tab=serilog#agentless-logging
[15]: https://www.nuget.org/packages/DogStatsD-CSharp-Client
[16]: /fr/developers/dogstatsd/?tab=net#code
[17]: /fr/metrics/
[18]: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
[19]: https://docs.microsoft.com/en-us/azure/cloud-shell/overview
[20]: https://docs.microsoft.com/en-us/azure/app-service/deploy-configure-credentials
[21]: https://portal.azure.com/
[22]: https://docs.microsoft.com/en-us/azure/media-services/latest/setup-azure-subscription-how-to
[23]: /fr/getting_started/site/
[24]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/overview
[25]: https://github.com/DataDog/datadog-aas-extension/tree/master/ARM
[26]: /fr/help