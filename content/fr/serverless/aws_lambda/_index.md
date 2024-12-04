---
further_reading:
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
- link: https://www.datadoghq.com/blog/serverless-cold-start-traces/
  tag: Blog
  text: Comprendre les performances des fonctions sans serveur avec le tracing des
    démarrages à froid
title: Surveillance sans serveur pour AWS Lambda
---

La surveillance de serveur Datadog pour AWS Lambda vous offre une visibilité optimale sur vos fonctions Lambda.

Pour commencer, suivez les [instructions d'installation][1] pour recueillir des métriques, traces et logs à partir de vos applications sans serveur.

## Fonctionnement

{{< img src="serverless/serverless_custom_metrics.png" alt="Collecte de métriques optimisées depuis AWS Lambda" >}}

La surveillance sans serveur Datadog tire profit d'une bibliothèque Lambda Datadog spécifique au runtime, ainsi que de l'extension Lambda Datadog, pour envoyer des données de télémétrie à partir de vos fonctions Lambda.

L'extension Lambda Datadog recueille des logs via CloudWatch, ainsi que des traces, des métriques optimisées et des métriques custom à partir de la bibliothèque Lambda Datadog.

## Utilisation

Consultez les ressources suivantes pour découvrir comment installer et configurer la surveillance sans serveur pour AWS Lambda, et notamment comment utiliser les métriques, traces et logs pour bénéficier d'une visibilité complète.

{{< whatsnext desc=" ">}}
    {{< nextlink href="/serverless/installation" >}}<u>Installation</u> : installez la surveillance sans serveur pour AWS Lambda.{{< /nextlink >}}
    {{< nextlink href="/serverless/enhanced_lambda_metrics" >}}<u>Métriques Lambda</u> : familiarisez-vous avec les métriques optimisées et découvrez comment envoyer des métriques custom.{{< /nextlink >}}
    {{< nextlink href="/serverless/distributed_tracing" >}}<u>Tracing distribué</u> : tirez profit d'APM et du tracing distribué pour bénéficier d'une vue d'ensemble détaillée et contextualisée des performances de votre application. {{< /nextlink >}}
    {{< nextlink href="/serverless/aws_lambda/logs" >}}
    <u>Collecte de logs</u> : découvrez le fonctionnement de la collecte de logs, apprenez à filtrer des logs et associez vos logs à vos traces.{{< /nextlink >}}
{{< /whatsnext >}}

### Surveiller toute votre pile sans serveur avec la vue Serverless

Grâce à la vue Serverless, vous pouvez mettre en corrélation des métriques générales provenant de ressources AWS avec les métriques de fonctions Lambda, afin d'identifier rapidement vos problèmes et de commencer au plus tôt votre enquête.

Par défaut, la vue Serverless regroupe vos ressources sans serveur par service, afin que vous puissiez visualiser facilement les performances de chaque aspect de votre application. Chaque service répertorie les fonctions associées, ainsi que les ressources qui ont appelé ces fonctions (Amazon API Gateway, SNS, SQS, DynamoDB, S3, EventBridge, Kinesis).

{{< img src="serverless/serverless-view-hero.jpeg" alt="Surveillance sans serveur Datadog" style="width:100%;" >}}

### Corriger plus rapidement les échecs des fonctions AWS Lambda en surveillant les charges utiles d'invocations

Datadog recueille automatiquement les requêtes et réponses de tous vos appels de fonction. Vous disposez ainsi de précieux insights qui simplifient la résolution de problèmes. Par exemple, si vous découvrez qu'une de vos fonctions Lambda génère des échecs, vous pouvez analyser la charge utile des requêtes pour vérifier s'il manque des paramètres, si des adresses de ressource ont mal été saisies ou si ces échecs sont causés par d'autres problèmes de configuration.

Grâce à l'identification de ces erreurs, vous pouvez reproduire plus facilement les problèmes dans votre environnement de développement, puis exécuter des tests pour vous assurer que vos correctifs fonctionnent.

{{< img src="serverless/lambda_payload_hero.jpeg" alt="Surveillance sans serveur Datadog" style="width:100%;" >}}

### Envoyer des alertes liées à votre environnement de fonctions Lambda grâce aux métriques en temps réel

Les métriques Lambda optimisées de Datadog, qui sont identifiées dans Datadog par le préfixe `aws.lambda.enhanced`, sont fournies quasiment en temps réel avec une granularité d'une seconde. Elles vous permettent de générer des alertes ou d'appliquer des SLO basés sur les démarrages à froid, les coûts AWS estimés, les expirations, les erreurs liées à une mémoire insuffisante et l'utilisation de la mémoire pour l'ensemble de vos fonctions Lambda. Vous pouvez ainsi visualiser en temps réel les problèmes de performance de vos environnements sans serveur et les diagnostiquer au plus vite.

{{< img src="serverless/serverless_enhanced_metrics.jpeg" alt="Surveillance sans serveur Datadog" style="width:100%;" >}}

### Surveiller les changements de configuration sans serveur grâce au suivi des déploiements

Vous pouvez facilement mettre en corrélation les métriques, traces et logs de vos fonctions avec le code sans serveur, les configurations et les changements de déploiement. Cela vous permet d'obtenir en temps réel des informations pertinentes sur l'incidence de ces changements sur l'intégrité et les performances de vos applications.

{{< img src="serverless/serverless_deployment_tracking.jpeg" alt="Surveillance sans serveur Datadog" style="width:100%;" >}}

## Fonctionnalités supplémentaires

{{< whatsnext desc=" ">}}
    {{< nextlink href="/serverless/aws_lambda/profiling" >}}<u>Profileur en continu</u> : activez le profileur continu Datadog pour identifier la ligne de code précise de votre fonction Lambda qui génère des goulots d'étranglement.{{< /nextlink >}}
    {{< nextlink href="/serverless/aws_lambda/securing_functions" >}}<u>Sécurisation de vos fonctions</u> : tirez profit de la solution Application Security Management (ASM) pour gérer les menaces envers vos fonctions.{{< /nextlink >}}
    {{< nextlink href="/serverless/deployment_tracking" >}}<u>Suivi des déploiements</u> : surveillez vos déploiements afin de détecter lorsqu'une nouvelle version du code ou un changement de configuration entraîne une régression.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/serverless/installation