---
"app_id": "system"
"app_uuid": "17477b56-4487-4b00-8820-70c6f64ae3c6"
"assets":
  "integration":
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "system.inodes.total"
      "metadata_path": "metadata.csv"
      "prefix": "system."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_name": "Linux proc extras"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "os & system"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/linux_proc_extras/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "linux_proc_extras"
"integration_id": "システム"
"integration_title": "Linux Proc Extras"
"integration_version": "2.5.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "linux_proc_extras"
"public_title": "Linux Proc Extras"
"short_description": "Visualize and monitor linux_proc_extras states."
"supported_os":
- "linux"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Category::OS & System"
  "configuration": "README.md#Setup"
  "description": "Visualize and monitor linux_proc_extras states."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Linux Proc Extras"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Get metrics from linux_proc_extras service in real time to:

- Visualize and monitor linux_proc_extras states
- Be notified about linux_proc_extras failovers and events.

## セットアップ

### インストール

The Linux_proc_extras check is included in the [Datadog Agent][1] package, so you don't need to install anything else on your servers.

### 構成

1. Edit the `linux_proc_extras.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][2]. See the [sample linux_proc_extras.d/conf.yaml][3] for all available configuration options.

2. [Restart the Agent][4].

### Validation

[Run the Agent's status subcommand][5] and look for `linux_proc_extras` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "linux_proc_extras" >}}


### イベント

The Linux Proc Extras check does not include any events.

### サービスチェック

The Linux Proc Extras check does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][7].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/linux_proc_extras/datadog_checks/linux_proc_extras/data/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/linux_proc_extras/metadata.csv
[7]: https://docs.datadoghq.com/help/

