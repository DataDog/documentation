---
description: セルフホストの Postgres のデータベースモニタリングをインストールして構成します。
further_reading:
- link: /integrations/postgres/
  tag: よくあるご質問
  text: Postgres インテグレーションの基本
- link: /database_monitoring/guide/parameterized_queries/
  tag: よくあるご質問
  text: SQLクエリパラメータ値のキャプチャ
- link: https://www.datadoghq.com/blog/database-monitoring-explain-analyze
  tag: ブログ
  text: Datadog DBMでEXPLAIN ANALYZEを使用してPostgreSQLクエリのレイテンシを迅速にデバッグする
title: セルフホストのPostgresのDBMの設定
---
データベースモニタリングは、クエリメトリクス、クエリサンプル、実行計画、データベースの状態、フェイルオーバー、イベントを公開することで、Postgres データベースを詳細に可視化します。

読み取り専用ユーザーとしてログインし、Agent でデータベースから直接テレメトリーを収集します。PostgresデータベースでDBMを有効にするには、以下のセットアップを実行してください：

1. [データベースパラメータを設定する](#configure-postgres-settings)
1. [Agentにデータベースへのアクセス権を付与する](#grant-the-agent-access)
1. [Agentをインストールする](#install-the-agent)

## はじめに {#before-you-begin}

サポート対象のPostgreSQLバージョン
: 9.6、10、11、12、13、14、15、16、17、18

前提条件
: Postgresの追加提供モジュールをインストールする必要があります。ほとんどのインストールでは、これがデフォルトで含まれていますが、より一般的でないインストールでは、[この`postgresql-contrib`パッケージ][1]のバージョンを追加でインストールする必要があるかもしれません。

サポートされている Agent バージョン
: 7.36.1+

パフォーマンスへの影響
: DBMのためのデフォルトのAgent設定は保守的ですが、収集間隔やクエリサンプリングレートなどの設定を調整して、ニーズにより適したものにすることができます。ほとんどのワークロードにおいて、Agentはデータベースのクエリ実行時間の1％未満、CPUの1％未満を占めます。<br/><br/>
DBMは、基本Agentの上で統合として実行されます（[ベンチマークを参照][2]）。

プロキシ、ロードバランサー、コネクションプーラー
: Datadog Agentは、監視されているホストに直接接続する必要があります。セルフホストのデータベースの場合、`127.0.0.1`またはソケットを使用してください。Agentは、プロキシ、ロードバランサー、または`pgbouncer`のようなコネクションプーラーを介してデータベースに接続してはいけません。Agentが実行中に異なるホストに接続する場合（フェイルオーバーや負荷分散など）、Agentは2つのホスト間の統計の違いを計算し、不正確なメトリクスを生成します。

データセキュリティへの配慮
: Agentがお客様のデータベースからどのようなデータを収集するか、またそのデータの安全性をどのように確保しているかについては、[機密情報][3]を参照してください。

## Postgresの設定を構成する {#configure-postgres-settings}

`postgresql.conf`ファイルの[パラメーター][4]を以下のように構成し、**サーバーを再起動**して設定を有効にします。これらのパラメーターに関する詳細については、[Postgresドキュメント][5]を参照してください。

**必要なパラメーター**

| パラメーター | 値 | 説明 |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | メトリクスに必要です。[pg_stat_statements][5]拡張機能を使用してクエリメトリクスの収集を有効にします。|
| `track_activity_query_size` | `4096` | より大きなクエリの収集に必要です。`pg_stat_activity`のSQLテキストのサイズを増加させます。デフォルト値のままにすると、`1024`文字を超えるクエリは収集されません。|

**オプションパラメータ**

| パラメーター | 値 | 説明 |
| --- | --- | --- |
| `pg_stat_statements.track` | `ALL` | ストアドプロシージャや関数内のステートメントを追跡することを有効にします。|
| `pg_stat_statements.max` | `10000` | で追跡される正規化されたクエリの数を増加させます。多くの異なるクライアントから多くの異なるタイプのクエリが見られる高ボリュームのデータベースに推奨されます。|
| `pg_stat_statements.track_utility` | `off` | PREPAREやEXPLAINなどのユーティリティコマンドを無効にします。この値を`off`に設定すると、SELECT、UPDATE、DELETEのようなクエリのみが追跡されます。|
| `track_io_timing` | `on` | クエリのブロックの読み取りおよび書き込み時間の収集を有効にします。|

## Agentにアクセスを付与する {#grant-the-agent-access}

Datadog Agent が統計やクエリを収集するためには、データベースサーバーへの読み取り専用のアクセスが必要となります。

Postgres がレプリケートされている場合、クラスター内の **プライマリ** データベースサーバーで次の SQL コマンドを実行します。Agent は、接続するデータベースに関係なく、サーバー上のすべてのデータベースからテレメトリを収集できます。Agent に異なるデータベースに固有のデータに対して [カスタムクエリを実行させる] 必要がない限り、デフォルトの `postgres` データベースを使用してください。

スーパーユーザー（または十分な権限を持つ別のユーザー）として、選択したデータベースに接続します。たとえば、[psql][7] を使用して `postgres` データベースに接続するには:

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

`datadog`ユーザーを作成します:

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

{{< tabs >}}

{{% tab "Postgres ≥ 15" %}}

`datadog`ユーザーに関連テーブルへの権限を付与します:

```SQL
ALTER ROLE datadog INHERIT;
```

**すべてのデータベースに以下のスキーマを作成します:**

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}

{{% tab "Postgres ≥ 10" %}}

**すべてのデータベースに以下のスキーマを作成します:**

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

**すべてのデータベースに以下のスキーマを作成します:**

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT SELECT ON pg_stat_database TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

Agentが**と**の完全な内容を読み取れるように、`pg_stat_activity`すべてのデータベースに関数を作成します:`pg_stat_statements`

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

<div class="alert alert-info">データ収集や追加のテーブルに対してカスタムメトリクスを実行する場合は、これらのテーブルへの権限をユーザーに付与する必要があるかもしれません。 <code>SELECT</code> それらのテーブルに対する権限を <code>datadog</code> ユーザーに付与します。例:<code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code>詳細については、<a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">PostgreSQL カスタムメトリック収集</a>を参照してください。 </div>

### 実行計画関数を作成します {#create-the-explain-plan-function}

**すべてのデータベースに、Agentが実行計画を収集できるように関数を作成します:**

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

### パスワードを安全に保管してください {#securely-store-your-password}
{{% dbm-secret %}}

### データベースの権限を確認します {#verify-database-permissions}

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

パスワードの入力を求められた場合は、`datadog`ユーザーを作成したときに入力したパスワードを使用してください。

## Agentをインストールしてください {#install-the-agent}

Datadog Agentをインストールすると、PostgresのDBMに必要なPostgresチェックもインストールされます。
Agentをインストールしていない場合は、[Agentのインストール手順][8]を参照してください。次に、インストール方法に従って手順を続けてください。

Agentの`conf.d/postgres.d/conf.yaml`ファイルを編集して、監視したいPostgresインスタンスを指すようにします。構成オプションの完全なリストについては、[サンプル postgres.d/conf.yaml][9]を参照してください。

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

**注意**: パスワードに特殊文字が含まれている場合は、シングルクォートで囲んでください。

[Agent を再起動][10]して、変更を適用します。

### ログの収集 (オプション) {#collecting-logs-optional}

PostgreSQL のデフォルトのログ記録は `stderr` にあり、ログには詳細な情報は含まれていません。ログ行のプレフィックスに指定された追加の詳細を含むファイルに記録します。詳細については、PostgreSQL の[ドキュメント][11]を参照してください。

1. ログ記録は`/etc/postgresql/<VERSION>/main/postgresql.conf`ファイル内で構成されています。ステートメントの出力を含む定期的なログ結果については、ログセクションに次のパラメータを設定してください:
   ```conf
     logging_collector = on
     log_line_prefix = '%m [%p] %d %a %u %h %c ' # this pattern is required to correlate metrics in the Datadog product
     log_file_mode = 0644

     ## For Windows
     #log_destination = 'eventlog'
   ```
2. 詳細な期間メトリクスを収集し、Datadogインターフェースで検索可能にするため、ステートメントと一緒にインラインで構成してください。以下の推奨構成は、すべてのステートメントとその期間をログに記録します。特定の期間を超えるステートメントに出力を制限するには、`log_min_duration_statement` をミリ秒単位で希望の最小値に設定します。完全な SQL ステートメントのログ記録が組織のプライバシー要件に準拠していることを確認してください。

   **注意**: `log_statement`および`log_duration`の両方のオプションはコメントアウトされています。このトピックについての議論は[こちら][12]を参照してください。

   ```conf
     log_min_duration_statement = 0    # -1 is disabled, 0 logs all statements
                                       # and their durations, > 0 logs only
                                       # statements running at least this number
                                       # of milliseconds
     #log_statement = 'all'
     #log_duration = on
   ```
3. Datadog Agentでのログ収集は、デフォルトで無効になっています。`datadog.yaml`ファイルで有効にしてください。
   ```yaml
   logs_enabled: true
   ```
4. この構成ブロックを`conf.d/postgres.d/conf.yaml`ファイルに追加して編集し、PostgreSQLのログ収集を開始します。
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
   環境に合わせて`service`と`path`のパラメータの値を変更してください。使用可能なすべての構成オプションについては、[サンプル postgres.d/conf.yaml][9] を参照してください。
5. [エージェントを再起動します][10]。

### （オプション）を使用してプランを収集します。`auto_explain`{#collecting-plans-with-auto-explain-optional}

デフォルトでは、エージェントはサンプリングされた実行中のクエリに対してのみ [`EXPLAIN`][17] プランを収集します。これらのプランは一般的な性質のものであり、特にアプリケーションコードがプリペアードステートメントを使用する場合にそうなります。

すべてのクエリから取得した完全な`EXPLAIN ANALYZE`プランを収集するには、[`auto_explain`][18]を使用する必要があります。これは、すべての主要プロバイダーで利用可能なPostgreSQLにバンドルされた公式拡張機能です。_ログ収集は`auto_explain`収集_の前提条件であるため、続行する前に有効にしてください。

<div class="alert alert-danger">
  <strong>重要:</strong><code>auto_explain</code> これは、アプリケーションからの機密情報を含む可能性のあるログ行を生成します。これらは、非難読化されたSQLに表示される生の値に似ています。<a href="/account_management/rbac/permissions/#database-monitoring">を使用できます。<code>dbm_parameterized_queries_read</code></a>権限を使用して、誰が結果のプランを閲覧できるかを制御できますが、ログ行自体はDatadog組織内のすべてのユーザーに表示されます。<a href="/logs/guide/logs-rbac">RBAC for Logs</a>を使用することで、これらのログが適切なユーザーにのみ表示されることを確実にします。
</div>

ログ収集を有効にした後：

1. `auto_explain`のリストに`shared_preload_libraries`を追加します。`postgresql.conf`例えば、`shared_preload_libraries`が`pg_stat_statements`に設定されている場合は、`pg_stat_statements,auto_explain`に変更してください。

2. を変更して、`log_line_prefix`より豊かなイベント相関を有効にします。このパターンはauto_explain プランを取り込むために必要です。
   ```conf
     log_line_prefix = '%m:%r:%u@%d:[%p]:%l:%e:%s:%v:%x:%c:%q%a:'
   ```

3. `auto_explain`の設定を構成します。ログ形式は_必ず_`json`でなければなりませんが、他の設定はアプリケーションによって異なる場合があります。この例は、バッファ情報を含む1秒を超えるすべてのクエリの`EXPLAIN ANALYZE`プランをログに記録しますが、タイミング（オーバーヘッドが発生する可能性があります）は省略します。

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

4. [エージェントを再起動します][10]。

### エージェントの設定を確認します{#verify-agent-setup}

[エージェントの status サブコマンドを実行][13]し、Checks セクション内で`postgres`を探します。または、[Databases][14]ページを訪れて始めましょう！

## エージェントの構成例 {#example-agent-configurations}
{{% dbm-postgres-agent-config-examples %}}

## トラブルシューティング {#troubleshooting}

インテグレーションとエージェントを手順通りにインストール・設定しても期待通りに動作しない場合は、[トラブルシューティング][15]を参照してください。

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