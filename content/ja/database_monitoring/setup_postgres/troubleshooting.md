---
description: Postgres のデータベースモニタリングセットアップのトラブルシューティング
kind: documentation
title: Postgres 用 DBM セットアップのトラブルシューティング
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">データベースモニタリングはこのサイトでサポートされていません。</div>
{{< /site-region >}}

このページでは、Postgres によるデータベースモニタリングのセットアップおよび使用に関する一般的な問題と、その解決方法について詳しく説明します。Datadog では、Agent のバージョンリリースにより内容が変更となる可能性があるため、最新の安定した Agent バージョンを使用し、最新の[セットアップドキュメント][1]に従っていただくことをお勧めします。

## 一般的な問題の診断

### データベースモニタリングを構成してもデータが表示されない

[セットアップ手順][1]に従って Agent を構成してもデータが表示されない場合は、Agent のコンフィギュレーションまたは API キーに問題がある可能性があります。[トラブルシューティングガイド][2]に従って、Agent からデータを受信していることを確認してください。

システムメトリクスなどの他のデータは受信しているが、データベースモニタリングのデータ (クエリメトリクスやクエリサンプルなど) を受信していない場合、Agent またはデータベースのコンフィギュレーションに問題がある可能性があります。Agent のコンフィギュレーションが[セットアップ手順][1]の例と同様であることを確認し、コンフィギュレーションファイルの場所を再確認してください。

デバッグを行うには、まず[Agent のステータスコマンド][3]を実行して、収集されたデータや Datadog に送信されたデータのデバッグ情報を収集します。

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
### クエリメトリクスが見つからない

クエリメトリクスデータの欠落を診断する手順を実行する前に、Agent が正常に動作しており、[Agent データの欠落を診断する手順](#no-data-is-show-after-configuring-database-monitoring)を実行していることを確認してください。クエリメトリクスが見つからない場合、以下のような原因が考えられます。

#### pg_stat_statements 拡張機能がロードされていない {#pg-stat-statements-not-loaded}
`pg_stat_statements` 拡張機能がロードされていません。この拡張機能は、Postgres の構成にある `shared_preload_libraries` によってロードする必要があります (**注**: この変数を変更した後、有効にするにはサーバーの再起動が必要です)。拡張機能のロード方法に関する詳細は、[設定方法][1]を参照してください。

#### pg_stat_statements 拡張機能がデータベースに作成されていない {#pg-stat-statements-not-created}
`pg_stat_statements` 拡張機能が正しいデータベースにインストールされていません。Agent が接続するすべてのデータベースで `CREATE EXTENSION pg_stat_statements` を実行する必要があります。デフォルトでは、Agent は `postgres` データベースに接続します。この変数の設定に関する詳細は、[設定方法][1]を参照してください。

`pg_stat_statements` がインストールされており、`datadog` ユーザーがアクセスできることを確認するために、`postgres` データベースに接続して `datadog` ユーザーとしてクエリを試行します。少なくとも 1 つの行が正常に返されるはずです。例えば、以下のようになります。

```bash
psql -h localhost -U datadog -d postgres -c "select * from pg_stat_statements LIMIT 1;"
```

Agent のコンフィギュレーションでデフォルト `postgres` 以外の `dbname` を指定した場合は、そのデータベースで `CREATE EXTENSION pg_stat_statements` を実行する必要があります。

ターゲットデータベースで拡張機能を作成してもこの警告が表示される場合は、拡張機能が `datadog` ユーザーがアクセスできないスキーマで作成された可能性があります。これを確認するには、このコマンドを実行して `pg_stat_statements` がどのスキーマで作成されたかを確認します。

```bash
psql -h localhost -U datadog -d postgres -c "select nspname from pg_extension, pg_namespace where extname = 'pg_stat_statements' and pg_extension.extnamespace = pg_namespace.oid;"
```

次に、このコマンドを実行して、`datadog` ユーザーがどのスキーマを見ることができるかを確認します。

```bash
psql -h localhost -U datadog -d <your_database> -c "show search_path;"
```

もし、`pg_stat_statements` スキーマが `datadog` ユーザーの `search_path` にない場合は、`datadog` ユーザーに追加する必要があります。例:

```sql
ALTER ROLE datadog SET search_path = "$user",public,schema_with_pg_stat_statements;
```

### 特定のクエリが見つからない

いくつかのクエリからデータを取得したが、データベースモニタリングで特定のクエリまたはクエリのセットが表示されない場合は、次のガイドに従ってください。
| 考えられる原因                         | 解決方法                                  |
|----------------------------------------|-------------------------------------------|
| Postgres 9.6 の場合、datadog ユーザーが実行したクエリのみが表示される場合は、インスタンス構成にいくつかの設定が欠けている可能性があります。| Postgres 9.6 でインスタンスを監視する場合、Datadog Agent のインスタンス構成は、初期セットアップガイドで作成した関数に基づいて、`pg_stat_statements_view: datadog.pg_stat_statements()` と `pg_stat_activity_view: datadog.pg_stat_activity()` 設定を使用しなければなりません。これらの関数は、すべてのデータベースで作成する必要があります。 |
| このクエリは「上位クエリ」ではなく、選択した時間枠のどの時点でも、総実行時間の合計が正規化された上位 200 クエリに含まれていないことを意味します。| このクエリは、"Other Queries" の行にグループ化されている可能性があります。どのクエリを追跡するかについては、[収集されたデータ][5]を参照してください。追跡される上位クエリの数は、Datadog サポートに連絡することで上げることができます。 |
| SELECT、INSERT、UPDATE、または DELETE クエリではありません。| 非ユーティリティ関数は、デフォルトでは追跡されません。それらを収集するには、Postgres のパラメーター `pg_stat_statements.track_utility` を `true` に設定します。詳細は [Postgres のドキュメント][6]を参照してください。 |
| クエリが関数またはストアドプロシージャ内で実行されています。| 関数やプロシージャで実行されたクエリを追跡するには、構成パラメーター `pg_stat_statements.track` を `true` に設定します。詳しくは、[Postgres のドキュメント][6]を参照してください。 |
| Postgres の構成パラメーター `pg_stat_statements.max` が作業量に対して低すぎる可能性があります。| 短時間に大量の正規化クエリを実行した場合 (10 秒間に数千の一意の正規化クエリ)、`pg_stat_statements` のバッファはすべての正規化クエリを保持できない可能性があります。この値を増やすと、追跡された正規化クエリのカバレッジが向上し、生成された SQL の高破棄率による影響を軽減することができます。**注**: 列名が順不同のクエリや可変長の ARRAY を使用したクエリは、正規化クエリの破棄率を大幅に増加させる可能性があります。例えば、`SELECT ARRAY[1,2]` と `SELECT ARRAY[1,2,3]` は `pg_stat_statements` では別のクエリとして追跡されます。この設定のチューニングについては、[高度な構成][7]を参照してください。 |
| Agent が最後に再起動してから、クエリが一度だけ実行されました。| Agent が再起動して以来、10 秒間隔で 2 回以上実行された後にのみ、クエリメトリクスが発行されます。 |

### クエリサンプルが切り捨てられる

長いクエリの場合、データベースのコンフィギュレーション上 SQL の全文が表示されないことがあります。お客様のワークロードに合わせて多少のチューニングが必要です。

Postgres の設定 `track_activity_query_size` は、Postgres が保存し、Agent に対して表示する SQL 文の最大サイズを示します。デフォルトでは、この値は 1024 バイトです。この値を 4096 まで上げると、ほとんどのワークロードのクエリをキャプチャすることができます。しかし、クエリが複雑であったり、長い配列を使用する場合はより高い値が適切となる可能性があります。

例えば、以下のような項目数の多い配列を持つクエリは、データベースでは切り捨てられます。

```sql
SELECT DISTINCT address FROM customers WHERE id = ANY(ARRAY[11, 12, 13, ... , 9999, 10000 ]) LIMIT 5
```

正規化されたクエリは、アプリ内で次のように表示されます。

```sql
SELECT DISTINCT address FROM customers WHERE id = ANY(ARRAY[ ?
```

これを避けるために、クエリの予想される最大のテキストサイズに対応できるよう、`track_activity_query_size` の設定値を大きくしてください。詳細は、[ランタイム統計][8]についての Postgres ドキュメントを参照してください。

### クエリに実行計画が欠けている

一部またはすべてのクエリで計画が利用できない場合があります。これは、サポートされていないクエリコマンドである、クエリがサポートされていないクライアントアプリケーションせ生成された、Agent のバージョンが古い、データベースのセットアップが不完全であることなどが原因です。以下は、実行計画の欠落の原因として考えられるものです。

#### 実行関数の欠落 {#undefined-explain-function}

問題: Agent が、データベースの `datadog` スキーマで必要な関数を実行できない。

解決方法: Agent は、`datadog.explain_statement(...)` 関数が、Agent がクエリを収集できる**すべてのデータベース**に存在することを必要とします。

Agent が実行計画を収集できるように、**すべてのデータベース**に関数を作成します。

```SQL
CREATE OR REPLACE FUNCTION datadog.explain_statement(
   l_query TEXT,
   OUT explain JSON
)
RETURNS SETOF JSON AS
$$
DECLARE
curs REFCURSOR;
plan JSON;

BEGIN
   OPEN curs FOR EXECUTE pg_catalog.concat('EXPLAIN (FORMAT JSON) ', l_query);
   FETCH curs INTO plan;
   CLOSE curs;
   RETURN QUERY SELECT plan;
END;
$$
LANGUAGE 'plpgsql'
RETURNS NULL ON NULL INPUT
SECURITY DEFINER;
```
#### Agent がサポートされていないバージョンで動作している
Agent のバージョンが 7.36.1 以上であることを確認してください。Datadog では、新機能、より良いパフォーマンス、およびセキュリティアップデートをご利用いただくために、定期的な Agent のアップデートをお勧めします。

#### クエリが切り捨てられる。
クエリのサンプルテキストのサイズを大きくする方法については、[切り捨てられたクエリサンプル](#query-samples-are-truncated)のセクションを参照してください。

#### Postgres 拡張クエリプロトコル

クライアントが Postgres [拡張クエリプロトコル][9]またはプリペアドステートメントを使用している場合、パースされたクエリと生のバインドパラメーターが分離されているため、Datadog Agent は説明プランを収集することができません。クライアントがシンプルクエリプロトコルを強制的に使用するオプションを提供している場合、それをオンにすることで Datadog Agent が実行プランを収集できるようになります。

| 言語 | クライアント | シンプルクエリプロトコルの構成|
|----------|--------|----------------------------------------|
| Go       | [pgx][10] | `PreferSimpleProtocol` を設定して、シンプルなクエリプロトコルに切り替えます ([ConnConfig のドキュメント][11]を参照)。また、`Query` または `Exec` 呼び出しの最初の引数として [QuerySimpleProtocol][24] フラグを使って、クエリまたは呼び出しごとに適用することが可能です。
| Java     | [Postgres JDBC クライアント][12] | `preferQueryMode = simple` と設定すると、シンプルクエリプロトコルに切り替わります ([PreferQueryMode のドキュメント][13]を参照してください)。 |
| Python   | [asyncpg][14]              | 無効化できない拡張クエリプロトコルを使用します。プリペアドステートメントを無効にしても、問題は解決しません。 実行計画の収集を可能にするには、SQL クエリを DB クライアントに渡す前に [psycopg sql][15] (または SQL 値を適切にエスケープする他の同等の SQL フォーマッタ) を使ってフォーマットしてください。                                                  |
| Python   | [psycopg][16]             | `psycopg2` は拡張クエリプロトコルを使用しないので、実行計画は問題なく収集されるはずです。<br/> `psycopg3` はデフォルトで拡張クエリプロトコルを使用し、無効にすることはできません。プリペアドステートメントを無効にしても、問題は解決しません。実行計画の収集を有効にするには、DB クライアントに渡す前に [psycopg sql][15] を使って SQL クエリをフォーマットしてください。 |
| Node     | [node-postgres][17]       | 拡張クエリプロトコルを使用するため、無効化することはできません。Datadog Agent が実行計画を収集できるようにするには、[pg-format][18] を使用して、SQL クエリを [node-postgres][17] に渡す前にフォーマットしてください。|

#### クエリが Agent インスタンスの構成で無視されるデータベースにある
Agent インスタンスのコンフィギュレーション `ignore_databases` が無視するデータベース内にクエリが存在します。`rdsadmin` や `azure_maintenance` データベースなどのデフォルトのデータベースは、`ignore_databases` 設定では無視されます。これらのデータベースのクエリにはサンプルや実行計画がありません。インスタンスコンフィギュレーションでの設定値と、[サンプルコンフィギュレーションファイル][19]のデフォルト値を確認してください。

**注:** Agent バージョン <7.41.0 では、`postgres` データベースもデフォルトで無視されます。

#### クエリが実行されない
BEGIN、COMMIT、SHOW、USE、ALTER などの一部のクエリでは、データベースから有効な実行計画を得ることができません。SELECT、UPDATE、INSERT、DELETE、REPLACE の各クエリのみが実行計画をサポートしています。

#### クエリの実行頻度が比較的低い、または実行速度が速い。
このクエリはデータベースの総実行時間の中で大きな割合を占めていないため、選択のためにサンプリングされていない可能性があります。クエリをキャプチャするために、[サンプリングレートを上げる][23]ことを試みてください。


#### アプリケーションは、どのスキーマに問い合わせるかを指定するために、検索パスに依存している
Postgres は、[`pg_stat_activity`][21] で現在の[検索パス][20]を公開しないため、Datadog Agent は、アクティブな Postgres プロセスで使用されている検索パスを確認することができません。この制限を回避するには、Postgres インテグレーションで定義されたユーザーの検索パスを変更して、スキーマを含めるようにします。
```sql
ALTER ROLE datadog SET search_path = "$user",public,schema1,schema2,etc;
```

### `create extension pg_stat_statements` のセットアップの失敗

`create extension pg_stat_statements` からの出力エラー例:
```
create extension pg_stat_statements;
ERROR:  could not open extension control file "<path>/share/postgresql/extension/pg_stat_statements.control": No such file or directory
SQL State: 58P01
```

このエラーは、`pg_stat_statements` 拡張機能を含む `postgresql-contrib` パッケージがない場合に発生します。不足パッケージのインストール方法は、ホストの分布および Postgres のバージョンにより異なります。一例として、Ubuntu で Postgres 10 の `contrib` パッケージをインストールするには、以下を実行します。

```
sudo apt-get install postgresql-contrib-10
```

詳細については、[Postgres `contrib` ドキュメント][22]の適切なバージョンを参照してください。

### Agent からのクエリが遅い、またはデータベースへの影響が大きい

データベースモニタリングのデフォルトの Agent コンフィギュレーションは保守的ですが、収集間隔やクエリのサンプリングレートなどの設定を調整することで、よりニーズに合ったものにすることができます。ワークロードの大半において、Agent はデータベース上のクエリ実行時間の 1 % 未満、および CPU の 1 % 未満を占めています。Agent クエリがより多くのリソースを必要とする理由として、以下が考えられます。

#### `pg_stat_statements.max` の値が大きい {#high-pg-stat-statements-max-configuration}
`pg_stat_statements.max` の推奨値は `10000` です。この構成を高い値に設定すると、収集クエリの実行に時間がかかり、クエリのタイムアウトやクエリメトリクスの収集のギャップにつながる可能性があります。Agent がこの警告を表示した場合は、データベースで `pg_stat_statements.max` が `10000` に設定されていることを確認します。


[1]: /ja/database_monitoring/setup_postgres/
[2]: /ja/agent/troubleshooting/
[3]: /ja/agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
[4]: /ja/agent/guide/agent-log-files
[5]: /ja/database_monitoring/data_collected/#which-queries-are-tracked
[6]: https://www.postgresql.org/docs/current/pgstatstatements.html#id-1.11.7.38.8
[7]: /ja/database_monitoring/setup_postgres/advanced_configuration
[8]: https://www.postgresql.org/docs/current/runtime-config-statistics.html
[9]: https://www.postgresql.org/docs/current/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
[10]: https://github.com/jackc/pgx
[11]: https://pkg.go.dev/github.com/jackc/pgx#ConnConfig
[12]: https://jdbc.postgresql.org/documentation/head/connect.html
[13]: https://jdbc.postgresql.org/documentation/publicapi/org/postgresql/jdbc/PreferQueryMode.html
[14]: https://github.com/MagicStack/asyncpg
[15]: https://www.psycopg.org/docs/sql.html
[16]: https://www.psycopg.org/
[17]: https://node-postgres.com/
[18]: https://www.npmjs.com/package/pg-format
[19]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[20]: https://www.postgresql.org/docs/14/ddl-schemas.html#DDL-SCHEMAS-PATH
[21]: https://www.postgresql.org/docs/14/monitoring-stats.html#MONITORING-PG-STAT-ACTIVITY-VIEW
[22]: https://www.postgresql.org/docs/12/contrib.html
[23]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example#L281
[24]: https://pkg.go.dev/github.com/jackc/pgx/v4#QuerySimpleProtocol