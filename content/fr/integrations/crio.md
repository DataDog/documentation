---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - containers
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/crio/README.md'
display_name: CRI-O
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

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

L'intégration repose sur l'option `--enable-metrics` de CRI-O, qui est désactivée par défaut, lors de l'exposition des métriques activées à `127.0.0.1:9090/metrics`.

### Configuration

1. Modifiez le fichier `crio.d/conf.yaml` dans le dossier `conf.d/` à la racine du
   répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance CRI-O.
   Consultez le [fichier d'exemple crio.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][4].

### Validation

[Lancez la sous-commande `status` de l'Agent][5] et cherchez `crio` dans la section Checks.

## Données collectées

CRI-O recueille des métriques sur le nombre d'opérations effectuées par le runtime, ainsi que leur latence.
L'intégration Datadog/CRI-O recueille également des métriques sur l'utilisation du processeur et de la mémoire du binaire Golang CRI-O.

### Métriques
{{< get-metrics-from-git "crio" >}}


### Checks de service

CRI-O comprend un check de service relatif à l'accessibilité au endpoint des métriques.

### Événements

CRI-O n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: http://cri-o.io
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://github.com/DataDog/integrations-core/blob/master/crio/datadog_checks/crio/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-information
[6]: https://github.com/DataDog/integrations-core/blob/master/crio/metadata.csv
[7]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}