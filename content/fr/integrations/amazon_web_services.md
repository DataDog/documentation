---
aliases:
  - /fr/integrations/aws/
  - /fr/logs/aws
  - /fr/integrations/faq/revoking-aws-keys-and-enabling-role-delegation-for-the-datadog-aws-integration/
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

Connectez-vous à Amazon Web Services (AWS) pour :

* Consulter des mises à jour automatiques de statut AWS dans votre flux
* Obtenir des métriques CloudWatch pour les hosts EC2 sans installer l'Agent
* Appliquer un tag à vos hosts EC2 comportant des informations spécifiques à EC2 (p. ex., leur zone de disponibilité)
* Consulter les événements de maintenance EC2 planifiés dans votre flux
* Recueillir des métriques et des événements CloudWatch depuis de nombreux autres produits AWS

Les intégrations connexes comprennent :

|                                         |                                                                               |
| --------------------------------------- | ----------------------------------------------------------------------------- |
| [API Gateway][1]                        | crée, publie, maintient et sécurise des API                                    |
| [Autoscaling][2]                        | met à l'échelle la capacité d'EC2                                                            |
| [Billing][3]                           | facturation et budgets                                                           |
| [CloudFront][4]                        | réseau de diffusion de contenu local                                                |
| [CloudTrail][5]                        | accède aux fichiers logs et aux appels d'API AWS                                         |
| [CloudSearch][6]                       | accède aux fichiers logs et aux appels d'API AWS                                         |
| [Direct Connect][7]                    | connexion réseau dédiée à AWS                                           |
| [Dynamo DB][8]                         | Base de données NoSQL                                                                |
| [EC2 Container Service (ECS)][9]       | service de gestion de conteneurs prenant en charge les conteneurs Docker                  |
| [Elastic Beanstalk][10]                 | service convivial pour le déploiement et la mise à l'échelle d'applications et de services Web   |
| [Elastic Block Store (EBS)][11]         | volumes de stockage permanent en mode bloc                                        |
| [ElastiCache][12]                       | cache en mémoire dans le cloud                                                  |
| [Elastic Cloud Compute (EC2)][13]       | capacité de calcul redimensionnable dans le cloud                                       |
| [Elastic File System (EFS)][14]         | stockage de fichiers partagé                                                           |
| [Elastic Load Balancing (ELB)][15]      | distribution du trafic entrant d'applications sur plusieurs instances Amazon EC2 |
| [Elastic Map Reduce (EMR)][16]          | processing de données avec Hadoop                                                  |
| [Elasticsearch Service (ES)][17]        | déploie, exploite et met à l'échelle des clusters Elasticsearch                             |
| [Firehose][18]                          | enregistrement et chargement de données de diffusion                                               |
| [IoT][19]                               | connecte des appareils IoT à des services cloud                                       |
| [Kinesis][20]                           | service de processing en temps réel de grands flux de données distribués           |
| [Key Management Service (KMS)][21]      | crée et contrôle des clés de chiffrement                                            |
| [Lambda][22]                            | calcul sans serveur                                                          |
| [Machine Learning (ML)][23]             | crée des modèles d'apprentissage automatique                                                |
| [OpsWorks][24]                          | gestion de configuration                                                      |
| [Polly][25]                             | service de synthèse vocale                                                           |
| [Redshift][26]                          | solution d'entrepôt de données                                                       |
| [Relational Database Service (RDS)][27] | base de données relationnelle dans le cloud                                              |
| [Route 53][28]                          | gestion de DNS et de trafic avec surveillance de la disponibilité                       |
| [Simple Email Service (SES)][29]        | service économique d'envoi d'e-mails                           |
| [Simple Notification System (SNS)][30]  | alertes et notifications                                                       |
| [Simple Queue Service (SQS)][31]        | service de file d'attente de messagerie                                                       |
| [Simple Storage Service (S3)][32]       | service de stockage dans le cloud hautement disponible et évolutif                           |
| [Simple Workflow Service (SWF)][33]     | gestion de workflow dans le cloud                                                     |
| [Storage Gateway][34]                   | stockage cloud hybride                                                          |
| [Web Application Firewall (WAF)][35]    | protège des applications Web contre les failles Web les plus courantes                             |
| [Workspaces][36]                        | service de bureau sécurisé                                              |
| [X-Ray][37]                             | création de traces pour des applications distribuées                                          |

## Implémentation
### Installation

La configuration de l'intégration de Datadog à Amazon Web Services nécessite la configuration de la délégation de rôles à l'aide d'AWS IAM. 
Pour mieux comprendre le principe de délégation des rôles, reportez-vous au [guide des meilleures pratiques d'AWS IAM][38].

<div class="alert alert-warning">
Les régions GovCloud et Chine ne prennent actuellement pas en charge la délégation de rôle IAM. Si vous effectuez un déploiement dans ces régions, passez directement à la <a href="#configuration">section Configuration</a> ci-dessous.
</div>

1. Créez un nouveau rôle dans la [console IAM d'AWS][39].
2. Sélectionnez le type de rôle `Another AWS account`.
3. Pour Account ID, saisissez `464622532012` (identifiant de compte Datadog). Cela signifie que vous accordez à Datadog un accès en lecture seule à vos données AWS.
4. Cochez la case `Require external ID` et saisissez l'ID généré [dans l'application Datadog][40]. Assurez-vous de ne pas cocher **Require MFA**. *Pour en savoir plus sur l'External ID, consultez [ce document du Guide de l'utilisateur d'IAM][41]*.
5. Cliquez sur `Next: Permissions`.
6. Si vous avez déjà créé la stratégie, sélectionnez-la sur cette page, puis passez à l'étape 12. Si ce n'est pas le cas, cliquez sur `Create Policy` afin d'ouvrir une nouvelle fenêtre.
7. Sélectionnez l'onglet `JSON`. Afin de profiter de toutes les intégrations AWS proposées par Datadog, utilisez l'[extrait de stratégie](#strategie-iam-aws-datadog) sous la zone de texte. Étant donné que d'autres composants sont ajoutés à une intégration, ces autorisations peuvent évoluer.
8. Cliquez sur `Review policy`.
9. Nommez la stratégie `DatadogAWSIntegrationPolicy` ou utilisez le nom de votre choix, et saisissez une description pertinente.
10. Cliquez sur `Create policy`. Vous pouvez ensuite fermer cette fenêtre.
11. Depuis la fenêtre « Create role », actualisez la liste des stratégies et sélectionnez celle que vous venez de créer.
12. Cliquez sur `Next: Review`.
13. Saisissez le nom `DatadogAWSIntegrationRole` ou un nom similaire pour le rôle, ainsi qu'une description pertinente. Cliquez sur `Create role`.

**Étape facultative** : si vous utilisez Terraform, configurez votre stratégie IAM Datadog à l'aide de [l'intégration AWS avec Terraform][42].

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
        "logs:Get*",
        "logs:Describe*",
        "logs:FilterLogEvents",
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

| Autorisation AWS             | Description                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------------- |
| `cloudwatch:ListMetrics`   | Énumère les métriques CloudWatch disponibles.                                                        |
| `cloudwatch:GetMetricData` | Récupère des points de données pour une métrique donnée.                                                         |
| `support:*`               | Ajoute des métriques à propos des limites de service.<br>Nécessite un accès complet, en raison des [limites AWS][1]. |
| `tag:getResources`         | Récupère des tags personnalisés en fonction du type de ressource.                                                             |
| `tag:getTagKeys`           | Récupère des clés de tag selon les régions d'un compte AWS.                                                 |
| `tag:getTagValues`         | Récupère les valeurs de tag selon les régions d'un compte AWS.                                               |

L'API Resource Group Tagging vise notamment à réduire le nombre d'appels API requis pour recueillir des tags personnalisés. Pour en savoir plus, consultez la documentation relative aux [stratégies sur les tags][2] sur le site Web d'AWS.


[1]: http://docs.aws.amazon.com/IAM/latest/UserGuide/list_trustedadvisor.html
[2]: http://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/Welcome.html
{{% /tab %}}
{{< /tabs >}}

### Configuration

{{< tabs >}}
{{% tab "Délégation de rôles" %}}

{{< img src="integrations/aws/integrations-aws-secretentry.png" alt="logo" responsive="true">}}

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

Les logs de service AWS sont recueillis via la fonction Lambda de Datadog. Ce Lambda, qui se déclenche sur les compartiments S3, les groupes de logs CloudWatch et les événements CloudWatch, transmet des logs à Datadog.

Pour commencer à recueillir des logs à partir de vos services AWS :

1. Configurez la [fonction Lambda de Datadog](#configurer-la-fonction-lambda-de-datadog).
2. [Activez la création de logs](#activer-la-creation-de-logs-pour-votre-service-AWS) pour votre service AWS (la plupart des services AWS peuvent se connecter à un compartiment S3 ou à un groupe de logs CloudWatch).
3. Configurez les déclencheurs entraînant l'exécution du lambda. Il existe deux façons de les configurer :

  * [automatiquement](#configurer-automatiquement-des-declencheurs) : Datadog récupère les logs pour les services AWS sélectionnés et les ajoute en tant que déclencheurs pour la fonction Lambda de Datadog. Datadog met également la liste à jour.
  * [manuellement](#configurer-manuellement-des-declencheurs) : configurez vous-même chaque déclencheur via la console AWS.

### Configurer la fonction Lambda de Datadog

Pour ajouter le Lambda de transmission de logs à Datadog sur votre compte AWS, vous pouvez **utiliser le référentiel sans serveur AWS *ou* créer manuellement un nouveau Lambda.**

#### Référentiel sans serveur AWS

Utilisez le [référentiel sans serveur AWS][43] pour déployer la fonction Lambda sur votre compte AWS.

#### Créer manuellement un nouveau Lambda

##### Créer une fonction Lambda

1. Accédez à la [console Lambda][44] et créez une nouvelle fonction :
    {{< img src="logs/aws/create_lambda_function.png" alt="Créer une fonction Lambda" responsive="true" popup="true" style="width:80%;" >}}

2. Sélectionnez **Author from scratch** et saisissez un nom unique pour la fonction.
3. Définissez Runtime sur **Python 2.7**.
4. Pour `Role`, sélectionnez **Create new role from template(s)** et saisissez un nom unique pour le rôle.
5. Si vous récupérez des logs à partir d'un compartiment S3, sous « Policy templates », sélectionnez **s3 object read-only permissions**.
6. Sélectionnez **Create Function**.
    {{< img src="logs/aws/author_from_scratch.png" alt="Création de A à Z" responsive="true" style="width:80%;" >}}

##### Fournir le code et configurer le Lambda

1. Copiez le code depuis [ce référentiel][45] et collez-le dans le champ de code de la fonction.
2. Assurez-vous que le gestionnaire indique **lambda_function.lambda_handler**.
    {{< img src="logs/aws/select_python.png" alt="Sélectionner Python" responsive="true" style="width:80%;" >}}
3. En haut du script se trouve une section intitulée `#Parameters`. Vous pouvez fournir la clé d'API requise par la fonction Lambda de deux façons différentes :

    * En configurant une variable d'environnement (recommandé)
    * En ajoutant directement votre clé API Datadog dans le code
    {{< img src="logs/aws/dd_api_key_setup.png" alt="Configuration clé API DD" responsive="true" popup="true" style="width:80%;" >}}
4. Faites défiler jusqu'à atteindre **Basic Settings** sous la zone de code en ligne.
5. Définissez la mémoire sur une valeur **proche de 1 Go**.
6. Définissez le délai d'expiration (nous recommandons d'indiquer **120 secondes**).
    {{< img src="logs/aws/basic_settings.png" alt="Réglages de base" responsive="true" style="width:80%;" >}}
7. Faites défiler vers le haut de la page et cliquez sur **Save**.

#### Tester votre Lambda

1. Cliquez sur **Test**.
2. Sélectionnez **CloudWatch Logs** comme événement de test.
    {{< img src="logs/aws/test_event.png" alt="Événement test" responsive="true" style="width:80%;" >}}
2. Saisissez un nom unique pour l'événement, puis cliquez sur **Create**.
3. Cliquez sur Test et vérifiez qu'aucune erreur ne survient (les logs de test n'apparaîtront pas dans votre plateforme Datadog).

### Activer la création de logs pour votre service AWS

Tous les services AWS qui génèrent des logs dans un compartiment S3 ou un groupe de logs CloudWatch sont pris en charge. Consultez les instructions de configuration spécifiques des services les plus utilisés dans le tableau ci-dessous :

| Service AWS                        | Activer la création de logs de service AWS                                                                    | Envoyer des logs AWS à Datadog                                                   |
| ---------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [API Gateway][46]                  | [Activer les logs AWS API Gateway][47]                                                               | Collecte de logs [manuelle][48]                                                |
| [Cloudfront][49]                   | [Activer les logs AWS Cloudfront][50]                                                                | Collecte de logs [manuelle][51] et [automatique](#configurer-automatiquement-des-declencheurs) |
| [Cloudtrail][52]                   | [Activer les logs AWS Cloudtrail][53]                                                                | Collecte de logs [manuelle][54]                                                |
| [DynamoDB][55]                     | [Activer les logs AWS DynamoDB][56]                                                                  | Collecte de logs [manuelle][57]                                                |
| [EC2][58]                          | `-`                                                                                             | Utiliser l'[Agent Datadog][59] pour envoyer vos logs à Datadog                   |
| [ECS][60]                          | `-`                                                                                             | [Utiliser l'Agent Docker pour rassembler vos logs][61]                             |
| [Elastic Load Balancing (ELB)][62] | [Activer les logs AWS ELB][63]                                                                       | Collecte de logs [manuelle][64] et [automatique](#configurer-automatiquement-des-declencheurs) |
| [Lambda][65]                       | `-`                                                                                             | Collecte de logs [manuelle][66] et [automatique](#configurer-automatiquement-des-declencheurs) |
| [RDS][67]                          | [Activer les logs AWS RDS][68]                                                                       | Collecte de logs [manuelle][69]                                                |
| [Route 53][70]                     | [Activer les logs AWS Route 53][71]                                                                  | Collecte de logs [manuelle][72]                                                |
| [S3][73]                           | [Activer les logs AWS S3][74]                                                                        | Collecte de logs [manuelle][75] et [automatique](#configurer-automatiquement-des-declencheurs) |
| [SNS][76]                          | Il n'y a pas de « logs SNS ». Traitez les logs et les événements transmis via le service SNS. | Collecte de logs [manuelle][77]                                                |
| [RedShift][78]                     | [Activer les logs AWS Redshift][79]                                                                  | Collecte de logs [manuelle][80] et [automatique](#configurer-automatiquement-des-declencheurs) |
| [VPC][81]                          | [Activer les logs AWS VPC][82]                                                                       | Collecte de logs [manuelle][83]                                                |

### Envoyer des logs de service AWS à Datadog

Vous pouvez choisir entre deux options pour la configuration des déclencheurs de la fonction Lambda de Datadog :
* Configurer manuellement des déclencheurs sur des compartiments S3, des groupes de logs CloudWatch ou des événements CloudWatch.
* Laisser Datadog définir et gérer automatiquement la liste des déclencheurs.

#### Configurer automatiquement des déclencheurs

Si vous stockez des logs dans de nombreux compartiments S3 ou groupes de logs CloudWatch, Datadog peut gérer automatiquement les déclencheurs à votre place.

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][84].
2. Ajoutez les autorisations requises pour votre rôle Datadog dans la [console IAM][85]. Il est possible que vous ayez déjà accordé certaines de ces autorisations pour d'autres intégrations Datadog/AWS. Consultez les informations ci-dessous pour en savoir plus sur l'utilisation de ces autorisations :

    ```
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

| Autorisation AWS                                        | Description                                                                  |
| ----------------------------------------------------- | ---------------------------------------------------------------------------- |
| `cloudfront:GetDistributionConfig`                    | Récupère le nom du compartiment S3 contenant les logs d'accès CloudFront.             |
| `cloudfront:ListDistributions`                        | Énumère toutes les distributions CloudFront.                                           |
| `elasticloadbalancing:DescribeLoadBalancers`          | Énumère tous les répartiteurs de charge.                                                     |
| `elasticloadbalancing:DescribeLoadBalancerAttributes` | Récupère le nom du compartiment S3 contenant les logs d'accès ELB.                    |
| `lambda:AddPermission`                                | Ajoute une autorisation permettant à un compartiment S3 spécifique de déclencher une fonction Lambda. |
| `lambda:GetPolicy`                                    | Récupère la stratégie Lambda lorsque des déclencheurs doivent être supprimés.                      |
| `lambda:RemovePermission`                             | Supprime des autorisations d'une stratégie Lambda.                                     |
| `redshift:DescribeClusters`                           | Énumère tous les clusters Redshift.                                                  |
| `redshift:DescribeLoggingStatus`                      | Récupère le nom du compartiment S3 contenant les logs Redshift.                      |
| `s3:GetBucketLogging`                                 | Récupère le nom du compartiment S3 contenant les logs d'accès S3.                     |
| `s3:GetBucketLocation`                                | Récupère la région du compartiment S3 contenant les logs d'accès S3.                   |
| `s3:GetBucketNotification`                            | Récupère les configurations existantes de déclenchement de Lambda.                                  |
| `s3:ListAllMyBuckets`                                 | Énumère tous les compartiments S3.                                                         |
| `s3:PutBucketNotification`                            | Ajoute ou supprime un déclencheur Lambda basé sur des événements de compartiment S3.                    |
| `logs:PutSubscriptionFilter`                          | Ajoute un déclencheur Lambda basé sur des événements de log CloudWatch.                          |
| `logs:DeleteSubscriptionFilter`                       | Supprime un déclencheur Lambda basé sur des événements de log CloudWatch.                       |
| `logs:DescribeSubscriptionFilters`                    | Énumère les filtres d'abonnement pour le groupe de logs spécifié.                  |


3. Accédez à l'onglet *Collect logs* dans le [carré d'intégration AWS][86].
4. Sélectionnez le compte AWS à partir duquel vous souhaitez recueillir des logs, puis saisissez l'ARN du Lambda créé dans la section précédente.
{{< img src="logs/aws/AWSLogStep1.png" alt="Saisie de Lambda" responsive="true" popup="true" style="width:80%;" >}}
5. Cochez les services à partir desquels vous souhaitez recueillir des logs et cliquez sur « Save ». Pour arrêter la collecte de logs d'un service spécifique, décochez la case associée.
{{< img src="logs/aws/AWSLogStep2.png" alt="Sélection de services" responsive="true" popup="true" style="width:80%;" >}}
6. Si vous possédez des logs dans plusieurs régions, vous devez créer des fonctions Lambda supplémentaires dans ces régions et les indiquer dans ce carré.
7. Pour arrêter la collecte de l'ensemble des logs AWS, appuyez sur la *croix* en regard de chaque ARN de Lambda. Tous les déclencheurs de cette fonction seront supprimés.
8. Quelques minutes après cette première configuration, vos logs AWS apparaîtront dans votre [page Log Explorer][87] Datadog, quasiment en temps réel.

#### Configurer manuellement des déclencheurs

##### Collecte de logs depuis un groupe de logs CloudWatch

Si vous stockez des logs dans un groupe de logs CloudWatch, suivez les étapes ci-dessous pour les transmettre à Datadog :

1. Si vous ne l'avez pas déjà fait, configurez [la fonction Lambda de collecte de logs AWS avec Datadog][84].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur dans la console AWS sur le groupe de logs CloudWatch qui contient vos logs :

{{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="groupes de logs cloudwatch" responsive="true" popup="true" style="width:70%;">}}

   Sélectionnez le groupe de logs CloudWatch correspondant, ajoutez un nom de filtre (vous pouvez toutefois laisser le filtre vide) et ajoutez le déclencheur :
{{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="déclencheur cloudwatch" responsive="true" popup="true" style="width:70%;">}}

Accédez ensuite à votre [section Log de Datadog][87] pour commencer à explorer vos logs !

##### Collecte de logs depuis des compartiments S3

Si vous stockez des logs dans un compartiment S3, suivez les étapes ci-dessous pour les transmettre à Datadog :

1. Si vous ne l'avez pas déjà fait, configurez [la fonction Lambda de collecte de logs AWS avec Datadog][84].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur dans la console AWS sur le compartiment S3 qui contient vos logs :
    {{< img src="logs/aws/adding_trigger.png" alt="Ajout d'un déclencheur" responsive="true" popup="true"style="width:80%;">}}

3. Sélectionnez le compartiment, puis suivez les instructions d'AWS :
    {{< img src="logs/aws/integration_lambda.png" alt="Intégration Lambda" responsive="true" popup="true" style="width:80%;">}}

4. Définissez le bon type d'événement sur les compartiments S3 :
    {{< img src="logs/aws/object_created.png" alt="Objet créé" responsive="true" popup="true" style="width:80%;">}}

Accédez ensuite à votre [section Log sur Datadog][87] pour commencer à explorer vos logs !

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_web_services" >}}


### Événements

Vous pouvez configurer la collecte d'événements AWS pour chaque service AWS. Consultez la documentation des différents services AWS pour en savoir plus sur la collecte d'événements.

## Dépannage

### Vous constatez un écart entre vos données dans CloudWatch et Datadog ?

Il est important de tenir compte des deux distinctions suivantes :

1. Pour les compteurs AWS, un graphique défini sur « sum » « 1minute » affiche le nombre total d’occurrences en l'espace d'une minute, soit le taux par minute. Datadog affiche les données brutes à partir des valeurs AWS normalisées par seconde, peu importe l'intervalle sélectionné dans AWS. Cela explique pourquoi la valeur affichée dans Datadog peut être plus faible.
2. Les valeurs minimales, maximales et moyennes ont globalement la même signification dans AWS et dans Datadog. Dans AWS, les latences moyenne, minimale et maximale correspondent à trois métriques distinctes recueillies. Lorsque Datadog récupère des métriques à partir d'AWS CloudWatch, la latence moyenne est transmise sous la forme de séries temporelles distinctes par ELB. Dans Datadog, lorsque vous sélectionnez les valeurs « min », « max » ou « avg », vous définissez les critères de rassemblement de séries temporelles. Par exemple, si vous cherchez à obtenir `system.cpu.idle` sans appliquer de filtre, une série est envoyée pour chaque host qui renvoie cette métrique. Ces séries doivent être combinées pour être représentées graphiquement. À l'inverse, si vous cherchez à obtenir `system.cpu.idle` pour un seul host, aucune agrégation n'est nécessaire. Les valeurs maximale et moyenne sont identiques.

### Retard des métriques ?

Lorsque vous utilisez l'intégration AWS, Datadog récupère vos métriques via l'API CloudWatch. Il est possible que les données des métriques AWS accusent un léger retard, en raison des contraintes liées à l'API.

Pour commencer, l'API CloudWatch propose uniquement une analyse métrique par métrique afin d'extraire des données. Les API CloudWatch prévoient une limite de débit qui varie en fonction des informations d'authentification, de la région et du service. Les métriques sont transmises par AWS en fonction du niveau du compte. Par exemple, si vous payez pour des « métriques détaillées » dans AWS, vous y avez accès plus rapidement. Ce niveau de service pour les métriques détaillées s'applique également à la granularité. Ainsi, certaines métriques sont transmises toutes les minutes, tandis que d'autres sont envoyées toutes les cinq minutes.

Datadog vous permet de hiérarchiser certaines métriques d'un compte afin de les récupérer en priorité, en fonction de certaines circonstances. Contactez [l'assistance Datadog][88] pour en savoir plus.

Pour obtenir des métriques quasiment en temps réel, installez l'Agent Datadog sur le host. Pour en savoir plus, consultez l'article de blog de Datadog intitulé [Don't fear the Agent: Agent-based monitoring][89] (en anglais).

### Métriques manquantes ?

L'API CloudWatch renvoie uniquement les métriques avec des points de données. Ainsi, si un ELB ne possède aucune instance liée, aucune métrique associée à cet ELB n'apparaît dans Datadog.

### Nombre aws.elb.healthy_host_count incorrect ?

Lorsque l'option d'équilibrage des charges entre zones est activée sur un ELB, toutes les instances liées à cet ELB font partie de toutes les zones de disponibilité (pour CloudWatch). Ainsi, si vous possédez deux instances dans 1a et trois dans ab, la métrique affiche cinq instances par zone de disponibilité.
Puisque cela peut s'avérer contre-intuitif, nous avons ajouté de nouvelles métriques, **aws.elb.healthy_host_count_deduped** et **aws.elb.un_healthy_host_count_deduped**, qui affichent le nombre d'instances saines et non saines par zone de disponibilité, que vous ayez activé ou non l'option d'équilibrage des charges entre zones.

### Certains hosts sont dupliqués durant l'installation de l'Agent ?

Lors de l'installation de l'Agent sur un host AWS, il est possible que des hosts soient dupliqués pendant quelques heures sur la page d'infrastructure si vous avez défini manuellement le hostname dans la configuration de l'Agent. Ces doublons disparaîtront après quelques heures et ne seront pas pris en compte durant la facturation.




{{< get-dependencies >}}
[1]: https://docs.datadoghq.com/fr/integrations/awsapigateway
[2]: https://docs.datadoghq.com/fr/integrations/awsautoscaling
[3]: https://docs.datadoghq.com/fr/integrations/awsbilling
[4]: https://docs.datadoghq.com/fr/integrations/awscloudfront
[5]: https://docs.datadoghq.com/fr/integrations/awscloudtrail
[6]: https://docs.datadoghq.com/fr/integrations/awscloudsearch
[7]: https://docs.datadoghq.com/fr/integrations/awsdirectconnect
[8]: https://docs.datadoghq.com/fr/integrations/awsdynamo
[9]: https://docs.datadoghq.com/fr/integrations/ecs
[10]: https://docs.datadoghq.com/fr/integrations/awsbeanstalk
[11]: https://docs.datadoghq.com/fr/integrations/awsebs
[12]: https://docs.datadoghq.com/fr/integrations/awselasticache
[13]: https://docs.datadoghq.com/fr/integrations/awsec2
[14]: https://docs.datadoghq.com/fr/integrations/awsefs
[15]: https://docs.datadoghq.com/fr/integrations/awselb
[16]: https://docs.datadoghq.com/fr/integrations/awsemr
[17]: https://docs.datadoghq.com/fr/integrations/awses
[18]: https://docs.datadoghq.com/fr/integrations/awsfirehose
[19]: https://docs.datadoghq.com/fr/integrations/awsiot
[20]: https://docs.datadoghq.com/fr/integrations/awskinesis
[21]: https://docs.datadoghq.com/fr/integrations/awskms
[22]: https://docs.datadoghq.com/fr/integrations/awslambda
[23]: https://docs.datadoghq.com/fr/integrations/awsml
[24]: https://docs.datadoghq.com/fr/integrations/awsopsworks
[25]: https://docs.datadoghq.com/fr/integrations/awspolly
[26]: https://docs.datadoghq.com/fr/integrations/awsredshift
[27]: https://docs.datadoghq.com/fr/integrations/awsrds
[28]: https://docs.datadoghq.com/fr/integrations/awsroute53
[29]: https://docs.datadoghq.com/fr/integrations/awsses
[30]: https://docs.datadoghq.com/fr/integrations/awssns
[31]: https://docs.datadoghq.com/fr/integrations/awssqs
[32]: https://docs.datadoghq.com/fr/integrations/amazon_s3
[33]: https://docs.datadoghq.com/fr/integrations/awsswf
[34]: https://docs.datadoghq.com/fr/integrations/awsstoragegateway
[35]: https://docs.datadoghq.com/fr/integrations/awswaf
[36]: https://docs.datadoghq.com/fr/integrations/awsworkspaces
[37]: https://docs.datadoghq.com/fr/integrations/amazon_xray
[38]: http://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles
[39]: https://console.aws.amazon.com/iam/home#/roles
[40]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[41]: http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[42]: https://docs.datadoghq.com/fr/integrations/faq/aws-integration-with-terraform
[43]: https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:464622532012:applications~Datadog-Log-Forwarder
[44]: https://console.aws.amazon.com/lambda/home?region=us-east-1
[45]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/lambda_function.py
[46]: https://docs.datadoghq.com/fr/integrations/amazon_api_gateway
[47]: https://docs.datadoghq.com/fr/integrations/amazon_api_gateway/#log-collection
[48]: https://docs.datadoghq.com/fr/integrations/amazon_api_gateway/#send-logs-to-datadog
[49]: https://docs.datadoghq.com/fr/integrations/amazon_cloudfront
[50]: https://docs.datadoghq.com/fr/integrations/amazon_cloudfront/#enable-cloudfront-logging
[51]: https://docs.datadoghq.com/fr/integrations/amazon_cloudfront/#send-logs-to-datadog
[52]: https://docs.datadoghq.com/fr/integrations/amazon_cloudtrail
[53]: https://docs.datadoghq.com/fr/integrations/amazon_cloudtrail/#enable-cloudtrail-logging
[54]: https://docs.datadoghq.com/fr/integrations/amazon_cloudtrail/#send-logs-to-datadog
[55]: https://docs.datadoghq.com/fr/integrations/amazon_dynamodb
[56]: https://docs.datadoghq.com/fr/integrations/amazon_dynamodb/#enable-dynamodb-logging
[57]: https://docs.datadoghq.com/fr/integrations/amazon_dynamodb/#send-logs-to-datadog
[58]: https://docs.datadoghq.com/fr/integrations/amazon_ec2
[59]: https://docs.datadoghq.com/fr/logs
[60]: https://docs.datadoghq.com/fr/integrations/amazon_ecs
[61]: https://docs.datadoghq.com/fr/integrations/amazon_ecs/#log-collection
[62]: https://docs.datadoghq.com/fr/integrations/amazon_elb
[63]: https://docs.datadoghq.com/fr/integrations/amazon_elb/#enable-aws-elb-logging
[64]: https://docs.datadoghq.com/fr/integrations/amazon_elb/#manual-installation-steps
[65]: https://docs.datadoghq.com/fr/integrations/amazon_lambda
[66]: https://docs.datadoghq.com/fr/integrations/amazon_lambda/#log-collection
[67]: https://docs.datadoghq.com/fr/integrations/amazon_rds
[68]: https://docs.datadoghq.com/fr/integrations/amazon_rds/#enable-rds-logging
[69]: https://docs.datadoghq.com/fr/integrations/amazon_rds/#send-logs-to-datadog
[70]: https://docs.datadoghq.com/fr/integrations/amazon_route53
[71]: https://docs.datadoghq.com/fr/integrations/amazon_route53/#enable-route53-logging
[72]: https://docs.datadoghq.com/fr/integrations/amazon_route53/#send-logs-to-datadog
[73]: https://docs.datadoghq.com/fr/integrations/amazon_s3
[74]: https://docs.datadoghq.com/fr/integrations/amazon_s3/#enable-s3-access-logs
[75]: https://docs.datadoghq.com/fr/integrations/amazon_s3/#manual-installation-steps
[76]: https://docs.datadoghq.com/fr/integrations/amazon_sns
[77]: https://docs.datadoghq.com/fr/integrations/amazon_sns/#send-logs-to-datadog
[78]: https://docs.datadoghq.com/fr/integrations/amazon_redshift
[79]: https://docs.datadoghq.com/fr/integrations/amazon_redshift/#enable-aws-redshift-logging
[80]: https://docs.datadoghq.com/fr/integrations/amazon_redshift/#log-collection
[81]: https://docs.datadoghq.com/fr/integrations/amazon_vpc
[82]: https://docs.datadoghq.com/fr/integrations/amazon_vpc/#enable-vpc-flow-log-logging
[83]: https://docs.datadoghq.com/fr/integrations/amazon_vpc/#log-collection
[84]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#set-up-the-datadog-lambda-function
[85]: https://console.aws.amazon.com/iam/home#s=Home
[86]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[87]: https://app.datadoghq.com/logs
[88]: https://docs.datadoghq.com/fr/help
[89]: http://www.datadoghq.com/blog/dont-fear-the-agent
