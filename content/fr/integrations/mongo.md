---
aliases:
  - /fr/integrations/mongodb
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  monitors: {}
  saved_views:
    operations_by_type_overview: assets/saved_views/operations_by_type_overview.json
    queries: assets/saved_views/queries.json
    queries_by_type_overview: assets/saved_views/queries_by_type_overview.json
    slow_queries: assets/saved_views/slow_queries.json
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
  - autodiscovery
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/mongo/README.md'
display_name: MongoDB
git_integration_title: mongo
guid: d51c342e-7a02-4611-a47f-1e8eade5735c
integration_id: mongodb
integration_title: MongoDB
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: mongodb.
metric_to_check: mongodb.connections.available
name: mongo
process_signatures:
  - mongod
public_title: Intégration Datadog/MongoDB
short_description: 'Surveillez les performances de lecture/écriture, les réplicas les plus utilisés, les métriques de collecte et plus encore.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard MongoDB][1]

## Présentation

Associez MongoDB à Datadog pour :

- Visualiser les métriques clés de MongoDB
- Corréler les performances de MongoDB avec le reste de vos applications

Vous pouvez également créer vos propres métriques à l'aide de requêtes personnalisées `find`, `count` et `aggregate`.

**Remarque** : MongoDB v2.6 ou une version ultérieure est requise pour cette intégration.

## Configuration

### Installation

Le check MongoDB est inclus avec le paquet de l'[Agent Datadog][2]. Vous n'avez donc rien d'autre à installer.

### Configuration

Suivez les instructions ci-dessous pour configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

#### Host

##### Préparer MongoDB

Dans un shell Mongo, créez un utilisateur en lecture seule pour l'Agent Datadog dans la base de données `admin` :

```
# S'authentifier en tant qu'administrateur.
use admin
db.auth("admin", "<VOTRE_MOTDEPASSE_ADMIN_MONGODB>")

# Sur MongoDB 2.x, utiliser la commande addUser.
db.addUser("datadog", "<MOTDEPASSEUNIQUE>", true)

# Sur MongoDB 3.x ou une version ultérieure, utiliser la commande createUser.
db.createUser({
  "user":"datadog",
  "pwd": "<MOTDEPASSEUNIQUE>",
  "roles" : [
    {role: 'read', db: 'admin' },
    {role: 'clusterMonitor', db: 'admin'},
    {role: 'read', db: 'local' }
  ]
})
```

##### Collecte de métriques

1. Modifiez le fichier `mongo.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3]. Consultez le [fichier d'exemple mongo.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:
   instances:
     ## @param server - string - required
     ## Specify the MongoDB URI, with database to use for reporting (defaults to "admin")
     ## E.g. mongodb://datadog:LnCbkX4uhpuLHSUrcayEoAZA@localhost:27016/admin
     #
     - server: "mongodb://datadog:<UNIQUEPASSWORD>@<HOST>:<PORT>/<DB_NAME>"

       ## @param replica_check - boolean - required - default: true
       ## Whether or not to read from available replicas.
       ## Disable this if any replicas are inaccessible to the agent.
       #
       replica_check: true

       ## @param additional_metrics - list of strings - optional
       ## By default, the check collects a sample of metrics from MongoDB.
       ## This  parameter instructs the check to collect additional metrics on specific topics.
       ## Available options are:
       ##   * `metrics.commands` - Use of database commands
       ##   * `tcmalloc` -  TCMalloc memory allocator
       ##   * `top` - Usage statistics for each collection
       ##   * `collection` - Metrics of the specified collections
       #
       additional_metrics:
         - metrics.commands
         - tcmalloc
         - top
         - collection
   ```

2. [Redémarrez l'Agent][5].

##### Collecte de traces

L'APM Datadog s'intègre à Mongo pour visualiser les traces sur l'ensemble de votre système distribué. La collecte de traces est activée par défaut dans les versions 6 et ultérieures de l'Agent Datadog. Pour commencer à recueillir des traces :

1. [Activez la collecte de traces dans Datadog][6].
2. [Instrumentez l'application qui envoie des requêtes à Mongo][7].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `mongo.d/conf.yaml` pour commencer à recueillir vos logs MongoDB :

   ```yaml
   logs:
     - type: file
       path: /var/log/mongodb/mongodb.log
       service: mongo
       source: mongodb
   ```

    Modifiez les valeurs des paramètres `service` et `path` en fonction de votre environnement. Consultez le [fichier d'exemple mongo.yaml][4] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][5].

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][8] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                                                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `mongo`                                                                                                                                                                         |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                                                                                                                   |
| `<CONFIG_INSTANCE>`  | `{"server": "mongodb://datadog:<MOTDEPASSEUNIQUE>@%%host%%:%%port%%/<NOM_BDD>", "replica_check": true, "additional_metrics": "metrics.commands","tcmalloc","top","collection"]}` |

##### Collecte de traces

L'APM pour applications conteneurisées est pris en charge sur les hosts exécutant les versions 6 et ultérieures de l'Agent, mais nécessite une configuration supplémentaire pour commencer à recueillir des traces.

Variables d'environnement requises sur le conteneur de l'Agent :

| Paramètre            | Valeur                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

Consultez les sections [Tracing d'applications Kubernetes][9] et [Configuration de DaemonSet Kubernetes][11] pour consulter la liste complète des variables d'environnement et configurations disponibles.

Ensuite, [instrumentez votre conteneur d'application][7] et définissez `DD_AGENT_HOST` sur le nom du conteneur de votre Agent.


##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][11].

| Paramètre      | Valeur                                       |
| -------------- | ------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "mongodb", "service": "mongo"}` |

### Validation

[Lancez la sous-commande status de l'Agent][12] et cherchez `mongo` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "mongo" >}}


Consultez la [documentation sur MongoDB 3.0][14] (en anglais) pour en savoir plus sur certaines de ces métriques.

**REMARQUE** : les métriques suivantes ne sont PAS recueillies par défaut. Utilisez le paramètre `additional_metrics` dans votre fichier `mongo.d/conf.yaml` pour les recueillir :

| Préfixe de la métrique            | Élément à ajouter à `additional_metrics` pour recueillir la métrique |
| ------------------------ | ------------------------------------------------- |
| mongodb.collection       | collection                                        |
| mongodb.commands         | top                                               |
| mongodb.getmore          | top                                               |
| mongodb.insert           | top                                               |
| mongodb.queries          | top                                               |
| mongodb.readLock         | top                                               |
| mongodb.writeLock        | top                                               |
| mongodb.remove           | top                                               |
| mongodb.total            | top                                               |
| mongodb.update           | top                                               |
| mongodb.writeLock        | top                                               |
| mongodb.tcmalloc         | tcmalloc                                          |
| mongodb.metrics.commands | metrics.commands                                  |

### Événements

**Changements de statut de réplication** :<br>
Ce check émet un événement chaque fois que le statut de réplication d'un nœud Mongo change.

### Checks de service

**mongodb.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à MongoDB pour recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][15].

## Pour aller plus loin

Lisez notre série d'articles de blog à propos de la collecte de métriques MongoDB avec Datadog :

- [Surveillance des métriques de performance MongoDB (WiredTiger)][16]
- [Surveillance des métriques de performance MongoDB (MMAP)][17]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mongo/images/mongo_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/mongo/datadog_checks/mongo/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/tracing/send_traces/
[7]: https://docs.datadoghq.com/fr/tracing/setup/
[8]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[9]: https://docs.datadoghq.com/fr/agent/kubernetes/apm/?tab=java
[10]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[11]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
[12]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[13]: https://github.com/DataDog/integrations-core/blob/master/mongo/metadata.csv
[14]: https://docs.mongodb.org/manual/reference/command/dbStats
[15]: https://docs.datadoghq.com/fr/help/
[16]: https://www.datadoghq.com/blog/monitoring-mongodb-performance-metrics-wiredtiger
[17]: https://www.datadoghq.com/blog/monitoring-mongodb-performance-metrics-mmap