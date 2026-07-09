---
description: RDS 上で管理される SQL Server 用のデータベースモニタリングをインストールし、構成します。
further_reading:
- link: /integrations/sqlserver/
  tag: ドキュメント
  text: 基本的な SQL Server インテグレーション
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: ドキュメント
  text: よくある問題のトラブルシューティング
- link: /database_monitoring/guide/sql_deadlock/
  tag: ドキュメント
  text: デッドロックモニタリングの構成
- link: /database_monitoring/guide/sql_extended_events/
  tag: ドキュメント
  text: クエリ完了およびクエリエラー収集の構成
- link: /database_monitoring/guide/parameterized_queries/
  tag: ドキュメント
  text: SQL クエリパラメーター値のキャプチャ
title: Amazon RDS 上の SQL Server のデータベースモニタリングの設定
---
データベースモニタリングは、クエリメトリクス、クエリサンプル、実行計画、データベースの状態、フェイルオーバー、イベントを公開することで、Microsoft SQL Server データベースを詳細に可視化します。

データベースでデータベースモニタリングを有効にするには、以下の手順を実行します。

1. [AWS インテグレーションを構成する](#configure-the-aws-integration)
1. [Agent にアクセスを付与する ](#grant-the-agent-access)
1. [エージェントをインストールする](#install-the-agent)
1. [RDS インテグレーションをインストールする](#install-the-rds-integration)

## はじめに {#before-you-begin}

サポートされている SQL Server バージョン
: 2014、2016、2017、2019、2022

{{% dbm-sqlserver-before-you-begin %}}

## AWS インテグレーションを構成する{#configure-the-aws-integration}

[Amazon Web Services インテグレーションタイル][2]の {{< ui >}}Resource Collection{{< /ui >}} セクションで {{< ui >}}Standard Collection{{< /ui >}} を有効にします。

## Agent にアクセスを付与する {#grant-the-agent-access}

Datadog Agent が統計やクエリを収集するためには、データベースサーバーへの読み取り専用のアクセスが必要となります。

サーバーに接続するための読み取り専用ログインを作成し、必要な権限を付与します。

```SQL
USE [master];
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
GO
--Set context to msdb database and create datadog user
USE [msdb];
CREATE USER datadog FOR LOGIN datadog;
-- If not using either of Log Shipping Monitoring (available in Agent v7.50+), comment out the next line:
GRANT SELECT ON dbo.log_shipping_monitor_primary to datadog;
GRANT SELECT ON dbo.log_shipping_monitor_secondary to datadog;
-- If not using SQL Server Agent Monitoring (available in Agent v7.57+), comment out the next three lines:
GRANT SELECT ON dbo.sysjobs to datadog;
GRANT SELECT ON dbo.sysjobhistory TO datadog;
GRANT SELECT ON dbo.sysjobactivity to datadog;
GO
--Switch back to master and grant datadog user server permissions
USE [master];
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
GO
```

追加した各アプリケーションデータベースに `datadog` ユーザーを作成します。

```SQL
USE [database_name];
CREATE USER datadog FOR LOGIN datadog;
```

これは RDS が `CONNECT ANY DATABASE` を付与することを許可しないために必要です。Datadog Agent は、データベース固有のファイル I/O 統計を収集するために各データベースに接続する必要があります。

### パスワードを安全に保管する {#securely-store-your-password}
{{% dbm-secret %}}

## Agent をインストールする {#install-the-agent}

AWS はホストへの直接アクセスを許可しないため、Datadog Agent は SQL Server ホストと通信可能な別のホストにインストールする必要があります。Agent のインストールと実行には、いくつかのオプションがあります。

{{< tabs >}}
{{% tab "Windows ホスト" %}}
{{% dbm-alwayson-cloud-hosted %}}

SQL Server テレメトリを収集するには、[Datadog Agent][1] をインストールし、次に `C:\ProgramData\Datadog\conf.d\sqlserver.d\conf.yaml` に SQL Server Agent の conf ファイルを作成します。使用可能なすべての構成オプションについては、[サンプル構成ファイル][2]を参照してください。

```yaml
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>,<PORT>'
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # After adding your instance endpoint, configure the Datadog AWS integration to pull additional cloud data such as CPU, Memory, etc.
    aws:
      instance_endpoint: '<INSTANCE_ENDPOINT>'
```

[Windows 認証][4]を使用するには、`connection_string: "Trusted_Connection=yes"` を設定し、`username` および `password` フィールドを省略します。

`service` および `env` タグを使用して、共通のタグ付けスキームを通じてデータベーステレメトリを他のテレメトリにリンクします。これらのタグが Datadog 全体でどのように使用されるかの詳細については、[統合サービスタグ付け][5]を参照してください。

### 対応ドライバー {#supported-drivers}

#### Microsoft ADO {#microsoft-ado}

推奨される [ADO][6] プロバイダーは [Microsoft OLE DB ドライバー][7]です。ドライバーが、Agent が実行されているホストにインストールされていることを確認してください。

```yaml
connector: adodbapi
adoprovider: MSOLEDBSQL19  # Replace with MSOLEDBSQL for versions 18 and lower
```

他の 2 つのプロバイダー、`SQLOLEDB` と `SQLNCLI` は、Microsoft によって非推奨と見なされており、使用しないことをお勧めします。

#### ODBC {#odbc}

推奨される ODBC ドライバーは [Microsoft ODBC ドライバー][8]です。Agent 7.51 以降では、ODBC Driver 18 for SQL Server が Linux Agent にデフォルトで含まれています。Windows の場合、ドライバーが、Agent が実行されているホストにインストールされていることを確認してください。

```yaml
connector: odbc
driver: 'ODBC Driver 18 for SQL Server'
```

すべての Agent の構成が完了したら、[Datadog Agent を再起動][9]します。

### 検証 {#validate}

[Agent のステータスサブコマンドを実行][10]し、**Checks** セクションに `sqlserver` があることを確認します。Datadog の [データベース][11]ページに移動して開始します。

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[4]: https://docs.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode
[5]: /ja/getting_started/tagging/unified_service_tagging
[6]: https://docs.microsoft.com/en-us/sql/ado/microsoft-activex-data-objects-ado
[7]: https://docs.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server
[8]: https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server
[9]: /ja/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[10]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[11]: https://app.datadoghq.com/databases
{{% /tab %}}

{{% tab "Linux ホスト" %}}
{{% dbm-alwayson-cloud-hosted %}}

SQL Server テレメトリーの収集を開始するには、まず [Datadog Agent をインストール][1]します。

Linux では、[Microsoft ODBC ドライバー][2]のような ODBC SQL Server ドライバーもインストールする必要があります。インストール後、`odbc.ini` および `odbcinst.ini` ファイルを `/opt/datadog-agent/embedded/etc` フォルダーにコピーします。

`odbc` コネクターを使用し、`odbcinst.ini` ファイルに示されているように、適切なドライバーを指定します。

SQL Server Agent の conf ファイル `/etc/datadog-agent/conf.d/sqlserver.d/conf.yaml` を作成します。使用可能なすべての構成オプションについては、[サンプル構成ファイル][3]を参照してください。

```yaml
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>,<PORT>'
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    connector: odbc
    driver: '<Driver from the `odbcinst.ini` file>'
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # After adding your instance endpoint, configure the Datadog AWS integration to pull additional cloud data such as CPU, Memory, etc.
    aws:
      instance_endpoint: '<INSTANCE_ENDPOINT>'
```

`service` および `env` タグを使用して、共通のタグ付けスキームを通じてデータベーステレメトリを他のテレメトリにリンクします。これらのタグが Datadog 全体でどのように使用されるかの詳細については、[統合サービスタグ付け][5]を参照してください。

すべての Agent の構成が完了したら、[Datadog Agent を再起動][6]します。

### 検証 {#validate-1}

[Agent のステータスサブコマンドを実行][7]し、**Checks** セクションに `sqlserver` があることを確認します。Datadog の[データベース][8]ページに移動して開始します。

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[5]: /ja/getting_started/tagging/unified_service_tagging
[6]: /ja/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[7]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[8]: https://app.datadoghq.com/databases
{{% /tab %}}

{{% tab "Docker" %}}
{{% dbm-alwayson-cloud-hosted %}}

Docker コンテナで実行されている Database Monitoring Agent を設定するには、[Autodiscovery インテグレーションテンプレート][1]を Agent コンテナの Docker ラベルとして設定します。

**注**: Autodiscovery によるラベルの検出を有効にするには、Agent が Docker ソケットの読み取り権限を持っている必要があります。

お使いのアカウントや環境に合わせて値を変更してください。使用可能なすべての構成オプションについては、[サンプル構成ファイル][2]を参照してください。

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=<AGENT_VERSION>

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["sqlserver"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<HOSTNAME>,<PORT>",
    "connector": "odbc",
    "driver": "ODBC Driver 18 for SQL Server",
    "username": "datadog",
    "password": "<PASSWORD>",
    "tags": [
      "service:<CUSTOM_SERVICE>"
      "env:<CUSTOM_ENV>"
    ],
    "aws": {
      "instance_endpoint": "<INSTANCE_ENDPOINT>"
    }
  }]' \
  registry.datadoghq.com/agent:${DD_AGENT_VERSION}
```

`service` および `env` タグを使用して、共通のタグ付けスキームを通じてデータベーステレメトリを他のテレメトリにリンクします。これらのタグが Datadog 全体でどのように使用されているかについては、[統合サービスタグ付け][4]を参照してください。

### 検証 {#validate-2}

[Agent のステータスサブコマンドを実行][5]し、**Checks** セクションに `sqlserver` があることを確認します。または、Datadog の[データベース][6]ページに移動して開始します。

[1]: /ja/agent/faq/template_variables/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[4]: /ja/getting_started/tagging/unified_service_tagging
[5]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
{{% /tab %}}

{{% tab "Kubernetes" %}}
{{% dbm-alwayson-cloud-hosted %}}

Kubernetes クラスターを実行している場合は、[Datadog Cluster Agent][1] を使用して Database Monitoring を有効にしてください。クラスターチェックがまだ有効でない場合は、[手順に従って][2]、続行する前に有効化してください。

### Operator {#operator}

以下の手順に従って、[Kubernetes およびインテグレーションにおけるオペレーター手順][6]を参照しながら SQL Server インテグレーションを設定します。

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
              sqlserver.yaml: |-
                cluster_check: true # Required for cluster checks
                init_config:
                instances:
                - host: <HOSTNAME>,<PORT>
                  username: datadog
                  password: 'ENC[datadog_user_database_password]'
                  connector: 'odbc'
                  driver: 'ODBC Driver 18 for SQL Server'
                  dbm: true
                  # Optional: For additional tags
                  tags:
                    - 'service:<CUSTOM_SERVICE>'
                    - 'env:<CUSTOM_ENV>'
                  # After adding your instance endpoint, configure the Datadog AWS integration to pull additional cloud data such as CPU, Memory, etc.
                  aws:
                    instance_endpoint: <INSTANCE_ENDPOINT>
    ```

2. 次のコマンドを使用して Datadog Operator に変更を適用します。

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm {#helm}

以下の手順を踏んで、Kubernetes クラスターに [Datadog Cluster Agent][1] をインストールします。お使いのアカウントや環境に合わせて値を変更してください。

1. Helm の [Datadog Agent インストール手順][3]を踏みます。
2. YAML 構成ファイル (Cluster Agent インストール手順の `datadog-values.yaml`) を更新して、以下を含めます。
    ```yaml
    clusterAgent:
      confd:
        sqlserver.yaml: |-
          cluster_check: true # Required for cluster checks
          init_config:
          instances:
          - dbm: true
            host: <HOSTNAME>,<PORT>
            username: datadog
            password: 'ENC[datadog_user_database_password]'
            connector: 'odbc'
            driver: 'ODBC Driver 18 for SQL Server'
            # Optional: For additional tags
            tags:
              - 'service:<CUSTOM_SERVICE>'
              - 'env:<CUSTOM_ENV>'
            # After adding your instance endpoint, configure the Datadog AWS integration to pull additional cloud data such as CPU, Memory, etc.
            aws:
              instance_endpoint: <INSTANCE_ENDPOINT>

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

マウントされた構成ファイルを使用してクラスターチェックを構成するには、構成ファイルを Cluster Agent コンテナのパス `/conf.d/sqlserver.yaml` にマウントします。

```yaml
cluster_check: true  # Required for cluster checks
init_config:
instances:
  - dbm: true
    host: <HOSTNAME>,<PORT>
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    connector: 'odbc'
    driver: 'ODBC Driver 18 for SQL Server'
    # Optional: For additional tags
    tags:
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # After adding your instance endpoint, configure the Datadog AWS integration to pull additional cloud data such as CPU, Memory, etc.
    aws:
      instance_endpoint: <INSTANCE_ENDPOINT>
```

### Kubernetes サービスアノテーションで構成する {#configure-with-kubernetes-service-annotations}

ファイルをマウントする代わりに、インスタンス構成を Kubernetes サービスとして宣言できます。Kubernetes 上で実行されている Agent に対してこのチェックを構成するには、次の構文を使用してサービスを作成します。

```yaml
apiVersion: v1
kind: Service
metadata:
  name: sqlserver-datadog-check-instances
  annotations:
    ad.datadoghq.com/service.check_names: '["sqlserver"]'
    ad.datadoghq.com/service.init_configs: '[{}]'
    ad.datadoghq.com/service.instances: |
      [
        {
          "dbm": true,
          "host": "<HOSTNAME>,<PORT>",
          "username": "datadog",
          "password": "ENC[datadog_user_database_password]",
          "connector": "odbc",
          "driver": "ODBC Driver 18 for SQL Server",
          "tags": ["service:<CUSTOM_SERVICE>", "env:<CUSTOM_ENV>"],
          "aws": {
            "instance_endpoint": "<INSTANCE_ENDPOINT>"
          }
        }
      ]
spec:
  ports:
  - port: 1433
    protocol: TCP
    targetPort: 1433
    name: sqlserver
```

`deployment_type` と `name` フィールドの設定に関する追加情報は、[SQL Server インテグレーション仕様][4]を参照してください。

Cluster Agent は自動的にこの構成を登録し、SQL Server チェックを開始します。

`datadog` ユーザーのパスワードがプレーンテキストで公開されることがないようにするために、Agent の[シークレット管理パッケージ][5]を使用し、`ENC[]` 構文でパスワードを宣言します。


[1]: /ja/agent/cluster_agent
[2]: /ja/agent/cluster_agent/clusterchecks/
[3]: /ja/containers/kubernetes/installation/?tab=helm#installation
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[5]: /ja/agent/configuration/secrets-management
[6]: /ja/containers/kubernetes/integrations/?tab=datadogoperator

{{% /tab %}}

{{< /tabs >}}

## Agent の構成例 {#example-agent-configurations}
{{% dbm-sqlserver-agent-config-examples %}}

## RDS インテグレーションをインストールする {#install-the-rds-integration}

AWS からより包括的なデータベースメトリクスとログを収集するには、[RDS インテグレーション][1]をインストールします。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/amazon_rds
[2]: https://app.datadoghq.com/integrations/amazon-web-services