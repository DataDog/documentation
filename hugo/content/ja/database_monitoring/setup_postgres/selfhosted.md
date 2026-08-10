---
description: セルフホストの Postgres の Database Monitoring をインストールして構成します。
further_reading:
- link: /integrations/postgres/
  tag: よくあるご質問
  text: Postgres インテグレーションの基本
- link: /database_monitoring/guide/parameterized_queries/
  tag: よくあるご質問
  text: SQL クエリパラメーター値のキャプチャ
- link: https://www.datadoghq.com/blog/database-monitoring-explain-analyze
  tag: ブログ
  text: Datadog Database Monitoring で EXPLAIN ANALYZE を使用して PostgreSQL クエリのレイテンシーを迅速にデバッグする
title: セルフホストの Postgres の Database Monitoring の設定
---
Database Monitoring は、クエリメトリクス、クエリサンプル、実行計画、データベースの状態、フェイルオーバー、イベントを公開することで、Postgres データベースを詳細に可視化します。

読み取り専用ユーザーとしてログインし、Agent でデータベースから直接テレメトリを収集します。Postgres データベースで Database Monitoring を有効にするには、以下のセットアップを実行します。

1. [データベースパラメーターを構成する](#configure-postgres-settings)
1. [Agent にデータベースへのアクセス権を付与する](#grant-the-agent-access)
1. [Agent をインストールする](#install-the-agent)

## はじめに {#before-you-begin}

サポート対象の PostgreSQL バージョン
: 9.6、10、11、12、13、14、15、16、17、18

前提条件
: Postgres の追加提供モジュールがインストールされている必要があります。ほとんどのインストールでは、これはデフォルトで含まれていますが、あまり一般的でないインストールでは、お使いのバージョンの [`postgresql-contrib` パッケージ][1] の追加インストールが必要になる場合があります。

サポート対象の Agent バージョン
: 7.36.1 以上

パフォーマンスへの影響
: Database Monitoring のデフォルトの Agent 構成は保守的ですが、収集間隔やクエリのサンプリングレートなどの設定を調整することで、よりニーズに合ったものにすることができます。大半のワークロードで、Agent はデータベース上のクエリ実行時間の 1 % 未満、および CPU の 1 % 未満を占めています。<br/><br/>
Database Monitoring は、ベースとなる Agent 上のインテグレーションとして動作します ([ベンチマークを参照][2])。

プロキシ、ロードバランサー、コネクションプーラー
: Datadog Agent は、モニター対象のホストに直接接続する必要があります。セルフホスト型のデータベースの場合は、`127.0.0.1` またはソケットを使用してください。Agent は、プロキシ、ロードバランサー、または `pgbouncer` のようなコネクションプーラーを介してデータベースに接続してはなりません。Agent が実行中に異なるホストに接続すると (フェイルオーバーやロードバランシングなどの場合)、Agent は 2 つのホスト間で統計情報の差を計算し、不正確なメトリクスを生成します。

データセキュリティへの配慮
: Agent がお客様のデータベースからどのようなデータを収集するか、またそのデータの安全性をどのように確保しているかについては、[機密情報][3] を参照してください。

## Postgres 設定を構成する {#configure-postgres-settings}

`postgresql.conf` ファイルに以下の[パラメーター][4] を構成し、**サーバーを再起動**すると設定が有効になります。これらのパラメーターの詳細については、[Postgres ドキュメント][5] を参照してください。

**必須パラメーター**

| パラメーター | 値 | 説明 |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | `postgresql.queries.*` メトリクスで必要です。[pg_stat_statements][5] 拡張機能を使用して、クエリメトリクスの収集を可能にします。|
| `track_activity_query_size` | `4096` | より大きなクエリを収集するために必要です。`pg_stat_activity` の SQL テキストのサイズを拡大します。デフォルト値のままにした場合、`1024` 文字を超えるクエリは収集されません。|

**オプションパラメーター**

| パラメーター | 値 | 説明 |
| --- | --- | --- |
| `pg_stat_statements.track` | `ALL` | ストアドプロシージャや関数内のステートメントを追跡することができます。|
| `pg_stat_statements.max` | `10000` | `pg_stat_statements` で追跡する正規化されたクエリの数を増やします。多くの異なるクライアントからさまざまな種類のクエリが送信される大容量のデータベースに推奨されます。|
| `pg_stat_statements.track_utility` | `off` | PREPARE や EXPLAIN といったユーティリティコマンドを無効にします。この値を `off` に設定すると、SELECT、UPDATE、DELETE のようなクエリのみが追跡されます。|
| `track_io_timing` | `on` | クエリのブロックの読み取りおよび書き込み時間の収集を有効にします。|

## Agent にアクセスを付与する {#grant-the-agent-access}

Datadog Agent が統計やクエリを収集するためには、データベースサーバーへの読み取り専用のアクセスが必要となります。

Postgres が複製されている場合、以下の SQL コマンドはクラスター内の**プライマリ**データベースサーバー (ライター) で実行します。Agent は、接続しているデータベースにかかわらず、サーバー上のすべてのデータベースからテレメトリを収集できます。Agent で [別のデータベースに固有のデータに対するカスタムクエリ][6] を実行する必要がない限り、デフォルトの `postgres` データベースを使用してください。

選択したデータベースに、スーパーユーザー (または十分な権限を持つほかのユーザー) として接続します。たとえば、[psql][7] を使用して `postgres` データベースに接続するには、次のようにします。

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

`datadog` ユーザーを作成します。

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

{{< tabs >}}

{{% tab "Postgres 15 以上" %}}

`datadog` ユーザーに関連テーブルへの権限を付与します。

```SQL
ALTER ROLE datadog INHERIT;
```

**すべてのデータベースに**以下のスキーマを作成します。

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}

{{% tab "Postgres 10 以上" %}}

**すべてのデータベースに**以下のスキーマを作成します。

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

**すべてのデータベースに**以下のスキーマを作成します。

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT SELECT ON pg_stat_database TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

**すべてのデータベースに**関数を作成して、Agent が `pg_stat_activity` および `pg_stat_statements` の全コンテンツを読み込めるようにします。

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

<div class="alert alert-info">追加のテーブルをクエリする必要があるデータ収集または Custom Metrics の場合は、それらのテーブルの <code>SELECT</code> 権限を <code>datadog</code> ユーザーに付与する必要がある場合があります。例:<code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code>詳細については、<a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">PostgreSQL Custom Metrics の収集</a>を参照してください。</div>

### 実行計画関数を作成する {#create-the-explain-plan-function}

Agent が実行計画を収集できるように、**すべてのデータベース**に次の関数を作成します。

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
   SET TRANSACTION READ ONLY;

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

### パスワードを安全に保管する {#securely-store-your-password}
{{% dbm-secret %}}

### データベースの権限を確認する {#verify-database-permissions}

権限が正しく設定されていることを確認するために、次のコマンドを実行して、Agent ユーザーがデータベースに接続してコアテーブルを読み取れることを確認します。

{{< tabs >}}
{{% tab "Postgres 10 以上" %}}

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
  -c "select * from datadog.pg_stat_activity() limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from datadog.pg_stat_statements() limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

{{% /tab %}}
{{< /tabs >}}

パスワードの入力を求められた場合は、`datadog` ユーザーを作成したときに入力したパスワードを使用してください。

## Agent をインストールする {#install-the-agent}

Datadog Agent をインストールすると、Postgres での Database Monitoring に必要な Postgres チェックもインストールされます。
Agent をまだインストールしていない場合は、[Agent のインストール手順][8] を参照してください。そこに記載されている、インストール手順に従います。

モニターする Postgres インスタンスを指すように、Agent の `conf.d/postgres.d/conf.yaml` ファイルを編集します。すべての構成オプションの一覧は、[サンプル postgres.d/conf.yaml][9] を参照してください。

```yaml
init_config:
instances:
 - dbm: true
   host: localhost
   port: 5432
   username: datadog
   password: 'ENC[datadog_user_database_password]'

  ## Optional: Connect to a different database if needed for `custom_queries`
  # dbname: '<DB_NAME>'
```

**注**: パスワードに特殊文字が含まれる場合は、単一引用符で囲んでください。

[Agent を再起動][10] して、変更を適用します。

### ログの収集 (オプション) {#collecting-logs-optional}

PostgreSQL のデフォルトのログは `stderr` に記録され、ログに詳細な情報は含まれません。ログ行のプレフィックスに指定されている追加の詳細をファイルに記録してください。詳細については、PostgreSQL の [ドキュメント][11] を参照してください。

1. ログは `/etc/postgresql/<VERSION>/main/postgresql.conf` ファイル内で構成されます。ステートメント出力を含む通常のログ結果の場合、ログセクションで次のパラメーターを設定します。
   ```conf
     logging_collector = on
     log_line_prefix = '%m [%p] %d %a %u %h %c ' # this pattern is required to correlate metrics in the Datadog product
     log_file_mode = 0644

     ## For Windows
     #log_destination = 'eventlog'
   ```
2. 詳細な期間メトリクスを収集し、Datadog インターフェイスで検索可能にするには、ステートメントを使用してインラインで構成する必要があります。以下の推奨構成では、すべてのステートメントとその実行時間がログに記録されます。特定の実行時間より長いステートメントのみに出力を制限するには、`log_min_duration_statement` を必要な最小値 (ミリ秒) に設定します。SQL ステートメントすべてをログに記録することが、組織のプライバシー要件に準拠しているかどうか確認してください。

   **注**: `log_statement` および `log_duration` オプションはいずれもコメントアウトされています。このトピックについて詳しくは、[こちら][12] をご覧ください。

   ```conf
     log_min_duration_statement = 0    # -1 is disabled, 0 logs all statements
                                       # and their durations, > 0 logs only
                                       # statements running at least this number
                                       # of milliseconds
     #log_statement = 'all'
     #log_duration = on
   ```
3. Datadog Agent でのログ収集は、デフォルトで無効になっています。次のようにして、`datadog.yaml` ファイルで有効化します。
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
   `service` および `path` パラメーターの値を変更し、ご使用の環境に合わせて構成します。使用可能なすべての構成オプションについては、[サンプルの postgres.d/conf.yaml][9] を参照してください。
5. [Agent を再起動][10] します。

### `auto_explain` を使用して実行計画を収集する (オプション) {#collecting-plans-with-auto-explain-optional}

デフォルトでは、Agent は実行中のクエリのサンプリングに対してのみ [`EXPLAIN`][17] の実行計画を収集します。これらの実行計画は、特にアプリケーションコードがプリペアドステートメントを使用している場合、より一般的な内容になります。

すべてのクエリから取得した完全な `EXPLAIN ANALYZE` の実行計画を収集するには、[`auto_explain`][18] を使用する必要があります。これは、PostgreSQL にバンドルされたファーストパーティ拡張機能で、すべての主要プロバイダーで利用可能です。_ログ収集は `auto_explain` 収集_ の前提条件であるため、続行する前に有効にしてください。

<div class="alert alert-danger">
  <strong>重要:</strong><code>auto_explain</code> は、難読化されていない SQL に表示される生の値のような、アプリケーションの機密情報が含まれる可能性があるログ行を生成します。<a href="/account_management/rbac/permissions/#database-monitoring"><code>dbm_parameterized_queries_read</code></a> 権限を使用して、生成される計画を表示できるユーザーを制御できますが、ログ行自体は Datadog 組織内のすべてのユーザーに表示<i>されます</i>。<a href="/logs/guide/logs-rbac">ログに RBAC</a> を使用することで、これらのログが適切なユーザーのみに表示されるようにすることができます。
</div>

ログ収集を有効にしたら、次の手順を実行します。

1. `auto_explain` を `postgresql.conf` の `shared_preload_libraries` のリストに追加します。たとえば、`shared_preload_libraries` が `pg_stat_statements` に設定されている場合は、これを `pg_stat_statements,auto_explain` に変更します。

2. より豊富なイベント相関を有効にするために、`log_line_prefix` を変更します。このパターンは auto_explain の実行計画を取り込むために必要です。
   ```conf
     log_line_prefix = '%m:%r:%u@%d:[%p]:%l:%e:%s:%v:%x:%c:%q%a:'
   ```

3. `auto_explain` 設定を構成します。ログ形式は `json` である_必要_がありますが、ほかの設定はアプリケーションに応じて変更できます。この例では、1 秒を超えるすべてのクエリの `EXPLAIN ANALYZE` の実行計画をログに記録し、バッファ情報は含めますが、オーバーヘッドが発生する可能性があるためタイミング情報は除外します。

   ```conf
    auto_explain.log_format: "json"
    auto_explain.log_min_duration: "1000"
    auto_explain.log_analyze: "on"
    auto_explain.log_buffers: "on"
    auto_explain.log_timing: "off"
    auto_explain.log_triggers: "on"
    auto_explain.log_verbose: "on"
    auto_explain.log_nested_statements: "on"
    auto_explain.sample_rate: "1"
   ```

4. [Agent を再起動][10] します。

### Agent の設定を確認する {#verify-agent-setup}

[Agent の status サブコマンドを実行][13] し、[Checks] セクションに `postgres` があることを確認します。または、[データベース][14] ページにアクセスして開始することもできます。

## Agent の構成例 {#example-agent-configurations}
{{% dbm-postgres-agent-config-examples %}}

## トラブルシューティング {#troubleshooting}

インテグレーションと Agent を手順どおりにインストールおよび構成しても期待通りに動作しない場合は、[トラブルシューティング][15] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.postgresql.org/docs/current/contrib.html
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
[17]: https://www.postgresql.org/docs/current/sql-explain.html
[18]: https://www.postgresql.org/docs/current/auto-explain.html