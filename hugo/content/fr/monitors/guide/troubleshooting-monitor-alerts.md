---
description: Résolvez les problèmes courants d'alerte de moniteur, notamment les incohérences
  d'état, la vérification des données, les conditions d'alerte et les problèmes de
  notification.
further_reading:
- link: https://docs.datadoghq.com/monitors/guide/alert-on-no-change-in-value/
  tag: Guide
  text: Alerter en cas d'absence de changement de valeur
- link: https://docs.datadoghq.com/monitors/guide/set-up-an-alert-for-when-a-specific-tag-stops-reporting/
  tag: Guide
  text: Configurez une alerte pour le moment où un tag spécifique cesse de transmettre
    des données
- link: https://docs.datadoghq.com/monitors/guide/prevent-alerts-from-monitors-that-were-in-downtime/
  tag: Guide
  text: Empêchez les alertes provenant de moniteurs qui étaient en downtime
- link: https://www.datadoghq.com/blog/datadog-recommended-monitors/
  tag: Blog
  text: Activez les alertes préconfigurées avec des modèles de moniteur
- link: https://www.datadoghq.com/blog/datadog-recommended-monitors/
  tag: Blog
  text: Surveillez les alertes et les événements avec OpsGenie et Datadog
- link: https://www.datadoghq.com/blog/set-and-monitor-slas/
  tag: Blog
  text: Surveillance des services et définition des SLA avec Datadog
title: Dépannage des alertes de moniteur
---
## Présentation {#overview}

Ce guide fournit un aperçu de certains concepts fondamentaux qui peuvent vous aider à déterminer si le comportement d'alerte de votre moniteur est valide. Si vous soupçonnez que les évaluations de votre moniteur ne reflètent pas fidèlement les données sous-jacentes, utilisez ce guide pour inspecter votre moniteur et résoudre les problèmes suivants :
- [Comportement de l'état et du statut du moniteur](#monitor-state-and-status)
- [Disponibilité des données et problèmes d'évaluation](#data-availability-and-evaluation-issues)
- [Configuration des conditions d'alerte](#alert-conditions)
- [Groupes de moniteurs et rétention](#monitor-groups-and-retention)
- [Problèmes de notification](#notification-issues)

## État et statut du moniteur {#monitor-state-and-status}

Bien que les *évaluations* de moniteur soient sans état, ce qui signifie que le résultat d'une évaluation donnée ne dépend pas des résultats des évaluations précédentes, les moniteurs eux-mêmes conservent un état, qui est mis à jour en fonction des résultats d'évaluation de leurs requêtes et configurations. Une évaluation de moniteur avec un statut donné ne fera pas nécessairement passer l'état du moniteur à ce même statut.

### Comment le statut est suivi {#how-status-is-tracked}

Pour les évaluations de moniteur comme pour l'état, le statut est suivi par groupe. Pour un moniteur multi-alertes, un groupe est un ensemble de tags avec une valeur pour chaque clé de regroupement (par exemple, `env:dev, host:myhost` pour un moniteur regroupé par `env` et `host`). Pour une alerte simple, il n'y a qu'un seul groupe (`*`), représentant tout ce qui se trouve dans le périmètre du moniteur.

### Lorsque l'état ne correspond pas à l'évaluation {#when-state-doesnt-match-evaluation}

L'état d'un moniteur peut aussi parfois se mettre à jour en l'absence d'évaluation du moniteur, par exemple, en raison de la [résolution automatique][4].

## Disponibilité des données et problèmes d'évaluation {#data-availability-and-evaluation-issues}

Si l'état ou le statut de votre moniteur n'est pas celui que vous attendez, confirmez le comportement de la source de données sous-jacente. Pour un moniteur de métriques, vous pouvez utiliser le graphique [historique][2] pour visualiser les points de données récupérés par la requête de métrique. Les groupes `N/A` ne sont pas inclus dans les moniteurs mais sont visibles dans les requêtes de dashboard.

### Métriques éparses {#sparse-metrics}

Si des métriques sont absentes de la fenêtre d'évaluation d'un moniteur, et que le moniteur n'est pas configuré pour anticiper les [conditions de non-données][1], l'évaluation peut être `skipped`. Dans un tel cas, l'état du moniteur n'est pas mis à jour, donc un moniteur précédemment dans l'état `OK` reste `OK`, et de même pour un moniteur dans l'état `Alert`. Utilisez le graphique [historique][2] sur la page d'état du moniteur et sélectionnez le groupe et la période souhaités. Si les données sont éparses, consultez [arithmétique de moniteur et métriques éparses][3] pour plus d'informations.

### Statut « No Data » avec les fonctions de rollup {#no-data-status-with-rollup-functions}

Si vos moniteurs passent de manière inattendue au statut « No Data », envisagez de revoir vos paramètres de rollup et de fenêtre d'évaluation. Par exemple, si un moniteur utilise un rollup de 4 minutes et une fenêtre d'évaluation de 20 minutes, il produit un point de données toutes les 4 minutes, soit un maximum de 5 points de données dans la fenêtre. Si l'option {{< ui >}}Require Full Window{{< /ui >}} est activée, l'évaluation peut aboutir au statut « No Data », car la fenêtre n'est pas entièrement remplie.

Pour la plupart des cas d'utilisation, désactivez le paramètre {{< ui >}}Require Full Window{{< /ui >}} à moins que votre scénario spécifique ne nécessite des données complètes pour une évaluation précise. Pour plus d'informations, consultez [Rollups dans les moniteurs][21].

### Délais des métriques cloud {#cloud-metric-delays}

Si votre moniteur interroge des métriques cloud basées sur des crawlers, utilisez un [délai d'évaluation][11] pour vous assurer que les métriques sont arrivées avant que le moniteur ne procède à l'évaluation. Lisez [délai de métrique cloud][12] pour plus d'informations sur les planifications des crawlers d'intégration cloud.

## Conditions d'alerte {#alert-conditions}

Un comportement inattendu du moniteur peut parfois résulter de [conditions d'alerte][5] mal configurées, qui varient selon le [type de moniteur][6]. Si votre requête de moniteur utilise la fonction `as_count()`, consultez le guide [`as_count()` dans les évaluations de moniteur][7].

Si votre moniteur envoie des alertes de manière inattendue, vérifiez que vous utilisez l'agrégateur correct pour votre cas d'utilisation. Consultez le [guide des agrégateurs de moniteur][22] pour obtenir des exemples de la façon dont chaque méthode d'agrégation affecte le comportement des alertes.

Si vous utilisez des seuils de récupération, vérifiez les conditions listées dans le [guide des seuils de récupération][8] pour voir si le comportement est attendu.

### Délais pour les nouveaux groupes {#new-group-delays}

Si vous prévoyez de créer de nouveaux groupes de moniteurs dans le périmètre de vos moniteurs à alertes multiples, vous souhaiterez peut-être configurer un délai pour l'évaluation de ces nouveaux groupes. Cela peut vous aider à éviter les alertes dues au comportement attendu des nouveaux groupes, comme une utilisation élevée des ressources associée à la création d'un nouveau conteneur. Consultez [délais pour les nouveaux groupes][10] pour plus d'informations.

## Groupes de moniteurs et rétention {#monitor-groups-and-retention}

Datadog conserve les groupes de moniteurs disponibles dans l'interface utilisateur pendant une période de rétention après qu'ils ont cessé de transmettre des données, sauf si la requête change. Cette période de rétention affecte la durée pendant laquelle les groupes de moniteurs restent visibles et continuent d'être évalués. La période de rétention dépend du type de moniteur et de sa configuration. Pour plus de détails, consultez [Durée de rétention des groupes][23].

Pour des informations détaillées sur la persistance des groupes de moniteurs, y compris sur la façon de gérer les hôtes renommés ou mis hors service qui continuent d'apparaître dans les alertes, consultez [Les modifications des paramètres du moniteur ne prennent pas effet][9].

## Problèmes de notification {#notification-issues}

Si votre moniteur se comporte comme prévu, mais génère des notifications indésirables, il existe plusieurs options pour réduire ou supprimer les notifications :

- Pour les moniteurs qui changent rapidement d'état, consultez [réduire les changements d'état répétés des alertes][13] pour découvrir comment limiter la fatigue liée aux alertes.
- Pour les alertes attendues ou qui ne sont pas utiles à votre organisation, utilisez les [Downtimes][14] pour supprimer les notifications indésirables.
- Pour contrôler le routage des alertes, utilisez des [variables de modèle][15] et la séparation des états {{< ui >}}warning{{< /ui >}} ou {{< ui >}}alert{{< /ui >}} avec des [variables conditionnelles][16].

### Notifications manquantes {#missing-notifications}

Si vous pensez que les notifications ne sont pas correctement distribuées, vérifiez les éléments ci-dessous pour vous assurer qu'elles peuvent être distribuées :

- Vérifiez les [préférences d'e-mail][17] du destinataire et assurez-vous que {{< ui >}}Notification from monitor alerts{{< /ui >}} est coché.
- Recherchez `@evt.type:integration_sync_failure` dans [Events Explorer][18]. Datadog utilise ce type d'événement pour les erreurs qui surviennent lors de l'envoi vers une intégration, comme les échecs de notification vers Slack, Microsoft Teams, PagerDuty, Opsgenie ou des webhooks. Les titres varient selon l'intégration ; examinez donc le titre et le message de l'événement pour identifier la destination concernée.
- Les notifications par e-mail ne créent pas ces événements.

### Notifications multiples Opsgenie {#opsgenie-multi-notifications}

Si vous utilisez plusieurs notifications `@opsgenie-[...]` dans votre moniteur, nous envoyons ces notifications avec le même alias à Opsgenie. En raison d'une [fonctionnalité Opsgenie][19], Opsgenie rejettera ce qui est considéré comme un doublon.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/configuration/?tabs=thresholdalert#no-data
[2]: /fr/monitors/status/#history
[3]: /fr/monitors/guide/monitor-arithmetic-and-sparse-metrics/
[4]: /fr/monitors/configuration/?tabs=thresholdalert#auto-resolve
[5]: /fr/monitors/configuration/?tabs=thresholdalert#set-alert-conditions
[6]: /fr/monitors/types
[7]: /fr/monitors/guide/as-count-in-monitor-evaluations/
[8]: /fr/monitors/guide/recovery-thresholds/#behavior
[9]: /fr/monitors/guide/why-did-my-monitor-settings-change-not-take-effect
[10]: /fr/monitors/configuration/?tabs=thresholdalert#new-group-delay
[11]: /fr/monitors/configuration/?tabs=thresholdalert#evaluation-delay
[12]: /fr/integrations/faq/cloud-metric-delay/
[13]: /fr/monitors/guide/reduce-alert-flapping/
[14]: /fr/monitors/guide/suppress-alert-with-downtimes/
[15]: /fr/monitors/notify/variables/?tab=is_alert&tabs=is_alert#template-variables
[16]: /fr/monitors/notify/variables/?tab=is_alert&tabs=is_alert#conditional-variables
[17]: /fr/account_management/#preferences
[18]: /fr/events/explorer/
[19]: https://docs.opsgenie.com/docs/alert-deduplication
[20]: /fr/notebooks
[21]: /fr/dashboards/functions/rollup/#rollups-in-monitors
[22]: /fr/monitors/guide/monitor_aggregators/
[23]: /fr/monitors/configuration/?tab=thresholdalert#group-retention-time