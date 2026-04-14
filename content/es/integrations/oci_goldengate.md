---
app_id: oci-goldengate
app_uuid: 6abb75a2-400b-4334-8224-2f381fca27fa
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.goldengate.cpu_utilization
      - oci.goldengate.deployment_health
      - oci.goldengate.deployment_inbound_lag
      - oci.goldengate.deployment_outbound_lag
      - oci.goldengate.distribution_path_lag
      - oci.goldengate.distribution_path_status
      - oci.goldengate.extract_lag
      - oci.goldengate.extract_status
      - oci.goldengate.file_system_usage
      - oci.goldengate.heartbeat_lag
      - oci.goldengate.memory_utilization
      - oci.goldengate.ocpu_consumption
      - oci.goldengate.pipeline_health
      - oci.goldengate.pipeline_memory_usage
      - oci.goldengate.pipeline_processing_rate
      - oci.goldengate.pipeline_scheduling_delay
      - oci.goldengate.pipeline_total_delay
      - oci.goldengate.receiver_path_lag
      - oci.goldengate.receiver_path_status
      - oci.goldengate.replicat_lag
      - oci.goldengate.replicat_status
      - oci.goldengate.swap_space_usage
      - oci.goldengate.temp_space_usage
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 48906972
    source_type_name: OCI GoldenGate
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenes de datos
- nube
- oracle
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_goldengate
integration_id: oci-goldengate
integration_title: OCI GoldenGate
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_goldengate
public_title: OCI GoldenGate
short_description: OCI GoldenGate proporciona replicación, transformación y transmisión
  de datos entre bases de datos
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Categoría::Nube
  - Category::Oracle
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Configuración
  description: OCI GoldenGate proporciona replicación, transformación y transmisión
    de datos entre bases de datos
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: OCI GoldenGate
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

Oracle Cloud Infrastructure (OCI) GoldenGate es un servicio totalmente gestionado y escalable diseñado para la replicación, transformación y transmisión de datos en tiempo real a través de fuentes de datos heterogéneas. Permite una disponibilidad continua de los datos y una integración perfecta entre los entornos on-premises y en la nube, dando soporte a una gran variedad de casos de uso, como la migración de bases de datos, la recuperación ante desastres y el análisis en tiempo real.

Esta integración te permite monitorizar y alertar sobre el estado, la capacidad y el rendimiento de tus instancias de GoldenGate mediante la recopilación de métricas y etiquetas del espacio de nombres [oci_goldengate][1].

## Configuración

### Instalación

Una vez configurada la integración de [Oracle Cloud Infrastructure][2], asegúrate de que los espacios de nombres mencionados anteriormente están incluidos en tu [Connector Hub][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "oci_goldengate" >}}


### Checks de servicio

OCI GoldenGate no incluye checks de servicio.

### Eventos

OCI GoldenGate no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].
[1]: https://docs.oracle.com/en-us/iaas/goldengate/doc/metrics.html
[2]: https://docs.datadoghq.com/es/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_goldengate/metadata.csv
[5]: https://docs.datadoghq.com/es/help/