---
assets:
  dashboards:
    kube_controller_manager: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - orchestration
  - containers
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/README.md'
display_name: "Kubernetes\_Controller\_Manager"
draft: false
git_integration_title: kube_controller_manager
guid: 34156dda-9288-4968-962b-6b29e1753d33
integration_id: kube-controller-manager
integration_title: "Kubernetes\_Controller\_Manager"
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: kube_controller_manager.
metric_to_check: kube_controller_manager.threads
name: kube_controller_manager
public_title: "Intégration Datadog/Kubernetes\_Controller\_Manager"
short_description: "Surveillez Kubernetes\_Controller\_Manager."
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check surveille [Kubernetes Controller Manager][1] qui fait partie du plan de contrôle de Kubernetes.

**Remarque** : ce check ne recueille pas de données pour les clusters Amazon EKS, car ces services ne sont pas exposés.

## Configuration

### Installation

Le check Kubernetes Controller Manager est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

Cette intégration nécessite l'accès au endpoint des métriques du gestionnaire de contrôleurs. Elle n'est généralement pas exposée dans les clusters Container-as-a-Service.

1. Modifiez le fichier `kube_controller_manager.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance kube_controller_manager. Consultez le [fichier d'exemple kube_controller_manager.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][3].

### Validation

[Lancez la sous-commande `status` de l'Agent][4] et cherchez `kube_controller_manager` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "kube_controller_manager" >}}


### Checks de service

**kube_controller_manager.prometheus.health** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter aux endpoints de métriques.

### Événements

Le check Kubernetes Controller Manager n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager
[2]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/datadog_checks/kube_controller_manager/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/metadata.csv
[6]: https://docs.datadoghq.com/fr/help/