---
title: Widget Valeur d'alerte
kind: documentation
description: Créez un graphique illustrant la valeur actuelle d'une métrique dans n'importe quel monitor défini sur votre système.
aliases:
  - /fr/graphing/widgets/alert_value/
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
Les valeurs d'alerte sont des valeurs de requête qui représentent la valeur actuelle d'une métrique dans n'importe quel monitor défini sur votre système :

{{< img src="dashboards/widgets/alert_value/alert_value.png" alt="Valeur d'alerte" >}}

## Configuration
{{< img src="dashboards/widgets/alert_value/alert_value_setup.png" alt="Configuration de la valeur d'alerte" style="width:80%;">}}

### Configuration

1. Sélectionnez un monitor existant à représenter graphiquement.
2. Sélectionnez le format d'affichage de la valeur :
    * valeur brute
    * 0/1/2/3 décimale(s)
3. Sélectionnez l'unité à afficher :
    * `Automatic`
    * `/s` Par seconde
    * `b` Bits
    * `B` Octets
    * `Custom`

### Options

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="dashboards/widgets/options/title.png" alt="Titre du widget" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][1] pour en savoir plus.

Le [schéma JSON][2] utilisé pour le widget Valeur d'alerte est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/v1/dashboards/
[2]: /fr/dashboards/graphing_json/widget_json/