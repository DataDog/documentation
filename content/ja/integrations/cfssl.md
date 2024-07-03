---
app_id: cfssl
app_uuid: dfcfda46-a2e3-44e4-8f80-1603e0317b2d
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: cfssl.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10284
    source_type_name: cfssl
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Community
  sales_email: JeanFred1@gmail.com
  support_email: JeanFred1@gmail.com
categories:
- network
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cfssl/README.md
display_on_public_website: true
draft: false
git_integration_title: cfssl
integration_id: cfssl
integration_title: cfssl
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: cfssl
public_title: cfssl
short_description: Monitor a cfssl instance
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Network
  configuration: README.md#Setup
  description: Monitor a cfssl instance
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: cfssl
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors [cfssl][1] through the Datadog Agent.

## セットアップ

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the cfssl check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-cfssl==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][4].

### 構成

1. Edit the `cfssl.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your cfssl performance data. See the [sample exim.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6].

### Validation

[Run the Agent's status subcommand][7] and look for `cfssl` under the Checks section.

## 収集データ

### メトリクス

The cfssl integration does not include any metrics.

### イベント

The cfssl integration does not include any events.

### サービスチェック
{{< get-service-checks-from-git "cfssl" >}}


## トラブルシューティング

Need help? Contact [Datadog support][9].


[1]: https://github.com/cloudflare/cfssl
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/cfssl/datadog_checks/cfssl/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/cfssl/assets/service_checks.json
[9]: https://www.datadoghq.com/support/