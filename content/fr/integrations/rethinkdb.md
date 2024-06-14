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
  saved_views:
    rethinkdb_processes: assets/saved_views/rethinkdb_processes.json
  service_checks: assets/service_checks.json
categories:
- data store
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/rethinkdb/README.md
display_name: RethinkDB
draft: false
git_integration_title: rethinkdb
guid: a09f3ed3-c947-413c-a9c6-0dcb641ea890
integration_id: rethinkdb
integration_title: RethinkDB
integration_version: 2.3.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: rethinkdb.
metric_to_check: rethinkdb.config.servers
name: rethinkdb
process_signatures:
- rethinkdb
public_title: Intégration Datadog/RethinkDB
short_description: Recueillez des métriques de statut, de performance et d'autres
  métriques à partir d'un cluster RethinkDB.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

[RethinkDB][1] est une base de données NoSQL orientée documents distribuée, qui exploite tout le potentiel des flux de modifications en temps réel.

Ce check permet de surveiller un cluster RethinkDB avec l'Agent Datadog et de recueillir des métriques sur les performances, la disponibilité des données, la configuration du cluster, et plus encore.

**Remarque** : cette intégration est compatible avec RethinkDB **version 2.3.6 et versions ultérieures**.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check RethinkDB est inclus avec le package de l'[Agent Datadog][3]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Si vous utilisez RethinkDB 2.4+, ajoutez un utilisateur `datadog-agent` et accordez-lui un accès en lecture seule à la base de données `rethinkdb`.
Vous pouvez utiliser les commandes ReQL suivantes. Consultez la page relative [aux autorisations et aux comptes utilisateur][4] de la documentation RethinkDB (en anglais) pour
plus de détails :

    ```python
    r.db('rethinkdb').table('users').insert({'id': 'datadog-agent', 'password': '<PASSWORD>'})
    r.db('rethinkdb').grant('datadog-agent', {'read': True})
    ```

    **Remarque** : si vous utilisez RethinkDB 2.3.x, il n'est pas possible d'accorder un accès à la base de données `rethinkdb`. Ignorez
   cette étape et utilisez plutôt votre [compte administrateur][5] ci-dessous.

2. Modifiez le fichier `rethinkdb.d/conf.yaml` dans le dossier `conf.d/` à la racine du
[répertoire de configuration de votre Agent][6]. Consultez le [fichier d'exemple rethinkdb.d/conf.yaml][7] pour découvrir toutes les options
de configuration disponibles.

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

#### Collecte de logs


1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
    logs_enabled: true
    ```

2. Modifiez ce bloc de configuration dans votre fichier `rethinkdb.d/conf.yaml` pour commencer à recueillir vos logs RethinkDB :

    ```yaml
    logs:
      - type: file
        path: "<LOG_FILE_PATH>"
        source: rethinkdb
        service: "<SERVICE_NAME>"
    ```


    Modifiez la valeur du paramètre `path` en fonction de votre environnement. Consultez le [fichier d'exemple conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][8].

Pour activer les logs pour les environnements Kubernetes, consultez la section [Collecte de logs avec Kubernetes][9].

### Validation

[Lancez la sous-commande status de l'Agent][10] et recherchez `rethinkdb` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "rethinkdb" >}}


### Événements

RethinkDB n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "rethinkdb" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][13].


[1]: https://rethinkdb.com
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://rethinkdb.com/docs/permissions-and-accounts/
[5]: https://rethinkdb.com/docs/security/#the-admin-account
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-core/blob/master/rethinkdb/datadog_checks/rethinkdb/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/rethinkdb/metadata.csv
[12]: https://github.com/DataDog/integrations-core/blob/master/rethinkdb/assets/service_checks.json
[13]: https://docs.datadoghq.com/fr/help/