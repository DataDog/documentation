---
algolia:
  subcategory: Marketplace インテグレーション
app_id: redpeaks-sap-businessobjects
app_uuid: f6278fc8-8b6a-4f88-922b-3da687b26e62
assets:
  dashboards:
    Redpeaks SAP BusinessObjects overview: assets/dashboards/redpeaks_sap_businessobjects_global_overview.json
    Redpeaks SAP BusinessObjects system dashboard: assets/dashboards/redpeaks_sap_businessobjects_system.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.redpeaks.sap_businessobjects.system
      metadata_path: metadata.csv
      prefix: redpeaks
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10999
    source_type_name: Redpeaks SAP BusinessObjects
author:
  homepage: https://www.redpeaks.io
  name: Redpeaks
  sales_email: sales@redpeaks.io
  support_email: support@redpeaks.io
  vendor_id: redpeaks
categories:
- marketplace
- sap
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: redpeaks_sap_businessobjects
integration_id: redpeaks-sap-businessobjects
integration_title: SAP BusinessObjects
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: redpeaks_sap_businessobjects
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.redpeaks.sap_businessobjects.system
  product_id: sap-businessobjects
  short_description: 監視する SAP システム (SID で識別) ごとの価格
  tag: uri
  unit_label: SAP BusinessObjects インスタンス
  unit_price: 160.0
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

リモート **エージェントレス**接続とあらかじめ設定済みの監視テンプレートを利用すれば、**数分**で稼働を開始できます。

モニタリングは [Redpeaks][1] によって提供されます (旧称: Agentil Software - Pro.Monitor)。本インテグレーションは標準構成で、SAP システムの主要なコンポーネント (**接続**、**サービス**、**レポート**、**スケジュール**、**監査警告** など) をカバーします。

このインテグレーションは、システムのデータをリアルタイムに収集・分析し、メトリクスとアクション可能なイベントを生成します。Redpeaks を構成し、メトリクスに対して直接 Datadog モニターを作成することで、アラートをきめ細かく調整できます。

Redpeaks は、1 つのシステムから数百のシステムまで、あらゆる種類と規模の SAP デプロイメントと連携します。オン プレミス、プライベート クラウド、ハイブリッド環境をサポートし、個別のニーズに柔軟に対応します。

### 監視対象モジュール

- サーバーのステータス
- 同時接続ユーザー
- サーバーメトリクス
- サーバーのプロパティ
- スケジュールとレポート
- CMC と監査警告

## サポート

サポートまたは機能リクエストについては、以下のチャンネルを通じて Redpeaks に連絡してください。

- メール: [support@redpeaks.io][2]

### その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog Marketplace の Redpeaks の製品を使って SAP NetWeaver を監視する][5]

*SAP や他のプラットフォームとの特定のインテグレーションのための信頼できるパートナーをお探しなら、ぜひ当社にご連絡ください。*

---
この製品は、スイスのジュネーブで設計・開発されています。

[1]: https://www.redpeaks.io
[2]: mailto:support@redpeaks.io
[3]: https://softwaredownloads.sap.com/file/0020000000507122021
[4]: https://wiki.redpeaks.io/doku.php?id=products:promonitor:6.8:userguide:configuration
[5]: https://www.datadoghq.com/blog/sap-netweaver-monitoring-agentil-datadog-marketplace/
[6]: https://wiki.redpeaks.io/doku.php?id=products:promonitor:6.8:installguide:prerequisites
[7]: https://wiki.redpeaks.io/doku.php?id=products:cockpit:1.0:installguide:installjava
[8]: https://agentil.box.com/s/k0yp1tk58r666rfncf0nb9k1qa0guvdc


---
このアプリケーションは Datadog Marketplace で提供されており、Datadog テクノロジー パートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/redpeaks-sap-businessobjects" target="_blank">Datadog Marketplace でこのアプリケーションを購入してください</a>。