---
app_id: kafka
categories:
- log collection
- message queues
custom_kind: integración
description: Recopilar métricas para productores y consumidores, replicación, retardo
  máximo y more.
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics
  tag: blog
  text: Monitorización de las métricas de rendimiento de Kafka
- link: https://www.datadoghq.com/blog/collecting-kafka-performance-metrics
  tag: blog
  text: Recopilación de métricas de rendimiento de Kafka
- link: https://www.datadoghq.com/blog/monitor-kafka-with-datadog
  tag: blog
  text: Monitorización de Kafka con Datadog
- link: https://www.datadoghq.com/knowledge-center/apache-kafka/
  tag: otros
  text: ¿Qué es Apache Kafka? Cómo funciona y casos de uso
integration_version: 4.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Broker Kafka
---
![Dashboard de Kafka](https://raw.githubusercontent.com/DataDog/integrations-core/master/kafka/images/kafka_dashboard.png)

## Información general

Visualiza las métricas del agente de Kafka recopiladas para obtener una vista de 360 grados del estado y el rendimiento de tus clústeres de Kafka en tiempo real. Con esta integración, puedes recopilar métricas y logs de tu despliegue de Kafka para visualizar la telemetría y alertar sobre el rendimiento de su stack tecnológico de Kafka.

**Nota**:

- Este check tiene un límite de 350 métricas por instancia. El número de métricas devueltas se indica en la salida de estado del Agent. Especifica las métricas que te interesen editando la configuración siguiente. Para obtener instrucciones más detalladas sobre la personalización de las métricas a recopilar, consulta la [documentación de Checks de JMX](https://docs.datadoghq.com/integrations/java/).
- Este ejemplo adjunto de configuración de una integración sólo funciona para Kafka v0.8.2 o posterior.
  Si utilizas una versión anterior, consulta los [archivos de muestras lanzadas del Agent v5.2.x](https://raw.githubusercontent.com/DataDog/dd-agent/5.2.1/conf.d/kafka.yaml.example).
- Para recopilar las métricas de los consumidores de Kafka, consulta [check de kafka_consumer](https://docs.datadoghq.com/integrations/kafka/?tab=host#kafka-consumer-integration).

Considera [Data Streams Monitoring](https://docs.datadoghq.com/data_streams/) para mejorar tu integración de Kafka. Esta solución permite la visualización de pipeline y el rastreo de retrasos, que te ayudará a identificar y resolver cuellos de botella.

## Configuración

### Instalación

El check de Kafka del Agent está incluido en el paquete del [Datadog Agent ](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus nodos Kafka.

El check recopila métricas de JMX con [JMXFetch](https://github.com/DataDog/jmxfetch). Se necesita una JVM en cada nodo de kafka para que el Agent pueda ejecutar JMXFetch. Para ello se puede utilizar la misma JVM que utiliza Kafka.

**Nota**: El check de Kafka no puede utilizarse con Managed Streaming para Apache Kafka (Amazon MSK). Utiliza en su lugar la [integración con Amazon MSK](https://docs.datadoghq.com/integrations/amazon_msk/#pagetitle).

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `kafka.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory). Los nombres de los beans de Kafka dependen de la versión exacta de Kafka que estés ejecutando. Utiliza el [archivo de configuración de ejemplo](https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example) que viene empaquetado con el Agent como base ya que es la configuración más actualizada. **Nota**: la versión del Agent del ejemplo puede ser para una versión del Agent más reciente que la que tienes instalada.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. Kafka utiliza el registrador `log4j` por defecto. Para activar el registro en un archivo y personalizar el formato, edita el archivo `log4j.properties`:

   ```text
     # Set root logger level to INFO and its only appender to R
     log4j.rootLogger=INFO, R
     log4j.appender.R.File=/var/log/kafka/server.log
     log4j.appender.R.layout=org.apache.log4j.PatternLayout
     log4j.appender.R.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
   ```

1. Por defecto, el pipeline de integración de Datadog admite los siguientes patrones de conversión:

   ```text
     %d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
     %d [%t] %-5p %c - %m%n
     %r [%t] %p %c %x - %m%n
     [%d] %p %m (%c)%n
   ```

   Clona y edita el [pipeline de integración](https://docs.datadoghq.com/logs/processing/#integration-pipelines) si tienes un formato diferente.

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade el siguiente bloque de configuración a tu archivo `kafka.d/conf.yaml`. Cambia los valores de los parámetros `path` y `service` en función de tu entorno. Consulta el [ejemplo de kafka.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   ```yaml
   logs:
     - type: file
       path: /var/log/kafka/server.log
       source: kafka
       service: myapp
       #To handle multi line that starts with yyyy-mm-dd use the following pattern
       #log_processing_rules:
       #  - type: multi_line
       #    name: log_start_with_date
       #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Containerized" %}}

#### En contenedores

##### Recopilación de métricas

Para entornos en contenedores, consulta la guía [Autodiscovery con JMX](https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

| Parámetro      | Valor                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "kafka", "service": "<SERVICE_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `kafka` en la sección **JMXFetch**:

```text
========
JMXFetch
========
  Initialized checks
  ==================
    kafka
      instance_name : kafka-localhost-9999
      message :
      metric_count : 46
      service_check_count : 0
      status : OK
```

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **kafka.consumer.bytes_consumed** <br>(medidor) | El número medio de bytes consumidos por segundo para un tema específico.<br>_Mostrado como byte_ |
| **kafka.consumer.bytes_in** <br>(medidor) | Tasa de bytes del consumidor.<br>_Mostrado como byte_ |
| **kafka.consumer.delayed_requests** <br>(medidor) | Número de solicitudes de consumidores con retraso.<br>_Mostrado como solicitud_ |
| **kafka.consumer.expires_per_second** <br>(medidor) | Tasa de retraso en el vencimiento de las solicitudes de los consumidores.<br>_Mostrado como expulsión_ |
| **kafka.consumer.fetch_rate** <br>(medidor) | La velocidad mínima a la que el consumidor envía solicitudes de búsqueda a un agente.<br>_Mostrado como solicitud_ |
| **kafka.consumer.fetch_size_avg** <br>(medidor) | El número medio de bytes obtenidos por solicitud para un tema específico.<br>_Mostrado como byte_ |
| **kafka.consumer.fetch_size_max** <br>(medidor) | El número máximo de bytes obtenidos por solicitud para un tema específico.<br>_Mostrado como byte_ |
| **kafka.consumer.kafka_commits** <br>(medidor) | Tasa de confirmaciones desplazadas a Kafka.<br>_Mostrado como escritura_ |
| **kafka.consumer.max_lag** <br>(medidor) | Retraso máximo del consumidor.<br>_Mostrado como desplazamiento_ |
| **kafka.consumer.messages_in** <br>(medidor) | Tasa de consumo de mensajes de los consumidores.<br>_Mostrado como mensaje_ |
| **kafka.consumer.records_consumed** <br>(medidor) | El número medio de registros consumidos por segundo para un tema específico.<br>_Mostrado como registro_ |
| **kafka.consumer.records_per_request_avg** <br>(medidor) | El número medio de registros en cada solicitud para un tema específico.<br>_Mostrado como registro_ |
| **kafka.consumer.zookeeper_commits** <br>(medidor) | Tasa de confirmaciones desplazadas a ZooKeeper.<br>_Mostrado como escritura_ |
| **kafka.expires_sec** <br>(medidor) | Tasa de retraso en el vencimiento de la solicitud del productor.<br>_Mostrado como expulsión_ |
| **kafka.follower.expires_per_second** <br>(medidor) | Tasa de vencimiento de solicitudes sobre seguidores.<br>_Mostrado como expulsión_ |
| **kafka.log.flush_rate.rate** <br>(medidor) | Tasa de descarga de logs.<br>_Mostrado como descarga_ |
| **kafka.messages_in.rate** <br>(medidor) | Tasa de mensajes entrantes.<br>_Mostrado como mensaje_ |
| **kafka.net.bytes_in.rate** <br>(medidor) | Tasa de bytes entrantes.<br>_Mostrado como byte_ |
| **kafka.net.bytes_out** <br>(medidor) | Total de bytes salientes.<br>_Mostrado como byte_ |
| **kafka.net.bytes_out.rate** <br>(medidor) | Tasa de bytes salientes.<br>_Mostrado como byte_ |
| **kafka.net.bytes_rejected.rate** <br>(medidor) | Tasa de bytes rechazados.<br>_Mostrado como byte_ |
| **kafka.net.processor.avg.idle.pct.rate** <br>(medidor) | Fracción media de tiempo en que los hilos del procesador de red están inactivos.<br>_Mostrado como fracción_ |
| **kafka.producer.available_buffer_bytes** <br>(medidor) | La cantidad total de memoria del búfer que no se está utilizando (ya sea sin asignar o en la lista libre)<br>_Mostrado como byte_ |
| **kafka.producer.batch_size_avg** <br>(medidor) | El número medio de bytes enviados por partición por solicitud.<br>_Mostrado como byte_ |
| **kafka.producer.batch_size_max** <br>(medidor) | El número máximo de bytes enviados por partición por solicitud.<br>_Mostrado como byte_ |
| **kafka.producer.buffer_bytes_total** <br>(medidor) | La cantidad máxima de memoria del búfer que el cliente puede utilizar (tanto si se utiliza actualmente como si no).<br>_Mostrado como byte_ |
| **kafka.producer.bufferpool_wait_ratio** <br>(medidor) | La fracción de tiempo que un appender espera para la asignación de espacio.|
| **kafka.producer.bufferpool_wait_time** <br>(medidor) | La fracción de tiempo que un appender espera para la asignación de espacio.|
| **kafka.producer.bufferpool_wait_time_ns_total** <br>(medidor) | El tiempo total en nanosegundos que un appender espera para la asignación de espacio.<br>_Mostrado como nanosegundo_ |
| **kafka.producer.bytes_out** <br>(medidor) | Tasa de salida de bytes del productor.<br>_Mostrado como byte_ |
| **kafka.producer.compression_rate** <br>(medidor) | La tasa de compresión media de los lotes de registros para un tema<br>_Mostrado como fracción_ |
| **kafka.producer.compression_rate_avg** <br>(tasa) | La tasa de compresión media de los lotes de registros.<br>_Mostrado como fracción_ |
| **kafka.producer.delayed_requests** <br>(medidor) | Número de solicitudes de productores retrasadas.<br>_Mostrado como solicitud_ |
| **kafka.producer.expires_per_seconds** <br>(medidor) | Tasa de vencimiento de las solicitudes de los productores.<br>_Mostrado como expulsión_ |
| **kafka.producer.io_wait** <br>(medidor) | Tiempo de espera de E/S del productor.<br>_Mostrado como nanosegundo_ |
| **kafka.producer.message_rate** <br>(medidor) | Tasa de mensajes del productor.<br>_Mostrado como mensaje_ |
| **kafka.producer.metadata_age** <br>(medidor) | La antigüedad en segundos de los metadatos del productor actual que se están utilizando.<br>_Mostrado como segundo_ |
| **kafka.producer.record_error_rate** <br>(medidor) | Número medio por segundo de envíos de registros con errores para un tema<br>_Mostrado como error_ |
| **kafka.producer.record_queue_time_avg** <br>(medidor) | El tiempo medio en ms que los lotes de registros pasan en el acumulador de registros.<br>_Mostrado como milisegundo_ |
| **kafka.producer.record_queue_time_max** <br>(medidor) | El tiempo máximo en ms que los lotes de registros pasan en el acumulador de registros.<br>_Mostrado como milisegundo_ |
| **kafka.producer.record_retry_rate** <br>(medidor) | Número medio por segundo de reintentos de envío de registros para un tema<br>_Mostrado como registro_ |
| **kafka.producer.record_send_rate** <br>(medidor) | El número medio de registros enviados por segundo para un tema<br>_Mostrado como registro_ |
| **kafka.producer.record_size_avg** <br>(medidor) | El tamaño medio del registro.<br>_Mostrado como byte_ |
| **kafka.producer.record_size_max** <br>(medidor) | El tamaño máximo de registro.<br>_Mostrado como byte_ |
| **kafka.producer.records_per_request** <br>(medidor) | El número medio de registros enviados por segundo.<br>_Mostrado como registro_ |
| **kafka.producer.request_latency_avg** <br>(medidor) | Latencia media de la solicitud del productor.<br>_Mostrado en milisegundos_ |
| **kafka.producer.request_latency_max** <br>(medidor) | La latencia máxima de la solicitud en ms.<br>_Mostrado como milisegundo_ |
| **kafka.producer.request_rate** <br>(medidor) | Número de solicitudes de productores por segundo.<br>_Mostrado como solicitud_ |
| **kafka.producer.requests_in_flight** <br>(medidor) | Número actual de solicitudes en espera de respuesta.<br>_Mostrado como solicitud_ |
| **kafka.producer.response_rate** <br>(medidor) | Número de respuestas del productor por segundo.<br>_Mostrado como respuesta_ |
| **kafka.producer.throttle_time_avg** <br>(medidor) | El tiempo medio en ms que una solicitud fue limitada por un agente.<br>_Mostrado como milisegundo_ |
| **kafka.producer.throttle_time_max** <br>(medidor) | El tiempo máximo en ms que una solicitud fue limitada por un agente.<br>_Mostrado como milisegundo_ |
| **kafka.producer.waiting_threads** <br>(medidor) | El número de hilos de usuario bloqueados en espera de memoria intermedia para poner en cola sus registros.<br>_Mostrado como hilo_ |
| **kafka.replication.active_controller_count** <br>(medidor) | Número de controladores activos en el clúster.<br>_Mostrado como nodo_ |
| **kafka.replication.isr_expands.rate** <br>(medidor) | Tasa de réplicas que se unen a la mezcla ISR.<br>_Mostrado como nodo_ |
| **kafka.replication.isr_shrinks.rate** <br>(medidor) | Tasa de réplicas que abandonan la mezcla ISR.<br>_Mostrado como nodo_ |
| **kafka.replication.leader_count** <br>(medidor) | Número de líderes en este agente.<br>_Mostrado como nodo_ |
| **kafka.replication.leader_elections.rate** <br>(medidor) | Tasa de elección del líder.<br>_Mostrado como evento_ |
| **kafka.replication.max_lag** <br>(medidor) | Máximo retraso en mensajes entre las réplicas seguidora y líder.<br>_Mostrado como desplazamiento_ |
| **kafka.replication.offline_partitions_count** <br>(medidor) | Número de particiones que no tienen un líder activo.|
| **kafka.replication.partition_count** <br>(medidor) | Número de particiones en todos los temas del clúster.|
| **kafka.replication.unclean_leader_elections.rate** <br>(medidor) | Tasa de elección del líder sucio.<br>_Mostrado como evento_ |
| **kafka.replication.under_min_isr_partition_count** <br>(medidor) | Número de particiones ISR por debajo del mínimo.|
| **kafka.replication.under_replicated_partitions** <br>(medidor) | Número de particiones bajo replicación.|
| **kafka.request.channel.queue.size** <br>(medidor) | Número de solicitudes en cola.<br>_Mostrado como solicitud_ |
| **kafka.request.fetch.failed.rate** <br>(medidor) | Tasa de fallos en las solicitudes de búsqueda de los clientes.<br>_Mostrado como solicitud_ |
| **kafka.request.fetch_consumer.rate** <br>(medidor) | Tasa de solicitudes de consumidores buscadas.<br>_Mostrado como solicitud_ |
| **kafka.request.fetch_consumer.time.99percentile** <br>(medidor) | Tiempo total en ms para servir la solicitud especificada.<br>_Mostrado como milisegundo_ |
| **kafka.request.fetch_consumer.time.avg** <br>(medidor) | Tiempo total en ms para servir la solicitud especificada.<br>_Mostrado como milisegundo_ |
| **kafka.request.fetch_follower.rate** <br>(medidor) | Tasa de solicitudes de seguidores buscadas.<br>_Mostrado como solicitud_ |
| **kafka.request.fetch_follower.time.99percentile** <br>(medidor) | Tiempo total en ms para servir la solicitud especificada.<br>_Mostrado como milisegundo_ |
| **kafka.request.fetch_follower.time.avg** <br>(medidor) | Tiempo total en ms para servir la solicitud especificada.<br>_Mostrado como milisegundo_ |
| **kafka.request.fetch_request_purgatory.size** <br>(medidor) | Número de solicitudes en espera en el purgatorio de productores.<br>_Mostrado como solicitud_ |
| **kafka.request.handler.avg.idle.pct.rate** <br>(medidor) | Fracción media de tiempo en que los hilos del gestor de solicitudes están inactivos.<br>_Mostrado como fracción_ |
| **kafka.request.metadata.time.99percentile** <br>(medidor) | Tiempo de solicitudes de metadatos para el percentil 99.<br>_Mostrado en milisegundos_ |
| **kafka.request.metadata.time.avg** <br>(medidor) | Tiempo medio de solicitud de metadatos.<br>_Mostrado en milisegundos_ |
| **kafka.request.offsets.time.99percentile** <br>(medidor) | Tiempo de las solicitudes de desplazamiento para el percentil 99.<br>_Mostrado en milisegundos_ |
| **kafka.request.offsets.time.avg** <br>(medidor) | Tiempo medio para una solicitud de desplazamiento.<br>_Mostrado en milisegundos_ |
| **kafka.request.produce.failed.rate** <br>(medidor) | Tasa de solicitudes de producción fallidas.<br>_Mostrado como solicitud_ |
| **kafka.request.produce.rate** <br>(medidor) | Producir tasa de solicitudes.<br>_Mostrado como solicitud_ |
| **kafka.request.produce.time.99percentile** <br>(medidor) | Tiempo para producir solicitudes para el percentil 99.<br>_Mostrado en milisegundos_ |
| **kafka.request.produce.time.avg** <br>(medidor) | Tiempo medio de una solicitud de producción.<br>_Mostrado en milisegundos_ |
| **kafka.request.producer_request_purgatory.size** <br>(medidor) | Número de solicitudes en espera en el purgatorio de productores<br>_Mostrado como solicitud_ |
| **kafka.request.update_metadata.time.99percentile** <br>(medidor) | Tiempo de actualización de las solicitudes de metadatos para el percentil 99.<br>_Mostrado en milisegundos_ |
| **kafka.request.update_metadata.time.avg** <br>(medidor) | Tiempo medio para que una solicitud actualice los metadatos.<br>_Mostrado en milisegundos_ |
| **kafka.server.socket.connection_count** <br>(medidor) | Número de conexiones abiertas actualmente para el agente.<br>_Mostrado como conexión_ |
| **kafka.session.fetch.count** <br>(medidor) | Número de sesiones de búsqueda.|
| **kafka.session.fetch.eviction** <br>(medidor) | Tasa de expulsión de la sesión de búsqueda.<br>_Mostrado como evento_ |
| **kafka.session.zookeeper.disconnect.rate** <br>(medidor) | Tasa de desconexión de clientes de Zookeeper.<br>_Mostrado como evento_ |
| **kafka.session.zookeeper.expire.rate** <br>(medidor) | Tasa de vencimiento de la sesión del cliente de Zookeeper.<br>_Mostrado como evento_ |
| **kafka.session.zookeeper.readonly.rate** <br>(medidor) | Tasa de sólo lectura del cliente de Zookeeper.<br>_Mostrado como evento_ |
| **kafka.session.zookeeper.sync.rate** <br>(medidor) | Tasa de sincronización del cliente de Zookeeper.<br>_Mostrado como evento_ |
| **kafka.topic.messages_in.rate** <br>(medidor) | Tasa de mensajes entrantes por tema<br>_Mostrado como mensaje_ |
| **kafka.topic.net.bytes_in.rate** <br>(medidor) | Tasa de bytes entrantes por tema.<br>_Mostrado como byte_ |
| **kafka.topic.net.bytes_out.rate** <br>(medidor) | Tasa de bytes salientes por tema.<br>_Mostrado como byte_ |
| **kafka.topic.net.bytes_rejected.rate** <br>(medidor) | Tasa de bytes rechazados por tema.<br>_Mostrado como byte_ |

### Eventos

El check de Kafka no incluye eventos.

### Checks de servicio

**kafka.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse y recopilar métricas de la instancia de Kafka monitorizada, `WARNING` si no se recopilan métricas y `OK` en caso contrario.

_Estados: ok, crítico, advertencia_

## Solucionar problemas

- [Resolución de problemas y profundización en Kafka](https://docs.datadoghq.com/integrations/faq/troubleshooting-and-deep-dive-for-kafka/)
- [El Agent no ha podido recuperar la ruta interna de RMIServer](https://docs.datadoghq.com/integrations/guide/agent-failed-to-retrieve-rmiserver-stub/)

## Referencias adicionales

- [Monitorización de las métricas de rendimiento de Kafka](https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics)
- [Recopilación de métricas de rendimiento de Kafka](https://www.datadoghq.com/blog/collecting-kafka-performance-metrics)
- [Monitorización de Kafka con Datadog](https://www.datadoghq.com/blog/monitor-kafka-with-datadog)
- [Información general de Kafka en el centro de conocimiento](https://www.datadoghq.com/knowledge-center/apache-kafka/)