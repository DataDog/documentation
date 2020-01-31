---
aliases:
  - /fr/integrations/elasticsearch
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
  - autodiscovery
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/elastic/README.md'
display_name: Elasticsearch
git_integration_title: elastic
guid: d91d91bd-4a8e-4489-bfb1-b119d4cc388a
integration_id: elasticsearch
integration_title: Elasticsearch
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: elasticsearch.
metric_to_check: elasticsearch.search.query.total
name: elastic
process_signatures:
  - java org.elasticsearch.bootstrap.Elasticsearch
public_title: Intégration Datadog/Elasticsearch
short_description: Surveillez le statut global d'un cluster en mesurant l'utilisation de tas de la JVM et une vaste gamme de données.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![dashboard Elasticsearch][1]

## Présentation

Obtenez les dernières données sur la santé de votre cluster Elasticsearch, que ce soit pour son statut global ou l'utilisation de tas de la JVM. Recevez des notifications lorsque vous devez réactiver un réplica, renforcer les capacités du cluster ou ajuster sa configuration. Surveillez ensuite les métriques de cluster obtenues.

Le check Elasticsearch de l'Agent Datadog recueille des métriques pour la recherche et l'indexation des performances, l'utilisation et le nettoyage de la mémoire, la disponibilité des nœuds, les statistiques des partitions, les performances du disque et l'espace disque, les tâches en attente et bien plus encore. L'Agent envoie également des checks de service et des événements relatifs au statut global de votre cluster.

## Implémentation
### Installation

Le check Elasticsearch est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos nœuds Elasticsearch, ou sur tout autre serveur si vous utilisez une instance Elasticsearch hébergée (telle qu'Elastic Cloud).

### Configuration

#### Host

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

##### Collecte de métriques

1. Modifiez le fichier `elastic.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] pour commencer à recueillir vos [métriques](#metriques) Elasticsearch. Consultez le [fichier d'exemple elastic.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

    ```yaml
      init_config:

      instances:

          ## @param url - string - required
          ## The URL where elasticsearch accepts HTTP requests. This is used to
          ## fetch statistics from the nodes and information about the cluster health.
          #
        - url: http://localhost:9200
    ```

    **Remarques** :

    * Si vous recueillez des métriques Elasticsearch à partir d'un seul Agent Datadog s'exécutant en dehors du cluster, par exemple si vous utilisez une instance Elasticsearch hébergée, définissez `cluster_stats` sur true.
    * Pour utiliser l'intégration Elasticsearch de l'Agent pour les services AWS Elasticsearch AWS, définissez le paramètre `url` afin de rediriger vers votre URL stats AWS Elasticsearch.

2. [Redémarrez l'Agent][5].

##### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans le fichier `datadog.yaml` :

    ```yaml
      logs_enabled: true
    ```

2. Pour recueillir les logs lents de recherche et d'index, [configurez vos paramètres Elasticsearch][14]. Par défaut, les logs lents ne sont pas activés.
    * Pour configurer des logs lents d'index pour un index `<INDEX>` donné :
      ```
      curl -X PUT "localhost:9200/<INDEX>/_settings?pretty" -H 'Content-Type: application/json' -d' {
        "index.indexing.slowlog.threshold.index.warn": "0ms",
        "index.indexing.slowlog.threshold.index.info": "0ms",
        "index.indexing.slowlog.threshold.index.debug": "0ms",
        "index.indexing.slowlog.threshold.index.trace": "0ms",
        "index.indexing.slowlog.level": "trace",
        "index.indexing.slowlog.source": "1000"
      }
      ```

    * Pour configurer des logs lents de recherche pour un index `<INDEX>` donné :
      ```
      curl -X PUT "localhost:9200/<INDEX>/_settings?pretty" -H 'Content-Type: application/json' -d' {
        "index.search.slowlog.threshold.query.warn": "0ms",
        "index.search.slowlog.threshold.query.info": "0ms",
        "index.search.slowlog.threshold.query.debug": "0ms",
        "index.search.slowlog.threshold.query.trace": "0ms",
        "index.search.slowlog.threshold.fetch.warn": "0ms",
        "index.search.slowlog.threshold.fetch.info": "0ms",
        "index.search.slowlog.threshold.fetch.debug": "0ms",
        "index.search.slowlog.threshold.fetch.trace": "0ms"
      }
      ```

3. Ajoutez ensuite ce bloc de configuration à votre fichier `elastic.d/conf.yaml` pour commencer à recueillir vos logs Elasticsearch :

    ```yaml
      logs:
          - type: file
            path: /var/log/elasticsearch/*.log
            source: elasticsearch
            service: <SERVICE_NAME>
    ```

  * Ajoutez des instances supplémentaires pour commencer à recueillir les logs lents :

    ```yaml
        - type: file
          path: /var/log/elasticsearch/<CLUSTER_NAME>_index_indexing_slowlog.log
          source: elasticsearch
          service: <SERVICE_NAME>

        - type: file
          path: /var/log/elasticsearch/<CLUSTER_NAME>_index_search_slowlog.log
          source: elasticsearch
          service: <SERVICE_NAME>
    ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.

3. [Redémarrez l'Agent][5].

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][6] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                              |
|----------------------|------------------------------------|
| `<NOM_INTÉGRATION>` | `elastic`                          |
| `<CONFIG_INIT>`      | vide ou `{}`                      |
| `<CONFIG_INSTANCE>`  | `{"url": "https://%%host%%:9200"}` |

##### Collecte de logs

**Disponible à partir des versions > 6.5 de l'Agent**

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Docker][7].

| Paramètre      | Valeur                                                      |
|----------------|------------------------------------------------------------|
| `<CONFIG_LOG>` | `{"source": "elasticsearch", "service": "<NOM_SERVICE>"}` |

### Validation

[Lancez la sous-commande status de l'Agent][8] et cherchez `elastic` dans la section Checks.

## Données collectées

Par défaut, les métriques suivantes ne sont pas toutes envoyées par l'Agent. Pour envoyer toutes les métriques, configurez les flags dans `elastic.yaml`, comme illustré ci-dessus.

* `pshard_stats` envoie les métriques **elasticsearch.primaries.\*** et **elasticsearch.indices.count**.
* `index_stats` envoie les métriques **elasticsearch.index.\***.
* `pending_task_stats` envoie les métriques **elasticsearch.pending_\***.

Pour la version >=6.3.0, définissez le paramètre `xpack.monitoring.collection.enabled` sur `true` dans votre configuration Elasticsearch afin de recueillir toutes les métriques `elasticsearch.thread_pool.write.*`. Consultez la [section Monitoring des notes de version d'Elasticsearch][9].

### Métriques
{{< get-metrics-from-git "elastic" >}}


### Événements

Le check Elasticsearch envoie un événement à Datadog à chaque changement de statut global de votre cluster Elasticsearch : rouge, jaune ou vert.

### Checks de service

`elasticsearch.cluster_health` :

Renvoie `OK` si le statut du cluster est vert, renvoie `Warn` si le statut est jaune ou renvoie `Critical` pour les autres cas.

`elasticsearch.can_connect` :

Renvoie `Critical` si l'Agent ne parvient pas à se connecter à Elasticsearch pour recueillir des métriques.

## Dépannage

* [Connexion impossible de l'Agent][11]
* [Pourquoi Elasticsearch n'envoie-t-il pas toutes mes métriques ?][12]

## Pour aller plus loin
Pour mieux comprendre comment (ou pourquoi) intégrer votre cluster Elasticsearch à Datadog, lisez notre [série d'articles de blog][13] à ce sujet.


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/elastic/images/elasticsearch-dash.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[7]: https://docs.datadoghq.com/fr/agent/docker/log/
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[9]: https://www.elastic.co/guide/en/elasticsearch/reference/6.3/release-notes-6.3.0.html
[10]: https://github.com/DataDog/integrations-core/blob/master/elastic/metadata.csv
[11]: https://docs.datadoghq.com/fr/integrations/faq/elastic-agent-can-t-connect
[12]: https://docs.datadoghq.com/fr/integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics
[13]: https://www.datadoghq.com/blog/monitor-elasticsearch-performance-metrics
[14]: https://www.elastic.co/guide/en/elasticsearch/reference/current/index-modules-slowlog.html