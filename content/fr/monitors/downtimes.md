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
Planifiez des downtimes pour éviter de déclencher vos monitors en cas d'arrêt système, de maintenance hors ligne ou de mise à niveau.

## Que se passe-t-il lorsqu'un monitor est désactivé ou lorsqu'il fait l'objet d'un downtime planifié ?

Vous pouvez planifier des downtimes et/ou désactiver vos monitors Datadog afin qu'ils n'émettent pas d'alertes pendant les périodes de votre choix.

Les monitors déclenchent des événements lorsque leur statut, à savoir `ALERT`, `WARNING` (si activé), `RESOLVED` et `NO DATA` (si activé), change. Si un monitor est arrêté (en raison d'un downtime ou d'une désactivation) et que son état passe de `RESOLVED` à un autre statut, **aucun** événement ni aucune notification ne se déclenche.

**Remarque** : si vous désactivez ou réactivez un monitor via l'IU, les downtimes planifiés associés à ce monitor ne sont pas supprimés. Pour les supprimer, utilisez la fonctionnalité de gestion des downtimes ou passez par l'API.

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="downtime sur une alerte" style="width:80%;">}}

Si le statut d'un monitor change durant un downtime (en passant par exemple de `OK` à `ALERT`, `WARNING` ou `NO DATA`) et reste identique après la fin du downtime planifié, **aucune** notification n'est envoyée. Toutefois, un événement de rétablissement se déclenche dès que des données sont renvoyées pour ce contexte ou dès que le statut du monitor repasse à `OK`.

Ce comportement a été conçu dans le but d'empêcher l'envoi de nombreuses alertes de statut `NO DATA` lors de l'utilisation de la fonctionnalité *Autoresolve*. Si vous préférez que le monitor déclenche un événement de statut `NO DATA` chaque fois que la désactivation prend fin, [contactez l'équipe d'assistance Datadog][1] afin de demander l'activation de cette fonctionnalité pour votre compte. Cela concerne uniquement les situations où un monitor termine une période de downtime avec un statut `NO DATA`.

Si un monitor déclenche une alerte **avant** un downtime et que le statut est rétabli **pendant** ce downtime, un événement de rétablissement est envoyé pendant ce downtime (s'il s'agit du premier rétablissement).

### Rapport sur les monitors

Tous les statuts ayant déclenché une alerte sont inclus dans le [rapport hebdomadaire sur les monitors][3], même si le monitor est en downtime.

## Gérer un downtime

Accédez à la page de [gestion des downtimes][4] en passant le curseur sur **Monitors** dans le menu principal, puis en sélectionnant **Manage Downtime**.

{{< img src="monitors/downtimes/downtime-nav.png" alt="downtime-nav" >}}

La page Manage Downtime affiche la liste des downtimes actifs et planifiés. Sélectionnez un downtime pour afficher plus de détails sur le host et les monitors concernés.

{{< img src="monitors/downtimes/downtime-manage.png" alt="downtime-gestion" style="width:80%;">}}

## Planifier un downtime

Pour planifier un downtime, cliquez sur le bouton Schedule Downtime dans le coin supérieur droit.

1. Choisissez les éléments à désactiver.
   {{< img src="monitors/downtimes/choose-what-to-silence.png" alt="downtime-désactivation" style="width:80%;">}}
   **Désactiver des monitors en fonction de leur nom**
   Vous devez sélectionner au moins un monitor. Si vous choisissez de laisser le champ de sélection vide, tous les monitors seront désactivés par défaut. Vous pouvez également sélectionner un contexte afin de limiter votre downtime à un host, appareil ou tag de votre choix. Consultez la [section Contexte][5] de la rubrique Présentation des graphiques JSON pour en savoir plus sur les contextes.
   **Désactiver les monitors en fonction de leur tag**
   Vous avez également la possibilité de planifier un downtime pour un ou plusieurs [tags de monitor][6]. Cette méthode nécessite la sélection d'au moins un tag, et il n'est pas possible de définir plus de 32 tags. Les noms de tag ne doivent pas dépasser 256 caractères. Seuls les monitors possédant **TOUS les tags sélectionnés** sont désactivés. Vous pouvez également sélectionner des contextes pour restreindre encore plus le downtime. <br/><br/>
   Pour chacune de ces méthodes, si vous choisissez de désactiver tous les monitors caractérisés par un contexte, cliquez sur *Preview affected monitors* pour afficher la liste des monitors concernés. Si vous créez ou modifiez un monitor affecté par un contexte après avoir planifié le downtime, celui-ci sera également désactivé. Attention : les alertes multiples sont uniquement désactivées si le groupe est couvert par le contexte. Par exemple, si un downtime est couvert par le contexte `host:X` et qu'une alerte multiple est déclenchée pour `host:X` et `host:Y`, Datadog envoie une notification de monitor pour `host:Y`, mais pas pour `host:X`.

2. Programmez votre downtime.
  {{< img src="monitors/downtimes/downtime-schedule.png" alt="programmer-downtime" style="width:80%;">}}
  Choisissez une date et une heure de début ou laissez le champ vide pour démarrer immédiatement le downtime. Vous avez également la possibilité de [choisir une fréquence de répétition pour configurer un downtime récurrent](#downtimes-récurrents).

3. Vous pouvez ajouter un message pour prévenir votre équipe.
  {{< img src="monitors/downtimes/downtime-notify.png" alt="downtime-notification" style="width:80%;">}}
  Saisissez un message pour informer votre équipe à propos de ce downtime. Le champ de message prend en charge la [mise en forme Markdown][7] standard ainsi que la fonction de notification « @ » de Datadog. Utilisez le champ *Notify your team* pour choisir les membres de l'équipe à prévenir ou envoyer votre message à une [intégration][8] de service.

**Remarque** : créez le downtime avant de créer le monitor ou avant de désactiver le groupe.

## Downtimes récurrents

Vous pouvez créer un downtime avec des dates de début et de fin correspondant à un intervalle ou à un programme récurrent.

Cela vous permet par exemple de désactiver un monitor durant une période de maintenance habituelle, vous évitant ainsi de recevoir des dizaines d'alertes inutiles.

Lorsqu'un downtime récurrent prend fin, il est annulé et un nouveau downtime possédant les mêmes caractéristiques (avec une nouvelle date de début et de fin) est créé pour la prochaine période.

**Remarque** : le créateur du premier downtime est associé à tous les nouveaux downtimes créés.

## Rechercher des downtimes

L'historique des downtimes est accessible depuis la page Monitor Status (il est superposé à l'historique de transition des groupes). Vous pouvez également le consulter dans le flux d'événements en recherchant `tags:audit,downtime`, ou en précisant un ID de downtime spécifique : `tags:audit,downtime_id:<ID_DOWNTIME>`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/?lang=python#cancel-monitor-downtime
[2]: /fr/help
[3]: /fr/account_management/#preferences
[4]: https://app.datadoghq.com/monitors#/downtime
[5]: /fr/dashboards/graphing_json/#scope
[6]: /fr/monitors/manage_monitor/#monitor-tags
[7]: http://daringfireball.net/projects/markdown/syntax
[8]: https://app.datadoghq.com/account/settings#integrations