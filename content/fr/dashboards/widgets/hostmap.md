---
aliases:
- /fr/graphing/widgets/hostmap/
description: Affichez la hostmap Datadog dans vos dashboards.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
title: Widget Hostmap
widget_type: hostmap
---

Le widget Hostmap représente graphiquement n'importe quelle métrique pour l'ensemble de vos hosts, en proposant le même type de visualisation que la principale page [Host Map][1] :

{{< img src="dashboards/widgets/hostmap/hostmap.png" alt="Hostmap"  >}}

## Configuration

{{< img src="dashboards/widgets/hostmap/hostmap_setup.png" alt="Configuration de la hostmap" >}}

### Configuration

La configuration du widget Hostmap est similaire à celle de la page principale de la [hostmap][1] :

1. **Type** : choisissez d'afficher des `hosts` ou des `containers`.
2. **Filter by** : choisissez les hosts ou les conteneurs à afficher.
3. **Group by** : agrégez vos hosts ou conteneurs selon un ou plusieurs tags.
4. **Fill by** : choisissez une métrique afin de remplir votre hostmap ou votre container map.
5. **Size by** (facultatif) : choisissez une métrique afin de dimensionner les éléments de votre hostmap ou de votre container map.
6. **Palette** (facultatif) : choisissez une palette de couleurs.
7. **Values** (facultatif) : définissez les valeurs minimale et maximale de la palette de couleurs.

**Remarque** : il est impossible d'effectuer une recherche en texte libre dans le widget Hostmap.

### Options

#### Liens de contexte

Les [liens de contexte][2] sont activés par défaut, mais vous pouvez les désactiver si vous le souhaitez. Ils relient les widgets du dashboard à d'autres pages (dans Datadog ou sur des sites externes).

## API

Ce widget peut être utilisé avec l'**[API Dashboards][3]**. Le tableau ci-dessous définit le [schéma JSON du widget][9] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/infrastructure/hostmap/
[2]: /fr/dashboards/guide/context-links/
[3]: /fr/api/latest/dashboards/
[4]: /fr/dashboards/graphing_json/widget_json/