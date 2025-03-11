---
aliases:
- /es/tracing/ingestion/
- /es/tracing/trace_ingestion/
- /es/tracing/trace_retention_and_ingestion/
description: 'Aprende a controlar el consumo de tramos (spans) '
title: El pipeline de trazas
---

{{< img src="tracing/apm_lifecycle/trace_pipeline.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Pipeline de trazas" >}}

Recopila trazas (traces) de tus aplicaciones intrumentadas para obtener visibilidad de extremo a extremo de tus aplicaciones. Consulta y visualiza trazas distribuidas desde el [Trace Explorer][1], comprende cómo fluyen las solicitudes a través de tus microservicios e investiga fácilmente errores y problemas de rendimiento.

Con APM, el **consumo** y la **retención** de trazas son totalmente personalizables.

## Mecanismos de consumo

Configura el rastreo para obtener una visibilidad de extremo a extremo de tus aplicaciones con la [configuración de consumo][2] específica. Asegúrate de capturar trazas completas, incluidas todas las trazas de errores y de alta latencia para no perderte nunca los problemas de rendimiento, como una interrupción de la aplicación o una falta de respuesta de un servicio.

{{< img src="tracing/trace_indexing_and_ingestion/service_setup.png" style="width:80%;" alt="Configuración del servicio" >}}


## Controles de consumo

En la [página de Control de consumo][3], se ofrece información general de los volúmenes de consumo y de la configuración de todos tus servicios.

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_controls_page.png" style="width:100%;" alt="Información general de la página de control de consumo" >}}

## Generar métricas a partir de tramos

Puedes generar métricas a partir de tramos (spans) consumidos y utilizar esas métricas personalizadas para consultas y comparaciones. Puedes hallar más información en [Generar métricas a partir de tramos][4].

{{< img src="tracing/span_to_metrics/metrics_from_spans_1.png" style="width:100%;" alt="Gráfica de una métrica en función del tramo" >}}

## Retención de trazas

Tras el consumo de tramos por Datadog, algunos se conservan durante 15 días según los [Filtros de retención][5] que se hayan configurado en tu cuenta. El filtro de retención inteligente de Datadog indexa una proporción de trazas para ayudarte a monitorizar el estado de tus aplicaciones. Además, puedes definir tus propios filtros de retención personalizados para indexar los datos de trazas que desees conservar para respaldar los objetivos de tu organización.

{{< img src="tracing/trace_indexing_and_ingestion/retention_filters/retention_filters.png" style="width:100%;" alt="Página de filtros de retención" >}}

## Métricas de uso de trazas

Obtén más información sobre cómo rastrear y monitorizar tu volumen de datos consumidos e indexados, incluido el uso de los paneles de Uso estimado de APM y Motivos del consumo, leyendo [Métricas de uso][6].

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/dashboard_apm_usage.png" style="width:100%;" alt="Panel de uso estimado de APM" >}}


[1]: /es/tracing/trace_explorer
[2]: /es/tracing/trace_pipeline/ingestion_mechanisms/
[3]: /es/tracing/trace_pipeline/ingestion_controls
[4]: /es/tracing/trace_pipeline/generate_metrics
[5]: /es/tracing/trace_pipeline/trace_retention
[6]: /es/tracing/trace_pipeline/metrics