---
aliases:
- /es/infrastructure/serverless/azure_app_services/
- /es/serverless/azure_app_services/azure_app_services_windows
further_reading:
- link: /integrations/guide/azure-native-integration/
  tag: Documentación
  text: Guía de integración nativa de Azure
- link: https://www.datadoghq.com/blog/azure-app-service-extension/
  tag: Blog
  text: Hacer un seguimiento de las aplicaciones web .NET con la extensión de Datadog
    para Azure App Service
- link: https://www.datadoghq.com/pricing/?product=apm--continuous-profiler#apm--continuous-profiler-what-is-considered-as-a-host-for-azure-app-services
  tag: Precios
  text: Precios de APM de Azure App Service
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: Blog
  text: Implementar aplicaciones ASP.NET Core en Azure App Service
- link: /serverless/azure_functions/dotnet_extension/
  tag: Documentación
  text: Extensión de APM de .NET para Azure Functions
title: Azure App Service - Código de Windows
---
## Descripción general {#overview}

La extensión de Datadog para Azure App Service proporciona capacidades de monitoreo además de la [integración de Datadog-Azure][5], que proporciona métricas y registros.

- Traza APM totalmente distribuido mediante instrumentación automática.
- Vistas de servicio y de traza de APM personalizadas que muestran métricas y metadatos relevantes de Azure App Service.
- Soporte para instrumentación APM manual para personalizar los spans.
- `Trace_ID` inyección en los registros de la aplicación.
- Soporte para enviar métricas personalizadas mediante [DogStatsD][1].

<div class="alert alert-info">
La extensión admite lo siguiente:
<ul>
  <li>App Service Web Apps: compatible con los entornos de ejecución de .NET, Java y Node.js en planes Basic, Standard y Premium.</li>
  <li>Azure Functions: compatible solo con el entorno de ejecución de .NET en planes Dedicated (App Service) o Premium. <a href="/serverless/azure_functions/dotnet_extension/">Consulte la configuración específica y la solución de problemas para la extensión de Windows en Azure Functions</a></li>
</ul>

Para cualquier Azure Functions que no sea .NET o configuraciones de .NET en un plan que no sea Dedicated/Premium, debe usar la <a href="/serverless/azure_functions">Serverless Compatibility Layer</a>.

<strong>¿Le interesa el soporte para otros tipos de recursos o entornos de ejecución de App Service?</strong> <a href="https://forms.gle/n4nQcxEyLqDBMCDA7">Regístrese</a> para recibir una notificación cuando haya una versión preliminar disponible.</div>

### Entornos de ejecución admitidos {#supported-runtimes}

Las extensiones de APM de Datadog para .NET, Java y Node.js admiten los siguientes entornos de ejecución:

| Marco de trabajo | Entornos de ejecución admitidos |
| --------- | ------------------ |
| .NET      | `ASPNET:V3.5`, `ASPNET:V4.8`, `dotnet:8`, `dotnet:9`, `dotnet:10`  |
| Java      | `JAVA:8`, `JAVA:11`, `JAVA:17`, `JAVA:21`, `TOMCAT:9.0-java8`, `TOMCAT:9.0-java11`, `TOMCAT:9.0-java17`, `TOMCAT:9.0-java21`, `TOMCAT:10.1-java8`, `TOMCAT:10.1-java11`, `TOMCAT:10.1-java17`, `TOMCAT:10.1-java21`, `TOMCAT:11.0-java8`, `TOMCAT:11.0-java11`, `TOMCAT:11.0-java17`, `TOMCAT:11.0-java21` |
| Node.js   | `NODE:20LTS`, `NODE:22LTS` |

### Notas específicas de la extensión {#extension-specific-notes}

{{< tabs >}}
{{% tab ".NET" %}}

La instrumentación automática de Datadog depende de la API de perfilado de .NET CLR. Esta API permite solo un suscriptor (por ejemplo, el rastreador .NET de Datadog con el perfilador habilitado). Para garantizar la máxima visibilidad, ejecute solo una solución de APM dentro de su entorno de aplicación.

Además, si está utilizando la integración de Azure Native, puede usar el recurso de Datadog en Azure para agregar la extensión a sus aplicaciones .NET. Para obtener instrucciones, consulte la [sección de extensión de App Service][1] de la [guía de integración de Azure Native][2] de Datadog.

[1]: /es/integrations/guide/azure-native-integration/#app-service-extension
[2]: /es/integrations/guide/azure-native-integration/

{{% /tab %}}
{{% tab "Java" %}}
El soporte para aplicaciones web Java está en versión preliminar para la extensión v2.4+.

No hay implicaciones de facturación para la traza de aplicaciones web Java durante este período.

{{% /tab %}}
{{< /tabs >}}

## Instalación {#installation}

Datadog recomienda realizar actualizaciones periódicas a la versión más reciente de la extensión para garantizar un rendimiento, estabilidad y disponibilidad de funciones óptimos. Tenga en cuenta que tanto la instalación inicial como las actualizaciones posteriores requieren que su aplicación web esté completamente detenida para instalarse o actualizarse correctamente.

Si aún no lo ha hecho, configure la [integración de Datadog-Azure][3]. Puede verificar que su integración de Azure esté configurada correctamente asegurándose de ver las métricas `azure.app_services.count` o `azure.functions.count` en Datadog.

<div class="alert alert-info">Este paso es fundamental para la correlación de métricas/traza y para las vistas funcionales del panel de traza, y mejora la experiencia general de utilizar Datadog con Azure App Services.
</div>

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

La CLI de Datadog inferirá automáticamente el entorno de ejecución de su aplicación e instalará la aplicación correspondiente. Si esto falla por cualquier motivo, puede anular este comportamiento especificando un tiempo de ejecución con la bandera `--windows-runtime`.

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

El [módulo de Terraform de Datadog para aplicaciones web de Windows][4] envuelve el recurso [azurerm_windows_web_app][5] y configura automáticamente su aplicación web para Datadog Serverless Monitoring agregando las variables de entorno requeridas y la extensión de aplicación web de Windows para su tiempo de ejecución.

Si aún no tiene configurado Terraform, [instale Terraform][1], cree un nuevo directorio y cree un archivo llamado `main.tf`.

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

Finalmente, ejecute `terraform apply` y siga las instrucciones.

El [módulo de Datadog para aplicaciones web de Windows][2] solo implementa el recurso y la extensión de la aplicación web, por lo que debe [implementar su código][3] por separado.

[1]: https://developer.hashicorp.com/terraform/install
[2]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/windows
[3]: https://learn.microsoft.com/en-us/azure/app-service/getting-started
[4]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/windows
[5]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/windows_web_app

{{% /tab %}}
{{% tab "Bicep" %}}

Actualice su aplicación web existente para incluir la configuración de la aplicación Datadog necesaria y la extensión, de la siguiente manera:

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

Implemente su plantilla actualizada:

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**Nota**: Deberá detener e iniciar la aplicación manualmente (o mediante un script); de lo contrario, la traza automática no funcionará. Para las actualizaciones, debe asegurarse de que la aplicación esté detenida antes de implementar la plantilla y que se inicie nuevamente una vez finalizada la implementación.

Consulte la pestaña [{{< ui >}}Manual{{< /ui >}}](?tab=manual#instrumentation) para ver las descripciones de todas las variables de entorno.


{{% /tab %}}
{{% tab "Plantilla ARM" %}}

Actualice su aplicación web existente para incluir la configuración de la aplicación Datadog necesaria y el sidecar, de la siguiente manera:

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

Implemente su plantilla actualizada:

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**Nota**: Deberá detener e iniciar la aplicación manualmente (o mediante un script); de lo contrario, la traza automática no funcionará. Para las actualizaciones, debe asegurarse de que la aplicación esté detenida antes de implementar la plantilla y que se inicie nuevamente una vez finalizada la implementación.

Consulte la pestaña [{{< ui >}}Manual{{< /ui >}}](?tab=manual#instrumentation) para ver las descripciones de todas las variables de entorno.

{{% /tab %}}
{{% tab "Manual" %}}

1. En su [Azure Portal][1], navegue al panel de la aplicación de Azure que desea instrumentar con Datadog.

2. Configure la siguiente configuración de la aplicación:

   **Variables de entorno requeridas**

   `DD_API_KEY`
   : **Valor**: Su clave de Datadog API.<br>
   Consulte [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}API Keys{{< /ui >}}][2] en Datadog.<br>

   `DD_SITE`
   : **Valor**: Su sitio de Datadog<br>
   Su [sitio de Datadog][3]. Se establece de forma predeterminada en `datadoghq.com`.<br>

   **Unified Service Tagging**

   Datadog recomienda etiquetar su aplicación con las etiquetas `env`, `service` y `version` para el [unified service tagging][4].

   `DD_SERVICE`
   : **Valor**: El nombre del servicio de su aplicación.<br>

   `DD_ENV`
   : **Valor**: El nombre del entorno de su aplicación.<br>
   No hay un valor predeterminado para este campo.<br>

   `DD_VERSION`
   : **Valor**: La versión de su aplicación.<br>
   No hay un valor predeterminado para este campo.<br>

   **Variables de entorno adicionales**

   `DD_LOGS_INJECTION`
   : **Valor**: `true` (recomendado)<br>
   Habilita la correlación de registros de traza al inyectar IDs de traza en los registros de su aplicación.<br>
   Esto le permite correlacionar registros con traza en la interfaz de usuario de Datadog.<br>

3. Haga clic en {{< ui >}}Save{{< /ui >}}. Esto reinicia su aplicación.

4. Detenga su aplicación haciendo clic en {{< ui >}}Stop{{< /ui >}}.
   <div class="alert alert-danger">Usted <u>debe</u> detener su aplicación para instalar Datadog correctamente.</div>

5. En su Portal de Azure, navegue a la página {{< ui >}}Extensions{{< /ui >}} y seleccione la extensión de Datadog APM.

   {{< img src="infrastructure/serverless/azure_app_services/choose_extension.png" alt="Ejemplo de la página de Extensiones en el portal de Azure, mostrando la extensión de Datadog APM para .NET." style="width:100%;" >}}

6. Acepte los términos legales, haga clic en {{< ui >}}OK{{< /ui >}} y espere a que se complete la instalación.
   <div class="alert alert-danger">Este paso requiere que su aplicación esté en un estado detenido.</div>

7.  Inicie la aplicación principal, haga clic en {{< ui >}}Start{{< /ui >}}:

    {{< img src="infrastructure/serverless/azure_app_services/start.png" alt="Botón iniciar Azure" style="width:100%;" >}}

8.  Verifique que la extensión esté instalada y en ejecución comprobando la página {{< ui >}}Extensions{{< /ui >}} en su Portal de Azure.

<div class="alert alert-info">Para evitar el tiempo de inactividad, utilice <a href="https://learn.microsoft.com/en-us/azure/app-service/deploy-best-practices#use-deployment-slots">ranuras de implementación</a>. Puede crear un flujo de trabajo que utilice la <a href="https://github.com/marketplace/actions/azure-cli-action">GitHub Action para Azure CLI</a>. Consulte el <a href="/resources/yaml/serverless/aas-workflow-windows.yaml">flujo de trabajo de GitHub</a> de ejemplo.</div>

[1]: https://portal.azure.com/
[2]: /es/account_management/api-app-keys/
[3]: /es/getting_started/site/
[4]: /es/getting_started/tagging/unified_service_tagging

{{% /tab %}}
{{< /tabs >}}

{{% svl-tracing-env %}}

### Ranuras de implementación {#deployment-slots}

<div class="alert alert-info">La instrumentación de ranuras de implementación está en versión preliminar. Durante la versión preliminar, la telemetría de las ranuras aparece bajo la aplicación web principal. Para distinguir entre la telemetría de la ranura y la de producción, configure <a href="/getting_started/tagging/unified_service_tagging/">unified service tagging</a> con valores distintos para cada ranura.</div>

{{% collapse-content title="Instrumentar una ranura de implementación" level="h4" %}}

Para instrumentar una [ranura de implementación][101] en lugar de la aplicación web principal, utilice uno de los siguientes métodos.

[101]: https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots

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

Utilice el [módulo de ranura de aplicación web de Datadog para Windows][1]:

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

Ejecute `terraform apply` y siga las instrucciones.

**Nota**: Cuando `datadog_env` se establece en su módulo de aplicación web principal, el módulo marca `DD_ENV` como una configuración persistente, por lo que su etiqueta `env` persiste durante los intercambios de ranuras.

[1]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/windows-slot

{{% /tab %}}
{{% tab "Bicep" %}}

Actualice su plantilla para apuntar a una ranura de implementación en lugar de a la aplicación web principal:

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

Implemente su plantilla actualizada:

```shell
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**Nota**: Debe detener e iniciar la ranura (no la aplicación principal) para que la extensión surta efecto.

**Nota**: La configuración de la aplicación de Azure se intercambia entre ranuras de forma predeterminada. El recurso `slotConfigNames` anterior marca `DD_ENV` como persistente, por lo que su etiqueta `env` persiste durante los intercambios de ranuras.

El recurso `slotConfigNames` realiza un reemplazo completo de la lista de configuraciones persistentes. Pase cualquier configuración ya marcada como persistente en `existingStickyAppSettingNames`, o `[]` para una aplicación nueva. Cualquier nombre omitido deja de ser persistente.

{{% /tab %}}
{{% tab "Plantilla ARM" %}}

Actualice su plantilla para apuntar a una ranura de implementación en lugar de a la aplicación web principal:

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

Implemente su plantilla actualizada:

```bash
az deployment group create --resource-group <RESOURCE GROUP> --template-file <TEMPLATE FILE>
```

**Nota**: Debe detener e iniciar la ranura (no la aplicación principal) para que la extensión surta efecto.

**Nota**: La configuración de la aplicación de Azure se intercambia entre ranuras de forma predeterminada. El recurso `slotConfigNames` anterior marca `DD_ENV` como persistente, por lo que su etiqueta `env` persiste durante los intercambios de ranuras.

El recurso `slotConfigNames` realiza un reemplazo completo de la lista de configuraciones persistentes. Pase cualquier configuración ya marcada como persistente en `existingStickyAppSettingNames`, o `[]` para una aplicación nueva. Cualquier nombre omitido deja de ser persistente.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

<div class="alert alert-info">¿Utiliza Azure Functions? Consulte <a href="/serverless/azure_functions/dotnet_extension/">Azure Functions .NET APM Extension</a> para obtener instrucciones de instalación específicas para Function App, incluida la guía sobre cómo evitar errores de bloqueo de archivos durante la instalación de la extensión.</div>

## Métricas personalizadas {#custom-metrics}

La extensión de Azure App Service incluye una instancia de [DogStatsD][1], el servicio de agregación de métricas de Datadog. Esto le permite enviar métricas personalizadas, comprobaciones de servicio y eventos directamente a Datadog desde Azure Web Apps y Functions con la extensión.

La escritura de métricas personalizadas y comprobaciones en Azure App Service es similar al proceso para hacerlo con una aplicación en un servidor que ejecuta el Datadog Agent. **A diferencia de** el [proceso de configuración estándar de DogStatsD][1], no es necesario establecer puertos o un nombre de servidor al inicializar la configuración de DogStatsD. Existen variables de entorno ambientales en Azure App Service que determinan cómo se envían las métricas (requiere la versión 6.0.0+ del cliente de DogStatsD).

Para enviar métricas personalizadas a Datadog desde Azure App Service mediante la extensión:

{{< tabs >}}
{{% tab ".NET" %}}

{{% aas-custom-metrics-dotnet %}}

{{% /tab %}}
{{% tab "Java" %}}

1. Agregue el [cliente de DogStatsD](https://search.maven.org/artifact/com.datadoghq/java-dogstatsd-client) a su proyecto.
2. Inicialice DogStatsD y escriba métricas personalizadas en su aplicación.
3. Implemente su código en una aplicación web de Azure compatible.
4. Si aún no lo ha hecho, instale la extensión de Datadog App Service.

Para enviar métricas, use este código:

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

1. [Inicialice DogStatsD y escriba métricas personalizadas][1] en su aplicación.
2. Implemente su código en una Azure Web App compatible.
3. Si aún no lo ha hecho, instale la extensión de Node.js de Azure App Service de Datadog.

<div class="alert alert-info">No necesita instalar un cliente de DogStatsD para Node.js, ya que está incluido en el rastreador de Node.js (<code>dd-trace</code>) empaquetado en la extensión de Azure App Service.</div>

Para enviar métricas, use este código:

```javascript
const tracer = require('dd-trace');
tracer.init();

tracer.dogstatsd.increment('example_metric.increment', 1, { environment: 'dev' });
tracer.dogstatsd.decrement('example_metric.decrement', 1, { environment: 'dev' });
```

<div class="alert alert-info">El rastreador de Node.js de Datadog, <code>dd-trace</code>, está incluido en la extensión de Azure App Service. Se añade automáticamente a la <code>NODE_PATH</code>.<br/><br/> <strong>No necesita agregar</strong> <code>dd-trace</code> <strong>como dependencia en</strong> <code>package.json</code>. Agregar explícitamente <code>dd-trace</code> como dependencia puede anular la versión proporcionada por la extensión. Para pruebas locales, consulte las <a href="https://github.com/DataDog/datadog-aas-extension/releases">notas de la versión</a> para encontrar la versión adecuada del rastreador de Node.js para su versión de la extensión de Azure App Service.</div>

[1]: /es/extend/dogstatsd/

{{% /tab %}}
{{< /tabs >}}

**Nota**: Para enviar solo métricas personalizadas (mientras deshabilita el rastreo), establezca las siguientes variables en la configuración de su aplicación:
  - Establecer `DD_TRACE_ENABLED` en `false`.
  - Establecer `DD_AAS_ENABLE_CUSTOM_METRICS` en `true`.

Más información sobre [métricas personalizadas][2].

## Registro {#logging}

### Registro de aplicaciones {#application-logging}

{{< tabs >}}
{{% tab ".NET" %}}

{{% aas-logging-dotnet %}}

{{% /tab %}}
{{% tab "Java" %}}

El envío de registros desde su aplicación en Azure App Service a Datadog requiere transmitir los registros a Datadog directamente desde su aplicación. El envío de registros con este método permite la inyección de ID de traza, lo que hace posible conectar registros y trazas en Datadog.

{{% /tab %}}
{{% tab "Node.js" %}}

El envío de registros desde su aplicación en Azure App Service a Datadog requiere transmitir los registros a Datadog directamente desde su aplicación. El envío de registros con este método permite la inyección de ID de traza, lo que hace posible conectar registros y trazas en Datadog.

{{% /tab %}}
{{< /tabs >}}

<br/>

### Variables de entorno para el registro {#environment-variables-for-logging}

Configure estas variables de entorno en la Configuración de la aplicación de Azure App Service para una recopilación de registros óptima:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DD_SERVICE` | El nombre del servicio de su aplicación | `my-web-app` |
| `DD_ENV` | El entorno de su aplicación | `production`, `staging`, `development` |
| `DD_LOGS_INJECTION` | Habilitar la correlación de registros de traza | `true` |

### Prácticas recomendadas de registro {#logging-best-practices}

- **Habilitar la correlación de traza**: Establezca `DD_LOGS_INJECTION=true` para correlacionar registros con trazas
- **Establecer nombres de servicio adecuados**: Use `DD_SERVICE` para asegurarse de que los registros aparezcan con el nombre de servicio correcto
- **Usar registro estructurado**: Implemente el registro estructurado en su aplicación para un mejor parseo de registros

**Nota**: La inyección de ID de traza ocurre dentro de su aplicación. Los registros de recursos de Azure son generados por Azure en el plano de administración y, por lo tanto, no incluyen el ID de traza.

{{< tabs >}}
{{% tab ".NET" %}}

**Ejemplo de código: Registro nativo de Microsoft**

Un ejemplo de cómo configurar el registro en una aplicación .NET usando Microsoft.Extensions.Logging:

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

**Configuración de Program.cs**

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

**configuración de appsettings.json**

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

Esta configuración incluye automáticamente la correlación de traza cuando `DD_LOGS_INJECTION=true` se establece en la Configuración de la aplicación de Azure App Service.

{{% /tab %}}
{{% tab "Java" %}}

Consulte [Stream logs directly to the Agent][1] para configurar el registro de aplicaciones para Java en Azure App Service.

## [1]: /logs/log_collection/java/ stream-logs-directly-to-the-agent
{{% /tab %}}
{{% tab "Node.js" %}}

Para configurar el registro de aplicaciones para Node.js en Azure App Service, consulte [Agentless logging with Node.js][1].

[1]: /es/logs/log_collection/nodejs/#agentless-logging

{{% /tab %}}
{{< /tabs >}}

## Administración programática {#programmatic-management}

{{< tabs >}}
{{% tab ".NET" %}}

Datadog proporciona scripts para actualizar o instalar la extensión de Azure App Service mediante PowerShell. La administración de extensiones mediante scripts le permite [actualizar extensiones de forma masiva por grupo de recursos](#powershell-resource-group) y [designar la instalación de versiones específicas de la extensión de sitio](#powershell-specific-version). También puede usar scripts para agregar la extensión mediante programación en canalizaciones de CI/CD, así como para descubrir y actualizar extensiones que ya están instaladas.

### Requisitos previos {#prerequisites}

- La [CLI de Azure](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) o [Azure Cloud Shell](https://docs.microsoft.com/en-us/azure/cloud-shell/overview).
- Azure App Service[credenciales de ámbito de usuario](https://docs.microsoft.com/en-us/azure/app-service/deploy-configure-credentials). Si aún no tiene credenciales, vaya a su [portal de Azure](https://portal.azure.com/) y acceda a su Web App o Function App. Navegue a {{< ui >}}Deployment{{< /ui >}} > {{< ui >}}Deployment Center{{< /ui >}} para crear o recuperar sus credenciales de ámbito de usuario.

### Instalación de la extensión por primera vez {#powershell-first-time}

El script de instalación agrega la versión más reciente de la extensión a una Azure Web App o Azure Function App. Esto ocurre por aplicación, en lugar de a nivel de grupo de recursos.

1. Abra Azure CLI o Azure Cloud Shell.
2. Descargue el script de instalación mediante el siguiente comando:

    ```
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/DataDog/datadog-aas-extension/master/management-scripts/extension/install-latest-extension.ps1" -OutFile "install-latest-extension.ps1"
    ```

3. Ejecute el siguiente comando, pasando los argumentos obligatorios y opcionales según sea necesario.

    ```
    .\install-latest-extension.ps1 -Username <USERNAME> -Password <PASSWORD> -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -SiteName <SITE_NAME> -DDApiKey <DATADOG_API_KEY> -DDSite <DATADOG_SITE> -DDEnv <DATADOG_ENV> -DDService <DATADOG_SERVICE> -DDVersion <DATADOG_VERSION> [-SlotName <SLOT_NAME>]
    ```

**Nota**: Los siguientes argumentos son obligatorios para el comando anterior:

- `<USERNAME>`: Su nombre de usuario de contexto de usuario de Azure.
- `<PASSWORD>`: Su contraseña de contexto de usuario de Azure.
- `<SUBSCRIPTION_ID>`: Su [ID de suscripción](https://docs.microsoft.com/en-us/azure/media-services/latest/setup-azure-subscription-how-to) de Azure.
- `<RESOURCE_GROUP_NAME>`: El nombre de su grupo de recursos de Azure.
- `<SITE_NAME>`: El nombre de su aplicación.
- `<DATADOG_API_KEY>`: Su [clave de Datadog API](https://app.datadoghq.com/organization-settings/api-keys).

Además, establezca `DATADOG_SITE` en su [sitio de Datadog][32]. `DATADOG_SITE` se establece de forma predeterminada en `datadoghq.com`. Su sitio es: {{< region-param key="dd_site" code="true" >}}.

Para apuntar a una ranura de implementación en lugar de a la aplicación principal, agregue `-SlotName <SLOT_NAME>`. En Azure Function Apps, esto también aplica automáticamente la configuración de ranura fija `WEBSITE_PRIVATE_EXTENSIONS=0` para evitar errores de instalación de la extensión. Consulte [Azure Functions .NET APM Extension](/serverless/azure_functions/dotnet_extension/) para obtener más detalles.

[32]: /es/getting_started/site/

### Actualización de la extensión para un grupo de recursos {#powershell-resource-group}

El script de actualización se aplica a todo un grupo de recursos. Este script actualiza todas las Web Apps o Function Apps que tengan la extensión instalada. Las aplicaciones de App Service que no tienen instalada la extensión de Datadog no se ven afectadas.

1. Abra Azure CLI o Azure Cloud Shell.
2. Descargue el script de actualización mediante el siguiente comando:

    ```
    $baseUri="https://raw.githubusercontent.com/DataDog/datadog-aas-extension/master/management-scripts/extension"; Invoke-WebRequest -Uri "$baseUri/update-all-site-extensions.ps1" -OutFile "update-all-site-extensions.ps1"; Invoke-WebRequest -Uri "$baseUri/install-latest-extension.ps1" -OutFile "install-latest-extension.ps1"
    ```

3. Ejecute el siguiente comando. Todos los argumentos son obligatorios.

    ```
    .\update-all-site-extensions.ps1 -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -Username <USERNAME> -Password <PASSWORD>
    ```

### Instale una versión específica de la extensión {#powershell-specific-version}

La interfaz de usuario de Azure App Service no admite la capacidad de instalar una versión específica de una extensión. Puede hacerlo con el script de instalación o actualización.

#### Instalar una versión específica en un solo recurso {#install-specific-version-on-a-single-resource}

Para instalar una versión específica en una sola instancia, siga las [instrucciones para instalar la extensión por primera vez](#powershell-first-time) y agregue el parámetro `-ExtensionVersion` al comando de instalación.

```
.\install-latest-extension.ps1 -Username <USERNAME> -Password <PASSWORD> -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -SiteName <SITE_NAME> -DDApiKey <DATADOG_API_KEY> -ExtensionVersion <EXTENSION_VERSION>
```

Reemplace `<EXTENSION_VERSION>` con la versión de la extensión que desea instalar. Por ejemplo, `1.4.0`.

#### Instalar una versión específica en todo un grupo de recursos {#install-specific-version-on-an-entire-resource-group}

Para instalar una versión específica para un grupo de recursos, siga las [instrucciones para actualizar la extensión para un grupo de recursos](#powershell-resource-group) y agregue el parámetro `-ExtensionVersion` al comando de instalación.

```
.\update-all-site-extensions.ps1 -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -Username <USERNAME> -Password <PASSWORD> -ExtensionVersion <EXTENSION_VERSION>
```

Reemplace `<EXTENSION_VERSION>` con la versión de la extensión que desea instalar. Por ejemplo, `1.4.0`.

### Plantilla ARM {#arm-template}

Muchas organizaciones utilizan [plantillas de Azure Resource Management (ARM)](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/overview) para implementar la práctica de infraestructura como código. Para integrar la extensión de App Service en estas plantillas, incorpore [plantillas de instalación de la extensión de App Service de Datadog](https://github.com/DataDog/datadog-aas-extension/tree/master/install-templates) en sus implementaciones para agregar la extensión y configurarla junto con sus recursos de App Service.

{{% /tab %}}
{{% tab "Java" %}}

<div class="alert alert-danger">La compatibilidad con aplicaciones web Java está en versión preliminar para la extensión v2.4+. La administración programática no está disponible para aplicaciones web Java.<br/><br/>
    ¿Le interesa la compatibilidad con otros tipos de recursos o entornos de ejecución de App Service? <a href="https://forms.gle/n4nQcxEyLqDBMCDA7">Regístrese</a> para recibir una notificación cuando haya una versión preliminar disponible.</div>

{{% /tab %}}
{{< /tabs >}}

## Profiling {#profiling}

<div class="alert alert-info">
El Continuous Profiler de Datadog está disponible en versión preliminar para .NET y Node.js en Windows Azure App Service.
</div>

Para habilitar el [Continuous Profiler][6], establezca la variable de entorno `DD_PROFILING_ENABLED=true`.

## Despliegue {#deployment}

{{% aas-workflow-windows %}}

## Solución de problemas {#troubleshooting}

### Si sus aplicaciones se identifican como mal configuradas en la vista sin servidor (Serverless View) y/o le faltan las métricas correspondientes para sus trazas {#if-your-apps-are-identified-as-being-misconfigured-in-the-serverless-view-andor-you-are-missing-corresponding-metrics-for-your-traces}

Es probable que no tenga la integración de Azure configurada para hacer un seguimiento de su aplicación. Una configuración adecuada mejora su capacidad para correlacionar métricas, trazas y registros en la plataforma de Datadog. Sin la integración de Azure configurada, le falta contexto crítico para sus trazas. Para solucionar esto:

1. Vaya al mosaico de integración de Azure.

2. Asegúrese de haber instalado la [integración de Azure][3] para la suscripción de Azure donde se está ejecutando su aplicación.

3. Asegúrese de que cualquier regla de filtrado de plan de App Service que haya aplicado incluya el plan de App Service donde se está ejecutando la aplicación. Si un plan de App Service no está incluido, todas las aplicaciones y funciones alojadas en él tampoco están incluidas. Las etiquetas en la propia aplicación no son utilizadas por Datadog para el filtrado.

### Si las trazas de APM no aparecen en Datadog {#if-apm-traces-are-not-appearing-in-datadog}

1. Verifique que haya configurado `DD_SITE` y `DD_API_KEY` correctamente.

2. Detenga e inicie completamente su aplicación.

3. Si no se resuelve, intente desinstalar la extensión y volver a instalarla (esto también asegura que esté ejecutando la versión más reciente).

**Nota**: Para agilizar el proceso de investigación de errores de la aplicación con el equipo de soporte, configure `DD_TRACE_DEBUG:true` y agregue el contenido del directorio de registros de Datadog (`%AzureAppServiceHomeDirectory%\LogFiles\datadog`) a su correo electrónico.

¿Aún necesita ayuda? Comuníquese con el [soporte de Datadog][4].

### Si ve un tramo no relacionado en una traza {#if-you-see-an-unrelated-span-in-a-trace}

Si el escalado automático está habilitado en el plan de App Service y ve trazas no relacionadas combinadas, los sondeos de estado de la plataforma de Azure (`User-Agent: HttpScaleManager`) podrían transportar contexto de traza W3C obsoleto. Si todos los llamadores a la aplicación están instrumentados con Datadog, configure `DD_TRACE_PROPAGATION_STYLE_EXTRACT=datadog` en la aplicación afectada para restringir la extracción de contexto de traza al formato de Datadog. Para aplicaciones con llamadores que no están instrumentados con Datadog, esta configuración hace que Datadog ignore su contexto de traza W3C, dividiendo esas solicitudes en trazas desconectadas en lugar de combinarlas en la traza principal.

### Lecturas Adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/extend/dogstatsd
[2]: /es/metrics/custom_metrics/
[3]: /es/integrations/azure/
[4]: /es/help
[5]: https://app.datadoghq.com/integrations/azure
[6]: /es/profiler/