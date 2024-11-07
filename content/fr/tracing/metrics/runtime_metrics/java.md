---
aliases:
- /fr/tracing/runtime_metrics/java
code_lang: java
code_lang_weight: 10
description: Consultez des statistiques supplémentaires sur les performances de votre
  application Java grâce aux métriques runtime associées à vos traces.
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: Documentation
  text: Associer vos logs à vos traces
- link: tracing/trace_collection/custom_instrumentation
  tag: Documentation
  text: Instrumenter vos applications manuellement pour créer des traces
- link: tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
title: Métriques runtime Java
type: multi-code-lang
---

## Configuration automatique

La collecte de métriques JVM est activée par défaut pour le traceur Java v0.29.0+. Elle peut être désactivée en définissant un paramètre de configuration dans le client de tracing, soit via la propriété système `-Ddd.jmxfetch.enabled=false`, soit via la variable d'environnement `DD_JMXFETCH_ENABLED=false`. Depuis la version 0.64.0, vous pouvez également utiliser la variable d'environnement `DD_RUNTIME_METRICS_ENABLED=false` pour désactiver la collecte.

Les métriques JVM peuvent être visualisées conjointement à vos services Java. Consultez la [page Service][1] dans Datadog.

{{< img src="tracing/runtime_metrics/jvm-runtime.png" alt="Runtime JVM" >}}

Par défaut, les métriques runtime de votre application sont envoyées à l'Agent Datadog via DogStatsD sur le port `8125`. Vérifiez que [DogStatsD est activé pour l'Agent][2].

Si vous exécutez l'Agent en tant que conteneur, vérifiez que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [est définie sur true][3] et que le port `8125` est ouvert sur l'Agent. En outre, pour :

- **Kubernetes** : vous _devez_ [lier le port DogStatsD au port d'un host][4].
- **ECS** : [définissez les flags adéquats dans la définition de votre tâche][5].

**Remarques** :

- Pour l'IU de runtime, `dd-trace-java` >= [`0.24.0`][6] est pris en charge.
- Pour associer des métriques JVM dans des graphiques de performances, veillez à ce que `env: tag` (sensible à la casse) soit défini et corresponde sur l'ensemble de votre environnement.
- Pour que les métriques JVM s'affichent sur la page Service lorsque vous utilisez Fargate, vérifiez que `DD_DOGSTATSD_TAGS` est défini sur la tâche de votre Agent et qu'il a pour valeur le `env: tag` de ce service.

## Données collectées

Les métriques suivantes sont recueillies par défaut pour chaque process JVM après l'activation des métriques JVM.

{{< get-metrics-from-git "java" >}}

Datadog fournit non seulement ces métriques sur votre page Service de l'APM, mais également un [dashboard de runtime JVM par défaut][7].

En outre, vous pouvez ajouter des métriques JMX à l'aide de fichiers de configuration qui sont transmis à `dd.jmxfetch.config.dir` et `dd.jmxfetch.config`. Il est également possible d'activer chaque intégration JMX de Datadog à l'aide du paramètre `dd.jmxfetch.<NOM_INTÉGRATION>.enabled=true`. Cela intègre automatiquement la configuration des [fichiers de configuration JMX existants][8] de Datadog. Consultez la section relative à l'[intégration JMX][9] pour en savoir plus sur la configuration.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: /fr/developers/dogstatsd/#setup
[3]: /fr/agent/docker/#dogstatsd-custom-metrics
[4]: /fr/developers/dogstatsd/?tab=kubernetes#agent
[5]: /fr/agent/amazon_ecs/#create-an-ecs-task
[6]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.0
[7]: https://app.datadoghq.com/dash/integration/256/jvm-runtime-metrics
[8]: https://github.com/DataDog/integrations-core/search?q=jmx_metrics&unscoped_q=jmx_metrics
[9]: /fr/integrations/java/#configuration