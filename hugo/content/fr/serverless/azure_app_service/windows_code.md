---
aliases:
- /fr/infrastructure/serverless/azure_app_services/
- /fr/serverless/azure_app_services/azure_app_services_windows
further_reading:
- link: /integrations/guide/azure-native-integration/
  tag: Documentation
  text: Guide d'intégration Azure Native
- link: https://www.datadoghq.com/blog/azure-app-service-extension/
  tag: Blog
  text: Surveiller des applications Web .NET avec l'extension Datadog pour Azure App Service
- link: https://www.datadoghq.com/pricing/?product=apm--continuous-profiler#apm--continuous-profiler-what-is-considered-as-a-host-for-azure-app-services
  tag: Tarification
  text: Tarifs d'APM pour Azure App Service
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: Blog
  text: Déployer des applications ASP.NET Core sur Azure App Service
- link: /serverless/azure_functions/dotnet_extension/
  tag: Documentation
  text: Extension APM .NET pour Azure Functions
title: Azure App Service - Code Windows
---
## Présentation {#overview}

L'extension Datadog pour Azure App Service fournit des fonctionnalités de surveillance en complément de l'[intégration Datadog-Azure][5], qui fournit des métriques et des logs.

- Traçage APM entièrement distribué grâce à l'instrumentation automatique.
- Vues personnalisées des services et des traces APM affichant les métriques et les métadonnées pertinentes d'Azure App Service.
- Prise en charge de l'instrumentation APM manuelle pour personnaliser les spans.
- `Trace_ID` injection dans les logs d'application.
- Prise en charge de la soumission de métriques personnalisées à l'aide de [DogStatsD][1].

<div class="alert alert-info">
L'extension prend en charge les éléments suivants :
<ul>
  <li>App Service Web Apps : pris en charge pour les environnements d'exécution .NET, Java et Node.js sur les plans Basic, Standard et Premium.</li>
  <li>Azure Functions : pris en charge uniquement pour l'environnement d'exécution .NET sur les plans Dedicated (App Service) ou Premium. <a href="/serverless/azure_functions/dotnet_extension/">Consultez la configuration spécifique et le dépannage de l'extension Windows sur Azure Functions</a></li>
</ul>

Pour toute fonction Azure non-.NET ou toute configuration .NET sur un plan autre que Dedicated/Premium, vous devez utiliser la <a href="/serverless/azure_functions">couche de compatibilité Serverless</a>.

<strong>Vous souhaitez obtenir la prise en charge d'autres types de ressources ou environnements d'exécution App Service ?</strong> <a href="https://forms.gle/n4nQcxEyLqDBMCDA7">Inscrivez-vous</a> pour être averti lorsqu'une version préliminaire sera disponible.</div>

### Environnements d'exécution pris en charge {#supported-runtimes}

Les extensions APM Datadog pour .NET, Java et Node.js prennent en charge les environnements d'exécution suivants :

| Framework | Environnements d'exécution pris en charge |
| --------- | ------------------ |
| .NET      | `ASPNET:V3.5`, `ASPNET:V4.8`, `dotnet:8`, `dotnet:9`, `dotnet:10`  |
| Java      | `JAVA:8`, `JAVA:11`, `JAVA:17`, `JAVA:21`, `TOMCAT:9.0-java8`, `TOMCAT:9.0-java11`, `TOMCAT:9.0-java17`, `TOMCAT:9.0-java21`, `TOMCAT:10.1-java8`, `TOMCAT:10.1-java11`, `TOMCAT:10.1-java17`, `TOMCAT:10.1-java21`, `TOMCAT:11.0-java8`, `TOMCAT:11.0-java11`, `TOMCAT:11.0-java17`, `TOMCAT:11.0-java21` |
| Node.js   | `NODE:20LTS`, `NODE:22LTS` |

### Notes spécifiques à l'extension {#extension-specific-notes}

{{< tabs >}}
{{% tab ".NET" %}}

L'instrumentation automatique de Datadog repose sur l'API de profilage .NET CLR. Cette API n'autorise qu'un seul abonné (par exemple, le traceur .NET de Datadog avec le profileur activé). Pour garantir une visibilité maximale, exécutez une seule solution APM au sein de votre environnement d'application.

De plus, si vous utilisez l'intégration Azure Native, vous pouvez utiliser la ressource Datadog dans Azure pour ajouter l'extension à vos applications .NET. Pour obtenir des instructions, consultez la [section de l'extension App Service][1] du [guide d'intégration Azure Native][2] de Datadog.

[1]: /fr/integrations/guide/azure-native-integration/#app-service-extension
[2]: /fr/integrations/guide/azure-native-integration/

{{% /tab %}}
{{% tab "Java" %}}
La prise en charge des applications Web Java est en préversion pour l'extension v2.4+.

Il n'y a aucune incidence sur la facturation pour le traçage des applications Web Java pendant cette période.

{{% /tab %}}
{{< /tabs >}}

## Installation {#installation}

Datadog recommande d'effectuer des mises à jour régulières vers la dernière version de l'extension pour garantir des performances, une stabilité et une disponibilité optimales des fonctionnalités. Notez que l'installation initiale ainsi que les mises à jour ultérieures nécessitent que votre application Web soit complètement arrêtée pour s'installer/se mettre à jour correctement.

Si ce n'est pas déjà fait, configurez l'[intégration Datadog-Azure][3]. Vous pouvez vérifier que votre intégration Azure est correctement configurée en vous assurant que vous voyez les métriques `azure.app_services.count` ou `azure.functions.count` dans Datadog.

<div class="alert alert-info">Cette étape est essentielle pour la corrélation métrique/trace et les vues fonctionnelles du panneau de trace, et améliore l'expérience globale d'utilisation de Datadog avec Azure App Services.
</div>

{{< tabs >}}
{{% tab "Datadog CLI" %}}

#### Localement {#locally}

Installez la [CLI Datadog][201]

```shell
npm install -g @datadog/datadog-ci @datadog/datadog-ci-plugin-aas
```

Installez la [CLI Azure][202] et authentifiez-vous avec `az login`.

Ensuite, exécutez la commande suivante pour configurer le conteneur sidecar :

```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_SITE=<DATADOG_SITE>
datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name>
```

Définissez votre site Datadog sur {{< region-param key="dd_site" code="true" >}}. La valeur par défaut est `datadoghq.com`.

L'interface de ligne de commande Datadog déduira automatiquement l'environnement d'exécution de votre application et installera l'application correspondante. Si cela échoue pour une raison quelconque, vous pouvez remplacer ce comportement en spécifiant un environnement d'exécution avec l'indicateur `--windows-runtime`.

Des indicateurs supplémentaires, comme `--service` et `--env`, peuvent être utilisés pour définir les tags de service et d'environnement. Pour une liste complète des options, exécutez `datadog-ci aas instrument --help`.

`datadog-ci aas instrument` n'a besoin d'être exécuté qu'une seule fois pour configurer l'instrumentation. Vous n'avez pas besoin de le réexécuter à chaque déploiement de code, réexécutez-le uniquement pour modifier votre configuration Datadog.

#### Azure Cloud Shell {#azure-cloud-shell}

Pour utiliser la CLI Datadog dans [Azure Cloud Shell][203], ouvrez un cloud shell, définissez votre clé d'API et votre site dans les variables d'environnement `DD_API_KEY` et `DD_SITE`, et utilisez `npx` pour exécuter la CLI directement :

```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_SITE=<DATADOG_SITE>
npx @datadog/datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name>
```


[201]: https://github.com/DataDog/datadog-ci#how-to-install-the-cli
[202]: https://learn.microsoft.com/en-us/cli/azure/install-azure-cli
[203]: https://portal.azure.com/#cloudshell/

{{% /tab %}}
{{% tab "Terraform" %}}

Le [module Terraform Datadog pour les applications Web Windows][4] enveloppe la ressource [azurerm_windows_web_app][5] et configure automatiquement votre application Web pour Datadog Serverless Monitoring en ajoutant les variables d'environnement requises et l'extension d'application Web Windows pour votre environnement d'exécution.

Si vous n'avez pas encore configuré Terraform, [installez Terraform][1], créez un nouveau répertoire et créez un fichier appelé `main.tf`.

Ensuite, ajoutez ce qui suit à votre configuration Terraform, en la mettant à jour si nécessaire selon vos besoins :

```tf
variable "datadog_api_key" {
  description = "Your Datadog API key"
  type        = string
  sensitive   = true
}

provider "azurerm" {
  features {}
  subscription_id = "00000000-0000-0000-0000-000000000000" // Replace with your subscription ID
}

resource "azurerm_service_plan" "my_asp" {
  name                = "my-app-service-plan" // Replace with your app service plan name
  resource_group_name = "my-resource-group"   // Replace with your resource group
  os_type             = "Windows"
  location            = "eastus"
  sku_name            = "P1v2"
}

module "my_web_app" {
  source  = "DataDog/web-app-datadog/azurerm//modules/windows"
  version = "~> 1.0"

  name                = "my-web-app"        // Replace with your web app name
  resource_group_name = "my-resource-group" // Replace with your resource group
  service_plan_id     = azurerm_service_plan.my_asp.id
  location            = "eastus"

  datadog_api_key = var.datadog_api_key
  datadog_service = "my-service" // Replace with your service name
  datadog_env     = "prod"       // Replace with your environment (e.g. prod, staging)
  datadog_version = "0.0.0"      // Replace with your application version

  site_config = {
    application_stack = {
      node_version = "~22" // change for your specific runtime
    }
  }
  app_settings = {
    DD_TRACE_ENABLED = "true" // Example setting
  }
}
```

Enfin, exécutez `terraform apply` et suivez les instructions.

Le [module d'application Web Windows Datadog][2] déploie uniquement la ressource et l'extension d'application Web, vous devez donc [déployer votre code][3] séparément.

[1]: https://developer.hashicorp.com/terraform/install
[2]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/windows
[3]: https://learn.microsoft.com/en-us/azure/app-service/getting-started
[4]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/windows
[5]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/windows_web_app

{{% /tab %}}
{{% tab "Bicep" %}}

Mettez à jour votre application Web existante pour inclure les paramètres d'application et l'extension Datadog nécessaires, comme suit :

```bicep
// Version: 1.0.0
@secure()
param datadogApiKey string

resource webApp 'Microsoft.Web/sites@2025-03-01' = {
  // ...
  properties: {
    // ...
    siteConfig: {
      // ...
      appSettings: [
        //... Your existing app settings
        { name: 'DD_API_KEY', value: datadogApiKey }
        { name: 'DD_SITE', value: 'datadoghq.com' }  // Replace with your Datadog site
        { name: 'DD_SERVICE', value: 'my-service' }  // Replace with your service name
        { name: 'DD_ENV', value: 'prod' }            // Replace with your environment (e.g. prod, staging)
        { name: 'DD_VERSION', value: '0.0.0' }       // Replace with your application version
        // Add any additional options here
      ]
    }
  }
}

resource datadogExtension 'Microsoft.Web/sites/siteextensions@2025-03-01' = {
  parent: webApp
  // Uncomment the extension for your runtime:
  // name: 'Datadog.AzureAppServices.Node.Apm'
  // name: 'Datadog.AzureAppServices.DotNet'
  // name: 'Datadog.AzureAppServices.Java.Apm'
}
```

Déployez votre modèle mis à jour :

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**Remarque** : Vous devrez arrêter et démarrer l'application manuellement (ou via un script), sinon le traçage automatique ne fonctionnera pas. Pour les mises à jour, vous devez vous assurer que l'application est arrêtée avant de déployer le modèle, et redémarrée une fois le déploiement terminé.

Consultez l'[{{< ui >}}Manual{{< /ui >}}onglet](?tab=manual#instrumentation) pour obtenir les descriptions de toutes les variables d'environnement.


{{% /tab %}}
{{% tab "Modèle ARM" %}}

Mettez à jour votre application Web existante pour inclure les paramètres d'application Datadog et le sidecar nécessaires, comme suit :

```jsonc
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "metadata": { "version": "1.0.0" },
  "parameters": {
    "webAppName": {
      "type": "string"
    },
    // ...
    "datadogApiKey": {
      "type": "securestring"
    }
  },
  "resources": {
    "webApp": {
      "type": "Microsoft.Web/sites",
      "apiVersion": "2025-03-01",
      "name": "[parameters('webAppName')]",
      // ...
      "properties": {
        // ...
        "siteConfig": {
          // ...
          "appSettings": [
            //... Your existing app settings
            { "name": "DD_API_KEY", "value": "[parameters('datadogApiKey')]" },
            { "name": "DD_SITE", "value": "datadoghq.com" }, // Replace with your Datadog site
            { "name": "DD_SERVICE", "value": "my-service" }, // Replace with your service name
            { "name": "DD_ENV", "value": "prod" },           // Replace with your environment (e.g. prod, staging)
            { "name": "DD_VERSION", "value": "0.0.0" },      // Replace with your application version
            // Add any additional options here
          ]
        }
      }
    },
    "datadogExtension": {
      "type": "Microsoft.Web/sites/siteextensions",
      "apiVersion": "2025-03-01",
      // Uncomment the extension for your runtime:
      // "name": "[concat(parameters('webAppName'), '/Datadog.AzureAppServices.Node.Apm')]"
      // "name": "[concat(parameters('webAppName'), '/Datadog.AzureAppServices.DotNet')]"
      // "name": "[concat(parameters('webAppName'), '/Datadog.AzureAppServices.Java.Apm')]"
    }
  }
}
```

Déployez votre modèle mis à jour :

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**Remarque** : Vous devrez arrêter et démarrer l'application manuellement (ou via un script), sinon le traçage automatique ne fonctionnera pas. Pour les mises à jour, vous devez vous assurer que l'application est arrêtée avant de déployer le modèle, et redémarrée une fois le déploiement terminé.

Consultez l'[{{< ui >}}Manual{{< /ui >}}onglet](?tab=manual#instrumentation) pour obtenir les descriptions de toutes les variables d'environnement.

{{% /tab %}}
{{% tab "Méthode manuelle" %}}

1. Dans votre [portail Azure][1], accédez au dashboard de l'application Azure que vous souhaitez instrumenter avec Datadog.

2. Configurez les paramètres d'application suivants :

   **Variables d'environnement requises**

   `DD_API_KEY`
   : **Valeur** : Votre clé d'API Datadog.<br>
   Consultez [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}API Keys{{< /ui >}}][2] dans Datadog.<br>

   `DD_SITE`
   : **Valeur** : Votre site Datadog<br>
   Votre [site Datadog][3]. Par défaut `datadoghq.com`.<br>

   **Unified Service Tagging**

   Datadog recommande de marquer votre application avec les tags `env`, `service` et `version` pour le [unified service tagging][4].

   `DD_SERVICE`
   : **Valeur** : Le nom de service de votre application.<br>

   `DD_ENV`
   : **Valeur** : Le nom d'environnement de votre application.<br>
   Il n'y a pas de valeur par défaut pour ce champ.<br>

   `DD_VERSION`
   : **Valeur** : La version de votre application.<br>
   Il n'y a pas de valeur par défaut pour ce champ.<br>

   **Variables d'environnement supplémentaires**

   `DD_LOGS_INJECTION`
   : **Valeur** : `true` (recommandé)<br>
   Active la corrélation trace-log en injectant des identifiants de trace dans les logs de votre application.<br>
   Cela vous permet de corréler les logs avec les traces dans l'interface utilisateur Datadog.<br>

3. Cliquez sur {{< ui >}}Save{{< /ui >}}. Cela redémarre votre application.

4. Arrêtez votre application en cliquant sur {{< ui >}}Stop{{< /ui >}}.
   <div class="alert alert-danger">Vous <u>devez</u> arrêter votre application pour installer Datadog avec succès.</div>

5. Dans votre portail Azure, accédez à la page {{< ui >}}Extensions{{< /ui >}} et sélectionnez l'extension Datadog APM.

   {{< img src="infrastructure/serverless/azure_app_services/choose_extension.png" alt="Exemple de page Extensions dans le portail Azure, montrant l'extension Datadog APM pour .NET." style="width:100%;" >}}

6. Acceptez les conditions légales, cliquez sur {{< ui >}}OK{{< /ui >}} et attendez que l'installation se termine.
   <div class="alert alert-danger">Cette étape nécessite que votre application soit à l'arrêt.</div>

7.  Démarrez l'application principale, cliquez sur {{< ui >}}Start{{< /ui >}} :

    {{< img src="infrastructure/serverless/azure_app_services/start.png" alt="Bouton de démarrage Azure" style="width:100%;" >}}

8.  Vérifiez que l'extension est installée et en cours d'exécution en consultant la page {{< ui >}}Extensions{{< /ui >}} dans votre portail Azure.

<div class="alert alert-info">Pour éviter tout downtime, utilisez des <a href="https://learn.microsoft.com/en-us/azure/app-service/deploy-best-practices#use-deployment-slots">emplacements de déploiement</a>. Vous pouvez créer un workflow qui utilise l'<a href="https://github.com/marketplace/actions/azure-cli-action">action GitHub pour Azure CLI</a>. Consultez l'exemple de <a href="/resources/yaml/serverless/aas-workflow-windows.yaml">workflow GitHub</a>.</div>

[1]: https://portal.azure.com/
[2]: /fr/account_management/api-app-keys/
[3]: /fr/getting_started/site/
[4]: /fr/getting_started/tagging/unified_service_tagging

{{% /tab %}}
{{< /tabs >}}

{{% svl-tracing-env %}}

### Emplacements de déploiement {#deployment-slots}

<div class="alert alert-info">L'instrumentation des emplacements de déploiement est en préversion. Pendant la préversion, la télémétrie des emplacements apparaît sous l'application web principale. Pour distinguer la télémétrie des emplacements de celle de la production, configurez <a href="/getting_started/tagging/unified_service_tagging/">unified service tagging</a> avec des valeurs distinctes pour chaque emplacement.</div>

{{% collapse-content title="Instrumenter un emplacement de déploiement" level="h4" %}}

Pour instrumenter un [emplacement de déploiement][101] au lieu de l'application web principale, utilisez l'une des méthodes suivantes.

[101]: https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots

{{< tabs >}}
{{% tab "Datadog CLI" %}}

À l'aide de [Datadog CLI][1] (v5.9.0+), ajoutez le flag `--slot`. Utilisez `--service`, `--env` et `--version` pour définir des valeurs de unified service tagging distinctes pour l'emplacement.

Pour trouver les noms de vos emplacements de déploiement, exécutez :

```shell
az webapp deployment slot list --query '[].name' -o tsv -g <resource-group> -n <web-app>
```

```shell
datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name> \
  --slot <slot-name> \
  --service <service-name> --env <slot-env> --version <app-version>
```

Alternativement, fournissez l'ID de ressource complet de l'emplacement avec le flag `--resource-id` :

```shell
datadog-ci aas instrument --resource-id /subscriptions/<subscription-id>/resourceGroups/<resource-group>/providers/Microsoft.Web/sites/<app-name>/slots/<slot-name> \
  --service <service-name> --env <slot-env> --version <app-version>
```

**Remarque** : Lorsque vous transmettez `--env`, Datadog CLI marque automatiquement `DD_ENV` comme sticky setting, de sorte que votre tag `env` persiste lors des échanges d'emplacements.

[1]: https://github.com/DataDog/datadog-ci#how-to-install-the-cli

{{% /tab %}}
{{% tab "Terraform" %}}

Utilisez le [module Datadog Windows Web App Slot][1] :

```tf
module "my_web_app_slot" {
  source  = "DataDog/web-app-datadog/azurerm//modules/windows-slot"
  version = "~> 1.0"

  name                = "staging"             // Replace with your slot name
  app_service_id      = module.my_web_app.id  // Reference to your main web app
  resource_group_name = "my-resource-group"   // Replace with your resource group

  datadog_api_key = var.datadog_api_key
  datadog_service = "my-service" // Replace with your service name
  datadog_env     = "staging"    // Set a distinct value for each slot
  datadog_version = "0.0.0"      // Replace with your application version

  site_config = {
    application_stack = {
      node_version = "~22" // change for your specific runtime
    }
  }
  app_settings = {
    DD_TRACE_ENABLED = "true" // Example setting
  }
}
```

Exécutez `terraform apply` et suivez les instructions.

**Remarque** : Lorsque `datadog_env` est défini sur votre module d'application web principal, le module marque `DD_ENV` comme sticky setting, de sorte que votre tag `env` persiste lors des échanges d'emplacements.

[1]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/windows-slot

{{% /tab %}}
{{% tab "Bicep" %}}

Mettez à jour votre modèle pour cibler un emplacement de déploiement au lieu de l'application web principale :

```bicep
// Version: 1.0.0
@secure()
param datadogApiKey string

param webAppName string
param slotName string

@description('Names of app settings already marked slot-sticky on this web app. Pass [] for a new app with no existing sticky settings. This template does a full replace of slotConfigNames — omitting an existing sticky setting name will de-sticky it.')
param existingStickyAppSettingNames array = []

resource webApp 'Microsoft.Web/sites@2025-03-01' existing = {
  name: webAppName
}

resource slot 'Microsoft.Web/sites/slots@2025-03-01' = {
  parent: webApp
  name: slotName
  // ...
  properties: {
    // ...
    siteConfig: {
      // ...
      appSettings: [
        //... Your existing app settings
        { name: 'DD_API_KEY', value: datadogApiKey }
        { name: 'DD_SITE', value: 'datadoghq.com' }  // Replace with your Datadog site
        { name: 'DD_SERVICE', value: 'my-service' }  // Replace with your service name
        { name: 'DD_ENV', value: 'staging' }          // Set a distinct value for each slot
        { name: 'DD_VERSION', value: '0.0.0' }       // Replace with your application version
        // Add any additional options here
      ]
    }
  }
}

// Marks DD_ENV as slot-sticky so your `env` tag persists across slot swaps. Replaces the
// full slotConfigNames list — existingStickyAppSettingNames must include any settings already
// marked sticky or they will be de-stickied.
resource stickySettings 'Microsoft.Web/sites/config@2025-03-01' = {
  parent: webApp
  name: 'slotConfigNames'
  properties: {
    appSettingNames: union(existingStickyAppSettingNames, ['DD_ENV'])
  }
  dependsOn: [slot]
}

resource datadogExtension 'Microsoft.Web/sites/slots/siteextensions@2025-03-01' = {
  parent: slot
  // Uncomment the extension for your runtime:
  // name: 'Datadog.AzureAppServices.Node.Apm'
  // name: 'Datadog.AzureAppServices.DotNet'
  // name: 'Datadog.AzureAppServices.Java.Apm'
}
```

Déployez votre modèle mis à jour :

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**Remarque** : Vous devez arrêter et démarrer l'emplacement (et non l'application principale) pour que l'extension prenne effet.

**Remarque** : Les paramètres d'application Azure sont échangés entre les emplacements par défaut. La ressource `slotConfigNames` ci-dessus marque `DD_ENV` comme sticky setting, de sorte que votre tag `env` persiste lors des échanges d'emplacements.

La ressource `slotConfigNames` effectue un remplacement complet de la liste des sticky settings. Transmettez tous les paramètres déjà marqués comme sticky dans `existingStickyAppSettingNames`, ou `[]` pour une nouvelle application. Tout nom omis cesse d'être sticky.

{{% /tab %}}
{{% tab "Modèle ARM" %}}

Mettez à jour votre modèle pour cibler un emplacement de déploiement au lieu de l'application web principale :

```jsonc
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "metadata": { "version": "1.0.0" },
  "parameters": {
    "webAppName": {
      "type": "string"
    },
    "slotName": {
      "type": "string"
    },
    // ...
    "datadogApiKey": {
      "type": "securestring"
    },
    "existingStickyAppSettingNames": {
      "type": "array",
      "defaultValue": [],
      "metadata": { "description": "Names of app settings already marked slot-sticky on this web app. Pass [] for a new app with no existing sticky settings. This template does a full replace of slotConfigNames — omitting an existing sticky setting name will de-sticky it." }
    }
  },
  "resources": {
    "slot": {
      "type": "Microsoft.Web/sites/slots",
      "apiVersion": "2025-03-01",
      "name": "[concat(parameters('webAppName'), '/', parameters('slotName'))]",
      // ...
      "properties": {
        // ...
        "siteConfig": {
          // ...
          "appSettings": [
            //... Your existing app settings
            { "name": "DD_API_KEY", "value": "[parameters('datadogApiKey')]" },
            { "name": "DD_SITE", "value": "datadoghq.com" }, // Replace with your Datadog site
            { "name": "DD_SERVICE", "value": "my-service" }, // Replace with your service name
            { "name": "DD_ENV", "value": "staging" },        // Set a distinct value for each slot
            { "name": "DD_VERSION", "value": "0.0.0" },      // Replace with your application version
            // Add any additional options here
          ]
        }
      }
    },
    "datadogExtension": {
      "type": "Microsoft.Web/sites/slots/siteextensions",
      "apiVersion": "2025-03-01",
      // Uncomment the extension for your runtime:
      // "name": "[concat(parameters('webAppName'), '/', parameters('slotName'), '/Datadog.AzureAppServices.Node.Apm')]"
      // "name": "[concat(parameters('webAppName'), '/', parameters('slotName'), '/Datadog.AzureAppServices.DotNet')]"
      // "name": "[concat(parameters('webAppName'), '/', parameters('slotName'), '/Datadog.AzureAppServices.Java.Apm')]"
    },
    // Marks DD_ENV as slot-sticky so your `env` tag persists across slot swaps. Replaces the
    // full slotConfigNames list — existingStickyAppSettingNames must include any settings
    // already marked sticky or they will be de-stickied.
    "stickySettings": {
      "type": "Microsoft.Web/sites/config",
      "apiVersion": "2025-03-01",
      "name": "[concat(parameters('webAppName'), '/slotConfigNames')]",
      "properties": {
        "appSettingNames": "[union(parameters('existingStickyAppSettingNames'), createArray('DD_ENV'))]"
      },
      "dependsOn": [
        "[resourceId('Microsoft.Web/sites/slots', parameters('webAppName'), parameters('slotName'))]"
      ]
    }
  }
}
```

Déployez votre modèle mis à jour :

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**Remarque** : Vous devez arrêter et démarrer l'emplacement (et non l'application principale) pour que l'extension prenne effet.

**Remarque** : Les paramètres d'application Azure sont échangés entre les emplacements par défaut. La ressource `slotConfigNames` ci-dessus marque `DD_ENV` comme sticky setting, de sorte que votre tag `env` persiste lors des échanges d'emplacements.

La ressource `slotConfigNames` effectue un remplacement complet de la liste des sticky settings. Transmettez tous les paramètres déjà marqués comme sticky dans `existingStickyAppSettingNames`, ou `[]` pour une nouvelle application. Tout nom omis cesse d'être sticky.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

<div class="alert alert-info">Vous utilisez Azure Functions ? Consultez <a href="/serverless/azure_functions/dotnet_extension/">l'extension APM .NET pour Azure Functions</a> pour obtenir des instructions d'installation spécifiques aux Function Apps, y compris des conseils pour éviter les échecs de verrouillage de fichiers lors de l'installation de l'extension.</div>

## Métriques personnalisées {#custom-metrics}

L'extension Azure App Service inclut une instance de [DogStatsD][1], le service d'agrégation de métriques de Datadog. Cela vous permet de soumettre des métriques personnalisées, des checks de service et des événements directement à Datadog depuis Azure Web Apps et Functions avec l'extension.

L'écriture de métriques personnalisées et de checks dans Azure App Service est similaire au processus utilisé pour une application sur un host exécutant le Datadog Agent. **Contrairement** au [processus de configuration standard de DogStatsD][1], il n'est pas nécessaire de définir des ports ou un nom de serveur lors de l'initialisation de la configuration de DogStatsD. Il existe des variables d'environnement ambiantes dans Azure App Service qui déterminent la manière dont les métriques sont envoyées (nécessite la version 6.0.0+ du client DogStatsD).

Pour soumettre des métriques personnalisées à Datadog depuis Azure App Service à l'aide de l'extension :

{{< tabs >}}
{{% tab ".NET" %}}

{{% aas-custom-metrics-dotnet %}}

{{% /tab %}}
{{% tab "Java" %}}

1. Ajoutez le [client DogStatsD](https://search.maven.org/artifact/com.datadoghq/java-dogstatsd-client) à votre projet.
2. Initialisez DogStatsD et écrivez des métriques personnalisées dans votre application.
3. Déployez votre code sur une Azure Web App prise en charge.
4. Si ce n'est pas déjà fait, installez l'extension Datadog App Service.

Pour envoyer des métriques, utilisez ce code :

```java
// Configure your DogStatsd client and configure any tags
StatsDClient client = new NonBlockingStatsDClientBuilder()
                            .constantTags("app:sample.service")
                            .build();
// Send a metric
client.Increment("sample.startup");
```

{{% /tab %}}
{{% tab "Node.js" %}}

1. [Initialisez DogStatsD et écrivez des métriques personnalisées][1] dans votre application.
2. Déployez votre code sur une Azure Web App prise en charge.
3. Si ce n'est pas déjà fait, installez l'extension Node.js Azure App Service de Datadog.

<div class="alert alert-info">Vous n'avez pas besoin d'installer un client DogStatsD Node.js, car il est inclus dans le traceur Node.js (<code>dd-trace</code>) empaqueté dans l'extension Azure App Service.</div>

Pour envoyer des métriques, utilisez ce code :

```javascript
const tracer = require('dd-trace');
tracer.init();

tracer.dogstatsd.increment('example_metric.increment', 1, { environment: 'dev' });
tracer.dogstatsd.decrement('example_metric.decrement', 1, { environment: 'dev' });
```

<div class="alert alert-info">Le Datadog Node.js tracer, <code>dd-trace</code>, est empaqueté dans l'extension Azure App Service. Il est automatiquement ajouté au <code>NODE_PATH</code>.<br/><br/> <strong>Vous n'avez pas besoin d'ajouter</strong> <code>dd-trace</code> <strong>en tant que dépendance dans</strong> <code>package.json</code>. L'ajout explicite de <code>dd-trace</code> en tant que dépendance peut remplacer la version fournie par l'extension. Pour les tests locaux, consultez les <a href="https://github.com/DataDog/datadog-aas-extension/releases">notes de version</a> pour trouver la version appropriée du traceur Node.js pour votre version de l'extension Azure App Service.</div>

[1]: /fr/extend/dogstatsd/

{{% /tab %}}
{{< /tabs >}}

**Remarque** : Pour envoyer uniquement des métriques personnalisées (tout en désactivant le traçage), définissez les variables suivantes dans la configuration de votre application :
  - Définissez `DD_TRACE_ENABLED` sur `false`.
  - Définissez `DD_AAS_ENABLE_CUSTOM_METRICS` sur `true`.

En savoir plus sur les [métriques personnalisées][2].

## Journalisation {#logging}

### Journalisation des applications {#application-logging}

{{< tabs >}}
{{% tab ".NET" %}}

{{% aas-logging-dotnet %}}

{{% /tab %}}
{{% tab "Java" %}}

L'envoi de logs depuis votre application dans Azure App Service vers Datadog nécessite la diffusion des logs vers Datadog directement depuis votre application. La soumission de logs avec cette méthode permet l'injection d'ID de trace, ce qui permet de connecter les logs et les traces dans Datadog.

{{% /tab %}}
{{% tab "Node.js" %}}

L'envoi de logs depuis votre application dans Azure App Service vers Datadog nécessite la diffusion des logs vers Datadog directement depuis votre application. La soumission de logs avec cette méthode permet l'injection d'ID de trace, ce qui permet de connecter les logs et les traces dans Datadog.

{{% /tab %}}
{{< /tabs >}}

<br/>

### Variables d'environnement pour la journalisation {#environment-variables-for-logging}

Configurez ces variables d'environnement dans les paramètres de votre application Azure App Service pour une collecte optimale des logs :

| Variable | Description | Exemple |
|----------|-------------|---------|
| `DD_SERVICE` | Nom du service de votre application | `my-web-app` |
| `DD_ENV` | Environnement de votre application | `production`, `staging`, `development` |
| `DD_LOGS_INJECTION` | Activer la corrélation trace-log | `true` |

### Bonnes pratiques de journalisation {#logging-best-practices}

- **Activer la corrélation de trace** : Définissez `DD_LOGS_INJECTION=true` pour corréler les logs avec les traces
- **Définissez des noms de service appropriés** : utilisez `DD_SERVICE` pour vous assurer que les logs apparaissent avec le nom de service correct
- **Utilisez la journalisation structurée** : implémentez la journalisation structurée dans votre application pour un meilleur parsing des logs

**Remarque** : l'injection d'ID de trace se produit à l'intérieur de votre application. Les logs de ressources Azure sont générés par Azure dans le plan de gestion et n'incluent donc pas l'ID de trace.

{{< tabs >}}
{{% tab ".NET" %}}

**Exemple de code : journalisation native Microsoft**

Un exemple de configuration de la journalisation dans une application .NET à l'aide de Microsoft.Extensions.Logging :

```csharp
using Microsoft.Extensions.Logging;

public class WeatherForecastController : ControllerBase
{
    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Get()
    {
        _logger.LogInformation("Processing weather forecast request");

        // Your business logic here
        var forecast = GetWeatherForecast();

        _logger.LogInformation("Weather forecast retrieved for user: {UserId}", userId);

        return Ok(forecast);
    }
}
```

**Configuration de Program.cs**

```csharp
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

// Configure logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

// Add structured logging with JSON format
builder.Logging.AddJsonConsole(options =>
{
    options.JsonWriterOptions = new JsonWriterOptions
    {
        Indented = true
    };
});

var app = builder.Build();
// ... rest of your application configuration
```

**Configuration d'appsettings.json**

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    },
    "Console": {
      "FormatterName": "json",
      "FormatterOptions": {
        "IncludeScopes": true,
        "TimestampFormat": "yyyy-MM-dd HH:mm:ss "
      }
    }
  }
}
```

Cette configuration inclut automatiquement la corrélation de trace lorsque `DD_LOGS_INJECTION=true` est défini dans les paramètres de votre application Azure App Service.

{{% /tab %}}
{{% tab "Java" %}}

Consultez [Diffuser les logs directement vers l'Agent][1] pour configurer la journalisation des applications pour Java dans Azure App Service.

## [1]: /logs/log_collection/java/ stream-logs-directly-to-the-agent
{{% /tab %}}
{{% tab "Node.js" %}}

Pour configurer la journalisation des applications pour Node.js dans Azure App Service, consultez [Journalisation Agentless avec Node.js][1].

[1]: /fr/logs/log_collection/nodejs/#agentless-logging

{{% /tab %}}
{{< /tabs >}}

## Gestion par programmation {#programmatic-management}

{{< tabs >}}
{{% tab ".NET" %}}

Datadog fournit des scripts pour mettre à jour ou installer l'extension Azure App Service à l'aide de PowerShell. La gestion des extensions par script vous permet de [mettre à jour les extensions en masse par groupe de ressources](#powershell-resource-group) et de [désigner l'installation de versions spécifiques de l'extension de site](#powershell-specific-version). Vous pouvez également utiliser des scripts pour ajouter l'extension par programmation dans les pipelines CI/CD, ainsi que pour découvrir et mettre à jour les extensions déjà installées.

### Prérequis {#prerequisites}

- L'[Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) ou [Azure Cloud Shell](https://docs.microsoft.com/en-us/azure/cloud-shell/overview).
- Identifiants [au niveau de l'utilisateur](https://docs.microsoft.com/en-us/azure/app-service/deploy-configure-credentials) Azure App Service. Si vous ne disposez pas déjà d'identifiants, accédez à votre [portail Azure](https://portal.azure.com/) et accédez à votre Web App ou Function App. Accédez à {{< ui >}}Deployment{{< /ui >}} > {{< ui >}}Deployment Center{{< /ui >}} pour créer ou récupérer vos identifiants au niveau de l'utilisateur.

### Installation de l'extension pour la première fois {#powershell-first-time}

Le script d'installation ajoute la dernière version de l'extension à une application Azure Web App ou Azure Function App. Cela se produit par application, plutôt qu'au niveau du groupe de ressources.

1. Ouvrez l'interface de ligne de commande Azure (Azure CLI) ou Azure Cloud Shell.
2. Téléchargez le script d'installation à l'aide de la commande suivante :

    ```
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/DataDog/datadog-aas-extension/master/management-scripts/extension/install-latest-extension.ps1" -OutFile "install-latest-extension.ps1"
    ```

3. Exécutez la commande suivante en transmettant les arguments requis et facultatifs selon vos besoins.

    ```
    .\install-latest-extension.ps1 -Username <USERNAME> -Password <PASSWORD> -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -SiteName <SITE_NAME> -DDApiKey <DATADOG_API_KEY> -DDSite <DATADOG_SITE> -DDEnv <DATADOG_ENV> -DDService <DATADOG_SERVICE> -DDVersion <DATADOG_VERSION> [-SlotName <SLOT_NAME>]
    ```

**Remarque** : Les arguments suivants sont requis pour la commande ci-dessus :

- `<USERNAME>` : Votre nom d'utilisateur au niveau de l'utilisateur Azure.
- `<PASSWORD>` : Votre mot de passe au niveau de l'utilisateur Azure.
- `<SUBSCRIPTION_ID>` : Votre [ID d'abonnement Azure](https://docs.microsoft.com/en-us/azure/media-services/latest/setup-azure-subscription-how-to).
- `<RESOURCE_GROUP_NAME>` : Le nom de votre groupe de ressources Azure.
- `<SITE_NAME>` : Le nom de votre application.
- `<DATADOG_API_KEY>` : Votre [clé d'API Datadog](https://app.datadoghq.com/organization-settings/api-keys).

Définissez également `DATADOG_SITE` sur votre [site Datadog][32]. `DATADOG_SITE` a pour valeur par défaut `datadoghq.com`. Votre site est : {{< region-param key="dd_site" code="true" >}}.

Pour cibler un emplacement de déploiement au lieu de l'application principale, ajoutez `-SlotName <SLOT_NAME>`. Sur les Azure Function Apps, cela applique également automatiquement le paramètre d'emplacement fixe `WEBSITE_PRIVATE_EXTENSIONS=0` pour éviter les échecs d'installation de l'extension. Consultez [l'extension APM .NET pour Azure Functions](/serverless/azure_functions/dotnet_extension/) pour plus de détails.

[32]: /fr/getting_started/site/

### Mise à jour de l'extension pour un groupe de ressources {#powershell-resource-group}

Le script de mise à jour s'applique à un groupe de ressources entier. Ce script met à jour chaque Web App ou Function App sur laquelle l'extension est installée. Les applications App Service sur lesquelles l'extension Datadog n'est pas installée ne sont pas affectées.

1. Ouvrez l'interface de ligne de commande Azure (Azure CLI) ou Azure Cloud Shell.
2. Téléchargez le script de mise à jour à l'aide de la commande suivante :

    ```
    $baseUri="https://raw.githubusercontent.com/DataDog/datadog-aas-extension/master/management-scripts/extension"; Invoke-WebRequest -Uri "$baseUri/update-all-site-extensions.ps1" -OutFile "update-all-site-extensions.ps1"; Invoke-WebRequest -Uri "$baseUri/install-latest-extension.ps1" -OutFile "install-latest-extension.ps1"
    ```

3. Exécutez la commande suivante. Tous les arguments sont obligatoires.

    ```
    .\update-all-site-extensions.ps1 -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -Username <USERNAME> -Password <PASSWORD>
    ```

### Installer une version spécifique de l'extension {#powershell-specific-version}

L'interface utilisateur d'Azure App Service ne prend pas en charge la possibilité d'installer une version spécifique d'une extension. Vous pouvez le faire avec le script d'installation ou de mise à jour.

#### Installer une version spécifique sur une ressource unique {#install-specific-version-on-a-single-resource}

Pour installer une version spécifique sur une instance unique, suivez les [instructions d'installation de l'extension pour la première fois](#powershell-first-time) et ajoutez le paramètre `-ExtensionVersion` à la commande d'installation.

```
.\install-latest-extension.ps1 -Username <USERNAME> -Password <PASSWORD> -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -SiteName <SITE_NAME> -DDApiKey <DATADOG_API_KEY> -ExtensionVersion <EXTENSION_VERSION>
```

Remplacez `<EXTENSION_VERSION>` par la version de l'extension que vous souhaitez installer. Par exemple, `1.4.0`.

#### Installer une version spécifique sur un groupe de ressources entier {#install-specific-version-on-an-entire-resource-group}

Pour installer une version spécifique pour un groupe de ressources, suivez les [instructions de mise à jour de l'extension pour un groupe de ressources](#powershell-resource-group) et ajoutez le paramètre `-ExtensionVersion` à la commande d'installation.

```
.\update-all-site-extensions.ps1 -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -Username <USERNAME> -Password <PASSWORD> -ExtensionVersion <EXTENSION_VERSION>
```

Remplacez `<EXTENSION_VERSION>` par la version de l'extension que vous souhaitez installer. Par exemple, `1.4.0`.

### Modèle ARM {#arm-template}

De nombreuses organisations utilisent des [modèles Azure Resource Management (ARM)](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/overview) pour mettre en œuvre la pratique de l'infrastructure en tant que code. Pour intégrer l'extension App Service dans ces modèles, incorporez les [modèles d'installation de l'extension App Service de Datadog](https://github.com/DataDog/datadog-aas-extension/tree/master/install-templates) dans vos déploiements afin d'ajouter l'extension et de la configurer avec vos ressources App Service.

{{% /tab %}}
{{% tab "Java" %}}

<div class="alert alert-danger">La prise en charge des applications Web Java est en préversion pour l'extension v2.4+. La gestion par programmation n'est pas disponible pour les applications Web Java.<br/><br/>
    Êtes-vous intéressé par la prise en charge d'autres types de ressources App Service ou de runtimes ? <a href="https://forms.gle/n4nQcxEyLqDBMCDA7">Inscrivez-vous</a> pour être averti lorsqu'une version préliminaire sera disponible.</div>

{{% /tab %}}
{{< /tabs >}}

## Profilage {#profiling}

<div class="alert alert-info">
Datadog Continuous Profiler est disponible en version préliminaire pour .NET et Node.js sur Windows Azure App Service.
</div>

Pour activer le [Continuous Profiler][6], définissez la variable d'environnement `DD_PROFILING_ENABLED=true`.

## Déploiement {#deployment}

{{% aas-workflow-windows %}}

## Dépannage {#troubleshooting}

### Si vos applications sont identifiées comme étant mal configurées dans la vue Serverless et/ou s'il vous manque les métriques correspondantes pour vos traces {#if-your-apps-are-identified-as-being-misconfigured-in-the-serverless-view-andor-you-are-missing-corresponding-metrics-for-your-traces}

Il est probable que vous n'ayez pas configuré l'intégration Azure pour surveiller votre application. Une configuration appropriée améliore votre capacité à corréler les métriques, les traces et les logs dans la plateforme Datadog. Sans l'intégration Azure configurée, il vous manque un contexte critique pour vos traces. Pour corriger cela :

1. Accédez à la tuile d'intégration Azure.

2. Assurez-vous d'avoir installé l'[intégration Azure][3] pour l'abonnement Azure sur lequel votre application s'exécute.

3. Assurez-vous que toutes les règles de filtrage de plan App Service que vous avez appliquées incluent le plan App Service sur lequel l'application s'exécute. Si un plan App Service n'est pas inclus, toutes les applications et fonctions hébergées sur celui-ci ne sont pas incluses non plus. Les tags sur l'application elle-même ne sont pas utilisés pour le filtrage par Datadog.

### Si les traces APM n'apparaissent pas dans Datadog {#if-apm-traces-are-not-appearing-in-datadog}

1. Vérifiez que vous avez défini `DD_SITE` et `DD_API_KEY` correctement.

2. Effectuez un arrêt complet et un redémarrage de votre application.

3. Si le problème n'est pas résolu, essayez de désinstaller l'extension et de la réinstaller (cela garantit également que vous utilisez la dernière version).

**Remarque** : Pour accélérer le processus d'investigation des erreurs d'application avec l'équipe de support, définissez `DD_TRACE_DEBUG:true` et ajoutez le contenu du répertoire des logs Datadog (`%AzureAppServiceHomeDirectory%\LogFiles\datadog`) à votre e-mail.

Besoin d'aide supplémentaire ? Contactez le [support Datadog][4].

### Si vous voyez un span non lié dans une trace {#if-you-see-an-unrelated-span-in-a-trace}

Si la mise à l'échelle automatique est activée sur le plan App Service et que vous voyez des traces sans rapport fusionnées, les sondes d'intégrité de la plateforme Azure (`User-Agent: HttpScaleManager`) pourraient transporter un contexte de trace W3C obsolète. Si tous les appelants de l'application sont instrumentés par Datadog, définissez `DD_TRACE_PROPAGATION_STYLE_EXTRACT=datadog` sur l'application concernée pour limiter l'extraction du contexte de trace au format de Datadog. Pour les applications dont les appelants ne sont pas instrumentés par Datadog, ce paramètre fait en sorte que Datadog ignore leur contexte de trace W3C, fragmentant ainsi ces requêtes en traces déconnectées au lieu de les fusionner avec la trace parente.

### Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/extend/dogstatsd
[2]: /fr/metrics/custom_metrics/
[3]: /fr/integrations/azure/
[4]: /fr/help
[5]: https://app.datadoghq.com/integrations/azure
[6]: /fr/profiler/