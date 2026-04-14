---
aliases:
- /es/integrations/amazon_appstream
app_id: amazon-appstream
categories:
- aws
- nube
- configuración y despliegue
- recopilación de logs
custom_kind: integración
description: Un servicio seguro y totalmente gestionado para la transmición de aplicaciones
  de escritorio desde AWS a un navegador web.
media: []
title: Amazon AppStream
---
## Información general

Amazon AppStream es un servicio totalmente gestionado de streaming de aplicaciones seguro que permite transmitir aplicaciones de escritorio de AWS a un navegador web.

Activa esta integración para ver todas tus métricas de AppStream en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `AppStream` está habilitado en la pestaña `Metric Collection`.
1. Instala la integración [Datadog - Amazon AppStream](https://app.datadoghq.com/integrations/amazon-appstream).

### Recopilación de logs

#### Activar logging

Configura Amazon AppStream para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si inicias sesión en un bucket de S3, asegúrate de que `amazon_appstream` se establece como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon AppStream en la consola de AWS.

   - [Añadir un activador manual en el bucket S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.appstream.actual_capacity** <br>(count) | Número medio de instancias que están disponibles para la transmisión o que están actualmente en transmisión.|
| **aws.appstream.actual_capacity.maximum** <br>(count) | Número máximo de instancias que están disponibles para la transmisión o que están actualmente en transmisión.|
| **aws.appstream.actual_capacity.minimum** <br>(count) | Número mínimo de instancias que están disponibles para la transmisión o que están actualmente en transmisión.|
| **aws.appstream.available_capacity** <br>(count) | Número medio de instancias inactivas disponibles actualmente para sesiones de usuario.|
| **aws.appstream.available_capacity.maximum** <br>(count) | Número máximo de instancias inactivas disponibles actualmente para sesiones de usuario.|
| **aws.appstream.available_capacity.minimum** <br>(count) | Número mínimo de instancias inactivas disponibles actualmente para sesiones de usuario.|
| **aws.appstream.capacity_utilization** <br>(count) | Porcentaje medio de instancias de una flota que se están utilizando<br>_Se muestra como porcentaje_ |
| **aws.appstream.capacity_utilization.maximum** <br>(count) | Porcentaje máximo de instancias de una flota que se están utilizando<br>_Se muestra como porcentaje_ |
| **aws.appstream.capacity_utilization.minimum** <br>(count) | Porcentaje mínimo de instancias de una flota que se están utilizando<br>_Se muestra como porcentaje_ |
| **aws.appstream.desired_capacity** <br>(count) | Número medio de instancias en ejecución o pendientes. Representa el número total de sesiones de transmisión simultáneas que tu flota puede soportar en estado estable.|
| **aws.appstream.desired_capacity.maximum** <br>(count) | Número máximo de instancias en ejecución o pendientes. Representa el número total de sesiones de transmisión simultáneas que tu flota puede soportar en estado estable.|
| **aws.appstream.desired_capacity.minimum** <br>(count) | Número mínimo de instancias en ejecución o pendientes. Representa el número total de sesiones de transmisión simultáneas que tu flota puede soportar en estado estable.|
| **aws.appstream.in_use_capacity** <br>(count) | Número medio de instancias que se utilizan actualmente para sesiones de transmisión|
| **aws.appstream.in_use_capacity.maximum** <br>(count) | Número máximo de instancias que se utilizan actualmente para sesiones de transmisión|
| **aws.appstream.in_use_capacity.minimum** <br>(count) | Número mínimo de instancias que se utilizan actualmente para sesiones de transmisión|
| **aws.appstream.insufficient_capacity_error** <br>(count) | Número medio de solicitudes de sesión rechazadas por falta de capacidad|
| **aws.appstream.insufficient_capacity_error.maximum** <br>(count) | Número máximo de solicitudes de sesión rechazadas por falta de capacidad|
| **aws.appstream.insufficient_capacity_error.minimum** <br>(count) | Número mínimo de solicitudes de sesión rechazadas por falta de capacidad|
| **aws.appstream.insufficient_capacity_error.sum** <br>(count) | Suma del número de solicitudes de sesión rechazadas por falta de capacidad|
| **aws.appstream.pending_capacity** <br>(count) | Número medio de instancias aprovisionadas por AppStream. Representa el número adicional de sesiones de transmisión que la flota puede soportar una vez completado el aprovisionamiento.|
| **aws.appstream.pending_capacity.maximum** <br>(count) | Número máximo de instancias aprovisionadas por AppStream. Representa el número adicional de sesiones de transmisión que la flota puede soportar una vez completado el aprovisionamiento.|
| **aws.appstream.pending_capacity.minimum** <br>(count) | Número mínimo de instancias aprovisionadas por AppStream. Representa el número adicional de sesiones de transmisión que la flota puede soportar una vez completado el aprovisionamiento.|
| **aws.appstream.running_capacity** <br>(count) | Número medio de instancias que se están ejecutando actualmente. Representa el número de sesiones de transmisión simultáneas que puede soportar la flota en su estado actual.|
| **aws.appstream.running_capacity.maximum** <br>(count) | Número máximo de instancias que se están ejecutando actualmente. Representa el número de sesiones de transmisión simultáneas que puede soportar la flota en su estado actual.|
| **aws.appstream.running_capacity.minimum** <br>(count) | Número mínimo de instancias que se están ejecutando actualmente. Representa el número de sesiones de transmisión simultáneas que puede soportar la flota en su estado actual.|

### Eventos

La integración de Amazon AppStream no incluye eventos.

### Checks de servicio

La integración de Amazon AppStream no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).