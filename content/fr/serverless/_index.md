---
title: Informatique sans serveur
kind: documentation
aliases:
  - /fr/graphing/infrastructure/cloudfunctions
  - /fr/graphing/infrastructure/serverless_functions
  - /fr/graphing/infrastructure/serverless/
  - /fr/infrastructure/serverless/
  - /fr/tracing/serverless_functions/datadog_apm
  - /fr/integrations/amazon_lambda/docs.datadoghq.com/serverless/
further_reading:
  - link: /integrations/amazon_xray/
    tag: Intégration X-Ray
    text: Intégration AWS X-Ray
  - link: /integrations/amazon_lambda/
    tag: "Intégration AWS\_Lambda"
    text: "Intégration AWS\_Lambda"
  - link: 'https://www.datadoghq.com/blog/monitoring-lambda-containers/'
    tag: Blog
    text: Surveiller des fonctions Lambda Datadog AWS déployées à l'aide d'images de conteneur
---
{{< img src="serverless/datadog_serverless_overview.png" alt="Présentation de l'informatique sans serveur Datadog"  style="width:100%;">}}

## Présentation

L'informatique sans serveur consiste à écrire du code orienté événement et à l'importer dans un fournisseur de cloud afin qu'il gère toutes les ressources de calcul sous-jacentes. [L'informatique sans serveur Datadog][1] regroupe en une unique vue les métriques, traces et logs de vos fonctions AWS Lambda qui exécutent des applications sans serveur.

<div class="alert alert-info">Assurez-vous de consulter les discussions en cours dans le canal <a href="https://datadoghq.slack.com/archives/CFDPB83M4">#serverless</a> de la <a href="https://chat.datadoghq.com/">communauté Slack de Datadog</a>.</div>

## Prise en main

1. Installez [l'intégration AWS][2]. Datadog pourra ainsi ingérer les métriques Lambda depuis AWS CloudWatch.
2. Installez la [fonction Lambda du Forwarder Datadog][3], qui est requise pour ingérer des traces Lambda AWS, des métriques optimisées, des métriques custom et des logs.
   **Remarque** : ignorez cette étape si vous avez déjà installé la fonction du Forwarder avec la pile CloudFormation de l'[intégration AWS][2].
3. Instrumentez votre application. Sélectionnez un runtime Lambda ci-dessous pour découvrir comment instrumenter votre application sans serveur.

{{< partial name="serverless/getting-started-languages.html" >}}

## Autres services

### Azure App Service

L'extension Datadog pour Azure App Service vous permet de tracer vos applications Web Azure. Pour en savoir plus sur la configuration du tracing dans Azure, consultez la [documentation sur l'extension Azure App Service][4].

### Google Cloud Functions

Google Cloud Functions est une solution de calcul asynchrone, légère et basée sur des événements qui vous permet de créer de petites fonctions à usage unique. Pour surveiller les fonctions sans serveur exécutées sur Google Cloud Platform, activez [l'intégration Google Cloud Platform][5].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
[2]: /fr/integrations/amazon_web_services/
[3]: /fr/serverless/forwarder
[4]: /fr/infrastructure/serverless/azure_app_services/#overview
[5]: /fr/integrations/google_cloud_platform/