---
description: Conoce las métricas útiles que puedes generar a partir de los datos de
  APM.
further_reading:
- link: tracing/trace_pipeline/
  tag: Documentación
  text: Personaliza la ingesta de traza (trace) y conserva trazas (traces) importantes.
- link: tracing/trace_collection/
  tag: Documentación
  text: Instrumentar tus servicios y configurar la recopilación de datos de trazas
    en el Agent
- link: monitores/
  tag: Documentación
  text: Crea y gestiona monitores para notificar a tus equipos cuando sea importante.
kind: documentación
title: Métricas de APM
---

## Métricas de traza

[Las métricas de rastreo de la aplicación][1] se recopilan después de habilitar la recopilación de traza e instrumentar tu aplicación. Estas métricas están disponibles para dashboards y monitores.
Estas métricas capturan recuentos de **solicitud**, recuentos de **error** y medidas de **latencia**. Se calculan basándose en el 100% del tráfico de la aplicación, independientemente de cualquier configuración de [muestreo de ingesta de traza][2].

Por defecto, estas métricas se calculan en el Datadog Agent basándose en las trazas enviadas desde una aplicación instrumentada al Agent.

Los tramos y trazas ingeridos se conservan durante 15 minutos. Los tramos y trazas indexados que mantienen los filtros de retención se guardan en Datadog durante 15 días. Sin embargo, si se generan métricas personalizadas a partir de datos ingeridos, las métricas se conservan durante 15 meses.

## Métricas de tiempo de ejecución

Activa la [recopilación de métricas de tiempo de ejecución][3] en bibliotecas de rastreo para obtener información sobre el rendimiento de una aplicación. Estas métricas se envían al Datadog Agent a través del puerto de DogStatsD configurado.


## Siguientes pasos

{{< whatsnext desc="Use what you set up:" >}}
    {{< nextlink href="tracing/guide/apm_dashboard" >}}Crear un dashboard para rastrear y correlacionar métricas de APM{{< /nextlink >}}
    {{< nextlink href="monitors/create/types/apm/" >}}Crear monitores de APM que alertan y notifican cuando sucede algo inesperado{{< /nextlink >}}
{{< /whatsnext >}}


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/metrics/metrics_namespace/
[2]: /es/tracing/trace_pipeline/ingestion_mechanisms
[3]: /es/tracing/metrics/runtime_metrics/