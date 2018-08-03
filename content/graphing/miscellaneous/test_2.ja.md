---
title: MySQL チェック
kind: 文書
draft: true
---

# MySQL チェック

## 概要

Datadog エージェントは、MySQL データベースから多くのメトリックを収集することができます。これには次が含まれます (がこれに限定されません):

* クエリスループット
* クエリパフォーマンス (クエリの平均実行時間やクエリの遅延など)
* 接続 (現在開いている接続、中断した接続、エラーなど)
* InnoDB (バッファプールメトリックなど)

また、カスタム SQL クエリを使って独自のメトリックを作成することもできます。

## セットアップ

### インストール

MySQL チェックは [Datadog エージェント][13] パッケージに含まれているため、MySQL サーバーの他にインストールする必要があるものはありません。

### 構成

エージェントを MySQL サーバーに接続するためには、エージェントのディレクトリのルートで `conf.d/mysql.d/conf.yaml` を編集します。すぐに MySQL [メトリック](#metric-collection)と[ログ](#log-collection)の収集が始まります。利用できる全構成オプションについては、[サンプル構成ファイル][16]を参照してください。

#### MySQL を準備

各 MySQL サーバーで、Datadog エージェントに対するデータベースユーザーを作成します。

```
mysql> CREATE USER 'datadog'@'localhost' IDENTIFIED BY '<UNIQUEPASSWORD>';
Query OK, 0 rows affected (0.00 sec)
```

なお、`@'localhost'` はローカル接続の場合のみです。リモート接続の場合は、エージェントのホスト名/IP を使います。詳しくは、[MySQL 文書][14]を参照してください。


次のコマンドを使ってユーザーが正常に作成されたことを確認します。```<UNIQUEPASSWORD>``` は上で作成したパスワードに置き換えます。

```
mysql -u datadog --password=<UNIQUEPASSWORD> -e "show status" | \
grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
echo -e "\033[0;31mCannot connect to MySQL\033[0m"
mysql -u datadog --password=<UNIQUEPASSWORD> -e "show slave status" && \
echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
echo -e "\033[0;31mMissing REPLICATION CLIENT grant\033[0m"
```

メトリックを収集するために、エージェントにはいくつかの権限が必要です。ユーザーに次の限定された権限のみを付与します。

```
mysql> GRANT REPLICATION CLIENT ON *.* TO 'datadog'@'localhost' WITH MAX_USER_CONNECTIONS 5;
Query OK, 0 rows affected, 1 warning (0.00 sec)

mysql> GRANT PROCESS ON *.* TO 'datadog'@'localhost';
Query OK, 0 rows affected (0.00 sec)
```

有効になると、追加権限を付与することでメトリックを `performance_schema` データベースから収集することができます。

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

#### メトリックの収集

* [MySQL メトリック](#metrics)の収集を始めるためには、この構成ブロックを `mysql.d/conf.yaml` に追加します。

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

**注**: 特殊文字がある場合はパスワードを一重引用符で囲みます。

`extra_performance_metrics` を収集するためには、MySQL サーバーで `performance_schema` が有効になっている必要があります。そうでない場合は、`extra_performance_metrics` を `false` に設定します。`performance_schema` について詳しくは、[MySQL 文書を参照][15]してください。

なお、`datadog` ユーザーは MySQL インテグレーション構成で `localhost` ではなく `host: 127.0.0.1` としてセットアップされる必要があります。または、`sock` を使うこともできます。

利用できる全構成オプション (カスタムメトリクスに対するものを含む) については、[mysql.yaml の例][16]を参照してください。

[Agent を再起動][17]して MySQL メトリックを Datadog に送信し始めます。

#### ログの収集

**Agent >6.0 が対象**

1. デフォルトで MySQL は `/var/log/syslog` のすべてをログします。これを読み取るためにはルートアクセス権が必要です。ログによりアクセスできるようするためには、次の手順を行います。

  - `/etc/mysql/conf.d/mysqld_safe_syslog.cnf` を編集してこの行を削除するか、これにコメントします。
  - `/etc/mysql/my.cnf` を編集し、次の行を追加して一般、エラー、および遅延クエリログを有効にします。

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

  - ファイルを保存して次のコマンドを使って MySQL を再起動します:
    `service mysql restart`
  - エージェントに `/var/log/mysql` ディレクトリとその中のすべてのファイルに対する読み取りアクセス権があることを確認します。また、logrotate 構成をダブルチェックして、これらのファイルが考慮されていることと、パーミッションが正しく設定されていることも確認します。
  - `/etc/logrotate.d/mysql-server` には、次に類似するものがある必要があります。

    ```
    /var/log/mysql.log /var/log/mysql/mysql.log /var/log/mysql/mysql-slow.log {
            daily
            rotate 7
            missingok
            create 644 mysql adm
            Compress
    }
    ```

2. Datadog エージェントではログの収集はデフォルトで無効になっているため、`datadog.yaml` で有効にする必要があります。

    ```
    logs_enabled: true
    ```

3. この構成セットアップを `mysql.d/conf.yaml` ファイルに追加して、MySQL ログの収集を始めます。

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
   利用できる全構成オプション (カスタムメトリクスに対するものを含む) については、[mysql.yaml の例][16]を参照してください。

4. [エージェントを再起動][17]します。

**ログの収集について詳しくは、[ログ文書][18]を参照してください**

### 確認

[エージェントの `status` サブコマンドを実行][19]して、チェックセクションで `mysql` を探します。

## 収集されたデータ

### メトリック

このインテグレーションによって提供されるメトリックのリストについては、[metadata.csv][20] を参照してください。

チェックはデフォルトではすべてのメトリックを収集しません。それぞれのメトリックを有効にするには、次のブール構成オプションを `true` に設定します。

`extra_status_metrics` は次のメトリックを追加します。

|メトリック名| メトリックタイプ|
|----------|--------|
| mysql.binlog.cache_disk_use | ゲージ |
| mysql.binlog.cache_use | ゲージ |
| mysql.performance.handler_commit | レート |
| mysql.performance.handler_delete | レート |
| mysql.performance.handler_prepare | レート |
| mysql.performance.handler_read_first | レート |
| mysql.performance.handler_read_key | レート |
| mysql.performance.handler_read_next | レート |
| mysql.performance.handler_read_prev | レート |
| mysql.performance.handler_read_rnd | レート |
| mysql.performance.handler_read_rnd_next | レート |
| mysql.performance.handler_rollback | レート |
| mysql.performance.handler_update | レート |
| mysql.performance.handler_write | レート |
| mysql.performance.opened_tables | レート |
| mysql.performance.qcache_total_blocks | ゲージ |
| mysql.performance.qcache_free_blocks | ゲージ |
| mysql.performance.qcache_free_memory | ゲージ |
| mysql.performance.qcache_not_cached | レート |
| mysql.performance.qcache_queries_in_cache | ゲージ |
| mysql.performance.select_full_join | レート |
| mysql.performance.select_full_range_join | レート |
| mysql.performance.select_range | レート |
| mysql.performance.select_range_check | レート |
| mysql.performance.select_scan | レート |
| mysql.performance.sort_merge_passes | レート |
| mysql.performance.sort_range | レート |
| mysql.performance.sort_rows | レート |
| mysql.performance.sort_scan | レート |
| mysql.performance.table_locks_immediate | ゲージ |
| mysql.performance.table_locks_immediate.rate | レート |
| mysql.performance.threads_cached | ゲージ |
| mysql.performance.threads_created | モノトニック |

`extra_innodb_metrics` は次のメトリックを追加します。

|メトリック名| メトリックタイプ|
|----------|--------|
| mysql.innodb.active_transactions | ゲージ |
| mysql.innodb.buffer_pool_data | ゲージ |
| mysql.innodb.buffer_pool_pages_data | ゲージ |
| mysql.innodb.buffer_pool_pages_dirty | ゲージ |
| mysql.innodb.buffer_pool_pages_flushed | レート |
| mysql.innodb.buffer_pool_pages_free | ゲージ |
| mysql.innodb.buffer_pool_pages_total | ゲージ |
| mysql.innodb.buffer_pool_read_ahead | レート |
| mysql.innodb.buffer_pool_read_ahead_evicted | レート |
| mysql.innodb.buffer_pool_read_ahead_rnd | ゲージ |
| mysql.innodb.buffer_pool_wait_free | モノトニック |
| mysql.innodb.buffer_pool_write_requests | レート |
| mysql.innodb.checkpoint_age | ゲージ |
| mysql.innodb.current_transactions | ゲージ |
| mysql.innodb.data_fsyncs | レート |
| mysql.innodb.data_pending_fsyncs | ゲージ |
| mysql.innodb.data_pending_reads | ゲージ |
| mysql.innodb.data_pending_writes | ゲージ |
| mysql.innodb.data_read | レート |
| mysql.innodb.data_written | レート |
| mysql.innodb.dblwr_pages_written | レート |
| mysql.innodb.dblwr_writes | レート |
| mysql.innodb.hash_index_cells_total | ゲージ |
| mysql.innodb.hash_index_cells_used | ゲージ |
| mysql.innodb.history_list_length | ゲージ |
| mysql.innodb.ibuf_free_list | ゲージ |
| mysql.innodb.ibuf_merged | レート |
| mysql.innodb.ibuf_merged_delete_marks | レート |
| mysql.innodb.ibuf_merged_deletes | レート |
| mysql.innodb.ibuf_merged_inserts | レート |
| mysql.innodb.ibuf_merges | レート |
| mysql.innodb.ibuf_segment_size | ゲージ |
| mysql.innodb.ibuf_size | ゲージ |
| mysql.innodb.lock_structs | レート |
| mysql.innodb.locked_tables | ゲージ |
| mysql.innodb.locked_transactions | ゲージ |
| mysql.innodb.log_waits | レート |
| mysql.innodb.log_write_requests | レート |
| mysql.innodb.log_writes | レート |
| mysql.innodb.lsn_current | レート |
| mysql.innodb.lsn_flushed | レート |
| mysql.innodb.lsn_last_checkpoint | レート |
| mysql.innodb.mem_adaptive_hash | ゲージ |
| mysql.innodb.mem_additional_pool | ゲージ |
| mysql.innodb.mem_dictionary | ゲージ |
| mysql.innodb.mem_file_system | ゲージ |
| mysql.innodb.mem_lock_system | ゲージ |
| mysql.innodb.mem_page_hash | ゲージ |
| mysql.innodb.mem_recovery_system | ゲージ |
| mysql.innodb.mem_thread_hash | ゲージ |
| mysql.innodb.mem_total | ゲージ |
| mysql.innodb.os_file_fsyncs | レート |
| mysql.innodb.os_file_reads | レート |
| mysql.innodb.os_file_writes | レート |
| mysql.innodb.os_log_pending_fsyncs | ゲージ |
| mysql.innodb.os_log_pending_writes | ゲージ |
| mysql.innodb.os_log_written | レート |
| mysql.innodb.pages_created | レート |
| mysql.innodb.pages_read | レート |
| mysql.innodb.pages_written | レート |
| mysql.innodb.pending_aio_log_ios | ゲージ |
| mysql.innodb.pending_aio_sync_ios | ゲージ |
| mysql.innodb.pending_buffer_pool_flushes | ゲージ |
| mysql.innodb.pending_checkpoint_writes | ゲージ |
| mysql.innodb.pending_ibuf_aio_reads | ゲージ |
| mysql.innodb.pending_log_flushes | ゲージ |
| mysql.innodb.pending_log_writes | ゲージ |
| mysql.innodb.pending_normal_aio_reads | ゲージ |
| mysql.innodb.pending_normal_aio_writes | ゲージ |
| mysql.innodb.queries_inside | ゲージ |
| mysql.innodb.queries_queued | ゲージ |
| mysql.innodb.read_views | ゲージ |
| mysql.innodb.rows_deleted | レート |
| mysql.innodb.rows_inserted | レート |
| mysql.innodb.rows_read | レート |
| mysql.innodb.rows_updated | レート |
| mysql.innodb.s_lock_os_waits | レート |
| mysql.innodb.s_lock_spin_rounds | レート |
| mysql.innodb.s_lock_spin_waits | レート |
| mysql.innodb.semaphore_wait_time | ゲージ |
| mysql.innodb.semaphore_waits | ゲージ |
| mysql.innodb.tables_in_use | ゲージ |
| mysql.innodb.x_lock_os_waits | レート |
| mysql.innodb.x_lock_spin_rounds | レート |
| mysql.innodb.x_lock_spin_waits | レート |

`extra_performance_metrics` は次のメトリックを追加します。

|メトリック名| メトリックタイプ|
|----------|--------|
| mysql.performance.query_run_time.avg | ゲージ |
| mysql.performance.digest_95th_percentile.avg_us | ゲージ |

`schema_size_metrics` は次のメトリックを追加します。

|メトリック名| メトリックタイプ|
|----------|--------|
| mysql.info.schema.size | ゲージ |

### イベント

MySQL チェックにはイベントは含まれません。

### サービスチェック

`mysql.replication.slave_running`:

実行していないスレーブに対しては CRITICAL を、それ以外に対しては OK を返します。

`mysql.can_connect`:

エージェントが MySQL に接続してメトリックを収集できない場合は CRITICAL を、それ以外に対しては OK を返します。

## トラブルシューティング

* [SQL サーバーインテグレーションの接続問題][21]
* [MySQL Localhost エラー - Localhost VS 127.0.0.1][22]
* [SQL サーバーインテグレーションで名前付きインスタンスを使うことはできますか？][23]
* [Google CloudSQL で dd-agent MySQL チェックをセットアップできますか？][24]
* [カスタム MySQL クエリからのメトリックの収集方法][25]
* [sys.dm_os_performance_counters テーブルで利用可能な範囲を超えて SQL サーバーのパフォーマンスメトリックを収集することはできますか？WMI を試す][26]
* [SQL サーバー統合からさらに多くのメトリックを収集するには？][27]
* [データベースユーザーの権限の欠如][28]

## その他の参照先
Datadog による MySQL モニタリングに関する[ブログシリーズ][29]をご覧ください。


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
