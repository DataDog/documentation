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
  - link: tracing/app_analytics/search
    tag: Documentation
    text: Recherche globale sur toutes vos traces avec des tags
---
Passez du mode de recherche de traces au mode d'analyse de traces en cliquant sur le bouton *Trace Mode* :

{{< img src="tracing/app_analytics/analytics/switch_analytics.png" alt="Changement d'analyse"  style="width:40%;">}}

## Requête d'analyse de traces

Utilisez la requête pour contrôler ce qui s'affiche dans votre analyse de traces :

1. Choisissez la métrique `Duration` ou une [facette][1] à analyser. La sélection de la métrique `Duration` vous permet de choisir la fonction d'agrégation, tandis que la [facette][1] affiche le nombre de valeurs uniques.

    {{< img src="tracing/app_analytics/analytics/choose_measure_facet.png" alt="choisir mesure ou facette"  style="width:50%;">}}

2. Sélectionnez la fonction d'agrégation pour la métrique `Duration` :

   {{< img src="tracing/app_analytics/analytics/agg_function.png" alt="fonction d'agrégation"  style="width:50%;">}}

3. Utilisez un [tag][2] ou une [facette][1] pour fractionner votre analyse.

    {{< img src="tracing/app_analytics/analytics/split_by.png" alt="fractionnement"  style="width:50%;">}}

4. Choisissez d'afficher les *X* valeurs les plus **élevées** ou **faibles** en fonction de la [facette][1] ou de la `Duration` sélectionnée.

    {{< img src="tracing/app_analytics/analytics/top_bottom_button.png" alt="bouton top/bottom"  style="width:20%;">}}

5. Sélectionnez les laps de temps de l'analyse.
  Si vous changez l'intervalle global, cela modifie la liste des valeurs de laps de temps disponibles.

    {{< img src="tracing/app_analytics/analytics/timesteps.png" alt="Laps de temps"  style="width:30%;">}}

## Visualisations

Sélectionnez un type de visualisation d'analyse de traces à l'aide du sélecteur d'analyse.

Visualisations disponibles :

* [Série temporelle](#timeseries)
* [Top List (Valeurs les plus élevées)](#top-list)
* [Table (Tableau)](#table)

### Série temporelle

Visualisez l'évolution de la métrique `Duration` (ou d'une [facette][1] correspondant à un nombre unique de valeurs) pour un intervalle donné. Vous pouvez également fractionner le graphique en utilisant une [facette][1] disponible.

L'analyse de traces avec une série temporelle suivante illustre : l'évolution de la **durée** de **pc99** (99e centile) toutes les **5 minutes** pour chaque **service**.

{{< img src="tracing/app_analytics/analytics/timeserie_example.png" alt="exemple de série temporelle"  style="width:90%;">}}

### Top List

Visualisez les valeurs les plus élevées d'une [facette][1] en fonction de leur métrique `Duration` (ou d'une [facette][1] correspondant à un nombre unique de valeurs) :

L'analyse de traces suivante avec une Top List illustre :
la **durée** de **pc99** (99e centile) la plus élevée d'un **service**

{{< img src="tracing/app_analytics/analytics/top_list_example.png" alt="exemple de top list"  style="width:90%;">}}

### Table (Tableau)

Visualisez la liste des valeurs les plus élevées d'une [facette][1] en fonction de la [mesure][2] choisie (la première mesure que vous choisissez dans la liste), et affichez la valeur des autres mesures dans la liste. Mettez à jour la requête de recherche ou explorez les logs correspondant à l'une des dimensions.

* Lorsque plusieurs dimensions sont définies, les valeurs les plus élevées sont déterminées en fonction de la première dimension, puis de la seconde dans la fourchette des valeurs les plus élevées de la première dimension, puis de la troisième dans la fourchette des valeurs les plus élevées de la seconde dimension.
* Lorsque plusieurs mesures sont définies, les valeurs les plus élevées ou faibles sont déterminées en fonction de la première mesure.
* Le sous-total peut différer de la somme réelle des valeurs au sein d'un groupe, étant donné qu'un seul sous-ensemble (celui des valeurs les plus élevées ou des valeurs les plus faibles) s'affiche. Les événements associés à une valeur nulle ou vide pour cette dimension ne s'affichent pas en tant que sous-groupe.

 **Remarque** : la visualisation d'une seule mesure et d'une seule dimension sous forme de tableau est identique à celle d'une top list. Seul l'affichage diffère.

 L'analyse de logs avec un tableau suivante illustre l'évolution des **premiers codes de statut** en fonction de leur **débit**, ainsi que le nombre moyen d'**IP client** uniques au cours des 15 dernières minutes :

{{< img src="tracing/app_analytics/analytics/trace_table_example.png" alt="exemple de top list"  style="width:90%;">}}

## Traces associées

Sélectionnez une section du graphique ou cliquez dessus pour l'agrandir ou consulter la liste des [traces][3] correspondant à votre sélection :

{{< img src="tracing/app_analytics/analytics/view_traces.png" alt="afficher les traces"  style="width:40%;">}}

## Exportation

{{< img src="tracing/app_analytics/analytics/export_button.png" alt="Bouton d'exportation de votre analyse"  style="width:40%;">}}

Exportez votre analyse de traces :

* Pour créer un [monitor d'APM ][4] :
    Cette fonctionnalité n'est pas encore disponible.
* Vers un [timeboard][5] existant :
    Cette fonctionnalité est en version bêta. [Contactez l'assistance Datadog][6] afin de l'activer pour votre organisation.

## Traces dans les dashboards

Exportez les [analyses de traces][7] de la recherche de traces ou créez-les directement dans votre [dashboard][8] aux côtés des métriques et des logs.

[En savoir plus sur le widget Série temporelle][9]

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/search/#facets
[2]: /fr/tracing/search/#measures
[3]: /fr/tracing/visualization/#trace
[4]: /fr/monitors/monitor_types/apm
[5]: /fr/graphing/dashboards/timeboard
[6]: /fr/help
[7]: /fr/graphing/widgets/timeseries
[8]: /fr/graphing/dashboards
[9]: /fr/graphing/widgets/timeseries