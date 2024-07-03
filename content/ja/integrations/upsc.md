---
app_id: upsc
app_uuid: 4681a41f-efdc-4d22-b573-06e101b9cf24
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: upsc.battery.charge
      metadata_path: metadata.csv
      prefix: upsc.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10211
    source_type_name: UPSC
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Community
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/upsc/README.md
display_on_public_website: true
draft: false
git_integration_title: upsc
integration_id: upsc
integration_title: UPSC
integration_version: 1.0.1
is_public: true
manifest_version: 2.0.0
name: upsc
public_title: UPSC
short_description: UPSC stats collector for UPS batteries
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::OS & System
  - Supported OS::Linux
  configuration: README.md#Setup
  description: UPSC stats collector for UPS batteries
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: UPSC
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Get metrics from UPSD service through UPSC in real time to:

- Visualize and monitor UPS battery health and states
- Be notified about UPS failovers and events.

## セットアップ

The UPSC check is not included in the [Datadog Agent][1] package, so you need to install it.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the UPSC check on your host. See [Use Community Integrations][2] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-upsc==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][3].

### 構成

1. Edit the `upsc.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][4] to start collecting your UPSC [metrics](#metrics). See the [sample upsc.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6]

## Validation

Run the [Agent's status subcommand][7] and look for `upsc` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "upsc" >}}


### イベント

The UPSC check does not include any events.

### サービスチェック

The UPSC check does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][9].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/upsc/datadog_checks/upsc/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/upsc/metadata.csv
[9]: http://docs.datadoghq.com/help