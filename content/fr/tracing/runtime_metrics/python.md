---
title: Métriques runtime Python
kind: documentation
description: Consultez des statistiques supplémentaires sur les performances de votre application Python grâce aux métriques runtime associées à vos traces.
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

Il est possible d'activer la collecte de métriques runtime avec le paramètre d'environnement `DD_RUNTIME_METRICS_ENABLED=true` pour une exécution avec `ddtrace-run` :

Les métriques runtime peuvent être visualisées conjointement à vos services Python. Consultez la [page Service][1] dans Datadog.

**Remarque** : pour l'IU de runtime, `ddtrace` >= [`0.24.0`][2] est pris en charge.

Par défaut, les métriques runtime de votre application sont envoyées à l'Agent Datadog par le biais de DogStatsD sur le port `8125`. Veillez à ce que [DogStatsD soit activé pour l'Agent][3].
Si vous exécutez l'Agent en tant que conteneur, assurez-vous que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [est défini sur true][4] et que le port `8125` est ouvert sur l'Agent.
Dans Kubernetes, [associez le port DogstatsD à un port de host][5] ; dans ECS, [indiquez les flags pertinents dans la définition de votre tâche][6].

## Données collectées

Les métriques suivantes sont recueillies par défaut après l'activation des métriques runtime :

{{< get-metrics-from-git "python" >}}

Datadog fournit non seulement ces métriques sur votre page Service de l'APM, mais également un [dashboard de métriqu de runtime Python par défaut][7] comportant les tags `service` et `runtime-id` appliqués à ces métriques.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.24.0
[3]: /fr/metrics/dogstatsd_metrics_submission/#setup
[4]: /fr/agent/docker/#dogstatsd-custom-metrics
[5]: /fr/developers/dogstatsd/?tab=kubernetes#agent
[6]: /fr/integrations/amazon_ecs/?tab=python#create-an-ecs-task
[7]: https://app.datadoghq.com/dash/integration/30267/python-runtime-metrics