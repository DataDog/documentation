---
app_id: oci-database
app_uuid: 9091c2d3-1ce1-4b02-bd68-57660acd766a
assets:
  dashboards:
    OCI-Database-Overview: assets/dashboards/oci-database-overview-dashboard.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.database.block_changes
      - oci.database.cpu_utilization
      - oci.database.current_logons
      - oci.database.execute_count
      - oci.database.parse_count
      - oci.database.storage_allocated
      - oci.database.storage_allocated_by_tablespace
      - oci.database.storage_used
      - oci.database.storage_used_by_tablespace
      - oci.database.storage_utilization
      - oci.database.storage_utilization_by_tablespace
      - oci.database.transaction_count
      - oci.database.user_calls
      - oci.database_cluster.asmdiskgroup_utilization
      - oci.database_cluster.cpu_utilization
      - oci.database_cluster.filesystem_utilization
      - oci.database_cluster.load_average
      - oci.database_cluster.memory_utilization
      - oci.database_cluster.node_status
      - oci.database_cluster.ocpus_allocated
      - oci.database_cluster.swap_utilization
      - oci.oracle_oci_database.allocated_storage_utilization_by_tablespace
      - oci.oracle_oci_database.apply_lag
      - oci.oracle_oci_database.apply_lag_data_refresh_elapsed_time
      - oci.oracle_oci_database.avg_gc_cr_block_receive_time
      - oci.oracle_oci_database.backup_duration
      - oci.oracle_oci_database.backup_size
      - oci.oracle_oci_database.block_changes
      - oci.oracle_oci_database.blocking_sessions
      - oci.oracle_oci_database.cputime
      - oci.oracle_oci_database.cpu_utilization
      - oci.oracle_oci_database.current_logons
      - oci.oracle_oci_database.dbtime
      - oci.oracle_oci_database.estimated_failover_time
      - oci.oracle_oci_database.execute_count
      - oci.oracle_oci_database.fraspace_limit
      - oci.oracle_oci_database.frautilization
      - oci.oracle_oci_database.gc_cr_blocks_received
      - oci.oracle_oci_database.gc_current_blocks_received
      - oci.oracle_oci_database.iops
      - oci.oracle_oci_database.io_throughput
      - oci.oracle_oci_database.interconnect_traffic
      - oci.oracle_oci_database.invalid_objects
      - oci.oracle_oci_database.logical_blocks_read
      - oci.oracle_oci_database.max_tablespace_size
      - oci.oracle_oci_database.memory_usage
      - oci.oracle_oci_database.monitoring_status
      - oci.oracle_oci_database.non_reclaimable_fra
      - oci.oracle_oci_database.ocpus_allocated
      - oci.oracle_oci_database.parse_count
      - oci.oracle_oci_database.parses_by_type
      - oci.oracle_oci_database.problematic_scheduled_dbmsjobs
      - oci.oracle_oci_database.process_limit_utilization
      - oci.oracle_oci_database.processes
      - oci.oracle_oci_database.reclaimable_fra
      - oci.oracle_oci_database.reclaimable_fraspace
      - oci.oracle_oci_database.recovery_window
      - oci.oracle_oci_database.redo_apply_rate
      - oci.oracle_oci_database.redo_generation_rate
      - oci.oracle_oci_database.redo_size
      - oci.oracle_oci_database.session_limit_utilization
      - oci.oracle_oci_database.sessions
      - oci.oracle_oci_database.storage_allocated
      - oci.oracle_oci_database.storage_allocated_by_tablespace
      - oci.oracle_oci_database.storage_used
      - oci.oracle_oci_database.storage_used_by_tablespace
      - oci.oracle_oci_database.storage_utilization
      - oci.oracle_oci_database.storage_utilization_by_tablespace
      - oci.oracle_oci_database.transaction_count
      - oci.oracle_oci_database.transactions_by_status
      - oci.oracle_oci_database.transport_lag
      - oci.oracle_oci_database.transport_lag_data_refresh_elapsed_time
      - oci.oracle_oci_database.unprotected_data_window
      - oci.oracle_oci_database.unusable_indexes
      - oci.oracle_oci_database.usable_fra
      - oci.oracle_oci_database.used_fraspace
      - oci.oracle_oci_database.user_calls
      - oci.oracle_oci_database.wait_time
      - oci.oracle_oci_database.dbmgmt_job_executions_count
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 24362850
    source_type_name: Base de datos OCI
  monitors:
    An OCI Database is approaching CPU saturation: assets/monitors/oci-db-cpu.json
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
git_integration_title: oci_database
integration_id: oci-database
integration_title: Base de datos OCI
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_database
public_title: Base de datos OCI
short_description: La base de datos OCI (Base, RAC y Exadata) proporciona soluciones
  de bases de datos fiables, escalables y seguras para cualquier aplicación.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Almacenes de datos
  - Categoría::Nube
  - Categoría::Oracle
  - Categoría::Métricas
  - Oferta::Integración
  configuration: README.md#Configuración
  description: La base de datos OCI (Base, RAC y Exadata) proporciona soluciones de
    bases de datos fiables, escalables y seguras para cualquier aplicación.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Base de datos OCI
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

Oracle Cloud Infrastructure (OCI) proporciona bases de datos flexibles, de alto rendimiento y seguras para cualquier carga de trabajo.

Esta integración recopila métricas clave para monitorizar y alertar sobre el uso de CPU y de almacenamiento, el número de intentos exitosos y fallidos de inicio de sesión y de conexión a la base de datos, las operaciones de la base de datos, las consultas SQL y las transacciones.

Recopila etiquetas (tags) y métricas de los recursos de [Oracle Base Databases][1] y de [clústeres de máquinas virtuales Exadata][2] de los siguientes espacios de nombres:

- [`oci_database`][3]
- [`oci_database_cluster`][3]

Si [Oracle Database Management][4] está habilitado, esta integración también recibe métricas de características como la monitorización de flotas y SQL Tuning Advisor a través del espacio de nombres de la [`oracle_oci_database`][3].

La instalación del [Datadog Agent][5] en tus bases de datos Oracle te proporciona información en tiempo real sobre métricas adicionales, como sesiones activas, uso de disco, uso de espacio de tabla, etc.

Activa Datadog [Database Monitoring (DBM)][6] para obtener información mejorada sobre el rendimiento de las consultas y el estado de la base de datos. Además de las funciones estándar de la integración, Datadog DBM proporciona información sobre métricas a nivel de consulta, snapshots de consultas en tiempo real e históricas, análisis de eventos de espera, carga de la base de datos, planes de explicación de consultas y consultas de bloqueo.

## Configuración

### Instalación

Después de configurar la integración [Oracle Cloud Infrastructure][7], asegúrate de que los espacios de nombres `oci_database` y `oci_database_cluster` están incluidos en tu [Connector Hub][8].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "oci-database" >}}


### Eventos

La integración de la base de datos OCI no incluye eventos.

### Checks de servicio

La integración de la base de datos OCI no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].


[1]: https://www.oracle.com/database/base-database-service/
[2]: https://www.oracle.com/engineered-systems/exadata/database-service/
[3]: https://docs.oracle.com/en-us/iaas/database-management/doc/oracle-cloud-database-metrics.html
[4]: https://www.oracle.com/manageability/database-management/
[5]: https://docs.datadoghq.com/es/integrations/oracle
[6]: https://docs.datadoghq.com/es/database_monitoring/
[7]: https://docs.datadoghq.com/es/integrations/oracle_cloud_infrastructure/
[8]: https://cloud.oracle.com/connector-hub/service-connectors
[9]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_database/metadata.csv
[10]: https://docs.datadoghq.com/es/help/