---
aliases:
  - /fr/integrations/elasticsearch
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: elasticsearch
  metrics_metadata: metadata.csv
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
draft: false
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
short_description: Surveillez le statut global d'un cluster en mesurant l'utilisation du tas JVM et une vaste gamme de données.
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

## Configuration

### Installation

Le check Elasticsearch est inclus avec le package de l'[Agent Datadog][2]. Vous n'avez donc rien d'autre à installer.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `elastic.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1] pour commencer à recueillir vos [métriques](#metriques) Elasticsearch. Consultez le [fichier d'exemple elastic.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## The URL where Elasticsearch accepts HTTP requests. This is used to
     ## fetch statistics from the nodes and information about the cluster health.
     #
     - url: http://localhost:9200
   ```

    **Remarques** :

      - Si vous recueillez des métriques Elasticsearch à partir d'un seul Agent Datadog s'exécutant en dehors du cluster, par exemple si vous utilisez une instance Elasticsearch hébergée, définissez `cluster_stats` sur `true`.
      - Les [tags au niveau de l'Agent][3] ne sont pas appliqués aux hosts associés à un cluster qui n'exécute pas l'Agent. Utilisez les tags au niveau de l'intégration dans `<integration>.d/conf.yaml` pour vous assurer que **TOUTES** les métriques présentent des tags cohérents. Par exemple :

        ```yaml
        init_config:
        instances:
          - url: "%%env_MONITOR_ES_HOST%%"
            username: "%%env_MONITOR_ES_USER%%"
            password: *********
            auth_type: basic
            cluster_stats: true
            tags:
            - service.name:elasticsearch
            - env:%%env_DD_ENV%%
        ```

      - Pour utiliser l'intégration Elasticsearch de l'Agent pour les services AWS Elasticsearch AWS, définissez le paramètre `url` afin de rediriger vers votre URL stats AWS Elasticsearch.
      - Toutes les requêtes envoyées à l'API de configuration Amazon ES doivent être signées. Consultez la [documentation AWS][4] pour en savoir plus.
      - Le type d'authentification `aws` fait appel à [boto3][5] pour récupérer automatiquement les identifiants AWS depuis `.aws/credentials`. Utilisez `auth_type: basic` dans le fichier `conf.yaml` et définissez les identifiants avec `username: <NOMUTILISATEUR>` et `password: <MOTDEPASSE>`.

2. [Redémarrez l'Agent][6].

##### Collecte de traces

L'APM Datadog s'intègre à Elastisearch pour vous permettre de visualiser les traces sur l'ensemble de votre système distribué. La collecte de traces est activée par défaut dans les versions 6 et ultérieures de l'Agent Datadog. Pour commencer à recueillir des traces :

1. [Activez la collecte de traces dans Datadog][7].
2. [Instrumentez l'application qui envoie des requêtes à ElasticSearch][8].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans le fichier `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Pour recueillir les logs lents de recherche et d'index, [configurez vos paramètres Elasticsearch][9]. Par défaut, les logs lents ne sont pas activés.

   - Pour configurer des logs lents d'index pour un index `<INDEX>` donné :

     ```shell
     curl -X PUT "localhost:9200/<INDEX>/_settings?pretty" -H 'Content-Type: application/json' -d' {
       "index.indexing.slowlog.threshold.index.warn": "0ms",
       "index.indexing.slowlog.threshold.index.info": "0ms",
       "index.indexing.slowlog.threshold.index.debug": "0ms",
       "index.indexing.slowlog.threshold.index.trace": "0ms",
       "index.indexing.slowlog.level": "trace",
       "index.indexing.slowlog.source": "1000"
     }
     ```

   - Pour configurer des logs lents de recherche pour un index `<INDEX>` donné :

     ```shell
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
       service: "<SERVICE_NAME>"
   ```

   - Ajoutez des instances supplémentaires pour commencer à recueillir les logs lents :

     ```yaml
     - type: file
       path: "/var/log/elasticsearch/\
             <CLUSTER_NAME>_index_indexing_slowlog.log"
       source: elasticsearch
       service: "<SERVICE_NAME>"

     - type: file
       path: "/var/log/elasticsearch/\
             <CLUSTER_NAME>_index_search_slowlog.log"
       source: elasticsearch
       service: "<SERVICE_NAME>"
     ```

     Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.

4. [Redémarrez l'Agent][6].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments#file-location
[4]: https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-ac.html#es-managedomains-signing-service-requests
[5]: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#configuring-credentials
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/tracing/send_traces/
[8]: https://docs.datadoghq.com/fr/tracing/setup/
[9]: https://docs.datadoghq.com/fr/integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics/
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                              |
| -------------------- | ---------------------------------- |
| `<NOM_INTÉGRATION>` | `elastic`                          |
| `<CONFIG_INIT>`      | vide ou `{}`                      |
| `<CONFIG_INSTANCE>`  | `{"url": "https://%%host%%:9200"}` |

##### Collecte de traces

L'APM dédié aux applications conteneurisées est pris en charge par les hosts exécutant les versions 6 et ultérieures de l'Agent, mais nécessite une configuration supplémentaire pour recueillir des traces.

Variables d'environnement requises sur le conteneur de l'Agent :

| Paramètre            | Valeur                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

Consultez les sections [Tracing d'applications Kubernetes][2] et [Configuration de DaemonSet Kubernetes][3] pour consulter la liste complète des variables d'environnement et configurations disponibles.

Ensuite, [instrumentez votre conteneur d'application][4] et définissez `DD_AGENT_HOST` sur le nom du conteneur de votre Agent.

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][5].

| Paramètre      | Valeur                                                      |
| -------------- | ---------------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "elasticsearch", "service": "<NOM_SERVICE>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/apm/?tab=java
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[4]: https://docs.datadoghq.com/fr/tracing/setup/
[5]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][3] et cherchez `elastic` dans la section Checks.

## Données collectées

Par défaut, les métriques suivantes ne sont pas toutes envoyées par l'Agent. Pour envoyer toutes les métriques, configurez les flags dans `elastic.yaml`, comme illustré ci-dessus.

- `pshard_stats` envoie les métriques **elasticsearch.primaries.\*** et **elasticsearch.indices.count**.
- `index_stats` envoie les métriques **elasticsearch.index.\***.
- `pending_task_stats` envoie les métriques **elasticsearch.pending\_\***.

Pour les versions >=6.3.0, définissez le paramètre `xpack.monitoring.collection.enabled` sur `true` dans votre configuration Elasticsearch afin de recueillir toutes les métriques `elasticsearch.thread_pool.write.*`. Consultez la [section Monitoring des notes de version d'Elasticsearch][4] (en anglais).

### Métriques
{{< get-metrics-from-git "elastic" >}}


### Événements

Le check Elasticsearch envoie un événement à Datadog à chaque changement de statut global de votre cluster Elasticsearch : rouge, jaune ou vert.

### Checks de service

**elasticsearch.cluster_health** :<br>
Renvoie `OK` si le statut du cluster est vert, renvoie `WARNING` si le statut est jaune ou `CRITICAL` pour les autres cas.

**elasticsearch.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à Elasticsearch pour recueillir des métriques.

## Dépannage

- [Connexion de l'Agent impossible][5]
- [Pourquoi Elasticsearch n'envoie-t-il pas toutes mes métriques ?][6]

## Pour aller plus loin

Pour mieux comprendre comment (ou pourquoi) intégrer votre cluster Elasticsearch à Datadog, lisez notre [série d'articles de blog][7] à ce sujet.


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/elastic/images/elasticsearch-dash.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://www.elastic.co/guide/en/elasticsearch/reference/6.3/release-notes-6.3.0.html
[5]: https://docs.datadoghq.com/fr/integrations/faq/elastic-agent-can-t-connect/
[6]: https://docs.datadoghq.com/fr/integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics/
[7]: https://www.datadoghq.com/blog/monitor-elasticsearch-performance-metrics