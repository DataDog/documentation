---
description: RDS 上で管理される SQL Server 用のデータベースモニタリングをインストールし、構成します。
further_reading:
- link: /integrations/sqlserver/
  tag: ドキュメント
  text: 基本的な SQL Server インテグレーション
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: ドキュメント
  text: よくある問題のトラブルシューティング
title: Amazon RDS 上の SQL Server のデータベースモニタリングの設定
---

データベースモニタリングは、クエリメトリクス、クエリサンプル、実行計画、データベースの状態、フェイルオーバー、イベントを公開することで、Microsoft SQL Server データベースを詳細に可視化します。

データベースでデータベースモニタリングを有効にするには、以下の手順を実行します。

1. [AWS インテグレーションを構成する](#configure-the-aws-integration)
1. [Agent にアクセスを付与する](#grant-the-agent-access)
1. [Agent をインストールする](#install-the-agent)
1. [RDS インテグレーションをインストールする](#install-the-rds-integration)

## はじめに

サポートされている SQL Server バージョン
: 2014、2016、2017、2019、2022

{{% dbm-sqlserver-before-you-begin %}}

## AWS インテグレーションの構成

[Amazon Web Services インテグレーションタイル][2]の **Resource Collection** セクションで **Standard Collection** を有効にします。

## Agent にアクセスを付与する

Datadog Agent が統計やクエリを収集するためには、データベースサーバーへの読み取り専用のアクセスが必要となります。

サーバーに接続するための読み取り専用ログインを作成し、必要な権限を付与します。

```SQL
USE [master];
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
GO
--コンテキストを msdb データベースに設定し、datadog ユーザーを作成します。
USE [msdb];
CREATE USER datadog FOR LOGIN datadog;
-- Log Shipping Monitoring (Agent v7.50 以降で利用可能) を使用するには、次の行のコメントを外します。
-- GRANT SELECT to datadog;
GO
--master に戻り、datadog ユーザーにサーバー権限を付与します
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

### パスワードを安全に保管
{{% dbm-secret %}}

## Agent のインストール

AWS はホストへの直接アクセスを許可しないため、Datadog Agent は SQL Server ホストと通信可能な別のホストにインストールする必要があります。Agent のインストールと実行には、いくつかのオプションがあります。

{{< tabs >}}
{{% tab "Windows Host" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-windows %}}
{{% /tab %}}
{{% tab "Linux Host" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-linux %}}
{{% /tab %}}
{{% tab "Docker" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-docker %}}
{{% /tab %}}
{{% tab "Kubernetes" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-kubernetes %}}
{{% /tab %}}
{{< /tabs >}}

## Agent の構成例
{{% dbm-sqlserver-agent-config-examples %}}

## RDS インテグレーションをインストールする

AWS からより包括的なデータベースメトリクスとログを収集するには、[RDS インテグレーション][1]をインストールします。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/amazon_rds
[2]: https://app.datadoghq.com/integrations/amazon-web-services