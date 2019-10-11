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
Une fois [votre monitor créé][1], utilisez la page Monitor Status pour consulter une vue d'ensemble de l'évolution de son statut. Cette page comprend les sections suivantes :

* [Header](#header)
* [Properties](#properties)
* [Status and History](#status-and-history)
* [Events](#events)

Ces sections sont ouvertes par défaut. Les trois dernières sections peuvent être refermées à l'aide de la petite icône de réduction (&or;) située à gauche du nom de chaque section.

## Header
À gauche, l'en-tête contient le statut du monitor, sa date et son heure et son titre.

À droite figurent les options **Mute**, **Resolve** et **Settings**.

### Mute
Vous pouvez désactiver un monitor directement depuis sa page de statut. Utilisez le champ **Scope** pour préciser votre downtime. Consultez la [documentation relative aux downtimes][2] pour découvrir comment désactiver plusieurs contextes ou monitors à la fois.

**Remarque** : si vous désactivez ou réactivez un monitor via l'interface utilisateur, les downtimes planifiés associés à ce monitor seront supprimés.

### Resolve
Si votre monitor est dans un état d'alerte, le bouton **Resolve** apparaît. Il vous permet de résoudre manuellement votre monitor.

La fonction `resolve` du monitor remplace artificiellement le statut du monitor par `OK` pour sa prochaine évaluation. L'évaluation d'après sera effectuée normalement, à partir des données sur lesquelles le monitor est basé.

Si un monitor émet une alerte car ses données actuelles déclenchent l'état `ALERT`, la fonction `resolve` modifie son statut dans l'ordre suivant : `ALERT -> OK -> ALERT`. Par conséquent, cette fonction ne vous permet pas d'indiquer que vous avez pris connaissance de l'alerte ni de demander à Datadog d'ignorer l'alerte.

Lorsque les données sont transmises ponctuellement, il convient de `resolve` manuellement un monitor. Après avoir déclenché une alerte, le monitor ne reçoit plus de données et ne peut donc plus évaluer les conditions d'alerte. Dans ce cas, la fonction `resolve` ou `Automatically resolve monitor after X hours` rétablit l'état `OK` de l'alerte.

Cette fonction vous permet par exemple de gérer un monitor reposant sur des métriques d'erreur qui ne sont pas générées en l'absence d'erreur (`aws.elb.httpcode_elb_5xx` ou encore des counters DogStatsD dans votre code qui renvoient des informations _uniquement en cas d'erreur_).

### Paramètres
Cliquez sur l'icône des paramètres en forme d'engrenage pour afficher les options disponibles :

| Option | Description                                                                                                                                                                                                                                |
|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Edit   | Modifiez le monitor actuel. Cliquez [ici][1] pour en savoir plus sur les différents types de monitors.                                                                                                                                                             |
| Clone  | Effectuez une copie de votre monitor actuel.                                                                                                                                                                                                        |
| Export | Exportez la configuration JSON du monitor actuel. Cette option est également disponible au moment de la [création de votre monitor][1]. Si vous gérez et déployez des monitors à l'aide de programmes, il est plus simple de définir le monitor dans l'interface utilisateur et d'exporter le JSON. |
| Delete | Supprimez le monitor actuel. Une fenêtre de confirmation s'affiche avant que le monitor ne soit supprimé.                                                                                                                                                                  |

## Properties

{{< img src="monitors/monitor_status/status_monitor_properties.png" alt="Section Properties de la page Monitor Status" responsive="true" style="width:80%;" >}}

La section *Properties* présente des informations générales sur votre monitor :

* Le statut de votre monitor.
* Le créateur du monitor.
* L'ID du monitor ([pour l'API monitor][3]).
* Les tags associés à votre monitor. *Pour modifier la liste des tags, cliquez sur l'icône en forme de crayon*.
* La [requête][4] du monitor.
* Le message du monitor.

Utilisez l'icône en forme d'*engrenage* en haut à droite de la page pour [modifier][1] les propriétés de votre monitor.

## Status and History

La section *Status and History* présente les changements d'état et de requête au fil du temps, tandis que le graphique **Evaluation Graph** illustre le comportement précis de la requête correspondant au cadre de l'intervalle *sur le graphique History*. Le graphique Evaluation Graph affiche une échelle fixe qui correspond au laps de temps de l'évaluation de votre monitor : de cette façon, les points représentés restent toujours [correctement agrégés][5]. Faites glisser le cadre sur la chronologie pour visualiser les précédents résultats de l'évaluation du monitor :

{{< img src="monitors/monitor_status/status_monitor_history.mp4" alt="Section History de la page Monitor Status" video="true" responsive="true" width="80%" >}}

Pour étudier plus en détail l'évolution de vos métriques, utilisez l'outil [Metric Explorer][6] ou un [notebook][7] dédié.

**Remarque** : si le message `None` ou `no groups found` s'affiche à la place des noms de groupe sur le graphique *Status*, l'erreur provient probablement de l'une des situations suivantes :

* Le monitor vient d'être créé et n'a pas encore été évalué.
* La requête du monitor a récemment été modifiée.
* Le nom d'un host précédemment inclus dans la requête a été modifié. Les modifications de hostnames ne sont plus affichées dans l'interface d'utilisateur après 24 heures.

## Événements

Tous les événements générés par votre monitor sont agrégés dans cette section. Ils apparaissent également dans votre [flux d'événements][8].

{{< img src="monitors/monitor_status/status_monitor_event.png" alt="Section Events de la page Monitor Status" responsive="true" style="width:80%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/monitor_types
[2]: /fr/monitors/downtimes
[3]: /fr/api/?lang=python#monitors
[4]: /fr/graphing/functions
[5]: /fr/videos/datadog101-5-aggregation/?wtime=49s
[6]: https://app.datadoghq.com/metric/explorer
[7]: /fr/graphing/notebooks
[8]: /fr/graphing/event_stream