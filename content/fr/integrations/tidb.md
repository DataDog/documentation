---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    TiDB Overview: assets/dashboards/overview.json
    overview: assets/dashboards/one-screen-overview.json
  logs:
    service: tidb
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
  - autodiscovery
  - cloud
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/tidb/README.md
display_name: TiDB
draft: false
git_integration_title: tidb
guid: 4b34acac-39ce-4ec4-9329-c68cc4e61279
integration_id: tidb
integration_title: TiDB
integration_version: 2.0.0
is_public: true
kind: integration
maintainer: xuyifan02@pingcap.com
manifest_version: 1.0.0
metric_prefix: tidb_cluster
metric_to_check: tidb_cluster.tidb_executor_statement_total
name: tidb
public_title: TiDB
short_description: Intégration pour cluster TiDB
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Associez le cluster [TiDB][1] à Datadog pour :

- Recueillir des métriques TiDB clés sur votre cluster
- Recueillir les logs de votre cluster, notamment les logs TiDB/TiKV/TiFlash et les logs sur les requêtes lentes
- Visualiser les performances de votre cluster dans le dashboard fourni

> **Remarque :** 
>
> - Pour que cette intégration fonctionne, TiDB 4.0 ou ultérieur est requis. 
> - TiDB Cloud ne peut actuellement pas être intégré à Datadog.

## Configuration

### Installation

Commencez par [télécharger et lancer l'Agent Datadog][2].

Installez ensuite manuellement le check TiDB. [Les instructions varient en fonction de votre environnement][3].

#### Host

Exécutez `datadog-agent integration install -t datadog-tidb==<VERSION_INTÉGRATION>`.

### Configuration

##### Collecte de métriques

1. Modifiez le fichier `tidb.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance TiDB. Consultez le [fichier d'exemple tidb.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

  L'[exemple de fichier tidb.d/conf.yaml][4] configure uniquement l'instance PD. Les autres instances au sein du cluster TiDB doivent être configurées manuellement, comme suit :

  ```yaml
  init_config:

  instances:

    - pd_metric_url: http://localhost:2379/metrics
      max_returned_metrics: 10000
      send_distribution_buckets: true
      tags:
        - tidb_cluster_name:cluster01

    - tidb_metric_url: http://localhost:10080/metrics
      max_returned_metrics: 10000
      send_distribution_buckets: true
      tags:
        - tidb_cluster_name:cluster01

    - tikv_metric_url: http://localhost:20180/metrics
      max_returned_metrics: 10000
      send_distribution_buckets: true
      tags:
        - tidb_cluster_name:cluster01

    - tiflash_metric_url: http://localhost:8234/metrics
      max_returned_metrics: 10000
      send_distribution_buckets: true
      tags:
        - tidb_cluster_name:cluster01

    - tiflash_proxy_metric_url: http://localhost:20292/metrics
      max_returned_metrics: 10000
      send_distribution_buckets: true
      tags:
        - tidb_cluster_name:cluster01
  ```

3. [Redémarrez l'Agent][5].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `tidb.d/conf.yaml` pour commencer à recueillir vos logs TiDB :

   ```yaml
   logs:
    # pd log
    - type: file
      path: "/tidb-deploy/pd-2379/log/pd*.log"
      service: "tidb-cluster"
      source: "pd"

    # tikv log
    - type: file
      path: "/tidb-deploy/tikv-20160/log/tikv*.log"
      service: "tidb-cluster"
      source: "tikv"

    # tidb log
    - type: file
      path: "/tidb-deploy/tidb-4000/log/tidb*.log"
      service: "tidb-cluster"
      source: "tidb"
      exclude_paths:
        - /tidb-deploy/tidb-4000/log/tidb_slow_query.log
    - type: file
      path: "/tidb-deploy/tidb-4000/log/tidb_slow_query*.log"
      service: "tidb-cluster"
      source: "tidb"
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_datetime
          pattern: '#\sTime:'
      tags:
        - "custom_format:tidb_slow_query"

    # tiflash log
    - type: file
      path: "/tidb-deploy/tiflash-9000/log/tiflash*.log"
      service: "tidb-cluster"
      source: "tiflash"
   ```

   Modifiez les paramètres `path` et `service` en fonction de la configuration de votre cluster.

   Utilisez les commandes suivantes pour afficher le chemin de l'ensemble de vos logs :

   ```shell
   # show deploying directories
   tiup cluster display <YOUR_CLUSTER_NAME>
   # find specific logging file path by command arguments
   ps -fwwp <TIDB_PROCESS_PID/PD_PROCESS_PID/etc.>
   ```

3. [Redémarrez l'Agent][5].

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `tidb` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "tidb" >}}


### Événements

Le check TiDB n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "tidb" >}}


## Dépannage

### Trop de métriques

Le check TiDB active les métriques `distribution` de Datadog par défaut. Cette partie des données est très volumineuse et peut consommer une grande quantité de ressources. Ce comportement peut être modifié dans le fichier `tidb.yml` :

- `send_distribution_buckets: false`

Étant donné qu'un cluster TiDB comprend de nombreuses métriques importantes, le check TiDB définit le paramètre `max_returned_metrics` sur `10000` par défaut. Vous pouvez définir une valeur `max_returned_metrics` plus basse dans le fichier `tidb.yml` si nécessaire :

- `max_returned_metrics: 1000`

Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://docs.pingcap.com/tidb/stable
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent
[4]: https://github.com/DataDog/integrations-extras/blob/master/tidb/datadog_checks/tidb/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/tidb/metadata.csv
[8]: https://github.com/DataDog/integrations-extras/blob/master/tidb/assets/service_checks.json
[9]: https://docs.datadoghq.com/fr/help/