---
aliases:
  - /fr/integrations/couchdb
categories:
  - data store
ddtype: check
description: >-
  Apache CouchDB est une base de données orientée document qui peut être requêté
  et indexed using JavaScript in a MapReduce fashion.
display_name: couch
doc_link: 'https://docs.datadoghq.com/integrations/couch/'
git_integration_title: couch
guid: 9e7ed68c-669a-40f0-8564-548d49aa8098
has_logo: true
integration_title: CouchDB
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.20.0
name: couch
public_title: Intégration Datadog-CouchDB
short_description: >-
  Suivre et représenter graphiquement l'activité et les métriques de performance
  de CouchDB
support: core
supported_os:
  - linux
  - mac_os
  - windows
version: 2.4.0
---
{{< img src="integrations/couchdb/couchdb_graph.png" alt="CouchDb Graph" responsive="true" >}}
## Aperçu

Capturer vos données CouchDB dans Datadog pour:

* Visualiser les métriques clés de CouchDB.
* Corréler les performances de CouchDB avec le reste de vos applications.

Pour des raisons de performances, la version CouchDB que vous utilisez est mise en cache. Vous ne pouvez donc pas surveiller les instances CouchDB avec des versions différentes avec la même instance d'agent.

## Implémentation
### Installation

Le check CouchDB est packagé avec l'agent, il vous faut donc simplement [installer l'agent](https://app.datadoghq.com/account/settings#agent) sur vos serveurs CouchDB.

### Configuration

Editez le fichier `couch.yaml` dans le dossier `conf.d` de l'Agent. Consultez l'exemple du [canevas  couch.yaml](https://github.com/DataDog/integrations-core/blob/master/couch/conf.yaml.example) pour apprendre toutes les options de configuration disponibles:

```
init_config:

instances:
  - server: http://localhost:5984 # or wherever your CouchDB is listening
  #user: <your_username>
  #password: <your_password>
  #name: <A node's Erlang name> # Only for CouchDB 2.x
  #max_nodes_per_check: If no name is specified, the agent will scan all nodes up. As that may be very long, you can limit how many to collect per check. Default: 20
  #max_dbs_per_check. Maximum number of databases to report on. Default: 50
  #tags: A list of tags applied to all metrics collected. Tags may be simple strings or key-value pairs. Default: []
```

Facultativement, fournissez un `db_whitelist` et` db_blacklist` pour contrôler les bases de données depuis lesquelles l'agent devrait et ne devrait pas collecter de métriques.

[Redémarrez l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent) pour commencer à envoyer vos métriques CouchDB à Datadog.

### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `couch` dans la section Checks:

```
  Checks
  ======
    [...]

    couch
    -------
      - instance #0 [OK]
      - Collected 26 metrics, 0 events & 1 service check

    [...]
```

## Données collectées
### Métriques
{{< get-metrics-from-git "couch" >}}


### Evénements

Le check Couch n'inclut aucun événement pour le moment.

### Checks de Service

`couchdb.can_connect`: Renvoie CRITICAL si l'agent ne peut pas se connecter à CouchDB pour collecter des métriques, sinon OK.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus

* [Monitorer les performances de CouchDB avec Datadog](https://www.datadoghq.com/blog/monitoring-couchdb-with-datadog/)