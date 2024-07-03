---
app_id: hyper-v
app_uuid: 6024e97b-c3c6-45e3-ba71-a48adeebc191
assets:
  dashboards:
    hyper-v: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: hyperv.hypervisor_logical_processor.total_run_time
      metadata_path: metadata.csv
      prefix: hyperv.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10046
    source_type_name: HyperV
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- os & system
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/hyperv/README.md
display_on_public_website: true
draft: false
git_integration_title: hyperv
integration_id: hyper-v
integration_title: HyperV
integration_version: 1.11.0
is_public: true
manifest_version: 2.0.0
name: hyperv
public_title: HyperV
short_description: Monitor Microsoft's Hyper-V virtualization technology.
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::OS & System
  - Supported OS::Windows
  configuration: README.md#Setup
  description: Monitor Microsoft's Hyper-V virtualization technology.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: HyperV
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Hyper-V][1] through the Datadog Agent.

## セットアップ

### インストール

The Hyper-V check is included in the [Datadog Agent][2] package. No additional installation is needed on your server.

### 構成

1. Edit the `hyperv.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to collect your Hyper-V performance data. See the [sample hyperv.d/conf.yaml][3] for all available configuration options.

2. [Restart the Agent][4].

**Note**: Versions 1.5.0 or later of this check use a new implementation for metric collection, which requires Python 3. For hosts that are unable to use Python 3, or if you would like to use a legacy version of this check, refer to the following [config][5].

### Validation

[Run the Agent's status subcommand][6] and look for `hyperv` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "hyperv" >}}


### サービスチェック

Hyper-V does not include any service checks.

### イベント

Hyper-V does not include any events.

## トラブルシューティング

Need help? Contact [Datadog support][8].

## Further Reading

Additional helpful documentation, links, and articles:

- [Monitor Microsoft Hyper-V with Datadog][9]

[1]: https://docs.microsoft.com/en-us/windows-server/virtualization/hyper-v/hyper-v-on-windows-server
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/hyperv/datadog_checks/hyperv/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/7.33.x/hyperv/datadog_checks/hyperv/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/hyperv/metadata.csv
[8]: https://docs.datadoghq.com/ja/help/
[9]: https://www.datadoghq.com/blog/monitor-microsoft-hyperv-with-datadog