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
display_name: "Riak\_MDC\_Replication"
draft: false
git_integration_title: riak_repl
guid: 8a6c8c1e-8c41-4037-9a7b-1eb45f327e3d
integration_id: riak-repl
integration_title: "Riak\_MDC\_Replication"
is_public: true
kind: integration
maintainer: britt.treece@gmail.com
manifest_version: 1.0.0
metric_prefix: riak_repl.
metric_to_check: riak_repl.server_bytes_sent
name: riak_repl
public_title: "Intégration Datadog/Riak\_MDC\_Replication"
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

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Riak-Repl sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][2] pour installer des checks avec une [version < 6.8 de l'Agent][3] ou avec l'[Agent Docker][4] :

1. [Téléchargez et lancez l'Agent Datadog][5].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-riak_repl==<INTEGRATION_VERSION>
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][6].

### Configuration

1. Modifiez le fichier `riak_repl.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance riak_repl. Consultez le [fichier d'exemple riak_repl.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][8].

### Validation

[Lancez la sous-commande `status` de l'Agent][9] et cherchez `riak_repl` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "riak_repl" >}}


### Checks de service

riak_repl n'inclut aucun check de service.

### Événements

riak_repl n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: https://docs.datadoghq.com/fr/integrations/riak_repl/
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://docs.datadoghq.com/fr/getting_started/integrations/
[7]: https://github.com/DataDog/integrations-extras/blob/master/riak_repl/datadog_checks/riak_repl/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#start-stop-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[10]: https://github.com/DataDog/integrations-extras/blob/master/riak_repl/metadata.csv
[11]: https://docs.datadoghq.com/fr/help/