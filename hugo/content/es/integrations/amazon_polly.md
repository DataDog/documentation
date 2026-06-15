---
aliases:
- /es/integrations/awspolly/
app_id: amazon_polly
categories:
- cloud
- aws
- log collection
custom_kind: integración
description: Rastrea métricas clave de Amazon Polly.
title: Amazon Polly
---
## Información general

Amazon Polly es un servicio que convierte el texto en voz real.

Habilita esta integración para ver en Datadog todas tus métricas de Polly.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Polly` está habilitado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y Amazon Polly](https://app.datadoghq.com/integrations/amazon-polly).

### Recopilación de logs

#### Activar logging

Configura Amazon Polly para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_polly` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de Amazon Polly en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.polly.2xx_count** <br>(count) | Número total de códigos HTTP de nivel 200 devueltos tras una respuesta correcta.<br>_Se muestra como respuesta_ |
| **aws.polly.4xx_count** <br>(count) | Número total de códigos HTTP de nivel 400 devueltos tras una respuesta correcta. Por cada respuesta correcta, se emite un cero (0).<br>_Se muestra como respuesta_ |
| **aws.polly.5xx_count** <br>(count) | Número total de códigos HTTP de nivel 500 devueltos tras una respuesta satisfactoria. Por cada respuesta correcta, se emite un cero (0).<br>_Se muestra como respuesta_ |
| **aws.polly.request_characters** <br>(gauge) | Número medio de caracteres de la solicitud. Se trata únicamente de los caracteres facturables y no incluye las etiquetas SSML.|
| **aws.polly.request_characters.maximum** <br>(gauge) | El número máximo de caracteres de la solicitud. Se trata únicamente de caracteres facturables y no incluye etiquetas SSML.|
| **aws.polly.request_characters.minimum** <br>(gauge) | El número mínimo de caracteres de la solicitud. Se trata únicamente de caracteres facturables y no incluye etiquetas SSML.|
| **aws.polly.request_characters.sum** <br>(count) | El número total de caracteres de la solicitud. Se trata únicamente de los caracteres facturables y no incluye las etiquetas SSML.|
| **aws.polly.response_latency** <br>(gauge) | La latencia media entre el momento en que se realizó la solicitud y el inicio de la respuesta de transmisión.<br>_Se muestra en milisegundos_ |
| **aws.polly.response_latency.maximum** <br>(gauge) | La latencia mínima entre el momento en que se realizó la solicitud y el inicio de la respuesta de transmisión.<br>_Se muestra en milisegundos_ |
| **aws.polly.response_latency.minimum** <br>(gauge) | La latencia mínima entre el momento en que se realizó la solicitud y el inicio de la respuesta de transmisión.<br>_Se muestra en milisegundos_ |
| **aws.polly.response_latency.samplecount** <br>(count) | El número total de respuestas correctas<br>_Se muestra como respuesta_ |
| **aws.polly.response_latency.sum** <br>(count) | La suma de la latencia entre el momento en que se realizó la solicitud y el inicio de la respuesta de transmisión.<br>_Se muestra en milisegundos_ |

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración de Amazon Polly no incluye ningún evento.

### Checks de servicio

La integración de Amazon Polly no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).