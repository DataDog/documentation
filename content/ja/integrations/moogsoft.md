---
algolia:
  subcategory: Marketplace インテグレーション
app_id: moogsoft
app_uuid: db3d32c6-1127-4bd5-b270-01aa573616b7
assets:
  dashboards:
    Moogsoft Overview: assets/dashboards/moogsoft_overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: moogsoft.incident.count
      metadata_path: metadata.csv
      prefix: moogsoft.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10151
    source_type_name: Moogsoft
author:
  homepage: https://moogsoft.com
  name: Moogsoft
  sales_email: subscriptions@moogsoft.com
  support_email: support@moogsoft.com
  vendor_id: moogsoft
categories:
- 自動化
- インシデント
- マーケットプレイス
- notifications
- ai/ml
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: moogsoft
integration_id: moogsoft
integration_title: Moogsoft
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: moogsoft
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.moogsoft
  product_id: cloud
  short_description: イベント/メトリクスのボリュームに応じた価格帯の設定
  tag: コア
  unit_label: Moogsoft イベントまたは 500 Moogsoft メトリクス
  unit_price: 0.05
public_title: Moogsoft
short_description: 高度なセルフサービス AI 駆動の可観測性プラットフォーム
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Incidents
  - Category::Marketplace
  - Category::Notifications
  - Category::AI/ML
  - Offering::Integration
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Incidents
  configuration: README.md#Setup
  description: 高度なセルフサービス AI 駆動の可観測性プラットフォーム
  media:
  - caption: Moogsoft 相関
    image_url: images/moogsoft.correlation.png
    media_type: image
  - caption: Moogsoft ダッシュボード
    image_url: images/moogsoft.dashboard.png
    media_type: image
  - caption: Moogsoft インシデント相関
    image_url: images/moogsoft.main.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Moogsoft
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Datadog と Moogsoft を簡単に統合して、AI モニタリングと可観測性を組み合わせます。完全にデジタルであるか、レガシーアプリケーションを使用しているか、またはその両方のハイブリッドであるかにかかわらず、このソリューションはアラートノイズを低減し、チームおよび IT 運用全体の運用効率を向上させます。

Moogsoft は、高度なセルフサービス AI 駆動の可観測性プラットフォームを提供します。これにより、ソフトウェアエンジニア、開発者、運用者は、すべてを即座に確認し、何が問題であるかを認識し、問題をより迅速に修正できます。

Moogsoft は、エンタープライズクラスのクラウドネイティブプラットフォームを提供します。これにより、お客様は、はるかに低いコストで自分のペースで導入を推進できます。

### 観察する

サービス提供の品質を向上させます。私たちが行うのは、お客様のチームが迅速に行動し、集中力を保ち、中断が発生する前にインシデントを解決することができるように、重大な状況をエスカレーションするだけです。

### モニター

アラート量の削減と生産性の向上を体感しましょう。統合された監視パネルを使用し、同様のイベントを相互に関連付けてアクション可能なアラートを最小限に抑えることで、イベントによる疲弊を解消します。

### コラボレーション

すべてを 1 つのビューで確認しましょう。すべてのアプリ、サービス、インフラストラクチャーのアラートを単一のコンソールに集約して、俊敏性を高め、アラートを減らし、解決時間を短縮します。

### Moogsoft データフロー

データは Moogsoft の中を流れ、各ステップでコンテキストを獲得し、ノイズを低減します。メトリクスはイベントとなり、イベントはステートフルアラートとなり、アラートはインシデントに関連付けられます。

## Agent
Moogsoft サポート ([https://support.moogsoft.com][1]) までお問い合わせください。

[1]: https://support.moogsoft.com

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/moogsoft" target="_blank">こちらをクリック</a>してください。