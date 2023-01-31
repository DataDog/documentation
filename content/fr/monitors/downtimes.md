---
title: Downtimes
kind: documentation
description: Planifiez des downtimes pour que vos monitors Datadog n'émettent pas d'alertes durant certaines périodes.
further_reading:
  - link: /monitors/monitor_types/
    tag: Documentation
    text: Créer un monitor
  - link: /monitors/notifications/
    tag: Documentation
    text: Configurer des notifications de monitor
  - link: /monitors/manage_monitor/
    tag: Documentation
    text: Gérer les monitors
---
Planifiez des downtimes pour éviter de déclencher vos monitors en cas d'arrêt système, de maintenance hors ligne ou de mise à niveau.

## Planifier un downtime

Pour planifier un [downtime de monitor][1] dans Datadog, utilisez le menu principal : _Monitors –> Manage Downtime_. Cliquez ensuite sur le bouton **Schedule Downtime** en haut à droite.

### Choisir les éléments à désactiver

{{< tabs >}}
{{% tab "Par nom de monitor" %}}

Utilisez le menu déroulant pour choisir les monitors à désactiver ou la fonction de recherche pour les trouver. Si vous choisissez de laisser le champ vide, tous les monitors seront désactivés par défaut. Vous pouvez également sélectionner un contexte afin de limiter votre downtime à un host, appareil ou tag de votre choix. Seuls les monitors qui correspondent à **TOUS les contextes sélectionnés** sont désactivés.

{{% /tab %}}
{{% tab "Par tags de monitor" %}}

Planifiez un downtime basé sur un ou plusieurs [tags de monitor][1]. Vous devez sélectionner au moins un tag, et il n'est pas possible de définir plus de 32 tags. Les noms de tag ne doivent pas dépasser 256 caractères. Seuls les monitors possédant **TOUS les tags sélectionnés** sont désactivés. Vous pouvez également sélectionner des contextes pour restreindre encore plus le downtime.

[1]: /fr/monitors/manage_monitor/#monitor-tags
{{% /tab %}}
{{< /tabs >}}

Si vous choisissez de désactiver des monitors limités par un contexte, cliquez sur **Preview affected monitors** pour voir les monitors inclus. Tous les monitors créés ou modifiés après la planification du downtime sont automatiquement inclus dans le downtime s'ils correspondent au contexte.

**Remarque** : si un monitor à alertes multiples est inclus, il est uniquement désactivé pour les groupes couverts par le contexte. Par exemple, si un downtime est couvert par le contexte `host:X` et qu'une alerte multiple est déclenchée pour `host:X` et `host:Y`, Datadog envoie une notification de monitor pour `host:Y`, mais pas pour `host:X`.

### Planifier un downtime

{{< tabs >}}
{{% tab "Ponctuel" %}}

Définissez un downtime ponctuel en saisissant la date et l'heure de début, ainsi que le fuseau horaire. Vous pouvez aussi définir une date et une heure de fin.

{{% /tab %}}
{{% tab "Récurrent" %}}

Les downtimes récurrents sont utiles pour les périodes de maintenance récurrentes.

Définissez un downtime récurrent en saisissant la date et l'heure de début, le fuseau horaire, la répétition et la durée. Vous pouvez aussi préciser une date de fin ou un nombre d'occurrences.

Lorsqu'une occurrence d'un downtime récurrent prend fin, cette occurrence est annulée et un nouveau downtime possédant les mêmes caractéristiques (avec une nouvelle date de début et de fin) est créé. **Remarque** : le créateur d'origine est associé à tous les nouveaux downtimes créés.

{{% /tab %}}
{{< /tabs >}}

### Ajouter un message

Saisissez un message pour informer votre équipe à propos de ce downtime. Le champ de message prend en charge la [mise en forme Markdown][2] standard ainsi que la fonction de `notification « @ » ` de Datadog.

### Informer votre équipe

Informez votre équipe en spécifiant les membres de l'équipe ou envoyez le message à une [intégration][3] de service.

## Gérer les downtimes

La page Manage Downtime affiche la liste des downtimes actifs et planifiés. Sélectionnez un downtime pour afficher plus de détails, pour le modifier ou pour le supprimer. Utilisez la zone de texte _Filter downtimes_ pour chercher des downtimes.

### Historique

L'historique des downtimes est accessible depuis la page [Monitor Status][4] (il est superposé à l'historique de transition des groupes). Vous pouvez également le consulter dans le [flux d'événements][5] en recherchant `tags:audit,downtime`, ou en précisant un ID de downtime spécifique : `tags:audit,downtime_id:<ID_DOWNTIME>`.

### Désactivation

Les monitors déclenchent des événements lorsque leur statut, à savoir `ALERT`, `WARNING`, `RESOLVED` et `NO DATA`, change. Lorsqu'un monitor est désactivé ou fait l'objet d'un downtime planifié et que son statut passe de `RESOLVED` à un autre statut, **aucun** événement ni aucune notification ne se déclenche.

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="downtime sur une alerte" style="width:80%;">}}

**Remarque** : si vous désactivez ou réactivez un monitor via l'IU, les downtimes planifiés associés à ce monitor ne sont pas supprimés. Pour modifier ou supprimer un downtime, utilisez la page [Manage Downtimes][1] ou passez par l'[API][6].

Si un monitor possède un état nécessitant l'envoi d'une alerte (`ALERT`, `WARNING` ou `NO DATA`) lorsque le downtime prend fin, le monitor se rétablit automatiquement et se déclenche à nouveau peu de temps après si les conditions d'alerte sont remplies. Cette logique s'applique aux monitors qui changent d'état lors d'un downtime (en passant par exemple de l'état `OK` à l'état `ALERT`, `WARNING` ou `NO DATA`), mais également aux monitors qui possédaient déjà un état nécessitant l'envoi d'une alerte au début du downtime.

**1er exemple :** monitor possédant un état d'alerte *avant* le début du downtime et conservant le *même état* pendant la durée du downtime :
1. Pendant le downtime, les notifications pour cette alerte sont désactivées.
2. Le monitor conserve son état d'alerte, car les conditions sont toujours remplies.
3. Le downtime prend fin.
4. Le monitor est automatiquement rétabli.
5. Les conditions d'alerte sont toujours remplies, ce qui déclenche l'envoi d'une notification.

**2e exemple :** monitor possédant un état d'alerte *avant* le début d'un downtime et rétabli *pendant* le downtime :
1. Le monitor passe d'un état d'alerte à l'état `OK`.
2. La notification de rétablissement est envoyée pendant le downtime, mais uniquement pour le premier rétablissement de ce downtime.

### Rapport sur les monitors

Tous les états d'alerte sont inclus dans le [rapport hebdomadaire sur les monitors][7], même si le monitor est en downtime.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#/downtime
[2]: http://daringfireball.net/projects/markdown/syntax
[3]: /fr/integrations/#cat-notification
[4]: /fr/monitors/monitor_status/
[5]: /fr/events/#event-stream
[6]: /fr/api/v1/downtimes/#cancel-a-downtime
[7]: /fr/account_management/#preferences