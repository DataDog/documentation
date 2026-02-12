---
aliases:
- /es/integrations/awskms/
app_id: amazon_kms
categories:
- cloud
- security
- aws
- log collection
custom_kind: integración
description: Rastrea la caducidad de la clave de AWS KMS.
title: AWS Key Management Service (KMS)
---
## Información general

AWS Key Management Service (KMS) es un servicio gestionado que te facilita la creación y el control de las claves de cifrado utilizadas para cifrar tus datos.

Habilita esta integración para ver en Datadog todas tus métricas de KMS.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `KMS` está habilitado en la pestaña `Metric Collection`.

1. Instala la [integración de Datadog y AWS Key Management Service (KMS)](https://app.datadoghq.com/integrations/amazon-kms).

### Recopilación de logs

#### Activar logging

Configura AWS KMS para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_kms` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de AWS KMS en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.kms.seconds_until_key_material_expiration** <br>(gauge) | Esta métrica registra el número de segundos que faltan para que caduque el material de clave importado.<br>_Se muestra como segundo_ |

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración de AWS KMS no incluye ningún evento.

### Checks de servicio

La integración de AWS KMS no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).