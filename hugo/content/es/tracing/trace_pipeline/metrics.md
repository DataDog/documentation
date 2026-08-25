---
aliases:
- /es/tracing/trace_retention_and_ingestion/usage_metrics/
- /es/tracing/trace_retention/usage_metrics/
- /es/tracing/trace_ingestion/usage_metrics/
description: Aprende cómo monitorizar tu uso de APM.
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: Documentación
  text: Ingesta de trazas
- link: /tracing/trace_pipeline/trace_retention/
  tag: Documentación
  text: Retención de trazas
title: Métricas de uso
---

## Información general

Las siguientes páginas de configuración de la aplicación te permiten configurar los volúmenes ingeridos e indexados para APM:
- Utiliza la **[Página de control de ingesta][1]** para controlar el volumen de tramos (spans) ingeridos.
- Utiliza la **[Página de filtros de retención][2]** para controlar el número de tramos indexados.

Ambas páginas funcionan con **métricas de uso**.

Tu cuenta dispone de las siguientes métricas:

 - `datadog.estimated_usage.apm.ingested_bytes` (dimensión facturada)
 - `datadog.estimated_usage.apm.ingested_spans`
 - `datadog.estimated_usage.apm.ingested_traces`
 - `datadog.estimated_usage.apm.indexed_spans` (dimensión facturada)


Aprovecha estas métricas en los dashboards y monitors para visualizar y controlar tu uso. Con estas métricas se crean dos dashboards predefinidos. Estos dashboards ayudan a
 monitorizar tu uso de APM y tus volúmenes de tramos ingeridos e indexados.

Los planes de Datadog APM vienen con tramos indexados e ingeridos incluidos. Para obtener más información, consulta la [Página de precios][3] o algunos [ejemplos de situaciones de precios][4].

### Volumen de tramos ingeridos

Las siguientes métricas están asociadas al uso de tramos ingeridos:

 - `datadog.estimated_usage.apm.ingested_bytes`
 - `datadog.estimated_usage.apm.ingested_spans`
 - `datadog.estimated_usage.apm.ingested_traces`

Para controlar el uso, utiliza `datadog.estimated_usage.apm.ingested_bytes`. La ingestión se mide por volumen, no por el número de tramos o trazas (traces). Esta métrica está etiquetada con `env`, `service` y`sampling_service`. Estas etiquetas (tags) ayudan a identificar qué entornos y servicios contribuyen al volumen de ingestión. Para obtener más información sobre la dimensión `sampling_service`, consulta [¿Qué es el servicio de muestreo?](#what-is-the-sampling-service).

Esta métrica también está etiquetada por `ingestion_reason`, lo que refleja qué [mecanismos de ingesta][5] son responsables de enviar tramos a Datadog. Estos mecanismos están anidados en las bibliotecas de rastreo del Datadog Agent. Para más información sobre esta dimensión, consulta el [Dashboard de motivos de ingesta][6].

La métrica de `datadog.estimated_usage.apm.ingested_traces` mide el número de solicitudes muestreadas por segundo y solo cuenta las trazas muestreadas mediante [head-based sampling (muestreo basado en la fase inicial)][7]. Esta métrica también está etiquetada por `env` y por `service` para que puedas detectar qué servicios inician la mayor parte de las trazas.

#### ¿Qué es el servicio de muestreo?

La dimensión `sampling_service` en `datadog.estimated_usage.apm.ingested_bytes` asigna los bytes ingeridos al **servicio que toma la decisión de muestreo**, no al servicio que emite el tramo.

Agrupa las métricas por `sampling_service` para identificar los servicios que más contribuyen a los volúmenes totales ingeridos. Por ejemplo, si el servicio `A` inicia una traza y toma una decisión de muestreo basada en cabeceras antes de llamar a los servicios `B` y `C`, todos los bytes de los servicios `A`, `B` y `C` se atribuyen a `sampling_service:A`.

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/sampling_service.png" style="width:80%;" alt="Explicación del servicio de muestreo de bytes ingeridos" >}}

### Tramos indexados

Utiliza la métrica de `datadog.estimated_usage.apm.indexed_spans` para controlar el número de tramos indexados por los [filtros de retención basados en etiquetas][2].

Esta métrica está etiquetada por `env` y por `service` para que puedas detectar qué entornos y servicios contribuyen al uso de la indexación.

## Dashboard de uso estimado de trazas de APM

El [Dashboard de uso de trazas de APM][8] contiene varios grupos de widgets que muestran KPI de alto nivel e información de uso adicional.

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/dashboard_apm_usage.png" style="width:100%;" alt="Dashboard de uso estimado de APM" >}}

En este dashboard, puedes encontrar la siguiente información:

- Métricas de uso global
- Infraestructura con APM activado, incluidos hosts, Fargate y AWS Lambda
- Volúmenes de ingesta separados por `service`, `env` y `ingestion_reason`
- Volúmenes de indexación separados por `service` y `env`

## Dashboard de motivos de ingesta de APM

El [Dashboard de motivos de ingesta de APM][6] brinda información sobre cada fuente de volumen de ingesta. Cada métrica del uso de ingesta está etiquetada con una dimensión `ingestion_reason`, para que puedas ver qué opciones de configuración (configuración del Datadog Agent o configuración de librerías de rastreo) y productos (como RUM o Testing Sintético) están generando la mayor cantidad de datos de APM.

{{< img src="tracing/trace_indexing_and_ingestion/usage_metrics/dashboard_ingestion_reasons.png" style="width:100%;" alt="Dashboard de motivos de ingesta de APM" >}}

Para cada motivo de ingesta, puedes averiguar qué entornos y servicios contribuyen en mayor medida al volumen total.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_pipeline/ingestion_controls
[2]: /es/tracing/trace_pipeline/trace_retention/#retention-filters
[3]: https://www.datadoghq.com/pricing/?product=apm#apm
[4]: /es/account_management/billing/apm_tracing_profiler/
[5]: /es/tracing/trace_pipeline/ingestion_mechanisms/
[6]: https://app.datadoghq.com/dash/integration/apm_ingestion_reasons
[7]: /es/tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
[8]: https://app.datadoghq.com/dash/integration/apm_estimated_usage
