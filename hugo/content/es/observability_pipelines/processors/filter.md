---
description: Aprenda a utilizar el procesador Filter para enviar solo los logs, métricas
  o trazas que coincidan con una consulta de filtro al siguiente paso de la canalización.
disable_toc: false
further_reading:
- link: /getting_started/search/
  tag: Documentación
  text: Introducción a la búsqueda en Datadog
- link: /logs/explorer/search_syntax/
  tag: Documentación
  text: Sintaxis de búsqueda de Log Management
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: Métricas
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Procesador Filter
---
{{< product-availability >}}

## Descripción general {#overview}

Este procesador envía todos los logs o métricas que coinciden con la consulta de filtro al siguiente paso de la canalización. Los eventos que no coinciden con la consulta de filtro se descartan y no se envían a ningún procesador o destino posterior.

**Nota**: Para todas las demás consultas de procesador, los eventos que no coinciden con la consulta se envían al siguiente paso de la canalización. No se descartan.

## Configuración {#setup}

Para configurar el procesador Filter:

- Defina un {{< ui >}}filter query{{< /ui >}}. Consulte [Sintaxis de búsqueda de logs][1] o [Sintaxis de búsqueda de métricas][2] para obtener más información.
  - Los eventos que coinciden con la consulta se envían al siguiente componente.
  - Los eventos que no coinciden con la consulta se descartan.

## Métricas de salud {#health-metrics}

Para [métricas de componentes][3] y [métricas de búfer de procesador][4] emitidas por todos los procesadores, consulte la documentación sobre [métricas de uso de Pipelines][5]. Para filtrar o agrupar por métricas del procesador Filter, utilice la etiqueta `component_type:opw_filter`.

[1]: /es/observability_pipelines/search_syntax/logs
[2]: /es/observability_pipelines/search_syntax/metrics
[3]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[4]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[5]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}