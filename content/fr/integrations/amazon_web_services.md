---
aliases:
- /fr/integrations/aws/
- /fr/logs/aws
- /fr/integrations/faq/revoking-aws-keys-and-enabling-role-delegation-for-the-datadog-aws-integration/
- /fr/integrations/faq/additional-aws-metrics-min-max-sum
- /fr/integrations/faq/why-am-i-only-seeing-the-average-values-of-my-custom-aws-cloudwatch-metrics/
categories:
- aws
- cloud
- iot
- log collection
dependencies: []
description: Intégrez vos services AWS à Datadog.
doc_link: https://docs.datadoghq.com/integrations/amazon_web_services/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-aws-control-plane-api-usage-metrics/
  tag: Blog
  text: Surveiller les métriques d'utilisation des API de plan de contrôle AWS dans
    Datadog
- link: https://www.datadoghq.com/blog/aws-reinvent-2022-recap/
  tag: Blog
  text: « Les points forts de l'édition 2022 du re:Invent AWS »
git_integration_title: amazon_web_services
has_logo: true
integration_id: amazon-web-services
integration_title: AWS
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_web_services
public_title: Intégration Datadog/AWS
short_description: Intégrez vos services AWS à Datadog.
version: '1.0'
---

## Présentation

Associez Amazon Web Services (AWS) pour :

- Visualiser les mises à jour automatiques de statut AWS dans votre Events Explorer
- Obtenir des métriques CloudWatch pour les hosts EC2 sans installer l'Agent
- Taguer vos hosts EC2 avec des informations propres à EC2
- Visualiser les événements de maintenance EC2 planifiés dans votre flux
- Recueillir des métriques et des événements CloudWatch depuis de nombreux autres produits AWS
- Visualiser les alarmes CloudWatch dans votre Events Explorer

Pour profiter au plus vite de l'intégration AWS, consultez le [guide de prise en main d'AWS][1].

L'intégration Amazon Web Services de Datadog permet de recueillir les logs, les événements et [toutes les métriques en provenance de CloudWatch][2] pour plus de [90 services AWS][3].

## Configuration

{{< site-region region="gov" >}}
<div class="alert alert-warning">La délégation des rôles AWS n'est pas prise en charge par le site gouvernemental Datadog. En effet, il nécessite l'utilisation de <a href="?tab=accesskeysgovcloudorchinaonly#configuration">clés d'accès</a>.</div>
{{< /site-region >}}

Choisissez l'une des méthodes suivantes pour intégrer vos comptes AWS dans Datadog et ainsi recueillir vos métriques, vos événements, vos traces et vos logs :

### Configuration automatique

  * **CloudFormation (idéal pour se lancer rapidement)**  
      Pour configurer l'intégration AWS avec CloudFormation, consultez le [guide de prise en main d'AWS][1].

  * **Terraform**  
      Pour configurer l'intégration AWS avec Terraform, consultez la section [Intégration AWS avec Terraform][4].

  * **Control Tower**  
      Pour configurer l'intégration AWS lors du provisionnement d'un nouveau compte AWS avec la fonction [Account Factory de Control Tower][5], consultez le [guide de configuration de Control Tower][6] (en anglais).

  * **Configuration avec plusieurs comptes pour les organisations AWS**  
      Pour configurer l'intégration AWS avec plusieurs comptes au sein d'une organisation AWS, consultez le [guide dédié][7].

### Méthode manuelle

   * **Délégation des rôles**
      Pour configurer l'intégration AWS manuellement avec la délégation des rôles, consultez le [guide de configuration manuelle][8].

   * **Clés d'accès (régions GovCloud ou Chine uniquement)**  
      Pour configurer l'intégration AWS avec les clés d'accès, consultez le [guide de configuration manuelle][9].

{{% aws-permissions %}}

## Collecte de logs

Il existe deux façons d'envoyer des logs de service AWS à Datadog :

- [Destination Kinesis Firehose][9] : utilisez la destination Datadog dans votre flux de diffusion Kinesis Firehose pour transmettre vos logs à Datadog. Il est conseillé de procéder de la même façon pour envoyer un volume très élevé de logs depuis CloudWatch.
- [Fonction Lambda du Forwarder][10] : déployez la fonction Lambda du Forwarder Datadog qui s'abonne aux compartiments S3 ou à vos groupes de logs CloudWatch. Transmettez ensuite vos logs à Datadog. Datadog vous conseille également d'utiliser cette méthode pour envoyer des logs depuis S3 ou depuis d'autres ressources ne prenant pas en charge la diffusion de données vers Kinesis.

## Collecte de métriques

Il existe deux façons d'envoyer des métriques AWS à Datadog :

- [Interrogation des métriques][11] : l'intégration AWS contient une fonctionnalité d'interrogation d'API. Celle-ci effectue une analyse métrique par métrique de l'API CloudWatch afin d'extraire les données à envoyer à Datadog. De nouvelles métriques sont extraites toutes les 10 minutes en moyenne.
- [Flux de métriques avec Kinesis Firehose][12] : vous pouvez utiliser les flux de métriques Amazon CloudWatch et Amazon Kinesis Data Firehose pour visualiser vos métriques. **Remarque** : cette méthode implique une latence de deux à trois minutes, et requiert une configuration distincte.

Consultez la section [Facturation des intégrations AWS][14] pour découvrir les solutions pour exclure certaines ressources et ainsi réduire vos coûts.

## Collecte de ressources

Certains produits Datadog tirent parti d'informations relatives à la configuration de vos ressources AWS (tels que les compartiments S3, les snapshots RDS et les distributions CloudFront). Datadog récupère ces informations en effectuant des appels API en lecture seule vers votre compte AWS.

### Cloud Security Posture Management

#### Implémentation

Si vous n'avez pas encore configuré l'intégration AWS pour votre compte AWS, suivez les [étapes requises][15] ci-dessus. Prenez soin d'activer Cloud Security Posture Management lorsque vous y êtes invité.

**Remarque :** pour utiliser cette fonctionnalité, l'intégration AWS doit être configurée avec la **délégation des rôles**.

Pour ajouter la solution Cloud Security Posture Management à une intégration AWS existante, suivez les étapes ci-dessous pour activer la collecte de ressources.

1. Accordez les autorisations requises au rôle IAM Datadog en suivant les étapes manuelles **ou** automatiques :

    **Méthode automatique** - Mise à jour de votre modèle CloudFormation.
    a. Dans la console CloudFormation, repérez la stack principale que vous avez utilisée pour installer l'intégration Datadog, puis sélectionnez `Update`.
    b. Sélectionnez `Replace current template`.
    c. Sélectionnez `Amazon S3 URL`, saisissez `https://datadog-cloudformation-template.s3.amazonaws.com/aws/main.yaml`, puis cliquez sur `Next`.
    d. Définissez l'option `CloudSecurityPostureManagementPermissions` sur `true`, puis cliquez sur `Next` sans modifier d'autres paramètres jusqu'à atteindre la page `Review`, qui vous permet de vérifier l'ensemble des changements prévus.
    e. Cochez les deux cases d'acceptation en bas de la page et cliquez sur `Update stack`.

   **Méthode manuelle** : associez la [stratégie `SecurityAudit` gérée d'AWS][16] à votre rôle AWS IAM Datadog. Cette stratégie est disponible dans la [console AWS][16].

2. Suivez les étapes ci-dessous pour terminer la configuration sur la [page de l'intégration Datadog/AWS][17]. Vous pouvez également utiliser l'endpoint d'API pour la [mise à jour d'une intégration AWS][8].

   1. Cliquez sur le compte AWS pour lequel vous souhaitez activer la collecte de ressources.
   2. Dans l'onglet **Resource collection** de ce compte, activez `Cloud Security Posture Management Collection`.
   3. En bas à droite de la page, cliquez sur `Save`.

## Collecte d'alarmes

Vous pouvez envoyer des alarmes AWS CloudWatch à l'Events Explorer Datadog de deux façons différentes :

- Récupération d'alarmes : cette fonctionnalité est fournie par défaut avec l'intégration AWS et permet de récupérer les alarmes liées aux métriques par l'intermédiaire de l'API [DescribeAlarmHistory][18]. Si vous utilisez cette méthode, vos alarmes sont classées sous la source d'événements `Amazon Web Services`. **Remarque** : le crawler ne récupère pas les alarmes composites. 
- Rubrique SNS : pour visualiser toutes vos alarmes AWS CloudWatch dans votre Events Explorer, abonnez les alarmes à une rubrique SNS, puis transférez les messages SNS à Datadog. Pour découvrir comment recevoir des messages SNS en tant qu'événements dans Datadog, consultez la rubrique [Recevoir les messages de SNS][19]. Si vous utilisez cette méthode, vos alarmes sont classées sous la source d'événements `Amazon SNS`.

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_web_services" >}}


### Événements

La collecte d'événements AWS se configure au niveau de chaque service AWS. Consultez la [documentation du service AWS pertinent][3] pour obtenir plus d'informations sur la collecte d'événements.

### Tags

Les tags suivants sont recueillis à l'aide de l'intégration AWS. **Remarque** : certains tags s'affichent uniquement pour des métriques spécifiques.

| Intégration            | Clés de tag Datadog                                                                                                                                                                                              |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Toutes                    | `region`                                                                                                                                                                                                      |
| [API Gateway][21]      | `apiid`, `apiname`, `method`, `resource`, `stage`                                                                                                                                                             |
| [App Runner][22]      | `instance`, `serviceid`, `servicename`                                                                                                                                                                       |
| [Auto Scaling][23]    | `autoscalinggroupname`, `autoscaling_group`                                                                                                                                                                   |
| [Billing][24]          | `account_id`, `budget_name`, `budget_type`, `currency`, `servicename`, `time_unit`                                                                                                                            |
| [CloudFront][25]       | `distributionid`                                                                                                                                                                                              |
| [CodeBuild][26]              | `project_name`                                                                                                                                                                                                |
| [CodeDeploy][27]       | `application`, `creator`, `deployment_config`, `deployment_group`, `deployment_option`, `deployment_type`, `status`                                                                                           |
| [DirectConnect][28]    | `connectionid`                                                                                                                                                                                                |
| [DynamoDB][29]         | `globalsecondaryindexname`, `operation`, `streamlabel`, `tablename`                                                                                                                                           |
| [EBS][30]              | `volumeid`, `volume-name`, `volume-type`                                                                                                                                                                      |
| [EC2][31]              | `autoscaling_group`, `availability-zone`, `image`, `instance-id`, `instance-type`, `kernel`, `name`, `security_group_name`                                                                                    |
| [ECS][32]              | `clustername`, `servicename`, `instance_id`                                                                                                                                                                   |
| [EFS][33]              | `filesystemid`                                                                                                                                                                                                |
| [ElastiCache][34]      | `cachenodeid`, `cache_node_type`, `cacheclusterid`, `cluster_name`, `engine`, `engine_version`, `preferred_availability-zone`, `replication_group`                                                             |
| [ElasticBeanstalk][35] | `environmentname`, `enviromentid`                                                                                                                                                                             |
| [ELB][36]              | `availability-zone`, `hostname`, `loadbalancername`, `name`, `targetgroup`                                                                                                                                    |
| [EMR][37]              | `cluster_name`, `jobflowid`                                                                                                                                                                                   |
| [ES][38]               | `dedicated_master_enabled`, `ebs_enabled`, `elasticsearch_version`, `instance_type`, `zone_awareness_enabled`                                                                                                 |
| [Firehose][39]         | `deliverystreamname`                                                                                                                                                                                          |
| [FSx][40]             | `filesystemid`, `filesystemtype`                                                                                                                                                                               |
| [Health][41]           | `event_category`, `status`, `service`                                                                                                                                                                         |
| [IoT][42]              | `actiontype`, `protocol`, `rulename`                                                                                                                                                                          |
| [Kinesis][43]          | `streamname`, `name`, `state`                                                                                                                                                                                 |
| [KMS][44]              | `keyid`                                                                                                                                                                                                       |
| [Lambda][45]           | `functionname`, `resource`, `executedversion`, `memorysize`, `runtime`                                                                                                                                        |
| [Machine Learning][46] | `mlmodelid`, `requestmode`                                                                                                                                                                                    |
| [MQ][47]               | `broker`, `queue`, `topic`                                                                                                                                                                                    |
| [OpsWorks][48]         | `stackid`, `layerid`, `instanceid`                                                                                                                                                                            |
| [Polly][49]            | `operation`                                                                                                                                                                                                   |
| [RDS][50]              | `auto_minor_version_upgrade`, `dbinstanceclass`, `dbclusteridentifier`, `dbinstanceidentifier`, `dbname`, `engine`, `engineversion`, `hostname`, `name`, `publicly_accessible`, `secondary_availability-zone` |
| [RDS Proxy][51]       | `proxyname`, `target`, `targetgroup`, `targetrole`                                                                                                                                                                                                  |
| [Redshift][52]       | `clusteridentifier`, `latency`, `nodeid`, `service_class`, `stage`, `wlmid`                                                                                                                                   |
| [Route 53][53]        | `healthcheckid`                                                                                                                                                                                               |
| [S3][54]             | `bucketname`, `filterid`, `storagetype`                                                                                                                                                                       |
| [SES][55]             | Les clés de tag sont personnalisées dans AWS.                                                                                                                                                                               |
| [SNS][56]              | `topicname`                                                                                                                                                                                                   |
| [SQS][57]              | `queuename`                                                                                                                                                                                                   |
| [VPC][58]              | `nategatewayid`, `vpnid`, `tunnelipaddress`                                                                                                                                                                   |
| [WorkSpaces][59]       | `directoryid`, `workspaceid`                                                                                                                                                                                  |

### Checks de service
{{< get-service-checks-from-git "amazon_web_services" >}}


## Dépannage

Consultez la section [Dépannage de l'intégration AWS][61] pour résoudre les problèmes liés à l'intégration AWS.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/getting_started/integrations/aws/
[2]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html
[3]: https://docs.datadoghq.com/fr/integrations/#cat-aws
[4]: https://docs.datadoghq.com/fr/integrations/guide/aws-terraform-setup
[5]: https://docs.aws.amazon.com/controltower/latest/userguide/account-factory.html
[6]: https://aws.amazon.com/blogs/awsmarketplace/deploy-datadogs-aws-integration-accounts-aws-control-tower-account-factory-customization/
[7]: https://docs.datadoghq.com/fr/integrations/guide/aws-organizations-setup/
[8]: https://docs.datadoghq.com/fr/integrations/guide/aws-manual-setup/
[9]: https://docs.datadoghq.com/fr/integrations/guide/aws-manual-setup/?tab=accesskeysgovcloudorchinaonly
[10]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[11]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[12]: https://docs.datadoghq.com/fr/integrations/guide/cloud-metric-delay/#aws
[13]: https://docs.datadoghq.com/fr/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[14]: https://docs.datadoghq.com/fr/account_management/billing/aws/
[15]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=roledelegation#setup
[16]: https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit
[17]: https://app.datadoghq.com/integrations/amazon-web-services
[18]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_DescribeAlarmHistory.html#API_DescribeAlarmHistory_RequestParameters
[19]: https://docs.datadoghq.com/fr/integrations/amazon_sns/#receive-sns-messages
[20]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/amazon_web_services_metadata.csv
[21]: https://docs.datadoghq.com/fr/integrations/amazon_api_gateway/
[22]: https://docs.datadoghq.com/fr/integrations/amazon_app_runner
[23]: https://docs.datadoghq.com/fr/integrations/amazon_auto_scaling/
[24]: https://docs.datadoghq.com/fr/integrations/amazon_billing/
[25]: https://docs.datadoghq.com/fr/integrations/amazon_cloudfront/
[26]: https://docs.datadoghq.com/fr/integrations/amazon_codebuild/
[27]: https://docs.datadoghq.com/fr/integrations/amazon_codedeploy/
[28]: https://docs.datadoghq.com/fr/integrations/amazon_directconnect/
[29]: https://docs.datadoghq.com/fr/integrations/amazon_dynamodb/
[30]: https://docs.datadoghq.com/fr/integrations/amazon_ebs/
[31]: https://docs.datadoghq.com/fr/integrations/amazon_ec2/
[32]: https://docs.datadoghq.com/fr/integrations/amazon_ecs/
[33]: https://docs.datadoghq.com/fr/integrations/amazon_efs/
[34]: https://docs.datadoghq.com/fr/integrations/amazon_elasticache/
[35]: https://docs.datadoghq.com/fr/integrations/amazon_elasticbeanstalk/
[36]: https://docs.datadoghq.com/fr/integrations/amazon_elb/
[37]: https://docs.datadoghq.com/fr/integrations/amazon_emr/
[38]: https://docs.datadoghq.com/fr/integrations/amazon_es/
[39]: https://docs.datadoghq.com/fr/integrations/amazon_firehose/
[40]: https://docs.datadoghq.com/fr/integrations/amazon_fsx/
[41]: https://docs.datadoghq.com/fr/integrations/amazon_health/
[42]: https://docs.datadoghq.com/fr/integrations/amazon_iot/
[43]: https://docs.datadoghq.com/fr/integrations/amazon_kinesis/
[44]: https://docs.datadoghq.com/fr/integrations/amazon_kms/
[45]: https://docs.datadoghq.com/fr/integrations/amazon_lambda/
[46]: https://docs.datadoghq.com/fr/integrations/amazon_machine_learning/
[47]: https://docs.datadoghq.com/fr/integrations/amazon_mq/
[48]: https://docs.datadoghq.com/fr/integrations/amazon_ops_works/
[49]: https://docs.datadoghq.com/fr/integrations/amazon_polly/
[50]: https://docs.datadoghq.com/fr/integrations/amazon_rds/
[51]: https://docs.datadoghq.com/fr/integrations/amazon_rds_proxy/
[52]: https://docs.datadoghq.com/fr/integrations/amazon_redshift/
[53]: https://docs.datadoghq.com/fr/integrations/amazon_route53/
[54]: https://docs.datadoghq.com/fr/integrations/amazon_s3/
[55]: https://docs.datadoghq.com/fr/integrations/amazon_ses/
[56]: https://docs.datadoghq.com/fr/integrations/amazon_sns/
[57]: https://docs.datadoghq.com/fr/integrations/amazon_sqs/
[58]: https://docs.datadoghq.com/fr/integrations/amazon_vpc/
[59]: https://docs.datadoghq.com/fr/integrations/amazon_workspaces/
[60]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/service_checks.json
[61]: https://docs.datadoghq.com/fr/integrations/guide/aws-integration-troubleshooting/