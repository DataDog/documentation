---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    RapDev Zoom Call Quality: assets/dashboards/rapdev_zoom_meeting_quality.json
    RapDev Zoom Geolocation Overview: assets/dashboards/rapdev_zoom_geo_overview.json
    RapDev Zoom Overview: assets/dashboards/rapdev_zoom_overview.json
    RapDev Zoom Rooms Dashboard: assets/dashboards/rapdev_zoom_rooms_dashboard.json
    RapDev Zoom User Details: assets/dashboards/rapdev_zoom_user_details.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors:
    Zoom Room's Component is Offline or Not Working Properly: assets/monitors/zoom_room_component_has_problem.json
    Zoom Room's Health is in Warning or Critical State: assets/monitors/zoom_room_has_problem.json
  saved_views: {}
  service_checks: assets/service_checks.json
author:
  homepage: 'https://www.rapdev.io'
  name: RapDev.io
categories:
  - マーケットプレイス
  - cloud
  - コラボレーション
  - メッセージング
  - モニタリング
creates_events: false
ddtype: crawler
dependencies: []
display_name: RapDev Zoom
draft: false
git_integration_title: rapdev_zoom
guid: a0a0380a-42b7-4977-92fc-a65c8d904b8d
integration_id: rapdev-zoom
integration_title: RapDev Zoom
is_public: true
kind: integration
maintainer: integrations@rapdev.io
manifest_version: 1.0.0
metric_prefix: rapdev.zoom.
metric_to_check: rapdev.zoom.meetings.count
name: rapdev_zoom
pricing:
  - billing_type: tag_count
    metric: datadog.marketplace.rapdev.zoom
    tag: zoom_user_email
    unit_label: Zoom 登録ユーザー
    unit_price: 1
public_title: RapDev Zoom
short_description: Zoom アカウントを監視し、ライセンスを最適化します。
support: パートナー
supported_os:
  - linux
  - mac_os
  - windows
terms:
  eula: assets/EULA.pdf
  legal_email: ddsales@rapdev.io
---
## 概要

Zoom インテグレーションにより、ミーティング、Rooms、ユーザー、ネットワーク分析、そしてジオロケーションの概要を監視することで、世界中のあらゆる場所で勤務する従業員に最適な利用体験を提供することができます。インテグレーションには、完全カスタマイズが可能な 4 つのダッシュボードが事前構築されており、重要な情報を表面化できます。さらに、エンジニア、IT責任者、マネージャー、そして管理職レベルのすべてのユーザーに普遍的に利用価値のあるビジュアルを提供するよう設計されています。

### ミーティング概要
{{< img src="marketplace/rapdev_zoom/images/meetings.png" alt="スクリーンショット1" >}}

### Zoom Rooms ダッシュボード
{{< img src="marketplace/rapdev_zoom/images/rooms.png" alt="スクリーンショット1" >}}

### ミーティング品質概要
{{< img src="marketplace/rapdev_zoom/images/meeting_quality.png" alt="スクリーンショット1" >}}

### ユーザー詳細ダッシュボード
{{< img src="marketplace/rapdev_zoom/images/user_details.png" alt="スクリーンショット1" >}}

### ジオロケーション概要
{{< img src="marketplace/rapdev_zoom/images/geo.png" alt="スクリーンショット1" >}}

### モニター

1. Zoom Room に問題があります
2. Zoom Room のコンポーネントに問題があります

### ダッシュボード

1. RapDev Zoom ミーティング概要
2. RapDev Zoom Rooms ダッシュボード
3. RapDev Zoom ミーティング品質
4. RapDev Zoom ユーザー詳細
5. RapDev Zoom ジオ概要

## サポート
サポートまたは機能リクエストについては、以下の連絡先より RapDev.io にお問い合わせください。

- サポート: integrations@rapdev.io
- セールス: sales@rapdev.io
- チャット: RapDev.io/products
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？RapDev へ[お問い合わせ](mailto:integrations@rapdev.io)ください！導入のサポートをいたします。*

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、[こちらをクリック][4]してください。

[1]: https://marketplace.zoom.us/
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://app.datadoghq.com/marketplace/app/rapdev-zoom/pricing