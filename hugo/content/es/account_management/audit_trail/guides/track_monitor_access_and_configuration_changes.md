---
disable_toc: false
further_reading:
- link: account_management/audit_trail/
  tag: Documentación
  text: Configurar Audit Trail
title: Rastrear el acceso a un monitor y los cambios en su configuración
---

## Información general

Audit Trail brinda a los administradores de Datadog visibilidad sobre quién dentro de la organización está utilizando Datadog y cómo lo está haciendo. En esta guía, se explica cómo ver la información del uso de un monitor específico.

## Ver la información del uso de un monitor específico

### Obtener el ID del monitor

Necesitas el ID del monitor para obtener información sobre su uso.

1. Navega hasta [Monitors][1] (Monitores).
1. Selecciona tu monitor.
1. El ID del monitor se encuentra en la URL del monitor, situada después de `https://app.datadoghq.com/monitors/`. Por ejemplo, si la URL del monitor es `https://app.datadoghq.com/monitors/123456789`, el ID del monitor es `123456789`.
1. Copia el ID del monitor.

### Ver el uso del monitor en Audit Trail

Para ver la información del uso del monitor, utiliza Audit Trail para buscar todas las solicitudes de API `GET` de ese ID de monitor.

1. Navega hasta [Audit Trail][2].
2. En la barra de búsqueda, ingresa la consulta `@http.status_code:200 @http.method:GET @http.url_details.path:/api/v1/monitor/<monitor_id>`. Sustituye `<monitor_id>` por el ID de monitor que copiaste antes.

   Por ejemplo, si el ID de monitor es `123456789`, la consulta de búsqueda debe ser `@http.status_code:200 @http.method:GET @http.url_details.path:/api/v1/monitor/123456789`. `@http.status_code:200` limita los resultados a las solicitudes exitosas.

   **Nota**: También puedes utilizar el panel de facetas de la parte izquierda de la página para formular la consulta de búsqueda.
3. Selecciona el marco temporal en la parte superior derecha de la página para ver los eventos de un periodo específico.
4. Puedes configurar la sección **Group into fields** (Agrupar en campos) y seleccionar diferentes herramientas de visualización para desglosar y analizar los datos en función de tu caso de uso. Por ejemplo, si estableces el campo `group by` en `User Email` y haces clic en **Top List** (Lista de principales) en la sección **Visualize as** (Visualizar como), obtendrás una lista de los usuarios principales que accedieron al monitor.
5. Consulta [Crear un dashboard o un gráfico][3] si deseas incluir esta información en un dashboard o un gráfico.

## Ver los cambios recientes en la configuración del monitor

Puedes utilizar las [consultas de eventos][8] en Audit Trail para ver una lista de los monitores con cambios recientes en sus configuraciones.

1. Navega hasta [Audit Trail][2].
1. En el campo **Search for** (Buscar), pega una consulta para filtrar el tipo de cambios que deseas ver. Los siguientes son algunos ejemplos comunes:

   | Evento de auditoría           | Consulta en el explorador de auditorías                                  |
   |-----------------------|----------------------------------------------------------|
   | [Monitor creado][4]  | `@evt.name:Monitor @asset.type:monitor @action:created`  |
   | [Monitor modificado][5] | `@evt.name:Monitor @asset.type:monitor @action:modified` |
   | [Monitor eliminado][6]  | `@evt.name:Monitor @asset.type:monitor @action:deleted`  |
   | [Monitor resuelto][7] | `@evt.name:Monitor @asset.type:monitor @action:resolved` |

1. De manera opcional, en el panel de facetas, utiliza filtros como **Asset ID** (ID de activo) o **Asset Name** (Nombre de activo) para restringir los resultados a un monitor específico.
1. Para cada evento de la tabla, puedes ver la dirección de correo electrónico del usuario que realizó el último cambio y un resumen de lo sucedido. 

   Para ver información adicional sobre un cambio concreto, haz clic en la fila de la tabla. Luego, haz clic en la pestaña **Inspect Changes (Diff)** (Inspeccionar cambios [diferencias]) para ver los cambios realizados en la configuración del monitor:

   {{< img src="account_management/audit_logs/monitor_change_diff.png" alt="Una diferencia de texto en la que se muestra la adición de una etiqueta (tag) `check_type: api` al monitor" style="width:100%;" >}}

1. Consulta [Crear un dashboard o un gráfico][3] si deseas incluir esta información en un dashboard o un gráfico.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: https://app.datadoghq.com/audit-trail
[3]: /es/account_management/audit_trail/#create-a-dashboard-or-a-graph
[4]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Acreated
[5]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Amodified
[6]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Adeleted
[7]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Aresolved
[8]: /es/account_management/audit_trail/events/#monitor-events