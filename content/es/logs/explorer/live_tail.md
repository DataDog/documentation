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

Con Live Tail, accede a todos tus eventos de log casi en tiempo real desde cualquier lugar de tu infraestructura. La vista de Live Tail proporciona visibilidad tanto de los flujos indexados como de los no indexados de logs a Datadog; consulta también [Filtros de exclusión][1] en los índices de logs. Los logs que fluyen a través de Live Tail están todos estructurados, procesados y mejorados desde [pipelines de log][2].

Por ejemplo, Live Tail es especialmente útil para comprobar si un proceso se ha iniciado correctamente o si un nuevo despliegue se ha realizado sin problemas.

## Vista de Live Tail

En el [Log Explorer][3], elige la opción Live Tail en el intervalo de tiempo para consultar logs a medida que fluyen hacia Datadog. Consulta [Sintaxis de búsqueda de log][4] para obtener más información sobre las consultas.

{{< img src="logs/explorer/live_tail/livetail.mp4" alt="Live Tail de log" video=true style="width:100%;" >}}

A diferencia de las consultas sobre logs indexados que se realizan en [Log Explorer][3], las consultas en Live Tail *no* requieren que se [declare una faceta][5] de antemano. 

**Nota**: A favor de la legibilidad, la salida de Live Tail se muestrea cuando entran demasiados logs que coinciden con la consulta. El muestreo aplicado es uniformemente aleatorio, de modo que tus logs de Live Tail son estadísticamente representativos del rendimiento real del log. Reduce tu consulta con filtros de búsqueda adicionales si necesitas visibilidad de cada log presente.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/indexes#exclusion-filters
[2]: /es/logs/log_configuration/pipelines
[3]: /es/logs/explorer
[4]: /es/logs/explorer/search_syntax/
[5]: /es/logs/explorer/facets/