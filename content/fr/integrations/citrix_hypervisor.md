---
aliases:
- /fr/xenserver
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: citrix_hypervisor
  metrics_metadata: metadata.csv
  monitors:
    Host CPU high: assets/recommended_monitors/host_cpu_high.json
    VM CPU high: assets/recommended_monitors/vm_cpu_high.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- cloud
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/README.md
display_name: Citrix Hypervisor
draft: false
git_integration_title: citrix_hypervisor
guid: d6c1911b-f7fd-4537-af4f-1aa40dae40c2
integration_id: citrix-hypervisor
integration_title: Citrix Hypervisor
integration_version: 2.1.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: citrix_hypervisor.
metric_to_check: citrix_hypervisor.host.cpu
name: citrix_hypervisor
public_title: Citrix Hypervisor
short_description: Surveillez les performances et la santé d'un host Citrix Hypervisor.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check surveille [Citrix Hypervisor][1] avec l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### Installation

Le check Citrix Hypervisor est inclus avec le package de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur votre serveur. Pour surveiller les hyperviseurs Citrix, il est recommandé d'installer un Agent Datadog sur chaque hyperviseur.

#### Utilisateur Datadog

Pour surveiller le service, l'intégration Citrix Hypervisor nécessite un utilisateur disposant au moins d'un accès [`read-only`][4].

### Configuration

#### Host

1. Modifiez le fichier `citrix_hypervisor.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Citrix Hypervisor. Consultez le [fichier d'exemple citrix_hypervisor.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

#### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `citrix_hypervisor.d/conf.yaml` pour commencer à recueillir vos logs Citrix Hypervisor :
    ```yaml
    logs:
    - type: file
      path: /var/log/xensource.log
      source: citrix_hypervisor
    ```
    Modifiez la valeur `path` en fonction de votre environnement. Consultez le [fichier d'exemple `citrix_hypervisor.d/conf.yaml`][5] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `citrix_hypervisor` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "citrix_hypervisor" >}}


### Événements

L'intégration Citrix Hypervisor n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "citrix_hypervisor" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].


[1]: https://www.citrix.com/products/citrix-hypervisor/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.citrix.com/en-us/xencenter/7-1/rbac-roles.html
[5]: https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/datadog_checks/citrix_hypervisor/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/assets/service_checks.json
[10]: https://docs.datadoghq.com/fr/help/