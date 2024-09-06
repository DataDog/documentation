---
aliases:
- /es/integrations/aws/
- /es/logs/aws
- /es/integrations/faq/revoking-aws-keys-and-enabling-role-delegation-for-the-datadog-aws-integration/
- /es/integrations/faq/additional-aws-metrics-min-max-sum
- /es/integrations/faq/why-am-i-only-seeing-the-average-values-of-my-custom-aws-cloudwatch-metrics/
categories:
- aws
- cloud
- iot
- log collection
- event management
custom_kind: integración
dependencies: []
description: Integra tus servicios de AWS con Datadog.
doc_link: https://docs.datadoghq.com/integrations/amazon_web_services/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-aws-control-plane-api-usage-metrics/
  tag: Blog
  text: Monitoriza las métricas de uso de la API del plano de control de AWS en Datadog
- link: https://www.datadoghq.com/blog/aws-reinvent-2022-recap/
  tag: Blog
  text: Aspectos destacados de AWS re:Invent 2022
git_integration_title: amazon_web_services
has_logo: true
integration_id: amazon-web-services
integration_title: AWS
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_web_services
public_title: Integración de AWS con Datadog
short_description: Integra tus servicios de AWS con Datadog.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

Conecta Amazon Web Services (AWS) para:

- Consulta de las actualizaciones automáticas del estado de AWS en tu Explorador de eventos
- Obtener las métricas de CloudWatch de los hosts EC2 sin necesidad de instalar el Agent
- Etiquetar tus hosts EC2 con información concreta sobre EC2
- Ver los eventos de mantenimiento programados de EC2 en tu flujo (stream)
- Recopilar las métricas y eventos de CloudWatch de muchos otros productos de AWS
- Consulta de las alarmas de CloudWatch en tu Explorador de eventos

Para empezar a utilizar la integración de AWS cuanto antes, consulta la [guía sobre cómo empezar con AWS][1].

La integración Amazon Web Services de Datadog recopila logs, eventos y [todas las métricas de CloudWatch][2] para más de [90 servicios AWS][3].

## Configuración

Usa uno de los siguientes métodos para integrar tus cuentas de AWS en Datadog con el fin de recopilar métricas, eventos, etiquetas y logs.

### Automática

  * **CloudFormation (el mejor método para empezar cuanto antes)**  
      Para configurar la integración de AWS con CloudFormation, consulta la [guía sobre cómo empezar con AWS][1].

  * **Terraform**  
    Para configurar la integración AWS con Terraform, consulta la [integración AWS con Terraform][4].

  * **Control Tower**  
    Para configurar la integración AWS al proporcionar una nueva cuenta AWS con [Control Tower Account Factory][5], consulta la [guía de configuración de Control Tower][6].

  * **Configuración de varias cuentas para AWS Organizations**
    Para configurar la integración AWS para varias cuentas dentro de una organización AWS, consulta la [guía de configuración de AWS Organizations][7].

{{% site-region region="gov" %}}
<div class="alert alert-warning">
Si estás utilizando el sitio US1-FED de Datadog, debes configurar la integración con claves de acceso. Sigue los pasos de la <a href="https://docs.datadoghq.com/integraciones/guide/AWS-manual-setup/?pestaña=accesskeysgovcloudorchinaonly">guía de configuración manual de AWS</a>.
</div>
{{% /site-region %}}

### Manual 

   * **Delegación de roles**  
     Para configurar manualmente la integración AWS con delegación de roles, consulta la [guía de configuración manual][8].

   * **Claves de acceso (sólo GovCloud o China)**
     Para configurar la integración AWS con claves de acceso, consulta la [guía de configuración manual][9].  

      *\* Cualquier uso de los servicios Datadog en China continental (o relacionados con entornos de esta localización) está sujeto a la cláusula de exención de responsabilidad, publicada en la sección [Localizaciones con restricciones de servicio][10] de nuestro sitio web.*

{{% aws-permissions %}}

{{% aws-resource-collection %}}

## Recopilación de logs

Existen dos formas de enviar los logs de los servicios de AWS a Datadog:

- [Destino Amazon Data Firehose][11]: Utiliza el destino Datadog en tu flujo de entrega de Amazon Data Firehose para reenviar logs a Datadog. Recomendamos utilizar esta estrategia para el envío de grandes volúmenes de logs desde CloudWatch.
- [Función Lambda del Forwarder][12]: Despliega la función Lambda del Datadog Forwarder, que está suscripta a buckets de S3 o a tus grupos de logs de CloudWatch y reenvía logs a Datadog. Datadog también te recomienda utilizar esta estrategia para enviar logs desde S3 u otros recursos que no puedan transmitir datos directamente a Amazon Data Firehose.

## Recopilación de métricas

Existen dos formas de enviar las métricas de AWS a Datadog:

- [Sondeo de métricas][13]: El sondeo de la API viene predefinido con la integración AWS. Un rastreo métrica-por-métrica de la API CloudWatch extrae datos y los envía a Datadog. En promedio, se extraen nuevas métricas cada diez minutos.
- [Metric Streams con Amazon Data Firehose][14]: Puedes utilizar Amazon CloudWatch Metric Streams y Amazon Data Firehose para ver tus métricas. **Nota**: Este método tiene una latencia de dos a tres minutos y requiere una configuración aparte.

En la página [Integraciones][3] encontrarás una lista completa de las sub-integraciones disponibles. Muchas de estas integraciones se instalan por defecto cuando Datadog reconoce los datos procedentes de tu cuenta AWS. Para conocer las opciones de exclusión de recursos específicos y controlar los costes, consulta la página [Facturación de integraciones AWS][15].

## Recopilación de recursos

Algunos productos de Datadog aprovechan la información de configuración de tus recursos de AWS (como buckets de S3, snapshots de RDS y distribuciones de CloudFront). Datadog recopila esta información realizando llamadas de API de sólo lectura a tu cuenta AWS.

{{% aws-resource-collection %}}

### Gestión de la seguridad en la nube (CSM)

#### Configuración

Si no tienes configurada la integración AWS para tu cuenta AWS, completa el [proceso de configuración][16] anterior. Asegúrate de habilitar Cloud Security Management cuando se mencione.

**Nota:** Para usar esta función, es necesario configurar la integración de AWS con **Delegación de roles*.*

Para añadir Cloud Security Management a una integración AWS existente, sigue los pasos que se indican a continuación para habilitar la recopilación de recursos.

1. Proporciona los permisos necesarios al rol de IAM Datadog adjuntando la política de AWS gestionada `SecurityAudit` a tu rol de IAM AWS Datadog. Puedes encontrar este política en la [consola de AWS][17]. 

2. Completa la configuración en la [página de la integración AWS Datadog][18] con los pasos que se indican a continuación. Como alternativa, puedes utilizar el endpoint de la API [Actualizar una integración AWS][8].

   1. Selecciona la cuenta AWS en la que quieres habilitar la recopilación de recursos.
   2. Ve a la pestaña **Recopilación de recursos** de esa cuenta y habilita `Cloud Security Posture Management Collection`.
   3. En la parte inferior derecha de la página, haz clic en `Save`.

## Recopilación de alarmas

Hay dos maneras de enviar alarmas CloudWatch AWS al Explorador de eventos de Datadog:

- Sondeo de alarmas: El sondeo de alarmas viene predefinido en la integración AWS y recupera las alarmas de las métricas a través de la API [DescribeAlarmHistory][19]. Si sigues este método, tus alarmas se organizarán por categorías en la fuente de eventos `Amazon Web Services`. **Nota**: El rastreador no recopila las alarmas compuestas.
- Tema SNS: Puedes ver todas las alarmas de CloudWatch AWS en tu Explorador de eventos suscribiendo las alarmas a un tema SNS y luego reenviando los mensajes SNS a Datadog. Para saber cómo recibir mensajes SNS como eventos en Datadog, consulta [Recibir mensajes SNS][20]. Si sigues este método, tus alarmas se organizarán por categorías en la fuente de eventos `Amazon SNS`.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_web_services" >}}


### Eventos

Los eventos de AWS se recopilan por cada servicio AWS. Para obtener más información sobre eventos recopilados, consulta la [documentación de tu servicio AWS][3].

### Etiquetas (tags)

Las siguientes etiquetas se recopilan con la integración de AWS. **Nota**: Algunas etiquetas solo se muestran en determinadas métricas.

| Integración            | Claves de etiqueta de Datadog                                                                                                                                                                                              |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Todas                    | `region`                                                                                                                                                                                                      |
| [Pasarela API][22]      | `apiid`, `apiname`, `method`, `resource`, `stage`                                                                                                                                                             |
| [App Runner][23]      | `instance`, `serviceid`, `servicename`                                                                                                                                                                       |
| [Escalado automático][24]    | `autoscalinggroupname`, `autoscaling_group`                                                                                                                                                                   |
| [Facturación][25]          | `account_id`, `budget_name`, `budget_type`, `currency`, `servicename`, `time_unit`                                                                                                                            |
| [CloudFront][26]       | `distributionid`                                                                                                                                                                                              |
| [CodeBuild][27]              | `project_name`                                                                                                                                                                                                |
| [CodeDeploy][28]       | `application`, `creator`, `deployment_config`, `deployment_group`, `deployment_option`, `deployment_type`, `status`                                                                                           |
| [DirectConnect][29]    | `connectionid`                                                                                                                                                                                                |
| [DynamoDB][30]         | `globalsecondaryindexname`, `operation`, `streamlabel`, `tablename`                                                                                                                                           |
| [EBS] [31]              | `volumeid`, `volume-name`, `volume-type`                                                                                                                                                                      |
| [EC2][32]              | `autoscaling_group`, `availability-zone`, `image`, `instance-id`, `instance-type`, `kernel`, `name`, `security_group_name`                                                                                    |
| [ECS][33]              | `clustername`, `servicename`, `instance_id`                                                                                                                                                                   |
| [EFS][34]              | `filesystemid`                                                                                                                                                                                                |
| [ElastiCache][35]      | `cachenodeid`, `cache_node_type`, `cacheclusterid`, `cluster_name`, `engine`, `engine_version`, `preferred_availability-zone`, `replication_group`                                                             |
| [ElasticBeanstalk][36] | `environmentname`, `enviromentid`                                                                                                                                                                             |
| [ELB][37]              | `availability-zone`, `hostname`, `loadbalancername`, `name`, `targetgroup`                                                                                                                                    |
| [EMR][38]              | `cluster_name`, `jobflowid`                                                                                                                                                                                   |
| [ES] [39]               | `dedicated_master_enabled`, `ebs_enabled`, `elasticsearch_version`, `instance_type`, `zone_awareness_enabled`                                                                                                 |
| [Firehose][40]         | `deliverystreamname`                                                                                                                                                                                          |
| [FSx][41]             | `filesystemid`, `filesystemtype`                                                                                                                                                                               |
| [Health][42]           | `event_category`, `status`, `service`                                                                                                                                                                         |
| [IoT][43]              | `actiontype`, `protocol`, `rulename`                                                                                                                                                                          |
| [Kinesis][44]          | `streamname`, `name`, `state`                                                                                                                                                                                 |
| [KMS][45]              | `keyid`                                                                                                                                                                                                       |
| [Lambda][46]           | `functionname`, `resource`, `executedversion`, `memorysize`, `runtime`                                                                                                                                        |
| [Machine Learning][47] | `mlmodelid`, `requestmode`                                                                                                                                                                                    |
| [MQ][48]               | `broker`, `queue`, `topic`                                                                                                                                                                                    |
| [OpsWorks][49]         | `stackid`, `layerid`, `instanceid`                                                                                                                                                                            |
| [Polly][50]            | `operation`                                                                                                                                                                                                   |
| [RDS] [51]              | `auto_minor_version_upgrade`, `dbinstanceclass`, `dbclusteridentifier`, `dbinstanceidentifier`, `dbname`, `engine`, `engineversion`, `hostname`, `name`, `publicly_accessible`, `secondary_availability-zone` |
| [Proxy RDS][52]       | `proxyname`, `target`, `targetgroup`, `targetrole`                                                                                                                                                                                                  |
| [Redshift][53]       | `clusteridentifier`, `latency`, `nodeid`, `service_class`, `stage`, `wlmid`                                                                                                                                   |
| [Route 53][54]        | `healthcheckid`                                                                                                                                                                                               |
| [S3][55]             | `bucketname`, `filterid`, `storagetype`                                                                                                                                                                       |
| [SES] [56]             | Las claves de las etiquetas son un conjunto personalizado en AWS.                                                                                                                                                                               |
| [SNS][57]              | `topicname`                                                                                                                                                                                                   |
| [SQS][58]              | `queuename`                                                                                                                                                                                                   |
| [VPC][59]              | `nategatewayid`, `vpnid`, `tunnelipaddress`                                                                                                                                                                   |
| [WorkSpaces][60]       | `directoryid`, `workspaceid`                                                                                                                                                                                  |

### Checks de servicio
{{< get-service-checks-from-git "amazon_web_services" >}}


## Solucionar problemas

Para solucionar problemas relacionados con la integración AWS, consulta la [guía para la resolución de problemas de la integración AWS][62].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/getting_started/integrations/aws/
[2]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html
[3]: https://docs.datadoghq.com/es/integrations/#cat-aws
[4]: https://docs.datadoghq.com/es/integrations/guide/aws-terraform-setup
[5]: https://docs.aws.amazon.com/controltower/latest/userguide/account-factory.html
[6]: https://aws.amazon.com/blogs/awsmarketplace/deploy-datadogs-aws-integration-accounts-aws-control-tower-account-factory-customization/
[7]: https://docs.datadoghq.com/es/integrations/guide/aws-organizations-setup/
[8]: https://docs.datadoghq.com/es/integrations/guide/aws-manual-setup/
[9]: https://docs.datadoghq.com/es/integrations/guide/aws-manual-setup/?tab=accesskeysgovcloudorchinaonly
[10]: https://www.datadoghq.com/legal/restricted-service-locations/
[11]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[12]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[13]: https://docs.datadoghq.com/es/integrations/guide/cloud-metric-delay/#aws
[14]: https://docs.datadoghq.com/es/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[15]: https://docs.datadoghq.com/es/account_management/billing/aws/
[16]: https://docs.datadoghq.com/es/integrations/amazon_web_services/?tab=roledelegation#setup
[17]: https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit
[18]: https://app.datadoghq.com/integrations/amazon-web-services
[19]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_DescribeAlarmHistory.html#API_DescribeAlarmHistory_RequestParameters
[20]: https://docs.datadoghq.com/es/integrations/amazon_sns/#receive-sns-messages
[21]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/amazon_web_services_metadata.csv
[22]: https://docs.datadoghq.com/es/integrations/amazon_api_gateway/
[23]: https://docs.datadoghq.com/es/integrations/amazon_app_runner
[24]: https://docs.datadoghq.com/es/integrations/amazon_auto_scaling/
[25]: https://docs.datadoghq.com/es/integrations/amazon_billing/
[26]: https://docs.datadoghq.com/es/integrations/amazon_cloudfront/
[27]: https://docs.datadoghq.com/es/integrations/amazon_codebuild/
[28]: https://docs.datadoghq.com/es/integrations/amazon_codedeploy/
[29]: https://docs.datadoghq.com/es/integrations/amazon_directconnect/
[30]: https://docs.datadoghq.com/es/integrations/amazon_dynamodb/
[31]: https://docs.datadoghq.com/es/integrations/amazon_ebs/
[32]: https://docs.datadoghq.com/es/integrations/amazon_ec2/
[33]: https://docs.datadoghq.com/es/integrations/amazon_ecs/
[34]: https://docs.datadoghq.com/es/integrations/amazon_efs/
[35]: https://docs.datadoghq.com/es/integrations/amazon_elasticache/
[36]: https://docs.datadoghq.com/es/integrations/amazon_elasticbeanstalk/
[37]: https://docs.datadoghq.com/es/integrations/amazon_elb/
[38]: https://docs.datadoghq.com/es/integrations/amazon_emr/
[39]: https://docs.datadoghq.com/es/integrations/amazon_es/
[40]: https://docs.datadoghq.com/es/integrations/amazon_firehose/
[41]: https://docs.datadoghq.com/es/integrations/amazon_fsx/
[42]: https://docs.datadoghq.com/es/integrations/amazon_health/
[43]: https://docs.datadoghq.com/es/integrations/amazon_iot/
[44]: https://docs.datadoghq.com/es/integrations/amazon_kinesis/
[45]: https://docs.datadoghq.com/es/integrations/amazon_kms/
[46]: https://docs.datadoghq.com/es/integrations/amazon_lambda/
[47]: https://docs.datadoghq.com/es/integrations/amazon_machine_learning/
[48]: https://docs.datadoghq.com/es/integrations/amazon_mq/
[49]: https://docs.datadoghq.com/es/integrations/amazon_ops_works/
[50]: https://docs.datadoghq.com/es/integrations/amazon_polly/
[51]: https://docs.datadoghq.com/es/integrations/amazon_rds/
[52]: https://docs.datadoghq.com/es/integrations/amazon_rds_proxy/
[53]: https://docs.datadoghq.com/es/integrations/amazon_redshift/
[54]: https://docs.datadoghq.com/es/integrations/amazon_route53/
[55]: https://docs.datadoghq.com/es/integrations/amazon_s3/
[56]: https://docs.datadoghq.com/es/integrations/amazon_ses/
[57]: https://docs.datadoghq.com/es/integrations/amazon_sns/
[58]: https://docs.datadoghq.com/es/integrations/amazon_sqs/
[59]: https://docs.datadoghq.com/es/integrations/amazon_vpc/
[60]: https://docs.datadoghq.com/es/integrations/amazon_workspaces/
[61]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/service_checks.json
[62]: https://docs.datadoghq.com/es/integrations/guide/aws-integration-troubleshooting/