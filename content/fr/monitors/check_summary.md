---
title: Sommaire des checks
kind: documentation
description: Consultez la liste de tous vos checks transmis à Datadog.
further_reading:
  - link: monitors/monitor_types
    tag: Documentation
    text: Apprendre à créer un monitor
  - link: monitors/notifications
    tag: Documentation
    text: Configurer les notifications de vos monitors
  - link: monitors/manage_monitor
    tag: Documentation
    text: Gérer vos monitors
  - link: monitors/downtimes
    tag: Documentation
    text: Planifier un downtime pour désactiver un monitor
---
## Présentation

Les checks Datadog émettent un statut à chaque exécution. Les statuts possibles sont `OK`, `WARNING` et `CRITICAL`.

La page Sommaire des checks énumère les checks qui envoient des informations à Datadog :

 {{< img src="monitors/check_summary/check_summary.png" alt="Résumé des checks" responsive="true" style="width:70%;">}}

Cliquez sur le nom d'un check pour voir les tags associés à ce check :

{{< img src="monitors/check_summary/check_details.png" alt="Détails du check" responsive="true" style="width:80%;">}}

**Remarque** : pour mieux surveiller les statuts de check, utilisez le [Widget Statut de check][1].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/widgets/check_status