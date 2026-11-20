---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    mysql: assets/dashboards/overview.json
    mysql-screenboard: assets/dashboards/overview-screenboard.json
  logs:
    source: mysql
  metrics_metadata: metadata.csv
  monitors:
    replica running: assets/monitors/replica_running.json
    select query rate: assets/monitors/select_query_rate.json
  saved_views:
    mysql_processes: assets/saved_views/mysql_processes.json
    operations: assets/saved_views/operations.json
    operations_overview: assets/saved_views/operations_overview.json
    slow_operations: assets/saved_views/slow_operations.json
  service_checks: assets/service_checks.json
categories:
- data store
- log collection
creates_events: true
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/mysql/README.md
description: L'intégration MySQL vous permet de recueillir des métriques sur les performances
  et la disponibilité à partir de vos instances MySQL.
display_name: MySQL
draft: false
git_integration_title: mysql
guid: 056bfc7f-4775-4581-9442-502078593d10
integration_id: mysql
integration_title: MySQL
integration_version: 8.2.1
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: mysql.
metric_to_check: mysql.net.connections
name: MySQL
process_signatures:
- mysqld
public_title: Intégration Datadog/MySQL
short_description: Récupérez des métriques de schéma de performance, le débit de requêtes,
  des métriques custom, et plus encore.
support: core
supported_os:
- linux
- mac_os
- windows
---



![Dashboard MySQL][1]

## Présentation

L'Agent Datadog peut recueillir de nombreuses métriques à partir des bases de données MySQL, notamment (sans s'y limiter) :

- Le débit de requêtes
- Les performances des requêtes, notamment le délai d'exécution moyen des requêtes et les requêtes lentes
- Les connexions, notamment les connexions actives, les connexions interrompues et les erreurs
- InnoDB, notamment les métriques de pool de buffer

Vous pouvez également créer vos propres métriques à l'aide de requêtes SQL personnalisées.

**Remarque :** cette intégration est également compatible avec [MariaDB][2], car elle sert de [« remplacement »][3] pour MySQL.

## Configuration

<div class="alert alert-info">Cette page décrit le fonctionnement de l'intégration d'Agent MySQL. Si vous souhaitez obtenir des informations sur la solution Database Monitoring pour MySQL, consultez la section <a href="https://docs.datadoghq.com/database_monitoring" target="_blank">Database Monitoring</a>.</div>

### Installation

Le check MySQL est inclus avec le package de l'[Agent Datadog][4]. Vous n'avez donc rien d'autre à installer sur votre serveur MySQL.

#### Préparer MySQL

Sur chaque serveur MySQL, créez un utilisateur de base de données pour l'Agent Datadog.

Les instructions suivantes autorisent l'Agent à se connecter depuis n'importe quel host à l'aide de `datadog@'%'`. Vous pouvez restreindre l'utilisateur `datadog` avec `datadog@'localhost'`, de façon à ce qu'il soit uniquement autorisé à se connecter depuis localhost. Consultez la section [Ajouter des comptes, attribuer des droits d'accès et supprimer des comptes][5] de la documentation MySQL (en anglais) pour en savoir plus.

```shell
mysql> CREATE USER 'datadog'@'%' IDENTIFIED BY '<MOT_DE_PASSE_UNIQUE>';
Query OK, 0 rows affected (0.00 sec)
```

Pour mySQL 8.0 et ultérieur, créez l'utilisateur `datadog` avec la méthode de hachage de mot de passe natif :

```shell
mysql> CREATE USER 'datadog'@'%' IDENTIFIED WITH mysql_native_password by '<MOT_DE_PASSE_UNIQUE>';
Query OK, 0 rows affected (0.00 sec)
```

Vérifiez que l'utilisateur a bien été créé à l'aide des commandes ci-dessous. Remplacez `<MOT_DE_PASSE_UNIQUE>` par le mot de passe que vous avez créé ci-dessus :

```shell
mysql -u datadog --password=<MOT_DE_PASSE_UNIQUE> -e "show status" | \
grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
echo -e "\033[0;31mCannot connect to MySQL\033[0m"
```

```shell
mysql -u datadog --password=<MOT_DE_PASSE_UNIQUE> -e "show slave status" && \
echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
echo -e "\033[0;31mMissing REPLICATION CLIENT grant\033[0m"
```

L'Agent a besoin de certains privilèges pour recueillir des métriques. Accordez à l'utilisateur les privilèges limités suivants UNIQUEMENT :

```shell
mysql> GRANT REPLICATION CLIENT ON *.* TO 'datadog'@'%' WITH MAX_USER_CONNECTIONS 5;
Query OK, 0 rows affected, 1 warning (0.00 sec)

mysql> GRANT PROCESS ON *.* TO 'datadog'@'%';
Query OK, 0 rows affected (0.00 sec)
```

Pour MySQL 8.0+, définissez `max_user_connections` avec :

```shell
mysql> ALTER USER 'datadog'@'%' WITH MAX_USER_CONNECTIONS 5;
Query OK, 0 rows affected (0.00 sec)
```

Si cette option est activée, les métriques peuvent être recueillies à partir de la base de données `performance_schema` en accordant un privilège supplémentaire :

```shell
mysql> show databases like 'performance_schema';
+-------------------------------+
| Database (performance_schema) |
+-------------------------------+
| performance_schema            |
+-------------------------------+
1 row in set (0.00 sec)

mysql> GRANT SELECT ON performance_schema.* TO 'datadog'@'%';
Query OK, 0 rows affected (0.00 sec)
```

### Procédure à suivre

Suivez les instructions ci-dessous pour configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Docker](?tab=docker#docker), [Kubernetes](?tab=kubernetes#kubernetes) ou [ECS](?tab=ecs#ecs) pour la configuration dans un environnement conteneurisé.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

Modifiez le fichier `mysql.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et [logs](#collecte-de-logs) MySQL. Consultez le [fichier d'exemple mysql.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

##### Collecte de métriques

- Ajoutez ce bloc de configuration à votre fichier `mysql.d/conf.yaml` pour recueillir vos [métriques MySQL](#metriques) :

  ```yaml
  init_config:

  instances:
    - server: 127.0.0.1
      user: datadog
      password: "<YOUR_CHOSEN_PASSWORD>" # from the CREATE USER step earlier
      port: "<YOUR_MYSQL_PORT>" # e.g. 3306
      options:
        replication: false
        galera_cluster: true
        extra_status_metrics: true
        extra_innodb_metrics: true
        extra_performance_metrics: true
        schema_size_metrics: false
        disable_innodb_metrics: false
  ```

**Remarque** : ajoutez des guillemets simples autour de votre mot de passe s'il contient un caractère spécial.

Pour recueillir d'autres métriques de performance (`extra_performance_metrics`), l'option `performance_schema` doit être activée sur votre serveur MySQL. Sinon, `extra_performance_metrics` doit être défini sur `false`. Pour en savoir plus sur `performance_schema`, consultez la section [Prise en main du schéma de performance][3] de la documentation MySQL (en anglais).

**Remarque** : l'utilisateur `datadog` doit être défini dans la configuration de l'intégration MySQL en tant que `host: 127.0.0.1` au lieu de `localhost`. Vous pouvez également utiliser `sock`.

Consultez le [fichier d'exemple mysql.yaml][2] pour découvrir toutes les options de configuration disponibles, notamment pour les métriques custom.

[Redémarrez l'Agent][4] pour commencer à envoyer des métriques MySQL à Datadog.

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. Par défaut, MySQL enregistre tous ses logs dans `/var/log/syslog`, dont la lecture nécessite un accès root. Pour rendre les logs plus accessibles, voici les étapes à suivre :

   - Modifiez `/etc/mysql/conf.d/mysqld_safe_syslog.cnf` et supprimez ou commentez les lignes.
   - Modifiez `/etc/mysql/my.cnf` et ajoutez les lignes suivantes pour activer les logs généraux, d'erreurs et de requêtes lentes :

     ```conf
       [mysqld_safe]
       log_error = /var/log/mysql/mysql_error.log

       [mysqld]
       general_log = on
       general_log_file = /var/log/mysql/mysql.log
       log_error = /var/log/mysql/mysql_error.log
       slow_query_log = on
       slow_query_log_file = /var/log/mysql/mysql_slow.log
       long_query_time = 2
     ```

   - Enregistrez le fichier et redémarrez MySQL à l'aide des commandes suivantes :
     `service mysql restart`
   - Assurez-vous que l'Agent dispose d'une autorisation de lecture pour le répertoire `/var/log/mysql` et tous ses fichiers. Vérifiez votre configuration de logrotate pour vous assurer que ces fichiers sont pris en compte et que les autorisations sont correctement définies.
   - Dans `/etc/logrotate.d/mysql-server`, vous devriez voir des lignes similaires à ce qui suit :

     ```text
       /var/log/mysql.log /var/log/mysql/mysql.log /var/log/mysql/mysql_slow.log {
               daily
               rotate 7
               missingok
               create 644 mysql adm
               Compress
       }
     ```

2. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

3. Ajoutez ce bloc de configuration à votre fichier `mysql.d/conf.yaml` pour commencer à recueillir vos logs MySQL :

   ```yaml
   logs:
     - type: file
       path: "<ERROR_LOG_FILE_PATH>"
       source: mysql
       service: "<SERVICE_NAME>"

     - type: file
       path: "<SLOW_QUERY_LOG_FILE_PATH>"
       source: mysql
       service: "<SERVICE_NAME>"
       log_processing_rules:
         - type: multi_line
           name: new_slow_query_log_entry
           pattern: "# Time:"
           # If mysqld was started with `--log-short-format`, use:
           # pattern: "# Query_time:"
           # If using mysql version <5.7, use the following rules instead:
           # - type: multi_line
           #   name: new_slow_query_log_entry
           #   pattern: "# Time|# User@Host"
           # - type: exclude_at_match
           #   name: exclude_timestamp_only_line
           #   pattern: "# Time:"

     - type: file
       path: "<GENERAL_LOG_FILE_PATH>"
       source: mysql
       service: "<SERVICE_NAME>"
       # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
       # log_processing_rules:
       #   - type: multi_line
       #     name: new_log_start_with_date
       #     pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
       # If the logs start with a date with the format yymmdd but include a timestamp with each new second, rather than with each log, uncomment the following processing rule
       # log_processing_rules:
       #   - type: multi_line
       #     name: new_logs_do_not_always_start_with_timestamp
       #     pattern: \t\t\s*\d+\s+|\d{6}\s+\d{,2}:\d{2}:\d{2}\t\s*\d+\s+
   ```

    Consultez le [fichier d'exemple mysql.yaml][2] pour découvrir toutes les options de configuration disponibles, notamment pour les métriques custom.

4. [Redémarrez l'Agent][4].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[3]: https://dev.mysql.com/doc/refman/5.7/en/performance-schema-quick-start.html
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}
#### Docker

Pour configurer ce check lorsque l'Agent est exécuté sur un conteneur :

##### Collecte de métriques

Définissez des [modèles d'intégration Autodiscovery][1] en tant qu'étiquettes Docker sur votre conteneur d'application :

```yaml
LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"server": "%%host%%", "user": "datadog","password": "<MOT_DE_PASSE_UNIQUE>"}]'
```

Consultez la documentation relative aux [template variables Autodiscovery][2] pour découvrir comment utiliser `<MOT_DE_PASSE_UNIQUE>` en tant que variable d'environnement plutôt que sous forme d'étiquette.

#### Collecte de logs


La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Docker][3].

Définissez ensuite des [intégrations de logs][4] en tant qu'étiquettes Docker :

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"mysql","service":"mysql"}]'
```

[1]: https://docs.datadoghq.com/fr/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/fr/agent/faq/template_variables/
[3]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation#installation
[4]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

Pour configurer ce check lorsque l'Agent est exécuté sur Kubernetes :

##### Collecte de métriques

Définissez des [modèles d'intégration Autodiscovery][1] en tant qu'annotations de pod sur votre conteneur d'application. Vous pouvez également configurer des modèles avec [un fichier, une configmap ou un stockage key/value][2].

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mysql
  annotations:
    ad.datadoghq.com/mysql.check_names: '["mysql"]'
    ad.datadoghq.com/mysql.init_configs: '[{}]'
    ad.datadoghq.com/mysql.instances: |
      [
        {
          "server": "%%host%%", 
          "user": "datadog",
          "password": "<MOT_DE_PASSE_UNIQUE>"
        }
      ]
  labels:
    name: mysql
spec:
  containers:
    - name: mysql
```

Consultez la documentation relative aux [template variables Autodiscovery][3] pour découvrir comment utiliser `<MOT_DE_PASSE_UNIQUE>` en tant que variable d'environnement plutôt que sous forme d'étiquette.

#### Collecte de logs


La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][4].

Définissez ensuite des [intégrations de logs][5] en tant qu'annotations de pod. Cette configuration peut également être réalisée avec [un fichier, une configmap ou un stockage key/value][6].

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mysql
  annotations:
    ad.datadoghq.com/mysql.logs: '[{"source": "mysql", "service": "mysql"}]'
  labels:
    name: mysql
```

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/fr/agent/faq/template_variables/
[4]: https://docs.datadoghq.com/fr/agent/kubernetes/log/?tab=containerinstallation#setup
[5]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation#log-integrations
[6]: https://docs.datadoghq.com/fr/agent/kubernetes/log/?tab=daemonset#configuration
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

Pour configurer ce check lorsque l'Agent est exécuté sur ECS :

##### Collecte de métriques

Définissez des [modèles d'intégration Autodiscovery][1] en tant qu'étiquettes Docker sur votre conteneur d'application :

```json
{
  "containerDefinitions": [{
    "name": "mysql",
    "image": "mysql:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"mysql\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"server\": \"%%host%%\", \"user\": \"datadog\",\"password\": \"<MOT_DE_PASSE_UNIQUE>\"}]"
    }
  }]
}
```

Consultez la documentation relative aux [template variables Autodiscovery][2] pour découvrir comment utiliser `<MOT_DE_PASSE_UNIQUE>` en tant que variable d'environnement plutôt que sous forme d'étiquette.

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Amazon ECS][3].

Définissez ensuite des [intégrations de logs][4] en tant qu'étiquettes Docker :

```yaml
{
  "containerDefinitions": [{
    "name": "mysql",
    "image": "mysql:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"mysql\",\"service\":\"mysql\"}]"
    }
  }]
}
```
[1]: https://docs.datadoghq.com/fr/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/fr/agent/faq/template_variables/
[3]: https://docs.datadoghq.com/fr/agent/amazon_ecs/logs/?tab=linux
[4]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `mysql` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "mysql" >}}


Par défaut, le check ne recueille pas toutes les métriques. Définissez les options de configuration booléennes suivantes sur `true` pour activer les métriques correspondantes :

`extra_status_metrics` ajoute les métriques suivantes :

| Nom de la métrique                                  | Type de la métrique |
| -------------------------------------------- | ----------- |
| mysql.binlog.cache_disk_use                  | GAUGE       |
| mysql.binlog.cache_use                       | GAUGE       |
| mysql.performance.handler_commit             | RATE        |
| mysql.performance.handler_delete             | RATE        |
| mysql.performance.handler_prepare            | RATE        |
| mysql.performance.handler_read_first         | RATE        |
| mysql.performance.handler_read_key           | RATE        |
| mysql.performance.handler_read_next          | RATE        |
| mysql.performance.handler_read_prev          | RATE        |
| mysql.performance.handler_read_rnd           | RATE        |
| mysql.performance.handler_read_rnd_next      | RATE        |
| mysql.performance.handler_rollback           | RATE        |
| mysql.performance.handler_update             | RATE        |
| mysql.performance.handler_write              | RATE        |
| mysql.performance.opened_tables              | RATE        |
| mysql.performance.qcache_total_blocks        | GAUGE       |
| mysql.performance.qcache_free_blocks         | GAUGE       |
| mysql.performance.qcache_free_memory         | GAUGE       |
| mysql.performance.qcache_not_cached          | RATE        |
| mysql.performance.qcache_queries_in_cache    | GAUGE       |
| mysql.performance.select_full_join           | RATE        |
| mysql.performance.select_full_range_join     | RATE        |
| mysql.performance.select_range               | RATE        |
| mysql.performance.select_range_check         | RATE        |
| mysql.performance.select_scan                | RATE        |
| mysql.performance.sort_merge_passes          | RATE        |
| mysql.performance.sort_range                 | RATE        |
| mysql.performance.sort_rows                  | RATE        |
| mysql.performance.sort_scan                  | RATE        |
| mysql.performance.table_locks_immediate      | GAUGE       |
| mysql.performance.table_locks_immediate.rate | RATE        |
| mysql.performance.threads_cached             | GAUGE       |
| mysql.performance.threads_created            | MONOTONIC   |

`extra_innodb_metrics` ajoute les métriques suivantes :

| Nom de la métrique                                 | Type de la métrique |
| ------------------------------------------- | ----------- |
| mysql.innodb.active_transactions            | GAUGE       |
| mysql.innodb.buffer_pool_data               | GAUGE       |
| mysql.innodb.buffer_pool_pages_data         | GAUGE       |
| mysql.innodb.buffer_pool_pages_dirty        | GAUGE       |
| mysql.innodb.buffer_pool_pages_flushed      | RATE        |
| mysql.innodb.buffer_pool_pages_free         | GAUGE       |
| mysql.innodb.buffer_pool_pages_total        | GAUGE       |
| mysql.innodb.buffer_pool_read_ahead         | RATE        |
| mysql.innodb.buffer_pool_read_ahead_evicted | RATE        |
| mysql.innodb.buffer_pool_read_ahead_rnd     | GAUGE       |
| mysql.innodb.buffer_pool_wait_free          | MONOTONIC   |
| mysql.innodb.buffer_pool_write_requests     | RATE        |
| mysql.innodb.checkpoint_age                 | GAUGE       |
| mysql.innodb.current_transactions           | GAUGE       |
| mysql.innodb.data_fsyncs                    | RATE        |
| mysql.innodb.data_pending_fsyncs            | GAUGE       |
| mysql.innodb.data_pending_reads             | GAUGE       |
| mysql.innodb.data_pending_writes            | GAUGE       |
| mysql.innodb.data_read                      | RATE        |
| mysql.innodb.data_written                   | RATE        |
| mysql.innodb.dblwr_pages_written            | RATE        |
| mysql.innodb.dblwr_writes                   | RATE        |
| mysql.innodb.hash_index_cells_total         | GAUGE       |
| mysql.innodb.hash_index_cells_used          | GAUGE       |
| mysql.innodb.history_list_length            | GAUGE       |
| mysql.innodb.ibuf_free_list                 | GAUGE       |
| mysql.innodb.ibuf_merged                    | RATE        |
| mysql.innodb.ibuf_merged_delete_marks       | RATE        |
| mysql.innodb.ibuf_merged_deletes            | RATE        |
| mysql.innodb.ibuf_merged_inserts            | RATE        |
| mysql.innodb.ibuf_merges                    | RATE        |
| mysql.innodb.ibuf_segment_size              | GAUGE       |
| mysql.innodb.ibuf_size                      | GAUGE       |
| mysql.innodb.lock_structs                   | RATE        |
| mysql.innodb.locked_tables                  | GAUGE       |
| mysql.innodb.locked_transactions            | GAUGE       |
| mysql.innodb.log_waits                      | RATE        |
| mysql.innodb.log_write_requests             | RATE        |
| mysql.innodb.log_writes                     | RATE        |
| mysql.innodb.lsn_current                    | RATE        |
| mysql.innodb.lsn_flushed                    | RATE        |
| mysql.innodb.lsn_last_checkpoint            | RATE        |
| mysql.innodb.mem_adaptive_hash              | GAUGE       |
| mysql.innodb.mem_additional_pool            | GAUGE       |
| mysql.innodb.mem_dictionary                 | GAUGE       |
| mysql.innodb.mem_file_system                | GAUGE       |
| mysql.innodb.mem_lock_system                | GAUGE       |
| mysql.innodb.mem_page_hash                  | GAUGE       |
| mysql.innodb.mem_recovery_system            | GAUGE       |
| mysql.innodb.mem_thread_hash                | GAUGE       |
| mysql.innodb.mem_total                      | GAUGE       |
| mysql.innodb.os_file_fsyncs                 | RATE        |
| mysql.innodb.os_file_reads                  | RATE        |
| mysql.innodb.os_file_writes                 | RATE        |
| mysql.innodb.os_log_pending_fsyncs          | GAUGE       |
| mysql.innodb.os_log_pending_writes          | GAUGE       |
| mysql.innodb.os_log_written                 | RATE        |
| mysql.innodb.pages_created                  | RATE        |
| mysql.innodb.pages_read                     | RATE        |
| mysql.innodb.pages_written                  | RATE        |
| mysql.innodb.pending_aio_log_ios            | GAUGE       |
| mysql.innodb.pending_aio_sync_ios           | GAUGE       |
| mysql.innodb.pending_buffer_pool_flushes    | GAUGE       |
| mysql.innodb.pending_checkpoint_writes      | GAUGE       |
| mysql.innodb.pending_ibuf_aio_reads         | GAUGE       |
| mysql.innodb.pending_log_flushes            | GAUGE       |
| mysql.innodb.pending_log_writes             | GAUGE       |
| mysql.innodb.pending_normal_aio_reads       | GAUGE       |
| mysql.innodb.pending_normal_aio_writes      | GAUGE       |
| mysql.innodb.queries_inside                 | GAUGE       |
| mysql.innodb.queries_queued                 | GAUGE       |
| mysql.innodb.read_views                     | GAUGE       |
| mysql.innodb.rows_deleted                   | RATE        |
| mysql.innodb.rows_inserted                  | RATE        |
| mysql.innodb.rows_read                      | RATE        |
| mysql.innodb.rows_updated                   | RATE        |
| mysql.innodb.s_lock_os_waits                | RATE        |
| mysql.innodb.s_lock_spin_rounds             | RATE        |
| mysql.innodb.s_lock_spin_waits              | RATE        |
| mysql.innodb.semaphore_wait_time            | GAUGE       |
| mysql.innodb.semaphore_waits                | GAUGE       |
| mysql.innodb.tables_in_use                  | GAUGE       |
| mysql.innodb.x_lock_os_waits                | RATE        |
| mysql.innodb.x_lock_spin_rounds             | RATE        |
| mysql.innodb.x_lock_spin_waits              | RATE        |

`extra_performance_metrics` ajoute les métriques suivantes :

| Nom de la métrique                                     | Type de la métrique |
| ----------------------------------------------- | ----------- |
| mysql.performance.query_run_time.avg            | GAUGE       |
| mysql.performance.digest_95th_percentile.avg_us | GAUGE       |

`schema_size_metrics` ajoute la métrique suivante :

| Nom de la métrique            | Type de la métrique |
| ---------------------- | ----------- |
| mysql.info.schema.size | GAUGE       |

### Événements

Le check MySQL n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "mysql" >}}


## Dépannage

- [Problèmes de connexion avec l'intégration SQL Server][7]
- [Erreur de connexion à MySQL sur localhost – Localhost et 127.0.0.1][8]
- [Est-il possible d'utiliser une instance nommée au sein de l'intégration SQL Server ?][9]
- [Est-il possible de configurer le check dd-agent MySQL sur mon Google Cloud SQL ?][10]
- [Requêtes personnalisées MySQL][11]
- [Vous souhaitez recueillir des métriques de performance SQL Server autres que celles disponibles dans la table sys.dm_os_performance_counters ? Essayez WMI.][12]
- [Comment recueillir des métriques supplémentaires à partir de l'intégration SQL Server ?][13]
- [L'utilisateur de la base de données n'a pas les droits d'accès nécessaires][14]
- [Comment recueillir des métriques avec une procédure stockée SQL ?][15]

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveillance des métriques de performance MySQL][16]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mysql/images/mysql-dash-dd.png
[2]: https://mariadb.org
[3]: https://mariadb.com/kb/en/library/mariadb-vs-mysql-compatibility
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/fr/integrations/faq/connection-issues-with-the-sql-server-integration/
[8]: https://docs.datadoghq.com/fr/integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1/
[9]: https://docs.datadoghq.com/fr/integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration/
[10]: https://docs.datadoghq.com/fr/integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql/
[11]: https://docs.datadoghq.com/fr/integrations/faq/how-to-collect-metrics-from-custom-mysql-queries/
[12]: https://docs.datadoghq.com/fr/integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi/
[13]: https://docs.datadoghq.com/fr/integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration/
[14]: https://docs.datadoghq.com/fr/integrations/faq/database-user-lacks-privileges/
[15]: https://docs.datadoghq.com/fr/integrations/guide/collect-sql-server-custom-metrics/#collecting-metrics-from-a-custom-procedure
[16]: https://www.datadoghq.com/blog/monitoring-mysql-performance-metrics