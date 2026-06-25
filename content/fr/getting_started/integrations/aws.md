---
description: Intégrez votre compte Amazon Web Services avec Datadog en utilisant CloudFormation.
  Configurez les rôles IAM, activez les intégrations de services et configurez le
  transfert de journaux.
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
  text: Flux de métriques AWS CloudWatch avec Amazon Data Firehose
- link: https://www.datadoghq.com/blog/monitor-aws-graviton3-with-datadog/
  tag: Blog
  text: Surveiller vos instances EC2 basées sur Graviton3 avec Datadog
title: Débuter avec AWS
---
## Aperçu {#overview}

Ce guide vous accompagne dans l'intégration d'un compte Amazon Web Services (AWS) avec Datadog en utilisant le modèle CloudFormation de Datadog. Après avoir terminé la configuration, vous pouvez activer des intégrations de services AWS individuelles, installer l'agent Datadog sur des instances EC2 pour une visibilité approfondie et configurer le transfert de journaux.

## Prérequis {#prerequisites}

Avant de commencer, assurez-vous de disposer d'un compte [AWS][7]. Le modèle CloudFormation crée un rôle IAM et une politique associée, permettant au compte AWS de Datadog d'effectuer des appels API à votre compte AWS pour collecter et transmettre des données. Votre utilisateur AWS doit disposer des autorisations IAM suivantes pour exécuter le modèle :

{{% collapse-content title="Autorisations IAM requises" level="h4" expanded=false id="iam-permissions" %}}
- cloudformation:CreateStack
- cloudformation:CreateUploadBucket
- cloudformation:DeleteStack
- cloudformation:DescribeStacks
- cloudformation:DescribeStackEvents
- cloudformation:GetStackPolicy
- cloudformation:GetTemplateSummary
- cloudformation:ListStacks
- cloudformation:ListStackResources
- ec2:DescribeSecurityGroups
- ec2:DescribeSubnets
- ec2:DescribeVpcs
- iam:AttachRolePolicy
- iam:CreatePolicy
- iam:CreateRole
- iam:DeleteRole
- iam:DeleteRolePolicy
- iam:DetachRolePolicy
- iam:GetRole
- iam:GetRolePolicy
- iam:PassRole
- iam:PutRolePolicy
- iam:TagRole
- iam:UpdateAssumeRolePolicy
- kms:Decrypt
- lambda:AddPermission
- lambda:CreateFunction
- lambda:DeleteFunction
- lambda:GetCodeSigningConfig
- lambda:GetFunction
- lambda:GetFunctionCodeSigningConfig
- lambda:GetLayerVersion
- lambda:InvokeFunction
- lambda:PutFunctionConcurrency
- lambda:RemovePermission
- lambda:TagResource
- logs:CreateLogGroup
- logs:DeleteLogGroup
- logs:DescribeLogGroups
- logs:PutRetentionPolicy
- oam:ListSinks
- oam:ListAttachedLinks
- s3:CreateBucket
- s3:DeleteBucket
- s3:DeleteBucketPolicy
- s3:GetEncryptionConfiguration
- s3:GetObject
- s3:GetObjectVersion
- s3:PutBucketPolicy
- s3:PutBucketPublicAccessBlock
- s3:PutEncryptionConfiguration
- s3:PutLifecycleConfiguration
- secretsmanager:CreateSecret
- secretsmanager:DeleteSecret
- secretsmanager:GetSecretValue
- secretsmanager:PutSecretValue
- serverlessrepo:CreateCloudFormationTemplate
{{% /collapse-content %}}

## Configurer {#setup}

1. Allez à la [page de configuration d'intégration AWS][8] dans Datadog et cliquez sur {{< ui >}}Add AWS Account{{< /ui >}}.
1. Configurez les paramètres de l'intégration sous l'option {{< ui >}}Automatically using CloudFormation{{< /ui >}}.
   1. Sélectionnez les régions AWS à intégrer.
   1. Ajoutez votre [clé API Datadog][9].
   1. Optionnellement, envoyez des journaux et d'autres données à Datadog avec le [Lambda Datadog Forwarder][1].
   1. Optionnellement, activez [Cloud Security Misconfigurations][54] pour analyser votre environnement cloud, vos hôtes et vos conteneurs pour des erreurs de configuration et des risques de sécurité.
1. Cliquez sur {{< ui >}}Launch CloudFormation Template{{< /ui >}}. Cela ouvre la Console AWS et charge la pile CloudFormation. Tous les paramètres sont remplis en fonction de vos sélections dans le formulaire Datadog précédent, donc vous n'avez pas besoin de les modifier sauf si vous le souhaitez.
**Remarque:** Le paramètre `DatadogAppKey` permet à la pile CloudFormation d'effectuer des appels API à Datadog pour ajouter et modifier la configuration Datadog pour ce compte AWS. La clé est générée automatiquement et liée à votre compte Datadog.
1. Cochez les cases requises d'AWS et cliquez sur {{< ui >}}Create stack{{< /ui >}}. Cela lance le processus de création de la pile Datadog ainsi que trois piles imbriquées. Cela peut prendre plusieurs minutes. Assurez-vous que la pile est créée avec succès avant de continuer.
1. Après la création de la pile, retournez à la tuile d'intégration AWS dans Datadog et cliquez sur {{< ui >}}Ready!{{< /ui >}}
1. Attendez jusqu'à 10 minutes pour que les données commencent à être collectées, puis consultez le tableau de bord [vue d'ensemble AWS][12] pour voir les métriques envoyées par vos services et infrastructures AWS :
{{< img src="getting_started/integrations/aws-dashboard.png" alt="Le tableau de bord vue d'ensemble AWS dans le compte Datadog. À gauche se trouve le logo AWS et un graphique d'événements AWS indiquant 'Aucune entrée correspondante trouvée'. Au centre se trouvent des graphiques liés aux volumes EBS avec des données numériques affichées et une carte thermique montrant des données cohérentes. À droite se trouvent des graphiques liés aux ELB montrant des données numériques ainsi qu'un graphique de séries temporelles affichant des pics de données provenant de trois sources.">}}

Pour configurer plusieurs comptes à la fois, utilisez l'[API][3], l'[AWS CLI][4] ou [Terraform][5]. Pour plus d'informations, consultez le [guide Datadog-Amazon CloudFormation][6].

**Remarque** : Le modèle CloudFormation de Datadog ne prend en charge que la création et la suppression de ses ressources définies. Consultez [Mettre à jour votre modèle de pile][59] pour des conseils sur l'application des mises à jour à votre pile.

### À quoi s'attendre après la configuration {#what-to-expect-after-setup}

Après que l'intégration est configurée avec succès, les données commencent à apparaître dans Datadog selon la chronologie suivante :

- **Métriques** : Apparaissent en environ 10 minutes avec le polling API, ou 2-3 minutes avec [CloudWatch Metric Streams][60]. Tous les services ne rapportent pas à la même cadence, donc un tableau de bord partiellement peuplé pendant la première heure est normal.
- **Tags** : Les tags des ressources AWS peuvent prendre un temps supplémentaire à se propager. Les modifications des tags dans AWS peuvent prendre de 15 minutes à plusieurs heures pour se refléter dans Datadog.
- **Ressources** : Découvertes lors du prochain cycle de crawl des ressources après la configuration.
- **Journaux** : Nécessite une configuration séparée. Voir [Envoyer des journaux](#send-logs) pour les instructions de configuration.

<div class="alert alert-info">
Datadog ne remplit pas les données métriques historiques d'avant l'activation de l'intégration. Les métriques commencent à circuler à partir du moment où l'intégration est configurée avec succès.
</div>

## Configuration {#configuration}

### Activer les intégrations pour les services AWS individuels {#enable-integrations-for-individual-aws-services}

Voir la [page des intégrations][13] pour une liste complète des sous-intégrations disponibles. Beaucoup de ces intégrations sont installées par défaut lorsque Datadog reconnaît des données provenant de votre compte AWS.

Utilisez l'onglet {{< ui >}}Metric Collection{{< /ui >}} sur la [page d'intégration AWS][8] pour configurer les services dont l'intégration Datadog collecte les métriques.

### Ajouter des régions {#add-regions}

Sous l'onglet {{< ui >}}General{{< /ui >}} sur la [page d'intégration AWS][8], vous pouvez contrôler les régions AWS où Datadog collecte des métriques, des événements CloudWatch et des ressources.

## Envoyer des journaux{#send-logs}

Il existe deux façons d'envoyer des journaux de service AWS à Datadog :

- [Destination Amazon Data Firehose][10] : Recommandé pour les journaux CloudWatch à fort volume.
- [Fonction Lambda Forwarder][11] : Nécessaire pour les traces, les métriques améliorées ou les métriques personnalisées des fonctions Lambda. Également recommandé pour les journaux provenant de S3 ou d'autres ressources qui ne peuvent pas être diffusées directement vers Amazon Data Firehose.

Voir [Activer la journalisation pour votre service AWS][14] pour les instructions de configuration.

### Validation {#validation}

Une fois que vous avez activé les journaux, trouvez-les dans le [Log Explorer][15] en utilisant soit les facettes `source` ou `service` du panneau de facettes, comme cet exemple de S3 :
{{< img src="getting_started/integrations/logs-explorer.png" alt="La page Log Explorer du compte Datadog. À gauche, l'image affiche les facettes Source et Service, toutes deux cochées avec 's3'. À droite, certaines entrées de journal sont affichées sous forme de liste.">}}

## Obtenez plus de la plateforme Datadog {#get-more-from-the-datadog-platform}

### Visibilité approfondie avec l'agent Datadog sur EC2 {#deeper-visibility-with-the-datadog-agent-on-ec2}

Par défaut, l'intégration AWS de Datadog explore l'API CloudWatch pour les métriques fournies par AWS, mais vous pouvez obtenir une visibilité encore plus approfondie sur vos instances EC2 avec l'[agent Datadog][16]. L'agent est un démon léger qui rapporte des métriques et des événements, et peut également être configuré pour les journaux et les traces. La section [Installation de l'Agent][17] de l'application Datadog fournit des instructions pour installer l'Agent sur une grande variété de systèmes d'exploitation. De nombreux systèmes d'exploitation (par exemple, Amazon Linux) ont des commandes d'installation en une étape que vous pouvez exécuter depuis le terminal de l'instance pour installer l'Agent :
{{< img src="getting_started/integrations/integrations-agent-installation.png" alt="La section « Agent » de l'onglet « Intégrations » dans Datadog. À gauche, une liste des systèmes d'exploitation pris en charge pour l'Agent Datadog est affichée. 'Amazon Linux' est mis en évidence dans cette liste. À droite, est affiché « Utilisez notre installation facile en une étape ». La commande pour installer l'Agent est affichée en dessous, avec la section DD_API_KEY obfusquée.">}}

Une fois l'Agent installé, il est représenté graphiquement dans le [Infrastructure List] avec une icône d'os :
{{< img src="getting_started/integrations/infrastructure-list.png" alt="La liste d'infrastructure montrant deux hôtes sous forme de liste. Les deux hôtes affichent l'icône AWS pour l'intégration AWS et « aws » affiché dans une boîte bleue pour montrer qu'ils sont associés à l'intégration AWS. Un hôte affiche également une icône d'os et des boîtes bleues pour « ntp » et « system ».">}}

La capture d'écran ci-dessus montre l'hôte avec l'Agent Datadog rapportant des données des vérifications [System][19] et [NTP][20]. La vérification System fournit des métriques liées au CPU, à la mémoire, au système de fichiers et à l'I/O, offrant des informations supplémentaires sur l'hôte. Vous pouvez activer des [integrations][21] supplémentaires pour adapter votre configuration à votre environnement et à votre cas d'utilisation, ou utiliser également [DogStatsD][22] pour envoyer des métriques personnalisées directement à Datadog.

Consultez la [FAQ sur l'installation de l'Agent Datadog sur des instances cloud][23] pour en savoir plus sur les avantages de cette méthode.

### Utilisation de l'Agent Datadog avec Amazon Container Services {#using-the-datadog-agent-with-amazon-container-services}

Pour les environnements conteneurisés, vous pouvez utiliser l'Agent Datadog, que vous gériez vos instances ou que vous utilisiez [Fargate][24] pour un environnement sans serveur.

#### ECS avec EC2 launch type {#ecs-with-ec2-launch-type}

Utilisez la [documentation Amazon ECS][25] pour exécuter l'[Agent Docker Datadog][26] sur les instances EC2 de votre cluster ECS. Consultez la [Amazon ECS Data Collection documentation][27] pour voir les métriques et événements signalés à votre compte Datadog.

#### ECS avec Fargate launch type {#ecs-with-fargate-launch-type}

Utilisez la [Amazon ECS on AWS Fargate documentation][28] pour exécuter l'Agent en tant que conteneur dans la même définition de tâche que votre application. **Remarque** : La version 6.1.1 ou supérieure de l'Agent Datadog est nécessaire pour tirer pleinement parti de l'intégration Fargate.

#### AWS Batch avec Fargate orchestration type {#aws-batch-with-fargate-orchestration-type}

Utilisez la [Amazon ECS on AWS Fargate for AWS Batch documentation][58] pour exécuter l'Agent en tant que conteneur dans la même définition de tâche AWS Batch que votre application. **Remarque** : La version 6.1.1 ou supérieure de l'Agent Datadog est nécessaire pour tirer pleinement parti de l'intégration Fargate.

#### EKS {#eks}

Aucune configuration spécifique n'est nécessaire pour Amazon Elastic Kubernetes Service (EKS), comme mentionné dans la [Kubernetes Distributions documentation][29]. Utilisez la [dedicated Kubernetes documentation][30] pour déployer l'Agent dans votre cluster EKS.

#### EKS avec Fargate {#eks-with-fargate}

Étant donné que les pods Fargate sont gérés par AWS, ils excluent les vérifications système basées sur l'hôte comme le CPU et la mémoire. Pour collecter des données de vos pods AWS Fargate, utilisez la [Amazon EKS on AWS Fargate documentation][31] pour exécuter l'Agent en tant que sidecar de votre pod d'application avec un contrôle d'accès basé sur les rôles (RBAC) personnalisé. **Remarque** : Cela nécessite la version 7.17 ou supérieure de l'Agent Datadog.

#### EKS Anywhere {#eks-anywhere}

Référez-vous à la [documentation relative à EKS Anywhere][32] pour vos clusters Kubernetes sur site.

### Créer des ressources Datadog supplémentaires {#create-additional-datadog-resources}
En plus d'utiliser l'interface Datadog ou l'[API][33], vous pouvez créer de nombreuses [Datadog resources][34] avec le [CloudFormation Registry][35]. Pour la visibilité et le dépannage, utilisez des [dashboards][36] pour afficher des données clés, appliquer des [Functions][37] et trouver des [Metric Correlations][38].

Pour être informé de tout comportement indésirable ou inattendu dans votre compte, créez des [monitors][39]. Les moniteurs évaluent constamment les données signalées dans votre compte et envoient des [Notifications][40] pour s'assurer que les bonnes informations parviennent aux bons membres de l'équipe. Consultez la [List of Notification Integrations][41] pour toutes les manières de notifier votre équipe.

## Explorez des produits connexes {#explore-related-products}

### Sans serveur {#serverless}

Pour surveiller les fonctions AWS Lambda avec Datadog, consultez [Serverless][42] pour des instructions sur l'instrumentation de votre application, l'installation des [Serverless Libraries and Integrations][43], la mise en œuvre du [distributed tracing with serverless applications][44] ou le [troubleshooting serverless issues][45].

### APM {#apm}

Pour collecter des traces distribuées de vos applications et services AWS, utilisez l'Agent Datadog avec [APM][47]. Pour les fonctions AWS Lambda, instrumentez avec l'[Datadog Lambda Extension][44].  Consultez la [documentation APM][48] pour des détails sur l'analyse des données de performance des applications.

Vous pouvez également utiliser [Watchdog][49], une fonctionnalité algorithmique pour les performances APM et les métriques d'infrastructure, pour détecter automatiquement et être informé des problèmes potentiels d'application.

### Sécurité {#security}

#### Cloud SIEM {#cloud-siem}

Consultez [Getting Started with Cloud SIEM][50] pour évaluer vos journaux par rapport aux [Log Detection Rules][51] prêtes à l'emploi. Ces règles sont personnalisables, et lorsque des menaces sont détectées, elles génèrent des signaux de sécurité accessibles dans le [Security Signals Explorer][52]. Utilisez [Notification Rules][53] pour configurer les préférences de notification sur plusieurs règles.

#### Mauvaises configurations de la sécurité cloud {#cloud-security-misconfigurations}

Utilisez le guide [Setting Up Cloud Security Misconfigurations][54] pour détecter et évaluer les mauvaises configurations dans votre environnement cloud. Les données de configuration des ressources sont évaluées par rapport aux règles de conformité [Cloud][55] et [Infrastructure][56] prêtes à l'emploi pour signaler les techniques d'attaque et les mauvaises configurations potentielles.

### Dépannage {#troubleshooting}

Si vous rencontrez l'erreur `Datadog is not authorized to perform sts:AssumeRole`, consultez sa page de dépannage dédiée [troubleshooting page][2]. Pour tout autre problème, consultez le [AWS integration troubleshooting guide][57].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/guide/forwarder/
[2]: /fr/integrations/guide/error-datadog-not-authorized-sts-assume-role/
[3]: /fr/api/latest/aws-integration/#create-an-aws-integration
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudformation/index.html
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws_account
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
[22]: /fr/extend/dogstatsd/?tab=hostagent
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
[45]: /fr/serverless/aws_lambda/troubleshooting/
[46]: /fr/integrations/amazon_xray/
[47]: /fr/tracing/trace_collection/
[48]: /fr/tracing/
[49]: /fr/watchdog/
[50]: /fr/getting_started/cloud_siem/
[51]: /fr/security/default_rules/#cat-log-detection
[52]: /fr/security/cloud_siem/triage_and_investigate/investigate_security_signals
[53]: /fr/security/notifications/rules/
[54]: /fr/security/cloud_security_management/setup/
[55]: /fr/security/default_rules/#cat-posture-management-cloud
[56]: /fr/security/default_rules/#cat-posture-management-infra
[57]: /fr/integrations/guide/aws-integration-troubleshooting/
[58]: /fr/integrations/ecs_fargate/?tab=webui#installation-for-aws-batch
[59]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-get-template.html
[60]: /fr/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/