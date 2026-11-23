---
aliases:
- /fr/service_management/events/correlation/triage_and_notify/
further_reading:
- link: events/correlation/
  tag: Documentation
  text: En savoir plus sur la corrélation d'événements
title: Triez et notifiez
---
{{< img src="events/correlation/triage/triage.png" alt="Page de détails de cas avec un panneau latéral d'événements. Enquêtez sur les événements corrélés d'un cas et analysez les métriques associées" style="width:100%;" >}}

Event Management corrèle les événements associés et les consolide automatiquement en un seul élément de travail. Rassemblez tout le contexte des logs associés, des métriques associées et des moniteurs d'alerte pour trier et résoudre les problèmes en un seul endroit.

Depuis la page [Corrélation][1], trouvez le schéma que vous souhaitez analyser et cliquez sur {{< ui >}}Triage Work Items{{< /ui >}} à la fin de la même ligne. Vous pouvez également cliquer sur {{< ui >}}Work Management{{< /ui >}} en haut de la page pour afficher tous les éléments de travail avec des événements corrélés dans [Work Management][2]. Datadog récupère les métriques et les logs associés afin que vous puissiez résoudre les problèmes avec toutes les données associées en un seul endroit.

## Élément de travail Event Management {#event-management-work-item}

| Fonctionnalité | Description | 
| ------  | ----------- | 
| Priorité | priorité la plus élevée des alertes corrélées |
| Attribut | tags issus d'événements corrélés. les mises à jour utilisateur ne seront pas écrasées par le moteur |
| Statut | géré automatiquement par le système, les mises à jour utilisateur seront écrasées par le système. Les éléments de travail se résolvent automatiquement lorsque toutes les alertes sous-jacentes sont rétablies et se rouvrent automatiquement lorsqu'une alerte est redéclenchée pendant la fenêtre de temps de vie maximale |
| Suppression | cochez la case sur l'alerte pour supprimer toute alerte non pertinente, les alertes supprimées ne seront plus corrélées |
| Alertes enrichies | certains éléments de travail seront automatiquement enrichis avec des alertes intelligentes que Datadog juge pertinentes en fonction de votre infrastructure. Les alertes enrichies n'ont pas d'impact sur l'attribut, la priorité et le statut de l'élément de travail |


Pour plus d'informations sur les opérations de Work Management, consultez la [documentation Work Management][5].

### Enquête {#investigation}
1. Dans Overview de l’élément de travail, cliquez sur {{< ui >}}Investigation{{< /ui >}}
1. Sous la section {{< ui >}}Correlations{{< /ui >}}, vous pouvez voir une liste d'alertes et d'événements
1. Cliquez sur l'une des alertes ou l'un des événements pour afficher toutes les métriques et tous les journaux associés dans le contexte de l'alerte
1. (Facultatif) Sélectionnez les alertes ou les événements que vous souhaitez supprimer et qui ne sont pas liés à l'élément de travail
1. Sous la section {{< ui >}}Related Metrics{{< /ui >}}, comparez toutes les métriques associées ou regroupez-les par tags


## Créez une notification ou un ticket {#create-a-notification-or-ticket}

Avec les événements corrélés, vous pouvez configurer une notification pour un groupe. Ainsi, au lieu d'avoir 20 notifications et 20 problèmes potentiels à examiner, vous avez un seul élément de travail et une seule notification. Combinez toutes vos alertes sur la page Work Management Projects. Il existe plusieurs façons de regrouper les notifications dans Work Management :

### Ticketing {#ticketing}

Sur la page {{< ui >}}Project Settings{{< /ui >}}, configurez les intégrations vers lesquelles vous souhaitez que vos projets envoient des notifications. Datadog prend en charge les intégrations suivantes avec création de tickets manuelle et automatique, et synchronisation bidirectionnelle :
- ServiceNow
- Jira

Pour les instructions de configuration, consultez la documentation [Work Management Settings][3].

## Notifications {#notifications}

Dans Work Management, les _vues_ regroupent les éléments de travail en fonction d'une requête configurée. Vous pouvez configurer une notification lorsqu'un élément de travail correspondant à cette requête est créé. Datadog prend en charge {{< ui >}}Pagerduty{{< /ui >}}, {{< ui >}}Email{{< /ui >}}, {{< ui >}}Webhook{{< /ui >}}, {{< ui >}}Microsoft Teams{{< /ui >}} et {{< ui >}}Slack{{< /ui >}}. Pour savoir comment créer une vue, consultez la documentation [Work Management Views][4].

**Remarque** : vous devez reconfigurer les moniteurs sous-jacents pour supprimer les notifications multiples. Le regroupement des événements de surveillance ne désactive pas les notifications individuelles.


[1]: https://app.datadoghq.com/event/correlation
[2]: https://app.datadoghq.com/work?query=status%3AOPEN%20creation_source%3AEVENT_MANAGEMENT&page=1&page-size=25&sort=created_at
[3]: /fr/incident_response/work_management/settings#set-up-integrations
[4]: /fr/incident_response/work_management/view_and_manage#create-a-view
[5]: /fr/incident_response/work_management/view_and_manage