---
description: Aprenda a enviar registros a Microsoft Sentinel utilizando Observability
  Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino de Microsoft Sentinel
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice el destino de Microsoft Sentinel de Observability Pipelines para enviar registros a Microsoft Sentinel. Consulte [API de ingesta de registros][3] para conocer los límites de llamadas a la API en Microsoft Sentinel.

## Requisitos previos {#prerequisites}

Para configurar el destino de Microsoft Sentinel, debe crear un área de trabajo en Azure si aún no lo ha hecho. En esa área de trabajo:
1. [Agregar Microsoft Sentinel][6] al área de trabajo.
1. [Crear un punto de conexión de recopilación de datos (DCE)][7].
1. [Crear un área de trabajo de Log Analytics][8] en el área de trabajo si aún no lo ha hecho.
1. Siga las instrucciones para el tipo de tabla a la que desea enviar datos.
{{< tabs >}}
{{% tab "Tabla de Azure" %}}
1. Cree un archivo JSON para los parámetros de su Regla de recopilación de datos (DCR). Consulte [Regla de recopilación de datos (DCR)][1] para obtener más información y [Tablas de Azure admitidas][7] para ver todas las tablas disponibles a las que puede enviar datos.
    - En la propiedad `streamDeclarations`, debe listar todos los campos de registro que desea asignar a la columna de la tabla de Azure correspondiente. Consulte [Declaraciones de flujo][2] para obtener más información.
    - En la propiedad `transformKql`, debe listar todos los campos del registro que se descartan y no se asignan a la tabla. Consulte [Propiedades de flujo de datos][3] para obtener más información.
    - **Nota**: Cada campo de registro debe estar listado en una de estas propiedades: ya sea `streamDeclarations` o `transformKql`; de lo contrario, el registro se descarta. Consulte [Supervisar la recopilación de datos de DCR en Azure Monitor][4] sobre cómo configurar una alerta cuando se descartan registros.
    - Por ejemplo, este archivo JSON (`dcr-commonsecuritylog.json`) agrega los campos de registro que se asignarán a la tabla [`CommonSecurityLog`][5]:
        ```bash
        {
            "location": "eastus",
            "kind": "Direct",
            "properties": {
            "dataCollectionEndpointId": "<DCE_RESOURCE_ID>",
            "streamDeclarations": {
                "Custom-CommonSecurityLog": {
                "columns": [
                    { "name": "TimeGenerated",      "type": "datetime" },
                    { "name": "DeviceVendor",       "type": "string"   },
                    { "name": "DeviceProduct",      "type": "string"   },
                    { "name": "DeviceVersion",      "type": "string"   },
                    { "name": "DeviceEventClassID", "type": "string"   },
                    { "name": "Activity",           "type": "string"   },
                    { "name": "LogSeverity",        "type": "string"   },
                    { "name": "SourceIP",           "type": "string"   },
                    { "name": "DestinationIP",      "type": "string"   },
                    { "name": "Message",            "type": "string"   },
                    { "name": "source_type",        "type": "string"   },
                    { "name": "path",               "type": "string"   },
                    { "name": "timestamp",          "type": "string"   }
                ]
                }
            },
            "destinations": {
                "logAnalytics": [
                {
                    "workspaceResourceId": "<WORKSPACE_RESOURCE_ID>",
                    "name": "LogAnalyticsDest"
                }
                ]
            },
            "dataFlows": [
                {
                "streams":      ["Custom-CommonSecurityLog"],
                "destinations": ["LogAnalyticsDest"],
                "transformKql": "source | project-away source_type, path, timestamp",
                "outputStream": "Microsoft-CommonSecurityLog"
                }
            ]
            }
            ```
    - Replace the placeholders:
        - `<DCE_RESOURCE_ID>` with the ID of the DCE resource you created in step 2. Run the [`az monitor data-collection endpoint show`][9] command to get the DCE resource ID. For example:
            ```
            az monitor data-collection endpoint show \
            --name "<DCE_NAME>" \
            --resource-group <RESOURCE_GROUP> \
            --subscription <SUBSCRIPTION_ID> \
            --query "id"
            ```
        - `<WORKSPACE_RESOURCE_ID>` with the ID of the Logs Analytics Workspace you created in step 3. Run the [`az monitor log-analytics workspace show`][10] command to get the Workspace resource ID. For example:
            ```
            az monitor log-analytics workspace show \
            --workspace-name "<DCE_NAME>" \
            --resource-group <RESOURCE_GROUP> \
            --subscription <SUBSCRIPTION_ID> \
            --query "id"
            ```

    - See [CommonSecurityLog Columns][6] for a full list of `commonsecuritylog` table columns.
1. Ejecute el comando [`az monitor data-collection rule create`][8] de la CLI de Azure para crear una DCR con el archivo JSON que creó en el paso anterior. Por ejemplo, con el archivo de ejemplo `dcr-commonsecuritylog.json`:
    ```bash
    az monitor data-collection rule create \
        --resource-group "myResourceGroup" \
        --location "eastus" \
        --name "myCollectionRule" \
        --subscription "mysubscription" \
        --rule-file "\path\to\json\dcr-commonsecuritylog.json"
    ```

[1]: https://learn.microsoft.com/en-us/azure/azure-monitor/logs/logs-ingestion-api-overview#data-collection-rule-dcr
[2]: https://learn.microsoft.com/en-us/azure/azure-monitor/data-collection/data-collection-rule-structure#stream-declarations
[3]: https://learn.microsoft.com/en-us/azure/azure-monitor/data-collection/data-collection-rule-structure#data-flow-properties
[4]: https://learn.microsoft.com/en-us/azure/azure-monitor/data-collection/data-collection-monitor
[5]: https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/commonsecuritylog
[6]: https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/commonsecuritylog#columns
[7]: https://learn.microsoft.com/en-us/azure/azure-monitor/logs/logs-ingestion-api-overview#supported-tables
[8]: https://learn.microsoft.com/en-us/cli/azure/monitor/data-collection/rule?view=azure-cli-latest#az-monitor-data-collection-rule-create
[9]: https://learn.microsoft.com/en-us/cli/azure/monitor/data-collection/endpoint?view=azure-cli-latest#az-monitor-data-collection-endpoint-show
[10]: https://learn.microsoft.com/en-us/cli/azure/monitor/log-analytics/workspace?view=azure-cli-latest#az-monitor-log-analytics-workspace-show

{{% /tab %}}
{{% tab "Tabla personalizada" %}}
1. En el área de trabajo de Log Analytics, vaya a **Configuración** > **Tablas**.
1. Haga clic en **+ Crear**.
1. Defina una tabla personalizada (por ejemplo, `MyOPWLogs`).
    - **Notas**:<br>- Una vez configurada la tabla, el prefijo `Custom-` y el sufijo `_CL` se agregan automáticamente al nombre de la tabla. Por ejemplo, si definió el nombre de la tabla en Azure como `MyOPWLogs`, el nombre completo de la tabla se almacena como `Custom-MyOPWLogs_CL`. Debe usar el nombre completo de la tabla al configurar el destino de Microsoft Sentinel de Observability Pipelines.<br>-El nombre completo de la tabla se puede encontrar en el JSON de recursos de la DCR en `streamDeclarations`.
1. Seleccione **Nuevo registro personalizado (basado en DCR)**.
1. Haga clic en **Crear una nueva regla de recopilación de datos** y seleccione el DCE que creó anteriormente.
1. Haga clic en **Siguiente**.
1. Cargue un registro JSON de muestra. Para este ejemplo, se utiliza el siguiente JSON para el **Esquema y transformación**, donde `TimeGenerated` es obligatorio:
    ```json
    {
        "TimeGenerated": "2024-07-22T11:47:51Z",
        "event": {}
    }
    ```
1. Haga clic en **Crear**.
{{% /tab %}}
{{< /tabs >}}
1. En Azure, navegue a **Microsoft Entra ID**.
    1. Haga clic en **Agregar** > **Registro de aplicaciones**.
    1. Haga clic en **Crear**.
    1. En la página de información general, haga clic en **Credenciales de cliente: Agregar un certificado o secreto**.
    1. Haga clic en **Nuevo secreto de cliente**.
    1. Ingrese un nombre para el secreto y haga clic en **Agregar**. **Nota**: Asegúrese de anotar el secreto del cliente, el cual se ofusca después de 10 minutos.
    1. También tome nota del **ID de inquilino** y del **ID de cliente**. Necesita esta información, junto con el secreto del cliente, cuando [configure el destino de Microsoft Sentinel de Observability Pipelines](#set-up-the-destination-in-observability-pipelines).
1. En la página [Reglas de recopilación de datos][9] del Portal de Azure, busque y seleccione la DCR que creó anteriormente.
    1. Haga clic en **Access Control (IAM)** en la navegación izquierda.
    1. Haga clic en **Agregar** y seleccione **Agregar asignación de roles**.
    1. Agregue el rol **Publicador de métricas de supervisión**.
    1. En la página Miembros, seleccione **Usuario, grupo o entidad de servicio**.
    1. Haga clic en **Seleccionar miembros** y busque la aplicación que creó en el paso de registro de la aplicación.
    1. Haga clic en **Revisar y asignar**. **Nota**: El cambio de IAM puede tardar hasta 10 minutos en surtir efecto.

La siguiente tabla resume la información de Azure y Microsoft Sentinel que necesita cuando [configura el destino de Microsoft Sentinel para Observability Pipelines](#set-up-the-destination-in-observability-pipelines):

| Nombre                              | Descripción                                                                                                                                                                                                                     |
|------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ID de aplicación (cliente)            | El ID de cliente de la aplicación de Azure Active Directory (AD). Consulte [Registrar una aplicación en Microsoft Entra ID][4] para obtener más información.<br>**Ejemplo**: `550e8400-e29b-41d4-a716-446655440000`                                                                                      |
| ID de directorio (inquilino)              | El ID de inquilino de Azure AD. Consulte [Registrar una aplicación en Microsoft Entra ID][4] para obtener más información.<br>**Ejemplo**: `72f988bf-86f1-41af-91ab-2d7cd011db47`                                                                                      |
| Nombre de la tabla (flujo)                | El nombre del flujo que coincide con la tabla elegida al configurar la Regla de recopilación de datos (DCR).  **Nota**: El nombre completo de la tabla se puede encontrar en el JSON de recursos de la DCR en `streamDeclarations`. <br>**Ejemplo**: `Custom-MyOPWLogs_CL`                                                                                                          |
| ID inmutable de la Regla de recopilación de datos (DCR) | Este es el ID inmutable de la DCR donde se definen las rutas de registro. Es el **ID inmutable** que se muestra en la página de información general de la DCR.<br>**Nota**: Asegúrese de que el rol de Publicador de métricas de supervisión esté asignado en la configuración de IAM de la DCR.<br>**Ejemplo**: `dcr-000a00a000a00000a000000aa000a0aa`<br>Consulte [Reglas de recopilación de datos (DCR) en Azure Monitor][5] para obtener más información sobre cómo crear o ver DCR. |


## Configuración {#setup}

<div class="alert alert-danger">Para la gestión de secretos: solo ingrese los identificadores del secreto de cliente de Microsoft Sentinel y del punto de conexión de recopilación de datos. <b>No</b> ingrese los valores reales.</div>

Configure el destino de Microsoft Sentinel cuando [configure una canalización][10]. Usted puede configurar una canalización en la [UI][1], usando la [API][11], o con [Terraform][12]. Los pasos en esta sección se configuran en la interfaz de usuario.

Después de seleccionar el destino de Microsoft Sentinel en la pipeline UI:

1. Ingrese el identificador de su secreto de cliente de Microsoft Sentinel. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. Ingrese el identificador de su punto de conexión de recopilación de datos de Microsoft Sentinel. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. Ingrese el ID de cliente de su aplicación, como `550e8400-e29b-41d4-a716-446655440000`.
1. Ingrese el ID de directorio de su inquilino, como `72f988bf-86f1-41af-91ab-2d7cd011db47`. Este es el ID de inquilino de Azure AD.
1. Ingrese el nombre completo de la tabla a la que está enviando registros. Un ejemplo de nombre de tabla: `Custom-MyOPWLogs_CL`.
1. Ingrese el ID inmutable de la Regla de recopilación de datos (DCR), como `dcr-000a00a000a00000a000000aa000a0aa`.

{{% observability_pipelines/secrets_env_var_note %}}

### Almacenamiento en búfer opcional {#optional-buffering}

{{% observability_pipelines/destination_buffer %}}

## Valores predeterminados de secretos {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Administración de secretos" %}}

- Identificador del secreto de cliente de Microsoft Sentinel:
    - Hace referencia a la URL del punto de conexión de DCE que se muestra como **Punto de conexión de ingesta de registros** o **Punto de conexión de recopilación de datos** en la página de información general de DCR. Un ejemplo de URL: `https://<DCE-ID>.ingest.monitor.azure.com`.
	- El identificador predeterminado es `DESTINATION_MICROSOFT_SENTINEL_CLIENT_SECRET`.
- Identificador del punto de conexión de recopilación de datos de Microsoft Sentinel:
    - Hace referencia al secreto de cliente de la aplicación de Azure AD, como `550e8400-e29b-41d4-a716-446655440000`.
	- El identificador predeterminado es `DESTINATION_MICROSOFT_SENTINEL_DCE_URI`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/microsoft_sentinel %}}

{{% /tab %}}
{{< /tabs >}}

## Cómo funciona el destino {#how-the-destination-works}

### Procesamiento por lotes de eventos {#event-batching}

Un lote de eventos se vacía cuando se cumple uno de estos parámetros. Consulte [Destinations event batching][2] para obtener más información.

| Máximo de eventos | Tamaño máximo (MB) | Tiempo de espera (segundos)   |
|----------------|-------------------|---------------------|
| Ninguno           | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/destinations/#event-batching
[3]: https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/service-limits#logs-ingestion-api
[4]: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app?tabs=certificate%2Cexpose-a-web-api
[5]: https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/data-collection-rule-overview
[6]: https://portal.azure.com/#browse/microsoft.securityinsightsarg%2Fsentinel
[7]: https://portal.azure.com/#view/HubsExtension/BrowseResource.ReactView/resourceType/microsoft.insights%2Fdatacollectionendpoints
[8]: https://portal.azure.com/#create/Microsoft.LogAnalyticsOMS
[9]: https://portal.azure.com/#view/HubsExtension/BrowseResource.ReactView/resourceType/microsoft.insights%2Fdatacollectionrules
[10]: /es/observability_pipelines/configuration/set_up_pipelines/
[11]: /es/api/latest/observability-pipelines/
[12]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline