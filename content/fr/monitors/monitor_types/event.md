---
title: Monitor d'événement
kind: documentation
description: Surveiller des événements recueillis par Datadog
further_reading:
  - link: monitors/notifications
    tag: Documentation
    text: Configurer les notifications de vos monitors
  - link: monitors/downtimes
    tag: Documentation
    text: Planifier un downtime pour désactiver un monitor
  - link: monitors/monitor_status
    tag: Documentation
    text: Consulter le statut de votre monitor
---
## Présentation

Les monitors d'événements vous permettent de recevoir une alerte lorsqu'un événement correspondant à votre requête se produit.

1. Sélectionnez la requête et les paramètres (statut, priorité, sources et tags) à surveiller :
    {{< img src="monitors/monitor_types/event/event_monitor_selection.png" alt="sélection monitor d'événement" responsive="true" style="width:80%;">}}
2. Sélectionnez le groupe d'alertes :
    {{< img src="monitors/monitor_types/event/event_alert_grouping.png" alt="groupe d'alerte monitor d'événement" responsive="true" style="width:80%;">}}

3. Sélectionnez les **conditions d'alerte**. Les options **threshold value** et **timeframe** vous permettent de définir le nombre d'occurrences d'un événement requis pendant un intervalle pour déclencher le monitor.
    {{< img src="monitors/monitor_types/event/event_monitor_alert_conditions.png" alt="conditions d'alerte monitor d'événement" responsive="true" style="width:80%;">}}

    **Remarque** : certains fournisseurs accumulent un retard considérable entre l'**envoi** d'un événement et sa réalisation. Lorsque c'est le cas, Datadog antidate l'événement afin d'indiquer la date de sa réalisation. Cela peut entraîner des comportements anormaux pour les monitors. En cas de problème, contactez l'[assistance Datadog][1].
4. Configurez vos **options de notification** :
   Reportez-vous à la page de la documentation dédiée aux [notifications][2] pour en savoir plus.

## Utiliser des tags d'événement dans la page Event Monitors

Depuis la page Event Monitors, vous pouvez utiliser les tags envoyés par des événements pour identifier les événements et personnaliser les actions et les messages du monitor. Définissez d'abord les paramètres de recherche pour la recherche d'événements plein texte. Si vous recherchez un tag spécifique, vous pouvez également l'inclure dans la recherche. Par exemple :

`Mon exemple d'événement #exemple-tag`

{{< img src="monitors/monitor_types/event/define_event.png" alt="définition_événement" responsive="true" style="width:80%;">}}

## Utiliser des template variables d'événements dans des notifications

Ajoutez des informations spécifiques à un événement dans les notifications de votre monitor d'événement. Voici les template variables disponibles :

| Template variable        | Définition                                                               |
|--------------------------|--------------------------------------------------------------------------|
| `{{event.id}}`           | ID de l'événement.                                                          |
| `{{event.title}}`        | Titre de l'événement.                                                       |
| `{{event.text}}`         | Texte de l'événement.                                                        |
| `{{event.host.name}}`    | Hostname à l'origine de l'événement.                                        |
| `{{event.tags.tagname}}` | Tags liés à l'événement ; remplacez `tagname` par le nom de votre tag. |

{{< img src="monitors/monitor_types/event/event_notification_template.png" alt="notification_événément_modèle" responsive="true" style="width:60%;">}}

Utilisez `event.tags` et `event.tags.tagname` pour récupérer les valeurs de vos tags dans le markdown. Par exemple :

{{< img src="monitors/monitor_types/event/whats_happening.png" alt="whats_happening" responsive="true" style="width:60%;">}}

Lorsque votre alerte se déclenche, tous les événements correspondants qui possèdent le tag dans Datadog apparaissent dans le message :

{{< img src="monitors/monitor_types/event/triggered_event.png" alt="événement_déclenché" responsive="true" style="width:60%;">}}

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help
[2]: /fr/monitors/notifications