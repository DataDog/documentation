---
app_id: oci-file-storage
app_uuid: b41765f3-f739-4f1b-8e83-4b936dab6cfa
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.filestorage.file_system_read_average_latency_by_size
      - oci.filestorage.file_system_read_requests_by_size
      - oci.filestorage.file_system_read_throughput
      - oci.filestorage.file_system_usage
      - oci.filestorage.file_system_write_average_latency_by_size
      - oci.filestorage.file_system_write_requests_by_size
      - oci.filestorage.file_system_write_throughput
      - oci.filestorage.kerberos_errors
      - oci.filestorage.ldap_connection_errors
      - oci.filestorage.ldap_request_average_latency
      - oci.filestorage.ldap_request_errors
      - oci.filestorage.ldap_request_throughput
      - oci.filestorage.metadata_iops
      - oci.filestorage.metadata_request_average_latency
      - oci.filestorage.mount_target_connections
      - oci.filestorage.mount_target_health
      - oci.filestorage.mount_target_read_throughput
      - oci.filestorage.mount_target_write_throughput
      - oci.filestorage.replication_egress_throughput
      - oci.filestorage.replication_recovery_point_age
      - oci.filestorage.replication_throughput
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 39303322
    source_type_name: OCI File Storage
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
git_integration_title: oci_file_storage
integration_id: oci-file-storage
integration_title: OCI File Storage
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_file_storage
public_title: OCI File Storage
short_description: OCI File Storage ofrece sistemas de archivos escalables, seguros
  y totalmente gestionados para aplicaciones.
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
  description: OCI File Storage ofrece sistemas de archivos escalables, seguros y
    totalmente gestionados para aplicaciones.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: OCI File Storage
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

Oracle Cloud Infrastructure (OCI) File Storage es un servicio de almacenamiento totalmente gestionado, elástico y de nivel empresarial que permite a servidores y aplicaciones acceder a datos a través de sistemas de archivos compartidos. 

Esta integración te permite monitorizar y obtener alertas sobre el estado, el rendimiento y los errores del almacenamiento de archivos mediante la recopilación de métricas y etiquetas (tags) del espacio de nombres [oci_filestorage][1].

## Configuración

### Instalación

Una vez configurada la integración de [Oracle Cloud Infrastructure][2], asegúrate de que los espacios de nombres mencionados anteriormente están incluidos en tu [Connector Hub][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "oci-file-storage" >}}


### Checks de servicios

OCI File Storage no incluye checks de servicio.

### Eventos

OCI File Storage no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].
[1]: https://docs.oracle.com/en-us/iaas/Content/File/Reference/filemetrics.htm
[2]: https://docs.datadoghq.com/es/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_file_storage/metadata.csv
[5]: https://docs.datadoghq.com/es/help/