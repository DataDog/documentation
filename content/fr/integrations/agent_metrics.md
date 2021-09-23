---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/agent_metrics/README.md
display_name: Agent Metrics
draft: false
git_integration_title: agent_metrics
guid: 032333e3-5272-4044-90d5-a05997667513
integration_id: datadog-agent
integration_title: Agent Metrics
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: datadog.agent.
metric_to_check: datadog.agent.collector.cpu.used
name: agent_metrics
public_title: Intégration Datadog/Agent Metrics
short_description: agent_metrics description.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques du service agent_metrics en temps réel pour :

- Visualiser et surveiller les états du service `agent_metrics`
- Être informé des failovers et des événements du service agent_metrics

**REMARQUE** : le check Agent Metrics a été réécrit en Go pour l'Agent v6 afin de tirer parti de la nouvelle architecture interne. Il n'est donc pas obsolète, mais **fonctionne uniquement avec les versions de l'Agent antérieures à la version 6**.

Afin de recueillir les métriques de l'Agent à partir de la v6, utilisez le [check Go-expvar][1] avec [le fichier de configuration `agent_stats.yaml`][2] fourni avec l'Agent.

## Configuration

### Installation

Le check Agent Metrics est inclus avec le package de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur vos serveurs.

### Configuration

1. Modifiez le fichier `agent_metrics.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] afin de spécifier votre serveur et votre port et de définir les masters à surveiller. Consultez le [fichier d'exemple agent_metrics.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `agent_metrics` dans la section Checks.

## Données collectées

Toutes les données recueillies sont uniquement disponibles avec l'Agent v5.

### Métriques
{{< get-metrics-from-git "agent_metrics" >}}


### Événements

Le check Agent Metrics n'inclut aucun événement.

### Checks de service

Le check Agent Metrics n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://docs.datadoghq.com/fr/integrations/go_expvar/
[2]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/go_expvar.d/agent_stats.yaml.example
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/agent-v5/agent_metrics/datadog_checks/agent_metrics/data/conf.yaml.default
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/agent_metrics/metadata.csv
[9]: https://docs.datadoghq.com/fr/help/