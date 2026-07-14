---
app_id: couchbase
categories:
- almacenamiento en caché
- almacenes de datos
- recopilación de logs
custom_kind: integración
description: Realiza un seguimiento y grafica tus métricas de actividad y rendimiento
  de Couchbase.
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-couchbase-performance-datadog
  tag: blog
  text: Monitorizar métricas claves de Couchbase
integration_version: 6.0.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: CouchBase
---
![Couchbase bytes leídos](https://raw.githubusercontent.com/DataDog/integrations-core/master/couchbase/images/couchbase_graph.png)

## Información general

Identifica los buckets ocupados, realiza un seguimiento de los ratios de fallo de caché y mucho más. Este check del Agent recopila métricas como:

- Disco duro y memoria utilizados por los datos
- Conexiones actuales
- Total de objetos
- Operaciones por segundo
- Tamaño de la cola de escritura en disco

Y muchos más.

## Configuración

### Instalación

El check de Couchbase está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus servidores Couchbase.

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `couchbase.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para comenzar a recopilar tus datos de rendimiento de Couchbase. Consulta el [ejemplo couchbase.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/couchbase/datadog_checks/couchbase/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   ```yaml
   init_config:

   instances:
     ## @param server - string - required
     ## The server's url.
     #
     - server: http://localhost:8091
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

#### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `couchbase.d/conf.yaml` para empezar a recopilar tus logs de Couchbase:

   ```yaml
   logs:
     - type: file
       path: /opt/couchbase/var/lib/couchbase/logs/couchdb.log
       source: couchdb
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno. Consulta el [ejemplo couchbase.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/couchbase/datadog_checks/couchbase/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "En contenedores" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `couchbase`                          |
| `<INIT_CONFIG>`      | en blanco o `{}`                        |
| `<INSTANCE_CONFIG>`  | `{"server": "http://%%host%%:8091"}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `couchbase` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **couchbase.by_bucket.avg_bg_wait_time** <br>(gauge) | Tiempo medio de espera en segundo plano<br>_Se muestra en microsegundos_ |
| **couchbase.by_bucket.avg_disk_commit_time** <br>(gauge) | Tiempo medio de confirmación del disco<br>_Se muestra en segundos_ |
| **couchbase.by_bucket.avg_disk_update_time** <br>(gauge) | Tiempo medio de actualización del disco <br>_Se muestra en microsegundos_ |
| **couchbase.by_bucket.bg_wait_total** <br>(gauge) | Bytes leídos<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.bytes_read** <br>(gauge) | Bytes leídos<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.bytes_written** <br>(gauge) | Bytes escritos<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.cas_badval** <br>(gauge) | Comparar e intercambiar valores erróneos|
| **couchbase.by_bucket.cas_hits** <br>(gauge) | Comparar e intercambiar aciertos<br>_Se muestra como acierto_ |
| **couchbase.by_bucket.cas_misses** <br>(gauge) | Comparar e intercambiar fallos<br>_Se muestra como fallo_ |
| **couchbase.by_bucket.cmd_get** <br>(gauge) | Operaciones GET realizadas en el bucket<br>_Se muestra como get_ |
| **couchbase.by_bucket.cmd_lookup** <br>(gauge) | Operaciones LOOKUP realizadas en el bucket<br>_Se muestra como get_ |
| **couchbase.by_bucket.cmd_set** <br>(gauge) | Operaciones SET realizadas en el bucket<br>_Se muestra como set_ |
| **couchbase.by_bucket.couch_docs_actual_disk_size** <br>(gauge) | Tamaño total de documentos Couch en disco en bytes<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.couch_docs_data_size** <br>(gauge) | Tamaño total de documentos Couch en bytes<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.couch_docs_disk_size** <br>(gauge) | Tamaño total de documentos Couch en bytes<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.couch_docs_fragmentation** <br>(gauge) | Fragmentación de documentos Couch<br>_Se muestra como porcentaje_ |
| **couchbase.by_bucket.couch_spatial_data_size** <br>(gauge) | Tamaño de datos de objeto para vistas espaciales<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.couch_spatial_disk_size** <br>(gauge) | Cantidad de espacio en disco ocupado por vistas espaciales<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.couch_spatial_ops** <br>(gauge) | Operaciones espaciales<br>_Se muestra como operación_ |
| **couchbase.by_bucket.couch_total_disk_size** <br>(gauge) | Tamaño total del disco Couch<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.couch_views_data_size** <br>(gauge) | Tamaño de datos de objeto para vistas<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.couch_views_disk_size** <br>(gauge) | Cantidad de espacio en disco ocupado por vistas<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.couch_views_fragmentation** <br>(gauge) | Fragmentación de vistas<br>_Se muestra como porcentaje_ |
| **couchbase.by_bucket.couch_views_ops** <br>(gauge) | Operaciones con vistas<br>_Se muestra como operación_ |
| **couchbase.by_bucket.cpu_idle_ms** <br>(gauge) | Milisegundos de inactividad de CPU<br>_Se muestra en milisegundos_ |
| **couchbase.by_bucket.cpu_utilization_rate** <br>(gauge) | Porcentaje de uso de CPU<br>_Se muestra como porcentaje_ |
| **couchbase.by_bucket.curr_connections** <br>(gauge) | Número actual de conexiones de bucket<br>_Se muestra como conexión_ |
| **couchbase.by_bucket.curr_items** <br>(gauge) | Número de elementos activos en memoria<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.curr_items_tot** <br>(gauge) | Número total de elementos<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.decr_hits** <br>(gauge) | Disminuir aciertos<br>_Se muestra como acierto_ |
| **couchbase.by_bucket.decr_misses** <br>(gauge) | Disminuir fallos<br>_Se muestra como fallo_ |
| **couchbase.by_bucket.delete_hits** <br>(gauge) | Borrar aciertos<br>_Se muestra como acierto_ |
| **couchbase.by_bucket.delete_misses** <br>(gauge) | Borrar fallos<br>_Se muestra como fallo_ |
| **couchbase.by_bucket.disk_commit_count** <br>(gauge) | Confirmaciones de disco<br>_Se muestra como operación_ |
| **couchbase.by_bucket.disk_update_count** <br>(gauge) | Actualizaciones de disco<br>_Se muestra como operación_ |
| **couchbase.by_bucket.disk_write_queue** <br>(gauge) | Profundidad de la cola de escritura en disco<br>_Se muestra como operación_ |
| **couchbase.by_bucket.ep_bg_fetched** <br>(gauge) | Lecturas de disco por segundo<br>_Se muestra como recuperación_ |
| **couchbase.by_bucket.ep_cache_miss_rate** <br>(gauge) | Tasa de fallos de caché<br>_Se muestra como fallo_ |
| **couchbase.by_bucket.ep_cache_miss_ratio** <br>(gauge) | Proporción de fallos de caché<br>_Se muestra como porcentaje_ |
| **couchbase.by_bucket.ep_dcp_2i_backoff** <br>(gauge) | Número de retrocesos para conexiones DCP de índices|
| **couchbase.by_bucket.ep_dcp_2i_count** <br>(gauge) | Número de conexiones DCP de índices<br>_Se muestra como conexión_ |
| **couchbase.by_bucket.ep_dcp_2i_items_remaining** <br>(gauge) | Número de elementos de índices que quedan por enviar<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_dcp_2i_items_sent** <br>(gauge) | Número de elementos de índice enviados<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_dcp_2i_producer_count** <br>(gauge) | Número de productores de índices|
| **couchbase.by_bucket.ep_dcp_2i_total_bytes** <br>(gauge) | Número de bytes por segundo que se envían para conexiones DCP de índices<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.ep_dcp_fts_backoff** <br>(gauge) | Número de retrocesos para conexiones DCP de fts|
| **couchbase.by_bucket.ep_dcp_fts_count** <br>(gauge) | Número de conexiones DCP de fts<br>_Se muestra como conexión_ |
| **couchbase.by_bucket.ep_dcp_fts_items_remaining** <br>(gauge) | Número de elementos fts que quedan por enviar<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_dcp_fts_items_sent** <br>(gauge) | Número de elementos fts enviados<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_dcp_fts_producer_count** <br>(gauge) | Número de productores de fts|
| **couchbase.by_bucket.ep_dcp_fts_total_bytes** <br>(gauge) | Número de bytes por segundo que se envían para conexiones DCP de fts<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.ep_dcp_other_backoff** <br>(gauge) | Número de retrocesos para otras conexiones DCP|
| **couchbase.by_bucket.ep_dcp_other_count** <br>(gauge) | Número de otras conexiones DCP<br>_Se muestra como conexión_ |
| **couchbase.by_bucket.ep_dcp_other_items_remaining** <br>(gauge) | Número de otros elementos que quedan por enviar<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_dcp_other_items_sent** <br>(gauge) | Número de otros elementos enviados<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_dcp_other_producer_count** <br>(gauge) | Número de otros productores|
| **couchbase.by_bucket.ep_dcp_other_total_bytes** <br>(gauge) | Número de bytes por segundo que se envían para otras conexiones DCP<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.ep_dcp_replica_backoff** <br>(gauge) | Número de retrocesos para conexiones DCP de réplicas|
| **couchbase.by_bucket.ep_dcp_replica_count** <br>(gauge) | Número de conexiones DCP de réplicas<br>_Se muestra como conexión_ |
| **couchbase.by_bucket.ep_dcp_replica_items_remaining** <br>(gauge) | Número de elementos de réplicas que quedan por enviar<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_dcp_replica_items_sent** <br>(gauge) | Número de elementos de réplicas enviados<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_dcp_replica_producer_count** <br>(gauge) | Número de productores de réplicas|
| **couchbase.by_bucket.ep_dcp_replica_total_bytes** <br>(gauge) | Número de bytes por segundo que se envían para conexiones DCP de réplicas<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.ep_dcp_views_backoff** <br>(gauge) | Número de retrocesos para conexiones DCP de vistas|
| **couchbase.by_bucket.ep_dcp_views_count** <br>(gauge) | Número de conexiones DCP de vistas<br>_Se muestra como conexión_ |
| **couchbase.by_bucket.ep_dcp_views_items_remaining** <br>(gauge) | Número de vistas que quedan por enviar<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_dcp_views_items_sent** <br>(gauge) | Número de elementos de vistas enviados<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_dcp_views_producer_count** <br>(gauge) | Número de productores de vistas|
| **couchbase.by_bucket.ep_dcp_views_total_bytes** <br>(gauge) | Número de bytes por segundo que se envían para conexiones DCP de vistas<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.ep_dcp_xdcr_backoff** <br>(gauge) | Número de retrocesos para conexiones DCP de xdcr|
| **couchbase.by_bucket.ep_dcp_xdcr_count** <br>(gauge) | Número de conexiones DCP de xdcr<br>_Se muestra como conexión_ |
| **couchbase.by_bucket.ep_dcp_xdcr_items_remaining** <br>(gauge) | Número de elementos xdcr que quedan por enviar<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_dcp_xdcr_items_sent** <br>(gauge) | Número de elementos xdcr enviados<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_dcp_xdcr_producer_count** <br>(gauge) | Número de productores de xdcr|
| **couchbase.by_bucket.ep_dcp_xdcr_total_bytes** <br>(gauge) | Número de bytes por segundo que se envían para las conexiones DCP de xdcr<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.ep_diskqueue_drain** <br>(gauge) | Total de elementos drenados en la cola de disco<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_diskqueue_fill** <br>(gauge) | Total de elementos en cola de disco<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_diskqueue_items** <br>(gauge) | Número total de elementos en espera de ser escritos en disco<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_flusher_todo** <br>(gauge) | Número de elementos que se están escribiendo actualmente<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_item_commit_failed** <br>(gauge) | Número de veces que una transacción no se ha podido confirmar debido a errores de almacenamiento<br>_Se muestra como error_ |
| **couchbase.by_bucket.ep_kv_size** <br>(gauge) | Cantidad total de datos de usuario almacenados en la RAM en este bucket<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.ep_max_size** <br>(gauge) | Cantidad máxima de memoria que este bucket puede utilizar<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.ep_mem_high_wat** <br>(gauge) | Uso de memoria máximo para auto-desalojos<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.ep_mem_low_wat** <br>(gauge) | Uso de memoria marca de agua baja para auto-desalojos<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.ep_meta_data_memory** <br>(gauge) | Cantidad total de metadatos de elementos que consumen RAM en este bucket<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.ep_num_non_resident** <br>(gauge) | Número de elementos no residentes<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_num_ops_del_meta** <br>(gauge) | Número de operaciones de borrado por segundo para este bucket como objetivo para XDCR<br>_Se muestra como operación_ |
| **couchbase.by_bucket.ep_num_ops_del_ret_meta** <br>(gauge) | Número de operaciones delRetMeta por segundo para este bucket como objetivo para XDCR<br>_Se muestra como operación_ |
| **couchbase.by_bucket.ep_num_ops_get_meta** <br>(gauge) | Número de operaciones de lectura por segundo para este bucket como objetivo para XDCR<br>_Se muestra como operación_ |
| **couchbase.by_bucket.ep_num_ops_set_meta** <br>(gauge) | Número de operaciones SET por segundo para este bucket como objetivo para XDCR<br>_Se muestra como operación_ |
| **couchbase.by_bucket.ep_num_ops_set_ret_meta** <br>(gauge) | Número de operaciones setRetMeta por segundo para este bucket como objetivo para XDCR<br>_Se muestra como operación_ |
| **couchbase.by_bucket.ep_num_value_ejects** <br>(gauge) | Número de veces que los valores de los elementos se desalojaron de la memoria al disco<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_oom_errors** <br>(gauge) | Número de veces que se han producido errores de falta de memoria irrecuperables durante el procesamiento de operaciones<br>_Se muestra como error_ |
| **couchbase.by_bucket.ep_ops_create** <br>(gauge) | Crear operaciones<br>_Se muestra como operación_ |
| **couchbase.by_bucket.ep_ops_update** <br>(gauge) | Operaciones de actualización<br>_Se muestra como operación_ |
| **couchbase.by_bucket.ep_overhead** <br>(gauge) | Memoria extra utilizada por datos transitorios como colas de persistencia o puntos de control<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.ep_queue_size** <br>(gauge) | Número de elementos en cola para almacenamiento<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_resident_items_rate** <br>(gauge) | Número de elementos residentes<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_tap_replica_queue_drain** <br>(gauge) | Total de elementos drenados en la cola de réplicas<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_tap_total_queue_drain** <br>(gauge) | Total de elementos drenados en la cola<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_tap_total_queue_fill** <br>(gauge) | Total de elementos en cola<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_tap_total_total_backlog_size** <br>(gauge) | Número de elementos restantes para la replicación<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.ep_tmp_oom_errors** <br>(gauge) | Número de veces que se han producido errores de falta de memoria recuperables durante el procesamiento de operaciones<br>_Se muestra como error_ |
| **couchbase.by_bucket.ep_vb_total** <br>(gauge) | Número total de vBuckets para este bucket<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.evictions** <br>(gauge) | Número de desalojos<br>_Se muestra como desalojo_ |
| **couchbase.by_bucket.get_hits** <br>(gauge) | Número de aciertos<br>_Se muestra como acierto_ |
| **couchbase.by_bucket.get_misses** <br>(gauge) | Número de fallos GET<br>_Se muestra como fallo_ |
| **couchbase.by_bucket.hibernated_requests** <br>(gauge) | Número de solicitudes de streaming ahora inactivas<br>_Se muestra como solicitud_ |
| **couchbase.by_bucket.hibernated_waked** <br>(gauge) | Tasa de despertares de solicitudes de streaming<br>_Se muestra como solicitud_ |
| **couchbase.by_bucket.hit_ratio** <br>(gauge) | Porcentaje de aciertos<br>_Se muestra como porcentaje_ |
| **couchbase.by_bucket.incr_hits** <br>(gauge) | Número de aciertos de incrementos<br>_Se muestra como acierto_ |
| **couchbase.by_bucket.incr_misses** <br>(gauge) | Número de fallos de incrementos<br>_Se muestra como fallo_ |
| **couchbase.by_bucket.mem_actual_free** <br>(gauge) | Memoria libre<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.mem_actual_used** <br>(indicador) | Memoria utilizada<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.mem_free** <br>(gauge) | Memoria libre<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.mem_total** <br>(gauge) | Memoria total disponible<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.mem_used** <br>(gauge) | Uso total de memoria del motor (obsoleto)<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.mem_used_sys** <br>(gauge) | Uso de memoria del sistema<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.misses** <br>(gauge) | Número total de fallos<br>_Se muestra como fallo_ |
| **couchbase.by_bucket.ops** <br>(gauge) | Número total de operaciones<br>_Se muestra como operación_ |
| **couchbase.by_bucket.page_faults** <br>(gauge) | Número de fallos de página<br>_Se muestra como página_ |
| **couchbase.by_bucket.replication_docs_rep_queue** <br>(gauge) | <br>_Se muestra como elemento_ |
| **couchbase.by_bucket.replication_meta_latency_aggr** <br>(gauge) | <br>_Se muestra en segundos_ |
| **couchbase.by_bucket.rest_requests** <br>(gauge) | Número de solicitudes HTTP<br>_Se muestra como solicitud_ |
| **couchbase.by_bucket.swap_total** <br>(gauge) | Cantidad total de intercambio disponible<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.swap_used** <br>(gauge) | Cantidad de swap utilizado <br>_Se muestra en bytes_ |
| **couchbase.by_bucket.vb_active_eject** <br>(gauge) | Número de elementos por segundo que se expulsan al disco desde vBuckets activos<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_active_itm_memory** <br>(gauge) | Cantidad de datos de usuario activos almacenados en la RAM en este bucket<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_active_meta_data_memory** <br>(gauge) | Cantidad de metadatos de elementos activos que consumen RAM en este bucket<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_active_num** <br>(gauge) | Número de elementos activos<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_active_num_non_resident** <br>(gauge) | Número de vBuckets no residentes en estado activo para este bucket<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_active_ops_create** <br>(gauge) | Nuevos elementos por segundo que se insertan en vBuckets activos en este bucket<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_active_ops_update** <br>(gauge) | Número de elementos actualizados en vBuckets activos por segundo para este bucket<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_active_queue_age** <br>(gauge) | Suma de la antigüedad de los elementos de la cola del disco en milisegundos<br>_Se muestra en milisegundos_ |
| **couchbase.by_bucket.vb_active_queue_drain** <br>(gauge) | Total de elementos drenados en la cola<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_active_queue_fill** <br>(gauge) | Número de elementos activos por segundo que se ponen en la cola del disco de elementos activos<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_active_queue_size** <br>(gauge) | Número de elementos activos en la cola<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_active_resident_items_ratio** <br>(gauge) | Número de elementos residentes<br>_Se muestra como artículo_ |
| **couchbase.by_bucket.vb_avg_active_queue_age** <br>(gauge) | Antigüedad media en segundos de los elementos activos en la cola de elementos activos<br>_Se muestra en segundos_ |
| **couchbase.by_bucket.vb_avg_pending_queue_age** <br>(gauge) | Antigüedad media en segundos de los elementos pendientes en la cola de elementos pendientes<br>_Se muestra en segundos_ |
| **couchbase.by_bucket.vb_avg_replica_queue_age** <br>(gauge) | Antigüedad media en segundos de los elementos de réplicas en la cola de elementos de réplicas<br>_Se muestra en segundos_ |
| **couchbase.by_bucket.vb_avg_total_queue_age** <br>(gauge) | Antigüedad media de los elementos en la cola<br>_Se muestra en segundos_ |
| **couchbase.by_bucket.vb_pending_curr_items** <br>(gauge) | Número de elementos en vBuckets pendientes<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_pending_eject** <br>(gauge) | Número de elementos por segundo que se expulsan al disco desde vBuckets pendientes<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_pending_itm_memory** <br>(gauge) | Cantidad de datos de usuario pendientes almacenados en la RAM en este bucket<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_pending_meta_data_memory** <br>(gauge) | Cantidad de metadatos de elementos pendientes que consumen RAM en este bucket<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_pending_num** <br>(gauge) | Número de elementos pendientes<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_pending_num_non_resident** <br>(gauge) | Número de vBuckets no residentes en estado pendiente para este bucket<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_pending_ops_create** <br>(gauge) | Número de operaciones de creación pendientes<br>_Se muestra como operación_ |
| **couchbase.by_bucket.vb_pending_ops_update** <br>(gauge) | Número de elementos actualizados en vBuckets pendientes por segundo para este bucket<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_pending_queue_age** <br>(gauge) | Suma de la antigüedad de los elementos de la cola pendientes del disco en milisegundos<br>_Se muestra en milisegundos_ |
| **couchbase.by_bucket.vb_pending_queue_drain** <br>(gauge) | Total de elementos pendientes drenados en la cola<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_pending_queue_fill** <br>(gauge) | Total de elementos pendientes en cola del disco<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_pending_queue_size** <br>(gauge) | Número de elementos pendientes en la cola<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_pending_resident_items_ratio** <br>(gauge) | Número de elementos residentes pendientes<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_replica_curr_items** <br>(gauge) | Número de elementos en memoria<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_replica_eject** <br>(gauge) | Número de elementos por segundo que se expulsan al disco desde vBuckets de réplica<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_replica_itm_memory** <br>(gauge) | Cantidad de datos de usuario de réplica almacenados en la RAM en este bucket<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_replica_meta_data_memory** <br>(gauge) | Memoria total de metadatos<br>_Se muestra en bytes_ |
| **couchbase.by_bucket.vb_replica_num** <br>(gauge) | Número de vBuckets de réplica<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_replica_num_non_resident** <br>(gauge) | Número de vBuckets no residentes en estado de réplica para este bucket<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_replica_ops_create** <br>(gauge) | Número de operaciones de creación de réplicas<br>_Se muestra como operación_ |
| **couchbase.by_bucket.vb_replica_ops_update** <br>(gauge) | Número de elementos actualizados en vBuckets de réplica por segundo para este bucket<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_replica_queue_age** <br>(gauge) | Suma de la antigüedad de los elementos de la cola de réplicas en milisegundos<br>_Se muestra en milisegundos_ |
| **couchbase.by_bucket.vb_replica_queue_drain** <br>(gauge) | Total de elementos de réplicas drenados en la cola<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_replica_queue_fill** <br>(gauge) | Total de elementos de réplicas en cola del disco<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_replica_queue_size** <br>(gauge) | Elementos de réplicas en cola del disco<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_replica_resident_items_ratio** <br>(gauge) | Número de elementos de réplicas residentes<br>_Se muestra como elemento_ |
| **couchbase.by_bucket.vb_total_queue_age** <br>(gauge) | Suma de la antigüedad de los elementos de la cola del disco en milisegundos<br>_Se muestra en milisegundos_ |
| **couchbase.by_bucket.xdc_ops** <br>(gauge) | Número de operaciones de replicación entre centros de datos<br>_Se muestra como operación_ |
| **couchbase.by_node.cmd_get** <br>(gauge) | Operaciones GET realizadas en el nodo<br>_Se muestra como get_ |
| **couchbase.by_node.couch_docs_actual_disk_size** <br>(gauge) | Tamaño total de documentos Couch en disco en bytes<br>_Se muestra en bytes_ |
| **couchbase.by_node.couch_docs_data_size** <br>(gauge) | Tamaño total de documentos Couch en bytes<br>_Se muestra en bytes_ |
| **couchbase.by_node.couch_spatial_data_size** <br>(gauge) | Tamaño de datos de objeto para vistas espaciales<br>_Se muestra en bytes_ |
| **couchbase.by_node.couch_spatial_disk_size** <br>(gauge) | Cantidad de espacio en disco ocupado por vistas espaciales<br>_Se muestra en bytes_ |
| **couchbase.by_node.couch_views_actual_disk_size** <br>(gauge) | Tamaño total de vistas Couch en disco en bytes<br>_Se muestra en bytes_ |
| **couchbase.by_node.couch_views_data_size** <br>(gauge) | Tamaño de los datos de vistas Couch en disco en bytes<br>_Se muestra en bytes_ |
| **couchbase.by_node.curr_items** <br>(gauge) | Número de elementos activos en memoria<br>_Se muestra como elemento_ |
| **couchbase.by_node.curr_items_tot** <br>(gauge) | Número total de elementos<br>_Se muestra como elemento_ |
| **couchbase.by_node.ep_bg_fetched** <br>(gauge) | Lecturas de disco por segundo<br>_Se muestra como recuperación_ |
| **couchbase.by_node.get_hits** <br>(gauge) | Número de aciertos<br>_Se muestra como acierto_ |
| **couchbase.by_node.index_data_size** <br>(gauge) | Tamaño de datos del índice<br>_Se muestra en bytes_ |
| **couchbase.by_node.index_disk_size** <br>(gauge) | Tamaño del disco del índice<br>_Se muestra en bytes_ |
| **couchbase.by_node.mem_used** <br>(gauge) | Uso total de memoria del motor (obsoleto)<br>_Se muestra en bytes_ |
| **couchbase.by_node.ops** <br>(gauge) | Número total de operaciones<br>_Se muestra como operación_ |
| **couchbase.by_node.vb_active_num_non_resident** <br>(gauge) | Número de vBuckets no residentes en estado activo para este bucket<br>_Se muestra como elemento_ |
| **couchbase.by_node.vb_replica_curr_items** <br>(gauge) | Número de elementos en memoria<br>_Se muestra como elemento_ |
| **couchbase.hdd.free** <br>(gauge) | Espacio libre en el disco duro<br>_Se muestra en bytes_ |
| **couchbase.hdd.quota_total** <br>(gauge) | Cuota de disco duro<br>_Se muestra en bytes_ |
| **couchbase.hdd.total** <br>(gauge) | Espacio total en disco duro<br>_Se muestra en bytes_ |
| **couchbase.hdd.used** <br>(gauge) | Espacio utilizado en el disco duro<br>_Se muestra en bytes_ |
| **couchbase.hdd.used_by_data** <br>(gauge) | Disco duro utilizado para los datos<br>_Se muestra en bytes_ |
| **couchbase.index.avg_drain_rate** <br>(gauge) | \[Couchbase >= 7\] Número medio de elementos descargados de la memoria al disco duro por segundo<br>_Se muestra como elemento_ |
| **couchbase.index.avg_item_size** <br>(gauge) | \[Couchbase >= 7\] Tamaño medio de las claves<br>_Se muestra en bytes_ |
| **couchbase.index.avg_scan_latency** <br>(gauge) | \[Couchbase >= 7\] Tiempo medio para atender una solicitud de análisis<br>_Se muestra en nanosegundos_ |
| **couchbase.index.cache_hit_percent** <br>(gauge) | \[Couchbase >= 7\] Porcentaje de accesos a memoria que se atendieron desde la caché gestionada<br>_Se muestra como porcentaje_ |
| **couchbase.index.cache_hits** <br>(count) | \[Couchbase >= 7\] Número de accesos a los datos de este índice desde la RAM|
| **couchbase.index.cache_misses** <br>(count) | \[Couchbase >= 7\] Número de accesos a los datos de este índice desde el disco|
| **couchbase.index.data_size** <br>(gauge) | \[Couchbase >= 7\] Tamaño de los datos indexables que se conserva para el índice o la partición<br>_Se muestra en bytes_ |
| **couchbase.index.disk_size** <br>(gauge) | \[Couchbase >= 7\] Tamaño total de archivos de disco consumidos por el índice o la partición<br>_Se muestra en bytes_ |
| **couchbase.index.frag_percent** <br>(gauge) | \[Couchbase >= 7\] Porcentaje de fragmentación del índice<br>_Se muestra como porcentaje_ |
| **couchbase.index.initial_build_progress** <br>(gauge) | \[Couchbase >= 7\] Porcentaje del progreso de la compilación inicial para el índice. Cuando se completa la compilación inicial, el valor es 100. Para una partición de índice, el valor es 0<br>_Se muestra como porcentaje_ |
| **couchbase.index.items_count** <br>(count) | \[Couchbase >= 7\] Número de elementos actualmente indexados<br>_Se muestra como elemento_ |
| **couchbase.index.last_known_scan_time** <br>(gauge) | \[Couchbase >= 7\] Marca de tiempo de la última solicitud de análisis recibida para este índice (marca de tiempo Unix en nanosegundos). Esto puede ser útil para determinar si este índice está actualmente sin usar. Nota: Esta estadística se guarda en el disco cada 15 minutos, por lo que se conserva cuando se reinicia el indexador<br>_Se muestra en nanosegundos_ |
| **couchbase.index.memory_used** <br>(gauge) | \[Couchbase >= 7\] Cantidad de memoria utilizada por el índice<br>_Se muestra en bytes_ |
| **couchbase.index.num_docs_indexed** <br>(count) | \[Couchbase >= 7\] Número de documentos indexados por el indexador desde el último inicio<br>_Se muestra como documento_ |
| **couchbase.index.num_docs_pending** <br>(gauge) | \[Couchbase >= 7\] Número de documentos pendientes de indexación<br>_Se muestra como documento_ |
| **couchbase.index.num_docs_queued** <br>(gauge) | \[Couchbase >= 7\] Número de documentos en cola para ser indexados<br>_Se muestra como documento_ |
| **couchbase.index.num_items_flushed** <br>(count) | \[Couchbase >= 7\] Número de elementos descargados de la memoria al almacenamiento en disco<br>_Se muestra como elemento_ |
| **couchbase.index.num_pending_requests** <br>(gauge) | \[Couchbase >= 7\] Número de solictudes recibidas pero aún no atendidas por el indexador<br>_Se muestra como solicitud_ |
| **couchbase.index.num_requests** <br>(count) | \[Couchbase >= 7\] Número de solicitudes atendidas por el indexador desde el último inicio<br>_Se muestra como solicitud_ |
| **couchbase.index.num_rows_returned** <br>(count) | \[Couchbase >= 7\] Número total de filas devueltas hasta el momento por el indexador<br>_Se muestra como fila_ |
| **couchbase.index.num_scan_errors** <br>(count) | \[Couchbase >= 7\] Número de solicitudes fallidas debido a errores distintos de tiempo de espera excedido<br>_Se muestra como solicitud_ |
| **couchbase.index.num_scan_timeouts** <br>(count) | \[Couchbase >= 7\] Número de solicitudes con tiempos de espera excedidos, ya sea en espera de snapshots o durante el análisis en curso<br>_Se muestra como solicitud_ |
| **couchbase.index.recs_in_mem** <br>(gauge) | \[Couchbase >= 7\] Para el almacenamiento de índices estándar, este es el número de registros de este índice que se almacenan en la memoria. Para el almacenamiento de índices optimizado para la memoria, es igual a items_count<br>_Se muestra como registro_ |
| **couchbase.index.recs_on_disk** <br>(gauge) | \[Couchbase >= 7\] Para el almacenamiento de índices estándar, este es el número de registros de este índice que se almacenan en el disco. Para almacenamiento de índices optimizado para la memoria, es 0<br>_Se muestra como registro_ |
| **couchbase.index.resident_percent** <br>(gauge) | \[Couchbase >= 7\] Porcentaje de datos conservados en memoria<br>_Se muestra como porcentaje_ |
| **couchbase.index.scan_bytes_read** <br>(count) | \[Couchbase >= 7\] Número de bytes leídos por un análisis desde el último inicio<br>_Se muestra en bytes_ |
| **couchbase.index.total_scan_duration** <br>(gauge) | \[Couchbase >= 7\] Tiempo total empleado por el indexador para analizar filas desde el último inicio<br>_Se muestra en nanosegundos_ |
| **couchbase.indexer.indexer_state** <br>(gauge) | \[Couchbase >= 7\] Estado actual del servicio de indexación en este nodo (0 = Activo, 1 = Pausa, 2 = Calentamiento)|
| **couchbase.indexer.memory_quota** <br>(gauge) | \[Couchbase >= 7\] Cuota de memoria asignada al servicio de indexación en este nodo por la configuración del usuario<br>_Se muestra en bytes_ |
| **couchbase.indexer.memory_total_storage** <br>(gauge) | \[Couchbase >= 7\] Tamaño total asignado en el indexador a través de todos los índices. También tiene en cuenta la fragmentación de la memoria<br>_Se muestra en bytes_ |
| **couchbase.indexer.memory_used** <br>(gauge) | \[Couchbase >= 7\] Cantidad de memoria utilizada por el servicio de indexación en este nodo<br>_Se muestra en bytes_ |
| **couchbase.indexer.total_indexer_gc_pause_ns** <br>(gauge) | \[Couchbase >= 7\] Tiempo total que el indexador ha pasado con la recolección de basura en pausa desde el último inicio<br>_Se muestra en nanosegundos_ |
| **couchbase.query.cores** <br>(gauge) | <br>_Se muestra como núcleo_ |
| **couchbase.query.cpu_sys_percent** <br>(gauge) | <br>_Se muestra como porcentaje_ |
| **couchbase.query.cpu_user_percent** <br>(gauge) | <br>_Se muestra como porcentaje_ |
| **couchbase.query.gc_num** <br>(gauge) | |
| **couchbase.query.gc_pause_percent** <br>(gauge) | <br>_Se muestra como porcentaje_ |
| **couchbase.query.gc_pause_time** <br>(gauge) | <br>_Se muestra en segundos_ |
| **couchbase.query.memory_system** <br>(gauge) | <br>_Se muestra en bytes_ |
| **couchbase.query.memory_total** <br>(gauge) | <br>_Se muestra en bytes_ |
| **couchbase.query.memory_usage** <br>(gauge) | <br>_Se muestra en bytes_ |
| **couchbase.query.request_active_count** <br>(gauge) | <br>_Se muestra como solicitud_ |
| **couchbase.query.request_completed_count** <br>(gauge) | <br>_Se muestra como solicitud_ |
| **couchbase.query.request_per_sec_15min** <br>(gauge) | <br>_Se muestra como solicitud_ |
| **couchbase.query.request_per_sec_1min** <br>(gauge) | <br>_Se muestra como solicitud_ |
| **couchbase.query.request_per_sec_5min** <br>(gauge) | <br>_Se muestra como solicitud_ |
| **couchbase.query.request_prepared_percent** <br>(gauge) | <br>_Se muestra como solicitud_ |
| **couchbase.query.request_time_80percentile** <br>(gauge) | <br>_Se muestra en segundos_ |
| **couchbase.query.request_time_95percentile** <br>(gauge) | <br>_Se muestra en segundos_ |
| **couchbase.query.request_time_99percentile** <br>(gauge) | <br>_Se muestra en segundos_ |
| **couchbase.query.request_time_mean** <br>(gauge) | <br>_Se muestra en segundos_ |
| **couchbase.query.request_time_median** <br>(gauge) | <br>_Se muestra en segundos_ |
| **couchbase.query.total_threads** <br>(gauge) | <br>_Se muestra como subproceso_ |
| **couchbase.ram.quota_total** <br>(gauge) | Cuota de RAM<br>_Se muestra en bytes_ |
| **couchbase.ram.quota_total_per_node** <br>(gauge) | Cuota de RAM<br>_Se muestra en bytes_ |
| **couchbase.ram.quota_used** <br>(gauge) | Cuota de RAM utilizada<br>_Se muestra en bytes_ |
| **couchbase.ram.quota_used_per_node** <br>(gauge) | Cuota de RAM utilizada<br>_Se muestra en bytes_ |
| **couchbase.ram.total** <br>(gauge) | RAM total<br>_Se muestra en bytes_ |
| **couchbase.ram.used** <br>(gauge) | RAM en uso<br>_Se muestra en bytes_ |
| **couchbase.ram.used_by_data** <br>(gauge) | RAM utilizada para datos<br>_Se muestra en bytes_ |
| **couchbase.sync_gateway.admin_net_bytes_recv** <br>(count) | Número total de bytes recibidos (desde el inicio del nodo) en la interfaz de red a la que está vinculada la interfaz de administración de Sync Gateway.<br>_Se muestra en bytes_ |
| **couchbase.sync_gateway.admin_net_bytes_sent** <br>(count) | Número total de bytes enviados (desde el inicio del nodo) en la interfaz de red a la que está vinculada la interfaz de administración de Sync Gateway.<br>_Se muestra en bytes_ |
| **couchbase.sync_gateway.cache.abandoned_seqs** <br>(count) | Número total de secuencias omitidas que no se encontraron al cabo de 60 minutos y se abandonaron.|
| **couchbase.sync_gateway.cache.chan_cache_active_revs** <br>(count) | Número total de revisiones activas en la caché de canal.|
| **couchbase.sync_gateway.cache.chan_cache_bypass_count** <br>(count) | Número total de cachés de canal de omisión transitoria creadas para atender solicitudes cuando la caché de canal estaba al límite de su capacidad.|
| **couchbase.sync_gateway.cache.chan_cache_channels_added** <br>(count) | Número total de cachés de canal añadidas.|
| **couchbase.sync_gateway.cache.chan_cache_channels_evicted_inactive** <br>(count) | Número total de cachés de canal desalojadas por inactividad.|
| **couchbase.sync_gateway.cache.chan_cache_channels_evicted_nru** <br>(count) | Número total de cachés de canal activas desalojadas, según el criterio de "no utilizados recientemente".|
| **couchbase.sync_gateway.cache.chan_cache_compact_count** <br>(count) | Número total de ejecuciones de compactación de cachés de canal.|
| **couchbase.sync_gateway.cache.chan_cache_compact_time** <br>(count) | Cantidad total de tiempo que tarda la compactación de cachés de canal en todas las ejecuciones de compactación.|
| **couchbase.sync_gateway.cache.chan_cache_hits** <br>(count) | Número total de solicitudes de cachés de canal atendidas completamente por la caché.<br>_Se muestra como acierto_ |
| **couchbase.sync_gateway.cache.chan_cache_max_entries** <br>(count) | Tamaño total de la caché de canal más grande.<br>_Se muestra como entrada_ |
| **couchbase.sync_gateway.cache.chan_cache_misses** <br>(count) | Número total de solicitudes de cachés de canal no atendidas completamente por la caché.<br>_Se muestra como fallo_ |
| **couchbase.sync_gateway.cache.chan_cache_num_channels** <br>(count) | Número total de canales que se están almacenando en caché.|
| **couchbase.sync_gateway.cache.chan_cache_pending_queries** <br>(count) | Número total de consultas pendientes de la caché de canal.|
| **couchbase.sync_gateway.cache.chan_cache_removal_revs** <br>(count) | Número total de revisiones de eliminación en la caché de canal.|
| **couchbase.sync_gateway.cache.chan_cache_tombstone_revs** <br>(count) | Número total de revisiones de lápidas en la caché de canal.|
| **couchbase.sync_gateway.cache.high_seq_cached** <br>(gauge) | Número de secuencia más alto almacenado en caché.|
| **couchbase.sync_gateway.cache.high_seq_stable** <br>(gauge) | Número de secuencia contiguo más alto que se ha almacenado en caché.|
| **couchbase.sync_gateway.cache.num_active_channels** <br>(count) | Número total de canales activos.|
| **couchbase.sync_gateway.cache.num_skipped_seqs** <br>(count) | Número total de secuencias omitidas.|
| **couchbase.sync_gateway.cache.pending_seq_len** <br>(count) | Número total de secuencias pendientes. Se trata de entradas fuera de secuencia a la espera de ser almacenadas en caché.|
| **couchbase.sync_gateway.cache.rev_cache_bypass** <br>(count) | Número total de operaciones de omisión de caché de revisión realizadas.|
| **couchbase.sync_gateway.cache.rev_cache_hits** <br>(count) | Número total de aciertos de caché de revisión.<br>_Se muestra como acierto_ |
| **couchbase.sync_gateway.cache.rev_cache_misses** <br>(count) | Número total de fallos de caché de revisión.<br>_Se muestra como fallo_ |
| **couchbase.sync_gateway.cache.skipped_seq_len** <br>(gauge) | Longitud actual de la cola de secuencias omitidas pendientes.|
| **couchbase.sync_gateway.cbl_replication_pull.attachment_pull_bytes** <br>(count) | Tamaño total de los archivos adjuntos extraídos. Este es el tamaño precomprimido.|
| **couchbase.sync_gateway.cbl_replication_pull.attachment_pull_count** <br>(count) | Número total de archivos adjuntos extraídos.|
| **couchbase.sync_gateway.cbl_replication_pull.max_pending** <br>(gauge) | La marca de agua más alta para el número de documentos almacenados durante el procesamiento de flujos, a la espera de una secuencia anterior que falta.<br>_Se muestra como documento_ |
| **couchbase.sync_gateway.cbl_replication_pull.num_pull_repl_active_continuous** <br>(count) | Número total de réplicas pull continuas en estado activo.|
| **couchbase.sync_gateway.cbl_replication_pull.num_pull_repl_active_one_shot** <br>(count) | Número total de réplicas pull one-shot en estado activo.|
| **couchbase.sync_gateway.cbl_replication_pull.num_pull_repl_caught_up** <br>(count) | Número de réplicas que se han puesto al día con los últimos cambios.|
| **couchbase.sync_gateway.cbl_replication_pull.num_pull_repl_since_zero** <br>(count) | Número total de nuevas réplicas iniciadas (/\_changes?since=0).|
| **couchbase.sync_gateway.cbl_replication_pull.num_pull_repl_total_caught_up** <br>(gauge) | Número total de réplicas que se han puesto al día con los últimos cambios.|
| **couchbase.sync_gateway.cbl_replication_pull.num_pull_repl_total_continuous** <br>(count) | Número total de réplicas pull continuas.|
| **couchbase.sync_gateway.cbl_replication_pull.num_pull_repl_total_one_shot** <br>(count) | Número total de réplicas pull únicas.|
| **couchbase.sync_gateway.cbl_replication_pull.num_replications_active** <br>(count) | Número total de réplicas activas.|
| **couchbase.sync_gateway.cbl_replication_pull.request_changes_count** <br>(count) | Número total de cambios solicitados.|
| **couchbase.sync_gateway.cbl_replication_pull.request_changes_time** <br>(count) | Esta métrica puede utilizarse para calcular la latencia de los cambios solicitados:|
| **couchbase.sync_gateway.cbl_replication_pull.rev_processing_time** <br>(count) | Cantidad total de tiempo procesando mensajes de revisión durante la revisión pull.|
| **couchbase.sync_gateway.cbl_replication_pull.rev_send_count** <br>(count) | Número total de mensajes de revisión procesados durante la replicación.|
| **couchbase.sync_gateway.cbl_replication_pull.rev_send_latency** <br>(count) | Tiempo total transcurrido entre la recepción de una solicitud de revisión por parte de Sync Gateway y el envío de dicha revisión.|
| **couchbase.sync_gateway.cbl_replication_push.attachment_push_bytes** <br>(count) | Número total de bytes de archivos adjuntos enviados<br>_Se muestra en bytes_ |
| **couchbase.sync_gateway.cbl_replication_push.attachment_push_count** <br>(count) | Número total de archivos adjuntos enviados.|
| **couchbase.sync_gateway.cbl_replication_push.doc_push_count** <br>(count) | Número total de documentos enviados<br>_Se muestra como documento_ |
| **couchbase.sync_gateway.cbl_replication_push.propose_change_count** <br>(count) | Número total de cambios o mensajes proposeChanges procesados desde el inicio del nodo.<br>_Se muestra como mensaje_ |
| **couchbase.sync_gateway.cbl_replication_push.propose_change_time** <br>(count) | Tiempo total empleado en procesar cambios o mensajes proposeChanges.|
| **couchbase.sync_gateway.cbl_replication_push.sync_function_count** <br>(count) | Número total de veces que se evalúa la sync_function.|
| **couchbase.sync_gateway.cbl_replication_push.sync_function_time** <br>(count) | Tiempo total empleado en evaluar la sync_function.|
| **couchbase.sync_gateway.cbl_replication_push.write_processing_time** <br>(count) | Tiempo total empleado en procesar escrituras.|
| **couchbase.sync_gateway.database.abandoned_seqs** <br>(count) | Número total de secuencias omitidas abandonadas.|
| **couchbase.sync_gateway.database.cache_feed.dcp_backfill_completed** <br>(count) | Número total de elementos backfill procesados.|
| **couchbase.sync_gateway.database.cache_feed.dcp_backfill_expected** <br>(count) | Número total previsto de secuencias en backfill.|
| **couchbase.sync_gateway.database.cache_feed.dcp_rollback_count** <br>(count) | Número total de rollbacks que se producen.|
| **couchbase.sync_gateway.database.conflict_write_count** <br>(count) | Número total de escrituras que han dejado el documento en estado conflictivo. Incluye conflictos nuevos y mutaciones que no resuelven conflictos existentes.|
| **couchbase.sync_gateway.database.crc32c_match_count** <br>(count) | Número total de instancias durante la importación en las que el adc del documento había cambiado, pero el documento no se importó porque el cuerpo del documento no había cambiado.|
| **couchbase.sync_gateway.database.dcp_caching_count** <br>(count) | Número total de mutaciones DCP añadidas a la caché de canal de Sync Gateway.|
| **couchbase.sync_gateway.database.dcp_caching_time** <br>(count) | El tiempo total entre que una mutación DCP llega a Sync Gateway y se añade a la caché de canal.|
| **couchbase.sync_gateway.database.dcp_received_count** <br>(count) | Número total de mutaciones de documentos recibidas por Sync Gateway a través de DCP.|
| **couchbase.sync_gateway.database.dcp_received_time** <br>(gauge) | Tiempo transcurrido entre la escritura de un documento y su recepción por parte de Sync Gateway a través de DCP.|
| **couchbase.sync_gateway.database.doc_reads_bytes_blip** <br>(count) | Número total de bytes leídos a través de la replicación de Couchbase Lite 2.x desde el inicio del nodo Sync Gateway.|
| **couchbase.sync_gateway.database.doc_writes_bytes** <br>(count) | Número total de bytes escritos como parte de escrituras de documentos desde el inicio del nodo Sync Gateway.|
| **couchbase.sync_gateway.database.doc_writes_bytes_blip** <br>(count) | Número total de bytes escritos como parte de escrituras de documentos de Couchbase Lite 2.x desde el inicio del nodo Sync Gateway.|
| **couchbase.sync_gateway.database.doc_writes_xattr_bytes** <br>(count) | Tamaño total de xattrs escritos (en bytes).<br>_Se muestra en bytes_ |
| **couchbase.sync_gateway.database.high_seq_feed** <br>(gauge) | Número de secuencia más alto visto en el flujo DCP de almacenamiento en caché.|
| **couchbase.sync_gateway.database.import_feed.dcp_backfill_completed** <br>(count) | Número total de elementos backfill procesados.|
| **couchbase.sync_gateway.database.import_feed.dcp_backfill_expected** <br>(count) | Número total previsto de secuencias en backfill.|
| **couchbase.sync_gateway.database.import_feed.dcp_rollback_count** <br>(count) | Número total de rollbacks que se producen.|
| **couchbase.sync_gateway.database.num_doc_reads_blip** <br>(count) | Número total de documentos leídos a través de la replicación de Couchbase Lite 2.x desde el inicio del nodo Sync Gateway.<br>_Se muestra como documento_ |
| **couchbase.sync_gateway.database.num_doc_reads_rest** <br>(count) | Número total de documentos leídos a través de la API REST desde el inicio del nodo Sync Gateway. Incluye la replicación de Couchbase Lite 1.x.<br>_Se muestra como documento_ |
| **couchbase.sync_gateway.database.num_doc_writes** <br>(count) | Número total de documentos escritos por cualquier medio (replicación, interacción con la API rest o importaciones) desde el inicio del nodo Sync Gateway.<br>_Se muestra como documento_ |
| **couchbase.sync_gateway.database.num_replications_active** <br>(count) | Número total de réplicas activas.|
| **couchbase.sync_gateway.database.num_replications_total** <br>(count) | Número total de réplicas creadas desde el inicio del nodo Sync Gateway.|
| **couchbase.sync_gateway.database.num_tombstones_compacted** <br>(gauge) | Número de lápidas compactadas.|
| **couchbase.sync_gateway.database.sequence_assigned_count** <br>(gauge) | Número total de números de secuencia asignados.|
| **couchbase.sync_gateway.database.sequence_get_count** <br>(gauge) | Número total de búsquedas de secuencias altas.|
| **couchbase.sync_gateway.database.sequence_incr_count** <br>(count) | Número total de veces que se ha incrementado el documento contador de secuencias.|
| **couchbase.sync_gateway.database.sequence_released_count** <br>(count) | Número total de secuencias reservadas no utilizadas liberadas por Sync Gateway.|
| **couchbase.sync_gateway.database.sequence_reserved_count** <br>(count) | Número total de secuencias reservadas por Sync Gateway.|
| **couchbase.sync_gateway.database.warn_channels_per_doc_count** <br>(count) | Número total de advertencias relacionadas con el recuento de canales que superan el umbral de recuento de canales.|
| **couchbase.sync_gateway.database.warn_grants_per_doc_count** <br>(count) | Número total de advertencias relacionadas con el recuento de concesiones que superan el umbral de recuento de concesiones.|
| **couchbase.sync_gateway.database.warn_xattr_size_count** <br>(count) | Número total de advertencias relacionadas con los datos de sincronización de xattr que superan un umbral configurado.|
| **couchbase.sync_gateway.error_count** <br>(count) | Número total de errores registrados.<br>_Se muestra como error_ |
| **couchbase.sync_gateway.go_memstats_heapalloc** <br>(gauge) | Bytes de objetos heap asignados<br>_Se muestra en bytes_ |
| **couchbase.sync_gateway.go_memstats_heapidle** <br>(gauge) | Bytes en tramos inactivos (no utilizados).<br>_Se muestra en bytes_ |
| **couchbase.sync_gateway.go_memstats_heapinuse** <br>(gauge) | Bytes en tramos en uso.<br>_Se muestra en bytes_ |
| **couchbase.sync_gateway.go_memstats_heapreleased** <br>(gauge) | Bytes de memoria física devueltos al SO.<br>_Se muestra en bytes_ |
| **couchbase.sync_gateway.go_memstats_pausetotalns** <br>(gauge) | Buffer circular de tiempos de pausa de la recolección de basura recientes<br>_Se muestra en nanosegundos_ |
| **couchbase.sync_gateway.go_memstats_stackinuse** <br>(gauge) | Bytes en tramos de stack tecnológico<br>_Se muestra en bytes_ |
| **couchbase.sync_gateway.go_memstats_stacksys** <br>(gauge) | Bytes de memoria de stack tecnológico obtenidos del SO.<br>_Se muestra en bytes_ |
| **couchbase.sync_gateway.go_memstats_sys** <br>(gauge) | Bytes de memoria obtenidos del SO para las estructuras mspan.<br>_Se muestra en bytes_ |
| **couchbase.sync_gateway.goroutines_high_watermark** <br>(gauge) | Número máximo de goroutines desde el inicio del proceso.|
| **couchbase.sync_gateway.num_goroutines** <br>(count) | Número total de goroutines.|
| **couchbase.sync_gateway.process_cpu_percent_utilization** <br>(gauge) | Uso de CPU como valor porcentual.<br>_Se muestra como porcentaje_ |
| **couchbase.sync_gateway.process_memory_resident** <br>(gauge) | Uso de memoria (Resident Set Size) del proceso.<br>_Se muestra en bytes_ |
| **couchbase.sync_gateway.pub_net_bytes_recv** <br>(count) | Uso de memoria (Resident Set Size) del proceso.<br>_Se muestra en bytes_ |
| **couchbase.sync_gateway.pub_net_bytes_sent** <br>(count) | Número total de bytes enviados (desde el inicio del nodo) en la interfaz de red a la que está vinculada la interfaz pública de Sync Gateway.<br>_Se muestra en bytes_ |
| **couchbase.sync_gateway.security.auth_failed_count** <br>(count) | Número total de autenticaciones fallidas.|
| **couchbase.sync_gateway.security.auth_success_count** <br>(count) | Número total de autenticaciones exitosas.<br>_Se muestra como exitoso_ |
| **couchbase.sync_gateway.security.num_access_errors** <br>(count) | Número total de documentos rechazados por las funciones de acceso de escritura (requireAccess, requireRole, requireUser).<br>_Se muestra como documento_ |
| **couchbase.sync_gateway.security.num_docs_rejected** <br>(count) | Número total de documentos rechazados por la sync_function<br>_Se muestra como documento_ |
| **couchbase.sync_gateway.security.total_auth_time** <br>(count) | Tiempo total empleado en autenticar todas las solicitudes.|
| **couchbase.sync_gateway.shared_bucket_import.import_cancel_cas** <br>(count) | Número total de importaciones canceladas por fallo del cas.|
| **couchbase.sync_gateway.shared_bucket_import.import_count** <br>(count) | Número total de documentos importados.<br>_Se muestra como documento_ |
| **couchbase.sync_gateway.shared_bucket_import.import_error_count** <br>(count) | Número total de errores producidos como resultado de la importación de un documento.<br>_Se muestra como error_ |
| **couchbase.sync_gateway.shared_bucket_import.import_high_seq** <br>(gauge) | El valor más alto del número de secuencias importado.|
| **couchbase.sync_gateway.shared_bucket_import.import_partitions** <br>(count) | Número total de particiones de importación.|
| **couchbase.sync_gateway.shared_bucket_import.import_processing_time** <br>(count) | Tiempo total que se tarda en procesar la importación de un documento.|
| **couchbase.sync_gateway.system_memory_total** <br>(count) | Memoria total disponible en el sistema en bytes.<br>_Se muestra en bytes_ |
| **couchbase.sync_gateway.warn_count** <br>(count) | Número total de advertencias registradas.<br>_Se muestra en bytes_ |

### Eventos

El check de Couchbase emite un evento a Datadog cada vez que se reequilibra el clúster.

### Checks de servicio

**couchbase.can_connect**

Devuelve el estado después de hacer ping a tu instancia Couchbase. En el mensaje de comprobación se incluye información adicional sobre el estado de la respuesta en el momento de la recopilación.

_Estados: ok, critical_

**couchbase.by_node.cluster_membership**

Devuelve `CRITICAL` si el nodo ha fallado. Devuelve `WARNING` si el nodo se ha añadido al clúster pero está esperando un reequilibrio para activarse. En caso contrario, devuelve `OK`.

_Estados: ok, warning, critical_

**couchbase.by_node.health**

Devuelve `CRITICAL` si el nodo no es saludable. Devuelve `OK` en caso contrario.

_Estados: ok, crítico_

**couchbase.index_stats.can_connect**

Devuelve `OK` si se puede llegar al punto final de estadísticas de índices. En caso contrario, devuelve `CRITICAL`.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesita ayuda? Póngase en contacto con [Datadog support](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [monitor (noun) métricas clave de Couchbase](https://www.datadoghq.com/blog/monitoring-couchbase-performance-datadog).