---
title: Alertes
kind: documentation
aliases:
  - /fr/guides/monitors/
  - /fr/guides/monitoring/
  - /fr/guides/alerting/
  - /fr/guides/monitors/the-conditions
description: Créer et gérer vos notifications
---
## Présentation

Pour surveiller l'ensemble de votre infrastructure depuis un seul endroit, vous devez recevoir des notifications lorsque des modifications critiques se produisent. Datadog vous permet de créer des monitors qui vérifient activement vos métriques, les disponibilités de vos intégrations, les endpoints réseau, et plus encore.

Une fois un monitor créé, vous recevez des alertes sous certaines conditions. Vous pouvez également informer les membres de l'équipe par e-mail, grâce à des services tiers (tels que Pagerduty ou Stride) ou d'autres endpoints personnalisés, via Webhooks.

Les monitors déclenchés apparaissent dans le [flux d'événements][1], ce qui vous permet de collaborer en vue de corriger des problèmes actifs concernant vos applications ou votre infrastructure. Datadog fournit une vue d'ensemble des problèmes en cours sur la page [Triggered Monitors][2] ainsi que des fonctions de gestion globale de vos monitors sur la page [Manage Monitors][3].

La gestion des monitors peut être programmée. Consultez la [documentation relative à l'API Datadog][4] pour obtenir des informations détaillées sur la gestion des monitors via l'API à l'aide des [bibliothèques][5] disponibles ou de cURL.

Grâce à cette section, vous pouvez :

* [Apprendre à créer un monitor][6]
* [Configurer les notifications de vos monitors][7]
* [Gérer vos monitors][8]
* [Planifier un downtime pour désactiver un monitor][9]
* [Consulter tous vos checks en un seul endroit][10]

### Glossaire

Voici un aperçu des différents termes utilisés :

- **Statut** : chaque exécution de check renvoie un statut, à savoir OK, WARNING ou CRITICAL.
- **Check** : renvoie un ou plusieurs statut.
- **Monitor** : envoie des notifications basées sur une séquence de statuts de check, un seuil
  de métrique ou d'autres conditions d'alertes.
- **Type de monitor** : les monitors se basent sur des [logs][11], des [prévisions][12], des [hosts][13], des [métriques][14], des [intégrations][15], des [processus][16], des [singularités][17], des [anomalies][18], l'[APM][19], des [composites][20], des [réseaux][21] ou des [événements][22], et peuvent être [personnalisés][23]. Consultez la barre de navigation pour en savoir plus sur un type spécifique de monitor.
- **Tags** : des étiquettes configurables qui peuvent être appliquées à chaque métrique et à chaque host. Consultez la page relative au [tagging][24] pour en savoir plus.

## Créer un monitor

Accédez à la page [Create Monitors][25] en passant le curseur sur **Monitors** dans le menu principal et en cliquant sur **New Monitors** dans le sous-menu (selon le thème choisi et la résolution de l'écran, le menu principal peut se situer en haut ou à gauche). La liste des types de monitors s'affiche alors à gauche. Consultez la [section de référence sur la surveillance][6] pour en savoir plus sur tous les types de monitors.

{{< img src="monitors/index/nav.png" alt="navigation" responsive="true" >}}

## Exporter votre monitor

Exportez la configuration JSON d'un monitor directement à partir de l'écran de création ou sur votre [page de statut du monitor][26] dans le coin supérieur droit.
Si vous gérez et déployez des monitors à l'aide de programmes, il est plus simple de définir le monitor dans l'interface utilisateur et d'exporter immédiatement le JSON :

{{< img src="monitors/index/export_monitor_json.jpg" alt="exportation monitor" responsive="true" >}}

## Audit de monitors

Toute modification apportée aux monitors crée dans le [flux d'événements][27] un événement qui explique la modification et affiche l'utilisateur à son origine.

Si vous avez apporté des modifications à vos monitors, vous pouvez consulter des exemples en effectuant la recherche d'événement suivante :
```
https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all
```

Nous vous offrons également la possibilité d'être informé des modifications apportées à un monitor que vous avez créé. En bas de l'éditeur de monitors se trouve une option vous permettant d'envoyer des notifications à certaines personnes en cas de modification du monitor :

{{< img src="monitors/index/Monitor_Change_notifications.png" alt="Monitor_changement_notifications" responsive="true" >}}

Si vous choisissez l'option **Notify**, un e-mail est envoyé pour les événements d'audit du monitor à toutes les personnes qui reçoivent des alertes pour ce monitor.

## Résoudre manuellement votre monitor

La fonction *Resolve* du monitor remplace artificiellement le statut du monitor par `OK` pour sa prochaine évaluation. L'évaluation d'après sera effectuée normalement, à partir des données sur lesquelles le monitor est basé.

Si un monitor émet une alerte car ses données actuelles déclenchent l'état `ALERT`, la fonction *Resolve* fait en sorte que le statut du moniteur évolue comme suit : `ALERT -> OK -> ALERT`. Par conséquent, cette fonction ne vous permet pas d'indiquer que vous avez pris connaissance de l'alerte ni de dire à Datadog d'ignorer l'alerte.

Lorsque les données sont transmises ponctuellement, il convient de *résoudre* manuellement un monitor. Après avoir déclenché une alerte, le monitor ne reçoit plus de données et ne peut donc plus évaluer les conditions d'alerte et revenir à l'état `OK`. Dans ce cas, la fonction *Resolve* ou *Automatically resolve monitor after X hours* rétablit l'état `OK` de l'alerte.

Cette fonction vous permet par exemple de gérer un monitor reposant sur des métriques d'erreur qui ne sont pas générées en l'absence d'erreur (par ex. : `aws.elb.httpcode_elb_5xx` ou des counters DogStatsD dans votre code qui renvoient des informations _uniquement en cas d'erreur_).

## Gestion des monitors

Notre communauté travaille sur plusieurs projets en vue de conserver ou de gérer les monitors pour une utilisation conjointe avec d'autres composants Datadog via les API :

* https://github.com/trueaccord/DogPush
* https://github.com/winebarrel/barkdog
* https://github.com/airbnb/interferon
* https://github.com/rapid7/dogwatch
* https://www.terraform.io/docs/providers/datadog/r/monitor.html

[1]: /fr/graphing/event_stream
[2]: https://app.datadoghq.com/monitors/triggered
[3]: https://app.datadoghq.com/monitors
[4]: /fr/api/#monitors
[5]: /fr/developers/libraries
[6]: /fr/monitors/monitor_types
[7]: /fr/monitors/notifications
[8]: /fr/monitors/manage_monitor
[9]: /fr/monitors/downtimes
[10]: /fr/monitors/check_summary
[11]: /fr/monitors/monitor_types/log
[12]: /fr/monitors/monitor_types/forecasts
[13]: /fr/monitors/monitor_types/host
[14]: /fr/monitors/monitor_types/metric
[15]: /fr/monitors/monitor_types/integration
[16]: /fr/monitors/monitor_types/process
[17]: /fr/monitors/monitor_types/outlier
[18]: /fr/monitors/monitor_types/anomaly
[19]: /fr/monitors/monitor_types/apm
[20]: /fr/monitors/monitor_types/composite
[21]: /fr/monitors/monitor_types/network
[22]: /fr/monitors/monitor_types/event
[23]: /fr/monitors/monitor_types/custom_check
[24]: /fr/tagging
[25]: https://app.datadoghq.com/monitors#/create
[26]: /fr/monitors/monitor_status
[27]: /fr/graphing/event_stream