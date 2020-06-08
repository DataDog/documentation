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
6. Mettez à jour le [carré d'intégration Datadog/AWS][1] en saisissant le nom du rôle IAM et l'ID du compte utilisé pour créer la pile CloudFormation.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#api
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
7. Vous pouvez surveiller un sous-ensemble d'instances EC2 en saisissant les tags AWS correspondants dans la zone de texte `to hosts with tag`.
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
6. Vous pouvez surveiller un sous-ensemble d'instances EC2 en saisissant les tags AWS correspondants dans la zone de texte `to hosts with tag`.
7. Vous pouvez surveiller un sous-ensemble de Lambdas en saisissant les tags AWS correspondants dans la zone de texte `to Lambdas with tag`.
8. Cliquez sur **Install Integration**.

## Collecte de logs

Les logs de service AWS sont recueillis via la fonction Lambda du Forwarder Datadog. Ce Lambda, qui se déclenche sur les compartiments S3, les groupes de logs CloudWatch et les événements CloudWatch, transmet des logs à Datadog.

Pour commencer à recueillir des logs à partir de vos services AWS :

1. Configurez la fonction Lambda du Forwarder Datadog dans votre compte AWS en suivant les instructions figurant dans le [référentiel Github DataDog/datadog-serverless-functions][70].
2. [Activez la journalisation](#activer-la-journalisation-pour-votre-service-AWS) pour votre service AWS (la plupart des services AWS peuvent se connecter à un compartiment S3 ou à un groupe de logs CloudWatch).
3. Configurez les déclencheurs entraînant l'exécution du Lambda. Il existe deux façons de les configurer :

    - [Automatiquement](#configurer-automatiquement-des-declencheurs) : Datadog récupère les logs pour les services AWS sélectionnés et les ajoute en tant que déclencheurs pour la fonction Lambda de Datadog. Datadog met également la liste à jour.
    - [Manuellement](#configurer-manuellement-des-declencheurs) : configurez vous-même chaque déclencheur via la console AWS.

**Remarque** : si vous appartenez à la région us-east-1 d'AWS, [utilisez l'intégration Datadog/AWS PrivateLink][71] pour transmettre vos logs à Datadog. Pour ce faire, votre fonction Forwarder [doit disposer de l'autorisation `VPCLambdaExecutionRole`][72].

### Avancé : Ingestion de logs avec Kinesis

Au lieu de déclencher le Forwarder Datadog sur les groupes de logs CloudWatch de vos fonctions Lambda, vous pouvez configurer un flux Kinesis abonné aux groupes de logs de vos fonctions Lambda, puis abonner le Forwarder Datadog à ce flux.

#### Configuration de la transmission de logs avec Kinesis

1. Suivez [ces instructions][70] pour lancer la pile CloudFormation du Forwarder Datadog dans votre compte AWS.
2. Identifiez les groupes de logs CloudWatch de vos fonctions Lambda dont les données doivent être transmises à Datadog. Ces groupes de logs sont intitulés `/aws/lambda/{Nom de la fonction Lambda}`. Pour les retrouver, [filtrez les groupes de logs avec le préfixe `/aws/lambda/`][73].
3. Vérifiez si un service est déjà abonné aux groupes de logs qui vous intéressent à l'aide de la colonne `Subscriptions` sur la [page des groupes de logs][73]. Seul un abonnement est possible pour chaque groupe de logs CloudWatch : tout abonnement existant devra donc être supprimé avant d'ajouter le nouveau flux Kinesis en tant qu'abonné.
    * Notez que si vous souhaitez abonner un autre service à ces logs, vous aurez la possibilité de l'abonner au nouveau flux Kinesis une fois la configuration terminée.
4. Créez un nouveau flux Kinesis (référez-vous à la [documentation de Kinesis][74]). Donnez un nom explicite à votre flux, par exemple `DatadogLambdaLogStream`, et définissez le nombre de shards (partitions) sur 1.
5. Abonnez votre nouveau flux Kinesis aux groupes de logs CloudWatch que vous souhaitez intégrer à Datadog. Consultez [cette section de la documentation sur les logs CloudWatch][75] pour :
    1. Utiliser la commande `aws iam create-role` pour créer un rôle IAM qui autorise CloudWatch à transmettre ses données de logs au flux Kinesis.
    2. Créer une stratégie autorisant l'action `kinesis:PutRecord`.
    3. Associer la stratégie d'autorisation au rôle IAM que vous venez de créer avec la commande `aws iam put-role-policy`.
    4. Utiliser la commande `aws logs put-subscription-filter` pour abonner votre flux Kinesis à chaque groupe de logs CloudWatch que vous souhaitez intégrer à Datadog.
6. Examinez la colonne `Subscriptions` de la [page des groupes de logs][73] pour vérifier que votre nouveau flux Kinesis est bien abonné aux groupes de logs de vos Lambdas.
7. [Ajoutez le flux Kinesis en tant que déclencheur][76] à la fonction Lambda du Forwarder Datadog. Afin de limiter la latence des métriques et des logs, nous vous conseillons de définir le paramètre Batch window sur 60 secondes.
8. La fonction Lambda du Forwarder Datadog commence alors à être déclenchée par les logs de vos autres fonctions Lambda, et vos logs se mettent à apparaître dans Datadog.

#### Avantages de Kinesis pour le streaming de logs

* Si les groupes de logs CloudWatch sont limités à un seul abonnement, ce n'est pas le cas des flux Kinesis. Après avoir abonné le flux Kinesis aux groupes de logs, vous pouvez abonner plusieurs services à ce flux afin de tous leur transmettre les données de logs.
* Étant donné qu'il est possible de configurer la taille des lots et l'intervalle de collecte dans Kinesis, vous êtes libre de définir la fréquence à laquelle la fonction Lambda du Forwarder Datadog doit se déclencher.

#### Inconvénients de Kinesis pour le streaming de logs

* Il n'est pas possible d'utiliser un flux Kinesis pour vos logs en même temps que le système de déclenchement automatique du Forwarder de Datadog. Vous devrez ajouter vote flux en tant qu'abonné à chaque groupe de logs que vous souhaitez intégrer à Datadog.
* L'utilisation du flux Kinesis est facturée par AWS. Consultez la [documentation sur les tarifs de Kinesis][77] pour en savoir plus.

### Activer la journalisation pour votre service AWS

Tous les services AWS qui génèrent des logs dans un compartiment S3 ou un groupe de logs CloudWatch sont pris en charge. Consultez les instructions de configuration spécifiques des services les plus utilisés dans le tableau ci-dessous :

| Service AWS                        | Activation de la journalisation de service AWS                                                                    | Envoi de logs AWS à Datadog                                                    |
| ---------------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [API Gateway][1]                  | [Activer les logs AWS API Gateway][78]                                                               | Collecte de logs [manuelle][79]                                                 |
| [Cloudfront][7]                   | [Activer les logs AWS CloudFront][80]                                                                | Collecte de logs [manuelle][81] et [automatique](#configurer-automatiquement-des-declencheurs)  |
| [Cloudtrail][10]                   | [Activer les logs AWS Cloudtrail][82]                                                                | Collecte de logs [manuelle][83]                                                 |
| [DynamoDB][18]                     | [Activer les logs AWS DynamoDB][84]                                                                  | Collecte de logs [manuelle][85]                                                 |
| [EC2][20]                          | `-`                                                                                             | Utiliser l'[Agent Datadog][86] pour envoyer vos logs à Datadog                    |
| [ECS][22]                          | `-`                                                                                             | [Utiliser l'Agent Docker pour rassembler vos logs][87]                              |
| [Elastic Load Balancing (ELB)][28] | [Activer les logs AWS ELB][88]                                                                       | Collecte de logs [manuelle][89] et [automatique](#configurer-automatiquement-des-declencheurs)  |
| [Lambda][40]                       | `-`                                                                                             | Collecte de logs [manuelle][90] et [automatique](#configurer-automatiquement-des-declencheurs) |
| [RDS][53]                         | [Activer les logs AWS RDS][91]                                                                      | Collecte de logs [manuelle][92]                                                |
| [Route 53][56]                    | [Activer les logs AWS Route 53][93]                                                                 | Collecte de logs [manuelle][94]                                                |
| [S3][57]                          | [Activer les logs AWS S3][95]                                                                       | Collecte de logs [manuelle][96] et [automatique](#configurer-automatiquement-des-declencheurs) |
| [SNS][60]                         | Il n'y a pas de « logs SNS ». Traitez les logs et les événements transmis via le service SNS. | Collecte de logs [manuelle][97]                                                |
| [RedShift][54]                    | [Activer les logs AWS Redshift][98]                                                                 | Collecte de logs [manuelle][99] et [automatique](#configurer-automatiquement-des-declencheurs) |
| [VPC][64]                         | [Activer les logs AWS VPC][100]                                                                      | Collecte de logs [manuelle][101]                                                |

### Envoyer des logs de service AWS à Datadog

Vous pouvez choisir entre deux options pour la configuration des déclencheurs de la fonction Lambda de Datadog :

- Configurer manuellement des déclencheurs sur des compartiments S3, des groupes de logs CloudWatch ou des événements CloudWatch.
- Laisser Datadog définir et gérer automatiquement la liste des déclencheurs.

#### Configurer automatiquement des déclencheurs

Si vous stockez des logs dans de nombreux compartiments S3 ou groupes de logs CloudWatch, Datadog peut gérer automatiquement les déclencheurs à votre place.

1. Si vous ne l'avez pas déjà fait, configurez [la fonction Lambda de collecte de logs AWS avec Datadog][102].
2. Vérifiez que la [stratégie](#strategie-iam-aws-datadog) du rôle IAM utilisé pour l'intégration Datadog/AWS possède les autorisations suivantes. Le fonctionnement de ces autorisations est décrit ci-dessous :

    ```text
    "cloudfront:GetDistributionConfig",
    "cloudfront:ListDistributions",
    "elasticloadbalancing:DescribeLoadBalancers",
    "elasticloadbalancing:DescribeLoadBalancerAttributes",
    "lambda:List*",
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
    | `lambda:List*`                                              | Énumère toutes les fonctions Lambda. |
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

3. Accédez à l'onglet _Collect logs_ dans le [carré d'intégration AWS][69].
4. Sélectionnez le compte AWS à partir duquel vous souhaitez recueillir des logs, puis saisissez l'ARN du Lambda créé dans la section précédente.
   {{< img src="logs/aws/AWSLogStep1.png" alt="Saisie de Lambda" popup="true" style="width:80%;" >}}
5. Sélectionnez les services à partir desquels vous souhaitez recueillir des logs, puis enregistrez. Pour arrêter la collecte de logs d'un service spécifique, décochez la case associée.
   {{< img src="logs/aws/AWSLogStep2.png" alt="Sélection de services" popup="true" style="width:80%;" >}}
6. Si vous possédez des logs dans plusieurs régions, vous devez créer des fonctions Lambda supplémentaires dans ces régions et les indiquer dans ce carré.
7. Pour arrêter la collecte de l'ensemble des logs AWS, appuyez sur la _croix_ en regard de chaque ARN de Lambda. Tous les déclencheurs de cette fonction seront supprimés.
8. Quelques minutes après cette première configuration, vos logs AWS apparaissent sur votre [page Log Explorer][103] Datadog en temps quasi-réel.

#### Configurer manuellement des déclencheurs

##### Collecte de logs depuis un groupe de logs CloudWatch

Si vous stockez des logs dans un groupe de logs CloudWatch, suivez les étapes ci-dessous pour les transmettre à Datadog :

1. Si vous ne l'avez pas déjà fait, configurez [la fonction Lambda de collecte de logs AWS avec Datadog][102].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur dans la console AWS sur le groupe de logs CloudWatch qui contient vos logs :

{{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="groupes de logs cloudwatch" popup="true" style="width:70%;">}}

Sélectionnez le groupe de logs CloudWatch correspondant, ajoutez un nom de filtre (vous pouvez toutefois laisser le filtre vide) et ajoutez le déclencheur :
{{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="déclencheur cloudwatch" popup="true" style="width:70%;">}}

Accédez ensuite à la [section Logs de Datadog][103] pour commencer à explorer vos logs !

Si vous utilisez Terraform, vous pouvez provisionner et gérer vos déclencheurs avec la ressource [aws_cloudwatch_log_subscription_filter][104]. Consultez l'exemple de code ci-dessous.

```text
resource "aws_cloudwatch_log_subscription_filter" "datadog_log_subscription_filter" {
  name            = "datadog_log_subscription_filter"
  log_group_name  = <NOM_GROUPE_LOGS_CLOUDWATCH> # p. ex. /aws/lambda/nom_fonction_lambda
  destination_arn = <ARN_FORWARDER_DATADOG> # p. ex. arn:aws:lambda:us-east-1:123:function:datadog-forwarder
  filter_pattern  = ""
}
```

Si vous utilisez Serverless Framework, SAM ou CloudFormation, vous pouvez provisionner et gérer vos déclencheurs avec la ressource [AWS::Logs::SubscriptionFilter][105] de CloudFormation. Un exemple de code est fourni ci-dessous. Si vous utilisez Serverless Framework, le bloc de code doit être placé dans la section [resources][106] de votre fichier `serverless.yml`.

```yaml
Resources:
  MyLogSubscriptionFilter:
    Type: "AWS::Logs::SubscriptionFilter"
    Properties:
      DestinationArn: "<ARN_FORWARDER_DATADOG>"
      LogGroupName: "<NOM_GROUPE_LOGS_CLOUDWATCH>"
      FilterPattern: ""
```

##### Collecte de logs depuis des compartiments S3

Si vous stockez des logs dans un compartiment S3, suivez les étapes ci-dessous pour les transmettre à Datadog :

1. Si vous ne l'avez pas déjà fait, configurez [la fonction Lambda de collecte de logs AWS avec Datadog][102].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur dans la console AWS sur le compartiment S3 qui contient vos logs :
   {{< img src="logs/aws/adding_trigger.png" alt="Ajout d'un déclencheur" popup="true"style="width:80%;">}}

3. Sélectionnez le compartiment, puis suivez les instructions d'AWS :
   {{< img src="logs/aws/integration_lambda.png" alt="Intégration Lambda" popup="true" style="width:80%;">}}

4. Définissez le bon type d'événement sur les compartiments S3 :
   {{< img src="logs/aws/object_created.png" alt="Objet créé" popup="true" style="width:80%;">}}

Accédez ensuite à votre [section Logs de Datadog][103] pour commencer à explorer vos logs !

Si vous utilisez Terraform, vous pouvez provisionner et gérer vos déclencheurs avec la ressource [aws_s3_bucket_notification][107]. Consultez l'exemple de code ci-dessous.

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

resource "aws_lambda_permission" "allow_bucket" {
  statement_id  = "AllowExecutionFromS3Bucket"
  action        = "lambda:InvokeFunction"
  function_name = "<ARN_FORWARDER_DATADOG>"
  principal     = "s3.amazonaws.com"
  source_arn    = "<ARN_DU_COMPARTIMENT>"
}
```

Si vous utilisez Serverless Framework, SAM ou CloudFormation, vous pouvez configurer vos déclencheurs avec la propriété [NotificationConfiguration][108] de CloudFormation pour votre compartiment S3. Un exemple de code est fourni ci-dessous. Si vous utilisez Serverless Framework, le bloc de code doit être placé dans la section [resources][106] de votre fichier `serverless.yml`.

```yaml
Resources:
  Bucket:
    Type: AWS::S3::Bucket
    DependsOn: BucketPermission
    Properties:
      BucketName: "<MON_COMPARTIMENT>"
      NotificationConfiguration:
        LambdaConfigurations:
        - Event: 's3:ObjectCreated:*'
          Function: "<ARN_FORWARDER_DATADOG>"
  BucketPermission:
    Type: AWS::Lambda::Permission
    Properties:
      Action: 'lambda:InvokeFunction'
      FunctionName: "<ARN_FORWARDER_DATADOG>"
      Principal: s3.amazonaws.com
      SourceArn: <ARN_DU_COMPARTIMENT>
      SourceAccount: !Ref "AWS::AccountId"
```

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_web_services" >}}


### Événements

Vous pouvez configurer la collecte d'événements AWS pour chaque service AWS. Consultez la documentation des différents services AWS pour en savoir plus sur la collecte d'événements.

## Dépannage

### Écart entre vos données dans CloudWatch et Datadog

Il est important de tenir compte des deux distinctions suivantes :

1. Pour les counters AWS, un graphique défini sur « sum » « 1minute » affiche le nombre total d'occurrences en l'espace d'une minute, soit le taux par minute. Datadog affiche les données brutes à partir des valeurs AWS normalisées par seconde, peu importe l'intervalle sélectionné dans AWS. Cela explique pourquoi la valeur affichée dans Datadog peut être plus faible.
2. Les valeurs minimales, maximales et moyennes n'ont généralement pas la même signification dans AWS et dans Datadog. Dans AWS, les latences moyenne, minimale et maximale correspondent à trois métriques distinctes recueillies. Lorsque Datadog récupère des métriques à partir d'AWS CloudWatch, la latence moyenne est transmise sous la forme de séries temporelles distinctes par ELB. Dans Datadog, lorsque vous sélectionnez les valeurs « min », « max » ou « avg », vous définissez les critères de rassemblement de séries temporelles. Par exemple, si vous cherchez à obtenir `system.cpu.idle` sans appliquer de filtre, une série est envoyée pour chaque host qui renvoie cette métrique. Ces séries doivent être combinées pour être représentées graphiquement. À l'inverse, si vous cherchez à obtenir `system.cpu.idle` pour un seul host, aucune agrégation n'est nécessaire. Les valeurs maximale et moyenne sont identiques.

### Métriques en retard

Lorsque vous utilisez l'intégration AWS, Datadog récupère vos métriques via l'API CloudWatch. Il est possible que les données des métriques AWS accusent un léger retard, en raison des contraintes liées à l'API.

Pour commencer, l'API CloudWatch propose uniquement une analyse métrique par métrique afin d'extraire des données. Les API CloudWatch prévoient une limite de débit qui varie en fonction des informations d'authentification, de la région et du service. Les métriques sont transmises par AWS en fonction du niveau du compte. Par exemple, si vous payez pour des « métriques détaillées » dans AWS, vous y avez accès plus rapidement. Ce niveau de service pour les métriques détaillées s'applique également à la granularité. Ainsi, certaines métriques sont transmises toutes les minutes, tandis que d'autres sont envoyées toutes les cinq minutes.

Datadog vous permet de hiérarchiser certaines métriques d'un compte afin de les récupérer en priorité, en fonction de certaines circonstances. Contactez [l'assistance Datadog][110] pour en savoir plus.

Pour obtenir des métriques en temps quasi-réel, installez l'Agent Datadog sur le host. Pour en savoir plus, consultez l'article de blog de Datadog [Tout ce que vous devez savoir pour effectuer une surveillance à partir d'Agents][111] (en anglais).

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
[70]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#installation
[71]: /fr/agent/guide/private-link/?tab=logs
[72]: https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html
[73]: https://console.aws.amazon.com/cloudwatch/home?#logs:prefix=/aws/lambda
[74]: https://docs.aws.amazon.com/kinesisanalytics/latest/dev/app-hotspots-prepare.html#app-hotspots-create-two-streams
[75]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs//SubscriptionFilters.html#DestinationKinesisExample
[76]: https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html#services-kinesis-eventsourcemapping
[77]: https://aws.amazon.com/kinesis/data-streams/pricing/
[78]: https://docs.datadoghq.com/fr/integrations/amazon_api_gateway/#log-collection
[79]: https://docs.datadoghq.com/fr/integrations/amazon_api_gateway/#send-logs-to-datadog
[80]: https://docs.datadoghq.com/fr/integrations/amazon_cloudfront/#enable-cloudfront-logging
[81]: https://docs.datadoghq.com/fr/integrations/amazon_cloudfront/#send-logs-to-datadog
[82]: https://docs.datadoghq.com/fr/integrations/amazon_cloudtrail/#enable-cloudtrail-logging
[83]: https://docs.datadoghq.com/fr/integrations/amazon_cloudtrail/#send-logs-to-datadog
[84]: https://docs.datadoghq.com/fr/integrations/amazon_dynamodb/#enable-dynamodb-logging
[85]: https://docs.datadoghq.com/fr/integrations/amazon_dynamodb/#send-logs-to-datadog
[86]: https://docs.datadoghq.com/fr/logs/
[87]: https://docs.datadoghq.com/fr/integrations/amazon_ecs/#log-collection
[88]: https://docs.datadoghq.com/fr/integrations/amazon_elb/#enable-aws-elb-logging
[89]: https://docs.datadoghq.com/fr/integrations/amazon_elb/#manual-installation-steps
[90]: https://docs.datadoghq.com/fr/integrations/amazon_lambda/#log-collection
[91]: https://docs.datadoghq.com/fr/integrations/amazon_rds/#enable-rds-logging
[92]: https://docs.datadoghq.com/fr/integrations/amazon_rds/#send-logs-to-datadog
[93]: https://docs.datadoghq.com/fr/integrations/amazon_route53/#enable-route53-logging
[94]: https://docs.datadoghq.com/fr/integrations/amazon_route53/#send-logs-to-datadog
[95]: https://docs.datadoghq.com/fr/integrations/amazon_s3/#enable-s3-access-logs
[96]: https://docs.datadoghq.com/fr/integrations/amazon_s3/#manual-installation-steps
[97]: https://docs.datadoghq.com/fr/integrations/amazon_sns/#send-logs-to-datadog
[98]: https://docs.datadoghq.com/fr/integrations/amazon_redshift/#enable-aws-redshift-logging
[99]: https://docs.datadoghq.com/fr/integrations/amazon_redshift/#log-collection
[100]: https://docs.datadoghq.com/fr/integrations/amazon_vpc/#enable-vpc-flow-log-logging
[101]: https://docs.datadoghq.com/fr/integrations/amazon_vpc/#log-collection
[102]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#log-collection
[103]: https://app.datadoghq.com/logs
[104]: https://www.terraform.io/docs/providers/aws/r/cloudwatch_log_subscription_filter.html
[105]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-subscriptionfilter.html
[106]: https://serverless.com/framework/docs/providers/aws/guide/resources/
[107]: https://www.terraform.io/docs/providers/aws/r/s3_bucket_notification.html
[108]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-notificationconfig.html
[109]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/amazon_web_services_metadata.csv
[110]: https://docs.datadoghq.com/fr/help/
[111]: http://www.datadoghq.com/blog/dont-fear-the-agent