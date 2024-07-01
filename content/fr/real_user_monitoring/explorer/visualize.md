---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentation
  text: Rechercher des événements
title: Visualiser les données
---

## Présentation

Les visualisations définissent la façon dont les résultats des filtres et des agrégats s'affichent dans le [RUM Explorer][1]. Choisissez le bon type de visualisation pour représenter les informations dont vous avez besoin sous la requête de recherche.

## Listes

Les listes énumèrent les résultats paginés d'événements. Elles sont particulièrement utiles lorsque vous souhaitez mettre en avant des résultats individuels. Vous n'avez pas besoin de savoir ce qui constitue un résultat pertinent pour utiliser des listes.

{{< img src="real_user_monitoring/explorer/visualize/rum_explorer_lists-1.mp4" alt="Listes dans le RUM Explorer" video="true" style="width:70%;" >}}

Les informations dont vous avez besoin sont indiquées dans les colonnes. Vous pouvez gérer les éléments suivants des listes :

- Le tableau avec les interactions disponibles à la première ligne. Il est possible de trier les colonnes, de modifier leur disposition et de les supprimer.
- Le volet des facettes sur la gauche ou le [volet latéral des événements][2] RUM sur la droite. Il est possible d'ajouter une colonne pour un champ spécifique.

Par défaut, les événements RUM des listes sont organisés par timestamp : les événements les plus récents sont affichés en haut de la liste. Comme pour les facettes, vous pouvez trier les événements comme vous semble. Par exemple, vous pouvez afficher en haut d'une liste les événements RUM dont la valeur d'une mesure est la plus élevée ou la plus faible, puis trier vos événements de façon lexicographique en fonction de la valeur unique d'une facette. Ainsi, l'ordre de votre colonne est basé sur la facette.

Bien qu'il soit possible d'ajouter des attributs et des tags dans les colonnes, Datadog vous conseille de trier le tableau si vous avez déjà [déclaré une facette][3]. Pour afficher la valeur d'un attribut personnalisé pour une ligne du tableau, vous pouvez ajouter des attributs sans facette dans les colonnes. Sachez néanmoins que ces attributs ne seront pas forcément triés correctement.

La configuration du tableau d'événements RUM est stockée avec d'autres éléments de votre contexte de dépannage dans les [vues enregistrées][4].

### Widget Liste

Le [widget Liste dans les dashboards][8] affiche des événements individuels provenant d'une source de données précise, y compris des données RUM. Ce widget vous sert à consulter des événements RUM dans un dashboard. Vous pouvez par exemple visualiser toutes les erreurs d'une certaine page.

Le widget Liste peut non seulement être intégré à des dashboards, mais également à des notebooks. Vous pouvez ainsi ajouter des événements RUM à vos rapports et enquêtes.

## Série temporelle

Visualisez l'évolution d'une seule mesure (ou d'une [facette][1] correspondant à un nombre unique de valeurs) pour un intervalle donné. Vous pouvez également fractionner le graphique en utilisant une [facette][5] disponible.

{{< img src="real_user_monitoring/explorer/visualize/timeseries-1.png" alt="Graphique de série temporelle dans le RUM Explorer" style="width:90%;" >}}

Ce graphique de série temporelle représente l'évolution du nombre de vues de page dans l'application Shopist au cours des dernières 24 heures pour chaque chemin de vue.

Vous disposez d'autres options pour modifier la visualisation :

- Affichage : les résultats peuvent être affichés sous forme de barres (recommandé pour les nombres de valeurs et nombres de valeurs uniques), de lignes (recommandé pour les agrégations statistiques) ou d'aires. Plusieurs jeux de couleurs sont également disponibles.
- Intervalle de cumul : définissez la taille des compartiments dans les barres.

## Top list

Visualisez les valeurs les plus élevées d'une facette en fonction de la mesure de votre choix.

{{< img src="real_user_monitoring/explorer/visualize/top_list-1.png" alt="Graphique à barres d'une top list dans le RUM Explorer" style="width:90%;" >}}

Cette top list affiche les dix principaux navigateurs utilisés pour visiter le site Web Shopist au cours des dernières 24 heures.

## Tableaux imbriqués

Visualisez les valeurs les plus élevées pour une à trois [facettes][5] en fonction de la [mesure][3] de votre choix (la première mesure sélectionnée dans la liste), et affichez la valeur d'autres mesures dans le tableau imbriqué. Vous pouvez modifier la requête de recherche ou étudier les événements RUM correspondant à l'une des dimensions.

* Lorsque plusieurs mesures sont définies, les valeurs les plus élevées ou faibles sont déterminées en fonction de la première mesure.
* Le sous-total peut différer de la somme réelle des valeurs au sein d'un groupe, étant donné qu'un seul sous-ensemble (celui des valeurs les plus élevées ou des valeurs les plus faibles) s'affiche. Les événements associés à une valeur nulle ou vide pour cette dimension ne s'affichent pas en tant que sous-groupe.

 **Remarque** : la visualisation d'une seule mesure et d'une seule dimension sous forme de tableau est identique à celle d'une [top list](#top-list). Seule la présentation diffère.

 Le tableau RUM Analytics suivant affiche les **5 principaux chemins d'URL** consultés pour **deux pays**, les États-Unis et le Japon, selon le nombre d'**ID de session uniques** ainsi que le 90e centile de **durée** au cours du dernier jour :

{{< img src="real_user_monitoring/explorer/visualize/nested_table-3.png" alt="Tableau imbriqué dans le RUM Explorer" style="width:90%;">}}

## Distributions

Vous pouvez représenter la distribution d'attributs de mesure sur l'intervalle de votre choix pour afficher les variations des valeurs.

{{< img src="real_user_monitoring/explorer/visualize/distribution-1.png" alt="Graphique de distribution dans le RUM Explorer" style="width:90%;">}}

Ce graphique de distribution représente la distribution de la métrique Largest Contentful Paint, qui permet de mesurer l'expérience utilisateur sur la page d'accueil du site Web Shopist.

## Geomaps

Visualisez une [mesure][1] unique (ou une [facette][5] correspondant à un nombre unique de valeurs) sur une carte du monde.

{{< img src="real_user_monitoring/explorer/visualize/geomap-1.png" alt="Carte géographique dans le RUM Explorer" style="width:90%;">}}

Cette geomap d'analyse RUM affiche le 75e centile de la métrique **Largest Contentful Paint** au cours des dernières 24 heures.

## Entonnoirs
En savoir plus sur l'[analyse d'entonnoir][9].
## Cartes proportionnelles
Organisez et représentez vos données dans un format attrayant sous la forme d'un pourcentage d'un total grâce à une carte proportionnelle. Les données de ce type de graphique sont affichées dans des cases imbriquées. Vous pouvez comparer les différentes dimensions en fonction de la taille et de la couleur des cases. Il est également possible de sélectionner plusieurs attributs pour visualiser une hiérarchie de cases.

La carte proportionnelle suivante représente une répartition par **nom de service** sous forme de pourcentages.

{{< img src="real_user_monitoring/explorer/visualize/tree-map.png" alt="Carte proportionnelle dans le RUM Explorer" style="width:90%;">}}
## Graphiques à secteurs
Organisez et représentez vos données sous la forme d'un pourcentage d'un total grâce à un graphique à secteurs. Ce type de graphique est particulièrement utile pour comparer la relation entre plusieurs dimensions, telles que des services, utilisateurs, hosts ou encore pays, de vos données de log.

Le graphique à secteurs suivant représente une répartition par **chemin de vue** sous forme de pourcentages.

{{< img src="real_user_monitoring/explorer/visualize/pie-chart.png" alt="Graphique à secteurs dans le RUM Explorer" style="width:90%;">}}

## Événements associés

Pour toutes les visualisations, à l'exception de l'[entonnoir](#entonnoirs), vous pouvez sélectionner une partie du graphique ou cliquer dessus pour agrandir les données ou afficher la liste des événements correspondant à votre sélection.

{{< img src="real_user_monitoring/explorer/visualize/related_events-1.png" alt="Lien vers les événements associés qui s'affiche après un clic sur le graphique" width="90%" >}}

Pour les graphiques représentant des entonnoirs, cliquez sur le graphique pour afficher la liste des sessions converties et abandonnées correspondant à vos requêtes.

Pour les autres types de visualisations, cliquez sur le graphique et sur **View events** pour afficher la liste des événements correspondant à votre sélection.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/explorer/
[2]: /fr/real_user_monitoring/explorer/events/
[3]: /fr/logs/explorer/facets/
[4]: /fr/real_user_monitoring/explorer/saved_views/
[5]: /fr/real_user_monitoring/explorer/search#setup-facets-and-measures
[6]: /fr/notebooks
[7]: /fr/real_user_monitoring/explorer/export/
[8]: /fr/dashboards/widgets/list/
[9]: /fr/real_user_monitoring/funnel_analysis