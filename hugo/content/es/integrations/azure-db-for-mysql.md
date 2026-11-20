---
aliases:
- /es/integrations/azure_db_for_mysql
app_id: azure-db-for-mysql
categories:
- azure
- nube
- almacenes de datos
custom_kind: integración
description: Rastrea las métricas principales de Azure DB for MySQL.
media: []
title: Azure DB para MySQL
---
## Información general

Azure Database for MySQL proporciona una base de datos como servicio MySQL comunitaria, totalmente gestionada y preparada para empresas.

Obtén métricas de Azure Database for MySQL para:

- Visualizar el rendimiento de tus bases de datos MySQL.
- Correlacionar el rendimiento de tus bases de datos MySQL con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración de Microsoft Azure] primero (https://docs.datadoghq.com/integrations/azure/). No es necesario ningún otro paso de instalación adicional.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.dbformysql_flexibleservers.aborted_connections** <br>(count) | Conexiones abortadas<br>_Se muestra como conexión_ |
| **azure.dbformysql_flexibleservers.active_connections** <br>(gauge) | Conexiones activas<br>_Se muestra como conexión_ |
| **azure.dbformysql_flexibleservers.active_transactions** <br>(gauge) | Número de transacciones activas<br>_Se muestra como transacción_ |
| **azure.dbformysql_flexibleservers.backup_storage_used** <br>(gauge) | Almacenamiento de copia de seguridad utilizado<br>_Se muestra como byte_ |
| **azure.dbformysql_flexibleservers.binlog_storage_used** <br>(gauge) | Almacenamiento utilizado por los archivos Binlog<br>_Se muestra como byte_ |
| **azure.dbformysql_flexibleservers.com_alter_table** <br>(count) | Número total de veces que se ha ejecutado la sentencia ALTER TABLE|
| **azure.dbformysql_flexibleservers.com_create_db** <br>(count) | Número total de veces que se ha ejecutado la sentencia CREATE DB|
| **azure.dbformysql_flexibleservers.com_create_table** <br>(count) | Número total de veces que se ha ejecutado la sentencia CREATE TABLE|
| **azure.dbformysql_flexibleservers.com_drop_db** <br>(count) | Número total de veces que se ha ejecutado la sentencia DROP DB|
| **azure.dbformysql_flexibleservers.com_drop_table** <br>(count) | Número total de veces que se ha ejecutado la sentencia DROP TABLE|
| **azure.dbformysql_flexibleservers.com_insert** <br>(count) | Número total de veces que se ha ejecutado la sentencia INSERT|
| **azure.dbformysql_flexibleservers.com_select** <br>(count) | Número total de veces que se ha ejecutado la sentencia SELECT|
| **azure.dbformysql_flexibleservers.com_update** <br>(count) | Número total de veces que se ha ejecutado la sentencia UPDATE|
| **azure.dbformysql_flexibleservers.core_count** <br>(gauge) | Recuento de núcleos|
| **azure.dbformysql_flexibleservers.count** <br>(gauge) | El recuento de la integración del servidor Azure MySQL |
| **azure.dbformysql_flexibleservers.cpu_credits_consumed** <br>(gauge) | Créditos de CPU consumidos<br>_Se muestra como byte_ |
| **azure.dbformysql_flexibleservers.cpu_credits_remaining** <br>(gauge) | Créditos de CPU restantes<br>_Se muestra como byte_ |
| **azure.dbformysql_flexibleservers.cpu_percent** <br>(gauge) | Porcentaje de CPU del host<br>_Se muestra como porcentaje_ |
| **azure.dbformysql_flexibleservers.data_storage_used** <br>(gauge) | Almacenamiento utilizado por los archivos de datos<br>_Se muestra como byte_ |
| **azure.dbformysql_flexibleservers.ha_io_status** <br>(gauge) | Estado del subproceso de E/S de replicación en ejecución|
| **azure.dbformysql_flexibleservers.ha_replication_lag** <br>(gauge) | Retraso de la replicación HA en segundos<br>_Se muestra como segundo_ |
| **azure.dbformysql_flexibleservers.ha_sql_status** <br>(gauge) | Estado del subproceso SQL de replicación en ejecución|
| **azure.dbformysql_flexibleservers.ibdata1_storage_used** <br>(gauge) | Almacenamiento utilizado por los archivos ibdata1<br>_Se muestra como byte_ |
| **azure.dbformysql_flexibleservers.innodb_buffer_pool_pages_data** <br>(count) | Número de páginas de la reserva de búferes InnoDB que contienen datos<br>_Se muestra como página_ |
| **azure.dbformysql_flexibleservers.innodb_buffer_pool_pages_data_dirty** <br>(count) | El número actual de páginas sucias en el grupo de búfer de InnoDB<br>_Se muestra como página_ |
| **azure.dbformysql_flexibleservers.innodb_buffer_pool_pages_data_flushed** <br>(gauge) | El número de solicitudes para vaciar páginas del grupo de búferes InnoDB<br>_Se muestra como solicitud_ |
| **azure.dbformysql_flexibleservers.innodb_buffer_pool_pages_free** <br>(count) | Número total de páginas libres en el grupo de búfer de InnoDB<br>_Se muestra como página_ |
| **azure.dbformysql_flexibleservers.innodb_buffer_pool_read_requests** <br>(count) | El número total de solicitudes lógicas de lectura<br>_Se muestra como solicitud_ |
| **azure.dbformysql_flexibleservers.innodb_buffer_pool_reads** <br>(count) | Número total de lecturas lógicas que InnoDB no pudo satisfacer desde el grupo de búferes y tuvo que leer directamente del disco<br>_Se muestra como lectura_ |
| **azure.dbformysql_flexibleservers.innodb_data_writes** <br>(count) | El número total de escrituras de datos<br>_Se muestra como escritura_ |
| **azure.dbformysql_flexibleservers.innodb_row_lock_time** <br>(gauge) | El tiempo total empleado en adquirir bloqueos de filas para tablas InnoDB, en milisegundos<br>_Se muestra como milisegundo_ |
| **azure.dbformysql_flexibleservers.innodb_row_lock_waits** <br>(gauge) | Número de veces que las operaciones sobre tablas InnoDB han tenido que esperar un bloqueo de fila.|
| **azure.dbformysql_flexibleservers.io_consumption_percent** <br>(gauge) | Porcentaje de E/S<br>_Se muestra en porcentaje_ |
| **azure.dbformysql_flexibleservers.lock_deadlocks** <br>(gauge) | Número de bloqueos|
| **azure.dbformysql_flexibleservers.lock_timeouts** <br>(gauge) | Número de tiempos de bloqueo|
| **azure.dbformysql_flexibleservers.memory_percent** <br>(gauge) | Porcentaje de memoria<br>_Se muestra como porcentaje_ |
| **azure.dbformysql_flexibleservers.network_bytes_egress** <br>(count) | Salida de red a través de conexiones activas<br>_Se muestra como byte_ |
| **azure.dbformysql_flexibleservers.network_bytes_ingress** <br>(count) | Entrada de red a través de conexiones activas<br>_Se muestra como byte_ |
| **azure.dbformysql_flexibleservers.others_storage_used** <br>(gauge) | Almacenamiento utilizado por otros archivos<br>_Se muestra como byte_ |
| **azure.dbformysql_flexibleservers.queries** <br>(count) | El número de consultas<br>_Se muestra como consulta_ |
| **azure.dbformysql_flexibleservers.replica_io_running** <br>(gauge) | Estado del subproceso de E/S de replicación en ejecución|
| **azure.dbformysql_flexibleservers.replica_sql_running** <br>(gauge) | Estado del subproceso SQL de replicación en ejecución|
| **azure.dbformysql_flexibleservers.replication_lag** <br>(gauge) | Retraso de replicación en segundos<br>_Se muestra como segundo_ |
| **azure.dbformysql_flexibleservers.serverlog_storage_limit** <br>(gauge) | Límite de almacenamiento Serverlog<br>_Se muestra como byte_ |
| **azure.dbformysql_flexibleservers.serverlog_storage_percent** <br>(gauge) | Porcentaje de almacenamiento Serverlog<br>_Se muestra como porcentaje_ |
| **azure.dbformysql_flexibleservers.serverlog_storage_usage** <br>(gauge) | Uso del almacenamiento Serverlog<br>_Se muestra como byte_ |
| **azure.dbformysql_flexibleservers.slow_queries** <br>(count) | El número total de consultas que han tardado más de long_query_time segundos<br>_Se muestra como query_ |
| **azure.dbformysql_flexibleservers.storage_io_count** <br>(count) | El número de E/S de almacenamiento consumidas|
| **azure.dbformysql_flexibleservers.storage_limit** <br>(gauge) | Límite de almacenamiento<br>_Se muestra como byte_ |
| **azure.dbformysql_flexibleservers.storage_percent** <br>(gauge) | Almacenamiento de la base de datos en porcentaje<br>_Se muestra en porcentaje_ |
| **azure.dbformysql_flexibleservers.storage_used** <br>(gauge) | Almacenamiento de la base de datos utilizado en bytes<br>_Se muestra como byte_ |
| **azure.dbformysql_flexibleservers.threads_running** <br>(count) | El número total de subprocesos que no están suspendidos<br>_Se muestra como subproceso_ |
| **azure.dbformysql_flexibleservers.total_connections** <br>(count) | Total de conexiones<br>_Se muestra como conexión_ |
| **azure.dbformysql_flexibleservers.threads_running** <br>(count) | El número total de subprocesos que no están suspendidos<br>_Se muestra como subproceso_ |
| **azure.dbformysql_flexibleservers.trx_rseg_history_len** <br>(gauge) | Longitud de la lista TRX_RSEG_HISTORY|
| **azure.dbformysql_flexibleservers.uptime** <br>(gauge) | El número de segundos que el servidor ha estado activo<br>_Se muestra como segundo_ |
| **azure.dbformysql_servers.active_connections** <br>(gauge) | Conexiones activas<br>_Se muestra como conexión_ |
| **azure.dbformysql_servers.backup_storage_used** <br>(gauge) | Almacenamiento de copia de seguridad utilizado<br>_Se muestra como byte_ |
| **azure.dbformysql_servers.connections_failed** <br>(count) | Conexiones fallidas<br>_Se muestra como conexión_ |
| **azure.dbformysql_servers.core_count** <br>(gauge) | Recuento de núcleos|
| **azure.dbformysql_servers.count** <br>(gauge) | El recuento de la integración del servidor Azure MySQL |
| **azure.dbformysql_servers.cpu_percent** <br>(gauge) | Porcentaje de CPU<br>_Se muestra como porcentaje_ |
| **azure.dbformysql_servers.io_consumption_percent** <br>(gauge) | Porcentaje de E/S<br>_Se muestra en porcentaje_ |
| **azure.dbformysql_servers.memory_percent** <br>(gauge) | Porcentaje de memoria<br>_Se muestra en porcentaje_ |
| **azure.dbformysql_servers.network_bytes_egress** <br>(count) | Salida de red a través de conexiones activas<br>_Se muestra como byte_ |
| **azure.dbformysql_servers.network_bytes_ingress** <br>(count) | Entrada de red a través de conexiones activas<br>_Se muestra como byte_ |
| **azure.dbformysql_servers.seconds_behind_master** <br>(gauge) | Retraso de replicación en segundos<br>_Se muestra como segundo_ |
| **azure.dbformysql_servers.serverlog_storage_limit** <br>(gauge) | Límite de almacenamiento de ServerLog<br>_Se muestra como byte_ |
| **azure.dbformysql_servers.serverlog_storage_percent** <br>(gauge) | Porcentaje de almacenamiento de ServerLog<br>_Se muestra en porcentaje_ |
| **azure.dbformysql_servers.serverlog_storage_usage** <br>(gauge) | Almacenamiento utilizado de ServerLog<br>_Se muestra como byte_ |
| **azure.dbformysql_servers.storage_limit** <br>(gauge) | Límite de almacenamiento<br>_Se muestra como byte_ |
| **azure.dbformysql_servers.storage_percent** <br>(gauge) | Almacenamiento de la base de datos en porcentaje<br>_Se muestra en porcentaje_ |
| **azure.dbformysql_servers.storage_used** <br>(gauge) | Almacenamiento de la base de datos utilizado en bytes<br>_Se muestra como byte_ |

### Eventos

La integración Azure Database for MySQL no incluye eventos.

### Checks de servicio

La integración Azure Database for MySQL no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).