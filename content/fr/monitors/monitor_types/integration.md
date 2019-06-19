---
title: Monitor d'intégration
kind: documentation
description: Surveiller les valeurs des métriques ou des statuts de santé à partir d'une intégration spécifique
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
{{< img src="monitors/monitor_types/integration/es_status.png" alt="statut es" responsive="true" >}}

## Présentation

Lorsque vous affichez l'onglet Integration, la liste des intégrations que vous avez installées apparaît. Sélectionnez une intégration pour choisir de surveiller un statut ou une métrique.

- Si vous choisissez **Integration Status**, un ou plusieurs checks de service vous sont proposés pour chaque intégration. Consulte la section relative aux [monitors personnalisés][1] pour en savoir plus les différentes options disponibles.

- Si vous choisissez **Integration Metric**, une interface familière vous permet de surveiller une métrique. Vous pouvez ainsi choisir parmi toutes les métriques fournies par cette intégration. Consultez la section relative aux [conditions d'alerte][2] pour en savoir plus sur les différentes options disponibles.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/monitor_types/custom_check
[2]: /fr/monitors/monitor_types/#define-the-conditions