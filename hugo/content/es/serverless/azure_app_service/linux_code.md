---
aliases:
- /es/serverless/azure_app_services/azure_app_services_linux
further_reading:
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: Blog
  text: Haga un seguimiento de sus aplicaciones web de Linux en Azure App Service
    con Datadog
title: Azure App Service - Código de Linux
---
## Descripción general {#overview}

Esta página describe cómo instrumentar su aplicación de Azure App Service para Linux con el Datadog Agent. El procedimiento en esta página utiliza un contenedor sidecar y la Configuración de la aplicación para Azure App Service para Linux para instrumentar la aplicación y administrar su configuración.

Si prefiere no utilizar el enfoque de sidecar (No recomendado), puede seguir las instrucciones para [Instrumentar la implementación de código de Azure App Service - Linux con el contenedor de Datadog][1].

**Tiempos de ejecución compatibles**: Java, Node.js, .NET, PHP, Python

## Configuración {#setup}

### Integración de Azure {#azure-integration}

Si aún no lo ha hecho, instale la [integración de Datadog-Azure][10] para recopilar métricas y registros.

### Aplicación {#application}

Instale el SDK para su lenguaje:

{{< tabs >}}
{{% tab "Java" %}}

Java permite agregar código de instrumentación mediante el uso de un argumento de línea de comandos, `javaagent`.

1. Descargue la [versión más reciente del SDK de Java de Datadog][101].
1. Coloque el SDK dentro de su proyecto. Debe incluirse con su implementación.
   Si está utilizando el complemento `azure-webapp-maven`, puede agregar el SDK de Java como una entrada de recurso con el tipo `lib`.
1. Establezca la variable de entorno `JAVA_OPTS` con `--javaagent:/home/site/lib/dd-java-agent.jar`. Cuando se implemente su aplicación, el rastreador de Java se copiará en `/home/site/lib/dd-java-agent.jar`.

La instrumentación comienza cuando se inicia la aplicación.

[101]: https://dtdg.co/latest-java-tracer

{{% /tab %}}
{{% tab "Node.js" %}}

1. Instale el paquete `dd-trace`
   ```
   npm install dd-trace
   ```
2. Inicialice el trazador de Node.js con la variable de entorno `NODE_OPTIONS`:
   ```
   NODE_OPTIONS='--require dd-trace/init'
   ```

{{% /tab %}}
{{% tab ".NET" %}}

Agregue el paquete Nuget `Datadog.Trace.Bundle` a su proyecto. Consulte [la página del paquete Nuget para obtener más detalles][102].

Por ejemplo:

```shell
dotnet add package Datadog.Trace.Bundle --version 3.21.0
```

[102]: https://www.nuget.org/packages/Datadog.Trace.Bundle#readme-body-tab

{{% /tab %}}
{{% tab "PHP" %}}

Ejecute el siguiente script para instalar el SDK de PHP de Datadog:
startup.sh:

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

Este script de bash está diseñado para ejecutarse como el comando de inicio, el cual instala el módulo de rastreo en PHP y luego reinicia el servicio NGINX.

{{% /tab %}}
{{% tab "Python" %}}

1. Agregue `ddtrace` a su proyecto.
1. Modifique su comando de inicio. Su nuevo comando debe ejecutar `ddtrace-run` con su comando anterior como argumento. Es decir: si su comando de inicio es `foo`, modifíquelo para ejecutar `ddtrace-run foo`.

   Por ejemplo:
   ```ssh
   ddtrace-run gunicorn --bind=0.0.0.0 --timeout 600 quickstartproject.wsgi
   ```

{{% /tab %}}
{{< /tabs >}}

### Instrumentación {#instrumentation}

{{< tabs >}}
{{% tab "Datadog CLI" %}}

#### Localmente {#locally}

Instale la [CLI de Datadog][201]

```shell
npm install -g @datadog/datadog-ci @datadog/datadog-ci-plugin-aas
```

Instale la [CLI de Azure][202] y autentíquese con `az login`.

Luego, ejecute el siguiente comando para configurar el contenedor sidecar:

```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_SITE=<DATADOG_SITE>
datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name>
```

Establezca su sitio de Datadog en {{< region-param key="dd_site" code="true" >}}. Se establece de forma predeterminada en `datadoghq.com`.

Se pueden usar flags adicionales, como `--service` y `--env`, para establecer las etiquetas de servicio y entorno. Para obtener una lista completa de opciones, ejecute `datadog-ci aas instrument --help`.

`datadog-ci aas instrument` solo necesita ejecutarse una vez para configurar la instrumentación. No necesita volver a ejecutarlo en cada implementación de código, solo vuelva a ejecutarlo para cambiar su configuración de Datadog.

#### Azure Cloud Shell {#azure-cloud-shell}

Para usar la CLI de Datadog en [Azure Cloud Shell][203], abra un cloud shell, establezca su clave de API y sitio en las variables de entorno `DD_API_KEY` y `DD_SITE`, y use `npx` para ejecutar la CLI directamente:

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

El [módulo de Terraform de Datadog para aplicaciones web de Linux][1] envuelve el recurso [azurerm_linux_web_app][2] y configura automáticamente su aplicación web para Datadog Serverless Monitoring agregando las variables de entorno requeridas y el sidecar serverless-init.

Si aún no tiene configurado Terraform, [instale Terraform][3], cree un nuevo directorio y cree un archivo llamado `main.tf`.

Luego, agregue lo siguiente a su configuración de Terraform, actualizándolo según sea necesario según sus necesidades:

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

Finalmente, ejecute `terraform apply` y siga las instrucciones.

El [módulo de Datadog para aplicaciones web de Linux][4] solo implementa el recurso de aplicación web, por lo que debe [implementar su código][5] por separado.

[1]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/linux
[2]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/linux_web_app
[3]: https://developer.hashicorp.com/terraform/install
[4]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/linux
[5]: https://learn.microsoft.com/en-us/azure/app-service/getting-started

{{% /tab %}}
{{% tab "Bicep" %}}

Actualice su aplicación web existente para incluir la configuración de la aplicación Datadog necesaria y el sidecar, de la siguiente manera:

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

Vuelva a implementar su plantilla actualizada:

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

Consulte la pestaña [Manual](?tab=manual#instrumentation) para ver las descripciones de todas las variables de entorno.


{{% /tab %}}
{{% tab "Plantilla ARM" %}}

Actualice su aplicación web existente para incluir la configuración de la aplicación Datadog necesaria y el sidecar, de la siguiente manera:

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

Vuelva a implementar su plantilla actualizada:

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

Consulte la pestaña [Manual](?tab=manual#instrumentation) para ver las descripciones de todas las variables de entorno.

{{% /tab %}}
{{% tab "Manual" %}}

1. **Configure un contenedor sidecar para Datadog**.

   1. En Azure, navegue a {{< ui >}}Deployment{{< /ui >}} > {{< ui >}}Deployment Center{{< /ui >}}. Seleccione la pestaña {{< ui >}}Containers{{< /ui >}}.
   1. Haga clic en {{< ui >}}Add{{< /ui >}} y seleccione {{< ui >}}Custom container{{< /ui >}}.
   1. En el formulario {{< ui >}}Edit container{{< /ui >}}, proporcione lo siguiente:
      - {{< ui >}}Image source{{< /ui >}}: Otros registros de contenedores
      - {{< ui >}}Image type{{< /ui >}}: Público
      - {{< ui >}}Registry server URL{{< /ui >}}: `index.docker.io`
      - {{< ui >}}Image and tag{{< /ui >}}: `datadog/serverless-init:latest`
      - {{< ui >}}Port{{< /ui >}}: 8126
      - En {{< ui >}}Environment variables{{< /ui >}}, habilite la opción {{< ui >}}Allow access to all app settings{{< /ui >}}.

        {{< img src="serverless/azure_app_service/app_settings.png" alt="En Azure, una sección de Variables de entorno. Una opción 'Permitir acceso a todas las configuraciones de la aplicación' está habilitada con una casilla de verificación." >}}

   1. Seleccione {{< ui >}}Apply{{< /ui >}}.

2. **Configure las variables de entorno**.
   En Azure, agregue los siguientes pares clave-valor en {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Environment Variables{{< /ui >}} > {{< ui >}}App Settings{{< /ui >}}:

`DD_API_KEY`
: **Valor**: Su clave de Datadog API.<br>
Consulte [Configuración de la organización > Claves de API][301] en Datadog.<br>

`DD_SITE`
: **Valor**: {{< region-param key="dd_site" code="true" >}}<br>
Su [sitio de Datadog][302]. Se establece de forma predeterminada en `datadoghq.com`.<br>
Utilice el menú desplegable "Datadog Site" en la barra de navegación derecha de esta página para seleccionar su sitio.<br>

`DD_SERVICE`
: **Valor**: El nombre del servicio de su aplicación.<br>
El valor predeterminado es el valor del campo name en `package.json`.<br>
Consulte [Unified Service Tagging][303] para obtener más información sobre la etiqueta `service`.<br>

`DD_ENV`
: **Valor**: El nombre del entorno de su aplicación.<br>
No hay un valor predeterminado para este campo.<br>
Consulte [Unified Service Tagging][303] para obtener más información sobre la etiqueta `env`.<br>

`DD_VERSION`
: **Valor**: La versión de su aplicación.<br>
No hay un valor predeterminado para este campo.<br>
Consulte [Unified Service Tagging][303] para obtener más información sobre la etiqueta `version`.<br>

`WEBSITES_ENABLE_APP_SERVICE_STORAGE`
: **Valor**: `true`<br>
Configurar esta variable de entorno en `true` permite que el montaje `/home/` persista y se comparta con el sidecar.<br>

`DD_SERVERLESS_LOG_PATH`
: **Valor**: La ruta de registro que utiliza el sidecar para recopilar registros.<br>
Donde escribe sus registros. Por ejemplo, `/home/LogFiles/*.log` o `/home/LogFiles/myapp/*.log`.<br>

`DD_AAS_INSTANCE_LOGGING_ENABLED`
: **Valor**: false <br>
Cuando `true`, la recopilación de registros se configura automáticamente para la ruta de archivo adicional: `/home/LogFiles/*$COMPUTERNAME*.log`

`DD_AAS_INSTANCE_LOG_FILE_DESCRIPTOR`
: **Valor**: Un descriptor de archivo opcional utilizado para un seguimiento de registros más preciso.<br>
Recomendado para escenarios con rotación frecuente de registros. Por ejemplo, establecer `_default_docker` configura el seguidor de registros para ignorar los archivos rotados y centrarse solo en el archivo de registro activo de Azure.<br>

<div class="alert alert-info">Si su aplicación tiene varias instancias, asegúrese de que el nombre del archivo de registro de su aplicación incluya la <code>$COMPUTERNAME</code> variable. Esto garantiza que el seguimiento de registros no cree registros duplicados de varias instancias que leen el mismo archivo. Habilitar esta variable de función también evita que <code>DD_SERVERLESS_LOG_PATH</code> se establezca. Esto es para evitar la ingesta de registros duplicados.</div>




{{% collapse-content title=".NET: Variables de entorno adicionales requeridas" level="h4" id="dotnet-additional-settings" %}}

Para aplicaciones .NET, las siguientes variables de entorno son **requeridas**. Consulte el `Datadog.Tracer.Bundle` [archivo README del paquete NuGet][1] para obtener más detalles.

`DD_DOTNET_TRACER_HOME`
: **Valor**: `/home/site/wwwroot/datadog`<br>
Ruta al directorio que contiene el SDK de .NET de Datadog.<br>

`CORECLR_ENABLE_PROFILING`
: **Valor**: `1`<br>
Habilita las API de instrumentación en el tiempo de ejecución de .NET.<br>

`CORECLR_PROFILER`
: **Valor**: `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`<br>
Identificador para la biblioteca de instrumentación .NET de Datadog.<br>

`CORECLR_PROFILER_PATH`
: **Valor**: `/home/site/wwwroot/datadog/`<br>
`linux-x64/Datadog.Trace.ClrProfiler.Native.so` (línea única)<br>
Ruta a la biblioteca de instrumentación cargada por el tiempo de ejecución de .NET.<br>

[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle#readme-body-tab

{{% /collapse-content %}}

[301]: https://app.datadoghq.com/organization-settings/api-keys
[302]: /es/getting_started/site/
[303]: /es/getting_started/tagging/unified_service_tagging

{{% /tab %}}
{{< /tabs >}}

{{% svl-tracing-env %}}

### Ranuras de implementación {#deployment-slots}

<div class="alert alert-info">La instrumentación de ranuras de implementación está en versión preliminar. Durante la versión preliminar, la telemetría de las ranuras aparece bajo la aplicación web principal. Para distinguir entre la telemetría de la ranura y la de producción, configure <a href="/getting_started/tagging/unified_service_tagging/">unified service tagging</a> con valores distintos para cada ranura.</div>

{{% collapse-content title="Instrumentar una ranura de implementación" level="h4" %}}

Para instrumentar una [ranura de implementación][801] en lugar de la aplicación web principal, utilice uno de los siguientes métodos.

[801]: https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Usando la [CLI de Datadog][1] (v5.9.0+), añada la flag `--slot`. Utilice `--service`, `--env` y `--version` para establecer valores de unified service tagging distintos para la ranura.

Para encontrar los nombres de sus ranuras de implementación, ejecute:

```shell
az webapp deployment slot list --query '[].name' -o tsv -g <resource-group> -n <web-app>
```

```shell
datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name> \
  --slot <slot-name> \
  --service <service-name> --env <slot-env> --version <app-version>
```

Alternativamente, proporcione el ID de recurso completo de la ranura con la flag `--resource-id`:

```shell
datadog-ci aas instrument --resource-id /subscriptions/<subscription-id>/resourceGroups/<resource-group>/providers/Microsoft.Web/sites/<app-name>/slots/<slot-name> \
  --service <service-name> --env <slot-env> --version <app-version>
```

**Nota**: Cuando pasa `--env`, la CLI marca automáticamente `DD_ENV` como una configuración persistente, por lo que su etiqueta `env` persiste a través de los intercambios de ranuras.

[1]: https://github.com/DataDog/datadog-ci#how-to-install-the-cli

{{% /tab %}}
{{% tab "Terraform" %}}

Utilice el [módulo de ranura de aplicación web de Datadog para Linux][1]:

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

Ejecute `terraform apply` y siga las instrucciones.

**Nota**: Cuando `datadog_env` se establece en su módulo de aplicación web principal, el módulo marca `DD_ENV` como una configuración persistente, por lo que su etiqueta `env` persiste durante los intercambios de ranuras.

[1]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/linux-slot

{{% /tab %}}
{{% tab "Bicep" %}}

Actualice su plantilla para apuntar a una ranura de implementación en lugar de a la aplicación web principal:

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

Vuelva a implementar su plantilla actualizada:

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**Nota**: La configuración de la aplicación de Azure se intercambia entre ranuras de forma predeterminada. El recurso `slotConfigNames` anterior marca `DD_ENV` como persistente, por lo que su etiqueta `env` persiste durante los intercambios de ranuras.

El recurso `slotConfigNames` realiza un reemplazo completo de la lista de configuraciones persistentes. Pase cualquier configuración ya marcada como persistente en `existingStickyAppSettingNames`, o `[]` para una aplicación nueva. Cualquier nombre omitido deja de ser persistente.

{{% /tab %}}
{{% tab "Plantilla ARM" %}}

Actualice su plantilla para apuntar a una ranura de implementación en lugar de a la aplicación web principal:

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

Vuelva a implementar su plantilla actualizada:

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**Nota**: La configuración de la aplicación de Azure se intercambia entre ranuras de forma predeterminada. El recurso `slotConfigNames` anterior marca `DD_ENV` como persistente, por lo que su etiqueta `env` persiste durante los intercambios de ranuras.

El recurso `slotConfigNames` realiza un reemplazo completo de la lista de configuraciones persistentes. Pase cualquier configuración ya marcada como persistente en `existingStickyAppSettingNames`, o `[]` para una aplicación nueva. Cualquier nombre omitido deja de ser persistente.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

### Ver trazas en Datadog {#view-traces-in-datadog}

Después de que su aplicación se reinicie, vaya a la [página de servicios de APM][2] de Datadog y busque el nombre del servicio que configuró para su aplicación (`DD_SERVICE`).

### Métricas personalizadas {#custom-metrics}

Para configurar su aplicación para enviar métricas personalizadas, siga los pasos adecuados para su entorno de ejecución:

- [Java][3]
- [Node.js][4]
- [.NET][5]
- [PHP][6]
- [Python][7]

### Continuous Profiler {#continuous-profiler}

<div class="alert alert-info">
El Continuous Profiler de Datadog está disponible en versión preliminar para Python y Node.js en Linux Azure App Service.
</div>

Para habilitar el Continuous Profiler, establezca la variable de entorno `DD_PROFILING_ENABLED=true`. Para obtener más información, consulte la [documentación del Continuous Profiler][8].

## Despliegue {#deployment}

{{% aas-workflow-linux %}}

## Solución de problemas {#troubleshooting}

Si no está recibiendo trazas o datos de métricas personalizadas como se esperaba, habilite el registro de depuración del agente configurando `DD_LOG_LEVEL` en las opciones de configuración del sidecar. Para la depuración del trazador, establezca `DD_TRACE_DEBUG` en true. Esto genera registros de depuración adicionales para el sidecar y el SDK.

Asegúrese de habilitar {{< ui >}}App Service logs{{< /ui >}} para recibir registros de depuración.

{{< img src="serverless/azure_app_service/app-service-logs.png" alt="Configuración de Azure App Service: App Service logs, en la sección Monitoring de Settings en la Azure UI. La opción 'Application logging' está establecida en 'File System'." style="width:100%;" >}}

Comparta el contenido de {{< ui >}}Log stream{{< /ui >}} con [Datadog Support][9].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/serverless/guide/azure_app_service_linux_code_wrapper_script
[2]: /es/tracing/services/service_page/
[3]: /es/extend/dogstatsd/?tab=java#dogstatsd-client
[4]: https://github.com/brightcove/hot-shots
[5]: /es/extend/dogstatsd/?tab=dotnet#dogstatsd-client
[6]: /es/extend/dogstatsd/?tab=php#dogstatsd-client
[7]: /es/extend/dogstatsd/?tab=python#dogstatsd-client
[8]: /es/profiler/
[9]: /es/help
[10]: https://app.datadoghq.com/integrations/azure