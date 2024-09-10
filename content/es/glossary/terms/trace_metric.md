---
core_product:
- apm
title: métrica de traza (trace)
---
Las métricas de traza se recopilan y mantienen de manera automática con una política de retención de 15 meses similar a cualquier otra [métrica de Datadog][1]. Se pueden utilizar para identificar y alertar sobre aciertos, errores o latencia. Las estadísticas y métricas siempre se calculan en función de todas las trazas y no se ven afectadas por los controles de ingesta.

Las métricas de traza son etiquetadas por el host que recibe las trazas junto con el servicio o recurso. Por ejemplo, después de instrumentar un servicio web, las métricas de traza se recopilan para el tramo (span) de punto de entrada `web.request` en la [página de **Resumen de métricas**][2].

{{< img src="tracing/visualization/trace_metrics.mp4" video="true" alt="Métricas de traza" >}}

Las métricas de traza se pueden exportar a un dashboard desde la página de **Servicio** o **Recurso**. Además, se pueden consultar desde un dashboard existente.

{{< img src="tracing/visualization/trace_metric_dashboard.mp4" video="true" alt="Dashboard de métricas de traza" >}}

Las métricas de traza son útiles para la monitorización. Los monitores de APM se pueden configurar en la página de [Monitores nuevos][3], [Servicio][4] o [Recurso][5]. Un conjunto de monitores sugeridos se encuentra disponible en la página de [Servicio][4] o [Recurso][5].


[1]: /es/developers/guide/data-collection-resolution-retention/
[2]: https://app.datadoghq.com/metric/summary
[3]: https://app.datadoghq.com/monitors
[4]: /es/tracing/services/service_page/
[5]: /es/tracing/services/resource_page/