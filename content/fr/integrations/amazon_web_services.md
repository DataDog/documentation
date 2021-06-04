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
draft: false
git_integration_title: amazon_web_services
has_logo: true
integration_id: amazon-web-services
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
| [API Gateway][1]                        | Créez, publiez, maintenez et sécurisez des API                                             |
| [App Runner][2]                        | Un service qui simplifie, accélère et rentabilise le déploiement de code depuis les sources ou d'images de conteneur.         |
| [Appstream][3]                          | Streaming d'applications entièrement géré sur AWS                                             |
| [AppSync][4]                            | Un service GraphQL offrant des fonctionnalités de synchronisation des données en temps réel et de programmation hors ligne |
| [Athena][5]                             | Service de requêtes interactif sans serveur                                                   |
| [Auto Scaling][6]                        | Configuration du dimensionnement d'EC2                                                                     |
| [Billing][7]                            | Facturation et budgets                                                                    |
| [CloudFront][8]                         | Réseau de diffusion de contenu local                                                         |
| [Cloudhsm][9]                           | Module de sécurité matérielle (HSM) géré                                                 |
| [CloudSearch][10]                        | Accès aux fichiers de log et aux appels d'API AWS                                                  |
| [CloudTrail][11]                        | Accès aux fichiers de log et aux appels d'API AWS                                                  |
| [CodeBuild][12]                         | Service de génération entièrement géré                                                            |
| [CodeDeploy][13]                        | Automatisation des déploiements de code                                                              |
| [Cognito][14]                           | Inscription et connexion utilisateur sécurisées                                                        |
| [Connect][15]                           | Un centre de contacts clients fonctionnant en libre-service et basé sur le cloud                                     |
| [Direct Connect][16]                    | Connexion réseau dédiée à AWS                                                    |
| [DMS][17]                               | Service de migration de base de données                                                             |
| [DocumentDB][18]                        | Base de données compatible avec MongoDB                                                            |
| [DynamoDB][19]                         | Base de données NoSQL                                                                         |
| [EBS (Elastic Block Store)][20]         | Volumes de stockage permanent par bloc                                                 |
| [EC2 (Elastic Cloud Compute)][21]       | Capacité de calcul redimensionnable dans le cloud                                                |
| [EC2 Spot][22]                          | Exploitation des capacités inutilisées d'EC2                                                  |
| [ECS (Elastic Container Service)][23]   | Service de gestion de conteneurs prenant en charge les conteneurs Docker                           |
| [EFS (Elastic File System)][24]         | Stockage de fichiers partagés                                                                    |
| [EKS][25]                               | Elastic Container Service pour Kubernetes                                               |
| [Elastic Transcoder][26]                | Transcodage de fichiers multimédias et de vidéos dans le cloud                                               |
| [ElastiCache][27]                       | Cache en mémoire dans le cloud                                                           |
| [Elastic Beanstalk][28]                 | Service pour le déploiement et le dimensionnement d'applications et de services Web                        |
| [ELB (Elastic Load Balancing)][29]      | Distribution du trafic entrant d'applications sur plusieurs instances Amazon EC2          |
| [EMR (Elastic Map Reduce)][30]          | Traitement de données avec Hadoop                                                           |
| [ES (Elasticsearch)][31]                | Déploiement, utilisation et mise à l'échelle des clusters Elasticsearch                                      |
| [Firehose][32]                          | Capture et chargement de données de streaming                                                        |
| [FSx][33]                              | Service géré de stockage évolutif pour Windows File Server ou Lustre.          |
| [Gamelift][34]                          | Hébergement de serveurs de jeux dédiés                                                          |
| [Glue][35]                              | Extraction, transformation et chargement de données pour l'analyse                                        |
| [GuardDuty][36]                         | Détection des menaces intelligente                                                           |
| [Health][37]                            | Visibilité sur l'état de vos ressources, services et comptes AWS                |
| [Inspector][38]                         | Évaluation automatisée de la sécurité                                                          |
| [IoT (Internet of Things)][39]          | Connexion d'appareils IoT à des services cloud                                                |
| [Kinesis][40]                           | Service de traitement en temps réel de grands flux de données distribués                    |
| [KMS (Key Management Service)][41]      | Création et contrôle des clés de chiffrement                                                     |
| [Lambda][42]                            | Service de calcul sans serveur                                                                   |
| [Lex][43]                               | Création de bots de discussion                                                                |
| [Machine Learning][44]                  | Création des modèles d'apprentissage automatique                                                         |
| [MediaConnect][45]                      | Transport vidéo en direct                                                               |
| [MediaConvert][46]                      | Traitement vidéo pour la diffusion et la distribution multi-écran                                |
| [MediaPackage][47]                      | Préparation et protection de vidéos en vue de leur diffusion sur Internet                               |
| [MediaTailor][48]                       | Insertion évolutive de publicités côté serveur                                                      |
| [MQ][49]                                | Agent de message géré pour ActiveMQ                                                    |
| [Managed Streaming for Kafka][50]       | Conception et exécution d'applications qui utilisent Kafka pour le traitement des données de streaming             |
| [Passerelle NAT][51]                       | Autoriser les instances d'un sous-réseau privé à se connecter à Internet ou à d'autres services AWS  |
| [Neptune][52]                           | Service de base de données orienté graph fiable et rapide conçu pour le cloud                                      |
| [Network Firewall][53]                 | Filtrage du trafic dans le périmètre d'un VPC                                               |
| [OpsWorks][54]                          | Gestion de la configuration                                                               |
| [Polly][55]                             | Service de synthèse vocale                                                                    |
| [RDS (Relational Database Service)][56] | Base de données relationnelle dans le cloud                                                       |
| [Redshift][57]                          | Solution d'entrepôt de données                                                                |
| [Rekognition][58]                       | Analyse d'images et de vidéos pour les applications                                              |
| [Route 53][59]                          | Gestion de noms de domaine et de trafic avec surveillance de la disponibilité                                |
| [S3 (Simple Storage Service)][60]       | Service de stockage dans le cloud hautement disponible et évolutif                                    |
| [SageMaker][61]                         | Algorithmes et modèles d'apprentissage automatique                                                 |
| [SES (Simple Email Service)][62]        | Service économique d'envoi d'e-mails                                    |
| [SNS (Simple Notification System)][63]  | Alertes et notifications                                                               |
| [SQS (Simple Queue Service)][64]        | Service de file d'attente de messagerie                                                                |
| [Storage Gateway][65]                   | Stockage cloud hybride                                                                   |
| [SWF (Simple Workflow Service)][66]     | Gestion de workflows dans le cloud                                                              |
| [VPC (Virtual Private Cloud)][67]       | Lancement de ressources AWS dans un réseau virtuel                                            |
| [Web Application Firewall (WAF)][68]    | Protection des applications Web contre les failles Web les plus courantes                                      |
| [WorkSpaces][69]                        | Service de bureau sécurisé                                                       |
| [X-Ray][70]                             | Création de traces pour les applications distribuées                                                   |

## Configuration

{{< site-region region="gov" >}}
<div class="alert alert-warning">La délégation des rôles AWS n'est pas prise en charge par le site gouvernemental Datadog. En effet, il nécessite l'utilisation de <a href="?tab=clésdaccèsgovcloudouchineuniquement#configuration">clés d'accès</a>.</div>
{{< /site-region >}}

Choisissez l'une des méthodes suivantes pour intégrer vos comptes AWS dans Datadog afin de collecter des métriques, des traces et des logs :

- [Délégation des rôles (Automatique)](?tab=délégationdesrôles#automatique---cloudformation) : Utilisez un modèle CloudFormation afin de configurer automatiquement le rôle AWS nécessaire (conseillé).
- [Délégation des rôles (Manuelle)](?tab=délégationdesrôles#manuelle) : Créez manuellement les rôles nécessaires et copiez les identifiants requis dans le formulaire correspondant.
- [Clés d'accès](?tab=clésdaccèsgovcloudouchineuniquement#configuration) : Utilisé pour GovCloud ou la Chine uniquement

{{< tabs >}}
{{% tab "Délégation des rôles" %}}

Choisissez la méthode que vous souhaitez utiliser pour configurer le rôle AWS nécessaire. Nous vous conseillons d'utiliser CloudFormation.

### Automatique - CloudFormation

1. Ouvrez le [carré de l'intégration Datadog/AWS][1]. Cliquez sur le bouton **Install** pour installer cette intégration.
2. Depuis l'onglet _Configuration_, choisissez **Automatically Using CloudFormation**. Si vous avez déjà un compte AWS associé, commencez par cliquer sur **Add another account**.
3. Connectez-vous à la console AWS.
4. Sur la page CloudFormation :
   1. Indiquez votre [clé d'API Datadog][2].
   2. Si vous souhaitez activer la [collecte de ressources][3] (requise pour certains produits et certaines fonctionnalités), vous devez définir le paramètre [ResourceCollectionPermissions][4] sur true.
   3. Cochez les deux cases d'acceptation en bas de la page.
   4. Créez une pile.
5. Mettez à jour le [carré d'intégration Datadog/AWS][1] en saisissant le [nom du rôle IAM et l'ID du compte][5] utilisés pour créer la pile CloudFormation.

### Méthode manuelle

#### AWS

1. Créez un rôle dans la [console IAM][6] d'AWS.
2. Sélectionnez le type de rôle `Another AWS account`.
3. Pour Account ID, saisissez `464622532012` (identifiant de compte Datadog). Cela signifie que vous accordez à Datadog un accès en lecture seule à vos données AWS.
4. Sélectionnez `Require external ID` et saisissez l'ID généré [dans le carré d'intégration AWS][5]. Assurez-vous de ne pas cocher **Require MFA**. _Pour en savoir plus sur l'External ID, consultez [ce document du guide de l'utilisateur d'IAM][7]_.
5. Cliquez sur `Next: Permissions`.
6. Si vous avez déjà créé la stratégie, sélectionnez-la sur cette page, puis passez à l'étape 12. Si ce n'est pas le cas, cliquez sur `Create Policy` afin d'ouvrir une nouvelle fenêtre.
7. Sélectionnez l'onglet `JSON`. Afin de profiter de toutes les intégrations AWS proposées par Datadog, utilisez l'[extrait de stratégie](#strategie-iam-aws-datadog) sous la zone de texte. Étant donné que d'autres composants sont ajoutés à une intégration, ces autorisations peuvent évoluer.
8. Cliquez sur `Review policy`.
9. Nommez la stratégie `DatadogAWSIntegrationPolicy` ou utilisez le nom de votre choix, et saisissez une description pertinente.
10. Cliquez sur `Create policy`. Vous pouvez ensuite fermer cette fenêtre.
11. Si vous souhaitez activer la [collecte de ressources][3] (requises pour certains produits et certaines fonctionnalités), vous devez créer une stratégie supplémentaire du nom de DatadogAWSResourceCollectionPolicy, en suivant les étapes 6 à 10. Utilisez l'[extrait de stratégie][4] disponible ci-dessous dans la zone de texte.
12. Revenez à l'écran Create role, actualisez la liste des stratégies, puis sélectionnez celles que vous venez de créer.
13. Cliquez sur `Next: Review`.
14. Saisissez le nom `DatadogAWSIntegrationRole` ou un nom similaire pour le rôle, ainsi qu'une description pertinente. Cliquez sur `Create role`.

**Étape facultative** : si vous utilisez Terraform, configurez votre stratégie IAM Datadog à l'aide de [l'intégration AWS avec Terraform][8].

#### Datadog

1. Ouvrez le [carré d'intégration AWS][1].
2. Sélectionnez l'onglet **Role Delegation**, puis cliquez sur **Manually**.
3. Saisissez votre ID de compte AWS **sans tiret**, p. ex. `123456789012`. Votre ID de compte est indiqué dans l'ARN du rôle créé durant l'[installation de l'intégration AWS](#installation).
4. Saisissez le nom du rôle créé. **Remarque** : le nom de rôle saisi dans le carré d'intégration est sensible à la casse et doit correspondre parfaitement au nom du rôle créé sur AWS.
5. Depuis le côté gauche de la fenêtre, choisissez les services pour lesquels vous souhaitez récupérer des métriques.
6. Vous pouvez également cocher la case `Enable resource configuration collection` pour activer la [collecte de ressources][3] (requise pour certains produits et certaines fonctionnalités).
6. Si vous le souhaitez, ajoutez des tags à l'ensemble des hosts et des métriques.
7. Vous pouvez surveiller un sous-ensemble d'instances EC2 en saisissant les tags AWS correspondants dans la zone de texte `to hosts with tag`. **Remarque :** cela s'applique également aux volumes EBS associés à une instance.
8. Vous pouvez surveiller un sous-ensemble de Lambdas en saisissant les tags AWS correspondants dans la zone de texte `to Lambdas with tag`.
9. Cliquez sur **Install Integration**.

#### Stratégie AWS IAM Datadog

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
                "cloudtrail:LookupEvents",
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
                "fsx:DescribeFileSystems",
                "fsx:ListTagsForResource",
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
                "organizations:DescribeOrganization",
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
| `support:*`               | Ajoute des métriques à propos des limites de service.<br>Nécessite un accès complet, en raison des [limites AWS][9]. |
| `tag:getResources`         | Récupère des tags personnalisés en fonction du type de ressource.                                                            |
| `tag:getTagKeys`           | Récupère des clés de tag selon les régions d'un compte AWS.                                                |
| `tag:getTagValues`         | Récupère les valeurs de tag selon les régions d'un compte AWS.                                              |

L'API Resource Group Tagging vise notamment à réduire le nombre d'appels API requis pour recueillir des tags personnalisés. Pour en savoir plus, consultez la documentation relative aux [stratégies sur les tags][10] (en anglais) sur le site Web d'AWS.

#### Stratégie de collecte de ressources Datadog

Pour que Datadog puisse surveiller vos configurations de ressources AWS avec la solution Cloud Security Posture Management, vous devez accorder les autorisations ci-dessous. Ces fonctionnalités nécessitent également [toutes les autorisations][11].

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "acm:DescribeCertificate",
                "acm:ListCertificates",
                "cloudfront:GetDistribution",
                "cloudfront:ListDistributions",
                "cloudtrail:DescribeTrails",
                "cloudtrail:GetEventSelectors",
                "cloudtrail:GetTrailStatus",
                "config:DescribeConfigurationRecorderStatus",
                "config:DescribeConfigurationRecorders",
                "iam:GenerateCredentialReport",
                "iam:GetAccountPasswordPolicy",
                "iam:GetAccountSummary",
                "iam:GetCredentialReport",
                "iam:GetLoginProfile",
                "iam:GetPolicyVersion",
                "iam:ListAttachedUserPolicies",
                "iam:ListEntitiesForPolicy",
                "iam:ListMFADevices",
                "iam:ListPolicies",
                "iam:ListRoles",
                "iam:ListServerCertificates",
                "iam:ListUserPolicies",
                "iam:ListUsers",
                "iam:ListVirtualMFADevices",
                "kms:GetKeyPolicy",
                "kms:GetKeyRotationStatus",
                "kms:ListAliases",
                "kms:ListKeys",
                "lambda:GetPolicy",
                "lambda:ListFunctions",
                "redshift:DescribeClusterParameterGroups",
                "redshift:DescribeClusterParameters",
                "redshift:DescribeLoggingStatus",
                "rds:DescribeDBSecurityGroups",
                "rds:DescribeDBSnapshotAttributes",
                "rds:DescribeDBSnapshots",
                "s3:GetBucketAcl",
                "s3:GetBucketLogging",
                "s3:GetBucketPolicy",
                "s3:GetBucketPolicyStatus",
                "s3:GetBucketPublicAccessBlock",
                "s3:GetBucketVersioning",
                "s3:GetEncryptionConfiguration",
                "sns:GetSubscriptionAttributes",
                "sns:GetTopicAttributes",
                "sns:ListSubscriptions",
                "sns:ListTopics",
                "sqs:GetQueueAttributes",
                "sqs:ListQueues"
            ],
            "Resource": "*"
        }
    ]
}
```
[1]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#resource-collection
[4]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#datadog-resource-collection-policy
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html
[6]: https://console.aws.amazon.com/iam/home#/roles
[7]: http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[8]: https://docs.datadoghq.com/fr/integrations/faq/aws-integration-with-terraform
[9]: https://docs.aws.amazon.com/awssupport/latest/user/Welcome.html#trustedadvisorsection
[10]: http://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/Welcome.html
[11]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#all-permissions
{{% /tab %}}
{{% tab "Clés d'accès (GovCloud ou Chine uniquement)" %}}

#### AWS

1. Dans votre console AWS, configurez l'utilisateur IAM qui sera utilisé par l'intégration Datadog.
2. Générez une clé d'accès et une clé de secret pour l'utilisateur IAM de l'intégration Datadog.

Consultez la [documentation relative à AWS][1] pour en savoir plus.

#### Datadog

1. Ouvrez le [carré de l'intégration AWS][2]. Cliquez sur le bouton **Install** pour installer cette intégration.
2. Sélectionnez l'onglet **Access Keys (GovCloud or China Only)**.
3. Saisissez votre clé d'accès et votre clé de secret AWS. **Seules les clés d'accès et de secret pour GovCloud et la Chine sont acceptées.**
4. Depuis le côté gauche de la fenêtre, choisissez les services pour lesquels vous souhaitez récupérer des métriques.
5. Si vous le souhaitez, ajoutez des tags à l'ensemble des hosts et des métriques.
6. Vous pouvez surveiller un sous-ensemble d'instances EC2 en saisissant les tags AWS correspondants dans la zone de texte `to hosts with tag`. **Remarque :** cela s'applique également aux volumes EBS associés à une instance.
7. Vous pouvez surveiller un sous-ensemble de Lambdas en saisissant les tags AWS correspondants dans la zone de texte `to Lambdas with tag`.
8. Cliquez sur **Install Integration**.

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
{{% /tab %}}
{{< /tabs >}}

## Collecte de logs

Il existe deux façons d'envoyer des logs de service AWS à Datadog :

- [Destination Kinesis Firehose][71] : utilisez la destination Datadog dans votre flux de diffusion Kinesis Firehose pour transmettre vos logs à Datadog. Nous vous recommandons de procéder de la même façon pour envoyer un volume très élevé de logs depuis CloudWatch.
- [Fonction Lambda du Forwarder][72] : déployez la fonction Lambda du Forwarder Datadog qui s'abonne aux compartiments S3 ou à vos groupes de logs CloudWatch. Transmettez ensuite vos logs à Datadog. Vous **devez** procéder de cette façon pour envoyer de façon asynchrone des traces, des métriques optimisées ou des métriques custom depuis vos fonctions Lambda via des logs. Datadog vous conseille également d'utiliser cette méthode pour envoyer des logs depuis S3 ou depuis d'autres ressources ne prenant pas en charge la diffusion de données vers Kinesis.

## Collecte de métriques

Il existe deux façons d'envoyer des métriques AWS à Datadog :

- [Interrogation des métriques][73] : l'intégration AWS contient une fonctionnalité d'interrogation d'API, qui effectue une analyse métrique par métrique de l'API CloudWatch afin d'extraire les données à envoyer à Datadog. De nouvelles métriques sont extraites toutes les 10 minutes en moyenne.
- [Flux de métriques avec Kinesis Firehose][74] : vous pouvez utiliser Amazon CloudWatch Metric Streams et Amazon Kinesis Data Firehose pour afficher vos métriques avec une latence de deux à trois minutes. Cela requiert une configuration distincte.

## Collecte de ressources

Les produits répertoriés ci-dessous requièrent des métadonnées et des informations de configuration sur des ressources AWS. Pour récupérer ces informations, notamment sur les compartiments S3, les snapshots RDS et les distributions CloudFront ([voir la liste complète des ressources et autorisations][75]), Datadog effectue des appels d'API vers votre compte AWS.

Voici la liste des produits nécessitant la collecte de ressources :
- Cloud Security Posture Management

Configuration :
1. Si vous n'avez pas encore configuré l'intégration AWS pour votre compte AWS, suivez les [étapes requises][76] ci-dessus, et prenez soin d'activer la collecte de ressources lorsque vous y êtes invité.
2. Si vous avez déjà configuré l'intégration AWS pour d'autres produits Datadog, mais que vous n'avez pas encore activé la collecte de ressources, suivez l'une des procédures suivantes :
    1. Méthode automatique (recommandée) - Mise à jour de votre modèle CloudFormation
        1. Dans la console CloudFormation, repérez la pile principale que vous avez utilisée pour installer l'intégration Datadog, puis sélectionnez `Update`.
        2. Sélectionnez `Replace current template`.
        3. Sélectionnez `Amazon S3 URL`, saisissez `https://datadog-cloudformation-template.s3.amazonaws.com/aws/main.yaml`, puis cliquez sur `next`.
        4. Définissez l'option `ResourceCollectionPermissions` sur true, puis cliquez sur `next` sans modifier d'autres paramètres jusqu'à atteindre la page `Review`, qui vous permet de vérifier l'ensemble des changements prévus.
        5. Cochez les deux cases d'acceptation en bas de la page et cliquez sur `Update stack`.
    2. Méthode manuelle
        1. Créez une nouvelle stratégie `DatadogAWSResourceCollectionPolicy` dans votre compte AWS, en lui accordant ces [autorisations][75].
        2. Ajoutez cette nouvelle stratégie au rôle Datadog de votre compte.
3. Accédez au [carré d'intégration AWS dans Datadog][77], puis effectuez les opérations suivantes :
    1. Cliquez sur le compte AWS pour lequel vous souhaitez activer la collecte de ressources.
    2. Accédez à la section **Resource configuration collection** de ce compte, puis cochez la case `Enable resource configuration collection`.
    3. En bas à gauche du carré, cliquez sur `Update Configuration`.

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_web_services" >}}


### Événements

Vous pouvez configurer la collecte d'événements AWS pour chaque service AWS. Consultez la documentation des différents services AWS pour en savoir plus sur la collecte d'événements.

### Tags

Les tags suivants sont recueillis à partir des intégrations AWS. **Remarque** : certains tags s'affichent uniquement pour des métriques spécifiques.

| Intégration            | Clés de tag Datadog                                                                                                                                                                                              |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Toutes                    | `region`                                                                                                                                                                                                      |
| [API Gateway][1]      | `apiid`, `apiname`, `method`, `resource`, `stage`                                                                                                                                                             |
| [App Runner][2]      | `instance`, `serviceid`, `servicename`                                                                                                                                                                       |
| [Auto Scaling][6]    | `autoscalinggroupname`, `autoscaling_group`                                                                                                                                                                   |
| [Billing][7]          | `account_id`, `budget_name`, `budget_type`, `currency`, `servicename`, `time_unit`                                                                                                                            |
| [CloudFront][8]       | `distributionid`                                                                                                                                                                                              |
| [CodeBuild][12]              | `project_name`                                                                                                                                                                                                |
| [CodeDeploy][13]       | `application`, `creator`, `deployment_config`, `deployment_group`, `deployment_option`, `deployment_type`, `status`                                                                                           |
| [Direct Connect][16]    | `connectionid`                                                                                                                                                                                                |
| [DynamoDB][19]         | `globalsecondaryindexname`, `operation`, `streamlabel`, `tablename`                                                                                                                                           |
| [EBS][20]              | `volumeid`, `volume-name`, `volume-type`                                                                                                                                                                      |
| [EC2][21]              | `autoscaling_group`, `availability-zone`, `image`, `instance-id`, `instance-type`, `kernel`, `name`, `security_group_name`                                                                                    |
| [ECS][23]              | `clustername`, `servicename`, `instance_id`                                                                                                                                                                   |
| [EFS][25]              | `filesystemid`                                                                                                                                                                                                |
| [ElastiCache][27]      | `cachenodeid`, `cache_node_type`, `cacheclusterid`, `cluster_name`, `engine`, `engine_version`, `prefered_availability-zone`, `replication_group`                                                             |
| [ElasticBeanstalk][28] | `environmentname`, `enviromentid`                                                                                                                                                                             |
| [ELB][29]              | `availability-zone`, `hostname`, `loadbalancername`, `name`, `targetgroup`                                                                                                                                    |
| [EMR][30]              | `cluster_name`, `jobflowid`                                                                                                                                                                                   |
| [ES][31]               | `dedicated_master_enabled`, `ebs_enabled`, `elasticsearch_version`, `instance_type`, `zone_awareness_enabled`                                                                                                 |
| [Firehose][32]         | `deliverystreamname`                                                                                                                                                                                          |
| [FSx][33]             | `filesystemid`, `filesystemtype`                                                                                                                                                                               |
| [Health][37]           | `event_category`, `status`, `service`                                                                                                                                                                         |
| [IoT][39]              | `actiontype`, `protocol`, `rulename`                                                                                                                                                                          |
| [Kinesis][40]          | `streamname`, `name`, `state`                                                                                                                                                                                 |
| [KMS][41]              | `keyid`                                                                                                                                                                                                       |
| [Lambda][42]           | `functionname`, `resource`, `executedversion`, `memorysize`, `runtime`                                                                                                                                        |
| [Machine Learning][44] | `mlmodelid`, `requestmode`                                                                                                                                                                                    |
| [MQ][49]               | `broker`, `queue`, `topic`                                                                                                                                                                                    |
| [OpsWorks][54]         | `stackid`, `layerid`, `instanceid`                                                                                                                                                                            |
| [Polly][55]            | `operation`                                                                                                                                                                                                   |
| [RDS][56]              | `auto_minor_version_upgrade`, `dbinstanceclass`, `dbclusteridentifier`, `dbinstanceidentifier`, `dbname`, `engine`, `engineversion`, `hostname`, `name`, `publicly_accessible`, `secondary_availability-zone` |
| [Redshift][57]       | `clusteridentifier`, `latency`, `nodeid`, `service_class`, `stage`, `wlmid`                                                                                                                                   |
| [Route 53][59]        | `healthcheckid`                                                                                                                                                                                               |
| [S3][60]             | `bucketname`, `filterid`, `storagetype`                                                                                                                                                                       |
| [SES][62]             | Les clés de tag sont personnalisées dans AWS.                                                                                                                                                                               |
| [SNS][63]              | `topicname`                                                                                                                                                                                                   |
| [SQS][64]              | `queuename`                                                                                                                                                                                                   |
| [VPC][67]              | `nategatewayid`, `vpnid`, `tunnelipaddress`                                                                                                                                                                   |
| [WorkSpaces][69]       | `directoryid`, `workspaceid`                                                                                                                                                                                  |

## Dépannage

### Écart entre vos données dans CloudWatch et Datadog

Il est important de tenir compte des deux distinctions suivantes :

1. Pour les counters AWS, un graphique défini sur « sum » « 1minute » affiche le nombre total d'occurrences en l'espace d'une minute, soit le taux par minute. Datadog affiche les données brutes à partir des valeurs AWS normalisées par seconde, peu importe l'intervalle sélectionné dans AWS. Cela explique pourquoi la valeur affichée dans Datadog peut être plus faible.
2. Les valeurs minimales, maximales et moyennes n'ont généralement pas la même signification dans AWS et dans Datadog. Dans AWS, les latences moyenne, minimale et maximale correspondent à trois métriques distinctes recueillies. Lorsque Datadog récupère des métriques à partir d'AWS CloudWatch, la latence moyenne est transmise sous la forme de séries temporelles distinctes par ELB. Dans Datadog, lorsque vous sélectionnez les valeurs « min », « max » ou « avg », vous définissez les critères de rassemblement de séries temporelles. Par exemple, si vous cherchez à obtenir `system.cpu.idle` sans appliquer de filtre, une série est envoyée pour chaque host qui renvoie cette métrique. Ces séries doivent être combinées pour être représentées graphiquement. À l'inverse, si vous cherchez à obtenir `system.cpu.idle` pour un seul host, aucune agrégation n'est nécessaire. Les valeurs maximale et moyenne sont identiques.

### Métriques en retard

Lorsque vous utilisez l'intégration AWS, Datadog récupère vos métriques via l'API CloudWatch. Il est possible que les données des métriques AWS accusent un léger retard, en raison des contraintes liées à l'API.

Pour commencer, l'API CloudWatch propose uniquement une analyse métrique par métrique afin d'extraire des données. Les API CloudWatch prévoient une limite de débit qui varie en fonction des informations d'authentification, de la région et du service. Les métriques sont transmises par AWS en fonction du niveau du compte. Par exemple, si vous payez pour des « métriques détaillées » dans AWS, vous y avez accès plus rapidement. Ce niveau de service pour les métriques détaillées s'applique également à la granularité. Ainsi, certaines métriques sont transmises toutes les minutes, tandis que d'autres sont envoyées toutes les cinq minutes.

Datadog vous permet de hiérarchiser certaines métriques d'un compte afin de les récupérer en priorité, en fonction de certaines circonstances. Contactez [l'assistance Datadog][79] pour en savoir plus.

Pour obtenir des métriques quasiment en temps réel, installez l'Agent Datadog sur le host. Pour en savoir plus, consultez l'article de blog de Datadog [Tout ce que vous devez savoir pour effectuer une surveillance à partir d'Agents][80] (en anglais).

### Métriques manquantes

L'API CloudWatch renvoie uniquement les métriques avec des points de données. Ainsi, si un ELB ne possède aucune instance liée, aucune métrique associée à cet ELB n'apparaît dans Datadog.

### Nombre aws.elb.healthy_host_count incorrect

Lorsque l'option d'équilibrage des charges entre zones est activée sur un ELB, toutes les instances liées à cet ELB font partie de toutes les zones de disponibilité (pour CloudWatch). Ainsi, si vous possédez deux instances dans 1a et trois dans ab, la métrique affiche cinq instances par zone de disponibilité.
Puisque cela peut s'avérer contre-intuitif, nous avons ajouté de nouvelles métriques, **aws.elb.healthy_host_count_deduped** et **aws.elb.un_healthy_host_count_deduped**, qui affichent le nombre d'instances saines et non saines par zone de disponibilité, que vous ayez activé ou non l'option d'équilibrage des charges entre zones.

### Hosts dupliqués lors de l'installation de l'Agent

Lors de l'installation de l'Agent sur un host AWS, il est possible que des hosts soient dupliqués pendant quelques heures sur la page d'infrastructure si vous avez défini manuellement le hostname dans la configuration de l'Agent. Ces doublons disparaîtront après quelques heures et ne seront pas pris en compte pour la facturation.

[1]: https://docs.datadoghq.com/fr/integrations/amazon_api_gateway/
[2]: https://docs.datadoghq.com/fr/integrations/amazon_app_runner
[3]: https://docs.datadoghq.com/fr/integrations/amazon_appstream/
[4]: https://docs.datadoghq.com/fr/integrations/amazon_appsync/
[5]: https://docs.datadoghq.com/fr/integrations/amazon_athena/
[6]: https://docs.datadoghq.com/fr/integrations/amazon_auto_scaling/
[7]: https://docs.datadoghq.com/fr/integrations/amazon_billing/
[8]: https://docs.datadoghq.com/fr/integrations/amazon_cloudfront/
[9]: https://docs.datadoghq.com/fr/integrations/amazon_cloudhsm/
[10]: https://docs.datadoghq.com/fr/integrations/amazon_cloudsearch/
[11]: https://docs.datadoghq.com/fr/integrations/amazon_cloudtrail/
[12]: https://docs.datadoghq.com/fr/integrations/amazon_codebuild/
[13]: https://docs.datadoghq.com/fr/integrations/amazon_codedeploy/
[14]: https://docs.datadoghq.com/fr/integrations/amazon_cognito/
[15]: https://docs.datadoghq.com/fr/integrations/amazon_connect/
[16]: https://docs.datadoghq.com/fr/integrations/amazon_directconnect/
[17]: https://docs.datadoghq.com/fr/integrations/amazon_dms/
[18]: https://docs.datadoghq.com/fr/integrations/amazon_documentdb/
[19]: https://docs.datadoghq.com/fr/integrations/amazon_dynamodb/
[20]: https://docs.datadoghq.com/fr/integrations/amazon_ebs/
[21]: https://docs.datadoghq.com/fr/integrations/amazon_ec2/
[22]: https://docs.datadoghq.com/fr/integrations/amazon_ec2_spot/
[23]: https://docs.datadoghq.com/fr/integrations/amazon_ecs/
[24]: https://docs.datadoghq.com/fr/integrations/amazon_efs/
[25]: https://docs.datadoghq.com/fr/integrations/amazon_eks/
[26]: https://docs.datadoghq.com/fr/integrations/amazon_elastic_transcoder/
[27]: https://docs.datadoghq.com/fr/integrations/amazon_elasticache/
[28]: https://docs.datadoghq.com/fr/integrations/amazon_elasticbeanstalk/
[29]: https://docs.datadoghq.com/fr/integrations/amazon_elb/
[30]: https://docs.datadoghq.com/fr/integrations/amazon_emr/
[31]: https://docs.datadoghq.com/fr/integrations/amazon_es/
[32]: https://docs.datadoghq.com/fr/integrations/amazon_firehose/
[33]: https://docs.datadoghq.com/fr/integrations/amazon_fsx/
[34]: https://docs.datadoghq.com/fr/integrations/amazon_gamelift/
[35]: https://docs.datadoghq.com/fr/integrations/amazon_glue/
[36]: https://docs.datadoghq.com/fr/integrations/amazon_guardduty/
[37]: https://docs.datadoghq.com/fr/integrations/amazon_health/
[38]: https://docs.datadoghq.com/fr/integrations/amazon_inspector/
[39]: https://docs.datadoghq.com/fr/integrations/amazon_iot/
[40]: https://docs.datadoghq.com/fr/integrations/amazon_kinesis/
[41]: https://docs.datadoghq.com/fr/integrations/amazon_kms/
[42]: https://docs.datadoghq.com/fr/integrations/amazon_lambda/
[43]: https://docs.datadoghq.com/fr/integrations/amazon_lex/
[44]: https://docs.datadoghq.com/fr/integrations/amazon_machine_learning/
[45]: https://docs.datadoghq.com/fr/integrations/amazon_mediaconnect/
[46]: https://docs.datadoghq.com/fr/integrations/amazon_mediaconvert/
[47]: https://docs.datadoghq.com/fr/integrations/amazon_mediapackage/
[48]: https://docs.datadoghq.com/fr/integrations/amazon_mediatailor/
[49]: https://docs.datadoghq.com/fr/integrations/amazon_mq/
[50]: https://docs.datadoghq.com/fr/integrations/amazon_msk/
[51]: https://docs.datadoghq.com/fr/integrations/amazon_nat_gateway/
[52]: https://docs.datadoghq.com/fr/integrations/amazon_neptune/
[53]: https://docs.datadoghq.com/fr/integrations/amazon_network_firewall/
[54]: https://docs.datadoghq.com/fr/integrations/amazon_ops_works/
[55]: https://docs.datadoghq.com/fr/integrations/amazon_polly/
[56]: https://docs.datadoghq.com/fr/integrations/amazon_rds/
[57]: https://docs.datadoghq.com/fr/integrations/amazon_redshift/
[58]: https://docs.datadoghq.com/fr/integrations/amazon_rekognition/
[59]: https://docs.datadoghq.com/fr/integrations/amazon_route53/
[60]: https://docs.datadoghq.com/fr/integrations/amazon_s3/
[61]: https://docs.datadoghq.com/fr/integrations/amazon_sagemaker/
[62]: https://docs.datadoghq.com/fr/integrations/amazon_ses/
[63]: https://docs.datadoghq.com/fr/integrations/amazon_sns/
[64]: https://docs.datadoghq.com/fr/integrations/amazon_sqs/
[65]: https://docs.datadoghq.com/fr/integrations/amazon_storage_gateway/
[66]: https://docs.datadoghq.com/fr/integrations/amazon_swf/
[67]: https://docs.datadoghq.com/fr/integrations/amazon_vpc/
[68]: https://docs.datadoghq.com/fr/integrations/amazon_waf/
[69]: https://docs.datadoghq.com/fr/integrations/amazon_workspaces/
[70]: https://docs.datadoghq.com/fr/integrations/amazon_xray/
[71]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[72]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[73]: /fr/integrations/faq/cloud-metric-delay/#aws
[74]: /fr/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/?
[75]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#datadog-resource-collection-policy
[76]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=roledelegation#setup
[77]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[78]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/amazon_web_services_metadata.csv
[79]: https://docs.datadoghq.com/fr/help/
[80]: http://www.datadoghq.com/blog/dont-fear-the-agent