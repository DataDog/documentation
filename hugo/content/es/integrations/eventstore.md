---
app_id: eventstore
categories:
- almacenamiento en caché
- almacenes de datos
custom_kind: integración
description: Recopilación de métricas de EventStore
integration_version: 2.1.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: EventStore
---
## Información general

Obtén métricas de EventStore en tiempo real para:

- Visualizar y monitorizar colas de EventStore
- Captura todas las métricas disponibles en los siguientes endpoints de API: estadísticas, información de nodos, proyecciones no transitorias, suscripciones, gossip de clústeres (la lista de los endpoints susceptibles de scraping es configurable).

## Configuración

El check de EventStore no está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que es necesario instalarlo.

### Instalación

Para el Agent v7.21+ / v6.21+, sigue las instrucciones a continuación para instalar el check de EventStore en tu host. Consulta [Usar integraciones comunitarias](https://docs.datadoghq.com/agent/guide/use-community-integrations/) para realizar la instalación con el Docker Agent o versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-eventstore==<INTEGRATION_VERSION>
   ```

1. Configura tu integración de forma similar a las [integraciones](https://docs.datadoghq.com/getting_started/integrations/) centrales.

### Configuración

1. Edita el archivo `eventstore.d/conf.yaml` en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para comenzar a recopilar [métricas](#metrics) de EventStore.
   Consulta el [eventstore.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-extras/blob/master/eventstore/datadog_checks/eventstore/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#service-status) y busca `eventstore` en la sección Checks.

## Compatibilidad

El check es compatible con las principales plataformas.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **eventstore.proc.mem** <br>(gauge) | Uso actual de la memoria<br>_Se muestra como byte_ |
| **eventstore.proc.cpu** <br>(gauge) | Uso actual de la CPU|
| **eventstore.proc.threads** <br>(gauge) | Subprocesos actuales|
| **eventstore.proc.contentions_rate** <br>(gauge) | contenciones actuales|
| **eventstore.proc.thrown_exceptions_rate** <br>(gauge) | número de excepciones|
| **eventstore.proc.disk.read_bytes** <br>(gauge) | Lecturas de disco (Bytes)<br>_Se muestra como byte_ |
| **eventstore.proc.disk.write_bytes** <br>(gauge) | Escrituras en disco (Bytes)<br>_Se muestra como byte_ |
| **eventstore.proc.disk.read_ops** <br>(gauge) | Lecturas de disco (Ops)|
| **eventstore.proc.disk.write_ops** <br>(gauge) | Escrituras en disco (Ops)|
| **eventstore.tcp.connections** <br>(gauge) | Conexiones Tcp|
| **eventstore.tcp.receiving_speed** <br>(gauge) | Recepción Tcp|
| **eventstore.tcp.sending_speed** <br>(gauge) | Envío Tcp|
| **eventstore.tcp.in_send** <br>(gauge) | Entrada Tcp|
| **eventstore.tcp.measure_time** <br>(gauge) | Medida Tcp|
| **eventstore.tcp.pending_received** <br>(gauge) | Tcp Pendiente|
| **eventstore.tcp.pending_send** <br>(gauge) | Tcp Pendiente|
| **eventstore.tcp.received_bytes.since_last_run** <br>(gauge) | Received_Bytes Since_Last|
| **eventstore.tcp.received_bytes.total** <br>(gauge) | Bytes de Received_Bytes|
| **eventstore.tcp.sent_bytes.since_last_run** <br>(gauge) | Sent_Bytes Since_Last|
| **eventstore.tcp.sent_bytes.total** <br>(gauge) | Total de Sent_Bytes|
| **eventstore.gc.allocation_speed** <br>(gauge) | Velocidad de asignación|
| **eventstore.gc.items_count.gen0** <br>(gauge) | Elementos Count.Gen0|
| **eventstore.gc.size.gen0** <br>(gauge) | Gen0 Gen0|
| **eventstore.gc.items_count.gen1** <br>(gauge) | Elementos Count.Gen1|
| **eventstore.gc.size.gen1** <br>(gauge) | Gen1 Gen1|
| **eventstore.gc.items_count.gen2** <br>(gauge) | Elementos Count.Gen2|
| **eventstore.gc.size.gen2** <br>(gauge) | Gen2 Gen2|
| **eventstore.gc.large_heap_size** <br>(gauge) | Tamaño de Large_Heap|
| **eventstore.gc.time_in_gc** <br>(gauge) | Recopilación de elementos no usados Time_In|
| **eventstore.gc.total_bytes_in_heaps** <br>(gauge) | Heaps de Total_Bytes_In<br>_Se muestra como byte_ |
| **eventstore.sys.free_mem** <br>(gauge) | Memoria libre|
| **eventstore.es.queue.avg_items_per_second** <br>(gauge) | Cola media de elementos por segundo|
| **eventstore.es.queue.avg_processing_time** <br>(gauge) | Cola media de tiempo de procesamiento|
| **eventstore.es.queue.current_idle_time** <br>(gauge) | Cola actual de tiempo de inactividad|
| **eventstore.es.queue.current_processing_time** <br>(gauge) | Cola actual de tiempo de procesamiento|
| **eventstore.es.queue.idle_time_percent** <br>(gauge) | Porcentaje de tiempo inactivo en cola|
| **eventstore.es.queue.length** <br>(gauge) | Longitud de la cola Longitud de la cola|
| **eventstore.es.queue.length_current_try_peak** <br>(gauge) | Pico de intentos actual de la longitud de la cola|
| **eventstore.es.queue.length_lifetime_peak** <br>(gauge) | Duración del pico de la longitud de la cola|
| **eventstore.es.queue.total_items_processed** <br>(gauge) | Elementos procesados del total de la cola|
| **eventstore.es.writer.flush_size.last** <br>(gauge) | Tamaño de la última descarga del escritor|
| **eventstore.es.writer.flush_delay_ms.last** <br>(gauge) | Retardo de la última descarga del escritor (ms)<br>_Se muestra en milisegundos_ |
| **eventstore.es.writer.flush_size.mean** <br>(gauge) | Tamaño medio de la descarga del escritor|
| **eventstore.es.writer.flush_delay_ms.mean** <br>(gauge) | Retardo medio de descarga del escritor (ms)|
| **eventstore.es.writer.flush_size.max** <br>(gauge) | Tamaño máximo de descarga del escritor (tamaño)|
| **eventstore.es.writer.flush_delay_ms.max** <br>(gauge) | Retardo máximo de descarga del escritor (ms)|
| **eventstore.es.writer.queued_flush_messages** <br>(gauge) | Mensajes de descarga en cola del escritor|
| **eventstore.es.read_index.cached_record** <br>(gauge) | Registro en caché del índice de lectura|
| **eventstore.es.read_index.not_cached_record** <br>(gauge) | Registro no almacenado en caché del índice de lectura|
| **eventstore.es.read_index.cached_stream_info** <br>(gauge) | Información de flujo en caché del índice de lectura|
| **eventstore.es.read_index.not_cached_stream_info** <br>(gauge) | Información del flujo no almacenada en caché del índice de lectura|
| **eventstore.es.read_index.cached_trans_info** <br>(gauge) | Información de transacción en caché del índice de lectura|
| **eventstore.es.read_index.not_cached_trans_info** <br>(gauge) | Información de transacción no almacenada en caché del índice de lectura|
| **eventstore.is_leader** <br>(gauge) | El nodo del clúster es un líder|
| **eventstore.is_follower** <br>(gauge) | El nodo del clúster es un seguidor|
| **eventstore.is_readonlyreplica** <br>(gauge) | El nodo del clúster es una réplica de solo lectura|
| **eventstore.running_projections.none** <br>(gauge) | El nodo no ejecuta proyecciones|
| **eventstore.running_projections.system** <br>(gauge) | El nodo ejecuta proyecciones del sistema|
| **eventstore.running_projections.all** <br>(gauge) | El nodo ejecuta todo tipo de proyecciones|
| **eventstore.projection.core_processing_time** <br>(gauge) | Tiempo de procesamiento del núcleo de proyección|
| **eventstore.projection.version** <br>(gauge) | Versión de proyección|
| **eventstore.projection.epoch** <br>(gauge) | Época de proyección|
| **eventstore.projection.reads_in_progress** <br>(gauge) | Lecturas de proyección en curso|
| **eventstore.projection.writes_in_progress** <br>(gauge) | Escrituras de proyección en curso|
| **eventstore.projection.partitions_cached** <br>(gauge) | Particiones de proyección en caché|
| **eventstore.projection.running** <br>(gauge) | La proyección está en ejecución|
| **eventstore.projection.progress** <br>(gauge) | Progreso de la proyección|
| **eventstore.projection.events_processed_after_restart** <br>(gauge) | Eventos de proyección procesados tras el reinicio|
| **eventstore.projection.buffered_events** <br>(gauge) | Eventos de proyección en buffer|
| **eventstore.projection.write_pending_events_before_checkpoint** <br>(gauge) | Eventos de escritura de proyección pendientes antes del punto de control|
| **eventstore.projection.write_pending_events_after_checkpoint** <br>(gauge) | Eventos de escritura de proyección pendientes después del punto de control|
| **eventstore.subscription.live** <br>(gauge) | La suscripción está activa|
| **eventstore.subscription.average_items_per_second** <br>(gauge) | Media de elementos de suscripción por segundo|
| **eventstore.subscription.items_processed** <br>(gauge) | Elementos de suscripción procesados|
| **eventstore.subscription.last_processed_event_number** <br>(gauge) | Número del último evento de suscripción procesado|
| **eventstore.subscription.last_known_event_number** <br>(gauge) | Número del último evento de suscripción conocido|
| **eventstore.subscription.connections** <br>(gauge) | Conexiones de suscripción|
| **eventstore.subscription.messages_in_flight** <br>(gauge) | Mensajes de suscripción en vuelo|
| **eventstore.cluster.member_alive** <br>(gauge) | El miembro del clúster está activo|
| **eventstore.cluster.last_commit_position** <br>(gauge) | Última posición confirmada del miembro del clúster|
| **eventstore.cluster.writer_checkpoint** <br>(gauge) | Punto de control del escritor del miembro del clúster|
| **eventstore.cluster.chaser_checkpoint** <br>(gauge) | Punto de control del buscador del miembro del clúster|
| **eventstore.cluster.epoch_position** <br>(gauge) | Posición de época del miembro del clúster|
| **eventstore.cluster.epoch_number** <br>(gauge) | Número de época del miembro del clúster|
| **eventstore.cluster.node_priority** <br>(gauge) | Prioridad del nodo miembro del clúster|

### Eventos

El check de EventStore no incluye eventos.

### Checks de servicio

El check de EventStore no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [responsable](https://github.com/DataDog/integrations-extras/blob/master/eventstore/manifest.json) de esta integración.