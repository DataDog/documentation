---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    btrfs: assets/dashboards/btrfs_dashboard.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- os & system
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/btrfs/README.md
display_name: Btrfs
draft: false
git_integration_title: btrfs
guid: 54f9329a-8270-4f5a-bd4b-cd169abfc791
integration_id: btrfs
integration_title: Btrfs
integration_version: 1.14.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: btrfs.
metric_to_check: system.disk.btrfs.total
name: btrfs
public_title: Intégration Datadog/Btrfs
short_description: Surveillez l'utilisation des volumes Btrfs afin d'intervenir avant
  qu'ils ne soient saturés.
support: core
supported_os:
- linux
- mac_os
---



![Métrique Btrfs][1]

## Présentation

Recueillez des métriques de Btrfs en temps réel pour :

- Visualiser et surveiller les états de Btrfs

## Configuration

### Installation

Le check Btrfs est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs qui utilisent au moins un système de fichiers Btrfs.

### Configuration

1. Modifiez le fichier `btrfs.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3]. Consultez le [fichier d'exemple btrfs.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][5].

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `btrfs` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "btrfs" >}}


### Événements

Le check Btrfs n'inclut aucun événement.

### Checks de service

Le check Btrfs n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/btrfs/images/btrfs_metric.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/btrfs/datadog_checks/btrfs/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/btrfs/metadata.csv
[8]: https://docs.datadoghq.com/fr/help/