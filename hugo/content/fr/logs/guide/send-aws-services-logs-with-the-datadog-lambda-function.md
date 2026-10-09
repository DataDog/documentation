---
further_reading:
- link: https://learn.datadoghq.com/courses/send-aws-logs
  tag: Centre d'apprentissage
  text: Envoyer les logs AWS
- link: https://learn.datadoghq.com/courses/visibility-aws-lambda
  tag: Centre d'apprentissage
  text: Configurer AWS Lambda pour Serverless Monitoring avec Datadog
- link: /logs/explorer/
  tag: Documentation
  text: Apprendre à explorer vos logs
- link: /logs/explorer/#visualize
  tag: Documentation
  text: Effectuer des analyses de logs
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: /logs/guide/reduce_data_transfer_fees
  tag: Guide
  text: Comment envoyer des logs à Datadog tout en réduisant les frais de transfert
    de données
title: Envoyer des logs de services AWS avec la fonction Lambda Datadog
---
Les logs des services AWS peuvent être collectés avec la fonction Lambda Datadog Forwarder. Cette fonction Lambda, qui se déclenche sur les buckets S3, les groupes de logs CloudWatch et les événements EventBridge, transfère les logs vers Datadog.

Pour commencer à recueillir des logs à partir de vos services AWS :

1. Configurez la [fonction Lambda Datadog Forwarder][1] dans votre compte AWS.
2. Activez la journalisation pour votre service AWS. Recherchez votre service dans [Services AWS pris en charge](#supported-aws-services) pour consulter ses instructions de configuration. La plupart des services AWS peuvent envoyer des logs vers un bucket S3 ou un groupe de logs CloudWatch.
3. [Configurez les déclencheurs](#set-up-triggers) qui permettent à la fonction Lambda Datadog Forwarder de s'exécuter lorsque de nouveaux logs doivent être transférés. Il existe deux manières de configurer les déclencheurs.

**Remarques** :
   - Vous pouvez utiliser [AWS PrivateLink][2] pour envoyer vos logs via une connexion privée.
   - CloudFormation crée une politique IAM qui inclut `KMS:Decrypt` pour toutes les ressources, ce qui n'est pas conforme aux bonnes pratiques d'AWS Security Hub. Cette autorisation est utilisée pour déchiffrer les objets provenant de buckets S3 chiffrés par KMS afin de configurer la fonction Lambda, et la clé KMS utilisée pour chiffrer les buckets S3 ne peut pas être prédite. Vous pouvez supprimer cette autorisation en toute sécurité une fois l'installation terminée avec succès.

## Services AWS pris en charge {#supported-aws-services}

La fonction Lambda Datadog Forwarder prend en charge tout service AWS qui génère des logs dans un bucket S3 ou un groupe de logs CloudWatch. Le tableau suivant répertorie les services dont elle peut collecter les logs :

- **Service AWS** : Le service AWS qui génère les logs. Chaque nom de service renvoie vers ses instructions de configuration de collecte de logs. Les services sans lien ne nécessitent aucune configuration côté service.
- **Source de log** : Le tag `source` que Datadog applique aux logs. Utilisez-le pour trouver vos logs dans le [Log Explorer][40].
- **Stockage** : Emplacement où le service AWS peut écrire les logs que le Forwarder collecte.
- **Collecte automatique** : Indique si Datadog peut [configurer automatiquement les déclencheurs](#automatically-set-up-triggers) pour cette source de logs. Si ce n'est pas le cas, [configurez les déclencheurs manuellement](#manually-set-up-triggers).

| Service AWS                        | Source de log                    | Stockage        | Collecte automatique |
| ---------------------------------- | ----------------------------- | -------------- | -------------------- |
| [API Gateway][3]                   | `source:apigateway`           | CloudWatch, S3 | Oui                  |
| [AppSync][4]                       | `source:appsync`              | CloudWatch     | Oui                  |
| Batch                              | `source:batch`                | CloudWatch     | Oui                  |
| [Bedrock][5]                       | `source:bedrock`              | CloudWatch, S3 | Non                  |
| Bedrock Agentcore                  | `source:bedrock-agentcore`    | CloudWatch, S3 | Oui                  |
| [CloudFront][6]                    | `source:cloudfront`           | CloudWatch, S3 | Oui                  |
| [CloudTrail][7]                    | `source:cloudtrail`           | CloudWatch, S3 | Oui                  |
| [CodeBuild][8]                     | `source:codebuild`            | CloudWatch, S3 | Oui                  |
| [DMS][9]                           | `source:dms`                  | CloudWatch, S3 | Oui                  |
| [DocumentDB][10]                   | `source:docdb`                | CloudWatch, S3 | Oui                  |
| [ECS][11]                          | `source:ecs`                  | CloudWatch     | Oui                  |
| [EKS][12]                          | `source:eks` <sup>1</sup>     | CloudWatch     | Oui                  |
| [Elastic Beanstalk][13]            | - <sup>2</sup>                | CloudWatch     | Oui                  |
| [Elastic Load Balancing (ELB)][14] | `source:elb`                  | CloudWatch, S3 | Oui                  |
| [FSx][15]                          | `source:aws.fsx`              | CloudWatch, S3 | Non                  |
| [Glue][16]                         | `source:glue`                 | CloudWatch, S3 | Oui                  |
| [IoT][17]                          | `source:iot`                  | CloudWatch     | Partiel <sup>3</sup> |
| [Lambda][18]                       | `source:lambda`               | CloudWatch     | Oui                  |
| Lambda@Edge                        | `source:lambda`               | CloudWatch     | Oui                  |
| Lambda MicroVMs                    | `source:lambda`               | CloudWatch     | Oui                  |
| [MWAA][19]                         | `source:mwaa`                 | CloudWatch     | Oui                  |
| [Network Firewall][20]             | `source:network-firewall`     | CloudWatch, S3 | Oui                  |
| [OpenSearch][21]                   | `source:opensearch`           | CloudWatch     | Non                  |
| [PCS][22]                          | - <sup>2</sup>                | CloudWatch     | Partiel <sup>4</sup> |
| [RDS][23]                          | `source:rds` <sup>5</sup>     | CloudWatch     | Oui                  |
| [Redshift][24]                     | `source:redshift`             | CloudWatch, S3 | Oui                  |
| Redshift Serverless                | `source:redshift-serverless`  | CloudWatch     | Oui                  |
| [Route 53][25]                     | `source:route53` <sup>6</sup> | CloudWatch     | Oui                  |
| [S3][26]                           | `source:s3`                   | S3             | Oui                  |
| SSM                                | `source:ssm`                  | CloudWatch     | Oui                  |
| [Step Functions][27]               | `source:stepfunction`         | CloudWatch     | Oui                  |
| [Transit Gateway][28]              | `source:transitgateway`       | CloudWatch, S3 | Non                  |
| [Verified Access][29]              | `source:verified-access`      | CloudWatch, S3 | Oui                  |
| [VPC][30]                          | `source:vpc`                  | CloudWatch, S3 | Oui                  |
| [VPN][31]                          | - <sup>2</sup>                | CloudWatch, S3 | Oui <sup>7</sup>     |
| [Web Application Firewall][32]     | `source:waf`                  | S3             | Oui                  |

<sup>1</sup> Les logs du plan de contrôle EKS utilisent également les sources `kubernetes.audit`, `kube-scheduler`, `kube-apiserver`, `kube-controller-manager` et `aws-iam-authenticator`.<br>
<sup>2</sup> Datadog n'applique pas de tag de source spécifique au service à ces logs.<br>
<sup>3</sup> La collecte automatique pour IoT est disponible uniquement au niveau du compte.<br>
<sup>4</sup> La collecte automatique pour PCS est disponible uniquement pour les groupes de logs CloudWatch.<br>
<sup>5</sup> Les logs du moteur RDS utilisent également les sources `postgresql`, `mariadb` et `mysql`.<br>
<sup>6</sup> Couvre à la fois les logs de requêtes DNS et les logs de requêtes Resolver.<br>
<sup>7</sup> La collecte automatique est disponible pour les groupes de logs CloudWatch. Pour les buckets S3, [configurez le déclencheur manuellement](#collecting-logs-from-s3-buckets).

**Remarque** : Le Datadog Forwarder crée automatiquement des [filtres d'abonnement][43] sur les groupes de logs CloudWatch. Chaque filtre est nommé selon le format `DD_LOG_SUBSCRIPTION_FILTER_<LOG_GROUP_NAME>`.

### Services collectés via une autre méthode {#services-collected-through-another-method}

Les services AWS suivants sont pris en charge pour la collecte de logs, mais n'utilisent pas la fonction Lambda Datadog Forwarder de la même manière :

| Service AWS    | Comment les logs sont collectés                                                                                                                         |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [DynamoDB][33] | DynamoDB ne génère pas ses propres logs. L'activité API est capturée via CloudTrail. Consultez [Envoyer des logs à Datadog][34].                           |
| [EC2][35]      | Utilisez le [Datadog Agent][35] pour envoyer vos logs à Datadog.                                                                                      |
| [SNS][36]      | SNS ne fournit pas de logs, mais vous pouvez traiter les logs et les événements qui transitent par le service SNS. Consultez [Envoyer des logs à Datadog][37].  |

## Configurez des déclencheurs {#set-up-triggers}

Il existe deux méthodes de configuration des déclencheurs sur la fonction Lambda du Datadog Forwarder :

- [Automatiquement](#automatically-set-up-triggers) : Datadog récupère automatiquement les emplacements des logs pour les services AWS sélectionnés et les ajoute en tant que déclencheurs sur la fonction Lambda Datadog Forwarder. Datadog maintient également la liste à jour.
- [Manuellement](#manually-set-up-triggers) : Configurez chaque déclencheur vous-même.

### Configurez automatiquement les déclencheurs {#automatically-set-up-triggers}

Datadog peut configurer automatiquement des déclencheurs sur la fonction Lambda Datadog Forwarder pour collecter les logs AWS. Cependant, l'abonnement automatique ne prend pas en charge la création de déclencheurs entre différents comptes ou régions AWS. Pour les scénarios où les logs sont publiés dans des compartiments S3 situés dans un compte distinct, nous recommandons de créer manuellement un déclencheur dans le même compte que le compartiment pour contourner cette limitation.

Pour voir quels services prennent en charge la collecte automatique, ainsi que les emplacements de stockage qu'ils supportent, consultez [Services AWS pris en charge](#supported-aws-services).

1. Si ce n'est pas déjà fait, configurez la [fonction Lambda de collecte de logs Datadog pour AWS][1].
2. Assurez-vous que la politique du rôle IAM utilisé pour l'[intégration Datadog-AWS][38] dispose des autorisations suivantes. Des informations sur la manière dont ces autorisations sont utilisées sont disponibles dans les descriptions ci-dessous :

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


3. Sur la [page d'intégration AWS][39], sélectionnez le compte AWS dont vous souhaitez collecter les logs et cliquez sur l'onglet {{< ui >}}Log Collection{{< /ui >}}.
4. Dans la section {{< ui >}}Datadog Forwarder Lambda{{< /ui >}}, saisissez l'ARN de la fonction Lambda créée dans la section précédente et cliquez sur {{< ui >}}Add{{< /ui >}}. La fonction Lambda apparaît dans le tableau ci-dessous avec son nom, sa version et sa région.
5. Dans la section {{< ui >}}Log Autosubscription{{< /ui >}}, sous {{< ui >}}Log Sources{{< /ui >}}, activez les services dont vous souhaitez collecter les logs en basculant leur état sur « activé ». Pour arrêter la collecte des logs d'un service particulier, désactivez la source de logs.
6. (Facultatif) Dans la section {{< ui >}}Log Source Tag Filters{{< /ui >}}, vous pouvez filtrer la collecte des logs par tags de ressource pour chaque source de logs. Sélectionnez une source de logs dans le menu déroulant et ajoutez des tags au format `key:value` afin de limiter la collecte des logs aux ressources concernées. **Remarque** : Les tags de ressource sont automatiquement convertis en minuscules pour correspondre aux conventions de la plateforme Datadog. Définissez vos filtres de tags en minuscules pour éviter les erreurs de correspondance.
7. Si vous avez des logs dans plusieurs régions, vous devez créer des fonctions Lambda supplémentaires dans ces régions et les ajouter dans la section **Datadog Forwarder Lambda**.
8. Pour arrêter la collecte de tous les logs AWS d'une fonction Lambda spécifique, survolez la fonction Lambda dans le tableau et cliquez sur l'icône de suppression. Tous les déclencheurs de cette fonction sont supprimés.
9. Quelques minutes après cette configuration initiale, vos logs AWS apparaissent dans Datadog [Log Explorer][40].

### Configurez manuellement les déclencheurs {#manually-set-up-triggers}

#### Collecte des logs à partir du groupe de logs CloudWatch {#collecting-logs-from-cloudwatch-log-group}

Si vous recueillez des logs depuis un groupe de logs CloudWatch, configurez le déclencheur entraînant l'exécution de la [fonction Lambda du Datadog Forwarder][1] à l'aide de l'une des méthodes suivantes :

{{< tabs >}}
{{% tab "Console AWS" %}}

1. Dans la console AWS, accédez à {{< ui >}}Lambda{{< /ui >}}.
2. Cliquez sur {{< ui >}}Functions{{< /ui >}} et sélectionnez le Datadog Forwarder.
3. Cliquez sur {{< ui >}}Add trigger{{< /ui >}} et sélectionnez {{< ui >}}CloudWatch Logs{{< /ui >}}.
4. Sélectionnez le groupe de logs dans le menu déroulant.
5. Saisissez un nom pour votre filtre et spécifiez éventuellement un modèle de filtre.
6. Cliquez sur {{< ui >}}Add{{< /ui >}}.
7. Accédez à la [section Logs de Datadog][1] pour explorer les nouveaux événements de log envoyés à votre groupe de logs.

[1]: https://app.datadoghq.com/logs
{{% /tab %}}
{{% tab "Terraform" %}}

Pour les utilisateurs de Terraform, vous pouvez provisionner et gérer vos déclencheurs à l'aide de la ressource [aws_cloudwatch_log_subscription_filter][1]. Voir l'exemple de code ci-dessous.

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
*{{% mainland-china-disclaimer %}}

[1]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_subscription_filter
{{% /tab %}}
{{% tab "CloudFormation" %}}

Pour les utilisateurs d'AWS CloudFormation, vous pouvez provisionner et gérer vos déclencheurs à l'aide de la ressource CloudFormation [AWS::Logs::SubscriptionFilter][1]. Voir l'exemple de code ci-dessous.

L'exemple de code fonctionne également pour AWS [SAM][2] et le [Serverless Framework][3]. Pour le Serverless Framework, placez le code sous la section [resources][4] dans votre `serverless.yml`.

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

#### Collecte des logs depuis les compartiments S3 {#collecting-logs-from-s3-buckets}

Si vous recueillez des logs depuis un compartiment S3, configurez le déclencheur entraînant l'exécution de la [fonction Lambda du Datadog Forwarder][1] à l'aide de l'une des méthodes suivantes :

{{< tabs >}}
{{% tab "Console AWS" %}}

1. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 qui contient vos logs dans la console AWS :
  {{< img src="logs/aws/adding_trigger.png" alt="Ajout d'un déclencheur" popup="true"style="width:80%;">}}

2. Sélectionnez le compartiment, puis suivez les instructions AWS :
  {{< img src="logs/aws/integration_lambda.png" alt="Intégration Lambda" popup="true" style="width:80%;">}}

3. Définissez le type d'événement correct sur les compartiments S3 :
  {{< img src="logs/aws/object_created.png" alt="Objet créé" popup="true" style="width:80%;">}}

Accédez ensuite à la [section Log de Datadog][1] pour commencer à explorer vos logs !

[1]: https://app.datadoghq.com/logs
{{% /tab %}}
{{% tab "Terraform" %}}

Pour les utilisateurs de Terraform, vous pouvez provisionner et gérer vos déclencheurs en utilisant la ressource [aws_s3_bucket_notification][1]. Consultez l'exemple de code ci-dessous.

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

Pour les utilisateurs de CloudFormation, vous pouvez configurer des déclencheurs en utilisant la [NotificationConfiguration][1] de CloudFormation pour votre compartiment S3. Consultez l'exemple de code ci-dessous.

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


## Nettoyage et filtrage {#scrubbing-and-filtering}

Vous pouvez nettoyer les adresses e-mail ou l'adresse IP des logs envoyés par la fonction Lambda, ou définir une règle de nettoyage personnalisée [dans les paramètres Lambda][41].
Vous pouvez également exclure ou envoyer uniquement les logs qui correspondent à un modèle spécifique en utilisant [l'option de filtrage][42].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/serverless/forwarder/
[2]: /fr/serverless/forwarder#aws-privatelink-support
[3]: /fr/integrations/amazon_api_gateway/#log-collection
[4]: /fr/integrations/amazon-appsync/#send-logs-to-datadog
[5]: /fr/integrations/amazon-bedrock/
[6]: /fr/integrations/amazon_cloudfront/#log-collection
[7]: /fr/integrations/amazon_cloudtrail/#send-logs-to-datadog
[8]: /fr/integrations/amazon-codebuild/#send-logs-to-datadog
[9]: /fr/integrations/amazon-dms/#send-logs-to-datadog
[10]: /fr/integrations/amazon-documentdb/#send-logs-to-datadog
[11]: /fr/containers/amazon_ecs/logs/
[12]: /fr/integrations/amazon-eks/#log-collection
[13]: /fr/integrations/amazon-elastic-beanstalk/
[14]: /fr/integrations/amazon_elb/#log-collection
[15]: /fr/integrations/amazon_fsx/#log-collection
[16]: /fr/integrations/amazon_glue/#log-collection
[17]: /fr/integrations/amazon-iot/#enable-logging
[18]: /fr/integrations/amazon_lambda/#log-collection
[19]: /fr/integrations/amazon_mwaa/#log-collection
[20]: /fr/integrations/amazon_network_firewall/#log-collection
[21]: /fr/integrations/amazon_es/#log-collection
[22]: /fr/integrations/amazon-pcs/
[23]: /fr/integrations/amazon_rds/#log-collection
[24]: /fr/integrations/amazon-redshift/#log-collection
[25]: /fr/integrations/amazon_route53/#send-logs-to-datadog
[26]: /fr/integrations/amazon_s3/#enable-s3-access-logs
[27]: /fr/integrations/amazon_step_functions/#log-collection
[28]: /fr/integrations/amazon_transit_gateway/#log-collection
[29]: /fr/integrations/amazon-verified-access/#log-collection
[30]: /fr/integrations/amazon_vpc/#log-collection
[31]: /fr/integrations/amazon-vpn/#send-logs-to-datadog
[32]: /fr/integrations/amazon_waf/#log-collection
[33]: /fr/integrations/amazon_dynamodb/
[34]: /fr/integrations/amazon_dynamodb/#send-logs-to-datadog
[35]: /fr/integrations/amazon_ec2/
[36]: /fr/integrations/amazon_sns/
[37]: /fr/integrations/amazon_sns/#send-logs-to-datadog
[38]: /fr/integrations/amazon_web_services/
[39]: https://app.datadoghq.com/integrations/amazon-web-services
[40]: https://app.datadoghq.com/logs
[41]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-scrubbing-optional
[42]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-filtering-optional
[43]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters