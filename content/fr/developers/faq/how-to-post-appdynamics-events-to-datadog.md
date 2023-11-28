---
kind: faq
title: Envoyer des événements AppDynamics dans Datadog
---

Cet article vous explique comment envoyer des événements issus de votre application AppDynamics dans votre Events Explorer Datadog.
**Remarque** : ce plug-in a été écrit par l'équipe d'AppDynamics et n'est pas pris en charge par Datadog. En cas de problèmes, veuillez [contacter l'équipe d'assistance d'AppDynamics][1].

Prérequis : utiliser AppDynamics 4.1 ou une version ultérieure

Pour commencer, créez un template HTTP de violation unique de la stratégie Datadog :

```json
{
  "title": "${latestEvent.displayName} - ${policy.name} ",
  "text": "${latestEvent.summaryMessage} ${latestEvent.guid} ${latestEvent.eventTypeKey} Nom de la stratégie - ${policy.name} ID de la stratégie - ${policy.id}  Digest de la stratégie : ${policy.digest} ${policy.digestDurationInMins} ",
  "alert_type": "${topSeverity}",
  "priority": "${priority}",
  "aggregation_key": " ${policy.id} ",
  "tags": [
    "guid:${latestEvent.guid}",
    "eventid:${latestEvent.id}",
    "environment:${Environment}",
    "os:${OS}",
    "platform:${Platform}"
  ]
}
```

{{< img src="developers/faq/step_1_appdynamics.png" alt="appdynamics_étape_1" >}}

Dernier événement :

```json
{
  "title": "${latestEvent.displayName}",
  "text": "${latestEvent.summaryMessage} ${latestEvent.eventTypeKey}",
  "alert_type": "${topSeverity}",
  "priority": "${priority}",
  "aggregation_key": "${latestEvent.guid}",
  "tags": [
    "guid:${latestEvent.guid}",
    "eventid:${latestEvent.id}",
    "environment:${Environment}",
    "os:${OS}",
    "platform:${Platform}"
  ]
}
```

{{< img src="developers/faq/latest_event.png" alt="dernier_événement" >}}

Vous pouvez également utiliser des templates d'e-mail :

```json
{
  "title": "AppDynamicsEvent",
  "text": "ApplicationChangeEvent",
  "priority": "normal",
  "tags": ["os:windows"],
  "alert_type": "info"
}
```

{{< img src="developers/faq/email_template.png" alt="template_e-mail" >}}

[1]: https://www.appdynamics.com/support