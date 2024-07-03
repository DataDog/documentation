---
app_id: neutrona
app_uuid: f44f84d4-1436-4ab1-8023-b952850b64c8
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: neutrona.azure.expressroute.egress_bps
      metadata_path: metadata.csv
      prefix: neutrona.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10051
    source_type_name: Neutrona
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Neutrona
  sales_email: david@neutrona.com
  support_email: david@neutrona.com
categories:
- cloud
- network
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/neutrona/README.md
display_on_public_website: true
draft: false
git_integration_title: neutrona
integration_id: neutrona
integration_title: Neutrona
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: neutrona
public_title: Neutrona
short_description: Neutrona Telemetry
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Neutrona Telemetry
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Neutrona
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors [Neutrona][1] cloud connectivity services to:

- Azure (ExpressRoute)

## セットアップ

The Neutrona check is not included in the [Datadog Agent][2] package, so you need to install it.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the Neutrona check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-neutrona==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][4].

### 構成

1. Edit the `neutrona.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][5] to start collecting your Neutrona [metrics](#metrics).
   See the [sample neutrona.d/conf.yaml][6] for all available configuration options.

2. [Restart the Agent][7]

### Validation

[Run the Agent's status subcommand][8] and look for `neutrona` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "neutrona" >}}


### サービスチェック

Neutrona does not include any service checks at this time.

### イベント

Neutrona does not include any events at this time.

## トラブルシューティング

Need help? Contact [Datadog support][10].

[1]: https://telemetry.neutrona.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/neutrona/datadog_checks/neutrona/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/neutrona/metadata.csv
[10]: https://docs.datadoghq.com/ja/help/