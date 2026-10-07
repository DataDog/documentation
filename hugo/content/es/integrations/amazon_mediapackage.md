---
app_id: amazon_mediapackage
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
description: Rastrea métricas clave de AWS Elemental MediaPackage.
title: AWS Elemental MediaPackage
---
## Información general

AWS Elemental MediaPackage es un servicio de empaquetado y originación de vídeos justo a tiempo que ofrece flujos de vídeo de gran seguridad, escalabilidad y fiabilidad a una amplia variedad de dispositivos de reproducción.

Habilita esta integración para ver todas tus métricas de Elemental MediaPackage en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `MediaPackage` está habilitado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y AWS Elemental MediaPackage](https://app.datadoghq.com/integrations/amazon-mediapackage).

### Recopilación de logs

#### Activar logging

Configura AWS Elemental MediaPackage para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_mediapackage` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de AWS Elemental MediaPackage en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.mediapackage.active_input** <br>(gauge) | Indica si una entrada se ha utilizado como fuente para un endpoint en AWS Elemental MediaPackage (ha estado activa).|
| **aws.mediapackage.egress_bytes** <br>(gauge) | El número medio de bytes que AWS Elemental MediaPackage envía con éxito para cada solicitud.<br>_Se muestra como byte_ |
| **aws.mediapackage.egress_bytes.maximum** <br>(gauge) | El número máximo de bytes que AWS Elemental MediaPackage envía correctamente por cada solicitud.<br>_Se muestra como byte_ |
| **aws.mediapackage.egress_bytes.minimum** <br>(gauge) | El número mínimo de bytes que AWS Elemental MediaPackage envía correctamente para cada solicitud.<br>_Se muestra como byte_ |
| **aws.mediapackage.egress_bytes.samplecount** <br>(count) | El recuento de muestra del número de bytes que AWS Elemental MediaPackage envía correctamente para cada solicitud.|
| **aws.mediapackage.egress_bytes.sum** <br>(count) | La suma del número de bytes que AWS Elemental MediaPackage envía correctamente para cada solicitud.<br>_Se muestra como byte_ |
| **aws.mediapackage.egress_request_count** <br>(count) | La suma del número de solicitudes de contenido que recibe AWS Elemental MediaPackage.<br>_Se muestra como solicitud_ |
| **aws.mediapackage.egress_response_time** <br>(gauge) | El tiempo medio que tarda AWS Elemental MediaPackage en procesar cada solicitud de salida.<br>_Se muestra en milisegundos_ |
| **aws.mediapackage.egress_response_time.maximum** <br>(gauge) | El tiempo máximo que tarda AWS Elemental MediaPackage en procesar cada solicitud de salida.<br>_Se muestra en milisegundos_ |
| **aws.mediapackage.egress_response_time.minimum** <br>(gauge) | El tiempo mínimo que tarda AWS Elemental MediaPackage en procesar cada solicitud de salida.<br>_Se muestra en milisegundos_ |
| **aws.mediapackage.egress_response_time.samplecount** <br>(count) | El recuento de muestras del tiempo que tarda AWS Elemental MediaPackage en procesar cada solicitud de salida.|
| **aws.mediapackage.egress_response_time.sum** <br>(count) | La suma del tiempo que tarda AWS Elemental MediaPackage en procesar cada solicitud de salida.<br>_Se muestra en milisegundos_ |
| **aws.mediapackage.ingress_bytes** <br>(gauge) | Número medio de bytes de contenido que AWS Elemental MediaPackage recibe por cada solicitud de entrada.<br>_Se muestra como byte_ |
| **aws.mediapackage.ingress_bytes.maximum** <br>(gauge) | Número máximo de bytes de contenido que AWS Elemental MediaPackage recibe por cada solicitud de entrada.<br>_Se muestra como byte_ |
| **aws.mediapackage.ingress_bytes.minimum** <br>(gauge) | Número mínimo de bytes de contenido que AWS Elemental MediaPackage recibe por cada solicitud de entrada.<br>_Se muestra como byte_ |
| **aws.mediapackage.ingress_bytes.samplecount** <br>(count) | Recuento por muestreo del número de bytes de contenido que recibe AWS Elemental MediaPackage por cada solicitud de entrada.|
| **aws.mediapackage.ingress_bytes.sum** <br>(count) | Suma del número de bytes de contenido que AWS Elemental MediaPackage recibe por cada solicitud de entrada.<br>_Se muestra como byte_ |
| **aws.mediapackage.ingress_response_time** <br>(gauge) | El tiempo medio que tarda AWS Elemental MediaPackage en procesar cada solicitud de entrada.<br>_Se muestra en milisegundos_ |
| **aws.mediapackage.ingress_response_time.maximum** <br>(gauge) | El tiempo máximo que tarda AWS Elemental MediaPackage en procesar cada solicitud de entrada.<br>_Se muestra en milisegundos_ |
| **aws.mediapackage.ingress_response_time.minimum** <br>(gauge) | El tiempo mínimo que tarda AWS Elemental MediaPackage en procesar cada solicitud de entrada.<br>_Se muestra en milisegundos_ |
| **aws.mediapackage.ingress_response_time.samplecount** <br>(count) | El recuento de muestras del tiempo que tarda AWS Elemental MediaPackage en procesar cada solicitud de entrada.|
| **aws.mediapackage.ingress_response_time.sum** <br>(count) | La suma del tiempo que tarda AWS Elemental MediaPackage en procesar cada solicitud de entrada.<br>_Se muestra en milisegundos_ |

### Eventos

La integración de AWS Elemental MediaPackage no incluye ningún evento.

### Checks de servicio

La integración de AWS Elemental MediaPackage no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).