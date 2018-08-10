---
title: Alerting
kind: documentation
aliases:
  - /fr/guides/monitors/
  - /fr/guides/monitoring/
  - /fr/guides/alerting/
  - /fr/guides/monitors/the-conditions
description: Créer et gérer vos notifications
---
## Aperçu

La surveillance de l'ensemble de votre infrastructure ne serait pas complète sans la capacité d'être informé quand des changements critiques se produisent. Datadog vous donne la possibilité de créer des monitors qui vérifient activement l'état de vos métriques, les disponibilités de vos intégrations, vos endpoints réseau, et plus encore..

Une fois qu'un monitor est créé, vous êtes averti lorsque ses conditions sont remplies. Vous pouvez informer les membres de l'équipe par courriel ou via des services tiers (par exemple, Pagerduty ou Hipchat) ou d'autres endpoints personnalisés via Webhooks.

Les monitors déclenchés apparaissent dans le [flux d'événements][1], permettant la collaboration autour de problèmes actifs dans vos applications ou votre infrastructure. Datadog fournit une vue de haut niveau des problèmes en cours sur la page [Triggered Monitors][2]  ainsi que la gestion globale de vos monitors sur la page [Manage Monitors][3].

Les monitors peuvent être gérés via script, reportez-vous à la [documentations de l'API][4] pour obtenir des informations détaillées sur la gestion des monitors via l'API en utilisant les [bibliothèques disponibles][5] ou cURL.

Dans cette section, vous pouvez:

* [Apprenez à créer un monitor][6]
* [Configurez les notifications de votre monitor][7]
* [Managez vos monitors][8]
* [Planifiez un downtime pour stopper les notifications d'un monitor][9]
* [Voir tous vos checks en un seul endroit][10]
* [Consultez notre FAQ][11]

### Glossaire

Voici un aperçu des termes utilisés:

- **Status**: Chaque check soumet un status parmis OK, WARNING or CRITICAL.
- **Check**: Emet un ou plusieurs status.
- **Monitor**: Envoie des notifications basées sur une séquence de status de check ou metrique
  qui traversent un seuil ou d'autres conditions d'alerte
- **Type de monitor**: host, métrique, intégration, processus, réseau, événement et custom. Utilisez la navigation latérale pour en apprendre plus sur un type spécifique.
- **Tags**: Des labels configurables qui peuvent être appliqués sur chaque metrique et chaque host. Consultez  la page dédiée au [Tagging][1] pour plus de détails.

## Créer un monitor

Accédez à la page  [Create Monitors][13] en survolant **Monitors** dans le menu principal et en cliquant sur **New Monitors** dans le sous-menu (selon le thème choisi et la résolution de l'écran, le menu principal peut être en haut ou à gauche). Vous pourrez alors choisir votre monitor parmis une liste de types de monitors. [En savoir plus sur tous les types de monitor.][6]

{{< img src="monitors/index/nav.png" alt="navigation" responsive="true" >}}

## Exporter un monitor

Vous pouvez exporter la configuration JSON pour un monitor directement à partir de l'écran de création.

Si vous gérez et déployez vos monitors grâce à un script, il est plus facile de définir le monitor grâce à l'interface utilisateur et d'exporter le JSON directement:

{{< img src="monitors/index/export_monitor_json.jpg" alt="export monitor" responsive="true" >}}

## Audit d'un monitor

Toute modification apportée aux monitors crée un événement dans le [flux d'événements][14] qui explique le changement et montre l'utilisateur qui a effectué la modification.

En supposant que vous avez apporté des modifications à vos monitors, vous pouvez voir des exemples avec la recherche d'événement suivante:
```
https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all
```

Nous vous offrons également la possibilité d'être informé des modifications apportées à un monitor que vous avez créé. Au bas de l'éditeur de monitor, il y a une option pour notifier les destinataires des alertes de toutes les modifications apportées au monitor:

{{< img src="monitors/index/Monitor_Change_notifications.png" alt="Monitor_Change_notifications" responsive="true" >}}

Définir ci-dessus sur **Notify** envoie un courriel pour les événements d'audit du monitor à toutes les personnes qui sont alertées sur ce monitor.

## Résoudre manuellement votre monitor

Dans certains cas, il est logique de résoudre manuellement votre monitor:

* Si le monitor est dans l'état "no data", sa résolution le masquera sur la page des  "triggered monitors".
* Si le monitor est dans l'état "déclenché", mais a cessé de rapporter des données alors
le résoudre le masquera sur la page des "triggered monitors".

Sinon, le monitor détecte l'état actuel lors de l'évaluation suivante.

En d'autres termes, si la valeur est toujours supérieure / inférieure au seuil configuré, le monitor peut se déclencher à nouveau lors de l'évaluation suivante (en environ 60 secondes).

## Gestion des monitors

Il existe plusieurs projets de notre communauté qui permettent une maintenance ou une gestion des monitors avec d'autres composants Datadog via les API:

* https://github.com/trueaccord/DogPush
* https://github.com/winebarrel/barkdog
* https://github.com/airbnb/interferon
* https://github.com/rapid7/dogwatch
* https://www.terraform.io/docs/providers/datadog/r/monitor.html

[1]: /graphing/event_stream/
[2]: https://app.datadoghq.com/monitors/triggered
[3]: https://app.datadoghq.com/monitors
[4]: /api/#monitors
[5]: /developers/libraries
[6]: /monitors/monitor_types
[7]: /monitors/notifications
[8]: /monitors/manage_monitor
[9]: /monitors/downtimes
[10]: /monitors/check_summary
[11]: /monitors/faq
[12]: /tagging
[13]: https://app.datadoghq.com/monitors#/create
[14]: /graphing/event_stream
