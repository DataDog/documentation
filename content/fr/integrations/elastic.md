---
app_id: elasticsearch
app_uuid: fc23bf70-2992-4e07-96db-c65c167f25d6
assets:
  dashboards:
    elasticsearch: assets/dashboards/overview.json
    elasticsearch_timeboard: assets/dashboards/metrics.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: elasticsearch.search.query.total
      metadata_path: metadata.csv
      prefix: elasticsearch.
    process_signatures:
    - java org.elasticsearch.bootstrap.Elasticsearch
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Elasticsearch
  logs:
    source: elasticsearch
  monitors:
    '[ElasticSearch] Number of pending tasks is high': assets/monitors/elastic_pending_tasks_high.json
    '[ElasticSearch] Query load is high': assets/monitors/elastic_query_load_high.json
    '[ElasticSearch] Time spent on queries is high': assets/monitors/elastic_query_latency_high.json
    '[ElasticSearch] Unsuccessful requests rate is high': assets/monitors/elastic_requests.json
  saved_views:
    elasticsearch_processes: assets/saved_views/elasticsearch_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data store
- log collection
- tracing
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/elastic/README.md
display_on_public_website: true
draft: false
git_integration_title: elastic
integration_id: elasticsearch
integration_title: Elasticsearch
integration_version: 5.5.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: elastic
public_title: Elasticsearch
short_description: Surveillez le statut global d'un cluster en mesurant l'utilisation
  du tas JVM et une vaste gamme de données.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Store
  - Category::Log Collection
  - Category::Tracing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Surveillez le statut global d'un cluster en mesurant l'utilisation
    du tas JVM et une vaste gamme de données.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Elasticsearch
---



![Dashboard Elasticsearch][1]

## Présentation

Obtenez les dernières données sur la santé de votre cluster Elasticsearch, que ce soit pour son statut global ou l'utilisation de tas de la JVM. Recevez des notifications lorsque vous devez réactiver un réplica, renforcer les capacités du cluster ou ajuster sa configuration. Surveillez ensuite les métriques de cluster obtenues.

Le check Elasticsearch de l'Agent Datadog recueille des métriques pour la recherche et l'indexation des performances, l'utilisation et le nettoyage de la mémoire, la disponibilité des nœuds, les statistiques des partitions, les performances du disque et l'espace disque, les tâches en attente et bien plus encore. L'Agent envoie également des checks de service et des événements relatifs au statut global de votre cluster.

## Implémentation

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
      - Toutes les requêtes envoyées à l'API de configuration Amazon ES doivent être signées. Consultez la section [Créer et signer des requêtes OpenSearch Service][4] (en anglais) pour en savoir plus.
      - Le type d'authentification `aws` fait appel à [boto3][5] pour récupérer automatiquement les identifiants AWS depuis `.aws/credentials`. Utilisez `auth_type: basic` dans le fichier `conf.yaml` et définissez les identifiants avec `username: <NOMUTILISATEUR>` et `password: <MOTDEPASSE>`.
      - Vous devez créer un utilisateur et un rôle (s'ils n'existent pas déjà) dans Elasticsearch, en leur attribuant les autorisations adéquates pour la surveillance. Pour ce faire, vous pouvez utiliser l'API REST fournie par Elasticsearch ou encore l'interface Kibana.
      - Si vous avez activé des fonctionnalités de sécurité dans Elasticsearch, vous pouvez utiliser les autorisations `monitor` ou `manage` avec l'API pour interroger les index Elasticsearch.
      - Ajoutez les propriétés suivantes dans le rôle créé :
        ```json
        name = "datadog"
        indices {
          names = [".monitoring-*", "metricbeat-*"]
          privileges = ["read", "read_cross_cluster", "monitor"]
        }
        cluster = ["monitor"]
        ```
        Attribuez ensuite le rôle à l'utilisateur :
        ```json
        roles = [<created role>, "monitoring_user"]
        ```
        Pour en savoir plus, consultez les sections [Créer ou mettre à jour des rôles][6] et [Créer ou mettre à jour des utilisateurs][7] (en anglais).


2. [Redémarrez l'Agent][8].

###### Requêtes personnalisées

Grâce à l'intégration Elasticsearch, vous pouvez recueillir des métriques custom à l'aide de requêtes personnalisées. Pour y parvenir, utilisez l'option de configuration `custom_queries`.

**Remarque :** lors de l'exécution de requêtes personnalisées, utilisez un compte disposant d'un accès en lecture seule pour veiller à ne pas modifier l'instance Elasticsearch.

```yaml
custom_queries:
 - endpoint: /_search
   data_path: aggregations.genres.buckets
   payload:
     aggs:
       genres:
         terms:
           field: "id"
   columns:
   - value_path: key
     name: id
     type: tag
   - value_path: doc_count
     name: elasticsearch.doc_count
   tags:
   - custom_tag:1
```
La requête personnalisée est envoyée en tant que requête `GET`. Si vous utilisez un paramètre `payload` facultatif, elle est envoyée en tant que requête `POST`.

`value_path` peut correspondre à des clés de chaîne ou à des index de liste. Exemple :
```json
{
  "foo": {
    "bar": [
      "result0",
      "result1"
    ]
  }
}
```

`value_path: foo.bar.1` renvoie la valeur `result1`.

##### Collecte de traces

L'APM Datadog s'intègre à Elastisearch pour vous permettre de visualiser les traces sur l'ensemble de votre système distribué. La collecte de traces est activée par défaut dans les versions 6 et ultérieures de l'Agent Datadog. Pour commencer à recueillir des traces :

1. [Activez la collecte de traces dans Datadog][9].
2. [Instrumentez l'application qui envoie des requêtes à Elasticsearch][10].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans le fichier `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Pour recueillir les logs lents de recherche et d'index, [configurez vos paramètres Elasticsearch][14]. Par défaut, les logs lents ne sont pas activés.

   - Pour configurer des logs lents d'index pour un index `<INDEX>` donné :

     ```shell
     curl -X PUT "localhost:9200/<INDEX>/_settings?pretty" -H 'Content-Type: application/json' -d' {
       "index.indexing.slowlog.threshold.index.warn": "0ms",
       "index.indexing.slowlog.threshold.index.info": "0ms",
       "index.indexing.slowlog.threshold.index.debug": "0ms",
       "index.indexing.slowlog.threshold.index.trace": "0ms",
       "index.indexing.slowlog.level": "trace",
       "index.indexing.slowlog.source": "1000"
     }'
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
     }'
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

4. [Redémarrez l'Agent][8].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments#file-location
[4]: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/ac.html#managedomains-signing-service-requests
[5]: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#configuring-credentials
[6]: https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-put-role.html
[7]: https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-put-user.html
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/tracing/send_traces/
[10]: https://docs.datadoghq.com/fr/tracing/setup/
[11]: https://docs.datadoghq.com/fr/integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics/
{{% /tab %}}
{{% tab "Docker" %}}

#### Docker

Pour configurer ce check lorsque l'Agent est exécuté sur un conteneur :

##### Collecte de métriques

Définissez des [modèles d'intégration Autodiscovery][1] en tant qu'étiquettes Docker sur votre conteneur d'application :

```yaml
LABEL "com.datadoghq.ad.check_names"='["elastic"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"url": "http://%%host%%:9200"}]'
```

##### Collecte de logs


La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Docker][2].

Définissez ensuite des [intégrations de logs][5] en tant qu'étiquettes Docker :

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"elasticsearch","service":"<NOM_SERVICE>"}]'
```

##### Collecte de traces

L'APM dédié aux applications conteneurisées est pris en charge sur les versions 6 et ultérieures de l'Agent, mais nécessite une configuration supplémentaire pour recueillir des traces.

Variables d'environnement requises sur le conteneur de l'Agent :

| Paramètre            | Valeur                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

Consultez les sections relatives au [tracing d'applications Kubernetes][4] et à la [configuration de DaemonSet Kubernetes][5] pour consulter la liste complète des variables d'environnement et options de configuration disponibles.

Ensuite, [instrumentez le conteneur de votre application][6] et définissez `DD_AGENT_HOST` sur le nom de votre conteneur d'Agent.


[1]: https://docs.datadoghq.com/fr/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation#installation
[3]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation#log-integrations
[4]: https://docs.datadoghq.com/fr/agent/kubernetes/apm/?tab=java
[5]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[6]: https://docs.datadoghq.com/fr/tracing/setup/
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

Pour configurer ce check lorsque l'Agent est exécuté sur Kubernetes :

##### Collecte de métriques

Définissez des [modèles d'intégration Autodiscovery][1] en tant qu'annotations de pod sur votre conteneur d'application. Cette configuration peut également être réalisée avec [un fichier, une configmap ou une paire key/value][2].

**Version 1 des annotations** (pour les versions de l'Agent Datadog antérieures à la v7.36)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: elasticsearch
  annotations:
    ad.datadoghq.com/elasticsearch.check_names: '["elastic"]'
    ad.datadoghq.com/elasticsearch.init_configs: '[{}]'
    ad.datadoghq.com/elasticsearch.instances: |
      [
        {
          "url": "http://%%host%%:9200"
        }
      ]
spec:
  containers:
    - name: elasticsearch
```

**Version 2 des annotations** (pour les versions 7.36 et ultérieures de l'Agent Datadog)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: elasticsearch
  annotations:
    ad.datadoghq.com/elasticsearch.checks: |
      {
        "elastic": {
          "init_config": {},
          "instances": [
            {
              "url": "http://%%host%%:9200"
            }
          ]
        }
      }
spec:
  containers:
    - name: elasticsearch
```

##### Collecte de logs


La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Kubernetes][3].

Définissez ensuite des [intégrations de logs][4] en tant qu'annotations de pod. Cette configuration peut également être réalisée avec [un fichier, une configmap ou une paire key/value][5].

**Versions 1 et 2 des annotations**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: elasticsearch
  annotations:
    ad.datadoghq.com/elasticsearch.logs: '[{"source":"elasticsearch","service":"<NOM_SERVICE>"}]'
spec:
  containers:
    - name: elasticsearch
```

##### Collecte de traces

L'APM dédié aux applications conteneurisées est pris en charge par les hosts exécutant les versions 6 et ultérieures de l'Agent, mais nécessite une configuration supplémentaire pour recueillir des traces.

Variables d'environnement requises sur le conteneur de l'Agent :

| Paramètre            | Valeur                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

Consultez les sections relatives au [tracing d'applications Kubernetes][6] et à la [configuration de DaemonSet Kubernetes][7] pour consulter la liste complète des variables d'environnement et options de configuration disponibles.

Ensuite, [instrumentez votre conteneur d'application][8] et définissez `DD_AGENT_HOST` sur le nom du conteneur de votre Agent.

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/log/?tab=containerinstallation#setup
[4]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation#log-integrations
[5]: https://docs.datadoghq.com/fr/agent/kubernetes/log/?tab=daemonset#configuration
[6]: https://docs.datadoghq.com/fr/agent/kubernetes/apm/?tab=java
[7]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[8]: https://docs.datadoghq.com/fr/tracing/setup/
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

Pour configurer ce check lorsque l'Agent est exécuté sur ECS :

##### Collecte de métriques

Définissez des [modèles d'intégration Autodiscovery][1] en tant qu'étiquettes Docker sur votre conteneur d'application :

```json
{
  "containerDefinitions": [{
    "name": "elasticsearch",
    "image": "elasticsearch:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"elastic\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"url\": \"http://%%host%%:9200\"}]"
    }
  }]
}
```

##### Collecte de logs


La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Amazon ECS][2].

Définissez ensuite des [intégrations de logs][5] en tant qu'étiquettes Docker :

```json
{
  "containerDefinitions": [{
    "name": "elasticsearch",
    "image": "elasticsearch:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"elasticsearch\",\"service\":\"<NOM_SERVICE>\"}]"
    }
  }]
}
```

##### Collecte de traces

L'APM dédié aux applications conteneurisées est pris en charge sur les versions 6 et ultérieures de l'Agent, mais nécessite une configuration supplémentaire pour recueillir des traces.

Variables d'environnement requises sur le conteneur de l'Agent :

| Paramètre            | Valeur                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

Consultez les sections relatives au [tracing d'applications Kubernetes][4] et à la [configuration de DaemonSet Kubernetes][5] pour consulter la liste complète des variables d'environnement et options de configuration disponibles.

Ensuite, [instrumentez votre conteneur d'application][6] et définissez `DD_AGENT_HOST` sur l'[adresse IP privée EC2][7].


[1]: https://docs.datadoghq.com/fr/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/fr/agent/amazon_ecs/logs/?tab=linux
[3]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation#log-integrations
[4]: https://docs.datadoghq.com/fr/agent/kubernetes/apm/?tab=java
[5]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[6]: https://docs.datadoghq.com/fr/tracing/setup/
[7]: https://docs.datadoghq.com/fr/agent/amazon_ecs/apm/?tab=ec2metadataendpoint#setup
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][3] et cherchez `elastic` dans la section Checks.

## Données collectées

Par défaut, les métriques suivantes ne sont pas toutes envoyées par l'Agent. Pour envoyer toutes les métriques, configurez les flags dans `elastic.yaml`, comme illustré ci-dessus.

- `pshard_stats` envoie les métriques **elasticsearch.primaries.\*** et **elasticsearch.indices.count**.
- `index_stats` envoie les métriques **elasticsearch.index.\***.
- `pending_task_stats` envoie les métriques **elasticsearch.pending\_\***.
- `slm_stats` envoie les métriques **elasticsearch.slm.\***.

### Métriques
{{< get-metrics-from-git "elastic" >}}


### Événements

Le check Elasticsearch envoie un événement à Datadog à chaque changement de statut global de votre cluster Elasticsearch : rouge, jaune ou vert.

### Checks de service
{{< get-service-checks-from-git "elastic" >}}


## Dépannage

- [Connexion de l'Agent impossible][4]
- [Pourquoi Elasticsearch n'envoie-t-il pas toutes mes métriques ?][7]

## Pour aller plus loin

- [Comment surveiller les performances Elasticsearch][6]



[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/elastic/images/elasticsearch-dash.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/integrations/faq/elastic-agent-can-t-connect/
[5]: https://docs.datadoghq.com/fr/integrations/faq/why-isn-t-elasticsearch-sending-all-my-metrics/
[6]: https://www.datadoghq.com/blog/monitor-elasticsearch-performance-metrics