---
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
  - 'https://github.com/DataDog/integrations-core/blob/master/couchbase/README.md'
display_name: Couchbase
git_integration_title: couchbase
guid: ba7ce7de-4fcb-4418-8c90-329baa6a5d59
integration_id: couchbase
integration_title: Couchbase
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: couchbase.
metric_to_check: couchbase.ram.used
name: couchbase
process_signatures:
  - beam.smp couchbase
public_title: Intégration Datadog/CouchBase
short_description: Surveillez et représentez graphiquement vos métriques de performance et d'activité Couchbase.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Octets Couchbase lus][1]

## Présentation

Identifiez les compartiments occupés, surveillez les ratios de miss de cache, et plus encore. Ce check de l'Agent recueille des métriques sur :

* L'utilisation du disque dur et de la mémoire en fonction des données
* Les connexions actives
* Le nombre total d'objets
* Le nombre d'opérations par seconde
* La taille de la file d'attente d'écriture sur disque

Et bien plus encore

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Couchbase est inclus avec le paquet de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur vos nœuds Couchbase.

### Configuration

1. Modifiez le fichier `couchbase.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et [logs](#collecte-de-logs) Couchbase.
   Consultez le [fichier d'exemple couchbase.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

#### Collecte de métriques

1.  Ajoutez ce bloc de configuration à votre fichier `couchbase.d/conf.yaml` pour commencer à recueillir vos [métriques Couchbase](#metriques) :

      ```
      init_config:

      instances:
        - server: http://localhost:8091 # or wherever your Couchbase is listening
          #username: <your_username>
          #password: <your_password>
      ```

2. [Redémarrez l'Agent][6] pour commencer à envoyer vos métriques Couchbase à Datadog.

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
      logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `couchbase.d/conf.yaml` pour commencer à recueillir vos logs Apache :

    ```yaml
      logs:
          - type: file
            path: /var/log/couchdb/couch.log
            source: couchdb
            service: couchbase
    ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.
    Consultez le [fichier d'exemple couchbase.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][6].


### Validation

[Lancez la sous-commande `status` de l'Agent][7] et cherchez `couchbase` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "couchbase" >}}


### Événements

Le check Couchbase envoie un événement à Datadog à chaque rééquilibrage de cluster.

### Checks de service

- `couchbase.can_connect` :

Renvoie `Critical` si l'Agent n'est pas capable de se connecter à Couchbase pour recueillir des métriques.

- `couchbase.by_node.cluster_membership` :

Renvoie `Critical` si le nœud est basculé.
Renvoie `Warning` si le nœud est ajouté au cluster mais attend un rééquilibrage pour s'activer.
Renvoie `Ok` pour les autres bas.

- `couchbase.by_node.health_status` :

Renvoie `Critical` si le nœud n'est pas sain. Si ce n'est pas le cas, renvoie `Ok`.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][9].

## Pour aller plus loin

* [Surveiller des métriques clés de Couchbase][10].


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/couchbase/images/couchbase_graph.png
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/couchbase/datadog_checks/couchbase/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/couchbase/metadata.csv
[9]: https://docs.datadoghq.com/fr/help
[10]: https://www.datadoghq.com/blog/monitoring-couchbase-performance-datadog


{{< get-dependencies >}}