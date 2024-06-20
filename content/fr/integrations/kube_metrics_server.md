---
assets:
  dashboards:
    Kubernetes Metrics Server - Overview: assets/dashboards/overview.json
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
  - 'https://github.com/DataDog/integrations-core/blob/master/kube_metrics_server/README.md'
display_name: "Kube\_Metrics\_Server"
draft: false
git_integration_title: kube_metrics_server
guid: 7a477937-4db8-4277-bd58-9e56ac064185
integration_id: kube-metrics-server
integration_title: "Kubernetes\_Metrics\_Server"
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: kube_metrics_server.
metric_to_check: kube_metrics_server.process.open_fds
name: kube_metrics_server
public_title: "Intégration Datadog/Kubernetes\_Metrics\_Server"
short_description: Surveille le serveur de métriques Kubernetes
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check surveille [Kube_metrics_server][1] v0.3.0+, qui fait partie du plan de contrôle de Kubernetes.

## Configuration

### Installation

Le check Kube_metrics_server est inclus dans le package de l'[Agent Datadog][2]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `kube_metrics_server.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance kube_metrics_server. Consultez le [fichier d'exemple kube_metrics_server.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/kube_metrics_server/datadog_checks/kube_metrics_server/data/conf.yaml.example
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery Kubernetes][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                |
| -------------------- | ---------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `kube_metrics_server `                                         |
| `<CONFIG_INIT>`      | vide ou `{}`                                        |
| `<CONFIG_INSTANCE>`  | `{"prometheus_url": "https://%%host%%:443/metrics"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### SSL

Si votre endpoint est sécurisé, une configuration supplémentaire est requise :

1. Identifiez le certificat utilisé pour sécuriser l'endpoint des métriques.

2. Montez le fichier de certificat associé dans le pod de l'Agent.

3. Appliquez votre configuration SSL. Référez-vous au [fichier de configuration par défaut][3] pour en savoir plus.

### Validation

[Lancez la sous-commande status de l'Agent][4] et cherchez `kube_metrics_server` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "kube_metrics_server" >}}


### Checks de service

**kube_metrics_server.prometheus.health** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter aux endpoints de métriques.

### Événements

kube_metrics_server n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].


[1]: https://github.com/kubernetes-incubator/metrics-server
[2]: https://github.com/DataDog/integrations-core/blob/master/kube_metrics_server/datadog_checks/kube_metrics_server/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/fr/help/