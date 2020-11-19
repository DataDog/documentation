---
title: Surveillance des performances réseau
kind: documentation
description: Explorez les métriques pour la communication point à point sur votre infrastructure.
aliases:
  - /fr/monitors/network_flow_monitors/
  - /fr/graphing/infrastructure/network_performance_monitor/
further_reading:
  - link: 'https://www.datadoghq.com/blog/network-performance-monitoring'
    tag: Blog
    text: Surveillance de performance réseau
  - link: /integrations/snmp/
    tag: Documentation
    text: Intégration SNMP
---
## Présentation

{{< img src="network_performance_monitoring/network_page/npm_cover.png" alt="Page principale" >}}

La surveillance des performance réseau (NPM) de Datadog est conçue pour vous offrir une visibilité optimale sur votre trafic réseau, y compris les services, les conteneurs, les zones de disponibilité et tout autre tag dans Datadog. Les données de connexion propres à une adresse IP, un port et un PID sont agrégées sous forme de dépendances application-couche entre les principaux endpoints _source_ et _destination_. Ces données peuvent ensuite être analysées et visualisées grâce à une [page réseau][1] et à une [carte réseau][2] personnalisables. Utilisez les données de flux avec des métriques de trafic réseau et de serveur DNS clés pour :

* Identifier les dépendances de service inattendues ou latentes
* Réduire les coûts liés aux communications inter-région ou multi-cloud
* Identifier les pannes associées à une région d'un fournisseur de solutions cloud ou des outils tiers
* Dépanner les problèmes de serveur DNS côté client et côté serveur

{{< whatsnext desc="Cette section aborde les sujets suivants :">}}
    {{< nextlink href="network_performance_monitoring/installation" >}}<u>Installation</u> : Configurer l'Agent pour recueillir des données réseau.{{< /nextlink >}}
    {{< nextlink href="network_performance_monitoring/network_page" >}}<u>Page réseau</u> : Représenter graphiquement vos données réseau entre chaque source et destination disponibles.{{< /nextlink >}}
    {{< nextlink href="network_performance_monitoring/network_map" >}}<u>Carte réseau</u> : Cartographier vos données réseau entre vos tags.{{< /nextlink >}}
    {{< nextlink href="network_performance_monitoring/dns_monitoring" >}}<u>Surveillance DNS</u> : Diagnostiquer et débuguer les problèmes de serveur DNS.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network
[2]: https://app.datadoghq.com/network/map