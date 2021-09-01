---
title: データベースモニタリングのトラブルシューティング
kind: documentation
description: データベースモニタリングセットアップのトラブルシューティング
---
{{< site-region region="us3,gov" >}}
<div class="alert alert-warning">データベースモニタリングはこのサイトでサポートされていません。</div>
{{< /site-region >}}

このページでは、データベースモニタリングのセットアップおよび使用に関する一般的な問題と、その解決方法について詳しく説明します。Agent 　のバージョンリリースにより内容が変更となる可能性があるため、最新の安定した Agent バージョンを使用し、最新の[セットアップドキュメント][1]に従っていただくことをお勧めします。

## 一般的な問題の診断

### データベースモニタリングを構成してもデータが表示されない

[セットアップ手順][1]に従って Agent を構成してもデータが表示されない場合は、Agent のコンフィギュレーションまたは API キーに問題がある可能性があります。[トラブルシューティングガイド][2]に従って、Agent からデータを受信していることを確認してください。

システムメトリクスなどの他のデータは受信しているが、データベースモニタリングのデータ (クエリメトリクスやクエリサンプルなど) を受信していない場合、Agent またはデータベースのコンフィギュレーションに問題がある可能性があります。Agent のコンフィギュレーションが[セットアップ手順][1]の例と同様であることを確認し、コンフィギュレーションファイルの場所を再確認してください。

{{< tabs >}}
{{% tab "Postgres" %}}

デバッグを行うには、まず[Agent のステータスコマンド][1]を実行して、収集されたデータや Datadog に送信されたデータのデバッグ情報を収集します。

`Config Errors` セクションをチェックして、コンフィギュレーションファイルが有効であることを確認してください。例えば、次のような場合は、インスタンスコンフィギュレーションが存在しないか、ファイルが無効であることを示しています。

```
  Config Errors
  ==============
    postgres
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

    postgres (8.0.5)
    ----------------
      Instance ID: postgres:d3dceb9fd36fd57e [OK]
      Configuration Source: file:/etc/datadog-agent/conf.d/postgres.d/conf.yaml
      Total Runs: 16,538
      Metric Samples: Last Run: 186, Total: 2,844,362
      Events: Last Run: 0, Total: 0
      Database Monitoring Query Metrics: Last Run: 2, Total: 24,274
      Database Monitoring Query Samples: Last Run: 1, Total: 17,921
      Service Checks: Last Run: 1, Total: 16,538
      Average Execution Time : 1.765s
      Last Execution Date : 2021-07-26 19:16:58 UTC (1627327018000)
      Last Successful Execution Date : 2021-07-26 19:16:58 UTC (1627327018000)
      metadata:
        version.major: 10
        version.minor: 17
        version.patch: 0
        version.raw: 10.17
        version.scheme: semver
```

これらの行が出力され、値がゼロより大きいことを確認してください。

```
Database Monitoring Query Metrics: Last Run: 2, Total: 24,274
Database Monitoring Query Samples: Last Run: 1, Total: 17,921
```

[1]: /ja/agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
{{% /tab %}}
{{% tab "MySQL" %}}

デバッグを行うには、まず[Agent のステータスコマンド][1]を実行して、収集されたデータや Datadog に送信されたデータのデバッグ情報を収集します。

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

[1]: /ja/agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
{{% /tab %}}
{{< /tabs >}}

Agent のコンフィギュレーションが正しいことを確認したら、[Agent のログ][3]でデータベースのインテグレーション実行時に警告やエラーが発生していないかをチェックします。

Datadog Agent で `check` CLI コマンドを実行し、出力にエラーがないかを検査することで、明示的にチェックを実行することもできます。

```bash
# Agent をセルフホストでインストールした場合
datadog-agent check postgres -t 2
datadog-agent check mysql -t 2

# Agent をコンテナベースでインストールした場合
agent check postgres -t 2
agent check mysql -t 2
```

### クエリメトリクスが見つからない

クエリメトリクスデータの欠落を診断する手順を実行する前に、Agent が正常に動作しており、[Agent データの欠落を診断する手順](#no-data-is-show-after-configuring-database-monitoring)を実行していることを確認してください。

{{< tabs >}}
{{% tab "Postgres" %}}

| 考えられる原因                         | ソリューション                                  |
|----------------------------------------|-------------------------------------------|
| `pg_stat_statements` 拡張機能がインストールされていないか、正しいデータベースに読み込まれていない。 | この拡張機能は、Postgres コンフィギュレーションの `shared_preload_libraries` でインストールする必要があります (**注**: この変数を変更した後は、サーバーを再起動して変更を有効化してください)。 その後、Agent が接続するすべてのデータベースで `CREATE EXTENSION pg_stat_statements` を実行します。デフォルトでは、Agent は `postgres` データベースに接続します。セットアップでこの変数を設定するための詳細については、[セットアップ手順][1]を参照してください。 |
| `datadog` ユーザーにクエリの統計情報を収集する権限がない。 | `datadog` ユーザーに適切な権限を与えるには、データベースのバージョンに応じた[セットアップ手順][1]を参照してください。 |

`pg_stat_statements` がインストールされており、`datadog` ユーザーがアクセスできることを確認するために、`postgres` データベースに接続して `datadog` ユーザーとしてクエリを試行します。少なくとも 1 つの行が正常に返されるはずです。例えば、以下のようになります。

```bash
psql -h localhost -U datadog -d postgres -c "select * from pg_stat_statements LIMIT 1;"
```

Agent のコンフィギュレーションでデフォルト `postgres` 以外の `dbname` を指定した場合は、そのデータベースで `CREATE EXTENSION pg_stat_statements` を実行する必要があります。


[1]: /ja/database_monitoring/setup_postgres/
{{% /tab %}}
{{% tab "MySQL" %}}

| 考えられる原因                         | ソリューション                                  |
|----------------------------------------|-------------------------------------------|
| `performance_schema` が有効になっていない。 | `performance_schema` オプションは、MySQL ではデフォルトで有効になっていますが、コンフィギュレーションやクラウドプロバイダーによっては無効になっている場合があります。`performance_schema` を有効にするには、[セットアップ手順][1]に従ってください。 |
| ホストが Google Cloud SQL によって管理されており、`performance_schema` をサポートしていない。 | Google Cloud SQL の制限により、Datadog データベースモニタリングは[26GB 以下の RAM を持つインスタンスではサポートされません][2]。 | |


[1]: /ja/database_monitoring/setup_mysql/
[2]: https://cloud.google.com/sql/docs/mysql/flags#tips-performance-schema
{{% /tab %}}
{{< /tabs >}}

### 特定のクエリが見つからない

いくつかのクエリのデータはあるが、データベースモニタリングで特定のクエリやクエリセットを確認したい場合は、以下のガイドに従ってください。

{{< tabs >}}
{{% tab "Postgres" %}}

| 考えられる原因                         | ソリューション                                  |
|----------------------------------------|-------------------------------------------|
| Postgres 9.6 で Datadog ユーザーが実行したクエリのみが表示される。この場合、インスタンスのコンフィギュレーション設定が欠けている可能性があります。 | Postgres 9.6 上でインスタンスモニタリングを行う場合、Datadog Agent インスタンスのコンフィギュレーションは、初期設定ガイドで作成された関数に基づいた設定 `pg_stat_statements_view: datadog.pg_stat_statements()` および `pg_stat_activity_view: datadog.pg_stat_activity()` を使用する必要があります。これらの関数は、すべてのデータベースで作成する必要があります。 |
| クエリが「トップクエリ」ではなく、そのクエリの実行時間の合計が、選択した期間のどの時点においても正規化された上位 200 のクエリに含まれていない。 | クエリが「Other Queries」の行にまとめられている場合があります。どのクエリが追跡されるかの詳細については、[収集データ][1]を参照してください。追跡されるトップクエリの数を増やしたい場合は、Datadog サポートにお問い合わせください。 |
| クエリが SELECT、INSERT、UPDATE、DELETE のいずれでもない。 | 非ユーティリティ関数はデフォルトでは追跡されません。これらを収集するには、Postgres パラメーター `pg_stat_statements.track_utility` を `true` に設定します。詳細は [Postgres ドキュメント][2]を参照してください。 |
| クエリが関数やストアドプロシージャで実行されている。 | 関数やプロシージャで実行されたクエリを追跡するには、コンフィギュレーションパラメーター `pg_stat_statements.track` を `true` に設定します。詳細は [Postgres ドキュメント][2]を参照してください。 |
| Postgres のコンフィギュレーションパラメータ `pg_stat_statements.max` がワークロードに対して低すぎる可能性がある。 | 短時間に大量の正規化されたクエリが実行された場合 (10 秒で数千のユニークな正規化されたクエリを実行したなど)、`pg_stat_statements` 内のバッファではすべての正規化されたクエリを保持できない可能性があります。この値を増やすことで、追跡された正規化されたクエリのカバレッジを向上させ、生成された SQL からの高いチャーンの影響を減らすことができます。**注**: 順不同のカラム名を持つクエリや、可変長の配列を使用するクエリは、正規化されたクエリのチャーン率を大幅に増加させます。例えば、`pg_stat_statements` の中では、`SELECT ARRAY[1,2]` と `SELECT ARRAY[1,2,3]` は別々のクエリとして追跡されます。この設定の調整については、[高度なコンフィギュレーション][3]を参照してください。 |



[1]: /ja/database_monitoring/data_collected/#which-queries-are-tracked
[2]: https://www.postgresql.org/docs/current/pgstatstatements.html#id-1.11.7.38.8
[3]: /ja/database_monitoring/setup_postgres/advanced_configuration/TODO
{{% /tab %}}
{{% tab "MySQL" %}}

| 考えられる原因                         | ソリューション                                  |
|----------------------------------------|-------------------------------------------|
| クエリが「トップクエリ」ではなく、そのクエリの実行時間の合計が、選択した期間のどの時点においても正規化された上位 200 のクエリに含まれていない。 | クエリが「Other Queries」の行にまとめられている場合があります。どのクエリが追跡されるかの詳細については、[収集データ][1]を参照してください。追跡されるトップクエリの数を増やしたい場合は、Datadog サポートにお問い合わせください。 |
| `events_statements_summary_by_digest` が満杯の可能性がある。 | `performance_schema` の MySQL テーブル `events_statements_summary_by_digest` には、保存対象となるダイジェスト (正規化されたクエリ) の数に上限があります。メンテナンスタスクでこのテーブルを定期的にデータを削除することで、すべてのクエリが長期にわたって追跡されるようになります。詳しくは[高度なコンフィギュレーション][2]をご覧ください。 |



[1]: /ja/database_monitoring/data_collected/#which-queries-are-tracked
[2]: /ja/database_monitoring/setup_mysql/advanced_configuration/
{{% /tab %}}
{{< /tabs >}}


### クエリのバインドパラメータが表示されない

現時点では、クエリサンプルおよび実行計画における生のクエリバインドパラメータは難読化され、`?` に置き換えられます。将来的なリリースでは、難読化されていないクエリバインドパラメータを公開する設定を導入する予定です。


### クエリサンプルが切り捨てられる

長いクエリの場合、データベースのコンフィギュレーション上 SQL の全文が表示されないことがあります。お客様のワークロードに合わせて多少のチューニングが必要です。

{{< tabs >}}
{{% tab "Postgres" %}}

Postgres の設定 `track_activity_query_size` は、Postgres が保存し、Agent に対して表示する SQL 文の最大サイズを示します。デフォルトでは、この値は 1024 バイトです。この値を 4096 まで上げると、ほとんどのワークロードのクエリをキャプチャすることができます。しかし、クエリが非常に複雑であったり、非常に長い配列を使用する場合はより高い値が適切となる可能性があります。

例えば、以下のような項目数の多い配列を持つクエリは、データベースでは切り捨てられます。

```sql
SELECT DISTINCT address FROM customers WHERE id = ANY(ARRAY[11, 12, 13, … , 9999, 10000 ]) LIMIT 5
```

正規化されたクエリは、アプリ内で次のように表示されます。

```sql
SELECT DISTINCT address FROM customers WHERE id = ANY(ARRAY[ ?
```

これを避けるために、クエリの予想される最大のテキストサイズに対応できるよう、`track_activity_query_size` の設定値を大きくしてください。詳細は、[ランタイム統計についての Postgres ドキュメント][1]を参照してください。


[1]: https://www.postgresql.org/docs/current/runtime-config-statistics.html
{{% /tab %}}
{{% tab "MySQL" %}}

Datadog Agent から見える MySQL の SQL テキストの長さは、以下の[システム変数][1]によって決定されます。

```
max_digest_length=4096
performance_schema_max_digest_length=4096
performance_schema=4096
```

ワークロードの大半では、この値を 4096 に上げることでほとんどのクエリを取り込むことができますが、特に長く複雑なクエリの場合はより大きな値を設定する必要があります。

<!-- TODO: SQL テキストの最大長を取得するためのカスタムクエリレシピを追加 -->


[1]: https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_max_digest_length
{{% /tab %}}
{{< /tabs >}}

### クエリに実行計画が欠けている

一部またはすべてのクエリで計画が利用できない場合があります。これは、サポートされていないクエリコマンドである、クエリがサポートされていないクライアントアプリケーションせ生成された、Agent のバージョンが古い、データベースのセットアップが不完全であることなどが原因です。

{{< tabs >}}
{{% tab "Postgres" %}}

| 考えられる原因                         | ソリューション                                  |
|----------------------------------------|-------------------------------------------|
| Agent がサポートされていないバージョンで動作している。 | Agent のバージョンが 7.30.0 以上であることを確認してください。新機能、より良いパフォーマンス、およびセキュリティアップデートをご利用いただくために、定期的な Agent のアップデートをお勧めします。 |
| Agent が、データベースの `datadog` スキーマで必要な関数を実行できない。 | Agent がクエリを収集できる**すべてのデータベース**には関数 `datadog.explain_statement(...)` が必要です。この関数が[セットアップ手順][1]に従ってルートユーザーによって作成され、`datadog` ユーザーに実行権限が付与されていることを確認してください。 |
| クエリが切り捨てられる。 | クエリのサンプルテキストのサイズを大きくする方法については、[切り捨てられたクエリサンプル](#query-samples-are-truncated)のセクションを参照してください。 |
| クエリの実行に使用されるアプリケーションクライアントが、Postgres 拡張クエリプロトコルまたはプリペアドステートメントを使用している。 | Postgres の[拡張クエリプロトコル][2]を使用するクライアントアプリケーションの中には、解析されたクエリと生のバインドパラメータが分離されているため、実行計画の収集をサポートしていないものがあります。例えば、Go クライアント [sqlx][3] や Python クライアント [asyncpg][4] は拡張クエリプロトコルを使用しています。この制限を回避するには、アプリケーションを変更して、バインドパラメータを含む生の SQL クエリを送信するよう設定します。 |
| Agent インスタンスのコンフィギュレーション `ignore_databases` が無視するデータベース内にクエリが存在する。 | `postgres` データベースなどのデフォルトのデータベースは、`ignore_databases` 設定では無視されます。これらのデータベースのクエリにはサンプルや実行計画がありません。インスタンスコンフィギュレーションでの設定値と、[サンプルコンフィギュレーションファイル][5]のデフォルト値を確認してください。 |
| クエリが実行されない。 | BEGIN、COMMIT、SHOW、USE、ALTER などの一部のクエリでは、データベースから有効な実行計画を得ることができません。SELECT、UPDATE、INSERT、DELETE、REPLACE の各クエリのみが実行計画をサポートしています。 |
| クエリの実行頻度が比較的低い、または実行速度が非常に速い。 | このクエリはデータベースの総実行時間の中で大きな割合を占めていないため、選択のためにサンプリングされていない可能性があります。クエリをキャプチャするために、[サンプリングレートを上げる][6]ことを試みてください。 |




[1]: /ja/database_monitoring/setup_postgres/
[2]: https://www.postgresql.org/docs/current/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
[3]: https://pkg.go.dev/github.com/jmoiron/sqlx
[4]: https://github.com/MagicStack/asyncpg
[5]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[6]: /ja/database_monitoring/setup_postgres/advanced_configuration
{{% /tab %}}
{{% tab "MySQL" %}}

| 考えられる原因                         | ソリューション                                  |
|----------------------------------------|-------------------------------------------|
| Agent がサポートされていないバージョンで動作している。 | Agent のバージョンが 7.30.0 以上であることを確認してください。新機能、より良いパフォーマンス、およびセキュリティアップデートをご利用いただくために、定期的な Agent のアップデートをお勧めします。 |
| Agent が、データベースのこのスキーマで必要な関数を実行できない。 | Agent がサンプルを収集できる**すべてのスキーマ**には関数 `explain_statement(...)` が必要です。この関数が[セットアップ手順][1]に従ってルートユーザーによって作成され、`datadog` ユーザーに実行権限が付与されていることを確認してください。 |
| クエリが切り捨てられる。 | クエリのサンプルテキストのサイズを大きくする方法については、[切り捨てられたクエリサンプル](#query-samples-are-truncated)のセクションを参照してください。 |
| クエリが実行されない。 | BEGIN、COMMIT、SHOW、USE、ALTER などの一部のクエリでは、データベースから有効な実行計画を得ることができません。SELECT、UPDATE、INSERT、DELETE、REPLACE の各クエリのみが実行計画をサポートしています。 |
| クエリの実行頻度が比較的低い、または実行速度が非常に速い。 | このクエリはデータベースの総実行時間の中で大きな割合を占めていないため、選択のためにサンプリングされていない可能性があります。クエリをキャプチャするために、[サンプリングレートを上げる][2]ことを試みてください。 |

[1]: /ja/database_monitoring/setup_mysql/
[2]: /ja/database_monitoring/setup_mysql/advanced_configuration/
{{% /tab %}}
{{< /tabs >}}


## さらにサポートが必要ですか？

問題が解決しない場合は、[Datadog サポート][4]までお問い合わせください。







[1]: /ja/database_monitoring/#getting-started
[2]: /ja/agent/troubleshooting/
[3]: /ja/agent/guide/agent-log-files
[4]: /ja/help/