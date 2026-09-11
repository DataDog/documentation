---
app_id: hivemq
categories:
- iot (internet de las cosas)
- recopilación de logs
- colas de mensajes
custom_kind: integración
description: Monitoriza tus clústeres HiveMQ.
further_reading:
- link: https://www.datadoghq.com/blog/hivemq-opentelemetry-monitor-iot-applications/
  tag: blog
  text: Uso de HiveMQ y OpenTelemetry para monitorizar aplicaciones IoT en Datadog
integration_version: 2.1.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: HiveMQ
---
## Información general

[HiveMQ](https://www.hivemq.com/hivemq/) es una plataforma de mensajería basada en MQTT diseñada para el movimiento rápido, eficiente y fiable
de datos hacia y desde dispositivos IoT conectados. Es un broker compatible con MQTT 3.1, 3.1.1 y 5.0.

## Configuración

### Instalación

El check de HiveMQ se incluye en el paquete de [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `hivemq.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del
   directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de HiveMQ.
   Consulta el [hivemq.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/hivemq/datadog_checks/hivemq/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   Este check tiene un límite de 350 métricas por instancia. El número de métricas devueltas se indica en [la página](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information).
   Puedes especificar las métricas que te interesan editando la configuración a continuación.
   Para saber cómo personalizar las métricas a recopilar, consulta la [documentación de checks de JMX](https://docs.datadoghq.com/integrations/java) para obtener instrucciones más detalladas.
   Si necesitas monitorizar más métricas, ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help).

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

##### Recopilación de logs

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade el siguiente bloque de configuración a tu archivo `hivemq.d/conf.yaml`. Cambia los valores de los parámetros `path` y `service` en función de tu entorno. Consulta el [hivemq.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/hivemq/datadog_checks/hivemq/data/conf.yaml.example) para ver todas las opciones de configuración disponibles.

   ```yaml
   logs:
     - type: file
       path: /var/log/hivemq.log
       source: hivemq
       service: <SERVICE>
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Containerized" %}}

#### En contenedores

##### Recopilación de métricas

Para entornos en contenedores, consulta la guía [Autodiscovery with JMX](https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent).

##### Recopilación de logs

La recopilación de logs está desactivada por defecto en Datadog Agent. Para activarla, consultz [recopilación de logs de Docker](https://docs.datadoghq.com/agent/docker/log/).

| Parámetro      | Valor                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "hivemq", "service": "<SERVICE_NAME>"}` |

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `hivemq` en la sección **JMXFetch**:

```text
========
JMXFetch
========
  Initialized checks
  ==================
    hivemq
      instance_name : hivemq-localhost-9999
      message :
      metric_count : 46
      service_check_count : 0
      status : OK
```

{{% /tab %}}

{{< /tabs >}}

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **hivemq.cache.payload_persistence.average_load_penalty** <br>(gauge) | Estadística de caché que captura la penalización de carga media de la caché de persistencia de carga útil.|
| **hivemq.cache.payload_persistence.eviction_count** <br>(gauge) | Estadística de caché que captura el recuento de desalojos de la caché de persistencia de carga útil|
| **hivemq.cache.payload_persistence.hit_count** <br>(gauge) | Estadística de caché que captura el recuento de aciertos de la caché de persistencia de carga útil<br>_Se muestra como acierto_ |
| **hivemq.cache.payload_persistence.hit_rate** <br>(gauge) | Estadística de caché que captura la tasa de aciertos de la caché de persistencia de carga útil.|
| **hivemq.cache.payload_persistence.load_count** <br>(gauge) | Estadística de caché que captura el recuento de carga de la caché de persistencia de carga útil.|
| **hivemq.cache.payload_persistence.load_exception_count** <br>(gauge) | Estadística de caché que captura el recuento de excepciones de carga de la caché de persistencia de carga útil.|
| **hivemq.cache.payload_persistence.load_exception_rate** <br>(gauge) | Estadística de caché que captura la tasa de excepciones de carga de la caché de persistencia de carga útil.|
| **hivemq.cache.payload_persistence.load_success_count** <br>(gauge) | Estadística de caché que captura el recuento de éxitos de carga de la caché de persistencia de carga útil.|
| **hivemq.cache.payload_persistence.miss_count** <br>(gauge) | Estadística de caché que captura el recuento de fallos de la caché de persistencia de carga útil|
| **hivemq.cache.payload_persistence.miss_rate** <br>(gauge) | Estadística de caché que captura la tasa de fallos de la caché de persistencia de carga útil.|
| **hivemq.cache.payload_persistence.request_count** <br>(gauge) | Estadística de caché que captura el recuento de solicitud de la caché de persistencia de carga útil.|
| **hivemq.cache.payload_persistence.total_load_time** <br>(gauge) | Estadística de caché que captura el tiempo de carga total de la caché de persistencia de carga útil.|
| **hivemq.cache.shared_subscription.average_load_penalty** <br>(gauge) | Estadística de caché que captura la penalización de carga media de la caché de suscripción compartida|
| **hivemq.cache.shared_subscription.eviction_count** <br>(gauge) | Estadística de caché que captura el recuento de desalojos de la caché de suscripción compartida|
| **hivemq.cache.shared_subscription.hit_count** <br>(gauge) | Estadística de caché que captura el recuento de aciertos de la caché de suscripción compartida|
| **hivemq.cache.shared_subscription.hit_rate** <br>(gauge) | Estadística de caché que captura la tasa de aciertos de la caché de suscripción compartida|
| **hivemq.cache.shared_subscription.load_count** <br>(gauge) | Estadística de caché que captura el recuento de carga de la caché de suscripción compartida|
| **hivemq.cache.shared_subscription.load_exception_count** <br>(gauge) | Estadística de caché que captura el recuento de excepciones de carga de la caché de suscripción compartida|
| **hivemq.cache.shared_subscription.load_exception_rate** <br>(gauge) | Estadística de caché que captura la tasa de excepciones de carga de la caché de suscripción compartida|
| **hivemq.cache.shared_subscription.load_success_count** <br>(gauge) | Estadística de caché que captura el recuento de éxitos de carga de la caché de suscripción compartida|
| **hivemq.cache.shared_subscription.miss_count** <br>(gauge) | Estadística de caché que captura el recuento de fallos de la caché de suscripción compartida|
| **hivemq.cache.shared_subscription.miss_rate** <br>(gauge) | Estadística de caché que captura la tasa de fallos de la caché de suscripción compartida|
| **hivemq.cache.shared_subscription.request_count** <br>(gauge) | Estadística de caché que captura el recuento de solicitudes de la caché de suscripción compartida|
| **hivemq.cache.shared_subscription.total_load_time** <br>(gauge) | Estadística de caché que captura el tiempo de carga total de la caché de suscripción compartida|
| **hivemq.cluster.name_request.retry.count** <br>(count) | Cuenta el número de reintentos hasta que se resuelve el nombre de un nodo a través de su dirección.|
| **hivemq.cpu_cores.licensed** <br>(gauge) | Contiene la cantidad máxima de núcleos de cpu permitidos por la licencia|
| **hivemq.cpu_cores.used** <br>(gauge) | Mantiene la cantidad actual de núcleos de cpu utilizados|
| **hivemq.extension.managed_executor.running** <br>(count) | Mide el recuento actual de trabajos en ejecución en el ManagedExtensionExecutor|
| **hivemq.extension.managed_executor.scheduled.overrun** <br>(count) | Mide el recuento actual de trabajos en el ManagedExtensionExecutor excedidos|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.50th_percentile** <br>(gauge) | Mide el porcentaje del periodo programado que han durado los trabajos de ManagedExtensionExecutorService|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.75th_percentile** <br>(gauge) | Mide el porcentaje del periodo programado que han durado los trabajos de ManagedExtensionExecutorService|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.95th_percentile** <br>(gauge) | Mide el porcentaje del periodo programado que han durado los trabajos de ManagedExtensionExecutorService|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.98th_percentile** <br>(gauge) | Mide el porcentaje del periodo programado que han durado los trabajos de ManagedExtensionExecutorService|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.999th_percentile** <br>(gauge) | Mide el porcentaje del periodo programado que han durado los trabajos de ManagedExtensionExecutorService|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.99th_percentile** <br>(gauge) | Mide el porcentaje del periodo programado que han durado los trabajos de ManagedExtensionExecutorService|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.count** <br>(count) | Mide el porcentaje del periodo programado que han durado los trabajos de ManagedExtensionExecutorService|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.max** <br>(gauge) | Mide el porcentaje del periodo programado que han durado los trabajos de ManagedExtensionExecutorService|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.mean** <br>(gauge) | Mide el porcentaje del periodo programado que han durado los trabajos de ManagedExtensionExecutorService|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.min** <br>(gauge) | Mide el porcentaje del periodo programado que han durado los trabajos de ManagedExtensionExecutorService|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.snapshot_size** <br>(gauge) | Mide el porcentaje del periodo programado que han durado los trabajos de ManagedExtensionExecutorService|
| **hivemq.extension.managed_executor.scheduled.percent_of_period.std_dev** <br>(gauge) | Mide el porcentaje del periodo programado que han durado los trabajos de ManagedExtensionExecutorService|
| **hivemq.extension.services.publish_service_publishes** <br>(count) | Cuenta la cantidad de mensajes de publicación enviados por el servicio de publicación.|
| **hivemq.extension.services.publish_service_publishes_to_client** <br>(count) | Cuenta la cantidad de mensajes de publicación enviados por el servicio de publicación a un cliente específico.|
| **hivemq.extension.services.rate_limit_exceeded.count** <br>(count) | Cuenta la cantidad de veces que se ha superado el límite de la tasa de servicio de extensión.|
| **hivemq.keep_alive.disconnect.count** <br>(count) | Cuenta cada conexión cerrada porque el cliente no envió el mensaje PINGREQ durante el intervalo keep-alive.|
| **hivemq.messages.dropped.count** <br>(count) | Cuenta todos los mensajes perdidos.|
| **hivemq.messages.dropped.internal_error.count** <br>(count) | Cuenta los mensajes PUBLISH que han sido descartados, debido a un error interno.|
| **hivemq.messages.dropped.message_too_large.count** <br>(count) | Cuenta los mensajes PUBLISH que se han descartado porque el tamaño del mensaje era demasiado grande para el cliente.|
| **hivemq.messages.dropped.mqtt_packet_too_large.count** <br>(count) | Cuenta los mensajes MQTT (excepto PUBLISH) que han sido descartados, porque el tamaño del mensaje era demasiado grande para el cliente.|
| **hivemq.messages.dropped.not_writable.count** <br>(count) | Cuenta los mensajes PUBLISH que han sido descartados, porque el socket para el cliente no era escribible (solo QoS 0).|
| **hivemq.messages.dropped.publish_inbound_intercepted.count** <br>(count) | Cuenta los mensajes PUBLISH que se han descartado porque un interceptor de entrada de publicación ha impedido la entrega posterior.|
| **hivemq.messages.dropped.qos_0_memory_exceeded.count** <br>(count) | Cuenta los mensajes PUBLISH que han sido descartados, porque se ha excedido el límite de memoria global para mensajes QoS 0.|
| **hivemq.messages.dropped.queue_full.count** <br>(count) | Cuenta los mensajes PUBLISH que se han descartado porque la cola de mensajes de un cliente de sesión persistente desconectado estaba llena.|
| **hivemq.messages.expired_messages** <br>(count) | Cuenta todos los mensajes caducados|
| **hivemq.messages.incoming.auth.count** <br>(count) | Cuenta cada mensaje MQTT AUTH entrante|
| **hivemq.messages.incoming.connect.count** <br>(count) | Cuenta cada mensaje MQTT CONNECT entrante|
| **hivemq.messages.incoming.connect.mqtt3.count** <br>(count) | Cuenta cada mensaje MQTT 3 CONNECT entrante|
| **hivemq.messages.incoming.connect.mqtt5.count** <br>(count) | Cuenta cada mensaje MQTT 5 CONNECT entrante|
| **hivemq.messages.incoming.disconnect.count** <br>(count) | Cuenta cada mensaje MQTT DISCONNECT entrante|
| **hivemq.messages.incoming.pingreq.count** <br>(count) | Cuenta cada mensaje MQTT PINGREQ entrante|
| **hivemq.messages.incoming.puback.count** <br>(count) | Cuenta cada mensaje MQTT PUBACK entrante|
| **hivemq.messages.incoming.pubcomp.count** <br>(count) | Cuenta cada mensaje MQTT PUBCOMP entrante|
| **hivemq.messages.incoming.publish.bytes.50th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.publish.bytes.75th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.publish.bytes.95th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.publish.bytes.98th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.publish.bytes.999th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.publish.bytes.99th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.publish.bytes.count** <br>(count) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.publish.bytes.max** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.publish.bytes.mean** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.publish.bytes.min** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.publish.bytes.snapshot_size** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.publish.bytes.std_dev** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.publish.count** <br>(count) | Cuenta cada mensaje MQTT PUBLISH entrante|
| **hivemq.messages.incoming.pubrec.count** <br>(count) | Cuenta cada mensaje MQTT PUBREC entrante|
| **hivemq.messages.incoming.pubrel.count** <br>(count) | Cuenta cada mensaje MQTT PUBREL entrante|
| **hivemq.messages.incoming.subscribe.count** <br>(count) | Cuenta cada mensaje MQTT SUBSCRIBE entrante|
| **hivemq.messages.incoming.total.bytes.50th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.total.bytes.75th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.total.bytes.95th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.total.bytes.98th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.total.bytes.999th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.total.bytes.99th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.total.bytes.count** <br>(count) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.total.bytes.max** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.total.bytes.mean** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.total.bytes.min** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.total.bytes.snapshot_size** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.total.bytes.std_dev** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT entrantes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.incoming.total.count** <br>(count) | Cuenta cada mensaje MQTT entrante|
| **hivemq.messages.incoming.unsubscribe.count** <br>(count) | Cuenta cada mensaje MQTT UNSUBSCRIBE entrante|
| **hivemq.messages.outgoing.auth.count** <br>(count) | Cuenta cada mensaje MQTT AUTH saliente|
| **hivemq.messages.outgoing.connack.count** <br>(count) | Cuenta cada mensaje MQTT CONNACK saliente|
| **hivemq.messages.outgoing.disconnect.count** <br>(count) | Cuenta cada mensaje MQTT DISCONNECT saliente|
| **hivemq.messages.outgoing.pingresp.count** <br>(count) | Cuenta cada mensaje MQTT PINGRESP saliente|
| **hivemq.messages.outgoing.puback.count** <br>(count) | Cuenta cada mensaje MQTT PUBACK saliente|
| **hivemq.messages.outgoing.pubcomp.count** <br>(count) | Cuenta cada mensaje MQTT PUBCOMP saliente|
| **hivemq.messages.outgoing.publish.bytes.50th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.publish.bytes.75th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.publish.bytes.95th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.publish.bytes.98th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.publish.bytes.999th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.publish.bytes.99th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.publish.bytes.count** <br>(count) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.publish.bytes.max** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.publish.bytes.mean** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.publish.bytes.min** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.publish.bytes.snapshot_size** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.publish.bytes.std_dev** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.publish.count** <br>(count) | Cuenta cada mensaje MQTT PUBLISH saliente|
| **hivemq.messages.outgoing.pubrec.count** <br>(count) | Cuenta cada mensaje MQTT PUBREC saliente|
| **hivemq.messages.outgoing.pubrel.count** <br>(count) | Cuenta cada mensaje MQTT PUBREL saliente|
| **hivemq.messages.outgoing.suback.count** <br>(count) | Cuenta cada mensaje MQTT SUBACK saliente|
| **hivemq.messages.outgoing.total.bytes.50th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.total.bytes.75th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.total.bytes.95th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.total.bytes.98th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.total.bytes.999th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.total.bytes.99th_percentile** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.total.bytes.count** <br>(count) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.total.bytes.max** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.total.bytes.mean** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.total.bytes.min** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.total.bytes.snapshot_size** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.total.bytes.std_dev** <br>(gauge) | Mide la distribución del tamaño de los mensajes MQTT salientes (incluidos los encabezados de los paquetes MQTT).|
| **hivemq.messages.outgoing.total.count** <br>(count) | Cuenta cada mensaje MQTT saliente|
| **hivemq.messages.outgoing.unsuback.count** <br>(count) | Cuenta cada mensaje MQTT UNSUBACK saliente|
| **hivemq.messages.pending.qos_0.count** <br>(gauge) | El número actual de mensajes qos 0 pendientes|
| **hivemq.messages.pending.total.count** <br>(gauge) | El número actual del total de mensajes pendientes|
| **hivemq.messages.queued.count** <br>(gauge) | Número actual de mensajes en cola|
| **hivemq.messages.retained.current** <br>(gauge) | La cantidad actual de mensajes retenidos|
| **hivemq.messages.retained.mean.50th_percentile** <br>(gauge) | Métricas sobre el tamaño medio de la carga útil de los mensajes retenidos en bytes.|
| **hivemq.messages.retained.mean.75th_percentile** <br>(gauge) | Métricas sobre el tamaño medio de la carga útil de los mensajes retenidos en bytes.|
| **hivemq.messages.retained.mean.95th_percentile** <br>(gauge) | Métricas sobre el tamaño medio de la carga útil de los mensajes retenidos en bytes.|
| **hivemq.messages.retained.mean.98th_percentile** <br>(gauge) | Métricas sobre el tamaño medio de la carga útil de los mensajes retenidos en bytes.|
| **hivemq.messages.retained.mean.999th_percentile** <br>(gauge) | Métricas sobre el tamaño medio de la carga útil de los mensajes retenidos en bytes.|
| **hivemq.messages.retained.mean.99th_percentile** <br>(gauge) | Métricas sobre el tamaño medio de la carga útil de los mensajes retenidos en bytes.|
| **hivemq.messages.retained.mean.count** <br>(count) | Métricas sobre el tamaño medio de la carga útil de los mensajes retenidos en bytes.|
| **hivemq.messages.retained.mean.max** <br>(gauge) | Métricas sobre el tamaño medio de la carga útil de los mensajes retenidos en bytes.|
| **hivemq.messages.retained.mean.mean** <br>(gauge) | Métricas sobre el tamaño medio de la carga útil de los mensajes retenidos en bytes.|
| **hivemq.messages.retained.mean.min** <br>(gauge) | Métricas sobre el tamaño medio de la carga útil de los mensajes retenidos en bytes.|
| **hivemq.messages.retained.mean.snapshot_size** <br>(gauge) | Métricas sobre el tamaño medio de la carga útil de los mensajes retenidos en bytes.|
| **hivemq.messages.retained.mean.std_dev** <br>(gauge) | Métricas sobre el tamaño medio de la carga útil de los mensajes retenidos en bytes.|
| **hivemq.messages.retained.pending.total.count** <br>(gauge) | El número actual del total de mensajes retenidos pendientes|
| **hivemq.messages.retained.queued.count** <br>(gauge) | El número actual de mensajes retenidos en cola|
| **hivemq.networking.bytes.read.current** <br>(gauge) | La cantidad actual (últimos 5 segundos) de bytes leídos|
| **hivemq.networking.bytes.read.total** <br>(gauge) | La cantidad total de bytes leídos|
| **hivemq.networking.bytes.write.current** <br>(gauge) | La cantidad actual (últimos 5 segundos) de bytes escritos|
| **hivemq.networking.bytes.write.total** <br>(gauge) | Cantidad total de bytes escritos|
| **hivemq.networking.connections.current** <br>(gauge) | Número total actual de conexiones MQTT activas|
| **hivemq.networking.connections.mean.50th_percentile** <br>(gauge) | Número total medio de conexiones MQTT activas|
| **hivemq.networking.connections.mean.75th_percentile** <br>(gauge) | Número total medio de conexiones MQTT activas|
| **hivemq.networking.connections.mean.95th_percentile** <br>(gauge) | Número total medio de conexiones MQTT activas|
| **hivemq.networking.connections.mean.98th_percentile** <br>(gauge) | Número total medio de conexiones MQTT activas|
| **hivemq.networking.connections.mean.999th_percentile** <br>(gauge) | Número total medio de conexiones MQTT activas|
| **hivemq.networking.connections.mean.99th_percentile** <br>(gauge) | Número total medio de conexiones MQTT activas|
| **hivemq.networking.connections.mean.count** <br>(count) | Número total medio de conexiones MQTT activas|
| **hivemq.networking.connections.mean.max** <br>(gauge) | Número total medio de conexiones MQTT activas|
| **hivemq.networking.connections.mean.mean** <br>(gauge) | Número total medio de conexiones MQTT activas|
| **hivemq.networking.connections.mean.min** <br>(gauge) | Número total medio de conexiones MQTT activas|
| **hivemq.networking.connections.mean.snapshot_size** <br>(gauge) | Número total medio de conexiones MQTT activas|
| **hivemq.networking.connections.mean.std_dev** <br>(gauge) | Número total medio de conexiones MQTT activas|
| **hivemq.networking.connections_closed.graceful.count** <br>(count) | Cuenta los clientes que se desconectaron después de enviar un mensaje DISCONNECT|
| **hivemq.networking.connections_closed.total.count** <br>(count) | Cuenta todos los clientes que se desconectaron de HiveMQ (= apagado ordenado + apagado forzado)|
| **hivemq.networking.connections_closed.ungraceful.count** <br>(count) | Cuenta los clientes que se desconectaron sin enviar un mensaje DISCONNECT|
| **hivemq.overload_protection.clients.average_credits** <br>(gauge) | Mantiene la cantidad media de créditos disponibles entre todos los clientes|
| **hivemq.overload_protection.clients.backpressure_active** <br>(gauge) | Contiene la cantidad actual de clientes a los que se aplica contrapresión mediante la protección contra sobrecarga.|
| **hivemq.overload_protection.clients.using_credits** <br>(gauge) | Mantiene la cantidad actual de clientes que tienen menos de la cantidad total de créditos|
| **hivemq.overload_protection.credits.per_tick** <br>(gauge) | Mantiene la cantidad actual de créditos que recibe un cliente por tick|
| **hivemq.overload_protection.level** <br>(gauge) | Mantiene el nivel actual de protección contra sobrecargas|
| **hivemq.payload_persistence.cleanup_executor.running** <br>(count) | Cuenta las tareas que se están ejecutando actualmente en el programador a cargo de la limpieza de la carga útil de persistencia|
| **hivemq.payload_persistence.cleanup_executor.scheduled.overrun** <br>(count) | Cuenta las tareas periódicas que se ejecutaron más tiempo del permitido en el programador encargado de la limpieza de la carga útil de persistencia.|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.50th_percentile** <br>(gauge) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizaron las tareas periódicas mientras ejecutaban la limpieza de la carga útil de persistencia.|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.75th_percentile** <br>(gauge) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizaron las tareas periódicas mientras ejecutaban la limpieza de la carga útil de persistencia.|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.95th_percentile** <br>(gauge) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizaron las tareas periódicas mientras ejecutaban la limpieza de la carga útil de persistencia.|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.98th_percentile** <br>(gauge) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizaron las tareas periódicas mientras ejecutaban la limpieza de la carga útil de persistencia.|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.999th_percentile** <br>(gauge) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizaron las tareas periódicas mientras ejecutaban la limpieza de la carga útil de persistencia.|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.99th_percentile** <br>(gauge) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizaron las tareas periódicas mientras ejecutaban la limpieza de la carga útil de persistencia.|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.count** <br>(count) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizaron las tareas periódicas mientras ejecutaban la limpieza de la carga útil de persistencia.|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.max** <br>(gauge) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizaron las tareas periódicas mientras ejecutaban la limpieza de la carga útil de persistencia.|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.mean** <br>(gauge) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizaron las tareas periódicas mientras ejecutaban la limpieza de la carga útil de persistencia.|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.min** <br>(gauge) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizaron las tareas periódicas mientras ejecutaban la limpieza de la carga útil de persistencia.|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.snapshot_size** <br>(gauge) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizaron las tareas periódicas mientras ejecutaban la limpieza de la carga útil de persistencia.|
| **hivemq.payload_persistence.cleanup_executor.scheduled.percent_of_period.std_dev** <br>(gauge) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizaron las tareas periódicas mientras ejecutaban la limpieza de la carga útil de persistencia.|
| **hivemq.persistence.executor.client_session.tasks** <br>(gauge) | Cantidad actual de tareas de E/S de disco que están en cola por la persistencia de la sesión de cliente.|
| **hivemq.persistence.executor.noempty_queues** <br>(gauge) | Cantidad actual de colas de tareas de escritor único que no están vacías|
| **hivemq.persistence.executor.outgoing_message_flow.tasks** <br>(gauge) | Cantidad actual de tareas de E/S de disco que están en cola por la persistencia del flujo de mensajes salientes.|
| **hivemq.persistence.executor.queue_misses** <br>(count) | Recuento actual de bucles que todos los subprocesos de escritor único han realizado sin ejecutar una tarea.|
| **hivemq.persistence.executor.queued_messages.tasks** <br>(gauge) | Cantidad actual de tareas de E/S de disco que están en cola por la persistencia de mensajes en cola.|
| **hivemq.persistence.executor.request_event_bus.tasks** <br>(gauge) | Cantidad actual de tareas en cola por el bus de eventos de solicitud|
| **hivemq.persistence.executor.retained_messages.tasks** <br>(gauge) | Cantidad actual de tareas de E/S de disco que están en cola por la persistencia de mensajes retenidos.|
| **hivemq.persistence.executor.running.threads** <br>(gauge) | Cantidad actual de subprocesos que están ejecutando tareas de E/S de disco|
| **hivemq.persistence.executor.subscription.tasks** <br>(gauge) | Cantidad actual de tareas de E/S de disco en cola por la persistencia de suscripción|
| **hivemq.persistence.executor.total.tasks** <br>(gauge) | Cantidad actual de tareas de E/S de disco en cola por todos los ejecutores de persistencia|
| **hivemq.persistence.payload_entries.count** <br>(gauge) | Contiene la cantidad actual de cargas útiles almacenadas en la persistencia de cargas útiles|
| **hivemq.persistence.removable_entries.count** <br>(gauge) | Contiene la cantidad actual de cargas útiles almacenadas en la persistencia de cargas útiles, que pueden eliminarse mediante la limpieza.|
| **hivemq.persistence_executor.running** <br>(count) | Cuenta las tareas que se están ejecutando actualmente en el ejecutor de persistencia|
| **hivemq.persistence_scheduled_executor.running** <br>(count) | Cuenta las tareas que se están ejecutando actualmente en el programador responsable de la persistencia|
| **hivemq.persistence_scheduled_executor.scheduled.overrun** <br>(count) | Cuenta las tareas periódicas que se han ejecutado más tiempo del permitido en el programador responsable de la persistencia.|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.50th_percentile** <br>(gauge) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizan las tareas periódicas en el programador responsable de la persistencia|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.75th_percentile** <br>(gauge) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizan las tareas periódicas en el programador responsable de la persistencia|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.95th_percentile** <br>(gauge) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizan las tareas periódicas en el programador responsable de la persistencia|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.98th_percentile** <br>(gauge) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizan las tareas periódicas en el programador responsable de la persistencia|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.999th_percentile** <br>(gauge) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizan las tareas periódicas en el programador responsable de la persistencia|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.99th_percentile** <br>(gauge) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizan las tareas periódicas en el programador responsable de la persistencia|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.count** <br>(count) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizan las tareas periódicas en el programador responsable de la persistencia|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.max** <br>(gauge) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizan las tareas periódicas en el programador responsable de la persistencia|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.mean** <br>(gauge) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizan las tareas periódicas en el programador responsable de la persistencia|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.min** <br>(gauge) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizan las tareas periódicas en el programador responsable de la persistencia|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.snapshot_size** <br>(gauge) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizan las tareas periódicas en el programador responsable de la persistencia|
| **hivemq.persistence_scheduled_executor.scheduled.percent_of_period.std_dev** <br>(gauge) | Métricas sobre cuánto porcentaje de su marco temporal permitido utilizan las tareas periódicas en el programador responsable de la persistencia|
| **hivemq.publish.without_matching_subscribers** <br>(count) | Cuenta la cantidad de mensajes de publicación recibidos, sin suscriptores coincidentes|
| **hivemq.qos_0_memory.exceeded.per_client** <br>(gauge) | Mantiene la cantidad actual de clientes que excedieron su memoria de mensajes QoS 0|
| **hivemq.qos_0_memory.max** <br>(gauge) | Contiene la cantidad máxima de bytes que los mensajes QoS 0 pueden utilizar en memoria|
| **hivemq.qos_0_memory.used** <br>(gauge) | Mantiene la cantidad actual de bytes que los mensajes QoS 0 utilizan en memoria|
| **hivemq.sessions.overall.current** <br>(gauge) | Mide el recuento actual de sesiones almacenadas. Estas sesiones incluyen todas las sesiones, incluidos los clientes en línea y fuera de línea|
| **hivemq.sessions.persistent.active** <br>(count) | Mide el recuento actual de sesiones persistentes activas (= clientes MQTT en línea que están conectados con cleanSession=false).|
| **hivemq.single_writer_executor.running** <br>(count) | Cuenta las tareas que se están ejecutando actualmente en el programador responsable de un solo escritor|
| **hivemq.subscriptions.overall.current** <br>(count) | Mide el recuento actual de suscripciones en el broker|
| **hivemq.system.max_file_descriptor** <br>(gauge) | Cantidad máxima permitida de descriptores de archivo vistos por la JVM|
| **hivemq.system.open_file_descriptor** <br>(gauge) | Cantidad de descriptores de archivo abiertos vistos por la JVM|
| **hivemq.system.os.file_descriptors.max** <br>(gauge) | Cantidad máxima permitida de descriptores de archivo|
| **hivemq.system.os.file_descriptors.open** <br>(gauge) | Cantidad de descriptores de archivo actualmente abiertos|
| **hivemq.system.os.global.memory.available** <br>(gauge) | La cantidad de memoria física disponible actualmente, en bytes|
| **hivemq.system.os.global.memory.swap.total** <br>(gauge) | El tamaño actual de los archivos de paginación/swap, en bytes.|
| **hivemq.system.os.global.memory.swap.used** <br>(gauge) | La memoria actual asignada a los archivos de paginación/swap, en bytes.|
| **hivemq.system.os.global.memory.total** <br>(gauge) | La cantidad de memoria física real, en bytes|
| **hivemq.system.os.global.uptime** <br>(gauge) | Tiempo de actividad del sistema operativo en segundos|
| **hivemq.system.os.process.disk.bytes_read** <br>(gauge) | Número de bytes que el proceso de HiveMQ ha leído del disco|
| **hivemq.system.os.process.disk.bytes_written** <br>(gauge) | Número de bytes que el proceso de HiveMQ ha escrito en el disco|
| **hivemq.system.os.process.memory.resident_set_size** <br>(gauge) | Tamaño del conjunto residente (RSS) en bytes. Se utiliza para mostrar cuánta memoria está asignada al proceso de HiveMQ y está en la RAM. No incluye la memoria que se intercambia. Incluye la memoria de las bibliotecas compartidas siempre que las páginas de esas bibliotecas estén realmente en memoria. Incluye toda la memoria de stack tecnológico y heap.|
| **hivemq.system.os.process.memory.virtual** <br>(gauge) | Tamaño de memoria virtual (VSZ) en bytes. Incluye toda la memoria a la que puede acceder el proceso de HiveMQ, incluida la memoria intercambiada y la memoria de las bibliotecas compartidas.|
| **hivemq.system.os.process.threads.count** <br>(gauge) | Número de subprocesos del proceso de HiveMQ visto por el SO|
| **hivemq.system.os.process.time_spent.kernel** <br>(gauge) | Cantidad de milisegundos que el proceso de HiveMQ se ha ejecutado en modo kernel/sistema visto por el sistema operativo.|
| **hivemq.system.os.process.time_spent.user** <br>(gauge) | Cantidad de milisegundos que el proceso de HiveMQ se ha ejecutado en modo usuario visto por el sistema operativo.|
| **hivemq.system.physical_memory.free** <br>(gauge) | Cantidad actual de memoria física libre en bytes|
| **hivemq.system.physical_memory.total** <br>(gauge) | Cantidad total de memoria física (bytes) disponible|
| **hivemq.system.process_cpu.load** <br>(gauge) | Uso actual de la CPU para el proceso de JVM (0.0 inactivo - 1.0 uso total de la CPU)|
| **hivemq.system.process_cpu.time** <br>(gauge) | Cantidad total de tiempo de CPU que el proceso de JVM ha utilizado hasta este punto (en nanosegundos)|
| **hivemq.system.swap_space.free** <br>(gauge) | Cantidad actual de espacio swap libre en bytes|
| **hivemq.system.swap_space.total** <br>(gauge) | Cantidad total de espacio swap disponible en bytes|
| **hivemq.system.system_cpu.load** <br>(gauge) | Uso actual de la CPU para todo el sistema (0.0 inactivo - 1.0 uso total de la CPU)|
| **hivemq.topic_alias.count.total** <br>(gauge) | Contiene la cantidad actual de alias de temas|
| **hivemq.topic_alias.memory.usage** <br>(gauge) | Contiene la cantidad actual de bytes que los alias temáticos utilizan en memoria|

### Checks de servicio

**hivemq.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse a HiveMQ, `WARNING` si no se recopilan métricas y `OK` en caso contrario.

_Estados: ok, critical, warning_

### Eventos

HiveMQ no incluye ningún evento.

### Checks de servicio

Consulta [service_checks.json](https://github.com/DataDog/integrations-core/blob/master/hivemq/assets/service_checks.json) para obtener una lista de los checks de servicio proporcionados por esta integración.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Utiliza HiveMQ y OpenTelemetry para monitorizar aplicaciones IoT en Datadog](https://www.datadoghq.com/blog/hivemq-opentelemetry-monitor-iot-applications/)