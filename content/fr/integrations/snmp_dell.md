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
  - https://github.com/DataDog/integrations-core/blob/master/snmp_dell/README.md
display_name: Dell
draft: false
git_integration_title: snmp_dell
guid: 67aa0ef7-7c1d-4c03-8723-6beb4f531f6b
integration_id: snmp-dell
integration_title: Dell Inc.
integration_version: ''
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_to_check:
  - snmp.fanSpeed
  - snmp.systemStateChassisStatus
  - snmp.cacheDeviceStatus
name: snmp_dell
public_title: Datadog/Dell Inc.
short_description: Recueillez des métriques à partir de périphériques Dell.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Dell Inc. est une entreprise spécialisée dans la technologie qui développe des ordinateurs et du matériel réseau afin d'offrir aux petites et grandes entreprises des réseaux dernier cri. Recueillez des métriques pour surveiller vos données et générer des alertes à partir du matériel Dell suivant :

* Dell PowerEdge
* Dell iDRAC
* Dell EMC Isilon

Pour obtenir la liste complète de toutes les métriques recueillies à partir de périphériques Dell, consultez la [documentation relative à la fonction Network Device Monitoring][1].

## Configuration

Pour installer et configurer l'intégration SNMP, consultez la documentation relative à la fonction [Network Device Monitoring][2] 

## Données collectées

### Métriques

Pour en savoir plus sur les métriques surveillées, consultez la [documentation relative à la fonction Network Device Monitoring][1].

### Checks de service

L'intégration Dell n'inclut aucun check de service.

### Événements

L'intégration Dell n'inclut aucun événement.

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

* [Surveiller des périphériques SNMP avec Datadog][3]

[1]: https://docs.datadoghq.com/fr/network_performance_monitoring/devices/data
[2]: https://docs.datadoghq.com/fr/network_performance_monitoring/devices/setup
[3]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/