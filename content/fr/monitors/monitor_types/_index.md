---
title: Les monitors
kind: documentation
aliases:
  - /fr/monitoring
---
## Création

Pour [créer un monitor][1] dans Datadog, passez le curseur sur **Monitors** dans le menu principal et cliquez sur **New Monitor** dans le sous-menu. Pour programmer la création d'un monitor, consultez la documentation relative à l'[API Datadog][2] ou aux [bibliothèques maintenues par la communauté][3].

Sélectionnez un type de monitor :

* [Host][4]
* [Métrique][5]
* [Anomalie][6]
* [Outlier][7]
* [Prévision][8]
* [Intégration][9]
* [Live Process][10]
* [Check de processus][11]
* [Réseau][12]
* [Check custom][13]
* [Événement][14]
* [Logs][15]
* [APM][16]
* [Watchdog][17]
* [Composite][18]

## Importation

[Importez un monitor][19] vers Datadog au format JSON via la navigation principale : *Monitors --> New Monitor --> Import*.

Vous pouvez exporter un monitor au format JSON depuis la page de statut du monitor. Cliquez sur l'icône des paramètres en forme d'engrenage (en haut à droite) et sélectionnez **Export** depuis le menu.

## Audit

Quel que soit le type de monitor utilisé, toute modification crée dans le [flux d'événements][20] un événement qui explique la modification et affiche l'utilisateur à son origine.

Si vous avez apporté des modifications à un monitor, vous pouvez consulter des exemples en effectuant la recherche d'événement suivante :
```
https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all
```

Datadog propose également une option de notification en cas de changement apporté à un monitor que vous avez créé. En bas de l'éditeur de monitors, sous **Notify your team**, sélectionnez **Notify** dans le menu déroulant en regard de : *alert recipients when this alert is modified*.

Le paramètre Notify envoie un e-mail pour les événements d'audit du monitor à toutes les personnes qui reçoivent des alertes pour ce monitor. L'événement d'audit du monitor apparaît également dans le [flux d'événements][20].


[1]: https://app.datadoghq.com/monitors#/create
[2]: /fr/api/#monitors
[3]: /fr/developers/libraries/#managing-monitors
[4]: /fr/monitors/monitor_types/host
[5]: /fr/monitors/monitor_types/metric
[6]: /fr/monitors/monitor_types/anomaly
[7]: /fr/monitors/monitor_types/outlier
[8]: /fr/monitors/monitor_types/forecasts
[9]: /fr/monitors/monitor_types/integration
[10]: /fr/monitors/monitor_types/process
[11]: /fr/monitors/monitor_types/process_check
[12]: /fr/monitors/monitor_types/network
[13]: /fr/monitors/monitor_types/custom_check
[14]: /fr/monitors/monitor_types/event
[15]: /fr/monitors/monitor_types/log
[16]: /fr/monitors/monitor_types/apm
[17]: /fr/monitors/monitor_types/watchdog
[18]: /fr/monitors/monitor_types/composite
[19]: https://app.datadoghq.com/monitors#create/import
[20]: /fr/graphing/event_stream
