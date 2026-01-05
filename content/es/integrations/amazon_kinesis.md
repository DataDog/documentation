---
aliases:
- /es/integrations/awskinesis/
app_id: amazon_kinesis
categories:
- aws
- cloud
- log collection
custom_kind: integración
description: Rastrea métricas clave de Amazon Kinesis.
title: Amazon Kinesis
---
## Información general

Amazon Kinesis es un servicio totalmente gestionado, basado en la nube utilizado para procesar grandes flujos de datos distribuidos en tiempo real.

Habilita esta integración para ver en Datadog todas tus métricas Kinesis y recopilar etiquetas (tags) personalizadas de Kinesis.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/). No es necesario realizar ningún otro paso de instalación.

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Kinesis` está habilitado en la pestaña `Metric Collection`.

1. Añade estos permisos a tu [política de Datadog IAM](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) para recopilar métricas de Amazon Kinesis:

   - `kinesis:ListStreams`: Enumera los flujos (flows) disponibles.
   - `kinesis:DescribeStream`: Añade etiquetas y nuevas métricas para flujos Kinesis.
   - `kinesis:ListTagsForStream`: Añade etiquetas personalizadas.

   Para más información, consulta las [políticas de Kinesis](https://docs.aws.amazon.com/streams/latest/dev/controlling-access.html) en el sitio web de AWS.

1. Instala la [integración de Datadog y Amazon Kinesis](https://app.datadoghq.com/integrations/amazon-kinesis).

### Recopilación de logs

#### Activar logging

Datadog es uno de los destinos predeterminados para los flujos de entrega de Amazon Data Firehose. AWS administra completamente Amazon Data Firehose, por lo que no es necesario mantener ninguna infraestructura adicional ni configuraciones de reenvío para los logs de streaming.

Puedes configurar un flujo de entrega de Amazon Data Firehose en la consola de AWS Firehose o puedes configurar automáticamente el destino utilizando una plantilla de CloudFormation:

- [Consola de AWS Firehose](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=amazondatafirehosedeliverystream)
- [Plantilla de CloudFormation](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=cloudformationtemplate)

Sin embargo, si generas logs en un bucket de S3, utiliza la función AWS Lambda y asegúrate de que `amazon_kinesis` esté configurado como Prefijo de destino.

1. Si aún no lo has hecho, configura la [función de Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon Kinesis en la consola de AWS.

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.kinesis.get_records_bytes** <br>(gauge) | Número medio de bytes por operación GetRecords<br>_Se muestra como byte_ |
| **aws.kinesis.get_records_bytes.maximum** <br>(gauge) | Número máximo de bytes por operación GetRecords<br>_Se muestra como byte_ |
| **aws.kinesis.get_records_bytes.minimum** <br>(gauge) | Número mínimo de bytes por operación GetRecords<br>_Se muestra como byte_ |
| **aws.kinesis.get_records_bytes.sum** <br>(count) | Número total de bytes devueltos en todas las operaciones GetRecords<br>_Se muestra como byte_ |
| **aws.kinesis.get_records_iterator_age** <br>(gauge) | Diferencia media entre la hora actual y el momento en que se escribió en el flujo el último registro de una llamada a GetRecords.<br>_Se muestra como segundo_ |
| **aws.kinesis.get_records_iterator_age.maximum** <br>(gauge) | Diferencia máxima entre la hora actual y el momento en que se escribió en el flujo el último registro de una llamada a GetRecords.<br>_Se muestra como segundo_ |
| **aws.kinesis.get_records_iterator_age_milliseconds** <br>(gauge) | Diferencia entre la hora actual y el momento en que se escribió en el flujo el último registro de una llamada a GetRecords.<br>_Se muestra como milisegundo_ |
| **aws.kinesis.get_records_iterator_age_milliseconds.maximum** <br>(gauge) | Diferencia máxima entre la hora actual y el momento en que se escribió en el flujo el último registro de una llamada a GetRecords.<br>_Se muestra como milisegundo_ |
| **aws.kinesis.get_records_latency** <br>(gauge) | Tiempo medio empleado en cada operación GetRecords.<br>_Se muestra en milisegundos_ |
| **aws.kinesis.get_records_latency.maximum** <br>(gauge) | Tiempo máximo que tarda cada operación GetRecords.<br>_Se muestra en milisegundos_ |
| **aws.kinesis.get_records_records** <br>(gauge) | Número medio de registros por operación GetRecords<br>_Se muestra como registro_ |
| **aws.kinesis.get_records_records.maximum** <br>(gauge) | Número máximo de registros por operación GetRecords<br>_Se muestra como registro_ |
| **aws.kinesis.get_records_records.minimum** <br>(gauge) | Número mínimo de registros por operación GetRecords<br>_Se muestra como registro_ |
| **aws.kinesis.get_records_records.sum** <br>(count) | Número total de registros devueltos en todas las operaciones GetRecords<br>_Se muestra como registro_ |
| **aws.kinesis.get_records_success** <br>(count) | Suma de operaciones GetRecords realizadas con éxito por flujo.<br>_Se muestra como evento_ |
| **aws.kinesis.get_records_success.average** <br>(count) | Número medio de operaciones GetRecords realizadas con éxito por flujo.<br>_Se muestra como evento_ |
| **aws.kinesis.incoming_bytes** <br>(gauge) | Número medio de bytes introducidos con éxito en el flujo de Amazon Kinesis por operación.<br>_Se muestra como byte_ |
| **aws.kinesis.incoming_bytes.sum** <br>(count) | Número total de bytes introducidos correctamente en el flujo de Amazon Kinesis.<br>_Se muestra como byte_ |
| **aws.kinesis.incoming_records** <br>(count) | Número total de registros introducidos correctamente en el flujo de Amazon Kinesis.<br>_Se muestra como registro_ |
| **aws.kinesis.incoming_records.average** <br>(gauge) | Número medio de registros introducidos con éxito en el flujo de Amazon Kinesis por operación.<br>_Se muestra como registro_ |
| **aws.kinesis.iterator_age_milliseconds** <br>(gauge) | La antigüedad del último registro en todas las llamadas GetRecords realizadas contra un fragmento, medida en el periodo especificado. <br>_Se muestra en milisegundos_ |
| **aws.kinesis.outgoing_bytes** <br>(gauge) | Número medio de bytes recuperados en una operación GetRecords<br>_Se muestra como byte_ |
| **aws.kinesis.outgoing_bytes.sum** <br>(count) | Número total de bytes recuperados del flujo de Amazon Kinesis<br>_Se muestra como byte_ |
| **aws.kinesis.outgoing_records** <br>(count) | El número de registros recuperados del fragmento, medido durante el periodo especificado.<br>_Se muestra como registro_ |
| **aws.kinesis.outgoing_records.average** <br>(gauge) | El número medio de registros recuperados del fragmento, medido durante el periodo especificado.<br>_Se muestra como registro_ |
| **aws.kinesis.put_record_bytes** <br>(gauge) | Número medio de bytes por operación PutRecord<br>_Se muestra como byte_ |
| **aws.kinesis.put_record_bytes.maximum** <br>(gauge) | Número máximo de bytes por operación PutRecord<br>_Se muestra como byte_ |
| **aws.kinesis.put_record_bytes.minimum** <br>(gauge) | Número mínimo de bytes por operación PutRecord<br>_Se muestra como byte_ |
| **aws.kinesis.put_record_bytes.sum** <br>(count) | Número total de bytes para todas las operaciones PutRecord<br>_Se muestra como byte_ |
| **aws.kinesis.put_record_latency** <br>(gauge) | Tiempo medio empleado en cada operación PutRecord.<br>_Se muestra en milisegundos_ |
| **aws.kinesis.put_record_latency.maximum** <br>(gauge) | Tiempo máximo que tarda cada operación PutRecord.<br>_Se muestra en milisegundos_ |
| **aws.kinesis.put_record_success** <br>(count) | Suma de operaciones PutRecord realizadas con éxito por flujo de Amazon Kinesis.<br>_Se muestra como evento_ |
| **aws.kinesis.put_record_success.average** <br>(count) | Número medio de operaciones PutRecord realizadas con éxito por flujo de Amazon Kinesis.<br>_Se muestra como evento_ |
| **aws.kinesis.put_records_bytes** <br>(gauge) | Número medio de bytes por operación PutRecords.<br>_Se muestra como byte_ |
| **aws.kinesis.put_records_bytes.maximum** <br>(gauge) | Número máximo de bytes por operación PutRecords.<br>_Se muestra como byte_ |
| **aws.kinesis.put_records_bytes.minimum** <br>(gauge) | Número mínimo de bytes por operación PutRecords.<br>_Se muestra como byte_ |
| **aws.kinesis.put_records_bytes.sum** <br>(count) | Número total de bytes para todas las operaciones PutRecords.<br>_Se muestra como byte_ |
| **aws.kinesis.put_records_failed_records** <br>(gauge) | El número de registros rechazados debido a fallos internos en una operación PutRecords por flujo de datos de Kinesis, sumado durante el periodo especificado.<br>_Se muestra como registro_ |
| **aws.kinesis.put_records_failed_records.average** <br>(gauge) | El número de registros rechazados debido a fallos internos en una operación PutRecords por flujo de datos de Kinesis, promediado durante el periodo especificado.<br>_Se muestra como registro_ |
| **aws.kinesis.put_records_failed_records.maximum** <br>(gauge) | El número de registros rechazados debido a fallos internos en una operación PutRecords por flujo de datos de Kinesis, máximo durante el periodo especificado.<br>_Se muestra como registro_ |
| **aws.kinesis.put_records_failed_records.minimum** <br>(gauge) | El número de registros rechazados debido a fallos internos en una operación PutRecords por flujo de datos de Kinesis, mínimo durante el periodo especificado.<br>_Se muestra como registro_ |
| **aws.kinesis.put_records_latency** <br>(gauge) | Tiempo medio empleado en cada operación PutRecords.<br>_Se muestra en milisegundos_ |
| **aws.kinesis.put_records_latency.maximum** <br>(gauge) | Tiempo máximo empleado en todas las operaciones PutRecords.<br>_Se muestra en milisegundos_ |
| **aws.kinesis.put_records_records** <br>(gauge) | Número medio de registros por operación PutRecords<br>_Se muestra como registro_ |
| **aws.kinesis.put_records_records.maximum** <br>(gauge) | Número máximo de registros para operaciones PutRecords<br>_Se muestra como registro_ |
| **aws.kinesis.put_records_records.minimum** <br>(gauge) | Número mínimo de registros para las operaciones PutRecords<br>_Se muestra como registro_ |
| **aws.kinesis.put_records_records.sum** <br>(count) | Número total de registros para operaciones PutRecords<br>_Se muestra como registro_ |
| **aws.kinesis.put_records_success** <br>(count) | Suma de operaciones PutRecords realizadas con éxito por flujo de Amazon Kinesis.<br>_Se muestra como evento_ |
| **aws.kinesis.put_records_success.average** <br>(count) | Número medio de operaciones PutRecords realizadas con éxito por flujo de Amazon Kinesis.<br>_Se muestra como evento_ |
| **aws.kinesis.put_records_successful_records** <br>(gauge) | El número de registros realizados con éxito en una operación PutRecords por flujo de datos de Kinesis, sumados durante el periodo especificado.<br>_Se muestra como registro_ |
| **aws.kinesis.put_records_successful_records.average** <br>(gauge) | El número de registros realizados con éxito en una operación PutRecords por flujo de datos de Kinesis, promediado durante el periodo especificado.<br>_Se muestra como registro_ |
| **aws.kinesis.put_records_successful_records.maximum** <br>(gauge) | El número de registros realizados con éxito en una operación PutRecords por flujo de datos de Kinesis, máximo durante el periodo especificado.<br>_Se muestra como registro_ |
| **aws.kinesis.put_records_successful_records.minimum** <br>(gauge) | El número de registros realizados con éxito en una operación PutRecords por flujo de datos de Kinesis, mínimo durante el periodo especificado.<br>_Se muestra como registro_ |
| **aws.kinesis.put_records_throttled_records** <br>(gauge) | Número de registros rechazados debido a la limitación en una operación PutRecords por flujo de datos de Kinesis, sumado durante el periodo especificado.<br>_Se muestra como registro_ |
| **aws.kinesis.put_records_throttled_records.average** <br>(gauge) | Número de registros rechazados debido a la limitación en una operación PutRecords por flujo de datos de Kinesis, promediado durante el periodo especificado.<br>_Se muestra como registro_ |
| **aws.kinesis.put_records_throttled_records.maximum** <br>(gauge) | Número de registros rechazados debido a la limitación en una operación PutRecords por flujo de datos de Kinesis, máximo durante el periodo especificado.<br>_Se muestra como registro_ |
| **aws.kinesis.put_records_throttled_records.minimum** <br>(gauge) | Número de registros rechazados debido a la limitación en una operación PutRecords por flujo de datos de Kinesis, mínimo durante el periodo especificado.<br>_Se muestra como registro_ |
| **aws.kinesis.put_records_total_records** <br>(gauge) | El número total de registros enviados en una operación PutRecords por flujo de datos de Kinesis, sumado durante el periodo especificado.<br>_Se muestra como registro_ |
| **aws.kinesis.put_records_total_records.average** <br>(gauge) | El número total de registros enviados en una operación PutRecords por flujo de datos de Kinesis, promediado durante el periodo especificado.<br>_Se muestra como registro_ |
| **aws.kinesis.put_records_total_records.maximum** <br>(gauge) | El número total de registros enviados en una operación PutRecords por flujo de datos de Kinesis, máximo durante el periodo especificado.<br>_Se muestra como registro_ |
| **aws.kinesis.put_records_total_records.minimum** <br>(gauge) | El número total de registros enviados en una operación PutRecords por flujo de datos de Kinesis, mínimo durante el periodo especificado.<br>_Se muestra como registro_ |
| **aws.kinesis.read_provisioned_throughput_exceeded** <br>(count) | Número de llamadas a GetRecords limitadas para el flujo<br>_Se muestra como registro_ |
| **aws.kinesis.read_provisioned_throughput_exceeded.average** <br>(count) | Media de llamadas GetRecords limitadas para el flujo<br>_Se muestra como registro_ |
| **aws.kinesis.read_provisioned_throughput_exceeded.maximum** <br>(count) | Número máximo de llamadas GetRecords limitadas para el flujo<br>_Se muestra como registro_ |
| **aws.kinesis.read_provisioned_throughput_exceeded.minimum** <br>(count) | Número mínimo de llamadas GetRecords limitadas para el flujo<br>_Se muestra como registro_ |
| **aws.kinesis.subscribe_to_shard_event_bytes** <br>(gauge) | El número de bytes recibidos del fragmento, promediado durante el periodo especificado.<br>_Se muestra como byte_ |
| **aws.kinesis.subscribe_to_shard_event_bytes.maximum** <br>(gauge) | El número de bytes recibidos del fragmento, máximo durante el periodo especificado.<br>_Se muestra como byte_ |
| **aws.kinesis.subscribe_to_shard_event_bytes.minimum** <br>(gauge) | El número de bytes recibidos del fragmento, mínimo durante el periodo especificado.<br>_Se muestra como byte_ |
| **aws.kinesis.subscribe_to_shard_event_bytes.sum** <br>(gauge) | El número de bytes recibidos del fragmento, sumados durante el periodo especificado.<br>_Se muestra como byte_ |
| **aws.kinesis.subscribe_to_shard_event_millis_behind_latest** <br>(gauge) | La diferencia entre la hora actual y el momento en que el último registro del evento SubscribeToShard se escribió en el flujo.<br>_Se muestra como milisegundo_ |
| **aws.kinesis.subscribe_to_shard_event_millis_behind_latest.maximum** <br>(gauge) | La diferencia entre la hora actual y el momento en que el último registro del evento SubscribeToShard se escribió en el flujo.<br>_Se muestra como milisegundo_ |
| **aws.kinesis.subscribe_to_shard_event_records** <br>(count) | El número de registros recibidos del fragmento, promediados durante el periodo especificado. <br> _Se muestra como registro_ |
| **aws.kinesis.subscribe_to_shard_event_records.maximum** <br>(count) | Número de registros recibidos del fragmento, máximo durante el periodo especificado. <br>_Se muestra como registro_ |
| **aws.kinesis.subscribe_to_shard_event_records.minimum** <br>(count) | Número de registros recibidos del fragmento, mínimo durante el periodo especificado. <br>_Se muestra como registro_ |
| **aws.kinesis.subscribe_to_shard_event_records.sum** <br>(count) | Número de registros recibidos del fragmento, sumados durante el periodo especificado. <br>_Se muestra como registro_ |
| **aws.kinesis.subscribe_to_shard_event_success** <br>(count) | Esta métrica se emite cada vez que un evento se publica correctamente. Sólo se emite cuando hay una suscripción activa.<br>_Se muestra como evento_ |
| **aws.kinesis.subscribe_to_shard_event_success.average** <br>(count) | Esta métrica se emite cada vez que un evento se publica correctamente. Sólo se emite cuando hay una suscripción activa.<br>_Se muestra como evento_ |
| **aws.kinesis.subscribe_to_shard_rate_exceeded** <br>(count) | Esta métrica se emite cuando falla un nuevo intento de suscripción porque ya hay una suscripción activa por parte del mismo consumidor o si se supera el número de llamadas por segundo permitidas para esta operación.<br>_Se muestra como registro_ |
| **aws.kinesis.subscribe_to_shard_rate_exceeded.average** <br>(count) | Esta métrica se emite cuando falla un nuevo intento de suscripción porque ya hay una suscripción activa por parte del mismo consumidor o si se supera el número de llamadas por segundo permitidas para esta operación.<br>_Se muestra como registro_ |
| **aws.kinesis.subscribe_to_shard_rate_exceeded.maximum** <br>(count) | Esta métrica se emite cuando falla un nuevo intento de suscripción porque ya hay una suscripción activa por parte del mismo consumidor o si se supera el número de llamadas por segundo permitidas para esta operación.<br>_Se muestra como registro_ |
| **aws.kinesis.subscribe_to_shard_rate_exceeded.minimum** <br>(count) | Esta métrica se emite cuando falla un nuevo intento de suscripción porque ya hay una suscripción activa por parte del mismo consumidor o si se supera el número de llamadas por segundo permitidas para esta operación.<br>_Se muestra como registro_ |
| **aws.kinesis.subscribe_to_shard_success** <br>(gauge) | Esta métrica registra si la suscripción SubscribeToShard se ha establecido correctamente. La suscripción sólo dura un máximo de 5 minutos. Por lo tanto, esta métrica se emite al menos una vez cada 5 minutos.<br>_Se muestra como evento_ |
| **aws.kinesis.subscribe_to_shard_success.average** <br>(gauge) | Esta métrica registra si la suscripción SubscribeToShard se ha establecido correctamente. La suscripción sólo dura un máximo de 5 minutos. Por lo tanto, esta métrica se emite al menos una vez cada 5 minutos.<br>_Se muestra como evento_ |
| **aws.kinesis.write_provisioned_throughput_exceeded** <br>(count) | Número de registros rechazados debido a la limitación del flujo<br>_Se muestra como registro_ |
| **aws.kinesis.write_provisioned_throughput_exceeded.average** <br>(count) | Promedio de registros rechazados debido a la limitación para el flujo<br>_Se muestra como registro_ |
| **aws.kinesis.write_provisioned_throughput_exceeded.maximum** <br>(count) | Número máximo de registros rechazados debido a la limitación del flujo<br>_Se muestra como registro_ |
| **aws.kinesis.write_provisioned_throughput_exceeded.minimum** <br>(count) | Número mínimo de registros rechazados debido a la limitación del flujo<br>_Se muestra como registro_ |

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración Amazon Kinesis no incluye eventos.

### Checks de servicio

La integración Amazon Kinesis no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).