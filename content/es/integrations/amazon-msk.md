---
aliases:
- /es/integrations/amazon_msk_cloud
app_id: amazon-msk
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
description: Simplifica la creación y ejecución de aplicaciones que procesan datos
  de transmisión.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-amazon-msk/
  tag: blog
  text: Monitoriza Amazon Managed Streaming para Apache Kafka con Datadog
media: []
title: Amazon MSK
---
## Información general

Amazon Managed Streaming para Apache Kafka (MSK) es un servicio totalmente gestionado que facilita la creación y ejecución de aplicaciones que utilizan Apache Kafka para procesar datos de streaming.

Esta integración utiliza un rastreador que recopila métricas de CloudWatch. Lee la página [Amazon MSK (Agent)](https://docs.datadoghq.com/integrations/amazon_msk/) para obtener información sobre la monitorización de MSK a través del Datadog Agent.

## Configuración

Habilita el rastreador de Amazon MSK para ver las métricas de MSK desde CloudWatch en Datadog.

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Kafka` está activado en la pestaña `Metric Collection`.

1. Instala la [integración de Amazon MSK](https://app.datadoghq.com/integrations/amazon-msk).

### Recopilación de logs

#### Activar logging

Configura Amazon MSK para enviar logs a un bucket de S3 o a CloudWatch.

**Notas**:

- Si vas a loguear en un bucket de S3, asegúrate de que `amazon_msk` está configurado como _Target prefix_ (Prefijo de destino).
- Si vas a loguear en un grupo de logs de CloudWatch, asegúrate de que tu nombre contiene la subcadena `msk`.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Datadog Forwarder Lambda](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de Amazon MSK en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.kafka.active_controller_count** <br>(gauge) | Solo debe estar activo un controlador por clúster en cada momento.|
| **aws.kafka.active_controller_count.maximum** <br>(gauge) | Solo debe estar activo un controlador por clúster en cada momento.|
| **aws.kafka.bytes_in_per_sec** <br>(rate) | El número de bytes por segundo recibidos de los clientes.<br>_Se muestra como byte_ |
| **aws.kafka.bytes_out_per_sec** <br>(rate) | El número de bytes por segundo enviados a los clientes.<br>_Se muestra como byte_ |
| **aws.kafka.cpu_idle** <br>(gauge) | El porcentaje de tiempo de inactividad de la CPU.<br>_Se muestra como porcentaje_ |
| **aws.kafka.cpu_system** <br>(gauge) | El porcentaje de CPU en el espacio del núcleo.<br>_Se muestra como porcentaje_ |
| **aws.kafka.cpu_user** <br>(gauge) | El porcentaje de CPU en el espacio de usuario.<br>_Se muestra como porcentaje_ |
| **aws.kafka.estimated_max_time_lag** <br>(gauge) | Tiempo estimado (en segundos) para drenar MaxOffsetLag.<br>_Se muestra como segundo_ |
| **aws.kafka.estimated_time_lag** <br>(gauge) | Tiempo estimado (en segundos) para drenar el desfase de la partición.<br>_Se muestra como segundo_ |
| **aws.kafka.fetch_consumer_local_time_ms_mean** <br>(gauge) | El tiempo medio en milisegundos que la solicitud del consumidor se procesa en el líder.<br>_Se muestra como milisegundo_ |
| **aws.kafka.fetch_consumer_request_queue_time_ms_mean** <br>(gauge) | El tiempo medio en milisegundos que la solicitud del consumidor espera en la cola de solicitudes.<br>_Se muestra como milisegundo_ |
| **aws.kafka.fetch_consumer_response_queue_time_ms_mean** <br>(gauge) | El tiempo medio en milisegundos que la solicitud del consumidor espera en la cola de respuesta.<br>_Se muestra como milisegundo_ |
| **aws.kafka.fetch_consumer_total_time_ms_mean** <br>(gauge) | El tiempo total medio en milisegundos que los consumidores emplean en obtener datos del agente.<br>_Se muestra como milisegundo_ |
| **aws.kafka.fetch_follower_local_time_ms_mean** <br>(gauge) | El tiempo medio en milisegundos que la solicitud del seguidor se procesa en el líder.<br>_Se muestra como milisegundo_ |
| **aws.kafka.fetch_follower_request_queue_time_ms_mean** <br>(gauge) | El tiempo medio en milisegundos que la solicitud del seguidor espera en la cola de solicitudes.<br>_Se muestra como milisegundo_ |
| **aws.kafka.fetch_follower_response_queue_time_ms_mean** <br>(gauge) | El tiempo medio en milisegundos que la solicitud de seguidor espera en la cola de respuesta.<br>_Se muestra como milisegundo_ |
| **aws.kafka.fetch_follower_response_send_time_ms_mean** <br>(gauge) | El tiempo medio en milisegundos para que el seguidor envíe una respuesta.<br>_Se muestra como milisegundo_ |
| **aws.kafka.fetch_follower_total_time_ms_mean** <br>(gauge) | El tiempo total medio en milisegundos que los seguidores emplean en obtener datos del agente.<br>_Se muestra como milisegundo_ |
| **aws.kafka.fetch_message_conversions_per_sec** <br>(rate) | Número de conversiones de mensajes fetch por segundo para el agente.|
| **aws.kafka.fetch_throttle_byte_rate** <br>(gauge) | El número de bytes acelerados por segundo.|
| **aws.kafka.fetch_throttle_queue_size** <br>(gauge) | Número de mensajes en la cola de aceleración.|
| **aws.kafka.fetch_throttle_time** <br>(gauge) | El tiempo medio de aceleración en milisegundos.<br>_Se muestra en milisegundos_ |
| **aws.kafka.global_partition_count** <br>(gauge) | Número total de particiones en todos los agentes del clúster.|
| **aws.kafka.global_partition_count.maximum** <br>(gauge) | Número máximo total de particiones en todos los agentes del clúster.|
| **aws.kafka.global_topic_count** <br>(gauge) | Número total de temas promediado por el número de agentes en el clúster.|
| **aws.kafka.global_topic_count.maximum** <br>(gauge) | Número total máximo de temas promediado por el número de agentes del clúster.|
| **aws.kafka.kafka_app_logs_disk_used** <br>(gauge) | El porcentaje de espacio en disco utilizado para los logs de aplicación.<br>_Se muestra como porcentaje_ |
| **aws.kafka.kafka_data_logs_disk_used** <br>(gauge) | El porcentaje de espacio en disco utilizado para los logs de datos.<br>_Se muestra como porcentaje_ |
| **aws.kafka.leader_count** <br>(gauge) | El número de réplicas del líder.|
| **aws.kafka.max_offset_lag** <br>(gauge) | El desfase máximo entre todas las particiones de un tema.|
| **aws.kafka.memory_buffered** <br>(gauge) | El tamaño en bytes de la memoria intermedia para el agente.<br>_Se muestra como byte_ |
| **aws.kafka.memory_cached** <br>(gauge) | El tamaño en bytes de la memoria caché del agente.<br>_Se muestra como byte_ |
| **aws.kafka.memory_free** <br>(gauge) | El tamaño en bytes de la memoria que está libre y disponible para el agente.<br>_Se muestra como byte_ |
| **aws.kafka.memory_used** <br>(gauge) | El tamaño en bytes de la memoria que está en uso para el agente.<br>_Se muestra como byte_ |
| **aws.kafka.messages_in_per_sec** <br>(rate) | Número de mensajes recibidos de clientes por segundo.|
| **aws.kafka.network_processor_avg_idle_percent** <br>(gauge) | El porcentaje medio de tiempo que los procesadores de red están inactivos.<br>_Se muestra como porcentaje_ |
| **aws.kafka.network_rx_dropped** <br>(count) | El número de paquetes recibidos abandonados.|
| **aws.kafka.network_rx_errors** <br>(count) | Número de errores de recepción de red del agente.|
| **aws.kafka.network_rx_packets** <br>(count) | Número de paquetes recibidos por el agente.|
| **aws.kafka.network_tx_dropped** <br>(count) | Número de paquetes de transmisión perdidos.|
| **aws.kafka.network_tx_errors** <br>(count) | El número de errores de transmisión de red para el agente.|
| **aws.kafka.network_tx_packets** <br>(count) | Número de paquetes transmitidos por el agente.|
| **aws.kafka.offline_partitions_count** <br>(gauge) | Número total de particiones que están desconectadas en el clúster.|
| **aws.kafka.offset_lag** <br>(gauge) | Retraso de los consumidores a nivel de partición en el número de desplazamientos.|
| **aws.kafka.partition_count** <br>(gauge) | El número de particiones para el agente.|
| **aws.kafka.produce_local_time_ms_mean** <br>(gauge) | El tiempo medio en milisegundos para que el seguidor envíe una respuesta.<br>_Se muestra como milisegundo_ |
| **aws.kafka.produce_message_conversions_per_sec** <br>(rate) | Número de conversiones de mensajes producidos por segundo para el agente.|
| **aws.kafka.produce_message_conversions_time_ms_mean** <br>(gauge) | Tiempo medio en milisegundos empleado en las conversiones de formato de los mensajes.<br>_Se muestra en milisegundos_ |
| **aws.kafka.produce_request_queue_time_ms_mean** <br>(gauge) | El tiempo medio en milisegundos que los mensajes de solicitud pasan en la cola.<br>_Se muestra como milisegundo_ |
| **aws.kafka.produce_response_queue_time_ms_mean** <br>(gauge) | El tiempo medio en milisegundos que los mensajes de respuesta pasan en la cola.<br>_Se muestra como milisegundo_ |
| **aws.kafka.produce_response_send_time_ms_mean** <br>(gauge) | El tiempo medio en milisegundos empleado en enviar mensajes de respuesta.<br>_Se muestra como milisegundo_ |
| **aws.kafka.produce_throttle_byte_rate** <br>(gauge) | El número de bytes acelerados por segundo.|
| **aws.kafka.produce_throttle_queue_size** <br>(gauge) | Número de mensajes en la cola de aceleración.|
| **aws.kafka.produce_throttle_time** <br>(gauge) | El tiempo medio de aceleración del producto en milisegundos.<br>_Se muestra en milisegundos_ |
| **aws.kafka.produce_total_time_ms_mean** <br>(gauge) | El tiempo medio de producción en milisegundos.<br>_Se muestra en milisegundos_ |
| **aws.kafka.replication_bytes_in_per_sec** <br>(rate) | El número de bytes por segundo recibidos de otros agentes.<br>_Se muestra como byte_ |
| **aws.kafka.replication_bytes_out_per_sec** <br>(rate) | El número de bytes por segundo enviados a otros agentes.<br>_Se muestra como byte_ |
| **aws.kafka.request_bytes_mean** <br>(gauge) | Número medio de bytes de solicitud para el agente.|
| **aws.kafka.request_exempt_from_throttle_time** <br>(gauge) | El tiempo medio empleado en los subprocesos de red y E/S del agente para procesar las solicitudes exentas de la aceleración.|
| **aws.kafka.request_handler_avg_idle_percent** <br>(gauge) | Porcentaje medio de tiempo en que los subprocesos del identificador de solicitud están inactivos.|
| **aws.kafka.request_throttle_queue_size** <br>(gauge) | Número de mensajes en la cola de aceleración.|
| **aws.kafka.request_throttle_time** <br>(gauge) | El tiempo medio de aceleración de la solicitud en milisegundos.<br>_Se muestra en milisegundos_ |
| **aws.kafka.request_time** <br>(gauge) | El tiempo medio empleado en los subprocesos de red y E/S del agente para procesar las solicitudes que están exentas de la aceleración.|
| **aws.kafka.root_disk_used** <br>(gauge) | El porcentaje del disco raíz utilizado por el agente.<br>_Se muestra como porcentaje_ |
| **aws.kafka.sum_offset_lag** <br>(gauge) | El desfase agregado para todas las particiones de un tema.|
| **aws.kafka.swap_free** <br>(gauge) | El tamaño en bytes de la memoria swap disponible para el agente.<br>_Se muestra como byte_ |
| **aws.kafka.swap_used** <br>(gauge) | El tamaño en bytes de la memoria swap que está en uso para el agente.<br>_Se muestra como byte_ |
| **aws.kafka.tcp_connections** <br>(gauge) | Muestra el número de segmentos TCP entrantes y salientes con el indicador SYN activado.|
| **aws.kafka.traffic_bytes** <br>(gauge) | Muestra el tráfico de red en bytes globales entre clientes (productores y consumidores) y agentes. No se informa del tráfico entre agentes.<br>_Se muestra como byte_ |
| **aws.kafka.under_replicated_partitions** <br>(gauge) | El número de particiones subreplicadas para el agente.|
| **aws.kafka.volume_queue_length** <br>(gauge) | Número de solicitudes de operaciones de lectura y escritura que esperan ser completadas en un periodo de tiempo especificado.|
| **aws.kafka.volume_read_bytes** <br>(gauge) | El número de bytes leídos en un periodo de tiempo especificado.<br>_Se muestra como byte_ |
| **aws.kafka.volume_read_ops** <br>(gauge) | Número de operaciones de lectura en un periodo de tiempo determinado.|
| **aws.kafka.volume_total_read_time** <br>(gauge) | El número total de segundos empleados por todas las operaciones de lectura que se completaron en un periodo de tiempo especificado.<br>_Se muestra como segundo_ |
| **aws.kafka.volume_total_write_time** <br>(gauge) | El número total de segundos empleados por todas las operaciones de escritura que se completaron en un periodo especificado.<br>_Se muestra como segundo_ |
| **aws.kafka.volume_write_bytes** <br>(gauge) | El número de bytes escritos en un periodo de tiempo especificado.<br>_Se muestra como byte_ |
| **aws.kafka.volume_write_ops** <br>(gauge) | Número de operaciones de escritura en un periodo determinado.|
| **aws.kafka.zoo_keeper_request_latency_ms_mean** <br>(gauge) | Latencia media en milisegundos para las solicitudes de ZooKeeper desde el agente.|
| **aws.kafka.bw_in_allowance_exceeded** <br>(count) | El número de paquetes formados debido a que el ancho de banda agregado de entrada excedió el máximo para el agente.|
| **aws.kafka.bw_out_allowance_exceeded** <br>(count) | El número de paquetes formados porque el ancho de banda agregado de salida excedió el máximo para el agente.|
| **aws.kafka.conn_track_allowance_exceeded** <br>(count) | El número de paquetes formados porque el seguimiento de la conexión superó el máximo para el agente. El seguimiento de la conexión está relacionado con los grupos de seguridad que realizan un seguimiento de cada conexión establecida para garantizar que los paquetes de retorno se entregan según lo esperado.|
| **aws.kafka.connection_close_rate** <br>(rate) | El número de conexiones cerradas por segundo por oyente. Este número se agrega por oyente y se filtra para los oyentes cliente.|
| **aws.kafka.connection_creation_rate** <br>(rate) | El número de nuevas conexiones establecidas por segundo por oyente. Este número se agrega por oyente y se filtra para los oyentes cliente.|
| **aws.kafka.consumer_response_send_time_ms_mean** <br>(gauge) | El tiempo medio en milisegundos para que el consumidor envíe una respuesta.<br>_Se muestra como milisegundo_ |
| **aws.kafka.cpu_credit_balance** <br>(gauge) | Esta métrica puede ayudarte a monitorizar el saldo de crédito de CPU en los agentes. |
| **aws.kafka.cpu_credit_usage** <br>(gauge) | Esta métrica puede ayudarte a monitorizar el uso de crédito de CPU en las instancias. Si el uso de la CPU se mantiene por encima del nivel de referencia del 20%, se puede agotar el saldo de crédito de la CPU, lo que puede tener un impacto negativo en el rendimiento del clúster. Puedes monitorizar y notificar esta métrica para tomar acciones correctivas.|
| **aws.kafka.memory_heap_after_gc** <br>(gauge) | Porcentaje de memoria de heap total disponible tras la recopilación de elementos no usado.<br>_Se muestra como porcentaje_ |
| **aws.kafka.pps_allowance_exceeded** <br>(count) | El número de paquetes formados porque el PPS bidireccional excedió el máximo para el agente.|
| **aws.kafka.under_minlsr_partition_count** <br>(gauge) | El número de particiones bajo minlsr para el agente|

### Eventos

El rastreador de Amazon MSK no incluye ningún evento.

### Checks de servicio

La integración de Amazon MSK no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}