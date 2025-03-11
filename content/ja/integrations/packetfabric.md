---
app_id: packetfabric
app_uuid: da10a120-217b-40f3-8b7f-7dc2fdea3b94
assets:
  dashboards:
    PacketFabric-Metrics: assets/dashboards/metrics_dashboard.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - packetfabric.ifd_traffic_rate_metric
      - packetfabric.ifl_traffic_rate_metric
      metadata_path: metadata.csv
      prefix: packetfabric.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 8623825
    source_type_name: PacketFabric
  oauth: assets/oauth_clients.json
author:
  homepage: https://packetfabric.com
  name: PacketFabric
  sales_email: sales@packetfabric.com
  support_email: support@packetfabric.com
categories:
- ネットワーク
- クラウド
- モニター
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/packetfabric/README.md
display_on_public_website: true
draft: false
git_integration_title: packetfabric
integration_id: packetfabric
integration_title: PacketFabric
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: packetfabric
public_title: PacketFabric
short_description: PacketFabric メトリクスを Datadog と同期させる
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Category::Cloud
  - Category::Metrics
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: PacketFabric メトリクスを Datadog と同期させる
  media:
  - caption: PacketFabric メトリクスダッシュボード
    image_url: images/metrics_dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: PacketFabric
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[PacketFabric][1] は、セキュアでプライベートなオンデマンド接続サービスを提供する、グローバルなネットワーク・アズ・ア・サービス (NaaS) プロバイダーです。

PacketFabric を使用すると、クラウドプラットフォーム、SaaS プロバイダー、および[世界][2]中の数百のコロケーションセンター間で、堅牢なネットワークを迅速かつ簡単に構築できます。

このインテグレーションにより、Datadog を活用して PacketFabric のネットワークトラフィックデータを監視することができます。例えば、
- 物理インターフェイスのトラフィックレートメトリクス
- 論理インターフェイスのトラフィックレートメトリクス

![メトリクスダッシュボード][3]

## セットアップ

### インストール

1. Datadog の PacketFabric インテグレーションに移動します。
2. **Install Integration** をクリックします。
3. **Configure** タブで **Connect Accounts** をクリックします。
4. PacketFabric のログインページにリダイレクトされます。ログインするための資格情報を入力します。
5. Datadog の権限をリクエストするページが表示されます。**Authorize** をクリックします。

認可されると、メトリクスはスケジュールされたタスクの一部として、15 分ごとに PacketFabric から Datadog に送信されます。


## アンインストール

このインテグレーションをアンインストールすると、それ以前に与えられた認可は全て取り消されます。

また、API Keys ページでインテグレーション名を検索して、このインテグレーションに紐付けられたすべての API キーが無効になったことを確認してください。


## 収集データ

### メトリクス
このインテグレーションによって提供されるメトリクスのリストについては、[metadata.csv][4] を参照してください。


## Agent

ご不明な点は、[PacketFabric サポート][5]にお問い合わせください。

[1]: https://packetfabric.com
[2]: https://packetfabric.com/locations
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/packetfabric/images/metrics_dashboard.png
[4]: https://github.com/DataDog/integrations-extras/blob/master/packetfabric/metadata.csv
[5]: mailto:support@packetfabric.com