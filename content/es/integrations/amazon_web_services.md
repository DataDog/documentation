---
app_id: "amazon-web-services"
app_uuid: "45508037-7831-469d-80da-20241f00cbed"
assets:
  dashboards:
    aws_advisor: "assets/dashboards/aws_advisor.json"
    aws_ebs: "assets/dashboards/aws_ebs.json"
    aws_event_bridge: "assets/dashboards/aws_event_bridge.json"
    aws_firehose: "assets/dashboards/aws_firehose.json"
    aws_overall: "assets/dashboards/aws_overall.json"
    aws_sns: "assets/dashboards/aws_sns.json"
    aws_sqs: "assets/dashboards/aws_sqs.json"
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check:
      - "aws.usage.call_count"
      metadata_path: "assets/metrics/metric-spec.yaml"
      prefix: "aws."
    service_checks:
      metadata_path: "assets/service_checks.json"
    source_type_id: !!int "10"
    source_type_name: "Amazon Web Services"
  monitors:
    "Integration Health Status": "assets/monitors/aws_integration_status_monitor.json"
author:
  homepage: "https://www.datadoghq.com"
  name: "Datadog"
  sales_email: "info@datadoghq.com"
  support_email: "help@datadoghq.com"
categories:
- "aws"
- "cloud"
- "iot"
- "log collection"
- "event management"
custom_kind: "integración"
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: "amazon_web_services"
integration_id: "amazon-web-services"
integration_title: "Amazon Web Services"
integration_version: ""
is_public: true
manifest_version: "2.0.0"
name: "amazon_web_services"
public_title: "Amazon Web Services"
short_description: "Amazon Web Services (AWS) es un conjunto de servicios web que juntos conforman una plataforma de computación en la nube"
supported_os: []
tile:
  changelog: "CHANGELOG.md"
  classifier_tags:
  - "Category::AWS"
  - "Category::Cloud"
  - "Category::IoT"
  - "Category::Recopilación de logs"
  - "Category::Event Management"
  - "Offering::Integration"
  configuration: "README.md#Setup"
  description: "Amazon Web Services (AWS) es un conjunto de servicios web que juntos conforman una plataforma de computación en la nube"
  media: []
  overview: "README.md#Overview"
  resources:
  - resource_type: "blog"
    url: "https://www.datadoghq.com/blog/monitor-aws-control-plane-api-usage-metrics/"
  - resource_type: "blog"
    url: "https://www.datadoghq.com/blog/aws-reinvent-2022-recap/"
  - resource_type: "blog"
    url: "https://www.datadoghq.com/blog/iam-least-privilege/"
  support: "README.md#Support"
  title: "Amazon Web Services"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Conecta Amazon Web Services (AWS) para:

- Consulta de las actualizaciones automáticas del estado de AWS en tu Explorador de eventos
- Obtener las métricas de CloudWatch de los hosts EC2 sin necesidad de instalar el Agent
- Etiquetar tus hosts EC2 con información concreta sobre EC2
- Ver los eventos de mantenimiento programados de EC2 en tu flujo (stream)
- Recopilar las métricas y eventos de CloudWatch de muchos otros productos de AWS
- Consulta de las alarmas de CloudWatch en tu Explorador de eventos

Para empezar a utilizar la integración de AWS cuanto antes, consulta la [guía sobre cómo empezar con AWS][1].

La integración Amazon Web Services de Datadog recopila logs, eventos y [la mayoría de las métricas de CloudWatch][2] para más de [90 servicios AWS][3].

## Configurar

Usa uno de los siguientes métodos para integrar tus cuentas de AWS en Datadog con el fin de recopilar métricas, eventos, etiquetas y logs.

### Automático

  * **CloudFormation (la mejor opción para empezar rápidamente)**.
      Para configurar la integración de AWS con CloudFormation, consulta la [guía sobre cómo empezar con AWS][1].

  * **Terraform**
    Para configurar la integración AWS con Terraform, consulta la [integración AWS con Terraform][4].

  * **Control Tower**
    Para configurar la integración AWS al proporcionar una nueva cuenta AWS con [Control Tower Account Factory][5], consulta la [guía de configuración de Control Tower][6].

  * **Configuración multicuenta para AWS Organizations**
    Para configurar la integración AWS para varias cuentas dentro de una organización AWS, consulta la [guía de configuración de AWS Organizations][7].

### Manual

   * **Delegación de roles**
     Para configurar manualmente la integración AWS con delegación de roles, consulta la [guía de configuración manual][8].

   * **Claves de acceso (sólo GovCloud o China)**
      Para configurar la integración de AWS con las claves de acceso, consulta la [guía de configuración manual][9].

      *\* Cualquier uso de los servicios Datadog en China continental (o relacionados con entornos de esta localización) está sujeto a la cláusula de exención de responsabilidad, publicada en la sección [Localizaciones con restricciones de servicio][10] de nuestro sitio web.*

{{% aws-permissions %}}

{{% aws-resource-collection %}}

## Recopilación de logs

Existen dos formas de enviar los logs de los servicios de AWS a Datadog:

- [Destino Amazon Data Firehose][11]: Utiliza el destino Datadog en tu flujo de entrega de Amazon Data Firehose para reenviar logs a Datadog. Recomendamos utilizar esta estrategia para el envío de grandes volúmenes de logs desde CloudWatch.
- [Función Lambda del Forwarder][12]: Despliega la función Lambda del Datadog Forwarder, que está suscripta a buckets de S3 o a tus grupos de logs de CloudWatch y reenvía logs a Datadog. Datadog también te recomienda utilizar esta estrategia para enviar logs desde S3 u otros recursos que no puedan transmitir datos directamente a Amazon Data Firehose.

## Recopilación de métricas

Existen dos formas de enviar las métricas de AWS a Datadog:

- [Sondeo de métricas][13]: El sondeo de la API se incluye de forma predefinida con la integración AWS. Un rastreo métrica-por-métrica de la API CloudWatch extrae datos y los envía a Datadog. En promedio, se extraen nuevas métricas cada diez minutos.
- [Metric Streams con Amazon Data Firehose][14]: Puedes utilizar Amazon CloudWatch Metric Streams y Amazon Data Firehose para ver tus métricas. **Nota**: Este método tiene una latencia de dos a tres minutos y requiere una configuración individual.

En la página [Integraciones][3] encontrarás una lista completa de las sub-integraciones disponibles. Muchas de estas integraciones se instalan por defecto cuando Datadog reconoce los datos procedentes de tu cuenta AWS. Para conocer las opciones de exclusión de recursos específicos y controlar tus costes, consulta la página [Facturación de integraciones AWS][15].

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

{{% collapse-content title="Permisos para próximos lanzamientos" level="h4" expanded=false id="upcoming-permissions" %}}
{{% aws-resource-collection-upcoming-permissions %}}
{{% /collapse-content %}}

### Cloud Security

#### Configurar

Si no tienes configurada la integración AWS para tu cuenta AWS, completa el [proceso de configuración][16] anterior. Asegúrate de habilitar Cloud Security cuando se mencione.

**Nota:** Para usar esta función, es necesario configurar la integración de AWS con **Delegación de roles*.*

Para añadir Cloud Security a una integración existente en AWS, sigue los pasos que se indican a continuación para habilitar la recopilación de recursos.

1. Proporciona los permisos necesarios al rol de IAM Datadog adjuntando la política de AWS gestionada `SecurityAudit` a tu rol de IAM AWS Datadog. Puedes encontrar este política en la [consola de AWS][17]. 

2. Completa la configuración en la [página de la integración AWS Datadog][18] con los pasos que se indican a continuación. Como alternativa, puedes utilizar el endpoint de la API [Actualizar una integración AWS][8].

   1. Selecciona la cuenta AWS en la que quieres habilitar la recopilación de recursos.
   2. En la pestaña **Resource collection** (Recopilación de recursos), haz clic en **Enable** (Habilitar) junto a Cloud Security. Se te redirigirá a la página de configuración de Cloud Security y se abrirá automáticamente un cuadro de diálogo de configuración para la cuenta seleccionada.
   3. En el cuadro de diálogo de configuración, activa la casilla **Enable Resource Scanning** (Activar escaneado de recursos).
   4. Haz clic en **Done** (Hecho) para completar la configuración.

## Recopilación de alarmas

Hay dos maneras de enviar alarmas de CloudWatch AWS al Explorador de eventos de Datadog:

- Sondeo de alarmas: El sondeo de alarmas se incluye de forma predefinida en la integración AWS y recupera las alarmas de las métricas a través de la API [DescribeAlarmHistory][19]. Si sigues este método, tus alarmas se organizarán por categorías en la fuente de eventos `Amazon Web Services`. **Nota**: El rastreador no recopila alarmas compuestas.
- Tema SNS: Puedes ver todas las alarmas de CloudWatch AWS en tu Explorador de eventos suscribiendo las alarmas a un tema SNS y luego reenviando los mensajes SNS a Datadog. Para saber cómo recibir mensajes SNS como eventos en Datadog, consulta [Recibir mensajes SNS][20]. Si sigues este método, tus alarmas se organizarán por categorías en la fuente de eventos `Amazon SNS`.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_web_services" >}}


**Nota**: Puedes habilitar la recopilación de métricas personalizadas de AWS, así como métricas de servicios para los que Datadog no tiene una integración. Consulta las [FAQ sobre la integración de AWS y CloudWatch][22] para obtener más información.

### Eventos

Los eventos de AWS se recopilan por cada servicio AWS. Para obtener más información sobre eventos recopilados, consulta la [documentación de tu servicio AWS][3].

### Etiquetas (Tags)

Las siguientes etiquetas se recopilan con la integración de AWS. **Nota**: Algunas etiquetas solo se muestran en determinadas métricas.

| Integración            | Claves de etiqueta de Datadog                                                                                                                                                                                              |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Todos                    | `region`                                                                                                                                                                                                      |
| [API Gateway][23]      | `apiid`, `apiname`, `method`, `resource`, `stage`                                                                                                                                                             |
| [App Runner][24]      | `instance`, `serviceid`, `servicename`                                                                                                                                                                       |
| [Auto Scaling][25]    | `autoscalinggroupname`, `autoscaling_group`                                                                                                                                                                   |
| [Billing][26]          | `account_id`, `budget_name`, `budget_type`, `currency`, `servicename`, `time_unit`                                                                                                                            |
| [CloudFront][27]       | `distributionid`                                                                                                                                                                                              |
| [CodeBuild][28]              | `project_name`                                                                                                                                                                                                |
| [CodeDeploy][29]       | `application`, `creator`, `deployment_config`, `deployment_group`, `deployment_option`, `deployment_type`, `status`                                                                                           |
| [DirectConnect][30]    | `connectionid`                                                                                                                                                                                                |
| [DynamoDB][31]         | `globalsecondaryindexname`, `operation`, `streamlabel`, `tablename`                                                                                                                                           |
| [EBS][32]              | `volumeid`, `volume-name`, `volume-type`                                                                                                                                                                      |
| [EC2][33]              | `autoscaling_group`, `availability-zone`, `image`, `instance-id`, `instance-type`, `kernel`, `name`, `security_group_name`                                                                                    |
| [ECS][34]              | `clustername`, `servicename`, `instance_id`                                                                                                                                                                   |
| [EFS][35]              | `filesystemid`                                                                                                                                                                                                |
| [ElastiCache][36]      | `cachenodeid`, `cache_node_type`, `cacheclusterid`, `cluster_name`, `engine`, `engine_version`, `preferred_availability-zone`, `replication_group`                                                             |
| [ElasticBeanstalk][37] | `environmentname`, `enviromentid`                                                                                                                                                                             |
| [ELB][38]              | `availability-zone`, `hostname`, `loadbalancername`, `name`, `targetgroup`                                                                                                                                    |
| [EMR][39]              | `cluster_name`, `jobflowid`                                                                                                                                                                                   |
| [ES][40]               | `dedicated_master_enabled`, `ebs_enabled`, `elasticsearch_version`, `instance_type`, `zone_awareness_enabled`                                                                                                 |
| [Firehose][41]         | `deliverystreamname`                                                                                                                                                                                          |
| [FSx][42]             | `filesystemid`, `filesystemtype`                                                                                                                                                                               |
| [Health][43]           | `event_category`, `status`, `service`                                                                                                                                                                         |
| [IoT][44]              | `actiontype`, `protocol`, `rulename`                                                                                                                                                                          |
| [Kinesis][45]          | `streamname`, `name`, `state`                                                                                                                                                                                 |
| [KMS][46]              | `keyid`                                                                                                                                                                                                       |
| [Lambda][47]           | `functionname`, `resource`, `executedversion`, `memorysize`, `runtime`                                                                                                                                        |
| [Machine Learning][48] | `mlmodelid`, `requestmode`                                                                                                                                                                                    |
| [MQ][49]               | `broker`, `queue`, `topic`                                                                                                                                                                                    |
| [OpsWorks][50]         | `stackid`, `layerid`, `instanceid`                                                                                                                                                                            |
| [Polly][51]            | `operation`                                                                                                                                                                                                   |
| [RDS][52]              | `auto_minor_version_upgrade`, `dbinstanceclass`, `dbclusteridentifier`, `dbinstanceidentifier`, `dbname`, `engine`, `engineversion`, `hostname`, `name`, `publicly_accessible`, `secondary_availability-zone` |
| [RDS Proxy][53]       | `proxyname`, `target`, `targetgroup`, `targetrole`                                                                                                                                                                                                  |
| [Redshift][54]       | `clusteridentifier`, `latency`, `nodeid`, `service_class`, `stage`, `wlmid`                                                                                                                                   |
| [Route 53][55]        | `healthcheckid`                                                                                                                                                                                               |
| [S3][56]             | `bucketname`, `filterid`, `storagetype`                                                                                                                                                                       |
| [SES][57]             | Las claves de las etiquetas son un conjunto personalizado en AWS.                                                                                                                                                                               |
| [SNS][58]              | `topicname`                                                                                                                                                                                                   |
| [SQS][59]              | `queuename`                                                                                                                                                                                                   |
| [VPC][60]              | `nategatewayid`, `vpnid`, `tunnelipaddress`                                                                                                                                                                   |
| [WorkSpaces][61]       | `directoryid`, `workspaceid`                                                                                                                                                                                  |

### Checks de servicio
{{< get-service-checks-from-git "amazon_web_services" >}}


## Solucionar problemas

Para solucionar problemas relacionados con la integración AWS, consulta la [guía para la resolución de problemas de integraciones AWS][63].

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:
- [Monitoriza las métricas de uso de la API del plano de control de AWS en Datadog][64]
- [Aspectos destacados de AWS re:Invent 2022][65]
- [Prácticas recomendadas para crear políticas de AWS IAM de mínimo privilegio][66]


[1]: https://docs.datadoghq.com/getting_started/integrations/aws/
[2]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html
[3]: https://docs.datadoghq.com/integrations/#cat-aws
[4]: https://docs.datadoghq.com/integrations/guide/aws-terraform-setup/
[5]: https://docs.aws.amazon.com/controltower/latest/userguide/account-factory.html
[6]: https://aws.amazon.com/blogs/awsmarketplace/deploy-datadogs-aws-integration-accounts-aws-control-tower-account-factory-customization/
[7]: https://docs.datadoghq.com/integrations/guide/aws-organizations-setup/
[8]: https://docs.datadoghq.com/integrations/guide/aws-manual-setup/
[9]: https://docs.datadoghq.com/integrations/guide/aws-manual-setup/?tab=accesskeysgovcloudorchinaonly
[10]: https://www.datadoghq.com/legal/restricted-service-locations/
[11]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[12]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[13]: https://docs.datadoghq.com/integrations/guide/cloud-metric-delay/#aws
[14]: https://docs.datadoghq.com/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[15]: https://docs.datadoghq.com/account_management/billing/aws/
[16]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=roledelegation#setup
[17]: https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit
[18]: https://app.datadoghq.com/integrations/amazon-web-services
[19]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_DescribeAlarmHistory.html#API_DescribeAlarmHistory_RequestParameters
[20]: https://docs.datadoghq.com/integrations/amazon_sns/#receive-sns-messages
[21]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_web_services/assets/metrics/metric-spec.yaml
[22]: https://docs.datadoghq.com/integrations/guide/aws-integration-and-cloudwatch-faq/#can-i-collect-aws-custom-metrics-through-the-integration
[23]: https://docs.datadoghq.com/integrations/amazon_api_gateway/
[24]: https://docs.datadoghq.com/integrations/amazon_app_runner
[25]: https://docs.datadoghq.com/integrations/amazon_auto_scaling/
[26]: https://docs.datadoghq.com/integrations/amazon_billing/
[27]: https://docs.datadoghq.com/integrations/amazon_cloudfront/
[28]: https://docs.datadoghq.com/integrations/amazon_codebuild/
[29]: https://docs.datadoghq.com/integrations/amazon_codedeploy/
[30]: https://docs.datadoghq.com/integrations/amazon_directconnect/
[31]: https://docs.datadoghq.com/integrations/amazon_dynamodb/
[32]: https://docs.datadoghq.com/integrations/amazon_ebs/
[33]: https://docs.datadoghq.com/integrations/amazon_ec2/
[34]: https://docs.datadoghq.com/integrations/amazon_ecs/
[35]: https://docs.datadoghq.com/integrations/amazon_efs/
[36]: https://docs.datadoghq.com/integrations/amazon_elasticache/
[37]: https://docs.datadoghq.com/integrations/amazon_elasticbeanstalk/
[38]: https://docs.datadoghq.com/integrations/amazon_elb/
[39]: https://docs.datadoghq.com/integrations/amazon_emr/
[40]: https://docs.datadoghq.com/integrations/amazon_es/
[41]: https://docs.datadoghq.com/integrations/amazon_firehose/
[42]: https://docs.datadoghq.com/integrations/amazon_fsx/
[43]: https://docs.datadoghq.com/integrations/amazon_health/
[44]: https://docs.datadoghq.com/integrations/amazon_iot/
[45]: https://docs.datadoghq.com/integrations/amazon_kinesis/
[46]: https://docs.datadoghq.com/integrations/amazon_kms/
[47]: https://docs.datadoghq.com/integrations/amazon_lambda/
[48]: https://docs.datadoghq.com/integrations/amazon_machine_learning/
[49]: https://docs.datadoghq.com/integrations/amazon_mq/
[50]: https://docs.datadoghq.com/integrations/amazon_ops_works/
[51]: https://docs.datadoghq.com/integrations/amazon_polly/
[52]: https://docs.datadoghq.com/integrations/amazon_rds/
[53]: https://docs.datadoghq.com/integrations/amazon_rds_proxy/
[54]: https://docs.datadoghq.com/integrations/amazon_redshift/
[55]: https://docs.datadoghq.com/integrations/amazon_route53/
[56]: https://docs.datadoghq.com/integrations/amazon_s3/
[57]: https://docs.datadoghq.com/integrations/amazon_ses/
[58]: https://docs.datadoghq.com/integrations/amazon_sns/
[59]: https://docs.datadoghq.com/integrations/amazon_sqs/
[60]: https://docs.datadoghq.com/integrations/amazon_vpc/
[61]: https://docs.datadoghq.com/integrations/amazon_workspaces/
[62]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_web_services/assets/service_checks.json
[63]: https://docs.datadoghq.com/integrations/guide/aws-integration-troubleshooting/
[64]: https://www.datadoghq.com/blog/monitor-aws-control-plane-api-usage-metrics/
[65]: https://www.datadoghq.com/blog/aws-reinvent-2022-recap/
[66]: https://www.datadoghq.com/blog/iam-least-privilege/

