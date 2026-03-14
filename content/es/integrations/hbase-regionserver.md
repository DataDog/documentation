---
aliases:
- /es/integrations/hbase_regionserver
app_id: hbase-regionserver
categories:
- almacenamiento en caché
- almacenes de datos
- recopilación de logs
custom_kind: integración
description: Integración con HBase RegionServer.
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: HBase RegionServer
---
## Información general

Obtén métricas del servicio HBase RegionServer en tiempo real para:

- Visualizar y monitorizar estados HBase RegionServer.
- Reciba notificaciones sobre fallos y eventos de HBase RegionServer.

## Configuración

El check de HBase RegionServer no está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que es necesario instalarlo.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check de HBase RegionServer en tu host. Consulta [Uso de integraciones comunitarias](https://docs.datadoghq.com/agent/guide/use-community-integrations/) para instalar con el Docker Agent o versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-hbase_regionserver==<INTEGRATION_VERSION>
   ```

1. Configura tu integración de forma similar a las [integraciones] centrales (https://docs.datadoghq.com/getting_started/integrations/).

### Configuración

1. Edita el archivo `hbase_regionserver.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para comenzar a recopilar tus [métricas](#metrics) de HBase RegionServer. Consulta el [ejemplo hbase_regionserver.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/hbase_regionserver/datadog_checks/hbase_regionserver/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

### Recopilación de logs

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `hbase_regionserver.d/conf.yaml` para empezar a recopilar tus logs de Hbase_regionserver:

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: hbase
   ```

   Cambia el valor del parámetro `path` y configúralo para tu entorno.
   Consulta el [ejemplo hbase_regionserver.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/hbase_regionserver/datadog_checks/hbase_regionserver/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

## Validación

Ejecuta el [subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#service-status) y busca `hbase_regionserver` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **hbase.regionserver.ipc.queue_size** <br>(gauge) | Número de bytes en las colas de llamadas.<br>_Se muestra en bytes_ |
| **hbase.regionserver.ipc.num_open_connections** <br>(gauge) | Número de conexiones abiertas.|
| **hbase.regionserver.ipc.num_active_handler** <br>(gauge) | Número de identificadores RPC activos.|
| **hbase.regionserver.ipc.total_call_time.max** <br>(gauge) | Tiempo total de la llamada, incluido el tiempo en cola y el tiempo de procesamiento.<br>_Se muestra en milisegundos_ |
| **hbase.regionserver.ipc.total_call_time.mean** <br>(gauge) | Tiempo total de la llamada, incluido el tiempo en cola y el tiempo de procesamiento.<br>_Se muestra en milisegundos_ |
| **hbase.regionserver.ipc.total_call_time.median** <br>(gauge) | Tiempo total de la llamada, incluido el tiempo en cola y el tiempo de procesamiento.<br>_Se muestra en milisegundos_ |
| **hbase.regionserver.ipc.total_call_time.percentile.99** <br>(gauge) | Tiempo total de la llamada, incluido el tiempo en cola y el tiempo de procesamiento.<br>_Se muestra en milisegundos_ |
| **hbase.regionserver.regions.num_regions** <br>(gauge) | Número de regiones en el sistema métrico.|
| **hbase.regionserver.replication.sink.applied_ops** <br>(gauge) | Número de entradas de WAL aplicadas en el sumidero de replicación.|
| **hbase.regionserver.replication.sink.age_of_last_applied_op** <br>(gauge) | Demora de replicación de la última entrada de WAL aplicada entre la fuente y el sumidero.<br>_Se muestra en milisegundos_ |
| **hbase.regionserver.replication.sink.applied_batches** <br>(gauge) | Número de operaciones de aplicación de WAL procesadas en el sumidero de replicación.|
| **hbase.regionserver.server.region_count** <br>(gauge) | Número de regiones|
| **hbase.regionserver.server.store_count** <br>(gauge) | Número de tiendas|
| **hbase.regionserver.server.hlog_file_count** <br>(gauge) | Número de archivos WAL|
| **hbase.regionserver.server.hlog_file_size** <br>(gauge) | Tamaño de todos los archivos WAL<br>_Se muestra en bytes_ |
| **hbase.regionserver.server.store_file_count** <br>(gauge) | Número de archivos de la tienda|
| **hbase.regionserver.server.mem_store_size** <br>(gauge) | Tamaño del memstore<br>_Se muestra en bytes_ |
| **hbase.regionserver.server.store_file_size** <br>(gauge) | Tamaño de los archivos de almacenamiento que se están proporcionando.<br>_Se muestra en bytes_ |
| **hbase.regionserver.server.total_request_count** <br>(gauge) | Número total de solicitudes que ha respondido este RegionServer.|
| **hbase.regionserver.server.read_request_count** <br>(gauge) | Número de solicitudes de lectura que ha respondido este servidor regional.|
| **hbase.regionserver.server.write_request_count** <br>(gauge) | Número de solicitudes de mutación que ha respondido este servidor regional.|
| **hbase.regionserver.server.check_mutate_failed_count** <br>(gauge) | Número de llamadas de comprobación y mutación que no han pasado los checks.|
| **hbase.regionserver.server.check_mutate_passed_count** <br>(gauge) | Número de llamadas de comprobación y mutación que han pasado los checks.|
| **hbase.regionserver.server.store_file_index_size** <br>(gauge) | Tamaño de los índices en archivos de almacenamiento en disco.<br>_Se muestra en bytes_ |
| **hbase.regionserver.server.static_index_size** <br>(gauge) | Tamaño sin comprimir de los índices estáticos.<br>_Se muestra en bytes_ |
| **hbase.regionserver.server.static_bloom_size** <br>(gauge) | Tamaño sin comprimir de los filtros Bloom estáticos.<br>_Se muestra en bytes_ |
| **hbase.regionserver.server.mutations_without_wal_count** <br>(count) | Número de mutaciones que han enviado los clientes con el registro de escritura anticipada desactivado.|
| **hbase.regionserver.server.mutations_without_wal_size** <br>(gauge) | Tamaño de los datos que han enviado los clientes con el registro de escritura anticipada desactivado.<br>_Se muestra en bytes_ |
| **hbase.regionserver.server.percent_files_local** <br>(gauge) | Porcentaje de HFiles que se almacenan en el nodo de datos hdfs local.<br>_Se muestra como porcentaje_ |
| **hbase.regionserver.server.percent_files_local_secondary_regions** <br>(gauge) | Porcentaje de HFiles utilizados por las regiones secundarias que se almacenan en el nodo de datos hdfs local.<br>_Se muestra como porcentaje_ |
| **hbase.regionserver.server.split_queue_length** <br>(gauge) | Longitud de la cola para divisiones.|
| **hbase.regionserver.server.compaction_queue_length** <br>(gauge) | Longitud de la cola para compactaciones.|
| **hbase.regionserver.server.flush_queue_length** <br>(gauge) | Longitud de la cola para descargas de regiones.|
| **hbase.regionserver.server.block_cache_free_size** <br>(gauge) | Tamaño de la caché de bloques que no está ocupada.<br>_Se muestra en bytes_ |
| **hbase.regionserver.server.block_cache_count** <br>(gauge) | Número de bloque en la caché de bloques.|
| **hbase.regionserver.server.block_cache_size** <br>(gauge) | Tamaño de la caché de bloques.<br>_Se muestra en bytes_ |
| **hbase.regionserver.server.block_cache_hit_count** <br>(gauge) | Recuento de aciertos en la caché de bloques.|
| **hbase.regionserver.server.block_cache_hit_count_primary** <br>(gauge) | Recuento de aciertos en la réplica primaria en la caché de bloques.|
| **hbase.regionserver.server.block_cache_miss_count** <br>(gauge) | Número de solicitudes de un bloque que no ha acertado la caché de bloques.|
| **hbase.regionserver.server.block_cache_miss_count_primary** <br>(gauge) | Número de solicitudes de un bloque de la réplica primaria que no ha acertado la caché de bloques.|
| **hbase.regionserver.server.block_cache_eviction_count** <br>(gauge) | Recuento del número de bloques desalojados de la caché de bloques.|
| **hbase.regionserver.server.block_cache_eviction_count_primary** <br>(gauge) | Recuento del número de bloques desalojados de la réplica primaria en la caché de bloques.|
| **hbase.regionserver.server.block_cache_hit_percent** <br>(gauge) | Porcentaje de solicitudes de caché de bloques que son aciertos<br>_Se muestra como porcentaje_ |
| **hbase.regionserver.server.block_cache_express_hit_percent** <br>(gauge) | Porcentaje de veces que las solicitudes con la caché activada aciertan la caché.<br>_Se muestra como porcentaje_ |
| **hbase.regionserver.server.block_cache_failed_insertion_count** <br>(gauge) | Número de veces que ha fallado la inserción de una caché de bloques. Suele deberse a restricciones de tamaño.<br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.updates_blocked_time** <br>(gauge) | Número de actualizaciones de MS que se han bloqueado para que se pueda vaciar el memstore.<br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.flushed_cells_count** <br>(gauge) | Número de celdas vaciadas en disco.|
| **hbase.regionserver.server.compacted_cells_count** <br>(gauge) | Número de celdas procesadas durante las compactaciones menores.|
| **hbase.regionserver.server.major_compacted_cells_count** <br>(gauge) | Número de celdas procesadas durante las compactaciones mayores.|
| **hbase.regionserver.server.flushed_cells_size** <br>(gauge) | Cantidad total de datos vaciados al disco, en bytes<br>_Se muestra en bytes_ |
| **hbase.regionserver.server.compacted_cells_size** <br>(gauge) | Cantidad total de datos procesados durante las compactaciones menores, en bytes<br>_Se muestra en bytes_ |
| **hbase.regionserver.server.major_compacted_cells_size** <br>(gauge) | Cantidad total de datos procesados durante las compactaciones mayores, en bytes<br>_Se muestra en bytes_ |
| **hbase.regionserver.server.blocked_request_count** <br>(gauge) | Número de solicitudes bloqueadas debido a que el tamaño del memstore es mayor que blockingMemStoreSize|
| **hbase.regionserver.server.hedged_read** <br>(gauge) | |
| **hbase.regionserver.server.hedged_read_wins** <br>(gauge) | |
| **hbase.regionserver.server.pause_time_with_gc_num_ops** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.pause_time_with_gc.min** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.pause_time_with_gc.max** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.pause_time_with_gc.mean** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.pause_time_with_gc.median** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.pause_time_with_gc.percentile.99** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.mutate.num_ops** <br>(gauge) | |
| **hbase.regionserver.server.mutate.min** <br>(gauge) | |
| **hbase.regionserver.server.mutate.max** <br>(gauge) | |
| **hbase.regionserver.server.mutate.mean** <br>(gauge) | |
| **hbase.regionserver.server.mutate.median** <br>(gauge) | |
| **hbase.regionserver.server.mutate.percentile.99** <br>(gauge) | |
| **hbase.regionserver.server.slow_append_count** <br>(gauge) | Número de Anexos que han tardado más de 1000ms en completarse.|
| **hbase.regionserver.server.pause_warn_threshold_exceeded** <br>(gauge) | |
| **hbase.regionserver.server.slow_delete_count** <br>(gauge) | Número de Eliminaciones que han tardado más de 1000ms en completarse.|
| **hbase.regionserver.server.increment.num_ops** <br>(gauge) | |
| **hbase.regionserver.server.increment.min** <br>(gauge) | |
| **hbase.regionserver.server.increment.max** <br>(gauge) | |
| **hbase.regionserver.server.increment.mean** <br>(gauge) | |
| **hbase.regionserver.server.increment.median** <br>(gauge) | |
| **hbase.regionserver.server.increment.percentile.99** <br>(gauge) | |
| **hbase.regionserver.server.replay.num_ops** <br>(gauge) | |
| **hbase.regionserver.server.replay.min** <br>(gauge) | |
| **hbase.regionserver.server.replay.max** <br>(gauge) | |
| **hbase.regionserver.server.replay.mean** <br>(gauge) | |
| **hbase.regionserver.server.replay.median** <br>(gauge) | |
| **hbase.regionserver.server.replay.percentile.99** <br>(gauge) | |
| **hbase.regionserver.server.flush_time.num_ops** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.flush_time.min** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.flush_time.max** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.flush_time.mean** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.flush_time.median** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.flush_time.percentile.99** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.pause_info_threshold_exceeded** <br>(gauge) | |
| **hbase.regionserver.server.delete.num_ops** <br>(gauge) | |
| **hbase.regionserver.server.delete.min** <br>(gauge) | |
| **hbase.regionserver.server.delete.max** <br>(gauge) | |
| **hbase.regionserver.server.delete.mean** <br>(gauge) | |
| **hbase.regionserver.server.delete.median** <br>(gauge) | |
| **hbase.regionserver.server.delete.percentile.99** <br>(gauge) | |
| **hbase.regionserver.server.split_request_count** <br>(gauge) | Número de divisiones solicitadas.|
| **hbase.regionserver.server.split_success_count** <br>(gauge) | Número de divisiones ejecutadas con éxito.|
| **hbase.regionserver.server.slow_get_count** <br>(gauge) | Número de Gets que han tardado más de 1000ms en completarse.|
| **hbase.regionserver.server.get.num_ops** <br>(gauge) | |
| **hbase.regionserver.server.get.min** <br>(gauge) | |
| **hbase.regionserver.server.get.max** <br>(gauge) | |
| **hbase.regionserver.server.get.mean** <br>(gauge) | |
| **hbase.regionserver.server.get.median** <br>(gauge) | |
| **hbase.regionserver.server.get.percentile.99** <br>(gauge) | |
| **hbase.regionserver.server.scan_next.num_ops** <br>(gauge) | |
| **hbase.regionserver.server.scan_next.min** <br>(gauge) | |
| **hbase.regionserver.server.scan_next.max** <br>(gauge) | |
| **hbase.regionserver.server.scan_next.mean** <br>(gauge) | |
| **hbase.regionserver.server.scan_next.median** <br>(gauge) | |
| **hbase.regionserver.server.scan_next.percentile.99** <br>(gauge) | |
| **hbase.regionserver.server.pause_time_without_gc.num_ops** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.pause_time_without_gc.min** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.pause_time_without_gc.max** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.pause_time_without_gc.mean** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.pause_time_without_gc.median** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.pause_time_without_gc.percentile.99** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.slow_put_count** <br>(gauge) | Número de Multis que han tardado más de 1000ms en completarse.|
| **hbase.regionserver.server.slow_increment_count** <br>(gauge) | Número de Incrementos que han tardado más de 1000 ms en completarse.|
| **hbase.regionserver.server.split_time.num_ops** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.split_time.min** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.split_time.max** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.split_time.mean** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.split_time.median** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.server.split_time.percentile.99** <br>(gauge) | <br>_Se muestra en milisegundos_ |
| **hbase.regionserver.wal.append_size.num_ops** <br>(gauge) | Tamaño (en bytes) de los datos añadidos a WAL.<br>_Se muestra en bytes_ |
| **hbase.regionserver.wal.append_size.min** <br>(gauge) | Tamaño (en bytes) de los datos añadidos a WAL.<br>_Se muestra en bytes_ |
| **hbase.regionserver.wal.append_size.max** <br>(gauge) | Tamaño (en bytes) de los datos añadidos a WAL.<br>_Se muestra en bytes_ |
| **hbase.regionserver.wal.append_size.mean** <br>(gauge) | Tamaño (en bytes) de los datos añadidos a WAL.<br>_Se muestra en bytes_ |
| **hbase.regionserver.wal.append_size.median** <br>(gauge) | Tamaño (en bytes) de los datos añadidos a WAL.<br>_Se muestra en bytes_ |
| **hbase.regionserver.wal.append_size.percentile.99** <br>(gauge) | Tamaño (en bytes) de los datos añadidos a WAL.<br>_Se muestra en bytes_ |
| **hbase.regionserver.wal.sync_time.num_ops** <br>(gauge) | Tiempo que ha tardado sincronizar WAL con HDFS.<br>_Se muestra en milisegundos_ |
| **hbase.regionserver.wal.sync_time.min** <br>(gauge) | Tiempo que ha tardado sincronizar WAL con HDFS.<br>_Se muestra en milisegundos_ |
| **hbase.regionserver.wal.sync_time.max** <br>(gauge) | Tiempo que ha tardado sincronizar WAL con HDFS.<br>_Se muestra en milisegundos_ |
| **hbase.regionserver.wal.sync_time.mean** <br>(gauge) | Tiempo que ha tardado sincronizar WAL con HDFS.<br>_Se muestra en milisegundos_ |
| **hbase.regionserver.wal.sync_time.median** <br>(gauge) | Tiempo que ha tardado sincronizar WAL con HDFS.<br>_Se muestra en milisegundos_ |
| **hbase.regionserver.wal.sync_time.percentile.99** <br>(gauge) | Tiempo que ha tardado sincronizar WAL con HDFS.<br>_Se muestra en milisegundos_ |
| **hbase.regionserver.wal.slow_append_count** <br>(gauge) | Número de anexos lentos.|
| **hbase.regionserver.wal.roll_request** <br>(gauge) | Cantidad de veces que se ha solicitado un log roll en total<br>_Se muestra en milisegundos_ |
| **hbase.regionserver.wal.append_count** <br>(gauge) | Número de anexos al registro de escritura anticipada.|
| **hbase.regionserver.wal.low_replica_roll_request** <br>(gauge) | Cantidad de veces se ha solicitado un log roll debido a que había muy pocos DN en el pipeline de escritura.<br>_Se muestra en milisegundos_ |
| **hbase.regionserver.wal.append_time.num_ops** <br>(gauge) | Tiempo que ha tardado un anexo al log.<br>_Se muestra en milisegundos_ |
| **hbase.regionserver.wal.append_time.min** <br>(gauge) | Tiempo que ha tardado un anexo al log.<br>_Se muestra en milisegundos_ |
| **hbase.regionserver.wal.append_time.max** <br>(gauge) | Tiempo que ha tardado un anexo al log.<br>_Se muestra en milisegundos_ |
| **hbase.regionserver.wal.append_time.mean** <br>(gauge) | Tiempo que ha tardado un anexo al log.<br>_Se muestra en milisegundos_ |
| **hbase.regionserver.wal.append_time.median** <br>(gauge) | Tiempo que ha tardado un anexo al log.<br>_Se muestra en milisegundos_ |
| **hbase.regionserver.wal.append_time.percentile.99** <br>(gauge) | Tiempo que ha tardado un anexo al log.<br>_Se muestra en milisegundos_ |
| **hbase.jvm_metrics.mem_non_heap_used_in_mb** <br>(gauge) | Memoria no-heap utilizada en MB.|
| **hbase.jvm_metrics.mem_non_heap_committed_in_mb** <br>(gauge) | Memoria no-heap comprometida en MB.|
| **hbase.jvm_metrics.mem_non_heap_max_in_mb** <br>(gauge) | Máximo de memoria no-heap en MB.|
| **hbase.jvm_metrics.mem_heap_used_in_mb** <br>(gauge) | Memoria heap utilizada en MB.|
| **hbase.jvm_metrics.mem_heap_committed_in_mb** <br>(gauge) | Memoria heap comprometida en MB.|
| **hbase.jvm_metrics.mem_heap_max_in_mb** <br>(gauge) | Máximo de memoria heap en MB.|
| **hbase.jvm_metrics.mem_max_in_mb** <br>(gauge) | Tamaño máximo de memoria en MB.|
| **hbase.jvm_metrics.gc_count_par_new** <br>(gauge) | Recuento de recolección de basura para ParNew.|
| **hbase.jvm_metrics.gc_time_millis_par_new** <br>(gauge) | Tiempo de recolección de basura para ParNew<br>_Se muestra en milisegundos_ |
| **hbase.jvm_metrics.gc_count_concurrent_mark_sweep** <br>(gauge) | Recuento de recolección de basura para ConcurrentMarkSweep.|
| **hbase.jvm_metrics.gc_time_millis_concurrent_mark_sweep** <br>(gauge) | Tiempo de recolección de basura para ConcurrentMarkSweep<br>_Se muestra en milisegundos_ |
| **hbase.jvm_metrics.gc_count** <br>(gauge) | Recuento total de recolecciones de basura.|
| **hbase.jvm_metrics.gc_time_millis** <br>(gauge) | Tiempo total de recolección de basura en milisegundos<br>_Se muestra en milisegundos_ |

### Eventos

El check de HBase RegionServer check no incluye eventos.

### Checks de servicio

El check de HBase RegionServer check no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](http://docs.datadoghq.com/help)