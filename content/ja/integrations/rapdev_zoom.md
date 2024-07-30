---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-zoom
app_uuid: a79217b7-6499-4de5-8ebd-73a91d227644
assets:
  dashboards:
    RapDev Zoom Call Quality: assets/dashboards/rapdev_zoom_meeting_quality.json
    RapDev Zoom Geolocation Overview: assets/dashboards/rapdev_zoom_geo_overview.json
    RapDev Zoom Overview: assets/dashboards/rapdev_zoom_overview.json
    RapDev Zoom Phones Overview: assets/dashboards/rapdev_zoom_phones_overview.json
    RapDev Zoom Rooms Dashboard: assets/dashboards/rapdev_zoom_rooms_dashboard.json
    RapDev Zoom User Details: assets/dashboards/rapdev_zoom_user_details.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.zoom.meetings.count
      metadata_path: metadata.csv
      prefix: rapdev.zoom.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10150
    source_type_name: RapDev Zoom
  logs: {}
  monitors:
    Zoom API Limit Was Encountered: assets/monitors/zoom_api_rate_limit.json
    Zoom Room's Component is Offline or Not Working Properly: assets/monitors/zoom_room_component_has_problem.json
    Zoom Room's Health is in Warning or Critical State: assets/monitors/zoom_room_has_problem.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- マーケットプレイス
- クラウド
- コラボレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_zoom
integration_id: rapdev-zoom
integration_title: Zoom
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_zoom
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.zoom
  product_id: zoom
  short_description: ユーザー 1 人またはデバイス 1 台あたりの単価
  tag: zoom_user_email
  unit_label: Zoom 登録ユーザーと電話デバイス
  unit_price: 1
public_title: Zoom
short_description: Zoom アカウントを監視し、ライセンスを最適化します
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
  - Category::Marketplace
  - Category::Cloud
  - Category::Collaboration
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Zoom アカウントを監視し、ライセンスを最適化します
  media:
  - caption: ミーティング概要
    image_url: images/meetings.png
    media_type: image
  - caption: Zoom Rooms ダッシュボード
    image_url: images/rooms.png
    media_type: image
  - caption: ミーティング品質概要
    image_url: images/meeting_quality.png
    media_type: image
  - caption: ユーザー詳細ダッシュボード
    image_url: images/user_details.png
    media_type: image
  - caption: ジオロケーション概要
    image_url: images/geo.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Zoom
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Zoom インテグレーションにより、ミーティング、Rooms、ユーザー、ネットワーク分析、そしてジオロケーションの概要を監視することで、世界中のあらゆる場所で勤務する従業員に最適な利用体験を提供することができます。インテグレーションには、完全カスタマイズが可能な 4 つのダッシュボードが事前構築されており、重要な情報を表面化できます。さらに、エンジニア、IT責任者、マネージャー、そして管理職レベルのすべてのユーザーに普遍的に利用価値のあるビジュアルを提供するよう設計されています。

### ログ管理

1. Zoom Room に問題があります
2. Zoom Room のコンポーネントに問題があります

### ライブラリ

1. RapDev Zoom ミーティング概要
2. RapDev Zoom Rooms ダッシュボード
3. RapDev Zoom ミーティング品質
4. RapDev Zoom ユーザー詳細
5. RapDev Zoom ジオ概要
6. RapDev Zoom Phones 概要

## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- サポート: support@rapdev.io
- セールス: sales@rapdev.io
- チャット: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？RapDev へ[お問い合わせ](mailto:support@rapdev.io)ください！導入のサポートをいたします。*

[1]: https://marketplace.zoom.us/
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information


---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-zoom" target="_blank">こちらをクリック</a>してください。