---
description: Troubleshoot Database Monitoring setup
title: Troubleshoot Database Monitoring setup for MySQL
---

このページでは、MySQL によるデータベースモニタリングのセットアップおよび使用に関する一般的な問題と、その解決方法について詳しく説明します。Datadog では、Agent のバージョンリリースにより内容が変更となる可能性があるため、最新の安定した Agent バージョンを使用し、最新の[セットアップドキュメント][1]に従っていただくことをお勧めします。

## 一般的な問題の診断

### データベースモニタリングを構成してもデータが表示されない

[セットアップ手順][1]に従って Agent を構成してもデータが表示されない場合は、Agent のコンフィギュレーションまたは API キーに問題がある可能性があります。[トラブルシューティングガイド][2]に従って、Agent からデータを受信していることを確認してください。

システムメトリクスなどの他のデータは受信しているが、データベースモニタリングのデータ (クエリメトリクスやクエリサンプルなど) を受信していない場合、Agent またはデータベースのコンフィギュレーションに問題がある可能性があります。Agent のコンフィギュレーションが[セットアップ手順][1]の例と同様であることを確認し、コンフィギュレーションファイルの場所を再確認してください。

デバッグを行うには、まず[Agent のステータスコマンド][3]を実行して、収集されたデータや Datadog に送信されたデータのデバッグ情報を収集します。

`Config Errors` セクションをチェックして、コンフィギュレーションファイルが有効であることを確認してください。例えば、次のような場合は、インスタンスコンフィギュレーションが存在しないか、ファイルが無効であることを示しています。

```
  Config Errors
  ==============
    mysql
    -----
      Configuration file contains no valid instances
```

コンフィギュレーションが有効であれば、次のように表示されます。

```
=========
Collector
=========

  Running Checks
  ==============

    mysql (5.0.4)
    -------------
      Instance ID: mysql:505a0dd620ccaa2a
      Configuration Source: file:/etc/datadog-agent/conf.d/mysql.d/conf.yaml
      Total Runs: 32,439
      Metric Samples: Last Run: 175, Total: 5,833,916
      Events: Last Run: 0, Total: 0
      Database Monitoring Query Metrics: Last Run: 2, Total: 51,074
      Database Monitoring Query Samples: Last Run: 1, Total: 74,451
      Service Checks: Last Run: 3, Total: 95,993
      Average Execution Time : 1.798s
      Last Execution Date : 2021-07-29 19:28:21 UTC (1627586901000)
      Last Successful Execution Date : 2021-07-29 19:28:21 UTC (1627586901000)
      metadata:
        flavor: MySQL
        version.build: unspecified
        version.major: 5
        version.minor: 7
        version.patch: 34
        version.raw: 5.7.34+unspecified
        version.scheme: semver
```

これらの行が出力され、値がゼロより大きいことを確認してください。

```
Database Monitoring Query Metrics: Last Run: 2, Total: 51,074
Database Monitoring Query Samples: Last Run: 1, Total: 74,451
```

Agent のコンフィギュレーションが正しいことを確認したら、[Agent のログ][4]でデータベースのインテグレーション実行時に警告やエラーが発生していないかをチェックします。

Datadog Agent で `check` CLI コマンドを実行し、出力にエラーがないかを検査することで、明示的にチェックを実行することもできます。

```bash
# Agent をセルフホストでインストールした場合
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check postgres -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check mysql -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check sqlserver -t 2

# Agent をコンテナベースでインストールした場合
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check postgres -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check mysql -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check sqlserver -t 2
```
### クエリに実行計画が欠けている

一部またはすべてのクエリで計画が利用できない場合があります。これは、サポートされていないクエリコマンドである、クエリがサポートされていないクライアントアプリケーションせ生成された、Agent のバージョンが古い、データベースのセットアップが不完全であることなどが原因です。以下は、実行計画の欠落の原因として考えられるものです。

#### イベントステートメントコンシューマーの欠落 {#events-statements-consumer-missing}
実行計画をキャプチャするには、イベントステートメントのコンシューマーを有効にする必要があります。これを行うには、コンフィグレーションファイル (例: `mysql.conf`) に以下のオプションを追加します。
```
performance-schema-consumer-events-statements-current=ON
```

Datadog では、さらに以下を有効にすることを推奨しています。
```
performance-schema-consumer-events-statements-history-long=ON
```
このオプションは、すべてのスレッドにおいて、より多くの最近のクエリを追跡することができます。これをオンにすると、頻度の低いクエリの実行内容をキャプチャできる可能性が高くなります。

#### 実行計画プロシージャの欠落 {#explain-plan-procedure-missing}
Agent は `datadog.explain_statement(...)` というプロシージャが `datadog` スキーマに存在することを必要とします。`datadog` スキーマの作成の詳細については、[セットアップ手順][1]を参照してください。 

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
#### 完全修飾実行計画プロシージャの欠落 {#explain-plan-fq-procedure-missing}
Agent は、プロシージャ `explain_statement(...)` が、Agent がサンプルを収集できる**すべてのスキーマ**に存在することを必要とします。

実行計画を収集する**すべてのスキーマ**でこのプロシージャを作成します。`<YOUR_SCHEMA>` をデータベーススキーマに置き換えます。

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

#### Agent がサポートされていないバージョンで動作している

Agent のバージョンが 7.36.1 以上であることを確認してください。Datadog では、新機能、より良いパフォーマンス、およびセキュリティアップデートをご利用いただくために、定期的な Agent のアップデートをお勧めします。

#### クエリが切り捨てられる。

クエリのサンプルテキストのサイズを大きくする方法については、[切り捨てられたクエリサンプル](#query-samples-are-truncated)のセクションを参照してください。

#### クエリが実行されない

BEGIN、COMMIT、SHOW、USE、ALTER などの一部のクエリでは、データベースから有効な実行計画を得ることができません。SELECT、UPDATE、INSERT、DELETE、REPLACE の各クエリのみが実行計画をサポートしています。

#### クエリの実行頻度が比較的低い、または実行速度が速い。

このクエリはデータベースの総実行時間の中で大きな割合を占めていないため、選択のためにサンプリングされていない可能性があります。クエリをキャプチャするために、[サンプリングレートを上げる][5]ことを試みてください。

### クエリメトリクスが見つからない

クエリメトリクスデータの欠落を診断する手順を実行する前に、Agent が正常に動作しており、[Agent データの欠落を診断する手順](#no-data-is-show-after-configuring-database-monitoring)を実行していることを確認してください。クエリメトリクスが見つからない場合、以下のような原因が考えられます。

#### `performance_schema` が有効になっていない {#performance-schema-not-enabled}
Agent は、`performance_schema` オプションが有効になっていることを必要とします。これは、MySQL ではデフォルトで有効になっていますが、コンフィギュレーションやクラウドプロバイダーによっては無効になっている場合があります。有効にするには、[セットアップ手順][1]に従ってください。

#### Google Cloud SQL の制限
このホストは Google Cloud SQL で管理されており、`performance_schema` をサポートしていません。Google Cloud SQL の制限により、Datadog データベースモニタリングは[16GB 以下の RAM を持つインスタンスではサポートされません][6]。

### 特定のクエリが見つからない

いくつかのクエリのデータはあるが、データベースモニタリングで特定のクエリやクエリセットを確認したい場合は、以下のガイドに従ってください。


| 考えられる原因                         | ソリューション                                  |
|----------------------------------------|-------------------------------------------|
| クエリが「トップクエリ」ではなく、そのクエリの実行時間の合計が、選択した期間のどの時点においても正規化された上位 200 のクエリに含まれていない。 | クエリが「Other Queries」の行にまとめられている場合があります。どのクエリが追跡されるかの詳細については、[収集データ][7]を参照してください。追跡されるトップクエリの数を増やしたい場合は、Datadog サポートにお問い合わせください。 |
| `events_statements_summary_by_digest` が満杯の可能性がある。 | `performance_schema` の MySQL テーブル `events_statements_summary_by_digest` には、保存対象となるダイジェスト (正規化されたクエリ) の数に上限があります。メンテナンスタスクでこのテーブルを定期的にデータを削除することで、すべてのクエリが長期にわたって追跡されるようになります。詳しくは[高度なコンフィギュレーション][5]をご覧ください。 |
| Agent が最後に再起動してから、クエリが一回実行された。 | クエリメトリクスは、Agent の再起動後、10 秒間隔で 2 回以上実行された後にのみ発行されます。 |

### クエリサンプルが切り捨てられる

長いクエリの場合、データベースのコンフィギュレーション上 SQL の全文が表示されないことがあります。お客様のワークロードに合わせて多少のチューニングが必要です。

Datadog Agent から見える MySQL の SQL テキストの長さは、以下の[システム変数][8]によって決定されます。

```
max_digest_length=4096
performance_schema_max_digest_length=4096
performance_schema_max_sql_text_length=4096
```

### クエリアクティビティがない

<div class="alert alert-warning">Query Activity and Wait Event collection are not supported for Flexible Server, as these features require MySQL settings that are not available on a Flexible Server host.</div>

クエリアクティビティの欠落を診断する手順を実行する前に、Agent が正常に動作しており、[Agent データの欠落を診断する手順](#no-data-is-show-after-configuring-database-monitoring)を実行していることを確認してください。クエリアクティビティが見つからない場合、以下のような原因が考えられます。

#### `performance-schema-consumer-events-waits-current` が有効になっていない {#events-waits-current-not-enabled}
Agent は `performance-schema-consumer-events-waits-current` オプションが有効であることを必要とします。このオプションは MySQL ではデフォルトで無効になっていますが、クラウドプロバイダーによって有効化されている場合があります。有効にするには、[セットアップの説明][1]に従ってください。また、データベースのバウンスを回避するために、ランタイムセットアップコンシューマーの設定を検討してください。以下のプロシージャを作成し、実行時に `performance_schema.events_*` コンシューマーを有効にする機能を Agent に与えます。


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

**注:** このオプションを使用するには、さらに `performance_schema` が有効であることが必要です。


<!-- TODO: SQL テキストの最大長を取得するためのカスタムクエリレシピを追加 -->

### MySQL Query Metrics & Samples でスキーマまたはデータベースが見つからない

`schema` タグ (別名 "database") は、クエリを実行した接続にデフォルトデータベースが設定されている場合のみ MySQL Query Metrics and Samples に存在します。デフォルトデータベースは、データベース接続パラメーターで "schema" を指定するか、すでに存在する接続で [USE Statement][9] を実行することで、アプリケーションによって構成されます。

接続にデフォルトのデータベースが構成されていない場合、その接続で行われるクエリには `schema` タグは付きません。

[1]: /ja/database_monitoring/setup_mysql/
[2]: /ja/agent/troubleshooting/
[3]: /ja/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[4]: /ja/agent/configuration/agent-log-files
[5]: /ja/database_monitoring/setup_mysql/advanced_configuration/
[6]: https://cloud.google.com/sql/docs/mysql/flags#tips-performance-schema
[7]: /ja/database_monitoring/data_collected/#which-queries-are-tracked
[8]: https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_max_digest_length
[9]: https://dev.mysql.com/doc/refman/8.0/en/use.html