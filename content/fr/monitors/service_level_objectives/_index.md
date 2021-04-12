---
title: Service Level Objectives
kind: documentation
description: Faire un suivi du statut de vos SLO
aliases:
  - /fr/monitors/monitor_uptime_widget/
  - /fr/monitors/slos/
further_reading:
  - link: 'https://www.datadoghq.com/blog/slo-monitoring-tracking/'
    tag: Blog
    text: Surveiller le statut et le budget d'indisponibilité de vos SLO avec Datadog
  - link: 'https://learn.datadoghq.com/course/view.php?id=34'
    tag: Centre d'apprentissage
    text: Présentation des Service Level Objectives (SLO)
---
{{< vimeo 382481078 >}}

<br />

## Présentation

Les SLO (Service Level Objectives) constituent un outil essentiel pour optimiser le niveau de fiabilité d'un site. Les SLO fournissent un cadre permettant de définir des objectifs précis relatifs aux performances de l'application, aidant ainsi les équipes à proposer une expérience client homogène, à assurer les développements futurs sans compromettre la stabilité de la plateforme, et à améliorer la communication avec les utilisateurs internes et externes.

## Termes clés
*Service Level Indicator (SLI)* : mesure quantitative des performances ou de la fiabilité d'un service (dans les SLO Datadog, un SLI est une métrique ou une agrégation d'un ou de plusieurs monitors)

*Service Level Objective (SLO)* : pourcentage cible pour un SLI sur une période spécifique

*Service Level Agreement (SLA)* :  accord explicite ou implicite entre un client et un prestataire de services stipulant les attentes du client en termes de fiabilité et les conséquences pour le prestataire de services en cas de manquement

*Budget d'indisponibilité* : la part autorisée de manque de fiabilité dérivée du pourcentage cible d'un SLO (100 % - pourcentage cible), à investir dans le développement produit

## Configuration

Vous pouvez utiliser la [page de statut des Service Level Objectives][1] de Datadog pour créer des SLO ou consulter et gérer tous vos SLO existants. Vous pouvez également ajouter des [widgets Résumé des SLO][2] à vos dashboards pour visualiser immédiatement les statuts de vos SLO.

### Configuration

1. Sur la [page de statut des SLO][1], sélectionnez **New SLO +**.
2. Définissez la source de vos SLO. Les SLO peuvent être basés sur des [métriques][3] ou des [monitors][4].
3. Définissez jusqu'à trois cibles SLO. Chaque cible est composée d'un pourcentage cible et d'une fenêtre temporelle. Fenêtres disponibles : 7 jours, 30 jours et 90 jours. Nous vous recommandons d'opter pour des pourcentages cibles SLO plus stricts que ceux stipulés dans vos SLA.
4. Enfin, donnez un titre à votre SLO, spécifiez une description plus détaillée ou ajoutez des liens dans la description, ajoutez des tags et enregistrez-le.

Une fois que vous avez défini un SLO, vous pouvez le sélectionner dans la liste sur la [page de statut des Service Level Objectives][1] afin d'accéder au volet latéral détaillé. Le volet latéral affiche alors le pourcentage de statut global et le budget d'indisponibilité global restant pour chacune des cibles du SLO en question, ainsi que des barres de statut (SLO basés sur des monitors) ou des graphiques à barres (SLO basés sur des métriques) issus de l'historique du SLI. Si vous avez créé un SLO groupé basé sur des monitors à l'aide d'un [monitor à alertes multiples][5] ou un SLO groupé basé sur des métriques à l'aide de la [condition `sum by`][6], outre le pourcentage de statut global et le budget d'indisponibilité global restant, vous verrez aussi le pourcentage de statut et le budget d'indisponibilité restant pour chaque groupe individuel.

**Exemple :** si vous créez un SLO basé sur des monitors pour suivre la latence par zone de disponibilité, vous verrez le pourcentage de statut et le budget d'indisponibilité restant pour le SLO global et pour chaque zone de disponibilité individuelle suivie par le SLO.

## Modifier un SLO

Pour modifier un SLO, passez le curseur sur la rangée du SLO dans la liste et cliquez sur l'icône en forme de crayon à droite de la rangée, ou cliquez sur la rangée pour ouvrir le volet latéral détaillé et sélectionnez le bouton de modification à partir de l'icône en forme de roue dentée en haut à droite du volet.

## Rechercher et consulter des SLO

Depuis la [page de statut des Service Level Objectives][1], vous avez la possibilité d'effectuer des recherches avancées parmi tous les SLO afin de trouver, consulter, modifier, cloner ou supprimer des SLO dans les résultats de recherche.

La recherche avancée vous permet d'interroger les SLO en combinant différents attributs :

* `name` et `description` : recherche de texte
* `time window` : 7 jours, 30 jours, 90 jours
* `type` : métrique, monitor
* `creator`
* `tags` : datacenter, env, service, équipe, etc.

Pour lancer une recherche, utilisez les cases à cocher pour les facettes sur la gauche et la barre de recherche en haut. Lorsque vous cochez les cases, la barre de recherche est mise à jour avec la requête équivalente. De même, lorsque vous modifiez la requête de la barre de recherche (ou écrivez vous-même votre propre requête), les cases à cocher se mettent à jour pour refléter les modifications. Les résultats de la requête sont mis à jour en temps réel lorsque vous modifiez la requête. Vous n'avez pas besoin de cliquer sur un bouton « Rechercher ».

Pour modifier un SLO, passez le curseur dessus et utilisez les boutons qui apparaissent à droite de sa rangée : **Edit**, **Clone** et **Delete**. Pour afficher plus de détails sur un SLO, cliquez sur sa rangée dans le tableau pour ouvrir son volet latéral détaillé.

### Tags de SLO

Lorsque vous créez ou modifiez un SLO, vous pouvez ajouter des tags afin de filtrer la [page de statut des SLO][1] ou de créer des [vues enregistrées de SLO][7].

### Vue par défaut des SLO

La vue par défaut des SLO apparaît lorsque vous accédez à la liste des SLO.

La vue par défaut comprend :

- Une requête de recherche vide
- La liste de l'ensemble des SLO définis dans votre organisation
- La liste des facettes disponibles dans le volet latéral de gauche

### Vues enregistrées

Les vues enregistrées vous permettent d'enregistrer des recherches personnalisées dans la liste des SLO et de les partager. Consultez facilement les SLO pertinentes pour votre équipe et vous-même en partageant les éléments suivants :

- Une requête de recherche
- Un sous-ensemble de facettes

Après avoir filtré un sous-ensemble de SLO dans la liste, vous pouvez ajouter la requête correspondante en tant que vue enregistrée.

#### Ajouter une vue enregistrée

Pour ajouter une vue enregistrée :

1. Rédigez une requête pour filtrer vos SLO.
2. Cliquez sur **Save View +** en haut à gauche de la page.
3. Donnez un nom à votre vue, puis enregistrez-la.

#### Charger une vue enregistrée

Pour charger une vue enregistrée, ouvrez le volet *Saved Views* en appuyant sur le bouton **Show Views** en haut à gauche la page et sélectionnez une vue enregistrée dans la liste. Vous pouvez également rechercher des vues enregistrées dans la barre de recherche *Filter Saved Views* en haut de ce même volet *Saved Views*.

#### Partager une vue enregistrée

Passez le curseur sur une vue enregistrée dans la liste et sélectionnez l'icône d'hyperlien pour copier le lien vers la vue enregistrée afin de le partager avec les membres de votre équipe.

#### Gérer les vues enregistrées

Lorsque vous utilisez une vue enregistrée, vous pouvez la mettre à jour en la sélectionnant, en modifiant la requête et en cliquant sur le bouton *Update* en dessous de son nom dans le volet *Saved Views*. Pour modifier le nom d'une vue enregistrée ou pour la supprimer, passez le curseur sur sa rangée dans le volet *Saved Views* et cliquez respectivement sur l'icône en forme de crayon ou de corbeille.

## Événements d'audit SLO

Les événements d'audit SLO vous permettent de suivre l'historique de vos configurations SLO à l'aide du flux d'événements. Les événements d'audit sont ajoutés au flux d'événements chaque fois que vous créez, modifiez ou supprimez un SLO. Chaque événement inclut des informations sur la configuration du SLO, et le flux fournit un historique de l'évolution des modifications de la configuration du SLO.

Chaque événement inclut les informations de configuration du SLO suivantes :

- Nom
- Description
- Pourcentages cibles et intervalles de temps
- Sources de données (identifiants de monitor ou requête de métrique)

Trois types d'événements d'audit SLO apparaissent dans le flux d'événements :

1. Les événements `SLO Created` indiquent les quatre informations de configuration du SLO au moment de sa création.
2. Les événements `SLO Modified` indiquent les informations de configuration qui ont changé lors d'une modification
3. Les événements `SLO Deleted` indiquent les quatre informations de configuration qui étaient définies avant que le SLO ne soit supprimé

Pour obtenir une liste complète de tous les événements d'audit SLO, entrez la requête de recherche `tags:audit,slo` dans le flux d'événements. Pour afficher la liste des événements d'audit associés à un SLO spécifique, entrez `tags:audit,slo_id:<ID_SLO>` avec l'identifiant du SLO qui vous intéresse.

Vous pouvez également interroger automatiquement le flux d'événements à l'aide de l'API des événements DATADOG][8].

**Remarque :** si vous ne voyez pas d'événements s'afficher dans l'interface, élargissez l'intervalle sélectionné sur le flux d'événements (par exemple, choisissez les 7 derniers jours).

{{< img src="monitors/service_level_objectives/slo-audit-events.png" alt="Événements d'audit SLO"  >}}

Pour gérer de façon proactive les configurations de vos SLO, configurez un [monitor d'événement][9] pour recevoir une alerte lorsqu'un événement correspondant à certains tags se produit.

Par exemple, si vous souhaitez être informé des modifications apportées à un SLO en particulier, configurez un monitor d'événements de façon à ce qu'il recherche le texte `[SLO Modified]` pour les tags `audit,slo_id:<ID_SLO>`.

{{< img src="monitors/service_level_objectives/slo-event-monitor.png" alt="Monitor d'événement SLO"  >}}

## Widgets SLO

Une fois votre SLO créé, ajoutez un widget Résumé des SLO pour visualiser le statut de vos SLO en même temps que les métriques, les logs et les données APM de votre dashboard. Pour en savoir plus sur ce type de widget, consultez la page de [documentation sur le widget SLO][2].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo
[2]: /fr/dashboards/widgets/slo/
[3]: /fr/monitors/service_level_objectives/metric/
[4]: /fr/monitors/service_level_objectives/monitor/
[5]: /fr/monitors/monitor_types/metric/?tab=threshold#alert-grouping
[6]: /fr/monitors/service_level_objectives/metric/#define-queries
[7]: /fr/monitors/service_level_objectives/#saved-views
[8]: /fr/api/v1/events/#query-the-event-stream
[9]: /fr/monitors/monitor_types/event/