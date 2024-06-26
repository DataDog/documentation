---
algolia:
  subcategory: Marketplace インテグレーション
app_id: speedscale-speedscale
app_uuid: beb5efb1-63d5-4030-840d-7dbf6a92a4d6
assets: {}
author:
  homepage: https://speedscale.com
  name: Speedscale
  sales_email: datadog-sales@speedscale.com
  support_email: support@speedscale.com
  vendor_id: speedscale
categories:
- コンテナ
- kubernetes
- マーケットプレイス
- テスト
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: speedscale_speedscale
integration_id: speedscale-speedscale
integration_title: Speedscale
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: speedscale_speedscale
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: software-license
  short_description: Speedscale Pro へのアクセス、最大 100 回のリプレイ、10GB のトラフィックの月額料金
  unit_price: 999
public_title: Speedscale
short_description: Kubernetes の負荷テスト用トラフィックリプレイプラットフォーム
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Marketplace
  - Category::Testing
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Kubernetes の負荷テスト用トラフィックリプレイプラットフォーム
  media:
  - caption: Speedscale トラフィックキャプチャ
    image_url: images/spd-1-traffic-capture.png
    media_type: image
  - caption: Speedscale リプレイレポート
    image_url: images/spd-2-report.png
    media_type: image
  - caption: Datadog ダッシュボードと Speedscale のインテグレーション
    image_url: images/spd-3-datadog-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Speedscale
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
多くの企業は、クラウドサービスの問題が顧客に影響を与える前に発見することに苦労しています。開発者にとって、テストを書くことは手作業で時間がかかるものです。Speedscale は、Kubernetes のエンジニアリングと DevOps チームが、新しいコードが実世界のシナリオでどのように実行されるかに自信を持てるよう支援します。Speedscale は、コードをリリースする前に、API トラフィックの収集と再生、負荷やカオスのシミュレーション、レイテンシー、スループット、飽和、エラーの計測を行うことができます。Speedscale トラフィックリプレイは、実行に数日または数週間かかり、最新のアーキテクチャにうまく対応できない従来のテスト手法に代わるものです。

Speedscale のトラフィックリプレイ結果を Datadog に公開するには、[Speedscale インテグレーション][1]をインストールします。このインテグレーションにより、Datadog の観測可能性データと Speedscale の特定のリプレイ結果を組み合わせて、パフォーマンス低下の根本原因を調査することができます。

## Agent

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Speedscale にお問い合わせください。

- メール: [support@speedscale.com][5]
- Slack: [Community][4]

### その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog Marketplace で Speedscale の製品を使って Kubernetes アプリケーションのストレステストを実行する][6]
- [Speedscale ドキュメント][3]

[1]: /ja/integrations/speedscale
[3]: https://docs.speedscale.com/
[4]: https://slack.speedscale.com/
[5]: mailto:support@speedscale.com
[6]: https://www.datadoghq.com/blog/stress-test-kubernetes-with-speedscale/
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/speedscale-speedscale" target="_blank">こちらをクリック</a>してください。