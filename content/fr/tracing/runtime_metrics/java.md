---
title: Métriques runtime Java
kind: documentation
description: Consultez des statistiques supplémentaires sur les performances de votre application Java grâce aux métriques runtime associées à vos traces.
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
## Configuration automatique

La collecte de métriques JVM est activée par défaut pour le traceur Java v0.29.0+. Elle peut être désactivée en définissant un paramètre de configuration dans le client de tracing, soit via la propriété système `-Ddd.jmxfetch.enabled=false`, soit via la variable d'environnement `DD_JMXFETCH_ENABLED=false`.

Les métriques JVM peuvent être visualisées conjointement à vos services Java. Consultez la [page Service][1] dans Datadog.

{{< img src="tracing/runtime_metrics/jvm-runtime.png" alt="Runtime JVM"  >}}

Par défaut, les métriques runtime de votre application sont envoyées à l'Agent Datadog via DogStatsD sur le port `8125`. Vérifiez que [DogStatsD est activé pour l'Agent][2].

Si vous exécutez l'Agent en tant que conteneur, vérifiez que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [est définie sur true][3] et que le port `8125` est ouvert sur l'Agent. En outre, pour :

- **Kubernetes** : vous _devez_ [associer le port DogStatsD à un port du host][4].
- **ECS** : [définissez les flags adéquats dans la définition de votre tâche][5].

**Remarques :**

- Pour l'IU de runtime, `dd-trace-java` >= [`0.24.0`][6] est pris en charge.
- Pour associer des métriques JVM dans des graphiques de performances, veillez à ce que `env: tag` (sensible à la casse) soit défini et corresponde sur l'ensemble de votre environnement.

## Données collectées

Les métriques suivantes sont recueillies par défaut après l'activation des métriques JVM.

{{< get-metrics-from-git "java" >}}

Datadog fournit non seulement ces métriques sur votre page Service de l'APM, mais également un [dashboard de runtime JVM par défaut][7] comportant les tags `service` et `runtime-id` appliqués à ces métriques.

En outre, vous pouvez ajouter des métriques JMX à l'aide de fichiers de configuration qui sont transmis à `dd.jmxfetch.config.dir` et `dd.jmxfetch.config`. Il est également possible d'activer chaque intégration JMX de Datadog à l'aide du paramètre `dd.jmxfetch.<NOM_INTÉGRATION>.enabled=true`. Cela intègre automatiquement la configuration des [fichiers de configuration JMX existants][8] de Datadog. Consultez la section relative à l'[intégration JMX][9] pour en savoir plus sur la configuration.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: /fr/developers/dogstatsd/#setup
[3]: /fr/agent/docker/#dogstatsd-custom-metrics
[4]: /fr/developers/dogstatsd/?tab=kubernetes#agent
[5]: /fr/integrations/amazon_ecs/?tab=python#create-an-ecs-task
[6]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.0
[7]: https://app.datadoghq.com/dash/integration/256/jvm-runtime-metrics
[8]: https://github.com/DataDog/integrations-core/search?q=jmx_metrics&unscoped_q=jmx_metrics
[9]: /fr/integrations/java/#configuration