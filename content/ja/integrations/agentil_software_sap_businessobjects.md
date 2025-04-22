---
algolia:
  subcategory: Marketplace インテグレーション
app_id: agentil-software-sap-businessobjects
app_uuid: cac9d777-3bd1-40a1-aef3-28a8141804f1
assets:
  dashboards:
    SAP BusinessObjects dashboard: assets/dashboards/agentil_software_sap_businessobjects_system.json
    SAP BusinessObjects global overview: assets/dashboards/agentil_software_sap_businessobjects_global_overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.agentil_software.sap_businessobjects.system
      metadata_path: metadata.csv
      prefix: agentil_software
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10252
    source_type_name: AGENTIL Software SAP BusinessObjects
author:
  homepage: https://www.agentil-software.com
  name: Agentil Software
  sales_email: sales@agentil-software.com
  support_email: support@agentil-software.com
  vendor_id: agentil-software
categories:
- marketplace
- sap
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: agentil_software_sap_businessobjects
integration_id: agentil-software-sap-businessobjects
integration_title: SAP BusinessObjects
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: agentil_software_sap_businessobjects
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.agentil_software.sap_businessobjects.system
  product_id: sap-businessobjects
  short_description: 監視する SAP システム (SID で識別) ごとの価格
  tag: uri
  unit_label: SAP BusinessObjects インスタンス
  unit_price: 160
public_title: SAP BusinessObjects
short_description: SAP ビジネスオブジェクトシステムの監視
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::SAP
  - Offering::Integration
  - Supported OS::Linux
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: SAP ビジネスオブジェクトシステムの監視
  media:
  - caption: SAP BusinessObjects グローバルオーバービュー
    image_url: images/sap_businessobjects_global_overview_dashboard.png
    media_type: image
  - caption: SAP BusinessObjects システム概要
    image_url: images/sap_businessobjects_system_dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: SAP BusinessObjects
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
SAP BusinessObjects インテグレーションは、SAP **BusinessObjects** システムを監視します。

このインテグレーションは、リモートエージェントレス接続と事前設定された監視テンプレートを使用するため、数分で本稼働させることが可能です。

モニタリングは、AGENTIL Software の [Pro.Monitor](https://www.agentil-software.com) プラットフォームによって行われます。このプラットフォームは、SAP システムの最も関連性の高いモジュールとトランザクション (**接続**、*サービス**、レポート**、スケジュール**、**監査警告**など) をカバーするように、すぐに構成することが可能です。

このインテグレーションは、システムからリアルタイムでデータを収集・分析し、メトリクスとアクション可能なイベントを生成します。Pro.Monitor を構成するか、メトリクスに直接 Datadog モニターを作成することで、このデータに対してカスタマイズされたアラートを作成することができます。

### 監視対象モジュール

- サーバーのステータス
- 同時接続ユーザー
- サーバーメトリクス
- サーバーのプロパティ
- スケジュールとレポート
- CMC と監査警告

## サポート
サポートや機能のリクエストについては、AGENTIL Software (support@agentil-software.com) までお問い合わせください。

*SAP や他のプラットフォームとの特定のインテグレーションのための信頼できるパートナーをお探しなら、ぜひ当社にご連絡ください。*

---
この製品は、スイスのジュネーブで設計・開発されています。


---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/agentil-software-sap-businessobjects" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。