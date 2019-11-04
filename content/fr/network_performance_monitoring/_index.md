---
title: Surveillance des performances réseau
kind: documentation
disable_toc: true
description: Explorez les métriques pour la communication point à point sur votre infrastructure.
aliases:
  - /fr/monitors/network_flow_monitors/
  - /fr/graphing/infrastructure/network_performance_monitor/
further_reading:
  - link: 'https://www.datadoghq.com/blog/network-performance-monitoring'
    tag: Blog
    text: Surveillance de performance réseau
  - link: 'https://www.datadoghq.com/blog/monitoring-101-alerting/'
    tag: Blog
    text: "Monitoring 101\_: déclencher des alertes sur les éléments importants"
---
<div class="alert alert-warning">
Cette fonctionnalité est actuellement en bêta. Demandez l'accès en remplissant ce <a href="https://app.datadoghq.com/network/2019signup">formulaire de demande de surveillance de performance réseau Datadog bêta</a>.
</div>

## Présentation

La surveillance de performance réseau (NPM) de Datadog est conçue pour vous offrir la visibilité sur le trafic réseau sur l'ensemble des objets tagués dans Datadog : des conteneurs aux hosts en passant par les services et zones de disponibilité. Les données de connexion sont agrégées en flux, et chaque flux indique le trafic entre une __source__ et une __destination__, à travers une [page réseau][1] et une [carte réseau][2] personnalisables.
Chaque flux contient des métriques réseau comme le débit, la bande passante, le nombre de retransmissions et les informations de source/destination jusqu'aux niveaux de l'IP, du port et du PID.

{{< whatsnext desc="Cette section aborde les sujets suivants :">}}
    {{< nextlink href="network_performance_monitoring/installation" >}}<u>Installation</u> : configurer l'Agent pour recueillir des données réseau.{{< /nextlink >}}
    {{< nextlink href="network_performance_monitoring/network_table" >}}<u>Page réseau</u> : tracer le graphique de vos données réseau entre chaque source et destination disponibles.{{< /nextlink >}}
    {{< nextlink href="network_performance_monitoring/network_map" >}}<u>Carte réseau</u> : cartographier vos données réseau entre vos tags.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network
[2]: https://app.datadoghq.com/network/map