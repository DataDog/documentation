---
app_id: bind9
app_uuid: b37533b0-6f0e-4259-9971-083f08086fac
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: bind9.nsstat_AuthQryRej
      metadata_path: metadata.csv
      prefix: bind9.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10222
    source_type_name: BIND 9
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Community
  sales_email: ashuvyas45@gmail.com
  support_email: ashuvyas45@gmail.com
categories:
- network
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/bind9/README.md
display_on_public_website: true
draft: false
git_integration_title: bind9
integration_id: bind9
integration_title: bind9
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: bind9
public_title: bind9
short_description: A datadog integration to collect bind9 server metrics
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Network
  - Supported OS::macOS
  configuration: README.md#Setup
  description: A datadog integration to collect bind9 server metrics
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: bind9
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Get metrics from Bind9 DNS Server.

- Visualize and monitor bind9 stats

![Snap][1]

## セットアップ

The Bind9 check is not included in the [Datadog Agent][2] package, so you need to install it.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the Bind9 check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-bind9==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][4].

### 構成

1. Edit the `bind9.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][5] to start collecting your Bind9 [metrics](#metrics). See the [sample bind9.d/conf.yaml][6] for all available configuration options.

   ```yaml
   init_config:

   instances:
     - url: "<BIND_9_STATS_URL>"
   ```

2. [Restart the Agent][7]

### Validation

[Run the Agent's `status` subcommand][8] and look for `bind9` under the Checks section.

## Compatibility

The check is compatible with all major platforms.

## 収集データ

### メトリクス
{{< get-metrics-from-git "bind9" >}}


### イベント

The bind9_check check does not include any events.

### サービスチェック
{{< get-service-checks-from-git "bind9" >}}


## トラブルシューティング

Need help? Contact [Datadog support][11].


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bind9/images/snapshot.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/bind9/datadog_checks/bind9/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/bind9/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/bind9/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/help