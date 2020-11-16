---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    RethinkDB Overview: assets/dashboards/overview.json
  logs:
    source: rethinkdb
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/rethinkdb/README.md'
display_name: RethinkDB
draft: false
git_integration_title: rethinkdb
guid: a09f3ed3-c947-413c-a9c6-0dcb641ea890
integration_id: rethinkdb
integration_title: RethinkDB
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: rethinkdb.
metric_to_check: rethinkdb.config.servers
name: rethinkdb
process_signatures:
  - rethinkdb
public_title: Intégration Datadog/RethinkDB
short_description: 'Recueillez des métriques de statut, de performance et d''autres métriques à partir d''un cluster RethinkDB.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

[RethinkDB][1] est une base de données NoSQL orientée documents distribuée, qui exploite tout le potentiel des flux à modification en temps réel.

Ce check permet de surveiller un cluster RethinkDB avec l'Agent Datadog et de recueillir des métriques sur les performance, la disponibilité des données, la configuration d'un cluster, et plus encore.

**Remarque** : cette intégration est compatible avec RethinkDB **version 2.3.6 et versions ultérieures**.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check RethinkDB est inclus avec le package de l'[Agent Datadog][3]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Si vous utilisez RethinkDB 2.4+, ajoutez un utilisateur `datadog-agent` et accordez-lui un accès en lecture seule à la base de données `rethinkdb`. Les commandes ReQL suivantes peuvent être utilisées. Consultez la page [Permissions and user accounts][4] de RethinkDB pour plus de détails.

    ```python
    r.db('rethinkdb').table('users').insert({'id': 'datadog-agent', 'password': '<PASSWORD>'})
    r.db('rethinkdb').grant('datadog-agent', {'read': True})
    ```

    **Remarque** : si vous utilisez RethinkDB 2.3.x, il n'est pas possible d'accorder un accès à la base de données `rethinkdb`. Ignorez cette étape et utilisez plutôt votre [compte administrateur][5] ci-dessous.

2. Modifiez le fichier `rethinkdb.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][6]. Consultez le [fichier d'exemple rethinkdb.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

    ```yaml
    init_config:

    instances:
      - host: localhost
        port: 28015
        user: "<USER>"
        password: "<PASSWORD>"
    ```

3. [Redémarrez l'Agent][8].

**Remarque** : cette intégration recueille des métriques de tous les serveurs au sein du cluster ; vous n'avez donc besoin que d'un seul Agent.

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
    logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `rethinkdb.d/conf.yaml` pour commencer à recueillir vos logs RethinkDB :

    ```yaml
    logs:
      - type: file
        path: "<LOG_FILE_PATH>"
        source: rethinkdb
        service: "<SERVICE_NAME>"
    ```

    Modifiez les valeurs des paramètres `path` et `service` en fonction de votre environnement. Consultez le [fichier d'exemple rethinkdb.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][8].

Consultez la [documentation de Datadog][9] pour découvrir comment configurer l'Agent afin de recueillir les logs dans un environnement Kubernetes.

### Validation

[Lancez la sous-commande status de l'Agent][10] et recherchez `rethinkdb` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "rethinkdb" >}}


### Checks de service

**rethinkdb.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter au serveur RethinkDB configuré. Si ce n'est pas le cas, renvoie `OK`.

**rethinkdb.table_status.status.ready_for_outdated_reads** :<br>
Renvoie `OK` si toutes les partitions d'une table sont prêtes à accepter des requêtes de lecture obsolètes. Si ce n'est pas le cas, renvoie `WARNING`.

**rethinkdb.table_status.status.ready_for_reads** :<br>
Renvoie `OK` si toutes les partitions d'une table sont prêtes à accepter des requêtes de lecture. Si ce n'est pas le cas, renvoie `WARNING`.

**rethinkdb.table_status.status.ready_for_writes** :<br>
Renvoie `OK` si toutes les partitions d'une table sont prêtes à accepter des requêtes d'écriture. Si ce n'est pas le cas, renvoie `WARNING`.

**rethinkdb.table_status.status.all_replicas_ready** :<br>
Renvoie `OK` si tous les réplicas sont prêts pour des opérations de lecture et d'écriture. Si ce n'est pas le cas, renvoie `WARNING` (par exemple, si des backfills sont en cours).

### Événements

RethinkDB n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][12].

[1]: https://rethinkdb.com/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/fr/agent/
[4]: https://rethinkdb.com/docs/permissions-and-accounts/
[5]: https://rethinkdb.com/docs/security/#the-admin-account
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-core/blob/master/rethinkdb/datadog_checks/rethinkdb/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/rethinkdb/metadata.csv
[12]: https://docs.datadoghq.com/fr/help/