---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/riak_repl/README.md'
display_name: "Riak\_MDC\_Replication"
git_integration_title: riak_repl
guid: 8a6c8c1e-8c41-4037-9a7b-1eb45f327e3d
integration_id: riak-repl
integration_title: "Riak\_MDC\_Replication"
is_public: true
kind: integration
maintainer: britt.treece@gmail.com
manifest_version: 1.0.0
metric_prefix: riak_repl.
metric_to_check: ''
name: riak_repl
public_title: "Intégration Datadog/Riak\_MDC\_Replication"
short_description: 'Surveillez les performances, la capacité et la santé de vos réplications'
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller Riak Replication [riak-repl][1].

## Implémentation

### Installation

Si vous utilisez la version 6.8 ou ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Riak-Repl sur votre host. Consultez notre guide relatif à l'Agent d'[installation des intégrations de la communauté][2] pour installer les checks à l'aide de l'[Agent ayant une version antérieure à 6.8][3] ou de l'[Agent Docker][4] :

1. Installez le [kit de développement][5].
2. Clonez le dépôt integrations-extras :

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

    ```
    ddev config set extras ./integrations-extras
    ```

4. Pour générer le paquet `riak_repl`, exécutez :

    ```
    ddev -e release build riak_repl
    ```

5. [Téléchargez et lancez l'Agent Datadog][6].
6. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

    ```
    datadog-agent integration install -w <PATH_OF_RIAK_REPL_ARTIFACT_>/<RIAK_REPL_ARTIFACT_NAME>.whl
    ```

7. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][7].

### Configuration

1. Modifiez le fichier `riak_repl.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance riak_repl. Consultez le [fichier d'exemple riak_repl.d/conf.yaml][8] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][9].

### Validation

[Lancez la sous-commande status de l'Agent][10] et cherchez `riak_repl` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "riak_repl" >}}


### Checks de service

riak_repl n'inclut aucun check de service.

### Événements

riak_repl n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][12].

[1]: https://docs.datadoghq.com/fr/integrations/riak_repl
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://docs.datadoghq.com/fr/getting_started/integrations
[8]: https://github.com/DataDog/integrations-extras/blob/master/riak_repl/datadog_checks/riak_repl/data/conf.yaml.example
[9]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#start-stop-restart-the-agent
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[11]: https://github.com/DataDog/integrations-extras/blob/master/riak_repl/metadata.csv
[12]: https://docs.datadoghq.com/fr/help


