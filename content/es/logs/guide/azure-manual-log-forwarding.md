---
further_reading:
- link: /logs/explorer/
  tag: Documentación
  text: Aprender a explorar tus logs
- link: /logs/guide/reduce_data_transfer_fees
  tag: Guía
  text: Enviar logs a Datadog mientras se reducen los costes de transferencia de datos
title: Configuración del reenvío manual de logs de Azure
---

## Información general

Utiliza esta guía para configurar manualmente el reenvío de log desde Azure a cualquier sitio de Datadog.

**Nota**: Para recopilar logs de los espacios de trabajo de Azure Log Analytics, utiliza la [plantilla de ARM automatizada][1] o el proceso de  [Azure Container App][2].

<div class="alert alert-info">
A partir del 30 de abril de 2025, Azure ya no es compatible con Node.js 18. Para garantizar la compatibilidad, actualiza utilizando la plantilla de Azure Resource Manager (ARM) con los mismos parámetros.
</div>

## Configuración

Puedes reenviar tus logs a través de una cuenta de [Azure Container App][4] o [Azure Blob Storage][3].

{{< tabs >}}

{{% tab "Container App (recommended)" %}}

1. Haz clic en el botón siguiente y rellena el formulario en el Portal de Azure. Datadog despliega automáticamente los recursos de Azure necesarios para reenviar logs a tu cuenta de Datadog.

[![Despliegue en Azure](https://aka.ms/deploytoazurebutton)][200]

2. Una vez finalizado el despliegue de la plantilla, configura la [configuración de diagnóstico][201] de cada fuente de logs para enviar logs de la plataforma de Azure (incluidos logs de recursos) a la cuenta de almacenamiento creada durante el despliegue.

**Nota**: Los recursos solo pueden transmitirse a una cuenta de almacenamiento en la misma región de Azure.

[200]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fddazurelfo.blob.core.windows.net%2Ftemplates%2Fforwarder.json
[201]: https://learn.microsoft.com/azure/azure-monitor/platform/diagnostic-settings
{{% /tab %}}

{{% tab "Blob Storage (Almacenamiento de blobs)" %}}

1. Si aún no has configurado [Azure Blob Storage][100], utiliza uno de los siguientes métodos para empezar:
   - [Portal de Azure][101]
   - [Azure Storage Explorer][102]
   - [Azure CLI][103]
   - [PowerShell][104]
2. Configura la función Azure de Datadog para reenviar logs desde el almacenamiento de blobs, siguiendo las instrucciones que se indican a continuación.
3. Configura tus Azure App Services para [reenviar sus logs a Blob Storage][105].

##### Crear una aplicación de función

Si ya tienes una aplicación de función configurada para este fin, pasa directamente a [añadir una nueva función a tu aplicación de función utilizando la plantilla del activador de centros de eventos](#add-a-new-function-to-your-function-app-using-the-azure-blob-storage-trigger-template).

1. En el portal de Azure, ve a la [Descripción general de la aplicación de función][106] y haz clic en **Create** (Crear).
2. En la sección **Instance Details** (Detalles de la instancia), configura los siguientes parámetros:
  a. Selecciona el botón de opción **Code** (Código).
  b. En **Runtime stack** (Stack tecnológico del tiempo de ejecución), selecciona `Node.js`
  c. En **Version** (Versión), selecciona `18 LTS`.
  d. En **Operating System** (Sistema operativo), selecciona `Windows`.
3. Configura otros parámetros, según prefieras.
4. Haz clic en **Review + create** (Revisar + crear) para validar el recurso. Si la validación es correcta, haz clic en **Create** (Crear).

##### Añade una nueva función a tu aplicación de función utilizando la plantilla del activador del almacenamiento de blobs de Azure.

1. Selecciona tu aplicación de función nueva o existente en la [Vista general de Function App][106].
2. En la pestaña **Functions** (Funciones), haz clic en **Create** (Crear).
3. En el campo **Development environment** (Entorno de desarrollo), selecciona **Develop in portal** (Desarrollar en el portal).
4. En **Select a template** (Seleccionar una plantilla), elige [Activador de almacenamiento de Azure Blob][107].
5. Selecciona tu **conexión de cuenta de almacenamiento**.
   **Nota**: Consulta [Configurar una cadena de conexión para una cuenta de almacenamiento de Azure][108] para obtener más información.
6. Haz clic en **Create** (Crear).

Consulta [Primeros pasos con Azure Functions][109] para obtener más información.

##### Dirigir tu activador de almacenamiento de blobs hacia Datadog

1. En la página de detalles de la función de tu activador de centros de eventos, haz clic en **Code + Test** (Código + Test), en el menú lateral **Developer** (Desarrollador).
2. Añade el [código de función de Datadog y Azure][110] al archivo `index.js` de la función.
3. Añade tu clave de API de Datadog con una variable de entorno `DD_API_KEY`, o cópiala en el código de la función sustituyendo `<DATADOG_API_KEY>` en la línea 20.
4. Si no estás utilizando el sitio de Datadog US1, establece tu [sitio de Datadog][111] con una variable de entorno `DD_SITE` en la pestaña de configuración de tu aplicación de función, o copia el parámetro de sitio en el código de la función en la línea 21.
5. **Guarda** la función.
6. Haz clic en ***Integration** (Integración), en el menú lateral **Developer** (Desarrollador).
7. Haz clic en **Azure Blob Storage** (Almacenamiento de blobs de Azure), en **Trigger and inputs** (Activadores y entradas).
8. Configura el **Blob Parameter Name* (Nombre del parámetro de blob) como `blobContent` y haz clic en **Save** (Guardar).
9. Verifica que tu configuración es correcta al comprobar en el [Datadog Log Explorer][112] en busca de logs de este recurso.


[100]: https://learn.microsoft.com/azure/storage/blobs/
[101]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-portal
[102]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-storage-explorer
[103]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-cli
[104]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-powershell
[105]: https://learn.microsoft.com/training/modules/store-app-data-with-azure-blob-storage/
[106]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[107]: https://learn.microsoft.com/azure/azure-functions/functions-bindings-storage-blob-trigger?tabs=python-v2%2Cisolated-process%2Cnodejs-v4%2Cextensionv5&pivots=programming-language-csharp
[108]: https://learn.microsoft.com/azure/storage/common/storage-configure-connection-string#configure-a-connection-string-for-an-azure-storage-account
[109]: https://learn.microsoft.com/azure/azure-functions/functions-get-started
[110]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[111]: https://docs.datadoghq.com/es/getting_started/site/
[112]: https://app.datadoghq.com/logs
{{% /tab %}}

{{< /tabs >}}

{{% azure-log-archiving %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/guide/azure-automated-log-forwarding/
[2]: /es/getting_started/integrations/azure/#container-app-log-forwarding-setup
[3]: https://learn.microsoft.com/azure/storage/blobs/
[4]: https://learn.microsoft.com/azure/container-apps/
