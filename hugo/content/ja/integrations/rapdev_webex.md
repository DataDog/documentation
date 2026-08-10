---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-webex
app_uuid: f05f455f-3793-408c-8a8d-7a19a4d3b844
assets:
  dashboards:
    Rapdev Webex Dashboard: assets/dashboards/dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.webex.meetings
      metadata_path: metadata.csv
      prefix: rapdev.webex.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 6643593
    source_type_name: RapDev Webex
  monitors:
    Webex Integration Failed to Connect: assets/monitors/monitor.json
author:
  homepage: https://rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- コラボレーション
- イベント管理
- マーケットプレイス
- モニター
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_webex
integration_id: rapdev-webex
integration_title: Webex
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_webex
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.webex
  product_id: webex
  short_description: アクティブユーザー 1 人あたりの単価
  tag: display_name
  unit_label: アクティブユーザー
  unit_price: 1
public_title: Webex
short_description: Webex のライセンス、会議、参加者の詳細をメトリクスとして視覚化
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Collaboration
  - Category::Event Management
  - Category::Marketplace
  - Category::Metrics
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Webex のライセンス、会議、参加者の詳細をメトリクスとして視覚化
  media:
  - caption: RapDev Webex 概要ダッシュボード
    image_url: images/dashboard_example.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Webex
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Cisco の Webex は、Web ミーティングおよびビデオ会議アプリケーションです。Webex スイートには、Webex Meetings、Webex Teams、Webex Devices などのアプリケーションが含まれています。

Webex インテグレーションは、ミーティング、参加者、ライセンス、ユーザー、場所、デバイス、ワークスペース、組織内のグループに関するレポートを提供します。収集されるインサイトには以下が含まれます。
- ミーティングホストごとの現在アクティブなミーティングの数
- 各ミーティングの参加者名と人数の確認
- ライセンス利用状況と Webex デバイスに関するアラート
- 招待が保留中やログインが無効になっているユーザーに関するデバッグ
- Webex の地理的位置の視覚化

注: Webex インテグレーションでは、この情報を取得するために必要なスコープがサポートされていないため、通話品質に関する機能は現在サポートされていません。


## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- サポート: [support@rapdev.io][4]
- 営業: [sales@rapdev.io][1]
- チャット: [rapdev.io][5]
- 電話: 855-857-0222
---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に必要な重要な機能が欠けていますか？RapDev へ[お問い合わせ][4]ください。私たちがその機能を構築します！*

[1]: mailto:sales@rapdev.io
[2]: https://developer.webex.com/docs/integrations#scopes
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[4]: mailto:support@rapdev.io
[5]: https://www.rapdev.io/#Get-in-touch

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-webex" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。