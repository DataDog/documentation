---
title: Map Réseau
kind: documentation
description: Cartographier vos données réseau sur l'ensemble de vos tags.
further_reading:
- link: "https://www.datadoghq.com/blog/network-performance-monitoring"
  tag: Blog
  text: Surveillance des performances réseau
- link: "https://www.datadoghq.com/blog/monitoring-101-alerting/"
  tag: Blog
  text: "Monitoring 101 : définir des alertes pertinentes"
- link: /network_performance_monitoring/installation
  tag: Documentation
  text: Recueillir vos données réseau avec l'Agent Datadog
---

<div class="alert alert-warning">
Cette fonctionnalité est actuellement en version bêta : pour y accéder, remplissez le <a href="https://app.datadoghq.com/network/2019signup">formulaire de demande d'accès à l'outil de surveillance des performances réseau de Datadog</a>.
</div>

## Présentation

La [map réseau][1] vous offre une vue topologique de votre réseau pour vous aider à visualiser les partitions, les dépendances et les goulots d'étranglement sur votre réseau. Cette page consolide toutes les données sur votre réseau afin de générer une carte directionnelle unique, qui vous aidera à identifier et isoler les zones à problèmes.

{{< img src="network_performance_monitoring/network_map/network_map.png" alt="map_réseau" responsive="true">}}

## Implémentation

La map réseau permet de visualiser les données recueillies automatiquement par l'Agent Datadog. Une fois installée, aucune étape supplémentaire n'est nécessaire.

## Configuration

{{< img src="network_performance_monitoring/network_map/configure_network_map.png" alt="configurer_map_réseau" responsive="true" style="width:70%;">}}

Utilisez l'en-tête de la page pour configurer votre map réseau :

1. Choisissez le tag que vos **nœuds** doivent représenter à l'aide du premier sélecteur en haut de la page. Les tags disponibles sont les mêmes que ceux qui figurent sur la page Réseau.
2. Sélectionnez la métrique que vos **arêtes** doivent représenter :
    * Débit envoyé
    * Débit reçu
    * Retransmissions
3. Filtrez les connexions que vous souhaitez afficher. Vous avez la possibilité de :
    * **Afficher les flux non résolus**.
    * Masquer les flux réseau qui se trouvent en dehors d'une certaine plage de centiles pour la métrique réseau active.
    * Filtrer vos tags en fonction d'une correspondance de chaîne approximative.

## Inspection

Passez le curseur sur un nœud pour le mettre en évidence et afficher une vue animée du sens de circulation du trafic réseau envoyé et reçu :

{{< img src="network_performance_monitoring/network_map/network_map_highlight.mp4" alt="Service Map" video="true" responsive="true" width="70%" >}}

Cliquez sur un nœud et sélectionnez _Inspect_ dans le menu pour élargir son contexte au sein du réseau. Vous trouverez ci-dessous un exemple de nœud inspecté :

{{< img src="network_performance_monitoring/network_map/network_entity_zoom.png" alt="zoom_entité_réseau" responsive="true" style="width:70%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/map
