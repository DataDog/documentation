---
title: Analyse de traces
kind: documentation
description: Analyse des données de votre APM avec une cardinalité infinie
aliases:
  - /fr/tracing/trace_search_analytics/analytics
  - /fr/tracing/analytics
  - /fr/tracing/visualization/analytics
further_reading:
  - link: tracing/setup/
    tag: Documentation
    text: Découvrir comment configurer le tracing d'APM avec votre application
  - link: tracing/visualization/services_list/
    tag: Documentation
    text: Découvrir la liste des services transmettant des données à Datadog
  - link: tracing/visualization/service
    tag: Documentation
    text: En savoir plus sur les services dans Datadog
  - link: tracing/visualization/resource
    tag: Documentation
    text: Plonger au cœur des traces et des performances de vos ressources
  - link: tracing/visualization/trace
    tag: Documentation
    text: Comprendre comment lire une trace Datadog
  - link: tracing/trace_search_and_analytics/search
    tag: Documentation
    text: Recherche globale sur toutes vos traces avec des tags
---
Passez du mode de recherche de traces au mode d'analyse de traces en cliquant sur le bouton *Trace Mode* :

{{< img src="tracing/trace_search_and_analytics/analytics/switch_analytics.png" alt="Changement d'analyse" responsive="true" style="width:40%;">}}

## Requête d'analyse de traces

Utilisez la requête pour contrôler ce qui s'affiche dans votre analyse de traces :

1. Choisissez la métrique `Duration` ou une [facette][1] à analyser. La sélection de la métrique `Duration` vous permet de choisir la fonction d'agrégation, tandis que la [facette][1] affiche le nombre de valeurs uniques.

    {{< img src="tracing/trace_search_and_analytics/analytics/choose_measure_facet.png" alt="choisir mesure ou facette" responsive="true" style="width:50%;">}}

2. Sélectionnez la fonction d'agrégation pour la métrique `Duration` :

   {{< img src="tracing/trace_search_and_analytics/analytics/agg_function.png" alt="fonction d'agrégation" responsive="true" style="width:50%;">}}

3. Utilisez un [tag][2] ou une [facette][1] pour fractionner votre analyse.

    {{< img src="tracing/trace_search_and_analytics/analytics/split_by.png" alt="fractionnement" responsive="true" style="width:50%;">}}

4. Choisissez d'afficher les *X* valeurs les plus **élevées** ou **faibles** en fonction de la [facette][1] ou de la `Duration` sélectionnée.

    {{< img src="tracing/trace_search_and_analytics/analytics/top_bottom_button.png" alt="bouton top/bottom" responsive="true" style="width:20%;">}}

5. Sélectionnez les laps de temps de l'analyse.
  Si vous changez l'intervalle global, cela modifie la liste des valeurs de laps de temps disponibles.

    {{< img src="tracing/trace_search_and_analytics/analytics/timesteps.png" alt="Laps de temps" responsive="true" style="width:30%;">}}

## Visualisations

Sélectionnez un type de visualisation d'analyse de traces à l'aide du sélecteur d'analyse :

{{< img src="tracing/trace_search_and_analytics/analytics/graph_selector.png" alt="Sélecteur de graphique" responsive="true" style="width:30%;">}}

Visualisations disponibles :

* [Timeseries (Série temporelle)](#timeseries)
* [Top List (Valeurs les plus élevées)](#top-list)

### Série temporelle

Visualisez l'évolution de la métrique `Duration` (ou d'une [facette][1] correspondant à un nombre unique de valeurs) pour un intervalle donné. Vous pouvez également fractionner le graphique en utilisant une [facette][1] disponible.

L'analyse de traces avec une série temporelle suivante illustre : l'évolution de la **durée** de **pc99** (99e centile) toutes les **5 minutes** pour chaque **service**.

{{< img src="tracing/trace_search_and_analytics/analytics/timeserie_example.png" alt="exemple de série temporelle" responsive="true" style="width:90%;">}}

### Top List

Visualisez les valeurs les plus élevées d'une [facette][1] en fonction de leur métrique `Duration` (ou d'une [facette][1] correspondant à un nombre unique de valeurs) :

L'analyse de traces suivante avec une Top List illustre :
la **durée** de **pc99** (99e centile) la plus élevée d'un **service**

{{< img src="tracing/trace_search_and_analytics/analytics/top_list_example.png" alt="exemple de top list" responsive="true" style="width:90%;">}}

### Table (Tableau)

Visualisez les valeurs les plus élevées d'une [facette][1] en fonction de la [mesure][2] choisie (la première mesure que vous choisissez dans la liste), et affichez la valeur des autres mesures pour les éléments qui s'affichent en haut. Mettez à jour la requête de recherche ou explorez les traces correspondant à l'une des dimensions.

L'analyse de logs avec un tableau suivante illustre :
l'évolution des **10 premiers services** en fonction de leur **durée**, avec leur **débit** moyen au cours des 15 dernières minutes.

{{< img src="tracing/trace_search_and_analytics/analytics/trace_table_example.png" alt="exemple de top list" responsive="true" style="width:90%;">}}

## Traces associées

Sélectionnez une section du graphique ou cliquez dessus pour l'agrandir ou consulter la liste des traces correspondant à votre sélection :

{{< img src="tracing/trace_search_and_analytics/analytics/view_traces.png" alt="afficher les traces" responsive="true" style="width:40%;">}}

## Exportation

{{< img src="tracing/trace_search_and_analytics/analytics/export_button.png" alt="Bouton d'exportation de votre analyse" responsive="true" style="width:40%;">}}

Exportez votre analyse de traces :

* Pour créer un [monitor d'APM ][3] :
    Cette fonctionnalité n'est pas encore disponible.
* Vers un [timeboard][4] existant :
    Cette fonctionnalité est en version bêta. [Contactez l'assistance Datadog][5] afin de l'activer pour votre organisation.

## Traces dans les dashboards

Exportez les [analyses de traces][6] de la recherche de traces ou créez-les directement dans votre [dashboard][7] aux côtés des métriques et des logs.

[En savoir plus sur le widget des séries temporelles][8]

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_search_and_analytics/search/#facets
[2]: /fr/tracing/trace_search_and_analytics/search/#measures
[3]: /fr/monitors/monitor_types/apm
[4]: /fr/graphing/dashboards/timeboard
[5]: /fr/help
[6]: /fr/graphing/widgets/timeseries
[7]: /fr/graphing/dashboards
[8]: /fr/graphing/widgets/timeseries