---
description: Amazon RDS で管理される MySQL のデータベースモニタリングをインストールして構成します。
further_reading:
- link: /integrations/mysql/
  tag: ドキュメント
  text: 基本的な MySQL インテグレーション
title: Amazon RDS マネージド MySQL のデータベースモニタリングの設定
---

データベースモニタリングは、InnoDB ストレージエンジンのクエリメトリクス、クエリサンプル、説明プラン、接続データ、システムメトリクス、テレメトリを公開することにより、MySQL データベースの詳細な可視性を提供します。

Agent は、読み取り専用のユーザーとしてログインすることでデータベースから直接テレメトリーを収集します。MySQL データベースでデータベースモニタリングを有効にするには、以下の設定を行ってください。

1. [AWS インテグレーションを構成する](#configure-the-aws-integration)
1. [データベースのパラメーターを構成する](#configure-mysql-settings)
1. [Agent にデータベースへのアクセスを付与する](#grant-the-agent-access)
1. [Agent をインストールする](#install-the-agent)
1. [RDS インテグレーションをインストールする](#install-the-rds-integration)

## はじめに

サポートされている MySQL バージョン
: 5.6、5.7、または 8.0+

サポート対象の Agent バージョン
: 7.36.1+

パフォーマンスへの影響
: データベースモニタリングのデフォルトの Agent コンフィギュレーションは保守的ですが、収集間隔やクエリのサンプリングレートなどの設定を調整することで、よりニーズに合ったものにすることができます。ワークロードの大半において、Agent はデータベース上のクエリ実行時間の 1 % 未満、および CPU の 1 % 未満を占めています。<br/><br/>
データベースモニタリングは、ベースとなる Agent 上のインテグレーションとして動作します ([ベンチマークを参照][1]してください)。

プロキシ、ロードバランサー、コネクションプーラー
: Datadog Agent は、監視対象のホストにできればインスタンスエンドポイントを通じて直接接続する必要があります。Agent は、プロキシ、ロードバランサー、またはコネクションプーラーを介してデータベースに接続すべきではありません。Agent が実行中に異なるホストに接続すると (フェイルオーバーやロードバランシングなどの場合)、Agent は 2 つのホスト間で統計情報の差を計算し、不正確なメトリクスを生成します。

データセキュリティへの配慮
: Agent がお客様のデータベースからどのようなデータを収集するか、またそのデータの安全性をどのように確保しているかについては、[機密情報][2]を参照してください。

## AWS インテグレーションの構成

[Amazon Web Services インテグレーションタイル][10]の **Resource Collection** セクションで **Standard Collection** を有効にします。

## MySQL 設定を構成する

[DB パラメーターグループ][3]で以下を構成してから、設定を有効にするために**サーバーを再起動**します。

{{< tabs >}}
{{% tab "MySQL 5.6" %}}
| パラメーター | 値 | 説明 |
| --- | --- | --- |
| `performance_schema` | `1` | 必須。[パフォーマンススキーマ][1]を有効にします。 |
| `max_digest_length` | `4096` | より大きなクエリの収集に必要です。`events_statements_*` テーブルの SQL ダイジェストテキストのサイズを増やします。デフォルト値のままにすると、`1024` 文字より長いクエリは収集されません。 |
| `performance_schema_max_digest_length` | `4096` | `max_digest_length` と一致する必要があります。 |


[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}

{{% tab "MySQL ≥ 5.7" %}}
| パラメーター | 値 | 説明 |
| --- | --- | --- |
| `performance_schema` | `1` | 必須。[パフォーマンススキーマ][1]を有効にします。 |
| `max_digest_length` | `4096` | より大きなクエリの収集に必要です。`events_statements_*` テーブルの SQL ダイジェストテキストのサイズを増やします。デフォルト値のままにすると、`1024` 文字より長いクエリは収集されません。 |
| `performance_schema_max_digest_length` | `4096` | `max_digest_length` と一致する必要があります。 |
| `performance_schema_max_sql_text_length` | `4096` | `max_digest_length` と一致する必要があります。 |

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}
{{< /tabs >}}

## Agent にアクセスを付与する

Datadog Agent が統計やクエリを収集するためには、データベースへの読み取り専用のアクセスが必要となります。

次の手順では、`datadog@'%'` を使用して任意のホストからログインするアクセス許可を Agent に付与します。`datadog@'localhost'` を使用して、`datadog` ユーザーが localhost からのみログインできるように制限できます。詳細については、[MySQL ドキュメント][4]を参照してください。

{{< tabs >}}
{{% tab "MySQL 5.6" %}}

`datadog` ユーザーを作成し、基本的なアクセス許可を付与します。

```sql
CREATE USER datadog@'%' IDENTIFIED BY '<UNIQUEPASSWORD>';
GRANT REPLICATION CLIENT ON *.* TO datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{% tab "MySQL ≥ 5.7" %}}

`datadog` ユーザーを作成し、基本的なアクセス許可を付与します。

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

Agent が説明プランを収集できるようにするには、`explain_statement` プロシージャを作成します。

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

さらに、説明プランを収集する**すべてのスキーマ**でこのプロシージャを作成します。`<YOUR_SCHEMA>` をデータベーススキーマに置き換えます。

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
RDS を使用すると、パフォーマンススキーマコンシューマーをコンフィギュレーションで永続的に有効にすることはできません。次のプロシージャを作成して、ランタイムで `performance_schema.events_*` コンシューマーを有効にする機能を Agent に提供します。

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

RDS ホストを監視するには、インフラストラクチャーに Datadog Agent をインストールし、各インスタンスのエンドポイントにリモートで接続するよう構成します。Agent はデータベース上で動作する必要はなく、データベースに接続するだけで問題ありません。ここに記載されていないその他の Agent のインストール方法については、[Agent のインストール手順][5]を参照してください。

{{< tabs >}}
{{% tab "ホスト" %}}

ホストで実行されている Agent に対してこのチェックを設定するには (Agent が RDS データベースから収集するように小さな EC2 インスタンスをプロビジョニングする場合など)

[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `mysql.d/conf.yaml` ファイルを編集して、MySQL メトリクスの収集を開始します。カスタムメトリクスに対するものを含む、使用可能な全コンフィギュレーションオプションの詳細については、[サンプル mysql.d/conf.yaml][2] を参照してください。

MySQL メトリクスを収集するには、`mysql.d/conf.yaml` に次のコンフィギュレーションブロックを追加します。

```yaml
init_config:

instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: 3306
    username: datadog
    password: '<YOUR_CHOSEN_PASSWORD>' # 先ほどの CREATE USER のステップから

     # プロジェクトとインスタンスを追加した後、CPU やメモリなどの追加のクラウドデータをプルするために Datadog AWS インテグレーションを構成します。
    aws:
      instance_endpoint: '<AWS_INSTANCE_ENDPOINT>'
```

**注**: パスワードに特殊文字が含まれる場合は、単一引用符で囲んでください。

[Agent を再起動][3]すると、Datadog への MySQL メトリクスの送信が開始されます。


[1]: /ja/agent/configuration/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[3]: /ja/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

ECS や Fargate などの Docker コンテナで動作するデータベースモニタリング Agent を設定するには、Agent コンテナの Docker ラベルとして[オートディスカバリーのインテグレーションテンプレート][1]を設定します。

**注**: ラベルのオートディスカバリーを機能させるためには、Agent にDocker ソケットの読み取り権限が必要です。

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

`Dockerfile` ではラベルの指定も可能であるため、インフラストラクチャーの構成を変更することなく、カスタム Agent を構築・デプロイすることができます。

```Dockerfile
FROM gcr.io/datadoghq/agent:7.36.1

LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AWS_INSTANCE_ENDPOINT>", "port": 3306,"username": "datadog","password": "<UNIQUEPASSWORD>"}]'
```

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

ファイルをマウントせずに、インスタンスの構成を Kubernetes サービスとして宣言することができます。Kubernetes 上で動作する Agent にこのチェックを設定するには、Datadog Cluster Agent と同じネームスペースにサービスを作成します。


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

Cluster Agent は自動的にこのコンフィギュレーションを登録し、MySQL チェックを開始します。

`datadog` ユーザーのパスワードをプレーンテキストで公開しないようにするには、Agent の[シークレット管理パッケージ][4]を使用し、`ENC[]` 構文を使ってパスワードを宣言します。

[1]: /ja/agent/cluster_agent
[2]: /ja/agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: /ja/agent/configuration/secrets-management
{{% /tab %}}
{{< /tabs >}}

### UpdateAzureIntegration

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
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithParamGroups.html
[4]: https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[7]: https://app.datadoghq.com/databases
[8]: /ja/integrations/amazon_rds
[9]: /ja/database_monitoring/troubleshooting/?tab=mysql
[10]: https://app.datadoghq.com/integrations/amazon-web-services