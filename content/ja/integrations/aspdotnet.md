---
"app_id": "aspdotnet"
"app_uuid": "7d801e88-1fad-433e-81d9-07449fd45e13"
"assets":
  "dashboards":
    "ASP.NET - Overview": "assets/dashboards/overview.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "aspdotnet.request.wait_time"
      "metadata_path": "metadata.csv"
      "prefix": "aspdotnet."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10039"
    "source_type_name": "ASP.NET"
  "logs":
    "source": "iis"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "languages"
- "log collection"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/aspdotnet/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "aspdotnet"
"integration_id": "aspdotnet"
"integration_title": "ASP.NET"
"integration_version": "2.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "aspdotnet"
"public_title": "ASP.NET"
"short_description": "Track your ASP.NET service metrics in real time"
"supported_os":
- "windows"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Languages"
  - "Category::Log Collection"
  - "Supported OS::Windows"
  "configuration": "README.md#Setup"
  "description": "Track your ASP.NET service metrics in real time"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "ASP.NET"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Get metrics from ASP.NET in real time to:

- Visualize and monitor ASP.NET states.
- Be notified about ASP.NET failovers and events.

## セットアップ

### インストール

The ASP.NET check is included in the [Datadog Agent][1] package, so you don't need to install anything else on your servers.

### 構成

1. Edit the `aspdotnet.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][2] to start collecting your ASP.NET performance data. See the [sample aspdotnet.d/conf.yaml][3] for all available configuration options.

2. [Restart the Agent][4]

**Note**: Versions 1.9.0 or later of this check use a new implementation for metric collection, which requires Python 3. For hosts that are unable to use Python 3, or if you would like to use a legacy version of this check, refer to the following [config][5].

#### Log collection

ASP.NET uses IIS logging. Follow the [setup instructions for IIS][6] in order to view logs related to ASP.NET requests and failures.

Unhandled 500 level exceptions and events related to your ASP.NET application can be viewed with the Windows Application EventLog.

### Validation

[Run the Agent's `status` subcommand][7] and look for `aspdotnet` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "aspdotnet" >}}


### イベント

The ASP.NET check does not include any events.

### サービスチェック

The ASP.NET check does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][9].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/aspdotnet/datadog_checks/aspdotnet/data/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/7.33.x/aspdotnet/datadog_checks/aspdotnet/data/conf.yaml.example
[6]: https://docs.datadoghq.com/integrations/iis/?tab=host#setup
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/aspdotnet/metadata.csv
[9]: https://docs.datadoghq.com/help/

