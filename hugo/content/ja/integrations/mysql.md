---
app_id: mysql
categories:
- data stores
- log collection
custom_kind: integration
description: パフォーマンススキーマメトリクス、クエリスループット、カスタムメトリクスなどを収集 and more.
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-mysql-performance-metrics
  tag: blog
  text: MySQL パフォーマンス メトリクスの監視
integration_version: 15.7.1
media: []
supported_os:
- linux
- macos
- windows
title: MySQL
---
![MySQL Dashboard](https://raw.githubusercontent.com/DataDog/integrations-core/master/mysql/images/mysql-dash-dd-2.png)

## 概要

MySQL インテグレーションは、MySQL インスタンスのパフォーマンスを追跡します。スループット、接続、エラー、InnoDB に関するメトリクスを収集します。

データベースのクエリ パフォーマンスとヘルスを詳細に把握するには、[Database Monitoring](https://docs.datadoghq.com/database_monitoring/) (DBM) を有効にしてください。標準インテグレーションに加えて、DBM ではクエリ レベルのメトリクス、ライブおよび履歴クエリ スナップショット、待機イベント分析、データベース負荷、クエリの実行計画を提供します。

MySQL バージョン 5.6、5.7、8.0、および MariaDB バージョン 10.5、10.6、10.11、11.1 がサポートされています。

## セットアップ

<div class="alert alert-info">このページでは、MySQL Agent の標準的なインテグレーションについて説明します。MySQL のデータベースモニタリング製品をお求めの場合は、<a href="https://docs.datadoghq.com/database_monitoring" target="_blank">Datadog データベースモニタリング</a>をご覧ください。</div>

### インストール

MySQL チェックは [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) パッケージに含まれています。MySQL サーバーで追加のインストールは不要です。

#### MySQL の準備

**注**: MySQL 用の Database Monitoring をインストールするには、使用しているホスティング ソリューションを [Database Monitoring ドキュメント](https://docs.datadoghq.com/database_monitoring/#mysql) で選択し、手順を確認してください。

標準のインテグレーションを単体でインストールする場合のみ、このガイドの下記の手順に進んでください。

各 MySQL サーバーで、Datadog Agent 用のデータベースユーザーを作成します。

以下の手順では、`datadog@'%'` を使用して任意のホストからログインできるよう Agent に権限を付与します。ローカルホストのみに `datadog` ユーザーのログインを制限するには、`datadog@'localhost'` を使用してください。詳細は [MySQL アカウントの追加、権限の付与、およびアカウントの削除](https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html) を参照してください。

以下のコマンドで `datadog` ユーザーを作成します。

```shell
mysql> CREATE USER 'datadog'@'%' IDENTIFIED BY '<UNIQUEPASSWORD>';
Query OK, 0 rows affected (0.00 sec)
```

次のコマンドを使用して、ユーザーが問題なく作成されたことを検証します。`<一意のパスワード>` は上記で作成したパスワードに置き換えます。

```shell
mysql -u datadog --password=<UNIQUEPASSWORD> -e "show status" | \
grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
echo -e "\033[0;31mCannot connect to MySQL\033[0m"
```

Agent がメトリクスを収集するには、いくつかの権限が必要です。次のように、限られた権限のみを `datadog` ユーザーに付与してください。

MySQL バージョン 5.6 および 5.7 の場合は、 `replication client` を付与し、次のコマンドで `max_user_connections` を設定します。

```shell
mysql> GRANT REPLICATION CLIENT ON *.* TO 'datadog'@'%' WITH MAX_USER_CONNECTIONS 5;
Query OK, 0 rows affected, 1 warning (0.00 sec)
```

MySQL 8.0 以上の場合は、`replication client` を付与し、次のコマンドで `max_user_connections` を設定します。

```shell
mysql> GRANT REPLICATION CLIENT ON *.* TO 'datadog'@'%';
Query OK, 0 rows affected (0.00 sec)
mysql> ALTER USER 'datadog'@'%' WITH MAX_USER_CONNECTIONS 5;
Query OK, 0 rows affected (0.00 sec)
```

`datadog` ユーザーに PROCESS 権限を付与します。

```shell
mysql> GRANT PROCESS ON *.* TO 'datadog'@'%';
Query OK, 0 rows affected (0.00 sec)
```

レプリケーションクライアントを検証します。`<UNIQUEPASSWORD>` は上記で作成したパスワードに置き換えます。

```shell
mysql -u datadog --password=<一意のパスワード> -e "show slave status" && \
echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
echo -e "\033[0;31mMissing REPLICATION CLIENT grant\033[0m"
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

mysql> GRANT SELECT ON performance_schema.* TO 'datadog'@'%';
Query OK, 0 rows affected (0.00 sec)
```

インデックス メトリクスを収集するには、`datadog` ユーザーに追加の権限を付与してください:

```shell

mysql> GRANT SELECT ON mysql.innodb_index_stats TO 'datadog'@'%';
Query OK, 0 rows affected (0.00 sec)
```

### 設定

ホストで実行されている Agent 用にこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[Docker](?tab=docker#docker)、[Kubernetes](?tab=kubernetes#kubernetes)、または [ECS](?tab=ecs#ecs) セクションを参照してください。

**注**: 利用可能な設定オプションの一覧については、[サンプル mysql.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example) を参照してください。

{{< tabs >}}

{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

MySQL の [メトリクス](#metric-collection) と [ログ](#log-collection) を収集するには、[Agent の構成ディレクトリ](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) のルートにある `conf.d/` フォルダー内で `mysql.d/conf.yaml` ファイルを編集してください。

利用可能な設定オプションの完全な一覧については、[サンプル `mysql.d/conf.yaml`](https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example) を参照してください。

##### メトリクスの収集

- [MySQL メトリクス](#metrics)を収集するには、`mysql.d/conf.yaml` に次の構成ブロックを追加します。

  ```yaml
  init_config:

  instances:
    - host: 127.0.0.1
      username: datadog
      password: "<YOUR_CHOSEN_PASSWORD>" # from the CREATE USER step earlier
      port: "<YOUR_MYSQL_PORT>" # e.g. 3306
      options:
        replication: false
        galera_cluster: true
        extra_status_metrics: true
        extra_innodb_metrics: true
        schema_size_metrics: false
        disable_innodb_metrics: false
  ```

**注**: パスワードに特殊文字が含まれる場合は、単一引用符で囲んでください。

`extra_performance_metrics` を収集するには、MySQL サーバーで `performance_schema` を有効にする必要があります。有効でない場合は `extra_performance_metrics` を `false` に設定してください。`performance_schema` について詳しくは、[MySQL Performance Schema クイック スタート](https://dev.mysql.com/doc/refman/5.7/en/performance-schema-quick-start.html) を参照してください。

**注**: `datadog` ユーザーは、`localhost` ではなく `host: 127.0.0.1` として MySQL インテグレーション構成内にセットアップされる必要があります。または、`sock` を使用することもできます。

Datadog へ MySQL メトリクスの送信を開始するには、[Agent を再起動](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) してください。

##### ログ収集

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

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

1. MySQL のログの収集を開始するには、次の構成ブロックを `mysql.d/conf.yaml` ファイルに追加します。

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

   カスタム メトリクスを含む利用可能なすべての設定オプションについては、[サンプル mysql.yaml](https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example) を参照してください。

1. [Agent を再起動](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)します。

{{% /tab %}}

{{% tab "Docker" %}}

#### Docker

コンテナで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

アプリケーション コンテナで [オートディスカバリー インテグレーション テンプレート](https://docs.datadoghq.com/agent/docker/integrations/?tab=docker) を Docker ラベルとして設定します:

```yaml
LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"server": "%%host%%", "username": "datadog","password": "<UNIQUEPASSWORD>"}]'
```

ラベルの代わりに環境変数として `<UNIQUEPASSWORD>` を使用する方法については、[オートディスカバリー テンプレート変数](https://docs.datadoghq.com/agent/faq/template_variables/) を参照してください。

#### ログ収集

Datadog Agent では、ログの収集はデフォルトで無効になっています。有効にするには、[Docker のログ収集](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#installation) を参照してください。

次に、[ログ インテグレーション](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations) を Docker ラベルとして設定します:

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"mysql","service":"mysql"}]'
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

#### Kubernetes

このチェックを、Kubernetes で実行している Agent に構成します。

##### メトリクスの収集

アプリケーション コンテナに [オートディスカバリー インテグレーション テンプレート](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes) をポッド アノテーションとして設定します。あるいは [ファイル、ConfigMap、またはキーバリュー ストア](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes#configuration) でテンプレートを構成することも可能です。

**Annotations v1** (Datadog Agent v7.36 未満用)

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
          "username": "datadog",
          "password": "<UNIQUEPASSWORD>"
        }
      ]
  labels:
    name: mysql
spec:
  containers:
    - name: mysql
```

**Annotations v2** (Datadog Agent v7.36+ 向け)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mysql
  annotations:
    ad.datadoghq.com/mysql.checks: |
      {
        "mysql": {
          "instances": [
            {
              "server": "%%host%%", 
              "username": "datadog",
              "password": "<UNIQUEPASSWORD>"
            }
          ]
        }
      }
  labels:
    name: mysql
spec:
  containers:
    - name: mysql
```

ラベルの代わりに環境変数として `<UNIQUEPASSWORD>` を使用する方法については、[オートディスカバリー テンプレート変数](https://docs.datadoghq.com/agent/faq/template_variables/) を参照してください。

#### ログ収集

Datadog Agent では、ログの収集はデフォルトで無効になっています。有効にするには、[Kubernetes のログ収集](https://docs.datadoghq.com/agent/kubernetes/log/?tab=containerinstallation#setup) を参照してください。

[ログ インテグレーション](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations) をポッドのアノテーションとして設定します。代わりに [ファイル、ConfigMap、またはキーバリュー ストア](https://docs.datadoghq.com/agent/kubernetes/log/?tab=daemonset#configuration) で構成することもできます。

**Annotations v1/v2**

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

{{% /tab %}}

{{% tab "ECS" %}}

#### ECS

このチェックを、ECS で実行している Agent に構成するには:

##### メトリクスの収集

アプリケーション コンテナで [オートディスカバリー インテグレーション テンプレート](https://docs.datadoghq.com/agent/docker/integrations/?tab=docker) を Docker ラベルとして設定します:

```json
{
  "containerDefinitions": [{
    "name": "mysql",
    "image": "mysql:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"mysql\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"server\": \"%%host%%\", \"username\": \"datadog\",\"password\": \"<UNIQUEPASSWORD>\"}]"
    }
  }]
}
```

[オートディスカバリー テンプレート変数](https://docs.datadoghq.com/agent/faq/template_variables/) を参照して、ラベルの代わりに環境変数 `<UNIQUEPASSWORD>` を使用する方法をご確認ください。

##### ログ収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent では、ログの収集はデフォルトで無効になっています。有効にするには、[ECS のログ収集](https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux) を参照してください。

次に、[ログ インテグレーション](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations) を Docker ラベルとして設定します:

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

{{% /tab %}}

{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) し、Checks セクションで `mysql` を探します。

## 収集データ

### メトリクス

| | |
| --- | --- |
| **mysql.binlog.cache_disk_use** <br>(gauge) | 一時バイナリ ログ キャッシュを使用し、`binlog_cache_size` の値を超えてトランザクションのステートメントを保存するために一時ファイルを使用したトランザクション数。<br>_transaction として表示_ |
| **mysql.binlog.cache_use** <br>(gauge) | バイナリ ログ キャッシュを使用したトランザクション数。<br>_transaction として表示_ |
| **mysql.binlog.disk_use** <br>(gauge) | バイナリ ログ ファイルの合計サイズ。<br>_byte として表示_ |
| **mysql.galera.wsrep_cert_deps_distance** <br>(gauge) | ノードが並列適用可能な最小および最大シーケンス番号 (seqno) の平均距離を示します。|
| **mysql.galera.wsrep_cluster_size** <br>(gauge) | Galera クラスター内の現在のノード数。<br>_node として表示_ |
| **mysql.galera.wsrep_flow_control_paused** <br>(gauge) | 最後に FLUSH STATUS が呼び出されてからの時間のうち、フロー コントロールによりノードが停止していた割合を示します。<br>_fraction として表示_ |
| **mysql.galera.wsrep_flow_control_paused_ns** <br>(count) | フロー コントロールによる停止時間 (ナノ秒)。<br>_nanosecond として表示_ |
| **mysql.galera.wsrep_flow_control_recv** <br>(count) | Galera ノードが他のノードから Flow Control の一時停止メッセージを受信した回数を示します。|
| **mysql.galera.wsrep_flow_control_sent** <br>(count) | Galera ノードが他のノードに Flow Control の一時停止メッセージを送信した回数を示します。|
| **mysql.galera.wsrep_local_cert_failures** <br>(count) | 認証テストに失敗したローカル トランザクションの総数。|
| **mysql.galera.wsrep_local_recv_queue** <br>(gauge) | ローカル受信キューの現在の (瞬間的な) サイズを示します。|
| **mysql.galera.wsrep_local_recv_queue_avg** <br>(gauge) | 最後に FLUSH STATUS が実行されてからのローカル受信キューの平均サイズを示します。|
| **mysql.galera.wsrep_local_send_queue** <br>(gauge) | 最後に FLUSH STATUS が実行されてからの送信キュー長の現在の (瞬間的な) サイズを示します。|
| **mysql.galera.wsrep_local_send_queue_avg** <br>(gauge) | 最後に FLUSH STATUS が実行されてからの送信キュー長の平均サイズを示します。|
| **mysql.galera.wsrep_local_state** <br>(gauge) | Galera クラスターの内部状態番号|
| **mysql.galera.wsrep_received** <br>(gauge) | 他のノードから受信した書き込みセットの総数。|
| **mysql.galera.wsrep_received_bytes** <br>(gauge) | 他のノードから受信した writeset の合計サイズ (バイト)。|
| **mysql.galera.wsrep_replicated_bytes** <br>(gauge) | 他のノードへ送信された writeset の合計サイズ (バイト単位)。|
| **mysql.index.deletes** <br>(gauge) | インデックスを使用した削除操作の数。データベース再起動時に 0 にリセットされます。<br>_operation として表示_ |
| **mysql.index.reads** <br>(gauge) | インデックスを使用した読み取り操作の数。データベースの再起動時に 0 にリセットされます。<br>_operation として表示_ |
| **mysql.index.size** <br>(gauge) | インデックスのサイズ (バイト)。<br>_byte として表示_ |
| **mysql.index.updates** <br>(gauge) | インデックスを使用した更新操作の数。データベース再起動時に 0 にリセットされます。<br>_operation として表示_ |
| **mysql.info.schema.size** <br>(gauge) | スキーマのサイズ (MiB)<br>_mebibyte として表示_ |
| **mysql.info.table.data_size** <br>(gauge) | テーブル データのサイズ (MiB)<br>_mebibyte として表示_ |
| **mysql.info.table.index_size** <br>(gauge) | テーブル インデックスのサイズ (MiB)<br>_mebibyte として表示_ |
| **mysql.info.table.rows.changed** <br>(count) | テーブルごとの変更行数の合計 (Percona userstat のみ)。<br>_row として表示_ |
| **mysql.info.table.rows.read** <br>(count) | テーブルごとの読み取り行数の合計 (Percona userstat のみ)。<br>_row として表示_ |
| **mysql.innodb.active_transactions** <br>(gauge) | InnoDB テーブルでアクティブなトランザクションの数。<br>_operation として表示_ |
| **mysql.innodb.buffer_pool_data** <br>(gauge) | データを含む InnoDB バッファ プール内のバイト総数。ダーティ ページとクリーン ページの両方が含まれます。<br>_byte として表示_ |
| **mysql.innodb.buffer_pool_dirty** <br>(gauge) | InnoDB バッファ プール内のダーティ ページに保持されている現在のバイト総数。<br>_byte として表示_ |
| **mysql.innodb.buffer_pool_free** <br>(gauge) | InnoDB バッファ プールで未使用のバイト数。<br>_byte として表示_ |
| **mysql.innodb.buffer_pool_pages_data** <br>(gauge) | データを含む InnoDB バッファ プール内のページ数。ダーティ ページとクリーン ページの両方が含まれます。<br>_page として表示_ |
| **mysql.innodb.buffer_pool_pages_dirty** <br>(gauge) | InnoDB バッファ プール内の現在のダーティ ページ数。<br>_page として表示_ |
| **mysql.innodb.buffer_pool_pages_flushed** <br>(gauge) | InnoDB バッファ プールからページをフラッシュする要求数。<br>_page として表示_ |
| **mysql.innodb.buffer_pool_pages_free** <br>(gauge) | InnoDB バッファ プール内の空きページ数。<br>_page として表示_ |
| **mysql.innodb.buffer_pool_pages_total** <br>(gauge) | InnoDB バッファ プールの総サイズ (ページ数)。<br>_page として表示_ |
| **mysql.innodb.buffer_pool_read_ahead** <br>(gauge) | 先読みバックグラウンド スレッドによって InnoDB バッファ プールに読み込まれたページ数。<br>_page として表示_ |
| **mysql.innodb.buffer_pool_read_ahead_evicted** <br>(gauge) | 先読みバックグラウンド スレッドによって InnoDB バッファ プールに読み込まれ、その後クエリからアクセスされることなく追い出されたページ数。<br>_page として表示_ |
| **mysql.innodb.buffer_pool_read_ahead_rnd** <br>(gauge) | InnoDB が開始したランダム先読み数。大きなテーブルをランダム順序でスキャンする際に発生します。<br>_operation として表示_ |
| **mysql.innodb.buffer_pool_read_requests** <br>(gauge) | 論理読み取り要求の数。<br>_read として表示_ |
| **mysql.innodb.buffer_pool_reads** <br>(gauge) | InnoDB がバッファ プールから読み取れず、ディスクから直接読み取る必要があった論理読み取り数。<br>_read として表示_ |
| **mysql.innodb.buffer_pool_total** <br>(gauge) | InnoDB バッファ プール内の総バイト数。<br>_byte として表示_ |
| **mysql.innodb.buffer_pool_used** <br>(gauge) | InnoDB バッファ プールで使用中のバイト数。<br>_byte として表示_ |
| **mysql.innodb.buffer_pool_utilization** <br>(gauge) | InnoDB バッファ プールの使用率。<br>_fraction として表示_ |
| **mysql.innodb.buffer_pool_wait_free** <br>(count) | InnoDB がページを読み込むまたは作成する必要がありクリーン ページがない場合、InnoDB はまず一部のダーティ ページをフラッシュし、その処理完了を待機します。このカウンタはその待機回数を計測します。<br>_wait として表示_ |
| **mysql.innodb.buffer_pool_write_requests** <br>(gauge) | InnoDB バッファ プールに対して行われた書き込み数。<br>_write として表示_ |
| **mysql.innodb.checkpoint_age** <br>(gauge) | SHOW ENGINE INNODB STATUS の LOG セクションに表示されるチェックポイント エイジ。|
| **mysql.innodb.current_row_locks** <br>(gauge) | 現在の行ロック数。<br>_lock として表示_ |
| **mysql.innodb.current_transactions** <br>(gauge) | 現在の InnoDB トランザクション<br>_transaction として表示_ |
| **mysql.innodb.data_fsyncs** <br>(gauge) | 毎秒実行される fsync() 操作数。<br>_operation として表示_ |
| **mysql.innodb.data_pending_fsyncs** <br>(gauge) | 保留中の fsync() 操作の現在の数。<br>_operation として表示_ |
| **mysql.innodb.data_pending_reads** <br>(gauge) | 保留中の読み取りの現在の数。<br>_read として表示_ |
| **mysql.innodb.data_pending_writes** <br>(gauge) | 保留中の書き込みの現在の数。<br>_write として表示_ |
| **mysql.innodb.data_read** <br>(gauge) | 毎秒読み取られるデータ量。<br>_byte として表示_ |
| **mysql.innodb.data_reads** <br>(gauge) | データ読み取りのレート。<br>_read として表示_ |
| **mysql.innodb.data_writes** <br>(gauge) | データ書き込みのレート。<br>_write として表示_ |
| **mysql.innodb.data_written** <br>(gauge) | 毎秒書き込まれるデータ量。<br>_byte として表示_ |
| **mysql.innodb.dblwr_pages_written** <br>(gauge) | ダブルライト バッファに毎秒書き込まれたページ数。<br>_page として表示_ |
| **mysql.innodb.dblwr_writes** <br>(gauge) | 毎秒実行されるダブルライト操作数。<br>_byte として表示_ |
| **mysql.innodb.deadlocks** <br>(count) | デッド ロックの数。<br>_lock として表示_ |
| **mysql.innodb.hash_index_cells_total** <br>(gauge) | 適応型ハッシュ インデックスのセル総数。|
| **mysql.innodb.hash_index_cells_used** <br>(gauge) | 適応型ハッシュ インデックスで使用中のセル数。|
| **mysql.innodb.history_list_length** <br>(gauge) | SHOW ENGINE INNODB STATUS の TRANSACTIONS セクションに表示されるヒストリー リストの長さ。|
| **mysql.innodb.ibuf_free_list** <br>(gauge) | SHOW ENGINE INNODB STATUS の INSERT BUFFER AND ADAPTIVE HASH INDEX セクションに表示されるインサート バッファ フリー リスト。|
| **mysql.innodb.ibuf_merged** <br>(gauge) | インサート バッファおよび適応型ハッシュ インデックスのマージ済み数。<br>_operation として表示_ |
| **mysql.innodb.ibuf_merged_delete_marks** <br>(gauge) | インサート バッファおよび適応型ハッシュ インデックスのマージ済み削除マーク<br>_operation として表示_ |
| **mysql.innodb.ibuf_merged_deletes** <br>(gauge) | インサート バッファおよび適応型ハッシュ インデックスのマージ済み削除<br>_operation として表示_ |
| **mysql.innodb.ibuf_merged_inserts** <br>(gauge) | インサート バッファおよび適応型ハッシュ インデックスのマージ済みインサート<br>_operation として表示_ |
| **mysql.innodb.ibuf_merges** <br>(gauge) | インサート バッファおよび適応型ハッシュ インデックスのマージ数。<br>_operation として表示_ |
| **mysql.innodb.ibuf_segment_size** <br>(gauge) | SHOW ENGINE INNODB STATUS の INSERT BUFFER AND ADAPTIVE HASH INDEX セクションに表示されるインサート バッファ セグメント サイズ。|
| **mysql.innodb.ibuf_size** <br>(gauge) | SHOW ENGINE INNODB STATUS の INSERT BUFFER AND ADAPTIVE HASH INDEX セクションに表示されるインサート バッファ サイズ。|
| **mysql.innodb.lock_structs** <br>(gauge) | ロック構造体<br>_operation として表示_ |
| **mysql.innodb.locked_tables** <br>(gauge) | ロックされたテーブル<br>_operation として表示_ |
| **mysql.innodb.log_waits** <br>(gauge) | ログ バッファが小さすぎて処理を続行する前にフラッシュを待機する必要があった回数。<br>_wait として表示_ |
| **mysql.innodb.log_write_requests** <br>(gauge) | InnoDB redo ログへの書き込み要求数。<br>_write として表示_ |
| **mysql.innodb.log_writes** <br>(gauge) | InnoDB の redo ログ ファイルへの物理書き込み数。<br>_write として表示_ |
| **mysql.innodb.lsn_current** <br>(gauge) | SHOW ENGINE INNODB STATUS の LOG セクションに表示されるログ シーケンス番号。|
| **mysql.innodb.lsn_flushed** <br>(gauge) | SHOW ENGINE INNODB STATUS の LOG セクションに表示される「フラッシュ済み」ログ シーケンス番号。|
| **mysql.innodb.lsn_last_checkpoint** <br>(gauge) | SHOW ENGINE INNODB STATUS の LOG セクションに表示される最終チェックポイントのログ シーケンス番号。|
| **mysql.innodb.mem_adaptive_hash** <br>(gauge) | SHOW ENGINE INNODB STATUS の BUFFER POOL AND MEMORY セクションに表示される値。<br>_byte として表示_ |
| **mysql.innodb.mem_additional_pool** <br>(gauge) | SHOW ENGINE INNODB STATUS の BUFFER POOL AND MEMORY セクションに表示される値。MySQL 5.6 でのみ利用可能。<br>_byte として表示_ |
| **mysql.innodb.mem_dictionary** <br>(gauge) | SHOW ENGINE INNODB STATUS の BUFFER POOL AND MEMORY セクションに表示される値。<br>_byte として表示_ |
| **mysql.innodb.mem_file_system** <br>(gauge) | SHOW ENGINE INNODB STATUS の BUFFER POOL AND MEMORY セクションに表示される値。|
| **mysql.innodb.mem_lock_system** <br>(gauge) | SHOW ENGINE INNODB STATUS の BUFFER POOL AND MEMORY セクションに表示される値。|
| **mysql.innodb.mem_page_hash** <br>(gauge) | SHOW ENGINE INNODB STATUS の BUFFER POOL AND MEMORY セクションに表示される値。|
| **mysql.innodb.mem_recovery_system** <br>(gauge) | SHOW ENGINE INNODB STATUS の BUFFER POOL AND MEMORY セクションに表示される値。|
| **mysql.innodb.mem_total** <br>(gauge) | SHOW ENGINE INNODB STATUS の BUFFER POOL AND MEMORY セクションに表示される値。<br>_byte として表示_ |
| **mysql.innodb.mutex_os_waits** <br>(gauge) | mutex OS 待機のレート。MySQL 5.6 と 5.7 でのみ利用可能。<br>_event として表示_ |
| **mysql.innodb.mutex_spin_rounds** <br>(gauge) | mutex スピン ラウンドのレート。MySQL 5.6 と 5.7 でのみ利用可能。<br>_event として表示_ |
| **mysql.innodb.mutex_spin_waits** <br>(gauge) | mutex スピン待機のレート。MySQL 5.6 と 5.7 でのみ利用可能。<br>_event として表示_ |
| **mysql.innodb.os_file_fsyncs** <br>(gauge) | (デルタ) InnoDB が実行した fsync() 操作の総数。<br>_operation として表示_ |
| **mysql.innodb.os_file_reads** <br>(gauge) | (デルタ) InnoDB 内のリード スレッドによって実行されたファイル読み取り総数。<br>_operation として表示_ |
| **mysql.innodb.os_file_writes** <br>(gauge) | (デルタ) InnoDB 内の書き込みスレッドによって実行されたファイル書き込みの総数。<br>_operation として表示_ |
| **mysql.innodb.os_log_fsyncs** <br>(gauge) | ログ ファイルへの fsync 書き込みのレート。<br>_write として表示_ |
| **mysql.innodb.os_log_pending_fsyncs** <br>(gauge) | 保留中の InnoDB ログ fsync (ディスク同期) 要求数。<br>_operation として表示_ |
| **mysql.innodb.os_log_pending_writes** <br>(gauge) | 保留中の InnoDB ログ書き込み数。<br>_write として表示_ |
| **mysql.innodb.os_log_written** <br>(gauge) | InnoDB ログに書き込まれたバイト数。<br>_byte として表示_ |
| **mysql.innodb.pages_created** <br>(gauge) | 作成された InnoDB ページ数。<br>_page として表示_ |
| **mysql.innodb.pages_read** <br>(gauge) | 読み込まれた InnoDB ページ数。<br>_page として表示_ |
| **mysql.innodb.pages_written** <br>(gauge) | 書き込まれた InnoDB ページ数。<br>_page として表示_ |
| **mysql.innodb.pending_aio_log_ios** <br>(gauge) | SHOW ENGINE INNODB STATUS の FILE I/O セクションに表示される値。|
| **mysql.innodb.pending_aio_sync_ios** <br>(gauge) | SHOW ENGINE INNODB STATUS の FILE I/O セクションに表示される値。|
| **mysql.innodb.pending_buffer_pool_flushes** <br>(gauge) | SHOW ENGINE INNODB STATUS の FILE I/O セクションに表示される値。<br>_flush として表示_ |
| **mysql.innodb.pending_checkpoint_writes** <br>(gauge) | SHOW ENGINE INNODB STATUS の FILE I/O セクションに表示される値。|
| **mysql.innodb.pending_ibuf_aio_reads** <br>(gauge) | SHOW ENGINE INNODB STATUS の FILE I/O セクションに表示される値。|
| **mysql.innodb.pending_log_flushes** <br>(gauge) | SHOW ENGINE INNODB STATUS の FILE I/O セクションに表示される値。MySQL 5.6 と 5.7 でのみ利用可能。<br>_flush として表示_ |
| **mysql.innodb.pending_log_writes** <br>(gauge) | SHOW ENGINE INNODB STATUS の FILE I/O セクションに表示される値。MySQL 5.6 と 5.7 でのみ利用可能。<br>_write として表示_ |
| **mysql.innodb.pending_normal_aio_reads** <br>(gauge) | SHOW ENGINE INNODB STATUS の FILE I/O セクションに表示される値。<br>_read として表示_ |
| **mysql.innodb.pending_normal_aio_writes** <br>(gauge) | SHOW ENGINE INNODB STATUS の FILE I/O セクションに表示される値。<br>_write として表示_ |
| **mysql.innodb.queries_inside** <br>(gauge) | SHOW ENGINE INNODB STATUS の FILE I/O セクションに表示される値。<br>_query として表示_ |
| **mysql.innodb.queries_queued** <br>(gauge) | SHOW ENGINE INNODB STATUS の FILE I/O セクションに表示される値。<br>_query として表示_ |
| **mysql.innodb.read_views** <br>(gauge) | SHOW ENGINE INNODB STATUS の FILE I/O セクションに表示される値。|
| **mysql.innodb.row_lock_current_waits** <br>(gauge) | InnoDB テーブルでの操作によって現在待機中の行ロック数。|
| **mysql.innodb.row_lock_time** <br>(gauge) | 行ロックを取得するのに費やした時間。<br>_millisecond として表示_ |
| **mysql.innodb.row_lock_waits** <br>(gauge) | 秒あたり行ロックの待機が発生した回数。<br>_event として表示_ |
| **mysql.innodb.rows_deleted** <br>(gauge) | InnoDB テーブルから削除された行数。<br>_row として表示_ |
| **mysql.innodb.rows_inserted** <br>(gauge) | InnoDB テーブルに挿入された行数。<br>_row として表示_ |
| **mysql.innodb.rows_read** <br>(gauge) | InnoDB テーブルから読み取られた行数。<br>_row として表示_ |
| **mysql.innodb.rows_updated** <br>(gauge) | InnoDB テーブルで更新された行数。<br>_row として表示_ |
| **mysql.innodb.s_lock_os_waits** <br>(gauge) | SHOW ENGINE INNODB STATUS の SEMAPHORES セクションに表示される値。|
| **mysql.innodb.s_lock_spin_rounds** <br>(gauge) | SHOW ENGINE INNODB STATUS の SEMAPHORES セクションに表示される値。|
| **mysql.innodb.s_lock_spin_waits** <br>(gauge) | SHOW ENGINE INNODB STATUS の SEMAPHORES セクションに表示される値。<br>_wait として表示_ |
| **mysql.innodb.semaphore_wait_time** <br>(gauge) | セマフォの待機時間|
| **mysql.innodb.semaphore_waits** <br>(gauge) | InnoDB テーブルでの操作によって現在待機中のセマフォ数。|
| **mysql.innodb.tables_in_use** <br>(gauge) | 使用中のテーブル数<br>_operation として表示_ |
| **mysql.innodb.x_lock_os_waits** <br>(gauge) | SHOW ENGINE INNODB STATUS の SEMAPHORES セクションに表示される値。<br>_wait として表示_ |
| **mysql.innodb.x_lock_spin_rounds** <br>(gauge) | SHOW ENGINE INNODB STATUS の SEMAPHORES セクションに表示される値。|
| **mysql.innodb.x_lock_spin_waits** <br>(gauge) | SHOW ENGINE INNODB STATUS の SEMAPHORES セクションに表示される値。<br>_wait として表示_ |
| **mysql.myisam.key_buffer_bytes_unflushed** <br>(gauge) | MyISAM キー バッファの未フラッシュ バイト数。<br>_byte として表示_ |
| **mysql.myisam.key_buffer_bytes_used** <br>(gauge) | MyISAM キー バッファで使用中のバイト数。<br>_byte として表示_ |
| **mysql.myisam.key_buffer_size** <br>(gauge) | インデックス ブロックに使用されるバッファ サイズ。<br>_byte として表示_ |
| **mysql.myisam.key_read_requests** <br>(gauge) | MyISAM キー キャッシュからキー ブロックを読み取る要求数。<br>_read として表示_ |
| **mysql.myisam.key_reads** <br>(gauge) | ディスクから MyISAM キー キャッシュへキー ブロックを物理的に読み込んだ回数。`key_reads` が大きい場合は key_buffer_size が小さすぎる可能性があります。キャッシュ ミス率は `key_reads`/`key_read_requests` で計算できます。<br>_read として表示_ |
| **mysql.myisam.key_write_requests** <br>(gauge) | MyISAM キー キャッシュへキー ブロックを書き込む要求数。<br>_write として表示_ |
| **mysql.myisam.key_writes** <br>(gauge) | MyISAM キー キャッシュからディスクへキー ブロックを物理的に書き込んだ回数。<br>_write として表示_ |
| **mysql.net.aborted_clients** <br>(gauge) | クライアントが接続を正しく閉じずに終了したため中止された接続数。<br>_connection として表示_ |
| **mysql.net.aborted_connects** <br>(gauge) | MySQL サーバーへの接続に失敗した試行回数。<br>_connection として表示_ |
| **mysql.net.connections** <br>(gauge) | サーバーへの接続レート。<br>_connection として表示_ |
| **mysql.net.max_connections** <br>(gauge) | サーバー起動後に同時に使用された接続数の最大値。<br>_connection として表示_ |
| **mysql.net.max_connections_available** <br>(gauge) | 同時クライアント接続数の最大許容数。<br>_connection として表示_ |
| **mysql.performance.bytes_received** <br>(gauge) | すべてのクライアントから受信したバイト数。<br>_byte として表示_ |
| **mysql.performance.bytes_sent** <br>(gauge) | すべてのクライアントへ送信されたバイト数。<br>_byte として表示_ |
| **mysql.performance.com_delete** <br>(gauge) | DELETE ステートメントのレート。<br>_query として表示_ |
| **mysql.performance.com_delete_multi** <br>(gauge) | DELETE MULTI ステートメントのレート。<br>_query として表示_ |
| **mysql.performance.com_insert** <br>(gauge) | INSERT ステートメントのレート。<br>_query として表示_ |
| **mysql.performance.com_insert_select** <br>(gauge) | INSERT SELECT ステートメントのレート。<br>_query として表示_ |
| **mysql.performance.com_load** <br>(gauge) | LOAD ステートメントのレート。<br>_query として表示_ |
| **mysql.performance.com_replace** <br>(gauge) | REPLACE ステートメントのレート。<br>_query として表示_ |
| **mysql.performance.com_replace_select** <br>(gauge) | REPLACE SELECT ステートメントのレート。<br>_query として表示_ |
| **mysql.performance.com_select** <br>(gauge) | SELECT ステートメントのレート。<br>_query として表示_ |
| **mysql.performance.com_update** <br>(gauge) | UPDATE ステートメントのレート。<br>_query として表示_ |
| **mysql.performance.com_update_multi** <br>(gauge) | UPDATE MULTI のレート。<br>_query として表示_ |
| **mysql.performance.cpu_time** <br>(gauge) | MySQL が消費した CPU 時間の割合。<br>_percent として表示_ |
| **mysql.performance.created_tmp_disk_tables** <br>(gauge) | ステートメント実行中にサーバーが 1 秒あたりに作成した内部 オン ディスク一時テーブルのレート。<br>_table として表示_ |
| **mysql.performance.created_tmp_files** <br>(gauge) | 1 秒あたりに作成された一時ファイルのレート。<br>_file として表示_ |
| **mysql.performance.created_tmp_tables** <br>(gauge) | ステートメント実行中にサーバーが 1 秒あたりに作成した内部一時テーブルのレート。<br>_table として表示_ |
| **mysql.performance.digest_95th_percentile.avg_us** <br>(gauge) | スキーマごとのクエリ レスポンス時間 95 パーセンタイル。<br>_microsecond として表示_ |
| **mysql.performance.handler_commit** <br>(gauge) | 内部 COMMIT ステートメントの数。<br>_operation として表示_ |
| **mysql.performance.handler_delete** <br>(gauge) | 内部 DELETE ステートメントの数。<br>_operation として表示_ |
| **mysql.performance.handler_prepare** <br>(gauge) | 内部 PREPARE ステートメントの数。<br>_operation として表示_ |
| **mysql.performance.handler_read_first** <br>(gauge) | 内部 READ_FIRST ステートメントの数。<br>_operation として表示_ |
| **mysql.performance.handler_read_key** <br>(gauge) | 内部 READ_KEY ステートメントの数。<br>_operation として表示_ |
| **mysql.performance.handler_read_next** <br>(gauge) | 内部 READ_NEXT ステートメントの数。<br>_operation として表示_ |
| **mysql.performance.handler_read_prev** <br>(gauge) | 内部 READ_PREV ステートメントの数。<br>_operation として表示_ |
| **mysql.performance.handler_read_rnd** <br>(gauge) | 内部 READ_RND ステートメントの数。<br>_operation として表示_ |
| **mysql.performance.handler_read_rnd_next** <br>(gauge) | 内部 READ_RND_NEXT ステートメントの数。<br>_operation として表示_ |
| **mysql.performance.handler_rollback** <br>(gauge) | 内部 ROLLBACK ステートメントの数。<br>_operation として表示_ |
| **mysql.performance.handler_update** <br>(gauge) | 内部 UPDATE ステートメントの数。<br>_operation として表示_ |
| **mysql.performance.handler_write** <br>(gauge) | 内部 WRITE ステートメントの数。<br>_operation として表示_ |
| **mysql.performance.kernel_time** <br>(gauge) | MySQL がカーネル空間で消費した CPU 時間の割合。<br>_percent として表示_ |
| **mysql.performance.key_cache_utilization** <br>(gauge) | キー キャッシュの使用率。<br>_fraction として表示_ |
| **mysql.performance.max_prepared_stmt_count** <br>(gauge) | サーバーで許可されている prepared ステートメントの最大数。|
| **mysql.performance.open_files** <br>(gauge) | 開いているファイル数。<br>_file として表示_ |
| **mysql.performance.open_tables** <br>(gauge) | 開いているテーブル数。<br>_table として表示_ |
| **mysql.performance.opened_tables** <br>(gauge) | オープンされたテーブル数。`opened_tables` が大きい場合、`table_open_cache` の値が小さすぎる可能性があります。<br>_table として表示_ |
| **mysql.performance.performance_schema_digest_lost** <br>(gauge) | events_statements_summary_by_digest テーブルでインスツルメントできなかったダイジェスト インスタンスの数。performance_schema_digests_size が小さすぎる場合、この値が 0 以外になることがあります。|
| **mysql.performance.prepared_stmt_count** <br>(gauge) | 現在の prepared ステートメント数。<br>_query として表示_ |
| **mysql.performance.qcache.utilization** <br>(gauge) | クエリ キャッシュ メモリの使用率。<br>_fraction として表示_ |
| **mysql.performance.qcache_free_blocks** <br>(gauge) | クエリ キャッシュ内の空きメモリ ブロック数。<br>_block として表示_ |
| **mysql.performance.qcache_free_memory** <br>(gauge) | クエリ キャッシュの空きメモリ量。<br>_byte として表示_ |
| **mysql.performance.qcache_hits** <br>(gauge) | クエリ キャッシュ ヒット レート。<br>_hit として表示_ |
| **mysql.performance.qcache_inserts** <br>(gauge) | クエリ キャッシュに追加されたクエリ数。<br>_query として表示_ |
| **mysql.performance.qcache_lowmem_prunes** <br>(gauge) | メモリ不足によりクエリ キャッシュから削除されたクエリ数。<br>_query として表示_ |
| **mysql.performance.qcache_not_cached** <br>(gauge) | 非キャッシュ クエリ数 (キャッシュ不可、または `query_cache_type` の設定でキャッシュされなかったクエリ)。<br>_query として表示_ |
| **mysql.performance.qcache_queries_in_cache** <br>(gauge) | クエリ キャッシュに登録されたクエリ数。<br>_query として表示_ |
| **mysql.performance.qcache_size** <br>(gauge) | クエリ結果のキャッシュ用に割り当てられたメモリ量。<br>_byte として表示_ |
| **mysql.performance.qcache_total_blocks** <br>(gauge) | クエリ キャッシュ内のブロック総数。<br>_block として表示_ |
| **mysql.performance.queries** <br>(gauge) | クエリ レート。<br>_query として表示_ |
| **mysql.performance.query_run_time.avg** <br>(gauge) | スキーマごとの平均クエリ レスポンス時間。<br>_microsecond として表示_ |
| **mysql.performance.questions** <br>(gauge) | サーバーで実行されたステートメント レート。<br>_query として表示_ |
| **mysql.performance.select_full_join** <br>(gauge) | インデックスを使用していないためテーブル スキャンを行った結合の数。値が 0 でない場合はテーブルのインデックスを確認してください。<br>_operation として表示_ |
| **mysql.performance.select_full_range_join** <br>(gauge) | 参照テーブルで範囲検索を使用した結合の数。<br>_operation として表示_ |
| **mysql.performance.select_range** <br>(gauge) | 最初のテーブルで範囲検索を使用した結合の数。値が大きくても通常は致命的ではありません。<br>_operation として表示_ |
| **mysql.performance.select_range_check** <br>(gauge) | キーなしで各行後にキー使用を確認する結合の数。値が 0 でない場合はテーブルのインデックスを確認してください。<br>_operation として表示_ |
| **mysql.performance.select_scan** <br>(gauge) | 最初のテーブルをフル スキャンした結合の数。<br>_operation として表示_ |
| **mysql.performance.slow_queries** <br>(gauge) | スロー クエリ (実行時間が閾値を超えたログ クエリ) のレート。<br>_query として表示_ |
| **mysql.performance.sort_merge_passes** <br>(gauge) | ソート アルゴリズムが実行したマージ パスの数。値が大きい場合は `sort_buffer_size` の増加を検討してください。<br>_operation として表示_ |
| **mysql.performance.sort_range** <br>(gauge) | 範囲を使用して行われたソートの数。<br>_operation として表示_ |
| **mysql.performance.sort_rows** <br>(gauge) | ソートされた行数。<br>_operation として表示_ |
| **mysql.performance.sort_scan** <br>(gauge) | テーブルをスキャンして行われたソートの数。<br>_operation として表示_ |
| **mysql.performance.table_cache_hits** <br>(gauge) | オープン テーブル キャッシュ ルックアップのヒット数。<br>_hit として表示_ |
| **mysql.performance.table_cache_misses** <br>(gauge) | オープン テーブル キャッシュ ルックアップのミス数。<br>_miss として表示_ |
| **mysql.performance.table_locks_immediate** <br>(gauge) | テーブル ロック要求が即時に許可された回数。|
| **mysql.performance.table_locks_immediate.rate** <br>(gauge) | テーブル ロック要求が即時に許可された回数のレート。|
| **mysql.performance.table_locks_waited** <br>(gauge) | テーブル ロック要求が即時に許可されず待機が必要だった総回数。|
| **mysql.performance.table_locks_waited.rate** <br>(gauge) | テーブル ロック要求が即時に許可されず待機が必要だった回数のレート。|
| **mysql.performance.table_open_cache** <br>(gauge) | すべてのスレッドで開かれているテーブル数。この値を増やすと mysqld が必要とするファイル ディスクリプター数が増加します。|
| **mysql.performance.thread_cache_size** <br>(gauge) | 再利用のためサーバーがキャッシュすべきスレッド数。クライアントが切断すると、そのスレッドは `thread_cache_size` 未満であればキャッシュに入れられます。<br>_byte として表示_ |
| **mysql.performance.threads_cached** <br>(gauge) | スレッド キャッシュ内のスレッド数。<br>_thread として表示_ |
| **mysql.performance.threads_connected** <br>(gauge) | 現在開いている接続数。<br>_connection として表示_ |
| **mysql.performance.threads_created** <br>(count) | 接続を処理するために作成されたスレッド数。`threads_created` が大きい場合は `thread_cache_size` の値を増やすことを検討してください。<br>_thread として表示_ |
| **mysql.performance.threads_running** <br>(gauge) | スリープ状態でないスレッド数。<br>_thread として表示_ |
| **mysql.performance.user_connections** <br>(gauge) | ユーザー接続数。タグ: `processlist_db`, `processlist_host`, `processlist_state`, `processlist_user`<br>_connection として表示_ |
| **mysql.performance.user_time** <br>(gauge) | MySQL がユーザー空間で消費した CPU 時間の割合。<br>_percent として表示_ |
| **mysql.queries.count** <br>(count) | 正規化されたクエリおよびスキーマごとの実行クエリ総数 (DBM のみ)。<br>_query として表示_ |
| **mysql.queries.errors** <br>(count) | 正規化されたクエリおよびスキーマごとのエラー付きクエリ総数 (DBM のみ)。<br>_error として表示_ |
| **mysql.queries.lock_time** <br>(count) | 正規化されたクエリおよびスキーマごとのロック待機時間総計 (DBM のみ)。<br>_nanosecond として表示_ |
| **mysql.queries.no_good_index_used** <br>(count) | 正規化されたクエリおよびスキーマごとの非最適インデックス使用クエリ総数 (DBM のみ)。<br>_query として表示_ |
| **mysql.queries.no_index_used** <br>(count) | 正規化されたクエリおよびスキーマごとのインデックス未使用クエリ総数 (DBM のみ)。<br>_query として表示_ |
| **mysql.queries.rows_affected** <br>(count) | 正規化されたクエリおよびスキーマごとの変更行数 (DBM のみ)。<br>_row として表示_ |
| **mysql.queries.rows_examined** <br>(count) | 正規化されたクエリおよびスキーマごとの検査行数 (DBM のみ)。<br>_row として表示_ |
| **mysql.queries.rows_sent** <br>(count) | 正規化されたクエリおよびスキーマごとの送信行数 (DBM のみ)。<br>_row として表示_ |
| **mysql.queries.select_full_join** <br>(count) | 正規化されたクエリおよびスキーマごとの結合テーブルでのフル テーブル スキャン総数 (DBM のみ)。|
| **mysql.queries.select_scan** <br>(count) | 正規化されたクエリおよびスキーマごとの最初のテーブルでのフル テーブル スキャン総数 (DBM のみ)。|
| **mysql.queries.time** <br>(count) | 正規化されたクエリおよびスキーマごとのクエリ実行時間総計 (DBM のみ)。<br>_nanosecond として表示_ |
| **mysql.replication.group.conflicts_detected** <br>(gauge) | 競合検出チェックに合格しなかったトランザクション数。<br>_transaction として表示_ |
| **mysql.replication.group.member_status** <br>(gauge) | グループ レプリケーション環境でのノード ステータス情報。常に 1。|
| **mysql.replication.group.transactions** <br>(gauge) | 競合検出チェック待機キュー内のトランザクション数。<br>_transaction として表示_ |
| **mysql.replication.group.transactions_applied** <br>(gauge) | グループから受信して適用済みのトランザクション数。<br>_transaction として表示_ |
| **mysql.replication.group.transactions_check** <br>(gauge) | 競合チェックが実行されたトランザクション数。<br>_transaction として表示_ |
| **mysql.replication.group.transactions_in_applier_queue** <br>(gauge) | レプリケーション グループから受信し、適用待ちのトランザクション数。<br>_transaction として表示_ |
| **mysql.replication.group.transactions_proposed** <br>(gauge) | このメンバーで生成され、グループへ送信されたトランザクション数。<br>_transaction として表示_ |
| **mysql.replication.group.transactions_rollback** <br>(gauge) | このメンバーで生成され、グループによりロールバックされたトランザクション数。<br>_transaction として表示_ |
| **mysql.replication.group.transactions_validating** <br>(gauge) | 認証に使用可能だがガベージ コレクトされていないトランザクション行数。<br>_transaction として表示_ |
| **mysql.replication.replicas_connected** <br>(gauge) | レプリケーション ソースに接続しているレプリカ数。|
| **mysql.replication.seconds_behind_master** <br>(gauge) | マスターとスレーブ間のラグ (秒)。<br>_second として表示_ |
| **mysql.replication.seconds_behind_source** <br>(gauge) | ソースとレプリカ間のラグ (秒)。<br>_second として表示_ |
| **mysql.replication.slave_running** <br>(gauge) | 非推奨: 代わりにサービス チェック mysql.replication.replica_running を使用してください。レプリケーション スレーブ / マスターが稼働中かどうかを示すブール値。|
| **mysql.replication.slaves_connected** <br>(gauge) | 非推奨: 代わりに `mysql.replication.replicas_connected` を使用してください。レプリケーション マスターに接続しているスレーブ数。|

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
| mysql.innodb.lock_structs                   | GAUGE       |
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

### サービス チェック

**mysql.can_connect**

Agent が監視対象の MySQL インスタンスに接続できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

_ステータス: ok, critical_

**mysql.replication.slave_running**

非推奨: Slave_IO_Running または Slave_SQL_Running が動作していないレプリカには CRITICAL、どちらか一方が動作していない場合は WARNING、その他は `OK` を返します。

_ステータス: ok, warning, critical_

**mysql.replication.replica_running**

Replica_IO_Running または Replica_SQL_Running が動作していないレプリカには CRITICAL、どちらか一方が動作していない場合は WARNING、その他は `OK` を返します。

_ステータス: ok, warning, critical_

**mysql.replication.group.status**

ホスト ステータスが ONLINE の場合は `OK`、それ以外は `CRITICAL` を返します。

_ステータス: ok, critical_

## トラブルシューティング

- [SQL Server インテグレーションの接続問題](https://docs.datadoghq.com/integrations/guide/connection-issues-with-the-sql-server-integration/)
- [MySQL ローカルホスト エラー - localhost と 127.0.0.1 の違い](https://docs.datadoghq.com/integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1/)
- [SQL Server インテグレーションで名前付きインスタンスを使用できますか？](https://docs.datadoghq.com/integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration/)
- [Google CloudSQL で dd-agent MySQL チェックを設定できますか？](https://docs.datadoghq.com/integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql/)
- [MySQL カスタム クエリ](https://docs.datadoghq.com/integrations/faq/how-to-collect-metrics-from-custom-mysql-queries/)
- [WMI を使用して SQL Server のパフォーマンス メトリクスを収集](https://docs.datadoghq.com/integrations/guide/use-wmi-to-collect-more-sql-server-performance-metrics/)
- [SQL Server インテグレーションでさらにメトリクスを収集する方法](https://docs.datadoghq.com/integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration/)
- [データベース ユーザーに権限がありません](https://docs.datadoghq.com/integrations/faq/database-user-lacks-privileges/)
- [SQL ストアド プロシージャでメトリクスを収集する方法](https://docs.datadoghq.com/integrations/guide/collect-sql-server-custom-metrics/#collecting-metrics-from-a-custom-procedure)

## その他の参考資料

役立つドキュメント、リンク、記事:

- [MySQL パフォーマンス メトリクスの監視](https://www.datadoghq.com/blog/monitoring-mysql-performance-metrics)