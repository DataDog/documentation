---
app_id: vns3
app_uuid: f6ffc9ae-a65d-41e4-8abd-c7194fc39a9a
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: vns3.peering
      metadata_path: metadata.csv
      prefix: vns3.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10005
    source_type_name: VNS3
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Cohesive Networks
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- network
- security
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/vns3/README.md
display_on_public_website: true
draft: false
git_integration_title: vns3
integration_id: vns3
integration_title: VNS3
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: vns3
public_title: VNS3
short_description: Cloud network appliance for application connectivity and security.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Network
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Cloud network appliance for application connectivity and security.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: VNS3
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Get state information regarding your VNS3 topology's IPSec endpoints/tunnels, VNS3 Peers, and overlay clients.

- Peering links Status Check:

  ![peering][1]

- Overlay Clients Status Check:

  ![clients][2]

- IPSec tunnels Status Check:

  ![ipsec][3]

## セットアップ

### 構成

To capture metrics, deploy Cohesive Networks' Datadog container, set up the VNS3 firewall, and configure the container. For more details, see the [Cohesive Networks guide][4] or watch the [video][5].

## 収集データ

### メトリクス
{{< get-metrics-from-git "vns3" >}}


### イベント

The VNS3 check does not include any events.

### サービスチェック

The VNS3 check does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][7].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vns3/images/peering.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vns3/images/clients.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/vns3/images/ipsec.png
[4]: https://docs.cohesive.net/docs/network-edge-plugins/datadog/
[5]: https://youtu.be/sTCgCG3m4vk
[6]: https://github.com/DataDog/integrations-extras/blob/master/vns3/metadata.csv
[7]: https://docs.datadoghq.com/ja/help/