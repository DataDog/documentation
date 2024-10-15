---
app_id: helm
app_uuid: 754a061c-d896-4f3c-b54e-87125bb66241
assets:
  dashboards:
    Helm - Overview: assets/dashboards/overview.json
  integration:
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: helm.release
      metadata_path: metadata.csv
      prefix: helm.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Helm
  monitors:
    '[helm] Monitor Helm failed releases': assets/monitors/monitor_failed_releases.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuration & deployment
- containers
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/helm/README.md
display_on_public_website: true
draft: false
git_integration_title: helm
integration_id: helm
integration_title: Check Helm
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: helm
public_title: Check Helm
short_description: Surveiller vos déploiements Helm avec Datadog
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
  - Category::Configuration & Deployment
  - Category::Containers
  configuration: README.md#Setup
  description: Surveiller vos déploiements Helm avec Datadog
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Check Helm
---



## Présentation

Ce check permet de surveiller des déploiements Helm avec l'Agent Datadog.

Helm prend en charge de nombreux backends de stockage. La version 3 de Helm utilise par défaut des secrets Kubernetes, tandis que la version 2 utilise par défaut des ConfigMaps. Ce check prend en charge ces deux options.

## Configuration

### Installation

Le check Helm est inclus avec le package de l'[Agent Datadog][1]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

Il s'agit d'un check de cluster. Pour en savoir plus, consultez la [documentation dédiée][2].

### Validation

[Lancez la sous-commande status de l'Agent][3] et cherchez `helm` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "helm" >}}


### Événements

Ce check génère des événements lorsque l'option `collect_events` est définie sur `true` (valeur par défaut : `false`).

Lorsque cette option est activée, le check génère des événements lorsque les situations suivantes surviennent :
- Une nouvelle version est déployée.
- Une version est supprimée.
- Une version est mise à niveau (nouvelle révision).
- Un statut est modifié, par exemple d'un état déployé à remplacé.

### Checks de service
{{< get-service-checks-from-git "helm" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Blog : Surveiller vos applications Kubernetes gérées par Helm avec Datadog][7]


[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/cluster_agent/clusterchecks/
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://github.com/DataDog/integrations-core/blob/master/helm/metadata.csv
[5]: https://github.com/DataDog/integrations-core/blob/master/helm/assets/service_checks.json
[6]: https://docs.datadoghq.com/fr/help/
[7]: https://www.datadoghq.com/blog/monitor-helm-kubernetes-with-datadog/