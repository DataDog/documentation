---
description: Découvrez des causes profondes potentielles en utilisant Metric Correlations,
  Watchdog Explains et la détection d'anomalies dans les dashboards pour analyser
  le comportement irrégulier des métriques.
disable_toc: false
further_reading:
- link: /watchdog/insights/
  tag: Documentation
  text: En savoir plus sur Watchdog Insights
- link: https://www.datadoghq.com/blog/ai-powered-metrics-monitoring/
  tag: Blog
  text: Détection d'anomalies, corrélations prédictives - Utilisation de la surveillance
    des métriques assistée par IA
title: Graph Insights
---
## Présentation {#overview}

Graph Insights peut vous aider à trouver des causes profondes potentielles pour un problème observé en recherchant d'autres métriques ayant présenté un comportement irrégulier à peu près au même moment. Metric Correlations analyse vos métriques provenant de différentes sources, telles que les dashboards, les intégrations, l'APM et les métriques personnalisées.

## Metric Correlations {#metric-correlations}

<div class="alert alert-info">Metric Correlations est disponible pour les <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">widgets Timeseries</a> avec la source de données <strong>Metric</strong>.</div>

Pour cibler la recherche plus efficacement, Metric Correlations utilise des informations sur les dashboards et les services associés. Les corrélations peuvent passer au crible les métriques provenant de diverses sources, notamment l'APM, les intégrations et les dashboards, ainsi que les espaces de noms de métriques arbitraires que vous sélectionnez. Il recherche des irrégularités dans d'autres métriques sur la période correspondante, permettant à Datadog de fournir automatiquement des indices qui facilitent une analyse plus efficace des causes profondes.

Pour plus d'informations, consultez la documentation [Metric Correlations][1].

## Watchdog Explains {#watchdog-explains}

<div class="alert alert-info">Watchdog Explains est disponible pour les <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">widgets Timeseries</a> avec la source de données <strong>Metric</strong>.</div>

Datadog collecte divers types de données pour fournir des informations sur les performances des applications, notamment des métriques, des traces et des logs, qui vous indiquent ce qui se passe, comment et pourquoi. Watchdog Explains analyse les tendances de haut niveau telles que la latence, les taux d'erreur ou l'évolution du nombre de requêtes pour détecter les signaux critiques. Lorsqu'il observe un pic dans ces graphiques, Watchdog Explains vous aide à examiner les questions immédiates :
- Quelle est la source du pic ?
- Cette anomalie affecte-t-elle tout le monde ou s'agit-il d'un incident isolé ?

Pour plus d'informations, consultez la documentation [Watchdog Explains][2].

## Détection d'anomalies dans le dashboard {#dashboard-anomaly-detection}

<div class="alert alert-info">La détection d'anomalies est disponible pour les <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">widgets Timeseries</a> avec la source de données <strong>Metric</strong>.</div>

Datadog détecte les anomalies sur les graphiques de votre dashboard et regroupe celles qui surviennent simultanément en incidents. Pour chaque incident, Datadog identifie les tags qui contribuent le plus à l'anomalie. Vous pouvez analyser un graphique unique avec Watchdog Explains, ou déléguer l'analyse des causes profondes à Bits Investigation.

Pour plus d'informations, consultez [Investigate Dashboard Anomalies][3].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/graph_insights/correlations/
[2]: /fr/dashboards/graph_insights/watchdog_explains/
[3]: /fr/dashboards/graph_insights/investigate_anomalies/