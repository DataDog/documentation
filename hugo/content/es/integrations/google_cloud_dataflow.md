---
app_id: google-cloud-dataflow
app_uuid: 27fcc215-6351-4e39-8320-19fe03ed7634
assets:
  dashboards:
    google_cloud_dataflow: assets/dashboards/google_cloud_dataflow.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: gcp.dataflow.job.total_vcpu_time
      metadata_path: metadata.csv
      prefix: gcp.dataflow.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 265
    source_type_name: Google Cloud Dataflow
  monitors:
    Job backlog time is high: assets/monitors/backlog_monitor.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- google cloud
- recopilación de logs
custom_kind: integración
dependencies: []
description: Realiza el seguimiento de las métricas de Google Cloud Dataflow.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/google_cloud_dataflow/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
  tag: Blog
  text: Monitorización de tus pipelines de Dataflow con Datadog
git_integration_title: google_cloud_dataflow
has_logo: true
integration_id: google-cloud-dataflow
integration_title: Google Cloud Dataflow
integration_version: ''
is_public: true
manifest_version: 2.0.0
monitors:
  Job backlog time is high: assets/monitors/backlog_monitor.json
name: google_cloud_dataflow
public_title: Google Cloud Dataflow
short_description: Un servicio gestionado para transformar y enriquecer datos tanto
  en tiempo real como en modo histórico.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Google Cloud
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Un servicio gestionado para transformar y enriquecer datos tanto en
    tiempo real como en modo histórico.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
  support: README.md#Support
  title: Google Cloud Dataflow
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Google Cloud Dataflow es un servicio totalmente gestionado para transformar y enriquecer datos en los modos flujo (stream) (en tiempo real) y batch (histórico) con la misma fiabilidad y expresividad.

Utiliza la integración de Google Cloud con Datadog para recopilar métricas de Google Cloud Dataflow.

## Configuración

### Recopilación de métricas

#### Instalación

Si aún no lo has hecho, primero configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de Google Cloud Dataflow se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google Cloud Dataflow desde Google Cloud Logging a Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra logs de Google Cloud Dataflow.
2. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_cloud_dataflow" >}}


<div class="alert alert-danger">
Al utilizar Google Cloud Dataflow para monitorizar métricas de pipelines Apache Beam, ten en cuenta que las métricas generadas a partir de <a href="https://beam.apache.org/releases/javadoc/current/org/apache/beam/sdk/metrics/Metrics.html">métodos Gauge estáticos</a> no se recopilan. Si necesitas monitorizar estas métricas, puedes utilizar <a href="https://micrometer.io/docs">Micrometer</a>.
</div>

### Eventos

La integración Google Cloud Dataflow no incluye eventos.

### Checks de servicios

La integración Google Cloud Dataflow no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/?tab=datadogussite#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_dataflow/google_cloud_dataflow_metadata.csv
[5]: https://docs.datadoghq.com/es/help/