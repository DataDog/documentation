---
description: Représentez graphiquement les proportions d'un ou de plusieurs ensembles
  de données.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
- link: /dashboards/widgets/treemap/
  tag: Documentation
  text: Widget Treemap
title: Widget Graphique circulaire
---

Le widget Graphique circulaire vous permet de représenter un seul ensemble de données avec les proportions correspondantes, ou plusieurs avec des proportions imbriquées.

{{< img src="dashboards/widgets/pie_chart/pie_chart_overview.png" alt="Exemple de widget Graphique circulaire. Le cercle le plus au centre représente les pays des utilisateurs, et le cercle le plus à l'extérieur est découpé proportionnellement pour représenter la part des navigateurs utilisés dans chaque pays." style="width:60%;">}}


## Configuration

1. Sélectionnez une ou plusieurs sources de données à partir de métriques ou d'événements.
    * Métriques : consultez la documentation sur les [requêtes][1] pour configurer une requête de métrique.
    * Événements : consultez la documentation sur la [recherche de logs][2] pour configurer une requête d'événement de log.
2. (Facultatif) Modifiez la requête avec une [formule][3].
3. Personnalisez votre graphique.

## Personnalisation du graphique

### Affichage de la quantité totale

Indiquez si vous souhaitez que le nombre total s'affiche au centre du graphique. Par défaut, l'option **Automatic** affiche le nombre total dès que le graphique atteint une certaine taille.

### Configuration de la légende

Les textes de légende peuvent être désactivés, affichés à côté des différents segments du graphique avec l'option **Aside**, ou affichés sous forme de tableau avec la valeur, la couleur et la proportion via l'option **Table**.

Par défaut, l'option **Automatic** affiche les textes de légende à côté des segments dans un dashboard, et sous forme de tableau lorsque le dashboard est ouvert en mode plein écran.

{{< img src="dashboards/widgets/pie_chart/legend_automatic.png" alt="Options d'affichage de la légende sur un graphique circulaire : Automatic, Table, Aside, et None" style="width:80%;">}}

### Liens de contexte

Les [liens de contexte][4] sont activés par défaut, mais vous pouvez les désactiver si vous le souhaitez. Ils relient les widgets du dashboard à d'autres pages (dans Datadog ou sur des sites externes).

## Affichage et interactions

### Filtrer et mettre en évidence

Si plusieurs groupes de données sont représentés simultanément, vous pouvez choisir une catégorie et visualiser les proportions au sein de celle-ci.

Pour choisir une catégorie spécifique, cliquez sur le cercle extérieur correspondant à cette catégorie. Pour revenir à la vue précédente, cliquez à nouveau sur le centre du graphique.

{{< img src="dashboards/widgets/pie_chart/interaction_animation.mp4" alt="Animation illustrant le filtrage et la mise en évidence d'une catégorie spécifique" video="true" style="width:80%;">}}

### Plein écran

Lorsque vous visualisez le widget Graphique circulaire en mode plein écran, les [options standard d'affichage en plein écran][5] s'affichent.

## API

Ce widget peut être utilisé avec l'[API Dashboards][6].

## Widget Treemap

Comme pour le widget Graphique circulaire, il est possible d'utiliser le [widget Treemap][7] pour visualiser des proportions imbriquées. La principale différence entre les deux est que le widget Graphique circulaire affiche les proportions en tranches radiales, tandis que le widget Treemap affiche des rectangles imbriqués.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/querying
[2]: /fr/logs/explorer/search_syntax/
[3]: /fr/dashboards/functions/
[4]: /fr/dashboards/guide/context-links/
[5]: /fr/dashboards/widgets/#full-screen
[6]: /fr/api/latest/dashboards/
[7]: /fr/dashboards/widgets/treemap/