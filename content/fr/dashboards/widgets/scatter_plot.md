---
title: Widget Nuage de points
kind: documentation
description: Représenter deux métriques dans un certain contexte avec leur agrégation respective
widget_type: scatterplot
aliases:
  - /fr/graphing/widgets/scatter_plot/
further_reading:
  - link: /dashboards/timeboards/
    tag: Documentation
    text: Timeboards
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
La visualisation de nuage de points vous permet de représenter deux métriques dans un certain contexte avec leur agrégation respective :

{{< img src="dashboards/widgets/scatterplot/scatterplot.png" alt="Nuage de points" >}}

## Configuration

{{< img src="dashboards/widgets/scatterplot/scatterplot_setup.png" alt="Configuration d'un nuage de points" style="width:80%;">}}

### Configuration

1. Sélectionnez une métrique et une agrégation pour les axes X et Y.
2. Définissez le contexte pour chaque point du nuage de points, tel que `host`, `service`, `app`, `region`, etc.
3. Facultatif : activez un tag de couleur.
4. Facultatif : définissez les commandes des axes des abscisses et des ordonnées.

## Options

#### Intervalle global

Choisissez si votre widget doit afficher un intervalle personnalisé ou l'intervalle global du screenboard (disponible sur les screenboards uniquement).

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="dashboards/widgets/options/title.png" alt="Titre du widget" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][1] pour en savoir plus.

Le [schéma JSON][2] utilisé pour le widget Nuage de points est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/v1/dashboards/
[2]: /fr/dashboards/graphing_json/widget_json/