---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-gmeet
app_uuid: 0aa39e5e-89dd-4437-8411-33ca5a69174f
assets:
  dashboards:
    Google Meet Dashboard: assets/dashboards/google_meet_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: rapdev.gmeet.call_ended
      metadata_path: metadata.csv
      prefix: rapdev.gmeet.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10434
    source_type_name: RapDev Gmeet
  monitors:
    Google Meets Integration Failed to Connect: assets/monitors/rapdev_google_meet_monitor.json
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
git_integration_title: rapdev_gmeet
integration_id: rapdev-gmeet
integration_title: Google Meet
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_gmeet
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.gmeet
  product_id: gmeet
  short_description: アクティブユーザー 1 人あたりの単価
  tag: display_name
  unit_label: アクティブユーザー
  unit_price: 1
public_title: Google Meet
short_description: Google Meet の会議の詳細とパフォーマンスをメトリクスおよびイベントとして視覚化します。
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
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Google Meet の会議の詳細とパフォーマンスをメトリクスおよびイベントとして視覚化します。
  media:
  - caption: RapDev Google Meet 概要ダッシュボード
    image_url: images/dashboard_example.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Google Meet
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
Google Meet は、会議や通話用のビデオ通信サービスです。

Google Meet インテグレーションは、通話が終了するとすぐに通話パフォーマンスのメトリクスをレポートします。このインテグレーションは、オーディオ、ビデオ、画面共有のレイテンシーをレポートすることで、通話のパフォーマンスを監視します。また、ユーザーが会議を退出すると、そのイベントが Datadog に送信され、組織全体の参加者属性を視覚化することができます。
収集されるインサイトには以下が含まれます。
- 組織が主催する会議に参加する外部ユーザー数
- 地域別のデバイスタイプの内訳
- ユーザーごとの通話時間の内訳
- 通話品質評価の内訳と概要

注: ワークスペースからこの情報をポーリングするために内部サービスアカウントをセットアップするには、Google Workspace 管理者がサービスアカウントにドメイン全体の権限を委任する必要があります。

### メトリクスの収集

Datadog にレポートするパラメーターを `conf.yaml` ファイルでカスタマイズします。

このインテグレーションは、[Google Activities API][2] が返す内容に基づいて、メトリクスを Datadog に送信します。このインテグレーションは、[発信者離脱イベント][3]を利用します。
追加のメトリクスを取得するには、`conf.yaml` に `network_recv_jitter_msec_max` などのフィールドを追加します。

各メトリクスには以下のタグが含まれます。
  - `meeting_code`: Google Meet 会議の会議コード (例: "abc-hexp-tqy")。定期的な会議には同じ会議コードが使用されます。
  - `location_country`: 参加者が接続した国。
  - `organizer_email`: 会議作成者のメールアドレス。
  - `location_region`: 参加者が接続した国内の都市または地域 (例: ボストン)。
  - `ip_address`: 参加者の外部 IP アドレス。
  - `device_type`: 参加者のデバイスの種類 (例: Android、Chromebox、iOS、Web、Jamboard、PSTN_IN)。
  - `identifier`: 参加者固有の識別子 (例: メールアドレス、電話番号、またはデバイス ID)。
  - `display_name`: 会議中に表示されるユーザーの人間が読める名前。
  - `is_external`: 参加者が組織外のユーザーであるかどうかを示します。デフォルトでは、Google Admin API は外部参加者の識別子の一部をマスクします。

ほとんどの使用事例では、`conf.yaml` ファイルのデフォルトのメトリクスで十分です。

## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- サポート: [support@rapdev.io][9]
- 営業: [sales@rapdev.io][1]
- チャット: [rapdev.io][10]
- 電話: 855-857-0222
---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？RapDev へ[お問い合わせ](mailto:support@rapdev.io)ください！導入のサポートをいたします。*

[1]: mailto:sales@rapdev.io
[2]: https://developers.google.com/admin-sdk/reports/v1/appendix/activity/meet
[3]: https://developers.google.com/admin-sdk/reports/v1/appendix/activity/meet#call_ended
[4]: https://console.cloud.google.com/projectcreate
[5]: https://console.cloud.google.com/apis/library/admin.googleapis.com
[6]: https://console.cloud.google.com/iam-admin/serviceaccounts/create
[7]: https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[9]: mailto:support@rapdev.io
[10]: https://www.rapdev.io/#Get-in-touch

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-gmeet" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。