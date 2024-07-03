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
    '[Cisco SD-WAN] Device Reboot Alert': assets/monitors/device_reboot.json
    '[Cisco SD-WAN] Device Unreachable Alert': assets/monitors/device_unreachable.json
    '[Cisco SD-WAN] Tunnel Down Alert': assets/monitors/tunnel_down.json
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
short_description: Monitor your Cisco SD-WAN environment with Datadog.
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
  configuration: README.md#Setup
  description: Monitor your Cisco SD-WAN environment with Datadog.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco SD-WAN
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
<div class="alert alert-info">The Cisco SD-WAN NDM integration is in public beta.</div>



## 概要

The Cisco SD-WAN integration lets you monitor your Cisco SD-WAN environment within [Network Device Monitoring][1]. Gain comprehensive insights into the performance and health of your SD-WAN infrastructure, including sites, tunnels, and devices.

## セットアップ

**Note**: The Cisco SD-WAN NDM integration is in **Beta** and will not be billed until it is Generally Available.

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

The Cisco SD-WAN check is included in the [Datadog Agent][3] package.
No additional installation is needed on your server.

### 

The Cisco SD-WAN integrations needs valid credentials to access the Catalyst Manager instance.
Credentials should have the "Device monitoring" permission group.

1. Edit the `cisco_sdwan.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Cisco SD-WAN performance data. See the [sample cisco_sd_wan.d/conf.yaml][4] for all available configuration options.

2. [Agent を再起動します][5]。

## 収集データ

### 
{{< get-metrics-from-git "cisco_sdwan" >}}


### イベント

The Cisco SD-WAN check does not include any events.

### サービスチェック

The Cisco SD-WAN check does not include any service checks.

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

[1]: https://app.datadoghq.com/devices
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/cisco_sdwan.d/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://github.com/DataDog/integrations-core/blob/master/cisco_sdwan/metadata.csv
[7]: https://docs.datadoghq.com/ja/help/