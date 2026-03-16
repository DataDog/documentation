---
aliases:
- /fr/serverless/guide/azure_app_service_linux_sidecar
- /fr/serverless/azure_app_services/azure_app_services_container
further_reading:
- link: /integrations/azure_app_services/
  tag: Documentation
  text: Azure App Service
- link: /integrations/azure_app_service_environment/
  tag: Documentation
  text: Environnement Azure App Service
title: Instrumenter Azure App Service  Containers Linux
---
## Aperçu

Cette page explique comment intégrer l'agent Datadog à votre application Linux Azure App Service en conteneur.

Ce document part du principe que votre application est configurée pour les sidecars conformément au tutoriel d'Azure intitulé [Configurer un conteneur sidecar pour un conteneur personnalisé dans Azure App Service][1].

Si vous préférez ne pas utiliser l'approche « sidecar » (non recommandée), vous pouvez suivre les instructions pour [instrumenter un conteneur Linux Azure App Service avec `serverless-init`][2].

## Configuration

### Intégration Azure

Si ce n'est pas déjà fait, installez l'[intégration DatadogAzure][3] pour collecter les métriques et les journaux.

### Demande

{{< tabs >}}
{{% tab "Node.js" %}}
#### Traçage
Intégrez la`dd-trace-js`bibliothèque à votre application principale. Pour plus d'informations, consultez la section [Suivi des applications Node.js][101].

#### Indicateurs
Les métriques personnalisées sont également collectées via le traceur. Consultez les [exemples de code][102].

#### Journaux
Le sidecar Datadog utilise le suivi de fichiers pour collecter les journaux. Datadog recommande d'enregistrer les journaux d'application dans`/home/LogFiles/`  car ce répertoire est conservé même après un redémarrage.

Vous pouvez également créer un sous-répertoire, par exemple `/home/LogFiles/myapp`, si vous souhaitez mieux contrôler les données transmises à Datadog. Toutefois, si vous ne surveillez pas tous les fichiers journaux,`/home/LogFiles` les journaux d'application Azure App Service relatifs aux démarrages et aux erreurs ne seront pas collectés.

Pour configurer la journalisation dans votre application, consultez la section [Collecte des journaux Node.js][103]. Pour configurer la corrélation des journaux de trace, consultez [Corrélation des journaux et des traces Node.js][104].

[101]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#getting-started
[102]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=nodejs#code-examples
[103]: /fr/logs/log_collection/nodejs/?tab=winston30
[104]: /fr/tracing/other_telemetry/connect_logs_and_traces/nodejs
{{% /tab %}}
{{% tab "Python" %}}
#### Traçage
Intégrez la`dd-trace-py`bibliothèque à votre application principale. Consultez la section [Suivi des applications Python][201] pour obtenir des instructions.

#### Indicateurs
Les métriques personnalisées sont également collectées via le traceur. Consultez les [exemples de code][202].

#### Journaux
Le sidecar Datadog utilise le suivi de fichiers pour collecter des journaux. Datadog recommande d'enregistrer les journaux d'application dans`/home/LogFiles/`  car ce répertoire est conservé même après un redémarrage.

Vous pouvez également créer un sous-répertoire, par exemple `/home/LogFiles/myapp`, si vous souhaitez mieux contrôler les données transmises à Datadog. Toutefois, si vous ne surveillez pas tous les fichiers journaux,`/home/LogFiles` les journaux d'application Azure App Service relatifs aux démarrages et aux erreurs ne seront pas collectés.

Pour configurer la journalisation dans votre application, consultez la section [Collecte des journaux Node.js][203]. Pour configurer la corrélation des journaux de trace, consultez [Corrélation des journaux et des traces Node.js][204].

[201]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[202]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=python#code-examples
[203]: /fr/logs/log_collection/python/
[204]: /fr/tracing/other_telemetry/connect_logs_and_traces/python
{{% /tab %}}
{{% tab "Java" %}}
#### Traçage
Intégrez la`dd-trace-java`bibliothèque à votre application principale. Consultez la section [Suivi des applications Java][301] pour obtenir des instructions.

#### Indicateurs
Les métriques personnalisées sont également collectées via le traceur. Consultez les [exemples de code][302].

#### Journaux
Le sidecar Datadog utilise le suivi de fichiers pour collecter les journaux. Datadog recommande d'enregistrer les journaux d'application dans`/home/LogFiles/`  car ce répertoire est conservé même après un redémarrage.

Vous pouvez également créer un sous-répertoire, par exemple `/home/LogFiles/myapp`, si vous souhaitez mieux contrôler les données transmises à Datadog. Toutefois, si vous ne surveillez pas tous les fichiers journaux,`/home/LogFiles` les journaux d'application Azure App Service relatifs aux démarrages et aux erreurs ne seront pas collectés.

Pour configurer la journalisation dans votre application, consultez la section [Collecte des journaux Node.js][303]. Pour configurer la corrélation des journaux de trace, consultez [Corrélation des journaux et des traces Node.js][304].

[301]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#getting-started
[302]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=java#code-examples
[303]: /fr/logs/log_collection/java/?tab=winston30
[304]: /fr/tracing/other_telemetry/connect_logs_and_traces/java
{{% /tab %}}
{{% tab ".NET" %}}
#### Traçage
Intégrez la`dd-trace-dotnet`bibliothèque à votre application principale.

1. Ajoutez les lignes suivantes au fichier Dockerfile de votre application principale. Cela permet d'installer et de configurer le traceur Datadog au sein du conteneur de votre application.
   {{< code-block lang="dockerfile" >}}
   RUN mkdir -p /datadog/tracer
   RUN mkdir -p /home/LogFiles/dotnet

   ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v3.30.0/datadog-dotnet-apm-3.30.0.tar.gz /datadog/tracer
   RUN cd /datadog/tracer && tar -zxf datadog-dotnet-apm-3.30.0.tar.gz
   {{< /code-block >}}

2. Créez l'image et publiez-la dans votre registre de conteneurs préféré.

**Exemple complet de fichier Dockerfile**

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

Pour plus d'informations, consultez la section [Tracing .NET Applications][401].

#### Indicateurs
Les métriques personnalisées sont également collectées via le traceur. Consultez les [exemples de code][402].

#### Journaux
Le sidecar Datadog utilise le suivi de fichiers pour collecter les journaux. Datadog recommande d'enregistrer les journaux d'application dans`/home/LogFiles/`  car ce répertoire est conservé même après un redémarrage.

Vous pouvez également créer un sous-répertoire, par exemple `/home/LogFiles/myapp`, si vous souhaitez mieux contrôler les données transmises à Datadog. Toutefois, si vous ne surveillez pas tous les fichiers journaux,`/home/LogFiles` les journaux d'application Azure App Service relatifs aux démarrages et aux erreurs ne seront pas collectés.

Pour configurer la journalisation dans votre application, consultez la section [Collecte des journaux en C#][403]. Pour configurer la corrélation des journaux de trace, consultez [Corrélation des journaux et des traces .NET][404].

[401]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[402]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=dotnet#code-examples
[403]: /fr/logs/log_collection/csharp
[404]: /fr/tracing/other_telemetry/connect_logs_and_traces/dotnet

{{% /tab %}}
{{% tab "Go" %}}
#### Traçage
Intégrez la`dd-trace-go`bibliothèque à votre application principale. Pour plus d'informations, consultez la section [Tracing Go applications][501].

#### Indicateurs
Les métriques personnalisées sont également collectées via le traceur. Consultez les [exemples de code][502].

#### Journaux
Le sidecar Datadog utilise le suivi de fichiers pour collecter les journaux. Datadog recommande d'enregistrer les journaux d'application dans`/home/LogFiles/`  car ce répertoire est conservé même après un redémarrage.

Vous pouvez également créer un sous-répertoire, par exemple `/home/LogFiles/myapp`, si vous souhaitez mieux contrôler les données transmises à Datadog. Toutefois, si vous ne surveillez pas tous les fichiers journaux,`/home/LogFiles` les journaux d'application Azure App Service relatifs aux démarrages et aux erreurs ne seront pas collectés.

Pour configurer la journalisation dans votre application, consultez la section [Collecte des journaux Node.js][503]. Pour configurer la corrélation des journaux de trace, consultez [Corrélation des journaux et des traces Node.js][504].

[501]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/go
[502]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=go#code-examples
[503]: /fr/logs/log_collection/go/
[504]: /fr/tracing/other_telemetry/connect_logs_and_traces/go
{{% /tab %}}
{{% tab "PHP" %}}
#### Traçage
Intégrez la`dd-trace-php`bibliothèque à votre application principale. Consultez la section [Suivi des applications PHP][601] pour obtenir des instructions.

#### Indicateurs
Les métriques personnalisées sont également collectées via le traceur. Consultez les [exemples de code][602].

#### Journaux
Le sidecar Datadog utilise le suivi de fichiers pour collecter les journaux. Datadog recommande d'enregistrer les journaux d'application dans`/home/LogFiles/`  car ce répertoire est conservé même après un redémarrage.

Vous pouvez également créer un sous-répertoire, par exemple `/home/LogFiles/myapp`, si vous souhaitez mieux contrôler les données transmises à Datadog. Toutefois, si vous ne surveillez pas tous les fichiers journaux,`/home/LogFiles` les journaux d'application Azure App Service relatifs aux démarrages et aux erreurs ne seront pas collectés.

Pour configurer la journalisation dans votre application, consultez la section [Collecte des journaux Node.js][603]. Pour configurer la corrélation des journaux de trace, consultez [Corrélation des journaux et des traces Node.js][604].

[601]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/php/#getting-started
[602]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=php#code-examples
[603]: /fr/logs/log_collection/php/
[604]: /fr/tracing/other_telemetry/connect_logs_and_traces/php
{{% /tab %}}
{{< /tabs >}}

### Instrumentation

L'instrumentation se fait à l'aide d'un conteneur sidecar. Ce conteneur « sidecar » recueille les traces, les métriques et les journaux de votre conteneur d'application principal et les transmet à Datadog.

{{< tabs >}}
{{% tab "Interface de ligne de commande Datadog" %}}

#### Au niveau local

Installez la [CLI Datadog][601]

```shell
npm install -g @datadog/datadog-ci @datadog/datadog-ci-plugin-aas
```

Installez l'[Azure CLI][602] et authentifiez-vous avec `az login`.

Ensuite, exécutez la commande suivante pour configurer le conteneur sidecar :

```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_SITE=<DATADOG_SITE>
datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name>
```

Configurez votre site Datadog pour {{< region-param key="dd_site" code="true" >}}. La valeur par défaut est `datadoghq.com`.

**Remarque :** pour les applications .NET, ajoutez `--dotnet`l'option  pour inclure les variables d'environnement supplémentaires requises par le traceur .NET, ainsi que `--musl`l'option  si votre conteneur utilise dotnet sur une image musl libc (comme Alpine Linux).

D'autres indicateurs, tels que`--service`  et `--env`, peuvent être utilisés pour définir les balises de service et d'environnement. Pour obtenir la liste complète des options, exécutez `datadog-ci aas instrument --help`.

#### Azure Cloud Shell

Pour utiliser l'interface CLI de Datadog dans [Azure Cloud Shell][603], ouvrez Cloud Shell et utilisez`npx`  pour lancer directement l'interface CLI. Définissez votre clé API et votre site dans les variables d'environnement`DD_API_KEY``DD_SITE`  et , puis exécutez l'interface CLI :
```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_SITE=<DATADOG_SITE>
npx @datadog/datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name>
```

[601]: https://github.com/DataDog/datadog-ci#how-to-install-the-cli
[602]: https://learn.microsoft.com/en-us/cli/azure/install-azure-cli
[603]: https://portal.azure.com/#cloudshell/
{{% /tab %}}
{{% tab "Terraform" %}}

<div class="alert alert-danger">Étant donné que la ressource « Azure Web App for Containers » ne prend pas directement en charge les conteneurs de site, vous devez vous attendre à des divergences dans votre configuration.</div>

Le [module Datadog Terraform pour les applications Web Linux][1] encapsule la ressource [azurerm_linux_web_app][2] et configure automatiquement votre application Web pour la surveillance sans serveur Datadog en ajoutant les variables d'environnement requises et le sidecar serverlessinit.

Si Terraform n'est pas encore installé, [installez Terraform][3], créez un nouveau répertoire et créez un fichier nommé `main.tf`.

Ajoutez ensuite ce qui suit à votre configuration Terraform, en l'adaptant si nécessaire en fonction de vos besoins :

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

Enfin, exécutez `terraform apply`, puis suivez les instructions à l'écran.

Le [module Datadog Linux Web App][1] ne déploie que la ressource Web App ; vous devez donc créer et pousser votre conteneur séparément.

[1]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/linux
[2]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/linux_web_app
[3]: https://developer.hashicorp.com/terraform/install

{{% /tab %}}
{{% tab "Biceps" %}}

Pour utiliser le sidecar avec Web Apps for Containers, vous devez définir la variable ``SITECONTAINERS`linuxFxVersion``kind`sur `app,linux,container`. Mettez à jour votre application Web existante afin d'y inclure les paramètres d'application Datadog et le sidecar nécessaires, comme suit :

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

Déployez à nouveau votre modèle mis à jour :

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

Consultez l'onglet [« ](?tab=manual#instrumentation)Manuel » pour obtenir la description de toutes les variables d'environnement.


{{% /tab %}}
{{% tab "Modèle ARM" %}}

Mettez à jour votre application Web existante afin d'y inclure les paramètres d'application Datadog et le sidecar nécessaires, comme suit :

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

Déployez à nouveau votre modèle mis à jour :

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

Consultez l'onglet [« ](?tab=manual#instrumentation)Manuel » pour obtenir la description de toutes les variables d'environnement.

{{% /tab %}}
{{% tab "Manuel" %}}

#### Conteneur à side-car

1. Dans le portail Azure, accédez au Centre** de **déploiement et sélectionnez «** Ajouter **».
2. Dans le formulaire** « Modifier** le conteneur », indiquez les informations suivantes :
    **Source de l'image** : Docker Hub ou d'autres registres
    **Type d'image** : Public
    **URL du serveur de** registre : `index.docker.io`
    **Image et balise **: `datadog/serverless-init:latest`
    **Port **: 8126
3. Cliquez **sur « Appliquer **».

#### Paramètres de l'application

Dans les paramètres de votre **application** sur Azure, définissez les variables d'environnement suivantes à la fois sur votre conteneur principal et sur le conteneur sidecar. Vous pouvez également définir ces variables dans votre conteneur principal et activer l'option «** Autoriser **l'accès à tous les paramètres de l'application ».

{{< img src="serverless/azure_app_service/app_settings.png" alt="Dans Azure, une section « Variables d'environnement ». Une option 'Allow access to all app settings' est activée avec une case à cocher." >}}

 `DD_API_KEY`: Votre [clé API Datadog][701]
 `DD_SERVICE`: Comment souhaitez-vous nommer votre service ? Par exemple, `sidecar-azure`
 `DD_ENV`: Comment souhaitez-vous nommer votre environnement ? Par exemple, `prod`
 `DD_SERVERLESS_LOG_PATH`: L'endroit où vous enregistrez vos journaux. Par exemple,`/home/LogFiles/*.log`  ou `/home/LogFiles/myapp/*.log`
 `DD_AAS_INSTANCE_LOGGING_ENABLED`: Lorsque `true`, la collecte des journaux est automatiquement configurée pour un chemin d'accès supplémentaire : `/home/LogFiles/*$COMPUTERNAME*.log`
 `DD_AAS_INSTANCE_LOG_FILE_DESCRIPTOR`: Descripteur de fichier facultatif utilisé pour un suivi plus précis de la fin d'un fichier. Recommandé pour les situations où les fichiers journaux sont régulièrement remplacés. Par exemple, le paramètre`_default_docker`  configure le log tailer pour qu'il ignore les fichiers tournés et se concentre uniquement sur le fichier journal actif d'Azure.


   <div class="alert alert-info">Si votre application comporte plusieurs instances, veillez à ce que le nom du fichier journal de votre application inclue la variable<code> </code>$COMPUTERNAME. Cela permet d'éviter que la fonction de mise à jour de la fin du fichier journal ne génère des journaux en double lorsque plusieurs instances lisent le même fichier.</div>

`WEBSITES_ENABLE_APP_SERVICE_STORAGE`
: **Valeur **: `true`<br>
En définissant cette variable d'environnement sur`true`  , le`/home/`montage est conservé et partagé avec le sidecar.<br>

<details open>
<summary>
<h4>Pour les applications .NET : variables d'environnement supplémentaires requises</h4>
</summary>

Si vous configurez la surveillance d'une application .NET, définissez les variables d'environnement** obligatoires** suivantes.

| Nom de la variable | Valeur |
|  |  |
| `DD_DOTNET_TRACER_HOME` | `/datadog/tracer` |
| `CORECLR_ENABLE_PROFILING` | `1` |
| `CORECLR_PROFILER` | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}` |
| `CORECLR_PROFILER_PATH` | `/datadog/tracer/Datadog.Trace.ClrProfiler.Native.so` |
</details>

[701]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## Exemple d'application
L'exemple suivant présente une application unique pour laquelle le traçage, les métriques et la journalisation ont été configurés.

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

[1]: https://learn.microsoft.com/en-us/azure/app-service/tutorial-custom-container-sidecar
[2]: /fr/serverless/guide/azure_app_service_linux_containers_serverless_init
[3]: https://app.datadoghq.com/integrations/azure