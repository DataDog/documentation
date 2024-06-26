---
aliases:
- /fr/real_user_monitoring/rum_explorer
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentation
  text: En savoir plus sur la fonctionnalité de recherche du RUM Explorer
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals
  tag: Blog
  text: Surveiller les signaux Web essentiels avec RUM
- link: https://www.datadoghq.com/blog/modern-frontend-monitoring/
  tag: Blog
  text: Surveiller des applications monopages
kind: documentation
title: RUM Explorer
---

## Présentation

Le [Real User Monitoring (RUM) Explorer][1] vous permet d'étudier toutes les données recueillies à partir de vos différentes applications ainsi que des informations précises sur vos événements RUM.

Vous pourrez :

- parcourir les sessions utilisateur ;
- étudier les problèmes de performance affectant vos vues, ressources ou actions ;
- résoudre les erreurs et tâches longues de vos applications.

{{< img src="real_user_monitoring/explorer/rum-explorer-2.png" alt="RUM Explorer" style="width:95%;" >}}

## Vue par application

Le sélecteur d'application dans la barre de navigation supérieure vous permet de sélectionner et d'afficher toutes les données RUM d'une certaine application.

{{< img src="real_user_monitoring/explorer/application-selector-2.png" alt="Cliquer sur le sélecteur d'application pour afficher toutes les données RUM d'une certaine application" style="width:95%;" >}}

## Rechercher et filtrer des événements

Saisissez une requête dans la barre de recherche et sélectionnez un type de visualisation dans le [RUM Explorer][1] pour rechercher et filtrer vos événements RUM. Vous pouvez consulter des événements précis ou généraux, ou vous concentrer sur un groupe d'événements pertinents.

## Autorisation

Vous pouvez regrouper les événements RUM que vous avez interrogés au sein d'entités de plus haut niveau, afin de déduire ou de consolider des informations à propos d'un problème. Pour identifier des patterns d'événement et agréger des événements dans des sous-ensembles, consultez la section [Regrouper des événements RUM][2].

Pour commencer à créer des requêtes et utiliser des facettes, consultez la section [Syntaxe de recherche][3]. 

## Visualiser des événements

Sélectionnez une visualisation en fonction de vos filtres et agrégations afin de voir vos événements RUM sous un angle unique et de découvrir des informations exploitables.

Par exemple, vous pouvez visualiser vos événements RUM sous la forme d'une liste, organiser les données dans des colonnes et les afficher sous la forme d'une série temporelle qui présente l'évolution de la télémétrie RUM.

Pour commencer à visualiser vos données RUM dans le RUM Explorer, consultez la section [Visualiser les données][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/sessions
[2]: /fr/real_user_monitoring/explorer/group
[3]: /fr/real_user_monitoring/explorer/search_syntax
[4]: /fr/real_user_monitoring/explorer/visualize