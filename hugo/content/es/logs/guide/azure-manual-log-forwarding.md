---
further_reading:
- link: /logs/explorer/
  tag: Documentación
  text: Aprenda a explorar sus registros
- link: /logs/guide/reduce_data_transfer_fees
  tag: Guía
  text: Cómo enviar registros a Datadog mientras reduce las tarifas de transferencia
    de datos
title: Configuración manual de reenvío de registros de Azure
---
## Descripción general {#overview}

Utilice esta guía para configurar manualmente el reenvío de registros desde Azure a cualquier sitio de Datadog.

**Nota**: Para recopilar registros de áreas de trabajo de Azure Log Analytics, utilice el proceso de [plantilla ARM automatizada][1] o [Azure Container App][2].

<div class="alert alert-info">
A partir del 30 de abril de 2025, Azure dejará de admitir Node.js 18. Para garantizar la compatibilidad, actualice utilizando la plantilla de Azure Resource Manager (ARM) con los mismos parámetros.
</div>

## Configuración {#setup}

Puede reenviar sus registros a través de una cuenta de [Azure Container App][4] o [Azure Blob Storage][3].

{{< tabs >}}

{{% tab "Container App (recomendado)" %}}

1. Haga clic en el botón a continuación y complete el formulario en el Portal de Azure. Datadog implementa automáticamente los recursos de Azure necesarios para reenviar registros a su cuenta de Datadog.

[![Implementar en Azure](https://aka.ms/deploytoazurebutton)][200]

2. Una vez finalizada la implementación de la plantilla, configure los [ajustes de diagnóstico][201] para cada fuente de registro a fin de enviar los registros de la plataforma Azure (incluidos los registros de recursos) a la cuenta de almacenamiento creada durante la implementación.

**Nota**: Los recursos solo pueden transmitir datos a una cuenta de almacenamiento en la misma región de Azure.

[200]: https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fforwarder.json/uiFormDefinitionUri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2FmanualForwarderUiDefinition.json
[201]: https://learn.microsoft.com/azure/azure-monitor/platform/diagnostic-settings
{{% /tab %}}

{{% tab "Blob Storage" %}}

1. Si aún no ha configurado [Azure Blob Storage][100], utilice uno de los siguientes métodos para comenzar:
   - [Portal de Azure][101]
   - [Azure Storage Explorer][102]
   - [Azure CLI][103]
   - [PowerShell][104]
2. Configure la función de Datadog-Azure para reenviar registros desde Blob Storage siguiendo las instrucciones a continuación.
3. Configure sus Azure App Services para [reenviar sus registros a Blob Storage][105].

##### Cree una function app {#create-a-function-app}

Si ya tiene una Function App configurada para este propósito, salte a [Agregue una nueva función a su Function App usando la plantilla de activador de Event Hub](#add-a-new-function-to-your-function-app-using-the-azure-blob-storage-trigger-template).

1. En el portal de Azure, navegue a la [descripción general de Function App][106] y haga clic en {{< ui >}}Create{{< /ui >}}.
2. En la sección {{< ui >}}Instance Details{{< /ui >}}, configure los siguientes ajustes:
   1. Seleccione el botón de opción {{< ui >}}Code{{< /ui >}}.
   1. Para {{< ui >}}Runtime stack{{< /ui >}}, seleccione `Node.js`.
   1. Para {{< ui >}}Version{{< /ui >}}, seleccione `18 LTS`.
   1. Para {{< ui >}}Operating System{{< /ui >}}, seleccione `Windows`.
3. Configure otros ajustes según lo desee.
4. Haga clic en {{< ui >}}Review + create{{< /ui >}} para validar el recurso. Si la validación es exitosa, haga clic en {{< ui >}}Create{{< /ui >}}.

##### Agregue una nueva función a su Function App usando la plantilla de disparador de Azure Blob Storage {#add-a-new-function-to-your-function-app-using-the-azure-blob-storage-trigger-template}

1. Seleccione su Function App nueva o existente desde la [descripción general de Function App][106].
2. En la pestaña {{< ui >}}Functions{{< /ui >}}, haga clic en {{< ui >}}Create{{< /ui >}}.
3. Para el campo {{< ui >}}Development environment{{< /ui >}}, seleccione {{< ui >}}Develop in portal{{< /ui >}}.
4. En {{< ui >}}Select a template{{< /ui >}}, elija [Azure Blob Storage trigger][107].
5. Seleccione su {{< ui >}}Storage account connection{{< /ui >}}.
   **Nota**: Consulte [Configurar una cadena de conexión para una cuenta de almacenamiento de Azure][108] para obtener más información.
6. Haga clic en {{< ui >}}Create{{< /ui >}}.

Consulte [Introducción a Azure Functions][109] para obtener más información.

##### Apunte su Blob Storage trigger a Datadog {#point-your-blob-storage-trigger-to-datadog}

1. En la página de detalles de su Event Hub trigger function, haga clic en {{< ui >}}Code + Test{{< /ui >}} en el menú lateral {{< ui >}}Developer{{< /ui >}}.
2. Agregue el [código de Datadog-Azure Function][110] al archivo `index.js` de la función.
3. Agregue su clave de Datadog API con una variable de entorno `DD_API_KEY`, o cópiela en el código de la función reemplazando `<DATADOG_API_KEY>` en la línea 20.
4. Si no está utilizando el sitio Datadog US1, configure su [sitio de Datadog][111] con una variable de entorno `DD_SITE` en la pestaña de configuración de su Function App, o copie el parámetro del sitio en el código de la función en la línea 21.
5. {{< ui >}}Save{{< /ui >}} la función.
6. Haga clic en {{< ui >}}Integration{{< /ui >}} en el menú lateral {{< ui >}}Developer{{< /ui >}}.
7. Haga clic en {{< ui >}}Azure Blob Storage{{< /ui >}} en {{< ui >}}Trigger and inputs{{< /ui >}}.
8. Establezca {{< ui >}}Blob Parameter Name{{< /ui >}} en `blobContent` y haga clic en {{< ui >}}Save{{< /ui >}}.
9. Verifique que su configuración sea correcta consultando el [explorador de registros de Datadog][112] para ver los registros de este recurso.


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

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/guide/azure-automated-log-forwarding/
[2]: /es/getting_started/integrations/azure/#container-app-log-forwarding-setup
[3]: https://learn.microsoft.com/azure/storage/blobs/
[4]: https://learn.microsoft.com/azure/container-apps/