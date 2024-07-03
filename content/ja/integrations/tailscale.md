---
app_id: tailscale
app_uuid: e3f4a5cf-3594-43fc-9d4e-4e86b9c91ea2
assets:
  dashboards:
    tailscale-overview: assets/dashboards/tailscale_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10420
    source_type_name: Tailscale
  monitors:
    Physical Bytes Received by Destination: assets/monitors/physical_traffic_received.json
    Virtual Bytes Received by Destination: assets/monitors/virtual_traffic_received.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- security
- log collection
- network
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/tailscale/README.md
display_on_public_website: true
draft: false
git_integration_title: tailscale
integration_id: tailscale
integration_title: Tailscale
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: tailscale
public_title: Tailscale
short_description: View Tailscale audit and network flow logs in Datadog.
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
  - Category::Security
  - Category::Log Collection
  - Category::Network
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: View Tailscale audit and network flow logs in Datadog.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-tailscale-with-datadog/
  support: README.md#Support
  title: Tailscale
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Tailscale][1] is a peer-to-peer VPN service that simplifies and secures network connectivity.

With this integration, you can:

1. Control your Tailscale data retention.
2. カスタムウィジェットやカスタムダッシュボードを構築する。
3. Cross-reference Tailscale events with the data from other services in your stack.

This integration streams two log types from Tailscale:

[Configuration Audit Logs][2]:

Configuration audit logs let you identify who did what and when in your tailnet. These logs record actions that modify a tailnet's configuration, including the type of action, the actor, the target resource, and the time.

[Network Flow logs][3]:

Network flow logs tell you which nodes connected to which other nodes and when on your Tailscale network. You can export network logs for long-term storage, security analysis, threat detection, or incident investigation.

After parsing your Tailscale logs, Datadog then populates the out-of-the-box Tailscale overview dashboard with insights into security-related events from your physical and virtual traffic.

## セットアップ

To enable log streaming:

1. Login to your Tailscale admin console
2. Navigate to the Logs tab
3. Select the **Start streaming...** button
4. From the menu, select Datadog and add a URL + token or [API key][4]
5. Select the **Start streaming** button

## 収集データ

### メトリクス

Tailscale does not include any metrics.

### サービスチェック

Tailscale does not include any service checks.

### イベント

Tailscale does not include any events.

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Monitor the state of your Tailscale private network with Datadog][6]

[1]: https://tailscale.com/
[2]: https://tailscale.com/kb/1203/audit-logging/
[3]: https://tailscale.com/kb/1219/network-flow-logs/
[4]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://www.datadoghq.com/blog/monitor-tailscale-with-datadog/