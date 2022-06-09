---
description: RDS 上で管理される SQL Server 用のデータベースモニタリングをインストールし、構成します。
further_reading:
- link: /integrations/sqlserver/
  tag: ドキュメント
  text: 基本的な SQL Server インテグレーション
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: ドキュメント
  text: よくある問題のトラブルシューティング
kind: documentation
title: Amazon RDS 上の SQL Server のデータベースモニタリングの設定
---

{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">データベースモニタリングはこのサイトでサポートされていません。</div>
{{< /site-region >}}

<div class="alert alert-warning">Database Monitoring for SQL Server 用データベースモニタリングはプライベートベータ版です。ベータ版へのアクセスリクエストは、カスタマーサクセスマネージャーについては、お問い合わせください。</div>

データベースモニタリングは、クエリメトリクス、クエリサンプル、実行計画、データベースの状態、フェイルオーバー、イベントを公開することで、Microsoft SQL Server データベースを詳細に可視化します。

データベースでデータベースモニタリングを有効にするには、以下の手順を実行します。

1. [Agent にデータベースへのアクセスを付与する](#grant-the-agent-access)
2. [Agent をインストールする](#install-the-agent)
3. [RDS インテグレーションをインストールする](#install-the-rds-integration)

## はじめに

サポートされている SQL Server バージョン
: 2014、2016、2017、2019

{{% dbm-sqlserver-before-you-begin %}}

## Agent にアクセスを付与する

Datadog Agent が統計やクエリを収集するためには、データベースサーバーへの読み取り専用のアクセスが必要となります。

サーバーに接続するための読み取り専用ログインを作成し、必要な権限を付与します。

```SQL
USE [master];
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
GO
--Set context to msdb database and create datadog user
USE [msdb];
CREATE USER datadog FOR LOGIN datadog;
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

これは、RDS が `CONNECT ANY DATABASE` の付与を許可していないため、必要です。Datadog Agent は、データベース固有のファイル I/O 統計情報を収集するために、各データベースに接続する必要があります。

## Agent のインストール

AWS はホストへの直接アクセスを許可しないため、Datadog Agent は SQL Server ホストと通信可能な別のホストにインストールする必要があります。Agent のインストールと実行には、いくつかのオプションがあります。

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

## RDS インテグレーションをインストールする

AWS からより包括的なデータベースメトリクスとログを収集するには、[RDS インテグレーション][1]をインストールします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/amazon_rds