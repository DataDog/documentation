---
description: Google Cloud SQL で管理される SQL Server のデータベースモニタリングをインストールして構成します。
further_reading:
- link: /integrations/sqlserver/
  tag: ドキュメント
  text: SQL Server インテグレーション
kind: documentation
title: Google Cloud SQL マネージド SQL Server のデータベースモニタリングの設定
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">データベースモニタリングはこのサイトでサポートされていません。</div>
{{< /site-region >}}

データベースモニタリングは、クエリメトリクス、クエリサンプル、実行計画、データベースの状態、フェイルオーバー、イベントを公開することで、Microsoft SQL Server データベースを詳細に可視化します。

データベースでデータベースモニタリングを有効にするには、以下の手順を実行します。

1. [Agent にデータベースへのアクセスを付与する](#grant-the-agent-access)
2. [Agent をインストールする](#install-the-agent)
3. [Cloud SQL インテグレーションをインストールする](#install-the-cloud-sql-integration)

## はじめに

サポートされている SQL Server バージョン
: 2012、2014、2016、2017、2019

{{% dbm-sqlserver-before-you-begin %}}

## Agent にアクセスを付与する

Datadog Agent が統計やクエリを収集するためには、データベースサーバーへの読み取り専用のアクセスが必要となります。

[Cloud SQL インスタンスに][1] `datadog` ユーザーを作成します。

Agent の読み取り専用アクセスを維持するために、デフォルトの `CustomerDbRootRole` から `datadog` ユーザーを削除してください。その代わりに、Agent が必要とする明示的な権限のみを付与します。

```SQL
GRANT VIEW SERVER STATE to datadog as CustomerDbRootRole;
GRANT VIEW ANY DEFINITION to datadog as CustomerDbRootRole;
ALTER SERVER ROLE CustomerDbRootRole DROP member datadog;
```

追加した各アプリケーションデータベースに `datadog` ユーザーを作成します。
```SQL
USE [database_name];
CREATE USER datadog FOR LOGIN datadog;
```

これは、Google Cloud SQL が `CONNECT ANY DATABASE` の付与を許可していないため、必要です。Datadog Agent は、データベース固有のファイル I/O 統計情報を収集するために、各データベースに接続する必要があります。

## Agent のインストール

GCP はホストへの直接アクセスを許可しません。つまり、Datadog Agent は SQL Server ホストと通信可能な別のホストにインストールする必要があります。Agent のインストールと実行には、いくつかのオプションがあります。

{{< tabs >}}
{{% tab "Windows ホスト" %}}
SQL Server テレメトリーの収集を開始するには、まず [Datadog Agent をインストール][1]します。

SQL Server Agent のコンフィギュレーションファイル `C:\ProgramData\Datadog\conf.d\sqlserver.d\conf.yaml` を作成します。使用可能なすべての構成オプションは、[サンプルコンフィギュレーションファイル][2]を参照してください。

```yaml
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>,<SQL_PORT>'
    username: datadog
    password: '<PASSWORD>'
    connector: adodbapi
    provider: MSOLEDBSQL
    tags:  # オプション
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # プロジェクトとインスタンスを追加した後、CPU、メモリなどの追加のクラウドデータをプルするために Datadog GCP インテグレーションを構成します。
    gcp:
      project_id: '<PROJECT_ID>'
      instance_id: '<INSTANCE_ID>'
```

`project_id` と `instance_id` フィールドの設定に関する追加情報は、[SQL Server インテグレーション仕様][3]を参照してください。

[Windows 認証][4]を利用する場合は、`connection_string: "Trusted_Connection=yes"` と設定し、`username` と `password` フィールドを省略します。

`service` と `env` タグを使用して、共通のタグ付けスキームでデータベースのテレメトリーを他のテレメトリーにリンクします。これらのタグが Datadog 全体でどのように使用されるかについては、[統合サービスタグ付け][5]を参照してください。

### 対応ドライバー

#### Microsoft ADO

推奨する [ADO][6] プロバイダーは、[Microsoft OLE DB Driver][7] です。Agent が動作しているホストにドライバーがインストールされていることを確認してください。
```yaml
connector: adodbapi
provider: MSOLEDBSQL
```

他の 2 つのプロバイダー、`SQLOLEDB` と `SQLNCLI` は、Microsoft によって非推奨とされており、もはや使用するべきではありません。

#### ODBC

推奨する ODBC ドライバーは、[Microsoft ODBC Driver][8] です。Agent が動作しているホストにドライバーがインストールされていることを確認してください。

```yaml
connector: odbc
driver: '{ODBC Driver 17 for SQL Server}'
```

すべての Agent の構成が完了したら、[Datadog Agent を再起動][9]します。

### 検証

[Agent の status サブコマンドを実行][10]し、**Checks** セクションで `sqlserver` を探します。Datadog の[データベース][11]のページへ移動して開始します。


[1]: https://app.datadoghq.com/account/settings#agent/windows
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L324-L351
[4]: https://docs.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode
[5]: /ja/getting_started/tagging/unified_service_tagging
[6]: https://docs.microsoft.com/en-us/sql/ado/microsoft-activex-data-objects-ado
[7]: https://docs.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server
[8]: https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server
[9]: /ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: /ja/agent/guide/agent-commands/#agent-status-and-information
[11]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Linux ホスト" %}}
SQL Server テレメトリーの収集を開始するには、まず [Datadog Agent をインストール][1]します。

Linux では、Datadog Agent の他に、ODBC SQL Server ドライバー (例えば、[Microsoft ODBC ドライバー][2]) がインストールされていることが必須となります。ODBC SQL Server がインストールされたら、`odbc.ini` と `odbcinst.ini` ファイルを `/opt/datadog-agent/embedded/etc` フォルダーにコピーします。

`odbc` コネクターを使用し、`odbcinst.ini` ファイルに示されているように、適切なドライバーを指定します。

SQL Server Agent のコンフィギュレーションファイル `/etc/datadog-agent/conf.d/sqlserver.d/conf.yaml` を作成します。使用可能なすべての構成オプションは、[サンプルコンフィギュレーションファイル][3]を参照してください。

```yaml
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>,<SQL_PORT>'
    username: datadog
    password: '<PASSWORD>'
    connector: odbc
    driver: '<Driver from the `odbcinst.ini` file>'
    tags:  # オプション
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # プロジェクトとインスタンスを追加した後、CPU、メモリなどの追加のクラウドデータをプルするために Datadog GCP インテグレーションを構成します。
    gcp:
      project_id: '<PROJECT_ID>'
      instance_id: '<INSTANCE_ID>'
```

`project_id` と `instance_id` フィールドの設定に関する追加情報は、[SQL Server インテグレーション仕様][4]を参照してください。

`service` と `env` タグを使用して、共通のタグ付けスキームでデータベースのテレメトリーを他のテレメトリーにリンクします。これらのタグが Datadog 全体でどのように使用されるかについては、[統合サービスタグ付け][5]を参照してください。

すべての Agent の構成が完了したら、[Datadog Agent を再起動][6]します。

### 検証

[Agent の status サブコマンドを実行][7]し、**Checks** セクションで `sqlserver` を探します。Datadog の[データベース][8]のページへ移動して開始します。


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L324-L351
[5]: /ja/getting_started/tagging/unified_service_tagging
[6]: /ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: /ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Docker" %}}
Docker コンテナで動作するデータベースモニタリング Agent を設定するには、Agent コンテナの Docker ラベルとして[オートディスカバリーのインテグレーションテンプレート][1]を設定します。

**注**: ラベルのオートディスカバリーを機能させるためには、Agent にDocker ソケットに対する読み取り権限が与えられている必要があります。

アカウントや環境に合わせて、値を置き換えます。利用可能なすべての構成オプションについては、[サンプルコンフィギュレーションファイル][2]を参照してください。

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=7.35.0

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["sqlserver"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<HOSTNAME>",
    "port": <SQL_PORT>,
    "connector": "odbc",
    "driver": "FreeTDS",
    "username": "datadog",
    "password": "<PASSWORD>",
    "tags": [
      "service:<CUSTOM_SERVICE>"
      "env:<CUSTOM_ENV>"
    ],
    "gcp": {
      "project_id": "<PROJECT_ID>",
      "instance_id": "<INSTANCE_ID>"
    }
  }]' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

`project_id` と `instance_id` フィールドの設定に関する追加情報は、[SQL Server インテグレーション仕様][3]を参照してください。

`service` と `env` タグを使用して、共通のタグ付けスキームでデータベースのテレメトリーを他のテレメトリーにリンクします。これらのタグが Datadog 全体でどのように使用されるかについては、[統合サービスタグ付け][4]を参照してください。

### 検証

[Agent の status サブコマンドを実行][5]し、**Checks** セクションで `sqlserver` を探します。または、Datadog の[データベース][6]のページへ移動して開始します。

[1]: /ja/agent/faq/template_variables/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L324-L351
[4]: /ja/getting_started/tagging/unified_service_tagging
[5]: /ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Kubernetes" %}}
Kubernetes クラスターをお使いの場合は、データベースモニタリング用の [Datadog Cluster Agent][1] をご利用ください。

Kubernetes クラスターでクラスターチェックがまだ有効になっていない場合は、指示に従って[クラスターチェックを有効化][2]します。Cluster Agent の構成は、Cluster Agent コンテナにマウントされた静的ファイル、または Kubernetes サービスアノテーションのいずれかを使用することができます。

### Helm のコマンドライン

以下の [Helm][3] コマンドを実行して、Kubernetes クラスターに [Datadog Cluster Agent][1] をインストールします。お使いのアカウントや環境に合わせて値を変更してください。

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update

helm install <RELEASE_NAME> \
  --set 'datadog.apiKey=<DATADOG_API_KEY>' \
  --set 'clusterAgent.enabled=true' \
  --set "clusterAgent.confd.sqlserver\.yaml=cluster_check: true
init_config:
instances:
  - dbm: true
    host: <HOSTNAME>
    port: 1433
    username: datadog
    password: '<PASSWORD>'
    connector: 'odbc'
    driver: 'FreeTDS'
    tags:  # オプション
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    gcp:
      project_id: '<PROJECT_ID>'
      instance_id: '<INSTANCE_ID>' \
  datadog/datadog"
```

### マウントされたファイルで構成する

マウントされたコンフィギュレーションファイルを使ってクラスターチェックを構成するには、コンフィギュレーションファイルを Cluster Agent コンテナのパス `/conf.d/sqlserver.yaml` にマウントします。

```yaml
cluster_check: true  # このフラグを必ず入れてください
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>'
    port: <SQL_PORT>
    username: datadog
    password: '<PASSWORD>'
    connector: "odbc"
    driver: "FreeTDS"
    tags:  # オプション
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # プロジェクトとインスタンスを追加した後、CPU、メモリなどの追加のクラウドデータをプルするために Datadog GCP インテグレーションを構成します。
    gcp:
      project_id: '<PROJECT_ID>'
      instance_id: '<INSTANCE_ID>'
```

### Kubernetes サービスアノテーションで構成する

ファイルをマウントせずに、インスタンスのコンフィギュレーションを Kubernetes サービスとして宣言することができます。Kubernetes 上で動作する Agent にこのチェックを設定するには、Datadog Cluster Agent と同じネームスペースにサービスを作成します。


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
          "host": "<HOSTNAME>",
          "port": <SQL_PORT>,
          "username": "datadog",
          "password": "<PASSWORD>",
          "connector": "odbc",
          "driver": "FreeTDS",
          "tags": ["service:<CUSTOM_SERVICE>", "env:<CUSTOM_ENV>"],  # オプション
          "gcp": {
            "project_id": "<PROJECT_ID>",
            "instance_id": "<INSTANCE_ID>"
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

`project_id` と `instance_id` フィールドの設定に関する追加情報は、[SQL Server インテグレーション仕様][4]を参照してください。

Cluster Agent は自動的にこのコンフィギュレーションを登録し、SQL Server チェックを開始します。

`datadog` ユーザーのパスワードをプレーンテキストで公開しないよう、Agent の[シークレット管理パッケージ][5]を使用し、`ENC[]` 構文を使ってパスワードを宣言します。

[1]: /ja/agent/cluster_agent
[2]: /ja/agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L324-L351
[5]: /ja/agent/guide/secrets-management
{{% /tab %}}
{{< /tabs >}}

## Agent の構成例
{{% dbm-sqlserver-agent-config-examples %}}

## Google Cloud SQL インテグレーションをインストールする

Google Cloud SQL からより包括的なデータベースメトリクスを収集するには、[Google Cloud SQL インテグレーション][2]をインストールします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/sql/docs/sqlserver/create-manage-users#creating
[2]: /ja/integrations/google_cloudsql