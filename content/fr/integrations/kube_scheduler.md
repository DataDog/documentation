---
assets:
  dashboards: {}
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
git_integration_title: kube_scheduler
guid: ec7c029f-86c2-4202-9368-1904998a646c
integration_id: kube-scheduler
integration_title: Kubernetes Scheduler
is_public: true
kind: intégration
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

## Implémentation

### Installation

Le check Kubernetes Scheduler est inclus avec le paquet de l'[Agent Datadog][2].
Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

#### Collecte de métriques

1. Modifiez le fichier `kube_scheduler.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance kube_scheduler. Consultez le [fichier d'exemple kube_scheduler.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][3].

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans votre [configuration daemonSet][4] :

    ```
    (...)
      env:
        (...)
        - name: DD_LOGS_ENABLED
            value: "true"
        - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
            value: "true"
    (...)
    ```

2. Assurez-vous que le socket Docker est monté sur l'Agent Datadog comme dans [ce manifeste][5].

3. [Redémarrez l'Agent][3].

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
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#restart-the-agent
[4]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/#log-collection
[5]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/#create-manifest
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/metadata.csv
[8]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}