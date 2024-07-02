---
assets:
  configuration: {}
  dashboards: {}
  logs: {}
  metrics_metadata: ''
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
  - https://github.com/DataDog/integrations-core/blob/master/snmp_cisco/README.md
display_name: Cisco
draft: false
git_integration_title: snmp_cisco
guid: 4109f288-7460-4ed2-b0c3-04e708fbd5bd
integration_id: snmp-cisco
integration_title: Cisco
integration_version: ''
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_to_check:
  - snmp.cefcFRUPowerAdminStatus
  - snmp.devClientCount
name: snmp_cisco
public_title: Intégration Datadog/Cisco
short_description: Recueillez des métriques SNMP à partir de vos périphériques réseau Cisco.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Cisco est l'un des principaux fournisseurs mondiaux de solutions informatiques dans le domaine du réseau et de la cybersécurité. Installez cette intégration pour surveiller tous vos périphériques Cisco, y compris vos routeurs, commutateurs, appareils vocaux, dispositifs de sécurité, et plus encore.

Recueillez des métriques SNMP à partir de vos périphériques Cisco, notamment pour les produits suivants :

- Cisco Catalyst
- Cisco Adaptive Security Appliance (ASA)
- Cisco Meraki (remarque : d'autres événements peuvent être recueillis à partir de Meraki via le [carré d'intégration Meraki][1])
- Cisco Nexus
- Cisco ICM
- Cisco ISR
- Machines virtuelles UC Cisco

Pour en savoir plus sur les métriques surveillées, consultez le [carré d'intégration SNMP][2]

## Configuration

Pour installer et configurer l'intégration SNMP, consultez la documentation relative à la fonction [Network Device Monitoring][3].

## Données collectées

### Métriques

Pour en savoir plus sur les métriques surveillées, consultez le [carré d'intégration SNMP][2]

### Checks de service

Snmp Cisco n'inclut aucun check de service.

### Événements

Snmp Cisco n'inclut aucun événement.

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

* [Surveiller des périphériques SNMP avec Datadog][4]

[1]: https://app.datadoghq.com/account/settings#integrations/meraki
[2]: https://app.datadoghq.com/account/settings#integrations/snmp
[3]: https://docs.datadoghq.com/fr/network_performance_monitoring/devices/setup
[4]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/