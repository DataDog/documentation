---
app_id: google-cloud-tpu
app_uuid: c20f781b-e1d0-438e-b33d-0bc4bb4c6d0a
assets:
  dashboards:
    google-cloud-tpu-overview: assets/dashboards/google_cloud_tpu_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - gcp.tpu.cpu.utilization
      - gcp.tpu.memory.usage
      - gcp.tpu.network.received_bytes_count
      - gcp.tpu.red.sent_bytes_count
      - gcp.tpu.accelerator.duty_cycle
      - gcp.tpu.instance.uptime_total
      - gcp.gke.node.accelerator.tensorcore_utilization
      - gcp.gke.node.accelerator.duty_cycle
      - gcp.gke.node.accelerator.memory_used
      - gcp.gke.node.accelerator.memory_total
      - gcp.gke.node.accelerator.memory_bandwidth_utilization
      - gcp.gke.container.accelerator.tensorcore_utilization
      - gcp.gke.container.accelerator.duty_cycle
      - gcp.gke.container.accelerator.memory_used
      - gcp.gke.container.accelerator.memory_total
      - gcp.gke.container.accelerator.memory_bandwidth_utilization
      metadata_path: metadata.csv
      prefix: gcp.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 275
    source_type_name: Google Cloud TPU
  monitors:
    Container Duty Cycle Low Percentage: assets/monitors/tpu_container_low_duty_cycle_percentage.json
    Container Memory Bandwidth Low Utilization: assets/monitors/tpu_container_memory_bandwidth_under_utilization.json
    Container Tensorcore Utilization Low Utilization: assets/monitors/tpu_container_tensorcore_under_utilization.json
    Node Duty Cycle Low Percentage: assets/monitors/tpu_node_low_duty_cycle_percentage.json
    Node Memory Bandwidth Low Utilization: assets/monitors/tpu_node_memory_bandwidth_under_utilization.json
    Node Tensorcore Utilization Low Utilization: assets/monitors/tpu_node_tensorcore_under_utilization.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
- google cloud
- recopilación de logs
- ia/ml
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_cloud_tpu
integration_id: google-cloud-tpu
integration_title: Google Cloud TPU
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_tpu
public_title: Google Cloud TPU
short_description: Ventajas de las Tensor Processing Units (TPU) a través de recursos
  en la nube escalables y fáciles de utilizar para el desarrollo de modelos de ML.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Métricas
  - Categoría::Google Cloud
  - Categoría::Recopilación de logs
  - Categoría::IA/ML
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Ventajas de las Tensor Processing Units (TPU) a través de recursos
    en la nube escalables y fáciles de utilizar para el desarrollo de modelos de ML.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: TPU de Google Cloud
---

<!--  EXTRAIDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Los productos Google Cloud TPU ponen las ventajas de las Tensor Processing Units (TPU) a disposición de todos los investigadores de ML, ingenieros de ML, desarrolladores y científicos de datos que ejecutan modelos de ML de última generación, a través de un recurso informático en la nube escalable y fácil de utilizar.

Utiliza la integración de Google Cloud Platform con Datadog para recopilar métricas de Google Cloud TPU.

## Configuración

### Instalación

Para utilizar Google Cloud TPU, sólo necesitas configurar la [integración Google Cloud Platform][1].

### Recopilación de logs

Los logs de integración se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google Cloud TPU de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra logs de Google Cloud TPU.
2. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede estar ubicado en un proyecto diferente.
4. Haz clic en **Crear** y espera a que aparezca el mensaje de confirmación.

## Recopilación de datos

### Métricas
{{< get-metrics-from-git "google-cloud-tpu" >}}


### Eventos

La integración Google Cloud TPU no incluye eventos.

### Checks de servicios

La integración Google Cloud TPU no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_tpu/google_cloud_tpu_metadata.csv
[5]: https://docs.datadoghq.com/es/help/