---
description: Aurora で管理される MySQL のデータベースモニタリングをインストールして構成します。
further_reading:
- link: /integrations/mysql/
  tag: ドキュメント
  text: 基本的な MySQL インテグレーション
kind: documentation
title: Aurora マネージド MySQL のデータベースモニタリングの設定
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring はこのサイトでサポートされていません。</div>
{{< /site-region >}}


Database Monitoring は、InnoDB ストレージエンジンのクエリメトリクス、クエリサンプル、実行計画、接続データ、システムメトリクス、テレメトリを公開することにより、MySQL データベースの詳細な可視性を提供します。

Agent は、読み取り専用のユーザーとしてログインすることでデータベースから直接テレメトリーを収集します。MySQL データベースで Database Monitoring を有効にするには、以下の設定を行ってください。

1. [データベースのパラメーターを構成する](#configure-mysql-settings)
2. [Agent にデータベースへのアクセスを付与する](#grant-the-agent-access)
3. [Agent をインストールする](#install-the-agent)
4. [RDS インテグレーションをインストールする](#install-the-rds-integration)

## はじめに

サポートされている MySQL バージョン
: 5.6、5.7、8.0 以降

サポートされている Agent バージョン
: 7.36.1 以降

パフォーマンスへの影響
: Database Monitoring のデフォルトの Agent 構成は保守的ですが、収集間隔やクエリのサンプリングレートなどの設定を調整することで、よりニーズに合ったものにすることができます。ワークロードの大半において、Agent はデータベース上のクエリ実行時間の 1 % 未満、CPU の 1 % 未満を占めています。<br/><br/>
Database Monitoring は、ベースとなる Agent 上のインテグレーションとして動作します ([ベンチマークを参照][1]してください)。

プロキシ、ロードバランサー、コネクションプーラー
: Datadog Agent は、監視対象のホストに直接接続する必要があり、できればインスタンスエンドポイントを通じて行うことが望ましいです。Agent をプロキシ、ロードバランサー、コネクションプーラー、または **Aurora クラスターエンドポイント**を経由してデータベースに接続しないでください。クラスターエンドポイントに接続されている場合、Agent はランダムな 1 つのレプリカからデータを収集し、そのレプリカの可視性だけを提供します。Agent が実行中に異なるホストに接続した場合 (フェイルオーバーやロードバランシングなどの場合)、Agent は 2 つのホスト間の統計の差を計算し、不正確なメトリクスを生成します。

データセキュリティへの配慮
: Agent がデータベースから収集するデータの種類や、そのデータの安全性をどのように保証するかについては、[機密情報][2]をご覧ください。


## MySQL 設定を構成する

[DB パラメーターグループ][3]で以下の設定を行い、**サーバーを再起動**すると設定が反映されます。

{{< tabs >}}
{{% tab "MySQL 5.6" %}}
| パラメーター | 値 | 説明 |
| --- | --- | --- |
| `performance_schema` | `1` | 必須。[パフォーマンススキーマ][1]を有効にします。|
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_current</code> | `1` | 必須。現在実行中のクエリのモニタリングを可能にします。|
| <code style="word-break:break-all;">performance-schema-consumer-events-waits-current</code> | `ON` | 必須。待機イベントの収集を有効にします。 |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_history</code> | `1` | オプション。スレッドごとに最近のクエリの履歴を追跡することができます。この機能を有効にすると、頻度の低いクエリの実行情報を取得できる可能性が高まります。|
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_history_long</code> | `1` | オプション。すべてのスレッドにおいて、より多くの最近のクエリを追跡することができます。この機能を有効にすると、頻度の低いクエリの実行情報を取得できる可能性が高まります。|

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}

{{% tab "MySQL ≥ 5.7" %}}
| パラメーター | 値 | 説明 |
| --- | --- | --- |
| `performance_schema` | `1` | 必須。[パフォーマンススキーマ][1]を有効にします。|
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_current</code> | `1` | 必須。現在実行中のクエリのモニタリングを可能にします。|
| <code style="word-break:break-all;">performance-schema-consumer-events-waits-current</code> | `ON` | 必須。待機イベントの収集を有効にします。 |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_history</code> | `1` | オプション。スレッドごとに最近のクエリの履歴を追跡することができます。この機能を有効にすると、頻度の低いクエリの実行情報を取得できる可能性が高まります。|
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_history_long</code> | `1` | オプション。すべてのスレッドにおいて、より多くの最近のクエリを追跡することができます。この機能を有効にすると、頻度の低いクエリの実行情報を取得できる可能性が高まります。|
| <code style="word-break:break-all;">performance_schema_max_digest_length</code> | `4096` | `events_statements_*` テーブルの SQL ダイジェストテキストのサイズを増やします。デフォルト値のままにすると、`1024` 文字より長いクエリは収集されません。|
| <code style="word-break:break-all;">performance_schema_max_sql_text_length</code> | `4096` | <code style="word-break:break-all;">performance_schema_max_digest_length</code> と一致する必要があります。|

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}
{{< /tabs >}}

**注**: Agent へのアクセス権限付与の一貫として、Agent がランタイム時に動的に `performance-schema-consumer-*` 設定を有効にできるようにすることを推奨します。[ランタイムセットアップコンシューマー](#runtime-setup-consumers)を参照してください。

## Agent にアクセスを付与する

Datadog Agent が統計やクエリを収集するためには、データベースへの読み取り専用のアクセスが必要となります。

次の手順では、`datadog@'%'` を使用して任意のホストからログインする権限を Agent に付与します。`datadog@'localhost'` を使用して、`datadog` ユーザーが localhost からのみログインできるように制限できます。詳細については、[MySQL ドキュメント][4]を参照してください。

{{< tabs >}}
{{% tab "MySQL 5.6" %}}

`datadog` ユーザーを作成し、基本的な権限を付与します。

```sql
CREATE USER datadog@'%' IDENTIFIED BY '<UNIQUEPASSWORD>';
GRANT REPLICATION CLIENT ON *.* TO datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{% tab "MySQL ≥ 5.7" %}}

`datadog` ユーザーを作成し、基本的な権限を付与します。

```sql
CREATE USER datadog@'%' IDENTIFIED by '<UNIQUEPASSWORD>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{< /tabs >}}

次のスキーマを作成します。

```sql
CREATE SCHEMA IF NOT EXISTS datadog;
GRANT EXECUTE ON datadog.* to datadog@'%';
GRANT CREATE TEMPORARY TABLES ON datadog.* TO datadog@'%';
```

Agent が実行計画を収集できるように、 `explain_statement` プロシージャを作成します。

```sql
DELIMITER $$
CREATE PROCEDURE datadog.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
```

さらに、実行計画を収集する**すべてのスキーマ**でこのプロシージャを作成します。`<YOUR_SCHEMA>` をデータベーススキーマに置き換えます。

```sql
DELIMITER $$
CREATE PROCEDURE <YOUR_SCHEMA>.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE <YOUR_SCHEMA>.explain_statement TO datadog@'%';
```

### ランタイムセットアップコンシューマー
Datadog では、ランタイムで  `performance_schema.events_*` コンシューマーを有効にする機能を Agent に与えるために、次のプロシージャを作成することをお勧めしています。

```SQL
DELIMITER $$
CREATE PROCEDURE datadog.enable_events_statements_consumers()
    SQL SECURITY DEFINER
BEGIN
    UPDATE performance_schema.setup_consumers SET enabled='YES' WHERE name LIKE 'events_statements_%';
    UPDATE performance_schema.setup_consumers SET enabled='YES' WHERE name = 'events_waits_current';
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE datadog.enable_events_statements_consumers TO datadog@'%';
```

## Agent のインストール

Aurora ホストを監視するには、インフラストラクチャーに Datadog Agent をインストールし、各インスタンスのエンドポイントにリモートで接続するように構成します。Agent はデータベース上で動作する必要はなく、データベースに接続するだけで問題ありません。ここに記載されていないその他の Agent のインストール方法については、[Agent のインストール手順][5]を参照してください。

{{< tabs >}}
{{% tab "ホスト" %}}

ホストで実行されている Agent に対してこのチェックを設定するには (Agent が Aurora データベースから収集するように小さな EC2 インスタンスをプロビジョニングする場合など)

[Agent の構成ディレクトリ][1]のルートにある `conf.d/` フォルダーの `mysql.d/conf.yaml` ファイルを編集します。カスタムメトリクスのオプションなど、使用可能なすべての構成オプションについては、[サンプル mysql.d/conf.yaml][2] を参照してください。

MySQL メトリクスを収集するには、`mysql.d/conf.yaml` に次の構成ブロックを追加します。

```yaml
init_config:

instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: 3306
    username: datadog
    password: '<YOUR_CHOSEN_PASSWORD>' # 前の CREATE USER ステップから

# プロジェクトとインスタンスを追加した後、CPU やメモリなどの追加のクラウドデータをプルできるよう、Datadog AWS インテグレーションを構成します。
aws:
instance_endpoint: '<AWS_INSTANCE_ENDPOINT>'
```

<div class="alert alert-warning"><strong>重要</strong>: ここでは、クラスターのエンドポイントではなく、Aurora インスタンスのエンドポイントを使用します。</div>

**注**: パスワードに特殊文字が含まれる場合は、単一引用符で囲んでください。

[Agent を再起動][3]すると、Datadog への MySQL メトリクスの送信が開始されます。


[1]: /ja/agent/configuration/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[3]: /ja/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
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
  -l com.datadoghq.ad.check_names='["mysql"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<AWS_INSTANCE_ENDPOINT>",
    "port": 3306,
    "username": "datadog",
    "password": "<UNIQUEPASSWORD>"
  }]' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

### Dockerfile

`Dockerfile` ではラベルの指定も可能であるため、インフラストラクチャーのコンフィギュレーションを変更することなく、カスタム Agent を構築・デプロイすることができます。

```Dockerfile
FROM gcr.io/datadoghq/agent:7.36.1

LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AWS_INSTANCE_ENDPOINT>", "port": 3306,"username": "datadog","password": "<UNIQUEPASSWORD>"}]'
```

<div class="alert alert-warning"><strong>重要</strong>: クラスターのエンドポイントではなく、Aurora インスタンスのエンドポイントをホストとして使用します。</div>

`datadog` ユーザーのパスワードをプレーンテキストで公開しないようにするには、Agent の[シークレット管理パッケージ][2]を使用し、`ENC[]` 構文を使ってパスワードを宣言するか、[オートディスカバリーテンプレート変数に関するドキュメント][3]でパスワードを環境変数として渡す方法をご確認ください。


[1]: /ja/agent/docker/integrations/?tab=docker
[2]: /ja/agent/configuration/secrets-management
[3]: /ja/agent/faq/template_variables/
{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes クラスターをお使いの場合は、データベースモニタリング用の [Datadog Cluster Agent][1] をご利用ください。

Kubernetes クラスターでまだチェックが有効になっていない場合は、手順に従って[クラスターチェックを有効][2]にしてください。MySQL のコンフィギュレーションは、Cluster Agent コンテナにマウントされた静的ファイル、またはサービスアノテーションのいずれかを使用して宣言できます。

### Helm のコマンドライン

以下の [Helm][3] コマンドを実行して、Kubernetes クラスターに [Datadog Cluster Agent][1] をインストールします。お使いのアカウントや環境に合わせて値を変更してください。

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update

helm install <RELEASE_NAME> \
  --set 'datadog.apiKey=<DATADOG_API_KEY>' \
  --set 'clusterAgent.enabled=true' \
  --set 'clusterAgent.confd.mysql\.yaml=cluster_check: true
init_config:
instances:
  - dbm: true
    host: <INSTANCE_ADDRESS>
    port: 3306
    username: datadog
    password: "<UNIQUEPASSWORD>"' \
  datadog/datadog
```

### マウントされたファイルで構成する

マウントされたコンフィギュレーションファイルを使ってクラスターチェックを構成するには、コンフィギュレーションファイルを Cluster Agent コンテナのパス `/conf.d/mysql.yaml` にマウントします。

```yaml
cluster_check: true  # このフラグを必ず含めてください
init_config:
instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: 3306
    username: datadog
    password: '<UNIQUEPASSWORD>'
```

### Kubernetes サービスアノテーションで構成する

ファイルをマウントせずに、インスタンスのコンフィギュレーションをKubernetes サービスとして宣言することができます。Kubernetes 上で動作する Agent にこのチェックを設定するには、Datadog Cluster Agent と同じネームスペースにサービスを作成します。


```yaml
apiVersion: v1
kind: Service
metadata:
  name: mysql
  labels:
    tags.datadoghq.com/env: '<ENV>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/service.check_names: '["mysql"]'
    ad.datadoghq.com/service.init_configs: '[{}]'
    ad.datadoghq.com/service.instances: |
      [
        {
          "dbm": true,
          "host": "<AWS_INSTANCE_ENDPOINT>",
          "port": 3306,
          "username": "datadog",
          "password": "<UNIQUEPASSWORD>"
        }
      ]
spec:
  ports:
  - port: 3306
    protocol: TCP
    targetPort: 3306
    name: mysql
```
<div class="alert alert-warning"><strong>重要</strong>: ここでは、Aurora クラスターのエンドポイントではなく、Aurora インスタンスのエンドポイントを使用してください。</div>

Cluster Agent は自動的にこのコンフィギュレーションを登録し、MySQL チェックを開始します。

`datadog` ユーザーのパスワードをプレーンテキストで公開しないよう、Agent の[シークレット管理パッケージ][4]を使用し、構文を使ってパスワードを宣言します。

[1]: /ja/agent/cluster_agent
[2]: /ja/agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: /ja/agent/configuration/secrets-management
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `mysql` を探します。または、[データベース][7]のページを参照してください。

## Agent の構成例
{{% dbm-mysql-agent-config-examples %}}

## RDS インテグレーションをインストール

DBM でデータベースのテレメトリーとともに CPU などの AWS からのインフラストラクチャーメトリクスを確認するには、[RDS インテグレーション][8]をインストールします (オプション)。

## トラブルシューティング

インテグレーションと Agent を手順通りにインストール・設定しても期待通りに動作しない場合は、[トラブルシューティング][9]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/agent/basic_agent_usage#agent-overhead
[2]: /ja/database_monitoring/data_collected/#sensitive-information
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_WorkingWithParamGroups.html
[4]: https://dev.mysql.com/doc/refman/5.7/en/creating-accounts.html
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[7]: https://app.datadoghq.com/databases
[8]: /ja/integrations/amazon_rds
[9]: /ja/database_monitoring/troubleshooting/?tab=mysql