---
app_id: celerdata
categories:
- recopilación de logs
- almacenes de datos
custom_kind: integración
description: Recopilar métricas y logs de CelerData
integration_version: 1.2.0
media:
- caption: Dashboard CelerData
  image_url: images/celerdata-dashboard.png
  media_type: imagen
- caption: Logs de CelerData
  image_url: images/celerdata-logs.png
  media_type: imagen
supported_os:
- Linux
title: CelerData
---
## Información general

[CelerData](https://celerdata.com/) es la versión empresarial de la base de datos de código abierto OLAP StarRocks. StarRocks/CelerData está diseñada para el análisis de la baja latencia directamente en tu lake house de datos.

Esta integración permite a los usuarios recopilar métricas y logs. Gracias a esta integración, los clientes pueden obtener información sobre el rendimiento de las consultas, el estado del sistema y la utilización de los recursos, lo que les permite obtener una visibilidad de la base de datos.

## Configuración

Sigue las siguientes instrucciones para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/autodiscovery/integrations) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

Para recopilar [métricas] (https://docs.starrocks.io/docs/administration/management/monitoring/metrics/) y logs de StarRocks:

1. Descarga e instala el [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).

1. Instala el check CelerData en tu host con el siguiente comando:

   ```shell
   datadog-agent integration install -t datadog-celerdata==1.2.0
   ```

### Configuración

1. Edita el archivo `celerdata.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para empezar a recopilar métricas y logs. Consulta el ejemplo [celerdata.d/conf.yaml.example](https://github.com/DataDog/integrations-extras/blob/master/celerdata/datadog_checks/celerdata/data/conf.yaml.example) para ver todas las opciones de configuración disponibles.

1. Datadog escucha en el puerto 5000 `dogstatsd_stats_port` y `expvar_port`. En tu archivo `celerdata.conf`, tendrás que cambiar la `server.discovery.listen_address` y la `server.discovery.advertised_address` para utilizar un puerto distinto de 5000.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `celerdata` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **celerdata.fe.connection_total** <br>(gauge) | Número total de conexiones|
| **celerdata.fe.database_num** <br>(gauge) | Contador de bases de datos|
| **celerdata.fe.edit_log_read.count** <br>(count) | Contador de logs de edición leídos de bdbje|
| **celerdata.fe.edit_log_size_bytes.count** <br>(count) | Tamaño de los logs de edición|
| **celerdata.fe.edit_log_write.count** <br>(count) | Contador de logs de edición escritos en bdbje|
| **celerdata.fe.editlog_stacked_num** <br>(gauge) | Contador de logs de edición apilados|
| **celerdata.fe.editlog_write_latency_ms.count** <br>(count) | |
| **celerdata.fe.editlog_write_latency_ms.quantile** <br>(gauge) | |
| **celerdata.fe.editlog_write_latency_ms.sum** <br>(count) | |
| **celerdata.fe.http_connections_num.count** <br>(count) | Número actual de conexiones HTTP establecidas|
| **celerdata.fe.http_handling_requests_num.count** <br>(count) | Número de solicitudes HTTP que se están gestionando actualmente|
| **celerdata.fe.http_request_handle_latency_ms.count** <br>(count) | |
| **celerdata.fe.http_request_handle_latency_ms.quantile** <br>(gauge) | |
| **celerdata.fe.http_request_handle_latency_ms.sum** <br>(count) | |
| **celerdata.fe.http_worker_pending_tasks_num** <br>(gauge) | Número de tareas pendientes de procesamiento en las colas de los workers HTTP|
| **celerdata.fe.http_workers_num** <br>(gauge) | Número de workers HTTP|
| **celerdata.fe.image_push.count** <br>(count) | Contador de imágenes enviadas con éxito a otros frontends|
| **celerdata.fe.image_write.count** <br>(count) | Contador de imágenes generadas|
| **celerdata.fe.job** <br>(gauge) | Estadísticas de trabajos|
| **celerdata.fe.journal.max_journal_id** <br>(gauge) | ID de diario máximo de estos frontends|
| **celerdata.fe.journal.write_batch.count** <br>(count) | |
| **celerdata.fe.journal.write_batch.quantile** <br>(gauge) | |
| **celerdata.fe.journal.write_batch.sum** <br>(count) | |
| **celerdata.fe.journal.write_bytes.count** <br>(count) | |
| **celerdata.fe.journal.write_bytes.quantile** <br>(gauge) | |
| **celerdata.fe.journal.write_bytes.sum** <br>(count) | |
| **celerdata.fe.journal.write_latency_ms.count** <br>(count) | |
| **celerdata.fe.journal.write_latency_ms.quantile** <br>(gauge) | |
| **celerdata.fe.journal.write_latency_ms.sum** <br>(count) | |
| **celerdata.fe.load_add.count** <br>(count) | Número total de envíos de cargas|
| **celerdata.fe.load_finished.count** <br>(count) | Número total de cargas terminadas|
| **celerdata.fe.max_tablet_compaction_score** <br>(gauge) | Puntuación máxima de compactación de tabletas en todos los backends|
| **celerdata.fe.memory** <br>(gauge) | Contador de tabletas|
| **celerdata.fe.meta_log_count** <br>(gauge) | Recuento total de metadatos|
| **celerdata.fe.qps** <br>(gauge) | Consultas ejecutadas por segundo|
| **celerdata.fe.query.err_rate** <br>(gauge) | Tasa de consultas de error|
| **celerdata.fe.query.err.count** <br>(count) | Número total de consultas de error|
| **celerdata.fe.query.latency** <br>(gauge) | Latencia media de las consultas|
| **celerdata.fe.query.latency_ms.count** <br>(count) | |
| **celerdata.fe.query.latency_ms.quantile** <br>(gauge) | |
| **celerdata.fe.query.latency_ms.sum** <br>(count) | |
| **celerdata.fe.query.queue_pending.count** <br>(count) | Número total de consultas pendientes|
| **celerdata.fe.query.queue_timeout.count** <br>(count) | Número total de consultas con tiempo de espera en el historial de colas|
| **celerdata.fe.query.queue.count** <br>(count) | Número total de consultas en cola en el historial|
| **celerdata.fe.query.resource_group.count** <br>(count) | Grupo de recursos para consultas|
| **celerdata.fe.query.resource_group_err.count** <br>(count) | Grupo de recursos para consultas de error|
| **celerdata.fe.query.success.count** <br>(count) | Número total de consultas realizadas con éxito|
| **celerdata.fe.query.timeout.count** <br>(count) | Número total de consultas con tiempo de espera|
| **celerdata.fe.query.count** <br>(count) | Contador de consultas|
| **celerdata.fe.report_queue_size** <br>(gauge) | Tamaño de la cola de informes|
| **celerdata.fe.request.count** <br>(count) | Número total de solicitudes|
| **celerdata.fe.routine_load.error_rows.count** <br>(count) | Número total de filas de error en la carga de rutina|
| **celerdata.fe.routine_load.jobs** <br>(gauge) | Trabajos relacionados con la carga de rutina|
| **celerdata.fe.routine_load.paused.count** <br>(count) | Contador de cargas de rutina en pausa|
| **celerdata.fe.routine_load.receive_bytes.count** <br>(count) | Total de bytes recibidos en la carga de rutina|
| **celerdata.fe.routine_load.rows.count** <br>(count) | Número total de filas en la carga de rutina|
| **celerdata.fe.rps** <br>(gauge) | Solicitudes recibidas por segundo|
| **celerdata.fe.safe_mode** <br>(gauge) | Indicador de modo seguro|
| **celerdata.fe.scheduled_tablet_num** <br>(gauge) | Número de tabletas que se están programando|
| **celerdata.fe.shortcircuit_latency_ms.count** <br>(count) | |
| **celerdata.fe.shortcircuit_latency_ms.quantile** <br>(gauge) | |
| **celerdata.fe.shortcircuit_latency_ms.sum** <br>(count) | |
| **celerdata.fe.shortcircuit_query.count** <br>(count) | Número total de consultas de cortocircuito|
| **celerdata.fe.shortcircuit_rpc.count** <br>(count) | Número total de RPC de cortocircuito|
| **celerdata.fe.slow_query.count** <br>(count) | Número total de consultas lentas|
| **celerdata.fe.snmp** <br>(gauge) | Todos los paquetes TCP retransmitidos|
| **celerdata.fe.starmgr_journal_replay_ops.count** <br>(count) | Número de diarios reproducidos|
| **celerdata.fe.starmgr_journal_write_async_bytes.count** <br>(count) | Cantidad de números escritos en el diario starmgr en modo asíncrono, unidad: byte|
| **celerdata.fe.starmgr_journal_write_async_ops.count** <br>(count) | Contador de iops de escritura asíncrona de registros de diarios starmgr|
| **celerdata.fe.starmgr_journal_write_bytes.count** <br>(count) | Cantidad de números escritos en el diario starmgr, unidad: byte|
| **celerdata.fe.starmgr_journal_write_ops.count** <br>(count) | Contador de iops de escritura de registros de diarios starmgr|
| **celerdata.fe.starmgr_log_update_shards_num.count** <br>(count) | Número total de particiones en logUpdateShard en starmgr|
| **celerdata.fe.starmgr_log_update_shards_ops.count** <br>(count) | Total de operaciones de logUpdateShard en starmgr|
| **celerdata.fe.starmgr_num_shard_groups** <br>(gauge) | Número total de grupos de fragmentos en starmgr|
| **celerdata.fe.starmgr_num_shards** <br>(gauge) | Número total de fragmentos en starmgr|
| **celerdata.fe.starmgr_schedule_shard_ops.count** <br>(count) | Contador de operaciones de añadido/eliminación de fragmentos al/del worker|
| **celerdata.fe.routine_load_max_lag_of_partition** <br>(gauge) | Desfase máximo de partición Kafka para cada trabajo de carga de rutina|
| **celerdata.fe.table_num** <br>(gauge) | Contador de tablas|
| **celerdata.fe.thread_pool** <br>(gauge) | Estadísticas del grupo de subprocesos|
| **celerdata.fe.txn.begin.count** <br>(count) | Contador de transacciones iniciadas|
| **celerdata.fe.txn.failed.count** <br>(count) | Contador de transacciones fallidas|
| **celerdata.fe.txn.reject.count** <br>(count) | Contador de transacciones rechazadas|
| **celerdata.fe.txn.stream_load_begin_latency_ms.count** <br>(count) | |
| **celerdata.fe.txn.stream_load_begin_latency_ms.quantile** <br>(gauge) | |
| **celerdata.fe.txn.stream_load_begin_latency_ms.sum** <br>(count) | |
| **celerdata.fe.txn.stream_load_begin_num.count** <br>(count) | Número de operaciones de inicio en la carga de flujos de transacciones que se están gestionando actualmente|
| **celerdata.fe.txn.stream_load_commit_latency_ms.count** <br>(count) | |
| **celerdata.fe.txn.stream_load_commit_latency_ms.quantile** <br>(gauge) | |
| **celerdata.fe.txn.stream_load_commit_latency_ms.sum** <br>(count) | |
| **celerdata.fe.txn.stream_load_commit_num.count** <br>(count) | Número de operaciones de confirmación en la carga de flujos de transacciones que se están gestionando actualmente|
| **celerdata.fe.txn.stream_load_load_latency_ms.count** <br>(count) | |
| **celerdata.fe.txn.stream_load_load_latency_ms.quantile** <br>(gauge) | |
| **celerdata.fe.txn.stream_load_load_latency_ms.sum** <br>(count) | |
| **celerdata.fe.txn.stream_load_load_num.count** <br>(count) | Número de operaciones de carga en el flujo de transacciones que se están gestionando actualmente|
| **celerdata.fe.txn.stream_load_prepare_latency_ms.count** <br>(count) | |
| **celerdata.fe.txn.stream_load_prepare_latency_ms.quantile** <br>(gauge) | |
| **celerdata.fe.txn.stream_load_prepare_latency_ms.sum** <br>(count) | |
| **celerdata.fe.txn.stream_load_prepare_num.count** <br>(count) | Número de operaciones de preparación en la carga de flujos de transacciones que se están gestionando actualmente|
| **celerdata.fe.txn.stream_load_rollback_latency_ms.count** <br>(count) | |
| **celerdata.fe.txn.stream_load_rollback_latency_ms.quantile** <br>(gauge) | |
| **celerdata.fe.txn.stream_load_rollback_latency_ms.sum** <br>(count) | |
| **celerdata.fe.txn.stream_load_rollback_num.count** <br>(count) | Número de operaciones de reversión en la carga de flujos de transacciones que se están gestionando actualmente|
| **celerdata.fe.txn.success.count** <br>(count) | Contador de transacciones realizadas con éxito|
| **celerdata.fe.unfinished_backup_job.count** <br>(count) | Número actual de tareas de copia de seguridad no finalizadas|
| **celerdata.fe.unfinished_restore_job.count** <br>(count) | Número actual de tareas de restauración no finalizadas|
| **celerdata.be.active_scan_context_count** <br>(gauge) | |
| **celerdata.be.async_delta_writer_execute_time_ns_total** <br>(gauge) | |
| **celerdata.be.async_delta_writer_execute.count** <br>(count) | |
| **celerdata.be.async_delta_writer_executed_tasks_total** <br>(gauge) | |
| **celerdata.be.async_delta_writer_pending_time_ns_total** <br>(gauge) | |
| **celerdata.be.async_delta_writer_queue_count** <br>(gauge) | |
| **celerdata.be.async_delta_writer_task_execute_duration_us.count** <br>(count) | |
| **celerdata.be.async_delta_writer_task_pending_duration_us.count** <br>(count) | |
| **celerdata.be.async_delta_writer_task.count** <br>(count) | |
| **celerdata.be.async_delta_writer_threadpool_size** <br>(gauge) | |
| **celerdata.be.base_compaction_task_byte_per_second** <br>(gauge) | |
| **celerdata.be.base_compaction_task_cost_time_ms** <br>(gauge) | |
| **celerdata.be.binary_column_pool_bytes** <br>(gauge) | |
| **celerdata.be.bitmap_index_mem_bytes** <br>(gauge) | |
| **celerdata.be.blocks_created.count** <br>(count) | |
| **celerdata.be.blocks_deleted.count** <br>(count) | |
| **celerdata.be.blocks_open_reading** <br>(gauge) | |
| **celerdata.be.blocks_open_writing** <br>(gauge) | |
| **celerdata.be.bloom_filter_index_mem_bytes** <br>(gauge) | |
| **celerdata.be.broker_count** <br>(gauge) | |
| **celerdata.be.brpc_endpoint_stub_count** <br>(gauge) | |
| **celerdata.be.bthread.count** <br>(gauge) | |
| **celerdata.be.bthread.key_count** <br>(gauge) | |
| **celerdata.be.bthread.keytable_count** <br>(gauge) | |
| **celerdata.be.bthread.keytable_memory** <br>(gauge) | |
| **celerdata.be.bthread.signal_second** <br>(gauge) | |
| **celerdata.be.bthread.stack_count** <br>(gauge) | |
| **celerdata.be.bthread.switch_second** <br>(gauge) | |
| **celerdata.be.bthread.timer_scheduled_second** <br>(gauge) | |
| **celerdata.be.bthread.timer_triggered_second** <br>(gauge) | |
| **celerdata.be.bthread.timer_usage** <br>(gauge) | |
| **celerdata.be.bthread.worker_count** <br>(gauge) | |
| **celerdata.be.bthread.worker_usage** <br>(gauge) | |
| **celerdata.be.bvar_dump_interval** <br>(gauge) | |
| **celerdata.be.bvar_sampler_collector_usage** <br>(gauge) | |
| **celerdata.be.bytes_read.count** <br>(count) | |
| **celerdata.be.bytes_written.count** <br>(count) | |
| **celerdata.be.central_column_pool_bytes** <br>(gauge) | |
| **celerdata.be.chunk_allocator_mem_bytes** <br>(gauge) | |
| **celerdata.be.chunk_pool_local_core_alloc_count** <br>(count) | |
| **celerdata.be.chunk_pool_other_core_alloc_count** <br>(count) | |
| **celerdata.be.chunk_pool_system_alloc_cost_ns.count** <br>(count) | |
| **celerdata.be.chunk_pool_system_alloc_count** <br>(count) | |
| **celerdata.be.chunk_pool_system_free_cost_ns.count** <br>(count) | |
| **celerdata.be.chunk_pool_system_free_count** <br>(count) | |
| **celerdata.be.clone_mem_bytes** <br>(gauge) | |
| **celerdata.be.cloud_cache.buffer_item_bytes** <br>(gauge) | |
| **celerdata.be.cloud_cache.buffer_item_count** <br>(gauge) | |
| **celerdata.be.cloud_cache.current_reading_count** <br>(gauge) | |
| **celerdata.be.cloud_cache.current_removing_count** <br>(gauge) | |
| **celerdata.be.cloud_cache.current_writing_count** <br>(gauge) | |
| **celerdata.be.cloud_cache.hit_bytes** <br>(gauge) | |
| **celerdata.be.cloud_cache.hit_bytes_last_minite** <br>(gauge) | |
| **celerdata.be.cloud_cache.hit_count** <br>(gauge) | |
| **celerdata.be.cloud_cache.hit_count_last_minite** <br>(gauge) | |
| **celerdata.be.cloud_cache.meta_used_bytes** <br>(gauge) | |
| **celerdata.be.cloud_cache.miss_bytes** <br>(gauge) | |
| **celerdata.be.cloud_cache.miss_bytes_last_minite** <br>(gauge) | |
| **celerdata.be.cloud_cache.miss_count** <br>(gauge) | |
| **celerdata.be.cloud_cache.miss_count_last_minite** <br>(gauge) | |
| **celerdata.be.cloud_cache.object_item_bytes** <br>(gauge) | |
| **celerdata.be.cloud_cache.object_item_count** <br>(gauge) | |
| **celerdata.be.cloud_cache.prior_0_item_bytes** <br>(gauge) | |
| **celerdata.be.cloud_cache.prior_0_item_counts** <br>(gauge) | |
| **celerdata.be.cloud_cache.prior_1_item_bytes** <br>(gauge) | |
| **celerdata.be.cloud_cache.prior_1_item_counts** <br>(gauge) | |
| **celerdata.be.cloud_cache.read_disk_bytes** <br>(gauge) | |
| **celerdata.be.cloud_cache.read_mem_bytes** <br>(gauge) | |
| **celerdata.be.cloud_cache.remove_bytes** <br>(gauge) | |
| **celerdata.be.cloud_cache.remove_fail_count** <br>(gauge) | |
| **celerdata.be.cloud_cache.remove_success_count** <br>(gauge) | |
| **celerdata.be.cloud_cache.write_bytes** <br>(gauge) | |
| **celerdata.be.cloud_cache.write_fail_count** <br>(gauge) | |
| **celerdata.be.cloud_cache.write_success_count** <br>(gauge) | |
| **celerdata.be.column_metadata_mem_bytes** <br>(gauge) | |
| **celerdata.be.column_partial_update_apply_duration_us.count** <br>(count) | |
| **celerdata.be.column_partial_update_apply.count** <br>(count) | |
| **celerdata.be.column_pool_mem_bytes** <br>(gauge) | |
| **celerdata.be.column_zonemap_index_mem_bytes** <br>(gauge) | |
| **celerdata.be.compaction_bytes.count** <br>(count) | |
| **celerdata.be.compaction_deltas.count** <br>(count) | |
| **celerdata.be.compaction_mem_bytes** <br>(gauge) | |
| **celerdata.be.consistency_mem_bytes** <br>(gauge) | |
| **celerdata.be.cpu.count** <br>(count) | |
| **celerdata.be.cumulative_compaction_task_byte_per_second** <br>(gauge) | |
| **celerdata.be.cumulative_compaction_task_cost_time_ms** <br>(gauge) | |
| **celerdata.be.data_stream_receiver_count** <br>(gauge) | |
| **celerdata.be.datacache_mem_bytes** <br>(gauge) | |
| **celerdata.be.date_column_pool_bytes** <br>(gauge) | |
| **celerdata.be.datetime_column_pool_bytes** <br>(gauge) | |
| **celerdata.be.decimal_column_pool_bytes** <br>(gauge) | |
| **celerdata.be.delta_column_group_get_hit_cache.count** <br>(count) | |
| **celerdata.be.delta_column_group_get_non_pk_hit_cache.count** <br>(count) | |
| **celerdata.be.delta_column_group_get_non_pk.count** <br>(count) | |
| **celerdata.be.delta_column_group_get.count** <br>(count) | |
| **celerdata.be.delta_writer_wait_flush_duration_us.count** <br>(count) | |
| **celerdata.be.delta_writer_wait_replica_duration_us.count** <br>(count) | |
| **celerdata.be.disk_bytes_read.count** <br>(count) | |
| **celerdata.be.disk_bytes_written.count** <br>(count) | |
| **celerdata.be.disk_io_time_ms.count** <br>(count) | |
| **celerdata.be.disk_io_time_weigthed.count** <br>(count) | |
| **celerdata.be.disk_read_time_ms.count** <br>(count) | |
| **celerdata.be.disk_reads_completed.count** <br>(count) | |
| **celerdata.be.disk_sync.count** <br>(count) | |
| **celerdata.be.disk_write_time_ms.count** <br>(count) | |
| **celerdata.be.disk_writes_completed.count** <br>(count) | |
| **celerdata.be.disks_avail_capacity** <br>(gauge) | |
| **celerdata.be.disks_data_used_capacity** <br>(gauge) | |
| **celerdata.be.disks_state** <br>(gauge) | |
| **celerdata.be.disks_total_capacity** <br>(gauge) | |
| **celerdata.be.dla_cache_buffer_item_bytes** <br>(gauge) | |
| **celerdata.be.dla_cache_buffer_item_count** <br>(gauge) | |
| **celerdata.be.dla_cache_current_reading_count** <br>(gauge) | |
| **celerdata.be.dla_cache_current_removing_count** <br>(gauge) | |
| **celerdata.be.dla_cache_current_writing_count** <br>(gauge) | |
| **celerdata.be.dla_cache_hit_bytes** <br>(gauge) | |
| **celerdata.be.dla_cache_hit_bytes_last_minite** <br>(gauge) | |
| **celerdata.be.dla_cache_hit_count** <br>(gauge) | |
| **celerdata.be.dla_cache_hit_count_last_minite** <br>(gauge) | |
| **celerdata.be.dla_cache_meta_used_bytes** <br>(gauge) | |
| **celerdata.be.dla_cache_miss_bytes** <br>(gauge) | |
| **celerdata.be.dla_cache_miss_bytes_last_minite** <br>(gauge) | |
| **celerdata.be.dla_cache_miss_count** <br>(gauge) | |
| **celerdata.be.dla_cache_miss_count_last_minite** <br>(gauge) | |
| **celerdata.be.dla_cache_object_item_bytes** <br>(gauge) | |
| **celerdata.be.dla_cache_object_item_count** <br>(gauge) | |
| **celerdata.be.dla_cache_prior_0_item_bytes** <br>(gauge) | |
| **celerdata.be.dla_cache_prior_0_item_counts** <br>(gauge) | |
| **celerdata.be.dla_cache_prior_1_item_bytes** <br>(gauge) | |
| **celerdata.be.dla_cache_prior_1_item_counts** <br>(gauge) | |
| **celerdata.be.dla_cache_read_disk_bytes** <br>(gauge) | |
| **celerdata.be.dla_cache_read_mem_bytes** <br>(gauge) | |
| **celerdata.be.dla_cache_remove_bytes** <br>(gauge) | |
| **celerdata.be.dla_cache_remove_fail_count** <br>(gauge) | |
| **celerdata.be.dla_cache_remove_success_count** <br>(gauge) | |
| **celerdata.be.dla_cache_write_bytes** <br>(gauge) | |
| **celerdata.be.dla_cache_write_fail_count** <br>(gauge) | |
| **celerdata.be.dla_cache_write_success_count** <br>(gauge) | |
| **celerdata.be.double_column_pool_bytes** <br>(gauge) | |
| **celerdata.be.engine_requests.count** <br>(count) | |
| **celerdata.be.fd_num_limit** <br>(gauge) | |
| **celerdata.be.fd_num_used** <br>(gauge) | |
| **celerdata.be.float_column_pool_bytes** <br>(gauge) | |
| **celerdata.be.fragment_endpoint_count** <br>(gauge) | |
| **celerdata.be.fragment_request_duration_us.count** <br>(count) | |
| **celerdata.be.fragment_requests.count** <br>(count) | |
| **celerdata.be.fslib.async_cache_files.count** <br>(count) | Contador de archivos almacenados en caché de forma asíncrona|
| **celerdata.be.fslib.cache_async_tasks.count** <br>(count) | Contador de tareas asíncronas programadas|
| **celerdata.be.fslib.cache_full_evictions.count** <br>(count) | Contador de archivos eliminados por falta de espacio en la caché|
| **celerdata.be.fslib.cache_threadpool_size** <br>(gauge) | Contador de procesos de grupos de procesos CacheManager|
| **celerdata.be.fslib.close_io_latency.bucket.count** <br>(count) | Bucket de latencia de E/S cercana, unidad: microsegundos|
| **celerdata.be.fslib.close_io_latency.count** <br>(count) | Contador de la latencia de E/S cercana, unidad: microsegundos|
| **celerdata.be.fslib.close_io_latency.sum** <br>(count) | Suma de la latencia de E/S cercana, unidad: microsegundos|
| **celerdata.be.fslib.delete_dir_io_latency.bucket.count** <br>(count) | Bucket de eliminación de la latencia de E/S dir., unidad: microsegundos|
| **celerdata.be.fslib.delete_dir_io_latency.count** <br>(count) | Contador de la eliminación de la latencia de E/S dir., unidad: microsegundos|
| **celerdata.be.fslib.delete_dir_io_latency.sum** <br>(count) | Suma de la eliminación de la latencia de E/S dir., unidad: microsegundos|
| **celerdata.be.fslib.delete_file_io_latency.bucket.count** <br>(count) | Bucket de eliminación de la latencia de E/S, unidad: microsegundos|
| **celerdata.be.fslib.delete_file_io_latency.count** <br>(count) | Contador de la eliminación de la latencia de E/S de archivos, unidad: microsegundos|
| **celerdata.be.fslib.delete_file_io_latency.sum** <br>(count) | Suma de la eliminación de la latencia de E/S de archivos, unidad: microsegundos|
| **celerdata.be.fslib.delete_files_io_latency.bucket.count** <br>(count) | Bucket de eliminación de la latencia de E/S de archivos, unidad: microsegundos|
| **celerdata.be.fslib.delete_files_io_latency.count** <br>(count) | Contador de la eliminación de E/S de archivos, unidad: microsegundos|
| **celerdata.be.fslib.delete_files_io_latency.sum** <br>(count) | Suma de la eliminación de E/S de archivos, unidad: microsegundos|
| **celerdata.be.fslib.entry_exists.count** <br>(count) | Contador de llamadas a existencias del sistema de archivos|
| **celerdata.be.fslib.entry_stat.count** <br>(count) | Contador de llamadas a estadísticas del sistema de archivos|
| **celerdata.be.fslib.fs_create_files.count** <br>(count) | Contador de archivos creados por el sistema de archivos determinado|
| **celerdata.be.fslib.fs_delete_files.count** <br>(count) | Contador del número de archivos borrados por un sistema de archivos determinado|
| **celerdata.be.fslib.fs_instance_count** <br>(gauge) | Contador de instancias del sistema de archivos aún activas|
| **celerdata.be.fslib.fs_open_files.count** <br>(count) | Contador de archivos abiertos por el sistema de ficheros determinado|
| **celerdata.be.fslib.list_dir.count** <br>(count) | Contador de llamadas a la lista de directorios del sistema de archivos|
| **celerdata.be.fslib.list_latency.bucket.count** <br>(count) | Latencia del bucket de listas, unidad: microsegundos|
| **celerdata.be.fslib.list_latency.count** <br>(count) | Contador de la latencia de listas, unidad: microsegundos|
| **celerdata.be.fslib.list_latency.sum** <br>(count) | Suma de la latencia de listas, unidad: microsegundos|
| **celerdata.be.fslib.open_cache_hits.count** <br>(count) | Contador de aciertos del archivo de caché al abrir un archivo para lectura|
| **celerdata.be.fslib.open_cache_misses.count** <br>(count) | Contador de errores del archivo de caché al abrir un archivo para lectura|
| **celerdata.be.fslib.qps_limit_error.count** <br>(count) | Contador de errores del sistema de archivos con límite QPS excedido|
| **celerdata.be.fslib.read_io_latency.bucket.count** <br>(count) | Bucket de latencia de E/S de lectura, unidad: microsegundos|
| **celerdata.be.fslib.read_io_latency.count** <br>(count) | Contador de la latencia de E/S de lectura, unidad: microsegundos|
| **celerdata.be.fslib.read_io_latency.sum** <br>(count) | Suma de la latencia de E/S de lectura, unidad: microsegundos|
| **celerdata.be.fslib.read_io_size.bucket.count** <br>(count) | Bucket del tamaño de E/S de lectura, unidad: bytes|
| **celerdata.be.fslib.read_io_size.count** <br>(count) | Contador del tamaño de E/S de lectura, unidad: bytes|
| **celerdata.be.fslib.read_io_size.sum** <br>(count) | Suma del tamaño de E/S de lectura, unidad: bytes|
| **celerdata.be.fslib.s3.complete_multi_upload_latency.bucket.count** <br>(count) | Bucket de latencia total de carga de varios objetos S3, unidad: microsegundos|
| **celerdata.be.fslib.s3.complete_multi_upload_latency.count** <br>(count) | Contador de la latencia total de carga de varios objetos S3, unidad: microsegundos|
| **celerdata.be.fslib.s3.complete_multi_upload_latency.sum** <br>(count) | Suma de la latencia total de carga de varios objetos S3, unidad: microsegundos|
| **celerdata.be.fslib.s3.multi_upload_latency.bucket.count** <br>(count) | Latencia de carga de varios objetos S3, unidad: microsegundos|
| **celerdata.be.fslib.s3.multi_upload_latency.count** <br>(count) | Contador de la latencia de carga de varios objetos S3, unidad: microsegundos|
| **celerdata.be.fslib.s3.multi_upload_latency.sum** <br>(count) | Suma de la latencia de carga de varios objetos S3, unidad: microsegundos|
| **celerdata.be.fslib.s3.multi_upload_size.bucket.count** <br>(count) | Bucket del tamaño de carga de varios objetos S3, unidad: bytes|
| **celerdata.be.fslib.s3.multi_upload_size.count** <br>(count) | Contador del tamaño de carga de varios objetos S3, unidad: bytes|
| **celerdata.be.fslib.s3.multi_upload_size.sum** <br>(count) | Suma del tamaño de carga de varios objetos S3, unidad: bytes|
| **celerdata.be.fslib.s3.single_upload_latency.bucket.count** <br>(count) | Bucket de la latencia de carga de varios objetos S3, unidad: microsegundos|
| **celerdata.be.fslib.s3.single_upload_latency.count** <br>(count) | Contador de la latencia de carga de varios objetos S3, unidad: microsegundos|
| **celerdata.be.fslib.s3.single_upload_latency.sum** <br>(count) | Suma de la latencia de carga de varios objetos S3, unidad: microsegundos|
| **celerdata.be.fslib.s3.single_upload_size.bucket.count** <br>(count) | Bucket del tamaño de carga de varios objetos S3, unidad: bytes|
| **celerdata.be.fslib.s3.single_upload_size.count** <br>(count) | Contador del tamaño de carga de varios objetos S3, unidad: bytes|
| **celerdata.be.fslib.s3.single_upload_size.sum** <br>(count) | Suma del tamaño de carga de varios objetos S3, unidad: bytes|
| **celerdata.be.fslib.star_cache_disk_size** <br>(gauge) | Bytes de disco ocupados por la caché estrella, unidad: B|
| **celerdata.be.fslib.star_cache_memory_size** <br>(gauge) | Bytes de memoria ocupados por la caché estrella, unidad: B|
| **celerdata.be.fslib.star_cache_meta_memory_size** <br>(gauge) | Bytes de memoria ocupados por la meta de la caché estrella, unidad: B|
| **celerdata.be.fslib.stat_io_latency.bucket.count** <br>(count) | Bucket de latencia de E/S de estadísticas, unidad: microsegundos|
| **celerdata.be.fslib.stat_io_latency.count** <br>(count) | Contador de la latencia de E/S de estadísticas, unidad: microsegundos|
| **celerdata.be.fslib.stat_io_latency.sum** <br>(count) | Suma de la latencia de E/S de estadísticas, unidad: microsegundos|
| **celerdata.be.fslib.write_io_latency.bucket.count** <br>(count) | Bucket de latencia de E/S de escritura, unidad: microsegundos|
| **celerdata.be.fslib.write_io_latency.count** <br>(count) | Contador de la latencia de E/S de escritura, unidad: microsegundos|
| **celerdata.be.fslib.write_io_latency.sum** <br>(count) | Suma de la latencia de E/S de escritura, unidad: microsegundos|
| **celerdata.be.fslib.write_io_size.bucket.count** <br>(count) | Bucket del tamaño de E/S de escritura, unidad: bytes|
| **celerdata.be.fslib.write_io_size.count** <br>(count) | Contador del tamaño de E/S de escritura, unidad: bytes|
| **celerdata.be.fslib.write_io_size.sum** <br>(count) | Suma del tamaño de E/S de escritura, unidad: bytes|
| **celerdata.be.http_request_send_bytes.count** <br>(count) | |
| **celerdata.be.http_requests.count** <br>(count) | |
| **celerdata.be.int128_column_pool_bytes** <br>(gauge) | |
| **celerdata.be.int16_column_pool_bytes** <br>(gauge) | |
| **celerdata.be.int32_column_pool_bytes** <br>(gauge) | |
| **celerdata.be.int64_column_pool_bytes** <br>(gauge) | |
| **celerdata.be.int8_column_pool_bytes** <br>(gauge) | |
| **celerdata.be.iobuf_block_count** <br>(gauge) | |
| **celerdata.be.iobuf_block_count_hit_tls_threshold** <br>(gauge) | |
| **celerdata.be.iobuf_block_memory** <br>(gauge) | |
| **celerdata.be.iobuf_newbigview_second** <br>(gauge) | |
| **celerdata.be.jemalloc_active_bytes** <br>(gauge) | |
| **celerdata.be.jemalloc_allocated_bytes** <br>(gauge) | |
| **celerdata.be.jemalloc_mapped_bytes** <br>(gauge) | |
| **celerdata.be.jemalloc_metadata_bytes** <br>(gauge) | |
| **celerdata.be.jemalloc_metadata_thp** <br>(gauge) | |
| **celerdata.be.jemalloc_resident_bytes** <br>(gauge) | |
| **celerdata.be.jemalloc_retained_bytes** <br>(gauge) | |
| **celerdata.be.jit_cache_mem_bytes** <br>(gauge) | |
| **celerdata.be.lake.del_txn_log_count** <br>(gauge) | |
| **celerdata.be.lake.del_txn_log_latency** <br>(gauge) | |
| **celerdata.be.lake.del_txn_log_latency_80** <br>(gauge) | |
| **celerdata.be.lake.del_txn_log_latency_90** <br>(gauge) | |
| **celerdata.be.lake.del_txn_log_latency_99** <br>(gauge) | |
| **celerdata.be.lake.del_txn_log_latency_999** <br>(gauge) | |
| **celerdata.be.lake.del_txn_log_latency_9999** <br>(gauge) | |
| **celerdata.be.lake.del_txn_log_max_latency** <br>(gauge) | |
| **celerdata.be.lake.del_txn_log_qps** <br>(gauge) | |
| **celerdata.be.lake.delvec_cache_hit_minute** <br>(gauge) | |
| **celerdata.be.lake.delvec_cache_miss_minute** <br>(gauge) | |
| **celerdata.be.lake.get_tablet_metadata_count** <br>(gauge) | |
| **celerdata.be.lake.get_tablet_metadata_latency** <br>(gauge) | |
| **celerdata.be.lake.get_tablet_metadata_latency_80** <br>(gauge) | |
| **celerdata.be.lake.get_tablet_metadata_latency_90** <br>(gauge) | |
| **celerdata.be.lake.get_tablet_metadata_latency_99** <br>(gauge) | |
| **celerdata.be.lake.get_tablet_metadata_latency_999** <br>(gauge) | |
| **celerdata.be.lake.get_tablet_metadata_latency_9999** <br>(gauge) | |
| **celerdata.be.lake.get_tablet_metadata_max_latency** <br>(gauge) | |
| **celerdata.be.lake.get_tablet_metadata_qps** <br>(gauge) | |
| **celerdata.be.lake.get_txn_log_count** <br>(gauge) | |
| **celerdata.be.lake.get_txn_log_latency** <br>(gauge) | |
| **celerdata.be.lake.get_txn_log_latency_80** <br>(gauge) | |
| **celerdata.be.lake.get_txn_log_latency_90** <br>(gauge) | |
| **celerdata.be.lake.get_txn_log_latency_99** <br>(gauge) | |
| **celerdata.be.lake.get_txn_log_latency_999** <br>(gauge) | |
| **celerdata.be.lake.get_txn_log_latency_9999** <br>(gauge) | |
| **celerdata.be.lake.get_txn_log_max_latency** <br>(gauge) | |
| **celerdata.be.lake.get_txn_log_qps** <br>(gauge) | |
| **celerdata.be.lake.load_pk_index_count** <br>(gauge) | |
| **celerdata.be.lake.load_pk_index_latency** <br>(gauge) | |
| **celerdata.be.lake.load_pk_index_latency_80** <br>(gauge) | |
| **celerdata.be.lake.load_pk_index_latency_90** <br>(gauge) | |
| **celerdata.be.lake.load_pk_index_latency_99** <br>(gauge) | |
| **celerdata.be.lake.load_pk_index_latency_999** <br>(gauge) | |
| **celerdata.be.lake.load_pk_index_latency_9999** <br>(gauge) | |
| **celerdata.be.lake.load_pk_index_max_latency** <br>(gauge) | |
| **celerdata.be.lake.load_pk_index_qps** <br>(gauge) | |
| **celerdata.be.lake.metacache_capacity** <br>(gauge) | |
| **celerdata.be.lake.metacache_usage** <br>(gauge) | |
| **celerdata.be.lake.metadata_cache_hit_minute** <br>(gauge) | |
| **celerdata.be.lake.metadata_cache_miss_minute** <br>(gauge) | |
| **celerdata.be.lake.publish_tablet_version_count** <br>(gauge) | |
| **celerdata.be.lake.publish_tablet_version_latency** <br>(gauge) | |
| **celerdata.be.lake.publish_tablet_version_latency_80** <br>(gauge) | |
| **celerdata.be.lake.publish_tablet_version_latency_90** <br>(gauge) | |
| **celerdata.be.lake.publish_tablet_version_latency_99** <br>(gauge) | |
| **celerdata.be.lake.publish_tablet_version_latency_999** <br>(gauge) | |
| **celerdata.be.lake.publish_tablet_version_latency_9999** <br>(gauge) | |
| **celerdata.be.lake.publish_tablet_version_max_latency** <br>(gauge) | |
| **celerdata.be.lake.publish_tablet_version_qps** <br>(gauge) | |
| **celerdata.be.lake.publish_tablet_version_queuing_count** <br>(gauge) | |
| **celerdata.be.lake.publish_tablet_version_queuing_latency** <br>(gauge) | |
| **celerdata.be.lake.publish_tablet_version_queuing_latency_80** <br>(gauge) | |
| **celerdata.be.lake.publish_tablet_version_queuing_latency_90** <br>(gauge) | |
| **celerdata.be.lake.publish_tablet_version_queuing_latency_99** <br>(gauge) | |
| **celerdata.be.lake.publish_tablet_version_queuing_latency_999** <br>(gauge) | |
| **celerdata.be.lake.publish_tablet_version_queuing_latency_9999** <br>(gauge) | |
| **celerdata.be.lake.publish_tablet_version_queuing_max_latency** <br>(gauge) | |
| **celerdata.be.lake.publish_tablet_version_queuing_qps** <br>(gauge) | |
| **celerdata.be.lake.publish_version_active_tasks** <br>(gauge) | |
| **celerdata.be.lake.publish_version_failed_tasks** <br>(gauge) | |
| **celerdata.be.lake.publish_version_queued_tasks** <br>(gauge) | |
| **celerdata.be.lake.put_tablet_metadata_count** <br>(gauge) | |
| **celerdata.be.lake.put_tablet_metadata_latency** <br>(gauge) | |
| **celerdata.be.lake.put_tablet_metadata_latency_80** <br>(gauge) | |
| **celerdata.be.lake.put_tablet_metadata_latency_90** <br>(gauge) | |
| **celerdata.be.lake.put_tablet_metadata_latency_99** <br>(gauge) | |
| **celerdata.be.lake.put_tablet_metadata_latency_999** <br>(gauge) | |
| **celerdata.be.lake.put_tablet_metadata_latency_9999** <br>(gauge) | |
| **celerdata.be.lake.put_tablet_metadata_max_latency** <br>(gauge) | |
| **celerdata.be.lake.put_tablet_metadata_qps** <br>(gauge) | |
| **celerdata.be.lake.put_txn_log_count** <br>(gauge) | |
| **celerdata.be.lake.put_txn_log_latency** <br>(gauge) | |
| **celerdata.be.lake.put_txn_log_latency_80** <br>(gauge) | |
| **celerdata.be.lake.put_txn_log_latency_90** <br>(gauge) | |
| **celerdata.be.lake.put_txn_log_latency_99** <br>(gauge) | |
| **celerdata.be.lake.put_txn_log_latency_999** <br>(gauge) | |
| **celerdata.be.lake.put_txn_log_latency_9999** <br>(gauge) | |
| **celerdata.be.lake.put_txn_log_max_latency** <br>(gauge) | |
| **celerdata.be.lake.put_txn_log_qps** <br>(gauge) | |
| **celerdata.be.lake.schema_cache_hit_minute** <br>(gauge) | |
| **celerdata.be.lake.schema_cache_miss_minute** <br>(gauge) | |
| **celerdata.be.lake.segment_cache_hit_minute** <br>(gauge) | |
| **celerdata.be.lake.segment_cache_miss_minute** <br>(gauge) | |
| **celerdata.be.lake.txn_log_cache_hit_minute** <br>(gauge) | |
| **celerdata.be.lake.txn_log_cache_miss_minute** <br>(gauge) | |
| **celerdata.be.lake.vacuum.active_delete_file_tasks** <br>(gauge) | |
| **celerdata.be.lake.vacuum.active_tasks** <br>(gauge) | |
| **celerdata.be.lake.vacuum.del_file_count** <br>(gauge) | |
| **celerdata.be.lake.vacuum.del_file_fails** <br>(gauge) | |
| **celerdata.be.lake.vacuum.del_file_latency** <br>(gauge) | |
| **celerdata.be.lake.vacuum.del_file_latency_80** <br>(gauge) | |
| **celerdata.be.lake.vacuum.del_file_latency_90** <br>(gauge) | |
| **celerdata.be.lake.vacuum.del_file_latency_99** <br>(gauge) | |
| **celerdata.be.lake.vacuum.del_file_latency_999** <br>(gauge) | |
| **celerdata.be.lake.vacuum.del_file_latency_9999** <br>(gauge) | |
| **celerdata.be.lake.vacuum.del_file_max_latency** <br>(gauge) | |
| **celerdata.be.lake.vacuum.del_file_qps** <br>(gauge) | |
| **celerdata.be.lake.vacuum.delete_txnlog_count** <br>(gauge) | |
| **celerdata.be.lake.vacuum.delete_txnlog_latency** <br>(gauge) | |
| **celerdata.be.lake.vacuum.delete_txnlog_latency_80** <br>(gauge) | |
| **celerdata.be.lake.vacuum.delete_txnlog_latency_90** <br>(gauge) | |
| **celerdata.be.lake.vacuum.delete_txnlog_latency_99** <br>(gauge) | |
| **celerdata.be.lake.vacuum.delete_txnlog_latency_999** <br>(gauge) | |
| **celerdata.be.lake.vacuum.delete_txnlog_latency_9999** <br>(gauge) | |
| **celerdata.be.lake.vacuum.delete_txnlog_max_latency** <br>(gauge) | |
| **celerdata.be.lake.vacuum.delete_txnlog_qps** <br>(gauge) | |
| **celerdata.be.lake.vacuum.deleted_files** <br>(gauge) | |
| **celerdata.be.lake.vacuum.metadata_travel_count** <br>(gauge) | |
| **celerdata.be.lake.vacuum.metadata_travel_latency** <br>(gauge) | |
| **celerdata.be.lake.vacuum.metadata_travel_latency_80** <br>(gauge) | |
| **celerdata.be.lake.vacuum.metadata_travel_latency_90** <br>(gauge) | |
| **celerdata.be.lake.vacuum.metadata_travel_latency_99** <br>(gauge) | |
| **celerdata.be.lake.vacuum.metadata_travel_latency_999** <br>(gauge) | |
| **celerdata.be.lake.vacuum.metadata_travel_latency_9999** <br>(gauge) | |
| **celerdata.be.lake.vacuum.metadata_travel_max_latency** <br>(gauge) | |
| **celerdata.be.lake.vacuum.metadata_travel_qps** <br>(gauge) | |
| **celerdata.be.lake.vacuum.queued_delete_file_tasks** <br>(gauge) | |
| **celerdata.be.lake.vacuum.queued_tasks** <br>(gauge) | |
| **celerdata.be.load_bytes.count** <br>(count) | |
| **celerdata.be.load_channel_add_chunks_duration_us.count** <br>(count) | |
| **celerdata.be.load_channel_add_chunks.count** <br>(count) | |
| **celerdata.be.load_channel_add_chunks_wait_memtable_duration_us.count** <br>(count) | |
| **celerdata.be.load_channel_add_chunks_wait_replica_duration_us.count** <br>(count) | |
| **celerdata.be.load_channel_add_chunks_wait_writer_duration_us.count** <br>(count) | |
| **celerdata.be.load_channel_count** <br>(gauge) | |
| **celerdata.be.load_mem_bytes** <br>(gauge) | |
| **celerdata.be.load_rows.count** <br>(count) | |
| **celerdata.be.load_rpc_threadpool_size** <br>(gauge) | |
| **celerdata.be.local_column_pool_bytes** <br>(gauge) | |
| **celerdata.be.lz4f_decompress_context_pool_create_count** <br>(indicador) | |
| **celerdata.be.max_disk_io_util_percent** <br>(gauge) | |
| **celerdata.be.max_network_receive_bytes_rate** <br>(gauge) | |
| **celerdata.be.max_network_send_bytes_rate** <br>(gauge) | |
| **celerdata.be.max_tablet_rowset_num** <br>(gauge) | |
| **celerdata.be.memory_pool_bytes_total** <br>(gauge) | |
| **celerdata.be.memtable_finalize_duration_us.count** <br>(count) | |
| **celerdata.be.memtable_flush_disk_bytes.count** <br>(count) | |
| **celerdata.be.memtable_flush_duration_us.count** <br>(count) | |
| **celerdata.be.memtable_flush_execute_time_ns_total** <br>(gauge) | |
| **celerdata.be.memtable_flush_executed_tasks_total** <br>(gauge) | |
| **celerdata.be.memtable_flush_io_time_us.count** <br>(count) | |
| **celerdata.be.memtable_flush_memory_bytes.count** <br>(count) | |
| **celerdata.be.memtable_flush_pending_time_ns_total** <br>(gauge) | |
| **celerdata.be.memtable_flush_queue_count** <br>(gauge) | |
| **celerdata.be.memtable_flush_threadpool_size** <br>(gauge) | |
| **celerdata.be.memtable_flush.count** <br>(count) | |
| **celerdata.be.meta_request_duration.count** <br>(count) | |
| **celerdata.be.meta_request.count** <br>(count) | |
| **celerdata.be.metadata_mem_bytes** <br>(gauge) | |
| **celerdata.be.move_to_trash_count** <br>(gauge) | |
| **celerdata.be.move_to_trash_latency** <br>(gauge) | |
| **celerdata.be.move_to_trash_latency_80** <br>(gauge) | |
| **celerdata.be.move_to_trash_latency_90** <br>(gauge) | |
| **celerdata.be.move_to_trash_latency_99** <br>(gauge) | |
| **celerdata.be.move_to_trash_latency_999** <br>(gauge) | |
| **celerdata.be.move_to_trash_latency_9999** <br>(gauge) | |
| **celerdata.be.move_to_trash_max_latency** <br>(gauge) | |
| **celerdata.be.move_to_trash_qps** <br>(gauge) | |
| **celerdata.be.network_receive_bytes.count** <br>(count) | |
| **celerdata.be.network_receive_packets.count** <br>(count) | |
| **celerdata.be.network_send_bytes.count** <br>(count) | |
| **celerdata.be.network_send_packets.count** <br>(count) | |
| **celerdata.be.open_segments_io_minute** <br>(gauge) | |
| **celerdata.be.open_segments_minute** <br>(gauge) | |
| **celerdata.be.ordinal_index_mem_bytes** <br>(gauge) | |
| **celerdata.be.page_cache_capacity** <br>(gauge) | |
| **celerdata.be.page_cache_hit_count** <br>(gauge) | |
| **celerdata.be.page_cache_lookup_count** <br>(gauge) | |
| **celerdata.be.pgrp** <br>(gauge) | |
| **celerdata.be.pid** <br>(gauge) | |
| **celerdata.be.pip_query_ctx_cnt** <br>(gauge) | |
| **celerdata.be.pipe_driver_execution_time** <br>(gauge) | |
| **celerdata.be.pipe_driver_queue_len** <br>(gauge) | |
| **celerdata.be.pipe_driver_schedule_count** <br>(gauge) | |
| **celerdata.be.pipe_poller_block_queue_len** <br>(gauge) | |
| **celerdata.be.pipe_prepare_pool_queue_len** <br>(gauge) | Valor instantáneo de la longitud de la cola de tareas del grupo de subprocesos de preparación de pipelines|
| **celerdata.be.pipe_scan_executor_queuing** <br>(gauge) | |
| **celerdata.be.pk_index_compaction_execute_time_ns_total** <br>(gauge) | |
| **celerdata.be.pk_index_compaction_executed_tasks_total** <br>(gauge) | |
| **celerdata.be.pk_index_compaction_pending_time_ns_total** <br>(gauge) | |
| **celerdata.be.pk_index_compaction_queue_count** <br>(gauge) | |
| **celerdata.be.pk_index_compaction_threadpool_size** <br>(gauge) | |
| **celerdata.be.plan_fragment_count** <br>(gauge) | |
| **celerdata.be.ppid** <br>(gauge) | |
| **celerdata.be.process.context_switches_involuntary_second** <br>(gauge) | |
| **celerdata.be.process.context_switches_voluntary_second** <br>(gauge) | |
| **celerdata.be.process.cpu_usage** <br>(gauge) | |
| **celerdata.be.process.cpu_usage_system** <br>(gauge) | |
| **celerdata.be.process.cpu_usage_user** <br>(gauge) | |
| **celerdata.be.process.disk_read_bytes_second** <br>(gauge) | |
| **celerdata.be.process.disk_write_bytes_second** <br>(gauge) | |
| **celerdata.be.process.faults_major** <br>(gauge) | |
| **celerdata.be.process.faults_minor_second** <br>(indicador) | |
| **celerdata.be.process.fd_count** <br>(gauge) | |
| **celerdata.be.process.inblocks_second** <br>(gauge) | |
| **celerdata.be.process.io_read_bytes_second** <br>(gauge) | |
| **celerdata.be.process.io_read_second** <br>(gauge) | |
| **celerdata.be.process.io_write_bytes_second** <br>(gauge) | |
| **celerdata.be.process.io_write_second** <br>(gauge) | |
| **celerdata.be.process.memory_data_and_stack** <br>(gauge) | |
| **celerdata.be.process.memory_resident** <br>(gauge) | |
| **celerdata.be.process.memory_shared** <br>(gauge) | |
| **celerdata.be.process.memory_text** <br>(gauge) | |
| **celerdata.be.process.memory_virtual** <br>(gauge) | |
| **celerdata.be.process.nice** <br>(gauge) | |
| **celerdata.be.process.outblocks_second** <br>(gauge) | |
| **celerdata.be.process.priority** <br>(gauge) | |
| **celerdata.be.process.thread_count** <br>(gauge) | |
| **celerdata.be.process.uptime** <br>(gauge) | |
| **celerdata.be.process_fd_num_limit_hard** <br>(gauge) | |
| **celerdata.be.process_fd_num_limit_soft** <br>(gauge) | |
| **celerdata.be.process_fd_num_used** <br>(gauge) | |
| **celerdata.be.process_mem_bytes** <br>(gauge) | |
| **celerdata.be.process_thread_num** <br>(gauge) | |
| **celerdata.be.publish_count** <br>(gauge) | |
| **celerdata.be.publish_latency** <br>(gauge) | |
| **celerdata.be.publish_latency_80** <br>(gauge) | |
| **celerdata.be.publish_latency_90** <br>(gauge) | |
| **celerdata.be.publish_latency_99** <br>(gauge) | |
| **celerdata.be.publish_latency_999** <br>(gauge) | |
| **celerdata.be.publish_latency_9999** <br>(gauge) | |
| **celerdata.be.publish_max_latency** <br>(gauge) | |
| **celerdata.be.publish_qps** <br>(gauge) | |
| **celerdata.be.publish_version_execute_time_ns_total** <br>(gauge) | |
| **celerdata.be.publish_version_executed_tasks_total** <br>(gauge) | |
| **celerdata.be.publish_version_pending_time_ns_total** <br>(gauge) | |
| **celerdata.be.publish_version_queue_count** <br>(gauge) | |
| **celerdata.be.publish_version_threadpool_size** <br>(gauge) | |
| **celerdata.be.push_request_duration_us.count** <br>(count) | |
| **celerdata.be.push_request_write_bytes.count** <br>(count) | |
| **celerdata.be.push_request_write_bytes_per_second** <br>(gauge) | |
| **celerdata.be.push_request_write_rows.count** <br>(count) | |
| **celerdata.be.push_requests.count** <br>(count) | |
| **celerdata.be.query_cache_capacity** <br>(gauge) | |
| **celerdata.be.query_cache_hit_count** <br>(gauge) | |
| **celerdata.be.query_cache_hit_ratio** <br>(gauge) | |
| **celerdata.be.query_cache_lookup_count** <br>(gauge) | |
| **celerdata.be.query_cache_usage** <br>(gauge) | |
| **celerdata.be.query_cache_usage_ratio** <br>(gauge) | |
| **celerdata.be.query_mem_bytes** <br>(gauge) | |
| **celerdata.be.query_scan_bytes.count** <br>(count) | |
| **celerdata.be.query_scan_bytes_per_second** <br>(gauge) | |
| **celerdata.be.query_scan_rows.count** <br>(count) | |
| **celerdata.be.readable_blocks.count** <br>(count) | |
| **celerdata.be.resource_group_bigquery_count** <br>(gauge) | |
| **celerdata.be.resource_group_concurrency_overflow_count** <br>(gauge) | |
| **celerdata.be.resource_group_connector_scan_use_ratio** <br>(gauge) | |
| **celerdata.be.resource_group_cpu_limit_ratio** <br>(gauge) | Valor instantáneo del ratio de cuota de CPU del grupo de recursos|
| **celerdata.be.resource_group_cpu_use_ratio** <br>(gauge) | Relación entre el tiempo de CPU utilizado por el grupo de recursos y el tiempo de CPU de todos los grupos de recursos|
| **celerdata.be.resource_group_inuse_cpu_cores** <br>(gauge) | |
| **celerdata.be.resource_group_mem_inuse_bytes** <br>(gauge) | |
| **celerdata.be.resource_group_mem_limit_bytes** <br>(gauge) | Valor instantáneo de la cuota de memoria del grupo de recursos|
| **celerdata.be.resource_group_running_queries** <br>(gauge) | |
| **celerdata.be.resource_group_scan_use_ratio** <br>(gauge) | |
| **celerdata.be.resource_group_total_queries** <br>(gauge) | |
| **celerdata.be.result_block_queue_count** <br>(gauge) | |
| **celerdata.be.result_buffer_block_count** <br>(gauge) | |
| **celerdata.be.routine_load_task_count** <br>(gauge) | |
| **celerdata.be.rowset_count_generated_and_in_use** <br>(gauge) | |
| **celerdata.be.rowset_metadata_mem_bytes** <br>(gauge) | |
| **celerdata.be.rpc.channel_connection_count** <br>(gauge) | |
| **celerdata.be.rpc.event_thread_second** <br>(gauge) | |
| **celerdata.be.rpc.health_check_count** <br>(gauge) | |
| **celerdata.be.rpc.keepwrite_second** <br>(gauge) | |
| **celerdata.be.rpc.socket_count** <br>(gauge) | |
| **celerdata.be.rpc.waitepollout_count** <br>(gauge) | |
| **celerdata.be.rpc.waitepollout_second** <br>(gauge) | |
| **celerdata.be.rpcz_sampling_ratio** <br>(gauge) | |
| **celerdata.be.running_base_compaction_task_num** <br>(gauge) | |
| **celerdata.be.running_cumulative_compaction_task_num** <br>(gauge) | |
| **celerdata.be.running_update_compaction_task_num** <br>(gauge) | |
| **celerdata.be.schema_change_mem_bytes** <br>(gauge) | |
| **celerdata.be.segment_flush_bytes.count** <br>(count) | |
| **celerdata.be.segment_flush_duration_us.count** <br>(count) | |
| **celerdata.be.segment_flush_execute_time_ns_total** <br>(gauge) | |
| **celerdata.be.segment_flush_executed_tasks_total** <br>(gauge) | |
| **celerdata.be.segment_flush_io_time_us.count** <br>(count) | |
| **celerdata.be.segment_flush_pending_time_ns_total** <br>(gauge) | |
| **celerdata.be.segment_flush_queue_count** <br>(gauge) | |
| **celerdata.be.segment_flush_threadpool_size** <br>(gauge) | |
| **celerdata.be.segment_flush.count** <br>(count) | |
| **celerdata.be.segment_metadata_mem_bytes** <br>(gauge) | |
| **celerdata.be.segment_read.count** <br>(count) | |
| **celerdata.be.segment_replicate_execute_time_ns_total** <br>(gauge) | |
| **celerdata.be.segment_replicate_executed_tasks_total** <br>(gauge) | |
| **celerdata.be.segment_replicate_pending_time_ns_total** <br>(gauge) | |
| **celerdata.be.segment_replicate_queue_count** <br>(gauge) | |
| **celerdata.be.segment_replicate_threadpool_size** <br>(gauge) | |
| **celerdata.be.segment_zonemap_mem_bytes** <br>(gauge) | |
| **celerdata.be.short_circuit_request_duration_us.count** <br>(count) | |
| **celerdata.be.short_circuit_request.count** <br>(count) | |
| **celerdata.be.short_key_index_mem_bytes** <br>(gauge) | |
| **celerdata.be.small_file_cache_count** <br>(gauge) | |
| **celerdata.be.snmp.count** <br>(count) | |
| **celerdata.be.starlet.io_read_bytes_second** <br>(gauge) | |
| **celerdata.be.starlet.io_read_second** <br>(gauge) | |
| **celerdata.be.starlet.io_write_bytes_second** <br>(gauge) | |
| **celerdata.be.starlet.io_write_second** <br>(gauge) | |
| **celerdata.be.storage_page_cache_mem_bytes** <br>(gauge) | |
| **celerdata.be.stream_load.count** <br>(count) | |
| **celerdata.be.stream_load_pipe_count** <br>(gauge) | |
| **celerdata.be.streaming_load_bytes.count** <br>(count) | |
| **celerdata.be.streaming_load_current_processing** <br>(gauge) | |
| **celerdata.be.streaming_load_duration_ms.count** <br>(count) | |
| **celerdata.be.streaming_load_requests.count** <br>(count) | |
| **celerdata.be.system.core_count** <br>(gauge) | |
| **celerdata.be.system.loadavg_15m** <br>(gauge) | |
| **celerdata.be.system.loadavg_1m** <br>(gauge) | |
| **celerdata.be.system.loadavg_5m** <br>(gauge) | |
| **celerdata.be.tablet_base_max_compaction_score** <br>(gauge) | |
| **celerdata.be.tablet_cumulative_max_compaction_score** <br>(gauge) | |
| **celerdata.be.tablet_metadata_mem_bytes** <br>(gauge) | |
| **celerdata.be.tablet_schema_mem_bytes** <br>(gauge) | |
| **celerdata.be.tablet_update_max_compaction_score** <br>(gauge) | |
| **celerdata.be.thrift_connections.count** <br>(count) | |
| **celerdata.be.thrift_current_connections** <br>(gauge) | |
| **celerdata.be.thrift_opened_clients** <br>(gauge) | |
| **celerdata.be.thrift_used_clients** <br>(gauge) | |
| **celerdata.be.total_column_pool_bytes** <br>(gauge) | |
| **celerdata.be.transaction_streaming_load_bytes.count** <br>(count) | |
| **celerdata.be.transaction_streaming_load_current_processing** <br>(gauge) | |
| **celerdata.be.transaction_streaming_load_duration_ms.count** <br>(count) | |
| **celerdata.be.transaction_streaming_load_requests.count** <br>(count) | |
| **celerdata.be.txn.request.count** <br>(count) | |
| **celerdata.be.uint8_column_pool_bytes** <br>(gauge) | |
| **celerdata.be.unused_rowsets_count** <br>(gauge) | |
| **celerdata.be.update_apply_execute_time_ns_total** <br>(gauge) | |
| **celerdata.be.update_apply_executed_tasks_total** <br>(gauge) | |
| **celerdata.be.update_apply_pending_time_ns_total** <br>(gauge) | |
| **celerdata.be.update_apply_queue_count** <br>(gauge) | |
| **celerdata.be.update_apply_threadpool_size** <br>(gauge) | |
| **celerdata.be.update_compaction_duration_us.count** <br>(count) | |
| **celerdata.be.update_compaction_outputs_bytes.count** <br>(count) | |
| **celerdata.be.update_compaction_outputs.count** <br>(count) | |
| **celerdata.be.update_compaction_task_byte_per_second** <br>(gauge) | |
| **celerdata.be.update_compaction_task_cost_time_ns** <br>(gauge) | |
| **celerdata.be.update_del_vector_bytes_total** <br>(gauge) | |
| **celerdata.be.update_del_vector_deletes_new.count** <br>(count) | |
| **celerdata.be.update_del_vector_deletes.count** <br>(count) | |
| **celerdata.be.update_del_vector_dels_num** <br>(gauge) | |
| **celerdata.be.update_del_vector_num** <br>(gauge) | |
| **celerdata.be.update_mem_bytes** <br>(gauge) | |
| **celerdata.be.update_primary_index_bytes_total** <br>(gauge) | |
| **celerdata.be.update_primary_index_num** <br>(gauge) | |
| **celerdata.be.update_rowset_commit_apply_duration_us.count** <br>(count) | |
| **celerdata.be.update_rowset_commit_apply.count** <br>(count) | |
| **celerdata.be.update_rowset_commit_request_failed.count** <br>(count) | |
| **celerdata.be.update_rowset_commit_request.count** <br>(count) | |
| **celerdata.be.wait_base_compaction_task_num** <br>(gauge) | |
| **celerdata.be.wait_cumulative_compaction_task_num** <br>(gauge) | |
| **celerdata.be.writable_blocks.count** <br>(count) | |

### Checks de servicio

**celerdata_fe.prometheus.health**

Devuelve CRITICAL si el Agent no puede conectarse a CelerData para recopilar métricas. En caso contrario, devuelve OK.

_Estados: ok, crítico_

**celerdata_be.prometheus.health**

Devuelve CRITICAL si el Agent no puede conectarse a CelerData para recopilar métricas. En caso contrario, devuelve OK.

_Estados: ok, crítico_

### Eventos

La integración CelerData no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de CelerData](mailto:support@celerdata.com).