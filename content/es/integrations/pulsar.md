---
app_id: pulsar
categories:
- recopilación de logs
- colas de mensajes
custom_kind: integración
description: Monitoriza tus clústeres Pulsar.
integration_version: 3.2.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: Pulsar
---
## Información general

Este check monitoriza [Pulsar](https://pulsar.apache.org) a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Pulsar está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `pulsar.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de Pulsar. Consulta el [ejemplo pulsar.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/pulsar/datadog_checks/pulsar/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent] (https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `pulsar` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **pulsar.active_connections** <br>(gauge) | Número de conexiones activas.<br>_Se muestra como conexión_ |
| **pulsar.authentication_failures_count.count** <br>(count) | Número de operaciones de autenticación fallidas.|
| **pulsar.authentication_success_count.count** <br>(count) | Número de operaciones de autenticación realizadas con éxito.|
| **pulsar.bookie_DELETED_LEDGER_COUNT.count** <br>(count) | Número total de ledgers eliminados desde que fue iniciado el bookie.|
| **pulsar.bookie_READ_BYTES.count** <br>(count) | Número total de bytes leídos del bookie.<br>_Se muestra como bytes_ |
| **pulsar.bookie_SERVER_STATUS** <br>(gauge) | Estado del servidor del bookie server. 1: el bookie se ejecuta en modo de escritura.0: el bookie se ejecuta en modo de solo lectura.|
| **pulsar.bookie_WRITE_BYTES.count** <br>(count) | Número total de bytes escritos en el bookie.<br>_Se muestra como bytes_ |
| **pulsar.bookie_entries_count** <br>(gauge) | Número total de entradas almacenadas en el bookie.|
| **pulsar.bookie_flush** <br>(gauge) | Latencia de descarga de la tabla de la memoria del bookie.|
| **pulsar.bookie_journal_JOURNAL_CB_QUEUE_SIZE** <br>(gauge) | Número total de devoluciones de llamada pendientes en la cola de devoluciones de llamada.|
| **pulsar.bookie_journal_JOURNAL_FORCE_WRITE_QUEUE_SIZE** <br>(gauge) | Número total de solicitudes de escritura forzada (fsync) pendientes en la cola de escritura forzada.<br>_Se muestra como solicitud_ |
| **pulsar.bookie_journal_JOURNAL_QUEUE_SIZE** <br>(gauge) | Número total de solicitudes pendientes en la cola de registros.<br>_Se muestra como solicitud_ |
| **pulsar.bookie_journal_JOURNAL_SYNC_count.count** <br>(count) | Número total de operaciones fsync de diario que se producen en el bookie. La etiqueta de éxito se utiliza para distinguir éxitos y fracasos.|
| **pulsar.bookie_ledger_writable_dirs** <br>(gauge) | Número de directorios con permisos de escritura en el bookie.|
| **pulsar.bookie_ledgers_count** <br>(gauge) | Número total de ledgers almacenados en el bookie.|
| **pulsar.bookie_read_cache_size** <br>(gauge) | Tamaño de la caché de lectura del bookie (en bytes).<br>_Se muestra como bytes_ |
| **pulsar.bookie_throttled_write_requests.count** <br>(count) | Número de solicitudes de escritura que se deben limitar.<br>_Se muestra como solicitud_ |
| **pulsar.bookie_write_cache_size** <br>(gauge) | Tamaño de la caché de escritura del bookie (en bytes).<br>_Se muestra como bytes_ |
| **pulsar.bookkeeper_server_ADD_ENTRY_count.count** <br>(count) | Número total de solicitudes ADD_ENTRY recibidas en el bookie. La etiqueta de éxito se utiliza para distinguir éxitos y fracasos.<br>_Se muestra como solicitud_. |
| **pulsar.bookkeeper_server_BOOKIE_QUARANTINE_count.count** <br>(count) | Número de clientes de bookie que deben colocarse en cuarentena.|
| **pulsar.bookkeeper_server_READ_ENTRY_count.count** <br>(count) | Número total de solicitudes READ_ENTRY recibidas en el bookie. La etiqueta de éxito se utiliza para distinguir éxitos y fracasos.<br>_Se muestra como solicitud_ |
| **pulsar.brk_ml_cursor_nonContiguousDeletedMessagesRange** <br>(gauge) | Número de rangos de mensajes no contiguos eliminados.|
| **pulsar.brk_ml_cursor_persistLedgerErrors** <br>(gauge) | Número de errores de ledger ocurridos cuando los estados de reconocimiento no logran ser persistentes en el ledger.<br>_Se muestra como error_ |
| **pulsar.brk_ml_cursor_persistLedgerSucceed** <br>(gauge) | Número de estados de reconocimiento persistentes en un ledger.|
| **pulsar.brk_ml_cursor_persistZookeeperErrors** <br>(gauge) | Número de errores del ledger cuando los estados de reconocimiento no logran ser persistentes en ZooKeeper.<br>_Se muestra como error_ |
| **pulsar.brk_ml_cursor_persistZookeeperSucceed** <br>(gauge) | Número de estados de reconocimiento persistentes en ZooKeeper.|
| **pulsar.brk_ml_cursor_readLedgerSize** <br>(gauge) | Tamaño de la lectura del ledger.|
| **pulsar.brk_ml_cursor_writeLedgerLogicalSize** <br>(gauge) | Tamaño de la escritura en el ledger (teniendo en cuenta sin réplicas).|
| **pulsar.brk_ml_cursor_writeLedgerSize** <br>(gauge) | Tamaño de la escritura en el ledger.|
| **pulsar.broker_load_manager_bundle_assignment** <br>(gauge) | Resumen de la latencia de las operaciones de propiedad de paquetes.|
| **pulsar.broker_lookup.count** <br>(count) | Número de muestras de la latencia de todas las operaciones de búsqueda.|
| **pulsar.broker_lookup.quantle** <br>(count) | Latencia de todas las operaciones de búsqueda.|
| **pulsar.broker_lookup.sum** <br>(count) | Latencia total de todas las operaciones de búsqueda.|
| **pulsar.broker_lookup_answers.count** <br>(count) | Número de respuestas de búsqueda (es decir, solicitudes no redirigidas).<br>_Se muestra como respuesta_ |
| **pulsar.broker_lookup_failures.count** <br>(count) | Número de errores de búsqueda.|
| **pulsar.broker_lookup_pending_requests** <br>(gauge) | Número de búsquedas pendientes en el broker. Cuando alcanza el umbral, se rechazan las nuevas solicitudes.<br>_Se muestra como solicitud_ |
| **pulsar.broker_lookup_redirects.count** <br>(count) | Número de solicitudes de búsqueda redirigidas.<br>_Se muestra como solicitud_ |
| **pulsar.broker_throttled_connections** <br>(gauge) | Número de conexiones limitadas.<br>_Se muestra como conexión_ |
| **pulsar.broker_throttled_connections_global_limit** <br>(gauge) | Número de conexiones limitadas debido al límite por conexión.<br>_Se muestra como conexión_ |
| **pulsar.broker_topic_load_pending_requests** <br>(gauge) | Carga de operaciones de temas pendientes.|
| **pulsar.bundle_consumer_count** <br>(gauge) | Recuento de consumidores de temas de este paquete.|
| **pulsar.bundle_msg_rate_in** <br>(gauge) | Tasa total de mensajes que llegan a los temas de este paquete (mensajes/segundo).|
| **pulsar.bundle_msg_rate_out** <br>(gauge) | Tasa total de mensajes que salen de los temas de este paquete (mensajes/segundo).|
| **pulsar.bundle_msg_throughput_in** <br>(gauge) | Rendimiento total que entra en los temas de este paquete (bytes/segundo).|
| **pulsar.bundle_msg_throughput_out** <br>(gauge) | Rendimiento total que sale de los temas de este paquete (bytes/segundo).|
| **pulsar.bundle_producer_count** <br>(gauge) | Recuento de productores de los temas de este paquete.|
| **pulsar.bundle_topics_count** <br>(gauge) | Recuento de temas de este paquete.|
| **pulsar.compaction_compacted_entries_count** <br>(gauge) | Número total de entradas compactadas.|
| **pulsar.compaction_compacted_entries_size** <br>(gauge) | Tamaño total de las entradas compactadas.|
| **pulsar.compaction_duration_time_in_mills** <br>(gauge) | Duración de la compactación.|
| **pulsar.compaction_failed_count** <br>(gauge) | Número total de fallos de la compactación.|
| **pulsar.compaction_read_throughput** <br>(gauge) | Rendimiento de lectura de la compactación.|
| **pulsar.compaction_removed_event_count** <br>(gauge) | Número total de eventos eliminados de la compactación.|
| **pulsar.compaction_succeed_count** <br>(gauge) | Número total de éxitos de la compactación.|
| **pulsar.compaction_write_throughput** <br>(gauge) | Rendimiento de escritura de la compactación.|
| **pulsar.connection_closed_total_count** <br>(gauge) | Número total de conexiones cerradas.<br>_Se muestra como conexión_ |
| **pulsar.connection_create_fail_count** <br>(gauge) | Número de conexiones fallidas.<br>_Se muestra como conexión_ |
| **pulsar.connection_create_success_count** <br>(gauge) | Número de conexiones creadas con éxito.<br>_Se muestra como conexión_ |
| **pulsar.connection_created_total_count** <br>(gauge) | Número total de conexiones.<br>_Se muestra como conexión_ |
| **pulsar.consumer_available_permits** <br>(gauge) | Permisos disponibles para un consumidor.|
| **pulsar.consumer_blocked_on_unacked_messages** <br>(gauge) | Indica si un consumidor está bloqueado en mensajes no reconocidos o no. 1 significa que el consumidor está bloqueado a la espera de que los mensajes no reconocidos sean reconocidos, acked.0 significa que el consumidor no está bloqueado a la espera de que los mensajes no reconocidos sean reconocidos.|
| **pulsar.consumer_msg_rate_out** <br>(gauge) | Tasa total de envío de mensajes de un consumidor (mensajes/segundo).|
| **pulsar.consumer_msg_rate_redeliver** <br>(gauge) | Tasa total de mensajes que se vuelven a entregar (mensajes/segundo).|
| **pulsar.consumer_msg_throughput_out** <br>(gauge) | Rendimiento total de envío de mensajes a un consumidor (bytes/segundo).|
| **pulsar.consumer_unacked_messages** <br>(gauge) | Número total de mensajes no reconocidos de un consumidor (mensajes).<br>_Se muestra como mensaje_ |
| **pulsar.consumers_count** <br>(gauge) | Número de consumidores activos del espacio de nombres conectados a este broker.|
| **pulsar.expired_token_count.count** <br>(count) | Número de tokens caducados en Pulsar.|
| **pulsar.function_last_invocation** <br>(gauge) | Marca de tiempo de la última invocación de la función.|
| **pulsar.function_processed_successfully_total.count** <br>(count) | Número total de mensajes procesados con éxito.<br>_Se muestra como mensaje_ |
| **pulsar.function_processed_successfully_total_1min.count** <br>(count) | Número total de mensajes procesados con éxito en el último minuto.<br>_Se muestra como mensaje_ |
| **pulsar.function_received_total.count** <br>(count) | Número total de mensajes recibidos de la fuente.<br>_Se muestra como mensaje_ |
| **pulsar.function_received_total_1min.count** <br>(count) | Número total de mensajes recibidos de la fuente en el último minuto.<br>_Se muestra como mensaje_ |
| **pulsar.function_system_exceptions_total.count** <br>(count) | Número total de excepciones del sistema.|
| **pulsar.function_system_exceptions_total_1min.count** <br>(count) | Número total de excepciones del sistema en el último minuto.|
| **pulsar.function_user_exceptions_total.count** <br>(count) | Número total de excepciones de usuarios.|
| **pulsar.function_user_exceptions_total_1min.count** <br>(count) | Número total de excepciones de usuarios en el último minuto.|
| **pulsar.in_bytes_total** <br>(gauge) | Número de mensajes en bytes recibidos de este tema.<br>_Se muestra como byte_ |
| **pulsar.in_messages_total** <br>(gauge) | Número total de mensajes recibidos de este tema.<br>_Se muestra como mensaje_ |
| **pulsar.jetty_async_dispatches_total.count** <br>(count) | Número de solicitudes que se han enviado de forma asíncrona.|
| **pulsar.jetty_async_requests_total.count** <br>(count) | Número total de solicitudes asíncronas.<br>_Se muestra como solicitud_ |
| **pulsar.jetty_async_requests_waiting** <br>(gauge) | Actualmente esperando solicitudes asíncronas.<br>_Se muestra como solicitud_ |
| **pulsar.jetty_async_requests_waiting_max** <br>(gauge) | Número máximo de peticiones solicitudes en espera.<br>_Se muestra como solicitud_ |
| **pulsar.jetty_dispatched_active** <br>(gauge) | Número de envíos activos actualmente.|
| **pulsar.jetty_dispatched_active_max** <br>(gauge) | Número máximo de envíos activos que se están gestionando.|
| **pulsar.jetty_dispatched_time_max** <br>(gauge) | Tiempo máximo dedicado a la gestión de envíos.|
| **pulsar.jetty_dispatched_time_seconds_total.count** <br>(count) | Tiempo total dedicado a la gestión del envío.<br>_Se muestra como segundos_ |
| **pulsar.jetty_dispatched_total.count** <br>(count) | Número de envíos.|
| **pulsar.jetty_expires_total.count** <br>(count) | Número de solicitudes asíncronas que han caducado.<br>_Se muestra como solicitud_ |
| **pulsar.jetty_request_time_max_seconds** <br>(gauge) | Tiempo máximo dedicado a la gestión de solicitudes.<br>_Se muestra como segundos_ |
| **pulsar.jetty_request_time_seconds_total.count** <br>(count) | Tiempo total dedicado a la gestión de todas las solicitudes.<br>_Se muestra como segundos_ |
| **pulsar.jetty_requests_active** <br>(gauge) | Número de solicitudes activas actualmente.<br>_Se muestra como solicitud_ |
| **pulsar.jetty_requests_active_max** <br>(gauge) | Número máximo de solicitudes que han estado activas a la vez.<br>_Se muestra como solicitud_ |
| **pulsar.jetty_requests_total.count** <br>(count) | Número de solicitudes.<br>_Se muestra como solicitud_ |
| **pulsar.jetty_responses_bytes_total.count** <br>(count) | Número total de bytes en todas las respuestas.<br>_Se muestra como bytes_ |
| **pulsar.jetty_responses_total.count** <br>(count) | Número de respuestas, etiquetadas por código de estado. La etiqueta del código puede ser "1xx", "2xx", "3xx", "4xx" o "5xx".<br>_Se muestra como respuesta_ |
| **pulsar.jetty_stats_seconds** <br>(gauge) | Tiempo en segundos durante el que se han recopilado estadísticas.<br>_Se muestra como segundos_ |
| **pulsar.lb_bandwidth_in_usage** <br>(gauge) | Uso de ancho de banda entrante del broker (en porcentaje).|
| **pulsar.lb_bandwidth_out_usage** <br>(gauge) | Uso de ancho de banda saliente del broker (en porcentaje).|
| **pulsar.lb_bundles_split_count.count** <br>(count) | Recuento de división de paquetes en este intervalo de comprobación de división de paquetes|
| **pulsar.lb_cpu_usage** <br>(gauge) | Uso de cpu del broker (en porcentaje).|
| **pulsar.lb_directMemory_usage** <br>(gauge) | Uso de memoria directa del proceso de broker (en porcentaje).|
| **pulsar.lb_memory_usage** <br>(gauge) | Uso de memoria del proceso del broker (en porcentaje).|
| **pulsar.lb_unload_broker_count.count** <br>(count) | Recuento de brokers de descarga en esta descarga de paquetes|
| **pulsar.lb_unload_bundle_count.count** <br>(count) | Recuento de descarga de paquetes en esta descarga de paquetes|
| **pulsar.ml_AddEntryBytesRate** <br>(gauge) | Tasa de bytes/s de mensajes añadidos|
| **pulsar.ml_AddEntryErrors** <br>(gauge) | Número de solicitudes addEntry fallidas<br>_Se muestra como solicitud_ |
| **pulsar.ml_AddEntryMessagesRate** <br>(gauge) | Tasa de msg/s de mensajes añadidos|
| **pulsar.ml_AddEntrySucceed** <br>(gauge) | Número de solicitudes de addEntry exitosas<br>_Se muestra como solicitud_ |
| **pulsar.ml_AddEntryWithReplicasBytesRate** <br>(gauge) | Tasa de bytes/s de mensajes añadidos con réplicas|
| **pulsar.ml_MarkDeleteRate** <br>(gauge) | Tasa de operaciones/s de marcado-eliminación|
| **pulsar.ml_NumberOfMessagesInBacklog** <br>(gauge) | Número de mensajes pendientes para todos los consumidores<br>_Se muestra como mensaje_ |
| **pulsar.ml_ReadEntriesBytesRate** <br>(gauge) | Tasa de bytes/s de mensajes leídos|
| **pulsar.ml_ReadEntriesErrors** <br>(gauge) | Número de solicitudes readEntries fallidas<br>_Se muestra como solicitud_ |
| **pulsar.ml_ReadEntriesRate** <br>(gauge) | Tasa de msg/s de mensajes leídos|
| **pulsar.ml_ReadEntriesSucceeded** <br>(gauge) | Número de solicitudes readEntries exitosas<br>_Se muestra como solicitud_ |
| **pulsar.ml_StoredMessagesSize** <br>(gauge) | Tamaño total de los mensajes en ledgers activos (teniendo en cuenta las múltiples copias almacenadas).|
| **pulsar.ml_cache_evictions** <br>(gauge) | Número de desalojos de la caché durante el último minuto.<br>_Se muestra como desalojo_ |
| **pulsar.ml_cache_hits_rate** <br>(gauge) | Número de accesos a la caché por segundo en el lado del broker.<br>_Se muestra como hit_ |
| **pulsar.ml_cache_hits_throughput** <br>(gauge) | Cantidad de datos que se recuperan de la caché en el lado del broker (en bytes/s).|
| **pulsar.ml_cache_misses_rate** <br>(gauge) | Número de fallos de caché por segundo en el lado del broker.<br>_Se muestra como fallo_ |
| **pulsar.ml_cache_misses_throughput** <br>(gauge) | Cantidad de datos que no se recuperan de la caché en el lado del broker (en byte/s).|
| **pulsar.ml_cache_pool_active_allocations** <br>(gauge) | Número de asignaciones actualmente activas en el ámbito directo|
| **pulsar.ml_cache_pool_active_allocations_huge** <br>(gauge) | Número de grandes asignaciones actualmente activas en el ámbito directo|
| **pulsar.ml_cache_pool_active_allocations_normal** <br>(gauge) | Número de asignaciones normales actualmente activas en el ámbito directo|
| **pulsar.ml_cache_pool_active_allocations_small** <br>(gauge) | Número de pequeñas asignaciones actualmente activas en el ámbito directo|
| **pulsar.ml_cache_pool_allocated** <br>(gauge) | Memoria total asignada a las listas de fragmentos en el ámbito directo|
| **pulsar.ml_cache_pool_used** <br>(gauge) | Memoria total utilizada de las listas de fragmentos en el ámbito directo|
| **pulsar.ml_cache_used_size** <br>(gauge) | Tamaño en bytes utilizado para almacenar las cargas útiles de las entradas<br>_Se muestra como bytes_ |
| **pulsar.ml_count** <br>(gauge) | Número de ledgers gestionados actualmente abiertos|
| **pulsar.out_bytes_total** <br>(gauge) | Número total de mensajes en bytes leídos de este tema.<br>_Se muestra como bytes_ |
| **pulsar.out_messages_total** <br>(gauge) | Número total de mensajes leídos de este tema.<br>_Se muestra como mensaje_ |
| **pulsar.producers_count** <br>(gauge) | Número de productores activos del espacio de nombres conectados a este broker.|
| **pulsar.proxy_active_connections** <br>(gauge) | Número de conexiones activas actualmente en el proxy.<br>_Se muestra como conexión_ |
| **pulsar.proxy_binary_bytes.count** <br>(count) | Contador de bytes proxy.<br>_Se muestra como bytes_ |
| **pulsar.proxy_binary_ops.count** <br>(count) | Contador de operaciones proxy.|
| **pulsar.proxy_new_connections.count** <br>(count) | Contador de conexiones que se están abriendo en el proxy.<br>_Se muestra como conexión_ |
| **pulsar.proxy_rejected_connections.count** <br>(count) | Contador de conexiones rechazadas por limitación.<br>_Se muestra como conexión_ |
| **pulsar.rate_in** <br>(gauge) | Tasa total de mensajes del espacio de nombres que llegan a este broker (mensajes/segundo).|
| **pulsar.rate_out** <br>(gauge) | Tasa total de mensajes del espacio de nombres que salen de este broker (mensajes/segundo).|
| **pulsar.replication_backlog** <br>(gauge) | Backlog total del espacio de nombres que replica al clúster remoto (mensajes).<br>_Se muestra como mensaje_ |
| **pulsar.replication_connected_count** <br>(gauge) | Recuento de suscriptores de replicación en funcionamiento para replicar al clúster remoto.|
| **pulsar.replication_delay_in_seconds** <br>(gauge) | Tiempo en segundos desde el momento en que se produjo un mensaje hasta el momento en que está a punto de ser replicado.<br>_Se muestra como segundos_ |
| **pulsar.replication_rate_expired** <br>(gauge) | Tasa total de mensajes caducados (mensajes/segundo).|
| **pulsar.replication_rate_in** <br>(gauge) | Tasa total de mensajes del espacio de nombres que replica desde el clúster remoto (mensajes/segundo).|
| **pulsar.replication_rate_out** <br>(gauge) | Tasa total de mensajes del espacio de nombres que replica al clúster remoto (mensajes/segundo).|
| **pulsar.replication_throughput_in** <br>(gauge) | Rendimiento total del espacio de nombres que replica desde el clúster remoto (bytes/segundo).|
| **pulsar.replication_throughput_out** <br>(gauge) | Rendimiento total del espacio de nombres que replica al clúster remoto (bytes/segundo).|
| **pulsar.sink_last_invocation** <br>(gauge) | Marca de tiempo de la última invocación del sumidero.|
| **pulsar.sink_received_total.count** <br>(count) | Número total de registros que un sumidero ha recibido de temas Pulsar.|
| **pulsar.sink_received_total_1min.count** <br>(count) | Número total de mensajes que un sumidero ha recibido de temas Pulsar en el último minuto.<br>_Se muestra como mensaje_ |
| **pulsar.sink_sink_exception** <br>(gauge) | Excepción de un sumidero.|
| **pulsar.sink_sink_exceptions_total.count** <br>(count) | Número total de excepciones de sumidero.|
| **pulsar.sink_sink_exceptions_total_1min.count** <br>(count) | Número total de excepciones de sumidero en el último minuto.|
| **pulsar.sink_system_exception** <br>(gauge) | Excepción del código del sistema.|
| **pulsar.sink_system_exceptions_total.count** <br>(count) | Número total de excepciones del sistema.|
| **pulsar.sink_system_exceptions_total_1min.count** <br>(count) | Número total de excepciones del sistema en el último minuto.|
| **pulsar.sink_written_total.count** <br>(count) | Número total de registros procesados por un sumidero.|
| **pulsar.sink_written_total_1min.count** <br>(count) | Número total de registros procesados por un sumidero en el último minuto.|
| **pulsar.source_last_invocation** <br>(gauge) | Marca de tiempo de la última invocación de la fuente.|
| **pulsar.source_received_total.count** <br>(count) | Número total de registros recibidos de la fuente.|
| **pulsar.source_received_total_1min.count** <br>(count) | Número total de registros recibidos de la fuente en el último minuto.|
| **pulsar.source_source_exception** <br>(gauge) | Excepción de una fuente.|
| **pulsar.source_source_exceptions_total.count** <br>(count) | Número total de excepciones de una fuente.|
| **pulsar.source_source_exceptions_total_1min.count** <br>(count) | Número total de excepciones de una fuente en el último minuto.|
| **pulsar.source_system_exception** <br>(gauge) | Excepción del código del sistema.|
| **pulsar.source_system_exceptions_total.count** <br>(count) | Número total de excepciones del sistema.|
| **pulsar.source_system_exceptions_total_1min.count** <br>(count) | Número total de excepciones del sistema en el último minuto.|
| **pulsar.source_written_total.count** <br>(count) | Número total de registros escritos en un tema Pulsar.|
| **pulsar.source_written_total_1min.count** <br>(count) | Número total de registros escritos en un tema Pulsar en el último minuto.|
| **pulsar.split_bytes_read.count** <br>(count) | Número de bytes leídos desde BookKeeper.<br>_Se muestra como bytes_ |
| **pulsar.split_num_messages_deserialized.count** <br>(count) | Número de mensajes deserializados.<br>_Se muestra como mensaje_ |
| **pulsar.split_num_record_deserialized.count** <br>(count) | Número de registros deserializados.|
| **pulsar.storage_backlog_quota_limit** <br>(gauge) | Cantidad total de datos en este tema que limitan la cuota de backlog (bytes).<br>_Se muestra como bytes_ |
| **pulsar.storage_backlog_size** <br>(gauge) | Tamaño total del backlog de temas de este espacio de nombres propiedad de este broker (mensajes).|
| **pulsar.storage_logical_size** <br>(gauge) | Tamaño de almacenamiento delos temas en el espacio de nombres propiedad del broker sin réplicas (en bytes).|
| **pulsar.storage_offloaded_size** <br>(gauge) | Cantidad total de datos de este espacio de nombres descargados al almacenamiento por niveles (bytes).|
| **pulsar.storage_read_rate** <br>(gauge) | Total de lotes de mensajes (entradas) leídos del almacenamiento para este espacio de nombres (lotes de mensajes/segundo).|
| **pulsar.storage_size** <br>(gauge) | Tamaño total de almacenamiento de los temas en este espacio de nombres propiedad de este broker (bytes).|
| **pulsar.storage_write_rate** <br>(gauge) | Total de lotes de mensajes (entradas) escritos en el almacenamiento para este espacio de nombres (lotes de mensajes/segundo).|
| **pulsar.subscription_back_log** <br>(gauge) | Backlog total de una suscripción (mensajes).<br>_Se muestra como mensaje_ |
| **pulsar.subscription_blocked_on_unacked_messages** <br>(gauge) | Indica si una suscripción está bloqueada en los mensajes no reconocidos o no. 1 significa que la suscripción está bloqueada a la espera de que los mensajes no reconocidos sean reconocidos, 0 significa que la suscripción no está bloqueada a la espera de que los mensajes no reconocidos sean reconocidos.|
| **pulsar.subscription_delayed** <br>(gauge) | Total de lotes de mensajes (entradas) cuyo envío se retrasa.|
| **pulsar.subscription_msg_rate_out** <br>(gauge) | Tasa total de envío de mensajes de una suscripción (mensajes/segundo).|
| **pulsar.subscription_msg_rate_redeliver** <br>(gauge) | Tasa total de mensajes que se vuelven a entregar (mensajes/segundo).|
| **pulsar.subscription_msg_throughput_out** <br>(gauge) | Rendimiento total de envío de mensajes de una suscripción (bytes/segundo).|
| **pulsar.subscription_unacked_messages** <br>(gauge) | Número total de mensajes no reconocidos para una suscripción (mensajes).<br>_Se muestra como mensaje_ |
| **pulsar.subscriptions_count** <br>(gauge) | Número de suscripciones Pulsar del espacio de nombres servidas por este broker.|
| **pulsar.throughput_in** <br>(gauge) | Rendimiento total del espacio de nombres que entra en este broker (bytes/segundo).|
| **pulsar.throughput_out** <br>(gauge) | Rendimiento total del espacio de nombres que sale de este broker (bytes/segundo).|
| **pulsar.topics_count** <br>(gauge) | Número de temas Pulsar del espacio de nombres propiedad de este broker.|
| **pulsar.txn_aborted_count.count** <br>(count) | Número de transacciones abortadas de este coordinador.<br>_Se muestra como transacción_ |
| **pulsar.txn_active_count** <br>(gauge) | Número de transacciones activas.<br>_Se muestra como transacción_ |
| **pulsar.txn_append_log_count.count** <br>(count) | Número de logs de transacciones anexas.|
| **pulsar.txn_committed_count.count** <br>(count) | Número de transacciones confirmadas.<br>_Se muestra como transacción_ |
| **pulsar.txn_created_count.count** <br>(count) | Número de transacciones creadas.<br>_Se muestra como transacción_ |
| **pulsar.txn_timeout_count.count** <br>(count) | Número de transacciones con tiempo de espera agotado.<br>_Se muestra como transacción_ |

### Recopilación de logs

1. La integración de logs de Pulsar admite el [formato de log por defecto](https://pulsar.apache.org/docs/en/reference-configuration/#log4j) de Pulsar. Clona y edita el [pipeline de la integración](https://docs.datadoghq.com/logs/processing/#integration-pipelines) si tienes un formato diferente.

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Descomenta y edita el bloque de configuración de logs en tu archivo `pulsar.d/conf.yaml`. Cambia el valor del parámetro de ruta en función de tu entorno. Consulta el [ejemplo pulsar.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/pulsar/datadog_checks/pulsar/data/conf.yaml.example) para ver todas las opciones de configuración disponibles.

   ```yaml
    logs:
      - type: file
        path: /pulsar/logs/pulsar.log
        source: pulsar
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

### Eventos

La integración Pulsar no incluye eventos.

### Checks de servicio

**pulsar.openmetrics.health**

Devuelve `CRITICAL` si el Agent no puede conectarse al endpoint de OpenMetrics o `OK` en caso contrario.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).