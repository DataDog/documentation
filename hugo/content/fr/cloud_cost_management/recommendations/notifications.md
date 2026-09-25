---
description: Configurez des règles de notification qui envoient un résumé récurrent
  sur Slack ou Microsoft Teams de Cloud Cost Recommendations correspondant à un périmètre
  que vous définissez.
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Cloud Cost Management
- link: /cloud_cost_management/recommendations/
  tag: Documentation
  text: Cloud Cost Recommendations
- link: /cloud_cost_management/recommendations/cost_optimization_automation/
  tag: Documentation
  text: Automatisations d'optimisation des coûts
title: Notifications
---
## Présentation {#overview}

Une règle de notification envoie un résumé récurrent sur Slack ou Microsoft Teams des [recommandations Cloud Cost][1] correspondant à un périmètre que vous définissez, sans effectuer d'action sur vos ressources. Utilisez une règle de notification lorsque vous souhaitez avoir une visibilité sur les nouvelles opportunités d'économies sans configurer Datadog pour effectuer des modifications automatiquement.

Les règles de notification sont différentes des [Cost Optimization Automations][2], qui agissent directement sur les recommandations selon un planning récurrent.

## Prérequis {#prerequisites}

- L'autorisation **Cloud Cost Management - Cloud Cost Management Write** pour créer ou modifier une règle de notification.
- Un espace de travail Slack ou un tenant Microsoft Teams avec l'application Datadog installée. Consultez l'[intégration Slack][3] ou l'[intégration Microsoft Teams][5]. Pour un canal Slack privé, ajoutez l'application Datadog Slack à ce canal avant de le sélectionner comme destination.

## Configurer une règle de notification {#set-up-a-notification-rule}

Pour configurer une règle de notification :

1. Accédez à [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Optimize{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}][4].
1. Sélectionnez l'onglet {{< ui >}}Notification{{< /ui >}}.
1. Dans la section {{< ui >}}Define scope{{< /ui >}}, utilisez les filtres {{< ui >}}Team{{< /ui >}}, {{< ui >}}Recommendation Type{{< /ui >}} et {{< ui >}}Env{{< /ui >}} pour restreindre la notification aux ressources correspondantes. Cliquez sur {{< ui >}}\+ Filter{{< /ui >}} pour ajouter d'autres filtres. Laissez les filtres vides pour inclure toutes les ressources.
1. Dans la section {{< ui >}}Set schedule{{< /ui >}}, sélectionnez la fréquence de notification, le jour d'exécution, l'heure d'exécution et le fuseau horaire.
1. Dans la section {{< ui >}}Destination{{< /ui >}}, sélectionnez {{< ui >}}Slack{{< /ui >}} ou {{< ui >}}Microsoft Teams{{< /ui >}}, puis sélectionnez un espace de travail et un canal (Slack) ou un tenant, une équipe et un canal (Microsoft Teams).
1. Saisissez un nom pour la règle de notification.
1. (Facultatif) Mentionnez des utilisateurs Slack spécifiques dans le message de notification.
1. (Facultatif) Désactivez le commutateur {{< ui >}}Notification enabled{{< /ui >}} pour créer la règle sans l'activer.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

## Gérer les règles de notification {#manage-notification-rules}

L'onglet {{< ui >}}Notification{{< /ui >}} répertorie toutes les règles de notification de votre organisation. Depuis cette page, vous pouvez :

- Activer ou désactiver une règle sans la supprimer
- Modifier le périmètre, le planning, la destination ou le nom d'une règle
- Supprimer une règle

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/cloud_cost_management/recommendations/
[2]: /fr/cloud_cost_management/recommendations/cost_optimization_automation/
[3]: /fr/integrations/slack/
[4]: https://app.datadoghq.com/cost/optimize/automations
[5]: /fr/integrations/microsoft_teams/