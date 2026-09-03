---
app_id: oci-container-instances
app_uuid: 3ed1e6b8-a260-4b8d-9d1d-e180ed388776
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.computecontainerinstance.container_cpu_used
      - oci.computecontainerinstance.container_ephemeral_storage_used
      - oci.computecontainerinstance.container_memory_used
      - oci.computecontainerinstance.cpu_used
      - oci.computecontainerinstance.cpu_utilization
      - oci.computecontainerinstance.ephemeral_storage_used
      - oci.computecontainerinstance.memory_used
      - oci.computecontainerinstance.memory_utilization
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 37146647
    source_type_name: OCI Container Instances
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- oracle
- métricas
- rastreo
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_container_instances
integration_id: oci-container-instances
integration_title: OCI Container Instances
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_container_instances
public_title: OCI Container Instances
short_description: OCI Container Instances proporciona entornos en contenedores sin
  servidor sin necesidad de gestión de infraestructura.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Oracle
  - Category::Metrics
  - Category::Containers
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI Container Instances proporciona entornos en contenedores sin servidor
    sin necesidad de gestión de infraestructura.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI Container Instances
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

Oracle Cloud Infrastructure (OCI) Container Instances es un servicio informático sin servidor que permite ejecutar contenedores al instante sin necesidad de gestionar ningún servidor.

Esta integración te ayuda a monitorizar y alertar sobre el estado, la capacidad y el rendimiento de tus instancias de contenedor de Oracle Cloud Infrastructure recopilando métricas y etiquetas del espacio de nombres [oci_computecontainerinstance][1].

## Configuración

### Instalación

Las métricas de OCI Container Instances están actualmente en **Preview** (Vista previa) y no se facturarán hasta que estén disponibles para el público en general.

Una vez configurada la integración de [Oracle Cloud Infrastructure][2], asegúrate de que los espacios de nombres mencionados anteriormente están incluidos en tu [Connector Hub][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "oci_container_instances" >}}


### Checks de servicio

OCI Container Instances no incluye ningún check de servicio.

### Eventos

OCI Container Instances no incluye ningún evento.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.oracle.com/en-us/iaas/Content/container-instances/container-instance-metrics.htm
[2]: https://docs.datadoghq.com/es/integrations/oracle_cloud_infrastructure
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_container_instances/metadata.csv
[5]: https://docs.datadoghq.com/es/help/