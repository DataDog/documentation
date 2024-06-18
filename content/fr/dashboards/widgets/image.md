---
aliases:
- /fr/graphing/widgets/image/
description: Ajoutez une image ou un gif à vos dashboards Datadog.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
title: Widget Image
---

Le widget Image vous permet d'intégrer une image à votre dashboard. Une image désigne un fichier PNG, JPG ou GIF animé accessible depuis une URL :

{{< img src="dashboards/widgets/image/image.mp4" alt="Image" video="true" style="width:80%;" >}}

## Configuration

{{< img src="dashboards/widgets/image/image_setup.png" alt="Configuration du widget Image" style="width:80%;">}}

1. Saisissez l'URL de votre image.
2. Choisissez une option d'affichage :
    * Zoom image to cover whole title
    * Fit image on tile
    * Center image on tile

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][1] pour en savoir plus.

Le [schéma JSON][2] utilisé pour le widget Image est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/v1/dashboards/
[2]: /fr/dashboards/graphing_json/widget_json/