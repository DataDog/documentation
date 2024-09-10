---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- data store
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/riak_repl/README.md
display_name: Riak MDC Replication
draft: false
git_integration_title: riak_repl
guid: 8a6c8c1e-8c41-4037-9a7b-1eb45f327e3d
integration_id: riak-repl
integration_title: Riak MDC Replication
integration_version: 1.0.1
is_public: true
custom_kind: integration
maintainer: britt.treece@gmail.com
manifest_version: 1.0.0
metric_prefix: riak_repl.
metric_to_check: riak_repl.server_bytes_sent
name: riak_repl
public_title: Intégration Datadog/Riak MDC Replication
short_description: Surveillez les performances, la capacité et la santé de vos réplications
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check permet de surveiller Riak Replication [riak-repl][1].

## Configuration

Le check Riak-Repl n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Riak-Repl sur votre host. Consultez la section [Utiliser les intégrations de la communauté][3] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-riak_repl==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][4] de base.

### Configuration

1. Modifiez le fichier `riak_repl.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance riak_repl. Consultez le [fichier d'exemple riak_repl.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

### Validation

Lancez la [sous-commande status de l'Agent][7] et cherchez `riak_repl` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "riak_repl" >}}


### Checks de service

L'intégration Riak-Repl n'inclut aucun check de service.

### Événements

L'intégration Riak-Repl n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://docs.datadoghq.com/fr/integrations/riak_repl/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/riak_repl/datadog_checks/riak_repl/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#start-stop-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/riak_repl/metadata.csv
[9]: https://docs.datadoghq.com/fr/help/