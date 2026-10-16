---
further_reading:
- link: https://learn.datadoghq.com/courses/send-aws-logs
  tag: Centro de aprendizaje
  text: Enviar registros de AWS
- link: https://learn.datadoghq.com/courses/visibility-aws-lambda
  tag: Centro de aprendizaje
  text: Configurar AWS Lambda para Serverless Monitoring con Datadog
- link: /logs/explorer/
  tag: Documentación
  text: Aprenda a explorar sus registros
- link: /logs/explorer/#visualize
  tag: Documentación
  text: Realizar análisis de registros
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprenda a procesar sus registros
- link: /logs/guide/reduce_data_transfer_fees
  tag: Guía
  text: Cómo enviar registros a Datadog mientras reduce las tarifas de transferencia
    de datos
title: Enviar registros de servicios de AWS con la función Lambda de Datadog
---
Los registros de servicios de AWS se pueden recopilar con la función Lambda Datadog Forwarder. Esta Lambda, que se activa en buckets de S3, grupos de registros de CloudWatch y eventos de EventBridge, envía registros a Datadog.

Para comenzar a recopilar registros de sus servicios de AWS:

1. Configure la [función Lambda Datadog Forwarder][1] en su cuenta de AWS.
2. Habilite el registro para su servicio de AWS. Busque su servicio en [Servicios de AWS compatibles](#supported-aws-services) para ver sus instrucciones de configuración. La mayoría de los servicios de AWS pueden registrar en un bucket de S3 o en un grupo de registros de CloudWatch.
3. [Configure los activadores](#set-up-triggers) que hacen que la función Lambda Datadog Forwarder se ejecute cuando hay nuevos registros para enviar. Hay dos formas de configurar los activadores.

**Notas**:
   - Puede usar [AWS PrivateLink][2] para enviar sus registros a través de una conexión privada.
   - CloudFormation crea una política de IAM que incluye `KMS:Decrypt` para todos los recursos, y no se alinea con las mejores prácticas de AWS Security Hub. Este permiso se utiliza para descifrar objetos de buckets de S3 cifrados con KMS para configurar la función Lambda, y la clave KMS utilizada para cifrar los buckets de S3 no se puede predecir. Puede eliminar este permiso de forma segura después de que la instalación finalice correctamente.

## Servicios de AWS compatibles {#supported-aws-services}

La función Lambda Datadog Forwarder admite cualquier servicio de AWS que genere registros en un bucket de S3 o en un grupo de registros de CloudWatch. La siguiente tabla enumera los servicios que puede recopilar:

- **Servicio de AWS**: El servicio de AWS que genera los registros. Cada nombre de servicio enlaza a sus instrucciones de configuración de recolección de registros. Los servicios sin un enlace no requieren configuración del lado del servicio.
- **Fuente de registro**: La etiqueta `source` que Datadog aplica a los registros. Úsela para encontrar sus registros en el [Log Explorer][40].
- **Almacenamiento**: Dónde puede escribir registros el servicio de AWS que el Datadog Forwarder recopila.
- **Recolección automática**: Si Datadog puede [configurar automáticamente los activadores](#automatically-set-up-triggers) para esa fuente de registro. Si no, [configure los activadores manualmente](#manually-set-up-triggers).

| Servicio de AWS                        | Fuente de registro                    | Almacenamiento        | Recolección automática |
| ---------------------------------- | ----------------------------- | -------------- | -------------------- |
| [API Gateway][3]                   | `source:apigateway`           | CloudWatch, S3 | Sí                  |
| [AppSync][4]                       | `source:appsync`              | CloudWatch     | Sí                  |
| Batch                              | `source:batch`                | CloudWatch     | Sí                  |
| [Bedrock][5]                       | `source:bedrock`              | CloudWatch, S3 | No                   |
| Bedrock Agentcore                  | `source:bedrock-agentcore`    | CloudWatch, S3 | Sí                  |
| [CloudFront][6]                    | `source:cloudfront`           | CloudWatch, S3 | Sí                  |
| [CloudTrail][7]                    | `source:cloudtrail`           | CloudWatch, S3 | Sí                  |
| [CodeBuild][8]                     | `source:codebuild`            | CloudWatch, S3 | Sí                  |
| [DMS][9]                           | `source:dms`                  | CloudWatch, S3 | Sí                  |
| [DocumentDB][10]                   | `source:docdb`                | CloudWatch, S3 | Sí                  |
| [ECS][11]                          | `source:ecs`                  | CloudWatch     | Sí                  |
| [EKS][12]                          | `source:eks` <sup>1</sup>     | CloudWatch     | Sí                  |
| [Elastic Beanstalk][13]            | - <sup>2</sup>                | CloudWatch     | Sí                  |
| [Elastic Load Balancing (ELB)][14] | `source:elb`                  | CloudWatch, S3 | Sí                  |
| [FSx][15]                          | `source:aws.fsx`              | CloudWatch, S3 | No                   |
| [Glue][16]                         | `source:glue`                 | CloudWatch, S3 | Sí                  |
| [IoT][17]                          | `source:iot`                  | CloudWatch     | Parcial <sup>3</sup> |
| [Lambda][18]                       | `source:lambda`               | CloudWatch     | Sí                  |
| Lambda@Edge                        | `source:lambda`               | CloudWatch     | Sí                  |
| Lambda MicroVMs                    | `source:lambda`               | CloudWatch     | Sí                  |
| [MWAA][19]                         | `source:mwaa`                 | CloudWatch     | Sí                  |
| [Network Firewall][20]             | `source:network-firewall`     | CloudWatch, S3 | Sí                  |
| [OpenSearch][21]                   | `source:opensearch`           | CloudWatch     | No                   |
| [PCS][22]                          | - <sup>2</sup>                | CloudWatch     | Parcial <sup>4</sup> |
| [RDS][23]                          | `source:rds` <sup>5</sup>     | CloudWatch     | Sí                  |
| [Redshift][24]                     | `source:redshift`             | CloudWatch, S3 | Sí                  |
| Redshift Serverless                | `source:redshift-serverless`  | CloudWatch     | Sí                  |
| [Route 53][25]                     | `source:route53` <sup>6</sup> | CloudWatch     | Sí                  |
| [S3][26]                           | `source:s3`                   | S3             | Sí                  |
| SSM                                | `source:ssm`                  | CloudWatch     | Sí                  |
| [Step Functions][27]               | `source:stepfunction`         | CloudWatch     | Sí                  |
| [Transit Gateway][28]              | `source:transitgateway`       | CloudWatch, S3 | No                   |
| [Verified Access][29]              | `source:verified-access`      | CloudWatch, S3 | Sí                  |
| [VPC][30]                          | `source:vpc`                  | CloudWatch, S3 | Sí                  |
| [VPN][31]                          | - <sup>2</sup>                | CloudWatch, S3 | Sí <sup>7</sup>     |
| [Web Application Firewall][32]     | `source:waf`                  | S3             | Sí                  |

<sup>1</sup> Los registros del plano de control de EKS también utilizan las fuentes `kubernetes.audit`, `kube-scheduler`, `kube-apiserver`, `kube-controller-manager` y `aws-iam-authenticator`.<br>
<sup>2</sup> Datadog no aplica una etiqueta de fuente específica del servicio a estos registros.<br>
<sup>3</sup> La recopilación automática para IoT solo está disponible a nivel de cuenta.<br>
<sup>4</sup> La recopilación automática para PCS solo está disponible para los grupos de registro de CloudWatch.<br>
<sup>5</sup> Los registros del motor de RDS también utilizan las fuentes `postgresql`, `mariadb` y `mysql`.<br>
<sup>6</sup> Cubre tanto los registros de consultas de DNS como los registros de consultas de Resolver.<br>
<sup>7</sup> La recopilación automática está disponible para los grupos de registro de CloudWatch. Para los buckets de S3, [establezca el activador manualmente](#collecting-logs-from-s3-buckets).

**Nota**: El Datadog Forwarder crea automáticamente [filtros de suscripción][43] en los grupos de registro de CloudWatch. Cada filtro se nombra con el formato `DD_LOG_SUBSCRIPTION_FILTER_<LOG_GROUP_NAME>`.

### Servicios recopilados a través de otro método {#services-collected-through-another-method}

Los siguientes servicios de AWS son compatibles con la recopilación de registros, pero no utilizan la función Lambda Datadog Forwarder de la misma manera:

| Servicio de AWS    | Cómo se recopilan los registros                                                                                                                         |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [DynamoDB][33] | DynamoDB no genera sus propios registros. La actividad de la API se captura a través de CloudTrail. Consulte [Enviar registros a Datadog][34].                           |
| [EC2][35]      | Utilice el [Datadog Agent][35] para enviar sus registros a Datadog.                                                                                      |
| [SNS][36]      | SNS no proporciona registros, pero puede procesar registros y eventos que transitan a través del servicio SNS. Consulte [Enviar registros a Datadog][37].  |

## Configure activadores {#set-up-triggers}

Hay dos opciones al configurar activadores en la función Lambda de Datadog Forwarder:

- [Automáticamente](#automatically-set-up-triggers): Datadog recupera automáticamente las ubicaciones de los registros para los servicios de AWS seleccionados y los agrega como activadores en la función Lambda de Datadog Forwarder. Datadog también mantiene la lista actualizada.
- [Manualmente](#manually-set-up-triggers): configure cada activador usted mismo.

### Configure activadores automáticamente {#automatically-set-up-triggers}

Datadog puede configurar automáticamente activadores en la función Lambda de Datadog Forwarder para recopilar registros de AWS. Sin embargo, la suscripción automática no admite la creación de activadores en diferentes cuentas o regiones de AWS. Para escenarios donde los registros se publican en buckets de S3 en una cuenta separada, recomendamos crear manualmente un activador en la misma cuenta que el bucket para solucionar esta limitación.

Para ver qué servicios admiten la recopilación automática y las ubicaciones de almacenamiento que admiten, consulte [Servicios de AWS admitidos](#supported-aws-services).

1. Si aún no lo ha hecho, configure la [función Lambda de AWS para recopilar registros de Datadog][1].
2. Asegúrese de que la política del rol de IAM utilizado para la [integración de Datadog-AWS][38] tenga los siguientes permisos. La información sobre cómo se utilizan estos permisos se puede encontrar en las descripciones a continuación:

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
    "elasticbeanstalk:DescribeEnvironments",
    "elasticloadbalancing:DescribeLoadBalancerAttributes",
    "elasticloadbalancing:DescribeLoadBalancers",
    "glue:BatchGetJobs",
    "glue:GetJobs",
    "glue:GetJob",
    "glue:ListJobs",
    "iot:GetV2LoggingOptions",
    "lambda:GetMicrovmImageVersion",
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
    | `elasticbeanstalk:DescribeEnvironments`                     | List all Elastic Beanstalk environments.                                     |
    | `iot:GetV2LoggingOptions`                                   | Get IoT V2 logging options.                                                  |
    | `lambda:InvokeFunction`                                     | Invoke a Lambda function.                                                    |
    | `lambda:List*`                                              | List all Lambda functions.                                                   |
    | `lambda:GetPolicy`                                          | Get the Lambda policy when triggers are to be removed.                       |
    | `lambda:GetMicrovmImageVersion`                             | Get information about a Lambda MicroVM image version.                        |
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


3. En la [página de integración de AWS][39], seleccione la cuenta de AWS de la que desea recopilar registros y haga clic en la pestaña {{< ui >}}Log Collection{{< /ui >}}.
4. En la sección {{< ui >}}Datadog Forwarder Lambda{{< /ui >}}, ingrese el ARN de la función Lambda creada en la sección anterior y haga clic en {{< ui >}}Add{{< /ui >}}. La función Lambda aparece en la tabla a continuación con su nombre, versión y región.
5. En la sección {{< ui >}}Log Autosubscription{{< /ui >}}, debajo de {{< ui >}}Log Sources{{< /ui >}}, habilite los servicios de los que desea recopilar registros activándolos. Para dejar de recopilar registros de un servicio en particular, desactive la fuente de registro.
6. (Opcional) En la sección {{< ui >}}Log Source Tag Filters{{< /ui >}}, puede filtrar la recopilación de registros por etiquetas de recursos para cada fuente de registro. Seleccione una fuente de registro en el menú desplegable y agregue etiquetas en formato `key:value` para limitar los registros de qué recursos se recopilan. **Nota**: Las etiquetas de recursos se convierten automáticamente a minúsculas para coincidir con las convenciones de la plataforma Datadog. Defina sus filtros de etiquetas en minúsculas para evitar discrepancias.
7. Si tiene registros en varias regiones, debe crear funciones Lambda adicionales en esas regiones y agregarlas en la sección **Datadog Forwarder Lambda**.
8. Para dejar de recopilar todos los registros de AWS de una función Lambda específica, coloque el cursor sobre la Lambda en la tabla y haga clic en el icono de eliminar. Se eliminan todos los activadores de esa función.
9. Unos minutos después de esta configuración inicial, sus registros de AWS aparecerán en el [Explorador de registros][40] de Datadog.

### Configure manualmente los activadores {#manually-set-up-triggers}

#### Recopilación de registros del grupo de registros de CloudWatch {#collecting-logs-from-cloudwatch-log-group}

Si está recopilando registros de un grupo de registros de CloudWatch, configure el activador para la [función Lambda de Datadog Forwarder][1] utilizando uno de los siguientes métodos:

{{< tabs >}}
{{% tab "Consola de AWS" %}}

1. En la Consola de AWS, vaya a {{< ui >}}Lambda{{< /ui >}}.
2. Haga clic en {{< ui >}}Functions{{< /ui >}} y seleccione Datadog Forwarder.
3. Haga clic en {{< ui >}}Add trigger{{< /ui >}} y seleccione {{< ui >}}CloudWatch Logs{{< /ui >}}.
4. Seleccione el grupo de registros en el menú desplegable.
5. Ingrese un nombre para su filtro y, opcionalmente, especifique un patrón de filtro.
6. Haga clic en {{< ui >}}Add{{< /ui >}}.
7. Vaya a la [sección de registros de Datadog][1] para explorar cualquier evento de registro nuevo enviado a su grupo de registros.

[1]: https://app.datadoghq.com/logs
{{% /tab %}}
{{% tab "Terraform" %}}

Para los usuarios de Terraform, puede aprovisionar y administrar sus activadores utilizando el recurso [aws_cloudwatch_log_subscription_filter][1]. Consulte el código de ejemplo a continuación.

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

Para los usuarios de AWS CloudFormation, puede aprovisionar y administrar sus activadores utilizando el recurso [AWS::Logs::SubscriptionFilter][1] de CloudFormation. Consulte el código de ejemplo a continuación.

El código de ejemplo también funciona para AWS [SAM][2] y [Serverless Framework][3]. Para Serverless Framework, coloque el código en la sección [resources][4] dentro de su `serverless.yml`.

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

#### Recopilación de registros de buckets de S3 {#collecting-logs-from-s3-buckets}

Si está recopilando registros de un bucket de S3, configure el activador para la [función Lambda de Datadog Forwarder][1] utilizando uno de los siguientes métodos:

{{< tabs >}}
{{% tab "Consola de AWS" %}}

1. Una vez instalada la función Lambda, agregue manualmente un activador en el bucket de S3 que contiene sus registros en la consola de AWS:
  {{< img src="logs/aws/adding_trigger.png" alt="Agregar activador" popup="true"style="width:80%;">}}

2. Seleccione el bucket y luego siga las instrucciones de AWS:
  {{< img src="logs/aws/integration_lambda.png" alt="Lambda de integración" popup="true" style="width:80%;">}}

3. Establezca el tipo de evento correcto en los buckets de S3:
  {{< img src="logs/aws/object_created.png" alt="Objeto creado" popup="true" style="width:80%;">}}

Una vez hecho esto, vaya a su [sección de registros de Datadog][1] para comenzar a explorar sus registros.

[1]: https://app.datadoghq.com/logs
{{% /tab %}}
{{% tab "Terraform" %}}

Para los usuarios de Terraform, puede provisionar y administrar sus activadores utilizando el recurso [aws_s3_bucket_notification][1]. Consulte el código de ejemplo a continuación.

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

Para los usuarios de CloudFormation, puede configurar activadores utilizando [NotificationConfiguration][1] de CloudFormation para su bucket de S3. Consulte el código de ejemplo a continuación.

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


## Depuración y filtrado {#scrubbing-and-filtering}

Puede eliminar correos electrónicos o direcciones IP de los registros enviados por la función Lambda, o definir una regla de eliminación personalizada [en los parámetros de Lambda][41].
También puede excluir o enviar solo aquellos registros que coincidan con un patrón específico utilizando la [opción de filtrado][42].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/serverless/forwarder/
[2]: /es/serverless/forwarder#aws-privatelink-support
[3]: /es/integrations/amazon_api_gateway/#log-collection
[4]: /es/integrations/amazon-appsync/#send-logs-to-datadog
[5]: /es/integrations/amazon-bedrock/
[6]: /es/integrations/amazon_cloudfront/#log-collection
[7]: /es/integrations/amazon_cloudtrail/#send-logs-to-datadog
[8]: /es/integrations/amazon-codebuild/#send-logs-to-datadog
[9]: /es/integrations/amazon-dms/#send-logs-to-datadog
[10]: /es/integrations/amazon-documentdb/#send-logs-to-datadog
[11]: /es/containers/amazon_ecs/logs/
[12]: /es/integrations/amazon-eks/#log-collection
[13]: /es/integrations/amazon-elastic-beanstalk/
[14]: /es/integrations/amazon_elb/#log-collection
[15]: /es/integrations/amazon_fsx/#log-collection
[16]: /es/integrations/amazon_glue/#log-collection
[17]: /es/integrations/amazon-iot/#enable-logging
[18]: /es/integrations/amazon_lambda/#log-collection
[19]: /es/integrations/amazon_mwaa/#log-collection
[20]: /es/integrations/amazon_network_firewall/#log-collection
[21]: /es/integrations/amazon_es/#log-collection
[22]: /es/integrations/amazon-pcs/
[23]: /es/integrations/amazon_rds/#log-collection
[24]: /es/integrations/amazon-redshift/#log-collection
[25]: /es/integrations/amazon_route53/#send-logs-to-datadog
[26]: /es/integrations/amazon_s3/#enable-s3-access-logs
[27]: /es/integrations/amazon_step_functions/#log-collection
[28]: /es/integrations/amazon_transit_gateway/#log-collection
[29]: /es/integrations/amazon-verified-access/#log-collection
[30]: /es/integrations/amazon_vpc/#log-collection
[31]: /es/integrations/amazon-vpn/#send-logs-to-datadog
[32]: /es/integrations/amazon_waf/#log-collection
[33]: /es/integrations/amazon_dynamodb/
[34]: /es/integrations/amazon_dynamodb/#send-logs-to-datadog
[35]: /es/integrations/amazon_ec2/
[36]: /es/integrations/amazon_sns/
[37]: /es/integrations/amazon_sns/#send-logs-to-datadog
[38]: /es/integrations/amazon_web_services/
[39]: https://app.datadoghq.com/integrations/amazon-web-services
[40]: https://app.datadoghq.com/logs
[41]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-scrubbing-optional
[42]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-filtering-optional
[43]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters