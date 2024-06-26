---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-maxdb
app_uuid: f30ae17c-d58a-43f4-a8a6-693279394101
assets:
  dashboards:
    RapDev MaxDB Dashboard: assets/dashboards/rapdev_maxdb_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.maxdb.db_state
      metadata_path: metadata.csv
      prefix: rapdev.maxdb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10131
    source_type_name: RapDev MaxDB
  monitors:
    RapDev MaxDB Data Volume Usage: assets/monitors/rapdev_maxdb_data_volume_usage.json
    RapDev MaxDB Database Connection Check: assets/monitors/rapdev_maxdb_connection_check.json
    RapDev MaxDB Database State: assets/monitors/rapdev_maxdb_state.json
    RapDev MaxDB Lock Utilization: assets/monitors/rapdev_maxdb_lock_utilization.json
    RapDev MaxDB Log Area Usage: assets/monitors/rapdev_maxdb_log_area_usage.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- キャッシュ
- data stores
- マーケットプレイス
- sap
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_maxdb
integration_id: rapdev-maxdb
integration_title: MaxDB
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_maxdb
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.maxdb
  product_id: maxdb
  short_description: データベース 1 個あたりの単価
  tag: db
  unit_label: データベース
  unit_price: 50
public_title: MaxDB
short_description: MaxDB データベースのボリューム、キャッシュ、スキーマ、テーブルなどを監視します
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Stores
  - Category::Marketplace
  - Category::SAP
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: MaxDB データベースのボリューム、キャッシュ、スキーマ、テーブルなどを監視します
  media:
  - caption: データベースのステータス & データ/ログメトリクス
    image_url: images/1.png
    media_type: image
  - caption: データベースキャッシュメトリクス
    image_url: images/2.png
    media_type: image
  - caption: セッション、OMS、スキーマメトリクス
    image_url: images/3.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: MaxDB
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->
## 概要

MaxDB インテグレーションは MaxDB インスタンスのデータ、ログ領域、ボリューム、キャッシュ、セッション、ロック、その他のメトリクスを監視し、データベースが正常に稼働していることを確認します。このインテグレーションで利用可能なダッシュボードは、データベースおよびデータベースホストでフィルタリングすることができます。MaxDB インテグレーションにはまた、データベースの総合的な健全性に関連する共通のメトリクスのモニターも搭載されています。

### ログ管理
1. MaxDB 接続チェック
2. MaxDB ステート
3. MaxDB データボリューム使用量
4. MaxDB ロック使用率
5. MaxDB ログ領域使用量

## Agent

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

 - メール: support@rapdev.io 
 - チャット: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - 電話: 855-857-0222 

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:support@rapdev.io)からメッセージをお送りいただければ、導入をサポートいたします！*

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-maxdb" target="_blank">こちらをクリック</a>してください。