---
title: Widget Notes et liens
kind: documentation
description: Affichez du texte dans vos screenboards.
aliases:
  - /fr/graphing/widgets/note/
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
Le widget Notes et liens fonctionne comme le [widget Texte libre][1], mais offre davantage d'options de mise en forme.

## Configuration

{{< img src="dashboards/widgets/note/using_link_note_widget.mp4" alt="Configuration du widget Notes et liens" video="true" style="width:80%;" >}}

1. Saisissez le texte que vous souhaitez afficher. Notez que le format Markdown est pris en charge.
2. Choisissez la taille du texte et la couleur d'arrière-plan de la note.
3. Sélectionnez la position du pointeur.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][2] pour en savoir plus.

Le [schéma JSON][3] utilisé pour le widget Notes et liens est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/widgets/free_text/
[2]: /fr/api/v1/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/