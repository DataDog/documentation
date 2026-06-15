---
app_id: cisco-sdwan
app_uuid: 2da35edb-5e33-4e5f-93c3-65e08478d566
assets:
  dashboards:
    Cisco SD-WAN: assets/dashboards/cisco_sd-wan.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: cisco_sdwan.device.reachable
      metadata_path: metadata.csv
      prefix: cisco_sdwan.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 12300976
    source_type_name: Cisco SDWAN
  monitors:
    Cisco SD-WAN Device has rebooted several times: assets/monitors/device_reboot.json
    Cisco SD-WAN Device is unreachable: assets/monitors/device_unreachable.json
    Cisco SD-WAN Tunnel is down: assets/monitors/tunnel_down.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ネットワーク
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cisco_sdwan/README.md
display_on_public_website: true
draft: false
git_integration_title: cisco_sdwan
integration_id: cisco-sdwan
integration_title: Cisco SD-WAN
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cisco_sdwan
public_title: Cisco SD-WAN
short_description: Datadog で Cisco SD-WAN 環境を監視
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
  - Category::Network
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog で Cisco SD-WAN 環境を監視する
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco SD-WAN
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->



## 概要

Cisco SD-WAN インテグレーションにより、[Network Device Monitoring][1] から Cisco SD-WAN 環境を監視できます。サイト、トンネル、デバイスなど、SD-WAN インフラストラクチャーのパフォーマンスと健全性を包括的に把握できます。

## セットアップ

**Cisco SD-WAN NDM インテグレーションはプレビュー版であり、一般提供されるまでは課金されません。**

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Cisco SD-WAN チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### 構成

Cisco SD-WAN インテグレーションは、Catalyst Manager インスタンスにアクセスするための有効な資格情報が必要です。
資格情報には "Device monitoring" 権限グループが含まれている必要があります。

1. Cisco SD-WAN のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダー内の `cisco_sdwan.d/conf.yaml` を編集します。利用可能なすべての構成オプションは、[サンプル cisco_sd_wan.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

## 収集データ

### メトリクス
{{< get-metrics-from-git "cisco_sdwan" >}}


### イベント

Cisco SD-WAN チェックには、イベントは含まれません。

### サービスチェック

Cisco SD-WAN チェックには、サービスチェックは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

[1]: https://app.datadoghq.com/devices
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/cisco_sdwan.d/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://github.com/DataDog/integrations-core/blob/master/cisco_sdwan/metadata.csv
[7]: https://docs.datadoghq.com/ja/help/