---
aliases:
- /es/integrations/google_cloudsql
app_id: google-cloudsql
categories:
- nube
- almacenes de datos
- google cloud
- recopilación de logs
custom_kind: integración
description: Servicio de bases de datos sencillo, relacional, totalmente gestionado
  para Postges, MySQL y SQL Server
media: []
title: Google CloudSQL
---
## Información general

Google Cloud SQL es un servicio de base de datos totalmente gestionado que facilita la configuración, el mantenimiento, la gestión y la administración de tus bases de datos SQL en la nube.

Obtén métricas de Google Cloud SQL para:

- Visualizar el rendimiento de tus bases de datos Cloud SQL.
- Correlacionar el rendimiento de tus bases de datos Cloud SQL con tus aplicaciones.

## Configuración

### Instalación

#### Recopilación de métricas

Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No hay más pasos de instalación.

#### Configuración

Para recopilar etiquetas (labels) Cloud SQL personalizadas como etiquetas (tags), activa el permiso de inventario de recursos en la nube.

#### Recopilación de logs

{{< site-region region="us3" >}}

La recopilación de logs no es compatible con este sitio.

{{< /site-region >}}

{{< site-region region="us,eu,gov" >}}

Los logs de Google Cloud SQL se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google Cloud SQL de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra logs de Google Cloud SQL.
1. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.
1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

{{< /site-region >}}

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.cloudsql.database.active_directory.domain_reachable** <br>(gauge) | Indica si la instancia puede hacer ping a un controlador de dominio del dominio de Active Directory gestionado conectado. Si es falso, es posible que Windows Authentication no funcione como se espera.|
| **gcp.cloudsql.database.active_directory.instance_available** <br>(gauge) | Indica si la instancia está disponible actualmente utilizando Windows Authentication.|
| **gcp.cloudsql.database.auto_failover_request_count** <br>(count) | Delta del número de solicitudes de conmutación por error automática de instancias.<br>_Se muestra como solicitud_ |
| **gcp.cloudsql.database.available_for_failover** <br>(gauge) | Es mayor que 0 si la operación de conmutación por error está disponible en la instancia.|
| **gcp.cloudsql.database.cpu.reserved_cores** <br>(gauge) | Número de núcleos reservados para la base de datos.<br>_Se muestra como núcleo_ |
| **gcp.cloudsql.database.cpu.usage_time** <br>(gauge) | Tiempo acumulado de uso de CPU.<br>_Se muestra en segundos_ |
| **gcp.cloudsql.database.cpu.utilization** <br>(gauge) | Fracción de CPU reservada que está actualmente en uso.<br>_Se muestra como fracción_ |
| **gcp.cloudsql.database.data_cache.bytes_used** <br>(gauge) | Uso de la caché de datos en bytes.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.data_cache.quota** <br>(gauge) | Tamaño máximo de la caché de datos en bytes.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.disk.bytes_used** <br>(gauge) | Espacio de disco utilizado.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.disk.bytes_used_by_data_type** <br>(gauge) | Uso de datos en bytes.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.disk.quota** <br>(gauge) | Tamaño máximo de datos en disco en bytes.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.disk.read_ops_count** <br>(count) | Operaciones de E/S de lectura de disco.<br>_Se muestra como operación_ |
| **gcp.cloudsql.database.disk.utilization** <br>(gauge) | Fracción de la cuota de disco que está actualmente en uso.<br>_Se muestra como fracción_ |
| **gcp.cloudsql.database.disk.write_ops_count** <br>(count) | Operaciones de E/S de escritura en disco.<br>_Se muestra como operación_ |
| **gcp.cloudsql.database.instance_state** <br>(gauge) | Estado de servicio de la instancia Cloud SQL.|
| **gcp.cloudsql.database.memory.components** <br>(gauge) | Componentes de las estadísticas de memoria en porcentaje como uso, caché y memoria libre para la base de datos.|
| **gcp.cloudsql.database.memory.quota** <br>(gauge) | RAM máxima en bytes.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.memory.total_usage** <br>(gauge) | Uso total de RAM en bytes, incluida la caché del buffer.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.memory.usage** <br>(gauge) | Uso de RAM en bytes.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.memory.utilization** <br>(gauge) | Fracción de la cuota de memoria actualmente en uso.<br>_Se muestra como fracción_ |
| **gcp.cloudsql.database.mysql.aborted_clients_count** <br>(count) | Conexiones canceladas debido a que el cliente murió sin cerrar correctamente la conexión, desde la última muestra.|
| **gcp.cloudsql.database.mysql.aborted_connects_count** <br>(count) | Intentos fallidos de conexión al servidor MySQL, desde la última muestra.|
| **gcp.cloudsql.database.mysql.connections_count** <br>(count) | Intentos de conexión (exitosos o no) al servidor MySQL, desde la última muestra.|
| **gcp.cloudsql.database.mysql.ddl_operations_count** <br>(count) | Operaciones DDL MySQL, desde la última muestra.|
| **gcp.cloudsql.database.mysql.dml_operations_count** <br>(count) | Operaciones DML MySQL, desde la última muestra.|
| **gcp.cloudsql.database.mysql.handler_operations_count** <br>(count) | Operaciones de identificadores MySQL, desde la última muestra.|
| **gcp.cloudsql.database.mysql.innodb.active_transactions** <br>(gauge) | Número de detalles de transacciones activas (transacciones en curso). Los valores entre paréntesis corresponden a `innodb_transaction_state` (`Total/running/lock_wait/rolling_back/committing`).|
| **gcp.cloudsql.database.mysql.innodb.active_trx_longest_time** <br>(gauge) | Mayor tiempo de transacción de las transacciones de InnoDB actualmente activas.|
| **gcp.cloudsql.database.mysql.innodb.active_trx_rows_locked** <br>(gauge) | Número de filas bloqueadas por transacciones de InnoDB actualmente activas.|
| **gcp.cloudsql.database.mysql.innodb.active_trx_rows_modified** <br>(gauge) | Número de filas modificadas por transacciones de InnoDB actualmente activas.|
| **gcp.cloudsql.database.mysql.innodb.active_trx_total_time** <br>(gauge) | Duración de las transacciones de InnoDB actualmente activas.<br>_Se muestra en segundos_ |
| **gcp.cloudsql.database.mysql.innodb.adaptive_hash_operation_count** <br>(count) | Total de operaciones internas de filas (filas añadidas, actualizadas, eliminadas) realizadas para mantener el AHI desde la última muestra.|
| **gcp.cloudsql.database.mysql.innodb.ahi_search_count** <br>(count) | Total de operaciones de búsqueda en el AHI de InnoDB y su eficiencia desde la última muestra.|
| **gcp.cloudsql.database.mysql.innodb.buffer_flush_sync_waits_count** <br>(count) | Número de veces que InnoDB ha realizado operaciones síncronas de vaciado de buffer y bloqueo de transacciones de usuario desde la última muestra.|
| **gcp.cloudsql.database.mysql.innodb.buffer_pool_pages** <br>(gauge) | Número de páginas del grupo de buffers de InnoDB, el campo innodb_page_type almacena el recuento de páginas de InnoDB en cada estado.|
| **gcp.cloudsql.database.mysql.innodb.buffer_pool_read_requests_count** <br>(count) | Solicitudes de lectura lógica desde el grupo de buffers de InnoDB, desde la última muestra.|
| **gcp.cloudsql.database.mysql.innodb.buffer_pool_reads_count** <br>(count) | Lecturas lógicas que InnoDB no ha podido satisfacer desde el grupo de buffers y ha tenido que leer directamente del disco, desde la última muestra.|
| **gcp.cloudsql.database.mysql.innodb.buffer_pool_write_requests_count** <br>(count) | Escrituras realizadas en el grupo de buffers de InnoDB, desde la última muestra.|
| **gcp.cloudsql.database.mysql.innodb.data_cache.cache_hit_count** <br>(count) | Número total de operaciones de lectura en la caché de datos de esta instancia.|
| **gcp.cloudsql.database.mysql.innodb.data_cache.cache_miss_count** <br>(count) | Número total de operaciones de lectura fallidas de la caché de datos de esta instancia.|
| **gcp.cloudsql.database.mysql.innodb.data_cache.pages** <br>(gauge) | Número de páginas de InnoDB en la función de caché de datos Mysqls E+.|
| **gcp.cloudsql.database.mysql.innodb.data_fsyncs_count** <br>(count) | Llamadas a fsync() de InnoDB, desde la última muestra.|
| **gcp.cloudsql.database.mysql.innodb.data_pending_fsyncs** <br>(gauge) | Número de operaciones fsync() pendientes en el servidor MySQL.|
| **gcp.cloudsql.database.mysql.innodb.data_pending_reads** <br>(gauge) | Número de lecturas pendientes en el servidor MySQL.|
| **gcp.cloudsql.database.mysql.innodb.data_pending_writes** <br>(gauge) | Número de escrituras pendientes en el servidor MySQL.|
| **gcp.cloudsql.database.mysql.innodb.deadlocks_count** <br>(count) | Bloqueos, desde la última muestra.|
| **gcp.cloudsql.database.mysql.innodb.dictionary_memory** <br>(gauge) | Memoria asignada para la caché del diccionario de InnoDB.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.mysql.innodb.history_list_length** <br>(gauge) | Indica el tamaño de los logs de deshacer que se utilizan para almacenar modificaciones realizadas en versiones anteriores de las filas.|
| **gcp.cloudsql.database.mysql.innodb.ibuf_merge_operation_count** <br>(count) | Número total de registros de tipo fusionados por la operación de almacenamiento en memoria de los cambios, desde la última muestra.|
| **gcp.cloudsql.database.mysql.innodb.ibuf_merges_count** <br>(count) | Número total de fusiones del buffer de cambios, desde la última muestra. Esto muestra la eficiencia de todas las operaciones del buffer de cambios.|
| **gcp.cloudsql.database.mysql.innodb.innodb_log_waits_count** <br>(count) | Número total de transacciones que esperan a que haya espacio disponible en el buffer de logs de InnoDB, para ayudar a ajustar la configuración de innodb_log_buffer_size.|
| **gcp.cloudsql.database.mysql.innodb.lock_timeout_count** <br>(count) | Tiempos de espera de bloqueo de filas, desde la última muestra.|
| **gcp.cloudsql.database.mysql.innodb.lsn** <br>(gauge) | Valor del número de secuencia de log de InnoDB current/flushed/last_checkpoint.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.mysql.innodb.operation_disk_io_count** <br>(count) | Operaciones de E/S de disco realizadas por InnoDB, desde la última muestra.|
| **gcp.cloudsql.database.mysql.innodb.os_log_fsyncs_count** <br>(count) | Llamadas fsync() de InnoDB al archivo de logs, desde la última muestra.|
| **gcp.cloudsql.database.mysql.innodb.os_log_pending_fsyncs** <br>(gauge) | Número de operaciones fsync() pendientes para archivos de logs redo de InnoDB en el servidor MySQL.|
| **gcp.cloudsql.database.mysql.innodb.os_log_pending_writes** <br>(gauge) | Número de escrituras pendientes en archivos de logs redo de InnoDB en el servidor MySQL.|
| **gcp.cloudsql.database.mysql.innodb.pages_read_count** <br>(count) | Páginas de InnoDB leídas, desde la última muestra.|
| **gcp.cloudsql.database.mysql.innodb.pages_written_count** <br>(count) | Páginas de InnoDB escritas, desde la última muestra.|
| **gcp.cloudsql.database.mysql.innodb.row_lock_time** <br>(gauge) | Tiempo total empleado en adquirir bloqueos de filas para tablas de InnoDB.<br>_Se muestra en milisegundos_ |
| **gcp.cloudsql.database.mysql.innodb.row_lock_waits_count** <br>(count) | Veces que las operaciones en tablas de InnoDB han tenido que esperar un bloqueo de fila, desde la última muestra.|
| **gcp.cloudsql.database.mysql.innodb.row_operations_count** <br>(count) | Operaciones de filas de InnoDB.|
| **gcp.cloudsql.database.mysql.innodb_buffer_pool_pages_dirty** <br>(gauge) | Número de páginas sin vaciar en el grupo de buffers de InnoDB.<br>_Se muestra como página_ |
| **gcp.cloudsql.database.mysql.innodb_buffer_pool_pages_free** <br>(gauge) | Número de páginas no utilizadas en el grupo de buffers de InnoDB.<br>_Se muestra como página_ |
| **gcp.cloudsql.database.mysql.innodb_buffer_pool_pages_total** <br>(gauge) | Número total de páginas en el grupo de buffers de InnoDB.<br>_Se muestra como página_ |
| **gcp.cloudsql.database.mysql.innodb_data_fsyncs** <br>(count) | Llamadas fsync de InnoDB.<br>_Se muestra como operación_ |
| **gcp.cloudsql.database.mysql.innodb_os_log_fsyncs** <br>(count) | Llamadas fsync de InnoDB al archivo de logs.<br>_Se muestra como operación_ |
| **gcp.cloudsql.database.mysql.innodb_pages_read** <br>(count) | Páginas de InnoDB leídas.<br>_Se muestra como página_ |
| **gcp.cloudsql.database.mysql.innodb_pages_written** <br>(count) | Páginas de InnoDB escritas.<br>_Se muestra como página_ |
| **gcp.cloudsql.database.mysql.max_connections** <br>(gauge) | Valor de la configuración max_connections de MySQL.|
| **gcp.cloudsql.database.mysql.memory.by_code_area** <br>(gauge) | Memoria asignada a cada área de código, reportada por performance_schema de MySQL.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.mysql.memory.by_event** <br>(gauge) | Memoria asignada por cada evento, reportado por performance_schema.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.mysql.memory.global** <br>(gauge) | Memoria total asignada, informada por performance_schema.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.mysql.open_table_definitions** <br>(gauge) | Número de definiciones de tabla actualmente almacenadas en la caché.|
| **gcp.cloudsql.database.mysql.open_tables** <br>(gauge) | Número de mesas actualmente abiertas.|
| **gcp.cloudsql.database.mysql.opened_table_count** <br>(count) | Número de mesas que se han abierto desde la última muestra.|
| **gcp.cloudsql.database.mysql.opened_table_definitions_count** <br>(count) | Número de definiciones de tabla que se han almacenado en la caché desde la última muestra.|
| **gcp.cloudsql.database.mysql.queries** <br>(count) | Número de sentencias de consulta ejecutadas por el servidor.<br>_Se muestra como consulta_ |
| **gcp.cloudsql.database.mysql.questions** <br>(count) | Número de sentencias de pregunta ejecutadas por el servidor. Incluye solo las sentencias enviadas al servidor por los clientes y no las ejecutadas en programas almacenados.<br>_Se muestra como pregunta_ |
| **gcp.cloudsql.database.mysql.received_bytes_count** <br>(count) | Recuento delta de bytes recibidos por el proceso MySQL.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.mysql.replication.last_io_errno** <br>(gauge) | Número de error del error más reciente que ha provocado la detención del subproceso de E/S.<br>_Se muestra en segundos_ |
| **gcp.cloudsql.database.mysql.replication.last_sql_errno** <br>(gauge) | Número de error del error más reciente que ha provocado la detención del subproceso de SQL.<br>_Se muestra en segundos_ |
| **gcp.cloudsql.database.mysql.replication.seconds_behind_master** <br>(gauge) | Número aproximado de segundos que la réplica de lectura lleva de retraso con respecto a su máster.<br>_Se muestra en segundos_ |
| **gcp.cloudsql.database.mysql.replication.slave_io_running** <br>(gauge) | Indica si se está ejecutando el subproceso de E/S para leer el log binario del máster. Los valores posibles son Sí, No y Conectando.|
| **gcp.cloudsql.database.mysql.replication.slave_io_running_state** <br>(gauge) | Indica si el subproceso de E/S para leer el log binario del máster está en ejecución. Los valores posibles son Sí, No y Conectando, valores expuestos a través del campo 'state' (estado).|
| **gcp.cloudsql.database.mysql.replication.slave_sql_running** <br>(gauge) | Indica si se está ejecutando el subproceso SQL para ejecutar eventos en el log de relé.|
| **gcp.cloudsql.database.mysql.replication.slave_sql_running_state** <br>(gauge) | Indica si se está ejecutando el subproceso SQL para ejecutar eventos en el log de relé, valores expuestos a través del campo 'state' (estado).|
| **gcp.cloudsql.database.mysql.sent_bytes_count** <br>(count) | Recuento delta de bytes enviados por el proceso MySQL.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.mysql.slow_queries_count** <br>(count) | Número total de consultas que han tardado más de long_query_time segundos.|
| **gcp.cloudsql.database.mysql.thread_cache_size** <br>(gauge) | Valor de la configuración `thread_cache_size` de MySQL.|
| **gcp.cloudsql.database.mysql.thread_state** <br>(gauge) | Estado de los subprocesos en ejecución consultando la tabla `information_schema.processlist`. Esta información ayuda a entender los problemas de bloqueo o contención.|
| **gcp.cloudsql.database.mysql.threads** <br>(gauge) | Número de subprocesos. `threads_cached` indica subprocesos en la caché de subprocesos, `threads_connected` indica conexiones actualmente abiertas, `threads_running` indica subprocesos que no están activos.|
| **gcp.cloudsql.database.mysql.threads_created_count** <br>(count) | Subprocesos creados para gestionar conexiones, desde la última muestra.|
| **gcp.cloudsql.database.mysql.tmp_disk_tables_created_count** <br>(count) | Tablas temporales internas en disco creadas por el servidor MySQL durante la ejecución de sentencias, desde la última muestra.|
| **gcp.cloudsql.database.mysql.tmp_files_created_count** <br>(count) | Archivos temporales creados por el servidor MySQL, desde la última muestra.|
| **gcp.cloudsql.database.mysql.tmp_tables_created_count** <br>(count) | Tablas MySQL temporales creadas, desde la última muestra.|
| **gcp.cloudsql.database.network.connections** <br>(gauge) | Número de conexiones a la instancia Cloud SQL.<br>_Se muestra como conexión_ |
| **gcp.cloudsql.database.network.received_bytes_count** <br>(count) | Recuento delta de bytes recibidos a través de la red.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.network.sent_bytes_count** <br>(count) | Número de bytes enviados a través de la red.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.postgresql.backends_in_wait** <br>(gauge) | Número de backends en espera en la instancia Postgres.<br>_Se muestra como conexión_ |
| **gcp.cloudsql.database.postgresql.blocks_read_count** <br>(count) | Número de bloques de disco leídos por esta base de datos. El campo fuente distingue las lecturas reales del disco de las lecturas de la caché del buffer.|
| **gcp.cloudsql.database.postgresql.data_cache.hit_count** <br>(count) | Número total de operaciones de lectura en la caché de datos para esta instancia.|
| **gcp.cloudsql.database.postgresql.data_cache.hit_ratio** <br>(gauge) | Ratio de operaciones de lectura exitosas en la caché de datos para esta instancia.|
| **gcp.cloudsql.database.postgresql.data_cache.miss_count** <br>(count) | Número total de operaciones de lectura fallidas de la caché de datos para esta instancia.|
| **gcp.cloudsql.database.postgresql.deadlock_count** <br>(count) | Número de bloqueos detectados para esta base de datos.|
| **gcp.cloudsql.database.postgresql.external_sync.initial_sync_complete** <br>(gauge) | Si todas las bases de datos en la réplica del Servidor Externo Postgres (ES) han completado la sincronización inicial y están replicando los cambios desde la fuente.|
| **gcp.cloudsql.database.postgresql.external_sync.max_replica_byte_lag** <br>(gauge) | Retraso de replicación en bytes para réplicas del Servidor Externo Postgres (ES). Agregado en todas las bases de datos de la réplica.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.postgresql.insights.aggregate.execution_time** <br>(gauge) | Tiempo acumulado de ejecución de consultas por usuario y por base de datos.<br>_Se muestra en microsegundos_ |
| **gcp.cloudsql.database.postgresql.insights.aggregate.io_time** <br>(gauge) | Tiempo de E/S acumulado por usuario y base de datos.<br>_Se muestra en microsegundos_ |
| **gcp.cloudsql.database.postgresql.insights.aggregate.latencies.avg** <br>(gauge) | Media de la distribución acumulada de la latencia de consulta por usuario y por base de datos.<br>_Se muestra en microsegundos_ |
| **gcp.cloudsql.database.postgresql.insights.aggregate.latencies.p95** <br>(gauge) | Percentil 95 de la distribución acumulada de la latencia de consulta por usuario y por base de datos.<br>_Se muestra en microsegundos_ |
| **gcp.cloudsql.database.postgresql.insights.aggregate.latencies.p99** <br>(gauge) | Percentil 99 de la distribución acumulada de la latencia de consulta por usuario y por base de datos.<br>_Se muestra en microsegundos_ |
| **gcp.cloudsql.database.postgresql.insights.aggregate.latencies.samplecount** <br>(gauge) | Recuento de muestras de la distribución acumulada de la latencia de consulta por usuario y base de datos.<br>_Se muestra en microsegundos_ |
| **gcp.cloudsql.database.postgresql.insights.aggregate.latencies.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado de la distribución acumulada de la latencia de consulta por usuario y por base de datos.<br>_Se muestra en microsegundos_ |
| **gcp.cloudsql.database.postgresql.insights.aggregate.lock_time** <br>(gauge) | Tiempo de espera de bloqueo acumulado por usuario y base de datos.<br>_Se muestra en microsegundos_ |
| **gcp.cloudsql.database.postgresql.insights.aggregate.row_count** <br>(count) | Número acumulado de filas recuperadas o afectadas por base de datos.|
| **gcp.cloudsql.database.postgresql.insights.aggregate.shared_blk_access_count** <br>(count) | Bloques compartidos acumulados a los que se ha accedido mediante la ejecución de sentencias.|
| **gcp.cloudsql.database.postgresql.insights.perquery.execution_time** <br>(gauge) | Tiempos de ejecución acumulados por usuario, por base de datos y por consulta.<br>_Se muestra en microsegundos_ |
| **gcp.cloudsql.database.postgresql.insights.perquery.io_time** <br>(gauge) | Tiempo de E/S acumulado por usuario y consulta.<br>_Se muestra en microsegundos_ |
| **gcp.cloudsql.database.postgresql.insights.perquery.latencies** <br>(gauge) | Distribución de la latencia de consulta por usuario y consulta.<br>_Se muestra en microsegundos_ |
| **gcp.cloudsql.database.postgresql.insights.perquery.lock_time** <br>(gauge) | Tiempo de espera de bloqueo acumulado por usuario y consulta.<br>_Se muestra en microsegundos_ |
| **gcp.cloudsql.database.postgresql.insights.perquery.row_count** <br>(count) | Número acumulado de filas recuperadas o afectadas por consulta.|
| **gcp.cloudsql.database.postgresql.insights.perquery.shared_blk_access_count** <br>(count) | Bloques compartidos acumulados a los que se ha accedido mediante la ejecución de sentencias por consulta.|
| **gcp.cloudsql.database.postgresql.insights.pertag.execution_time** <br>(gauge) | Tiempo de ejecución acumulado por usuario, por base de datos y por etiqueta.<br>_Se muestra en microsegundos_ |
| **gcp.cloudsql.database.postgresql.insights.pertag.io_time** <br>(gauge) | Tiempo acumulado de escritura de E/S por usuario, por base de datos y por etiqueta.<br>_Se muestra en microsegundos_ |
| **gcp.cloudsql.database.postgresql.insights.pertag.latencies** <br>(gauge) | Distribución de la latencia de consulta por usuario, por base de datos y por etiqueta.<br>_Se muestra en microsegundos_ |
| **gcp.cloudsql.database.postgresql.insights.pertag.lock_time** <br>(gauge) | Tiempo acumulado de espera de bloqueo por usuario, por base de datos y por etiqueta.<br>_Se muestra en microsegundos_ |
| **gcp.cloudsql.database.postgresql.insights.pertag.row_count** <br>(count) | Número acumulado de filas recuperadas o afectadas.|
| **gcp.cloudsql.database.postgresql.insights.pertag.shared_blk_access_count** <br>(count) | Bloques compartidos acumulados a los que se ha accedido mediante la ejecución de sentencias.|
| **gcp.cloudsql.database.postgresql.new_connection_count** <br>(count) | Recuento de nuevas conexiones añadidas a la instancia Postgres.|
| **gcp.cloudsql.database.postgresql.num_backends** <br>(gauge) | Número de conexiones a la instancia Cloud SQL PostgreSQL.<br>_Se muestra como conexión_ |
| **gcp.cloudsql.database.postgresql.num_backends_by_application** <br>(gauge) | Número de conexiones a la instancia Cloud SQL PostgreSQL, agrupadas por aplicaciones.<br>_Se muestra como conexión_ |
| **gcp.cloudsql.database.postgresql.num_backends_by_state** <br>(gauge) | Número de conexiones a la instancia Cloud SQL PostgreSQL, agrupadas por su estado.<br>_Se muestra como conexión_ |
| **gcp.cloudsql.database.postgresql.replication.replica_byte_lag** <br>(gauge) | Retraso de replicación en bytes.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.postgresql.statements_executed_count** <br>(count) | Recuento total de sentencias ejecutadas en la instancia PostgreSQL.|
| **gcp.cloudsql.database.postgresql.temp_bytes_written_count** <br>(count) | Cantidad total de datos (en bytes) escritos en archivos temporales por las consultas por base de datos.|
| **gcp.cloudsql.database.postgresql.temp_files_written_count** <br>(count) | Número total de archivos temporales utilizados para escribir datos mientras se realizan algoritmos como join y sort.|
| **gcp.cloudsql.database.postgresql.transaction_count** <br>(count) | Recuento delta del número de transacciones.<br>_Se muestra como transacción_ |
| **gcp.cloudsql.database.postgresql.transaction_id_count** <br>(count) | Recuento delta de ID de transacción. La etiqueta 'action' (acción) describe el tipo de acción, que puede ser `assigned` (recuento de ID de transacción asignados y consumidos por la instancia) o `frozen` (recuento de ID de transacción repuestos por la operación de congelación de VACUUM).|
| **gcp.cloudsql.database.postgresql.transaction_id_utilization** <br>(gauge) | Uso actual representado como porcentaje de ID de transacción consumidos por la instancia Cloud SQL PostgreSQL. Los valores son típicamente números entre 0.0 y 1.0. Los gráficos muestran los valores como un porcentaje entre 0% y 100%.|
| **gcp.cloudsql.database.postgresql.tuple_size** <br>(gauge) | Número de tuplas (filas) en la base de datos.|
| **gcp.cloudsql.database.postgresql.tuples_fetched_count** <br>(count) | Número total de filas obtenidas como resultado de consultas por base de datos en la instancia PostgreSQL.|
| **gcp.cloudsql.database.postgresql.tuples_processed_count** <br>(count) | Número de tuplas (filas) procesadas para una base de datos determinada para operaciones como insertar, actualizar o eliminar.|
| **gcp.cloudsql.database.postgresql.tuples_returned_count** <br>(count) | Número total de filas analizadas mientras se procesan consultas por base de datos en la instancia PostgreSQL.|
| **gcp.cloudsql.database.postgresql.vacuum.oldest_transaction_age** <br>(gauge) | Antigüedad de la transacción más antigua aún por vaciar en la instancia Cloud SQL PostgreSQL, medida en número de transacciones que han ocurrido desde la transacción más antigua.|
| **gcp.cloudsql.database.replication.log_archive_failure_count** <br>(count) | Número de intentos fallidos de archivar archivos de logs de replicación.|
| **gcp.cloudsql.database.replication.log_archive_success_count** <br>(count) | Número de intentos exitosos de archivar archivos de logs de replicación.|
| **gcp.cloudsql.database.replication.network_lag** <br>(gauge) | Indica el tiempo transcurrido desde el log binario primario hasta el subproceso de E/S en la réplica.<br>_Se muestra en segundos_ |
| **gcp.cloudsql.database.replication.replica_lag** <br>(gauge) | Número de segundos que la réplica de lectura lleva de retraso con respecto a la primaria.<br>_Se muestra en segundos_ |
| **gcp.cloudsql.database.replication.state** <br>(gauge) | Estado actual de la replicación.|
| **gcp.cloudsql.database.sqlserver.audits_size** <br>(gauge) | Realiza un seguimiento del tamaño en bytes de los archivos de auditoría de SQLServer almacenados en una instancia.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.sqlserver.audits_upload_count** <br>(count) | Cuenta el número total de cargas de archivos de auditoría de SQLServer a un bucket GCS y si la carga se ha realizado correctamente o no.|
| **gcp.cloudsql.database.sqlserver.connections.connection_reset_count** <br>(count) | Número total de conexiones iniciadas desde el grupo de conexiones desde el último reinicio del servicio SQL Server.|
| **gcp.cloudsql.database.sqlserver.connections.login_attempt_count** <br>(count) | Número total de intentos de conexión desde el último reinicio del servicio SQL Server. No incluye las conexiones agrupadas.|
| **gcp.cloudsql.database.sqlserver.connections.logout_count** <br>(count) | Número total de operaciones de desconexión desde el último reinicio del servicio SQL Server.|
| **gcp.cloudsql.database.sqlserver.connections.processes_blocked** <br>(gauge) | Número actual de procesos bloqueados.|
| **gcp.cloudsql.database.sqlserver.data_cache.hit_count** <br>(count) | Número total de operaciones de lectura en la caché de datos para esta instancia.|
| **gcp.cloudsql.database.sqlserver.data_cache.hit_ratio** <br>(gauge) | Ratio de operaciones de lectura exitosas en la caché de datos para esta instancia.|
| **gcp.cloudsql.database.sqlserver.data_cache.miss_count** <br>(count) | Número total de operaciones de lectura fallidas de la caché de datos para esta instancia.|
| **gcp.cloudsql.database.sqlserver.databases** <br>(gauge) | Número actual de bases de datos en la instancia, excluyendo las bases de datos del sistema.|
| **gcp.cloudsql.database.sqlserver.external_sync.primary_to_replica_connection_health** <br>(gauge) | Indica si hay conectividad desde el primario a la réplica para enviar actualizaciones de replicación.|
| **gcp.cloudsql.database.sqlserver.memory.buffer_cache_hit_ratio** <br>(gauge) | Porcentaje actual de páginas encontradas en la caché del buffer sin tener que leer del disco. El ratio es el número total de accesos a la caché dividido por el número total de búsquedas en la caché.<br>_Se muestra como porcentaje_ |
| **gcp.cloudsql.database.sqlserver.memory.checkpoint_page_count** <br>(count) | Número total de páginas vaciadas al disco por un punto de control u otra operación que requiera que todas las páginas sucias se descarguen.|
| **gcp.cloudsql.database.sqlserver.memory.free_list_stall_count** <br>(count) | Número total de solicitudes que han tenido que esperar una página libre.|
| **gcp.cloudsql.database.sqlserver.memory.lazy_write_count** <br>(count) | Número total de buffers escritos por el escritor perezoso del gestor de buffers. El escritor perezoso es un proceso del sistema que descarga lotes de buffers sucios y antiguos (buffers que contienen cambios que deben escribirse de nuevo en el disco antes de que el buffer pueda reutilizarse para una página diferente) y los pone a disposición para procesos de usuario.|
| **gcp.cloudsql.database.sqlserver.memory.memory_grants_pending** <br>(gauge) | Número actual de procesos en espera de una concesión de memoria de espacio de trabajo.|
| **gcp.cloudsql.database.sqlserver.memory.page_life_expectancy** <br>(gauge) | Número actual de segundos que una página permanecerá en el grupo de buffers sin referencias.<br>_Se muestra en segundos_ |
| **gcp.cloudsql.database.sqlserver.memory.page_operation_count** <br>(count) | Número total de lecturas o escrituras físicas de páginas de bases de datos. Esta estadística cuenta las lecturas o escrituras físicas de páginas de todas las bases de datos.|
| **gcp.cloudsql.database.sqlserver.replication.bytes_sent_to_replica_count** <br>(count) | Número total de bytes enviados a la réplica de disponibilidad remota. Antes de la compresión para la réplica asíncrona. Número real de bytes para la réplica de sincronización que no tiene compresión.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.sqlserver.replication.log_apply_pending_queue** <br>(gauge) | Número actual de bloques de logs a la espera de ser aplicados a todas las réplicas de bases de datos.|
| **gcp.cloudsql.database.sqlserver.replication.log_bytes_received_count** <br>(count) | Cantidad total de registros de logs recibidos por la réplica secundaria para todas las bases de datos.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.sqlserver.replication.recovery_queue** <br>(gauge) | Cantidad actual de registros de logs en kilobytes en los archivos de logs de la réplica secundaria que no se han vuelto a hacer.<br>_Se muestra en kilobytes_ |
| **gcp.cloudsql.database.sqlserver.replication.redone_bytes_count** <br>(count) | Cantidad total de registros de logs rehechos en todas las bases de datos secundarias.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.sqlserver.replication.resent_message_count** <br>(count) | Número total de mensajes Always On reenviados. Un mensaje reenviado es un mensaje que se ha intentado enviar sin éxito y es necesario intentar enviarlo de nuevo.|
| **gcp.cloudsql.database.sqlserver.schedulers.active_workers** <br>(gauge) | Número actual de workers activos. Un worker activo nunca es preferente, debe tener una tarea asociada y puede estar en ejecución, ejecutable o suspendido.|
| **gcp.cloudsql.database.sqlserver.schedulers.by_status** <br>(gauge) | Número actual de planificadores que informan de un estado concreto.|
| **gcp.cloudsql.database.sqlserver.schedulers.current_tasks** <br>(gauge) | Número actual de tareas en curso que están asociadas a un planificador. Este recuento incluye las tareas que están esperando a que un worker las ejecute y las tareas que están actualmente en espera o en ejecución (en estado SUSPENDIDO o EJECUTABLE).|
| **gcp.cloudsql.database.sqlserver.schedulers.current_workers** <br>(gauge) | Número actual de workers que están asociados a un planificador. Incluye los workers que no tienen asignada ninguna tarea.|
| **gcp.cloudsql.database.sqlserver.schedulers.pending_disk_io** <br>(gauge) | Número actual de E/S pendientes que están esperando ser completadas. Cada planificador tiene una lista de E/S pendientes que se comprueban para determinar si se han completado cada vez que hay un cambio de contexto. El recuento se incrementa cuando se inserta la solicitud. Este recuento se decrementa cuando se completa la solicitud. Este número no indica el estado de las E/S.|
| **gcp.cloudsql.database.sqlserver.schedulers.runnable_tasks** <br>(gauge) | Número actual de workers, con tareas asignadas, que están a la espera de ser programados en la cola de ejecutables.|
| **gcp.cloudsql.database.sqlserver.schedulers.work_queue** <br>(gauge) | Número actual de tareas en la cola de pendientes. Estas tareas están esperando a que un worker las recoja.|
| **gcp.cloudsql.database.sqlserver.server_principals** <br>(gauge) | Número actual de servidores principales en la instancia.|
| **gcp.cloudsql.database.sqlserver.sql_agent.jobs** <br>(gauge) | Número actual de trabajos de agente de SQL Server en la instancia.|
| **gcp.cloudsql.database.sqlserver.transactions.batch_request_count** <br>(count) | Número total de lotes de comandos Transact-SQL recibidos.|
| **gcp.cloudsql.database.sqlserver.transactions.deadlock_count** <br>(count) | Número total de solicitudes de bloqueo que han dado lugar a un bloqueo mutuo.|
| **gcp.cloudsql.database.sqlserver.transactions.forwarded_record_count** <br>(count) | Número total de registros obtenidos a través de punteros de registros reenviados.|
| **gcp.cloudsql.database.sqlserver.transactions.full_scan_count** <br>(count) | Número total de análisis completos sin restricciones. Pueden ser análisis de tablas básicas o de índices completos.|
| **gcp.cloudsql.database.sqlserver.transactions.lock_wait_count** <br>(count) | Número total de solicitudes de bloqueo que han necesitado una espera por parte del llamante.|
| **gcp.cloudsql.database.sqlserver.transactions.lock_wait_time** <br>(count) | Tiempo total que las solicitudes de bloqueo han esperado bloqueos.<br>_Se muestra en milisegundos_ |
| **gcp.cloudsql.database.sqlserver.transactions.log_bytes_flushed_count** <br>(count) | Número total de bytes de logs descargados.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.sqlserver.transactions.page_split_count** <br>(count) | Número total de divisiones de página que se producen como resultado del desbordamiento de las páginas de índices.|
| **gcp.cloudsql.database.sqlserver.transactions.probe_scan_count** <br>(count) | Número total de análisis de sondeo que se utilizan para encontrar como máximo una única fila cualificada en un índice o tabla básica directamente.|
| **gcp.cloudsql.database.sqlserver.transactions.sql_compilation_count** <br>(count) | Número total de compilaciones SQL.|
| **gcp.cloudsql.database.sqlserver.transactions.sql_recompilation_count** <br>(count) | Número total de recompilaciones SQL.|
| **gcp.cloudsql.database.sqlserver.transactions.transaction_count** <br>(count) | Número total de transacciones iniciadas.|
| **gcp.cloudsql.database.sqlserver.xevents_size** <br>(gauge) | Realiza un seguimiento del tamaño en bytes de los archivos SQLServer XEvents almacenados en una instancia.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.sqlserver.xevents_upload_count** <br>(count) | Cuenta el número total de cargas de archivos SQLServer XEvents a un bucket GCS y si la carga se ha realizado correctamente o no.|
| **gcp.cloudsql.database.swap.bytes_used** <br>(gauge) | Espacio de intercambio utilizado por el contenedor de la base de datos.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.swap.pages_swapped_in_count** <br>(count) | Recuento total de páginas intercambiadas en el disco desde el inicio del sistema.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.swap.pages_swapped_out_count** <br>(count) | Recuento total de páginas intercambiadas fuera del disco desde el inicio del sistema.<br>_Se muestra en bytes_ |
| **gcp.cloudsql.database.up** <br>(gauge) | Indica si el servidor está activo o no.|
| **gcp.cloudsql.database.uptime** <br>(gauge) | Número de segundos que se ha estado ejecutando la instancia.<br>_Se muestra en segundos_ |
| **gcp.cloudsql.per_database.postgresql.external_sync.initial_sync_complete** <br>(indicador) | Fase de migración de cada base de datos en la réplica del servidor externo (ES). Esto solo se aplica a las instancias que se replican desde un servidor externo.|
| **gcp.cloudsql.per_database.postgresql.external_sync.replication_byte_lag** <br>(indicador) | Retraso de replicación en bytes de cada base de datos en la réplica del servidor externo (ES). Esto solo se aplica a las instancias que se replican desde un servidor externo.|

### Eventos

La integración Google Cloud SQL no incluye eventos.

### Checks de servicio

**gcp.cloudsql.database.state**
Estado de servicio actual de la instancia de Cloud SQL.

## Solucionar problemas

¿Necesita ayuda? Póngase en contacto con [Datadog support](https://docs.datadoghq.com/help/).