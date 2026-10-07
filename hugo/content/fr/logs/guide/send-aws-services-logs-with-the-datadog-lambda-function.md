---
further_reading:
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
  text: Comment envoyer des journaux à Datadog tout en réduisant les frais de transfert
    de données
- link: https://learn.datadoghq.com/courses/send-aws-logs
  tag: Centre d'apprentissage
  text: Envoyer des journaux AWS
title: Envoyer des logs de services AWS avec la fonction Lambda Datadog
---
Les journaux des services AWS peuvent être collectés à l'aide de la fonction Lambda Datadog Forwarder. Cette Lambda—qui se déclenche sur les buckets S3, les groupes de journaux CloudWatch et les événements EventBridge—transmet les journaux à Datadog.

Pour commencer à recueillir des logs à partir de vos services AWS :

1. Configurez la [fonction Lambda Datadog Forwarder][1] dans votre compte AWS.
2. [Activez la journalisation](#enable-logging-for-your-aws-service) pour votre service AWS (la plupart des services AWS peuvent enregistrer dans un bucket S3 ou un groupe de journaux CloudWatch).
3. [Configurez les déclencheurs](#set-up-triggers) qui provoquent l'exécution de la fonction Lambda Forwarder lorsqu'il y a de nouveaux journaux à transmettre. Il existe deux façons de configurer les déclencheurs.

**Remarques** :
   - Vous pouvez utiliser [AWS PrivateLink][2] pour envoyer vos journaux via une connexion privée.
   - CloudFormation crée une politique IAM qui inclut `KMS:Decrypt` pour toutes les ressources et qui n'est pas conforme aux meilleures pratiques d'AWS Security Hub. Cette autorisation est utilisée pour déchiffrer des objets provenant de buckets S3 chiffrés par KMS afin de configurer la fonction Lambda, et la clé KMS utilisée pour chiffrer les buckets S3 ne peut pas être prédite. Vous pouvez supprimer en toute sécurité cette autorisation après la fin réussie de l'installation.

## Activez la journalisation pour votre service AWS {#enable-logging-for-your-aws-service}

Tout service AWS qui génère des journaux dans un bucket S3 ou un groupe de journaux CloudWatch est pris en charge. Trouvez les instructions de configuration pour les services les plus utilisés dans le tableau ci-dessous :

| Service AWS                        | Activer la journalisation du service AWS                                                                                   | Envoyer les journaux AWS à Datadog                                                                                                     |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [API Gateway][3]                   | [Activer les journaux Amazon API Gateway][4]                                                                            | [Manuel][5] et [collecte](#automatically-set-up-triggers) automatique des journaux.                                                  |
| [AppSync][64]                      | [Activer les journaux AWS AppSync][65]                                                                                  | [Manuel][65] et [collecte](#automatically-set-up-triggers) automatique des journaux.                                                  |
| Batch                              | `-`                                                                                                            | [Collecte](#automatically-set-up-triggers) automatique des journaux.                                                  |
| [Bedrock Agentcore][74]            | `-`                                                                                                            | [Collecte](#automatically-set-up-triggers) automatique des journaux.                                                  |
| [Cloudfront][6]                    | [Activer les journaux Amazon CloudFront][7]                                                                             | [Manuel][8] et [collecte](#automatically-set-up-triggers) automatique des journaux.                                                  |
| [CloudTrail][9]                    | [Activer les journaux AWS CloudTrail][9]                                                                                | [Manuel][10] et [collecte](#automatically-set-up-triggers) automatique des journaux. Voir [Configuration AWS pour Cloud SIEM][11] si vous configurez AWS CloudTrail pour Cloud SIEM. |
| [CodeBuild][66]                    | [Activer les journaux AWS CodeBuild][67]                                                                                | [Manuel][67] et [collecte](#automatically-set-up-triggers) automatique des journaux.                                                  |
| [DMS][68]                          | [Activer les journaux du Service de Migration de Base de Données AWS][69]                                                               | [Manuel][69] et [collecte](#automatically-set-up-triggers) automatique des journaux.                                                  |
| [DocumentDB][70]                   | [Activer les journaux Amazon DocumentDB][71]                                                                            | [Manuel][71] et [collecte](#automatically-set-up-triggers) automatique des journaux.                                                  |
| [DynamoDB][12]                     | [Activer les journaux Amazon DynamoDB][13]                                                                              | [Manuel][14] collecte des journaux.                                                                                                 |
| [EC2][15]                          | `-`                                                                                                            | Utilisez l'[Agent Datadog][15] pour envoyer vos journaux à Datadog.                                                                    |
| [ECS][16]                          | `-`                                                                                                            | [Utilisez l'Agent Docker pour rassembler vos journaux][17] ou [collecte](#automatically-set-up-triggers) automatique des journaux.                                                                              |
| [EKS][62]                          | [Activer les journaux Amazon EKS][63]                                                                                   | [Manuel][63] et [collecte](#automatically-set-up-triggers) automatique des journaux.                                                 |
| [Elastic Load Balancing (ELB)][18] | [Activer les journaux Amazon ELB][19]                                                                                   | [Manuel][20] et [collecte](#automatically-set-up-triggers) automatique des journaux.                                                 |
| [Glue][76]                         | [Activer les journaux AWS Glue][77]                                                                                     | [Manuel][77] et [collecte](#automatically-set-up-triggers) automatique des journaux.                                                 |
| [IoT Core][74]                     | [Activer les journaux Amazon IoT Core][75]                                                                              | [Collecte](#automatically-set-up-triggers) automatique des journaux.                                                                  |
| [Lambda][21]                       | `-`                                                                                                            | [Manuel][22] et [collecte](#automatically-set-up-triggers) automatique des journaux.                                                 |
| [MWAA][55]                         | [Activer les journaux Amazon MWAA][56]                                                                                  | [Manuel][56] et [collecte](#automatically-set-up-triggers) automatique des journaux.                                                 |
| [Network Firewall][57]             | [Activer les journaux AWS Network Firewall][58]                                                                         | [Manuel][58] et [collecte](#automatically-set-up-triggers) automatique des journaux.                                                 |
| [PCS][75]                          | `-`                                                                                                            | [Collecte](#automatically-set-up-triggers) automatique des journaux.                                                  |
| [RDS][23]                          | [Activer les journaux Amazon RDS][24]                                                                                   | [Manuel][25] collecte des journaux.                                                                                                |
| [RedShift][34]                     | [Activer les journaux Amazon Redshift][35]                                                                              | [Manuel][36] et [collecte](#automatically-set-up-triggers) automatique des journaux.                                                 |
| Redshift Serverless                | `-`                                                                                                            | [Collecte](#automatically-set-up-triggers) automatique des journaux.                                                                  |
| [Route 53][59]                     | Activez la journalisation des requêtes DNS d'Amazon Route 53 [DNS query logging][60] et [resolver query logging][73]                                                                                                                                                  | [Manuel][61] et [collecte](#automatically-set-up-triggers) automatique des journaux.                                                 |
| [S3][29]                           | [Activez les journaux Amazon S3][30]                                                                                    | [Manuel][31] et [automatique](#automatically-set-up-triggers) collecte des journaux.                                                 |
| [SNS][32]                          | SNS ne fournit pas de journaux, mais vous pouvez traiter les journaux et les événements qui transitent vers le service SNS. | [Manuel][33] collecte des journaux.                                                                                                 |
| SSM                                | `-`                                                                                                            | [Collecte](#automatically-set-up-triggers) automatique des journaux.                                                            |
| [Step Functions][52]               | [Activez les journaux Amazon Step Functions][53]                                                                        | [Manuel][54] collecte des journaux.                                                                                                 |
| [Verified Access][37]              | [Activez les journaux Verified Access][38]                                                                              | [Manuel][39] et [automatique](#automatically-set-up-triggers) collecte des journaux.                                                                                                 |
| [VPC][40]                          | [Activez les journaux Amazon VPC][41]                                                                                   | [Manuel][42] et [automatique](#automatically-set-up-triggers) collecte des journaux.                                                                                                 |
| [VPN][26]                          | [Activez les journaux AWS VPN][72]                                                                                      | [Manuel][27] et [automatique](#automatically-set-up-triggers) collecte des journaux.                                                                                                 |
| [Web Application Firewall][49]     | [Activez les journaux AWS WAF][50]                                                                                      | [Manuel][51] et [automatique](#automatically-set-up-triggers) collecte des journaux.                                                 |



## Configurez des déclencheurs {#set-up-triggers}

Il existe deux méthodes de configuration des déclencheurs sur la fonction Lambda du Forwarder Datadog :

- [Automatiquement](#automatically-set-up-triggers) : Datadog récupère automatiquement les emplacements des journaux pour les services AWS sélectionnés et les ajoute en tant que déclencheurs sur la fonction Lambda Datadog Forwarder. Datadog maintient également la liste à jour.
- [Manuellement](#manually-set-up-triggers) : Configurez chaque déclencheur vous-même.

### Configurez automatiquement des déclencheurs {#automatically-set-up-triggers}

Datadog peut configurer automatiquement des déclencheurs sur la fonction Lambda Datadog Forwarder pour collecter les journaux AWS. Cependant, l'abonnement automatique ne prend pas en charge la création de déclencheurs sur différents comptes ou régions AWS. Pour les scénarios où les journaux sont publiés dans des compartiments S3 dans un compte séparé, nous recommandons de créer manuellement un déclencheur dans le même compte que le compartiment pour contourner cette limitation.

Les sources et emplacements suivants sont pris en charge :

| Source                      | Emplacement       |
| --------------------------- | -------------- |
| Apache Airflow (MWAA)       | CloudWatch     |
| Journaux d'accès de l'API Gateway     | CloudWatch     |
| Journaux d'exécution de l'API Gateway  | CloudWatch     |
| Journaux d'accès de l'ELB d'application | S3             |
| Journaux AppSync                | CloudWatch     |
| Batch                       | CloudWatch     |
| Journaux de Bedrock Agentcore      | S3, CloudWatch |
| Journaux d'accès de l'ELB classique     | S3             |
| Journaux d'accès de CloudFront      | S3             |
| Journaux de CloudTrail             | S3, CloudWatch |
| Journaux de CodeBuild              | S3, CloudWatch |
| Journaux DMS                    | CloudWatch     |
| Journaux DocumentDB             | CloudWatch     |
| Journaux ECS                    | CloudWatch     |
| Journaux du plan de contrôle EKS      | CloudWatch     |
| Journaux Container Insights d'EKS | CloudWatch     |
| Journaux des Glue Jobs | CloudWatch     |
| Journaux Lambda                 | CloudWatch     |
| Journaux Lambda@Edge            | CloudWatch     |
| Journaux IoT Core                    | CloudWatch     |
| Journaux de pare-feu réseau       | S3, CloudWatch |
| Journaux PCS                    | CloudWatch     |
| Journaux Redshift               | S3, CloudWatch |
| Journaux Redshift Serverless    | CloudWatch     |
| Journaux RDS                    | CloudWatch     |
| Journaux des requêtes DNS Route53      | CloudWatch     |
| Journaux des requêtes Route53 Resolver | S3, CloudWatch |
| Journaux d'accès S3              | S3             |
| Journaux de commandes SSM            | CloudWatch     |
| Step Functions | CloudWatch     |
| Journaux Verified Access | S3, CloudWatch |
| Journaux de flux VPC               | S3, CloudWatch |
| Journaux VPN                    | CloudWatch     |
| Pare-feu d'application Web    | S3, CloudWatch |

**Remarque** : [Subscription filters][48] sont créés automatiquement sur les groupes de journaux CloudWatch par le DatadogForwarder, et sont nommés au format `DD_LOG_SUBSCRIPTION_FILTER_<LOG_GROUP_NAME>`.

1. Si vous ne l'avez pas déjà fait, configurez la [Datadog log collection AWS Lambda function][1].
2. Assurez-vous que la politique du rôle IAM utilisé pour [Datadog-AWS integration][43] dispose des autorisations suivantes. Des informations sur l'utilisation de ces permissions peuvent être trouvées dans les descriptions ci-dessous :

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


3. Sur la [page d'intégration AWS][44], sélectionnez le compte AWS à partir duquel collecter les journaux et cliquez sur l'onglet **Collecte de journaux**.
4. Dans la section **Datadog Forwarder Lambda**, entrez l'ARN de la Lambda créée dans la section précédente et cliquez sur **Ajouter**. La fonction Lambda apparaît dans le tableau ci-dessous avec son nom, sa version et sa région.
5. Dans la section **Log Autosubscription**, sous **Log Sources**, activez les services dont vous souhaitez collecter les journaux en les activant. Pour arrêter la collecte des journaux d'un service particulier, désactivez la source de journaux correspondante.
6. (Optionnel) Dans la section **Log Source Tag Filters**, vous pouvez filtrer la collecte des journaux par balises de ressources pour chaque source de journal. Sélectionnez une source de journal dans le menu déroulant et ajoutez des balises au format `key:value` pour limiter la collecte des journaux aux ressources concernées. **Remarque** : Les balises de ressources sont automatiquement mises en minuscules pour correspondre aux conventions de la plateforme Datadog. Définissez vos filtres de balises en minuscules pour éviter les incohérences.
7. Si vous avez des journaux dans plusieurs régions, vous devez créer des fonctions Lambda supplémentaires dans ces régions et les ajouter dans la section **Datadog Forwarder Lambda**.
8. Pour arrêter la collecte de tous les journaux AWS d'une fonction Lambda spécifique, survolez la Lambda dans le tableau et cliquez sur l'icône de suppression. Tous les déclencheurs pour cette fonction sont supprimés.
9. Dans les quelques minutes suivant cette configuration initiale, vos journaux AWS apparaissent dans le [Log Explorer][45] de Datadog.

### Configurez manuellement les déclencheurs {#manually-set-up-triggers}

#### Collecte des journaux du groupe de journaux CloudWatch {#collecting-logs-from-cloudwatch-log-group}

Si vous recueillez des logs depuis un groupe de logs CloudWatch, configurez le déclencheur entraînant l'exécution de la [fonction Lambda du Forwarder Datadog][1] à l'aide de l'une des méthodes suivantes :

{{< tabs >}}
{{% tab "Console AWS" %}}

1. Dans la console AWS, allez à **Lambda**.
2. Cliquez sur **Functions** et sélectionnez le Datadog Forwarder.
3. Cliquez sur **Ajouter un déclencheur** et sélectionnez **CloudWatch Logs**.
4. Sélectionnez le groupe de journaux dans le menu déroulant.
5. Entrez un nom pour votre filtre et, si vous le souhaitez, spécifiez un motif de filtre.
6. Cliquez sur **Ajouter**.
7. Allez dans la section [Datadog Log][1] pour explorer les nouveaux événements de journal envoyés à votre groupe de journaux.

[1]: https://app.datadoghq.com/logs
{{% /tab %}}
{{% tab "Terraform" %}}

Pour les utilisateurs de Terraform, vous pouvez provisionner et gérer vos déclencheurs en utilisant la ressource [aws_cloudwatch_log_subscription_filter][1]. Voir le code d'exemple ci-dessous.

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

Pour les utilisateurs d'AWS CloudFormation, vous pouvez provisionner et gérer vos déclencheurs en utilisant la ressource CloudFormation [AWS::Logs::SubscriptionFilter][1]. Voir le code d'exemple ci-dessous.

Le code d'exemple fonctionne également pour AWS [SAM][2] et [Serverless Framework][3]. Pour Serverless Framework, placez le code sous la section [resources][4] dans votre `serverless.yml`.

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

#### Collecte des journaux à partir des buckets S3 {#collecting-logs-from-s3-buckets}

Si vous recueillez des logs depuis un compartiment S3, configurez le déclencheur entraînant l'exécution de la [fonction Lambda du Forwarder Datadog][1] à l'aide de l'une des méthodes suivantes :

{{< tabs >}}
{{% tab "Console AWS" %}}

1. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le bucket S3 contenant vos journaux dans la console AWS :
  {{< img src="logs/aws/adding_trigger.png" alt="Ajout d’un déclencheur" popup="true"style="width:80%;">}}

2. Sélectionnez le bucket puis suivez les instructions AWS :
  {{< img src="logs/aws/integration_lambda.png" alt="Intégration Lambda" popup="true" style="width:80%;">}}

3. Définissez le bon type d'événement sur les buckets S3 :
  {{< img src="logs/aws/object_created.png" alt="Objet créé" popup="true" style="width:80%;">}}

Accédez ensuite à la [section Log de Datadog][1] pour commencer à explorer vos logs !

[1]: https://app.datadoghq.com/logs
{{% /tab %}}
{{% tab "Terraform" %}}

Pour les utilisateurs de Terraform, vous pouvez provisionner et gérer vos déclencheurs en utilisant la ressource [aws_s3_bucket_notification][1]. Voir le code d'exemple ci-dessous.

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

Pour les utilisateurs de CloudFormation, vous pouvez configurer des déclencheurs en utilisant la [NotificationConfiguration][1] de CloudFormation pour votre bucket S3. Voir le code d'exemple ci-dessous.

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

Vous pouvez nettoyer les e-mails ou les adresses IP des journaux envoyés par la fonction Lambda, ou définir une règle de nettoyage personnalisée [dans les paramètres Lambda][46].
Vous pouvez également exclure ou envoyer uniquement les journaux qui correspondent à un modèle spécifique en utilisant le [filtering option][47].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/serverless/forwarder/
[2]: /fr/serverless/forwarder#aws-privatelink-support
[3]: /fr/integrations/amazon_api_gateway/
[4]: /fr/integrations/amazon_api_gateway/#log-collection
[5]: /fr/integrations/amazon_api_gateway/#send-logs-to-datadog
[6]: /fr/integrations/amazon_cloudfront/
[7]: /fr/integrations/amazon_cloudfront/#enable-cloudfront-logging
[8]: /fr/integrations/amazon_cloudfront/#send-logs-to-datadog
[9]: /fr/integrations/amazon_cloudtrail/#enable-cloudtrail-logging
[10]: /fr/integrations/amazon_cloudtrail/#send-logs-to-datadog
[11]: /fr/security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
[12]: /fr/integrations/amazon_dynamodb/#enable-dynamodb-logging
[13]: /fr/integrations/amazon_dynamodb/
[14]: /fr/integrations/amazon_dynamodb/#send-logs-to-datadog
[15]: /fr/integrations/amazon_ec2/
[16]: /fr/integrations/amazon_ecs/
[17]: /fr/integrations/amazon_ecs/#log-collection
[18]: /fr/integrations/amazon_elb/
[19]: /fr/integrations/amazon_elb/#enable-aws-elb-logging
[20]: /fr/integrations/amazon_elb/#manual-installation-steps
[21]: /fr/integrations/amazon_lambda/
[22]: /fr/integrations/amazon_lambda/#log-collection
[23]: /fr/integrations/amazon_rds/
[24]: /fr/integrations/amazon_rds/#enable-rds-logging
[25]: /fr/integrations/amazon_rds/#send-logs-to-datadog
[26]: /fr/integrations/amazon-vpn/
[27]: /fr/integrations/amazon-vpn/#send-logs-to-datadog
[28]: /fr/integrations/amazon_route53/#send-logs-to-datadog
[29]: /fr/integrations/amazon_s3/
[30]: /fr/integrations/amazon_s3/#enable-s3-access-logs
[31]: /fr/integrations/amazon_s3/#manual-installation-steps
[32]: /fr/integrations/amazon_sns/
[33]: /fr/integrations/amazon_sns/#send-logs-to-datadog
[34]: /fr/integrations/amazon_redshift/
[35]: /fr/integrations/amazon-redshift/#enable-logging
[36]: /fr/integrations/amazon-redshift/#log-collection
[37]: /fr/integrations/amazon-verified-access/
[38]: /fr/integrations/amazon-verified-access/#enable-verified-access-logs
[39]: /fr/integrations/amazon-verified-access/#log-collection
[40]: /fr/integrations/amazon_vpc/
[41]: /fr/integrations/amazon_vpc/#enable-vpc-flow-log-logging
[42]: /fr/integrations/amazon_vpc/#log-collection
[43]: /fr/integrations/amazon_web_services/
[44]: https://app.datadoghq.com/integrations/amazon-web-services
[45]: https://app.datadoghq.com/logs
[46]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-scrubbing-optional
[47]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-filtering-optional
[48]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters
[49]: /fr/integrations/amazon_waf/
[50]: /fr/integrations/amazon_waf/#log-collection
[51]: /fr/integrations/amazon_waf/#send-logs-to-datadog
[52]: /fr/integrations/amazon_step_functions/
[53]: /fr/integrations/amazon_step_functions/#log-collection
[54]: /fr/integrations/amazon_step_functions/#send-logs-to-datadog
[55]: /fr/integrations/amazon_mwaa/
[56]: /fr/integrations/amazon_mwaa/#log-collection
[57]: /fr/integrations/amazon_network_firewall/
[58]: /fr/integrations/amazon_network_firewall/#log-collection
[59]: /fr/integrations/amazon_route53/
[60]: /fr/integrations/amazon_route53/#enable-route53-dns-query-logging
[61]: /fr/integrations/amazon_route53/#send-logs-to-datadog
[62]: /fr/integrations/amazon-eks/
[63]: /fr/integrations/amazon-eks/#log-collection
[64]: /fr/integrations/amazon-appsync/
[65]: /fr/integrations/amazon-appsync/#send-logs-to-datadog
[66]: /fr/integrations/amazon-codebuild/
[67]: /fr/integrations/amazon-codebuild/#send-logs-to-datadog
[68]: /fr/integrations/amazon-dms/
[69]: /fr/integrations/amazon-dms/#send-logs-to-datadog
[70]: /fr/integrations/amazon-documentdb/
[71]: /fr/integrations/amazon-documentdb/#send-logs-to-datadog
[72]: /fr/integrations/amazon-vpn/#enable-logging
[73]: /fr/integrations/amazon_route53/#enable-route53-resolver-query-logging
[74]: /fr/integrations/amazon-iot/
[75]: /fr/integrations/amazon-iot/#enable-logging
[74]: /fr/integrations/amazon-bedrock/
[75]: /fr/integrations/amazon-pcs/
[76]: /fr/integrations/amazon_glue/
[77]: /fr/integrations/amazon_glue/#log-collection