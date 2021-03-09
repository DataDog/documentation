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
  - 'https://github.com/DataDog/integrations-core/blob/master/mysql/README.md'
description: MySQL インテグレーションは、MySQL サーバーインスタンスからパフォーマンスメトリクスと可用性メトリクスを収集するのに役立ちます。
display_name: MySQL
draft: false
git_integration_title: mysql
guid: 056bfc7f-4775-4581-9442-502078593d10
integration_id: mysql
integration_title: MySQL
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: mysql.
metric_to_check: mysql.net.connections
name: MySQL
process_signatures:
  - mysqld
public_title: Datadog-MySQL インテグレーション
short_description: パフォーマンススキーマメトリクス、クエリスループット、カスタムメトリクスなどを収集。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![MySQL ダッシュボード][1]

## 概要

Datadog Agent は MySQL データベースから、次のような多数のメトリクスを収集できます (一例)。

- クエリスループット
- クエリパフォーマンス (平均クエリ実行時間、低速なクエリなど)
- 接続数 (現在開かれている接続、中断された接続、エラーなど)
- InnoDB (バッファプールメトリクスなど)

カスタム SQL クエリを使用して、独自のメトリクスを作成することもできます。

**注:** [MariaDB][2] は MySQL の ["互換製品"][3] なので、このインテグレーションは MariaDB とも互換性があります。

## セットアップ

### インストール

MySQL チェックは [Datadog Agent][4] パッケージに含まれています。MySQL サーバーに追加でインストールする必要はありません。

#### MySQL の準備

各 MySQL サーバーで、Datadog Agent 用のデータベースユーザーを作成します。

```shell
mysql> CREATE USER 'datadog'@'localhost' IDENTIFIED BY '<一意のパスワード>';
Query OK, 0 rows affected (0.00 sec)
```

mySQL 8.0+ の場合は、ネイティブのパスワードハッシュ化メソッドを使用して `datadog` ユーザーを作成します。

```shell
mysql> CREATE USER 'datadog'@'localhost' IDENTIFIED WITH mysql_native_password by '<一意のパスワード>';
Query OK, 0 rows affected (0.00 sec)
```

**注**: `@'localhost'` はローカル接続専用です。リモート接続には Agent のホスト名/IP を使用してください。詳細については、[MySQL のドキュメント][5]を参照してください。

次のコマンドを使用して、ユーザーが問題なく作成されたことを検証します。`<一意のパスワード>` は上記で作成したパスワードに置き換えます。

```shell
mysql -u datadog --password=<UNIQUEPASSWORD> -e "show status" | \
grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
echo -e "\033[0;31mCannot connect to MySQL\033[0m"
```

```shell
mysql -u datadog --password=<一意のパスワード> -e "show slave status" && \
echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
echo -e "\033[0;31mMissing REPLICATION CLIENT grant\033[0m"
```

Agent がメトリクスを収集するには、いくつかの権限が必要です。次のように、限られた権限のみをユーザーに付与してください。

```shell
mysql> GRANT REPLICATION CLIENT ON *.* TO 'datadog'@'localhost' WITH MAX_USER_CONNECTIONS 5;
Query OK, 0 rows affected, 1 warning (0.00 sec)

mysql> GRANT PROCESS ON *.* TO 'datadog'@'localhost';
Query OK, 0 rows affected (0.00 sec)
```

MySQL 8.0 以降の場合は、`max_user_connections` を次のように設定します。

```shell
mysql> ALTER USER 'datadog'@'localhost' WITH MAX_USER_CONNECTIONS 5;
Query OK, 0 rows affected (0.00 sec)
```

有効になると、追加の権限を付与することで、`performance_schema` データベースからメトリクスを収集できます。

```shell
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

### コンフィギュレーション

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

MySQL の[メトリクス](#メトリクスの収集)と[ログ](#ログ収集)の収集を開始するには、[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `mysql.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル mysql.d/conf.yaml][2] を参照してください。

##### メトリクスの収集

- [MySQL メトリクス](#metrics)を収集するには、`mysql.d/conf.yaml` に次の構成ブロックを追加します。

  ```yaml
  init_config:

  instances:
    - server: 127.0.0.1
      user: datadog
      pass: "<YOUR_CHOSEN_PASSWORD>" # from the CREATE USER step earlier
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

**注**: パスワードに特殊文字が含まれる場合は、単一引用符で囲んでください。

`extra_performance_metrics` を収集するには、MySQL サーバーで `performance_schema` が有効になっている必要があります。それ以外の場合は、`extra_performance_metrics` を `false` に設定します。`performance_schema` の詳細については、[MySQL ドキュメントを参照してください][3]。

`datadog` ユーザーは、`localhost` ではなく `host: 127.0.0.1` として MySQL インテグレーション構成内にセットアップされる必要があります。または、`sock` を使用することもできます。

カスタムメトリクスのオプションなど、使用可能なすべてのコンフィギュレーションオプションについては、[サンプル mysql.yaml][2] を参照してください。

[Agent を再起動][4]すると、Datadog への MySQL メトリクスの送信が開始されます。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. MySQL は、デフォルトでは `/var/log/syslog` 内のすべてをログに記録しますが、これには、読み取りのルートアクセス許可が必要です。ログへのアクセス可能性を高めるには、以下の手順に従ってください。

   - `/etc/mysql/conf.d/mysqld_safe_syslog.cnf` を編集して、行を削除またはコメントにします。
   - `/etc/mysql/my.cnf` を編集し、次の行を追加して、一般ログ、エラーログ、および低速なクエリログを有効にします。

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

   - ファイルを保存し、次のコマンドを使用して MySQL を再起動します。
     `service mysql restart`
   - Agent が `/var/log/mysql` ディレクトリとその中のすべてのファイルに対する読み取りアクセス許可を持つことを確認します。logrotate 構成もチェックして、これらのファイルが考慮され、アクセス許可が正しく設定されていることを確認します。
   - `/etc/logrotate.d/mysql-server` の内容は次のようになります。

     ```text
       /var/log/mysql.log /var/log/mysql/mysql.log /var/log/mysql/mysql_slow.log {
               daily
               rotate 7
               missingok
               create 644 mysql adm
               Compress
       }
     ```

2. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

3. MySQL のログの収集を開始するには、次の構成ブロックを `mysql.d/conf.yaml` ファイルに追加します。

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

    カスタムメトリクスのオプションなど、使用可能なすべてのコンフィギュレーションオプションについては、[サンプル mysql.yaml][2] を参照してください。

4. [Agent を再起動します][4]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[3]: https://dev.mysql.com/doc/refman/5.7/en/performance-schema-quick-start.html
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| `<インテグレーション名>` | `mysql`                                                                |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                          |
| `<インスタンスコンフィギュレーション>`  | `{"server": "%%host%%", "user": "datadog","pass": "<UNIQUEPASSWORD>"}` |

`<UNIQUEPASSWORD>` をラベルではなく環境変数として渡す方法については、[オートディスカバリーテンプレート変数に関するドキュメント][2]を参照してください。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][3]を参照してください。

| パラメーター      | 値                                     |
| -------------- | ----------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "mysql", "service": "mysql"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/faq/template_variables/
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `mysql` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "mysql" >}}


このチェックは、デフォルトではすべてのメトリクスを収集しません。以下のブール値構成オプションを `true` に設定することで、対応するメトリクスが有効になります。

`extra_status_metrics` は、次のメトリクスを追加します。

| メトリクス名                                  | メトリクスタイプ |
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
| mysql.performance.threads_created            | 単調増加 (MONOTONIC)   |

`extra_innodb_metrics` は、次のメトリクスを追加します。

| メトリクス名                                 | メトリクスタイプ |
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
| mysql.innodb.buffer_pool_wait_free          | 単調増加 (MONOTONIC)   |
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

`extra_performance_metrics` は、次のメトリクスを追加します。

| メトリクス名                                     | メトリクスタイプ |
| ----------------------------------------------- | ----------- |
| mysql.performance.query_run_time.avg            | GAUGE       |
| mysql.performance.digest_95th_percentile.avg_us | GAUGE       |

`schema_size_metrics` は、次のメトリクスを追加します。

| メトリクス名            | メトリクスタイプ |
| ---------------------- | ----------- |
| mysql.info.schema.size | GAUGE       |

### イベント

MySQL チェックには、イベントは含まれません。

### サービスのチェック

**mysql.replication.replica_running**:<br>
`Replica_IO_Running` および `Replica_SQL_Running` の両方を実行していないレプリカに `CRITICAL` を、いずれかのみが実行していない場合は `WARNING` を返します。それ以外の場合は、`OK` を返します。詳細については、[こちら][7]を参照してください。

**mysql.replication.slave_running**:<br>
`mysql.replication.replica_running` に置き換えられ、非推奨となりました。`Replica_IO_Running` および `Replica_SQL_Running` の両方を実行していないレプリカに `CRITICAL` を、いずれかのみが実行していない場合は `WARNING` を返します。それ以外の場合は、`OK` を返します。詳細については、[こちら][7]を参照してください。

**mysql.can_connect**:<br>
Agent が MySQL に接続してメトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

- [SQL Server インテグレーションでの接続の問題][8]
- [MySQL Localhost エラー - Localhost と 127.0.0.1][9]
- [SQL Server インテグレーションで名前付きインスタンスを使用できますか][10]
- [Google CloudSQL で dd-agent MySQL チェックをセットアップできますか][11]
- [カスタム MySQL クエリからメトリクスを収集する方法 ][12]
- [sys.dm_os_performance_counters テーブルにあるメトリクス以外の SQL Server パフォーマンスメトリクスを収集できますか？WMI をお試しください][13]
- [SQL Server インテグレーションからさらに多くのメトリクスを収集するには？][14]
- [データベースユーザーに権限がありません][15]
- [SQL ストアドプロシージャを使用してメトリクスを収集する方法][16]

## その他の参考資料

Datadog を使用した MySQL の監視については、[一連のブログ記事][17]を参照してください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mysql/images/mysql-dash-dd.png
[2]: https://mariadb.org
[3]: https://mariadb.com/kb/en/library/mariadb-vs-mysql-compatibility
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/mysql/assets/SERVICE_CHECK_CLARIFICATION.md
[8]: https://docs.datadoghq.com/ja/integrations/faq/connection-issues-with-the-sql-server-integration/
[9]: https://docs.datadoghq.com/ja/integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1/
[10]: https://docs.datadoghq.com/ja/integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration/
[11]: https://docs.datadoghq.com/ja/integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql/
[12]: https://docs.datadoghq.com/ja/integrations/faq/how-to-collect-metrics-from-custom-mysql-queries/
[13]: https://docs.datadoghq.com/ja/integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi/
[14]: https://docs.datadoghq.com/ja/integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration/
[15]: https://docs.datadoghq.com/ja/integrations/faq/database-user-lacks-privileges/
[16]: https://docs.datadoghq.com/ja/integrations/guide/collect-sql-server-custom-metrics/#collecting-metrics-from-a-custom-procedure
[17]: https://www.datadoghq.com/blog/monitoring-mysql-performance-metrics