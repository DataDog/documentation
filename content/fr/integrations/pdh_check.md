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
  - 'https://github.com/DataDog/integrations-core/blob/master/pdh_check/README.md'
display_name: PDH
draft: false
git_integration_title: pdh_check
guid: D09B3410-00A0-4789-ABD7-7740C3FE211F
integration_id: pdh
integration_title: Check PDH
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: pdh.
name: pdh_check
public_title: Intégration Datadog/Check PDH
short_description: Recueillez et représentez graphiquement des counters de performance Windows
support: core
supported_os:
  - windows
---
## Présentation

Recueillez des métriques à partir des counters de performances Windows en temps réel pour :

- Visualiser et surveiller les compteurs de performances Windows via l'API PDH.

## Configuration

### Installation

Le check PDH est inclus avec le package de l'[Agent Datadog][1]. Vous n'avez donc rien d'autre à installer.

### Configuration

1. Modifiez le fichier `pdh_check.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2] pour commencer à recueillir vos données de performance Windows. Consultez le [fichier d'exemple pdh_check.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][4].

### Validation

Lancez la [sous-commande status de l'Agent][5] et cherchez `pdh_check` dans la section Checks.

## Données collectées

### Métriques

Toutes les métriques recueillies par le check PHD sont transmises à Datadog en tant que [métriques custom][6]. Ces transmissions peuvent avoir une incidence sur votre [facturation][7].

### Événements

Le check PDH n'inclut aucun événement.

### Checks de service

Le check PDH n'inclut aucun check de service.

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/pdh_check/datadog_checks/pdh_check/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/fr/developers/metrics/custom_metrics/
[7]: https://docs.datadoghq.com/fr/account_management/billing/custom_metrics/