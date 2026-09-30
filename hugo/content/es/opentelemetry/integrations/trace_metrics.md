---
aliases:
- /es/opentelemetry/collector_exporter/trace_metrics/
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentación
  text: Primeros pasos con el Collector
- link: /opentelemetry/guide/service_entry_spans_mapping/
  tag: Documentación
  text: Asignación de convenciones semánticas de OpenTelemetry a spans de entrada
    de servicio
title: Métricas de traza
---
## Descripción general {#overview}

{{< img src="/opentelemetry/collector_exporter/trace_metrics.png" alt="Métricas de APM de OpenTelemetry" style="width:100%;" >}}

Para enviar estadísticas de APM como hits, errores y duración, configure el [`span_metrics` conector][1]. Configure el conector para recibir todas las trazas antes de cualquier procesador de muestreo, de modo que las métricas de traza representen el tráfico no muestreado.

## Configuración {#setup}

Seleccione su entorno en la [configuración recomendada del Collector][1] y utilice su bloque de conector `span_metrics` completo. Conserve todas sus dimensiones, que Datadog utiliza para derivar etiquetas de servidor, servicios pares, nombres de operaciones y nombres de recursos.

## Datos recopilados {#data-collected}

Consulte [Métricas de traza][2].

## Ejemplo de configuración completo {#full-example-configuration}

Para obtener archivos de ejemplo completos y funcionales, consulte el [`opentelemetry-examples` repositorio][5].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/opentelemetry/setup/collector_exporter/#span-metrics-connector
[2]: /es/tracing/metrics/metrics_namespace/
[5]: https://github.com/DataDog/opentelemetry-examples/tree/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector