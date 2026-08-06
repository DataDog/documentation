---
description: Amazon Aurora 上での Postgres の Database Monitoring をインストールして構成します。
further_reading:
- link: /integrations/postgres/
  tag: よくあるご質問
  text: Postgres インテグレーションの基本
- link: /database_monitoring/guide/parameterized_queries/
  tag: よくあるご質問
  text: SQL クエリパラメーター値のキャプチャ
title: Aurora マネージド Postgres の Database Monitoring のセットアップ
---
Database Monitoring は、クエリメトリクス、クエリサンプル、実行計画、データベースの状態、フェイルオーバー、イベントを公開することで、Postgres データベースを詳細に可視化します。

読み取り専用ユーザーとしてログインし、Agent でデータベースから直接テレメトリを収集します。Postgres データベースで Database Monitoring を有効にするには、以下のセットアップを実行します。

1. [データベースパラメーターを構成する](#configure-postgres-settings)
1. [Agent にデータベースへのアクセス権を付与する](#grant-the-agent-access)
1. [Agent をインストールし構成する](#install-and-configure-the-agent)
1. [RDS インテグレーションをインストールする](#install-the-rds-integration)

## はじめに {#before-you-begin}

サポート対象の PostgreSQL バージョン
: 9.6、10、11、12、13、14、15、16、17

サポート対象の Agent バージョン
: 7.36.1 以上

パフォーマンスへの影響
: Database Monitoring のデフォルトの Agent 構成は保守的ですが、収集間隔やクエリのサンプリングレートなどの設定を調整することで、よりニーズに合ったものにすることができます。大半のワークロードで、Agent はデータベース上のクエリ実行時間の 1 % 未満、および CPU の 1 % 未満を占めています。<br/><br/>
Database Monitoring は、ベースとなる Agent 上のインテグレーションとして動作します ([ベンチマークを参照][1])。

プロキシ、ロードバランサー、コネクションプーラー
: Datadog Agent は、モニター対象のホストに直接接続する必要があります。セルフホスト型のデータベースの場合は、`127.0.0.1` またはソケットを使用してください。Agent は、プロキシ、ロードバランサー、コネクションプーラー (`pgbouncer` など)、または **Aurora クラスターエンドポイント**を介してデータベースに接続すべきではありません。クラスターエンドポイントに接続されている場合、Agent はランダムな 1 つのレプリカからデータを収集し、そのレプリカの可視性だけを提供します。Agent が実行中に異なるホストに接続すると (フェイルオーバーやロードバランシングなどの場合)、Agent は 2 つのホスト間で統計情報の差を計算し、不正確なメトリクスを生成します。

データセキュリティへの配慮
: Agent がお客様のデータベースからどのようなデータを収集するか、またそのデータの安全性をどのように確保しているかについては、[機密情報][2] を参照してください。

## Postgres 設定を構成する {#configure-postgres-settings}

[DB パラメーターグループ][4] に以下の [パラメーター][3] を構成し、**サーバーを再起動**すると設定が有効になります。これらのパラメーターの詳細については、[Postgres ドキュメント][5] を参照してください。

**必須パラメーター**

| パラメーター | 値 | 説明 |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | `postgresql.queries.*` メトリクスで必要です。[pg_stat_statements][5] 拡張機能を使用して、クエリメトリクスの収集を可能にします。Aurora では、デフォルトでオンです。|
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

**注:** IAM 認証もサポートされています。Aurora インスタンスの場合の構成方法については、[ガイド][14] を参照してください。

{{< tabs >}}
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

## Agent をインストールし構成する {#install-and-configure-the-agent}

Aurora ホストをモニターするには、インフラストラクチャーに Datadog Agent をインストールし、各インスタンスのエンドポイントにリモートで接続するよう構成します。Agent はデータベース上で動作する必要はなく、データベースに接続するだけで構いません。ここに記載されていない、Agent のその他のインストール方法については、[Agent インストール手順][8] を参照してください。

### Autodiscovery のセットアップ (推奨) {#autodiscovery-setup-recommended}

Datadog Agent は、クラスター内のすべての Aurora エンドポイントの Autodiscovery をサポートしています。

インスタンスごとに異なる構成が必要な場合や、Aurora エンドポイントを手動で指定したい場合は、以下の手動セットアップに関するセクションの手順に従ってください。
それ以外の場合は、[Aurora DB クラスターの Autodiscovery セットアップ手順][9] を使用することをお勧めします。

{{< tabs >}}
{{% tab "ホスト" %}}

ホスト上で実行されている Agent の Database Monitoring メトリクスの収集を構成するには、次の手順に従ってください。(Agent で Aurora データベースからメトリクスを収集するために小規模な EC2 インスタンスをプロビジョニングする場合など)

1. `postgres.d/conf.yaml` ファイルを編集して、`host`/`port` を指定し、モニターするマスターを設定します。使用可能なすべての構成オプションについては、[サンプルの postgres.d/conf.yaml][1] を参照してください。

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

       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'
   ```

<div class="alert alert-danger">ここでは、クラスターのエンドポイントではなく、Aurora インスタンスのエンドポイントを使用してください。</div>

2. [Agent を再起動][2] します。

[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: /ja/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}

{{% tab "Docker" %}}
ECS や Fargate のような Docker コンテナで実行されている Agent に対してインテグレーションを構成するには、いくつかの方法があり、すべて [Docker 構成ドキュメント][1] で詳しく説明されています。

次の例では、[Docker ラベル][2] と [Autodiscovery テンプレート][3] を使用して Postgres インテグレーションを構成する方法を示しています。

**注**: Autodiscovery によるラベルの検出を有効にするには、Agent が Docker ソケットの読み取り権限を持っている必要があります。

### コマンドライン {#command-line}

[コマンドライン][4] から次のコマンドを実行して Agent を起動します。プレースホルダーの値は、ご使用のアカウントと環境の値に置き換えてください。

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

`Dockerfile` 内でラベルを指定することもできます。これにより、インフラストラクチャー構成を変更することなくカスタムの Agent を構築してデプロイできます。

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

`datadog` ユーザーのパスワードがプレーンテキストで公開されることがないようにするために、Agent の [シークレット管理パッケージ][5] を使用し、`ENC[]` 構文でパスワードを宣言します。または、[Autodiscovery テンプレート変数のドキュメント][6] を参照して、パスワードを環境変数として渡すこともできます。

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

[Kubernetesと Integrations の Operator 手順][3] を参照し、次の手順に従って Postgres インテグレーションを設定します。

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

[Kubernetes と Integrations の Helm 手順][4] を参照し、次の手順に従って Postgres インテグレーションを設定します。

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

2. 上記の構成ファイルを使用し、次のコマンドで Agent をデプロイします。

    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Windows の場合は、 <code>--set targetSystem=windows</code> を <code>helm install</code> コマンドに追加します。
</div>

### マウントされたファイルで構成する {#configure-with-mounted-files}

マウントされた構成ファイルを使用してクラスターチェックを構成するには、構成ファイルを Cluster Agent コンテナのパス `/conf.d/postgres.yaml` にマウントします。

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

```

### Kubernetes サービスアノテーションで構成する {#configure-with-kubernetes-service-annotations}

ファイルをマウントする代わりに、インスタンス構成を Kubernetes サービスとして宣言できます。Kubernetes 上で実行されている Agent に対してこのチェックを構成するには、次の構文を使用してサービスを作成します。

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

Postgres 9.6 を使用している場合は、インスタンス構成に次の内容を追加します。

```json
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

Cluster Agent は自動的にこの構成を登録し、Postgres チェックを開始します。

`datadog` ユーザーのパスワードがプレーンテキストで公開されることがないようにするために、Agent の [シークレット管理パッケージ][6] を使用し、`ENC[]` 構文でパスワードを宣言します。

[1]: /ja/containers/cluster_agent/setup/
[2]: /ja/containers/cluster_agent/clusterchecks/
[3]: /ja/containers/kubernetes/integrations/?tab=datadogoperator
[4]: /ja/containers/kubernetes/integrations/?tab=helm
[5]: /ja/containers/kubernetes/integrations/?tab=annotations#configuration
[6]: /ja/agent/configuration/secrets-management
{{% /tab %}}
{{< /tabs >}}

### Agent の設定を確認する {#verify-agent-setup}

[Agent の status サブコマンドを実行][10] し、[Checks] セクションに `postgres` があることを確認します。または、[データベース][11] ページにアクセスして開始することもできます。

## Agent の構成例 {#example-agent-configurations}
{{% dbm-postgres-agent-config-examples %}}

## RDS インテグレーションをインストールする {#install-the-rds-integration}

DBM でデータベースのテレメトリとともに CPU などの AWS からのインフラストラクチャーメトリクスを直接確認するには、[RDS インテグレーション][12] をインストールします (オプション)。

## トラブルシューティング {#troubleshooting}

インテグレーションと Agent を手順どおりにインストールおよび構成しても期待通りに動作しない場合は、[トラブルシューティング][13] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/database_monitoring/agent_integration_overhead/?tab=postgres
[2]: /ja/database_monitoring/data_collected/#sensitive-information
[3]: https://www.postgresql.org/docs/current/config-setting.html
[4]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_WorkingWithParamGroups.html
[5]: https://www.postgresql.org/docs/current/pgstatstatements.html
[6]: /ja/integrations/faq/postgres-custom-metric-collection-explained/
[7]: https://www.postgresql.org/docs/current/app-psql.html
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: /ja/database_monitoring/guide/aurora_autodiscovery/?tab=postgres
[10]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[11]: https://app.datadoghq.com/databases
[12]: /ja/integrations/amazon_rds
[13]: /ja/database_monitoring/troubleshooting/?tab=postgres
[14]: /ja/database_monitoring/guide/managed_authentication