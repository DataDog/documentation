---
title: Monitor d'événements
kind: documentation
description: "Surveiller des événements recueillis par Datadog"
further_reading:
- link: "monitors/notifications"
  tag: "Documentation"
  text: Configurer les notifications de vos monitors
- link: "monitors/downtimes"
  tag: "Documentation"
  text: Planifier un downtime pour désactiver un monitor
- link: "monitors/monitor_status"
  tag: "Documentation"
  text: Consulter le statut de vos monitors
---

## Présentation

Les monitors d'événements vous permettent de recevoir une alerte lorsqu'un événement correspondant à votre requête se produit.

1. Sélectionnez la requête et les paramètres (statut, priorité, sources et tags) à surveiller 
    {{< img src="monitors/monitor_types/event/event_monitor_selection.png" alt="événement sélection de monitor" responsive="true" style="width:80%;">}}
2. Sélectionnez le groupe d'alertes :
    {{< img src="monitors/monitor_types/event/event_alert_grouping.png" alt="groupe alerte monitor d'événement" responsive="true" style="width:80%;">}}

3. Sélectionnez les **conditions d'alerte**. Les options **threshold value** et **timeframe** vous permettent de définir le nombre d'occurrences d'un événement requis pendant un intervalle pour déclencher le monitor.
    {{< img src="monitors/monitor_types/event/event_monitor_alert_conditions.png" alt="conditions d'alerte du monitor d'événement" responsive="true" style="width:80%;">}}

4. Configurez les **options de vos notifications** :
   Reportez-vous à la page de la documentation dédiée aux [notifications] (#monitor-notifications) pour obtenir plus d'informations.

## Utiliser des tags d'événement dans les monitors d'événements

Depuis la page Event Monitors, vous pouvez utiliser les tags envoyés par des événements pour identifier les événements et personnaliser les actions et les messages du monitor. Définissez d'abord les paramètres de recherche pour la recherche d'événements plein texte. Si vous recherchez un tag spécifique, vous pouvez également l'inclure dans la recherche. Par exemple :
Mon exemple d'événement #exemple-tag

Remarque : vous devrez peut-être « échapper » des caractères spéciaux en utilisant un slash lors de la recherche. Par exemple, si vous souhaitez rechercher la chaîne "mon_nom_tag", vous devrez utiliser  l'expression "mon/_nom/_tag".

{{< img src="monitors/monitor_types/event/define_event.png" alt="définition_événement" responsive="true" style="width:80%;">}}

Vous pouvez ensuite utiliser `event.tags` et `event.tags.tagname` pour récupérer les valeurs de vos tags dans le markdown. Par exemple :

{{< img src="monitors/monitor_types/event/whats_happening.png" alt="whats_happening" responsive="true" style="width:80%;">}}

Votre alerte se déclenche désormais lorsque des événements correspondants sont détectés dans Datadog, et le message associé inclut les tags.

{{< img src="monitors/monitor_types/event/triggered_event.png" alt="événement_déclenché" responsive="true" style="width:80%;">}}

## Utiliser des template variables d'événements dans des notifications

Ajoutez des informations spécifiques à un événement dans les notifications de votre monitor d'événement. Voici la liste des template variables disponibles :

* `{{event.id}}` : ID de votre événement.
* `{{event.title}}` : titre de votre événement.
* `{{event.text}}` : texte de votre événement
* `{{event.host.name}}` : hostname à l'origine de l'événement.
* `{{event.tags.tagname}}` : les tags liés à votre événement ; remplacez `tagname` par le nom de votre tag.

{{< img src="monitors/monitor_types/event/event_notification_template.png" alt="événement_notification_modèle" responsive="true" style="width:80%;">}}

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

