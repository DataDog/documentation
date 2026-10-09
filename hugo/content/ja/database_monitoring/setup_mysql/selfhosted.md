---
description: セルフホストの MySQL のデータベースモニタリングをインストールして構成します。
further_reading:
- link: /integrations/mysql/
  tag: ドキュメント
  text: 基本的な MySQL インテグレーション
title: セルフホストの MySQL のデータベースモニタリングの設定
---
Database Monitoring は、InnoDB ストレージエンジンのクエリメトリクス、クエリサンプル、説明プラン、接続データ、システムメトリクス、テレメトリを公開することにより、MySQL データベースの詳細な可視性を提供します。

**注**: MariaDB を使用している場合は、代わりに [MariaDB のセットアップ][15]を参照してください。

読み取り専用ユーザーとしてログインし、Agent でデータベースから直接テレメトリを収集します。MySQL データベースで Database Monitoring を有効にするには、以下のセットアップを実行します。

1. [データベースパラメーターを構成する](#configure-mysql-settings)
1. [Agent にデータベースへのアクセス権を付与する](#grant-the-agent-access)
1. [Agent をインストールする](#install-the-agent)

## はじめに {#before-you-begin}

サポートされている MySQL バージョン
: 5.6、5.7、8.0+、または 9 (MySQL 9 には Agent 7.84+ が必要)

サポートされている MariaDB バージョン
: 10.5、10.6、10.11、11.1、12、または 13 (MariaDB 12 および 13 には Agent 7.84+ が必要) <br/><br/>
MariaDB の Database Monitoring は、[既知の制限事項][13]付きでサポートされています。

サポート対象の Agent バージョン
: 7.36.1 以上

パフォーマンスへの影響
: Database Monitoring のデフォルトの Agent 構成は保守的ですが、収集間隔やクエリのサンプリングレートなどの設定を調整することで、よりニーズに合ったものにすることができます。大半のワークロードで、Agent はデータベース上のクエリ実行時間の 1 % 未満、および CPU の 1 % 未満を占めています。<br/><br/>
Database Monitoring は、ベースとなる Agent 上のインテグレーションとして動作します ([ベンチマークを参照][1])。

プロキシ、ロードバランサー、コネクションプーラー
: Datadog Agent は、モニター対象のホストに直接接続する必要があります。セルフホストのデータベースでは、`127.0.0.1` またはソケットの使用が推奨されます。Agent は、プロキシ、ロードバランサー、またはコネクションプーラーを介してデータベースに接続してはなりません。Agent が実行中に異なるホストに接続すると (フェイルオーバーやロードバランシングなどの場合)、Agent は 2 つのホスト間で統計情報の差を計算し、不正確なメトリクスを生成します。

データセキュリティに関する考慮事項
: Agent がお客様のデータベースからどのようなデータを収集するか、またそのデータの安全性をどのように確保しているかについては、[機密情報][2] を参照してください。

## MySQL 設定を構成する{#configure-mysql-settings}

クエリのメトリクス、サンプル、および実行計画を収集するには、[MySQL パフォーマンススキーマ][3]を有効にし、以下の[パフォーマンススキーマオプション][4]をコマンドラインまたは設定ファイル (例: `mysql.conf`) で構成します。

{{< tabs >}}
{{% tab "MySQL ≥ 5.7" %}}
| パラメーター | 値 | 説明 |
| --- | --- | --- |
| `performance_schema` | `ON` | 必須。パフォーマンススキーマを有効にします。|
| `max_digest_length` | `4096` | より大きなクエリを収集するために必要です。デフォルト値のままにした場合、`1024` 文字を超えるクエリは収集されません。|
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code> | `4096` | `max_digest_length` と一致する必要があります。|
| <code style="word-break:break-all;">`performance_schema_max_sql_text_length`</code> | `4096` | `max_digest_length` と一致する必要があります。|
| `performance-schema-consumer-events-statements-current` | `ON` | 必須。現在実行中のクエリの監視を有効にします。|
| `performance-schema-consumer-events-waits-current` | `ON` | 必須。待機イベントの収集を有効にします。|
| `performance-schema-consumer-events-statements-history-long` | `ON` | 推奨。すべてのスレッドで、より多くの最近のクエリの追跡を有効にします。有効にすると、頻度の低いクエリの実行詳細をキャプチャできる可能性が高くなります。|
| `performance-schema-consumer-events-statements-history` | `ON` | オプション。スレッドごとの最近のクエリ履歴の追跡を有効にします。有効にすると、頻度の低いクエリの実行詳細をキャプチャできる可能性が高くなります。|
{{% /tab %}}
{{% tab "MySQL 5.6" %}}
| パラメーター | 値 | 説明 |
| --- | --- | --- |
| `performance_schema` | `ON` | 必須。パフォーマンススキーマを有効にします。|
| `max_digest_length` | `4096` | より大きなクエリを収集するために必要です。デフォルト値のままにした場合、`1024` 文字を超えるクエリは収集されません。|
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code> | `4096` | `max_digest_length` と一致する必要があります。|
| `performance-schema-consumer-events-statements-current` | `ON` | 必須。現在実行中のクエリの監視を有効にします。|
| `performance-schema-consumer-events-waits-current` | `ON` | 必須。待機イベントの収集を有効にします。|
| `performance-schema-consumer-events-statements-history-long` | `ON` | 推奨。すべてのスレッドで、より多くの最近のクエリの追跡を有効にします。有効にすると、頻度の低いクエリの実行詳細をキャプチャできる可能性が高くなります。|
| `performance-schema-consumer-events-statements-history` | `ON` | オプション。スレッドごとの最近のクエリ履歴の追跡を有効にします。有効にすると、頻度の低いクエリの実行詳細をキャプチャできる可能性が高くなります。|
{{% /tab %}}
{{< /tabs >}}


**注**: 推奨される方法は、Agent にアクセス権を付与する一環として、Agent が実行時に `performance-schema-consumer-*` 設定を動的に有効にできるようにすることです。[ランタイムセットアップコンシューマー](#runtime-setup-consumers)を参照してください。

## Agent にアクセス権を付与する {#grant-the-agent-access}

Datadog Agent が統計やクエリを収集するためには、データベースへの読み取り専用のアクセスが必要となります。

以下の手順では、`datadog@'%'` を使用して任意のホストからログインする権限を Agent に付与します。`datadog` を使用することで、`datadog@'localhost'` ユーザーのログインを localhost からのみに制限できます。詳細については、[MySQL ドキュメント][5]を参照してください。

{{< tabs >}}
{{% tab "MySQL ≥ 5.7" %}}

`datadog` ユーザーを作成し、基本的なアクセス権限を付与します。

```sql
CREATE USER datadog@'%' IDENTIFIED by '<UNIQUEPASSWORD>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{% tab "MySQL 5.6" %}}

`datadog` ユーザーを作成し、基本的なアクセス権限を付与します。

```sql
CREATE USER datadog@'%' IDENTIFIED BY '<UNIQUEPASSWORD>';
GRANT REPLICATION CLIENT ON *.* TO datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{< /tabs >}}

次のスキーマを作成します。

```sql
CREATE SCHEMA IF NOT EXISTS datadog;
GRANT EXECUTE ON datadog.* to datadog@'%';
```

Agent が実行計画を収集できるようにするには、`explain_statement` プロシージャを作成します。

```sql
DELIMITER $$
CREATE PROCEDURE datadog.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
```

さらに、実行計画を収集する**すべてのスキーマ**でこのプロシージャを作成します。`<YOUR_SCHEMA>` をデータベーススキーマに置き換えます。

```sql
DELIMITER $$
CREATE PROCEDURE <YOUR_SCHEMA>.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE <YOUR_SCHEMA>.explain_statement TO datadog@'%';
```

インデックスメトリクスを収集するには、`datadog` ユーザーに追加の権限を付与します。

```sql
GRANT SELECT ON mysql.innodb_index_stats TO datadog@'%';
```

Agent v7.65 以降、Datadog Agent は MySQL データベースからスキーマ情報を収集できるようになりました。この収集のために Agent に権限を付与する方法の詳細については、以下の[スキーマを収集する][14]セクションを参照してください。


### ランタイムセットアップコンシューマー{#runtime-setup-consumers}
Datadog では、Agent がランタイムで `performance_schema.events_*` コンシューマーを有効にできるように、次のプロシージャを作成することを推奨しています。

```SQL
DELIMITER $$
CREATE PROCEDURE datadog.enable_events_statements_consumers()
    SQL SECURITY DEFINER
BEGIN
    UPDATE performance_schema.setup_consumers SET enabled='YES' WHERE name LIKE 'events_statements_%';
    UPDATE performance_schema.setup_consumers SET enabled='YES' WHERE name = 'events_waits_current';
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE datadog.enable_events_statements_consumers TO datadog@'%';
```

### パスワードを安全に保管する {#securely-store-your-password}
{{% dbm-secret %}}

## Agent のインストール {#install-the-agent}

Datadog Agent をインストールすると、MySQL での Database Monitoring に必要な MySQL チェックもインストールされます。MySQL データベースホストに Agent をまだインストールしていない場合は、[Agent のインストール手順][6]を参照してください。

ホストで実行中の Agent に対してこのチェックを構成するには:

MySQL の [メトリクス](#metric-collection)と[ログ](#log-collection-optional)の収集を開始するには、[Agent の構成ディレクトリ][7]のルートにある `conf.d/` フォルダー内の `mysql.d/conf.yaml` ファイルを編集してください。カスタムメトリクスのオプションなど、利用可能なすべての構成オプションについては、[サンプル mysql.d/conf.yaml][8] を参照してください。

### メトリクスの収集 {#metric-collection}

MySQL メトリクスを収集するには、`mysql.d/conf.yaml` に次の構成ブロックを追加してください。

```yaml
init_config:

instances:
  - dbm: true
    host: 127.0.0.1
    port: 3306
    username: datadog
    password: 'ENC[datadog_user_database_password]' # from the CREATE USER step earlier
```

`datadog`ユーザーは、MySQL インテグレーションの構成で `host: 127.0.0.1` ではなく `localhost` として設定する必要があることに注意してください。あるいは、`sock` を使用することもできます。

[Agent を再起動][9]すると、Datadog への MySQL メトリクスの送信が開始されます。

### ログ収集 (オプション) {#log-collection-optional}

Agent によってデータベースから収集されたテレメトリに加えて、データベースのログを直接 Datadog に送信することも選択できます。

1. デフォルトでは、MySQL はすべてを `/var/log/syslog` にログ記録しますが、これを読み取るには root アクセスが必要です。ログにアクセスしやすくするには、次の手順に従ってください。

   1. `/etc/mysql/conf.d/mysqld_safe_syslog.cnf` を編集し、すべての行をコメントアウトします。
   2. 目的のログ設定を有効にするには、`/etc/mysql/my.cnf` を編集します。たとえば、一般ログ、エラーログ、スロークエリログを有効にするには、次の構成を使用します。

     ```conf
       [mysqld_safe]
       log_error = /var/log/mysql/mysql_error.log

       [mysqld]
       general_log = on
       general_log_file = /var/log/mysql/mysql.log
       log_error = /var/log/mysql/mysql_error.log
       slow_query_log = on
       slow_query_log_file = /var/log/mysql/mysql_slow.log
       long_query_time = 3
     ```

   3. ファイルを保存して MySQL を再起動します。
   4. Agent が `/var/log/mysql` ディレクトリとその中のすべてのファイルに対する読み取り権限を持っていることを確認してください。`logrotate` 構成を再確認し、これらのファイルが考慮されていること、および権限が正しく設定されていることを確認してください。
      `/etc/logrotate.d/mysql-server` には、次のような記述があるはずです。

     ```text
       /var/log/mysql.log /var/log/mysql/mysql.log /var/log/mysql/mysql_slow.log {
               daily
               rotate 7
               missingok
               create 644 mysql adm
               Compress
       }
     ```

2. Datadog Agent ではログの収集がデフォルトで無効になっています。`datadog.yaml` ファイルで有効にします。

   ```yaml
   logs_enabled: true
   ```

3. この構成ブロックを `mysql.d/conf.yaml` ファイルに追加して、MySQL のログの収集を開始してください。

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

4. [Agent を再起動][9]します。

## 検証 {#validate}

[Agent の status サブコマンドを実行][10]し、Checks セクションで `mysql` を探すか、[Databases][11] ページを参照して開始してください！

## Agent の構成例 {#example-agent-configurations}
{{% dbm-mysql-agent-config-examples %}}

## トラブルシューティング {#troubleshooting}

インテグレーションと Agent を手順通りにインストール・設定しても期待通りに動作しない場合は、[トラブルシューティング][12]を参照してください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/database_monitoring/agent_integration_overhead/?tab=mysql
[2]: /ja/database_monitoring/data_collected/#sensitive-information
[3]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
[4]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-options.html
[5]: https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: /ja/agent/configuration/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[9]: /ja/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[10]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[11]: https://app.datadoghq.com/databases
[12]: /ja/database_monitoring/troubleshooting/?tab=mysql
[14]: /ja/database_monitoring/setup_mysql/selfhosted?tab=mysql57#collecting-schemas
[15]: /ja/database_monitoring/setup_mariadb/