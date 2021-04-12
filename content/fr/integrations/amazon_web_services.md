---
aliases:
  - /fr/integrations/aws/
  - /fr/logs/aws
  - /fr/integrations/faq/revoking-aws-keys-and-enabling-role-delegation-for-the-datadog-aws-integration/
  - /fr/integrations/faq/additional-aws-metrics-min-max-sum
  - /fr/integrations/faq/why-am-i-only-seeing-the-average-values-of-my-custom-aws-cloudwatch-metrics/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Intégrez vos services AWS à Datadog.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_web_services/'
git_integration_title: amazon_web_services
has_logo: true
integration_title: AWS
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_web_services
public_title: Intégration Datadog/AWS
short_description: Intégrez vos services AWS à Datadog.
version: '1.0'
---
## Présentation

Associez Amazon Web Services (AWS) pour :

- Consulter des mises à jour automatiques de statut AWS dans votre flux
- Obtenir des métriques CloudWatch pour les hosts EC2 sans installer l'Agent
- Appliquer un tag à vos hosts EC2 comportant des informations spécifiques à EC2 (p. ex., leur zone de disponibilité)
- Consulter les événements de maintenance EC2 planifiés dans votre flux
- Recueillir des métriques et des événements CloudWatch depuis de nombreux autres produits AWS

<div class="alert alert-warning">
L'intégration Amazon de Datadog est conçue pour recueillir <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html">TOUTES les métriques en provenance de CloudWatch</a>. Datadog s'efforce de mettre régulièrement à jour sa documentation afin d'inclure chaque sous-intégration. Toutefois, les métriques et les services proposés par les différents services cloud étant en permanente évolution, il est possible que la liste ne soit pas actuelle.
</div>

| Intégration                             | Description                                                                            |
| --------------------------------------- | -------------------------------------------------------------------------------------- |
| [API Gateway][1]                        | Créez, publiez, maintenez et sécurisez des API                                             |
| [Appstream][2]                          | Streaming d'applications entièrement géré sur AWS                                             |
| [AppSync][3]                            | Un service GraphQL offrant des fonctionnalités de synchronisation des données en temps réel et de programmation hors ligne |
| [Athena][4]                             | Service de requêtes interactif sans serveur                                                   |
| [Autos Scaling][5]                        | Configuration du dimensionnement d'EC2                                                                     |
| [Billing][6]                            | Facturation et budgets                                                                    |
| [CloudFront][7]                         | Réseau de diffusion de contenu local                                                         |
| [CloudHSM][8]                           | Module de sécurité matérielle (HSM) géré                                                 |
| [CloudSearch][9]                        | Accès aux fichiers de log et aux appels d'API AWS                                                  |
| [CloudTrail][10]                        | Accès aux fichiers de log et aux appels d'API AWS                                                  |
| [CodeBuild][11]                         | Service de génération entièrement géré                                                            |
| [CodeDeploy][12]                        | Automatisation des déploiements de code                                                              |
| [Cognito][13]                           | Inscription et connexion utilisateur sécurisées                                                        |
| [Connect][14]                           | Un centre de contacts clients fonctionnant en libre-service et basé sur le cloud                                     |
| [Direct Connect][15]                    | Connexion réseau dédiée à AWS                                                    |
| [DMS][16]                               | Service de migration de base de données                                                             |
| [DocumentDB][17]                        | Base de données compatible avec MongoDB                                                            |
| [DynamoDB][18]                         | Base de données NoSQL                                                                         |
| [EBS (Elastic Block Store)][19]         | Volumes de stockage permanent par bloc                                                 |
| [EC2 (Elastic Cloud Compute)][20]       | Capacité de calcul redimensionnable dans le cloud                                                |
| [EC2 Spot][21]                          | Exploitation des capacités inutilisées d'EC2                                                  |
| [ECS (Elastic Container Service)][22]   | Service de gestion de conteneurs prenant en charge les conteneurs Docker                           |
| [EFS (Elastic File System)][23]         | Stockage de fichiers partagés                                                                    |
| [EKS][24]                               | Elastic Container Service pour Kubernetes                                               |
| [Elastic Transcoder][25]                | Transcodage de fichiers multimédias et de vidéos dans le cloud                                               |
| [ElastiCache][26]                       | Cache en mémoire dans le cloud                                                           |
| [Elastic Beanstalk][27]                 | Service pour le déploiement et le dimensionnement d'applications et de services Web                        |
| [ELB (Elastic Load Balancing)][28]      | Distribution du trafic entrant d'applications sur plusieurs instances Amazon EC2          |
| [EMR (Elastic Map Reduce)][29]          | Traitement de données avec Hadoop                                                           |
| [ES (Elasticsearch)][30]                | Déploiement, utilisation et mise à l'échelle des clusters Elasticsearch                                      |
| [Firehose][31]                          | Capture et chargement de données de streaming                                                        |
| [Gamelift][32]                          | Hébergement de serveurs de jeux dédiés                                                          |
| [Glue][33]                              | Extraction, transformation et chargement de données pour l'analyse                                        |
| [GuardDuty][34]                         | Détection des menaces intelligente                                                           |
| [Health][35]                            | Visibilité sur l'état de vos ressources, services et comptes AWS                |
| [Inspector][36]                         | Évaluation automatisée de la sécurité                                                          |
| [IOT (Internet of Things)][37]          | Connexion d'appareils IoT à des services cloud                                                |
| [Kinesis][38]                           | Service de traitement en temps réel de grands flux de données distribués                    |
| [KMS (Key Management Service)][39]      | Création et contrôle des clés de chiffrement                                                     |
| [Lambda][40]                            | Service de calcul sans serveur                                                                   |
| [Lex][41]                               | Création de bots de discussion                                                                |
| [Machine Learning][42]                  | Création des modèles d'apprentissage automatique                                                         |
| [MediaConnect][43]                      | Transport vidéo en direct                                                               |
| [MediaConvert][44]                      | Traitement vidéo pour la diffusion et la distribution multi-écran                                |
| [MediaPackage][45]                      | Préparation et protection de vidéos en vue de leur diffusion sur Internet                               |
| [MediaTailor][46]                       | Insertion évolutive de publicités côté serveur                                                      |
| [MQ][47]                                | Agent de message géré pour ActiveMQ                                                    |
| [Managed Streaming for Kafka][48]       | Conception et exécution d'applications qui utilisent Kafka pour le traitement des données de streaming             |
| [Passerelle NAT][49]                       | Autoriser les instances d'un sous-réseau privé à se connecter à Internet ou à d'autres services AWS  |
| [Neptune][50]                           | Service de base de données orienté graph fiable et rapide conçu pour le cloud                                      |
| [OpsWorks][51]                          | Gestion de la configuration                                                               |
| [Polly][52]                             | Service de synthèse vocale                                                                    |
| [RDS (Relational Database Service)][53] | Base de données relationnelle dans le cloud                                                       |
| [Redshift][54]                          | Solution d'entrepôt de données                                                                |
| [Rekognition][55]                       | Analyse d'images et de vidéos pour les applications                                              |
| [Route 53][56]                          | Gestion de noms de domaine et de trafic avec surveillance de la disponibilité                                |
| [S3 (Simple Storage Service)][57]       | Service de stockage dans le cloud hautement disponible et évolutif                                    |
| [SageMaker][58]                         | Algorithmes et modèles d'apprentissage automatique                                                 |
| [SES (Simple Email Service)][59]        | Service économique d'envoi d'e-mails                                    |
| [SNS (Simple Notification System)][60]  | Alertes et notifications                                                               |
| [SQS (Simple Queue Service)][61]        | Service de file d'attente de messagerie                                                                |
| [Storage Gateway][62]                   | Stockage cloud hybride                                                                   |
| [SWF (Simple Workflow Service)][63]     | Gestion de workflows dans le cloud                                                              |
| [VPC (Virtual Private Cloud)][64]       | Lancement de ressources AWS dans un réseau virtuel                                            |
| [Web Application Firewall (WAF)][65]    | Protection des applications Web contre les failles Web les plus courantes                                      |
| [WorkSpaces][66]                        | Service de bureau sécurisé                                                       |
| [X-Ray][67]                             | Création de traces pour les applications distribuées                                                   |

## Implémentation

La configuration de l'intégration de Datadog à Amazon Web Services nécessite de configurer la délégation de rôles à l'aide d'AWS IAM. Pour mieux comprendre le principe de délégation des rôles, reportez-vous au [guide des bonnes pratiques pour AWS IAM][68].

### Délégation des rôles

Choisissez la méthode que vous souhaitez utiliser pour configurer le rôle AWS nécessaire. Nous vous conseillons d'utiliser CloudFormation.

{{< tabs >}}
{{% tab "Méthode automatique avec CloudFormation" %}}

1. Ouvrez le [carré d'intégration AWS dans Datadog][1].
2. Depuis l'onglet _Configuration_, choisissez **Automatically Using CloudFormation**. Si vous avez déjà un compte AWS associé, commencez par cliquer sur **Add another account**.
4. Connectez-vous à la console AWS.
5. Depuis la page CloudFormation, créez une nouvelle pile et spécifiez votre [clé d'API Datadog][2].
6. Mettez à jour le [carré d'intégration Datadog/AWS][1] en saisissant le [nom du rôle IAM et l'ID du compte][3] utilisé pour créer la pile CloudFormation.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html
{{% /tab %}}
{{% tab "Méthode manuelle" %}}

#### AWS

1. Créez un nouveau rôle dans la [console IAM d'AWS][1].
2. Sélectionnez le type de rôle `Another AWS account`.
3. Pour Account ID, saisissez `464622532012` (identifiant de compte Datadog). Cela signifie que vous accordez à Datadog un accès en lecture seule à vos données AWS.
4. Sélectionnez `Require external ID` et saisissez l'ID généré [dans le carré d'intégration AWS][2]. Assurez-vous de ne pas cocher **Require MFA**. _Pour en savoir plus sur l'External ID, consultez [ce document du guide de l'utilisateur d'IAM][3]_.
5. Cliquez sur `Next: Permissions`.
6. Si vous avez déjà créé la stratégie, sélectionnez-la sur cette page, puis passez à l'étape 12. Si ce n'est pas le cas, cliquez sur `Create Policy` afin d'ouvrir une nouvelle fenêtre.
7. Sélectionnez l'onglet `JSON`. Afin de profiter de toutes les intégrations AWS proposées par Datadog, utilisez l'[extrait de stratégie](#strategie-iam-aws-datadog) sous la zone de texte. Étant donné que d'autres composants sont ajoutés à une intégration, ces autorisations peuvent évoluer.
8. Cliquez sur `Review policy`.
9. Nommez la stratégie `DatadogAWSIntegrationPolicy` ou utilisez le nom de votre choix, et saisissez une description pertinente.
10. Cliquez sur `Create policy`. Vous pouvez ensuite fermer cette fenêtre.
11. Depuis la fenêtre « Create role », actualisez la liste des stratégies et sélectionnez celle que vous venez de créer.
12. Cliquez sur `Next: Review`.
13. Saisissez le nom `DatadogAWSIntegrationRole` ou un nom similaire pour le rôle, ainsi qu'une description pertinente. Cliquez sur `Create role`.

**Étape facultative** : si vous utilisez Terraform, configurez votre stratégie IAM Datadog à l'aide de [l'intégration AWS avec Terraform][4].

#### Datadog

1. Ouvrez le [carré d'intégration AWS][2].
2. Sélectionnez l'onglet **Role Delegation**, puis cliquez sur **Manually**.
3. Saisissez votre ID de compte AWS **sans tiret**, p. ex. `123456789012`. Votre ID de compte est indiqué dans l'ARN du rôle créé durant l'[installation de l'intégration AWS](#installation).
4. Saisissez le nom du rôle créé. **Remarque** : le nom de rôle saisi dans le carré d'intégration est sensible à la casse et doit correspondre parfaitement au nom du rôle créé sur AWS.
5. Depuis le côté gauche de la fenêtre, choisissez les services pour lesquels vous souhaitez récupérer des métriques.
6. Si vous le souhaitez, ajoutez des tags à l'ensemble des hosts et des métriques.
7. Vous pouvez surveiller un sous-ensemble d'instances EC2 en saisissant les tags AWS correspondants dans la zone de texte `to hosts with tag`. **Remarque :** cela s'applique également aux volumes EBS associés à une instance.
8. Vous pouvez surveiller un sous-ensemble de Lambdas en saisissant les tags AWS correspondants dans la zone de texte `to Lambdas with tag`.
9. Cliquez sur **Install Integration**.

#### Stratégie IAM AWS Datadog

Les autorisations énumérées ci-dessous sont incluses dans le document de stratégie à l'aide de wildcards comme `List*` et `Get*`. Si vous avez besoin de stratégies strictes, utilisez les noms d'action complets indiqués et consultez la documentation sur l'API Amazon pour les services requis.

##### Toutes les autorisations
Si vous ne souhaitez pas accorder toutes les autorisations à la fois, nous vous conseillons d'utiliser au strict minimum les stratégies **AmazonEC2ReadOnlyAccess** et **CloudWatchReadOnlyAccess**. Pour en savoir plus sur les autorisations, consultez la section [Autorisations de base](#autorisations-de-base).

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "apigateway:GET",
                "autoscaling:Describe*",
                "budgets:ViewBudget",
                "cloudfront:GetDistributionConfig",
                "cloudfront:ListDistributions",
                "cloudtrail:DescribeTrails",
                "cloudtrail:GetTrailStatus",
                "cloudwatch:Describe*",
                "cloudwatch:Get*",
                "cloudwatch:List*",
                "codedeploy:List*",
                "codedeploy:BatchGet*",
                "directconnect:Describe*",
                "dynamodb:List*",
                "dynamodb:Describe*",
                "ec2:Describe*",
                "ecs:Describe*",
                "ecs:List*",
                "elasticache:Describe*",
                "elasticache:List*",
                "elasticfilesystem:DescribeFileSystems",
                "elasticfilesystem:DescribeTags",
                "elasticfilesystem:DescribeAccessPoints",
                "elasticloadbalancing:Describe*",
                "elasticmapreduce:List*",
                "elasticmapreduce:Describe*",
                "es:ListTags",
                "es:ListDomainNames",
                "es:DescribeElasticsearchDomains",
                "health:DescribeEvents",
                "health:DescribeEventDetails",
                "health:DescribeAffectedEntities",
                "kinesis:List*",
                "kinesis:Describe*",
                "lambda:GetPolicy",
                "lambda:List*",
                "logs:DeleteSubscriptionFilter",
                "logs:DescribeLogGroups",
                "logs:DescribeLogStreams",
                "logs:DescribeSubscriptionFilters",
                "logs:FilterLogEvents",
                "logs:PutSubscriptionFilter",
                "logs:TestMetricFilter",
                "rds:Describe*",
                "rds:List*",
                "redshift:DescribeClusters",
                "redshift:DescribeLoggingStatus",
                "route53:List*",
                "s3:GetBucketLogging",
                "s3:GetBucketLocation",
                "s3:GetBucketNotification",
                "s3:GetBucketTagging",
                "s3:ListAllMyBuckets",
                "s3:PutBucketNotification",
                "ses:Get*",
                "sns:List*",
                "sns:Publish",
                "sqs:ListQueues",
                "states:ListStateMachines",
                "states:DescribeStateMachine",
                "support:*",
                "tag:GetResources",
                "tag:GetTagKeys",
                "tag:GetTagValues",
                "xray:BatchGetTraces",
                "xray:GetTraceSummaries"
            ],
            "Effect": "Allow",
            "Resource": "*"
        }
    ]
}
```

##### Autorisations de base

L'intégration Datadog/AWS de base récupère des données à partir d'AWS CloudWatch. Votre document de stratégie doit au minimum autoriser les actions suivantes :

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "cloudwatch:Get*",
                "cloudwatch:List*",
                "ec2:Describe*",
                "support:*",
                "tag:GetResources",
                "tag:GetTagKeys",
                "tag:GetTagValues"
            ],
            "Effect": "Allow",
            "Resource": "*"
        }
    ]
}
```

| Autorisation AWS             | Description                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| `cloudwatch:ListMetrics`   | Répertorie les métriques CloudWatch disponibles.                                                       |
| `cloudwatch:GetMetricData` | Récupère des points de données pour une métrique donnée.                                                        |
| `support:*`               | Ajoute des métriques à propos des limites de service.<br>Nécessite un accès complet en raison des [limites d'AWS][5]. |
| `tag:getResources`         | Récupère des tags personnalisés en fonction du type de ressource.                                                            |
| `tag:getTagKeys`           | Récupère des clés de tag selon les régions d'un compte AWS.                                                |
| `tag:getTagValues`         | Récupère les valeurs de tag selon les régions d'un compte AWS.                                              |

L'API Resource Group Tagging vise notamment à réduire le nombre d'appels API requis pour recueillir des tags personnalisés. Pour en savoir plus, consultez la documentation relative aux [stratégies sur les tags][6] sur le site Web d'AWS.

[1]: https://console.aws.amazon.com/iam/home#/roles
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[4]: https://docs.datadoghq.com/fr/integrations/faq/aws-integration-with-terraform
[5]: https://docs.aws.amazon.com/awssupport/latest/user/Welcome.html#trustedadvisorsection
[6]: http://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/Welcome.html
{{% /tab %}}
{{< /tabs >}}

### GovCloud et Chine

1. Ouvrez le [carré d'intégration AWS][69].
2. Sélectionnez l'onglet **Access Keys (GovCloud or China Only)**.
3. Saisissez votre clé d'accès et votre clé de secret AWS. **Seules les clés d'accès et de secret pour GovCloud et la Chine sont acceptées.**
4. Depuis le côté gauche de la fenêtre, choisissez les services pour lesquels vous souhaitez récupérer des métriques.
5. Si vous le souhaitez, ajoutez des tags à l'ensemble des hosts et des métriques.
6. Vous pouvez surveiller un sous-ensemble d'instances EC2 en saisissant les tags AWS correspondants dans la zone de texte `to hosts with tag`. **Remarque :** cela s'applique également aux volumes EBS associés à une instance.
7. Vous pouvez surveiller un sous-ensemble de Lambdas en saisissant les tags AWS correspondants dans la zone de texte `to Lambdas with tag`.
8. Cliquez sur **Install Integration**.

## Collecte de logs

Il existe deux façons d'envoyer des logs de service AWS à Datadog :

- [Destination Kinesis Firehose][70] : utilisez la destination Datadog dans votre flux de diffusion Kinesis Firehose pour transmettre vos logs à Datadog
- [Cloudformation][71] : déployez la fonction Lambda Datadog qui est abonnée aux compartiments S3 ou au groupe de logs CloudWatch et transmettez vos logs à Datadog

Nous vous conseillons fortement d'utiliser la destination Kinesis Firehose lorsque vous devez envoyer vos logs à **plusieurs destinations différentes**. En effet, si les groupes de logs CloudWatch sont limités à un seul abonnement, ce n'est pas le cas des flux Kinesis. Après avoir abonné le flux Kinesis aux groupes de logs, vous pouvez abonner plusieurs services à ce flux afin de tous leur transmettre les données de logs.


## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_web_services" >}}


### Événements

Vous pouvez configurer la collecte d'événements AWS pour chaque service AWS. Consultez la documentation des différents services AWS pour en savoir plus sur la collecte d'événements.

### Tag

Les tags suivants sont recueillis à partir des intégrations AWS. **Remarque** : certains tags s'affichent uniquement pour des métriques spécifiques.

| Intégration            | Clés de tag Datadog                                                                                                                                                                                              |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Toutes                    | `region`                                                                                                                                                                                                      |
| [API Gateway][1]      | `apiid`, `apiname`, `method`, `resource`, `stage`                                                                                                                                                             |
| [Auto Scaling][5]    | `autoscalinggroupname`, `autoscaling_group`                                                                                                                                                                   |
| [Billing][6]          | `account_id`, `budget_name`, `budget_type`, `currency`, `servicename`, `time_unit`                                                                                                                            |
| [CloudFront][7]       | `distributionid`                                                                                                                                                                                              |
| [CodeBuild][11]              | `project_name`                                                                                                                                                                                                |
| [CodeDeploy][12]       | `application`, `creator`, `deployment_config`, `deployment_group`, `deployment_option`, `deployment_type`, `status`                                                                                           |
| [DirectConnect][15]    | `connectionid`                                                                                                                                                                                                |
| [DynamoDB][18]         | `globalsecondaryindexname`, `operation`, `streamlabel`, `tablename`                                                                                                                                           |
| [EBS][19]              | `volumeid`, `volume-name`, `volume-type`                                                                                                                                                                      |
| [EC2][20]              | `autoscaling_group`, `availability-zone`, `image`, `instance-id`, `instance-type`, `kernel`, `name`, `security_group_name`                                                                                    |
| [ECS][22]              | `clustername`, `servicename`, `instance_id`                                                                                                                                                                   |
| [EFS][24]              | `filesystemid`                                                                                                                                                                                                |
| [ElastiCache][]      | `cachenodeid`, `cache_node_type`, `cacheclusterid`, `cluster_name`, `engine`, `engine_version`, `prefered_availability-zone`, `replication_group`                                                             |
| [ElasticBeanstalk][27] | `environmentname`, `enviromentid`                                                                                                                                                                             |
| [ELB][28]              | `availability-zone`, `hostname`, `loadbalancername`, `name`, `targetgroup`                                                                                                                                    |
| [EMR][29]              | `cluster_name`, `jobflowid`                                                                                                                                                                                   |
| [ES][30]               | `dedicated_master_enabled`, `ebs_enabled`, `elasticsearch_version`, `instance_type`, `zone_awareness_enabled`                                                                                                 |
| [Firehose][31]         | `deliverystreamname`                                                                                                                                                                                          |
| [Health][35]           | `event_category`, `status`, `service`                                                                                                                                                                         |
| [IoT][37]              | `actiontype`, `protocol`, `rulename`                                                                                                                                                                          |
| [Kinesis][38]          | `streamname`, `name`, `state`                                                                                                                                                                                 |
| [KMS][39]              | `keyid`                                                                                                                                                                                                       |
| [Lambda][40]           | `functionname`, `resource`, `executedversion`, `memorysize`, `runtime`                                                                                                                                        |
| [Machine Learning][42] | `mlmodelid`, `requestmode`                                                                                                                                                                                    |
| [MQ][47]               | `broker`, `queue`, `topic`                                                                                                                                                                                    |
| [OpsWorks][51]         | `stackid`, `layerid`, `instanceid`                                                                                                                                                                            |
| [Polly][52]            | `operation`                                                                                                                                                                                                   |
| [RDS][53]              | `auto_minor_version_upgrade`, `dbinstanceclass`, `dbclusteridentifier`, `dbinstanceidentifier`, `dbname`, `engine`, `engineversion`, `hostname`, `name`, `publicly_accessible`, `secondary_availability-zone` |
| [Redshift][54]       | `clusteridentifier`, `latency`, `nodeid`, `service_class`, `stage`, `wlmid`                                                                                                                                   |
| [Route 53][56]        | `healthcheckid`                                                                                                                                                                                               |
| [S3][57]             | `bucketname`, `filterid`, `storagetype`                                                                                                                                                                       |
| [SES][59]             | Les clés de tag sont personnalisées dans AWS.                                                                                                                                                                               |
| [SNS][60]              | `topicname`                                                                                                                                                                                                   |
| [SQS][61]              | `queuename`                                                                                                                                                                                                   |
| [VPC][64]              | `nategatewayid`, `vpnid`, `tunnelipaddress`                                                                                                                                                                   |
| [WorkSpaces][66]       | `directoryid`, `workspaceid`                                                                                                                                                                                  |

## Dépannage

### Écart entre vos données dans CloudWatch et Datadog

Il est important de tenir compte des deux distinctions suivantes :

1. Pour les counters AWS, un graphique défini sur « sum » « 1minute » affiche le nombre total d'occurrences en l'espace d'une minute, soit le taux par minute. Datadog affiche les données brutes à partir des valeurs AWS normalisées par seconde, peu importe l'intervalle sélectionné dans AWS. Cela explique pourquoi la valeur affichée dans Datadog peut être plus faible.
2. Les valeurs minimales, maximales et moyennes n'ont généralement pas la même signification dans AWS et dans Datadog. Dans AWS, les latences moyenne, minimale et maximale correspondent à trois métriques distinctes recueillies. Lorsque Datadog récupère des métriques à partir d'AWS CloudWatch, la latence moyenne est transmise sous la forme de séries temporelles distinctes par ELB. Dans Datadog, lorsque vous sélectionnez les valeurs « min », « max » ou « avg », vous définissez les critères de rassemblement de séries temporelles. Par exemple, si vous cherchez à obtenir `system.cpu.idle` sans appliquer de filtre, une série est envoyée pour chaque host qui renvoie cette métrique. Ces séries doivent être combinées pour être représentées graphiquement. À l'inverse, si vous cherchez à obtenir `system.cpu.idle` pour un seul host, aucune agrégation n'est nécessaire. Les valeurs maximale et moyenne sont identiques.

### Métriques en retard

Lorsque vous utilisez l'intégration AWS, Datadog récupère vos métriques via l'API CloudWatch. Il est possible que les données des métriques AWS accusent un léger retard, en raison des contraintes liées à l'API.

Pour commencer, l'API CloudWatch propose uniquement une analyse métrique par métrique afin d'extraire des données. Les API CloudWatch prévoient une limite de débit qui varie en fonction des informations d'authentification, de la région et du service. Les métriques sont transmises par AWS en fonction du niveau du compte. Par exemple, si vous payez pour des « métriques détaillées » dans AWS, vous y avez accès plus rapidement. Ce niveau de service pour les métriques détaillées s'applique également à la granularité. Ainsi, certaines métriques sont transmises toutes les minutes, tandis que d'autres sont envoyées toutes les cinq minutes.

Datadog vous permet de hiérarchiser certaines métriques d'un compte afin de les récupérer en priorité, en fonction de certaines circonstances. Contactez [l'assistance Datadog][73] pour en savoir plus.

Pour obtenir des métriques en temps quasi-réel, installez l'Agent Datadog sur le host. Pour en savoir plus, consultez l'article de blog de Datadog intitulé [Don't fear the Agent: Agent-based monitoring][74] (en anglais).

### Métriques manquantes

L'API CloudWatch renvoie uniquement les métriques avec des points de données. Ainsi, si un ELB ne possède aucune instance liée, aucune métrique associée à cet ELB n'apparaît dans Datadog.

### Nombre aws.elb.healthy_host_count incorrect

Lorsque l'option d'équilibrage des charges entre zones est activée sur un ELB, toutes les instances liées à cet ELB font partie de toutes les zones de disponibilité (pour CloudWatch). Ainsi, si vous possédez deux instances dans 1a et trois dans ab, la métrique affiche cinq instances par zone de disponibilité.
Puisque cela peut s'avérer contre-intuitif, nous avons ajouté de nouvelles métriques, **aws.elb.healthy_host_count_deduped** et **aws.elb.un_healthy_host_count_deduped**, qui affichent le nombre d'instances saines et non saines par zone de disponibilité, que vous ayez activé ou non l'option d'équilibrage des charges entre zones.

### Hosts dupliqués lors de l'installation de l'Agent

Lors de l'installation de l'Agent sur un host AWS, il est possible que des hosts soient dupliqués pendant quelques heures sur la page d'infrastructure si vous avez défini manuellement le hostname dans la configuration de l'Agent. Ces doublons disparaîtront après quelques heures et ne seront pas pris en compte pour la facturation.

[1]: https://docs.datadoghq.com/fr/integrations/amazon_api_gateway/
[2]: https://docs.datadoghq.com/fr/integrations/amazon_appstream/
[3]: https://docs.datadoghq.com/fr/integrations/amazon_appsync/
[4]: https://docs.datadoghq.com/fr/integrations/amazon_athena/
[5]: https://docs.datadoghq.com/fr/integrations/amazon_auto_scaling/
[6]: https://docs.datadoghq.com/fr/integrations/amazon_billing/
[7]: https://docs.datadoghq.com/fr/integrations/amazon_cloudfront/
[8]: https://docs.datadoghq.com/fr/integrations/amazon_cloudhsm/
[9]: https://docs.datadoghq.com/fr/integrations/amazon_cloudsearch/
[10]: https://docs.datadoghq.com/fr/integrations/amazon_cloudtrail/
[11]: https://docs.datadoghq.com/fr/integrations/amazon_codebuild/
[12]: https://docs.datadoghq.com/fr/integrations/amazon_codedeploy/
[13]: https://docs.datadoghq.com/fr/integrations/amazon_cognito/
[14]: https://docs.datadoghq.com/fr/integrations/amazon_connect/
[15]: https://docs.datadoghq.com/fr/integrations/amazon_directconnect/
[16]: https://docs.datadoghq.com/fr/integrations/amazon_dms/
[17]: https://docs.datadoghq.com/fr/integrations/amazon_documentdb/
[18]: https://docs.datadoghq.com/fr/integrations/amazon_dynamodb/
[19]: https://docs.datadoghq.com/fr/integrations/amazon_ebs/
[20]: https://docs.datadoghq.com/fr/integrations/amazon_ec2/
[21]: https://docs.datadoghq.com/fr/integrations/amazon_ec2_spot/
[22]: https://docs.datadoghq.com/fr/integrations/amazon_ecs/
[23]: https://docs.datadoghq.com/fr/integrations/amazon_efs/
[24]: https://docs.datadoghq.com/fr/integrations/amazon_eks/
[25]: https://docs.datadoghq.com/fr/integrations/amazon_elastic_transcoder/
[26]: https://docs.datadoghq.com/fr/integrations/amazon_elasticache/
[27]: https://docs.datadoghq.com/fr/integrations/amazon_elasticbeanstalk/
[28]: https://docs.datadoghq.com/fr/integrations/amazon_elb/
[29]: https://docs.datadoghq.com/fr/integrations/amazon_emr/
[30]: https://docs.datadoghq.com/fr/integrations/amazon_es/
[31]: https://docs.datadoghq.com/fr/integrations/amazon_firehose/
[32]: https://docs.datadoghq.com/fr/integrations/amazon_gamelift/
[33]: https://docs.datadoghq.com/fr/integrations/amazon_glue/
[34]: https://docs.datadoghq.com/fr/integrations/amazon_guardduty/
[35]: https://docs.datadoghq.com/fr/integrations/amazon_health/
[36]: https://docs.datadoghq.com/fr/integrations/amazon_inspector/
[37]: https://docs.datadoghq.com/fr/integrations/amazon_iot/
[38]: https://docs.datadoghq.com/fr/integrations/amazon_kinesis/
[39]: https://docs.datadoghq.com/fr/integrations/amazon_kms/
[40]: https://docs.datadoghq.com/fr/integrations/amazon_lambda/
[41]: https://docs.datadoghq.com/fr/integrations/amazon_lex/
[42]: https://docs.datadoghq.com/fr/integrations/amazon_machine_learning/
[43]: https://docs.datadoghq.com/fr/integrations/amazon_mediaconnect/
[44]: https://docs.datadoghq.com/fr/integrations/amazon_mediaconvert/
[45]: https://docs.datadoghq.com/fr/integrations/amazon_mediapackage/
[46]: https://docs.datadoghq.com/fr/integrations/amazon_mediatailor/
[47]: https://docs.datadoghq.com/fr/integrations/amazon_mq/
[48]: https://docs.datadoghq.com/fr/integrations/amazon_msk/
[49]: https://docs.datadoghq.com/fr/integrations/amazon_nat_gateway/
[50]: https://docs.datadoghq.com/fr/integrations/amazon_neptune/
[51]: https://docs.datadoghq.com/fr/integrations/amazon_ops_works/
[52]: https://docs.datadoghq.com/fr/integrations/amazon_polly/
[53]: https://docs.datadoghq.com/fr/integrations/amazon_rds/
[54]: https://docs.datadoghq.com/fr/integrations/amazon_redshift/
[55]: https://docs.datadoghq.com/fr/integrations/amazon_rekognition/
[56]: https://docs.datadoghq.com/fr/integrations/amazon_route53/
[57]: https://docs.datadoghq.com/fr/integrations/amazon_s3/
[58]: https://docs.datadoghq.com/fr/integrations/amazon_sagemaker/
[59]: https://docs.datadoghq.com/fr/integrations/amazon_ses/
[60]: https://docs.datadoghq.com/fr/integrations/amazon_sns/
[61]: https://docs.datadoghq.com/fr/integrations/amazon_sqs/
[62]: https://docs.datadoghq.com/fr/integrations/amazon_storage_gateway/
[63]: https://docs.datadoghq.com/fr/integrations/amazon_swf/
[64]: https://docs.datadoghq.com/fr/integrations/amazon_vpc/
[65]: https://docs.datadoghq.com/fr/integrations/amazon_waf/
[66]: https://docs.datadoghq.com/fr/integrations/amazon_workspaces/
[67]: https://docs.datadoghq.com/fr/integrations/amazon_xray/
[68]: http://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles
[69]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[70]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[71]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[72]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/amazon_web_services_metadata.csv
[73]: https://docs.datadoghq.com/fr/help/
[74]: http://www.datadoghq.com/blog/dont-fear-the-agent