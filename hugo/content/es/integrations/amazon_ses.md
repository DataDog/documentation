---
aliases:
- /es/integrations/awsses/
app_id: amazon_ses
categories:
- aws
- cloud
- log collection
custom_kind: integración
description: Realiza un seguimiento de correos electrónicos devueltos, intentos de
  entrega, mensajes rechazados, etc.
further_reading:
- link: https://www.datadoghq.com/blog/detect-phishing-activity-amazon-ses/
  tag: Blog
  text: 'Monitorización de Amazon SES: Detecta campañas de phishing en la nube'
title: Amazon Simple Email Service (SES)
---
## Información general

Amazon Simple Email Service (SES) es un servicio rentable de envío de correo electrónico exclusivamente saliente.

Habilita esta integración para ver en Datadog todas tus métricas de SES.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración AWS](https://app.datadoghq.com/integrations/amazon-web-services),, asegúrate de que `SES` está habilitado en la pestaña `Metric Collection`.

1. Añadir estos permisos a tu [política de Datadog IAM](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) para recopilar métricas de Amazon SES:

   - `ses:GetSendQuota`: añade métricas sobre cuotas de envío.
   - `ses:GetSendStatistics`: añade métricas sobre las estadísticas de envío.

   Para obtener más información, consulta las [políticas del CUE](https://docs.aws.amazon.com/ses/latest/dg/control-user-access.html) en el sitio web de AWS.

1. Instala la [integración Datadog - Amazon Simple Email Service (SES)](https://app.datadoghq.com/integrations/amazon-ses).

### Recopilación de logs

#### Activar logging

Configura Amazon SES para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_ses` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de Amazon SES en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.ses.bounce** <br>(gauge) | Número medio de correos electrónicos que resultaron en un rebote.<br>_Se muestra como respuesta_ |
| **aws.ses.bounce.sum** <br>(gauge) | Número total de correos electrónicos que resultaron en un rebote.<br>_Se muestra como respuesta_ |
| **aws.ses.bounces** <br>(gauge) | Número de correos electrónicos que resultaron en un rebote duro.<br>_Se muestra como respuesta_ |
| **aws.ses.complaints** <br>(gauge) | Número de correos electrónicos que fueron marcados por sus destinatarios como spam.<br>_Se muestra como respuesta_ |
| **aws.ses.delivery** <br>(gauge) | Número medio de correos electrónicos que Amazon SES entregó correctamente a los servidores de correo de los destinatarios previstos.<br>_Se muestra como respuesta_. |
| **aws.ses.delivery.sum** <br>(gauge) | Número total de correos electrónicos que Amazon SES entregó correctamente a los servidores de correo de los destinatarios previstos.<br>_Se muestra como respuesta_. |
| **aws.ses.deliveryattempts** <br>(gauge) | Número de intentos de entrega<br>_Se muestra como evento_ |
| **aws.ses.max_24_hour_send** <br>(gauge) | Número máximo de correos electrónicos que se pueden enviar en un periodo de 24 horas<br>_Se muestra como evento_ |
| **aws.ses.open** <br>(gauge) | Número de correos electrónicos que fueron abiertos por sus destinatarios.<br>_Se muestra como respuesta_ |
| **aws.ses.publish_expired** <br>(gauge) | Amazon SES encontró un error al intentar ejecutar las acciones configuradas y Amazon SES ya no volverá a intentar entregar el correo electrónico.<br>_Se muestra como respuesta_. |
| **aws.ses.publish_failure** <br>(gauge) | Amazon SES encontró un error al intentar ejecutar las acciones configuradas.<br>_Se muestra como respuesta_. |
| **aws.ses.rejects** <br>(gauge) | Intentos de envío rechazados (un correo electrónico rechazado es aquel que Amazon SES aceptó inicialmente, pero rechazó posteriormente porque contenía un virus. Amazon SES te lo notifica mediante correo electrónico y no envía el mensaje.)<br>_Se muestra como respuesta_. |
| **aws.ses.reputation_bounce_rate** <br>(gauge) | Porcentaje de mensajes rebotados.<br>_Se muestra como fracción_ |
| **aws.ses.reputation_complaint_rate** <br>(gauge) | Porcentaje de mensajes denunciados como spam por sus destinatarios.<br>_Se muestra como fracción_ |
| **aws.ses.send** <br>(gauge) | La llamada a la API de envío de correos electrónicos a Amazon SES se realizó correctamente y Amazon SES intentará entregar el correo electrónico.<br>_Se muestra como respuesta_ |
| **aws.ses.send.sum** <br>(gauge) | Número total de correos electrónicos enviados.<br>_Se muestra como respuesta_ |
| **aws.ses.sent_last_24_hours** <br>(gauge) | Número total de correos electrónicos enviados en las últimas 24 horas.<br>_Se muestra como evento_ |

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración de Amazon Simple Email Service (SES) no incluye ningún evento.

### Checks de servicio

La integración de Amazon Simple Email Service (SES) no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}