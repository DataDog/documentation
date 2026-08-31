---
aliases:
- /es/opentelemetry/collector_exporter/trace_metrics/
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentación
  text: Empezando con Collector
- link: /opentelemetry/guide/service_entry_spans_mapping/
  tag: Documentación
  text: Asignación de las convenciones semánticas de OpenTelemetry a tramos de entrada
    de servicio
title: Métricas de trazas
---

<div class="alert alert-info">
<a href="/opentelemetry/guide/service_entry_spans_mapping/">La asignación de convenciones semánticas de OpenTelemetry a tramos (spans) de entrada de servicio</a> ya está en la fase beta pública, e incluye mejoras en las métricas de trazas (traces) generadas a partir de tramos de OpenTelemetry.
</div>

## Información general

{{< img src="/opentelemetry/collector_exporter/trace_metrics.png" alt="Métricas de APM de OpenTelemetry" style="width:100%;" >}}

Para enviar estadísticas de APM como aciertos, errores y duración, configura el [Datadog Connector][1].

Para más información, consulta la documentación del proyecto de OpenTelemetry para el [Datadog Connector][1].

## Ajuste

Añade las siguientes líneas a tu configuración de Collector:

```yaml
processors:
  probabilistic_sampler:
    sampling_percentage: 20
connectors:
    # añade la definición del "datadog" connector y otras configuraciones
    datadog/connector:
exporters:
  datadog:
    api:
      key: ${env:DD_API_KEY}
service:
  pipelines:
   traces:
     receivers: [otlp]
     processors: [batch]
     exporters: [datadog/connector]
   traces/2:
     receivers: [datadog/connector]
     processors: [batch, probabilistic_sampler]
     exporters: [datadog]
  metrics:
    receivers: [datadog/connector]
    processors: [batch]
    exporters: [datadog]
```

## Datos recopilados

Consulta [métricas de trazas][2].

## Ejemplo completo de configuración

Para ver un ejemplo completo de configuración en funcionamiento con el exportador de Datadog, consulta [`trace-metrics.yaml`][2].

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[2]: /es/tracing/metrics/metrics_namespace/
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/trace-metrics.yaml