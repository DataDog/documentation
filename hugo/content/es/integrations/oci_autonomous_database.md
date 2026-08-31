---
app_id: oci-autonomous-database
app_uuid: 0511a203-b0bb-471b-9900-323fd60dd008
assets:
  dashboards:
    OCI-Autonomous-Database-Overview: assets/dashboards/oci-autonomous-database-overview-dashboard.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.autonomous_database.apply_lag
      - oci.autonomous_database.block_changes
      - oci.autonomous_database.cpu_time
      - oci.autonomous_database.cpu_utilization
      - oci.autonomous_database.current_logons
      - oci.autonomous_database.dbtime
      - oci.autonomous_database.ecpus_allocated
      - oci.autonomous_database.execute_count
      - oci.autonomous_database.iops
      - oci.autonomous_database.iothroughput
      - oci.autonomous_database.logical_blocks_read
      - oci.autonomous_database.ocpus_allocated
      - oci.autonomous_database.parse_count
      - oci.autonomous_database.parses_by_type
      - oci.autonomous_database.queued_statements
      - oci.autonomous_database.redo_size
      - oci.autonomous_database.running_statements
      - oci.autonomous_database.session_utilization
      - oci.autonomous_database.sessions
      - oci.autonomous_database.storage_allocated
      - oci.autonomous_database.storage_allocated_by_tablespace
      - oci.autonomous_database.storage_used
      - oci.autonomous_database.storage_used_by_tablespace
      - oci.autonomous_database.storage_utilization
      - oci.autonomous_database.storage_utilization_by_tablespace
      - oci.autonomous_database.transaction_count
      - oci.autonomous_database.transactions_by_status
      - oci.autonomous_database.transport_lag
      - oci.autonomous_database.user_calls
      - oci.autonomous_database.wait_time
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 24370730
    source_type_name: OCI Autonomous Database
  monitors:
    An Autonomous Database is approaching CPU saturation: assets/monitors/oci-autonomous-db-cpu.json
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
git_integration_title: oci_autonomous_database
integration_id: oci-autonomous-database
integration_title: OCI Autonomous Database
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_autonomous_database
public_title: OCI Autonomous Database
short_description: Oracle Autonomous Database automatiza la gestión de bases de datos
  con autoajuste, parcheado y escalado.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Category::Cloud
  - Category::Oracle
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Oracle Autonomous Database automatiza la gestión de bases de datos
    con autoajuste, parcheado y escalado.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI Autonomous Database
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-internal-core -->


## Información general

Oracle Autonomous Database traduce automáticamente el lenguaje natural en consultas a bases de datos y permite utilizar SQL, documentos JSON, Oracle Graph, Oracle Spatial, texto y vectores en una única base de datos.

Esta integración te permite monitorizar y alertar sobre las conexiones actuales, el recuento de sentencias, la utilización de la CPU y el tiempo de copia de seguridad de tu Autonomous Database mediante la recopilación de métricas y etiquetas del espacio de nombres [oci_autonomous_database][1].

La instalación del [Datadog Agent][2] en tus bases de datos Oracle te proporciona información en tiempo real sobre métricas adicionales, como sesiones activas, uso de disco, uso de espacio de tabla, etc.

Activa Datadog [Database Monitoring (DBM)][3] para obtener información mejorada sobre el rendimiento de las consultas y el estado de la base de datos. Además de las funciones estándar de la integración, Datadog DBM proporciona información sobre métricas a nivel de consulta, snapshots de consultas en tiempo real e históricas, análisis de eventos de espera, carga de la base de datos, planes de explicación de consultas y consultas de bloqueo.

## Configuración

### Instalación

Después de configurar la integración de [Oracle Cloud Infrastructure][4], asegúrate de que el espacio de nombres `oci_autonomous_database` está incluido en tu [Connector Hub][5].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "oci_autonomous_database" >}}


### Eventos

La integración de OCI Autonomous Database no incluye ningún evento.

### Checks de servicio

La integración de OCI Autonomous Database no incluye ninguna comprobación de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].


[1]: https://docs.oracle.com/en-us/iaas/autonomous-database/doc/monitor-databases-autonomous-database-metrics.html
[2]: https://docs.datadoghq.com/es/integrations/oracle
[3]: https://docs.datadoghq.com/es/database_monitoring/
[4]: https://docs.datadoghq.com/es/integrations/oracle_cloud_infrastructure/
[5]: https://cloud.oracle.com/connector-hub/service-connectors
[6]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_autonomous_database/metadata.csv
[7]: https://docs.datadoghq.com/es/help/