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
- link: /dashboards/widgets/top_list/
  tag: Documentation
  text: Widget Top List
- link: /dashboards/widgets/bar_chart/
  tag: Documentation
  text: Widget Bar Chart
title: Widget Treemap
widget_type: treemap
---

Le widget Treemap vous permet d'afficher les proportions d'un ou plusieurs jeux de données. Ce widget peut afficher un seul jeu de données avec les proportions correspondantes, ou plusieurs jeux de données avec des proportions imbriquées.

{{< img src="dashboards/widgets/treemap/treemap_overview.png" alt="Un widget Treemap affichant les pages vues uniques issues du jeu de données Real User Monitoring (RUM) au niveau du pays et du navigateur. Les groupes externes - distingués par couleur - indiquent le pays de l'utilisateur.">}}

## Configuration

1. Sélectionnez parmi les sources de données disponibles.
2. Configurez la requête. Voir les ressources suivantes pour en savoir plus :
    * Métriques : consultez la documentation sur les [requêtes][1] pour configurer une requête de métrique.
    * Événements : consultez la documentation sur la [recherche de logs][2] pour configurer une requête d'événement de log.
3. (Facultatif) Modifiez la requête avec une [formule][3].
4. Personnalisez votre graphique.

## Personnalisation

### Liens de contexte

Les [liens de contexte][4] sont activés par défaut, mais vous pouvez les désactiver si vous le souhaitez. Ils relient les widgets du dashboard à d'autres pages (dans Datadog ou sur des sites externes).

## Affichage et interactions

### Filtrer et mettre en évidence

Si plusieurs groupes de données sont représentés simultanément, vous pouvez filtrer le widget pour afficher une catégorie spécifique et visualiser les proportions au sein de celle-ci.

Pour filtrer et mettre en évidence une catégorie spécifique, cliquez sur le rectangle extérieur correspondant à cette catégorie. Pour revenir à la vue précédente, cliquez sur le bouton **Back** en haut à gauche du titre du widget.

{{< img src="dashboards/widgets/treemap/focus_animation.mp4" alt="Animation montrant comment filtrer et visualiser une seule catégorie à la fois dans le widget Treemap." video="true">}}

### Accéder au menu contextuel

Pour accéder au menu contextuel, passez d'abord la souris sur une catégorie individuelle : il peut s'agir d'une catégorie imbriquée ou d'un groupe, tel que **Canada** ou **Canada > Edge** dans l'exemple suivant. Un bouton déroulant apparaît alors dans le coin supérieur droit. Lorsqu'il est cliqué, le menu contextuel s'affiche.

{{< img src="dashboards/widgets/treemap/context_menu_dropdown.png" alt="Le bouton fléché déroulant s'affiche au survol d'une catégorie">}}

### Plein écran

L'affichage du widget Treemap en plein écran révèle l'ensemble standard des [options plein écran][5].

## Widget Graphique circulaire

Comme le widget Treemap, le [widget Pie Chart][8] peut également être utilisé pour afficher des proportions imbriquées. La principale différence entre les deux est que le widget Pie Chart affiche les proportions en secteurs radiaux, tandis que le widget Treemap affiche des rectangles imbriqués.

## API

Ce widget peut être utilisé avec l'**[API Dashboards][6]**. Le tableau ci-dessous définit le [schéma JSON du widget][7] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/querying
[2]: /fr/logs/explorer/search_syntax/
[3]: /fr/dashboards/functions/
[4]: /fr/dashboards/guide/context-links/
[5]: /fr/dashboards/widgets/#full-screen
[6]: /fr/api/latest/dashboards/
[7]: /fr/dashboards/graphing_json/widget_json/
[8]: /fr/dashboards/widgets/pie_chart/