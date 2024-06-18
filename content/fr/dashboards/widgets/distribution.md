---
aliases:
- /fr/graphing/widgets/distribution/
description: Représentez graphiquement la distribution de métriques agrégées en fonction
  d'un ou de plusieurs tags.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
title: Widget Distribution
---

Le widget Distribution affiche des données agrégées en fonction d'un ou de plusieurs tags, tels que des *hosts*. Contrairement à la [carte thermique][1], l'axe des abscisses d'un graphique de distribution représente une quantité plutôt qu'une durée.

Cette visualisation affiche une seule requête. Les requêtes supplémentaires sont ignorées.

**Remarque** : la détection des singularités n'est pas possible avec cette visualisation.

{{< img src="dashboards/widgets/distribution/distribution.png" alt="Graphique de distribution">}}

## Configuration

{{< img src="dashboards/widgets/distribution/distribution_setup.png" alt="Vue éditeur du graphique de distribution" style="width:100%;">}}

### Configuration

Configurez votre requête comme d'habitude. Les visualisations de distribution prennent en charge les métriques, les live processes, la latence des requêtes APM, les événements de log et les événements RUM. **Remarque** : ce type de visualisation sert uniquement lorsque les données sont agrégées en fonction de clés de tag, par exemple pour chaque `host`.
Utilisez les commandes `avg`/`max`/`min`/`sum by`/etc. pour visualiser vos données en fonction des tags associés.

### Options

#### Préférences d'affichage

{{< img src="dashboards/widgets/options/display_preferences.png" alt="Préférences d'affichage" style="width:80%;">}}

##### Intervalle global

Choisissez si votre widget doit afficher un intervalle personnalisé ou l'intervalle global du screenboard (disponible sur les screenboards uniquement).

#### Marqueurs

Avec les distributions de requêtes de l'APM, vous pouvez ajouter des marqueurs de centile sur l'axe des abscisses.

{{< img src="dashboards/widgets/options/distribution_marker_controls.jpg" alt="Préférences des commandes des marqueurs" style="width:80%;">}}

#### Commandes des axes des abscisses et des ordonnées

Les commandes des axes sont disponibles dans l'interface ainsi que dans l'éditeur JSON.

Elles vous permettent d'accomplir les actions suivantes :

* Définir l'axe des abscisses et l'axe des ordonnées sur des intervalles spécifiques
* Modifier automatiquement les limites de l'axe des abscisses en fonction d'un seuil basé sur un pourcentage ou sur une valeur absolue ; pour supprimer les singularités, ce seuil peut être appliqué aux deux extrémités du graphique (limite inférieure et limite supérieure), ou à une seule d'entre elles
* Passer d'une échelle linéaire à une échelle logarithmique pour l'axe des ordonnées, et inversement

{{< img src="dashboards/widgets/options/distribution_axis_controls.jpg" alt="Préférences des commandes des axes de distribution" style="width:80%;">}}

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="dashboards/widgets/options/title.png" alt="Titre du widget" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## Plein écran

Outre les [options standard d'affichage en plein écran][2], vous pouvez utiliser les commandes de l'axe des abscisses pour zoomer sur les données d'un certain centile.

{{< img src="dashboards/widgets/distribution/distribution_fullscreen.png" alt="Graphique de distribution en plein écran" style="width:80%;">}}


## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][3] pour en savoir plus.

Le [schéma JSON][4] utilisé pour le widget Distribution est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/widgets/heat_map/
[2]: /fr/dashboards/widgets/#full-screen
[3]: /fr/api/v1/dashboards/
[4]: /fr/dashboards/graphing_json/widget_json/