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

* Consulter des mises à jour automatiques de statut AWS dans votre flux
* Obtenir des métriques CloudWatch pour les hosts EC2 sans installer l'Agent
* Appliquer un tag à vos hosts EC2 comportant des informations spécifiques à EC2 (p. ex., leur zone de disponibilité)
* Consulter les événements de maintenance EC2 planifiés dans votre flux
* Recueillir des métriques et des événements CloudWatch depuis de nombreux autres produits AWS

Les intégrations connexes comprennent :

| Intégration                             | Description                                                                            |
|-----------------------------------------|----------------------------------------------------------------------------------------|
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

### Installation

La configuration de l'intégration de Datadog à Amazon Web Services nécessite la configuration de la délégation de rôles à l'aide d'AWS IAM. Pour mieux comprendre
le principe de délégation des rôles, reportez-vous au [guide des bonnes pratiques pour AWS IAM][68].

<div class="alert alert-warning">
Les régions GovCloud et Chine ne prennent actuellement pas en charge la délégation de rôle IAM. Si vous effectuez un déploiement dans ces régions, passez directement à la <a href="#configuration">section Configuration</a> ci-dessous.
</div>

1. Créez un rôle dans la [console IAM][69] d'AWS.
2. Sélectionnez le type de rôle `Another AWS account`.
3. Pour Account ID, saisissez `464622532012` (identifiant de compte Datadog). Cela signifie que vous accordez à Datadog un accès en lecture seule à vos données AWS.
4. Sélectionnez `Require external ID` et saisissez l'ID généré [dans l'application Datadog][70]. Assurez-vous de ne pas cocher **Require MFA**. *Pour en savoir plus sur l'External ID, consultez [ce document du guide de l'utilisateur d'IAM][71]*.
5. Cliquez sur `Next: Permissions`.
6. Si vous avez déjà créé la stratégie, sélectionnez-la sur cette page, puis passez à l'étape 12. Si ce n'est pas le cas, cliquez sur `Create Policy` afin d'ouvrir une nouvelle fenêtre.
7. Sélectionnez l'onglet `JSON`. Afin de profiter de toutes les intégrations AWS proposées par Datadog, utilisez l'[extrait de stratégie](#strategie-iam-aws-datadog) sous la zone de texte. Étant donné que d'autres composants sont ajoutés à une intégration, ces autorisations peuvent évoluer.
8. Cliquez sur `Review policy`.
9. Nommez la stratégie `DatadogAWSIntegrationPolicy` ou utilisez le nom de votre choix, et saisissez une description pertinente.
10. Cliquez sur `Create policy`. Vous pouvez ensuite fermer cette fenêtre.
11. Depuis la fenêtre « Create role », actualisez la liste des stratégies et sélectionnez celle que vous venez de créer.
12. Cliquez sur `Next: Review`.
13. Saisissez le nom `DatadogAWSIntegrationRole` ou un nom similaire pour le rôle, ainsi qu'une description pertinente. Cliquez sur `Create role`.

**Étape facultative** : si vous utilisez Terraform, configurez votre stratégie IAM Datadog à l'aide de [l'intégration d'AWS à Terraform][72].

#### Stratégie IAM AWS Datadog

Les autorisations énumérées ci-dessous sont incluses dans le document de stratégie à l'aide de wildcards comme `List*` et `Get*`. Si vous avez besoin de stratégies strictes, utilisez les noms d'action complets indiqués et consultez la documentation sur l'API Amazon pour les services requis.

{{< tabs >}}
{{% tab "Toutes les autorisations" %}}
Si vous ne souhaitez pas accorder toutes les autorisations, nous vous recommandons d'utiliser au strict minimum les stratégies **AmazonEC2ReadOnlyAccess** et **CloudWatchReadOnlyAccess**. Pour en savoir plus sur les autorisations, consultez l'onglet **Autorisations de base**.

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
        "lambda:AddPermission",
        "lambda:GetPolicy",
        "lambda:List*",
        "lambda:RemovePermission",
        "logs:TestMetricFilter",
        "logs:PutSubscriptionFilter",
        "logs:DeleteSubscriptionFilter",
        "logs:DescribeSubscriptionFilters",
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

{{% /tab %}}
{{% tab "Autorisations de base" %}}
L'intégration AWS/Datadog de base récupère des données à partir d'AWS CloudWatch. Votre document de stratégie doit au minimum autoriser les actions suivantes :

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
|----------------------------|----------------------------------------------------------------------------------------------|
| `cloudwatch:ListMetrics`   | Répertorie les métriques CloudWatch disponibles.                                                       |
| `cloudwatch:GetMetricData` | Récupère des points de données pour une métrique donnée.                                                        |
| `support:*`               | Ajoute des métriques à propos des limites de service.<br>Nécessite un accès complet, en raison des [limites AWS][1]. |
| `tag:getResources`         | Récupère des tags personnalisés en fonction du type de ressource.                                                            |
| `tag:getTagKeys`           | Récupère des clés de tag selon les régions d'un compte AWS.                                                |
| `tag:getTagValues`         | Récupère les valeurs de tag selon les régions d'un compte AWS.                                              |

L'API Resource Group Tagging vise notamment à réduire le nombre d'appels API requis pour recueillir des tags personnalisés. Pour en savoir plus, consultez la documentation relative aux [stratégies sur les tags][2] sur le site Web d'AWS.

[1]: http://docs.aws.amazon.com/IAM/latest/UserGuide/list_trustedadvisor.html
[2]: http://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/Welcome.html
{{% /tab %}}
{{< /tabs >}}

### Configuration

{{< tabs >}}
{{% tab "Délégation de rôles" %}}

{{< img src="integrations/aws/integrations-aws-secretentry.png" alt="logo" >}}

1. Ouvrez le [carré d'intégration AWS][1].
2. Sélectionnez l'onglet **Role Delegation**.
3. Saisissez votre ID de compte AWS **sans tiret**, p. ex. `123456789012` et **non** `1234-5678-9012`. Votre ID de compte est indiqué dans l'ARN du rôle créé durant l'[installation de l'intégration AWS](#installation). Saisissez ensuite le nom du rôle créé. **Remarque** : le nom du rôle saisi dans le carré d'intégration est sensible à la casse et doit correspondre parfaitement au nom de rôle créé sur AWS.
4. Choisissez les services pour lesquels vous souhaitez récupérer des métriques sur le côté gauche de la fenêtre de dialogue. Vous pouvez également ajouter des tags à l'ensemble des hosts et métriques. De même, si vous souhaitez uniquement surveiller un sous-ensemble d'instances EC2 sur AWS, appliquez-leur un tag et indiquez ce tag dans la zone de texte « limite » de cette page.
5. Cliquez sur **Install Integration**.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
{{% /tab %}}
{{% tab "GovCloud et Chine" %}}

1. Ouvrez le [carré d'intégration AWS][1].
2. Sélectionnez l'onglet **Access Keys (GovCloud or China Only)**.
3. Saisissez votre clé d'accès et votre clé de secret AWS. **Seules les clés d'accès et de secret pour GovCloud et la Chine sont acceptées.**
4. Choisissez les services pour lesquels vous souhaitez récupérer des métriques sur le côté gauche de la fenêtre de dialogue. Vous pouvez également ajouter des tags à l'ensemble des hosts et métriques. De même, si vous souhaitez uniquement surveiller un sous-ensemble d'instances EC2 sur AWS, appliquez-leur un tag et indiquez ce tag dans la zone de texte « limite » de cette page.
5. Cliquez sur **Install Integration**.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
{{% /tab %}}
{{< /tabs >}}

## Collecte de logs

Les logs de service AWS sont recueillis via la fonction Lambda du Forwarder Datadog. Ce Lambda, qui se déclenche sur les compartiments S3, les groupes de logs CloudWatch et les événements CloudWatch, transmet des logs à Datadog.

Pour commencer à recueillir des logs à partir de vos services AWS :

1. Configurez la [fonction Lambda du Forwarder Datadog](#configurer-la-fonction-lambda-de-datadog).
2. [Activez la journalisation](#activer-la-journalisation-pour-votre-service-AWS) pour votre service AWS (la plupart des services AWS peuvent se connecter à un compartiment S3 ou à un groupe de logs CloudWatch).
3. Configurez les déclencheurs entraînant l'exécution du Lambda. Il existe deux façons de les configurer :

  - [automatiquement](#configurer-automatiquement-des-declencheurs) : Datadog récupère les logs pour les services AWS sélectionnés et les ajoute en tant que déclencheurs pour la fonction Lambda de Datadog. Datadog met également la liste à jour.
  - [manuellement](#configurer-manuellement-des-declencheurs) : configurez vous-même chaque déclencheur via la console AWS.

### Configurer la fonction Lambda de Datadog

Déployez la fonction Lambda du Forwarder Datadog sur votre compte AWS en suivant les instructions figurant dans le [référentiel Github DataDog/datadog-serverless-functions][73].

### Activer la journalisation pour votre service AWS

Tous les services AWS qui génèrent des logs dans un compartiment S3 ou un groupe de logs CloudWatch sont pris en charge. Consultez les instructions de configuration spécifiques des services les plus utilisés dans le tableau ci-dessous :

| Service AWS                        | Activation de la journalisation de service AWS                                                                    | Envoi de logs AWS à Datadog                                                    |
|------------------------------------|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| [API Gateway][80]                  | [Activer les logs AWS API Gateway][81]                                                               | Collecte de logs [manuelle][82]                                                 |
| [Cloudfront][83]                   | [Activer les logs AWS Cloudfront][84]                                                                | Collecte de logs [manuelle][85] et [automatique](#configurer-automatiquement-des-declencheurs)  |
| [Cloudtrail][86]                   | [Activer les logs AWS Cloudtrail][87]                                                                | Collecte de logs [manuelle][88]                                                 |
| [DynamoDB][89]                     | [Activer les logs AWS DynamoDB][90]                                                                  | Collecte de logs [manuelle][91]                                                 |
| [EC2][92]                          | `-`                                                                                             | Utiliser l'[Agent Datadog][93] pour envoyer vos logs à Datadog                    |
| [ECS][94]                          | `-`                                                                                             | [Utiliser l'Agent Docker pour rassembler vos logs][95]                              |
| [Elastic Load Balancing (ELB)][96] | [Activer les logs AWS ELB][97]                                                                       | Collecte de logs [manuelle][98] et [automatique](#configurer-automatiquement-des-declencheurs)  |
| [Lambda][99]                       | `-`                                                                                             | Collecte de logs [manuelle][100] et [automatique](#configurer-automatiquement-des-declencheurs) |
| [RDS][101]                         | [Activer les logs AWS RDS][102]                                                                      | Collecte de logs [manuelle][103]                                                |
| [Route 53][104]                    | [Activer les logs AWS Route 53][105]                                                                 | Collecte de logs [manuelle][106]                                                |
| [S3][107]                          | [Activer les logs AWS S3][108]                                                                       | Collecte de logs [manuelle][109] et [automatique](#configurer-automatiquement-des-declencheurs) |
| [SNS][110]                         | Il n'y a pas de « logs SNS ». Traitez les logs et les événements transmis via le service SNS. | Collecte de logs [manuelle][111]                                                |
| [RedShift][112]                    | [Activer les logs AWS Redshift][113]                                                                 | Collecte de logs [manuelle][114] et [automatique](#configurer-automatiquement-des-declencheurs) |
| [VPC][115]                         | [Activer les logs AWS VPC][116]                                                                      | Collecte de logs [manuelle][117]                                                |

### Envoyer des logs de service AWS à Datadog

Vous pouvez choisir entre deux options pour la configuration des déclencheurs de la fonction Lambda de Datadog :

* Configurer manuellement des déclencheurs sur des compartiments S3, des groupes de logs CloudWatch ou des événements CloudWatch.
* Laisser Datadog définir et gérer automatiquement la liste des déclencheurs.

#### Configurer automatiquement des déclencheurs

Si vous stockez des logs dans de nombreux compartiments S3 ou groupes de logs CloudWatch, Datadog peut gérer automatiquement les déclencheurs à votre place.

1. Si vous ne l'avez pas déjà fait, configurez [la fonction Lambda de collecte de logs AWS avec Datadog][118].
2. Vérifiez que la [stratégie](#strategie-iam-aws-datadog) du rôle IAM utilisé pour l'intégration Datadog/AWS possède les autorisations suivantes. Le fonctionnement de ces autorisations est décrit ci-dessous :

    ```text
    "cloudfront:GetDistributionConfig",
    "cloudfront:ListDistributions",
    "elasticloadbalancing:DescribeLoadBalancers",
    "elasticloadbalancing:DescribeLoadBalancerAttributes",
    "lambda:AddPermission",
    "lambda:GetPolicy",
    "lambda:RemovePermission",
    "redshift:DescribeClusters",
    "redshift:DescribeLoggingStatus",
    "s3:GetBucketLogging",
    "s3:GetBucketLocation",
    "s3:GetBucketNotification",
    "s3:ListAllMyBuckets",
    "s3:PutBucketNotification",
    "logs:PutSubscriptionFilter",
    "logs:DeleteSubscriptionFilter",
    "logs:DescribeSubscriptionFilters"
    ```

    | Autorisation AWS                                              | Description                                                                  |
    | ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
    | `cloudfront:GetDistributionConfig`                          | Récupère le nom du compartiment S3 contenant les logs d'accès CloudFront.             |
    | `cloudfront:ListDistributions`                              | Répertorie toutes les distributions CloudFront.                                           |
    | `elasticloadbalancing:`<br>`DescribeLoadBalancers`          | Répertorie tous les répartiteurs de charge.                                                     |
    | `elasticloadbalancing:`<br>`DescribeLoadBalancerAttributes` | Récupère le nom du compartiment S3 contenant les logs d'accès ELB.                    |
    | `lambda:AddPermission`                                      | Ajoute une autorisation permettant à un compartiment S3 de déclencher une fonction Lambda. |
    | `lambda:GetPolicy`                                          | Récupère la stratégie Lambda lorsque des déclencheurs doivent être supprimés.                      |
    | `lambda:RemovePermission`                                   | Supprime des autorisations d'une stratégie Lambda.                                     |
    | `redshift:DescribeClusters`                                 | Répertorie tous les clusters Redshift.                                                  |
    | `redshift:DescribeLoggingStatus`                            | Récupère le nom du compartiment S3 contenant des logs Redshift.                      |
    | `s3:GetBucketLogging`                                       | Récupère le nom du compartiment S3 contenant les logs d'accès S3.                     |
    | `s3:GetBucketLocation`                                      | Récupère la région du compartiment S3 contenant les logs d'accès S3.                   |
    | `s3:GetBucketNotification`                                  | Récupère les configurations des déclencheurs Lambda existants.                                  |
    | `s3:ListAllMyBuckets`                                       | Répertorie tous les compartiments S3.                                                         |
    | `s3:PutBucketNotification`                                  | Ajoute ou supprime un déclencheur Lambda basé sur des événements de compartiment S3.                    |
    | `logs:PutSubscriptionFilter`                                | Ajoute un déclencheur Lambda basé sur des événements de log CloudWatch.                          |
    | `logs:DeleteSubscriptionFilter`                             | Supprime un déclencheur Lambda basé sur des événements de log CloudWatch.                       |
    | `logs:DescribeSubscriptionFilters`                          | Répertorie les filtres d'abonnement pour le groupe de logs spécifié.                  |

3. Accédez à l'onglet *Collect logs* dans le [carré d'intégration AWS][120].
4. Sélectionnez le compte AWS à partir duquel vous souhaitez recueillir des logs, puis saisissez l'ARN du Lambda créé dans la section précédente.
  {{< img src="logs/aws/AWSLogStep1.png" alt="Saisie de Lambda" popup="true" style="width:80%;" >}}
5. Sélectionnez les services à partir desquels vous souhaitez recueillir des logs, puis enregistrez. Pour arrêter la collecte de logs d'un service spécifique, décochez la case associée.
  {{< img src="logs/aws/AWSLogStep2.png" alt="Sélection de services" popup="true" style="width:80%;" >}}
6. Si vous possédez des logs dans plusieurs régions, vous devez créer des fonctions Lambda supplémentaires dans ces régions et les indiquer dans ce carré.
7. Pour arrêter la collecte de l'ensemble des logs AWS, appuyez sur la *croix* en regard de chaque ARN de Lambda. Tous les déclencheurs de cette fonction seront supprimés.
8. Quelques minutes après cette première configuration, vos logs AWS apparaîtront dans votre [page Log Explorer][121] Datadog, quasiment en temps réel.

#### Configurer manuellement des déclencheurs

##### Collecte de logs depuis un groupe de logs CloudWatch

Si vous stockez des logs dans un groupe de logs CloudWatch, suivez les étapes ci-dessous pour les transmettre à Datadog :

1. Si vous ne l'avez pas déjà fait, configurez [la fonction Lambda de collecte de logs AWS avec Datadog][118].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur dans la console AWS sur le groupe de logs CloudWatch qui contient vos logs :

  {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="groupes de logs cloudwatch" popup="true" style="width:70%;">}}

   Sélectionnez le groupe de logs CloudWatch correspondant, ajoutez un nom de filtre (vous pouvez toutefois laisser le filtre vide) et ajoutez le déclencheur :
  {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="Déclencheur cloudwatch" popup="true" style="width:70%;">}}

Accédez ensuite à la [section Log de Datadog][121] pour commencer à explorer vos logs !

##### Collecte de logs depuis des compartiments S3

Si vous stockez des logs dans un compartiment S3, suivez les étapes ci-dessous pour les transmettre à Datadog :

1. Si vous ne l'avez pas déjà fait, configurez [la fonction Lambda de collecte de logs AWS avec Datadog][118].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur dans la console AWS sur le compartiment S3 qui contient vos logs :
    {{< img src="logs/aws/adding_trigger.png" alt="Ajout d'un déclencheur" popup="true"style="width:80%;">}}

3. Sélectionnez le compartiment, puis suivez les instructions d'AWS :
    {{< img src="logs/aws/integration_lambda.png" alt="Intégration Lambda" popup="true" style="width:80%;">}}

4. Définissez le bon type d'événement sur les compartiments S3 :
    {{< img src="logs/aws/object_created.png" alt="Objet créé" popup="true" style="width:80%;">}}

Accédez ensuite à la [section Log de Datadog][121] pour commencer à explorer vos logs !

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_web_services" >}}


### Événements

Vous pouvez configurer la collecte d'événements AWS pour chaque service AWS. Consultez la documentation des différents services AWS pour en savoir plus sur la collecte d'événements.

## Dépannage

### Vous constatez un écart entre vos données dans CloudWatch et Datadog ?

Il est important de tenir compte des deux distinctions suivantes :

1. Pour les counters AWS, un graphique défini sur « sum » « 1minute » affiche le nombre total d'occurrences en l'espace d'une minute, soit le taux par minute. Datadog affiche les données brutes à partir des valeurs AWS normalisées par seconde, peu importe l'intervalle sélectionné dans AWS. Cela explique pourquoi la valeur affichée dans Datadog peut être plus faible.
2. Les valeurs minimales, maximales et moyennes n'ont généralement pas la même signification dans AWS et dans Datadog. Dans AWS, les latences moyenne, minimale et maximale correspondent à trois métriques distinctes recueillies. Lorsque Datadog récupère des métriques à partir d'AWS CloudWatch, la latence moyenne est transmise sous la forme de séries temporelles distinctes par ELB. Dans Datadog, lorsque vous sélectionnez les valeurs « min », « max » ou « avg », vous définissez les critères de rassemblement de séries temporelles. Par exemple, si vous cherchez à obtenir `system.cpu.idle` sans appliquer de filtre, une série est envoyée pour chaque host qui renvoie cette métrique. Ces séries doivent être combinées pour être représentées graphiquement. À l'inverse, si vous cherchez à obtenir `system.cpu.idle` pour un seul host, aucune agrégation n'est nécessaire. Les valeurs maximale et moyenne sont identiques.

### Métriques en retard

Lorsque vous utilisez l'intégration AWS, Datadog récupère vos métriques via l'API CloudWatch. Il est possible que les données des métriques AWS accusent un léger retard, en raison des contraintes liées à l'API.

Pour commencer, l'API CloudWatch propose uniquement une analyse métrique par métrique afin d'extraire des données. Les API CloudWatch prévoient une limite de débit qui varie en fonction des informations d'authentification, de la région et du service. Les métriques sont transmises par AWS en fonction du niveau du compte. Par exemple, si vous payez pour des « métriques détaillées » dans AWS, vous y avez accès plus rapidement. Ce niveau de service pour les métriques détaillées s'applique également à la granularité. Ainsi, certaines métriques sont transmises toutes les minutes, tandis que d'autres sont envoyées toutes les cinq minutes.

Datadog vous permet de hiérarchiser certaines métriques d'un compte afin de les récupérer en priorité, en fonction de certaines circonstances. Contactez [l'assistance Datadog][123] pour en savoir plus.

Pour obtenir des métriques quasiment en temps réel, installez l'Agent Datadog sur le host. Pour en savoir plus, consultez l'article de blog de Datadog [Tout ce que vous devez savoir pour effectuer une surveillance à partir d'Agents][124] (en anglais).

### Métriques manquantes

L'API CloudWatch renvoie uniquement les métriques avec des points de données. Ainsi, si un ELB ne possède aucune instance liée, aucune métrique associée à cet ELB n'apparaît dans Datadog.

### Nombre aws.elb.healthy_host_count incorrect

Lorsque l'option d'équilibrage des charges entre zones est activée sur un ELB, toutes les instances liées à cet ELB font partie de toutes les zones de disponibilité (pour CloudWatch). Ainsi, si vous possédez deux instances dans 1a et trois dans ab, la métrique affiche cinq instances par zone de disponibilité.
Puisque cela peut s'avérer contre-intuitif, nous avons ajouté de nouvelles métriques, **aws.elb.healthy_host_count_deduped** et **aws.elb.un_healthy_host_count_deduped**, qui affichent le nombre d'instances saines et non saines par zone de disponibilité, que vous ayez activé ou non l'option d'équilibrage des charges entre zones.

### Hosts dupliqués lors de l'installation de l'Agent

Lors de l'installation de l'Agent sur un host AWS, il est possible que des hosts soient dupliqués pendant quelques heures sur la page d'infrastructure si vous avez défini manuellement le hostname dans la configuration de l'Agent. Ces doublons disparaîtront après quelques heures et ne seront pas pris en compte durant la facturation.


[1]: https://docs.datadoghq.com/fr/integrations/amazon_api_gateway
[2]: https://docs.datadoghq.com/fr/integrations/amazon_appstream
[3]: https://docs.datadoghq.com/fr/integrations/amazon_appsync
[4]: https://docs.datadoghq.com/fr/integrations/amazon_athena
[5]: https://docs.datadoghq.com/fr/integrations/amazon_auto_scaling
[6]: https://docs.datadoghq.com/fr/integrations/amazon_billing
[7]: https://docs.datadoghq.com/fr/integrations/amazon_cloudfront
[8]: https://docs.datadoghq.com/fr/integrations/amazon_cloudhsm
[9]: https://docs.datadoghq.com/fr/integrations/amazon_cloudsearch
[10]: https://docs.datadoghq.com/fr/integrations/amazon_cloudtrail
[11]: https://docs.datadoghq.com/fr/integrations/amazon_codebuild
[12]: https://docs.datadoghq.com/fr/integrations/amazon_codedeploy
[13]: https://docs.datadoghq.com/fr/integrations/amazon_cognito
[14]: https://docs.datadoghq.com/fr/integrations/amazon_connect
[15]: https://docs.datadoghq.com/fr/integrations/amazon_directconnect
[16]: https://docs.datadoghq.com/fr/integrations/amazon_dms
[17]: https://docs.datadoghq.com/fr/integrations/amazon_documentdb
[18]: https://docs.datadoghq.com/fr/integrations/amazon_dynamodb
[19]: https://docs.datadoghq.com/fr/integrations/amazon_ebs
[20]: https://docs.datadoghq.com/fr/integrations/amazon_ec2
[21]: https://docs.datadoghq.com/fr/integrations/amazon_ec2_spot
[22]: https://docs.datadoghq.com/fr/integrations/amazon_ecs
[23]: https://docs.datadoghq.com/fr/integrations/amazon_efs
[24]: https://docs.datadoghq.com/fr/integrations/amazon_eks
[25]: https://docs.datadoghq.com/fr/integrations/amazon_elastic_transcoder
[26]: https://docs.datadoghq.com/fr/integrations/amazon_elasticache
[27]: https://docs.datadoghq.com/fr/integrations/amazon_elasticbeanstalk
[28]: https://docs.datadoghq.com/fr/integrations/amazon_elb
[29]: https://docs.datadoghq.com/fr/integrations/amazon_emr
[30]: https://docs.datadoghq.com/fr/integrations/amazon_es
[31]: https://docs.datadoghq.com/fr/integrations/amazon_firehose
[32]: https://docs.datadoghq.com/fr/integrations/amazon_gamelift
[33]: https://docs.datadoghq.com/fr/integrations/amazon_glue
[34]: https://docs.datadoghq.com/fr/integrations/amazon_guardduty
[35]: https://docs.datadoghq.com/fr/integrations/amazon_health
[36]: https://docs.datadoghq.com/fr/integrations/amazon_inspector
[37]: https://docs.datadoghq.com/fr/integrations/amazon_iot
[38]: https://docs.datadoghq.com/fr/integrations/amazon_kinesis
[39]: https://docs.datadoghq.com/fr/integrations/amazon_kms
[40]: https://docs.datadoghq.com/fr/integrations/amazon_lambda
[41]: https://docs.datadoghq.com/fr/integrations/amazon_lex
[42]: https://docs.datadoghq.com/fr/integrations/amazon_machine_learning
[43]: https://docs.datadoghq.com/fr/integrations/amazon_mediaconnect
[44]: https://docs.datadoghq.com/fr/integrations/amazon_mediaconvert
[45]: https://docs.datadoghq.com/fr/integrations/amazon_mediapackage
[46]: https://docs.datadoghq.com/fr/integrations/amazon_mediatailor
[47]: https://docs.datadoghq.com/fr/integrations/amazon_mq
[48]: https://docs.datadoghq.com/fr/integrations/amazon_msk
[49]: https://docs.datadoghq.com/fr/integrations/amazon_nat_gateway
[50]: https://docs.datadoghq.com/fr/integrations/amazon_neptune
[51]: https://docs.datadoghq.com/fr/integrations/amazon_ops_works
[52]: https://docs.datadoghq.com/fr/integrations/amazon_polly
[53]: https://docs.datadoghq.com/fr/integrations/amazon_rds
[54]: https://docs.datadoghq.com/fr/integrations/amazon_redshift
[55]: https://docs.datadoghq.com/fr/integrations/amazon_rekognition
[56]: https://docs.datadoghq.com/fr/integrations/amazon_route53
[57]: https://docs.datadoghq.com/fr/integrations/amazon_s3
[58]: https://docs.datadoghq.com/fr/integrations/amazon_sagemaker
[59]: https://docs.datadoghq.com/fr/integrations/amazon_ses
[60]: https://docs.datadoghq.com/fr/integrations/amazon_sns
[61]: https://docs.datadoghq.com/fr/integrations/amazon_sqs
[62]: https://docs.datadoghq.com/fr/integrations/amazon_storage_gateway
[63]: https://docs.datadoghq.com/fr/integrations/amazon_swf
[64]: https://docs.datadoghq.com/fr/integrations/amazon_vpc
[65]: https://docs.datadoghq.com/fr/integrations/amazon_waf
[66]: https://docs.datadoghq.com/fr/integrations/amazon_workspaces
[67]: https://docs.datadoghq.com/fr/integrations/amazon_xray
[68]: http://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles
[69]: https://console.aws.amazon.com/iam/home#/roles
[70]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[71]: http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[72]: https://docs.datadoghq.com/fr/integrations/faq/aws-integration-with-terraform
[73]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring
[74]: https://console.aws.amazon.com/lambda/home?region=us-east-1
[75]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/lambda_function.py
[76]: https://app.datadoghq.com/account/settings#api
[77]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[78]: https://docs.aws.amazon.com/lambda/latest/dg/per-function-concurrency.html
[79]: https://github.com/DataDog/datadog-lambda-layer-python
[80]: https://docs.datadoghq.com/fr/integrations/amazon_api_gateway
[81]: https://docs.datadoghq.com/fr/integrations/amazon_api_gateway/#log-collection
[82]: https://docs.datadoghq.com/fr/integrations/amazon_api_gateway/#send-logs-to-datadog
[83]: https://docs.datadoghq.com/fr/integrations/amazon_cloudfront
[84]: https://docs.datadoghq.com/fr/integrations/amazon_cloudfront/#enable-cloudfront-logging
[85]: https://docs.datadoghq.com/fr/integrations/amazon_cloudfront/#send-logs-to-datadog
[86]: https://docs.datadoghq.com/fr/integrations/amazon_cloudtrail
[87]: https://docs.datadoghq.com/fr/integrations/amazon_cloudtrail/#enable-cloudtrail-logging
[88]: https://docs.datadoghq.com/fr/integrations/amazon_cloudtrail/#send-logs-to-datadog
[89]: https://docs.datadoghq.com/fr/integrations/amazon_dynamodb
[90]: https://docs.datadoghq.com/fr/integrations/amazon_dynamodb/#enable-dynamodb-logging
[91]: https://docs.datadoghq.com/fr/integrations/amazon_dynamodb/#send-logs-to-datadog
[92]: https://docs.datadoghq.com/fr/integrations/amazon_ec2
[93]: https://docs.datadoghq.com/fr/logs
[94]: https://docs.datadoghq.com/fr/integrations/amazon_ecs
[95]: https://docs.datadoghq.com/fr/integrations/amazon_ecs/#log-collection
[96]: https://docs.datadoghq.com/fr/integrations/amazon_elb
[97]: https://docs.datadoghq.com/fr/integrations/amazon_elb/#enable-aws-elb-logging
[98]: https://docs.datadoghq.com/fr/integrations/amazon_elb/#manual-installation-steps
[99]: https://docs.datadoghq.com/fr/integrations/amazon_lambda
[100]: https://docs.datadoghq.com/fr/integrations/amazon_lambda/#log-collection
[101]: https://docs.datadoghq.com/fr/integrations/amazon_rds
[102]: https://docs.datadoghq.com/fr/integrations/amazon_rds/#enable-rds-logging
[103]: https://docs.datadoghq.com/fr/integrations/amazon_rds/#send-logs-to-datadog
[104]: https://docs.datadoghq.com/fr/integrations/amazon_route53
[105]: https://docs.datadoghq.com/fr/integrations/amazon_route53/#enable-route53-logging
[106]: https://docs.datadoghq.com/fr/integrations/amazon_route53/#send-logs-to-datadog
[107]: https://docs.datadoghq.com/fr/integrations/amazon_s3
[108]: https://docs.datadoghq.com/fr/integrations/amazon_s3/#enable-s3-access-logs
[109]: https://docs.datadoghq.com/fr/integrations/amazon_s3/#manual-installation-steps
[110]: https://docs.datadoghq.com/fr/integrations/amazon_sns
[111]: https://docs.datadoghq.com/fr/integrations/amazon_sns/#send-logs-to-datadog
[112]: https://docs.datadoghq.com/fr/integrations/amazon_redshift
[113]: https://docs.datadoghq.com/fr/integrations/amazon_redshift/#enable-aws-redshift-logging
[114]: https://docs.datadoghq.com/fr/integrations/amazon_redshift/#log-collection
[115]: https://docs.datadoghq.com/fr/integrations/amazon_vpc
[116]: https://docs.datadoghq.com/fr/integrations/amazon_vpc/#enable-vpc-flow-log-logging
[117]: https://docs.datadoghq.com/fr/integrations/amazon_vpc/#log-collection
[118]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#set-up-the-datadog-lambda-function
[119]: https://console.aws.amazon.com/iam/home#s=Home
[120]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[121]: https://app.datadoghq.com/logs
[122]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/amazon_web_services_metadata.csv
[123]: https://docs.datadoghq.com/fr/help
[124]: http://www.datadoghq.com/blog/dont-fear-the-agent