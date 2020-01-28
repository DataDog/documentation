---
assets:
  dashboards: {}
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
  - 'https://github.com/DataDog/integrations-core/blob/master/hyperv/README.md'
display_name: Hyper-V
git_integration_title: hyperv
guid: 412a75c1-b752-4b20-b046-4195dfaaf6ec
integration_id: hyper-v
integration_title: Hyper-V
is_public: true
kind: integration
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

## Implémentation
### Installation

Le check Hyper-V est inclus avec le paquet de l'[Agent Datadog][3]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `hyperv.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Hyper-V. Consultez le [fichier d'exemple hyperv.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][5].

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

* [Surveiller Microsoft Hyper-V avec Datadog][9]

[1]: https://docs.microsoft.com/en-us/windows-server/virtualization/hyper-v/hyper-v-on-windows-server
[3]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/windows
[4]: https://github.com/DataDog/integrations-core/blob/master/hyperv/datadog_checks/hyperv/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/hyperv/metadata.csv
[8]: https://docs.datadoghq.com/fr/help
[9]: https://www.datadoghq.com/blog/monitor-microsoft-hyperv-with-datadog