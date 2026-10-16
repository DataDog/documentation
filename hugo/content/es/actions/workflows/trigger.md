---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /es/workflows/trigger
- /es/service_management/workflows/trigger
description: Aprenda a activar flujos de trabajo de forma manual o automática desde
  Dashboard, Monitors, Security Signals y otras fuentes.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/datadog-automation-rules
  tag: Blog
  text: Responda instantáneamente a los cambios en sus datos con las reglas de automatización
    de Datadog
- link: /getting_started/workflow_automation/
  tag: Documentación
  text: Introducción a Workflow Automation
- link: /actions/workflows/access_and_auth/#workflow-identity
  tag: Documentación
  text: Obtenga más información sobre la identidad utilizada para ejecutar un flujo
    de trabajo
- link: dashboards
  tag: Documentación
  text: Obtenga más información sobre cómo configurar un Dashboard
- link: /security
  tag: Documentación
  text: Obtenga más información sobre Security Signals.
- link: monitors
  tag: Documentación
  text: Obtenga más información sobre Monitors.
- link: /security/cloud_security_management/workflows
  tag: Documentación
  text: Automatice Security Workflows con Workflow Automation
title: Active un flujo de trabajo.
---
Puede activar un flujo de trabajo de forma manual o automática, y un flujo de trabajo puede tener múltiples activadores. Esto le permite activar un flujo de trabajo desde una variedad de fuentes diferentes, como un Datadog Monitor y un Datadog Dashboard.

Un flujo de trabajo se ejecuta con la identidad de su propietario, el usuario que activó la ejecución o una cuenta de servicio asociada. Los activadores que se disparan sin un usuario, como los horarios y los webhooks, requieren al propietario o una cuenta de servicio. Para obtener más información, consulte [Identidad del flujo de trabajo][1].

{{< img src="actions/workflows/trigger/multiple-triggers.png" alt="Un flujo de trabajo con múltiples activadores" style="width:100%;" >}}

## Activadores manuales {#manual-triggers}

Para activar un flujo de trabajo manualmente:
1. Desde la página del flujo de trabajo, haga clic en {{< ui >}}Run{{< /ui >}}.
1. Ingrese los valores para las variables de activador existentes.
1. Cuando esté listo para ejecutar el flujo de trabajo, haga clic en {{< ui >}}Save & Run{{< /ui >}}.

## Activadores de Dashboard {#dashboard-triggers}

Para activar un flujo de trabajo desde un Dashboard, agregue el widget {{< ui >}}Run Workflow{{< /ui >}}:
1. Desde su Dashboard, haga clic en {{< ui >}}Add Widget{{< /ui >}}.
1. Busque `workflows` y agregue el widget {{< ui >}}Run Workflow{{< /ui >}}.
1. En {{< ui >}}Select the workflow{{< /ui >}}, busque su flujo de trabajo en el menú desplegable. Solo los flujos de trabajo publicados con activadores de Dashboard aparecen en la lista.
1. Asigne las variables de plantilla del Dashboard a los parámetros de entrada del flujo de trabajo. Esto permite que los valores de las variables de plantilla de su Dashboard se asignen directamente a los parámetros de entrada cuando ejecuta el flujo de trabajo.
1. Ingrese un título para el widget y haga clic en {{< ui >}}Save{{< /ui >}}.

Para ejecutar el flujo de trabajo:
1. Haga clic en {{< ui >}}Run Workflow{{< /ui >}} en el widget de su Dashboard.
1. En {{< ui >}}Execution parameters{{< /ui >}}, cualquier variable de plantilla que haya asignado a las entradas del flujo de trabajo se completa automáticamente. Ingrese los valores para cualquier parámetro de ejecución no asignado, o edite los valores existentes si es necesario.
1. Haga clic en {{< ui >}}Run{{< /ui >}} para ejecutar el flujo de trabajo.

## Activadores de Monitor {#monitor-triggers}

### Agregue un activador de Monitor a su flujo de trabajo {#add-a-monitor-trigger-to-your-workflow}

1. Agregue un activador de Monitor a su flujo de trabajo:
   - Si su flujo de trabajo no tiene activadores, haga clic en {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}Monitor{{< /ui >}}.
   - Si su flujo de trabajo ya tiene uno o más activadores y está agregando el Monitor como un activador adicional, haga clic en el icono {{< ui >}}Add Trigger{{< /ui >}} (rayo) y seleccione {{< ui >}}Monitor{{< /ui >}}.
1. Asegúrese de que el activador esté conectado a un paso en el flujo de trabajo. Puede conectar el activador a un paso haciendo clic y arrastrando el icono de más ({{< ui >}}\+{{< /ui >}}) debajo del activador.
1. Haga clic en el activador y tome nota del {{< ui >}}Mention handle{{< /ui >}}.
1. Los activadores de Monitor están configurados para activarse automáticamente de forma predeterminada. Si no desea que el flujo de trabajo se active automáticamente, desactive la opción {{< ui >}}Automatic triggering{{< /ui >}}.
1. Guarde su flujo de trabajo.
1. Haga clic en {{< ui >}}Publish{{< /ui >}} para publicar su flujo de trabajo. Los flujos de trabajo no se ejecutan automáticamente hasta que los haya publicado. Los flujos de trabajo publicados generan costos basados en las ejecuciones del flujo de trabajo. Para obtener más información, consulte la [página de precios de Datadog][11].

### Agregue el flujo de trabajo a su Monitor {#add-the-workflow-to-your-monitor}

1. Navegue a la [página de **Monitors**][2] en Datadog.
1. Busque el Monitor que desea usar para activar el flujo de trabajo y edítelo, o cree un Monitor nuevo.
1. En la sección {{< ui >}}Configure notifications & automations{{< /ui >}}, haga clic en {{< ui >}}\+ Add Workflow{{< /ui >}}.
1. Utilice el nombre de mención del flujo de trabajo para buscar su flujo de trabajo y selecciónelo en el menú desplegable. Solo los flujos de trabajo con activadores de Monitor aparecen en la lista.<br>Aparece una mención para el Monitor en el campo de mensaje de notificación, con el formato `@workflow-name` si no requiere parámetros de entrada o `@workflow-name(param="")` si requiere parámetros de entrada.
1. Si el flujo de trabajo requiere parámetros de entrada:
    1. Haga clic en {{< ui >}}Configure Inputs{{< /ui >}} junto al nombre y el ID del Monitor.
        {{< img src="actions/workflows/trigger/monitor-configure-inputs-arrow.png" alt="Un flujo de trabajo adjunto con un enlace Configure Inputs disponible" style="width:100%;" >}}
    1. Enter values for the input parameters.<br>**Note**: Values can include monitor message template variables. To see a list of available variables, click {{< ui >}}Use Message Template Variables{{< /ui >}} in the upper-right of the {{< ui >}}Configure notifications & automations{{< /ui >}} section.
    <br>The parameters populate in the mention within the notification message field.<br>For example, if you configure a workflow named `@workflow-test-inputs` to have the following parameters:
        {{< img src="actions/workflows/trigger/monitor-configure-inputs-modal.png" alt="Panel Configure Inputs con valores establecidos de la siguiente manera: im_a_string en 'abc', im_a_number en 123, im_a_boolean activado en true e i_have_a_default_value en 'override this'" style="width:70%;" >}}
        the mention changes to `@workflow-test-inputs(im_a_string="abc", im_a_number=123, im_a_boolean=true, i_have_a_default_value="override this")`.
1. Guarde el Monitor.

Cada vez que se alcanza el umbral del Monitor, este activa una ejecución del flujo de trabajo.

### Probar un activador de Monitor {#test-a-monitor-trigger}

Consulte la página de prueba y depuración para obtener información sobre [cómo probar un activador de Monitor][12].

## Los activadores de incidentes {#incident-triggers}

Los activadores de incidentes pueden ejecutar un flujo de trabajo automáticamente según los eventos de incidentes, o manualmente desde un incidente.

<div class="alert alert-info">Para configurar automatizaciones de incidentes dentro de Incident Management, con contexto de incidente integrado y sin facturación adicional, consulte <a href="/incident_response/incident_management/setup_and_configuration/automations">Incident Automations</a>. Utilice un flujo de trabajo con un activador de incidentes cuando los eventos de incidentes sean un activador entre otros, o cuando el flujo de trabajo se gestione fuera de Incident Management.</div>

Para agregar un activador de incidentes a su flujo de trabajo:
1. Desde la [página de creación de flujos de trabajo][6], desplácese hacia abajo hasta las opciones de Activador y haga clic en {{< ui >}}Incident{{< /ui >}}.
1. Seleccione el tipo de evento de incidente que debería activar su flujo de trabajo, como cuando se declara o actualiza un incidente, o en un horario recurrente.
   Para un activador manual, Workflows crea un identificador que puede usar en Monitors o [reglas de notificación de incidentes][16].
1. Haga clic en {{< ui >}}Create{{< /ui >}}.
1. Haga clic en {{< ui >}}Publish{{< /ui >}} para publicar su flujo de trabajo. Los flujos de trabajo no se ejecutan hasta que los haya publicado. Los flujos de trabajo publicados generan costos basados en las ejecuciones del flujo de trabajo. Para obtener más información, consulte la [página de precios de Datadog][11].

## Security triggers {#security-triggers}

Puede activar un flujo de trabajo automáticamente para cualquier Security Signal o Security Finding. También puede activar un flujo de trabajo manualmente desde un Cloud SIEM Security Signal panel, un Misconfiguration panel o un Identity Risk panel.

**Nota**: Antes de agregar un flujo de trabajo a un Security Signal o a un Security Finding, el flujo de trabajo debe tener un activador de Security.

### Los activadores de reglas de notificación de seguridad {#security-notification-rule-triggers}

Puede configurar un flujo de trabajo para que se active siempre que una Security Notification Rule envíe una notificación para un Security Signal o un Security Finding.

Para activar un flujo de trabajo desde una regla de notificación, primero debe agregar un activador de Security a su flujo de trabajo:
1. Agregue un activador de Security a su flujo de trabajo:
   - Si su flujo de trabajo no tiene activadores, haga clic en {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}Security{{< /ui >}}.
   - Si su flujo de trabajo ya tiene uno o más activadores y está agregando el activador de Security como un activador adicional, haga clic en el icono {{< ui >}}Add Trigger{{< /ui >}} (rayo) y seleccione {{< ui >}}Security{{< /ui >}}.
1. Asegúrese de que el activador esté conectado a un paso en el flujo de trabajo. Puede conectar el activador a un paso haciendo clic y arrastrando el icono de más ({{< ui >}}\+{{< /ui >}}) debajo del activador.
1. Haga clic en el activador y tome nota del {{< ui >}}Mention handle{{< /ui >}}.
1. Los activadores de Security están configurados para activarse automáticamente de forma predeterminada. Si no desea que el flujo de trabajo se active automáticamente, desactive la opción {{< ui >}}Automatic triggering{{< /ui >}}.
1. Guarde su flujo de trabajo.
1. Haga clic en {{< ui >}}Publish{{< /ui >}} para publicar su flujo de trabajo. Los flujos de trabajo no se ejecutan automáticamente hasta que los haya publicado. Los flujos de trabajo publicados generan costos basados en las ejecuciones del flujo de trabajo. Para obtener más información, consulte la [página de precios de Datadog][11].

Agregue el flujo de trabajo a su regla de notificación:
1. Desde la página [Configuration][3], busque la regla de notificación que desea usar para activar su flujo de trabajo, o cree una nueva regla.
1. En la sección {{< ui >}}Recipient{{< /ui >}}, utilice el nombre de mención del flujo de trabajo para encontrar su flujo de trabajo. Por ejemplo, `@workflow-my-workflow`.
1. Seleccione el flujo de trabajo en el menú desplegable. Solo aparecen en la lista los flujos de trabajo con activadores de seguridad.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

{{< img src="actions/workflows/trigger/notification-rule-trigger2.png" alt="Agregue el nombre del flujo de trabajo a la sección de destinatarios de una regla de notificación." >}}

Cada vez que se activa la regla de notificación, se inicia una ejecución del flujo de trabajo.

### Activadores manuales {#manual-triggers-1}

Puede iniciar manualmente un flujo de trabajo desde un panel de Señal de seguridad de Cloud SIEM, un panel de Configuración incorrecta o un panel de Riesgo de identidad:

1. Haga clic en {{< ui >}}Run Workflow{{< /ui >}} en el cuadro {{< ui >}}Next Steps{{< /ui >}} en la parte superior del panel lateral.
1. En el modal de búsqueda, ingrese el nombre del flujo de trabajo que desea ejecutar y selecciónelo. Solo aparecen en la lista los flujos de trabajo con activadores de seguridad.
1. Si su flujo de trabajo requiere parámetros de entrada, ingrese los valores requeridos. Puede copiar los valores del JSON del objeto que se muestra junto a los parámetros de entrada y pegarlos en los campos de parámetros.
1. Haga clic en {{< ui >}}Run{{< /ui >}}.

Puede ver el estado de ejecución del flujo de trabajo en la sección {{< ui >}}Workflows{{< /ui >}} del panel lateral.

Para obtener ejemplos adicionales de flujos de trabajo de seguridad que puede automatizar, consulte [Automatizar flujos de trabajo de seguridad con Workflow Automation][4].

## Activadores de Catálogo {#catalog-triggers}

Para ejecutar un flujo de trabajo desde una entidad de catálogo de software, primero debe agregar un activador de catálogo de software a su flujo de trabajo:

1. Agregue un activador de catálogo de software a su flujo de trabajo:
   - Si su flujo de trabajo no tiene ningún activador, haga clic en {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}Catalog{{< /ui >}}.
   - Si su flujo de trabajo ya tiene uno o más activadores y está agregando el catálogo de software como un activador adicional, haga clic en el icono {{< ui >}}Add Trigger{{< /ui >}} (rayo) y seleccione {{< ui >}}Catalog{{< /ui >}}.
2. Asegúrese de que el activador esté conectado a un paso en el flujo de trabajo. Puede conectar el activador a un paso haciendo clic y arrastrando el icono de más ({{< ui >}}\+{{< /ui >}}) debajo del activador.
3. Guarde su flujo de trabajo.
4. Haga clic en {{< ui >}}Publish{{< /ui >}} para publicar su flujo de trabajo. Los flujos de trabajo publicados generan costos basados en las ejecuciones del flujo de trabajo. Para obtener más información, consulte la [página de precios de Datadog][11].

Ejecute el flujo de trabajo desde su entidad de Catálogo:

1. En la [página de Catálogo][14], elija una entidad de la lista.
1. Haga clic en {{< ui >}}Run Workflow{{< /ui >}} en la parte superior del panel lateral.
1. En el modal de búsqueda, ingrese el nombre del flujo de trabajo que desea ejecutar y selecciónelo. Solo aparecen en la lista los flujos de trabajo con activadores de Catálogo.
1. Si su flujo de trabajo requiere parámetros de entrada, ingrese los valores según sea necesario.
1. Haga clic en {{< ui >}}Run{{< /ui >}} para ejecutar el flujo de trabajo.

## Activadores de GitHub {#github-triggers}

<div class="alert alert-info">Su cuenta de GitHub debe tener permiso para crear webhooks para usar esta función.</div>

Puede activar un flujo de trabajo desde GitHub siguiendo los siguientes pasos.

1. Agregue un activador de GitHub a su flujo de trabajo:
   - Si su flujo de trabajo no tiene ningún activador, haga clic en {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}GitHub{{< /ui >}}.
   - Si su flujo de trabajo ya tiene uno o más activadores y está agregando GitHub como un activador adicional, haga clic en el icono {{< ui >}}Add Trigger{{< /ui >}} (rayo) y seleccione {{< ui >}}GitHub{{< /ui >}}.
1. Navegue al repositorio de GitHub que desea usar para activar su flujo de trabajo.
1. En GitHub, haga clic en {{< ui >}}Settings{{< /ui >}}, haga clic en {{< ui >}}Webhooks{{< /ui >}} y luego haga clic en {{< ui >}}Add webhook{{< /ui >}}.
1. En la pestaña {{< ui >}}Configure{{< /ui >}} de su flujo de trabajo, copie el {{< ui >}}Payload URL{{< /ui >}}. Péguelo en el campo {{< ui >}}Payload URL{{< /ui >}} en la página de creación de webhooks de GitHub.
1. En GitHub, configure el {{< ui >}}Content type{{< /ui >}} de su webhook en `application/json`.
1. En GitHub, cree un secreto que tenga al menos 16 caracteres de longitud, luego copie este secreto en el campo {{< ui >}}Secret{{< /ui >}} del activador de su flujo de trabajo.
1. En GitHub, elija qué eventos desea que activen su webhook, luego haga clic en {{< ui >}}Add webhook{{< /ui >}}.
1. _Opcionalmente_, en su flujo de trabajo, haga clic en {{< ui >}}\+{{< /ui >}} para agregar un {{< ui >}}Rate Limit{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}} en su flujo de trabajo.
1. Haga clic en {{< ui >}}Publish{{< /ui >}} para publicar el flujo de trabajo. Un flujo de trabajo debe estar publicado antes de que pueda activarlo desde GitHub. Los flujos de trabajo publicados generan costos basados en las ejecuciones del flujo de trabajo. Para obtener más información, consulte la [página de precios de Datadog][11].

## Activadores de Slack {#slack-triggers}

<div class="alert alert-info">Debe instalar la aplicación de Datadog en su espacio de trabajo de Slack para usar esta función. Para obtener más información, consulte <a href="/integrations/slack/?tab=datadogforslack#setup">Configuración de Slack</a>.</div>

<div class="alert alert-info"><strong>Inicio rápido</strong>: Haga clic para crear un <a href="https://app.datadoghq.com/workflow/create?source=slack">flujo de trabajo</a> con un activador de Slack.</div>

Puede activar un flujo de trabajo desde Slack manualmente con el comando `/datadog workflow`, o automáticamente cuando se añade una reacción de emoji a un mensaje o cuando se publica un mensaje en un canal.

### Activador manual de Slack {#manual-slack-trigger}

1. Añada un activador de Slack a su flujo de trabajo:
   - Si su flujo de trabajo no tiene ningún activador, haga clic en {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}Slack{{< /ui >}}.
   - Si su flujo de trabajo ya tiene uno o más activadores y está añadiendo el activador de Slack como un activador adicional, haga clic en el icono {{< ui >}}Add Trigger{{< /ui >}} (rayo) y seleccione {{< ui >}}Slack{{< /ui >}}.
1. Asegúrese de que el activador esté conectado a un paso en el flujo de trabajo. Puede conectar el activador a un paso haciendo clic y arrastrando el icono de más ({{< ui >}}\+{{< /ui >}}) debajo del activador.
1. Haga clic en {{< ui >}}Save{{< /ui >}} en su flujo de trabajo.
1. Haga clic en {{< ui >}}Publish{{< /ui >}} para publicar el flujo de trabajo. Un flujo de trabajo debe estar publicado antes de que pueda activarlo desde Slack. Los flujos de trabajo publicados generan costos basados en las ejecuciones del flujo de trabajo. Para obtener más información, consulte la [página de precios de Datadog][11].
1. En un canal de Slack con la aplicación de Datadog, ejecute `/datadog workflow` para seleccionar y ejecutar un flujo de trabajo. También puede usar el alias `/dd` para ejecutar comandos /datadog.

### Activador de Slack por reacción de emoji {#emoji-reaction-slack-trigger}

Puede configurar un flujo de trabajo para que se active automáticamente cuando un usuario añade una reacción de emoji específica a un mensaje en Slack.

1. Añada un activador de Slack a su flujo de trabajo:
   - Si su flujo de trabajo no tiene ningún activador, haga clic en {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}Slack{{< /ui >}}.
   - Si su flujo de trabajo ya tiene uno o más activadores y está añadiendo el activador de Slack como un activador adicional, haga clic en el icono {{< ui >}}Add Trigger{{< /ui >}} (rayo) y seleccione {{< ui >}}Slack{{< /ui >}}.
1. En la pestaña {{< ui >}}Configure{{< /ui >}}, seleccione el espacio de trabajo de Slack donde desea escuchar las reacciones.
1. Si el espacio de trabajo requiere el permiso `emoji:read`, haga clic en {{< ui >}}Enable Permission{{< /ui >}} para reinstalar la aplicación de Slack con el contexto necesario.
1. Seleccione una o más reacciones de emoji que activen el flujo de trabajo.
1. Haga clic en {{< ui >}}Save{{< /ui >}}, luego en {{< ui >}}Publish{{< /ui >}}.

### Activador de mensaje de Slack {#message-slack-trigger}

Puede configurar un flujo de trabajo para que se active automáticamente cuando se publique un mensaje que coincida con sus reglas en uno o más canales de Slack.

<div class="alert alert-info">La aplicación Datadog Slack debe ser miembro de cada canal que seleccione. Los mensajes publicados por la propia aplicación Datadog Slack no activan flujos de trabajo.</div>

1. Añada un activador de Slack a su flujo de trabajo:
   - Si su flujo de trabajo no tiene ningún activador, haga clic en {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}Slack{{< /ui >}}.
   - Si su flujo de trabajo ya tiene uno o más activadores y está añadiendo el activador de Slack como un activador adicional, haga clic en el icono {{< ui >}}Add Trigger{{< /ui >}} (rayo) y seleccione {{< ui >}}Slack{{< /ui >}}.
1. En la pestaña {{< ui >}}Configure{{< /ui >}}, debajo de {{< ui >}}Message triggers{{< /ui >}}, seleccione el {{< ui >}}Workspace{{< /ui >}} de Slack.
1. Seleccione uno o más {{< ui >}}Channels{{< /ui >}} para escuchar.
1. Elija un {{< ui >}}Match type{{< /ui >}}:
   - {{< ui >}}Any message{{< /ui >}}: Todos los mensajes en los canales seleccionados activan el flujo de trabajo.
   - {{< ui >}}Contains text{{< /ui >}}: El mensaje debe contener el texto que ingrese en {{< ui >}}Message pattern{{< /ui >}}. La coincidencia no distingue entre mayúsculas y minúsculas.
   - {{< ui >}}Matches regular expression{{< /ui >}}: El mensaje debe coincidir con la expresión regular que ingrese en {{< ui >}}Message pattern{{< /ui >}}. La coincidencia distingue entre mayúsculas y minúsculas, y el patrón puede coincidir en cualquier parte del mensaje. Para coincidir con todo el mensaje, use `^` y `$`, por ejemplo `^deploy\s+production$`. Para ignorar mayúsculas y minúsculas, agregue `(?i)` al inicio del patrón.
1. Opcionalmente, filtre qué mensajes cuentan:
   - {{< ui >}}Thread replies{{< /ui >}}: {{< ui >}}Include all messages{{< /ui >}}, {{< ui >}}Only thread replies{{< /ui >}} o {{< ui >}}Exclude thread replies{{< /ui >}}.
   - {{< ui >}}App messages{{< /ui >}}: {{< ui >}}Include all messages{{< /ui >}}, {{< ui >}}Only app messages{{< /ui >}} o {{< ui >}}Exclude app messages{{< /ui >}}.
1. Para escuchar diferentes patrones o canales, haga clic en {{< ui >}}Add message rule{{< /ui >}}. Si un mensaje coincide con más de una regla, el flujo de trabajo se ejecuta una vez.
1. Haga clic en {{< ui >}}Save{{< /ui >}}, luego en {{< ui >}}Publish{{< /ui >}}.

#### Acceda al mensaje de Slack {#access-the-slack-message}

En pasos posteriores de su flujo de trabajo, utilice `Source.slack_message` para hacer referencia al mensaje que activó el flujo de trabajo:

| Variable | Descripción |
|---|---|
| `Source.slack_message.text` | El texto del mensaje. |
| `Source.slack_message.user_id` | El ID de Slack del usuario que publicó el mensaje, cuando esté presente. |
| `Source.slack_message.channel_id` | El ID de Slack del canal en el que se publicó el mensaje. |
| `Source.slack_message.team_id` | El ID de Slack del espacio de trabajo. |
| `Source.slack_message.message_ts` | La marca de tiempo de Slack del mensaje. |
| `Source.slack_message.thread_ts` | La marca de tiempo de Slack del mensaje principal, cuando el mensaje es una respuesta en un hilo. |
| `Source.slack_message.app_id` | El ID de Slack de la aplicación que publicó el mensaje, cuando el mensaje fue publicado por una aplicación. |
| `Source.slack_message.bot_id` | El ID de Slack del bot que publicó el mensaje, cuando el mensaje fue publicado por un bot. |

## Activadores de API {#api-triggers}

Activar un flujo de trabajo mediante una llamada a la API requiere una [clave de API][8] y una [clave de aplicación][9] con el contexto `workflows_run`. Para obtener información sobre cómo agregar un contexto a una clave de aplicación, consulte [Contextos][10].

<div class="alert alert-info">Las claves sin contexto no incluyen el <code>workflows_run</code> contexto de forma predeterminada. Asegúrese de seguir las mejores prácticas de seguridad y utilice una clave de aplicación con los contextos mínimos necesarios para realizar la tarea deseada.</div>

Puede activar un flujo de trabajo enviando una solicitud POST con el ID del flujo de trabajo al punto de conexión `https://api.datadoghq.com/api/v2/workflows/WORKFLOW-ID/instances`. Cuando agrega un desencadenador de API a un flujo de trabajo, la interfaz del desencadenador le proporciona un ejemplo de solicitud cURL que puede usar para activar el flujo de trabajo.

Para agregar un desencadenador de API a un flujo de trabajo:
1. Haga clic en {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}API{{< /ui >}}.
1. En el lienzo de flujo de trabajo, haga clic en {{< ui >}}API{{< /ui >}} y observe el ejemplo de solicitud cURL del flujo de trabajo, que incluye los encabezados y datos necesarios para activar su flujo de trabajo.

   Una solicitud cURL para activar un flujo de trabajo se ve más o menos así:
   {{< code-block lang="shell" >}}
curl -X POST \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d {} \
  https://api.datadoghq.com/api/v2/workflows/32866005-d275-4553-be86-9f1b13066d84/instances
{{< /code-block >}}

   Si el flujo de trabajo incluye parámetros de entrada, inclúyalos en la carga útil de la solicitud. El siguiente ejemplo utiliza dos parámetros de entrada, `example_input1` y `example_input2`:

   {{< code-block lang="shell" >}}
curl -X POST \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d { "meta": { "payload": { \
    "example_input1": "...", \
    "example_input2": "..." \
  } } } \
  https://api.datadoghq.com/api/v2/workflows/32866005-d275-4553-be86-9f1b13066d84/instances
   {{< /code-block >}}
1. Haga clic en {{< ui >}}Save{{< /ui >}}.
1. Haga clic en {{< ui >}}Publish{{< /ui >}} para publicar el flujo de trabajo. Un flujo de trabajo debe estar publicado antes de que pueda activarlo con una solicitud POST. Los flujos de trabajo publicados generan costos basados en las ejecuciones del flujo de trabajo. Para obtener más información, consulte la [página de precios de Datadog][11].

### Acceda al cuerpo de la solicitud de API {#access-the-api-request-body}

En pasos posteriores de su flujo de trabajo, utilice `Source.api.requestBody` para hacer referencia a la carga útil de la solicitud de API entrante. Si el cuerpo de la solicitud es JSON, analícelo con `JSON.parse()` antes de acceder a campos individuales. Por ejemplo, utilice `${JSON.parse(Source.api.requestBody).my_field}` en lugar de `Source.api.requestBody.my_field`.

## Desencadenadores programados {#scheduled-triggers}

Para programar una ejecución de flujo de trabajo:
1. En el lienzo de flujo de trabajo, haga clic en {{< ui >}}Add an Automated Trigger{{< /ui >}} y seleccione {{< ui >}}Schedule{{< /ui >}}.
1. Haga clic en {{< ui >}}Create{{< /ui >}} para crear una cuenta de servicio. Para obtener más información, consulte [Ejecutar como cuenta de servicio][17].
1. Ingrese una hora y frecuencia para la ejecución.
1. (Opcional) Introduzca una descripción para el flujo de trabajo en el campo {{< ui >}}Memo{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.
1. Haga clic en {{< ui >}}Publish{{< /ui >}}. Los flujos de trabajo programados no se ejecutan hasta que los haya publicado. Los flujos de trabajo publicados generan costos basados en las ejecuciones del flujo de trabajo. Para obtener más información, consulte la [página de precios de Datadog][11].

## Activar un flujo de trabajo desde un flujo de trabajo {#trigger-a-workflow-from-a-workflow}

Puede activar un flujo de trabajo secundario desde otro flujo de trabajo utilizando la acción {{< ui >}}Trigger Workflow{{< /ui >}}. Por ejemplo, si tiene una serie compleja de pasos que necesita reutilizar en varios flujos de trabajo, no es necesario volver a crear esos pasos para todos sus flujos de trabajo. En su lugar, añada los pasos a un nuevo flujo de trabajo y actívelo en sus otros flujos de trabajo utilizando la acción Activar flujo de trabajo.

<div class="alert alert-info">Para fines de facturación, la activación de un flujo de trabajo secundario se registra como una nueva ejecución de flujo de trabajo.</div>

Si el flujo de trabajo secundario tiene [parámetros de entrada][5], estos parámetros aparecen como campos obligatorios en la acción Activar flujo de trabajo. En el ejemplo siguiente, el parámetro de entrada `service_name` es obligatorio porque `service_name` está configurado como parámetro de entrada en el flujo de trabajo secundario.

{{< img src="actions/workflows/trigger/trigger-workflow-step.png" alt="El parámetro de entrada service_name es obligatorio en el flujo de trabajo secundario" style="width:100%;" >}}

### Acceda al resultado de un flujo de trabajo secundario {#access-the-result-of-a-child-workflow}

Puede devolver el resultado de un flujo de trabajo secundario al flujo de trabajo principal definiendo {{< ui >}}Output parameters{{< /ui >}} en el flujo de trabajo secundario. Utilice la variable de contexto `WorkflowOutputs` en el flujo de trabajo principal para recuperar los parámetros de salida del flujo de trabajo secundario. Por ejemplo, dado un flujo de trabajo secundario llamado `Example_workflow` con un parámetro de salida llamado `exampleList`, utilice `Steps.Example_workflow.workflowOutputs.exampleList` para acceder al resultado del flujo de trabajo secundario.

## Historial de ejecuciones {#run-history}

Después de activar un flujo de trabajo, la página del flujo de trabajo cambia al {{< ui >}}Run History{{< /ui >}} del flujo de trabajo. Haga clic en {{< ui >}}Configuration{{< /ui >}} o {{< ui >}}Run History{{< /ui >}} en la parte superior izquierda para cambiar entre las vistas de configuración y de historial de ejecución. Utilice el historial de ejecuciones para observar el progreso de un flujo de trabajo activado o [depurar un paso fallido][13].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tiene preguntas o comentarios? Únase al canal {{< ui >}}#workflows{{< /ui >}} en el [Datadog Community Slack][7].

[1]: /es/actions/workflows/access_and_auth/#workflow-identity
[2]: https://app.datadoghq.com/monitors/manage
[3]: https://app.datadoghq.com/security/configuration/notification-rules
[4]: /es/security/cloud_security_management/workflows
[5]: /es/actions/workflows/build/#input-parameters
[6]: https://app.datadoghq.com/workflow/create
[7]: https://chat.datadoghq.com/
[8]: /es/account_management/api-app-keys/#api-keys
[9]: /es/account_management/api-app-keys/#application-keys
[10]: /es/account_management/api-app-keys/#scopes
[11]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[12]: /es/actions/workflows/test_and_debug/#test-a-monitor-trigger
[13]: /es/actions/workflows/test_and_debug/#debug-a-failed-step
[14]: https://app.datadoghq.com/software
[15]: /es/incident_response/incident_management/setup_and_configuration/automations
[16]: /es/incident_response/incident_management/setup_and_configuration/notification_rules/
[17]: /es/actions/workflows/access_and_auth/#run-as-a-service-account