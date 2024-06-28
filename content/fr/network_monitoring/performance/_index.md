---
algolia:
  tags:
  - npm
  - network performance monitoring
aliases:
- /fr/monitors/network_flow_monitors/
- /fr/graphing/infrastructure/network_performance_monitor/
- /fr/network_performance_monitoring/
description: Explorez les métriques pour la communication point à point sur votre
  infrastructure.
further_reading:
- link: https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/
  tag: Blog
  text: Surveiller une architecture cloud et des dépendances d'application avec la
    solution NPM Datadog
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: Blog
  text: Network Performance Monitoring
- link: https://www.datadoghq.com/blog/npm-windows-support/
  tag: Blog
  text: Surveiller des hosts Windows avec la solution Network Performance Monitoring
- link: https://www.datadoghq.com/blog/cloud-service-autodetection-datadog/
  tag: Blog
  text: Surveiller la santé d'endpoints cloud avec la détection automatique des services
    cloud
- link: https://www.datadoghq.com/blog/npm-best-practices/
  tag: Blog
  text: Conseils à suivre pour prendre en main la solution NPM Datadog
- link: https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/
  tag: Blog
  text: Nouvelle prise en charge de la mise en réseau Consul par la solution NPM Datadog
- link: https://www.datadoghq.com/blog/npm-story-centric-ux/
  tag: Blog
  text: Débuter vos enquêtes réseau grâce à l'interface NPM et à ses fonctionnalités
    de mise en récit des données
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: Blog
  text: Surveiller les logs de DNS pour analyser le réseau et la sécurité
title: Network Performance Monitoring
---

## Présentation

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/670228207/rendition/1080p/file.mp4?loc=external&signature=42d4a7322017fffa6d5cc2e49ddbb7cfc4c6bbbbf207d13a5c9830630bda4ece" poster="/images/poster/npm.png" >}}

La solution Network Performance Monitoring (NPM) de Datadog est conçue pour vous offrir une visibilité optimale sur votre trafic réseau, y compris entre les services, les conteneurs, les zones de disponibilité et tout autre tag dans Datadog. Les données de connexion propres à une adresse IP, un port et un PID sont agrégées sous forme de dépendances application-couche entre les principaux endpoints client et serveur. Ces données peuvent ensuite être analysées et visualisées grâce à une [page réseau][1] et à une [Network Map][2] personnalisables. Utilisez les données de flux avec des métriques clés relatives au trafic réseau et au serveur DNS pour :

* Identifier les dépendances de service inattendues ou latentes
* Réduire les coûts liés aux communications inter-région ou multi-cloud
* Identifier les pannes associées à une région d'un fournisseur de solutions cloud ou des outils tiers
* Dépanner les problèmes de serveur DNS côté client et côté serveur

Grâce à la solution NPM, qui est compatible avec les systèmes d'exploitation Linux et [Windows][3], vous pouvez surveiller facilement des réseaux complexes. En outre, elle permet d'orchestrer les environnements conteneurisés et de les [instrumenter avec le maillage de service Istio][4].

En outre, le [chemin réseau][5], une fonctionnalité de NPM, est disponible en version bêta privée, ce qui vous permet de voir le trafic hop-by-hop dans votre réseau.

{{< whatsnext desc="Cette section aborde les sujets suivants :">}}
    {{< nextlink href="network_monitoring/performance/setup" >}}<u>Configuration</u> : configurez l'Agent pour recueillir des données réseau.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/performance/network_analytics" >}}<u>Analyse réseau</u> : représentez graphiquement vos données réseau entre chaque client et serveur disponibles.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/performance/network_map" >}}<u>Network Map</u> : mappez vos données réseau entre vos tags.{{< /nextlink >}}
    {{< nextlink href="monitors/types/network_performance/" >}}<u>Monitors recommandés</u> : configurez des monitors NPM recommandés.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network
[2]: https://app.datadoghq.com/network/map
[3]: https://www.datadoghq.com/blog/npm-windows-support/
[4]: https://www.datadoghq.com/blog/monitor-istio-with-npm/
[5]: /fr/network_monitoring/network_path/