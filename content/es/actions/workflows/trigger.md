---
algolia:
  tags:
  - flujo de trabajo
  - rastreo
  - automatización del flujo de trabajo
aliases:
- /es/workflows/trigger
- /es/service_management/workflows/trigger
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentación
  text: Empezando con la automatización de flujos de trabajo
- link: /service_management/workflows/access/#service-accounts/
  tag: Documentación
  text: Más información sobre cuentas de servicio para flujos de trabajo
- link: dashboards
  tag: Documentación
  text: Más información sobre la creación de un dashboard
- link: /security
  tag: Documentación
  text: Más información sobre señales de seguridad
- link: monitors
  tag: Documentación
  text: Más información sobre monitores
- link: /security/cloud_security_management/workflows
  tag: Documentación
  text: Automatiza los flujos de trabajo de seguridad con la automatización de flujos
    de trabajo (Wokflow Automation)
title: Activar un flujo de trabajo
---

Puedes activar un proceso manual o automáticamente y un proceso puede tener múltiples activadores. Esto te permite activar un proceso desde una variedad de fuentes diferentes, como un monitor de Datadog y un dashboard de Datadog.

Un proceso puede ejecutarse con la identidad del usuario propietario o con la identidad de una cuenta de servicio asociada al proceso. Para más información sobre las cuentas de servicio, consulta [Cuentas de servicio para Workflow Automation][1].

{{< img src="service_management/workflows/multiple-triggers.png" alt="Un proceso con múltiples activadores" style="width:100%;" >}}

## Activadores manuales

Para activar un proceso manualmente:
1. En la página del proceso, haz clic en **Run** (Ejecutar).
1. Introduce los valores de las variables de activación existentes.
1. Cuando estés listo para ejecutar el proceso, haz clic en **Save & Run** (Guardar y ejecutar).

## Activadores del dashboard

Para activar un proceso desde un dashboard, añade el widget **Run Workflow** (Ejecutar proceso):
1. En tu panel de control, haz clic en **Add Widget** (Añadir widget).
1. Busca `workflows` y añade el widget **Run Workflow** (Ejecutar proceso).
1. En **Select the workflow** (Seleccionar proceso), busca tu proceso en el menú desplegable. Solo aparecerán en la lista los procesos publicados con activadores del dashboard.
1. Asigna variables de plantilla de dashboard  a los parámetros de entrada del flujo de trabajo. Esto permite que los valores de tus variables de plantilla de dashboard se asignen directamente a los parámetros de entrada al ejecutar el flujo de trabajo.
1. Introduce un título para el widget y haz clic en **Save** (Guardar).

Para ejecutar el flujo de trabajo:
1. Haz clic en **Run Workflow** en tu widget de dashboard.
1. En **Execution parameters** (Parámetros de ejecución), cualquier variable de plantilla que hayas asignado a las entradas del flujo de trabajo se rellena automáticamente. Introduce los valores de los parámetros de ejecución no asignados o edita los valores existentes si es necesario.
1. Haz clic en **Run** (Ejecutar) para ejecutar el flujo de trabajo.

## Activadores de monitor

### Añadir un activador de monitor a tu proceso

1. Añadir un activador de monitor a tu proceso:
   - Si tu proceso no tiene activadores, haz clic en **Add Trigger** > **Monitor** (Añadir activador > Monitor).
   - Si tu proceso ya dispone de uno o varios activadores y deseas añadir el monitor como un activador adicional, haz clic en el icono **Add Trigger** (Añadir disparador) (rayo) y selecciona **Monitor**.
1. Asegúrate de que el activador está conectado a un paso en el proceso. Puedes conectar el activador a un paso haciendo clic y arrastrando el icono más (**+**) bajo el activador.
1. Haz clic en el activador y fíjate en el **identificador de mención**.
1. Los activadores de monitor se activan automáticamente por defecto. Si no deseas que un proceso se active automáticamente, activa la opción **Automatic triggering** (Activación automática).
1. Guarda tu flujo de trabajo.
1. Haz clic en **Publish** (Publicar) para publicar tu proceso. Los procesos no se ejecutan automáticamente hasta que los hayas publicado. Los procesos publicados acumulan costes en función de las ejecuciones del proceso. Para obtener más información, consulta la [página Precios de Datadog][11].

### Añadir el proceso a tu monitor

1. Ve a la página [**Monitors** (Monitores)][2] en Datadog.
1. Busca el monitor que quieres utilizar para activar el flujo de trabajo y edítalo o crea un nuevo monitor.
1. En la sección **Configure notifications & automations** (Configurar notificaciones y automatizaciones), haz clic en **+ Add Workflow** (Añadir proceso).
1. Utiliza el nombre de la mención del proceso para buscar tu proceso y selecciónalo en el menú desplegable. Sólo aparecen en la lista los procesos con activadores de monitor.<br>En el campo de mensaje de notificación aparece una mención para el monitor, con el formato `@workflow (UI) / proceso (generic)-name` si no toma parámetros de entrada o `@workflow (UI) / proceso (generic)-name(param="")` si toma parámetros de entrada.
1. Si el proceso toma parámetros de entrada:
    1. Haz clic en **Configure Inputs** (Configurar entradas) junto al nombre e ID del monitor.
        {{< img src="service_management/workflows/monitor-configure-inputs-arrow.png" alt="Un proceso adjunto con un enlace Configurar entradas disponible" style="width:100%;" >}}
    1. Introduce los valores de los parámetros de entrada.<br>**Nota**: Los valores pueden incluir variables de plantilla de mensajes del monitor. Para ver una lista de las variables disponibles, haz clic en **Use Message Template Variables** (Utilizar variables de plantilla de mensaje) en la parte superior derecha de la sección **Configure notifications & automations** (Configurar notificaciones y automatizaciones).
    <br>Los parámetros se rellenan en la mención dentro del campo de mensaje de notificación.<br>Por ejemplo, si configuras un proceso llamado `@workflow (UI) / proceso (generic)-test-inputs` para que tenga los siguientes parámetros:
        {{< img src="service_management/workflows/monitor-configure-inputs-modal.png" alt="Configura el panel Entradas con los valores establecidos de la siguiente manera: im_a_string en 'abc', im_a_number en 123, im_a_boolean en true y i_have_a_default_value en 'override this'" style="width:70%;" >}}
        la mención cambia a `@workflow-test-inputs(im_a_string="abc", im_a_number=123, im_a_boolean=true, i_have_a_default_value="override this")`.
1. Guarda el monitor.

Cada vez que se alcanza el umbral del monitor, el monitor desencadena una ejecución del proceso.

### Prueba de un activador de monitor 

Consulta la página de test y depuración para obtener información sobre [cómo hacer un test de un activador del monitor][12].

## Activadores de incidente

Para activar un proceso desde una regla de notificación del incidente, primero debes añadir un activador de incidente a tu proceso:
1. Añade un activador de incidente a tu proceso:
   - Si tu proceso no tiene activadores, haz clic en **Add Trigger** > **Incident** (Añadir activador > Incidente).
   - Si tu proceso ya dispone de uno o varios activadores y deseas añadir el activador de seguridad como activador adicional, haz clic en el icono **Add Trigger** (Añadir activador) (rayo) y selecciona **Incident** (Incidente).
1. Asegúrate de que el activador está conectado a un paso en el proceso. Puedes conectar el activador a un paso haciendo clic y arrastrando el icono más (**+**) bajo el activador.
1. Haz clic en el activador y fíjate en el **identificador de mención**.
1. Los activadores de incidente se activan automáticamente por defecto. Si no deseas que un proceso se active automáticamente, activa la opción **Automatic triggering** (Activación automática).
1. Guarda tu flujo de trabajo.
1. Haz clic en **Publish** (Publicar) para publicar tu proceso. Los procesos no se ejecutan automáticamente hasta que los hayas publicado. Los procesos publicados acumulan costes en función de las ejecuciones del proceso. Para obtener más información, consulta la [página Precios de Datadog][11].

Añadir el proceso a tu regla de notificación del incidente:
1. En la página [Configuración de incidentes][6], selecciona **Rules** (Reglas).
1. Haz clic en **Nueva Regla**.
1. Configura **Severity** (Gravedad), **Service** (Servicio) y **Other attributes** (Otros atributos) en tu regla para notificaciones.
1. En **Notify** (Notificar), pega el identificador de flujo de trabajo que has copiado anteriormente.
1. En la sección **Recipient** (Receptor), utiliza el nombre de la mención para encontrar tu proceso. Por ejemplo, `@workflow (UI) / proceso (generic)-my-workflow (UI) / proceso (generic)`. El proceso debe tener un activador de incidente antes de poder activarlo desde un incidente.
1. Introduce un **Template** (Plantilla) y configura los parámetros de **Renotify** (Volver a notificar) en la regla para notificaciones.
1. Haz clic en **Save** (Guardar).

## Activadores de seguridad

Puedes activar un proceso automáticamente para cualquier señal de seguridad, o activar manualmente un proceso desde un panel de Señal de seguridad de Cloud SIEM. Antes de poder añadir un proceso a una señal de seguridad, el proceso debe tener un activador de seguridad.

### Activadores de la regla de notificación de señales de seguridad

Puedes configurar un flujo de trabajo para que se active cada vez que se activa una regla para notificaciones de señales de seguridad.

Para activar un proceso desde una regla de notificación, primero debes añadir un activador de seguridad a tu proceso:
1. Añadir un activador de seguridad a tu proceso:
   - Si tu proceso no tiene activadores, haz clic en **Add Trigger** > **Security** (Añadir activador > Seguridad).
   - Si tu proceso ya dispone de uno o varios activadores y deseas añadir el activador de seguridad como activador adicional, haz clic en el icono **Add Trigger** (Añadir activador) (rayo) y selecciona **Security** (Seguridad).
1. Asegúrate de que el activador está conectado a un paso en el proceso. Puedes conectar el activador a un paso haciendo clic y arrastrando el icono más (**+**) bajo el activador.
1. Haz clic en el activador y fíjate en el **identificador de mención**.
1. Los activadores de seguridad se activan automáticamente por defecto. Si no deseas que un proceso se active automáticamente, activa la opción **Automatic triggering** (Activación automática).
1. Guarda tu proceso.
1. Haz clic en **Publish** (Publicar) para publicar tu proceso. Los procesos no se ejecutan automáticamente hasta que los hayas publicado. Los procesos publicados acumulan costes en función de las ejecuciones del proceso. Para obtener más información, consulta la [página Precios de Datadog][11].

Añadir el proceso a tu regla de notificación:
1. En la página de [configuración][3], busca la regla para notificaciones que quieres utilizar para activar tu flujo de trabajo o crea una nueva regla.
1. En la sección **Recipient** (Destinatario), añade el nombre de la mención del proceso. Por ejemplo, `@workflow-my-workflow`.
1. Selecciona el proceso del menú desplegable. Solo aparecerán en la lista los procesos con activadores de seguridad.
1. Haz clic en **Save** (Guardar).

{{< img src="service_management/workflows/notificación-rule-trigger2.png" alt="Añadir el nombre del flujo de trabajo a la sección del destinatario de una regla para notificaciones" >}}

Cada vez que se activa la regla para notificaciones, se ejecuta un proceso.

### Activadores de señales de seguridad de Cloud SIEM

Puedes iniciar manualmente un flujo de trabajo desde un panel de señales de seguridad de Cloud SIEM.

1. Haz clic en **Run Workflow** (Ejecutar proceso), en la parte superior del panel **Security Signal** (Señales de seguridad).
1. En el modal de búsqueda, introduce el nombre del proceso que deseas ejecutar y selecciónalo. Solo aparecerán en la lista los procesos con activadores de seguridad.
1. Si tu flujo de trabajo requiere parámetros de entrada, introduce los valores necesarios. Puedes copiar los valores del objeto de señal JSON que se muestra junto a los parámetros de entrada y pegarlos en los campos de parámetros.
1. Haz clic en **Run** (Ejecutar).
1. Puedes ver el estado de ejecución del flujo de trabajo en la sección **Workflow** (Flujo de trabajo) de la señal de seguridad.

Para obtener más ejemplos de procesos de seguridad que puedes automatizar, consulta [Automatización de procesos de seguridad con Workflow Automation][4].

## Activadores de Software Catalog

Para ejecutar un proceso desde una entidad de Software Catalog, primero debes añadir un activador de Software Catalog a tu proceso:

1. Añade un activador de Software Catalog a tu proceso:
   - Si tu proceso no tiene activadores, haz clic en **Add Trigger** > **Software Catalog** (Añadir activador > Software Catalog).
   - Si tu proceso ya dispone de uno o varios activadores y deseas añadir el activador de Software Catalog como activador adicional, haz clic en el icono **Add Trigger** (Añadir activador) (rayo) y selecciona **Software Catalog**.
2. Asegúrate de que el activador está conectado a un paso en el proceso. Puedes conectar el activador a un paso haciendo clic y arrastrando el icono más (**+**) bajo el activador.
3. Guarda tu flujo de trabajo.
4. Para publicar tu proceso, haz clic en **Publish** (Publicar). Los procesos publicados acumulan costes en función de las ejecuciones del proceso. Para obtener más información, consulta la [página de precios de Datadog][11].

Ejecuta el proceso desde tu entidad de Software Catalog:

1. En la [página de Software Catalog][14], elige una entidad de la lista.
1. Haz clic en **Run Workflow** (Ejecutar proceso) en la parte superior del panel lateral.
1. En el modal de búsqueda, introduce el nombre del proceso que deseas ejecutar y selecciónalo. Solo aparecerán en la lista los procesos con activadores de Software Catalog.
1. Si tu proceso requiere parámetros de entrada, introduce los valores necesarios.
1. Haz clic en **Run** (Ejecutar) para ejecutar el flujo de trabajo.

## Activadores de GitHub

<div class="alert alert-info"><strong>Nota</strong>: Tu cuenta de GitHub debe tener permiso para crear webhooks para utilizar esta función.</div>

Puedes activar un proceso desde GitHub siguiendo estos pasos.

1. Añade un activador de GitHub a tu proceso:
   - Si tu proceso no tiene activadores, haz clic en **Add Trigger** > **GitHub** (Añadir activador > GitHub).
   - Si tu proceso ya dispone de uno o varios activadores y deseas añadir GitHub como un activador adicional, haz clic en el icono **Add Trigger** (Añadir disparador) (rayo) y selecciona **GitHub**.
1. Navega hasta el repositorio de GitHub que deseas utilizar para activar tu proceso.
1. En GitHub, haz clic en **Settings** (Configuración), haz clic en **Webhooks** y, a continuación, haz clic en **Add webhook** (Añadir webhook).
1. En la pestaña **Configure** (Configuración) de tu proceso, copia la **Payload URL** (URL de carga útil). Pégala en el campo **Payload URL** (URL de carga útil) de la página de creación del webhook de GitHub.
1. En GitHub, establece el **Content type** (Tipo de contenido) de tu webhook en `application/json`.
1. En GitHub, crea un secreto que tenga al menos 16 caracteres y, a continuación, cópialo en el campo **Secret** (Secreto) de tu activador de proceso.
1. En GitHub, elige los eventos que deseas que activen tu webhook y, a continuación, haz clic en **Add webhook** (Añadir webhook).
1. _Opcionalmente_, en tu proceso, haz clic en el **más** (+) para añadir un **Rate Limit** (Límite de tasa).
1. Haz clic en **Save** (Guardar) en tu proceso.
1. Haz clic en **Publish** (Publicar) para publicar el proceso. Un proceso debe estar publicado antes de poder activarlo desde GitHub. Los procesos publicados acumulan costes en función de las ejecuciones de proceso. Para obtener más información, consulta la [página de Precios de Datadog][11].

## Activadores de Slack

<div class="alert alert-info"><strong>Nota</strong>: Debes instalar la aplicación de Datadog en tu espacio de trabajo de Slack para utilizar esta función. Para obtener más información, consulta <a href="/integrations/slack/?tab=datadogforslack#setup">Configuración de Slack</a>.</div>

Puedes activar un proceso desde Slack siguiendo estos pasos.

1. Añade un activador de Slack a tu proceso:
   - Si tu proceso no tiene activadores, haz clic en **Add Trigger** > **Slack** (Añadir activador > Slack).
   - Si tu proceso ya dispone de uno o varios activadores y deseas añadir el activador de Slack como activador adicional, haz clic en el icono **Add Trigger** (Añadir activador) (rayo) y selecciona **Slack**.
1. Asegúrate de que el activador está conectado a un paso en el proceso. Puedes conectar el activador a un paso haciendo clic y arrastrando el icono más (**+**) bajo el activador.
1. Haz clic en **Save** (Guardar) en tu proceso.
1. Haz clic en **Publish** (Publicar) para publicar el proceso. Un proceso debe estar publicado antes de poder activarlo desde Slack. Los procesos publicados acumulan costes en función de las ejecuciones de proceso. Para obtener más información, consulta la [página de Precios de Datadog][11].
1. En un canal de Slack con la aplicación de Datadog, ejecuta `/datadog workflow (UI) / proceso (generic)` para seleccionar y ejecutar un proceso. También puedes utilizar el alias `/dd` para ejecutar comandos /datadog.

## Activadores de API

Para activar un proceso mediante una llamada a la API se necesita una [clave de API][8] y una [clave de aplicación][9] con el ámbito `workflows_run`. Para obtener información sobre cómo añadir un ámbito a una clave de aplicación, consulta [Ámbitos][10].

<div class="alert alert-info">Las claves sin ámbito no incluyen el ámbito <code>workflows_run</code> por defecto. Asegúrate de seguir las mejores prácticas de seguridad y utiliza una clave de aplicación con los ámbitos mínimos necesarios para realizar la tarea deseada.</div>

Puedes activar un proceso enviando una solicitud POST con el ID de proceso al endpoint `https://api.datadoghq.com/api/v2/workflows/WORKFLOW-ID/instances`. Cuando añades un activador de API a un proceso, la interfaz de activación te proporcionará una solicitud cURL de ejemplo que podrás utilizar para activar el proceso.

Para añadir un activador de API a un proceso:
1. Haz clic en **Add Trigger** > **API** (Añadir activador > API).
1. En el lienzo del proceso, haz clic en **API** y observa la solicitud cURL de ejemplo del proceso, que incluye los encabezados y los datos necesarios para activar tu proceso.

   Una solicitud cURL para activar un proceso tiene el siguiente aspecto:
   {{< code-block lang="shell" >}}
curl -X POST \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d {} \
  https://api.datadoghq.com/api/v2/workflows/32866005-d275-4553-be86-9f1b13066d84/instances
{{< /code-block >}}

   Si el proceso incluye parámetros de entrada, inclúyelos en la carga útil de la solicitud. El siguiente ejemplo utiliza dos parámetros de entrada, `example_input1` y `example_input2`:

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
1. Haz clic en **Save** (Guardar).
1. Haz clic en **Publish** (Publicar) para publicar el proceso. Un proceso debe estar publicado antes de poder activarlo con una solicitud POST. Los procesos publicados acumulan costes en función de las ejecuciones de proceso. Para obtener más información, consulta la [página de Precios de Datadog][11].

## Activadores programados

Para programar la ejecución de un flujo de trabajo:
1. En el lienzo del flujo de trabajo, haz clic en **Add an Automated Trigger** (Añadir un activador automatizado) y selecciona **Schedule** (Cronograma).
1. Haz clic en **Create** (Crear) para crear una cuenta de servicio. Para obtener más información, consulta [Uso de una cuenta de servicio][1].
1. Introduce una hora y una frecuencia para la ejecución.
1. (Opcional) Introduce una descripción para el flujo de trabajo en el campo **Memo**.
1. Haz clic en **Save** (Guardar).
1. Haz clic en **Publish** (Publicar). Los procesos programados no se ejecutan hasta que los hayas publicado. Los procesos publicados acumulan costes en función de las ejecuciones del proceso. Para obtener más información, consulta la [página Precios de Datadog][11].

## Activar un proceso desde un proceso

Puedes desencadenar un proceso secundario desde otro proceso utilizando la acción **Trigger Workflow** (Desencadenar proceso). Por ejemplo, si tienes una serie compleja de pasos que necesitas reutilizar en varios procesos, no hay necesidad de recrear esos pasos para todos tus procesos. En su lugar, añade los pasos a un nuevo proceso y actívalo en tus otros procesos utilizando la acción Activar proceso.

<div class="alert alert-info">A efectos de facturación, la activación de un proceso secundario se registra como una nueva ejecución de proceso.</div>

Si el flujo de trabajo secundario tiene [parámetros de entrada][5], estos aparecerán como campos obligatorios en la acción Trigger Workflow (Activar flujo de trabajo). En el ejemplo siguiente, el parámetro de entrada **service_name** es obligatorio, ya que `service_name` está configurado como parámetro de entrada en el flujo de trabajo secundario.

{{< img src="service_management/workflows/trigger-workflow-step.png" alt="El flujo de trabajo secundario requiere el parámetro de entrada service_name" style="width:100%;" >}}

### Acceder al resultado de un proceso secundario

Puedes devolver el resultado de un proceso secundario al proceso principal definiendo **Parámetros de salida** en el proceso secundario. Utiliza la variable de contexto `WorkflowOutputs` en el proceso principal para recuperar los parámetros de salida del proceso secundario. Por ejemplo, dado un proceso secundario llamado `Example_workflow` con un parámetro de salida llamado `exampleList`, utiliza `Steps.Example_workflow.workflowOutputs.exampleList` para acceder al resultado del proceso secundario.

## Historial de ejecuciones

Después de activar un proceso, la página del proceso cambia al **Run History** (Historial de ejecuciones) del proceso. Haz clic en **Configuration** (Configuración) o **Run History** (Historial de ejecución) en la parte superior izquierda para cambiar entre las vistas de configuración y de historial de ejecución. Utiliza el historial de ejecución para ver el progreso de un proceso activado o [depurar un paso fallido][13].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tienes preguntas o comentarios? Únete al canal **#workflows** en [Datadog Community Slack][7].

[1]: /es/service_management/workflows/access/#use-a-service-account
[2]: https://app.datadoghq.com/monitors/manage
[3]: https://app.datadoghq.com/security/configuration/notification-rules
[4]: /es/security/cloud_security_management/workflows
[5]: /es/service_management/workflows/build/#input-parameters
[6]: https://app.datadoghq.com/incidents/settings#Rules
[7]: https://datadoghq.slack.com/
[8]: /es/account_management/api-app-keys/#api-keys
[9]: /es/account_management/api-app-keys/#application-keys
[10]: /es/account_management/api-app-keys/#scopes
[11]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[12]: /es/service_management/workflows/test_and_debug/#test-a-monitor-trigger
[13]: /es/service_management/workflows/test_and_debug/#debug-a-failed-step
[14]: https://app.datadoghq.com/software