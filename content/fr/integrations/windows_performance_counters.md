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
- iot
- os & system
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/windows_performance_counters/README.md
display_name: Compteurs de performances Windows
draft: false
git_integration_title: windows_performance_counters
guid: 18cca521-450e-477c-8334-e0d29aebc150
integration_id: windows-performance-counters
integration_title: Compteurs de performances Windows
integration_version: 1.2.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ''
metric_to_check: ''
name: windows_performance_counters
public_title: Compteurs de performances Windows
short_description: Surveillez les compteurs de performances sous les systèmes d'exploitation
  Windows.
support: core
supported_os:
- windows
---



## Présentation

Ce check permet de surveiller les [compteurs de performances Windows][1] avec l'Agent Datadog.

**Remarque** : vous devez utiliser au minimum la version 7.33.0 de l'Agent.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### Installation

Le check Compteurs de performances Windows est inclus avec le package de l'[Agent Datadog][3]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Procédure à suivre

1. Modifiez le fichier `windows_performance_counters.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance windows_performance_counters. Consultez le [fichier d'exemple windows_performance_counters.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][5].

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `windows_performance_counters` dans la section Checks.

## Données collectées

### Métriques

Toutes les métriques recueillies par le check Compteurs de performances Windows sont transmises à Datadog en tant que [métriques custom][7]. Ces transmissions peuvent avoir une incidence sur votre [facturation][8].

### Événements

L'intégration Compteurs de performances Windows n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "windows_performance_counters" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].


[1]: https://docs.microsoft.com/en-us/windows/win32/perfctrs/about-performance-counters
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/integrations-core/blob/master/windows_performance_counters/datadog_checks/windows_performance_counters/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/fr/developers/metrics/custom_metrics/
[8]: https://docs.datadoghq.com/fr/account_management/billing/custom_metrics/
[9]: https://github.com/DataDog/integrations-core/blob/master/windows_performance_counters/assets/service_checks.json
[10]: https://docs.datadoghq.com/fr/help/