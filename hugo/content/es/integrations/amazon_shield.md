---
app_id: amazon_shield
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
description: Rastrea métricas clave de AWS Shield.
title: AWS Shield
---
## Información general

AWS ofrece Shield Standard y Shield Advanced para la protección contra ataques DDoS.

Habilita esta integración para ver todas tus métricas de AWS Shield en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `DDoSProtection` está habilitado en la pestaña `Metric Collection`.
1. Instala la integración [Datadog - AWS Shield](https://app.datadoghq.com/integrations/amazon-shield).

### Recopilación de logs

#### Activar logging

Configura AWS Shield para enviar logs ya sea a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_shield` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de AWS Shield en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.ddosprotection.ddo_sattack_bits_per_second** <br>(gauge) | Número de bytes observados durante un evento DDoS para un Nombre de recurso de Amazon (ARN) concreto.<br>_Se muestra como byte_ |
| **aws.ddosprotection.ddo_sattack_packets_per_second** <br>(gauge) | Número de paquetes observados durante un evento DDoS para un Nombre de recurso de Amazon (ARN) concreto.<br>_Se muestra como paquete_ |
| **aws.ddosprotection.ddo_sattack_requests_per_second** <br>(gauge) | Número de solicitudes observadas durante un evento DDoS para un Nombre de recurso de Amazon (ARN) concreto.<br>_Se muestra como solicitud_ |
| **aws.ddosprotection.ddo_sdetected** <br>(count) | Indica un evento DDoS para un Nombre de recurso de Amazon (ARN) concreto.|

### Eventos

La integración de AWS Shield no incluye ningún evento.

### Checks de servicio

La integración de AWS Shield no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).