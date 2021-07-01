---
title: Widget Texte libre
kind: documentation
description: Affichez du texte dans vos screenboards.
aliases:
  - /fr/graphing/widgets/free_text/
further_reading:
  - link: /dashboards/screenboards/
    tag: Documentation
    text: Screenboard
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
Le widget Texte libre vous permet d'ajouter des titres à votre [screenboard][1].

Cela sert généralement à indiquer la fonction générale du dashboard.

{{< img src="dashboards/widgets/free_text/free_text.png" alt="Texte libre" >}}

## Configuration

{{< img src="dashboards/widgets/free_text/free_text_setup.png" alt="Saisie du texte libre" style="width:80%;">}}

### Configuration

1. Entrez le texte à afficher.
2. Choisissez le formatage de votre texte.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][2] pour en savoir plus.

Le [schéma JSON][3] utilisé pour le widget Texte libre est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/screenboard/
[2]: /fr/api/v1/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/