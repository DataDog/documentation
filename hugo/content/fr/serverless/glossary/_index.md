---
title: Glossaire du Sans serveur
---

Ce glossaire s'intéresse aux termes et aux concepts utilisés dans le contexte des architectures sans serveur, des fournisseurs de plateformes cloud et de la surveillance sans serveur de Datadog.

### Sans serveur : concepts généraux

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Sans serveur          | Modèle de développement dans lequel un fournisseur de cloud gère dynamiquement l'allocation des ressources backend. Ce paradigme permet aux développeurs de créer, d'exécuter et de déployer des applications et des services sans avoir à gérer leur infrastructure.                              |
| Fonction          | Dans le contexte du sans serveur, une fonction est une application autonome qui s'exécute dans le cloud.                             |
| Développement basé sur le cloud          | Méthode de travail où les développeurs exécutent leur code dans le cloud pendant le processus de développement au lieu de le faire uniquement sur leurs machines locales. En général, la création d'applications sans serveur nécessite un développement dans le cloud.                                |
| Démarrage à froid          | La première fois qu'une fonction est invoquée, son exécution peut prendre plus de temps que les fois suivantes. Ce phénomène, baptisé démarrage à froid, peut être causé par plusieurs facteurs : par exemple, il arrive que le provisionnement des ressources sous-jacentes par le fournisseur de cloud prenne un peu de temps.                                |
| Architecture orientée événements          | Modèle architectural dans lequel la communication entre les services découplés repose sur les événements.                                 |
| Function-as-a-Service (FaaS)          | Un sous-ensemble de fonctions sans serveur. Le terme FaaS fait directement référence aux paradigmes de programmation orientée événements.                               |

## Concepts spécifiques au cloud

La solution Serverless de Datadog permet de surveiller vos applications sans serveur dans plusieurs environnements cloud différents.

{{< tabs >}}
{{% tab "AWS Lambda" %}}

AWS Lambda est la plateforme FaaS proposée par Amazon Web Services. Consultez la [documentation AWS Lambda][1] pour en savoir plus.

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Amazon Resource Name (ARN)         | Convention de nommage utilisée pour les ressources dans AWS.                              |
| AWS CloudFormation          | Service AWS qui utilise des modèles pour créer et supprimer des ressources AWS. Il est possible de créer et supprimer des collections de ressources en tant qu'unité, ces collections étant appelées « stacks ».                               |
| AWS Identity and Access Management (IAM)         | Service AWS dédié à la gestion des utilisateurs et de leurs autorisations dans AWS.                       |
| AWS Lambda          | L'offre FaaS d'AWS. Le terme « Lambda » est également souvent utilisé comme raccourci pour désigner une « fonction Lambda ».                      |
| Step Functions          | Step Functions est un service fourni par AWS qui permet d'orchestrer des flux de travail courants composés de plusieurs fonctions Lambda ou d'événements de services cloud, sans avoir besoin de coder la gestion des status des processus, la logique de nouvelle tentative, etc.                     |
| Package de déploiement | Le code d'une fonction Lambda peut être déployé à l'aide d'un package de déploiement. Il peut s'agir d'une archive au format ZIP qui contient le code de la fonction et les dépendances ou d'une image de conteneur conforme à la spécification [Open Container Initiative (OCI)][2]. |
| Emplacement périphérique         | Centre de données AWS utilisé pour effectuer des opérations spécifiques à un service.                      |
| Événement | Document JSON qui contient les données devant être traitées par une fonction Lambda. |
| Fonction Lambda | Fonction sans serveur dans AWS Lambda. Chaque fonction contient du code pour traiter des événements et peut être invoquée en vue de son exécution. |
| Couche Lambda | Archive au format ZIP contenant du code supplémentaire, comme des bibliothèques, un runtime personnalisé, des fichiers de configuration ou d'autres dépendances. Les couches Lambda peuvent être utilisées pour faire appel à des bibliothèques dans des fonctions sans serveur sans avoir à inclure ces bibliothèques dans le package de déploiement. |
| Stratégie gérée | Stratégie IAM pouvant être associée à plusieurs utilisateurs, groupes et rôles. Les stratégies peuvent être créées et gérées par AWS ou par un client.|
| Ressource | Compartiment S3, instance EC2, utilisateur IAM ou toute autre entité pouvant être utilisée dans AWS. |
| Propriété de ressource| Lorsqu'une ressource est incluse dans une stack AWS CloudFormation, chaque ressource peut posséder une ou plusieurs propriétés associées. |
| Serverless Application Model (SAM)          | SAM est un framework d'Infrastructure as code développé par AWS et dédié aux applications sans serveur.                                |



### Concepts de la solution Serverless de Datadog pour AWS Lambda

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Métriques Lambda optimisées][3] | Les métriques Lambda optimisées vous offrent des informations plus détaillées que les métriques Lambda activées par défaut avec l'intégration AWS Lambda. Ces métriques sont identifiables par l'espace de nommage `aws.lambda.enhanced.*`. Il est recommandé de les utiliser pour définir des monitors en temps réel afin de surveiller la santé de votre application sans serveur.|
| [Bibliothèque Lambda][4]       | La bibliothèque Lambda Datadog permet de recueillir des données (telles que des métriques Lambda optimisées, des traces, etc.) depuis le runtime de votre fonction Lambda. Ces données sont ensuite transmises dans les logs (que le [Forwarder][5] récupère) ou à l'[extension Lambda][6]. Pour simplifier l'installation, la bibliothèque Lambda Datadog est généralement fournie avec la bibliothèque de tracing Datadog au sein d'une [couche Lambda][7].                          |
| [Forwarder][5]          | Fonction AWS Lambda conçue pour analyser les données de surveillance sans serveur des logs CloudWatch et les transférer à Datadog.                             |
| [Extension Lambda][6] | Une version plus légère de l'Agent Datadog qui s'exécute dans l'environnement d'exécution Lambda et transfère les données de surveillance sans serveur à Datadog avec un impact minimal sur les performances. Pour simplifier l'installation, l'extension est distribuée sous la forme d'une [couche Lambda][7]. |
| [CLI Serverless][8] | L'interface de ligne de commande, ou CLI, permet d'instrumenter une application sans serveur en modifiant la configuration de vos fonctions Lambda existantes. Il s'agit du moyen le plus rapide de tirer parti de la surveillance sans serveur de Datadog. |
| [Macro Serverless][9] | La macro CloudFormation Serverless Datadog active automatiquement l'instrumentation des applications sans serveur en modifiant le modèle CloudFormation.|
| [Plug-in Serverless][10] | Le plug-in Serverless active automatiquement l'instrumentation pour vos applications gérées par le [framework Serverless][11] en modifiant la configuration des fonctions Lambda. |
| [CDK Construct sans serveur][12] | Le plug-in Serverless active automatiquement l'instrumentation pour vos applications gérées par le [CDK AWS][13] en modifiant la configuration des fonctions Lambda. |
| [Fusion de traces][14] | Si vous avez configuré à la fois les bibliothèques de tracing de Datadog (`dd-trace`) et d'AWS X-Ray dans votre application, vous devez fusionner les traces sans serveur pour pouvoir visualiser une seule trace connectée. |
| [Propagation des traces][15] | Le contexte des traces Datadog doit être propagé vers les services gérés par AWS, comme SQS, Kinesis et les fonctions Lambda, afin de générer une trace unique et associée pour les applications sans serveur. |
| [Insights Serverless][16] | Datadog génère automatiquement des suggestions afin de vous aider à corriger les erreurs, résoudre les problèmes de performance et optimiser les coûts de vos applications sans serveur. |



[1]: https://docs.aws.amazon.com/lambda/index.html
[2]: https://opencontainers.org/
[3]: /fr/serverless/enhanced_lambda_metrics
[4]: /fr/serverless/libraries_integrations/
[5]: /fr/logs/guide/forwarder/
[6]: /fr/serverless/libraries_integrations/extension/
[7]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[8]: /fr/serverless/libraries_integrations/cli
[9]: /fr/serverless/libraries_integrations/macro/
[10]: /fr/serverless/libraries_integrations/plugin/
[11]: https://www.serverless.com/
[12]: https://github.com/DataDog/datadog-cdk-constructs
[13]: https://aws.amazon.com/cdk/
[14]: /fr/serverless/distributed_tracing/serverless_trace_merging
[15]: /fr/serverless/distributed_tracing/serverless_trace_propagation
[16]: /fr/serverless/troubleshooting/insights/
{{% /tab %}}
{{% tab "Azure Functions" %}}

Azure Functions est une plateforme FaaS fournie par Microsoft Azure. Consultez la [documentation Microsoft Azure Functions][1] pour en savoir plus.

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Azure Functions          | L'offre FaaS de Microsoft.                          |
| Azure App Service          | Service d'hébergement pour développer des applications Web, des services et des API.                               |
| Modèle Azure Resource Manager (ARM)          | Document JSON utilisé pour définir l'infrastructure et la configuration de votre projet.                         |


### Concepts de la solution Serverless de Datadog pour Azure Functions

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Vue Azure App Service][2]      | Offre de Datadog pour surveiller des ressources Azure App Services.                            |


[1]: https://docs.microsoft.com/en-us/azure/azure-functions/
[2]: https://app.datadoghq.com/functions
{{% /tab %}}
{{% tab "Google Cloud Functions" %}}

Cloud Functions est l'environnement d'exécution sans serveur de Google. Consultez la [documentation Google Cloud Functions][1] pour en savoir plus.

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Fonctions Cloud          | L'offre FaaS de Google.                          |

[1]: https://cloud.google.com/functions/docs
{{% /tab %}}
{{< /tabs >}}