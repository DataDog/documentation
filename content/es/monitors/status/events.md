---
further_reading:
- link: service_management/events/
  tag: Documentación
  text: Gestión de eventos
title: Status Events
---

<div class="alert alert-info">Status Events forma parte de la <a href="/monitors/status/status_page">página de Monitor Status provisional</a>. Si utilizas la página de estado legacy, consulta la documentación de la <a href="/monitors/status/status_legacy">página de estado (legacy)</a>.</div>

## Información general

{{< img src="/monitors/status/status_page_event_details.png" alt="Página de Monitor Status que muestra detalles de eventos" style="width:100%;" >}}

Todos los eventos generados por tu monitor aparecen en la página de estado del monitor y muestran el nombre del grupo, el tipo de evento, la fecha y la hora. La línea de tiempo del evento también incluye eventos de tiempo de inactividad y de Audit Trail.

Para cada evento, puedes acceder a acciones rápidas y ver recursos relacionados, como dashboards y logs.

## Sección de detalles de eventos

Para obtener más información sobre cada evento individual, incluyendo las etiquetas (tags) y las acciones asociadas:

1. En la página de estado del monitor, desplázate a **Línea de tiempo del evento**.
2. Haz clic en un evento en la línea de tiempo para ver los detalles del evento.

Utiliza los detalles del evento para comprender las alertas del monitor e identificar las causas de origen. Esta información respalda los flujos de trabajo de respuesta y te ayuda a mantenerte al tanto de las situaciones en curso.

### Tomar medidas correctivas

Con Quick Actions, puedes tomar medidas sin salir de la página de estado. El personal de respuesta ahorra tiempo, ya que el contexto se añade automáticamente.

| Acción | Descripción |
| :---- | :---- |
| Silenciar  | Crea un [tiempo de inactividad][1] para silenciar las alertas de monitor. |
| Resolver | Define temporalmente el estado del monitor como `OK` hasta su próxima evaluación. |
| Declarar un incidente | Escala las alertas de monitor con [Gestión de incidentes][2]. |
| Crear un caso | Crea un [caso][3] para seguir la investigación de esta alerta sin salir de Datadog. |
| Ejecutar un flujo de trabajo | Ejecuta [Workflow][4] Automation con fragmentos predefinidos para realizar acciones de mitigación. |

### Resolver

Puedes resolver una alerta de monitor desde el [encabezado][5] de la página de estado o desde la sección de detalles del evento. La resolución desde la sección de detalles del evento sólo afecta al grupo relacionado con el evento seleccionado, mientras que la resolución desde el encabezado resuelve todos los grupos de la alerta y define el estado del monitor como `OK` (todos los grupos).

Si un monitor alerta porque sus datos actuales corresponden al estado de la `ALERT`, el uso de `resolve` hará que el estado cambie temporalmente de `ALERT` a `OK`, y luego de nuevo a `ALERT`. Por lo tanto, `resolve` no sirve para aceptar la alerta ni para indicar a Datadog que la ignore.

Resolver manualmente un monitor es útil cuando los datos se comunican de forma intermitente. Por ejemplo, después de que se activa una alerta, el monitor puede dejar de recibir datos, lo que le impide evaluar las condiciones de alerta y recuperar el estado `OK`. En tales casos, la función `resolve` o `Automatically resolve monitor after X hours` cambian el monitor de nuevo a un estado `OK`.

**Caso de uso típico**: monitor basado en métricas de errores que no se generan cuando no hay errores (`aws.elb.httpcode_elb_5xx` o cualquier contador DogStatsD en tu código informando sobre un error _sólo cuando hay un error_).

## Sección de resolución de problemas en eventos

{{< img src="/monitors/status/events/event_troubleshooting.png" alt="Resolución de problemas en eventos con un ejemplo de mapa de dependencias" style="width:100%;" >}}

Para cada evento, accede a la información de resolución de problemas para ayudar al personal de respuesta a comprender rápidamente el contexto de la alerta.

| Componente para la resolución de problemas     | Descripción    |
| ---  | ----------- |
| Mapa de dependencias | Cuando una etiqueta de servicio está disponible, ya sea como etiqueta de monitor o en el grupo, puedes acceder a un mapa de dependencias que muestre el estado de tus dependencias. |
| Seguimiento de cambios | Cuando una etiqueta de servicio está disponible, ya sea como etiqueta de monitor o en el grupo, puedes acceder a una lista de cambios relevantes de tu servicio y sus dependencias. Para obtener más detalles sobre los tipos específicos de cambios admitidos y los requisitos de configuración, consulta la documentación [Seguimiento de cambios][6]. |


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/downtimes/?tab=bymonitorname
[2]: /es/service_management/incident_management/
[3]: /es/service_management/case_management/
[4]: /es/service_management/workflows/trigger/#trigger-a-workflow-from-a-monitor
[5]: /es/monitors/status/status_page/#header
[6]: /es/change_tracking