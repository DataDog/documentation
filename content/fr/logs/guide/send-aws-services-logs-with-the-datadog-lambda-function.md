---
further_reading:
- link: /logs/explorer/
  tag: Documentation
  text: Apprendre à explorer vos logs
- link: /logs/explorer/#visualiser-les-donnees
  tag: Documentation
  text: Effectuer des analyses de logs
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
title: Envoyer des logs de services AWS avec la fonction Lambda Datadog
---

Les logs de service AWS peuvent être recueillis via la fonction Lambda du Forwarder Datadog. Ce Lambda, qui se déclenche sur les compartiments S3, les groupes de logs CloudWatch et les événements EventBridge, transmet les logs à Datadog.

Pour commencer à recueillir des logs à partir de vos services AWS :

1. Configurez la [fonction Lambda du Forwarder Datadog][1] dans votre compte AWS.
2. [Activez la journalisation](#activer-la-journalisation-pour-votre-service-AWS) pour votre service AWS (la plupart des services AWS peuvent se connecter à un compartiment S3 ou à un groupe de logs CloudWatch).
3. [Configurez les déclencheurs](#configurer-les-declencheurs) qui entraînent l'exécution de la fonction Lambda du Forwarder lorsqu'il y a de nouveaux logs à transférer. Les déclencheurs peuvent être configurés de deux façons différentes.

**Remarque** : si vous appartenez à la région `us-east-1` d'AWS, utilisez [l'intégration Datadog/AWS PrivateLink][2].

**Remarque** : CloudFormation crée une stratégie IAM qui inclut l'autorisation KMS:Decrypt pour toutes les ressources, ce qui n'est pas conforme aux bonnes pratiques d'AWS Security Hub. Cette autorisation sert à déchiffrer les objets des compartiments S3 chiffrés par KMS dans le but de configurer la fonction Lambda, et il est impossible de prévoir la clé KMS qui sera utilisée pour chiffrer les compartiments S3. Vous pouvez supprimer cette autorisation en toute sécurité une fois l'installation terminée.

## Activer la journalisation pour votre service AWS

Tous les services AWS qui génèrent des logs dans un compartiment S3 ou un groupe de logs CloudWatch sont pris en charge. Consultez les instructions de configuration des services les plus utilisés dans le tableau ci-dessous :

| Service AWS                        | Activation de la journalisation pour le service AWS                                                          | Envoi des logs AWS à Datadog                                                                                                                                |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [API Gateway][3]                   | [Activer les logs AWS API Gateway][4]                                                                        | Collecte des logs [manuelle][5] et [automatique](#configurer-automatiquement-des-declencheurs)                                                              |
| [Cloudfront][6]                    | [Activer les logs AWS Cloudfront][7]                                                                         | Collecte des logs [manuelle][8] et [automatique](#configurer-automatiquement-des-declencheurs)                                                              |
| [Cloudtrail][9]                    | [Activer les logs AWS Cloudtrail][9]                                                                         | Collecte de logs [manuelle][10]. Consultez la section [Guide de configuration d'AWS pour Cloud SIEM][11] si vous configurez AWS CloudTrail pour Cloud SIEM. |
| [DynamoDB][12]                     | [Activer les logs AWS DynamoDB][13]                                                                          | Collecte de logs [manuelle][14].                                                                                                                            |
| [EC2][15]                          | `-`                                                                                                          | Utiliser l'[Agent Datadog][15] pour envoyer vos logs à Datadog                                                                                              |
| [ECS][16]                          | `-`                                                                                                          | [Utiliser l'Agent Docker pour rassembler vos logs][17].                                                                                                     |
| [Elastic Load Balancing (ELB)][18] | [Activer les logs AWS ELB][19]                                                                               | Collecte des logs [manuelle][20] et [automatique](#configurer-automatiquement-des-declencheurs)                                                             |
| [Lambda][21]                       | `-`                                                                                                          | Collecte des logs [manuelle][22] et [automatique](#configurer-automatiquement-des-declencheurs)                                                             |
| [RDS][23]                          | [Activer les logs AWS RDS][24]                                                                               | Collecte de logs [manuelle][25].                                                                                                                            |
| [Route 53][26]                     | [Activer les logs AWS Route 53][27]                                                                          | Collecte de logs [manuelle][28].                                                                                                                            |
| [S3][29]                           | [Activer les logs AWS S3][30]                                                                                | Collecte des logs [manuelle][31] et [automatique](#configurer-automatiquement-des-declencheurs)                                                             |
| [SNS][32]                          | SNS ne fournit pas de logs, mais vous pouvez traiter les logs et les événements transmis via le service SNS. | Collecte de logs [manuelle][33].                                                                                                                            |
| [RedShift][34]                     | [Activer les logs AWS Redshift][35]                                                                          | Collecte des logs [manuelle][36] et [automatique](#configurer-automatiquement-des-declencheurs)                                                             |
| [Verified Access][37]              | [Activer les logs Verified Access][38]                                                                       | Collecte de logs [manuelle][39].                                                                                                                            |
| [VPC][40]                          | [Activer les logs AWS VPC][41]                                                                               | Collecte de logs [manuelle][42].                                                                                                                            |
| [Step Functions][52]               | [Activer les logs AWS Step Functions][53]                                                                    | Collecte de logs [manuelle][54].                                                                                                                            |
| [Web Application Firewall][49]     | [Activer les logs AWS WAF][50]                                                                               | Collecte de logs [manuelle][51]                                                                                                                             |


## Configurer des déclencheurs

Il existe deux méthodes de configuration des déclencheurs sur la fonction Lambda du Forwarder Datadog :

- [Automatiquement](#configurer-automatiquement-des-declencheurs) : Datadog récupère automatiquement les emplacements des logs pour les services AWS sélectionnés et les ajoute en tant que déclencheurs pour la fonction Lambda du Forwarder Datadog. Datadog met également la liste à jour.
- [Manuellement](#configurer-manuellement-des-declencheurs) : configurez vous-même chaque déclencheur.

### Configurer automatiquement des déclencheurs

Datadog peut automatiquement configurer des déclencheurs sur la fonction Lambda du Forwarder Datadog afin de recueillir les logs AWS à partir des sources et emplacements suivants :

| Source                                | Emplacement    |
| ------------------------------------- | -------------- |
| Logs d'accès API Gateway              | CloudWatch     |
| Logs d'exécution API Gateway          | CloudWatch     |
| Logs d'accès ELB de l'application     | S3             |
| Logs d'accès ELB classique            | S3             |
| Logs d'accès CloudFront               | S3             |
| Logs Lambda                           | CloudWatch     |
| Logs Redshift                         | S3             |
| Logs d'accès S3                       | S3             |
| Log des Step Functions                | CloudWatch     |
| Logs d'accès Web Application Firewall | S3, CloudWatch |

**Remarque** : Les [Filtres d'abonnement][48] ne sont pas créés automatiquement par le DatadogForwarder. Créez les directement dans un Log Group.

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][1].
2. Vérifiez que la stratégie du rôle IAM utilisé pour l'[intégration Datadog/AWS][43] possède les autorisations suivantes. Le fonctionnement de ces autorisations est décrit ci-dessous :

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

    | Autorisation AWS                                              | Description                                                                  |
    | ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
    | `cloudfront:GetDistributionConfig`                          | Récupère le nom du compartiment S3 contenant les logs d'accès CloudFront.             |
    | `cloudfront:ListDistributions`                              | Répertorie toutes les distributions CloudFront.                                           |
    | `elasticloadbalancing:`<br>`DescribeLoadBalancers`          | Répertorie tous les répartiteurs de charge.                                                     |
   Examinez la colonne `Subscriptions` de la [page des groupes de logs][1] pour vérifier que le nouveau flux Kinesis est bien abonné à vos groupes de logs.
    | `lambda:List*`                                              | Énumère toutes les fonctions Lambda. |
    | `lambda:GetPolicy`                                          | Récupère la stratégie Lambda lorsque des déclencheurs doivent être supprimés.                      |
    | `redshift:DescribeClusters`                                 | Répertorie tous les clusters Redshift.                                                  |
    | `redshift:DescribeLoggingStatus`                            | Récupère le nom du compartiment S3 contenant des logs Redshift.                      |
    | `s3:GetBucketLogging`                                       | Récupère le nom du compartiment S3 contenant les logs d'accès S3.                     |
    | `s3:GetBucketLocation`                                      | Récupère la région du compartiment S3 contenant les logs d'accès S3.                   |
    | `s3:GetBucketNotification`                                  | Récupère les configurations des déclencheurs Lambda existants.                                  |
   {{< partial name="whats-next/whats-next.html" >}}
    | `s3:PutBucketNotification`                                  | Ajoute ou supprime un déclencheur Lambda basé sur des événements de compartiment S3.                    |
    | `states:ListStateMachines`                                  | Répertorie toutes les Step Functions.                                        |
    | `states:DescribeStateMachine`                               | Récupère la configuration des logs d'une Step Function.                      |
    | `wafv2:ListLoggingConfigurations`                           | Répertorie toutes les configurations de logs de Web Application Firewall.            |
    | `logs:PutSubscriptionFilter`                                | Ajoute un déclencheur Lambda basé sur des événements de log CloudWatch.                          |
    | `logs:DeleteSubscriptionFilter`                             | Supprime un déclencheur Lambda basé sur des événements de log CloudWatch.                       |
    | `logs:DescribeSubscriptionFilters`                          | Répertorie les filtres d'abonnement pour le groupe de logs spécifié.                  |

3. Sur la [page de l'intégration AWS][44], sélectionnez le compte AWS à partir duquel recueillir les logs, puis cliquez sur l'onglet **Log Collection**.  
   {{< img src="logs/aws/aws_log_setup_step1.png" alt="Onglet Log Collection de la page de l'intégration AWS pour un compte AWS spécifique avec des instructions d'envoi de logs de services AWS et une zone de texte permettant d'abonner automatiquement la fonction Lambda du Forwarder en saisissant l'ARN de la fonction Lambda du Forwarder" popup="true" style="width:90%;" >}}
4. Saisissez l'ARN du Lambda créé à la section précédente, puis cliquez sur **Add**.
5. Sélectionnez les services à partir desquels vous souhaitez recueillir des logs, puis cliquez sur **Save**. Pour arrêter la collecte de logs d'un service spécifique, désélectionnez la source associée.
   {{< img src="logs/aws/aws_log_setup_step2.png" alt="Onglet Log Collection de la page de l'intégration AWS pour un compte AWS spécifique avec une fonction Lambda saisie sous « Included ARNs » et certains services activés sous « Log Sources »" popup="true" style="width:90%;" >}}
6. Si vous possédez des logs dans plusieurs régions, vous devez créer des fonctions Lambda supplémentaires dans ces régions et les indiquer sur cette page.
7. Pour arrêter la collecte de l'ensemble des logs AWS, passez la souris sur une fonction Lambda, puis cliquez sur l'icône de suppression. Tous les déclencheurs de cette fonction seront supprimés.
8. Quelques minutes après cette première configuration, vos logs AWS apparaissent dans le [Log Explorer][45] Datadog.

### Configurer manuellement des déclencheurs

#### Recueillir des logs depuis un groupe de logs CloudWatch

Si vous recueillez des logs depuis un groupe de logs CloudWatch, configurez le déclencheur entraînant l'exécution de la [fonction Lambda du Forwarder Datadog][1] à l'aide de l'une des méthodes suivantes :

{{< tabs >}}
{{% tab "Console AWS" %}}

1. Dans la console AWS, accédez à **Lambda**. 
2. Cliquez sur **Functions**, puis sélectionnez le Forwarder Datadog.
3. Cliquez sur **Add trigger**, puis sélectionnez **CloudWatch Logs**.
4. Sélectionnez le groupe de logs dans le menu déroulant.
5. Nommez votre filtre, puis indiquez son pattern (facultatif).
6. Cliquez sur **Add**.
7. Accédez à la [section Logs de Datadog][1] pour consulter les nouveaux événements de log envoyés à votre groupe de logs.

[1]: https://app.datadoghq.com/logs
{{% /tab %}}
{{% tab "Terraform" %}}

Si vous utilisez Terraform, vous pouvez provisionner et gérer vos déclencheurs avec la ressource [aws_cloudwatch_log_subscription_filter][1]. Consultez l'exemple de code ci-dessous.

```conf
resource "aws_cloudwatch_log_subscription_filter" "datadog_log_subscription_filter" {
  name            = "datadog_log_subscription_filter"
  log_group_name  = <NOM_GROUPE_LOGS_CLOUDWATCH> # par exemple, /aws/lambda/nom_fonction_lambda
  destination_arn = <ARN_FORWARDER_DATADOG> # par exemple,  arn:aws:lambda:us-east-1:123:function:datadog-forwarder
  filter_pattern  = ""
}
```

[1]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_subscription_filter
{{% /tab %}}
{{% tab "CloudFormation" %}}

Si vous utilisez AWS CloudFormation, vous pouvez provisionner et gérer vos déclencheurs avec la ressource CloudFormation [AWS::Logs::SubscriptionFilter][1]. Consultez l'exemple de code ci-dessous.

L'exemple de code fonctionne également pour AWS [SAM][2] et [Serverless Framework][3]. Pour ce dernier, le code doit être placé dans la section [resources][4] de votre fichier `serverless.yml`.

```yaml
Resources:
  MyLogSubscriptionFilter:
    Type: "AWS::Logs::SubscriptionFilter"
    Properties:
      DestinationArn: "<ARN_FORWARDER_DATADOG>"
      LogGroupName: "<NOM_GROUPE_LOGS_CLOUDWATCH>"
      FilterPattern: ""
```

[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-subscriptionfilter.html
[2]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html
[3]: https://www.serverless.com/
[4]: https://www.serverless.com/framework/docs/providers/aws/guide/resources/
{{% /tab %}}
{{< /tabs >}}

#### Collecte de logs depuis des compartiments S3

Si vous recueillez des logs depuis un compartiment S3, configurez le déclencheur entraînant l'exécution de la [fonction Lambda du Forwarder Datadog][1] à l'aide de l'une des méthodes suivantes :

{{< tabs >}}
{{% tab "Console AWS" %}}

1. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur dans la console AWS sur le compartiment S3 qui contient vos logs :
  {{< img src="logs/aws/adding_trigger.png" alt="Ajout d'un déclencheur" popup="true"style="width:80%;">}}

2. Sélectionnez le compartiment, puis suivez les instructions d'AWS :
  {{< img src="logs/aws/integration_lambda.png" alt="Intégration Lambda" popup="true" style="width:80%;">}}

3. Définissez le bon type d'événement sur les compartiments S3 :
  {{< img src="logs/aws/object_created.png" alt="Objet créé" popup="true" style="width:80%;">}}

Accédez ensuite à la [section Log de Datadog][1] pour commencer à explorer vos logs !

[1]: https://app.datadoghq.com/logs
{{% /tab %}}
{{% tab "Terraform" %}}

Si vous utilisez Terraform, vous pouvez provisionner et gérer vos déclencheurs avec la ressource [aws_s3_bucket_notification][1]. Consultez l'exemple de code ci-dessous.

```conf
resource "aws_s3_bucket_notification" "my_bucket_notification" {
  bucket = my_bucket
  lambda_function {
    lambda_function_arn = "<ARN_FORWARDER_DATADOG>"
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = "AWSLogs/"
    filter_suffix       = ".log"
  }
}
```


[1]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_notification
{{% /tab %}}
{{% tab "CloudFormation" %}}

Si vous utilisez CloudFormation, vous pouvez configurer les déclencheurs avec la propriété [NotificationConfiguration][1] de CloudFormation pour votre compartiment S3. Consultez l'exemple de code ci-dessous.

```yaml
Resources:
  Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: "<MON_COMPARTIMENT>"
      NotificationConfiguration:
        LambdaConfigurations:
        - Event: 's3:ObjectCreated:*'
          Function: "<ARN_FORWARDER_DATADOG>"
```


[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-notificationconfig.html
{{% /tab %}}
{{< /tabs >}}



## Nettoyage et filtrage

Vous pouvez nettoyer les adresses e-mail ou IP dans les logs envoyés par la fonction Lambda, ou définir une règle de nettoyage personnalisée [dans les paramètres de la fonction Lambda][46].
Vous pouvez également exclure ou envoyer uniquement les logs correspondant à un pattern spécifique via l'[option de filtrage][47].

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
[26]: /fr/integrations/amazon_route53/
[27]: /fr/integrations/amazon_route53/#enable-route53-logging
[28]: /fr/integrations/amazon_route53/#send-logs-to-datadog
[29]: /fr/integrations/amazon_s3/
[30]: /fr/integrations/amazon_s3/#enable-s3-access-logs
[31]: /fr/integrations/amazon_s3/#manual-installation-steps
[32]: /fr/integrations/amazon_sns/
[33]: /fr/integrations/amazon_sns/#send-logs-to-datadog
[34]: /fr/integrations/amazon_redshift/
[35]: /fr/integrations/amazon_redshift/#enable-aws-redshift-logging
[36]: /fr/integrations/amazon_redshift/#log-collection
[37]: /fr/integrations/aws_verified_access/
[38]: /fr/integrations/aws_verified_access/#enable-verified-access-logs
[39]: /fr/integrations/aws_verified_access/#log-collection
[40]: /fr/integrations/amazon_vpc/
[41]: /fr/integrations/amazon_vpc/#enable-vpc-flow-log-logging
[42]: /fr/integrations/amazon_vpc/#log-collection
[43]: /fr/integrations/amazon_web_services/
[44]: https://app.datadoghq.com/integrations/amazon-web-services
[45]: https://app.datadoghq.com/logs
[46]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-scrubbing-optional
[47]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-filtering-optional
[48]: https://docs.aws.amazon.com/fr_fr/AmazonCloudWatch/latest/logs/SubscriptionFilters.html
[49]: /integrations/amazon_waf/
[50]: /integrations/amazon_waf/#log-collection
[51]: /integrations/amazon_waf/#send-logs-to-datadog
[52]: /integrations/amazon_step_functions/
[53]: /integrations/amazon_step_functions/#log-collection
[54]: /integrations/amazon_step_functions/#send-logs-to-datadog
