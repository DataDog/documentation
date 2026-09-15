---
description: Configure reglas de notificación que envíen un resumen periódico de Slack
  de las Recomendaciones de Cloud Cost que coincidan con un contexto que usted defina.
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Cloud Cost Management
- link: /cloud_cost_management/recommendations/
  tag: Documentación
  text: Recomendaciones de Cloud Cost
- link: /cloud_cost_management/recommendations/cost_optimization_automation/
  tag: Documentación
  text: Automatizaciones de optimización de Cloud Cost
title: Notifications
---
## Descripción general {#overview}

Una regla de notificación envía un resumen periódico de Slack de [Recomendaciones de Cloud Cost][1] que coinciden con un contexto que usted defina, sin realizar ninguna acción en sus recursos. Utilice una regla de notificación cuando desee visibilidad sobre nuevas oportunidades de ahorro sin configurar Datadog para realizar cambios automáticamente.

Las reglas de notificación son diferentes de las [Automatizaciones de optimización de Cloud Cost][2], que actúan sobre las recomendaciones directamente en un horario periódico.

## Requisitos previos {#prerequisites}

- Una conexión de Slack. Consulte [Integración de Slack][3].
- El permiso **Cloud Cost Management - Cloud Cost Management Write** para crear o editar una regla de notificación.

## Configure una regla de notificación {#set-up-a-notification-rule}

Para configurar una regla de notificación:

1. Navegue a [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Optimize{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}][4].
1. Seleccione la pestaña {{< ui >}}Notification{{< /ui >}}.
1. En la sección {{< ui >}}Define scope{{< /ui >}}, utilice los filtros {{< ui >}}Team{{< /ui >}}, {{< ui >}}Recommendation Type{{< /ui >}} y {{< ui >}}Env{{< /ui >}} para restringir la notificación a los recursos coincidentes. Haga clic en {{< ui >}}+ Filter{{< /ui >}} para agregar más filtros. Deje los filtros vacíos para incluir todos los recursos.
1. En la sección {{< ui >}}Set schedule{{< /ui >}}, seleccione la frecuencia de notificación, el día de ejecución, la hora de ejecución y la zona horaria.
1. En la sección {{< ui >}}Destination{{< /ui >}}, seleccione una conexión de espacio de trabajo de Slack y un canal.
1. Ingrese un nombre para la regla de notificación.
1. (Opcional) Mencione usuarios específicos de Slack en el mensaje de notificación.
1. (Opcional) Desactive el interruptor {{< ui >}}Notification enabled{{< /ui >}} para crear la regla sin activarla.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

## Administrar reglas de notificación {#manage-notification-rules}

La pestaña {{< ui >}}Notification{{< /ui >}} enumera todas las reglas de notificación de su organización. Desde esta página puede:

- Activar o desactivar una regla sin eliminarla
- Editar el contexto, el horario, el destino o el nombre de una regla
- Eliminar una regla

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloud_cost_management/recommendations/
[2]: /es/cloud_cost_management/recommendations/cost_optimization_automation/
[3]: /es/integrations/slack/
[4]: https://app.datadoghq.com/cost/optimize/automations