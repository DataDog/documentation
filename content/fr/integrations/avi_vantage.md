---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Avi Vantage - Overview: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors:
    Avi Vantage - Error Rate Monitor: assets/monitors/error_rate_monitor.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- network
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/avi_vantage/README.md
display_name: Avi Vantage
draft: false
git_integration_title: avi_vantage
guid: 9c3b3e3f-5e3d-49a4-8d35-4192b135a654
integration_id: avi-vantage
integration_title: Avi Vantage
integration_version: 3.1.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: avi_vantage.
metric_to_check:
- avi_vantage.controller_stats.avg_cpu_usage
- avi_vantage.pool_healthscore
- avi_vantage.service_engine_healthscore
- avi_vantage.virtual_service_healthscore
name: avi_vantage
public_title: Avi Vantage
short_description: Surveillez les performances et la santé de vos instances Avi Vantage.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check permet de surveiller [Avi Vantage][1] avec l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### Installation

Le check Avi Vantage est inclus avec le package de l'[Agent Datadog][3].
Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `avi_vantage.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance avi_vantage. Consultez le [fichier d'exemple avi_vantage.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][5].

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `avi_vantage` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "avi_vantage" >}}


### Événements

Avi Vantage n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://avinetworks.com/why-avi/multi-cloud-load-balancing/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/integrations-core/blob/master/avi_vantage/datadog_checks/avi_vantage/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/avi_vantage/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/avi_vantage/assets/service_checks.json
[9]: https://docs.datadoghq.com/fr/help/