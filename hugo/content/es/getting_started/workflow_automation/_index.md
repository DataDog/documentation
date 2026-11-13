---
description: Automatice procesos de extremo a extremo activados por alertas de Datadog.
  Cree flujos de trabajo que se integren con Jira y Slack para una resolución de problemas
  más rápida.
further_reading:
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: Blog
  text: Automatice procesos de extremo a extremo y responda rápidamente a eventos
    con Datadog Workflows
- link: /actions/workflows/access_and_auth/
  tag: Documentación
  text: Acceso y autenticación
- link: /security/cloud_security_management/workflows/
  tag: Documentación
  text: Automatizar flujos de trabajo de seguridad
title: Introducción a Workflow Automation
---
## Descripción general {#overview}

Con Workflow Automation, puede automatizar procesos de extremo a extremo en respuesta a alertas y señales de seguridad de Datadog. Workflow Automation funciona con datos de observabilidad en tiempo real, lo que le permite resolver problemas más rápido y mantener de forma proactiva la disponibilidad y seguridad de sus sistemas.

Siga esta guía para crear un flujo de trabajo personalizado activado por una alerta de monitor. Cuando se activa, el flujo de trabajo crea una tarea en Jira y envía una notificación a Slack con un enlace al ticket de Jira. Esta guía cubre cómo pasar datos de un paso a otro en su flujo de trabajo, guardar y publicar su flujo de trabajo, y ver el historial de ejecución del flujo de trabajo.

## Requisitos previos {#prerequisites}

Antes de comenzar, necesita tener las integraciones de Jira y Slack instaladas en su [cuenta de Datadog][1]. Para obtener instrucciones de instalación, consulte la documentación de [Slack][2] y de la [integración de Jira][3].

Las credenciales de cuenta y la autenticación que configure en los mosaicos de integración de Jira y Slack se propagan automáticamente a las acciones de Jira y Slack en Workflow Automation. Algunas integraciones requieren configuración adicional para la autenticación. Para obtener más información, consulte [Connections][4].

## Cree el flujo de trabajo {#build-the-workflow}

### Cree un flujo de trabajo con un activador de monitor {#create-a-workflow-with-a-monitor-trigger}
Puede activar un flujo de trabajo desde una alerta, como la de un monitor o una señal de seguridad, según un horario o manualmente. En este caso, cree un flujo de trabajo con un activador de monitor.

Para crear un flujo de trabajo:
1. Desde la página [{{< ui >}}Workflow Automation{{< /ui >}}][5], haga clic en {{< ui >}}New Workflow{{< /ui >}}.
1. Ingrese un nombre y una descripción para el flujo de trabajo. El flujo de trabajo de ejemplo utiliza el siguiente nombre y descripción:<br>
   Nombre: `Create a Jira Ticket`.<br>
   Descripción: `Create a Jira issue and Slack notification when there is a monitor alert`.

Agregue y configure el monitor:
1. En el lienzo de flujo de trabajo, haga clic en {{< ui >}}Add Trigger{{< /ui >}} y seleccione {{< ui >}}Monitor{{< /ui >}}.
1. En la pestaña {{< ui >}}Configure{{< /ui >}}, junto a `@workflow-`, ingrese un ID único para su flujo de trabajo: `Create-Jira-Ticket`.<br>
   Los identificadores de flujo de trabajo siempre comienzan con `@workflow-`. Más adelante, utilizará este identificador para conectar el flujo de trabajo a una notificación de monitor.
1. Haga clic en {{< ui >}}Save{{< /ui >}} para guardar su flujo de trabajo.

{{< img src="/getting_started/workflow_automation/trigger1.png" alt="Activador para flujos de trabajo">}}

### Agregue las acciones de Jira y Slack {#add-the-jira-and-slack-actions}
Agregue y configure el paso de Jira:
1. En el lienzo de flujo de trabajo, haga clic en el icono {{< ui >}}\+{{< /ui >}}.
1. Busque la acción de Jira y seleccione {{< ui >}}Create issue{{< /ui >}}.
1. En el lienzo de flujo de trabajo, haga clic en el paso {{< ui >}}Create issue{{< /ui >}}.
1. En la pestaña {{< ui >}}Configure{{< /ui >}}, seleccione una {{< ui >}}Jira Account{{< /ui >}}. La cuenta debe corresponder a la URL de Jira que se encuentra en la sección {{< ui >}}Accounts{{< /ui >}} del mosaico de integración de Jira.
1. Ingrese el {{< ui >}}Project{{< /ui >}} y la {{< ui >}}Issue type{{< /ui >}} para la incidencia de Jira que crea el flujo de trabajo.
1. Ingrese un {{< ui >}}Summary{{< /ui >}} y una {{< ui >}}Description{{< /ui >}} para la incidencia de Jira, utilizando variables de contexto para transmitir datos desde el monitor que activa el flujo de trabajo. Puede acceder a una variable de contexto en un paso encerrándola entre llaves dobles (`{{`).<br><br>
   La siguiente descripción de ejemplo utiliza las variables de fuente, activador y flujo de trabajo para transmitir:
   - la fuente que activó la alerta del monitor
   - un enlace al monitor afectado
   - el nombre del flujo de trabajo y el ID del flujo de trabajo

   ```
   The CPU usage is above the 95% threshold for {{ Trigger.hostname }}

   Investigue: consulte este Datadog Dashboard para ver todas las ejecuciones del flujo de trabajo:
   https://app.datadoghq.com/dash/integration/workflow_automation?refresh_mode=sliding&from_ts=1698164453793&to_ts=1698168053793&live=true.

   El flujo de trabajo que creó este ticket de Jira es
   {{ WorkflowName }}: {{ WorkflowId }}

   El monitor que activó el flujo de trabajo se puede encontrar aquí: {{ Source.url }}
   ```

   For more information on context variables, see [Context variables][6].

1. Test the Jira action by clicking {{< ui >}}Test{{< /ui >}} in the {{< ui >}}Configure{{< /ui >}} tab. Testing the action creates a real Jira ticket.
1. Click {{< ui >}}Save{{< /ui >}} to save your workflow.

Next, add the Slack step:
1. Click the plus icon on the workflow canvas to add another step.
1. Search for Slack and select {{< ui >}}Send message{{< /ui >}}.
1. Enter the {{< ui >}}Slack Workspace name{{< /ui >}}.
1. Enter the {{< ui >}}Slack Channel name{{< /ui >}}.
1. For a more useful Slack notification, use step output variables. Step output variables allow you to pass data from the Jira step to the Slack step in your workflow. Use the following message text to include the Jira issue key, the monitor name, and the Jira issue in the Slack message:

   ```
   El monitor llamado {{ Source.monitor.name }} se activó y creó un nuevo ticket de Jira
   {{ Steps.Create_issue.issueKey }}: {{ Steps.Create_issue.issueUrl }}

   El flujo de trabajo que creó este ticket de Jira es {{ WorkflowName }}
   ```

1. To test the action, click {{< ui >}}Test{{< /ui >}} in the {{< ui >}}Configure{{< /ui >}} tab. Testing an action creates a real Slack message.
1. To view your workflow's name in the monitor's notification dropdown, save and publish your workflow. Click {{< ui >}}Publish{{< /ui >}} from the workflow's page.

## Test and publish the workflow 

<div class="alert alert-info">Testing a workflow connected to active Slack and Jira accounts creates actual Slack messages and Jira tickets.</div>

Click {{< ui >}}Save{{< /ui >}} to apply your changes to the workflow. Next, manually trigger the workflow to test it.

To trigger the workflow manually, click {{< ui >}}Run{{< /ui >}} from the workflow page, and enter the values for the trigger variables.

{{< img src="/getting_started/workflow_automation/run_workflow.png" alt="Activar un flujo de trabajo manualmente" style="width:90%;" >}}

Confirme que la ejecución del flujo de trabajo crea un ticket de Jira y envía un mensaje de Slack.

Los flujos de trabajo programados y activados no se activan automáticamente hasta que los publique. Para publicar el flujo de trabajo, haga clic en {{< ui >}}Publish{{< /ui >}} desde la página del flujo de trabajo.

## Actualice el monitor que activa su flujo de trabajo {#update-the-monitor-that-triggers-your-workflow}

1. Vaya a [la página {{< ui >}}Monitors{{< /ui >}}][7] en Datadog.
1. Busque el Monitor que desea usar para activar el flujo de trabajo y edítelo, o cree un Monitor nuevo.
1. En la sección {{< ui >}}Configure notifications & automations{{< /ui >}}, haga clic en {{< ui >}}Add Workflow{{< /ui >}}.
1. Utilice el nombre de mención del flujo de trabajo (`@workflow-Create-Jira-Ticket`) para buscar su flujo de trabajo y selecciónelo en el menú desplegable.
   - Puede pasar variables de activación al flujo de trabajo utilizando una lista separada por comas con la sintaxis `@workflow-name(key=value, key=value)`. Por ejemplo, `@workflow-Create-Jira-Ticket(hostname={{host.name}})`.
1. Haga clic en {{< ui >}}Test Notifications{{< /ui >}} para probar el flujo de trabajo y todas las notificaciones de este monitor.
1. Guarde el Monitor.

{{< img src="/getting_started/workflow_automation/monitor_trigger.png" alt="Activar un flujo de trabajo desde un monitor">}}

Cada vez que se alcanza el umbral del monitor, este activa una ejecución del flujo de trabajo.

## Historial de ejecuciones {#run-history}

Después de activar el flujo de trabajo, puede observar su progreso y depurar los pasos fallidos en la vista {{< ui >}}Run History{{< /ui >}}. Seleccione un paso ejecutado para ver las entradas, las salidas, el contexto de ejecución y los mensajes de error. El ejemplo a continuación muestra un paso que falló debido a una configuración de Jira no válida.

{{< img src="/getting_started/workflow_automation/testing_the_workflow.mp4" alt="Vista previa de la prueba del flujo de trabajo" style="width:100%" video=true >}}

Para realizar ediciones en su flujo de trabajo, haga clic en {{< ui >}}Configuration{{< /ui >}}. Para volver a la vista del historial de ejecuciones, haga clic en {{< ui >}}Run History{{< /ui >}}.

Para ver una lista de ejecuciones anteriores del flujo de trabajo y si cada una tuvo éxito o falló, utilice la vista inicial del historial de ejecuciones. Regrese al historial de ejecución inicial en cualquier momento haciendo clic en el lienzo del flujo de trabajo.

## Conclusión {#conclusion}

Cuando el monitor activa el flujo de trabajo, crea una incidencia de Jira para que su equipo de ingeniería la revise. Aquí tiene un ejemplo de incidencia de Jira:

{{< img src="/getting_started/workflow_automation/jira_ticket.png" alt="Ticket de Jira que se genera a partir del flujo de trabajo">}}

El flujo de trabajo también crea un mensaje de Slack para notificar a su equipo sobre la incidencia de Jira y la alerta del monitor. Aquí tiene un ejemplo de notificación de Slack:

{{< img src="/getting_started/workflow_automation/slack-message.png" alt="Mensaje de Slack que se genera a partir del flujo de trabajo">}}

## ¿Qué sigue? {#whats-next}

* Explore la lista de todas las acciones disponibles para los flujos de trabajo en [Action Catalog][8]. 
* Cree un flujo de trabajo a partir de una [plantilla][9] lista para usar.
* Utilice la [acción HTTP][10] para realizar una solicitud a cualquier punto de conexión.
* Implemente acciones de [transformación de datos][11] para realizar las operaciones necesarias en la información que fluye a través de su flujo de trabajo.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: /es/integrations/slack/
[3]: /es/integrations/jira/
[4]: /es/actions/connections/
[5]: https://app.datadoghq.com/workflow
[6]: /es/workflows/build/#context-variables
[7]: https://app.datadoghq.com/monitors/manage
[8]: /es/actions/actions_catalog/
[9]: /es/workflows/build
[10]: /es/actions/workflows/actions/#http
[11]: /es/actions/workflows/actions/#data-transformation