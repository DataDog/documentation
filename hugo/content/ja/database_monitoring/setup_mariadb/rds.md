---
description: Amazon RDS で管理される MariaDB の Database Monitoring をインストールして構成します。
further_reading:
- link: /integrations/mysql/
  tag: ドキュメント
  text: 基本的な MySQL インテグレーション
- link: /integrations/amazon_rds/
  tag: ドキュメント
  text: Amazon RDS インテグレーション
title: Amazon RDS マネージド MariaDB の Database Monitoring のセットアップ
---
Database Monitoring は、クエリメトリクス、クエリサンプル、実行計画、コネクションデータ、システムメトリクス、InnoDB ストレージエンジンのテレメトリを公開することで、MariaDB データベースの詳細な可視性を提供します。

読み取り専用ユーザーとしてログインし、Agent でデータベースから直接テレメトリを収集します。MariaDB データベースで Database Monitoring を有効にするには、以下のセットアップを行います。

1. [AWS インテグレーションを構成する](#configure-the-aws-integration)
1. [データベースパラメーターの構成](#configure-mariadb-settings)
1. [Agent にデータベースへのアクセス権を付与する](#grant-the-agent-access)
1. [Install and configure the Agent](#install-and-configure-the-agent)
1. [Install the RDS integration](#install-the-rds-integration)

## はじめに {#before-you-begin}

サポートされている MariaDB バージョン
: 10.5、10.6、10.11、または 11.4 <br/><br/>
MariaDB の Database Monitoring は、[既知の制限事項][11]付きでサポートされています。

サポート対象の Agent バージョン
: 7.61.0+

パフォーマンスへの影響
: Database Monitoring のデフォルトの Agent 構成は保守的ですが、収集間隔やクエリのサンプリングレートなどの設定を調整することで、よりニーズに合ったものにすることができます。大半のワークロードで、Agent が占める割合は、データベースのクエリ実行時間の 1% 未満、および CPU の 1% 未満です。<br/><br/>
Database Monitoring は、ベースとなる Agent 上のインテグレーションとして動作します ([ベンチマークを参照][1])。

プロキシ、ロードバランサー、コネクションプーラー
: Datadog Agent は、監視対象のホストに直接接続する必要があります。できれば、インスタンスエンドポイント経由で接続してください。Agent は、プロキシ、ロードバランサー、またはコネクションプーラーを介してデータベースに接続してはなりません。Agent が実行中に異なるホストに接続すると (フェイルオーバーやロードバランシングなどの場合)、Agent は 2 つのホスト間で統計情報の差を計算し、不正確なメトリクスを生成します。

データセキュリティに関する考慮事項
: Agent がデータベースから収集するデータと、そのデータの安全性を確保する方法については、[機密情報][2]を参照してください。

## AWS インテグレーションを構成する{#configure-the-aws-integration}

[Amazon Web Services インテグレーションタイル][10]の [{{< ui >}}Resource Collection{{< /ui >}}] セクションで、[{{< ui >}}Standard Collection{{< /ui >}}] を有効にします。

## MariaDB 設定の構成{#configure-mariadb-settings}

[DB パラメーターグループ][3]で以下を構成してから、設定を有効にするために**サーバーを再起動**します。

| パラメーター | 値 | 説明 |
| --- | --- | --- |
| `performance_schema` | `1` | 必須。[パフォーマンススキーマ][12]を有効にします。MariaDB では、これはデフォルトで有効になっていません。|
| `max_digest_length` | `4096` | より大きなクエリを収集するために必要です。`events_statements_*` テーブル内の SQL ダイジェストテキストのサイズを増やします。デフォルト値のままにした場合、`1024` 文字を超えるクエリは収集されません。|
| `performance_schema_max_digest_length` | `4096` | `max_digest_length` と一致する必要があります。|
| `performance_schema_max_sql_text_length` | `4096` | `max_digest_length` と一致する必要があります。|

## Agent にアクセスを付与する {#grant-the-agent-access}

Datadog Agent が統計やクエリを収集するためには、データベースへの読み取り専用アクセスが必要です。

以下の手順では、`datadog@'%'` を使用して任意のホストからログインする権限を Agent に付与します。`datadog` を使用することで、`datadog@'localhost'` ユーザーのログインを localhost からのみに制限できます。詳細については、[MariaDB ドキュメント][4]を参照してください。

`datadog` ユーザーを作成し、基本的なアクセス権限を付与します。

```sql
CREATE USER datadog@'%' IDENTIFIED by '<UNIQUEPASSWORD>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

ブロッキングクエリの収集には `information_schema.INNODB_LOCK_WAITS` と `INNODB_TRX`、および `performance_schema` を使用するため、上記の `PROCESS` と `SELECT ON performance_schema.*` の権限で十分です。追加の権限は必要ありません。ブロッキングクエリの収集はデフォルトで無効になっています。インスタンス構成で `query_activity.collect_blocking_queries: true` を使用して有効にします。

次のスキーマを作成します。

```sql
CREATE SCHEMA IF NOT EXISTS datadog;
GRANT EXECUTE ON datadog.* to datadog@'%';
```

Agent が実行計画を収集できるようにするには、`explain_statement` プロシージャを作成します。

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

インデックスメトリクスを収集するには、`datadog` ユーザーに追加の権限を付与します。

```sql
GRANT SELECT ON mysql.innodb_index_stats TO datadog@'%';
```

### ランタイムセットアップコンシューマー{#runtime-setup-consumers}
RDS の場合、パフォーマンススキーマコンシューマーを構成で永続的に有効にすることはできません。Agent が実行時に `performance_schema.events_*` コンシューマーを有効にできるように、以下のプロシージャを作成します。

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

### パスワードを安全に保管する {#securely-store-your-password}
{{% dbm-secret %}}

## スキーマを収集する{#collecting-schemas}

Agent 7.65 以降、Datadog Agent は MariaDB データベースからスキーマ情報を収集できます。インスタンス構成で `collect_schemas.enabled: true` を使用して有効にします (Agent 7.68 以前では、代わりに `schemas_collection` を使用してください)。スキーマ収集はデフォルトで無効になっています。

```yaml
instances:
  - dbm: true
    ...
    collect_schemas:
      enabled: true
```

MariaDB 10.5 以降 (MySQL と同様) では、`INFORMATION_SCHEMA` はそのテーブルに対する権限を持つユーザーにのみテーブルを公開するため、権限を付与しないと `datadog` ユーザーにはテーブルが表示されません。Agent にテーブルデータを読み取る権限を与えることなくテーブルメタデータを表示できるようにするには、`REFERENCES` 権限を付与します。

```sql
GRANT REFERENCES ON *.* TO datadog@'%';
```

`REFERENCES` は、`INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS` から外部キーの `delete_rule` および `update_rule` 値を収集するためにも必要です。テーブルレベルの `SELECT` 権限ではそのビューは公開されません。

利用可能な `collect_schemas` チューニングオプションについては、[データベーススキーマの探索][13]を参照してください。

## Agent をインストールし構成する {#install-and-configure-the-agent}

RDS ホストを監視するには、インフラストラクチャーに Datadog Agent をインストールし、各インスタンスエンドポイントにリモートで接続するように構成します。Agent はデータベース上で動作する必要はなく、データベースに接続するだけで構いません。ここに記載されていない、Agent のその他のインストール方法については、[Agent インストール手順][5]を参照してください。

{{< tabs >}}
{{% tab "ホスト" %}}

ホストで実行されている Agent に対してこのチェックを設定するには (Agent が RDS データベースから収集するように小さな EC2 インスタンスをプロビジョニングする場合など)

MariaDB メトリクスの収集を開始するには、[Agent の構成ディレクトリ][1]のルートにある `conf.d/` フォルダー内の `mysql.d/conf.yaml` ファイルを編集します。カスタムメトリクスのオプションなど、使用可能なすべての構成オプションについては、[サンプル mysql.d/conf.yaml][2] を参照してください。

MariaDB メトリクスを収集するには、この構成ブロックを `mysql.d/conf.yaml` に追加してください。

```yaml
init_config:
instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: <PORT>
    username: datadog
    password: 'ENC[datadog_user_database_password]' # from the CREATE USER step earlier, stored as a secret

    # After adding your project and instance, configure the Datadog AWS integration to pull additional cloud data such as CPU and Memory.
    aws:
      instance_endpoint: '<AWS_INSTANCE_ENDPOINT>'
      region: <AWS_REGION>
```

IAM で認証する場合は、`region` および `instance_endpoint` パラメーターを指定し、`managed_authentication.enabled` を `true` に設定します。

**注**: IAM 認証を使用する場合のみ `managed_authentication` を有効にしてください。IAM 認証は `password` フィールドよりも優先されます。IAM データベース認証には Agent 7.67.0 以降が必要です。また、AWS はすべての RDS MariaDB バージョンで IAM データベース認証をサポートしているわけではありません。お使いの RDS MariaDB バージョンとリージョンでのサポート状況を確認するには、[IAM データベース認証機能マトリクス][5]を参照してください。

```yaml
init_config:
instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: <PORT>
    username: datadog
    aws:
      instance_endpoint: '<AWS_INSTANCE_ENDPOINT>'
      region: <AWS_REGION>
      managed_authentication:
        enabled: true
```

RDS インスタンスでの IAM 認証の構成については、[マネージド認証との接続][3] を参照してください。

[Agent を再起動][4]して、Datadog への MariaDB メトリクスの送信を開始します。


[1]: /ja/agent/configuration/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[3]: /ja/database_monitoring/guide/managed_authentication/?tab=mysql#configure-iam-authentication
[4]: /ja/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RDS_Fea_Regions_DB-eng.Feature.IamDatabaseAuthentication.html
{{% /tab %}}
{{% tab "Docker" %}}

ECS や Fargate などの Docker コンテナで動作する Database Monitoring Agent を設定するには、Agent コンテナの Docker ラベルとして[オートディスカバリーのインテグレーションテンプレート][1]を設定します。

**注**: Autodiscovery によるラベルの検出を有効にするには、Agent が Docker ソケットの読み取り権限を持っている必要があります。

### コマンドライン {#command-line}

次のコマンドを実行してコマンドラインから Agent を起動し、利用を開始します。お使いのアカウントや環境に合わせて値を変更してください。

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=<AGENT_VERSION>

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["mysql"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<AWS_INSTANCE_ENDPOINT>",
    "port": <PORT>,
    "username": "datadog",
    "password": "<UNIQUEPASSWORD>",
    "aws": {
      "instance_endpoint": "<AWS_INSTANCE_ENDPOINT>",
      "region": "<AWS_REGION>"
    }
  }]' \
  registry.datadoghq.com/agent:${DD_AGENT_VERSION}
```

### Dockerfile {#dockerfile}

`Dockerfile` ではラベルも指定できるため、インフラストラクチャーの構成を変更することなく、カスタム Agent を構築、デプロイできます。

```Dockerfile
FROM registry.datadoghq.com/agent:<AGENT_VERSION>

LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AWS_INSTANCE_ENDPOINT>", "port": <PORT>,"username": "datadog","password": "ENC[datadog_user_database_password]", "aws": {"instance_endpoint": "<AWS_INSTANCE_ENDPOINT>", "region": "<AWS_REGION>"}}]'
```

[1]: /ja/agent/docker/integrations/?tab=docker
{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes クラスターをお使いの場合は、Database Monitoring 用の [Datadog Cluster Agent][1] をご利用ください。

Kubernetes クラスターでまだ有効になっていない場合は、手順に従って[クラスターチェックを有効に][2]します。MySQL の構成は、Cluster Agent コンテナにマウントされた静的ファイルを使用するか、サービスアノテーションを使用して宣言できます。

### Operator {#operator}

[Kubernetes と Integrations の Operator 手順][3]を参照し、次の手順に従って MySQL インテグレーションを設定します。

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
              mysql.yaml: |-
                cluster_check: true
                init_config:
                instances:
                - host: <AWS_INSTANCE_ENDPOINT>
                  port: <PORT>
                  username: datadog
                  password: 'ENC[datadog_user_database_password]'
                  dbm: true
                  aws:
                    instance_endpoint: <AWS_INSTANCE_ENDPOINT>
                    region: <AWS_REGION>
    ```

2. 次のコマンドを使用して Datadog Operator に変更を適用します。

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm {#helm}

1. Helm の [Datadog Agent インストール手順][4]を完了します。
2. YAML 構成ファイル (Cluster Agent インストール手順の `datadog-values.yaml`) を更新して、以下を含めます。
    ```yaml
    clusterAgent:
      confd:
        mysql.yaml: |-
          cluster_check: true
          init_config:
          instances:
            - dbm: true
              host: <AWS_INSTANCE_ENDPOINT>
              port: <PORT>
              username: datadog
              password: 'ENC[datadog_user_database_password]'
              aws:
                instance_endpoint: <AWS_INSTANCE_ENDPOINT>
                region: <AWS_REGION>

    clusterChecksRunner:
      enabled: true
    ```

3. コマンドラインから上記の構成ファイルを使用して Agent をデプロイします。

    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Windows の場合、 <code>--set targetSystem=windows</code> を <code>helm install</code> コマンドに追記します。
</div>

### マウントされたファイルで構成する {#configure-with-mounted-files}

マウントされた構成ファイルを使用してクラスターチェックを構成するには、構成ファイルを Cluster Agent コンテナのパス `/conf.d/mysql.yaml` にマウントします。

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: <PORT>
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    aws:
      instance_endpoint: <AWS_INSTANCE_ENDPOINT>
      region: <AWS_REGION>
```

### Kubernetes サービスアノテーションで構成する {#configure-with-kubernetes-service-annotations}

ファイルをマウントする代わりに、インスタンス構成を Kubernetes Service として宣言できます。Kubernetes 上で実行されている Agent に対してこのチェックを構成するには、次の構文を使用してサービスを作成します。


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
          "port": <PORT>,
          "username": "datadog",
          "password": "ENC[datadog_user_database_password]",
          "aws": {
            "instance_endpoint": "<AWS_INSTANCE_ENDPOINT>",
            "region": "<AWS_REGION>"
          }
        }
      ]
spec:
  ports:
  - port: <PORT>
    protocol: TCP
    targetPort: <PORT>
    name: mysql
```

Cluster Agent は自動的にこのコンフィギュレーションを登録し、MySQL チェックを開始します。

`datadog` ユーザーのパスワードがプレーンテキストで公開されることがないようにするために、Agent の [シークレット管理パッケージ][6] を使用し、`ENC[]` 構文でパスワードを宣言します。

[1]: /ja/containers/cluster_agent/setup/
[2]: /ja/containers/cluster_agent/clusterchecks/
[3]: /ja/containers/kubernetes/integrations/?tab=datadogoperator
[4]: /ja/containers/kubernetes/integrations/?tab=helm
[5]: /ja/containers/kubernetes/integrations/?tab=annotations#configuration
[6]: /ja/agent/configuration/secrets-management

{{% /tab %}}
{{< /tabs >}}

### 検証 {#validate}

[Agent の status サブコマンドを実行][6]し、チェック セクションで `mysql` を探すか、[データベース][7]ページを参照してセットアップを開始してください。

## RDS インテグレーションをインストールする {#install-the-rds-integration}

DBM でデータベースのテレメトリと一緒に CPU などの AWS からのインフラストラクチャーメトリクスを見るには、[RDS インテグレーション][8]をインストールします (オプション)。

## トラブルシューティング{#troubleshooting}

インテグレーションと Agent を手順通りにインストール・設定しても期待通りに動作しない場合は、[トラブルシューティング][9]を参照してください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/database_monitoring/agent_integration_overhead/?tab=mysql
[2]: /ja/database_monitoring/data_collected/#sensitive-information
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithParamGroups.html
[4]: https://mariadb.com/docs/server/reference/sql-statements/account-management-sql-statements/create-user
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[7]: https://app.datadoghq.com/databases
[8]: /ja/integrations/amazon_rds
[9]: /ja/database_monitoring/setup_mariadb/troubleshooting/
[10]: https://app.datadoghq.com/integrations/amazon-web-services
[11]: /ja/database_monitoring/setup_mariadb/troubleshooting/#mariadb-known-limitations
[12]: https://mariadb.com/kb/en/performance-schema-overview/
[13]: /ja/database_monitoring/schema_explorer/
[14]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RDS_Fea_Regions_DB-eng.Feature.IamDatabaseAuthentication.html