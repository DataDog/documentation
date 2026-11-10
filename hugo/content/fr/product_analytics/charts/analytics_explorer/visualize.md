---
aliases:
- /fr/product_analytics/analytics_explorer/visualize
description: Choisissez un type de graphique, tel qu'une série temporelle, un tableau
  ou une Treemap, pour afficher les résultats de votre requête Product Analytics.
title: Visualiser des événements
---
Après avoir créé une requête analytique, utilisez le sélecteur de type de graphique pour contrôler la manière dont les résultats s'affichent.

La plupart des types de graphiques visualisent une mesure, une facette, ou les deux :

Mesure
: Un attribut avec une valeur numérique dans vos événements Product Analytics, tel que le temps de chargement.

Facette
: Un attribut dont vous regroupez ou comparez les valeurs uniques, tel que le pays ou le navigateur.

Vous pouvez cliquer sur la plupart des composants de graphique pour obtenir plus de détails, tels que les événements sous-jacents pour un point de données ou une plage temporelle plus étroite. Les options disponibles varient selon le type de graphique.

<div class="alert alert-tip">Pour voir des résultats paginés au niveau de l'événement au lieu d'un graphique agrégé, utilisez la page {{< ui >}}Events{{< /ui >}}. Les événements sont idéaux lorsque les résultats individuels importent et que vous n'avez pas besoin de connaissances préalables sur ce qui définit un résultat correspondant.</div>

## Série temporelle {#timeseries}

Visualisez l'évolution d'une mesure ou d'une facette unique sur une période sélectionnée.

Choisissez des options d'affichage supplémentaires, telles que :

- Affichage : Les résultats s'affichent sous forme de barres (recommandé pour les comptes et les comptes uniques), de lignes (recommandé pour les agrégations statistiques) ou de zones. Plusieurs jeux de couleurs sont disponibles.
- Intervalle de cumul : Détermine la largeur des buckets dans les barres.

{{< img src="product_analytics/analytics/visualize/analytics-timeseries-3.png" alt="Une vue du graphique de série temporelle dans le générateur de graphiques Analytics." style="width:90%;" >}}

## Query value {#query-value}

Affichez une valeur agrégée unique pour une mesure ou une facette sur la période sélectionnée. Les graphiques de valeur de requête ne prennent pas en charge les ventilations.

Activez éventuellement {{< ui >}}Change{{< /ui >}} pour montrer comment la valeur a augmenté ou diminué sur une période de comparaison, telle que l'heure, le jour ou la semaine précédente.

{{< img src="product_analytics/analytics/visualize/analytics-query-value-1.png" alt="Vue du graphique Query value dans le générateur de graphiques Analytics." style="width:90%;" >}}

## Top list {#top-list}

Visualisez un classement ordonné des valeurs supérieures ou inférieures d'une facette selon la mesure choisie.

{{< img src="product_analytics/analytics/visualize/analytics-top-list-3.png" alt="Vue du graphique Top list dans le générateur de graphiques Analytics." style="width:90%;" >}}

## Bar chart {#bar-chart}

Comparez une mesure à travers les valeurs d'une facette en utilisant des colonnes verticales.

{{< img src="product_analytics/analytics/visualize/analytics-bar-chart-1.png" alt="Vue du graphique Bar chart dans le générateur de graphiques Analytics." style="width:90%;" >}}

## Tableau {#table}

Visualisez les valeurs supérieures ou inférieures de jusqu'à quatre facettes, selon la mesure choisie (la première mesure que vous choisissez dans la liste). Les mesures supplémentaires affichent leurs valeurs pour les éléments qui apparaissent dans le tableau. Mettez à jour la requête de recherche ou examinez les événements correspondant à une dimension.

- Lorsqu'un tableau inclut plusieurs mesures, le classement supérieur ou inférieur est déterminé par la première mesure.
- Le sous-total peut différer de la somme réelle des valeurs dans un groupe, car seul un sous-ensemble (supérieur ou inférieur) s'affiche. Les événements avec une valeur nulle ou vide pour une dimension ne s'affichent pas en tant que sous-groupe.

<div class="alert alert-info">Un tableau comportant une seule mesure et un seul breakdown est équivalent à une <a href="#top-list">Top list</a>, affichée différemment.</div>

{{< img src="product_analytics/analytics/visualize/analytics-table-1.png" alt="Vue du graphique Table chart dans le générateur de graphiques Analytics." style="width:90%;">}}

## Change {#change}

Montrez comment une mesure a augmenté ou diminué entre la période sélectionnée et une période de comparaison, telle que l'heure, le jour ou la semaine précédente. Ajoutez éventuellement une facette pour voir le changement ventilé par ses valeurs.

{{< img src="product_analytics/analytics/visualize/analytics-change-1.png" alt="Vue du graphique Change dans le générateur de graphiques Analytics." style="width:90%;" >}}

## Treemap {#treemap}

Une Treemap vous aide à organiser et à afficher des données sous forme de pourcentage d'un tout dans un format visuellement attrayant. Les Treemaps affichent les données dans des rectangles imbriqués. Comparez différentes facettes en utilisant à la fois la taille et la couleur des rectangles.

{{< img src="product_analytics/analytics/visualize/analytics-treemap-1.png" alt="Une vue du graphique Treemap dans le générateur de graphiques Analytics." style="width:90%;">}}

## Pie chart {#pie-chart}

Un Pie chart vous aide à organiser et à afficher des données sous forme de pourcentage d'un tout. Il est utile pour comparer la relation entre différentes facettes, telles que les pays, les navigateurs ou les noms de vue.

{{< img src="product_analytics/analytics/visualize/analytics-pie-chart-2.png" alt="Vue du graphique Pie chart dans le générateur de graphiques Analytics." style="width:90%;">}}

## Geomap {#geomap}

Visualisez une mesure ou une facette unique sur une carte du monde.

{{< img src="product_analytics/analytics/visualize/analytics-geomap-1.png" alt="Une vue du graphique Geomap dans le générateur de graphiques Analytics." style="width:90%;">}}