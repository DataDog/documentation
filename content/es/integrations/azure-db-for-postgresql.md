---
aliases:
- /es/integrations/azure_db_for_postgresql
app_id: azure-db-for-postgresql
categories:
- azure
- nube
- almacenes de datos
custom_kind: integración
description: Rastrea las métricas principales de Azure DB for PostgreSQL.
media: []
title: Azure DB para PostgreSQL
---
## Información general

Azure Database for PostgreSQL proporciona una base de datos como servicio PostgreSQL comunitaria, totalmente gestionada y preparada para empresas.

Obtén métricas de Azure DB for PostgreSQL para:

- Visualizar el rendimiento de tus bases de datos PostgreSQL
- Correlacionar el rendimiento de tus bases de datos PostgreSQL con tus aplicaciones

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración de Microsoft Azure] primero (https://docs.datadoghq.com/integrations/azure/). No es necesario ningún otro paso de instalación adicional.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.dbforpostgresql_flexibleservers.active_connections** <br>(gauge) | Conexiones activas<br>_Se muestra como conexión_ |
| **azure.dbforpostgresql_flexibleservers.backup_storage_used** <br>(gauge) | Almacenamiento de copia de seguridad utilizado<br>_Se muestra como byte_ |
| **azure.dbforpostgresql_flexibleservers.connections_failed** <br>(count) | Conexiones fallidas<br>_Se muestra como conexión_ |
| **azure.dbforpostgresql_flexibleservers.core_count** <br>(gauge) | Recuento de núcleos|
| **azure.dbforpostgresql_flexibleservers.count** <br>(gauge) | El recuento de recursos de servidores flexibles de Azure DB para PostgreSQL|
| **azure.dbforpostgresql_flexibleservers.cpu_credits_consumed** <br>(gauge) | Número de créditos de CPU consumidos por el servidor de base de datos|
| **azure.dbforpostgresql_flexibleservers.cpu_credits_remaining** <br>(gauge) | Número de créditos de CPU disponibles para el servidor de base de datos|
| **azure.dbforpostgresql_flexibleservers.cpu_percent** <br>(gauge) | Porcentaje de CPU<br>_Se muestra como porcentaje_ |
| **azure.dbforpostgresql_flexibleservers.disk_queue_depth** <br>(gauge) | Número de operaciones de E/S pendientes en el disco|
| **azure.dbforpostgresql_flexibleservers.iops** <br>(count) | Operaciones de E/S por segundo<br>_Se muestra como operación_ |
| **azure.dbforpostgresql_flexibleservers.maximum_used_transactionids** <br>(gauge) | Número máximo de ID de transacción utilizados|
| **azure.dbforpostgresql_flexibleservers.memory_percent** <br>(gauge) | Porcentaje de memoria<br>_Se muestra en porcentaje_ |
| **azure.dbforpostgresql_flexibleservers.network_bytes_egress** <br>(count) | Salida de red a través de conexiones activas<br>_Se muestra como byte_ |
| **azure.dbforpostgresql_flexibleservers.network_bytes_ingress** <br>(count) | Entrada de red a través de conexiones activas<br>_Se muestra como byte_ |
| **azure.dbforpostgresql_flexibleservers.read_iops** <br>(count) | Operaciones de E/S de lectura por segundo<br>_Se muestra como operación_ |
| **azure.dbforpostgresql_flexibleservers.read_throughput** <br>(count) | Bytes leídos por segundo del disco<br>_Se muestra como byte_ |
| **azure.dbforpostgresql_flexibleservers.storage_free** <br>(gauge) | Almacenamiento libre<br>_Se muestra como byte_ |
| **azure.dbforpostgresql_flexibleservers.storage_percent** <br>(gauge) | Porcentaje de almacenamiento<br>_Se muestra como porcentaje_ |
| **azure.dbforpostgresql_flexibleservers.storage_used** <br>(gauge) | Almacenamiento utilizado<br>_Mostrado como byte_ |
| **azure.dbforpostgresql_flexibleservers.txlogs_storage_used** <br>(gauge) | Almacenamiento de logs de transacción utilizado<br>_Se muestra como byte_ |
| **azure.dbforpostgresql_flexibleservers.write_iops** <br>(count) | Operaciones de E/S de escritura por segundo<br>_Se muestra como operación_ |
| **azure.dbforpostgresql_flexibleservers.write_throughput** <br>(count) | Bytes escritos por segundo desde el disco<br>_Se muestra como byte_ |
| **azure.dbforpostgresql_servergroups.count** <br>(gauge) | Recuento de recursos de grupos de servidores de Azure DB para PostgreSQL|
| **azure.dbforpostgresql_servers.active_connections** <br>(gauge) | Conexiones activas<br>_Se muestra como conexión_ |
| **azure.dbforpostgresql_servers.backup_storage_used** <br>(gauge) | Almacenamiento de copia de seguridad utilizado<br>_Se muestra como byte_ |
| **azure.dbforpostgresql_servers.connections_failed** <br>(count) | Conexiones fallidas<br>_Se muestra como conexión_ |
| **azure.dbforpostgresql_servers.core_count** <br>(gauge) | Recuento de núcleos|
| **azure.dbforpostgresql_servers.count** <br>(gauge) | Recuento de recursos de Azure DB para PostgreSQL|
| **azure.dbforpostgresql_servers.cpu_percent** <br>(gauge) | Porcentaje de CPU<br>_Se muestra como porcentaje_ |
| **azure.dbforpostgresql_servers.cpu_percent.max** <br>(gauge) | Porcentaje máximo de CPU (Max Aggregated)<br>_Se muestra como porcentaje_ |
| **azure.dbforpostgresql_servers.io_consumption_percent** <br>(gauge) | Porcentaje de E/S<br>_Se muestra en porcentaje_ |
| **azure.dbforpostgresql_servers.io_consumption_percent.max** <br>(gauge) | Porcentaje máximo de E/S (Max Aggregated)<br>_Se muestra como porcentaje_ |
| **azure.dbforpostgresql_servers.memory_percent** <br>(gauge) | Porcentaje de memoria<br>_Se muestra en porcentaje_ |
| **azure.dbforpostgresql_servers.memory_percent.max** <br>(gauge) | Porcentaje máximo de memoria (Max Aggregated)<br>_Se muestra como porcentaje_ |
| **azure.dbforpostgresql_servers.network_bytes_egress** <br>(count) | Salida de red a través de conexiones activas<br>_Se muestra como byte_ |
| **azure.dbforpostgresql_servers.network_bytes_ingress** <br>(count) | Entrada de red a través de conexiones activas<br>_Se muestra como byte_ |
| **azure.dbforpostgresql_servers.pg_replica_log_delay_in_bytes** <br>(gauge) | Retraso en bytes de la réplica más retrasada<br>_Se muestra como byte_ |
| **azure.dbforpostgresql_servers.pg_replica_log_delay_in_seconds** <br>(gauge) | Retraso de la réplica en segundos<br>_Se muestra como segundo_ |
| **azure.dbforpostgresql_servers.serverlog_storage_limit** <br>(gauge) | Límite de almacenamiento de ServerLog<br>_Se muestra como byte_ |
| **azure.dbforpostgresql_servers.serverlog_storage_percent** <br>(gauge) | Porcentaje de almacenamiento de ServerLog<br>_Se muestra en porcentaje_ |
| **azure.dbforpostgresql_servers.serverlog_storage_percent.max** <br>(gauge) | Porcentaje de almacenamiento máximo de ServerLog (Max Aggregated)<br>_Se muestra como porcentaje_ |
| **azure.dbforpostgresql_servers.serverlog_storage_usage** <br>(gauge) | Almacenamiento utilizado de ServerLog<br>_Se muestra como byte_ |
| **azure.dbforpostgresql_servers.storage_limit** <br>(gauge) | Límite de almacenamiento<br>_Se muestra como byte_ |
| **azure.dbforpostgresql_servers.storage_percent** <br>(gauge) | Porcentaje de almacenamiento<br>_Se muestra como porcentaje_ |
| **azure.dbforpostgresql_servers.storage_percent.max** <br>(gauge) | Porcentaje máximo de almacenamiento (Max Aggregated)<br>_Se muestra como porcentaje_ |
| **azure.dbforpostgresql_servers.storage_used** <br>(gauge) | Almacenamiento utilizado<br>_Se muestra como byte_ |
| **azure.dbforpostgresql_serversv2.active_connections** <br>(gauge) | Conexiones activas<br>_Se muestra como conexión_ |
| **azure.dbforpostgresql_serversv2.count** <br>(gauge) | Recuento de recursos de Azure DB para PostgreSQL|
| **azure.dbforpostgresql_serversv2.cpu_percent** <br>(gauge) | Porcentaje de CPU<br>_Se muestra como porcentaje_ |
| **azure.dbforpostgresql_serversv2.iops** <br>(count) | Operaciones de E/S por segundo<br>_Se muestra como operación_ |
| **azure.dbforpostgresql_serversv2.memory_percent** <br>(gauge) | Porcentaje de memoria<br>_Se muestra en porcentaje_ |
| **azure.dbforpostgresql_serversv2.network_bytes_egress** <br>(count) | Salida de red a través de conexiones activas<br>_Se muestra como byte_ |
| **azure.dbforpostgresql_serversv2.network_bytes_ingress** <br>(count) | Entrada de red a través de conexiones activas<br>_Se muestra como byte_ |
| **azure.dbforpostgresql_serversv2.storage_percent** <br>(gauge) | Porcentaje de almacenamiento<br>_Se muestra como porcentaje_ |
| **azure.dbforpostgresql_serversv2.storage_used** <br>(gauge) | Almacenamiento utilizado<br>_Se muestra como byte_ |

### Eventos

La integración Azure DB for PostgreSQL no incluye eventos.

### Checks de servicio

La integración Azure DB for PostgreSQL no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).