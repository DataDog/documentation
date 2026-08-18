---
description: Amazon RDS 上の Postgres の Database Monitoring をインストールして構成します。
further_reading:
- link: /integrations/postgres/
  tag: よくあるご質問
  text: Postgres インテグレーションの基本
- link: /database_monitoring/guide/rds_autodiscovery
  tag: よくあるご質問
  text: RDS の Autodiscovery
- link: /database_monitoring/guide/parameterized_queries/
  tag: よくあるご質問
  text: SQL クエリパラメーター値のキャプチャ
title: Amazon RDS マネージド Postgres の Database Monitoring のセットアップ
---
Database Monitoring (DBM) は、クエリメトリクス、クエリサンプル、実行計画、データベースの状態、フェイルオーバー、イベントを可視化することで、Postgres データベースの内部状態を詳細に把握できるようにします。

Agent は、読み取り専用ユーザーとしてログインして、データベースから直接テレメトリを収集します。Postgres データベースで DBM を有効にするには、以下のセットアップを実行します。

1. [Configure the AWS integration](#configure-the-aws-integration)
1. [Configure database parameters](#configure-postgres-settings)
1. [Grant the Agent access to the database](#grant-the-agent-access)
1. [Install and configure the Agent](#install-and-configure-the-agent)
1. [Install the RDS integration](#install-the-rds-integration)

<div class="alert alert-info">
<a href="/database_monitoring/setup_postgres/rds/quick_install">RDS クイックインストール</a>は、小規模な環境 (たとえば、データベースホストが 20 台など) や、DBM を初めて利用してすぐに試してみたい場合に推奨されるインストール方法です。大規模なデータベース群を管理しており、UI 経由でエージェントをデプロイする方法がスケールしにくい場合には、標準インストールを推奨します。標準インストールでは、エージェントを手動で管理したり、既存の自動化プロセスと統合したりすることができます。
</div>

## はじめに {#before-you-begin}

サポート対象の PostgreSQL バージョン
: 9.6、10、11、12、13、14、15、16、17

サポートされている Agent バージョン
: 7.36.1+

パフォーマンスへの影響
: DBM のデフォルトのエージェント構成は保守的な設定になっていますが、収集間隔やクエリサンプリングレートなどの設定を調整し、ニーズに合わせて最適化できます。ほとんどのワークロードにおいて、Agent がデータベースのクエリ実行時間に与える影響は 1% 未満、CPU 使用率への影響も 1% 未満です。<br/><br/>
DBM は、ベースとなる Agent の上で動作するインテグレーションとして実行されます ([ベンチマークを参照][1])。

プロキシ、ロードバランサー、コネクションプーラー
: Datadog Agent は、監視対象のホストに直接接続する必要があります。自己ホスト型データベースの場合、`127.0.0.1` またはソケットを使用してください。Agent は、プロキシ、ロードバランサー、または `pgbouncer` のようなコネクションプーラーを介してデータベースに接続しないでください。Agent の実行中に接続先ホストが切り替わる場合 (フェイルオーバーやロードバランシングなど)、Agent は 2 つのホスト間の統計の差分を計算してしまうため、不正確なメトリクスが生成されます。

セキュリティに関する考慮事項
: Agent がデータベースから収集するデータや、その安全性を確保する方法については、[機密情報][2] を参照してください。

## AWS インテグレーションを構成する{#configure-the-aws-integration}

[Amazon Web Services インテグレーションタイル][3] の [{{< ui >}}Resource Collection{{< /ui >}}] セクションで、[{{< ui >}}Resource Collection{{< /ui >}}] を有効にします。

## Postgres 設定を構成する{#configure-postgres-settings}

以下の [パラメーター][4] を [DB パラメーターグループ][5] で構成してから**サーバーを再起動**して、設定を有効にします。これらのパラメーターに関する詳細については、[Postgres ドキュメント][6] を参照してください。

**必須パラメーター**

| パラメーター | 値 | 説明 |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | `postgresql.queries.*` メトリクスのために必要です。[pg_stat_statements][6] 拡張機能を使用してクエリメトリクスの収集を有効にします。|
| `track_activity_query_size` | `4096` | より大きなクエリの収集に必要です。`pg_stat_activity` の SQL テキストのサイズを拡張します。デフォルト値のままにすると、`1024` 文字を超えるクエリは収集されません。|

**オプションパラメーター**

| パラメーター | 値 | 説明 |
| --- | --- | --- |
| `pg_stat_statements.track` | `ALL` | ストアドプロシージャや関数内のステートメントの追跡を有効にします。|
| `pg_stat_statements.max` | `10000` |  `pg_stat_statements`で追跡する正規化されたクエリの数を増加させます。多くの異なるクライアントから多様なクエリが実行される高負荷データベースに推奨されます。|
| `pg_stat_statements.track_utility` | `off` | PREPARE や EXPLAIN などのユーティリティコマンドを無効にします。この値を `off` に設定すると、SELECT、UPDATE、DELETE などのクエリのみが追跡されます。|
| `track_io_timing` | `on` | クエリにおけるブロックの読み取りおよび書き込み時間の収集を有効にします。|

### `auto_explain` を有効にする (オプション){#enable-auto-explain-optional}

デフォルトでは、エージェントは実行中のクエリのサンプリングに対してのみ [`EXPLAIN`][15] の実行計画を収集します。これらの実行計画は、特にアプリケーションコードがプリペアドステートメントを使用している場合、より一般的な内容になります。

すべてのクエリから取得した完全な `EXPLAIN ANALYZE` の実行計画を収集するには、[`auto_explain`][16] を使用する必要があります。これは、PostgreSQL にバンドルされたファーストパーティ拡張機能で、すべての主要プロバイダーで利用可能です。_ログ収集は `auto_explain` 収集_ の前提条件であるため、続行する前に有効にしてください。

<div class="alert alert-danger">
<strong>重要:</strong><code>auto_explain</code> は、難読化されていない SQL 内の生データ値と同様に、機密性の高いアプリケーションデータを含む可能性があるログ行を出力します。生成されるプランへのアクセスを制御するには、<a href="/account_management/rbac/permissions/#database-monitoring"><code>dbm_parameterized_queries_read</code></a> 権限を使用してください。デフォルトで Datadog 組織内のすべてのユーザーに表示可能になっている、ログ行自体の可視性を制限するには、<a href="/logs/guide/logs-rbac">ログ向けの RBAC</a> も構成してください。Datadog は、機密情報を効果的に保護するために両方の権限を使用することを推奨します。
</div>

1. `auto_explain` 設定を構成します。ログ形式は __ `json`である必要がありますが、他の設定はアプリケーションに応じて変更できます。この例では、1 秒を超えるすべてのクエリの `EXPLAIN ANALYZE` の実行計画をログに出力し、バッファ情報は含めますが、オーバーヘッドが発生する可能性があるためタイミング情報は除外します。

| パラメーター | 値 | 説明 |
| --- | --- | --- |
| `shared_preload_libraries`      | `pg_stat_statements,auto_explain` | 自動 `EXPLAIN ANALYZE` | を有効にします
| `auto_explain.log_format`       | `json` | 機械可読の実行計画を生成します |
| `auto_explain.log_min_duration` | `1000` | クエリが 1 秒を超えると実行計画をログに記録します |
| `auto_explain.log_analyze`      | `on` |  `EXPLAIN` | の `ANALYZE` 形式を使用します
| `auto_explain.log_buffers`      | `on` | 実行計画にバッファ使用状況を含めます|
| `auto_explain.log_timing`       | `off` | タイミング情報を出力しません (オーバーヘッドが高いため)|
| `auto_explain.log_triggers`     | `on` | トリガーステートメントの実行計画を含めます|
| `auto_explain.log_verbose`      | `on` | 詳細な実行計画タイプを使用します|
| `auto_explain.log_nested_statements` | `on` | ネストされたステートメントを含めます|
| `auto_explain.sample_rate`      | `1` | 期間条件を満たすすべてのクエリに対して EXPLAIN を実行します|

2. `log_line_prefix` を変更して、よりリッチなイベント相関を有効にします。詳細については、[RDS DB パラメーターグループ][17] のドキュメントを参照してください。`auto_explain` の取り込みには、これを `%m:%r:%u@%d:[%p]:%l:%e:%s:%v:%x:%c:%q%a` に設定する必要があります。

3. RDS インスタンスが CloudWatch と Datadog にログを転送していることを確認するには、[Amazon RDS ログ収集][18] の手順に従ってください。


## Agent にアクセスを付与する{#grant-the-agent-access}

Datadog Agent では、統計やクエリを収集するために、データベースサーバーへの読み取り専用のアクセスが必要となります。

Postgres がレプリケートされている場合、クラスター内の**プライマリ**データベースサーバー (書き込み側) で次の SQL コマンドを実行してください。Agent は、接続先のデータベースに関係なく、サーバー上のすべてのデータベースからテレメトリを収集できます。Agent で [特定のデータベース固有のデータに対してカスタムクエリを実行する][7] 必要がない限り、デフォルトの `postgres` データベースを使用してください。

選択したデータベースに、スーパーユーザー (または十分な権限を持つ別のユーザー) として接続します。たとえば、[psql][8] を使用して `postgres` データベースに接続するには、次のようにします。

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

`datadog` ユーザーを作成します。

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

**注** IAM 認証もサポートされています。RDS インスタンスの設定方法については、[ガイド][9] を参照してください。

{{< tabs >}}
{{% tab "Postgres ≥ 15" %}}

`datadog` ユーザーに関連テーブルへの権限を付与します。

```SQL
ALTER ROLE datadog INHERIT;
```

**すべてのデータベースで**以下のスキーマを作成します。

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements schema public;
```
{{% /tab %}}

{{% tab "Postgres ≥ 10" %}}

**すべてのデータベースで**以下のスキーマを作成します。

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements schema public;
```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

**すべてのデータベースで**以下のスキーマを作成します。

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT SELECT ON pg_stat_database TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

**すべてのデータベースで**関数を作成し、Agent が`pg_stat_activity`と`pg_stat_statements` の完全な内容を読み取れるようにします:

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

<div class="alert alert-info">追加のテーブルをクエリする必要があるデータ収集やカスタムメトリクスの場合、そのテーブルに対して、 <code>SELECT</code> 権限を <code>datadog</code> ユーザーのみがたどることができます。例:<code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code>。詳細については、<a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">PostgreSQL カスタムメトリクスの収集</a>を参照してください。</div>

### EXPLAIN の実行計画関数を作成する{#create-the-explain-plan-function}

**すべてのデータベースで**次の関数を作成し、Agent が実行計画を収集できるようにします。

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

### パスワードを安全に保管する{#securely-store-your-password}
{{% dbm-secret %}}

### データベースの権限を確認する{#verify-database-permissions}

権限が正しく設定されていることを確認するために、次のコマンドを実行して、Agent ユーザーがデータベースに接続してコアテーブルを読み取れることを確認します。
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

パスワードの入力を求められた場合は、`datadog` ユーザーを作成したときに入力したパスワードを使用してください。

## Agent をインストールし構成する{#install-and-configure-the-agent}

RDS ホストを監視するには、インフラストラクチャーに Datadog Agent をインストールし、各インスタンスエンドポイントにリモートで接続するように構成します。Agent をデータベース上で実行する必要はなく、接続するだけで構いません。ここに記載されていない、Agent のその他のインストール方法については、[Agent インストール手順][10] を参照してください。

{{< tabs >}}
{{% tab "ホスト" %}}
ホスト上で実行されている Agent での Database Monitoring メトリクスの収集を構成するには (たとえば、RDS データベースから収集するために小規模な EC2 インスタンスを Agent 用にプロビジョニングする場合など)、次の手順に従ってください。

1. `postgres.d/conf.yaml` ファイルを編集して、`host`/`port` を指定し、監視するマスターを設定します。使用可能なすべての構成オプションについては、[サンプルの postgres.d/conf.yaml][1] を参照してください。

   ```yaml
   init_config:
   instances:
     - dbm: true
       host: '<AWS_INSTANCE_ENDPOINT>'
       port: 5432
       username: datadog
       password: 'ENC[datadog_user_database_password]'
       aws:
         instance_endpoint: '<AWS_INSTANCE_ENDPOINT>'
         region: '<REGION>'
       tags:
         - "dbinstanceidentifier:<DB_INSTANCE_NAME>"

       ## Required for Postgres 9.6: Uncomment these lines to use the functions created in the setup
       # pg_stat_statements_view: datadog.pg_stat_statements()
       # pg_stat_activity_view: datadog.pg_stat_activity()

       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'
   ```

   Agent バージョンが `≤ 7.49` の場合、`host` と `port` が指定されているインスタンス構成に次の設定を追加します。

   ```yaml
   ssl: allow
   ```

   IAM で認証する場合は、`region` および `instance_endpoint` パラメーターを指定し、`managed_authentication.enabled` を `true` に設定します。

   **注**: IAM 認証を使用する場合のみ `managed_authentication` を有効にしてください。IAM 認証は `password` フィールドよりも優先されます。

   ```yaml
   init_config:
   instances:
     - dbm: true
       host: '<AWS_INSTANCE_ENDPOINT>'
       port: 5432
       username: datadog
       aws:
         instance_endpoint: '<AWS_INSTANCE_ENDPOINT>'
         region: '<REGION>'
         managed_authentication:
           enabled: true
       tags:
         - "dbinstanceidentifier:<DB_INSTANCE_NAME>"

       ## Required for Postgres 9.6: Uncomment these lines to use the functions created in the setup
       # pg_stat_statements_view: datadog.pg_stat_statements()
       # pg_stat_activity_view: datadog.pg_stat_activity()

       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'
   ```

   RDS インスタンスでの IAM 認証の構成については、[マネージド認証との接続][3] を参照してください。

2. [Agent を再起動][2] します。

[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: /ja/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[3]: /ja/database_monitoring/guide/managed_authentication
{{% /tab %}}

{{% tab "Docker" %}}
ECS や Fargate のような Docker コンテナで実行されている Agent に対してインテグレーションを構成するには、いくつかの方法があり、すべて [Docker 醸成ドキュメント][1] で詳しく説明されています。

次の例では、[Docker ラベル][2] と [Autodiscovery テンプレート][3] を使用して Postgres インテグレーションを構成する方法を示します。

**注**: Autodiscovery によるラベルの検出を有効にするには、Agent が Docker ソケットの読み取り権限を持っている必要があります。

### コマンドライン {#command-line}

[コマンドライン][4] から次のコマンドを実行して Agent を起動します。プレースホルダーの値を、実際のアカウントと環境の値に置き換えてください。

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=<AGENT_VERSION>

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.checks='{"postgres": {
    "init_config": {},
    "instances": [{
      "dbm": true,
      "host": "<AWS_INSTANCE_ENDPOINT>",
      "port": 5432,
      "username": "datadog",
      "password": "<UNIQUEPASSWORD>",
       "aws": {
         "instance_endpoint": "<AWS_INSTANCE_ENDPOINT>",
         "region": "<REGION>"
       },
      "tags": ["dbinstanceidentifier:<DB_INSTANCE_NAME>"]
    }]
  }}' \
  registry.datadoghq.com/agent:${DD_AGENT_VERSION}
```

Postgres 9.6 の場合、ホストとポートが指定されているインスタンス構成に次の設定を追加します。

```yaml
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

### Dockerfile {#dockerfile}

`Dockerfile` 内でラベルを指定することもできます。これにより、インフラストラクチャー構成を変更することなくカスタムの Agent を構築しデプロイできます。

```Dockerfile
FROM registry.datadoghq.com/agent:<AGENT_VERSION>

LABEL "com.datadoghq.ad.check_names"='["postgres"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AWS_INSTANCE_ENDPOINT>", "port": 5432,"username": "datadog","password": "ENC[datadog_user_database_password]","aws": {"instance_endpoint": "<AWS_INSTANCE_ENDPOINT>", "region": "<REGION>"}, "tags": ["dbinstanceidentifier:<DB_INSTANCE_NAME>"]}]'
```

Postgres 9.6 の場合、ホストとポートが指定されているインスタンス構成に次の設定を追加します。

```yaml
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

`datadog`ユーザーのパスワードをプレーンテキストで公開しないよう、Agent の [シークレット管理パッケージ][5] を使用し、`ENC[]` 構文を使ってパスワードを宣言します。または、[Autodiscovery テンプレート変数のドキュメント][6] を参照して、パスワードを環境変数として渡すこともできます。

[1]: /ja/containers/docker/integrations/?tab=labels#configuration
[2]: https://docs.docker.com/engine/manage-resources/labels/
[3]: /ja/getting_started/containers/autodiscovery/
[4]: /ja/containers/docker/integrations/?tab=labels#using-docker-run-nerdctl-run-or-podman-run
[5]: /ja/agent/configuration/secrets-management
[6]: /ja/agent/faq/template_variables/
{{% /tab %}}

{{% tab "Kubernetes" %}}
Kubernetes クラスターを実行している場合は、[Datadog Cluster Agent][1] を使用して Database Monitoring を有効にしてください。

**注**: 続行する前に、Datadog Cluster Agent の [クラスターチェック][2] が有効になっていることを確認してください。

以下は、Datadog Cluster Agent のさまざまなデプロイ方法を使用して Postgres インテグレーションを構成するための手順です。

### Operator {#operator}

[Kubernetes と Integrations の Operator 手順][3] を参照し、次の手順に従って Postgres インテグレーションを設定してください。

1. 次の構成で `datadog-agent.yaml` ファイルを作成または更新します。

    ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      global:
        clusterName: <CLUSTER_NAME>
        site: <DD_SITE>
        credentials:
          apiSecret:
            secretName: datadog-agent-secret
            keyName: api-key

      features:
        clusterChecks:
          enabled: true

      override:
        nodeAgent:
          image:
            name: agent
            tag: <AGENT_VERSION>

        clusterAgent:
          extraConfd:
            configDataMap:
              postgres.yaml: |-
                cluster_check: true
                init_config:
                instances:
                - host: <AWS_INSTANCE_ENDPOINT>
                  port: 5432
                  username: datadog
                  password: 'ENC[datadog_user_database_password]'
                  dbm: true
                  aws:
                    instance_endpoint: <AWS_INSTANCE_ENDPOINT>
                    region: <REGION>
                  tags:
                  - "dbinstanceidentifier:<DB_INSTANCE_NAME>"

    ```

    **Note**: For Postgres 9.6, add the following lines to the instance config where host and port are specified:

    ```yaml
    pg_stat_statements_view: datadog.pg_stat_statements()
    pg_stat_activity_view: datadog.pg_stat_activity()
    ```

2. 次のコマンドを使用して Datadog Operator に変更を適用します。

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm {#helm}

[Kubernetes と Integrations の Helm 手順][4] を参照し、次の手順で Postgres インテグレーションを設定してください。

1. Cluster Agent インストール手順で使用した `datadog-values.yaml` ファイルを、次の構成で更新します。

    ```yaml
    datadog:
      clusterChecks:
        enabled: true

    clusterChecksRunner:
      enabled: true

    clusterAgent:
      enabled: true
      confd:
        postgres.yaml: |-
          cluster_check: true
          init_config:
          instances:
          - dbm: true
            host: <AWS_INSTANCE_ENDPOINT>
            port: 5432
            username: datadog
            password: 'ENC[datadog_user_database_password]'
            aws:
              instance_endpoint: <AWS_INSTANCE_ENDPOINT>
              region: <REGION>
            tags:
            - "dbinstanceidentifier:<DB_INSTANCE_NAME>"

    ```

    **Note**: For Postgres 9.6, add the following lines to the instance config where host and port are specified:

    ```yaml
    pg_stat_statements_view: datadog.pg_stat_statements()
    pg_stat_activity_view: datadog.pg_stat_activity()
    ```

2. 上記の構成ファイルを使用して、次のコマンドで Agent をデプロイします。

    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Windows の場合、 <code>--set targetSystem=windows</code> を <code>helm install</code> コマンドに追加します。
</div>

### マウントされたファイルで構成する{#configure-with-mounted-files}

マウントされた構成ファイルを使用してクラスターチェックを設定するには、構成ファイルを Cluster Agent コンテナのパス `/conf.d/postgres.yaml` にマウントします。

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    aws:
      instance_endpoint: <AWS_INSTANCE_ENDPOINT>
      region: <REGION>
    tags:
    - "dbinstanceidentifier:<DB_INSTANCE_NAME>"

    ## Required: For Postgres 9.6, uncomment these lines to use the functions created in the setup
    # pg_stat_statements_view: datadog.pg_stat_statements()
    # pg_stat_activity_view: datadog.pg_stat_activity()
```

### Kubernetes サービスアノテーションで構成する{#configure-with-kubernetes-service-annotations}

ファイルをマウントする代わりに、インスタンス構成を Kubernetes サービスとして宣言できます。Kubernetes 上で実行されているエージェントに対してこのチェックを構成するには、次の構文を使用してサービスを作成します。

#### Autodiscovery アノテーション v2 {#autodiscovery-annotations-v2}

```yaml
apiVersion: v1
kind: Service
metadata:
  name: postgres
  labels:
    tags.datadoghq.com/env: '<ENV>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/service.checks: |
      {
        "postgres": {
          "init_config": <INIT_CONFIG>,
          "instances": [
            {
              "dbm": true,
              "host": "<AWS_INSTANCE_ENDPOINT>",
              "port": 5432,
              "username": "datadog",
              "password": "ENC[datadog_user_database_password]",
              "aws": {
                "instance_endpoint": "<AWS_INSTANCE_ENDPOINT>",
                "region": "<REGION>"
              },
              "tags": [
                "dbinstanceidentifier:<DB_INSTANCE_NAME>"
              ]
            }
          ]
        }
      }
spec:
  ports:
  - port: 5432
    protocol: TCP
    targetPort: 5432
    name: postgres
```

詳細については、[Autodiscovery アノテーション][5] を参照してください。

Postgres 9.6 を使用している場合、インスタンス構成に次の内容を追加します。

```json
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

Cluster Agent は自動的にこの構成を登録し、Postgres チェックを開始します。

`datadog` ユーザーのパスワードをプレーンテキストで公開しないよう、Agent の [シークレット管理パッケージ][6] を使用し、`ENC[]` 構文を使ってパスワードを宣言します。

[1]: /ja/containers/cluster_agent/setup/
[2]: /ja/containers/cluster_agent/clusterchecks/
[3]: /ja/containers/kubernetes/integrations/?tab=datadogoperator
[4]: /ja/containers/kubernetes/integrations/?tab=helm
[5]: /ja/containers/kubernetes/integrations/?tab=annotations#configuration
[6]: /ja/agent/configuration/secrets-management
{{% /tab %}}
{{< /tabs >}}

### Agent のセットアップを確認する{#verify-agent-setup}

[Agent の status サブコマンドを実行][11] し、Checks セクションに `postgres` が表示されていることを確認します。または、[Databases][12] ページにアクセスして開始することもできます。

## Agent の構成例{#example-agent-configurations}
{{% dbm-postgres-agent-config-examples %}}

## RDS インテグレーションをインストールする {#install-the-rds-integration}

AWS のインフラストラクチャーメトリクス (CPU など) を DBM のデータベースのテレメトリとあわせて表示するには、[RDS インテグレーション][13] をインストールしてください (任意)。

## トラブルシューティング {#troubleshooting}

インテグレーションと Agent を手順通りにインストールおよび構成しても期待通りに動作しない場合は、[トラブルシューティング][14] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/database_monitoring/agent_integration_overhead/?tab=postgres
[2]: /ja/database_monitoring/data_collected/#sensitive-information
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://www.postgresql.org/docs/current/config-setting.html
[5]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithParamGroups.html
[6]: https://www.postgresql.org/docs/current/pgstatstatements.html
[7]: /ja/integrations/faq/postgres-custom-metric-collection-explained/
[8]: https://www.postgresql.org/docs/current/app-psql.html
[9]: /ja/database_monitoring/guide/managed_authentication
[10]: https://app.datadoghq.com/account/settings/agent/latest
[11]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[12]: https://app.datadoghq.com/databases
[13]: /ja/integrations/amazon_rds
[14]: /ja/database_monitoring/troubleshooting/?tab=postgres
[15]: https://www.postgresql.org/docs/current/sql-explain.html
[16]: https://www.postgresql.org/docs/current/auto-explain.html
[17]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.Concepts.PostgreSQL.overview.parameter-groups.html
[18]: /ja/integrations/amazon-rds/?tab=standard#log-collection