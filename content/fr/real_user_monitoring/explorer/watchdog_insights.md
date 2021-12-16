---
title: "Watchdog\_Insights pour RUM"
kind: documentation
description: Sachez précisément où regarder pour commencer ou poursuivre vos enquêtes
further_reading:
  - link: /real_user_monitoring/explorer/search/
    tag: Documentation
    text: "En savoir plus sur la fonctionnalité de recherche du RUM\_Explorer"
  - link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals
    tag: Blog
    text: Surveiller les signaux Web essentiels avec le RUM
  - link: https://www.datadoghq.com/blog/datadog-mobile-rum/
    tag: Blog
    text: Améliorer l'expérience utilisateur mobile avec la solution Mobile RUM Datadog
---
## Présentation

Grâce à la fonctionnalité Watchdog Insights de la solution Real User Monitoring (RUM) de Datadog, vous pouvez identifier plus facilement les causes d'origine de vos problèmes en visualisation des informations contextuelles dans le RUM Explorer. Les Watchdog Insights renforcent vos connaissances et confirment vos intuitions en suggérant des anomalies et des goulots d'étranglement nuisant potentiellement à un sous-ensemble d'utilisateurs.

<div class="alert alert-warning">
Watchdog Insights pour RUM est disponible en version bêta. Cette fonctionnalité est proposée aux clients utilisant la solution Real User Monitoring. Si vous souhaitez nous faire part de vos remarques, contactez l'<a href="https://docs.datadoghq.com/help/">assistance Datadog</a>.
</div>

Dans cet exemple, la fonctionnalité Watchdog Insights identifie que l'instance d'application déployée sur `view.url_host:www.shopist.io` génère la majorité des erreurs sur l'intervalle donné (par exemple, les 24 dernières heures).

{{< img src="real_user_monitoring/explorer/watchdog_insights/overview.png" alt="Watchdog Insights" style="width:100%;" >}}

## Navigation

La bannière Watchdog Insights figure sur la page des **résultats RUM Explorer** et contient des insights à propos de la requête actuelle :

{{< img src="real_user_monitoring/explorer/watchdog_insights/banner_collapsed.png" alt="Bannière Watchdog Insights (réduite)" style="width:100%;" >}}

Pour afficher un aperçu de tous les insights, développez la bannière Watchdog Insights :

{{< img src="real_user_monitoring/explorer/watchdog_insights/banner_expanded.png" alt="Bannière Watchdog Insights (développée)" style="width:100%;" >}}

Pour ouvrir entièrement le volet Watchdog Insights, cliquez sur **View all** :

{{< img src="real_user_monitoring/explorer/watchdog_insights/side_panel.png" alt="Volet latéral Watchdog Insights" style="width:100%;" >}}

Chaque insight propose des interactions ainsi qu'un volet latéral affichant des informations de dépannage. Les interactions et le volet latéral varient en fonction du [type d'insight](#collections)

## Collections

### Error outlier

Les insights de type « error outlier » affichent les champs comme les [tags ou attributs à facettes][1] susceptibles d'indiquer une erreur pour la requête actuelle. Les paires `key:value` qui sont statistiquement sur-représentées parmi les erreurs mettent en lumière les causes possibles d'un problème.

Ce type d'insight peut par exemple s'appliquer aux paires `env:staging`, `version:1234` ou `browser.name:Chrome`.

Les informations suivantes sont accessibles depuis la **fiche de la bannière** et la **fiche du volet latéral** :

* Le nom du champ
* La proportion du nombre total d'erreurs et d'événements RUM globaux associés au champ en question

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_m_card.png" alt="Fiches de la bannière et du volet latéral des insights de type error outlier " style="width:100%;" >}}

Depuis le **volet latéral développé**, vous pouvez consulter une série temporelle des erreurs RUM comportant le champ.

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_side_panel.png" alt="Volet latéral développé des insights de type error outlier" style="width:100%;" >}}

### Latency outlier

Les insights de type « latency outlier » affichent les champs comme les [tags ou attributs à facettes][1] associés aux goulots d'étrangement pour la requête actuelle. Les paires `key:value` dont les performances sont inférieures à la référence mettent en lumière la nature des goulots d'étranglement parmi un sous-ensemble d'utilisateurs réels.

Ces insights sont calculés pour les [Core Web Vitals][2] comme First Contentful Paint, First Input Delay et Cumulative Layout Shift, ainsi que pour la [durée de chargement][3].

Les informations suivantes sont accessibles depuis la **fiche de la bannière** :

* Le nom du champ
* La valeur de la métrique de performance contenant le champ et la référence pour le reste des données

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_s_card.png" alt="Fiche de la bannière des insights de type latency outlier" style="width:100%;" >}}

Depuis la **fiche du volet latéral**, vous pouvez consulter une série temporelle de la métrique de performance pour le champ et la référence pour le reste des données.

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_l_card.png" alt="Volet latéral des insights de type latency outlier" style="width:100%;" >}}

Depuis le **volet latéral développé**, vous pouvez parcourir la liste des événements RUM qui contiennent le champ. Consultez le [graphique en cascade des performances][4] pour découvrir la cause à l'origine du problème de performance.

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_side_panel.png" alt="Volet latéral développé des insights de type latency outlier" style="width:100%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/facets/
[2]: /fr/real_user_monitoring/browser/monitoring_page_performance/#core-web-vitals
[3]: /fr/real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa
[4]: /fr/real_user_monitoring/explorer/?tab=facets#event-side-panel