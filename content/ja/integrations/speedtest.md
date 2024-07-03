---
app_id: speedtest
app_uuid: 550862f8-f1d1-4924-b802-185b865e09a4
assets:
  dashboards:
    Speedtest: assets/dashboards/speedtest.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: speedtest.download.bandwidth
      metadata_path: metadata.csv
      prefix: speedtest.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10119
    source_type_name: speedtest
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Community
  sales_email: cody.lee@datadoghq.com
  support_email: cody.lee@datadoghq.com
categories:
- developer tools
- network
- testing
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/speedtest/README.md
display_on_public_website: true
draft: false
git_integration_title: speedtest
integration_id: speedtest
integration_title: speedtest
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: speedtest
public_title: speedtest
short_description: Runs Speedtest results using speedtest-cli
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Network
  - Category::Testing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Runs Speedtest results using speedtest-cli
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: speedtest
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors [Speedtest][1] through the Datadog Agent.

## セットアップ

The Speedtest check is not included in the [Datadog Agent][2] package, so you need to install it.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the Speedtest check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-speedtest==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][4].

**Note**: For all hosts, you need to install the [Speedtest CLI][1] and accept the agreement as the Datadog Agent user prior to use, for example: `sudo -u dd-agent speedtest`.

### 構成

1. Edit the `speedtest.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Speedtest performance data. See the [sample speedtest.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6].

### Validation

Run the [Agent's status subcommand][7] and look for `speedtest` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "speedtest" >}}


### イベント

The Speedtest check does not include any events.

### サービスチェック
{{< get-service-checks-from-git "speedtest" >}}


## トラブルシューティング

Need help? Contact [Datadog support][10].


[1]: https://www.speedtest.net/apps/cli
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/datadog_checks/speedtest/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/