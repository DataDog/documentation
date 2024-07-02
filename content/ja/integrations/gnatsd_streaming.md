---
"app_id": "gnatsd-streaming"
"app_uuid": "264e486e-d704-4851-987a-d33c11036521"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": true
    "metrics":
      "check": "gnatsd.streaming.serverz.clients"
      "metadata_path": "metadata.csv"
      "prefix": "gnatsd."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10235"
    "source_type_name": "Gnatsd streaming"
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": "Community"
  "sales_email": "dev@goldstar.com"
  "support_email": "dev@goldstar.com"
"categories":
- "network"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/gnatsd_streaming/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "gnatsd_streaming"
"integration_id": "gnatsd-streaming"
"integration_title": "Gnatsd Streaming"
"integration_version": "1.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "gnatsd_streaming"
"public_title": "Gnatsd Streaming"
"short_description": "NATS server streaming"
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Category::Network"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "NATS server streaming"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Gnatsd Streaming"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Get metrics from gnatsd_streaming service in real time to:

- Visualize and monitor gnatsd_streaming states
- Be notified about gnatsd_streaming failovers and events.

## セットアップ

The gnatsd_streaming check is not included in the [Datadog Agent][1] package, so you need to install it.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the gnatsd_streaming check on your host. See [Use Community Integrations][2] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-gnatsd_streaming==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][3].

### 構成

1. Edit the `gnatsd_streaming.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][4] to start collecting your GnatsD streaming [metrics](#metrics).
   See the [sample gnatsd_streaming.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6]

### Validation

[Run the Agent's status subcommand][7] and look for `gnatsd_streaming` under the Checks section.

## Compatibility

The gnatsd_streaming check is compatible with all major platforms

## 収集データ

### メトリクス
{{< get-metrics-from-git "gnatsd_streaming" >}}


Nats Streaming Server metrics are tagged with names like "nss-cluster_id"

### イベント

If you are running Nats Streaming Server in a Fault Tolerant group, a Nats Streaming Failover event is issued when the status of a server changes between `FT_STANDBY` and `FT_ACTIVE`.

### サービスチェック
{{< get-service-checks-from-git "gnatsd_streaming" >}}


## トラブルシューティング

Need help? Contact [Datadog support][10].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/getting_started/integrations/
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/gnatsd_streaming/datadog_checks/gnatsd_streaming/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/datadog-sdk-testing/blob/master/lib/config/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/gnatsd_streaming/assets/service_checks.json
[10]: http://docs.datadoghq.com/help

