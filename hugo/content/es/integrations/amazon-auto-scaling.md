---
aliases:
- /es/integrations/amazon_auto_scaling
app_id: amazon-auto-scaling
categories:
- automatización
- aws
- nube
- configuración y despliegue
- recopilación de logs
- aprovisionamiento
custom_kind: integración
description: Inicia y cierra instancias EC2 en función de políticas definidas por
  el usuario.
media: []
title: AWS Auto Scaling
---
## Información general

AWS Auto Scaling es un servicio para lanzar o terminar instancias de EC2 automáticamente basándose en políticas definidas por el usuario.

Habilita esta integración para ver todas tus métricas de Auto Scaling en Datadog.

- Recopila métricas de EC2 para hosts en grupos de Auto Scaling con la etiqueta `autoscaling_group`.
- Recopila métricas de Auto Scaling sobre el grupo específico con las etiquetas `autoscaling_group` y `autoscalinggroupname`.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `AutoScaling` está habilitado en la pestaña `Metric Collection`.

1. En AWS, los datos de Auto Scaling deben enviarse a CloudWatch. Consulte [Activar métricas de grupo de Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-instance-monitoring.html#as-enable-group-metrics).

1. Añade los siguientes permisos a tu [política IAM de Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) para poder recopilar métricas de AWS Auto Scaling. Para obtener más información, consulta las [políticas de Auto Scaling](https://docs.aws.amazon.com/autoscaling/plans/userguide/auth-and-access-control.html) en el sitio web de AWS.

   | Permiso AWS | Descripción |
   | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | `autoscaling:DescribeAutoScalingGroups` | Se utiliza para enumerar todos los grupos de Auto Scaling.                                                                                                                                                                                                                    |
   | `autoscaling:DescribePolicies` | Enumera las políticas disponibles (para autocompletar en eventos y monitores).                                                                                                                                                                                     |
   | `autoscaling:DescribeTags` | Se utiliza para enumerar las etiquetas de un determinado grupo de Auto Scaling. Esto añade etiquetas de ASG personalizadas en las métricas de ASG CloudWatch.                                                                                                                                               |
   | `autoscaling:DescribeScalingActivities` | Se utiliza para generar eventos cuando un ASG escala hacia arriba o hacia abajo.                                                                                                                                                                                                   |
   | `autoscaling:ExecutePolicy` | Ejecuta una política (escalar hacia arriba o hacia abajo desde un monitor o una fuente de eventos).<br>Esto no está incluido en el [documento de la política de instalación](#installation) y solo debe incluirse si utilizas monitores o eventos para ejecutar una política de Auto Scaling. |

1. Instala la integración [Datadog - AWS Auto Scaling](https://app.datadoghq.com/integrations/amazon-auto-scaling).

### Recopilación de logs

#### Activar logging

Configura AWS Auto Scaling para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si inicias sesión en un bucket de S3, asegúrate de que `amazon_auto_scaling` se establece como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de AWS Auto Scaling en la consola de AWS:

   - [Añadir un activador manual en el bucket S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.autoscaling.group_desired_capacity** <br>(gauge) | Número de instancias que el grupo de Auto Scaling intenta mantener.|
| **aws.autoscaling.group_in_service_instances** <br>(gauge) | Número de instancias que se están ejecutando como parte del grupo de Auto Scaling. Esta métrica no incluye las instancias pendientes o en proceso de cierre.|
| **aws.autoscaling.group_max_size** <br>(gauge) | Tamaño máximo del grupo de Auto Scaling.|
| **aws.autoscaling.group_min_size** <br>(gauge) | Tamaño mínimo del grupo de Auto Scaling.|
| **aws.autoscaling.group_pending_instances** <br>(gauge) | Número de instancias pendientes. Una instancia pendiente aún no está en servicio. Esta métrica no incluye las instancias que están en servicio o cerrándose.|
| **aws.autoscaling.group_terminating_instances** <br>(gauge) | Número de instancias que están en proceso de cierre. Esta métrica no incluye las instancias que están en servicio o pendientes.|
| **aws.autoscaling.group_total_instances** <br>(gauge) | Número total de instancias en el grupo de Auto Scaling. Esta métrica identifica el número de instancias que están en servicio, pendientes o cerrándose.|

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, incluidos, entre otros, el nombre del host y los grupos de seguridad.

### Eventos

La integración de AWS Auto Scaling incluye eventos para lanzar y terminar instancias de EC2. Consulta el ejemplo de eventos a continuación:

{{< img src="integrations/amazon_auto_scaling/aws_auto_scaling_events.png" alt="Eventos de AWS Auto Scaling" >}}

### Checks de servicio

La integración de AWS Auto Scaling no incluye ningún check de servicio.

## Solucionar problemas

Para que las métricas de ASG empiecen a aparecer en Datadog, primero actívalas en tu consola AWS. [Consulta las instrucciones de AWS sobre cómo activar tus métricas de ASG](http://docs.aws.amazon.com/autoscaling/latest/userguide/as-instance-monitoring.html#enable-detailed-instance-metrics). **Nota**: Estas métricas pueden tardar un poco en aparecer después de ser activadas.

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).