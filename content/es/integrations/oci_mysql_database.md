---
app_id: oci-mysql-database
app_uuid: 8600b5fa-cd4c-4003-b397-99d8784509c1
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.mysql_database.active_connections
      - oci.mysql_database.backup_failure
      - oci.mysql_database.backup_size
      - oci.mysql_database.backup_time
      - oci.mysql_database.cpu_utilization
      - oci.mysql_database.channel_failure
      - oci.mysql_database.channel_lag
      - oci.mysql_database.current_connections
      - oci.mysql_database.db_volume_read_bytes
      - oci.mysql_database.db_volume_read_operations
      - oci.mysql_database.db_volume_utilization
      - oci.mysql_database.db_volume_write_bytes
      - oci.mysql_database.db_volume_write_operations
      - oci.mysql_database.heat_wave_data_load_progress
      - oci.mysql_database.heat_wave_health
      - oci.mysql_database.heat_wave_statements
      - oci.mysql_database.memory_allocated
      - oci.mysql_database.memory_used
      - oci.mysql_database.memory_utilization
      - oci.mysql_database.network_receive_bytes
      - oci.mysql_database.network_transmit_bytes
      - oci.mysql_database.ocpus_allocated
      - oci.mysql_database.ocpus_used
      - oci.mysql_database.statement_latency
      - oci.mysql_database.statements
      - oci.mysql_database.storage_allocated
      - oci.mysql_database.storage_used
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 26597073
    source_type_name: OCI MySQL Database
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- oracle
- métricas
- almacenes de datos
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_mysql_database
integration_id: oci-mysql-database
integration_title: OCI HeatWave MySQL
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_mysql_database
public_title: OCI HeatWave MySQL
short_description: OCI HeatWave MySQL mejora MySQL con aceleración de consultas en
  memoria para un análisis rápido y en tiempo real.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Oracle
  - Category::Metrics
  - Categoría::Almacenes de datos
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI HeatWave MySQL mejora MySQL con aceleración de consultas en memoria
    para un análisis rápido y en tiempo real.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI HeatWave MySQL
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

OCI HeatWave MySQL utiliza IA generativa automatizada e integrada y Machine Learning en un servicio en la nube para transacciones y análisis de escala de lago de datos.

Esta integración te permite monitorizar y alertar sobre las conexiones actuales, el recuento de sentencias, la utilización de la CPU y el tiempo de copia de seguridad de tus sistemas de MySQL DB mediante la recopilación de métricas y etiquetas del espacio de nombres [oci_mysql_database][1].

## Configuración

### Instalación

Una vez configurada la integración de [Oracle Cloud Infrastructure][2], asegúrate de que el espacio de nombres `oci_mysql_database` está incluido en tu [Connector Hub][3].


## Datos recopilados

### Métricas
{{< get-metrics-from-git "oci-mysql-database" >}}


### Checks de servicio

OCI MySQL Database no incluye ningún check de servicio.

### Eventos

OCI MySQL Database no incluye ningún evento.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.oracle.com/en-us/iaas/mysql-database/doc/metrics.html
[2]: https://docs.datadoghq.com/es/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_mysql_database/metadata.csv
[5]: https://docs.datadoghq.com/es/help/