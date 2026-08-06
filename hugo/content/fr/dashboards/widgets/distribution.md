---
aliases:
- /fr/graphing/widgets/distribution/
description: Représentez graphiquement la distribution de métriques agrégées en fonction
  d'un ou de plusieurs tags.
further_reading:
- link: /metrics/distributions/
  tag: Documentation
  text: Distributions
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
- link: /dashboards/graphing_json/widget_json/
  tag: Documentation
  text: Schéma JSON des widgets
- link: /dashboards/graphing_json/request_json/
  tag: Documentation
  text: Schéma JSON des requêtes
- link: /dashboards/querying/
  tag: Documentation
  text: Requêtes
title: Widget Distribution
widget_type: distribution
---

Le widget Distribution affiche des données agrégées en fonction d'un ou de plusieurs tags, tels que des *hosts*. Contrairement à la [carte thermique][1], l'axe des abscisses d'un graphique de distribution représente une quantité plutôt qu'une durée.

Cette visualisation affiche une seule requête. Les requêtes supplémentaires sont ignorées.

**Remarque** : la détection des singularités n'est pas possible avec cette visualisation.

{{< img src="/dashboards/widgets/distribution/distribution_fullscreen.png" alt="Graphique de distribution de la moyenne des tas de la JVM par host">}}

## Configuration

### Configuration

1. Choisissez les données à représenter. La visualisation Distribution prend en charge les métriques, les live processes, la latence des requêtes de lʼAPM, les événements de log et les événements du RUM.
**Remarque** : ce type de visualisation est uniquement utile lorsque les données sont agrégées en fonction de clés de tag, par exemple pour chaque `host`.
1. Utilisez les réglages « `avg`/`max`/`min`/`sum by`/ » pour visualiser vos données en fonction des tags associés.
1. Personnalisez votre graphique avec les options disponibles.

### Options

#### Marqueurs de centiles

Avec les distributions de requêtes de l'APM, vous pouvez ajouter des marqueurs de centile sur l'axe des abscisses.

{{< img src="dashboards/widgets/options/distribution_marker_controls.jpg" alt="Préférences des commandes des marqueurs" style="width:80%;">}}

#### Commandes des axes des abscisses et des ordonnées

Les commandes des axes sont disponibles dans l'interface ainsi que dans l'éditeur JSON.

Elles vous permettent d'accomplir les actions suivantes :

* Définir l'axe des abscisses et l'axe des ordonnées sur des intervalles spécifiques
* Modifier automatiquement les limites de l'axe des abscisses en fonction d'un seuil basé sur un pourcentage ou sur une valeur absolue ; pour supprimer les singularités, ce seuil peut être appliqué aux deux extrémités du graphique (limite inférieure et limite supérieure), ou à une seule d'entre elles
* Passer d'une échelle linéaire à une échelle logarithmique pour l'axe des ordonnées, et inversement

{{< img src="dashboards/widgets/options/distribution_axis_controls.jpg" alt="Préférences des commandes des axes de distribution" style="width:80%;">}}

### Plein écran

Outre les [options standard d'affichage en plein écran][2], vous pouvez utiliser les commandes de l'axe des abscisses pour zoomer sur les données d'un certain centile.

## API

Ce widget peut être utilisé avec l'**[API Dashboards][3]**. Le tableau ci-dessous définit le [schéma JSON du widget][9] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/widgets/heatmap/
[2]: /fr/dashboards/widgets/#full-screen
[3]: /fr/api/latest/dashboards/
[4]: /fr/dashboards/graphing_json/widget_json/