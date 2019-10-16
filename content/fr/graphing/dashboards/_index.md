---
title: Dashboards
kind: documentation
aliases:
  - /fr/guides/templating/
further_reading:
  - link: graphing/dashboards/template_variables
    tag: Documentation
    text: Améliorer vos dashboards avec des template variables
  - link: graphing/dashboards/shared_graph
    tag: Documentation
    text: Partager vos graphiques en dehors de Datadog
  - link: graphing/widgets
    tag: Documentation
    text: Découvrir tous les widgets disponibles pour votre dashboard
---
## Liste de dashboards

La page [Dashboard List][1] vous permet de trier vos dashboards au sein de différentes listes.

{{< img src="graphing/dashboards/dashboard_list.png" alt="Dashboard list" responsive="true" >}}

Effectuez des recherches dans votre dashboard grâce à la barre de recherche en haut de la page. Les dashboards de la page Dashboard list peuvent être triés à l'aide des en-têtes de colonnes :

* `Favorite` : permet de trier la liste de dashboards en disposant vos dashboards préférés en premier.
* `Name` : permet de trier la liste de dashboards par ordre alphabétique.
* `Modified` : permet de trier la liste de dashboards en fonction de la date de dernière modification.
* `Popularity` : permet de trier la liste de dashboards en fonction de la [popularité des dashboards](#popularité).

### Popularité

La popularité d'un dashboard est relative. Le dashboard le plus populaire d'une entreprise est représenté par cinq barres, et la popularité de tous les autres dashboards dépend de ce dernier. La popularité est basée sur le trafic d'un dashboard et est mise à jour quotidiennement. Par conséquent, les nouveaux dashboards n'ont aucune barre de popularité pendant les 24 premières heures.

**Remarque** : le trafic vers des URL publiques de dashboards publics n'est pas pris en compte.

## Créer une liste de dashboards

Cliquez sur l'icône *New List +* dans le coin supérieur droit de la page pour créer une liste de dashboards.

Sélectionnez son titre pour le modifier :

{{< img src="graphing/dashboards/new_list_title.png" alt="Nouvelle liste" responsive="true" style="width:70%;">}}

Pour ajouter des dashboards à votre liste de dashboards, cochez les cases correspondantes dans la liste de dashboards principale. Cliquez ensuite sur le bouton *Add to List* dans le coin supérieur droit de la liste de dashboards :

{{< img src="graphing/dashboards/dash_to_list.png" alt="Ajouter un dashboard à une liste" responsive="true" style="width:70%;">}}

## Créer un dashboard

Pour créer un dashboard, cliquez sur le bouton *New Dashboard* dans le coin supérieur droit de la page. Datadog vous demande alors de choisir entre la création d'un [timeboard][2] ou d'un [screenboard][3]. Sélectionnez l'une de ces options après avoir cliqué sur « New Dashboard » dans le menu déroulant « Dashboards ».

### Quelle est la différence entre un screenboard et un timeboard ?

Vous pouvez créer et personnaliser deux types de dashboards : les [screenboards][3] et les [timeboards][4]. Consultez le tableau ci-dessous pour mieux comprendre ce qui les différencie :

|                                | Timeboards                       | Screenboards                                      |
|--------------------------------|----------------------------------|---------------------------------------------------|
| Intervalle                     | Tous les graphiques possèdent le même intervalle. | Chaque graphique peut avoir son propre intervalle.         |
| Disposition                         | Les graphiques s'affichent sur une grille fixe.    | Les graphiques peuvent être placés où bon vous semble sur le canevas. |
| Partage de graphiques individuels  | Oui                              | Non                                                |
| Partage de l'ensemble du dashboard | Non                               | Oui                                               |
| Partage en lecture seule       | Oui                              | Oui                                               |

### Copier, importer et exporter

Vous pouvez copier, importer ou exporter un fichier JSON du dashboard à l’aide de l’icône en forme d’engrenage (en haut à droite), qui affiche les options suivantes 

| Option                          | Description                                                                                                                                                                |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Copy&nbsp;dashboard&nbsp;JSON   | Copiez le fichier JSON du dashboard dans votre presse-papiers.                                                                                                                               |
| Import&nbsp;dashboard&nbsp;JSON | Collez ou importez votre fichier JSON vers le dashboard. Cette option remplace tout le contenu du dashboard. Si le fichier JSON se trouve déjà dans votre presse-papiers, utilisez `Ctrl + V` (ou `Cmd + V` sur un Mac). |
| Export&nbsp;dashboard&nbsp;JSON | Téléchargez un fichier JSON contenant le JSON de votre dashboard.                                                                                                                |

{{< img src="graphing/dashboards/copy_dashboard.png" alt="Copier un dashboard" responsive="true" style="width:30%;">}}

### Suggestions de dashboards et utilisateurs actifs

Si vous recherchez du contenu intéressant mais ne savez pas où le trouver, Datadog vous propose des suggestions de dashboards pertinents. Pour afficher les dashboards conseillés et les utilisateurs actifs, cliquez sur l'icône en forme d'accent circonflexe en regard du titre du dashboard. Ces dashboards sont conseillés en fonction de l'activité des utilisateurs de votre organisation et de la fréquence à laquelle ils passent de ce dashboard à d'autres dashboards existant. Vous pouvez également ajouter ou mettre à jour des descriptions de dashboard au format Markdown en cliquant sur `edit` depuis cette vue.

{{< img src="graphing/dashboards/suggested_dashboards.png" alt="Dashboards conseillés" responsive="true">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing
[2]: /fr/graphing/dashboards/timeboard
[3]: /fr/graphing/dashboards/screenboard
[4]: /fr/graphing/dashboards/timeboard