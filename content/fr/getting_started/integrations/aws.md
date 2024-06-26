---
further_reading:
- link: https://www.datadoghq.com/blog/aws-monitoring/
  tag: Blog
  text: Métriques clés pour la surveillance AWS
- link: https://www.datadoghq.com/blog/aws-1-click-integration/
  tag: Blog
  text: Présentation de l'intégration AWS en un seul clic
- link: https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation/
  tag: Blog
  text: Déployer et configurer Datadog avec CloudFormation
- link: https://www.datadoghq.com/blog/monitoring-as-code-with-datadog-and-cloudformation/
  tag: Blog
  text: Implémenter la surveillance en tant que code avec Datadog et le registre CloudFormation
- link: https://www.datadoghq.com/blog/datadog-serverless-view/
  tag: Blog
  text: Surveiller toute votre pile sans serveur avec la vue Serverless
- link: https://www.datadoghq.com/blog/monitor-aws-fargate/
  tag: Blog
  text: Surveiller des applications ECS sur AWS Fargate avec Datadog
- link: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
  tag: Blog
  text: Surveiller Amazon ECS Anywhere avec Datadog
- link: /integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/?tab=cloudformation
  tag: Documentation
  text: Flux de métriques AWS CloudWatch avec Kinesis Data Firehose
- link: https://www.datadoghq.com/blog/monitor-aws-graviton3-with-datadog/
  tag: Blog
  text: Surveiller vos instances EC2 basées sur Graviton3 avec Datadog
kind: documentation
title: Débuter avec AWS
---

## Présentation

Ce guide présente la procédure globale à suivre pour intégrer un compte Amazon Web Services (AWS) à Datadog grâce au modèle CloudFormation de Datadog.

Vous devez essentiellement créer un rôle IAM et une stratégie associée afin d'activer le compte AWS de Datadog. Vous pourrez ainsi effectuer des appels API vers votre compte AWS afin de recueillir et de transmettre des données. Le modèle déploie également la fonction Lambda du [Forwarder Datadog][1], qui vous permet d'envoyer des logs à Datadog. Le modèle CloudFormation fournit tous les outils dont vous avez besoin pour transmettre ces données à votre compte Datadog. De plus, Datadog met à jour le modèle CloudFormation afin de toujours inclure les dernières fonctionnalités.

Une fois la connexion initiale établie, vous pouvez activer les intégrations de chaque service AWS dont vous avez besoin pour votre environnement. D'un simple clic, Datadog provisionne les ressources nécessaires dans votre compte AWS et commence à interroger les métriques et événements des services que vous utilisez. Pour les services AWS les plus populaires, Datadog fournit des dashboards prêts à l'emploi, qui vous permettent de consulter immédiatement des informations personnalisables pour gagner en visibilité sur vos environnements. Ce guide vous explique comment configurer l'intégration et comment installer l'Agent Datadog sur une instance EC2 Amazon Linux. Il comprend également une présentation globale des fonctionnalités de l'intégration. Consultez la rubrique [Activer des intégrations pour des services AWS spécifiques](#activer-des-integrations-pour-des-services-aws-specifiques) pour obtenir la liste des sous-intégrations disponibles.

Vous pouvez répéter ce processus pour autant de comptes AWS que vous le souhaitez, ou utiliser l'[API][3], l'[interface de ligne de commande AWS][4] ou [Terraform][5] pour configurer plusieurs comptes à la fois. Pour en savoir plus, consultez le [guide Datadog/Amazon CloudFormation][6].

## Prérequis

Avant de commencer, vérifiez que vous disposez des ressources suivantes :

1. Un compte [AWS][7]. Votre utilisateur AWS doit disposer des autorisations IAM suivantes pour pouvoir exécuter le modèle CloudFormation :

    * cloudformation:CreateStack
    * cloudformation:CreateUploadBucket
    * cloudformation:DeleteStack
    * cloudformation:DescribeStacks
    * cloudformation:DescribeStackEvents
    * cloudformation:GetStackPolicy
    * cloudformation:GetTemplateSummary
    * cloudformation:ListStacks
    * cloudformation:ListStackResources
    * ec2:DescribeSecurityGroups
    * ec2:DescribeSubnets
    * ec2:DescribeVpcs
    * iam:AttachRolePolicy
    * iam:CreatePolicy
    * iam:CreateRole
    * iam:DeleteRole
    * iam:DeleteRolePolicy
    * iam:DetachRolePolicy
    * iam:GetRole
    * iam:GetRolePolicy
    * iam:PassRole
    * iam:PutRolePolicy
    * iam:UpdateAssumeRolePolicy
    * kms:Decrypt
    * lambda:AddPermission
    * lambda:CreateFunction
    * lambda:DeleteFunction
    * lambda:GetCodeSigningConfig
    * lambda:GetFunction
    * lambda:GetFunctionCodeSigningConfig
    * lambda:GetLayerVersion
    * lambda:InvokeFunction
    * lambda:PutFunctionConcurrency
    * lambda:RemovePermission
    * lambda:TagResource
    * logs:CreateLogGroup
    * logs:DeleteLogGroup
    * logs:DescribeLogGroups
    * logs:PutRetentionPolicy
    * oam:ListSinks
    * oam:ListAttachedLinks
    * s3:CreateBucket
    * s3:DeleteBucket
    * s3:DeleteBucketPolicy
    * s3:GetEncryptionConfiguration
    * s3:GetObject
    * s3:GetObjectVersion
    * s3:PutBucketPolicy
    * s3:PutBucketPublicAccessBlock
    * s3:PutEncryptionConfiguration
    * secretsmanager:CreateSecret
    * secretsmanager:DeleteSecret
    * secretsmanager:GetSecretValue
    * secretsmanager:PutSecretValue
    * serverlessrepo:CreateCloudFormationTemplate

## Implémentation

2. Accédez à la [page de configuration de l'intégration AWS][8] dans Datadog, puis cliquez sur **Add AWS Account**.

3. Configurez les paramètres de l'intégration sous l'option **Automatically using CloudFormation**.
    a. Sélectionnez les régions AWS pour lesquelles vous souhaitez configurer l'intégration.
    b. Ajoutez votre [clé d'API][9] Datadog.  
    c. Si vous le souhaitez, envoyez des logs et d'autres données à Datadog via la [fonction Lambda du Forwarder Datadog][1].
    d. Vous avez également la possibilité d'activer la solution [Cloud Security Posture Management][54] (CSPM) afin d'analyser votre environnement cloud, vos hosts et vos conteneurs dans le but de détecter les problèmes de configuration et les risques de sécurité.

5. Cliquez sur **Launch CloudFormation Template** afin d'ouvrir la console AWS et de charger la pile CloudFormation. Tous les paramètres définis varient en fonction des informations que vous avez fournies dans le formulaire Datadog précédent. Vous n'avez donc pas besoin de modifier les paramètres, sauf si vous le souhaitez.
**Remarque** : le paramètre `DatadogAppKey` active la pile CloudFormation et permet donc d'effectuer des appels API vers Datadog, afin d'ajouter et de modifier la configuration Datadog pour ce compte AWS. La clé est automatiquement générée et liée à votre compte Datadog.

6. Cochez les cases requises depuis AWS et cliquez sur **Create stack**. La création de la pile Datadog ainsi que des trois piles imbriquées commence alors. Ce processus peut prendre quelques minutes. Vérifiez que la pile a bien été créée avant de poursuivre.

7. Une fois la pile créée, revenez au carré de l'intégration AWS dans Datadog et cliquez sur **Ready!**.

8. Patientez 10 minutes le temps que les données commencent à être recueillies, puis accédez au [dashboard récapitulatif d'AWS][12] prêt à l'emploi pour visualiser les métriques envoyées par vos services et votre infrastructure AWS :
{{< img src="getting_started/integrations/aws-dashboard.png" alt="Le dashboard récapitulatif d'AWS dans le compte Datadog. À gauche figure le logo AWS et un graphique d'événement AWS indiquant le message « No matching entries found ». Au centre de l'image se trouvent des informations sur les volumes EBS, avec des données numériques et une carte thermique affichant des données régulières. À droite se trouvent des informations sur les ELB, avec des données numériques ainsi qu'un graphique de série temporelle présentant des données irrégulières provenant de trois sources.">}}

## Activer des intégrations pour des services AWS spécifiques

Consultez la [page Intégrations][13] pour découvrir la liste complète des sous-intégrations disponibles. Bon nombre de ces intégrations sont installées par défaut dès lors que Datadog identifie que vous recevez des données provenant de votre compte AWS.

## Envoyer des logs

Il existe deux façons d'envoyer des logs de service AWS à Datadog :

- [Destination Kinesis Firehose][9] : utilisez la destination Datadog dans votre flux de diffusion Kinesis Firehose pour transmettre vos logs à Datadog. Il est conseillé de procéder de la même façon pour envoyer un volume très élevé de logs depuis CloudWatch.
- [Fonction Lambda du Forwarder][11] : déployez la fonction Lambda du Forwarder Datadog. Celle-ci s'abonne aux compartiments S3 ou à vos groupes de logs CloudWatch et transmet vos logs à Datadog. Vous **devez** procéder de cette façon pour envoyer de façon asynchrone des traces, des métriques optimisées ou des métriques custom depuis vos fonctions Lambda via des logs. Datadog vous conseille également d'utiliser cette méthode pour envoyer des logs depuis S3 ou depuis d'autres ressources ne prenant pas en charge la diffusion directe de données vers Kinesis.

Consultez la rubrique [Activer la journalisation pour votre service AWS][14] pour recevoir des logs depuis les services AWS les plus populaires.

### Validation

Une fois vos logs activés, consultez-les dans le [Log Explorer][15] en sélectionnant la facette `source` ou `service` dans le volet dédié. Voici un exemple de vue Log Explorer pour S3 :
{{< img src="getting_started/integrations/logs-explorer.png" alt="La page Log Explorer du compte Datadog. À gauche de l'image se trouvent les facettes Source et Service, pour lesquelles l'option « s3 » est cochée. Sur la droite, des entrées de log sont affichées dans une liste.">}}

## Tirer pleinement profit de la plateforme Datadog

### Gagner en visibilité avec l'Agent Datadog sur EC2

Par défaut, l'intégration Datadog/AWS a recours à l'API CloudWatch afin de récupérer les métriques fournies par AWS. Toutefois, pour optimiser votre visibilité sur vos instances EC2, vous pouvez utiliser l'[Agent Datadog][16]. Il s'agit un daemon léger qui transmet des métriques et des événements. Il peut également être configuré afin de recueillir des logs et des traces. La section [Agent Installation][17] de l'application Datadog contient des instructions d'installation de l'Agent pour un vaste choix de systèmes d'exploitation. Pour de nombreux systèmes d'exploitation (par exemple, Amazon Linux), vous pouvez exécuter des commandes d'installation complète de l'Agent depuis le terminal de l'instance :
{{< img src="getting_started/integrations/integrations-agent-installation.png" alt="La section Agent de l'onglet Integrations de Datadog. À gauche figure la liste des systèmes d'exploitation prenant en charge l'Agent Datadog. L'option « Amazon Linux » est mise en surbrillance dans cette liste. Sur la droite se trouve la section « Use our easy one-step install ». La commande d'installation de l'Agent est affichée sous cette section. La valeur de l'option DD_API_KEY est obfusquée.">}}

Une fois l'Agent installé, il est représenté par une icône en forme d'os dans la [liste d'infrastructures][18] :
{{< img src="getting_started/integrations/infrastructure-list.png" alt="La liste d'infrastructures avec deux hosts dans une liste. Les deux hosts possèdent une icône AWS ainsi qu'une case bleue « aws » pour indiquer qu'ils sont associés à l'intégration AWS. Un des hosts inclut également une icône en forme d'os, ainsi que les cases bleues « ntp » et « system ».">}}

Dans la capture d'écran ci-dessus, le host sur lequel l'Agent Datadog se trouve transmet des données à partir des checks [System][19] et [NTP][20]. Le check System fournit des métriques relatives au CPU, à la mémoire, au système de fichiers et aux E/S, afin d'obtenir des informations exploitables sur le host. Vous pouvez activer des [intégrations][21] supplémentaires en fonction de votre environnement et de vos scénarios d'utilisation, ou encore utiliser [DogStatsD][22] pour envoyer directement des métriques custom à Datadog.

Consultez la [FAQ sur l'installation de l'Agent Datadog sur des instances cloud][23] pour en savoir plus sur les avantages de cette méthode.

### Utiliser l'Agent Datadog avec les services de conteneurs Amazon

Que vous gériez vous-même vos instances ou utilisiez [Fargate][24] pour un environnement sans serveur, vous pouvez utiliser l'Agent Datadog pour vos environnements conteneurisés.

#### ECS avec le type de lancement EC2

Référez-vous à la [documentation relative à Amazon ECS][25] pour exécuter l'[Agent Docker Datadog][26] sur les instances EC2 de votre cluster ECS. Consultez la [section sur la collecte de logs][27] pour découvrir les métriques et événements transmis à votre compte Datadog.

#### ECS avec le type de lancement Fargate

Référez-vous à la [documentation relative à Amazon ECS sur AWS Fargate][28] pour exécuter l'Agent en tant que conteneur dans la même définition de tâche que votre application. **Remarque** : la version 6.11 de l'Agent Datadog, ou une version ultérieure, est requise pour profiter de l'ensemble des fonctionnalités de l'intégration Fargate.

#### EKS

Comme indiqué dans la [documentation sur les distributions Kubernetes][29], aucune configuration spécifique n'est requise pour Amazon Elastic Kubernetes Service (EKS), Référez-vous à la [documentation relative à Kubernetes][30] pour déployer l'Agent dans votre cluster EKS.

#### EKS avec Fargate

Les pods Fargate sont gérés par AWS. Pour cette raison, ils excluent les checks système basés sur des hosts, notamment ceux portant sur le processeur et la mémoire. Pour recueillir des données depuis vos pods AWS Fargate, consultez la [documentation relative à Amazon EKS sur AWS Fargate][31] afin d'exécuter l'Agent en tant que sidecar de votre pod d'application, avec des règles de contrôle d'accès basé sur les rôles (RBAC) personnalisées. **Remarque** : la version 7.17+ de l'Agent Datadog est requise.

#### EKS Anywhere

Référez-vous à la [documentation relative à EKS Anywhere][32] pour vos clusters Kubernetes sur site.

### Créer des ressources Datadog supplémentaires
Vous pouvez non seulement utiliser l'interface ou l'[API][33] Datadog, mais également créer de nombreuses [ressources Datadog][34] avec le [registre CloudFormation][35]. Pour une meilleure visibilité et une résolution simplifiée de vos problèmes, utilisez des [dashboards][36] afin de représenter des données clés, d'appliquer des [fonctions][37] et de repérer des [corrélations de métriques][38].

Pour être informé en cas de comportement indésirable ou inattendu dans votre compte, créez des [monitors][39]. Les monitors évaluent en continu les données transmises à votre compte et envoient des [notifications][40] de façon à partager des informations pertinentes avec les personnes adéquates. Consultez la [liste des intégrations générant des notifications][41] pour découvrir toutes les solutions disponibles pour prévenir vos équipes.

## Explorer des solutions connexes

### Serverless

Vous pouvez unifier les métriques, traces et logs provenant de vos fonctions AWS Lambda exécutant des applications sans serveur dans Datadog. Consultez la section [Informatique sans serveur][42] pour découvrir comment instrumenter votre application, installer des [bibliothèques et intégrations sans serveur][43], implémenter le [tracing distribué avec des applications sans serveur][44] et [corriger les problèmes de surveillance sans serveur][45]. 

### APM
Pour bénéficier d'analyses encore plus détaillées et récupérer des données supplémentaires à partir de vos applications et services AWS, activez la collecte de traces distribuées depuis l'intégration [AWS X-Ray][46] ou depuis un host sur lequel se trouve l'Agent Datadog avec [APM][47]. Consultez ensuite la rubrique [Explorer la solution APM Datadog][48] pour découvrir comment exploiter pleinement ces données afin d'obtenir des informations exploitables sur les performances de votre application.

Il est également possible d'utiliser [Watchdog][49], une fonctionnalité algorithmique analysant les performances APM et les métriques d'infrastructure. Vous pourrez ainsi détecter automatiquement les problèmes potentiels concernant votre application et recevoir des notifications à ce sujet.

### Securité

#### Cloud SIEM

Consultez la section [Débuter avec Cloud SIEM][50] pour appliquer des [règles de détection][51] prêtes à l'emploi à vos logs. Ces règles, qui sont personnalisables, génèrent des signaux de sécurité en cas de détection de menaces. Vous pouvez visualiser les signaux dans la vue [Security Signals Explorer][52]. Pour veiller à toujours prévenir la bonne équipe, configurez des préférences de notification pour plusieurs règles grâce aux [règles de notification][53].

#### CSPM

Référez-vous au guide [Débuter avec CSPM][54] pour apprendre à détecter et à évaluer les problèmes de configuration dans votre environnement cloud. Les règles de détection CSPM prêtes à l'emploi pour le [cloud][55] et l'[infrastructure][56] sont appliquées aux données des configurations des ressources. Elles signalent les techniques malveillantes et les problèmes potentiels de configuration, afin que vous puissiez agir sans plus tarder.

### Dépannage

Si vous rencontrez l'erreur `Datadog is not authorized to perform sts:AssumeRole`, consultez la [page dédiée à sa résolution][2]. Pour tout autre problème, consultez le [guide de dépannage de l'intégration AWS][57].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/guide/forwarder/
[2]: /fr/integrations/guide/error-datadog-not-authorized-sts-assume-role/
[3]: /fr/api/latest/aws-integration/#create-an-aws-integration
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudformation/index.html
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
[6]: /fr/integrations/guide/amazon_cloudformation/
[7]: https://aws.amazon.com/getting-started/?nc1=f_cc
[8]: https://app.datadoghq.com/integrations/amazon-web-services
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[11]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[12]: https://app.datadoghq.com/dash/integration/7/aws-overview
[13]: /fr/integrations/#cat-aws
[14]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#enable-logging-for-your-aws-service
[15]: https://app.datadoghq.com/logs
[16]: /fr/getting_started/agent/
[17]: https://app.datadoghq.com/account/settings/agent/latest
[18]: https://app.datadoghq.com/infrastructure
[19]: /fr/integrations/system/
[20]: /fr/integrations/ntp/
[21]: /fr/integrations/
[22]: /fr/developers/dogstatsd/?tab=hostagent
[23]: /fr/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[24]: https://aws.amazon.com/fargate/
[25]: /fr/agent/amazon_ecs/?tab=awscli
[26]: /fr/agent/docker/?tab=standard
[27]: /fr/agent/amazon_ecs/data_collected/
[28]: /fr/integrations/ecs_fargate/?tab=fluentbitandfirelens
[29]: /fr/agent/kubernetes/distributions/?tab=helm#EKS
[30]: /fr/agent/kubernetes/?tab=helm
[31]: /fr/integrations/eks_fargate/#setup
[32]: /fr/integrations/eks_anywhere/
[33]: /fr/api/latest/using-the-api/
[34]: /fr/integrations/guide/amazon_cloudformation/#resources-available
[35]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/registry.html
[36]: /fr/dashboards/#overview
[37]: /fr/dashboards/functions/
[38]: /fr/dashboards/correlations/
[39]: /fr/monitors/types
[40]: /fr/monitors/notify/
[41]: /fr/integrations/#cat-notification
[42]: /fr/serverless
[43]: /fr/serverless/libraries_integrations
[44]: /fr/serverless/distributed_tracing
[45]: /fr/serverless/troubleshooting
[46]: /fr/integrations/amazon_xray/
[47]: /fr/tracing/trace_collection/
[48]: /fr/tracing/#explore-datadog-apm
[49]: /fr/watchdog/
[50]: /fr/getting_started/cloud_siem/
[51]: /fr/security/default_rules/#cat-log-detection
[52]: /fr/security/explorer/
[53]: /fr/security/notifications/rules/
[54]: /fr/security/cspm/setup/
[55]: /fr/security/default_rules/#cat-posture-management-cloud
[56]: /fr/security/default_rules/#cat-posture-management-infra
[57]: /fr/integrations/guide/aws-integration-troubleshooting/