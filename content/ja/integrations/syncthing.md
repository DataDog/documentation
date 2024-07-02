---
"app_id": "syncthing"
"app_uuid": "a61c3428-6898-45be-8a20-89f4c039a56d"
"assets":
  "dashboards":
    "Syncthing Overview": assets/dashboards/syncthing_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": syncthing.connections.count
      "metadata_path": metadata.csv
      "prefix": syncthing.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10276"
    "source_type_name": Syncthing
  "monitors":
    "[Syncthing] Device not connected": assets/monitors/syncthing_device_not_connected.json
    "[Syncthing] Disconnected": assets/monitors/syncthing_disconnected.json
    "[Syncthing] Folder error": assets/monitors/syncthing_folder_error.json
    "[Syncthing] Out of sync": assets/monitors/syncthing_out_of_sync.json
    "[Syncthing] Service error": assets/monitors/syncthing_service_error.json
    "[Syncthing] System error": assets/monitors/syncthing_system_error.json
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Community
  "sales_email": Alexander@Bushnev.pro
  "support_email": Alexander@Bushnev.pro
"categories":
- collaboration
- security
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/syncthing/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "syncthing"
"integration_id": "syncthing"
"integration_title": "Syncthing"
"integration_version": "1.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "syncthing"
"public_title": "Syncthing"
"short_description": "Track overall statistics from your Syncthing instance"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Category::Collaboration"
  - "Category::Security"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Track overall statistics from your Syncthing instance
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Syncthing
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Syncthing synchronizes files between two or more computers in real time. This integration allows you to monitor [Syncthing][1] using Datadog.

## セットアップ

The Syncthing check is not included in the [Datadog Agent][2] package, so you need to install it.

### インストール

For Agent v7.21+ / v6.21+, follow the instructions below to install the Syncthing check on your host. See [Use Community Integrations][3] to install the Syncthing check with the Docker Agent or earlier versions of the Agent.

1. Run the following command to install the Agent integration:

   ```shell
   datadog-agent integration install -t datadog-syncthing==<INTEGRATION_VERSION>
   ```

2. Configure your integration similar to core [integrations][4].

### 構成

1. Edit the `syncthing.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][5] to start collecting your Syncthing [metrics](#metrics). See the [sample syncthing.d/conf.yaml][6] for all available configuration options.

2. [Restart the Agent][7]

### Validation

Run the [Agent's status subcommand][8] and look for `syncthing` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "syncthing" >}}


### イベント

Syncthing does not include any events.

### サービスチェック
{{< get-service-checks-from-git "syncthing" >}}


## トラブルシューティング

Need help? Contact [Datadog support][11].


[1]: https://syncthing.net/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/getting_started/integrations/
[5]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/syncthing/datadog_checks/syncthing/data/conf.yaml.example
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/syncthing/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/syncthing/assets/service_checks.json
[11]: https://docs.datadoghq.com/help/

