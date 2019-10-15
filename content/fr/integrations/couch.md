---
aliases:
  - /fr/integrations/couchdb
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/couch/README.md'
description: "Apache\_CouchDB est une base de données orientée documents qui peut être interrogée et indexée à l'aide de JavaScript tout comme MapReduce. indexed using JavaScript in a MapReduce fashion."
display_name: CouchDB
git_integration_title: couch
guid: 9e7ed68c-669a-40f0-8564-548d49aa8098
integration_id: couchdb
integration_title: CouchDB
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: couch.
metric_to_check: couchdb.couchdb.request_time
name: couch
process_signatures:
  - couchjs
public_title: Intégration Datadog/CouchDB
short_description: Surveillez et représentez graphiquement vos métriques de performance et d'activité CouchDB.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard CouchDB][1]

## Présentation

Enregistrez des données CouchDB dans Datadog pour :

* Visualiser les métriques clés de CouchDB
* Corréler les performances de CouchDB avec le reste de vos applications

Pour des raisons de performances, la version CouchDB que vous utilisez est mise en cache. Vous ne pouvez donc pas surveiller plusieurs versions d'instances CouchDB avec la même instance d'Agent.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check CouchDB est inclus avec le paquet de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur vos serveurs CouchDB.

### Configuration

#### Collecte de métriques

1. Modifiez le fichier `couch.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos données de performance CouchDB. Consultez le [fichier d'exemple couch.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. Ajoutez ce bloc de configuration à votre fichier `couch.d/conf.yaml` pour commencer à recueillir vos [métriques CouchDB](#metriques) :

      ```yaml
      init_config:

      instances:
        - server: http://localhost:5984 # or wherever your CouchDB is listening
        #username: <your_username>
        #password: <your_password>
        #name: <A node's Erlang name> # Only for CouchDB 2.x
        #max_nodes_per_check: If no name is specified, the agent will scan all nodes up. As that may be very long, you can limit how many to collect per check. Default: 20
        #max_dbs_per_check. Maximum number of databases to report on. Default: 50
        #tags: A list of tags applied to all metrics collected. Tags may be simple strings or key-value pairs. Default: []
      ```

    Vous pouvez également fournir des paramètres `db_whitelist` et `db_blacklist` pour contrôler les bases de données pour lesquelles l'Agent doit recueillir ou non des métriques.

3. [Redémarrez l'Agent][6] pour commencer à envoyer vos métriques CouchDB à Datadog.

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
      logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `couch.d/conf.yaml` pour commencer à recueillir vos logs CouchDB :

    ```yaml
      logs:
          - type: file
            path: /var/log/couchdb/couch.log
            source: couchdb
            sourcecategory: database
            service: couch
    ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple couch.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `couch` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "couch" >}}


### Événements

Le check CouchDB n'inclut aucun événement.

### Checks de service

**couchdb.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à CouchDB pour recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][9].

## Pour aller plus loin

* [Surveiller les performances de CouchDB avec Datadog][10]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/couch/images/couchdb_dashboard.png
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/couch/metadata.csv
[9]: https://docs.datadoghq.com/fr/help
[10]: https://www.datadoghq.com/blog/monitoring-couchdb-with-datadog


{{< get-dependencies >}}