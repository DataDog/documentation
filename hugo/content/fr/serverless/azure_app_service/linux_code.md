---
aliases:
- /fr/serverless/azure_app_services/azure_app_services_linux
further_reading:
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: Blog
  text: Surveillez vos applications web Linux sur Azure App Service avec Datadog
title: Azure App Service - Linux Code
---
## Présentation {#overview}

Cette page décrit comment instrumenter votre application Linux Azure App Service avec Datadog Agent. La procédure sur cette page utilise un conteneur sidecar et les paramètres d'application pour Linux Azure App Service afin d'instrumenter l'application et de gérer sa configuration.

Si vous préférez ne pas utiliser l'approche sidecar (non recommandé), vous pouvez suivre les instructions pour [Instrumenter le déploiement de code Azure App Service - Linux avec le wrapper Datadog][1].

**Runtimes pris en charge** : Java, Node.js, .NET, PHP, Python

## Configuration {#setup}

### Intégration Azure {#azure-integration}

Si ce n'est pas déjà fait, installez l'[intégration Datadog-Azure][10] pour collecter les métriques et les logs.

### Application {#application}

Installez le SDK pour votre langage :

{{< tabs >}}
{{% tab "Java" %}}

Java prend en charge l'ajout de code d'instrumentation via l'utilisation d'un argument de ligne de commande, `javaagent`.

1. Téléchargez la [dernière version du SDK Java de Datadog][101].
1. Placez le SDK dans votre projet. Il doit être inclus avec votre déploiement.
   Si vous utilisez le plugin `azure-webapp-maven`, vous pouvez ajouter le SDK Java en tant qu'entrée de ressource avec le type `lib`.
1. Définissez la variable d'environnement `JAVA_OPTS` avec `--javaagent:/home/site/lib/dd-java-agent.jar`. Lorsque votre application est déployée, le traceur Java est copié vers `/home/site/lib/dd-java-agent.jar`.

L'instrumentation démarre lorsque l'application est lancée.

[101]: https://dtdg.co/latest-java-tracer

{{% /tab %}}
{{% tab "Node.js" %}}

1. Installez le package `dd-trace`
   ```
   npm install dd-trace
   ```
2. Initialisez le traceur Node.js avec la variable d'environnement `NODE_OPTIONS` :
   ```
   NODE_OPTIONS='--require dd-trace/init'
   ```

{{% /tab %}}
{{% tab ".NET" %}}

Ajoutez le package Nuget `Datadog.Trace.Bundle` à votre projet. Consultez [la page du package Nuget pour plus de détails][102].

Exemple :

```shell
dotnet add package Datadog.Trace.Bundle --version 3.21.0
```

[102]: https://www.nuget.org/packages/Datadog.Trace.Bundle#readme-body-tab

{{% /tab %}}
{{% tab "PHP" %}}

Exécutez le script suivant pour installer le SDK PHP de Datadog :
startup.sh :

```bash
#!/usr/bin/env bash

echo "Setting up Datadog tracing for PHP"
DD_PHP_TRACER_VERSION=1.8.3
DD_PHP_TRACER_URL=https://github.com/DataDog/dd-trace-php/releases/download/${DD_PHP_TRACER_VERSION}/datadog-setup.php

echo "Installing PHP tracer from ${DD_PHP_TRACER_URL}"
if curl -LO --fail "${DD_PHP_TRACER_URL}"; then
    eval "php datadog-setup.php --php-bin=all"
else
    echo "Downloading the tracer was unsuccessful"
    return
fi

# This line is can be uncommented if the project contains an nginx configuration in the project root
# cp /home/site/wwwroot/default /etc/nginx/sites-available/default && service nginx reload

service nginx reload
```

Ce script bash est destiné à être exécuté en tant que commande de démarrage, qui installe le module de traçage dans PHP, puis redémarre le service NGINX.

{{% /tab %}}
{{% tab "Python" %}}

1. Ajoutez `ddtrace` à votre projet.
1. Modifiez votre commande de démarrage. Votre nouvelle commande doit exécuter `ddtrace-run` avec votre ancienne commande comme argument. C'est-à-dire : si votre commande de démarrage est `foo`, modifiez-la pour exécuter `ddtrace-run foo`.

   Exemple :
   ```ssh
   ddtrace-run gunicorn --bind=0.0.0.0 --timeout 600 quickstartproject.wsgi
   ```

{{% /tab %}}
{{< /tabs >}}

### Instrumentation {#instrumentation}

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

Le [module Terraform Datadog pour les applications Web Linux][1] encapsule la ressource [azurerm_linux_web_app][2] et configure automatiquement votre application Web pour Datadog Serverless Monitoring en ajoutant les variables d'environnement requises et le sidecar serverless-init.

Si Terraform n'est pas encore installé, [installez Terraform][3], créez un nouveau répertoire et créez un fichier nommé `main.tf`.

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
  resource_group_name = "my-resource-group"   // Replace with your resource group name
  os_type             = "Linux"
  location            = "eastus"
  sku_name            = "P1v2"
}

module "my_web_app" {
  source  = "DataDog/web-app-datadog/azurerm//modules/linux"
  version = "~> 1.0"

  name                = "my-web-app"        // Replace with your web app name
  resource_group_name = "my-resource-group" // Replace with your resource group name
  service_plan_id     = azurerm_service_plan.my_asp.id
  location            = "eastus"

  datadog_api_key = var.datadog_api_key
  datadog_service = "my-service" // Replace with your service name
  datadog_env     = "prod"       // Replace with your environment (e.g. prod, staging)
  datadog_version = "0.0.0"      // Replace with your application version

  site_config = {
    application_stack = {
      python_version = "3.13" // change for your specific runtime
    }
  }
  app_settings = {
    DD_TRACE_ENABLED = "true" // Example setting
  }
}
```

Enfin, exécutez `terraform apply` et suivez les instructions.

Le [module Datadog pour application Web Linux][4] déploie uniquement la ressource d'application Web, vous devez donc [déployer votre code][5] séparément.

[1]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/linux
[2]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/linux_web_app
[3]: https://developer.hashicorp.com/terraform/install
[4]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/linux
[5]: https://learn.microsoft.com/en-us/azure/app-service/getting-started

{{% /tab %}}
{{% tab "Bicep" %}}

Mettez à jour votre application Web existante pour inclure les paramètres d'application Datadog et le sidecar nécessaires, comme suit :

```bicep
resource webApp 'Microsoft.Web/sites@2025-03-01' = {
  // ...
  properties: {
    // ...
    siteConfig: {
      // ...
      appSettings: concat(datadogAppSettings, [
        //... Your existing app settings
      ])
    }
  }
}

@secure()
param datadogApiKey string

var datadogAppSettings = [
  { name: 'DD_API_KEY', value: datadogApiKey }
  { name: 'DD_SITE', value: 'datadoghq.com' }  // Replace with your Datadog site
  { name: 'DD_SERVICE', value: 'my-service' }  // Replace with your service name
  { name: 'DD_ENV', value: 'prod' }            // Replace with your environment (e.g. prod, staging)
  { name: 'DD_VERSION', value: '0.0.0' }       // Replace with your application version
  { name: 'WEBSITES_ENABLE_APP_SERVICE_STORAGE', value: 'true' }
  // Uncomment for .NET applications
  // { name: 'DD_DOTNET_TRACER_HOME', value: '/datadog/tracer' }
  // { name: 'CORECLR_ENABLE_PROFILING', value: '1' }
  // { name: 'CORECLR_PROFILER', value: '{846F5F1C-F9AE-4B07-969E-05C26BC060D8}' }
  // { name: 'CORECLR_PROFILER_PATH', value: '/datadog/tracer/Datadog.Trace.ClrProfiler.Native.so' }
  { name: 'DD_LOGS_INJECTION', value: 'true' }
  { name: 'DD_TRACE_ENABLED', value: 'true' }
  // Add any additional options here
]

resource sidecar 'Microsoft.Web/sites/sitecontainers@2025-03-01' = {
  parent: webApp
  name: 'datadog-sidecar'
  properties: {
    image: 'index.docker.io/datadog/serverless-init:latest'
    isMain: false
    targetPort: '8126'
    environmentVariables: [for v in datadogAppSettings: { name: v.name, value: v.name }]
  }
}
```

Redéployez votre modèle mis à jour :

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

Consultez l'onglet [Manuel](?tab=manual#instrumentation) pour obtenir les descriptions de toutes les variables d'environnement.


{{% /tab %}}
{{% tab "Modèle ARM" %}}

Mettez à jour votre application Web existante pour inclure les paramètres d'application Datadog et le sidecar nécessaires, comme suit :

```jsonc
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "webAppName": {
      "type": "string"
    },
    // ...
    "datadogApiKey": {
      "type": "securestring"
    }
  },
  "variables": {
    "datadogAppSettings": [
      { "name": "DD_API_KEY", "value": "[parameters('datadogApiKey')]" },
      { "name": "DD_SITE", "value": "datadoghq.com" }, // Replace with your Datadog site
      { "name": "DD_SERVICE", "value": "my-service" }, // Replace with your service name
      { "name": "DD_ENV", "value": "prod" },           // Replace with your environment (e.g. prod, staging)
      { "name": "DD_VERSION", "value": "0.0.0" },      // Replace with your application version
      { "name": "WEBSITES_ENABLE_APP_SERVICE_STORAGE", "value": "true" },
      // Uncomment for .NET applications
      // { "name": "DD_DOTNET_TRACER_HOME", "value": "/datadog/tracer" }
      // { "name": "CORECLR_ENABLE_PROFILING", "value": "1" }
      // { "name": "CORECLR_PROFILER", "value": "{846F5F1C-F9AE-4B07-969E-05C26BC060D8}" }
      // { "name": "CORECLR_PROFILER_PATH", "value": "/datadog/tracer/Datadog.Trace.ClrProfiler.Native.so" }
      { "name": "DD_LOGS_INJECTION", "value": "true" },
      { "name": "DD_TRACE_ENABLED", "value": "true" }
      // Add any additional options here
    ],
    "yourAppSettings": [
      // Add your app settings here
    ]
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
          "appSettings": "[concat(variables('datadogAppSettings'), variables('yourAppSettings'))]"
        }
      }
    },
    "sidecar": {
      "type": "Microsoft.Web/sites/sitecontainers",
      "apiVersion": "2025-03-01",
      "name": "[concat(parameters('webAppName'), '/datadog-sidecar')]",
      "properties": {
        "image": "index.docker.io/datadog/serverless-init:latest",
        "isMain": false,
        "targetPort": "8126",
        "copy": [{
          "name": "environmentVariables", "count": "[length(variables('datadogAppSettings'))]",
          "input": {
            "name": "[variables('datadogAppSettings')[copyIndex('environmentVariables')].name]",
            "value": "[variables('datadogAppSettings')[copyIndex('environmentVariables')].name]"
          }
        }],
      }
    }
  }
}
```

Redéployez votre modèle mis à jour :

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

Consultez l'onglet [Manuel](?tab=manual#instrumentation) pour obtenir les descriptions de toutes les variables d'environnement.

{{% /tab %}}
{{% tab "Méthode manuelle" %}}

1. **Configurez un conteneur sidecar pour Datadog**.

   1. Dans Azure, accédez à {{< ui >}}Deployment{{< /ui >}} > {{< ui >}}Deployment Center{{< /ui >}}. Sélectionnez l'onglet {{< ui >}}Containers{{< /ui >}}.
   1. Cliquez sur {{< ui >}}Add{{< /ui >}} et sélectionnez {{< ui >}}Custom container{{< /ui >}}.
   1. Dans le formulaire {{< ui >}}Edit container{{< /ui >}}, indiquez les informations suivantes :
      - {{< ui >}}Image source{{< /ui >}} : Autres registres de conteneurs
      - {{< ui >}}Image type{{< /ui >}} : Public
      - {{< ui >}}Registry server URL{{< /ui >}} : `index.docker.io`
      - {{< ui >}}Image and tag{{< /ui >}} : `datadog/serverless-init:latest`
      - {{< ui >}}Port{{< /ui >}} : 8126
      - Sous {{< ui >}}Environment variables{{< /ui >}}, activez l'option {{< ui >}}Allow access to all app settings{{< /ui >}}.

        {{< img src="serverless/azure_app_service/app_settings.png" alt="Dans Azure, une section Variables d'environnement. Une option 'Allow access to all app settings' est activée avec une case à cocher." >}}

   1. Sélectionnez {{< ui >}}Apply{{< /ui >}}.

2. **Configurez les variables d'environnement**.
   Dans Azure, ajoutez les paires clé-valeur suivantes dans {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Environment Variables{{< /ui >}} > {{< ui >}}App Settings{{< /ui >}} :

`DD_API_KEY`
: **Valeur**: Votre clé Datadog API.<br>
Consultez [Organization Settings > API Keys][301] dans Datadog.<br>

`DD_SITE`
: **Valeur**: {{< region-param key="dd_site" code="true" >}}<br>
Votre [site Datadog][302]. Par défaut `datadoghq.com`.<br>
Utilisez le menu déroulant « Datadog Site » dans la barre de navigation de droite de cette page pour sélectionner votre site.<br>

`DD_SERVICE`
: **Valeur**: Le nom de service de votre application.<br>
Par défaut, la valeur du champ name dans `package.json`.<br>
Consultez [Unified Service Tagging][303] pour plus d'informations sur le tag `service`.<br>

`DD_ENV`
: **Valeur**: Le nom d'environnement de votre application.<br>
Il n'y a pas de valeur par défaut pour ce champ.<br>
Consultez [Unified Service Tagging][303] pour plus d'informations sur le tag `env`.<br>

`DD_VERSION`
: **Valeur**: La version de votre application.<br>
Il n'y a pas de valeur par défaut pour ce champ.<br>
Consultez [Unified Service Tagging][303] pour plus d'informations sur le tag `version`.<br>

`WEBSITES_ENABLE_APP_SERVICE_STORAGE`
: **Valeur** : `true`<br>
Définir cette variable d'environnement sur `true` permet au montage `/home/` de persister et d'être partagé avec le sidecar.<br>

`DD_SERVERLESS_LOG_PATH`
: **Valeur** : Le chemin d'accès au log que le sidecar utilise pour collecter les logs.<br>
Où vous écrivez vos logs. Par exemple, `/home/LogFiles/*.log` ou `/home/LogFiles/myapp/*.log`.<br>

`DD_AAS_INSTANCE_LOGGING_ENABLED`
: **Valeur** : false <br>
Lorsque `true`, la collecte des logs est automatiquement configurée pour le chemin de fichier supplémentaire : `/home/LogFiles/*$COMPUTERNAME*.log`

`DD_AAS_INSTANCE_LOG_FILE_DESCRIPTOR`
: **Valeur** : Un descripteur de fichier optionnel utilisé pour un suivi plus précis des logs.<br>
Recommandé pour les scénarios avec une rotation fréquente des logs. Par exemple, définir `_default_docker` configure le suiveur de logs pour ignorer les fichiers ayant subi une rotation et se concentrer uniquement sur le fichier log actif d'Azure.<br>

<div class="alert alert-info">Si votre application possède plusieurs instances, assurez-vous que le nom du fichier log de votre application inclut la <code>$COMPUTERNAME</code> variable. Cela garantit que le suivi des logs ne crée pas de logs en double à partir de plusieurs instances lisant le même fichier. L'activation de cette variable de fonctionnalité empêche également <code>DD_SERVERLESS_LOG_PATH</code> d'être défini. Ceci afin d'éviter l'ingestion de logs en double.</div>




{{% collapse-content title=".NET : Variables d'environnement supplémentaires requises" level="h4" id="dotnet-additional-settings" %}}

Pour les applications .NET, les variables d'environnement suivantes sont **requises**. Consultez le `Datadog.Tracer.Bundle` [fichier README du package NuGet][1] pour plus de détails.

`DD_DOTNET_TRACER_HOME`
: **Valeur**: `/home/site/wwwroot/datadog`<br>
Chemin d'accès au répertoire contenant le SDK .NET Datadog.<br>

`CORECLR_ENABLE_PROFILING`
: **Valeur**: `1`<br>
Active les API d'instrumentation dans le runtime .NET.<br>

`CORECLR_PROFILER`
: **Valeur** : `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`<br>
Identifiant pour la bibliothèque d'instrumentation .NET de Datadog.<br>

`CORECLR_PROFILER_PATH`
: **Valeur** : `/home/site/wwwroot/datadog/`<br>
`linux-x64/Datadog.Trace.ClrProfiler.Native.so` (ligne unique)<br>
Chemin d'accès à la bibliothèque d'instrumentation chargée par le runtime .NET.<br>

[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle#readme-body-tab

{{% /collapse-content %}}

[301]: https://app.datadoghq.com/organization-settings/api-keys
[302]: /fr/getting_started/site/
[303]: /fr/getting_started/tagging/unified_service_tagging

{{% /tab %}}
{{< /tabs >}}

{{% svl-tracing-env %}}

### Emplacements de déploiement {#deployment-slots}

<div class="alert alert-info">L'instrumentation des emplacements de déploiement est en préversion. Pendant la préversion, la télémétrie des emplacements apparaît sous l'application web principale. Pour distinguer la télémétrie des emplacements de celle de la production, configurez <a href="/getting_started/tagging/unified_service_tagging/">unified service tagging</a> avec des valeurs distinctes pour chaque emplacement.</div>

{{% collapse-content title="Instrumenter un emplacement de déploiement" level="h4" %}}

Pour instrumenter un [emplacement de déploiement][801] au lieu de l'application web principale, utilisez l'une des méthodes suivantes.

[801]: https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots

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

Utilisez le [module Datadog Linux Web App Slot][1] :

```tf
module "my_web_app_slot" {
  source  = "DataDog/web-app-datadog/azurerm//modules/linux-slot"
  version = "~> 1.0"

  name                = "staging"             // Replace with your slot name
  app_service_id      = module.my_web_app.id  // Reference to your main web app
  resource_group_name = "my-resource-group"   // Replace with your resource group name

  datadog_api_key = var.datadog_api_key
  datadog_service = "my-service" // Replace with your service name
  datadog_env     = "staging"    // Set a distinct value for each slot
  datadog_version = "0.0.0"      // Replace with your application version

  site_config = {
    application_stack = {
      python_version = "3.13" // change for your specific runtime
    }
  }
  app_settings = {
    DD_TRACE_ENABLED = "true" // Example setting
  }
}
```

Exécutez `terraform apply` et suivez les instructions.

**Remarque** : Lorsque `datadog_env` est défini sur votre module d'application web principal, le module marque `DD_ENV` comme sticky setting, de sorte que votre tag `env` persiste lors des échanges d'emplacements.

[1]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/linux-slot

{{% /tab %}}
{{% tab "Bicep" %}}

Mettez à jour votre modèle pour cibler un emplacement de déploiement au lieu de l'application web principale :

```bicep
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
      appSettings: concat(datadogAppSettings, [
        //... Your existing app settings
      ])
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

@secure()
param datadogApiKey string

var datadogAppSettings = [
  { name: 'DD_API_KEY', value: datadogApiKey }
  { name: 'DD_SITE', value: 'datadoghq.com' }  // Replace with your Datadog site
  { name: 'DD_SERVICE', value: 'my-service' }  // Replace with your service name
  { name: 'DD_ENV', value: 'staging' }          // Set a distinct value for each slot
  { name: 'DD_VERSION', value: '0.0.0' }       // Replace with your application version
  { name: 'WEBSITES_ENABLE_APP_SERVICE_STORAGE', value: 'true' }
  // Uncomment for .NET applications
  // { name: 'DD_DOTNET_TRACER_HOME', value: '/datadog/tracer' }
  // { name: 'CORECLR_ENABLE_PROFILING', value: '1' }
  // { name: 'CORECLR_PROFILER', value: '{846F5F1C-F9AE-4B07-969E-05C26BC060D8}' }
  // { name: 'CORECLR_PROFILER_PATH', value: '/datadog/tracer/Datadog.Trace.ClrProfiler.Native.so' }
  { name: 'DD_LOGS_INJECTION', value: 'true' }
  { name: 'DD_TRACE_ENABLED', value: 'true' }
  // Add any additional options here
]

resource sidecar 'Microsoft.Web/sites/slots/sitecontainers@2025-03-01' = {
  parent: slot
  name: 'datadog-sidecar'
  properties: {
    image: 'index.docker.io/datadog/serverless-init:latest'
    isMain: false
    targetPort: '8126'
    environmentVariables: [for v in datadogAppSettings: { name: v.name, value: v.name }]
  }
}
```

Redéployez votre modèle mis à jour :

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**Remarque** : Les paramètres d'application Azure sont échangés entre les emplacements par défaut. La ressource `slotConfigNames` ci-dessus marque `DD_ENV` comme sticky setting, de sorte que votre tag `env` persiste lors des échanges d'emplacements.

La ressource `slotConfigNames` effectue un remplacement complet de la liste des sticky settings. Transmettez tous les paramètres déjà marqués comme sticky dans `existingStickyAppSettingNames`, ou `[]` pour une nouvelle application. Tout nom omis cesse d'être sticky.

{{% /tab %}}
{{% tab "Modèle ARM" %}}

Mettez à jour votre modèle pour cibler un emplacement de déploiement au lieu de l'application web principale :

```jsonc
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
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
  "variables": {
    "datadogAppSettings": [
      { "name": "DD_API_KEY", "value": "[parameters('datadogApiKey')]" },
      { "name": "DD_SITE", "value": "datadoghq.com" }, // Replace with your Datadog site
      { "name": "DD_SERVICE", "value": "my-service" }, // Replace with your service name
      { "name": "DD_ENV", "value": "staging" },        // Set a distinct value for each slot
      { "name": "DD_VERSION", "value": "0.0.0" },      // Replace with your application version
      { "name": "WEBSITES_ENABLE_APP_SERVICE_STORAGE", "value": "true" },
      // Uncomment for .NET applications
      // { "name": "DD_DOTNET_TRACER_HOME", "value": "/datadog/tracer" }
      // { "name": "CORECLR_ENABLE_PROFILING", "value": "1" }
      // { "name": "CORECLR_PROFILER", "value": "{846F5F1C-F9AE-4B07-969E-05C26BC060D8}" }
      // { "name": "CORECLR_PROFILER_PATH", "value": "/datadog/tracer/Datadog.Trace.ClrProfiler.Native.so" }
      { "name": "DD_LOGS_INJECTION", "value": "true" },
      { "name": "DD_TRACE_ENABLED", "value": "true" }
      // Add any additional options here
    ],
    "yourAppSettings": [
      // Add your app settings here
    ]
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
          "appSettings": "[concat(variables('datadogAppSettings'), variables('yourAppSettings'))]"
        }
      }
    },
    "sidecar": {
      "type": "Microsoft.Web/sites/slots/sitecontainers",
      "apiVersion": "2025-03-01",
      "name": "[concat(parameters('webAppName'), '/', parameters('slotName'), '/datadog-sidecar')]",
      "properties": {
        "image": "index.docker.io/datadog/serverless-init:latest",
        "isMain": false,
        "targetPort": "8126",
        "copy": [{
          "name": "environmentVariables", "count": "[length(variables('datadogAppSettings'))]",
          "input": {
            "name": "[variables('datadogAppSettings')[copyIndex('environmentVariables')].name]",
            "value": "[variables('datadogAppSettings')[copyIndex('environmentVariables')].name]"
          }
        }]
      }
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

Redéployez votre modèle mis à jour :

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**Remarque** : Les paramètres d'application Azure sont échangés entre les emplacements par défaut. La ressource `slotConfigNames` ci-dessus marque `DD_ENV` comme sticky setting, de sorte que votre tag `env` persiste lors des échanges d'emplacements.

La ressource `slotConfigNames` effectue un remplacement complet de la liste des sticky settings. Transmettez tous les paramètres déjà marqués comme sticky dans `existingStickyAppSettingNames`, ou `[]` pour une nouvelle application. Tout nom omis cesse d'être sticky.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

### Afficher les traces dans Datadog {#view-traces-in-datadog}

Une fois votre application redémarrée, accédez à la [page de service APM][2] de Datadog et recherchez le nom de service que vous avez défini pour votre application (`DD_SERVICE`).

### Métriques personnalisées {#custom-metrics}

Pour configurer votre application afin de soumettre des métriques personnalisées, suivez les étapes appropriées pour votre environnement d'exécution :

- [Java][3]
- [Node.js][4]
- [.NET][5]
- [PHP][6]
- [Python][7]

### Continuous Profiler {#continuous-profiler}

<div class="alert alert-info">
Le Continuous Profiler de Datadog est disponible en préversion pour Python et Node.js sur Azure App Service sous Linux.
</div>

Pour activer le Continuous Profiler, définissez la variable d'environnement `DD_PROFILING_ENABLED=true`. Pour plus d'informations, consultez la [documentation du Continuous Profiler][8].

## Déploiement {#deployment}

{{% aas-workflow-linux %}}

## Dépannage {#troubleshooting}

Si vous ne recevez pas les traces ou les données de métriques personnalisées comme prévu, activez la journalisation de débogage de l'agent en définissant `DD_LOG_LEVEL` dans les options de configuration du sidecar. Pour le débogage du traceur, définissez `DD_TRACE_DEBUG` sur true. Cela génère des logs de débogage supplémentaires pour le sidecar et le SDK.

Assurez-vous d'activer {{< ui >}}App Service logs{{< /ui >}} pour recevoir les logs de débogage.

{{< img src="serverless/azure_app_service/app-service-logs.png" alt="Configuration d'Azure App Service : logs App Service, sous la section Monitoring des Paramètres dans l'interface utilisateur Azure. L'option 'Application logging' est définie sur 'File System'." style="width:100%;" >}}

Partagez le contenu de {{< ui >}}Log stream{{< /ui >}} avec [Datadog Support][9].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/serverless/guide/azure_app_service_linux_code_wrapper_script
[2]: /fr/tracing/services/service_page/
[3]: /fr/extend/dogstatsd/?tab=java#dogstatsd-client
[4]: https://github.com/brightcove/hot-shots
[5]: /fr/extend/dogstatsd/?tab=dotnet#dogstatsd-client
[6]: /fr/extend/dogstatsd/?tab=php#dogstatsd-client
[7]: /fr/extend/dogstatsd/?tab=python#dogstatsd-client
[8]: /fr/profiler/
[9]: /fr/help
[10]: https://app.datadoghq.com/integrations/azure