---
further_reading:
- link: /logs/explorer/
  tag: Documentación
  text: Aprende a explorar tus registros
- link: /logs/explorer/#visualize
  tag: Documentación
  text: Realizar análisis de registros
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende a procesar tus registros
- link: /logs/guide/reduce_data_transfer_fees
  tag: Guía
  text: Cómo enviar registros a Datadog mientras reduces las tarifas de transferencia
    de datos
- link: https://learn.datadoghq.com/courses/send-aws-logs
  tag: Centro de Aprendizaje
  text: Enviar registros de AWS
title: Enviar registros de servicios de AWS con la función Lambda de Datadog
---
Los registros de servicios de AWS se pueden recopilar con la función Lambda Forwarder de Datadog. Esta Lambda—que se activa en los buckets de S3, grupos de registros de CloudWatch y eventos de EventBridge—reenvía registros a Datadog.

Para comenzar a recopilar registros de tus servicios de AWS:

1. Configura la [función Lambda Forwarder de Datadog][1] en tu cuenta de AWS.
2. [Habilita el registro](#enable-logging-for-your-aws-service) para tu servicio de AWS (la mayoría de los servicios de AWS pueden registrar en un bucket de S3 o en un grupo de registros de CloudWatch).
3. [Configura los disparadores](#set-up-triggers) que hacen que la función Lambda Forwarder se ejecute cuando hay nuevos registros que se deben reenviar. Hay dos formas de configurar los disparadores.

**Notas**:
   - Puedes usar [AWS PrivateLink][2] para enviar tus registros a través de una conexión privada.
   - CloudFormation crea una política IAM que incluye `KMS:Decrypt` para todos los recursos, y no se alinea con las mejores prácticas de AWS Security Hub. Este permiso se utiliza para descifrar objetos de buckets de S3 cifrados con KMS para configurar la función Lambda, y la clave KMS utilizada para cifrar los buckets de S3 no se puede predecir. Puedes eliminar de forma segura este permiso después de que la instalación finalice con éxito.

## Habilita el registro para tu servicio de AWS {#enable-logging-for-your-aws-service}

Cualquier servicio de AWS que genere registros en un bucket de S3 o en un grupo de registros de CloudWatch es compatible. Encuentra las instrucciones de configuración para los servicios más utilizados en la tabla a continuación:

| Servicio de AWS                        | Activar el registro del servicio de AWS                                                                                   | Enviar registros de AWS a Datadog                                                                                                     |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [API Gateway][3]                   | [Habilitar registros de Amazon API Gateway][4]                                                                            | [Manual][5] y recolección automática[ de registros](#automatically-set-up-triggers).                                                  |
| [AppSync][64]                      | [Habilitar registros de AWS AppSync][65]                                                                                  | [Manual][65] y recolección automática[ de registros](#automatically-set-up-triggers).                                                  |
| Lote                              | `-`                                                                                                            | [Recolección automática](#automatically-set-up-triggers) de registros.                                                  |
| [Bedrock Agentcore][74]            | `-`                                                                                                            | [Recolección automática](#automatically-set-up-triggers) de registros.                                                  |
| [Cloudfront][6]                    | [Habilitar registros de Amazon CloudFront][7]                                                                             | [Manual][8] y recolección automática[ de registros](#automatically-set-up-triggers).                                                  |
| [CloudTrail][9]                    | [Habilitar registros de AWS CloudTrail][9]                                                                                | [Recolección manual y automática de registros][10]. Consulta [Configuración de AWS para Cloud SIEM][11] si estás configurando AWS CloudTrail para Cloud SIEM. |
| [CodeBuild][66]                    | [Habilitar registros de AWS CodeBuild][67]                                                                                | [Recolección manual y automática de registros][67].                                                  |
| [DMS][68]                          | [Habilitar los registros del Servicio de Migración de Bases de Datos de AWS][69]                                                               | [Recolección manual y automática de registros][69].                                                  |
| [DocumentDB][70]                   | [Habilitar los registros de Amazon DocumentDB][71]                                                                            | [Recolección manual y automática de registros][71].                                                  |
| [DynamoDB][12]                     | [Habilitar los registros de Amazon DynamoDB][13]                                                                              | [Recolección manual de registros][14].                                                                                                 |
| [EC2][15]                          | `-`                                                                                                            | Utiliza el [Datadog Agent][15] para enviar tus registros a Datadog.                                                                    |
| [ECS][16]                          | `-`                                                                                                            | Utiliza el Docker Agent para recopilar tus registros o [recolección manual y automática de registros.](#automatically-set-up-triggers)                                                                              |
| [EKS][62]                          | [Habilitar los registros de Amazon EKS][63]                                                                                   | [Recolección manual y automática de registros][63].                                                 |
| [Elastic Load Balancing (ELB)][18] | [Habilitar los registros de Amazon ELB][19]                                                                                   | [Recolección manual y automática de registros][20].                                                 |
| [Glue][76]                         | [Habilitar los registros de AWS Glue][77]                                                                                     | [Recolección manual y automática de registros][77].                                                 |
| [IoT Core][74]                     | [Habilitar los registros de Amazon IoT Core][75]                                                                              | [Recolección automática de registros.](#automatically-set-up-triggers)                                                                  |
| [Lambda][21]                       | `-`                                                                                                            | [Recolección manual y automática de registros][22].                                                 |
| [MWAA][55]                         | [Habilitar registros de Amazon MWAA][56]                                                                                  | [Recolección manual y automática de registros][56].                                                 |
| [Network Firewall][57]             | [Habilitar registros de AWS Network Firewall][58]                                                                         | [Manual][58] y [recolección automática de registros.                                                 |
| [PCS][75]                          | `-`                                                                                                            | [Colección](#automatically-set-up-triggers) automática de registros.                                                  |
| [RDS][23]                          | [Habilitar registros de Amazon RDS][24]                                                                                   | [Recolección manual de registros][25].                                                                                                |
| [RedShift][34]                     | [Habilitar registros de Amazon Redshift][35]                                                                              | [Manual][36] y [colección](#automatically-set-up-triggers) automática de registros.                                                 |
| Redshift Serverless                | `-`                                                                                                            | [Colección](#automatically-set-up-triggers) automática de registros.                                                                  |
| [Route 53][59]                     | Habilitar [registros de consultas DNS][60] de Amazon Route 53 y [registros de consultas de resolutor][73]                                                                                                                                                  | [Manual][61] y [colección](#automatically-set-up-triggers) automática de registros.                                                 |
| [S3][29]                           | [Habilitar registros de Amazon S3][30]                                                                                    | [Manual][31] y [colección](#automatically-set-up-triggers) automática de registros.                                                 |
| [SNS][32]                          | SNS no proporciona registros, pero puedes procesar registros y eventos que están transitando hacia el Servicio SNS. | [Manual][33] colección de registros.                                                                                                 |
| SSM                                | `-`                                                                                                            | [Recolección](#automatically-set-up-triggers) automática de registros.                                                            |
| [Step Functions][52]               | [Habilitar registros de Amazon Step Functions][53]                                                                        | [Recolección manual de registros][54].                                                                                                 |
| [Verified Access][37]              | [Habilitar registros de Verified Access][38]                                                                              | [Manual][39] y [recolección automática de registros.](#automatically-set-up-triggers)                                                                                                 |
| [VPC][40]                          | [Habilitar registros de Amazon VPC][41]                                                                                   | [Manual][42] y [recolección](#automatically-set-up-triggers) automática de registros.                                                                                                 |
| [VPN][26]                          | [Habilitar registros de AWS VPN][72]                                                                                      | [Manual][27] y [recolección](#automatically-set-up-triggers) automática de registros.                                                                                                 |
| [Web Application Firewall][49]     | [Habilitar registros de AWS WAF][50]                                                                                      | [Manual][51] y [recolección automática de registros.](#automatically-set-up-triggers)                                                 |



## Configurar disparadores {#set-up-triggers}

Hay dos opciones al configurar disparadores en la función Lambda de Datadog Forwarder:

- [Automáticamente](#automatically-set-up-triggers): Datadog recupera automáticamente las ubicaciones de los registros para los servicios de AWS seleccionados y las agrega como disparadores en la función Lambda de Datadog Forwarder. Datadog también mantiene la lista actualizada.
- [Manualmente](#manually-set-up-triggers): Configura cada disparador tú mismo.

### Configurar disparadores automáticamente {#automatically-set-up-triggers}

Datadog puede configurar automáticamente disparadores en la función Lambda de Datadog Forwarder para recopilar registros de AWS. Sin embargo, la suscripción automática no admite la creación de disparadores en diferentes cuentas o regiones de AWS. Para escenarios donde los registros se publican en buckets de S3 en una cuenta separada, recomendamos crear manualmente un disparador en la misma cuenta que el bucket para sortear esta limitación.

Las siguientes fuentes y ubicaciones son compatibles:

| Fuente                      | Ubicación       |
| --------------------------- | -------------- |
| Apache Airflow (MWAA)       | CloudWatch     |
| Registros de Acceso de API Gateway     | CloudWatch     |
| Registros de Ejecución de API Gateway  | CloudWatch     |
| Registros de Acceso de ELB de Aplicación | S3             |
| Registros de AppSync                | CloudWatch     |
| Batch                       | CloudWatch     |
| Registros de Bedrock Agentcore      | S3, CloudWatch |
| Registros de Acceso de ELB Clásico     | S3             |
| Registros de Acceso de CloudFront      | S3             |
| Registros de Cloudtrail             | S3, CloudWatch |
| Registros de CodeBuild              | S3, CloudWatch |
| Registros de DMS                    | CloudWatch     |
| Registros de DocumentDB             | CloudWatch     |
| Registros de ECS                    | CloudWatch     |
| Registros del Plano de Control de EKS      | CloudWatch     |
| Registros de Insights de Contenedor de EKS | CloudWatch     |
| Registros de Glue Jobs              | CloudWatch     |
| Registros de Lambda                 | CloudWatch     |
| Registros de Lambda@Edge            | CloudWatch     |
| Registros de IoT Core                    | CloudWatch     |
| Registros de Firewall de Red       | S3, CloudWatch |
| Registros de PCS                    | CloudWatch     |
| Registros de Redshift               | S3, CloudWatch |
| Registros de Redshift Serverless    | CloudWatch     |
| Registros de RDS                    | CloudWatch     |
| Registros de Consultas DNS de Route53      | CloudWatch     |
| Registros de consultas de Route53 Resolver | S3, CloudWatch |
| Registros de Acceso a S3              | S3             |
| Registros de Comandos de SSM            | CloudWatch     |
| Step Functions              | CloudWatch     |
| Registros de Acceso Verificado        | S3, CloudWatch |
| Registros de Flujo de VPC               | S3, CloudWatch |
| Registros de VPN                    | CloudWatch     |
| Firewall de aplicaciones web    | S3, CloudWatch |

**Nota**: [Los filtros de suscripción][48] son creados automáticamente en los grupos de registros de CloudWatch por el DatadogForwarder, y se nombran en el formato `DD_LOG_SUBSCRIPTION_FILTER_<LOG_GROUP_NAME>`.

1. Si aún no lo has hecho, configura la [función Lambda de recopilación de registros de Datadog][1].
2. Asegúrese de que la política del rol IAM utilizado para la [integración de Datadog-AWS][43] tenga los siguientes permisos. La información sobre cómo se utilizan estos permisos se puede encontrar en las descripciones a continuación:

    ```text
    "airflow:GetEnvironment",
    "airflow:ListEnvironments",
    "appsync:ListGraphqlApis",
    "batch:DescribeJobDefinitions",
    "cloudfront:GetDistributionConfig",
    "cloudfront:ListDistributions",
    "cloudtrail:GetTrail",
    "cloudtrail:ListTrails",
    "codebuild:BatchGetProjects",
    "codebuild:ListProjects",
    "dms:DescribeReplicationInstances",
    "ec2:DescribeFlowLogs",
    "ec2:DescribeVerifiedAccessInstanceLoggingConfigurations",
    "ec2:DescribeVpnConnections",
    "ecs:DescribeTaskDefinition",
    "ecs:ListTaskDefinitionFamilies",
    "eks:DescribeCluster",
    "eks:ListClusters",
    "elasticloadbalancing:DescribeLoadBalancerAttributes",
    "elasticloadbalancing:DescribeLoadBalancers",
    "glue:BatchGetJobs",
    "glue:GetJobs",
    "glue:GetJob",
    "glue:ListJobs",
    "iot:GetV2LoggingOptions",
    "lambda:GetPolicy",
    "lambda:InvokeFunction",
    "lambda:List*",
    "logs:DeleteSubscriptionFilter",
    "logs:DescribeDeliveries",
    "logs:DescribeDeliverySources",
    "logs:DescribeLogGroups",
    "logs:DescribeSubscriptionFilters",
    "logs:GetDeliveryDestination",
    "logs:PutSubscriptionFilter",
    "network-firewall:DescribeLoggingConfiguration",
    "network-firewall:ListFirewalls",
    "rds:DescribeDBClusters",
    "rds:DescribeDBInstances",
    "redshift-serverless:ListNamespaces",
    "redshift:DescribeClusters",
    "redshift:DescribeLoggingStatus",
    "route53:ListQueryLoggingConfigs",
    "route53resolver:ListResolverQueryLogConfigs",
    "s3:GetBucketLocation",
    "s3:GetBucketLogging",
    "s3:GetBucketNotification",
    "s3:ListAllMyBuckets",
    "s3:PutBucketNotification",
    "ssm:GetServiceSetting",
    "ssm:ListCommands",
    "states:DescribeStateMachine",
    "states:ListStateMachines",
    "wafv2:ListLoggingConfigurations"
    ```

    | AWS Permission                                              | Description                                                                  |
    | ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
    | `airflow:ListEnvironments`                                  | List all MWAA environment names.                                             |
    | `airflow:GetEnvironment`                                    | Get information about a MWAA environment.                                    |
    | `appsync:ListGraphqlApis`                                   | List all GraphQL Apis.                                                       |
    | `batch:DescribeJobDefinitions`                              | List all Batch job definitions.                                              |
    | `cloudfront:GetDistributionConfig`                          | Get the name of the S3 bucket containing CloudFront access logs.             |
    | `cloudfront:ListDistributions`                              | List all CloudFront distributions.                                           |
    | `cloudtrail:GetTrail`                                       | Get Trail logging information.                                               |
    | `cloudtrail:ListTrails`                                     | List all Cloudtrail trails.                                                  |
    | `codebuild:BatchGetProjects`                                | List all CodeBuild projects.                                                 |
    | `codebuild:ListProjects`                                    | Get information on CodeBuild projects.                                       |
    | `dms:DescribeReplicationInstances`                          | List all replication instances for DMS.                                      |
    | `ec2:DescribeFlowLogs`                                      | List all Flow log configurations.                                            |
    | `ec2:DescribeVerifiedAccessInstanceLoggingConfigurations`   | List all Verified Access instance logging configurations.                    |
    | `ec2:DescribeVpnConnections`                                | List all VPN connections.                                                    |
    | `ecs:DescribeTaskDefinition`                                | Describe ECS task definition.                                                |
    | `ecs:ListTaskDefinitionFamilies`                            | List all task definition families.                                           |
    | `elasticloadbalancing:`<br>`DescribeLoadBalancers`          | List all load balancers.                                                     |
    | `elasticloadbalancing:`<br>`DescribeLoadBalancerAttributes` | Get the name of the S3 bucket containing ELB access logs.                    |
    | `glue:BatchGetJobs`                                             | Get information about multiple Glue jobs.                                    |
    | `glue:GetJob`                                               | Get information about a Glue job.                                            |
    | `glue:GetJobs`                                              | List all Glue jobs.                                                          |
    | `glue:ListJobs`                                             | List all Glue job names.                                                     |
    | `eks:DescribeCluster`                                       | Describe an EKS cluster.                                                     |
    | `eks:ListClusters`                                          | List all EKS clusters.                                                       |
    | `iot:GetV2LoggingOptions`                                   | Get IoT V2 logging options.                                                  |
    | `lambda:InvokeFunction`                                     | Invoke a Lambda function.                                                    |
    | `lambda:List*`                                              | List all Lambda functions.                                                   |
    | `lambda:GetPolicy`                                          | Get the Lambda policy when triggers are to be removed.                       |
    | `logs:PutSubscriptionFilter`                                | Add a Lambda trigger based on CloudWatch Log events.                         |
    | `logs:DeleteSubscriptionFilter`                             | Remove a Lambda trigger based on CloudWatch Log events.                      |
    | `logs:DescribeLogGroups`                                    | Describe CloudWatch log groups.                                              |
    | `logs:DescribeDeliveries`                                   | Describe CloudWatch log deliveries.                                          |
    | `logs:DescribeDeliverySources`                              | Describe CloudWatch log delivery sources.                                    |
    | `logs:DescribeSubscriptionFilters`                          | List the subscription filters for the specified log group.                   |
    | `logs:GetDeliveryDestination`                               | Get a CloudWatch log delivery destination.                                   |
    | `network-firewall:DescribeLoggingConfiguration`             | Get the logging configuration of a firewall.                                 |
    | `network-firewall:ListFirewalls`                            | List all Network Firewall firewalls.                                         |
    | `rds:DescribeDBClusters`                                    | List all RDS clusters.                                                       |
    | `rds:DescribeDBInstances`                                   | List all RDS instances.                                                      |
    | `redshift:DescribeClusters`                                 | List all Redshift clusters.                                                  |
    | `redshift:DescribeLoggingStatus`                            | Get the name of the S3 bucket containing Redshift Logs.                      |
    | `redshift-serverless:ListNamespaces`                        | List all Redshift Serverless namespaces.                                     |
    | `route53:ListQueryLoggingConfigs`                           | List all DNS query logging configurations for Route 53.                      |
    | `route53resolver:ListResolverQueryLogConfigs`               | List all Resolver query logging configurations for Route 53.                 |
    | `s3:GetBucketLogging`                                       | Get the name of the S3 bucket containing S3 access logs.                     |
    | `s3:GetBucketLocation`                                      | Get the region of the S3 bucket containing S3 access logs.                   |
    | `s3:GetBucketNotification`                                  | Get existing Lambda trigger configurations.                                  |
    | `s3:ListAllMyBuckets`                                       | List all S3 buckets.                                                         |
    | `s3:PutBucketNotification`                                  | Add or remove a Lambda trigger based on S3 bucket events.                    |
    | `ssm:GetServiceSetting`                                     | Get the SSM service setting for customer script log group name.              |
    | `ssm:ListCommands`                                          | List all SSM commands.                                                       |
    | `states:ListStateMachines`                                  | List all Step Functions.                                                     |
    | `states:DescribeStateMachine`                               | Get logging details about a Step Function.                                   |
    | `wafv2:ListLoggingConfigurations`                           | List all logging configurations of the Web Application Firewall.             |


3. En la [página de integración de AWS][44], selecciona la cuenta de AWS de la que deseas recopilar registros y haz clic en la pestaña **Recopilación de registros**.
4. En la sección **Datadog Forwarder Lambda**, ingresa el ARN de la Lambda creada en la sección anterior y haz clic en **Agregar**. La función Lambda aparece en la tabla a continuación con su nombre, versión y región.
5. En la sección **Autosuscripción de registros**, bajo **Fuentes de registros**, habilita los servicios de los cuales deseas recopilar registros activándolos. Para dejar de recopilar registros de un servicio en particular, desactiva la fuente de registro.
6. (Opcional) En la sección **Filtros de etiquetas de fuente de registro**, puedes filtrar la recopilación de registros por etiquetas de recursos para cada fuente de registro. Selecciona una fuente de registro del menú desplegable y agrega etiquetas en el formato `key:value` para limitar qué registros de recursos se recopilan. **Nota**: Las etiquetas de recursos se convierten automáticamente a minúsculas para coincidir con las convenciones de la plataforma de Datadog. Define tus filtros de etiquetas en minúsculas para evitar desajustes.
7. Si tienes registros en múltiples regiones, debes crear funciones Lambda adicionales en esas regiones y agregarlas en la sección **Datadog Forwarder Lambda**.
8. Para dejar de recopilar todos los registros de AWS de una función Lambda específica, pasa el cursor sobre la Lambda en la tabla y haz clic en el ícono de eliminar. Se eliminan todos los disparadores para esa función.
9. Dentro de unos minutos después de esta configuración inicial, tus registros de AWS aparecerán en el [Explorador de Registros de Datadog][45].

### Configura los disparadores manualmente {#manually-set-up-triggers}

#### Recopilando registros del grupo de registros de CloudWatch {#collecting-logs-from-cloudwatch-log-group}

Si estás recopilando registros de un grupo de registros de CloudWatch, configura el disparador para la [función Lambda de Datadog Forwarder][1] utilizando uno de los siguientes métodos:

{{< tabs >}}
{{% tab "Consola de AWS" %}}

1. En la consola de AWS, ve a **Lambda**.
2. Haz clic en **Funciones** y selecciona el Datadog Forwarder.
3. Haz clic en **Agregar disparador** y selecciona **Registros de CloudWatch**.
4. Selecciona el grupo de registros del menú desplegable.
5. Ingresa un nombre para tu filtro y, opcionalmente, especifica un patrón de filtro.
6. Haz clic en **Agregar**.
7. Ve a la [sección de Registros de Datadog][1] para explorar cualquier nuevo evento de registro enviado a tu grupo de registros.

[1]: https://app.datadoghq.com/logs
{{% /tab %}}
{{% tab "Terraform" %}}

Para los usuarios de Terraform, puedes aprovisionar y gestionar tus disparadores utilizando el recurso [aws_cloudwatch_log_subscription_filter][1]. Consulta el código de ejemplo a continuación.

```conf
data "aws_cloudwatch_log_group" "some_log_group" {
  name = "/some/log/group"
}

resource "aws_lambda_permission" "lambda_permission" {
  action        = "lambda:InvokeFunction"
  function_name = "datadog-forwarder" # this is the default but may be different in your case
  principal     = "logs.amazonaws.com" # or logs.amazonaws.com.cn for China*
  source_arn    = data.aws_cloudwatch_log_group.some_log_group.arn
}

resource "aws_cloudwatch_log_subscription_filter" "datadog_log_subscription_filter" {
  name            = "datadog_log_subscription_filter"
  log_group_name  = <CLOUDWATCH_LOG_GROUP_NAME> # for example, /some/log/group
  destination_arn = <DATADOG_FORWARDER_ARN> # for example,  arn:aws:lambda:us-east-1:123:function:datadog-forwarder
  filter_pattern  = ""
}
```
\*{{% mainland-china-disclaimer %}}

[1]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_subscription_filter
{{% /tab %}}
{{% tab "CloudFormation" %}}

Para los usuarios de AWS CloudFormation, pueden aprovisionar y gestionar sus disparadores utilizando el recurso de CloudFormation [AWS::Logs::SubscriptionFilter][1]. Consulta el código de ejemplo a continuación.

El código de muestra también funciona para AWS [SAM][2] y [Serverless Framework][3]. Para Serverless Framework, coloca el código en la sección [resources][4] dentro de tu `serverless.yml`.

```yaml
Resources:
  MyLogSubscriptionFilter:
    Type: "AWS::Logs::SubscriptionFilter"
    Properties:
      DestinationArn: "<DATADOG_FORWARDER_ARN>"
      LogGroupName: "<CLOUDWATCH_LOG_GROUP_NAME>"
      FilterPattern: ""
```

[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-subscriptionfilter.html
[2]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html
[3]: https://www.serverless.com/
[4]: https://www.serverless.com/framework/docs/providers/aws/guide/resources/
{{% /tab %}}
{{< /tabs >}}

#### Recopilando registros de buckets S3 {#collecting-logs-from-s3-buckets}

Si estás recolectando registros de un bucket S3, configura el disparador para la [función Lambda de Datadog Forwarder][1] utilizando uno de los siguientes métodos:

{{< tabs >}}
{{% tab "Consola de AWS" %}}

1. Una vez que la función Lambda esté instalada, añade manualmente un disparador en el bucket S3 que contiene tus registros en la consola de AWS:
  {{< img src="logs/aws/adding_trigger.png" alt="Añadiendo disparador" popup="true"style="width:80%;">}}

2. Selecciona el bucket y luego sigue las instrucciones de AWS:
  {{< img src="logs/aws/integration_lambda.png" alt="Integration Lambda" popup="true" style="width:80%;">}}

3. Establece el tipo de evento correcto en los buckets S3:
  {{< img src="logs/aws/object_created.png" alt="Objeto Creado" popup="true" style="width:80%;">}}

Una vez hecho, ve a tu [sección de registros de Datadog][1] para comenzar a explorar tus registros.

[1]: https://app.datadoghq.com/logs
{{% /tab %}}
{{% tab "Terraform" %}}

Para los usuarios de Terraform, pueden aprovisionar y gestionar sus disparadores utilizando el recurso [aws_s3_bucket_notification][1]. Consulta el código de muestra a continuación.

```conf
resource "aws_s3_bucket_notification" "my_bucket_notification" {
  bucket = my_bucket
  lambda_function {
    lambda_function_arn = "<DATADOG_FORWARDER_ARN>"
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = "AWSLogs/"
    filter_suffix       = ".log"
  }
}
```


[1]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_notification
{{% /tab %}}
{{% tab "CloudFormation" %}}

Para los usuarios de CloudFormation, pueden configurar disparadores utilizando la [NotificationConfiguration][1] de CloudFormation para su bucket S3. Consulta el código de muestra a continuación.

```yaml
Resources:
  Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: "<MY_BUCKET>"
      NotificationConfiguration:
        LambdaConfigurations:
        - Event: 's3:ObjectCreated:*'
          Function: "<DATADOG_FORWARDER_ARN>"
```


[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-notificationconfig.html
{{% /tab %}}
{{< /tabs >}}


## Limpieza y filtrado {#scrubbing-and-filtering}

Puedes limpiar correos electrónicos o direcciones IP de los registros enviados por la función Lambda, o definir una regla de limpieza personalizada [en los parámetros de Lambda][46].
También puedes excluir o enviar solo aquellos registros que coincidan con un patrón específico utilizando la [opción de filtrado][47].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/serverless/forwarder/
[2]: /es/serverless/forwarder#aws-privatelink-support
[3]: /es/integrations/amazon_api_gateway/
[4]: /es/integrations/amazon_api_gateway/#log-collection
[5]: /es/integrations/amazon_api_gateway/#send-logs-to-datadog
[6]: /es/integrations/amazon_cloudfront/
[7]: /es/integrations/amazon_cloudfront/#enable-cloudfront-logging
[8]: /es/integrations/amazon_cloudfront/#send-logs-to-datadog
[9]: /es/integrations/amazon_cloudtrail/#enable-cloudtrail-logging
[10]: /es/integrations/amazon_cloudtrail/#send-logs-to-datadog
[11]: /es/security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
[12]: /es/integrations/amazon_dynamodb/#enable-dynamodb-logging
[13]: /es/integrations/amazon_dynamodb/
[14]: /es/integrations/amazon_dynamodb/#send-logs-to-datadog
[15]: /es/integrations/amazon_ec2/
[16]: /es/integrations/amazon_ecs/
[17]: /es/integrations/amazon_ecs/#log-collection
[18]: /es/integrations/amazon_elb/
[19]: /es/integrations/amazon_elb/#enable-aws-elb-logging
[20]: /es/integrations/amazon_elb/#manual-installation-steps
[21]: /es/integrations/amazon_lambda/
[22]: /es/integrations/amazon_lambda/#log-collection
[23]: /es/integrations/amazon_rds/
[24]: /es/integrations/amazon_rds/#enable-rds-logging
[25]: /es/integrations/amazon_rds/#send-logs-to-datadog
[26]: /es/integrations/amazon-vpn/
[27]: /es/integrations/amazon-vpn/#send-logs-to-datadog
[28]: /es/integrations/amazon_route53/#send-logs-to-datadog
[29]: /es/integrations/amazon_s3/
[30]: /es/integrations/amazon_s3/#enable-s3-access-logs
[31]: /es/integrations/amazon_s3/#manual-installation-steps
[32]: /es/integrations/amazon_sns/
[33]: /es/integrations/amazon_sns/#send-logs-to-datadog
[34]: /es/integrations/amazon_redshift/
[35]: /es/integrations/amazon-redshift/#enable-logging
[36]: /es/integrations/amazon-redshift/#log-collection
[37]: /es/integrations/amazon-verified-access/
[38]: /es/integrations/amazon-verified-access/#enable-verified-access-logs
[39]: /es/integrations/amazon-verified-access/#log-collection
[40]: /es/integrations/amazon_vpc/
[41]: /es/integrations/amazon_vpc/#enable-vpc-flow-log-logging
[42]: /es/integrations/amazon_vpc/#log-collection
[43]: /es/integrations/amazon_web_services/
[44]: https://app.datadoghq.com/integrations/amazon-web-services
[45]: https://app.datadoghq.com/logs
[46]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-scrubbing-optional
[47]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-filtering-optional
[48]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters
[49]: /es/integrations/amazon_waf/
[50]: /es/integrations/amazon_waf/#log-collection
[51]: /es/integrations/amazon_waf/#send-logs-to-datadog
[52]: /es/integrations/amazon_step_functions/
[53]: /es/integrations/amazon_step_functions/#log-collection
[54]: /es/integrations/amazon_step_functions/#send-logs-to-datadog
[55]: /es/integrations/amazon_mwaa/
[56]: /es/integrations/amazon_mwaa/#log-collection
[57]: /es/integrations/amazon_network_firewall/
[58]: /es/integrations/amazon_network_firewall/#log-collection
[59]: /es/integrations/amazon_route53/
[60]: /es/integrations/amazon_route53/#enable-route53-dns-query-logging
[61]: /es/integrations/amazon_route53/#send-logs-to-datadog
[62]: /es/integrations/amazon-eks/
[63]: /es/integrations/amazon-eks/#log-collection
[64]: /es/integrations/amazon-appsync/
[65]: /es/integrations/amazon-appsync/#send-logs-to-datadog
[66]: /es/integrations/amazon-codebuild/
[67]: /es/integrations/amazon-codebuild/#send-logs-to-datadog
[68]: /es/integrations/amazon-dms/
[69]: /es/integrations/amazon-dms/#send-logs-to-datadog
[70]: /es/integrations/amazon-documentdb/
[71]: /es/integrations/amazon-documentdb/#send-logs-to-datadog
[72]: /es/integrations/amazon-vpn/#enable-logging
[73]: /es/integrations/amazon_route53/#enable-route53-resolver-query-logging
[74]: /es/integrations/amazon-iot/
[75]: /es/integrations/amazon-iot/#enable-logging
[74]: /es/integrations/amazon-bedrock/
[75]: /es/integrations/amazon-pcs/
[76]: /es/integrations/amazon_glue/
[77]: /es/integrations/amazon_glue/#log-collection