---
description: Azure 上で管理される SQL Server 用のデータベースモニタリングをインストールし、構成します。
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
title: Azure SQL Server のデータベースモニタリングの設定
---
データベースモニタリングは、クエリメトリクス、クエリサンプル、実行計画、データベースの状態、フェイルオーバー、イベントを公開することで、Microsoft SQL Server データベースを詳細に可視化します。

データベースでデータベースモニタリングを有効にするには、以下の手順を実行します。

1. [Agent にデータベースへのアクセス権を付与する](#grant-the-agent-access)
2. [Agent をインストールし構成する](#install-and-configure-the-agent)
3. [Azure インテグレーションをインストールする](#install-the-azure-integration)

## はじめに {#before-you-begin}

サポートされている SQL Server バージョン
: 2014、2016、2017、2019、2022、2025 (Datadog Agent 7.79+ が必要)

{{% dbm-sqlserver-before-you-begin %}}

## Agent にアクセス権を付与する {#grant-the-agent-access}

Datadog Agent が統計やクエリを収集するためには、データベースサーバーへの読み取り専用のアクセスが必要となります。

{{< tabs >}}

{{% tab "Azure SQL Database" %}}

サーバーに接続するための読み取り専用ログインを作成し、必要な [Azure SQL Roles][1] を付与します。

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
ALTER SERVER ROLE ##MS_ServerStateReader## ADD MEMBER datadog;
ALTER SERVER ROLE ##MS_DefinitionReader## ADD MEMBER datadog;
-- If not using either of Log Shipping Monitoring (available in Agent v7.50+) or
-- SQL Server Agent Monitoring (available in Agent v7.57+), comment out the next three lines:
USE msdb;
CREATE USER datadog FOR LOGIN datadog;
GRANT SELECT to datadog;
```

このサーバー上の追加の Azure SQL Database それぞれへのアクセスを Agent に付与します。

```SQL
CREATE USER datadog FOR LOGIN datadog;
```

**注:** Microsoft Entra ID マネージド ID 認証もサポートされています。Azure SQL DB インスタンスでこの設定を構成する方法については、[ガイド][3] を参照してください。

Datadog Agent を構成する際は、特定の Azure SQL DB サーバー上にある各アプリケーションデータベースに対して、1 つのチェックインスタンスを指定してください。`master` やその他の [システムデータベース][2] は含めないでください。各データベースは分離されたコンピューティング環境で実行されているため、Datadog Agent は Azure SQL DB 内の各アプリケーションデータベースに直接接続する必要があります。また、これは Azure SQL DB では `database_autodiscovery` が機能しないことを意味するため、有効にしないでください。

**注:** Azure SQL Database は分離されたネットワーク内にデータベースをデプロイします。各データベースは単一のホストとして扱われます。つまり、Azure SQL Database をエラスティックプールで実行する場合、プール内の各データベースは個別のホストとして扱われます。

```yaml
init_config:
instances:
  - host: '<SERVER_NAME>.database.windows.net,<PORT>'
    database: '<DATABASE_1>'
    username: datadog
    password: '<PASSWORD>'
    connector: 'odbc'
    driver: 'ODBC Driver 18 for SQL Server'
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: 'sql_database'
      fully_qualified_domain_name: '<SERVER_NAME>.database.windows.net'

  - host: '<SERVER_NAME>.database.windows.net,<PORT>'
    database: '<DATABASE_2>'
    username: datadog
    password: '<PASSWORD>'
    connector: 'odbc'
    driver: 'ODBC Driver 18 for SQL Server'
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: 'sql_database'
      fully_qualified_domain_name: '<SERVER_NAME>.database.windows.net'
```

Datadog Agent のインストールと構成の詳細については、[Datadog Agent のインストール](#install-the-agent)を参照してください。

[1]: https://docs.microsoft.com/en-us/azure/azure-sql/database/security-server-roles
[2]: https://docs.microsoft.com/en-us/sql/relational-databases/databases/system-databases
[3]: /ja/database_monitoring/guide/managed_authentication
{{% /tab %}}

{{% tab "Azure SQL Managed Instance" %}}

サーバーに接続するための読み取り専用ログインを作成し、必要な権限を付与します。

#### SQL Server バージョン 2014+ の場合{#for-sql-server-versions-2014}

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT CONNECT ANY DATABASE to datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
-- If not using either of Log Shipping Monitoring (available in Agent v7.50+) or
-- SQL Server Agent Monitoring (available in Agent v7.57+), comment out the next three lines:
USE msdb;
CREATE USER datadog FOR LOGIN datadog;
GRANT SELECT to datadog;
```

**注:** Azure マネージド ID 認証もサポートされています。Azure SQL DB インスタンスでこの設定を構成する方法については、[ガイド][1] を参照してください。

[1]: /ja/database_monitoring/guide/managed_authentication
{{% /tab %}}

{{% tab "Windows Azure VM 上の SQL Server" %}}

[Windows Azure VM の SQL Server][1] の場合は、[セルフホスティングの SQL Server のデータベースモニタリングを設定する][2] のドキュメントに従って、Windows Server ホスト VM に直接 Datadog Agent をインストールしてください。

[1]: https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/sql-server-on-azure-vm-iaas-what-is-overview
[2]: /ja/database_monitoring/setup_sql_server/selfhosted/
{{% /tab %}}

{{< /tabs >}}

### パスワードを安全に保管する {#securely-store-your-password}
{{% dbm-secret %}}

## Agent をインストールし構成する {#install-and-configure-the-agent}

Azure はホストへの直接アクセスを許可しないため、Datadog Agent は SQL Server ホストと通信可能な別のホストにインストールする必要があります。Agent のインストールと実行には、いくつかのオプションがあります。

{{< tabs >}}
{{% tab "Windows ホスト" %}}

SQL Server テレメトリーの収集を開始するには、まず [Datadog Agent をインストール][1] します。

SQL Server Agent の conf ファイル `C:\ProgramData\Datadog\conf.d\sqlserver.d\conf.yaml` を作成します。使用可能なすべての構成オプションについては、[サンプル構成ファイル][2] を参照してください。

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
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_INSTANCE_ENDPOINT>'
```

`deployment_type` と `fully_qualified_domain_name` フィールドの設定に関する追加情報は、[SQL Server インテグレーション仕様][3] を参照してください。

[Windows 認証][4] を使用するには、`connection_string: "Trusted_Connection=yes"` を設定し、`username` および `password` フィールドを省略します。

`service` および `env` タグを使用して、共通のタグ付けスキームを通じてデータベーステレメトリを他のテレメトリにリンクします。これらのタグが Datadog 全体でどのように使用されているかについては、[統合サービスタグ付け][5] を参照してください。

### 対応ドライバー {#supported-drivers}

#### Microsoft ADO {#microsoft-ado}

推奨される [ADO][6] プロバイダーは [Microsoft OLE DB ドライバー][7] です。ドライバーが、Agent が実行されているホストにインストールされていることを確認してください。

```yaml
connector: adodbapi
adoprovider: MSOLEDBSQL19  # Replace with MSOLEDBSQL for versions 18 and lower
```

他の 2 つのプロバイダー、`SQLOLEDB` と `SQLNCLI` は、Microsoft によって非推奨と見なされており、使用しないことをお勧めします。

#### ODBC {#odbc}

推奨される ODBC ドライバーは [Microsoft ODBC ドライバー][8] です。Datadog Agent 7.51 以降では、ODBC Driver 18 for SQL Server が Linux 用 Datadog Agent に含まれています。Windows の場合、ドライバーが、Agent が実行されているホストにインストールされていることを確認してください。

```yaml
connector: odbc
driver: 'ODBC Driver 18 for SQL Server'
```

すべての Agent の構成が完了したら、[Datadog Agent を再起動][9] します。

### 検証 {#validate}

[Agent のステータスサブコマンドを実行][10] し、**Checks** セクションに `sqlserver` があることを確認します。Datadog の [データベース][11] ページに移動して開始します。


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L797-L841
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
SQL Server テレメトリーの収集を開始するには、まず [Datadog Agent をインストール][1] します。

Linux では、Datadog Agent に加えて ODBC SQL Server ドライバーをインストールする必要があります (例: [Microsoft ODBC ドライバー][2])。ODBC SQL Server がインストールされたら、`odbc.ini` と `odbcinst.ini` ファイルを `/opt/datadog-agent/embedded/etc` フォルダーにコピーします。

`odbc` コネクターを使用し、`odbcinst.ini` ファイルに示されているように、適切なドライバーを指定します。

SQL Server Agent の conf ファイル `/etc/datadog-agent/conf.d/sqlserver.d/conf.yaml` を作成します。使用可能なすべての構成オプションについては、[サンプル構成ファイル][3] を参照してください。

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
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_ENDPOINT_ADDRESS>'
```

`deployment_type` と `fully_qualified_domain_name` フィールドの設定に関する追加情報は、[SQL Server インテグレーション仕様][4] を参照してください。

`service` および `env` タグを使用して、共通のタグ付けスキームを通じてデータベーステレメトリを他のテレメトリにリンクします。これらのタグが Datadog 全体でどのように使用されているかについては、[統合サービスタグ付け][5] を参照してください。

すべての Agent の構成が完了したら、[Datadog Agent を再起動][6] します。

### 検証 {#validate-1}

[Agent のステータスサブコマンドを実行][7] し、**Checks** セクションに `sqlserver` があることを確認します。Datadog の [データベース][8] ページに移動して開始します。


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L797-L841
[5]: /ja/getting_started/tagging/unified_service_tagging
[6]: /ja/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[7]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[8]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Docker" %}}
Docker コンテナで実行されている Database Monitoring Agent を設定するには、[Autodiscovery インテグレーションテンプレート][1] を Agent コンテナの Docker ラベルとして設定します。

**注**: Autodiscovery によるラベルの検出を有効にするには、Agent が Docker ソケットの読み取り権限を持っている必要があります。

お使いのアカウントや環境に合わせて値を変更してください。使用可能なすべての構成オプションについては、[サンプル構成ファイル][2] を参照してください。

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
    "azure": {
      "deployment_type": "<DEPLOYMENT_TYPE>",
      "fully_qualified_domain_name": "<AZURE_ENDPOINT_ADDRESS>"
    }
  }]' \
  registry.datadoghq.com/agent:${DD_AGENT_VERSION}
```

`deployment_type` と `fully_qualified_domain_name` フィールドの設定に関する追加情報は、[SQL Server インテグレーション仕様][3] を参照してください。

`service` および `env` タグを使用して、共通のタグ付けスキームを通じてデータベーステレメトリを他のテレメトリにリンクします。これらのタグが Datadog 全体でどのように使用されているかについては、[統合サービスタグ付け][4] を参照してください。

### 検証 {#validate-2}

[Agent のステータスサブコマンドを実行][5] し、**Checks** セクションに `sqlserver` があることを確認します。または、Datadog の [データベース][6] ページに移動して開始します。


[1]: /ja/agent/faq/template_variables/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L797-L841
[4]: /ja/getting_started/tagging/unified_service_tagging
[5]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Kubernetes" %}}
Kubernetes クラスターを実行している場合は、[Datadog Cluster Agent][1] を使用して Database Monitoring を有効にしてください。クラスターチェックがまだ有効でない場合は、[手順に従って][2]、続行する前に有効化してください。

### Operator {#operator}

以下の手順に従って、[Kubernetes およびインテグレーションにおけるオペレーター手順][6] を参照しながら SQL Server インテグレーションを設定します。

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
                cluster_check: true # Make sure to include this flag
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
                  # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
                  azure:
                    deployment_type: '<DEPLOYMENT_TYPE>'
                    fully_qualified_domain_name: '<AZURE_ENDPOINT_ADDRESS>'
    ```

2. 次のコマンドを使用して Datadog Operator に変更を適用します。

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm {#helm}

以下の手順を踏んで、Kubernetes クラスターに [Datadog Cluster Agent][1] をインストールします。お使いのアカウントや環境に合わせて値を変更してください。

1. Helm の [Datadog Agent インストール手順][3] を踏みます。
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
            # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
            azure:
              deployment_type: '<DEPLOYMENT_TYPE>'
              fully_qualified_domain_name: '<AZURE_ENDPOINT_ADDRESS>'

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
cluster_check: true  # Make sure to include this flag
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
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_ENDPOINT_ADDRESS>'
```

### Kubernetes サービスアノテーションで構成する {#configure-with-kubernetes-service-annotations}

ファイルをマウントする代わりに、インスタンス構成を Kubernetes Service として宣言できます。Kubernetes 上で実行されている Agent に対してこのチェックを構成するには、次の構文を使用してサービスを作成します。

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
          "azure": {
            "deployment_type": "<DEPLOYMENT_TYPE>",
            "fully_qualified_domain_name": "<AZURE_ENDPOINT_ADDRESS>"
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

`deployment_type` と `fully_qualified_domain_name` フィールドの設定に関する追加情報は、[SQL Server インテグレーション仕様][4] を参照してください。

Cluster Agent は自動的にこの構成を登録し、SQL Server チェックを開始します。

`datadog` ユーザーのパスワードがプレーンテキストで公開されることがないようにするために、Agent の [シークレット管理パッケージ][5] を使用し、`ENC[]` 構文でパスワードを宣言します。


[1]: /ja/agent/cluster_agent
[2]: /ja/agent/cluster_agent/clusterchecks/
[3]: /ja/containers/kubernetes/installation/?tab=helm#installation
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L797-L841
[5]: /ja/agent/configuration/secrets-management
[6]: /ja/containers/kubernetes/integrations/?tab=datadogoperator
{{% /tab %}}
{{< /tabs >}}

## Agent の構成例 {#example-agent-configurations}
{{% dbm-sqlserver-agent-config-examples %}}

## Azure インテグレーションをインストールする {#install-the-azure-integration}

Azure からより包括的なデータベースメトリクスとログを収集するには、[Azure インテグレーション][1] をインストールします。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/azure