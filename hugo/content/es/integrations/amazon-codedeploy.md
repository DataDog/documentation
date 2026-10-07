---
aliases:
- /es/integrations/amazon_codedeploy
app_id: amazon-codedeploy
categories:
- automatización
- aws
- nube
- configuración y despliegue
- recopilación de logs
- aprovisionamiento
custom_kind: integración
description: AWS CodeDeploy es un servicio que automatiza el despliegue de código
  en instancias en la nube y on-premise.
media: []
title: AWS CodeDeploy
---
![CodeDeploy default dashboard](images/monitor-aws-codedeploy-dashboard.png)

## Información general

AWS CodeDeploy es un servicio que automatiza el despliegue de código en instancias en la nube y on-premise.

Habilita esta integración para ver eventos de despliegue y métricas de AWS CodeDeploy en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. Añade los siguientes permisos a tu [política IAM de Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) para poder recopilar métricas de AWS CodeDeploy. Para obtener más información, consulta las [políticas de CodeDeploy](https://docs.aws.amazon.com/codedeploy/latest/userguide/security-iam.html) en el sitio web de AWS.

   | Permiso AWS | Descripción |
   | ------------------------------------- | ----------------------------------------------------------------------------- |
   | `codedeploy:ListApplications` | Se utiliza para enumerar todas las aplicaciones CodeDeploy |
   | `codedeploy:ListDeploymentGroups` | Se utiliza para enumerar todos los grupos de despliegues dentro de una aplicación (editado) |
   | `codedeploy:ListDeployments` | Se utiliza para enumerar despliegues en un grupo de despliegues dentro de una aplicación (editado) |
   | `codedeploy:BatchGetDeployments` | Obtiene descripciones detalladas de los despliegues (editado) |
   | `codedeploy:BatchGetDeploymentGroups` | Obtiene descripciones detalladas de los grupos de despliegues |

1. Instala la integración [Datadog - AWS CodeDeploy](https://app.datadoghq.com/integrations/amazon_codedeploy).

### Recopilación de logs

#### Activar logging

Configura AWS CodeDeploy para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_codedeploy` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de AWS CodeDeploy en la consola de AWS:

   - [Añadir un activador manual en el bucket S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.codedeploy.deployment** <br>(count) | Recuento de despliegues.<br>_Se muestra como evento_ |
| **aws.codedeploy.deployment.run_time** <br>(gauge) | Tiempo de ejecución en segundos desde la creación del despliegue hasta su finalización.<br>_Se muestra como segundos_ |

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, incluidos, entre otros, el nombre del host y los grupos de seguridad.

### Eventos

La integración de AWS CodeDeploy incluye eventos para despliegues exitosos, fallidos y detenidos. Consulta los eventos de ejemplo a continuación:

![AWS CodeDeploy Event](images/aws_codedeploy_events.png)

### Checks de servicio

La integración de AWS CodeDeploy no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).