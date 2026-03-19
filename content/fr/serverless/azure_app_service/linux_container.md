---
aliases:
- /fr/serverless/guide/azure_app_service_linux_sidecar
- /fr/serverless/azure_app_services/azure_app_services_container
further_reading:
- link: /integrations/azure_app_services/
  tag: Documentation
  text: Service d'application Azure
- link: /integrations/azure_app_service_environment/
  tag: Documentation
  text: Environnement de service d'application Azure
title: Instrumenter les conteneurs Linux de l'application Azure App Service
---
## Aperçu

Cette page décrit comment instrumenter votre application Azure App Service conteneurisée Linux avec l'Agent Datadog.

Ce document suppose que votre application est configurée pour les sidecars selon le tutoriel d'Azure [Configurer un conteneur sidecar pour un conteneur personnalisé dans Azure App Service][1].

Si vous préférez ne pas utiliser l'approche sidecar (non recommandée), vous pouvez suivre les instructions pour [Instrumenter le conteneur Linux de l'application Azure App Service avec `serverlessinit`][2].

## Configuration

### Intégration Azure

Si ce n'est pas déjà fait, installez l'[intégration DatadogAzure][3] pour collecter des métriques et des journaux.

### Application

{{< tabs >}}
{{% tab "Node.js" %}}
#### Traçage
Instrumentez votre application principale avec la bibliothèque `ddtracejs`. Voir [Traçage des applications Node.js][101] pour les instructions.

#### Métriques
Les métriques personnalisées sont également collectées via le traceur. Voir les [exemples de code][102].

#### Journaux
Le sidecar Datadog utilise le suivi de fichiers pour collecter les journaux. Datadog recommande d'écrire les journaux d'application dans `/home/LogFiles/` car ce répertoire est conservé lors des redémarrages.

Vous pouvez également créer un sous-répertoire, tel que `/home/LogFiles/myapp`, si vous souhaitez plus de contrôle sur ce qui est envoyé à Datadog. Cependant, si vous ne suivez pas tous les fichiers journaux dans `/home/LogFiles`, alors les journaux de l'application Azure App Service liés aux démarrages et aux erreurs ne sont pas collectés.

Pour configurer la journalisation dans votre application, consultez [Collecte de journaux Node.js][103]. Pour configurer la corrélation des journaux de trace, consultez [Corrélation des journaux et des traces Node.js][104].

[101]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#gettingstarted
[102]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/?codelang=nodejs#codeexamples
[103]: /fr/logs/log_collection/nodejs/?tab=winston30
[104]: /fr/tracing/other_telemetry/connect_logs_and_traces/nodejs
{{% /tab %}}
{{% tab "Python" %}}
#### Traçage
Instrumentez votre application principale avec la bibliothèque `ddtracepy`. Consultez [Tracer les applications Python][201] pour des instructions.

#### Métriques
Les métriques personnalisées sont également collectées via le traceur. Voir les [exemples de code][202].

#### Journaux
Le sidecar Datadog utilise le suivi de fichiers pour collecter des journaux. Datadog recommande d'écrire les journaux d'application dans `/home/LogFiles/` car ce répertoire est conservé lors des redémarrages.

Vous pouvez également créer un sous-répertoire, tel que `/home/LogFiles/myapp`, si vous souhaitez plus de contrôle sur ce qui est envoyé à Datadog. Cependant, si vous ne suivez pas tous les fichiers journaux dans `/home/LogFiles`, alors les journaux de l'application Azure App Service liés aux démarrages et aux erreurs ne sont pas collectés.

Pour configurer la journalisation dans votre application, consultez [Collecte de journaux Node.js][203]. Pour configurer la corrélation des journaux de trace, consultez [Corrélation des journaux et des traces Node.js][204].

[201]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[202]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/?codelang=python#codeexamples
[203]: /fr/logs/log_collection/python/
[204]: /fr/tracing/other_telemetry/connect_logs_and_traces/python
{{% /tab %}}
{{% tab "Java" %}}
#### Traçage
Instrumentez votre application principale avec la bibliothèque `ddtracejava`. Consultez [Tracer les applications Java][301] pour des instructions.

#### Métriques
Les métriques personnalisées sont également collectées via le traceur. Voir les [exemples de code][302].

#### Journaux
Le sidecar Datadog utilise le suivi de fichiers pour collecter les journaux. Datadog recommande d'écrire les journaux d'application dans `/home/LogFiles/` car ce répertoire est conservé lors des redémarrages.

Vous pouvez également créer un sous-répertoire, tel que `/home/LogFiles/myapp`, si vous souhaitez plus de contrôle sur ce qui est envoyé à Datadog. Cependant, si vous ne suivez pas tous les fichiers journaux dans `/home/LogFiles`, alors les journaux de l'application Azure App Service liés aux démarrages et aux erreurs ne sont pas collectés.

Pour configurer la journalisation dans votre application, consultez [Collecte de journaux Node.js][303]. Pour configurer la corrélation des journaux de trace, consultez [Corrélation des journaux et des traces Node.js][304].

[301]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#gettingstarted
[302]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/?codelang=java#codeexamples
[303]: /fr/logs/log_collection/java/?tab=winston30
[304]: /fr/tracing/other_telemetry/connect_logs_and_traces/java
{{% /tab %}}
{{% tab ".NET" %}}
#### Traçage
Instrumentez votre application principale avec la bibliothèque `ddtracedotnet`.

1. Ajoutez les lignes suivantes au Dockerfile de votre application principale. Cela installe et configure le traceur Datadog dans le conteneur de votre application.
   {{< code-block lang="dockerfile" >}}
   RUN mkdir -p /datadog/tracer
   RUN mkdir -p /home/LogFiles/dotnet

   ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v3.30.0/datadog-dotnet-apm-3.30.0.tar.gz /datadog/tracer
   RUN cd /datadog/tracer && tar -zxf datadog-dotnet-apm-3.30.0.tar.gz
   {{< /code-block >}}

2. Construisez l'image et poussez-la vers votre registre de conteneurs préféré.

**Exemple complet de Dockerfile**

{{< highlight dockerfile "hl_lines=22-27" >}}
# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the project file and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the remaining source code
COPY . .

# Build the application
RUN dotnet publish -c Release -o out

# Stage 2: Create a runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy the build output from stage 1
COPY --from=build /app/out ./

# Datadog specific
RUN mkdir -p /datadog/tracer
RUN mkdir -p /home/LogFiles/dotnet

ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v3.30.0/datadog-dotnet-apm-3.30.0.tar.gz /datadog/tracer
RUN cd /datadog/tracer && tar -zxf datadog-dotnet-apm-3.30.0.tar.gz

# Set the entry point for the application
ENTRYPOINT ["dotnet", "<your dotnet app>.dll"]
{{< /highlight >}}

Pour plus d'informations, consultez [Tracer les applications .NET][401].

#### Métriques
Les métriques personnalisées sont également collectées via le traceur. Consultez les [exemples de code][402].

#### Journaux
Le sidecar Datadog utilise le suivi de fichiers pour collecter les journaux. Datadog recommande d'écrire les journaux d'application dans `/home/LogFiles/` car ce répertoire est conservé lors des redémarrages.

Vous pouvez également créer un sous-répertoire, tel que `/home/LogFiles/myapp`, si vous souhaitez plus de contrôle sur ce qui est envoyé à Datadog. Cependant, si vous ne taillez pas tous les fichiers journaux dans `/home/LogFiles`, alors les journaux d'application Azure App Service liés aux démarrages et aux erreurs ne sont pas collectés.

Pour configurer la journalisation dans votre application, consultez [Collecte de journaux C#][403]. Pour configurer la corrélation des journaux de trace, consultez [Corrélation des journaux et des traces .NET][404].

[401]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnetcore
[402]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/?codelang=dotnet#codeexamples
[403]: /fr/logs/log_collection/csharp
[404]: /fr/tracing/other_telemetry/connect_logs_and_traces/dotnet

{{% /tab %}}
{{% tab "Go" %}}
#### Traçage
Instrumentez votre application principale avec la bibliothèque `ddtracego`. Voir [Tracer les applications Go][501] pour les instructions.

#### Métriques
Les métriques personnalisées sont également collectées via le traceur. Voir les [exemples de code][502].

#### Journaux
Le sidecar Datadog utilise le suivi de fichiers pour collecter les journaux. Datadog recommande d'écrire les journaux d'application dans `/home/LogFiles/` car ce répertoire est conservé lors des redémarrages.

Vous pouvez également créer un sous-répertoire, tel que `/home/LogFiles/myapp`, si vous souhaitez plus de contrôle sur ce qui est envoyé à Datadog. Cependant, si vous ne suivez pas tous les fichiers journaux dans `/home/LogFiles`, alors les journaux de l'application Azure App Service liés aux démarrages et aux erreurs ne sont pas collectés.

Pour configurer la journalisation dans votre application, voir [Collecte de journaux Node.js][503]. Pour configurer la corrélation des journaux de trace, voir [Corrélation des journaux et des traces Node.js][504].

[501]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/go
[502]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/?codelang=go#codeexamples
[503]: /fr/logs/log_collection/go/
[504]: /fr/tracing/other_telemetry/connect_logs_and_traces/go
{{% /tab %}}
{{% tab "PHP" %}}
#### Traçage
Instrumentez votre application principale avec la bibliothèque `ddtracephp`. Voir [Tracer les applications PHP][601] pour les instructions.

#### Métriques
Les métriques personnalisées sont également collectées via le traceur. Voir les [exemples de code][602].

#### Journaux
Le sidecar Datadog utilise le suivi de fichiers pour collecter les journaux. Datadog recommande d'écrire les journaux d'application dans `/home/LogFiles/` car ce répertoire est conservé lors des redémarrages.

Vous pouvez également créer un sous-répertoire, tel que `/home/LogFiles/myapp`, si vous souhaitez plus de contrôle sur ce qui est envoyé à Datadog. Cependant, si vous ne suivez pas tous les fichiers journaux dans `/home/LogFiles`, alors les journaux de l'application Azure App Service liés aux démarrages et aux erreurs ne sont pas collectés.

Pour configurer la journalisation dans votre application, voir [Collecte de journaux Node.js][603]. Pour configurer la corrélation des journaux de trace, voir [Corrélation des journaux et des traces Node.js][604].

[601]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/php/#gettingstarted
[602]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/?codelang=php#codeexamples
[603]: /fr/logs/log_collection/php/
[604]: /fr/tracing/other_telemetry/connect_logs_and_traces/php
{{% /tab %}}
{{< /tabs >}}

### Instrumentation

L'instrumentation se fait à l'aide d'un conteneur sidecar. Ce conteneur sidecar collecte des traces, des métriques et des journaux de votre conteneur d'application principal et les envoie à Datadog.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

#### Localement

Installez le [Datadog CLI][601]

```shell
npm install -g @datadog/datadog-ci @datadog/datadog-ci-plugin-aas
```

Installez le [Azure CLI][602] et authentifiez-vous avec `az login`.

Ensuite, exécutez la commande suivante pour configurer le conteneur sidecar :

```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_SITE=<DATADOG_SITE>
datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name>
```

Définissez votre site Datadog sur {{< region-param key="dd_site" code="true" >}}. Par défaut, c'est `datadoghq.com`.

**Remarque :** Pour les applications .NET, ajoutez le `dotnet` drapeau pour inclure les variables d'environnement supplémentaires requises par le traceur .NET, et en plus le `musl` drapeau si votre conteneur utilise dotnet sur une image musl libc (comme Alpine Linux).

Des drapeaux supplémentaires, comme `service` et `env`, peuvent être utilisés pour définir les balises de service et d'environnement. Pour une liste complète des options, exécutez `datadogci aas instrument help`.

#### Azure Cloud Shell

Pour utiliser le Datadog CLI dans [Azure Cloud Shell][603], ouvrez le cloud shell et utilisez `npx` pour exécuter le CLI directement. Définissez votre clé API et votre site dans les variables d'environnement `DD_API_KEY` et `DD_SITE`, puis exécutez le CLI :
```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_SITE=<DATADOG_SITE>
npx @datadog/datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name>
```

[601]: https://github.com/DataDog/datadogci#howtoinstallthecli
[602]: https://learn.microsoft.com/fr-fr/cli/azure/installazurecli
[603]: https://portal.azure.com/#cloudshell/
{{% /tab %}}
{{% tab "Terraform" %}}

<div class="alert alert-danger">Parce que la ressource Azure Web App pour Conteneurs ne prend pas directement en charge les sitecontainers, vous devez vous attendre à un dérive dans votre configuration.</div>

Le [module Terraform Datadog pour les applications Web Linux][1] enveloppe la ressource [azurerm_linux_web_app][2] et configure automatiquement votre application Web pour la surveillance sans serveur Datadog en ajoutant les variables d'environnement requises et le sidecar serverlessinit.

Si vous n'avez pas encore configuré Terraform, [installez Terraform][3], créez un nouveau répertoire et créez un fichier appelé `main.tf`.

Ensuite, ajoutez ce qui suit à votre configuration Terraform, en le mettant à jour si nécessaire en fonction de vos besoins :

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
      docker_registry_url = "https://index.docker.io" // Replace with your registry URL
      docker_image_name   = "my-app:latest"           // Replace with your image name
    }
  }
  app_settings = {
    DD_TRACE_ENABLED = "true" // Example setting
  }
}
```

Enfin, exécutez `terraform apply`, et suivez les invites.

Le [module Datadog Linux Web App][1] ne déploie que la ressource Web App, vous devez donc construire et pousser votre conteneur séparément.

[1]: https://registry.terraform.io/modules/DataDog/webappdatadog/azurerm/latest/submodules/linux
[2]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/linux_web_app
[3]: https://developer.hashicorp.com/terraform/install

{{% /tab %}}
{{% tab "Bicep" %}}

Pour utiliser le sidecar avec les applications Web pour Conteneurs, vous devez utiliser le `SITECONTAINERS` linuxFxVersion avec `kind` défini sur `app,linux,container`. Mettez à jour votre application Web existante pour inclure les paramètres d'application Datadog nécessaires et le sidecar, comme suit :

```bicep
resource webApp 'Microsoft.Web/sites@2025-03-01' = {
  kind: 'app,linux,container'
  // ...
  properties: {
    // ...
    siteConfig: {
      // ...
      linuxFxVersion: 'SITECONTAINERS'
      appSettings: concat(datadogAppSettings, [
        //... Your existing app settings
      ])
    }
  }
}

resource mainContainer 'Microsoft.Web/sites/sitecontainers@2025-03-01' = {
  parent: webApp
  name: 'main'
  properties: {
    isMain: true
    image: 'index.docker.io/your/image:tag' // Replace with your Application Image
    targetPort: '8080'                      // Replace with your Application's Port
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

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

Consultez l'onglet [Manuel](?tab=manual#instrumentation) pour des descriptions de toutes les variables d'environnement.


{{% /tab %}}
{{% tab "Modèle ARM" %}}

Mettez à jour votre application Web existante pour inclure les paramètres d'application Datadog nécessaires et le sidecar, comme suit :

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
      "kind": "app,linux,container",
      // ...
      "properties": {
        // ...
        "siteConfig": {
          // ...
          "linuxFxVersion": "SITECONTAINERS",
          "appSettings": "[concat(variables('datadogAppSettings'), variables('yourAppSettings'))]"
        }
      }
    },
    "mainContainer": {
      "type": "Microsoft.Web/sites/sitecontainers",
      "apiVersion": "2025-03-01",
      "name": "[concat(parameters('webAppName'), '/main')]",
      "properties": {
        "isMain": true,
        "image": "index.docker.io/your/image:tag", // Replace with your Application Image
        "targetPort": "8080"                       // Replace with your Application's Port
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
        }]
      }
    }
  }
}
```

Redéployez votre modèle mis à jour :

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

Consultez l'onglet [Manuel](?tab=manual#instrumentation) pour des descriptions de toutes les variables d'environnement.

{{% /tab %}}
{{% tab "Manuel" %}}

#### Conteneur sidecar

1. Dans le portail Azure, allez dans **Centre de déploiement** et sélectionnez **Ajouter**.
2. Dans le formulaire **Modifier le conteneur**, fournissez les éléments suivants :
    **Source de l'image** : Docker Hub ou autres registres
    **Type d'image** : Public
    **URL du serveur de registre** : `index.docker.io`
    **Image et tag** : `datadog/serverlessinit:latest`
    **Port** : 8126
3. Sélectionnez **Appliquer**.

#### Paramètres de l'application

Dans vos **Paramètres d'application** dans Azure, définissez les variables d'environnement suivantes sur votre conteneur principal et le conteneur sidecar. Alternativement, définissez ces variables sur votre conteneur principal et activez l'option **Autoriser l'accès à tous les paramètres d'application**.

{{< img src="serverless/azure_app_service/app_settings.png" alt="Dans Azure, une section Variables d'environnement. Une option 'Allow access to all app settings' est activée avec une case à cocher." >}}

 `DD_API_KEY` : Votre [clé API Datadog][701]
 `DD_SERVICE` : Comment vous souhaitez taguer votre service. Par exemple, `sidecarazure`
 `DD_ENV`: Comment souhaitez-vous étiqueter votre environnement. Par exemple, `prod`
 `WEBSITES_ENABLE_APP_SERVICE_STORAGE`: `true`. Définir cette variable d'environnement permet au montage `/home/` de persister et d'être partagé avec le sidecar.
 `DD_SERVERLESS_LOG_PATH`: Où vous écrivez vos journaux. Par exemple, `/home/LogFiles/*.log` ou `/home/LogFiles/myapp/*.log`
 `DD_AAS_INSTANCE_LOGGING_ENABLED`: Lorsque `true`, la collecte des journaux est automatiquement configurée pour un chemin de fichier supplémentaire : `/home/LogFiles/*$COMPUTERNAME*.log`
 `DD_AAS_INSTANCE_LOG_FILE_DESCRIPTOR`: Un descripteur de fichier optionnel utilisé pour un suivi de fichier plus précis. Recommandé pour les scénarios avec une rotation fréquente des journaux. Par exemple, définir `_default_docker` configure le tailleur de journaux pour ignorer les fichiers tournés et se concentrer uniquement sur le fichier journal actif d'Azure.


   <div class="alert alert-info">Si votre application a plusieurs instances, assurez-vous que le nom de fichier journal de votre application inclut la variable <code>$COMPUTERNAME</code>. Cela garantit que le suivi des journaux ne crée pas de journaux dupliqués provenant de plusieurs instances lisant le même fichier.</div>

<details open>
<summary>
<h4>Pour les applications .NET : Variables d'environnement supplémentaires requises</h4>
</summary>

Si vous configurez la surveillance d'une application .NET, configurez les variables d'environnement suivantes **requises**.

| Nom de la variable | Valeur |
|  |  |
| `DD_DOTNET_TRACER_HOME` | `/datadog/tracer` |
| `CORECLR_ENABLE_PROFILING` | `1` |
| `CORECLR_PROFILER` | `{846F5F1CF9AE4B07969E05C26BC060D8}` |
| `CORECLR_PROFILER_PATH` | `/datadog/tracer/Datadog.Trace.ClrProfiler.Native.so` |
</details>

[701]: https://app.datadoghq.com/organizationsettings/apikeys
{{% /tab %}}
{{< /tabs >}}

{{% svl-tracing-env %}}

## Profilage

<div class="alert alert-info">
Le Profiler Continu de Datadog est disponible en aperçu pour Python et Node.js sur Linux Azure App Service.
</div>

Pour activer le [Profiler Continu][4], définissez la variable d'environnement `DD_PROFILING_ENABLED=true` dans votre conteneur d'application.

## Exemple d'application
L'exemple suivant contient une seule application avec traçage, métriques et journaux configurés.

{{< tabs >}}
{{% tab "Node.js" %}}

```js
const tracer = require('dd-trace').init({
 logInjection: true,
});
const express = require("express");
const app = express();
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
 level: 'info',
 exitOnError: false,
 format: format.json(),
 transports: [new transports.File({ filename: `/home/LogFiles/app-${process.env.COMPUTERNAME}.log`}),
  ],
});

app.get("/", (_, res) => {
 logger.info("Welcome!");
 res.sendStatus(200);
});

app.get("/hello", (_, res) => {
 logger.info("Hello!");
 metricPrefix = "nodejs-azure-sidecar";
 // Send three unique metrics, just so we're testing more than one single metric
 metricsToSend = ["sample_metric_1", "sample_metric_2", "sample_metric_3"];
 metricsToSend.forEach((metric) => {
   for (let i = 0; i < 20; i++) {
     tracer.dogstatsd.distribution(`${metricPrefix}.${metric}`, 1);
   }
 });
 res.status(200).json({ msg: "Sending metrics to Datadog" });
});

const port = process.env.PORT || 8080;
app.listen(port);
```
{{% /tab %}}
{{% tab "Python" %}}
```python
from flask import Flask, Response
from datadog import initialize, statsd
import os
import ddtrace
import logging

ddtrace.patch(logging=True)

FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
         '[dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
         '- %(message)s')
logging.basicConfig(filename=f'/home/LogFiles/app-{os.getenv(COMPUTERNAME)}.log', format=FORMAT)
log = logging.getLogger(__name__)
log.level = logging.INFO

options = {
   'statsd_host':'127.0.0.1',
   'statsd_port':8125
}

initialize(**options)

app = Flask(__name__)

@app.route("/")
def home():
   statsd.increment('page.views')
   log.info('Hello Datadog!!')
   return Response('💜 Hello Datadog!! 💜', status=200, mimetype='application/json')

app.run(host="0.0.0.0", port=8080)
```
{{% /tab %}}
{{% tab "Java" %}}
```java
package com.example.springboot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

@RestController
public class HelloController {
   private static final StatsDClient Statsd = new NonBlockingStatsDClientBuilder().hostname("localhost").port(8125).build();
   private static final Log logger = LogFactory.getLog(HelloController.class);
   @GetMapping("/")
   public String index() {
       Statsd.incrementCounter("page.views");
       logger.info("Hello Azure!");
       return "💜 Hello Azure! 💜";
   }

}

```
{{% /tab %}}
{{% tab "Go" %}}
```go
package main

import (
   "fmt"
   "log"
   "net/http"
   "os"
   "path/filepath"
   "github.com/DataDog/datadog-go/v5/statsd"
   "github.com/DataDog/dd-trace-go/v2/ddtrace"
   "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

const logDir = "/home/LogFiles"

var logFile *os.File
var logCounter int
var dogstatsdClient *statsd.Client

func handler(w http.ResponseWriter, r *http.Request) {
   log.Println("Hello Datadog!")
   span := tracer.StartSpan("maincontainer", tracer.ResourceName("/handler"))
   defer span.Finish()
   logCounter++
   writeLogsToFile(fmt.Sprintf("received request %d", logCounter), span.Context())
   dogstatsdClient.Incr("request.count", []string{}, 1)
   fmt.Fprintf(w, "💜 Hello Datadog! 💜")
}

func writeLogsToFile(log_msg string, context ddtrace.SpanContext) {
   span := tracer.StartSpan(
       "writeLogToFile",
       tracer.ResourceName("/writeLogsToFile"),
       tracer.ChildOf(context))
   defer span.Finish()
   _, err := logFile.WriteString(log_msg + "\n")
   if err != nil {
       log.Println("Error writing to log file:", err)
   }
}

func main() {
   log.Print("Main container started...")

   err := os.MkdirAll(logDir, 0755)
   if err != nil {
       panic(err)
   }

   logFilePath := filepath.Join(logDir, fmt.Sprintf("app-%s.log", os.Getenv("COMPUTERNAME")))
   log.Println("Saving logs in ", logFilePath)
   logFileLocal, err := os.OpenFile(logFilePath, os.O_WRONLY|os.O_APPEND|os.O_CREATE, 0644)
   if err != nil {
       panic(err)
   }
   defer logFileLocal.Close()

   logFile = logFileLocal

   dogstatsdClient, err = statsd.New("localhost:8125")
   if err != nil {
       panic(err)
   }
   defer dogstatsdClient.Close()

   tracer.Start()
   defer tracer.Stop()

   http.HandleFunc("/", handler)
   log.Fatal(http.ListenAndServe(":8080", nil))
}

```
{{% /tab %}}
{{% tab "PHP" %}}
```php
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Formatter\JsonFormatter;

$statsd = new DogStatsd(
   array('host' => '127.0.0.1',
         'port' => 8125,
    )
 );

$log = new logger('datadog');
$formatter = new JsonFormatter();

$stream = new StreamHandler('/home/LogFiles/app-'.getenv("COMPUTERNAME").'.log', Logger::DEBUG);
$stream->setFormatter($formatter);

$log->pushHandler($stream);

$log->pushProcessor(function ($record) {
 $record['message'] .= sprintf(
     ' [dd.trace_id=%s dd.span_id=%s]',
     \DDTrace\logs_correlation_trace_id(),
     \dd_trace_peek_span_id()
 );
 return $record;
});

$log->info("Hello Datadog!");
echo '💜 Hello Datadog! 💜';

$log->info("sending a metric");
$statsd->increment('page.views', 1, array('environment'=>'dev'));

?>

```
{{% /tab %}}
{{< /tabs >}}

[1]: https://learn.microsoft.com/enus/azure/appservice/tutorialcustomcontainersidecar
[2]: /fr/serverless/guide/azure_app_service_linux_containers_serverless_init
[3]: https://app.datadoghq.com/integrations/azure
[4]: /fr/profiler/