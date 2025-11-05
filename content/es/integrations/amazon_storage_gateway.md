---
aliases:
- /es/integrations/awsstoragegateway/
app_id: amazon_storage_gateway
categories:
- cloud
- data stores
- aws
- log collection
custom_kind: integración
description: Realiza un seguimiento de las métricas clave de AWS Storage Gateway.
title: AWS Storage Gateway
---
## Información general

AWS Storage Gateway proporciona una integración segura y sin fisuras entre el entorno de TI de una organización y la infraestructura de almacenamiento de AWS.

Habilita esta integración para ver en Datadog todas tus métricas de Storage Gateway.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `StorageGateway` está habilitado en la pestaña `Metric Collection`.
1. Instala la integración [Datadog - AWS Storage Gateway](https://app.datadoghq.com/integrations/amazon-storage-gateway).

### Recopilación de logs

#### Activar logging

Configura AWS Storage Gateway para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si generas logs en un bucket de S3, asegúrate de que `amazon_storage_gateway` esté configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de AWS Storage Gateway en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.storagegateway.cache_hit_percent** <br>(gauge) | Porcentaje de lecturas de aplicación entregadas desde la caché.<br>_Se muestra como porcentaje_ |
| **aws.storagegateway.cache_percent_dirty** <br>(gauge) | Porcentaje de la caché de la puerta de enlace que no se ha mantenido en AWS.<br>_Se muestra como porcentaje_ |
| **aws.storagegateway.cache_percent_used** <br>(gauge) | Porcentaje de uso del almacenamiento en caché de la puerta de enlace.<br>_Se muestra como porcentaje_ |
| **aws.storagegateway.cloud_bytes_downloaded** <br>(count) | Número total de bytes comprimidos que la puerta de enlace ha descargado de AWS.<br>_Se muestra como byte_ |
| **aws.storagegateway.cloud_bytes_uploaded** <br>(count) | Número total de bytes comprimidos que la puerta de enlace ha cargado en AWS.<br>_Se muestra como byte_ |
| **aws.storagegateway.cloud_download_latency** <br>(gauge) | Número total de milisegundos transcurridos leyendo datos de AWS.<br>_Se muestra como milisegundo_ |
| **aws.storagegateway.queued_writes** <br>(count) | Número de bytes que esperan ser escritos en AWS. Estos bytes se guardan en el almacenamiento activo de tu puerta de enlace.<br>_Se muestra como byte_ |
| **aws.storagegateway.read_bytes** <br>(count) | Número total de bytes leídos de tus aplicaciones on-premises durante el periodo de notificación para todos los volúmenes de la puerta de enlace.<br>_Se muestra como byte_ |
| **aws.storagegateway.read_time** <br>(gauge) | Número total de milisegundos empleados en realizar operaciones de lectura de tus aplicaciones on-premises para todos los volúmenes de la puerta de enlace.<br>_Se muestra como milisegundo_ |
| **aws.storagegateway.time_since_last_recovery_point** <br>(gauge) | Tiempo transcurrido desde el último punto de recuperación disponible.<br>_Se muestra como segundo_ |
| **aws.storagegateway.total_cache_size** <br>(gauge) | Tamaño total de la caché en bytes. Esta métrica sólo se aplica a la configuración del volumen en caché en una puerta de enlace.<br>_Se muestra como byte_ |
| **aws.storagegateway.upload_buffer_free** <br>(gauge) | Cantidad total de espacio no utilizado en el búfer de carga de la puerta de enlace.<br>_Se muestra como byte_ |
| **aws.storagegateway.upload_buffer_percent_used** <br>(gauge) | Porcentaje de uso del búfer de carga de la puerta de enlace.<br>_Se muestra como porcentaje_ |
| **aws.storagegateway.upload_buffer_used** <br>(gauge) | Número total de bytes que se están utilizando en el búfer de carga de la puerta de enlace.<br>_Se muestra como byte_ |
| **aws.storagegateway.working_storage_free** <br>(gauge) | Cantidad total de espacio no utilizado en el almacenamiento activo de la puerta de enlace.<br>_Se muestra como byte_ |
| **aws.storagegateway.working_storage_percent_used** <br>(gauge) | Porcentaje de uso del búfer de carga de la puerta de enlace.<br>_Se muestra como porcentaje_ |
| **aws.storagegateway.working_storage_used** <br>(gauge) | Número total de bytes que se están utilizando en el búfer de carga de la puerta de enlace.<br>_Se muestra como byte_ |
| **aws.storagegateway.write_bytes** <br>(count) | Número total de bytes escritos a tus aplicaciones on-premises para todos los volúmenes de la puerta de enlace.<br>_Se muestra como byte_ |
| **aws.storagegateway.write_time** <br>(gauge) | Número total de milisegundos empleados en realizar operaciones de escritura de tus aplicaciones on-premises para todos los volúmenes de la puerta de enlace.<br>_Se muestra como milisegundo_ |

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración de AWS Storage Gateway no incluye ningún evento.

### Checks de servicio

La integración de AWS Storage Gateway no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).