---
title: Downtimes
kind: documentation
description: Planifiez des downtimes pour vous assurer que vos monitors Datadog n'émettent pas d'alertes durant certaines périodes.
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
---
Il arrive que vous soyez contraint d'éteindre ou de mettre hors ligne des systèmes pour effectuer des opérations de maintenance ou des mises à niveau. La planification de downtime vous permet d'y parvenir sans déclencher de monitors.

## Que se passe-t-il lorsqu'un monitor est désactivé ou lorsqu'il fait l'objet d'un downtime planifié ?

Vous pouvez planifier des downtimes et/ou désactiver vos monitors Datadog afin qu'ils n'émettent pas d'alertes pendant les périodes de votre choix.

Les monitors déclenchent des événements lorsque leur statut, à savoir `ALERT`, `WARNING` (si activé), `RESOLVED` et `NO DATA` (si activé), change. Lorsqu'un monitor est arrêté, en raison d'un downtime ou d'une désactivation, si son statut passe de `RESOLVED` à un autre statut, cela **ne déclenche aucun événement** et n'active aucun canal de notification associé.

**Remarque** : si vous désactivez ou réactivez un monitor via l'IU, les downtimes planifiés associés à ce monitor ne sont pas supprimés. Pour les supprimer, utilisez la fonctionnalité de gestion des downtimes ou passez directement par l'API.

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="downtime sur une alerte" responsive="true" style="width:80%;">}}

Si le statut d'un monitor change durant un downtime (en passant par exemple de `OK` à `ALERT`, `WARNING`, ou `NO DATA`) et n'évolue pas après la fin du downtime planifié, cela ne déclenche **PAS** de notification.
**Cependant, un événement de récupération SERA déclenché dès que des données seront renvoyées pour ce contexte ou dès que le monitor reviendra à un statut `OK`.**

Ce comportement a été conçu dans le but d'empêcher l'envoi de nombreuses alertes de statut `NO DATA` lors de l'utilisation de la fonctionnalité *Autoresolve*. Si vous préférez que le monitor déclenche un événement de statut `NO DATA` chaque fois que la désactivation prend fin, [contactez l'équipe d'assistance Datadog][1] afin de demander l'activation de cette fonctionnalité pour votre compte. Cela concerne uniquement les situations où un monitor termine une période de downtime avec un statut `NO DATA`.

## Gérer un downtime

Accédez à la page [Manage Downtime][2] en sélectionnant l'onglet *Monitors* dans le menu principal, puis en cliquant sur le lien *Manage Downtime*. Vous pouvez également accéder à la page *Manage Downtime* depuis d'autres pages associées aux monitors, en cliquant sur le lien en haut de la fenêtre.

{{< img src="monitors/downtimes/downtime-nav.png" alt="downtime-nav" responsive="true" >}}

La page Manage Downtime affiche la liste des downtimes actifs et planifiés. Sélectionnez un downtime pour afficher plus de détails sur le host et les monitors concernés.

{{< img src="monitors/downtimes/downtime-manage.png" alt="downtime-gestion" responsive="true" style="width:80%;">}}

## Planifier un downtime

Pour planifier un downtime, cliquez sur le bouton Schedule Downtime dans le coin supérieur droit.

1. Choisissez les éléments à désactiver.
   {{< img src="monitors/downtimes/choose-what-to-silence.png" alt="downtime-désactivation" responsive="true" style="width:80%;">}}
   **By monitor name**
   Vous devez sélectionner au moins un monitor. Si vous choisissez de laisser le champ de sélection vide, tous les monitors seront désactivés par défaut. Vous pouvez également sélectionner un contexte afin de limiter votre downtime à un host, appareil ou tag arbitraire spécifique. Consultez la [section Contexte][3] de la rubrique Présentation des graphiques JSON pour en savoir plus sur les contextes.
   **By monitor tags**
   Vous pouvez sélectionner un ou plusieurs [tags de monitor][4] afin de planifier des downtimes sur ces tags. Vous devez sélectionner au moins un tag avec cette option pour configurer un downtime. Vous ne pouvez pas définir plus de 32 tags. Les noms de tag ne doivent pas dépasser 256 caractères. Seuls les monitors possédant **TOUS les tags sélectionnés** sont désactivés. Vous pouvez également sélectionner des contextes pour restreindre encore plus le downtime. <br/><br/>
   Pour chacune de ces méthodes, si vous choisissez de désactiver tous les monitors caractérisés par un contexte, cliquez sur *Preview affected monitors* pour afficher la liste des monitors concernés. Si vous créez un monitor avec ce contexte après avoir planifié le downtime ou en modifiez-un de sorte qu'il corresponde au contexte, celui-ci sera également désactivé. Attention : les alertes multiples sont désactivées uniquement pour les groupes correspondant au contexte. Par exemple, si un downtime est inclus dans le contexte `host:X` et si une alerte multiple est déclenchée sur `host:X` et `host:Y`, Datadog envoie une notification de monitor pour `host:Y`, mais pas pour `host:X`.

2. Définissez un calendrier.
  {{< img src="monitors/downtimes/downtime-schedule.png" alt="downtime-calendrier" responsive="true" style="width:80%;">}}
  Vous pouvez définir une date et une heure de début, ou laisser le champ vide pour démarrer immédiatement le downtime. Vous pouvez également définir un [calendrier récurrent pour prendre en charge les downtimes planifiés régulièrement](#downtimes-récurrents).

3. Vous pouvez ajouter un message pour prévenir votre équipe.
  {{< img src="monitors/downtimes/downtime-notify.png" alt="downtime-notification" responsive="true" style="width:80%;">}}
  Saisissez un message pour informer votre équipe à propos de ce downtime. Le champ de message prend en charge la [mise en forme Markdown][5] standard ainsi que la fonction de notification « @ » de Datadog. Utilisez le champ *Notify your team* pour indiquer certains membres d'équipe ou envoyer votre message à une [intégration][6] de service.

## Downtimes récurrents

Vous pouvez créer un downtime avec des dates de début et de fin correspondant à un intervalle ou un programme récurrent.

Cela vous permet par exemple de désactiver un monitor durant une période de maintenance régulièrement programmée afin d'éviter de recevoir des dizaines d'alertes.

Lorsqu'un downtime récurrent prend fin, il est annulé et un nouveau downtime possédant les mêmes caractéristiques (avec une nouvelle date de début et de fin) est créé pour la prochaine période.

**Remarque** : le créateur du premier downtime est associé à tous les nouveaux downtimes créés.

## Rechercher des downtimes

L'historique des downtimes est accessible depuis la page Monitor Status (il est superposé à l'historique de transition des groupes). Vous pouvez également le consulter dans le flux d'événements en recherchant `tags:audit,downtime`, ou en précisant un ID de downtime spécifique : `tags:audit,downtime_id:<ID_DOWNTIME>`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help
[2]: https://app.datadoghq.com/monitors#/downtime
[3]: /fr/graphing/graphing_json/#scope
[4]: /fr/monitors/manage_monitor/#monitor-tags
[5]: http://daringfireball.net/projects/markdown/syntax
[6]: https://app.datadoghq.com/account/settings#integrations