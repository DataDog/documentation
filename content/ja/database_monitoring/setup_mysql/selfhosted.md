---
description: セルフホストの MySQL のデータベースモニタリングをインストールして構成します。
further_reading:
- link: /integrations/mysql/
  tag: ドキュメント
  text: 基本的な MySQL インテグレーション
title: セルフホストの MySQL のデータベースモニタリングの設定
---

データベースモニタリングは、InnoDB ストレージエンジンのクエリメトリクス、クエリサンプル、説明プラン、接続データ、システムメトリクス、テレメトリを公開することにより、MySQL データベースの詳細な可視性を提供します。

Agent は、読み取り専用のユーザーとしてログインすることでデータベースから直接テレメトリーを収集します。MySQL データベースでデータベースモニタリングを有効にするには、以下の設定を行ってください。

1. [データベースのパラメーターを構成する](#configure-mysql-settings)
1. [Agent にデータベースへのアクセスを付与する](#grant-the-agent-access)
1. [Agent をインストールする](#install-the-agent)

## はじめに

サポートされている MySQL バージョン
: 5.6、5.7、または 8.0+

サポート対象の Agent バージョン
: 7.36.1+

パフォーマンスへの影響
: データベースモニタリングのデフォルトの Agent コンフィギュレーションは保守的ですが、収集間隔やクエリのサンプリングレートなどの設定を調整することで、よりニーズに合ったものにすることができます。ワークロードの大半において、Agent はデータベース上のクエリ実行時間の 1 % 未満、および CPU の 1 % 未満を占めています。<br/><br/>
データベースモニタリングは、ベースとなる Agent 上のインテグレーションとして動作します ([ベンチマークを参照][1]してください)。

プロキシ、ロードバランサー、コネクションプーラー
: Datadog Agent は、監視対象のホストに直接接続する必要があります。セルフホスト型のデータベースの場合は、`127.0.0.1` またはソケットが推奨されます。Agent は、プロキシ、ロードバランサー、またはコネクションプーラーを介してデータベースに接続すべきではありません。Agent が実行中に異なるホストに接続すると (フェイルオーバーやロードバランシングなどの場合)、Agent は 2 つのホスト間で統計情報の差を計算し、不正確なメトリクスを生成します。

データセキュリティへの配慮
: Agent がお客様のデータベースからどのようなデータを収集するか、またそのデータの安全性をどのように確保しているかについては、[機密情報][2]を参照してください。

## MySQL 設定を構成する

クエリのメトリクス、サンプル、および実行計画を収集するには、[MySQL パフォーマンススキーマ][3]を有効にし、以下の[パフォーマンススキーマオプション][4]をコマンドラインまたはコンフィギュレーションファイル (例: `mysql.conf`) で構成します。

{{< tabs >}}
{{% tab "MySQL 5.6" %}}
| パラメーター | 値 | 説明|
| --- | --- | --- |
| `performance_schema` | `ON` | 必須。パフォーマンススキーマを有効にします。|
| `max_digest_length` | `4096` | より大きなクエリの収集に必要です。デフォルト値のままにすると、`1024` 文字より長いクエリは収集されません。|
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code> | `4096` | `max_digest_length` と一致する必要があります。 |
| `performance-schema-consumer-events-statements-current` | `ON` | 必須。現在実行中のクエリのモニタリングを可能にします。|
| `performance-schema-consumer-events-waits-current` | `ON` | 必須。待機イベントの収集を有効にします。 |
| `performance-schema-consumer-events-statements-history-long` | `ON` | 推奨。すべてのスレッドにおいて、より多くの最近のクエリを追跡することができます。この機能を有効にすると、頻度の低いクエリの実行情報を取得できる可能性が高まります。|
| `performance-schema-consumer-events-statements-history` | `ON` | オプション。スレッドごとに最近のクエリの履歴を追跡することができます。この機能を有効にすると、頻度の低いクエリの実行情報を取得できる可能性が高まります。|
{{% /tab %}}

{{% tab "MySQL ≥ 5.7" %}}
| パラメーター | 値 | 説明 |
| --- | --- | --- |
| `performance_schema` | `ON` | 必須。パフォーマンススキーマを有効にします。|
| `max_digest_length` | `4096` | より大きなクエリの収集に必要です。デフォルト値のままにすると、`1024` 文字より長いクエリは収集されません。|
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code> | `4096` | Must match `max_digest_length`. |
| <code style="word-break:break-all;">`performance_schema_max_sql_text_length`</code> | `4096` |  `max_digest_length` と一致する必要があります。|
| `performance-schema-consumer-events-statements-current` | `ON` | 必須。現在実行中のクエリのモニタリングを可能にします。|
| `performance-schema-consumer-events-waits-current` | `ON` | 必須。待機イベントの収集を有効にします。 |
| `performance-schema-consumer-events-statements-history-long` | `ON` | 推奨。すべてのスレッドにおいて、より多くの最近のクエリを追跡することができます。この機能を有効にすると、頻度の低いクエリの実行情報を取得できる可能性が高まります。|
| `performance-schema-consumer-events-statements-history` | `ON` | オプション。スレッドごとに最近のクエリの履歴を追跡することができます。この機能を有効にすると、頻度の低いクエリの実行情報を取得できる可能性が高まります。|
{{% /tab %}}
{{< /tabs >}}


**注**: Agent へのアクセス権限付与の一環として、Agent がランタイム時に動的に `performance-schema-consumer-*` 設定を有効にできるようにすることを推奨します。[ランタイムセットアップコンシューマー](#runtime-setup-consumers)を参照してください。

## Agent にアクセスを付与する

Datadog Agent が統計やクエリを収集するためには、データベースへの読み取り専用のアクセスが必要となります。

次の手順では、`datadog@'%'` を使用して任意のホストからログインするアクセス許可を Agent に付与します。`datadog@'localhost'` を使用して、`datadog` ユーザーが localhost からのみログインできるように制限できます。詳細については、[MySQL ドキュメント][5]を参照してください。

{{< tabs >}}
{{% tab "MySQL 5.6" %}}

`datadog` ユーザーを作成し、基本的なアクセス許可を付与します。

```sql
CREATE USER datadog@'%' IDENTIFIED BY '<UNIQUEPASSWORD>';
GRANT REPLICATION CLIENT ON *.* TO datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{% tab "MySQL ≥ 5.7" %}}

`datadog` ユーザーを作成し、基本的なアクセス許可を付与します。

```sql
CREATE USER datadog@'%' IDENTIFIED by '<UNIQUEPASSWORD>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{< /tabs >}}

次のスキーマを作成します。

```sql
CREATE SCHEMA IF NOT EXISTS datadog;
GRANT EXECUTE ON datadog.* to datadog@'%';
GRANT CREATE TEMPORARY TABLES ON datadog.* TO datadog@'%';
```

Agent が説明プランを収集できるようにするには、`explain_statement` プロシージャを作成します。

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

さらに、説明プランを収集する**すべてのスキーマ**でこのプロシージャを作成します。`<YOUR_SCHEMA>` をデータベーススキーマに置き換えます。

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

### ランタイムセットアップコンシューマー
Datadogは、ランタイムで `performance_schema.events_*` コンシューマーを有効にする機能を Agent に与えるために、次のプロシージャを作成することをお勧めします。

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

## Agent のインストール

Datadog Agent をインストールすると、MySQL でのデータベースモニタリングに必要な MySQL チェックもインストールされます。MySQL データベースホストの Agent をまだインストールしていない場合は、[Agent のインストール手順][6]を参照してください。

ホストで実行中の Agent に対してこのチェックを構成するには

MySQL の[メトリクス](#metric-collection)と[ログ](#log-collection-optional)の収集を開始するには、[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `mysql.d/conf.yaml` ファイルを編集します。カスタムメトリクスのオプションなど、使用可能なすべてのコンフィギュレーションオプションについては、[サンプル mysql.d/conf.yaml][8] を参照してください。

### メトリクスの収集

MySQL メトリクスを収集するには、`mysql.d/conf.yaml` に次のコンフィギュレーションブロックを追加します。

```yaml
init_config:

instances:
  - dbm: true
    host: 127.0.0.1
    port: 3306
    username: datadog
    password: '<YOUR_CHOSEN_PASSWORD>' # 前述の CREATE USER ステップで作成
```

**注**: パスワードに特殊文字が含まれる場合は、単一引用符で囲んでください。

`datadog` ユーザーは、`localhost` ではなく `host: 127.0.0.1` として MySQL インテグレーション構成内にセットアップされる必要があります。または、`sock` を使用することもできます。

[Agent を再起動][9]すると、Datadog への MySQL メトリクスの送信が開始されます。

### ログ収集 (オプション)

Agent によってデータベースから収集されたテレメトリーに加えて、データベースのログを直接 Datadog に送信することも選択できます。

1. MySQL は、デフォルトでは `/var/log/syslog` 内のすべてをログに記録しますが、これには、読み取りのルートアクセス許可が必要です。ログへのアクセス可能性を高めるには、以下の手順に従ってください。

   1. `/etc/mysql/conf.d/mysqld_safe_syslog.cnf` を編集して、すべての行をコメントアウトします。
   2. `/etc/mysql/my.cnf` を編集して、必要なログ設定を有効にします。例えば、一般ログ、エラーログ、低速クエリのログを有効にするには、次のコンフィギュレーションを使用します。

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
   4. Agent が `/var/log/mysql` ディレクトリとその中のすべてのファイルに対する読み取りアクセス許可を持つことを確認します。`logrotate` コンフィギュレーションもチェックして、これらのファイルが考慮され、アクセス許可が正しく設定されていることを確認します。
      `/etc/logrotate.d/mysql-server` の内容は次のようになります。

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

4. [Agent を再起動します][9]。

## UpdateAzureIntegration

[Agent の status サブコマンドを実行][10]し、Checks セクションで `mysql` を探します。または、[データベース][11]のページを参照してください。

## Agent の構成例
{{% dbm-mysql-agent-config-examples %}}

## トラブルシューティング

インテグレーションと Agent を手順通りにインストール・設定しても期待通りに動作しない場合は、[トラブルシューティング][12]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/basic_agent_usage#agent-overhead
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