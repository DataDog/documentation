---
aliases:
- /fr/monitors/downtimes/
description: Planifiez des downtimes pour que vos monitors Datadog n'émettent pas
  d'alertes durant certaines périodes.
further_reading:
- link: /monitors/create/
  tag: Documentation
  text: Créer des monitors
- link: /monitors/notify/
  tag: Documentation
  text: Notifications des monitors
- link: /monitors/manage/
  tag: Documentation
  text: Gérer les monitors
kind: documentation
title: Downtimes
---

Planifiez des downtimes pour éviter de déclencher vos monitors en cas d'arrêt système, de maintenance hors ligne ou de mise à niveau. Les downtimes désactivent les alertes et les notifications de l'ensemble des monitors, mais n'empêchent pas les monitors de changer d'état.

## Planifier un downtime

Pour planifier un [downtime de monitor][1] dans Datadog, utilisez le menu principal : _Monitors –> Manage Downtime_. Cliquez ensuite sur le bouton **Schedule Downtime** en haut à droite.

### Choisir les éléments à désactiver

{{< tabs >}}
{{% tab "En fonction du nom du monitor" %}}

Utilisez le menu déroulant pour choisir les monitors à désactiver ou la fonction de recherche pour les trouver. Si vous choisissez de laisser le champ vide, tous les monitors seront désactivés par défaut. Vous pouvez également sélectionner un contexte afin de limiter votre downtime à un host, appareil ou tag de votre choix. Seuls les monitors qui correspondent à **TOUS les contextes sélectionnés** sont désactivés.

{{% /tab %}}
{{% tab "En fonction des tags du monitor" %}}

Planifiez un downtime basé sur un ou plusieurs [tags de monitor][1]. Vous devez sélectionner au moins un tag, et il n'est pas possible de définir plus de 32 tags. Les noms de tag ne doivent pas dépasser 256 caractères. Seuls les monitors possédant **TOUS les tags sélectionnés** sont désactivés. Vous pouvez également sélectionner des contextes pour restreindre encore plus le downtime.

[1]: /fr/monitors/manage/#monitor-tags
{{% /tab %}}
{{< /tabs >}}

Si vous choisissez de désactiver des monitors limités par un contexte, cliquez sur **Preview affected monitors** pour voir les monitors inclus. Tous les monitors créés ou modifiés après la planification du downtime sont automatiquement inclus dans le downtime s'ils correspondent au contexte.

#### Contexte des downtimes

Si vous limitez un downtime à un simple monitor d'alerte, vous pouvez ignorer le champ `Group scope`. En effet, votre monitor d'alerte est agrégé sur l'ensemble des sources de transmission afin d'envoyer une seule alerte.

Si un monitor à alertes multiples est inclus, il est uniquement désactivé pour les groupes couverts par le contexte. Par exemple, si un downtime est couvert par le contexte `host:X` et qu'une alerte multiple est déclenchée pour `host:X` et `host:Y`, Datadog envoie une notification de monitor pour `host:Y`, mais pas pour `host:X`.

Pour inclure tous les groupes dans la portée d'un downtime appliqué à des monitors à alertes multiples, définissez `Group scope` sur `All`.

L'exemple ci-dessous illustre comment appliquer `Group scope` à des monitors à alertes multiples.

{{< tabs >}}
{{% tab "En fonction du nom du monitor" %}}

**Exemple 1 : désactiver les notifications d'un service spécifique**

1. Pour planifier un downtime pour un seul groupe (ici, `service:web-store`), saisissez le nom de ce groupe dans le champ `Group scope`.
2. L'option **Preview affected monitors** indique que le monitor sélectionné est toujours couvert par le contexte. Par conséquent, les alertes concernant le groupe `service:web-store` sont désactivées lors du downtime planifié.

{{< img src="monitors/downtimes/downtime_examplebyname1_downtime.jpg" alt="exemple de downtime"  style="width:80%;">}}

3. Le downtime planifié commence, et seules les alertes concernant le groupe `service:web-store` sont désactivées pour ce monitor.

{{< img src="monitors/downtimes/downtime_examplebyname1_monitor.jpg" alt="exemple de downtime"  style="width:80%;">}}

4. Pour planifier un downtime sur plusieurs groupes (par exemple, `service:synthesizer` et `service:consul`), vous pouvez créer un downtime supplémentaire par groupe.

**Exemple 2 : désactiver les notifications pour un environnement spécifique d'un monitor regroupé en fonction de `env` et `service`**

1. Pour planifier un downtime pour l'un des groupes (ici, `env:dev`), saisissez le nom de ce groupe dans le champ `Group scope`.
2. L'option **Preview affected monitors** indique que le monitor sélectionné est toujours couvert par le contexte. Par conséquent, les alertes concernant le groupe `env:dev` sont désactivées lors du downtime planifié.

{{< img src="monitors/downtimes/downtime_examplebyname2_downtime.jpg" alt="downtime en fonction du nom du monitor avec l'environnement dev couvert" style="width:80%;">}}

3. Le downtime planifié commence, et les alertes concernant le groupe `env:dev` **et** tous les services associés à l'environnement `dev` sont désactivées.

{{< img src="monitors/downtimes/downtime_examplebyname2_monitor.jpg" alt="statut du groupe indiquant que les alertes de l'environnement dev et des services connexes sont désactivées lors du downtime" style="width:80%;">}}

4. Pour planifier un downtime avec plusieurs critères de regroupement (par exemple, `env:dev` ET `service:web-store`), ajoutez le contexte supplémentaire au downtime.
{{% /tab %}}
{{% tab "En fonction des tags du monitor" %}}

Si un downtime planifié repose sur un tag de monitor commun et que les monitors couverts envoient des alertes multiples avec un critère de regroupement, le champ `Group scope` vous permet de désactiver un groupe commun aux monitors couverts.

**Exemple 1 : deux monitors à alertes multiples, chacun avec un critère de regroupement, partagent le tag de monitor `downtime:true`.**

1. Le *monitor A* est un moniteur à alertes multiples pour les hosts transmettant une métrique de moyenne, calculée pour plusieurs groupes `service`.
2. Le *monitor B* est un moniteur à alertes multiples pour les hosts transmettant la même métrique pour `service:web-store`.
3. Un downtime est planifié pour tous les monitors qui possèdent le tag de monitor `downtime:true`.
4. Ce downtime est limité au groupe `service:web-store`.
5. L'option Preview affected monitors affiche les deux monitors qui partagent le groupe `service:web-store`.

{{< img src="monitors/downtimes/downtime_examplebytag1_downtime.jpg" alt="exemple de downtime"  style="width:80%;">}}

6. Le *monitor A* indique que le downtime a commencé, mais uniquement pour le groupe couvert par le contexte : `service:web-store`.

{{< img src="monitors/downtimes/downtime_examplebytag1_monitor.jpg" alt="exemple de downtime"  style="width:80%;">}}

7. Le *monitor B* indique que le downtime a commencé pour `service:web-store`. Puisque tous les groupes du monitor (basés sur `host`) appartiennent à `service:web-store`, tous les hosts sont désactivés pour ce monitor lors du downtime.

{{< img src="monitors/downtimes/downtime_examplebytag1_monitor2.jpg" alt="exemple de downtime"  style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

### Planifier un downtime

{{< tabs >}}
{{% tab "Ponctuel" %}}

Définissez un downtime ponctuel en saisissant la date et l'heure de début, ainsi que le fuseau horaire. Vous pouvez aussi définir une date et une heure de fin.

{{< img src="monitors/downtimes/downtime_onetime.jpg" alt="downtime sur une alerte"  style="width:80%;">}}

{{% /tab %}}
{{% tab "Récurrent" %}}

Les downtimes récurrents sont utiles pour les périodes de maintenance récurrentes.

Définissez un downtime récurrent en saisissant la date et l'heure de début, le fuseau horaire, la répétition et la durée. Vous pouvez aussi préciser une date de fin ou un nombre d'occurrences.

Lorsqu'une occurrence d'un downtime récurrent prend fin, cette occurrence est annulée et un nouveau downtime possédant les mêmes caractéristiques (avec une nouvelle date de début et de fin) est créé. **Remarque** : le créateur d'origine est associé à tous les nouveaux downtimes créés.

{{< img src="monitors/downtimes/downtime_recurring.jpg" alt="downtime sur une alerte"  style="width:80%;">}}

Utilisez des RRULE, ou [règles de récurrence][1], pour planifier des downtimes. Servez-vous du [générateur de RRULE][2] officiel pour créer des règles de récurrence.

Ces règles vous permettent notamment de définir des downtimes pour certains jours du mois, par exemple le 3e lundi de chaque mois :

{{< img src="monitors/downtimes/downtime_rrule.jpg" alt="downtime sur une alerte"  style="width:80%;">}}

**Remarque** : les attributs spécifiant une durée ne sont pas pris en charge par les RRULE (par exemple, `DTSTART`, `DTEND` ou `DURATION`).


[1]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[2]: https://icalendar.org/rrule-tool.html
{{% /tab %}}
{{< /tabs >}}

### Ajouter un message

Saisissez un message pour informer votre équipe à propos de ce downtime. Le champ de message prend en charge la [mise en forme Markdown][2] standard ainsi que la fonction de `notification « @ » ` de Datadog.

### Informer votre équipe

Informez votre équipe en spécifiant les membres de l'équipe ou envoyez le message à une [intégration][3] de service.

#### Désactiver la première notification de rétablissement

Par défaut, Datadog envoie une notification de rétablissement pour les monitors qui se déclenchent **avant** un downtime et se rétablissent **pendant** celui-ci. Cette notification s'avère particulièrement utile si vous utilisez des intégrations tierces pour fermer automatiquement des incidents en cours. Cochez la case indiquée ci-dessous pour désactiver l'envoi de ces notifications.

{{< img src="monitors/downtimes/downtime_first_recovery.png" alt="désactiver la première notification de rétablissement" style="width:80%;">}}

Cette option peut se cumuler sur plusieurs downtimes. Par exemple, si un certain nombre de downtimes se chevauchent et qu'ils désactivent un même monitor, la première notification de rétablissement est désactivée tant que l'option est activée pour **au moins un** de ces downtimes.

**Remarque** : cette option désactive la **première** notification de rétablissement. Si un monitor se déclenche et est rétabli pendant un downtime, les notifications correspondantes sont toujours désactivées, et ce peu importe les paramètres de l'option.

## Gérer les downtimes

La page Manage Downtime affiche la liste des downtimes actifs et planifiés. Sélectionnez un downtime pour afficher ses détails, le modifier ou le supprimer. Les détails d'un downtime comprennent son créateur, son contexte et la liste des monitors auxquels il s'applique. Utilisez le volet des facettes et la barre de recherche pour filtrer la liste en fonction du `Creator`, du `Scope`, des `Monitor Tags` ou encore des paramètres `Active`, `Automuted` ou `Recurring`.

{{< img src="monitors/downtimes/downtime_manage.png" alt="page Manage Downtime" style="width:100%;">}}

### History

L'historique des downtimes est accessible depuis la page [Monitor Status][4] (il est superposé à l'historique de transition des groupes). Vous pouvez également le consulter dans l'[Events Explorer][5] en recherchant `tags:audit,downtime`, ou en précisant un ID de downtime spécifique : `tags:audit,downtime_id:<ID_DOWNTIME>`.

### Désactivation

Les monitors déclenchent des événements lorsque leur statut, à savoir `ALERT`, `WARNING`, `RESOLVED` et `NO DATA`, change. Lorsqu'un monitor est désactivé ou fait l'objet d'un downtime planifié et que son statut passe de `RESOLVED` à un autre statut, **aucun** événement ni aucune notification ne se déclenche.

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="downtime sur une alerte" style="width:80%;">}}

**Remarque** : si vous désactivez ou réactivez les notifications d'un monitor à partir de la page de statut du monitor, les downtimes planifiés associés à ce monitor ne sont pas supprimés. Pour modifier ou supprimer un downtime, utilisez la page [Manage Downtimes][1] ou passez par l'[API][6].

### Expiration

Si un monitor possède un état nécessitant l'envoi d'une alerte (`ALERT`, `WARNING` ou `NO DATA`) lorsque le downtime prend fin, le monitor déclenche l'envoi d'une nouvelle notification. Cette logique s'applique aux monitors qui changent d'état lors d'un downtime (en passant par exemple de l'état `OK` à l'état `ALERT`, `WARNING` ou `NO DATA`), ainsi qu'aux monitors qui possédaient déjà un état nécessitant l'envoi d'une alerte au début du downtime. Lorsqu'un downtime est annulé manuellement, les notifications ne sont pas envoyées, même si le monitor passe à un état nécessitant l'envoi d'une alerte.

**1er exemple :** monitor possédant un état d'alerte *avant* le début du downtime et conservant le *même état* pendant la durée du downtime :
1. Pendant le downtime, les notifications pour cette alerte sont désactivées.
2. Le monitor conserve son état d'alerte, car les conditions sont toujours remplies.
3. Le downtime prend fin.
4. Les conditions d'alerte sont toujours remplies, ce qui déclenche l'envoi d'une notification.

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
[4]: /fr/monitors/manage/status/
[5]: /fr/events/explorer
[6]: /fr/api/v1/downtimes/#cancel-a-downtime
[7]: /fr/account_management/#preferences