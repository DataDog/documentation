---
assets:
  dashboards:
    Nvidia Jetson: assets/dashboards/nvidia_jetson.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - iot
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/nvidia_jetson/README.md
display_name: Nvidia Jetson
draft: false
git_integration_title: nvidia_jetson
guid: 72845bb7-c3a6-4017-96f6-c232171102f8
integration_id: nvidia-jetson
integration_title: Nvidia Jetson
integration_version: ''
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: nvidia.jetson.
metric_to_check: nvidia.jetson.mem.used
name: nvidia_jetson
public_title: Nvidia Jetson
short_description: "Obtenir des métriques à propos de votre carte Nvidia\_Jetson"
support: core
supported_os:
  - linux
---
## Présentation

Ce check permet de surveiller une carte [Nvidia Jetson][1].
Il transmet les métriques recueillies à partir de `tegrastats`.

## Configuration

### Installation

Le check Nvidia Jetson est inclus avec le package de l'[Agent Datadog][2].
Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Créez un fichier `jetson.d/conf.yaml` dans le dossier `conf.d/` à la racine du
   répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Jetson.
   Consultez le [fichier d'exemple jetson.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][4].

### Validation

Lancez la [sous-commande status de l'Agent][5] et cherchez `jetson` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "nvidia_jetson" >}}


Certaines métriques sont uniquement transmises lorsque `use_sudo` est défini sur true : 
- `nvidia.jetson.iram.used`
- `nvidia.jetson.iram.total`
- `nvidia.jetson.iram.lfb`
- `nvidia.jetson.emc.freq`
- `nvidia.jetson.gpu.freq`
- `nvidia.jetson.cpu.freq`

### Checks de service

L'intégration Nvidia Jetson n'inclut aucun check de service.

### Événements

L'intégration Nvidia Jetson n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://developer.nvidia.com/embedded-computing
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/jetson.d/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/nvidia_jetson/metadata.csv
[7]: https://docs.datadoghq.com/fr/help/