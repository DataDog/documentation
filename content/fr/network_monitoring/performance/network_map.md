---
aliases:
- /fr/network_performance_monitoring/network_map/
description: Mappez vos données réseau pour l'ensemble de vos tags.
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: Blog
  text: Network Performance Monitoring
- link: https://www.datadoghq.com/blog/datadog-npm-search-map-updates/
  tag: Blog
  text: Simplifier les enquêtes réseau par le biais d'une fonctionnalité de recherche
    et d'une carte améliorées
- link: /network_monitoring/devices
  tag: Documentation
  text: Network Device Monitoring
- link: /network_monitoring/performance/setup
  tag: Documentation
  text: Recueillir vos données réseau avec l'Agent Datadog
title: Network Map
---

## Présentation

La [Network Map][1] vous offre une vue topologique de votre réseau pour vous aider à visualiser les partitions, les dépendances et les goulots d'étranglement sur votre réseau. Cette page consolide toutes les données sur votre réseau afin de générer une carte directionnelle unique, qui vous aidera à identifier et isoler les zones problématiques.

{{< img src="network_performance_monitoring/network_map/network_map_3.png" alt="map_réseau" >}}

## Implémentation

La Network Map permet de visualiser les données recueillies automatiquement par l'Agent Datadog. Une fois installée, aucune étape supplémentaire n'est nécessaire.

## Utilisation

Sélectionnez lʼonglet **Map** pour configurer votre Network Map :

{{< img src="network_performance_monitoring/network_map/network_map_search.png" alt="Barre de recherche de la page de la Network map" >}}

1. Choisissez le tag que vos **nœuds** doivent représenter à l'aide du premier sélecteur en haut de la page. Les tags disponibles sont les mêmes que ceux qui figurent sur la page Réseau.

    {{< img src="network_performance_monitoring/network_map/network_map_search_additional_filter.png" alt="Barre de recherche de la page de la Network map" >}}

    - S'il y a trop de nœuds, un deuxième tag est automatiquement ajouté au groupement. Vous pouvez modifier le tag dans le menu déroulant **By**. Consultez la section [Clustering](#clusters-de-map) pour plus d'informations.
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
      {{< img src="network_performance_monitoring/network_map/filtering_npm_map_search.mp4" alt="Filtrage de la Network Map avec une recherche" video="true" >}}

    - **Affichez le trafic non résolu**.
    - Masquez le trafic réseau en dehors d'une plage de centiles spécifique de la métrique réseau active.
        {{< img src="network_performance_monitoring/network_map/filtering_network_map.mp4" alt="Filtrage des flux de la Network Map" video="true" width="50%" >}}

## Inspection

Passez le curseur sur un nœud pour le mettre en évidence et afficher une vue animée du sens de circulation du trafic réseau envoyé et reçu :

{{< img src="network_performance_monitoring/network_map/network_map_highlight.mp4" alt="Network Map" video="true" width="70%" >}}

Cliquez sur un nœud et sélectionnez _Inspect_ dans le menu pour élargir son contexte au sein du réseau :

{{< img src="network_performance_monitoring/network_map/network_entity_zoom.mp4" alt="Zoom sur une entité réseau" video="true" width="70%">}}

## Clusters de map

Pour les réseaux complexes, l'éditeur de requêtes de la map comprend des champs de regroupement supplémentaires. Cela vous permet dʼafficher simultanément sur la map des ensembles de données qui auraient autrement trop de nœuds. L'utilisation de champs de regroupement supplémentaires améliore également les performances des requêtes à forte cardinalité.

{{< img src="network_performance_monitoring/network_map/network_map_search_additional_filter.png" alt="Barre de recherche de la page de la Network map" >}}

{{< img src="network_performance_monitoring/network_map/network_map_3.png" alt="map_réseau" >}}

Le clustering ajoute une dimension supplémentaire au regroupement des nœuds dans la map. Les maps de grande taille sont automatiquement mises en cluster afin d'améliorer leur temps de chargement et leur lisibilité. Pour visualiser les nœuds d'un cluster, cliquez sur le cluster pour le développer. Pour minimiser le cluster, cliquez sur la zone grise entourant les nœuds.

Un cadre rouge autour d'un cluster indique qu'au moins un monitor dʼalerte porte un tag qui correspond au tag utilisé pour regrouper les nœuds. Par exemple, si la map est regroupée par service, la map recherche des monitors dotés du tag `service:<nodeName>`. Si le monitor est en état d'alerte, la map souligne en rouge tous les clusters contenant `<nodeName>`.

{{< img src="network_performance_monitoring/network_map/expanded_network_cluster.png" alt="Vue développée de la map de cluster" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/map