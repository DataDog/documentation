---
algolia:
  subcategory: Marketplace Integrations
app_id: insightfinder-insightfinder-license
app_uuid: 6f2fcb70-c087-412a-b221-360ba6a1c68f
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10299
    source_type_name: InsightFinder License
author:
  homepage: https://insightfinder.com/
  name: InsightFinder
  sales_email: info@insightfinder.com
  support_email: support@insightfinder.com
  vendor_id: insightfinder
categories:
- alerting
- marketplace
- notifications
- ai/ml
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: insightfinder_insightfinder
integration_id: insightfinder-insightfinder-license
integration_title: InsightFinder
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: insightfinder_insightfinder
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.insightfinder.insightfinder
  product_id: insightfinder
  short_description: Incident Prediction and Investigation  platform, powered by AIOps
  tag: node
  unit_label: Node monitored
  unit_price: 10
public_title: InsightFinder
short_description: Human-Centered AI Platform for Incident Investigation and Prevention
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Marketplace
  - Category::Notifications
  - Category::AI/ML
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Human-Centered AI Platform for Incident Investigation and Prevention
  media:
  - caption: InsightFinder AIOps platform for incident prediction and investigation.
    image_url: images/InsightFinder_healthview.png
    media_type: image
  - caption: InsightFinder AIOps platform dashboard for holistic health view.
    image_url: images/InsightFinder_dashboard.png
    media_type: image
  - caption: InsightFinder incident investigation and action.
    image_url: images/InsightFinder_investigation.png
    media_type: image
  - caption: InsightFinder prediction.
    image_url: images/InsightFinder_prediction.png
    media_type: image
  - caption: InsightFinder metric anomaly detection.
    image_url: images/InsightFinder_metric.png
    media_type: image
  - caption: InsightFinder log analysis.
    image_url: images/InsightFinder_log.png
    media_type: image
  - caption: InsightFinder OOTB dashboard populated by DataDog.
    image_url: images/InsightFinder_dd_dashboard.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/resolve-incidents-faster-with-insightfinder/
  support: README.md#Support
  title: InsightFinder
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
DevSecOps、DataOps、MLOps、IT 運用、SRE チームは、複雑なモダン IT アーキテクチャにおけるインフラストラクチャー、データ、セキュリティの問題を予測・防止するワンストップ AI インテリジェンスエンジンとして [InsightFinder][1] に依存しています。インシデント予測、教師なし機械学習、パターン駆動型自動修復のための独自の特許機能を搭載した InsightFinder プラットフォームは、マシンデータから継続的に学習し、ビジネスに影響を与える前にすべての問題を特定し修正します。

InsightFinder の無料トライアルや、Datadog をはじめとする DevSecOps、IT 運用管理 (ITOM)、IT サービス管理 (ITSM) の人気ツールとのインテグレーションにより、お客様は迅速に価値を得ることができます。

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから InsightFinder にお問い合わせください。

- メール: [support@insightfinder.com][4]
- [Datadog のサポートチーム][5]までお問い合わせください。

### その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog Marketplace の InsightFinder の製品を使って、インシデントを迅速に特定し、解決する][6]

[1]: https://insightfinder.com/
[2]: https://app.insightfinder.com/
[3]: https://insightfinder.com/datadog-integration/
[4]: mailto:support@insightfinder.com
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://www.datadoghq.com/blog/resolve-incidents-faster-with-insightfinder/
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/insightfinder-insightfinder-license" target="_blank">こちらをクリック</a>してください。