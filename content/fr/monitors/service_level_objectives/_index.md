---
aliases:
- /fr/monitors/monitor_uptime_widget/
- /fr/monitors/slos/
description: Faire un suivi du statut de vos SLO
further_reading:
- link: https://www.datadoghq.com/blog/slo-monitoring-tracking/
  tag: Blog
  text: Surveiller le statut et la marge d'erreur de vos SLO avec Datadog
- link: https://learn.datadoghq.com/course/view.php?id=34
  tag: Centre d'apprentissage
  text: Présentation des Service Level Objectives (SLO)
- link: https://www.datadoghq.com/blog/service-page/
  tag: Blog
  text: Télémétrie sur les services, suivi des erreurs, SLO et plus encore
kind: documentation
title: Service Level Objectives
---

{{< vimeo 382481078 >}}

<br />

## Présentation

Les SLO (Service Level Objectives) constituent un outil essentiel pour optimiser le niveau de fiabilité d'un site. Les SLO fournissent un cadre permettant de définir des objectifs précis relatifs aux performances de l'application, aidant ainsi les équipes à proposer une expérience client homogène, à assurer les développements futurs sans compromettre la stabilité de la plateforme, et à améliorer la communication avec les utilisateurs internes et externes.

## Termes clés

Service Level Indicator (SLI)
: Mesure quantitative des performances ou de la fiabilité d'un service. Dans les SLO Datadog, un SLI est une métrique ou une agrégation d'un ou de plusieurs monitors.

Service Level Objective (SLO)
: Pourcentage cible pour un SLI sur une période spécifique.

Service Level Agreement (SLA)
: Accord explicite ou implicite entre un client et un prestataire de services stipulant les attentes du client en termes de fiabilité et les conséquences pour le prestataire de services en cas de manquement.

Marge d'erreur
: La part autorisée de manque de fiabilité dérivée du pourcentage cible d'un SLO (100 % - pourcentage cible), à investir dans le développement produit.

## Configuration

Vous pouvez utiliser la [page de statut des Service Level Objectives][1] de Datadog pour créer des SLO ou consulter et gérer tous vos SLO existants. Vous pouvez également ajouter des [widgets Résumé des SLO][2] à vos dashboards pour visualiser immédiatement les statuts de vos SLO.

### Configuration

1. Sur la [page de statut des SLO][1], sélectionnez **New SLO +**.
2. Définissez la source de vos SLO. Les SLO peuvent être basés sur des [métriques][3] ou des [monitors][4].
3. Définissez jusqu'à trois cibles SLO. Chaque cible est composée d'un pourcentage cible et d'une fenêtre temporelle. Fenêtres disponibles : 7 jours, 30 jours et 90 jours. Nous vous recommandons d'opter pour des pourcentages cibles SLO plus stricts que ceux stipulés dans vos SLA.
4. Enfin, donnez un titre à votre SLO, spécifiez une description plus détaillée ou ajoutez des liens dans la description, ajoutez des tags et enregistrez-le.

Après avoir défini le SLO, sélectionnez-le dans la [liste des SLO][1] afin d'accéder au volet latéral détaillé. Ce dernier affiche le pourcentage de statut global et la marge d'erreur globale restante pour chacune des cibles du SLO, ainsi que des barres de statut (SLO basés sur des monitors) ou des graphiques à barres (SLO basés sur des métriques) issus de l'historique du SLI. Si vous avez créé un SLO groupé basé sur des monitors à l'aide d'un [monitor à alertes multiples][5] ou un SLO groupé basé sur des métriques à l'aide de la [condition `sum by`][6], le pourcentage de statut global et la marge d'erreur restante sont indiqués pour l'ensemble des éléments, ainsi que pour chaque groupe individuel.

**Exemple :** si vous créez un SLO basé sur des monitors pour suivre la latence par zone de disponibilité, cette vue affiche les pourcentages de statut et la marge d'erreur restante pour le SLO global ainsi que pour chaque zone de disponibilité individuelle suivie par le SLO.

**Remarque :** la marge d'erreur restante est affichée sous la forme d'un pourcentage, et est calculée à l'aide de la formule ci-dessous.
{{< img src="monitors/service_level_objectives/error_budget_remaining.jpeg" alt="Formule de la marge d'erreur restante" >}}

### Définir les cibles d'un SLO

Pour tirer profit des marges d'erreur et des alertes associées, vous devez définir des valeurs cibles pour votre SLO strictement inférieures à 100 %.

Une cible de 100 % implique une marge d'erreur de 0 % (puisque marge d'erreur = 100 % - cible SLO). Si vous ne définissez pas une marge d'erreur vous permettant d'assumer un niveau de risque acceptable, il sera difficile de garantir la fiabilité de votre solution pour vos clients tout en investissant dans le développement de nouvelles fonctionnalités. En outre, les SLO avec des valeurs cibles de 100 % entraînent des erreurs de division par zéro lors du processus d'évaluation des alertes SLO.

**Remarque** : le nombre de décimales pouvant être définies pour vos SLO varie en fonction du type du SLO et de la fenêtre temporelle choisis. Consultez les liens ci-dessous pour obtenir plus d'informations pour chaque type de SLO.

[SLO basés sur des monitors][7] : jusqu'à deux décimales pour les cibles de 7 et 30 jours, et jusqu'à trois décimales pour les cibles de 90 jours.

[SLO basés sur des métriques][8] : jusqu'à trois décimales pour toutes les cibles.

## Modifier un SLO

Pour modifier un SLO, passez le curseur sur la rangée du SLO dans la liste et cliquez sur l'icône en forme de crayon qui s'affiche à droite de la rangée. Vous pouvez également cliquer sur la rangée pour ouvrir le volet latéral détaillé et sélectionner le bouton de modification à partir de l'icône en forme d'engrenage en haut à droite du volet.

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

**Remarque** : vous pouvez consulter vos SLO depuis l'écran d'accueil de votre appareil mobile. Pour ce faire, téléchargez l'[application mobile Datadog][9] sur l'[App Store d'Apple][10] ou le [Google Play Store][17].

{{< img src="monitors/service_level_objectives/slos-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="SLO sous iOS et Android">}}

### Tags de SLO

Lorsque vous créez ou modifiez un SLO, vous pouvez ajouter des tags afin de filtrer la [page de statut des SLO][1] ou de créer des [vues enregistrées de SLO][11].

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

- Name
- Description
- Pourcentages cibles et intervalles de temps
- Sources de données (identifiants de monitor ou requête de métrique)

Trois types d'événements d'audit SLO apparaissent dans le flux d'événements :

1. Les événements `SLO Created` indiquent les quatre informations de configuration du SLO au moment de sa création.
2. Les événements `SLO Modified` indiquent les informations de configuration qui ont changé lors d'une modification
3. Les événements `SLO Deleted` indiquent les quatre informations de configuration qui étaient définies avant que le SLO ne soit supprimé

Pour obtenir une liste complète de tous les événements d'audit SLO, entrez la requête de recherche `tags:audit,slo` dans le flux d'événements. Pour afficher la liste des événements d'audit associés à un SLO spécifique, entrez `tags:audit,slo_id:<ID_SLO>` avec l'identifiant du SLO qui vous intéresse.

Vous pouvez également interroger par programmation le flux d'événements à l'aide de l'[API Événements Datadog][12].

**Remarque :** si vous ne voyez pas d'événements s'afficher dans l'interface, élargissez l'intervalle sélectionné sur le flux d'événements (par exemple, choisissez les 7 derniers jours).

{{< img src="monitors/service_level_objectives/slo-audit-events.png" alt="Événements d'audit SLO"  >}}

Pour gérer de façon proactive les configurations de vos SLO, configurez un [monitor d'événement][13] afin de recevoir une alerte lorsqu'un événement correspondant à certains tags se produit.

Par exemple, si vous souhaitez être informé des modifications apportées à un SLO en particulier, configurez un monitor d'événements de façon à ce qu'il recherche le texte `[SLO Modified]` pour les tags `audit,slo_id:<ID_SLO>`.

{{< img src="monitors/service_level_objectives/slo-event-monitor.png" alt="Monitor d'événement SLO"  >}}

## Widgets SLO

Une fois votre SLO créé, ajoutez un widget Résumé des SLO pour visualiser le statut de vos SLO en même temps que les métriques, les logs et les données APM de votre dashboard. Pour en savoir plus sur ce type de widget, consultez la page de [documentation sur le widget SLO][2].

## Corrections de statut SLO

La fonctionnalité de correction de statut vous permet de spécifier des périodes durant lesquelles un SLO n'est pas inclus dans les calculs de statut et de marge d'erreur. Cela peut notamment servir lors de maintenances planifiées.

Lorsque vous créez une plage de correction pour un SLO, la période spécifiée est supprimée des calculs du SLO.
- Pour les SLO basés sur des monitors, la durée de la plage de correction n'est pas comptabilisée.
- Pour les SLO basés sur des métriques, les événements positifs et négatifs qui ont eu lieu lors de la fenêtre de correction sont ignorés.

Vous pouvez choisir de créer des corrections ponctuelles, pour effectuer des modifications occasionnelles, ou des corrections récurrentes, afin d'apporter des ajustements prévisibles à une fréquence régulière. Vous devez définir une heure de début et de fin pour les corrections ponctuelles. À l'inverse, les corrections récurrentes requièrent une heure de début, une durée et un intervalle. Les corrections récurrentes sont basées sur la [spécification RRULE de la norme RFC 5545 iCalendar][14]. Si vous souhaitez que vos corrections récurrentes se répètent indéfiniment, ne définissez pas de date de fin.

Pour ces deux types de corrections, vous devez sélectionner une catégorie qui décrit le motif de la correction. Choisissez parmi les catégories `Scheduled Maintenance`, `Outside Business Hours`, `Deployment` et `Other`. Vous avez également la possibilité de saisir une description pour fournir plus de contexte, si nécessaire.

Vous pouvez configurer pour chaque SLO un nombre maximal de corrections, afin de garantir la rapidité des requêtes associées. Cette limite s'applique uniquement aux statuts des 90 derniers jours de chaque SLO. Ainsi, les corrections concernant une période écoulée depuis plus de 90 jours ne sont pas comptabilisées. En d'autres termes :
- Si la date de fin d'une correction ponctuelle se trouve en dehors des 90 derniers jours, elle ne rentre pas en compte dans le calcul de la limite.
- Si la date de fin de la dernière répétition d'une correction récurrente se trouve en dehors des 90 derniers jours, elle ne rentre pas en compte dans le calcul de la limite.

Voici les limites de correction sur 90 jours applicables par SLO :

| Type de correction   | Limite par SLO |
| ----------------- | ------------- |
| Correction ponctuelle          | 100           |
| Correction récurrente tous les jours   | 2             |
| Correction récurrente toutes les semaines  | 3             |
| Correction récurrente tous les mois | 5             |

Vous pouvez configurer des corrections de statut dans l'interface, en sélectionnant l'option `Correct Status` dans le volet latéral d'un SLO, mais également avec l'[API de corrections de statut SLO][15] ou à l'aide d'une [ressource Terraform][16].

{{< img src="monitors/service_level_objectives/slo-corrections-ui.png" alt="Interface de correction de SLO"  >}}

#### Effectuer une correction dans l'interface

Pour effectuer des corrections de statut SLO dans l'interface, procédez comme suit :

1. Créez un SLO ou cliquez sur un SLO existant.
2. Accédez au volet latéral détaillé du SLO.
3. Sous l'icône en forme d'engrenage, sélectionnez l'option **Correct Status** afin d'ouvrir le menu de création **Status Corrections**.
4. Choisissez l'option `One-Time` ou `Recurring` dans la section **Select the Time Correction Window**, puis saisissez la période à corriger. 
5. Sélectionnez un **type de correction**.
6. Ajoutez si besoin des **notes**.
7. Cliquez sur **Apply Correction**.

Pour consulter, modifier et supprimer des corrections de statut existantes, cliquez sur l'onglet **Corrections** en haut du volet latéral détaillé d'un SLO.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo
[2]: /fr/dashboards/widgets/slo/
[3]: /fr/monitors/service_level_objectives/metric/
[4]: /fr/monitors/service_level_objectives/monitor/
[5]: /fr/monitors/create/types/metric/?tab=threshold#alert-grouping
[6]: /fr/monitors/service_level_objectives/metric/#define-queries
[7]: /fr/monitors/service_level_objectives/monitor/#set-your-slo-targets
[8]: /fr/monitors/service_level_objectives/metric/#set-your-slo-targets
[9]: /fr/mobile
[10]: https://apps.apple.com/app/datadog/id1391380318
[11]: /fr/monitors/service_level_objectives/#saved-views
[12]: /fr/api/v1/events/#query-the-event-stream
[13]: /fr/monitors/create/types/event/
[14]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[15]: /fr/api/latest/service-level-objective-corrections/
[16]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/slo_correction