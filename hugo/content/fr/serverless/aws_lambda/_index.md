---
aliases:
- /fr/serverless/aws
further_reading:
- link: /serverless/configuration/
  tag: Documentation
  text: Configurer la surveillance serverless
- link: /integrations/amazon-lambda/
  tag: Documentation
  text: Intégration AWS Lambda
- link: /serverless/guide/disable_serverless
  tag: Documentation
  text: Désactiver Serverless Monitoring
- link: /opentelemetry/setup/otlp_ingest/serverless/?tab=aws#lambda
  tag: Documentation
  text: Envoyer des traces AWS Lambda à Datadog avec OTLP
- link: https://www.datadoghq.com/blog/monitoring-lambda-containers/
  tag: Blog
  text: Surveiller des fonctions AWS Lambda déployées à l'aide d'images de conteneur
- link: https://www.datadoghq.com/blog/manage-serverless-logs-datadog/
  tag: Blog
  text: Meilleures pratiques pour la collecte et la gestion des logs depuis un environnement
    serverless
- link: https://www.datadoghq.com/blog/aws-serverless-application-design/
  tag: Blog
  text: Concevoir des applications serverless AWS prêtes pour la production
- link: https://www.datadoghq.com/blog/well-architected-serverless-applications-best-practices/
  tag: Blog
  text: Conseils pour créer des applications serverless tout en suivant le framework
    AWS Well-Architected
- link: https://www.datadoghq.com/blog/aws-lambda-functions-ephemeral-storage-monitoring/
  tag: Blog
  text: Surveiller l'utilisation du stockage éphémère de vos fonctions AWS Lambda
- link: https://www.datadoghq.com/blog/serverless-cold-start-traces/
  tag: Blog
  text: Comprendre les performances des fonctions serverless avec le tracing des démarrages
    à froid
- link: https://www.datadoghq.com/blog/identifying-deprecated-lambda-functions/
  tag: Blog
  text: Identifier les fonctions Lambda obsolètes avec Datadog
- link: https://www.datadoghq.com/blog/monitoring-lwa-with-datadog/
  tag: Blog
  text: Surveiller les applications Web hébergées sur Lambda avec l'intégration Lambda
    Web Adapter
- link: https://www.datadoghq.com/blog/lambda-managed-instances
  tag: Blog
  text: Surveiller les instances gérées AWS Lambda avec Datadog
- link: https://learn.datadoghq.com/courses/visibility-aws-lambda
  tag: Centre d'apprentissage
  text: Configurer AWS Lambda pour Serverless Monitoring avec Datadog
title: Serverless Monitoring pour AWS Lambda
---
Datadog Serverless Monitoring pour AWS Lambda vous offre une visibilité optimale sur vos fonctions Lambda.

Pour commencer, suivez les [instructions d'installation][1] afin de collecter des métriques, des traces et des logs depuis vos applications serverless.

## Types de calcul Lambda {#lambda-compute-types}

La prise en charge par Datadog varie selon le type de calcul AWS Lambda :

| Type Lambda | Ce qu'il exécute | Prise en charge par Datadog |
|---|---|---|
| Lambda Event Functions | Code qui s'exécute en réponse à des événements ou à des appels d'API. Il s'agit du type de fonction Lambda d'origine. | Serverless Monitoring : métriques, traces et journaux, ainsi que les fonctionnalités présentées sur cette page. Consultez la page de chaque fonctionnalité pour connaître la prise en charge des environnements d'exécution. |
| Lambda Web Functions | Applications Web et backends d'API qui traitent directement les requêtes HTTP. | Métriques CloudWatch, un dashboard prêt à l'emploi et des monitors recommandés via l'[intégration AWS Lambda][2]. |
| Lambda MicroVMs | Environnements de calcul isolés pour chaque utilisateur ou job, avec une durée de vie allant jusqu'à 8 heures. | Journaux CloudWatch via le [Datadog Forwarder][3], incluant l'abonnement automatique aux journaux. |

Les [Lambda Managed Instances][4] et les [Lambda Durable Functions][5] sont des moyens d'exécuter des Lambda Event Functions, et Datadog prend en charge les deux. Pour les environnements d'exécution pris en charge, consultez chaque page.

Dans la documentation de Serverless Monitoring, « fonction Lambda » désigne une Lambda Event Function, sauf indication contraire sur une page. Les API AWS, les SDK, l'interface de ligne de commande AWS, le type de ressource `AWS::Lambda::Function` et les ARN utilisent le terme « function » pour les Lambda Event Functions. Votre instrumentation et votre code d'infrastructure existants continuent de fonctionner sans modification. Pour plus d'informations, consultez [Qu'est-ce qu'AWS Lambda ?][6] dans la documentation AWS.

## Fonctionnement {#how-it-works}

{{< img src="serverless/serverless_custom_metrics.png" alt="Collecte de métriques améliorées depuis AWS Lambda" >}}

Datadog Serverless Monitoring tire profit d'une bibliothèque Lambda Datadog spécifique au runtime, ainsi que de l'extension Lambda Datadog, pour envoyer des données de télémétrie à partir de vos fonctions Lambda.

La Datadog Lambda Extension collecte les logs de fonction à l'aide de l'API de télémétrie Lambda, éliminant ainsi le besoin de CloudWatch. Elle génère également des métriques améliorées. Elle unifie ces signaux de télémétrie avec les traces APM, les spans personnalisés et les métriques personnalisées de la bibliothèque Datadog Lambda.

## Utilisation {#usage}

Consultez les ressources suivantes pour découvrir comment installer et configurer Serverless Monitoring pour AWS Lambda, et notamment comment utiliser les métriques, traces et logs pour bénéficier d'une visibilité complète.

{{< whatsnext desc=" ">}}
    {{< nextlink href="/serverless/installation" >}}<u>Installation</u> : Installez Serverless Monitoring for AWS Lambda.{{< /nextlink >}}
    {{< nextlink href="/serverless/enhanced_lambda_metrics" >}}<u>Métriques Lambda</u> : Apprenez-en davantage sur les métriques améliorées et découvrez comment soumettre des métriques personnalisées.{{< /nextlink >}}
    {{< nextlink href="/serverless/distributed_tracing" >}}<u>Distributed Tracing</u> : Utilisez APM et Distributed Tracing pour obtenir une vue riche en contexte des performances de votre application.{{< /nextlink >}}
    {{< nextlink href="/serverless/aws_lambda/logs" >}}
    <u>Log Collection</u>: Read more about log collection, how to filter logs, and how to connect logs and traces.{{< /nextlink >}}
{{< /whatsnext >}}

### Surveillez l'intégralité de votre stack serverless dans la vue Serverless {#monitor-your-entire-serverless-stack-in-the-serverless-view}

Grâce à la vue Serverless, vous pouvez mettre en corrélation des métriques générales provenant de ressources AWS avec les métriques de fonctions Lambda, afin d'identifier rapidement vos problèmes et de commencer au plus tôt votre enquête.

Par défaut, la vue Serverless regroupe vos ressources serverless par service pour vous aider à visualiser les performances de chaque partie de votre application. Pour chaque service, vous pouvez voir les fonctions qui lui appartiennent, ainsi que les ressources (Amazon API Gateway, SNS, SQS, DynamoDB, S3, EventBridge, Kinesis) qui les ont invoquées.

{{< img src="serverless/serverless-view-hero.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

### Résolvez plus rapidement les échecs des fonctions AWS Lambda en surveillant les charges utiles d'invocation {#resolve-aws-lambda-function-failures-faster-by-monitoring-invocation-payloads}

Datadog collecte automatiquement les requêtes et les réponses de fonction pour toutes vos invocations de fonction, fournissant des informations clés qui peuvent aider à résoudre les problèmes. Par exemple, si vous êtes informé qu'une de vos fonctions Lambda rencontre des échecs, vous pouvez analyser les charges utiles de requête pertinentes pour vérifier l'absence de paramètres, les adresses de ressources mal saisies ou d'autres erreurs de configuration pouvant être à l'origine des échecs.

Grâce à l'identification de ces erreurs, vous pouvez reproduire plus facilement les problèmes dans votre environnement de développement, puis exécuter des tests pour vous assurer que vos correctifs fonctionnent.

{{< img src="serverless/lambda_payload_hero.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

### Métriques en temps réel pour alerter sur les problèmes dans votre environnement de fonctions Lambda {#real-time-metrics-for-alerting-on-issues-across-your-lambda-function-environment}

Les métriques Lambda améliorées de Datadog, qui apparaissent dans Datadog avec le préfixe `aws.lambda.enhanced`, sont disponibles avec une granularité à la seconde et en temps quasi réel. Vous pouvez utiliser les métriques Lambda améliorées pour des alertes ou des SLO sur les démarrages à froid, les coûts AWS estimés, les délais d'attente, les erreurs de mémoire insuffisante et l'utilisation de la mémoire sur l'ensemble de vos fonctions Lambda. Cela vous permet de visualiser les problèmes de performance dans vos environnements serverless dès qu'ils surviennent et de les résoudre sans délai.

{{< img src="serverless/serverless_enhanced_metrics.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

### Surveillez les changements de configuration serverless avec le suivi des déploiements {#monitor-serverless-configuration-changes-with-deployment-tracking}

Vous pouvez facilement mettre en corrélation les métriques, traces et logs de vos fonctions avec le code serverless, les configurations et les changements de déploiement. Cela vous permet d'obtenir en temps réel des informations pertinentes sur l'incidence de ces changements sur l'intégrité et les performances de vos applications.

{{< img src="serverless/serverless_deployment_tracking.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

## Fonctionnalités supplémentaires {#additional-capabilities}

{{< whatsnext desc=" ">}}
    {{< nextlink href="/serverless/aws_lambda/profiling" >}}<u>Continuous Profiler</u> : activez le Continuous Profiler de Datadog pour trouver la ligne de code exacte de votre fonction Lambda à l'origine des goulots d'étranglement.{{< /nextlink >}}
    {{< nextlink href="/serverless/aws_lambda/securing_functions" >}}<u>Secure Functions</u> : utilisez App and API Protection (AAP) pour gérer les menaces pesant sur vos fonctions.{{< /nextlink >}}
    {{< nextlink href="/serverless/deployment_tracking" >}}<u>Deployment Tracking</u> : suivez les déploiements pour voir quand une nouvelle version de code ou un changement de configuration provoque une régression.{{< /nextlink >}}
{{< /whatsnext >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/serverless/installation
[2]: /fr/integrations/amazon-lambda/
[3]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#automatically-set-up-triggers
[4]: /fr/serverless/aws_lambda/managed_instances/
[5]: /fr/serverless/aws_lambda/durable_functions/
[6]: https://docs.aws.amazon.com/lambda/latest/dg/welcome.html