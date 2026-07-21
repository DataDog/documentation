---
description: セルフホスト SQL Server のデータベースモニタリングをインストールして構成します
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
- link: https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/
  tag: ブログ
  text: Datadog で SQL ワークロードの Azure 移行を戦略化する
- link: https://www.datadoghq.com/blog/datadog-monitoring-always-on/
  tag: ブログ
  text: Datadog Database Monitoring で AlwaysOn のアベイラビリティグループを監視する
title: セルフホスト SQL Server のデータベースモニタリングの設定
---
データベースモニタリングは、クエリメトリクス、クエリサンプル、実行計画、データベースの状態、フェイルオーバー、イベントを公開することで、Microsoft SQL Server データベースを詳細に可視化します。

データベースでデータベースモニタリングを有効にするには、以下の手順を実行します。

1. [Agent にアクセスを付与する ](#grant-the-agent-access)
1. [エージェントをインストールする](#install-the-agent)

## はじめに {#before-you-begin}

サポートされている SQL Server バージョン
: 2012、2014、2016、2017、2019、2022、2025 (Agent 7.79+ が必要)

{{% dbm-sqlserver-before-you-begin %}}

## Agent にアクセスを付与する {#grant-the-agent-access}

Datadog Agent は、統計やクエリを収集するためにデータベース サーバーへの読み取り専用のアクセスを必要とします。

サーバーに接続するための読み取り専用ログインを作成し、必要な権限を付与します。

{{< tabs >}}
{{% tab "SQL Server 2014+" %}}

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
{{% /tab %}}
{{% tab "SQL Server 2012" %}}

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
-- If not using either of Log Shipping Monitoring (available in Agent v7.50+) or
-- SQL Server Agent Monitoring (available in Agent v7.57+), comment out the next three lines:
USE msdb;
CREATE USER datadog FOR LOGIN datadog;
GRANT SELECT to datadog;
```

追加した各アプリケーションデータベースに `datadog` ユーザーを作成します。

```SQL
USE [database_name];
CREATE USER datadog FOR LOGIN datadog;
```
{{% /tab %}}
{{< /tabs >}}

### パスワードを安全に保管する {#securely-store-your-password}
{{% dbm-secret %}}

## Agent をインストールする {#install-the-agent}

Agent を SQL Server ホストに直接インストールすることをお勧めします。そうすることで、SQL Server 固有のテレメトリーに加え、様々なシステムテレメトリー (CPU、メモリ、ディスク、ネットワーク) を収集することができるからです。

{{< tabs >}}
{{% tab "Windows ホスト" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-windows %}}
{{% /tab %}}
{{% tab "Linux ホスト" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-linux %}}
{{% /tab %}}
{{< /tabs >}}

## Agent の構成例 {#example-agent-configurations}
{{% dbm-sqlserver-agent-config-examples %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}