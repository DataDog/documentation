---
aliases:
- /fr/real_user_monitoring/rum_analytics
- /fr/real_user_monitoring/analytics
description: ''
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentation
  text: Explorer vos vues dans Datadog
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: Blog
  text: Utiliser les geomaps pour visualiser les données de votre application par
    région
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: Blog
  text: Utiliser l'analyse de l'entonnoir pour comprendre et optimiser vos flux utilisateur
    clés
title: RUM Analytics
---

## Présentation

La fonctionnalité Real User Monitoring (RUM) Analytics vous permet d'agréger et de fractionner les données de vos vues RUM Explorer à des fins de dépannage et de surveillance. Vous pouvez définir :

* la requête utilisée pour filtrer l'ensemble de logs à analyser ;
* les dimensions selon lesquelles les données doivent être fractionnées ;
* la méthode de visualisation des données agrégées et fractionnées.

Les visualisations d'analyse RUM vous permettent :

* de créer un widget dans un dashboard basé sur cette visualisation ;
* d'analyser en détail les différents sous-ensembles d'événements en fonction des interactions que la visualisation permet de réaliser.

## Créer une requête

Dans la section [RUM Analytics][1], personnalisez votre affichage en ajoutant des facettes et des mesures à votre requête de recherche.

1. Choisissez une mesure ou une facette à représenter graphiquement. Les mesures vous permettent de choisir une fonction d'agrégation, tandis que les facettes affichent le nombre de valeurs uniques.

    {{< img src="real_user_monitoring/explorer/analytics/measure_selection.png" alt="sélection d'une mesure" style="width:50%;">}}
2. Sélectionnez la fonction d'agrégation pour la mesure que vous souhaitez représenter :

    {{< img src="real_user_monitoring/explorer/analytics/aggregation.png" alt="fonction d'agrégation pour l'analyse RUM Analytics" style="width:50%;">}}

3. Utilisez une facette pour fractionner votre graphique.

    {{< img src="real_user_monitoring/explorer/analytics/break_down.png" alt="fractionner en fonction d'une facette RUM Analytics" style="width:50%;">}}

4. Choisissez un intervalle pour votre graphique. Si vous changez l'intervalle global, cela modifie la liste des laps de temps disponibles.

    {{< img src="real_user_monitoring/explorer/analytics/roll_up.png" alt="rollup" style="width:50%;">}}

5. Choisissez d'afficher les valeurs les plus **élevées** ou **faibles** en fonction de la mesure sélectionnée.

    {{< img src="real_user_monitoring/explorer/analytics/top_bottom.png" alt="bouton top/bottom" style="width:50%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/analytics