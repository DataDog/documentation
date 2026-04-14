---
description: セルフホストの Oracle のデータベースモニタリングのインストールと構成
further_reading:
- link: /integrations/oracle/
  tag: Documentation
  text: Basic Oracle インテグレーション
title: セルフホストの Oracle のデータベースモニタリングの設定
---

{{% dbm-oracle-definition %}}

Agent は読み取り専用ユーザーとしてデータベースにログインし、直接テレメトリーを収集します。

## はじめに

{{% dbm-supported-oracle-versions %}}

{{% dbm-supported-oracle-agent-version %}}

パフォーマンスへの影響
: Database Monitoring のデフォルトの Agent 構成は保守的ですが、収集間隔やクエリのサンプリングレートなどの設定を調整することで、よりニーズに合ったものにすることができます。ほとんどのワークロードにおいて、Agent がデータベース上のクエリ実行時間に与える影響は 1% 未満、CPU 使用率も 1% 未満です。<br/><br/>
Database Monitoring は、ベース Agent 上のインテグレーションとして動作します ([ベンチマークを参照][6])。

プロキシ、ロードバランサー、コネクションプーラー
: Agent は、監視対象のホストに直接接続する必要があります。Agent をプロキシ、ロードバランサー、コネクションプーラーを経由してデータベースに接続しないようご注意ください。また、各 Agent は基礎となるホスト名を把握し、フェイルオーバーの場合でも常に 1 つのホストのみを使用する必要があります。Datadog Agent が実行中に異なるホストに接続すると、メトリクス値の正確性が失われます。

データセキュリティへの配慮
: Agent がお客様のデータベースからどのようなデータを収集するか、またそのデータの安全性をどのように確保しているかについては、[機密情報][5]を参照してください。

## セットアップ

Oracle データベースで Database Monitoring を有効にするには、次の手順を完了してください。

1. [Datadog ユーザーの作成](#create-the-datadog-user)
1. [ユーザーにデータベースへのアクセス権を付与する](#grant-the-user-access-to-the-database)
1. [ビューの作成](#create-a-view)
1. [Agent をインストールする](#install-the-agent)
1. [Agent の構成](#configure-the-agent)
1. [Oracle インテグレーションをインストールまたは検証する](#install-or-verify-the-oracle-integration)
1. [セットアップの検証](#validate-the-setup)

### Datadog ユーザーの作成

レガシー Oracle インテグレーションがすでにインストールされている場合は、ユーザーがすでに存在するため、この手順をスキップします。

サーバーに接続するための読み取り専用ログインを作成し、必要な権限を付与します。

{{< tabs >}}
{{% tab "マルチテナント" %}}
```SQL
CREATE USER c##datadog IDENTIFIED BY &password CONTAINER = ALL ;

ALTER USER c##datadog SET CONTAINER_DATA=ALL CONTAINER=CURRENT;
```
{{% /tab %}}

{{% tab "Non-CDB" %}}
```SQL
CREATE USER datadog IDENTIFIED BY &password ;
```
{{% /tab %}}

{{% tab "Oracle 11" %}}
```SQL
CREATE USER datadog IDENTIFIED BY &password ;
```
{{% /tab %}}
{{< /tabs >}}

### ユーザーにデータベースへのアクセス権を付与する

`sysdba` としてログオンし、以下の権限を付与します。

{{< tabs >}}

{{% tab "マルチテナント" %}}
{{% dbm-oracle-multitenant-permissions-grant-sql %}}
{{% /tab %}}

{{% tab "非 CDB" %}}
{{% dbm-oracle-non-cdb-permissions-grant-sql %}}
{{% /tab %}}

{{% tab "Oracle 11" %}}
{{% dbm-oracle-11-permissions-grant-sql %}}
{{% /tab %}}

{{< /tabs >}}

### パスワードを安全に保管
{{% dbm-secret %}}

### ビューの作成

`sysdba` としてログオンし、`sysdba` スキーマに新しい `view` を作成し、Agent ユーザーにアクセス権を与えます。

{{< tabs >}}

{{% tab "マルチテナント" %}}
{{% dbm-multitenant-view-create-sql %}}
{{% /tab %}}

{{% tab "非 CDB" %}}
{{% dbm-non-cdb-view-create-sql %}}
{{% /tab %}}

{{% tab "Oracle 11" %}}
{{% dbm-oracle-11-view-create-sql %}}
{{% /tab %}}

{{< /tabs >}}

### Agent のインストール

インストール手順については、[Agent インストール手順][1]を参照してください。

### Agent の構成

Oracle Agent のコンフィギュレーションファイル `/etc/datadog-agent/conf.d/oracle.d/conf.yaml` を作成します。使用可能なすべての構成オプションは、[サンプルコンフィギュレーションファイル][4]を参照してください。

**注:** `7.53.0` 未満の Agent リリースの構成サブディレクトリは `oracle-dbm.d` です。

{{< tabs >}}
{{% tab "マルチテナント" %}}
```yaml
init_config:
instances:
  - server: '<HOSTNAME_1>:<PORT>'
    service_name: "<CDB_SERVICE_NAME>" # Oracle CDB サービス名
    username: 'c##datadog'
    password: 'ENC[datadog_user_database_password]'
    dbm: true
    tags:  # オプション
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
  - server: '<HOSTNAME_2>:<PORT>'
    service_name: "<CDB_SERVICE_NAME>" # Oracle CDB サービス名
    username: 'c##datadog'
    password: 'ENC[datadog_user_database_password]'
    dbm: true
    tags:  # オプション
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

Agent は、root マルチテナントコンテナデータベース (CDB) にのみ接続します。root CDB に接続している間、PDB に関する情報をクエリします。個々の PDB への接続を作成しないでください。
{{% /tab %}}

{{% tab "非 CDB" %}}
{{% dbm-oracle-selfhosted-config %}}
{{% /tab %}}

{{% tab "Oracle 11" %}}
{{% dbm-oracle-selfhosted-config %}}

{{% /tab %}}
{{< /tabs >}}

すべての Agent の構成が完了したら、[Datadog Agent を再起動][9]します。

### Oracle インテグレーションをインストールまたは検証する

#### 初めてインストールする場合

Datadog の Integrations ページで、組織用の [Oracle インテグレーション][7]をインストールしてください。これにより、Oracle データベースのパフォーマンスをモニタリングするために使用できる [Oracle ダッシュボード][2]がアカウントにインストールされます。

#### すでにインストール済みの場合

{{% dbm-existing-oracle-integration-setup %}}

### セットアップの検証

[Agent の status サブコマンドを実行][8]し、**Checks** セクションで `oracle` を探します。Datadog の[ダッシュボード][2]と[データベース][3]のページに移動して開始します。

## カスタムクエリ

Database Monitoring は、Oracle データベースのカスタムクエリをサポートしています。使用可能な構成オプションの詳細については、[conf.yaml.example][4] を参照してください。

<div class="alert alert-danger">カスタムクエリを実行すると、Oracle によって追加コストまたは手数料が課される場合があります。</div>

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[3]: https://app.datadoghq.com/databases
[4]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle.d/conf.yaml.example
[5]: /ja/database_monitoring/data_collected/#sensitive-information
[6]: /ja/database_monitoring/agent_integration_overhead/?tab=oracle
[7]: https://app.datadoghq.com/integrations/oracle
[8]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[9]: /ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}