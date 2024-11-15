---
description: Amazon Aurora 上での Postgres の Database Monitoring をインストールして構成します。
further_reading:
- link: /integrations/postgres/
  tag: ドキュメント
  text: Postgres インテグレーションの基本
title: Aurora マネージド Postgres の Database Monitoring のセットアップ
---

データベースモニタリングは、クエリメトリクス、クエリサンプル、実行計画、データベースの状態、フェイルオーバー、イベントを公開することで、Postgres データベースを詳細に可視化します。

Agent は、読み取り専用のユーザーとしてログインすることでデータベースから直接テレメトリーを収集します。Postgres データベースでデータベースモニタリングを有効にするには、以下の設定を行ってください。

1. [データベースのパラメーターを構成する](#configure-postgres-settings)
1. [Agent にデータベースへのアクセスを付与する](#grant-the-agent-access)
1. [Agent のインストールと構成](#install-and-configure-the-agent)
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
: Datadog Agent は、監視対象のホストに直接接続する必要があります。セルフホスト型のデータベースの場合は、`127.0.0.1` またはソケットが推奨されます。Agent は、プロキシ、ロードバランサー、`pgbouncer` などのコネクションプーラーまたは **Aurora クラスターエンドポイント**を介してデータベースに接続すべきではありません。クラスターエンドポイントに接続されている場合、Agent はランダムな 1 つのレプリカからデータを収集し、そのレプリカの可視性だけを提供します。Agent が実行中に異なるホストに接続すると (フェイルオーバーやロードバランシングなどの場合)、Agent は 2 つのホスト間で統計情報の差を計算し、不正確なメトリクスを生成します。

データセキュリティへの配慮
: Agent がお客様のデータベースからどのようなデータを収集するか、またそのデータの安全性をどのように確保しているかについては、[機密情報][2]を参照してください。

## Postgres 設定を構成する

[DB パラメーターグループ][4]に以下の[パラメーター][3]を構成し、**サーバーを再起動**すると設定が有効になります。これらのパラメーターの詳細については、[Postgres ドキュメント][5]を参照してください。

| パラメーター | 値 | 説明 |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | `postgresql.queries.*` メトリクスに対して必要です。[pg_stat_statements][5] 拡張機能を使用して、クエリメトリクスの収集を可能にします。Aurora ではデフォルトでオンです。 |
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

**注:** IAM 認証もサポートされています。Aurora インスタンスの場合のこの構成方法については、[ガイド][13]を参照してください。

{{< tabs >}}
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

### Securely store your password
{{% dbm-secret %}}

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

## Agent のインストールと構成

Aurora ホストを監視するには、インフラストラクチャーに Datadog Agent をインストールし、各インスタンスのエンドポイントにリモートで接続するよう構成します。Agent はデータベース上で動作する必要はなく、データベースに接続するだけで問題ありません。ここに記載されていないその他の Agent のインストール方法については、[Agent のインストール手順][8]を参照してください。

{{< tabs >}}
{{% tab "ホスト" %}}

### オートディスカバリーのセットアップ (推奨)

Datadog Agent は、クラスター内のすべての Aurora エンドポイントのオートディスカバリーをサポートしています。インスタンスごとに異なる構成にしたい場合や、Aurora エンドポイントを手動で検索してリストアップしたい場合を除き、以下の手動セットアップセクションの代わりに [Aurora DB クラスターのオートディスカバリーセットアップ手順][3]に従ってください。

### 手動セットアップ

ホスト上で実行されている Agent のデータベースモニタリングメトリクスの収集を構成するには、次の手順に従ってください。(Agent で Aurora データベースからメトリクスを収集するために小規模な EC2 インスタンスをプロビジョニングする場合など)

1. `postgres.d/conf.yaml` ファイルを編集して、`host` / `port` を指定し、監視するマスターを設定します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル postgres.d/conf.yaml][1] を参照してください。

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
       ## Required for Postgres 9.6: Uncomment these lines to use the functions created in the setup
       # pg_stat_statements_view: datadog.pg_stat_statements()
       # pg_stat_activity_view: datadog.pg_stat_activity()
       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'
   ```

<div class="alert alert-warning"><strong>重要</strong>: ここでは、クラスターのエンドポイントではなく、Aurora インスタンスのエンドポイントを使用してください。</div>


2. [Agent を再起動します][2]。


[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: /ja/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[3]: /ja/database_monitoring/guide/aurora_autodiscovery/?tab=postgres
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
  -l com.datadoghq.ad.check_names='["postgres"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<AWS_INSTANCE_ENDPOINT>",
    "port": 5432,
    "username": "datadog",
    "password": "<UNIQUEPASSWORD>"
  }]' \
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
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AWS_INSTANCE_ENDPOINT>", "port": 5432,"username": "datadog","password": "ENC[datadog_user_database_password]"}]'
```

<div class="alert alert-warning"><strong>重要</strong>: クラスターのエンドポイントではなく、Aurora インスタンスのエンドポイントをホストとして使用します。</div>

Postgres 9.6 の場合、ホストとポートが指定されているインスタンスの config に以下の設定を追加します。

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```


[1]: /ja/agent/docker/integrations/?tab=docker
{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes クラスターをお使いの場合は、データベースモニタリング用の [Datadog Cluster Agent][1] をご利用ください。

Kubernetes クラスターでまだチェックが有効になっていない場合は、手順に従って[クラスターチェックを有効][2]にしてください。Postgres のコンフィギュレーションは、Cluster Agent コンテナにマウントされた静的ファイル、またはサービスアノテーションのいずれかを使用して宣言できます。

### Helm

以下の手順に従って、Kubernetes クラスターに [Datadog Cluster Agent][1] をインストールしてください。お使いのアカウントや環境に合わせて値を変更してください。

1. Helm の [Datadog Agent インストール手順][3]に従います。
2. YAML コンフィギュレーションファイル (Cluster Agent インストール手順の `datadog-values.yaml`) を更新して、以下を含めます。
    ```yaml
    clusterAgent:
      confd:
        postgres.yaml: |-
          cluster_check: true
          init_config:
          instances:
            - dbm: true
              host: '<AWS_INSTANCE_ENDPOINT>'
              port: 5432
              username: datadog
              password: 'ENC[datadog_user_database_password]'
              ## Required: For Postgres 9.6, uncomment these lines to use the functions created in the setup
              # pg_stat_statements_view: datadog.pg_stat_statements()
              # pg_stat_activity_view: datadog.pg_stat_activity()

    clusterChecksRunner:
      enabled: true
    ```

    Postgres 9.6 の場合、ホストとポートが指定されているインスタンスの config に以下の設定を追加します。

    ```yaml
    pg_stat_statements_view: datadog.pg_stat_statements()
    pg_stat_activity_view: datadog.pg_stat_activity()
    ```

3. コマンドラインから上記のコンフィギュレーションファイルを使用して Agent をデプロイします。
    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Windows の場合は、<code>helm install</code> コマンドに <code>--set targetSystem=windows</code> を追加します。
</div>

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/getting_started/site
[3]: /ja/containers/kubernetes/installation/?tab=helm#installation

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
          "password": "ENC[datadog_user_database_password]"
        }
      ]
spec:
  ports:
  - port: 5432
    protocol: TCP
    targetPort: 5432
    name: postgres
```
<div class="alert alert-warning"><strong>重要</strong>: ここでは、Aurora クラスターのエンドポイントではなく、Aurora インスタンスのエンドポイントを使用してください。</div>

複数のインスタンスを構成するには、以下の形式を使用できます。

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    ad.datadoghq.com/service.checks: |
      { 
        "postgres": 
        { "instances": 
          [ 
            { 
              "dbm":true, 
              "host":"your-host-1.us-east-2.rds.amazonaws.com", 
              "password":"ENC[datadog_user_database_password]", 
              "port":5432, 
              "username":"<USERNAME>" 
            }, 
            { 
              "dbm":true, 
              "host":"your-host-2.us-east-2.rds.amazonaws.com", 
              "password":"ENC[datadog_user_database_password]", 
              "port":5432, 
              "username": "<USERNAME>" 
            } 
          ] 
        } 
      }
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

[Agent の status サブコマンドを実行][9]し、Checks セクションで `postgres` を探します。または、[データベース][10]のページを参照してください。
## Agent の構成例
{{% dbm-postgres-agent-config-examples %}}
## RDS インテグレーションをインストール

DBM でデータベースのテレメトリーとともに CPU などの AWS からのインフラストラクチャーメトリクスを直接確認するには、[RDS インテグレーション][11]をインストールします (オプション)。


## トラブルシューティング

インテグレーションと Agent を手順通りにインストール・設定しても期待通りに動作しない場合は、[トラブルシューティング][12]を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/database_monitoring/agent_integration_overhead/?tab=postgres
[2]: /ja/database_monitoring/data_collected/#sensitive-information
[3]: https://www.postgresql.org/docs/current/config-setting.html
[4]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_WorkingWithParamGroups.html
[5]: https://www.postgresql.org/docs/current/pgstatstatements.html
[6]: /ja/integrations/faq/postgres-custom-metric-collection-explained/
[7]: https://www.postgresql.org/docs/current/app-psql.html
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[10]: https://app.datadoghq.com/databases
[11]: /ja/integrations/amazon_rds
[12]: /ja/database_monitoring/troubleshooting/?tab=postgres
[13]: /ja/database_monitoring/guide/managed_authentication