---
app_id: unbound
app_uuid: 33cd72ba-822b-4a74-92eb-f1240ea71975
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: unbound.time.up
      metadata_path: metadata.csv
      prefix: unbound.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10165
    source_type_name: Unbound
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Community
  sales_email: david.byron@avast.com
  support_email: david.byron@avast.com
categories:
- caching
- network
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/unbound/README.md
display_on_public_website: true
draft: false
git_integration_title: unbound
integration_id: unbound
integration_title: Unbound
integration_version: 1.0.1
is_public: true
manifest_version: 2.0.0
name: unbound
public_title: Unbound
short_description: A datadog integration to collect unbound metrics
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: A datadog integration to collect unbound metrics
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Unbound
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors [Unbound][1] through the Datadog Agent.

Get metrics from unbound service in real time to:

- Visualize and monitor unbound states

## セットアップ

The Unbound check is not included in the [Datadog Agent][2] package, so you need to install it.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the Unbound check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-unbound==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][4].

### 構成

1. Edit the `unbound.d/conf.yaml` file, in the `conf.d/` folder at the root of
   your Agent's configuration directory to start collecting unbound metrics. See
   the [sample unbound.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6].

### Validation

[Run the Agent's status subcommand][7] and look for `unbound` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "unbound" >}}


### イベント

The Unbound check does not include any events.

### サービスチェック
{{< get-service-checks-from-git "unbound" >}}


## トラブルシューティング

Need help? Contact [Datadog support][10].


[1]: https://nlnetlabs.nl/documentation/unbound/unbound-control/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/unbound/datadog_checks/unbound/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/unbound/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/unbound/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/