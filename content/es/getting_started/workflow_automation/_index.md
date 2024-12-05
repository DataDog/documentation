---
further_reading:
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: Blog
  text: Automatiza procesos integrales y responde rápidamente a eventos con flujos
    de trabajo de Datadog
- link: /service_management/workflows/access/
  tag: Documentación
  text: Acceso y autentificación
- link: /security/cloud_security_management/workflows/
  tag: Documentación
  text: Automatiza los flujos de trabajo de seguridad
title: Empezando con la automatización del flujo de trabajo
---

## Información general

Con la automatización de los flujos de trabajo, puedes automatizar procesos integrales en respuesta a las alertas y señales de seguridad de Datadog. La automatización de los flujos de trabajo se nutre de datos de observabilidad en tiempo real, lo que te permite resolver los problemas con mayor rapidez y mantener de forma proactiva la disponibilidad y seguridad de tus sistemas.

Sigue esta guía para crear un flujo de trabajo personalizado activado por una alerta de monitor. Cuando se activa, el flujo de trabajo crea una tarea en Jira y envía una notificación a Slack con un enlace al ticket de Jira. Esta guía explica cómo transferir datos de un paso de tu flujo de trabajo a otro paso, cómo guardar y publicar tu flujo de trabajo, y cómo ver el historial de ejecución del flujo de trabajo.

## Requisitos previos

Antes de empezar, necesitas tener las integraciones de Jira y Slack instaladas en tu [cuenta de Datadog][1]. Para ver las instrucciones de instalación, consulta la documentación de [Slack][2] y de [integración de Jira][3].

Las credenciales de la cuenta y la autenticación que configures en los cuadros de integración de Jira y Slack se propagan automáticamente a las acciones de Jira y Slack en la automatización de los flujos de trabajo. Algunos integraciones requieren una configuración adicional de la autenticación. Para obtener más información, consulta [Conexiones][4].

## Crea el flujo de trabajo

### Crea un flujo de trabajo con un activador de monitor 
Puedes activar un flujo de trabajo a partir de una alerta, como una señal de monitor o de seguridad, a partir de una programación o manualmente. En este caso, crea un flujo de trabajo con un activador de monitor.

Crea un flujo de trabajo:
1. En la página **[Automatización del flujo de trabajo][5]**, haz clic en **New Workflow** (Nuevo flujo de trabajo).
1. Introduce un nombre y una descripción para el flujo de trabajo. El flujo de trabajo de ejemplo utiliza el nombre y la descripción siguientes:<br>
   Nombre: `Crear un ticket de Jira`.<br>
   Descripción: `Crear una incidencia de Jira y una notificación de Slack cuando haya una alerta de monitor`.

Añade y configura el monitor:
1. En el lienzo del flujo de trabajo, haz clic en **Add Trigger** (Añadir activador) y selecciona **Monitor, Incident, or Security Signal** (Monitor, Incidente o Señal de seguridad).
1. En la pestaña **Configure** (Configurar), junto a `@workflow-`, introduce un ID único para tu flujo de trabajo: `Create-Jira-Ticket`.<br>
   Los gestores de flujos de trabajo siempre empiezan por `@workflow-`. Más tarde, se utiliza este gestor para conectar el flujo de trabajo a una notificación de monitor.
1. Haz clic en **Save** (Guardar) para guardar el flujo de trabajo.

{{< img src="/getting_started/workflow_automation/trigger1.png" alt="Activador de flujos de trabajo">}}

### Añade las acciones de Jira y Slack
Añade y configura el paso de Jira:
1. En el lienzo del flujo de trabajo, haz clic en el icono **+**.
1. Busca la acción de Jira y selecciona **Create issue** (Crear incidencia).
1. En el lienzo del flujo de trabajo, haz clic en el paso **Create issue** (Crear incidencia.
1. En la pestaña **Configure** (Configurar), selecciona una **cuenta de Jira**. La cuenta debe corresponder a la URL de Jira que se encuentra en la sección **Accounts** (Cuentas) del cuadro de integración de Jira.
1. Introduce el **proyecto** y el **tipo de incidencia** para la incidencia de Jira que crea el flujo de trabajo.
1. Introduce un **resumen** y una **descripción** para la incidencia de Jira, utilizando variables de contexto para transferir datos de monitor que activan el flujo de trabajo. Puedes acceder a una variable de contexto en un paso si la encierras entre llaves dobles (`{{`).<br><br>
   La siguiente descripción de ejemplo utiliza las variables de origen, de desencadenante y de flujo de trabajo para pasar:
   - la fuente que activó la alerta de monitor 
   - un enlace al monitor afectado
   - el nombre del flujo de trabajo y el ID del flujo de trabajo

   ```
   The CPU usage is above the 95% threshold for {{ Trigger.hostname }}

   Please investigate - see this Datadog Dashboard to view all workflow executions:
   https://app.datadoghq.com/dash/integration/workflow_automation?refresh_mode=sliding&from_ts=1698164453793&to_ts=1698168053793&live=true.

   The workflow that created this Jira issue is
   {{ WorkflowName }} : {{ WorkflowId }}

   The monitor that triggered the workflow can be found here: {{ Source.url }}
   ```

   Para más información sobre las variables de contexto, consulta **[Variables de contexto][6]**.

1. Prueba la acción de Jira haciendo clic en **Test** (Prueba) en la pestaña **Configure** (Configurar). Al probar la acción se crea un ticket de Jira real.
1. Haz clic en **Save** (Guardar) para guardar el flujo de trabajo.

A continuación, añade el paso de Slack:
1. Haz clic en el icono con el signo más en el lienzo del flujo de trabajo para añadir otro paso.
1. Busca Slack y selecciona **Send message** (Enviar mensaje).
1. Introduce el **nombre del espacio de trabajo de Slack**.
1. Introduce el **nombre del canal de Slack**.
1. Para obtener una notificación de Slack más útil, utiliza variables de salida del paso. Las variables de salida del paso te permiten transferir datos del paso de Jira al paso de Slack en tu flujo de trabajo. Utiliza el siguiente texto de mensaje para incluir la clave de incidencia de Jira, el nombre del monitor y la incidencia de Jira en el mensaje de Slack:

   ```
   The monitor named {{ Source.monitor.name }} triggered and created a new Jira issue
   {{ Steps.Create_issue.issueKey }}: {{ Steps.Create_issue.issueUrl }}

   The workflow that created this Jira issue is {{ WorkflowName }}
   ```

1. Para probar la acción, haga clic en **Test** (Probar) en la pestaña **Configure** (Configurar). Al probar una acción se crea un mensaje de Slack real.
1. Para ver el nombre de tu flujo de trabajo en el menú desplegable de notificaciones del monitor, guarda y publica tu flujo de trabajo. Haz clic en **Publish** (Publicar) en la página del flujo de trabajo.

## Prueba y publica el flujo de trabajo

<div class="alert alert-info">Al probar un flujo de trabajo conectado a cuentas activas de Slack y Jira se crean mensajes reales de Slack y tickets de Jira.</div>

Haz clic en **Save** (Guardar) para aplicar los cambios al flujo de trabajo. A continuación, activa manualmente el flujo de trabajo para probarlo.

Para activar el flujo de trabajo manualmente, haz clic en **Run** (Ejecutar) en la página del flujo de trabajo e introduce los valores de las variables de activación.

{{< img src="/getting_started/workflow_automation/run_workflow.png" alt="Activar un flujo de trabajo manualmente" style="width:90%;" >}}

Confirma que la ejecución del flujo de trabajo crea un ticket de Jira y envía un mensaje de Slack.

Los flujos de trabajo programados y activados no se activan automáticamente hasta que los publicas. Para publicar el flujo de trabajo, haz clic en **Publish** (Publicar) en la página del flujo de trabajo.

## Actualiza el monitor que activa tu flujo de trabajo

1. Ve a la [página de monitores][7] en Datadog.
1. Busca el monitor que quieres utilizar para activar el flujo de trabajo y edítalo o crea un nuevo monitor.
1. En la sección de mensajes, añade el nombre completo de la mención del flujo de trabajo a una notificación de alerta. El nombre de la mención empieza por `@workflow-`. Por ejemplo, `@workflow-Create-Jira-Ticket`.
    - Puedes transferir variables de activación al flujo de trabajo mediante una lista separada por comas con la sintaxis `@workflow-name(key=value, key=value)`. Por ejemplo, `@workflow-Create-Jira-Ticket(hostname={{host.name}})`.
1. Haz clic en **Test Notifications** (Probar notificaciones) para probar el flujo de trabajo y todas las notificaciones de ese monitor.
1. Guarda el monitor.

{{< img src="/getting_started/workflow_automation/monitor_trigger.png" alt="Activar un flujo de trabajo a partir de un monitor">}}

Cada vez que se alcanza el umbral del monitor, este último activa una ejecución del flujo de trabajo.

## Historial de ejecuciones

Después de activar el flujo de trabajo, puedes ver su progreso y depurar los pasos fallidos en la vista **Run History** (Historial de ejecuciones). Selecciona un paso ejecutado para ver las entradas, salidas, contextos de ejecución y mensajes de error. El siguiente ejemplo muestra un paso que falló debido a una configuración de Jira no válida.

{{&lt; img src="/getting_started/workflow_automation/testing_the_workflow.mp4" alt="Vista previa del test del flujo de trabajo" style="width:100%" vídeo=true &gt;}}

Para realizar modificaciones en el flujo de trabajo, haz clic en **Configuration** (Configuración). Para volver a la vista del historial de ejecuciones, haga clic en **Run History** (Historial de ejecuciones).

Para ver un lista de las ejecuciones de flujos de trabajo anteriores y si cada ejecución tuvo éxito o fracasó, utiliza la vista del historial de ejecuciones inicial. Vuelve al historial de ejecuciones inicial en cualquier momento haciendo clic en el lienzo del flujo de trabajo.

## Conclusión

Cuando monitor activa un flujo de trabajo, crea una incidencia en Jira para que tu equipo de ingenieros la revise. A continuación se muestra un ejemplo de incidencia de Jira:

{{< img src="/getting_started/workflow_automation/jira_ticket.png" alt="Ticket de Jira que se genera a partir de un flujo de trabajo">}}

El flujo de trabajo también crea un mensaje de Slack para notificar la incidencia de Jira y la alerta del monitor a tu equipo. A continuación se muestra un ejemplo de notificación de Slack:

{{< img src="/getting_started/workflow_automation/slack-message.png" alt="Mensaje de Slack que se genera a partir del flujo de trabajo">}}

## ¿Qué toca hacer ahora?

* Explora la lista de todas las acciones de flujo de trabajo disponibles en el [catálogo de acciones][8]. 
* Crea un flujo de trabajo a partir de un [plano][9].
* Utiliza la [acción HTTP][10] para realizar una solicitud a cualquier endpoint.
* Implementa acciones de [transformación de datos][11] para realizar las operaciones necesarias en la información que fluye a través de tu flujo de trabajo.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: /es/integrations/slack/
[3]: /es/integrations/jira/
[4]: /es/service_management/workflows/connections/
[5]: https://app.datadoghq.com/workflow
[6]: /es/workflows/build/#context-variables
[7]: https://app.datadoghq.com/monitors/manage
[8]: /es/service_management/workflows/actions_catalog/
[9]: /es/workflows/build
[10]: /es/service_management/workflows/actions_catalog/generic_actions/#http
[11]: /es/service_management/workflows/actions_catalog/generic_actions/#data-transformation