---
aliases:
  - /fr/agent/faq/how-to-monitor-snmp-devices/
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Datacenter Overview: assets/dashboards/datacenter_overview.json
    Interface Performance: assets/dashboards/interface_performance.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
  - notification
  - network
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/snmp/README.md'
display_name: SNMP
draft: false
git_integration_title: snmp
guid: 080bb566-d1c8-428c-9d85-71cc2cdf393c
integration_id: snmp
integration_title: SNMP
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: snmp.
name: snmp
public_title: Intégration Datadog/SNMP
short_description: Recueillez des métriques SNMP à partir de vos périphériques réseau.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Le protocole SNMP (Simple Network Management Protocol) est une norme de gestion des périphériques connectés au réseau, tels que les routeurs, les switchs, les serveurs et les pare-feu. Ce check recueille des métriques SNMP à partir de vos périphériques réseau.

Le protocole SNMP utilise des identifiants appelés sysObjectID (System Object Identifiers) pour identifier de manière unique les appareils, et des OID (Object Identifiers) pour identifier de manière unique les objets gérés. Les OID sont organisés sous forme d'arborescence hiérarchique : la racine ISO est numérotée 1, la branche suivante est ORG et numérotée 3, et ainsi de suite. Chaque branche est séparée par un `.`.

Une MIB (Management Information Base) permet de convertir les OID en noms lisibles et d'organiser un sous-ensemble de la hiérarchie. Du fait de la structure de l'arborescence, la plupart des valeurs SNMP commencent par le même ensemble d'objets :

* `1.3.6.1.1` (MIB-II) : objets standard contenant des informations système comme la disponibilité, les interfaces ou encore la pile réseau.
* `1.3.6.1.4.1` : objets standard contenant des informations propres au fournisseur.

## Configuration

Pour installer et configurer l'intégration SNMP, consultez la documentation relative à la fonction [Network Device Monitoring][1].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

* [Surveiller des périphériques SNMP avec Datadog][2]

[1]: https://docs.datadoghq.com/fr/network_performance_monitoring/devices/setup
[2]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/