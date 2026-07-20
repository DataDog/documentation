---
app_id: amazon_translate
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
description: Rastrea métricas clave de Amazon Translate.
title: Amazon Translate
---
## Información general

Amazon Translate es un servicio de traducción automática neuronal para traducir texto desde y hacia el inglés en una amplia gama de idiomas admitidos.

Habilita esta integración para ver todas tus métricas de Translate en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Translate` está activado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y Amazon Translate](https://app.datadoghq.com/integrations/amazon-translate).

### Recopilación de logs

#### Activar logging

Configura Amazon Translate para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si generas logs en un bucket de S3, asegúrate de que `amazon_translate` esté configurado como _Prefijo de destino_.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon Translate en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.translate.character_count** <br>(count) | Número medio de caracteres facturables en las solicitudes.|
| **aws.translate.character_count.maximum** <br>(count) | Número máximo de caracteres facturables en las solicitudes.|
| **aws.translate.character_count.minimum** <br>(count) | Número mínimo de caracteres facturables en las solicitudes.|
| **aws.translate.response_time** <br>(count) | El tiempo que se tardó en responder a una solicitud.<br>_Se muestra como milisegundo_ |
| **aws.translate.response_time.data_samples** <br>(count) | Muestra de datos del tiempo que se tardó en responder a una solicitud.|
| **aws.translate.server_error_count** <br>(count) | Número de errores del servidor.|
| **aws.translate.server_error_count.sum** <br>(count) | La suma del número de errores del servidor.|
| **aws.translate.successful_request_count** <br>(count) | Número medio de solicitudes de traducción realizadas con éxito.|
| **aws.translate.successful_request_count.sum** <br>(count) | La suma del número de solicitudes de traducción realizadas con éxito.|
| **aws.translate.throttled_count** <br>(count) | Número medio de solicitudes sujetas a limitación.|
| **aws.translate.throttled_count.sum** <br>(count) | La suma del número de solicitudes sujetas a limitación.|
| **aws.translate.user_error_count** <br>(count) | Número medio de errores de usuario que se han producido.|
| **aws.translate.user_error_count.sum** <br>(count) | La suma del número de errores de usuario que se han producido.|

### Eventos

La integración Amazon Translate no incluye eventos.

### Checks de servicio

La integración Amazon Translate no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).