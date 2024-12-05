---
aliases:
- /opentelemetry/guide/switch_from_processor_to_connector
title: Migrar a OpenTelemetry Collector versión 0.95.0 y posteriores
---

[OTel Collector Contrib versión 0.95.0][1] desactiva por defecto el cálculo de métricas de traza (trace) en el Exportador de Datadog.

En las versiones 0.95.0 y posteriores, el cálculo de métricas de traza es gestionado por el Datadog Connector. Este cambio asegura que:
- Las métricas de traza se calculan sistemáticamente sobre el 100% de los datos de traza, incluso cuando se aplica el muestreo.
- Mover el cálculo al Datadog Connector se alinea mejor con la arquitectura de OpenTelemetry recomendada.

Para seguir recibiendo métricas de traza, configura el Datadog Connector en el OpenTelemetry Collector.

## Migrar a OpenTelemetry Collector versión 0.95.0 y posteriores

<div class="alert alert-warning">Para continuar recibiendo métricas de traza, debes configurar el Datadog Connector como parte de tu actualización a OpenTelemetry Collector versión 0.95.0 y posteriores. La actualización sin configurar el Datadog Connector también puede provocar dificultades para visualizar la página de trazas de APM dentro de la aplicación. Los monitores y dashboards basados en métricas afectadas también podrían verse afectados.</a></div>

Antes de proceder con la actualización al OTel Collector versiones 0.95.0 y posteriores:
- Revisa las [notas de la versión](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.95.0) para comprender la naturaleza de los cambios.
- Evalúa cómo pueden afectar estos cambios a tu configuración actual y despliegue.
- Considera ponerte en contacto con el [equipo de soporte de Datadog][2] para obtener orientación y asistencia en la planificación de tu estrategia de actualización.

Para actualizar:
1. Incluye `datadog/connector` en la lista de conectores configurados.
1. Incluye `datadog/connector` y `datadog/exporter` en la lista de los exportadores configurados en tu pipeline `traces` de OpenTelemetry.
1. Incluye `datadog/connector` en la lista de los receptores configurados en tu pipeline `metrics` de OpenTelemetry.
1. Incluye `datadog/exporter` en la lista de los exportadores configurados en tu pipeline `metrics` de OpenTelemetry.

## Ejemplo de configuración

A continuación, se muestra un ejemplo de configuración de OpenTelemetry antes y después de la migración.

Antes de la migración:
```
// Configuración legacy por defecto antes de v0.95.0
receivers:
  otlp:
    protocols:
      http:
      grpc:
processors:
  batch:
exporters:
  datadog:
    api:
      key: <api key here>
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog/exporter]
```

Después de la migración:
```
// Nueva configuración por defecto después de v0.95.0
receivers:
  otlp:
    protocols:
      http:
      grpc:
processors:
  batch:
connectors:
  datadog/connector:
exporters:
  datadog/exporter:
    api:
      key: <api key here>
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog/connector, datadog/exporter]
    metrics:
      receivers: [datadog/connector, otlp] // The connector provides the metrics to your metrics pipeline
      processors: [batch]
      exporters: [datadog/exporter]
```

## Distribuciones de OpenTelemetry específicas de cada proveedor

Si estás ejecutando una distribución de OpenTelemetry específica de un proveedor que no incluye el Datadog Connector, vuelve al comportamiento anterior del conector de traza desactivando la puerta de función `exporter.datadogexporter.DisableAPMStats`.

```sh
otelcol --config=config.yaml --feature-gates=-exporter.datadogexporter.DisableAPMStats
```

Si tienes preguntas o necesitas ayuda, ponte en contacto con [el soporte de Datadog][2].

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.95.0
[2]: https://docs.datadoghq.com/es/help/