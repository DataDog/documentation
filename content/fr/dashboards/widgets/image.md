---
aliases:
- /fr/graphing/widgets/image/
description: Ajoutez une image ou un gif à vos dashboards Datadog.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
title: Widget Image
widget_type: image
---

Le widget Image vous permet d'intégrer une image dans votre dashboard. Une image peut être importée dans Datadog ou hébergée à un emplacement accessible par URL. Les formats de fichiers PNG, JPG et GIF sont pris en charge.

{{< img src="dashboards/widgets/image/image.mp4" alt="Image" video="true" style="width:80%;" >}}

## Configuration

{{< img src="dashboards/widgets/image/image_setup2.png" alt="Configuration de l'image" style="width:80%;">}}

1. Importez votre image ou saisissez l'URL de votre image.
2. Sélectionnez un modèle prédéfini ou personnalisez les options d'affichage.

## API

Ce widget peut être utilisé avec l'**[API Dashboards][1]**. Le tableau ci-dessous définit le [schéma JSON du widget][2] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/latest/dashboards/
[2]: /fr/dashboards/graphing_json/widget_json/