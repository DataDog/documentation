---
"app_id": "filebeat"
"app_uuid": "50405147-1148-405a-9d81-ea48be4f613b"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "filebeat.registry.unprocessed_bytes"
      "metadata_path": "metadata.csv"
      "prefix": "filebeat."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10127"
    "source_type_name": "Filebeat"
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": "Community"
  "sales_email": "jean@tripping.com"
  "support_email": "jean@tripping.com"
"categories":
- "os & system"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/filebeat/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "filebeat"
"integration_id": "filebeat"
"integration_title": "Filebeat"
"integration_version": "1.3.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "filebeat"
"public_title": "Filebeat"
"short_description": "Lightweight Shipper for Logs"
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::OS & System"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Lightweight Shipper for Logs"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Filebeat"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Get metrics from Filebeat service in real time to:

- Visualize and monitor Filebeat states.
- Be notified about Filebeat failovers and events.

## セットアップ

The Filebeat check is not included in the [Datadog Agent][1] package, so you need to install it.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the Filebeat check on your host. See [Use Community Integrations][2] to install with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-filebeat==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][3].

### 構成

1. Edit the `filebeat.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][4] to start collecting your Filebeat [metrics](#metrics). See the [sample filebeat.d/conf.yaml][5] for all available configuration options.

2. [Restart the Agent][6]

## Validation

Run the [Agent's status subcommand][7] and look for `filebeat` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "filebeat" >}}


### イベント

The Filebeat check does not include any events.

### サービスチェック
{{< get-service-checks-from-git "filebeat" >}}


## トラブルシューティング

Need help? Contact [Datadog support][10].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/getting_started/integrations/
[4]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/filebeat/datadog_checks/filebeat/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/filebeat/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/filebeat/assets/service_checks.json
[10]: https://docs.datadoghq.com/help/

