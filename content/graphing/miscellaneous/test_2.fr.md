---
title: Check MySLQ
kind: Documentation
draft: true
---

# Check MySQL

## Présentation

L'agent Datadog peut collecter de nombreuses métriques à partir des bases de données MySQL, notamment (sans s'y limiter) :

* Flux de requêtes
* Performances des requêtes (temps d'exécution moyen des requêtes, requêtes lentes, etc.)
* Connexions (connexions actives, connexions interrompues, erreurs, etc.)
* InnoDB (métriques de buffer pool, etc.)

Vous pouvez également créer vos propres métriques à l'aide de requêtes SQL personnalisées.

## Implémentation

### Installation

Le check MySQL est compris avec l'[agent Datalog][13] : vous n'avez donc rien besoin d'installer de plus sur vos serveurs MySQL.

### Configuration

Modifiez `conf.d/mysql.d/conf.yaml` à la racine du répertoire de votre agent pour connecter ce dernier à votre serveur MySQL. Vous commencerez immédiatement à recueillir vos [métriques](#metric-collection) et [logs](#log-collection) MySQL. Consultez l'[exemple de fichier de configuration][16] pour découvrir toutes les options de configuration disponibles.

#### Préparation de MySQL

Sur chaque serveur MySQL, créez un utilisateur de base de données pour l'agent Datadog :

```
mysql> CREATE USER 'datadog'@'localhost' IDENTIFIED BY '<UNIQUEPASSWORD>';
Query OK, 0 rows affected (0.00 sec)
```

Notez que `@'localhost'` fonctionne uniquement pour les connexions locales : utilisez le nom d'hôte ou l'adresse IP de votre agent pour les connexions à distance. Pour en savoir plus, consultez la [documentation de MySQL][14].


Vérifiez que l'utilisateur a bien été créé à l'aide de la commande suivante : remplacez ```<UNIQUEPASSWORD>``` par le mot de passe que vous avez créé ci-dessus :

```
mysql -u datadog --password=<UNIQUEPASSWORD> -e "show status" | \
grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
echo -e "\033[0;31mCannot connect to MySQL\033[0m"
mysql -u datadog --password=<UNIQUEPASSWORD> -e "show slave status" && \
echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
echo -e "\033[0;31mMissing REPLICATION CLIENT grant\033[0m"
```

L'agent a besoin de certains privilèges pour collecter les métriques. Donnez UNIQUEMENT à l'utilisateur les privilèges limités suivants :

```
mysql> GRANT REPLICATION CLIENT ON *.* TO 'datadog'@'localhost' WITH MAX_USER_CONNECTIONS 5;
Query OK, 0 rows affected, 1 warning (0.00 sec)

mysql> GRANT PROCESS ON *.* TO 'datadog'@'localhost';
Query OK, 0 rows affected (0.00 sec)
```

Si cette option est activée, les métriques peuvent être recueillies dans la base de données `performance_schema` grâce à un privilège supplémentaire :

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

#### Collecte de métriques

* Ajoutez ce bloc de configuration à `mysql.d/conf.yaml` pour commencer à collecter vos [métriques MySQL](#metrics) :

  ```
  init_config:

  instances:
    - server: 127.0.0.1
      user: datadog
      pass: '<YOUR_CHOSEN_PASSWORD>' # from the CREATE USER step earlier
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

**Remarque** : Mettez votre mot de passe entre guillemets simples s'il contient un caractère spécial.

Pour recueillir d'autres métriques de performances (`extra_performance_metrics`), l'option `performance_schema` (schéma de performances) doit être activée sur votre serveur MySQL, sans quoi `extra_performance_metrics` est défini sur `false`. Pour en savoir plus sur `performance_schema`, [consultez la documentation de MySQL][15].

Notez que l'utilisateur `datadog` doit être défini dans la configuration d'intégration de MySQL en tant que `host: 127.0.0.1` au lieu de `localhost`. Vous pouvez également utiliser `sock`.

Consultez notre [exemple de fichier mysql.yaml][16] pour découvrir toutes les options de configuration disponibles, notamment les métriques personnalisées.

[Redémarrez l'agent][17] pour commencer à envoyer des métriques MySQL à Datadog.

#### Collecte de logs

**Disponible à partir des versions >6.0 de l'agent**

1. Par défaut, MySQL enregistre tout dans `/var/log/syslog`, dont la lecture nécessite un accès racine. Pour rendre les logs plus accessibles, voici les étapes à suivre :

  - Modifiez `/etc/mysql/conf.d/mysqld_safe_syslog.cnf` et supprimez les lignes ou mettez-les en commentaire.
  - Modifiez `/etc/mysql/my.cnf` et ajoutez les lignes suivantes pour activer les logs généraux, d'erreurs et de requêtes lentes :

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

  - Enregistrez le fichier et redémarrez MySQL en utilisant les commandes suivantes :
    `service mysql restart`
  - Assurez-vous que l'agent dispose d'un accès en lecture au répertoire `/var/log/mysql` et à ses fichiers. Vérifiez votre configuration de logrotate pour vous assurer que ces fichiers sont pris en compte et que les permissions sont correctement définies.
  - Dans `/etc/logrotate.d/mysql-server`, vous devriez trouver quelque chose comme :

    ```
    /var/log/mysql.log /var/log/mysql/mysql.log /var/log/mysql/mysql-slow.log {
            daily
            rotate 7
            missingok
            create 644 mysql adm
            Compress
    }
    ```

2. La collecte des logs est désactivée par défaut dans l'agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```
    logs_enabled: true
    ```

3. Ajoutez cette configuration à votre fichier `mysql.d/conf.yaml` pour commencer à collecter vos logs MySQL :

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
   Découvrez notre [échantillon mysql.yaml][16] de toutes les options de configuration disponibles, y compris les métriques personnalisées.

4. [Redémarrez l'agent][17].

**En savoir plus sur la collecte de logs [dans la documentation relative aux logs][18]**

### Validation

[Exécutez la sous-commande `status` de l'agent][19] et cherchez `mysql` dans la section Checks.

## Données collectées

### Métriques

Consultez [metadata.csv][20] pour avoir la liste des métriques fournies par cette intégration.

Le check ne collecte pas toutes les métriques par défaut. Définissez les options de configuration booléenne suivantes sur `true` pour activer les métriques respectives :

`extra_status_metrics` ajoute les métriques suivantes :

|Nom de la métrique| Type de métrique|
|----------|--------|
| mysql.binlog.cache_disk_use | JAUGE |
| mysql.binlog.cache_use | JAUGE |
| mysql.performance.handler_commit | TAUX |
| mysql.performance.handler_delete | TAUX |
| mysql.performance.handler_prepare | TAUX |
| mysql.performance.handler_read_first | TAUX |
| mysql.performance.handler_read_key | TAUX |
| mysql.performance.handler_read_next | TAUX |
| mysql.performance.handler_read_prev | TAUX |
| mysql.performance.handler_read_rnd | TAUX |
| mysql.performance.handler_read_rnd_next | TAUX |
| mysql.performance.handler_rollback | TAUX |
| mysql.performance.handler_update | TAUX |
| mysql.performance.handler_write | TAUX |
| mysql.performance.opened_tables | TAUX |
| mysql.performance.qcache_total_blocks | JAUGE |
| mysql.performance.qcache_free_blocks | JAUGE |
| mysql.performance.qcache_free_memory | JAUGE |
| mysql.performance.qcache_not_cached | TAUX |
| mysql.performance.qcache_queries_in_cache | JAUGE |
| mysql.performance.select_full_join | TAUX |
| mysql.performance.select_full_range_join | TAUX |
| mysql.performance.select_range | TAUX |
| mysql.performance.select_range_check | TAUX |
| mysql.performance.select_scan | TAUX |
| mysql.performance.sort_merge_passes | TAUX |
| mysql.performance.sort_range | TAUX |
| mysql.performance.sort_rows | TAUX |
| mysql.performance.sort_scan | TAUX |
| mysql.performance.table_locks_immediate | JAUGE |
| mysql.performance.table_locks_immediate.rate | TAUX |
| mysql.performance.threads_cached | JAUGE |
| mysql.performance.threads_created | UNITONE |

`extra_innodb_metrics` ajoute les métriques suivantes :

|Nom de la métrique| Type de métrique|
|----------|--------|
| mysql.innodb.active_transactions | JAUGE |
| mysql.innodb.buffer_pool_data | JAUGE |
| mysql.innodb.buffer_pool_pages_data | JAUGE |
| mysql.innodb.buffer_pool_pages_dirty | JAUGE |
| mysql.innodb.buffer_pool_pages_flushed | TAUX |
| mysql.innodb.buffer_pool_pages_free | JAUGE |
| mysql.innodb.buffer_pool_pages_total | JAUGE |
| mysql.innodb.buffer_pool_read_ahead | TAUX |
| mysql.innodb.buffer_pool_read_ahead_evicted | TAUX |
| mysql.innodb.buffer_pool_read_ahead_rnd | JAUGE |
| mysql.innodb.buffer_pool_wait_free | UNITONE |
| mysql.innodb.buffer_pool_write_requests | TAUX |
| mysql.innodb.checkpoint_age | JAUGE |
| mysql.innodb.current_transactions | JAUGE |
| mysql.innodb.data_fsyncs | TAUX |
| mysql.innodb.data_pending_fsyncs | JAUGE |
| mysql.innodb.data_pending_reads | JAUGE |
| mysql.innodb.data_pending_writes | JAUGE |
| mysql.innodb.data_read | TAUX |
| mysql.innodb.data_written | TAUX |
| mysql.innodb.dblwr_pages_written | TAUX |
| mysql.innodb.dblwr_writes | TAUX |
| mysql.innodb.hash_index_cells_total | JAUGE |
| mysql.innodb.hash_index_cells_used | JAUGE |
| mysql.innodb.history_list_length | JAUGE |
| mysql.innodb.ibuf_free_list | JAUGE |
| mysql.innodb.ibuf_merged | TAUX |
| mysql.innodb.ibuf_merged_delete_marks | TAUX |
| mysql.innodb.ibuf_merged_deletes | TAUX |
| mysql.innodb.ibuf_merged_inserts | TAUX |
| mysql.innodb.ibuf_merges | TAUX |
| mysql.innodb.ibuf_segment_size | JAUGE |
| mysql.innodb.ibuf_size | JAUGE |
| mysql.innodb.lock_structs | TAUX |
| mysql.innodb.locked_tables | JAUGE |
| mysql.innodb.locked_transactions | JAUGE |
| mysql.innodb.log_waits | TAUX |
| mysql.innodb.log_write_requests | TAUX |
| mysql.innodb.log_writes | TAUX |
| mysql.innodb.lsn_current | TAUX |
| mysql.innodb.lsn_flushed | TAUX |
| mysql.innodb.lsn_last_checkpoint | TAUX |
| mysql.innodb.mem_adaptive_hash | JAUGE |
| mysql.innodb.mem_additional_pool | JAUGE |
| mysql.innodb.mem_dictionary | JAUGE |
| mysql.innodb.mem_file_system | JAUGE |
| mysql.innodb.mem_lock_system | JAUGE |
| mysql.innodb.mem_page_hash | JAUGE |
| mysql.innodb.mem_recovery_system | JAUGE |
| mysql.innodb.mem_thread_hash | JAUGE |
| mysql.innodb.mem_total | JAUGE |
| mysql.innodb.os_file_fsyncs | TAUX |
| mysql.innodb.os_file_reads | TAUX |
| mysql.innodb.os_file_writes | TAUX |
| mysql.innodb.os_log_pending_fsyncs | JAUGE |
| mysql.innodb.os_log_pending_writes | JAUGE |
| mysql.innodb.os_log_written | TAUX |
| mysql.innodb.pages_created | TAUX |
| mysql.innodb.pages_read | TAUX |
| mysql.innodb.pages_written | TAUX |
| mysql.innodb.pending_aio_log_ios | JAUGE |
| mysql.innodb.pending_aio_sync_ios | JAUGE |
| mysql.innodb.pending_buffer_pool_flushes | JAUGE |
| mysql.innodb.pending_checkpoint_writes | JAUGE |
| mysql.innodb.pending_ibuf_aio_reads | JAUGE |
| mysql.innodb.pending_log_flushes | JAUGE |
| mysql.innodb.pending_log_writes | JAUGE |
| mysql.innodb.pending_normal_aio_reads | JAUGE |
| mysql.innodb.pending_normal_aio_writes | JAUGE |
| mysql.innodb.queries_inside | JAUGE |
| mysql.innodb.queries_queued | JAUGE |
| mysql.innodb.read_views | JAUGE |
| mysql.innodb.rows_deleted | TAUX |
| mysql.innodb.rows_inserted | TAUX |
| mysql.innodb.rows_read | TAUX |
| mysql.innodb.rows_updated | TAUX |
| mysql.innodb.s_lock_os_waits | TAUX |
| mysql.innodb.s_lock_spin_rounds | TAUX |
| mysql.innodb.s_lock_spin_waits | TAUX |
| mysql.innodb.semaphore_wait_time | JAUGE |
| mysql.innodb.semaphore_waits | JAUGE |
| mysql.innodb.tables_in_use | JAUGE |
| mysql.innodb.x_lock_os_waits | TAUX |
| mysql.innodb.x_lock_spin_rounds | TAUX |
| mysql.innodb.x_lock_spin_waits | TAUX |

`extra_performance_metrics` ajoute les métriques suivantes :

|Nom de la métrique| Type de métrique|
|----------|--------|
| mysql.performance.query_run_time.avg | JAUGE |
| mysql.performance.digest_95th_percentile.avg_us | JAUGE |

`schema_size_metrics` ajoute les métriques suivantes :

|Nom de la métrique| Type de métrique|
|----------|--------|
| mysql.info.schema.size | JAUGE |

### Événements

Le check MySQL n'inclut aucun événement.

### Checks de service

`mysql.replication.slave_running` :

Renvoie CRITIQUE si l'esclave ne fonctionne pas, sinon OK.

`mysql.can_connect` :

Renvoie CRITIQUE si l'agent ne peut pas se connecter à MySQL pour collecter des métriques, sinon OK.

## Dépannage

* [Problèmes de connexion avec l'intégration SQL Server][21]
* [Erreur de localhost MySQL – Localhost VS 127.0.0.1][22]
* [Puis-je utiliser une instance nommée dans l'intégration SQL Server ?][23]
* [Puis-je configurer le check dd-agent MySQL sur mon Google CloudSQL ?][24]
* [Comment collecter des métriques à partir de requêtes MySQL personnalisées][25]
* [Puis-je collecter des métriques de performance SQL Server en plus des données disponibles dans la table sys.dm_os_performance_counters ? Essayez WMI][26]
* [Comment puis-je collecter plus de métriques à partir de mon intégration SQL Server ?][27]
* [L'utilisateur de la base de données dispose de privilèges insuffisants][28]

## Pour aller plus loin
Lisez notre [série d'articles de blog][29] sur la surveillance MySQL avec Datadog.


[13]: https://app.datadoghq.com/account/settings#agent
[14]: https://dev.mysql.com/doc/refman/5.7/en/adding-users.html
[15]: https://dev.mysql.com/doc/refman/5.7/en/performance-schema-quick-start.html
[16]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[17]: https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent
[18]: https://docs.datadoghq.com/logs
[19]: https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information
[20]: https://github.com/DataDog/integrations-core/blob/master/mysql/metadata.csv
[21]: https://docs.datadoghq.com/integrations/faq/connection-issues-with-the-sql-server-integration
[22]: https://docs.datadoghq.com/integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1
[23]: https://docs.datadoghq.com/integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration
[24]: https://docs.datadoghq.com/integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql
[25]: https://docs.datadoghq.com/integrations/faq/how-to-collect-metrics-from-custom-mysql-queries
[26]: https://docs.datadoghq.com/integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi
[27]: https://docs.datadoghq.com/integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration
[28]: https://docs.datadoghq.com/integrations/faq/database-user-lacks-privileges
[29]: https://www.datadoghq.com/blog/monitoring-mysql-performance-metrics/
