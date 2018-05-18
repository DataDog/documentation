---
title: Log Graph
kind: documentation
description: "Construire des analyses grâce aux Log Graphs"
further_reading:
- link: "logs/processing"
  tag: "Documentation"
  text: Apprenez à traiter vos logs
- link: "logs/parsing"
  tag: "Documentation"
  text: En savoir plus sur le parsing
---

Basculez entre la liste des logs et le Log Graph en cliquant sur le bouton *Log Mode* :

{{< img src="logs/graph/log_graph_switch.png" alt="Log graph switch" responsive="true" popup="true" style="width:40%;">}}

## Requête Log Graph

Employez la requête afin de contrôler la visualisation dans le Log Graph :

1. Choisissez une [Mesure][1] ou [Facette][2] afin de construire un graphique. [Mesure][1] vous permet de choisir la fonction d'agrégation tandis que [Facette][2] affiche le compte unique.

    {{< img src="logs/graph/choose_measure_facet.png" alt="choose measure facet" responsive="true" popup="true" style="width:50%;">}}
2. Sélectionnez la fonction d'agrégation pour la [mesure][1] que vous voulez grapher :

    {{< img src="logs/graph/agg_function_log_graph.png" alt="aggregation function for Log Graph" responsive="true" popup="true" style="width:50%;">}}
3. Utilisez [Tag][1] ou [Facette][2] afin de diviser votre graphique.

    {{< img src="logs/graph/split_by_log_graph.png" alt="split by Log Graph" responsive="true" popup="true" style="width:50%;">}}

4. Choisissez d'afficher soit les valeurs *X* **haut** ou **bas** selon le [mesure][1] sélectionné.

    {{< img src="logs/graph/top_bottom_button.png" alt="top bottom button" responsive="true" popup="true" style="width:20%;">}}

## Visualisations

Choisissez un type de visualisation en utilisant le sélectionneur de graphique :

{{< img src="logs/graph/graph_selector.png" alt="Log Graph selector" responsive="true" popup="true" style="width:30%;">}}

Visualisations disponibles :

* [Timeseries](#timeseries)
* [Top Liste](#top-list)

### Timeseries

Visualisez l'évolution d'un seule [mesure][1] (ou une [facette][2] comprises d'un compte unique de valeurs) pour une période de temps donné, et (facultativement) divisé par une [facette][2] disponible.

La série chronologique suivante montre :
L'évolution des **top 5 chemins URL** selon le nombre des **IPs Client unique** pendant le mois dernier.

{{< img src="logs/graph/timeserie_example.png" alt="timeserie example" responsive="true" popup="true" style="width:90%;">}}

### Top Liste

Visualisez les top valeurs d'une [facette][2] selon le [mesure][1] choisi :

La série chronologique suivante montre :
L'évolution des **top 5 chemins URL** selon le nombre des **IPs Client unique** pendant le mois dernier.

{{< img src="logs/graph/top_list_example.png" alt="top list example" responsive="true" popup="true" style="width:90%;">}}

## Logs associés :

Sélectionnez ou cliquez sur une section du graphique pour zoomer dans le graphique ou voir la liste des logs correspondant à votre sélection :

{{< img src="logs/graph/view_logs.gif" alt="view logs" responsive="true" popup="true" style="width:80%;">}}

## Exporter :

{{< img src="logs/graph/export_button.png" alt="view logs button" responsive="true" popup="true" style="width:40%;">}}

Exportez vortre Log Graph :

* Afin de créez un nouveau [log monitor][4] :
  La requête de votre Log Graph est utilisée afin de créer la requête de Log Monitor.
* Dans un [Timeboard][5] existant :
    Cette fonctionnalité est en version bêta, [contactez notre équipe support][6] pour l'activer pour votre organisation.

## Dashboard 

**Cette fonctionnalité est en version bêta, [contactez notre équipe support][6] pour l'activer pour votre organisation.**

Utilisez le [widget Timeseries][7] pour afficher les Log graph directement dans vos [Dashboard][8].

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explore/#measures
[2]: /logs/explore/#facets
[3]: /getting_started/tagging
[4]: /monitors/monitor_types/log
[5]: /graphing/dashboards/timeboard
[6]: /help
[7]: /graphing/dashboards/widgets/#timeseries
[8]: /graphing/dashboards