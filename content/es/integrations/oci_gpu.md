---
app_id: oci-gpu
app_uuid: 01953de5-89a5-7c6e-9e7e-b466510d511f
assets:
  dashboards:
    OCI GPU Overview: assets/dashboards/oci_gpu_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.gpu_infrastructure_health.gpu_utilization
      - oci.gpu_infrastructure_health.gpu_temperature
      - oci.gpu_infrastructure_health.gpu_power_draw
      - oci.gpu_infrastructure_health.gpu_memory_utilization
      - oci.gpu_infrastructure_health.gpu_ecc_single_bit_errors
      - oci.gpu_infrastructure_health.gpu_ecc_double_bit_errors
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 40524701
    source_type_name: GPU OCI
  monitors:
    GPU temperature is high: assets/monitors/oci-gpu-temp.json
author:
  homepage: https://www.datadoghq.com/
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
  vendor_id: datadog
categories:
- ia/ml
- nube
- oracle
- métricas
- sistema operativo y sistema
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_gpu
integration_id: oci-gpu
integration_title: GPU OCI
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_gpu
public_title: GPU OCI
short_description: Las GPU OCI ofrecen computación de alto rendimiento bajo demanda
  para cargas de trabajo de IA, ML y HPC.
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Category::Cloud
  - Categoría::Oracle
  - Category::Metrics
  - Category::OS & System
  - Offering::Integration
  - Supported OS::Linux
  configuration: README.md#Configuración
  description: Las GPU OCI ofrecen computación de alto rendimiento bajo demanda para
    cargas de trabajo de IA, ML y HPC.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: GPU OCI
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

Monitorizar instancias de GPU de Oracle Cloud Infrastructure (OCI) es esencial para garantizar un rendimiento y una fiabilidad óptima de tus cargas de trabajo de computación de alto rendimiento. Esta integración proporciona un conjunto completo de métricas de GPU a través del espacio de nombres gpu_infrastructure_health, lo que te permite realizar un seguimiento de varios aspectos del estado y el uso de la GPU.


Esta integración te permite monitorizar y alertar sobre la salud, la capacidad, el rendimiento, el estado y el rendimiento de tus [instancias de GPU][1].

Recopila métricas y etiquetas (tags) del espacio de nombres [gpu_infrastructure_health][2].


## Configuración

Después de configurar la integración [Oracle Cloud Infrastructure][3], comprueba que cualquier espacio de nombres mencionado anteriormente está incluidos en tu [Connector Hub][4].


## Datos recopilados

### Métricas
{{< get-metrics-from-git "oci-gpu" >}}


### Checks de servicios

La GPU OCI no incluye checks de servicios.

### Eventos

La GPU OCI no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6].



[1]: https://www.oracle.com/cloud/compute/#gpu
[2]: https://docs.oracle.com/en-us/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute
[3]: https://docs.datadoghq.com/es/integrations/oracle_cloud_infrastructure/
[4]: https://cloud.oracle.com/connector-hub/service-connectors
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_gpu/metadata.csv
[6]: https://docs.datadoghq.com/es/help/
