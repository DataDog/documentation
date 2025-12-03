---
app_id: amazon_inspector
categories:
- aws
- nube
- conformidad
- recopilación de logs
custom_kind: integración
description: Rastrea métricas clave de Amazon Inspector.
title: Amazon Inspector
---
## Información general

Amazon Inspector es un servicio de evaluación de vulnerabilidades de seguridad que ayuda a mejorar la seguridad y la conformidad de tus recursos de AWS.

Habilita esta integración para ver todas tus métricas de Inspector en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de integración de AWS integración](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Inspector` está activado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y Amazon Inspector](https://app.datadoghq.com/integrations/amazon-inspector).

### Recopilación de logs

#### Activar logging

Configura Amazon Inspector para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_inspector` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon Inspector en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.inspector.total_assessment_run_findings** <br>(count) | El número de hallazgos para este objetivo.|
| **aws.inspector.total_assessment_runs** <br>(count) | El número de ejecuciones de evaluación para este objetivo.|
| **aws.inspector.total_healthy_agents** <br>(count) | El número de agents que coinciden con este objetivo y que están en buen estado.|
| **aws.inspector.total_matching_agents** <br>(count) | El número de agents que coinciden con este objetivo.|

### Eventos

La integración de Amazon Inspector no incluye ningún evento.

### Checks de servicios

La integración de Amazon Inspector no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).