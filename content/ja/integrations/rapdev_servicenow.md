---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-servicenow
app_uuid: 50d76130-5970-43e1-a055-0cd5d681d9b7
assets:
  dashboards:
    RapDev ServiceNow: assets/dashboards/servicenow.json
    RapDev ServiceNow ITSM: assets/dashboards/servicenow_itsm.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: rapdev.servicenow.record
      metadata_path: metadata.csv
      prefix: rapdev.servicenow.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10184
    source_type_name: RapDev ServiceNow
  logs: {}
  monitors:
    ServiceNow Pending Approval: assets/monitors/servicenow_pending_approval_monitor.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- クラウド
- インシデント
- マーケットプレイス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_servicenow
integration_id: rapdev-servicenow
integration_title: ServiceNow Performance Monitoring
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_servicenow
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.servicenow
  product_id: servicenow
  short_description: インスタンス 1 個あたりの単価
  tag: instance_name
  unit_label: ServiceNow インスタンス
  unit_price: 1000
public_title: ServiceNow Performance Monitoring
short_description: ServiceNow インスタンスのパフォーマンスと ITSM レコードを監視する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Incidents
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: ServiceNow インスタンスのパフォーマンスと ITSM レコードを監視する
  media:
  - caption: ServiceNow インスタンスパフォーマンスダッシュボード
    image_url: images/1.png
    media_type: image
  - caption: ServiceNow ITSM ダッシュボードのレコード統計 1 / 2
    image_url: images/2.png
    media_type: image
  - caption: ServiceNow ITSM ダッシュボードのレコード統計 2 / 2
    image_url: images/3.png
    media_type: image
  - caption: ServiceNow ITSM ダッシュボードの SLA 統計
    image_url: images/4.png
    media_type: image
  - caption: ServiceNow ITSM ダッシュボードのテーブル接続統計
    image_url: images/5.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: ServiceNow Performance Monitoring
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->
## 概要

ServiceNow Performance Monitoring インテグレーションは、トランザクション、ジョブ、データベース、キャッシュメトリクスに関する豊富な洞察を使用して、ServiceNow インスタンスの状態とパフォーマンスを監視します。このインテグレーションにより、未解決の ITSM レコードも追跡され、SLA とビジネスに影響を与えるレコードの年齢の両方に関する実用的なデータポイントが提供されます。

## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

 - メール: support@rapdev.io
 - チャット: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - 電話: 855-857-0222

---

ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:support@rapdev.io)からメッセージをお送りいただければ、導入をサポートいたします！*

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-servicenow" target="_blank">こちらをクリック</a>してください。