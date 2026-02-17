---
app_id: lightbendrp
categories:
- cloud
custom_kind: integración
description: Monitorizar tus aplicaciones Lightbend Reactive Platform con Datadog
  integration.
media: []
title: LightbendRP
---
{{< img src="integrations/lightbendrp/dashboard_lightbendrp.png" alt="Dashboard de Lightbend Reactive Platform" popup="true">}}

## Información general

Obtén métricas de tu [aplicación Lightbend Reactive Platform](https://www.lightbend.com/platform) en tiempo real para:

- Visualizar las métricas de rendimiento de tus actores.
- Realizar un seguimiento de los eventos imprevistos (excepciones, mensajes no gestionados, mensajes fallidos, etc.).
- Obtener una visión de las características remotas de tu aplicación.
- Profundizar en las métricas del despachador para ajustar el rendimiento de la aplicación.

## Configuración

### Instalación

Esta integración utiliza Lightbend Monitoring, que requiere una [suscripción](https://www.lightbend.com/platform/subscription).

La forma más sencilla de integrar Lightbend Monitoring con Datadog es utilizar el [complemento Datadog](https://developer.lightbend.com/docs/monitoring/2.3.x/plugins/datadog/datadog.html).

Por defecto, la monitorización de Lightbend envía todas las métricas a través del cable, pero es posible limitar los campos informados mediante configuración (consulta el siguiente ejemplo).

El complemento Datadog utiliza una configuración predeterminada que puede modificarse:

```text
cinnamon.datadog {
  statsd {
    host = "192.168.0.1"
    port = 8888
    frequency = 60s
  }

  report {
    histogram = ["min", "max", "p98", "p99", "p999"]
  }
}
```

Los valores de configuración explicados:

- `cinnamon.datadog.statsd.host`: Dirección IP de tu instancia DogStatsD.
- `cinnamon.datadog.statsd.port`: Número de puerto de tu instancia DogStatsD.
- `cinnamon.datadog.statsd.frequency`: Frecuencia con la que se envían los datos desde Cinnamon a la instancia DogStatsD.
- `cinnamon.datadog.report.histogram`Instrucción para filtrar los datos de histograma enviados a DogStatsD. En el ejemplo anterior solo se envían `max` y `p99`.

Para obtener más detalles sobre la configuración, consulta la [documentación de Lightbend Monitoring](https://developer.lightbend.com/docs/monitoring/2.3.x/home.html).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **lightbend.actors.running_actors** <br>(gauge) | Número total de actores en ejecución en esta clase o grupo de actores.|
| **lightbend.actors.mailbox_size.max** <br>(gauge) | Número máximo de mensajes en el buzón de un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.mailbox_size.mean** <br>(gauge) | Número medio de mensajes en el buzón de un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.mailbox_size.median** <br>(gauge) | Número promedio de mensajes en el buzón de un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.mailbox_size.min** <br>(gauge) | Número mínimo de mensajes en el buzón de un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.mailbox_size.p75** <br>(gauge) | Percentil 75 del número de mensajes en el buzón de un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.mailbox_size.p95** <br>(gauge) | Percentil 95 del número de mensajes en el buzón de un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.mailbox_size.p98** <br>(gauge) | Percentil 98 del número de mensajes en el buzón de un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.mailbox_size.p99** <br>(gauge) | Percentil 99 del número de mensajes en el buzón de un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.mailbox_size.p999** <br>(gauge) | Percentil 99,9 del número de mensajes en el buzón de un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.mailbox_size.stddev** <br>(gauge) | Desviación estándar del número de mensajes en el buzón de un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.mailbox_time.max** <br>(gauge) | Tiempo máximo que los mensajes permanecen en el buzón de un actor.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.mailbox_time.mean** <br>(gauge) | Tiempo medio que los mensajes permanecen en el buzón de un actor.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.mailbox_time.median** <br>(gauge) | Tiempo promedio que los mensajes permanecen en el buzón de un actor.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.mailbox_time.min** <br>(gauge) | Tiempo mínimo que los mensajes permanecen en el buzón de un actor.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.mailbox_time.p75** <br>(gauge) | Tiempo del percentil 75 que los mensajes permanecen en el buzón de un actor.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.mailbox_time.p95** <br>(gauge) | Tiempo del percentil 95 que los mensajes permanecen en el buzón de un actor.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.mailbox_time.p98** <br>(gauge) | Tiempo del percentil 98 que los mensajes permanecen en el buzón de un actor.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.mailbox_time.p99** <br>(gauge) | Tiempo del percentil 99 que los mensajes permanecen en el buzón de un actor.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.mailbox_time.p999** <br>(gauge) | Tiempo del percentil 99,9 que los mensajes permanecen en el buzón de un actor.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.mailbox_time.stddev** <br>(gauge) | Desviación estándar del tiempo que los mensajes permanecen en el buzón de un actor.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.processed_messages.mean_rate** <br>(gauge) | Índice medio de mensajes procesados por un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.processed_messages.min1_rate** <br>(gauge) | Índice de 1 minuto de mensajes procesados por un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.processed_messages.min15_rate** <br>(gauge) | Índice de 15 minutos de mensajes procesados por un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.processed_messages.min5_rate** <br>(gauge) | Índice de 5 minutos de mensajes procesados por un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.processed_messages.samples** <br>(gauge) | Número total de mensajes procesados por un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.processing_time.max** <br>(gauge) | Tiempo máximo de procesamiento de los mensajes de los actores.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.processing_time.mean** <br>(gauge) | Tiempo medio de procesamiento de los mensajes de los actores.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.processing_time.median** <br>(gauge) | Tiempo promedio de procesamiento de los mensajes de los actores.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.processing_time.min** <br>(gauge) | Tiempo mínimo de procesamiento de los mensajes de los actores.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.processing_time.p75** <br>(gauge) | Tiempo del percentil 75 de procesamiento de los mensajes de los actores.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.processing_time.p95** <br>(gauge) | Tiempo del percentil 95 de procesamiento de los mensajes de los actores.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.processing_time.p98** <br>(gauge) | Tiempo del percentil 98 de procesamiento de los mensajes de los actores.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.processing_time.p99** <br>(gauge) | Tiempo del percentil 99 de procesamiento de los mensajes de los actores.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.processing_time.p999** <br>(gauge) | Tiempo del percentil 99,9 de procesamiento de los mensajes de los actores.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.processing_time.stddev** <br>(gauge) | Desviación estándar del tiempo de procesamiento de los mensajes de los actores.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.sent_messages.mean_rate** <br>(gauge) | Índice medio de mensajes enviados por un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.sent_messages.min1_rate** <br>(gauge) | Índice de 1 minuto de mensajes enviados por un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.sent_messages.min15_rate** <br>(gauge) | Índice de 15 minutos de mensajes enviados por un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.sent_messages.min5_rate** <br>(gauge) | Índice de 5 minutos de mensajes enviados por un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.sent_messages.samples** <br>(gauge) | Número total de mensajes enviados por un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.stash_size.max** <br>(gauge) | Número máximo de mensajes en el stash de un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.stash_size.mean** <br>(gauge) | Número medio de mensajes en el stash de un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.stash_size.median** <br>(gauge) | Número promedio de mensajes en el stash de un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.stash_size.min** <br>(gauge) | Número mínimo de mensajes en el stash de un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.stash_size.p75** <br>(gauge) | Número del percentil 75 de mensajes en el stash de un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.stash_size.p95** <br>(gauge) | Número del percentil 95 de mensajes en el stash de un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.stash_size.p98** <br>(gauge) | Número del percentil 98 de mensajes en el stash de un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.stash_size.p99** <br>(gauge) | Número del percentil 99 de mensajes en el stash de un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.stash_size.p999** <br>(gauge) | Número del percentil 99,9 de mensajes en el stash de un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.stash_size.stddev** <br>(gauge) | Desviación estándar del número de mensajes en el stash de un actor.<br>_Se muestra como mensaje_ |
| **lightbend.actors.actor_failure.mean_rate** <br>(gauge) | Índice medio de fallos de los actores.<br>_Se muestra como error_ |
| **lightbend.actors.actor_failure.min1_rate** <br>(gauge) | Índice de 1 minuto de fallos de actores.<br>_Se muestra como error_ |
| **lightbend.actors.actor_failure.min15_rate** <br>(gauge) | Índice de 15 minutos de fallos de actores.<br>_Se muestra como error_ |
| **lightbend.actors.actor_failure.min5_rate** <br>(gauge) | Índice de 5 minutos de fallos de actores.<br>_Se muestra como error_ |
| **lightbend.actors.actor_failure.samples** <br>(gauge) | Número total de fallos de actores.<br>_Se muestra como error_ |
| **lightbend.actors.dead_letter.mean_rate** <br>(gauge) | Índice medio de colas de mensajes no entregados de actores.<br>_Se muestra como evento_ |
| **lightbend.actors.dead_letter.min1_rate** <br>(gauge) | Índice de 1 minuto de colas de mensajes no entregados de actores.<br>_Se muestra como evento_ |
| **lightbend.actors.dead_letter.min15_rate** <br>(gauge) | Índice de 15 minutos de colas de mensajes no entregados de actores.<br>_Se muestra como evento_ |
| **lightbend.actors.dead_letter.min5_rate** <br>(gauge) | Índice de 5 minutos de colas de mensajes no entregados de actores.<br>_Se muestra como evento_ |
| **lightbend.actors.dead_letter.samples** <br>(gauge) | Número total de colas de mensajes no entregados de actores.<br>_Se muestra como evento_ |
| **lightbend.actors.unhandled_message.mean_rate** <br>(gauge) | Índice medio de mensajes de actor no gestionados.<br>_Se muestra como evento_ |
| **lightbend.actors.unhandled_message.min1_rate** <br>(gauge) | Índice de 1 minuto de mensajes de actor no gestionados.<br>_Se muestra como evento_ |
| **lightbend.actors.unhandled_message.min15_rate** <br>(gauge) | Índice de 15 minutos de mensajes de actor no gestionados.<br>_Se muestra como evento_ |
| **lightbend.actors.unhandled_message.min5_rate** <br>(gauge) | Índice de 5 minutos de mensajes de actor no gestionados.<br>_Se muestra como evento_ |
| **lightbend.actors.unhandled_message.samples** <br>(gauge) | Número total de mensajes de actor no gestionados.<br>_Se muestra como evento_ |
| **lightbend.actors.log_error.mean_rate** <br>(gauge) | Índice medio de errores de log de actores.<br>_Se muestra como error_ |
| **lightbend.actors.log_error.min1_rate** <br>(gauge) | Índice de 1 minuto de errores de log de actores.<br>_Se muestra como error_ |
| **lightbend.actors.log_error.min15_rate** <br>(gauge) | Índice de 15 minutos de errores de log de actores.<br>_Se muestra como error_ |
| **lightbend.actors.log_error.min5_rate** <br>(gauge) | Índice de 5 minutos de errores de log de actores.<br>_Se muestra como error_ |
| **lightbend.actors.log_error.samples** <br>(gauge) | Número total de errores de log de actores.<br>_Se muestra como error_ |
| **lightbend.actors.log_warning.mean_rate** <br>(gauge) | Índice medio de advertencias de log de actores.<br>_Se muestra como evento_ |
| **lightbend.actors.log_warning.min1_rate** <br>(gauge) | Índice de 1 minuto de advertencias de log de actores.<br>_Se muestra como evento_ |
| **lightbend.actors.log_warning.min15_rate** <br>(gauge) | Índice de 15 minutos de advertencias de log de actores.<br>_Se muestra como evento_ |
| **lightbend.actors.log_warning.min5_rate** <br>(gauge) | Índice de 5 minutos de advertencias de log de actores.<br>_Se muestra como evento_ |
| **lightbend.actors.log_warning.samples** <br>(gauge) | Número total de advertencias de log de actores.<br>_Se muestra como evento_ |
| **lightbend.actors.mailbox_size_limit.mean_rate** <br>(gauge) | Índice medio de eventos de límite de umbral del tamaño de los buzones de actores.<br>_Se muestra como evento_ |
| **lightbend.actors.mailbox_size_limit.min1_rate** <br>(gauge) | Índice de 1 minuto de eventos de límite de umbral del tamaño de los buzones de actores.<br>_Se muestra como evento_ |
| **lightbend.actors.mailbox_size_limit.min15_rate** <br>(gauge) | Índice de 15 minutos de eventos de límite de umbral del tamaño de los buzones de actores.<br>_Se muestra como evento_ |
| **lightbend.actors.mailbox_size_limit.min5_rate** <br>(gauge) | Índice de 5 minutos de eventos de límite de umbral del tamaño de los buzones de actores.<br>_Se muestra como evento_ |
| **lightbend.actors.mailbox_size_limit.samples** <br>(gauge) | Número total de eventos de límite de umbral del tamaño de los buzones de actores.<br>_Se muestra como evento_ |
| **lightbend.actors.mailbox_time_limit.mean_rate** <br>(gauge) | Índice medio de eventos de límite de umbral del tiempo en buzones de actores.<br>_Se muestra como evento_ |
| **lightbend.actors.mailbox_time_limit.min1_rate** <br>(gauge) | Índice de 1 minuto de eventos de límite de umbral del tiempo en buzones de actores.<br>_Se muestra como evento_ |
| **lightbend.actors.mailbox_time_limit.min15_rate** <br>(gauge) | Índice de 15 minutos de eventos de límite de umbral del tiempo en buzones de actores.<br>_Se muestra como evento_ |
| **lightbend.actors.mailbox_time_limit.min5_rate** <br>(gauge) | Índice de 5 minutos de eventos de límite de umbral del tiempo en buzones de actores.<br>_Se muestra como evento_ |
| **lightbend.actors.mailbox_time_limit.samples** <br>(gauge) | Número total de eventos de límite de umbral del tiempo en buzones de actores.<br>_Se muestra como evento_ |
| **lightbend.actors.processing_time_limit.mean_rate** <br>(gauge) | Índice medio de eventos de límite de umbral del tiempo de procesamiento de mensajes de actores.<br>_Se muestra como mensaje_ |
| **lightbend.actors.processing_time_limit.min1_rate** <br>(gauge) | Índice de 1 minuto de eventos de límite de umbral del tiempo de procesamiento de mensajes de actores.<br>_Se muestra como mensaje_ |
| **lightbend.actors.processing_time_limit.min15_rate** <br>(gauge) | Índice de 15 minutos de eventos de límite de umbral del tiempo de procesamiento de mensajes de actores.<br>_Se muestra como mensaje_ |
| **lightbend.actors.processing_time_limit.min5_rate** <br>(gauge) | Índice de 5 minutos de eventos de límite de umbral del tiempo de procesamiento de mensajes de actores.<br>_Se muestra como mensaje_ |
| **lightbend.actors.processing_time_limit.samples** <br>(gauge) | Número total de eventos de límite de umbral del tiempo de procesamiento de mensajes de actores.<br>_Se muestra como mensaje_ |
| **lightbend.actors.stash_size_limit.mean_rate** <br>(gauge) | Índice medio de eventos de límite de umbral del tamaño de stash de actores.<br>_Se muestra como mensaje_ |
| **lightbend.actors.stash_size_limit.min1_rate** <br>(gauge) | Índice de 1 minuto de eventos de límite de umbral del tamaño de stash de actores.<br>_Se muestra como mensaje_ |
| **lightbend.actors.stash_size_limit.min15_rate** <br>(gauge) | Índice de 15 minutos de eventos de límite de umbral del tamaño de stash de actores.<br>_Se muestra como mensaje_ |
| **lightbend.actors.stash_size_limit.min5_rate** <br>(gauge) | Índice de 5 minutos de eventos de límite de umbral del tamaño de stash de actores.<br>_Se muestra como mensaje_ |
| **lightbend.actors.stash_size_limit.samples** <br>(gauge) | Número total de eventos de límite de umbral del tamaño de stash de actores.<br>_Se muestra como mensaje_ |
| **lightbend.dispatchers.processing** <br>(gauge) | Número actual de tareas que está procesando un despachador.<br>_Se muestra como tarea_ |
| **lightbend.dispatchers.processing_time.max** <br>(gauge) | Tiempo máximo de procesamiento de tareas en un despachador.<br>_Se muestra como nanosegundo_ |
| **lightbend.dispatchers.processing_time.mean** <br>(gauge) | Tiempo medio de procesamiento de tareas en un despachador.<br>_Se muestra como nanosegundo_. |
| **lightbend.dispatchers.processing_time.median** <br>(gauge) | Tiempo promedio de procesamiento de tareas en un despachador.<br>_Se muestra como nanosegundo_. |
| **lightbend.dispatchers.processing_time.min** <br>(gauge) | Tiempo mínimo de procesamiento de tareas en un despachador.<br>_Se muestra como nanosegundo_ |
| **lightbend.dispatchers.processing_time.p75** <br>(gauge) | Tiempo del percentil 75 de procesamiento de tareas en un despachador.<br>_Se muestra como nanosegundo_ |
| **lightbend.dispatchers.processing_time.p95** <br>(gauge) | Tiempo del percentil 95 de procesamiento de tareas en un despachador.<br>_Se muestra como nanosegundo_ |
| **lightbend.dispatchers.processing_time.p98** <br>(gauge) | Tiempo del percentil 98 de procesamiento de tareas en un despachador.<br>_Se muestra como nanosegundo_ |
| **lightbend.dispatchers.processing_time.p99** <br>(gauge) | Tiempo del percentil 99 de procesamiento de tareas en un despachador.<br>_Se muestra como nanosegundo_ |
| **lightbend.dispatchers.processing_time.p999** <br>(gauge) | Tiempo del percentil 99,9 de procesamiento de tareas en un despachador.<br>_Se muestra como nanosegundo_ |
| **lightbend.dispatchers.processing_time.stddev** <br>(gauge) | Desviación estándar del tiempo de procesamiento de tareas en un despachador.<br>_Se muestra como nanosegundo_ |
| **lightbend.dispatchers.queue_size** <br>(gauge) | Número actual de tareas en cola a la espera de ser procesadas por un despachador.<br>_Se muestra como tarea_ |
| **lightbend.dispatchers.queue_time.max** <br>(gauge) | Tiempo máximo en cola de tareas a la espera de ser procesadas por un despachador.<br>_Se muestra como nanosegundo_ |
| **lightbend.dispatchers.queue_time.mean** <br>(gauge) | Tiempo medio en cola de tareas a la espera de ser procesadas por un despachador.<br>_Se muestra como nanosegundo_ |
| **lightbend.dispatchers.queue_time.median** <br>(gauge) | Tiempo promedio en cola de tareas a la espera de ser procesadas por un despachador.<br>_Se muestra como nanosegundo_ |
| **lightbend.dispatchers.queue_time.min** <br>(gauge) | Tiempo mínimo en cola de tareas a la espera de ser procesadas por un despachador.<br>_Se muestra como nanosegundo_ |
| **lightbend.dispatchers.queue_time.p75** <br>(gauge) | Tiempo de cola del percentil 75 de tareas a la espera de ser procesadas por un despachador.<br>_Se muestra como nanosegundo_ |
| **lightbend.dispatchers.queue_time.p95** <br>(gauge) | Tiempo de cola del percentil 95 de tareas a la espera de ser procesadas por un despachador.<br>_Se muestra como nanosegundo_ |
| **lightbend.dispatchers.queue_time.p98** <br>(gauge) | Tiempo de cola del percentil 98 de tareas a la espera de ser procesadas por un despachador.<br>_Se muestra como nanosegundo_ |
| **lightbend.dispatchers.queue_time.p99** <br>(gauge) | Tiempo de cola del percentil 99 de tareas a la espera de ser procesadas por un despachador.<br>_Se muestra como nanosegundo_ |
| **lightbend.dispatchers.queue_time.p999** <br>(gauge) | Tiempo de cola del percentil 99,9 de tareas a la espera de ser procesadas por un despachador.<br>_Se muestra como nanosegundo_ |
| **lightbend.dispatchers.queue_time.stddev** <br>(gauge) | Desviación estándar del tiempo de cola de tareas a la espera de ser procesadas por un despachador.<br>_Se muestra como nanosegundo_ |
| **lightbend.dispatchers.parallelism** <br>(gauge) | Configuración de paralelismo para un grupo de subprocesos fork/join.|
| **lightbend.dispatchers.pool_size** <br>(gauge) | Tamaño actual de un grupo de subprocesos.|
| **lightbend.dispatchers.active_threads** <br>(gauge) | Estimación del número de subprocesos activos en un grupo de subprocesos.<br>_Se muestra como subproceso_ |
| **lightbend.dispatchers.running_threads** <br>(gauge) | Estimación del número de subprocesos en ejecución (no bloqueados) en un grupo de subprocesos fork/join.<br>_Se muestra como subproceso_ |
| **lightbend.dispatchers.queued_tasks** <br>(gauge) | Estimación del número de tareas en cola en un grupo de subprocesos fork/join.<br>_Se muestra como tarea_ |
| **lightbend.actors.remote_sent_messages.mean_rate** <br>(gauge) | Índice medio de mensajes remotos enviados.<br>_Se muestra como mensaje_ |
| **lightbend.actors.remote_sent_messages.min1_rate** <br>(gauge) | Índice de 1 minuto de mensajes remotos enviados.<br>_Se muestra como mensaje_ |
| **lightbend.actors.remote_sent_messages.min15_rate** <br>(gauge) | Índice de 15 minutos de mensajes remotos enviados.<br>_Se muestra como mensaje_ |
| **lightbend.actors.remote_sent_messages.min5_rate** <br>(gauge) | Índice de 5 minutos de mensajes remotos enviados.<br>_Se muestra como mensaje_ |
| **lightbend.actors.remote_sent_messages.samples** <br>(gauge) | Número total de mensajes remotos enviados.<br>_Se muestra como mensaje_ |
| **lightbend.actors.remote_received_messages.mean_rate** <br>(gauge) | Índice medio de mensajes remotos recibidos.<br>_Se muestra como mensaje_ |
| **lightbend.actors.remote_received_messages.min1_rate** <br>(gauge) | Índice de 1 minuto de mensajes remotos recibidos.<br>_Se muestra como mensaje_ |
| **lightbend.actors.remote_received_messages.min15_rate** <br>(gauge) | Índice de 15 minutos de mensajes remotos recibidos.<br>_Se muestra como mensaje_ |
| **lightbend.actors.remote_received_messages.min5_rate** <br>(gauge) | Índice de 5 minutos de mensajes remotos recibidos.<br>_Se muestra como mensaje_ |
| **lightbend.actors.remote_received_messages.samples** <br>(gauge) | Número total de mensajes remotos recibidos.<br>_Se muestra como mensaje_ |
| **lightbend.actors.remote_sent_message_size.max** <br>(gauge) | Tamaño máximo de los mensajes remotos enviados.<br>_Se muestra como byte_ |
| **lightbend.actors.remote_sent_message_size.mean** <br>(gauge) | Tamaño medio de los mensajes remotos enviados.<br>_Se muestra como byte_ |
| **lightbend.actors.remote_sent_message_size.median** <br>(gauge) | Tamaño promedio de los mensajes remotos enviados.<br>_Se muestra como byte_ |
| **lightbend.actors.remote_sent_message_size.min** <br>(gauge) | Tamaño mínimo de los mensajes remotos enviados.<br>_Se muestra como byte_ |
| **lightbend.actors.remote_sent_message_size.p75** <br>(gauge) | Tamaño del percentil 75 de los mensajes remotos enviados.<br>_Se muestra como byte_ |
| **lightbend.actors.remote_sent_message_size.p95** <br>(gauge) | Tamaño del percentil 95 de los mensajes remotos enviados.<br>_Mostrado como byte_ |
| **lightbend.actors.remote_sent_message_size.p98** <br>(gauge) | Tamaño del percentil 98 de los mensajes remotos enviados.<br>_Se muestra como byte_ |
| **lightbend.actors.remote_sent_message_size.p99** <br>(gauge) | Tamaño del percentil 99 de los mensajes remotos enviados.<br>_Se muestra como byte_ |
| **lightbend.actors.remote_sent_message_size.p999** <br>(gauge) | Tamaño del percentil 99,9 de los mensajes remotos enviados.<br>_Se muestra como byte_ |
| **lightbend.actors.remote_sent_message_size.stddev** <br>(gauge) | Desviación estándar del tamaño de los mensajes remotos enviados.<br>_Se muestra como byte_ |
| **lightbend.actors.remote_received_message_size.max** <br>(gauge) | Tamaño máximo de los mensajes remotos recibidos.<br>_Se muestra como byte_ |
| **lightbend.actors.remote_received_message_size.mean** <br>(gauge) | Tamaño medio de los mensajes remotos recibidos.<br>_Se muestra como byte_ |
| **lightbend.actors.remote_received_message_size.median** <br>(gauge) | Tamaño promedio de los mensajes remotos recibidos.<br>_Se muestra como byte_ |
| **lightbend.actors.remote_received_message_size.min** <br>(gauge) | Tamaño mínimo de los mensajes remotos recibidos.<br>_Se muestra como byte_ |
| **lightbend.actors.remote_received_message_size.p75** <br>(gauge) | Tamaño del percentil 75 de los mensajes remotos recibidos.<br>_Se muestra como byte_ |
| **lightbend.actors.remote_received_message_size.p95** <br>(gauge) | Tamaño del percentil 95 de los mensajes remotos recibidos.<br>_Se muestra como byte_ |
| **lightbend.actors.remote_received_message_size.p98** <br>(gauge) | Tamaño del percentil 98 de los mensajes remotos recibidos.<br>_Se muestra como byte_ |
| **lightbend.actors.remote_received_message_size.p99** <br>(gauge) | Tamaño del percentil 99 de los mensajes remotos recibidos.<br>_Se muestra como byte_ |
| **lightbend.actors.remote_received_message_size.p999** <br>(gauge) | Tamaño del percentil 99,9 de los mensajes remotos recibidos.<br>_Se muestra como byte_ |
| **lightbend.actors.remote_received_message_size.stddev** <br>(gauge) | Desviación estándar del tamaño de los mensajes remotos recibidos.<br>_Se muestra como byte_ |
| **lightbend.actors.remote_serialization_time.max** <br>(gauge) | Tiempo máximo de serialización de mensajes remotos.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.remote_serialization_time.mean** <br>(gauge) | Tiempo medio de serialización de mensajes remotos.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.remote_serialization_time.median** <br>(gauge) | Tiempo promedio de serialización de mensajes remotos.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.remote_serialization_time.min** <br>(gauge) | Tiempo mínimo de serialización de mensajes remotos.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.remote_serialization_time.p75** <br>(gauge) | Tiempo del percentil 75 de serialización de mensajes remotos.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.remote_serialization_time.p95** <br>(gauge) | Tiempo del percentil 95 de serialización de mensajes remotos.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.remote_serialization_time.p98** <br>(gauge) | Tiempo del percentil 98 de serialización de mensajes remotos.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.remote_serialization_time.p99** <br>(gauge) | Tiempo del percentil 99 de serialización de mensajes remotos.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.remote_serialization_time.p999** <br>(gauge) | Tiempo del percentil 99,9 de serialización de mensajes remotos.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.remote_serialization_time.stddev** <br>(gauge) | Desviación estándar del tiempo de serialización de mensajes remotos.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.remote_deserialization_time.max** <br>(gauge) | Tiempo máximo de deserialización de mensajes remotos.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.remote_deserialization_time.mean** <br>(gauge) | Tiempo medio de deserialización de mensajes remotos.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.remote_deserialization_time.median** <br>(gauge) | Tiempo promedio de deserialización de mensajes remotos.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.remote_deserialization_time.min** <br>(gauge) | Tiempo mínimo de deserialización de mensajes remotos.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.remote_deserialization_time.p75** <br>(gauge) | Tiempo del percentil 75 de deserialización de mensajes remotos.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.remote_deserialization_time.p95** <br>(gauge) | Tiempo del percentil 95 de deserialización de mensajes remotos.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.remote_deserialization_time.p98** <br>(gauge) | Tiempo del percentil 98 de deserialización de mensajes remotos.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.remote_deserialization_time.p99** <br>(gauge) | Tiempo del percentil 99 de deserialización de mensajes remotos.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.remote_deserialization_time.p999** <br>(gauge) | Tiempo del percentil 99,9 de deserialización de mensajes remotos.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.remote_deserialization_time.stddev** <br>(gauge) | Desviación estándar del tiempo de deserialización de mensajes remotos.<br>_Se muestra como nanosegundo_ |
| **lightbend.actors.remote_large_message_sent.mean_rate** <br>(gauge) | Índice medio de eventos de límite de umbral de grandes mensajes remotos enviados.<br>_Se muestra como evento_ |
| **lightbend.actors.remote_large_message_sent.min1_rate** <br>(gauge) | Índice de 1 minuto de eventos de límite de umbral de grandes mensajes remotos enviados.<br>_Se muestra como evento_ |
| **lightbend.actors.remote_large_message_sent.min15_rate** <br>(gauge) | Índice de 15 minutos de eventos de límite de umbral de grandes mensajes remotos enviados.<br>_Se muestra como evento_ |
| **lightbend.actors.remote_large_message_sent.min5_rate** <br>(gauge) | Índice de 5 minutos de eventos de límite de umbral de grandes mensajes remotos enviados.<br>_Se muestra como evento_ |
| **lightbend.actors.remote_large_message_sent.samples** <br>(gauge) | Número total de eventos de límite de umbral de grandes mensajes remotos enviados.<br>_Se muestra como evento_ |
| **lightbend.actors.remote_large_message_received.mean_rate** <br>(gauge) | Índice medio de eventos de límite de umbral de grandes mensajes remotos recibidos.<br>_Se muestra como evento_ |
| **lightbend.actors.remote_large_message_received.min1_rate** <br>(gauge) | Índice de 1 minuto de eventos de límite de umbral de grandes mensajes remotos recibidos.<br>_Se muestra como evento_ |
| **lightbend.actors.remote_large_message_received.min15_rate** <br>(gauge) | Índice de 15 minutos de eventos de límite de umbral de grandes mensajes remotos recibidos.<br>_Se muestra como evento_ |
| **lightbend.actors.remote_large_message_received.min5_rate** <br>(gauge) | Índice de 5 minutos de eventos de límite de umbral de grandes mensajes remotos recibidos.<br>_Se muestra como evento_ |
| **lightbend.actors.remote_large_message_received.samples** <br>(gauge) | Número total de eventos de límite de umbral de grandes mensajes remotos recibidos.<br>_Se muestra como evento_ |
| **lightbend.remote_nodes.cluster_domain_event.mean_rate** <br>(gauge) | Índice medio de eventos de dominio de clústers Akka.<br>_Se muestra como evento_ |
| **lightbend.remote_nodes.cluster_domain_event.min1_rate** <br>(gauge) | Índice de 1 minuto de eventos de dominio de clústers Akka.<br>_Se muestra como evento_ |
| **lightbend.remote_nodes.cluster_domain_event.min15_rate** <br>(gauge) | Índice de 15 minutos de eventos de dominio de clústers Akka.<br>_Se muestra como evento_ |
| **lightbend.remote_nodes.cluster_domain_event.min5_rate** <br>(gauge) | Índice de 5 minutos de eventos de dominio de clústers Akka.<br>_Se muestra como evento_ |
| **lightbend.remote_nodes.cluster_domain_event.samples** <br>(gauge) | Número total de eventos de dominio de clústers Akka.<br>_Se muestra como evento_ |
| **lightbend.remote_nodes.cluster_member_event.mean_rate** <br>(gauge) | Índice medio de eventos de miembros de clústers Akka.<br>_Se muestra como evento_ |
| **lightbend.remote_nodes.cluster_member_event.min1_rate** <br>(gauge) | Índice de 1 minuto de eventos de miembros de clústers Akka.<br>_Se muestra como evento_ |
| **lightbend.remote_nodes.cluster_member_event.min15_rate** <br>(gauge) | Índice de 15 minutos de eventos de miembros de clústers Akka.<br>_Se muestra como evento_ |
| **lightbend.remote_nodes.cluster_member_event.min5_rate** <br>(gauge) | Índice de 5 minutos de eventos de miembros de clústers Akka.<br>_Se muestra como evento_ |
| **lightbend.remote_nodes.cluster_member_event.samples** <br>(gauge) | Número total de eventos de miembros de clusters Akka.<br>_Se muestra como evento_ |
| **lightbend.remote_nodes.node_quarantined_event.mean_rate** <br>(gauge) | Índice medio de eventos en cuarentena de nodos remotos Akka.<br>_Se muestra como evento_ |
| **lightbend.remote_nodes.node_quarantined_event.min1_rate** <br>(gauge) | Índice de 1 minuto de eventos en cuarentena de nodos remotos Akka.<br>_Se muestra como evento_ |
| **lightbend.remote_nodes.node_quarantined_event.min15_rate** <br>(gauge) | Índice de 15 minutos de eventos en cuarentena de nodos remotos Akka.<br>_Se muestra como evento_ |
| **lightbend.remote_nodes.node_quarantined_event.min5_rate** <br>(gauge) | Índice de 5 minutos de eventos en cuarentena de nodos remotos Akka.<br>_Se muestra como evento_ |
| **lightbend.remote_nodes.node_quarantined_event.samples** <br>(gauge) | Número total de eventos en cuarentena del nodo remoto Akka.<br>_Mostrado como evento_ |
| **lightbend.remote_nodes.phi_accrual_value** <br>(gauge) | Valor de acumulación phi actual para la detección de fallos de nodos remotos de Akka.|
| **lightbend.self_nodes.phi_accrual_threshold_value** <br>(gauge) | Valor actual del umbral de acumulación phi para la detección de fallos de nodos remotos de Akka.|

### Eventos

La integración de Lightbend Reactive Platform no incluye eventos.

### Checks de servicio

La integración de Lightbend Reactive Platform no incluye no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).