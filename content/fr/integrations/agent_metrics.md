---
app_id: datadog-agent
app_uuid: 4af17310-84ad-4bac-b05d-85917bc378cb
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: datadog.agent.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Agent Metrics
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories: []
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/agent_metrics/README.md
display_on_public_website: true
draft: false
git_integration_title: agent_metrics
integration_id: datadog-agent
integration_title: Agent Metrics
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: agent_metrics
public_title: Agent Metrics
short_description: agent_metrics description.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  configuration: README.md#Setup
  description: agent_metrics description.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Agent Metrics
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Présentation

Recueillez des métriques internes depuis l'Agent Datadog pour créer des visualisations et des monitors dans l'Agent Datadog.

**Remarque** : la liste des métriques recueillies par cette intégration peut varier en fonction des versions mineures de l'Agent. Il est possible que ces différences ne soient pas indiquées dans le changelog de l'Agent.

## Formule et utilisation

### Installation

L'intégration Agent Metrics, qui est basée sur le check [go_expvar][1], est incluse avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs.

### Dépannage de la solution Browser

1. Remplacez le nom du fichier [`go_expvar.d/agent_stats.yaml.example`][3] dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] par `go_expvar.d/agent_stats.yaml`.

2. [Redémarrez l'Agent][5].

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `go_expvar` dans la section Checks.

## Real User Monitoring

### Analyse d'entonnoirs

L'intégration Agent Metrics recueille les métriques définies dans [`agent_stats.yaml.example`][3].

### Aide

L'intégration Agent Metrics n'inclut aucun événement.

### Aide

L'intégration Agent Metrics n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://docs.datadoghq.com/fr/integrations/go_expvar/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/go_expvar.d/agent_stats.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/fr/help/