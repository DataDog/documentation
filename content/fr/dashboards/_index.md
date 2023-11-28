---
algolia:
  tags:
  - snapshot
aliases:
- /fr/guides/templating/
- /fr/graphing/dashboards/
- /fr/guides/graphing
- /fr/graphing/miscellaneous/metrics_arithmetic
- /fr/graphing/faq/is-there-a-way-for-me-to-set-the-maximum-and-minimum-values-on-the-y-axis-of-a-graph
- /fr/graphing/faq/is-it-possible-to-adjust-the-y-axis-for-my-graphs
- /fr/graphing/
- /fr/dashboards/dashboards/
- /fr/dashboards/screenboards/
- /fr/dashboards/timeboards/
cascade:
  algolia:
    rank: 70
description: Visualiser vos données pour mieux les comprendre
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Dashboards
  tag: Notes de version
  text: Découvrez les dernières versions des dashboards Datadog (connexion à l'application
    requise).
- link: /dashboards/template_variables/
  tag: Documentation
  text: Améliorer vos dashboards avec les template variables
- link: https://www.datadoghq.com/blog/template-variable-associated-values/
  tag: Blog
  text: Utiliser les template variables associées pour affiner vos dashboards
- link: /dashboards/sharing/
  tag: Documentation
  text: Partager vos graphiques en dehors de Datadog
- link: /dashboards/widgets/
  tag: Documentation
  text: Découvrir tous les widgets disponibles pour votre dashboard
- link: /service_management/mobile/#dashboards
  tag: Documentation
  text: Afficher vos dashboards dans l'application mobile
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: Blog
  text: Ajouter des widgets de dashboard à votre presse-papiers
- link: https://www.datadoghq.com/blog/datadog-dashboards/
  tag: Blog
  text: Des dashboards Datadog encore plus efficaces
- link: https://datadoghq.dev/integrations-core/guidelines/dashboards/#best-practices
  tag: Documentation pour développeurs
  text: Créer des dashboards d'intégration efficaces
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive sur l'amélioration des visualisations
    avec des dashboards
kind: documentation
title: Dashboards
---

## Présentation

Un dashboard est un outil vous permettant de surveiller visuellement, d'analyser et d'afficher des métriques de performance clés dans Datadog. Ces dernières facilitent la surveillance de l'état de votre infrastructure.

**Remarque** : consultez les dashboards avec l'[application mobile Datadog][1], disponible sur l'[App Store Apple][2] et sur [Google Play][3].

{{< whatsnext desc="Fonctionnalités des dashboards :">}}
    {{< nextlink href="/dashboards/widgets" >}}Widgets : apprenez à configurer les différentes visualisations{{< /nextlink >}}
    {{< nextlink href="/dashboards/querying" >}}Requêtes : découvrez les options de mise en forme des requêtes de graphique{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions" >}}Fonctions : modifiez des requêtes de métrique et les graphiques générés{{< /nextlink >}}
    {{< nextlink href="/dashboards/template_variables" >}}Template Variable : filtrez des widgets de façon dynamique dans un dashboard{{< /nextlink >}}
    {{< nextlink href="/api/latest/dashboards" >}}API : gérez des dashboards par programmation{{< /nextlink >}}
{{< /whatsnext >}}

## Nouveau dashboard

Pour créer un dashboard, cliquez sur **+New Dashboard** sur la page [Dashboard List][1] ou sur **New Dashboard** depuis le menu de navigation. Attribuez un nom à votre dashboard, puis choisissez une disposition.

{{< img src="dashboards/create-dashboard.png" alt="Ajout d'un nouveau dashboard" style="width:70%;">}}

### Dashboards
Les dashboards sont disposés au sein d'une grille qui peut inclure un vaste choix d'objets, tels que des images, des graphiques et des logs. Ils servent généralement à visualiser les statuts de vos services et à mettre en récit vos données. Ils peuvent être mis à jour en temps réel et représenter des points fixes historiques. Ils s'avèrent également très utiles pour le debugging.

### Timeboards
Les timeboards sont automatiquement mis en forme et représentent un point unique (fixe ou mis à jour en temps réel) sur l'ensemble du dashboard. Ils sont généralement utilisés pour dépanner, mettre en corrélation et explorer les données.

### Screenboards
Les screenboards sont des dashboards qui vous permettent de représenter librement de nombreux objets tels que des images, des graphiques ou des logs. Généralement utilisés pour visualiser les statuts de vos services et pour mettre en récit vos données, ils peuvent être mis à jour en temps réel ou représenter des points fixes historiques.

## Configuration des dashboards

### Menu des graphiques

Cliquez sur un graphique de dashboard pour ouvrir le menu des options :

| Option                 | Description                                                   |
|------------------------|---------------------------------------------------------------|
| Send snapshot          | Créez et envoyez un snapshot de votre graphique.                     |
| Find correlated metrics| Trouvez des corrélations entre des services APM, des intégrations et des dashboards. |
| View in full screen    | Affichez le graphique en [plein écran][5].                     |
| Lock cursor            | Verrouillez l'emplacement du curseur sur la page.                         |
| View related processes | Accédez à la page [Live Processes][6] en appliquant un filtre basé sur votre graphique.   |
| View related hosts     | Accédez à la page [Host Map][7] en appliquant un filtre basé sur votre graphique.         |
| View related logs      | Accédez à la page [Log Explorer][8] en appliquant un filtre basé sur votre graphique.     |
| View related traces    | Remplissez automatiquement un volet de [traces][9] à partir des données de votre graphique.           |
| View related profiles  | Accédez à la page [Profiling][10] en appliquant un filtre basé sur votre graphique.        |

### Sélecteur d'intervalle global

Pour utiliser le sélecteur d'intervalle global, au moins un widget affichant des données sur un intervalle de temps doit utiliser l'option `Global Time`. Pour définir cette option, modifiez le widget en accédant à la section **Set display preferences** ou créez un widget (l'intervalle global est activé par défaut).

Le sélecteur d'intervalle global vous permet de définir le même intervalle de temps pour tous les widgets qui utilisent l'option `Global Time` au sein d'un même dashboard. Sélectionnez une plage historique dynamique (`Past 1 Hour`, `Past 1 Day`, etc.), définissez une période fixe à l'aide de l'option `Select from calendar...` ou [saisissez un intervalle personnalisé][10]. Si vous avez choisi une plage dynamique, les widgets sont mis à jour afin de refléter votre sélection.

Les widgets qui n'utilisent pas l'intervalle global affichent les données correspondant à leur intervalle local en fonction de l'intervalle global. Par exemple, si l'intervalle global s'étend du 1er janvier 2019 au 2 janvier 2019 et que l'intervalle local d'un widget est défini sur `Past 1 Minute`, celui-ci affiche la dernière minute du 2 janvier 2019, à partir de 23 h 59.

#### Taux d'actualisation

Le taux d'actualisation d'un dashboard privé dépend de l'intervalle affiché. Plus l'intervalle est court, plus les données sont actualisées régulièrement. Les dashboards publics s'actualisent toutes les 30 secondes, peu importe l'intervalle sélectionné.

| Intervalle   | Taux d'actualisation |
|--------------|--------------|
| 1 minute     | 10 secondes   |
| 2 minutes    | 10 secondes   |
| 5 minutes    | 10 secondes   |
| 10 minutes   | 10 secondes   |
| 30 minutes   | 20 secondes   |
| 1 heure       | 20 secondes   |
| 3 heures      | 1 minute     |
| 4 heures      | 1 minute     |
| 1 jour        | 3 minutes     |
| 2 jours       | 10 minutes    |
| 1 semaine       | 1 heure       |
| 1 mois      | 1 heure       |
| 3 mois     | 1 heure       |
| 6 mois     | 1 heure       |
| 1 an       | 1 heure       |

### Mode TV

Les dashboards sont particulièrement utiles pour afficher des métriques de performance clés en grand format, notamment sur un téléviseur. Pour activer le mode TV, utilisez le raccourci clavier `F` ou cliquez sur l'icône TV d'un dashboard.

### Paramètres

#### Historique des versions

À partir d'un dashboard, cliquez sur l'icône de l'historique des versions, située dans le coin supérieur droit, pour ouvrir le volet latéral dédié. Vous pouvez prévisualiser, rétablir ou dupliquer l'historique des versions de votre dashboard. Pour en savoir plus, consultez le [guide sur l'historique des versions][12].

#### Generate public URL

Partagez un dashboard avec d'autres personnes en dehors de Datadog en générant une URL publique. Pour en savoir plus, consultez la section [Partage de dashboards][11].

#### Display UTC time

Basculez entre l'heure UTC et votre fuseau horaire par défaut.

#### Notifications

Si les notifications sont activées pour un dashboard, un événement est créé dans l'[Events Explorer][14]. Il vous informe en cas de modification de texte, de modification d'un widget, de duplication d'un dashboard ou de suppression d'un dashboard, et indique le nom de l'utilisateur à l'origine de cette action.

Les utilisateurs ayant activé les notifications reçoivent également une alerte par e-mail. Tous les utilisateurs de l'organisation peuvent choisir de recevoir des notifications en cas de modification d'un dashboard, même s'ils ne disposent pas de droits administrateur.

Lorsque les notifications sont activées pour un dashboard, vous pouvez consulter les événements de modification depuis l'Events Explorer avec la recherche suivante :

```text
tags:audit,dash
```

Pour restreindre votre recherche à un dashboard spécifique, spécifiez le nom du dashboard dans la recherche.

#### Autorisations

En haut du dashboard, cliquez sur les paramètres, puis sélectionnez *Permissions*.

{{< img src="dashboards/dashboard-menu-permissions.png" alt="Le menu des paramètres d'un dashboard" style="width:50%;">}}

Utilisez la fenêtre contextuelle pour restreindre l'accès au dashboard de façon à ce qu'il soit uniquement accessible par vous, par tous les utilisateurs de votre organisation possédant votre rôle ou par les utilisateurs possédant certains rôles.

{{< img src="dashboards/access_popup.png" alt="Boîte de dialogue avec un menu déroulant permettant aux utilisateurs de choisir un rôle pour accéder au dashboard" style="width:70%;">}}

Tous les utilisateurs qui définissent des règles de contrôle d'accès doivent inclure un ou plusieurs de leurs rôles afin d'empêcher toute perte d'accès à l'échelle de l'organisation. Pour en savoir plus sur les rôles, consultez la [documentation relative au RBAC]|15].

Si le dashboard a été créé avec le paramètre obsolète « read only », tous les rôles qui disposent de l'autorisation Access Management (`user_access_manage`) sont ajoutés à la liste de contrôle d'accès.

Si vous gérez vos dashboards avec Terraform, vous pouvez utiliser la dernière version du fournisseur Terraform Datadog afin de définir les rôles autorisés à modifier vos dashboards. Pour en savoir plus, consultez le [guide de restriction des rôles pour les dashboards gérés avec Terraform][14].

**Remarque** : toutes les personnes bénéficiant de l'offre Enterprise peuvent appliquer des restrictions de vue à des dashboards individuels. Contactez l'équipe en charge de votre compte ou l'[assistance Datadog][17] pour activer cette fonctionnalité.


#### Mode Densité élevée

Le mode Densité élevée affiche simultanément plusieurs widgets Groupe au sein d'un dashboard, pour pouvoir comparer facilement les données de plusieurs widgets. Ce mode est activé par défaut sur les écrans de grande taille pour les dashboards utilisant des widgets Groupe.

{{< img src="dashboards/high-density-mode.png" alt="Affichage du mode Densité élevée" style="width:90%;">}}
#### Clone dashboard

Utilisez cette option pour dupliquer l'intégralité du dashboard au sein d'un nouveau dashboard. Vous devrez attribuer un nom au dashboard créé.

#### Copy/Import/Export dashboard JSON

À partir d'un dashboard spécifique, copiez, importez ou exportez le JSON du dashboard à l'aide de l'icône d'exportation (en haut à droite). Choisissez parmi les options suivantes :

| Option                          | Description                                                                                                                                                                |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Copy&nbsp;dashboard&nbsp;JSON   | Copier le JSON du dashboard dans votre presse-papiers.                                                                                                                               |
| Import&nbsp;dashboard&nbsp;JSON | Coller ou importer votre fichier JSON vers le dashboard. Cette option remplace tout le contenu du dashboard. Si le fichier JSON se trouve déjà dans votre presse-papiers, utilisez `Ctrl + V` (ou `Cmd + V` sur un Mac). |
| Export&nbsp;dashboard&nbsp;JSON | Télécharger un fichier JSON contenant le JSON de votre dashboard.                                                                                                                |

#### Delete dashboard

Utilisez cette option pour supprimer définitivement votre dashboard. Vous serez invité à confirmer votre choix.

## Détails des dashboards

À partir d'un dashboard spécifique, cliquez sur l'icône en forme d'accent circonflexe (^) en regard du titre du dashboard pour afficher et modifier ses détails. Un menu déroulant s'ouvre alors.

{{< img src="dashboards/suggested_dashboards.png" alt="Dashboards conseillés" >}}

Sous le titre, un message indique l'utilisateur qui a créé le dashboard.

### Suggestions de dashboards et utilisateurs actifs

À partir d'un dashboard spécifique, Datadog affiche des suggestions de dashboards connexes. Ces dashboards sont recommandés en fonction de l'activité utilisateur de votre organisation et de la fréquence à laquelle les utilisateurs passent de ce dashboard à d'autres dashboards. La section la plus à droite répertorie la liste des utilisateurs les plus actifs sur ce dashboard.

### Modifier les détails

Modifiez les descriptions des dashboards en respectant le format Markdown ou associez des [équipes][18] à un dashboard :

1. Ouvrez le dashboard à modifier.
1. Cliquez sur l'icône en forme d'accent circonflexe (^) en regard du titre du dashboard. Un menu déroulant s'ouvre alors.
1. Cliquez sur **Edit**. Vous pouvez désormais apporter des modifications.
1. Sélectionnez jusqu'à cinq équipes à partir du menu déroulant **Teams**.
1. Saisissez une description dans la zone de texte. Vous pouvez mettre en forme votre texte à l'aide du format Markdown.
1. Cliquez sur **Save**.


## Liste de dashboards

Recherchez, consultez ou créez des dashboards et des listes depuis la page [Dashboard List][4].

### Équipes

Utilisez l'option **My Teams** pour afficher tous les dashboards ou uniquement les dashboards appartenant à vos [équipes][18].

Pour modifier les équipes associées à un ou plusieurs dashboards, procédez comme suit :
1. Cochez la case en regard de chaque dashboard à modifier.
1. Ouvrez le menu déroulant **Edit Teams** dans le coin supérieur droit.
1. Cochez les cases en regard des équipes pertinentes pour les dashboards.
1. Cliquez sur **Apply Changes**.

### Nouvelle liste

Pour créer une liste de dashboards, cliquez sur le bouton **New List +** dans le coin supérieur droit.

Le titre de la liste est automatiquement défini sur le prénom de l'utilisateur. Ainsi, si Marie Dupont crée un dashboard, le titre par défaut sera `Marie's list`. Pour modifier le titre d'une liste, cliquez dessus afin de pouvoir modifier le texte.

Pour ajouter des dashboards à une liste, cochez les cases correspondantes dans la liste de dashboards principale. Cliquez ensuite sur le bouton *Add to List* dans le coin supérieur droit de la liste de dashboards :

{{< img src="dashboards/dash_to_list.png" alt="Ajouter un dashboard à une liste" style="width:100%;">}}

### Listes

La barre latérale sur la gauche présente vos listes préférées, ainsi que les listes favorites, les listes prédéfinies et les listes partagées et modifiables. Cliquez sur le lien **Hide Controls** pour masquer cette barre latérale.

#### Listes favorites

Les listes favorites sont des listes de dashboards pour lesquelles l'utilisateur actuellement connecté a ajouté une étoile. **Remarque** : si vous n'avez ajouté d'étoile à aucune liste, cette catégorie est masquée.

#### Listes prédéfinies

Les listes prédéfinies correspondent à des listes de dashboards par défaut dans Datadog :

| Liste                     | Description                                                               |
|--------------------------|---------------------------------------------------------------------------|
| All Custom               | Rassemble les dashboards personnalisés créés par un membre d'équipe dans le compte de votre organisation. |
| All Hosts                | Rassemble les dashboards créés automatiquement par Datadog lors de l'ajout d'un host.              |
| All Integrations         | Rassemble les dashboards créés automatiquement par Datadog lors de l'installation d'une intégration.  |
| All Shared               | Rassemble les dashboards pour lesquels le partage d'un lien avec authentification ou public est activé.             |
| Created By You           | Rassemble les dashboards personnalisés créés par l'utilisateur actuel.                            |
| Frequently Viewed By You | Rassemble tous les dashboards consultés régulièrement par l'utilisateur actuel.                     |
| Recently Deleted         | Rassemble les dashboards supprimés au cours des 30 derniers jours.                               |

#### Restaurer les dashboards supprimés

Utilisez la liste prédéfinie **Recently Deleted** pour restaurer les dashboards supprimés. Depuis cette liste, sélectionnez tous les dashboards à restaurer, puis cliquez sur **Restore to**. Sélectionnez une liste spécifique vers laquelle envoyer les dashboards restaurés, ou sélectionnez **All Custom** pour les restaurer sans aucune liste personnalisée. Les dashboards qui figurent dans la liste **Recently Deleted** sont supprimés de façon définitive après 30 jours.

{{< img src="dashboards/recently_deleted.png" alt="Restaurer un dashboard supprimé" style="width:100%;">}}

#### Listes partagées et modifiables

Cette section affiche les listes de dashboards partagés et modifiables, ainsi que le nombre de dashboards dans chaque liste.

### Tous les dashboards

Tous les dashboards répertoriés peuvent être triés à l'aide des en-têtes de colonne *Star*, *Name*, *Modified* et *Popularity*. Toutes les colonnes et leur description sont répertoriées ci-dessous :

| Colonne     | Description                                                                              |
|------------|------------------------------------------------------------------------------------------|
| Star       | Tous les dashboards pour lesquels l'utilisateur actuel a ajouté une étoile.                                              |
| Icon       | Une icône indiquant le type de dashboard (timeboard ou screenboard).                     |
| Nom       | Le nom du dashboard personnalisé ou prédéfini.                                              |
| Modified   | La date de dernière modification d'un dashboard personnalisé.                                            |
| Popularity | La [popularité](#popularité) relative du dashboard au sein de votre organisation.           |
| Creator    | L'icône de profil du créateur du dashboard. Les dashboards prédéfinis possèdent le logo de l'intégration. |

#### Popularity

Le dashboard le plus populaire d'une entreprise est caractérisé par cinq barres de popularité. La popularité des autres dashboards dépend de ce dashboard. Elle est basée sur le trafic des dashboards et mise à jour quotidiennement. Les nouveaux dashboards n'ont aucune barre de popularité pendant les 24 premières heures.

**Remarque** : le trafic vers les URL de dashboards publics n'est pas pris en compte dans le calcul de la popularité.

## Consulter des dashboards sur des appareils mobiles

L'[application mobile Datadog][1] est disponible sur l'[App Store d'Apple][2] et le [Google Play Store][3]. Elle vous permet de consulter vos dashboards dans un format adapté à votre appareil mobile. 

Sur la page Dashboards, vous pouvez consulter et rechercher tous vos dashboards, et les filtrer à l'aide des template variables définies dans l'application Web Datadog. Filtrez rapidement vos dashboards grâce aux vues enregistrées des templates variables. Pour en savoir plus sur les vues enregistrées des templates variables, consultez la [section relative aux vues enregistrées des dashboards][17]. Cliquez sur un dashboard pour l'afficher.

**Remarque** : pour configurer ou modifier un dashboard, vous devez vous connecter à Datadog depuis un navigateur.

{{< img src="dashboards/dashboards-list-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Dashboards sous iOS et Android">}}

## Créer des dashboards accessibles depuis l'écran d'accueil d'un appareil mobile

L'[application mobile Datadog][1], qui est disponible sur l'[App Store d'Apple][2] et le [Google Play Store][3], vous permet également de consulter des widgets sur l'écran d'accueil de votre appareil mobile. Grâce à ces widgets, vous pouvez surveiller l'intégrité de vos services et votre infrastructure sans avoir à ouvrir l'application mobile.

Votre écran d'accueil peut afficher des widgets SLO, Monitors et Open Incidents, ainsi que d'autres outils de développement et de collaboration vous permettant d'optimiser vos workflows de gestion des incidents et de triage.

{{< img src="dashboards/dashboards-widget-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Widgets sous iOS et Android">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/service_management/mobile/
[2]: https://apps.apple.com/app/datadog/id1391380318
[3]: https://play.google.com/store/apps/details?id=com.datadog.app
[4]: https://app.datadoghq.com/dashboard/lists
[5]: /fr/dashboards/widgets/#full-screen
[6]: https://app.datadoghq.com/process
[7]: https://app.datadoghq.com/infrastructure/map
[8]: https://app.datadoghq.com/logs
[9]: /fr/tracing/
[10]: /fr/profiler/
[11]: /fr/dashboards/guide/custom_time_frames/
[12]: /fr/dashboards/guide/version_history/
[13]: /fr/dashboards/sharing/#dashboards
[14]: /fr/events/
[15]: /fr/account_management/rbac/
[16]: /fr/dashboards/guide/how-to-use-terraform-to-restrict-dashboard-edit/
[17]: /fr/help/
[18]: /fr/account_management/teams/
[19]: /fr/dashboards/template_variables/#saved-views