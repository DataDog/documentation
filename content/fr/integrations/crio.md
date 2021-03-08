---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    crio: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - containers
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/crio/README.md'
display_name: CRI-O
draft: false
git_integration_title: crio
guid: 40fd8230-d178-4e8e-9e6a-6ce4acc19a85
integration_id: cri-o
integration_title: CRI-O
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: crio.
metric_to_check: crio.operations.count
name: crio
public_title: Intégration Datadog/CRI-O
short_description: Surveillez toutes vos métriques CRI-O avec Datadog.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check surveille [CRI-O][1].

## Configuration

### Installation

L'intégration repose sur l'option `--enable-metrics` de CRI-O, qui est désactivée par défaut, lors de l'exposition des métriques activées sur `127.0.0.1:9090/metrics`.

### Configuration

1. Modifiez le fichier `crio.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance CRI-O. Consultez le [fichier d'exemple crio.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][3].

### Validation

[Lancez la sous-commande status de l'Agent][4] et cherchez `crio` dans la section Checks.

## Données collectées

CRI-O recueille des métriques sur le nombre d'opérations effectuées par le runtime, ainsi que leur latence.
L'intégration Datadog/CRI-O recueille des métriques sur l'utilisation du processeur et de la mémoire du binaire Golang CRI-O.

### Métriques
{{< get-metrics-from-git "crio" >}}


### Checks de service

**crio.prometheus.health** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter aux endpoints de métriques.

### Événements

CRI-O n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: http://cri-o.io
[2]: https://github.com/DataDog/integrations-core/blob/master/crio/datadog_checks/crio/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#restart-the-agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-information
[5]: https://github.com/DataDog/integrations-core/blob/master/crio/metadata.csv
[6]: https://docs.datadoghq.com/fr/help/