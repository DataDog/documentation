---
description: Database Monitoring セットアップのトラブルシューティング
title: MariaDB の Database Monitoring セットアップのトラブルシューティング
---
このページでは、MariaDB で Database Monitoring をセットアップおよび使用する際の一般的な問題と、その解決方法について詳しく説明します。Datadog では、Agent のバージョンリリースに伴い変更される可能性があるため、常に最新の安定版 Agent バージョンを使用し、最新の [セットアップドキュメント][1]に従うことを推奨しています。

## 一般的な問題の診断{#diagnosing-common-problems}

### Database Monitoring を構成してもデータが表示されない{#no-data-is-showing-after-configuring-database-monitoring}

[セットアップ手順][1]に従って Agent を構成した後にデータが表示されない場合は、Agent の構成または API キーに問題がある可能性が最も高いです。[トラブルシューティングガイド][2]に従って、Agent からデータを受信していることを確認してください。

システムメトリクスなどの他のデータは受信できているのに、Database Monitoring データ (クエリメトリクスやクエリサンプルなど) が受信できない場合は、Agent またはデータベースの構成に問題がある可能性があります。Agent の構成を [セットアップ手順][1]の例と比較して一致していることを確認し、構成ファイルの場所を再確認してください。

デバッグを行うには、まず[Agent のステータスコマンド][3]を実行して、収集されたデータや Datadog に送信されたデータのデバッグ情報を収集します。

`Config Errors` セクションを確認して、構成ファイルが有効であることを確認してください。たとえば、以下はインスタンス構成が欠落しているか、ファイルが無効であることを示しています。

```
  Config Errors
  ==============
    mysql
    -----
      Configuration file contains no valid instances
```

構成が有効であれば、次のように表示されます。

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
        flavor: MariaDB
        version.build: unspecified
        version.major: 10
        version.minor: 11
        version.patch: 6
        version.raw: 10.11.6-MariaDB
        version.scheme: semver
```

これらの行が出力され、値がゼロより大きいことを確認してください。

```
Database Monitoring Query Metrics: Last Run: 2, Total: 51,074
Database Monitoring Query Samples: Last Run: 1, Total: 74,451
```

Agent の構成が正しいことを確認したら、[Agent のログ][4]でデータベースのインテグレーション実行時に警告やエラーが発生していないかをチェックします。

Datadog Agent で `check` CLI コマンドを実行し、出力にエラーがないかを確認することで、明示的にチェックを実行することもできます。

```bash
# For self-hosted installations of the Agent
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check mysql -t 2

# For container-based installations of the Agent
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check mysql -t 2
```

### クエリに実行計画が欠けている{#queries-are-missing-explain-plans}

一部またはすべてのクエリで実行計画を利用できない場合があります。これは、サポートされていないクエリコマンド、サポートされていないクライアントアプリケーションからのクエリ、古い Agent、または不完全なデータベースのセットアップなどが原因です。実行計画が欠けている場合の考えられる原因を以下に示します。

#### イベントステートメントコンシューマーの欠落 {#events-statements-consumer-missing}
実行計画を取得するには、イベントステートメントコンシューマーを有効にする必要があります。これを行うには、構成ファイル (例: `mysql.conf`) に次のオプションを追加します。

```
performance-schema-consumer-events-statements-current=ON
```

Datadog では、さらに以下を有効にすることを推奨しています。

```
performance-schema-consumer-events-statements-history-long=ON
```
このオプションを有効にすると、すべてのスレッドでより多くの最近のクエリを追跡できるようになります。これをオンにすると、実行頻度の低いクエリから実行詳細をキャプチャできる可能性が高まります。

#### 実行計画プロシージャの欠落 {#explain-plan-procedure-missing}
Agent は、プロシージャ `datadog.explain_statement(...)` が `datadog` スキーマに存在することを必要とします。`datadog` スキーマの作成方法の詳細については、[セットアップ手順][1]を参照してください。

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
#### 完全修飾実行計画プロシージャの欠落 {#explain-plan-fq-procedure-missing}
Agent は、プロシージャ `explain_statement(...)` が、Agent がサンプルを収集できる**すべてのスキーマ**に存在することを必要とします。

実行計画を収集する**すべてのスキーマ**に、このプロシージャを作成します。`<YOUR_SCHEMA>` をデータベーススキーマに置き換えます。

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

#### Agent がサポートされていないバージョンで動作している{#agent-is-running-an-unsupported-version}

Agent のバージョンが 7.61.0 以上であることを確認してください。Datadog では、新機能、パフォーマンスの改善、およびセキュリティアップデートを利用できるように、Agent を定期的にアップデートすることを推奨しています。

#### クエリが切り捨てられる {#queries-are-truncated}

クエリのサンプルテキストのサイズを大きくする方法については、[切り捨てられたクエリサンプル](#query-samples-are-truncated)のセクションを参照してください。

#### クエリを説明することができない {#query-cannot-be-explained}

BEGIN、COMMIT、SHOW、USE、ALTER クエリなど、一部のクエリでは、データベースから有効な実行計画を取得できません。実行計画がサポートされているのは、SELECT、UPDATE、INSERT、DELETE、および REPLACE クエリのみです。

#### クエリの実行頻度が比較的低い、または実行速度が速い {#query-is-relatively-infrequent-or-executes-fast}

このクエリはデータベースの総実行時間の中で大きな割合を占めていないため、選択のためにサンプリングされていない可能性があります。[サンプリングレートを上げる][5]ことで、クエリをキャプチャします。

### クエリメトリクスが見つからない {#query-metrics-are-missing}

クエリメトリクスデータの欠落を診断する手順を実行する前に、Agent が正常に動作しており、[Agent データの欠落を診断する手順](#no-data-is-showing-after-configuring-database-monitoring)を実行していることを確認します。以下は、クエリメトリクスが欠落している可能性のある原因です。

プリペアドステートメントメトリクスには、MariaDB 10.5.2 以降が必要です (`performance_schema.prepared_statements_instances`)。`events_statements_summary_by_digest` からのクエリメトリクスは、サポートされているすべての MariaDB バージョンで収集されます。

`performance_schema` が無効になっている場合、クエリメトリクスもプリペアドステートメントメトリクスも収集されません。[`performance_schema` が有効になっていないことを確認します](#performance-schema-not-enabled)。

### インデックスメトリクスが欠落している {#index-metrics-are-missing}

Agent にこのエラーが表示される場合、

```
Error querying mysql.innodb_index_stats: (1142, "SELECT command denied to user 'datadog'@'172.20.0.5' for table 'innodb_index_stats'")
```
エラーを解決するには、インデックスメトリクスを収集できるように `datadog` ユーザーに SELECT 権限を付与します。

```sql
GRANT SELECT ON mysql.innodb_index_stats TO datadog@'%';
```

#### `performance_schema` が有効になっていない {#performance-schema-not-enabled}
Agent には `performance_schema` オプションが有効になっている必要があります。**MySQL とは異なり、MariaDB はデフォルトで `performance_schema` を有効にしません。**有効にするための[セットアップ手順][1]に従います。

### ブロッキングクエリが見つからない、または不完全です {#blocking-queries-are-missing-or-incomplete}

#### ブロッキングクエリの収集が無効になっています {#blocking-query-collection-is-disabled}

ブロッキングクエリの収集はデフォルトで無効になっています。インスタンス構成で `query_activity.collect_blocking_queries: true` を使用して有効にします。これには、[セットアップ手順][1]にある `PROCESS` および `SELECT ON performance_schema.*` 権限以外の追加の権限は必要ありません。

#### MySQL 8.0 よりもブロッキングクエリ列が少ない {#fewer-blocking-query-columns-than-mysql-80}

MariaDB は、最新の MariaDB バージョンであっても、MySQL 5.7 が使用するものと同じ、よりシンプルなブロッキングクエリ列と結合のセットを常に使用します。MySQL 8.0 で利用可能なより豊富なブロッキングクエリ列は、MariaDB では利用できません。

#### デッドロック数が横ばいになっている {#deadlock-counts-appear-flat}

MariaDB ではデッドロック数が更新されません。データベースで実際にデッドロックが発生していても、デッドロックメトリクスがゼロのままになる場合があります。

### 特定のクエリが見つからない {#certain-queries-are-missing}

いくつかのクエリのデータはあるが、Database Monitoring で特定のクエリやクエリセットを確認したい場合は、以下のガイドに従ってください。


| 考えられる原因                         | 解決策                                  |
|----------------------------------------|-------------------------------------------|
| クエリが「トップクエリ」ではなく、そのクエリの実行時間の合計が、選択した期間のどの時点においても正規化された上位 200 のクエリに含まれていない。| [Other Queries] 行にグループ化されている可能性があります。どのクエリが追跡されるかについて詳しくは、[収集されるデータ][7]をご覧ください。追跡されるトップクエリの数は、Datadog サポートに問い合わせることで増やすことができます。|
| `events_statements_summary_by_digest`がいっぱいになっている可能性があります。| MariaDB テーブル `events_statements_summary_by_digest` の `performance_schema` には、保存できるダイジェスト (正規化されたクエリ) の数に上限があります。このテーブルをメンテナンス作業として定期的に切り捨てることで、時間の経過とともにすべてのクエリを追跡できます。詳しくは、[高度な構成][5]をご覧ください。|
| Agent が最後に再起動されてから、クエリは 1 回だけ実行されています。| クエリメトリクスは、Agent の再起動後、10 秒間隔で 2 回以上実行された場合にのみ発行されます。|

### クエリサンプルが切り捨てられる{#query-samples-are-truncated}

データベースの構成により、長いクエリの SQL テキスト全体が表示されない場合があります。ワークロードに合わせて調整するには、いくつかのチューニングが必要です。

Datadog Agent から参照できる MariaDB の SQL テキストの長さは、以下の[システム変数][8]によって決まります。

```
max_digest_length=4096
performance_schema_max_digest_length=4096
performance_schema_max_sql_text_length=4096
```

### クエリアクティビティがない{#query-activity-is-missing}

クエリアクティビティがない問題を診断するために以下の手順を実行する前に、Agent が正常に動作していること、および [Agent のデータ欠落を診断する手順](#no-data-is-showing-after-configuring-database-monitoring)に従っていることを確認してください。クエリアクティビティがない場合に考えられる原因を、以下に示します。

#### `performance-schema-consumer-events-waits-current`が有効になっていません {#events-waits-current-not-enabled}
Agent では `performance-schema-consumer-events-waits-current` オプションを有効にする必要があります。デフォルトでは無効になっています。有効にするための[セットアップ手順][1]に従います。あるいは、データベースを再起動せずに済むように、ランタイムセットアップコンシューマーのセットアップを検討してください。Agent が実行時に `performance_schema.events_*` コンシューマーを有効にできるように、以下のプロシージャを作成します。


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

**注:** このオプションを使用するには、さらに `performance_schema` を有効にする必要があります。

### 収集されたスキーマにテーブルがありません {#tables-are-missing-from-collected-schemas}

Agent が以下で始まる警告をログに記録する場合、

```
No tables were found across any of the N databases.
```
MariaDB は `INFORMATION_SCHEMA` 内のテーブルをそのテーブルに対する権限を持つユーザーにのみ公開するため、`datadog` ユーザーは権限がないとテーブルをまったく表示できません。`REFERENCES` 権限を付与して警告を解決します。これにより、Agent にデータを読み取る権限を与えることなく、テーブルのメタデータを表示できるようになります。

```sql
GRANT REFERENCES ON *.* TO datadog@'%';
```

詳細については、[スキーマを収集する][10]を参照してください。

### MariaDB Query Metrics & Samples でスキーマまたはデータベースが見つかりません {#schema-or-database-missing-on-mariadb-query-metrics-samples}

`schema` タグ (「データベース」とも呼ばれます) は、クエリを実行したコネクションに Default Database が設定されている場合にのみ、MariaDB Query Metrics and Samples に存在します。Default Database は、データベースコネクションパラメーターで「schema」を指定するか、既存のコネクションで [USE Statement][9] を実行することによって、アプリケーション側で構成されます。

コネクションにデフォルトデータベースが構成されていない場合、そのコネクションで行われるクエリには `schema` タグは付きません。

## MariaDB の既知の制限事項 {#mariadb-known-limitations}

MariaDB は同じ MySQL インテグレーションを使用して監視され、メトリクスとイベントには MySQL データと区別するために `dbms_flavor:mariadb` がタグ付けされます。以下の機能は MySQL とは異なるか、MariaDB ではサポートされていません。

### 非互換の InnoDB メトリクス {#incompatible-innodb-metrics}

以下の InnoDB メトリクスは、一部の MariaDB バージョンでは利用できません。

| メトリクス名                             | MariaDB バージョン        |
| --------------------------------------- | ----------------------- |
| `mysql.innodb.hash_index_cells_total`   | 10.5、10.6、10.11、11.4 |
| `mysql.innodb.hash_index_cells_used`    | 10.5、10.6、10.11、11.4 |
| `mysql.innodb.os_log_fsyncs`            | 10.11、11.4             |
| `mysql.innodb.os_log_pending_fsyncs`    | 10.11、11.4             |
| `mysql.innodb.os_log_pending_writes`    | 10.11、11.4             |
| `mysql.innodb.pending_log_flushes`      | 10.11、11.4             |
| `mysql.innodb.pending_log_writes`       | 10.5、10.6、10.11、11.4 |
| `mysql.innodb.pending_normal_aio_reads` | 10.5、10.6、10.11、11.4 |
| `mysql.innodb.pending_normal_aio_writes`| 10.5、10.6、10.11、11.4 |
| `mysql.innodb.rows_deleted`             | 10.11、11.4             |
| `mysql.innodb.rows_inserted`            | 10.11、11.4             |
| `mysql.innodb.rows_updated`             | 10.11、11.4             |
| `mysql.innodb.rows_read`                | 10.11、11.4             |
| `mysql.innodb.s_lock_os_waits`          | 10.6、10.11、11.4       |
| `mysql.innodb.s_lock_spin_rounds`       | 10.6、10.11、11.4       |
| `mysql.innodb.s_lock_spin_waits`        | 10.6、10.11、11.4       |
| `mysql.innodb.x_lock_os_waits`          | 10.6、10.11、11.4       |
| `mysql.innodb.x_lock_spin_rounds`       | 10.6、10.11、11.4       |
| `mysql.innodb.x_lock_spin_waits`        | 10.6、10.11、11.4       |

### MariaDB の実行計画 {#mariadb-explain-plan}

MariaDB は、実行計画について MySQL と同じ JSON 形式を生成しません。`cost_info`、`rows_examined_per_scan`、`rows_produced_per_join`、`used_columns` を含む一部の実行計画フィールドが、MariaDB の実行計画から欠落している可能性があります。実行計画の収集自体は MySQL と同じ方法で機能しますが、これらのフィールドに依存する計画の可視化では、MariaDB クエリの詳細が少なく表示される場合があります。

### `mysql.performance.errors_raised`は収集されません {#mysqlperformanceerrors-raised-is-not-collected}

このメトリックは MySQL 8.0 以降でのみ収集され、MariaDB では利用できません。

### 関数インデックスはスキーマメタデータに反映されません {#functional-indexes-arent-reflected-in-schema-metadata}

MariaDB は関数インデックスをサポートしていません。インデックスメタデータの収集では、MySQL 8.0.13 以降で利用可能な追加の式情報を使用せず、常にプレーンなインデックスクエリが使用されます。

### クラスタータグはサポートされていない{#cluster-tags-arent-supported}

MariaDB ではクラスタータグは収集されません。

[1]: /ja/database_monitoring/setup_mariadb/
[2]: /ja/agent/troubleshooting/
[3]: /ja/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[4]: /ja/agent/configuration/agent-log-files
[5]: /ja/database_monitoring/setup_mariadb/advanced_configuration/
[7]: /ja/database_monitoring/data_collected/#which-queries-are-tracked
[8]: https://mariadb.com/kb/en/server-system-variables/#max_digest_length
[9]: https://mariadb.com/kb/en/use/
[10]: /ja/database_monitoring/setup_mariadb/selfhosted/#collecting-schemas