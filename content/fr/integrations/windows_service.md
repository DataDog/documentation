---
aliases:
  - /fr/integrations/winservices
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
  - https://github.com/DataDog/integrations-core/blob/master/windows_service/README.md
display_name: Windows Service
draft: false
git_integration_title: windows_service
guid: 2289acf0-e413-4384-83f7-88157b430805
integration_id: windows-service
integration_title: Windows Services
integration_version: 4.1.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: windows_service.
name: windows_service
public_title: Intégration Datadog/Services Windows
short_description: Surveillez l'état de vos services Windows.
support: core
supported_os:
  - windows
---
## Présentation

Ce check surveille l'état de n'importe quel service Windows et envoie un check de service à Datadog.

## Configuration

### Installation

Le check Service Windows est inclus avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos hosts Windows.

### Configuration

1. Modifiez le fichier `windows_service.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2]. Consultez le [fichier d'exemple windows_service.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

2. Entrez les noms de service tels qu'ils apparaissent dans le champ Propriétés de `services.msc`, **PAS** le nom d'affichage. Pour les noms contenant des espaces : mettez le nom entier entre guillemets, par exemple : `"Windows Service"`. **Remarque** : les espaces sont remplacées par des underscores dans Datadog.

3. [Redémarrez l'Agent][4].

#### Collecte de métriques

Le check Windows Service peut potentiellement générer des [métriques custom][5], ce qui peut avoir une incidence sur votre [facture][6]. 

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `windows_service` dans la section Checks.

## Données collectées

### Métriques

Le check Service Windows n'inclut aucune métrique.

### Événements

Le check Service Windows n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "windows_service" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

## Pour aller plus loin

- [Surveillance de Windows Server 2012][10]
- [Comment recueillir des métriques de Windows Server 2012][11]
- [Surveillance de Windows Server 2012 avec Datadog][12]

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/windows_service/datadog_checks/windows_service/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/developers/metrics/custom_metrics/
[6]: https://docs.datadoghq.com/fr/account_management/billing/custom_metrics/
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/windows_service/assets/service_checks.json
[9]: https://docs.datadoghq.com/fr/help/
[10]: https://www.datadoghq.com/blog/monitoring-windows-server-2012
[11]: https://www.datadoghq.com/blog/collect-windows-server-2012-metrics
[12]: https://www.datadoghq.com/blog/windows-server-monitoring