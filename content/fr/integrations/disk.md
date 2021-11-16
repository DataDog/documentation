---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/disk/README.md'
display_name: Disk
draft: false
git_integration_title: disk
guid: 94588b23-111e-4ed2-a2af-fd6e4caeea04
integration_id: system
integration_title: Disk
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: system.
metric_to_check: system.disk.free
name: disk
public_title: Intégration Datadog/Disk
short_description: Le check Disk rassemble des métriques sur les disques montés.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez les métriques relatives à l'utilisation du disque et aux E/S.

## Configuration

### Installation

Le check Disk est inclus avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

Le check Disk est activé par défaut et l'Agent recueille des métriques sur toutes les partitions locales. Pour configurer le check avec des options personnalisées, modifiez le fichier `disk.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2]. Consultez le [fichier d'exemple disk.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

### Validation

[Lancez la sous-commande `status` de l'Agent][4] et cherchez `disk` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "disk" >}}


### Événements

Le check Disk n'inclut aucun événement.

### Checks de service

**disk.read_write** :<br>
Renvoie `CRITICAL` si le système de fichiers est en mode lecture seule. **Remarque** : ce check de service doit être activé depuis la section `service_check_rw` du fichier [disk.d/conf.yaml][3].

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/disk/datadog_checks/disk/data/conf.yaml.default
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/disk/metadata.csv
[6]: https://docs.datadoghq.com/fr/help/