---
aliases:
- /fr/graphing/infrastructure/cloudfunctions
- /fr/graphing/infrastructure/serverless_functions
- /fr/graphing/infrastructure/serverless/
- /fr/infrastructure/serverless/
- /fr/tracing/serverless_functions/datadog_apm
- /fr/integrations/amazon_lambda/docs.datadoghq.com/serverless/
cascade:
  algolia:
    rank: 70
further_reading:
- link: /serverless/installation/
  tag: Documentation
  text: Installer Serverless Monitoring
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Prenez part à une session interactive pour en savoir plus sur Serverless Monitoring
- link: https://www.datadoghq.com/state-of-serverless
  tag: Blog
  text: Bilan sur l'adoption Serverless
- link: https://www.datadoghq.com/blog/azure-container-apps/
  tag: Blog
  text: Surveiller Azure Container Apps avec Datadog
- link: https://app.datadoghq.com/release-notes?category=Serverless
  tag: Notes de version
  text: Découvrez les dernières versions de Serverless ! (Connexion à l'application
    requise).
title: Serverless
---
{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/543362476/rendition/1080p/file.mp4?loc=external&signature=4927d13b131aea1e3b4f77efca5af49bb509f5e7f1d6ca06a5267ba02a8c194a" poster="/images/poster/serverless.png" >}}

<br/>

<div class="alert alert-info">Assurez-vous de consulter les discussions en cours dans le canal <a href="https://datadoghq.slack.com/archives/CFDPB83M4">#serverless</a> de la <a href="https://chat.datadoghq.com/">communauté Slack Datadog</a>.</div>

{{< learning-center-callout header="Rejoignez une session de webinaire de formation" hide_image="true" btn_title="S'inscrire" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Serverless">}}
Découvrez comment Serverless Monitoring permet à vos équipes de rester agiles et de consacrer leur temps au développement d'applications génératrices de revenus tout en réduisant la charge opérationnelle.
{{< /learning-center-callout >}}

[Datadog Serverless Monitoring][1] offre une visibilité complète sur tous les services gérés sur lesquels reposent vos applications serverless. Elle regroupe au sein d'une unique vue des métriques en temps réel, des logs et des traces fournis par votre service de calcul sans serveur, ainsi que les API entièrement gérées, files d'attente, flux et datastores associés.

Datadog fournit des solutions pour le monitoring de [AWS Lambda](#aws-lambda), [Azure App Service](#azure-app-service), [Azure Container Apps](#azure-container-apps) et [Google Cloud Run](#google-cloud-run).

### AWS Lambda {#aws-lambda}

[Serverless Monitoring pour AWS Lambda][2] vous permet de mettre en corrélation des métriques générales provenant de ressources AWS avec les métriques de fonctions Lambda, afin d'identifier rapidement vos problèmes et de commencer au plus tôt votre enquête.

Les [métriques Lambda améliorées][3], qui apparaissent dans Datadog avec le préfixe `aws.lambda.enhanced`, sont disponibles avec une granularité à la seconde et en temps quasi réel. Vous pouvez utiliser les métriques Lambda améliorées pour des alertes ou des SLO sur les démarrages à froid, les coûts AWS estimés, les délais d'attente, les erreurs de mémoire insuffisante et l'utilisation de la mémoire sur l'ensemble de vos fonctions Lambda.

Vous pouvez envoyer des [métriques custom][4] depuis une fonction Lambda, en générant des métriques à partir de logs et de traces. Pour ce faire, vous pouvez utiliser Datadog Lambda Extension ou la fonction Datadog Forwarder Lambda.

Grâce au [Distributed Tracing][5], vous pouvez connecter vos traces serverless aux métriques pour obtenir une vue riche en contexte des performances de votre application. Les SDK Datadog pour Python, Node.js, Ruby, Go, Java et .NET prennent en charge le distributed tracing pour AWS Lambda.

La fonctionnalité de [suivi des déploiements][6] vous permet de mettre facilement en corrélation les métriques, traces et logs de vos fonctions avec le code serverless, les configurations et les changements de déploiement. Vous pouvez ainsi obtenir en temps réel des informations pertinentes sur l'incidence de ces changements sur l'intégrité et les performances de vos applications.

### AWS Step Functions {#aws-step-functions}

AWS Step Functions est un service d'orchestration serverless qui permet aux développeurs de créer et de gérer des workflows d'application à plusieurs étapes dans AWS.

Surveillez les métriques et les logs de l'[intégration AWS Step Functions][13] pour visualiser la télémétrie cloud-native dans la vue {{< ui >}}Serverless{{< /ui >}} de l'application.

Identifiez les bugs et les goulots d'étranglement grâce aux [traces d'exécution][14]. Les traces pour les step functions peuvent être générées à partir des logs de Step Function et fournissent des informations d'exécution granulaires, notamment le chemin d'exécution de la machine à états, les entrées et sorties pour chaque étape, ainsi que la durée d'exécution de l'étape.

Les métriques améliorées de Step Function, qui apparaissent dans Datadog avec le préfixe `aws.states.enhanced`, sont disponibles avec une granularité à la seconde et générées directement dans Datadog.

### Azure App Service {#azure-app-service}

L'[extension Datadog pour Azure App Service][7] vous permet de tracer vos applications Web Azure.

Utilisez la [{{< ui >}}Azure App Service{{< /ui >}} vue][8] pour :

- Identifiez rapidement les applications présentant une latence élevée ou des erreurs

- Suivez l'utilisation de vos Web Apps, Function Apps et App Service Plans

- Obtenez des informations sur les coûts de vos App Service Plans en visualisant le nombre d'instances actives et en identifiant celles qui exécutent des applications envoyant des traces ou des logs à Datadog

- Mappez les applications exécutées sur vos App Service Plans pour identifier celles susceptibles d'avoir un impact sur les coûts ou les performances

L'extension Datadog pour Azure App Service fournit des capacités de tracing pour les applications Web Azure. Pour plus d'informations sur la configuration du tracing dans Azure, consultez [Azure App Service][7].

### Azure Container Apps {#azure-container-apps}

Azure Container Apps est une plateforme serverless entièrement gérée pour déployer et mettre à l'échelle des applications basées sur des conteneurs. Datadog fournit une surveillance et une collecte de logs pour Container Apps via l'[intégration Azure][9].

Datadog fournit également une solution pour [instrumenter vos applications Container Apps][10] avec un agent serverless pour activer le traçage, les métriques personnalisées et la collecte directe de logs.

### Google Cloud Run {#google-cloud-run}

Google Cloud Run est une solution de calcul légère, asynchrone et basée sur les événements qui vous permet de créer de petites fonctions à usage unique. Pour surveiller les fonctions serverless s'exécutant sur Google Cloud Platform, activez l'[intégration Google Cloud Platform][11].

Datadog fournit également une solution pour [instrumenter vos applications Cloud Run][12] avec un agent serverless pour activer le traçage, les métriques personnalisées et la collecte directe de logs.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
[2]: /fr/serverless/aws_lambda
[3]: /fr/serverless/enhanced_lambda_metrics
[4]: /fr/serverless/custom_metrics
[5]: /fr/serverless/distributed_tracing
[6]: /fr/serverless/deployment_tracking
[7]: /fr/serverless/azure_app_service/#overview
[8]: https://app.datadoghq.com/functions?cloud=azure&config_serverless-azure-app=true&group=service
[9]: /fr/integrations/azure/#log-collection
[10]: /fr/serverless/azure_container_apps
[11]: /fr/integrations/google_cloud_platform/
[12]: /fr/serverless/google_cloud_run
[13]: /fr/integrations/amazon_step_functions
[14]: /fr/serverless/step_functions/installation