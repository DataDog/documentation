---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    kube_scheduler: assets/dashboards/overview.json
  logs:
    source: kube_scheduler
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - orchestration
  - containers
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/README.md'
display_name: Kube_scheduler
draft: false
git_integration_title: kube_scheduler
guid: ec7c029f-86c2-4202-9368-1904998a646c
integration_id: kube-scheduler
integration_title: Kubernetes Scheduler
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: kube_scheduler.
metric_to_check: kube_scheduler.threads
name: kube_scheduler
public_title: "Intégration Datadog/Kubernetes\_Scheduler"
short_description: "Surveillance de Kubernetes\_Scheduler"
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check surveille [Kubernetes Scheduler ][1] qui fait partie du plan de contrôle de Kubernetes.

**Remarque** : ce check ne recueille pas de données à partir des clusters Amazon EKS, car ces services ne sont pas exposés.

## Configuration

### Installation

Le check Kubernetes Scheduler est inclus avec le package de l'[Agent Datadog][2].
Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][3] pour découvrir comment appliquer les paramètres ci-dessous.

#### Collecte de métriques

1. Modifiez le fichier `kube_scheduler.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance kube_scheduler. Consultez le [fichier d'exemple kube_scheduler.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][4].

#### Collecte de logs

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][5].

| Paramètre      | Valeur                                     |
|----------------|-------------------------------------------|
| `<CONFIG_LOG>` | `{"source": "kube_scheduler", "service": "<NOM_SERVICE>"}` |

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `kube_scheduler` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "kube_scheduler" >}}


### Checks de service

**kube_scheduler.prometheus.health** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter aux endpoints de métriques. Si ce n'est pas le cas, renvoie `OK`.

### Événements

Kube Scheduler n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler
[2]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/datadog_checks/kube_scheduler/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/metadata.csv
[8]: https://docs.datadoghq.com/fr/help/