---
title: Métriques runtime Go
kind: documentation
description: Consultez des statistiques supplémentaires sur les performances de votre application Go grâce aux métriques runtime associées à vos traces.
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
    text: Explorer vos services, ressources et traces
---
## Configuration automatique

Pour activer la collecte de métriques runtime Go, lancez le traceur à l'aide de l'option `WithRuntimeMetrics` :

```go
tracer.Start(tracer.WithRuntimeMetrics())
```

Visualisez conjointement vos métriques runtime avec vos services Go. Pour ce faire, consultez la [page Service][1] dans Datadog.

Par défaut, les métriques runtime provenant de votre application sont envoyées toutes les 10 secondes à l'Agent Datadog via DogStatsD, sur le port `8125`. Assurez-vous que [DogStatsD est activé pour l'Agent][2]. Si l'adresse de DogStatsD pour l'Agent Datadog ne correspond pas à `localhost:8125`, utilisez l'option `WithDogstatsdAddress` ou les variables d'environnement `DD_AGENT_HOST` et `DD_DOGSTATSD_PORT`.

Si vous exécutez l'Agent en tant que conteneur, vérifiez que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [est définie sur true][3] et que le port `8125` est ouvert sur l'Agent. En outre, pour :

- **Kubernetes** : vous _devez_ [lier le port DogStatsD au port d'un host][4].
- **ECS** : [définissez les flags adéquats dans la définition de votre tâche][5].

## Données collectées

Les métriques suivantes sont recueillies par défaut après l'activation des métriques Go.

{{< get-metrics-from-git "go" >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: /fr/developers/dogstatsd/#setup
[3]: /fr/agent/docker/#dogstatsd-custom-metrics
[4]: /fr/developers/dogstatsd/?tab=kubernetes#agent
[5]: /fr/integrations/amazon_ecs/#create-an-ecs-task