---
assets:
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
- https://github.com/DataDog/integrations-core/blob/master/winkmem/README.md
display_name: Windows Kernel Memory
draft: false
git_integration_title: winkmem
guid: ce9fc6d0-5e12-4570-93bb-bf58894996ba
integration_id: winkmem
integration_title: Windows Kernel Memory
integration_version: ''
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: winkmem.
metric_to_check: winkmem.paged_pool_bytes
name: winkmem
public_title: Intégration Datadog/Windows Kernel Memory
short_description: Surveillez l'allocation de votre mémoire de noyau Windows.
support: core
supported_os:
- windows
---



## Présentation

Récupérez des données sur l'utilisation de la mémoire du noyau Windows pour créer des visualisations et des monitors dans Datadog.

**Remarque** : la liste des métriques recueillies par cette intégration peut varier en fonction des versions mineures de l'Agent. Il est possible que ces différences ne soient pas indiquées dans le changelog de l'Agent.

## Configuration

### Installation

L'intégration Windows Kernel Memory est incluse avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos serveurs.

### Configuration

1. Modifiez le fichier `winkmem.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2]. Consultez le [fichier d'exemple winkmem.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][4].

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `winkmem` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "winkmem" >}}


### Événements

L'intégration Windows Kernel Memory n'inclut aucun événement.

### Checks de service

L'intégration Windows Kernel Memory n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/winkmem.d/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/master/winkmem/metadata.csv
[6]: https://docs.datadoghq.com/fr/help/