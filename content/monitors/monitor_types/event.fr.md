---
title: Monitor d'événements
kind: documentation
description: "Monitorez les événements collectés par Datadog"
further_reading:
- link: "monitors/notifications"
  tag: "Documentation"
  text: Configurez les notifications de votre monitor
- link: "monitors/downtimes"
  tag: "Documentation"
  text: Planifiez un downtime pour désactiver un monitor
- link: "monitors/monitor_status"
  tag: "Documentation"
  text: Consulter le statut de de votre monitor.
---

## Aperçu

Les monitors d'événements vous permettent d'être alerté lorsqu'un événement correspondant à votre requête se produit.

1. Sélectionnez la requête et les paramètres (statut, priorité, sources et tags) que vous souhaitez surveiller:
    {{< img src="monitors/monitor_types/event/event_monitor_selection.png" alt="event monitor selection" responsive="true" style="width:80%;">}}
2. Sélectionnez le groupe d'alertes:
    {{< img src="monitors/monitor_types/event/event_alert_grouping.png" alt="event monitor alert grouping" responsive="true" style="width:80%;">}}

3. Sélectionnez les **conditions d'alerte**. Les options **valeur de seuil** et **horizon temporel** vous permettent de définir le nombre d'occurrences d'un événement requis pendant une période de temps avant de déclencher le monitor.
    {{< img src="monitors/monitor_types/event/event_monitor_alert_conditions.png" alt="event monitor alert conditions" responsive="true" style="width:80%;">}}

4. Configurez les **options de vos notifications**:
    Reportez-vous à la page de documentation dédiée [Notifications] (#monitor-notifications) pour plus d'informations.

## Utilisation de tags d'événement dans les monitors d'événements

Dans les monitors d'événements, vous pouvez utiliser les tags envoyées avec des événements pour identifier les événements et personnaliser les actions et les messages du monitor. D'abord, définissez les paramètres pour la recherche dans le texte des événements. Si vous recherchez un tag spécifique, vous pouvez également l'inclure dans la recherche. Par exemple:
Mon exemple d'événement #exemple-tag

Note: vous devrez peut-être échapper des caractères spéciaux en utilisant un slash lors de la recherche. Par exemple, si vous voulez rechercher la chaîne "my_tag_name", vous devrez utiliser "my/_tag/_name"

{{< img src="monitors/monitor_types/event/define_event.png" alt="define_event" responsive="true" style="width:80%;">}}

Vous pouvez ensuite utiliser `event.tags` et `event.tags.tagname` pour récupérer les valeurs de vos tags dans le markdown. Par exemple:

{{< img src="monitors/monitor_types/event/whats_happening.png" alt="whats_happening" responsive="true" style="width:80%;">}}

Vous devriez alors observer que votre alerte se déclenche lorsque des événements correspondants sont trouvés dans Datadog et que les tags apparaissent dans le message.

{{< img src="monitors/monitor_types/event/triggered_event.png" alt="triggered_event" responsive="true" style="width:80%;">}}

## Utilisation de variables de modèle d'événement dans les notifications

Incluez des informations spécifiques à l'événement dans les notifications de votre monitor d'événements, les variables de modèle disponibles sont les suivantes:

* `{{event.id}}` : Id de votre événement
* `{{event.title}}`: Titre de votre événement
* `{{event.text}}`: Texte de votre événement
* `{{event.host.name}}`: Hostname qui a généré l'événement
* `{{event.tags.tagname}}`: Les Tags attaché à votre événement, remplacez `tagname` par le nom de votre tag

{{< img src="monitors/monitor_types/event/event_notification_template.png" alt="event_notification_template" responsive="true" style="width:80%;">}}

## En apprendre plus
{{< partial name="whats-next/whats-next.html" >}}

