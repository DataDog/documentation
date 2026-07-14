---
aliases:
- /fr/graphing/infrastructure/cloudfunctions
- /fr/graphing/infrastructure/serverless_functions
- /fr/graphing/infrastructure/serverless/
- /fr/infrastructure/serverless/
- /fr/tracing/serverless_functions/datadog_apm
- /fr/integrations/amazon_lambda/docs.datadoghq.com/serverless/
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Serverless
  tag: Notes de version
  text: Découvrez les dernières versions de l'informatique sans serveur (connexion
    à l'application requise).
- link: https://www.datadoghq.com/state-of-serverless
  tag: Blog
  text: Bilan sur l'adoption de l'informatique sans serveur
- link: /serverless/installation/
  tag: Documentation
  text: Installation de la surveillance sans serveur
- link: /serverless/configuration/
  tag: Documentation
  text: Configurer la surveillance sans serveur
- link: /integrations/amazon_lambda/
  tag: Documentation
  text: Intégration AWS Lambda
- link: https://www.datadoghq.com/blog/monitoring-lambda-containers/
  tag: Blog
  text: Surveiller des fonctions Lambda Datadog AWS déployées à l'aide d'images de
    conteneur
- link: https://www.datadoghq.com/blog/manage-serverless-logs-datadog/
  tag: Blog
  text: Meilleures pratiques pour la collecte et la gestion des logs depuis un environnement
    sans serveur
- link: https://www.datadoghq.com/blog/aws-serverless-application-design/
  tag: Blog
  text: Concevoir des applications sans serveur AWS prêtes pour la production
- link: https://www.datadoghq.com/blog/well-architected-serverless-applications-best-practices/
  tag: Blog
  text: Conseils pour créer des applications sans serveur tout en suivant le framework
    AWS Well-Architected
- link: https://www.datadoghq.com/blog/aws-lambda-functions-ephemeral-storage-monitoring/
  tag: Blog
  text: Surveiller l'utilisation du stockage éphémère de vos fonctions AWS Lambda
title: Informatique sans serveur
---

{{< vimeo 543362476 >}}

<br/>

<div class="alert alert-info">Assurez-vous de consulter les discussions en cours dans le canal <a href="https://datadoghq.slack.com/archives/CFDPB83M4">#serverless</a> de la <a href="https://chat.datadoghq.com/">communauté Slack de Datadog</a>.</div>

La [surveillance sans serveur Datadog][1] offre une visibilité complète sur tous les services gérés sur lesquels reposent vos applications sans serveur. Elle regroupe au sein d'une unique vue des métriques en temps réel, des logs et des traces fournis par votre service de calcul sans serveur, ainsi que les API entièrement gérées, files d'attente, flux et datastores associés.

Cette section décrit la solution Datadog de surveillance d'applications sans serveur AWS et de fonctions Lambda. Elle contient également des informations sur la prise en charge de la surveillance des applications sans serveur [Azure][2] et [Google][3].

## Explorer la surveillance sans serveur Datadog pour AWS Lambda

Pour commencer, suivez les [instructions d'installation][4] pour recueillir des métriques, traces et logs à partir de vos applications sans serveur.

### Surveiller toute votre pile sans serveur avec la vue Serverless

Grâce à la vue Serverless, vous pouvez mettre en corrélation des métriques générales provenant de ressources AWS avec les métriques de fonctions Lambda, afin d'identifier rapidement vos problèmes et de commencer au plus tôt votre enquête.

Par défaut, la vue Serverless regroupe vos ressources sans serveur par service, afin que vous puissiez visualiser facilement les performances de chaque aspect de votre application. Chaque service répertorie les fonctions associées, ainsi que les ressources qui ont appelé ces fonctions (Amazon API Gateway, SNS, SQS, DynamoDB, S3, EventBridge, Kinesis).

{{< img src="serverless/serverless-view-hero.jpeg" alt="Surveillance sans serveur Datadog"  style="width:100%;" >}}

### Corriger plus rapidement les échecs des fonctions AWS Lambda en surveillant les charges utiles d'invocations

Datadog recueille automatiquement les requêtes et réponses de tous vos appels de fonction. Vous disposez ainsi de précieux insights qui simplifient la résolution de problèmes. Par exemple, si vous découvrez qu'une de vos fonctions Lambda génère des échecs, vous pouvez analyser la charge utile des requêtes pour vérifier s'il manque des paramètres, si des adresses de ressource ont mal été saisies ou si ces échecs sont causés par d'autres problèmes de configuration.

Grâce à l'identification de ces erreurs, vous pouvez reproduire plus facilement les problèmes dans votre environnement de développement, puis exécuter des tests pour vous assurer que vos correctifs fonctionnent.

{{< img src="serverless/lambda_payload_hero.jpeg" alt="Surveillance sans serveur Datadog"  style="width:100%;" >}}

### Envoyer des alertes liées à votre environnement de fonctions Lambda grâce aux métriques en temps réel

Les métriques Lambda optimisées de Datadog, qui sont identifiées dans Datadog par le préfixe `aws.lambda.enhanced`, sont fournies quasiment en temps réel avec une granularité d'une seconde. Elles vous permettent de générer des alertes ou d'appliquer des SLO basés sur les démarrages à froid, les coûts AWS estimés, les expirations, les erreurs liées à une mémoire insuffisante et l'utilisation de la mémoire pour l'ensemble de vos fonctions Lambda. Vous pouvez ainsi visualiser en temps réel les problèmes de performance de vos environnements sans serveur et les diagnostiquer au plus vite.

{{< img src="serverless/serverless_enhanced_metrics.jpeg" alt="Surveillance sans serveur Datadog"  style="width:100%;" >}}

### Surveiller les changements de configuration sans serveur grâce au suivi des déploiements

Vous pouvez facilement mettre en corrélation les métriques, traces et logs de vos fonctions avec le code sans serveur, les configurations et les changements de déploiement. Cela vous permet d'obtenir en temps réel des informations pertinentes sur l'incidence de ces changements sur l'intégrité et les performances de vos applications.

{{< img src="serverless/serverless_deployment_tracking.jpeg" alt="Surveillance sans serveur Datadog"  style="width:100%;" >}}

## Surveillance sans serveur Datadog pour les autres clouds sans serveur

### Azure App Service

L'extension Datadog pour Azure App Service vous permet de tracer vos applications Web Azure.

Utilisez la [vue Azure App Service][5] pour :

- Identifier rapidement les apps qui présentent une forte latence ou génèrent beaucoup d'erreurs

- Surveiller l'utilisation de vos applications Web, applications de fonctions et plans App Service

- Obtenir des informations exploitables sur les coûts de vos plans App Service, en visualisant le nombre d'instances actives et en consultant les applications en cours d'exécution qui transmettent des traces ou des logs à Datadog

- Mapper les apps en cours d'exécution sur vos plans App Service, afin d'identifier celles qui sont coûteuses ou lentes

L'extension Datadog pour Azure App Service vous permet de tracer vos applications Web Azure. Pour en savoir plus sur la configuration du tracing dans Azure, consultez la [documentation relative à l'extension Azure App Service][6].

### Google Cloud Functions

Google Cloud Functions est une solution de calcul asynchrone, légère et basée sur des événements qui vous permet de créer de petites fonctions à usage unique. Pour surveiller les fonctions sans serveur exécutées sur Google Cloud Platform, activez [l'intégration Google Cloud Platform][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
[2]: /fr/serverless/#azure-app-service
[3]: /fr/serverless/#google-cloud-functions
[4]: /fr/serverless/installation
[5]: https://app.datadoghq.com/functions?cloud=azure&config_serverless-azure-app=true&group=service
[6]: /fr/infrastructure/serverless/azure_app_services/#overview
[7]: /fr/integrations/google_cloud_platform/