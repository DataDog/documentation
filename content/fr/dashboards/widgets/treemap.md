---
aliases:
- /fr/graphing/widgets/treemap/
description: Représentez graphiquement les proportions d'un ou de plusieurs ensembles
  de données.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
- link: /dashboards/widgets/pie_chart/
  tag: Documentation
  text: Widget Graphique circulaire
title: Widget Treemap
---

Le widget Treemap vous permet de visualiser les proportions d'un ou de plusieurs ensembles de données. Il peut afficher un seul ensemble de données avec les proportions correspondantes, ou plusieurs avec des proportions imbriquées.

{{< img src="dashboards/widgets/treemap/treemap_overview.png" alt="Exemple de widget Treemap illustrant les nombres de pages vues uniques par pays et par navigateur selon les données Real User Monitoring (RUM). Chaque groupe extérieur est associé à une couleur qui représente le pays de l'utilisateur.">}}

## Configuration

1. Sélectionnez une ou plusieurs sources de données à partir de métriques ou d'événements.
    * Métriques : consultez la documentation sur les [requêtes][1] pour configurer une requête de métrique.
    * Événements : consultez la documentation sur la [recherche de logs][2] pour configurer une requête d'événement de log.
2. (Facultatif) Modifiez la requête avec une [formule][3].
3. Personnalisez votre graphique.

## Personnalisation

### Liens de contexte

Les [liens de contexte][4] sont activés par défaut, mais vous pouvez les désactiver si vous le souhaitez. Ils relient les widgets du dashboard à d'autres pages (dans Datadog ou sur des sites externes).

## Affichage et interactions

### Filtrer et mettre en évidence

Si plusieurs groupes de données sont représentés simultanément, vous pouvez filtrer le widget pour afficher une catégorie spécifique et visualiser les proportions au sein de celle-ci.

Pour filtrer et mettre en évidence une catégorie spécifique, cliquez sur le rectangle extérieur correspondant à cette catégorie. Pour revenir à la vue précédente, cliquez sur le bouton **Back** en haut à gauche du titre du widget.

{{< img src="dashboards/widgets/treemap/focus_animation.mp4" alt="Animation montrant comment filtrer et visualiser une seule catégorie à la fois dans le widget Treemap." video="true">}}

### Accéder au menu contextuel

Pour accéder au menu contextuel, passez d'abord votre curseur sur une catégorie spécifique : il peut s'agir d'une catégorie imbriquée ou d'un groupe (**Canada** ou **Canada > Chrome** dans l'exemple suivant). Un bouton représentant trois petits points verticaux s'affichent alors en haut à droite. Cliquez dessus pour afficher le menu contextuel.

{{< img src="dashboards/widgets/treemap/context_menu.png" alt="Les trois petits points verticaux apparaissent lorsque vous passez votre curseur sur une catégorie">}}

### Plein écran

Lorsque vous visualisez le widget Treemap en mode plein écran, les [options standard d'affichage en plein écran][5] s'affichent.

## API

Ce widget peut être utilisé avec l'[API Dashboards][6].

Le [schéma JSON][8] utilisé pour le widget Treemap est le suivant :

{{< dashboards-widgets-api >}}

## Widget Graphique circulaire

Comme pour le widget Treemap, il est possible d'utiliser le [widget Graphique circulaire][7] pour visualiser des proportions imbriquées. La principale différence entre les deux est que le widget Graphique circulaire affiche les proportions en tranches radiales, tandis que le widget Treemap affiche des rectangles imbriqués.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/querying
[2]: /fr/logs/explorer/search_syntax/
[3]: /fr/dashboards/functions/
[4]: /fr/dashboards/guide/context-links/
[5]: /fr/dashboards/widgets/#full-screen
[6]: /fr/api/latest/dashboards/
[7]: /fr/dashboards/widgets/pie_chart/
[8]: /fr/dashboards/graphing_json/widget_json/