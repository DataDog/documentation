---
aliases:
- /es/opentelemetry/collector_exporter/trace_metrics/
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentación
  text: Primeros pasos con el Collector
- link: /opentelemetry/ingestion_sampling/
  tag: Documentación
  text: Muestreo de ingesta con OpenTelemetry
- link: /opentelemetry/guide/service_entry_spans_mapping/
  tag: Documentación
  text: Asignación de convenciones semánticas de OpenTelemetry a tramos de entrada
    de servicio
title: Métricas de traza
---
## Descripción general {#overview}

{{< img src="/opentelemetry/collector_exporter/trace_metrics.png" alt="Métricas de APM de OpenTelemetry" style="width:100%;" >}}

Datadog APM utiliza métricas de traza, que miden la tasa de solicitudes, los errores y la duración (RED), para alimentar Catalog, Service Page, Resource Page y cualquier elemento basado en métricas `trace.*`.

Esta página cubre las configuraciones que envían datos OTLP a Datadog, como el [OpenTelemetry Collector ascendente][1]. Si utiliza el [DDOT Collector][4] o el [Datadog Exporter and Connector][6], el Datadog Connector calcula las métricas de traza. Para los SDK de DDOT (SDK de Datadog en modo OpenTelemetry), consulte la [configuración de extrapolación de métricas de traza y las versiones mínimas][3].

## Elija una fuente {#choose-a-source}

Puede calcular métricas de traza a partir de tres fuentes. Datadog recomienda el conector `span_metrics`.

| Fuente | Comportamiento de muestreo | Facturación |
|---|---|---|
| [`span_metrics` conector](#use-the-span_metrics-connector) (recomendado) | Calcula métricas a partir de cada tramo que recibe el Collector. Coloque el conector antes de cualquier procesador de muestreo. | Incluido en APM. |
| [Métricas HTTP del SDK](#use-http-metrics-from-the-sdk) | No se ven afectadas por el muestreo de tramos, porque el SDK agrega cada solicitud antes de la exportación. | Los atributos utilizados para las métricas de traza se incluyen en APM. Las métricas HTTP sin procesar se facturan como [Custom Metrics][7] a menos que las descarte. |
| [Tramos enviados a la ingesta de Datadog](#compute-trace-metrics-in-the-datadog-intake) | Calcula métricas solo a partir de los tramos que recibe la ingesta. Para cubrir todo el tráfico, envíe tramos sin muestrear. | Incluido en APM. |

No utilice métricas HTTP junto con el conector `span_metrics`, porque Datadog calcula entonces métricas de traza a partir de ambas fuentes.

## Utilice el conector span_metrics {#use-the-span-metrics-connector}

Seleccione su entorno en la [configuración recomendada del Collector][1] y utilice el bloque completo del conector `span_metrics`. Conserve todas sus dimensiones, que Datadog utiliza para derivar etiquetas de servidor, servicios pares, nombres de operación y nombres de recursos.

Coloque el conector antes de cualquier procesador de muestreo para que calcule métricas a partir de todos los tramos que recibe el Collector.

En una [implementación de puerta de enlace][8], asigne a cada Collector ascendente su propio conector `span_metrics`. Una puerta de enlace que recibe tramos ya muestreados produce métricas con recuentos inferiores a los reales.

## Utilice métricas HTTP del SDK {#use-http-metrics-from-the-sdk}

Datadog puede calcular métricas de traza a partir de las [métricas HTTP][9] que emiten los SDK de OpenTelemetry. Esta fuente tiene los siguientes límites:

- No todos los SDK de los distintos lenguajes emiten métricas HTTP.
- Las métricas HTTP no tienen equivalente para tramos de RPC, base de datos o mensajería.
- Solo `http.server.request.duration` y `http.client.request.duration` son estables en la especificación de OpenTelemetry.

Para usar esta fuente, establezca `trace_metrics.instrumentation_metrics_calc` en `true` en el [encabezado `dd-otel-metric-config`][10]. Establezca `raw_instrumentation_metrics_drop` para conservar o descartar las métricas HTTP sin procesar.

La siguiente tabla muestra el resultado de cada combinación. Ambos campos tienen como valor predeterminado `false`.

| `trace_metrics.instrumentation_metrics_calc` | `raw_instrumentation_metrics_drop` | Resultado |
|---|---|---|
| `true` | `true` | Las métricas HTTP alimentan las métricas de traza con cardinalidad reducida. Datadog descarta las métricas HTTP sin procesar, por lo que no se facturan como Custom Metrics. |
| `true` | `false` | Las métricas HTTP alimentan las métricas de traza. Datadog también conserva las métricas HTTP sin procesar con cardinalidad completa como Custom Metrics, que puede usar en sus propios paneles y monitores. |
| `false` | `true` | Sin efecto, porque `raw_instrumentation_metrics_drop` solo se aplica cuando `trace_metrics.instrumentation_metrics_calc` es `true`. Datadog conserva las métricas HTTP sin procesar con cardinalidad completa como Custom Metrics. Para descartarlas sin alimentar las métricas de traza, fíltrelas en el Collector o desactívelas en el SDK. |
| `false` | `false` | Datadog conserva las métricas HTTP sin procesar con cardinalidad completa como Custom Metrics. |

## Calcule métricas de traza en la ingesta de Datadog {#compute-trace-metrics-in-the-datadog-intake}

Datadog no calcula métricas de traza para las trazas enviadas a la ingesta de trazas OTLP de forma predeterminada. Para calcularlas a partir de los tramos que envía, establezca el encabezado `compute_stats` en `true` en el exportador que envía las trazas. Para ver ejemplos, consulte [Enviar trazas a la ingesta de OTLP][11].

## Datos recopilados {#data-collected}

Consulte [Métricas de traza][2].

## Configuración de ejemplo completa {#full-example-configuration}

Para obtener archivos de ejemplo funcionales completos, consulte el [repositorio `opentelemetry-examples`][5].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/opentelemetry/setup/collector_exporter/#span-metrics-connector
[2]: /es/tracing/metrics/metrics_namespace/
[3]: /es/opentelemetry/ingestion_sampling/#trace-metric-extrapolation-for-datadog-sdks
[4]: /es/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/#datadog-connector
[5]: https://github.com/DataDog/opentelemetry-examples/tree/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector
[6]: /es/opentelemetry/setup/collector_exporter/datadog_exporter/
[7]: /es/metrics/custom_metrics/
[8]: https://opentelemetry.io/docs/collector/deploy/gateway/
[9]: https://opentelemetry.io/docs/specs/semconv/http/http-metrics/
[10]: /es/opentelemetry/setup/collector_exporter/#dd-otel-metric-config-header
[11]: /es/opentelemetry/setup/otlp_ingest/traces/