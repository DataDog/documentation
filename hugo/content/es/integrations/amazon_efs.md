---
aliases:
- /es/integrations/awsefs/
app_id: amazon_efs
categories:
- aws
- cloud
- data stores
- log collection
- os & system
custom_kind: integración
description: Realiza un seguimiento de las métricas clave de Amazon Elastic File System.
title: Amazon Elastic File System
---
## Información general

Amazon EFS proporciona un almacenamiento de archivos sencillo y escalable para su uso con funciones AWS Lambda o instancias de Amazon EC2.

Habilita esta integración para recopilar tus métricas EFS en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `EFS` está habilitado en la pestaña `Metric Collection`.

1. Añade estos permisos a tu [política de Datadog IAM](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) para recopilar métricas de Amazon EFS:

   - `elasticfilesystem:DescribeTags`: Obtiene las etiquetas (tags) personalizadas aplicadas a sistemas de archivos
   - `elasticfilesystem:DescribeFileSystems`: Proporciona una lista de los sistemas de archivos activos

   Para obtener más información, consulta las [políticas de EFS](https://docs.aws.amazon.com/efs/latest/ug/auth-and-access-control.html) en el sitio web de AWS.

1. Instala la integración [Datadog - Amazon EFS](https://app.datadoghq.com/integrations/amazon-efs).

### Recopilación de logs

#### Activar logging

Configura Amazon EFS para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si generas logs en un bucket de S3, asegúrate de que `amazon_efs` esté configurado como Prefijo de destino.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon EFS en la consola de AWS.

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

### Amazon EFS para Lambda

[Amazon EFS para Lambda](https://docs.datadoghq.com/integrations/amazon_lambda/) te permite conectar un EFS a tus funciones Lambda. Las organizaciones pueden utilizar EFS para Lambda para simplificar sus cargas de trabajo de Machine Learning y el procesamiento de datos para que sean completamente serverless. Para dividir métricas y logs de Lambda por EFS:

1. Instala la [integración AWS Lambda](https://docs.datadoghq.com/integrations/amazon_lambda/#aws-lambda-metrics) y activa la recopilación de métricas.

1. Añade este permiso a tu [política Datadog IAM](https://docs.datadoghq.com/integrations/amazon_web_services/#installation):

   - `elasticfilesystem:DescribeAccessPoints`: Enumera los EFS activos conectados a funciones Lambda

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.efs.burst_credit_balance** <br>(gauge) | El saldo medio de crédito de ráfaga durante el período.<br>_Se muestra como byte_ |
| **aws.efs.burst_credit_balance.maximum** <br>(gauge) | El mayor saldo de crédito de ráfaga de cualquier minuto durante el período.<br>_Se muestra como byte_ |
| **aws.efs.burst_credit_balance.minimum** <br>(gauge) | El menor saldo de crédito de ráfaga de cualquier minuto durante el período.<br>_Se muestra como byte_ |
| **aws.efs.client_connections** <br>(count) | Número de instancias de Amazon EC2 conectadas a un sistema de archivos.|
| **aws.efs.data_read_iobytes** <br>(count) | Número total de bytes asociados a las operaciones de lectura.<br>_Se muestra como byte_ |
| **aws.efs.data_read_iobytes.average** <br>(count) | Tamaño medio de las operaciones de lectura durante el periodo.<br>_Se muestra como byte_ |
| **aws.efs.data_read_iobytes.maximum** <br>(count) | Tamaño de la mayor operación de lectura durante el periodo.<br>_Se muestra como byte_ |
| **aws.efs.data_read_iobytes.minimum** <br>(count) | Tamaño de la menor operación de lectura durante el periodo.<br>_Se muestra como byte_ |
| **aws.efs.data_read_iobytes.samplecount** <br>(count) | Recuento de muestras del número de puntos de datos utilizados para las métricas de las operaciones de lectura.<br>_Se muestra como unidad_ |
| **aws.efs.data_write_iobytes** <br>(count) | Suma del número de bytes asociados a las operaciones de escritura.<br>_Se muestra como byte_ |
| **aws.efs.data_write_iobytes.average** <br>(count) | Tamaño medio de las operaciones de escritura durante el periodo.<br>_Se muestra como byte_ |
| **aws.efs.data_write_iobytes.maximum** <br>(count) | Tamaño de la mayor operación de escritura durante el periodo.<br>_Se muestra como byte_ |
| **aws.efs.data_write_iobytes.minimum** <br>(count) | Tamaño de la menor operación de escritura durante el periodo.<br>_Se muestra como byte_ |
| **aws.efs.data_write_iobytes.samplecount** <br>(count) | Recuento de muestras del número de puntos de datos utilizados para las métricas de las operaciones de escritura.<br>_Se muestra como unidad_ |
| **aws.efs.metadata_iobytes** <br>(count) | Número total de bytes asociados a las operaciones de metadatos.<br>_Se muestra como byte_ |
| **aws.efs.metadata_iobytes.average** <br>(count) | Operación media de metadatos durante el periodo.<br>_Se muestra como byte_ |
| **aws.efs.metadata_iobytes.maximum** <br>(count) | Tamaño de la mayor operación de metadatos durante el periodo.<br>_Se muestra como byte_ |
| **aws.efs.metadata_iobytes.minimum** <br>(count) | Tamaño de la menor operación de metadatos durante el periodo.<br>_Se muestra como byte_ |
| **aws.efs.metadata_iobytes.samplecount** <br>(count) | Recuento de muestras del número de puntos de datos utilizados para las métricas de las operaciones de metadatos.<br>_Se muestra como unidad_ |
| **aws.efs.metered_iobytes** <br>(gauge) | Tamaño medio de una operación durante el periodo.<br>_Se muestra como byte_ |
| **aws.efs.metered_iobytes.maximum** <br>(gauge) | Tamaño de la mayor operación durante el periodo.<br>_Se muestra como byte_ |
| **aws.efs.metered_iobytes.minimum** <br>(gauge) | Tamaño de la menor operación durante el periodo.<br>_Se muestra como byte_ |
| **aws.efs.metered_iobytes.samplecount** <br>(gauge) | Recuento de las operaciones de metadatos.<br>_Se muestra como byte_ |
| **aws.efs.metered_iobytes.sum** <br>(gauge) | Número total de bytes asociados a las operaciones de metadatos.<br>_Se muestra como byte_ |
| **aws.efs.percent_iolimit** <br>(gauge) | Muestra cuán cerca está un sistema de archivos de alcanzar el límite de E/S del modo de rendimiento de propósito general.<br>_Se muestra como porcentaje_ |
| **aws.efs.permitted_throughput** <br>(gauge) | Rendimiento medio permitido durante el periodo.<br>_Se muestra como byte_ |
| **aws.efs.permitted_throughput.maximum** <br>(gauge) | El mayor rendimiento permitido para cualquier minuto durante el periodo.<br>_Se muestra como byte_ |
| **aws.efs.permitted_throughput.minimum** <br>(gauge) | El menor rendimiento permitido para cualquier minuto durante el periodo.<br>_Se muestra como byte_ |
| **aws.efs.storage_bytes** <br>(gauge) | Último tamaño medido conocido (en bytes) de los datos almacenados en el sistema de archivos, incluidas ambas clases de almacenamiento.<br>_Se muestra como byte_ |
| **aws.efs.total_iobytes** <br>(count) | Número total de bytes asociados con todas las operaciones del sistema de archivos<br>_Se muestra como byte_ |
| **aws.efs.total_iobytes.average** <br>(count) | Tamaño medio de una operación durante el periodo<br>_Se muestra como byte_ |
| **aws.efs.total_iobytes.maximum** <br>(count) | Tamaño de la mayor operación durante el periodo.<br>_Se muestra como byte_ |
| **aws.efs.total_iobytes.minimum** <br>(count) | Tamaño de la menor operación durante el periodo.<br>_Se muestra como byte_ |
| **aws.efs.total_iobytes.samplecount** <br>(count) | Recuento de muestras del número de puntos de datos utilizados para las métricas de las operaciones del sistema de archivos.<br>_Se muestra como unidad_ |

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración Amazon Elastic File System no incluye eventos.

### Checks de servicio

La integración Amazon Elastic File System no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).