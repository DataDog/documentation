---
app_id: cri-o
app_uuid: a5f9ace1-19b5-4928-b98b-21f15d62cce2
assets:
  dashboards:
    crio: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: crio.operations.count
      metadata_path: metadata.csv
      prefix: crio.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10044
    source_type_name: CRI-O
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- containers
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/crio/README.md
display_on_public_website: true
draft: false
git_integration_title: crio
integration_id: cri-o
integration_title: CRI-O
integration_version: 2.6.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: crio
public_title: CRI-O
short_description: Surveillez toutes vos métriques CRI-O avec Datadog.
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
  - Category::Containers
  configuration: README.md#Setup
  description: Surveillez toutes vos métriques CRI-O avec Datadog.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: CRI-O
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Présentation

Ce check surveille [CRI-O][1].

## Formule et utilisation

### Liste des infrastructures

L'intégration repose sur l'option `--enable-metrics` de CRI-O, qui est désactivée par défaut, lors de l'exposition des métriques activées sur `127.0.0.1:9090/metrics`.

### Dépannage de la solution Browser

1. Modifiez le fichier `crio.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance CRI-O. Consultez le [fichier d'exemple crio.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][3].

### Validation

[Lancez la sous-commande status de l'Agent][4] et cherchez `crio` dans la section Checks.

## Real User Monitoring

CRI-O recueille des métriques sur le nombre d'opérations effectuées par le runtime, ainsi que leur latence.
L'intégration Datadog/CRI-O recueille des métriques sur l'utilisation du processeur et de la mémoire du binaire Golang CRI-O.

### Analyse d'entonnoirs
{{< get-metrics-from-git "crio" >}}


### Aide
{{< get-service-checks-from-git "crio" >}}


## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][7].


[1]: http://cri-o.io
[2]: https://github.com/DataDog/integrations-core/blob/master/crio/datadog_checks/crio/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#restart-the-agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-information
[5]: https://github.com/DataDog/integrations-core/blob/master/crio/metadata.csv
[6]: https://github.com/DataDog/integrations-core/blob/master/crio/assets/service_checks.json
[7]: https://docs.datadoghq.com/fr/help/