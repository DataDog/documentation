---
title: Vue Dashboard
kind: documentation
aliases:
  - /fr/graphing/dashboards/dashboard/
  - /fr/graphing/dashboards/dashboard/
  - /fr/dashboards/dashboard/
  - /fr/dashboards/
  - /fr/dashboard/
further_reading:
  - link: /dashboards/template_variables/
    tag: Documentation
    text: Améliorer vos dashboards avec les template variables
  - link: /dashboards/sharing/
    tag: Documentation
    text: Partager vos graphiques en dehors de Datadog
  - link: /dashboards/widgets/
    tag: Documentation
    text: Découvrir tous les widgets disponibles pour votre dashboard
---
Les dashboards sont disposés au sein d'une grille intelligente qui peut inclure un vaste choix d'objets, tels que des images, des graphiques et des logs. Les dashboards servent généralement à visualiser les statuts de vos services et à mettre en récit vos données. Ils peuvent être mis à jour en temps réel ou représenter des points fixes historiques. Ils s'avèrent également très utiles pour le debugging.

Pour passer de la [disposition Timeboard][1] à la disposition Dashboard, ouvrez le menu des réglages, cliquez sur `Pick Layout`, puis sélectionnez `Grid`.

{{< img src="dashboards/grid-layout.png" alt="Disposition avec une grille pour un dashboard" style="width:70%;">}}

#### Mode Densité élevée

Le mode Densité élevée affiche côte à côte des groupes de widgets, afin d'augmenter le volume d'informations affichées. Ce mode est activé par défaut sur les grands écrans pour les dashboards qui utilisent des groupes de widgets.

{{< img src="dashboards/high-density-mode.png" alt="Affichage du mode Densité élevée" style="width:90%;">}}

## Recherche

Pour superposer des options de recherche, consultez la [documentation sur les timeboards][2].

## Menu des graphiques

Pour en savoir plus sur les options du menu des graphiques, consultez la [documentation sur les timeboards][3]

## Conseils et astuces

- Cliquez sur l'icône d'un widget pour l'ajouter au dashboard sans avoir à le faire glisser (vous pouvez également utiliser les raccourcis clavier `N` et `Maj + N`).
- Cliquez deux fois sur la poignée de redimensionnement en bas à gauche ou en bas à droite d'un widget pour qu'il occupe instantanément tout l'espace vide adjacent.
- Cliquez sur un espace vide et faites glisser votre curseur pour utiliser l'outil de lasso.
- Si plusieurs widgets sont sélectionnés, un menu d'action s'affiche. Il vous permet d'effectuer des actions groupées.
- Appuyez sur les touches `Cmd + G` ou `Ctrl + G` pour regrouper les widgets sélectionnés.
- Utilisez le menu des réglages au niveau de l'en-tête du dashboard pour développer ou réduire tous les groupes d'un dashboard.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/timeboards
[2]: /fr/dashboards/timeboards/#search
[3]: /fr/dashboards/timeboards/#graph-menu