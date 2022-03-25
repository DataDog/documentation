---
title: Widget Flux de logs
kind: documentation
description: Affichez un flux de logs filtré dans vos dashboards Datadog.
aliases:
  - /fr/graphing/widgets/log_stream/
further_reading:
  - link: /dashboards/screenboards/
    tag: Documentation
    text: Screenboard
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
Affichez un flux de logs correspondant à la requête de votre choix :

{{< img src="dashboards/widgets/log_stream/log_stream.png" alt="Flux de logs" >}}

## Configuration

### Configuration

1. Saisissez une [requête de recherche][1] pour filtrer le flux de logs.
2. Modifiez les colonnes de façon à afficher les valeurs de vos [facettes][2] et [mesures][2].
3. Attribuez un titre à votre graphique ou laissez le champ vide pour utiliser le titre suggéré.

{{< img src="dashboards/widgets/log_stream/log_stream_setup.png" alt="Configuration du flux de logs" style="width:90%;">}}

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la section [Dashboards][3] pour en savoir plus.

Le [schéma JSON][4] utilisé pour le widget Flux de logs est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/search/
[2]: /fr/logs/explorer/facets/
[3]: /fr/api/v1/dashboards/
[4]: /fr/dashboards/graphing_json/widget_json/