---
title: Map Réseau
kind: documentation
description: Cartographier vos données réseau sur l'ensemble de vos tags.
aliases:
  - /fr/network_performance_monitoring/network_map/
further_reading:
  - link: 'https://www.datadoghq.com/blog/network-performance-monitoring'
    tag: Blog
    text: Network Performance Monitoring
  - link: /network_monitoring/devices
    tag: Documentation
    text: Network Device Monitoring
  - link: /network_monitoring/performance/setup
    tag: Documentation
    text: Recueillir vos données réseau avec l'Agent Datadog
  - link: /dashboards/widgets/network
    tag: Documentation
    text: Widget Réseau
---
## Présentation

La [map réseau][1] vous offre une vue topologique de votre réseau pour vous aider à visualiser les partitions, les dépendances et les goulots d'étranglement sur votre réseau. Cette page consolide toutes les données sur votre réseau afin de générer une carte directionnelle unique, qui vous aidera à identifier et isoler les zones problématiques.

{{< img src="network_performance_monitoring/network_map/network_map_2.png" alt="map_réseau" >}}

## Configuration

La map réseau permet de visualiser les données recueillies automatiquement par l'Agent Datadog. Une fois installée, aucune étape supplémentaire n'est nécessaire.

## Configuration

Utilisez l'en-tête de la page pour configurer votre map réseau :

1. Choisissez le tag que vos **nœuds** doivent représenter à l'aide du premier sélecteur en haut de la page. Les tags disponibles sont les mêmes que ceux qui figurent sur la page Réseau.
2. Sélectionnez la métrique que vos **arêtes** doivent représenter :

    - Throughput sent
    - Throughput received
    - TCP Retransmits
    - TCP Latency
    - TCP Jitter
    - Established Connnections
    - Closed Connections

3. Filtrez les connexions que vous souhaitez afficher. Vous avez la possibilité de :

    - Restreindre le trafic selon un environnement spécifique, un espace de nommage particulier ou tout autre tag de votre choix
    - Filtrer vos tags en fonction d'une correspondance de chaîne approximative
      {{< img src="network_performance_monitoring/network_map/filtering_npm_map_search.mp4" alt="Filtrage de la map réseau avec une recherche" video="true" >}}

    - **Affichez le trafic non résolu**.
    - Masquez le trafic réseau en dehors d'une plage de centiles spécifique de la métrique réseau active.
        {{< img src="network_performance_monitoring/network_map/filtering_network_map.mp4" alt="Filtrage des flux de la map réseau" video="true"  width="50%" >}}

## Inspection

Passez le curseur sur un nœud pour le mettre en évidence et afficher une vue animée du sens de circulation du trafic réseau envoyé et reçu :

{{< img src="network_performance_monitoring/network_map/network_map_highlight.mp4" alt="Map réseau" video="true"  width="70%" >}}

Cliquez sur un nœud et sélectionnez _Inspect_ dans le menu pour élargir son contexte au sein du réseau :

{{< img src="network_performance_monitoring/network_map/network_entity_zoom.mp4" alt="Zoom sur une entité réseau" video="true" width="70%">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/map