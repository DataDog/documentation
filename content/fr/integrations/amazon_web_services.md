---
app_id: amazon-web-services
app_uuid: 45508037-7831-469d-80da-20241f00cbed
assets:
  dashboards:
    aws_advisor: assets/dashboards/aws_advisor.json
    aws_ebs: assets/dashboards/aws_ebs.json
    aws_event_bridge: assets/dashboards/aws_event_bridge.json
    aws_firehose: assets/dashboards/aws_firehose.json
    aws_overall: assets/dashboards/aws_overall.json
    aws_sns: assets/dashboards/aws_sns.json
    aws_sqs: assets/dashboards/aws_sqs.json
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check: aws.usage.call_count
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: !!int 10
    source_type_name: Amazon Web Services
  monitors:
    Integration Health Status: assets/monitors/aws_integration_status_monitor.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- cloud
- iot
- log collection
- event management
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_web_services
integration_id: amazon-web-services
integration_title: Amazon Web Services
integration_version: 
is_public: true
manifest_version: 2.0.0
name: amazon_web_services
public_title: Amazon Web Services
short_description: Amazon Web Services (AWS) est un ensemble de services web qui forment ensemble une plateforme de cloud computing.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Cloud
  - Category::IoT
  - Category::Log Collection
  - Category::Event Management
  - Offering::Integration
  configuration: README.md#Setup
  description: Amazon Web Services (AWS) est un ensemble de services web qui forment ensemble une plateforme de cloud computing.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-aws-control-plane-api-usage-metrics/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/aws-reinvent-2022-recap/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/iam-least-privilege/
  support: README.md#Support
  title: Amazon Web Services
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Associez Amazon Web Services (AWS) pour :

- Visualiser les mises à jour automatiques de statut AWS dans votre Events Explorer
- Obtenir des métriques CloudWatch pour les hosts EC2 sans installer l'Agent
- Taguer vos hosts EC2 avec des informations propres à EC2
- Visualiser les événements de maintenance EC2 planifiés dans votre flux
- Recueillir des métriques et des événements CloudWatch depuis de nombreux autres produits AWS
- Visualiser les alarmes CloudWatch dans votre Events Explorer

Pour profiter au plus vite de l'intégration AWS, consultez le [guide de prise en main d'AWS][1].

L'intégration Amazon Web Services de Datadog permet de recueillir les logs, les événements et [la plupart des métriques en provenance de CloudWatch][2] pour plus de [90 services AWS][3].

## Configuration

Choisissez l'une des méthodes suivantes pour intégrer vos comptes AWS dans Datadog et ainsi recueillir vos métriques, vos événements, vos traces et vos logs :

### Configuration automatique

  * **CloudFormation (idéal pour démarrer rapidement)**
      Pour configurer l'intégration AWS avec CloudFormation, consultez le [guide de prise en main d'AWS][1].

  * **Terraform**
      Pour configurer l'intégration AWS avec Terraform, consultez la section [Intégration AWS avec Terraform][4].

  * **Control Tower**
      Pour configurer l'intégration AWS lors du provisionnement d'un nouveau compte AWS avec la fonction [Account Factory de Control Tower][5], consultez le [guide de configuration de Control Tower][6] (en anglais).

  * **Configuration avec plusieurs comptes pour les organisations AWS**
      Pour configurer l'intégration AWS avec plusieurs comptes au sein d'une organisation AWS, consultez le [guide dédié][7].

### Configuration manuelle

   * **Délégation des rôles**
      Pour configurer l'intégration AWS manuellement avec la délégation des rôles, consultez le [guide de configuration manuelle][8].

   * **Clés d'accès (GovCloud ou Chine\* uniquement)**
      Pour configurer l'intégration AWS avec des clés d'accès, consultez le [guide de configuration manuelle][9].

      *\* Toute utilisation des Services Datadog dans (ou en connexion avec des environnements se situant au sein de) la Chine continentale est sujette à la remarque indiquée dans la section [Restricted Service Locations][10] de notre site web.*

{{% aws-permissions %}}

{{% aws-resource-collection %}}

## Collecte de logs

Il existe deux façons d'envoyer des logs de service AWS à Datadog :

- [Destination Amazon Data Firehose][11] : utilisez la destination Datadog dans votre flux de diffusion Amazon Data Firehose pour transmettre vos logs à Datadog. Il est conseillé de procéder de la même façon pour envoyer un volume très élevé de logs depuis CloudWatch.
- [Fonction Lambda du Forwarder][12] : déployez la fonction Lambda du Forwarder Datadog qui s'abonne aux compartiments S3 ou à vos groupes de logs CloudWatch. Transmettez ensuite vos logs à Datadog. Datadog vous conseille également d'utiliser cette méthode pour envoyer des logs depuis S3 ou depuis d'autres ressources ne prenant pas en charge la diffusion de données vers Amazon Data Firehose.

## Collecte de métriques

Il existe deux façons d'envoyer des métriques AWS à Datadog :

- [Interrogation des métriques][13] : l'intégration AWS contient une fonctionnalité d'interrogation d'API. Celle-ci effectue une analyse métrique par métrique de l'API CloudWatch afin d'extraire les données à envoyer à Datadog. De nouvelles métriques sont extraites toutes les 10 minutes en moyenne.
- [Flux de métriques avec Amazon Data Firehose][14] : vous pouvez utiliser les flux de métriques Amazon CloudWatch et Amazon Data Firehose pour visualiser vos métriques. **Remarque** : cette méthode implique une latence de deux à trois minutes, et requiert une configuration distincte.

Vous trouverez la liste complète des sous-intégrations disponibles sur la section [Facturation des intégrations AWS][3]. Nombre de ces intégrations sont installées par défaut lorsque Datadog détecte des données en provenance de votre compte AWS. Consultez la [page de facturation de l'intégration AWS][15] pour découvrir comment exclure certaines ressources et ainsi maîtriser les coûts.

## Collecte de ressources

Certains produits Datadog tirent parti d'informations relatives à la configuration de vos ressources AWS (tels que les compartiments S3, les snapshots RDS et les distributions CloudFront). Datadog récupère ces informations en effectuant des appels API en lecture seule vers votre compte AWS.

{{% aws-resource-collection %}}

### Types de ressources et autorisations 

Les sections suivantes répertorient les types de ressources collectés pour les différents produits Datadog, ainsi que les autorisations nécessaires pour permettre au rôle IAM Datadog de collecter les données en votre nom. Ajoutez ces autorisations à votre politique IAM **existante** d'intégration AWS (qui inclut la politique `SecurityAudit`).

{{% collapse-content title="Cloud Cost Management (CCM)" level="h4" expanded=false id="cloud-cost-management" %}}
{{% aws-resource-collection-cloud-cost-management %}}
{{% /collapse-content %}}

{{% collapse-content title="Cloudcraft" level="h4" expanded=false id="cloudcraft" %}}
{{% aws-resource-collection-cloudcraft %}}
{{% /collapse-content %}}

{{% collapse-content title= "Cloud Security Monitoring (CSM)" level="h4" expanded=false id="cloud-security-monitoring" %}}
{{% aws-resource-collection-cloud-security-monitoring %}}
{{% /collapse-content %}}

{{% collapse-content title="Network Performance Monitoring (NPM)" level="h4" expanded=false id="network-performance-monitoring" %}}
{{% aws-resource-collection-network-performance-monitoring %}}
{{% /collapse-content %}}

{{% collapse-content title= "Catalogue des ressources" level="h4" expanded=false id="resource-catalog" %}}
{{% aws-resource-collection-resource-catalog %}}
{{% /collapse-content %}}

#### Prochaines versions

Les autorisations listées ici correspondent aux ressources prévues pour être ajoutées dans les 30 prochains jours. Intégrez ces autorisations à votre politique IAM **existante** d'intégration AWS (avec la politique `SecurityAudit` attachée) pour bénéficier pleinement de la couverture et du suivi des ressources par Datadog.

{{% collapse-content title= "Autorisations pour les prochaines versions" level="h4" expanded=false id="upcoming-permissions" %}}
{{% aws-resource-collection-upcoming-permissions %}}
{{% /collapse-content %}}

### Cloud Security

#### Configuration

Si vous n'avez pas encore configuré l'intégration AWS pour votre compte AWS, effectuez le [processus de configuration][16] ci-dessus. Assurez-vous d'activer la sécurité cloud lorsque cela est mentionné.

**Remarque :** pour utiliser cette fonctionnalité, l'intégration AWS doit être configurée avec la **délégation des rôles**.

Pour ajouter Cloud Security à une intégration AWS existante, suivez les étapes ci-dessous pour activer la collecte de ressources.

1. Fournissez les autorisations nécessaires au rôle IAM Datadog en y associant la politique AWS gérée `SecurityAudit`. Vous pouvez trouver cette politique dans la [console AWS][17].

2. Suivez les étapes ci-dessous pour terminer la configuration sur la [page de l'intégration Datadog/AWS][18]. Vous pouvez également utiliser l'endpoint d'API pour la [mise à jour d'une intégration AWS][8].

   1. Sélectionnez le compte AWS pour lequel vous souhaitez activer la collecte de ressources.
   2. Dans l'onglet **Resource collection**, cliquez sur **Enable** à côté de Cloud Security. Vous êtes redirigé vers la page de configuration de Cloud Security, et une boîte de dialogue de configuration s'ouvre automatiquement pour le compte sélectionné.
   3. Dans la fenêtre de configuration, activez l'option **Enable Resource Scanning**.
   4. Cliquez sur **Done** pour terminer la configuration.

## Collecte d'alarmes

Vous pouvez envoyer des alarmes AWS CloudWatch à l'Events Explorer Datadog de deux façons différentes :

- Récupération d'alarmes : cette fonctionnalité est fournie par défaut avec l'intégration AWS et permet de récupérer les alarmes liées aux métriques par l'intermédiaire de l'API [DescribeAlarmHistory][19]. Si vous utilisez cette méthode, vos alarmes sont classées sous la source d'événements `Amazon Web Services`. **Remarque** : le crawler ne récupère pas les alarmes composites. 
- Rubrique SNS : pour visualiser toutes vos alarmes AWS CloudWatch dans votre Events Explorer, abonnez les alarmes à une rubrique SNS, puis transférez les messages SNS à Datadog. Pour découvrir comment recevoir des messages SNS en tant qu'événements dans Datadog, consultez la rubrique [Recevoir les messages de SNS][20]. Si vous utilisez cette méthode, vos alarmes sont classées sous la source d'événements `Amazon SNS`.

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_web_services" >}}


**Remarque** : vous pouvez activer la collecte de métriques personnalisées AWS, ainsi que celle de services pour lesquels Datadog ne propose pas d'intégration. Pour plus d'informations, consultez la [FAQ sur l'intégration AWS et CloudWatch][22].

### Événements

La collecte d'événements AWS se configure au niveau de chaque service AWS. Consultez la [documentation du service AWS pertinent][3] pour obtenir plus d'informations sur la collecte d'événements.

### Tags

Les tags suivants sont recueillis à l'aide de l'intégration AWS. **Remarque** : certains tags s'affichent uniquement pour des métriques spécifiques.

| Intégration            | Clés de tag Datadog                                                                                                                                                                                              |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Tous                    | `region`                                                                                                                                                                                                      |
| [API Gateway][23]      | `apiid`, `apiname`, `method`, `resource`, `stage`                                                                                                                                                             |
| [App Runner][24]      | `instance`, `serviceid`, `servicename`                                                                                                                                                                       |
| [Auto Scaling][25]    | `autoscalinggroupname`, `autoscaling_group`                                                                                                                                                                   |
| [Facturation][26]          | `account_id`, `budget_name`, `budget_type`, `currency`, `servicename`, `time_unit`                                                                                                                            |
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
| [SES][57]             | Les clés de tag sont personnalisées dans AWS.                                                                                                                                                                               |
| [SNS][58]              | `topicname`                                                                                                                                                                                                   |
| [SQS][59]              | `queuename`                                                                                                                                                                                                   |
| [VPC][60]              | `nategatewayid`, `vpnid`, `tunnelipaddress`                                                                                                                                                                   |
| [WorkSpaces][61]       | `directoryid`, `workspaceid`                                                                                                                                                                                  |

### Checks de service
{{< get-service-checks-from-git "amazon_web_services" >}}


## Dépannage

Consultez la section [Dépannage de l'intégration AWS][63] pour résoudre les problèmes liés à l'intégration AWS.

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :
- [Surveiller les métriques d'utilisation des API de plan de contrôle AWS dans Datadog][64]
- [Les points forts de l'édition 2022 d'AWS re:Invent][65]
- [Bonnes pratiques pour créer des politiques IAM AWS à privilèges minimaux][66]


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

