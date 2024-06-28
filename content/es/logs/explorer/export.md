---
aliases:
- /es/logs/export
description: Exporta tu vista de Log Explorer para reutilizarla más tarde o en contextos
  diferentes.
further_reading:
- link: logs/explorer/search
  tag: Documentación
  text: Aprende a filtrar logs
- link: logs/explorer/analytics
  tag: Documentación
  text: Aprende a agrupar logs
- link: logs/explorer/visualize
  tag: Documentación
  text: Crear visualizaciones a partir de logs
kind: documentación
title: Exportar logs
---

## Información general

En cualquier momento, y según tu agregación actual, **exporta** o **guarda** tu exploración de log como:

- [**Vista guardada**][1], para utilizarlo como punto de partida de la investigación en el futuro o para tus compañeros de equipo.
- [**Widget de dashboard**][2] o [**Widget de notebooks**][8], a efectos de información o consolidación.
- [**Monitor**][3], para activar alertas en función de umbrales predefinidos.
- [**Métrica**][4], para agregar tus logs en KPIs a largo plazo, ya que se ingieren en Datadog.
- **Comando cURL**, para probar tus consultas en el Log Explorer y, a continuación, crear informes personalizados utilizando [APIs de Datadog][5].
- **CSV** (para logs individuales y transacciones). Puedes exportar hasta 100.000 logs a la vez para logs individuales, 300 para patrones y 500 para transacciones. También puedes descargar una serie temporal, una lista de principales, o una vista de tabla como archivo CSV.
- **Compartir vista: comparte un enlace a la vista actual con tus compañeros de equipo a través de correo electrónico, Slack, etc. Consulta todas las [integraciones de notificación de Datadog][6] disponibles para esta función.

{{< img src="logs/explorer/export3.png" alt="Filtro de búsqueda" style="width:100%;" >}}

También puedes guardar logs individuales en un notebook seleccionando `Save to notebook` en el panel lateral del evento de log. Los logs guardados en notebooks se muestran en un formato de fácil lectura, y esta visualización se guarda en el notebook incluso después de que el propio evento de log haya dejado de conservarse.

{{< img src="logs/explorer/save_logs_to_notebooks.png" alt="Guardar logs en notebooks" style="width:80%;" >}}

Para recuperar una lista de log más larga que el límite máximo de 1000 logs devuelto por la API de logs, utiliza [la función de paginación][7].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/explorer/saved_views/
[2]: /es/dashboards/
[3]: /es/monitors/types/log/
[4]: /es/logs/logs_to_metrics
[5]: /es/api/latest/logs/
[6]: /es/integrations/#cat-notification
[7]: /es/logs/guide/collect-multiple-logs-with-pagination/?tab=v2api
[8]: /es/notebooks/