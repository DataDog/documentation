---
title: Widget Flux d'événements
kind: documentation
description: Affichez des événements filtrés à partir du flux d'événements.
aliases:
  - /fr/graphing/widgets/event_stream/
further_reading:
  - link: /dashboards/screenboards/
    tag: Documentation
    text: Screenboard
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
{{< site-region region="us" >}}

Le flux d'événements affiche les événements de la [vue Flux d'événements][1] sous forme de widget.

Remarque : **ce widget n'affiche que les 100 événements les plus récents**.

{{< img src="dashboards/widgets/event_stream/event_stream.png" alt="flux d'événements" >}}

## Configuration

{{< img src="dashboards/widgets/event_stream/event_stream_setup.png" alt="configuration du flux d'événements" style="width:80%;">}}

### Configuration

1. Saisissez une [requête de recherche][1] pour filtrer le flux d'événements.
2. Choisissez si votre widget doit afficher un intervalle personnalisé ou l'intervalle global du screenboard (disponible sur les screenboards uniquement).
3. Utilisez le paramètre de taille pour choisir de n'afficher que le titre des événements ou d'en afficher l'intégralité.

### Options

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="dashboards/widgets/options/title.png" alt="Titre du widget" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][2] pour en savoir plus.

Le [schéma JSON][3] utilisé pour le widget Flux d'événements est le suivant :

[1]: /fr/events/
[2]: /fr/api/v1/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/
[4]: /fr/events/#event-explorer

{{< /site-region >}}

{{< site-region region="eu" >}}

Le flux d'événements affiche les événements de la [vue Flux d'événements][1] sous forme de widget.

Remarque : **ce widget n'affiche que les 100 événements les plus récents**.

{{< img src="dashboards/widgets/event_stream/event_stream.png" alt="flux d'événements" >}}

## Configuration

{{< img src="dashboards/widgets/event_stream/event_stream_setup.png" alt="configuration du flux d'événements" style="width:80%;">}}

### Configuration

1. Saisissez une [requête de recherche][1] pour filtrer le flux d'événements.
2. Choisissez si votre widget doit afficher un intervalle personnalisé ou l'intervalle global du screenboard (disponible sur les screenboards uniquement).
3. Utilisez le paramètre de taille pour choisir de n'afficher que le titre des événements ou d'en afficher l'intégralité.

### Options

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="dashboards/widgets/options/title.png" alt="Titre du widget" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][2] pour en savoir plus.

Le [schéma JSON][3] utilisé pour le widget Flux d'événements est le suivant :

[1]: /fr/events/
[2]: /fr/api/v1/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/
[4]: /fr/events/#event-explorer

{{< /site-region >}}

{{< site-region region="gov" >}}

Le flux d'événements affiche les événements de la [vue Event Explorer][4] sous forme de widget.

## Configuration

### Configuration

1. Saisissez une [requête de recherche][4] pour filtrer le flux d'événements.
2. Choisissez si votre widget doit afficher un intervalle personnalisé ou l'intervalle global du screenboard (disponible sur les screenboards uniquement).
3. Utilisez le paramètre de taille pour choisir de n'afficher que le titre des événements ou d'en afficher l'intégralité.

### Options

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title`.

Définissez sa taille et son alignement si vous le souhaitez.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][2] pour en savoir plus.

Le [schéma JSON][3] utilisé pour le widget Flux d'événements est le suivant :

[1]: /fr/events/
[2]: /fr/api/v1/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/
[4]: /fr/events/#event-explorer

{{< /site-region >}}

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/events/
[2]: /fr/api/v1/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/
[4]: /fr/events/#event-explorer