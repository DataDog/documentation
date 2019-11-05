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
description: MySQL インテグレーションは、パフォーマンスおよび可用性メトリクスの収集に役立ちます。 from MySQL server instances.
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
public_title: Datadog-MySQL インテグレーション
short_description: パフォーマンススキーマメトリクス、クエリスループット、カスタムメトリクスなどを収集 and more.
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![MySQL ダッシュボード][1]

## 概要

Datadog Agent は MySQL データベースから、次のような多数のメトリクスを収集できます (一例)。

* クエリスループット
* クエリパフォーマンス (平均クエリ実行時間、低速なクエリなど)
* 接続数 (現在開かれている接続、中断された接続、エラーなど)
* InnoDB (バッファプールメトリクスなど)

カスタム SQL クエリを使用して、独自のメトリクスを作成することもできます。

**注:** [MariaDB][2] は MySQL の ["互換製品"][3] なので、このインテグレーションは MariaDB とも互換性があります。

## セットアップ
### インストール

MySQL チェックは [Datadog Agent][4] パッケージに含まれています。MySQL サーバーに追加でインストールする必要はありません。

#### MySQL の準備

各 MySQL サーバーで、Datadog Agent 用のデータベースユーザーを作成します。

```
mysql> CREATE USER 'datadog'@'localhost' IDENTIFIED BY '<UNIQUEPASSWORD>';
Query OK, 0 rows affected (0.00 sec)
```

mySQL 8.0+ の場合は、ネイティブのパスワードハッシュ化メソッドを使用して `datadog` ユーザーを作成します。

```
mysql> CREATE USER 'datadog'@'localhost' IDENTIFIED WITH mysql_native_password by '<UNIQUEPASSWORD>';
Query OK, 0 rows affected (0.00 sec)
```

**注**: `@'localhost'` はローカル接続専用です。リモート接続には Agent のホスト名/IP を使用してください。詳細については、[MySQL のドキュメント][5]を参照してください。


次のコマンドを使用して、ユーザーが正常に作成されたかどうかを検証します。```<UNIQUEPASSWORD>``` は、上で作成したパスワードに置き換えてください。

```
mysql -u datadog --password=<UNIQUEPASSWORD> -e "show status" | \
grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
echo -e "\033[0;31mCannot connect to MySQL\033[0m"
```
```
mysql -u datadog --password=<UNIQUEPASSWORD> -e "show slave status" && \
echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
echo -e "\033[0;31mMissing REPLICATION CLIENT grant\033[0m"
```

Agent がメトリクスを収集するには、いくつかの権限が必要です。次のように、限られた権限のみをユーザーに付与してください。

```
mysql> GRANT REPLICATION CLIENT ON *.* TO 'datadog'@'localhost' WITH MAX_USER_CONNECTIONS 5;
Query OK, 0 rows affected, 1 warning (0.00 sec)

mysql> GRANT PROCESS ON *.* TO 'datadog'@'localhost';
Query OK, 0 rows affected (0.00 sec)
```

mySQL 8.0+ の場合は、`max_user_connections` を設定します。

```
mysql> ALTER USER 'datadog'@'localhost' WITH MAX_USER_CONNECTIONS 5;
Query OK, 0 rows affected (0.00 sec)
```

有効になると、追加の権限を付与することで、`performance_schema` データベースからメトリクスを収集できます。

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

### コンフィグレーション

ホストで実行されている Agent 用にこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#containerized)セクションを参照してください。

#### ホスト

MySQL の[メトリクス](#metric-collection)と[ログ](#log-collection)の収集を開始するには、[Agent の構成ディレクトリ][6]のルートにある `conf.d/` フォルダーの `mysql.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル mysql.d/conf.yaml][7] を参照してください。

##### メトリクスの収集

* [MySQL メトリクス](#metrics)を収集するには、`mysql.d/conf.yaml` に次の構成ブロックを追加します。

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

**注**: パスワードに特殊文字が含まれる場合は、単一引用符で囲んでください。

`extra_performance_metrics` を収集するには、MySQL サーバーで `performance_schema` が有効になっている必要があります。それ以外の場合は、`extra_performance_metrics` を `false` に設定します。`performance_schema` の詳細については、[MySQL ドキュメントを参照してください][8]。

`datadog` ユーザーは、`localhost` ではなく `host: 127.0.0.1` として MySQL インテグレーション構成内にセットアップされる必要があります。または、`sock` を使用することもできます。

カスタムメトリクスのオプションなど、使用可能なすべての構成オプションの詳細については、[サンプル mysql.yaml][9] を参照してください。

[Agent を再起動][10]すると、Datadog への MySQL メトリクスの送信が開始されます。

##### ログの収集

**Agent 6.0 以上で使用可能**

1. MySQL は、デフォルトでは `/var/log/syslog` 内のすべてをログに記録しますが、これには、読み取りのルートアクセス許可が必要です。ログへのアクセス可能性を高めるには、以下の手順に従ってください。

    - `/etc/mysql/conf.d/mysqld_safe_syslog.cnf` を編集して、行を削除またはコメントにします。
    - `/etc/mysql/my.cnf` を編集し、次の行を追加して、一般ログ、エラーログ、および低速なクエリログを有効にします。

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

    - ファイルを保存し、次のコマンドを使用して MySQL を再起動します。
      `service mysql restart`
    - Agent が `/var/log/mysql` ディレクトリとその中のすべてのファイルに対する読み取りアクセス許可を持つことを確認します。logrotate 構成もチェックして、これらのファイルが考慮され、アクセス許可が正しく設定されていることを確認します。
    - `/etc/logrotate.d/mysql-server` の内容は次のようになります。

      ```
        /var/log/mysql.log /var/log/mysql/mysql.log /var/log/mysql/mysql-slow.log {
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
    カスタムメトリクスのオプションなど、使用可能なすべての構成オプションの詳細については、[サンプル mysql.yaml][9] を参照してください。

4. [Agent を再起動します][10]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][11]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                                  |
|----------------------|------------------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `mysql`                                                                |
| `<INIT_CONFIG>`      | 空白または `{}`                                                          |
| `<INSTANCE_CONFIG>`  | `{"server": "%%host%%", "user": "datadog","pass": "<UNIQUEPASSWORD>"}` |


`<UNIQUEPASSWORD>` をラベルではなく環境変数として渡す方法については、[オートディスカバリーテンプレート変数に関するドキュメント][12]を参照してください。

##### ログの収集

**Agent v6.5 以上で使用可能**

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Docker ログ収集][13]を参照してください。

| パラメーター      | 値                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "mysql", "service": "mysql"}` |

### 検証

[Agent の status サブコマンドを実行][14]し、Checks セクションで `mysql` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "mysql" >}}


このチェックは、デフォルトではすべてのメトリクスを収集しません。以下のブール値構成オプションを `true` に設定することで、対応するメトリクスが有効になります。

`extra_status_metrics` は、次のメトリクスを追加します。

| メトリクス名                                  | メトリクスタイプ |
|----------------------------------------------|-------------|
| mysql.binlog.cache_disk_use                  | ゲージ (GAUGE)       |
| mysql.binlog.cache_use                       | ゲージ (GAUGE)       |
| mysql.performance.handler_commit             | レート (RATE)        |
| mysql.performance.handler_delete             | レート (RATE)        |
| mysql.performance.handler_prepare            | レート (RATE)        |
| mysql.performance.handler_read_first         | レート (RATE)        |
| mysql.performance.handler_read_key           | レート (RATE)        |
| mysql.performance.handler_read_next          | レート (RATE)        |
| mysql.performance.handler_read_prev          | レート (RATE)        |
| mysql.performance.handler_read_rnd           | レート (RATE)        |
| mysql.performance.handler_read_rnd_next      | レート (RATE)        |
| mysql.performance.handler_rollback           | レート (RATE)        |
| mysql.performance.handler_update             | レート (RATE)        |
| mysql.performance.handler_write              | レート (RATE)        |
| mysql.performance.opened_tables              | レート (RATE)        |
| mysql.performance.qcache_total_blocks        | ゲージ (GAUGE)       |
| mysql.performance.qcache_free_blocks         | ゲージ (GAUGE)       |
| mysql.performance.qcache_free_memory         | ゲージ (GAUGE)       |
| mysql.performance.qcache_not_cached          | レート (RATE)        |
| mysql.performance.qcache_queries_in_cache    | ゲージ (GAUGE)       |
| mysql.performance.select_full_join           | レート (RATE)        |
| mysql.performance.select_full_range_join     | レート (RATE)        |
| mysql.performance.select_range               | レート (RATE)        |
| mysql.performance.select_range_check         | レート (RATE)        |
| mysql.performance.select_scan                | レート (RATE)        |
| mysql.performance.sort_merge_passes          | レート (RATE)        |
| mysql.performance.sort_range                 | レート (RATE)        |
| mysql.performance.sort_rows                  | レート (RATE)        |
| mysql.performance.sort_scan                  | レート (RATE)        |
| mysql.performance.table_locks_immediate      | ゲージ (GAUGE)       |
| mysql.performance.table_locks_immediate.rate | レート (RATE)        |
| mysql.performance.threads_cached             | ゲージ (GAUGE)       |
| mysql.performance.threads_created            | 単調増加 (MONOTONIC)   |

`extra_innodb_metrics` は、次のメトリクスを追加します。

| メトリクス名                                 | メトリクスタイプ |
|---------------------------------------------|-------------|
| mysql.innodb.active_transactions            | ゲージ (GAUGE)       |
| mysql.innodb.buffer_pool_data               | ゲージ (GAUGE)       |
| mysql.innodb.buffer_pool_pages_data         | ゲージ (GAUGE)       |
| mysql.innodb.buffer_pool_pages_dirty        | ゲージ (GAUGE)       |
| mysql.innodb.buffer_pool_pages_flushed      | レート (RATE)        |
| mysql.innodb.buffer_pool_pages_free         | ゲージ (GAUGE)       |
| mysql.innodb.buffer_pool_pages_total        | ゲージ (GAUGE)       |
| mysql.innodb.buffer_pool_read_ahead         | レート (RATE)        |
| mysql.innodb.buffer_pool_read_ahead_evicted | レート (RATE)        |
| mysql.innodb.buffer_pool_read_ahead_rnd     | ゲージ (GAUGE)       |
| mysql.innodb.buffer_pool_wait_free          | 単調増加 (MONOTONIC)   |
| mysql.innodb.buffer_pool_write_requests     | レート (RATE)        |
| mysql.innodb.checkpoint_age                 | ゲージ (GAUGE)       |
| mysql.innodb.current_transactions           | ゲージ (GAUGE)       |
| mysql.innodb.data_fsyncs                    | レート (RATE)        |
| mysql.innodb.data_pending_fsyncs            | ゲージ (GAUGE)       |
| mysql.innodb.data_pending_reads             | ゲージ (GAUGE)       |
| mysql.innodb.data_pending_writes            | ゲージ (GAUGE)       |
| mysql.innodb.data_read                      | レート (RATE)        |
| mysql.innodb.data_written                   | レート (RATE)        |
| mysql.innodb.dblwr_pages_written            | レート (RATE)        |
| mysql.innodb.dblwr_writes                   | レート (RATE)        |
| mysql.innodb.hash_index_cells_total         | ゲージ (GAUGE)       |
| mysql.innodb.hash_index_cells_used          | ゲージ (GAUGE)       |
| mysql.innodb.history_list_length            | ゲージ (GAUGE)       |
| mysql.innodb.ibuf_free_list                 | ゲージ (GAUGE)       |
| mysql.innodb.ibuf_merged                    | レート (RATE)        |
| mysql.innodb.ibuf_merged_delete_marks       | レート (RATE)        |
| mysql.innodb.ibuf_merged_deletes            | レート (RATE)        |
| mysql.innodb.ibuf_merged_inserts            | レート (RATE)        |
| mysql.innodb.ibuf_merges                    | レート (RATE)        |
| mysql.innodb.ibuf_segment_size              | ゲージ (GAUGE)       |
| mysql.innodb.ibuf_size                      | ゲージ (GAUGE)       |
| mysql.innodb.lock_structs                   | レート (RATE)        |
| mysql.innodb.locked_tables                  | ゲージ (GAUGE)       |
| mysql.innodb.locked_transactions            | ゲージ (GAUGE)       |
| mysql.innodb.log_waits                      | レート (RATE)        |
| mysql.innodb.log_write_requests             | レート (RATE)        |
| mysql.innodb.log_writes                     | レート (RATE)        |
| mysql.innodb.lsn_current                    | レート (RATE)        |
| mysql.innodb.lsn_flushed                    | レート (RATE)        |
| mysql.innodb.lsn_last_checkpoint            | レート (RATE)        |
| mysql.innodb.mem_adaptive_hash              | ゲージ (GAUGE)       |
| mysql.innodb.mem_additional_pool            | ゲージ (GAUGE)       |
| mysql.innodb.mem_dictionary                 | ゲージ (GAUGE)       |
| mysql.innodb.mem_file_system                | ゲージ (GAUGE)       |
| mysql.innodb.mem_lock_system                | ゲージ (GAUGE)       |
| mysql.innodb.mem_page_hash                  | ゲージ (GAUGE)       |
| mysql.innodb.mem_recovery_system            | ゲージ (GAUGE)       |
| mysql.innodb.mem_thread_hash                | ゲージ (GAUGE)       |
| mysql.innodb.mem_total                      | ゲージ (GAUGE)       |
| mysql.innodb.os_file_fsyncs                 | レート (RATE)        |
| mysql.innodb.os_file_reads                  | レート (RATE)        |
| mysql.innodb.os_file_writes                 | レート (RATE)        |
| mysql.innodb.os_log_pending_fsyncs          | ゲージ (GAUGE)       |
| mysql.innodb.os_log_pending_writes          | ゲージ (GAUGE)       |
| mysql.innodb.os_log_written                 | レート (RATE)        |
| mysql.innodb.pages_created                  | レート (RATE)        |
| mysql.innodb.pages_read                     | レート (RATE)        |
| mysql.innodb.pages_written                  | レート (RATE)        |
| mysql.innodb.pending_aio_log_ios            | ゲージ (GAUGE)       |
| mysql.innodb.pending_aio_sync_ios           | ゲージ (GAUGE)       |
| mysql.innodb.pending_buffer_pool_flushes    | ゲージ (GAUGE)       |
| mysql.innodb.pending_checkpoint_writes      | ゲージ (GAUGE)       |
| mysql.innodb.pending_ibuf_aio_reads         | ゲージ (GAUGE)       |
| mysql.innodb.pending_log_flushes            | ゲージ (GAUGE)       |
| mysql.innodb.pending_log_writes             | ゲージ (GAUGE)       |
| mysql.innodb.pending_normal_aio_reads       | ゲージ (GAUGE)       |
| mysql.innodb.pending_normal_aio_writes      | ゲージ (GAUGE)       |
| mysql.innodb.queries_inside                 | ゲージ (GAUGE)       |
| mysql.innodb.queries_queued                 | ゲージ (GAUGE)       |
| mysql.innodb.read_views                     | ゲージ (GAUGE)       |
| mysql.innodb.rows_deleted                   | レート (RATE)        |
| mysql.innodb.rows_inserted                  | レート (RATE)        |
| mysql.innodb.rows_read                      | レート (RATE)        |
| mysql.innodb.rows_updated                   | レート (RATE)        |
| mysql.innodb.s_lock_os_waits                | レート (RATE)        |
| mysql.innodb.s_lock_spin_rounds             | レート (RATE)        |
| mysql.innodb.s_lock_spin_waits              | レート (RATE)        |
| mysql.innodb.semaphore_wait_time            | ゲージ (GAUGE)       |
| mysql.innodb.semaphore_waits                | ゲージ (GAUGE)       |
| mysql.innodb.tables_in_use                  | ゲージ (GAUGE)       |
| mysql.innodb.x_lock_os_waits                | レート (RATE)        |
| mysql.innodb.x_lock_spin_rounds             | レート (RATE)        |
| mysql.innodb.x_lock_spin_waits              | レート (RATE)        |

`extra_performance_metrics` は、次のメトリクスを追加します。

| メトリクス名                                     | メトリクスタイプ |
|-------------------------------------------------|-------------|
| mysql.performance.query_run_time.avg            | ゲージ (GAUGE)       |
| mysql.performance.digest_95th_percentile.avg_us | ゲージ (GAUGE)       |

`schema_size_metrics` は、次のメトリクスを追加します。

| メトリクス名            | メトリクスタイプ |
|------------------------|-------------|
| mysql.info.schema.size | ゲージ (GAUGE)       |

### イベント

MySQL チェックには、イベントは含まれません。

### サービスのチェック

**mysql.replication.slave_running**:<br>
監視対象の MySQL インスタンスに Agent が接続できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。詳細については、[ここ][13]を参照してください。

**mysql.can_connect**:<br>
Agent が MySQL に接続してメトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

* [SQL Server インテグレーションでの接続の問題][17]
* [MySQL Localhost エラー - Localhost と 127.0.0.1][18]
* [SQL Server インテグレーションで名前付きインスタンスを使用できますか][19]
* [Google CloudSQL で dd-agent MySQL チェックをセットアップできますか][20]
* [カスタム MySQL クエリからメトリクスを収集する方法 ][21]
* [sys.dm_os_performance_counters テーブルにあるメトリクス以外の SQL Server パフォーマンスメトリクスを収集できますか? WMI をお試しください ][22]
* [SQL Server インテグレーションからさらに多くのメトリクスを収集するにはどうすればよいですか][23]
* [データベースユーザーに権限がありません][24]
* [SQL ストアドプロシージャを使用してメトリクスを収集するには][25]

## その他の参考資料

Datadog を使用した MySQL の監視については、[一連のブログ記事][26]を参照してください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mysql/images/mysql-dash-dd.png
[2]: https://mariadb.org
[3]: https://mariadb.com/kb/en/library/mariadb-vs-mysql-compatibility
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://dev.mysql.com/doc/refman/5.7/en/adding-users.html
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[8]: https://dev.mysql.com/doc/refman/5.7/en/performance-schema-quick-start.html
[9]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[12]: https://docs.datadoghq.com/ja/agent/autodiscovery/template_variables
[13]: https://docs.datadoghq.com/ja/agent/docker/log
[14]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[15]: https://github.com/DataDog/integrations-core/blob/master/mysql/metadata.csv
[16]: https://github.com/DataDog/integrations-core/blob/master/mysql/assets/SERVICE_CHECK_CLARIFICATION.md
[17]: https://docs.datadoghq.com/ja/integrations/faq/connection-issues-with-the-sql-server-integration
[18]: https://docs.datadoghq.com/ja/integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1
[19]: https://docs.datadoghq.com/ja/integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration
[20]: https://docs.datadoghq.com/ja/integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql
[21]: https://docs.datadoghq.com/ja/integrations/faq/how-to-collect-metrics-from-custom-mysql-queries
[22]: https://docs.datadoghq.com/ja/integrations/faq/can-i-collect-sql-server-performance-metrics-beyond-what-is-available-in-the-sys-dm-os-performance-counters-table-try-wmi
[23]: https://docs.datadoghq.com/ja/integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration
[24]: https://docs.datadoghq.com/ja/integrations/faq/database-user-lacks-privileges
[25]: https://docs.datadoghq.com/ja/integrations/faq/how-to-collect-metrics-with-sql-stored-procedure
[26]: https://www.datadoghq.com/blog/monitoring-mysql-performance-metrics


{{< get-dependencies >}}