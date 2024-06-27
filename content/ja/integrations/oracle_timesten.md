---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-oracle-timesten
app_uuid: bddd0f6a-efe0-4e3f-bff4-46df8bb839f9
assets:
  dashboards:
    Oracle TimesTen: assets/dashboards/oracle_timesten.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: rapdev.oracle_timesten.reportduration
      metadata_path: metadata.csv
      prefix: rapdev.oracle_timesten.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10116
    source_type_name: Oracle TimesTen
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
- oracle
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oracle_timesten
integration_id: rapdev-oracle-timesten
integration_title: Oracle TimesTen
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: oracle_timesten
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.oracle_timesten
  product_id: oracle-timesten
  short_description: ホスト 1 個あたりの単価
  tag: ホスト
  unit_label: Oracle Times Ten データベース
  unit_price: 500
public_title: Oracle TimesTen
short_description: Oracle TimesTen データベースのパフォーマンスを監視する
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Stores
  - Category::Marketplace
  - Category::Oracle
  - Offering::Integration
  - Supported OS::Linux
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Oracle TimesTen データベースのパフォーマンスを監視する
  media:
  - caption: Oracle TimesTen Datadog インテグレーション
    image_url: images/video.png
    media_type: ビデオ
    vimeo_id: 630489692
  - caption: ステータスの概要
    image_url: images/1.png
    media_type: image
  - caption: レプリケーションメトリクス
    image_url: images/2.png
    media_type: image
  - caption: SQL 統計
    image_url: images/3.png
    media_type: image
  - caption: ダッシュボード概要
    image_url: images/4.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Oracle TimesTen
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Oracle TimesTen インテグレーションにより、TimesTen インメモリデータベースを監視できます。このインテグレーションは 200 を超えるメトリクスをカバーし、上位のクエリ、データベースステータス、実行時間などに関する詳細を提供します。

このインテグレーションには、TimesTen データベースのステータスとメトリクスを概観するダッシュボードが含まれています。

## Agent

サポートまたは機能リクエストについては、以下のチャンネルで RapDev.io までお問い合わせください。

 - メール: support@rapdev.io
 - チャット: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:support@rapdev.io)からメッセージをお送りいただければ、導入をサポートいたします！*

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-oracle-timesten" target="_blank">こちらをクリック</a>してください。