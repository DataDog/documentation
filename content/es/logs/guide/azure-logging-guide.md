---
further_reading:
- link: /logs/explorer/
  tag: Documentación
  text: Aprender a explorar tus logs
- link: /logs/guide/reduce_data_transfer_fees
  tag: Guía
  text: Enviar logs a Datadog y reducir las tarifas de transferencia de datos
- link: https://github.com/Azure-Samples/terraform-azure-datadog-log-forwarder
  tag: Sitio externo
  text: Terraform Azure Datadog Log Forwarder
title: Enviar logs de Azure a Datadog
---

## Información general

Utiliza esta guía para configurar la gestión de logs de tus suscripciones Azure en Datadog.

Datadog recomienda utilizar el Agent o DaemonSet para enviar logs desde Azure. Si no es posible una transmisión en directo, crea un pipeline para el reenvío de logs utilizando un Azure Event Hub para recopilar [logs de Azure Platform][2]. Para los recursos que no se pueden transmitir a un Event Hub, utiliza la opción de reenvío a Blob Storage. Para recopilar logs de los espacios de trabajo de Azure Log Analytics, utiliza el proceso Azure Event Hub.

Sigue estos pasos para enviar logs de Azure a cualquier sitio Datadog.

**US3**: Las organizaciones en el sitio Datadog US3 pueden simplificar el reenvío de logs de Azure utilizando la integración nativa de Azure. Este método es recomendado y se configura a través del [recurso Datadog en Azure][5], sustituyendo el proceso Azure Event Hub. Para obtener más detalles, consulta la [guía de Azure Native Logging][4].

<div class="alert alert-info">
A partir del 30 de abril de 2025, Azure ya no es compatible con Node.js v18. Para garantizar la compatibilidad, primero actualiza el código de tu forwarder y luego actualiza a la última versión de Azure LTS de Node.js (v20).
Si anteriormente desplegaste con una plantilla ARM, puedes actualizar utilizando la plantilla con los mismos parámetros.
</div>

## Configuración

{{< tabs >}}

{{% tab "Instalación automatizada" %}}

Para empezar, haz clic en el botón de abajo y rellena el formulario en el portal Azure. Se desplegarán los recursos Azure necesarios para transferir logs de actividades a tu cuenta Datadog.

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdatadog-serverless-functions%2Fmaster%2Fazure%2Fdeploy-to-azure%2Fparent_template.json)

Datadog también proporciona scripts automatizados que puedes utilizar para enviar logs de actividades de Azure y logs de la plataforma Azure (incluidos logs de recursos).

### Logs de actividades de Azure

Sigue estos pasos para ejecutar el script que crea y configura los recursos Azure necesarios para transferir logs de actividades a tu cuenta Datadog. Estos recursos incluyen parámetros de diagnóstico de logs de actividades, funciones Azure, espacios de nombres de centros de eventos y centros de eventos.

1. En el portal Azure, ve a tu **Cloud Shell**.
  {{< img src="integrations/azure/azure_cloud_shell.png" alt="azure cloud shell" popup="true (verdadero)" style="width:100%">}}
2. Ejecuta el siguiente comando para descargar el script de automatización en tu entorno Cloud Shell. También puedes [ver el contenido del script][100].

{{< code-block lang="powershell" filename="Logs de actividad, paso 1" >}}
(New-Object System.Net.WebClient).DownloadFile("https://raw.githubusercontent.com/DataDog/datadog-serverless-functions/master/azure/eventhub_log_forwarder/activity_logs_deploy.ps1", "activity_logs_deploy.ps1")
{{< /code-block >}}

3. Para invocar el script, ejecuta el siguiente comando y sustituye **`<API_KEY>`** por tu [token de API Datadog][101] y **`<SUBSCRIPTION_ID>`** por tu ID de suscripción a Azure. Añade [parámetros opcionales](#optional-parameters) para configurar tu despliegue.

{{< code-block lang="powershell" filename="Logs de actividad, paso 2" >}}
./activity_logs_deploy.ps1 -ApiKey <API_KEY> -SubscriptionId <SUBSCRIPTION_ID>
{{< /code-block >}}

### Logs de la plataforma Azure

Para enviar logs de la plataforma Azure (incluidos logs de recursos), puedes desplegar un centro de eventos y un par de función de reenvío de logs.
Después del despliegue, crea parámetros de diagnóstico para cada una de las fuentes de logs, para transferir logs a Datadog.

**Nota**: Los recursos sólo pueden transmitirse a Event Hubs de la misma región Azure.

1. En el portal Azure, ve a tu **Cloud Shell**.

2. Ejecuta el siguiente comando para descargar el script de automatización en tu entorno Cloud Shell. También puedes [ver el contenido del script][102].

{{< code-block lang="powershell" filename="Logs de plataforma, paso 1" >}}
(New-Object System.Net.WebClient).DownloadFile("https://raw.githubusercontent.com/DataDog/datadog-serverless-functions/master/azure/eventhub_log_forwarder/resource_deploy.ps1", "resource_deploy.ps1")
{{< /code-block >}}

3. Para invocar el script, ejecuta el siguiente comando de PowerShell y sustituye **`<API_KEY>`** por tu [token de API Datadog][101], y **`<SUBSCRIPTION_ID>`**, por tu ID de suscripción a Azure. También puedes añadir otros parámetros opcionales para configurar tu despliegue. Para ello, consulta los [parámetros opcionales](#optional-parameters).

{{< code-block lang="powershell" filename="Logs de plataforma, paso 2" >}}
./resource_deploy.ps1 -ApiKey <API_KEY> -SubscriptionId <SUBSCRIPTION_ID>
{{< /code-block >}}

4. Crea parámetros de diagnóstico para todos los recursos Azure que envían logs a Datadog. Configura estos parámetros de diagnóstico para la transferencia al centro de eventos que acabas de crear.

Todos los recursos Azure desplegados para pipelines de logs de plataforma contienen su ResourceGroupLocation (Localización del grupo de recursos) añadida a su nombre predeterminado. Por ejemplo, `datadog-eventhub-westus`. Sin embargo, puedes modificar esta convención anulando el parámetro.

**Nota**: Los recursos sólo pueden transferir a centros de eventos en la misma región de Azure, por lo que debes repetir el paso 2 para cada región desde la que quieres transferir logs de recursos.

### Configurar logs de actividades y de recursos

Para transferir logs de actividades y de recursos, ejecuta el primer script incluyendo el parámetro opcional `-ResourceGroupLocation <REGION> (Localización del grupo de recursos)`.1 Los logs de actividades son una fuente a nivel de suscripción, por lo que puedes crear tu pipeline para ellos en cualquier región. Una vez desplegado, envía logs de recursos a través del mismo centro de eventos añadiendo parámetros de diagnóstico a tus recursos en ` westus`.

**Nota**: Esta integración no recopila eventos.

### Parámetros opcionales

**Nota**: Cuando personalices los siguientes parámetros, asegúrate de que los nombres personalizados de tus recursos son únicos. Comprueba que el nombre del recurso no existe en lista de otros recursos Azure.

 | -Flag (Marca) `<Default Parameter>`                                                                               | Descripción                                                                                                                                                                                |
 |-------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 | -DatadogSite (Sitio Datadog) `<datadoghq.com>`                                                                    | Personaliza tu instancia Datadog añadiendo esta marca con otro sitio Datadog como parámetro. Tu sitio Datadog es: {{< region-param key="dd_site" code="true" >}}.                          |
 | -Environment (Entorno) `<AzureCloud>`                                                                             | Gestiona el almacenamiento en nubes independientes de Azure añadiendo esta marca como parámetro. Las opciones adicionales son `AzureChinaCloud`, `AzureGermanCloud` y `AzureUSGovernment`. |
 | -ResourceGroupLocation (Localización del grupo de recursos) `<westus2>`                                           | Puedes elegir la región en la que se desplegarán tus recursos y tu grupo de recursos Azure añadiendo esta marca con una región Azure actualizada.                                          |
 | -ResourceGroupName (Nombre del grupo de recursos) `<datadog-log-forwarder-rg>`                                    | Personaliza el nombre de tu grupo de recursos Azure añadiendo esta marca con un parámetro actualizado.                                                                                     |
 | -EventhubNamespace (Espacio de nombres del centro de eventos)`<datadog-ns-4c6c53b4-1abd-4798-987a-c8e671a5c25e>`  | Personaliza tu espacio de nombres del centro de eventos Azure añadiendo esta marca con un parámetro actualizado. Por defecto, se genera `datadog-ns-<globally-unique-ID>`.                 |
 | -EventhubName (Nombre del centro de eventos) `<datadog-eventhub>`                                                 | Personaliza el nombre de tu centro de eventos Azure añadiendo esta marca con un parámetro actualizado.                                                                                     |
 | -FunctionAppName (Nombre de aplicación de la función)`<datadog-functionapp-1435ad2f-7c1f-470c-a4df-bc7289d8b249>` | Personaliza el nombre de tu aplicación de la función añadiendo esta marca con un parámetro actualizado. Por defecto, se genera `datadog-functionapp-<globally-unique-ID>`.                 |
 | -FunctionName (Nombre de la función) `<datadog-function>`                                                         | Personaliza el nombre de tu función Azure añadiendo esta marca con un parámetro actualizado.                                                                                               |
 | -DiagnosticSettingName (Nombre de los parámetros de diagnóstico)`<datadog-activity-logs-diagnostic-setting>`      | Personaliza el nombre de tus parámetros de diagnóstico Azure añadiendo esta marca con un parámetro actualizado. **(Sólo se aplica al envío de logs de actividades)**                       |

¿Errores de instalación? Consulta la [recopilación automatizada de logs][103] para conocer los casos de error más comunes.


[100]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/eventhub_log_forwarder/activity_logs_deploy.ps1
[101]: https://app.datadoghq.com/organization-settings/api-keys
[102]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/eventhub_log_forwarder/resource_deploy.ps1
[103]: /es/integrations/guide/azure-troubleshooting/#automated-log-collection

{{% /tab %}}

{{% tab "Blob Storage (Almacenamiento de blobs)" %}}

{{% site-region region="us3,us5,gov,ap1" %}}
<div class="alert alert-warning">
  Esto no es compatible con el sitio Datadog {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

Datadog recomienda utilizar la configuración de Event Hub para la recopilación de logs de Azure. Sin embargo, también puedes seguir los pasos de esta sección para reenviar logs de todos tus servicios Azure App desde Azure Blob Storage:

1. Si aún no configuraste [Azure Blob Storage][301], utiliza uno de los siguientes métodos para empezar:
   - [Portal Azure][302]
   - [Explorador de Azure Storage][303]
   - [CLI Azure][304]
   - [PowerShell][305]
2. Configura la función Datadog-Azure para reenviar logs desde Blob Storage siguiendo las instrucciones que aparecen a continuación.
3. Configura tus servicios Azure App para [reenviar tus logs a Blob Storage][306].

##### Crea una aplicación de función

Si ya tienes una aplicación de función configurada para este fin, pasa a [Añadir una nueva función a tu aplicación de función utilizando la plantilla de activación de Event Hub](#add-a-new-function-to-your-function-app-using-the-azure-blob-storage-trigger-template).

1. En el portal Azure, ve a [Información general de la aplicación de función][309] y haz clic en **Create** (Crear).
2. En la sección **Detalles de la instancia**, configura los siguientes parámetros:
  a. Selecciona el botón de opción **Code** (Código).
  b. Para **Stack tecnológico de tiempo de ejecución**, selecciona `Node.js`
  c. Para **Versión**, selecciona `18 LTS`.
  d. Para **Sistema operativo**, selecciona `Windows`.
3. Configura otros parámetros, si así lo prefieres.
4. Haz clic en **Review + create** (Revisar + crear) para validar el recurso. Si la validación es correcta, haz clic en **Create** (Crear).

##### Añade una nueva función a tu aplicación de función utilizando la plantilla de activación de Azure Blob Storage.

1. Selecciona tu aplicación de función nueva o existente desde [Información general de la aplicación de función][309].
2. En la pestaña **Funciones**, haz clic en **Create** (Crear).
3. En el campo **Entorno de desarrollo**, selecciona **Desarrollar en portal**.
4. En **Seleccionar una plantilla**, elige [Activador de almacenamiento Azure Blob][313].
5. 5. Selecciona tu **Conexión de cuenta de almacenamiento**.
   **Nota**: Para obtener más información, consulta [Configurar una cadena de conexión para una cuenta de almacenamiento Azure][311].
6. Haz clic en **Create** (Crear).

Consulta [Empezando con las funciones Azure][307] para obtener más información.

##### Apunta tu activador de Blob Storage a Datadog

1. En la página de información de tu activador de la función Event Hub, haz clic en **Code + Test** (Código + test) en el menú lateral **Desarrollador**.
2. Añade el [código de la función Datadog-Azure][308] al archivo `index.js` de la función.
3. Añade tu clave de API Datadog con una variable de entorno `DD_API_KEY` o cópiala en el código de la función sustituyendo `<DATADOG_API_KEY>` en la línea 20.
4. Si no estás utilizando el sitio Datadog US1, define tu [sitio Datadog][312] con una variable de entorno `DD_SITE` en la pestaña de configuración de tu aplicación de función o copia el parámetro del sitio en el código de la función en la línea 21.
5. **Guarda** la función.
6. Haz clic en **Integration** (Integración) en el menú lateral **Desarrollador**.
7. Haz clic en **Azure Blob Storage**, en **Activador y entradas**.
8. Define el **Nombre del parámetro Blob** en `blobContent` y haz clic en **Save** (Guardar).
9. Verifica que tu configuración es correcta comprobando los logs de este recurso en el [Explorador de logs de Datadog][310].

[301]: https://azure.microsoft.com/en-us/services/storage/blobs/
[302]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal
[303]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-storage-explorer
[304]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-cli
[305]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-powershell
[306]: https://learn.microsoft.com/en-us/training/modules/store-app-data-with-azure-blob-storage/
[307]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-get-started
[308]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[309]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[310]: https://app.datadoghq.com/logs
[311]: https://learn.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string#configure-a-connection-string-for-an-azure-storage-account
[312]: https://docs.datadoghq.com/es/getting_started/site/
[313]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-blob-trigger?tabs=python-v2%2Cisolated-process%2Cnodejs-v4%2Cextensionv5&pivots=programming-language-csharp

{{% /tab %}}
{{< /tabs >}}

## Configuración avanzada
Consulta los siguientes temas para configurar tu instalación según tus necesidades de monitorización.

### Cumplimiento de PCI

<div class="alert alert-warning">
El cumplimiento de PCI DSS para APM y Log Management sólo está disponible para las organizaciones Datadog en el <a href="/getting_started/site/">sitio US1</a>.
</div>

Para configurar Log Management conforme a PCI, debes cumplir los requisitos descritos en [Cumplimiento de PCI DSS][6]. Envía tus logs al endpoint dedicado al cumplimiento de PCI:
- `agent-http-intake-pci.logs.datadoghq.com:443` para el tráfico del Agent
- `http-intake-pci.logs.datadoghq.com:443` para el tráfico no del Agent

```
const DD_SITE = process.env.DD_SITE || 'datadoghq.com';
const DD_HTTP_URL = process.env.DD_URL || 'http-intake-pci.logs.' + DD_SITE;
```

## Archivado de logs

El archivado de logs en el almacenamiento de blobs de Azure requiere un registro de aplicación, incluso si utilizas la integración nativa Azure. Para archivar logs en el almacenamiento de blobs de Azure, sigue las instrucciones de configuración de la integración mediante un registro de aplicación. Los registros de aplicación creados con fines de archivado no necesitan tener asignado el rol `Monitoring Reader`.

Una vez configurado el registro de aplicación, puedes [crear un archivo de logs][3] que escriba en el almacenamiento de blobs de Azure.

**Nota**: Si tu bucket de almacenamiento se encuentra en una suscripción que se monitoriza a través de la integración nativa Azure, el cuadro de integración de Azure mostrará una advertencia sobre la redundancia del registro de aplicación. Puedes ignorar esta advertencia.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/site/
[2]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/platform-logs-overview
[3]: /es/logs/log_configuration/archives/
[4]: /es/logs/guide/azure-native-logging-guide/
[5]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/overview
[6]: /es/data_security/pci_compliance/?tab=logmanagement
