---
title: Tracing distribué
kind: documentation
aliases:
  - /fr/tracing/serverless_functions
  - /fr/tracing/setup_overview/serverless_functions/
further_reading:
  - link: tracing/serverless_functions
    tag: Documentation
    text: "Installation d'AWS\_X-Ray"
---
{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="Tracer des fonctions sans serveur"  style="width:100%;">}}

Associez vos traces sans serveur à vos métriques pour permettre à Datadog de vous offrir une vue d'ensemble détaillée et contextualisée des performances de votre application. Compte tenu de la nature distribuée des applications sans serveur, vous pouvez ainsi mieux dépanner les problèmes de performance.

## Choisir votre bibliothèque de tracing

{{< img src="integrations/amazon_lambda/lambda_tracing.png" alt="Diagramme de l'architecture de tracing d'AWS Lambda avec Datadog" >}}

En fonction de votre langage et de votre configuration, choisissez d'installer l'APM Datadog ou AWS X-Ray pour répondre à vos besoins en matière de tracing. [Lisez cette page][1] pour en savoir plus sur le tracing avec AWS X-Ray.

## Tracing distribué avec l'APM Datadog

L'APM Datadog envoie les données de trace à Datadog en temps réel, ce qui vous permet de surveiller les traces avec peu ou pas de latence dans la vue Live Search. Pour améliorer ses opérations d'échantillonnage, l'APM Datadog fait également appel au tail.

Les bibliothèques de tracing Python, Node.js et Ruby Datadog prennent en charge le tracing distribué pour AWS Lambda. D'autres runtimes seront prochainement compatibles. La meilleure façon d'ajouter des fonctionnalités de tracing à votre application consiste à utiliser la [bibliothèque Lambda Datadog][2]. Celle-ci comprend la bibliothèque de tracing Datadog en tant que dépendance.

Vous pouvez visualiser vos traces sur la [page Serverless principale][3], dans la section [App Analytics][4] et sur la [Service Map][5].

### Corréler vos logs et vos traces

L'injection des ID de traces, des ID de spans, de l'env, du service et de la version en tant qu'attributs dans vos logs permet d'améliorer la corrélation entre l'APM Datadog et Log Management. Vous pouvez utiliser ces champs pour rechercher les logs associés à un service et une version spécifiques, ou tous les logs corrélés à une trace observée.

### Live Search

{{< img src="tracing/live_search/livesearchmain.gif" alt="Live Search" >}}

La fonctionnalité Live Search de l'APM vous donne la possibilité d'effectuer des recherches en temps réel parmi toutes les spans ingérées au cours des 15 dernières minutes. Les spans sont affichées dès leur envoi par l'Agent Datadog et avant leur indexation par Datadog.

## Activer l'APM Datadog

Les bibliothèques de tracing Python, Node.js et Ruby Datadog prennent en charge le tracing distribué pour AWS Lambda. D'autres runtimes seront prochainement compatibles. Pour activer le tracing sur vos fonctions, suivez les [instructions d'installation][6].

Pour activer l'APM Datadog sans activer le logging pour vos fonctions, assurez-vous que la variable d'environnement `DdForwarderLog` est définie sur `false` sur votre Forwarder Datadog. 
[1]: /fr/tracing/serverless_functions/
[2]: /fr/serverless/datadog_lambda_library/
[3]: https://app.datadoghq.com/functions
[4]: https://app.datadoghq.com/apm/analytics
[5]: https://app.datadoghq.com/apm/map
[6]: https://docs.datadoghq.com/fr/serverless/installation