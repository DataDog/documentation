---
title: Analyses de logs
kind: documentation
description: Construire des analyses de log
aliases:
  - /fr/logs/graph
  - /fr/logs/analytics
further_reading:
  - link: logs/processing
    tag: Documentation
    text: Découvrir comment traiter vos logs
  - link: logs/processing/parsing
    tag: Documentation
    text: En savoir plus sur le parsing
  - link: logs/explorer
    tag: Documentation
    text: Apprenez à explorer vos logs
---
Basculez entre les modes Liste des logs et Analyse de logs en cliquant sur le bouton *Log Mode* :

{{< img src="logs/explorer/analytics/log_graph_switch.png" alt="Log Analytics switch" responsive="true" style="width:40%;">}}

## Requête d'analyse des logs

Employez la requête afin de contrôler la visualisation dans le Log Graph :

1. Choisissez une [mesure][1] ou une [facette][2] à représenter sous forme de graphique. Une [mesure][1] vous permet de choisir une fonction d'agrégation tandis qu'une [facette][18] affiche le nombre de valeurs uniques.

    {{< img src="logs/explorer/analytics/choose_measure_facet.png" alt="choose measure facet" responsive="true" style="width:50%;">}}
2. Sélectionnez la fonction d'agrégation pour la [mesure][21] que vous souhaitez représenter :

    {{< img src="logs/explorer/analytics/agg_function_log_graph.png" alt="aggregation function for Log Analytics" responsive="true" style="width:50%;">}}

3. Utilisez un [Tag][1] ou une [Facette][2] afin de diviser votre graphique.

    {{< img src="logs/explorer/analytics/split_by_log_graph.png" alt="split by Log Analytics" responsive="true" style="width:50%;">}}

4. Choisissez d'afficher soit les *X* valeurs les plus **élevées** ou **faibles** selon la [mesure][1] sélectionnée.

    {{< img src="logs/explorer/analytics/top_bottom_button.png" alt="top bottom button" responsive="true" style="width:20%;">}}

5. Choisissez les Timesteps du graphique.
  La modification de l'intervalle de temps global modifie la liste des intervalles disponibles.

    {{< img src="logs/explorer/analytics/timesteps.png" alt="Timestep" responsive="true" style="width:30%;">}}


## Visualisations

Sélectionnez un type de visualisation d'analyse des logs à l'aide du sélecteur de graphique :

{{< img src="logs/explorer/analytics/graph_selector.png" alt="Log Analytics selector" responsive="true" style="width:30%;">}}

Visualisations disponibles :

* [Timeseries](#timeseries)
* [Top List](#top-list)

### Timeseries

Visualisez l'évolution d'une seule [mesure][1] (ou d'une [facette][2] correspondant à un nombre unique de valeurs) pour une période de temps donné, et (facultativement) divisé par une [facette][2] disponible.

Le graphique Timeseries suivant montre :
L'évolution des **5 premiers chemins URL** selon le nombre d'adresses **IP client uniques** au cours du mois dernier.

{{< img src="logs/explorer/analytics/timeserie_example.png" alt="timeserie example" responsive="true" style="width:90%;">}}

### Top List 

Visualisez les valeurs les plus élevées d'une [facette][2] selon la [mesure][1] choisie :

Le graphique Top List suivant montre :
L'évolution des **5 premiers chemins URL** selon le nombre d'adresses **IP client uniques** au cours du dernier mois.

{{< img src="logs/explorer/analytics/top_list_example.png" alt="top list example" responsive="true" style="width:90%;">}}

## Logs associés

Sélectionnez ou cliquez sur une section du graphique pour zoomer dans le graphique ou voir la liste des logs correspondant à votre sélection :

{{< img src="logs/explorer/analytics/view_logs.gif" alt="view logs" responsive="true" style="width:80%;">}}

## Exporter

{{< img src="logs/explorer/analytics/export_button.png" alt="view logs button" responsive="true" style="width:40%;">}}

Exportez vos analyses de logs :

* Afin de créer un nouveau [monitor de log][4] :
  La requête de votre analyse de logs est utilisée pour créer la requête du monitor de logs.
* Dans un [Timeboard][5] existant :
    Cette fonctionnalité est en version bêta, [contactez notre équipe de support][6] afin de l'activer pour votre organisation.

## Logs dans le dashboard

**Cette fonctionnalité est en version bêta, [contactez notre équipe de support][6] afin de l'activer pour votre organisation.**

Exportez vos [analyses de logs][7] depuis l'explorateur de logs ou créez-les directement dans votre [Dashboard][8] avec des métriques et des traces.

{{< img src="logs/explorer/analytics/log_graph_in_dashboard.png" alt="Log Analytics in dashboard" responsive="true" style="width:90%;">}}

Tout comme dans l'explorateur de logs, cliquez sur n'importe quel graphique dans votre dashboard pour accéder aux [logs les plus proches][9].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/?tab=measures#setup
[2]: /logs/explorer/?tab=facets#setup
[3]: /tagging
[4]: /monitors/monitor_types/log
[5]: /graphing/dashboards/timeboard
[6]: /help
[7]: /graphing/dashboards/widgets/#timeseries
[8]: /graphing/dashboards
[9]: https://docs.datadoghq.com/graphing/dashboards/#correlation-between-logs-and-metrics