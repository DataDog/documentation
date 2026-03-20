---
aliases:
- /es/integrations/amazon_mediaconvert
app_id: amazon-mediaconvert
categories:
- aws
- métricas
- recopilación de logs
- nube
custom_kind: integración
description: Formatea y comprime contenidos de vídeo para televisores y dispositivos
  conectados
media: []
title: Amazon MediaConvert
---
## Información general

AWS Elemental MediaConvert es un servicio que formatea y comprime contenidos de vídeo fuera de línea para su envío a televisores o dispositivos conectados.

Habilita esta integración para ver todas tus métricas de Elemental MediaConvert en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `MediaConvert` está habilitado en la pestaña `Metric Collection`.
1. Instala la integración de [Datadog y AWS Elemental MediaConvert](https://app.datadoghq.com/integrations/amazon-mediaconvert).

### Recopilación de logs

#### Activar logging

Configura AWS Elemental MediaConvert para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_mediaconvert` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de AWS Elemental MediaConvert en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.mediaconvert.8koutput_duration** <br>(count) | El número de milisegundos de salida de 8K para una cola.<br>_Se muestra como milisegundo_ |
| **aws.mediaconvert.audio_output_duration** <br>(count) | El número de milisegundos de salida de solo audio para una cola.<br>_Se muestra como milisegundo_ |
| **aws.mediaconvert.errors** <br>(count) | Número de errores causados por parámetros de operación no válidos, como una solicitud de estado del trabajo que no incluye el ID de trabajo.<br>_Se muestra como error_ |
| **aws.mediaconvert.hdoutput_duration** <br>(count) | El número de milisegundos de salida de alta definición (HD) para una cola.<br>_Se muestra como milisegundo_ |
| **aws.mediaconvert.jobs_completed_count** <br>(count) | El número de trabajos completados en esta cola.<br>_Se muestra como trabajo_ |
| **aws.mediaconvert.jobs_errored_count** <br>(count) | El número de trabajos que fallaron debido a entradas no válidas.<br>_Se muestra como trabajo_ |
| **aws.mediaconvert.sdoutput_duration** <br>(count) | El número de milisegundos de salida de definición estándar (SD) para una cola.<br>_Se muestra como milisegundo_ |
| **aws.mediaconvert.standby_time** <br>(count) | El número de milisegundos antes de que AWS Elemental MediaConvert comienza la transcodificación de un trabajo.<br>_Se muestra como milisegundo_ |
| **aws.mediaconvert.transcoding_time** <br>(count) | El número de milisegundos que tarda AWS Elemental MediaConvert en completar la transcodificación.<br>_Se muestra como milisegundo_ |
| **aws.mediaconvert.uhdoutput_duration** <br>(count) | El número de milisegundos de salida de ultra alta definición (UHD) para una cola.<br>_Se muestra como milisegundo_ |

### Eventos

La integración de AWS Elemental MediaConvert no incluye ningún evento.

### Checks de servicio

La integración de AWS Elemental MediaConvert no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).