---
description: Azure 上で管理される SQL Server 用のデータベースモニタリングをインストールし、構成します。
further_reading:
- link: /integrations/sqlserver/
  tag: ドキュメント
  text: 基本的な SQL Server インテグレーション
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: ドキュメント
  text: よくある問題のトラブルシューティング
kind: documentation
title: Azure SQL Server のデータベースモニタリングの設定
---

{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">データベースモニタリングはこのサイトでサポートされていません。</div>
{{< /site-region >}}

<div class="alert alert-warning">Database Monitoring for SQL Server 用データベースモニタリングはプライベートベータ版です。ベータ版へのアクセスリクエストは、カスタマーサクセスマネージャーについては、お問い合わせください。</div>

データベースモニタリングは、クエリメトリクス、クエリサンプル、実行計画、データベースの状態、フェイルオーバー、イベントを公開することで、Microsoft SQL Server データベースを詳細に可視化します。

データベースでデータベースモニタリングを有効にするには、以下の手順を実行します。

1. [Agent にデータベースへのアクセスを付与する](#grant-the-agent-access)
2. [Agent をインストールする](#install-the-agent)
3. [Azure インテグレーションをインストールする](#install-the-azure-integration)

## はじめに

{{% dbm-sqlserver-before-you-begin %}}

## Agent にアクセスを付与する

Datadog Agent が統計やクエリを収集するためには、データベースサーバーへの読み取り専用のアクセスが必要となります。

{{< tabs >}}

{{% tab "Azure SQL Database" %}}

サーバーに接続するための読み取り専用ログインを作成し、必要な [Azure SQL Roles][1] を付与します。
```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
ALTER SERVER ROLE ##MS_ServerStateReader## ADD MEMBER datadog;
ALTER SERVER ROLE ##MS_DefinitionReader## ADD MEMBER datadog;
```

このサーバー上の追加の Azure SQL Database それぞれへのアクセスを Agent に付与します。

```SQL
CREATE USER datadog FOR LOGIN datadog;
```

[1]: https://docs.microsoft.com/en-us/azure/azure-sql/database/security-server-roles
{{% /tab %}}

{{% tab "Azure SQL Managed Instance" %}}

サーバーに接続するための読み取り専用ログインを作成し、必要な権限を付与します。

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT CONNECT ANY DATABASE to datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
```

{{% /tab %}}

{{% tab "Windows Azure VM の SQL Server" %}}

[Windows Azure VM の SQL Server][1] の場合は、[セルフホスティングの SQL Server のデータベースモニタリングを設定する][2]のドキュメントに従って、Windows Server ホスト VM に直接 Datadog Agent をインストールしてください。

[1]: https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/sql-server-on-azure-vm-iaas-what-is-overview
[2]: /ja/database_monitoring/setup_sql_server/selfhosted/
{{% /tab %}}

{{< /tabs >}}

## Agent のインストール

Azure はホストへの直接アクセスを許可しないため、Datadog Agent は SQL Server ホストと通信可能な別のホストにインストールする必要があります。Agent のインストールと実行には、いくつかのオプションがあります。

{{< tabs >}}
{{% tab "Windows Host" %}}
{{% dbm-sqlserver-agent-setup-windows %}}
{{% /tab %}}
{{% tab "Linux Host" %}}
{{% dbm-sqlserver-agent-setup-linux %}}
{{% /tab %}}
{{% tab "Docker" %}}
{{% dbm-sqlserver-agent-setup-docker %}}
{{% /tab %}}
{{% tab "Kubernetes" %}}
{{% dbm-sqlserver-agent-setup-kubernetes %}}
{{% /tab %}}
{{< /tabs >}}

## Azure インテグレーションをインストールする

Azure からより包括的なデータベースメトリクスとログを収集するには、[Azure インテグレーション][1]をインストールします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/azure