---
app_id: oci-compute
app_uuid: 55a43db4-b342-461d-a0f9-e29b62b9f0a7
assets:
  dashboards:
    OCI-Compute-Overview: assets/dashboards/oci-compute-overview-dashboard.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.computeagent.cpu_utilization
      - oci.computeagent.disk_bytes_read
      - oci.computeagent.disk_bytes_written
      - oci.computeagent.disk_iops_read
      - oci.computeagent.disk_iops_written
      - oci.computeagent.load_average
      - oci.computeagent.memory_allocation_stalls
      - oci.computeagent.memory_utilization
      - oci.computeagent.networks_bytes_in
      - oci.computeagent.networks_bytes_out
      - oci.rdma_infrastructure_health.rdma_rx_bytes
      - oci.rdma_infrastructure_health.rdma_rx_packets
      - oci.rdma_infrastructure_health.rdma_tx_bytes
      - oci.rdma_infrastructure_health.rdma_tx_packets
      - oci.compute_infrastructure_health.health_status
      - oci.compute_infrastructure_health.instance_status
      - oci.compute_infrastructure_health.maintenance_status
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 23763231
    source_type_name: OCI Compute
  monitors:
    A Compute Instance is Experiencing a Health Event: assets/monitors/oci-compute-health-evento.json
    A Compute Instance is approaching CPU saturation: assets/monitors/oci-compute-cpu.json
    A Compute Instance is down: assets/monitors/oci-instance-down.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
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
git_integration_title: oci_compute
integration_id: oci-compute
integration_title: OCI Compute
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_compute
public_title: OCI Compute
short_description: Oracle Cloud infraestructura (OCI) proporciona una computación
  flexible, de alto rendimiento y segura para cualquier carga de trabajo.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::IA/ML
  - Categoría::Nube
  - Categoría::Oracle
  - Categoría::Métricas
  - Categoría::Sistema operativo
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Oracle Cloud infraestructura (OCI) proporciona una computación flexible,
    de alto rendimiento y segura para cualquier carga de trabajo.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: OCI Compute
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

Oracle Cloud infraestructura (OCI) proporciona una computación flexible, de alto rendimiento y segura para cualquier carga de trabajo, incluyendo IA y Machine Learning (ML), aplicaciones de computación intensiva, empresariales y nativas de la nube.


Esta integración te permite monitorizar y alertar sobre la salud, la capacidad, el rendimiento, el estado y el rendimiento de tus [máquinas virtuales][1] e [instancias bare metal][2].

Recopila métricas y etiquetas (tags) de los siguientes espacios de nombres de Compute:
- [`oci_computeagent`][3]
- [`oci_rdma_infrastructure_health`][4]
- [`oci_compute_infrastructure_health`][5]

## Configuración

### Instalación

Después de configurar la integración [Oracle Cloud Infrastructure][6], asegúrate de que los espacios de nombres `oci_computeagent`, `oci_rdma_infrastructure_health` y `oci_compute_infrastructure_health` están incluidos en tu [Connector Hub][7].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "oci_compute" >}}


### Eventos

La integración OCI Compute no incluye eventos.

### Checks de servicios

La integración OCI Compute no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].



[1]: https://www.oracle.com/cloud/compute/virtual-machines/
[2]: https://www.oracle.com/cloud/compute/bare-metal/
[3]: https://docs.oracle.com/en-us/iaas/Content/Compute/References/computemetrics.htm#Availabl
[4]: https://docs.oracle.com/en-us/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_compute_rdma_network
[5]: https://docs.oracle.com/en-us/iaas/Content/Compute/References/infrastructurehealthmetrics.htm#infrastructurehealth
[6]: https://docs.datadoghq.com/es/integrations/oracle_cloud_infrastructure/
[7]: https://cloud.oracle.com/connector-hub/service-connectors
[8]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_compute/metadata.csv
[9]: https://docs.datadoghq.com/es/help/