---
assets:
  dashboards:
    Cilium Overview: assets/dashboards/overview.json
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - containers
  - network
  - security
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/cilium/README.md'
display_name: Cilium
git_integration_title: cilium
guid: 1d9db288-4678-4ede-9ba0-8b04a8ae31c2
integration_id: cilium
integration_title: Cilium
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: cilium.
metric_to_check: cilium.endpoint.count
name: cilium
public_title: Intégration Datadog/Cilium
short_description: Recueillez des métriques spécifiques aux agents de pod et des métriques sur l'operator du cluster entier
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [Cilium][1] avec l'Agent Datadog. L'intégration peut recueillir des métriques à partir de `cilium-agent` ou de `cilium-operator`.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Cilium est inclus avec le paquet de l'[Agent Datadog][3], mais des opérations d'installation supplémentaires sont nécessaires pour l'exposition des métriques Prometheus.

1. Pour activer les métriques Prometheus dans `cilium-agent` et `cilium-operator`, déployez Cilium en définissant la valeur Helm `global.prometheus.enabled=true`.

2. Vous pouvez également activer les métriques Prometheus séparément dans le `cilium-agent` :
    * Ajoutez `--prometheus-serve-addr=:9090` à la section `args` de la configuration DaemonSet pour Cilium.
        ```
        [...]
            spec:
                containers:
                - args:
                    - --prometheus-serve-addr=:9090
        ```
    ou dans le `cilium-operator` :
    * Ajoutez `--enable-metrics` à la section `args` de la configuration de déploiement de Cilium.
        ```
        [...]
            spec:
                containers:
                - args:
                    - --enable-metrics
        ```

Pour recueillir les métriques `cilium-operator` du cluster entier, consultez la section [Agent de cluster][9].

### Configuration

1. Modifiez le fichier `cilium.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Cilium. Consultez le [fichier d'exemple cilium.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.
    * Pour recueillir les métriques `cilium-agent` activez l'option `agent_endpoint`.
    * Pour recueillir les métriques `cilium-operator`, activez l'option `operator_endpoint`.

2. [Redémarrez l'Agent][5].

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `cilium` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "cilium" >}}


### Checks de service

`cilium.prometheus.health` :
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter aux endpoints de métriques. Si ce n'est pas le cas, renvoie `OK`.

### Événements

Cilium n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://cilium.io
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://docs.datadoghq.com/fr/agent
[4]: https://github.com/DataDog/integrations-core/blob/master/cilium/datadog_checks/cilium/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/cilium/metadata.csv
[8]: https://docs.datadoghq.com/fr/help
[9]: https://docs.datadoghq.com/fr/agent/cluster_agent


