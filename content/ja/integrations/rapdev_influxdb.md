---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-influxdb
app_uuid: e560c4c8-7983-4338-bc41-30b121a4ac98
assets:
  dashboards:
    RapDev InfluxDB API Statistics: assets/dashboards/RapDevInfluxDBAPIStatistics.json
    RapDev InfluxDB Summary: assets/dashboards/RapDevInfluxDBSummary.json
    RapDev InfluxDB System: assets/dashboards/RapDevInfluxDBSystem.json
    RapDev InfluxDB Tasks and Services: assets/dashboards/RapDevInfluxDBTasksandServices.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.influxdb.go_info
      metadata_path: metadata.csv
      prefix: rapdev.influxdb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10292
    source_type_name: RapDev InfluxDB
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- data stores
- マーケットプレイス
- メトリクス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_influxdb
integration_id: rapdev-influxdb
integration_title: InfluxDB
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_influxdb
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.influxdb
  product_id: influxdb
  short_description: インスタンス 1 個あたりの単価。
  tag: influxdb_endpoint
  unit_label: InfluxDB インスタンス
  unit_price: 10
public_title: InfluxDB
short_description: InfluxDB インスタンスの健全性とアクティビティを監視する
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Stores
  - Category::Marketplace
  - Category::Metrics
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: InfluxDB インスタンスの健全性とアクティビティを監視する
  media:
  - caption: InfluxDB インテグレーションダッシュボード - API 統計
    image_url: images/rapdev-influxdb-api.png
    media_type: image
  - caption: InfluxDB インテグレーションダッシュボード - サマリー
    image_url: images/rapdev-influxdb-summary.png
    media_type: image
  - caption: InfluxDB インテグレーションダッシュボード - システム
    image_url: images/rapdev-influxdb-system.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: InfluxDB
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

このインテグレーションは、[InfluxDB][1] v2.0+ の健全性と運用に関するメトリクスを報告します。

### ライブラリ

このインテグレーションでは、**InfluxDB Summary**、**InfluxDB API Statistics**、**InfluxDB System**、**InfluxDB Tasks and Services** という名前の、すぐに使えるダッシュボードをいくつか 提供します。これらのダッシュボードは、インテグレーションによって生成されたメトリクスを表示し、異なるカテゴリーに分割します。

## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。
- サポート: support@rapdev.io
- セールス: sales@rapdev.io
- チャット: [rapdev.io][2]
- 電話: 855-857-0222

---

ボストンより ❤️ を込めて
*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら][4]から RapDev へメッセージをお送りいただければ、導入をサポートいたします！*


[1]: https://www.influxdata.com/
[2]: https://www.rapdev.io/#Get-in-touch
[3]: mailto:sales@rapdev.io
[4]: mailto:support@rapdev.io

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-influxdb" target="_blank">こちらをクリック</a>してください。