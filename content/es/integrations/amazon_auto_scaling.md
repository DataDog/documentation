---
aliases:
- /es/integrations/awsautoscaling/
- /es/integrations/faq/get-your-autoscaling-group-events-and-metrics/
app_id: amazon-auto-scaling
app_uuid: f5a62c95-2e7e-4e58-8782-b9847ce08b5b
assets:
  dashboards:
    aws_auto_scaling: assets/dashboards/aws_auto_scaling.json
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check: aws.autoscaling.group_desired_capacity
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.autoscaling
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 131
    source_type_name: Amazon Auto Scaling
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- automatización
- aws
- nube
- configuración y despliegue
- recopilación de logs
- suministro
custom_kind: integración
dependencies: []
description: Realiza un seguimiento del estado y del recuento de instancias en tus
  grupos de Auto Scaling.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/amazon_auto_scaling/
draft: false
git_integration_title: amazon_auto_scaling
has_logo: true
integration_id: amazon-auto-scaling
integration_title: AWS Auto Scaling
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_auto_scaling
public_title: AWS Auto Scaling
short_description: Inicia y cierra instancias EC2 en función de las políticas definidas
  por el usuario.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Automatización
  - Categoría::AWS
  - Categoría::Nube
  - Categoría::Configuración y despliegue
  - Category::Log Collection
  - Categoría::Suministro
  - Offering::Integration
  configuration: README.md#Setup
  description: Inicia y cierra instancias EC2 en función de las políticas definidas
    por el usuario.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS Auto Scaling
version: '1.0'
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-internal-core -->
## Información general

AWS Auto Scaling es un servicio para lanzar o terminar instancias de EC2 automáticamente basándose en políticas definidas por el usuario.

Habilita esta integración para ver todas tus métricas de Auto Scaling en Datadog.

- Recopila métricas de EC2 para hosts en grupos de Auto Scaling con la etiqueta `autoscaling_group`.
- Recopila métricas de Auto Scaling sobre el grupo específico con las etiquetas `autoscaling_group` y `autoscalinggroupname`.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2] y Datadog, asegúrate de que `AutoScaling` está habilitado en la pestaña `Metric Collection`.
2. En AWS, los datos de Auto Scaling deben enviarse a CloudWatch. Consulta [Activar métricas de grupo de Auto Scaling][3].
3. Añade los siguientes permisos a tu [política de IAM de Datadog][4] para recopilar métricas de AWS Auto Scaling. Para obtener más información, consulta las [políticas de Auto Scaling][5] en el sitio web de AWS.

    | Permiso de AWS                          | Descripción                                                                                                                                                                                                                                              |
    | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `autoscaling:DescribeAutoScalingGroups` | Se utiliza para hacer una lista de todos los grupos de Auto Scaling.                                                                                                                                                                                                                    |
    | `autoscaling:DescribePolicies` | Lista de políticas disponibles (para autocompletar en eventos y monitores).                                                                                                                                                                                     |
    | `autoscaling:DescribeTags` | Se utiliza para hacer una lista de etiquetas para un grupo de Auto Scaling determinado. Esto añade etiquetas de ASG personalizadas en métricas de CloudWatch de ASG.                                                                                                                                               |
    | `autoscaling:DescribeScalingActivities` | Se utiliza para generar eventos cuando un ASG escala hacia arriba o hacia abajo.                                                                                                                                                                                                   |
    | `autoscaling:ExecutePolicy` | Ejecuta un política (escalar hacia arriba o hacia abajo de un monitor o el conjunto de eventos).<br>Esto no está incluido en el [documento de la política de instalación](#instalation) y sólo debe incluirse si estás utilizando monitores o eventos para ejecutar una política de Auto Scaling. |

4. Instala la [integración de Datadog y AWS Auto Scaling][6].

### Recopilación de logs

#### Activar logging

Configura AWS Auto Scaling para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si inicias sesión en un bucket de S3, asegúrate de que `amazon_auto_scaling` se establece como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda de Datadog Forwarder][7].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de AWS Auto Scaling en la consola de AWS:

    - [Añadir un activador manual en el bucket de S3][8]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][9]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_auto_scaling" >}}


A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, incluidos, entre otros, el nombre del host y los grupos de seguridad.

### Eventos

La integración de AWS Auto Scaling incluye eventos para lanzar y terminar instancias de EC2. Consulta el ejemplo de eventos a continuación:

{{< img src="integrations/amazon_auto_scaling/aws_auto_scaling_events.png" alt="Eventos de AWS Auto Scaling" >}}

### Checks de servicio

La integración de AWS Auto Scaling no incluye ningún check de servicio.

## Solucionar problemas

Para que las métricas de ASG empiecen a aparecer en Datadog, primero habilítalas en tu consola de AWS. [Consulta las instrucciones de AWS sobre cómo habilitar tus métricas de ASG][11]. **Nota**: Es posible que las métricas tarden un poco en aparecer después de haber sido habilitadas.

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][12].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-instance-monitoring.html#as-enable-group-metrics
[4]: https://docs.datadoghq.com/es/integrations/amazon_web_services/#installation
[5]: https://docs.aws.amazon.com/autoscaling/plans/userguide/auth-and-access-control.html
[6]: https://app.datadoghq.com/integrations/amazon-auto-scaling
[7]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[8]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[9]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[10]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_auto_scaling/assets/metrics/metric-spec.yaml
[11]: http://docs.aws.amazon.com/autoscaling/latest/userguide/as-instance-monitoring.html#enable-detailed-instance-metrics
[12]: https://docs.datadoghq.com/es/help/