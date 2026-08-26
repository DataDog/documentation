---
aliases:
- /es/integrations/confluent_platform
app_id: confluent-platform
categories:
- recopilación de logs
custom_kind: integración
description: Monitoriza los componentes de Confluent Platform.
integration_version: 3.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Confluent Platform
---
## Información general

Este check monitoriza Confluent Platform y los componentes Kafka a través del Datadog Agent.

Este integración recopila métricas JMX para los siguientes componentes:

- Broker
- Conectar
- Replicador
- Registro de esquemas
- Servidor ksqlDB
- Flujos (streams)
- Proxy REST

Considera [Data Streams Monitoring](https://docs.datadoghq.com/data_streams/) para mejorar tu integración de Confluent Platform. Esta solución permite la visualización del pipeline y el seguimiento de retrasos, lo que te ayuda a identificar y resolver cuellos de botella.

## Configuración

### Instalación

El check de Confluent Platform se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest). No es necesaria ninguna instalación adicional en tu servidor de componentes de Confluent Platform.

**Nota**: Este check recopila métricas con JMX. Se necesita una JVM en cada nodo para que el Agent pueda ejecutar [jmxfetch](https://github.com/DataDog/jmxfetch). Se recomienda utilizar una JVM proporcionada por Oracle.

### Configuración

1. Edita el archivo `confluent_platform.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para recopilar los datos de rendimiento de Confluent Platform. Consulta el [confluent_platform.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/conf.yaml.example) para ver todas las opciones de configuración disponibles.

   Para cada componente, es necesario crear una instancia separada para recopilar sus métricas JMX. La lista de métricas recopiladas por defecto se encuentra en el [archivo `metrics.yaml`](https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/metrics.yaml), por ejemplo:

   ```yaml
   instances:
    - host: localhost
      port: 8686
      name: broker_instance
      user: username
      password: password
    - host: localhost
      port: 8687
      name: schema_registry_instance
    - host: localhost
      port: 8688
      name: rest_proxy_instance
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `confluent_platform.d/conf.yaml` para empezar a recopilar logs de componentes de Confluent Platform:

   ```yaml
     logs:
       - type: file
         path: <CONFLUENT_COMPONENT_PATH>/logs/*.log
         source: confluent_platform
         service: <SERVICE_NAME>
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \[\d{4}\-\d{2}\-\d{2}
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno. Consulta el [confluent_platform.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://github.com/DataDog/integrations-core/blob/master/confluent_platform/metadata.csv).

##### Recopilación de métricas

Para entornos en contenedores, consulta la guía [Autodiscovery con JMX](https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `confluent_platform` en la sección **JMXFetch**.

```
    ========
    JMXFetch
    ========

      Initialized checks
      ==================
        confluent_platform
          instance_name : confluent_platform-localhost-31006
          message :
          metric_count : 26
          service_check_count : 0
          status : OK
```

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **confluent.kafka.cluster.partition.under_min_isr** <br>(gauge) | Número de particiones cuyo recuento de réplicas sincronizadas es menor que minIsr. Estas particiones no estarán disponibles para los productores que utilicen acks=all.|
| **confluent.kafka.connect.connect_metrics.failed_authentication_rate** <br>(gauge) | Tasa de autenticación fallida|
| **confluent.kafka.connect.connect_metrics.failed_authentication_total** <br>(gauge) | total de autenticaciones fallidas|
| **confluent.kafka.connect.connect_metrics.incoming_byte_rate** <br>(gauge) | Tasa de bytes entrantes<br>_Se muestra como byte_ |
| **confluent.kafka.connect.connect_metrics.outgoing_byte_rate** <br>(gauge) | Byte_rate saliente<br>_Se muestra como byte_ |
| **confluent.kafka.connect.connect_metrics.successful_authentication_rate** <br>(gauge) | Tasa de autenticación correcta|
| **confluent.kafka.connect.connect_metrics.successful_authentication_total** <br>(gauge) | total de autenticaciones correctas|
| **confluent.kafka.connect.connector_metrics.status** <br>(gauge) | Estado del conector|
| **confluent.kafka.connect.connector_task.batch_size_avg** <br>(gauge) | El tamaño medio de los lotes procesados por el conector.|
| **confluent.kafka.connect.connector_task.batch_size_max** <br>(gauge) | El tamaño máximo de los lotes procesados por el conector.|
| **confluent.kafka.connect.connector_task.offset_commit_avg_time_ms** <br>(gauge) | El tiempo medio en milisegundos que tarda esta tarea en confirmar el desfase.<br>_Se muestra como milisegundo_ |
| **confluent.kafka.connect.connector_task.offset_commit_failure_percentage** <br>(gauge) | Porcentaje medio de intentos fallidos de confirmación de desfase de esta tarea.<br>_Se muestra como porcentaje_ |
| **confluent.kafka.connect.connector_task.offset_commit_max_time_ms** <br>(gauge) | El tiempo máximo en milisegundos que tarda esta tarea en confirmar el desfase.<br>_Se muestra como milisegundo_ |
| **confluent.kafka.connect.connector_task.offset_commit_success_percentage** <br>(gauge) | Porcentaje medio de los intentos de confirmación de desfase de esta tarea que han tenido éxito.<br>_Se muestra como porcentaje_ |
| **confluent.kafka.connect.connector_task.pause_ratio** <br>(gauge) | La fracción de tiempo que esta tarea ha pasado en estado de pausa.<br>_Se muestra como fracción_ |
| **confluent.kafka.connect.connector_task.running_ratio** <br>(gauge) | La fracción de tiempo que esta tarea ha pasado en estado de ejecución.<br>_Se muestra como fracción_ |
| **confluent.kafka.connect.sink_task.offset_commit_completion_rate** <br>(gauge) | Número medio por segundo de confirmaciones de desfase completadas con éxito.<br>_Se muestra como confirmación_ |
| **confluent.kafka.connect.sink_task.offset_commit_completion_total** <br>(gauge) | Número total de confirmaciones de desfase completadas con éxito.<br>_Se muestra como confirmación_ |
| **confluent.kafka.connect.sink_task.offset_commit_seq_no** <br>(gauge) | El número de secuencia actual para las confirmaciones de desfase.|
| **confluent.kafka.connect.sink_task.offset_commit_skip_rate** <br>(gauge) | Número medio por segundo de confirmaciones de desfase recibidas demasiado tarde y omitidas/ignoradas.<br>_Se muestra como confirmación_ |
| **confluent.kafka.connect.sink_task.offset_commit_skip_total** <br>(gauge) | Número total de confirmaciones de desfase recibidas demasiado tarde y omitidas/ignoradas.<br>_Se muestra como confirmación_ |
| **confluent.kafka.connect.sink_task.partition_count** <br>(gauge) | El número de particiones temáticas asignadas a esta tarea que pertenecen al conector de sink nombrado en este worker.|
| **confluent.kafka.connect.sink_task.put_batch_avg_time_ms** <br>(gauge) | El tiempo medio que tarda esta tarea en poner un lote de registros de sinks.<br>_Se muestra como milisegundo_ |
| **confluent.kafka.connect.sink_task.put_batch_max_time_ms** <br>(gauge) | El tiempo máximo que tarda esta tarea en poner un lote de registros de sinks.<br>_Se muestra como milisegundo_ |
| **confluent.kafka.connect.sink_task.sink_record_active_count** <br>(gauge) | El número de registros que han sido leídos desde Kafka pero que aún no han sido confirmados por la tarea sink.<br>_Se muestra como registro_ |
| **confluent.kafka.connect.sink_task.sink_record_active_count_avg** <br>(gauge) | El número medio de registros que se han leído de Kafka pero que aún no han sido confirmados/descargados/reconocidos completamente por la tarea sink.<br>Se muestra como registro__ |
| **confluent.kafka.connect.sink_task.sink_record_active_count_max** <br>(gauge) | El número máximo de registros que se han leído de Kafka pero que aún no han sido confirmados/descargados/reconocidos completamente por la tarea sink.<br>_Se muestra como registro_ |
| **confluent.kafka.connect.sink_task.sink_record_lag_max** <br>(gauge) | El retraso máximo en términos de número de registros que la tarea sink está por detrás de la posición del consumidor para cualquier partición temática.<br>_Se muestra como registro_ |
| **confluent.kafka.connect.sink_task.sink_record_read_rate** <br>(gauge) | El número medio por segundo de registros leídos de Kafka para esta tarea perteneciente al conector sink nombrado en este worker. Esto es antes de que se apliquen las transformaciones.<br>_Se muestra como registro_ |
| **confluent.kafka.connect.sink_task.sink_record_read_total** <br>(gauge) | El número total de registros leídos desde Kafka por esta tarea pertenecientes al conector sink nombrado en este worker, desde que la tarea se reinició por última vez.<br>_Se muestra como registro_ |
| **confluent.kafka.connect.sink_task.sink_record_send_rate** <br>(gauge) | Número medio por segundo de registros obtenidos de las transformaciones y enviados/introducidos en esta tarea que pertenecen al conector sink indicado en este worker. Esto es después de aplicar las transformaciones y excluye cualquier registro filtrado por las transformaciones.<br>_Se muestra como registro_ |
| **confluent.kafka.connect.sink_task.sink_record_send_total** <br>(gauge) | El número total de registros emitidos por las transformaciones y enviados/introducidos en esta tarea pertenecientes al conector sink nombrado en este worker, desde que la tarea se reinició por última vez.<br>_Se muestra como registro_ |
| **confluent.kafka.connect.source_task.poll_batch_avg_time_ms** <br>(gauge) | El tiempo medio en milisegundos que tarda esta tarea en sondear un lote de registros de fuente.<br>_Se muestra como milisegundo_ |
| **confluent.kafka.connect.source_task.poll_batch_max_time_ms** <br>(gauge) | El tiempo máximo en milisegundos que tarda esta tarea en sondear un lote de registros fuente.<br>_Se muestra como milisegundo_ |
| **confluent.kafka.connect.source_task.source_record_active_count** <br>(gauge) | El número de registros que ha producido esta tarea, pero que aún no se han escrito completamente en Kafka.<br>_Se muestra como registro_ |
| **confluent.kafka.connect.source_task.source_record_active_count_avg** <br>(gauge) | El número medio de registros que han sido producidos por esta tarea, pero que aún no se han escrito completamente en Kafka.<br>_Se muestra como registro_ |
| **confluent.kafka.connect.source_task.source_record_active_count_max** <br>(gauge) | El número máximo de registros que ha producido esta tarea, pero que aún no se han escrito completamente en Kafka.<br>_Se muestra como registro_ |
| **confluent.kafka.connect.source_task.source_record_poll_rate** <br>(gauge) | El número medio por segundo de registros producidos/encuestados (antes de la transformación) por esta tarea perteneciente al conector fuente nombrado en este worker.<br>_Se muestra como registro_ |
| **confluent.kafka.connect.source_task.source_record_poll_total** <br>(gauge) | El número total de registros producidos/encuestados (antes de la transformación) por esta tarea perteneciente al conector fuente nombrado en este worker.<br>_Se muestra como registro_ |
| **confluent.kafka.connect.source_task.source_record_write_rate** <br>(gauge) | El número medio por segundo de registros obtenidos de las transformaciones y escritos en Kafka para esta tarea perteneciente al conector fuente nombrado en este worker. Esto es después de aplicar las transformaciones y excluye cualquier registro filtrado por las transformaciones.<br>_Se muestra como registro_ |
| **confluent.kafka.connect.source_task.source_record_write_total** <br>(gauge) | El número de registros emitidos desde las transformaciones y escritos en Kafka para esta tarea perteneciente al conector fuente nombrado en este worker, desde que la tarea se reinició por última vez.<br>_Se muestra como registro_ |
| **confluent.kafka.connect.task_error.deadletterqueue_produce_failures** <br>(gauge) | El número de escrituras fallidas en la cola de mensajes no entregados.|
| **confluent.kafka.connect.task_error.deadletterqueue_produce_requests** <br>(gauge) | El número de intentos de escritura en la cola de mensajes no entregados.|
| **confluent.kafka.connect.task_error.last_error_timestamp** <br>(gauge) | La fecha y hora en que esta tarea encontró un error por última vez en milisegundos.<br>_Se muestra como milisegundo_ |
| **confluent.kafka.connect.task_error.total_errors_logged** <br>(gauge) | El número de errores que se han registrado.<br>_Se muestra como error_ |
| **confluent.kafka.connect.task_error.total_record_errors** <br>(gauge) | El número de errores de procesamiento de registros en esta tarea.<br>_Se muestra como registro_ |
| **confluent.kafka.connect.task_error.total_record_failures** <br>(gauge) | El número de fallos en el procesamiento de registros en esta tarea.<br>_Se muestra como registro_ |
| **confluent.kafka.connect.task_error.total_records_skipped** <br>(gauge) | El número de registros omitidos debido a errores.<br>_Se muestra como registro_ |
| **confluent.kafka.connect.task_error.total_retries** <br>(gauge) | El número de operaciones reintentadas.<br>_Se muestra como operación_ |
| **confluent.kafka.connect.worker.connector_count** <br>(gauge) | El número de conectores ejecutados en este worker.<br>_Se muestra como registro_ |
| **confluent.kafka.connect.worker.connector_destroyed_task_count** <br>(gauge) | El número de tareas destruidas del conector en el worker.<br>_Se muestra como tarea_ |
| **confluent.kafka.connect.worker.connector_failed_task_count** <br>(gauge) | El número de tareas fallidas del conector en el worker.<br>_Se muestra como tarea_ |
| **confluent.kafka.connect.worker.connector_paused_task_count** <br>(gauge) | El número de tareas en pausa del conector en el worker.<br>_Se muestra como tarea_ |
| **confluent.kafka.connect.worker.connector_running_task_count** <br>(gauge) | El número de tareas en ejecución del conector en el worker.<br>_Se muestra como tarea_ |
| **confluent.kafka.connect.worker.connector_startup_attempts_total** <br>(gauge) | El número total de arranques de conectores que este worker ha intentado.|
| **confluent.kafka.connect.worker.connector_startup_failure_percentage** <br>(gauge) | Porcentaje medio de conectores de este worker que han fallado.<br>_Se muestra como porcentaje_ |
| **confluent.kafka.connect.worker.connector_startup_failure_total** <br>(gauge) | El número total de arranques del conector que fallaron.|
| **confluent.kafka.connect.worker.connector_startup_success_percentage** <br>(gauge) | Porcentaje medio de las conexiones de este worker que han tenido éxito.<br>_Se muestra como porcentaje_ |
| **confluent.kafka.connect.worker.connector_startup_success_total** <br>(gauge) | El número total de arranques de conectores que han tenido éxito.|
| **confluent.kafka.connect.worker.connector_total_task_count** <br>(gauge) | El número de tareas del conector en el worker.<br>_Se muestra como tarea_ |
| **confluent.kafka.connect.worker.connector_unassigned_task_count** <br>(gauge) | El número de tareas no asignadas del conector en el worker.<br>_Se muestra como tarea_ |
| **confluent.kafka.connect.worker.task_count** <br>(gauge) | El número de tareas ejecutadas en este worker.<br>_Se muestra como tarea_ |
| **confluent.kafka.connect.worker.task_startup_attempts_total** <br>(gauge) | El número total de inicios de tarea que este worker ha intentado.|
| **confluent.kafka.connect.worker.task_startup_failure_percentage** <br>(gauge) | Porcentaje medio de tareas iniciadas por este worker que han fracasado.<br>_Se muestra como porcentaje_ |
| **confluent.kafka.connect.worker.task_startup_failure_total** <br>(gauge) | Número total de tareas iniciadas que han fallado.|
| **confluent.kafka.connect.worker.task_startup_success_percentage** <br>(gauge) | Porcentaje medio de las tareas iniciadas por este worker que tuvieron éxito.<br>_Se muestra como porcentaje_ |
| **confluent.kafka.connect.worker.task_startup_success_total** <br>(gauge) | Número total de tareas iniciadas con éxito.|
| **confluent.kafka.connect.worker_rebalance.completed_rebalances_total** <br>(gauge) | El número total de reequilibrios completados por este worker.|
| **confluent.kafka.connect.worker_rebalance.epoch** <br>(gauge) | El número de epoch o generación de este worker.|
| **confluent.kafka.connect.worker_rebalance.rebalance_avg_time_ms** <br>(gauge) | El tiempo medio en milisegundos empleado por este worker para reequilibrar.<br>_Se muestra como milisegundo_ |
| **confluent.kafka.connect.worker_rebalance.rebalance_max_time_ms** <br>(gauge) | El tiempo máximo en milisegundos empleado por este worker para reequilibrar.<br>_Se muestra como milisegundo_ |
| **confluent.kafka.connect.worker_rebalance.rebalancing** <br>(gauge) | Si este worker se está reequilibrando actualmente.|
| **confluent.kafka.connect.worker_rebalance.time_since_last_rebalance_ms** <br>(gauge) | El tiempo en milisegundos desde que este worker completó el reequilibrio más reciente.<br>_Se muestra como milisegundo_ |
| **confluent.kafka.consumer.bytes_consumed_rate** <br>(gauge) | Indica el rendimiento del replicador al leer eventos del clúster de origen.<br>_Se muestra como byte_ |
| **confluent.kafka.consumer.connection_count** <br>(gauge) | El número actual de conexiones activas en el consumidor.<br>_Se muestra como conexión_ |
| **confluent.kafka.consumer.fetch.bytes_consumed_rate** <br>(gauge) | El número medio de bytes consumidos por segundo.<br>_Se muestra como byte_ |
| **confluent.kafka.consumer.fetch.fetch_latency_avg** <br>(gauge) | El tiempo medio que tarda una solicitud de búsqueda.<br>_Se muestra en milisegundos_ |
| **confluent.kafka.consumer.fetch.fetch_latency_max** <br>(gauge) | El tiempo máximo que tarda una solicitud de búsqueda.<br>_Se muestra en milisegundos_ |
| **confluent.kafka.consumer.fetch.fetch_rate** <br>(gauge) | Número de solicitudes de búsqueda por segundo.<br>_Se muestra como solicitud_ |
| **confluent.kafka.consumer.fetch.fetch_size_avg** <br>(gauge) | Número medio de bytes recuperados por solicitud de recuperación.<br>_Se muestra como byte_ |
| **confluent.kafka.consumer.fetch.fetch_size_max** <br>(gauge) | El número máximo de bytes obtenidos por solicitud de obtención.<br>_Se muestra como byte_ |
| **confluent.kafka.consumer.fetch.fetch_throttle_time_avg** <br>(gauge) | El tiempo medio de aceleración en ms. Cuando las cuotas están habilitadas, el broker puede retrasar las solicitudes de obtención para limitar a un consumidor que ha excedido su límite. Esta métrica indica cómo se ha añadido de media el tiempo de limitación a las solicitudes de obtención.<br>_Se muestra en milisegundos_ |
| **confluent.kafka.consumer.fetch.fetch_throttle_time_max** <br>(gauge) | El tiempo máximo de aceleración en ms.<br>_Se muestra como milisegundo_ |
| **confluent.kafka.consumer.fetch.records_consumed_rate** <br>(gauge) | El número medio de registros consumidos por segundo.<br>_Se muestra como registro_ |
| **confluent.kafka.consumer.fetch.records_lag_max** <br>(gauge) | El retraso máximo en términos de número de registros para cualquier partición en esta ventana. Un valor creciente a lo largo del tiempo es tu mejor indicación de que el grupo de consumidores no está siguiendo el ritmo de los productores.<br>_Se muestra como registro_ |
| **confluent.kafka.consumer.fetch.records_per_request_avg** <br>(gauge) | El número medio de registros en cada solicitud.<br>_Se muestra como registro__ |
| **confluent.kafka.consumer.fetch_rate** <br>(gauge) | El número de búsquedas por segundo.<br>_Se muestra como solicitud_ |
| **confluent.kafka.consumer.fetch_size_avg** <br>(gauge) | El número medio de bytes obtenidos por solicitud<br>_Se muestra como byte_ |
| **confluent.kafka.consumer.fetch_size_max** <br>(gauge) | El número máximo de bytes obtenidos por solicitud.<br>_Se muestra como byte_ |
| **confluent.kafka.consumer.fetch_throttle_time_avg** <br>(gauge) | Las solicitudes de obtención pueden ser limitadas para cumplir con las cuotas configuradas en el clúster de origen. Si este promedio es distinto de cero, indica que los brokers de origen están ralentizando al consumidor y que debería revisarse la configuración de cuotas. Para obtener más información sobre cuotas, consulte Aplicación de cuotas de cliente<br>_Se muestra en milisegundos_ |
| **confluent.kafka.consumer.fetch_throttle_time_max** <br>(gauge) | Las solicitudes de obtención pueden ser limitadas para cumplir con las cuotas configuradas en el clúster de origen. Si este máximo es distinto de cero, indica que los brokers de origen están ralentizando al consumidor y que debería revisarse la configuración de cuotas. Para más información sobre cuotas, consulte Aplicación de cuotas de cliente<br>_Se muestra en milisegundos_ |
| **confluent.kafka.consumer.fetch_topic.bytes_consumed_rate** <br>(gauge) | El número medio de bytes consumidos por segundo para un tema específico.<br>_Se muestra como byte_ |
| **confluent.kafka.consumer.fetch_topic.fetch_size_avg** <br>(gauge) | El número medio de bytes obtenidos por solicitud para un tema específico.<br>_Se muestra como byte_ |
| **confluent.kafka.consumer.fetch_topic.fetch_size_max** <br>(gauge) | El número máximo de bytes obtenidos por solicitud para un tema específico.<br>_Se muestra como byte_ |
| **confluent.kafka.consumer.fetch_topic.records_consumed_rate** <br>(gauge) | El número medio de registros consumidos por segundo para un tema específico.<br>_Se muestra como registro_ |
| **confluent.kafka.consumer.fetch_topic.records_per_request_avg** <br>(gauge) | El número medio de registros en cada solicitud para un tema específico.<br>_Se muestra como registro_ |
| **confluent.kafka.consumer.group.assigned_partitions** <br>(gauge) | El número de particiones asignadas actualmente a este consumidor.<br>_Se muestra como unidad_ |
| **confluent.kafka.consumer.group.commit_latency_avg** <br>(gauge) | El tiempo medio que tarda una solicitud de confirmación.<br>_Se muestra en milisegundos_ |
| **confluent.kafka.consumer.group.commit_latency_max** <br>(gauge) | El tiempo máximo que tarda una solicitud de confirmación.<br>_Se muestra en milisegundos_ |
| **confluent.kafka.consumer.group.commit_rate** <br>(gauge) | El número de llamadas de confirmación por segundo<br>_Se muestra como confirmación_ |
| **confluent.kafka.consumer.group.heartbeat_rate** <br>(gauge) | El número medio de latidos por segundo.<br>_Se muestra como operación_ |
| **confluent.kafka.consumer.group.heartbeat_response_time_max** <br>(gauge) | El tiempo máximo que se tarda en recibir una respuesta a una solicitud de latido.<br>_Se muestra como milisegundo_ |
| **confluent.kafka.consumer.group.join_rate** <br>(gauge) | Número de uniones de grupo por segundo. La unión de grupos es la primera fase del protocolo de reequilibrio. Un valor grande indica que el grupo consumidor es inestable y que probablemente se unirá con mayor retardo.<br>_Se muestra como operación_ |
| **confluent.kafka.consumer.group.join_time_avg** <br>(gauge) | El tiempo medio que se tarda en volver a unirse a un grupo.<br>_Se muestra en milisegundos_ |
| **confluent.kafka.consumer.group.join_time_max** <br>(gauge) | El tiempo máximo que se tarda en volver a unirse a un grupo. Este valor no debe ser muy superior al tiempo de espera de sesión configurado para el consumidor.<br>_Se muestra en milisegundos_ |
| **confluent.kafka.consumer.group.last_heartbeat_seconds_ago** <br>(gauge) | El número de segundos transcurridos desde el último latido del controlador.<br>_Se muestra como segundo_ |
| **confluent.kafka.consumer.group.sync_rate** <br>(gauge) | El número de sincronizaciones de grupo por segundo. La sincronización de grupos es la segunda y última fase del protocolo de reequilibrio.<br>_Se muestra como operación_ |
| **confluent.kafka.consumer.group.sync_time_avg** <br>(gauge) | El tiempo medio que tarda una sincronización de grupo.<br>_Se muestra en milisegundos_ |
| **confluent.kafka.consumer.group.sync_time_max** <br>(gauge) |  El tiempo máximo que tarda una sincronización de grupo.<br>_Se muestra en milisegundos_ |
| **confluent.kafka.consumer.io_ratio** <br>(gauge) | La fracción de tiempo que el subproceso consumidor de E/S pasó haciendo E/S<br>_Se muestra como fracción_ |
| **confluent.kafka.consumer.io_wait_ratio** <br>(gauge) | La fracción de tiempo que el subproceso consumidor de E/S pasó esperando<br>_Se muestra como fracción_ |
| **confluent.kafka.consumer.network_io_rate** <br>(gauge) | El número de operaciones de red (lecturas o escrituras) en todas las conexiones de consumidores por segundo<br>_Se muestra como conexión_ |
| **confluent.kafka.consumer.records_lag_max** <br>(gauge) | El retraso máximo en términos de número de registros para cualquier partición. Un valor creciente con el tiempo indica que Replicator no está manteniendo el ritmo al que se escriben los eventos en el clúster de origen.<br>_Se muestra como registro_ |
| **confluent.kafka.consumer.request_latency_avg** <br>(gauge) | La latencia media de la solicitud del consumidor en ms<br>_Se muestra como milisegundo_ |
| **confluent.kafka.consumer.request_rate** <br>(gauge) | El número de solicitudes enviadas por segundo por un consumidor<br>_Se muestra como solicitud_ |
| **confluent.kafka.consumer.response_rate** <br>(gauge) | El número de respuestas recibidas por segundo por un consumidor<br>_Se muestra como respuesta_ |
| **confluent.kafka.controller.active_controller_count** <br>(gauge) | Número de controladores activos en el clúster. Alerta si la suma agregada de todos los brokers del clúster es distinta de 1, ya que debería haber exactamente un controlador por clúster.|
| **confluent.kafka.controller.global_partition_count** <br>(gauge) | recuento global de particiones|
| **confluent.kafka.controller.global_topic_count** <br>(gauge) | recuento global de temas|
| **confluent.kafka.controller.global_under_min_isr_partition_count** <br>(gauge) | bajo recuento min isr|
| **confluent.kafka.controller.leader_election_rate_and_time_ms.avg** <br>(gauge) | Tasa de elección del líder media<br>_Se muestra en milisegundos_ |
| **confluent.kafka.controller.leader_election_rate_and_time_ms.rate** <br>(gauge) | Tasa de elección del líder.<br>_Se muestra en milisegundos_ |
| **confluent.kafka.controller.offline_partitions_count** <br>(gauge) | Número de particiones que no tienen un líder activo y por lo tanto no se pueden leer ni escribir. Alerta si el valor es mayor que 0.|
| **confluent.kafka.controller.preferred_replica_imbalance_count** <br>(gauge) | Recuento de desequilibrios de réplicas preferidas|
| **confluent.kafka.controller.unclean_leader_elections_per_sec.avg** <br>(gauge) | Tasa media de elección de líderes no depurados<br>_Se muestra como unidad_ |
| **confluent.kafka.controller.unclean_leader_elections_per_sec.rate** <br>(gauge) | Tasa de elección de líderes no depurados<br>_Se muestra como unidad_ |
| **confluent.kafka.log.log_flush_rate_and_time_ms.avg** <br>(gauge) | Tasa media de vaciado de logs.<br>_Se muestra en milisegundos_ |
| **confluent.kafka.log.log_flush_rate_and_time_ms.rate** <br>(gauge) | Tasa de vaciado de logs.<br>_Se muestra en milisegundos_ |
| **confluent.kafka.log.size** <br>(gauge) | Tamaño de logs por tema<br>_Se muestra como byte_ |
| **confluent.kafka.network.request.local_time_ms.50percentile** <br>(gauge) | Tiempo de procesamiento de la solicitud en el líder (percentil 50).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.local_time_ms.75percentile** <br>(gauge) | Tiempo de procesamiento de la solicitud en el líder (percentil 75).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.local_time_ms.95percentile** <br>(gauge) | Tiempo de procesamiento de la solicitud en el líder (percentil 95).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.local_time_ms.98percentile** <br>(gauge) | Tiempo de procesamiento de la solicitud en el líder (percentil 98).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.local_time_ms.999percentile** <br>(gauge) | Tiempo de procesamiento de la solicitud en el líder (percentil 999).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.local_time_ms.99percentile** <br>(gauge) | Tiempo de procesamiento de la solicitud en el líder (percentil 99).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.local_time_ms.avg** <br>(gauge) | Tiempo de procesamiento de la solicitud en el líder (promedio).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.local_time_ms.rate** <br>(gauge) | Tiempo que la solicitud se procesa en el líder (tasa).<br>_Se muestra como milisegundo_ |
| **confluent.kafka.network.request.remote_time_ms.50percentile** <br>(gauge) | Tiempo que la solicitud espera al seguidor. Es distinto de cero para las solicitudes produce cuando acks=all (percentil 50).<br>_Se muestra como milisegundo_ |
| **confluent.kafka.network.request.remote_time_ms.75percentile** <br>(gauge) | Tiempo que la solicitud espera al seguidor. Es distinto de cero para solicitudes produce cuando acks=all (percentil 75).<br>_Se muestra como milisegundo_ |
| **confluent.kafka.network.request.remote_time_ms.95percentile** <br>(gauge) | Tiempo que la solicitud espera al seguidor. Es distinto de cero para solicitudes produce cuando acks=all (percentil 95).<br>_Se muestra como milisegundo_ |
| **confluent.kafka.network.request.remote_time_ms.98percentile** <br>(gauge) | Tiempo que la solicitud espera al seguidor. Es distinto de cero para solicitudes produce cuando acks=all (percentil 98).<br>_Se muestra como milisegundo_ |
| **confluent.kafka.network.request.remote_time_ms.999percentile** <br>(gauge) | Tiempo que la solicitud espera al seguidor. Es distinto de cero para solicitudes produce cuando acks=all (percentil 999).<br>_Se muestra como milisegundo_ |
| **confluent.kafka.network.request.remote_time_ms.99percentile** <br>(gauge) | Tiempo que la solicitud espera al seguidor. Es distinto de cero para solicitudes produce cuando acks=all (percentil 99).<br>_Se muestra como milisegundo_ |
| **confluent.kafka.network.request.remote_time_ms.avg** <br>(gauge) | Tiempo que la solicitud espera al seguidor. Es distinto de cero para solicitudes produce cuando acks=all (promedio).<br>_Se muestra como milisegundo_ |
| **confluent.kafka.network.request.remote_time_ms.rate** <br>(gauge) | Tiempo que la solicitud espera al seguidor. Es distinto de cero para solicitudes produce cuando acks=all (tasa).<br>_Se muestra como milisegundo_ |
| **confluent.kafka.network.request.request_queue_time_ms.50percentile** <br>(gauge) | Tiempo que la solicitud espera en la cola de solicitudes (percentil 50).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.request_queue_time_ms.75percentile** <br>(gauge) | Tiempo que la solicitud espera en la cola de solicitudes (percentil 75).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.request_queue_time_ms.95percentile** <br>(gauge) | Tiempo que la solicitud espera en la cola de solicitudes (percentil 95).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.request_queue_time_ms.98percentile** <br>(gauge) | Tiempo que la solicitud espera en la cola de solicitudes (percentil 98).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.request_queue_time_ms.999percentile** <br>(gauge) | Tiempo que la solicitud espera en la cola de solicitudes (percentil 999).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.request_queue_time_ms.99percentile** <br>(gauge) | Tiempo que la solicitud espera en la cola de solicitudes (99 percentil).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.request_queue_time_ms.avg** <br>(gauge) | Tiempo que la solicitud espera en la cola de solicitudes (promedio).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.request_queue_time_ms.rate** <br>(gauge) | Tiempo que la solicitud espera en la cola de solicitudes (tasa).<br>_Se muestra como milisegundo_ |
| **confluent.kafka.network.request.requests_per_sec.rate** <br>(gauge) | Tasa de solicitud.<br>_Se muestra como solicitud_ |
| **confluent.kafka.network.request.response_queue_time_ms.50percentile** <br>(gauge) | Tiempo que la solicitud espera en la cola de respuesta (percentil 50).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.response_queue_time_ms.75percentile** <br>(gauge) | Tiempo que la solicitud espera en la cola de respuesta (percentil 75).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.response_queue_time_ms.95percentile** <br>(gauge) | Tiempo que la solicitud espera en la cola de respuesta (percentil 95).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.response_queue_time_ms.98percentile** <br>(gauge) | Tiempo que la solicitud espera en la cola de respuesta (percentil 98).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.response_queue_time_ms.999percentile** <br>(gauge) | Tiempo que la solicitud espera en la cola de respuesta (percentil 999).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.response_queue_time_ms.99percentile** <br>(gauge) | Tiempo que la solicitud espera en la cola de respuesta (percentil 99).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.response_queue_time_ms.avg** <br>(gauge) | Tiempo que la solicitud espera en la cola de respuesta (promedio).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.response_queue_time_ms.rate** <br>(gauge) | Tiempo que la solicitud espera en la cola de respuesta (tasa).<br>_Se muestra como milisegundo_ |
| **confluent.kafka.network.request.response_send_time_ms.50percentile** <br>(gauge) | Tiempo de envío de la respuesta (percentil 50).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.response_send_time_ms.75percentile** <br>(gauge) | Tiempo de envío de la respuesta (percentil 75).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.response_send_time_ms.95percentile** <br>(gauge) | Tiempo de envío de la respuesta (percentil 95).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.response_send_time_ms.98percentile** <br>(gauge) | Tiempo de envío de la respuesta (percentil 98).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.response_send_time_ms.999percentile** <br>(gauge) | Tiempo de envío de la respuesta (percentil 999).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.response_send_time_ms.99percentile** <br>(gauge) | Tiempo de envío de la respuesta (percentil 99).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.response_send_time_ms.avg** <br>(gauge) | Tiempo de envío de la respuesta (promedio).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.response_send_time_ms.rate** <br>(gauge) | Tiempo de envío de la respuesta (tasa).<br>_Se muestra como milisegundo_ |
| **confluent.kafka.network.request.total_time_ms.50percentile** <br>(gauge) | Tiempo total en ms para atender la solicitud especificada (percentil 50).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.total_time_ms.75percentile** <br>(gauge) | Tiempo total en ms para atender la solicitud especificada (percentil 75).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.total_time_ms.95percentile** <br>(gauge) | Tiempo total en ms para atender la solicitud especificada (percentil 95).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.total_time_ms.98percentile** <br>(gauge) | Tiempo total en ms para atender la solicitud especificada (percentil 98).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.total_time_ms.999percentile** <br>(gauge) | Tiempo total en ms para atender la solicitud especificada (percentil 999).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.total_time_ms.99percentile** <br>(gauge) | Tiempo total en ms para atender la solicitud especificada (percentil 99).<br>_Se muestra en milisegundos_ |
| **confluent.kafka.network.request.total_time_ms.avg** <br>(gauge) | Tiempo total en ms para atender la solicitud especificada (promedio).<br>_Se muestra como milisegundo_ |
| **confluent.kafka.network.request.total_time_ms.rate** <br>(gauge) | Tiempo total en ms para atender la solicitud especificada (tasa).<br>_Se muestra como milisegundo_ |
| **confluent.kafka.network.request_channel.request_queue_size** <br>(gauge) | Tamaño de la cola de solicitudes. Una cola de solicitudes congestionada no podrá procesar las solicitudes entrantes o salientes|
| **confluent.kafka.network.socket_server.network_processor_avg_idle_percent** <br>(gauge) | Fracción media de tiempo en que los subprocesos del procesador de red están inactivos<br>_Se muestra como fracción_ |
| **confluent.kafka.producer.batch_size_avg** <br>(gauge) | El número medio de bytes enviados por partición por solicitud.<br>_Se muestra como byte_ |
| **confluent.kafka.producer.batch_size_max** <br>(gauge) | El número máximo de bytes enviados por partición por solicitud.<br>_Se muestra como byte_ |
| **confluent.kafka.producer.bufferpool_wait_time_total** <br>(gauge) | El tiempo total que un anexador espera para la asignación de espacio.<br>_Se muestra como nanosegundo_ |
| **confluent.kafka.producer.connection_close_rate** <br>(gauge) | Conexiones cerradas por segundo en el intervalo.<br>_Se muestra como conexión_ |
| **confluent.kafka.producer.connection_count** <br>(gauge) | El número actual de conexiones activas en el productor.<br>_Se muestra como conexión_ |
| **confluent.kafka.producer.connection_creation_rate** <br>(gauge) | Nuevas conexiones establecidas por segundo en el intervado.<br>_Se muestra como conexión_ |
| **confluent.kafka.producer.incoming_byte_rate** <br>(gauge) | El número medio de bytes entrantes recibidos por segundo de todos los servidores.<br>_Se muestra como byte_ |
| **confluent.kafka.producer.io_ratio** <br>(gauge) | La fracción de tiempo que el subproceso productor de E/S pasó haciendo E/S<br>_Se muestra como fracción_ |
| **confluent.kafka.producer.io_time_ns_avg** <br>(gauge) | La duración media de E/S por llamada select en nanosegundos.<br>_Se muestra como nanosegundo_ |
| **confluent.kafka.producer.io_wait_ratio** <br>(gauge) | La fracción de tiempo que el subproceso productor de E/S pasó esperando<br>_Se muestra como fracción_ |
| **confluent.kafka.producer.io_wait_time_ns_avg** <br>(gauge) | La duración media del tiempo que el subproceso de E/S pasó esperando un socket listo para lecturas o escrituras en nanosegundos.<br>_Se muestra como nanosegundo_ |
| **confluent.kafka.producer.network_io_rate** <br>(gauge) | El número de operaciones de red (lecturas o escrituras) en todas las conexiones de productor por segundo<br>_Se muestra como operación_ |
| **confluent.kafka.producer.node.incoming_byte_rate** <br>(gauge) | El número medio de bytes recibidos por segundo del broker.<br>_Se muestra como byte_ |
| **confluent.kafka.producer.node.outgoing_byte_rate** <br>(gauge) | El número medio de bytes enviados por segundo al broker.<br>_Se muestra como byte_ |
| **confluent.kafka.producer.node.request_rate** <br>(gauge) | El número medio de solicitudes enviadas por segundo al broker.<br>_Se muestra como solicitud_ |
| **confluent.kafka.producer.node.request_size_avg** <br>(gauge) | El tamaño medio de todas las solicitudes en el intervalo para un broker.<br>_Se muestra como solicitud_ |
| **confluent.kafka.producer.node.request_size_max** <br>(gauge) | El tamaño máximo de cualquier solicitud enviada en el intervalo para un broker.<br>_Se muestra como solicitud_ |
| **confluent.kafka.producer.node.response_rate** <br>(gauge) | Número medio de respuestas recibidas por segundo del broker.<br>_Se muestra como respuesta_ |
| **confluent.kafka.producer.outgoing_byte_rate** <br>(gauge) | El número de bytes salientes enviados a todos los servidores por segundo<br>_Se muestra como byte_ |
| **confluent.kafka.producer.produce_throttle_time_avg** <br>(gauge) | El tiempo medio en ms que una solicitud fue limitada por un broker<br>_Se muestra como milisegundo_ |
| **confluent.kafka.producer.produce_throttle_time_max** <br>(gauge) | El tiempo máximo en ms que una solicitud fue limitada por un broker<br>_Se muestra como milisegundo_ |
| **confluent.kafka.producer.record_error_rate** <br>(gauge) | Número medio por segundo de envíos de registros que han dado lugar a errores<br>_Se muestra como registro_ |
| **confluent.kafka.producer.record_retry_rate** <br>(gauge) | Número medio por segundo de reintentos de envío de registros<br>_Se muestra como registro_ |
| **confluent.kafka.producer.request_latency_avg** <br>(gauge) | La latencia media de la solicitud del productor en ms<br>_Se muestra como milisegundo_ |
| **confluent.kafka.producer.request_rate** <br>(gauge) | El número de solicitudes enviadas por segundo por un productor<br>_Se muestra como solicitud_ |
| **confluent.kafka.producer.response_rate** <br>(gauge) | El número de respuestas recibidas por segundo por el consumidor<br>_Se muestra como respuesta_ |
| **confluent.kafka.producer.select_rate** <br>(gauge) | Número de veces que la capa de E/S comprueba si hay nuevas E/S que realizar por segundo.|
| **confluent.kafka.producer.topic.byte_rate** <br>(gauge) | El número medio de bytes enviados por segundo para un tema.<br>_Se muestra como byte_ |
| **confluent.kafka.producer.topic.compression_rate** <br>(gauge) | La tasa de compresión media de los lotes de registros de un tema.|
| **confluent.kafka.producer.topic.record_error_rate** <br>(gauge) | Número medio por segundo de envíos de registros que han dado lugar a errores para un tema.<br>_Se muestra como registro_ |
| **confluent.kafka.producer.topic.record_retry_rate** <br>(gauge) | Número medio por segundo de envíos de registros reintentados para un tema.<br>_Se muestra como registro_ |
| **confluent.kafka.producer.topic.record_send_rate** <br>(gauge) | Número medio de registros enviados por segundo para un tema.<br>_Se muestra como registro_ |
| **confluent.kafka.producer.waiting_threads** <br>(gauge) | Número de subprocesos de usuario bloqueados a la espera de memoria intermedia para poner en cola sus registros<br>_Se muestra como subproceso_ |
| **confluent.kafka.rest.jersey.brokers.list.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP brokers list fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.consumer.assign_v2.request_error_rate** <br>(gauge) | Tasa media de solicitudes HTTP v2 consumer assign fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.consumer.assignment_v2.request_error_rate** <br>(gauge) | Tasa media de solicitudes HTTP v2 consumer assignment fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.consumer.commit.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP consumer commit fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.consumer.commit_offsets_v2.request_error_rate** <br>(gauge) | Tasa media de solicitudes HTTP v2 consumer commit offsets fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.consumer.committed_offsets_v2.request_error_rate** <br>(gauge) | Tasa media de solicitudes HTTP v2 consumer committed offsets fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.consumer.create.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP consumer create fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.consumer.create_v2.request_error_rate** <br>(gauge) | Tasa media de solicitudes HTTP v2 consumer create fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.consumer.delete.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP consumer delete fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.consumer.delete_v2.request_error_rate** <br>(gauge) | Tasa media de solicitudes HTTP v2 consumer delete fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.consumer.records.read_avro_v2.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP v2 consumer records read avro fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.consumer.records.read_binary_v2.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP v2 consumer records read binary fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.consumer.records.read_json_v2.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP v2 consumer records read json fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.consumer.records.read_jsonschema_v2.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP consumer topic read json fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.consumer.records.read_protobuf_v2.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP consumer topic read json fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.consumer.seek_to_beginning_v2.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP v2 consumer seek to beginning fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.consumer.seek_to_end_v2.request_error_rate** <br>(gauge) | Tasa media de solicitudes HTTP v2 consumer seek to end fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.consumer.seek_to_offset_v2.request_error_rate** <br>(gauge) | Tasa media de solicitudes HTTP v2 consumer seek to offset fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.consumer.subscribe_v2.request_error_rate** <br>(gauge) | Tasa media de solicitudes HTTP v2 consumer subscribe fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.consumer.subscription_v2.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP v2 consumer subscription fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.consumer.topic.read_avro.request_error_rate** <br>(gauge) | Tasa media de solicitudes HTTP consumer topic read avro fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.consumer.topic.read_binary.request_error_rate** <br>(gauge) | Tasa media de solicitudes HTTP consumer topic read binary fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.consumer.topic.read_json.request_error_rate** <br>(gauge) | Tasa media de solicitudes HTTP consumer topic read binary fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.consumer.unsubscribe_v2.request_error_rate** <br>(gauge) | Tasa media de solicitudes HTTP v2 consumer unsubscribe fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.partition.consume_avro.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP partition consume avro fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.partition.consume_binary.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP partition consume binary fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.partition.consume_json.request_error_rate** <br>(gauge) | Tasa media de solicitudes HTTP partition consume json fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.partition.get.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP partition get fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.partition.get_v2.request_error_rate** <br>(gauge) | Tasa media de solicitudes HTTP v2 partition get fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.partition.produce_avro.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP partition produce avro fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.partition.produce_avro_v2.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP v2 partition produce avro fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.partition.produce_binary.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP partition produce binary fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.partition.produce_binary_v2.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP v2 produce binary fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.partition.produce_json.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP partition produce json fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.partition.produce_json_v2.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP v2 partition produce json fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.partition.produce_jsonschema_v2.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP v2 partition produce json fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.partition.produce_protobuf_v2.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP v2 partition produce json fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.partitions.list.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP partitions list fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.partitions.list_v2.request_error_rate** <br>(gauge) | Tasa media de solicitudes HTTP v2 partitions list fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.root.get.request_error_rate** <br>(gauge) | Tasa media de solicitudes HTTP root get fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.root.get_v2.request_error_rate** <br>(gauge) | Tasa media de solicitudes HTTP root get fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.root.post.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP root post fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.root.post_v2.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP root post fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.topic.get.request_error_rate** <br>(gauge) | Tasa media de solicitudes HTTP topic get fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.topic.get_v2.request_error_rate** <br>(gauge) | Tasa media de solicitudes HTTP topic get fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.topic.produce_avro.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP topic produce avro fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.topic.produce_binary.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP topic produce binary fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.topic.produce_json.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP topic produce json fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.topics.list.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP topics list fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jersey.topics.list_v2.request_error_rate** <br>(gauge) | La tasa media de solicitudes HTTP topics list fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.rest.jetty.connections_active** <br>(gauge) | Número total de conexiones TCP activas (REST).<br>_Se muestra como conexión_ |
| **confluent.kafka.rest.jetty.connections_closed_rate** <br>(gauge) | La tasa media por segundo de conexiones TCP cerradas (REST).<br>_Se muestra como conexión_ |
| **confluent.kafka.rest.jetty.connections_opened_rate** <br>(gauge) | La tasa media por segundo de conexiones TCP abiertas (REST).<br>_Se muestra como conexión_ |
| **confluent.kafka.schema.registry.avro_schemas_created** <br>(gauge) | esquemas avro creados|
| **confluent.kafka.schema.registry.avro_schemas_deleted** <br>(gauge) | esquemas avro eliminados|
| **confluent.kafka.schema.registry.jersey.brokers.list.request_error_rate** <br>(gauge) | La tasa media de operaciones brokers list fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.brokers.list_v2.request_error_rate** <br>(gauge) | La tasa media de operaciones brokers list fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.consumer.assign_v2.request_error_rate** <br>(gauge) | La tasa media de operaciones v2 consumer assign fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.consumer.assignment_v2.request_error_rate** <br>(gauge) | La tasa media de operaciones v2 consumer assignment fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.consumer.commit.request_error_rate** <br>(gauge) | Tasa media de operaciones consumer commit fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.consumer.commit_offsets_v2.request_error_rate** <br>(gauge) | Tasa media de operaciones v2 consumer commit offsets fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.consumer.committed_offsets_v2.request_error_rate** <br>(gauge) | Tasa media de operaciones v2 consumer committed offsets fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.consumer.create.request_error_rate** <br>(gauge) | La tasa media de operaciones consumer create fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.consumer.create_v2.request_error_rate** <br>(gauge) | Tasa media de operaciones v2 consumer create fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.consumer.delete.request_error_rate** <br>(gauge) | Tasa media de operaciones consumer delete fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.consumer.delete_v2.request_error_rate** <br>(gauge) | Tasa media de operaciones v2 consumer delete fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.consumer.records.read_avro_v2.request_error_rate** <br>(gauge) | Tasa media de operaciones v2 consumer records read avro fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.consumer.records.read_binary_v2.request_error_rate** <br>(gauge) | Tasa media de operaciones v2 consumer records read binary fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.consumer.records.read_json_v2.request_error_rate** <br>(gauge) | Tasa media de operaciones v2 consumer records read json fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.consumer.seek_to_beginning_v2.request_error_rate** <br>(gauge) | Tasa media de operaciones v2 consumer seek to beginning fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.consumer.seek_to_end_v2.request_error_rate** <br>(gauge) | Tasa media de operaciones v2 consumer seek to end fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.consumer.seek_to_offset_v2.request_error_rate** <br>(gauge) | Tasa media de operaciones v2 consumer seek to offset fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.consumer.subscribe_v2.request_error_rate** <br>(gauge) | Tasa media de operaciones v2 consumer subscribe fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.consumer.subscription_v2.request_error_rate** <br>(gauge) | Tasa media de operaciones v2 consumer subscription fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.consumer.topic.read_avro.request_error_rate** <br>(gauge) | Tasa media de operaciones consumer topic read avro fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.consumer.topic.read_binary.request_error_rate** <br>(gauge) | Tasa media de operaciones consumer topic read binary fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.consumer.topic.read_json.request_error_rate** <br>(gauge) | Tasa media de operaciones consumer topic read json fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.consumer.unsubscribe_v2.request_error_rate** <br>(gauge) | Tasa media de operaciones v2 consumer unsubscribe fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.partition.consume_avro.request_error_rate** <br>(gauge) | Tasa media de operaciones partition consume avro fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.partition.consume_binary.request_error_rate** <br>(gauge) | Tasa media de operaciones partition consume binary fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.partition.consume_json.request_error_rate** <br>(gauge) | Tasa media de operaciones partition consume json fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.partition.get.request_error_rate** <br>(gauge) | Tasa media de operaciones partition get fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.partition.get_v2.request_error_rate** <br>(gauge) | Tasa media de operaciones v2 partition get fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.partition.produce_avro.request_error_rate** <br>(gauge) | Tasa media de operaciones partition produce avro fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.partition.produce_avro_v2.request_error_rate** <br>(gauge) | Tasa media de operaciones v2 partition produce avro fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.partition.produce_binary.request_error_rate** <br>(gauge) | La tasa media de operaciones partition produce binary fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.partition.produce_binary_v2.request_error_rate** <br>(gauge) | La tasa media de operaciones v2 partition produce binary fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.partition.produce_json.request_error_rate** <br>(gauge) | Tasa media de operaciones partition produce json fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.partition.produce_json_v2.request_error_rate** <br>(gauge) | Tasa media de operaciones v2 partition produce json fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.partitions.list.request_error_rate** <br>(gauge) | La tasa media de operaciones partitions list fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.partitions.list_v2.request_error_rate** <br>(gauge) | La tasa media de operaciones v2 partitions list fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.request_error_rate** <br>(gauge) | La tasa media de operaciones fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.root.get.request_error_rate** <br>(gauge) | Tasa media de operaciones root get fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.root.post.request_error_rate** <br>(gauge) | Tasa media de operaciones root post fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.topic.get.request_error_rate** <br>(gauge) | Tasa media de operaciones topic get fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.topic.produce_avro.request_error_rate** <br>(gauge) | La tasa media de operaciones topic produce avro fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.topic.produce_binary.request_error_rate** <br>(gauge) | Tasa media de operaciones topic produce binary fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.topic.produce_json.request_error_rate** <br>(gauge) | Tasa media de operaciones topic produce json fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jersey.topics.list.request_error_rate** <br>(gauge) | La tasa media de operaciones topics list fallidas<br>_Se muestra como solicitud_ |
| **confluent.kafka.schema.registry.jetty.connections_active** <br>(gauge) | Número total de conexiones TCP activas (registro de esquemas).<br>_Se muestra como conexión_ |
| **confluent.kafka.schema.registry.jetty.connections_closed_rate** <br>(gauge) | Tasa media por segundo de conexiones TCP cerradas (registro de esquema).<br>_Se muestra como conexión_ |
| **confluent.kafka.schema.registry.jetty.connections_opened_rate** <br>(gauge) | La tasa media por segundo de conexiones TCP abiertas (registro de esquema).<br>_Se muestra como conexión_ |
| **confluent.kafka.schema.registry.json_schemas_created** <br>(gauge) | esquemas json creados|
| **confluent.kafka.schema.registry.json_schemas_deleted** <br>(gauge) | esquemas json eliminados|
| **confluent.kafka.schema.registry.master_slave_role.master_slave_role** <br>(gauge) | El rol actual de esta instancia del Registro de esquemas. Un valor de 1 indica que esta instancia es la principal, 0 indica que es secundaria.|
| **confluent.kafka.schema.registry.protobuf_schemas_created** <br>(gauge) | esquemas protobuf avro|
| **confluent.kafka.schema.registry.protobuf_schemas_deleted** <br>(gauge) | esquemas protobuf eliminados|
| **confluent.kafka.schema.registry.registered_count** <br>(gauge) | esquemas registrados|
| **confluent.kafka.server.broker_topic_metrics.bytes_in_per_sec** <br>(gauge) | Total de bytes ingresados por tema<br>_Se muestra como byte_ |
| **confluent.kafka.server.broker_topic_metrics.bytes_out_per_sec** <br>(gauge) | Total de bytes emitidos por tema<br>_Se muestra como byte_ |
| **confluent.kafka.server.broker_topic_metrics.fetch_message_conversions_per_sec** <br>(gauge) | Total de mensajes convertidos en producción por tema<br>_Se muestra como mensaje_ |
| **confluent.kafka.server.broker_topic_metrics.messages_in_per_sec** <br>(gauge) | Total de mensajes ingresados por tema<br>_Se muestra como mensaje_ |
| **confluent.kafka.server.broker_topic_metrics.messages_out_per_sec** <br>(gauge) | Total de mensajes emitidos por tema<br>_Se muestra como mensaje_ |
| **confluent.kafka.server.broker_topic_metrics.produce_message_conversions_per_sec** <br>(gauge) | Total de mensajes convertidos en producción por tema<br>_Se muestra como mensaje_ |
| **confluent.kafka.server.delayed_operation_purgatory.purgatory_size** <br>(gauge) | Número de solicitudes en espera en el purgatorio de fetch. Es alto si los consumidores utilizan un valor grande para fetch.wait.max.ms.<br>_Se muestra como solicitud_ |
| **confluent.kafka.server.fetcher_lag.consumer_lag** <br>(gauge) | Retraso en el número de mensajes por réplica del seguidor. Esto es útil para saber si la réplica es lenta o ha dejado de replicar desde el líder.<br>_Se muestra como mensaje_ |
| **confluent.kafka.server.produce.delay_queue_size** <br>(gauge) | Número de clientes productores que están siendo limitados actualmente. El valor puede ser cualquier número mayor o igual a 0.|
| **confluent.kafka.server.replica_fetcher_manager.max_lag** <br>(gauge) | Máximo retraso en los mensajes entre las réplicas del seguidor y del líder. Esto se controla mediante la configuración de `replica.lag.max.messages`.<br>_Se muestra como mensaje_ |
| **confluent.kafka.server.replica_manager.isr_expands_per_sec.rate** <br>(gauge) | Velocidad a la que se expande el conjunto de réplicas sincronizadas (ISR).<br>_Se muestra como unidad_ |
| **confluent.kafka.server.replica_manager.isr_shrinks_per_sec.rate** <br>(gauge) | Velocidad a la que se reduce el conjunto de réplicas sincronizadas (ISR).<br>_Se muestra como unidad_ |
| **confluent.kafka.server.replica_manager.leader_count** <br>(gauge) | Número de líderes en este broker. Esto debería ser mayoritariamente uniforme en todos los brokers. Si no es así, establece auto.leader.rebalance.enable a true en todos los brokers del clúster.|
| **confluent.kafka.server.replica_manager.partition_count** <br>(gauge) | Número de particiones en este broker. Esto debería ser mayoritariamente uniforme en todos los brokers.|
| **confluent.kafka.server.replica_manager.under_min_isr_partition_count** <br>(gauge) | Número de particiones cuyo recuento de réplicas sincronizadas es menor que minIsr.|
| **confluent.kafka.server.replica_manager.under_replicated_partitions** <br>(gauge) | Número de particiones poco replicadas (ISR \< todas las réplicas).|
| **confluent.kafka.server.request_handler_pool.avg_idle_percent** <br>(gauge) | Fracción media de tiempo en que los subprocesos del gestor de solicitudes están inactivos. Los valores están entre 0 (todos los recursos están utilizados) y 1 (todos los recursos están disponibles)<br>_Se muestra como fracción_ |
| **confluent.kafka.server.request_handler_pool.avg_idle_percent.rate** <br>(gauge) | Número de nanosegundos en los que los subprocesos del gestor de solicitudes estuvieron inactivos durante el último segundo. Los valores están entre 0 (se utilizan todos los recursos) y 10^9 (todos los recursos están disponibles)<br>_Se muestra como fracción_ |
| **confluent.kafka.server.session.zoo_keeper_auth_failures_per_sec.rate** <br>(gauge) | El intento de conexión al conjunto ha fallado porque el cliente no ha proporcionado las credenciales correctas.|
| **confluent.kafka.server.session.zoo_keeper_disconnects_per_sec.rate** <br>(gauge) | El cliente de ZooKeeper está actualmente desconectado del conjunto. El cliente perdió su conexión anterior a un servidor y actualmente está tratando de volver a conectarse. La sesión no está necesariamente caducada.<br>_Se muestra como unidad_ |
| **confluent.kafka.server.session.zoo_keeper_expires_per_sec.rate** <br>(gauge) | La sesión de ZooKeeper ha expirado. Cuando una sesión expira, podemos tener cambios de líder e incluso un nuevo controlador.<br>_Se muestra como unidad_ |
| **confluent.kafka.server.session.zoo_keeper_read_only_connects_per_sec.rate** <br>(gauge) | El servidor al que está conectado el cliente se encuentra actualmente en LOOKING, lo que significa que no está ni FOLLOWING ni LEADING.<br>_Se muestra como unidad_ |
| **confluent.kafka.server.session.zoo_keeper_request_latency_ms** <br>(gauge) | Latencia de la solicitud del cliente<br>_Se muestra como unidad_ |
| **confluent.kafka.server.session.zoo_keeper_sasl_authentications_per_sec.rate** <br>(gauge) | El cliente se ha autentificado correctamente.<br>_Se muestra como unidad_ |
| **confluent.kafka.server.session.zoo_keeper_sync_connects_per_sec.rate** <br>(gauge) | El cliente de ZooKeeper está conectado al conjunto y listo para ejecutar operaciones.<br>_Se muestra como unidad_ |
| **confluent.kafka.server.topic.bytes_in_per_sec.rate** <br>(gauge) | Tasa agregada de bytes entrantes.<br>_Se muestra como byte_ |
| **confluent.kafka.server.topic.bytes_out_per_sec.rate** <br>(gauge) | Tasa agregada de bytes salientes.<br>_Se muestra como byte_ |
| **confluent.kafka.server.topic.bytes_rejected_per_sec.rate** <br>(gauge) | Tasa agregada de bytes rechazados.<br>_Se muestra como byte_ |
| **confluent.kafka.server.topic.failed_fetch_requests_per_sec.rate** <br>(gauge) | Tasa de solicitudes de búsqueda para las solicitudes que fallaron.<br>_Se muestra como solicitud_ |
| **confluent.kafka.server.topic.failed_produce_requests_per_sec.rate** <br>(gauge) | Tasa de producción de solicitudes para las solicitudes que fallaron.<br>_Se muestra como solicitud_ |
| **confluent.kafka.server.topic.messages_in_per_sec.rate** <br>(gauge) | Tasa agregada de mensajes entrantes.<br>_Se muestra como mensaje_ |
| **confluent.kafka.server.topic.total_fetch_requests_per_sec.rate** <br>(gauge) | Tasa de solicitudes de búsqueda.<br>_Se muestra como solicitud_ |
| **confluent.kafka.server.topic.total_produce_requests_per_sec.rate** <br>(gauge) | Tasa de producción de solicitudes.<br>_Se muestra como solicitud_ |
| **confluent.kafka.streams.processor_node.forward_rate** <br>(gauge) | La tasa media de registros que se reenvían de forma descendente, solo desde nodos fuente, por segundo. Esta métrica se puede utilizar para comprender la rapidez con la que la biblioteca está consumiendo de temas fuente.<br>_Se muestra como registro_ |
| **confluent.kafka.streams.processor_node.forward_total** <br>(gauge) | El número total de registros que se reenvían en sentido descendente, solo desde los nodos fuente.<br>_Se muestra como registro_ |
| **confluent.kafka.streams.processor_node.process_latency_avg** <br>(gauge) | El tiempo medio de ejecución en ns, para la operación respectiva.<br>_Se muestra como nanosegundo_ |
| **confluent.kafka.streams.processor_node.process_rate** <br>(gauge) | El número medio de operaciones respectivas por segundo.<br>_Se muestra como operación_ |
| **confluent.kafka.streams.processor_node.process_total** <br>(gauge) | El número total de operaciones respectivas.<br>_Se muestra como operación_ |
| **confluent.kafka.streams.processor_node.suppression_emit_rate** <br>(gauge) | La tasa a la que los registros se han emitido en sentido descendente de los nodos de operación de supresión. Compárese con la métrica process-rate para determinar cuántas actualizaciones se están suprimiendo.<br>_Se muestra como registro_ |
| **confluent.kafka.streams.processor_node.suppression_emit_total** <br>(gauge) | El número total de registros que se han emitido en sentido descendente de los nodos de operación de supresión. Compárese con la métrica process-total para determinar cuántas actualizaciones se están suprimiendo.<br>_Se muestra como registro_ |
| **confluent.kafka.streams.stream.commit_latency_avg** <br>(gauge) | El valor medio de commit-latency.<br>_Se muestra como nanosegundo_ |
| **confluent.kafka.streams.stream.commit_latency_max** <br>(gauge) | El valor máximo de commit-latency.<br>_Se muestra como nanosegundo_ |
| **confluent.kafka.streams.stream.commit_rate** <br>(gauge) | El número medio por segundo de llamadas de confirmación<br>_Se muestra como confirmación_ |
| **confluent.kafka.streams.stream.commit_total** <br>(gauge) | El número total de llamadas de confirmación<br>_Se muestra como confirmación_ |
| **confluent.kafka.streams.stream.poll_latency_avg** <br>(gauge) | El valor medio de poll-latency.<br>_Se muestra como nanosegundo_ |
| **confluent.kafka.streams.stream.poll_latency_max** <br>(gauge) | El valor máximo de poll-latency.<br>_Se muestra como nanosegundo_ |
| **confluent.kafka.streams.stream.poll_rate** <br>(gauge) | El número medio por segundo de llamadas de sondeo<br>_Se muestra como unidad_ |
| **confluent.kafka.streams.stream.poll_total** <br>(gauge) | El número total de llamadas de sondeo<br>_Se muestra como unidad_ |
| **confluent.kafka.streams.stream.process_latency_avg** <br>(gauge) | El valor medio de process-latency.<br>_Se muestra como nanosegundo_ |
| **confluent.kafka.streams.stream.process_latency_max** <br>(gauge) | El valor máximo de process-latency.<br>_Se muestra como nanosegundo_ |
| **confluent.kafka.streams.stream.process_rate** <br>(gauge) | El número medio por segundo de llamadas a procesos<br>_Se muestra como unidad_ |
| **confluent.kafka.streams.stream.process_total** <br>(gauge) | El número total de llamadas a procesos<br>_Se muestra como unidad_ |
| **confluent.kafka.streams.stream.punctuate_latency_avg** <br>(gauge) | El valor medio de punctuate-latency.<br>_Se muestra como nanosegundo_ |
| **confluent.kafka.streams.stream.punctuate_latency_max** <br>(gauge) | El valor máximo de punctuate-latency.<br>_Se muestra como nanosegundo_ |
| **confluent.kafka.streams.stream.punctuate_rate** <br>(gauge) | El número medio por segundo de llamadas de puntuación<br>_Se muestra como unidad_ |
| **confluent.kafka.streams.stream.punctuate_total** <br>(gauge) | El número total de llamadas de puntuación<br>_Se muestra como unidad_ |
| **confluent.kafka.streams.stream.skipped_records_rate** <br>(gauge) | El número medio por segundo de registros omitidos<br>_Se muestra como registro_ |
| **confluent.kafka.streams.stream.skipped_records_total** <br>(gauge) | El número total de registros omitidos<br>_Se muestra como registro_ |
| **confluent.kafka.streams.stream.task_closed_rate** <br>(gauge) | El número medio por segundo de tareas cerradas<br>_Se muestra como tarea_ |
| **confluent.kafka.streams.stream.task_closed_total** <br>(gauge) | El número total de tareas cerradas<br>_Se muestra como tarea_ |
| **confluent.kafka.streams.stream.task_created_rate** <br>(gauge) | El número medio por segundo de tareas recién creadas<br>_Se muestra como tarea_ |
| **confluent.kafka.streams.stream.task_created_total** <br>(gauge) | El número total de tareas de nueva creación<br>_Se muestra como tarea_ |
| **confluent.kafka.streams.task.commit_latency_avg** <br>(gauge) | El valor medio de commit-latency de la tarea.<br>_Se muestra como nanosegundo_ |
| **confluent.kafka.streams.task.commit_rate** <br>(gauge) | El número medio por segundo de llamadas de confirmación en todas las tareas<br>_Se muestra como unidad_ |
| **confluent.kafka.streams.task.record_lateness_avg** <br>(gauge) | El valor medio de record-lateness.<br>_Se muestra como milisegundo_ |
| **confluent.ksql.consumer_metrics.consumer_messages_per_sec** <br>(gauge) | consumer_messages_per_sec|
| **confluent.ksql.consumer_metrics.consumer_total_bytes** <br>(gauge) | consumer_total_bytes|
| **confluent.ksql.consumer_metrics.consumer_total_messages** <br>(gauge) | consumer_total_messages|
| **confluent.ksql.ksql_rocksdb_aggregates.block_cache_pinned_usage_max** <br>(gauge) | block_cache_pinned_usage_max<br>_Se muestra como byte_ |
| **confluent.ksql.ksql_rocksdb_aggregates.block_cache_pinned_usage_total** <br>(gauge) | block_cache_pinned_usage_total<br>_Se muestra como byte_ |
| **confluent.ksql.ksql_rocksdb_aggregates.block_cache_usage_max** <br>(gauge) | uso de la caché de bloques<br>_Se muestra como byte_ |
| **confluent.ksql.ksql_rocksdb_aggregates.block_cache_usage_total** <br>(gauge) | block_cache_usage_total<br>_Se muestra como byte_ |
| **confluent.ksql.ksql_rocksdb_aggregates.compaction_pending_total** <br>(gauge) | compaction_pending_total|
| **confluent.ksql.ksql_rocksdb_aggregates.cur_size_active_mem_table_total** <br>(gauge) | cur_size_active_mem_table_total<br>_Se muestra como byte_ |
| **confluent.ksql.ksql_rocksdb_aggregates.cur_size_all_mem_tables_total** <br>(gauge) | tamaño de todas las tablas mem<br>_Se muestra como byte_ |
| **confluent.ksql.ksql_rocksdb_aggregates.estimate_num_keys_total** <br>(gauge) | estimate_num_keys_total|
| **confluent.ksql.ksql_rocksdb_aggregates.estimate_pending_compaction_bytes_total** <br>(gauge) | estimate_pending_compaction_bytes_total|
| **confluent.ksql.ksql_rocksdb_aggregates.estimate_table_readers_mem_total** <br>(gauge) | estimate_table_readers_mem_total<br>_Se muestra como byte_ |
| **confluent.ksql.ksql_rocksdb_aggregates.live_sst_files_size_total** <br>(gauge) | live_sst_files_size_total<br>_Se muestra como byte_ |
| **confluent.ksql.ksql_rocksdb_aggregates.mem_table_flush_pending_total** <br>(gauge) | mem_table_flush_pending_total<br>_Se muestra como byte_ |
| **confluent.ksql.ksql_rocksdb_aggregates.num_deletes_active_mem_table_total** <br>(gauge) | num_deletes_active_mem_table_total|
| **confluent.ksql.ksql_rocksdb_aggregates.num_deletes_imm_mem_tables_total** <br>(gauge) | eliminar todas las tablas mem|
| **confluent.ksql.ksql_rocksdb_aggregates.num_entries_active_mem_table_total** <br>(gauge) | entradas de todas las tablas mem|
| **confluent.ksql.ksql_rocksdb_aggregates.num_entries_imm_mem_tables_total** <br>(gauge) | num_entries_imm_mem_tables_total<br>_Se muestra como byte_ |
| **confluent.ksql.ksql_rocksdb_aggregates.num_immutable_mem_table_total** <br>(gauge) | total inmutable de la tabla mem|
| **confluent.ksql.ksql_rocksdb_aggregates.num_running_compactions_total** <br>(gauge) | num_running_compactions|
| **confluent.ksql.ksql_rocksdb_aggregates.num_running_flushes_total** <br>(gauge) | descargas totales en ejecución|
| **confluent.ksql.ksql_rocksdb_aggregates.total_sst_files_size_total** <br>(gauge) | total_sst_files_size_total<br>_Se muestra como byte_ |
| **confluent.ksql.producer_metrics.messages_per_sec** <br>(gauge) | messages_per_sec|
| **confluent.ksql.producer_metrics.total_messages** <br>(gauge) | total de mensajes|
| **confluent.ksql.pull_query_metrics.pull_query_requests_error_rate** <br>(gauge) | pull_query_requests_error_rate|
| **confluent.ksql.pull_query_metrics.pull_query_requests_error_total** <br>(gauge) | pull_query_requests_error_total|
| **confluent.ksql.pull_query_metrics.pull_query_requests_latency_distribution_50** <br>(gauge) | pull_query_requests_latency_distribution_50|
| **confluent.ksql.pull_query_metrics.pull_query_requests_latency_distribution_75** <br>(gauge) | pull_query_requests_latency_distribution_75|
| **confluent.ksql.pull_query_metrics.pull_query_requests_latency_distribution_90** <br>(gauge) | pull_query_requests_latency_distribution_90|
| **confluent.ksql.pull_query_metrics.pull_query_requests_latency_distribution_99** <br>(gauge) | pull_query_requests_latency_distribution_99|
| **confluent.ksql.pull_query_metrics.pull_query_requests_latency_latency_avg** <br>(gauge) | pull_query_requests_latency_latency_avg|
| **confluent.ksql.pull_query_metrics.pull_query_requests_latency_latency_max** <br>(gauge) | pull_query_requests_latency_latency_max|
| **confluent.ksql.pull_query_metrics.pull_query_requests_latency_latency_min** <br>(gauge) | pull_query_requests_latency_latency_min|
| **confluent.ksql.pull_query_metrics.pull_query_requests_local** <br>(gauge) | pull_query_requests_local|
| **confluent.ksql.pull_query_metrics.pull_query_requests_local_rate** <br>(gauge) | pull_query_requests_local_rate|
| **confluent.ksql.pull_query_metrics.pull_query_requests_rate** <br>(gauge) | pull_query_requests_rate|
| **confluent.ksql.pull_query_metrics.pull_query_requests_remote** <br>(gauge) | pull_query_requests_remote|
| **confluent.ksql.pull_query_metrics.pull_query_requests_remote_rate** <br>(gauge) | pull_query_requests_remote_rate|
| **confluent.ksql.pull_query_metrics.pull_query_requests_total** <br>(gauge) | pull_query_requests_total|
| **confluent.ksql.query_stats.bytes_consumed_total** <br>(gauge) | Número de bytes consumidos en todas las consultas.<br>_Se muestra como byte_ |
| **confluent.ksql.query_stats.created_queries** <br>(gauge) | CREATED_queries<br>_Se muestra como mensaje_ |
| **confluent.ksql.query_stats.error_queries** <br>(gauge) | <br>_Se muestra como mensaje_ |
| **confluent.ksql.query_stats.error_rate** <br>(gauge) | Número de mensajes que se han consumido, pero no se han procesado en todas las consultas.<br>_Se muestra como mensaje_ |
| **confluent.ksql.query_stats.messages_consumed_avg** <br>(gauge) | Número medio de mensajes consumidos por una consulta por segundo.<br>_Se muestra como mensaje_ |
| **confluent.ksql.query_stats.messages_consumed_max** <br>(gauge) | Número de mensajes consumidos por segundo para la consulta con más mensajes consumidos por segundo.<br>_Se muestra como mensaje_ |
| **confluent.ksql.query_stats.messages_consumed_min** <br>(gauge) | Número de mensajes consumidos por segundo para la consulta con el menor número de mensajes consumidos por segundo.<br>_Se muestra como mensaje_ |
| **confluent.ksql.query_stats.messages_consumed_per_sec** <br>(gauge) | Número de mensajes consumidos por segundo en todas las consultas.<br>_Se muestra como mensaje_ |
| **confluent.ksql.query_stats.messages_consumed_total** <br>(gauge) | Número de mensajes consumidos en todas las consultas.<br>_Se muestra como mensaje_ |
| **confluent.ksql.query_stats.messages_produced_per_sec** <br>(gauge) | Número de mensajes producidos por segundo en todas las consultas.<br>_Se muestra como mensaje_ |
| **confluent.ksql.query_stats.not_running_queries** <br>(gauge) | NOT_RUNNING_queries<br>_Se muestra como mensaje_ |
| **confluent.ksql.query_stats.num_active_queries** <br>(gauge) | Número de consultas que están procesando activamente mensajes.<br>_Se muestra como mensaje_ |
| **confluent.ksql.query_stats.num_idle_queries** <br>(gauge) | Número de consultas sin mensajes disponibles para procesar.<br>_Se muestra como mensaje_ |
| **confluent.ksql.query_stats.num_persistent_queries** <br>(gauge) | Número de consultas persistentes que se están ejecutando actualmente.<br>_Se muestra como consulta_ |
| **confluent.ksql.query_stats.pending_shutdown_queries** <br>(gauge) | PENDING_SHUTDOWN_queries<br>_Se muestra como mensaje_ |
| **confluent.ksql.query_stats.rebalancing_queries** <br>(gauge) | REBALANCING_queries<br>_Se muestra como mensaje_ |
| **confluent.ksql.query_stats.running_queries** <br>(gauge) | RUNNING_queries<br>_Se muestra como mensaje_ |
| **confluent.replicator.task.topic_partition_latency** <br>(gauge) | El tiempo medio entre la producción de mensajes al clúster fuente y la producción de mensajes al clúster de destino.|
| **confluent.replicator.task.topic_partition_message_lag** <br>(gauge) | El número de mensajes que se produjeron al clúster de origen, pero que aún no han llegado al clúster de destino.<br>_Se muestra como mensaje_ |
| **confluent.replicator.task.topic_partition_throughput** <br>(gauge) | Número de mensajes replicados por segundo desde el clúster fuente al clúster de destino.<br>_Se muestra como mensaje_ |

### Eventos

El check de Confluent Platform no incluye eventos.

### Checks de servicio

**confluent.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse y recopilar métricas de la instancia del componente Confluent Platform monitorizado, `WARNING` si no se recopilan métricas y `OK` en caso contrario.

_Estados: ok, critical, warning_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).