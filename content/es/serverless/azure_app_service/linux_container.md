---
aliases:
- /es/serverless/guide/azure_app_service_linux_sidecar
- /es/serverless/azure_app_services/azure_app_services_container
further_reading:
- link: /integrations/azure_app_services/
  tag: Documentation
  text: Azure App Service
- link: /integrations/azure_app_service_environment/
  tag: Documentation
  text: Entorno de Azure App Service
title: Instrumentar Azure App Service - Contenedores de Linux
---
## Visión general

Esta página describe cómo instrumentar su aplicación de Azure App Service en contenedores de Linux con el Agente de Datadog.

Este documento asume que su aplicación está configurada para sidecars de acuerdo con el tutorial de Azure [Configurar un contenedor sidecar para contenedor personalizado en Azure App Service][1].

Si prefiere no usar el enfoque de sidecar (no recomendado), puede seguir las instrucciones para [Instrumentar Azure App Service - Contenedor de Linux con `serverless-init`][2].

## Configuración

### Integración de Azure

Si aún no lo ha hecho, instale la [integración de Datadog-Azure][3] para recopilar métricas y registros.

### Aplicación

{{< tabs >}}
{{% tab "Node.js" %}}
#### Trazado
Instrumente su aplicación principal con la biblioteca `dd-trace-js`. Consulte [Trazado de aplicaciones Node.js][101] para obtener instrucciones.

#### Métricas
Las métricas personalizadas también se recopilan a través del trazador. Consulte los [ejemplos de código][102].

#### Registros
El sidecar de Datadog utiliza el seguimiento de las últimas líneas de archivos para recopilar registros. Datadog recomienda escribir los registros de la aplicación en `/home/LogFiles/` porque este directorio se conserva entre reinicios.

También puede crear un subdirectorio, como `/home/LogFiles/myapp`, si desea tener más control sobre lo que se envía a Datadog. Sin embargo, si no realiza el seguimiento de las últimas líneas de todos los archivos de registro en `/home/LogFiles`, entonces los registros de la aplicación de Azure App Service relacionados con inicios y errores no se recopilan.

Para configurar el registro en su aplicación, consulte [Colección de Registros de Node.js][103]. Para configurar la correlación de registros de trazas, consulte [Correlacionando Registros y Trazas de Node.js][104].

[101]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#getting-started
[102]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=nodejs#code-examples
[103]: /es/logs/log_collection/nodejs/?tab=winston30
[104]: /es/tracing/other_telemetry/connect_logs_and_traces/nodejs
{{% /tab %}}
{{% tab "Python" %}}
#### Trazado
Instrumente su aplicación principal con la biblioteca `dd-trace-py`. Consulte [Trazando aplicaciones de Python][201] para obtener instrucciones.

#### Métricas
Las métricas personalizadas también se recopilan a través del trazador. Consulte los [ejemplos de código][202].

#### Registros
El sidecar de Datadog utiliza el seguimiento de las últimas líneas de archivos para recopilar registros. Datadog recomienda escribir los registros de la aplicación en `/home/LogFiles/` porque este directorio se conserva entre reinicios.

También puede crear un subdirectorio, como `/home/LogFiles/myapp`, si desea tener más control sobre lo que se envía a Datadog. Sin embargo, si no realiza el seguimiento de las últimas líneas de todos los archivos de registro en `/home/LogFiles`, entonces los registros de la aplicación de Azure App Service relacionados con inicios y errores no se recopilan.

Para configurar el registro en su aplicación, consulte [Colección de Registros de Node.js][203]. Para configurar la correlación de registros de trazas, consulta [Correlacionando Registros y Trazas de Node.js][204].

[201]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[202]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=python#code-examples
[203]: /es/logs/log_collection/python/
[204]: /es/tracing/other_telemetry/connect_logs_and_traces/python
{{% /tab %}}
{{% tab "Java" %}}
#### Trazas
Instrumente su aplicación principal con la biblioteca `dd-trace-java`. Consulte [Trazas en aplicaciones Java][301] para obtener instrucciones.

#### Métricas
Las métricas personalizadas también se recopilan a través del trazador. Consulte los [ejemplos de código][302].

#### Registros
El sidecar de Datadog utiliza el seguimiento de las últimas líneas de archivos para recopilar registros. Datadog recomienda escribir los registros de la aplicación en `/home/LogFiles/` porque este directorio se conserva entre reinicios.

También puede crear un subdirectorio, como `/home/LogFiles/myapp`, si desea tener más control sobre lo que se envía a Datadog. Sin embargo, si no realiza el seguimiento de las últimas líneas de todos los archivos de registro en `/home/LogFiles`, entonces los registros de la aplicación de Azure App Service relacionados con inicios y errores no se recopilan.

Para configurar el registro en su aplicación, consulte [Colección de Registros de Node.js][303]. Para configurar la correlación de registros de trazas, consulte [Correlacionando registros y trazas de Node.js][304].

[301]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#getting-started
[302]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=java#code-examples
[303]: /es/logs/log_collection/java/?tab=winston30
[304]: /es/tracing/other_telemetry/connect_logs_and_traces/java
{{% /tab %}}
{{% tab ".NET" %}}
#### Trazas
Instrumente su aplicación principal con la biblioteca `dd-trace-dotnet`.

1. Agregue las siguientes líneas al Dockerfile de su aplicación principal. Esto instala y configura el rastreador de Datadog dentro de su contenedor de aplicación.
   {{< code-block lang="dockerfile" >}}
   RUN mkdir -p /datadog/tracer
   RUN mkdir -p /home/LogFiles/dotnet

   ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v3.30.0/datadog-dotnet-apm-3.30.0.tar.gz /datadog/tracer
   RUN cd /datadog/tracer && tar -zxf datadog-dotnet-apm-3.30.0.tar.gz
   {{< /code-block >}}

2. Construya la imagen y súbala a su registro de contenedores preferido.

**Ejemplo completo de Dockerfile**

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

Para más información, consulte [Trazando aplicaciones .NET][401].

#### Métricas
Las métricas personalizadas también se recopilan a través del trazador. Consulte los [ejemplos de código][402].

#### Registros
El sidecar de Datadog utiliza el seguimiento de las últimas líneas de archivos para recopilar registros. Datadog recomienda escribir los registros de la aplicación en `/home/LogFiles/` porque este directorio se conserva entre reinicios.

También puede crear un subdirectorio, como `/home/LogFiles/myapp`, si desea tener más control sobre lo que se envía a Datadog. Sin embargo, si no realiza el seguimiento de las últimas líneas de todos los archivos de registro en `/home/LogFiles`, entonces los registros de la aplicación de Azure App Service relacionados con inicios y errores no se recopilan.

Para configurar el registro en su aplicación, consulte [Colección de registros de C#][403]. Para configurar la correlación de registros de trazas, consulte [Correlacionando registros y trazas de .NET][404].

[401]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[402]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=dotnet#code-examples
[403]: /es/logs/log_collection/csharp
[404]: /es/tracing/other_telemetry/connect_logs_and_traces/dotnet

{{% /tab %}}
{{% tab "Go" %}}
#### Trazado
Instrumente su aplicación principal con la biblioteca `dd-trace-go`. Consulte [Trazando aplicaciones Go][501] para obtener instrucciones.

#### Métricas
Las métricas personalizadas también se recopilan a través del trazador. Consulte los [ejemplos de código][502].

#### Registros
El sidecar de Datadog utiliza el seguimiento de las últimas líneas de archivos para recopilar registros. Datadog recomienda escribir los registros de la aplicación en `/home/LogFiles/` porque este directorio se conserva entre reinicios.

También puede crear un subdirectorio, como `/home/LogFiles/myapp`, si desea tener más control sobre lo que se envía a Datadog. Sin embargo, si no realiza el seguimiento de las últimas líneas de todos los archivos de registro en `/home/LogFiles`, entonces los registros de la aplicación de Azure App Service relacionados con inicios y errores no se recopilan.

Para configurar el registro en su aplicación, consulte [Colección de Registros de Node.js][503]. Para configurar la correlación de registros de trazas, consulte [Correlacionando Registros y Trazas de Node.js][504].

[501]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/go
[502]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=go#code-examples
[503]: /es/logs/log_collection/go/
[504]: /es/tracing/other_telemetry/connect_logs_and_traces/go
{{% /tab %}}
{{% tab "PHP" %}}
#### Trazado
Instrumente su aplicación principal con la biblioteca `dd-trace-php`. Consulte [Trazando aplicaciones PHP][601] para obtener instrucciones.

#### Métricas
Las métricas personalizadas también se recopilan a través del trazador. Consulte los [ejemplos de código][602].

#### Registros
El sidecar de Datadog utiliza el seguimiento de las últimas líneas de archivos para recopilar registros. Datadog recomienda escribir los registros de la aplicación en `/home/LogFiles/` porque este directorio se conserva entre reinicios.

También puede crear un subdirectorio, como `/home/LogFiles/myapp`, si desea tener más control sobre lo que se envía a Datadog. Sin embargo, si no realiza el seguimiento de las últimas líneas de todos los archivos de registro en `/home/LogFiles`, entonces los registros de la aplicación de Azure App Service relacionados con inicios y errores no se recopilan.

Para configurar el registro en su aplicación, consulte [Colección de Registros de Node.js][603]. Para configurar la correlación de registros de trazas, consulte [Correlacionando Registros y Trazas de Node.js][604].

[601]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/php/#getting-started
[602]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=php#code-examples
[603]: /es/logs/log_collection/php/
[604]: /es/tracing/other_telemetry/connect_logs_and_traces/php
{{% /tab %}}
{{< /tabs >}}

### Instrumentación

La instrumentación se realiza utilizando un contenedor sidecar. Este contenedor sidecar recopila trazas, métricas y registros de su contenedor de aplicación principal y los envía a Datadog.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

#### Localmente

Instale el [Datadog CLI][601]

```shell
npm install -g @datadog/datadog-ci @datadog/datadog-ci-plugin-aas
```

Instale el [Azure CLI][602] y autentíquese con `az login`.

Luego, ejecute el siguiente comando para configurar el contenedor sidecar:

```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_SITE=<DATADOG_SITE>
datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name>
```

Establezca su sitio de Datadog en {{< region-param key="dd_site" code="true" >}}. Por defecto es `datadoghq.com`.

**Nota:** Para aplicaciones .NET, agregue la bandera `--dotnet` para incluir las variables de entorno adicionales requeridas por el trazador de .NET, y adicionalmente la bandera `--musl` si su contenedor está utilizando dotnet en una imagen musl libc (como Alpine Linux).

Se pueden usar banderas adicionales, como `--service` y `--env`, para establecer las etiquetas de servicio y entorno. Para obtener una lista completa de opciones, ejecute `datadog-ci aas instrument --help`.

#### Azure Cloud Shell

Para usar la CLI de Datadog en [Azure Cloud Shell][603], abra el shell de la nube y utilice `npx` para ejecutar la CLI directamente. Establece tu clave de API y el sitio en las variables de entorno `DD_API_KEY` y `DD_SITE`, y luego ejecuta la CLI:

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

<div class="alert alert-danger">Debido a que el recurso de Azure Web App para Contenedores no admite directamente sitecontainers, debes esperar una deriva en tu configuración.</div>

El [módulo de Terraform de Datadog para Linux Web Apps][1] envuelve el recurso [azurerm_linux_web_app][2] y configura automáticamente tu Web App para Serverless Monitoring de Datadog al agregar las variables de entorno requeridas y el sidecar de serverless-init.

Si aún no tienes Terraform configurado, [instala Terraform][3], crea un nuevo directorio y haz un archivo llamado `main.tf`.

Luego, agrega lo siguiente a tu configuración de Terraform, actualizándola según sea necesario:

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

Finalmente, ejecuta `terraform apply` y sigue cualquier indicación.

El [módulo de Datadog Linux Web App][1] solo despliega el recurso de Web App, por lo que necesitas construir y subir tu contenedor por separado.

[1]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/linux
[2]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/linux_web_app
[3]: https://developer.hashicorp.com/terraform/install

{{% /tab %}}
{{% tab "Bicep" %}}

Para usar el sidecar con Web Apps para Contenedores, debes usar la `SITECONTAINERS` linuxFxVersion con `kind` configurado en `app,linux,container`. Actualiza tu Web App existente para incluir los ajustes de aplicación necesarios de Datadog y el sidecar, de la siguiente manera:

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

Redespliega tu plantilla actualizada:

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

Consulta la pestaña [Manual](?tab=manual#instrumentation) para descripciones de todas las variables de entorno.


{{% /tab %}}
{{% tab "Plantilla ARM" %}}

Actualiza tu Web App existente para incluir los ajustes de aplicación necesarios de Datadog y el sidecar, de la siguiente manera:

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

Redespliega tu plantilla actualizada:

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

Consulta la pestaña [Manual](?tab=manual#instrumentation) para descripciones de todas las variables de entorno.

{{% /tab %}}
{{% tab "Manual" %}}

#### Contenedor sidecar

1. En el Portal de Azure, ve a **Centro de Despliegue** y selecciona **Agregar**.
2. En el formulario **Editar contenedor**, proporciona lo siguiente:
   - **Fuente de imagen**: Docker Hub u otros registros
   - **Tipo de imagen**: Público
   - **URL del servidor de registro**: `index.docker.io`
   - **Imagen y etiqueta**: `datadog/serverless-init:latest`
   - **Puerto**: 8126
3. Selecciona **Aplicar**.

#### Configuraciones de la aplicación

En tus **configuraciones de la aplicación** en Azure, establece las siguientes variables de entorno en tu contenedor principal y en el contenedor sidecar. Alternativamente, establece estas variables en tu contenedor principal y habilita la opción **Permitir acceso a todas las configuraciones de la aplicación**.

{{< img src="serverless/azure_app_service/app_settings.png" alt="En Azure, una sección de Variables de Entorno. Una opción 'Permitir acceso a todas las configuraciones de la aplicación' está habilitada con una casilla de verificación." >}}

- `DD_API_KEY`: Tu [clave de API de Datadog][701]
- `DD_SERVICE`: Cómo quieres etiquetar tu servicio. Por ejemplo, `sidecar-azure`
- `DD_ENV`: Cómo quieres etiquetar tu entorno. Por ejemplo, `prod`
- `WEBSITES_ENABLE_APP_SERVICE_STORAGE`: `true`. Establecer esta variable de entorno permite que el punto de montaje `/home/` persista y se comparta con el sidecar.
- `DD_SERVERLESS_LOG_PATH`: Donde escribes tus registros. Por ejemplo, `/home/LogFiles/*.log` o `/home/LogFiles/myapp/*.log`
- `DD_AAS_INSTANCE_LOGGING_ENABLED`: Cuando `true`, la recolección de registros se configura automáticamente para una ruta de archivo adicional: `/home/LogFiles/*$COMPUTERNAME*.log`
- `DD_AAS_INSTANCE_LOG_FILE_DESCRIPTOR`: Un descriptor de archivo opcional utilizado para un seguimiento de las últimas líneas de archivos más preciso. Recomendado para escenarios con rotación frecuente de registros. Por ejemplo, configurar `_default_docker` configura el seguimiento de las últimas líneas de registros para ignorar archivos rotados y enfocarse solo en el archivo de registro activo de Azure.


   <div class="alert alert-info">Si tu aplicación tiene múltiples instancias, asegúrate de que el nombre del archivo de registro de tu aplicación incluya la variable <code>$COMPUTERNAME</code>. Esto asegura que el seguimiento de registros no genere registros duplicados de múltiples instancias leyendo el mismo archivo.</div>

<details open>
<summary>
<h4>Para aplicaciones .NET: Variables de entorno adicionales requeridas</h4>
</summary>

Si estás configurando monitoreo para una aplicación .NET, configura las siguientes variables de entorno **requeridas**.

| Nombre de la variable | Valor |
| ------------- | ----- |
| `DD_DOTNET_TRACER_HOME` | `/datadog/tracer` |
| `CORECLR_ENABLE_PROFILING` | `1` |
| `CORECLR_PROFILER` | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}` |
| `CORECLR_PROFILER_PATH` | `/datadog/tracer/Datadog.Trace.ClrProfiler.Native.so` |
</details>

[701]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

{{% svl-tracing-env %}}

## Perfilado

<div class="alert alert-info">
El Perfilador Continuo de Datadog está disponible en vista previa para Python y Node.js en Linux Azure App Service.
</div>

Para habilitar el [Perfilador Continuo][4], establece la variable de entorno `DD_PROFILING_ENABLED=true` en el contenedor de tu aplicación.

## Aplicación de ejemplo
El siguiente ejemplo contiene una sola aplicación con seguimiento, métricas y registros configurados.

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
[2]: /es/serverless/guide/azure_app_service_linux_containers_serverless_init
[3]: https://app.datadoghq.com/integrations/azure
[4]: /es/profiler/