---
"app_id": "silk"
"app_uuid": "1f436ae6-e063-408f-ad35-37ee37fa2183"
"assets":
  "dashboards":
    "Silk - Overview": assets/dashboards/silk_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": true
    "metrics":
      "check": silk.system.capacity.free
      "metadata_path": metadata.csv
      "prefix": silk.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10250"
    "source_type_name": Silk
  "monitors":
    "Latency high": assets/monitors/latency_high.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- cloud
- data stores
- provisioning
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/silk/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "silk"
"integration_id": "silk"
"integration_title": "Silk"
"integration_version": "2.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "silk"
"public_title": "Silk"
"short_description": "Monitor Silk performance and system stats."
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Cloud"
  - "Category::Data Stores"
  - "Category::Provisioning"
  "configuration": "README.md#Setup"
  "description": Monitor Silk performance and system stats.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Silk
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Silk][1] through the Datadog Agent.

## セットアップ

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### インストール

The Silk check is included in the [Datadog Agent][3] package.
No additional installation is needed on your server.

### 構成

1. Edit the `silk.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your Silk performance data. See the [sample silk.d/conf.yaml][4] for all available configuration options.

2. [Restart the Agent][5].

### Validation

[Run the Agent's status subcommand][6] and look for `silk` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "silk" >}}


### イベント

The Silk integration records events emitted by the Silk server. The event levels are mapped as the following:

| Silk                      | Datadog                            |
|---------------------------|------------------------------------|
| `INFO`                    | `info`                             |
| `ERROR`                   | `error`                            |
| `WARNING`                 | `warning`                          |
| `CRITICAL`                | `error`                            |


### サービスチェック
{{< get-service-checks-from-git "silk" >}}


## トラブルシューティング

Need help? Contact [Datadog support][9].


[1]: https://silk.us/
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/silk/datadog_checks/silk/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/silk/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/silk/assets/service_checks.json
[9]: https://docs.datadoghq.com/help/

