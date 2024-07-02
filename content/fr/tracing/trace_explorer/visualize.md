---
description: Affichez les spans dans une liste ou regroupez-les dans des séries temporelles,
  des top lists et plus encore.
further_reading:
- link: tracing/trace_explorer/
  tag: Documentation
  text: Trace Explorer
kind: documentation
title: Visualisations de spans
---

## Présentation

Les visualisations définissent la manière dont les données des spans interrogées sont affichées. Sélectionnez les visualisations appropriées pour faire apparaître des informations utiles, comme une **liste** pour les événements individuels, ou des **séries temporelles** ou des **top lists** pour les données agrégées. 

## Vue List

Le présentation sous forme de liste regroupe les spans qui correspondent au contexte sélectionné, définis par la [requête de barre de recherche][1] et un [intervalle][2].

Dans le tableau, choisissez les informations pertinentes à afficher sous forme de colonnes. Vous pouvez **gérer les colonnes** du tableau de deux façons différentes :

- vous pouvez interagir avec la ligne d'en-tête du tableau pour **trier**, **réorganiser** ou **supprimer** des colonnes.
- vous pouvez également sélectionner une facette dans le volet des facettes à gauche, ou dans le volet latéral des traces après avoir cliqué sur une span spécifique, afin dʼ**ajouter** une colonne pour un champ. Vous pouvez également ajouter des colonnes à partir du bouton **Options**.

{{< img src="tracing/trace_explorer/visualize/list_view_table_controls.mp4" alt="Configuration du tableau dʼaffichage" video=true style="width:80%;">}}

Le tri par défaut des spans dans la visualisation sous forme de liste se fait par horodatage, avec les spans les plus récentes en haut. Pour faire apparaître en premier les spans dont la valeur est la plus basse ou la plus élevée pour une mesure, ou pour trier vos spans lexicographiquement en fonction de la valeur d'un tag, spécifiez cette colonne comme étant la colonne **by**.


La configuration des colonnes est stockée avec d'autres éléments de votre contexte de dépannage dans les vues enregistrées.

La `Latency Breakdown` de la trace peut manquer pour certaines spans si la trace est malformée ou incomplète. Par exemple, les échantillonneurs error et rare capturent des morceaux de traces, sans la garantie de capturer la trace dans son intégralité. Dans ce cas, les données sont omises pour éviter d'afficher des informations incohérentes ou trompeuses sur les temps de latence qui n'auraient de sens que si la trace était complète.

Lorsque la requête est filtrée sur les spans dʼerreurs, sélectionnez l'option **Group into Issues** pour visualiser une liste des problèmes de lʼ[Error Tracking][5] au lieu des spans dʼerreurs individuelles. Cliquez sur n'importe quel problème de la liste pour ouvrir le volet des problèmes et accéder à des informations supplémentaires sur ce groupe d'erreurs.

{{< img src="tracing/trace_explorer/visualize/trace_explorer_issue_grouping.png" alt="Problème de regroupement de lʼError Tracking" style="width:100%;">}}

Dans les détails du problème, cliquez sur `See all errors` pour afficher les spans dʼerreurs individuelles regroupées sous ce problème.

**Remarque** : rétablissez le regroupement dʼ`Errors` pour visualiser les erreurs individuelles, y compris les erreurs sans empreinte digitale, c'est-à-dire les erreurs sans problème associé.

## Série temporelle

Faites appel à des séries temporelles pour visualiser l'évolution d'une seule [mesure][3] (ou d'un nombre unique de valeurs de tags) pour un intervalle donné. Vous pouvez également fractionner les données en utilisant l'un des trois [tags][2] (regroupement).

**Remarque** : le [Live Explorer][4] (15 minutes) permet de regrouper les données en fonction d'une seule dimension.

Les vues agrégées utilisent des options de requête supplémentaires pour définir la **dimension de tag mesurée**, les dimensions à utiliser pour le **regroupement** de la requête et la **période d'agrégation**. Par exemple :

1. Choisissez d'afficher la mesure `Duration`.

   {{< img src="tracing/trace_explorer/visualize/group_by_measured_dimension.png" alt="Dimension mesurée" style="width:100%;">}}

2. Sélectionnez la fonction d'agrégation pour la mesure `Duration`. La sélection d'une mesure vous permet de choisir la fonction d'agrégation alors que la sélection d'un attribut qualitatif affiche le compte unique.

   {{< img src="tracing/trace_explorer/visualize/group_by_aggregation_function.png" alt="Fonction dʼagrégation" style="width:100%;">}}

3. Regroupez la requête par dimension, comme `Resource`.

   {{< img src="tracing/trace_explorer/visualize/group_by_dimension.png" alt="Fractionner une dimension" style="width:100%;">}}

4. Choisissez d'afficher un certain nombre de valeurs élevées ou basses en fonction du tag sélectionné.

    {{< img src="tracing/trace_explorer/visualize/group_by_top_bottom.png" alt="X valeurs élevées et basses" style="width:100%;">}}

5. Choisissez la période de rollup, par exemple `10min`.

    {{< img src="tracing/trace_explorer/visualize/group_by_rollup_period.png" alt="Période de rollup" style="width:100%;">}}

La série temporelle suivante du Trace Explorer montre l'évolution des dix premiers noms de ressources du `shopist-web-ui` du service selon le 95e centile de `Duration` au cours des quatre dernières heures :

{{< img src="tracing/trace_explorer/visualize/timeseries_view.png" alt="Vue des séries temporelles" style="width:100%;">}}

Les séries temporelles vous permettent de choisir des options d'affichage supplémentaires : l'**intervalle de cumul**, si les résultats doivent être **affichés** sous forme de **barres** (recommandé pour les nombres et les nombres uniques), de **lignes** (recommandé pour les agrégations statistiques) ou de **zones**, et le **jeu de couleurs**.

## Top list

Utilisez une top list pour visualiser un nombre de spans, un nombre des tags uniques ou une mesure divisée par une dimension de tag.

Par exemple, la top list suivante montre les dix premiers utilisateurs du site web qui ont rencontré une erreur lors du paiement au cours de la journée écoulée, sur la base du nombre de spans.

{{< img src="tracing/trace_explorer/visualize/top_list_view.png" alt="Vue en top list" style="width:100%;">}}

## Tableau

Utilisez un tableau pour visualiser les valeurs les plus élevées dʼun maximum de trois combinaisons de dimensions en fonction d'une mesure choisie ou du nombre de spans.

**Remarque** : la visualisation sous forme de tableau regroupée sur la base d'une seule mesure est identique à celle d'une Top List. Seule la présentation diffère.

Le tableau suivant montre le nombre de spans dʼerreurs par `Env`, `Service`, et `Error type`.

{{< img src="tracing/trace_explorer/visualize/table_view.png" alt="Présentation sous forme de tableau" style="width:100%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_explorer/query_syntax/#search-syntax
[2]: /fr/tracing/trace_explorer/query_syntax/#time-range
[3]: /fr/tracing/trace_explorer/facets/#quantitative-facets-measures
[4]: /fr/tracing/trace_explorer/?tab=timeseriesview#live-search-for-15-minutes
[5]: /fr/tracing/error_tracking/