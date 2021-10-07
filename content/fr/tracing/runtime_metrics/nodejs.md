---
title: Métriques de runtime NodeJS
kind: documentation
description: Consultez des statistiques supplémentaires sur les performances de votre application NodeJS grâce aux métriques runtime associées à vos traces.
further_reading:
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: Associer vos logs à vos traces
  - link: tracing/manual_instrumentation
    tag: Documentation
    text: Instrumenter vos applications manuellement pour créer des traces
  - link: tracing/opentracing
    tag: Documentation
    text: Implémenter Opentracing dans vos applications
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
---
<div class="alert alert-warning">
Cette fonctionnalité est actuellement en version bêta privée. <a href="https://docs.datadoghq.com/help/">Contactez l'assistance</a> afin de demander son activation pour votre compte.
</div>

## Configuration automatique

Il est possible d'activer la collecte de métriques runtime en définissant un paramètre de configuration dans le client de tracing, soit via l'option de traceur `tracer.init({ runtimeMetrics: true })`, soit via la variable d'environnement `DD_RUNTIME_METRICS_ENABLED=true`

Les métriques runtime peuvent être visualisées conjointement à vos services Node. Consultez la [page Service][1] dans Datadog.

Par défaut, les métriques runtime de votre application sont envoyées à l'Agent Datadog par le biais de DogStatsD sur le port `8125`. Veillez à ce que [DogStatsD soit activé pour l'Agent][2].
Si vous exécutez l'Agent en tant que conteneur, assurez-vous que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [est défini sur true][3] et que le port `8125` est ouvert sur l'Agent.
Dans Kubernetes, [associez le port DogstatsD à un port de host][4] ; dans ECS, [indiquez les flags pertinents dans la définition de votre tâche][5].

## Données collectées

Les métriques suivantes sont recueillies par défaut après l'activation des métriques runtime.

{{< get-metrics-from-git "node" >}}

Datadog fournit non seulement ces métriques sur votre page Service de l'APM, mais également un [dashboard de runtime Node par défaut][6] comportant les tags `service` et `runtime-id` appliqués à ces métriques.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: /fr/metrics/dogstatsd_metrics_submission/#setup
[3]: /fr/agent/docker/#dogstatsd-custom-metrics
[4]: /fr/developers/dogstatsd/?tab=kubernetes#agent
[5]: /fr/integrations/amazon_ecs/?tab=python#create-an-ecs-task
[6]: https://app.datadoghq.com/dash/integration/30269/node-runtime-metrics