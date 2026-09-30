---
app_id: ignite
categories:
- almacenamiento en caché
- almacenes de datos
- recopilación de logs
- network
custom_kind: integración
description: Recopila métricas de tu servidor de Ignite.
integration_version: 3.1.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: ignite
---
## Información general

Con este check se monitoriza [Ignite](https://ignite.apache.org/).

## Configuración

### Instalación

El check de Ignite está incluido en el paquete del [Datadog Agent ](https://app.datadoghq.com/account/settings/agent/latest). No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

#### Configuración de Ignite

El exportador de métricas JMX se encuentra habilitado de manera predeterminada, pero es posible que debas elegir el puerto expuesto o habilitar la autenticación dependiendo de la seguridad de la red. La imagen de Docker oficial utiliza `49112` de forma predeterminada.

Para iniciar sesión, se recomienda encarecidamente activar [log4j](https://apacheignite.readme.io/docs/logging#section-log4j) para beneficiarse de un formato de logs con fechas completas.

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `ignite.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de su directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de ignite. Consulta el [ejemplo de ignite.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   Este check tiene un límite de 350 métricas por instancia. El número de métricas devueltas se indica en [la page (página) de estado](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information).
   Puedes especificar las métricas que te interesan editando la configuración a continuación.
   Para saber cómo personalizar las métricas a recopilar, consulta la [documentación de JMX Checks](https://docs.datadoghq.com/integrations/java/) para obtener más información.
   Si necesitas monitorizar más métricas, ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. La recopilación de logs está desactivada de manera predeterminada en el Datadog Agent; debes activarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `ignite.d/conf.yaml` para empezar a recopilar logs de Ignite:

   ```yaml
     logs:
       - type: file
         path: <IGNITE_HOME>/work/log/ignite-*.log
         source: ignite
         service: '<SERVICE_NAME>'
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \[\d{4}\-\d{2}\-\d{2}
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno. Consulta el [ejemplo de ignite.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "En contenedores" %}}

#### En contenedores

Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/autodiscovery/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

Para recopilar métricas con la integración Datadog-Ignite, consulta la guía [Autodiscovery con JMX](https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent. Para activarla, consulta [recopilación de logs de Docker](https://docs.datadoghq.com/agent/docker/log/).

| Parámetro      | Valor                                                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "ignite", "service": "<SERVICE_NAME>", "log_processing_rules":{"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{4}\-\d{2}\-\d{2}"}}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando del Agent `status` ](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `ignite` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **ignite.active_baseline_nodes** <br>(gauge) | Count de nodos base activos.<br>_Mostrado como nodo_ |
| **ignite.allocation_rate** <br>(gauge) | Tasa de asignación (pages (páginas) por segundo) promediada a través de rateTimeInternal.<br>_Mostrado como page (página)_ |
| **ignite.average_cpu_load** <br>(gauge) | Media de los valores de carga de la CPU sobre todas las métricas guardadas en el historial.|
| **ignite.busy_time_percentage** <br>(gauge) | Porcentaje de tiempo que este nodo está ocupado ejecutando jobs (generic) frente a inactivo.<br>_Mostrado como porcentaje_ |
| **ignite.cache.average_commit_time** <br>(gauge) | Tiempo medio para confirmar la transacción.<br>_Mostrado como microsegundo_ |
| **ignite.cache.average_get_time** <br>(gauge) | Tiempo medio de ejecución de get.<br>_Mostrado como microsegundo_ |
| **ignite.cache.average_put_time** <br>(gauge) | Tiempo medio de ejecución de put.<br>_Mostraddo como microsegundo_ |
| **ignite.cache.average_remove_time** <br>(gauge) | Tiempo medio de ejecución de la eliminación.<br>_Mostrado como microsegundo_ |
| **ignite.cache.average_rollback_time** <br>(gauge) | Tiempo medio para revertir la transacción.<br>_Mostrado como microsegundo_ |
| **ignite.cache.backups** <br>(gauge) | Count de copias de seguridad configuradas para el grupo de caché.|
| **ignite.cache.cluster_moving_partitions** <br>(gauge) | Count de particiones para este grupo de caché en todo el clúster con estado MÓVIL.|
| **ignite.cache.cluster_owning_partitions** <br>(gauge) | Count de particiones para este grupo de caché en todo el clúster con estado PROPIETARIO.|
| **ignite.cache.commit_queue_size** <br>(gauge) | Tamaño de la cola de transacciones confirmadas.<br>_Mostrado como transacción_ |
| **ignite.cache.commits** <br>(rate) | Número de confirmaciones de transacciones.|
| **ignite.cache.committed_versions_size** <br>(gauge) | Tamaño del mapa de ID confirmado de la transacción.<br>_Mostrado como transacción_ |
| **ignite.cache.dht_commit_queue_size** <br>(gauge) | Tamaño de la cola de transacciones confirmadas de DHT.<br>_Mostrado como transacción_ |
| **ignite.cache.dht_committed_versions_size** <br>(gauge) | Tamaño del mapa de ID confirmado de DHT de la transacción.<br>_Mostrado como transacción_ |
| **ignite.cache.dht_prepare_queue_size** <br>(gauge) | Tamaño de la cola preparada de DHT de la transacción.<br>_Mostrado como transacción_ |
| **ignite.cache.dht_rolledback_versions_size** <br>(gauge) | Tamaño del mapa de ID revertido de DHT de la transacción.<br>_Mostrado como transacción_ |
| **ignite.cache.dht_start_version_counts_size** <br>(gauge) | Tamaño del mapa de counts de la versión de inicio de DHT de la transacción.<br>_Mostrado como transacción_ |
| **ignite.cache.dht_thread_map_size** <br>(gauge) | Tamaño del mapa por subroceso de DHT de la transacción.<br>_Mostrado como transacción_ |
| **ignite.cache.dht_xid_map_size** <br>(gauge) | Tamaño del mapa por Xid de DHT de la transacción.<br>_Mostrado como transacción_ |
| **ignite.cache.entry_processor.average_invocation_time** <br>(gauge) | Tiempo medio de ejecución de las invocaciones a la caché.<br>_Mostrado como microsegundo_ |
| **ignite.cache.entry_processor.hit_percentage** <br>(gauge) | El porcentaje de invocaciones de claves que existen en la caché.<br>_Mostrado como porcentaje_ |
| **ignite.cache.entry_processor.hits** <br>(rate) | El número total de invocaciones de claves que existen en la caché.|
| **ignite.cache.entry_processor.invocations** <br>(rate) | El número total de invocaciones a la caché.|
| **ignite.cache.entry_processor.maximum_invocation_time** <br>(gauge) | Hasta ahora, el tiempo máximo para ejecutar invocaciones a la caché.<br>_Mostrado como microsegundo_ |
| **ignite.cache.entry_processor.minimum_invocation_time** <br>(gauge) | Hasta ahora, el tiempo mínimo para ejecutar invocaciones a la caché.<br>_Mostrado como microsegundo_ |
| **ignite.cache.entry_processor.miss_percentage** <br>(gauge) | El porcentaje de invocaciones de claves que no existen en la caché.<br>_Mostrado en porcentaje_ |
| **ignite.cache.entry_processor.misses** <br>(rate) | El número total de invocaciones a claves que no existen en la caché.|
| **ignite.cache.entry_processor.puts** <br>(rate) | El número total de invocaciones a la caché, produjo una actualización.|
| **ignite.cache.entry_processor.read_only_invocations** <br>(rate) | El número total de invocaciones a la caché, sin causar actualizaciones.|
| **ignite.cache.entry_processor.removals** <br>(rate) | El número total de invocaciones a la caché, produjo eliminaciones.|
| **ignite.cache.estimated_rebalancing_keys** <br>(gauge) | Número estimado para reequilibrar las llaves.<br>_Mostrado como clave_ |
| **ignite.cache.evict_queue_size** <br>(gauge) | Tamaño actual de la cola de desalojo.|
| **ignite.cache.evictions** <br>(rate) | Número de entradas de desalojo.<br>_Mostrado como desalojo_ |
| **ignite.cache.gets** <br>(rate) | El número total de accesos a la caché.<br>_Mostrado como solicitud_ |
| **ignite.cache.heap_entries** <br>(gauge) | Número de entradas en la memoria montón.<br>_Mostrado como entrada_ |
| **ignite.cache.hit_percentage** <br>(gauge) | Porcentaje de aciertos.<br>_Mostrado como porcentaje_ |
| **ignite.cache.hits** <br>(rate) | El número de solicitudes de get satisfechas por la caché.<br>_Mostrado como solicitud_ |
| **ignite.cache.keys_to_rebalance** <br>(gauge) | Número estimado de claves a reequilibrar en el nodo actual.<br>_Mostrado como clave_ |
| **ignite.cache.local_moving_partitions** <br>(gauge) | Count de particiones con estado MÓVIL para este grupo de caché ubicadas en este nodo.|
| **ignite.cache.local_owning_partitions** <br>(gauge) | Count de particiones con estado PROPIETARIO para este grupo de caché ubicadas en este nodo.|
| **ignite.cache.local_renting_entries** <br>(gauge) | Count de entradas que quedan por desalojar en particiones de ALQUILER ubicadas en este nodo para este grupo de caché.|
| **ignite.cache.local_renting_partitions** <br>(gauge) | Count de particiones con estado ALQUILER para este grupo de caché ubicado en este nodo.|
| **ignite.cache.maximum_partition_copies** <br>(gauge) | Número máximo de copias de partición para todas las particiones de este grupo de caché.|
| **ignite.cache.minimum_partition_copies** <br>(gauge) | Número mínimo de copias de partición para todas las particiones de este grupo de caché.|
| **ignite.cache.miss_percentage** <br>(gauge) | Porcentaje de accesos que no encontraron nada.<br>_Mostrado como porcentaje_ |
| **ignite.cache.misses** <br>(rate) | Una falla es una solicitud de get no satisfecha.<br>_Mostrado como solicitud_ |
| **ignite.cache.offheap_allocated_size** <br>(gauge) | Tamaño de la memoria asignada fuera del montón.<br>_Mostrado como byte_ |
| **ignite.cache.offheap_backup_entries** <br>(gauge) | Número de copias de seguridad almacenadas en memoria fuera del montón.|
| **ignite.cache.offheap_entries** <br>(gauge) | Número de entradas almacenadas en memoria fuera del montón.<br>_Mostrado como entrada_ |
| **ignite.cache.offheap_evictions** <br>(rate) | Número de desalojos de memoria fuera del montón.<br>_Mostrado como desalojo_ |
| **ignite.cache.offheap_gets** <br>(rate) | Número de recuperaciones de memoria fuera del montón.|
| **ignite.cache.offheap_hit_percentage** <br>(gauge) | Porcentaje de aciertos en memoria fuera del montón.<br>_Mostrado como porcentaje_ |
| **ignite.cache.offheap_hits** <br>(rate) | Número de aciertos en memoria fuera del montón.<br>_Mostrado como acierto_ |
| **ignite.cache.offheap_miss_percentage** <br>(gauge) | Porcentaje de fallos en memoria fuera del montón.<br>_Mostrado como porcentaje_ |
| **ignite.cache.offheap_misses** <br>(rate) | Número de fallos en la memoria fuera del montón.<br>_Mostrado como fallo_ |
| **ignite.cache.offheap_primary_entries** <br>(gauge) | Número de entradas primarias almacenadas en memoria fuera del montón.<br>_Mostrado como entrada_ |
| **ignite.cache.offheap_puts** <br>(rate) | Número de puestas en memoria fuera del montón.|
| **ignite.cache.offheap_removals** <br>(rate) | Número de entradas eliminadas de la memoria fuera del montón.|
| **ignite.cache.partitions** <br>(gauge) | Count de particiones para el grupo de caché.|
| **ignite.cache.prepare_queue_size** <br>(gauge) | Tamaño de la cola preparada de transacciones.<br>_Mostrado como transacción_ |
| **ignite.cache.puts** <br>(rate) | El número total de puts a la caché.<br>_Mostrado como solicitud_ |
| **ignite.cache.rebalance_clearing_partitions** <br>(gauge) | Número de particiones que deben borrarse antes de iniciar el reequilibrio real.|
| **ignite.cache.rebalanced_keys** <br>(gauge) | Número de claves ya reequilibradas.<br>_Mostrado como clave_ |
| **ignite.cache.rebalancing_bytes_rate** <br>(gauge) | Velocidad estimada de reequilibrado en bytes.<br>_Mostrado como byte_ |
| **ignite.cache.rebalancing_keys_rate** <br>(gauge) | Velocidad estimada de reequilibrado en claves.<br>_Mostrado como operación_ |
| **ignite.cache.rebalancing_partitions** <br>(gauge) | Número de particiones que se están reequilibrando actualmente en el nodo actual.|
| **ignite.cache.removals** <br>(rate) | El número total de eliminaciones de la caché.|
| **ignite.cache.rollbacks** <br>(rate) | Número de reversiones de transacciones.|
| **ignite.cache.rolledback_versions_size** <br>(gauge) | Tamaño del mapa del ID de la transacción revertida.<br>_Mostrado como transacción_ |
| **ignite.cache.size** <br>(gauge) | Número de valores no nulos en la caché como valor prolongado.|
| **ignite.cache.start_version_counts_size** <br>(gauge) | Tamaño del mapa de counts de la versión de inicio de la transacción.<br>_Mostrado como transacción_ |
| **ignite.cache.thread_map_size** <br>(gauge) | Tamaño del mapa de transacciones por subproceso.<br>_Mostrado como transacción_ |
| **ignite.cache.total_partitions** <br>(gauge) | Número total de particiones en el nodo actual.|
| **ignite.cache.write_behind_buffer_size** <br>(gauge) | Count de entradas de la caché que esperan ser vaciadas.|
| **ignite.cache.write_behind_overflow** <br>(gauge) | Count de eventos de desbordamiento del búfer de escritura en curso en este momento.<br>_Mostrado como evento_ |
| **ignite.cache.write_behind_overflow_total** <br>(rate) | Count de eventos de desbordamiento de caché desde que se inició la caché de escritura oculta.<br>_Mostrado como evento_ |
| **ignite.cache.write_behind_retries** <br>(gauge) | Count de entradas de la caché que están actualmente en estado de reintento.|
| **ignite.cache.write_behind_store_batch_size** <br>(gauge) | Tamaño máximo del lote para operaciones similares.|
| **ignite.cache.xid_map_size** <br>(gauge) | Tamaño del mapa de transacciones por Xid.<br>_Mostrado como transacción_ |
| **ignite.check_point_buffer_size** <br>(gauge) | Tamaño total en bytes para el búfer de punto de control.<br>_Mostrado como byte_ |
| **ignite.checkpoint.last_copied_on_write_pages** <br>(gauge) | Número de pages (páginas) copiadas en un búfer temporal de punto de control durante el último punto de control.<br>_Mostrado como page (página)_ |
| **ignite.checkpoint.last_data_pages** <br>(gauge) | Número total de pages (páginas) de datos escritas durante el último punto de control.<br>_Mostrado como page (página)_ |
| **ignite.checkpoint.last_duration** <br>(gauge) | Duración del último punto de control en milisegundos.<br>_Mostrado como segundo_ |
| **ignite.checkpoint.last_fsync_duration** <br>(gauge) | Duración de la fase de sincronización del último punto de control en milisegundos.<br>_Mostrado como milisegundo_ |
| **ignite.checkpoint.last_lock_wait_duration** <br>(gauge) | Duración de la espera de bloqueo del punto de control en milisegundos.<br>_Mostrado como milisegundo_ |
| **ignite.checkpoint.last_mark_duration** <br>(gauge) | Duración de la marca del punto de control en milisegundos.<br>_Mostrado como milisegundo_ |
| **ignite.checkpoint.last_pages_write_duration** <br>(gauge) | Duración de la escritura de las pages (páginas) del punto de control en milisegundos.<br>_Mostrado como milisegundo_ |
| **ignite.checkpoint.last_total_pages** <br>(gauge) | Número total de pages (páginas) escritas durante el último punto de control.<br>_Mostrado como page (página)_ |
| **ignite.checkpoint.total_time** <br>(gauge) | Tiempo total del punto de control desde el último reinicio.<br>_Mostrado como segundo_ |
| **ignite.current_cpu_load** <br>(gauge) | El promedio de carga del sistema; o un valor negativo si no está disponible.<br>_Mostrado como byte_ |
| **ignite.current_daemon_thread_count** <br>(gauge) | Número actual de subprocesos daemon activos.<br>_Mostrado como subproceso_ |
| **ignite.current_gc_load** <br>(gauge) | Tiempo medio transcurrido en GC desde la última actualización.<br>_Mostrado como tiempo_ |
| **ignite.current_idle_time** <br>(gauge) | Tiempo de inactividad de este nodo desde la ejecución del último job (generic).<br>_Mostrado como segundo_ |
| **ignite.current_thread_count** <br>(gauge) | Número actual de subprocesos activos.<br>_Mostrado como subproceso_ |
| **ignite.dirty_pages** <br>(gauge) | Número de pages (páginas) en memoria aún no sincronizadas con el almacenamiento persistente.<br>_Mostrado como page (página)_ |
| **ignite.discovery.average_message_processing_time** <br>(gauge) | Tiempo medio de procesamiento de los mensajes.<br>_Mostrado como segundo_ |
| **ignite.discovery.max_message_processing_time** <br>(gauge) | Tiempo máximo de procesamiento de los mensajes.<br>_Mostrado como segundo_ |
| **ignite.discovery.message_worker_queue_size** <br>(gauge) | Tamaño actual de la cola del trabajador de mensajes.|
| **ignite.discovery.nodes_failed** <br>(rate) | Count de nodos fallidos.<br>_Mostrado como nodo_ |
| **ignite.discovery.nodes_joined** <br>(rate) | Count de nodos unidos.<br>_Mostrado como nodo_ |
| **ignite.discovery.nodes_left** <br>(rate) | Count de nodos restantes.<br>_Mostrado como nodo_ |
| **ignite.discovery.pending_messages_discarded** <br>(gauge) | Mensajes pendientes descartados.<br>_Mostrado como mensaje_ |
| **ignite.discovery.pending_messages_registered** <br>(gauge) | Mensajes pendientes registrados.<br>_Mostrado como mensaje_ |
| **ignite.discovery.total_processed_messages** <br>(rate) | Count total de mensajes procesados.<br>_Mostrado como mensaje_ |
| **ignite.discovery.total_received_messages** <br>(rate) | Count total de mensajes recibidos.<br>_Mostrado como mensaje_ |
| **ignite.eviction_rate** <br>(gauge) | Tasa de desalojo (pages (páginas) por segundo).<br>_Mostrado como page (página)_ |
| **ignite.heap_memory_committed** <br>(gauge) | La cantidad de memoria confirmada en bytes.<br>_Mostrado como byte_ |
| **ignite.heap_memory_initialized** <br>(gauge) | El tamaño inicial de la memoria en bytes; -1 si no está definido.<br>_Mostrado como byte_ |
| **ignite.heap_memory_maximum** <br>(gauge) | La cantidad máxima de memoria en bytes; -1 si no está definida.<br>_Mostrado como byte_ |
| **ignite.heap_memory_total** <br>(gauge) | La cantidad total de memoria en bytes; -1 si no está definida.<br>_Mostrado como byte_ |
| **ignite.heap_memory_used** <br>(gauge) | Tamaño actual del montón que se utiliza para la asignación de objetos.<br>_Mostrado como byte_ |
| **ignite.idle_time_percentage** <br>(gauge) | Porcentaje de tiempo que este nodo está inactivo frente a la ejecución de jobs (generic).<br>_Mostrado como porcentaje_ |
| **ignite.initial_memory_size** <br>(gauge) | Tamaño inicial de la región de memoria definido por su región de datos.<br>_Mostrado como byte_ |
| **ignite.jobs.active.average** <br>(gauge) | Número medio de jobs (generic) activos que se ejecutan simultáneamente en el nodo.<br>_Mostrado como job (generic)_ |
| **ignite.jobs.active.current** <br>(gauge) | Número de jobs (generic) activos que se ejecutan simultáneamente en el nodo.<br>_Mostradeo como job (generic)_ |
| **ignite.jobs.active.maximum** <br>(gauge) | Número máximo de jobs (generic) que alguna vez se han ejecutado simultáneamente en este nodo.<br>_Mostrado como job (generic)_ |
| **ignite.jobs.cancelled.average** <br>(gauge) | Número medio de jobs (generic) cancelados que este nodo ha tenido ejecutándose simultáneamente alguna vez.<br>_Mostrado como job (generic)_ |
| **ignite.jobs.cancelled.current** <br>(gauge) | Número de jobs (generic) cancelados que se siguen ejecutando.<br>_Mostrado como job (generic)_ |
| **ignite.jobs.cancelled.maximum** <br>(gauge) | Número máximo de jobs (generic) cancelados que este nodo ha tenido ejecutándose simultáneamente alguna vez.<br>_Mostrado como job (generic)_ |
| **ignite.jobs.cancelled.total** <br>(rate) | Número total de jobs (generic) cancelados desde el inicio del nodo.<br>_Mostrado como job (generic)_ |
| **ignite.jobs.execute_time.average** <br>(gauge) | Tiempo medio que tarda un job (generic) en ejecutarse en el nodo.<br>_Mostrado como segundo_ |
| **ignite.jobs.execute_time.current** <br>(gauge) | Tiempo máximo de ejecución de un job (generic) actual.<br>_Mostrado como segundo_ |
| **ignite.jobs.execute_time.maximum** <br>(gauge) | Tiempo que tardó en ejecutarse el job (generic) más largo en el nodo.<br>_Mostrado como segundo_ |
| **ignite.jobs.executed.total** <br>(rate) | Número total de jobs (generic) gestionados por el nodo.<br>_Mostrado como job (generic)_ |
| **ignite.jobs.execution_time.total** <br>(rate) | Tiempo total que tardan en ejecutarse todos los jobs (generic) finalizados en el nodo.<br>_Mostrado como segundo_ |
| **ignite.jobs.maximum_failover** <br>(gauge) | Número máximo de intentos para ejecutar un job (generic) fallido en otro nodo.<br>_Mostrado como intento_ |
| **ignite.jobs.rejected.average** <br>(gauge) | Número medio de jobs (generic) que este nodo rechaza durante las operaciones de resolución de colisiones.<br>_Mostrado como job (generic)_ |
| **ignite.jobs.rejected.current** <br>(gauge) | Número de jobs (generic) rechazados tras la operación de resolución de colisiones más reciente.<br>_Mostrado como job (generic)_ |
| **ignite.jobs.rejected.maximum** <br>(gauge) | Número máximo de jobs (generic) rechazados a la vez durante una única operación de resolución de colisiones.<br>_Mostrado como job (generic)_ |
| **ignite.jobs.rejected.total** <br>(rate) | Número total de jobs (generic) rechazados por este nodo durante las operaciones de resolución de colisiones desde el inicio del nodo.<br>_Mostrado como job (generic)_ |
| **ignite.jobs.total_failover** <br>(rate) | Número total de jobs (generic) que han fallado.<br>_Mostrado como job (generic)_ |
| **ignite.jobs.wait_time.average** <br>(gauge) | Tiempo medio que los jobs (generic) pasan en la cola esperando ser ejecutados.<br>_Mostrado como segundo_ |
| **ignite.jobs.wait_time.current** <br>(gauge) | Tiempo de espera actual del job (generic) más antiguo.<br>_Mostrado como segundo_ |
| **ignite.jobs.wait_time.maximum** <br>(gauge) | Tiempo máximo que un job (generic) ha estado esperando en una cola para ser ejecutado.<br>_Mostrado como segundo_ |
| **ignite.jobs.waiting.average** <br>(gauge) | Número medio de jobs (generic) en espera que este nodo tenía en cola.<br>_Mostrado como job (generic)_ |
| **ignite.jobs.waiting.current** <br>(gauge) | Número de trabajos en cola a la espera de ser ejecutados.<br>_Mostrado como job (generic)_ |
| **ignite.jobs.waiting.maximum** <br>(gauge) | Número máximo de jobs (generic) en espera que tenía este nodo.<br>_Mostrado como job (generic)_ |
| **ignite.large_entries_pages_percentage** <br>(gauge) | Porcentaje de pages (páginas) que están totalmente ocupadas por entradas grandes que superan el tamaño de la page (página).<br>_Mostrado como porcentaje_ |
| **ignite.max_memory_size** <br>(gauge) | Tamaño máximo de la región de la memoria definido por su región de datos.<br>_Mostrado como byte_ |
| **ignite.maximum_thread_count** <br>(gauge) | El número máximo de subprocesos activos.<br>_Mostrado como subproceso_ |
| **ignite.non_heap_memory_committed** <br>(gauge) | Cantidad de memoria no montón en bytes que está confirmada para que la JVM la utilice.<br>_Mostrado como byte_ |
| **ignite.non_heap_memory_initialized** <br>(gauge) | El tamaño inicial de la memoria no montón en bytes; -1 si no está definido.<br>_Mostrado como byte_ |
| **ignite.non_heap_memory_maximum** <br>(gauge) | Cantidad máxima de memoria que no está en el montón, en bytes, que se puede utilizar para la gestión de la memoria. -1 si no está definido.<br>_Mostrado como byte_. |
| **ignite.non_heap_memory_total** <br>(gauge) | Cantidad total de memoria que no está en el montón, en bytes, que se puede utilizar para la gestión de la memoria. -1 si no está definido.<br>_Mostrado como byte_. |
| **ignite.non_heap_memory_used** <br>(gauge) | Tamaño actual de la memoria no montón utilizada por la máquina virtual de Java.<br>_Mostrado como byte_ |
| **ignite.offheap_size** <br>(gauge) | Tamaño fuera del montón en bytes.<br>_Mostrado como byte_ |
| **ignite.offheap_used_size** <br>(gauge) | Tamaño total utilizado fuera del montón en bytes.<br>_Mostrado como byte_ |
| **ignite.oubound_messages_queue_size** <br>(gauge) | Tamaño de la cola de mensajes salientes.<br>_Mostrado como mensaje_ |
| **ignite.pages_fill_factor** <br>(gauge) | El porcentaje de espacio utilizado.<br>_Mostrado como porcentaje_ |
| **ignite.pages_read** <br>(rate) | Número de pages (páginas) leídas desde el último reinicio.<br>_Mostrado como page (página)_ |
| **ignite.pages_replace_age** <br>(gauge) | Antigüedad media a la que las pages (páginas) de la memoria se sustituyen por pages (páginas) del almacenamiento persistente (milisegundos).<br>_Mostrado como page (página)_ |
| **ignite.pages_replace_rate** <br>(gauge) | Velocidad a la que las pages (páginas) de la memoria se sustituyen por pages (páginas) del almacenamiento persistente (pages (páginas) por segundo).<br>_Se muestra como page (página)_ |
| **ignite.pages_replaced** <br>(rate) | Número de pages (páginas) sustituidas desde el último reinicio.<br>_Mostrado como page (página)_ |
| **ignite.pages_written** <br>(rate) | Número de pages (páginas) escritas desde el último reinicio.<br>_Mostrado como page (página)_ |
| **ignite.physical_memory_pages** <br>(gauge) | Número de pages (páginas) que residen en la RAM física.<br>_Mostrado como page (página)_ |
| **ignite.received_bytes** <br>(rate) | Count de bytes recibidos.<br>_Mostrado como byte_ |
| **ignite.received_messages** <br>(rate) | Count de mensajes recibidos.<br>_Mostrado como mensaje_ |
| **ignite.sent_bytes** <br>(rate) | Count de bytes enviados.<br>_Mostrado como byte_ |
| **ignite.sent_messages** <br>(rate) | Count de mensajes enviados.<br>_Mostrado como mensaje_ |
| **ignite.threads.active** <br>(gauge) | Número aproximado de subprocesos que están ejecutando tareas activamente.<br>_Mostrado como subproceso_ |
| **ignite.threads.completed_tasks** <br>(rate) | Número total aproximado de tareas que han finalizado su ejecución.<br>_Mostrado como tarea_ |
| **ignite.threads.core_pool_size** <br>(gauge) | El número de subprocesos del núcleo.<br>_Mostrado como subproceso_ |
| **ignite.threads.largest_size** <br>(gauge) | Mayor número de subprocesos que han estado simultáneamente en el grupo.<br>_Mostrado como suibproceso_ |
| **ignite.threads.maximum_pool_size** <br>(gauge) | El número máximo de subprocesos permitido.<br>_Mostrado como subproceso_ |
| **ignite.threads.pool_size** <br>(gauge) | Número actual de subprocesos en el grupo.<br>_Mostrado como subproceso_ |
| **ignite.threads.queue_size** <br>(gauge) | Número actual de subprocesos en el grupo<br>_Mostrado como subproceso_ |
| **ignite.threads.tasks** <br>(rate) | Número total aproximado de tareas que se han programado para su ejecución.<br>_Mostrado como tarea_ |
| **ignite.total_allocated_pages** <br>(gauge) | Número total de pages (páginas) asignadas.<br>_Mostrado como page (página)_ |
| **ignite.total_allocated_size** <br>(gauge) | Tamaño total de la memoria asignada en bytes.<br>_Mostrado como byte_ |
| **ignite.total_baseline_nodes** <br>(gauge) | Count total de nodos base.<br>_Mostrado como nodo_ |
| **ignite.total_busy_time** <br>(gauge) | Tiempo total que este nodo pasó ejecutando jobs (generic).<br>_Mostrado como segundo_ |
| **ignite.total_client_nodes** <br>(gauge) | Count de nodos cliente.<br>_Mostrado como nodo_ |
| **ignite.total_cpus** <br>(gauge) | El número de CPU disponibles para la máquina virtual Java.<br>_Mostrado como núcleo_ |
| **ignite.total_executed_tasks** <br>(rate) | Número total de tareas gestionadas por el nodo.<br>_Mostrado como tarea_ |
| **ignite.total_idle_time** <br>(gauge) | Tiempo total que este nodo pasó inactivo (sin ejecutar ningún job (generic)).<br>_Mostrado como segundo_ |
| **ignite.total_nodes** <br>(gauge) | Número total de nodos.<br>_Mostrado como nodo_ |
| **ignite.total_server_nodes** <br>(gauge) | Count de nodos del servidor.<br>_Mostrado como nodo_ |
| **ignite.total_started_threads** <br>(rate) | El número total de subprocesos iniciados.<br>_Mostrado como subproceso_ |
| **ignite.transaction.committed** <br>(rate) | El número de transacciones confirmadas.<br>_Mostrado como transacción_ |
| **ignite.transaction.holding_lock** <br>(gauge) | El número de transacciones activas con al menos un bloqueo de claves.<br>_Mostrado como transacción_ |
| **ignite.transaction.locked_keys** <br>(gauge) | El número de claves bloqueadas en el nodo.<br>_Mostrado como clave_ |
| **ignite.transaction.owner** <br>(gauge) | El número de transacciones activas para las que este nodo es el iniciador.<br>_Mostrado como transacción_ |
| **ignite.transaction.rolledback** <br>(rate) | El número de transacciones que se han revertido.<br>_Mostrado como transacción_ |
| **ignite.used_checkpoint_buffer_pages** <br>(gauge) | Tamaño del búfer del punto de control utilizado en pages (páginas).<br>_Mostrado como page (página)_ |
| **ignite.used_checkpoint_buffer_size** <br>(gauge) | Tamaño del búfer del punto de control utilizado en bytes.<br>_Mostrado como byte_ |
| **ignite.wal.archive_segments** <br>(gauge) | Número actual de segmentos WAL en el archivo WAL.<br>_Mostrado como segmento_ |
| **ignite.wal.buffer_poll_spin** <br>(gauge) | Número de giros de encuestas del búfer WAL en el último intervalo de tiempo.|
| **ignite.wal.fsync_average** <br>(gauge) | Duración media de la sincronización de archivos WAL en microsegundos durante el último intervalo de tiempo.<br>_Mostrado como microsegundo_ |
| **ignite.wal.last_rollover** <br>(gauge) | Hora de la última sustitución del segmento WAL.<br>_Mostrado como segundo_ |
| **ignite.wal.logging_rate** <br>(gauge) | Número medio de registros WAL por segundo escritos durante el último intervalo de tiempo.<br>_Mostrado como registro_ |
| **ignite.wal.total_size** <br>(gauge) | Tamaño total en bytes de los archivos WAL de almacenamiento.<br>_Mostrado como byte_ |
| **ignite.wal.writing_rate** <br>(gauge) | Número medio de bytes por segundo escritos durante el último intervalo de tiempo.<br>_Mostrado como byte_ |

### Eventos

La integración de Ignite no incluye eventos.

### Checks de servicio

**ignite.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse y recopilar métricas de la instancia monitorizada de Ignite, `WARNING` si no se recopilan métricas y `OK` en caso contrario.

_Estados: ok, crítico, advertencia_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/conf.yaml.example).