---
aliases:
- /es/integrations/amazon_web_services
app_id: amazon-web-services
categories:
- aws
- nube
- iot
- recopilación de logs
- gestión de eventos
custom_kind: integración
description: Amazon Web Services (AWS) es un conjunto de servicios web que juntos
  forman una plataforma de computación en nube.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-aws-control-plane-api-usage-metrics/
  tag: blog
  text: Monitoriza las métricas de uso de la API del plano de control de AWS en Datadog
- link: https://www.datadoghq.com/blog/aws-reinvent-2024-recap/
  tag: blog
  text: Lo más destacado de AWS re:Invent 2024
- link: https://www.datadoghq.com/blog/iam-least-privilege/
  tag: blog
  text: Prácticas recomendadas para la creación de políticas de AWS IAM de mínimo
    privilegio
media: []
title: Amazon Web Services
---
## Información general

Conecta Amazon Web Services (AWS) para:

- Consulta de las actualizaciones automáticas del estado de AWS en tu Explorador de eventos
- Obtener las métricas de CloudWatch de los hosts EC2 sin necesidad de instalar el Agent
- Etiquetar tus hosts EC2 con información concreta sobre EC2
- Ver los eventos de mantenimiento programados de EC2 en tu flujo (stream)
- Recopilar las métricas y eventos de CloudWatch de muchos otros productos de AWS
- Consulta de las alarmas de CloudWatch en tu Explorador de eventos

Para empezar a utilizar rápidamente la integración de AWS, consulta la [guía de iniciación de AWS](https://docs.datadoghq.com/getting_started/integrations/aws/).

La integración de Amazon Web Services de Datadog recopila logs, eventos y [la mayoría de las métricas de CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html) para más de [90 servicios de AWS](https://docs.datadoghq.com/integrations/#cat-aws).

## Configuración

Usa uno de los siguientes métodos para integrar tus cuentas de AWS en Datadog con el fin de recopilar métricas, eventos, etiquetas y logs.

### Automático

- **CloudFormation (la mejor opción para empezar rápidamente)**.
  Para configurar la integración de AWS con CloudFormation, consulta la [guía de inicio de AWS](https://docs.datadoghq.com/getting_started/integrations/aws/).

- **Terraform**
  Para configurar la integración de AWS con Terraform, consulta [la integración de AWS con Terraform](https://docs.datadoghq.com/integrations/guide/aws-terraform-setup/).

- **Control Tower**
  Para configurar la integración de AWS al aprovisionar una nueva cuenta de AWS con la [fábrica de cuentas de Control Tower](https://docs.aws.amazon.com/controltower/latest/userguide/account-factory.html), consulta la [guía de configuración de Control Tower](https://aws.amazon.com/blogs/awsmarketplace/deploy-datadogs-aws-integration-accounts-aws-control-tower-account-factory-customization/).

- **Configuración multicuenta para AWS Organizations**
  Para configurar la integración de AWS para varias cuentas dentro de una organización de AWS, consulta la [guía de configuración de organizaciones de AWS](https://docs.datadoghq.com/integrations/guide/aws-organizations-setup/).

### Manual

- **Delegación de roles**
  Para configurar la integración de AWS manualmente con delegación de funciones, consulta la [guía de configuración manual](https://docs.datadoghq.com/integrations/guide/aws-manual-setup/).

- **Claves de acceso (sólo GovCloud o China)
  Para configurar la integración de AWS con las claves de acceso, consulta la [guía de configuración manual](https://docs.datadoghq.com/integrations/guide/aws-manual-setup/?tab=accesskeysgovcloudorchinaonly).

  *\* Todo uso de los servicios de Datadog en China continental (o en conexión con entornos dentro de China continental) está sujeto al descargo de responsabilidad publicado en la sección [Ubicaciones de servicio restringidas](https://www.datadoghq.com/legal/restricted-service-locations/) de nuestro sitio web.*

**Nota**: Una vez finalizada la instalación, puedes configurar los ajustes de integración (como las regiones e integraciones de AWS de las que recopilar datos) en [la página de integración de Datadog y AWS](https://app.datadoghq.com/integrations/amazon-web-services).

{{% aws-permissions %}}

{{% aws-resource-collection %}}

## Recopilación de logs

Existen dos formas de enviar los logs de los servicios de AWS a Datadog:

- [Destino de Amazon Data Firehose](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/): utiliza el destino de Datadog en tu flujo de entrega de Amazon Data Firehose para reenviar logs a Datadog. Se recomienda utilizar este enfoque cuando se envíen logs desde CloudWatch en un volumen muy elevado.
- [Función del Forwarder Lambda](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/): implementa la función de Datadog Forwarder Lambda, que se suscribe a buckets de S3 o a tus grupos de logs de CloudWatch y reenvía logs a Datadog. Datadog también recomienda utilizar este enfoque para enviar logs desde S3 u otros recursos que no puedan transmitir datos directamente a Amazon Data Firehose.

## Recopilación de métricas

Existen dos formas de enviar las métricas de AWS a Datadog:

- [Sondeo de métricas](https://docs.datadoghq.com/integrations/guide/cloud-metric-delay/#aws): el sondeo de la API es predefinido con la integración de AWS. Un rastreo de métrica a métrica de la API de CloudWatch extrae datos y los envía a Datadog. Se extraen nuevas métricas cada diez minutos, de media.
- [Flujos de métricas con Amazon Data Firehose](https://docs.datadoghq.com/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/): puedes utilizar Amazon CloudWatch Metric Streams y Amazon Data Firehose para ver tus métricas. **Nota**: Este método tiene una latencia de dos a tres minutos, y requiere una configuración independiente.

Encontrarás una lista completa de las subintegraciones disponibles en la [página de integraciones](https://docs.datadoghq.com/integrations/#cat-aws). Muchas de estas integraciones se instalan por defecto cuando Datadog reconoce los datos procedentes de tu cuenta de AWS. Consulta la [página de facturación de la integración de AWS](https://docs.datadoghq.com/account_management/billing/aws/) para conocer las opciones de exclusión de recursos específicos para el control de costes.

## Recopilación de recursos

Algunos productos de Datadog aprovechan la información de configuración de tus recursos de AWS (como buckets de S3, snapshots de RDS y distribuciones de CloudFront). Datadog recopila esta información realizando llamadas de API de sólo lectura a tu cuenta AWS.

{{% aws-resource-collection %}}

### Tipos de recursos y permisos

En las siguientes secciones se enumeran los tipos de recursos recopilados para los distintos productos de Datadog y los permisos asociados necesarios para que el rol de IAM de Datadog recopile datos en tu nombre. Añade estos permisos a tu política de IAM de la integración de AWS **existente** (con la política `SecurityAudit` adjunta).

{{% collapse-content title="Cloud Cost Management (CCM)" level="h4" expanded=false id="cloud-cost-management" %}}

{{% aws-resource-collection-cloud-cost-management %}}

{{% /collapse-content %}}

{{% collapse-content title="Cloudcraft" level="h4" expanded=false id="cloudcraft" %}}

{{% aws-resource-collection-cloudcraft %}}

{{% /collapse-content %}}

{{% collapse-content title="Cloud Security Monitoring (CSM)" level="h4" expanded=false id="cloud-security-monitoring" %}}

{{% aws-resource-collection-cloud-security-monitoring %}}

{{% /collapse-content %}}

{{% collapse-content title="Network Performance Monitoring (NPM)" level="h4" expanded=false id="network-performance-monitoring" %}}

{{% aws-resource-collection-network-performance-monitoring %}}

{{% /collapse-content %}}

{{% collapse-content title="Catálogo de recursos" level="h4" expanded=false id="resource-catalog" %}}

{{% aws-resource-collection-resource-catalog %}}

{{% /collapse-content %}}

#### Próximos lanzamientos

Los permisos enumerados aquí reflejan los recursos que está previsto añadir en los próximos 30 días. Incluye estos permisos en tu política de IAM de integración de AWS **existente** (con la política `SecurityAudit` adjunta) para obtener todos los beneficios de la cobertura y el seguimiento de recursos de Datadog.

{{% collapse-content title="Permisos para las versiones futuras" level="h4" expanded=false id="upcoming-permissions" %}}

{{% aws-resource-collection-upcoming-permissions %}}

{{% /collapse-content %}}

### Cloud Security

#### Configuración

Si no tienes configurada la integración de AWS para tu cuenta de AWS, completa el [proceso de configuración](https://docs.datadoghq.com/integrations/amazon_web_services/?tab=roledelegation#setup) anterior. Asegúrate de activar Cloud Security cuando se menciona.

**Nota:** Para usar esta función, es necesario configurar la integración de AWS con **Delegación de roles*.*

Para añadir Cloud Security a una integración existente en AWS, sigue los pasos que se indican a continuación para habilitar la recopilación de recursos.

1. Proporciona los permisos necesarios al rol de IAM de Datadog adjuntando la política administrada de AWS `SecurityAudit` a tu rol de AWS IAM de Datadog. Puedes encontrar esta política en la [consola de AWS](https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit).

1. Completa la configuración en la [página de integración de Datadog AWS](https://app.datadoghq.com/integrations/amazon-web-services) con los pasos que se indican a continuación. Como alternativa, puedes utilizar el endpoint de la API [Actualizar una integración de AWS](https://docs.datadoghq.com/integrations/guide/aws-manual-setup/).

   1. Selecciona la cuenta AWS en la que quieres habilitar la recopilación de recursos.
   1. En la pestaña **Resource collection** (Recopilación de recursos), haz clic en **Enable** (Habilitar) junto a Cloud Security. Se te redirigirá a la página de configuración de Cloud Security y se abrirá automáticamente un cuadro de diálogo de configuración para la cuenta seleccionada.
   1. En el cuadro de diálogo de configuración, activa la casilla **Enable Resource Scanning** (Activar escaneado de recursos).
   1. Haz clic en **Done** (Hecho) para completar la configuración.

## Recopilación de alarmas

Hay dos maneras de enviar alarmas de CloudWatch AWS al Explorador de eventos de Datadog:

- Sondeo de alarmas: el sondeo de alarmas se incluye de forma predefinida en la integración de AWS y recupera las alarmas de las métricas a través de la API [DescribeAlarmHistory](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_DescribeAlarmHistory.html#API_DescribeAlarmHistory_RequestParameters). Si sigues este método, tus alarmas se organizarán por categorías en la fuente de eventos `Amazon Web Services`. **Nota**: El rastreador no recopila alarmas compuestas.
- Tema SNS: puedes ver todas las alarmas de AWS CloudWatch en tu Events Explorer suscribiendo las alarmas a un tema SNS y luego reenviando los mensajes SNS a Datadog. Para saber cómo recibir mensajes SNS como eventos en Datadog, consulta [Recibir mensajes SNS](https://docs.datadoghq.com/integrations/amazon_sns/#receive-sns-messages). Si sigues este método, tus alarmas se organizarán por categorías en la fuente de eventos `Amazon SNS`.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.logs.delivery_errors** <br>(count) | El número de eventos de log para los que CloudWatch Logs recibió un error al reenviar datos al destino de la suscripción.<br>_Se muestra como evento_ |
| **aws.logs.delivery_throttling** <br>(count) | El número de eventos de log para los que CloudWatch Logs fue estrangulado al reenviar datos al destino de la suscripción.<br>_Se muestra como evento_ |
| **aws.logs.forwarded_bytes** <br>(gauge) | El volumen de eventos de log en bytes comprimidos reenviados al destino de la suscripción.<br>_Se muestra como byte_ |
| **aws.logs.forwarded_log_events** <br>(count) | El número de eventos de log reenviados al destino de la suscripción.<br>_Se muestra como evento_ |
| **aws.logs.incoming_bytes** <br>(gauge) | El volumen de eventos de log en bytes descomprimidos subidos a Cloudwatch Logs.<br>_Se muestra como byte_ |
| **aws.logs.incoming_log_events** <br>(count) | El número de eventos de log subidos a Cloudwatch Logs.<br>_Se muestra como evento_ |
| **aws.usage.call_count** <br>(count) | El número de operaciones específicas realizadas en tu cuenta<br>_Se muestra como operación_ |
| **aws.usage.resource_count** <br>(count) | El número de recursos especificados en tu cuenta<br>_Se muestra como recurso_ |

**Nota**: Puedes habilitar la recopilación de métricas personalizadas de AWS, así como métricas de servicios para los que Datadog no dispone de integración. Consulta [Integración de AWS y FAQ de CloudWatch](https://docs.datadoghq.com/integrations/guide/aws-integration-and-cloudwatch-faq/#can-i-collect-aws-custom-metrics-through-the-integration) para obtener más información.

### Eventos

Los eventos de AWS se recopilan por cada servicio de AWS. Consulta [la documentación de tu servicio de AWS](https://docs.datadoghq.com/integrations/#cat-aws) para obtener más información sobre los eventos recopilados.

### Etiquetas

Las siguientes etiquetas se recopilan con la integración de AWS. **Nota**: Algunas etiquetas solo se muestran en determinadas métricas.

| Integración            | Claves de etiqueta de Datadog                                                                                                                                                                                              |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Todos                    | `region`                                                                                                                                                                                                      |
| [API Gateway](https://docs.datadoghq.com/integrations/amazon_api_gateway/)      | `apiid`, `apiname`, `method`, `resource`, `stage`                                                                                                                                                             |
| [App Runner](https://docs.datadoghq.com/integrations/amazon_app_runner)      | `instance`, `serviceid`, `servicename`                                                                                                                                                                       |
| [Auto Scaling](https://docs.datadoghq.com/integrations/amazon_auto_scaling/)    | `autoscalinggroupname`, `autoscaling_group`                                                                                                                                                                   |
| [Facturación](https://docs.datadoghq.com/integrations/amazon_billing/)          | `account_id`, `budget_name`, `budget_type`, `currency`, `servicename`, `time_unit`                                                                                                                            |
| [CloudFront](https://docs.datadoghq.com/integrations/amazon_cloudfront/)       | `distributionid`                                                                                                                                                                                              |
| [CodeBuild](https://docs.datadoghq.com/integrations/amazon_codebuild/)              | `project_name`                                                                                                                                                                                                |
| [CodeDeploy](https://docs.datadoghq.com/integrations/amazon_codedeploy/)       | `application`, `creator`, `deployment_config`, `deployment_group`, `deployment_option`, `deployment_type`, `status`                                                                                           |
| [DirectConnect](https://docs.datadoghq.com/integrations/amazon_directconnect/)    | `connectionid`                                                                                                                                                                                                |
| [DynamoDB](https://docs.datadoghq.com/integrations/amazon_dynamodb/)         | `globalsecondaryindexname`, `operation`, `streamlabel`, `tablename`                                                                                                                                           |
| [EBS](https://docs.datadoghq.com/integrations/amazon_ebs/)              | `volumeid`, `volume-name`, `volume-type`                                                                                                                                                                      |
| [EC2](https://docs.datadoghq.com/integrations/amazon_ec2/)              | `autoscaling_group`, `availability-zone`, `image`, `instance-id`, `instance-type`, `kernel`, `name`, `security_group_name`                                                                                    |
| [ECS](https://docs.datadoghq.com/integrations/amazon_ecs/)              | `clustername`, `servicename`, `instance_id`                                                                                                                                                                   |
| [EFS](https://docs.datadoghq.com/integrations/amazon_efs/)              | `filesystemid`                                                                                                                                                                                                |
| [ElastiCache](https://docs.datadoghq.com/integrations/amazon_elasticache/)      | `cachenodeid`, `cache_node_type`, `cacheclusterid`, `cluster_name`, `engine`, `engine_version`, `preferred_availability-zone`, `replication_group`                                                             |
| [ElasticBeanstalk](https://docs.datadoghq.com/integrations/amazon_elasticbeanstalk/) | `environmentname`, `enviromentid`                                                                                                                                                                             |
| [ELB](https://docs.datadoghq.com/integrations/amazon_elb/)              | `availability-zone`, `hostname`, `loadbalancername`, `name`, `targetgroup`                                                                                                                                    |
| [EMR](https://docs.datadoghq.com/integrations/amazon_emr/)              | `cluster_name`, `jobflowid`                                                                                                                                                                                   |
| [ES](https://docs.datadoghq.com/integrations/amazon_es/)               | `dedicated_master_enabled`, `ebs_enabled`, `elasticsearch_version`, `instance_type`, `zone_awareness_enabled`                                                                                                 |
| [Firehose](https://docs.datadoghq.com/integrations/amazon_firehose/)         | `deliverystreamname`                                                                                                                                                                                          |
| [FSx](https://docs.datadoghq.com/integrations/amazon_fsx/)             | `filesystemid`, `filesystemtype`                                                                                                                                                                               |
| [Estado](https://docs.datadoghq.com/integrations/amazon_health/)           | `event_category`, `status`, `service`                                                                                                                                                                         |
| [IoT](https://docs.datadoghq.com/integrations/amazon_iot/)              | `actiontype`, `protocol`, `rulename`                                                                                                                                                                          |
| [Kinesis](https://docs.datadoghq.com/integrations/amazon_kinesis/)          | `streamname`, `name`, `state`                                                                                                                                                                                 |
| [KMS](https://docs.datadoghq.com/integrations/amazon_kms/)              | `keyid`                                                                                                                                                                                                       |
| [Lambda](https://docs.datadoghq.com/integrations/amazon_lambda/)           | `functionname`, `resource`, `executedversion`, `memorysize`, `runtime`                                                                                                                                        |
| [Machine Learning](https://docs.datadoghq.com/integrations/amazon_machine_learning/) | `mlmodelid`, `requestmode`                                                                                                                                                                                    |
| [MQ](https://docs.datadoghq.com/integrations/amazon_mq/)               | `broker`, `queue`, `topic`                                                                                                                                                                                    |
| [OpsWorks](https://docs.datadoghq.com/integrations/amazon_ops_works/)         | `stackid`, `layerid`, `instanceid`                                                                                                                                                                            |
| [Polly](https://docs.datadoghq.com/integrations/amazon_polly/)            | `operation`                                                                                                                                                                                                   |
| [RDS](https://docs.datadoghq.com/integrations/amazon_rds/)              | `auto_minor_version_upgrade`, `dbinstanceclass`, `dbclusteridentifier`, `dbinstanceidentifier`, `dbname`, `engine`, `engineversion`, `hostname`, `name`, `publicly_accessible`, `secondary_availability-zone` |
| [Proxy RDS](https://docs.datadoghq.com/integrations/amazon_rds_proxy/)       | `proxyname`, `target`, `targetgroup`, `targetrole`                                                                                                                                                                                                  |
| [Redshift](https://docs.datadoghq.com/integrations/amazon_redshift/)       | `clusteridentifier`, `latency`, `nodeid`, `service_class`, `stage`, `wlmid`                                                                                                                                   |
| [Route 53](https://docs.datadoghq.com/integrations/amazon_route53/)        | `healthcheckid`                                                                                                                                                                                               |
| [S3](https://docs.datadoghq.com/integrations/amazon_s3/)             | `bucketname`, `filterid`, `storagetype`                                                                                                                                                                       |
| [SES](https://docs.datadoghq.com/integrations/amazon_ses/)             | Las claves de las etiquetas son un conjunto personalizado en AWS.                                                                                                                                                                               |
| [SNS](https://docs.datadoghq.com/integrations/amazon_sns/)              | `topicname`                                                                                                                                                                                                   |
| [SQS](https://docs.datadoghq.com/integrations/amazon_sqs/)              | `queuename`                                                                                                                                                                                                   |
| [VPC](https://docs.datadoghq.com/integrations/amazon_vpc/)              | `nategatewayid`, `vpnid`, `tunnelipaddress`                                                                                                                                                                   |
| [WorkSpaces](https://docs.datadoghq.com/integrations/amazon_workspaces/)       | `directoryid`, `workspaceid`                                                                                                                                                                                  |

### Checks de servicio

**aws.status**

Devuelve `CRITICAL` si una o más regiones de AWS están experimentando problemas. En caso contrario, devuelve `OK`.

_Estados: ok, crítico_

## Solucionar problemas

Consulta la [Guía de resolución de problemas de la integración de AWS](https://docs.datadoghq.com/integrations/guide/aws-integration-troubleshooting/) para resolver problemas relacionados con la integración de AWS.

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitoriza las métricas de uso de la API del plano de control de AWS en Datadog](https://www.datadoghq.com/blog/monitor-aws-control-plane-api-usage-metrics/)
- [Aspectos destacados de AWS re:Invent 2024](https://www.datadoghq.com/blog/aws-reinvent-2024-recap/)
- [Prácticas recomendadas para la creación de políticas de AWS IAM de mínimo privilegio](https://www.datadoghq.com/blog/iam-least-privilege/)