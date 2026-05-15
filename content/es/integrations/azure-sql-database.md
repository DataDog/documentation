---
aliases:
- /es/integrations/azure_sql_database
app_id: azure-sql-database
categories:
- nube
- almacenes de datos
- almacenamiento en caché
- azure
custom_kind: integración
description: Azure SQL Database es un servicio de base de datos relacional basado
  en el motor Microsoft SQL Server
media: []
title: Azure SQL Database
---
## Información general

Azure SQL Database te brinda un almacén de datos sólido con la flexibilidad de escalar para satisfacer la demanda.

Obtén métricas de Azure SQL Database para:

- Visualizar el rendimiento de tu SQL Database.
- Correlacionar el rendimiento de tu SQL Database con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft y Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.sql_servers_databases.active_queries** <br>(count) | Consultas activas en todos los grupos de cargas de trabajo. Solo se aplica a los almacenes de datos.|
| **azure.sql_servers_databases.data_space_allocated** <br>(gauge) | Almacenamiento de datos asignado. No aplicable a almacenes de datos.<br>_Mostrado como byte_. |
| **azure.sql_servers_databases.app_cpu_billed** <br>(count) | CPU de la aplicación facturada. Se aplica a bases de datos serverless.|
| **azure.sql_servers_databases.app_cpu_percentage** <br>(gauge) | Porcentaje de CPU de la aplicación. Se aplica a bases de datos serverless.<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_databases.app_memory_percentage** <br>(gauge) | Porcentaje de memoria de la aplicación. Se aplica a bases de datos serverless.<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_databases.data_storage_size** <br>(gauge) | Tamaño de almacenamiento de datos. Se aplica a las bases de datos Hyperscale.<br>_Mostrado como byte_ |
| **azure.sql_servers_databases.blocked_by_firewall** <br>(count) | Bloqueado por Firewall.|
| **azure.sql_servers_databases.cache_hit_percentage** <br>(gauge) | Porcentaje de acierto de la caché. Solo se aplica a los almacenes de datos.<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_databases.cache_used_percentage** <br>(gauge) | Porcentaje de caché utilizado. Solo se aplica a los almacenes de datos.<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_databases.connection_failed** <br>(count) | Conexiones fallidas.|
| **azure.sql_servers_databases.connection_successful** <br>(count) | Conexiones exitosas.|
| **azure.sql_servers_databases.core_count** <br>(gauge) | Count de Core.|
| **azure.sql_servers_databases.cpu_limit** <br>(gauge) | Límite de CPU. Se aplica a las bases de datos basadas en vCore.|
| **azure.sql_servers_databases.cpu_percent** <br>(gauge) | Porcentaje de CPU.<br>_Mostrado como porcentaje_ |
| **azure.sql_servers_databases.cpu_percent.max** <br>(gauge) | Porcentaje máximo de CPU (Máximo Agregado)<br>_Mostrado como porcentaje_ |
| **azure.sql_servers_databases.cpu_used** <br>(gauge) | CPU utilizada. Se aplica a las bases de datos basadas en vCore.|
| **azure.sql_servers_databases.cpu_used.max** <br>(count) | CPU máxima utilizada. Se aplica a las bases de datos basadas en vCore. (Máximo agregado)|
| **azure.sql_servers_databases.deadlock** <br>(count) | Bloqueos. No aplicable a los almacenes de datos.|
| **azure.sql_servers_databases.remote_data_reads** <br>(count) | Los datos remotos se leen en bytes.<br>_Mostrado como byte_ |
| **azure.sql_servers_databases.total_remote_bytes_read_and_written** <br>(count) | Total de bytes remotos leídos y escritos por el cálculo.<br>_Mostrado como byte_ |
| **azure.sql_servers_databases.remote_log_writes** <br>(count) | El log remoto se escribe en bytes.<br>_Mostrado como byte_ |
| **azure.sql_servers_databases.differential_backup_storage_size** <br>(gauge) | Tamaño acumulado de almacenamiento de copia de seguridad diferencial. Se aplica a bases de datos basadas en vCore. No aplicable a bases de datos Hyperscale.<br>_Mostrado como byte_ |
| **azure.sql_servers_databases.dtu_consumption_percent** <br>(gauge) | Porcentaje de DTU. Se aplica a las bases de datos basadas en DTU.<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_databases.dtu_limit** <br>(gauge) | Límite de DTU. Se aplica a las bases de datos basadas en DTU.|
| **azure.sql_servers_databases.dtu_used** <br>(gauge) | DTU utilizado. Se aplica a las bases de datos basadas en DTU.|
| **azure.sql_servers_databases.dwu_consumption_percent** <br>(gauge) | Porcentaje de DWU. Solo se aplica a los almacenes de datos.<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_databases.dwu_limit** <br>(gauge) | Límite de DWU. Solo se aplica a los almacenes de datos.|
| **azure.sql_servers_databases.dwu_used** <br>(gauge) | DWU utilizado. Solo se aplica a los almacenes de datos.|
| **azure.sql_servers_databases.full_backup_storage_size** <br>(gauge) | Tamaño acumulado de la copia de seguridad completa. Aplicable a bases de datos basadas en vCore. No aplicable a bases de datos Hyperscale.<br>_Mostrado como byte_ |
| **azure.sql_servers_databases.local_tempdb_percentage** <br>(gauge) | Porcentaje de base de datos temporal local. Solo se aplica a los almacenes de datos.<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_databases.log_backup_storage_size** <br>(gauge) | Tamaño acumulado del almacenamiento de copia de seguridad de logs. Se aplica a las bases de datos basadas en vCore e Hyperscale.<br>_Mostrado como byte_. |
| **azure.sql_servers_databases.log_write_percent** <br>(gauge) | Porcentaje de IO logs. No aplicable a almacenes de datos.<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_databases.memory_percentage** <br>(gauge) | Porcentaje de memoria. Solo se aplica a los almacenes de datos.<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_databases.physical_data_read_percent** <br>(gauge) | Porcentaje de datos de IO.<br>_Mostrado como porcentaje_ |
| **azure.sql_servers_databases.physical_data_read_percent.max** <br>(gauge) | Porcentaje máximo de IO de datos (Max Agregado)<br>_Mostrado como porcentaje_ |
| **azure.sql_servers_databases.queued_queries** <br>(count) | Consultas en cola en todos los grupos de carga de trabajo. Solo se aplica a los almacenes de datos.|
| **azure.sql_servers_databases.replication_links.count** <br>(gauge) | La cantidad de enlaces de replicación por base de datos|
| **azure.sql_servers_databases.sessions_percent** <br>(gauge) | Porcentaje de sesiones. No aplicable a almacenes de datos.<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_databases.data_backup_storage_size** <br>(gauge) | Tamaño acumulado de almacenamiento de copia de seguridad de datos. Se aplica a las bases de datos Hyperscale.<br>_Mostrado como byte_ |
| **azure.sql_servers_databases.sql_server_process_core_percent** <br>(gauge) | Uso de la CPU como porcentaje del proceso SQL DB. No aplicable a almacenes de datos.<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_databases.sql_server_process_memory_percent** <br>(gauge) | Uso de memoria como porcentaje del proceso de SQL DB. No aplicable a almacenes de datos.<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_databases.storage** <br>(gauge) | Espacio de datos utilizado. No aplicable a almacenes de datos.<br>_Mostrado como byte_ |
| **azure.sql_servers_databases.storage_percent** <br>(gauge) | Porcentaje de espacio de datos utilizado. No aplicable a almacenes de datos o bases de datos a hiperescala.<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_databases.tempdb_data_file_size_kilobytes** <br>(gauge) | Espacio utilizado en los archivos de datos de la base de datos temporal en kilobytes. No aplicable a almacenes de datos.|
| **azure.sql_servers_databases.tempdb_log_file_size_kilobytes** <br>(gauge) | Espacio utilizado en el archivo de logs de transacciones de la base de datos temporal en kilobytes. No aplicable a almacenes de datos.|
| **azure.sql_servers_databases.tempdb_percent_log_used** <br>(gauge) | Porcentaje de espacio utilizado en el archivo de logs de transacciones de la base de datos temporal. No aplicable a almacenes de datos.<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_databases.workload_group_active_queries** <br>(count) | Consultas activas dentro del grupo de carga de trabajo. Solo se aplica a los almacenes de datos.|
| **azure.sql_servers_databases.workload_group_query_timeouts** <br>(count) | Consultas que han expirado para el grupo de carga de trabajo. Solo se aplica a los almacenes de datos.|
| **azure.sql_servers_databases.workload_group_allocation_by_system_percent** <br>(gauge) | Porcentaje asignado de recursos en relación con todo el sistema por grupo de carga de trabajo. Solo se aplica a los almacenes de datos.<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_databases.workload_group_allocation_by_cap_resource_percent** <br>(gauge) | Porcentaje asignado de recursos en relación con los recursos máximos especificados por grupo de carga de trabajo. Solo se aplica a los almacenes de datos.<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_databases.effective_cap_resource_percent** <br>(gauge) | Un límite duro en el porcentaje de recursos permitidos para el grupo de carga de trabajo, teniendo en cuenta el porcentaje mínimo efectivo de recursos asignado para otros grupos de carga de trabajo. Solo se aplica a los almacenes de datos.<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_databases.effective_min_resource_percent** <br>(gauge) | Porcentaje mínimo de recursos reservados y aislados para el grupo de carga de trabajo, teniendo en cuenta el nivel de servicio mínimo. Solo se aplica a los almacenes de datos.<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_databases.workload_group_queued_queries** <br>(count) | Consultas en cola dentro del grupo de carga de trabajo. Solo se aplica a los almacenes de datos.|
| **azure.sql_servers_databases.workers_percent** <br>(gauge) | Porcentaje de trabajadores. No aplicable a los almacenes de datos.<br>_Mostrado como porcentaje_ |
| **azure.sql_servers_databases.xtp_storage_percent** <br>(gauge) | Porcentaje de almacenamiento OLTP en memoria. No aplicable a almacenes de datos.<br>_Mostrado como porcentaje_. |
| **azure.sql_servers_databases.count** <br>(gauge) | Count de recursos de Azure SQL Database.|

### Eventos

La integración Azure SQL Database no incluye eventos.

### Checks de servicio

La integración Azure SQL Database no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).