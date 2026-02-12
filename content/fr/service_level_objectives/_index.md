---
aliases:
- /fr/monitors/monitor_uptime_widget/
- /fr/monitors/slos/
- /fr/monitors/service_level_objectives/
- /fr/service_management/service_level_objectives/ootb_dashboard
- /fr/service_management/service_level_objectives/
description: Faire un suivi du statut de vos SLO
further_reading:
- link: https://www.datadoghq.com/blog/slo-monitoring-tracking/
  tag: Blog
  text: Surveiller le statut et la marge d'erreur de vos SLO avec Datadog
- link: https://learn.datadoghq.com/courses/intro-to-slo
  tag: Learning Center
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
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_level_objective
  tag: External Site
  text: Créer et gérer des SLO avec Terraform
- link: https://www.datadoghq.com/blog/burn-rate-is-better-error-rate/
  tag: Blog
  text: Le taux de gravure est un meilleur taux d'erreur
title: Service Level Objectives
---

...

<br />

{{< learning-center-callout header="Joindre une session de webinaire sur l'activation" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=SLOs&tags.topics-1=Monitors">}} Explorez et inscrivez-vous aux sessions Foundation Enablement. Découvrez comment vous pouvez prioriser et résoudre les problèmes qui comptent le plus pour votre entreprise grâce au suivi SLO et SLA natif. {{< /learning-center-callout >}}

## Présentation

Les objectifs de niveau de service, ou ALS, sont un élément clé de la boîte à outils d'ingénierie de la fiabilité du site. Les SLO constituent un cadre permettant de définir des objectifs précis relatifs aux performances de l'application, aidant ainsi les équipes à proposer une expérience client homogène, à assurer les développements futurs sans compromettre la stabilité de la plateforme, et à améliorer la communication avec les utilisateurs internes et externes.

**Astuce:** Pour ouvrir les Objectifs de niveau de service de la recherche globale de Datadog, appuyez sur <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> et recherchez `slo`.

## Termes clés

Service Level Indicator (SLI) : Mesure quantitative de la performance ou de la fiabilité d'un service. Dans les SLO Datadog un SLI est une métrique ou une agrégation d'un ou plusieurs moniteurs.

Service Level Objective (SLO) Pourcentage cible pour un SLI sur une période donnée.

Service Level Agreement (SLA) Un accord explicite ou implicite entre un client et un prestataire de services stipulant les attentes du client en termes de fiabilité et les conséquences pour le prestataire de services en cas de manquement.

Erreur Budget : Marge d'erreur
: La part autorisée de manque de fiabilité dérivée du pourcentage cible d'un SLO (100 % - pourcentage cible), à investir dans le développement produit.

## Types de SLO

Lorsque vous créez des SLO, vous pouvez choisir parmi les types suivants :
- **SLO basés sur des métriques** : peuvent servir lorsque vous souhaitez que le calcul du SLI soit basé sur le nombre, que le SLI soit calculé comme la somme des bons événements divisée par la somme du nombre total des événements.
- **SLOs basés sur** le moniteur: peut être utilisé lorsque vous voulez que le calcul SLI soit basé sur le temps, le SLI est basé sur la disponibilité du moniteur. Les SLO basés sur un moniteur doivent être basés sur un moniteur Datadog nouveau ou existant, tout ajustement doit être effectué sur le moniteur sous-jacent (ne peut pas être fait par la création de SLO).
- **Time Slice SLOs**: peut être utilisé lorsque vous voulez que le calcul SLI soit basé sur le temps, le SLI est basé sur votre définition personnalisée de disponibilité (le temps de bon comportement de votre système divisé par le temps total). Les SLO Time Slice ne nécessitent pas de moniteur Datadog, vous pouvez essayer différents filtres et seuils métriques et explorer instantanément les temps d'arrêt pendant la création du SLO.

Pour une comparaison complète, référez-vous au graphique [Comparaison des types][1] de SLO.

## Implémentation

Consultez la [page de statut][2] des Service Level Objectives de Datadog pour créer de nouveaux SLO ou pour consulter et gérer tous vos SLO existants.

### Créez un fichier `conf.yaml` dans le dossier `logstash.d/` précédemment créé.

1. Dans la [page gérer SLO][2], sélectionnez **Nouveau SLO +**.
2. Sélectionnez le type SLO. Vous pouvez créer un ALS avec l'un des types suivants: [Basé sur des][3] mesures, [basé sur des moniteurs][4] ou des [tranches de temps][5].
3. Définissez un objectif et une période mobile (au cours des 7, 30 ou 90 derniers jours) pour l'ALS. Datadog vous recommande de rendre la cible plus stricte que vos SLA stipulés. Si vous configurez plus d'une fenêtre temporelle, sélectionnez-en une comme fenêtre temporelle principale. Cette fenêtre horaire est affichée sur les listes des ALS. Par défaut, la fenêtre de temps la plus courte est sélectionnée.
4. Enfin, donnez un titre à votre SLO, spécifiez une description plus détaillée ou ajoutez des liens dans la description, ajoutez des tags et enregistrez-le.

Après avoir configuré le SLO, sélectionnez-le dans la [liste Objectifs de][2] niveau de service pour ouvrir le panneau latéral Détails. Le panneau latéral affiche le pourcentage d'état global et le budget d'erreurs restant pour chacune des cibles de l'ALS, ainsi que des barres d'état (ALS basées sur le moniteur) ou des graphiques à barres (ALS basées sur les mesures) de l'historique de l'ALS. Si vous avez créé un ALS basé sur un moniteur groupé à l'aide d'un [moniteur multi alerte][6] ou un ALS basé sur des mesures groupées à l'aide de la clause [`sum by`][7], le pourcentage d'état et le budget d'erreur restant pour chaque groupe individuel s'affichent en plus du pourcentage d'état global et du budget d'erreur restant.

**Exemple :** **Exemple :** si vous créez un SLO basé sur des monitors pour suivre la latence par zone de disponibilité, cette vue affiche les pourcentages de statut et la marge d'erreur restante pour le SLO global ainsi que pour chaque zone de disponibilité individuelle suivie par le SLO.

**Remarques :** **Remarque** : la marge d'erreur restante est affichée sous la forme de pourcentage, et est calculée à partir de la formule suivante :

...

### Définir les cibles d'un SLO

Pour tirer profit des marges d'erreur et des alertes associées, vous devez définir des valeurs cibles pour votre SLO strictement inférieures à 100 %.

Définir un objectif de 100 % signifie avoir un budget d'erreur de 0 % puisque le budget d'erreur est égal à 100 % – objectif SLO. Sans budget d'erreur représentant un risque acceptable, vous rencontrez des difficultés à trouver un alignement entre les priorités contradictoires de maintenir la fiabilité face au client et d'investir dans le développement de fonctionnalités. De plus, les ALS dont les valeurs cibles sont de 100 % entraînent une division par zéro des erreurs dans l'évaluation des alertes des ALS.

**Remarques :** Le nombre de décimales que vous pouvez spécifier pour vos ALS diffère selon le type d'ALS et les fenêtres de temps que vous choisissez. Consultez les liens ci-dessous pour plus d'information pour chaque type d'ALS respectif.

SLO basés sur des monitors Jusqu'à deux décimales pour les cibles de 7 et 30 jours, et jusqu'à trois décimales pour les cibles de 90 jours.

SLO basés sur des métriques Jusqu'à trois décimales pour toutes les cibles.

## Modifier un SLO

Pour modifier un SLO, passez le curseur sur la rangée du SLO dans la liste et cliquez sur l'icône en forme de crayon qui s'affiche à droite de la rangée. Vous pouvez également cliquer sur la rangée pour ouvrir le volet latéral détaillé et sélectionner le bouton de modification à partir de l'icône en forme d'engrenage en haut à droite du volet.

## Permissions

### Accès à base de rôles

Tous les utilisateurs peuvent consulter les ALS et les [corrections d'état](#slo-status-corrections) des ALS, quel que soit leur [rôle][10] associé. Seuls les utilisateurs attachés à des rôles avec l'autorisation `slos_write` peuvent créer, modifier et supprimer des SLO.

Pour créer, modifier et supprimer des corrections d'état, les utilisateurs ont besoin des autorisations `slos_corrections`. Un utilisateur avec cette autorisation peut apporter des corrections d'état, même s'il n'a pas l'autorisation de modifier ces SLO. Pour obtenir la liste complète des autorisations, consultez la [documentation RBAC][11].

### Contrôles d'accès granulaires

Pour limiter l'accès à certains SLO, définissez la liste des [rôles][10] autorisés à les modifier.

...

1. Cliquez sur le SLO pour ouvrir le volet latéral des détails.
1. Cliquez sur l'icône des paramètres en haut à droite du volet.
1. Sélectionnez **Permissions**.
1. Cliquez sur **Restrict Access**.
1. La boîte de dialogue affiche alors les membres de votre organisation disposant de l'autorisation **Viewer** par défaut.
1. Depuis la liste déroulante, sélectionnez les rôles, équipes ou utilisateurs autorisés à modifier le SLO.
1. Cliquez sur **+ Add**.
1. La boîte de dialogue indique alors que le rôle sélectionné possède l'autorisation **Editor**.
1. Cliquez sur **ENREGISTRER**.

Pour conserver votre accès de modification au SLO, le système vous oblige à inclure au moins un rôle dont vous êtes membre avant de sauvegarder. Les utilisateurs sur la liste de contrôle d'accès peuvent ajouter des rôles et ne peuvent supprimer que des rôles autres que les leurs.

note Les utilisateurs peuvent créer des SLO sur n'importe quel moniteur même s'ils n'ont pas les droits d'écriture sur le moniteur. De même, les utilisateurs peuvent créer des alertes SLO même s'ils n'ont pas les droits d'écriture sur le SLO. Pour plus d'informations sur les autorisations RBAC pour les moniteurs, consultez la [documentation RBAC][12] ou le [guide sur la][13] configuration de RBAC pour les moniteurs.

## Rechercher un SLO

Depuis la [page de statut][2] des Service Level Objectives, vous avez la possibilité d'effectuer des recherches avancées parmi tous les SLO afin de trouver, consulter, modifier, cloner ou supprimer des SLO dans les résultats de recherche.

La recherche avancée vous permet d'interroger les SLO en combinant différents attributs de SLO :

* `name` and `description` - text search
* `time window` - 7j, 30j, 90j
* Monitor de métrique
* ...
* `tags` - datacenter, env, service, équipe, etc.

Pour lancer une recherche, utilisez les cases à cocher facettes à gauche et la barre de recherche en haut. Lorsque vous cochez les cases, la barre de recherche se met à jour avec la requête équivalente. De même, lorsque vous modifiez la requête de la barre de recherche (ou en écrivez une à partir de zéro), les cases à cocher se mettent à jour pour refléter la modification. Les résultats de la requête se mettent à jour en temps réel lorsque vous modifiez la requête; il n'y a pas de bouton « Rechercher » à cliquer.

## Visualiser des SLO

Regroupez vos ALS par n'*importe quelle* balise pour obtenir une vue sommaire de vos données. Vous pouvez visualiser en quelques secondes le nombre de SLO possédant chaque état (dépassement, avertissement, OK et aucune donnée), en regroupant vos SLO par service, équipe, parcours utilisateur, niveau ou tout autre tag défini sur vos SLO.

...

Triez les ALS par colonnes *statut* et *budget d'erreur* pour prioriser les ALS qui ont besoin de votre attention. La liste des ALS affiche les détails des ALS sur la fenêtre de temps principale sélectionnée dans votre [configuration](#configuration). Toutes les autres fenêtres de temps de configuration sont disponibles pour afficher dans le panneau latéral individuel. Ouvrez le panneau latéral Détails de l'ALS en cliquant sur la ligne de tableau correspondante.

note Vous pouvez consulter vos SLO depuis l'écran d'accueil de votre appareil mobile. Pour ce faire, téléchargez l'[application mobile Datadog][14], disponible sur l'[App Store d'Apple][15] et le [Google Play Store][16].

...

### Tags de SLO

Les balises SLO peuvent être utilisées pour filtrer sur la [page de gestion][2], créer des [vues enregistrées SLO][17] ou regrouper des SLO à afficher. Les tags peuvent être ajoutés aux ALS de la manière suivante:

- Lorsque vous créez ou modifiez un SLO, vous pouvez ajouter des tags
- Depuis la liste des SLO, vous pouvez ajouter et mettre à jour des tags de façon groupée grâce aux options *Edit Tags* et *[Edit Teams][18]* du menu déroulant en haut de la liste des SLO.

...

### Indicateur de taux de combustion SLO

Les indicateurs de taux de combustion utilisent une fenêtre mobile de 2 heures pour évaluer quels ALS consomment leur budget d'erreur trop rapidement. Les indicateurs de taux de combustion apparaissent à côté des noms d'ALS applicables sur la [page de gestion][2] des ALS.

{{< img src="/service_management/service_level_objectives/slo_burn_rate_indicator.png" alt="La page SLO manage dans Datadog. Une icône rouge apparaît à côté du nom d'un ALS dans la liste. Passez la souris sur l'icône rouge pour afficher un mode modal avec de plus amples informations, une visualisation du taux de combustion et un lien vers la page de service correspondante de l'ALS." style="width:80%;" >}}

Il existe deux types d'indicateurs possibles:
- Une icône rouge indiquant un taux de brûlure critique supérieur à 6 au cours des 2 dernières heures.
- Une icône jaune indiquant un taux de combustion élevé entre 1 et 6 au cours des 2 dernières heures.

Un graphique visuel accompagne chaque indicateur pour montrer où le taux de brûlure baisse par rapport aux seuils élevés et critiques, permettant une évaluation rapide de la gravité.

Les SLO peuvent être filtrés par l'état du taux de combustion: Critique, élevé et sain. Pour les ALS portant une étiquette de service, chaque indicateur de taux de combustion comprend un lien direct vers la page de service connexe pour une enquête plus approfondie.

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

1. Rédigez une requête pour vos SLO.
2. Cliquez sur **Save View +** en haut à gauche de la page.
3. Donnez un nom à votre vue, puis enregistrez-la.

#### Charger une vue enregistrée

Pour charger une vue enregistrée, ouvrez le panneau *Affichages enregistrés* en appuyant sur le bouton **Afficher les vues** en haut à gauche de la page et sélectionnez une vue enregistrée dans la liste. Vous pouvez également rechercher des vues enregistrées dans la zone de recherche *Filtrer les vues* enregistrées en haut de ce même panneau *Vues enregistrées*.

#### Partager une vue enregistrée

Passez le curseur sur une vue enregistrée dans la liste et sélectionnez l'icône d'hyperlien pour copier le lien vers la vue enregistrée afin de le partager avec les membres de votre équipe.

#### Gérer les vues enregistrées

Une fois que vous utilisez une vue enregistrée, vous pouvez la mettre à jour en sélectionnant cette vue enregistrée, en modifiant la requête et en cliquant sur le bouton *Mettre à jour* situé sous son nom dans le panneau *Vues enregistrées*. Pour modifier le nom de la vue enregistrée ou supprimer une vue enregistrée, survolez sa ligne dans le panneau *Vues enregistrées* et cliquez respectivement sur l'icône représentant un crayon ou une corbeille.

## Événements d'audit de correction des SLO et de leur statut

Les événements d'audit SLO vous permettent de suivre l'historique de vos configurations SLO à l'aide de l'[Explorateur d'événements][27] ou de l'onglet **Historique d'audit** dans les détails SLO. Les événements d'audit sont ajoutés à l'Explorateur d'événements chaque fois que vous créez, modifiez ou supprimez une correction d'état SLO ou SLO. Chaque événement comprend des informations sur la configuration d'un SLO ou d'une correction d'état SLO, et le flux fournit un historique des changements de configuration au fil du temps.

### Événements d'audit de SLO

Chaque événement inclut les informations de configuration SLO suivantes :

- Name
- Description
- Pourcentages ciblés et intervalles de temps
- Sources de données (identifiants de monitor ou requête de métrique)

Trois types d'événements d'audit SLO figurent dans l'Events Explorer :

- Les événements `SLO Created` affichent les informations sur la configuration du SLO au moment de sa création.
- Les événements `SLO Modified` indiquent les informations de configuration qui ont changé lors d'une modification
- Les événements `SLO Deleted` indiquent les informations de configuration qui étaient définies avant que le SLO ne soit supprimé

### Événements d'audit de correction de statut

Chaque événement inclut les informations de configuration de la correction de statut du SLO suivantes :

- Nom du SLO
- Heures de début et de fin de la correction du statut avec le fuseau horaire
- Catégorie de correction de statut

Trois types d'événements d'audit de correction de statut de SLO figurent dans l'Events Explorer :

- Les événements `SLO Correction Created` affichent les informations sur la correction de statut au moment de sa création.
- Les événements `SLO Correction Modified` indiquent les informations de configuration qui ont changé lors d'une modification
- Les événements `SLO Correction Deleted` indiquent les informations de configuration qui étaient définies avant que la correction de statut ne soit supprimée

Pour obtenir une liste complète de tous les événements d'audit SLO, entrez le `tags:(audit AND slo)` de requête de recherche dans l'Explorateur d'événements. Pour afficher la liste des événements de vérification d'un ALS spécifique, entrez `tags:audit,slo_id:<SLO ID>` avec l'ID de l'ALS souhaité. Vous pouvez également interroger par programmation l'Events Explorer à l'aide de l'[API Événements Datadog][17].

**Remarques :** **Remarque** : si aucun événement ne s'affiche dans l'interface, élargissez l'intervalle de l'Events Explorer (par exemple, choisissez les 7 derniers jours).

...

Vous pouvez également utiliser l'onglet « Audit History » dans les détails du SLO pour visualiser tous les événements d'audit pour un SLO particulier :

...

Avec [Event Monitors][28], vous pouvez configurer des notifications pour suivre les événements d'audit SLO. Par exemple, si vous souhaitez être averti lorsque la configuration d'un SLO spécifique est modifiée, définissez un moniteur d'événements pour suivre le texte sur les balises . `[SLO Modified]``audit,slo_id:<SLO ID>`

## Widgets SLO

{{< learning-center-callout header="Essayez de créer des informations stratégiques pour l'entreprise à l'aide de tableaux de bord et d'ALS dans le centre de formation" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/dashboards-slos">}} Apprenez sans frais sur une capacité de calcul cloud réelle et un compte d'essai Datadog. Inscrivez-vous dès aujourd'hui pour en savoir plus sur la création de tableaux de bord pour suivre les ALS. {{< /learning-center-callout >}}

Une fois votre SLO créé, vous pouvez visualiser les données grâce aux dashboards et widgets.
  - Utiliser le widget SLO pour visualiser le statut d'un SLO
  - Utilisez le widget Liste de SLO pour visualiser un ensemble de SLO.
  - Ajoutez la [source de données SLO][20] dans des widgets Série temporelle et des widgets scalaires (Valeur de requête, Top list, Tableau et Évolution) pour représenter 15 mois de données de SLO basés sur des métriques.

Pour plus d'informations sur les widgets SLO, consultez les pages [widget SLO][21] et [widget Liste SLO][22] . Pour en savoir plus sur la source de données des ALS, consultez le guide sur la façon de [graphiquer les données][20] historiques des ALS.

## Corrections de statut SLO

La fonctionnalité de correction de statut vous permet d'exclure des périodes précises des calculs de statut et de marge d'erreur d'un SLO. De cette façon, vous pouvez:
- Faire en sorte que les downtimes prévus, comme une maintenance périodique, ne soient pas pris en compte dans votre marge d'erreur
- Ignorer les heures creuses, où vous n'êtes pas censé respecter vos SLO
- Vous assurer que les problèmes temporaires causés par des déploiements n'ont aucun impact négatif sur vos SLO

Lorsque vous appliquez une correction, la période spécifiée n'est plus incluse dans les calculs du SLO.
- Pour les SLO basés sur des monitors, l'intervalle de temps de la correction n'est pas comptabilisé.
- Pour les SLO basés sur des métriques, les événements positifs et négatifs qui ont lieu lors de la fenêtre de correction sont ignorés.
- Pour les SLO Time Slice, l'intervalle de temps de la correction est considéré comme de l'uptime.

Vous avez la possibilité de créer des corrections ponctuelles pour des ajustements ponctuels, ou des corrections récurrentes pour des ajustements prévisibles qui se produisent sur une cadence régulière. Les corrections ponctuelles nécessitent une heure de début et de fin, tandis que les corrections récurrentes nécessitent une heure de début, une durée et un intervalle. Les corrections récurrentes sont basées sur la [spécification RRULE d'iCalendar RFC 5545][24]. Les règles supportées sont `FREQ`, `INTERVAL`, `COUNT` et `UNTIL`. Spécifier une date de fin pour les corrections récurrentes est facultatif dans le cas où vous avez besoin de la correction à répéter indéfiniment.

Pour l'un ou l'autre type de correction, vous devez sélectionner une catégorie de correction qui indique pourquoi la correction est effectuée. Les catégories disponibles sont `Scheduled Maintenance`, `Outside Business Hours`, `Deployment` et `Other`. Vous pouvez éventuellement inclure une description pour fournir un contexte supplémentaire si nécessaire.

Chaque ALS a une limite maximale de corrections qui peuvent être configurées pour assurer la performance des requêtes. Ces limites ne s'appliquent qu'aux 90 derniers jours par ALS, de sorte que les corrections pour les périodes antérieures aux 90 derniers jours ne comptent pas dans votre limite. Cela signifie que:
- Si la date de fin d'une correction ponctuelle se trouve en dehors des 90 derniers jours, elle ne rentre pas en compte dans le calcul de la limite.
- Si la date de fin de la dernière répétition d'une correction récurrente se trouve en dehors des 90 derniers jours, elle ne rentre pas en compte dans le calcul de la limite.

Voici les limites de correction sur 90 jours applicables par SLO :

| Type de correction   | Limite par SLO |
| ----------------- | ------------- |
| Correction ponctuelle          | 100           |
| Correction récurrente tous les jours   | 2+             |
| Correction récurrente toutes les semaines  | 3+             |
| Correction récurrente tous les mois | 5+             |

Vous pouvez configurer des corrections de statut dans l'interface, en sélectionnant l'option `Correct Status` Status dans le volet latéral d'un SLO, mais également avec l'[API de corrections][25] de statut SLO ou à l'aide d'une [ressource Terraform][26].

#### Effectuer une correction dans l'interface

Pour effectuer des corrections de statut SLO dans l'interface, procédez comme suit :

1. Créez un SLO ou cliquez sur un SLO existant.
2. Accédez au volet latéral des détails du SLO.
3. Sous l'icône en forme d'engrenage, sélectionnez l'option **Correct Statuts** afin d'ouvrir le menu de création **Status Corrections**.
4. Choisissez l'option `One-Time` ou `Recurring` dans la **section Select the Time Correction Window**, puis saisissez la période à corriger.
5. Sélectionnez un **type de correction**.
6. Ajoutez si besoin des **notes**.
7. Cliquez sur **Apply Correction**.

...

Pour consulter, modifier et supprimer des corrections de statut existantes, cliquez sur l'onglet **Corrections** en haut du volet latéral détaillé d'un SLO.

#### Visualisation des corrections d'état

Pour les SLO basés sur des métriques et des tranches de temps avec des corrections d'état, il y a une bascule dans la vue de détail SLO qui vous permet d'activer ou de désactiver les corrections dans l'interface utilisateur. La bascule contrôle les graphiques et les données dans la section « Historique » de la vue détaillée SLO. **Remarques :** Votre budget global d'état et d'erreurs de l'ALS tiendra toujours compte des corrections d'état.

...

## Vue Calendrier du SLO

La vue du calendrier SLO est disponible sur la [page SLO manage][2]. Dans le coin supérieur droit, passez de la vue « Principale » à la vue « Quotidienne », « Hebdomadaire » ou « Mensuelle » pour voir 12 mois de données historiques sur l'état des ALS. La vue Calendrier est prise en charge pour les SLO basés sur les métriques et les SLO Time Slice.

...

## Exportation du SLO au format CSV

{{< callout url="https://forms.gle/GQkcHDqaL5qWMss38" btn_hidden="false" header="Try Out the SLO CSV Export Feature">}} La fonctionnalité Exportation CSV est en Aperçu. Remplissez le formulaire pour demander l'accès. {{< /callout >}}

La fonction Exportation CSV SLO est disponible sur la [page SLO manage][2] une fois que vous passez à la vue calendrier "hebdomadaire" ou "mensuelle". Dans ces vues, vous pouvez accéder à la nouvelle option "Exporter au format CSV" pour télécharger un format CSV de vos données historiques SLO avec les informations suivantes:

- ID, nom et type de SLO
- Tags de SLO
- Cible du SLO
- Anciennes valeurs du statut du SLO

...

Les intervalles suivants sont disponibles pour l'exportation au format CSV :

- Weekly **Hebdomadaire :** les statuts de SLO sont basés sur des semaines alignées sur le calendrier (du dimanche à 12 h 00 au samedi à 23 h 59).
- La facturation s'effectue mensuellement. **Mensuel :** les statuts de SLO sont basés sur des mois alignés sur le calendrier (du premier jour du mois à 00 h jusqu'au dernier jour du mois à 23 h 59)

Ces durées sont basées sur le fuseau horaire défini par l'utilisateur dans Datadog.

Les statuts de SLO sont calculés en fonction du type de SLO :
- SLO basés sur des métriques Pourcentage de bons événements sur le nombre total des événements pour l'intervalle
- SLO Time Slice Pourcentage de bonnes minutes sur le nombre total des minutes pour l'intervalle

**Remarques :**

- Les SLO exportés sont basés sur votre requête de recherche.
- La vue Calendrier est prise en charge pour les SLO basés sur les métriques et les tranches de temps. Si vous exportez des ALS basés sur Monitor, seuls l'ID et le nom de l'ALS sont inclus dans le CSV (et non les données de l'historique d'état de l'ALS).
- Chaque exportation a une limite de 1000 SLO.

## Pour aller plus loin

...

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