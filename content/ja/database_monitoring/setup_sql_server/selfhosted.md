---
description: セルフホスト SQL Server のデータベースモニタリングをインストールして構成します
further_reading:
- link: /integrations/sqlserver/
  tag: ドキュメント
  text: 基本的な SQL Server インテグレーション
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: ドキュメント
  text: よくある問題のトラブルシューティング
kind: documentation
title: セルフホスト SQL Server のデータベースモニタリングの設定
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">データベースモニタリングはこのサイトでサポートされていません。</div>
{{< /site-region >}}

データベースモニタリングは、クエリメトリクス、クエリサンプル、実行計画、データベースの状態、フェイルオーバー、イベントを公開することで、Microsoft SQL Server データベースを詳細に可視化します。

データベースでデータベースモニタリングを有効にするには、以下の手順を実行します。

1. [Agent にデータベースへのアクセスを付与する](#grant-the-agent-access)
2. [Agent をインストールする](#install-the-agent)

## はじめに

サポートされている SQL Server バージョン
: 2012、2014、2016、2017、2019

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
```
{{% /tab %}}
{{% tab "SQL Server 2012" %}}

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
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

**AlwaysOn ユーザーの場合**、Agent は別のサーバーにインストールし、リスナーエンドポイントを介してクラスターに接続する必要があります。これは、Availability Group (AG) のセカンダリレプリカに関する情報がプライマリレプリカから収集されるからです。さらに、この方法で Agent をインストールすると、フェイルオーバー時に Agent を稼働させ続けることができます。

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

## Agent の構成例
{{% dbm-sqlserver-agent-config-examples %}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}