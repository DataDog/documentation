---
title: Widget Statut de check
kind: documentation
description: Représentez graphiquement le statut actuel ou le nombre de résultats associés à n'importe quel check réalisé.
aliases:
  - /fr/graphing/widgets/check_status/
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
Le widget Statut de check affiche le statut actuel ou le nombre de résultats associés à n'importe quel check réalisé :

{{< img src="dashboards/widgets/check_status/check_status.png" alt="Widget Statut de check" >}}

## Configuration

{{< img src="dashboards/widgets/check_status/check_status_setup.png" alt="Configuration d'un widget Statut de check" style="width:80%;">}}

### Configuration

1. Sélectionnez un check de service précédemment créé.
2. Sélectionnez un intervalle de transmission parmi les options suivantes :
  * Global Time
  * The past 10 minutes
  * The past 30 minutes
  * The past hour
  * The past 4 hours
  * The past day
3. Sélectionnez votre contexte :
    * **A single check** : sélectionnez cette option si votre widget Statut de check est dédié à un élément en particulier, p. ex. à un `host:<HOSTNAME>`, à un `service:<NOM_SERVICE>`, etc.
    * **A cluster of checks** : sélectionnez cette option si votre widget Statut de check est dédié à un ensemble d'éléments, p. ex. à l'ensemble des `host`s ou des `service`s, etc.

4. Terminez ensuite de définir le contexte de votre widget Statut de check en renseignant le champ **Reported by**.
5. Facultatif : regroupez vos résultats de check en fonction d'une clé de tag personnalisée.

### Options

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="dashboards/widgets/options/title.png" alt="Titre du widget" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][1] pour en savoir plus.

Le [schéma JSON][2] utilisé pour le widget Statut de check est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/v1/dashboards/
[2]: /fr/dashboards/graphing_json/widget_json/