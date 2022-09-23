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
doc_link: https://docs.datadoghq.com/integrations/amazon_web_services/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-aws-control-plane-api-usage-metrics/
  tag: Blog
  text: Surveiller les métriques d'utilisation des API de plan de contrôle AWS dans
    Datadog
git_integration_title: amazon_web_services
has_logo: true
integration_id: amazon-web-services
integration_title: AWS
integration_version: ''
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

- Consulter des mises à jour automatiques de statut AWS dans votre flux d'événements
- Obtenir des métriques CloudWatch pour les hosts EC2 sans installer l'Agent
- Taguer vos hosts EC2 avec des informations propres à EC2
- Consulter les événements de maintenance EC2 planifiés dans votre flux
- Recueillir des métriques et des événements CloudWatch depuis de nombreux autres produits AWS
- Consulter des alarmes CloudWatch dans votre flux d'événements

Pour profiter au plus vite de l'intégration AWS, consultez le [guide de prise en main d'AWS][1].

<div class="alert alert-warning">
L'intégration Amazon Web Services de Datadog est conçue pour recueillir <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html">TOUTES les métriques en provenance de CloudWatch</a>. Datadog s'efforce de mettre régulièrement à jour sa documentation afin d'inclure chaque sous-intégration. Toutefois, les métriques et les services proposés par les différents services cloud étant en permanente évolution, il est possible que la liste ne soit pas à jour.
</div>

| Intégration                             | Description                                                                            |
| --------------------------------------- | -------------------------------------------------------------------------------------- |
| [API Gateway][2]                        | Créez, publiez, maintenez et sécurisez des API                                             |
| [App Runner][3]                       | Un service qui simplifie, accélère et rentabilise le déploiement de code depuis les sources ou d'images de conteneur.         |
| [Appstream][4]                          | Streaming d'applications entièrement géré sur AWS                                             |
| [AppSync][5]                            | Un service GraphQL offrant des fonctionnalités de synchronisation des données en temps réel et de programmation hors ligne |
| [Athena][6]                             | Service de requêtes interactif sans serveur                                                   |
| [Auto Scaling][7]                        | Configuration du dimensionnement d'EC2                                                                     |
| [Billing][8]                            | Facturation et budgets                                                                    |
| [CloudFront][9]                         | Réseau de diffusion de contenu local                                                         |
| [CloudHSM][10]                           | Module de sécurité matérielle (HSM) géré                                                 |
| [CloudSearch][11]                        | Accès aux fichiers de log et aux appels d'API AWS                                                  |
| [CloudTrail][12]                        | Accès aux fichiers de log et aux appels d'API AWS                                                  |
| [CodeBuild][13]                         | Service de génération entièrement géré                                                            |
| [CodeDeploy][14]                        | Automatisation des déploiements de code                                                              |
| [Cognito][15]                           | Inscription et connexion utilisateur sécurisées                                                        |
| [Connect][16]                           | Un centre de contacts clients fonctionnant en libre-service et basé sur le cloud                                     |
| [Direct Connect][17]                    | Connexion réseau dédiée à AWS                                                    |
| [DMS][18]                               | Service de migration de base de données                                                             |
| [DocumentDB][19]                        | Base de données compatible avec MongoDB                                                            |
| [DynamoDB][20]                         | Base de données NoSQL                                                                         |
| [EBS (Elastic Block Store)][21]         | Volumes de stockage permanent par bloc                                                 |
| [EC2 (Elastic Cloud Compute)][22]       | Capacité de calcul redimensionnable dans le cloud                                                |
| [EC2 Spot][23]                          | Exploitation des capacités inutilisées d'EC2                                                  |
| [ECS (Elastic Container Service)][24]   | Service de gestion de conteneurs prenant en charge les conteneurs Docker                           |
| [EFS (Elastic File System)][25]         | Stockage de fichiers partagés                                                                    |
| [EKS][26]                               | Elastic Container Service pour Kubernetes                                               |
| [Elastic Transcoder][27]                | Transcodage de fichiers multimédias et de vidéos dans le cloud                                               |
| [ElastiCache][28]                       | Cache en mémoire dans le cloud                                                           |
| [Elastic Beanstalk][29]                 | Service pour le déploiement et le dimensionnement d'applications et de services Web                        |
| [ELB (Elastic Load Balancing)][30]      | Distribution du trafic entrant d'applications sur plusieurs instances Amazon EC2          |
| [EMR (Elastic Map Reduce)][31]          | Traitement de données avec Hadoop                                                           |
| [ES (Elasticsearch)][32]                | Déploiement, utilisation et mise à l'échelle des clusters Elasticsearch                                      |
| [Firehose][33]                          | Capture et chargement de données de streaming                                                        |
| [FSx][34]                              | Service géré de stockage évolutif pour Windows File Server ou Lustre.          |
| [Gamelift][35]                          | Hébergement de serveurs de jeux dédiés                                                          |
| [Glue][36]                              | Extraction, transformation et chargement de données pour l'analyse                                        |
| [GuardDuty][37]                         | Détection des menaces intelligente                                                           |
| [Health][38]                            | Visibilité sur l'état de vos ressources, services et comptes AWS                |
| [Inspector][39]                         | Évaluation automatisée de la sécurité                                                          |
| [IoT (Internet of Things)][40]          | Connexion d'appareils IoT à des services cloud                                                |
| [Keyspaces][41]                        | Service de base de données géré compatible avec Apache Cassandra                                   |
| [Kinesis][42]                           | Service de traitement en temps réel de grands flux de données distribués                    |
| [KMS (Key Management Service)][43]      | Création et contrôle des clés de chiffrement                                                     |
| [Lambda][44]                            | Service de calcul sans serveur                                                                   |
| [Lex][45]                               | Création de bots de discussion                                                                |
| [Machine Learning][46]                  | Création des modèles d'apprentissage automatique                                                         |
| [MediaConnect][47]                      | Transport vidéo en direct                                                               |
| [MediaConvert][48]                      | Traitement vidéo pour la diffusion et la distribution multi-écran                                |
| [MediaPackage][49]                      | Préparation et protection de vidéos en vue de leur diffusion sur Internet                               |
| [MediaTailor][50]                       | Insertion évolutive de publicités côté serveur                                                      |
| [MQ][51]                                | Agent de message géré pour ActiveMQ                                                    |
| [Managed Streaming for Kafka][52]       | Conception et exécution d'applications qui utilisent Kafka pour le traitement des données de streaming             |
| [Passerelle NAT][53]                       | Autoriser les instances d'un sous-réseau privé à se connecter à Internet ou à d'autres services AWS  |
| [Neptune][54]                           | Service de base de données orienté graph fiable et rapide conçu pour le cloud                                      |
| [Network Firewall][55]                 | Filtrage du trafic dans le périmètre d'un VPC                                               |
| [OpsWorks][56]                          | Gestion de la configuration                                                               |
| [Polly][57]                             | Service de synthèse vocale                                                                    |
| [RDS (Relational Database Service)][58] | Base de données relationnelle dans le cloud                                                       |
| [Redshift][59]                          | Solution d'entrepôt de données                                                                |
| [Rekognition][60]                       | Analyse d'images et de vidéos pour les applications                                              |
| [Route 53][61]                          | Gestion de noms de domaine et de trafic avec surveillance de la disponibilité                                |
| [S3 (Simple Storage Service)][62]       | Service de stockage dans le cloud hautement disponible et évolutif                                    |
| [SageMaker][63]                         | Algorithmes et modèles d'apprentissage automatique                                                 |
| [SES (Simple Email Service)][64]        | Service économique d'envoi d'e-mails                                    |
| [SNS (Simple Notification System)][65]  | Alertes et notifications                                                               |
| [SQS (Simple Queue Service)][66]        | Service de file d'attente de messagerie                                                                |
| [Storage Gateway][67]                   | Stockage cloud hybride                                                                   |
| [SWF (Simple Workflow Service)][68]     | Gestion de workflows dans le cloud                                                              |
| [VPC (Virtual Private Cloud)][69]       | Lancement de ressources AWS dans un réseau virtuel                                            |
| [Web Application Firewall (WAF)][70]    | Protection des applications Web contre les failles Web les plus courantes                                      |
| [WorkSpaces][71]                        | Service de bureau sécurisé                                                       |
| [X-Ray][72]                             | Création de traces pour les applications distribuées                                                   |

## Configuration

{{< site-region region="gov" >}}
<div class="alert alert-warning">La délégation des rôles AWS n'est pas prise en charge par le site gouvernemental Datadog. En effet, il nécessite l'utilisation de <a href="?tab=clésdaccèsgovcloudouchineuniquement#configuration">clés d'accès</a>.</div>
{{< /site-region >}}

Choisissez l'une des méthodes suivantes pour intégrer vos comptes AWS dans Datadog afin de collecter des métriques, des traces et des logs :

- [Délégation des rôles (Automatique)](?tab=roledelegation#automatic---cloudformation) : utilisez un modèle CloudFormation pour configurer automatiquement le rôle AWS (conseillé).
- [Délégation des rôles (Manuelle)](?tab=délégationdesrôles#manuelle) : Créez manuellement les rôles nécessaires et copiez les identifiants requis dans le formulaire correspondant.
- [Clés d'accès](?tab=clésdaccèsgovcloudouchineuniquement#configuration) : Utilisé pour GovCloud ou la Chine uniquement

{{< tabs >}}
{{% tab "Délégation des rôles" %}}

Choisissez la méthode que vous souhaitez utiliser pour configurer le rôle AWS nécessaire. Nous vous conseillons d'utiliser CloudFormation.

### Automatique - CloudFormation

Pour configurer CloudFormation pour AWS, consultez le [guide de prise en main d'AWS][1].

### Méthode manuelle

#### AWS

1. Créez un rôle dans la [console IAM][2] d'AWS.
2. Sélectionnez le type de rôle `Another AWS account`.
3. Pour Account ID, saisissez `464622532012` (identifiant de compte Datadog). Cela signifie que vous accordez à Datadog un accès en lecture seule à vos données AWS.
4. Sélectionnez `Require external ID` et saisissez l'ID généré dans le [carré d'intégration AWS][3]. Assurez-vous de ne pas cocher **Require MFA**. _Pour en savoir plus sur l'ID externe, consultez le [guide de l'utilisateur d'IAM][4]_.
5. Cliquez sur `Next: Permissions`.
6. Si vous avez déjà créé la stratégie, sélectionnez-la sur cette page, puis passez à l'étape 12. Si ce n'est pas le cas, cliquez sur `Create Policy` afin d'ouvrir une nouvelle fenêtre.
7. Sélectionnez l'onglet `JSON`. Afin de profiter de toutes les intégrations AWS proposées par Datadog, utilisez l'[extrait de stratégie](#strategie-iam-aws-datadog) sous la zone de texte. Étant donné que d'autres composants sont ajoutés à une intégration, ces autorisations peuvent évoluer.
8. Cliquez sur `Next: Tags` et `Review policy`.
9. Nommez la stratégie `DatadogAWSIntegrationPolicy` ou utilisez le nom de votre choix, et saisissez une description pertinente.
10. Cliquez sur `Create policy`, puis fermez cette fenêtre.
11. Depuis la fenêtre « Create role », actualisez la liste des stratégies et sélectionnez celle que vous venez de créer.
12. (Facultatif) : ajoutez les autorisations requises pour utiliser la [solution Cloud Security Posture Management][5] de Datadog en ajoutant la [stratégie SecurityAudit AWS][6] à votre rôle.
13. Cliquez sur `Next: Tags` et `Next: Review`.
14. Saisissez le nom `DatadogAWSIntegrationRole` ou un nom similaire pour le rôle, ainsi qu'une description pertinente. 
15. Cliquez sur `Create Role`.

**Étape facultative** : si vous utilisez Terraform, configurez votre stratégie IAM Datadog à l'aide de [l'intégration AWS avec Terraform][7].

#### Datadog

1. Revenez au carré d'intégration Datadog/AWS.
2. Sélectionnez l'onglet **Role Delegation**, puis cliquez sur **Manually**.
3. Saisissez votre ID de compte AWS **sans tiret**, p. ex. `123456789012`. Votre ID de compte est indiqué dans l'ARN du rôle créé durant l'[installation de l'intégration AWS](#aws).
4. Saisissez le nom du rôle créé. **Remarque** : le nom de rôle saisi dans le carré d'intégration est sensible à la casse et doit correspondre parfaitement au nom du rôle créé sur AWS.
5. Si le message d'erreur [Datadog is not authorized to perform sts:AssumeRole][8] s'affiche, vérifiez que la valeur du paramètre `sts:ExternalId:` de la stratégie de confiance AWS correspond à celle du paramètre `AWS External ID` généré dans le carré d'intégration Datadog/AWS.
6. Depuis le côté gauche de la fenêtre, choisissez les services AWS pour lesquels vous souhaitez récupérer des métriques.
7. Vous pouvez également cocher la case `Enable resource configuration collection` pour activer la [collecte de ressources][9] (requise pour certains produits et certaines fonctionnalités).
8. Si vous le souhaitez, ajoutez des tags à l'ensemble des hosts et des métriques.
9. Vous pouvez surveiller un sous-ensemble d'instances EC2 en saisissant les tags AWS correspondants dans la zone de texte `to hosts with tag`. **Remarque :** cela s'applique également aux volumes EBS associés à une instance.
10. Vous pouvez surveiller un sous-ensemble de Lambdas en saisissant les tags AWS correspondants dans la zone de texte `to Lambdas with tag`.
11. Cliquez sur **Install Integration**.

#### Stratégie AWS IAM Datadog

Les autorisations énumérées ci-dessous sont incluses dans le document de stratégie à l'aide de wildcards comme `List*` et `Get*`. Si vous avez besoin de stratégies strictes, utilisez les noms d'action complets indiqués et consultez la documentation sur l'API Amazon pour les services requis.

**Remarque** : la solution Cloud Security Posture Management de Datadog requiert la [politique SecurityAudit][6] d'AWS ainsi que [toutes les autorisations][10], car elle surveille les configurations de vos ressources AWS.

##### Toutes les autorisations

Si vous ne souhaitez pas accorder toutes les autorisations à la fois, il est conseillé d'utiliser au strict minimum les stratégies **AmazonEC2ReadOnlyAccess** et **CloudWatchReadOnlyAccess**. Pour en savoir plus sur les autorisations, consultez la rubrique [Autorisations de base](#autorisations-de-base).

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "apigateway:GET",
                "autoscaling:Describe*",
                "backup:List*",
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
                "support:DescribeTrustedAdvisor*",
                "support:RefreshTrustedAdvisorCheck",
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

L'intégration Datadog/Amazon Web Services récupère des données à partir d'Amazon CloudWatch. Votre document de stratégie doit au minimum autoriser les actions suivantes :

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "cloudwatch:Get*",
                "cloudwatch:List*",
                "ec2:Describe*",
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
| `support:*`               | Ajoute des métriques à propos des limites de service.<br>Nécessite un accès complet, en raison des [limites AWS][11]. |
| `tag:getResources`         | Récupère des tags personnalisés en fonction du type de ressource.                                                            |
| `tag:getTagKeys`           | Récupère des clés de tag selon les régions d'un compte AWS.                                                |
| `tag:getTagValues`         | Récupère les valeurs de tag selon les régions d'un compte AWS.                                              |

L'API Resource Group Tagging vise notamment à réduire le nombre d'appels API requis pour recueillir des tags personnalisés. Pour en savoir plus, consultez la documentation relative aux [stratégies sur les tags][12] (en anglais) sur le site Web d'AWS.

[1]: https://docs.datadoghq.com/fr/getting_started/integrations/aws/
[2]: https://console.aws.amazon.com/iam/home#/roles
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[4]: http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[5]: /fr/security_platform/cspm
[6]: https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit
[7]: /fr/integrations/faq/aws-integration-with-terraform
[8]: /fr/integrations/faq/error-datadog-not-authorized-sts-assume-role/#pagetitle
[9]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#resource-collection
[10]: /fr/integrations/amazon_web_services/#all-permissions
[11]: https://docs.aws.amazon.com/awssupport/latest/user/Welcome.html#trustedadvisorsection
[12]: http://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/Welcome.html
{{% /tab %}}

{{% tab "Clés d'accès (GovCloud ou Chine uniquement)" %}}

#### AWS

1. Dans votre console AWS, configurez l'utilisateur IAM qui sera utilisé par l'intégration Datadog.
2. Générez une clé d'accès et une clé de secret pour l'utilisateur IAM de l'intégration Datadog.

Pour en savoir plus, consultez la section [Procédure d'utilisation d'un ID externe lorsque vous accordez l'accès à vos ressources AWS à un tiers][1] de la documentation AWS.

#### Datadog

1. Ouvrez le [carré d'intégration AWS][2].
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

- [Destination Kinesis Firehose][73] : utilisez la destination Datadog dans votre flux de diffusion Kinesis Firehose pour transmettre vos logs à Datadog. Il est conseillé de procéder de la même façon pour envoyer un volume très élevé de logs depuis CloudWatch.
- [Fonction Lambda du Forwarder][74] : déployez la fonction Lambda du Forwarder Datadog qui s'abonne aux compartiments S3 ou à vos groupes de logs CloudWatch. Transmettez ensuite vos logs à Datadog. Vous **devez** procéder de cette façon pour envoyer de façon asynchrone des traces, des métriques optimisées ou des métriques custom depuis vos fonctions Lambda via des logs. Datadog vous conseille également d'utiliser cette méthode pour envoyer des logs depuis S3 ou depuis d'autres ressources ne prenant pas en charge la diffusion de données vers Kinesis.

## Collecte de métriques

Il existe deux façons d'envoyer des métriques AWS à Datadog :

- [Interrogation des métriques][75] : l'intégration AWS contient une fonctionnalité d'interrogation d'API. Celle-ci effectue une analyse métrique par métrique de l'API CloudWatch afin d'extraire les données à envoyer à Datadog. De nouvelles métriques sont extraites toutes les 10 minutes en moyenne.
- [Flux de métriques avec Kinesis Firehose][76] : vous pouvez utiliser les flux de métriques Amazon CloudWatch et Amazon Kinesis Data Firehose pour visualiser vos métriques. **Remarque** : cette méthode implique une latence de deux à trois minutes, et requiert une configuration distincte.

## Collecte de ressources

Certains produits Datadog tirent parti d'informations relatives à la configuration de vos ressources AWS (tels que les compartiments S3, les snapshots RDS et les distributions CloudFront). Datadog récupère ces informations en effectuant des appels API en lecture seule vers votre compte AWS.

### Cloud Security Posture Management

#### Configuration

Si vous n'avez pas encore configuré l'intégration AWS pour votre compte AWS, suivez les [étapes requises][77] ci-dessus, et prenez soin d'activer la collecte de ressources lorsque vous y êtes invité.

Si vous avez déjà configuré l'intégration AWS pour d'autres produits Datadog, mais que vous n'avez pas encore activé la collecte de ressources, suivez l'une des procédures suivantes :

1. Méthode automatique - Mise à jour de votre modèle CloudFormation
    1. Dans la console CloudFormation, repérez la pile principale que vous avez utilisée pour installer l'intégration Datadog, puis sélectionnez `Update`.
    2. Sélectionnez `Replace current template`.
    3. Sélectionnez `Amazon S3 URL`, saisissez `https://datadog-cloudformation-template.s3.amazonaws.com/aws/main.yaml`, puis cliquez sur `next`.
    4. Définissez l'option `CloudSecurityPostureManagementPermissions` sur true, puis cliquez sur `next` sans modifier d'autres paramètres jusqu'à atteindre la page `Review`, qui vous permet de vérifier l'ensemble des changements prévus.
    5. Cochez les deux cases d'acceptation en bas de la page et cliquez sur `Update stack`.
2. Méthode manuelle
    1. Associez la stratégie `SecurityAudit` gérée d'AWS à votre rôle AWS IAM Datadog. Cette stratégie est disponible dans la [console AWS][78].
2. Accédez au [carré d'intégration AWS dans Datadog][79], puis effectuez les opérations suivantes :
    1. Cliquez sur le compte AWS pour lequel vous souhaitez activer la collecte de ressources.
    2. Accédez à la section **Resource collection** de ce compte, puis cochez la case `Route resource data to the Cloud Security Posture Management product`.
    3. En bas à gauche du carré, cliquez sur `Update Configuration`.

## Collecte d'alarmes

Vous pouvez envoyer des alarmes AWS CloudWatch au flux d'événements Datadog de deux façons différentes :

- Récupération d'alarmes : cette fonctionnalité est fournie par défaut avec l'intégration AWS et permet de récupérer les alarmes liées aux métriques par l'intermédiaire de l'API [DescribeAlarmHistory][80]. Si vous utilisez cette méthode, vos alarmes sont classées sous la source d'événements `Amazon Web Services`. **Remarque** : le crawler ne récupère pas les alarmes composites. 
- Rubrique SNS : pour visualiser toutes vos alarmes AWS CloudWatch dans votre flux d'événements, abonnez les alarmes à une rubrique SNS, puis transférez les messages SNS à Datadog. Pour découvrir comment vous pouvez recevoir des messages SNS en tant qu'événements dans Datadog, consultez la rubrique [Recevoir les messages de SNS][81]. Si vous utilisez cette méthode, vos alarmes sont classées sous la source d'événements `Amazon SNS`.

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_web_services" >}}


### Événements

La collecte d'événements AWS se configure au niveau de chaque service AWS. Consultez la [documentation du service AWS pertinent][83] pour obtenir plus d'informations sur la collecte d'événements.

### Tags

Les tags suivants sont recueillis à l'aide de l'intégration AWS. **Remarque** : certains tags s'affichent uniquement pour des métriques spécifiques.

| Intégration            | Clés de tag Datadog                                                                                                                                                                                              |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Toutes                    | `region`                                                                                                                                                                                                      |
| [API Gateway][2]      | `apiid`, `apiname`, `method`, `resource`, `stage`                                                                                                                                                             |
| [App Runner][3]      | `instance`, `serviceid`, `servicename`                                                                                                                                                                       |
| [Auto Scaling][7]    | `autoscalinggroupname`, `autoscaling_group`                                                                                                                                                                   |
| [Billing][8]          | `account_id`, `budget_name`, `budget_type`, `currency`, `servicename`, `time_unit`                                                                                                                            |
| [CloudFront][9]       | `distributionid`                                                                                                                                                                                              |
| [CodeBuild][13]              | `project_name`                                                                                                                                                                                                |
| [CodeDeploy][14]       | `application`, `creator`, `deployment_config`, `deployment_group`, `deployment_option`, `deployment_type`, `status`                                                                                           |
| [Direct Connect][17]    | `connectionid`                                                                                                                                                                                                |
| [DynamoDB][20]         | `globalsecondaryindexname`, `operation`, `streamlabel`, `tablename`                                                                                                                                           |
| [EBS][21]              | `volumeid`, `volume-name`, `volume-type`                                                                                                                                                                      |
| [EC2][22]              | `autoscaling_group`, `availability-zone`, `image`, `instance-id`, `instance-type`, `kernel`, `name`, `security_group_name`                                                                                    |
| [ECS][24]              | `clustername`, `servicename`, `instance_id`                                                                                                                                                                   |
| [EFS][26]              | `filesystemid`                                                                                                                                                                                                |
| [ElastiCache][28]      | `cachenodeid`, `cache_node_type`, `cacheclusterid`, `cluster_name`, `engine`, `engine_version`, `preferred_availability-zone`, `replication_group`                                                             |
| [Elastic Beanstalk][29] | `environmentname`, `enviromentid`                                                                                                                                                                             |
| [ELB][30]              | `availability-zone`, `hostname`, `loadbalancername`, `name`, `targetgroup`                                                                                                                                    |
| [EMR][31]              | `cluster_name`, `jobflowid`                                                                                                                                                                                   |
| [ES][32]               | `dedicated_master_enabled`, `ebs_enabled`, `elasticsearch_version`, `instance_type`, `zone_awareness_enabled`                                                                                                 |
| [Firehose][33]         | `deliverystreamname`                                                                                                                                                                                          |
| [FSx][34]             | `filesystemid`, `filesystemtype`                                                                                                                                                                               |
| [Health][38]           | `event_category`, `status`, `service`                                                                                                                                                                         |
| [IoT][40]              | `actiontype`, `protocol`, `rulename`                                                                                                                                                                          |
| [Kinesis][42]          | `streamname`, `name`, `state`                                                                                                                                                                                 |
| [KMS][43]              | `keyid`                                                                                                                                                                                                       |
| [Lambda][44]           | `functionname`, `resource`, `executedversion`, `memorysize`, `runtime`                                                                                                                                        |
| [Machine Learning][46] | `mlmodelid`, `requestmode`                                                                                                                                                                                    |
| [MQ][51]               | `broker`, `queue`, `topic`                                                                                                                                                                                    |
| [OpsWorks][56]         | `stackid`, `layerid`, `instanceid`                                                                                                                                                                            |
| [Polly][57]            | `operation`                                                                                                                                                                                                   |
| [RDS][58]              | `auto_minor_version_upgrade`, `dbinstanceclass`, `dbclusteridentifier`, `dbinstanceidentifier`, `dbname`, `engine`, `engineversion`, `hostname`, `name`, `publicly_accessible`, `secondary_availability-zone` |
| [RDS Proxy][84]       | `proxyname`, `target`, `targetgroup`, `targetrole`                                                                                                                                                                                                  |
| [Redshift][59]       | `clusteridentifier`, `latency`, `nodeid`, `service_class`, `stage`, `wlmid`                                                                                                                                   |
| [Route 53][61]        | `healthcheckid`                                                                                                                                                                                               |
| [S3][62]             | `bucketname`, `filterid`, `storagetype`                                                                                                                                                                       |
| [SES][64]             | Les clés de tag sont personnalisées dans AWS.                                                                                                                                                                               |
| [SNS][65]              | `topicname`                                                                                                                                                                                                   |
| [SQS][66]              | `queuename`                                                                                                                                                                                                   |
| [VPC][69]              | `nategatewayid`, `vpnid`, `tunnelipaddress`                                                                                                                                                                   |
| [WorkSpaces][71]       | `directoryid`, `workspaceid`                                                                                                                                                                                  |

### Checks de service
{{< get-service-checks-from-git "amazon_web_services" >}}


## Dépannage

Consultez la section [Dépannage de l'intégration AWS][86] pour résoudre les problèmes liés à l'intégration AWS.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/getting_started/integrations/aws/
[2]: https://docs.datadoghq.com/fr/integrations/amazon_api_gateway/
[3]: https://docs.datadoghq.com/fr/integrations/amazon_app_runner
[4]: https://docs.datadoghq.com/fr/integrations/amazon_appstream/
[5]: https://docs.datadoghq.com/fr/integrations/amazon_appsync/
[6]: https://docs.datadoghq.com/fr/integrations/amazon_athena/
[7]: https://docs.datadoghq.com/fr/integrations/amazon_auto_scaling/
[8]: https://docs.datadoghq.com/fr/integrations/amazon_billing/
[9]: https://docs.datadoghq.com/fr/integrations/amazon_cloudfront/
[10]: https://docs.datadoghq.com/fr/integrations/amazon_cloudhsm/
[11]: https://docs.datadoghq.com/fr/integrations/amazon_cloudsearch/
[12]: https://docs.datadoghq.com/fr/integrations/amazon_cloudtrail/
[13]: https://docs.datadoghq.com/fr/integrations/amazon_codebuild/
[14]: https://docs.datadoghq.com/fr/integrations/amazon_codedeploy/
[15]: https://docs.datadoghq.com/fr/integrations/amazon_cognito/
[16]: https://docs.datadoghq.com/fr/integrations/amazon_connect/
[17]: https://docs.datadoghq.com/fr/integrations/amazon_directconnect/
[18]: https://docs.datadoghq.com/fr/integrations/amazon_dms/
[19]: https://docs.datadoghq.com/fr/integrations/amazon_documentdb/
[20]: https://docs.datadoghq.com/fr/integrations/amazon_dynamodb/
[21]: https://docs.datadoghq.com/fr/integrations/amazon_ebs/
[22]: https://docs.datadoghq.com/fr/integrations/amazon_ec2/
[23]: https://docs.datadoghq.com/fr/integrations/amazon_ec2_spot/
[24]: https://docs.datadoghq.com/fr/integrations/amazon_ecs/
[25]: https://docs.datadoghq.com/fr/integrations/amazon_efs/
[26]: https://docs.datadoghq.com/fr/integrations/amazon_eks/
[27]: https://docs.datadoghq.com/fr/integrations/amazon_elastic_transcoder/
[28]: https://docs.datadoghq.com/fr/integrations/amazon_elasticache/
[29]: https://docs.datadoghq.com/fr/integrations/amazon_elasticbeanstalk/
[30]: https://docs.datadoghq.com/fr/integrations/amazon_elb/
[31]: https://docs.datadoghq.com/fr/integrations/amazon_emr/
[32]: https://docs.datadoghq.com/fr/integrations/amazon_es/
[33]: https://docs.datadoghq.com/fr/integrations/amazon_firehose/
[34]: https://docs.datadoghq.com/fr/integrations/amazon_fsx/
[35]: https://docs.datadoghq.com/fr/integrations/amazon_gamelift/
[36]: https://docs.datadoghq.com/fr/integrations/amazon_glue/
[37]: https://docs.datadoghq.com/fr/integrations/amazon_guardduty/
[38]: https://docs.datadoghq.com/fr/integrations/amazon_health/
[39]: https://docs.datadoghq.com/fr/integrations/amazon_inspector/
[40]: https://docs.datadoghq.com/fr/integrations/amazon_iot/
[41]: https://docs.datadoghq.com/fr/integrations/amazon_keyspaces/
[42]: https://docs.datadoghq.com/fr/integrations/amazon_kinesis/
[43]: https://docs.datadoghq.com/fr/integrations/amazon_kms/
[44]: https://docs.datadoghq.com/fr/integrations/amazon_lambda/
[45]: https://docs.datadoghq.com/fr/integrations/amazon_lex/
[46]: https://docs.datadoghq.com/fr/integrations/amazon_machine_learning/
[47]: https://docs.datadoghq.com/fr/integrations/amazon_mediaconnect/
[48]: https://docs.datadoghq.com/fr/integrations/amazon_mediaconvert/
[49]: https://docs.datadoghq.com/fr/integrations/amazon_mediapackage/
[50]: https://docs.datadoghq.com/fr/integrations/amazon_mediatailor/
[51]: https://docs.datadoghq.com/fr/integrations/amazon_mq/
[52]: https://docs.datadoghq.com/fr/integrations/amazon_msk/
[53]: https://docs.datadoghq.com/fr/integrations/amazon_nat_gateway/
[54]: https://docs.datadoghq.com/fr/integrations/amazon_neptune/
[55]: https://docs.datadoghq.com/fr/integrations/amazon_network_firewall/
[56]: https://docs.datadoghq.com/fr/integrations/amazon_ops_works/
[57]: https://docs.datadoghq.com/fr/integrations/amazon_polly/
[58]: https://docs.datadoghq.com/fr/integrations/amazon_rds/
[59]: https://docs.datadoghq.com/fr/integrations/amazon_redshift/
[60]: https://docs.datadoghq.com/fr/integrations/amazon_rekognition/
[61]: https://docs.datadoghq.com/fr/integrations/amazon_route53/
[62]: https://docs.datadoghq.com/fr/integrations/amazon_s3/
[63]: https://docs.datadoghq.com/fr/integrations/amazon_sagemaker/
[64]: https://docs.datadoghq.com/fr/integrations/amazon_ses/
[65]: https://docs.datadoghq.com/fr/integrations/amazon_sns/
[66]: https://docs.datadoghq.com/fr/integrations/amazon_sqs/
[67]: https://docs.datadoghq.com/fr/integrations/amazon_storage_gateway/
[68]: https://docs.datadoghq.com/fr/integrations/amazon_swf/
[69]: https://docs.datadoghq.com/fr/integrations/amazon_vpc/
[70]: https://docs.datadoghq.com/fr/integrations/amazon_waf/
[71]: https://docs.datadoghq.com/fr/integrations/amazon_workspaces/
[72]: https://docs.datadoghq.com/fr/integrations/amazon_xray/
[73]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[74]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[75]: /fr/integrations/faq/cloud-metric-delay/#aws
[76]: /fr/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/?
[77]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=roledelegation#setup
[78]: https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit
[79]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[80]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_DescribeAlarmHistory.html#API_DescribeAlarmHistory_RequestParameters
[81]: https://docs.datadoghq.com/fr/integrations/amazon_sns/#receive-sns-messages
[82]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/amazon_web_services_metadata.csv
[83]: https://docs.datadoghq.com/fr/integrations/#cat-aws
[84]: https://docs.datadoghq.com/fr/integrations/amazon_rds_proxy/
[85]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/service_checks.json
[86]: https://docs.datadoghq.com/fr/integrations/guide/aws-integration-troubleshooting/