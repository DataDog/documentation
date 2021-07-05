---
title: Widget Chronologie des événements
kind: documentation
description: Affichez votre flux d'événements sous forme de chronologie dans un widget.
aliases:
  - /fr/graphing/widgets/event_timeline/
further_reading:
  - link: /dashboards/screenboards/
    tag: Documentation
    text: Screenboard
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
La chronologie des événements est une version widget de la chronologie qui apparaît en haut de la [vue Chronologie des événements[1] :

{{< img src="dashboards/widgets/event_timeline/event_timeline.png" alt="Exemple de chronologie des événements" >}}

## Configuration

{{< img src="dashboards/widgets/event_timeline/event_timeline_setup.png" alt="Exemple de chronologie des événements" style="width:80%;">}}

### Configuration

1. Saisissez une [requête de recherche][1] pour filtrer le flux d'événements.
2. Choisissez si votre widget doit afficher un intervalle personnalisé ou l'intervalle global du screenboard (disponible sur les screenboards uniquement).

### Options

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="dashboards/widgets/options/title.png" alt="Titre du widget" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][2] pour en savoir plus.

Le [schéma JSON][3] utilisé pour le widget Chronologie des événements est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/events/
[2]: /fr/api/v1/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/