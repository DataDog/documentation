---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - cloud
  - orchestration
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/README.md'
display_name: "API Cloud\_Foundry"
draft: false
git_integration_title: api_cloud_foundry
guid: 82e5b924-c8c3-4467-bfde-5838857b6447
integration_id: api-cloud-foundry
integration_title: "API Cloud\_Foundry"
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: api_cloud_foundry.
metric_to_check: ''
name: api_cloud_foundry
public_title: "Intégration Datadog/API Cloud\_Foundry"
short_description: "Collectez les événements d'audit Cloud\_Foundry."
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check utilise l'[API Cloud Foundry][1] pour recueillir les événements d'audit et les envoyer à Datadog via l'Agent.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check API Cloud Foundry est inclus avec le package de l'[Agent Datadog][2].
Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `cloud_foundry_api.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données Cloud Foundry API. Consultez le [fichier d'exemple cloud_foundry_api.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][4].

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `cloud_foundry_api` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "api_cloud_foundry" >}}


### Événements

L'intégration Cloud Foundry API collecte les événements d'audit configurés.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: http://v3-apidocs.cloudfoundry.org
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations
[3]: https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/datadog_checks/cloud_foundry_api/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/assets/service_checks.json
[8]: https://docs.datadoghq.com/fr/help