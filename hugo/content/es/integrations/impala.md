---
app_id: impala
categories:
- recopilación de logs
custom_kind: integración
description: Monitorizar el estado y el rendimiento de Apache Impala
integration_version: 4.0.0
media: []
supported_os:
- linux
- Windows
- macOS
title: Impala
---
## Información general

Este check monitoriza [Impala](https://impala.apache.org) a través del Datadog Agent.

## Configuración

Sigue las instrucciones siguientes para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Impala está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `impala.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de Impala. Consulta el [ejemplo impala.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/impala/datadog_checks/impala/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

El siguiente es un ejemplo de monitorización de un daemon:

```yaml
init_config:

instances:
  ## @param service_type - string - required
  ## The Impala service you want to monitor. Possible values are `daemon`, `statestore`, and `catalog`.
  #
- service_type: daemon

  ## @param openmetrics_endpoint - string - required
  ## The URL exposing metrics in the OpenMetrics format.
  ##
  ## The default port for the services are:
  ## - Daemon: 25000
  ## - Statestore: 25010
  ## - Catalog: 25020
  #
  openmetrics_endpoint: http://%%host%%:25000/metrics_prometheus
```

También puedes monitorizar varios servicios al mismo tiempo con el mismo Agent:

```yaml
init_config:

instances:

- service_type: daemon
  service: daemon-1
  openmetrics_endpoint: http://<DAEMON-1-IP>:25000/metrics_prometheus
- service_type: daemon
  service: daemon-2
  openmetrics_endpoint: http://<DAEMON-2-IP>:25000/metrics_prometheus
- service_type: statestore
  openmetrics_endpoint: http://<STATESTORE-IP>:25010/metrics_prometheus
- service_type: catalog
  openmetrics_endpoint: http://<CATALOG-IP>:25020/metrics_prometheus
```

2. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `impala` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **impala.catalog.events_processor.avg_events_fetch_duration** <br>(gauge) | \[Catalog\] Tiempo medio que se tarda en recuperar un lote de eventos del metastore.<br>_Se muestra en segundos_ |
| **impala.catalog.events_processor.avg_events_process_duration** <br>(gauge) | \[Catalog\] Tiempo medio que se tarda en procesar un lote de eventos recibidos del metastore.<br>_Se muestra en segundos_ |
| **impala.catalog.events_processor.events_received.count** <br>(count) | \[Catalog\] Número total de eventos de metastore recibidos.|
| **impala.catalog.events_processor.events_received_15min_rate** <br>(gauge) | \[Catalog\] Media móvil ponderada exponencialmente (EWMA) del número de eventos recibidos en los últimos 15 min.|
| **impala.catalog.events_processor.events_received_1min_rate** <br>(gauge) | \[Catalog\] Media móvil ponderada exponencialmente (EWMA) del número de eventos recibidos en el último min.|
| **impala.catalog.events_processor.events_received_5min_rate** <br>(gauge) | \[Catalog\] Media móvil ponderada exponencialmente (EWMA) del número de eventos recibidos en los últimos 5 min.|
| **impala.catalog.events_processor.events_skipped.count** <br>(count) | \[Catalog\] Número total de eventos de metastore omitidos.|
| **impala.catalog.events_processor.last_synced_event_id.count** <br>(count) | \[Catalog\] Último ID de evento de metastore que el servidor de catálogo ha procesado y sincronizado.|
| **impala.catalog.jvm.code_cache.committed_usage** <br>(gauge) | \[Catalog\] Bytes de uso comprometido de la caché de código en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.code_cache.current_usage** <br>(gauge) | \[Catalog\] Bytes de uso actual de la caché de código en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.code_cache.init_usage** <br>(gauge) | \[Catalog\] Bytes de uso de inicialización de la caché de código en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.code_cache.max_usage** <br>(gauge) | \[Catalog\] Bytes de uso de inicialización de la caché de código en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.code_cache.peak_committed_usage** <br>(gauge) | \[Catalog\] Bytes de uso comprometido pico de la caché de código en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.code_cache.peak_current_usage** <br>(gauge) | \[Catalog\] Bytes de uso actual de la caché de código en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.code_cache.peak_init_usage** <br>(gauge) | \[Catalog\] Bytes de uso de inicialización de la caché de código en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.code_cache.peak_max_usage** <br>(gauge) | \[Catalog\] Bytes de uso máximo pico de la caché de código en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.compressed_class_space.committed_usage** <br>(gauge) | \[Catalog\] Bytes de uso comprometido del espacio de clase comprimido en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.compressed_class_space.current_usage** <br>(gauge) | \[Catalog\] Bytes de uso actual del espacio de clase comprimido en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.compressed_class_space.init_usage** <br>(gauge) | \[Catalog\] Bytes de uso de inicialización del espacio de clase comprimido en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.compressed_class_space.max_usage** <br>(gauge) | \[Catalog\] Bytes de uso máximo del espacio de clase comprimido en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.compressed_class_space.peak_committed_usage** <br>(gauge) | \[Catalog\] Bytes de uso comprometido pico del espacio de clase comprimido en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.compressed_class_space.peak_current_usage** <br>(gauge) | \[Catalog\] Bytes de uso actual pico del espacio de clase comprimido en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.compressed_class_space.peak_init_usage** <br>(gauge) | \[Catalog\] Bytes de uso de inicialización pico del espacio de clase comprimido en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.compressed_class_space.peak_max_usage** <br>(gauge) | \[Catalog\] Bytes de uso máximo pico del espacio de clase comprimido en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.gc.count** <br>(count) | \[Catalog\] Recuento de recolecciones de basura en máquinas virtuales Java.|
| **impala.catalog.jvm.gc.num_info_threshold_exceeded.count** <br>(count) | \[Catalog\] Se ha superado el umbral de información de detección de pausas en máquinas virtuales Java.|
| **impala.catalog.jvm.gc.num_warn_threshold_exceeded.count** <br>(count) | \[Catalog\] Se ha superado el umbral de advertencia de detección de pausas en máquinas virtuales Java.|
| **impala.catalog.jvm.gc.time_millis.count** <br>(count) | \[Catalog\] Tiempo de recolección de basura en máquinas virtuales Java.<br>_Se muestra en milisegundos_ |
| **impala.catalog.jvm.gc.total_extra_sleep_time_millis.count** <br>(count) | \[Catalog\] Tiempo de suspensión adicional de detección de pausas en máquinas virtuales Java.<br>_Se muestra en milisegundos_ |
| **impala.catalog.jvm.heap.committed_usage** <br>(gauge) | \[Catalog\] Bytes de uso comprometido heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.heap.current_usage** <br>(gauge) | \[Catalog\] Bytes de uso actual heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.heap.init_usage** <br>(gauge) | \[Catalog\] Bytes de uso de inicialización heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.heap.max_usage** <br>(gauge) | \[Catalog\] Bytes de uso máximo heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.heap.peak_committed_usage** <br>(gauge) | \[Catalog\] Bytes de uso comprometido pico heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.heap.peak_current_usage** <br>(gauge) | \[Catalog\] Bytes de uso actual pico heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.heap.peak_init_usage** <br>(gauge) | \[Catalog\] Bytes de uso de inicialización pico heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.heap.peak_max_usage** <br>(gauge) | \[Catalog\] Bytes de uso máximo pico heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.metaspace.committed_usage** <br>(gauge) | \[Catalog\] Bytes de uso comprometido de metaspace en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.metaspace.current_usage** <br>(gauge) | \[Catalog\] Bytes de uso actual de metaspace en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.metaspace.init_usage** <br>(gauge) | \[Catalog\] Bytes de uso de inicialización de metaspace en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.metaspace.max_usage** <br>(gauge) | \[Catalog\] Bytes de uso máximo de metaspace en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.metaspace.peak_committed_usage** <br>(gauge) | \[Catalog\] Bytes de uso comprometido pico de metaspace en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.metaspace.peak_current_usage** <br>(gauge) | \[Catalog\] Bytes de uso actual pico de metaspace en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.metaspace.peak_init_usage** <br>(gauge) | \[Catalog\] Bytes de uso de inicialización pico de metaspace en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.metaspace.peak_max_usage** <br>(gauge) | \[Catalog\] Bytes de uso máximo pico de metaspace en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.non_heap.committed_usage** <br>(gauge) | \[Catalog\] Bytes de uso comprometido no heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.non_heap.current_usage** <br>(gauge) | \[Catalog\] Bytes de uso actual no heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.non_heap.init_usage** <br>(gauge) | \[Catalog\] Bytes de uso de inicialización no heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.non_heap.max_usage** <br>(gauge) | \[Catalog\] Bytes de uso máximo no heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.non_heap.peak_committed_usage** <br>(gauge) | \[Catalog\] Bytes de uso comprometido pico no heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.non_heap.peak_current_usage** <br>(gauge) | \[Catalog\] Bytes de uso actual pico no heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.non_heap.peak_init_usage** <br>(gauge) | \[Catalog\] Bytes de uso de inicialización pico no heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.non_heap.peak_max_usage** <br>(gauge) | \[Catalog\] Bytes de uso máximo pico no heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_eden_space.committed_usage** <br>(gauge) | \[Catalog\] Bytes de uso comprometido de PS Eden Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_eden_space.current_usage** <br>(gauge) | \[Catalog\] Bytes de uso actual de PS Eden Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_eden_space.init_usage** <br>(gauge) | \[Catalog\] Bytes de uso de inicialización de PS Eden Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_eden_space.max_usage** <br>(gauge) | \[Catalog\] Bytes de uso máximo de PS Eden Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_eden_space.peak_committed_usage** <br>(gauge) | \[Catalog\] Bytes de uso comprometido pico de PS Eden Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_eden_space.peak_current_usage** <br>(gauge) | \[Catalog\] Bytes de uso actual pico de PS Eden Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_eden_space.peak_init_usage** <br>(gauge) | \[Catalog\] Bytes de uso de inicialización pico de PS Eden Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_eden_space.peak_max_usage** <br>(gauge) | \[Catalog\] Bytes de uso máximo pico de PS Eden Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_old_gen.committed_usage** <br>(gauge) | \[Catalog\] Bytes de uso comprometido de PS Old Gen en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_old_gen.current_usage** <br>(gauge) | \[Catalog\] Bytes de uso actual de PS Old Gen en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_old_gen.init_usage** <br>(gauge) | \[Catalog\] Bytes de uso de inicialización de PS Old Gen en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_old_gen.max_usage** <br>(gauge) | \[Catalog\] Bytes de uso máximo de PS Old Gen en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_old_gen.peak_committed_usage** <br>(gauge) | \[Catalog\] Bytes de uso comprometido pico de PS Old Gen en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_old_gen.peak_current_usage** <br>(gauge) | \[Catalog\] Bytes de uso actual pico de PS Old Gen en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_old_gen.peak_init_usage** <br>(gauge) | \[Catalog\] Bytes de uso de inicialización pico de PS Old Gen en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_old_gen.peak_max_usage** <br>(gauge) | \[Catalog\] Bytes de uso máximo pico de PS Old Gen en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_survivor_space.committed_usage** <br>(gauge) | \[Catalog\] Bytes de uso comprometido de PS Survivor Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_survivor_space.current_usage** <br>(gauge) | \[Catalog\] Bytes de uso actual de PS Survivor Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_survivor_space.init_usage** <br>(gauge) | \[Catalog\] Bytes de uso de inicialización de PS Survivor Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_survivor_space.max_usage** <br>(gauge) | \[Catalog\] Bytes de uso máximo de PS Survivor Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_survivor_space.peak_committed_usage** <br>(gauge) | \[Catalog\] Bytes de uso comprometido pico de PS Survivor Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_survivor_space.peak_current_usage** <br>(gauge) | \[Catalog\] Bytes de uso actual pico de PS Survivor Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_survivor_space.peak_init_usage** <br>(gauge) | \[Catalog\] Bytes de uso de inicialización pico de PS Survivor Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.ps_survivor_space.peak_max_usage** <br>(gauge) | \[Catalog\] Bytes de uso máximo pico de PS Survivor Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.total_committed_usage** <br>(gauge) | \[Catalog\] Bytes de uso comprometido total en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.total_current_usage** <br>(gauge) | \[Catalog\] Bytes de uso actual total en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.total_init_usage** <br>(gauge) | \[Catalog\] Bytes de uso de inicialización total en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.total_max_usage** <br>(gauge) | \[Catalog\] Bytes de uso máximo total en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.total_peak_committed_usage** <br>(gauge) | \[Catalog\] Bytes de uso comprometido pico total en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.total_peak_current_usage** <br>(gauge) | \[Catalog\] Bytes de uso actual pico total en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.total_peak_init_usage** <br>(gauge) | \[Catalog\] Bytes de uso de inicialización pico total en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.jvm.total_peak_max_usage** <br>(gauge) | \[Catalog\] Bytes de uso máximo pico total en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.memory.mapped** <br>(gauge) | \[Catalog\] Total de bytes de asignaciones de memoria en este proceso (el tamaño de la memoria virtual).<br>_Se muestra en bytes_ |
| **impala.catalog.memory.rss** <br>(gauge) | \[Catalog\] Tamaño del conjunto residente (RSS) de este proceso, incluyendo TCMalloc, grupo de buffers y máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.catalog.memory.total_used** <br>(gauge) | \[Catalog\] Memoria total utilizada actualmente por TCMalloc y el grupo de buffers.<br>_Se muestra en bytes_ |
| **impala.catalog.partial_fetch_rpc_queue_len** <br>(gauge) | \[Catalog\] Longitud de la cola RPC para búsquedas parciales de objetos.|
| **impala.catalog.rpc_method_catalog_server.get_partial_catalog_object_call_duration.count** <br>(count) | \[Catalog\] Recuento del tiempo que el método RPC ha tardado en obtener el catálogo.|
| **impala.catalog.rpc_method_catalog_server.get_partial_catalog_object_call_duration.quantile** <br>(gauge) | \[Catalog\] Cuantil del tiempo que el método RPC ha tardado en obtener el catálogo.|
| **impala.catalog.rpc_method_catalog_server.get_partial_catalog_object_call_duration.sum** <br>(count) | \[Catalog\] Suma del tiempo que el método RPC ha tardado en obtener el catálogo.|
| **impala.catalog.rpc_method_statestore_subscriber.heartbeat_call_duration.count** <br>(count) | \[Catalog\] Recuento del tiempo que ha durado la llamada del latido.|
| **impala.catalog.rpc_method_statestore_subscriber.heartbeat_call_duration.quantile** <br>(gauge) | \[Catalog\] Cuantil del tiempo que ha durado la llamada del latido.|
| **impala.catalog.rpc_method_statestore_subscriber.heartbeat_call_duration.sum** <br>(count) | \[Catalog\] Suma del tiempo que ha durado la llamada del latido.|
| **impala.catalog.rpc_method_statestore_subscriber.update_state_call_duration.count** <br>(count) | \[Catalog\] Recuento del tiempo que el método RPC ha tardado en actualizar el estado.|
| **impala.catalog.rpc_method_statestore_subscriber.update_state_call_duration.quantile** <br>(gauge) | \[Catalog\] Cuantil del tiempo que el método RPC ha tardado en actualizar el estado.|
| **impala.catalog.rpc_method_statestore_subscriber.update_state_call_duration.sum** <br>(count) | \[Catalog\] Suma del tiempo que el método RPC ha tardado en actualizar el estado.|
| **impala.catalog.server_topic_processing_time_s_total.count** <br>(count) | \[Catalog\] Tiempo de procesamiento de temas del servidor del catálogo<br>_Se muestra en segundos_ |
| **impala.catalog.statestore_subscriber.heartbeat_interval_time_total.count** <br>(count) | \[Catalog\] Tiempo (en segundos) entre los latidos del Statestore.<br>_Se muestra en segundos_ |
| **impala.catalog.statestore_subscriber.last_recovery_duration** <br>(gauge) | \[Catalog\] Cantidad de tiempo que el suscriptor del Statestore ha tardado en recuperar la conexión la última vez que se perdió.<br>_Se muestra en segundos_ |
| **impala.catalog.statestore_subscriber.num_connection_failures.count** <br>(count) | \[Catalog\] Número de veces que el daemon ha detectado una pérdida de conectividad con el Statestore.|
| **impala.catalog.statestore_subscriber.processing_time.count** <br>(count) | \[Catalog\] Tiempo de procesamiento de suscriptores del Statestore para un tema determinado.|
| **impala.catalog.statestore_subscriber.statestore_client_cache.clients_in_use** <br>(gauge) | \[Catalog\] Número de clientes suscriptores del Statestore activos en la caché de clientes del daemon de Impala. Estos clientes son para la comunicación desde este rol al Statestore.|
| **impala.catalog.statestore_subscriber.statestore_client_cache.total_clients** <br>(gauge) | \[Catalog\] Número total de clientes suscriptores del Statestore activos en la caché de clientes del daemon de Impala. Estos clientes son para la comunicación desde este rol al Statestore.|
| **impala.catalog.statestore_subscriber.topic_update_duration_total.count** <br>(count) | \[Catalog\] Tiempo (en segundos) que se tarda en procesar las actualizaciones de temas de suscriptores del Statestore.<br>_Se muestra en segundos_ |
| **impala.catalog.statestore_subscriber.topic_update_interval_time_total.count** <br>(count) | \[Catalog\] Tiempo (en segundos) entre actualizaciones de temas de suscriptores del Statestore.<br>_Se muestra en segundos_ |
| **impala.catalog.statestore_subscriber.update_interval.count** <br>(count) | \[Catalog\] Intervalo entre actualizaciones de temas de un tema determinado.|
| **impala.catalog.tcmalloc.in_use** <br>(gauge) | \[Catalog\] Número de bytes utilizados por la aplicación. Esto no suele coincidir con el uso de memoria informado por el sistema operativo, ya que no incluye la sobrecarga de TCMalloc ni la fragmentación de memoria.<br>_Se muestra en bytes_ |
| **impala.catalog.tcmalloc.pageheap.free** <br>(gauge) | \[Catalog\] Número de bytes en páginas libres y asignadas en heap de páginas. Estos bytes pueden ser utilizados para cumplir con las solicitudes de asignación. Siempre cuentan para el uso de memoria virtual y a menos que la memoria subyacente sea intercambiada por el sistema operativo, también cuentan para el uso de memoria física.<br>_Se muestra en bytes_ |
| **impala.catalog.tcmalloc.pageheap.unmapped** <br>(gauge) | \[Catalog\] Número de bytes en páginas libres y asignadas en heap de páginas. Estos bytes pueden ser utilizados para cumplir con las solicitudes de asignación. Siempre cuentan para el uso de memoria virtual y a menos que la memoria subyacente sea intercambiada por el sistema operativo, también cuentan para el uso de memoria física.<br>_Se muestra en bytes_ |
| **impala.catalog.tcmalloc.physical_reserved** <br>(gauge) | \[Catalog\] Métrica derivada que calcula la cantidad de memoria física (en bytes) utilizada por el proceso, incluyendo la que está realmente en uso y los bytes libres reservados por TCMalloc. No incluye los metadatos de TCMalloc.<br>_Se muestra en bytes_ |
| **impala.catalog.tcmalloc.total_reserved** <br>(gauge) | \[Catalog\] Bytes de memoria del sistema reservados por TCMalloc.<br>_Se muestra en bytes_ |
| **impala.catalog.thread_manager.running_threads** <br>(gauge) | \[Catalog\] Número de subprocesos en ejecución en este proceso.|
| **impala.catalog.thread_manager.total_threads_created** <br>(gauge) | \[Catalog\] Subprocesos creados durante la vida del proceso.|
| **impala.catalog.thrift_server.connection.setup_queue_size** <br>(gauge) | \[Catalog\] Número de conexiones al Catalog Service que han sido aceptadas y están a la espera de ser configuradas.|
| **impala.catalog.thrift_server.connection.setup_time.count** <br>(count) | \[Catalog\] Recuento del tiempo que los clientes del Catalog Service han estado esperando a que se configure una conexión.|
| **impala.catalog.thrift_server.connection.setup_time.quantile** <br>(gauge) | \[Catalog\] Cuantil del tiempo que los clientes del Catalog Service han estado esperando a que se configure una conexión.<br>_Se muestra en segundos_ |
| **impala.catalog.thrift_server.connection.setup_time.sum** <br>(count) | \[Catalog\] Suma del tiempo que los clientes del Catalog Service han estado esperando a que se configure una conexión.<br>_Se muestra en segundos_ |
| **impala.catalog.thrift_server.connections.in_use** <br>(gauge) | \[Catalog\] Número de conexiones de servidor de catálogo activas a este Catalog Service.|
| **impala.catalog.thrift_server.svc_thread_wait_time.count** <br>(count) | \[Catalog\] Recuento del tiempo que los clientes del Catalog Service han estado esperando por subprocesos de servicio.|
| **impala.catalog.thrift_server.svc_thread_wait_time.quantile** <br>(gauge) | \[Catalog\] Cuantil del tiempo que los clientes del Catalog Service han estado esperando por subprocesos de servicio.<br>_Se muestra en segundos_ |
| **impala.catalog.thrift_server.svc_thread_wait_time.sum** <br>(count) | \[Catalog\] Suma del tiempo que los clientes del Catalog Service han estado esperando por subprocesos de servicio.<br>_Se muestra en segundos_ |
| **impala.catalog.thrift_server.timedout_cnxn_requests** <br>(gauge) | \[Catalog\] Número de solicitudes de conexión al Catalog Service que han excedido el tiempo de espera de ser configuradas.|
| **impala.catalog.thrift_server.total_connections.count** <br>(count) | \[Catalog\] Número total de conexiones realizadas al servicio de catálogo de este Catalog Server durante su vida útil.|
| **impala.daemon.admission_controller.executor_group_num_queries_executing_default** <br>(gauge) | \[Daemon\] Número total de consultas ejecutándose en el grupo ejecutor: por defecto|
| **impala.daemon.admission_controller.total_dequeue_failed_coordinator_limited.count** <br>(count) | \[Daemon\] Número de veces que las consultas no pueden ponerse en cola debido a un límite de recursos en el coordinador.|
| **impala.daemon.buffer_pool.arena.allocated_buffer_sizes.count** <br>(count) | \[Daemon\] Recuento de tamaños de buffer asignados desde el sistema. Solo un subconjunto de asignaciones se cuentan en esta métrica para reducir la sobrecarga.<br>_Se muestra en bytes_ |
| **impala.daemon.buffer_pool.arena.allocated_buffer_sizes.quantile** <br>(gauge) | \[Daemon\] Cuantil de tamaños de buffer asignados desde el sistema. Solo un subconjunto de asignaciones se cuentan en esta métrica para reducir la sobrecarga.<br>_Se muestra en bytes_ |
| **impala.daemon.buffer_pool.arena.allocated_buffer_sizes.sum** <br>(count) | \[Daemon\] Suma de tamaños de buffer asignados desde el sistema. Solo un subconjunto de asignaciones se cuentan en esta métrica para reducir la sobrecarga.<br>_Se muestra en bytes_ |
| **impala.daemon.buffer_pool.arena.clean_page_hits_total.count** <br>(count) | \[Daemon\] Número de veces que una página limpia ha sido desalojada para cumplir con una asignación.|
| **impala.daemon.buffer_pool.arena.direct_alloc_count_total.count** <br>(count) | \[Daemon\] Número de veces que se ha asignado directamente un nuevo buffer desde el asignador del sistema para cumplir con una asignación.|
| **impala.daemon.buffer_pool.arena.local_arena_free_buffer_hits_total.count** <br>(count) | \[Daemon\] Número de veces que se ha reciclado un buffer libre del ámbito de este núcleo para cumplir con una asignación.|
| **impala.daemon.buffer_pool.arena.num_final_scavenges_total.count** <br>(count) | \[Daemon\] Número de veces que el asignador ha tenido que bloquear todos los ámbitos y rebuscar para cumplir con una asignación.|
| **impala.daemon.buffer_pool.arena.num_scavenges_total.count** <br>(count) | \[Daemon\] Número de veces que el asignador ha tenido que rebuscar para cumplir con una asignación.|
| **impala.daemon.buffer_pool.arena.numa_arena_free_buffer_hits_total.count** <br>(count) | \[Daemon\] Número de veces que se ha utilizado un buffer reciclado dentro del mismo nodo NUMA para cumplir con una asignación.|
| **impala.daemon.buffer_pool.arena.system_alloc_time_total.count** <br>(count) | \[Daemon\] Tiempo total que el grupo de buffers ha pasado en el asignador del sistema para este ámbito.|
| **impala.daemon.buffer_pool.clean_page_bytes** <br>(gauge) | \[Daemon\] Total de bytes de memoria de páginas limpias almacenadas en caché en el grupo de buffers.<br>_Se muestra en bytes_ |
| **impala.daemon.buffer_pool.clean_pages** <br>(gauge) | \[Daemon\] Número total de páginas limpias almacenadas en caché en el grupo de buffers.|
| **impala.daemon.buffer_pool.clean_pages_limit** <br>(gauge) | \[Daemon\] Límite en el número de páginas limpias almacenadas en caché en el grupo de buffers.|
| **impala.daemon.buffer_pool.free_buffer** <br>(gauge) | \[Daemon\] Total de bytes de memoria de buffer libre almacenada en caché en el grupo de buffers.<br>_Se muestra en bytes_ |
| **impala.daemon.buffer_pool.free_buffers** <br>(gauge) | \[Daemon\] Número total de buffers libres almacenados en caché en el grupo de buffers.|
| **impala.daemon.buffer_pool.limit** <br>(gauge) | \[Daemon\] Bytes máximos permitidos asignados por el grupo de buffers.<br>_Se muestra en bytes_ |
| **impala.daemon.buffer_pool.reserved** <br>(gauge) | \[Daemon\] Total de bytes de buffers reservados por subsistemas Impala<br>_Se muestra en bytes_ |
| **impala.daemon.buffer_pool.system_allocated** <br>(gauge) | \[Daemon\] Memoria de buffer total asignada actualmente por el grupo de buffers.|
| **impala.daemon.buffer_pool.unused_reservation** <br>(gauge) | \[Daemon\] Total de bytes de reservas de buffer por subsistemas Impala que están actualmente sin usar.<br>_Se muestra en bytes_ |
| **impala.daemon.catalog.catalog_object_version_lower_bound** <br>(gauge) | \[Daemon\] Límite inferior de la versión del objeto del catálogo en la caché del catálogo local.|
| **impala.daemon.catalog.curr_topic** <br>(gauge) | \[Daemon\] Versión de actualización de temas del Statestore.|
| **impala.daemon.catalog.curr_version** <br>(gauge) | \[Daemon\] Versión de actualización del tema del catálogo.|
| **impala.daemon.catalog.num_databases** <br>(gauge) | \[Daemon\] Número de bases de datos en el catálogo.|
| **impala.daemon.catalog.num_tables** <br>(gauge) | \[Daemon\] Número de tablas en el catálogo.|
| **impala.daemon.catalog.server_client_cache.clients_in_use** <br>(gauge) | \[Daemon\] Número de clientes actualmente en uso por la caché de clientes del Catalog Server.|
| **impala.daemon.catalog.server_client_cache.total_clients** <br>(gauge) | \[Daemon\] Número total de clientes en la caché de clientes del Catalog Server.|
| **impala.daemon.catalog_cache.average_load_time** <br>(gauge) | \[Daemon\] Tiempo medio empleado en cargar nuevos valores en la caché del catálogo de Impala.|
| **impala.daemon.catalog_cache.eviction.count** <br>(count) | \[Daemon\] Número total de desalojos de la caché del catálogo de Impala.|
| **impala.daemon.catalog_cache.hit.count** <br>(count) | \[Daemon\] Número total de aciertos en la caché del catálogo de Impala.|
| **impala.daemon.catalog_cache.hit_rate** <br>(gauge) | \[Daemon\] Ratio de solicitudes de caché del catálogo de Impala que han sido aciertos.|
| **impala.daemon.catalog_cache.load.count** <br>(count) | \[Daemon\] Total de solicitudes a la caché del catálogo de Impala que han cargado nuevos valores.|
| **impala.daemon.catalog_cache.load_exception.count** <br>(count) | \[Daemon\] Total de solicitudes a la caché del catálogo de Impala que han lanzado excepciones al cargar nuevos valores.|
| **impala.daemon.catalog_cache.load_exception_rate** <br>(gauge) | \[Daemon\] Ratio de solicitudes a la caché del catálogo de Impala que han lanzado excepciones al cargar nuevos valores.|
| **impala.daemon.catalog_cache.load_success.count** <br>(count) | \[Daemon\] Número de solicitudes a la caché del catálogo de Impala que han cargado con éxito nuevos valores.|
| **impala.daemon.catalog_cache.miss.count** <br>(count) | \[Daemon\] Número de solicitudes a la caché del catálogo de Impala que han devuelto valores no almacenados en caché.|
| **impala.daemon.catalog_cache.miss_rate** <br>(gauge) | \[Daemon\] Ratio de solicitudes a la caché del catálogo de Impala que han fallado.|
| **impala.daemon.catalog_cache.request.count** <br>(count) | \[Daemon\] Total de solicitudes a la caché del catálogo de Impala.|
| **impala.daemon.catalog_cache.total_load_time.count** <br>(count) | \[Daemon\] Tiempo total empleado en la caché del catálogo de Impala cargando nuevos valores.<br>_Se muestra en segundos_ |
| **impala.daemon.cluster_membership.backends.count** <br>(count) | \[Daemon\] Número total de backends registrados en el almacén de estados.|
| **impala.daemon.cluster_membership.executor_groups.count** <br>(count) | \[Daemon\] Número total de grupos de ejecutores que tienen al menos un ejecutor.|
| **impala.daemon.cluster_membership.executor_groups_total_healthy.count** <br>(count) | \[Daemon\] Número total de grupos de ejecutores que están en un estado saludable, es decir, tienen al menos el número mínimo configurado de ejecutores para ser considerados para la admisión.|
| **impala.daemon.ddl_durations_ms.count** <br>(count) | \[Daemon\] Recuento de latencias de operaciones DDL.<br>_Se muestra en milisegundos_ |
| **impala.daemon.ddl_durations_ms.quantile** <br>(gauge) | \[Daemon\] Cuantil de latencias de operaciones DDL.|
| **impala.daemon.ddl_durations_ms.sum** <br>(count) | \[Daemon\] Suma de latencias de operaciones DDL.<br>_Se muestra en milisegundos_ |
| **impala.daemon.external_data_source_class_cache.hits.count** <br>(count) | \[Daemon\] Número de aciertos en la caché de External Data Source Class.|
| **impala.daemon.external_data_source_class_cache.misses.count** <br>(count) | \[Daemon\] Número de fallos en la caché de External Data Source Class.|
| **impala.daemon.hedged_read_ops.count** <br>(count) | \[Daemon\] Número total de lecturas cubiertas intentadas durante la vida del proceso.|
| **impala.daemon.hedged_read_ops.win.count** <br>(count) | \[Daemon\] Número total de veces que las lecturas cubiertas han sido más rápidas que las operaciones de lectura normales.|
| **impala.daemon.io_mgr.bytes_read.count** <br>(count) | \[Daemon\] Número total de bytes leídos por el gestor de E/S.<br>_Se muestra en bytes_ |
| **impala.daemon.io_mgr.bytes_written.count** <br>(count) | \[Daemon\] Número total de bytes escritos en el disco por el gestor de E/S.<br>_Se muestra en bytes_ |
| **impala.daemon.io_mgr.cached_bytes_read.count** <br>(count) | \[Daemon\] Número total de bytes almacenados en caché leídos por el gestor de E/S.<br>_Se muestra en bytes_ |
| **impala.daemon.io_mgr.cached_file_handles.hit** <br>(gauge) | \[Daemon\] Número de aciertos de caché para descriptores de archivos HDFS en caché|
| **impala.daemon.io_mgr.cached_file_handles.hit_ratio_total.count** <br>(count) | \[Daemon\] Ratio de aciertos de caché para descriptores de archivos HDFS entre 0 y 1, donde 1 significa que todas las lecturas fueron obtenidas de descriptores de archivos almacenados en caché.<br>_Se muestra en bytes_ |
| **impala.daemon.io_mgr.cached_file_handles.miss** <br>(gauge) | \[Daemon\] Número de aciertos de caché para descriptores de archivos HDFS almacenados en caché.<br>_Se muestra en bytes_ |
| **impala.daemon.io_mgr.cached_file_handles.miss.count** <br>(count) | \[Daemon\] Número de fallos de caché para descriptores de archivos HDFS almacenados en caché.|
| **impala.daemon.io_mgr.cached_file_handles.reopened.count** <br>(count) | \[Daemon\] Número de descriptores de archivos HDFS almacenados en caché reabiertos.|
| **impala.daemon.io_mgr.local_bytes_read.count** <br>(count) | \[Daemon\] Número total de bytes locales leídos por el gestor de E/S.<br>_Se muestra en bytes_ |
| **impala.daemon.io_mgr.num_cached_file_handles** <br>(gauge) | \[Daemon\] Número de descriptores de archivos HDFS almacenados en caché actualmente en el gestor de E/S.|
| **impala.daemon.io_mgr.num_file_handles_outstanding** <br>(gauge) | \[Daemon\] Número de descriptores de archivos HDFS actualmente en uso por los lectores.|
| **impala.daemon.io_mgr.num_open_files** <br>(gauge) | \[Daemon\] Número actual de archivos abiertos por el gestor de E/S.|
| **impala.daemon.io_mgr.remote_data_cache.dropped.count** <br>(count) | \[Daemon\] Número total de bytes no insertados en la caché de datos remota debido al límite de simultaneidad.<br>_Se muestra en bytes_ |
| **impala.daemon.io_mgr.remote_data_cache.dropped_entries.count** <br>(count) | \[Daemon\] Número total de entradas no insertadas en la caché de datos remota debido al límite de simultaneidad.|
| **impala.daemon.io_mgr.remote_data_cache.hit.count** <br>(count) | \[Daemon\] Número total de aciertos en la caché de datos remota.|
| **impala.daemon.io_mgr.remote_data_cache.hit_bytes.count** <br>(count) | \[Daemon\] Número total de bytes de aciertos en la caché de datos remota.<br>_Se muestra en bytes_ |
| **impala.daemon.io_mgr.remote_data_cache.instant_evictions.count** <br>(count) | \[Daemon\] Número total de desalojos instantáneos de la caché de datos remota. Un desalojo instantáneo se produce cuando la política de desalojo rechaza una entrada durante la inserción.|
| **impala.daemon.io_mgr.remote_data_cache.miss.count** <br>(count) | \[Daemon\] Número total de fallos en la caché de datos remota.|
| **impala.daemon.io_mgr.remote_data_cache.miss_bytes.count** <br>(count) | \[Daemon\] Número total de bytes de fallos en la caché de datos remota.<br>_Se muestra en bytes_ |
| **impala.daemon.io_mgr.remote_data_cache.num_entries** <br>(gauge) | \[Daemon\] Número actual de entradas en la caché de datos remota.|
| **impala.daemon.io_mgr.remote_data_cache.num_writes.count** <br>(count) | \[Daemon\] Número total de escrituras en la caché de datos remota.|
| **impala.daemon.io_mgr.remote_data_cache.total** <br>(gauge) | \[Daemon\] Tamaño en bytes actual de la caché de datos remota.<br>_Se muestra en bytes_ |
| **impala.daemon.io_mgr.short_circuit.read.count** <br>(count) | \[Daemon\] Número total de bytes en cortocircuito leídos por el gestor de E/S.<br>_Se muestra en bytes_ |
| **impala.daemon.io_mgr_queue.read_latency.count** <br>(count) | \[Daemon\] Recuento de tiempos de operación de lectura en disco.|
| **impala.daemon.io_mgr_queue.read_latency.quantile** <br>(gauge) | \[Daemon\] Cuantil de tiempos de operación de lectura en disco.<br>_Se muestra en segundos_ |
| **impala.daemon.io_mgr_queue.read_latency.sum** <br>(count) | \[Daemon\] Suma de tiempos de operación de lectura en disco.<br>_Se muestra en segundos_ |
| **impala.daemon.io_mgr_queue.read_size.count** <br>(count) | \[Daemon\] Recuento de tamaños de operaciones de lectura en disco.|
| **impala.daemon.io_mgr_queue.read_size.quantile** <br>(gauge) | \[Daemon\] Cuantil de tamaños de operaciones de lectura en disco.<br>_Se muestra en bytes_ |
| **impala.daemon.io_mgr_queue.read_size.sum** <br>(count) | \[Daemon\] Suma de tamaños de operaciones de lectura en disco.<br>_Se muestra en bytes_ |
| **impala.daemon.io_mgr_queue.write_io_error_total.count** <br>(count) | \[Daemon\] Número de errores de escritura de E/S en disco.|
| **impala.daemon.io_mgr_queue.write_latency.count** <br>(count) | \[Daemon\] Recuento de tiempos de operación de escritura en disco.|
| **impala.daemon.io_mgr_queue.write_latency.quantile** <br>(gauge) | \[Daemon\] Cuantil de tiempos de operación de escritura en disco.<br>_Se muestra en segundos_ |
| **impala.daemon.io_mgr_queue.write_latency.sum** <br>(count) | \[Daemon\] Suma de tiempos de operación de escritura en disco.<br>_Se muestra en segundos_ |
| **impala.daemon.io_mgr_queue.write_size.count** <br>(count) | \[Daemon\] Recuento de tamaños de operaciones de escritura en disco.|
| **impala.daemon.io_mgr_queue.write_size.quantile** <br>(gauge) | \[Daemon\] Cuantil de tamaños de operaciones de escritura en disco.<br>_Se muestra en bytes_ |
| **impala.daemon.io_mgr_queue.write_size.sum** <br>(count) | \[Daemon\] Suma de tamaños de operaciones de escritura en disco.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.code_cache.committed_usage** <br>(gauge) | \[Daemon\] Bytes de uso comprometido de la caché de código en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.code_cache.current_usage** <br>(gauge) | \[Daemon\] Bytes de uso actual de la caché de código en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.code_cache.init_usage** <br>(gauge) | \[Daemon\] Bytes de uso de inicialización de la caché de código en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.code_cache.max_usage** <br>(gauge) | \[Daemon\] Bytes de uso máximo de la caché de código en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.code_cache.peak_committed_usage** <br>(gauge) | \[Daemon\] Bytes de uso comprometido pico de la caché de código en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.code_cache.peak_current_usage** <br>(gauge) | \[Daemon\] Bytes de uso actual pico de la caché de código en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.code_cache.peak_init_usage** <br>(gauge) | \[Daemon\] Bytes de uso de inicialización pico de la caché de código en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.code_cache.peak_max_usage** <br>(gauge) | \[Daemon\] Bytes de uso máximo pico de la caché de código en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.compressed_class_space.committed_usage** <br>(gauge) | \[Daemon\] Bytes de uso comprometido del espacio de clase comprimido en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.compressed_class_space.current_usage** <br>(gauge) | \[Daemon\] Bytes de uso actual del espacio de clase comprimido en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.compressed_class_space.init_usage** <br>(gauge) | \[Daemon\] Bytes de uso de inicialización del espacio de clase comprimido en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.compressed_class_space.max_usage** <br>(gauge) | \[Daemon\] Bytes de uso máximo del espacio de clase comprimido en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.compressed_class_space.peak_committed_usage** <br>(gauge) | \[Daemon\] Bytes de uso comprometido pico del espacio de clase comprimido en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.compressed_class_space.peak_current_usage** <br>(gauge) | \[Daemon\] Bytes de uso actual pico del espacio de clase comprimido en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.compressed_class_space.peak_init_usage** <br>(gauge) | \[Daemon\] Bytes de uso de inicialización pico del espacio de clase comprimido en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.compressed_class_space.peak_max_usage** <br>(gauge) | \[Daemon\] Bytes de uso máximo pico del espacio de clase comprimido en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.gc.count** <br>(count) | \[Daemon\] Recuento de recolecciones de basura en máquinas virtuales Java.|
| **impala.daemon.jvm.gc.num_info_threshold_exceeded.count** <br>(count) | \[Daemon\] Se ha superado el umbral de información de detección de pausas en máquinas virtuales Java.|
| **impala.daemon.jvm.gc.num_warn_threshold_exceeded.count** <br>(count) | \[Daemon\] Se ha superado el umbral de advertencia de detección de pausas en máquinas virtuales Java.|
| **impala.daemon.jvm.gc.time_millis.count** <br>(count) | \[Daemon\] Tiempo de recolección de basura en máquinas virtuales Java.<br>_Se muestra en milisegundos_ |
| **impala.daemon.jvm.gc.total_extra_sleep_time_millis.count** <br>(count) | \[Daemon\] Tiempo de suspensión adicional de detección de pausas en máquinas virtuales Java.<br>_Se muestra en milisegundos_ |
| **impala.daemon.jvm.heap.committed_usage** <br>(gauge) | \[Daemon\] Bytes de uso comprometido heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.heap.current_usage** <br>(gauge) | \[Daemon\] Bytes de uso actual heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.heap.init_usage** <br>(gauge) | \[Daemon\] Bytes de uso de inicialización heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.heap.max_usage** <br>(gauge) | \[Daemon\] Bytes de uso máximo heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.heap.peak_committed_usage** <br>(gauge) | \[Daemon\] Bytes de uso comprometido pico heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.heap.peak_current_usage** <br>(gauge) | \[Daemon\] Bytes de uso actual pico en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.heap.peak_init_usage** <br>(gauge) | \[Daemon\] Bytes de uso de inicialización pico heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.heap.peak_max_usage** <br>(gauge) | \[Daemon\] Bytes de uso máximo pico heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.metaspace.committed_usage** <br>(gauge) | \[Daemon\] Bytes de uso comprometido de metaspace en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.metaspace.current_usage** <br>(gauge) | \[Daemon\] Bytes de uso actual de metaspace en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.metaspace.init_usage** <br>(gauge) | \[Daemon\] Bytes de uso de inicialización de metaspace en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.metaspace.max_usage** <br>(gauge) | \[Daemon\] Bytes de uso máximo de metaspace en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.metaspace.peak_committed_usage** <br>(gauge) | \[Daemon\] Bytes de uso comprometido pico de metaspace en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.metaspace.peak_current_usage** <br>(gauge) | \[Daemon\] Bytes de uso actual pico de metaspace en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.metaspace.peak_init_usage** <br>(gauge) | \[Daemon\] Bytes de uso de inicialización pico de metaspace en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.metaspace.peak_max_usage** <br>(gauge) | \[Daemon\] Bytes de uso máximo pico de metaspace en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.non_heap.committed_usage** <br>(gauge) | \[Daemon\] Bytes de uso comprometido no heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.non_heap.current_usage** <br>(gauge) | \[Daemon\] Bytes de uso actual no heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.non_heap.init_usage** <br>(gauge) | \[Daemon\] Bytes de uso de inicialización no heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.non_heap.max_usage** <br>(gauge) | \[Daemon\] Bytes de uso máximo no heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.non_heap.peak_committed_usage** <br>(gauge) | \[Daemon\] Bytes de uso comprometido pico no heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.non_heap.peak_current_usage** <br>(gauge) | \[Daemon\] Bytes de uso actual pico no heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.non_heap.peak_init_usage** <br>(gauge) | \[Daemon\] Bytes de uso de inicialización pico no heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.non_heap.peak_max_usage** <br>(gauge) | \[Daemon\] Bytes de uso máximo pico no heap en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_eden_space.committed_usage** <br>(gauge) | \[Daemon\] Bytes de uso comprometido de PS Eden Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_eden_space.current_usage** <br>(gauge) | \[Daemon\] Bytes de uso actual de PS Eden Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_eden_space.init_usage** <br>(gauge) | \[Daemon\] Bytes de uso de inicialización de PS Eden Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_eden_space.max_usage** <br>(gauge) | \[Daemon\] Bytes de uso máximo de PS Eden Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_eden_space.peak_committed_usage** <br>(gauge) | \[Daemon\] Bytes de uso comprometido pico de PS Eden Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_eden_space.peak_current_usage** <br>(gauge) | \[Daemon\] Bytes de uso actual pico de PS Eden Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_eden_space.peak_init_usage** <br>(gauge) | \[Daemon\] Bytes de uso de inicialización pico de PS Eden Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_eden_space.peak_max_usage** <br>(gauge) | \[Daemon\] Bytes de uso máximo pico de PS Eden Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_old_gen.committed_usage** <br>(gauge) | \[Daemon\] Bytes de uso comprometido de PS Old Gen en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_old_gen.current_usage** <br>(gauge) | \[Daemon\] Bytes de uso actual de PS Old Gen en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_old_gen.init_usage** <br>(gauge) | \[Daemon\] Bytes de uso de inicialización de PS Old Gen en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_old_gen.max_usage** <br>(gauge) | \[Daemon\] Bytes de uso máximo de PS Old Gen en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_old_gen.peak_committed_usage** <br>(gauge) | \[Daemon\] Bytes de uso comprometido pico de PS Old Gen en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_old_gen.peak_current_usage** <br>(gauge) | \[Daemon\] Bytes de uso actual pico de PS Old Gen en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_old_gen.peak_init_usage** <br>(gauge) | \[Daemon\] Bytes de uso de inicialización pico de PS Old Gen en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_old_gen.peak_max_usage** <br>(gauge) | \[Daemon\] Bytes de uso máximo pico de PS Old Gen en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_survivor_space.committed_usage** <br>(gauge) | \[Daemon\] Bytes de uso comprometido de PS Survivor Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_survivor_space.current_usage** <br>(gauge) | \[Daemon\] Bytes de uso actual de PS Survivor Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_survivor_space.init_usage** <br>(gauge) | \[Daemon\] Bytes de uso de inicialización de PS Survivor Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_survivor_space.max_usage** <br>(gauge) | \[Daemon\] Bytes de uso máximo de PS Survivor Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_survivor_space.peak_committed_usage** <br>(gauge) | \[Daemon\] Bytes de uso comprometido pico de PS Survivor Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_survivor_space.peak_current_usage** <br>(gauge) | \[Daemon\] Bytes de uso actual pico de PS Survivor Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_survivor_space.peak_init_usage** <br>(gauge) | \[Daemon\] Bytes de uso de inicialización pico de PS Survivor Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.ps_survivor_space.peak_max_usage** <br>(gauge) | \[Daemon\] Bytes de uso máximo pico de PS Survivor Space en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.total_committed_usage** <br>(gauge) | \[Daemon\] Bytes de uso comprometido total en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.total_current_usage** <br>(gauge) | \[Daemon\] Bytes de uso actual total en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.total_init_usage** <br>(gauge) | \[Daemon\] Bytes de uso de inicialización total en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.total_max_usage** <br>(gauge) | \[Daemon\] Bytes de uso máximo total en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.total_peak_committed_usage** <br>(gauge) | \[Daemon\] Bytes de uso comprometido pico total en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.total_peak_current_usage** <br>(gauge) | \[Daemon\] Bytes de uso actual pico total en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.total_peak_init_usage** <br>(gauge) | \[Daemon\] Bytes de uso de inicialización pico total en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.jvm.total_peak_max_usage** <br>(gauge) | \[Daemon\] Bytes de uso máximo pico total en máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.daemon.mem_tracker.process.bytes_freed_by_last_gc** <br>(gauge) | \[Daemon\] Cantidad de memoria liberada por la última recolección de basura del rastreador de memoria.<br>_Se muestra en bytes_ |
| **impala.daemon.mem_tracker.process.bytes_over_limit** <br>(gauge) | \[Daemon\] Cantidad de memoria por la que el proceso estuvo por encima de su límite de memoria la última vez que se alcanzó el límite de memoria.<br>_Se muestra en bytes_ |
| **impala.daemon.mem_tracker.process.current_usage** <br>(gauge) | \[Daemon\] Uso actual del rastreador de memoria para este servicio.<br>_Se muestra en bytes_ |
| **impala.daemon.mem_tracker.process.limit** <br>(gauge) | \[Daemon\] Límite del rastreador de memoria del proceso.|
| **impala.daemon.mem_tracker.process.num_gcs.count** <br>(count) | \[Daemon\] Número total de recolecciones de basura realizadas por el rastreador de memoria durante la vida del proceso.|
| **impala.daemon.mem_tracker.process.peak_usage** <br>(gauge) | \[Daemon\] Pico de uso del rastreador de memoria para este servicio.<br>_Se muestra en bytes_ |
| **impala.daemon.memory.mapped** <br>(gauge) | \[Daemon\] Total de bytes de asignaciones de memoria en este proceso (el tamaño de la memoria virtual).<br>_Se muestra en bytes_ |
| **impala.daemon.memory.rss** <br>(gauge) | \[Daemon\] Tamaño del conjunto residente (RSS) de este proceso, incluyendo TCMalloc, grupo de buffers y máquinas virtuales Java.|
| **impala.daemon.memory.total_used** <br>(gauge) | \[Daemon\] Memoria total utilizada actualmente por TCMalloc y el grupo de buffers.<br>_Se muestra en bytes_ |
| **impala.daemon.num_files_open_for_insert** <br>(gauge) | \[Daemon\] Número de archivos HDFS actualmente abiertos para escritura.|
| **impala.daemon.num_fragments.count** <br>(count) | \[Daemon\] Número total de fragmentos de consulta procesados durante la vida del proceso.|
| **impala.daemon.num_fragments_in_flight** <br>(gauge) | \[Daemon\] Número de instancias de fragmentos de consulta que se están ejecutando actualmente.|
| **impala.daemon.num_open_beeswax_sessions** <br>(gauge) | \[Daemon\] Número de sesiones Beeswax abiertas.|
| **impala.daemon.num_open_hiveserver2_sessions** <br>(gauge) | \[Daemon\] Número de sesiones HiveServer2 abiertas.|
| **impala.daemon.num_queries.count** <br>(count) | \[Daemon\] Número total de consultas procesadas durante la vida del proceso.|
| **impala.daemon.num_queries_executed.count** <br>(count) | \[Daemon\] Número total de consultas que fueron ejecutadas en este backend durante la vida del proceso.|
| **impala.daemon.num_queries_executing** <br>(gauge) | \[Daemon\] Número de consultas que se están ejecutando actualmente en este backend.|
| **impala.daemon.num_queries_expired.count** <br>(count) | \[Daemon\] Número de consultas caducadas por inactividad.|
| **impala.daemon.num_queries_registered** <br>(gauge) | \[Daemon\] Número total de consultas registradas en esta instancia del servidor Impala. Incluye consultas que están activas, a la espera de ser cerradas.|
| **impala.daemon.num_queries_spilled.count** <br>(count) | \[Daemon\] Número de consultas por las que se ha desbordado un operador.|
| **impala.daemon.num_sessions_expired.count** <br>(count) | \[Daemon\] Número de sesiones caducadas por inactividad.|
| **impala.daemon.query_durations_ms.count** <br>(count) | \[Daemon\] Recuento de latencias de consulta.|
| **impala.daemon.query_durations_ms.quantile** <br>(gauge) | \[Daemon\] Cuantil de latencias de consulta.<br>_Se muestra en milisegundos_ |
| **impala.daemon.query_durations_ms.sum** <br>(count) | \[Daemon\] Suma de latencias de consulta.<br>_Se muestra en milisegundos_ |
| **impala.daemon.request_pool_service_resolve_pool_duration.count** <br>(count) | \[Daemon\] Tiempo (ms) empleado en resolver grupos de solicitudes.<br>_Se muestra en milisegundos_ |
| **impala.daemon.resultset_cache.total_bytes** <br>(gauge) | \[Daemon\] Número total de bytes consumidos por filas almacenadas en caché para soportar HS2 FETCH_FIRST.<br>_Se muestra en bytes_ |
| **impala.daemon.resultset_cache.total_num_rows** <br>(gauge) | \[Daemon\] Número total de filas almacenadas en caché para soportar HS2 FETCH_FIRST.|
| **impala.daemon.rpcs_queue_overflow.count** <br>(count) | \[Daemon\] Número total de RPC entrantes que fueron rechazadas debido al desbordamiento de la cola de servicio de este servicio.|
| **impala.daemon.scan_ranges.count** <br>(count) | \[Daemon\] Número total de rangos de análisis leídos durante la vida del proceso.|
| **impala.daemon.scan_ranges_num_missing_volume_id.count** <br>(count) | \[Daemon\] Número total de rangos de análisis leídos durante la vida del proceso que no tenían metadatos de volumen.|
| **impala.daemon.senders_blocked_on_recvr_creation** <br>(gauge) | \[Daemon\] Número de remitentes esperando a que se inicialice el fragmento de recepción.|
| **impala.daemon.simple_scheduler.assignments.count** <br>(count) | \[Daemon\] Número de asignaciones.|
| **impala.daemon.simple_scheduler.local_assignments.count** <br>(count) | \[Daemon\] Número de asignaciones que operan con datos locales.|
| **impala.daemon.statestore_subscriber.heartbeat_interval_time.count** <br>(count) | \[Daemon\] Tiempo (en segundos) entre los latidos del Statestore.|
| **impala.daemon.statestore_subscriber.last_recovery_duration** <br>(gauge) | \[Daemon\] Cantidad de tiempo que el suscriptor del Statestore ha tardado en recuperar la conexión la última vez que se perdió.|
| **impala.daemon.statestore_subscriber.num_connection_failures.count** <br>(count) | \[Daemon\] Número de veces que el daemon ha detectado una pérdida de conectividad con el Statestore.|
| **impala.daemon.statestore_subscriber.processing_time.count** <br>(count) | \[Daemon\] Tiempo de procesamiento de suscriptores del Statestore para un tema determinado.|
| **impala.daemon.statestore_subscriber.statestore_client_cache.clients_in_use** <br>(gauge) | \[Daemon\] Número de clientes suscriptores del Statestore activos en la caché de clientes del daemon de Impala. Estos clientes son para la comunicación desde este rol al Statestore.|
| **impala.daemon.statestore_subscriber.statestore_client_cache.total_clients** <br>(gauge) | \[Daemon\] Número total de clientes suscriptores del Statestore activos en la caché de clientes del daemon de Impala. Estos clientes son para la comunicación desde este rol al Statestore.|
| **impala.daemon.statestore_subscriber.topic.update_duration.count** <br>(count) | \[Daemon\] Tiempo (en segundos) que se tarda en procesar las actualizaciones de temas de suscriptores del Statestore.<br>_Se muestra en segundos_ |
| **impala.daemon.statestore_subscriber.topic.update_interval_time.count** <br>(count) | \[Daemon\] Tiempo (en segundos) entre actualizaciones de temas de suscriptores del Statestore.<br>_Se muestra en segundos_ |
| **impala.daemon.statestore_subscriber.update_interval.count** <br>(count) | \[Daemon\] Intervalo entre actualizaciones de temas de un tema determinado.|
| **impala.daemon.tcmalloc.in_use** <br>(gauge) | \[Daemon\] Número de bytes utilizados por la aplicación. Esto no suele coincidir con el uso de memoria informado por el sistema operativo, ya que no incluye la sobrecarga de TCMalloc ni la fragmentación de memoria.<br>_Se muestra en bytes_ |
| **impala.daemon.tcmalloc.pageheap.free** <br>(gauge) | \[Daemon\] Número de bytes en páginas libres y asignadas en heap de páginas. Estos bytes pueden ser utilizados para cumplir con las solicitudes de asignación. Siempre cuentan para el uso de memoria virtual y a menos que la memoria subyacente sea intercambiada por el sistema operativo, también cuentan para el uso de memoria física.<br>_Se muestra en bytes_ |
| **impala.daemon.tcmalloc.pageheap.unmapped** <br>(gauge) | \[Daemon\] Número de bytes en páginas libres y asignadas en heap de páginas. Estos bytes pueden ser utilizados para cumplir con las solicitudes de asignación. Siempre cuentan para el uso de memoria virtual y a menos que la memoria subyacente sea intercambiada por el sistema operativo, también cuentan para el uso de memoria física.<br>_Se muestra en bytes_ |
| **impala.daemon.tcmalloc.physical_reserved** <br>(gauge) | \[Daemon\] Métrica derivada que calcula la cantidad de memoria física (en bytes) utilizada por el proceso, incluyendo la que está realmente en uso y los bytes libres reservados por TCMalloc. No incluye los metadatos de TCMalloc.<br>_Se muestra en bytes_ |
| **impala.daemon.tcmalloc.total_reserved** <br>(gauge) | \[Daemon\] Bytes de memoria del sistema reservados por TCMalloc.<br>_Se muestra en bytes_ |
| **impala.daemon.thread_manager.running_threads** <br>(gauge) | \[Daemon\] Número de subprocesos en ejecución en este proceso.|
| **impala.daemon.thread_manager.total_threads_created** <br>(gauge) | \[Daemon\] Subprocesos creados durante la vida del proceso.|
| **impala.daemon.thrift_server.beeswax.frontend.connection_setup_queue_size** <br>(gauge) | \[Daemon\] Número de conexiones de la API Beeswax a este daemon de Impala que han sido aceptadas y están a la espera de ser configuradas.|
| **impala.daemon.thrift_server.beeswax.frontend.connection_setup_time.count** <br>(count) | \[Daemon\] Recuento del tiempo que los clientes de la API Beeswax han estado esperando a que se configure una conexión.|
| **impala.daemon.thrift_server.beeswax.frontend.connection_setup_time.quantile** <br>(gauge) | \[Daemon\] Cuantil del tiempo que los clientes de la API Beeswax han estado esperando a que se configure una conexión.<br>_Se muestra en segundos_ |
| **impala.daemon.thrift_server.beeswax.frontend.connection_setup_time.sum** <br>(count) | \[Daemon\] Suma del tiempo que los clientes de la API Beeswax han estado esperando a que se configure una conexión.<br>_Se muestra en segundos_ |
| **impala.daemon.thrift_server.beeswax.frontend.connections_in_use** <br>(gauge) | \[Daemon\] Número de conexiones de la API Beeswax activas a este daemon de Impala.|
| **impala.daemon.thrift_server.beeswax.frontend.svc_thread_wait_time.count** <br>(count) | \[Daemon\] Recuento del tiempo que los clientes de la API Beeswax han estado esperando por subprocesos de servicio.|
| **impala.daemon.thrift_server.beeswax.frontend.svc_thread_wait_time.quantile** <br>(gauge) | \[Daemon\] Recuento del tiempo que los clientes de la API Beeswax han estado esperando por subprocesos de servicio.<br>_Se muestra en segundos_ |
| **impala.daemon.thrift_server.beeswax.frontend.svc_thread_wait_time.sum** <br>(count) | \[Daemon\] Suma del tiempo que los clientes de la API Beeswax han estado esperando por subprocesos de servicio.<br>_Se muestra en segundos_ |
| **impala.daemon.thrift_server.beeswax.frontend.timedout_cnxn_requests** <br>(gauge) | \[Daemon\] Número de solicitudes de conexión de la API Beeswax a este daemon de Impala que han excedido el tiempo de espera de ser configuradas.|
| **impala.daemon.thrift_server.beeswax.frontend.total_connections.count** <br>(count) | \[Daemon\] Número total de conexiones de la API Beeswax realizadas a este daemon de Impala durante su vida.|
| **impala.daemon.thrift_server.hiveserver2.frontend.connection_setup_queue_size** <br>(gauge) | \[Daemon\] Número de conexiones de la API HiveServer2 a este daemon de Impala que han sido aceptadas y están a la espera de ser configuradas.|
| **impala.daemon.thrift_server.hiveserver2.frontend.connection_setup_time.count** <br>(count) | \[Daemon\] Recuento del tiempo que los clientes de la API HiveServer2 han estado esperando a que se configure una conexión.|
| **impala.daemon.thrift_server.hiveserver2.frontend.connection_setup_time.quantile** <br>(gauge) | \[Daemon\] Cuantil del tiempo que los clientes de la API HiveServer2 han estado esperando a que se configure una conexión.<br>_Se muestra en segundos_ |
| **impala.daemon.thrift_server.hiveserver2.frontend.connection_setup_time.sum** <br>(count) | \[Daemon\] Suma del tiempo que los clientes de la API HiveServer2 han estado esperando a que se configure una conexión.<br>_Se muestra en segundos_ |
| **impala.daemon.thrift_server.hiveserver2.frontend.connections_in_use** <br>(gauge) | \[Daemon\] Número de API Beeswax de HiveServer2 activas para este daemon de Impala.|
| **impala.daemon.thrift_server.hiveserver2.frontend.svc_thread_wait_time.count** <br>(count) | \[Daemon\] Recuento del tiempo que los clientes de la API HiveServer2 han estado esperando por subprocesos de servicio.|
| **impala.daemon.thrift_server.hiveserver2.frontend.svc_thread_wait_time.quantile** <br>(gauge) | \[Daemon\] Cuantil del tiempo que los clientes de la API HiveServer2 han estado esperando por subprocesos de servicio.<br>_Se muestra en segundos_ |
| **impala.daemon.thrift_server.hiveserver2.frontend.svc_thread_wait_time.sum** <br>(count) | \[Daemon\] Suma del tiempo que los clientes de la API HiveServer2 han estado esperando por subprocesos de servicio.<br>_Se muestra en segundos_ |
| **impala.daemon.thrift_server.hiveserver2.frontend.timedout_cnxn_requests** <br>(gauge) | \[Daemon\] Número de conexiones de la API Beeswax de HiveServer2 a este daemon de Impala que han excedido el tiempo de espera de ser configurados.|
| **impala.daemon.thrift_server.hiveserver2.frontend.total_connections.count** <br>(count) | \[Daemon\] Número total de conexiones Beeswax de la API HTTP de HiveServer2 a este daemon de Impala durante su vida.|
| **impala.daemon.thrift_server.hiveserver2.http_frontend.connection_setup_queue_size** <br>(gauge) | \[Daemon\] Número de conexiones de la API HTTP de HiveServer2 a este daemon de Impala que han sido aceptadas y están a la espera de ser configuradas.|
| **impala.daemon.thrift_server.hiveserver2.http_frontend.connection_setup_time.count** <br>(count) | \[Daemon\] Recuento del tiempo que los clientes de la API HTTP de HiveServer2 han estado esperando a que se configure una conexión.|
| **impala.daemon.thrift_server.hiveserver2.http_frontend.connection_setup_time.quantile** <br>(gauge) | \[Daemon\] Cuantil del tiempo que los clientes de la API HTTP de HiveServer2 han estado esperando a que se configure una conexión.<br>_Se muestra en segundos_ |
| **impala.daemon.thrift_server.hiveserver2.http_frontend.connection_setup_time.sum** <br>(count) | \[Daemon\] Suma del tiempo que los clientes de la API HTTP de HiveServer2 han pasado esperando a que se configure una conexión.<br>_Se muestra en segundos_ |
| **impala.daemon.thrift_server.hiveserver2.http_frontend.connections_in_use** <br>(gauge) | \[Daemon\] Número de Beeswax de la API HTTP de HiveServer2 activos para este daemon de Impala.|
| **impala.daemon.thrift_server.hiveserver2.http_frontend.svc_thread_wait_time.count** <br>(count) | \[Daemon\] Recuento del tiempo que los clientes de la API HTTP de HiveServer2 han estado esperando por subprocesos de servicio.|
| **impala.daemon.thrift_server.hiveserver2.http_frontend.svc_thread_wait_time.quantile** <br>(gauge) | \[Daemon\] Cuantil del tiempo que los clientes de la API HTTP de HiveServer2 han estado esperando por subprocesos de servicio.<br>_Se muestra en segundos_ |
| **impala.daemon.thrift_server.hiveserver2.http_frontend.svc_thread_wait_time.sum** <br>(count) | \[Daemon\] Suma del tiempo que los clientes de la API HTTP de HiveServer2 han estado esperando por subprocesos de servicio.<br>_Se muestra en segundos_ |
| **impala.daemon.thrift_server.hiveserver2.http_frontend.timedout_cnxn_requests** <br>(gauge) | \[Daemon\] Número de conexiones Beeswax de la API HTTP de HiveServer2 a este daemon de Impala que han excedido el tiempo de espera de ser configuradas.|
| **impala.daemon.thrift_server.hiveserver2.http_frontend.total_connections.count** <br>(count) | \[Daemon\] Número total de conexiones Beeswax de la API HTTP de HiveServer2 a este daemon de Impala durante su vida.|
| **impala.daemon.tmp_file_mgr.active_scratch_dirs** <br>(gauge) | \[Daemon\] Número de directorios temporales activos para volcar al disco.|
| **impala.daemon.tmp_file_mgr.scratch_space_bytes_used** <br>(gauge) | \[Daemon\] Total actual de bytes volcados a todos los directorios temporales.<br>_Se muestra en bytes_ |
| **impala.daemon.tmp_file_mgr.scratch_space_bytes_used_dir_0** <br>(gauge) | \[Daemon\] Total actual de bytes volcados a un único directorio temporal.<br>_Se muestra en bytes_ |
| **impala.daemon.tmp_file_mgr.scratch_space_bytes_used_high_water_mark** <br>(gauge) | \[Daemon\] Marca de agua alta para bytes volcados en todos los directorios temporales.|
| **impala.daemon.total_senders_blocked_on_recvr_creation.count** <br>(count) | \[Daemon\] Número total de remitentes que se han bloqueado esperando a que se inicialice el fragmento receptor.|
| **impala.daemon.total_senders_timedout_waiting_for_recvr_creation.count** <br>(count) | \[Daemon\] Número total de remitentes que han excedido el tiempo de espera para inicializar el fragmento de recepción.|
| **impala.statestore.heartbeat_durations.count** <br>(count) | \[Statestore\] Tiempo (en segundos) empleado en enviar RPC de latidos. Incluye el tiempo de procesamiento del lado del suscriptor y el tiempo de transmisión de red.<br>_Se muestra en segundos_ |
| **impala.statestore.last_priority_topic_update_durations** <br>(gauge) | \[Statestore\] Última duración (en segundos) empleada en enviar RPC de actualización de temas prioritarios. Incluye el tiempo de procesamiento del lado del suscriptor y el tiempo de transmisión de red.<br>_Se muestra en segundos_ |
| **impala.statestore.last_topic_update_durations** <br>(gauge) | \[Statestore\] Última duración (en segundos) empleada en enviar RPC de actualización de temas no prioritarios. Incluye el tiempo de procesamiento del lado del suscriptor y el tiempo de transmisión de red.<br>_Se muestra en segundos_ |
| **impala.statestore.live_backends** <br>(gauge) | \[Statestore\] Número de suscriptores del Statestore registrados.|
| **impala.statestore.max_priority_topic_update_durations** <br>(gauge) | \[Statestore\] Duración máxima (en segundos) empleada en enviar RPC de actualización de temas prioritarios. Incluye el tiempo de procesamiento del lado del suscriptor y el tiempo de transmisión de red.<br>_Se muestra en segundos_ |
| **impala.statestore.max_topic_update_durations** <br>(gauge) | \[Statestore\] Duración máxima (en segundos) empleada en enviar RPC de actualización de temas no prioritarios. Incluye el tiempo de procesamiento del lado del suscriptor y el tiempo de transmisión de red.<br>_Se muestra en segundos_ |
| **impala.statestore.mean_priority_topic_update_durations** <br>(gauge) | \[Statestore\] Duración media (en segundos) empleada en enviar RPC de actualización de temas prioritarios. Incluye el tiempo de procesamiento del lado del suscriptor y el tiempo de transmisión de red.<br>_Se muestra en segundos_ |
| **impala.statestore.mean_topic_update_durations** <br>(gauge) | \[Statestore\] Duración media (en segundos) empleada en enviar RPC de actualización de temas no prioritarios. Incluye el tiempo de procesamiento del lado del suscriptor y el tiempo de transmisión de red.<br>_Se muestra en segundos_ |
| **impala.statestore.memory.mapped** <br>(gauge) | \[Statestore\] Total de bytes de asignaciones de memoria en este proceso (el tamaño de la memoria virtual).<br>_Se muestra en bytes_ |
| **impala.statestore.memory.rss** <br>(gauge) | \[Statestore\] Tamaño del conjunto residente (RSS) de este proceso, incluyendo TCMalloc, grupo de buffers y máquinas virtuales Java.<br>_Se muestra en bytes_ |
| **impala.statestore.memory.total_used** <br>(gauge) | \[Statestore\] Memoria total utilizada actualmente por TCMalloc y el grupo de buffers.<br>_Se muestra en bytes_ |
| **impala.statestore.min_priority_topic_update_durations** <br>(gauge) | \[Statestore\] Duración mínima (en segundos) empleada en enviar RPC de actualización de temas prioritarios. Incluye el tiempo de procesamiento del lado del suscriptor y el tiempo de transmisión de red.<br>_Se muestra en segundos_ |
| **impala.statestore.min_topic_update_durations** <br>(gauge) | \[Statestore\] Duración mínima (en segundos) empleada en enviar RPC de actualización de temas no prioritarios. Incluye el tiempo de procesamiento del lado del suscriptor y el tiempo de transmisión de red.<br>_Se muestra en segundos_ |
| **impala.statestore.priority_topic_update_durations.count** <br>(count) | \[Statestore\] Tiempo (en segundos) empleado en enviar RPC de actualización de temas prioritarios. Incluye el tiempo de procesamiento del lado del suscriptor y el tiempo de transmisión de red.<br>_Se muestra en segundos_ |
| **impala.statestore.register_subscriber_call_duration.count** <br>(count) | \[Statestore\] Recuento del tiempo que el servicio del Statestore ha empleado en registrar suscriptores.|
| **impala.statestore.register_subscriber_call_duration.quantile** <br>(gauge) | \[Statestore\] Cuantil del tiempo que el servicio del Statestore ha empleado en registrar suscriptores.<br>_Se muestra en segundos_ |
| **impala.statestore.register_subscriber_call_duration.sum** <br>(count) | \[Statestore\] Suma del tiempo que el servicio del Statestore ha empleado en registrar suscriptores.<br>_Se muestra en segundos_ |
| **impala.statestore.subscriber.heartbeat.client_cache.clients_in_use** <br>(gauge) | \[Statestore\] Número de clientes en uso por la caché de clientes de latidos del Statestore.|
| **impala.statestore.subscriber.heartbeat.client_cache.total_clients** <br>(gauge) | \[Statestore\] Número total de clientes en uso por la caché de clientes de latidos del Statestore.|
| **impala.statestore.subscriber.update_state.client_cache.clients_in_use** <br>(gauge) | \[Statestore\] Número de clientes en uso por la caché de clientes de estado de actualización del Statestore.|
| **impala.statestore.subscriber.update_state.client_cache.total_clients** <br>(gauge) | \[Statestore\] Número total de clientes en la caché de clientes de estado de actualización del Statestore.|
| **impala.statestore.tcmalloc.in_use** <br>(gauge) | \[Statestore\] Número de bytes utilizados por la aplicación. Esto no suele coincidir con el uso de memoria informado por el sistema operativo, ya que no incluye la sobrecarga de TCMalloc ni la fragmentación de memoria.<br>_Se muestra en bytes_ |
| **impala.statestore.tcmalloc.pageheap.free** <br>(gauge) | \[Statestore\] Número de bytes en páginas libres y asignadas en heap de páginas. Estos bytes pueden ser utilizados para cumplir con las solicitudes de asignación. Siempre cuentan para el uso de memoria virtual y a menos que la memoria subyacente sea intercambiada por el sistema operativo, también cuentan para el uso de memoria física.<br>_Se muestra en bytes_ |
| **impala.statestore.tcmalloc.pageheap.unmapped** <br>(gauge) | \[Statestore\] Número de bytes en páginas libres y asignadas en heap de páginas. Estos bytes pueden ser utilizados para cumplir con las solicitudes de asignación. Siempre cuentan para el uso de memoria virtual y a menos que la memoria subyacente sea intercambiada por el sistema operativo, también cuentan para el uso de memoria física.<br>_Se muestra en bytes_ |
| **impala.statestore.tcmalloc.physical_reserved** <br>(gauge) | \[Statestore\] Métrica derivada que calcula la cantidad de memoria física (en bytes) utilizada por el proceso, incluyendo la que está realmente en uso y los bytes libres reservados por TCMalloc. No incluye los metadatos de TCMalloc.<br>_Se muestra en bytes_ |
| **impala.statestore.tcmalloc.total_reserved** <br>(gauge) | \[Statestore\] Bytes de memoria del sistema reservados por TCMalloc.<br>_Se muestra en bytes_ |
| **impala.statestore.thread_manager.running_threads** <br>(gauge) | \[Statestore\] Número de subprocesos en ejecución en este proceso.|
| **impala.statestore.thread_manager.total_threads_created** <br>(gauge) | \[Statestore\] Subprocesos creados durante la vida del proceso.|
| **impala.statestore.thrift_server.connection_setup_queue_size** <br>(gauge) | \[Statestore\] Número de conexiones al servicio Statestore que han sido aceptadas y están a la espera de ser configuradas.|
| **impala.statestore.thrift_server.connection_setup_time.count** <br>(count) | \[Statestore\] Recuento del tiempo que los clientes del servicio Statestore han estado esperando a que se configure una conexión.|
| **impala.statestore.thrift_server.connection_setup_time.quantile** <br>(gauge) | \[Statestore\] Cuantil del tiempo que los clientes del servicio Statestore han estado esperando a que se configure una conexión.<br>_Se muestra en segundos_ |
| **impala.statestore.thrift_server.connection_setup_time.sum** <br>(count) | \[Statestore\] Suma del tiempo que los clientes del servicio Statestore han estado esperando a que se configure una conexión.<br>_Se muestra en segundos_ |
| **impala.statestore.thrift_server.connections_in_use** <br>(gauge) | \[Statestore\] Número de conexiones activas a este servicio Statestore.|
| **impala.statestore.thrift_server.svc_thread_wait_time.count** <br>(count) | \[Statestore\] Recuento del tiempo que los clientes del servicio Statestore han estado esperando por subprocesos de servicio.|
| **impala.statestore.thrift_server.svc_thread_wait_time.quantile** <br>(gauge) | \[Statestore\] Cuantil del tiempo que los clientes del servicio Statestore han estado esperando por subprocesos de servicio.<br>_Se muestra en segundos_ |
| **impala.statestore.thrift_server.svc_thread_wait_time.sum** <br>(count) | \[Statestore\\] Suma del tiempo que los clientes del servicio Statestore han estado esperando por subprocesos de servicio.<br>_Se muestra en segundos_ |
| **impala.statestore.thrift_server.timedout_cnxn_requests** <br>(gauge) | \[Statestore\] Número de solicitudes de conexión al Servicio Statestore que han excedido el tiempo de espera de ser configuradas.|
| **impala.statestore.thrift_server.total_connections.count** <br>(count) | \[Statestore\] Número total de conexiones realizadas al servicio Statestore de este Statestore durante su vida.|
| **impala.statestore.topic_update_durations.count** <br>(count) | \[Statestore\] Tiempo (en segundos) empleado en enviar RPC de actualización de temas no prioritarios. Incluye el tiempo de procesamiento del lado del suscriptor y el tiempo de transmisión de red.<br>_Se muestra en segundos_ |
| **impala.statestore.total_key_size** <br>(gauge) | \[Statestore\] Suma del tamaño de todas las claves para todos los temas rastreados por el Statestore.<br>_Se muestra en bytes_ |
| **impala.statestore.total_topic_size** <br>(gauge) | \[Statestore\] Suma del tamaño de todas las claves y todos los valores para todos los temas rastreados por el Statestore.<br>_Se muestra en bytes_ |
| **impala.statestore.total_value_size** <br>(gauge) | \[Statestore\] Suma del tamaño de todos los valores para todos los temas rastreados por el Statestore.<br>_Se muestra en bytes_ |

### Eventos

La integración Impala no incluye eventos.

### Checks de servicio

**impala.daemon.openmetrics.health**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas de Prometheus de la instancia del daemon de Impala.

_Estados: ok, crítico_

**impala.statestore.openmetrics.health**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas de Prometheus de la instancia del statestore de Impala.

_Estados: ok, crítico_

**impala.catalog.openmetrics.health**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas de Prometheus de la instancia del catálogo de Impala.

_Estados: ok, crítico_

### Logs

La integración Impala puede recopilar logs de los servicios Impala y reenviarlos a Datadog.

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Descomenta y edita el bloque de configuración de logs en tu archivo `impalad.d/conf.yaml`. A continuación podrás ver un ejemplo con el proceso daemon:

   ```yaml
   logs:
     - type: file
       path: /var/log/impala/impalad.INFO
       source: impala
       tags:
       - service_type:daemon
       log_processing_rules:
       - type: multi_line
         pattern: ^[IWEF]\d{4} (\d{2}:){2}\d{2}
         name: new_log_start_with_log_level_and_date
     - type: file
       path: /var/log/impala/impalad.WARNING
       source: impala
       tags:
       - service_type:daemon
       log_processing_rules:
       - type: multi_line
         pattern: ^[IWEF]\d{4} (\d{2}:){2}\d{2}
         name: new_log_start_with_log_level_and_date
     - type: file
       path: /var/log/impala/impalad.ERROR
       source: impala
       tags:
       - service_type:daemon
       log_processing_rules:
       - type: multi_line
         pattern: ^[IWEF]\d{4} (\d{2}:){2}\d{2}
         name: new_log_start_with_log_level_and_date
     - type: file
       path: /var/log/impala/impalad.FATAL
       source: impala
       tags:
       - service_type:daemon
       log_processing_rules:
       - type: multi_line
         pattern: ^[IWEF]\d{4} (\d{2}:){2}\d{2}
         name: new_log_start_with_log_level_and_date
   ```

Consulta [el archivo de configuración de ejemplo](https://github.com/DataDog/integrations-core/blob/master/impala/datadog_checks/impala/data/conf.yaml.example#L632-L755) para saber cómo recopilar todos los logs.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).