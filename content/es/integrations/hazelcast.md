---
app_id: hazelcast
categories:
- almacenes de datos
- almacenamiento en caché
- recopilación de logs
custom_kind: integración
description: Monitoriza los miembros de Hazelcast y el Centro de Gestión.
integration_version: 6.2.0
media: []
supported_os:
- linux
- macOS
- windows
title: Hazelcast
---
## Información general

Este check monitoriza [Hazelcast](https://hazelcast.org) v4.0+.

## Configuración

### Instalación

El check de Hazelcast está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `hazelcast.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del
   directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de Hazelcast.
   Consulta el [sample hazelcast.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/hazelcast/datadog_checks/hazelcast/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   Este check tiene un límite de 350 métricas por instancia. El número de métricas devueltas se indica en [la página de estado](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information).
   Puedes especificar las métricas que te interesan editando la configuración a continuación.
   Para saber cómo personalizar las métricas que se recopilarán, consulta la [documentación de checks de JMX](https://docs.datadoghq.com/integrations/java/) para obtener instrucciones más detalladas.
   Si necesitas monitorizar más métricas, ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

1. Hazelcast es compatible con muchos [adaptadores de registro] (https://docs.hazelcast.org/docs/latest/manual/html-single/index.html#logging-configuration) diferentes. He aquí un ejemplo de archivo `log4j2.properties`:

   ```text
   rootLogger=file
   rootLogger.level=info
   property.filepath=/path/to/log/files
   property.filename=hazelcast

   appender.file.type=RollingFile
   appender.file.name=RollingFile
   appender.file.fileName=${filepath}/${filename}.log
   appender.file.filePattern=${filepath}/${filename}-%d{yyyy-MM-dd}-%i.log.gz
   appender.file.layout.type=PatternLayout
   appender.file.layout.pattern = %d{yyyy-MM-dd HH:mm:ss} [%thread] %level{length=10} %c{1}:%L - %m%n
   appender.file.policies.type=Policies
   appender.file.policies.time.type=TimeBasedTriggeringPolicy
   appender.file.policies.time.interval=1
   appender.file.policies.time.modulate=true
   appender.file.policies.size.type=SizeBasedTriggeringPolicy
   appender.file.policies.size.size=50MB
   appender.file.strategy.type=DefaultRolloverStrategy
   appender.file.strategy.max=100

   rootLogger.appenderRefs=file
   rootLogger.appenderRef.file.ref=RollingFile

   #Hazelcast specific logs.

   #log4j.logger.com.hazelcast=debug

   #log4j.logger.com.hazelcast.cluster=debug
   #log4j.logger.com.hazelcast.partition=debug
   #log4j.logger.com.hazelcast.partition.InternalPartitionService=debug
   #log4j.logger.com.hazelcast.nio=debug
   #log4j.logger.com.hazelcast.hibernate=debug
   ```

1. En forma predeterminada, el pipeline de la integración de Datadog es compatible con el siguiente [patrón] de conversión (https://logging.apache.org/log4j/2.x/manual/layouts.html#Patterns):

   ```text
   %d{yyyy-MM-dd HH:mm:ss} [%thread] %level{length=10} %c{1}:%L - %m%n
   ```

   Clona y edita el [pipeline de integración](https://docs.datadoghq.com/logs/processing/#integration-pipelines) si tienes un formato diferente.

1. La recopilación de logs está desactivada de forma predeterminada en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade el siguiente bloque de configuración a tu archivo `hazelcast.d/conf.yaml`. Cambia los valores de los parámetros `path` y `service` en función de tu entorno. Consulta [ejemplo hazelcast.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/hazelcast/datadog_checks/hazelcast/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   ```yaml
   logs:
     - type: file
       path: /var/log/hazelcast.log
       source: hazelcast
       service: <SERVICE>
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "En contenedores" %}}

#### En contenedores

##### Recopilación de métricas

Para entornos en contenedores, consulta la guía [Autodiscovery con JMX](https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent).

##### Recopilación de logs

La recopilación de logs está desactivada de forma predeterminada en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Docker](https://docs.datadoghq.com/agent/docker/log/).

| Parámetro      | Valor                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "hazelcast", "service": "<SERVICE_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent] (https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `hazelcast` en la sección **JMXFetch**:

```text
========
JMXFetch
========
  Initialized checks
  ==================
    hazelcast
      instance_name : hazelcast-localhost-9999
      message :
      metric_count : 46
      service_check_count : 0
      status : OK
```

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **hazelcast.imap.local_backup_count** <br>(gauge) | Recuento de copias de seguridad|
| **hazelcast.imap.local_backup_entry_count** <br>(gauge) | Recuento de entradas de copia de seguridad|
| **hazelcast.imap.local_backup_entry_memory_cost** <br>(gauge) | Costo de entradas de la copia de seguridad|
| **hazelcast.imap.local_creation_time** <br>(gauge) | Hora de creación|
| **hazelcast.imap.local_dirty_entry_count** <br>(gauge) | Recuento de entradas con cambios|
| **hazelcast.imap.local_event_operation_count** <br>(gauge) | Recuento de eventos|
| **hazelcast.imap.local_get_operation_count** <br>(gauge) | Obtener recuento de operaciones|
| **hazelcast.imap.local_heap_cost** <br>(gauge) | Costo del montón|
| **hazelcast.imap.local_hits** <br>(gauge) | Resultados|
| **hazelcast.imap.local_last_access_time** <br>(gauge) | Hora del último acceso|
| **hazelcast.imap.local_last_update_time** <br>(gauge) | Hora de la última actualización|
| **hazelcast.imap.local_locked_entry_count** <br>(gauge) | Recuento de entradas bloqueadas|
| **hazelcast.imap.local_max_get_latency** <br>(gauge) | Latencia máxima de obtención|
| **hazelcast.imap.local_max_put_latency** <br>(gauge) | Latencia máxima de ventas|
| **hazelcast.imap.local_max_remove_latency** <br>(gauge) | Latencia máxima de eliminación|
| **hazelcast.imap.local_other_operation_count** <br>(gauge) | Otro recuento de operaciones (keySet,entrySet etc.)|
| **hazelcast.imap.local_owned_entry_count** <br>(gauge) | Recuento de entradas propias|
| **hazelcast.imap.local_owned_entry_memory_cost** <br>(gauge) | Costo de la memoria de entrada propia|
| **hazelcast.imap.local_put_operation_count** <br>(gauge) | Recuento de operaciones de venta|
| **hazelcast.imap.local_remove_operation_count** <br>(gauge) | Eliminar el recuento de operaciones|
| **hazelcast.imap.local_total** <br>(gauge) | Recuento total de operaciones|
| **hazelcast.imap.local_total_get_latency** <br>(gauge) | Latencia total de obtención|
| **hazelcast.imap.local_total_put_latency** <br>(gauge) | Latencia total de ventas|
| **hazelcast.imap.local_total_remove_latency** <br>(gauge) | Latencia total de eliminación|
| **hazelcast.imap.size** <br>(gauge) | Tamaño|
| **hazelcast.instance.cluster_time** <br>(gauge) | Tiempo transcurrido desde que se creó la instancia|
| **hazelcast.instance.managed_executor_service.completed_task_count** <br>(gauge) | Recuento de tareas finalizadas|
| **hazelcast.instance.managed_executor_service.is_shutdown** <br>(gauge) | |
| **hazelcast.instance.managed_executor_service.is_terminated** <br>(gauge) | |
| **hazelcast.instance.managed_executor_service.maximum_pool_size** <br>(gauge) | Recuento máximo de subprocesos del grupo|
| **hazelcast.instance.managed_executor_service.pool_size** <br>(gauge) | Recuento de subprocesos del grupo|
| **hazelcast.instance.managed_executor_service.queue_size** <br>(gauge) | Tamaño de la cola de trabajo|
| **hazelcast.instance.managed_executor_service.remaining_queue_capacity** <br>(gauge) | Capacidad restante de la cola de trabajo|
| **hazelcast.instance.member_count** <br>(gauge) | Tamaño del clúster|
| **hazelcast.instance.partition_service.active_partition_count** <br>(gauge) | Recuento de particiones activas|
| **hazelcast.instance.partition_service.is_cluster_safe** <br>(gauge) | Estado seguro del clúster|
| **hazelcast.instance.partition_service.is_local_member_safe** <br>(gauge) | Estado seguro de miembro local|
| **hazelcast.instance.partition_service.partition_count** <br>(gauge) | Recuento de particiones|
| **hazelcast.instance.running** <br>(gauge) | Estado de ejecución|
| **hazelcast.instance.version** <br>(gauge) | La versión de Hazelcast|
| **hazelcast.iqueue.average_age** <br>(gauge) | Antigüedad media<br>_Se muestra como segundo_ |
| **hazelcast.iqueue.backup_item_count** <br>(gauge) | Recuento de elementos de copia de seguridad|
| **hazelcast.iqueue.empty_poll_operation_count** <br>(gauge) | Recuento de sondeos vacíos|
| **hazelcast.iqueue.event_operation_count** <br>(gauge) | Recuento de operaciones de eventos|
| **hazelcast.iqueue.maximum_age** <br>(gauge) | Antigüedad máxima<br>_Se muestra como segundo_ |
| **hazelcast.iqueue.minimum_age** <br>(gauge) | Antigüedad mínima<br>_Se muestra como segundo_ |
| **hazelcast.iqueue.offer_operation_count** <br>(gauge) | Recuento de ofertas|
| **hazelcast.iqueue.other_operation_count** <br>(gauge) | Recuento de otras operaciones|
| **hazelcast.iqueue.owned_item_count** <br>(gauge) | Recuento de elementos propios|
| **hazelcast.iqueue.poll_operation_count** <br>(gauge) | Recuento de sondeos|
| **hazelcast.iqueue.rejected_offer_operation_count** <br>(gauge) | Recuento de ofertas rechazadas|
| **hazelcast.mc.license_expiration_time** <br>(gauge) | El número de segundos hasta la expiración de la licencia<br>_Se muestra como segundo_ |
| **hazelcast.member.accepted_socket_count** <br>(gauge) | |
| **hazelcast.member.active_count** <br>(gauge) | |
| **hazelcast.member.active_members** <br>(gauge) | |
| **hazelcast.member.active_members_commit_index** <br>(gauge) | |
| **hazelcast.member.async_operations** <br>(gauge) | |
| **hazelcast.member.available_processors** <br>(gauge) | |
| **hazelcast.member.backup_timeout_millis** <br>(gauge) | |
| **hazelcast.member.backup_timeouts** <br>(gauge) | |
| **hazelcast.member.bytes_read** <br>(gauge) | |
| **hazelcast.member.bytes_received** <br>(gauge) | |
| **hazelcast.member.bytes_send** <br>(gauge) | |
| **hazelcast.member.bytes_transceived** <br>(gauge) | |
| **hazelcast.member.bytes_written** <br>(gauge) | |
| **hazelcast.member.call_timeout_count** <br>(gauge) | |
| **hazelcast.member.client_count** <br>(gauge) | |
| **hazelcast.member.closed_count** <br>(gauge) | |
| **hazelcast.member.cluster_start_time** <br>(gauge) | |
| **hazelcast.member.cluster_time** <br>(gauge) | |
| **hazelcast.member.cluster_time_diff** <br>(gauge) | |
| **hazelcast.member.cluster_up_time** <br>(gauge) | |
| **hazelcast.member.commit_count** <br>(gauge) | |
| **hazelcast.member.committed_heap** <br>(gauge) | |
| **hazelcast.member.committed_native** <br>(gauge) | |
| **hazelcast.member.committed_virtual_memory_size** <br>(gauge) | |
| **hazelcast.member.completed_count** <br>(gauge) | |
| **hazelcast.member.completed_migrations** <br>(gauge) | |
| **hazelcast.member.completed_operation_batch_count** <br>(gauge) | |
| **hazelcast.member.completed_operation_count** <br>(gauge) | |
| **hazelcast.member.completed_packet_count** <br>(gauge) | |
| **hazelcast.member.completed_partition_specific_runnable_count** <br>(gauge) | |
| **hazelcast.member.completed_runnable_count** <br>(gauge) | |
| **hazelcast.member.completed_task_count** <br>(gauge) | |
| **hazelcast.member.completed_tasks** <br>(gauge) | |
| **hazelcast.member.completed_total_count** <br>(gauge) | |
| **hazelcast.member.connection_listener_count** <br>(gauge) | |
| **hazelcast.member.count** <br>(gauge) | |
| **hazelcast.member.created_count** <br>(gauge) | |
| **hazelcast.member.daemon_thread_count** <br>(gauge) | |
| **hazelcast.member.delayed_execution_count** <br>(gauge) | |
| **hazelcast.member.destroyed_count** <br>(gauge) | |
| **hazelcast.member.destroyed_group_ids** <br>(gauge) | |
| **hazelcast.member.elapsed_destination_commit_time** <br>(gauge) | |
| **hazelcast.member.elapsed_migration_operation_time** <br>(gauge) | |
| **hazelcast.member.elapsed_migration_time** <br>(gauge) | |
| **hazelcast.member.error_count** <br>(gauge) | |
| **hazelcast.member.event_count** <br>(gauge) | |
| **hazelcast.member.event_queue_size** <br>(gauge) | |
| **hazelcast.member.events_processed** <br>(gauge) | |
| **hazelcast.member.exception_count** <br>(gauge) | |
| **hazelcast.member.failed_backups** <br>(gauge) | |
| **hazelcast.member.frames_transceived** <br>(gauge) | |
| **hazelcast.member.free_heap** <br>(gauge) | |
| **hazelcast.member.free_memory** <br>(gauge) | |
| **hazelcast.member.free_native** <br>(gauge) | |
| **hazelcast.member.free_physical** <br>(gauge) | |
| **hazelcast.member.free_physical_memory_size** <br>(gauge) | |
| **hazelcast.member.free_space** <br>(gauge) | |
| **hazelcast.member.free_swap_space_size** <br>(gauge) | |
| **hazelcast.member.generic_priority_queue_size** <br>(gauge) | |
| **hazelcast.member.generic_queue_size** <br>(gauge) | |
| **hazelcast.member.generic_thread_count** <br>(gauge) | |
| **hazelcast.member.groups** <br>(gauge) | |
| **hazelcast.member.heartbeat_broadcast_period_millis** <br>(gauge) | |
| **hazelcast.member.heartbeat_packets_received** <br>(gauge) | |
| **hazelcast.member.heartbeat_packets_sent** <br>(gauge) | |
| **hazelcast.member.idle_time_millis** <br>(gauge) | |
| **hazelcast.member.idle_time_ms** <br>(gauge) | |
| **hazelcast.member.imbalance_detected_count** <br>(gauge) | |
| **hazelcast.member.in_progress_count** <br>(gauge) | |
| **hazelcast.member.invocation_scan_period_millis** <br>(gauge) | |
| **hazelcast.member.invocation_timeout_millis** <br>(gauge) | |
| **hazelcast.member.invocations.last_call_id** <br>(gauge) | |
| **hazelcast.member.invocations.pending** <br>(gauge) | |
| **hazelcast.member.invocations.used_percentage** <br>(gauge) | |
| **hazelcast.member.io_thread_id** <br>(gauge) | |
| **hazelcast.member.last_heartbeat** <br>(gauge) | |
| **hazelcast.member.last_repartition_time** <br>(gauge) | |
| **hazelcast.member.listener_count** <br>(gauge) | |
| **hazelcast.member.loaded_classes_count** <br>(gauge) | |
| **hazelcast.member.local_clock_time** <br>(gauge) | |
| **hazelcast.member.local_partition_count** <br>(gauge) | |
| **hazelcast.member.major_count** <br>(gauge) | |
| **hazelcast.member.major_time** <br>(gauge) | |
| **hazelcast.member.max_backup_count** <br>(gauge) | |
| **hazelcast.member.max_cluster_time_diff** <br>(gauge) | |
| **hazelcast.member.max_file_descriptor_count** <br>(gauge) | |
| **hazelcast.member.max_heap** <br>(gauge) | |
| **hazelcast.member.max_memory** <br>(gauge) | |
| **hazelcast.member.max_metadata** <br>(gauge) | |
| **hazelcast.member.max_native** <br>(gauge) | |
| **hazelcast.member.maximum_pool_size** <br>(gauge) | |
| **hazelcast.member.member_groups_size** <br>(gauge) | |
| **hazelcast.member.migration_active** <br>(gauge) | |
| **hazelcast.member.migration_completed_count** <br>(gauge) | |
| **hazelcast.member.migration_queue_size** <br>(gauge) | |
| **hazelcast.member.minor_count** <br>(gauge) | |
| **hazelcast.member.minor_time** <br>(gauge) | |
| **hazelcast.member.missing_members** <br>(gauge) | |
| **hazelcast.member.nodes** <br>(gauge) | |
| **hazelcast.member.normal_frames_read** <br>(gauge) | |
| **hazelcast.member.normal_frames_written** <br>(gauge) | |
| **hazelcast.member.normal_pending_count** <br>(gauge) | |
| **hazelcast.member.normal_timeouts** <br>(gauge) | |
| **hazelcast.member.open_file_descriptor_count** <br>(gauge) | |
| **hazelcast.member.opened_count** <br>(gauge) | |
| **hazelcast.member.operation_timeout_count** <br>(gauge) | |
| **hazelcast.member.owner_id** <br>(gauge) | |
| **hazelcast.member.park_queue_count** <br>(gauge) | |
| **hazelcast.member.partition_thread_count** <br>(gauge) | |
| **hazelcast.member.peak_thread_count** <br>(gauge) | |
| **hazelcast.member.planned_migrations** <br>(gauge) | |
| **hazelcast.member.pool_size** <br>(gauge) | |
| **hazelcast.member.priority_frames_read** <br>(gauge) | |
| **hazelcast.member.priority_frames_transceived** <br>(gauge) | |
| **hazelcast.member.priority_frames_written** <br>(gauge) | |
| **hazelcast.member.priority_pending_count** <br>(gauge) | |
| **hazelcast.member.priority_queue_size** <br>(gauge) | |
| **hazelcast.member.priority_write_queue_size** <br>(gauge) | |
| **hazelcast.member.process_count** <br>(gauge) | |
| **hazelcast.member.process_cpu_load** <br>(gauge) | |
| **hazelcast.member.process_cpu_time** <br>(gauge) | |
| **hazelcast.member.proxy_count** <br>(gauge) | |
| **hazelcast.member.publication_count** <br>(gauge) | |
| **hazelcast.member.queue_capacity** <br>(gauge) | |
| **hazelcast.member.queue_size** <br>(gauge) | |
| **hazelcast.member.rejected_count** <br>(gauge) | |
| **hazelcast.member.remaining_queue_capacity** <br>(gauge) | |
| **hazelcast.member.replica_sync_requests_counter** <br>(gauge) | |
| **hazelcast.member.replica_sync_semaphore** <br>(gauge) | |
| **hazelcast.member.response_queue_size** <br>(gauge) | |
| **hazelcast.member.responses.backup_count** <br>(gauge) | |
| **hazelcast.member.responses.error_count** <br>(gauge) | |
| **hazelcast.member.responses.missing_count** <br>(gauge) | |
| **hazelcast.member.responses.normal_count** <br>(gauge) | |
| **hazelcast.member.responses.timeout_count** <br>(gauge) | |
| **hazelcast.member.retry_count** <br>(gauge) | |
| **hazelcast.member.rollback_count** <br>(gauge) | |
| **hazelcast.member.running_count** <br>(gauge) | |
| **hazelcast.member.running_generic_count** <br>(gauge) | |
| **hazelcast.member.running_partition_count** <br>(gauge) | |
| **hazelcast.member.scheduled** <br>(gauge) | |
| **hazelcast.member.selector_i_o_exception_count** <br>(gauge) | |
| **hazelcast.member.selector_rebuild_count** <br>(gauge) | |
| **hazelcast.member.selector_recreate_count** <br>(gauge) | |
| **hazelcast.member.size** <br>(gauge) | |
| **hazelcast.member.start_count** <br>(gauge) | |
| **hazelcast.member.started_migrations** <br>(gauge) | |
| **hazelcast.member.sync_delivery_failure_count** <br>(gauge) | |
| **hazelcast.member.system_cpu_load** <br>(gauge) | |
| **hazelcast.member.system_load_average** <br>(gauge) | |
| **hazelcast.member.task_queue_size** <br>(gauge) | |
| **hazelcast.member.terminated_raft_node_group_ids** <br>(gauge) | |
| **hazelcast.member.text_count** <br>(gauge) | |
| **hazelcast.member.thread_count** <br>(gauge) | |
| **hazelcast.member.total_completed_migrations** <br>(gauge) | |
| **hazelcast.member.total_elapsed_destination_commit_time** <br>(gauge) | |
| **hazelcast.member.total_elapsed_migration_operation_time** <br>(gauge) | |
| **hazelcast.member.total_elapsed_migration_time** <br>(gauge) | |
| **hazelcast.member.total_failure_count** <br>(gauge) | |
| **hazelcast.member.total_loaded_classes_count** <br>(gauge) | |
| **hazelcast.member.total_memory** <br>(gauge) | |
| **hazelcast.member.total_parked_operation_count** <br>(gauge) | |
| **hazelcast.member.total_physical** <br>(gauge) | |
| **hazelcast.member.total_physical_memory_size** <br>(gauge) | |
| **hazelcast.member.total_registrations** <br>(gauge) | |
| **hazelcast.member.total_space** <br>(gauge) | |
| **hazelcast.member.total_started_thread_count** <br>(gauge) | |
| **hazelcast.member.total_swap_space_size** <br>(gauge) | |
| **hazelcast.member.unknown_count** <br>(gauge) | |
| **hazelcast.member.unknown_time** <br>(gauge) | |
| **hazelcast.member.unloaded_classes_count** <br>(gauge) | |
| **hazelcast.member.uptime** <br>(gauge) | |
| **hazelcast.member.usable_space** <br>(gauge) | |
| **hazelcast.member.used_heap** <br>(gauge) | |
| **hazelcast.member.used_memory** <br>(gauge) | |
| **hazelcast.member.used_metadata** <br>(gauge) | |
| **hazelcast.member.used_native** <br>(gauge) | |
| **hazelcast.member.write_queue_size** <br>(gauge) | |
| **hazelcast.multimap.local_backup_count** <br>(gauge) | Recuento de copias de seguridad|
| **hazelcast.multimap.local_backup_entry_count** <br>(gauge) | Recuento de entradas de copia de seguridad|
| **hazelcast.multimap.local_backup_entry_memory_cost** <br>(gauge) | Costo de entrada de la copia de seguridad|
| **hazelcast.multimap.local_creation_time** <br>(gauge) | Hora de creación|
| **hazelcast.multimap.local_event_operation_count** <br>(gauge) | Recuento de eventos|
| **hazelcast.multimap.local_get_operation_count** <br>(gauge) | Obtener recuento de operaciones|
| **hazelcast.multimap.local_hits** <br>(gauge) | Resultados|
| **hazelcast.multimap.local_last_access_time** <br>(gauge) | Hora del último acceso|
| **hazelcast.multimap.local_last_update_time** <br>(gauge) | Hora de la última actualización|
| **hazelcast.multimap.local_locked_entry_count** <br>(gauge) | Recuento de entradas bloqueadas|
| **hazelcast.multimap.local_max_get_latency** <br>(gauge) | Latencia máxima de obtención|
| **hazelcast.multimap.local_max_put_latency** <br>(gauge) | Latencia máxima de ventas|
| **hazelcast.multimap.local_max_remove_latency** <br>(gauge) | Latencia máxima de eliminación|
| **hazelcast.multimap.local_other_operation_count** <br>(gauge) | Otro recuento de operaciones (keySet,entrySet etc.)|
| **hazelcast.multimap.local_owned_entry_count** <br>(gauge) | Recuento de entradas propias|
| **hazelcast.multimap.local_owned_entry_memory_cost** <br>(gauge) | Costo de la memoria de entrada propia|
| **hazelcast.multimap.local_put_operation_count** <br>(gauge) | Recuento de operaciones de venta|
| **hazelcast.multimap.local_remove_operation_count** <br>(gauge) | Eliminar recuento de operaciones|
| **hazelcast.multimap.local_total** <br>(gauge) | Recuento total de operaciones|
| **hazelcast.multimap.local_total_get_latency** <br>(gauge) | Latencia total de obtención|
| **hazelcast.multimap.local_total_put_latency** <br>(gauge) | Latencia total de ventas|
| **hazelcast.multimap.local_total_remove_latency** <br>(gauge) | Latencia total de eliminación|
| **hazelcast.multimap.size** <br>(gauge) | Tamaño|
| **hazelcast.reliabletopic.creation_time** <br>(gauge) | Hora de creación<br>_Se muestra como segundo_ |
| **hazelcast.reliabletopic.publish_operation_count** <br>(gauge) | Publicar recuento|
| **hazelcast.reliabletopic.receive_operation_count** <br>(gauge) | Recibir recuento|
| **hazelcast.replicatedmap.local_creation_time** <br>(gauge) | Hora de creación|
| **hazelcast.replicatedmap.local_event_operation_count** <br>(gauge) | Recuento de eventos|
| **hazelcast.replicatedmap.local_get_operation_count** <br>(gauge) | Obtener recuento de operaciones|
| **hazelcast.replicatedmap.local_hits** <br>(gauge) | Resultados|
| **hazelcast.replicatedmap.local_last_access_time** <br>(gauge) | Hora del último acceso|
| **hazelcast.replicatedmap.local_last_update_time** <br>(gauge) | Hora de la última actualización|
| **hazelcast.replicatedmap.local_max_get_latency** <br>(gauge) | Latencia máxima de obtención|
| **hazelcast.replicatedmap.local_max_put_latency** <br>(gauge) | Latencia máxima de venta|
| **hazelcast.replicatedmap.local_max_remove_latency** <br>(gauge) | Latencia máxima de eliminación|
| **hazelcast.replicatedmap.local_other_operation_count** <br>(gauge) | Otro recuento de operaciones (keySet,entrySet etc.)|
| **hazelcast.replicatedmap.local_owned_entry_count** <br>(gauge) | Recuento de entradas propias|
| **hazelcast.replicatedmap.local_put_operation_count** <br>(gauge) | Recuento de operaciones de venta|
| **hazelcast.replicatedmap.local_remove_operation_count** <br>(gauge) | Eliminar recuento de operaciones|
| **hazelcast.replicatedmap.local_total** <br>(gauge) | Recuento total de operaciones|
| **hazelcast.replicatedmap.local_total_get_latency** <br>(gauge) | Latencia total de obtención|
| **hazelcast.replicatedmap.local_total_put_latency** <br>(gauge) | Latencia total de ventas|
| **hazelcast.replicatedmap.local_total_remove_latency** <br>(gauge) | Latencia total de eliminación|
| **hazelcast.replicatedmap.size** <br>(gauge) | Tamaño|
| **hazelcast.topic.creation_time** <br>(gauge) | Hora de creación<br>_Se muestra como segundo_ |
| **hazelcast.topic.publish_operation_count** <br>(gauge) | Publicar recuento|
| **hazelcast.topic.receive_operation_count** <br>(gauge) | Recibir recuento|

### Checks de servicio

**hazelcast.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse a Hazelcast, `WARNING` si no se recopilan métricas y `OK` en caso contrario.

_Estados: ok, critical, warning_

**hazelcast.mc_cluster_state**

Representa el estado del Centro de Gestión de Hazelcast indicado por su check de estado.

_Estados: ok, critical, warning_

### Eventos

Hazelcast no incluye ningún evento.

### Checks de servicio

Consulta [service_checks.json](https://github.com/DataDog/integrations-core/blob/master/hazelcast/assets/service_checks.json) para obtener una lista de los checks de servicio proporcionadas por esta integración.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).