---
description: Intégrez votre compte Amazon Web Services à Datadog en utilisant CloudFormation.
  Configurez les rôles IAM, activez les intégrations de services et paramétrez le
  transfert de logs.
further_reading:
- link: https://www.datadoghq.com/architecture/a-guide-to-integrating-100-aws-accounts-with-datadog/
  tag: Architecture Center
  text: Guide pour intégrer plus de 100 comptes AWS avec Datadog
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
  text: Surveiller toute votre pile serverless avec la vue Serverless
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
- link: https://learn.datadoghq.com/courses/getting-started-with-the-datadog-aws-integration
  tag: Centre d'apprentissage
  text: Bien démarrer avec l'intégration AWS de Datadog
title: Débuter avec AWS
---
## Présentation {#overview}

Ce guide vous accompagne dans l'intégration d'un compte Amazon Web Services (AWS) à Datadog à l'aide du modèle CloudFormation de Datadog. Une fois la configuration terminée, vous pouvez activer des intégrations de services AWS individuels, installer Datadog Agent sur des instances EC2 pour une visibilité accrue et configurer le transfert de logs.

## Prérequis {#prerequisites}

Avant de commencer, assurez-vous de disposer d'un compte [AWS][7]. Le modèle CloudFormation crée un rôle IAM et une politique associée, permettant au compte AWS de Datadog d'effectuer des appels API vers votre compte AWS pour collecter et transférer des données. Votre utilisateur AWS doit disposer des autorisations IAM suivantes pour exécuter le modèle :

{{% collapse-content title="Autorisations IAM requises" level="h3" expanded=false id="iam-permissions" %}}
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

## Configuration {#setup}

1. Accédez à la [page de configuration de l'intégration AWS][8] dans Datadog et cliquez sur {{< ui >}}Add AWS Account{{< /ui >}}.
1. Configurez les paramètres de l'intégration sous l'option {{< ui >}}Automatically using CloudFormation{{< /ui >}}.
   1. Sélectionnez les régions AWS à intégrer.
   1. Ajoutez votre [clé d'API][9] Datadog.
   1. Optionnellement, envoyez des logs et d'autres données à Datadog avec le [Datadog Forwarder Lambda][1].
   1. Optionnellement, activez [Cloud Security Misconfigurations][54] pour analyser votre environnement cloud, vos hôtes et vos conteneurs à la recherche de mauvaises configurations et de risques de sécurité.
1. Cliquez sur {{< ui >}}Launch CloudFormation Template{{< /ui >}}. Cela ouvre la console AWS et charge la pile CloudFormation. Tous les paramètres sont renseignés en fonction de vos sélections dans le formulaire Datadog précédent, vous n'avez donc pas besoin de les modifier sauf si vous le souhaitez.
**Remarque :** Le paramètre `DatadogAppKey` permet à la pile CloudFormation d'effectuer des appels API vers Datadog pour ajouter et modifier la configuration Datadog pour ce compte AWS. La clé est générée automatiquement et liée à votre compte Datadog.
1. Cochez les cases requises par AWS et cliquez sur {{< ui >}}Create stack{{< /ui >}}. Cela lance le processus de création de la pile Datadog ainsi que de trois piles imbriquées. Cela pourrait prendre plusieurs minutes. Assurez-vous que la pile est correctement créée avant de continuer.
1. Une fois la pile créée, retournez sur la tuile d'intégration AWS dans Datadog et cliquez sur {{< ui >}}Ready!{{< /ui >}}
1. Attendez jusqu'à 10 minutes que la collecte des données commence, puis consultez le [dashboard de présentation AWS][12] prêt à l'emploi pour voir les métriques envoyées par vos services et votre infrastructure AWS :
{{< img src="getting_started/integrations/aws-dashboard.png" alt="Le dashboard de présentation AWS dans le compte Datadog. À gauche se trouvent le logo AWS et un graphique des événements AWS indiquant « Aucune entrée correspondante trouvée ». Au centre se trouvent des graphiques relatifs aux volumes EBS avec des données numériques affichées et une carte thermique montrant des données cohérentes. Sur la droite se trouvent des graphiques relatifs aux ELB affichant des données numériques ainsi qu'une série temporelle montrant des données irrégulières provenant de trois sources.">}}

Pour configurer plusieurs comptes à la fois, utilisez l'[API][3], l'[AWS CLI][4] ou [Terraform][5]. Pour plus d'informations, consultez le [guide Datadog-Amazon CloudFormation][6].

**Remarque** : Le modèle CloudFormation de Datadog prend uniquement en charge la création et la suppression des ressources qu'il définit. Consultez [Mettre à jour votre modèle de stack][59] pour obtenir des conseils sur l'application des mises à jour à votre stack.

### À quoi s'attendre après la configuration {#what-to-expect-after-setup}

Une fois l'intégration correctement configurée, les données commencent à apparaître dans Datadog selon le calendrier suivant :

- **Métriques** : Apparaissent en 10 minutes environ avec l'interrogation de l'API, ou en 2 à 3 minutes avec les [flux de métriques CloudWatch][60]. Tous les services ne transmettent pas les données à la même fréquence ; il est donc normal qu'un dashboard soit partiellement rempli au cours de la première heure.
- **Tags** : Les tags de ressources AWS peuvent mettre plus de temps à se propager. Les modifications apportées aux tags dans AWS peuvent mettre de 15 minutes à plusieurs heures avant d'être répercutées dans Datadog.
- **Ressources** : Découvertes lors du prochain cycle d'exploration des ressources après la configuration.
- **Logs** : Nécessitent une configuration distincte. Consultez [Envoyer des logs](#send-logs) pour les instructions de configuration.

<div class="alert alert-info">
Datadog ne remplit pas les données de métriques historiques antérieures à l'activation de l'intégration. Les métriques commencent à circuler à partir du moment où l'intégration est configurée avec succès.
</div>

## Configuration {#configuration}

### Activer les intégrations pour des services AWS individuels {#enable-integrations-for-individual-aws-services}

Consultez la [page Intégrations][13] pour obtenir une liste complète des sous-intégrations disponibles. Bon nombre de ces intégrations sont installées par défaut lorsque Datadog reconnaît les données provenant de votre compte AWS.

Utilisez l'onglet {{< ui >}}Metric Collection{{< /ui >}} sur la [page d'intégration AWS][8] pour configurer les services à partir desquels l'intégration Datadog collecte des métriques.

### Filtrer les métriques par nom de métrique {#filter-metrics-by-metric-name}

Utilisez l'onglet {{< ui >}}Metric Collection{{< /ui >}} sur la [page d'intégration AWS][8] pour filtrer les métriques CloudWatch par espace de nom. Développez un espace de nom dans le tableau de collecte des métriques CloudWatch et choisissez un filtre **Inclure** ou **Exclure** :

- **Inclure** : Collectez uniquement les noms de métriques Datadog qui correspondent aux modèles configurés pour cet espace de nom.
- **Exclure** : Collectez tous les noms de métriques Datadog pour cet espace de nom, à l'exception de ceux qui correspondent aux modèles configurés.

Chaque espace de nom peut utiliser un seul mode de filtrage à la fois. Les modèles de filtrage prennent en charge les lettres minuscules, les chiffres, `.`, `_` et `*`. Par exemple, `aws.ec2.network_*` correspond aux métriques réseau EC2. Le tableau prévisualise le nombre de métriques correspondant à chaque modèle avant que vous n'enregistriez les modifications.

Les filtres de noms de métriques s'appliquent par espace de nom et sont évalués une fois que l'espace de nom est activé pour la collecte de métriques.

<div class="alert alert-info">
Les filtres de noms de métriques ne peuvent pas supprimer <code>aws.ec2.cpuutilization</code> ou <code>aws.lambda.invocations</code>. Datadog collecte toujours ces métriques requises.
</div>

Pour gérer les filtres de noms de métriques par programmation, consultez [Configurer les filtres de noms de métriques AWS avec l'API][61].

### Ajouter des régions {#add-regions}

Sous l'onglet {{< ui >}}General{{< /ui >}} sur la [page d'intégration AWS][8], vous pouvez contrôler les régions AWS où Datadog collecte des métriques, des événements CloudWatch et des ressources.

## Envoyer des logs {#send-logs}

Il existe deux façons d'envoyer des logs de service AWS à Datadog :

- [Amazon Data Firehose destination][10] : Recommandé pour les logs CloudWatch à haut volume.
- [Forwarder Lambda function][11] : Requis pour les traces, les métriques améliorées ou les métriques personnalisées provenant des fonctions Lambda. Également recommandé pour les logs provenant de S3 ou d'autres ressources qui ne peuvent pas être diffusés directement vers Amazon Data Firehose.

Consultez [Activer la journalisation pour votre service AWS][14] pour obtenir des instructions de configuration.

### Validation {#validation}

Une fois que vous avez activé les logs, retrouvez-les dans le [Log Explorer][15] en utilisant les facettes `source` ou `service` depuis le panneau des facettes, comme dans cet exemple provenant de S3 :
{{< img src="getting_started/integrations/logs-explorer.png" alt="La page Log Explorer du compte Datadog. Sur la gauche, l'image affiche les facettes Source et Service, toutes deux cochées avec « s3 ». Sur la droite, certaines entrées de logs sont affichées sous forme de liste.">}}

## Tirez le meilleur parti de la plateforme Datadog {#get-more-from-the-datadog-platform}

### Une visibilité accrue avec Datadog Agent sur EC2 {#deeper-visibility-with-the-datadog-agent-on-ec2}

Par défaut, l'intégration AWS de Datadog explore l'API CloudWatch pour les métriques fournies par AWS, mais vous pouvez obtenir une visibilité encore plus approfondie sur vos instances EC2 avec [Datadog Agent][16]. L'Agent est un démon léger qui rapporte des métriques et des événements, et peut également être configuré pour les logs et les traces. La section [Installation de l'Agent][17] de l'application Datadog fournit des instructions pour installer l'Agent sur une grande variété de systèmes d'exploitation. De nombreux systèmes d'exploitation (par exemple, Amazon Linux) disposent de commandes d'installation en une étape que vous pouvez exécuter depuis le terminal de l'instance pour installer l'Agent :
{{< img src="getting_started/integrations/integrations-agent-installation.png" alt="La section 'Agent' de l'onglet 'Integrations' dans Datadog. Sur la gauche est affichée une liste des systèmes d'exploitation pris en charge pour Datadog Agent. «Amazon Linux» est mis en surbrillance dans cette liste. À droite s'affiche 'Use our easy one-step install'. La commande d'installation de l'Agent s'affiche en dessous, avec la section DD_API_KEY masquée.">}}

Une fois l'Agent installé, il est représenté graphiquement dans la [Infrastructure List][18] avec une icône en forme d'os :
{{< img src="getting_started/integrations/infrastructure-list.png" alt="La liste d'infrastructure affichant deux hôtes sous forme de liste. Les deux hôtes affichent l'icône AWS pour l'intégration AWS et 'aws' dans un encadré bleu pour indiquer qu'ils sont associés à l'intégration AWS. Un hôte affiche également une icône en forme d'os et des encadrés bleus pour 'ntp' et 'system'.">}}

La capture d'écran ci-dessus montre l'hôte avec Datadog Agent rapportant des données à partir des vérifications [System][19] et [NTP][20]. La vérification System fournit des métriques sur le CPU, la mémoire, le système de fichiers et les E/S, offrant des informations supplémentaires sur l'hôte. Vous pouvez activer des [intégrations][21] supplémentaires pour les adapter à votre environnement et à votre cas d'utilisation, ou utiliser en complément [DogStatsD][22] pour envoyer des métriques personnalisées directement à Datadog.

Consultez la [FAQ sur l'installation de Datadog Agent sur des instances cloud][23] pour en savoir plus sur les avantages de cette méthode.

### Utilisation de Datadog Agent avec Amazon Container Services {#using-the-datadog-agent-with-amazon-container-services}

Pour les environnements conteneurisés, vous pouvez utiliser Datadog Agent, que vous gériez vos instances ou que vous utilisiez [Fargate][24] pour un environnement serverless.

#### ECS avec type de lancement EC2 {#ecs-with-ec2-launch-type}

Utilisez la [documentation Amazon ECS][25] pour exécuter l'[Agent Docker Datadog][26] sur les instances EC2 de votre cluster ECS. Consultez la [documentation sur la collecte de données Amazon ECS][27] pour voir les métriques et les événements signalés à votre compte Datadog.

#### ECS avec type de lancement Fargate {#ecs-with-fargate-launch-type}

Utilisez la [documentation Amazon ECS sur AWS Fargate][28] pour exécuter l'Agent en tant que conteneur dans la même définition de tâche que votre application. **Remarque** : la version 6.1.1 ou supérieure de Datadog Agent est nécessaire pour tirer pleinement parti de l'intégration Fargate.

#### AWS Batch avec type d'orchestration Fargate {#aws-batch-with-fargate-orchestration-type}

Utilisez la [documentation Amazon ECS sur AWS Fargate pour AWS Batch][58] pour exécuter l'Agent en tant que conteneur dans la même définition de job AWS Batch que votre application. **Remarque** : la version 6.1.1 ou supérieure de Datadog Agent est nécessaire pour tirer pleinement parti de l'intégration Fargate.

#### EKS {#eks}

Vous n'avez besoin d'aucune configuration spécifique pour Amazon Elastic Kubernetes Service (EKS), comme mentionné dans la [documentation sur les distributions Kubernetes][29]. Utilisez la [documentation Kubernetes dédiée][30] pour déployer l'Agent dans votre cluster EKS.

#### EKS avec Fargate {#eks-with-fargate}

Comme les pods Fargate sont gérés par AWS, ils excluent les vérifications système basées sur l'hôte telles que le CPU et la mémoire. Pour collecter des données à partir de vos pods AWS Fargate, utilisez la [documentation Amazon EKS sur AWS Fargate][31] pour exécuter l'Agent en tant que sidecar de votre pod d'application avec un contrôle d'accès basé sur les rôles (RBAC) personnalisé. **Remarque** : Cela nécessite la version 7.17 ou supérieure de Datadog Agent.

#### EKS Anywhere {#eks-anywhere}

Référez-vous à la [documentation relative à EKS Anywhere][32] pour vos clusters Kubernetes sur site.

### Créer des ressources Datadog supplémentaires {#create-additional-datadog-resources}
En plus d'utiliser l'interface utilisateur ou l'[API][33] Datadog, vous pouvez créer de nombreuses [ressources Datadog][34] avec le [registre CloudFormation][35]. Pour la visibilité et le dépannage, utilisez des [tableaux de bord][36] pour afficher les données clés, appliquer des [fonctions][37] et trouver des [corrélations de métriques][38].

Pour être averti de tout comportement indésirable ou inattendu sur votre compte, créez des [monitors][39]. Les monitors évaluent en permanence les données transmises à votre compte et envoient des [notifications][40] pour garantir que les bonnes informations parviennent aux bons membres de l'équipe. Consultez la [liste des intégrations de notification][41] pour connaître toutes les façons d'avertir votre équipe.

## Explorer les produits associés {#explore-related-products}

### Serverless {#serverless}

Pour surveiller les fonctions AWS Lambda avec Datadog, consultez [Serverless][42] pour obtenir des instructions sur l'instrumentation de votre application, l'installation de [bibliothèques et intégrations Serverless][43], la mise en œuvre du [tracing distribué avec des applications serverless][44] ou le [dépannage des problèmes serverless][45].

### APM {#apm}

Pour collecter des traces distribuées à partir de vos applications et services AWS, utilisez Datadog Agent avec l'[APM][47]. Pour les fonctions AWS Lambda, instrumentez avec l'[Datadog Lambda Extension][44].  Consultez la [documentation APM][48] pour plus de détails sur l'analyse des données de performance des applications.

Vous pouvez également utiliser [Watchdog][49], une fonctionnalité algorithmique pour les performances APM et les métriques d'infrastructure, pour détecter automatiquement les problèmes d'application potentiels et en être informé.

### Sécurité {#security}

#### Cloud SIEM {#cloud-siem}

Consultez [Prise en main de Cloud SIEM][50] pour évaluer vos logs par rapport aux [règles de détection de logs][51] prêtes à l'emploi. Ces règles sont personnalisables et, lorsque des menaces sont détectées, elles génèrent des signaux de sécurité accessibles dans l'[Explorer de signaux de sécurité][52]. Utilisez les [règles de notification][53] pour configurer les préférences de notification pour plusieurs règles.

#### Mauvaises configurations de Cloud Security {#cloud-security-misconfigurations}

Utilisez le guide [Setting Up Cloud Security Misconfigurations][54] pour détecter et évaluer les mauvaises configurations dans votre environnement cloud. Les données de configuration des ressources sont évaluées par rapport aux règles de conformité [Cloud][55] et [Infrastructure][56] prêtes à l'emploi pour signaler les techniques d'attaquants et les mauvaises configurations potentielles.

### Dépannage {#troubleshooting}

Si vous rencontrez l'erreur `Datadog is not authorized to perform sts:AssumeRole`, consultez sa [page de dépannage][2] dédiée. Pour tout autre problème, consultez le [guide de dépannage de l'intégration AWS][57].

## Pour aller plus loin {#further-reading}

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
[61]: /fr/integrations/guide/aws-metric-name-filters/