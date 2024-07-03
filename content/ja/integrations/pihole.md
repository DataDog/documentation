---
app_id: pihole
app_uuid: 008d006b-6390-4b93-9302-dc37d9625b18
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: pihole.clients_ever_seen
      metadata_path: metadata.csv
      prefix: pihole.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10169
    source_type_name: pihole
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Community
  sales_email: monganai@tcd.ie
  support_email: monganai@tcd.ie
categories:
- network
- log collection
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/pihole/README.md
display_on_public_website: true
draft: false
git_integration_title: pihole
integration_id: pihole
integration_title: Pi-hole
integration_version: 3.14.1
is_public: true
manifest_version: 2.0.0
name: pihole
public_title: Pi-hole
short_description: Integration to collect default Pi-hole metrics
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
  - Category::Log Collection
  configuration: README.md#Setup
  description: Integration to collect default Pi-hole metrics
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Pi-hole
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

This check monitors [Pi-hole][1] through the Datadog Agent.

## セットアップ

The Pi-hole check is not included in the [Datadog Agent][2] package, so you need to install it.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the Pi-hole check on your host. See [Use Community Integrations][3] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   sudo -u dd-agent -- datadog-agent integration install -t datadog-pihole==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][4].

### 構成

1. Edit the `pihole.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Pi-hole performance data. See the [sample pihole.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6].

### Validation

Run the [Agent's status subcommand][7] and look for `pihole` under the Checks section.

### Log collection

Enable logs collection for Datadog Agent in `/etc/datadog-agent/datadog.yaml` on Linux platforms. On other platforms, see the [Agent Configuration Files guide][8] for the location of your configuration file:

```yaml
logs_enabled: true
```

- Enable this configuration block to your `pihole.d/conf.yaml` file to start collecting Logs:
    ```yaml
    logs:
      - type: file
        path: /var/log/pihole.log
        source: pihole
    ```

## 収集データ

### メトリクス
{{< get-metrics-from-git "pihole" >}}


### イベント

Pi-hole does not include any events.

### サービスチェック
{{< get-service-checks-from-git "pihole" >}}


## トラブルシューティング

Need help? Contact [Datadog support][11].


[1]: https://pi-hole.net/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/pihole/datadog_checks/pihole/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/
[9]: https://github.com/DataDog/integrations-extras/blob/master/pihole/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/pihole/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/help/