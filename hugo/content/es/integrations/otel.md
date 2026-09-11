---
app_id: otel
app_uuid: ca08ac68-f4a4-4d84-9c21-8f645733d62c
assets:
  dashboards:
    OpenTelemetry Collector Metrics Dashboard: assets/dashboards/otel_collector_metrics_dashboard.json
    OpenTelemetry Dashboard: assets/dashboards/otel_host_metrics_dashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - otel.datadog_exporter.metrics.running
      - otel.datadog_exporter.traces.running
      metadata_path: metadata.csv
      prefix: otel.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 312
    source_type_name: OTel
  monitors:
    Refused Spans: assets/monitors/otel_refused_spans.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- herramientas de desarrollo
- la red
- sistema operativo y sistema
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/otel/README.md
display_on_public_website: true
draft: false
git_integration_title: otel
integration_id: otel
integration_title: OpenTelemetry
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: otel
public_title: OpenTelemetry
short_description: Obtener datos de telemetría de OpenTelemetry Collector
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Network
  - Category::OS & System
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Obtener datos de telemetría de OpenTelemetry Collector
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OpenTelemetry
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->
## OpenTelemetry Collector
## Información general

<div class="alert alert-warning">
  <strong>Importante:</strong> OpenTelemetry Collector Contrib v0.95.0 introduce un cambio que desactiva el cálculo de métricas de trazas (traces) en el Datadog Exporter. Sigue la <a href="https://docs.datadoghq.com/opentelemetry/guide/migration/">guía de migración</a> al actualizarlo.
</div>

OpenTelemetry es un estándar independiente del proveedor para datos de telemetría. Datadog admite la ingesta de datos de OpenTelemetry a través de OpenTelemetry Collector y el Datadog Agent. Este ícono documenta la manera de exportar datos a Datadog a través de OpenTelemetry Collector con Datadog Exporter [OpenTelemetry Collector Datadog Exporter][1]. Consulta también [Ingesta de OTLP en el Datadog Agent ][2] para obtener más información sobre la ingesta de trazas (traces) de OTLP con el Datadog Agent.

OpenTelemetry Collector es un proceso independiente del proveedor del Agent que, a través del exportador de Datadog, exporta datos de telemetría directamente a servidores de Datadog (no requiere la instalación del Agent). Informa de métricas y trazas (traces) desde aplicaciones instrumentadas y métricas del sistema en general.

Se muestran métricas del host en el dashboard predeterminado de OpenTelemetry Host Metrics, pero puedes enviar métricas arbitrarias a Datadog utilizando OpenTelemetry Collector. Las métricas en `system.*` y `process.*`, como las generadas por el receptor de métricas del host, se renombran a `otel.system.*` y `otel.process.*` para evitar colisiones con métricas desde el Datadog Agent. Además, las métricas de OpenTelemetry Collector se muestran en el dashboard predeterminado de las métricas de OpenTelemetry Collector.

## Configuración

### Instalación

Sigue la [documentación de OpenTelemetry Collector][3] para instalar la distribución `opentelemetry-collector-contrib` o cualquier otra distribución que incluya el Datadog Exporter.

El Datadog Agent **no** es necesario para exportar datos de telemetría a Datadog en esta configuración. Consulta [OTLP Ingest en el Datadog Agent][2] si deseas utilizar el Datadog Agent en su lugar.
### Configuración

Para exportar datos de telemetría a Datadog desde OpenTelemetry Collector, añade el exportador de Datadog a tus pipelines de métricas y trazas (traces).
La única configuración necesaria es [tu clave de la API][4].

El archivo de configuración mínimo para recuperar métricas del sistema es el siguiente.

``` yaml
receivers:
  hostmetrics:
    scrapers:
      load:
      cpu:
      disk:
      filesystem:
      memory:
      network:
      paging:
      process:

processors:
  batch:
    timeout: 10s

exporters:
  datadog:
    api:
      key: "<Your API key goes here>"

service:
  pipelines:
    metrics:
      receivers: [hostmetrics]
      processors: [batch]
      exporters: [datadog]
```

Para obtener más información sobre la configuración del exportador de Datadog y la manera de configurar el pipeline, consulta el [exportador de Datadog para OpenTelemetry Collector][1].

Consulta la [sección Métricas][5] para ver los tipos de métricas y [metadata.csv][6] para obtener una lista de métricas proporcionadas por este check. Si utilizas el receptor `hostmetrics` como en el ejemplo de configuración anterior. Puedes enviar métricas arbitrarias con otros componentes de OpenTelemetry Collector.

Se pueden activar y personalizar diferentes grupos de métricas siguiendo las [instrucciones del receptor de métricas del host][7].
Las métricas de la CPU y del disco no están disponibles en macOS.

### Validación

Check los logs de OpenTelemetry Collector para ver que el exportador de Datadog está habilitado y se ha iniciado correctamente.
Por ejemplo, con la configuración anterior, deberías encontrar mensajes de registro similares a los siguientes.

``` 
Exporter is enabled.    {"component_kind": "exporter", "exporter": "datadog"}
Exporter is starting... {"component_kind": "exporter", "component_type": "datadog", "component_name": "datadog"}
Exporter started.   {"component_kind": "exporter", "component_type": "datadog", "component_name": "datadog"}
Everything is ready. Begin running and processing data.
```

## Datos recopilados

### Métricas
{{< get-metrics-from-git "otel" >}}


### Checks de servicio

El OpenTelemetry Collector no incluye ningún check de servicio.

### Eventos

El OpenTelemetry Collector no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].


[1]: https://docs.datadoghq.com/es/tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
[2]: https://docs.datadoghq.com/es/tracing/setup_overview/open_standards/otlp_ingest_in_the_agent/
[3]: https://opentelemetry.io/docs/collector/getting-started/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.datadoghq.com/es/metrics/otlp/
[6]: https://github.com/DataDog/integrations-core/blob/master/otel/metadata.csv
[7]: https://github.com/open-telemetry/opentelemetry-collector/tree/master/receiver/
[8]: https://docs.datadoghq.com/es/help/