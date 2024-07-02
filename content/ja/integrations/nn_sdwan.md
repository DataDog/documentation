---
"app_id": "nn-sdwan"
"app_uuid": "8ff5c833-1498-4e63-9ef2-8deecf444d09"
"assets":
  "dashboards":
    "Netnology SD-WAN Overview": assets/dashboards/nn_sdwan_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check":
      - nn_sdwan.device_control_status
      - nn_sdwan.app_aware_routing.latency
      "metadata_path": metadata.csv
      "prefix": nn_sdwan.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10277"
    "source_type_name": Netnology SD-WAN
  "monitors":
    "High Latency Monitor": assets/monitors/high-latency-monitor.json
    "Packet Loss Monitor": assets/monitors/packet-loss-monitor.json
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Netnology
  "sales_email": info@netnology.io
  "support_email": info@netnology.io
"categories":
- network
- notifications
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/nn_sdwan/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "nn_sdwan"
"integration_id": "nn-sdwan"
"integration_title": "Netnology Cisco SD-WAN"
"integration_version": "1.0.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "nn_sdwan"
"public_title": "Netnology Cisco SD-WAN"
"short_description": "Cisco SDWAN Controller Metric Exporter"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Network"
  - "Category::Notifications"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Cisco SDWAN Controller Metric Exporter
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Netnology Cisco SD-WAN
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors Cisco SD-WAN controllers through the Datadog Agent using an SD-WAN platform provided by [Netnology][1]. The
check enables users to monitor the network health and performance of multiple Cisco SD-WAN controllers simultaneously. Collected
information can then be used for aggregated dashboarding and notifications on configured monitors/alerts.

Currently, only Cisco vManage devices are supported as SD-WAN controller targets.

## セットアップ

The Netnology Cisco SD-WAN integration is not included in the [Datadog Agent][2] package, so you need to install it manually.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ``` bash
   datadog-agent integration install -t nn_sdwan==1.0.1
   ```

2. Configure your integration similar to core [integrations][4].

### 構成

1. Edit the `nn_sdwan.d/conf.yaml` file in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Cisco SD-WAN performance data. See [sample nn_sdwan.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6].

### Validation

[Run the Agent's status subcommand][7] and look for `nn_sdwan` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "nn_sdwan" >}}


### イベント

The Netnology Cisco SD-WAN integration does not include any events.

### サービスチェック
{{< get-service-checks-from-git "nn_sdwan" >}}


## トラブルシューティング

Need help? Contact [Datadog support][10].


[1]: https://netnology.io
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/nn_sdwan/datadog_checks/nn_sdwan/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/nn_sdwan/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/nn_sdwan/assets/service_checks.json
[10]: https://docs.datadoghq.com/help/

