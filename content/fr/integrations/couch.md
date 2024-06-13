---
aliases:
- /fr/integrations/couchdb
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    couchdb: assets/dashboards/overview.json
  logs:
    source: couchdb
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    couchdb_processes: assets/saved_views/couchdb_processes.json
  service_checks: assets/service_checks.json
categories:
- data store
- log collection
- autodiscovery
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/couch/README.md
description: Apache CouchDB est une base de données orientée documents qui peut être
  interrogée et indexée à l'aide de JavaScript tout comme MapReduce.
display_name: CouchDB
draft: false
git_integration_title: couch
guid: 9e7ed68c-669a-40f0-8564-548d49aa8098
integration_id: couchdb
integration_title: CouchDB
integration_version: 5.1.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: couch.
metric_to_check:
- couchdb.couchdb.request_time.n
- couchdb.couchdb.request_time
name: couch
process_signatures:
- couchjs
public_title: Intégration Datadog/CouchDB
short_description: Surveillez et représentez graphiquement vos métriques de performance
  et d'activité CouchDB.
support: core
supported_os:
- linux
- mac_os
- windows
---



![Dashboard CouchDB][1]

## Présentation

Enregistrez des données CouchDB dans Datadog pour :

- Visualiser les métriques clés de CouchDB
- Corréler les performances de CouchDB avec le reste de vos applications

Pour des raisons de performances, la version CouchDB que vous utilisez est mise en cache. Vous ne pouvez donc pas surveiller plusieurs versions d'instances CouchDB avec la même instance d'Agent.

## Configuration

### Installation

Le check CouchDB est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs CouchDB.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `couch.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1] pour commencer à recueillir vos données de performance CouchDB. Consultez le [fichier d'exemple couch.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles :

   ```yaml
   init_config:

   instances:
     ## @param server - string - required
     ## The Couch server's url.
     #
     - server: http://localhost:5984
   ```

    **Remarque** : indiquez des paramètres `db_include` et `db_exclude` pour spécifier les bases de données pour lesquelles l'Agent doit recueillir ou non des métriques.

2. [Redémarrez l'Agent][3].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

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
       service: couch
   ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple couch.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                |
| -------------------- | ------------------------------------ |
| `<NOM_INTÉGRATION>` | `couch`                              |
| `<CONFIG_INIT>`      | vide ou `{}`                        |
| `<CONFIG_INSTANCE>`  | `{"server": "http://%%host%%:5984"}` |

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Kubernetes][2].

| Paramètre      | Valeur                                                |
| -------------- | ---------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "couchdb", "service": "<NOM_SERVICE>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][3] et cherchez `couch` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "couch" >}}


### Événements

Le check CouchDB n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "couch" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

- [Surveiller les performances de CouchDB avec Datadog][5]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/couch/images/couchdb_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/help/
[5]: https://www.datadoghq.com/blog/monitoring-couchdb-with-datadog