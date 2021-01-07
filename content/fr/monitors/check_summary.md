---
title: Sommaire des checks
kind: documentation
description: Consultez la liste de tous vos checks transmis à Datadog.
further_reading:
  - link: /monitors/monitor_types/
    tag: Documentation
    text: Apprendre à créer un monitor
  - link: /monitors/notifications/
    tag: Documentation
    text: Configurer les notifications de vos monitors
  - link: /monitors/manage_monitor/
    tag: Documentation
    text: Gérer vos monitors
  - link: /monitors/downtimes/
    tag: Documentation
    text: Planifier un downtime pour un monitor
---
## Présentation

Les checks Datadog transmettent un statut à chaque exécution. La [page du sommaire des checks][1] affiche les checks qui ont transmis des données au cours des dernières 24 heures. Voici la liste des statuts disponibles :

- `OK`
- `WARNING`
- `CRITICAL`
- `UNKNOWN`

## Recherche

Pour trouver un check spécifique, utilisez la zone de recherche `filter checks` de la page du sommaire des checks. Cliquez sur le nom d'un check pour afficher les statuts et tags associés. Filtrez davantage la liste en utilisant la zone de recherche `filter checks` au sein du volet du check :

{{< img src="monitors/check_summary/check_search.png" alt="Détails du check"  style="width:100%;">}}

## Dashboards

Pour afficher le statut de votre check dans un dashboard, utilisez le [widget Statut de check][2].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/check/summary
[2]: /fr/dashboards/widgets/check_status/