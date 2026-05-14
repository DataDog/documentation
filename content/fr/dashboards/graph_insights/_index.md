---
description: Découvrez les causes racines potentielles en utilisant les corrélations
  de métriques et Watchdog Explains pour analyser le comportement irrégulier des métriques.
disable_toc: false
further_reading:
- link: /watchdog/insights/
  tag: Documentation
  text: En savoir plus sur Watchdog Insights
- link: https://www.datadoghq.com/blog/ai-powered-metrics-monitoring/
  tag: Blog
  text: Détection d'anomalies, corrélations prédictives - Utilisation de la surveillance
    des métriques assistée par IA
title: Informations sur les graphiques
---

## Présentation

Les informations sur les graphiques peuvent vous aider à trouver les causes racines potentielles d'un problème observé en recherchant d'autres métriques qui ont présenté un comportement irrégulier à peu près au même moment. Les corrélations de métriques analysent vos métriques provenant de différentes sources, telles que les dashboards, les intégrations, Datadog APM et les métriques custom.

## Corrélation de métriques

<div class="alert alert-info">Les corrélations de métriques sont disponibles pour les <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">widgets Série temporelle</a> configurés avec la source de données <strong>Metric</strong>.</div>

Pour cibler la recherche plus efficacement, les corrélations de métriques utilisent des informations sur les dashboards et services associés. Les corrélations peuvent passer au crible les métriques de diverses sources, notamment Datadog APM, les intégrations et les dashboards, ainsi que les espaces de noms de métriques arbitraires que vous sélectionnez. Elles recherchent des irrégularités dans d'autres métriques sur la période correspondante, permettant à Datadog de fournir automatiquement des indices qui facilitent une analyse des causes racines plus efficace.

Pour en savoir plus, consultez la section [Corrélations de métriques][1].

## Watchdog explique

<div class="alert alert-info">Watchdog Explains est disponible pour les <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">widgets de séries temporelles</a> avec la source de données <strong>Metric</strong>.</div>

Datadog collecte divers types de données pour fournir des informations sur les performances des applications, notamment des métriques, des traces et des logs, qui vous indiquent ce qui se passe, comment et pourquoi. Watchdog Explains analyse les tendances de haut niveau telles que la latence, les taux d'erreur ou l'évolution du nombre de requêtes pour détecter les signaux critiques. Lors de l'observation d'un pic dans ces graphiques, Watchdog Explains vous aide à investiguer les questions immédiates :
- Quelle est la source du pic ?
- Cette anomalie affecte-t-elle tout le monde ou s'agit-il d'un incident isolé ?

Pour en savoir plus, consultez la section [Watchdog Explains][2].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/graph_insights/correlations/
[2]: /fr/dashboards/graph_insights/watchdog_explains/