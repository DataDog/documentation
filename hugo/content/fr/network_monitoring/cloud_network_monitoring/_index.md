---
algolia:
  tags:
  - Cloud Network Monitoring
  - Network Performance Monitoring
  - CNM
  - NPM
aliases:
- /fr/monitors/network_flow_monitors/
- /fr/graphing/infrastructure/network_performance_monitor/
- /fr/network_performance_monitoring/
- /fr/network_monitoring/performance/
description: Explorez les métriques pour la communication point à point sur votre
  infrastructure.
further_reading:
- link: https://www.datadoghq.com/architecture/hybrid-cloud-network-observability/
  tag: Architecture Center
  text: Architecture de référence pour l'observabilité des réseaux hybrides multi-cloud
- link: https://www.datadoghq.com/blog/cnm-network-health
  tag: Blog
  text: Détectez, diagnostiquez et résolvez facilement les problèmes réseau avec CNM
    Network Health
- link: /network_monitoring/cloud_network_monitoring/guide/detecting_application_availability/
  tag: Guide
  text: Détection de la disponibilité des applications à l'aide de Network Insights
- link: https://www.datadoghq.com/blog/npm-windows-support/
  tag: Blog
  text: Surveillez les hôtes Windows avec Cloud Network Monitoring
- link: https://www.datadoghq.com/blog/cloud-service-autodetection-datadog/
  tag: Blog
  text: Surveiller la santé d'endpoints cloud avec la détection automatique des services
    cloud
- link: https://www.datadoghq.com/blog/npm-best-practices/
  tag: Blog
  text: Bonnes pratiques pour bien démarrer avec Datadog CNM
- link: https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/
  tag: Blog
  text: Datadog CNM prend désormais en charge la mise en réseau Consul
- link: https://www.datadoghq.com/blog/npm-story-centric-ux/
  tag: Blog
  text: Démarrage rapide des investigations réseau avec l'UX centrée sur les scénarios
    de CNM
- link: https://www.datadoghq.com/blog/monitor-connection-churn-datadog/
  tag: Blog
  text: Bonnes pratiques pour surveiller et corriger la baisse des connexions
- link: /network_monitoring/cloud_network_monitoring/glossary
  tag: Doc
  text: Termes et concepts de CNM
- link: https://learn.datadoghq.com/courses/getting-started-infra-cnm
  tag: Centre d'apprentissage
  text: Premiers pas avec Infrastructure and Cloud Network Monitoring (CNM)
title: Cloud Network Monitoring
---
## Présentation {#overview}

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/670228207/rendition/1080p/file.mp4?loc=external&signature=42d4a7322017fffa6d5cc2e49ddbb7cfc4c6bbbbf207d13a5c9830630bda4ece" poster="/images/poster/npm.png" >}}

Datadog Cloud Network Monitoring (CNM) vous offre une visibilité sur votre trafic réseau entre les services, les conteneurs, les zones de disponibilité et tout autre tag dans Datadog. Les données de connexion aux niveaux IP, port et PID sont agrégées en dépendances de couche application entre des endpoints client et serveur significatifs, qui peuvent être analysés et visualisés via une [page réseau][1] et une [carte réseau][2] personnalisables. Utilisez les données de flux ainsi que les métriques clés du trafic réseau et du serveur DNS pour :

* Identifier précisément les dépendances de service inattendues ou latentes
* Optimiser les communications coûteuses inter-régionales ou multi-cloud
* Identifier les pannes des régions de fournisseurs cloud et des outils tiers
* Dépanner les problèmes de serveur DNS côté client et côté serveur

{{< whatsnext desc="Cette section comprend les sujets suivants :">}}
    {{< nextlink href="network_monitoring/cloud_network_monitoring/setup" >}}<u>Configuration</u> : Configurez l'Agent pour collecter les données réseau.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/cloud_network_monitoring/network_health" >}}<u>Santé du réseau</u> : Examinez la santé de votre environnement réseau.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/cloud_network_monitoring/network_analytics" >}}<u>Network Analytics</u> : Représentez graphiquement vos données réseau entre les clients et serveurs disponibles{{< /nextlink >}}
    {{< nextlink href="network_monitoring/network_path/setup/#scheduled-tests" >}}<u>Tests planifiés Network Path</u> : Visualisez l'itinéraire que suit le trafic réseau de son origine à sa destination à l'aide de tests planifiés.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/network_path/setup/#dynamic-tests" >}}<u>Tests dynamiques Network Path</u> : Créez dynamiquement des tests pour permettre à l'Agent de découvrir et de surveiller automatiquement les chemins réseau.{{< /nextlink >}}
    {{< nextlink href="network_monitoring/cloud_network_monitoring/network_map" >}}<u>Network Map</u> : Cartographiez vos données réseau entre vos tags.{{< /nextlink >}}
    {{< nextlink href="monitors/types/cloud_network_monitoring/#common-monitors" >}}<u>monitors communs</u> : Configurez les monitors CNM communs.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network
[2]: https://app.datadoghq.com/network/map