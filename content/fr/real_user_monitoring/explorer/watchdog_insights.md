---
description: Découvrez comment analyser les problèmes de vos applications RUM avec
  Watchdog Insights.
further_reading:
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals
  tag: Blog
  text: Surveiller les signaux Web essentiels avec RUM
- link: https://www.datadoghq.com/blog/datadog-mobile-rum/
  tag: Blog
  text: Améliorer l'expérience utilisateur mobile avec la solution RUM Mobile Datadog
- link: /watchdog/insights
  tag: Documentation
  text: En savoir plus sur Watchdog Insights
- link: /real_user_monitoring/explorer/search/
  tag: Documentation
  text: En savoir plus sur la fonctionnalité de recherche du RUM Explorer
kind: documentation
title: Watchdog Insights pour RUM
---

## Présentation

Grâce à la fonctionnalité Watchdog Insights de la solution Real User Monitoring (RUM) de Datadog, vous pouvez identifier plus facilement les causes d'origine de vos problèmes en visualisation des informations contextuelles dans le RUM Explorer. Les Watchdog Insights renforcent vos connaissances et confirment vos intuitions en suggérant des anomalies et des goulots d'étranglement nuisant potentiellement à un sous-ensemble d'utilisateurs.

Pour en savoir plus, consultez la section [Watchdog Insights][1].

## Explorer les insights recueillies

La bannière rose de Watchdog Insights apparaît dans le [RUM Explorer][2] et affiche des informations sur la requête de recherche sur une période donnée. Cet exemple montre comment Watchdog Insights met en évidence des problèmes dans une instance d'application déployée de `view.url_host:www.shopist.io`, qui a causé un certain nombre d'erreurs dans un intervalle de temps donné (par exemple, le jour précédent).

{{< img src="real_user_monitoring/explorer/watchdog_insights/overview.png" alt="Fiches de la bannière de Watchdog Insights dans le RUM Explorer" style="width:100%;" >}}

Cliquez sur une singularité sur lʼ[erreur](#erreur-outliers) ou sur la [latence](#latency-outliers) pour interagir avec les visualisations intégrées dans le panneau latéral et trouver des vues dans la liste des événements. Cliquez sur **View all** pour voir toutes les singularités sur les erreurs en suspens dans un panneau latéral. 

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_m_card-3.png" alt="Vue de la fiche de la bannière des singularités sur lʼerreur et de la fiche du volet latéral dans le RUM Explorer" style="width:100%;" >}}

Survolez une fiche dans la bannière et cliquez sur **Filter on Insight** pour ajouter le comportement anormal d'insight à votre requête de recherche. Par exemple, vous pouvez vous concentrer sur un chemin d'affichage particulier ou un continent spécifique comme `North America`. 

Cliquez sur **View in Analytics** pour définir automatiquement les formules `Group into fields` et sélectionnez le type `Visualize as` sous la requête de recherche pour refléter le comportement de singularité de la fiche. Par exemple, vous pouvez créer un graphique de séries temporelles représentant un taux d'erreur anormalement élevé lors d'un test Synthetic en utilisant `synthetics.test_id` dans une formule de recherche et en l'exportant vers un monitor ou un dashboard.

## Error outlier

Les champs d'affichage des singularités sur les erreurs tels que [tags ou attributs des facettes][3] contiennent les caractéristiques des erreurs qui correspondent à la requête de recherche en cours. Les paires `key:value` statistiquement surreprésentées parmi les erreurs peuvent fournir des indications sur la cause première des problèmes. Les exemples typiques de singularités sur les erreurs comprennent `env:staging`, `version:1234` et `browser.name:Chrome`.

Les informations suivantes sont accessibles depuis la **fiche de la bannière** :

* Le nom du cham
* La proportion du nombre d'erreurs et d'événements RUM globaux associés au champ en question
* Tags associés

Le **volet latéral développé** comporte un graphique de série temporelle représentant le nombre total d'erreurs RUM avec le champ, des graphiques à secteurs illustrant l'impact, ainsi que la liste des événements RUM contenant le champ.

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_side_panel-1.png" alt="Volet latéral développé d'une singularité sur des erreurs" style="width:100%;" >}}

## Latency outlier

Les singularités sur la latence affichent des champs, comme des [tags ou attributs à facettes][3], qui sont associés aux goulots d'étranglement pour la requête de recherche actuelle. Les paires `key:value` dont les performances sont inférieures à la référence mettent en lumière la nature des goulots d'étranglement parmi un sous-ensemble d'utilisateurs réels.

Les singularités sur la latence sont calculées pour les [signaux Web essentiels][4], comme les mesures First Contentful Paint, First Input Delay, Cumulative Layout Shift, ainsi que pour la [durée de chargement][5]. Pour en savoir plus, consultez la section [Surveillance des performances de pages][4].

Les informations suivantes sont accessibles depuis la **fiche de la bannière** :

* Le nom du cham
* La valeur de la métrique de performance contenant le champ et la référence pour le reste des données

Le **volet latéral développé** comporte un graphique de série temporelle représentant la métrique de performance. L'axe des abscisses est gradué avec les valeurs `p50`, `p75`, `p99` et `max`. La liste des événements RUM contenant le champ est également affichée.

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_side_panel-1.png" alt="Volet latéral développé de la singularité sur la latence" style="width:100%;" >}}

Vous pouvez commencer à rechercher la cause première d'un problème de performance dans ce graphique de séries temporelles.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/watchdog/insights/
[2]: /fr/real_user_monitoring/explorer
[3]: /fr/real_user_monitoring/explorer/search/#facets
[4]: /fr/real_user_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[5]: /fr/real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa