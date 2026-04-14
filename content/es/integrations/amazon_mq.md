---
aliases:
- /es/integrations/awsmq/
app_id: amazon_mq
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
description: Rastrea las métricas clave de AWS MQ.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-amazonmq-metrics-with-datadog
  tag: Blog
  text: Monitoriza métricas de Amazon MQ con Datadog
title: Amazon MQ
---
## Información general

Amazon MQ es un servicio de agente de mensajes administrado para Apache ActiveMQ que facilita la configuración y el funcionamiento de agentes de mensajes en la nube.

Habilita esta integración para ver todas tus métricas de Amazon MQ en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [page (página) de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `MQ` esté activado en la pestaña `Metric Collection`.

1. Instala la [integración de Datadog y AWS Amazon MQ](https://app.datadoghq.com/integrations/amazon-mq).

### Recopilación de logs

#### Activar logging

Configura Amazon MQ para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_mq` está configurado como _Prefijo de destino_.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Datadog Forwarder Lambda](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de Amazon MQ en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el grupo de logs de CloudWatch](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.amazonmq.ack_rate** <br>(count) | La velocidad a la que los consumidores acusan recibo de los mensajes. El número producido representa el número de mensajes por segundo en el momento del muestreo.|
| **aws.amazonmq.ack_rate.maximum** <br>(count) | La velocidad máxima a la que los consumidores acusan recibo de los mensajes.|
| **aws.amazonmq.ack_rate.minimum** <br>(count) | La velocidad mínima a la que los consumidores acusan recibo de los mensajes.|
| **aws.amazonmq.ack_rate.sum** <br>(count) | La velocidad máxima a la que los consumidores acusan recibo de los mensajes.|
| **aws.amazonmq.burst_balance** <br>(gauge) | El porcentaje de créditos de ráfaga restantes en el volumen de Amazon EBS utilizado para persistir datos de mensajes para agentes con rendimiento optimizado.<br>_Mostrado como porcentaje_. |
| **aws.amazonmq.burst_balance.maximum** <br>(gauge) | El porcentaje máximo de créditos de ráfaga restantes en el volumen de Amazon EBS utilizado para persistir datos de mensajes para agentes con rendimiento optimizado.<br>_Mostrado como porcentaje_. |
| **aws.amazonmq.burst_balance.minimum** <br>(gauge) | El porcentaje mínimo de créditos de ráfaga restantes en el volumen de Amazon EBS utilizado para persistir datos de mensajes para agentes con rendimiento optimizado.<br>_Mostrado como porcentaje_. |
| **aws.amazonmq.burst_balance.sum** <br>(gauge) | El porcentaje sumado de créditos de ráfaga restantes en el volumen de Amazon EBS utilizado para persistir datos de mensajes para agentes con rendimiento optimizado.<br>_Mostrado como porcentaje_. |
| **aws.amazonmq.channel_count** <br>(count) | El número total de canales establecidos en el agente.|
| **aws.amazonmq.channel_count.maximum** <br>(count) | El número máximo de canales establecidos en el agente.|
| **aws.amazonmq.channel_count.minimum** <br>(count) | El número mínimo de canales establecidos en el agente.|
| **aws.amazonmq.channel_count.sum** <br>(count) | La suma del número de canales establecidos en el agente.|
| **aws.amazonmq.confirm_rate** <br>(count) | La tasa a la que el servidor RabbitMQ está confirmando los mensajes publicados. Puedes comparar esta métrica con PublishRate para comprender mejor el rendimiento de tu agente.|
| **aws.amazonmq.confirm_rate.maximum** <br>(count) | La tasa máxima a la que el servidor RabbitMQ está confirmando los mensajes publicados. Puedes comparar esta métrica con PublishRate para comprender mejor el rendimiento de tu agente.|
| **aws.amazonmq.confirm_rate.minimum** <br>(count) | La tasa mínima a la que el servidor RabbitMQ está confirmando los mensajes publicados. Puedes comparar esta métrica con PublishRate para comprender mejor el rendimiento de tu agente.|
| **aws.amazonmq.confirm_rate.sum** <br>(count) | La tasa total a la que el servidor RabbitMQ está confirmando los mensajes publicados. Puedes comparar esta métrica con PublishRate para comprender mejor el rendimiento de tu agente.|
| **aws.amazonmq.connection_count** <br>(count) | El número total de conexiones establecidas en el agente.|
| **aws.amazonmq.connection_count.maximum** <br>(count) | El número máximo de conexiones establecidas en el agente.|
| **aws.amazonmq.connection_count.minimum** <br>(count) | El número mínimo de conexiones establecidas en el agente.|
| **aws.amazonmq.connection_count.sum** <br>(count) | La suma del número de conexiones establecidas en el agente.|
| **aws.amazonmq.consumer_count** <br>(count) | El número total de consumidores conectados al agente.|
| **aws.amazonmq.consumer_count.maximum** <br>(count) | El número máximo de consumidores conectados al agente.|
| **aws.amazonmq.consumer_count.minimum** <br>(count) | El número mínimo de consumidores conectados al agente.|
| **aws.amazonmq.consumer_count.sum** <br>(count) | La suma de consumidores conectados al agente.|
| **aws.amazonmq.cpu_credit_balance** <br>(gauge) | El número de créditos de CPU ganados que una instancia ha acumulado desde que se lanzó o se inició (incluido el número de créditos de lanzamiento).|
| **aws.amazonmq.cpu_credit_balance.maximum** <br>(gauge) | El número máximo de créditos de CPU ganados que una instancia ha acumulado desde que se lanzó o se inició (incluido el número de créditos de lanzamiento).|
| **aws.amazonmq.cpu_credit_balance.minimum** <br>(gauge) | El número mínimo de créditos de CPU ganados que una instancia ha acumulado desde que se lanzó o se inició (incluido el número de créditos de lanzamiento).|
| **aws.amazonmq.cpu_credit_balance.sum** <br>(gauge) | La suma de créditos de CPU ganados que una instancia ha acumulado desde que se lanzó o se inició (incluido el número de créditos de lanzamiento).|
| **aws.amazonmq.cpu_utilization** <br>(gauge) | El porcentaje de unidades de cálculo EC2 asignadas que el agente utiliza actualmente.<br>_Mostrado como porcentaje_ |
| **aws.amazonmq.cpu_utilization.maximum** <br>(gauge) | El porcentaje máximo de unidades de cálculo EC2 asignadas que el agente utiliza actualmente.<br>_Mostrado como porcentaje_ |
| **aws.amazonmq.cpu_utilization.minimum** <br>(gauge) | El porcentaje mínimo de unidades de cálculo EC2 asignadas que el agente utiliza actualmente.<br>_Mostrado como porcentaje_ |
| **aws.amazonmq.cpu_utilization.sum** <br>(gauge) | La suma del porcentaje de unidades de cálculo EC2 asignadas que el agente utiliza actualmente.<br>_Mostrado como porcentaje_ |
| **aws.amazonmq.current_connections_count** <br>(count) | El número actual de conexiones activas en el agente actual.<br>_Mostrado como conexión_ |
| **aws.amazonmq.current_connections_count.maximum** <br>(count) | El número máximo de conexiones activas en el agente actual.<br>_Mostrado como conexión_ |
| **aws.amazonmq.current_connections_count.minimum** <br>(count) | El número mínimo de conexiones activas en el agente actual.<br>_Mostrado como conexión_ |
| **aws.amazonmq.current_connections_count.sum** <br>(count) | La suma de conexiones activas en el agente actual.<br>_Mostrado como connection (conexión)_ |
| **aws.amazonmq.dequeue_count** <br>(count) | El número de mensajes de los que los consumidores acusaron recibo.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.dequeue_count.maximum** <br>(count) | El número máximo de mensajes de los que los consumidores acusaron recibo.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.dequeue_count.minimum** <br>(count) | El número mínimo de mensajes de los que los consumidores acusaron recibo.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.dequeue_count.sum** <br>(count) | La suma del número de mensajes de los que los consumidores acusaron recibo.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.dispatch_count** <br>(count) | El número de mensajes enviados a los consumidores.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.dispatch_count.maximum** <br>(count) | El número máximo de mensajes enviados a los consumidores.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.dispatch_count.minimum** <br>(count) | El número mínimo de mensajes enviados a los consumidores.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.dispatch_count.sum** <br>(count) | La suma del número de mensajes enviados a los consumidores.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.enqueue_count** <br>(count) | El número de mensajes enviados al destino<br>_Mostrado como mensaje_ |
| **aws.amazonmq.enqueue_count.maximum** <br>(count) | El número máximo de mensajes enviados al destino<br>_Mostrado como mensaje_ |
| **aws.amazonmq.enqueue_count.minimum** <br>(count) | El número mínimo de mensajes enviados al destino<br>_Mostrado como mensaje_ |
| **aws.amazonmq.enqueue_count.sum** <br>(count) | La suma del número de mensajes enviados al destino<br>_Mostrado como mensaje_ |
| **aws.amazonmq.enqueue_time** <br>(gauge) | La latencia de extremo a extremo desde que un mensaje llega a un agente hasta que se entrega a un consumidor.<br>_Mostrado en milisegundos_ |
| **aws.amazonmq.enqueue_time.maximum** <br>(gauge) | La latencia máxima de extremo a extremo desde que un mensaje llega a un agente hasta que se entrega a un consumidor.<br>_Mostrado en milisegundos_ |
| **aws.amazonmq.enqueue_time.minimum** <br>(gauge) | La latencia mínima de extremo a extremo desde que un mensaje llega a un agente hasta que se entrega a un consumidor.<br>_Mostrado en milisegundos_ |
| **aws.amazonmq.enqueue_time.sum** <br>(gauge) | La suma de la latencia de extremo a extremo desde que un mensaje llega a un agente hasta que se entrega a un consumidor.<br>_Mostrado como milisegundo_ |
| **aws.amazonmq.established_connections_count** <br>(count) | El número total de conexiones, activas e inactivas, que se han establecido en el agente.<br>_Mostrado como connection (conexión)_ |
| **aws.amazonmq.established_connections_count.maximum** <br>(count) | El número máximo de conexiones, activas e inactivas, que se han establecido en el agente.<br>_Mostrado como connection (conexión)_ |
| **aws.amazonmq.established_connections_count.minimum** <br>(count) | El número mínimo de conexiones, activas e inactivas, que se han establecido en el agente.<br>_Mostrado como connection (conexión)_ |
| **aws.amazonmq.established_connections_count.sum** <br>(count) | La suma de conexiones, activas e inactivas, que se han establecido en el agente.<br>_Mostrado como connection (conexión)_ |
| **aws.amazonmq.exchange_count** <br>(count) | El número total de bolsas configuradas en el agente.|
| **aws.amazonmq.exchange_count.maximum** <br>(count) | El número máximo de bolsas configuradas en el agente.|
| **aws.amazonmq.exchange_count.minimum** <br>(count) | El número mínimo de bolsas configuradas en el agente.|
| **aws.amazonmq.exchange_count.sum** <br>(count) | La suma del número de bolsas configuradas en el agente.|
| **aws.amazonmq.expired_count** <br>(count) | El número de mensajes que no se han podido entregar porque han caducado.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.expired_count.maximum** <br>(count) | El número máximo de mensajes que no se han podido entregar porque han caducado.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.expired_count.minimum** <br>(count) | El número mínimo de mensajes que no se han podido entregar porque han caducado.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.expired_count.sum** <br>(count) | La suma del número de mensajes que no se han podido entregar porque han caducado.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.heap_usage** <br>(gauge) | El porcentaje del límite de memoria JVM de ActiveMQ que utiliza actualmente el agente<br>_Mostrado como porcentaje_. |
| **aws.amazonmq.heap_usage.maximum** <br>(gauge) | El porcentaje máximo del límite de memoria JVM de ActiveMQ que utiliza actualmente el agente<br>_Mostrado como porcentaje_. |
| **aws.amazonmq.heap_usage.minimum** <br>(gauge) | El porcentaje mínimo del límite de memoria JVM de ActiveMQ que utiliza actualmente el agente<br>_Mostrado como porcentaje_. |
| **aws.amazonmq.heap_usage.sum** <br>(gauge) | La suma del porcentaje del límite de memoria JVM de ActiveMQ que utiliza actualmente el agente<br>_Mostrado como porcentaje_. |
| **aws.amazonmq.in_flight_count** <br>(count) | El número de mensajes enviados a consumidores que no han recibido acuse de recibo.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.in_flight_count.maximum** <br>(count) | El número máximo de mensajes enviados a consumidores que no han recibido acuse de recibo.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.in_flight_count.minimum** <br>(count) | El número mínimo de mensajes enviados a consumidores que no han recibido acuse de recibo.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.in_flight_count.sum** <br>(count) | La suma de los mensajes enviados a los consumidores que no han recibido acuse de recibo.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.inactive_durable_topic_subscribers_count** <br>(count) | El número de suscriptores de temas duraderos inactivos, hasta un máximo de 2000.|
| **aws.amazonmq.inactive_durable_topic_subscribers_count.maximum** <br>(count) | El número máximo de suscriptores de temas duraderos inactivos, hasta un máximo de 2000.|
| **aws.amazonmq.inactive_durable_topic_subscribers_count.minimum** <br>(count) | El número mínimo de suscriptores de temas duraderos inactivos, hasta un máximo de 2000.|
| **aws.amazonmq.inactive_durable_topic_subscribers_count.sum** <br>(count) | La suma de los suscriptores de temas duraderos inactivos, hasta un máximo de 2000.|
| **aws.amazonmq.job_scheduler_store_percentage_usage** <br>(gauge) | El porcentaje de espacio en disco utilizado por el almacén del programador de jobs (generic).<br>_Mostrado como porcentaje_ |
| **aws.amazonmq.job_scheduler_store_percentage_usage.maximum** <br>(gauge) | El porcentaje máximo de espacio en disco utilizado por el almacén del programador de jobs (generic).<br>_Mostrado como porcentaje_ |
| **aws.amazonmq.job_scheduler_store_percentage_usage.minimum** <br>(gauge) | El porcentaje mínimo de espacio en disco utilizado por el almacén del programador de jobs (generic).<br>_Mostrado como porcentaje_ |
| **aws.amazonmq.job_scheduler_store_percentage_usage.sum** <br>(gauge) | La suma del porcentaje de espacio en disco utilizado por el almacén del programador de jobs (generic).<br>_Mostrado como porcentaje_ |
| **aws.amazonmq.journal_files_for_fast_recovery** <br>(count) | El número de archivos del diario que se reproducirán tras un apagado limpio.<br>_Mostrado como archivo_ |
| **aws.amazonmq.journal_files_for_fast_recovery.maximum** <br>(count) | El número máximo de archivos del diario que se reproducirán tras un apagado limpio.<br>_Mostrado como archivo_ |
| **aws.amazonmq.journal_files_for_fast_recovery.minimum** <br>(count) | El número mínimo de archivos del diario que se reproducirán tras un apagado limpio.<br>_Mostrado como archivo_ |
| **aws.amazonmq.journal_files_for_fast_recovery.sum** <br>(count) | La suma de archivos del diario que se reproducirán tras un apagado limpio.<br>_Mostrado como archivo_ |
| **aws.amazonmq.journal_files_for_full_recovery** <br>(count) | El número de archivos del diario que se reproducirán tras un cierre no limpio.<br>_Mostrado como archivo_ |
| **aws.amazonmq.journal_files_for_full_recovery.maximum** <br>(count) | El número máximo de archivos del diario que se reproducirán después de un cierre no limpio.<br>_Mostrado como archivo_ |
| **aws.amazonmq.journal_files_for_full_recovery.minimum** <br>(count) | El número mínimo de archivos del diario que se reproducirán después de un cierre no limpio.<br>_Mostrado como archivo_ |
| **aws.amazonmq.journal_files_for_full_recovery.sum** <br>(count) | La suma de archivos del diario que se reproducirán tras un cierre no limpio.<br>_Mostrado como archivo_ |
| **aws.amazonmq.memory_usage** <br>(gauge) | El porcentaje del límite de memoria que el destino utiliza actualmente<br>_Mostrado como porcentaje_ |
| **aws.amazonmq.memory_usage.maximum** <br>(gauge) | El porcentaje máximo del límite de memoria que el destino utiliza actualmente<br>_Mostrado como porcentaje_ |
| **aws.amazonmq.memory_usage.minimum** <br>(gauge) | El porcentaje mínimo del límite de memoria que el destino utiliza actualmente<br>_Mostrado como porcentaje_ |
| **aws.amazonmq.memory_usage.sum** <br>(gauge) | La suma del porcentaje del límite de memoria que el destino utiliza actualmente<br>_Mostrado como porcentaje_ |
| **aws.amazonmq.message_count** <br>(count) | El número total de mensajes almacenados en el agente.|
| **aws.amazonmq.message_count.maximum** <br>(count) | El número máximo de mensajes almacenados en el agente.|
| **aws.amazonmq.message_count.minimum** <br>(count) | El número mínimo de mensajes almacenados en el agente.|
| **aws.amazonmq.message_count.sum** <br>(count) | La suma de mensajes almacenados en el agente.|
| **aws.amazonmq.message_ready_count** <br>(count) | El número total de mensajes listos en las colas.|
| **aws.amazonmq.message_ready_count.maximum** <br>(count) | El número máximo de mensajes listos en las colas.|
| **aws.amazonmq.message_ready_count.minimum** <br>(count) | El número mínimo de mensajes listos en las colas.|
| **aws.amazonmq.message_ready_count.sum** <br>(count) | La suma de mensajes listos en las colas.|
| **aws.amazonmq.message_unacknowledged_count** <br>(count) | El número total de mensajes que no recibieron acuse de recibo en las colas.|
| **aws.amazonmq.message_unacknowledged_count.maximum** <br>(count) | El número máximo de mensajes que no recibieron acuse de recibo en las colas.|
| **aws.amazonmq.message_unacknowledged_count.minimum** <br>(count) | El número mínimo de mensajes que no recibieron acuse de recibo en las colas.|
| **aws.amazonmq.message_unacknowledged_count.sum** <br>(count) | La suma de mensajes que no recibieron acuse de recibo en las colas.|
| **aws.amazonmq.network_in** <br>(gauge) | El volumen de tráfico entrante para el agente<br>_Mostrado como byte_ |
| **aws.amazonmq.network_in.maximum** <br>(gauge) | El volumen máximo de tráfico entrante para el agente<br>_Mostrado como byte_ |
| **aws.amazonmq.network_in.minimum** <br>(gauge) | El volumen mínimo de tráfico entrante para el agente<br>_Mostrado como byte_ |
| **aws.amazonmq.network_in.sum** <br>(gauge) | La suma del volumen de tráfico entrante para el agente<br>_Mostrado como byte_ |
| **aws.amazonmq.network_out** <br>(gauge) | El volumen de tráfico saliente para el agente<br>_Mostrado como byte_ |
| **aws.amazonmq.network_out.maximum** <br>(gauge) | El volumen máximo de tráfico saliente para el agente<br>_Mostrado como byte_ |
| **aws.amazonmq.network_out.minimum** <br>(gauge) | El volumen mínimo de tráfico saliente para el agente<br>_Mostrado como byte_ |
| **aws.amazonmq.network_out.sum** <br>(gauge) | La suma de los volúmenes de tráfico saliente para el agente<br>_Mostrado como byte_ |
| **aws.amazonmq.open_transaction_count** <br>(count) | El número total de transacciones en curso.<br>_Mostrado como transacción_ |
| **aws.amazonmq.open_transaction_count.maximum** <br>(count) | El número máximo de transacciones en curso.<br>_Mostrado como transacción_ |
| **aws.amazonmq.open_transaction_count.minimum** <br>(count) | El número mínimo de transacciones en curso.<br>_Mostrado como transacción_ |
| **aws.amazonmq.open_transaction_count.sum** <br>(count) | La suma del número de transacciones en curso.<br>_Mostrado como transacción_ |
| **aws.amazonmq.producer_count** <br>(count) | El número de productores del destino.|
| **aws.amazonmq.producer_count.maximum** <br>(count) | El número máximo de productores para el destino.|
| **aws.amazonmq.producer_count.minimum** <br>(count) | El número mínimo de productores para el destino.|
| **aws.amazonmq.producer_count.sum** <br>(count) | La suma del número de productores para el destino.|
| **aws.amazonmq.publish_rate** <br>(count) | La velocidad a la que se publican los mensajes al agente. El número producido representa el número de mensajes por segundo en el momento del muestreo.|
| **aws.amazonmq.publish_rate.maximum** <br>(count) | La velocidad máxima a la que se publican mensajes al agente. El número producido representa el número de mensajes por segundo en el momento del muestreo.|
| **aws.amazonmq.publish_rate.minimum** <br>(count) | La velocidad mínima a la que se publican mensajes al agente. El número producido representa el número de mensajes por segundo en el momento del muestreo.|
| **aws.amazonmq.publish_rate.sum** <br>(count) | La tasa de suma a la que se publican los mensajes al agente. El número producido representa el número de mensajes por segundo en el momento del muestreo.|
| **aws.amazonmq.queue_count** <br>(count) | El número total de colas configuradas en el agente.|
| **aws.amazonmq.queue_count.maximum** <br>(count) | El número máximo de colas configuradas en el agente.|
| **aws.amazonmq.queue_count.minimum** <br>(count) | El número mínimo de colas configuradas en el agente.|
| **aws.amazonmq.queue_count.sum** <br>(count) | La suma de las colas configuradas en el agente.|
| **aws.amazonmq.queue_size** <br>(gauge) | El número de mensajes en la cola.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.queue_size.maximum** <br>(gauge) | El número máximo de mensajes en la cola.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.queue_size.minimum** <br>(count) | El número mínimo de mensajes en la cola.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.queue_size.sum** <br>(count) | La suma del número de mensajes en la cola.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.rabbit_mqdisk_free** <br>(gauge) | El volumen total de espacio libre en disco disponible en un nodo RabbitMQ<br>_Mostrado como byte_ |
| **aws.amazonmq.rabbit_mqdisk_free.maximum** <br>(gauge) | El volumen máximo de espacio libre en disco disponible en un nodo RabbitMQ<br>_Mostrado como byte_ |
| **aws.amazonmq.rabbit_mqdisk_free.minimum** <br>(gauge) | El volumen mínimo de espacio libre en disco disponible en un nodo RabbitMQ<br>_Mostrado como byte_ |
| **aws.amazonmq.rabbit_mqdisk_free.sum** <br>(gauge) | El volumen total de espacio libre en disco disponible en un nodo RabbitMQ<br>_Mostrado como byte_ |
| **aws.amazonmq.rabbit_mqdisk_free_limit** <br>(gauge) | El límite de disco para un nodo RabbitMQ<br>_Mostrado como byte_ |
| **aws.amazonmq.rabbit_mqdisk_free_limit.maximum** <br>(gauge) | El límite máximo de disco para un nodo RabbitMQ<br>_Mostrado como byte_ |
| **aws.amazonmq.rabbit_mqdisk_free_limit.minimum** <br>(gauge) | El límite mínimo de disco para un nodo RabbitMQ<br>_Mostrado como byte_ |
| **aws.amazonmq.rabbit_mqdisk_free_limit.sum** <br>(gauge) | La suma del límite de disco para un nodo RabbitMQ<br>_Mostrado como byte_ |
| **aws.amazonmq.rabbit_mqfd_used** <br>(count) | El número de descriptores de archivo utilizados|
| **aws.amazonmq.rabbit_mqfd_used.maximum** <br>(count) | El número máximo de descriptores de archivo utilizados|
| **aws.amazonmq.rabbit_mqfd_used.minimum** <br>(count) | El número mínimo de descriptores de archivo utilizados|
| **aws.amazonmq.rabbit_mqfd_used.sum** <br>(count) | La suma de descriptores de archivo utilizados|
| **aws.amazonmq.rabbit_mqmem_limit** <br>(gauge) | El límite de RAM para un nodo RabbitMQ<br>_Mostrado como byte_ |
| **aws.amazonmq.rabbit_mqmem_limit.maximum** <br>(gauge) | El límite máximo de RAM para un nodo RabbitMQ<br>_Mostrado como byte_. |
| **aws.amazonmq.rabbit_mqmem_limit.minimum** <br>(gauge) | El límite mínimo de RAM para un nodo RabbitMQ<br>_Mostrado como byte_. |
| **aws.amazonmq.rabbit_mqmem_limit.sum** <br>(gauge) | La suma del límite de RAM para un nodo RabbitMQ<br>_Mostrado como byte_ |
| **aws.amazonmq.rabbit_mqmem_used** <br>(gauge) | El volumen de RAM utilizado por un nodo RabbitMQ<br>_Mostrado como byte_ |
| **aws.amazonmq.rabbit_mqmem_used.maximum** <br>(gauge) | El volumen máximo de RAM utilizado por un nodo RabbitMQ<br>_Mostrado como byte_ |
| **aws.amazonmq.rabbit_mqmem_used.minimum** <br>(gauge) | El volumen mínimo de RAM utilizado por un nodo RabbitMQ<br>_Mostrado como byte_ |
| **aws.amazonmq.rabbit_mqmem_used.sum** <br>(gauge) | La suma del volumen de RAM utilizado por un nodo RabbitMQ<br>_Mostrado como byte_ |
| **aws.amazonmq.receive_count** <br>(count) | El número de mensajes que se han recibido del agente remoto para un conector de red dúplex.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.receive_count.maximum** <br>(count) | El número máximo de mensajes que se han recibido del agente remoto para un conector de red dúplex.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.receive_count.minimum** <br>(count) | El número mínimo de mensajes que se han recibido del agente remoto para un conector de red dúplex.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.receive_count.sum** <br>(count) | La suma de mensajes que se han recibido del agente remoto para un conector de red dúplex.<br>_Mostrado como mensaje_ |
| **aws.amazonmq.store_percent_usage** <br>(gauge) | El porcentaje utilizado por el límite de almacenamiento. Si alcanza 100, el agente rechazará los mensajes.<br>_Mostrado como porcentaje_. |
| **aws.amazonmq.store_percent_usage.maximum** <br>(gauge) | El porcentaje máximo utilizado por el límite de almacenamiento. Si alcanza 100, el agente rechazará los mensajes.<br>_Mostrado como porcentaje_. |
| **aws.amazonmq.store_percent_usage.minimum** <br>(gauge) | El porcentaje mínimo utilizado por el límite de almacenamiento. Si alcanza 100, el agente rechazará los mensajes.<br>_Mostrado como porcentaje_. |
| **aws.amazonmq.store_percent_usage.sum** <br>(gauge) | El porcentaje de la suma utilizada por el límite de almacenamiento. Si alcanza 100, el agente rechazará los mensajes.<br>_Se muestra como porcentaje_. |
| **aws.amazonmq.system_cpu_utilization** <br>(gauge) | El porcentaje de unidades informáticas de Amazon EC2 asignadas que utiliza actualmente el agente.<br>_Mostrado como porcentaje_. |
| **aws.amazonmq.system_cpu_utilization.maximum** <br>(gauge) | El porcentaje máximo de unidades informáticas de Amazon EC2 asignadas que utiliza actualmente el agente.<br>_Mostrado como porcentaje_. |
| **aws.amazonmq.system_cpu_utilization.minimum** <br>(gauge) | El porcentaje mínimo de unidades informáticas de Amazon EC2 asignadas que utiliza actualmente el agente.<br>_Mostrado como porcentaje_. |
| **aws.amazonmq.system_cpu_utilization.sum** <br>(gauge) | El porcentaje total de unidades informáticas de Amazon EC2 asignadas que utiliza actualmente el agente.<br>_Mostrado como porcentaje_. |
| **aws.amazonmq.temp_percent_usage** <br>(gauge) | El porcentaje de almacenamiento temporal disponible utilizado por mensajes no persistentes.<br>_Mostrado como porcentaje_ |
| **aws.amazonmq.temp_percent_usage.maximum** <br>(gauge) | El porcentaje máximo de almacenamiento temporal disponible utilizado por mensajes no persistentes.<br>_Mostrado como porcentaje_ |
| **aws.amazonmq.temp_percent_usage.minimum** <br>(gauge) | El porcentaje mínimo de almacenamiento temporal disponible utilizado por mensajes no persistentes.<br>_Mostrado como porcentaje_ |
| **aws.amazonmq.temp_percent_usage.sum** <br>(gauge) | El porcentaje total de almacenamiento temporal disponible utilizado por mensajes no persistentes.<br>_Mostrado como porcentaje_ |
| **aws.amazonmq.total_consumer_count** <br>(count) | Número de consumidores de mensajes suscritos a destinos en el agente actual.|
| **aws.amazonmq.total_consumer_count.maximum** <br>(count) | El número máximo de consumidores de mensajes suscritos a destinos en el agente actual.|
| **aws.amazonmq.total_consumer_count.minimum** <br>(count) | El número mínimo de consumidores de mensajes suscritos a destinos en el agente actual.|
| **aws.amazonmq.total_consumer_count.sum** <br>(count) | La suma de consumidores de mensajes suscritos a destinos en el agente actual.|
| **aws.amazonmq.total_message_count** <br>(count) | El número de mensajes almacenados en el agente<br>_Mostrado como mensaje_ |
| **aws.amazonmq.total_message_count.maximum** <br>(count) | El número máximo de mensajes almacenados en el agente<br>_Mostrado como mensaje_ |
| **aws.amazonmq.total_message_count.minimum** <br>(count) | El número mínimo de mensajes almacenados en el agente<br>_Mostrado como mensaje_ |
| **aws.amazonmq.total_message_count.sum** <br>(count) | La suma del número de mensajes almacenados en el agente<br>_Mostrado como mensaje_ |
| **aws.amazonmq.total_producer_count** <br>(count) | El número de productores de mensajes activos en los destinos del agente actual.|
| **aws.amazonmq.total_producer_count.maximum** <br>(count) | El número máximo de productores de mensajes activos en destinos en el agente actual.|
| **aws.amazonmq.total_producer_count.minimum** <br>(count) | El número mínimo de productores de mensajes activos en destinos en el agente actual.|
| **aws.amazonmq.total_producer_count.sum** <br>(count) | La suma de productores de mensajes activos en destinos en el agente actual.|
| **aws.amazonmq.volume_read_ops** <br>(count) | El número de operaciones de lectura realizadas en el volumen de Amazon EBS.|
| **aws.amazonmq.volume_read_ops.maximum** <br>(count) | El número máximo de operaciones de lectura realizadas en el volumen de Amazon EBS.|
| **aws.amazonmq.volume_read_ops.minimum** <br>(count) | El número mínimo de operaciones de lectura realizadas en el volumen de Amazon EBS.|
| **aws.amazonmq.volume_read_ops.sum** <br>(count) | La suma de las operaciones de lectura realizadas en el volumen de Amazon EBS.|
| **aws.amazonmq.volume_write_ops** <br>(count) | El número de operaciones de escritura realizadas en el volumen de Amazon EBS.|
| **aws.amazonmq.volume_write_ops.maximum** <br>(count) | El número máximo de operaciones de escritura realizadas en el volumen de Amazon EBS.|
| **aws.amazonmq.volume_write_ops.minimum** <br>(count) | El número mínimo de operaciones de escritura realizadas en el volumen de Amazon EBS.|
| **aws.amazonmq.volume_write_ops.sum** <br>(count) | La suma de las operaciones de escritura realizadas en el volumen de Amazon EBS.|

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración de AWS Amazon MQ no incluye ningún evento.

### Checks de servicio

La integración de AWS Amazon MQ no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}