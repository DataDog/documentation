---
further_reading:
- link: /logs/explorer/
  tag: Documentación
  text: Aprende a explorar tus logs
- link: /logs/explorer/#visualize
  tag: Documentación
  text: Realizar análisis de los logs
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende a procesar tus logs
title: Enviar logs de servicios de AWS con la función Lambda de Datadog
---

El servicio logs de AWS puede recopilarse con la función Lambda de Datadog Forwarder. Esta Lambda—que se activa en S3 Buckets, CloudWatch grupos log y eventos EventBridge—reenvía logs a Datadog.

Para empezar a recoger logs de tus servicios AWS:

1. Configura la [función Lambda de Datadog Forwarder][1] en tu cuenta AWS.
2. [Habilita el registro](#enable-logging-for-your-AWS-servicio) para tu servicio AWS (la mayoría de los servicios AWS pueden loguear a un bucket S3 o CloudWatch Grupo log).
3. [Configurar los disparadores](#set-up-triggers) que hacen que la Lambda Forwarder se ejecute cuando hay nuevos logs que reenviar. Hay dos maneras de Configurar los disparadores.

**Nota**: Si te encuentras en la región AWS `us-east-1`, aprovecha [Datadog-AWS Private Link][2].

**Nota**: Cloudformation crea una política IAM que incluye KMS:Decrypt para todos los recursos, y no se alinea con las mejores prácticas de AWS Security Hub. Este permiso se utiliza para descifrar objetos de buckets S3 cifrados con KMS para configurar la función Lambda, y no se puede predecir qué clave KMS se utiliza para cifrar los buckets S3. Puedes eliminar este permiso de forma segura una vez que la instalación haya finalizado correctamente.

## Habilita el registro para tu servicio AWS

Se admite cualquier servicio AWS que genere logs en un bucket S3 o un CloudWatch Grupo log. Encontrará instrucciones de configuración para los servicios en la siguiente tabla:

| Servicio AWS                        | Activar generar logs del servicio AWS                                                                                    | Enviar AWS logs a Datadog                                                                                                     |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [API Gateway][3]                   | [Habilitar logs de Amazon API Gateway][4]                                                                            | Colección [manual][5] y [automática](#automatically-set-up-triggers) de log.                                                  |
| [Cloudfront][6]                    | [Habilitar logs de Amazon CloudFront][7]                                                                             | Colección [manual][8] y [automática](#automatically-set-up-triggers) de log.                                                  |
| [CloudTrail][9]                    | [Activar logs AWS CloudTrail][9]                                                                                | Colección [Manual][10] de log. Consulta [AWS Configuración para Cloud SIEM][11] si estás configurando AWS CloudTrail para Cloud SIEM. |
| [DynamoDB][12]                     | [Habilitar logs de Amazon DynamoDB][13]                                                                              | Colección [Manual][14] de log.                                                                                                 |
| [EC2][15]                          | `-`                                                                                                            | Utiliza [Datadog Agent ][15] para enviar tus logs a Datadog.                                                                    |
| [ECS][16]                          | `-`                                                                                                            | [Utiliza la dirección Docker Agent para recoger tus logs][17].                                                                              |
| [Elastic Balanceo de carga (ELB)][18] | [Habilitar logs de Amazon ELB][19]                                                                                   | Colección [manual][20] y [automática](#automatically-set-up-triggers) de log.                                                 |
| [Lambda][21]                       | `-`                                                                                                            | Colección [manual][22] y [automática](#automatically-set-up-triggers) de log.                                                 |
| [RDS][23]                          | [Habilitar logs de Amazon RDS][24]                                                                                   | Colección [Manual][25] de log.                                                                                                |
| [Ruta 53][26]                     | [Habilitar logs de Amazon Ruta 53][27]                                                                              | Colección [Manual][28] de log.                                                                                                 |
| [S3][29]                           | [Activar logs de Amazon S3][30]                                                                                    | Colección [manual][31] y [automática](#automatically-set-up-triggers) de log.                                                 |
| [SNS] [32]                          | El SNS no proporciona logs, pero puede procesar logs y eventos que transitan por el servicio SNS. | Colección [Manual][33] de log.                                                                                                 |
| [RedShift][34]                     | [Activar logs de Amazon Redshift][35]                                                                              | Colección [manual][36] y [automática](#automatically-set-up-triggers) de log.                                                 |
| [Acceso verificado][37]              | [Activar logs del acceso verificado][38]                                                                              | Colección [Manual][39] de log.                                                                                                 |
| [VPC][40]                          | [Habilitar logs de Amazon VPC][41]                                                                                   | Colección [Manual][42] de log.                                                                                                 |
| [funciones Step][52]               | [Activar logs de funciones Amazon Step][53]                                                                        | Colección [Manual][54] de log.                                                                                                 |
| [Cortafuegos de aplicaciones web][49]     | [Activar logs de Amazon WAF][50]                                                                                   | Colección [manual][51] y [automática](#automatically-set-up-triggers) de log.                                                                                               |
| [MWAA][55]                         | [Activar logs de Amazon MWAA][56]                                                                                  | Colección [Manual][56] de log.                                                                                                 |


## Establecer disparadores

Existen dos opciones a la hora de configurar los disparadores en  la función Lambda de Datadog Forwarder:

- [Automáticamente](#automatically-set-up-triggers): Datadog recupera automáticamente los log de localización para el servicio AWS seleccionado y los añade como disparadores en la función Lambda de Datadog Forwarder. Datadog también mantiene actualizada la lista.
- [Manualmente](#manually-set-up-triggers): Configura tu mismo cada disparador.

### Configurar automáticamente los disparadores

Datadog puede Configurar disparadores automáticamente la función Lambda de Datadog Forwarder para recopilar logs de AWS de las siguientes fuentes y localizaciones:

| Origen                      | Localización       |
| --------------------------- | -------------- |
| Logs de acceso a la API Gateway     | CloudWatch     |
| Ejecución de logs de API Gateway  | CloudWatch     |
| Logs de acceso de la aplicación ELB | S3             |
| Logs de acceso a ELB clásico      | S3             |
| Logs de acceso a CloudFront       | S3             |
| Logs de Lambda                  | CloudWatch     |
| Logs de Redshift               | S3             |
| Logs de acceso S3              | S3             |
| Funciones Step              | CloudWatch     |
| Cortafuegos de aplicaciones web    | S3, CloudWatch |

**Nota**: Los [Filtros de suscripción][48] no son creados automáticamente por DatadogForwarder. Crealos directamente en un Grupo de Log.

1. Si aún no lo has hecho, configura la [función AWS Lambda de recopilación de logs de Datadog][6].
2. Asegúrese de que la política de rol IAM utilizada para la [integración Datadog-AWS ][43] tiene los siguientes permisos. La información sobre cómo se utilizan estos permisos se puede encontrar en las descripciones a continuación:

    ```text
    "cloudfront:GetDistributionConfig",
    "cloudfront:ListDistributions",
    "elasticloadbalancing:DescribeLoadBalancers",
    "elasticloadbalancing:DescribeLoadBalancerAttributes",
    "lambda:List*",
    "lambda:GetPolicy",
    "redshift:DescribeClusters",
    "redshift:DescribeLoggingStatus",
    "s3:GetBucketLogging",
    "s3:GetBucketLocation",
    "s3:GetBucketNotification",
    "s3:ListAllMyBuckets",
    "s3:PutBucketNotification",
    "states:ListStateMachines",
    "states:DescribeStateMachine",
    "wafv2:ListLoggingConfigurations",
    "logs:PutSubscriptionFilter",
    "logs:DeleteSubscriptionFilter",
    "logs:DescribeSubscriptionFilters"
    ```

    | Permiso AWS | Descripción |
    | ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
    | `cloudfront:GetDistributionConfig` | Obtener el nombre del bucket de S3 que contiene los logs de acceso a CloudFront.             |
    | `cloudfront:ListDistributions` | Lista todas las distribuciones de CloudFront.                                           |
    | `elasticloadbalancing:`<br> `DescribeLoadBalancers` | Lista todos los equilibradores de carga.                                                     |
    | `elasticloadbalancing:`<br> `DescribeLoadBalancerAttributes` | Obtener el nombre del bucket S3 que contiene los logs de acceso a ELB.                    |
    | `lambda:List*` | Lista todas las funciones Lambda.                                                   |
    | `lambda:GetPolicy` | Obtener la política de Lambda cuando los disparadores deben ser eliminados.                      |
    | `redshift:DescribeClusters` | Lista todos los clústeres de Redshift.                                                  |
    | `redshift:DescribeLoggingStatus` | Obtener el nombre del bucket S3 que contiene logs de Redshift.                      |
    | `s3:GetBucketLogging` | Obtener el nombre del bucket S3 que contiene los logs de acceso S3.                     |
    | `s3:GetBucketLocation` | Obtener la región del bucket S3 que contiene los logs de acceso S3.                   |
    | `s3:GetBucketNotification` | Obtener las configuraciones de activación Lambda existentes.                                  |
   {{< partial name="whats-next/whats-next.html" >}}
    | `s3:PutBucketNotification` | Añadir o eliminar un disparador Lambda basado en el bucket S3 eventos.                    |
    | `states:ListStateMachines` | Lista todas las funciones Step.                                                     |
    | `states:DescribeStateMachine` | Obtener detalles de registro sobre una función Step.                                   |
    | `wafv2:ListLoggingConfigurations` | Lista todas las configuraciones de registro del Cortafuegos de aplicaciones web.            |
    | `logs:PutSubscriptionFilter` | Añadir un disparador Lambda basado en log de eventos de CloudWatch |
    | `logs:DeleteSubscriptionFilter` | Eliminar un disparador Lambda basado en log de eventos de CloudWatch |
    | `logs:DescribeSubscriptionFilters` | Lista los filtros de suscripción para el grupo log especificado.                  |

3. En la página [integración AWS][44], selecciona la cuenta AWS de la que desea recolectar logs y haga clic en la pestaña **Log Collection**.  
   {{< img src="logs/AWS/aws_log_setup_step1.png" alt="La pestaña Log Collection de la página integración AWS para una cuenta AWS específica con instrucciones de enviar logs de servicio AWS y cuadro de texto para autosuscribir la función Lambda de Forwarder mediante el ingreso de ARN de la función Lambda de Forwarder" popup="true" style="width:90%;" >}}
4. Introduzca el ARN de Lambda creada en la sección anterior y haga clic en **Add**.
5. Seleccione los servicios de los que deseas recopilar logs y haz clic en **Save**. Para dejar de recopilar logs de un determinado servicio, anule la selección de la fuente de log.
   {{< img src="logs/AWS/aws_log_setup_step2.png" alt="La pestaña Log Collection de la página integración AWS para una cuenta AWS específica con una función Lambda introdujó de manera exitosa Included ARNs y algunos de sus servicios habilitados en la fuente de log" popup="true" style="width:90%;" >}}
6. Si tienes logs en varias regiones, debes crear funciones Lambda adicionales en esas regiones e introducirlas en esta página.
7. Para dejar de recopilar todos los AWS logs , pase el ratón por encima de una Lambda y haga clic en el icono Eliminar. Se eliminarán todos los disparadores de esa función.
8. A los pocos minutos de esta configuración inicial, tus AWS logs apareceran en el [log Explorer][45] de Datadog.

### Configurar manualmente los disparadores

#### Recopilar logs del grupo log de CloudWatch

Si estas recopilando logs de un grupo log de CloudWatch, Configura el disparador de la [función Lambda de Datadog Forwarder][1] utilizando uno de los siguientes métodos:

{{< tabs >}}
{{% tab "AWS console" %}}

1. En la consola AWS, vaya a **Lambda**. 
2. Haz clic en **Functions** y selecciona Datadog Forwarder .
3. Haz clic en **Add trigger** y selecciona **CloudWatch Logs **.
4. Selecciona el grupo log en el menú desplegable.
5. Introduce un nombre para el filtro y, opcionalmente, especifique un patrón de filtrado.
6. Haz clic en **Add** (Añadir).
7. Ve a la [sección Datadog log][1] para explorar cualquier nuevo eventos log enviado a su grupo log.

[1]: https://app.datadoghq.com/logs
{{% /tab %}}
{{% tab "Terraform" %}}

Para los usuarios de Terraform, puedes aprovisionar y gestionar tus disparadores utilizando el recurso [aws_cloudwatch_log_subscription_filter][1]. Vea el código de ejemplo a continuación.

```conf
resource "aws_cloudwatch_log_subscription_filter" "datadog_log_subscription_filter" {
  name = "datadog_log_subscription_filter"
  log_group_name = <CLOUDWATCH_LOG_GROUP_NAME> # for example, /aws/lambda/my_lambda_name
  destination_arn = <DATADOG_FORWARDER_ARN> # for example, arn:aws:lambda:us-east-1:123:function:datadog-forwarder
  filter_pattern = ""
}
```

[1]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_subscription_filter
{{% /tab %}}
{{% tab "CloudFormation" %}}

Para los usuarios de AWS CloudFormation, puedes aprovisionar y gestionar tus disparadores utilizando el recurso CloudFormation [AWS::logs::SubscriptionFilter][1]. Vea el código de ejemplo a continuación.

El código de ejemplo también funciona para AWS [SAM][2] y [serverless Framework][3]. Para serverless Framework, coloque el código en la sección [resources][4] dentro de su `serverless.yml`.

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

#### Recopilación de logs de buckets S3

Si estas recopilando logs de un bucket S3, Configurar el disparador a la [función Lambda de Datadog Forwarder][1] utilizando uno de los siguientes métodos:

{{< tabs >}}
{{% tab "AWS Console" %}}

1. Una vez instalada  la función Lambda, añade manualmente un disparador en el bucket S3 que contiene tus logs en la consola AWS:
  {{< img src="logs/aws/adding_trigger.png" alt="Añadir disparador" popup="true"style="width:80%;">}}

2. Seleccione el bucket y siga las instrucciones de AWS:
  {{< img src="logs/AWS/integration_lambda.png" alt="integración Lambda" popup="true" style="width:80%;">}}

3. Establece el tipo correcto de evento en los buckets S3:
  {{< img src="logs/AWS/object_created.png" alt="Objeto Creado" popup="true" style="width:80%;">}}

¡Una vez hecho esto, entra en tu [sección Datadog Log][1] para empezar a explorar tus logs!

[1]: https://app.datadoghq.com/logs
{{% /tab %}}
{{% tab "Terraform" %}}

Para los usuarios de Terraform, puedes aprovisionar y gestionar tus disparadores utilizando el recurso [aws_s3_bucket_notification][1]. Consulte el código de ejemplo a continuación.

```conf
resource "aws_s3_bucket_notification" "my_bucket_notification" {
  bucket = my_bucket
  lambda_function {
    lambda_function_arn = "<DATADOG_FORWARDER_ARN>"
    events = ["s3:ObjectCreated:*"]
    filter_prefix = "AWSLogs/"
    filter_suffix = ".log"
  }
}
```


[1]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_notification
{{% /pestaña %}}
{{% pestaña "CloudFormation" %}}

Para los usuarios de CloudFormation, puedes Configurar disparadores usando CloudFormation [NotificationConfiguration][1] para tu bucket S3. Consulte el código de ejemplo a continuación.

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



## Depurar y filtrar

Puedes depurar correos electrónicos o direcciones IP de logs enviados por la función Lambda, o definir una regla de depuración personalizada [en los parámetros de Lambda][46].
También puedes excluir o enviar solo aquellos logs que coincidan con un patrón específico utilizando la [opción de filtrado][47].

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
[26]: /es/integrations/amazon_route53/
[27]: /es/integrations/amazon_route53/#enable-route53-logging
[28]: /es/integrations/amazon_route53/#send-logs-to-datadog
[29]: /es/integrations/amazon_s3/
[30]: /es/integrations/amazon_s3/#enable-s3-access-logs
[31]: /es/integrations/amazon_s3/#manual-installation-steps
[32]: /es/integrations/amazon_sns/
[33]: /es/integrations/amazon_sns/#send-logs-to-datadog
[34]: /es/integrations/amazon_redshift/
[35]: /es/integrations/amazon_redshift/#enable-aws-redshift-logging
[36]: /es/integrations/amazon_redshift/#log-collection
[37]: /es/integrations/aws_verified_access/
[38]: /es/integrations/aws_verified_access/#enable-verified-access-logs
[39]: /es/integrations/aws_verified_access/#log-collection
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