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
- network
- cloud
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
short_description: Sync PacketFabric metrics with Datadog
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
  description: Sync PacketFabric metrics with Datadog
  media:
  - caption: PacketFabric Metrics Dashboard
    image_url: images/metrics_dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: PacketFabric
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[PacketFabric][1] is a global Network as a Service (NaaS) provider that offers secure, private, and on-demand connectivity services. 

You can use PacketFabric to quickly and easily build a robust network between cloud platforms, SaaS providers, and hundreds of colocation centers around the [world][2].

With this integration, you can leverage Datadog to monitor your PacketFabric network traffic data, for example
- Traffic rate metrics for physical interfaces
- Traffic rate metrics for logical interfaces

![metrics dashboard][3]

## セットアップ

### インストール

1. Go to the PacketFabric integration in Datadog. 
2. Click **Install Integration**.
3. On the **Configure** tab, click **Connect Accounts**. 
4. You are redirected to the PacketFabric login page. Enter your credentials to log in. 
5. You are shown a page requesting Datadog permissions. Click **Authorize**. 

Once authorized, the metrics will be sent from PacketFabric to Datadog every 15 minutes as part of a scheduled task. 


## Uninstallation

Once this integration has been uninstalled, any previous authorizations are revoked. 

Additionally, ensure that all API keys associated with this integration have been disabled by searching for the integration name on the API Keys page.  


## 収集データ

### メトリクス
See [metadata.csv][4] for a list of metrics provided by this integration.


## Support

Need help? Contact [PacketFabric Support][5].

[1]: https://packetfabric.com
[2]: https://packetfabric.com/locations
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/packetfabric/images/metrics_dashboard.png
[4]: https://github.com/DataDog/integrations-extras/blob/master/packetfabric/metadata.csv
[5]: mailto:support@packetfabric.com