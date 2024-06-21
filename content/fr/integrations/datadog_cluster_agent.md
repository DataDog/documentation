---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Datadog Cluster Agent - Overview: assets/dashboards/datadog_cluster_agent_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- containers
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/README.md
display_name: Agent de cluster Datadog
draft: false
git_integration_title: datadog_cluster_agent
guid: 275fd66d-2440-44e5-ac30-461062cd2825
integration_id: datadog-cluster-agent
integration_title: Agent de cluster Datadog
integration_version: 2.2.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: datadog_cluster_agent.
metric_to_check: datadog.cluster_agent.admission_webhooks.certificate_expiry
name: datadog_cluster_agent
public_title: Intégration Agent de cluster Datadog
short_description: Surveillez les métriques de l'Agent de cluster Datadog
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check permet de surveiller l'[Agent de cluster Datadog][1] avec l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### Installation

Le check Datadog-Cluster-Agent est inclus avec le package de l'[Agent Datadog][2].
Vous n'avez rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `datadog_cluster_agent.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance datadog_cluster_agent. Consultez le [fichier d'exemple datadog_cluster_agent.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][4].

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `datadog_cluster_agent` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "datadog_cluster_agent" >}}


### Événements

L'intégration Datadog-Cluster-Agent n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "datadog_cluster_agent" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].


[1]: https://docs.datadoghq.com/fr/agent/cluster_agent/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/datadog_checks/datadog_cluster_agent/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/assets/service_checks.json
[8]: https://docs.datadoghq.com/fr/help/