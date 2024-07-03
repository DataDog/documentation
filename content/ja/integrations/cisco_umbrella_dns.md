---
app_id: cisco-umbrella-dns
app_uuid: 9f98de10-9c98-4601-ae36-cbe25c4be018
assets:
  dashboards:
    Cisco Umbrella DNS - DNS Traffic: assets/dashboards/cisco_umbrella_dns_dns_traffic.json
    Cisco Umbrella DNS - Proxied Traffic: assets/dashboards/cisco_umbrella_dns_proxied_traffic.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10441
    source_type_name: cisco_umbrella_dns
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- ネットワーク
- security
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cisco_umbrella_dns/README.md
display_on_public_website: true
draft: false
git_integration_title: cisco_umbrella_dns
integration_id: cisco-umbrella-dns
integration_title: Cisco Umbrella DNS
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cisco_umbrella_dns
public_title: Cisco Umbrella DNS
short_description: Visualize Cisco Umbrella DNS Proxied and DNS Traffic. Connect to
  Cloud SIEM.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Network
  - Category::Security
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Visualize Cisco Umbrella DNS Proxied and DNS Traffic. Connect to Cloud
    SIEM.
  media:
  - caption: Cisco Umbrella DNS - DNS Traffic
    image_url: images/cisco_umbrella_dns_dns_traffic.png
    media_type: image
  - caption: Cisco Umbrella DNS - Proxied Traffic
    image_url: images/cisco_umbrella_dns_proxied_traffic.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco Umbrella DNS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

[Cisco Umbrella][1] is the leading platform for network DNS security monitoring. Umbrella's DNS-layer security offers a fast and easy way to enhance security, providing improved visibility and protection for users both on and off the network. By preventing threats over any port or protocol before they reach the network or endpoints, Umbrella DNS-layer security aims to deliver the most secure, reliable, and fastest internet experience to over 100 million users.

The Cisco Umbrella DNS integration collects DNS and Proxy logs and sends them to Datadog. Using the out-of-the-box logs pipeline, the logs are parsed and enriched for easy searching and analysis. This integration includes several dashboards visualizing total DNS requests, allowed/blocked domains, top blocked categories, proxied traffic over time, and more. If you have Datadog Cloud SIEM, Umbrella DNS logs will be analyzed by threat intelligence for matches against common attacker destinations. DNS logs are also useful for threat hunting and during investigations to compliment logs from other sources.

## セットアップ

### 構成

#### Cisco Umbrella DNS Configuration

1. Login to [**Umbrella**][2] with your credentials.
2. From the left panel, select **Admin**.
3. Select **API Keys**.
4. Create a new API Key.
5. Apply the `reports.aggregations:read` and `reports.granularEvents:read` key scopes to the API key.
6. Copy the API Key and Key Secret, which will be used during the next portion of configuration steps.

#### Cisco Umbrella DNS DataDog Integration Configuration

Configure the Datadog endpoint to forward Cisco Umbrella DNS events as logs to Datadog.

1. Navigate to `Cisco Umbrella DNS`.
2. Add your Cisco Umbrella DNS credentials.

| Cisco Umbrella DNS Parameters | 説明                                                                |
| ----------------------------- | -------------------------------------------------------------------------- |
| API Key                       | The API Key from Cisco Umbrella.                                           |
| Key Secret                    | The Key Secret from Cisco Umbrella.                                        |

## 収集データ

### ログ

The integration collects and forwards Cisco Umbrella DNS and Proxy logs to Datadog.

### メトリクス

The Cisco Umbrella DNS integration does not include any metrics.

### イベント

The Cisco Umbrella DNS integration does not include any events.

## サポート

For further assistance, contact [Datadog Support][3].

[1]: https://umbrella.cisco.com/
[2]: https://login.umbrella.com/
[3]: https://docs.datadoghq.com/ja/help/