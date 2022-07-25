---
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
- マーケットプレイス
- 自動化
- コンテナ
- テスト
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: speedscale_speedscale
integration_id: speedscale-speedscale
integration_title: Speedscale
integration_version: ''
is_public: true
kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: speedscale_speedscale
oauth: {}
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
- mac os
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Mac OS
  - Supported OS::Windows
  - Category::Marketplace
  - Category::Automation
  - Category::Containers
  - Category::Testing
  - Offering::Software License
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
---



## 概要
多くの企業は、クラウドサービスの問題が顧客に影響を与える前に発見することに苦労しています。開発者にとって、テストを書くことは手作業で時間がかかるものです。Speedscale は、Kubernetes のエンジニアリングと DevOps チームが、新しいコードが実世界のシナリオでどのように実行されるかに自信を持てるよう支援します。Speedscale は、コードをリリースする前に、API トラフィックの収集と再生、負荷やカオスのシミュレーション、レイテンシー、スループット、飽和、エラーの計測を行うことができます。Speedscale トラフィックリプレイは、実行に数日または数週間かかり、最新のアーキテクチャにうまく対応できない従来のテスト手法に代わるものです。

Speedscale のトラフィックリプレイ結果を Datadog に公開するには、[Speedscale インテグレーション][1]をインストールします。このインテグレーションにより、Datadog の観測可能性データと Speedscale の特定のリプレイ結果を組み合わせて、パフォーマンス低下の根本原因を調査することができます。

## サポート
Speedscale は、お客様が成功するために必要なツールや情報を提供することに全力を注いでいます。必要なときに必要な支援を得るための複数の方法を提供し、すべての[製品ドキュメント][3]はオンラインで一般公開されています。また、私たちの [Community Slack][4] に参加するか、[support@speedscale.com][5] に直接メールを送ることもできます。

[1]: https://app.datadoghq.com/integrations/speedscale
[2]: https://app.datadoghq.com/account/settings#integrations/speedscale
[3]: https://docs.speedscale.com/
[4]: https://slack.speedscale.com/
[5]: mailto:support@speedscale.com