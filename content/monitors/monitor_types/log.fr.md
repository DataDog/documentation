---
title: Monitor de Log
kind: documentation
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

{{< img src="monitors/monitor_types/log/log_monitor_overview.png" alt="Log monitor overview" responsive="true" >}}

## Aperçu

Les monitor de logs alertent lorsqu'un type de log spécifié dépasse un seuil défini par l'utilisateur sur une période donnée. Les cas d'utilisation courants pour ce monitor incluent:

* Suivi des erreurs d'exception générées par votre code
* Notification de build

## Implémentation

1. Définir la requête de recherche:
    {{< img src="monitors/monitor_types/log/define_the_search_query.png" alt="Define the search query" responsive="true" style="width:50%;" >}}
    La requête de recherche a le même comportement que [la recherche de la vue explore des logs][1]

2. Définir les conditions d'alerte:
    {{< img src="monitors/monitor_types/log/set_alert_conditions.png" alt="Set alert conditions" responsive="true" style="width:50%;" >}}

3. Configurez les **options de vos notifications**:
    Reportez-vous à la page de documentation dédiée [Notifications][2] pour plus d'informations.

## En apprendre plus
{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/search/
[2]: /monitors/notifications
