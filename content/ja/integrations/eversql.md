---
app_id: eversql
app_uuid: bc900600-d0cf-4ddf-83b7-cdaba44d1525
assets: {}
author:
  homepage: https://eversql.com
  name: EverSQL
  sales_email: sales@eversql.com
  support_email: support@eversql.com
categories:
- 自動化
- data stores
- developer tools
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/eversql/README.md
display_on_public_website: true
draft: false
git_integration_title: eversql
integration_id: eversql
integration_title: 'EverSQL: データベースのチューニング'
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: eversql
public_title: 'EverSQL: データベースのチューニング'
short_description: MySQL、PostgreSQL、Aurora のための自動 SQL およびデータベースチューニング
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Data Stores
  - Category::Developer Tools
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: MySQL、PostgreSQL、Aurora のための自動 SQL およびデータベースチューニング
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
  overview: README.md#Overview
  support: README.md#Support
  title: 'EverSQL: データベースのチューニング'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[EverSQL][1] は、データベースの高速化と SQL クエリの最適化を実現し、開発者、DBA、DevOps エンジニアのために SQL の自動チューニングとインデックス作成を提供する方法です。

EverSQL は非侵入型であり、データベースの機密データには一切アクセスしません。

### API

Datadog データベースモニタリングダッシュボードで見つかった遅い SQL クエリは、EverSQL を使用して最適化することができます。Datadog から遅い SQL クエリをコピーし、EverSQL の [SQL Optimization][2] プロセスに直接ペーストします。遅いクエリのトラブルシューティングについては、[データベースモニタリングの概要][3]ガイドを参照してください。

### 対応データベース:
MySQL、PostgreSQL、AWS Aurora、Google Cloud SQL、Azure DB、Percona、MariaDB

## 計画と使用

### ブラウザトラブルシューティング
Datadog によって特定された遅い SQL クエリを高速化するには
1. [Datadog データベースモニタリング][4]ダッシュボードに移動し、遅い SQL クエリテーブルを見つけます。
2. 関連するデータベースのフィルターを追加し、Average Latency などの関連するパフォーマンスメトリクスでソートします。
3. 高速化したい SQL クエリを特定したら、それを Datadog からコピーします。
4. [EverSQL][2] に移動し、クエリ最適化プロセスの一環として SQL クエリをペーストします。
5. 最適化レポートから、データベースに最適なインデックスをコピーして作成します。
6. 書き換えた最適化クエリをアプリケーションコードにコピーします。

## リアルユーザーモニタリング

### データセキュリティ

EverSQL には、メトリクスは含まれません。

### ヘルプ

EverSQL には、サービスのチェック機能は含まれません。

### ヘルプ

EverSQL には、イベントは含まれません。

## Agent

ご不明な点は、[EverSQL のサポートチーム][5]までお問合せください。

[1]: https://www.eversql.com/
[2]: https://www.eversql.com/sql-query-optimizer/
[3]: https://docs.datadoghq.com/ja/getting_started/database_monitoring/#troubleshoot-a-slow-query
[4]: https://app.datadoghq.com/databases/
[5]: https://eversql.freshdesk.com/support/tickets/new