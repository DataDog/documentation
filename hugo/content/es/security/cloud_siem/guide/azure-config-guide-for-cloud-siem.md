---
further_reading:
- link: /security/default_rules/#cat-cloud-siem-log-detection
  tag: Documentación
  text: Explorar las reglas de detección por defecto de Cloud SIEM
- link: /security/cloud_siem/investigate_security_signals
  tag: Documentación
  text: Más información sobre Security Signals Explorer
- link: /security/cloud_siem/detection_rules/
  tag: Documentación
  text: Crear nuevas reglas de detección
title: Guía de configuración de Azure para Cloud SIEM
---

## Información general

Cloud SIEM aplica reglas de detección a todos los logs procesados en Datadog para detectar amenazas, como un ataque dirigido, una IP incluida en la lista de amenazas que se comunica con tus sistemas o una modificación de recursos insegura. Las amenazas aparecen como señales de seguridad en el [Security Signals Explorer][1] para su clasificación.

Con esta guía, seguirás la configuración de Microsoft Azure para enviar logs a Datadog para que puedas empezar a detectar amenazas en tus logs de Azure Platform.

<div class="alert alert-info">La integración de Azure Native (disponible para clientes en el sitio US3 de Datadog) tiene diferentes instrucciones de configuración de la recopilación de logs. Si utilizas la integración Azure Native, selecciona <strong>US3</strong> en el menú desplegable del sitio de Datadog y sigue las instrucciones de <a href="https://docs.datadoghq.com/logs/guide/azure-native-logging-guide/">recopilación de logs de Microsoft Azure</a>. </div>

{{< tabs >}}
{{% tab "Instalación automatizada" %}}

Haz clic en el botón de abajo y rellena el formulario en el portal de Azure. Después de completar el formulario, se desplegan para ti los recursos de Azure necesarios para enviar los logs de actividad en tu cuenta de Datadog.

[![Desplegar en Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdatadog-serverless-functions%2Frefs%2Fheads%2Fmaster%2Fazure%2Feventhub_log_forwarder%2Fparent_template.json)

1. Selecciona un grupo de recursos existente o crea uno nuevo.
1. Selecciona una región.
1. Selecciona **true** para **Send Activity Logs** (Enviar logs de actividad).
1. Introduce tu clave de API Datadog.
1. Introduce nombres para tus recursos. Consulta [Parámetros opcionales][1] para obtener más información.
1. Haz clic en **Create + review** (Crear + revisar).
1. Una vez superada la validación, haz clic en **Create** (Crear).

Una vez que el despliegue se haya completado correctamente, ve a [Log Explorer][2] e introduce `service:azure` en la consulta de búsqueda para ver tus logs de Azure.

[1]: /es/logs/guide/azure-logging-guide/?tab=automatedinstallation#optional-parameters
[2]: https://app.datadoghq.com/logs

{{% /tab %}}

{{% tab "Instalación manual" %}}

La sección te guía a través de los pasos de instalación manual para que puedas enviar logs de Azure Platform a Datadog:

1. [Crear un grupo de recursos](#create-a-resource-group)
1. [Crear un espacio de nombres de centros de eventos](#create-an-event-hubs-namespace)
1. [Crear un centro de eventos de Azure](#create-an-event-hub)
1. [Crear una aplicación de función de Azure](#create-an-azure-function-app)
1. [Añade una nueva función a tu aplicación de función ](#add-a-new-function-to-your-function-app)
1. [Reenviar logs de servicios de Azure al centro de eventos](#forward-azure-services-logs-to-event-hub)

### Crear un grupo de recursos

Si deseas utilizar un grupo de recursos existente, pase a Create an Event Hubs namespace (Crear un espacio de nombres de centros de eventos).

1. Ve a la página [Azure Resource groups][1] (Grupos de recursos de Azure).
1. Haz clic en **Create** (Crear).
1. Introduce un nombre para el grupo de recursos.
1. Opcionalmente, haz clic en **Next: Tags** (Siguiente: etiquetas) si deseas añadir etiquetas (tags).
1. Haz clic en **Review + create** (Revisar + crear).
1. Una vez superada la validación, haz clic en **Create** (Crear).

### Crear un espacio de nombres de centro de eventos

1. Ve a [Azure Event Hubs][2] (Centros de eventos de Azure).
1. Haz clic en **Create** (Crear).
1. En el menú desplegable **Resource group** (Grupo de recursos), selecciona el grupo de recursos al que deseas añadir el centro de eventos.
1. Introduce un nombre para el espacio de nombres.
1. Selecciona una localización para el espacio de nombres.
     **Nota**: El centro de eventos debe estar en la misma localización que el recurso desde el que deseas enviar logs. Para los logs de actividad u otras fuentes de log de toda la cuenta, puedes elegir cualquier región.
1. Selecciona un nivel de precios.
1. Deja las unidades de rendimiento (para el nivel estándar) o unidades de procesamiento (para el nivel premium) como están.
1. Haz clic en **Review + create** (Revisar + crear).
1. Una vez superada la validación, haz clic en **Create** (Crear).
1. Una vez completado el despliegue con éxito, haz clic en **Go to resource** (Ir al recurso).

### Crear un centro de eventos

1. En el espacio de nombres de centros de eventos que acabas de crear, haz clic en **+ Event Hub** (+ Centro de eventos).
1. Introduce un nombre para el centro de eventos.
1. Opcionalmente, configura el recuento de particiones y las opciones de retención.
1. Haz clic en **Review + create** (Revisar + crear).
1. Una vez superada la validación, haz clic en **Create** (Crear).

### Crear una aplicación de función de Azure
Crea una nueva aplicación de función. Si estás utilizando una aplicación de función existente, ve a Add a new function to your Function App (Añadir una nueva función a tu aplicación de función).

1. Navega hasta [Function App][3] (Aplicación de función).
1. Haz clic en **Create** (Crear).
1. Selecciona un grupo de recursos para la aplicación de función.
1. Introduce un nombre para la aplicación de función.
1. Deja la selección para desplegar en código.
1. En el menú desplegable **Runtime stack** (Stack de tiempo de ejecución), selecciona **Node.js**.
1. Selecciona una región para tu aplicación de función.
1. Selecciona un sistema operativo y un tipo de plan.
1. Haz clic en **Next: Storage** (Siguiente: almacenamiento).
1. Selecciona una cuenta de almacenamiento en el menú desplegable.
1. Haz clic en **Review + create** (Revisar + crear).
1. Una vez superada la validación, haz clic en **Create** (Crear).
1. Una vez completado el despliegue con éxito, haz clic en **Create a function** (Crear una función).

### Añade una nueva función a tu aplicación de función 

1. Navega hasta la aplicación de función si utilizas una ya existente. Haz clic en **Functions** (Funciones) en el menú de la izquierda.
1. Haz clic en **Create** (Crear).
1. Selecciona **Azure Event Hub trigger** (Desencadenante del Centro de eventos de Azure).
1. Introduce un nombre para la nueva función.
1. En **Event Hub connection** (Conexión de centro de evento), haz clic en **New** (Nuevo).
1. En el menú desplegable **Event Hub connection** (Conexión de centro de eventos), selecciona el centro de eventos que creaste anteriormente.
1. Haz clic en **OK**.
1. En **Event Hub name** (Nombre de centro de eventos), introduce el nombre del centro de eventos que creaste anteriormente.
1. Haz clic en **Create** (Crear).

### Añadir la función de Datadog Azure

1. En la nueva función, selecciona **Code + Test** (Código + Test) en el menú de la izquierda.
1. Copia y pega el [código de función Datadog-Azure][4] en tu archivo `index.js`.
1. Sustituye `<DATADOG_API_KEY>` por tu API de Datadog en la línea 22 del código de función.
1. Si no utilizas el sitio US1 de Datadog, sustituye `DD_SITE` por tu parámetro del [sitio de Datadog][5] en la línea 23 del código de función.
1. Haz clic en **Save** (Guardar).
1. Haz clic en **Integrations** (Integraciones) en el menú de la izquierda.
1. Haz clic en **Azure Event Hubs** (Centro de eventos de Azure).
1. Configura `Event parameter name` en `eventHubMessages`.
1. `Event Hub Cardinality` debe fijarse en `Many`.
1. Establece `Event Hub Data Type` en vacío.
1. Haz clic en **Save** (Guardar).
1. Verifica que tu configuración es correcta ejecutando la función y comprobando después el Datadog Log Explorer para el mensaje de test. El evento de log de test debe tener un formato JSON válido. Por ejemplo:
    ```
    {
        is_test:true,
        name: "Datadog Test"
    }
    ```

### Forward Azure services logs to Event Hub

#### Forward Activity logs to Event Hub

1. Navega hasta [Azure Activity Log][6] (Log de actividad de Azure).
1. Haz clic en **Export Activity Logs** (Exportar logs de actividades).
1. Haz clic en **Add diagnostic setting** (Añadir parámetro de diagnóstico).
1. Introduce un nombre para el ajuste de diagnóstico.
1. Selecciona las categorías de logs que deseas enviar a Datadog.
1. Selecciona **Stream to an event hub** (Flujo a un centro de eventos).
1. Selecciona el espacio de nombres del centro de eventos creado anteriormente.
1. Haz clic en **Save** (Guardar).

#### Reenviar logs de recurso al centro de eventos

1. Navega hasta el recurso desde el que deseas enviar los logs de recurso.
1. En **Monitor** en el menú lateral izquierdo, haz clic en **Diagnostic settings** (Configuración de diagnóstico).
1. Haz clic en **Add diagnostic setting** (Añadir parámetro de diagnóstico).
1. Introduce un nombre para el ajuste de diagnóstico.
1. Selecciona **allLogs**.
1. En **Destination details** (Detalles del destino), selecciona **Stream to an event hub** (Flujo a un centro de eventos).
1. Selecciona el espacio de nombres del centro de eventos creado anteriormente.
1. Haz clic en **Save** (Guardar).

Ve a [Log Explorer][7] e introduce `service:azure` en la consulta de búsqueda para ver tus logs de Azure.

[1]: https://portal.azure.com/#view/HubsExtension/BrowseResourceGroups
[2]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.EventHub%2Fnamespaces
[3]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[4]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/activity_logs_monitoring/index.js
[5]: https://docs.datadoghq.com/es/getting_started/site/
[6]: https://portal.azure.com/#view/Microsoft_Azure_Monitoring/AzureMonitoringBrowseBlade/~/activityLog
[7]: https://app.datadoghq.com/logs

{{% /tab %}}
{{< /tabs >}}

## Usar Cloud SIEM para clasificar señales de seguridad

Cloud SIEM aplica reglas de detección predefinidas a todos los logs procesados, incluidos los logs de Azure Platform que acabas de configurar. Cuando se detecta una amenaza con una regla de detección, se genera una señal de seguridad que se puede ver en el Security Signals Explorer.

- Vaya al Cloud SIEM Signals Explorer para ver y clasificar las amenazas. Consulta Security Signals Explorer para obtener más información.
- Consulta las reglas de detección predefinidas que se aplican a tus logs.
- Cree nuevas reglas para detectar amenazas que coincidan con tu caso de uso específico.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}