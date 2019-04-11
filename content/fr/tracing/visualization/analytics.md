---
title: Analyse de traces
kind: Documentation
description: Analyse des données de votre APM avec une cardinalité infinie
aliases:
  - /fr/tracing/trace_search_analytics/analytics
  - /fr/tracing/analytics
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
  - link: tracing/visualization/search
    tag: Documentation
    text: Recherche globale sur toutes vos traces avec des tags
---
Passez du mode de recherche de traces au mode d'analyse de traces en cliquant sur le bouton *Trace Mode* :

{{< img src="tracing/visualization/analytics/switch_analytics.png" alt="Changement d'analyse" responsive="true" style="width:40%;">}}

## Requête d'analyse de traces

Utilisez la requête pour contrôler ce qui s'affiche dans votre analyse de traces :

1. Choisissez une [mesure][1] ou une [facette][2] à analyser. Les [mesures][1] vous permettent de choisir une fonction d'agrégation, tandis que les [facettes][2] affichent le nombre de valeurs uniques.

    {{< img src="tracing/visualization/analytics/choose_measure_facet.png" alt="choisir mesure ou facette" responsive="true" style="width:50%;">}}

2. Sélectionnez la fonction d'agrégation pour la [mesure][1] que vous souhaitez représenter :

    {{< img src="tracing/visualization/analytics/agg_function.png" alt="fonction d'agrégation" responsive="true" style="width:50%;">}}

3. Utilisez un [tag][1] ou une [facette][2] pour fractionner votre analyse.  

    {{< img src="tracing/visualization/analytics/split_by.png" alt="fractionnement" responsive="true" style="width:50%;">}}

4. Choisissez d'afficher les *X* valeurs les plus **élevées** ou **faibles** en fonction de la [mesure][1] sélectionnée.

    {{< img src="tracing/visualization/analytics/top_bottom_button.png" alt="bouton top/bottom" responsive="true" style="width:20%;">}}

5. Sélectionnez les laps de temps de l'analyse.
  Si vous changez l'intervalle global, cela modifie la liste des valeurs de laps de temps disponibles.

    {{< img src="tracing/visualization/analytics/timesteps.png" alt="Laps de temps" responsive="true" style="width:30%;">}}

## Visualisations

Sélectionnez un type de visualisation d'analyse de traces à l'aide du sélecteur d'analyse :

{{< img src="tracing/visualization/analytics/graph_selector.png" alt="Sélecteur de graphique" responsive="true" style="width:30%;">}}

Visualisations disponibles :

* [Séries temporelles](#timeseries)
* [Top List](#top-list)

### Séries temporelles

Visualisez l'évolution d'une seule [mesure][1] (ou d'une [facette][2] correspondant à un nombre unique de valeurs) pour un intervalle donné. Vous pouvez également fractionner le graphique en utilisant une [facette][2] disponible.

L'analyse de traces avec une série temporelle suivante illustre :
l'évolution de la **durée** de **pc99** toutes les **5 minutes** pour chaque **service**.

{{< img src="tracing/visualization/analytics/timeserie_example.png" alt="exemple de série temporelle" responsive="true" style="width:90%;">}}

### Top List 

Visualisez les valeurs les plus élevées d'une [facette][2] en fonction de la [mesure][1] choisie :

L'analyse de traces suivante avec une Top List illustre :
la **durée** de **pc99** la plus élevée d'un **service**.

{{< img src="tracing/visualization/analytics/top_list_example.png" alt="exemple de top list" responsive="true" style="width:90%;">}}

## Traces associées

Sélectionnez une section du graphique ou cliquez dessus pour l'agrandir ou consulter la liste des traces correspondant à votre sélection :

{{< img src="tracing/visualization/analytics/view_traces.png" alt="afficher les traces" responsive="true" style="width:40%;">}}

## Exportation

{{< img src="tracing/visualization/analytics/export_button.png" alt="Bouton d'exportation de votre analyse" responsive="true" style="width:40%;">}}

Exportez votre analyse de traces :

* Pour créer un nouveau [monitor d'APM][3] :  
    Cette fonctionnalité n'est pas encore disponible.
* Vers un [timeboard][4] existant :  
    Cette fonctionnalité est en mode bêta. [Contactez l'équipe d'assistance Datadog][5] afin de l'activer pour votre organisation.

## Traces dans les dashboards 

Exportez les [analyses de traces][6] de la recherche de traces ou créez-les directement dans votre [dashboard][7] aux côtés des métriques et des logs.

[En savoir plus sur le widget des séries temporelles][8]

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/search/#measures
[2]: /fr/tracing/visualization/search/#facets
[3]: /fr/monitors/monitor_types/apm
[4]: /fr/graphing/dashboards/timeboard
[5]: /fr/help
[6]: /fr/graphing/widgets/timeseries
[7]: /fr/graphing/dashboards
[8]: /fr/graphing/widgets/timeseries