---
description: Configure reglas de notificación que envíen un resumen recurrente de
  Slack o Microsoft Teams de las Cloud Cost Recommendations que coincidan con un contexto
  que usted defina.
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Cloud Cost Management
- link: /cloud_cost_management/recommendations/
  tag: Documentación
  text: Recomendaciones de Cloud Cost
- link: /cloud_cost_management/recommendations/cost_optimization_automation/
  tag: Documentación
  text: Automatizaciones de optimización de costos
title: Notifications
---
## Descripción general {#overview}

Una regla de notificación envía un resumen recurrente de Slack o Microsoft Teams de las Cloud Cost Recommendations que coincidan con un contexto que usted defina, sin realizar ninguna acción en sus recursos. Utilice una regla de notificación cuando desee visibilidad sobre nuevas oportunidades de ahorro sin configurar Datadog para realizar cambios automáticamente.

Las reglas de notificación son diferentes de las [automatizaciones de optimización de costos][2], que actúan sobre las recomendaciones directamente en un horario recurrente.

## Requisitos previos {#prerequisites}

- El permiso **Cloud Cost Management - Cloud Cost Management Write** para crear o editar una regla de notificación.
- Un espacio de trabajo de Slack o un inquilino de Microsoft Teams con la aplicación de Datadog instalada. Consulte la [integración de Slack][3] o la [integración de Microsoft Teams][5]. Para un canal privado de Slack, agregue la aplicación de Datadog para Slack a ese canal antes de seleccionarlo como destino.

## Configure una regla de notificación {#set-up-a-notification-rule}

Para configurar una regla de notificación:

1. Navegue a [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Optimize{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}][4].
1. Seleccione la pestaña {{< ui >}}Notification{{< /ui >}}.
1. En la sección {{< ui >}}Define scope{{< /ui >}}, utilice los filtros {{< ui >}}Team{{< /ui >}}, {{< ui >}}Recommendation Type{{< /ui >}} y {{< ui >}}Env{{< /ui >}} para restringir la notificación a los recursos coincidentes. Haga clic en {{< ui >}}\+ Filter{{< /ui >}} para agregar más filtros. Deje los filtros vacíos para incluir todos los recursos.
1. En la sección {{< ui >}}Set schedule{{< /ui >}}, seleccione la frecuencia de notificación, el día de ejecución, la hora de ejecución y la zona horaria.
1. En la sección {{< ui >}}Destination{{< /ui >}}, seleccione {{< ui >}}Slack{{< /ui >}} o {{< ui >}}Microsoft Teams{{< /ui >}}, luego seleccione un espacio de trabajo y un canal (Slack) o un inquilino, Teams y canal (Microsoft Teams).
1. Ingrese un nombre para la regla de notificación.
1. (Opcional) Mencione usuarios específicos de Slack en el mensaje de notificación.
1. (Opcional) Desactive el interruptor {{< ui >}}Notification enabled{{< /ui >}} para crear la regla sin activarla.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

## Administrar reglas de notificación {#manage-notification-rules}

La pestaña {{< ui >}}Notification{{< /ui >}} enumera todas las reglas de notificación de su organización. Desde esta página, usted puede:

- Activar o desactivar una regla sin eliminarla
- Editar el contexto, el horario, el destino o el nombre de una regla
- Eliminar una regla

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloud_cost_management/recommendations/
[2]: /es/cloud_cost_management/recommendations/cost_optimization_automation/
[3]: /es/integrations/slack/
[4]: https://app.datadoghq.com/cost/optimize/automations
[5]: /es/integrations/microsoft_teams/