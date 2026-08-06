---
app_id: amazon_rekognition
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
description: Rastrea métricas clave de Amazon Rekognition.
title: Amazon Rekognition
---
## Información general

Amazon Rekognition facilita la incorporación del análisis de imágenes y vídeo a tus aplicaciones. Solo tienes que proporcionar una imagen o vídeo a la API de Rekognition y el servicio podrá identificar objetos, personas, texto, escenas y actividades.

Habilita esta integración para ver todas tus métricas de Rekognition en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Rekognition` está activado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y Amazon Rekognition](https://app.datadoghq.com/integrations/amazon-rekognition).

### Recopilación de logs

#### Activar logging

Configura Amazon Rekognition para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_rekognition` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon Rekognition en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.rekognition.deteceted_label_count** <br>(count) | El número medio de etiquetas detectadas con la operación DetectLabels.|
| **aws.rekognition.deteceted_label_count.sum** <br>(count) | La suma del número de etiquetas detectadas con la operación DetectLabels.|
| **aws.rekognition.detected_face_count** <br>(count) | Número medio de caras detectadas con la operación IndexFaces o DetectFaces.|
| **aws.rekognition.detected_face_count.sum** <br>(count) | La suma del número de caras detectadas con la operación IndexFaces o DetectFaces.|
| **aws.rekognition.response_time** <br>(count) | El tiempo en milisegundos para que Rekognition calcule la respuesta.<br>_Se muestra como milisegundo_ |
| **aws.rekognition.response_time.data_samples** <br>(count) | El tiempo en milisegundos para que Rekognition calcule la respuesta.|
| **aws.rekognition.server_error_count** <br>(count) | Número de errores del servidor.|
| **aws.rekognition.server_error_count.sum** <br>(count) | La suma del número de errores del servidor.|
| **aws.rekognition.successful_request_count** <br>(count) | Número medio de solicitudes aceptadas.|
| **aws.rekognition.successful_request_count.sum** <br>(count) | La suma del número de solicitudes aceptadas.|
| **aws.rekognition.throttled_count** <br>(count) | El número medio de solicitudes limitadas. Rekognition limita una solicitud cuando recibe más solicitudes que el límite de transacciones por segundo establecido para tu cuenta.|
| **aws.rekognition.throttled_count.sum** <br>(count) | La suma del número de solicitudes limitadas. Rekognition limita una solicitud cuando recibe más solicitudes que el límite de transacciones por segundo establecido para tu cuenta.|
| **aws.rekognition.user_error_count** <br>(count) | El número medio de errores de usuario (parámetros no válidos, imagen no válida, sin permiso, etc.).|
| **aws.rekognition.user_error_count.sum** <br>(count) | La suma del número de errores de usuario (parámetros no válidos, imagen no válida, sin permiso, etc.).|

### Eventos

La integración de Amazon Rekognition no incluye ningún evento.

### Checks de servicio

La integración de Amazon Rekognition no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).