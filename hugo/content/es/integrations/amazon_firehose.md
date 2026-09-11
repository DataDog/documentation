---
aliases:
- /es/integrations/awsfirehose/
app_id: amazon_firehose
categories:
- aws
- cloud
- log collection
custom_kind: integración
description: Rastrea las métricas clave de Amazon Data Firehose.
title: Manguera de datos de Amazon
---
## Información general

Amazon Data Firehose es la forma más sencilla de cargar datos de streaming en AWS.

Habilita esta integración para ver en Datadog todas tus métricas de Firehose.

**Nota**: Amazon Data Firehose se conocía anteriormente como Amazon Kinesis Data Firehose. Lee la publicación [AWS What's New](https://aws.amazon.com/about-aws/whats-new/2024/02/amazon-data-firehose-formerly-kinesis-data-firehose/) para obtener más información.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Firehose` está habilitado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y Amazon Data Firehose](https://app.datadoghq.com/integrations/amazon-firehose).

### Recopilación de logs

#### Activar logging

Configura Amazon Data Firehose para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_firehose` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon Data Firehose en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.firehose.backup_to_s_3bytes** <br>(count) | El número de bytes entregados a Amazon S3 para copia de seguridad durante el periodo especificado.<br>_Se muestra como byte_ |
| **aws.firehose.backup_to_s_3data_freshness** <br>(gauge) | Antigüedad (desde que entra en Kinesis Data Firehose hasta ahora) del registro más antiguo de Kinesis Data Firehose. Cualquier registro anterior a esta antigüedad se ha entregado al bucket de Amazon S3 para copia de seguridad.<br>_Se muestra como segundo_ |
| **aws.firehose.backup_to_s_3records** <br>(count) | El número de registros entregados a Amazon S3 para la copia de seguridad durante el periodo especificado.|
| **aws.firehose.backup_to_s_3success** <br>(gauge) | Fracción de comandos put de Amazon S3 con éxito para la copia de seguridad.<br>_Se muestra como fracción_ |
| **aws.firehose.backup_to_s_3success.sum** <br>(count) | El número total de comandos put de Amazon S3 realizados con éxito para la copia de seguridad.|
| **aws.firehose.bytes_per_second_limit** <br>(count) | El número máximo actual de bytes por segundo que un flujo de entrega puede ingerir antes de la limitación.|
| **aws.firehose.data_read_from_kinesis_stream_bytes** <br>(count) | Cuando la fuente de datos es un flujo de datos de Kinesis, esta métrica indica el número de bytes leídos de ese flujo de datos. Este número incluye las relecturas debidas a conmutaciones por error.<br>_Se muestra como byte_ |
| **aws.firehose.data_read_from_kinesis_stream_records** <br>(count) | Cuando la fuente de datos es un flujo de datos de Kinesis, esta métrica indica el número de registros leídos de ese flujo de datos.|
| **aws.firehose.data_read_from_kinesis_stream_records.average** <br>(gauge) | Cuando la fuente de datos es un flujo de datos de Kinesis, esta métrica indica el número medio de registros leídos de ese flujo de datos.|
| **aws.firehose.data_read_from_source_bytes** <br>(count) | El número de bytes leídos desde la fuente Kafka Topic.<br>_Se muestra como byte_ |
| **aws.firehose.data_read_from_source_bytes.sum** <br>(count) | El número de bytes leídos desde la fuente Kafka Topic.<br>_Se muestra como byte_ |
| **aws.firehose.data_read_from_source_records** <br>(count) | El número de registros leídos desde la fuente Kafka Topic.<br>_Se muestra como count_ |
| **aws.firehose.data_read_from_source_records.sum** <br>(count) | El número de registros leídos desde la fuente Kafka Topic.<br>_Se muestra como count_ |
| **aws.firehose.delivery_to_elasticsearch_bytes** <br>(count) | El número total de bytes indexados en Amazon ElasticSearch.<br>_Se muestra como byte_ |
| **aws.firehose.delivery_to_elasticsearch_records** <br>(count) | El número total de registros indexados en Amazon ElasticSearch.|
| **aws.firehose.delivery_to_elasticsearch_success** <br>(gauge) | Fracción de registros indexados con éxito en Amazon ElasticSearch.<br>_Se muestra como fracción_ |
| **aws.firehose.delivery_to_elasticsearch_success.sum** <br>(count) | Número total de registros indexados correctamente en Amazon ElasticSearch.|
| **aws.firehose.delivery_to_http_endpoint_bytes** <br>(count) | El número de bytes entregados con éxito al endpoint HTTP.<br>_Se muestra como byte_ |
| **aws.firehose.delivery_to_http_endpoint_data_freshness** <br>(gauge) | Antigüedad del registro más antiguo en Kinesis Data Firehose.<br>_Se muestra como segundo_ |
| **aws.firehose.delivery_to_http_endpoint_processed_bytes** <br>(count) | El número de bytes intentados procesados, incluidos los reintentos.<br>_Se muestra como byte_ |
| **aws.firehose.delivery_to_http_endpoint_processed_records** <br>(count) | Número de registros intentados, incluidos los reintentos.|
| **aws.firehose.delivery_to_http_endpoint_processed_records.average** <br>(gauge) | Número medio de registros intentados, incluidos los reintentos.|
| **aws.firehose.delivery_to_http_endpoint_records** <br>(count) | Número de registros entregados correctamente al endpoint HTTP.|
| **aws.firehose.delivery_to_http_endpoint_records.average** <br>(gauge) | Número medio de registros entregados correctamente al endpoint HTTP.|
| **aws.firehose.delivery_to_http_endpoint_success** <br>(gauge) | La fracción de solicitudes de entrega de datos con éxito al endpoint HTTP.<br>_Se muestra como fracción_ |
| **aws.firehose.delivery_to_http_endpoint_success.sum** <br>(count) | El número total de todas las solicitudes de entrega de datos con éxito al endpoint HTTP.<br>_Se muestra como fracción_ |
| **aws.firehose.delivery_to_redshift_bytes** <br>(gauge) | El número medio de bytes copiados a Amazon Redshift por entrega.<br>_Se muestra como byte_ |
| **aws.firehose.delivery_to_redshift_bytes.sum** <br>(count) | El número total de bytes copiados a Amazon Redshift.<br>_Se muestra como byte_ |
| **aws.firehose.delivery_to_redshift_records** <br>(count) | El número total de registros copiados en Amazon Redshift.|
| **aws.firehose.delivery_to_redshift_records.average** <br>(gauge) | El número medio de registros copiados a Amazon Redshift por entrega.|
| **aws.firehose.delivery_to_redshift_success** <br>(gauge) | Fracción de comandos COPY de Redshift ejecutados con éxito<br>_Se muestra como fracción_ |
| **aws.firehose.delivery_to_redshift_success.sum** <br>(count) | Número total de comandos COPY de Redshift ejecutados con éxito|
| **aws.firehose.delivery_to_s_3bytes** <br>(gauge) | El número medio de bytes entregados a Amazon S3 por entrega.<br>_Se muestra como byte_ |
| **aws.firehose.delivery_to_s_3bytes.sum** <br>(count) | El número total de bytes entregados a Amazon S3.<br>_Se muestra como byte_ |
| **aws.firehose.delivery_to_s_3data_freshness** <br>(gauge) | Antigüedad (desde que entró en Firehose hasta ahora) del registro más antiguo en Firehose. Cualquier registro más antiguo que esta antigüedad ha sido entregado al bucket de S3.<br>_Se muestra como segundo_ |
| **aws.firehose.delivery_to_s_3records** <br>(count) | El número total de registros entregados a Amazon S3.|
| **aws.firehose.delivery_to_s_3records.average** <br>(gauge) | El número medio de registros entregados a Amazon S3 por entrega.|
| **aws.firehose.delivery_to_s_3success** <br>(gauge) | Fracción de entregas con éxito a S3<br>_Se muestra como fracción_ |
| **aws.firehose.delivery_to_s_3success.sum** <br>(count) | Suma de entregas con éxito a S3|
| **aws.firehose.delivery_to_splunk_bytes** <br>(gauge) | El número medio de bytes entregados a Splunk por entrega.<br>_Se muestra como byte_ |
| **aws.firehose.delivery_to_splunk_bytes.sum** <br>(count) | El número total de bytes entregados a Splunk.<br>_Se muestra como byte_ |
| **aws.firehose.delivery_to_splunk_data_ack_latency** <br>(gauge) | La duración media aproximada que se tarda en recibir una aceptación de Splunk después de que Kinesis Data Firehose le envíe datos.<br>_Se muestra como segundo_ |
| **aws.firehose.delivery_to_splunk_data_ack_latency.maximum** <br>(gauge) | La duración máxima aproximada que se tarda en recibir una aceptación de Splunk después de que Kinesis Data Firehose le envíe datos.<br>_Se muestra como segundo_ |
| **aws.firehose.delivery_to_splunk_data_freshness** <br>(gauge) | Antigüedad media (desde que entró en Firehose hasta ahora) del registro más antiguo en Firehose. Cualquier registro más antiguo que esta antigüedad ha sido entregado a Splunk.<br>_Se muestra como segundo_ |
| **aws.firehose.delivery_to_splunk_data_freshness.maximum** <br>(gauge) | Antigüedad máxima (desde que entró en Firehose hasta ahora) del registro más antiguo en Firehose. Cualquier registro más antiguo que esta antigüedad ha sido entregado a Splunk.<br>_Se muestra como segundo_ |
| **aws.firehose.delivery_to_splunk_records** <br>(count) | El número total de registros entregados a Splunk.|
| **aws.firehose.delivery_to_splunk_records.average** <br>(gauge) | El número medio de registros entregados a Splunk por entrega.|
| **aws.firehose.delivery_to_splunk_success** <br>(gauge) | Fracción de registros indexados con éxito<br>_Se muestra como fracción_ |
| **aws.firehose.delivery_to_splunk_success.maximum** <br>(gauge) | Valor máximo de la fracción de registros indexados con éxito<br>_Se muestra como fracción_ |
| **aws.firehose.delivery_to_splunk_success.minimum** <br>(gauge) | Valor mínimo para la fracción de registros indexados con éxito<br>_Se muestra como fracción_ |
| **aws.firehose.describe_delivery_stream_latency** <br>(gauge) | El tiempo medio que tarda cada operación DescribeDeliveryStream.<br>_Se muestra en milisegundos_ |
| **aws.firehose.describe_delivery_stream_latency.maximum** <br>(gauge) | El tiempo máximo que tarda cada operación DescribeDeliveryStream.<br>_Se muestra en milisegundos_ |
| **aws.firehose.describe_delivery_stream_requests** <br>(count) | Número total de solicitudes DescribeDeliveryStream.|
| **aws.firehose.incoming_bytes** <br>(gauge) | El número de bytes ingeridos en el flujo de entrega de Firehose.<br>_Se muestra como byte_ |
| **aws.firehose.incoming_put_requests** <br>(count) | El número de solicitudes PutRecord y PutRecordBatch realizadas con éxito durante el periodo especificado después de la limitación.|
| **aws.firehose.incoming_records** <br>(count) | El número de registros ingeridos en el flujo de entrega de Firehose.|
| **aws.firehose.kinesis_millis_behind_latest** <br>(gauge) | Cuando la fuente de datos es un flujo de datos de Kinesis, esta métrica indica el tiempo medio que el último registro leído está por detrás del registro más reciente del flujo de datos de Kinesis.<br>_Se muestra en milisegundos_ |
| **aws.firehose.kinesis_millis_behind_latest.maximum** <br>(gauge) | Cuando la fuente de datos es un flujo de datos de Kinesis, esta métrica indica el tiempo máximo que el último registro leído está por detrás del registro más reciente del flujo de datos de Kinesis.<br>_Se muestra en milisegundos_ |
| **aws.firehose.kmskey_access_denied** <br>(count) | El número de veces que el servicio encuentra una KMSAccessDeniedException para el flujo de entrega.<br>_Se muestra como milisegundo_ |
| **aws.firehose.kmskey_disabled** <br>(count) | El número de veces que el servicio encuentra una KMSDisabledException para el flujo de entrega.<br>_Se muestra como milisegundo_ |
| **aws.firehose.kmskey_invalid_state** <br>(count) | El número de veces que el servicio encuentra una KMSInvalidStateException para el flujo de entrega.<br>_Se muestra como milisegundo_ |
| **aws.firehose.kmskey_not_found** <br>(count) | El número de veces que el servicio encuentra una KMSNotFoundException para el flujo de entrega.<br>_Se muestra en milisegundos_ |
| **aws.firehose.list_delivery_stream_latency** <br>(gauge) | El tiempo medio que tarda cada operación de ListDeliveryStream.<br>_Se muestra en milisegundos_ |
| **aws.firehose.list_delivery_stream_latency.maximum** <br>(gauge) | El tiempo máximo que tarda cada operación ListDeliveryStream.<br>_Se muestra en milisegundos_ |
| **aws.firehose.list_delivery_stream_requests** <br>(count) | Número total de solicitudes ListDeliveryStream.|
| **aws.firehose.list_delivery_streams_latency** <br>(gauge) | El tiempo medio que tarda cada operación de ListDeliveryStreams.<br>_Se muestra en milisegundos_ |
| **aws.firehose.list_delivery_streams_latency.maximum** <br>(gauge) | El tiempo máximo que tarda cada operación ListDeliveryStreams.<br>_Se muestra en milisegundos_ |
| **aws.firehose.list_delivery_streams_requests** <br>(count) | Número total de solicitudes ListDeliveryStreams.|
| **aws.firehose.put_record_batch_bytes** <br>(count) | Número total de bytes enviados al flujo de entrega de Firehose mediante PutRecordBatch.<br>_Se muestra como byte_ |
| **aws.firehose.put_record_batch_bytes.average** <br>(gauge) | El número medio de bytes por solicitud PutRecordBatch.<br>_Se muestra como byte_ |
| **aws.firehose.put_record_batch_latency** <br>(gauge) | El tiempo medio que tarda cada operación PutRecordBatch.<br>_Se muestra en milisegundos_ |
| **aws.firehose.put_record_batch_latency.maximum** <br>(gauge) | El tiempo máximo que tarda cada operación PutRecordBatch.<br>_Se muestra en milisegundos_ |
| **aws.firehose.put_record_batch_records** <br>(count) | Número total de registros de las operaciones PutRecordBatch.|
| **aws.firehose.put_record_batch_records.average** <br>(gauge) | Número medio de registros por operación PutRecordBatch.|
| **aws.firehose.put_record_batch_requests** <br>(count) | Número total de solicitudes PutRecordBatch.|
| **aws.firehose.put_record_bytes** <br>(count) | Número total de bytes enviados al flujo de entrega de Firehose mediante PutRecord.<br>_Se muestra como byte_ |
| **aws.firehose.put_record_bytes.average** <br>(gauge) | El número medio de bytes por solicitud PutRecord.<br>_Se muestra como byte_ |
| **aws.firehose.put_record_latency** <br>(gauge) | El tiempo medio que tarda cada operación PutRecord.<br>_Se muestra en milisegundos_ |
| **aws.firehose.put_record_latency.maximum** <br>(gauge) | El tiempo máximo que tarda cada operación PutRecord.<br>_Se muestra en milisegundos_ |
| **aws.firehose.put_record_requests** <br>(count) | Número total de solicitudes PutRecord.|
| **aws.firehose.put_requests_per_second_limit** <br>(count) | El número máximo de solicitudes put por segundo que un flujo de entrega puede manejar antes de la limitación.|
| **aws.firehose.records_per_second_limit** <br>(count) | El número máximo actual de registros por segundo que un flujo de entrega puede ingerir antes de la limitación.|
| **aws.firehose.throttled_describe_stream** <br>(count) | Número total de veces que se ralentiza la operación DescribeStream cuando la fuente de datos es un flujo de datos de Kinesis.<br>_Se muestra en milisegundos_ |
| **aws.firehose.throttled_get_records** <br>(count) | Número total de veces que se ralentiza la operación GetRecords cuando la fuente de datos es un flujo de datos de Kinesis.<br>_Se muestra en milisegundos_ |
| **aws.firehose.throttled_get_shard_iterator** <br>(count) | El número total de veces que se ralentiza la operación GetShardIterator cuando la fuente de datos es un flujo de datos de Kinesis.<br>_Se muestra en milisegundos_ |
| **aws.firehose.throttled_records** <br>(count) | El número de registros que fueron limitados porque la ingesta de datos excedió uno de los límites de flujo de entrega.|
| **aws.firehose.update_delivery_stream_latency** <br>(gauge) | El tiempo medio que tarda cada operación UpdateDeliveryStream.<br>_Se muestra en milisegundos_ |
| **aws.firehose.update_delivery_stream_latency.maximum** <br>(gauge) | El tiempo máximo que tarda cada operación UpdateDeliveryStream.<br>_Se muestra en milisegundos_ |
| **aws.firehose.update_delivery_stream_requests** <br>(count) | Número total de solicitudes UpdateDeliveryStream.|
| **aws.firehose.update_firehose_latency** <br>(gauge) | El tiempo medio que tarda cada operación UpdateFirehose.<br>_Se muestra en milisegundos_ |
| **aws.firehose.update_firehose_latency.maximum** <br>(gauge) | El tiempo máximo que tarda cada operación UpdateFirehose.<br>_Se muestra en milisegundos_ |
| **aws.firehose.update_firehose_requests** <br>(count) | Número total de solicitudes UpdateFirehose.|

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, incluidos, entre otros, el nombre del host y los grupos de seguridad.

### Eventos

La integración de Amazon Data Firehose no incluye ningún evento.

### Checks de servicio

La integración de Amazon Data Firehose no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).