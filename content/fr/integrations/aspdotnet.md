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
  - web
  - languages
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/aspdotnet/README.md'
display_name: ASP.NET
draft: false
git_integration_title: aspdotnet
guid: 475b0c6c-02e5-49ef-806b-9fab377f0839
integration_id: aspdotnet
integration_title: ASP.NET
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: aspdotnet.
metric_to_check: aspdotnet.request.wait_time
name: aspdotnet
public_title: Intégration Datadog/ASP.NET
short_description: Surveillez vos métriques du service ASP.NET en temps réel
support: core
supported_os:
  - windows
---
## Présentation

Recueillez des métriques d'ASP.NET en temps réel pour :

- Visualiser et surveiller les états ASP.NET
- Être informé des failovers et des événements d'ASP.NET

## Configuration

### Installation

Le check ASP.NET est inclus avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos serveurs.

### Configuration

1. Modifiez le fichier `aspdotnet.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2] pour commencer à recueillir vos données de performance ASP.NET. Consultez le [fichier d'exemple aspdotnet.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][4].

### Validation

[Lancez la sous-commande `status` de l'Agent][5] et cherchez `aspdotnet` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "aspdotnet" >}}


### Événements

Le check ASP.NET n'inclut aucun événément.

### Checks de service

Le check ASP.NET n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/aspdotnet/datadog_checks/aspdotnet/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/aspdotnet/metadata.csv
[7]: https://docs.datadoghq.com/fr/help/