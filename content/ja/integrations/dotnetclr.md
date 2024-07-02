---
"app_id": "dotnetclr"
"app_uuid": "2147d078-2742-413e-83eb-58400657de56"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "dotnetclr.memory.time_in_gc"
      "metadata_path": "metadata.csv"
      "prefix": "dotnetclr."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10069"
    "source_type_name": ".NET CLR"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "languages"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/dotnetclr/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "dotnetclr"
"integration_id": "dotnetclr"
"integration_title": ".NET CLR"
"integration_version": "2.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "dotnetclr"
"public_title": ".NET CLR"
"short_description": "Visualize and monitor Dotnetclr states"
"supported_os":
- "windows"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Windows"
  - "Category::Languages"
  "configuration": "README.md#Setup"
  "description": "Visualize and monitor Dotnetclr states"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": ".NET CLR"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Get metrics from the .NET CLR service in real time to:

- Visualize and monitor .NET CLR states.
- Be notified about .NET CLR failovers and events.

## セットアップ

### インストール

The .NET CLR check is included in the [Datadog Agent][1] package. No additional installation is needed on your server.

### 構成

1. Edit the `dotnetclr.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][2] to start collecting your .NET CLR performance data. See the [sample dotnetclr.d/conf.yaml][3] for all available configuration options.
2. [Restart the Agent][4].

**Note**: Versions 1.10.0 or later of this check use a new implementation for metric collection, which requires Python 3. For hosts that are unable to use Python 3, or if you would like to use a legacy version of this check, refer to the following [config][5].

## Validation

[Run the Agent's status subcommand][6] and look for `dotnetclr` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "dotnetclr" >}}


### サービスチェック

The .NET CLR check does not include any service checks.

### イベント

The .NET CLR check does not include any events.

## トラブルシューティング

Need help? Contact [Datadog support][8].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/dotnetclr/datadog_checks/dotnetclr/data/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/7.33.x/dotnetclr/datadog_checks/dotnetclr/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/dotnetclr/metadata.csv
[8]: https://docs.datadoghq.com/help/

