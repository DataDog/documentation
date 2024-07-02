---
"app_id": "pdh"
"app_uuid": "75f6813c-934c-4f1a-b8f4-71f9f1911165"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10065"
    "source_type_name": "PDH"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "os & system"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/pdh_check/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "pdh_check"
"integration_id": "pdh"
"integration_title": "PDH Check"
"integration_version": "2.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "pdh_check"
"public_title": "PDH Check"
"short_description": "Collect and graph any Windows Performance Counters."
"supported_os":
- "windows"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Windows"
  - "Category::OS & System"
  "configuration": "README.md#Setup"
  "description": "Collect and graph any Windows Performance Counters."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "PDH Check"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

**Note:** The usage of PDH check is discouraged, you should use the [Windows performance counters check][1] instead.

Get metrics from Windows performance counters in real time to:

- Visualize and monitor Windows performance counters through the PDH API.

## セットアップ

### インストール

The PDH check is included in the [Datadog Agent][2] package. No additional installation is needed.

### 構成

1. Edit the `pdh_check.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][3] to collect Windows performance data. See the [sample pdh_check.d/conf.yaml][4] for all available configuration options.

2. [Restart the Agent][5].

### Validation

Run the [Agent's status subcommand][6] and look for `pdh_check` under the Checks section.

## 収集データ

### メトリクス

All metrics collected by the PDH check are forwarded to Datadog as [custom metrics][7], which may impact your [billing][8].

### イベント

The PDH check does not include any events.

### サービスチェック

The PDH check does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][9].

[1]: https://docs.datadoghq.com/integrations/windows_performance_counters/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/pdh_check/datadog_checks/pdh_check/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#restart-the-agent
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/developers/metrics/custom_metrics/
[8]: https://docs.datadoghq.com/account_management/billing/custom_metrics/
[9]: https://docs.datadoghq.com/help/

