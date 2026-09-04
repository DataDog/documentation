---
aliases:
- /fr/product_analytics/analytics_explorer/
- /fr/product_analytics/journeys
description: ''
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentation
  text: Explorez vos vues dans Datadog
- link: /dashboards/functions/
  tag: Documentation
  text: Ajoutez une fonction à votre requête
- link: https://www.datadoghq.com/blog/product-analytics-faster-decisions
  tag: Blog
  text: Prenez des décisions produit plus rapides et plus pertinentes avec Datadog
    Product Analytics
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: Blog
  text: Utilisez des coordonnées Geomap pour visualiser les données de votre application
    par localisation
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: Blog
  text: Utiliser l'analyse de l'entonnoir pour comprendre et optimiser vos flux utilisateur
    clés
title: Analytics
---
## Présentation {#overview}

La page [Analytics Explorer][1] contient l'agrégation des données de vues pour comprendre comment votre produit est utilisé. Vous pouvez contrôler :

* Le type d'événement (Sessions, Vues ou Actions) selon lequel afficher les vues.
* La requête qui filtre l'ensemble des vues à analyser.
* Les dimensions sur lesquelles répartir les données.
* La méthode de visualisation pour les agrégats et les répartitions.

Avec les visualisations Analytics, vous pouvez :

* Créer un widget dans un dashboard à partir de cette visualisation.
* Approfondissez l'analyse de sous-ensembles de la liste d'événements en fonction des interactions permises par la visualisation.

## Utilisation du graphique analytique {#using-the-analytics-chart}
{{< whatsnext desc="Suivez ces liens pour apprendre à utiliser la syntaxe de recherche analytique, à afficher les événements, et à visualiser, grouper et exporter les vues. " >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/search_syntax" >}}Syntaxe de recherche{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/events" >}} Events {{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/visualize" >}}Visualiser des événements{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/group" >}}Enterprise Groups{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/export" >}}Exportation{{< /nextlink >}}
{{< /whatsnext >}}

## Créez une requête {#build-a-query}

Dans [Analytics][1], personnalisez votre affichage en ajoutant des facettes et des mesures à votre requête de recherche. 

1. Sélectionnez un [type d'événement de vue][2].

   {{< img src="product_analytics/analytics/view_type_selection1.png" alt="Menu déroulant dans Product Analytics limité à la sélection du type Vues." style="width:70%;">}}

1. Choisissez une mesure pour représenter graphiquement le nombre unique.

   {{< img src="product_analytics/analytics/measure_selection1.png" alt="Menu déroulant dans Product Analytics pour choisir une mesure à représenter graphiquement le nombre unique." style="width:70%;">}}

1. Filtrez par attributs d'événement ou par attributs issus d'[intégrations tierces][6].

   {{< img src="product_analytics/analytics/pana_analytics_filter_by.png" alt="Menu déroulant dans Product Analytics pour filtrer les événements par leurs propres attributs ou par des attributs issus d'intégrations tierces." style="width:70%;">}}

1. Choisissez un attribut d'événement pour ventiler davantage les résultats.

   {{< img src="product_analytics/analytics/pana_analytics_breakdown_by1.png" alt="Menu déroulant dans Product Analytics pour ventiler davantage les événements par leurs propres attributs ou par des attributs issus d'intégrations tierces." style="width:70%;">}}

1. Appliquez une [fonction][4] pour modifier la manière dont les résultats de la requête sont renvoyés pour les visualisations.

   {{< img src="product_analytics/analytics/pana_analytics_functions.png" alt="Bouton dans Product Analytics pour ajouter une fonction permettant de modifier la manière dont les résultats d'une requête de métrique sont renvoyés pour les visualisations." style="width:70%;">}}

1. Choisissez le [type de graphique][5] et l'intervalle de temps pour votre graphique. Le changement de l'intervalle de temps global modifie la liste des laps de temps disponibles.

   {{< img src="product_analytics/analytics/pana_analytics_time_interval2.png" alt="Choisissez un type de graphique et un intervalle de temps pour votre graphique." style="width:50%;">}}



## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/explorer
[2]: /fr/real_user_monitoring/guide/understanding-the-rum-event-hierarchy/
[3]: /fr/product_analytics/charts/analytics_explorer/group
[4]: /fr/dashboards/functions/#overview
[5]: /fr/product_analytics/charts/analytics_explorer/visualize/
[6]: https://app.datadoghq.com/product-analytics/integrations/custom-attributes