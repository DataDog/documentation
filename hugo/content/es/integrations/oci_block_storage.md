---
app_id: oci-block-storage
app_uuid: 92d6b86f-d892-4290-88f9-c4c61d3700fa
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.blockstore.volume_guaranteed_iops
      - oci.blockstore.volume_guaranteed_throughput
      - oci.blockstore.volume_guaranteed_vpus_per_gb
      - oci.blockstore.volume_read_ops
      - oci.blockstore.volume_read_throughput
      - oci.blockstore.volume_replication_seconds_since_last_sync
      - oci.blockstore.volume_replication_seconds_since_last_upload
      - oci.blockstore.volume_throttled_ios
      - oci.blockstore.volume_write_ops
      - oci.blockstore.volume_write_throughput
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 39303190
    source_type_name: OCI Block Storage
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
git_integration_title: oci_block_storage
integration_id: oci-block-storage
integration_title: OCI Block Storage
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_block_storage
public_title: OCI Block Storage
short_description: OCI Block Storage ofrece almacenamiento en bloque duradero y de
  alto rendimiento que puede conectarse a cualquier instancia de cálculo.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Almacenes de datos
  - Categoría::Nube
  - Categoría::Oracle
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Configuración
  description: OCI Block Storage ofrece almacenamiento en bloque duradero y de alto
    rendimiento que puede conectarse a cualquier instancia de cálculo.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: OCI Block Storage
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

Oracle Cloud Infrastructure (OCI) Block Volumes brinda un almacenamiento en bloque fiable, de alto rendimiento y de bajo coste que persiste más allá de la vida útil de una máquina virtual, con redundancia y escalabilidad integradas. 

Este integración te permite monitorizar y obtener alertas sobre el rendimiento y el estado de replicación de tus recursos de Block Volume mediante la recopilación de métricas y etiquetas (tags) del espacio de nombres [oci_blockstore][1].

## Configuración

### Instalación

Una vez configurada la integración de [Oracle Cloud Infrastructure][2], asegúrate de que los espacios de nombres mencionados anteriormente están incluidos en tu [Connector Hub][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "oci-block-storage" >}}


### Checks de servicios

OCI Block Storage no incluye checks de servicio.

### Eventos

OCI Block Storage no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].
[1]: https://docs.oracle.com/en-us/iaas/Content/Block/References/volumemetrics.htm
[2]: https://docs.datadoghq.com/es/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_block_storage/metadata.csv
[5]: https://docs.datadoghq.com/es/help/