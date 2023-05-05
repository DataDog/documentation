---
app_id: insightfinder-insightfinder-license
app_uuid: 6f2fcb70-c087-412a-b221-360ba6a1c68f
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: InsightFinder ライセンス
author:
  homepage: https://insightfinder.com/
  name: InsightFinder
  sales_email: info@insightfinder.com
  support_email: support@insightfinder.com
  vendor_id: insightfinder
categories:
- アラート設定
- マーケットプレイス
- notification
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: insightfinder_insightfinder
integration_id: insightfinder-insightfinder-license
integration_title: InsightFinder
integration_version: ''
is_public: true
kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: insightfinder_insightfinder
oauth: {}
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.insightfinder.insightfinder
  product_id: insightfinder
  short_description: AIOps が提供するインシデント予測・調査プラットフォーム
  tag: ノード
  unit_label: 監視されるノード
  unit_price: 1.0
public_title: InsightFinder
short_description: インシデント調査・予防のための人間中心型 AI プラットフォーム
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Marketplace
  - Category::Notification
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: インシデント調査・予防のための人間中心型 AI プラットフォーム
  media:
  - caption: インシデント予測・調査のための AIOps プラットフォーム「InsightFinder」。
    image_url: images/insightfinder_main.jpg
    media_type: image
  - caption: InsightFinder によるインシデント調査・アクション。
    image_url: images/insightfinder_incident.jpg
    media_type: image
  - caption: 全体的な健全性を把握することができる AIOps プラットフォーム「InsightFinder」のダッシュボード。
    image_url: images/insightfinder_dashboard.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: InsightFinder
  uninstallation: README.md#Uninstallation
---



## 概要
[InsightFinder][1] Unified Intelligence Engine (UIE) プラットフォームは、インシデントの根本原因の特定、予測、本番インシデントの予防のための人間中心型の AI ソリューションを提供します。特許取得済みの自己調整型教師なし機械学習を搭載した InsightFinder は、SRE や DevOps エンジニアからのメトリクス時系列、ログ、トレース、トリアージスレッドから継続的に学習し、根本原因をバブルアップしてインシデントをソースから予測することが可能です。あらゆる規模の企業がこのプラットフォームを採用し、ビジネスに影響を与えるインシデントを数時間前に予測し、根本原因を明確に特定することができるようになりました。

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから InsightFinder にお問い合わせください。

- メール: [support@insightfinder.com][5]
- [Datadog のサポートチーム][4]までお問い合わせください。

### その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog Marketplace の InsightFinder の製品を使って、インシデントを迅速に特定し、解決する][7]

[1]: https://insightfinder.com/
[2]: https://app.datadoghq.com/integrations/insightfinder
[3]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[4]: https://docs.datadoghq.com/ja/help/
[5]: mailto:support@insightfinder.com
[6]: mailto:info@insightfinder.com
[7]: https://www.datadoghq.com/blog/resolve-incidents-faster-with-insightfinder/
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/insightfinder-insightfinder-license" target="_blank">こちらをクリック</a>してください。