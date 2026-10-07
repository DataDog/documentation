---
aliases:
- /es/integrations/awsml/
app_id: amazon_machine_learning
categories:
- cloud
- aws
- log collection
- ai/ml
custom_kind: integración
description: Rastrea recuentos y fallos de predicción de AWS Machine Learning.
further_reading:
- link: https://www.datadoghq.com/blog/ml-model-monitoring-in-production-best-practices/
  tag: Blog
  text: Prácticas recomendadas para la monitorización de modelos de ML en producción
title: Amazon Machine Learning
---
## Información general

AWS Machine Learning es un servicio que facilita el uso de la tecnología de Machine Learning por parte de desarrolladores de todos los niveles.

Habilita esta integración para ver en Datadog todas tus métricas de Machine Learning.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `ML` está habilitado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y AWS Machine Learning](https://app.datadoghq.com/integrations/amazon-machine-learning).

### Recopilación de logs

#### Activar logging

Configura AWS Machine Learning para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si inicias sesión en un bucket de S3, asegúrate de que `amazon_machine_learning` se establece como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de AWS Machine Learning en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.ml.predict_count** <br>(count) | El número de observaciones recibidas por Amazon ML.|
| **aws.ml.predict_failure_count** <br>(count) | El número de observaciones no válidas o malformadas recibidas por Amazon ML.|

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración de AWS Machine Learning no incluye ningún evento.

### Checks de servicio

La integración de AWS Machine Learning no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}