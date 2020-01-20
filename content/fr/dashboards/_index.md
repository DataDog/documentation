---
title: Dashboards
kind: documentation
aliases:
  - /fr/guides/templating/
  - /fr/graphing/dashboards/
  - /fr/guides/graphing
  - /fr/graphing/miscellaneous/metrics_arithmetic
  - /fr/graphing/faq/is-there-a-way-for-me-to-set-the-maximum-and-minimum-values-on-the-y-axis-of-a-graph
  - /fr/graphing/faq/is-it-possible-to-adjust-the-y-axis-for-my-graphs
  - /fr/graphing/
description: Visualiser vos données pour mieux les comprendre
further_reading:
  - link: /dashboards/template_variables
    tag: Documentation
    text: Améliorer vos dashboards avec les template variables
  - link: /dashboards/sharing
    tag: Documentation
    text: Partager vos graphiques en dehors de Datadog
  - link: /dashboards/widgets
    tag: Documentation
    text: Découvrir tous les widgets disponibles pour votre dashboard
---
## Présentation

Un dashboard est un outil vous permettant de surveiller visuellement, d'analyser et d'afficher des métriques de performance clés dans Datadog. Ces dernières facilitent la surveillance de l'état de votre infrastructure.

## Liste de dashboards

Recherchez, consultez ou créez des dashboards et des listes depuis la page [Dashboard List][1]. Par défaut, il s'agit de la page vers laquelle vous êtes redirigé après votre connexion. Pour modifier la page d'accueil par défaut de votre organisation, contactez l'[assistance Datadog][2].

{{< img src="dashboards/dashboards/dashboard_list2.png" alt="Page Dashboard List" >}}

### Nouvelle liste

Pour créer une liste de dashboards, cliquez sur le bouton **New List +** dans le coin supérieur droit.

Le titre de la liste est automatiquement défini sur le prénom de l'utilisateur. Ainsi, si Marie Dupont crée un dashboard, le titre par défaut sera `Marie's list`. Pour modifier le titre d'une liste, cliquez dessus afin de pouvoir modifier le texte.

Pour ajouter des dashboards à une liste, cochez les cases correspondantes dans la liste de dashboards principale. Cliquez ensuite sur le bouton *Add to List* dans le coin supérieur droit de la liste de dashboards :

{{< img src="dashboards/dashboards/dash_to_list.png" alt="Ajouter un dashboard à une liste" style="width:70%;">}}

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
| Created By You           | Rassemble les dashboards créés par l'utilisateur actuellement connecté.                |
| Frequently Viewed By You | Rassemble tous les dashboards consultés régulièrement par l'utilisateur actuellement connecté.         |

#### Listes de tableaux de bord partagés et modifiables

Cette section affiche les listes de dashboards partagés et modifiables, ainsi que le nombre de dashboards dans chaque liste.

### Tous les tableaux de bord

Tous les tableaux de bord répertoriés peuvent être triés à l'aide des en-têtes de colonne *Star*, *Name*, *Modified* et *Popularity*. Toutes les colonnes et leur description sont répertoriées ci-dessous :

| Colonne     | Description                                                                              |
|------------|------------------------------------------------------------------------------------------|
| Star       | Tous les dashboards pour lesquels l'utilisateur actuellement connecté a ajouté une étoile.                                  |
| Icon       | Une icône indiquant le type de dashboard (timeboard ou screenboard).                     |
| Nom       | Le nom du dashboard personnalisé ou prédéfini.                                              |
| Modified   | La date de dernière modification d'un dashboard personnalisé.                                            |
| Popularity | La [popularité](#popularité) relative du tableau de bord au sein de votre organisation.           |
| Creator    | L'icône de profil du créateur du dashboard. Les dashboards prédéfinis possèdent le logo de l'intégration. |

#### Popularity

Le dashboard le plus populaire d'une entreprise est caractérisé par cinq barres de popularité. La popularité des autres dashboards dépend de ce dashboard. Elle est basée sur le trafic des dashboards et mise à jour quotidiennement. Les nouveaux dashboards n'ont aucune barre de popularité pendant les 24 premières heures.

**Remarque** : le trafic vers les URL de dashboards publics n'est pas pris en compte dans le calcul de la popularité.

## Nouveau dashboard

Pour créer un dashboard, cliquez sur le bouton **New Dashboard +** dans le coin supérieur droit de la page. Saisissez un nom et choisissez de créer un [timeboard][3] ou un [screenboard][4].

### Screenboard ou timeboard

Datadog propose deux types de dashboards différents : les [screenboards][4] et les [timeboards][3]. Consultez le tableau ci-dessous pour mieux comprendre ce qui les différencie :

|                            | Timeboards                            | Screenboards                              |
|----------------------------|---------------------------------------|-------------------------------------------|
| Intervalle                 | Tous les graphiques possèdent le même intervalle. | Les graphiques peuvent avoir leur propre intervalle.   |
| Disposition                     | Les graphiques s'affichent sur une grille fixe. | Les graphiques peuvent être placés à n'importe quel endroit du canevas. |
| Partage de graphiques individuels  | Oui                                   | Non                                        |
| Partage de l'ensemble du dashboard | Non                                    | Oui                                       |
| Partage en lecture seule   | Oui                                   | Oui                                       |

### Copier, importer et exporter

Depuis un tableau de bord, vous pouvez copier, importer ou exporter son fichier JSON à l’aide de l’icône en forme d’engrenage (en haut à droite), qui affiche les options suivantes :

| Option                          | Description                                                                                                                                                                |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Copy&nbsp;dashboard&nbsp;JSON   | Copier le JSON du dashboard dans votre presse-papiers.                                                                                                                               |
| Import&nbsp;dashboard&nbsp;JSON | Coller ou importer votre fichier JSON vers le dashboard. Cette option remplace tout le contenu du dashboard. Si le fichier JSON se trouve déjà dans votre presse-papiers, utilisez `Ctrl + V` (ou `Cmd + V` sur un Mac). |
| Export&nbsp;dashboard&nbsp;JSON | Télécharger un fichier JSON contenant le JSON de votre dashboard.                                                                                                                |

{{< img src="dashboards/copy_dashboard.png" alt="Copier un dashboard" style="width:30%;">}}

### Suggestions de dashboards et utilisateurs actifs

Depuis un dashboard, Datadog vous propose des suggestions de dashboards pertinents. Pour afficher les dashboards conseillés et les utilisateurs actifs, cliquez sur l'icône en forme d'accent circonflexe en regard du titre du dashboard. Ces dashboards sont conseillés en fonction de l'activité des utilisateurs de votre organisation et de la fréquence à laquelle ils passent de ce dashboard à d'autres dashboards existant. Vous pouvez également ajouter ou mettre à jour des descriptions de dashboard au format Markdown en cliquant sur `edit` depuis cette vue.

{{< img src="dashboards/dashboards/suggested_dashboards.png" alt="Dashboards conseillés" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: /fr/help
[3]: /fr/dashboards/timeboard
[4]: /fr/dashboards/screenboard