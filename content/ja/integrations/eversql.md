---
app_id: eversql
categories:
- 自動化
- data stores
- 開発ツール
custom_kind: integration
description: MySQL、PostgreSQL、Aurora のための自動 SQL およびデータベースチューニング
integration_version: 1.0.0
media:
- caption: EverSQL SQL の最適化
  image_url: images/1.png
  media_type: image
- caption: EverSQL クエリの差分
  image_url: images/2.png
  media_type: image
- caption: EverSQL がサポートするデータベース
  image_url: images/3.png
  media_type: image
- caption: EverSQL がサポートする OS
  image_url: images/4.png
  media_type: image
supported_os:
- linux
- windows
- macos
title: 'EverSQL: データベースのチューニング'
---
## 概要

[EverSQL](https://www.eversql.com/) is a way to speed up your database and optimize SQL queries, providing automatic SQL tuning and indexing for developers, DBAs, and DevOps engineers.

EverSQL は非侵入型であり、データベースの機密データには一切アクセスしません。

### Usage

Slow SQL queries found in the Datadog Database Monitoring dashboard can be optimized using EverSQL. Copy the slow SQL query from Datadog and paste it directly into EverSQL's [SQL Optimization](https://www.eversql.com/sql-query-optimizer/) process. Learn more about troubleshooting a slow query in the [Getting Started with Database Monitoring](https://docs.datadoghq.com/getting_started/database_monitoring/#troubleshoot-a-slow-query) guide.

### Supported Databases:

MySQL、PostgreSQL、AWS Aurora、Google Cloud SQL、Azure DB、Percona、MariaDB

## セットアップ

### 設定

Datadog によって特定された遅い SQL クエリを高速化するには

1. Navigate to the [Datadog Database Monitoring](https://app.datadoghq.com/databases/) dashboard and locate the slow SQL queries table.
1. 関連するデータベースのフィルターを追加し、Average Latency などの関連するパフォーマンスメトリクスでソートします。
1. 高速化したい SQL クエリを特定したら、それを Datadog からコピーします。
1. Navigate to [EverSQL](https://www.eversql.com/sql-query-optimizer/) and paste the SQL query as part of the query optimization process.
1. 最適化レポートから、データベースに最適なインデックスをコピーして作成します。
1. 書き換えた最適化クエリをアプリケーションコードにコピーします。

## 収集データ

### メトリクス

EverSQL には、メトリクスは含まれません。

### サービス チェック

EverSQL には、サービスのチェック機能は含まれません。

### イベント

EverSQL には、イベントは含まれません。

## サポート

Need help? Contact [EverSQL support](https://eversql.freshdesk.com/support/tickets/new).