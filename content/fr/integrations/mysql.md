---
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
  - 'https://github.com/DataDog/integrations-core/blob/master/mysql/README.md'
description: L'intégration MySQL vous permet de recueillir des métriques sur les performances et la disponibilité. from MySQL server instances.
display_name: MySQL
git_integration_title: mysql
guid: 056bfc7f-4775-4581-9442-502078593d10
integration_id: mysql
integration_title: MySQL
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: mysql.
metric_to_check: mysql.net.connections
name: MySQL
process_signatures:
  - mysqld
public_title: Intégration Datadog/MySQL
short_description: 'Récupérez des métriques de schéma de performance, le débit de requêtes, des métriques custom, et plus encore. and more.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard MySQL][1]

## Présentation

L'Agent Datadog peut recueillir de nombreuses métriques à partir des bases de données MySQL, notamment (sans s'y limiter) :

* Le dédit de requêtes
* Les performances des requêtes (p. ex., délai d'exécution moyen des requêtes, requêtes lentes, etc.)
* Les connexions (p. ex., connexions actives, connexions interrompues, erreurs, etc.)
* InnoDB (p. ex., métriques de pool de buffer, etc.)

Vous pouvez également créer vos propres métriques à l'aide de requêtes SQL personnalisées.

**Remarque :** Cette intégration est également compatible avec [MariaDB](https://mariadb.org/), car elle sert de [« remplacement »][24] pour MySQL.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check MySQL est inclus avec le paquet de l'[Agent Datadog][3]. Vous n'avez donc rien d'autre à installer sur votre serveur MySQL.

### Configuration

Modifiez le fichier `mysql.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et [logs](#collecte-de-logs) MySQL. Consultez le [fichier d'exemple mysql.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

#### Préparer MySQL

Sur chaque serveur MySQL, créez un utilisateur de base de données pour l'Agent Datadog :

```
mysql> CREATE USER 'datadog'@'localhost' IDENTIFIED BY '<MOTDEPASSEUNIQUE>';
Query OK, 0 rows affected (0.00 sec)
```

Pour mySQL 8.0+, créez l'utilisateur `datadog` avec la méthode de hachage de mot de passe natif :

```
mysql> CREATE USER 'datadog'@'localhost' IDENTIFIED WITH mysql_native_password by '<MOTDEPASSEUNIQUE>';
Query OK, 0 rows affected (0.00 sec)
```

**Remarque** : `@'localhost'` fonctionne uniquement pour les connexions locales. Utilisez le hostname ou l'adresse IP de votre Agent pour les connexions à distance. Pour en savoir plus, consultez la [documentation de MySQL][6].


Vérifiez que l'utilisateur a bien été créé à l'aide des commandes suivantes. Remplacez ```<MOTDEPASSEUNIQUE>``` par le mot de passe que vous avez créé ci-dessus :

```
mysql -u datadog --password=<MOTDEPASSEUNIQUE> -e "show status" | \
grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
echo -e "\033[0;31mCannot connect to MySQL\033[0m"
```
```
mysql -u datadog --password=<MOTDEPASSEUNIQUE> -e "show slave status" && \
echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
echo -e "\033[0;31mMissing REPLICATION CLIENT grant\033[0m"
```

L'Agent a besoin de certains privilèges pour recueillir des métriques. Accordez UNIQUEMENT à l'utilisateur les privilèges limités suivants :

```
mysql> GRANT REPLICATION CLIENT ON *.* TO 'datadog'@'localhost' WITH MAX_USER_CONNECTIONS 5;
Query OK, 0 rows affected, 1 warning (0.00 sec)

mysql> GRANT PROCESS ON *.* TO 'datadog'@'localhost';
Query OK, 0 rows affected (0.00 sec)
```

Pour mySQL 8.0+, définissez `max_user_connections` avec :

```
mysql> ALTER USER 'datadog'@'localhost' WITH MAX_USER_CONNECTIONS 5;
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

* Ajoutez ce bloc de configuration à votre fichier `mysql.d/conf.yaml` pour recueillir vos [métriques MySQL](#metriques) :

  ```
  init_config:

  instances:
    - server: 127.0.0.1
      user: datadog
      pass: '<YOUR_CHOSEN_PASSWORD>' # from the CREATE USER step earlier
      port: <YOUR_MYSQL_PORT> # e.g. 3306
      options:
          replication: 0
          galera_cluster: true
          extra_status_metrics: true
          extra_innodb_metrics: true
          extra_performance_metrics: true
          schema_size_metrics: false
          disable_innodb_metrics: false
  ```

**Remarque** : ajoutez des guillemets simples autour de votre mot de passe s'il contient un caractère spécial.

Pour recueillir d'autres métriques de performances (`extra_performance_metrics`), l'option `performance_schema` doit être activée sur votre serveur MySQL, sans quoi `extra_performance_metrics` est défini sur `false`. Pour en savoir plus sur l'option `performance_schema`, [consultez la documentation de MySQL][7].

Notez que l'utilisateur `datadog` doit être défini dans la configuration d'intégration de MySQL en tant que `host: 127.0.0.1` au lieu de `localhost`. Vous pouvez également utiliser `sock`.

Consultez notre [fichier d'exemple mysql.yaml][8] pour découvrir toutes les options de configuration disponibles, notamment pour les métriques custom.

[Redémarrez l'Agent][9] pour commencer à envoyer des métriques MySQL à Datadog.

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. Par défaut, MySQL enregistre toutes les données dans `/var/log/syslog`, dont la lecture nécessite un accès racine. Pour rendre les logs plus accessibles, voici les étapes à suivre :

    - Modifiez `/etc/mysql/conf.d/mysqld_safe_syslog.cnf` et supprimez ou commentez les lignes.
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

    - Enregistrez le fichier et redémarrez MySQL à l'aide des commandes suivantes :
      `service mysql restart`
    - Assurez-vous que l'Agent dispose d'une autorisation de lecture pour le répertoire `/var/log/mysql` et tous ses fichiers. Vérifiez votre configuration de logrotate pour vous assurer que ces fichiers sont pris en compte et que les autorisations sont correctement définies.
    - Dans `/etc/logrotate.d/mysql-server`, vous devriez voir des lignes de code similaires à ce qui suit :

      ```
        /var/log/mysql.log /var/log/mysql/mysql.log /var/log/mysql/mysql-slow.log {
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
   Consultez notre [fichier d'exemple mysql.yaml][8] pour découvrir toutes les options de configuration disponibles, notamment pour les métriques custom.

4. [Redémarrez l'Agent][9].

### Validation

[Lancez la sous-commande status de l'Agent][11] et cherchez `mysql` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "mysql" >}}


Par défaut, le check ne recueille pas toutes les métriques. Définissez les options de configuration booléennes suivantes sur `true` pour activer les métriques respectives :

`extra_status_metrics` ajoute les métriques suivantes :

| Nom de la métrique                                  | Type de métrique |
|----------------------------------------------|-------------|
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

| Nom de la métrique                                 | Type de métrique |
|---------------------------------------------|-------------|
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

| Nom de la métrique                                     | Type de métrique |
|-------------------------------------------------|-------------|
| mysql.performance.query_run_time.avg            | GAUGE       |
| mysql.performance.digest_95th_percentile.avg_us | GAUGE       |

`schema_size_metrics` ajoute les métriques suivantes :

| Nom de la métrique            | Type de métrique |
|------------------------|-------------|
| mysql.info.schema.size | GAUGE       |

### Événements

Le check MySQL n'inclut aucun événement.

### Checks de service

**mysql.replication.slave_running** <br>:
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à l'instance MySQL qu'il surveille. Si ce n'est pas le cas, renvoie `OK`. Consultez [cette page][13] pour en savoir plus.

**mysql.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à MySQL pour recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

* [Problèmes de connexion avec l'intégration SQL Server][14]
* [Erreur du localhost MySQL – Localhost VS 127.0.0.1][15]
* [Puis-je utiliser une instance nommée au sein de l'intégration SQL Server ?][16]
* [Puis-je configurer le check dd-agent MySQL sur mon Google Cloud SQL ?][17]
* [Comment recueillir des métriques à partir de requêtes MySQL personnalisées][18]
* [Vous souhaitez recueillir des métriques de performance SQL Server autres que celles disponibles dans la table sys.dm_os_performance_counters ? Essayez WMI][19]
* [Comment puis-je collecter plus de métriques à partir de mon intégration SQL Server ?][20]
* [Utilisateur de la base de données avec des privilèges insuffisants][21]
* [Comment recueillir des métriques avec une procédure stockée SQL ?][22]

## Pour aller plus loin
Lisez notre [série d'articles de blog][23] à propos de la surveillance MySQL avec Datadog.

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mysql/images/mysql-dash-dd.png
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[6]: https://dev.mysql.com/doc/refman/5.7/en/adding-users.html
[7]: https://dev.mysql.com/doc/refman/5.7/en/performance-schema-quick-start.html
[8]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/mysql/metadata.csv
[13]: https://github.com/DataDog/integrations-core/blob/master/mysql/assets/SERVICE_CHECK_CLARIFICATION.md
[14]: https://docs.datadoghq.com/fr/integrations/faq/connection-issues-with-the-sql-server-integration
[15]: https://docs.datadoghq.com/fr/integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1
[16]: https://docs.datadoghq.com/fr/integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration
[17]: https://docs.datadoghq.com/fr/integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql
[18]: https://docs.datadoghq.com/fr/integrations/faq/how-to-collect-metrics-from-custom-mysql-queries
[19]: https://docs.datadoghq.com/fr/integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi
[20]: https://docs.datadoghq.com/fr/integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration
[21]: https://docs.datadoghq.com/fr/integrations/faq/database-user-lacks-privileges
[22]: https://docs.datadoghq.com/fr/integrations/faq/how-to-collect-metrics-with-sql-stored-procedure
[23]: https://www.datadoghq.com/blog/monitoring-mysql-performance-metrics
[24]: https://mariadb.com/kb/en/library/mariadb-vs-mysql-compatibility


{{< get-dependencies >}}