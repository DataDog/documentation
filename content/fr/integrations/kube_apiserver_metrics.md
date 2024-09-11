---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Kubernetes API Server - Overview: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - containers
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/README.md'
display_name: Métriques du serveur d'API Kubernetes
draft: false
git_integration_title: kube_apiserver_metrics
guid: 406b274b-c44d-4499-a329-efd053b3f538
integration_id: kube-apiserver-metrics
integration_title: Métriques du serveur d'API Kubernetes
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: kube_apiserver.
metric_to_check: kube_apiserver.go_goroutines
name: kube_apiserver_metrics
public_title: Intégration Datadog/métriques du serveur d'API Kubernetes
short_description: Recueillir des métriques du serveur d'API Kubernetes
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check surveille [Kube_apiserver_metrics][1].

## Configuration

### Installation

Le check Kube_apiserver_metrics est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur votre serveur.

**Remarque** : cette intégration ne dispose d'aucun carré dans l'application Datadog. Suivez les étapes ci-dessous pour la configurer.

### Configuration

Le check Kube_apiserver_metrics est principalement utilisé au niveau des clusters.
Consultez la documentation relative aux [checks de cluster][3].
Vous pouvez annoter le service de votre apiserver avec ce qui suit :

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances:
    '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

L'Agent de cluster Datadog programme ensuite le ou les checks pour chaque endpoint sur le ou les Agents Datadog.

Vous pouvez également exécuter le check en configurant directement les endpoints dans le fichier `kube_apiserver_metrics.d/conf.yaml`, dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4].
Consultez le [fichier d'exemple kube_apiserver_metrics.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

Par défaut, l'Agent qui exécute le check essaie d'obtenir le token de porteur du compte du service dans le but d'effectuer l'authentification auprès de APIServer. Si vous n'utilisez pas de système RBAC, définissez `bearer_token_auth` sur `false`.

Enfin, si vous exécutez l'Agent Datadog sur les nœuds principaux, vous pouvez faire appel à [Autodiscovery][5] pour programmer l'exécution du check. Si vous exécutez l'image officielle `k8s.gcr.io/kube-apiserver`, cette opération s'effectue automatiquement.

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `kube_apiserver_metrics` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "kube_apiserver_metrics" >}}


### Checks de service

Kube_apiserver_metrics n'inclut aucun check de service.

### Événements

Kube_apiserver_metrics n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver
[2]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/datadog_checks/kube_apiserver_metrics/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/cluster_agent/clusterchecks/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[6]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/metadata.csv
[8]: https://docs.datadoghq.com/fr/help/