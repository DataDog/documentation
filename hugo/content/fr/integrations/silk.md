---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Silk - Overview: assets/dashboards/silk_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors:
    Latency high: assets/recommended_monitors/latency_high.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- cloud
- data store
- provisioning
creates_events: true
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/silk/README.md
display_name: Silk
draft: false
git_integration_title: silk
guid: 75648ebe-8ce3-4b08-bba2-2f957a7e94fa
integration_id: silk
integration_title: Silk
integration_version: 1.1.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: silk.
metric_to_check: silk.system.capacity.free
name: silk
public_title: Silk
short_description: Surveillez les performances et les statistiques système de Silk.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check permet de surveiller [Silk][1] avec l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### Installation

Le check Silk est inclus avec le package de l'[Agent Datadog][3]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `silk.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Silk. Consultez le [fichier d'exemple silk.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][5].

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `silk` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "silk" >}}


### Événements

L'intégration Silk enregistre les événements générés par le serveur Silk. Les niveaux d'événements sont mappés comme suit :

| Silk                      | Datadog                            |
|---------------------------|------------------------------------|
| `INFO`                    | `info`                             |
| `ERROR`                   | `error`                            |
| `WARNING`                 | `warning`                          |
| `CRITICAL`                | `error`                            |


### Checks de service
{{< get-service-checks-from-git "silk" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].


[1]: https://silk.us/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/integrations-core/blob/master/silk/datadog_checks/silk/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/silk/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/silk/assets/service_checks.json
[9]: https://docs.datadoghq.com/fr/help/