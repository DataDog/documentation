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

La visualisation de nuage de points vous permet de représenter deux métriques dans un certain contexte avec leur agrégation respective :

{{< img src="dashboards/widgets/scatterplot/scatterplot.png" alt="Nuage de points" >}}

## Configuration

### Configuration

1. Sélectionnez une métrique et une agrégation pour les axes X et Y.
1. Définissez le contexte pour chaque point du nuage de points, tel que `host`, `service`, `app` ou `region`.
1. Facultatif : activez un tag de couleur.
1. Facultatif : définissez les commandes des axes des abscisses et des ordonnées.
1. Choisissez si votre widget doit utiliser un intervalle personnalisé ou l'intervalle global du dashboard.
1. Attribuez un titre à votre graphique ou laissez le champ vide pour utiliser le titre suggéré.

### Options

#### Liens de contexte

Les [liens de contexte][1] sont activés par défaut, mais vous pouvez les désactiver si vous le souhaitez. Ils relient les widgets du dashboard à d'autres pages dans Datadog ou à des applications tierces.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][2] pour en savoir plus.

Le [schéma JSON][3] utilisé pour le widget Nuage de points est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/guide/context-links/
[2]: /fr/api/v1/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/