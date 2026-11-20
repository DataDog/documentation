---
aliases:
- /fr/graphing/correlations/
- /fr/dashboards/correlations/
description: Trouver les causes racines potentielles en découvrant les métriques avec
  un comportement irrégulier qui sont corrélées aux problèmes observés.
further_reading:
- link: /dashboards/
  tag: Documentation
  text: Dashboards Datadog
- link: /notebooks/
  tag: Documentation
  text: Notebooks Datadog
- link: /tracing/services/service_page/
  tag: Documentation
  text: Page Service APM
- link: /watchdog/
  tag: Documentation
  text: Watchdog
- link: https://www.datadoghq.com/blog/ai-powered-metrics-monitoring/
  tag: Blog
  text: Détection d'anomalies, corrélations prédictives - Utilisation de la surveillance
    des métriques assistée par IA
- link: https://www.datadoghq.com/blog/slo-synthetic-monitoring/
  tag: Blog
  text: Améliorer la précision et les performances des SLO avec Datadog Synthetic
    Monitoring
title: Corrélation de métriques
---

## Présentation

<div class="alert alert-info">Les corrélations de métriques sont disponibles pour les <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">widgets Série temporelle</a> configurés avec la source de données <strong>Metric</strong>.</div>

Les corrélations de métriques vous aident à identifier les causes potentielles d'un problème en recherchant d'autres métriques affichant un comportement anormal dans la même période. Les corrélations examinent vos métriques issues de différentes sources, telles que les dashboards, les intégrations, l'APM et les métriques custom.

## Find correlated metrics

Vous pouvez commencer à explorer vos corrélations de métriques depuis n'importe quelle page de dashboards, des notebooks, de l'APM, des alertes Watchdog ou de statut des monitors.

* Cliquez sur n'importe quel graphique et sélectionnez **Find correlated metrics**.
* Depuis un graphique affiché en plein écran, cliquez sur l'onglet **Correlations**.

{{< img src="dashboards/correlations/find_correlated_metrics.png" alt="Option Find correlated metrics du menu d'un graphique de dashboard" style="width:80%;">}}

{{< img src="dashboards/correlations/correlations_tab.png" alt="Recherche depuis un dashboard" style="width:80%;">}}

Les corrélations **tentent** de détecter automatiquement la zone d'intérêt (à savoir, la zone de comportement anormal) de votre métrique. Si la zone d'intérêt n'est pas sélectionnée automatiquement, ou si elle doit être ajustée, dessinez manuellement la zone d'intérêt via l'option [Edit Search](#modifier-des-correlations).

**Remarque** : les recherches de corrélations sont disponibles pour une seule métrique. Pour les graphiques représentant plusieurs métriques, sélectionnez la série qui vous intéresse. Depuis un graphique affiché en plein écran, sélectionnez une série dans la légende du graphique, puis cliquez sur l'onglet **Correlations**.

## Personnaliser votre recherche

Vous pouvez personnaliser les paramètres de recherche par défaut des corrélations. Depuis un graphique affiché en plein écran, accédez à l'onglet *Correlations*, puis cliquez sur le bouton **Edit Search** ou cliquez directement sur le graphique.

1. Cliquez et faites glisser sur le graphique pour définir la plage temporelle de votre recherche de corrélations.
1. Définissez les sources à utiliser pour la recherche de corrélations (services APM, intégrations, dashboards ou métriques custom).
1. Sélectionnez **Auto-select** ou **Custom select** dans des catégories spécifiques. Pour les métriques custom, au moins une sélection est requise.
   * La seule catégorie qui n'est pas sélectionné par défaut est celle des métriques custom. Choisissez les espaces de nommage de métriques ou les métriques uniques à utiliser pour votre recherche de corrélations.
1. Utilisez la zone de filtre de tag pour limiter la recherche à un tag précis.

Une liste de résultats s'affiche sous le graphique de recherche, avec les éléments suivants :

* **Type** : un graphique représentant le type de source (service APM, intégration, dashboard ou métrique custom).
* **Source** : le nom de la source pour les métriques corrélées.
* **Correlations** : le nombre de métriques corrélées trouvées.
* **Preview** : un graphique de prévisualisation des métriques corrélées.

{{< img src="dashboards/correlations/search_results.png" alt="Résultats de recherche" style="width:80%;">}}

Au fur et à mesure du chargement des résultats, vous pouvez explorer les détails sans attendre tous les résultats.

## Analyser les résultats

Depuis la [liste des résultats](#resultats), sélectionnez une ligne afin d'étudier les détails de la corrélation en question.

* Comme pour les dashboards, passez la souris sur un graphique pour créer sur tous les autres graphiques une ligne indiquant les données pour la même heure.
* Pour visualiser l'ensemble des sources, supprimez le filtre dans le menu.
* Cliquez sur le nom d'une source de métrique pour y accéder. Par exemple, le nom d'un dashboard renvoie au dashboard concerné.
* Utilisez l'icône d'exportation pour exporter le graphique vers un dashboard ou un notebook, ou pour copier la requête.

{{< img src="dashboards/correlations/correlated_metric_source_details.png" alt="Vue détaillée de la source de métriques corrélées" style="width:90%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}