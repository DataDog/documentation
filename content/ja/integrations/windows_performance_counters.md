---
"app_id": "windows-performance-counters"
"app_uuid": "ec86de4d-a080-4160-8b0a-b937bbea08e9"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10241"
    "source_type_name": Windows performance counters
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- iot
- os & system
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/windows_performance_counters/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "windows_performance_counters"
"integration_id": "windows-performance-counters"
"integration_title": "Windows performance counters"
"integration_version": "2.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "windows_performance_counters"
"public_title": "Windows performance counters"
"short_description": "Monitor performance counters on Windows operating systems."
"supported_os":
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Windows"
  - "Category::IoT"
  - "Category::OS & System"
  "configuration": "README.md#Setup"
  "description": Monitor performance counters on Windows operating systems.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Windows performance counters
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Windows performance counters][1] through the Datadog Agent.

**Note:** Agent version 7.33.0 is the minimum supported version.

## セットアップ

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### インストール

The Windows performance counters check is included in the [Datadog Agent][3] package.
No additional installation is needed on your server.

### 構成

1. Edit the `windows_performance_counters.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your windows_performance_counters performance data. See the [sample windows_performance_counters.d/conf.yaml][4] for all available configuration options.

2. [Restart the Agent][5].

### Validation

[Run the Agent's status subcommand][6] and look for `windows_performance_counters` under the Checks section.

## 収集データ

### メトリクス

All metrics collected by the Windows performance counters check are forwarded to Datadog as [custom metrics][7], which may impact your [billing][8].

### イベント

The Windows performance counters integration does not include any events.

### サービスチェック
{{< get-service-checks-from-git "windows_performance_counters" >}}


## トラブルシューティング

Need help? Contact [Datadog support][10].

## Further Reading

Additional helpful documentation, links, and articles:

- [Monitor Windows Performance Counters with Datadog][11]

[1]: https://docs.microsoft.com/en-us/windows/win32/perfctrs/about-performance-counters
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/windows_performance_counters/datadog_checks/windows_performance_counters/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/developers/metrics/custom_metrics/
[8]: https://docs.datadoghq.com/account_management/billing/custom_metrics/
[9]: https://github.com/DataDog/integrations-core/blob/master/windows_performance_counters/assets/service_checks.json
[10]: https://docs.datadoghq.com/help/
[11]: https://www.datadoghq.com/blog/windows-performance-counters-datadog/

