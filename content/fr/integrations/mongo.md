---
aliases:
  - /fr/integrations/mongodb
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
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
short_description: 'Surveillez les performances de lecture/écriture, les réplicas les plus utilisés, les métriques de collecte et plus encore. and more.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard MongoDB][1]

## Présentation

Associez MongoDB à Datadog pour :

* Visualiser les métriques clés de MongoDB
* Corréler les performances de MongoDB avec le reste de vos applications

Vous pouvez également créer vos propres métriques à l'aide de requêtes personnalisées `find`, `count` et `aggregate`.

## Implémentation
### Installation

Le check MongoDB est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos masters MongoDB.

### Configuration

Modifiez le fichier `mongo.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et [logs](#collecte-de-logs) MongoDB. Consultez le [fichier d'exemple mongo.yaml][4] pour découvrir toutes les options de configuration disponibles.

#### Préparer MongoDB

Dans un interpréteur de commandes mongo, créez un utilisateur en lecture seule pour l'Agent Datadog dans la base de données `admin` :

```
# S'authentifier en tant qu'administrateur.
utilisez admin
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

#### Collecte de métriques

* Ajoutez ce bloc de configuration à votre fichier `mongo.d/conf.yaml` pour commencer à recueillir vos [métriques MongoDB](#metriques) :

  ```
  init_config:
  instances:
    - server: mongodb://datadog:<UNIQUEPASSWORD>@localhost:27017/admin
      additional_metrics:
        - collection       # collect metrics for each collection
        - metrics.commands
        - tcmalloc
        - top
  ```
  Consultez le [ficher d'exemple mongo.yaml][4] pour découvrir toutes les options de configuration disponibles, notamment pour les métriques custom.

* [Redémarrez l'Agent][5] pour commencer à envoyer des métriques MongoDB à Datadog.

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

* La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

  ```
  logs_enabled: true
  ```

* Ajoutez ce bloc de configuration à votre fichier `mongo.d/conf.yaml` pour commencer à recueillir vos logs MongoDB :

  ```
  logs:
      - type: file
        path: /var/log/mongodb/mongodb.log
        service: mongo
        source: mongodb
  ```
  Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.
  Consultez le [fichier d'exemple mongo.yaml][4] pour découvrir toutes les options de configuration disponibles.

* [Redémarrez l'Agent][5].

**Pour en savoir plus sur la collecte de logs, consultez [la documentation relative aux logs][6].**

### Validation

[Lancez la sous-commande `status` de l'Agent][7] et cherchez `mongo` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "mongo" >}}


Consultez le [manuel MongoDB 3.0][9] (en anglais) pour en savoir plus sur certaines de ces métriques.

**REMARQUE** : les métriques suivantes ne sont PAS recueillies par défaut :

|                          |                                                   |
| ---                      | ---                                               |
| Préfixe de la métrique            | Élément à ajouter à `additional_metrics` pour recueillir la métrique |
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

**Changements d'état de réplication** :

Ce check génère un événement pour chaque changement d'état de réplication d'un nœud Mongo.

### Checks de service

`mongodb.can_connect` :

Renvoie CRITICAL si l'Agent n'est pas capable de se connecter à MongoDB pour recueillir des métriques. Si ce n'est pas le cas, renvoie OK.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][10].

## Pour aller plus loin
Lisez notre série d'articles de blog à propos de la collecte de métriques MongoDB avec Datadog :

* [Commencez par cet article][11] si vous utilisez le moteur de stockage WiredTiger.
* [Cliquez ici][12] si vous utilisez le moteur de stockage MMAPv1.


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mongo/images/mongo_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/mongo/datadog_checks/mongo/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/logs
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/mongo/metadata.csv
[9]: https://docs.mongodb.org/manual/reference/command/dbStats
[10]: https://docs.datadoghq.com/fr/help
[11]: https://www.datadoghq.com/blog/monitoring-mongodb-performance-metrics-wiredtiger
[12]: https://www.datadoghq.com/blog/monitoring-mongodb-performance-metrics-mmap


{{< get-dependencies >}}