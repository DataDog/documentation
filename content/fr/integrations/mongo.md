---
aliases:
  - /fr/integrations/mongodb
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    mongodb: assets/dashboards/overview.json
  logs:
    source: mongodb
  metrics_metadata: metadata.csv
  monitors:
    '[MongoDB] High incoming connections': assets/monitors/high_connections.json
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
draft: false
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

**Remarque** : MongoDB v2.6 ou ultérieur est requis pour cette intégration.

## Configuration

### Installation

Le check MongoDB est inclus avec le package de l'[Agent Datadog][2]. Vous n'avez donc rien d'autre à installer.

### Architecture

La plupart des métriques mesurant des éléments précis (tels que la disponibilité, la taille, etc.) doivent être recueillies sur chaque nœud mongod. Les métriques plus globales (comme les statistiques sur les index ou la collecte) doivent être recueillies une seule fois. Ainsi, la configuration de votre Agent dépend du déploiement de votre cluster mongo.

{{< tabs >}}
{{% tab "Déploiement autonome" %}}
#### Déploiement autonome

Pour configurer cette intégration pour un déploiement MongoDB composé d'un seul nœud :

##### Préparer MongoDB
Dans un shell Mongo, créez un utilisateur en lecture seule pour l'Agent Datadog dans la base de données `admin` :

```shell
# S'authentifier en tant qu'administrateur.
use admin
db.auth("admin", "<VOTRE_MOTDEPASSE_ADMIN_MONGODB>")

# Sur MongoDB 2.x, utiliser la commande addUser.
db.addUser("datadog", "<MOTDEPASSEUNIQUE>", true)

# Sur MongoDB 3.x ou une version ultérieure, utiliser la commande createUser.
db.createUser({
  "user": "datadog",
  "pwd": "<MOTDEPASSEUNIQUE>",
  "roles": [
    { role: "read", db: "admin" },
    { role: "clusterMonitor", db: "admin" },
    { role: "read", db: "local" }
  ]
})
```

##### Configurer les Agents
Pour recueillir toutes les métriques Mongo disponibles, vous avez besoin d'un seul Agent. Il est préférable de l'exécuter sur le même nœud. Consultez les options de configuration ci-dessous.
{{% /tab %}}
{{% tab "ReplicaSet" %}}
#### ReplicaSet

Pour configurer cette intégration pour un ReplicaSet MongoDB :

##### Préparer MongoDB
Dans un shell Mongo, authentifiez-vous auprès du serveur primaire et créez un utilisateur en lecture seule pour l'Agent Datadog dans la base de données `admin` :

```shell
# S'authentifier en tant qu'administrateur.
use admin
db.auth("admin", "<VOTRE_MOTDEPASSE_ADMIN_MONGODB>")

# Sur MongoDB 2.x, utiliser la commande addUser.
db.addUser("datadog", "<MOTDEPASSEUNIQUE>", true)

# Sur MongoDB 3.x ou une version ultérieure, utiliser la commande createUser.
db.createUser({
  "user": "datadog",
  "pwd": "<MOTDEPASSEUNIQUE>",
  "roles": [
    { role: "read", db: "admin" },
    { role: "clusterMonitor", db: "admin" },
    { role: "read", db: "local" }
  ]
})
```

##### Configurer les Agents
Vous avez besoin d'un Agent pour chaque membre. Consultez les options de configuration ci-dessous.
Remarque : d'après la [documentation MongoDB][1] (en anglais), la surveillance des nœuds arbitres n'est pas possible à distance. Cependant, tout changement de statut d'un nœud arbitre est signalé à l'Agent connecté au serveur primaire.

[1]: https://docs.mongodb.com/manual/core/replica-set-arbiter/#authentication
{{% /tab %}}
{{% tab "Partitionnement" %}}
#### Partitionnement

Pour configurer cette intégration pour un cluster MongoDB partitionné :

##### Préparer MongoDB
Pour chaque partition de votre cluster, connectez-vous au serveur primaire du ReplicaSet et créez un utilisateur local en lecture seule pour l'Agent Datadog dans la base de données `admin` :

```shell
# S'authentifier en tant qu'administrateur.
use admin
db.auth("admin", "<VOTRE_MOTDEPASSE_ADMIN_MONGODB>")

# Sur MongoDB 2.x, utiliser la commande addUser.
db.addUser("datadog", "<MOTDEPASSEUNIQUE>", true)

# Sur MongoDB 3.x ou une version ultérieure, utiliser la commande createUser.
db.createUser({
  "user": "datadog",
  "pwd": "<MOTDEPASSEUNIQUE>",
  "roles": [
    { role: "read", db: "admin" },
    { role: "clusterMonitor", db: "admin" },
    { role: "read", db: "local" }
  ]
})
```

Créez ensuite le même utilisateur depuis un proxy mongos. Cette étape entraîne également la création d'un utilisateur local dans les serveurs de configuration, ce qui permet une connexion directe.


##### Configurer les Agents
1. Configurer un Agent pour chaque membre de chaque partition.
2. Configurez un Agent pour chaque membre des serveurs de configuration.
3. Configurez un Agent supplémentaire pour vous connecter au cluster via un proxy mongos. Ce dernier peut être entièrement dédié à la surveillance d'un Agent existant.

Remarque : d'après la [documentation MongoDB][1] (en anglais), la surveillance des nœuds arbitres n'est pas possible à distance. Cependant, tout changement de statut d'un nœud arbitre est signalé à l'Agent connecté au serveur primaire.
[1]: https://docs.mongodb.com/manual/core/replica-set-arbiter/#authentication
{{% /tab %}}


### Configuration

Suivez les instructions ci-dessous pour configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `mongo.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple mongo.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:

   instances:
       ## @param hosts - list of strings - required
       ## Hosts to collect metrics from, as is appropriate for your deployment topology.
       ## E.g. for a standalone deployment, specify the hostname and port of the mongod instance.
       ## For replica sets or sharded clusters, see instructions in the sample conf.yaml.
       ## Only specify multiple hosts when connecting through mongos
       #
     - hosts:
         - <HOST>:<PORT>

       ## @param username - string - optional
       ## The username to use for authentication.
       #
       username: datadog

       ## @param password - string - optional
       ## The password to use for authentication.
       #
       password: <UNIQUEPASSWORD>

       ## @param database - string - optional
       ## The database to collect metrics from.
       #
       database: <DATABASE>

       ## @param options - mapping - optional
       ## Connection options. For a complete list, see:
       ## https://docs.mongodb.com/manual/reference/connection-string/#connections-connection-options
       #
       options:
         authSource: admin
   ```

2. [Redémarrez l'Agent][3].

##### Collecte de traces

L'APM Datadog s'intègre à Mongo pour vous permettre de visualiser les traces sur l'ensemble de votre système distribué. La collecte de traces est activée par défaut dans les versions 6 et ultérieures de l'Agent Datadog. Pour commencer à recueillir des traces :

1. [Activez la collecte de traces dans Datadog][4].
2. [Instrumentez l'application qui envoie des requêtes à Mongo][5].

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

    Modifiez les valeurs des paramètres `service` et `path` en fonction de votre environnement. Consultez le [fichier d'exemple mongo.yaml][2] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mongo/datadog_checks/mongo/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/fr/tracing/send_traces/
[5]: https://docs.datadoghq.com/fr/tracing/setup/
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                                                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `mongo`                                                                                                                                   |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                                                                             |
| `<CONFIG_INSTANCE>`  | `{"hosts": ["%%host%%:%%port%%], "username": "datadog", "password : "<MOTDEPASSEUNIQUE>", "database": "<BASEDEDONNÉES>"}` |

##### Collecte de traces

L'APM dédié aux applications conteneurisées est pris en charge par les hosts exécutant les versions 6 et ultérieures de l'Agent, mais nécessite une configuration supplémentaire pour recueillir des traces.

Variables d'environnement requises sur le conteneur de l'Agent :

| Paramètre                    | Valeur     |
| ---------------------------- | --------- |
| `<DD_API_KEY>`               | `api_key` |
| `<DD_APM_ENABLED>`           | true      |
| `<DD_APM_NON_LOCAL_TRAFFIC>` | true      |

Consultez les sections relatives au [tracing d'applications Kubernetes][2] et à la [configuration de DaemonSet Kubernetes][3] pour consulter la liste complète des variables d'environnement et configurations disponibles.

Ensuite, [instrumentez votre conteneur d'application][4] et définissez `DD_AGENT_HOST` sur le nom du conteneur de votre Agent.


##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][5].

| Paramètre      | Valeur                                       |
| -------------- | ------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "mongodb", "service": "mongo"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/apm/?tab=java
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[4]: https://docs.datadoghq.com/fr/tracing/setup/
[5]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][3] et cherchez `mongo` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "mongo" >}}


Consultez la [documentation sur MongoDB 3.0][4] (en anglais) pour en savoir plus sur certaines de ces métriques.

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
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à MongoDB pour recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

## Pour aller plus loin

Lisez notre série d'articles de blog à propos de la collecte de métriques MongoDB avec Datadog :

- [Surveillance des métriques de performance MongoDB (WiredTiger)][6]
- [Surveillance des métriques de performance MongoDB (MMAP)][7]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mongo/images/mongo_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.mongodb.org/manual/reference/command/dbStats
[5]: https://docs.datadoghq.com/fr/help/
[6]: https://www.datadoghq.com/blog/monitoring-mongodb-performance-metrics-wiredtiger
[7]: https://www.datadoghq.com/blog/monitoring-mongodb-performance-metrics-mmap