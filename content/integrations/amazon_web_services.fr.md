---
aliases:
  - /fr/integrations/aws/
  - /fr/logs/aws
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
description: Intégrez vos services AWS avec Datadog.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_web_services/'
git_integration_title: amazon_web_services
has_logo: true
integration_title: AWS
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_web_services
public_title: Intégration Datadog-AWS
short_description: Intégrez vos services AWS avec Datadog.
version: '1.0'
---
## Aperçu

Connectez-vous à Amazon Web Services (AWS) pour:

* Voir les mises à jour de statut AWS dans votre flux d'événements
* Obtenir des métriques CloudWatch pour les hôtes EC2 sans installer l'agent
* Tagger vos hôtes EC2 avec des informations spécifiques à EC2 (par exemple la zone de disponibilité)
* Voir les périodes maintenances de EC2 planifiées dans votre flux
* Collecte des métriques et les événements CloudWatch des nombreux autres produits AWS


Les intégrations connexes incluent:

|                                                           |                                                                               |
| :---------------------------------------------------------|:------------------------------------------------------------------------------|
| [API Gateway][8]                | créer, publier, maintenir et sécuriser les API                                    |
| [Autoscaling][9]               | scale EC2 capacity                                                            |
| [Billing][10]                       | billing and budgets                                                           |
| [CloudFront][11]                 | glocal content delivery network                                               |
| [CloudTrail][12]                 | accès aux fichiers de log et aux appels d'API AWS                                         |
| [CloudSearch][13]               | accès aux fichiers de log et aux appels d'API AWS                                         |
| [Direct Connect][14]          | connexion réseau dédiée à AWS                                           |
| [Dynamo DB][15]                      | NoSQL Database                                                                |
| [EC2 Container Service (ECS)][16]          | service de gestion de conteneur prenant en charge les conteneurs Docker                  |
| [Elastic Beanstalk][17]           | service facile à utiliser pour le déploiement et le scaling d'applications et de services Web   |
| [Elastic Block Store (EBS)][18]         | volumes de stockage au niveau du bloc persistant                                        |
| [ElastiCache][19]               | cache in-memory dans le cloud                                                  |
| [Elastic Cloud Compute (EC2)][20]       | capacité de calcul redimensionnable dans le cloud                                       |
| [Elastic File System (EFS)][21]         | stockage de fichiers partagé                                                           |
| [Elastic Load Balancing (ELB)][22]      | distribue le trafic d'applications entrantes sur plusieurs instances Amazon EC2 |
| [Elastic Map Reduce (EMR)][23]          | data processing using Hadoop                                                  |
| [Elasticsearch Service (ES)][24]         |  déployer, exploiter et mettre à l'échelle les clusters Elasticsearch                            |
| [Firehose][25]                     | capture and load streaming data                                               |
| [IOT][26]                               | connecter des périphériques IOT avec des services cloud                                       |
| [Kinesis][27]                       | service pour le traitement en temps réel de grands flux de données distribués           |
| [Key Management Service (KMS)][28]      | créer et contrôler les clés de chiffrement                                            |
| [Lambda][29]                         | serverless computing                                                          |
| [Machine Learning (ML)][30]              | créer des modèles de machine learning                                                |
| [OpsWorks][31]                     | gestion de la configuration                                                      |
| [Polly][32]                           | service de texte-discours                                                           |
| [Redshift][33]                     | solution de data warehouse                                                       |
| [Relational Database Service (RDS)][34] | base de données relationnelle dans le cloud                                              |
| [Route 53][35]                      | Gestion du DNS et du trafic avec monitoring de la disponibilité                       |
| [Simple Email Service (SES)][36]        | service d'envoi de courrier électronique sortant uniquement                           |
| [Simple Notification System (SNS)][37]  | alerte et notifications                                                       |
| [Simple Queue Service (SQS)][38]        | service de file d'attente de messagerie                                                       |
| [Simple Storage Service (S3)][39]        | service de stockage cloud hautement disponible et évolutif                           |
| [Simple Workflow Service (SWF)][40]     | gestion du workflow cloud                                                     |
| [Storage Gateway][41]        | stockage cloud hybride                                                          |
| [Web Application Firewall (WAF)][42]    | protéger les applications Web contre les intrusions Web courantes                             |
| [Workspaces][43]                 | service informatique de bureau sécurisé                                              |

## Implémentation
### Installation

La configuration de l'intégration de Datadog avec Amazon Web Services nécessite la configuration de la délégation de rôles à l'aide d'AWS IAM. 
Pour mieux comprendre la délégation des rôles, reportez-vous au [AWS IAM Best Practices guide][44].

<div class="alert alert-warning">
Les régions GovCloud et China ne prennent pas actuellement en charge la délégation de rôle IAM. 
Si vous déployez dans ces régions, veuillez passer la séction  <a href="#configuration-for-china-and-govcloud">configuration </a> ci dessous.
</div>

1.  Créez un nouveau rôle dans la [console IAM d'AWS][45].
2.  Sélectionnez `Un autre compte AWS` pour le Role Type.
3.  Pour Account ID, entrez 464622532012` (identifiant de compte Datadog). Cela signifie que vous accordez à Datadog un accès en lecture seule à vos données AWS.
4.  Cochez la case `Require external ID` et entrez celle générée [dans l'application Datadog][46]. Assurez-vous de laisser **Require MFA** désactivé. *Pour plus d'informations sur External ID, reportez-vous à [ce document dans le Guide de l'utilisateur IAM][47]*.
5.  Cliquez sur `Next: Permissions`.
6.  Cliquez sur `Create Policy`. Notez que si vous avez déjà créé la politique, recherchez-la sur cette page et utilisez-la avec "select it". Sinon, complétez ce qui suit pour en créer une nouvelle.
7.  Choisissez `Create Your Own Policy`.
8.  Nommez la politique `DatadogAWSIntegrationPolicy`, ou un autre nom de votre choix et fournissez une description adéquate. Pour tirer parti de toutes les intégrations AWS offertes par Datadog, utilisez ce qui suit dans la zone de texte **Policy Document**. Lorsque nous ajoutons d'autres composants à l'intégration, ces autorisations peuvent changer.

<div class="alert alert-info">
Ces actions et celles listées ci-dessous sont incluses dans le document de stratégie en utilisant des caractères génériques tels que <code>List*</code> and <code>Get*</code>. Si vous avez besoin de règles strictes, veuillez utiliser les noms d'action complets indiqués et vous reporter à la documentation de l'API Amazon pour les services dont vous avez besoin.
</div>

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
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
        "tag:getResources",
        "tag:getTagKeys",
        "tag:getTagValues"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
```

Si vous n'êtes pas à l'aise avec l'octroi de toutes ces autorisations, utilisez au moins les actions suivantes: **AmazonEC2ReadOnlyAccess** et **CloudWatchReadOnlyAccess**, pour plus d'informations sur les permissions, consultez la section [Permissions](#permissions) ci-dessous.
9.  Cliquez sur `Next: Review`.
10.  Attribuez un nom au rôle, par exemple `DatadogAWSIntegrationRole` et une description appropriée, puis cliquez sur `Create Role`.

### Permissions

L'intégration de base Datadog-AWS extrait des données d'AWS CloudWatch. Au minimum, votre Policy Document doit autoriser les actions suivantes:

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
        "tag:getResources",
        "tag:getTagKeys",
        "tag:getTagValues"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
```

* **Cloudwatch**:

    * `cloudwatch:ListMetrics` pour lister les métriques CloudWatch disponibles.
    * `cloudwatch:GetMetricStatistics` pour extraire des points de données pour une métrique donnée.

* **Support**:

    * `support:*`: Utilisé pour ajouter des statistiques sur les limites de service.<br>Il nécessite un accès complet en raison des [limitations AWS][48]

* **Tag**:

    * `tag:getResources`: Utilisé pour obtenir des tags personnalisées par type de ressource.
    * `tag:getTagKeys`: Permet d'obtenir des clés de tag par région dans un compte AWS.
    * `tag:getTagValues`: Permet d'obtenir des valeurs de tag par région dans un compte AWS.

    L'utilisation principale de l'API Resource Group Tagging consiste à réduire le nombre d'appels d'API dont nous avons besoin pour collecter les tags custom.  Pour plus d'informations sur [les règles de tag][49], consultez la documentation sur le site Web AWS.

### Configuration

{{< img src="integrations/aws/integrations-aws-secretentry.png" alt="logo" responsive="true">}}

1.  Ouvrez la [l'intégration AWS](https://app.datadoghq.com/account/settings#integrations/amazon_web_services).
2.  Sélectionnez l'onglet **Role Delegation**.
3.  Inscrivez votre identifient de compte AWS **sans tirets**, e.g. 123456789012, et non 1234-5678-9012. Votre identifiant de compte peut être trouvé dans l'ARN du rôle nouvellement créé. Ensuite, inscrivez le nom du rôle que vous venez de créer.
4.  Choisissez les services pour lesquels vous désirez récupérer les métriques sur le côté gauche de la fenêtre de dialogue. Facultativement, vous pouvez ajouter des tags à tous les hôtes et métriques. De même, si vous souhaitez uniquement surveiller un sous-ensemble d'instances EC2 sur AWS, marquez-les et spécifiez le tag dans la zone de texte « limite » ici.
5.  Cliquez **Install Integration**.

#### Configuration pour la Chine et GovCloud

1.  Ouvrez la [l'intégration AWS](https://app.datadoghq.com/account/settings#integrations/amazon_web_services).
2.  Sélectionnez l'onglet **Access Keys (GovCloud or China Only)**.
3.  Inscrivez vos clés AWS d’accès et secrète respectivement. **Uniquement les clés d'accès et secrète pour la Chine et GovCloud sont permis.**
4.  Choisissez les services pour lesquels vous désirez récupérer les métriques sur le côté gauche de la fenêtre de dialogue. Facultativement, vous pouvez ajouter des tags à tous les hôtes et métriques. De même, si vous souhaitez uniquement surveiller un sous-ensemble d'instances EC2 sur AWS, marquez-les et spécifiez le tag dans la zone de texte « limite » ici.
5.  Cliquez **Install Integration**.

## Collecte de log

Pour commencer à récupérer des journaux d'évènements à partir d'un de vos services AWS, voici le processus général:

1. Configurer la fonction lambda Datadog
2. Activer la journalisation pour votre service AWS
2. Configurez les déclencheurs qui provoquent l'exécution de Lambda et envoyez les journaux d'évènements vers Datadog. Il existe deux façons de configurer les déclencheurs :

  * [automatiquement](#automatic-log-collection) : Avec les [permissions](#permissions) appropriées, Datadog les gère pour vous.
  * [manuellement](#manually-set-up-triggers) : configurez vous-même chaque déclencheur dans la console AWS.


### Créez une nouvelle fonction Lambda

1. Naviguez vers le [Console Lambda][50] et créez une nouvelle fonction :
    {{< img src="logs/aws/create_lambda_function.png" alt="Create Lambda function" responsive="true" style="width:80%;" >}}

2. Sélectionnez **Author from scratch** et inscrivez un nom unique pour la fonction.
3. Modifiez le Runtime en tant que **Python 2.7**
4. Pour `Role`, sélectionnez **Create new role from template(s)** et inscrivez un nom unique pour le rôle.
5. Parmi les modèles de stratégie, recherchez pour et sélectionnez **s3 object read-only permissions**.
6. Sélectionnez **Create Function**.
    {{< img src="logs/aws/author_from_scratch.png" alt="Author from Scratch" responsive="true" style="width:80%;" >}}

#### Fournissez le code et configurez le Lambda

1. Copiez et collez le code depuis [ce répo][51] dans le champ de code de la fonction.
2. Assurez-vous que le Handler indique **lambda_function.lambda_handler**
    {{< img src="logs/aws/select_python.png" alt="Select Python" responsive="true" style="width:80%;" >}}
3. En haut du script vous trouverez une section intitulée `#Parameters`. Vous disposez de deux options pour fournir la clé API requise par la fonction Lambda :

    * Configurez une variable d'environnement (préféré)
    * Éditez le code directement avec votre clé d'API de Datadog
    {{< img src="logs/aws/dd_api_key_setup.png" alt="DD API key setup" responsive="true" style="width:80%;" >}}
4. Faites défiler en dépassant la champ de code en ligne pour retrouvez **Basic Settings**.
5. Réglez la mémoire à **environ 1Go**.
6. Réglez la limite de délai d'expiration. Nous recommandons **120 secondes**.
    {{< img src="logs/aws/basic_settings.png" alt="Basic Settings" responsive="true" style="width:80%;" >}}
7. Refaites défiler vers le haut de la page et cliquez **Save**.

#### Testez votre Lambda

1. Appuyez **Test**.
2. Recherchez pour et sélectionnez **Cloudwatch Logs** comme échantillon d'évènement.
    {{< img src="logs/aws/test_event.png" alt="Test Event" responsive="true" style="width:80%;" >}}
2. Fournissez un nom unique pour l'évènement et appuyez **Create**.
3. Appuyez Test et assurez-vous que le test réussisse sans aucune erreur.


### Activez le journal d'évènements pour votre service AWS.

N'importe quel service AWS qui génère des journaux d'évènements et leur place dans un compartiment S3 ou un groupe de journaux Cloudwatch est compatible. Veuillez trouver des instructions spécifiques pour les services le plus fréquemment utilisés dans le tableau ci-dessous :

|AWS service | Activez le journal d'évènements du service AWS | Envoyer des logs AWS à Datadog|
|:------|:-----|:------|
|[API Gateway][52]| [Activer les logs AWS API Gateway][53]|Collecte de log [manuelle][54] |
|[Cloudfront][55]| [Activer les logs AWS Cloudfront][56]|Collecte de log [manuelle][57] |
|[Cloudtrail][58]| [Activer les logs AWS Cloudtrail][59]|Collecte de log [manuelle][60] |
|[DynamoDB][61]| [Activer les logs AWS DynamoDB][62]|Collecte de log [manuelle][63] |
|[EC2][64]|`-`| Utilisez l'[Agent de Datadog][65] ou un autre [outil d'envoi de logs][66] pour transmettre vos logs à Datadog.|
|[ECS][67]|`-`|[Utilisez l'agent Docker afin de récupérer vos journaux d'évènements][68]|
| [Elastic Load Balancing (ELB)][69] | [Activer les logs AWS ELB][70] |Collecte de log [manuelle][71] et [automatique](#automatic-log-collection) |
|[Lambda][72]| `-` |Collecte de log [manuelle][73] |
|[RDS][74]| [Activer les logs AWS RDS][75]|Collecte de log [manuelle][76] |
|[Route 53][77]| [Activer les logs AWS Route 53][78]|Collecte de log [manuelle][79] |
| [S3][80] | [Activer les logs AWS S3][81] |Collecte de log [manuelle][82] et [automatique](#automatic-log-collection)|
|[SNS][83]| Il n'y a pas de « SNS Logs ». Traitez les journaux et le évènements qui transitent vers les le service SNS. |Collecte de log [manuelle][84] |

### Envoyer des journaux d'évènements AWS vers Datadog
#### Collecte de log automatique

Si vous stockez des journaux d'évènements dans plusieurs compartiments S3, Datadog peut gérer les déclencheurs de votre part.

1. Si vous ne l'avez pas déjà fait, configurez [la fonction Lambda pour collecte de log AWS][85].
2. Ajoutez les autorisations nécessaires dans votre rôle Datadog dans le [console IAM](https://console.aws.amazon.com/iam/home#/roles). Vous avez potentiellement certaines de ces autorisations déjà présentes grâce à nos autres intégrations AWS. Plus d'information concernant la façon dont ces autorisations sont exploitées peut être retrouvée dans la section [permissions](#permissions) ci-dessous.

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
    "s3:PutBucketNotification"
    ```

    * `cloudfront:GetDistributionConfig` : Obtenez le nom du compartiment S3 qui contient le journal d'évènements d'accès CloudFront.
    * `cloudfront:ListDistributions` : Listez toutes les distributions CloudFront.
    * `elasticloadbalancing:DescribeLoadBalancers` : Listez toutes les répartiteurs de charge.
    * `elasticloadbalancing:DescribeLoadBalancerAttributes` : Obtenez le nom du compartiment S3 qui contient le journal d'évènements d'accès ELB.
    * `lambda:AddPermission` : Ajouter une autorisation permettant à un compartiment S3 donné de déclencher une fonction Lambda.
    * `lambda:GetPolicy` : Obtient la règle Lambda lorsque les déclencheurs doivent être supprimés.
    * `lambda:RemovePermission` : Supprimer les autorisations d'une stratégie Lambda.
    * `redshift:DescribeClusters` : Listez toutes les grappes Redshift.
    * `redshift:DescribeLoggingStatus` : Obtenez le nom du compartiment S3 qui contient le journal d'évènements Redshift.
    * `s3:GetBucketLogging` : Obtenez le nom du compartiment S3 qui contient le journal d'évènements d'accès S3.
    * `s3:GetBucketLocation` : Obtenez la region du compartiment S3 qui contient le journal d'évènements d'accès S3.
    * `s3:GetBucketNotification` : Obtenez les configurations existantes du déclencheur Lambda.
    * `s3:ListAllMyBuckets` : Listez toutes les compartiments S3.
    * `s3:PutBucketNotification` : Ajoutez ou supprimez un déclencheur Lambda selon des événements de compartiment S3.

3. Naviguez vers l'onglet *Collect Logs* dans le [carreau AWS Integration](https://app.datadoghq.com/account/settings#integrations/amazon_web_services)
4. Sélectionnez le compte AWS depuis lequel vous désirez récupérer des journaux d'évènements et inscrivez l'ARN du Lambda créée dans la section précédente.
{{< img src="logs/aws/AWSLogStep1.png" alt="Enter Lambda" responsive="true" style="width:80%;" >}}
5. Cochez les services à partir desquels vous souhaitez récupérer les journaux d'évènements et cliquez sur enregistrer. Pour arrêter la collecte des journaux d'un service spécifique, décochez-le.
{{< img src="logs/aws/AWSLogStep2.png" alt="Select services" responsive="true" style="width:80%;" >}}
6. Si vous avez des journaux dans plusieurs régions, vous devez créer des fonctions Lambda supplémentaires dans ces régions et leur inscrivez dans ce carreau.
7. Pour arrêter la collecte de tous les journaux AWS, appuyez sur le *x* à côté de chaque ARN Lambda. Tous les déclencheurs de cette fonction seront supprimés.
8. Dans un délai de quelques minutes après cette configuration initiale, vous verrez vos journaux AWS apparaître dans notre [plate-forme de log][86] en temps quasi réel.

**Note** Stockez les journaux d'évènements pour des distributions différentes dans le même compartiment. Lors de l'activation de la journalisation, spécifiez un préfixe facultatif pour les noms de fichiers, afin de [conserver la relation entre les journaux d'évènements et les distributions respectives][87].

**Pour que Datadog puisse étiqueter les journaux d'évènements CloudFront comme `source:cloudfront` il est nécessaire d'inclure `cloudfront` quelque part dans le préfixe.**

#### Configurez les déclencheurs manuellement
Dans votre Lambda, naviguez vers l'onglet des déclencheurs et sélectionnez `Add Trigger` :

{{< img src="logs/aws/adding_trigger.png" alt="Adding trigger" responsive="true" style="width:80%;">}}

Sélectionnez la source de journal d'évènements et ensuite suivez les instructions AWS :

{{< img src="logs/aws/integration_lambda.png" alt="Integration Lambda" responsive="true" style="width:80%;">}}

Par exemple, n'oubliez pas de définir le type d'évènement correct pour les compartiments S3 :

{{< img src="logs/aws/object_created.png" alt="Object Created" responsive="true" style="width:80%;">}}

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_web_services" >}}


### Évènements

Les intégrations Datadog-AWS enverrez tous vos évènements CloudWatch dans votre [Event stream][89]

## Troubleshooting

### Vous constatez un écart entre vos données dans CloudWatch et Datadog ?

Il y a deux distinctions importantes à connaître:

  1. Dans AWS pour les compteurs, un graphique défini sur 'sum' '1minute' indique le nombre total d'occurrences dans une minute jusqu'à ce point, c'est-à-dire le taux par minute. Datadog affiche les données brutes à partir des valeurs AWS normalisées par seconde, quelle que soit la période sélectionnée dans AWS, ce qui explique pourquoi notre valeur sera probablement inférieure.
  2. Globalement, min / max / avg ont une signification différente entre AWS et Datadog. Dans AWS, la latence moyenne, la latence minimale, et la latence maximale sont trois mesures distinctes récupérés par AWS. Lorsque Datadog extrait des métriques d'AWS CloudWatch, nous obtenons uniquement la latence moyenne sous la forme d'une série chronologique unique par ELB. Dans Datadog, lorsque vous sélectionnez 'min', 'max', ou 'avg', vous contrôlez la façon dont plusieurs séries chronologique seront combinées. Par exemple, demander `system.cpu.idle` sans aucun filtre retournerait une série pour chaque hôte qui signale cette métrique et ces séries doivent être combinées pour être représentées graphiquement. D'un autre côté, si vous avez demandé `system.cpu.idle` à partir d'un seul hôte, aucune agrégation ne serait nécessaire et la basculement entre moyenne et maximum donnerait le même résultat.

### Métriques retardées?

Lorsque vous utilisez l'intégration AWS, nous récupérons des métriques via l'API CloudWatch. Vous pouvez constater un léger retard dans les métriques d'AWS en raison de certaines contraintes qui existent pour leur API.

Pour commencer, l'API CloudWatch propose uniquement une analyse métrique-par-métrique afin d'extraire des données. Les API CloudWatch ont une limite de débit qui varie en fonction de la combinaison des informations d'authentification, de la région et du service. Les métriques sont mises à disposition par AWS en fonction du niveau du compte. Par exemple, si vous payez pour des « statistiques détaillées » dans AWS, elles sont disponibles plus rapidement. Ce niveau de service pour les métriques détaillées s'applique également à la granularité, certaines métriques étant disponibles par minute et d'autres par cinq minutes.

Du côté de Datadog, nous avons la possibilité de classer par ordre de priorité certaines métriques dans un compte pour les récupérer plus rapidement, selon les circonstances. Veuillez contacter [support@datadoghq.com][6] pour plus d'informations.

Afin d'obtenir des métriques avec un délai quasiment nul, nous vous recommandons d'installer l'Agent Datadog sur ces hôtes. Nous avons écrit un peu à ce sujet [ici][7], particulièrement en ce qui concerne CloudWatch.



### Métriques manquantes?

L'API de CloudWatch ne renvoie que des métriques avec des points de données, donc si une instance ELB n'a aucune instances attachés (par exemple), il ne devrait pas voir les métriques associées à cet ELB dans Datadog.



### Mauvais compte de aws.elb.healthy_host_count?


Lorsque l'option d'équilibrage de charge entre zones est activée dans un ELB, toutes les instances attachées à cet ELB seront considérées comme faisant partie de toutes les zones de disponibilité (côté CloudWatch), donc si vous avez 2 instances dans 1a et 3 dans ab, la métrique affichera 5 instances par zone de disponibilité.
Comme cela peut être contre-intuitif, nous avons ajouté de nouvelles métriques, **aws.elb.healthy_host_count_deduped** et **aws.elb.un_healthy_host_count_deduped**, qui affichent le nombre d'instances disponibles par zone de disponibilité, peu importe si cette option d'équilibrage de charge entre zones est activée ou non.

### Hôtes dupliqués lors de l'installation de l'agent?


Lors de l'installation de l'agent sur un hôte aws, vous pouvez voir des hôtes dupliqués sur la page infra pendant quelques heures si vous définissez manuellement le nom d'hôte dans la configuration de l'agent. Ce second hôte disparaîtra quelques heures plus tard et n'affectera pas votre facturation.



   [1]: https://console.aws.amazon.com/iam/home#s=Home
   [2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services

   [6]: mailto:support@datadoghq.com
   [7]: http://www.datadoghq.com/blog/dont-fear-the-agent


[8]: https://docs.datadoghq.com/integrations/awsapigateway
[9]: https://docs.datadoghq.com/integrations/awsautoscaling
[10]: https://docs.datadoghq.com/integrations/awsbilling
[11]: https://docs.datadoghq.com/integrations/awscloudfront
[12]: https://docs.datadoghq.com/integrations/awscloudtrail
[13]: https://docs.datadoghq.com/integrations/awscloudsearch
[14]: https://docs.datadoghq.com/integrations/awsdirectconnect
[15]: https://docs.datadoghq.com/integrations/awsdynamo
[16]: https://docs.datadoghq.com/integrations/ecs
[17]: https://docs.datadoghq.com/integrations/awsbeanstalk
[18]: https://docs.datadoghq.com/integrations/awsebs
[19]: https://docs.datadoghq.com/integrations/awselasticache
[20]: https://docs.datadoghq.com/integrations/awsec2
[21]: https://docs.datadoghq.com/integrations/awsefs
[22]: https://docs.datadoghq.com/integrations/awselb
[23]: https://docs.datadoghq.com/integrations/awsemr
[24]: https://docs.datadoghq.com/integrations/awses
[25]: https://docs.datadoghq.com/integrations/awsfirehose
[26]: https://docs.datadoghq.com/integrations/awsiot
[27]: https://docs.datadoghq.com/integrations/awskinesis
[28]: https://docs.datadoghq.com/integrations/awskms
[29]: https://docs.datadoghq.com/integrations/awslambda
[30]: https://docs.datadoghq.com/integrations/awsml
[31]: https://docs.datadoghq.com/integrations/awsopsworks
[32]: https://docs.datadoghq.com/integrations/awspolly
[33]: https://docs.datadoghq.com/integrations/awsredshift
[34]: https://docs.datadoghq.com/integrations/awsrds
[35]: https://docs.datadoghq.com/integrations/awsroute53
[36]: https://docs.datadoghq.com/integrations/awsses
[37]: https://docs.datadoghq.com/integrations/awssns
[38]: https://docs.datadoghq.com/integrations/awssqs
[39]: https://docs.datadoghq.com/integrations/amazon_s3
[40]: https://docs.datadoghq.com/integrations/awsswf
[41]: https://docs.datadoghq.com/integrations/awsstoragegateway
[42]: https://docs.datadoghq.com/integrations/awswaf
[43]: https://docs.datadoghq.com/integrations/awsworkspaces
[44]: http://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles
[45]: https://console.aws.amazon.com/iam/home#/roles
[46]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[47]: http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[48]: http://docs.aws.amazon.com/IAM/latest/UserGuide/list_trustedadvisor.html
[49]: http://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/Welcome.html
[50]: https://console.aws.amazon.com/lambda/home?region=us-east-1
[51]: https://github.com/DataDog/dd-aws-lambda-functions/blob/master/Log/lambda_function.py
[52]: https://docs.datadoghq.com/integrations/amazon_api_gateway
[53]: https://docs.datadoghq.com/integrations/amazon_api_gateway/#log-collection
[54]: https://docs.datadoghq.com/integrations/amazon_api_gateway/#send-logs-to-datadog
[55]: https://docs.datadoghq.com/integrations/amazon_cloudfront
[56]: https://docs.datadoghq.com/integrations/amazon_cloudfront/#enable-cloudfront-logging
[57]: https://docs.datadoghq.com/integrations/amazon_cloudfront/#send-logs-to-datadog
[58]: https://docs.datadoghq.com/integrations/amazon_cloudtrail
[59]: https://docs.datadoghq.com/integrations/amazon_cloudtrail/#enable-cloudtrail-logging
[60]: https://docs.datadoghq.com/integrations/amazon_cloudtrail/#send-logs-to-datadog
[61]: https://docs.datadoghq.com/integrations/amazon_dynamodb
[62]: https://docs.datadoghq.com/integrations/amazon_dynamodb/#enable-dynamodb-logging
[63]: https://docs.datadoghq.com/integrations/amazon_dynamodb/#send-logs-to-datadog
[64]: https://docs.datadoghq.com/integrations/amazon_ec2
[65]: https://docs.datadoghq.com/logs
[66]: https://docs.datadoghq.com/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
[67]: https://docs.datadoghq.com/integrations/amazon_ecs
[68]: https://docs.datadoghq.com/integrations/amazon_ecs/#log-collection
[69]: https://docs.datadoghq.com/integrations/amazon_elb
[70]: https://docs.datadoghq.com/integrations/amazon_elb/#enable-aws-elb-logging
[71]: https://docs.datadoghq.com/integrations/amazon_elb/#manual-installation-steps
[72]: https://docs.datadoghq.com/integrations/amazon_lambda
[73]: https://docs.datadoghq.com/integrations/amazon_lambda/#log-collection
[74]: https://docs.datadoghq.com/integrations/amazon_rds
[75]: https://docs.datadoghq.com/integrations/amazon_rds/#enable-rds-logging
[76]: https://docs.datadoghq.com/integrations/amazon_rds/#send-logs-to-datadog
[77]: https://docs.datadoghq.com/integrations/amazon_route53
[78]: https://docs.datadoghq.com/integrations/amazon_route53/#enable-route53-logging
[79]: https://docs.datadoghq.com/integrations/amazon_route53/#send-logs-to-datadog
[80]: https://docs.datadoghq.com/integrations/amazon_s3
[81]: https://docs.datadoghq.com/integrations/amazon_s3/#enable-s3-access-logs
[82]: https://docs.datadoghq.com/integrations/amazon_s3/#manual-installation-steps
[83]: https://docs.datadoghq.com/integrations/amazon_sns
[84]: https://docs.datadoghq.com/integrations/amazon_sns/#send-logs-to-datadog
[85]: https://docs.datadoghq.com/integrations/amazon_web_services/#create-a-new-lambda-function
[86]: https://app.datadoghq.com/logs
[87]: http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html#access-logs-choosing-s3-bucket
[88]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/amazon_web_services_metadata.csv
[89]: https://docs.datadoghq.com/graphing/event_stream/