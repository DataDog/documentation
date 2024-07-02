---
"app_id": "btrfs"
"app_uuid": "471f9447-678b-4199-9503-7170b65d07c5"
"assets":
  "dashboards":
    "btrfs": "assets/dashboards/btrfs_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "system.disk.btrfs.total"
      "metadata_path": "metadata.csv"
      "prefix": "system.disk.btrfs."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "89"
    "source_type_name": "Btrfs"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "os & system"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/btrfs/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "btrfs"
"integration_id": "btrfs"
"integration_title": "Btrfs"
"integration_version": "2.3.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "btrfs"
"public_title": "Btrfs"
"short_description": "Monitor usage on Btrfs volumes so you can respond before they fill up."
"supported_os":
- "linux"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Category::OS & System"
  "configuration": "README.md#Setup"
  "description": "Monitor usage on Btrfs volumes so you can respond before they fill up."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Btrfs"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![BTRFS metric][1]

## Overview

Get metrics from Btrfs in real time to:

- Visualize and monitor Btrfs states.

## セットアップ

### インストール

The Btrfs check is included in the [Datadog Agent][2] package, so you don't need to install anything else on your servers that use at least one Btrfs filesystem.

### 構成

1. Edit the `btrfs.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][3]. See the [sample btrfs.d/conf.yaml][4] for all available configuration options.

2. [Restart the Agent][5].

### Validation

[Run the Agent's status subcommand][6] and look for `btrfs` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "btrfs" >}}


### イベント

The Btrfs check does not include any events.

### サービスチェック

The Btrfs check does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][8].

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/btrfs/images/btrfs_metric.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/btrfs/datadog_checks/btrfs/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/btrfs/metadata.csv
[8]: https://docs.datadoghq.com/help/

