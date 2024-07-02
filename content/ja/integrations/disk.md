---
"app_id": "system"
"app_uuid": "52179e9d-9012-4478-b1db-08e4d21d1181"
"assets":
  "integration":
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "system.disk.free"
      "metadata_path": "metadata.csv"
      "prefix": "system."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_name": "Disk"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "os & system"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/disk/README.md"
"display_name": "Disk"
"display_on_public_website": true
"draft": false
"git_integration_title": "disk"
"guid": "94588b23-111e-4ed2-a2af-fd6e4caeea04"
"integration_id": "システム"
"integration_title": "Disk"
"integration_version": "5.3.0"
"is_public": true
"maintainer": "help@datadoghq.com"
"manifest_version": "2.0.0"
"metric_prefix": "system."
"metric_to_check": "system.disk.free"
"monitors":
  "disk-space-forecast": "assets/monitors/disk_monitor.json"
"name": "disk"
"public_title": "Disk"
"short_description": "The disk check gathers metrics on mounted disks."
"support": "core"
"supported_os":
- "linux"
- "macos"
- "windows"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::OS & System"
  "configuration": "README.md#Setup"
  "description": "The disk check gathers metrics on mounted disks."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Disk"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Collect metrics related to disk usage and IO.

## セットアップ

### インストール

The disk check is included in the [Datadog Agent][1] package, so you don't need to install anything else on your server.

### 構成

The Disk check is enabled by default, and the Agent collects metrics on all local partitions. To configure the check with custom options, edit the `disk.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][2]. See the [sample disk.d/conf.yaml][3] for all available configuration options.

#### Note for Windows hosts
There are three scenarios where the Disk check can be used:

1. Monitoring physical drives

  Monitoring physical drives that are represented by a disk letter (for example. C:\, D:\, etc.) is supported out of the box by the disk check without any special considerations.

2. Monitoring nested mount points

  Monitoring mounted folders within a filesystem requires Administrator permissions. This is because the underlying Windows function call [FindFirstVolumeMountPoint][4] requires administrative permissions.
  To collect those metrics without granting Administrator permissions to the Agent, use the [PDH check][5] to collect mount point metrics from the corresponding perf counters.

3. Monitoring file shares

  Collecting mount point metrics for file shares on Windows is only supported by using the `create_mounts` option in the configuration.
  On Windows, each mounted folder is only visible to the user who mounted the share.
  Therefore, the `create_mounts` option allows the Agent to create the mount points to monitor in the context of the Agent's user.

### Validation

[Run the Agent's `status` subcommand][6] and look for `disk` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "disk" >}}


### イベント

The Disk check does not include any events.

### サービスチェック
{{< get-service-checks-from-git "disk" >}}


## トラブルシューティング

Need help? Contact [Datadog support][9].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/disk/datadog_checks/disk/data/conf.yaml.default
[4]: https://docs.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-findfirstvolumemountpointw
[5]: https://docs.datadoghq.com/integrations/pdh_check/#pagetitle
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/disk/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/disk/assets/service_checks.json
[9]: https://docs.datadoghq.com/help/

