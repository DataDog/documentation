---
aliases:
- /fr/graphing/widgets/alert_graph/
description: Créez un graphique illustrant l'état actuel de tous les monitors définis
  sur votre système.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
title: Widget Graphique des alertes
widget_type: alert_graph
---

Les graphiques d'alertes sont des graphiques de séries temporelles affichant l'état actuel de la plupart des monitors définis sur votre système :

{{< img src="dashboards/widgets/alert_graph/alert_graph.png" alt="Graphique d'alerte" >}}

Ce widget fonctionne avec les monitors d'alerte basés sur une requête, tels que les monitors de métrique, d'anomalie, de singularité, de prévision, de métriques d'APM et d'intégration.

## Configuration

### Configuration

1. Sélectionnez un monitor existant à représenter graphiquement.
2. Sélectionnez un intervalle.
3. Sélectionnez votre visualisation :
    * Série temporelle
    * Top list

## API

Ce widget peut être utilisé avec l'**[API Dashboards][1]**. Le tableau ci-dessous définit le [schéma JSON du widget][2] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/latest/dashboards/
[2]: /fr/dashboards/graphing_json/widget_json/