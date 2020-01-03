---
title: RUM Analytics
kind: documentation
description: ''
further_reading:
  - link: 'https://www.datadoghq.com/blog/dash-2019-new-feature-roundup/#real-user-monitoring'
    tag: Blog
    text: Real User Monitoring
  - link: /real_user_monitoring/rum_explorer
    tag: Documentation
    text: Explorez vos vues dans Datadog
---
## Présentation

La fonctionnalité Real User Monitoring (RUM) Analytics vous permet d'agréger et de fractionner les données de vos vues RUM Explorer à des fins de dépannage et de surveillance. Vous pouvez définir :

* la requête utilisée pour filtrer l'ensemble de logs à analyser ;
* les dimensions selon lesquelles les données doivent être fractionnées ;
* la méthode de visualisation des données agrégées et fractionnées.

À partir d'une visualisation d'analyse, vous pouvez également :

* créer un widget dans un dashboard basé sur cette visualisation ;
* analyser en détail les différents sous-ensembles d'événements en fonction des interactions que la visualisation permet de réaliser.

## Créer une requête d'analyse

Créez une requête pour contrôler les données affichées dans votre analyse RUM Analytics :

1. Choisissez une [mesure][1] ou une [facette][2] à représenter graphiquement. Les [mesures][1] vous permettent de choisir une fonction d'agrégation, tandis que les [facettes][2] affichent le nombre de valeurs uniques.

    {{< img src="real_user_monitoring/rum_analytics/measure_selection.png" alt="Sélectionner une mesure" responsive="true" style="width:50%;">}}
2. Sélectionnez la fonction d'agrégation pour la [mesure][1] que vous souhaitez représenter :

    {{< img src="real_user_monitoring/rum_analytics/aggregation.png" alt="fonction d'agrégation pour l'analyse RUM Analytics" responsive="true" style="width:50%;">}}

3. Utilisez une [facette][2] pour fractionner votre graphique.

    {{< img src="real_user_monitoring/rum_analytics/break_down.png" alt="fractionner en fonction d'une facette RUM Analytics" responsive="true" style="width:50%;">}}

4. Choisissez l'intervalle de temps à représenter.
  Le changement de l'intervalle de temps global modifie la liste des laps de temps disponibles.

    {{< img src="real_user_monitoring/rum_analytics/roll_up.png" alt="rollup" responsive="true" style="width:50%;">}}

4. Choisissez d'afficher les *X* valeurs les plus **élevées** ou **faibles** en fonction de la [mesure][1] sélectionnée.

    {{< img src="real_user_monitoring/rum_analytics/top_bottom.png" alt="bouton top/bottom" responsive="true" style="width:50%;">}}

## Visualisations

Sélectionnez un type de visualisation RUM Analytics à l'aide du sélecteur de graphique :

{{< img src="real_user_monitoring/rum_analytics/graph_selector.png" alt="Sélecteur de graphique RUM Analytics" responsive="true" style="width:50%;">}}

Visualisations disponibles :

{{< tabs >}}
{{% tab "Série temporelle" %}}

Visualisez l'évolution d'une seule [mesure][1] (ou d'une [facette][2] correspondant à un nombre unique de valeurs) pour un intervalle donné. Vous pouvez également fractionner le graphique en utilisant une [facette][2] disponible.

Vous disposez d'options supplémentaires pour les séries temporelles. Vous pouvez choisir :

* d'afficher des graphiques en aires, à barres ou linéaires ;
* de superposer des données, en fonction de leur valeur ou d'un pourcentage ;
* d'utiliser un jeu de couleurs.

Voici des informations supplémentaires sur la superposition :

* La superposition est seulement disponible pour les requêtes avec fractionnement des données.
* Les options de superposition sont disponibles seulement pour les graphiques à barres ou en aires. L'affichage linéaire superpose toujours les données.
* Lorsque vous utilisez une option de Top list qui masque une partie de vos données, la superposition n'affiche pas le total. Elle affiche seulement le sous-total pour les séries top/bottom.
* La superposition ne convient pas pour des valeurs qui ne sont pas uniques dans la facette fractionnée.
* La superposition peut ne pas être adaptée à certaines méthodes d'agrégation de mesures.

La série temporelle RUM Analytics suivante montre :

L'évolution de la **famille de navigateurs** selon le **90e centile** de **temps domInteractive** au cours des 7 derniers jours.

{{< img src="real_user_monitoring/rum_analytics/rum_timeserie_example.png" alt="exemple de série temporelle RUM" responsive="true" style="width:90%;">}}


[1]: /fr/real_user_monitoring/rum_explorer/?tab=measures#facets-measures
[2]: /fr/real_user_monitoring/rum_explorer/?tab=facets#facets-measures
{{% /tab %}}

{{% tab "Top List" %}}

Visualisez les valeurs les plus élevées d'une [facette][1] en fonction de la [mesure][2] choisie :

La Top List RUM Analytics suivante montre :

L'évolution des **10 principaux chemins URL** selon le nombre d'**ID de session uniques** au cours du dernier jour.

{{< img src="real_user_monitoring/rum_analytics/top_list_rum.png" alt="exemple de top list RUM" responsive="true" style="width:90%;">}}


[1]: /fr/real_user_monitoring/rum_explorer/?tab=facets#facets-measures
[2]: /fr/real_user_monitoring/rum_explorer/?tab=measures#facets-measures
{{% /tab %}}
{{% tab "Tableau" %}}

Visualisez la liste des valeurs les plus élevées d'une [facette][1] en fonction de la [mesure][2] choisie (la première mesure que vous choisissez dans la liste), et affichez la valeur des autres mesures dans la liste. Mettez à jour la requête de recherche ou explorez les événements correspondant à l'une des dimensions.

* Lorsque plusieurs dimensions sont définies, les valeurs les plus élevées sont déterminées en fonction de la première dimension, puis de la seconde dans la fourchette des valeurs les plus élevées de la première dimension, puis de la troisième dans la fourchette des valeurs les plus élevées de la seconde dimension.
* Lorsque plusieurs mesures sont définies, les valeurs les plus élevées ou faibles sont déterminées en fonction de la première mesure.
* Le sous-total peut différer de la somme réelle des valeurs au sein d'un groupe, étant donné qu'un seul sous-ensemble (celui des valeurs les plus élevées ou des valeurs les plus faibles) s'affiche. Les événements associés à une valeur nulle ou vide pour cette dimension ne s'affichent pas en tant que sous-groupe.

 **Remarque** : la visualisation d'une seule mesure et d'une seule dimension sous forme de tableau est identique à celle d'une top list. Seule la présentation diffère.

 Le tableau RUM Analytics suivant affiche les **5 principaux chemins URL** consultés pour **deux pays**, les États-Unis et le Japon, selon le nombre d'**ID de session uniques** ainsi que le 90e centile de **durée** au cours du dernier jour :

{{< img src="real_user_monitoring/rum_analytics/rum_table_example.png" alt="exemple de tableau RUM" responsive="true" style="width:90%;">}}

[1]: /fr/real_user_monitoring/rum_explorer/?tab=facets#facets-measures
[2]: /fr/real_user_monitoring/rum_explorer/?tab=measures#facets-measures
{{% /tab %}}

{{< /tabs >}}

## Événements associés

Sélectionnez une section du graphique ou cliquez dessus pour l'agrandir ou consulter la liste des événements correspondant à votre sélection :

{{< img src="real_user_monitoring/rum_analytics/view_events.png" alt="afficher les événements" responsive="true" style="width:30%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/rum_explorer/?tab=measures#facets-measures
[2]: /fr/real_user_monitoring/rum_explorer/?tab=facets#facets-measures