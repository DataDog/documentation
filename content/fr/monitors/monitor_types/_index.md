---
title: Monitors
kind: documentation
aliases:
  - /fr/monitoring
  - /fr/monitors/faq/can-i-set-up-a-monitor-for-a-metric-that-hasn-t-been-reported-to-datadog-yet/
---
## Création

Pour [créer un monitor][1] dans Datadog, passez le curseur sur **Monitors** dans le menu principal et cliquez sur **New Monitor** dans le sous-menu. Pour programmer la création d'un monitor, consultez la documentation relative à l'[API Datadog][2] ou aux [bibliothèques maintenues par la communauté][3].

Sélectionnez un type de monitor :

* [Host][4] : Vérifier si un ou plusieurs hosts transmettent des données à Datadog.
* [Métrique][5] : Comparer les valeurs d'une métrique avec un seuil défini par un utilisateur.
* [Anomalie][6] : Détecter les comportements anormaux pour une métrique en fonction des données historiques.
* [Outlier][7] : Recevoir des alertes lorsqu'un membre d'un groupe se comporte différemment des autres.
* [Prévision][8] : Recevoir une alerte lorsque Datadog prédit qu'une métrique s'apprête à franchir un seuil.
* [Intégration][9] : Surveiller les valeurs des métriques ou des statuts de santé à partir d'une intégration spécifique.
* [Live Processes][10] : Vérifier si un ou plusieurs processus sont en cours d'exécution sur un host.
* [Check de processus][11] : Surveiller le statut généré par le check de service `process.up`.
* [Réseau][12] : Vérifier le statut des endpoints TCP/HTTP.
* [Check custom][13] : Surveiller le statut de checks custom arbitraires.
* [Événement][14] : Surveiller des événements recueillis par Datadog.
* [Logs][15] : Surveiller des logs recueillis par Datadog.
* [APM][16] : Comparer une métrique APM à un seuil défini par un utilisateur.
* [Real User Monitoring][17] : Surveiller des données utilisateur réelles recueillies par Datadog.
* [Watchdog][18] : Recevoir une notification lorsque Watchdog détecte un comportement anormal.
* [Composite][19] : Recevoir une alerte sur une expression combinant plusieurs monitors.

## Importation

Pour [importer un monitor][20] vers Datadog au format JSON, utilisez la navigation principale : *Monitors --> New Monitor --> Import*.

Vous pouvez exporter un monitor au format JSON depuis la page de statut du monitor. Cliquez sur l'icône des paramètres en forme d'engrenage (en haut à droite) et sélectionnez **Export** depuis le menu.

## Audit

Quel que soit le type de monitor utilisé, toute modification crée dans le [flux d'événements][21] un événement qui décrit la modification et affiche l'utilisateur à son origine.

Si vous avez apporté des modifications à un monitor, vous pouvez consulter des exemples en effectuant la recherche d'événement suivante :

```text
https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all
```

Datadog propose également une option de notification en cas de changement apporté à un monitor que vous avez créé. En bas de l'éditeur de monitors, sous **Notify your team**, sélectionnez **Notify** dans le menu déroulant en regard de : *alert recipients when this alert is modified*.

Le paramètre Notify envoie un e-mail pour les événements d'audit du monitor à toutes les personnes qui reçoivent des alertes pour ce monitor. L'événement d'audit du monitor apparaît également dans le [flux d'événements][20].

[1]: https://app.datadoghq.com/monitors#/create
[2]: /fr/api/v1/monitors/
[3]: /fr/developers/libraries/#managing-monitors
[4]: /fr/monitors/monitor_types/host/
[5]: /fr/monitors/monitor_types/metric/
[6]: /fr/monitors/monitor_types/anomaly/
[7]: /fr/monitors/monitor_types/outlier/
[8]: /fr/monitors/monitor_types/forecasts/
[9]: /fr/monitors/monitor_types/integration/
[10]: /fr/monitors/monitor_types/process/
[11]: /fr/monitors/monitor_types/process_check/
[12]: /fr/monitors/monitor_types/network/
[13]: /fr/monitors/monitor_types/custom_check/
[14]: /fr/monitors/monitor_types/event/
[15]: /fr/monitors/monitor_types/log/
[16]: /fr/monitors/monitor_types/apm/
[17]: /fr/monitors/monitor_types/real_user_monitoring/
[18]: /fr/monitors/monitor_types/watchdog/
[19]: /fr/monitors/monitor_types/composite/
[20]: https://app.datadoghq.com/monitors#create/import
[21]: /fr/events/