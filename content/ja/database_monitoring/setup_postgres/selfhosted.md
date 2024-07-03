---
description: Install and configure Database Monitoring for self-hosted Postgres.
further_reading:
- link: /integrations/postgres/
  tag: Documentation
  text: Basic Postgres Integration
title: Setting Up Database Monitoring for self hosted Postgres
---

データベースモニタリングは、クエリメトリクス、クエリサンプル、実行計画、データベースの状態、フェイルオーバー、イベントを公開することで、Postgres データベースを詳細に可視化します。

Agent は、読み取り専用のユーザーとしてログインすることでデータベースから直接テレメトリーを収集します。Postgres データベースでデータベースモニタリングを有効にするには、以下の設定を行ってください。

1. [データベースのパラメーターを構成する](#configure-postgres-settings)
1. [Agent にデータベースへのアクセスを付与する](#grant-the-agent-access)
1. [Agent をインストールする](#install-the-agent)

## はじめに

サポート対象の PostgreSQL バージョン
: 9.6、10、11、12、13、14、15、16

前提条件
: Postgres の追加提供モジュールがインストールされている必要があります。ほとんどのインストールでは、これはデフォルトで含まれていますが、あまり一般的でないインストールでは、お使いのバージョンの [`postgresql-contrib` パッケージ][1]の追加インストールが必要になる場合があります。

サポート対象の Agent バージョン
: 7.36.1+

パフォーマンスへの影響
: データベースモニタリングのデフォルトの Agent コンフィギュレーションは保守的ですが、収集間隔やクエリのサンプリングレートなどの設定を調整することで、よりニーズに合ったものにすることができます。ワークロードの大半において、Agent はデータベース上のクエリ実行時間の 1 % 未満、および CPU の 1 % 未満を占めています。<br/><br/>
データベースモニタリングは、ベースとなる Agent 上のインテグレーションとして動作します ([ベンチマークを参照][2]してください)。

プロキシ、ロードバランサー、コネクションプーラー
: Datadog Agent は、監視対象のホストに直接接続する必要があります。セルフホスト型のデータベースの場合は、`127.0.0.1` またはソケットが推奨されます。Agent は、プロキシ、ロードバランサー、または `pgbouncer` などのコネクションプーラーを介してデータベースに接続すべきではありません。Agent が実行中に異なるホストに接続すると (フェイルオーバーやロードバランシングなどの場合)、Agent は 2 つのホスト間で統計情報の差を計算し、不正確なメトリクスを生成します。

データセキュリティへの配慮
: Agent がお客様のデータベースからどのようなデータを収集するか、またそのデータの安全性をどのように確保しているかについては、[機密情報][3]を参照してください。

## Postgres 設定を構成する

`postgresql.conf` に以下の[パラメーター][4]を構成し、**サーバーを再起動**すると設定が有効になります。これらのパラメーターの詳細については、[Postgres ドキュメント][5]を参照してください。

| パラメーター | 値 | 説明 |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | `postgresql.queries.*` メトリクスに対して必要です。[pg_stat_statements][5] 拡張機能を使用して、クエリメトリクスの収集を可能にします。 |
| `track_activity_query_size` | `4096` | より大きなクエリを収集するために必要です。`pg_stat_activity` の SQL テキストのサイズを拡大します。 デフォルト値のままだと、`1024` 文字を超えるクエリは収集されません。 |
| `pg_stat_statements.track` | `ALL` | オプションです。ストアドプロシージャや関数内のステートメントを追跡することができます。 |
| `pg_stat_statements.max` | `10000` | オプションです。`pg_stat_statements` で追跡する正規化されたクエリの数を増やします。この設定は、多くの異なるクライアントからさまざまな種類のクエリが送信される大容量のデータベースに推奨されます。 |
| `pg_stat_statements.track_utility` | `off` | オプション。PREPARE や EXPLAIN といったユーティリティコマンドを無効にします。この値を `off` に設定すると、SELECT、UPDATE、DELETE のようなクエリのみが追跡されます。 |
| `track_io_timing` | `on` | オプション。クエリのブロックの読み取りおよび書き込み時間の収集を有効にします。 |

## Agent にアクセスを付与する

Datadog Agent が統計やクエリを収集するためには、データベース サーバーへの読み取り専用のアクセスが必要となります。

Postgres が複製されている場合、以下の SQL コマンドはクラスター内の**プライマリ**データベースサーバー (ライター) で実行する必要があります。Agent が接続するデータベースサーバー上の PostgreSQL データベースを選択します。Agent は、どのデータベースに接続してもデータベースサーバー上のすべてのデータベースからテレメトリーを収集することができるため、デフォルトの `postgres` データベースを使用することをお勧めします。[そのデータベースに対して、固有のデータに対するカスタムクエリ]を Agentで実行する必要がある場合のみ別のデータベースを選択してください[6]。

選択したデータベースに、スーパーユーザー (または十分な権限を持つ他のユーザー) として接続します。例えば、選択したデータベースが `postgres` である場合は、次のように実行して [psql][7] を使用する `postgres` ユーザーとして接続します。

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

`datadog` ユーザーを作成します。

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

{{< tabs >}}

{{% tab "Postgres ≥ 15" %}}

Give the `datadog` user permission to relevant tables:

```SQL
ALTER ROLE datadog INHERIT;
```

**すべてのデータベース**に以下のスキーマを作成します。

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}

{{% tab "Postgres ≥ 10" %}}

**すべてのデータベース**に以下のスキーマを作成します。

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

**すべてのデータベース**に以下のスキーマを作成します。

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT SELECT ON pg_stat_database TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

**すべてのデータベース**に関数を作成して、Agent が `pg_stat_activity` および `pg_stat_statements` の全コンテンツを読み込めるようにします。

```SQL
CREATE OR REPLACE FUNCTION datadog.pg_stat_activity() RETURNS SETOF pg_stat_activity AS
  $$ SELECT * FROM pg_catalog.pg_stat_activity; $$
LANGUAGE sql
SECURITY DEFINER;
CREATE OR REPLACE FUNCTION datadog.pg_stat_statements() RETURNS SETOF pg_stat_statements AS
    $$ SELECT * FROM pg_stat_statements; $$
LANGUAGE sql
SECURITY DEFINER;
```

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">追加のテーブルをクエリする必要があるデータ収集またはカスタムメトリクスの場合は、それらのテーブルの <code>SELECT</code> 権限を <code>datadog</code> ユーザーに付与する必要があるかもしれません。例: <code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code> 詳細は <a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">PostgreSQL カスタムメトリクスの収集</a>を参照してください。</div>

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

### 検証する

権限が正しいことを確認するために、以下のコマンドを実行して、Agent ユーザーがデータベースに接続してコアテーブルを読み取ることができることを確認します。

{{< tabs >}}
{{% tab "Postgres ≥ 10" %}}

```shell
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```
{{% /tab %}}
{{% tab "Postgres 9.6" %}}

```shell
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

{{% /tab %}}
{{< /tabs >}}

パスワードの入力を求められた場合は、`datadog` ユーザーを作成したときに入力したパスワードを使用してください。

## Agent のインストール

Datadog Agent をインストールすると、Postgres でのデータベースモニタリングに必要な Postgres チェックもインストールされます。Postgres データベースホストの Agent をまだインストールしていない場合は、[Agent のインストール手順][8]を参照してください。

1. Agent の `conf.d/postgres.d/conf.yaml` ファイルを編集して、`host` / `port` を指定し、監視するホストを設定します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル postgres.d/conf.yaml][9] を参照してください。

{{< tabs >}}
{{% tab "Postgres ≥ 10" %}}

   ```yaml
   init_config:
   instances:
     - dbm: true
       host: localhost
       port: 5432
       username: datadog
       password: '<PASSWORD>'
       ## オプション: `custom_queries` に必要な場合は、別のデータベースに接続します
       # dbname: '<DB_NAME>'
   ```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

   ```yaml
   init_config:
   instances:
     - dbm: true
       host: localhost
       port: 5432
       username: datadog
       password: '<PASSWORD>'
       pg_stat_statements_view: datadog.pg_stat_statements()
       pg_stat_activity_view: datadog.pg_stat_activity()
       ## オプション: `custom_queries` に必要な場合は、別のデータベースに接続します
       # dbname: '<DB_NAME>'
   ```

{{% /tab %}}
{{< /tabs >}}

2. [Agent を再起動します][10]。

### ログの収集 (オプション)

PostgreSQL のデフォルトのログは `stderr` に記録され、ログに詳細な情報は含まれません。ログ行のプレフィックスに指定された詳細を追加してファイルに記録することをお勧めします。詳細については、このトピックに関する PostgreSQL [ドキュメント][11]を参照してください。

1. ロギングはファイル `/etc/postgresql/<バージョン>/main/postgresql.conf` 内で構成されます。ステートメント出力を含む通常のログ結果の場合、ログセクションの次のパラメーターのコメントを外します。
   ```conf
     logging_collector = on
     log_directory = 'pg_log'  # directory where log files are written,
                               # can be absolute or relative to PGDATA
     log_filename = 'pg.log'   # log file name, can include pattern
     log_statement = 'all'     # log all queries
     #log_duration = on
     log_line_prefix= '%m [%p] %d %a %u %h %c '
     log_file_mode = 0644
     ## For Windows
     #log_destination = 'eventlog'
   ```
2. 詳細な期間メトリクスを収集し、Datadog インターフェースで検索可能にするには、ステートメント自体を使用してインラインで構成する必要があります。上記の例と推奨コンフィギュレーションとの違いについては、以下を参照してください。また、`log_statement` オプションと `log_duration` オプションの両方がコメントアウトされているので注意してください。このトピックに関する議論は[こちら][12]をご覧ください。

   この構成はすべてのステートメントをログしますが、出力を特定の期間を持つものに減らすには、`log_min_duration_statement` の値を目的の最小期間（ミリ秒単位）に設定します（完全な SQL ステートメントのログ記録が組織のプライバシー要件に準拠していることを確認してください）。
   ```conf
     log_min_duration_statement = 0    # -1 is disabled, 0 logs all statements
                                       # and their durations, > 0 logs only
                                       # statements running at least this number
                                       # of milliseconds
     #log_statement = 'all'
     #log_duration = on
   ```
3. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。
   ```yaml
   logs_enabled: true
   ```
4. PostgreSQL のログの収集を開始するには、次の構成ブロックを `conf.d/postgres.d/conf.yaml` ファイルに追加し、編集します。
   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: postgresql
       service: "<SERVICE_NAME>"
       #To handle multi line that starts with yyyy-mm-dd use the following pattern
       #log_processing_rules:
       #  - type: multi_line
       #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
       #    name: new_log_start_with_date
   ```
   `service` パラメーターと `path` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべての構成オプションの詳細については、[サンプル postgres.d/conf.yaml][9] を参照してください。
5. [Agent を再起動します][10]。

### UpdateAzureIntegration

[Agent の status サブコマンドを実行][13]し、Checks セクションで `postgres` を探します。または、[データベース][14]のページを参照してください。

## Agent の構成例
{{% dbm-postgres-agent-config-examples %}}

## トラブルシューティング

インテグレーションと Agent を手順通りにインストール・設定しても期待通りに動作しない場合は、[トラブルシューティング][15]を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.postgresql.org/docs/12/contrib.html
[2]: /ja/database_monitoring/agent_integration_overhead/?tab=postgres
[3]: /ja/database_monitoring/data_collected/#sensitive-information
[4]: https://www.postgresql.org/docs/current/config-setting.html
[5]: https://www.postgresql.org/docs/current/pgstatstatements.html
[6]: /ja/integrations/faq/postgres-custom-metric-collection-explained/
[7]: https://www.postgresql.org/docs/current/app-psql.html
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[10]: /ja/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[11]: https://www.postgresql.org/docs/11/runtime-config-logging.html
[12]: https://www.postgresql.org/message-id/20100210180532.GA20138@depesz.com
[13]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[14]: https://app.datadoghq.com/databases
[15]: /ja/database_monitoring/troubleshooting/?tab=postgres