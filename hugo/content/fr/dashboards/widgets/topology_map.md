---
aliases:
- /fr/dashboards/widgets/service_map
description: Affiche une carte de service avec tous les services qui l'appellent,
  et tous les services appelés.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
- link: /tracing/services/services_map/
  tag: Documentation
  text: Service Map
title: Widget Topology Map
widget_type: topology_map
---

Le widget Topology Map vous permet de visualiser les sources de données et leurs relations pour mieux comprendre le flux des données dans votre architecture. 

## Configuration

### Configuration

1. Choisissez les données à représenter :
    * Service Map : le nœud situé au centre du widget représente le service mappé. Les services qui appellent ce dernier sont présentés avec des flèches pointant du service à l'origine de l'appel vers le service mappé. Pour en savoir plus sur la Service Map, reportez-vous à la [fonctionnalité Service Map d'APM][1].

2. Saisissez un titre pour votre graphique.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][2] pour en savoir plus.

Le [schéma JSON][3] utilisé pour le widget Service Map est le suivant :

{{< dashboards-widgets-api >}}



{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/services/services_map/
[2]: /fr/api/latest/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/