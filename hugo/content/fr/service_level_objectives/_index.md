---
aliases:
- /fr/monitors/monitor_uptime_widget/
- /fr/monitors/slos/
- /fr/monitors/service_level_objectives/
- /fr/service_management/service_level_objectives/ootb_dashboard
- /fr/service_management/service_level_objectives/
description: Faire un suivi du statut de vos SLO
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-slo
  tag: Centre d'apprentissage
  text: Présentation des Service Level Objectives (SLO)
- link: https://www.datadoghq.com/blog/service-page/
  tag: Blog
  text: Télémétrie sur les services, Error Tracking, SLO et plus encore
- link: https://www.datadoghq.com/blog/monitor-service-performance-with-slo-alerts/
  tag: Blog
  text: Surveiller de manière proactive les performances d'un service avec des alertes
    SLO
- link: https://www.datadoghq.com/blog/slo-key-questions/
  tag: Blog
  text: Questions clés à poser lors de la définition des SLO
- link: https://www.datadoghq.com/blog/define-and-manage-slos/
  tag: Blog
  text: Conseils à suivre pour gérer vos SLO avec Datadog
- link: https://www.datadoghq.com/blog/burn-rate-is-better-error-rate/
  tag: Blog
  text: Le taux de consommation est un indicateur plus pertinent que le taux d'erreur
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: Blog
  text: Concevez des dashboards exécutifs efficaces avec Datadog
- link: https://www.datadoghq.com/blog/slo-monitoring-tracking/
  tag: Blog
  text: Surveiller le statut et le budget d'erreur de vos SLO avec Datadog
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_level_objective
  tag: Site externe
  text: Créer et gérer des SLO avec Terraform
title: Service Level Objectives
---
{{< jqmath-vanilla >}}

<br />

{{< learning-center-callout header="Rejoignez une session de webinaire de formation" hide_image="true" btn_title="S'inscrire" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=SLOs&tags.topics-1=Monitors">}}
  Explorez et inscrivez-vous aux sessions de formation fondamentale. Découvrez comment prioriser et traiter les problèmes les plus importants pour votre entreprise grâce au suivi natif des SLO et des SLA.
{{< /learning-center-callout >}}

## Présentation {#overview}

Les Service Level Objectives, ou SLO, sont un élément clé de la boîte à outils de l'ingénierie de la fiabilité des sites. Les SLO fournissent un cadre pour définir des objectifs clairs concernant les performances des applications, ce qui aide finalement les équipes à offrir une expérience client cohérente, à équilibrer le développement de fonctionnalités avec la stabilité de la plateforme et à améliorer la communication avec les utilisateurs internes et externes.

**Conseil**: Pour ouvrir Service Level Objectives depuis la recherche globale de Datadog, appuyez sur <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> et recherchez `slo`.

## Terminologie clé {#key-terminology}

Indicateur de niveau de service (SLI)
: Une mesure quantitative de la performance ou de la fiabilité d'un service. Dans les SLO de Datadog, un SLI est une métrique ou une agrégation d'un ou plusieurs monitors.

Service Level Objective (SLO)
: Un pourcentage cible pour un SLI sur une période donnée.

Service Level Agreement (SLA)
: Un accord explicite ou implicite entre un client et un fournisseur de services stipulant les attentes du client en matière de fiabilité et les conséquences pour le fournisseur de services en cas de non-respect de celles-ci.

Budget d'erreur
: La quantité autorisée de non-fiabilité dérivée du pourcentage cible d'un SLO (100 % - pourcentage cible) qui est destinée à être investie dans le développement de produits.

## Types de SLO {#slo-types}

Lorsque vous créez des SLO, vous pouvez choisir parmi les types suivants :
- **SLO basés sur des métriques** : peuvent être utilisés lorsque vous souhaitez que le calcul du SLI soit basé sur le nombre d'événements ; le SLI est calculé comme la somme des bons événements divisée par la somme des événements totaux.
- **SLO basés sur des monitors** : peuvent être utilisés lorsque vous souhaitez que le calcul du SLI soit basé sur le temps ; le SLI est basé sur la disponibilité du monitor. Les SLO basés sur des monitors doivent être basés sur un monitor Datadog nouveau ou existant ; tout ajustement doit être effectué sur le monitor sous-jacent (cela ne peut pas être fait lors de la création du SLO).
- **SLO basés sur des tranches de temps** : peuvent être utilisés lorsque vous souhaitez que le calcul du SLI soit basé sur le temps ; le SLI est basé sur votre définition personnalisée de la disponibilité (la durée pendant laquelle votre système présente un bon comportement divisée par la durée totale). Les SLO basés sur des tranches de temps ne nécessitent pas de monitor Datadog ; vous pouvez essayer différents filtres de métriques et seuils et explorer instantanément le downtime lors de la création du SLO.

Pour une comparaison complète, référez-vous au graphique [Comparaison des types de SLO][1].

## Configuration {#setup}

Utilisez la [page de gestion des Service Level Objectives][2] de Datadog pour créer de nouveaux SLO ou pour afficher et gérer tous vos SLO existants.

### Configuration {#configuration}

1. Sur la [page de gestion des SLO][2], sélectionnez {{< ui >}}New SLO +{{< /ui >}}.
2. Sélectionnez le type de SLO. Vous pouvez créer un SLO avec l'un des types suivants : [Basé sur une métrique][3], [Basé sur un monitor][4] ou [Tranches temporelles][5].
3. Définissez une cible et une fenêtre temporelle glissante (7, 30 ou 90 derniers jours) pour le SLO. Datadog vous recommande de rendre la cible plus stricte que vos SLA stipulés. Cette fenêtre temporelle est affichée sur les listes de SLO. Par défaut, la fenêtre temporelle la plus courte est sélectionnée.
4. Enfin, donnez un titre au SLO, décrivez-le plus en détail ou ajoutez des liens dans la description, ajoutez des tags et enregistrez-le.

Une fois le SLO configuré, sélectionnez-le dans la [vue de liste Service Level Objectives][2] pour ouvrir le panneau latéral des détails. Le panneau latéral affiche le pourcentage de statut global et le budget d'erreur restant pour chacune des cibles du SLO, ainsi que des barres de statut (SLO basés sur des monitors) ou des graphiques à barres (SLO basés sur des métriques) de l'historique du SLI. Si vous avez créé un SLO groupé basé sur un monitor en utilisant un [monitor multi-alertes][6] ou un SLO groupé basé sur une métrique en utilisant la clause [`sum by`][7], le pourcentage de statut et le budget d'erreur restant pour chaque groupe individuel sont affichés en plus du pourcentage de statut global et du budget d'erreur restant.

**Exemple :** Si vous créez un SLO basé sur un monitor pour suivre la latence par zone de disponibilité, les pourcentages de statut et le budget d'erreur restant pour le SLO global et pour chaque zone de disponibilité individuelle suivie par le SLO sont affichés.

**Remarque :** Le budget d'erreur restant est affiché sous forme de pourcentage et est calculé à l'aide de la formule suivante :

$$\text"budget d'erreur restant" = 100 * {\text"statut actuel" - \text" cible"} / { 100 - \text"cible"}$$

### Définition des cibles de SLO {#setting-slo-targets}

Pour tirer profit des budgets d'erreur et des alertes associées, vous devez définir des valeurs cibles pour votre SLO strictement inférieures à 100 %.

Définir une cible de 100 % signifie avoir un budget d'erreur de 0 %, puisque le budget d'erreur est égal à 100 % — cible de SLO. Sans budget d'erreur représentant un risque acceptable, vous avez du mal à trouver un alignement entre les priorités contradictoires que sont le maintien de la fiabilité pour les clients et l'investissement dans le développement de fonctionnalités. De plus, les SLO avec des valeurs cibles de 100 % entraînent des erreurs de division par zéro dans l'évaluation des alertes SLO.

**Remarque :** Le nombre de décimales que vous pouvez spécifier pour vos SLO diffère selon le type de SLO et les fenêtres temporelles que vous choisissez. Consultez les liens ci-dessous pour plus d'informations sur chaque type de SLO.

[Monitor-based SLOs][8]: Up to two decimal places are allowed for 7-day and 30-day targets, up to three decimal places are allowed for 90-day targets.

[Metric-based SLOs][9]: Up to three decimal places are allowed for all targets.

## Autorisations {#permissions}

### Accès basé sur les rôles {#role-based-access}

Tous les utilisateurs peuvent consulter les SLO et les [corrections de statut des SLO](#slo-status-corrections), quel que soit leur [rôle][10] associé. Seuls les utilisateurs rattachés à des rôles disposant de l'autorisation `slos_write` peuvent créer, modifier et supprimer des SLO.

Pour créer, modifier et supprimer des corrections de statut, les utilisateurs doivent disposer de l'autorisation `slos_corrections`. Un utilisateur disposant de cette autorisation peut effectuer des corrections de statut, même s'il ne possède pas l'autorisation `slos_write`. Pour créer une correction pour un seul SLO doté de [contrôles d'accès granulaires](#granular-access-controls), un utilisateur doit également disposer d'un accès en modification à ce SLO. Les [corrections basées sur des tags](#tag-based-corrections) ne vérifient pas les contrôles d'accès granulaires ; elles s'appliquent donc à tous les SLO correspondant à la requête, y compris les SLO restreints. Pour obtenir la liste complète des autorisations, consultez la [documentation RBAC][11].

### Contrôles d'accès granulaires {#granular-access-controls}

Pour limiter l'accès à certains SLO, définissez la liste des [rôles][10] autorisés à les modifier.

{{< img src="service_level_objectives/slo_set_permissions.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Option d'autorisations SLO dans le menu en forme de roue dentée">}}

1. Cliquez sur les SLO pour ouvrir le panneau latéral des détails.
1. Cliquez sur l'icône en forme de roue dentée en haut à droite du panneau.
1. Sélectionnez {{< ui >}}Permissions{{< /ui >}}.
1. Cliquez sur {{< ui >}}Restrict Access{{< /ui >}}.
1. La boîte de dialogue se met à jour pour indiquer que tout le monde dans votre organisation dispose d'un accès complet par défaut.
1. Utilisez le menu déroulant pour sélectionner un ou plusieurs rôles, équipes ou utilisateurs autorisés à modifier le SLO.
1. Cliquez sur {{< ui >}}Add{{< /ui >}}.
1. La boîte de dialogue se met à jour pour indiquer que le rôle que vous avez sélectionné dispose de l'autorisation {{< ui >}}Editor{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}

Pour conserver votre accès en modification au SLO, le système exige que vous incluiez au moins un rôle dont vous êtes membre avant d'enregistrer. Les utilisateurs figurant sur la liste de contrôle d'accès peuvent ajouter des rôles et ne peuvent supprimer que les rôles autres que le leur.

**Remarque** : Les utilisateurs peuvent créer des SLO sur n'importe quel monitor même s'ils n'ont pas les autorisations d'écriture sur ce monitor. De même, les utilisateurs peuvent créer des alertes SLO même s'ils n'ont pas les autorisations d'écriture sur les SLO. Pour plus d'informations sur les autorisations RBAC pour les monitors, consultez la [documentation RBAC][12] ou le [guide sur la configuration du RBAC pour les monitors][13].

## Modification d'un SLO {#editing-an-slo}

Pour modifier un SLO, passez le curseur sur la rangée du SLO dans la liste et cliquez sur l'icône en forme de crayon qui s'affiche à droite de la rangée. Vous pouvez également cliquer sur la rangée pour ouvrir le volet latéral détaillé et sélectionner le bouton de modification à partir de l'icône en forme d'engrenage en haut à droite du volet.

## Recherche de SLO {#searching-slos}

La [page de gestion des Service Level Objectives][2] vous permet d'effectuer une recherche avancée sur tous les SLO afin de trouver, consulter, modifier, cloner ou supprimer des SLO à partir des résultats de recherche.

La recherche avancée vous permet d'interroger les SLO en combinant différents attributs de SLO :

* `name` et `description` - recherche textuelle
* `time window` - 7d, 30d, 90d
* `type` - métrique, monitor
* `creator`
* `tags` - centre de données, environnement, service, équipe, etc.

Pour effectuer une recherche, utilisez les cases à cocher des facettes sur la gauche et la barre de recherche en haut. Lorsque vous cochez les cases, la barre de recherche se met à jour avec la requête équivalente. De même, lorsque vous modifiez la requête de la barre de recherche (ou que vous en rédigez une à partir de zéro), les cases à cocher se mettent à jour pour refléter le changement. Les résultats de la requête se mettent à jour en temps réel à mesure que vous modifiez la requête ; il n'y a pas de bouton « Rechercher » sur lequel cliquer.

## Récupération de SLO supprimés {#recovering-deleted-slos}

<div class="alert alert-warning">Les SLO générés automatiquement pour les <a href="/synthetics/test_suites/#service-level-objectives">collections de tests Synthetic</a> ne peuvent pas être restaurés.</div>

Les SLO supprimés sont conservés pendant 30 jours avant d'être définitivement supprimés. Pour restaurer un SLO récemment supprimé :

1. Sur la [page de gestion des SLO][2], cliquez sur l'icône d'engrenage **Settings** dans le coin supérieur droit.
1. Sélectionnez le ou les SLO que vous souhaitez restaurer.
1. Cliquez sur {{< ui >}}Restore{{< /ui >}}.

**Remarque** : Les corrections de statut des SLO supprimés ne peuvent pas être restaurées. Ce processus de récupération s'applique uniquement aux SLO supprimés.

## Visualisation des SLO {#viewing-slos}

Regroupez vos SLO par *n'importe quel* tag pour obtenir une vue récapitulative de vos données. Vous pouvez analyser rapidement combien de SLO se trouvent dans chaque état (dépassé, avertissement, OK et aucune donnée), regroupés par service, équipe, parcours utilisateur, niveau ou tout autre tag défini sur vos SLO.

{{< img src="service_level_objectives/slo_group_by_new.png" alt="Vue récapitulative des SLO regroupés par équipe" style="width:100%;" >}}

Triez les SLO par les colonnes {{< ui >}}status{{< /ui >}} et {{< ui >}}Error Budget Left{{< /ui >}} pour hiérarchiser les SLO qui nécessitent votre attention. La liste des SLO affiche les détails des SLO sur la fenêtre temporelle principale sélectionnée dans votre [configuration](#configuration). Toutes les autres fenêtres temporelles de configuration sont disponibles pour consultation dans le panneau latéral individuel. Ouvrez le panneau latéral des détails des SLO en cliquant sur la ligne de tableau correspondante.

**Remarque** : Vous pouvez consulter vos SLO depuis l'écran d'accueil de votre appareil mobile en téléchargeant l'[application mobile Datadog][14], disponible sur l'[Apple App Store][15] et le [Google Play Store][16].

{{< img src="service_level_objectives/slos-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="SLO sur iOS et Android">}}

### Tags de SLO {#slo-tags}

Les tags de SLO peuvent être utilisés pour filtrer sur la [page de gestion des SLO][2], créer des [vues enregistrées de SLO][17] ou regrouper des SLO pour les visualiser. Les tags peuvent être ajoutés aux SLO des manières suivantes :

- Lorsque vous créez ou modifiez un SLO, vous pouvez ajouter des tags
- Depuis la vue de liste des SLO, vous pouvez ajouter et mettre à jour des tags en masse en utilisant les options de menu déroulant {{< ui >}}Edit Tags{{< /ui >}} et [{{< ui >}}Edit Teams{{< /ui >}}][18] en haut de la liste des SLO.

{{< img src="service_level_objectives/slo_bulk_tag.png" alt="La page de liste des SLO affiche le menu déroulant Edit Tag pour la modification en masse des tags" >}}

### Indicateur de taux de consommation des SLO {#slo-burn-rate-indicator}

Les indicateurs de taux de consommation utilisent une fenêtre glissante de 2 heures pour évaluer quels SLO consomment leur budget d'erreur trop rapidement. Les indicateurs de taux de consommation apparaissent à côté des noms des SLO concernés sur la [page de gestion des SLO][2].

{{< img src="service_level_objectives/slo_burn_rate_indicator.png" alt="La page de gestion des SLO dans Datadog. Une icône rouge apparaît à côté du nom d'un SLO dans la liste. Le survol de l'icône rouge affiche une fenêtre modale avec des informations supplémentaires, une visualisation du taux de consommation et un lien vers la page de service correspondante du SLO." style="width:80%;" >}}

Il existe deux types d'indicateurs possibles :
- Une icône rouge indiquant un taux de consommation critique supérieur à 6 au cours des 2 dernières heures.
- Une icône jaune indiquant un taux de consommation élevé compris entre 1 et 6 au cours des 2 dernières heures.

Un graphique visuel accompagne chaque indicateur pour montrer où se situe le taux de consommation par rapport aux seuils élevé et critique, permettant une évaluation rapide de la gravité.

Les SLO peuvent être filtrés par statut de taux de consommation : Critique, Élevé et Sain. Pour les SLO avec un tag de service, chaque indicateur de taux de consommation inclut un lien direct vers la page de service associée pour une analyse plus approfondie.

### Vue par défaut des SLO {#slo-default-view}

La vue par défaut des SLO apparaît lorsque vous accédez à la liste des SLO.

La vue par défaut comprend :

- Une requête de recherche vide
- Une liste de tous les SLO définis dans votre organisation
- Une liste des facettes disponibles dans la liste des facettes de gauche

### Vues enregistrées {#saved-views}

Les vues enregistrées vous permettent d'enregistrer des recherches personnalisées dans la liste des SLO et de les partager. Consultez facilement les SLO pertinentes pour votre équipe et vous-même en partageant les éléments suivants :

- Une requête de recherche
- Un sous-ensemble sélectionné de facettes

Après avoir filtré un sous-ensemble de SLO dans la liste, vous pouvez ajouter la requête correspondante en tant que vue enregistrée.

#### Ajouter une vue enregistrée {#add-a-saved-view}

Pour ajouter une vue enregistrée :

1. Interrogez vos SLO.
2. Cliquez sur {{< ui >}}Save{{< /ui >}} en haut à gauche de la page.
3. Nommez votre vue et enregistrez-la.

#### Charger une vue enregistrée {#load-a-saved-view}

Pour charger une vue enregistrée, ouvrez le panneau {{< ui >}}Saved Views{{< /ui >}} en appuyant sur le bouton {{< ui >}}Views{{< /ui >}} en haut à gauche de la page et sélectionnez une vue enregistrée dans la liste. Vous pouvez également rechercher des vues enregistrées dans la zone de recherche {{< ui >}}Filter Saved Views{{< /ui >}} en haut de ce même panneau {{< ui >}}Saved Views{{< /ui >}}.

#### Partager une vue enregistrée {#share-a-saved-view}

Passez le curseur sur une vue enregistrée dans la liste et sélectionnez l'icône d'hyperlien pour copier le lien vers la vue enregistrée afin de le partager avec les membres de votre équipe.

#### Gérer les vues enregistrées {#manage-saved-views}

Une fois que vous utilisez une vue enregistrée, vous pouvez la mettre à jour en sélectionnant cette vue enregistrée, en modifiant la requête et en cliquant sur le bouton {{< ui >}}Update{{< /ui >}} sous son nom dans le panneau {{< ui >}}Saved Views{{< /ui >}}. Pour modifier le nom d'une vue enregistrée ou supprimer une vue enregistrée, survolez sa ligne dans le panneau {{< ui >}}Saved Views{{< /ui >}} et cliquez sur l'icône en forme de crayon ou sur l'icône en forme de corbeille, respectivement.

## Événements d'audit des SLO et des corrections de statut des SLO {#slo-and-slo-status-correction-audit-events}

Les événements d'audit des SLO vous permettent de suivre l'historique de vos configurations de SLO en utilisant l'[Event Explorer][27] ou l'onglet {{< ui >}}Audit History{{< /ui >}} dans les détails du SLO. Des événements d'audit sont ajoutés à l'Event Explorer chaque fois que vous créez, modifiez ou supprimez un SLO ou une correction de statut de SLO. Chaque événement inclut des informations sur la configuration d'un SLO ou d'une correction de statut de SLO, et le flux fournit un historique des modifications de configuration au fil du temps.

### Événements d'audit des SLO {#slo-audit-events}

Chaque événement inclut les informations de configuration SLO suivantes :

- Nom
- Description
- Pourcentages cibles et fenêtres temporelles
- Sources de données (ID de monitor ou requête de métrique)

Trois types d'événements d'audit SLO figurent dans l'Event Explorer :

- `SLO Created` les événements affichent les informations de configuration du SLO au moment de la création
- `SLO Modified` les événements affichent les informations de configuration qui ont été modifiées lors d'une modification
- `SLO Deleted` les événements affichent les informations de configuration que le SLO possédait avant sa suppression

### Événements d'audit de correction de statut {#status-correction-audit-events}

Chaque événement inclut les informations de configuration de la correction de statut du SLO suivantes :

- Nom du SLO
- Heures de début et de fin de la correction de statut avec fuseau horaire
- Catégorie de correction de statut

Trois types d'événements d'audit de correction de statut de SLO figurent dans l'Event Explorer :

- `SLO Correction Created` les événements affichent les informations de configuration de la correction de statut au moment de la création
- `SLO Correction Modified` les événements affichent les informations de configuration qui ont été modifiées lors d'une modification
- `SLO Correction Deleted` les événements affichent les informations de configuration de la correction de statut avant sa suppression

Pour obtenir une liste complète de tous les événements d'audit SLO, saisissez la requête de recherche `tags:(audit AND slo)` dans l'Event Explorer. Pour afficher la liste des événements d'audit pour un SLO spécifique, saisissez `tags:audit,slo_id:<SLO ID>` avec l'ID du SLO souhaité. Vous pouvez également interroger l'Event Explorer par programmation à l'aide de l'[API Datadog Events][19].

**Remarque :** Si vous ne voyez pas les événements apparaître dans l'interface utilisateur, assurez-vous de définir la période de l'Event Explorer sur une durée plus longue, par exemple, les 7 derniers jours.

{{< img src="service_level_objectives/slo-audit-events.png" alt="Événements d'audit de SLO" >}}

Vous pouvez également utiliser l'onglet {{< ui >}}Audit History{{< /ui >}} dans les détails du SLO pour afficher tous les événements d'audit pour un SLO individuel :

{{< img src="service_level_objectives/slo_audit_history_tab.png" alt="Onglet historique d'audit des détails du SLO" >}}

Avec les [monitors d'événement][28], vous pouvez configurer des notifications pour suivre les événements d'audit SLO. Par exemple, si vous souhaitez être averti lorsque la configuration d'un SLO spécifique est modifiée, configurez un monitor d'événement pour suivre le texte `[SLO Modified]` sur les tags `audit,slo_id:<SLO ID>`.

## Widgets SLO {#slo-widgets}

Une fois votre SLO créé, vous pouvez visualiser les données grâce aux dashboards et widgets.
  - Utilisez le widget SLO pour visualiser le statut d'un seul SLO
  - Utilisez le widget Liste SLO pour visualiser un ensemble de SLO
  - Tracez 15 mois de données des SLO basées sur des métriques avec la [SLO data source][20] dans des widgets de série temporelle et scalaires (valeur de requête, top list, tableau, évolution) widgets.

Pour plus d'informations sur les widgets SLO, consultez les pages [widget SLO][21] et [widget Liste SLO][22]. Pour plus d'informations sur la source de données SLO, consultez le guide sur la façon de [Représenter des données SLO historiques dans des dashboards][20].

## Corrections de statut SLO {#slo-status-corrections}

Les corrections de statut vous permettent d'exclure des périodes spécifiques des calculs de statut SLO et de budget d'erreur. De cette façon, vous pouvez :
- Empêcher le downtime prévu, tels que la maintenance planifiée, d'épuiser votre budget d'erreur
- Ignorer les heures non ouvrables, où vous n'êtes pas tenu de respecter vos SLO
- Veiller à ce que les problèmes temporaires causés par les déploiements n'affectent pas négativement vos SLO

Lorsque vous appliquez une correction, la période spécifiée n'est plus incluse dans les calculs du SLO.
- Pour les SLO basés sur des métriques, tous les événements bons et mauvais dans la fenêtre de correction ne sont pas comptabilisés.
- Pour les SLO basés sur des tranches horaires, la fenêtre temporelle de correction est traitée comme du temps de disponibilité.
- Pour les SLO basés sur des monitors, la fenêtre temporelle de correction n'est pas comptabilisée.

Chaque correction s'applique soit à un seul SLO, soit à tous les SLO correspondant à une requête par tag :
- **By SLO name** : La correction s'applique à un seul SLO.
- **By tags** : La correction s'applique à chaque SLO dont les tags correspondent à une requête, telle que `env:prod service:checkout`. Cela inclut les SLO que vous créez ou taguez après avoir créé la correction. Pour plus d'informations, consultez [Corrections basées sur des tags](#tag-based-corrections).

Vous avez la possibilité de créer des corrections ponctuelles pour des ajustements ad hoc, ou des corrections récurrentes pour des ajustements prévisibles qui se produisent à un rythme régulier. Les corrections ponctuelles nécessitent une heure de début et de fin, tandis que les corrections récurrentes nécessitent une heure de début, une durée et un intervalle. Les corrections récurrentes sont basées sur la [spécification RRULE de la RFC 5545 iCalendar][24]. Les règles prises en charge sont `FREQ`, `INTERVAL`, `COUNT`, `UNTIL` et `BYDAY`. La spécification d'une date de fin pour les corrections récurrentes est facultative si vous avez besoin que la correction se répète indéfiniment.

Pour l'un ou l'autre type de correction, vous devez sélectionner une catégorie de correction qui indique pourquoi la correction est effectuée. Les catégories disponibles sont {{< ui >}}Scheduled Maintenance{{< /ui >}}, {{< ui >}}Outside Business Hours{{< /ui >}}, {{< ui >}}Deployment{{< /ui >}} et {{< ui >}}Other{{< /ui >}}. Vous pouvez éventuellement inclure une description pour fournir un contexte supplémentaire si nécessaire.

Chaque SLO a une limite maximale de corrections pouvant être configurées pour garantir les performances des requêtes. Ces limites ne s'appliquent qu'aux 90 derniers jours par SLO, donc les corrections pour des périodes antérieures aux 90 derniers jours ne sont pas comptabilisées dans votre limite. Cela signifie que :
- Si l'heure de fin d'une correction ponctuelle remonte à plus de 90 jours, elle n'est pas comptabilisée dans votre limite.
- Si l'heure de fin de la dernière répétition d'une correction récurrente est antérieure aux 90 derniers jours, elle n'est pas comptabilisée dans votre limite.

Voici les limites de correction sur 90 jours applicables par SLO :

| Type de correction   | Limite par SLO |
| ----------------- | ------------- |
| Ponctuelle          | 100           |
| Récurrence quotidienne   | 2             |
| Récurrence hebdomadaire  | 3             |
| Récurrence mensuelle | 5             |
| Récurrence annuelle  | 20            |

Ces limites s'appliquent uniquement aux corrections créées par nom de SLO. Elles ne s'appliquent pas aux [corrections basées sur des tags](#tag-based-corrections).

Vous pouvez configurer les corrections de statut dans l'interface utilisateur, avec l'[API de corrections de statut SLO][25] ou avec une [ressource Terraform][26].

Pour créer une correction basée sur des tags avec l'API ou Terraform, définissez l'attribut `slo_query` au lieu de `slo_id`.

#### Corrections basées sur des tags {#tag-based-corrections}

Une correction basée sur des tags utilise une requête pour sélectionner des SLO par leurs tags, afin que vous puissiez appliquer une seule correction à de nombreux SLO. Par exemple, utilisez une correction basée sur des tags pour couvrir les périodes en dehors des heures de bureau pour tous les SLO d'une équipe ou tous les SLO d'un environnement.

Les corrections basées sur des tags sont évaluées lorsque le statut du SLO est calculé, de sorte que la correction s'applique à tous les SLO qui correspondent à la requête à ce moment-là. Si vous créez un nouveau SLO ou ajoutez des tags à un SLO existant qui correspondent à la requête, la correction s'applique également à ce SLO.

Les requêtes utilisent la [syntaxe de recherche d'événements][29], et chaque terme est comparé aux tags des SLO. Vous pouvez combiner des termes avec `AND`, `OR` et `NOT` (ou `-`), grouper des termes avec des parenthèses et utiliser `*` comme caractère générique. Les termes séparés par un espace sont combinés avec `AND`.

| Requête                          | SLO correspondants                                            |
| ------------------------------ | ------------------------------------------------------- |
| `env:prod`                     | Avec le tag `env:prod`                                       |
| `team:payments -env:staging`   | Avec le tag `team:payments` et sans le tag `env:staging`     |
| `team:(payments OR checkout)`  | Avec le tag `team:payments` ou le tag `team:checkout`               |
| `service:web-*`                | Avec un tag `service` dont la valeur commence par `web-`     |

Une requête ne peut pas être vide ou composée uniquement de `*`.

#### Gérer les corrections dans votre organisation {#manage-corrections-across-your-organization}

L’[onglet {{< ui >}}Corrections{{< /ui >}}][31] de la [page de gestion des SLO][2] répertorie toutes les corrections de statut dans votre organisation, y compris les corrections pour un seul SLO et les corrections basées sur des tags. Depuis cette page, vous pouvez créer, modifier et supprimer des corrections. Utilisez la barre de recherche et les facettes sur la gauche pour filtrer les corrections par {{< ui >}}Category{{< /ui >}}, {{< ui >}}Creator{{< /ui >}}, {{< ui >}}Frequency{{< /ui >}} et {{< ui >}}SLO Tags{{< /ui >}}. 

{{< img src="service_level_objectives/slo-corrections-tab.png" alt="L’onglet Corrections de la page de gestion des SLO présente les corrections avec leur portée, leur durée, leur planification et leur auteur, ainsi que des facettes de filtrage sur la gauche." style="width:80%;">}}

#### Créer des corrections à partir des périodes d'indisponibilité des moniteurs {#create-corrections-from-monitor-downtimes}

Pour créer une correction à partir d'une période d'indisponibilité, vous avez besoin de l'autorisation `slos_corrections`.

Lorsque vous planifiez une nouvelle [période d'indisponibilité de moniteur][30] par tags de moniteur, Datadog recherche les SLO qui possèdent les mêmes tags. Si des SLO correspondent, l'éditeur de période d'indisponibilité affiche une carte avec le nombre de SLO correspondants. Pour créer une correction pour la même fenêtre temporelle :

1. Sur la carte, cliquez sur {{< ui >}}Preview SLO Correction{{< /ui >}}. Le formulaire de correction s’ouvre avec {{< ui >}}By Tags{{< /ui >}} sélectionné, les tags de moniteur de la période d’indisponibilité comme requête, et les champs de planification et de message préremplis à partir de cette période d’indisponibilité.
2. Examinez la requête et les SLO qui y correspondent, sélectionnez un {{< ui >}}Category{{< /ui >}} et cliquez sur {{< ui >}}Apply{{< /ui >}}.
3. Enregistrez la période d'indisponibilité. Datadog crée la correction de SLO.

**Remarque** : La carte n'apparaît pas lorsque vous modifiez une période d'indisponibilité existante.

{{< img src="service_level_objectives/slo-corrections-on-monitor-downtimes.png" alt="La page Schedule Downtime, avec un périmètre défini par des tags de moniteur. Une carte en surbrillance en bas à droite affiche « We found 5 SLOs with this scope » et contient un lien Preview SLO Correction." style="width:80%;">}}

#### Accès dans l'interface utilisateur {#access-in-the-ui}

Pour créer une correction de statut dans l'interface utilisateur :

1. Ouvrez le formulaire de correction de l'une des manières suivantes :
   - Sur l'onglet [{{< ui >}}Corrections{{< /ui >}}][31] de la [page de gestion des SLO][2], cliquez sur {{< ui >}}New Correction{{< /ui >}}.
   - Dans le panneau latéral des détails d'un SLO, sous l'icône d'engrenage, sélectionnez {{< ui >}}Correct status{{< /ui >}}. Le formulaire s'ouvre avec ce SLO sélectionné.
2. Sous {{< ui >}}Select SLOs and category{{< /ui >}}, choisissez la portée de la correction :
   - {{< ui >}}By Tags{{< /ui >}} : Saisissez une requête de tag. Le formulaire affiche les SLO qui correspondent à la requête.
   - {{< ui >}}By SLO Name{{< /ui >}} : Recherchez et sélectionnez un seul SLO.
3. Sélectionnez un {{< ui >}}Category{{< /ui >}}.
4. Sous {{< ui >}}Select time window{{< /ui >}}, choisissez {{< ui >}}One-Time{{< /ui >}} ou {{< ui >}}Recurring{{< /ui >}} et spécifiez la période à corriger. Pour les corrections récurrentes, utilisez l'onglet {{< ui >}}Basic{{< /ui >}} pour définir un calendrier ou l'onglet {{< ui >}}Advanced{{< /ui >}} pour saisir une règle RRULE.
5. Vous pouvez également ajouter des notes sous {{< ui >}}Add any notes{{< /ui >}}.
6. Cliquez sur {{< ui >}}Apply{{< /ui >}}.

{{< img src="service_level_objectives/slo-corrections-ui-1.png" alt="Le formulaire New SLO Correction, avec les options By Tags et One-Time sélectionnées, affichant les champs pour une requête de tag, une catégorie, une fenêtre temporelle et des notes." style="width:80%;">}}

**Remarque** : Une fois que vous avez créé une correction, vous ne pouvez plus modifier sa portée ni passer d'une correction ponctuelle à une correction récurrente, ou inversement.

Pour afficher, modifier et supprimer des corrections de statut existantes, utilisez l'onglet {{< ui >}}Corrections{{< /ui >}} sur la [page de gestion des SLO][2] ou l'onglet {{< ui >}}Corrections{{< /ui >}} dans le panneau latéral des détails d'un SLO. L'onglet du panneau latéral inclut les corrections basées sur des tags qui s'appliquent au SLO.

#### Visualisation des corrections d'état {#visualizing-status-corrections}

Pour les SLO avec des corrections d'état, il existe un bouton bascule dans la vue détaillée du SLO qui vous permet d'activer ou de désactiver les corrections dans l'interface utilisateur. Le bouton bascule contrôle les graphiques et les données dans la section {{< ui >}}Performance{{< /ui >}} de la vue détaillée du SLO. **Remarque :** Votre état global de SLO et votre budget d'erreur prendront toujours en compte les corrections d'état.

{{< img src="service_level_objectives/correction-toggle.png" alt="Interface utilisateur de correction des SLO" style="width:100%;">}}

## Vue calendrier des SLO {#slo-calendar-view}

La vue Calendrier des SLO est disponible sur la [page de gestion des SLO][2]. Dans le coin supérieur droit, passez de la vue {{< ui >}}Primary{{< /ui >}} à la vue {{< ui >}}Daily{{< /ui >}}, {{< ui >}}Weekly{{< /ui >}} ou {{< ui >}}Monthly{{< /ui >}} pour voir 12 mois de données historiques sur l'état des SLO. La vue Calendrier est prise en charge pour les SLO basés sur des métriques et les SLO par tranches de temps.

{{< img src="service_level_objectives/slo-calendar-view-2.png" alt="Vue Calendrier du SLO" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/service_level_objectives/guide/slo_types_comparison/
[2]: https://app.datadoghq.com/slo
[3]: /fr/service_level_objectives/metric/
[4]: /fr/service_level_objectives/monitor/
[5]: /fr/service_level_objectives/time_slice/
[6]: /fr/monitors/types/metric/?tab=threshold#alert-grouping
[7]: /fr/service_level_objectives/metric/#define-queries
[8]: /fr/service_level_objectives/monitor/#set-your-slo-targets
[9]: /fr/service_level_objectives/metric/#set-your-slo-targets
[10]: /fr/account_management/rbac/
[11]: /fr/account_management/rbac/permissions/#service-level-objectives/
[12]: /fr/account_management/rbac/permissions/#monitors
[13]: /fr/monitors/guide/how-to-set-up-rbac-for-monitors/
[14]: /fr/mobile
[15]: https://apps.apple.com/app/datadog/id1391380318
[16]: https://play.google.com/store/apps/details?id=com.datadog.app
[17]: /fr/service_level_objectives/#saved-views
[18]: /fr/account_management/teams/#associate-resources-with-team-handles
[19]: /fr/api/latest/events/
[20]: /fr/dashboards/guide/slo_data_source/
[21]: /fr/dashboards/widgets/slo/
[22]: /fr/dashboards/widgets/slo_list/
[23]: /fr/monitors/types/event/
[24]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[25]: /fr/api/latest/service-level-objective-corrections/
[26]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/slo_correction
[27]: /fr/events/explorer/
[28]: /fr/monitors/types/event/
[29]: /fr/events/explorer/searching/
[30]: /fr/monitors/downtimes/
[31]: https://app.datadoghq.com/slo/corrections