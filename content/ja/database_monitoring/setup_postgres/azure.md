---
description: Azure 上で管理される PostgreSQL 用のデータベースモニタリングをインストールし、構成します。
further_reading:
- link: /integrations/postgres/
  tag: ドキュメント
  text: Postgres インテグレーションの基本
kind: documentation
title: Azure Database for PostgreSQL のデータベースモニタリングの設定
---

{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">データベースモニタリングはこのサイトでサポートされていません。</div>
{{< /site-region >}}

データベースモニタリングは、クエリメトリクス、クエリサンプル、実行計画、データベースの状態、フェイルオーバー、イベントを公開することで、Postgres データベースを詳細に可視化します。

Agent は、読み取り専用のユーザーとしてログインすることでデータベースから直接テレメトリーを収集します。Postgres データベースでデータベースモニタリングを有効にするには、以下の設定を行ってください。

1. [データベースのパラメーターを構成する](#configure-postgres-settings)
1. [Agent にデータベースへのアクセスを付与する](#grant-the-agent-access)
1. [Agent をインストールする](#install-the-agent)
1. [Azure PostgreSQL インテグレーションをインストールする](#install-the-azure-postgresql-integration)

## はじめに

サポート対象の PostgreSQL バージョン
: 9.6、10、11、12、13

サポートされる Azure PostgreSQL のデプロイメントタイプ
: Azure VM 上の PostgreSQL、シングルサーバー、フレキシブルサーバー

サポート対象の Agent バージョン
: 7.36.1+

パフォーマンスへの影響
: データベースモニタリングのデフォルトの Agent コンフィギュレーションは保守的ですが、収集間隔やクエリのサンプリングレートなどの設定を調整することで、よりニーズに合ったものにすることができます。ワークロードの大半において、Agent はデータベース上のクエリ実行時間の 1 % 未満、および CPU の 1 % 未満を占めています。<br/><br/>
データベースモニタリングは、ベースとなる Agent 上のインテグレーションとして動作します ([ベンチマークを参照][1]してください)。

プロキシ、ロードバランサー、コネクションプーラー
: Agent は、監視対象のホストに直接接続する必要があります。セルフホスト型のデータベースでは、`127.0.0.1` またはソケットを使用することをお勧めします。Agent をプロキシ、ロードバランサー、また `pgbouncer` などのコネクションプーラーを経由してデータベースに接続しないようご注意ください。クライアントアプリケーションのアンチパターンとなる可能性があります。また、各 Agent は基礎となるホスト名を把握し、フェイルオーバーの場合でも常に 1 つのホストのみを使用する必要があります。Datadog Agent が実行中に異なるホストに接続すると、メトリクス値の正確性が失われます。

データセキュリティへの配慮
: Agent がお客様のデータベースからどのようなデータを収集するか、またそのデータの安全性をどのように確保しているかについては、[機密情報][2]を参照してください。

## Postgres 設定を構成する

[サーバーパラメーター][4]で以下の[パラメーター][3]を構成し、**サーバーを再起動**することで設定が有効になります。

{{< tabs >}}
{{% tab "シングルサーバー" %}}

| パラメーター | 値 | 説明 |
| --- | --- | --- |
| `track_activity_query_size` | `4096` | より大きなクエリを収集するために必要です。`pg_stat_activity` および `pg_stat_statements` の SQL テキストのサイズを拡大します。 デフォルト値のままだと、`1024` 文字よりも長いクエリは収集されません。 |
| `pg_stat_statements.track` | `ALL` | オプションです。ストアドプロシージャや関数内のステートメントを追跡することができます。 |
| `pg_stat_statements.max` | `10000` | オプションです。`pg_stat_statements` で追跡する正規化されたクエリの数を増やします。この設定は、多くの異なるクライアントからさまざまな種類のクエリが送信される大容量のデータベースに推奨されます。 |
| `track_io_timing` | `on` | オプション。クエリのブロックの読み取りおよび書き込み時間の収集を有効にします。 |

{{% /tab %}}
{{% tab "フレキシブルサーバー" %}}

| パラメーター            | 値 | 説明 |
|----------------------| -- | --- |
| `azure.extensions` | `pg_stat_statements` | `postgresql.queries.*` メトリクスに対して必要です。[pg_stat_statements][1] 拡張機能を使用して、クエリメトリクスの収集を可能にします。 |
| `track_activity_query_size` | `4096` | より大きなクエリを収集するために必要です。`pg_stat_activity` および `pg_stat_statements` の SQL テキストのサイズを拡大します。 デフォルト値のままだと、`1024` 文字よりも長いクエリは収集されません。 |
| `pg_stat_statements.track` | `ALL` | オプションです。ストアドプロシージャや関数内のステートメントを追跡することができます。 |
| `pg_stat_statements.max` | `10000` | オプションです。`pg_stat_statements` で追跡する正規化されたクエリの数を増やします。この設定は、多くの異なるクライアントからさまざまな種類のクエリが送信される大容量のデータベースに推奨されます。 |
| `track_io_timing` | `on` | オプション。クエリのブロックの読み取りおよび書き込み時間の収集を有効にします。 |

[1]: https://www.postgresql.org/docs/current/pgstatstatements.html
{{% /tab %}}
{{< /tabs >}}

## Agent にアクセスを付与する

Datadog Agent が統計やクエリを収集するためには、データベース サーバーへの読み取り専用のアクセスが必要となります。

Agent が接続するデータベースサーバー上の PostgreSQL データベースを選択します。Agent は、どのデータベースに接続してもデータベースサーバー上のすべてのデータベースからテレメトリーを収集することができるため、デフォルトの `postgres` データベースを使用することをお勧めします。[そのデータベースに対して、固有のデータに対するカスタムクエリ]を Agentで実行する必要がある場合のみ別のデータベースを選択してください[5]。

選択したデータベースに、スーパーユーザー (または十分な権限を持つ他のユーザー) として接続します。例えば、選択したデータベースが `postgres` である場合は、次のように実行して [psql][6] を使用する `postgres` ユーザーとして接続します。

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

`datadog` ユーザーを作成します。

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

{{< tabs >}}
{{% tab "Postgres ≥ 10" %}}

**すべてのデータベース**に以下のスキーマを作成します。

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

**すべてのデータベース**に以下のスキーマを作成します。

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT SELECT ON pg_stat_database TO datadog;
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

**注意**: 追加のテーブルへの問い合わせを必要とするカスタムメトリクスを生成する場合は、それらのテーブルに対する `SELECT` 権限を `datadog` ユーザーに付与する必要があります。例: `grant SELECT on <TABLE_NAME> to datadog;`。詳細は [PostgreSQL カスタムメトリクス収集][5]の説明を参照してください。

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
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```
{{% /tab %}}
{{% tab "Postgres 9.6" %}}

```shell
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

{{% /tab %}}
{{< /tabs >}}

パスワードの入力を求められた場合は、`datadog` ユーザーを作成したときに入力したパスワードを使用してください。

## Agent のインストール

Azure Postgres データベースを監視するには、インフラストラクチャーに Datadog Agent をインストールし、各インスタンスのエンドポイントにリモートで接続するよう構成します。Agent はデータベース上で動作する必要はなく、データベースに接続するだけで問題ありません。ここに記載されていないその他の Agent のインストール方法については、[Agent のインストール手順][7]を参照してください。

{{< tabs >}}
{{% tab "Host" %}}

ホスト上で実行されている Agent のデータベースモニタリングメトリクスの収集を構成するには、次の手順に従ってください。(Agent で Azure データベースからメトリクスを収集するために小規模な仮想マシンをプロビジョニングする場合など)

1. `postgres.d/conf.yaml` ファイルを編集して、`host` / `port` を指定し、監視するマスターを設定します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル postgres.d/conf.yaml][1] を参照してください。
   ```yaml
   init_config:
   instances:
     - dbm: true
       host: '<AZURE_INSTANCE_ENDPOINT>'
       port: 5432
       username: datadog
       password: '<PASSWORD>'
       ## Required for Postgres 9.6: Uncomment these lines to use the functions created in the setup
       # pg_stat_statements_view: datadog.pg_stat_statements()
       # pg_stat_activity_view: datadog.pg_stat_activity()
       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'

       # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
       azure:
        deployment_type: '<DEPLOYMENT_TYPE>'
        name: '<YOUR_INSTANCE_NAME>'
   ```
2. [Agent を再起動します][2]。

`deployment_type` と `name` フィールドの設定に関する追加情報は、[Postgres インテグレーション仕様][3]を参照してください。

[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: /ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://github.com/DataDog/integrations-core/blob/master/postgres/assets/configuration/spec.yaml#L446-L474
{{% /tab %}}
{{% tab "Docker" %}}

Docker コンテナで動作するデータベースモニタリング Agent を設定するには、Agent コンテナの Docker ラベルとして[オートディスカバリーのインテグレーションテンプレート][1]を設定します。

**注**: ラベルのオートディスカバリーを機能させるためには、Agent にDocker ソケットに対する読み取り権限が与えられている必要があります。

### コマンドライン

次のコマンドを実行して、コマンドラインから Agent を実行します。お使いのアカウントや環境に合わせて値を変更してください。

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=7.36.1

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["postgres"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<AZURE_INSTANCE_ENDPOINT>",
    "port": 5432,
    "username": "datadog",
    "password": "<UNIQUEPASSWORD>",
    "azure": {
      "deployment_type": "<DEPLOYMENT_TYPE>",
      "name": "<YOUR_INSTANCE_NAME>"
    }
  }]' \
  datadog/agent:${DD_AGENT_VERSION}
```

Postgres 9.6 の場合、ホストとポートが指定されているインスタンスの config に以下の設定を追加します。

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

### Dockerfile

`Dockerfile` ではラベルの指定も可能であるため、インフラストラクチャーのコンフィギュレーションを変更することなく、カスタム Agent を構築・デプロイすることができます。

```Dockerfile
FROM datadog/agent:7.36.1

LABEL "com.datadoghq.ad.check_names"='["postgres"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AZURE_INSTANCE_ENDPOINT>", "port": 3306,"username": "datadog","password": "<UNIQUEPASSWORD>", "azure": {"deployment_type": "<DEPLOYMENT_TYPE>", "name": "<YOUR_INSTANCE_NAME>"}}]'
```

Postgres 9.6 の場合、ホストとポートが指定されているインスタンスの config に以下の設定を追加します。

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

`deployment_type` と `name` フィールドの設定に関する追加情報は、[Postgres インテグレーション仕様][2]を参照してください。

`datadog` ユーザーのパスワードをプレーンテキストで公開しないようにするには、Agent の[シークレット管理パッケージ][3]を使用し、`ENC[]` 構文を使ってパスワードを宣言するか、[オートディスカバリーテンプレート変数に関するドキュメント][4]でパスワードを環境変数として渡す方法をご確認ください。


[1]: /ja/agent/docker/integrations/?tab=docker
[2]: https://github.com/DataDog/integrations-core/blob/master/postgres/assets/configuration/spec.yaml#L446-L474
[3]: /ja/agent/guide/secrets-management
[4]: /ja/agent/faq/template_variables/
{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes クラスターをお使いの場合は、データベースモニタリング用の [Datadog Cluster Agent][1] をご利用ください。

Kubernetes クラスターでまだチェックが有効になっていない場合は、手順に従って[クラスターチェックを有効][2]にしてください。Postgres のコンフィギュレーションは、Cluster Agent コンテナにマウントされた静的ファイル、またはサービスアノテーションを使用して宣言できます。

### Helm のコマンドライン

以下の [Helm][3] コマンドを実行して、Kubernetes クラスターに [Datadog Cluster Agent][1] をインストールします。お使いのアカウントや環境に合わせて値を変更してください。

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update

helm install <RELEASE_NAME> \
  --set 'datadog.apiKey=<DATADOG_API_KEY>' \
  --set 'clusterAgent.enabled=true' \
  --set "clusterAgent.confd.postgres\.yaml=cluster_check: true
init_config:
instances:
  - dbm: true
    host: <AZURE_INSTANCE_ENDPOINT>
    port: 5432
    username: datadog
    password: "<UNIQUEPASSWORD>"
    azure:
      deployment_type: "<DEPLOYMENT_TYPE>"
      name: "<YOUR_INSTANCE_NAME>" \
  datadog/datadog
```

Postgres 9.6 の場合、ホストとポートが指定されているインスタンスの config に以下の設定を追加します。

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

### マウントされたファイルで構成する

マウントされたコンフィギュレーションファイルを使ってクラスターチェックを構成するには、コンフィギュレーションファイルを Cluster Agent コンテナのパス `/conf.d/postgres.yaml` にマウントします。

```yaml
cluster_check: true  # このフラグを必ず入れてください
init_config:
instances:
  - dbm: true
    host: '<AZURE_INSTANCE_ENDPOINT>'
    port: 5432
    username: datadog
    password: '<PASSWORD>'
    # プロジェクトとインスタンスを追加した後、CPU、メモリなどの追加のクラウドデータをプルするために Datadog Azure インテグレーションを構成します。
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      name: '<YOUR_INSTANCE_NAME>'

    ## 必須。Postgres 9.6 の場合、セットアップで作成した関数を使用するため、以下の行をコメント解除します
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
          "host": "<AZURE_INSTANCE_ENDPOINT>",
          "port": 5432,
          "username": "datadog",
          "password": "<UNIQUEPASSWORD>",
          "azure": {
            "deployment_type": "<DEPLOYMENT_TYPE>",
            "name": "<YOUR_INSTANCE_NAME>"
          }
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

`deployment_type` と `name` フィールドの設定に関する追加情報は、[Postgres インテグレーション仕様][4]を参照してください。

Cluster Agent は自動的にこのコンフィギュレーションを登録し、Postgres チェックを開始します。

`datadog` ユーザーのパスワードをプレーンテキストで公開しないよう、Agent の[シークレット管理パッケージ][5]を使用し、`ENC[]` 構文を使ってパスワードを宣言します。

[1]: /ja/agent/cluster_agent
[2]: /ja/agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: https://github.com/DataDog/integrations-core/blob/master/postgres/assets/configuration/spec.yaml#L446-L474
[5]: /ja/agent/guide/secrets-management
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `postgres` を探します。または、[データベース][9]のページを参照してください。

## Azure PostgreSQL インテグレーションをインストールする

Azure からより包括的なデータベースメトリクスを収集するには、[Azure PostgreSQL インテグレーション][10]をインストールします (オプション)。

## トラブルシューティング

インテグレーションと Agent を手順通りにインストール・設定しても期待通りに動作しない場合は、[トラブルシューティング][11]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/agent/basic_agent_usage#agent-overhead
[2]: /ja/database_monitoring/data_collected/#sensitive-information
[3]: https://www.postgresql.org/docs/current/config-setting.html
[4]: https://docs.microsoft.com/en-us/azure/postgresql/howto-configure-server-parameters-using-portal
[5]: /ja/integrations/faq/postgres-custom-metric-collection-explained/
[6]: https://www.postgresql.org/docs/current/app-psql.html
[7]: https://app.datadoghq.com/account/settings#agent
[8]: /ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://app.datadoghq.com/databases
[10]: /ja/integrations/azure_db_for_postgresql/
[11]: /ja/database_monitoring/setup_postgres/troubleshooting/