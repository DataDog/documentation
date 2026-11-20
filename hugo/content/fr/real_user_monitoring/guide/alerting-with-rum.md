---
description: Ce guide explique comment créer des alertes basées sur des événements
  RUM.
further_reading:
- link: /real_user_monitoring/dashboards/
  tag: Documentation
  text: Dashboards RUM
- link: /monitors/create/types/real_user_monitoring/
  tag: Documentation
  text: Monitor RUM
- link: /monitors/
  tag: Documentation
  text: Alertes

title: Alertes basées sur les données RUM
---

## Présentation

La solution Real User Monitoring (RUM) vous permet de créer des alertes afin d'être informé en cas de comportements anormaux au sein de vos applications. Vos monitors RUM peuvent inclure des conditions complexes, des seuils prédéfinis, ainsi que plusieurs requêtes permettant de calculer des moyennes, des taux et des métriques sur les performances (comme le score Apdex).

## Définir votre requête de recherche

Pour créer un monitor RUM, commencez par consulter la [section Monitor RUM][1]. Vous pouvez ajouter une ou plusieurs requêtes pour filtrer vos données RUM dans le [RUM Explorer][2]. Pour chaque requête, vous pouvez restreindre vos données à une application ou à une page spécifique pour un contrôle plus précis.

Vous pouvez utiliser les facettes recueillies par RUM, notamment les [facettes et mesures personnalisées][3]. Le champ `measure by` vous permet de mesurer des totaux liés aux vues, comme le temps de chargement, la durée totale et le nombre d'erreurs.

{{< img src="real_user_monitoring/guide/alerting-with-rum/high-rum-views-errors.png" alt="Requête de recherche pour une alerte se déclenchant lorsqu'une vue compte plus de huit erreurs" style="width:100%;">}}

La requête de recherche de l'exemple ci-dessus permet à un monitor RUM de surveiller les vues de l'application Shopist iOS, à l'aide de facettes comme `Application ID` et `View Path`. Cet exemple de monitor génère des alertes lorsqu'une vue compte un nombre élevé d'erreurs (par exemple, plus de huit).

## Exporter votre requête vers un monitor

Vous pouvez exporter des requêtes de recherche depuis le [RUM Explorer][2] vers un monitor afin de conserver tout leur contexte.

{{< img src="real_user_monitoring/guide/alerting-with-rum/export-to-monitor.mp4" alt="Le bouton Export en haut à droite du RUM Explorer" video="true" style="width:100%;" >}}

La requête de recherche de l'exemple ci-dessus permet à un monitor RUM de surveiller les images de plus de 1 Mo. Les images volumineuses sont susceptibles de nuire aux performances de votre application.

Cliquez sur le bouton **Export** pour exporter votre requête de recherche vers un monitor RUM préconfiguré. Pour en savoir plus, consultez la section [Exporter des événements RUM][4].

## Acheminer votre alerte

Une fois votre alerte créée, acheminez-la vers un canal personnel ou d'équipe. Pour ce faire, rédigez un message et envoyez un test de notification. Pour en savoir plus, consultez la section [Notifications][5].

## Exemples d'alertes

Les exemples suivants présentent des scénarios d'utilisation des alertes basées sur vos données RUM

### Chutes des recettes

Grâce au [contexte global][6] de RUM, vous pouvez enrichir vos événements RUM en y ajoutant des attributs commerciaux, comme le montant du panier de chaque utilisateur.

Pour cet exemple, nous partons du principe que la plupart des utilisateurs d'une application dépensent entre 800 et 1 000 $. Ici, le monitor RUM est configuré de façon à identifier les écarts qui se produisent dans les habitudes de dépenses des utilisateurs.

{{< img src="real_user_monitoring/guide/alerting-with-rum/revenue-dips-example-monitor.png" alt="Monitor RUM pour les chutes des recettes" style="width:100%;" >}}

Pour comparer les recettes de cette semaine à celles de la semaine précédente, ajoutez une fonction, par exemple `week_before` pour le champ `roll up every`. Il est également possible de définir une valeur absolue afin de calculer la différence entre les recettes de cette semaine et celles de la semaine précédente. Une notification est alors envoyée lorsque la différence dépasse 50 $.

{{< img src="real_user_monitoring/guide/alerting-with-rum/revenue-dips-example-alerting-conditions.png" alt="Conditions d'alerte pour un monitor RUM lié aux chutes de recettes" style="width:100%;" >}}

### Taux d'erreur

Le taux erreurs/requêtes vous permet de calculer le pourcentage de requêtes qui entraînent des erreurs.

Dans cet exemple, le monitor RUM surveille le taux d'erreur de la page `/cart` sur une application Shop.ist fictive.

{{< img src="real_user_monitoring/guide/alerting-with-rum/error-rate-example-monitor.png" alt="Monitor RUM pour le taux d'erreur" style="width:100%;" >}}

### Statistiques essentielles sur les performances

Real User Monitoring mesure, calcule et agrège au sein d'un score les performances de votre application sous la forme de [signaux Web essentiels][7] et de [signaux mobiles essentiels][8]. Par exemple, le Largest Contentful Paint (LCP) mesure les performances de chargement. Il est généralement admis que l'expérience des utilisateurs est positive lorsque le LCP atteint 2,5 secondes ou moins.

Dans cet exemple, le monitor RUM surveille le LCP de la page `/cart` sur une application Shop.ist fictive.

{{< img src="real_user_monitoring/guide/alerting-with-rum/high-largest-contentful-paint-example-monitor.png" alt="Monitor RUM pour le Largest Contentful Paint" style="width:100%;" >}}

Cet exemple de monitor génère un avertissement lorsque le LCP atteint 2 secondes et une alerte lorsqu'il dépasse 2,5 secondes.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/create/types/real_user_monitoring/#create-a-rum-monitor
[2]: https://app.datadoghq.com/rum/explorer
[3]: /fr/real_user_monitoring/guide/send-rum-custom-actions/#create-facets-and-measures-on-your-new-attributes
[4]: /fr/real_user_monitoring/explorer/export/
[5]: /fr/monitors/notify/
[6]: /fr/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#global-context
[7]: /fr/real_user_monitoring/browser/monitoring_page_performance/#performance-metrics-for-views
[8]: /fr/real_user_monitoring/android/mobile_vitals/