---
further_reading:
- link: /security/default_rules/#cat-cloud-siem-log-detection
  tag: Documentación
  text: Explore las reglas de detección predeterminadas de Cloud SIEM
- link: /security/cloud_siem/triage_and_investigate/investigate_security_signals
  tag: Documentación
  text: Obtenga información sobre el Explorador de señales de seguridad
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule
  tag: Documentación
  text: Crear reglas de detección personalizadas
title: Guía de configuración de Azure para Cloud SIEM
---
## Descripción general {#overview}

Cloud SIEM aplica reglas de detección a todos los registros procesados en Datadog para detectar amenazas, como un ataque dirigido, una IP listada en inteligencia de amenazas comunicándose con sus sistemas o una modificación insegura de recursos. Las amenazas se muestran como Security Signals en el explorador de Security Signals para su clasificación.

Esta guía le explica cómo configurar Microsoft Azure para enviar registros a Datadog, de modo que pueda comenzar a detectar amenazas en los registros de su plataforma Azure.

<div class="alert alert-info">La integración Azure Native (disponible para clientes en el sitio US3 de Datadog) tiene diferentes instrucciones de configuración de recopilación de registros. Si está utilizando la integración Azure Native, seleccione <strong>US3</strong> en el menú desplegable Datadog Site y siga las instrucciones en <a href="https://docs.datadoghq.com/integrations/guide/azure-native-integration/#log-collection">Recopilación de registros de Microsoft Azure</a>. </div>

{{< tabs >}}
{{% tab "Instalación automatizada" %}}

Haga clic en el botón a continuación y complete el formulario en Azure portal. Después de completar el formulario, se implementan los recursos de Azure necesarios para enviar registros de actividad a su cuenta de Datadog.

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdatadog-serverless-functions%2Frefs%2Fheads%2Fmaster%2Fazure%2Feventhub_log_forwarder%2Fparent_template.json)

1. Seleccione un grupo de recursos existente o cree uno nuevo.
1. Seleccione una región.
1. Seleccione **true** para **Send Activity Logs**.
1. Ingrese su clave de API de Datadog.
1. Ingrese nombres para sus recursos.
1. Haga clic en {{< ui >}}Create + review{{< /ui >}}.
1. Después de que la validación sea exitosa, haga clic en {{< ui >}}Create{{< /ui >}}.

Una vez que la implementación se complete correctamente, vaya al [Explorador de registros][1] e ingrese `service:azure` en la consulta de búsqueda para visualizar sus registros de Azure.


[1]: https://app.datadoghq.com/logs

{{% /tab %}}

{{% tab "Instalación manual" %}}

Esta sección lo guía a través de los pasos de instalación manual para que pueda enviar registros de la plataforma Azure a Datadog:

1. [Cree un grupo de recursos](#create-a-resource-group)
1. [Cree un espacio de nombres de Event Hubs](#create-an-event-hubs-namespace)
1. [Cree un Event Hub de Azure](#create-an-event-hub)
1. [Cree una Function App de Azure](#create-an-azure-function-app)
1. [Agregue una nueva función a su Function App](#add-a-new-function-to-your-function-app)
1. [Reenvíe los registros de los servicios de Azure al Event Hub](#forward-azure-services-logs-to-event-hub)

### Cree un grupo de recursos {#create-a-resource-group}

Si desea utilizar un grupo de recursos existente, pase a Cree un espacio de nombres de Event Hubs.

1. Vaya a la página [Grupos de recursos de Azure][1].
1. Haga clic en {{< ui >}}Create{{< /ui >}}.
1. Ingrese un nombre para el grupo de recursos.
1. Opcionalmente, haga clic en {{< ui >}}Next: Tags{{< /ui >}} si desea agregar etiquetas.
1. Haga clic en {{< ui >}}Review + create{{< /ui >}}.
1. Después de que la validación sea exitosa, haga clic en {{< ui >}}Create{{< /ui >}}.

### Cree un espacio de nombres de Event Hubs {#create-an-event-hubs-namespace}

1. Vaya a la página [Azure Event Hubs][2].
1. Haga clic en {{< ui >}}Create{{< /ui >}}.
1. En el menú desplegable **Resource group**, seleccione el grupo de recursos al que desea agregar el Event Hub.
1. Ingrese un nombre para el espacio de nombres.
1. Seleccione una ubicación para el espacio de nombres.
     **Nota**: El Event Hub debe estar en la misma Location que el recurso desde el cual desea enviar registros. Para registros de actividad u otras fuentes de registro de toda la cuenta, puede elegir cualquier región.
1. Seleccione un nivel de precios.
1. Deje las unidades de rendimiento (para el nivel estándar) o las unidades de procesamiento (para el nivel premium) tal como están.
1. Haga clic en {{< ui >}}Review + create{{< /ui >}}.
1. Una vez que la validación se realice correctamente, haga clic en {{< ui >}}Create{{< /ui >}}.
1. Una vez que la implementación se complete correctamente, haga clic en {{< ui >}}Go to resource{{< /ui >}}.

### Cree un Event Hub {#create-an-event-hub}

1. En el espacio de nombres de Event Hubs que acaba de crear, haga clic en {{< ui >}}\+ Event Hub{{< /ui >}}.
1. Ingrese un nombre para el Event Hub.
1. Opcionalmente, configure el recuento de particiones y las opciones de retención.
1. Haga clic en {{< ui >}}Review + create{{< /ui >}}.
1. Una vez que la validación se realice correctamente, haga clic en {{< ui >}}Create{{< /ui >}}.

### Cree una Function App de Azure {#create-an-azure-function-app}
Cree una nueva Function App. Si está utilizando una Function App existente, vaya a Agregue una nueva función a su Function App.

1. Vaya a [Function App][3].
1. Haga clic en {{< ui >}}Create{{< /ui >}}.
1. Seleccione un grupo de recursos para la Function App.
1. Ingrese un nombre para la Function App.
1. Deje seleccionada la opción de implementar como código.
1. En el menú desplegable **Runtime stack**, seleccione {{< ui >}}Node.js{{< /ui >}}.
1. Seleccione una región para su Function App.
1. Seleccione un sistema operativo y un tipo de plan.
1. Haga clic en {{< ui >}}Next: Storage{{< /ui >}}.
1. Seleccione una cuenta de almacenamiento en el menú desplegable.
1. Haga clic en {{< ui >}}Review + create{{< /ui >}}.
1. Una vez que la validación se realice correctamente, haga clic en {{< ui >}}Create{{< /ui >}}.
1. Una vez que la implementación se complete correctamente, haga clic en {{< ui >}}Create a function{{< /ui >}}.

### Agregue una nueva función a su Function App {#add-a-new-function-to-your-function-app}

1. Vaya a la Function App si está utilizando una existente. Haga clic en {{< ui >}}Functions{{< /ui >}} en el menú lateral izquierdo.
1. Haga clic en {{< ui >}}Create{{< /ui >}}.
1. Seleccione {{< ui >}}Azure Event Hub trigger{{< /ui >}}.
1. Ingrese un nombre para la nueva función.
1. En **Conexión de Event Hub**, haga clic en {{< ui >}}New{{< /ui >}}.
1. En el menú desplegable **Conexión de Event Hub**, seleccione el centro de eventos que creó anteriormente.
1. Haga clic en {{< ui >}}OK{{< /ui >}}.
1. En **Event Hub name**, ingrese el nombre del Event Hub que creó anteriormente.
1. Haga clic en {{< ui >}}Create{{< /ui >}}.

### Agregue la función de Azure de Datadog {#add-the-datadog-azure-function}

<br />**Nota**: Los pasos descritos a continuación se basan en Azure Functions Programming Model v3. El [código de la función de Azure][8] más reciente de Datadog se ha actualizado para admitir Azure Functions Programming Model v4. Si necesita orientación sobre cómo implementar la versión compatible con v4 o tiene preguntas sobre las diferencias entre v3 y v4, comuníquese con el soporte técnico de Datadog para obtener ayuda.

1. En la nueva función, seleccione {{< ui >}}Code + Test{{< /ui >}} en el menú lateral izquierdo.
1. Copie y pegue el [código de función de Datadog-Azure][4] en su archivo `index.js`.
1. Reemplace `<DATADOG_API_KEY>` con su Datadog API en la línea 22 del código de la función.
1. Si no está utilizando el sitio Datadog US1, reemplace `DD_SITE` con su parámetro [sitio de Datadog][5] en la línea 23 del código de la función.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.
1. Haga clic en {{< ui >}}Integrations{{< /ui >}} en el menú lateral izquierdo.
1. Haga clic en {{< ui >}}Azure Event Hubs{{< /ui >}}.
1. Establezca `Event parameter name` en `eventHubMessages`.
1. `Event Hub Cardinality` debe establecerse en `Many`.
1. Establezca `Event Hub Data Type` como vacío.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.
1. Verifique que su configuración sea correcta ejecutando la función y luego revisando el explorador de registros de Datadog para ver el mensaje de prueba. El evento de registro de prueba debe estar en formato JSON válido. Por ejemplo:
    ```
    {
        is_test:true,
        name: "Datadog Test"
    }
    ```

### Reenviar registros de servicios de Azure a Event Hub {#forward-azure-services-logs-to-event-hub}

#### Reenviar registros de actividad a Event Hub {#forward-activity-logs-to-event-hub}

1. Navegue a [Azure Activity log][6].
1. Haga clic en {{< ui >}}Export Activity Logs{{< /ui >}}.
1. Haga clic en {{< ui >}}Add diagnostic settings{{< /ui >}}.
1. Ingrese un nombre para la configuración de diagnóstico.
1. Seleccione las categorías de registros que desea enviar a Datadog.
1. Seleccione {{< ui >}}Stream to an event hub{{< /ui >}}.
1. Seleccione el espacio de nombres de Event Hub creado anteriormente.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

#### Reenviar registros de recursos a Event Hub {#forward-resource-logs-to-event-hub}

1. Navegue al recurso desde el cual desea enviar registros de recursos.
1. En **Monitor** en el menú de la izquierda, haga clic en {{< ui >}}Diagnostic settings{{< /ui >}}.
1. Haga clic en {{< ui >}}Add diagnostic setting{{< /ui >}}.
1. Ingrese un nombre para la configuración de diagnóstico.
1. Seleccione {{< ui >}}allLogs{{< /ui >}}.
1. En la sección **Destination details**, seleccione {{< ui >}}Stream to an event hub{{< /ui >}}.
1. Seleccione el espacio de nombres de Event Hub creado anteriormente.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

Vaya a [Log Explorer][7] e ingrese `service:azure` en la consulta de búsqueda para visualizar sus registros de Azure.

[1]: https://portal.azure.com/#view/HubsExtension/BrowseResourceGroups
[2]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.EventHub%2Fnamespaces
[3]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[4]: https://github.com/DataDog/datadog-serverless-functions/blob/aws-dd-forwarder-4.5.0/azure/activity_logs_monitoring/index.js
[5]: https://docs.datadoghq.com/es/getting_started/site/
[6]: https://portal.azure.com/#view/Microsoft_Azure_Monitoring/AzureMonitoringBrowseBlade/~/activityLog
[7]: https://app.datadoghq.com/logs
[8]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/activity_logs_monitoring/index.js

{{% /tab %}}
{{< /tabs >}}

## Utilice Cloud SIEM para clasificar los Security Signals {#use-cloud-siem-to-triage-security-signals}

Cloud SIEM aplica reglas de detección preconfiguradas a todos los registros procesados, incluidos los registros de la plataforma Azure que acaba de configurar. Cuando se detecta una amenaza con una regla de detección, se genera una Security Signal que puede visualizarse en Security Signals Explorer.

- Vaya a Cloud SIEM Signals Explorer para visualizar y clasificar las amenazas. Consulte Security Signals Explorer para obtener más detalles.
- Vea las reglas de detección predefinidas que se aplican a sus registros.
- Cree nuevas reglas para detectar amenazas que coincidan con su caso de uso específico.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}