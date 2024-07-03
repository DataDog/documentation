---
description: Install and configure Database Monitoring for Postgres on Amazon RDS.
further_reading:
- link: /integrations/postgres/
  tag: Documentation
  text: Basic Postgres Integration
title: Setting Up Database Monitoring for Amazon RDS managed Postgres
---

データベースモニタリングは、クエリメトリクス、クエリサンプル、実行計画、データベースの状態、フェイルオーバー、イベントを公開することで、Postgres データベースを詳細に可視化します。

Agent は、読み取り専用のユーザーとしてログインすることでデータベースから直接テレメトリーを収集します。Postgres データベースでデータベースモニタリングを有効にするには、以下の設定を行ってください。

1. [AWS インテグレーションを構成する](#configure-the-aws-integration)
1. [データベースのパラメーターを構成する](#configure-postgres-settings)
1. [Agent にデータベースへのアクセスを付与する](#grant-the-agent-access)
1. [Install and configure the Agent](#install-and-configure-the-agent)
1. [RDS インテグレーションをインストールする](#install-the-rds-integration)

## はじめに

サポート対象の PostgreSQL バージョン
: 9.6、10、11、12、13、14、15、16

サポート対象の Agent バージョン
: 7.36.1+

パフォーマンスへの影響
: データベースモニタリングのデフォルトの Agent コンフィギュレーションは保守的ですが、収集間隔やクエリのサンプリングレートなどの設定を調整することで、よりニーズに合ったものにすることができます。ワークロードの大半において、Agent はデータベース上のクエリ実行時間の 1 % 未満、および CPU の 1 % 未満を占めています。<br/><br/>
データベースモニタリングは、ベースとなる Agent 上のインテグレーションとして動作します ([ベンチマークを参照][1]してください)。

プロキシ、ロードバランサー、コネクションプーラー
: Datadog Agent は、監視対象のホストに直接接続する必要があります。セルフホスト型のデータベースの場合は、`127.0.0.1` またはソケットが推奨されます。Agent は、プロキシ、ロードバランサー、または `pgbouncer` などのコネクションプーラーを介してデータベースに接続すべきではありません。Agent が実行中に異なるホストに接続すると (フェイルオーバーやロードバランシングなどの場合)、Agent は 2 つのホスト間で統計情報の差を計算し、不正確なメトリクスを生成します。

データセキュリティへの配慮
: Agent がお客様のデータベースからどのようなデータを収集するか、またそのデータの安全性をどのように確保しているかについては、[機密情報][2]を参照してください。

## AWS インテグレーションの構成

Enable **Standard Collection** in the **Resource Collection** section of your [Amazon Web Services integration tile][3].

## Postgres 設定を構成する

Configure the following [parameters][4] in the [DB parameter group][5] and then **restart the server** for the settings to take effect. For more information about these parameters, see the [Postgres documentation][6].

| パラメーター | 値 | 説明 |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | Required for `postgresql.queries.*` metrics. Enables collection of query metrics using the [pg_stat_statements][6] extension. |
| `track_activity_query_size` | `4096` | より大きなクエリを収集するために必要です。`pg_stat_activity` の SQL テキストのサイズを拡大します。 デフォルト値のままだと、`1024` 文字を超えるクエリは収集されません。 |
| `pg_stat_statements.track` | `ALL` | オプションです。ストアドプロシージャや関数内のステートメントを追跡することができます。 |
| `pg_stat_statements.max` | `10000` | オプションです。`pg_stat_statements` で追跡する正規化されたクエリの数を増やします。この設定は、多くの異なるクライアントからさまざまな種類のクエリが送信される大容量のデータベースに推奨されます。 |
| `pg_stat_statements.track_utility` | `off` | オプション。PREPARE や EXPLAIN といったユーティリティコマンドを無効にします。この値を `off` に設定すると、SELECT、UPDATE、DELETE のようなクエリのみが追跡されます。 |
| `track_io_timing` | `on` | オプション。クエリのブロックの読み取りおよび書き込み時間の収集を有効にします。 |


## Agent にアクセスを付与する

Datadog Agent が統計やクエリを収集するためには、データベース サーバーへの読み取り専用のアクセスが必要となります。

The following SQL commands should be executed on the **primary** database server (the writer) in the cluster if Postgres is replicated. Choose a PostgreSQL database on the server for the Agent to connect to. The Agent can collect telemetry from all databases on the database server regardless of which one it connects to, so a good option is to use the default `postgres` database. Choose a different database only if you need the Agent to run [custom queries against data unique to that database][7].

Connect to the chosen database as a superuser (or another user with sufficient permissions). For example, if your chosen database is `postgres`, connect as the `postgres` user using [psql][8] by running:

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

`datadog` ユーザーを作成します。

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

**Note:** IAM authentication is also supported. Please see [the guide][9] on how to configure this for your RDS instance.

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
CREATE EXTENSION IF NOT EXISTS pg_stat_statements schema public;
```
{{% /tab %}}

{{% tab "Postgres ≥ 10" %}}

**すべてのデータベース**に以下のスキーマを作成します。

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements schema public;
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
{{% tab "Postgres ≥ 10" %}}。

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

## Agent のインストールと構成

RDS ホストを監視するには、インフラストラクチャーに Datadog Agent をインストールし、各インスタンスのエンドポイントにリモートで接続するよう構成します。Agent はデータベース上で動作する必要はなく、データベースに接続するだけで問題ありません。ここに記載されていないその他の Agent のインストール方法については、[Agent のインストール手順][10]を参照してください。

{{< tabs >}}
{{% tab "ホスト" %}}

ホスト上で実行されている Agent のデータベースモニタリングメトリクスの収集を構成するには、次の手順に従ってください。(Agent で RDS データベースからメトリクスを収集するために小規模な EC2 インスタンスをプロビジョニングする場合など)

1. `postgres.d/conf.yaml` ファイルを編集して、`host` / `port` を指定し、監視するマスターを設定します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル postgres.d/conf.yaml][1] を参照してください。
   ```yaml
   init_config:
   instances:
     - dbm: true
       host: '<AWS_INSTANCE_ENDPOINT>'
       port: 5432
       username: datadog
       password: '<PASSWORD>'
       tags:
         - "dbinstanceidentifier:<DB_INSTANCE_NAME>"
       ## Required for Postgres 9.6: Uncomment these lines to use the functions created in the setup
       # pg_stat_statements_view: datadog.pg_stat_statements()
       # pg_stat_activity_view: datadog.pg_stat_activity()
       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'
   ```

   For Agent versions `≤ 7.49`, add the following setting to the instance config where `host` and `port` are specified:

   ```yaml
   ssl: allow
   ```

   If you want to authenticate with IAM, specify the `region` and `instance_endpoint` parameters, and set `managed_authentication.enabled` to `true`.

   **Note**: only enable `managed_authentication` if you want to use IAM authentication. IAM authentication takes precedence over the `password` field.

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

   For information on configuring IAM authentication on your RDS instance, see [Connecting with Managed Authentication][3].

2. [Agent を再起動します][2]。


[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: /ja/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[3]: /ja/database_monitoring/guide/managed_authentication
{{% /tab %}}
{{% tab "Docker" %}}

ECS や Fargate などの Docker コンテナで動作するデータベースモニタリング Agent を設定するには、Agent コンテナの Docker ラベルとして[オートディスカバリーのインテグレーションテンプレート][1]を設定します。

**注**: ラベルのオートディスカバリーを機能させるためには、Agent にDocker ソケットに対する読み取り権限が与えられている必要があります。

### コマンドライン

次のコマンドを実行して、コマンドラインから Agent を実行することですぐに稼動させることができます。お使いのアカウントや環境に合わせて値を変更してください。

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=7.36.1

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.checks='{"postgres": {
    "init_config": [{}],
    "instances": [{
      "dbm": true,
      "host": "<AWS_INSTANCE_ENDPOINT>",
      "port": 5432,
      "username": "datadog",
      "password": "<UNIQUEPASSWORD>",
      "tags": ["dbinstanceidentifier:<DB_INSTANCE_NAME>"]
    }]
  }}' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

Postgres 9.6 の場合、ホストとポートが指定されているインスタンスの config に以下の設定を追加します。

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

### Dockerfile

`Dockerfile` ではラベルの指定も可能であるため、インフラストラクチャーのコンフィギュレーションを変更することなく、カスタム Agent を構築・デプロイすることができます。

```Dockerfile
FROM gcr.io/datadoghq/agent:7.36.1

LABEL "com.datadoghq.ad.check_names"='["postgres"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AWS_INSTANCE_ENDPOINT>", "port": 5432,"username": "datadog","password": "<UNIQUEPASSWORD>","tags": ["dbinstanceidentifier:<DB_INSTANCE_NAME>"]}]'
```

Postgres 9.6 の場合、ホストとポートが指定されているインスタンスの config に以下の設定を追加します。

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

`datadog` ユーザーのパスワードをプレーンテキストで公開しないようにするには、Agent の[シークレット管理パッケージ][2]を使用し、`ENC[]` 構文を使ってパスワードを宣言するか、[オートディスカバリーテンプレート変数に関するドキュメント][3]でパスワードを環境変数として渡す方法をご確認ください。


[1]: /ja/agent/docker/integrations/?tab=docker
[2]: /ja/agent/configuration/secrets-management
[3]: /ja/agent/faq/template_variables/
{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes クラスターをお使いの場合は、データベースモニタリング用の [Datadog Cluster Agent][1] をご利用ください。

Kubernetes クラスターでまだチェックが有効になっていない場合は、手順に従って[クラスターチェックを有効][2]にしてください。Postgres のコンフィギュレーションは、Cluster Agent コンテナにマウントされた静的ファイル、またはサービスアノテーションのいずれかを使用して宣言できます。

### Helm

Complete the following steps to install the [Datadog Cluster Agent][1] on your Kubernetes cluster. Replace the values to match your account and environment.

1. Complete the [Datadog Agent installation instructions][3] for Helm.
2. Update your YAML configuration file (`datadog-values.yaml` in the Cluster Agent installation instructions) to include the following:
    ```yaml
    clusterAgent:
      confd:
        postgres.yaml: -|
          cluster_check: true
          init_config:
          instances:
          - dbm: true
            host: <INSTANCE_ADDRESS>
            port: 5432
            username: datadog
            password: '<UNIQUE_PASSWORD>'
            tags:
              - 'dbinstanceidentifier:<DB_INSTANCE_NAME>'

    clusterChecksRunner:
      enabled: true
    ```

    For Postgres 9.6, add the following settings to the instance config where host and port are specified:

    ```yaml
    pg_stat_statements_view: datadog.pg_stat_statements()
    pg_stat_activity_view: datadog.pg_stat_activity()
    ```

3. Deploy the Agent with the above configuration file from the command line:
    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
For Windows, append <code>--set targetSystem=windows</code> to the <code>helm install</code> command.
</div>

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/getting_started/site
[3]: /ja/containers/kubernetes/installation/?tab=helm#installation

### マウントされたファイルで構成する

マウントされたコンフィギュレーションファイルを使ってクラスターチェックを構成するには、コンフィギュレーションファイルを Cluster Agent コンテナのパス `/conf.d/postgres.yaml` にマウントします。

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: 5432
    username: datadog
    password: '<PASSWORD>'
    tags:
      - dbinstanceidentifier:<DB_INSTANCE_NAME>
    ## 必須: Postgres 9.6 の場合、セットアップで作成した関数を使用するために、以下の行のコメントを解除してください
    # pg_stat_statements_view: datadog.pg_stat_statements()
    # pg_stat_activity_view: datadog.pg_stat_activity()
```

### Kubernetes サービスアノテーションで構成する

ファイルをマウントせずに、インスタンスのコンフィギュレーションを Kubernetes サービスとして宣言することができます。Kubernetes 上で動作する Agent にこのチェックを設定するには、Datadog Cluster Agent と同じネームスペースにサービスを作成します。


```yaml
apiVersion: v1
kind: Service
metadata:
  name: postgres
  labels:
    tags.datadoghq.com/env: '<ENV>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/service.check_names: '["postgres"]'
    ad.datadoghq.com/service.init_configs: '[{}]'
    ad.datadoghq.com/service.instances: |
      [
        {
          "dbm": true,
          "host": "<AWS_INSTANCE_ENDPOINT>",
          "port": 5432,
          "username": "datadog",
          "password": "<UNIQUEPASSWORD>",
          "tags": [
            "dbinstanceidentifier:<DB_INSTANCE_NAME>"
          ]
        }
      ]
spec:
  ports:
  - port: 5432
    protocol: TCP
    targetPort: 5432
    name: postgres
```

Postgres 9.6 の場合、ホストとポートが指定されているインスタンスの config に以下の設定を追加します。

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

Cluster Agent は自動的にこのコンフィギュレーションを登録し、Postgres チェックを開始します。

`datadog` ユーザーのパスワードをプレーンテキストで公開しないよう、Agent の[シークレット管理パッケージ][4]を使用し、`ENC[]` 構文を使ってパスワードを宣言します。

[1]: /ja/agent/cluster_agent
[2]: /ja/agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: /ja/agent/configuration/secrets-management
{{% /tab %}}
{{< /tabs >}}

### UpdateAzureIntegration

[Agent の status サブコマンドを実行][11]し、Checks セクションで `postgres` を探します。または、[データベース][12]のページを参照してください。

## Agent の構成例
{{% dbm-postgres-agent-config-examples %}}

## RDS インテグレーションをインストール

To see infrastructure metrics from AWS, such as CPU, alongside the database telemetry in DBM, install the [RDS integration][13] (optional).

## トラブルシューティング

インテグレーションと Agent を手順通りにインストール・設定しても期待通りに動作しない場合は、[トラブルシューティング][14]を参照してください。

## 参考資料

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