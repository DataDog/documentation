---
description: Apprenez à utiliser le processeur Filter pour envoyer uniquement les
  logs, métriques ou traces qui correspondent à une requête de filtrage à l'étape
  suivante du pipeline.
disable_toc: false
further_reading:
- link: /getting_started/search/
  tag: Documentation
  text: Bien démarrer avec la recherche en texte intégral dans Datadog
- link: /logs/explorer/search_syntax/
  tag: Documentation
  text: Syntaxe de recherche pour Log Management
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: Métriques
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Processeur Filter
---
{{< product-availability >}}

## Présentation {#overview}

Ce processeur envoie tous les logs ou métriques qui correspondent à la requête de filtrage à l'étape suivante du pipeline. Les événements qui ne correspondent pas à la requête de filtrage sont supprimés et ne sont envoyés à aucun processeur ou destination ultérieurs.

**Remarque** : Pour toutes les autres requêtes de processeur, les événements qui ne correspondent pas à la requête sont envoyés à l'étape suivante du pipeline. Ils ne sont pas supprimés.

## Configuration {#setup}

Pour configurer le processeur de filtre :

- Définissez un {{< ui >}}filter query{{< /ui >}}. Consultez [Syntaxe de recherche de logs][1] ou [Syntaxe de recherche de métriques][2] pour plus d'informations.
  - Les événements qui correspondent à la requête sont envoyés au composant suivant.
  - Les événements qui ne correspondent pas à la requête sont supprimés.

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][3] et les [métriques de tampon de processeur][4] émises par tous les processeurs, consultez la documentation sur les [Métriques d'utilisation des pipelines][5]. Pour filtrer ou regrouper les métriques du processeur Filter, utilisez le tag `component_type:opw_filter`.

[1]: /fr/observability_pipelines/search_syntax/logs
[2]: /fr/observability_pipelines/search_syntax/metrics
[3]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[4]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[5]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}