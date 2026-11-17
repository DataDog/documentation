---
core_product:
- apm
id: trace_metric
title: métrica de traza
---
Las métricas de traza se recopilan automáticamente y se conservan con una política de retención de 15 meses similar a cualquier otra [métrica de Datadog][1]. Se pueden usar para identificar y alertar sobre hits, errores o latencia. Las estadísticas y las métricas siempre se calculan en función de todas las trazas y no se ven afectadas por los controles de ingesta.

Las métricas de traza están etiquetadas por el servidor que recibe las trazas junto con el servicio o recurso. Por ejemplo, después de instrumentar un servicio web, las métricas de traza se recopilan para el tramo de punto de entrada `web.request` en la página [**Metrics Catalog**][2].

{{< img src="tracing/visualization/trace_metrics.mp4" video="true" alt="métricas de traza" >}}

Las métricas de traza se pueden exportar a un panel desde la página de **Service** o **Resource**. Además, las métricas de traza se pueden consultar desde un panel existente.

{{< img src="tracing/visualization/trace_metric_dashboard.mp4" video="true" alt="panel de métricas de traza" >}}

Las métricas de traza son útiles para el monitoreo. Los monitores de APM se pueden configurar en la página [New Monitors][3], [Service][4] o [Resource][5]. Un conjunto de monitores sugeridos está disponible en la página [Service][4] o [Resource][5].


[1]: /es/extend/guide/data-collection-resolution/
[2]: https://app.datadoghq.com/metric/catalog
[3]: https://app.datadoghq.com/monitors
[4]: /es/tracing/services/service_page/
[5]: /es/tracing/services/resource_page/