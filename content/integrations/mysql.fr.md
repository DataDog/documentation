---
categories:
- data store
- log collection
ddtype: check
description: L'intégration MySQL permet la récupération des métriques de performance et de disponibilité.
  from MySQL server instances.
display_name: MySQL
doc_link: https://docs.datadoghq.com/integrations/mysql/
git_integration_title: mysql
guid: 056bfc7f-4775-4581-9442-502078593d10
has_logo: true
integration_title: MySQL
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: MySQL
public_title: Intégration Datadog-MySQL
resources:
  bot: resources/bot_mysql.png
  monitor_editor: resources/monitor_mysql.png
  my_image: resources/mysql.png
  small: resources/small_mysql.png
short_description: Récupérez les métriques du schéma de performance, du débit de requètes, et de métriques custom.
  and more.
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.1.3
---



## Aperçu

L'agent Datadog peut collecter de nombreuses métriques à partir des bases de données MySQL, notamment:

* Débit de requètes
* Performances des requêtes (temps d'exécution moyen des requêtes, requêtes lentes, etc.)
* Connexions (connexions actuellement ouvertes, connexions interrompues, erreurs, etc.)
* InnoDB (métriques de buffer pool, etc)

Et beaucoup plus. Vous pouvez également inventer vos propres métriques à l'aide des requêtes SQL personnalisées.

## Implémentation
### Installation

Le check MySQL est packagé avec l'agent, il vous faut donc simplement [installer l'agent] (https://app.datadoghq.com/account/settings#agent).

### Configuration

Créez un fichier `mysql.yaml` dans le répertoire` conf.d` de l'Agent pour le connecter au serveur MySQL.

#### Préparer MySQL

Sur chaque serveur MySQL, créez un utilisateur de base de données pour l'agent Datadog:

```
mysql> CREATE USER 'datadog'@'localhost' IDENTIFIED BY '<UNIQUEPASSWORD>';
Query OK, 0 rows affected (0.00 sec)
```

Veuillez noter que `@'localhost'` est seulement pour les connexions locales, utilisez le nom d'host/IP de votre agent pour les connexions à distance, en savoir plus [ici](https://dev.mysql.com/doc/refman/5.7/en/adding-users.html)


Vérifiez que l'utilisateur a été créé avec succès en utilisant la commande suivante, en remplaçant  ```<UNIQUEPASSWORD>``` par le mot de passe ci-dessus:

```
mysql -u datadog --password=<UNIQUEPASSWORD> -e "show status" | \
grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
echo -e "\033[0;31mCannot connect to MySQL\033[0m"
mysql -u datadog --password=<UNIQUEPASSWORD> -e "show slave status" && \
echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
echo -e "\033[0;31mMissing REPLICATION CLIENT grant\033[0m"
```

L'agent a besoin de quelques privilèges pour collecter des métriques. Accordez à son utilisateur SEULEMENT les privilèges suivants:

```
mysql> GRANT REPLICATION CLIENT ON *.* TO 'datadog'@'localhost' WITH MAX_USER_CONNECTIONS 5;
Query OK, 0 rows affected, 1 warning (0.00 sec)

mysql> GRANT PROCESS ON *.* TO 'datadog'@'localhost';
Query OK, 0 rows affected (0.00 sec)
```

Si la base de données `performance_schema` est activée sur le serveur MySQL et que vous souhaitez y collecter des métriques, l'utilisateur de l'agent a besoin d'un autre` GRANT`. Vérifiez que `performance_schema` existe et exécutez le` GRANT` si c'est le cas:

```
mysql> show databases like 'performance_schema';
+-------------------------------+
| Database (performance_schema) |
+-------------------------------+
| performance_schema            |
+-------------------------------+
1 row in set (0.00 sec)

mysql> GRANT SELECT ON performance_schema.* TO 'datadog'@'localhost';
Query OK, 0 rows affected (0.00 sec)
```

#### Collecte de métrique

* Ajoutez cette configuration à votre fichier `mysql.yaml` pour commencer à rassembler vos [métriques MySQL](#metriques):

  ```
  init_config:

  instances:
    - server: 127.0.0.1
      user: datadog
      pass: <YOUR_CHOSEN_PASSWORD> # from the CREATE USER step earlier
      port: <YOUR_MYSQL_PORT> # e.g. 3306
      options:
          replication: 0
          galera_cluster: 1
          extra_status_metrics: true
          extra_innodb_metrics: true
          extra_performance_metrics: true
          schema_size_metrics: false
          disable_innodb_metrics: false
  ```
  Afin de rassembler extra_performance_metrics, votre serveur MySQL doit avoir le performance_schema activé. [Consultez la documentation de MySQL](https://dev.mysql.com/doc/refman/5.7/en/performance-schema-quick-start.html) pour l'activer, sinon définissez extra_performance_metrics sur false.
  Créez un fichier `mysql.yaml` dans le dossier ` conf.d` de l'Agent. Consultez l'exemple du [canevas mysql.yaml](https://github.com/Datadog/integrations-core/blob/master/mysql/conf.yaml.example) pour apprendre toutes les options de configuration disponibles:

L'utilisateur `datadog` doit être configuré dans la configuration d'intégration de MySQL en tant que `host: 127.0.0.1` au lieu de `localhost`. Alternativement, vous pouvez également utiliser `sock`.

* [Redémarrez l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent) pour commencer à envoyer vos métriques MySQL à Datadog.

#### Collecte de log

**Disponible pour l'Agent >6.0**

1. Par défaut, MySQL enregistre tout dans /var/log/syslog ce qui nécessite un accès root en lecture. Pour changer cela et avoir des fichiers spécifiques pour logs MySQL, procédez comme suit:

  - Modifiez `/etc/mysql/conf.d/mysqld_safe_syslog.cnf` et supprimez ou commentez les lignes.
  - Editez `/etc/mysql/my.cnf`  et ajoutez les lignes suivantes pour activer les logs de requêtes, d'erreurs et de requêtes lentes:

    ```
    [mysqld_safe]
    log_error=/var/log/mysql/mysql_error.log
    [mysqld]
    general_log = on
    general_log_file = /var/log/mysql/mysql.log
    log_error=/var/log/mysql/mysql_error.log
    slow_query_log = on
    slow_query_log_file = /var/log/mysql/mysql-slow.log
    long_query_time = 2
    ```

  - Enregistrez le fichier et redémarrez MySQL en utilisant les commandes suivantes:
    `service mysql restart`
  - Assurez-vous que l'Agent a un accès en lecture sur ces fichiers (et le répertoire `/var/log/mysql` ) et vérifiez votre configuration de logrotate pour vous assurer que ces fichiers sont pris en compte et que les permissions sont correctement définies.
  - Dans `/etc/logrotate.d/mysql-serverthere` il devrait avoir quelque chose de similaire à:

    ```
    /var/log/mysql.log /var/log/mysql/mysql.log /var/log/mysql/mysql-slow.log {
            daily
            rotate 7
            missingok
            create 644 mysql adm
            Compress
    }
    ```

2. La collecte des logs est désactivée par défaut dans l'Agent Datadog, vous devez l'activer dans `datadog.yaml`:

    ```
    logs_enabled: true
    ```

3. Ajoutez cette configuration à votre fichier `mysql.yaml` pour commencer à collecter vos logs MySQL:

    ```
    logs:
        - type: file
          path: /var/log/mysql/mysql_error.log
          source: mysql
          sourcecategory: database
          service: myapplication

        - type: file
          path: /var/log/mysql/mysql-slow.log
          source: mysql
          sourcecategory: database
          service: myapplication

        - type: file
          path: /var/log/mysql/mysql.log
          source: mysql
          sourcecategory: database
          service: myapplication
          # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
          # log_processing_rules:
          #   - type: multi_line
          #     name: new_log_start_with_date
          #     pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```
    Consultez l'exemple du [canevas mysql.yaml](https://github.com/Datadog/integrations-core/blob/master/mysql/conf.yaml.example) pour apprendre toutes les options de configuration disponibles:

4. [Redémarrez l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent).

**En apprendre plus sur la collecte de logs [sur la documentation des logs](https://docs.datadoghq.com/logs)**

### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `mysql` dans la section Checks:

```
Checks
======

  [...]

  mysql
  -----
    - instance #0 [OK]
    - Collected 168 metrics, 0 events & 1 service check

  [...]
```

## Compatibilité

L'intégration MySQL est supportée sur les versions x.x+

## Données collectées
### Métriques
{{< get-metrics-from-git "mysql" >}}


Le check ne collecte pas toutes les métriques par défaut. Définissez les options de configuration booléenne suivantes sur `true` pour activer ces métriques:

`extra_status_metrics` Ajoute les métriques suivantes:

|Nom de la métrique| Type de la métrique|
|----------|--------|
| mysql.binlog.cache_disk_use | GAUGE |
| mysql.binlog.cache_use | GAUGE |
| mysql.performance.handler_commit | RATE |
| mysql.performance.handler_delete | RATE |
| mysql.performance.handler_prepare | RATE |
| mysql.performance.handler_read_first | RATE |
| mysql.performance.handler_read_key | RATE |
| mysql.performance.handler_read_next | RATE |
| mysql.performance.handler_read_prev | RATE |
| mysql.performance.handler_read_rnd | RATE |
| mysql.performance.handler_read_rnd_next | RATE |
| mysql.performance.handler_rollback | RATE |
| mysql.performance.handler_update | RATE |
| mysql.performance.handler_write | RATE |
| mysql.performance.opened_tables | RATE |
| mysql.performance.qcache_total_blocks | GAUGE |
| mysql.performance.qcache_free_blocks | GAUGE |
| mysql.performance.qcache_free_memory | GAUGE |
| mysql.performance.qcache_not_cached | RATE |
| mysql.performance.qcache_queries_in_cache | GAUGE |
| mysql.performance.select_full_join | RATE |
| mysql.performance.select_full_range_join | RATE |
| mysql.performance.select_range | RATE |
| mysql.performance.select_range_check | RATE |
| mysql.performance.select_scan | RATE |
| mysql.performance.sort_merge_passes | RATE |
| mysql.performance.sort_range | RATE |
| mysql.performance.sort_rows | RATE |
| mysql.performance.sort_scan | RATE |
| mysql.performance.table_locks_immediate | GAUGE |
| mysql.performance.table_locks_immediate.rate | RATE |
| mysql.performance.threads_cached | GAUGE |
| mysql.performance.threads_created | MONOTONIC |

`extra_innodb_metrics` Ajoute les métriques suivantes:

|Nom de la métrique| Type de la métrique|
|----------|--------|
| mysql.innodb.active_transactions | GAUGE |
| mysql.innodb.buffer_pool_data | GAUGE |
| mysql.innodb.buffer_pool_pages_data | GAUGE |
| mysql.innodb.buffer_pool_pages_dirty | GAUGE |
| mysql.innodb.buffer_pool_pages_flushed | RATE |
| mysql.innodb.buffer_pool_pages_free | GAUGE |
| mysql.innodb.buffer_pool_pages_total | GAUGE |
| mysql.innodb.buffer_pool_read_ahead | RATE |
| mysql.innodb.buffer_pool_read_ahead_evicted | RATE |
| mysql.innodb.buffer_pool_read_ahead_rnd | GAUGE |
| mysql.innodb.buffer_pool_wait_free | MONOTONIC |
| mysql.innodb.buffer_pool_write_requests | RATE |
| mysql.innodb.checkpoint_age | GAUGE |
| mysql.innodb.current_transactions | GAUGE |
| mysql.innodb.data_fsyncs | RATE |
| mysql.innodb.data_pending_fsyncs | GAUGE |
| mysql.innodb.data_pending_reads | GAUGE |
| mysql.innodb.data_pending_writes | GAUGE |
| mysql.innodb.data_read | RATE |
| mysql.innodb.data_written | RATE |
| mysql.innodb.dblwr_pages_written | RATE |
| mysql.innodb.dblwr_writes | RATE |
| mysql.innodb.hash_index_cells_total | GAUGE |
| mysql.innodb.hash_index_cells_used | GAUGE |
| mysql.innodb.history_list_length | GAUGE |
| mysql.innodb.ibuf_free_list | GAUGE |
| mysql.innodb.ibuf_merged | RATE |
| mysql.innodb.ibuf_merged_delete_marks | RATE |
| mysql.innodb.ibuf_merged_deletes | RATE |
| mysql.innodb.ibuf_merged_inserts | RATE |
| mysql.innodb.ibuf_merges | RATE |
| mysql.innodb.ibuf_segment_size | GAUGE |
| mysql.innodb.ibuf_size | GAUGE |
| mysql.innodb.lock_structs | RATE |
| mysql.innodb.locked_tables | GAUGE |
| mysql.innodb.locked_transactions | GAUGE |
| mysql.innodb.log_waits | RATE |
| mysql.innodb.log_write_requests | RATE |
| mysql.innodb.log_writes | RATE |
| mysql.innodb.lsn_current | RATE |
| mysql.innodb.lsn_flushed | RATE |
| mysql.innodb.lsn_last_checkpoint | RATE |
| mysql.innodb.mem_adaptive_hash | GAUGE |
| mysql.innodb.mem_additional_pool | GAUGE |
| mysql.innodb.mem_dictionary | GAUGE |
| mysql.innodb.mem_file_system | GAUGE |
| mysql.innodb.mem_lock_system | GAUGE |
| mysql.innodb.mem_page_hash | GAUGE |
| mysql.innodb.mem_recovery_system | GAUGE |
| mysql.innodb.mem_thread_hash | GAUGE |
| mysql.innodb.mem_total | GAUGE |
| mysql.innodb.os_file_fsyncs | RATE |
| mysql.innodb.os_file_reads | RATE |
| mysql.innodb.os_file_writes | RATE |
| mysql.innodb.os_log_pending_fsyncs | GAUGE |
| mysql.innodb.os_log_pending_writes | GAUGE |
| mysql.innodb.os_log_written | RATE |
| mysql.innodb.pages_created | RATE |
| mysql.innodb.pages_read | RATE |
| mysql.innodb.pages_written | RATE |
| mysql.innodb.pending_aio_log_ios | GAUGE |
| mysql.innodb.pending_aio_sync_ios | GAUGE |
| mysql.innodb.pending_buffer_pool_flushes | GAUGE |
| mysql.innodb.pending_checkpoint_writes | GAUGE |
| mysql.innodb.pending_ibuf_aio_reads | GAUGE |
| mysql.innodb.pending_log_flushes | GAUGE |
| mysql.innodb.pending_log_writes | GAUGE |
| mysql.innodb.pending_normal_aio_reads | GAUGE |
| mysql.innodb.pending_normal_aio_writes | GAUGE |
| mysql.innodb.queries_inside | GAUGE |
| mysql.innodb.queries_queued | GAUGE |
| mysql.innodb.read_views | GAUGE |
| mysql.innodb.rows_deleted | RATE |
| mysql.innodb.rows_inserted | RATE |
| mysql.innodb.rows_read | RATE |
| mysql.innodb.rows_updated | RATE |
| mysql.innodb.s_lock_os_waits | RATE |
| mysql.innodb.s_lock_spin_rounds | RATE |
| mysql.innodb.s_lock_spin_waits | RATE |
| mysql.innodb.semaphore_wait_time | GAUGE |
| mysql.innodb.semaphore_waits | GAUGE |
| mysql.innodb.tables_in_use | GAUGE |
| mysql.innodb.x_lock_os_waits | RATE |
| mysql.innodb.x_lock_spin_rounds | RATE |
| mysql.innodb.x_lock_spin_waits | RATE |

`extra_performance_metrics` Ajoute les métriques suivantes:

|Nom de la métrique| Type de la métrique|
|----------|--------|
| mysql.performance.query_run_time.avg | GAUGE |
| mysql.performance.digest_95th_percentile.avg_us | GAUGE |

`schema_size_metrics` Ajoute les métriques suivantes:

|Nom de la métrique| Type de la métrique|
|----------|--------|
| mysql.info.schema.size | GAUGE |

### Evénements
Le check MySQL n'inclut aucun événement pour le moment.

### Checks de Service

`mysql.replication.slave_running`:

Renvoie CRITICAL si un slave n'est pas actif, sinon OK.

`mysql.can_connect`:

Renvoie CRITICAL si l'agent ne peut pas se connecter à MySQL pour collecter des métriques, sinon OK.

## Troubleshooting

* [Problème de connection avec l'intégration SQL Server](https://docs.datadoghq.com/integrations/faq/connection-issues-with-the-sql-server-integration)
* [Erreur Localhost MySQL - Localhost VS 127.0.0.1](https://docs.datadoghq.com/integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1)
* [Puis-je utiliser une instance nommée dans l'intégration SQL Server?](https://docs.datadoghq.com/integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration)
* [Puis-je configurer le check dd-agent MySQL sur mon Google CloudSQL?](https://docs.datadoghq.com/integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql)
* [Comment collecter des métriques à partir de requêtes MySQL personnalisées](https://docs.datadoghq.com/integrations/faq/how-to-collect-metrics-from-custom-mysql-queries)
* [Puis-je collecter des métriques de performance SQL Server au-delà de ce qui est disponible dans la table sys.dm_os_performance_counters? Essayez WMI](https://docs.datadoghq.com/integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi)
* [Comment puis-je collecter plus de métriques à partir de mon intégration SQL Server?](https://docs.datadoghq.com/integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration)
* [L'utilisateur de la base de données manque de privilèges](https://docs.datadoghq.com/integrations/faq/database-user-lacks-privileges)

## En apprendre plus
Lisez notre [série d'articles de blog](https://www.datadoghq.com/blog/monitoring-mysql-performance-metrics/) sur le monitoring de MySQL avec Datadog.

