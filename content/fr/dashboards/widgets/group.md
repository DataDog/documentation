---
title: Widget Groupe
description: Regroupez vos widgets dans un timeboard.
aliases:
  - /fr/graphing/widgets/group/
further_reading:
  - link: /dashboards/timeboards/
    tag: Documentation
    text: Timeboards
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
Le widget Groupe vous permet de regrouper des graphiques semblables sur votre [timeboard][1]. Chaque groupe a un en-tête personnalisé, peut contenir entre un et de nombreux graphiques, et peut être réduit :

{{< img src="dashboards/widgets/group/group.mp4" alt="Widget Groupe" video="true" >}}

## Configuration

Choisissez un nom pour votre groupe en utilisant l'icône en forme d'engrenage dans le coin supérieur droit de votre groupe.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][2] pour en savoir plus.

Le [schéma JSON][3] utilisé pour le widget Groupe est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/timeboard/
[2]: /fr/api/v1/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/