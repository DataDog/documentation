---
aliases:
- /es/integrations/amazon_dynamodb
app_id: amazon-dynamodb
categories:
- aws
- métricas
- nube
custom_kind: integración
description: Amazon DynamoDB es un servicio de base de datos NoSQL rápido y flexible
integration_version: 1.0.0
media: []
title: Amazon DynamoDB
---
![DynamoDB default dashboard](images/dynamodb.png)

## Información general

Amazon DynamoDB es un servicio en la nube de base de datos NoSQL totalmente gestionado, que forma parte de la cartera de AWS. Rápido y fácilmente escalable, está pensado para servir a aplicaciones que requieren una latencia muy baja, incluso cuando se trata de grandes cantidades de datos. Es compatible con los modelos de almacén de documentos y de clave-valor, y tiene propiedades tanto de base de datos como de tabla hash distribuida.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `DynamoDB` está habilitado en la pestaña `Metric Collection`.

1. Añade estos permisos a tu [política de Datadog IAM](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) para recopilar métricas de Amazon DynamoDB:

   - `dynamodb:ListTables`: se utiliza para hacer una lista de las tablas de DynamoDB disponibles.
   - `dynamodb:DescribeTable`: se utiliza para añadir métricas sobre el tamaño de una tabla y el recuento de elementos.
   - `dynamodb:ListTagsOfResource`: se utiliza para recopilar todas las etiquetas (tags) de un recurso de DynamoDB.

   Para obtener más información, consulta las [políticas de DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/authentication-and-access-control.html) en el sitio web de AWS.

1. Instala la integración [Datadog - Amazon DynamoDB](https://app.datadoghq.com/integrations/amazon-dynamodb).

### Recopilación de logs

#### Activar logging

En AWS CloudTrail, [crea un trail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html) y selecciona un bucket S3 en el que escribir los logs.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/) en tu cuenta de AWS.
1. Una vez configurada, ve a la función de Lambda del Datadog Forwarder. En la sección Información general de la función, haz clic en **Add Trigger** (Añadir activador).
1. Para configurar un activador, selecciona el activador **S3**.
1. Selecciona el bucket de S3 que contiene tus logs de Amazon DynamoDB.
1. Deja el tipo de evento como `All object create events`.
1. Haz clic en **Add** (Añadir) para añadir el activador a tu Lambda.

Ve al [Log Explorer](https://app.datadoghq.com/logs) para empezar a explorar tus logs.

Para obtener más información sobre la recopilación de logs de servicios de AWS, consulta [Enviar logs de servicios de AWS con la función Lambda de Datadog](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.dynamodb.account_max_reads** <br>(count) | Número máximo de unidades de capacidad de lectura que puede utilizar una cuenta.<br>_Se muestra como lectura_ |
| **aws.dynamodb.account_max_table_level_reads** <br>(count) | Número máximo de unidades de capacidad de lectura que una tabla o un índice secundario global de una cuenta pueden utilizar.<br>_Se muestra como lectura_ |
| **aws.dynamodb.account_max_table_level_writes** <br>(count) | Número máximo de unidades de capacidad de escritura que una tabla o un índice secundario global de una cuenta pueden utilizar.<br>_Se muestra como lectura_ |
| **aws.dynamodb.account_max_writes** <br>(count) | Número máximo de unidades de capacidad de escritura que una cuenta puede utilizar.<br>_Se muestra como escritura_ |
| **aws.dynamodb.account_provisioned_read_capacity_utilization** <br>(gauge) | Porcentaje de unidades de capacidad de lectura provisionadas, utilizadas por una cuenta.<br>_Se muestra como porcentaje_ |
| **aws.dynamodb.account_provisioned_write_capacity_utilization** <br>(gauge) | Porcentaje de unidades de capacidad de escritura provisionadas, utilizadas por una cuenta.<br>_Se muestra como porcentaje_ |
| **aws.dynamodb.conditional_check_failed_requests** <br>(count) | Número de intentos fallidos de realizar escrituras condicionales.<br>_Se muestra como solicitud_ |
| **aws.dynamodb.consumed_read_capacity_units** <br>(gauge) | Número medio de unidades de capacidad de lectura consumidas en un segundo. Puede compararse directamente con el número de unidades de capacidad de lectura provisionadas.<br>_Se muestra como unidad_ |
| **aws.dynamodb.consumed_write_capacity_units** <br>(gauge) | Número medio de unidades de capacidad de escritura consumidas en un segundo. Puede compararse directamente con el número de unidades de capacidad de escritura provisionadas.<br>_Se muestra como unidad_ |
| **aws.dynamodb.max_provisioned_table_read_capacity_utilization** <br>(gauge) | Porcentaje de unidades de capacidad de lectura provisionadas, utilizadas por la tabla de lectura provisionada más elevada o el índice secundario global de una cuenta.<br>_Se muestra como unidad_ |
| **aws.dynamodb.max_provisioned_table_write_capacity_utilization** <br>(gauge) | Porcentaje de unidades de capacidad de escritura provisionadas, utilizadas por la tabla de escritura provisionada más elevada o el índice secundario global de una cuenta.<br>_Se muestra como unidad_ |
| **aws.dynamodb.online_index_consumed_write_capacity** <br>(gauge) | Número de unidades de capacidad de escritura consumidas al añadir un nuevo índice secundario global a una tabla.<br>_Se muestra como unidad_ |
| **aws.dynamodb.online_index_percentage_progress** <br>(gauge) | Porcentaje de finalización cuando se añade un nuevo índice secundario global a una tabla.<br>_Se muestra como porcentaje_ |
| **aws.dynamodb.online_index_throttle_events** <br>(gauge) | Número de eventos de limitación de escritura que se producen al añadir un nuevo índice secundario global a una tabla.<br>_Se muestra como evento_ |
| **aws.dynamodb.pending_replication_count** <br>(count) | (Esta métrica es para las tablas globales de DynamoDB.) Número de actualizaciones de elementos que se escriben en una replicación de tabla, pero que aún no se han escrito en otra réplica de la tabla global.<br>_Se muestra como unidad_ |
| **aws.dynamodb.provisioned_read_capacity_units** <br>(gauge) | Número de unidades de capacidad de lectura provisionadas para una tabla o un índice secundario global.<br>_Se muestra como unidad_ |
| **aws.dynamodb.provisioned_write_capacity_units** <br>(gauge) | Número de unidades de capacidad de escritura provisionadas para una tabla o un índice secundario global.<br>_Se muestra como unidad_ |
| **aws.dynamodb.read_throttle_events** <br>(count) | Número de eventos de lectura que han superado los límites de rendimiento provisionados en el periodo de tiempo especificado.<br>_Se muestra como lectura_ |
| **aws.dynamodb.replication_latency** <br>(gauge) | (Esta métrica es para las tablas globales de DynamoDB.) Tiempo transcurrido entre la aparición de un elemento actualizado en el flujo (stream) de DynamoDB para una replicación de tabla y la aparición de ese elemento en otra réplica de la tabla global.<br>_Se muestra como milisegundos_ |
| **aws.dynamodb.returned_bytes** <br>(gauge) | Número de bytes devueltos por operaciones GetRecords (Amazon DynamoDB Streams) durante el periodo de tiempo especificado.<br>_Se muestra como bytes_ |
| **aws.dynamodb.returned_item_count** <br>(gauge) | Número medio de elementos devueltos por una operación de análisis o consulta.<br>_Se muestra como elemento_ |
| **aws.dynamodb.returned_item_count.maximum** <br>(gauge) | Número máximo de elementos devueltos por una operación de análisis o consulta.<br>_Se muestra como elemento_ |
| **aws.dynamodb.returned_item_count.minimum** <br>(gauge) | Número mínimo de elementos devueltos por una operación de análisis o consulta.<br>_Se muestra como elemento_ |
| **aws.dynamodb.returned_item_count.samplecount** <br>(count) | Número de operaciones de análisis o consulta.<br>_Se muestra como elemento_ |
| **aws.dynamodb.returned_item_count.sum** <br>(count) | Número total de elementos devueltos por una operación de análisis o consulta.<br>_Se muestra como elemento_ |
| **aws.dynamodb.returned_records_count** <br>(count) | Número de registros de flujos devueltos por operaciones GetRecords (Amazon DynamoDB Streams) durante el periodo de tiempo especificado.<br>_Se muestra como elemento_. |
| **aws.dynamodb.successful_request_latency** <br>(gauge) | Latencia media de las solicitudes exitosas.<br>_Se muestra como milisegundos_ |
| **aws.dynamodb.successful_request_latency.maximum** <br>(gauge) | Latencia máxima de las solicitudes exitosas.<br>_Se muestra como milisegundos_ |
| **aws.dynamodb.successful_request_latency.minimum** <br>(gauge) | Latencia mínima de las solicitudes exitosas.<br>_Se muestra como milisegundos_ |
| **aws.dynamodb.successful_request_latency.samplecount** <br>(count) | Número total de solicitudes aceptadas.<br>_Se muestra como solicitud_ |
| **aws.dynamodb.system_errors** <br>(count) | Número de solicitudes que generan una respuesta de código de estado 500.<br>_Se muestra como solicitud_ |
| **aws.dynamodb.throttled_requests** <br>(count) | Número de solicitudes de usuarios que han superado los límites de rendimiento provisionados.<br>_Se muestra como solicitud_ |
| **aws.dynamodb.time_to_live_deleted_item_count** <br>(count) | Número de elementos eliminados por tiempo de vida (TTL) durante el período de tiempo especificado.<br>_Se muestra como elemento_ |
| **aws.dynamodb.transaction_conflict** <br>(count) | Solicitudes rechazadas a nivel de elemento debido a conflictos transaccionales entre solicitudes simultáneas sobre los mismos elementos.<br>_Se muestra como solicitud_ |
| **aws.dynamodb.user_errors** <br>(count) | Agregado de errores HTTP 400 de solicitudes de DynamoDB o Amazon DynamoDB Streams para la región actual y la cuenta de AWS actual.<br>_Se muestra como solicitud_ |
| **aws.dynamodb.write_throttle_events** <br>(count) | Número de eventos de escritura que han excedido los límites de rendimiento provisionados en el periodo de tiempo especificado.<br>_Se muestra como escritura_ |
| **aws.dynamodb.global_secondary_indexes.index_size_bytes** <br>(gauge) | Tamaño total del índice secundario especificado<br>_Se muestra como bytes_ |
| **aws.dynamodb.global_secondary_indexes.item_count** <br>(gauge) | Número de elementos en el índice secundario especificado<br>_Se muestra como elemento_ |
| **aws.dynamodb.item_count** <br>(gauge) | Número aproximado de elementos en la tabla (se actualiza cada 6h).<br>_Se muestra como elemento_ |
| **aws.dynamodb.table_size** <br>(gauge) | Tamaño aproximado de la tabla (se actualiza cada 6h).<br>_Se muestra como bytes_ |

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración de Amazon DynamoDB no incluye ningún evento.

### Checks de servicio

La integración de Amazon DynamoDB no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).