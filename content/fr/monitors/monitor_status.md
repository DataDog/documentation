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
    text: Planifier un downtime pour un monitor
---
## Présentation

Une fois [votre monitor créé][1], utilisez la page Monitor Status pour consulter une vue d'ensemble de l'évolution de son statut.

Les sections de la page sont développées par défaut. Toutes les sections (à l'exception de l'en-tête) peuvent être refermées à l'aide de la petite icône de réduction (&or;) située à gauche du nom de chaque section.

{{< img src="monitors/monitor_status/monitor_status_page.png" alt="Page Monitor Status" >}}

## Header

L'en-tête contient le statut du monitor, sa date et son heure, et son titre. À droite se trouvent les boutons **Mute** et **Resolve**, ainsi que l'icône en forme d'engrenage pour accéder aux paramètres.

### Mute

Désactivez un monitor directement depuis sa page de statut. Utilisez le champ **Scope** pour préciser votre downtime. Consultez la [documentation relative aux downtimes][2] pour en savoir plus sur la désactivation de plusieurs contextes ou monitors à la fois.

**Remarque** : si vous désactivez ou réactivez un monitor via l'IU, les downtimes planifiés associés à ce monitor seront supprimés.

### Resolve

Si votre monitor est dans un état d'alerte, le bouton **Resolve** apparaît. Il vous permet de résoudre manuellement votre monitor.

La fonction `resolve` du monitor remplace artificiellement le statut du monitor par `OK` pour sa prochaine évaluation. L'évaluation d'après est effectuée normalement, à partir des données sur lesquelles le monitor est basé.

Si un monitor émet une alerte car ses données actuelles déclenchent l'état `ALERT`, la fonction `resolve` modifie son statut dans l'ordre suivant : `ALERT -> OK -> ALERT`. Par conséquent, l'utilisation de la fonction `resolve` ne vous permet pas d'indiquer que vous avez pris connaissance de l'alerte ni de demander à Datadog d'ignorer l'alerte.

Lorsque les données sont transmises ponctuellement, il convient de résoudre manuellement un monitor. Par exemple, après avoir déclenché une alerte, le monitor ne reçoit plus de données et ne peut donc plus évaluer les conditions d'alerte ni revenir à l'état `OK`. Dans ce cas, la fonction `resolve` ou `Automatically resolve monitor after X hours` rétablit l'état `OK` du monitor.

Cette fonction vous permet par exemple de gérer un monitor reposant sur des métriques d'erreur qui ne sont pas générées en l'absence d'erreur (`aws.elb.httpcode_elb_5xx` ou encore des counters DogStatsD dans votre code qui renvoient des informations _uniquement en cas d'erreur_).

### Paramètres

Cliquez sur l'icône des paramètres en forme d'engrenage pour afficher les options disponibles :

| Option | Description                                                                                                                                                                                                    |
|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Edit   | Modifiez le monitor actuel. Pour en savoir plus, consultez la section [Monitors][1].                                                                                                                                            |
| Clone  | Effectuez une copie de votre monitor actuel.                                                                                                                                                                            |
| Export | Exportez la configuration JSON du monitor actuel. Cette option est également disponible au moment de la [création de votre monitor][1]. Si vous gérez des monitors à l'aide de programmes, définissez un monitor dans l'interface utilisateur et exportez le JSON. |
| Delete | Supprimez le monitor actuel. Une fenêtre de confirmation s'affiche avant que le monitor ne soit supprimé.                                                                                                                                      |

## Properties

La section Properties présente des informations générales sur votre monitor :

| Propriété     | Description                                                                           |
|--------------|---------------------------------------------------------------------------------------|
| Status       | Alert, Warn, No Data ou OK                                                           |
| Type         | En savoir plus sur les [types de monitor][1].                                                  |
| ID           | Utilisé pour l'[API monitor][3].                                                        |
| Date created | La date de création du monitor.                                                     |
| Author       | La personne qui a créé le monitor.                                                   |
| Tags         | Les tags associés au monitor. Modifiez les tags en cliquant sur l'icône en forme de crayon. |
| Query        | En savoir plus sur les [requêtes][4].                                                       |
| Message      | Le message spécifié dans la section de [notification][5] du monitor.                |

## Status and History

La section Status and History affiche la requête et les changements d'état de votre monitor au fil du temps. Pour filtrer les informations, utilisez la barre de recherche, les statuts et le sélecteur d'intervalle au-dessus de la section.

### Status

Le graphique de statut affiche le statut de votre monitor au fil du temps, réparti par groupe. **Remarque** : si le statut `None` ou `no groups found` s'affiche, l'une des situations suivantes peut s'appliquer :

* Le monitor vient d'être créé et n'a pas encore été évalué.
* La requête du monitor a récemment été modifiée.
* Le nom d'un host précédemment inclus dans la requête a été modifié. Les modifications de hostnames ne sont plus affichées dans l'interface d'utilisateur après 24 heures.

### History

Le graphique History affiche les données recueillies en parallèle avec le graphique de statut.

Le graphique Evaluation Graph illustre le comportement précis de la requête durant l'intervalle sélectionné sur le graphique History. Le graphique Evaluation Graph affiche une échelle fixe qui correspond à la fréquence d'évaluation de votre monitor : de cette façon, les points représentés restent toujours correctement agrégés. Faites glisser le cadre sur la chronologie pour visualiser les précédents résultats de l'évaluation du monitor :

{{< img src="monitors/monitor_status/status_monitor_history.mp4" alt="Section History de la page Monitor Status" video="true" width="80%" >}}

Pour étudier plus en détail l'évolution de vos métriques, utilisez un [dashboard][6] ou un [notebook][7].

## Événements

Les événements générés à partir de votre monitor (alertes, avertissements, rétablissements, etc.) sont affichés dans cette section en fonction du sélecteur d'intervalle au-dessus de la section **Status and History**. Les événements sont également affichés dans votre [flux d'événements][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/monitor_types
[2]: /fr/monitors/downtimes
[3]: /fr/api/?lang=python#monitors
[4]: /fr/dashboards/querying
[5]: /fr/monitors/notifications
[6]: /fr/dashboards
[7]: /fr/notebooks
[8]: /fr/events