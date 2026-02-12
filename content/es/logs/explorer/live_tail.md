---
aliases:
- /es/logs/explore/livetail
- /es/logs/live_tail
description: Buscar a través de todos tus logs y realizar análisis de log
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende a procesar tus logs
- link: logs/explorer/side_panel
  tag: Documentación
  text: Panel lateral de log
- link: logs/explorer/#list-of-logs
  tag: Documentación
  text: La vista de lista de logs
title: Live Tail
---

## Información general

Con Live Tail, accede a todos tus eventos de logs casi en tiempo real desde cualquier lugar de tu infraestructura. La vista Live Tail proporciona visibilidad tanto de los flujos de logs indexados como no indexados que se envían a Datadog. Consulta también [Filtros de exclusión][1] en índices de logs. Los logs que fluyen a través de Live Tail están todos estructurados, procesados y enriquecidos desde [pipelines de logs][2].

Por ejemplo, Live Tail es especialmente útil para comprobar si un proceso se ha iniciado correctamente o si un nuevo despliegue se ha realizado sin problemas.

## Vista de Live Tail

En el [Explorador de logs][3], elige la opción Live Tail en el intervalo de tiempo para consultar los logs a medida que fluyen hacia Datadog. Para obtener más información sobre las consultas, consulta [Sintaxis de búsqueda de logs][4].

{{< img src="logs/explorer/live_tail/livetail.mp4" alt="Log de Live Tail" video=true style="width:100%;" >}}

**Nota**: Para facilitar la lectura, los resultados de Live Tail se muestrean cuando ingresan demasiados logs que coinciden con la consulta. El muestreo aplicado es uniformemente aleatorio para que tus logs de Live Tail sean estadísticamente representativos del rendimiento real de tus logs. Si necesitas ver cada log que ingresa, delimita tu consulta con filtros de búsqueda adicionales.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/indexes#exclusion-filters
[2]: /es/logs/log_configuration/pipelines
[3]: /es/logs/explorer
[4]: /es/logs/explorer/search_syntax/
[5]: /es/logs/explorer/facets/