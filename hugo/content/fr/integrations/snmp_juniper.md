---
assets:
  dashboards: {}
  logs: {}
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
  - notification
  - network
  - autodiscovery
  - snmp
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/snmp_juniper/README.md
display_name: Juniper Networks
draft: false
git_integration_title: snmp_juniper
guid: 62f074dc-8b6b-466d-bca2-175194221546
integration_id: snmp-juniper
integration_title: Juniper Networks
integration_version: ''
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_to_check:
  - snmp.jnxDcuStatsPackets
  - snmp.jnxVirtualChassisPortInPkts
  - snmp.jnxScuStatsPackets
name: snmp_juniper
public_title: "Datadog/Juniper\_Networks"
short_description: Recueillez des métriques à partir de vos périphériques réseau Juniper.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Juniper Networks développe et commercialise des périphériques réseau, notamment des routeurs, des commutateurs, des logiciels de gestion réseau, ainsi que des solutions de sécurité réseau. Configurez l'intégration de Juniper et recueillez des métriques SNMP à partir de différents périphériques, dont :

- Les commutateurs Ethernet EX Juniper
- Les routeurs MX Juniper
- Les pare-feu SRX Juniper

Pour en savoir plus sur les métriques surveillées, consultez la section [Données NDM recueillies][1].

## Configuration

Pour installer et configurer l'intégration SNMP, consultez la documentation relative à la fonction [Network Device Monitoring][2] 

## Données collectées

### Métriques

Pour en savoir plus sur les métriques surveillées, consultez la section [Données NDM recueillies][1].

### Checks de service

Juniper n'inclut aucun check de service.

### Événements

Juniper n'inclut aucun événement.

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveiller des périphériques SNMP avec Datadog][3]
- [Surveiller des périphériques réseau Juniper avec Datadog][4]

[1]: https://docs.datadoghq.com/fr/network_monitoring/devices/data/
[2]: https://docs.datadoghq.com/fr/network_monitoring/devices/setup/
[3]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
[4]: https://www.datadoghq.com/blog/monitor-juniper-network-devices-with-datadog/