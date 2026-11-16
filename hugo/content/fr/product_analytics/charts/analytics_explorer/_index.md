---
aliases:
- /fr/product_analytics/analytics_explorer/
- /fr/product_analytics/journeys
description: Créez et visualisez des requêtes analytiques personnalisées à l'aide
  d'événements, de mesures, de filtres et de ventilations.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: Blog
  text: Utilisez des coordonnées Geomap pour visualiser les données de votre application
    par localisation
title: Analytics
---
Les graphiques analytiques commencent par une seule requête : un événement, une mesure et des filtres éventuels. Définissez-les une fois, puis choisissez comment visualiser le résultat. 

Utilisez les graphiques analytiques pour :

- Voir combien d'utilisateurs ont déclenché un événement et comment l'adoption d'une fonctionnalité évolue au fil du temps.
- Mesurez la fréquence à laquelle les utilisateurs effectuent une action et leur degré d'engagement avec votre produit.
- Ventilez une métrique par les propriétés d'un utilisateur ou d'un événement, et visualisez la composition des événements.
- Créez des métriques personnalisées avec des formules, en combinant des événements ou des métriques en un taux, un ratio ou un score.
- Clarifiez quels utilisateurs ou segments sont à l'origine d'un pic, d'une baisse ou d'une tendance.

{{< img src="/product_analytics/analytics/analytics_chart.png" alt="Un exemple de graphique analytique." style="width:90%;" >}}

## Créez une requête {#build-a-query}

Une requête définit ce qu'un graphique analytique mesure, indépendamment de la manière dont vous choisissez de l'afficher ultérieurement.

{{< img src="/product_analytics/analytics/analytics_query_builder.png" alt="Un générateur de requêtes analytiques avec des légendes numérotées pour le nom d'affichage de la requête, le sélecteur d'événements, le sélecteur de mesure, ainsi que les contrôles de filtre, de ventilation, de fonction et de requête supplémentaire." style="width:50%;" >}}
   
1. Dans {{< ui >}}Product Analytics{{< /ui >}}, sélectionnez {{< ui >}}Create New{{< /ui >}} > {{< ui >}}Analytics{{< /ui >}}.

2. (Facultatif) Saisissez un {{< ui >}}Query display name{{< /ui >}} pour nommer la requête.
   
3. Cliquez sur le sélecteur d'événements pour choisir les événements inclus dans la requête, tels qu'une vue ou une session spécifique. Utilisez les onglets à l'intérieur du sélecteur pour restreindre la liste par catégorie d'événement : {{< ui >}}Sessions{{< /ui >}}, {{< ui >}}Views{{< /ui >}}, {{< ui >}}Labeled actions{{< /ui >}}, {{< ui >}}Actions{{< /ui >}} ou {{< ui >}}Server actions{{< /ui >}}.

4. Choisissez comment la requête mesure les événements sélectionnés à l'aide de {{< ui >}}Viewed as count of{{< /ui >}}. Sélectionnez {{< ui >}}All events{{< /ui >}} pour compter chaque occurrence, ou sélectionnez une propriété spécifique, telle que {{< ui >}}User Id{{< /ui >}}, pour compter les valeurs uniques à la place.

5. (Facultatif) Délimitez la requête par des propriétés d'événement, d'utilisateur, de segment ou de compte, y compris des attributs personnalisés provenant d'intégrations tierces, à l'aide de {{< ui >}}Add filter{{< /ui >}}.

6. (Facultatif) Comparez les résultats selon les valeurs d'une propriété, telle que le pays ou le nom de la vue, à l'aide de {{< ui >}}Add breakdown{{< /ui >}}.

   <div class="alert alert-info">{{< ui >}}Query Value{{< /ui >}} Les graphiques suppriment les ventilations, et {{< ui >}}Geomap{{< /ui >}} les graphiques les convertissent en une facette de localisation.</div>

7. (Facultatif) Appliquez une fonction qui transforme la requête, telle que le calcul d'un taux de variation ou le lissage des données, en utilisant {{< ui >}}Σ{{< /ui >}}. Voir [Fonctions][1] pour plus de détails.
   
8. (Facultatif) Exécutez une deuxième requête indépendante parallèlement à la première en utilisant {{< ui >}}Add Query{{< /ui >}}. Combinez plusieurs requêtes en un seul résultat, en utilisant {{< ui >}}Add Formula{{< /ui >}}.

## Comprendre un graphique analytique {#understand-an-analytics-chart}

Après avoir créé une requête, le graphique affiche vos données en utilisant l'événement, la mesure, les filtres et la ventilation que vous avez définis. À partir de là, vous pouvez modifier la façon dont ces données sont visualisées et affichées sans modifier la requête sous-jacente.

Toutes les options ne s'appliquent pas à tous les types de graphiques. L'intervalle de cumul et le style d'affichage, par exemple, ne s'appliquent qu'aux graphiques {{< ui >}}Timeseries{{< /ui >}}.

{{< img src="product_analytics/analytics/analytics_analysis.png" alt="Un graphique Analytics avec des légendes numérotées pour le sélecteur de type de graphique, l'intervalle de cumul, le sélecteur de plage temporelle, le sélecteur d'affichage, le menu des options de point de données et un intervalle en cours." style="width:100%;" >}}

1. Utilisez le sélecteur de type de graphique pour basculer entre les [types de graphiques][2].

2. Pour les graphiques {{< ui >}}Timeseries{{< /ui >}}, utilisez le sélecteur de cumul pour définir l'intervalle de temps que chaque point de données représente. Choisissez {{< ui >}}Default{{< /ui >}} pour laisser l'intervalle s'adapter à la plage temporelle, ou fixez-le à une valeur spécifique.

3. Utilisez le sélecteur de plage temporelle pour définir la période de données que le graphique analyse, de {{< ui >}}Past 1 Hour{{< /ui >}} à {{< ui >}}Past 1 Year{{< /ui >}}, ou sélectionnez une plage personnalisée dans le calendrier.

4. Pour les graphiques {{< ui >}}Timeseries{{< /ui >}}, utilisez le sélecteur d'affichage pour basculer entre {{< ui >}}Bars{{< /ui >}}, {{< ui >}}Lines{{< /ui >}} et {{< ui >}}Areas{{< /ui >}}.

5. Survolez un point de données pour afficher les détails ou cliquez dessus pour accéder aux options permettant de zoomer, d'afficher les événements sous-jacents, ou de rechercher ou d'exclure cette valeur de la requête.

6. Les segments hachurés indiquent les intervalles qui sont encore en cours. 

## Étapes suivantes {#next-steps}
{{< whatsnext desc="Apprenez à rechercher, à regrouper et à visualiser des événements analytiques, et à exporter ou à examiner des événements individuels." >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/search_syntax" >}}Syntaxe de recherche{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/events" >}}Events{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/visualize" >}}Visualiser des événements{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/group" >}}Group{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/export" >}}Exportation{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/functions/
[2]: /fr/product_analytics/charts/analytics_explorer/visualize/