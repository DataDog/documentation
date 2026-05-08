---
aliases:
- /es/integrations/azure_cosmosdb
app_id: azure-cosmosdb
categories:
- azure
- nube
- almacenes de datos
custom_kind: integración
description: Rastrea las métricas clave de Azure CosmosDB.
further_reading:
- link: https://www.datadoghq.com/blog/azure-cosmos-db-integrated-cache-datadog/
  tag: blog
  text: Monitorizar la caché integrada de Azure Cosmos DB con Datadog
media: []
title: Azure CosmosDB
---
## Información general

Azure Cosmos DB es un servicio de base de datos multimodelo distribuido globalmente que admite bases de datos de documentos, clave-valor, columnas anchas y gráficos.

Utiliza la integración de Azure con Datadog para recopilar métricas de Cosmos DB.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración con Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No se requiere ningún paso adicional.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.cosmosdb.region_added** <br>(count) | Región añadida.|
| **azure.cosmosdb.autoscale_max_throughput** <br>(gauge) | Rendimiento máximo de autoescala.|
| **azure.cosmosdb.autoscaled_ru** <br>(gauge) | Consumo de unidades de solicitud autoescalado con autoescalado por región y por partición.|
| **azure.cosmosdb.backup_mode_update** <br>(count) | Actualización del modo de copia de seguridad.|
| **azure.cosmosdb.backup_policy_interval_update** <br>(count) | Actualización periódica del intervalo de la política de copia de seguridad. Intervalo válido: 60 - 1440 minutos.|
| **azure.cosmosdb.backup_policy_redundancy_update** <br>(count) | Actualización periódica de la política de redundancia de copias de seguridad.|
| **azure.cosmosdb.backup_policy_retention_update** <br>(count) | Actualización periódica de la retención de la política de copias de seguridad. Intervalo válido: 8 - 720 horas.|
| **azure.cosmosdb.backup_policy_update** <br>(count) | Actualización periódica de la política de copias de seguridad.|
| **azure.cosmosdb.deprecated_available_storage** <br>(count) | "Almacenamiento disponible" se eliminará del monitor de azure monitor a finales de septiembre de 2023.<br>_Se muestra como byte_ |
| **azure.cosmosdb.cassandra_connection_closures** <br>(count) | Número de conexiones de Cassandra que se cerraron, con una granularidad de 1 minuto.|
| **azure.cosmosdb.cassandra_connector_average_replication_latency** <br>(gauge) | Replicationlatency media del conector de Cassandra.<br>_Se muestra en milisegundos_ |
| **azure.cosmosdb.cassandra_connector_replication_health_status** <br>(count) | Estado de la replicación del conector de Cassandra.|
| **azure.cosmosdb.cassandra_keyspace_created** <br>(count) | Espacio de claves de Cassandra creado.|
| **azure.cosmosdb.cassandra_keyspace_deleted** <br>(count) | Espacio de claves de Cassandra eliminado.|
| **azure.cosmosdb.cassandra_keyspace_throughput_updated** <br>(count) | Rendimiento del espacio de claves de Cassandra actualizado.|
| **azure.cosmosdb.cassandra_keyspace_updated** <br>(count) | Espacio de claves de Cassandra actualizado.|
| **azure.cosmosdb.cassandra_request_charges** <br>(count) | Unidades de solicitud consumidas por las soliciudes de Cassandra realizadas.|
| **azure.cosmosdb.cassandra_requests** <br>(count) | Número de solicitudes de Cassandra realizadas.|
| **azure.cosmosdb.cassandra_table_created** <br>(count) | Tabla de Cassandra creada.|
| **azure.cosmosdb.cassandra_table_deleted** <br>(count) | Tabla de Cassandra eliminada.|
| **azure.cosmosdb.cassandra_table_throughput_updated** <br>(count) | Rendimiento de tablas de Cassandra actualizado.|
| **azure.cosmosdb.cassandra_table_updated** <br>(count) | Tabla de Cassandra actualizada.|
| **azure.cosmosdb.continuous_tier_update** <br>(count) | Actualización del nivel ContinuousBackupMode.|
| **azure.cosmosdb.account_created** <br>(count) | Cuenta creada.|
| **azure.cosmosdb.data_usage** <br>(count) | Uso total de datos con una granularidad de 5 minutos.<br>_Se muestra como byte_ |
| **azure.cosmosdb.dedicated_gateway_average_cpu_usage** <br>(gauge) | Uso medio de la CPU en las instancias dedicadas del gateway.<br>_Se muestra como porcentaje_ |
| **azure.cosmosdb.dedicated_gateway_average_memory_usage** <br>(gauge) | Uso medio de memoria en las instancias dedicadas delgateway, que se utiliza tanto para enrutar solicitudes como para almacenar datos en caché.<br>_Se muestra como byte_ |
| **azure.cosmosdb.dedicated_gateway_cpu_usage** <br>(gauge) | Uso de la CPU en las instancias dedicadas del gateway.<br>_Se muestra como porcentaje_ |
| **azure.cosmosdb.dedicated_gateway_maximum_cpu_usage** <br>(gauge) | Uso máximo medio de la CPU en todas las instancias de gateway dedicadas.<br>_Se muestra como porcentaje_ |
| **azure.cosmosdb.dedicated_gateway_memory_usage** <br>(gauge) | Uso de memoria en las instancias dedicadas del gateway.<br>_Se muestra como byte_ |
| **azure.cosmosdb.dedicated_gateway_requests** <br>(count) | Solicitudes en el gateway dedicado.|
| **azure.cosmosdb.account_deleted** <br>(count) | Cuenta eliminada.|
| **azure.cosmosdb.document_count** <br>(count) | Recuento total de documentos en 5 minutos, 1 hora y 1 día.|
| **azure.cosmosdb.document_quota** <br>(count) | Cuota total de almacenamiento notificada con una granularidad de 5 minutos.<br>_Se muestra como byte_ |
| **azure.cosmosdb.gremlin_database_created** <br>(count) | Base de datos de Gremlin creada.|
| **azure.cosmosdb.gremlin_database_deleted** <br>(count) | Base de datos de Gremlin eliminada.|
| **azure.cosmosdb.gremlin_database_throughput_updated** <br>(count) | Actualización del rendimiento de la base de datos de Gremlin.|
| **azure.cosmosdb.gremlin_database_updated** <br>(count) | Base de datos de Gremlin actualizada.|
| **azure.cosmosdb.gremlin_graph_created** <br>(count) | Gráfico de Gremlin creado.|
| **azure.cosmosdb.gremlin_graph_deleted** <br>(count) | Gráfico de Gremlin borrado.|
| **azure.cosmosdb.gremlin_graph_throughput_updated** <br>(count) | Actualización del rendimiento del gráfico de Gremlin.|
| **azure.cosmosdb.gremlin_graph_updated** <br>(count) | Gráfico de Gremlin actualizado.|
| **azure.cosmosdb.gremlin_request_charges** <br>(count) | Unidades de solicitud consumidas por las solicitudes de gremlin realizadas.|
| **azure.cosmosdb.gremlin_requests** <br>(count) | Número de solicitudes de gremlin realizadas.|
| **azure.cosmosdb.index_usage** <br>(count) | Utilización total del índice con una granularidad de 5 minutos.<br>_Se muestra como byte_ |
| **azure.cosmosdb.integrated_cache_evicted_entries_size** <br>(gauge) | Tamaño de las entradas desalojadas de la caché integrada.<br>_Se muestra como byte_ |
| **azure.cosmosdb.integrated_cache_item_expiration_count** <br>(gauge) | Número de elementos desalojados de la caché integrada debido a la expiración del TTL.|
| **azure.cosmosdb.integrated_cache_item_hit_rate** <br>(gauge) | Número de lecturas puntuales que utilizaron la caché integrada dividido por el número de lecturas puntuales enrutadas a través del gateway dedicado con coherencia eventual.<br>_Se muestra como porcentaje_ |
| **azure.cosmosdb.integrated_cache_query_expiration_count** <br>(gauge) | Número de consultas desalojadas de la caché integrada debido a la expiración del TTL.|
| **azure.cosmosdb.integrated_cache_query_hit_rate** <br>(gauge) | Número de consultas que utilizaron la caché integrada dividido por el número de consultas enrutadas a través del gateway dedicado con coherencia eventual.<br>_Se muestra como porcentaje_ |
| **azure.cosmosdb.materialized_view_catchup_gap_in_minutes** <br>(gauge) | Diferencia de tiempo máxima en minutos entre los datos del contenedor fuente y los datos propagados a la vista materializada.|
| **azure.cosmosdb.materialized_views_builder_average_cpu_usage** <br>(gauge) | Uso medio de la CPU en las instancias del compilador de vistas materializadas, que se utilizan para rellenar datos en las vistas materializadas.<br>_Se muestra como porcentaje_ |
| **azure.cosmosdb.materialized_views_builder_average_memory_usage** <br>(gauge) | Uso medio de memoria en las instancias del compilador de vistas materializadas, que se utilizan para rellenar datos en las vistas materializadas.<br>_Se muestra como byte_ |
| **azure.cosmosdb.materialized_views_builder_maximum_cpu_usage** <br>(gauge) | Uso máximo medio de la CPU en las instancias del compilador de vistas materializadas, que se utilizan para rellenar los datos en las vistas materializadas.<br>_Se muestra como porcentaje_ |
| **azure.cosmosdb.metadata_requests** <br>(count) | Recuento de solicitudes de metadatos. Cosmos DB mantiene una colección de metadatos del sistema para cada cuenta, que permite enumerar colecciones, bases de datos, etc, y sus configuraciones, de forma gratuita.|
| **azure.cosmosdb.mongo_collection_created** <br>(count) | Recopilación de Mongo creada.|
| **azure.cosmosdb.mongo_collection_deleted** <br>(count) | Recopilación de Mongo eliminada.|
| **azure.cosmosdb.mongo_collection_throughput_updated** <br>(count) | Rendimiento de recopilación de Mongo actualizado.|
| **azure.cosmosdb.mongo_collection_updated** <br>(count) | Recopilación de Mongo actualizada.|
| **azure.cosmosdb.mongo_database_deleted** <br>(count) | Base de datos de Mongo eliminada.|
| **azure.cosmosdb.mongo_database_throughput_updated** <br>(count) | Rendimiento de la base de datos de Mongo actualizado.|
| **azure.cosmosdb.mongo_database_created** <br>(count) | Base de datos de Mongo creada.|
| **azure.cosmosdb.mongo_database_updated** <br>(count) | Base de datos de Mongo actualizada.|
| **azure.cosmosdb.mongo_request_charge** <br>(count) | Unidades de solicitud de Mongo consumidas.|
| **azure.cosmosdb.mongo_requests** <br>(count) | Número de solicitudes de Mongo realizadas.|
| **azure.cosmosdb.normalized_ru_consumption** <br>(gauge) | Porcentaje máximo de consumo de unidades de solicitud por minuto.<br>_Se muestra como porcentaje_ |
| **azure.cosmosdb.region_offlined** <br>(count) | Región fuera de línea.|
| **azure.cosmosdb.region_onlined** <br>(count) | Región en línea.|
| **azure.cosmosdb.physical_partition_count** <br>(gauge) | Recuento de particiones físicas.|
| **azure.cosmosdb.physical_partition_size** <br>(gauge) | Tamaño de la partición física en bytes.<br>_Se muestra como byte_ |
| **azure.cosmosdb.physical_partition_throughput** <br>(gauge) | Rendimiento de la partición física.|
| **azure.cosmosdb.provisioned_throughput** <br>(gauge) | Rendimiento provisionado.|
| **azure.cosmosdb.region_failed_over** <br>(count) | Región fallida.|
| **azure.cosmosdb.region_removed** <br>(count) | Región eliminada.|
| **azure.cosmosdb.p99_replication_latency** <br>(gauge) | Latencia de replicación P99 entre las regiones fuente y de destino para la cuenta geohabilitada.<br>_Se muestra en milisegundos_ |
| **azure.cosmosdb.server_side_latency** <br>(gauge) | Latencia del lado del servidor.<br>_Se muestra en milisegundos_ |
| **azure.cosmosdb.server_side_latency_direct** <br>(gauge) | Latencia del lado del servidor en modo directo de conexión.<br>_Se muestra en milisegundos_ |
| **azure.cosmosdb.server_side_latency_gateway** <br>(gauge) | Latencia del lado del servidor en modo de conexión de gateway.<br>_Se muestra en milisegundos_ |
| **azure.cosmosdb.service_availability** <br>(gauge) | Disponibilidad de las solicitudes de cuentas a una hora, un día o un mes.<br>_Se muestra en porcentaje_ |
| **azure.cosmosdb.sql_container_created** <br>(count) | Contenedor SQL creado.|
| **azure.cosmosdb.sql_container_deleted** <br>(count) | Contenedor SQL eliminado.|
| **azure.cosmosdb.sql_container_throughput_updated** <br>(count) | Rendimiento del contenedor SQL actualizado.|
| **azure.cosmosdb.sql_container_updated** <br>(count) | Contenedor SQL actualizado.|
| **azure.cosmosdb.sql_database_created** <br>(count) | Base de datos SQL creada.|
| **azure.cosmosdb.sql_database_deleted** <br>(count) | Base de datos SQL eliminada.|
| **azure.cosmosdb.sql_database_throughput_updated** <br>(count) | Rendimiento de la base de datos SQL actualizado.|
| **azure.cosmosdb.sql_database_updated** <br>(count) | Base de datos SQL actualizada.|
| **azure.cosmosdb.azure_table_table_created** <br>(count) | Tabla AzureTable creada.|
| **azure.cosmosdb.azure_table_table_deleted** <br>(count) | Tabla AzureTable eliminada.|
| **azure.cosmosdb.azure_table_table_throughput_updated** <br>(count) | Rendimiento de la tabla AzureTable actualizado.|
| **azure.cosmosdb.azure_table_table_updated** <br>(count) | Tabla AzureTable actualizada.|
| **azure.cosmosdb.total_requests** <br>(count) | Número de solicitudes realizadas.|
| **azure.cosmosdb.total_requests_preview** <br>(count) | Número de solicitudes SQL.|
| **azure.cosmosdb.total_request_units** <br>(count) | Unidades de solicitud SQL consumidas.|
| **azure.cosmosdb.total_request_units_preview** <br>(count) | Solicitar unidades consumidas con tipo de capacidad.|
| **azure.cosmosdb.account_keys_updated** <br>(count) | Claves de cuenta actualizadas.|
| **azure.cosmosdb.account_network_settings_updated** <br>(count) | Configuración de red de la cuenta actualizada.|
| **azure.cosmosdb.account_replication_settings_updated** <br>(count) | Se ha actualizado la configuración de la replicación de cuentas.|
| **azure.cosmosdb.account_diagnostic_settings_updated** <br>(count) | Configuración de diagnóstico de cuenta actualizada.|
| **azure.cosmosdb.count** <br>(gauge) | Recuento de DocumentDB databaseAccounts.|
| **azure.documentdb_cassandraclusters.cassandra_cache_capacity** <br>(gauge) | Capacidad de la caché en bytes.<br>_Se muestra como byte_ |
| **azure.documentdb_cassandraclusters.cassandra_cache_entries** <br>(gauge) | Número total de entradas de caché.|
| **azure.documentdb_cassandraclusters.cassandra_cache_hit_rate** <br>(gauge) | Tasa de aciertos de caché en todo momento.<br>_Se muestra como porcentaje_ |
| **azure.documentdb_cassandraclusters.cassandra_cache_hits** <br>(count) | Número total de visitas a la caché.|
| **azure.documentdb_cassandraclusters.cassandra_cache_miss_latency_histogram** <br>(count) | Histograma de latencia de fallo de caché (en microsegundos).|
| **azure.documentdb_cassandraclusters.cassandra_cache_miss_latency_p99** <br>(gauge) | Latencia p99 de los fallos.|
| **azure.documentdb_cassandraclusters.cassandra_cache_requests** <br>(count) | Número total de solicitudes de caché.|
| **azure.documentdb_cassandraclusters.cassandra_cache_size** <br>(gauge) | Tamaño total de la caché ocupada; en bytes.<br>_Se muestra como byte_ |
| **azure.documentdb_cassandraclusters.cassandra_client_auth_failure** <br>(count) | Número de solicitudes de autenticación de cliente fallidas.|
| **azure.documentdb_cassandraclusters.cassandra_client_auth_success** <br>(count) | Número de solicitudes de autenticación de clientes realizadas con éxito.|
| **azure.documentdb_cassandraclusters.cassandra_client_connected_native_clients** <br>(gauge) | Número de clientes nativos conectados.|
| **azure.documentdb_cassandraclusters.cassandra_client_request_condition_not_met** <br>(count) | El número de condiciones previas de transacción no coincide con los valores actuales.|
| **azure.documentdb_cassandraclusters.cassandra_client_request_contention_histogram** <br>(count) | Cuántas lecturas/escrituras disputadas se han encontrado.|
| **azure.documentdb_cassandraclusters.cassandra_client_request_contention_histogram_p99** <br>(gauge) | p99 Cuántas escrituras impugnadas se han encontrado.|
| **azure.documentdb_cassandraclusters.cassandra_client_request_failures** <br>(count) | Número de fallos de transacción encontrados.|
| **azure.documentdb_cassandraclusters.cassandra_client_request_latency_histogram** <br>(count) | Histograma de la latencia de las solicitudes de los clientes (en microsegundos).|
| **azure.documentdb_cassandraclusters.cassandra_client_request_latency_max** <br>(count) | Latencia máxima de solicitud del cliente (microsegundos).|
| **azure.documentdb_cassandraclusters.cassandra_client_request_latency_p99** <br>(gauge) | Latencia p99.|
| **azure.documentdb_cassandraclusters.cassandra_client_request_timeouts** <br>(count) | Número de tiempos de espera encontrados.|
| **azure.documentdb_cassandraclusters.cassandra_client_request_unfinished_commit** <br>(count) | Número de transacciones comprometidas en escritura.|
| **azure.documentdb_cassandraclusters.cassandra_commit_log_waiting_on_commit_latency_histogram** <br>(count) | Histograma del tiempo de espera en CL fsync (en microsegundos); para Periodic (Periódico) esto solo ocurre cuando la sincronización se retrasa con respecto a su intervalo de sincronización.|
| **azure.documentdb_cassandraclusters.cassandra_cql_prepared_statements_executed** <br>(count) | Número de sentencias preparadas ejecutadas.|
| **azure.documentdb_cassandraclusters.cassandra_cql_regular_statements_executed** <br>(count) | Número de sentencias no preparadas ejecutadas.|
| **azure.documentdb_cassandraclusters.cassandra_dropped_messages_count** <br>(count) | Recuento total de mensajes perdidos.|
| **azure.documentdb_cassandraclusters.cassandra_dropped_message_cross_node_latency** <br>(gauge) | Latencia media de abandonos en todos los nodos.<br>_Se muestra en milisegundos_ |
| **azure.documentdb_cassandraclusters.cassandra_dropped_message_cross_node_latency_p99** <br>(gauge) | Percentil 99 de latencia de abandono entre nodos.<br>_Se muestra en milisegundos_ |
| **azure.documentdb_cassandraclusters.cassandra_dropped_message_internal_latency** <br>(gauge) | Recuento total de mensajes perdidos.<br>_Se muestra en milisegundos_ |
| **azure.documentdb_cassandraclusters.cassandra_dropped_message_rate** <br>(count) | Tasa de mensajes abandonados.|
| **azure.documentdb_cassandraclusters.cassandra_hints_failed_rate** <br>(count) | Tasa de las pistas que no se entregaron.|
| **azure.documentdb_cassandraclusters.cassandra_hints_succeeded_rate** <br>(count) | Porcentaje de pistas entregadas con éxito.|
| **azure.documentdb_cassandraclusters.cassandra_hints_timed_out_rate** <br>(count) | Tasa de las pistas que se agotaron.|
| **azure.documentdb_cassandraclusters.cassandra_jvm_gc_count** <br>(gauge) | Número total de recopilaciones que se han producido.|
| **azure.documentdb_cassandraclusters.cassandra_jvm_gc_time** <br>(gauge) | Tiempo acumulado aproximado de recopilación.<br>_Se muestra en milisegundos_ |
| **azure.documentdb_cassandraclusters.cassandra_storage_total_hints_counter_total** <br>(count) | Número acumulado de pistas totales almacenadas.|
| **azure.documentdb_cassandraclusters.cassandra_storage_total_hints_in_progress_counter_total** <br>(count) | Número total de pistas en curso.|
| **azure.documentdb_cassandraclusters.cassandra_table_all_memtables_live_data_size** <br>(gauge) | Cantidad total de datos activos almacenados en las memtables (memtables 2i y pendientes de descarga incluidas) que residen fuera del stack; excluyendo cualquier sobrecarga de estructura de datos.|
| **azure.documentdb_cassandraclusters.cassandra_table_all_memtables_off_heap_size** <br>(gauge) | Cantidad total de datos almacenados en las memtables (2i y memtables pendientes de descarga incluidas) que residen fuera del stack.|
| **azure.documentdb_cassandraclusters.cassandra_table_bloom_filter_disk_space_used** <br>(gauge) | Espacio en disco utilizado por el filtro bloom (en bytes).<br>_Se muestra como byte_ |
| **azure.documentdb_cassandraclusters.cassandra_table_bloom_filter_false_positives** <br>(gauge) | Número de falsos positivos en el filtro bloom de la tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_bloom_filter_false_ratio** <br>(gauge) | Ratio de falsos positivos del filtro bloom de la tabla.<br>_Se muestra como porcentaje_ |
| **azure.documentdb_cassandraclusters.cassandra_table_bloom_filter_off_heap_memory_used** <br>(gauge) | Memoria fuera del stack utilizada por el filtro bloom.|
| **azure.documentdb_cassandraclusters.cassandra_table_bytes_flushed** <br>(count) | Número total de bytes descargados desde el inicio del servidor.<br>_Se muestra como byte_ |
| **azure.documentdb_cassandraclusters.cassandra_table_cas_commit** <br>(count) | Latencia de la ronda de commit paxos.|
| **azure.documentdb_cassandraclusters.cassandra_table_cas_commit_p99** <br>(gauge) | Latencia p99 de la ronda de commit paxos.|
| **azure.documentdb_cassandraclusters.cassandra_table_cas_prepare** <br>(count) | Latencia de la ronda de preparación paxos.|
| **azure.documentdb_cassandraclusters.cassandra_table_cas_prepare_p99** <br>(gauge) | Latencia p99 de la ronda de preparación paxos.|
| **azure.documentdb_cassandraclusters.cassandra_table_cas_propose** <br>(count) | Latencia de la ronda de propuestas paxos.|
| **azure.documentdb_cassandraclusters.cassandra_table_cas_propose_p99** <br>(gauge) | Latencia p99 de ronda de proposición paxos.|
| **azure.documentdb_cassandraclusters.cassandra_table_col_update_time_delta_histogram** <br>(count) | Delta de tiempo de actualización de columna en esta tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_col_update_time_delta_histogram_p99** <br>(gauge) | Delta de tiempo de actualización de columna p99 en esta tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_compaction_bytes_written** <br>(count) | Número total de bytes escritos por compactación desde el \[re\]inicio del servidor.<br>_Se muestra como byte_ |
| **azure.documentdb_cassandraclusters.cassandra_table_compression_metadata_off_heap_memory_used** <br>(gauge) | Memoria fuera del stack utilizada por los metadatos de compresión.|
| **azure.documentdb_cassandraclusters.cassandra_table_compression_ratio** <br>(gauge) | Tasa de compresión actual para todas las SSTables.<br>_Se muestra como porcentaje_ |
| **azure.documentdb_cassandraclusters.cassandra_table_coordinator_read_latency** <br>(count) | Latencia de lectura del coordinador para esta tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_coordinator_read_latency_p99** <br>(gauge) | Latencia p99 de lectura del coordinador para esta tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_coordinator_scan_latency** <br>(count) | Latencia de escaneo del rango de coordinadores para esta tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_coordinator_scan_latency_p99** <br>(gauge) | Latencia p99 de exploración del rango de coordinadores para esta tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_dropped_mutations** <br>(count) | Número de mutaciones descartadas en esta tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_estimated_column_count_histogram** <br>(count) | Número estimado de columnas.|
| **azure.documentdb_cassandraclusters.cassandra_table_estimated_column_count_histogram_p99** <br>(gauge) | Número p99 estimado de columnas.|
| **azure.documentdb_cassandraclusters.cassandra_table_estimated_partition_count** <br>(gauge) | Número aproximado de claves de la tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_estimated_partition_size_histogram** <br>(count) | Histograma del tamaño estimado de la partición.<br>_Se muestra como byte_ |
| **azure.documentdb_cassandraclusters.cassandra_table_estimated_partition_size_histogram_p99** <br>(gauge) | Tamaño p99 estimado de la partición (en bytes).<br>_Se muestra como byte_ |
| **azure.documentdb_cassandraclusters.cassandra_table_index_summary_off_heap_memory_used** <br>(gauge) | Memoria fuera del stack utilizada por el resumen de índices.|
| **azure.documentdb_cassandraclusters.cassandra_table_key_cache_hit_rate** <br>(gauge) | Porcentaje de aciertos en la memoria caché de esta tabla.<br>_Se muestra como porcentaje_ |
| **azure.documentdb_cassandraclusters.cassandra_table_live_disk_space_used** <br>(count) | Espacio en disco utilizado por las SSTables pertenecientes a esta tabla (en bytes).<br>_Se muestra como byte_ |
| **azure.documentdb_cassandraclusters.cassandra_table_live_scanned_histogram** <br>(count) | Celdas activas escaneadas en consultas en esta tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_live_scanned_histogram_p99** <br>(gauge) | Celdas p99 activas escaneadas en consultas sobre esta tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_live_sstable_count** <br>(gauge) | Número de SSTables en disco para esta tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_max_partition_size** <br>(gauge) | Tamaño de la partición compactada más grande (en bytes).<br>_Se muestra como byte_ |
| **azure.documentdb_cassandraclusters.cassandra_table_mean_partition_size** <br>(gauge) | Tamaño medio de la partición compactada (en bytes).<br>_Se muestra como byte_ |
| **azure.documentdb_cassandraclusters.cassandra_table_memtable_columns_count** <br>(gauge) | Número total de columnas presentes en la memtable.|
| **azure.documentdb_cassandraclusters.cassandra_table_memtable_off_heap_size** <br>(gauge) | Cantidad total de datos almacenados en la memtable que residen fuera del stack; incluida la sobrecarga relacionada con la columna y las particiones sobrescritas.|
| **azure.documentdb_cassandraclusters.cassandra_table_memtable_on_heap_size** <br>(gauge) | Cantidad total de datos almacenados en la memtable que reside en el montón; incluyendo la sobrecarga relacionada con la columna y las particiones sobrescritas.|
| **azure.documentdb_cassandraclusters.cassandra_table_memtable_switch_count** <br>(count) | Número de veces que la descarga ha provocado el cambio de la memtable.|
| **azure.documentdb_cassandraclusters.cassandra_table_min_partition_size** <br>(gauge) | Tamaño de la partición compactada más pequeña (en bytes).<br>_Se muestra como byte_ |
| **azure.documentdb_cassandraclusters.cassandra_table_pending_compactions** <br>(gauge) | Estimación del número de compactaciones pendientes para esta tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_pending_flushes** <br>(count) | Número estimado de tareas de descarga pendientes para esta tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_percent_repaired** <br>(gauge) | Porcentaje de datos de tabla que se reparan en disco.<br>_Se muestra como porcentaje_ |
| **azure.documentdb_cassandraclusters.cassandra_table_range_latency** <br>(count) | Latencia de escaneo de rango local para esta tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_range_latency_p99** <br>(gauge) | Latencia p99 de escaneo de rango local para esta tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_read_latency** <br>(count) | Latencia de lectura local para esta tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_read_latency_p99** <br>(gauge) | Latencia p99 de lectura local para esta tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_row_cache_hit** <br>(count) | Número de accesos a la caché de filas de tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_row_cache_hit_out_of_range** <br>(count) | Número de accesos a la caché de filas de tabla que no satisfacen el filtro de consulta; por lo tanto, fueron al disco.|
| **azure.documentdb_cassandraclusters.cassandra_table_row_cache_miss** <br>(count) | Número de pérdidas de caché de filas de tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_speculative_retries** <br>(count) | Número de veces que se enviaron reintentos especulativos para esta tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_sstables_per_read_histogram** <br>(count) | Número de archivos de datos sstable a los que se accede por cada partición leída. SSTables omitidas debido a filtros Bloom; no se tienen en cuenta la clave min-max ni la búsqueda de índices de partición.|
| **azure.documentdb_cassandraclusters.cassandra_table_sstables_per_read_histogram_p99** <br>(gauge) | Número p99 de archivos de datos sstable accedidos por lectura de partición única. SSTables omitidas debido a filtros Bloom; la clave min-max o la búsqueda de índice de partición no se tienen en cuenta.|
| **azure.documentdb_cassandraclusters.cassandra_table_tombstone_scanned_histogram** <br>(count) | Lápidas escaneadas en las consultas de esta tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_tombstone_scanned_histogram_p99** <br>(gauge) | Lápidas p99 escaneadas en las consultas de esta tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_total_disk_space_used** <br>(count) | Espacio total en disco utilizado por las SSTables pertenecientes a esta tabla; incluyendo las obsoletas que esperan ser recopiladas con los elementos no usados.|
| **azure.documentdb_cassandraclusters.cassandra_table_view_lock_acquire_time** <br>(count) | Tiempo que se tarda en obtener un bloqueo de partición para actualizaciones de vistas materializadas en esta tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_view_lock_acquire_time_p99** <br>(gauge) | Tiempo p99 necesario para obtener un bloqueo de partición para actualizaciones de vistas materializadas en esta tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_view_read_time** <br>(count) | Tiempo empleado durante la lectura local de la actualización de una vista materializada.|
| **azure.documentdb_cassandraclusters.cassandra_table_view_read_time_p99** <br>(gauge) | Tiempo p99 empleado durante la lectura local de la actualización de una vista materializada.|
| **azure.documentdb_cassandraclusters.cassandra_table_waiting_on_free_memtable_space** <br>(count) | Tiempo de espera de espacio libre en la memtable; dentro o fuera del montón.|
| **azure.documentdb_cassandraclusters.cassandra_table_waiting_on_free_memtable_space_p99** <br>(gauge) | Tiempo de espera p99 por espacio libre en la memtable; dentro o fuera del montón.|
| **azure.documentdb_cassandraclusters.cassandra_table_write_latency** <br>(count) | Latencia de escritura local para esta tabla.|
| **azure.documentdb_cassandraclusters.cassandra_table_write_latency_p99** <br>(gauge) | Latencia p99 de escritura local para esta tabla.|
| **azure.documentdb_cassandraclusters.cassandra_thread_pools_active_tasks** <br>(gauge) | Número de tareas en las que trabaja activamente este grupo.|
| **azure.documentdb_cassandraclusters.cassandra_thread_pools_currently_blocked_tasks** <br>(count) | Número de tareas que están actualmente bloqueadas debido a la saturación de la cola, pero que al reintentarlo se desbloquearán.|
| **azure.documentdb_cassandraclusters.cassandra_thread_pools_max_pool_size** <br>(gauge) | El número máximo de subprocesos en este grupo.|
| **azure.documentdb_cassandraclusters.cassandra_thread_pools_pending_tasks** <br>(gauge) | Número de tareas en cola en este grupo.|
| **azure.documentdb_cassandraclusters.cassandra_thread_pools_total_blocked_tasks** <br>(count) | Número de tareas que se bloquearon debido a la saturación de la cola.|
| **azure.documentdb_cassandraclusters.count** <br>(gauge) | Recuento de los clústeres de Casandra|
| **azure.documentdb_cassandraclusters.cpu** <br>(gauge) | Uso de la CPU (activo).<br>_Se muestra en porcentaje_ |
| **azure.documentdb_cassandraclusters.disk_utilization** <br>(gauge) | Tasa de utilización del disco.<br>_Se muestra como porcentaje_ |
| **azure.documentdb_cassandraclusters.diskio_merged_reads** <br>(gauge) | Lecturas combinadas de E/S de disco acumuladas.<br>_Se muestra como operación_ |
| **azure.documentdb_cassandraclusters.diskio_merged_writes** <br>(gauge) | Escrituras combinadas de E/S de disco acumuladas.<br>_Se muestra como operación_ |
| **azure.documentdb_cassandraclusters.diskio_read_bytes** <br>(gauge) | Bytes de lectura de E/S de disco acumulados.<br>_Se muestra como byte_ |
| **azure.documentdb_cassandraclusters.diskio_read_time** <br>(gauge) | Tiempo acumulado de lectura de E/S de disco.<br>_Se muestra en milisegundos_ |
| **azure.documentdb_cassandraclusters.diskio_reads** <br>(gauge) | Recuentos acumulados de lectura de E/S de disco.<br>_Se muestra como operación_ |
| **azure.documentdb_cassandraclusters.diskio_write_bytes** <br>(gauge) | Bytes de escritura de E/S de disco acumulados.<br>_Se muestra como byte_ |
| **azure.documentdb_cassandraclusters.diskio_write_time** <br>(gauge) | Tiempo acumulado de escritura de E/S en disco.<br>_Se muestra en milisegundos_ |
| **azure.documentdb_cassandraclusters.diskio_writes** <br>(gauge) | Recuentos acumulativos de escritura de E/S de disco.<br>_Se muestra como operación_ |
| **azure.documentdb_cassandraclusters.ethtool_rx_bytes** <br>(gauge) | Bytes acumulados recibidos de la red.<br>_Se muestra como byte_ |
| **azure.documentdb_cassandraclusters.ethtool_rx_packets** <br>(gauge) | Paquetes recibidos en la red acumulados.|
| **azure.documentdb_cassandraclusters.ethtool_tx_bytes** <br>(gauge) | Bytes acumulados transmitidos por la red.<br>_Se muestra como byte_ |
| **azure.documentdb_cassandraclusters.ethtool_tx_packets** <br>(gauge) | Paquetes transmitidos por la red.|
| **azure.documentdb_cassandraclusters.iops** <br>(gauge) | Operaciones de E/S y bytes por segundo.<br>_Se muestra como operación_ |
| **azure.documentdb_cassandraclusters.percent_mem** <br>(gauge) | Tasa de utilización de la memoria.<br>_Se muestra como porcentaje_ |
| **azure.documentdb_cassandraclusters.raid_array_degraded** <br>(gauge) | Si la matriz RAID está degradada, 1 significa degradada y 0 significa no degradada.|
| **azure.documentdb_cassandraclusters.raid_array_rebuild** <br>(gauge) | Porcentaje de recompilación de la matriz RAID.<br>_Se muestra como porcentaje_ |
| **azure.documentdb_cassandraclusters.total_cpu** <br>(gauge) | Uso medio de la CPU (activo) en todas las CPU.<br>_Se muestra como porcentaje_ |

### Eventos

La integración Azure Cosmos DB no incluye ningún evento.

### Checks de servicio

La integración de Azure Cosmos DB no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}