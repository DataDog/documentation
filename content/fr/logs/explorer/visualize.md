---
aliases:
- /fr/logs/visualize
description: Visualisez les résultats des filtres et des agrégations pour voir vos
  logs sous le bon angle et faire émerger des informations clés.
further_reading:
- link: logs/explorer/search
  tag: Documentation
  text: Apprendre à filtrer les logs
- link: logs/explorer/analytics
  tag: Documentation
  text: Apprendre à regrouper des logs
- link: /logs/explorer/export
  tag: Documentation
  text: Exporter des vues depuis le Log Explorer
title: Visualisations de log
---

## Présentation

Les visualisations définissent la façon dont les résultats des filtres et des agrégats sont affichés. L'éditeur de requête de logs vous permet de sélectionner des visualisations pertinentes afin de représenter des informations importantes.

## Listes

Les listes énumèrent les logs ou les groupes de logs sous forme **paginée**. Elles sont utiles lorsque les résultats individuels vous intéressent, mais que vous ne savez pas encore très bien ce qui constitue un résultat pertinent. Les listes permettent d'examiner un groupe de résultats.

Les fonctionnalités diffèrent légèrement en fonction du type de liste dont il s'agit (liste de logs ou liste de groupes de logs).

### Liste de logs

Lorsque vous consultez une liste de logs individuels, choisissez les informations pertinentes à afficher sous forme de colonnes. Vous pouvez **gérer les colonnes** du tableau de deux façons différentes :

- Depuis le **tableau**, grâce aux interactions proposées dans la première rangée. Il s'agit de la façon la plus simple de **trier**, **réorganiser** ou **supprimer** des colonnes.
- Depuis le **volet des facettes** sur la gauche, ou le _volet latéral des logs_ sur la droite. Il s'agit de la façon la plus simple d'**ajouter** une colonne pour un champ.

Le bouton **Options** vous permet de modifier le **nombre de lignes** affichées sur le tableau pour chaque log.

{{< img src="logs/explorer/table_controls.mp4" alt="Configuration du tableau d'affichage" video=true style="width:80%;">}}

Par défaut, les logs affichés sous forme de liste sont **triés** par timestamp, les logs les plus récents étant affichés en premier. Cette méthode de tri est la plus rapide et est donc recommandée dans la plupart des cas. Vous pouvez afficher les logs présentant les valeurs les plus faibles ou les plus élevées pour une mesure en premier, ou trier vos logs par ordre lexicographique en fonction de la valeur unique d'une facette, en cliquant sur la colonne correspondant à cette facette.

**Remarque** : bien qu'il soit possible d'ajouter des attributs ou des tags sous la forme d'une colonne, il est recommandé de [déclarer une facette][3] avant de trier votre tableau, afin d'obtenir des résultats plus fiables. Les attributs sans facette peuvent être ajoutés en tant que colonnes, mais leur tri n'est pas cohérent.

La configuration du tableau de logs est stockée avec d'autres éléments de votre contexte de dépannage dans les [vues enregistrées][1].

### Liste de groupes de logs

Les colonnes affichées dans les listes de groupes sont les colonnes **dérivées de l'agrégation**.

Les résultats sont triés comme suit :

- Selon le nombre d'événements correspondants par groupe pour une agrégation en fonction du **pattern** (ordre décroissant par défaut)
- Par ordre lexicographique de l'ID de transaction pour une agrégation en fonction de la **transaction** (ordre alphabétique croissant par défaut)

## Série temporelle

Visualisez l'évolution d'une seule [mesure][2] (ou d'une [facette][2] correspondant à un nombre unique de valeurs) pour un intervalle donné. Vous pouvez également fractionner les données en utilisant l'une des trois [facettes][2] disponibles.

L'analyse de logs sous forme de série temporelle suivante illustre l'évolution des **50 principaux chemins URL** en fonction du 95 centile de **duration** au cours des 15 dernières minutes.

{{< img src="logs/explorer/timeseries.png" alt="Exemple de série temporelle" style="width:90%;">}}

Les séries temporelles vous permettent de choisir des options d'affichage supplémentaires : l'**intervalle de cumul**, si les résultats doivent être **affichés** sous forme de **barres** (recommandé pour les nombres et les nombres uniques), de **lignes** (recommandé pour les agrégations statistiques) ou de **zones**, et le **jeu de couleurs**.

## Top list

Visualisez les valeurs les plus élevées d'une [facette][2] en fonction de la [mesure][2] choisie.

Par exemple, la top list suivante affiche les **15 principaux clients** sur un site d'e-commerce en fonction du nombre de **sessions uniques** qu'ils ont enregistrées au cours des dernières 24 heures.

{{< img src="logs/explorer/toplists.jpg" alt="Exemple de top list" style="width:90%;">}}

## Tableaux imbriqués

Visualisez la liste des valeurs les plus élevées pour une à trois [facettes][2] en fonction de la [mesure][2] choisie (la première mesure que vous choisissez dans la liste), et affichez la valeur d'autres mesures dans ce tableau. Mettez à jour la requête de recherche ou explorez les logs correspondant à l'une des dimensions.

- Lorsque plusieurs mesures sont définies, les valeurs les plus élevées ou faibles sont déterminées en fonction de la première mesure.
- Le sous-total peut différer de la somme réelle des valeurs au sein d'un groupe, étant donné qu'un seul sous-ensemble (celui des valeurs les plus élevées ou des valeurs les plus faibles) s'affiche. Les événements associés à une valeur nulle ou vide pour cette dimension ne s'affichent pas en tant que sous-groupe.

**Remarque** : la visualisation d'une seule mesure et d'une seule dimension sous forme de tableau est identique à celle d'une Top List. Seule la présentation diffère.

L'analyse de logs sous forme de tableau suivante illustre l'évolution des **10 principales zones de disponibilité**. Pour chaque zone de disponibilité, elle affiche également les **10 principales versions** en fonction du **nombre de logs d'erreur** ainsi que le nombre de **hosts** et d'**ID de conteneur** uniques.

{{< img src="logs/explorer/nested_tables.jpg" alt="Exemple de tableau" style="width:90%;">}}

## Graphique à secteurs

Organisez et représentez vos données sous la forme d'un pourcentage d'un total grâce à un graphique à secteurs. Ce type de graphique est particulièrement utile pour comparer la relation entre plusieurs dimensions, telles que des services, utilisateurs, hosts ou encore pays, de vos données de log.

Le graphique à secteurs suivant représente une répartition par **service** sous forme de pourcentages.

{{< img src="logs/explorer/doc_pie_chart.png" alt="Exemple de graphiques à secteurs représentant une répartition par service sous forme de pourcentages" style="width:90%;">}}

## Carte proportionnelle

Organisez et représentez vos données dans un format attrayant sous la forme d'un pourcentage d'un total grâce à une carte proportionnelle. Les données de ce type de graphique sont affichées dans des cases imbriquées. Vous pouvez comparer les différentes dimensions en fonction de la taille et de la couleur des cases. Il est également possible de sélectionner plusieurs attributs pour visualiser une hiérarchie de cases.

La carte proportionnelle suivante représente une répartition par **service** sous forme de pourcentages.

{{< img src="logs/explorer/doc_tree_map.png" alt="Exemple de carte proportionnelle représentant une répartition par service sous forme de pourcentages" style="width:90%;">}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/saved_views/
[2]: /fr/logs/search-syntax
[3]: /fr/logs/explorer/facets/