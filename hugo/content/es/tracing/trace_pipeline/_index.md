---
aliases:
- /es/tracing/ingestion/
- /es/tracing/trace_ingestion/
- /es/tracing/trace_retention_and_ingestion/
description: Aprenda a controlar la ingesta de tramos
further_reading:
- link: https://learn.datadoghq.com/courses/apm-rate-limit-retention
  tag: Centro de aprendizaje
  text: Limitación de tasa y retención de APM
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: Centro de arquitectura
  text: 'Dominio del rastreo distribuido: desafíos de volumen de datos y el enfoque
    de Datadog para un muestreo eficiente'
- link: https://www.datadoghq.com/architecture/optimizing-distributed-tracing-best-practices-for-remaining-within-budget-and-capturing-critical-traces/
  tag: Centro de arquitectura
  text: 'Optimización del rastreo distribuido: mejores prácticas para mantenerse dentro
    del presupuesto y capturar trazas críticas'
title: La canalización de trazas
---
{{< img src="tracing/apm_lifecycle/trace_pipeline.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Canalización de trazas" >}}

Recopile trazas de sus aplicaciones instrumentadas para obtener visibilidad de extremo a extremo en sus aplicaciones. Consulte y visualice trazas distribuidas desde el [Trace Explorer][1], comprenda cómo fluyen las solicitudes a través de sus microservicios e investigue fácilmente errores y problemas de rendimiento.

Con APM, tanto la **ingesta** como la **retención** de trazas son totalmente personalizables.

## Mecanismos de ingesta {#ingestion-mechanisms}

Configure el trazado para obtener visibilidad de extremo a extremo en sus aplicaciones con una [configuración de ingesta][2] detallada. Asegúrese de capturar trazas completas, incluyendo todas las trazas de error y de alta latencia, para no perderse nunca problemas de rendimiento como una interrupción de la aplicación o un servicio que no responde.

{{< img src="tracing/trace_indexing_and_ingestion/service_setup.png" style="width:80%;" alt="Configuración de servicio" >}}


## Ingestion Control {#ingestion-controls}

La [Ingestion Control page][3] ofrece una visión general de los volúmenes de ingesta y los ajustes de configuración en sus servicios.

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_controls_page.png" style="width:100%;" alt="Descripción general de la página de Ingestion Control" >}}

## Processing Pipelines {#processing-pipelines}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">Processing Pipelines no son compatibles en {{< region-param key="dd_site_name" >}}.</div>
{{< /site-region >}}

Transforme, normalice y enriquezca los atributos de los tramos después de la ingesta con [Processing Pipelines][7]. Estandarice la nomenclatura de atributos en todos los servicios, consolide claves inconsistentes y extraiga datos estructurados de los valores de los tramos, sin modificar el código de la aplicación.

{{< img src="tracing/processing_pipelines/manage_pipelines.png" style="width:100%;" alt="Processing Pipelines" >}}

## Generación de métricas a partir de tramos {#generating-metrics-from-spans}

Puede generar métricas a partir de tramos ingeridos y utilizar esas métricas personalizadas para consultas y comparaciones. Obtenga más información en [Generación de métricas a partir de tramos][4].

{{< img src="tracing/span_to_metrics/metrics_from_spans_1.png" style="width:100%;" alt="Gráfico de una métrica basada en tramos" >}}

## Retención de trazas {#trace-retention}

Después de que se ingieren los tramos, [Retention Filters][5] determinan qué tramos individuales se indexan y almacenan durante 15 días. El Filtro de retención inteligente de Datadog indexa automáticamente una selección representativa de tramos para ayudarle a hacer un seguimiento el estado de la aplicación. También puede definir filtros de retención personalizados para indexar tramos adicionales que sean importantes para los objetivos de su organización.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filters.png" style="width:100%;" alt="Página de filtros de retención" >}}

## Métricas de uso de trazas {#trace-usage-metrics}

Obtenga información sobre cómo realizar el seguimiento y monitorear su volumen de datos ingeridos e indexados, incluido el uso de los dashboards de APM Estimated Usage y Ingestion Reasons, leyendo [Métricas de uso][6].

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/dashboard_apm_usage.png" style="width:100%;" alt="APM Estimated Usage Dashboard" >}}


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_explorer
[2]: /es/tracing/trace_pipeline/ingestion_mechanisms/
[3]: /es/tracing/trace_pipeline/ingestion_controls
[4]: /es/tracing/trace_pipeline/generate_metrics
[5]: /es/tracing/trace_pipeline/trace_retention
[6]: /es/tracing/trace_pipeline/metrics
[7]: /es/tracing/trace_pipeline/processing_pipelines