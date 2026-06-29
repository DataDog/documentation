---
app_id: cassandra
categories:
- caching
- data stores
- log collection
custom_kind: integración
description: Realice un seguimiento del rendimiento, la capacidad y el estado general
  del clúster, y mucho más.
further_reading:
- link: https://www.datadoghq.com/blog/how-to-monitor-cassandra-performance-metrics
  tag: blog
  text: Monitorizar métricas de rendimiento de Cassandra
- link: https://www.datadoghq.com/blog/how-to-collect-cassandra-metrics
  tag: blog
  text: Recopilar métricas de Cassandra
- link: https://www.datadoghq.com/blog/monitoring-cassandra-with-datadog
  tag: blog
  text: Monitorización de Cassandra con Datadog
integration_version: 3.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Cassandra
---
![Dashboard predeterminado de Cassandra](https://raw.githubusercontent.com/DataDog/integrations-core/master/cassandra/images/cassandra_dashboard_2.png)

## Información general

Obtén métricas de Cassandra en tiempo real para:

- Visualizar y monitorizar estados de Cassandra.
- Recibir notificaciones sobre conmutaciones por error y eventos de Cassandra.

## Configuración

### Instalación

El check de Cassandra está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus nodos Cassandra. Se recomienda utilizar el JDK de Oracle para esta integración.

**Nota**: Este check tiene un límite de 350 métricas por instancia. El número de métricas devueltas se indica en [la página de estado](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information). Puedes especificar las métricas que te interesen editando la siguiente configuración. Para saber cómo personalizar las métricas que debes recopilar, consulta la [documentación de JMX](https://docs.datadoghq.com/integrations/java/) para obtener instrucciones detalladas. Si necesitas monitorizar más métricas, ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

### Configuración

##### Recopilación de métricas

1. La configuración predeterminada de tu archivo `cassandra.d/conf.yaml` activa la recopilación de tus [métricas de Cassandra](#metrics). Para conocer todas las opciones de configuración disponibles, consulta el [ejemplo de cassandra.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example)

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

Para los entornos de contenedores, sigue las instrucciones de las páginas [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/containers/kubernetes/log/) o [Recopilación de logs de Docker](https://docs.datadoghq.com/containers/docker/log/).

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `cassandra.d/conf.yaml` para empezar a recopilar tus logs de Cassandra:

   ```yaml
     logs:
       - type: file
         path: /var/log/cassandra/*.log
         source: cassandra
         service: myapplication
         log_processing_rules:
            - type: multi_line
              name: log_start_with_date
              # pattern to match: DEBUG [ScheduledTasks:1] 2019-12-30
              pattern: '[A-Z]+ +\[[^\]]+\] +\d{4}-\d{2}-\d{2}'
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno. Consulta el [ejemplo de cassandra.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   Para asegurarte de que los stacktraces se agregan correctamente como un único log, se puede añadir una [regla de procesamiento multilínea](https://docs.datadoghq.com/agent/logs/advanced_log_collection/?tab=exclude_at_match#multi-line-aggregation).

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `cassandra` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **cassandra.active_tasks** <br>(gauge) | Número de tareas que el grupo de subprocesos está ejecutando activamente.<br>_Se muestra como tarea_ |
| **cassandra.bloom_filter_false_ratio** <br>(gauge) | Proporción de falsos positivos del filtro Bloom respecto del total de checks.<br>_Se muestra como fracción_ |
| **cassandra.bytes_flushed.count** <br>(gauge) | Cantidad de datos descargados desde el (re)inicio.<br>_Se muestra como byte_ |
| **cassandra.cas_commit_latency.75th_percentile** <br>(gauge) | Latencia de la ronda de commits de Paxos - p75.<br>_Se muestra como microsegundo_ |
| **cassandra.cas_commit_latency.95th_percentile** <br>(gauge) | Latencia de la ronda de commits de Paxos - p95.<br>_Se muestra como microsegundo_ |
| **cassandra.cas_commit_latency.one_minute_rate** <br>(gauge) | Número de rondas de commits de Paxos por segundo.<br>_Se muestra como operación_ |
| **cassandra.cas_prepare_latency.75th_percentile** <br>(gauge) | Latencia de la ronda de preparación de Paxos- p75.<br>_Se muestra como microsegundo_ |
| **cassandra.cas_prepare_latency.95th_percentile** <br>(gauge) | Latencia de la ronda de preparación de Paxos- p95.<br>_Se muestra como microsegundo_ |
| **cassandra.cas_prepare_latency.one_minute_rate** <br>(gauge) | Número de rondas de preparación de Paxos por segundo.<br>_Se muestra como operación_ |
| **cassandra.cas_propose_latency.75th_percentile** <br>(gauge) | Latencia de la ronda de proposición de Paxos- p75.<br>_Se muestra como microsegundo_ |
| **cassandra.cas_propose_latency.95th_percentile** <br>(gauge) | Latencia de la ronda de proposición de Paxos- p95.<br>_Se muestra como microsegundo_ |
| **cassandra.cas_propose_latency.one_minute_rate** <br>(gauge) | Número de rondas de proposición de Paxos por segundo.<br>_Se muestra como operación_ |
| **cassandra.col_update_time_delta_histogram.75th_percentile** <br>(gauge) | Tiempo de actualización de la columna delta - p75.<br>_Se muestra como microsegundo_ |
| **cassandra.col_update_time_delta_histogram.95th_percentile** <br>(gauge) | Tiempo de actualización de la columna delta - p95.<br>_Se muestra como microsegundo_ |
| **cassandra.col_update_time_delta_histogram.min** <br>(gauge) | Tiempo de actualización de la columna delta - min.<br>_Se muestra como microsegundo_ |
| **cassandra.compaction_bytes_written.count** <br>(gauge) | Cantidad de datos compactados desde el (re)inicio.<br>_Se muestra como byte_ |
| **cassandra.compression_ratio** <br>(gauge) | Relación de compresión para todas las SSTables. /!\\ Un valor bajo significa una compresión elevada, al contrario de lo que sugiere su nombre. La fórmula utilizada es: 'tamaño de la SSTable comprimida / tamaño de la original'<br>_Se muestra como fracción_ |
| **cassandra.currently_blocked_tasks** <br>(gauge) | Número de tareas bloqueadas actualmente para el grupo de subprocesos.<br>_Se muestra como tarea_ |
| **cassandra.currently_blocked_tasks.count** <br>(gauge) | Número de tareas bloqueadas actualmente para el grupo de subprocesos.<br>_Se muestra como tarea_ |
| **cassandra.db.droppable_tombstone_ratio** <br>(gauge) | Estimación de la proporción de lápidas descartables.<br>_Se muestra como fracción_ |
| **cassandra.dropped.one_minute_rate** <br>(gauge) | Tareas descartadas durante la ejecución del grupo de subprocesos.<br>_Se muestra como subproceso_ |
| **cassandra.exceptions.count** <br>(gauge) | Número de excepciones lanzadas desde las métricas de 'Almacenamiento'.<br>_Se muestra como error_ |
| **cassandra.key_cache_hit_rate** <br>(gauge) | Porcentaje de aciertos en la caché de claves.<br>_Se muestra como fracción_ |
| **cassandra.latency.75th_percentile** <br>(gauge) | Latencia de la solicitud del cliente - p75.<br>_Se muestra como microsegundo_ |
| **cassandra.latency.95th_percentile** <br>(gauge) | Latencia de la solicitud del cliente - p95.<br>_Se muestra como microsegundo_ |
| **cassandra.latency.one_minute_rate** <br>(gauge) | Número de solicitudes de clientes.<br>_Se muestra como solicitud_ |
| **cassandra.live_disk_space_used.count** <br>(gauge) | Espacio en disco utilizado por SSTables "activas" (sólo cuenta en archivos en uso).<br>_Se muestra como byte_ |
| **cassandra.live_ss_table_count** <br>(gauge) | Número de SSTables "activas" (en uso).<br>_Se muestra como archivo_ |
| **cassandra.load.count** <br>(gauge) | Espacio en disco utilizado por los datos activos en un nodo.<br>_Se muestra como byte_ |
| **cassandra.max_partition_size** <br>(gauge) | Tamaño de la mayor partición compactada.<br>_Se muestra como byte_ |
| **cassandra.max_row_size** <br>(gauge) | Tamaño de la mayor fila compactada.<br>_Se muestra como byte_ |
| **cassandra.mean_partition_size** <br>(gauge) | Tamaño medio de la partición compactada.<br>_Se muestra como byte_ |
| **cassandra.mean_row_size** <br>(gauge) | Tamaño medio de las filas compactadas.<br>_Se muestra como byte_ |
| **cassandra.net.down_endpoint_count** <br>(gauge) | Número de nodos no saludables en el clúster. Representan la vista de cada nodo individual del clúster y, por lo tanto, no deben sumarse entre los nodos informantes.<br>_Se muestra como nodo_. |
| **cassandra.net.up_endpoint_count** <br>(gauge) | Número de nodos saludables en el clúster. Representan la vista de cada nodo individual del clúster y, por lo tanto, no deben sumarse entre los nodos informantes.<br>_Se muestra como nodo_. |
| **cassandra.pending_compactions** <br>(gauge) | Número de compactaciones pendientes.<br>_Se muestra como tarea_ |
| **cassandra.pending_flushes.count** <br>(gauge) | Número de descargas pendientes.<br>_Se muestra como descarga_ |
| **cassandra.pending_tasks** <br>(gauge) | Número de tareas pendientes para el grupo de subprocesos.<br>_Se muestra como tarea_ |
| **cassandra.range_latency.75th_percentile** <br>(gauge) | Latencia de solicitud de alcance local - p75.<br>_Se muestra como microsegundo_ |
| **cassandra.range_latency.95th_percentile** <br>(gauge) | Latencia de solicitud de alcance local - p95.<br>_Se muestra como microsegundo_ |
| **cassandra.range_latency.one_minute_rate** <br>(gauge) | Número de solicitudes de alcance local.<br>_Se muestra como solicitud_ |
| **cassandra.read_latency.75th_percentile** <br>(gauge) | Latencia de lectura local - p75.<br>_Se muestra como microsegundo_ |
| **cassandra.read_latency.95th_percentile** <br>(gauge) | Latencia de lectura local - p95.<br>_Se muestra como microsegundo_ |
| **cassandra.read_latency.99th_percentile** <br>(gauge) | Latencia de lectura local - p99.<br>_Se muestra como microsegundo_ |
| **cassandra.read_latency.one_minute_rate** <br>(gauge) | Número de solicitudes locales de lectura.<br>_Se muestra como lectura_ |
| **cassandra.row_cache_hit.count** <br>(gauge) | Número de aciertos en la caché de filas.<br>_Se muestra como acierto_ |
| **cassandra.row_cache_hit_out_of_range.count** <br>(gauge) | Número de aciertos en la caché de filas que no satisfacen el filtro de consulta y han ido al disco.<br>_Se muestra como acierto_ |
| **cassandra.row_cache_miss.count** <br>(gauge) | Número de fallos en la caché de filas de la tabla.<br>_Se muestra como fallo_ |
| **cassandra.snapshots_size** <br>(gauge) | Espacio en disco realmente utilizado por los snapshots.<br>_Se muestra como byte_ |
| **cassandra.ss_tables_per_read_histogram.75th_percentile** <br>(gauge) | Número de archivos de datos SSTable a los que se accede por lectura - p75.<br>_Se muestra como archivo_ |
| **cassandra.ss_tables_per_read_histogram.95th_percentile** <br>(gauge) | Número de archivos de datos SSTable a los que se accede por lectura - p95.<br>_Se muestra como archivo_ |
| **cassandra.timeouts.count** <br>(gauge) | Recuento de solicitudes no confirmadas dentro del tiempo de espera configurable.<br>_Se muestra como tiempo de espera_ |
| **cassandra.timeouts.one_minute_rate** <br>(gauge) | Tasa de tiempo de espera reciente, como media móvil ponderada exponencialmente en un intervalo de un minuto.<br>_Se muestra como tiempo de espera_ |
| **cassandra.tombstone_scanned_histogram.75th_percentile** <br>(gauge) | Número de lápidas analizadas por lectura - p75.<br>_Se muestra como registro_ |
| **cassandra.tombstone_scanned_histogram.95th_percentile** <br>(gauge) | Número de lápidas analizadas por lectura - p95.<br>_Se muestra como registro_ |
| **cassandra.total_blocked_tasks** <br>(gauge) | Total de tareas bloqueadas<br>_Se muestra como tarea_ |
| **cassandra.total_blocked_tasks.count** <br>(count) | Recuento total de tareas bloqueadas<br>_Se muestra como tarea_ |
| **cassandra.total_commit_log_size** <br>(gauge) | Tamaño en el disco utilizado por logs de commits.<br>_Se muestra como byte_ |
| **cassandra.total_disk_space_used.count** <br>(gauge) | Espacio total utilizado en el disco por SSTables, incluidas las obsoletas a la espera de ser recolectadas como basura.<br>_Se muestra como byte_ |
| **cassandra.view_lock_acquire_time.75th_percentile** <br>(gauge) | Tiempo que se tarda en adquirir un bloqueo de partición para actualizaciones de vistas materializadas - p75.<br>_Se muestra como microsegundo_ |
| **cassandra.view_lock_acquire_time.95th_percentile** <br>(gauge) | Tiempo que se tarda en adquirir un bloqueo de partición para actualizaciones de vistas materializadas - p95.<br>_Se muestra como microsegundo_ |
| **cassandra.view_lock_acquire_time.one_minute_rate** <br>(gauge) | Número de solicitudes para adquirir un bloqueo de partición para actualizaciones de vistas materializadas.<br>_Se muestra como solicitud_ |
| **cassandra.view_read_time.75th_percentile** <br>(gauge) | Tiempo empleado durante la lectura local de una actualización de vista materializada - p75.<br>_Se muestra como microsegundo_. |
| **cassandra.view_read_time.95th_percentile** <br>(gauge) | Tiempo empleado durante la lectura local de una actualización de vista materializada - p95.<br>_Se muestra como microsegundo_. |
| **cassandra.view_read_time.one_minute_rate** <br>(gauge) | Número de lecturas locales de actualizaciones de vistas materializadas.<br>_Se muestra como solicitud_ |
| **cassandra.waiting_on_free_memtable_space.75th_percentile** <br>(gauge) | Tiempo transcurrido a la espera de espacio memtable libre dentro o fuera del montón - p75.<br>_Se muestra como microsegundo_ |
| **cassandra.waiting_on_free_memtable_space.95th_percentile** <br>(gauge) | Tiempo transcurrido a la espera de espacio memtable libre dentro o fuera del montón - p95.<br>_Se muestra como microsegundo_ |
| **cassandra.write_latency.75th_percentile** <br>(gauge) | Latencia de escritura local - p75.<br>_Se muestra como microsegundo_ |
| **cassandra.write_latency.95th_percentile** <br>(gauge) | Latencia de escritura local - p95.<br>_Se muestra como microsegundo_ |
| **cassandra.write_latency.99th_percentile** <br>(gauge) | Latencia de escritura local - p99.<br>_Mostrado como microsegundo_ |
| **cassandra.write_latency.one_minute_rate** <br>(gauge) | Número de solicitudes locales de escritura.<br>_Se muestra como escritura_ |

### Eventos

El check de Cassandra no incluye ningún evento.

### Checks de servicio

**cassandra.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse y recopilar métricas de la instancia de Cassandra monitorizada, `WARNING` si no se recopilan métricas y `OK` en caso contrario.

_Estados: ok, crítico, advertencia_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Monitorización de métricas de rendimiento de Cassandra](https://www.datadoghq.com/blog/how-to-monitor-cassandra-performance-metrics)
- [Recopilación de métricas de Cassandra](https://www.datadoghq.com/blog/how-to-collect-cassandra-metrics)
- [Monitorización de Cassandra con Datadog](https://www.datadoghq.com/blog/monitoring-cassandra-with-datadog)