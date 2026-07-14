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
  text: Télémétrie sur les services, suivi des erreurs, SLO et plus encore
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
  text: Burn Rate est un meilleur error rate.
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: Blog
  text: Concevez des tableaux de bord exécutifs efficaces avec Datadog
- link: https://www.datadoghq.com/blog/slo-monitoring-tracking/
  tag: Blog
  text: Surveiller le statut et la marge d'erreur de vos SLO avec Datadog
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_level_objective
  tag: Site externe
  text: Créer et gérer des SLO avec Terraform
title: Service Level Objectives
---
{{< jqmath-vanilla >}}

<br />

{{< learning-center-callout header="Participez à une session de webinaire d'enablement." hide_image="true" btn_title="Inscrivez-vous" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=SLOs&tags.topics-1=Monitors">}}
  Explorez et inscrivez-vous aux sessions Foundation Enablement. Découvrez comment vous pouvez prioriser et traiter les problèmes qui comptent le plus pour votre entreprise avec le suivi natif des SLO et SLA.
{{< /learning-center-callout >}}

## Aperçu {#overview}

Les objectifs de niveau de service, ou SLOs, sont un élément clé de la boîte à outils de l'ingénierie de la fiabilité des sites. Les SLOs fournissent un cadre pour définir des objectifs clairs concernant la performance des applications, ce qui aide finalement les équipes à offrir une expérience client cohérente, à équilibrer le développement de fonctionnalités avec la stabilité de la plateforme et à améliorer la communication avec les utilisateurs internes et externes.

**Conseil**: Pour ouvrir les objectifs de niveau de service à partir de la recherche globale de Datadog, appuyez sur <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> et recherchez `slo`.

## Terminologie clé {#key-terminology}

Indicateur de niveau de service (SLI)
: Une mesure quantitative de la performance ou de la fiabilité d'un service. Dans les SLOs de Datadog, un SLI est une métrique ou une agrégation d'un ou plusieurs moniteurs.

Service Level Objective (SLO)
: Un pourcentage cible pour un SLI sur une période de temps spécifique.

Service Level Agreement (SLA)
: Un accord explicite ou implicite entre un client et un fournisseur de services stipulant les attentes de fiabilité du client et les conséquences pour le fournisseur de services en cas de non-respect.

Budget d'erreur
: Le montant d'imprévisibilité autorisé dérivé du pourcentage cible d'un SLO (100 % - pourcentage cible) qui est destiné à être investi dans le développement de produits.

## Types de SLOs {#slo-types}

Lorsque vous créez des SLO, vous pouvez choisir parmi les types suivants :
- **SLOs basés sur des métriques** : peuvent être utilisés lorsque vous souhaitez que le calcul du SLI soit basé sur le nombre, le SLI est calculé comme la somme des bons événements divisée par la somme des événements totaux.
- **SLOs basés sur les moniteurs** : peuvent être utilisés lorsque vous souhaitez que le calcul du SLI soit basé sur le temps, le SLI est basé sur le temps de disponibilité du moniteur. Les SLOs basés sur les moniteurs doivent être basés sur un moniteur Datadog nouveau ou existant, tous les ajustements doivent être effectués sur le moniteur sous-jacent (ne peuvent pas être réalisés par la création de SLO).
- **SLOs de tranche horaire** : peuvent être utilisés lorsque vous souhaitez que le calcul du SLI soit basé sur le temps, le SLI est basé sur votre définition personnalisée de la disponibilité (montant de temps pendant lequel votre système présente un bon comportement divisé par le temps total). Les SLOs de tranche horaire ne nécessitent pas de moniteur Datadog, vous pouvez essayer différents filtres de métriques et seuils et explorer instantanément les temps d'arrêt lors de la création de SLO.

Pour une comparaison complète, référez-vous au graphique [Comparaison des types de SLO][1].

## Configuration {#setup}

Utilisez la [page de gestion des SLOs de Datadog][2] pour créer de nouveaux SLOs ou pour consulter et gérer tous vos SLOs existants.

### Configuration {#configuration}

1. Sur la [page de gestion des SLO][2], sélectionnez **Nouveau SLO +**.
2. Sélectionnez le type de SLO. Vous pouvez créer un SLO avec l'un des types suivants : [Metric-based][3], [Monitor-based][4], ou [Time Slices][5].
3. Définissez un objectif et une fenêtre temporelle glissante (7, 30 ou 90 jours précédents) pour le SLO. Datadog recommande de rendre l'objectif plus strict que vos SLA stipulés. Cette fenêtre temporelle est affichée sur les listes de SLOs. Par défaut, la plus courte fenêtre temporelle est sélectionnée.
4. Enfin, donnez un titre au SLO, décrivez-le plus en détail ou ajoutez des liens dans la description, ajoutez des étiquettes et enregistrez-le.

Après avoir configuré le SLO, sélectionnez-le dans la [vue de liste des SLOs][2] pour ouvrir le panneau latéral des détails. Le panneau latéral affiche le pourcentage d'état global et le budget d'erreur restant pour chacun des objectifs du SLO, ainsi que des barres d'état (SLOs basés sur les moniteurs) ou des graphiques à barres (SLOs basés sur les métriques) de l'historique de l'SLI. Si vous avez créé un SLO basé sur un moniteur groupé en utilisant un [moniteur multi-alerte][6] ou un SLO basé sur des métriques groupées en utilisant la [`sum by` clause][7], le pourcentage d'état et le budget d'erreur restant pour chaque groupe individuel sont affichés en plus du pourcentage d'état global et du budget d'erreur restant.

**Exemple :** Si vous créez un SLO basé sur un moniteur pour suivre la latence par zone de disponibilité, les pourcentages d'état et le budget d'erreur restant pour le SLO global et pour chaque zone de disponibilité individuelle que le SLO suit sont affichés.

**Remarque :** Le budget d'erreur restant est affiché en pourcentage et est calculé à l'aide de la formule suivante :

$$\text"marge d'erreur restante" = 100 * {\text"statut actuel" - \text" cible"} / { 100 - \text"cible"}$$

### Définir des objectifs SLO {#setting-slo-targets}

Pour tirer profit des marges d'erreur et des alertes associées, vous devez définir des valeurs cibles pour votre SLO strictement inférieures à 100 %.

Fixer un objectif de 100 % signifie avoir un budget d'erreur de 0 %, puisque le budget d'erreur est égal à 100 % — objectif SLO. Sans un budget d'erreur représentant un risque acceptable, vous rencontrez des difficultés à trouver un alignement entre les priorités conflictuelles de maintien de la fiabilité orientée client et d'investissement dans le développement de fonctionnalités. De plus, des SLOs avec des valeurs cibles de 100 % entraînent des erreurs de division par zéro dans l'évaluation des alertes SLO.

**Remarque :** Le nombre de décimales que vous pouvez spécifier pour vos SLO varie en fonction du type de SLO et des fenêtres temporelles que vous choisissez. Consultez les liens ci-dessous pour plus d'informations sur chaque type de SLO respectif.

[Monitor-based SLOs][8]: Up to two decimal places are allowed for 7-day and 30-day targets, up to three decimal places are allowed for 90-day targets.

[Metric-based SLOs][9]: Up to three decimal places are allowed for all targets.

## Modifier un SLO {#edit-an-slo}

Pour modifier un SLO, passez le curseur sur la rangée du SLO dans la liste et cliquez sur l'icône en forme de crayon qui s'affiche à droite de la rangée. Vous pouvez également cliquer sur la rangée pour ouvrir le volet latéral détaillé et sélectionner le bouton de modification à partir de l'icône en forme d'engrenage en haut à droite du volet.

## Permissions {#permissions}

### Accès basé sur les rôles {#role-based-access}

Tous les utilisateurs peuvent consulter les SLOs et [corrections de statut SLO](#slo-status-corrections), quel que soit leur [rôle][10] associé. Seuls les utilisateurs rattachés à des rôles disposant de la `slos_write` permission peuvent créer, modifier et supprimer des SLOs.

Pour créer, modifier et supprimer des corrections de statut, les utilisateurs nécessitent les `slos_corrections` permissions. Un utilisateur avec cette permission peut effectuer des corrections de statut, même s'il n'a pas la permission de modifier ces SLOs. Pour la liste complète des permissions, consultez la [documentation RBAC][11].

### Contrôles d'accès granulaires {#granular-access-controls}

Pour limiter l'accès à certains SLO, définissez la liste des [rôles][10] autorisés à les modifier.

{{< img src="service_level_objectives/slo_set_permissions.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Option de permissions SLO dans le menu des paramètres">}}

1. Cliquez sur le SLO pour ouvrir le panneau latéral des détails.
1. Cliquez sur l'icône des paramètres en haut à droite du panneau.
1. Sélectionnez **Permissions**.
1. Cliquez sur **Restreindre l'accès**.
1. La boîte de dialogue se met à jour pour montrer que les membres de votre organisation ont par défaut un accès **Visiteur**.
1. Utilisez le menu déroulant pour sélectionner un ou plusieurs rôles, équipes ou utilisateurs qui peuvent modifier le SLO.
1. Cliquez sur **Ajouter**.
1. La boîte de dialogue se met à jour pour montrer que le rôle que vous avez sélectionné a la permission **Éditeur**.
1. Cliquez sur **Enregistrer**.

Pour maintenir votre accès en modification au SLO, le système exige que vous incluiez au moins un rôle dont vous êtes membre avant de sauvegarder. Les utilisateurs sur la liste de contrôle d'accès peuvent ajouter des rôles et ne peuvent supprimer que des rôles autres que le leur.

**Remarque** : Les utilisateurs peuvent créer des SLOs sur n'importe quel moniteur même s'ils n'ont pas de permissions d'écriture sur le moniteur. De même, les utilisateurs peuvent créer des alertes SLOs même s'ils n'ont pas de permissions d'écriture sur le SLO. Pour plus d'informations sur les permissions RBAC pour les Moniteurs, consultez la [documentation RBAC][12] ou le [guide sur la façon de configurer RBAC pour les Moniteurs][13].

## Recherche des SLOs {#searching-slos}

La [page de gestion des SLOs][2] vous permet d'effectuer une recherche avancée de tous les SLOs afin que vous puissiez trouver, visualiser, modifier, cloner ou supprimer des SLOs à partir des résultats de recherche.

La recherche avancée vous permet d'interroger les SLO en combinant différents attributs de SLO :

* `name` et `description` - recherche textuelle.
* `time window` - 7j, 30j, 90j.
* `type` - métrique, moniteur.
* `creator`
* `tags` - centre de données, env, service, équipe, etc.

Pour effectuer une recherche, utilisez les cases à cocher des facettes à gauche et la barre de recherche en haut. Lorsque vous cochez les cases, la barre de recherche se met à jour avec la requête équivalente. De même, lorsque vous modifiez la requête de la barre de recherche (ou en écrivez une de zéro), les cases à cocher se mettent à jour pour refléter le changement. Les résultats de la requête se mettent à jour en temps réel au fur et à mesure que vous modifiez la requête ; il n'y a pas de bouton 'Rechercher' à cliquer.

## Visualisation des SLOs {#viewing-slos}

Regroupez vos SLOs par *n'importe* quel tag pour obtenir une vue d'ensemble de vos données. Vous pouvez rapidement analyser combien de SLOs se trouvent dans chaque état (en infraction, avertissement, OK et pas de données), regroupés par service, équipe, parcours utilisateur, niveau ou tout autre tag défini sur vos SLOs.

{{< img src="service_level_objectives/slo_group_by_new.png" alt="Vue d'ensemble des SLOs regroupés par équipe" style="width:100%;" >}}

Triez les SLOs par les colonnes *statut* et *budget d'erreur* pour prioriser les SLOs nécessitant votre attention. La liste des SLOs affiche les détails des SLOs sur la fenêtre temporelle principale sélectionnée dans votre [configuration](#configuration). Toutes les autres fenêtres temporelles de configuration sont consultables dans le panneau latéral individuel. Ouvrez le panneau latéral des détails des SLOs en cliquant sur la ligne de tableau respective.

**Remarque** : Vous pouvez visualiser vos SLOs depuis l'écran d'accueil de votre appareil mobile en téléchargeant l'[application mobile Datadog][14], disponible sur l'[App Store Apple][15] et le [Google Play Store][16].

{{< img src="service_level_objectives/slos-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="SLOs sur iOS et Android">}}

### Tags SLO {#slo-tags}

Les tags SLO peuvent être utilisés pour filtrer sur la [page de gestion des SLO][2], créer des [vues enregistrées SLO][17], ou regrouper les SLO afin de les visualiser. Les tags peuvent être ajoutés aux SLOs de plusieurs manières :

- Lorsque vous créez ou modifiez un SLO, vous pouvez ajouter des tags
- Depuis la vue liste des SLOs, vous pouvez ajouter et mettre à jour des tags en masse en utilisant les options déroulantes *Modifier les tags* et *[Modifier les équipes][18]* en haut de la liste des SLOs.

{{< img src="service_level_objectives/slo_bulk_tag.png" alt="La page de liste des SLOs affiche le menu déroulant Modifier les tags pour l'édition en masse des tags" >}}

### Indicateur de taux de consommation des SLO {#slo-burn-rate-indicator}

Les indicateurs de taux de consommation utilisent une fenêtre de 2 heures glissantes pour évaluer quels SLOs consomment leur budget d'erreur trop rapidement. Les indicateurs de taux de consommation apparaissent à côté des noms des SLOs applicables sur la [page de gestion des SLO][2].

{{< img src="service_level_objectives/slo_burn_rate_indicator.png" alt="La page de gestion des SLO dans Datadog. Une icône rouge apparaît à côté du nom d'un SLO dans la liste. Passer la souris sur l'icône rouge affiche une fenêtre modale avec des informations supplémentaires, une visualisation du taux de consommation et un lien vers la page de service correspondante du SLO." style="width:80%;" >}}

Il existe deux types d'indicateurs possibles :
- Une icône rouge indiquant un taux de consommation critique supérieur à 6 au cours des 2 dernières heures.
- Une icône jaune indiquant un taux de consommation élevé compris entre 1 et 6 au cours des 2 dernières heures.

Un graphique visuel accompagne chaque indicateur pour montrer où se situe le taux de consommation par rapport aux seuils élevé et critique, permettant une évaluation rapide de la gravité.

Les SLOs peuvent être filtrés par statut de taux de consommation : Critique, Élevé et Sain. Pour les SLOs dotés d'une étiquette de service, chaque indicateur de taux de consommation comprend un lien direct vers la page de service associée pour une analyse approfondie.

### Vue par défaut des SLO {#slo-default-view}

La vue par défaut des SLO apparaît lorsque vous accédez à la liste des SLO.

La vue par défaut comprend :

- Une requête de recherche vide
- Une liste de tous les SLO définis dans votre organisation
- Une liste des facettes disponibles dans la liste des facettes à gauche

### Vues enregistrées {#saved-views}

Les vues enregistrées vous permettent d'enregistrer des recherches personnalisées dans la liste des SLO et de les partager. Consultez facilement les SLO pertinentes pour votre équipe et vous-même en partageant les éléments suivants :

- Une requête de recherche
- Un sous-ensemble sélectionné de facettes

Après avoir filtré un sous-ensemble de SLO dans la liste, vous pouvez ajouter la requête correspondante en tant que vue enregistrée.

#### Ajouter une vue enregistrée {#add-a-saved-view}

Pour ajouter une vue enregistrée :

1. Interrogez vos SLOs.
2. Cliquez sur **Enregistrer la vue +** en haut à gauche de la page.
3. Nommez votre vue et enregistrez.

#### Charger une vue enregistrée {#load-a-saved-view}

Pour charger une vue enregistrée, ouvrez le panneau *Vues Enregistrées* en appuyant sur le bouton **Afficher les Vues** en haut à gauche de la page et sélectionnez une vue enregistrée dans la liste. Vous pouvez également rechercher des vues enregistrées dans la zone de recherche *Filtrer les Vues Enregistrées* en haut de ce même panneau *Vues Enregistrées*.

#### Partager une vue enregistrée {#share-a-saved-view}

Passez le curseur sur une vue enregistrée dans la liste et sélectionnez l'icône d'hyperlien pour copier le lien vers la vue enregistrée afin de le partager avec les membres de votre équipe.

#### Gérer les vues enregistrées {#manage-saved-views}

Une fois que vous utilisez une vue enregistrée, vous pouvez la mettre à jour en sélectionnant cette vue enregistrée, en modifiant la requête et en cliquant sur le bouton *Mettre à jour* en dessous de son nom dans le panneau *Vues Enregistrées*. Pour changer le nom de la vue enregistrée ou supprimer une vue enregistrée, survolez sa ligne dans le panneau *Vues Enregistrées* et cliquez sur l'icône de crayon ou l'icône de poubelle, respectivement.

## Événements d'audit de correction de SLO et de statut de SLO {#slo-and-slo-status-correction-audit-events}

Les événements d'audit de SLO vous permettent de suivre l'historique de vos configurations de SLO en utilisant l'[Explorateur d'Événements][27] ou l'onglet **Historique d'Audit** dans les détails du SLO. Les événements d'audit sont ajoutés à l'Explorateur d'Événements chaque fois que vous créez, modifiez ou supprimez un SLO ou une correction de statut de SLO. Chaque événement inclut des informations sur la configuration d'un SLO ou d'une correction de statut de SLO, et le flux fournit un historique des changements de configuration au fil du temps.

### Événements d'audit de SLO {#slo-audit-events}

Chaque événement inclut les informations de configuration SLO suivantes :

- Nom
- Description
- Pourcentages cibles et fenêtres temporelles
- Sources de données (identifiants de moniteur ou requête de métrique)

Trois types d'événements d'audit SLO figurent dans l'Events Explorer :

- `SLO Created` événements montrent les informations de configuration du SLO au moment de la création
- `SLO Modified` événements montrent quelles informations de configuration ont changé lors d'une modification
- `SLO Deleted` événements montrent les informations de configuration que le SLO avait avant d'être supprimé

### Événements d'audit de correction de statut {#status-correction-audit-events}

Chaque événement inclut les informations de configuration de la correction de statut du SLO suivantes :

- Nom du SLO
- Heures de début et de fin de la correction de statut avec fuseau horaire
- Catégorie de correction de statut

Trois types d'événements d'audit de correction de statut de SLO figurent dans l'Events Explorer :

- `SLO Correction Created`Les événements affichent les informations de configuration de la correction de statut au moment de la création.
- `SLO Correction Modified` Les événements montrent quelles informations de configuration ont changé lors d'une modification
- `SLO Correction Deleted`Les événements montrent les informations de configuration que la correction de statut avait avant d'être supprimée.

Pour obtenir une liste complète de tous les événements d'audit SLO, entrez la requête de recherche `tags:(audit AND slo)` dans l'Explorateur d'événements. Pour voir la liste des événements d'audit pour un SLO spécifique, entrez `tags:audit,slo_id:<SLO ID>` avec l'ID du SLO souhaité. Vous pouvez également interroger l'Explorateur d'événements de manière programmatique en utilisant l'[API des événements Datadog][19].

**Remarque :** Si vous ne voyez pas d'événements apparaître dans l'interface utilisateur, assurez-vous de définir la période de l'Explorateur d'événements sur une période plus longue, par exemple, les 7 derniers jours.

{{< img src="service_level_objectives/slo-audit-events.png" alt="Événements d'audit de SLO" >}}

Vous pouvez également utiliser l'onglet « Audit History » dans les détails du SLO pour visualiser tous les événements d'audit pour un SLO particulier :

{{< img src="service_level_objectives/slo_audit_history_tab.png" alt="Onglet historique d'audit des détails SLO" >}}

Avec les [Moniteurs d'événements][28], vous pouvez configurer des notifications pour suivre les événements d'audit SLO. Par exemple, si vous souhaitez être informé lorsque la configuration d'un SLO spécifique est modifiée, configurez un Moniteur d'événements pour suivre le texte `[SLO Modified]` sur les balises `audit,slo_id:<SLO ID>`.

## Widgets SLO {#slo-widgets}

{{< learning-center-callout header="Essayez de créer des insights critiques pour l'entreprise en utilisant des tableaux de bord et des SLO dans le Centre d'apprentissage" btn_title="Inscrivez-vous maintenant" btn_url="https://learn.datadoghq.com/courses/dashboards-slos">}}
  Apprenez sans frais sur une véritable capacité de calcul cloud et un compte d'essai Datadog. Inscrivez-vous aujourd'hui pour en savoir plus sur la création de tableaux de bord pour suivre les SLO.
{{< /learning-center-callout >}}

Une fois votre SLO créé, vous pouvez visualiser les données grâce aux dashboards et widgets.
  - Utilisez le widget SLO pour visualiser l'état d'un SLO unique
  - Utilisez le widget Liste SLO pour visualiser un ensemble de SLOs
  - Graphique de 15 mois de données SLO basées sur des métriques avec la [source de données SLO][20] dans des widgets à la fois en séries temporelles et en scalaires (valeur de requête, liste principale, tableau, changement).

Pour plus d'informations sur les widgets SLO, consultez les pages [widget SLO][21] et [widget de liste SLO][22]. Pour plus d'informations sur la source de données SLO, consultez le guide sur la façon d'afficher graphiquement les données historiques SLO sur les tableaux de bord.

## Corrections de statut SLO {#slo-status-corrections}

Les corrections de statut vous permettent d'exclure des périodes spécifiques du calcul du statut SLO et du budget d'erreur. De cette manière, vous pouvez :
- Prévenir les temps d'arrêt prévus, tels que la maintenance programmée, de réduire votre budget d'erreur
- Ignorer les heures non ouvrables, où vous n'êtes pas censé respecter vos SLOs
- S'assurer que les problèmes temporaires causés par des déploiements n'impactent pas négativement vos SLOs

Lorsque vous appliquez une correction, la période spécifiée n'est plus incluse dans les calculs du SLO.
- Pour les SLOs basés sur la surveillance, la fenêtre de temps de correction n'est pas comptée.
- Pour les SLOs basés sur des métriques, tous les événements bons et mauvais dans la fenêtre de correction ne sont pas comptés.
- Pour les SLOs à tranche horaire, la fenêtre de temps de correction est considérée comme un temps de disponibilité.

Vous avez la possibilité de créer des corrections ponctuelles pour des ajustements ad hoc, ou des corrections récurrentes pour des ajustements prévisibles qui se produisent à un rythme régulier. Les corrections ponctuelles nécessitent une heure de début et de fin, tandis que les corrections récurrentes nécessitent une heure de début, une durée et un intervalle. Les corrections récurrentes sont basées sur la spécification RRULE de [iCalendar RFC 5545][24]. Les règles prises en charge sont `FREQ`, `INTERVAL`, `COUNT` et `UNTIL`. Spécifier une date de fin pour les corrections récurrentes est optionnel au cas où vous auriez besoin que la correction se répète indéfiniment.

Pour l'un ou l'autre type de correction, vous devez sélectionner une catégorie de correction qui indique pourquoi la correction est effectuée. Les catégories disponibles sont `Scheduled Maintenance`, `Outside Business Hours`, `Deployment` et `Other`. Vous pouvez également inclure une description pour fournir un contexte supplémentaire si nécessaire.

Chaque SLO a une limite maximale de corrections qui peuvent être configurées pour garantir la performance des requêtes. Ces limites ne s'appliquent qu'aux 90 derniers jours par SLO, donc les corrections pour les périodes antérieures aux 90 derniers jours ne comptent pas dans votre limite. Cela signifie que :
- Si l'heure de fin d'une correction ponctuelle est antérieure aux 90 derniers jours, cela compte dans votre limite.
- Si l'heure de fin de la dernière répétition d'une correction récurrente est antérieure aux 90 derniers jours, cela ne compte pas dans votre limite.

Voici les limites de correction sur 90 jours applicables par SLO :

| Type de correction   | Limite par SLO |
| ----------------- | ------------- |
| Ponctuelle          | 100           |
| Récurrente quotidienne   | 2             |
| Récurrente hebdomadaire  | 3             |
| Récurrente mensuelle | 5             |

Vous pouvez configurer les corrections de statut via l'interface utilisateur en sélectionnant `Correct Status` dans le panneau latéral de votre SLO, l'[API de corrections de statut SLO][25], ou une [ressource Terraform][26].

#### Accès dans l'interface utilisateur {#access-in-the-ui}

Pour effectuer des corrections de statut SLO dans l'interface, procédez comme suit :

1. Créez un nouveau SLO ou cliquez sur un SLO existant.
2. Naviguez vers la vue du panneau latéral des détails d'un SLO.
3. Sous l'icône d'engrenage, sélectionnez **Corriger le statut** pour accéder à la modal de création des **Corrections de statut**.
4. Choisissez entre `One-Time` et `Recurring` dans le **Sélectionnez la fenêtre de correction de temps**, et spécifiez la période que vous souhaitez corriger.
5. Sélectionnez un **Type de correction**.
6. Ajoutez éventuellement des **Notes**.
7. Cliquez sur **Appliquer la correction**.

{{< img src="service_level_objectives/slo-corrections-ui.png" alt="Interface utilisateur de correction SLO" style="width:80%;">}}

Pour visualiser, modifier et supprimer les corrections de statut existantes, cliquez sur l'onglet **Corrections** en haut de la vue détaillée du panneau latéral d'un SLO.

#### Visualisation des corrections de statut {#visualizing-status-corrections}

Pour les SLO basés sur des métriques et les SLO par tranche horaire avec corrections de statut, il existe un interrupteur dans la vue détaillée des SLO qui vous permet d'activer ou de désactiver les corrections dans l'interface utilisateur. L'interrupteur contrôle les graphiques et les données dans la section "Historique" de la vue détaillée des SLO. **Remarque :** Votre statut global des SLO et votre budget d'erreurs prendront toujours en compte les corrections de statut.

{{< img src="service_level_objectives/correction-toggle.png" alt="Interface utilisateur de correction SLO" style="width:100%;">}}

## Vue du calendrier des SLO {#slo-calendar-view}

La vue du calendrier des SLO est disponible sur la [page de gestion des SLO][2]. Dans le coin supérieur droit, passez de la vue "Principale" à la vue "Quotidienne", "Hebdomadaire" ou "Mensuelle" pour voir 12 mois de données historiques sur le statut des SLO. La vue du calendrier est prise en charge pour les SLO basés sur des métriques et les SLO par tranche horaire.

{{< img src="service_level_objectives/slo-calendar-view-2.png" alt="Vue Calendrier du SLO" >}}

## Lectures complémentaires {#further-reading}

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