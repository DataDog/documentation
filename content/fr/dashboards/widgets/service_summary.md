---
title: Widget Résumé de service
kind: documentation
description: Affiche le graphique d'un service précis dans votre screenboard.
widget_type: trace_service
aliases:
  - /fr/graphing/widgets/service_summary/
further_reading:
  - link: /dashboards/screenboards/
    tag: Documentation
    text: Screenboard
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
Le résumé de service affiche le graphique d'un [service][1] précis dans votre screenboard.

{{< img src="dashboards/widgets/service_summary/service_summary.png" alt="résumé de service" >}}

## Configuration

{{< img src="dashboards/widgets/service_summary/service_summary_setup.png" alt="configuration du widget résumé de service" style="width:80%;">}}

### Configuration

1. Sélectionnez un [environnement][2] et un [service][1].
2. Sélectionnez une taille de widget.
3. Sélectionnez les informations à afficher :
    * Hits
    * Erreurs
    * Latence
    * Breakdown
    * Distribution
    * Ressource
4. Choisissez votre préférence d'affichage en sélectionnant un intervalle et le nombre de colonnes à représenter sur vos graphiques.
5. Saisissez un titre pour votre graphique.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][3] pour en savoir plus.

Le [schéma JSON][4] utilisé pour le widget Résumé de service est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/service/
[2]: /fr/tracing/send_traces/
[3]: /fr/api/v1/dashboards/
[4]: /fr/dashboards/graphing_json/widget_json/