---
aliases:
- /fr/graphing/widgets/group/
description: Regroupez vos widgets dans un widget de dashboard.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
kind: documentation
title: Widget Groupe
widget_type: groupe
---

## Présentation
<div class="alert alert-info">Les widgets screenboard ne peuvent pas être placés dans des groupes. </a></div>

Le widget Groupe vous permet de regrouper des graphiques semblables sur votre dashboard. Chaque groupe a un en-tête personnalisé, peut contenir entre un et de nombreux graphiques, et peut être réduit. Utilisez des groupes pour organiser les widgets sur votre dashboard.

## Configuration

1. Ajouter plusieurs widgets à votre dashboard.
2. Sélectionnez plusieurs widgets à l'aide de la fonction cliquer-glisser ou appuyez sur la touche Maj et cliquez.
3. Cliquez sur l'option **Group**.
  {{< img src="dashboards/widgets/group/widget-group-button.png" alt="Option de groupe qui sʼaffiche après avoir sélectionné plusieurs widgets" style="width:100%;" >}}
4. Cliquez sur l'icône en forme de crayon en haut à droite de votre groupe pour choisir un nom et appliquer un style à votre groupe.

## API
<div class="alert alert-info">Les widgets screenboard ne peuvent pas être placés dans des groupes. </a></div>

Ce widget peut être utilisé avec l'**[API Dashboards][2]**. Le tableau ci-dessous définit le [schéma JSON du widget][3] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/#timeboards
[2]: /fr/api/latest/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/