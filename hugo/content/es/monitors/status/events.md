---
description: Visualice y administre los eventos del monitor en la página de estado,
  incluyendo acciones rápidas, detalles del evento y herramientas de solución de problemas.
further_reading:
- link: events/
  tag: Documentación
  text: Event Management
title: Eventos de Estado
---
<div class="alert alert-info">Eventos de Estado es parte de la <a href="/monitors/status/status_page">Página de Estado del Monitor provisional</a>. Si está utilizando la página de estado heredada, consulte la documentación de <a href="/monitors/status/status_legacy">Página de estado (heredada)</a>.</div>

## Descripción general {#overview}

{{< img src="/monitors/status/status_page_event_details.png" alt="Página de Estado del Monitor que muestra los detalles del evento" style="width:100%;" >}}

Todos los eventos generados por su monitor aparecen en la Página de Estado del Monitor, mostrando el nombre de los grupos, el tipo de evento y la marca de tiempo. La línea de tiempo de eventos también incluye eventos de tiempo de inactividad y de registro de auditoría.

Para cada evento, puede acceder a acciones rápidas y visualizar activos relacionados, como tableros y registros.

## Sección de detalles del evento {#event-details-section}

Para explorar cada evento individual y obtener más información, incluyendo etiquetas y acciones asociadas:

1. Desde la página de estado del monitor, desplácese hacia abajo hasta {{< ui >}}Event timeline{{< /ui >}}.
2. Haga clic en un evento en la línea de tiempo para visualizar los detalles del evento.

Utilice los detalles del evento para comprender las alertas del monitor, e identificar las causas raíz. Esta información respalda los flujos de trabajo de los respondedores y le ayuda a mantenerse informado sobre las situaciones en curso.

### Tome medidas para remediar {#take-action-to-remediate}

Con las Acciones rápidas, puede tomar medidas sin salir de la página de estado. Los respondedores ahorran tiempo ya que el contexto se agrega automáticamente.

| Acción | Descripción |
| :---- | :---- |
| {{< ui >}}Mute{{< /ui >}}  | Cree un [tiempo de inactividad][1] para silenciar las alertas del monitor. |
| {{< ui >}}Resolve{{< /ui >}} | Establezca temporalmente el estado del monitor en `OK` hasta su próxima evaluación. |
| {{< ui >}}Declare Incident{{< /ui >}} | Escale las alertas del monitor con [Incident Management][2]. |
| {{< ui >}}Create Work Item{{< /ui >}} | Cree un [elemento de trabajo][3] para realizar un seguimiento de esta investigación de alerta sin salir de Datadog. |
| {{< ui >}}Run Workflow{{< /ui >}} | Ejecute la automatización de [Flujo de trabajo][4] con fragmentos predefinidos para ejecutar acciones de mitigación. |

### Resolver {#resolve}

Puede resolver una alerta de monitor desde la página de estado [Header][5] o las secciones de detalles del evento. La resolución desde la sección de detalles del evento solo afecta al grupo relacionado con el evento seleccionado, mientras que la resolución desde el Header resuelve todos los grupos en la alerta y establece el estado del monitor en `OK` (todos los grupos).

Si un monitor está alertando debido a que sus datos actuales corresponden al estado `ALERT`, el uso de `resolve` hará que el estado cambie temporalmente de `ALERT` a `OK`, y luego vuelva a `ALERT`. Por lo tanto, `resolve` no está destinado a reconocer la alerta ni a indicar a Datadog que la ignore.

Resolver manualmente un monitor es útil cuando los datos se reportan de forma intermitente. Por ejemplo, después de que se activa una alerta, el monitor puede dejar de recibir datos, lo que impide que evalúe las condiciones de alerta y se recupere al estado `OK`. En tales casos, la función `resolve` o {{< ui >}}Automatically resolve monitor after X hours{{< /ui >}} cambia el monitor de nuevo a un estado `OK`.

**Caso de uso típico**: un monitor basado en métricas de error que no se generan cuando no hay errores (`aws.elb.httpcode_elb_5xx`, o cualquier contador de DogStatsD en su código que reporte un error _solo cuando hay un error_).

## Sección de solución de problemas de eventos {#event-troubleshooting-section}

{{< img src="/monitors/status/events/event_troubleshooting.png" alt="Solución de problemas de eventos con un mapa de dependencias de ejemplo" style="width:100%;" >}}

Para cada evento, acceda a la información de solución de problemas para ayudar a los respondedores a comprender rápidamente el contexto de la alerta.

| Componente de solución de problemas     | Descripción    |
| ---  | ----------- |
| {{< ui >}}Dependency Map{{< /ui >}} | Cuando una etiqueta de servicio está disponible, ya sea como etiqueta de monitor o en el grupo, puede acceder a un mapa de dependencias que muestra el estado de sus dependencias. |
| {{< ui >}}Change Tracking{{< /ui >}} | Cuando una etiqueta de servicio está disponible, ya sea como etiqueta de monitor o en el grupo, puede acceder a una lista de cambios relevantes en su servicio y sus dependencias. Para obtener detalles sobre tipos específicos de cambios admitidos y requisitos de configuración, consulte la documentación de [Change Tracking][6]. |


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/downtimes/?tab=bymonitorname
[2]: /es/incident_response/incident_management/
[3]: /es/incident_response/work_management/
[4]: /es/actions/workflows/trigger/#trigger-a-workflow-from-a-monitor
[5]: /es/monitors/status/status_page/#header
[6]: /es/change_tracking