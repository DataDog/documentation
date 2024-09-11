---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    hyper-v: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- azure
- cloud
- monitoring
- os & system
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/hyperv/README.md
display_name: Hyper-V
draft: false
git_integration_title: hyperv
guid: 412a75c1-b752-4b20-b046-4195dfaaf6ec
integration_id: hyper-v
integration_title: Hyper-V
integration_version: 1.7.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: hyperv.
metric_to_check: hyperv.hypervisor_logical_processor.total_run_time
name: hyperv
public_title: Intégration Datadog/Hyper-V
short_description: Surveillez le système de virtualisation Hyper-V de Microsoft.
support: core
supported_os:
- windows
---



## Présentation

Ce check permet de surveiller [Hyper-V][1] avec l'Agent Datadog.

## Configuration

### Installation

Le check Hyper-V est inclus avec le paquet de l'[Agent Datadog][2]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `hyperv.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Hyper-V. Consultez le [fichier d'exemple hyperv.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][4].

**Remarque** : les versions 1.5.0+ de ce check utilisent une nouvelle implémentation pour la collecte de métriques qui nécessite d'utiliser Python 3. Pour les hosts ne pouvant pas utiliser Python 3, ou si vous souhaitez utiliser une ancienne version de ce check, consultez [cette configuration][5].

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `hyperv` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "hyperv" >}}


### Checks de service

Hyper-V n'inclut aucun check de service.

### Événements

Hyper-V n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveiller Microsoft Hyper-V avec Datadog][9]

[1]: https://docs.microsoft.com/en-us/windows-server/virtualization/hyper-v/hyper-v-on-windows-server
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/integrations-core/blob/master/hyperv/datadog_checks/hyperv/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/7.33.x/hyperv/datadog_checks/hyperv/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/hyperv/metadata.csv
[8]: https://docs.datadoghq.com/fr/help/
[9]: https://www.datadoghq.com/blog/monitor-microsoft-hyperv-with-datadog