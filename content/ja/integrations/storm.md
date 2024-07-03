---
app_id: storm
app_uuid: a3c93ee5-077d-467d-87d7-a2325bdcf782
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: storm.bolt.last_60.acked
      metadata_path: metadata.csv
      prefix: storm.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10207
    source_type_name: storm
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Community
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
- event management
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/storm/README.md
display_on_public_website: true
draft: false
git_integration_title: storm
integration_id: storm
integration_title: Storm
integration_version: 1.0.1
is_public: true
manifest_version: 2.0.0
name: storm
public_title: Storm
short_description: Apache Storm 1.x.x Topology Execution Stats
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Metrics
  - Category::Event Management
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Apache Storm 1.x.x Topology Execution Stats
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Storm
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Get metrics from Storm service in real time to:

- Visualize and monitor Storm cluster and topology metrics.
- Be notified about Storm failovers and events.

## セットアップ

The Storm check is not included in the [Datadog Agent][1] package, so you need to install it.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the Storm check on your host. See [Use Community Integrations][2] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-storm==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][3].

### 構成

1. Edit the `storm.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][4] to start collecting your Storm [metrics](#metrics). See the [sample storm.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6].

## Validation

Run the [Agent's status subcommand][7] and look for `storm` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "storm" >}}


### イベント

The Storm check does not include any events.

### サービスチェック
{{< get-service-checks-from-git "storm" >}}


## トラブルシューティング

Need help? Contact [Datadog support][10].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/storm/datadog_checks/storm/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/storm/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/storm/assets/service_checks.json
[10]: http://docs.datadoghq.com/help