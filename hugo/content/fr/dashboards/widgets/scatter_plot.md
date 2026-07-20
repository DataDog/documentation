---
aliases:
- /fr/graphing/widgets/scatter_plot/
description: Représenter deux métriques dans un certain contexte avec leur agrégation
  respective
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
title: Widget Nuage de points
widget_type: scatterplot
---

Un nuage de points identifie une relation potentielle entre les changements observés dans deux ensembles de variables différents. Il fournit un moyen visuel et statistique de tester la force de la relation entre deux variables. La visualisation en nuage de points vous permet de représenter graphiquement un périmètre choisi selon deux métriques différentes avec leurs agrégations respectives.

{{< img src="dashboards/widgets/scatterplot/scatterplot.png" alt="Nuage de points" >}}

## Configuration

### Configuration

1. Sélectionnez une métrique ou un autre jeu de données, ainsi qu'une agrégation pour les axes X et Y.
1. Définissez le contexte pour chaque point du nuage de points, par exemple `host`, `service`, `app` ou `region`.
1. Facultatif : activez un tag de couleur.
1. Facultatif : définissez les commandes des axes des abscisses et des ordonnées.
1. Choisissez si votre widget a un délai personnalisé ou le délai global du tableau de bord.
1. Attribuez un titre à votre graphique ou laissez le champ vide pour utiliser le titre suggéré.

### Options

#### Liens de contexte

Les [liens de contexte][5] sont activés par défaut, mais vous pouvez les désactiver si vous le souhaitez. Ils relient les widgets de dashboard à d'autres pages dans Datadog ou sur des applications externes.

#### Intervalle global

Choisissez si votre widget a un délai personnalisé ou le délai global du tableau de bord.

## API

Ce widget peut être utilisé avec l'**[API Dashboards][2]**. Le tableau ci-dessous définit le [schéma JSON du widget][3] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/guide/context-links/
[2]: /fr/api/latest/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/