---
title: Widget Graphique des alertes
kind: documentation
description: Créez un graphique illustrant l'état actuel de tous les monitors définis sur votre système.
aliases:
  - /fr/graphing/widgets/alert_graph/
further_reading:
  - link: /dashboards/screenboards/
    tag: Documentation
    text: Screenboard
  - link: /dashboards/timeboards/
    tag: Documentation
    text: Timeboards
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
Les graphiques d'alertes sont des graphiques de séries temporelles affichant l'état actuel de la plupart des monitors définis sur votre système :

{{< img src="dashboards/widgets/alert_graph/alert_graph.png" alt="Graphique d'alerte" >}}

Ce widget fonctionne avec les monitors de métrique, d'anomalie, de singularité, de prévision, d'APM et d'intégration.

## Configuration

{{< img src="dashboards/widgets/alert_graph/alert_graph_setup.png" alt="Configuration du graphique d'alerte" style="width:80%;">}}

### Configuration

1. Sélectionnez un monitor existant à représenter graphiquement.
2. Sélectionnez un intervalle.
3. Sélectionnez votre visualisation :
    * Série temporelle
    * Top list

### Options

#### Préférences d'affichage

{{< img src="dashboards/widgets/options/display_preferences.png" alt="Préférences d'affichage" style="width:80%;">}}

##### Intervalle global

Choisissez si votre widget doit afficher un intervalle personnalisé ou l'intervalle global du screenboard (disponible sur les screenboards uniquement).

##### Légende

Utilisez *Show legend on graph* pour activer/désactiver l'affichage de la légende sur votre widget. Vous pouvez également sélectionner le nombre d'entrées à afficher si vous le souhaitez.

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="dashboards/widgets/options/title.png" alt="Titre du widget" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][1] pour en savoir plus.

Le [schéma JSON][2] utilisé pour le widget Graphique des alertes est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/v1/dashboards/
[2]: /fr/dashboards/graphing_json/widget_json/