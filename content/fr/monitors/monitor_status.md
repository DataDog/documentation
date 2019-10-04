---
title: Statut des monitors
kind: documentation
description: Visualiser l'évolution du statut de votre monitor au fil du temps
further_reading:
  - link: monitors/monitor_types
    tag: Documentation
    text: Apprendre à créer un monitor
  - link: monitors/notifications
    tag: Documentation
    text: Configurer les notifications de vos monitors
  - link: monitors/downtimes
    tag: Documentation
    text: Planifier un downtime pour désactiver un monitor
---
{{< img src="monitors/monitor_status/monitor_status_page.png" alt="Page Monitor Status" responsive="true" >}}

## Présentation

Une fois [votre monitor créé][1], la page Monitor Status vous offre une vue d'ensemble de l'évolution du statut de votre monitor au fil du temps.
Cette page se divise en 3 sections principales :

* **[Properties](#properties)**
* **[Status and History](#status-and-history)**
* **[Events](#events)**

Ces sections sont ouvertes par défaut et peuvent être refermées à l'aide de la petite icône `>` située à gauche du nom de chaque section.

### Options de la page Monitor Status

Plusieurs options sont disponibles en haut à droite de la page :

* **Mute** : cette option vous permet de désactiver un monitor directement depuis sa page de statut. Utilisez le champ *Scope* pour définir la durée du downtime.
    Consultez la [documentation relative aux downtimes][2] pour découvrir comment désactiver plusieurs contextes ou monitors à la fois.

    REMARQUE : si vous désactivez ou réactivez un monitor via l'IU, les downtimes planifiés associés à ce monitor seront supprimés.

    {{< img src="monitors/monitor_status/status_mute_monitor.png" alt="Désactiver un monitor depuis la page Monitor Status" responsive="true" style="width:30%;">}}

* **Resolve** : utilisez cette option pour résoudre manuellement votre monitor.

* **Configuration options** : utilisez l'icône en forme d'*engrenage* pour afficher les options disponibles :

    * [Edit][1]
    * Clone
    * [Export][3]
    * Delete

## Properties

{{< img src="monitors/monitor_status/status_monitor_properties.png" alt="Section Properties de la page Monitor Status" responsive="true" style="width:80%;" >}}

La section *Properties* présente des informations générales sur votre monitor :

* Le statut de votre monitor
* Le créateur du monitor
* L'ID du monitor ([pour l'API monitor][4])
* Les tags associés à votre monitor. *Pour modifier la liste des tags, cliquez sur l'icône en forme de crayon*.
* La [requête][5] du monitor
* Le message du monitor

Utilisez l'icône en forme d'*engrenage* en haut à droite de la page pour [modifier][1] les propriétés de votre monitor.

## Status and History

La section *Status and History* présente les changements d'état et de requête au fil du temps, tandis que le graphique **Evaluation Graph** illustre le comportement précis de la requête pour l'intervalle sélectionné sur le graphique *History*. L'Evaluation Graph affiche une échelle fixe qui correspond au laps de temps de l'évaluation de votre monitor : de cette façon, les points représentés restent toujours [correctement agrégés][6]. Faites glisser le cadre sur la chronologie pour visualiser l'évolution de votre monitor sur une période antérieure :

{{< img src="monitors/monitor_status/status_monitor_history.gif" alt="Section History de la page Monitor Status" responsive="true" style="width:80%;" >}}

Pour étudier plus en détail l'évolution de vos métriques, utilisez l'outil [Metric Explorer][7] ou un [notebook][8] dédié.

**Remarque** : si vous voyez `None` ou `no groups found` à la place d'un nom de groupe sur le graphique *Status*, les causes les plus probables sont les suivantes :

* Le monitor vient d'être créé et n'a pas encore été évalué.
* La requête du monitor a récemment été modifiée.
* Un hostname précédemment inclus dans la requête a changé. Les anciens hostnames ne sont plus visibles sur la page après 24 heures.

## Events

Tous les événements générés par votre monitor sont rassemblés dans cette section. Ils apparaissent également dans votre [flux d'événements][9].

{{< img src="monitors/monitor_status/status_monitor_event.png" alt="Section Events de la page Monitor Status" responsive="true" style="width:80%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/monitor_types
[2]: /fr/monitors/downtimes
[3]: /fr/monitors/monitor_types/#import
[4]: /fr/api/?lang=python#monitors
[5]: /fr/graphing/functions
[6]: /fr/videos/datadog101-5-aggregation/?wtime=49s
[7]: https://app.datadoghq.com/metric/explorer
[8]: /fr/graphing/notebooks
[9]: /fr/graphing/event_stream
