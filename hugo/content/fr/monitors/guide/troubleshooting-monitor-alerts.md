---
further_reading:
- link: https://docs.datadoghq.com/monitors/guide/alert-on-no-change-in-value/
  tag: Guide
  text: Recevoir une alerte en cas d'absence de changement d'une valeur
- link: https://docs.datadoghq.com/monitors/guide/set-up-an-alert-for-when-a-specific-tag-stops-reporting/
  tag: Guide
  text: Recevoir une alerte lorsqu'un tag spécifique ne transmet plus de données
- link: https://docs.datadoghq.com/monitors/guide/prevent-alerts-from-monitors-that-were-in-downtime/
  tag: Guide
  text: Empêcher des monitors de générer des alertes pendant un downtime
- link: https://www.datadoghq.com/blog/datadog-recommended-monitors/
  tag: Blog
  text: Activer les alertes préconfigurées avec les monitors recommandés
- link: https://www.datadoghq.com/blog/datadog-recommended-monitors/
  tag: Blog
  text: Surveiller les alertes et les événements avec OpsGenie et Datadog
- link: https://www.datadoghq.com/blog/set-and-monitor-slas/
  tag: Blog
  text: Surveiller des services et définir des SLA avec Datadog

title: Dépanner les alertes de monitor
---

## Présentation

Ce guide présente certains concepts fondamentaux qui vous aideront à déterminer si votre monitor envoie bien les bonnes alertes. Si vous estimez que les évaluations faites par votre monitor ne reflètent pas fidèlement les données sous-jacentes, reportez-vous aux sections ci-dessous lorsque vous inspectez votre monitor.

### État et statut du monitor

Les *évaluations* des monitors sont sans état, c'est-à-dire que le résultat d'une évaluation donnée n'a aucun lien avec ceux des évaluations précédentes. En revanche, les monitors ont un état qui est mis à jour en fonction des résultats de l'évaluation de leurs requêtes et de leurs configurations. Lorsque l'évaluation faite par un monitor renvoie un statut donné, cela ne signifie par forcément que l'état du monitor sera défini sur ce même statut. Voici quelques exemples de causes possibles :

#### Nombre de métriques insuffisant dans la fenêtre d'évaluation d'un monitor de métrique

Si la fenêtre d'évaluation d'un monitor ne contient aucune métrique et que ce monitor n'a pas été configuré pour anticiper les [conditions d'absence de données][1], l'évaluation peut être ignorée ou `skipped`. Dans ce cas, l'état du monitor n'est pas mis à jour : par exemple, un monitor avec l'état `OK` conservera cet état, tout comme un monitor qui affiche l'état `Alert`. Vous avez la possibilité de sélectionner le groupe et l'intervalle de temps qui vous intéressent depuis le graphique [History][2] de la page de statut du monitor. Si les données sont peu fournies, consultez la section [Surveillance des métriques arithmétiques et creuses][3] pour en savoir plus.

#### Mises à jour de l'état d'un monitor en raison de conditions externes

L'état d'un monitor peut également parfois se mettre à jour alors qu'aucune évaluation n'a eu lieu, par exemple suite à un [rétablissement automatique][4].

### Vérifier la présence de données

Si l'état ou le statut de votre monitor vous semble anormal, vérifiez le comportement de la source de données sous-jacente. Pour un monitor de métrique, vous pouvez utiliser le graphique [History][2] pour afficher les points de données récupérés par la requête de la métrique. Pour analyser plus en détail l'évolution de vos métriques, cliquez sur **Open in a notebook** sur le graphique des statuts. Un [notebook][20] sera alors généré avec un graphique formaté de la requête du monitor pour vous permettre d'enquêter.

{{< img src="monitors/monitor_status/notebook-button2.png" alt="La page de statut du monitor avec le curseur de la souris survolant le bouton Open in a notebook à côté de la barre de statut d'un groupe de monitors" style="width:60%;">}}

### Conditions d'alerte

Un comportement inattendu du monitor peut parfois être dû à une mauvaise configuration des [conditions d'alerte][5], qui varient selon le [type de monitor][6]. Si la requête de votre monitor utilise la fonction `as_count()`, consultez le guide [`as_count()` dans les évaluations de monitors][7].

Si vous utilisez des seuils de rétablissement, vérifiez les conditions mentionnées dans le [guide sur les seuils de rétablissement][8] pour voir si le comportement est normal.

### Statut du monitor et groupes

Pour les évaluations et l'état du monitor, le statut est déterminé en fonction du groupe.

Pour un monitor à alertes multiples, un groupe est un ensemble de tags associés à une valeur pour chaque clé de regroupement (par exemple, `env:dev, host:myhost` pour un monitor regroupé en fonction de `env` et `host`). Pour un monitor à alerte simple, il n'y a qu'un seul groupe (`*`), qui représente tout ce qui se trouve dans le contexte du monitor.

Par défaut, Datadog conserve les groupes de monitors dans l'interface pendant 24 heures, ou 48 heures pour les monitors de host, sauf si la requête est modifiée. Pour en savoir plus, consultez la section [Surveiller les modifications de paramètres non appliquées][9].

Si vous prévoyez de créer de nouveaux groupes de monitors dans le contexte de vos monitors à alertes multiples, nous vous conseillons de configurer un délai pour l'évaluation de ces nouveaux groupes. Vous éviterez ainsi de recevoir des alertes alors que les nouveaux groupes se comportent normalement, par exemple en cas d'utilisation intensive des ressources lors de la création d'un nouveau conteneur. Pour en savoir plus, consultez la section [Délai pour les nouveaux groupes][10].

Si votre monitor interroge des métriques cloud basées sur un crawler, appliquez un [délai d'évaluation][11] pour vous assurer que les métriques ont bien été reçues avant le début de l'évaluation. Pour en savoir plus sur les délais d'actualisation des crawlers pour les intégrations cloud, consultez la section [Délai de réception des métriques cloud][12] .

### Problèmes de notification

Si votre monitor se comporte normalement mais génère des notifications indésirables, il existe plusieurs façons d'atténuer ou d'éliminer le problème :

- Pour les monitors qui changent rapidement d'état, la section [Limiter le bagottement des alertes][13] indique comment minimiser les alertes superflues.
- Si vous recevez des alertes attendues ou qui ne sont pas utiles pour votre organisation, la fonction [Downtimes][14] vous permet de supprimer les notifications indésirables.
- Pour contrôler l'acheminement des alertes, utilisez des [template variables][15] et séparez les états **warning** ou **alert** avec des [variables conditionnelles][16].

#### Absence de notifications

Si vous pensez que les notifications ne sont pas correctement envoyées, vérifiez les éléments ci-dessous pour vous assurer que vous êtes bien en mesure de les recevoir :

- Consultez les [préférences de notification par e-mail][17] du destinataire et assurez-vous que la case `Notification from monitor alerts` est cochée.
- Vérifiez la présence d'événements comportant la chaîne `Error delivering notification` dans le [flux d'événements][18].

#### Notifications multiples avec OpsGenie

Si vous utilisez plusieurs notifications `@opsgenie-[...]` dans votre monitor, ces notifications sont envoyées avec le même alias à OpsGenie.
En raison d'une [fonctionnalité de Opsgenie][19], Opsgenie rejettera tous les doublons apparents.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/configuration/?tabs=thresholdalert#no-data
[2]: /fr/monitors/manage/status/#history
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
[18]: /fr/events/stream
[19]: https://docs.opsgenie.com/docs/alert-deduplication
[20]: /fr/notebooks