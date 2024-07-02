---
title: Setting Up Database Monitoring for self-hosted SQL Server
description: Install and configure Database Monitoring for self-hosted SQL Server
further_reading:
- link: /integrations/sqlserver/
  tag: Documentation
  text: Basic SQL Server Integration
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: Documentation
  text: Troubleshoot Common Issues
- link: "https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/"
  tag: Blog
  text: Strategize your Azure migration for SQL workloads with Datadog
- link: "https://www.datadoghq.com/blog/datadog-monitoring-always-on/"
  tag: Blog
  text: Monitor your AlwaysOn availability groups with Datadog Database Monitoring

---

データベースモニタリングは、クエリメトリクス、クエリサンプル、実行計画、データベースの状態、フェイルオーバー、イベントを公開することで、Microsoft SQL Server データベースを詳細に可視化します。

データベースでデータベースモニタリングを有効にするには、以下の手順を実行します。

1. [Grant the Agent access](#grant-the-agent-access)
1. [Agent をインストールする](#install-the-agent)

## はじめに

サポートされている SQL Server バージョン
: 2012、2014、2016、2017、2019、2022

{{% dbm-sqlserver-before-you-begin %}}

## Agent にアクセスを付与する

Datadog Agent が統計やクエリを収集するためには、データベース サーバーへの読み取り専用のアクセスが必要となります。

サーバーに接続するための読み取り専用ログインを作成し、必要な権限を付与します。

{{< tabs >}}
{{% tab "SQL Server 2014+" %}}

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT CONNECT ANY DATABASE to datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
-- To use Log Shipping Monitoring (available in Agent v7.50+), uncomment the next three lines:
-- USE msdb;
-- CREATE USER datadog FOR LOGIN datadog;
-- GRANT SELECT to datadog;
```
{{% /tab %}}
{{% tab "SQL Server 2012" %}}

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
-- To use Log Shipping Monitoring (available in Agent v7.50+), uncomment the next three lines:
-- USE msdb;
-- CREATE USER datadog FOR LOGIN datadog;
-- GRANT SELECT to datadog;
```

追加した各アプリケーションデータベースに `datadog` ユーザーを作成します。
```SQL
USE [database_name];
CREATE USER datadog FOR LOGIN datadog;
```
{{% /tab %}}
{{< /tabs >}}

## Agent のインストール

Agent を SQL Server ホストに直接インストールすることをお勧めします。そうすることで、SQL Server 固有のテレメトリーに加え、様々なシステムテレメトリー (CPU、メモリ、ディスク、ネットワーク) を収集することができるからです。

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

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}
