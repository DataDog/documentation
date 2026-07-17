---
app_id: amazon_elastic_transcoder
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
description: Rastrea métricas clave de Amazon Elastic Transcoder.
title: Amazon Elastic Transcoder
---
## Información general

Amazon Elastic Transcoder permite convertir archivos multimedia almacenados en Amazon S3 en formatos de archivo multimedia requeridos por los dispositivos de reproducción del usuario.

Habilita esta integración para ver todas tus métricas de Elastic Transcoder en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Elastic Transcoder` está habilitado en la pestaña `Metric Collection`.
1. Instala la integración [Datadog - Amazon Elastic Transcoder](https://app.datadoghq.com/integrations/amazon-elastic-transcoder).

### Recopilación de logs

#### Activar logging

Configura Amazon Elastic Transcoder para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_elastic_transcoder` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon Elastic Transcoder en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.elastic_transcoder.billed_audio_output** <br>(count) | Número medio de segundos facturables de salida de audio para un pipeline.<br>_Se muestra como segundos_ |
| **aws.elastic_transcoder.billed_audio_output.maximum** <br>(count) | Número máximo de segundos facturables de salida de audio para un pipeline.<br>_Se muestra como segundos_ |
| **aws.elastic_transcoder.billed_audio_output.minimum** <br>(count) | Número mínimo de segundos facturables de salida de audio para un pipeline.<br>_Se muestra como segundos_ |
| **aws.elastic_transcoder.billed_hd_output** <br>(count) | Número medio de segundos facturables de salida HD para un pipeline.<br>_Se muestra como segundos_ |
| **aws.elastic_transcoder.billed_hd_output.maximum** <br>(count) | Número máximo de segundos facturables de salida HD para un pipeline.<br>_Se muestra como segundos_ |
| **aws.elastic_transcoder.billed_hd_output.minimum** <br>(count) | Número mínimo de segundos facturables de salida HD para un pipeline.<br>_Se muestra como segundos_ |
| **aws.elastic_transcoder.billed_sd_output** <br>(count) | Número medio de segundos facturables de salida SD para un pipeline.<br>_Se muestra como segundos_ |
| **aws.elastic_transcoder.billed_sd_output.maximum** <br>(count) | Número máximo de segundos facturables de salida SD para un pipeline.<br>_Se muestra como segundos_ |
| **aws.elastic_transcoder.billed_sd_output.minimum** <br>(count) | Número mínimo de segundos facturables de salida SD para un pipeline.<br>_Se muestra como segundos_ |
| **aws.elastic_transcoder.errors** <br>(count) | Número de errores causados por parámetros de funcionamiento no válidos.|
| **aws.elastic_transcoder.errors.minimum** <br>(count) | Número mínimo de errores causados por parámetros de funcionamiento no válidos.|
| **aws.elastic_transcoder.jobs_completed** <br>(count) | Número medio de trabajos completados por este pipeline.|
| **aws.elastic_transcoder.jobs_completed.maximum** <br>(count) | Número medio máximo de trabajos completados por este pipeline.|
| **aws.elastic_transcoder.jobs_completed.minimum** <br>(count) | Número medio mínimo de trabajos completados por este pipeline.|
| **aws.elastic_transcoder.jobs_errored** <br>(count) | Número de trabajos que han fallado debido a entradas no válidas, como una solicitud de transcodificación de un archivo que no está en el bucket de entrada dado.|
| **aws.elastic_transcoder.jobs_errored.maximum** <br>(count) | Número máximo de trabajos que han fallado debido a entradas no válidas, como una solicitud de transcodificación de un archivo que no está en el bucket de entrada dado.|
| **aws.elastic_transcoder.jobs_errored.minimum** <br>(count) | Número mínimo de trabajos que han fallado debido a entradas no válidas, como una solicitud de transcodificación de un archivo que no está en el bucket de entrada dado.|
| **aws.elastic_transcoder.maximum.errors** <br>(count) | Número máximo de errores causados por parámetros de funcionamiento no válidos.|
| **aws.elastic_transcoder.outputs_per_job** <br>(count) | Número de salidas de Elastic Transcoder creadas para un trabajo.|
| **aws.elastic_transcoder.outputs_per_job.maximum** <br>(count) | Número máximo de salidas de Elastic Transcoder creadas para un trabajo.|
| **aws.elastic_transcoder.outputs_per_job.minimum** <br>(count) | Número mínimo de salidas de Elastic Transcoder creadas para un trabajo.|
| **aws.elastic_transcoder.standby_time** <br>(count) | Número de segundos transcurridos antes de que Elastic Transcoder iniciara la transcodificación de un trabajo.<br>_Se muestra como segundos_ |
| **aws.elastic_transcoder.standby_time.maximum** <br>(count) | Número máximo de segundos transcurridos antes de que Elastic Transcoder iniciara la transcodificación de un trabajo.<br>_Se muestra como segundos_ |
| **aws.elastic_transcoder.standby_time.minimum** <br>(count) | Número mínimo de segundos transcurridos antes de que Elastic Transcoder iniciara la transcodificación de un trabajo.<br>_Se muestra como segundos_ |
| **aws.elastic_transcoder.throttles** <br>(count) | Número de veces que Elastic Transcoder ha limitado automáticamente una operación.|
| **aws.elastic_transcoder.throttles.maximum** <br>(count) | Número máximo de veces que Elastic Transcoder ha limitado automáticamente una operación.|
| **aws.elastic_transcoder.throttles.minimum** <br>(count) | Número mínimo de veces que Elastic Transcoder ha limitado automáticamente una operación.|

### Eventos

La integración de Amazon Elastic Transcoder no incluye eventos.

### Checks de servicio

La integración de Amazon Elastic Transcoder no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).