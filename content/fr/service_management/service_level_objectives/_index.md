---
aliases:
- /fr/monitors/monitor_uptime_widget/
- /fr/monitors/slos/
- /fr/monitors/service_level_objectives/
description: Faire un suivi du statut de vos SLO
further_reading:
- link: https://www.datadoghq.com/blog/slo-monitoring-tracking/
  tag: Blog
  text: Surveiller le statut et la marge d'erreur de vos SLO avec Datadog
- link: https://learn.datadoghq.com/courses/intro-to-slo
  tag: Centre d'apprentissage
  text: Présentation des Service Level Objectives (SLO)
- link: https://www.datadoghq.com/blog/service-page/
  tag: Blog
  text: Télémétrie sur les services, suivi des erreurs, SLO et plus encore
- link: https://www.datadoghq.com/blog/monitor-service-performance-with-slo-alerts/
  tag: Blog
  text: Surveiller de manière proactive les performances d'un service avec des alertes
    SLO
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive sur la création de monitors et de SLO
    efficaces
title: Service Level Objectives
---

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/382481078/rendition/1080p/file.mp4?loc=external&signature=f5a81ca1c44d9c1c2cfcbd23c2b6b4f89914027ff344fb0a9f8dc6b9a1d141aa" poster="/images/poster/slo.png" >}}

{{< jqmath-vanilla >}}

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

## Implémentation

Accédez à la [page de statut des Service Level Objectives][1] de Datadog pour créer des SLO ou consulter et gérer tous vos SLO existants. Vous pouvez également ajouter des [widgets SLO](#widgets-slo) à vos dashboards pour visualiser immédiatement les statuts de vos SLO.

### Configuration

1. Sur la [page de statut des SLO][1], sélectionnez **New SLO +**.
2. Définissez la source de votre SLO. Vous pouvez créer un SLO à partir de [métriques][2] ou de [monitors][3].
3. Définissez une cible et une période mobile (7, 30 ou 90 derniers jours) pour le SLO. Datadog vous conseille de définir une cible plus stricte que vos SLA en place. Si vous configurez plusieurs périodes, définissez la principale. Cette dernière est affichée dans les listes de SLO. Par défaut, la période la plus courte est sélectionnée.
4. Enfin, donnez un titre à votre SLO, spécifiez une description plus détaillée ou ajoutez des liens dans la description, ajoutez des tags et enregistrez-le.

Après avoir défini le SLO, sélectionnez-le dans la [liste des SLO][1] afin d'accéder au volet latéral détaillé. Ce dernier affiche le pourcentage de statut global et la marge d'erreur globale restante pour chacune des cibles du SLO, ainsi que des barres de statut (SLO basés sur des monitors) ou des graphiques à barres (SLO basés sur des métriques) issus de l'historique du SLI. Si vous avez créé un SLO groupé basé sur des monitors à l'aide d'un [monitor à alertes multiples][5] ou un SLO groupé basé sur des métriques à l'aide de la [condition `sum by`][6], le pourcentage de statut global et la marge d'erreur restante sont indiqués pour l'ensemble des éléments, ainsi que pour chaque groupe individuel.

**Exemple :** si vous créez un SLO basé sur des monitors pour suivre la latence par zone de disponibilité, cette vue affiche les pourcentages de statut et la marge d'erreur restante pour le SLO global ainsi que pour chaque zone de disponibilité individuelle suivie par le SLO.

**Remarque** : la marge d'erreur restante est affichée sous la forme de pourcentage, et est calculée à partir de la formule suivante : 

$$\text"marge d'erreur restante" = 100 * {\text"statut actuel" - \text" cible"} / { 100 - \text"cible"}$$

### Définir les cibles d'un SLO

Pour tirer profit des marges d'erreur et des alertes associées, vous devez définir des valeurs cibles pour votre SLO strictement inférieures à 100 %.

Une cible de 100 % implique une marge d'erreur de 0 % (puisque marge d'erreur = 100 % - cible SLO). Si vous ne définissez pas une marge d'erreur vous permettant d'assumer un niveau de risque acceptable, il sera difficile de garantir la fiabilité de votre solution pour vos clients tout en investissant dans le développement de nouvelles fonctionnalités. En outre, les SLO avec des valeurs cibles de 100 % entraînent des erreurs de division par zéro lors du processus d'évaluation des alertes SLO.

**Remarque** : le nombre de décimales pouvant être définies pour vos SLO varie en fonction du type du SLO et de la fenêtre temporelle choisis. Consultez les liens ci-dessous pour obtenir plus d'informations pour chaque type de SLO.

[SLO basés sur des monitors][7] : jusqu'à deux décimales pour les cibles de 7 et 30 jours, et jusqu'à trois décimales pour les cibles de 90 jours.

[SLO basés sur des métriques][8] : jusqu'à trois décimales pour toutes les cibles.

## Modifier un SLO

Pour modifier un SLO, passez le curseur sur la rangée du SLO dans la liste et cliquez sur l'icône en forme de crayon qui s'affiche à droite de la rangée. Vous pouvez également cliquer sur la rangée pour ouvrir le volet latéral détaillé et sélectionner le bouton de modification à partir de l'icône en forme d'engrenage en haut à droite du volet.

## Autorisations

### Accès à base de rôles

Tous les utilisateurs peuvent consulter les SLO ainsi que leurs [corrections de statut](#corrections-de-statut-slo), peu importe le [rôle][8] dont ils disposent. Seuls les utilisateurs possédant un rôle avec l'autorisation `slos_write` peuvent créer, modifier et supprimer des SLO.

Pour créer, modifier et supprimer des corrections de statut, les utilisateurs doivent disposer de l'autorisation `slos_corrections`. Il n'est pas nécessaire d'être autorisé à modifier un SLO pour pouvoir effectuer des corrections de statut pour ce SLO. Pour obtenir la liste complète des autorisations, consultez la [documentation relative au RBAC][9].

### Contrôles d'accès granulaires

Pour limiter l'accès à certains SLO, définissez la liste des [rôles][8] autorisés à les modifier.

{{< img src="service_management/service_level_objectives/slo_set_permissions.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Option Permissions des SLO dans le menu des paramètres">}}

1. Cliquez sur le SLO pour ouvrir le volet latéral des détails.
1. Cliquez sur l'icône des paramètres en haut à droite du volet.
1. Sélectionnez **Permissions**.
1. Cliquez sur **Restrict Access**.
1. La boîte de dialogue affiche alors les membres de votre organisation disposant de l'autorisation **Viewer** par défaut.
1. Depuis la liste déroulante, sélectionnez les rôles, équipes (bêta) ou utilisateurs (bêta) autorisés à modifier le SLO.
1. Cliquez sur **Add**.
1. La boîte de dialogue indique alors que le rôle sélectionné possède l'autorisation **Editor**.
1. Cliquez sur **Save**.

Afin de toujours pouvoir modifier un SLO, vous devez inclure au moins un de vos rôles avant d'enregistrer les modifications. Les utilisateurs figurant dans la liste de contrôle d'accès peuvent ajouter des rôles et supprimer tous les rôles sauf le leur.

**Remarque** : les utilisateurs peuvent créer des SLO pour n'importe quel monitor, même s'ils ne possèdent pas d'autorisation d'écriture pour le monitor en question. De la même façon, il est possible de créer des alertes SLO sans posséder d'autorisation d'écriture pour le SLO. Pour en savoir plus sur les autorisations RBAC pour les monitors, consultez la [documentation relative au RBAC][10] ou la section [Configuration du RBAC pour les monitors][11].

## Rechercher un SLO

Depuis la [page de statut des Service Level Objectives][1], vous avez la possibilité d'effectuer des recherches avancées parmi tous les SLO afin de trouver, consulter, modifier, cloner ou supprimer des SLO dans les résultats de recherche.

La recherche avancée vous permet d'interroger les SLO en combinant différents attributs :

* `name` et `description` : recherche de texte
* `time window` : 7 jours, 30 jours, 90 jours
* `type` : métrique, monitor
* `creator`
* `tags` : datacenter, env, service, équipe, etc.

Pour lancer une recherche, utilisez les cases à cocher pour les facettes sur la gauche et la barre de recherche en haut. Lorsque vous cochez les cases, la barre de recherche est mise à jour avec la requête équivalente. De même, lorsque vous modifiez la requête de la barre de recherche (ou écrivez vous-même votre propre requête), les cases à cocher se mettent à jour pour refléter les modifications. Les résultats de la requête sont mis à jour en temps réel lorsque vous modifiez la requête. Vous n'avez pas besoin de cliquer sur un bouton « Rechercher ».

## Visualiser des SLO

Regroupez vos SLO par *équipe*, *service* ou *environnement* pour obtenir une vue d'ensemble de vos données. Vous pouvez visualiser en quelques secondes le nombre de SLO possédant chaque état (dépassement, avertissement, OK et aucune donnée), en regroupant vos SLO par contexte.

{{< img src="service_management/service_level_objectives/slo_group_by.png" alt="Vue d'ensemble des SLO avec un regroupement par équipe" style="width:100%;" >}}

Triez vos SLO à l'aide des colonnes *Status* et *Error Budget* pour déterminer les SLO les plus urgents. La liste des SLO contient les détails des SLO sur la principale période sélectionnée dans votre [configuration](#configuration). Toutes les autres périodes peuvent être définies dans le volet latéral individuel. Cliquez sur une rangée du tableau pour afficher le volet latéral des détails du SLO.

**Remarque** : vous pouvez consulter vos SLO depuis l'écran d'accueil de votre appareil mobile. Pour ce faire, téléchargez l'[application mobile Datadog][12] sur l'[App Store d'Apple][13] ou le [Google Play Store][14].

{{< img src="service_management/service_level_objectives/slos-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="SLO sous iOS et Android">}}

### Tags de SLO

Lorsque vous créez ou modifiez un SLO, vous pouvez ajouter des tags afin de filtrer la [page de statut des SLO][1] ou de créer des [vues enregistrées de SLO][15].

Ajoutez des tags à un grand nombre de SLO grâce aux options *Edit Tags* et *[Edit Teams][16]* du menu déroulant en haut de la liste des SLO.

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

Les événements d'audit SLO vous permettent de suivre l'historique de vos configurations SLO à l'aide de l'Events Explorer. Les événements d'audit sont ajoutés à l'Events Explorer chaque fois que vous créez, modifiez ou supprimez un SLO. Chaque événement inclut des informations sur la configuration du SLO, et le flux fournit un historique de l'évolution des modifications de la configuration du SLO.

Chaque événement inclut les informations de configuration du SLO suivantes :

- Nom
- Description
- Pourcentages cibles et intervalles de temps
- Sources de données (identifiants de monitor ou requête de métrique)

Trois types d'événements d'audit SLO figurent dans l'Events Explorer :

1. Les événements `SLO Created` indiquent les quatre informations de configuration du SLO au moment de sa création.
2. Les événements `SLO Modified` indiquent les informations de configuration qui ont changé lors d'une modification
3. Les événements `SLO Deleted` indiquent les quatre informations de configuration qui étaient définies avant que le SLO ne soit supprimé

Pour obtenir la liste complète de tous les événements d'audit SLO, saisissez la requête de recherche `tags:audit,slo` dans l'Events Explorer. Pour afficher la liste des événements d'audit associés à un SLO spécifique, saisissez `tags:audit,slo_id:<ID_SLO>` avec l'identifiant du SLO qui vous intéresse.

Vous pouvez également interroger par programmation l'Events Explorer à l'aide de l'[API Événements Datadog][17].

**Remarque** : si aucun événement ne s'affiche dans l'interface, élargissez l'intervalle de l'Events Explorer (par exemple, choisissez les 7 derniers jours).

{{< img src="service_management/service_level_objectives/slo-audit-events.png" alt="Événement d'audit SLO" >}}

Par exemple, si vous souhaitez être informé des modifications apportées à un SLO en particulier, configurez un monitor d'événements de façon à ce qu'il recherche le texte `[SLO Modified]` pour les tags `audit,slo_id:<ID_SLO>`.

{{< img src="service_management/service_level_objectives/slo-event-monitor.png" alt="Monitor d'événement de SLO" >}}

## Widgets SLO

Une fois votre SLO créé, vous pouvez visualiser les données grâce aux dashboards et widgets.
  - Utilisez le widget Résumé de SLO pour visualiser le statut d'un SLO.
  - Utilisez le widget Liste de SLO pour visualiser un ensemble de SLO.
  - Ajoutez la [source de données SLO][18] dans des widgets Série temporelle et des widgets scalaires (Valeur de requête, Top list, Tableau et Évolution) pour représenter 15 mois de données de SLO basés sur des métriques.

Pour en savoir plus sur les widgets SLO, consultez les pages [Widget Résumé de SLO][19] et [Widget Liste de SLO][20]. Pour en savoir plus sur la source de données SLO, consultez la section [Représenter des données SLO historiques dans des dashboards][18].

Pour gérer de façon proactive les configurations de vos SLO, configurez un [monitor d'événement][11] afin de recevoir une alerte lorsqu'un événement correspondant à certains tags se produit.

## Corrections de statut SLO

La fonctionnalité de correction de statut vous permet d'exclure des périodes précises des calculs de statut et de marge d’erreur d'un SLO. De cette façon, vous pouvez :
- Faire en sorte que les downtimes prévus, comme une maintenance périodique, ne soient pas pris en compte dans votre marge d'erreur
- Ignorer les heures creuses, où vous n'êtes pas censé respecter vos SLO
- Vous assurer que les problèmes temporaires causés par des déploiements n'ont aucun impact négatif sur vos SLO

Lorsque vous appliquez une correction, la période spécifiée n'est plus incluse dans les calculs du SLO.
- Pour les SLO basés sur des monitors, l'intervalle de temps de la correction n'est pas comptabilisé.
- Pour les SLO basés sur des métriques, les événements positifs et négatifs qui ont eu lieu lors de la fenêtre de correction sont ignorés.

Vous pouvez choisir de créer des corrections ponctuelles, pour effectuer des modifications occasionnelles, ou des corrections récurrentes, afin d'apporter des ajustements prévisibles à une fréquence régulière. Vous devez définir une heure de début et de fin pour les corrections ponctuelles. Les corrections récurrentes requièrent une heure de début, une durée et un intervalle. Les corrections récurrentes sont basées sur la [spécification RRULE de la norme RFC 5545 iCalendar][22]. Les règles `FREQ`, `INTERVAL`, `COUNT` et `UNTIL` sont prises en charge. Si vous souhaitez que vos corrections récurrentes se répètent indéfiniment, ne définissez pas de date de fin.

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

Vous pouvez configurer des corrections de statut dans l'interface, en sélectionnant l'option `Correct Status` dans le volet latéral d'un SLO, mais également avec l'[API de corrections de statut SLO][23] ou à l'aide d'une [ressource Terraform][24].

{{< img src="service_management/service_level_objectives/slo-corrections-ui.png" alt="Interface de correction de SLO" >}}

#### Effectuer une correction dans l'interface

Pour effectuer des corrections de statut SLO dans l'interface, procédez comme suit :

1. Créez un SLO ou cliquez sur un SLO existant.
2. Accédez au volet latéral des détails du SLO.
3. Sous l'icône en forme d'engrenage, sélectionnez l'option **Correct Status** afin d'ouvrir le menu de création **Status Corrections**.
4. Choisissez l'option `One-Time` ou `Recurring` dans la section **Select the Time Correction Window**, puis saisissez la période à corriger. 
5. Sélectionnez un **type de correction**.
6. Ajoutez si besoin des **notes**.
7. Cliquez sur **Apply Correction**.

Pour consulter, modifier et supprimer des corrections de statut existantes, cliquez sur l'onglet **Corrections** en haut du volet latéral détaillé d'un SLO.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo
[2]: /fr/service_management/service_level_objectives/metric/
[3]: /fr/service_management/service_level_objectives/monitor/
[4]: /fr/monitors/types/metric/?tab=threshold#alert-grouping
[5]: /fr/service_management/service_level_objectives/metric/#define-queries
[6]: /fr/service_management/service_level_objectives/monitor/#set-your-slo-targets
[7]: /fr/service_management/service_level_objectives/metric/#set-your-slo-targets
[8]: /fr/account_management/rbac/
[9]: /fr/account_management/rbac/permissions/#service-level-objectives/
[10]: /fr/account_management/rbac/permissions/#monitors
[11]: /fr/monitors/guide/how-to-set-up-rbac-for-monitors/
[12]: /fr/mobile
[13]: https://apps.apple.com/app/datadog/id1391380318
[14]: https://play.google.com/store/apps/details?id=com.datadog.app
[15]: /fr/service_management/service_level_objectives/#saved-views
[16]: /fr/account_management/teams/#associate-resources-with-team-handles
[17]: /fr/api/latest/events/
[18]: /fr/dashboards/guide/slo_data_source/
[19]: /fr/dashboards/widgets/slo/
[20]: /fr/dashboards/widgets/slo_list/
[21]: /fr/monitors/types/event/
[22]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[23]: /fr/api/latest/service-level-objective-corrections/
[24]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/slo_correction