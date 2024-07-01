---
title: Widget Évolution
description: Représentez graphiquement l'évolution d'une valeur sur une période donnée.
aliases:
  - /fr/graphing/widgets/change/
further_reading:
  - link: /dashboards/timeboards/
    tag: Documentation
    text: Timeboards
  - link: /dashboards/screenboards/
    tag: Documentation
    text: Screenboard
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
  - link: /dashboards/graphing_json/widget_json/
    tag: Documentation
    text: Schéma JSON des widgets
  - link: /dashboards/graphing_json/request_json/
    tag: Documentation
    text: Schéma JSON des requêtes
---
Le graphique Évolution illustre l'évolution d'une valeur sur une période choisie :

{{< img src="dashboards/widgets/change/change.png" alt="Graphique Évolution" >}}

## Configuration

{{< img src="dashboards/widgets/change/change_setup.png" alt="Configuration d'un graphique Évolution" style="width:80%;">}}

### Configuration

1. Choisissez la métrique à représenter.
2. Choisissez une fonction d'agrégation.
3. Facultatif : choisissez un contexte spécifique pour votre widget.
4. Décomposez votre agrégation en fonction d'une clé de tag, p. ex. `host`, `service`, etc.
5. Choisissez la période de comparaison parmi les options suivantes :
    * an hour before
    * a day before
    * a week before
    * a month before
6. Choisissez si vous souhaitez visualiser l'évolution `relative` ou `absolute` entre les deux périodes.
7. Sélectionnez le critère de tri des résultats parmi :
    * `change`
    * `name`
    * `present value`
    * `past value`
8. Indiquez si une augmentation (`increases`) ou une diminution (`decreases`) est préférable. L'évolution privilégiée est surlignée en vert, et l'autre en rouge.
9. Facultatif : choisissez si la valeur actuelle doit être affichée ou non.

### Options

#### Préférences d'affichage

{{< img src="dashboards/widgets/options/display_preferences.png" alt="Préférences d'affichage" style="width:80%;">}}

##### Intervalle global

Choisissez si votre widget doit afficher un intervalle personnalisé ou l'intervalle global du screenboard (disponible sur les screenboards uniquement).

###### Légende

Utilisez *Show legend on graph* pour activer/désactiver l'affichage de la légende sur votre widget. Vous pouvez également sélectionner le nombre d'entrées à afficher si vous le souhaitez.

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="dashboards/widgets/options/title.png" alt="Titre du widget" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][1] pour en savoir plus.

Le [schéma JSON][2] utilisé pour le widget Groupe est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/v1/dashboards/
[2]: /fr/dashboards/graphing_json/widget_json/