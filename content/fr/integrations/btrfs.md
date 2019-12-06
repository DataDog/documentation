---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/btrfs/README.md'
display_name: Btrfs
git_integration_title: btrfs
guid: 54f9329a-8270-4f5a-bd4b-cd169abfc791
integration_id: btrfs
integration_title: Btrfs
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: btrfs.
metric_to_check: system.disk.btrfs.total
name: btrfs
public_title: Intégration Datadog/Btrfs
short_description: Surveillez l'utilisation des volumes Btrfs afin d'intervenir avant qu'il ne soit trop tard. up.
support: core
supported_os:
  - linux
  - mac_os
---
![Métrique Btrfs][1]

## Présentation

Recueillez des métriques du service Btrfs en temps réel pour :

* Visualiser et surveiller les états de Btrfs
* Être informé des failovers et des événements de Btrfs

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Btrfs est inclus avec le paquet de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur vos serveurs qui utilisent au moins un système de fichiers Btrfs.

### Configuration

1. Configurez l'Agent selon vos besoins, puis modifiez le fichier `btrfs.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4].
    Consultez le [fichier d'exemple btrfs.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande `status` de l'Agent][7] et cherchez `btrfs` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "btrfs" >}}


### Événements
Le check Btrfs n'inclut aucun événement.

### Checks de service
Le check Btrfs n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/btrfs/images/btrfs_metric.png
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/btrfs/datadog_checks/btrfs/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/btrfs/metadata.csv
[9]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}