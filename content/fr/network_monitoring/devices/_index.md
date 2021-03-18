---
title: Network Device Monitoring
kind: documentation
disable_sidebar: true
description: 'Bénéficiez d''une visibilité optimale sur les périphériques connectés à votre réseau, tels que les routeurs, les serveurs et les pare-feu.'
aliases:
  - /fr/network_performance_monitoring/devices/
further_reading:
  - link: 'https://www.datadoghq.com/blog/monitor-snmp-with-datadog/'
    tag: Blog
    text: Surveiller des périphériques SNMP avec Datadog
  - link: 'https://www.datadoghq.com/blog/monitor-meraki/'
    tag: Blog
    text: Surveiller Cisco Meraki avec Datadog
  - link: 'https://www.datadoghq.com/blog/datacenter-monitoring-dashboards/'
    tag: Blog
    text: Surveiller des datacenters et des périphériques réseau avec Datadog
---
## Présentation

La fonctionnalité Network Device Monitoring Datadog est conçue pour vous offrir une visibilité optimale sur les périphériques connectés à votre réseau, tels que les routeurs, les switchs, les serveurs et les pare-feu qui utilisent le protocole SNMP.

Configurez l'Agent Datadog pour qu'il découvre automatiquement les périphériques connectés à un réseau et recueille des métriques les concernant, tel que des métriques liées à la bande passante, au débit des requêtes et au statut de disponibilité des périphériques. Représentez les métriques sous forme de graphique sur un [dashboard][1] Datadog ou créez un [monitor][2] pour être averti en cas de problème.

{{< img src="network_performance_monitoring/devices/datacenter_dashboard.jpg" alt="Dashboard de synthèse d'un datacenter" responsive="true" style="width:100%;">}}

{{< whatsnext desc="Cette section aborde les sujets suivants :">}}
    {{< nextlink href="network_performance_monitoring/devices/setup" >}}<u>Configuration</u> : Configurer l'Agent pour recueillir des données sur vos périphériques réseau.{{< /nextlink >}}
    {{< nextlink href="network_performance_monitoring/devices/profiles" >}}<u>Profils</u> : Configurer des profils adaptés à vos périphériques.{{< /nextlink >}}
    {{< nextlink href="network_performance_monitoring/devices/data" >}}<u>Données recueillies</u> : Visualiser les métriques, les événements et les checks de service recueillis.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards
[2]: /fr/monitors/monitor_types