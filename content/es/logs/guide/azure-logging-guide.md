---
further_reading:
- link: /logs/explorer/
  tag: Documentación
  text: Aprender a explorar tus logs
kind: Documentación
title: Enviar logs de Azure a Datadog
---

## Información general

Utiliza esta guía para configurar la gestión de logs de tus suscripciones Azure en Datadog.

Datadog recomienda enviar logs desde Azure a Datadog a través del Agent o de DaemonSet. Para algunos recursos puede no ser posible hacerlo. En estos casos, puedes crear un pipeline de reenvío de logs utilizando un centro de eventos Azure para recopilar [logs de la plataforma Azure][2]. Para los recursos que no pueden transferir logs de la plataforma Azure a un centro de eventos, puedes utilizar la opción de reenvío del almacenamiento de blobs.

**Todos los sitios**: todos los sitios Datadog pueden utilizar los pasos de esta página para enviar logs de Azure a Datadog.

**US3**: si tu organización se encuentra en el sitio Datadog US3, puedes utilizar integración nativa Azure para simplificar tu configuración de reenvío de logs de Azure. Datadog recomienda utilizar este método siempre que sea posible. La configuración se realiza a través del [recurso Datadog en Azure][5]. Esto sustituye al proceso de reenvío de logs del centro de eventos Azure. Para obtener más información, consulta la [guía para la gestión de logs nativa Azure][4].

{{< tabs >}}

{{% tab "Automated Installation" (Instalación automatizada) %}}

Para empezar, haz clic en el botón de abajo y rellena el formulario en el portal Azure. Se desplegarán los recursos de Azure necesarios para transferir logs de actividades a tu cuenta Datadog.

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdatadog-serverless-functions%2Fmaster%2Fazure%2Fdeploy-to-azure%2Fparent_template.json)

Datadog también proporciona scripts automatizados que puedes utilizar para enviar logs de actividades de Azure y logs de la plataforma Azure (incluidos logs de recursos).

### Logs de actividades de Azure

Sigue estos pasos para ejecutar el script que crea y configura los recursos Azure necesarios para transferir logs de actividades a tu cuenta Datadog. Estos recursos incluyen parámetros de diagnóstico de logs de actividades, funciones de Azure, espacios de nombres de centros de eventos y centros de eventos.

1. En el portal Azure, ve a tu **Cloud Shell**.

{{< img src="integrations/azure/azure_cloud_shell.png" alt="azure cloud shell" popup="true (verdadero)" style="width:100%">}}

2. Ejecuta el siguiente comando para descargar el script de automatización en el entorno de tu Cloud Shell. 

{{< code-block lang="powershell" filename="Logs de actividades, paso 1" >}}

(New-Object System.Net.WebClient).DownloadFile("https://raw.githubusercontent.com/DataDog/datadog-serverless-functions/master/azure/eventhub_log_forwarder/activity_logs_deploy.ps1", "activity_logs_deploy.ps1")

{{< /code-block >}}

También puedes [ver el contenido del script](https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/eventhub_log_forwarder/activity_logs_deploy.ps1).

3. Para invocar el script, ejecuta el siguiente comando y sustituye **`<API_KEY>`** por tu [token de API de Datadog](https://app.datadoghq.com/organization-settings/api-keys), y **`<SUBSCRIPTION_ID>`**, por tu ID de suscripción a Azure. Añade [parámetros opcionales](#opcional-parameters) para configurar tu despliegue.

{{< code-block lang="powershell" filename="Logs de actividades, paso 2" >}}

./activity_logs_deploy.ps1 -ApiKey <API_KEY> -SubscriptionId <SUBSCRIPTION_ID> 

{{< /code-block >}}

### Logs de la plataforma Azure

Para enviar logs de la plataforma Azure (incluidos logs de recursos), puedes desplegar un centro de eventos y un par para la función de reenvío de logs. 
Después del despliegue, crea configuraciones de diagnóstico para cada una de las fuentes de logs para transferir logs a Datadog.

1. En el portal Azure, ve a tu **Cloud Shell**.

2. Ejecuta el siguiente comando Powershell para descargar el script de automatización en el entorno de tu Cloud Shell. 

   {{< code-block lang="powershell" filename="Logs de plataforma, paso 1" >}}

   (New-Object System.Net.WebClient).DownloadFile("https://raw.githubusercontent.com/DataDog/datadog-serverless-functions/master/azure/eventhub_log_forwarder/resource_deploy.ps1", "resource_deploy.ps1")

   {{< /code-block >}}

   También puedes [ver el contenido del script](https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/eventhub_log_forwarder/resource_deploy.ps1).

3. Para invocar el script, ejecuta el siguiente comando y sustituye **`<API_KEY>`** por tu [token de API de Datadog](https://app.datadoghq.com/organization-settings/api-keys), y **`<SUBSCRIPTION_ID>`**, por tu ID de suscripción a Azure. También puedes añadir otros parámetros opcionales para configurar tu despliegue. Para ello consulta los [parámetros opcionales](#opcional-parameters).

   {{< code-block lang="powershell" filename="Logs de plataforma, paso 2" >}}

   ./resource_deploy.ps1 -ApiKey <API_KEY> -SubscriptionId <SUBSCRIPTION_ID> 

   {{< /code-block >}}

4. Crea parámetros de diagnóstico para todos los recursos de Azure que envían logs a Datadog. Configura estos parámetros de diagnóstico para la transferencia al centro de eventos que acabas de crear.

Todos los recursos de Azure desplegados para pipelines de logs de la plataforma contienen su ResourceGroupLocation (Localización del grupo de recursos) añadida a su nombre predeterminado. Por ejemplo, `datadog-eventhub-westus`. Sin embargo, puedes modificar esta convención anulando el parámetro.

**Nota**: Los recursos sólo pueden transferir a centros de eventos en la misma región de Azure, por lo que debes repetir el paso 2 para cada región desde la que quieres transferir logs de recursos.

### Configurar logs de actividades y de recursos

Para transferir logs de actividades y de recursos, ejecuta el primer script incluyendo el parámetro opcional `-ResourceGroupLocation <REGION> (Localización del grupo de recursos)`.1 Los logs de actividades son una fuente a nivel de suscripción, por lo que puedes crear tu pipeline para ellos en cualquier región. Una vez desplegado, envía logs de recursos a través del mismo centro de eventos añadiendo parámetros de diagnóstico a tus recursos en ` westus`.

**Nota**: Esta integración no recopila eventos.

### Parámetros opcionales

**Nota**: Cuando personalices los siguientes parámetros, asegúrate de que los nombres personalizados de tus recursos son únicos. Comprueba que el nombre del recurso no existe ya en lista de otros recursos de Azure.

| -Flag (Marca) `<Default Parameter>`                                         | Descripción                                                                                                                                                           |
|---------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| -DatadogSite (Sitio Datadog) `<datadoghq.com>`                                      | Personaliza tu instancia Datadog añadiendo esta marca con otro sitio Datadog como parámetro. Tu sitio Datadog es: {{< region-param key="dd_site" code="true" >}}.    |
| -Environment (Entorno) `<AzureCloud>`                                         | Gestiona el almacenamiento en nubes independientes de Azure añadiendo esta marca como parámetro. Las opciones adicionales son `AzureChinaCloud`, `AzureGermanCloud` y `AzureUSGovernment`. |
| -ResourceGroupLocation (Localización del grupo de recursos) `<westus2>`                                  | Puedes elegir la región en la que se desplegarán tus recursos y tu grupo de recursos de Azure añadiendo esta marca con una región Azure actualizada.                     |
| -ResourceGroupName (Nombre del grupo de recursos) `<datadog-log-forwarder-rg>`                     | Personaliza el nombre de tu grupo de recursos Azure añadiendo esta marca con un parámetro actualizado.                                                                        |
| -EventhubNamespace (Espacio de nombres del centro de eventos)`<datadog-ns-4c6c53b4-1abd-4798-987a-c8e671a5c25e>` | Personaliza tu espacio de nombres del centro de eventos Azure añadiendo esta marca con un parámetro actualizado. Por defecto, se genera `datadog-ns-<globally-unique-ID>`.                              |
| -EventhubName (Nombre del centro de eventos) `<datadog-eventhub>`                                  | Personaliza el nombre de tu centro de eventos Azure añadiendo esta marca con un parámetro actualizado.                                                                             |
| -FunctionAppName (Nombre de aplicación de la función)`<datadog-functionapp-1435ad2f-7c1f-470c-a4df-bc7289d8b249>`                            | Personaliza el nombre de tu aplicación de la función añadiendo esta marca con un parámetro actualizado. Por defecto, se genera `datadog-functionapp-<globally-unique-ID>`.                                                                         |
| -FunctionName (Nombre de la función) `<datadog-function>`                                  | Personaliza el nombre de tu función Azure añadiendo esta marca con un parámetro actualizado.                                                                              |
| -DiagnosticSettingName (Nombre de los parámetros de diagnóstico)`<datadog-activity-logs-diagnostic-setting>` | Personaliza el nombre de tus parámetros de diagnóstico Azure añadiendo esta marca con un parámetro actualizado. **(Sólo se aplica al envío de logs de actividades)**                      |

¿Errores de instalación? Para conocer los casos de error más comunes, consulta la [recopilación automatizada de logs][1].

[101]: /es/integrations/guide/azure-troubleshooting/#automated-log-collection
{{% /tab %}}

{{% tab "Manual installation" (Instalación manual) %}}

Esta sección describe el proceso de configuración manual para el reenvío de logs de Azure a Datadog:

1. Crea un [centro de eventos Azure](#create-an-azure-event-hub).
2. Para reenviar logs a Datadog, configura la [función Azure de Datadog con un activador de centro de eventos](#create-the-datadog-azure-function).
3. Crea [parámetros de diagnóstico](#create-diagnostic-settings) para reenviar tus [logs de actividades](#activity-logs), tus [logs de recursos](#resource-logs) de Azure, o ambos. a tu centro de eventos.

Las siguientes instrucciones muestran una configuración inicial básica a través del portal Azure. Todos estos pasos se pueden realizar utilizando la CLI, Powershell o plantillas de recursos consultando la documentación de Azure.

#### Crear un centro de eventos Azure

##### Crear un espacio de nombres de centro de eventos

Si ya tienes un espacio de nombres de centro de eventos configurado con una cadena de conexión de centro de eventos, pasa directamente a [Añadir un centro de eventos a tu espacio de nombres de centro de eventos](#add-an-event-hub-to-your-event-hubs-namespace).

1. En el portal Azure, ve a la información general sobre [Centros de eventos][208] y haz clic en **Create** (Crear).
2. Rellena las secciones **Project Details** (Detalles del proyecto) y **Instance Details** **Detalles de la instancia** según prefieras.
  **Nota**: Si planeas recopilar [logs de recursos de Azure][209], el centro de eventos debe estar en la mismo **Localización** que el recurso del que quieres recopilar logs. Para los logs de actividades u otras fuentes de logs en toda la cuenta, puedes elegir cualquier región.
3. Haga clic en **Review + create** (Revisar + crear) para validar el recurso. Si la validación es correcta, haz clic en **Create** (Crear).

Para obtener información adicional, consulta la [guía de inicio rápido de centros de eventos Azure][201].

##### Añadir un centro de eventos a tu espacio de nombres de centro de eventos

1. En el portal Azure, ve a tu espacio de nombres de centro de eventos, nuevo o existente.
2. Haz clic en **+ Event Hub** (+ Centro de eventos).
3. Configura las pestañas **Basics** (Básico) y **Capture** (Captura), según prefieras.
4. Haz clic en **Review + create** (Revisar + crear) para validar el recurso. Si la validación es correcta, haz clic en **Create** (Crear).

##### Configurar el acceso compartido

1. En la página de detalles de tu centro de eventos, haz clic en **Shared access policies** (Políticas de acceso compartido), en la pestaña **Settings** (Configuración) a la izquierda.
2. Haz clic en **Add** (Añadir).
3. Proporciona un nombre para la política y selecciona **Listen** (Escuchar).
4. Copia el valor **Connection string-primary key** (Clave primaria de cadena de conexión) y guárdalo en un lugar seguro. Esto es necesario para permitir que la función Azure de Datadog se comunique con el centro de eventos.

{{< img src="integrations/azure/eventhub_connection_string.png" alt="Valor **Connection string-primary key** (Clave primaria de cadena de conexión) de una política de acceso compartido de un centro de eventos" popup="true" style="width:100%">}}

#### Crear la función Azure de Datadog

##### Crear una aplicación de función 

Si ya tienes una aplicación de función configurada con una cadena de conexión de centro de eventos, pasa directamente a [añadir una nueva función a tu aplicación de función utilizando la plantilla del activador de centros de eventos](#add-a-new-function-to-your-function-app-using-the-event-hub-trigger-template).

1. En el portal Azure, ve a [Información general de la aplicación de función][211] y haz clic en **Create** (Crear).
2. En la sección **Instance Details** (Detalles de la instancia), configura los siguientes parámetros:
   a. Selecciona el botón de opción **Code** (Código).
   b. En **Runtime stack** (Pila de tiempo de ejecución), selecciona `Node.js`.
   c. En **Version** (Versión), selecciona `18 LTS`.
3. Configura otros parámetros, según prefieras.
4. Haz clic en **Review + create** (Revisar + crear) para validar el recurso. Si la validación es correcta, haz clic en **Create** (Crear).

Para obtener más información, consulta el [activador de centros de eventos Azure para funciones Azure][202].

##### Configurar tu aplicación de función con la cadena de conexión de centros de eventos

1. En la página de detalles de tu aplicación de función, haz clic en **Environment variables** (Variables de entorno), en la pestaña **Settings** (Configuración) a la izquierda.
2. En la pestaña **App settings** (Configuración de la aplicación), proporciona un nombre para la cadena de conexión.
3. Pega el valor obtenido anteriormente de la [sección de configuración del acceso compartido](#configure-shared-access).
4. Haz clic en **Apply** (Aplicar).

**Nota**: Si no quieres pegar el valor de tu clave de API de Datadog directamente en el código de función, crea una variable de entorno adicional para el valor de clave de la API de Datadog.

##### Añade una nueva función a tu función de aplicación utilizando la plantilla del activador de centros de eventos.

1. Selecciona tu aplicación de función, nueva o existente, en la [información general de la aplicación de función][211].
2. En la pestaña **Functions** (Funciones), haz clic en **Create** (Crear). 
3. En el campo **Development environment** (Entorno de desarrollo), selecciona **Develop in portal** (Desarrollar en el portal).
3. En **Select a template** (Seleccionar una plantilla), elige el [activador de centros de eventos Azure][202].
4. En **Event Hub connection** (Conexión al centro de eventos), selecciona tu espacio de nombres y tu centro de eventos.
5. Haz clic en **Create** (Crear).

Para obtener más información, consulta [Empezando con funciones Azure][215].

##### Dirigir tu activador de centros de eventos hacia Datadog

1. En la página de detalles de la función de tu activador de centros de eventos, haz clic en **Code + Test** (Código + Test), en el menú lateral **Developer** (Desarrollador).
2. Añade el [código de la función Azure de Datadog][204] al archivo `index.js` de la función.
3. Añade la clave de tu API de Datadog utilizando una variable de entorno `DD_API_KEY` o cópiala en el código de función sustituyendo `<Datadog_API_KEY>` en la línea 21.
4. Si no estás utilizando el sitio Datadog US1, configura tu [sitio Datadog][207] utilizando una variable de entorno `DD_SITE` en la pestaña de configuración de tu aplicación de función o copia el parámetro del sitio en el código de función en la línea 22.
5. **Guarda** la función.
6. Haz clic en ***Integration** (Integración), en el menú lateral **Developer** (Desarrollador).
7. Haz clic en **Azure Event Hubs** (Centros de eventos Azure), en **Trigger and inputs** (Activadores y entradas).
8. Confirma que los siguientes ajustes son correctos:  
  a. **Event hub connection** (Conexión al centro de eventos) está configurado con el nombre de la variable de entorno de tu cadena de conexión.
  b. **Event parameter name* (Nombre del parámetro de evento) está configurado como `eventHubMessages`.
  c. **Event hub name** (Nombre del centro de eventos) está configurado con el nombre de tu centro de eventos.
  d. **Event hub cardinality** (Cardinalidad del centro de eventos) está configurado como `Many`. 
  e. **Event hub data type** (Tipo de datos del centro de eventos) se deja vacío.
9. Para validar tu configuración, haz clic en **Code + Test** (Código + Test), en el menú lateral **Developer** (Desarrollador).
10. Haz clic en **Test/Run** (Probar/Ejecutar) e introduce un mensaje de test con un formato JSON válido. 
11. Busca tu mensaje de test en el [Explorador de logs de Datadog][206].

#### Crear parámetros de diagnóstico

##### Logs de actividades

1. En el portal Azure, ve al [log de actividades][212].
2. Haz clic en **Export Activity Logs** (Exportar logs de actividades).
3. Haz clic en **+ Add diagnostic setting** (+ Añadir parámetro de diagnóstico).
4. En **Categories** (Categorías), selecciona las categorías de logs que quieres enviar a Datadog.
5. En **Destination details** (Detalles del destino), selecciona **Stream to an event hub** (Transferir a un centro de eventos).
6. Configura el **Espacio de nombres de centros de eventos** y el **Nombre del centro de eventos** con los nombres del espacio de nombres de centros de eventos y el nombre del centro de eventos, respectivamente, utilizados para crear tu activador de centros de eventos.
7. Para **Nombre de política de centro de eventos**, puedes seleccionar `RootManageSharedAccessKey`, si prefieres. **Opcionalmente**, crea tu propia política de acceso compartido en el nivel del **espacio de nombres** del centro de eventos:
  a. En el **espacio de nombres** del centro de eventos, haz clic en **Shared access policies** (Políticas de acceso compartido), en la pestaña **Settings** (Configuración) a la izquierda.
  Haz clic en **Add** (Añadir).
  Proporciona un nombre para la política y selecciona **Send** (Enviar) or **Manage** (Gestionar).
  Haz clic en **Save** (Guardar).
  e. Vuelve a la página de los parámetros de diagnóstico y selecciona tu política de acceso compartido para el campo **Event hub policy name** (Nombre de la política del centro de eventos). Es posible que tengas que actualizar la página.
  **Nota**: Para obtener más información, consulta la [autorización del acceso a recursos de centros de eventos utilizando firmas de acceso compartido][214].
8. Verifica que la configuración de tus logs de actividades es correcta en el [Explorador de logs de Datadog][206].

Para obtener más información, consulta [Parámetros de diagnóstico en Azure Monitor][213].

##### Logs de recursos

Configura tus recursos Azure para que reenvíen sus logs al centro de eventos utilizando un [parámetro de diagnóstico][203].

1. En el portal Azure, ve al recurso que quieres que reenvíe logs a Datadog.
2. En la sección **Monitoring** (Monitorización) de la hoja de recursos, haz clic en **Diagnostic settings** (Parámetros de diagnóstico).
3. Haz clic en **Add diagnostic setting** (Añadir parámetro de diagnóstico).
4. Proporciona un nombre y selecciona las fuentes de los datos que quieres reenviar.
5. En **Destination details** (Detalles del destino), selecciona **Stream to an event hub** (Transferir a un centro de eventos).
6. Configura el **Espacio de nombres de centros de eventos** y el **Nombre del centro de eventos** con los nombres del espacio de nombres de centros de eventos y el nombre del centro de eventos, respectivamente, utilizados para crear tu activador de centros de eventos.
7. Para **Nombre de política de centro de eventos**, puedes seleccionar `RootManageSharedAccessKey`, si prefieres. **Opcionalmente**, crea tu propia política de acceso compartido en el nivel del **espacio de nombres** del centro de eventos:
  a. En el **espacio de nombres** del centro de eventos, haz clic en **Shared access policies** (Políticas de acceso compartido), en la pestaña **Settings** (Configuración) a la izquierda.
  Haz clic en **Add** (Añadir).
  Proporciona un nombre para la política y selecciona **Send** (Enviar) or **Manage** (Gestionar).
  Haz clic en **Save** (Guardar).
  e. Vuelve a la página de los parámetros de diagnóstico y selecciona tu política de acceso compartido para el campo **Event hub policy name** (Nombre de la política del centro de eventos). Es posible que tengas que actualizar la página.
  **Nota**: Para obtener más información, consulta la [autorización del acceso a recursos de centros de eventos utilizando firmas de acceso compartido][214].
8. Haz clic en **Save** (Guardar).
9. Verifica que la configuración de tus logs de este recurso es correcta en el [Explorador de logs de Datadog][206].

Para obtener más información, consulta [Parámetros de diagnóstico en Azure Monitor][213].

[201]: https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-create
[202]: https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-event-hubs-trigger
[203]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/diagnostic-settings
[204]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/activity_logs_monitoring/index.js
[205]: https://app.datadoghq.com/organization-settings/api-keys
[206]: https://app.datadoghq.com/logs
[207]: https://docs.datadoghq.com/es/getting_started/site/
[208]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.EventHub%2Fnamespaces
[209]: https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/tutorial-resource-logs
[210]: https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function
[211]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[212]: https://portal.azure.com/#view/Microsoft_Azure_Monitoring/AzureMonitoringBrowseBlade/~/activityLog
[213]: https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?WT.mc_id=Portal-Microsoft_Azure_Monitoring
[214]: https://learn.microsoft.com/en-us/azure/event-hubs/authorize-access-shared-access-signature
[215]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-get-started
{{% /tab %}}

{{% tab "Blob Storage" (Almacenamiento de blobs)%}}

{{% site-region region="us3,us5,gov,ap1" %}}
<div class="alert alert-warning">
  Esto no es compatible con el sitio Datadog {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

Datadog recomienda utilizar la configuración de centros de eventos para la recopilación de logs de Azure. Sin embargo, también puedes seguir los pasos de esta sección para reenviar todos tus logs de servicios de aplicación de Azure desde el almacenamiento de blobs de Azure:

1. Si aún no has configurado el [almacenamiento de blobs de Azure][301], utiliza uno de los siguientes métodos para empezar: 
   - [Portal Azure][302]
   - [Explorador del almacenamiento de Azure][303]
   - [CLI de Azure][304]
   - [Powershell][305]
2. Configura la función Azure de Datadog para reenviar logs desde el almacenamiento de blobs, siguiendo las instrucciones que se indican a continuación.
3. Configura tus servicios de aplicación de Azure para [reenviar logs al almacenamiento de blobs][306].

##### Crear una función de aplicación

Si ya tienes una aplicación de función configurada para este fin, pasa directamente a [añadir una nueva función a tu aplicación de función utilizando la plantilla del activador de centros de eventos](#add-a-new-function-to-your-function-app-using-the-azure-blob-storage-trigger-template).

1. En el portal Azure, ve a [Información general de la aplicación de función][309] y haz clic en **Create** (Crear).
2. En la sección **Instance Details** (Detalles de la instancia), configura los siguientes parámetros:
  a. Selecciona el botón de opción **Code** (Código).
  b. En **Runtime stack** (Pila de tiempo de ejecución), selecciona `Node.js`.
  c. En **Version** (Versión), selecciona `18 LTS`.
  d. En **Operating System** (Sistema operativo), selecciona `Windows`.  
3. Configura otros parámetros, según prefieras.
4. Haz clic en **Review + create** (Revisar + crear) para validar el recurso. Si la validación es correcta, haz clic en **Create** (Crear).

##### Añade una nueva función a tu aplicación de función utilizando la plantilla del activador del almacenamiento de blobs.

1. Selecciona tu aplicación de función, nueva o existente, en la [información general de la aplicación de función][309].
2. En la pestaña **Functions** (Funciones), haz clic en **Create** (Crear). 
3. En el campo **Development environment** (Entorno de desarrollo), selecciona **Develop in portal** (Desarrollar en el portal).
4. En **Select a template** (Seleccionar una plantilla), elige el [activador del almacenamiento de blobs de Azure][313].
5. Selecciona tu **conexión de cuenta de almacenamiento**.
   **Nota**: Para obtener más información, consulta [Configurar una cadena de conexión para una cuenta de almacenamiento de Azure][311].
6. Haz clic en **Create** (Crear).

Para obtener más información, consulta [Empezando con funciones Azure][307].

##### Dirigir tu activador de almacenamiento de blobs hacia Datadog

1. En la página de detalles de la función de tu activador de centros de eventos, haz clic en **Code + Test** (Código + Test), en el menú lateral **Developer** (Desarrollador).
2. Añade el [código de la función Azure de Datadog][308] al archivo `index.js` de la función.
3. Añade la clave de tu API de Datadog utilizando una variable de entorno `DD_API_KEY` o cópiala en el código de función sustituyendo `<DATADOG_API_KEY>` en la línea 21.
4. Si no estás utilizando el sitio Datadog US1, configura tu [sitio Datadog][312] utilizando una variable de entorno `DD_SITE` en la pestaña de configuración de tu aplicación de función o copia el parámetro del sitio en el código de función en la línea 21.
5. **Guarda** la función.
6. Haz clic en ***Integration** (Integración), en el menú lateral **Developer** (Desarrollador).
7. Haz clic en **Azure Blob Storage** (Almacenamiento de blobs de Azure), en **Trigger and inputs** (Activadores y entradas).
8. Configura el **Blob Parameter Name* (Nombre del parámetro de blob) como `blobContent` y haz clic en **Save** (Guardar).
9. Verifica que la configuración de tus logs de este recurso es correcta en el [Explorador de logs de Datadog][310].

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

## Archivado de logs

El archivado de logs en el almacenamiento de blobs de Azure requiere un registro de aplicación, incluso si utilizas la integración nativa Azure. Para archivar logs en el almacenamiento de blobs de Azure, sigue las instrucciones de configuración de la integración mediante un registro de aplicación. Los registros de aplicación creados con fines de archivado no necesitan tener asignado el rol `Monitoring Reader`.

Una vez configurado el registro de aplicación, puedes [crear un archivo de logs][3] que escriba en el almacenamiento de blobs de Azure.

**Nota**: Si tu bucket de almacenamiento se encuentra en una suscripción que se monitoriza a través de la integración nativa Azure, se mostrará una advertencia sobre la redundancia del registro de aplicación en el cuadro de integración de Azure. Puedes ignorar esta advertencia.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/site/
[2]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/platform-logs-overview
[3]: /es/logs/log_configuration/archives/
[4]: /es/logs/guide/azure-native-logging-guide/
[5]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/overview